/* ============================================================================
 * SmartGolf v44 — 손님눈 품질감사(2026-08-31) 지적사항 구조 수리
 *
 * 이 패치가 고치는 것
 *  B-1 부산/울산/제주 지역칩이 GPS라운드 알약·하단 기능바에 가려 탭 불가
 *  B-3 첫 화면에 골프장이 0개 (첫 카드가 1,937px = 2.3화면 아래)
 *  B-4 화면 하단 128px에 고정 요소 6겹 (backToTop이 fabGps를 완전히 가림)
 *  C-6 기능 버튼 39개 나열 + IQ 버전 중복 노출
 *  C-7 하단 '지도' 탭을 눌러도 스크롤이 안 되는 문제
 *  C-12 지역칩이 시·도 17개뿐이라 시·군 단위로 좁힐 수 없던 문제
 *  5절 가격/전화 결측을 '정직한 빈 상태'로, 군 골프장에 이용 제한 고지
 *
 * 원칙: 기존 기능을 지우지 않는다. 하단바 3개의 버튼은 DOM 노드를 그대로
 *       '기능' 서랍으로 옮겨 담으므로 이벤트 리스너와 동작이 유지된다.
 * ========================================================================== */
(function () {
  'use strict';

  var isMobile = function () { return window.matchMedia('(max-width: 768px)').matches; };
  function $(id) { return document.getElementById(id); }
  function ready(fn) {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn);
    else fn();
  }

  /* ---------------------------------------------------------------------
   * 1) 필터 접기 — 첫 화면에 '빈 신청서' 대신 골프장 목록이 먼저 보이게
   * ------------------------------------------------------------------- */
  function setupFilterCollapse() {
    var sec = document.querySelector('.search-section');
    if (!sec || $('sg44QuickRow')) return;

    // 접어도 '골프장 검색'은 항상 보이게 — 검색이 이 앱의 본업이므로 숨기지 않는다.
    var row = document.createElement('div');
    row.id = 'sg44QuickRow';
    sec.insertBefore(row, sec.firstChild);

    var nameGroup = sec.querySelector('.search-bar .search-group.sg-name');
    if (nameGroup) {
      var lbl = nameGroup.querySelector('label');
      if (lbl) lbl.style.display = 'none';        // 한 줄로 쓰기 위해 라벨은 감춘다
      var inp = nameGroup.querySelector('input');
      if (inp) inp.placeholder = '골프장 · 지역 이름으로 검색 (예: 용인)';
      nameGroup.style.flex = '1 1 auto';
      nameGroup.style.minWidth = '0';
      row.appendChild(nameGroup);
    }

    var btn = document.createElement('button');
    btn.id = 'sg44FilterToggle';
    btn.type = 'button';
    btn.innerHTML = '<i class="fas fa-filter"></i><span>필터</span>';
    row.appendChild(btn);

    var openPref = null;
    try { openPref = localStorage.getItem('sg44_filter_open'); } catch (e) {}
    if (isMobile() && openPref !== '1') sec.classList.add('sg44-collapsed');

    function sync() {
      var collapsed = sec.classList.contains('sg44-collapsed');
      btn.classList.toggle('on', !collapsed);
      btn.setAttribute('aria-expanded', String(!collapsed));
    }
    btn.addEventListener('click', function () {
      var collapsed = sec.classList.toggle('sg44-collapsed');
      try { localStorage.setItem('sg44_filter_open', collapsed ? '0' : '1'); } catch (e) {}
      sync();
    });
    sync();

    // 하단 '검색' 탭을 누르면 필터를 펴 준다(출발지 입력칸이 접혀 있으면 포커스가 안 잡힘)
    document.querySelectorAll('.mobile-nav-btn').forEach(function (b) {
      if (b.dataset.nav !== 'search') return;
      b.addEventListener('click', function () {
        sec.classList.remove('sg44-collapsed');
        sync();
        setTimeout(function () {
          var a = $('addressInput');
          if (a) a.focus();
        }, 250);
      }, true);
    });
  }

  /* ---------------------------------------------------------------------
   * 2) 결과를 지도보다 위로 — 첫 카드가 폴드 위로 올라오게
   * ------------------------------------------------------------------- */
  function liftResultsAboveMap() {
    var results = document.querySelector('.results-section');
    var mapSec = $('map-section');
    if (!results || !mapSec || !mapSec.parentNode) return;
    if (mapSec.compareDocumentPosition(results) & Node.DOCUMENT_POSITION_FOLLOWING) {
      // 지도가 결과보다 앞에 있으면 결과 뒤로 옮긴다
      results.parentNode.insertBefore(mapSec, results.nextSibling);
    }
  }

  /* ---------------------------------------------------------------------
   * 2-b) 부차 블록을 결과 아래로 — 골프장이 첫 화면에 오게 (B-3)
   *   기능 버튼 줄 4개(441px) + 통계바(244px)가 칩과 카드 사이를 막고 있었다.
   *   지우지 않고 '결과 뒤'로 옮기기만 한다.
   * ------------------------------------------------------------------- */
  function demoteSecondaryBlocks() {
    var results = document.querySelector('.results-section');
    if (!results) return;
    var picks = [];
    ['v8-quick-row', 'quick-actions'].forEach(function (cls) {
      document.querySelectorAll('body > .' + cls).forEach(function (el) { picks.push(el); });
    });
    var sb = $('statsBar');
    if (sb && sb.parentNode === document.body) picks.push(sb);
    Array.prototype.forEach.call(document.body.children, function (el) {
      if (el.nodeType !== 1 || !el.querySelector) return;
      if (el === results || el.contains(results)) return;
      if (el.querySelector(':scope > .v22-btn, :scope > .v23-btn')) picks.push(el);
    });
    var anchor = results.nextSibling;
    picks.forEach(function (el) {
      if (el === results || results.contains(el) || el.dataset.sg44Demoted === '1') return;
      el.dataset.sg44Demoted = '1';
      document.body.insertBefore(el, anchor);
    });
    // 결과 헤더 위의 버튼 줄은 카드 그리드 뒤로
    var q = $('sg9QuickActions'), grid = $('cardGrid');
    if (q && grid && grid.parentNode && q.dataset.sg44Demoted !== '1') {
      q.dataset.sg44Demoted = '1';
      grid.parentNode.insertBefore(q, grid.nextSibling);
    }
  }

  /* ---------------------------------------------------------------------
   * 3) 하단 고정 요소 6겹 -> mobile-nav 하나 + 오른쪽 FAB 3개
   *    sg25FabBar / sg27BottomBar / sg29-bottom-bar 의 버튼을 '기능' 서랍으로
   * ------------------------------------------------------------------- */
  var drawer, backdrop;

  function buildDrawer() {
    if ($('sg44Drawer')) return;

    backdrop = document.createElement('div');
    backdrop.id = 'sg44Backdrop';
    document.body.appendChild(backdrop);

    drawer = document.createElement('div');
    drawer.id = 'sg44Drawer';
    drawer.innerHTML =
      '<button id="sg44DrawerClose" type="button" aria-label="닫기">&times;</button>' +
      '<div style="font-weight:800;font-size:15px;padding-right:34px">기능 전체보기</div>' +
      '<div style="font-size:11.5px;color:var(--text-muted);margin-top:4px">' +
      '골프장 찾기 화면을 가리던 하단 버튼판 3개를 이곳으로 모았습니다.</div>' +
      '<h4>라운드 · 날씨</h4><div class="sg44-grid" id="sg44GridA"></div>' +
      '<h4>분석 · 기록</h4><div class="sg44-grid" id="sg44GridB"></div>' +
      '<h4>연습 · 학습</h4><div class="sg44-grid" id="sg44GridC"></div>';
    document.body.appendChild(drawer);

    function close() {
      drawer.classList.remove('open');
      backdrop.classList.remove('open');
    }
    $('sg44DrawerClose').addEventListener('click', close);
    backdrop.addEventListener('click', close);
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });
  }

  function openDrawer() {
    if (!drawer) return;
    harvestButtons();
    drawer.classList.add('open');
    backdrop.classList.add('open');
  }

  // 하단바가 비동기로 만들어지므로 일정 시간 동안 반복 수거한다
  function harvestButtons() {
    var a = $('sg44GridA'), b = $('sg44GridB'), c = $('sg44GridC');
    if (!a) return 0;
    var moved = 0;
    // R-2: 'GPS 라운드' 알약(146px)이 글자확대 1.5배에서 첫 카드 가격을 100% 가렸다.
    //      떠다니게 두지 않고 서랍 맨 위에 전체폭 버튼으로 수납한다(동작은 그대로).
    var rf = $('sgRoundFab');
    if (rf && !drawer.contains(rf)) { a.insertBefore(rf, a.firstChild); moved++; }
    var wx = $('wxRecFab');
    if (wx && !drawer.contains(wx)) { a.appendChild(wx); moved++; }
    document.querySelectorAll('.sg27-bbtn').forEach(function (el) {
      if (!drawer.contains(el)) { b.appendChild(el); moved++; }
    });
    document.querySelectorAll('.sg29-bbtn').forEach(function (el) {
      if (!drawer.contains(el)) { b.appendChild(el); moved++; }
    });
    document.querySelectorAll('.sg25-fab').forEach(function (el) {
      if (!drawer.contains(el)) { c.appendChild(el); moved++; }
    });
    // 아이콘만 있는 버튼에는 title을 읽어 라벨을 붙인다(서랍에서 무슨 기능인지 보이게)
    drawer.querySelectorAll('.sg44-grid > *').forEach(function (el) {
      if (el.dataset.sg44Labeled === '1') return;
      el.dataset.sg44Labeled = '1';
      if (el.querySelector('.sg44-label')) return;
      var txt = (el.innerText || '').trim();
      if (/[가-힣]|[A-Za-z]{2,}|[0-9]/.test(txt)) return;   // 이미 글자 라벨이 있는 버튼(이모지만 있으면 라벨을 붙인다)
      var t = (el.getAttribute('title') || el.getAttribute('aria-label') || '').trim();
      if (!t) return;
      t = t.replace(/\s*\(.*?\)\s*/g, '').slice(0, 12);
      var sp = document.createElement('span');
      sp.className = 'sg44-label';
      sp.textContent = t;
      el.appendChild(sp);
    });

    // 같은 기능의 옛 버전 버튼(Golf IQ v9 / IQ v11)은 최신 IQ v13 하나만 남기고 숨긴다.
    // 코드는 지우지 않으므로 단축키(Shift+Q 등)로는 그대로 접근할 수 있다.
    drawer.querySelectorAll('.sg44-grid > *').forEach(function (el) {
      var t = ((el.innerText || '') + ' ' + (el.getAttribute('title') || '')).replace(/\s+/g, ' ');
      if (/IQ\s*v(9|11)\b/.test(t)) el.classList.add('sg44-hide');
    });

    // 빈 껍데기 바는 레이아웃에서 제거
    ['sg25FabBar', 'sg27BottomBar'].forEach(function (id) {
      var el = $(id);
      if (el && !el.children.length && el.parentNode) el.parentNode.removeChild(el);
    });
    document.querySelectorAll('.sg27-bottom-bar, .sg29-bottom-bar').forEach(function (el) {
      if (!el.children.length && el.parentNode) el.parentNode.removeChild(el);
    });
    return moved;
  }

  function addToolsNavButton() {
    var inner = document.querySelector('.mobile-nav-inner');
    if (!inner || $('sg44ToolsBtn')) return;
    var btn = document.createElement('button');
    btn.id = 'sg44ToolsBtn';
    btn.className = 'mobile-nav-btn';
    btn.type = 'button';
    btn.innerHTML = '<i class="fas fa-th"></i> 기능';
    btn.addEventListener('click', function () {
      document.querySelectorAll('.mobile-nav-btn').forEach(function (x) { x.classList.remove('active'); });
      btn.classList.add('active');
      openDrawer();
    });
    inner.appendChild(btn);
  }

  /* ---------------------------------------------------------------------
   * 4) '지도' 탭이 실제로 지도로 이동하게 (C-7)
   * ------------------------------------------------------------------- */
  function fixMapNav() {
    document.querySelectorAll('.mobile-nav-btn').forEach(function (btn) {
      if (btn.dataset.nav !== 'map') return;
      btn.addEventListener('click', function () {
        // viewMap 토글로 display가 바뀐 뒤에 스크롤해야 위치가 잡힌다
        setTimeout(function () {
          var m = $('map-section');
          if (m) m.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 220);
      });
    });
  }

  /* ---------------------------------------------------------------------
   * 5) 시·군 2단 칩 (C-12) — 지역을 고르면 그 안의 시·군이 뜬다
   * ------------------------------------------------------------------- */
  function setupCityChips() {
    var regionTags = $('regionTags');
    if (!regionTags || $('cityTags')) return;
    var wrap = document.createElement('div');
    wrap.className = 'filter-tags';
    wrap.id = 'cityTags';
    regionTags.parentNode.insertBefore(wrap, regionTags.nextSibling);

    function courses() {
      // index.html의 `let allCourses`는 window 속성이 아니라 전역 렉시컬 바인딩이다
      try { return (typeof allCourses !== 'undefined' && allCourses.length) ? allCourses : []; }
      catch (e) { return []; }
    }

    function paint(region) {
      wrap.innerHTML = '';
      if (!region) { wrap.classList.remove('on'); return; }
      var counts = {};
      courses().forEach(function (c) {
        if (c.r !== region || !c.c) return;
        counts[c.c] = (counts[c.c] || 0) + 1;
      });
      var names = Object.keys(counts).sort(function (x, y) { return counts[y] - counts[x]; });
      if (!names.length) { wrap.classList.remove('on'); return; }
      var all = document.createElement('span');
      all.className = 'tag active';
      all.dataset.city = '';
      all.textContent = region + ' 전체';
      wrap.appendChild(all);
      names.forEach(function (n) {
        var t = document.createElement('span');
        t.className = 'tag';
        t.dataset.city = n;
        t.textContent = n + ' ' + counts[n];
        wrap.appendChild(t);
      });
      wrap.classList.add('on');
    }

    // 지역칩을 누르면 시·군 칩을 다시 그린다
    regionTags.addEventListener('click', function (e) {
      var tag = e.target.closest('.tag');
      if (!tag) return;
      window.sg44City = '';
      setTimeout(function () { paint(tag.dataset.region || ''); }, 0);
    });

    // 시·군 칩은 이름 검색란을 통해 필터링(기존 필터 로직을 건드리지 않음)
    wrap.addEventListener('click', function (e) {
      var tag = e.target.closest('.tag');
      if (!tag) return;
      wrap.querySelectorAll('.tag').forEach(function (x) { x.classList.remove('active'); });
      tag.classList.add('active');
      var input = $('nameSearch');
      if (!input) return;
      input.value = tag.dataset.city || '';
      input.dispatchEvent(new Event('input', { bubbles: true }));
      if (typeof window.applyFilters === 'function') window.applyFilters();
      var rs = document.querySelector('.results-section');
      if (rs) rs.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  /* ---------------------------------------------------------------------
   * 6) 카드의 '정직한 빈 상태' — 가격 미공개 / 군 골프장 이용 제한
   * ------------------------------------------------------------------- */
  var MIL = /체력단련장|공군|해군|육군|미군|경찰|계룡대|험프리스|보훈|복지단/;

  function annotateCards() {
    var grid = $('cardGrid');
    if (!grid) return;
    grid.querySelectorAll('.card').forEach(function (card) {
      if (card.dataset.sg44 === '1') return;
      card.dataset.sg44 = '1';
      var name = card.dataset.name || '';
      var info = card.querySelector('.card-info');

      if (!card.querySelector('.card-price')) {
        var b = document.createElement('span');
        b.className = 'sg44-nobadge';
        b.textContent = '그린피 미공개';
        if (info) info.appendChild(b); else card.appendChild(b);
      }
      if (MIL.test(name)) {
        var m = document.createElement('span');
        m.className = 'sg44-milbadge';
        m.textContent = '일반 예약 제한';
        m.title = '군·경 복지시설로 일반인 이용에 제한이 있습니다. 이용 전 해당 기관에 확인하세요.';
        var top = card.querySelector('.card-badges') || card.querySelector('.card-top');
        if (top) top.appendChild(m);
      }
    });
  }

  /* ---------------------------------------------------------------------
   * 7) 좌표 출처 고지 (푸터)
   * ------------------------------------------------------------------- */
  function addSourceNote() {
    var f = $('siteFooter');
    if (!f || $('sg44SrcNote')) return;
    var withCoord = 0, total = 0;
    try {
      if (typeof allCourses !== 'undefined' && allCourses.length) {
        total = allCourses.length;
        allCourses.forEach(function (c) { if (c.lat && c.lng) withCoord++; });
      }
    } catch (e) {}
    if (!total) return;   // 데이터 로딩 전이면 다음 기회에
    var p = document.createElement('div');
    p.id = 'sg44SrcNote';
    p.style.cssText = 'margin-top:10px;padding-top:10px;border-top:1px dashed var(--border);line-height:1.7';
    p.innerHTML =
      '<b>좌표 출처</b> — 행정안전부 지방행정 인허가 데이터(체육시설 · 골프장) 및 OpenStreetMap. ' +
      (total ? ('현재 <b>' + withCoord + ' / ' + total + '</b>곳의 좌표를 확보했으며, ') : '') +
      '확인되지 않은 골프장은 거리를 지어내지 않고 <b>“거리 확인 중”</b>으로 표시합니다.<br>' +
      '<b>그린피</b>는 공개된 곳만 표시하며, 실제 요금은 시즌 · 시간대에 따라 다릅니다. 예약 전 골프장에 확인하세요.';
    f.appendChild(p);
  }


  /* ---------------------------------------------------------------------
   * R-1) 첫 방문 안내 — 전체화면 모달 대신 결과 위 인라인 배너
   *   기존 #onboardingOverlay 는 position:fixed·z-index 9000 으로 화면 100%를 덮어
   *   3~4초 시점에 첫 화면 카드를 가렸다(첫 카드 387px 개선을 스스로 무효화).
   *   같은 내용을 흐름 안의 배너로 옮겨, 아무것도 가리지 않고 한 번만 보여준다.
   * ------------------------------------------------------------------- */
  var WELCOME_KEY = 'sg_onboarded';

  function buildWelcome() {
    if ($('sg44Welcome')) return;
    try { if (localStorage.getItem(WELCOME_KEY)) return; } catch (e) {}
    var results = document.querySelector('.results-section');
    if (!results || !results.parentNode) return;

    var box = document.createElement('div');
    box.id = 'sg44Welcome';
    box.setAttribute('role', 'region');
    box.setAttribute('aria-label', '처음 오신 분 안내');
    box.innerHTML =
      '<div class="w-title"><i class="fas fa-golf-ball-tee"></i> 전국 골프장을 거리·가격으로 비교하세요</div>' +
      '<div class="w-sub">위치를 켜면 <b>실제 운전 시간</b>까지 계산합니다. 확인된 값만 표시하고 지어내지 않습니다.</div>' +
      '<ul id="sg44WelcomeTips" hidden>' +
      '<li><b>거리·가격 정렬</b> — 목록 위 “거리순 / 가격순 / 이름순 / 홀수순” 버튼</li>' +
      '<li><b>지역 좁히기</b> — 지역 칩을 누르면 시·군 칩이 한 줄 더 나옵니다</li>' +
      '<li><b>상세 화면</b> — 카드를 누르면 주중·주말 그린피와 7일 날씨가 나옵니다</li>' +
      '<li><b>예산 계산기</b> — 상단 “예산” 버튼에서 그린피·카트·캐디를 한 번에</li>' +
      '<li><b>그 밖의 기능</b> — 하단 “기능” 버튼에 GPS 라운드 기록 등이 모여 있습니다</li>' +
      '</ul>' +
      '<div class="w-actions">' +
      '<button type="button" id="sg44WelcomeMore">사용법 보기</button>' +
      '<button type="button" id="sg44WelcomeClose">확인, 닫기</button>' +
      '</div>';
    results.parentNode.insertBefore(box, results);

    var tips = $('sg44WelcomeTips');
    var more = $('sg44WelcomeMore');
    more.addEventListener('click', function () {
      var open = !tips.hidden;
      tips.hidden = open;
      more.textContent = open ? '사용법 보기' : '접기';
    });
    $('sg44WelcomeClose').addEventListener('click', function () {
      try { localStorage.setItem(WELCOME_KEY, '1'); } catch (e) {}
      if (box.parentNode) box.parentNode.removeChild(box);
    });
  }

  /* ---------------------------------------------------------------------
   * 부팅
   * ------------------------------------------------------------------- */
  ready(function () {
    setupFilterCollapse();
    liftResultsAboveMap();
    demoteSecondaryBlocks();
    buildWelcome();
    // 옛 전체화면 온보딩이 어떤 경로로든 열리면 즉시 닫는다(안전장치)
    var ob = $('onboardingOverlay');
    if (ob && window.MutationObserver) {
      new MutationObserver(function () {
        if (ob.classList.contains('active')) ob.classList.remove('active');
      }).observe(ob, { attributes: true, attributeFilter: ['class'] });
    }
    buildDrawer();
    addToolsNavButton();
    fixMapNav();
    setupCityChips();

    // 비동기로 생성되는 하단바를 20초간 계속 수거
    var tries = 0;
    var iv = setInterval(function () {
      harvestButtons();
      demoteSecondaryBlocks();
      if (++tries > 40) clearInterval(iv);
    }, 500);

    // 카드가 다시 그려질 때마다 빈 상태 배지를 붙인다
    var grid = $('cardGrid');
    if (grid && window.MutationObserver) {
      new MutationObserver(function () { annotateCards(); }).observe(grid, { childList: true });
    }
    setTimeout(annotateCards, 800);
    setTimeout(addSourceNote, 1200);
  });
})();
