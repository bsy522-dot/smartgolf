/* ============================================================
   SmartGolf — GPS 라운드 모드 v1.0 (2026-08-22)
   골프버디식: 현 위치로 골프장 자동 인식 → 홀별 샷 마크 → 샷 거리(m) 측정
   - 데이터: courses_enriched.json 좌표(582/585개) + 브라우저 Geolocation
   - 홀 단위 자동 인식은 홀별 좌표 데이터가 없어 수동 홀 선택(1~18)
   - 라운드 종료 시 sg_rounds에 저장 → 기존 '퍼포먼스 트렌드' 차트와 연동
   - 진행 중 라운드는 sg_gps_active에 보존(앱을 닫아도 이어짐)
   ============================================================ */
(function () {
  'use strict';
  var COURSES = [];
  var st = { course: null, hole: 1, shots: {}, startedAt: null, watching: false };

  // ── 유틸 ──
  function dist(a, b) { // Haversine (m)
    var R = 6371000, toR = Math.PI / 180;
    var dLat = (b.lat - a.lat) * toR, dLng = (b.lng - a.lng) * toR;
    var s = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(a.lat * toR) * Math.cos(b.lat * toR) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
    return Math.round(R * 2 * Math.atan2(Math.sqrt(s), Math.sqrt(1 - s)));
  }
  function esc(x) { return String(x).replace(/&/g, '&amp;').replace(/</g, '&lt;'); }
  function save() { try { localStorage.setItem('sg_gps_active', JSON.stringify(st)); } catch (e) {} }
  function load() {
    try { var d = JSON.parse(localStorage.getItem('sg_gps_active') || 'null'); if (d && d.course) st = d; } catch (e) {}
  }
  function getPos() {
    return new Promise(function (res, rej) {
      if (!navigator.geolocation) return rej(new Error('이 브라우저는 위치를 지원하지 않습니다'));
      navigator.geolocation.getCurrentPosition(
        function (p) { res({ lat: p.coords.latitude, lng: p.coords.longitude, acc: Math.round(p.coords.accuracy) }); },
        function (e) { rej(new Error(e.code === 1 ? '위치 권한을 허용해 주세요' : '위치를 가져오지 못했습니다')); },
        { enableHighAccuracy: true, timeout: 12000, maximumAge: 3000 });
    });
  }

  // ── 스타일 (밝은 테마 기준·큰 글씨) ──
  var css = document.createElement('style');
  css.textContent =
    '#sgRoundFab{position:fixed;bottom:70px;left:16px;z-index:99;border:none;border-radius:24px;padding:12px 18px;' +
    'background:linear-gradient(135deg,#1a7a3a,#0f5a28);color:#fff;font-size:15px;font-weight:800;box-shadow:0 4px 16px rgba(26,122,58,.45);cursor:pointer}' +
    '#sgRoundOv{position:fixed;inset:0;background:rgba(240,244,240,.98);z-index:11000;display:none;overflow-y:auto;-webkit-overflow-scrolling:touch;color:#163020}' +
    '#sgRoundOv.active{display:block}' +
    '.sgr-wrap{max-width:520px;margin:0 auto;padding:18px 16px 40px}' +
    '.sgr-top{display:flex;justify-content:space-between;align-items:center;margin-bottom:10px}' +
    '.sgr-top h2{font-size:20px;font-weight:900;color:#0f5a28}' +
    '.sgr-x{border:none;background:#e3ebe3;border-radius:50%;width:38px;height:38px;font-size:19px;cursor:pointer}' +
    '.sgr-course{background:#fff;border:1.5px solid #cfe0cf;border-radius:14px;padding:14px;margin-bottom:12px;font-size:15px}' +
    '.sgr-course b{font-size:17px}' +
    '.sgr-holes{display:grid;grid-template-columns:repeat(9,1fr);gap:5px;margin:10px 0 14px}' +
    '.sgr-hole{border:1.5px solid #cfe0cf;background:#fff;border-radius:9px;padding:8px 0;text-align:center;font-size:14px;font-weight:700;cursor:pointer}' +
    '.sgr-hole.on{background:#1a7a3a;color:#fff;border-color:#1a7a3a}' +
    '.sgr-hole.done{background:#e7f3ea;color:#1a7a3a}' +
    '#sgrShotBtn{width:100%;border:none;border-radius:16px;padding:20px;background:linear-gradient(135deg,#1a7a3a,#0f5a28);color:#fff;font-size:20px;font-weight:900;cursor:pointer;box-shadow:0 4px 14px rgba(26,122,58,.35)}' +
    '#sgrShotBtn:disabled{opacity:.55}' +
    '.sgr-dist{background:#fff;border:1.5px solid #cfe0cf;border-radius:14px;padding:14px;margin:12px 0;text-align:center}' +
    '.sgr-dist .big{font-size:34px;font-weight:900;color:#0f5a28}' +
    '.sgr-list{font-size:14px;line-height:1.9;background:#fff;border:1.5px solid #cfe0cf;border-radius:14px;padding:12px 14px;margin-bottom:12px}' +
    '.sgr-row2{display:flex;gap:10px}' +
    '.sgr-row2 button{flex:1;border:none;border-radius:12px;padding:13px;font-size:15px;font-weight:800;cursor:pointer}' +
    '#sgrHoleDone{background:#e7f3ea;color:#0f5a28}#sgrEnd{background:#fbeaea;color:#a33}' +
    '.sgr-note{font-size:12.5px;color:#5a6f5f;margin-top:10px;line-height:1.6}' +
    '.sgr-pick{width:100%;font-size:15px;padding:11px;border-radius:10px;border:1.5px solid #cfe0cf;background:#fff;margin-top:8px}';
  document.head.appendChild(css);

  // ── DOM ──
  var fab = document.createElement('button');
  fab.id = 'sgRoundFab';
  fab.innerHTML = '⛳ GPS 라운드';
  document.body.appendChild(fab);
  var ov = document.createElement('div');
  ov.id = 'sgRoundOv';
  ov.innerHTML = '<div class="sgr-wrap">' +
    '<div class="sgr-top"><h2>⛳ GPS 라운드</h2><button class="sgr-x" id="sgrClose">✕</button></div>' +
    '<div id="sgrBody">위치 확인 중...</div></div>';
  document.body.appendChild(ov);
  document.getElementById('sgrClose').addEventListener('click', function () { ov.classList.remove('active'); });

  function shotsOfHole(h) { return st.shots[h] || (st.shots[h] = []); }
  function totalShots() { var n = 0; Object.keys(st.shots).forEach(function (k) { n += st.shots[k].length; }); return n; }

  function render(msg) {
    var body = document.getElementById('sgrBody');
    if (!st.course) {
      body.innerHTML = '<div class="sgr-course">' + (msg || '골프장을 인식하지 못했습니다.') +
        '<select class="sgr-pick" id="sgrPick"><option value="">근처 골프장 직접 선택...</option></select>' +
        '<button id="sgrRetry" class="sgr-pick" style="font-weight:800;cursor:pointer">📍 다시 위치 인식</button>' +
        '<div class="sgr-note">· 골프장 반경 5km 안에서 자동 인식됩니다.<br>· 위치 권한 허용이 필요합니다.</div></div>';
      var pick = document.getElementById('sgrPick');
      (window.__sgrNear || []).forEach(function (c, i) {
        var o = document.createElement('option');
        o.value = i; o.textContent = c.n + ' (' + (c._d / 1000).toFixed(1) + 'km)';
        pick.appendChild(o);
      });
      pick.addEventListener('change', function () {
        if (this.value === '') return;
        st.course = window.__sgrNear[Number(this.value)];
        st.startedAt = st.startedAt || Date.now(); save(); render();
      });
      document.getElementById('sgrRetry').addEventListener('click', detect);
      return;
    }
    var h = st.hole, sh = shotsOfHole(h);
    var holesHtml = '';
    for (var i = 1; i <= 18; i++) {
      var cls = i === h ? 'on' : ((st.shots[i] && st.shots[i].length) ? 'done' : '');
      holesHtml += '<div class="sgr-hole ' + cls + '" data-h="' + i + '">' + i + '</div>';
    }
    var last = sh[sh.length - 1];
    var prev = sh[sh.length - 2];
    var distHtml = sh.length === 0 ? '아직 샷이 없습니다. 공 앞에서 <b>샷 기록</b>을 누르세요.' :
      (sh.length === 1 ? '<div>1번째 샷 기록됨 (±' + last.acc + 'm)</div><div class="sgr-note">다음 지점에서 누르면 비거리가 나옵니다</div>' :
       '<div class="big">' + dist(prev, last) + 'm</div><div>' + (sh.length - 1) + '번째 샷 비거리 (GPS ±' + last.acc + 'm)</div>');
    var listHtml = '';
    for (var j = 1; j < sh.length; j++) listHtml += '· ' + j + '타: <b>' + dist(sh[j - 1], sh[j]) + 'm</b><br>';
    body.innerHTML =
      '<div class="sgr-course">📍 <b>' + esc(st.course.n) + '</b><br><span style="color:#5a6f5f">' + esc(st.course.a || '') + '</span></div>' +
      '<div class="sgr-holes">' + holesHtml + '</div>' +
      '<button id="sgrShotBtn">📍 ' + h + '번홀 샷 기록 (' + sh.length + '타)</button>' +
      '<div class="sgr-dist">' + distHtml + '</div>' +
      (listHtml ? '<div class="sgr-list"><b>' + h + '번홀 샷 거리</b><br>' + listHtml + '</div>' : '') +
      '<div class="sgr-row2"><button id="sgrHoleDone">홀 완료 → 다음 홀</button><button id="sgrEnd">라운드 종료</button></div>' +
      '<div class="sgr-note">· 샷 직전 공 옆에서 누를수록 정확합니다 (GPS 오차 ±5~15m)<br>· 총 ' + totalShots() + '타 · 진행 상황은 자동 저장됩니다</div>';
    body.querySelectorAll('.sgr-hole').forEach(function (el) {
      el.addEventListener('click', function () { st.hole = Number(this.dataset.h); save(); render(); });
    });
    document.getElementById('sgrShotBtn').addEventListener('click', function () {
      var btn = this; btn.disabled = true; btn.textContent = '위치 잡는 중...';
      getPos().then(function (p) {
        shotsOfHole(st.hole).push(p); save(); render();
      }).catch(function (e) { btn.disabled = false; render(); if (window.showToast) showToast(e.message, 'warning'); });
    });
    document.getElementById('sgrHoleDone').addEventListener('click', function () {
      if (st.hole < 18) { st.hole += 1; save(); render(); }
    });
    document.getElementById('sgrEnd').addEventListener('click', endRound);
  }

  function endRound() {
    var played = Object.keys(st.shots).filter(function (k) { return st.shots[k].length; }).length;
    var total = totalShots();
    if (total === 0) { ov.classList.remove('active'); return; }
    if (!confirm('라운드를 종료할까요?\n' + played + '개 홀 · 총 ' + total + '타 기록')) return;
    try {
      var rounds = JSON.parse(localStorage.getItem('sg_rounds') || '[]');
      rounds.unshift({
        date: new Date().toISOString().slice(0, 10),
        course: st.course.n,
        score: total,
        holes: [],
        memo: 'GPS 라운드 (' + played + '홀, 샷 거리 기록)',
        id: Date.now()
      });
      localStorage.setItem('sg_rounds', JSON.stringify(rounds));
      var hist = JSON.parse(localStorage.getItem('sg_gps_rounds') || '[]');
      hist.unshift({ date: Date.now(), course: st.course.n, shots: st.shots, total: total });
      localStorage.setItem('sg_gps_rounds', JSON.stringify(hist.slice(0, 50)));
    } catch (e) {}
    localStorage.removeItem('sg_gps_active');
    st = { course: null, hole: 1, shots: {}, startedAt: null };
    if (window.showToast) showToast('라운드 저장! 총 ' + total + '타 — 트렌드 차트에 반영됩니다', 'success');
    ov.classList.remove('active');
  }

  function detect() {
    var body = document.getElementById('sgrBody');
    body.innerHTML = '위치 확인 중... (권한 요청이 뜨면 허용해 주세요)';
    getPos().then(function (p) {
      var near = COURSES.filter(function (c) { return c.lat && c.lng; })
        .map(function (c) { var d = dist(p, c); var o = Object.assign({}, c); o._d = d; return o; })
        .sort(function (a, b) { return a._d - b._d; }).slice(0, 10);
      window.__sgrNear = near;
      if (near.length && near[0]._d <= 5000) {
        st.course = near[0]; st.startedAt = st.startedAt || Date.now(); save(); render();
      } else {
        render(near.length ? '가장 가까운 골프장: ' + esc(near[0].n) + ' (' + (near[0]._d / 1000).toFixed(1) + 'km) — 5km 밖이라 자동 시작하지 않았습니다.' : '골프장 데이터를 찾지 못했습니다.');
      }
    }).catch(function (e) { window.__sgrNear = []; render(e.message); });
  }

  function open() {
    ov.classList.add('active');
    load();
    if (st.course) { render(); } else { detect(); }
  }
  fab.addEventListener('click', open);

  fetch('courses_enriched.json').then(function (r) { return r.json(); }).then(function (d) {
    COURSES = Array.isArray(d) ? d : (d.courses || []);
  }).catch(function () {});
})();
