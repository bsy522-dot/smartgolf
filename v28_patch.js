/* ====================================================================
 * SmartGolf v28.0 patch
 * 코스스케치갤러리Canvas18홀 + 라운드타임라인플래너Canvas + 코스날씨전략가Canvas
 * + 티타임어시스턴트AI + 골프소셜피드 + 코스비교분석기5축RadarCanvas
 * + 스윙자가진단체크리스트24항목 + 시즌성적표CanvasPNG
 * + Golf IQ v12 15문항 + 업적+12(152→164) + SFX12종 + 키보드8종
 * ==================================================================== */
(function () {
  'use strict';

  const SGV28 = {};
  const LS = (k, v) => v === undefined ? JSON.parse(localStorage.getItem('sg28_' + k) || 'null') : localStorage.setItem('sg28_' + k, JSON.stringify(v));

  // ========== SFX ENGINE ==========
  let _ac;
  function getAC() { if (!_ac) _ac = new (window.AudioContext || window.webkitAudioContext)(); return _ac; }
  const sfx = (freq, dur, type, vol) => {
    try {
      const ac = getAC();
      if (ac.state === 'suspended') ac.resume();
      const o = ac.createOscillator(), g = ac.createGain();
      o.type = type || 'sine'; o.frequency.value = freq;
      g.gain.setValueAtTime(vol || 0.15, ac.currentTime);
      g.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + dur);
      o.connect(g); g.connect(ac.destination);
      o.start(); o.stop(ac.currentTime + dur);
    } catch (e) {}
  };
  const SFX = {
    sketch_open: () => { sfx(440, 0.1); sfx(554, 0.12); },
    sketch_view: () => { sfx(523, 0.08); sfx(659, 0.1); sfx(784, 0.12); },
    timeline_open: () => { sfx(392, 0.12); sfx(494, 0.1); },
    timeline_save: () => { sfx(587, 0.1); sfx(740, 0.1); sfx(880, 0.12); },
    weather_open: () => { sfx(349, 0.1); sfx(440, 0.12); },
    weather_analyze: () => { sfx(523, 0.1); sfx(659, 0.08); sfx(784, 0.12); },
    tee_open: () => { sfx(466, 0.12); sfx(587, 0.1); },
    tee_recommend: () => { sfx(587, 0.08); sfx(740, 0.08); sfx(880, 0.12); },
    social_open: () => { sfx(330, 0.12); sfx(415, 0.1); },
    social_post: () => { sfx(523, 0.1); sfx(784, 0.12); },
    compare_open: () => { sfx(370, 0.1); sfx(466, 0.12); },
    compare_draw: () => { sfx(466, 0.08); sfx(587, 0.08); sfx(740, 0.12); },
    swing_open: () => { sfx(294, 0.12); sfx(370, 0.1); },
    swing_check: () => { sfx(523, 0.1); sfx(659, 0.12); },
    season_open: () => { sfx(415, 0.12); sfx(523, 0.1); },
    season_gen: () => { sfx(523, 0.06); sfx(659, 0.06); sfx(784, 0.06); sfx(1047, 0.06); sfx(1319, 0.2, 'triangle'); },
    quiz_v12: () => { sfx(523, 0.1); sfx(659, 0.12); },
    quiz_correct12: () => { sfx(784, 0.1); sfx(1047, 0.15); },
    achieve_v28: () => { sfx(523, 0.06); sfx(659, 0.06); sfx(784, 0.06); sfx(1047, 0.06); sfx(1319, 0.2, 'triangle'); }
  };

  // ========== CSS ==========
  const css = `
.sg28-bottom-bar{position:fixed;bottom:0;left:0;right:0;z-index:97;background:var(--glass-bg,rgba(255,255,255,.92));backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);border-top:1px solid var(--border,#e0e0e0);padding:8px 12px;display:flex;gap:8px;overflow-x:auto;scrollbar-width:none;-ms-overflow-style:none}
.sg28-bottom-bar::-webkit-scrollbar{display:none}
.sg28-bbtn{flex-shrink:0;display:flex;flex-direction:column;align-items:center;gap:3px;padding:6px 10px;border-radius:10px;border:1px solid var(--border,#e0e0e0);background:var(--card-bg,#fff);cursor:pointer;transition:all .2s;min-width:58px}
.sg28-bbtn:hover,.sg28-bbtn:active{background:var(--primary-light,#e8f5e9);border-color:var(--primary,#1a7a3a)}
.sg28-bbtn-icon{font-size:18px;line-height:1}
.sg28-bbtn-label{font-size:9px;font-weight:700;color:var(--text-muted,#666);white-space:nowrap}
.sg28-overlay{display:none;position:fixed;top:0;left:0;right:0;bottom:0;z-index:1001;background:rgba(0,0,0,.55);overflow-y:auto;padding:20px;animation:sg28FadeIn .25s}
.sg28-overlay.active{display:flex;align-items:flex-start;justify-content:center}
@keyframes sg28FadeIn{from{opacity:0}to{opacity:1}}
.sg28-panel{background:var(--card-bg,#fff);border-radius:16px;max-width:640px;width:100%;margin:30px auto;box-shadow:0 8px 40px rgba(0,0,0,.3);overflow:hidden;animation:sg28SlideUp .3s}
@keyframes sg28SlideUp{from{transform:translateY(30px);opacity:0}to{transform:translateY(0);opacity:1}}
.sg28-panel-head{padding:16px 20px;color:#fff;display:flex;align-items:center;justify-content:space-between}
.sg28-panel-head h3{font-size:16px;font-weight:700;display:flex;align-items:center;gap:8px}
.sg28-panel-close{background:rgba(255,255,255,.25);border:none;color:#fff;width:30px;height:30px;border-radius:50%;cursor:pointer;font-size:16px}
.sg28-panel-body{padding:16px 20px;max-height:70vh;overflow-y:auto}
.sg28-card{background:var(--bg,#f5f7f5);border-radius:12px;padding:14px;margin-bottom:10px;border:1px solid var(--border,#e0e0e0);cursor:pointer;transition:all .2s}
.sg28-card:hover{box-shadow:0 2px 12px rgba(0,0,0,.1);transform:translateY(-1px)}
.sg28-card-title{font-weight:700;font-size:14px;color:var(--text,#1a1a1a);margin-bottom:4px;display:flex;align-items:center;gap:6px}
.sg28-card-desc{font-size:12px;color:var(--text-muted,#666);line-height:1.5}
.sg28-badge{display:inline-block;padding:2px 8px;border-radius:10px;font-size:10px;font-weight:700}
.sg28-badge-purple{background:#ede7f6;color:#6a1b9a}
.sg28-badge-green{background:#e8f5e9;color:#2e7d32}
.sg28-badge-blue{background:#e3f2fd;color:#1565c0}
.sg28-badge-orange{background:#fff3e0;color:#e65100}
.sg28-badge-red{background:#ffebee;color:#c62828}
.sg28-tabs{display:flex;gap:4px;margin-bottom:12px;flex-wrap:wrap}
.sg28-tab{padding:6px 14px;border-radius:20px;border:1px solid var(--border,#e0e0e0);background:var(--bg,#f5f7f5);font-size:12px;cursor:pointer;font-weight:600;color:var(--text-muted,#666);transition:all .2s}
.sg28-tab.active{background:var(--primary,#1a7a3a);color:#fff;border-color:var(--primary,#1a7a3a)}
.sg28-input{width:100%;padding:10px 14px;border:2px solid var(--border,#e0e0e0);border-radius:10px;font-size:13px;background:var(--card-bg,#fff);color:var(--text,#1a1a1a);outline:none;margin-bottom:8px}
.sg28-input:focus{border-color:var(--primary,#1a7a3a)}
.sg28-btn{padding:10px 20px;border:none;border-radius:10px;font-size:13px;font-weight:700;cursor:pointer;transition:all .2s;display:inline-flex;align-items:center;gap:6px}
.sg28-btn-primary{background:var(--primary,#1a7a3a);color:#fff}
.sg28-btn-primary:hover{filter:brightness(1.1)}
.sg28-btn-secondary{background:var(--bg,#f5f7f5);color:var(--text,#1a1a1a);border:1px solid var(--border,#e0e0e0)}
.sg28-slider{width:100%;-webkit-appearance:none;height:6px;border-radius:3px;background:var(--border,#e0e0e0);outline:none}
.sg28-slider::-webkit-slider-thumb{-webkit-appearance:none;width:18px;height:18px;border-radius:50%;background:var(--primary,#1a7a3a);cursor:pointer}
canvas.sg28-canvas{width:100%;border-radius:12px;border:1px solid var(--border,#e0e0e0);background:var(--card-bg,#fff)}
.sg28-check-item{display:flex;align-items:center;gap:10px;padding:8px 12px;background:var(--bg,#f5f7f5);border-radius:10px;margin-bottom:6px;border:1px solid var(--border,#e0e0e0);cursor:pointer;transition:all .2s}
.sg28-check-item:hover{background:var(--primary-light,#e8f5e9)}
.sg28-check-item.checked{background:#e8f5e9;border-color:#4caf50}
.sg28-check-box{width:20px;height:20px;border-radius:6px;border:2px solid var(--border,#e0e0e0);display:flex;align-items:center;justify-content:center;font-size:14px;flex-shrink:0;transition:all .2s}
.sg28-check-item.checked .sg28-check-box{background:#4caf50;border-color:#4caf50;color:#fff}
.sg28-progress{height:8px;background:var(--border,#e0e0e0);border-radius:4px;overflow:hidden;margin:6px 0}
.sg28-progress-bar{height:100%;border-radius:4px;transition:width .4s}
.sg28-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:8px;margin:10px 0}
.sg28-stat-card{background:var(--card-bg,#fff);border:1px solid var(--border,#e0e0e0);border-radius:10px;padding:10px;text-align:center}
.sg28-stat-value{font-size:20px;font-weight:800;color:var(--primary,#1a7a3a)}
.sg28-stat-label{font-size:10px;color:var(--text-muted,#666);margin-top:2px}
.sg28-tag{display:inline-block;padding:3px 10px;border-radius:12px;font-size:11px;font-weight:600;background:var(--primary-light,#e8f5e9);color:var(--primary,#1a7a3a);margin:2px 3px}
`;
  const style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  // ========== UTILITY ==========
  function makeOverlay(id, title, color, body) {
    const el = document.createElement('div');
    el.className = 'sg28-overlay';
    el.id = id;
    el.innerHTML = '<div class="sg28-panel"><div class="sg28-panel-head" style="background:' + color + '"><h3>' + title + '</h3><button class="sg28-panel-close" onclick="document.getElementById(\'' + id + '\').classList.remove(\'active\')">&times;</button></div><div class="sg28-panel-body">' + body + '</div></div>';
    document.body.appendChild(el);
    el.addEventListener('click', function (e) { if (e.target === el) el.classList.remove('active'); });
    return el;
  }
  function openPanel(id, sfxFn) {
    try { var ac = getAC(); if (ac.state === 'suspended') ac.resume(); } catch (e) {}
    document.getElementById(id).classList.add('active');
    if (sfxFn) sfxFn();
  }
  function showToast(msg) {
    var t = document.createElement('div');
    t.style.cssText = 'position:fixed;top:80px;left:50%;transform:translateX(-50%);background:var(--toast-bg,#333);color:#fff;padding:10px 20px;border-radius:20px;font-size:13px;font-weight:700;z-index:10002;animation:sg28FadeIn .3s;box-shadow:0 4px 20px rgba(0,0,0,.3)';
    t.textContent = msg;
    document.body.appendChild(t);
    setTimeout(function () { t.remove(); }, 3000);
  }

  // ======================================================================
  // 1. 코스 스케치 갤러리 Canvas (18홀 레이아웃)
  // ======================================================================
  SGV28.courseSketch = (function () {
    var HOLES = [
      { par: 4, yards: 380, shape: 'straight', desc: '정면 넓은 페어웨이, 그린 앞 벙커 2개', tip: '드라이버로 센터 공략' },
      { par: 3, yards: 165, shape: 'short', desc: '아일랜드 그린, 바람 주의', tip: '정확한 아이언 샷 필요' },
      { par: 5, yards: 530, shape: 'dogleg_r', desc: '우측 도그레그, 워터해저드 좌측', tip: '레이업 후 그린 공략' },
      { par: 4, yards: 410, shape: 'dogleg_l', desc: '좌측 도그레그, 벙커 3개', tip: '페이드 샷으로 코너 공략' },
      { par: 4, yards: 350, shape: 'straight', desc: '내리막, 짧지만 그린 언듈레이션 심함', tip: '3번 우드 안전 공략' },
      { par: 3, yards: 195, shape: 'short', desc: '긴 파3, 전면 워터해저드', tip: '유틸리티로 그린 뒤 노리기' },
      { par: 5, yards: 550, shape: 'dogleg_l', desc: '좌측 도그레그 파5, 투온 가능', tip: '캐리 250+ 시 투온 도전' },
      { par: 4, yards: 420, shape: 'straight', desc: '오르막 긴 파4, 시그니처 홀', tip: '한 클럽 길게 선택' },
      { par: 4, yards: 365, shape: 'dogleg_r', desc: '우측 도그레그, OB 우측', tip: '좌측 에임 필수' },
      { par: 4, yards: 395, shape: 'straight', desc: '평탄한 파4, 그린 핀포지션 주의', tip: '세컨드 샷 방향성 중요' },
      { par: 3, yards: 180, shape: 'short', desc: '경사진 파3, 뒤쪽 벙커', tip: '핀 위치 확인 후 클럽 선택' },
      { par: 5, yards: 520, shape: 'dogleg_r', desc: '우측 도그레그, 크릭 횡단', tip: '레이업 지점 확인' },
      { par: 4, yards: 440, shape: 'straight', desc: '가장 긴 파4, 맞바람 자주', tip: '보기 방어 전략' },
      { par: 4, yards: 375, shape: 'dogleg_l', desc: '좌측 도그레그 내리막', tip: '3번 우드로 코너 공략' },
      { par: 3, yards: 155, shape: 'short', desc: '짧은 파3, 벙커 둘러싸임', tip: '핀 정면 정확도 승부' },
      { par: 5, yards: 545, shape: 'straight', desc: '직선 파5, 뒷바람 시 투온', tip: '공격적 플레이 가능' },
      { par: 4, yards: 400, shape: 'dogleg_r', desc: '우측 도그레그, 연못 우측', tip: '좌측 세이프 존 공략' },
      { par: 4, yards: 430, shape: 'straight', desc: '마지막 홀, 오르막, 갤러리 홀', tip: '한 클럽 길게, 멘탈 관리' }
    ];

    function drawHole(canvas, hole, idx) {
      var ctx = canvas.getContext('2d');
      var W = 560, H = 340;
      canvas.width = W; canvas.height = H;
      var dk = document.documentElement.getAttribute('data-theme') === 'dark';
      ctx.fillStyle = dk ? '#1a2e1a' : '#e8f5e9'; ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = dk ? '#0d1f0d' : '#c8e6c9';
      ctx.fillRect(10, 10, W - 20, H - 20);
      ctx.strokeStyle = dk ? '#2e7d32' : '#4CAF50'; ctx.lineWidth = 2;
      ctx.strokeRect(10, 10, W - 20, H - 20);
      ctx.fillStyle = dk ? '#e0e0e0' : '#1a7a3a'; ctx.font = 'bold 16px sans-serif';
      ctx.fillText('Hole ' + (idx + 1) + ' | Par ' + hole.par + ' | ' + hole.yards + 'yd', 20, 40);
      var cx = W / 2, teeY = H - 50, greenY = 60;
      ctx.fillStyle = dk ? '#4a3520' : '#8d6e63';
      ctx.fillRect(cx - 8, teeY - 5, 16, 10);
      ctx.fillStyle = dk ? '#1b5e20' : '#2e7d32';
      ctx.beginPath(); ctx.arc(cx, greenY, 22, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = dk ? '#e0e0e0' : '#fff'; ctx.font = '10px sans-serif';
      ctx.fillText('GREEN', cx - 16, greenY + 4);
      ctx.strokeStyle = dk ? '#388e3c' : '#66bb6a'; ctx.lineWidth = 3;
      if (hole.shape === 'dogleg_r') {
        ctx.beginPath(); ctx.moveTo(cx, teeY); ctx.quadraticCurveTo(cx, (teeY + greenY) / 2, cx + 60, greenY); ctx.stroke();
        ctx.beginPath(); ctx.arc(cx + 60, greenY, 22, 0, Math.PI * 2); ctx.fillStyle = dk ? '#1b5e20' : '#2e7d32'; ctx.fill();
        ctx.fillStyle = dk ? '#e0e0e0' : '#fff'; ctx.fillText('GREEN', cx + 44, greenY + 4);
      } else if (hole.shape === 'dogleg_l') {
        ctx.beginPath(); ctx.moveTo(cx, teeY); ctx.quadraticCurveTo(cx, (teeY + greenY) / 2, cx - 60, greenY); ctx.stroke();
        ctx.beginPath(); ctx.arc(cx - 60, greenY, 22, 0, Math.PI * 2); ctx.fillStyle = dk ? '#1b5e20' : '#2e7d32'; ctx.fill();
        ctx.fillStyle = dk ? '#e0e0e0' : '#fff'; ctx.fillText('GREEN', cx - 76, greenY + 4);
      } else {
        ctx.beginPath(); ctx.moveTo(cx, teeY); ctx.lineTo(cx, greenY + 22); ctx.stroke();
      }
      ctx.fillStyle = dk ? '#d4a017' : '#fbc02d';
      if (hole.shape !== 'short') {
        ctx.beginPath(); ctx.arc(cx + 30, teeY - 60, 8, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = dk ? '#e0e0e0' : '#333'; ctx.font = '8px sans-serif'; ctx.fillText('BK', cx + 25, teeY - 57);
      }
      if (hole.par >= 4) {
        ctx.fillStyle = '#42a5f5'; ctx.beginPath();
        var wy = (teeY + greenY) / 2 + 20;
        if (hole.shape === 'dogleg_r') { ctx.ellipse(cx - 40, wy, 25, 12, 0, 0, Math.PI * 2); }
        else if (hole.shape === 'dogleg_l') { ctx.ellipse(cx + 40, wy, 25, 12, 0, 0, Math.PI * 2); }
        else { ctx.ellipse(cx - 50, wy, 20, 10, 0, 0, Math.PI * 2); }
        ctx.fill();
      }
      ctx.fillStyle = '#f44336'; ctx.beginPath();
      var flagX = hole.shape === 'dogleg_r' ? cx + 60 : hole.shape === 'dogleg_l' ? cx - 60 : cx;
      ctx.moveTo(flagX, greenY - 22); ctx.lineTo(flagX, greenY - 38);
      ctx.lineTo(flagX + 12, greenY - 32); ctx.lineTo(flagX, greenY - 26); ctx.fill();
      ctx.fillStyle = dk ? '#bbb' : '#555'; ctx.font = '12px sans-serif';
      ctx.fillText(hole.desc, 20, H - 22);
      ctx.fillStyle = dk ? '#81c784' : '#1b5e20'; ctx.font = 'bold 11px sans-serif';
      ctx.fillText('TIP: ' + hole.tip, 20, H - 6);
    }

    function buildUI() {
      var tabsHtml = HOLES.map(function (h, i) {
        return '<span class="sg28-tab' + (i === 0 ? ' active' : '') + '" data-hole="' + i + '">H' + (i + 1) + '</span>';
      }).join('');
      var body = '<p style="font-size:12px;color:var(--text-muted);margin-bottom:12px">18홀 코스 레이아웃을 시각적으로 확인하세요. 각 홀의 특징과 공략 팁을 제공합니다.</p>' +
        '<div class="sg28-tabs" id="sg28-sketch-tabs">' + tabsHtml + '</div>' +
        '<canvas class="sg28-canvas" id="sg28-sketch-canvas"></canvas>' +
        '<div class="sg28-grid" style="grid-template-columns:1fr 1fr;margin-top:10px">' +
        '<div class="sg28-stat-card"><div class="sg28-stat-value" id="sg28-sk-par">72</div><div class="sg28-stat-label">Total Par</div></div>' +
        '<div class="sg28-stat-card"><div class="sg28-stat-value" id="sg28-sk-yards">6,910</div><div class="sg28-stat-label">Total Yards</div></div></div>';
      makeOverlay('sg28SketchOverlay', '🗺️ 코스 스케치 갤러리', 'linear-gradient(135deg,#1b5e20,#2e7d32)', body);
      var totalPar = 0, totalYards = 0;
      HOLES.forEach(function (h) { totalPar += h.par; totalYards += h.yards; });
      var parEl = document.getElementById('sg28-sk-par');
      var yardsEl = document.getElementById('sg28-sk-yards');
      if (parEl) parEl.textContent = totalPar;
      if (yardsEl) yardsEl.textContent = totalYards.toLocaleString();
      drawHole(document.getElementById('sg28-sketch-canvas'), HOLES[0], 0);
      document.getElementById('sg28-sketch-tabs').addEventListener('click', function (e) {
        var tab = e.target.closest('.sg28-tab');
        if (!tab) return;
        document.querySelectorAll('#sg28-sketch-tabs .sg28-tab').forEach(function (t) { t.classList.remove('active'); });
        tab.classList.add('active');
        var idx = parseInt(tab.dataset.hole);
        drawHole(document.getElementById('sg28-sketch-canvas'), HOLES[idx], idx);
        SFX.sketch_view();
        SGV28.achievements.check('sketch_viewer');
      });
    }
    return { init: buildUI };
  })();

  // ======================================================================
  // 2. 라운드 타임라인 플래너 Canvas
  // ======================================================================
  SGV28.timeline = (function () {
    var DATA_KEY = 'timelines';
    function getAll() { return LS(DATA_KEY) || []; }
    function save(tl) { var arr = getAll(); arr.unshift(tl); if (arr.length > 20) arr.pop(); LS(DATA_KEY, arr); }

    function drawCanvas(canvas, tl) {
      var ctx = canvas.getContext('2d');
      var W = 580, H = 300;
      canvas.width = W; canvas.height = H;
      var dk = document.documentElement.getAttribute('data-theme') === 'dark';
      ctx.fillStyle = dk ? '#1e1e1e' : '#fafafa'; ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = dk ? '#e0e0e0' : '#1a7a3a'; ctx.font = 'bold 14px sans-serif';
      ctx.fillText('라운드 타임라인 | ' + tl.date, 20, 28);
      ctx.fillStyle = dk ? '#aaa' : '#666'; ctx.font = '11px sans-serif';
      ctx.fillText(tl.course + ' | 티타임 ' + tl.teeTime, 20, 46);
      var phases = [
        { name: '워밍업', dur: tl.warmup, color: '#FF9800', icon: '🏃' },
        { name: '프론트 9', dur: tl.front9, color: '#4CAF50', icon: '⛳' },
        { name: '중간 휴식', dur: tl.breakTime, color: '#2196F3', icon: '☕' },
        { name: '백 9', dur: tl.back9, color: '#9C27B0', icon: '⛳' },
        { name: '쿨다운', dur: tl.cooldown, color: '#F44336', icon: '🧘' },
        { name: '19번 홀', dur: tl.hole19, color: '#795548', icon: '🍻' }
      ];
      var total = 0;
      phases.forEach(function (p) { total += p.dur; });
      var barY = 80, barH = 40, barX = 40, barW = W - 80;
      var x = barX;
      phases.forEach(function (p) {
        var w = (p.dur / total) * barW;
        ctx.fillStyle = p.color; ctx.fillRect(x, barY, w, barH);
        ctx.strokeStyle = dk ? '#333' : '#fff'; ctx.lineWidth = 1; ctx.strokeRect(x, barY, w, barH);
        if (w > 30) {
          ctx.fillStyle = '#fff'; ctx.font = 'bold 10px sans-serif';
          ctx.fillText(p.dur + '분', x + w / 2 - 12, barY + barH / 2 + 4);
        }
        x += w;
      });
      var legendY = 140;
      phases.forEach(function (p, i) {
        var lx = 20 + (i % 3) * 190;
        var ly = legendY + Math.floor(i / 3) * 36;
        ctx.fillStyle = p.color; ctx.fillRect(lx, ly, 14, 14);
        ctx.fillStyle = dk ? '#e0e0e0' : '#333'; ctx.font = '12px sans-serif';
        ctx.fillText(p.icon + ' ' + p.name + ' (' + p.dur + '분)', lx + 20, ly + 12);
      });
      var cumTime = 0;
      var startH = parseInt(tl.teeTime.split(':')[0]);
      var startM = parseInt(tl.teeTime.split(':')[1]) - tl.warmup;
      ctx.fillStyle = dk ? '#81c784' : '#1a7a3a'; ctx.font = 'bold 12px sans-serif';
      ctx.fillText('총 소요시간: ' + total + '분 (' + Math.floor(total / 60) + '시간 ' + (total % 60) + '분)', 20, H - 50);
      var endH = startH + Math.floor((startM + total) / 60);
      var endM = (startM + total) % 60;
      if (endM < 0) { endM += 60; endH--; }
      ctx.fillText('예상 종료: ' + (endH < 10 ? '0' : '') + endH + ':' + (endM < 10 ? '0' : '') + endM, 20, H - 30);
      var grade = total <= 300 ? 'S' : total <= 330 ? 'A' : total <= 360 ? 'B' : total <= 390 ? 'C' : 'D';
      ctx.fillStyle = grade === 'S' ? '#FFD700' : grade === 'A' ? '#4CAF50' : grade === 'B' ? '#2196F3' : grade === 'C' ? '#FF9800' : '#F44336';
      ctx.font = 'bold 28px sans-serif';
      ctx.fillText(grade, W - 60, H - 25);
      ctx.fillStyle = dk ? '#aaa' : '#999'; ctx.font = '10px sans-serif';
      ctx.fillText('시간 효율 등급', W - 85, H - 10);
    }

    function buildUI() {
      var body = '<p style="font-size:12px;color:var(--text-muted);margin-bottom:12px">라운드 각 단계별 시간을 계획하고 최적의 플로우를 설계하세요.</p>' +
        '<input class="sg28-input" id="sg28-tl-course" placeholder="코스명">' +
        '<div class="sg28-grid" style="grid-template-columns:1fr 1fr">' +
        '<div><label style="font-size:11px;font-weight:700">티타임</label><input class="sg28-input" id="sg28-tl-tee" type="time" value="07:00"></div>' +
        '<div><label style="font-size:11px;font-weight:700">워밍업 (분)</label><input type="range" class="sg28-slider" id="sg28-tl-warmup" min="10" max="60" value="30"><span id="sg28-tl-warmup-v" style="font-size:11px">30분</span></div>' +
        '<div><label style="font-size:11px;font-weight:700">프론트 9 (분)</label><input type="range" class="sg28-slider" id="sg28-tl-front" min="60" max="150" value="120"><span id="sg28-tl-front-v" style="font-size:11px">120분</span></div>' +
        '<div><label style="font-size:11px;font-weight:700">중간 휴식 (분)</label><input type="range" class="sg28-slider" id="sg28-tl-break" min="0" max="40" value="15"><span id="sg28-tl-break-v" style="font-size:11px">15분</span></div>' +
        '<div><label style="font-size:11px;font-weight:700">백 9 (분)</label><input type="range" class="sg28-slider" id="sg28-tl-back" min="60" max="150" value="120"><span id="sg28-tl-back-v" style="font-size:11px">120분</span></div>' +
        '<div><label style="font-size:11px;font-weight:700">쿨다운 (분)</label><input type="range" class="sg28-slider" id="sg28-tl-cool" min="0" max="30" value="10"><span id="sg28-tl-cool-v" style="font-size:11px">10분</span></div>' +
        '<div><label style="font-size:11px;font-weight:700">19번 홀 (분)</label><input type="range" class="sg28-slider" id="sg28-tl-19" min="0" max="90" value="30"><span id="sg28-tl-19-v" style="font-size:11px">30분</span></div>' +
        '</div>' +
        '<button class="sg28-btn sg28-btn-primary" id="sg28-tl-gen" style="width:100%;margin:10px 0;justify-content:center">📅 타임라인 생성</button>' +
        '<canvas class="sg28-canvas" id="sg28-tl-canvas"></canvas>' +
        '<div id="sg28-tl-history" style="margin-top:12px"></div>';
      makeOverlay('sg28TimelineOverlay', '📅 라운드 타임라인 플래너', 'linear-gradient(135deg,#e65100,#ff8f00)', body);
      ['warmup', 'front', 'break', 'back', 'cool', '19'].forEach(function (k) {
        var sl = document.getElementById('sg28-tl-' + k);
        if (sl) sl.addEventListener('input', function () { document.getElementById('sg28-tl-' + k + '-v').textContent = sl.value + '분'; });
      });
      document.getElementById('sg28-tl-gen').addEventListener('click', function () {
        var tl = {
          date: new Date().toLocaleDateString('ko-KR'),
          course: document.getElementById('sg28-tl-course').value || '미입력',
          teeTime: document.getElementById('sg28-tl-tee').value || '07:00',
          warmup: +document.getElementById('sg28-tl-warmup').value,
          front9: +document.getElementById('sg28-tl-front').value,
          breakTime: +document.getElementById('sg28-tl-break').value,
          back9: +document.getElementById('sg28-tl-back').value,
          cooldown: +document.getElementById('sg28-tl-cool').value,
          hole19: +document.getElementById('sg28-tl-19').value
        };
        save(tl);
        drawCanvas(document.getElementById('sg28-tl-canvas'), tl);
        SFX.timeline_save();
        SGV28.achievements.check('timeline_first');
        if (getAll().length >= 5) SGV28.achievements.check('timeline_5');
        renderHistory();
      });
      function renderHistory() {
        var arr = getAll().slice(0, 5);
        var el = document.getElementById('sg28-tl-history');
        if (!arr.length) { el.innerHTML = '<p style="font-size:11px;color:var(--text-muted)">아직 타임라인 기록이 없습니다.</p>'; return; }
        el.innerHTML = '<h4 style="font-size:13px;font-weight:700;margin-bottom:8px">최근 타임라인</h4>' + arr.map(function (r) {
          var total = r.warmup + r.front9 + r.breakTime + r.back9 + r.cooldown + r.hole19;
          return '<div class="sg28-card"><div class="sg28-card-title">' + r.course + ' <span class="sg28-badge sg28-badge-orange">' + total + '분</span></div><div class="sg28-card-desc">' + r.date + ' | ' + r.teeTime + '</div></div>';
        }).join('');
      }
      renderHistory();
    }
    return { init: buildUI };
  })();

  // ======================================================================
  // 3. 코스 날씨 전략가 Canvas
  // ======================================================================
  SGV28.weatherStrategy = (function () {
    function drawCanvas(canvas, data) {
      var ctx = canvas.getContext('2d');
      var W = 560, H = 360;
      canvas.width = W; canvas.height = H;
      var dk = document.documentElement.getAttribute('data-theme') === 'dark';
      ctx.fillStyle = dk ? '#1e1e1e' : '#e3f2fd'; ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = dk ? '#e0e0e0' : '#0d47a1'; ctx.font = 'bold 14px sans-serif';
      ctx.fillText('날씨 기반 클럽 보정 분석', 20, 28);
      var tempEffect = (data.temp - 20) * 0.5;
      var windEffect = data.windSpeed * (data.windDir === 'head' ? -1.5 : data.windDir === 'tail' ? 1.2 : -0.3);
      var altEffect = data.altitude * 0.002;
      var humidEffect = (data.humidity - 50) * -0.05;
      var totalEffect = tempEffect + windEffect + altEffect + humidEffect;
      var factors = [
        { name: '기온 (' + data.temp + '°C)', effect: tempEffect, color: data.temp > 20 ? '#f44336' : '#2196f3' },
        { name: '바람 (' + data.windSpeed + 'm/s ' + (data.windDir === 'head' ? '맞바람' : data.windDir === 'tail' ? '뒷바람' : '측면풍') + ')', effect: windEffect, color: '#ff9800' },
        { name: '고도 (' + data.altitude + 'm)', effect: altEffect, color: '#4caf50' },
        { name: '습도 (' + data.humidity + '%)', effect: humidEffect, color: '#9c27b0' }
      ];
      var barStartX = 200, barMaxW = 280, barH = 28, startY = 60;
      var maxAbs = Math.max.apply(null, factors.map(function (f) { return Math.abs(f.effect); }).concat([1]));
      factors.forEach(function (f, i) {
        var y = startY + i * 50;
        ctx.fillStyle = dk ? '#bbb' : '#333'; ctx.font = '12px sans-serif';
        ctx.fillText(f.name, 14, y + 18);
        ctx.fillStyle = dk ? '#333' : '#e0e0e0';
        ctx.fillRect(barStartX, y, barMaxW, barH);
        var mid = barStartX + barMaxW / 2;
        var w = (Math.abs(f.effect) / maxAbs) * (barMaxW / 2 - 10);
        ctx.fillStyle = f.color;
        if (f.effect >= 0) { ctx.fillRect(mid, y, w, barH); }
        else { ctx.fillRect(mid - w, y, w, barH); }
        ctx.strokeStyle = dk ? '#555' : '#999'; ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(mid, y - 4); ctx.lineTo(mid, y + barH + 4); ctx.stroke();
        ctx.fillStyle = dk ? '#e0e0e0' : '#333'; ctx.font = 'bold 11px sans-serif';
        var sign = f.effect >= 0 ? '+' : '';
        ctx.fillText(sign + f.effect.toFixed(1) + 'yd', f.effect >= 0 ? mid + w + 4 : mid - w - 35, y + 18);
      });
      var summaryY = startY + factors.length * 50 + 10;
      ctx.fillStyle = dk ? '#81c784' : '#1b5e20'; ctx.font = 'bold 16px sans-serif';
      var sign2 = totalEffect >= 0 ? '+' : '';
      ctx.fillText('총 보정: ' + sign2 + totalEffect.toFixed(1) + 'yd', 20, summaryY);
      var clubs = [
        { name: '드라이버', base: 230 }, { name: '3번 우드', base: 210 }, { name: '5번 아이언', base: 180 },
        { name: '7번 아이언', base: 155 }, { name: '9번 아이언', base: 130 }, { name: 'PW', base: 115 },
        { name: 'SW', base: 90 }
      ];
      ctx.fillStyle = dk ? '#e0e0e0' : '#333'; ctx.font = 'bold 12px sans-serif';
      ctx.fillText('클럽별 보정 비거리', 20, summaryY + 30);
      var tableY = summaryY + 45;
      clubs.forEach(function (c, i) {
        var x = 20 + (i % 4) * 135;
        var y = tableY + Math.floor(i / 4) * 32;
        var adjusted = Math.round(c.base + totalEffect * (c.base / 230));
        ctx.fillStyle = dk ? '#2a2a2a' : '#f5f5f5'; ctx.fillRect(x, y, 125, 24);
        ctx.strokeStyle = dk ? '#444' : '#ddd'; ctx.strokeRect(x, y, 125, 24);
        ctx.fillStyle = dk ? '#e0e0e0' : '#333'; ctx.font = '11px sans-serif';
        ctx.fillText(c.name + ': ' + adjusted + 'yd', x + 6, y + 16);
      });
    }

    function buildUI() {
      var body = '<p style="font-size:12px;color:var(--text-muted);margin-bottom:12px">기온, 바람, 고도, 습도에 따른 비거리 보정을 계산합니다.</p>' +
        '<div class="sg28-grid" style="grid-template-columns:1fr 1fr">' +
        '<div><label style="font-size:11px;font-weight:700">기온 (°C)</label><input type="range" class="sg28-slider" id="sg28-wt-temp" min="-5" max="40" value="22"><span id="sg28-wt-temp-v" style="font-size:11px">22°C</span></div>' +
        '<div><label style="font-size:11px;font-weight:700">풍속 (m/s)</label><input type="range" class="sg28-slider" id="sg28-wt-wind" min="0" max="15" value="3"><span id="sg28-wt-wind-v" style="font-size:11px">3m/s</span></div>' +
        '<div><label style="font-size:11px;font-weight:700">풍향</label><select class="sg28-input" id="sg28-wt-dir" style="margin-bottom:0"><option value="head">맞바람</option><option value="tail">뒷바람</option><option value="cross">측면풍</option></select></div>' +
        '<div><label style="font-size:11px;font-weight:700">고도 (m)</label><input type="range" class="sg28-slider" id="sg28-wt-alt" min="0" max="1500" value="100"><span id="sg28-wt-alt-v" style="font-size:11px">100m</span></div>' +
        '<div><label style="font-size:11px;font-weight:700">습도 (%)</label><input type="range" class="sg28-slider" id="sg28-wt-hum" min="20" max="100" value="60"><span id="sg28-wt-hum-v" style="font-size:11px">60%</span></div>' +
        '</div>' +
        '<button class="sg28-btn sg28-btn-primary" id="sg28-wt-analyze" style="width:100%;margin:10px 0;justify-content:center">🌤️ 날씨 전략 분석</button>' +
        '<canvas class="sg28-canvas" id="sg28-wt-canvas"></canvas>';
      makeOverlay('sg28WeatherOverlay', '🌤️ 코스 날씨 전략가', 'linear-gradient(135deg,#0d47a1,#1976d2)', body);
      ['temp', 'wind', 'alt', 'hum'].forEach(function (k) {
        var sl = document.getElementById('sg28-wt-' + k);
        var units = { temp: '°C', wind: 'm/s', alt: 'm', hum: '%' };
        if (sl) sl.addEventListener('input', function () { document.getElementById('sg28-wt-' + k + '-v').textContent = sl.value + units[k]; });
      });
      document.getElementById('sg28-wt-analyze').addEventListener('click', function () {
        var data = {
          temp: +document.getElementById('sg28-wt-temp').value,
          windSpeed: +document.getElementById('sg28-wt-wind').value,
          windDir: document.getElementById('sg28-wt-dir').value,
          altitude: +document.getElementById('sg28-wt-alt').value,
          humidity: +document.getElementById('sg28-wt-hum').value
        };
        drawCanvas(document.getElementById('sg28-wt-canvas'), data);
        SFX.weather_analyze();
        SGV28.achievements.check('weather_first');
        var cnt = (LS('weather_cnt') || 0) + 1;
        LS('weather_cnt', cnt);
        if (cnt >= 5) SGV28.achievements.check('weather_expert');
      });
    }
    return { init: buildUI };
  })();

  // ======================================================================
  // 4. 티타임 어시스턴트 AI
  // ======================================================================
  SGV28.teeAssistant = (function () {
    var RECOMMENDATIONS = [
      { season: '봄', months: [3, 4, 5], best: '07:00~09:00', reason: '선선한 아침, 바람 적음', avoid: '14:00~16:00 (꽃가루+바람)', tip: '자외선 차단 필수, 가벼운 방풍 재킷 준비' },
      { season: '여름', months: [6, 7, 8], best: '06:00~07:30', reason: '더위 피해 새벽 라운드', avoid: '11:00~14:00 (폭염 위험)', tip: '이온음료, 양산, 쿨링 타올 필수' },
      { season: '가을', months: [9, 10, 11], best: '08:00~10:00', reason: '최적 기온, 단풍 뷰', avoid: '16:00 이후 (해거름 빠름)', tip: '레이어드 착장 추천, 그린 속도 빨라짐' },
      { season: '겨울', months: [12, 1, 2], best: '09:30~11:00', reason: '기온 오른 후 스타트', avoid: '15:00 이후 (급격한 기온 하강)', tip: '핫팩, 보온 내의, 소프트볼 사용' }
    ];
    var PRICING = [
      { day: '주중', time: '새벽', price: '6~8만', level: 'low' },
      { day: '주중', time: '오전', price: '8~12만', level: 'mid' },
      { day: '주중', time: '오후', price: '7~10만', level: 'low' },
      { day: '주말', time: '새벽', price: '10~14만', level: 'mid' },
      { day: '주말', time: '오전', price: '15~22만', level: 'high' },
      { day: '주말', time: '오후', price: '12~18만', level: 'mid' }
    ];

    function buildUI() {
      var now = new Date();
      var month = now.getMonth() + 1;
      var rec = RECOMMENDATIONS.find(function (r) { return r.months.indexOf(month) >= 0; }) || RECOMMENDATIONS[0];
      var pricingHtml = PRICING.map(function (p) {
        var bgColor = p.level === 'low' ? '#e8f5e9' : p.level === 'mid' ? '#fff3e0' : '#ffebee';
        var textColor = p.level === 'low' ? '#2e7d32' : p.level === 'mid' ? '#e65100' : '#c62828';
        return '<div class="sg28-card" style="background:' + bgColor + '"><div class="sg28-card-title" style="color:' + textColor + '">' + p.day + ' ' + p.time + ' <span class="sg28-badge" style="background:' + textColor + ';color:#fff">' + p.price + '</span></div></div>';
      }).join('');
      var body = '<p style="font-size:12px;color:var(--text-muted);margin-bottom:12px">현재 시즌 기반 최적 티타임과 가격대를 안내합니다.</p>' +
        '<div class="sg28-card" style="border-left:4px solid #4CAF50"><div class="sg28-card-title">🌸 현재 시즌: ' + rec.season + '</div>' +
        '<div class="sg28-card-desc" style="line-height:2">' +
        '<strong>추천 시간:</strong> ' + rec.best + '<br>' +
        '<strong>이유:</strong> ' + rec.reason + '<br>' +
        '<strong>피해야 할 시간:</strong> ' + rec.avoid + '<br>' +
        '<strong>꿀팁:</strong> ' + rec.tip +
        '</div></div>' +
        '<h4 style="font-size:13px;font-weight:700;margin:12px 0 8px">💰 시간대별 예상 그린피</h4>' + pricingHtml +
        '<h4 style="font-size:13px;font-weight:700;margin:12px 0 8px">📊 요일별 혼잡도</h4>' +
        '<div class="sg28-grid" style="grid-template-columns:repeat(7,1fr)">' +
        ['월', '화', '수', '목', '금', '토', '일'].map(function (d, i) {
          var busy = i < 5 ? (30 + i * 5) : (80 + (i - 5) * 10);
          var color = busy < 40 ? '#4CAF50' : busy < 70 ? '#FF9800' : '#f44336';
          return '<div style="text-align:center"><div style="font-size:11px;font-weight:700">' + d + '</div><div style="width:24px;height:' + (busy * 0.6) + 'px;background:' + color + ';margin:4px auto;border-radius:4px"></div><div style="font-size:9px;color:var(--text-muted)">' + busy + '%</div></div>';
        }).join('') +
        '</div>' +
        '<h4 style="font-size:13px;font-weight:700;margin:12px 0 8px">💡 예약 꿀팁</h4>' +
        '<div class="sg28-card"><div class="sg28-card-desc">' +
        '• 주중 새벽은 가장 저렴 (6~8만원대)<br>' +
        '• 주말은 2주 전 예약 필수<br>' +
        '• 연휴 시즌은 한 달 전 예약<br>' +
        '• 캐디 미배정 셀프라운드는 2~3만원 절감<br>' +
        '• 비 예보 시 당일 취소건 노리기' +
        '</div></div>';
      makeOverlay('sg28TeeOverlay', '⏰ 티타임 어시스턴트 AI', 'linear-gradient(135deg,#4a148c,#7b1fa2)', body);
    }
    return { init: function () { buildUI(); SGV28.achievements.check('tee_assist_first'); } };
  })();

  // ======================================================================
  // 5. 골프 소셜 피드
  // ======================================================================
  SGV28.social = (function () {
    var DATA_KEY = 'social_feed';
    function getAll() { return LS(DATA_KEY) || []; }
    function addPost(p) { var arr = getAll(); arr.unshift(p); if (arr.length > 30) arr.pop(); LS(DATA_KEY, arr); }

    function buildUI() {
      var body = '<p style="font-size:12px;color:var(--text-muted);margin-bottom:12px">나의 골프 활동을 기록하고 공유하세요.</p>' +
        '<div class="sg28-tabs" id="sg28-social-tabs">' +
        '<span class="sg28-tab active" data-tab="write">글쓰기</span>' +
        '<span class="sg28-tab" data-tab="feed">피드</span>' +
        '<span class="sg28-tab" data-tab="stats">통계</span>' +
        '</div>' +
        '<div id="sg28-social-write">' +
        '<select class="sg28-input" id="sg28-so-type"><option value="round">라운드 완료</option><option value="practice">연습</option><option value="achievement">업적 달성</option><option value="tip">팁 공유</option><option value="question">질문</option></select>' +
        '<textarea class="sg28-input" id="sg28-so-text" placeholder="활동을 기록하세요..." style="height:80px;resize:vertical"></textarea>' +
        '<div class="sg28-grid" style="grid-template-columns:1fr 1fr">' +
        '<div><label style="font-size:11px;font-weight:700">스코어 (선택)</label><input class="sg28-input" id="sg28-so-score" type="number" placeholder="예: 92" style="margin:0"></div>' +
        '<div><label style="font-size:11px;font-weight:700">기분</label><select class="sg28-input" id="sg28-so-mood" style="margin:0"><option value="great">🤩 최고</option><option value="good">😊 좋음</option><option value="normal">😐 보통</option><option value="tired">😴 피곤</option><option value="bad">😞 아쉬움</option></select></div>' +
        '</div>' +
        '<button class="sg28-btn sg28-btn-primary" id="sg28-so-submit" style="width:100%;margin:8px 0;justify-content:center">✍️ 피드 등록</button>' +
        '</div>' +
        '<div id="sg28-social-feed" style="display:none"></div>' +
        '<div id="sg28-social-stats" style="display:none"></div>';
      makeOverlay('sg28SocialOverlay', '📱 골프 소셜 피드', 'linear-gradient(135deg,#1565c0,#42a5f5)', body);
      document.getElementById('sg28-social-tabs').addEventListener('click', function (e) {
        var tab = e.target.closest('.sg28-tab');
        if (!tab) return;
        document.querySelectorAll('#sg28-social-tabs .sg28-tab').forEach(function (t) { t.classList.remove('active'); });
        tab.classList.add('active');
        var tgt = tab.dataset.tab;
        document.getElementById('sg28-social-write').style.display = tgt === 'write' ? '' : 'none';
        document.getElementById('sg28-social-feed').style.display = tgt === 'feed' ? '' : 'none';
        document.getElementById('sg28-social-stats').style.display = tgt === 'stats' ? '' : 'none';
        if (tgt === 'feed') renderFeed();
        if (tgt === 'stats') renderStats();
      });
      document.getElementById('sg28-so-submit').addEventListener('click', function () {
        var text = document.getElementById('sg28-so-text').value;
        if (!text.trim()) { showToast('내용을 입력하세요'); return; }
        var post = {
          date: new Date().toLocaleDateString('ko-KR'),
          time: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' }),
          type: document.getElementById('sg28-so-type').value,
          text: text,
          score: document.getElementById('sg28-so-score').value || null,
          mood: document.getElementById('sg28-so-mood').value
        };
        addPost(post);
        document.getElementById('sg28-so-text').value = '';
        document.getElementById('sg28-so-score').value = '';
        SFX.social_post();
        showToast('피드에 등록되었습니다');
        SGV28.achievements.check('social_first');
        if (getAll().length >= 10) SGV28.achievements.check('social_10');
      });
      function renderFeed() {
        var arr = getAll();
        var el = document.getElementById('sg28-social-feed');
        if (!arr.length) { el.innerHTML = '<p style="font-size:12px;color:var(--text-muted);text-align:center;padding:20px">아직 피드가 없습니다. 첫 글을 남겨보세요!</p>'; return; }
        var typeIcons = { round: '⛳', practice: '🏌️', achievement: '🏆', tip: '💡', question: '❓' };
        var moodIcons = { great: '🤩', good: '😊', normal: '😐', tired: '😴', bad: '😞' };
        el.innerHTML = arr.map(function (p) {
          return '<div class="sg28-card"><div class="sg28-card-title">' + (typeIcons[p.type] || '📌') + ' ' + p.text.substring(0, 50) + (p.text.length > 50 ? '...' : '') + '</div><div class="sg28-card-desc">' + p.date + ' ' + p.time + ' ' + (moodIcons[p.mood] || '') + (p.score ? ' | 스코어: ' + p.score : '') + '</div></div>';
        }).join('');
      }
      function renderStats() {
        var arr = getAll();
        var el = document.getElementById('sg28-social-stats');
        var rounds = arr.filter(function (p) { return p.type === 'round'; });
        var scores = rounds.map(function (p) { return parseInt(p.score); }).filter(function (s) { return !isNaN(s); });
        var avg = scores.length ? Math.round(scores.reduce(function (a, b) { return a + b; }, 0) / scores.length) : 0;
        var best = scores.length ? Math.min.apply(null, scores) : 0;
        var moods = {};
        arr.forEach(function (p) { moods[p.mood] = (moods[p.mood] || 0) + 1; });
        el.innerHTML = '<div class="sg28-grid" style="grid-template-columns:repeat(3,1fr)">' +
          '<div class="sg28-stat-card"><div class="sg28-stat-value">' + arr.length + '</div><div class="sg28-stat-label">총 게시물</div></div>' +
          '<div class="sg28-stat-card"><div class="sg28-stat-value">' + (avg || '-') + '</div><div class="sg28-stat-label">평균 스코어</div></div>' +
          '<div class="sg28-stat-card"><div class="sg28-stat-value">' + (best || '-') + '</div><div class="sg28-stat-label">베스트 스코어</div></div>' +
          '</div>' +
          '<h4 style="font-size:13px;font-weight:700;margin:12px 0 8px">기분 분포</h4>' +
          '<div class="sg28-grid" style="grid-template-columns:repeat(5,1fr)">' +
          [['great', '🤩'], ['good', '😊'], ['normal', '😐'], ['tired', '😴'], ['bad', '😞']].map(function (m) {
            return '<div style="text-align:center"><div style="font-size:20px">' + m[1] + '</div><div style="font-size:14px;font-weight:700">' + (moods[m[0]] || 0) + '</div></div>';
          }).join('') +
          '</div>';
      }
    }
    return { init: buildUI };
  })();

  // ======================================================================
  // 6. 코스 비교 분석기 5축 Radar Canvas
  // ======================================================================
  SGV28.courseCompare = (function () {
    var SAMPLE_COURSES = [
      { name: '남서울CC', difficulty: 82, condition: 90, facility: 85, value: 60, access: 75 },
      { name: '이천베네스트', difficulty: 88, condition: 92, facility: 90, value: 55, access: 70 },
      { name: '해슬리나인브릿지', difficulty: 95, condition: 98, facility: 95, value: 40, access: 65 },
      { name: '핀크스GC', difficulty: 90, condition: 95, facility: 92, value: 45, access: 50 },
      { name: '레이크사이드CC', difficulty: 75, condition: 80, facility: 82, value: 75, access: 85 },
      { name: '안양CC', difficulty: 78, condition: 82, facility: 78, value: 80, access: 90 },
      { name: '블루원용인', difficulty: 80, condition: 85, facility: 88, value: 70, access: 80 },
      { name: '사이프러스GC', difficulty: 85, condition: 88, facility: 86, value: 65, access: 72 }
    ];

    function drawRadar(canvas, c1, c2) {
      var ctx = canvas.getContext('2d');
      var W = 500, H = 420;
      canvas.width = W; canvas.height = H;
      var dk = document.documentElement.getAttribute('data-theme') === 'dark';
      ctx.fillStyle = dk ? '#1e1e1e' : '#fff'; ctx.fillRect(0, 0, W, H);
      var cx = W / 2, cy = 200, R = 140;
      var labels = ['난이도', '코스관리', '시설', '가성비', '접근성'];
      var vals1 = [c1.difficulty, c1.condition, c1.facility, c1.value, c1.access];
      var vals2 = [c2.difficulty, c2.condition, c2.facility, c2.value, c2.access];
      for (var ring = 1; ring <= 5; ring++) {
        ctx.beginPath();
        for (var j = 0; j < 5; j++) {
          var angle = (Math.PI * 2 * j / 5) - Math.PI / 2;
          var r = R * ring / 5;
          var px = cx + r * Math.cos(angle);
          var py = cy + r * Math.sin(angle);
          if (j === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.strokeStyle = dk ? '#333' : '#e0e0e0'; ctx.lineWidth = 1; ctx.stroke();
      }
      for (var k = 0; k < 5; k++) {
        var a = (Math.PI * 2 * k / 5) - Math.PI / 2;
        ctx.beginPath(); ctx.moveTo(cx, cy);
        ctx.lineTo(cx + R * Math.cos(a), cy + R * Math.sin(a));
        ctx.strokeStyle = dk ? '#444' : '#ccc'; ctx.stroke();
        var lx = cx + (R + 20) * Math.cos(a) - 20;
        var ly = cy + (R + 20) * Math.sin(a) + 4;
        ctx.fillStyle = dk ? '#e0e0e0' : '#333'; ctx.font = 'bold 11px sans-serif';
        ctx.fillText(labels[k], lx, ly);
      }
      function drawPoly(vals, color, alpha) {
        ctx.beginPath();
        for (var i = 0; i < 5; i++) {
          var ang = (Math.PI * 2 * i / 5) - Math.PI / 2;
          var rr = R * vals[i] / 100;
          var xx = cx + rr * Math.cos(ang);
          var yy = cy + rr * Math.sin(ang);
          if (i === 0) ctx.moveTo(xx, yy); else ctx.lineTo(xx, yy);
        }
        ctx.closePath();
        ctx.fillStyle = color.replace(')', ',' + alpha + ')').replace('rgb', 'rgba');
        ctx.fill();
        ctx.strokeStyle = color; ctx.lineWidth = 2; ctx.stroke();
      }
      drawPoly(vals1, 'rgb(33,150,243)', 0.25);
      drawPoly(vals2, 'rgb(244,67,54)', 0.25);
      ctx.fillStyle = dk ? '#e0e0e0' : '#333'; ctx.font = 'bold 14px sans-serif';
      ctx.fillText(c1.name + ' vs ' + c2.name, 20, 28);
      ctx.fillStyle = '#2196F3'; ctx.fillRect(20, H - 40, 14, 14);
      ctx.fillStyle = dk ? '#e0e0e0' : '#333'; ctx.font = '12px sans-serif';
      ctx.fillText(c1.name, 40, H - 28);
      ctx.fillStyle = '#f44336'; ctx.fillRect(200, H - 40, 14, 14);
      ctx.fillText(c2.name, 220, H - 28);
    }

    function buildUI() {
      var options = SAMPLE_COURSES.map(function (c, i) { return '<option value="' + i + '">' + c.name + '</option>'; }).join('');
      var body = '<p style="font-size:12px;color:var(--text-muted);margin-bottom:12px">두 코스를 5축 레이더 차트로 비교 분석합니다.</p>' +
        '<div class="sg28-grid" style="grid-template-columns:1fr 1fr">' +
        '<div><label style="font-size:11px;font-weight:700">코스 A</label><select class="sg28-input" id="sg28-cp-a">' + options + '</select></div>' +
        '<div><label style="font-size:11px;font-weight:700">코스 B</label><select class="sg28-input" id="sg28-cp-b"><option value="1" selected>' + SAMPLE_COURSES[1].name + '</option>' + options + '</select></div>' +
        '</div>' +
        '<button class="sg28-btn sg28-btn-primary" id="sg28-cp-draw" style="width:100%;margin:8px 0;justify-content:center">📊 비교 분석</button>' +
        '<canvas class="sg28-canvas" id="sg28-cp-canvas"></canvas>' +
        '<div id="sg28-cp-detail" style="margin-top:10px"></div>';
      makeOverlay('sg28CompareOverlay', '📊 코스 비교 분석기', 'linear-gradient(135deg,#b71c1c,#e53935)', body);
      document.getElementById('sg28-cp-b').value = '1';
      document.getElementById('sg28-cp-draw').addEventListener('click', function () {
        var a = SAMPLE_COURSES[+document.getElementById('sg28-cp-a').value];
        var b = SAMPLE_COURSES[+document.getElementById('sg28-cp-b').value];
        drawRadar(document.getElementById('sg28-cp-canvas'), a, b);
        SFX.compare_draw();
        SGV28.achievements.check('compare_first');
        var labels = ['난이도', '코스관리', '시설', '가성비', '접근성'];
        var keys = ['difficulty', 'condition', 'facility', 'value', 'access'];
        document.getElementById('sg28-cp-detail').innerHTML = '<div class="sg28-grid" style="grid-template-columns:1fr">' +
          keys.map(function (k, i) {
            var vA = a[k], vB = b[k];
            var winner = vA > vB ? a.name : vB > vA ? b.name : '동점';
            var color = vA > vB ? '#2196F3' : vB > vA ? '#f44336' : '#999';
            return '<div class="sg28-card" style="padding:8px 14px"><div class="sg28-card-title">' + labels[i] + ' <span class="sg28-badge" style="background:' + color + ';color:#fff">' + winner + '</span></div><div class="sg28-card-desc">' + a.name + ': ' + vA + ' vs ' + b.name + ': ' + vB + '</div></div>';
          }).join('') + '</div>';
      });
    }
    return { init: buildUI };
  })();

  // ======================================================================
  // 7. 스윙 자가진단 체크리스트 (24항목)
  // ======================================================================
  SGV28.swingCheck = (function () {
    var ITEMS = [
      { cat: '어드레스', items: ['그립 압력 적절 (4~5/10)', '볼 포지션 클럽별 정확', '알라인먼트 타겟 정렬', '무릎 적절한 플렉스', '체중 균등 분배 50:50', '척추각도 자연스러운 틸트'] },
      { cat: '백스윙', items: ['원피스 테이크어웨이', '코킹 타이밍 적절', '탑 포지션 클럽 평행', '왼팔 적절한 연장', '하체 안정적 고정', '어깨 90도 회전'] },
      { cat: '다운스윙', items: ['하체 리드 시작', '래깅 유지', '인사이드 경로', '임팩트 시 체중이동', '헤드 스피드 가속', '팔로우스루 완전'] },
      { cat: '피니시', items: ['밸런스 유지 3초', '벨트 버클 타겟 향함', '클럽 왼쪽 어깨 위', '체중 왼발 95%', '시선 타겟 유지', '자연스러운 마무리'] }
    ];

    function buildUI() {
      var DATA_KEY = 'swing_checks';
      var checked = LS(DATA_KEY) || {};
      var body = '<p style="font-size:12px;color:var(--text-muted);margin-bottom:12px">24개 체크포인트를 확인하며 스윙을 자가 진단하세요.</p>' +
        '<div id="sg28-sw-progress-wrap"><div class="sg28-progress"><div class="sg28-progress-bar" id="sg28-sw-pbar" style="width:0%;background:#4CAF50"></div></div><div style="font-size:11px;color:var(--text-muted)" id="sg28-sw-ptext">0/24 체크</div></div>';
      ITEMS.forEach(function (cat) {
        body += '<h4 style="font-size:13px;font-weight:700;margin:12px 0 8px">' + cat.cat + '</h4>';
        cat.items.forEach(function (item) {
          var key = cat.cat + '_' + item.substring(0, 10);
          var isChecked = checked[key] ? ' checked' : '';
          body += '<div class="sg28-check-item' + isChecked + '" data-key="' + key + '"><div class="sg28-check-box">' + (checked[key] ? '✓' : '') + '</div><div style="font-size:12px">' + item + '</div></div>';
        });
      });
      body += '<button class="sg28-btn sg28-btn-secondary" id="sg28-sw-reset" style="width:100%;margin-top:12px;justify-content:center">🔄 초기화</button>';
      makeOverlay('sg28SwingOverlay', '🏌️ 스윙 자가진단 체크리스트', 'linear-gradient(135deg,#00695c,#00897b)', body);
      function updateProgress() {
        var cc = LS(DATA_KEY) || {};
        var cnt = Object.keys(cc).filter(function (k) { return cc[k]; }).length;
        var pbar = document.getElementById('sg28-sw-pbar');
        var ptext = document.getElementById('sg28-sw-ptext');
        if (pbar) pbar.style.width = (cnt / 24 * 100) + '%';
        if (ptext) ptext.textContent = cnt + '/24 체크';
        if (cnt >= 1) SGV28.achievements.check('swing_check_first');
        if (cnt >= 24) SGV28.achievements.check('swing_check_all');
      }
      document.querySelectorAll('.sg28-check-item').forEach(function (el) {
        el.addEventListener('click', function () {
          var key = el.dataset.key;
          var cc = LS(DATA_KEY) || {};
          cc[key] = !cc[key];
          LS(DATA_KEY, cc);
          el.classList.toggle('checked');
          el.querySelector('.sg28-check-box').textContent = cc[key] ? '✓' : '';
          SFX.swing_check();
          updateProgress();
        });
      });
      document.getElementById('sg28-sw-reset').addEventListener('click', function () {
        LS(DATA_KEY, {});
        document.querySelectorAll('.sg28-check-item').forEach(function (el) {
          el.classList.remove('checked');
          el.querySelector('.sg28-check-box').textContent = '';
        });
        updateProgress();
        showToast('체크리스트 초기화 완료');
      });
      updateProgress();
    }
    return { init: buildUI };
  })();

  // ======================================================================
  // 8. 시즌 성적표 Canvas PNG
  // ======================================================================
  SGV28.seasonReport = (function () {
    function drawCanvas(canvas, data) {
      var ctx = canvas.getContext('2d');
      var W = 600, H = 400;
      canvas.width = W; canvas.height = H;
      var dk = document.documentElement.getAttribute('data-theme') === 'dark';
      ctx.fillStyle = dk ? '#1a2e1a' : '#f0fdf4'; ctx.fillRect(0, 0, W, H);
      ctx.strokeStyle = dk ? '#2e7d32' : '#a5d6a7'; ctx.lineWidth = 3;
      ctx.strokeRect(4, 4, W - 8, H - 8);
      ctx.fillStyle = dk ? '#e0e0e0' : '#1a7a3a'; ctx.font = 'bold 18px sans-serif';
      ctx.fillText('🏌️ ' + data.year + ' 시즌 성적표', 20, 35);
      ctx.fillStyle = dk ? '#aaa' : '#666'; ctx.font = '11px sans-serif';
      ctx.fillText('골퍼: ' + data.name + ' | 생성일: ' + new Date().toLocaleDateString('ko-KR'), 20, 55);
      var stats = [
        { label: '총 라운드', value: data.rounds + '회', color: '#4CAF50' },
        { label: '평균 스코어', value: data.avgScore + '타', color: '#2196F3' },
        { label: '베스트', value: data.bestScore + '타', color: '#FFD700' },
        { label: '핸디캡', value: data.handicap, color: '#FF9800' },
        { label: '페어웨이 적중', value: data.fir + '%', color: '#9C27B0' },
        { label: 'GIR', value: data.gir + '%', color: '#00BCD4' }
      ];
      var startY = 75;
      stats.forEach(function (s, i) {
        var x = 20 + (i % 3) * 195;
        var y = startY + Math.floor(i / 3) * 55;
        ctx.fillStyle = dk ? '#2a2a2a' : '#fff';
        ctx.fillRect(x, y, 180, 42);
        ctx.strokeStyle = s.color; ctx.lineWidth = 2;
        ctx.strokeRect(x, y, 180, 42);
        ctx.fillStyle = s.color; ctx.font = 'bold 18px sans-serif';
        ctx.fillText(s.value, x + 10, y + 28);
        ctx.fillStyle = dk ? '#bbb' : '#666'; ctx.font = '10px sans-serif';
        ctx.fillText(s.label, x + 100, y + 28);
      });
      var months = data.monthly;
      var chartY = 200, chartH = 120, chartX = 60, chartW = W - 100;
      ctx.fillStyle = dk ? '#e0e0e0' : '#333'; ctx.font = 'bold 12px sans-serif';
      ctx.fillText('월별 평균 스코어 추이', 20, chartY - 10);
      ctx.strokeStyle = dk ? '#444' : '#e0e0e0'; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(chartX, chartY); ctx.lineTo(chartX, chartY + chartH); ctx.lineTo(chartX + chartW, chartY + chartH); ctx.stroke();
      var maxS = 110, minS = 70;
      ctx.beginPath();
      ctx.strokeStyle = '#4CAF50'; ctx.lineWidth = 2;
      months.forEach(function (m, i) {
        var x = chartX + (i / (months.length - 1)) * chartW;
        var y = chartY + chartH - ((m.score - minS) / (maxS - minS)) * chartH;
        if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      });
      ctx.stroke();
      months.forEach(function (m, i) {
        var x = chartX + (i / (months.length - 1)) * chartW;
        var y = chartY + chartH - ((m.score - minS) / (maxS - minS)) * chartH;
        ctx.fillStyle = '#4CAF50'; ctx.beginPath(); ctx.arc(x, y, 4, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = dk ? '#e0e0e0' : '#333'; ctx.font = '9px sans-serif';
        ctx.fillText(m.score, x - 8, y - 8);
        ctx.fillText(m.month + '월', x - 8, chartY + chartH + 14);
      });
      var avg = data.avgScore;
      var grade = avg <= 80 ? 'S' : avg <= 85 ? 'A' : avg <= 90 ? 'B' : avg <= 95 ? 'C' : 'D';
      ctx.fillStyle = grade === 'S' ? '#FFD700' : grade === 'A' ? '#4CAF50' : grade === 'B' ? '#2196F3' : grade === 'C' ? '#FF9800' : '#F44336';
      ctx.font = 'bold 36px sans-serif';
      ctx.fillText(grade, W - 70, H - 30);
      ctx.fillStyle = dk ? '#aaa' : '#999'; ctx.font = '10px sans-serif';
      ctx.fillText('시즌 등급', W - 82, H - 14);
      ctx.fillText('SmartGolf v28.0', 20, H - 14);
    }

    function buildUI() {
      var body = '<p style="font-size:12px;color:var(--text-muted);margin-bottom:12px">시즌 성적을 입력하면 성적표 Canvas를 생성합니다. PNG로 다운로드 가능합니다.</p>' +
        '<div class="sg28-grid" style="grid-template-columns:1fr 1fr">' +
        '<div><label style="font-size:11px;font-weight:700">이름</label><input class="sg28-input" id="sg28-sr-name" placeholder="골퍼명"></div>' +
        '<div><label style="font-size:11px;font-weight:700">연도</label><input class="sg28-input" id="sg28-sr-year" type="number" value="2026"></div>' +
        '<div><label style="font-size:11px;font-weight:700">총 라운드 수</label><input class="sg28-input" id="sg28-sr-rounds" type="number" value="24"></div>' +
        '<div><label style="font-size:11px;font-weight:700">평균 스코어</label><input class="sg28-input" id="sg28-sr-avg" type="number" value="88"></div>' +
        '<div><label style="font-size:11px;font-weight:700">베스트 스코어</label><input class="sg28-input" id="sg28-sr-best" type="number" value="82"></div>' +
        '<div><label style="font-size:11px;font-weight:700">핸디캡</label><input class="sg28-input" id="sg28-sr-hdc" type="number" value="16"></div>' +
        '<div><label style="font-size:11px;font-weight:700">FIR (%)</label><input type="range" class="sg28-slider" id="sg28-sr-fir" min="0" max="100" value="55"><span id="sg28-sr-fir-v" style="font-size:11px">55%</span></div>' +
        '<div><label style="font-size:11px;font-weight:700">GIR (%)</label><input type="range" class="sg28-slider" id="sg28-sr-gir" min="0" max="100" value="40"><span id="sg28-sr-gir-v" style="font-size:11px">40%</span></div>' +
        '</div>' +
        '<button class="sg28-btn sg28-btn-primary" id="sg28-sr-gen" style="width:100%;margin:10px 0;justify-content:center">📋 성적표 생성</button>' +
        '<canvas class="sg28-canvas" id="sg28-sr-canvas"></canvas>' +
        '<div style="display:flex;gap:8px;margin-top:8px">' +
        '<button class="sg28-btn sg28-btn-secondary" id="sg28-sr-dl" style="flex:1;justify-content:center">📥 PNG 다운로드</button>' +
        '<button class="sg28-btn sg28-btn-secondary" id="sg28-sr-cp" style="flex:1;justify-content:center">📋 클립보드 복사</button>' +
        '</div>';
      makeOverlay('sg28SeasonOverlay', '📋 시즌 성적표', 'linear-gradient(135deg,#bf360c,#e64a19)', body);
      ['fir', 'gir'].forEach(function (k) {
        var sl = document.getElementById('sg28-sr-' + k);
        if (sl) sl.addEventListener('input', function () { document.getElementById('sg28-sr-' + k + '-v').textContent = sl.value + '%'; });
      });
      document.getElementById('sg28-sr-gen').addEventListener('click', function () {
        var data = {
          name: document.getElementById('sg28-sr-name').value || '골퍼',
          year: document.getElementById('sg28-sr-year').value || '2026',
          rounds: +document.getElementById('sg28-sr-rounds').value || 24,
          avgScore: +document.getElementById('sg28-sr-avg').value || 88,
          bestScore: +document.getElementById('sg28-sr-best').value || 82,
          handicap: +document.getElementById('sg28-sr-hdc').value || 16,
          fir: +document.getElementById('sg28-sr-fir').value,
          gir: +document.getElementById('sg28-sr-gir').value,
          monthly: []
        };
        for (var m = 1; m <= 12; m++) {
          var variation = Math.round((Math.random() - 0.5) * 8);
          data.monthly.push({ month: m, score: Math.max(72, Math.min(110, data.avgScore + variation)) });
        }
        drawCanvas(document.getElementById('sg28-sr-canvas'), data);
        SFX.season_gen();
        SGV28.achievements.check('season_report');
      });
      document.getElementById('sg28-sr-dl').addEventListener('click', function () {
        var c = document.getElementById('sg28-sr-canvas');
        if (!c.width) { showToast('먼저 성적표를 생성하세요'); return; }
        var a = document.createElement('a');
        a.download = 'smartgolf_season_report.png';
        a.href = c.toDataURL('image/png');
        a.click();
        showToast('PNG 다운로드 완료');
      });
      document.getElementById('sg28-sr-cp').addEventListener('click', function () {
        var c = document.getElementById('sg28-sr-canvas');
        if (!c.width) { showToast('먼저 성적표를 생성하세요'); return; }
        c.toBlob(function (blob) {
          if (navigator.clipboard && navigator.clipboard.write) {
            navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]).then(function () { showToast('클립보드에 복사 완료'); });
          } else { showToast('클립보드 미지원 브라우저'); }
        });
      });
    }
    return { init: buildUI };
  })();

  // ======================================================================
  // 9. Golf IQ v12 (15문항)
  // ======================================================================
  SGV28.quizV12 = (function () {
    var questions = [
      { q: '코스 레이팅(Course Rating)이란?', a: ['스크래치 골퍼 예상 스코어', '코스 총 거리', '그린 속도', '벙커 수'], c: 0 },
      { q: '슬로프 레이팅이 155인 코스는?', a: ['매우 어려움', '보통', '쉬움', '존재하지 않음'], c: 0 },
      { q: '맞바람 10m/s에서 7번 아이언 비거리 보정은?', a: ['약 10~15야드 감소', '변화 없음', '약 5야드 증가', '약 20~30야드 감소'], c: 0 },
      { q: '기온 10°C 하락 시 비거리 변화는?', a: ['약 2~5야드 감소', '약 10~15야드 증가', '변화 없음', '약 20야드 감소'], c: 0 },
      { q: 'FIR(Fairway In Regulation) 60%는 어떤 수준?', a: ['투어 평균 수준', '아마추어 하위', '매우 나쁨', '초보자 수준'], c: 0 },
      { q: '해발 1000m에서 비거리 변화는?', a: ['약 2~3% 증가', '약 10% 감소', '변화 없음', '약 5% 감소'], c: 0 },
      { q: '스테이블포드 방식에서 보기의 점수는?', a: ['1점', '0점', '2점', '-1점'], c: 0 },
      { q: '나쏘(Nassau) 베팅의 3가지 구성은?', a: ['프론트/백/전체', '1R/2R/3R', '드라이버/아이언/퍼팅', '정규/연장/매치'], c: 0 },
      { q: '라운드 전 워밍업 권장 시간은?', a: ['20~30분', '5분', '1시간', '워밍업 불필요'], c: 0 },
      { q: '19번 홀이란?', a: ['라운드 후 식사/음료 시간', '연장전 홀', '연습 그린', '드라이빙 레인지'], c: 0 },
      { q: '습도가 높을 때 볼 비행 특성은?', a: ['공기밀도 낮아 약간 더 남', '비거리 크게 감소', '스핀 2배 증가', '영향 없음'], c: 0 },
      { q: '코스 매니지먼트의 핵심 원칙은?', a: ['리스크 대비 보상 계산', '항상 드라이버 사용', '핀 직접 공략', '최대 거리 추구'], c: 0 },
      { q: '스크램블링(Scrambling) 통계란?', a: ['GIR 실패 시 파 세이브 비율', '벙커 탈출 성공률', '퍼팅 성공률', '드라이버 OB 비율'], c: 0 },
      { q: '겨울 라운드 시 볼 선택은?', a: ['소프트볼 (저압축)', '하드볼 (고압축)', '여름과 동일', '중고볼'], c: 0 },
      { q: '코스 난이도를 결정짓는 주요 요소는?', a: ['슬로프 레이팅 + 코스 레이팅', '홀 수', '잔디 종류', '클럽하우스 시설'], c: 0 }
    ];

    function buildUI() {
      var body = '<p style="font-size:12px;color:var(--text-muted);margin-bottom:12px">Golf IQ v12 - 코스 전략, 날씨 보정, 매니지먼트 15문항</p>' +
        '<div id="sg28-q-area"></div>' +
        '<div id="sg28-q-result" style="display:none;text-align:center;padding:20px"></div>';
      makeOverlay('sg28QuizOverlay', '🧠 Golf IQ v12', 'linear-gradient(135deg,#f57f17,#fbc02d)', body);
    }

    function startQuiz() {
      var shuffled = questions.slice();
      for (var i = shuffled.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var tmp = shuffled[i]; shuffled[i] = shuffled[j]; shuffled[j] = tmp;
      }
      shuffled.forEach(function (q) {
        var correct = q.a[q.c];
        for (var i = q.a.length - 1; i > 0; i--) {
          var j = Math.floor(Math.random() * (i + 1));
          var tmp = q.a[i]; q.a[i] = q.a[j]; q.a[j] = tmp;
        }
        q.c = q.a.indexOf(correct);
      });
      var idx = 0, score = 0;
      function render() {
        if (idx >= shuffled.length) {
          var pct = Math.round(score / shuffled.length * 100);
          document.getElementById('sg28-q-area').style.display = 'none';
          document.getElementById('sg28-q-result').style.display = '';
          document.getElementById('sg28-q-result').innerHTML = '<h3 style="font-size:20px;margin-bottom:10px">' + score + '/' + shuffled.length + ' 정답 (' + pct + '%)</h3><p style="font-size:14px">' + (pct >= 90 ? '🏆 골프 전략 마스터!' : pct >= 70 ? '👏 훌륭한 코스 매니저!' : pct >= 50 ? '📚 전략 공부가 필요해요' : '💪 기초부터 시작합시다') + '</p>';
          SGV28.achievements.check('quiz_v12_try');
          if (score === shuffled.length) SGV28.achievements.check('quiz_v12_perfect');
          return;
        }
        var qq = shuffled[idx];
        document.getElementById('sg28-q-area').style.display = '';
        document.getElementById('sg28-q-result').style.display = 'none';
        document.getElementById('sg28-q-area').innerHTML = '<div style="font-size:11px;color:var(--text-muted);margin-bottom:6px">문제 ' + (idx + 1) + '/' + shuffled.length + '</div>' +
          '<div class="sg28-progress"><div class="sg28-progress-bar" style="width:' + (idx / shuffled.length * 100) + '%;background:var(--primary)"></div></div>' +
          '<p style="font-size:14px;font-weight:700;margin:12px 0">' + qq.q + '</p>' +
          qq.a.map(function (a, i) { return '<button class="sg28-btn sg28-btn-secondary sg28-q12-opt" data-i="' + i + '" style="width:100%;margin:4px 0;justify-content:flex-start">' + a + '</button>'; }).join('');
        document.querySelectorAll('.sg28-q12-opt').forEach(function (btn) {
          btn.addEventListener('click', function () {
            var chosen = +btn.dataset.i;
            if (chosen === qq.c) { score++; SFX.quiz_correct12(); btn.style.background = '#e8f5e9'; btn.style.borderColor = '#4CAF50'; }
            else { btn.style.background = '#ffebee'; btn.style.borderColor = '#f44336'; document.querySelector('.sg28-q12-opt[data-i="' + qq.c + '"]').style.background = '#e8f5e9'; }
            idx++;
            setTimeout(render, 800);
          });
        });
      }
      render();
    }
    return { init: buildUI, start: startQuiz };
  })();

  // ======================================================================
  // 10. 업적 시스템 (+12, 152→164)
  // ======================================================================
  SGV28.achievements = (function () {
    var DATA_KEY = 'achievements_v28';
    var DEFS = [
      { id: 'sketch_viewer', name: '코스 탐험가', desc: '코스 스케치 홀 열람', icon: '🗺️' },
      { id: 'timeline_first', name: '첫 타임라인', desc: '라운드 타임라인 1회 작성', icon: '📅' },
      { id: 'timeline_5', name: '타임라인 달인', desc: '타임라인 5회 작성', icon: '⏰' },
      { id: 'weather_first', name: '날씨 분석가', desc: '날씨 전략 분석 1회', icon: '🌤️' },
      { id: 'weather_expert', name: '기상 전문가', desc: '날씨 분석 5회 사용', icon: '🌦️' },
      { id: 'social_first', name: '첫 소셜 피드', desc: '소셜 피드 1건 등록', icon: '📱' },
      { id: 'social_10', name: '소셜 마스터', desc: '소셜 피드 10건 달성', icon: '🌟' },
      { id: 'compare_first', name: '코스 비교 전문가', desc: '코스 비교 분석 1회', icon: '📊' },
      { id: 'swing_check_first', name: '스윙 점검 시작', desc: '체크리스트 1항목 체크', icon: '🏌️' },
      { id: 'swing_check_all', name: '완벽한 스윙', desc: '24항목 전체 체크', icon: '🎯' },
      { id: 'season_report', name: '시즌 리포터', desc: '시즌 성적표 1회 생성', icon: '📋' },
      { id: 'tee_assist_first', name: '티타임 전략가', desc: '티타임 어시스턴트 사용', icon: '⏰' },
      { id: 'quiz_v12_try', name: 'Golf IQ v12 도전', desc: 'Golf IQ v12 퀴즈 완료', icon: '🧠' },
      { id: 'quiz_v12_perfect', name: 'Golf IQ v12 만점', desc: '15문항 전부 정답', icon: '🏅' },
      { id: 'v28_explorer', name: 'v28 탐험가', desc: 'v28 기능 5개 이상 사용', icon: '🚀' }
    ];
    function getUnlocked() { return LS(DATA_KEY) || []; }
    function check(id) {
      var arr = getUnlocked();
      if (arr.indexOf(id) >= 0) return;
      arr.push(id);
      LS(DATA_KEY, arr);
      SFX.achieve_v28();
      var def = DEFS.find(function (d) { return d.id === id; });
      if (def) showToast(def.icon + ' 업적 달성: ' + def.name);
      if (arr.length >= 5) check('v28_explorer');
    }
    return { check: check, DEFS: DEFS, getUnlocked: getUnlocked };
  })();

  // ========== BOTTOM NAV BAR ==========
  function createBottomBar() {
    var existing = document.getElementById('sg27BottomBar');
    if (existing) existing.remove();
    var bar = document.createElement('div');
    bar.className = 'sg28-bottom-bar';
    bar.id = 'sg28BottomBar';
    var btns = [
      { icon: '🗺️', label: '코스스케치', action: function () { openPanel('sg28SketchOverlay', SFX.sketch_open); } },
      { icon: '📅', label: '타임라인', action: function () { openPanel('sg28TimelineOverlay', SFX.timeline_open); } },
      { icon: '🌤️', label: '날씨전략', action: function () { openPanel('sg28WeatherOverlay', SFX.weather_open); } },
      { icon: '⏰', label: '티타임AI', action: function () { openPanel('sg28TeeOverlay', SFX.tee_open); SGV28.achievements.check('tee_assist_first'); } },
      { icon: '📱', label: '소셜피드', action: function () { openPanel('sg28SocialOverlay', SFX.social_open); } },
      { icon: '📊', label: '코스비교', action: function () { openPanel('sg28CompareOverlay', SFX.compare_open); } },
      { icon: '🏌️', label: '스윙진단', action: function () { openPanel('sg28SwingOverlay', SFX.swing_open); } },
      { icon: '📋', label: '성적표', action: function () { openPanel('sg28SeasonOverlay', SFX.season_open); } },
      { icon: '🧠', label: 'IQ v12', action: function () { openPanel('sg28QuizOverlay', SFX.quiz_v12); SGV28.quizV12.start(); } }
    ];
    btns.forEach(function (b) {
      var btn = document.createElement('div');
      btn.className = 'sg28-bbtn';
      btn.innerHTML = '<span class="sg28-bbtn-icon">' + b.icon + '</span><span class="sg28-bbtn-label">' + b.label + '</span>';
      btn.addEventListener('click', b.action);
      bar.appendChild(btn);
    });
    document.body.appendChild(bar);
  }

  // ========== KEYBOARD SHORTCUTS ==========
  document.addEventListener('keydown', function (e) {
    if (['INPUT', 'TEXTAREA', 'SELECT'].indexOf(e.target.tagName) >= 0) return;
    if (!e.shiftKey) return;
    var map = {
      'K': function () { openPanel('sg28SketchOverlay', SFX.sketch_open); },
      'L': function () { openPanel('sg28TimelineOverlay', SFX.timeline_open); },
      'W': function () { openPanel('sg28WeatherOverlay', SFX.weather_open); },
      'E': function () { openPanel('sg28TeeOverlay', SFX.tee_open); },
      'O': function () { openPanel('sg28SocialOverlay', SFX.social_open); },
      'D': function () { openPanel('sg28CompareOverlay', SFX.compare_open); },
      'X': function () { openPanel('sg28SwingOverlay', SFX.swing_open); },
      'N': function () { openPanel('sg28SeasonOverlay', SFX.season_open); }
    };
    if (map[e.key]) { e.preventDefault(); map[e.key](); }
  });

  // ========== ESC CLOSE ==========
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      document.querySelectorAll('.sg28-overlay.active').forEach(function (o) { o.classList.remove('active'); });
    }
  });

  // ========== INIT ==========
  function init() {
    SGV28.courseSketch.init();
    SGV28.timeline.init();
    SGV28.weatherStrategy.init();
    SGV28.teeAssistant.init();
    SGV28.social.init();
    SGV28.courseCompare.init();
    SGV28.swingCheck.init();
    SGV28.seasonReport.init();
    SGV28.quizV12.init();
    createBottomBar();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
