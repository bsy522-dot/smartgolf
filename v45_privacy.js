/* ============================================================================
 * SmartGolf v45 — 위치정보 국외 이전 사전 고지·동의
 *
 * 왜 필요한가
 *   이 앱은 '현재 위치' 또는 '출발지 주소'를 쓸 때 이용자의 위치 좌표를
 *   해외 서버 두 곳으로 보낸다.
 *     · OpenStreetMap Foundation (nominatim.openstreetmap.org) — 좌표↔주소 변환
 *     · Project OSRM (router.project-osrm.org)                 — 도로 거리·소요시간
 *   국외 이전에 해당하므로, 첫 사용 시 한 번 알리고 동의를 받는다.
 *
 * 설계 원칙
 *   1) 동의 전에는 좌표가 단 한 번도 나가지 않는다.
 *      호출 지점이 여러 곳(index.html·sg_round.js·v7_patch.js)이라 각 지점을 고치지 않고
 *      네트워크 계층(fetch/XHR)과 geolocation API를 감싼다. 새 패치가 추가돼도 자동으로 걸린다.
 *   2) 거부해도 앱을 쓸 수 있다. 지역·시군구 칩으로 골라 보는 길을 안내한다.
 *   3) 동의는 언제든 철회할 수 있다(화면 맨 아래 '위치 전송 동의 철회').
 * ========================================================================== */
(function () {
  'use strict';

  var KEY = 'sg_geo_consent_v1';
  var BLOCK = /nominatim\.openstreetmap\.org|router\.project-osrm\.org/i;

  function granted() {
    try { return localStorage.getItem(KEY) === '1'; } catch (e) { return false; }
  }
  function setGranted(v) {
    try {
      if (v) localStorage.setItem(KEY, '1');
      else localStorage.removeItem(KEY);
    } catch (e) {}
  }

  var pending = null;          // 동의 창은 동시에 하나만 (OSRM은 8번 호출된다)

  function buildModal(resolve) {
    var back = document.createElement('div');
    back.id = 'sgGeoConsent';
    back.setAttribute('role', 'dialog');
    back.setAttribute('aria-modal', 'true');
    back.setAttribute('aria-labelledby', 'sgGeoConsentTitle');
    back.innerHTML =
      '<div class="sgc-card">' +
      '<div class="sgc-title" id="sgGeoConsentTitle">위치를 보내기 전에 알려드립니다</div>' +
      '<div class="sgc-body">' +
      '현재 위치는 <b>주소 변환과 도로거리 계산</b>을 위해 ' +
      '<b>OpenStreetMap · OSRM(해외 서버)</b>에 전송되며 <b>저장되지 않습니다</b>.' +
      '</div>' +
      '<ul class="sgc-list">' +
      '<li>받는 곳 — OpenStreetMap Foundation(영국), Project OSRM(해외)</li>' +
      '<li>보내는 것 — 현재 위치 좌표(위도·경도) 또는 입력한 출발지</li>' +
      '<li>보관 — 요청 처리 후 즉시 폐기, 우리 서버에는 저장하지 않음</li>' +
      '<li>동의하지 않아도 <b>지역·시군구 선택</b>으로 골프장을 볼 수 있습니다</li>' +
      '</ul>' +
      '<div class="sgc-actions">' +
      '<button type="button" id="sgcNo">지역 선택으로</button>' +
      '<button type="button" id="sgcYes">동의하고 계속</button>' +
      '</div>' +
      '<a class="sgc-link" href="privacy.html" target="_blank" rel="noopener">개인정보처리방침 보기</a>' +
      '</div>';
    document.body.appendChild(back);

    function done(ok) {
      setGranted(ok);
      if (back.parentNode) back.parentNode.removeChild(back);
      pending = null;
      if (!ok) toRegion();
      if (ok) renderRevoke();
      resolve(ok);
    }
    back.querySelector('#sgcYes').addEventListener('click', function () { done(true); });
    back.querySelector('#sgcNo').addEventListener('click', function () { done(false); });
    back.addEventListener('click', function (e) { if (e.target === back) done(false); });
    document.addEventListener('keydown', function esc(e) {
      if (e.key === 'Escape' && document.getElementById('sgGeoConsent')) {
        document.removeEventListener('keydown', esc); done(false);
      }
    });
    setTimeout(function () { var y = back.querySelector('#sgcYes'); if (y) y.focus(); }, 60);
  }

  function toRegion() {
    var tags = document.getElementById('regionTags');
    if (tags) {
      tags.scrollIntoView({ behavior: 'smooth', block: 'center' });
      tags.style.transition = 'box-shadow .3s';
      tags.style.boxShadow = '0 0 0 3px rgba(26,122,58,.45)';
      setTimeout(function () { tags.style.boxShadow = ''; }, 1600);
    }
  }

  function ask() {
    if (granted()) return Promise.resolve(true);
    if (pending) return pending;
    pending = new Promise(function (resolve) {
      if (document.body) buildModal(resolve);
      else document.addEventListener('DOMContentLoaded', function () { buildModal(resolve); });
    });
    return pending;
  }

  /* ---- 1) fetch 게이트 : 좌표가 나가는 요청은 동의 전에 보내지 않는다 ---- */
  var _fetch = window.fetch;
  if (_fetch) {
    window.fetch = function (input, init) {
      var url = (typeof input === 'string') ? input
              : (input && input.url) ? input.url : '';
      if (BLOCK.test(url) && !granted()) {
        var self = this, args = arguments;
        return ask().then(function (ok) {
          if (!ok) {
            var e = new Error('SmartGolf: 위치 전송에 동의하지 않아 요청을 보내지 않았습니다.');
            e.sgDeclined = true;
            throw e;
          }
          return _fetch.apply(self, args);
        });
      }
      return _fetch.apply(this, arguments);
    };
  }

  /* ---- 2) XMLHttpRequest 게이트 (일부 옛 패치가 사용) ---- */
  var _open = window.XMLHttpRequest && XMLHttpRequest.prototype.open;
  if (_open) {
    XMLHttpRequest.prototype.open = function (method, url) {
      if (typeof url === 'string' && BLOCK.test(url) && !granted()) {
        this.__sgBlocked = true;
        ask();
      }
      return _open.apply(this, arguments);
    };
    var _send = XMLHttpRequest.prototype.send;
    XMLHttpRequest.prototype.send = function () {
      if (this.__sgBlocked) return;      // 동의 전에는 실제로 보내지 않는다
      return _send.apply(this, arguments);
    };
  }

  /* ---- 3) geolocation 게이트 : 브라우저 권한창보다 우리 고지가 먼저 ---- */
  var geo = navigator.geolocation;
  if (geo && geo.getCurrentPosition) {
    var origGet = geo.getCurrentPosition.bind(geo);
    geo.getCurrentPosition = function (ok, err, opt) {
      if (granted()) return origGet(ok, err, opt);
      ask().then(function (agreed) {
        if (agreed) return origGet(ok, err, opt);
        if (typeof err === 'function') {
          err({ code: 1, PERMISSION_DENIED: 1,
                message: '위치 전송에 동의하지 않았습니다. 지역 선택으로 이용할 수 있습니다.' });
        }
      });
    };
    if (geo.watchPosition) {
      var origWatch = geo.watchPosition.bind(geo);
      geo.watchPosition = function (ok, err, opt) {
        if (granted()) return origWatch(ok, err, opt);
        ask().then(function (agreed) { if (agreed) origWatch(ok, err, opt); });
        return -1;
      };
    }
  }

  /* ---- 4) 철회 버튼 (화면 맨 아래 출처 고지 옆) ---- */
  function renderRevoke() {
    var host = document.getElementById('sg44SrcNote') || document.getElementById('siteFooter');
    if (!host) return;
    var old = document.getElementById('sgGeoRevoke');
    if (!granted()) { if (old) old.remove(); return; }
    if (old) return;
    var wrap = document.createElement('div');
    wrap.id = 'sgGeoRevoke';
    wrap.style.cssText = 'margin-top:10px';
    wrap.innerHTML =
      '<button type="button" id="sgGeoRevokeBtn">위치 전송 동의 철회</button>' +
      '<span style="margin-left:8px;opacity:.8">철회하면 다음 사용 때 다시 물어봅니다.</span>';
    host.appendChild(wrap);
    wrap.querySelector('#sgGeoRevokeBtn').addEventListener('click', function () {
      setGranted(false);
      wrap.remove();
      if (typeof window.showToast === 'function') window.showToast('위치 전송 동의를 철회했습니다.', 'info');
    });
  }

  window.sgGeoConsent = { granted: granted, revoke: function () { setGranted(false); renderRevoke(); }, ask: ask };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { setTimeout(renderRevoke, 1500); });
  } else {
    setTimeout(renderRevoke, 1500);
  }
})();
