/* ====================================================================
 * SmartGolf v27.0 patch
 * 라운드리뷰AI분석기Canvas + 코스리뷰커뮤니티5점+해시태그 + 골프파트너매칭4축Canvas
 * + 라운드예산관리자CanvasPie + 클럽추천AI상황별14종 + 그린리딩트레이너Canvas
 * + 체력분석대시보드6축CanvasRadar + 골프루틴빌더8단계
 * + Golf IQ v11 15문항 + 업적+12(140→152) + SFX12종 + 키보드8종
 * ==================================================================== */
(function () {
  'use strict';

  const SGV27 = {};
  const LS = (k, v) => v === undefined ? JSON.parse(localStorage.getItem('sg27_' + k) || 'null') : localStorage.setItem('sg27_' + k, JSON.stringify(v));

  // ========== SFX ENGINE ==========
  const AC = new (window.AudioContext || window.webkitAudioContext)();
  const sfx = (freq, dur, type = 'sine', vol = 0.15) => {
    try {
      const o = AC.createOscillator(), g = AC.createGain();
      o.type = type; o.frequency.value = freq;
      g.gain.setValueAtTime(vol, AC.currentTime);
      g.gain.exponentialRampToValueAtTime(0.001, AC.currentTime + dur);
      o.connect(g); g.connect(AC.destination);
      o.start(); o.stop(AC.currentTime + dur);
    } catch (e) {}
  };
  const SFX = {
    review_open: () => { sfx(523, 0.12); sfx(659, 0.12); },
    review_submit: () => { sfx(659, 0.1); sfx(784, 0.1); sfx(1047, 0.15); },
    community_open: () => { sfx(440, 0.1); sfx(554, 0.12); },
    community_post: () => { sfx(587, 0.1); sfx(740, 0.12); sfx(880, 0.1); },
    partner_open: () => { sfx(392, 0.12); sfx(494, 0.1); },
    partner_match: () => { sfx(523, 0.08); sfx(659, 0.08); sfx(784, 0.08); sfx(1047, 0.15); },
    budget_open: () => { sfx(349, 0.1); sfx(440, 0.12); },
    budget_save: () => { sfx(523, 0.1); sfx(784, 0.12); },
    club_open: () => { sfx(466, 0.12); sfx(587, 0.1); },
    club_recommend: () => { sfx(587, 0.1); sfx(740, 0.1); sfx(880, 0.12); },
    green_open: () => { sfx(330, 0.12); sfx(415, 0.1); },
    green_putt: () => { sfx(415, 0.08); sfx(523, 0.08); sfx(659, 0.12); },
    fitness_open: () => { sfx(370, 0.1); sfx(466, 0.12); },
    fitness_record: () => { sfx(523, 0.1); sfx(659, 0.12); },
    routine_open: () => { sfx(294, 0.12); sfx(370, 0.1); },
    routine_complete: () => { sfx(523, 0.08); sfx(659, 0.08); sfx(784, 0.08); sfx(1047, 0.15, 'triangle'); },
    quiz_v11: () => { sfx(523, 0.1); sfx(659, 0.12); },
    quiz_correct11: () => { sfx(784, 0.1); sfx(1047, 0.15); },
    achieve_v27: () => { sfx(523, 0.06); sfx(659, 0.06); sfx(784, 0.06); sfx(1047, 0.06); sfx(1319, 0.2, 'triangle'); }
  };

  // ========== CSS ==========
  const css = `
.sg27-bottom-bar{position:fixed;bottom:0;left:0;right:0;z-index:96;background:var(--glass-bg,rgba(255,255,255,.92));backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);border-top:1px solid var(--border,#e0e0e0);padding:8px 12px;display:flex;gap:8px;overflow-x:auto;scrollbar-width:none;-ms-overflow-style:none}
.sg27-bottom-bar::-webkit-scrollbar{display:none}
.sg27-bbtn{flex-shrink:0;display:flex;flex-direction:column;align-items:center;gap:3px;padding:6px 10px;border-radius:10px;border:1px solid var(--border,#e0e0e0);background:var(--card-bg,#fff);cursor:pointer;transition:all .2s;min-width:58px}
.sg27-bbtn:hover,.sg27-bbtn:active{background:var(--primary-light,#e8f5e9);border-color:var(--primary,#1a7a3a)}
.sg27-bbtn-icon{font-size:18px;line-height:1}
.sg27-bbtn-label{font-size:9px;font-weight:700;color:var(--text-muted,#666);white-space:nowrap}
.sg27-overlay{display:none;position:fixed;top:0;left:0;right:0;bottom:0;z-index:1000;background:rgba(0,0,0,.55);overflow-y:auto;padding:20px;animation:sg27FadeIn .25s}
.sg27-overlay.active{display:flex;align-items:flex-start;justify-content:center}
@keyframes sg27FadeIn{from{opacity:0}to{opacity:1}}
.sg27-panel{background:var(--card-bg,#fff);border-radius:16px;max-width:600px;width:100%;margin:30px auto;box-shadow:0 8px 40px rgba(0,0,0,.3);overflow:hidden;animation:sg27SlideUp .3s}
@keyframes sg27SlideUp{from{transform:translateY(30px);opacity:0}to{transform:translateY(0);opacity:1}}
.sg27-panel-head{padding:16px 20px;color:#fff;display:flex;align-items:center;justify-content:space-between}
.sg27-panel-head h3{font-size:16px;font-weight:700;display:flex;align-items:center;gap:8px}
.sg27-panel-close{background:rgba(255,255,255,.25);border:none;color:#fff;width:30px;height:30px;border-radius:50%;cursor:pointer;font-size:16px}
.sg27-panel-body{padding:16px 20px;max-height:70vh;overflow-y:auto}
.sg27-card{background:var(--bg,#f5f7f5);border-radius:12px;padding:14px;margin-bottom:10px;border:1px solid var(--border,#e0e0e0);cursor:pointer;transition:all .2s}
.sg27-card:hover{box-shadow:0 2px 12px rgba(0,0,0,.1);transform:translateY(-1px)}
.sg27-card-title{font-weight:700;font-size:14px;color:var(--text,#1a1a1a);margin-bottom:4px;display:flex;align-items:center;gap:6px}
.sg27-card-desc{font-size:12px;color:var(--text-muted,#666);line-height:1.5}
.sg27-badge{display:inline-block;padding:2px 8px;border-radius:10px;font-size:10px;font-weight:700}
.sg27-badge-purple{background:#ede7f6;color:#6a1b9a}
.sg27-badge-green{background:#e8f5e9;color:#2e7d32}
.sg27-badge-blue{background:#e3f2fd;color:#1565c0}
.sg27-badge-orange{background:#fff3e0;color:#e65100}
.sg27-badge-red{background:#ffebee;color:#c62828}
.sg27-tabs{display:flex;gap:4px;margin-bottom:12px;flex-wrap:wrap}
.sg27-tab{padding:6px 14px;border-radius:20px;border:1px solid var(--border,#e0e0e0);background:var(--bg,#f5f7f5);font-size:12px;cursor:pointer;font-weight:600;color:var(--text-muted,#666);transition:all .2s}
.sg27-tab.active{background:var(--primary,#1a7a3a);color:#fff;border-color:var(--primary,#1a7a3a)}
.sg27-input{width:100%;padding:10px 14px;border:2px solid var(--border,#e0e0e0);border-radius:10px;font-size:13px;background:var(--card-bg,#fff);color:var(--text,#1a1a1a);outline:none;margin-bottom:8px}
.sg27-input:focus{border-color:var(--primary,#1a7a3a)}
.sg27-btn{padding:10px 20px;border:none;border-radius:10px;font-size:13px;font-weight:700;cursor:pointer;transition:all .2s;display:inline-flex;align-items:center;gap:6px}
.sg27-btn-primary{background:var(--primary,#1a7a3a);color:#fff}
.sg27-btn-primary:hover{filter:brightness(1.1)}
.sg27-btn-secondary{background:var(--bg,#f5f7f5);color:var(--text,#1a1a1a);border:1px solid var(--border,#e0e0e0)}
.sg27-stars{display:flex;gap:4px;margin:8px 0}
.sg27-star{font-size:24px;cursor:pointer;color:#ddd;transition:color .2s}
.sg27-star.filled{color:#ffc107}
.sg27-progress{height:8px;background:var(--border,#e0e0e0);border-radius:4px;overflow:hidden;margin:6px 0}
.sg27-progress-bar{height:100%;border-radius:4px;transition:width .4s}
.sg27-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:8px;margin:10px 0}
.sg27-stat-card{background:var(--card-bg,#fff);border:1px solid var(--border,#e0e0e0);border-radius:10px;padding:10px;text-align:center}
.sg27-stat-value{font-size:20px;font-weight:800;color:var(--primary,#1a7a3a)}
.sg27-stat-label{font-size:10px;color:var(--text-muted,#666);margin-top:2px}
.sg27-tag{display:inline-block;padding:3px 10px;border-radius:12px;font-size:11px;font-weight:600;background:var(--primary-light,#e8f5e9);color:var(--primary,#1a7a3a);margin:2px 3px}
.sg27-slider{width:100%;-webkit-appearance:none;height:6px;border-radius:3px;background:var(--border,#e0e0e0);outline:none}
.sg27-slider::-webkit-slider-thumb{-webkit-appearance:none;width:18px;height:18px;border-radius:50%;background:var(--primary,#1a7a3a);cursor:pointer}
canvas.sg27-canvas{width:100%;border-radius:12px;border:1px solid var(--border,#e0e0e0);background:var(--card-bg,#fff)}
`;
  const style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  // ========== UTILITY ==========
  function makeOverlay(id, title, color, body) {
    const el = document.createElement('div');
    el.className = 'sg27-overlay';
    el.id = id;
    el.innerHTML = `<div class="sg27-panel"><div class="sg27-panel-head" style="background:${color}"><h3>${title}</h3><button class="sg27-panel-close" onclick="document.getElementById('${id}').classList.remove('active')">&times;</button></div><div class="sg27-panel-body">${body}</div></div>`;
    document.body.appendChild(el);
    el.addEventListener('click', e => { if (e.target === el) el.classList.remove('active'); });
    return el;
  }
  function openPanel(id, sfxFn) {
    if (AC.state === 'suspended') AC.resume();
    document.getElementById(id).classList.add('active');
    if (sfxFn) sfxFn();
  }

  // ======================================================================
  // 1. 라운드 리뷰 AI 분석기 Canvas
  // ======================================================================
  SGV27.roundReview = (function () {
    const DATA_KEY = 'reviews';
    function getReviews() { return LS(DATA_KEY) || []; }
    function saveReview(r) { const arr = getReviews(); arr.unshift(r); if (arr.length > 30) arr.pop(); LS(DATA_KEY, arr); }

    function drawCanvas(el, review) {
      const c = el, ctx = c.getContext('2d');
      const W = 540, H = 300;
      c.width = W; c.height = H;
      ctx.fillStyle = '#f0fdf4'; ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = '#1a7a3a'; ctx.font = 'bold 14px sans-serif';
      ctx.fillText('라운드 분석 리포트', 20, 28);
      ctx.font = '11px sans-serif'; ctx.fillStyle = '#666';
      ctx.fillText(review.date + ' | ' + review.course, 20, 48);
      const metrics = [
        { label: '드라이버 정확도', val: review.driver, color: '#2196F3' },
        { label: '아이언 정확도', val: review.iron, color: '#4CAF50' },
        { label: '숏게임', val: review.short, color: '#FF9800' },
        { label: '퍼팅', val: review.putt, color: '#9C27B0' },
        { label: '코스전략', val: review.strategy, color: '#F44336' },
        { label: '멘탈관리', val: review.mental, color: '#00BCD4' }
      ];
      const barW = 420, barH = 22, startX = 100, startY = 70;
      metrics.forEach((m, i) => {
        const y = startY + i * 36;
        ctx.fillStyle = '#333'; ctx.font = '11px sans-serif';
        ctx.fillText(m.label, 10, y + 15);
        ctx.fillStyle = '#e0e0e0'; ctx.fillRect(startX, y, barW, barH);
        ctx.fillStyle = m.color;
        ctx.fillRect(startX, y, barW * (m.val / 100), barH);
        ctx.fillStyle = '#fff'; ctx.font = 'bold 11px sans-serif';
        ctx.fillText(m.val + '%', startX + barW * (m.val / 100) - 30, y + 15);
      });
      const avg = Math.round((review.driver + review.iron + review.short + review.putt + review.strategy + review.mental) / 6);
      ctx.fillStyle = '#1a7a3a'; ctx.font = 'bold 18px sans-serif';
      ctx.fillText('종합: ' + avg + '점', 20, H - 30);
      const grade = avg >= 90 ? 'S' : avg >= 80 ? 'A' : avg >= 70 ? 'B' : avg >= 60 ? 'C' : 'D';
      ctx.fillStyle = grade === 'S' ? '#FFD700' : grade === 'A' ? '#4CAF50' : grade === 'B' ? '#2196F3' : grade === 'C' ? '#FF9800' : '#F44336';
      ctx.font = 'bold 28px sans-serif';
      ctx.fillText(grade, W - 60, H - 20);
      const tips = [];
      if (review.driver < 60) tips.push('드라이버: 알라인먼트 점검 필요');
      if (review.iron < 60) tips.push('아이언: 볼 포지션 확인');
      if (review.short < 60) tips.push('숏게임: 거리감 훈련 추천');
      if (review.putt < 60) tips.push('퍼팅: 그린리딩 연습');
      if (tips.length) {
        ctx.fillStyle = '#e65100'; ctx.font = '11px sans-serif';
        tips.forEach((t, i) => ctx.fillText('💡 ' + t, 200, H - 50 + i * 16));
      }
    }

    function buildUI() {
      const body = `
        <p style="font-size:12px;color:var(--text-muted);margin-bottom:12px">라운드 후 각 영역을 평가하면 AI가 분석 리포트를 생성합니다.</p>
        <input class="sg27-input" id="sg27-rv-course" placeholder="코스명 (예: 이천베네스트)">
        <div class="sg27-grid" style="grid-template-columns:1fr 1fr">
          <div><label style="font-size:11px;font-weight:700">드라이버 정확도</label><input type="range" class="sg27-slider" id="sg27-rv-driver" min="0" max="100" value="70"><span id="sg27-rv-driver-val" style="font-size:11px">70%</span></div>
          <div><label style="font-size:11px;font-weight:700">아이언 정확도</label><input type="range" class="sg27-slider" id="sg27-rv-iron" min="0" max="100" value="70"><span id="sg27-rv-iron-val" style="font-size:11px">70%</span></div>
          <div><label style="font-size:11px;font-weight:700">숏게임</label><input type="range" class="sg27-slider" id="sg27-rv-short" min="0" max="100" value="70"><span id="sg27-rv-short-val" style="font-size:11px">70%</span></div>
          <div><label style="font-size:11px;font-weight:700">퍼팅</label><input type="range" class="sg27-slider" id="sg27-rv-putt" min="0" max="100" value="70"><span id="sg27-rv-putt-val" style="font-size:11px">70%</span></div>
          <div><label style="font-size:11px;font-weight:700">코스전략</label><input type="range" class="sg27-slider" id="sg27-rv-strat" min="0" max="100" value="70"><span id="sg27-rv-strat-val" style="font-size:11px">70%</span></div>
          <div><label style="font-size:11px;font-weight:700">멘탈관리</label><input type="range" class="sg27-slider" id="sg27-rv-mental" min="0" max="100" value="70"><span id="sg27-rv-mental-val" style="font-size:11px">70%</span></div>
        </div>
        <button class="sg27-btn sg27-btn-primary" id="sg27-rv-analyze" style="width:100%;margin:10px 0;justify-content:center">🔍 AI 분석 생성</button>
        <canvas class="sg27-canvas" id="sg27-rv-canvas"></canvas>
        <div id="sg27-rv-history" style="margin-top:12px"></div>`;
      makeOverlay('sg27ReviewOverlay', '📊 라운드 리뷰 AI 분석기', 'linear-gradient(135deg,#1a7a3a,#2e7d32)', body);
      ['driver', 'iron', 'short', 'putt', 'strat', 'mental'].forEach(k => {
        const sl = document.getElementById('sg27-rv-' + k);
        if (sl) sl.addEventListener('input', () => { document.getElementById('sg27-rv-' + k + '-val').textContent = sl.value + '%'; });
      });
      document.getElementById('sg27-rv-analyze').addEventListener('click', () => {
        const review = {
          date: new Date().toLocaleDateString('ko-KR'),
          course: document.getElementById('sg27-rv-course').value || '미입력',
          driver: +document.getElementById('sg27-rv-driver').value,
          iron: +document.getElementById('sg27-rv-iron').value,
          short: +document.getElementById('sg27-rv-short').value,
          putt: +document.getElementById('sg27-rv-putt').value,
          strategy: +document.getElementById('sg27-rv-strat').value,
          mental: +document.getElementById('sg27-rv-mental').value
        };
        saveReview(review);
        drawCanvas(document.getElementById('sg27-rv-canvas'), review);
        SFX.review_submit();
        renderHistory();
        SGV27.achievements.check('review_first');
        const reviews = getReviews();
        if (reviews.length >= 10) SGV27.achievements.check('review_10');
      });
      function renderHistory() {
        const arr = getReviews().slice(0, 5);
        const el = document.getElementById('sg27-rv-history');
        if (!arr.length) { el.innerHTML = '<p style="font-size:11px;color:var(--text-muted)">아직 분석 기록이 없습니다.</p>'; return; }
        el.innerHTML = '<h4 style="font-size:13px;font-weight:700;margin-bottom:8px">최근 분석</h4>' + arr.map(r => {
          const avg = Math.round((r.driver + r.iron + r.short + r.putt + r.strategy + r.mental) / 6);
          return `<div class="sg27-card"><div class="sg27-card-title">${r.course} <span class="sg27-badge sg27-badge-green">${avg}점</span></div><div class="sg27-card-desc">${r.date}</div></div>`;
        }).join('');
      }
      renderHistory();
    }
    return { init: buildUI };
  })();

  // ======================================================================
  // 2. 코스 리뷰 커뮤니티 시스템
  // ======================================================================
  SGV27.community = (function () {
    const DATA_KEY = 'course_reviews';
    function getAll() { return LS(DATA_KEY) || []; }
    function addReview(r) { const arr = getAll(); arr.unshift(r); if (arr.length > 50) arr.pop(); LS(DATA_KEY, arr); }

    function buildUI() {
      const body = `
        <p style="font-size:12px;color:var(--text-muted);margin-bottom:12px">코스를 평가하고 리뷰를 남기세요. 해시태그로 검색 가능합니다.</p>
        <input class="sg27-input" id="sg27-cm-course" placeholder="골프장명">
        <div class="sg27-stars" id="sg27-cm-stars">${[1,2,3,4,5].map(i => `<span class="sg27-star" data-v="${i}">★</span>`).join('')}</div>
        <div class="sg27-grid" style="grid-template-columns:repeat(3,1fr);margin-bottom:8px">
          <div style="text-align:center"><span style="font-size:11px;font-weight:700">코스관리</span><div class="sg27-stars sg27-cm-sub" data-cat="course">${[1,2,3,4,5].map(i => `<span class="sg27-star" data-v="${i}" style="font-size:16px">★</span>`).join('')}</div></div>
          <div style="text-align:center"><span style="font-size:11px;font-weight:700">시설</span><div class="sg27-stars sg27-cm-sub" data-cat="facility">${[1,2,3,4,5].map(i => `<span class="sg27-star" data-v="${i}" style="font-size:16px">★</span>`).join('')}</div></div>
          <div style="text-align:center"><span style="font-size:11px;font-weight:700">가성비</span><div class="sg27-stars sg27-cm-sub" data-cat="value">${[1,2,3,4,5].map(i => `<span class="sg27-star" data-v="${i}" style="font-size:16px">★</span>`).join('')}</div></div>
        </div>
        <textarea class="sg27-input" id="sg27-cm-text" placeholder="리뷰를 작성해주세요..." style="height:80px;resize:vertical"></textarea>
        <input class="sg27-input" id="sg27-cm-tags" placeholder="해시태그 (예: 그린좋음, 경치최고, 가성비)">
        <button class="sg27-btn sg27-btn-primary" id="sg27-cm-submit" style="width:100%;justify-content:center">✍️ 리뷰 등록</button>
        <div style="margin-top:12px"><input class="sg27-input" id="sg27-cm-search" placeholder="🔍 코스명/태그 검색..."></div>
        <div id="sg27-cm-list" style="margin-top:10px"></div>`;
      makeOverlay('sg27CommunityOverlay', '💬 코스 리뷰 커뮤니티', 'linear-gradient(135deg,#1565c0,#1976d2)', body);

      let mainRating = 0;
      const subRatings = { course: 0, facility: 0, value: 0 };
      document.getElementById('sg27-cm-stars').addEventListener('click', e => {
        const v = +e.target.dataset.v;
        if (!v) return;
        mainRating = v;
        document.querySelectorAll('#sg27-cm-stars .sg27-star').forEach((s, i) => s.classList.toggle('filled', i < v));
      });
      document.querySelectorAll('.sg27-cm-sub').forEach(group => {
        group.addEventListener('click', e => {
          const v = +e.target.dataset.v;
          if (!v) return;
          subRatings[group.dataset.cat] = v;
          group.querySelectorAll('.sg27-star').forEach((s, i) => s.classList.toggle('filled', i < v));
        });
      });
      document.getElementById('sg27-cm-submit').addEventListener('click', () => {
        const course = document.getElementById('sg27-cm-course').value.trim();
        const text = document.getElementById('sg27-cm-text').value.trim();
        if (!course || !mainRating) return;
        const tags = document.getElementById('sg27-cm-tags').value.split(',').map(t => t.trim()).filter(Boolean);
        addReview({ course, rating: mainRating, sub: { ...subRatings }, text, tags, date: new Date().toLocaleDateString('ko-KR') });
        SFX.community_post();
        document.getElementById('sg27-cm-course').value = '';
        document.getElementById('sg27-cm-text').value = '';
        document.getElementById('sg27-cm-tags').value = '';
        mainRating = 0;
        document.querySelectorAll('#sg27-cm-stars .sg27-star').forEach(s => s.classList.remove('filled'));
        renderList();
        SGV27.achievements.check('community_first');
        if (getAll().length >= 5) SGV27.achievements.check('community_5');
      });
      document.getElementById('sg27-cm-search').addEventListener('input', renderList);
      function renderList() {
        const q = (document.getElementById('sg27-cm-search').value || '').toLowerCase();
        const arr = getAll().filter(r => !q || r.course.toLowerCase().includes(q) || r.tags.some(t => t.toLowerCase().includes(q)));
        const el = document.getElementById('sg27-cm-list');
        if (!arr.length) { el.innerHTML = '<p style="font-size:11px;color:var(--text-muted)">리뷰가 없습니다. 첫 리뷰를 남겨보세요!</p>'; return; }
        el.innerHTML = arr.slice(0, 10).map(r => `<div class="sg27-card">
          <div class="sg27-card-title">${r.course} <span style="color:#ffc107">${'★'.repeat(r.rating)}${'☆'.repeat(5 - r.rating)}</span></div>
          <div class="sg27-card-desc">${r.text || '(내용 없음)'}</div>
          <div style="margin-top:4px">${r.tags.map(t => `<span class="sg27-tag">#${t}</span>`).join('')}</div>
          <div style="font-size:10px;color:var(--text-muted);margin-top:4px">${r.date} | 코스${r.sub.course}★ 시설${r.sub.facility}★ 가성비${r.sub.value}★</div>
        </div>`).join('');
      }
      renderList();
    }
    return { init: buildUI };
  })();

  // ======================================================================
  // 3. 골프 파트너 매칭 시뮬레이터 (4축 Canvas)
  // ======================================================================
  SGV27.partner = (function () {
    const DATA_KEY = 'partners';
    function getPartners() { return LS(DATA_KEY) || []; }
    function savePartners(arr) { LS(DATA_KEY, arr); }

    function drawRadar(canvas, p1, p2) {
      const ctx = canvas.getContext('2d');
      const W = 400, H = 400;
      canvas.width = W; canvas.height = H;
      const cx = W / 2, cy = H / 2, R = 140;
      const axes = ['실력', '매너', '페이스', '소통'];
      ctx.fillStyle = '#f8faf8'; ctx.fillRect(0, 0, W, H);
      for (let i = 1; i <= 5; i++) {
        ctx.beginPath();
        for (let j = 0; j < 4; j++) {
          const a = (Math.PI * 2 * j / 4) - Math.PI / 2;
          const r = R * i / 5;
          const x = cx + r * Math.cos(a), y = cy + r * Math.sin(a);
          j === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.closePath(); ctx.strokeStyle = '#ddd'; ctx.stroke();
      }
      axes.forEach((label, i) => {
        const a = (Math.PI * 2 * i / 4) - Math.PI / 2;
        const x = cx + (R + 25) * Math.cos(a), y = cy + (R + 25) * Math.sin(a);
        ctx.fillStyle = '#333'; ctx.font = 'bold 12px sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.fillText(label, x, y);
      });
      function drawPoly(vals, color, alpha) {
        ctx.beginPath();
        vals.forEach((v, i) => {
          const a = (Math.PI * 2 * i / 4) - Math.PI / 2;
          const r = R * v / 5;
          const x = cx + r * Math.cos(a), y = cy + r * Math.sin(a);
          i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        });
        ctx.closePath();
        ctx.fillStyle = color.replace('1)', alpha + ')');
        ctx.fill();
        ctx.strokeStyle = color; ctx.lineWidth = 2; ctx.stroke();
      }
      if (p1) drawPoly([p1.skill, p1.manner, p1.pace, p1.comm], 'rgba(26,122,58,1)', 0.25);
      if (p2) drawPoly([p2.skill, p2.manner, p2.pace, p2.comm], 'rgba(21,101,192,1)', 0.2);
      ctx.fillStyle = '#1a7a3a'; ctx.font = '12px sans-serif'; ctx.textAlign = 'left';
      ctx.fillRect(20, H - 40, 12, 12); ctx.fillText('나', 36, H - 30);
      ctx.fillStyle = '#1565c0';
      ctx.fillRect(80, H - 40, 12, 12); ctx.fillText('파트너', 96, H - 30);
      if (p1 && p2) {
        const compat = Math.round(100 - (Math.abs(p1.skill - p2.skill) + Math.abs(p1.manner - p2.manner) + Math.abs(p1.pace - p2.pace) + Math.abs(p1.comm - p2.comm)) * 5);
        ctx.fillStyle = '#333'; ctx.font = 'bold 16px sans-serif'; ctx.textAlign = 'center';
        ctx.fillText('궁합도: ' + Math.max(0, compat) + '%', cx, H - 10);
      }
    }

    function buildUI() {
      const body = `
        <p style="font-size:12px;color:var(--text-muted);margin-bottom:12px">나와 파트너의 골프 성향을 비교 분석합니다.</p>
        <div class="sg27-grid" style="grid-template-columns:1fr 1fr">
          <div><h4 style="font-size:12px;font-weight:700;color:var(--primary)">👤 나</h4>
            <label style="font-size:10px">실력(1~5)</label><input type="range" class="sg27-slider" id="sg27-pm-s1" min="1" max="5" value="3">
            <label style="font-size:10px">매너(1~5)</label><input type="range" class="sg27-slider" id="sg27-pm-m1" min="1" max="5" value="4">
            <label style="font-size:10px">페이스(1~5)</label><input type="range" class="sg27-slider" id="sg27-pm-p1" min="1" max="5" value="3">
            <label style="font-size:10px">소통(1~5)</label><input type="range" class="sg27-slider" id="sg27-pm-c1" min="1" max="5" value="4">
          </div>
          <div><h4 style="font-size:12px;font-weight:700;color:#1565c0">👥 파트너</h4>
            <label style="font-size:10px">실력(1~5)</label><input type="range" class="sg27-slider" id="sg27-pm-s2" min="1" max="5" value="3">
            <label style="font-size:10px">매너(1~5)</label><input type="range" class="sg27-slider" id="sg27-pm-m2" min="1" max="5" value="4">
            <label style="font-size:10px">페이스(1~5)</label><input type="range" class="sg27-slider" id="sg27-pm-p2" min="1" max="5" value="3">
            <label style="font-size:10px">소통(1~5)</label><input type="range" class="sg27-slider" id="sg27-pm-c2" min="1" max="5" value="4">
          </div>
        </div>
        <button class="sg27-btn sg27-btn-primary" id="sg27-pm-match" style="width:100%;margin:10px 0;justify-content:center">🤝 궁합 분석</button>
        <canvas class="sg27-canvas" id="sg27-pm-canvas"></canvas>`;
      makeOverlay('sg27PartnerOverlay', '🤝 파트너 매칭 분석기', 'linear-gradient(135deg,#6a1b9a,#8e24aa)', body);
      document.getElementById('sg27-pm-match').addEventListener('click', () => {
        const p1 = { skill: +document.getElementById('sg27-pm-s1').value, manner: +document.getElementById('sg27-pm-m1').value, pace: +document.getElementById('sg27-pm-p1').value, comm: +document.getElementById('sg27-pm-c1').value };
        const p2 = { skill: +document.getElementById('sg27-pm-s2').value, manner: +document.getElementById('sg27-pm-m2').value, pace: +document.getElementById('sg27-pm-p2').value, comm: +document.getElementById('sg27-pm-c2').value };
        drawRadar(document.getElementById('sg27-pm-canvas'), p1, p2);
        SFX.partner_match();
        SGV27.achievements.check('partner_first');
      });
    }
    return { init: buildUI };
  })();

  // ======================================================================
  // 4. 라운드 예산 관리자 (Canvas Pie)
  // ======================================================================
  SGV27.budget = (function () {
    const DATA_KEY = 'budgets';
    function getAll() { return LS(DATA_KEY) || []; }
    function save(b) { const arr = getAll(); arr.unshift(b); if (arr.length > 20) arr.pop(); LS(DATA_KEY, arr); }

    function drawPie(canvas, items) {
      const ctx = canvas.getContext('2d');
      const W = 520, H = 300;
      canvas.width = W; canvas.height = H;
      ctx.fillStyle = '#fafbfa'; ctx.fillRect(0, 0, W, H);
      const total = items.reduce((s, i) => s + i.amount, 0);
      if (!total) { ctx.fillStyle = '#999'; ctx.font = '14px sans-serif'; ctx.fillText('데이터를 입력하세요', W / 2 - 60, H / 2); return; }
      const colors = ['#4CAF50', '#2196F3', '#FF9800', '#9C27B0', '#F44336', '#00BCD4', '#795548'];
      let startAngle = -Math.PI / 2;
      const cx = 150, cy = H / 2, R = 110;
      items.forEach((item, i) => {
        if (!item.amount) return;
        const slice = (item.amount / total) * Math.PI * 2;
        ctx.beginPath(); ctx.moveTo(cx, cy);
        ctx.arc(cx, cy, R, startAngle, startAngle + slice);
        ctx.closePath();
        ctx.fillStyle = colors[i % colors.length]; ctx.fill();
        startAngle += slice;
      });
      ctx.fillStyle = '#fafbfa'; ctx.beginPath(); ctx.arc(cx, cy, 50, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#1a7a3a'; ctx.font = 'bold 14px sans-serif'; ctx.textAlign = 'center';
      ctx.fillText(total.toLocaleString() + '원', cx, cy + 5);
      let ly = 30;
      items.forEach((item, i) => {
        if (!item.amount) return;
        ctx.fillStyle = colors[i % colors.length]; ctx.fillRect(300, ly, 14, 14);
        ctx.fillStyle = '#333'; ctx.font = '12px sans-serif'; ctx.textAlign = 'left';
        ctx.fillText(`${item.label}: ${item.amount.toLocaleString()}원 (${Math.round(item.amount / total * 100)}%)`, 320, ly + 11);
        ly += 24;
      });
    }

    function buildUI() {
      const cats = ['그린피', '카트비', '캐디피', '식사', '음료/간식', '연습장', '기타'];
      const body = `
        <p style="font-size:12px;color:var(--text-muted);margin-bottom:12px">라운드 비용을 항목별로 기록하고 지출 분석을 확인하세요.</p>
        ${cats.map((c, i) => `<div style="display:flex;align-items:center;gap:8px;margin-bottom:6px"><span style="font-size:12px;font-weight:700;width:70px">${c}</span><input class="sg27-input sg27-budget-input" data-idx="${i}" type="number" placeholder="0" style="margin:0;flex:1"></div>`).join('')}
        <button class="sg27-btn sg27-btn-primary" id="sg27-bg-save" style="width:100%;margin:10px 0;justify-content:center">💰 지출 분석</button>
        <canvas class="sg27-canvas" id="sg27-bg-canvas"></canvas>
        <div id="sg27-bg-history" style="margin-top:12px"></div>`;
      makeOverlay('sg27BudgetOverlay', '💰 라운드 예산 관리자', 'linear-gradient(135deg,#e65100,#f57c00)', body);
      document.getElementById('sg27-bg-save').addEventListener('click', () => {
        const items = cats.map((c, i) => ({ label: c, amount: +(document.querySelectorAll('.sg27-budget-input')[i].value || 0) }));
        save({ date: new Date().toLocaleDateString('ko-KR'), items });
        drawPie(document.getElementById('sg27-bg-canvas'), items);
        SFX.budget_save();
        renderHistory();
        SGV27.achievements.check('budget_first');
        if (getAll().length >= 5) SGV27.achievements.check('budget_5');
      });
      function renderHistory() {
        const arr = getAll().slice(0, 5);
        const el = document.getElementById('sg27-bg-history');
        if (!arr.length) return;
        el.innerHTML = '<h4 style="font-size:13px;font-weight:700;margin-bottom:8px">최근 지출</h4>' + arr.map(b => {
          const total = b.items.reduce((s, i) => s + i.amount, 0);
          return `<div class="sg27-card"><div class="sg27-card-title">${b.date} <span class="sg27-badge sg27-badge-orange">${total.toLocaleString()}원</span></div></div>`;
        }).join('');
      }
      renderHistory();
    }
    return { init: buildUI };
  })();

  // ======================================================================
  // 5. 클럽 추천 AI (상황별 14종)
  // ======================================================================
  SGV27.clubAI = (function () {
    const clubs = [
      { name: '드라이버', dist: '220~250m', use: '티샷(Par4,5)', icon: '🏌️' },
      { name: '3번 우드', dist: '200~230m', use: '페어웨이/긴 Par5 2nd', icon: '🌲' },
      { name: '5번 우드', dist: '180~210m', use: '페어웨이/긴 Par3', icon: '🌲' },
      { name: '하이브리드', dist: '170~200m', use: '러프/긴 어프로치', icon: '🔀' },
      { name: '5번 아이언', dist: '160~180m', use: '긴 어프로치', icon: '⛳' },
      { name: '6번 아이언', dist: '150~170m', use: '중장거리', icon: '⛳' },
      { name: '7번 아이언', dist: '140~160m', use: '중거리 기준 클럽', icon: '⛳' },
      { name: '8번 아이언', dist: '130~145m', use: '그린 공략', icon: '⛳' },
      { name: '9번 아이언', dist: '120~135m', use: '정확도 우선', icon: '⛳' },
      { name: 'PW', dist: '100~120m', use: '풀스윙 어프로치', icon: '🎯' },
      { name: 'AW/GW', dist: '80~100m', use: '3/4스윙 어프로치', icon: '🎯' },
      { name: 'SW', dist: '60~80m', use: '벙커/로브샷', icon: '🏖️' },
      { name: 'LW', dist: '40~60m', use: '플롭샷/높은탄도', icon: '⬆️' },
      { name: '퍼터', dist: '0~30m', use: '그린 위 퍼팅', icon: '🕳️' }
    ];
    const situations = [
      { label: '티샷 (넓은 페어웨이)', wind: '무풍', recommend: '드라이버', tip: '편안하게 풀스윙. 페어웨이가 넓으므로 공격적으로.' },
      { label: '티샷 (좁은 페어웨이)', wind: '무풍', recommend: '3번 우드', tip: '정확도 우선. OB 위험 줄이기.' },
      { label: '페어웨이 180m', wind: '맞바람 1클럽', recommend: '하이브리드', tip: '맞바람 시 1클럽 업. 부드럽게 스윙.' },
      { label: '러프 150m', wind: '무풍', recommend: '6번 아이언', tip: '러프에서는 헤드스피드 유지. 볼을 깨끗히 컨택.' },
      { label: '오르막 140m', wind: '무풍', recommend: '7번 아이언', tip: '오르막은 +1클럽. 7번이지만 실질 150m 효과.' },
      { label: '내리막 140m', wind: '뒷바람', recommend: '9번 아이언', tip: '내리막+뒷바람 = -2클럽. 오버 주의.' },
      { label: '벙커 60m', wind: '무풍', recommend: 'SW', tip: '벙커에서는 오픈스탠스, 모래를 때리는 느낌으로.' },
      { label: '그린사이드 30m', wind: '무풍', recommend: 'AW/GW', tip: '칩앤런. 런닝 어프로치로 안전하게.' },
      { label: '나무 아래 50m', wind: '무풍', recommend: '8번 아이언', tip: '낮은 탄도 펀치샷. 나무 아래로 빠져나오기.' },
      { label: '워터해저드 앞 170m', wind: '맞바람', recommend: '5번 우드', tip: '레이업 or 공격? 물 넘기려면 충분한 클럽 선택.' }
    ];

    function buildUI() {
      const body = `
        <p style="font-size:12px;color:var(--text-muted);margin-bottom:12px">상황별 최적 클럽을 AI가 추천합니다. 거리/라이/바람에 따른 전략을 확인하세요.</p>
        <div class="sg27-tabs" id="sg27-cl-tabs">
          <span class="sg27-tab active" data-t="situation">상황별 추천</span>
          <span class="sg27-tab" data-t="chart">클럽 차트</span>
        </div>
        <div id="sg27-cl-situation">
          ${situations.map((s, i) => `<div class="sg27-card" data-idx="${i}">
            <div class="sg27-card-title">📍 ${s.label} <span class="sg27-badge sg27-badge-blue">${s.wind}</span></div>
            <div class="sg27-card-desc">추천: <strong>${s.recommend}</strong> — ${s.tip}</div>
          </div>`).join('')}
        </div>
        <div id="sg27-cl-chart" style="display:none">
          ${clubs.map(c => `<div class="sg27-card">
            <div class="sg27-card-title">${c.icon} ${c.name} <span class="sg27-badge sg27-badge-green">${c.dist}</span></div>
            <div class="sg27-card-desc">${c.use}</div>
          </div>`).join('')}
        </div>`;
      makeOverlay('sg27ClubOverlay', '🏌️ 클럽 추천 AI', 'linear-gradient(135deg,#00695c,#00897b)', body);
      document.querySelectorAll('#sg27-cl-tabs .sg27-tab').forEach(tab => {
        tab.addEventListener('click', () => {
          document.querySelectorAll('#sg27-cl-tabs .sg27-tab').forEach(t => t.classList.remove('active'));
          tab.classList.add('active');
          document.getElementById('sg27-cl-situation').style.display = tab.dataset.t === 'situation' ? '' : 'none';
          document.getElementById('sg27-cl-chart').style.display = tab.dataset.t === 'chart' ? '' : 'none';
          SFX.club_recommend();
        });
      });
    }
    return { init: buildUI };
  })();

  // ======================================================================
  // 6. 그린 리딩 트레이너 (Canvas)
  // ======================================================================
  SGV27.greenReading = (function () {
    let score = 0, total = 0;

    function drawGreen(canvas, hole) {
      const ctx = canvas.getContext('2d');
      const W = 500, H = 380;
      canvas.width = W; canvas.height = H;
      ctx.fillStyle = '#2e7d32'; ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = '#43a047';
      for (let i = 0; i < 20; i++) {
        ctx.fillRect(Math.random() * W, Math.random() * H, 3, 30 + Math.random() * 20);
      }
      ctx.beginPath(); ctx.arc(hole.holeX, hole.holeY, 8, 0, Math.PI * 2);
      ctx.fillStyle = '#000'; ctx.fill();
      ctx.beginPath(); ctx.arc(hole.holeX, hole.holeY, 5, 0, Math.PI * 2);
      ctx.fillStyle = '#333'; ctx.fill();
      ctx.beginPath(); ctx.arc(hole.ballX, hole.ballY, 10, 0, Math.PI * 2);
      ctx.fillStyle = '#fff'; ctx.fill();
      ctx.strokeStyle = '#ddd'; ctx.lineWidth = 1; ctx.stroke();
      const slopeAngle = Math.atan2(hole.slopeY, hole.slopeX);
      const arrowLen = 50;
      const ax = W / 2, ay = 30;
      ctx.beginPath();
      ctx.moveTo(ax, ay);
      ctx.lineTo(ax + arrowLen * Math.cos(slopeAngle), ay + arrowLen * Math.sin(slopeAngle));
      ctx.strokeStyle = '#ffeb3b'; ctx.lineWidth = 3; ctx.stroke();
      ctx.fillStyle = '#ffeb3b'; ctx.font = 'bold 11px sans-serif';
      ctx.fillText('경사 ' + hole.slopeDeg + '°', ax + 60, ay + 5);
      ctx.fillStyle = '#fff'; ctx.font = 'bold 12px sans-serif';
      ctx.fillText('거리: ' + hole.dist + 'm', 20, H - 20);
      ctx.fillText('속도: ' + hole.speed + ' 스팀프', 200, H - 20);
    }

    function buildUI() {
      const holes = [
        { ballX: 100, ballY: 300, holeX: 400, holeY: 100, slopeX: 1, slopeY: -0.5, slopeDeg: 2, dist: 6, speed: 10, answer: 'right' },
        { ballX: 250, ballY: 320, holeX: 250, holeY: 80, slopeX: -1, slopeY: 0, slopeDeg: 3, dist: 8, speed: 11, answer: 'left' },
        { ballX: 380, ballY: 280, holeX: 120, holeY: 100, slopeX: 0, slopeY: -1, slopeDeg: 1, dist: 7, speed: 9, answer: 'straight' },
        { ballX: 80, ballY: 200, holeX: 420, holeY: 200, slopeX: 0.5, slopeY: 1, slopeDeg: 4, dist: 10, speed: 12, answer: 'right' },
        { ballX: 300, ballY: 350, holeX: 200, holeY: 60, slopeX: -0.7, slopeY: -0.3, slopeDeg: 2, dist: 9, speed: 10, answer: 'left' }
      ];
      let current = 0;
      const body = `
        <p style="font-size:12px;color:var(--text-muted);margin-bottom:12px">그린의 경사와 속도를 읽고 정확한 에임 포인트를 찾으세요.</p>
        <canvas class="sg27-canvas" id="sg27-gr-canvas"></canvas>
        <div style="text-align:center;margin:12px 0">
          <p style="font-size:12px;margin-bottom:8px" id="sg27-gr-q">공의 에임 방향은?</p>
          <button class="sg27-btn sg27-btn-secondary" onclick="window._sg27GreenAnswer('left')">⬅️ 왼쪽</button>
          <button class="sg27-btn sg27-btn-primary" onclick="window._sg27GreenAnswer('straight')">⬆️ 직진</button>
          <button class="sg27-btn sg27-btn-secondary" onclick="window._sg27GreenAnswer('right')">➡️ 오른쪽</button>
        </div>
        <div id="sg27-gr-result" style="text-align:center;font-size:14px;font-weight:700"></div>
        <div class="sg27-stat-card" style="margin-top:10px;text-align:center"><span id="sg27-gr-score">0</span> / <span id="sg27-gr-total">0</span> 정답</div>`;
      makeOverlay('sg27GreenOverlay', '🟢 그린 리딩 트레이너', 'linear-gradient(135deg,#2e7d32,#388e3c)', body);

      window._sg27GreenAnswer = function (ans) {
        total++;
        const correct = holes[current].answer === ans;
        if (correct) { score++; SFX.green_putt(); }
        document.getElementById('sg27-gr-score').textContent = score;
        document.getElementById('sg27-gr-total').textContent = total;
        document.getElementById('sg27-gr-result').textContent = correct ? '✅ 정답! 훌륭한 그린 리딩!' : '❌ 오답. 경사 방향을 다시 확인해보세요.';
        document.getElementById('sg27-gr-result').style.color = correct ? '#2e7d32' : '#c62828';
        current = (current + 1) % holes.length;
        setTimeout(() => {
          drawGreen(document.getElementById('sg27-gr-canvas'), holes[current]);
          document.getElementById('sg27-gr-result').textContent = '';
        }, 1500);
        SGV27.achievements.check('green_first');
        if (score >= 10) SGV27.achievements.check('green_master');
      };

      setTimeout(() => {
        const c = document.getElementById('sg27-gr-canvas');
        if (c) drawGreen(c, holes[0]);
      }, 300);
    }
    return { init: buildUI };
  })();

  // ======================================================================
  // 7. 체력 분석 대시보드 (6축 Radar Canvas)
  // ======================================================================
  SGV27.fitness = (function () {
    const DATA_KEY = 'fitness';
    function getData() { return LS(DATA_KEY) || { flexibility: 3, core: 3, power: 3, balance: 3, endurance: 3, rotation: 3 }; }
    function saveData(d) { LS(DATA_KEY, d); }

    function drawRadar(canvas, data) {
      const ctx = canvas.getContext('2d');
      const W = 420, H = 420;
      canvas.width = W; canvas.height = H;
      const cx = W / 2, cy = H / 2, R = 150;
      const labels = ['유연성', '코어', '파워', '밸런스', '지구력', '회전력'];
      ctx.fillStyle = '#f8faf8'; ctx.fillRect(0, 0, W, H);
      for (let i = 1; i <= 5; i++) {
        ctx.beginPath();
        for (let j = 0; j < 6; j++) {
          const a = (Math.PI * 2 * j / 6) - Math.PI / 2;
          const r = R * i / 5;
          const x = cx + r * Math.cos(a), y = cy + r * Math.sin(a);
          j === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.closePath(); ctx.strokeStyle = '#e0e0e0'; ctx.stroke();
      }
      for (let j = 0; j < 6; j++) {
        const a = (Math.PI * 2 * j / 6) - Math.PI / 2;
        ctx.beginPath(); ctx.moveTo(cx, cy);
        ctx.lineTo(cx + R * Math.cos(a), cy + R * Math.sin(a));
        ctx.strokeStyle = '#ccc'; ctx.stroke();
        const lx = cx + (R + 22) * Math.cos(a), ly = cy + (R + 22) * Math.sin(a);
        ctx.fillStyle = '#333'; ctx.font = 'bold 12px sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.fillText(labels[j], lx, ly);
      }
      const vals = [data.flexibility, data.core, data.power, data.balance, data.endurance, data.rotation];
      ctx.beginPath();
      vals.forEach((v, i) => {
        const a = (Math.PI * 2 * i / 6) - Math.PI / 2;
        const r = R * v / 5;
        const x = cx + r * Math.cos(a), y = cy + r * Math.sin(a);
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      });
      ctx.closePath();
      ctx.fillStyle = 'rgba(26,122,58,0.25)'; ctx.fill();
      ctx.strokeStyle = '#1a7a3a'; ctx.lineWidth = 2.5; ctx.stroke();
      vals.forEach((v, i) => {
        const a = (Math.PI * 2 * i / 6) - Math.PI / 2;
        const r = R * v / 5;
        ctx.beginPath(); ctx.arc(cx + r * Math.cos(a), cy + r * Math.sin(a), 5, 0, Math.PI * 2);
        ctx.fillStyle = '#1a7a3a'; ctx.fill();
      });
      const avg = (vals.reduce((s, v) => s + v, 0) / 6).toFixed(1);
      const grade = avg >= 4.5 ? 'S' : avg >= 3.8 ? 'A' : avg >= 3 ? 'B' : avg >= 2 ? 'C' : 'D';
      ctx.fillStyle = '#1a7a3a'; ctx.font = 'bold 16px sans-serif'; ctx.textAlign = 'center';
      ctx.fillText('체력 등급: ' + grade + ' (' + avg + '/5)', cx, H - 15);
    }

    function buildUI() {
      const data = getData();
      const fields = [
        { key: 'flexibility', label: '유연성', desc: '스윙 범위 확보' },
        { key: 'core', label: '코어 안정성', desc: '축 유지력' },
        { key: 'power', label: '파워', desc: '비거리 원동력' },
        { key: 'balance', label: '밸런스', desc: '피니쉬 안정' },
        { key: 'endurance', label: '지구력', desc: '18홀 집중 유지' },
        { key: 'rotation', label: '회전력', desc: '몸통 회전 속도' }
      ];
      const body = `
        <p style="font-size:12px;color:var(--text-muted);margin-bottom:12px">골프에 필요한 6대 체력 요소를 평가하고 약점을 파악하세요.</p>
        <div class="sg27-grid" style="grid-template-columns:1fr 1fr">
          ${fields.map(f => `<div><label style="font-size:11px;font-weight:700">${f.label}</label><br><span style="font-size:10px;color:var(--text-muted)">${f.desc}</span><input type="range" class="sg27-slider sg27-fit-sl" data-key="${f.key}" min="1" max="5" value="${data[f.key]}"><span class="sg27-fit-val" style="font-size:11px;font-weight:700">${data[f.key]}/5</span></div>`).join('')}
        </div>
        <button class="sg27-btn sg27-btn-primary" id="sg27-fit-analyze" style="width:100%;margin:10px 0;justify-content:center">💪 체력 분석</button>
        <canvas class="sg27-canvas" id="sg27-fit-canvas"></canvas>
        <div id="sg27-fit-tips" style="margin-top:10px"></div>`;
      makeOverlay('sg27FitnessOverlay', '💪 체력 분석 대시보드', 'linear-gradient(135deg,#c62828,#e53935)', body);
      document.querySelectorAll('.sg27-fit-sl').forEach(sl => {
        sl.addEventListener('input', () => { sl.nextElementSibling.textContent = sl.value + '/5'; });
      });
      document.getElementById('sg27-fit-analyze').addEventListener('click', () => {
        const d = {};
        document.querySelectorAll('.sg27-fit-sl').forEach(sl => { d[sl.dataset.key] = +sl.value; });
        saveData(d);
        drawRadar(document.getElementById('sg27-fit-canvas'), d);
        SFX.fitness_record();
        const tips = [];
        if (d.flexibility < 3) tips.push('💡 유연성: 매일 10분 스트레칭 루틴 추천');
        if (d.core < 3) tips.push('💡 코어: 플랭크+데드버그 루틴 시작');
        if (d.power < 3) tips.push('💡 파워: 메디신볼 회전 운동 추천');
        if (d.balance < 3) tips.push('💡 밸런스: 한발 서기 30초 훈련');
        if (d.endurance < 3) tips.push('💡 지구력: 주 3회 유산소 30분');
        if (d.rotation < 3) tips.push('💡 회전력: 힙 회전 드릴 추천');
        document.getElementById('sg27-fit-tips').innerHTML = tips.length ? tips.map(t => `<p style="font-size:12px;margin:4px 0">${t}</p>`).join('') : '<p style="font-size:12px;color:#2e7d32">✅ 모든 영역 양호! 꾸준히 유지하세요.</p>';
        SGV27.achievements.check('fitness_first');
      });
    }
    return { init: buildUI };
  })();

  // ======================================================================
  // 8. 골프 루틴 빌더 (8단계)
  // ======================================================================
  SGV27.routine = (function () {
    const DATA_KEY = 'routine';
    const defaultSteps = [
      { name: '스트레칭', dur: 5, done: false, desc: '목/어깨/허리/햄스트링 순서대로' },
      { name: '퍼팅 워밍업', dur: 5, done: false, desc: '1m→2m→3m 거리감 잡기' },
      { name: '숏아이언 연습', dur: 5, done: false, desc: 'PW~9번 하프스윙으로 시작' },
      { name: '미들 아이언', dur: 5, done: false, desc: '7~6번 풀스윙 리듬 잡기' },
      { name: '우드/하이브리드', dur: 5, done: false, desc: '5W, 3W 순서로 거리 늘리기' },
      { name: '드라이버', dur: 5, done: false, desc: '70%→80%→90% 점진적 스윙' },
      { name: '어프로치 연습', dur: 5, done: false, desc: '50m~100m 목표 거리 맞추기' },
      { name: '실전 시뮬레이션', dur: 5, done: false, desc: '첫 홀 티샷 상상하며 프리샷루틴' }
    ];
    function getSteps() { return LS(DATA_KEY) || defaultSteps.map(s => ({ ...s })); }
    function saveSteps(arr) { LS(DATA_KEY, arr); }

    function buildUI() {
      const steps = getSteps();
      const body = `
        <p style="font-size:12px;color:var(--text-muted);margin-bottom:12px">라운드 전 워밍업 루틴을 단계별로 체크하세요. 총 40분 프로그램.</p>
        <div id="sg27-rt-list">
          ${steps.map((s, i) => `<div class="sg27-card" id="sg27-rt-${i}" style="display:flex;align-items:center;gap:10px;${s.done ? 'opacity:0.6' : ''}">
            <input type="checkbox" ${s.done ? 'checked' : ''} data-idx="${i}" class="sg27-rt-chk" style="width:20px;height:20px;accent-color:var(--primary)">
            <div style="flex:1">
              <div class="sg27-card-title">${i + 1}. ${s.name} <span class="sg27-badge sg27-badge-blue">${s.dur}분</span></div>
              <div class="sg27-card-desc">${s.desc}</div>
            </div>
          </div>`).join('')}
        </div>
        <div class="sg27-progress"><div class="sg27-progress-bar" id="sg27-rt-progress" style="width:${Math.round(steps.filter(s => s.done).length / steps.length * 100)}%;background:var(--primary)"></div></div>
        <p style="font-size:12px;text-align:center" id="sg27-rt-status">${steps.filter(s => s.done).length}/${steps.length} 완료</p>
        <button class="sg27-btn sg27-btn-secondary" id="sg27-rt-reset" style="width:100%;margin-top:8px;justify-content:center">🔄 리셋</button>`;
      makeOverlay('sg27RoutineOverlay', '📋 골프 루틴 빌더', 'linear-gradient(135deg,#4527a0,#5e35b1)', body);
      document.querySelectorAll('.sg27-rt-chk').forEach(chk => {
        chk.addEventListener('change', () => {
          const steps = getSteps();
          steps[+chk.dataset.idx].done = chk.checked;
          saveSteps(steps);
          document.getElementById('sg27-rt-' + chk.dataset.idx).style.opacity = chk.checked ? '0.6' : '1';
          const done = steps.filter(s => s.done).length;
          document.getElementById('sg27-rt-progress').style.width = Math.round(done / steps.length * 100) + '%';
          document.getElementById('sg27-rt-status').textContent = done + '/' + steps.length + ' 완료';
          if (chk.checked) SFX.routine_open();
          if (done === steps.length) { SFX.routine_complete(); SGV27.achievements.check('routine_complete'); }
          SGV27.achievements.check('routine_first');
        });
      });
      document.getElementById('sg27-rt-reset').addEventListener('click', () => {
        saveSteps(defaultSteps.map(s => ({ ...s })));
        document.querySelectorAll('.sg27-rt-chk').forEach(c => { c.checked = false; });
        document.querySelectorAll('[id^=sg27-rt-]').forEach(el => { if (el.tagName === 'DIV' && el.className.includes('sg27-card')) el.style.opacity = '1'; });
        document.getElementById('sg27-rt-progress').style.width = '0%';
        document.getElementById('sg27-rt-status').textContent = '0/8 완료';
      });
    }
    return { init: buildUI };
  })();

  // ======================================================================
  // 9. Golf IQ v11 (15문항)
  // ======================================================================
  SGV27.quizV11 = (function () {
    const questions = [
      { q: '&quot;스트로크 게인드&quot;에서 가장 많은 타수를 절약할 수 있는 영역은?', a: ['어프로치', '티샷', '퍼팅', '벙커'], c: 0 },
      { q: '퍼팅 시 &quot;에임 포인트&quot;는 무엇을 기준으로 결정하나요?', a: ['경사의 기울기', '그린 속도', '잔디 결', '홀의 위치'], c: 0 },
      { q: '라운드 중 OB가 의심될 때 할 수 있는 조치는?', a: ['잠정구 선언', '볼 포기', '재타 없이 진행', '최대 벌타 2타'], c: 0 },
      { q: '스윙의 3:1 템포 비율에서 3은 무엇을 의미하나요?', a: ['백스윙 시간', '다운스윙 시간', '팔로스루 시간', '전체 스윙 시간'], c: 0 },
      { q: '클럽 피팅에서 &quot;라이각&quot;이 잘못되면 나타나는 현상은?', a: ['방향 오류 (토/힐)', '거리 부족', '탄도 변화', '스핀량 변화'], c: 0 },
      { q: 'WHS 핸디캡 계산에서 사용하는 최근 스코어 수는?', a: ['20라운드 중 8개', '10라운드 중 5개', '30라운드 중 15개', '15라운드 중 10개'], c: 0 },
      { q: '맞바람 10km/h에서 일반적으로 클럽을 몇 개 올려야 하나요?', a: ['1클럽', '2클럽', '0.5클럽', '3클럽'], c: 0 },
      { q: '벙커샷에서 &quot;바운스&quot;가 큰 웨지를 사용하는 이유는?', a: ['모래에 파고들지 않도록', '스핀을 더 주기 위해', '높은 탄도를 위해', '거리를 늘리기 위해'], c: 0 },
      { q: '퍼팅 그린의 &quot;스팀프미터&quot; 10이면 어떤 수준인가요?', a: ['빠른 그린', '느린 그린', '보통 그린', '매우 느린 그린'], c: 0 },
      { q: '프리샷 루틴의 가장 중요한 목적은?', a: ['일관성과 집중', '시간 절약', '관중 인식', '스윙 속도 조절'], c: 0 },
      { q: '드로우 구질을 위한 클럽페이스 방향은?', a: ['타겟 우측, 스윙경로보다 닫힘', '타겟 좌측', '완전히 닫힘', '완전히 열림'], c: 0 },
      { q: '매치플레이에서 상대가 컨시드를 주면?', a: ['다음 샷 없이 홀아웃', '반드시 퍼팅 필요', '심판 확인 필요', '상대와 재협상'], c: 0 },
      { q: '&quot;코스 매니지먼트&quot;의 핵심 원칙은?', a: ['미스를 줄이는 안전한 선택', '항상 공격적 플레이', '가장 먼 클럽 선택', '전력 스윙'], c: 0 },
      { q: '높은 탄도의 로브샷에 적합한 클럽은?', a: ['60도 로브웨지', '52도 갭웨지', '9번 아이언', '퍼터'], c: 0 },
      { q: '라운드 후 멘탈 관리에 가장 효과적인 방법은?', a: ['포스트라운드 리뷰 작성', '즉시 연습장 방문', '스코어 무시', '다음 라운드 예약'], c: 0 }
    ];

    function buildUI() {
      let idx = 0, score = 0, answered = [];
      const body = `
        <p style="font-size:12px;color:var(--text-muted);margin-bottom:12px">Golf IQ v11 — 코스전략/그린리딩/클럽선택 심화 15문항</p>
        <div id="sg27-q-area"></div>
        <div id="sg27-q-result" style="display:none;text-align:center;padding:20px"></div>`;
      makeOverlay('sg27QuizOverlay', '🧠 Golf IQ v11', 'linear-gradient(135deg,#f57c00,#ff9800)', body);

      function render() {
        if (idx >= questions.length) {
          const pct = Math.round(score / questions.length * 100);
          document.getElementById('sg27-q-area').style.display = 'none';
          document.getElementById('sg27-q-result').style.display = '';
          document.getElementById('sg27-q-result').innerHTML = `<h3 style="font-size:20px;margin-bottom:10px">${score}/${questions.length} 정답 (${pct}%)</h3><p style="font-size:14px">${pct >= 90 ? '🏆 골프 마스터!' : pct >= 70 ? '👏 훌륭합니다!' : pct >= 50 ? '📚 더 공부해보세요' : '💪 기초부터 다시!'}</p>`;
          SGV27.achievements.check('quiz_v11_try');
          if (score === questions.length) SGV27.achievements.check('quiz_v11_perfect');
          return;
        }
        const qq = questions[idx];
        document.getElementById('sg27-q-area').innerHTML = `
          <div style="font-size:11px;color:var(--text-muted);margin-bottom:6px">문제 ${idx + 1}/${questions.length}</div>
          <div class="sg27-progress"><div class="sg27-progress-bar" style="width:${idx / questions.length * 100}%;background:var(--primary)"></div></div>
          <p style="font-size:14px;font-weight:700;margin:12px 0">${qq.q}</p>
          ${qq.a.map((a, i) => `<button class="sg27-btn sg27-btn-secondary sg27-q-opt" data-i="${i}" style="width:100%;margin:4px 0;justify-content:flex-start">${a}</button>`).join('')}`;
        document.querySelectorAll('.sg27-q-opt').forEach(btn => {
          btn.addEventListener('click', () => {
            const chosen = +btn.dataset.i;
            if (chosen === qq.c) { score++; SFX.quiz_correct11(); btn.style.background = '#e8f5e9'; btn.style.borderColor = '#4CAF50'; }
            else { btn.style.background = '#ffebee'; btn.style.borderColor = '#f44336'; document.querySelector(`.sg27-q-opt[data-i="${qq.c}"]`).style.background = '#e8f5e9'; }
            idx++;
            setTimeout(render, 800);
          });
        });
      }
      setTimeout(render, 200);
    }
    return { init: buildUI };
  })();

  // ======================================================================
  // 10. 업적 시스템 (+12, 140→152)
  // ======================================================================
  SGV27.achievements = (function () {
    const DATA_KEY = 'achievements_v27';
    const DEFS = [
      { id: 'review_first', name: '첫 라운드 리뷰', desc: '라운드 리뷰 AI 분석 1회 완료', icon: '📊' },
      { id: 'review_10', name: '리뷰 마스터', desc: '라운드 리뷰 10회 분석', icon: '📈' },
      { id: 'community_first', name: '첫 코스 리뷰', desc: '코스 리뷰 1건 등록', icon: '💬' },
      { id: 'community_5', name: '리뷰 전문가', desc: '코스 리뷰 5건 등록', icon: '⭐' },
      { id: 'partner_first', name: '첫 파트너 분석', desc: '파트너 궁합 분석 1회', icon: '🤝' },
      { id: 'budget_first', name: '첫 예산 분석', desc: '라운드 예산 분석 1회', icon: '💰' },
      { id: 'budget_5', name: '가계부 달인', desc: '예산 분석 5회 완료', icon: '📒' },
      { id: 'green_first', name: '그린 리더', desc: '그린 리딩 1문제 정답', icon: '🟢' },
      { id: 'green_master', name: '그린 마스터', desc: '그린 리딩 10문제 정답', icon: '🏆' },
      { id: 'fitness_first', name: '체력 평가', desc: '체력 분석 1회 완료', icon: '💪' },
      { id: 'routine_first', name: '루틴 시작', desc: '루틴 1단계 체크', icon: '📋' },
      { id: 'routine_complete', name: '완벽한 준비', desc: '루틴 8단계 전체 완료', icon: '🎯' },
      { id: 'quiz_v11_try', name: 'Golf IQ v11 도전', desc: 'Golf IQ v11 퀴즈 완료', icon: '🧠' },
      { id: 'quiz_v11_perfect', name: 'Golf IQ v11 만점', desc: '15문항 전부 정답', icon: '🏅' },
      { id: 'v27_explorer', name: 'v27 탐험가', desc: 'v27 기능 5개 이상 사용', icon: '🚀' }
    ];
    function getUnlocked() { return LS(DATA_KEY) || []; }
    function check(id) {
      const arr = getUnlocked();
      if (arr.includes(id)) return;
      arr.push(id);
      LS(DATA_KEY, arr);
      SFX.achieve_v27();
      const def = DEFS.find(d => d.id === id);
      if (def) showToast(def.icon + ' 업적 달성: ' + def.name);
      if (arr.length >= 5) check('v27_explorer');
    }
    return { check, DEFS, getUnlocked };
  })();

  // ========== TOAST ==========
  function showToast(msg) {
    const t = document.createElement('div');
    t.style.cssText = 'position:fixed;top:80px;left:50%;transform:translateX(-50%);background:var(--toast-bg,#333);color:#fff;padding:10px 20px;border-radius:20px;font-size:13px;font-weight:700;z-index:10000;animation:sg27FadeIn .3s;box-shadow:0 4px 20px rgba(0,0,0,.3)';
    t.textContent = msg;
    document.body.appendChild(t);
    setTimeout(() => t.remove(), 3000);
  }

  // ========== BOTTOM NAV BAR ==========
  function createBottomBar() {
    const bar = document.createElement('div');
    bar.className = 'sg27-bottom-bar';
    bar.id = 'sg27BottomBar';
    const btns = [
      { icon: '📊', label: '리뷰분석', action: () => openPanel('sg27ReviewOverlay', SFX.review_open) },
      { icon: '💬', label: '코스리뷰', action: () => openPanel('sg27CommunityOverlay', SFX.community_open) },
      { icon: '🤝', label: '파트너', action: () => openPanel('sg27PartnerOverlay', SFX.partner_open) },
      { icon: '💰', label: '예산', action: () => openPanel('sg27BudgetOverlay', SFX.budget_open) },
      { icon: '🏌️', label: '클럽AI', action: () => openPanel('sg27ClubOverlay', SFX.club_open) },
      { icon: '🟢', label: '그린리딩', action: () => openPanel('sg27GreenOverlay', SFX.green_open) },
      { icon: '💪', label: '체력분석', action: () => openPanel('sg27FitnessOverlay', SFX.fitness_open) },
      { icon: '📋', label: '루틴', action: () => openPanel('sg27RoutineOverlay', SFX.routine_open) },
      { icon: '🧠', label: 'IQ v11', action: () => openPanel('sg27QuizOverlay', SFX.quiz_v11) }
    ];
    btns.forEach(b => {
      const btn = document.createElement('div');
      btn.className = 'sg27-bbtn';
      btn.innerHTML = `<span class="sg27-bbtn-icon">${b.icon}</span><span class="sg27-bbtn-label">${b.label}</span>`;
      btn.addEventListener('click', b.action);
      bar.appendChild(btn);
    });
    document.body.appendChild(bar);
  }

  // ========== KEYBOARD SHORTCUTS ==========
  document.addEventListener('keydown', e => {
    if (['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)) return;
    if (!e.shiftKey) return;
    const map = {
      'R': () => openPanel('sg27ReviewOverlay', SFX.review_open),
      'V': () => openPanel('sg27CommunityOverlay', SFX.community_open),
      'P': () => openPanel('sg27PartnerOverlay', SFX.partner_open),
      'B': () => openPanel('sg27BudgetOverlay', SFX.budget_open),
      'C': () => openPanel('sg27ClubOverlay', SFX.club_open),
      'G': () => openPanel('sg27GreenOverlay', SFX.green_open),
      'F': () => openPanel('sg27FitnessOverlay', SFX.fitness_open),
      'T': () => openPanel('sg27RoutineOverlay', SFX.routine_open)
    };
    if (map[e.key]) { e.preventDefault(); map[e.key](); }
  });

  // ========== ESC CLOSE ==========
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.sg27-overlay.active').forEach(o => o.classList.remove('active'));
    }
  });

  // ========== INIT ==========
  function init() {
    SGV27.roundReview.init();
    SGV27.community.init();
    SGV27.partner.init();
    SGV27.budget.init();
    SGV27.clubAI.init();
    SGV27.greenReading.init();
    SGV27.fitness.init();
    SGV27.routine.init();
    SGV27.quizV11.init();
    createBottomBar();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
