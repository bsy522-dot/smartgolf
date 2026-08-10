(function () {
  'use strict';

  var LS = function (k, v) {
    var key = 'sg41_' + k;
    if (v === undefined) { try { return JSON.parse(localStorage.getItem(key)); } catch (e) { return null; } }
    localStorage.setItem(key, JSON.stringify(v));
  };

  // ── SFX Engine (16 new sounds) ──
  var audioCtx;
  function getCtx() { if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)(); return audioCtx; }
  var SFX_MAP = {
    dispersion: { f: 520, d: 0.18, t: 'sine', v: 0.3 },
    greenRead: { f: 440, d: 0.22, t: 'triangle', v: 0.25 },
    gapAnalysis: { f: 620, d: 0.15, t: 'square', v: 0.2 },
    mentalScore: { f: 380, d: 0.25, t: 'sine', v: 0.28 },
    puttControl: { f: 480, d: 0.2, t: 'triangle', v: 0.25 },
    swingSeq: { f: 560, d: 0.18, t: 'sine', v: 0.3 },
    courseDecision: { f: 420, d: 0.22, t: 'triangle', v: 0.25 },
    fitnessIdx: { f: 500, d: 0.2, t: 'sine', v: 0.28 },
    achieve41: { f: 880, d: 0.3, t: 'sine', v: 0.25 },
    quiz41: { f: 660, d: 0.15, t: 'triangle', v: 0.22 },
    correct41: { f: 784, d: 0.25, t: 'sine', v: 0.3 },
    wrong41: { f: 220, d: 0.3, t: 'sawtooth', v: 0.15 },
    navClick41: { f: 1200, d: 0.08, t: 'sine', v: 0.15 },
    panelOpen41: { f: 700, d: 0.12, t: 'triangle', v: 0.2 },
    panelClose41: { f: 350, d: 0.1, t: 'sine', v: 0.18 },
    tabSwitch41: { f: 900, d: 0.06, t: 'sine', v: 0.12 }
  };
  function playSFX(name) {
    try {
      var s = SFX_MAP[name]; if (!s) return;
      var ctx = getCtx(), o = ctx.createOscillator(), g = ctx.createGain();
      o.type = s.t; o.frequency.value = s.f;
      g.gain.setValueAtTime(s.v, ctx.currentTime);
      g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + s.d);
      o.connect(g); g.connect(ctx.destination);
      o.start(); o.stop(ctx.currentTime + s.d);
    } catch (e) {}
  }

  // ── CSS ──
  var style = document.createElement('style');
  style.textContent = [
    '.sg41-overlay{position:fixed;top:0;left:0;right:0;bottom:0;z-index:10020;background:rgba(0,0,0,0.85);overflow-y:auto;display:none;padding:12px}',
    '.sg41-overlay.active{display:block}',
    '.sg41-panel{max-width:700px;margin:20px auto;background:var(--card-bg,#fff);border-radius:16px;padding:20px;box-shadow:0 8px 32px rgba(0,0,0,0.3)}',
    '.sg41-title{font-size:1.3em;font-weight:700;color:var(--primary,#1a7a3a);margin-bottom:12px;text-align:center}',
    '.sg41-subtitle{font-size:0.85em;color:var(--text-muted,#666);text-align:center;margin-bottom:16px}',
    '.sg41-canvas-wrap{text-align:center;margin:12px 0;overflow-x:auto}',
    '.sg41-canvas-wrap canvas{border-radius:8px;max-width:100%}',
    '.sg41-btn{display:inline-block;padding:8px 16px;border-radius:8px;border:none;background:var(--primary,#1a7a3a);color:#fff;cursor:pointer;font-size:0.85em;margin:4px}',
    '.sg41-btn:hover{opacity:0.85}',
    '.sg41-close{position:absolute;top:12px;right:16px;font-size:1.5em;color:#fff;cursor:pointer;z-index:10021;background:rgba(0,0,0,0.4);border-radius:50%;width:36px;height:36px;display:flex;align-items:center;justify-content:center}',
    '.sg41-info{font-size:0.8em;color:var(--text-muted,#666);margin-top:8px;text-align:center;line-height:1.5}',
    '.sg41-grade-s{color:#e91e63;font-weight:700}',
    '.sg41-grade-a{color:#ff5722;font-weight:700}',
    '.sg41-grade-b{color:#ff9800;font-weight:700}',
    '.sg41-grade-c{color:#2196f3;font-weight:700}',
    '.sg41-grade-d{color:#9e9e9e;font-weight:700}',
    '.sg41-quiz-opt{display:block;width:100%;padding:12px;margin:6px 0;border:2px solid var(--border,#e0e0e0);border-radius:10px;background:var(--card-bg,#fff);cursor:pointer;text-align:left;font-size:0.9em;transition:all 0.2s}',
    '.sg41-quiz-opt:hover{border-color:var(--primary,#1a7a3a);background:var(--primary-light,#e8f5e9)}',
    '.sg41-quiz-opt.correct{border-color:#4caf50;background:#e8f5e9}',
    '.sg41-quiz-opt.wrong{border-color:#f44336;background:#fce4ec}',
    '.sg41-tabs{display:flex;gap:4px;margin-bottom:12px;flex-wrap:wrap;justify-content:center}',
    '.sg41-tab{padding:6px 12px;border-radius:6px;border:1px solid var(--border,#e0e0e0);background:transparent;cursor:pointer;font-size:0.78em;transition:all 0.2s}',
    '.sg41-tab.active{background:var(--primary,#1a7a3a);color:#fff;border-color:var(--primary,#1a7a3a)}',
    '.sg41-toast{position:fixed;bottom:80px;left:50%;transform:translateX(-50%);background:var(--primary,#1a7a3a);color:#fff;padding:12px 24px;border-radius:12px;z-index:10030;font-size:0.85em;box-shadow:0 4px 16px rgba(0,0,0,0.3);animation:sg41-toast-in 0.3s ease}',
    '@keyframes sg41-toast-in{from{opacity:0;transform:translateX(-50%) translateY(20px)}to{opacity:1;transform:translateX(-50%) translateY(0)}}'
  ].join('\n');
  document.head.appendChild(style);

  // ── Utilities ──
  function createOverlay(id) {
    var el = document.getElementById(id);
    if (el) { el.classList.add('active'); return el; }
    el = document.createElement('div');
    el.id = id; el.className = 'sg41-overlay active';
    var closeBtn = document.createElement('div');
    closeBtn.className = 'sg41-close'; closeBtn.textContent = '×';
    closeBtn.onclick = function () { el.classList.remove('active'); playSFX('panelClose41'); };
    el.appendChild(closeBtn);
    el.addEventListener('click', function (e) { if (e.target === el) { el.classList.remove('active'); playSFX('panelClose41'); } });
    document.body.appendChild(el);
    return el;
  }
  function gradeClass(s, m) { var p = s / m * 100; return p >= 90 ? 'sg41-grade-s' : p >= 75 ? 'sg41-grade-a' : p >= 60 ? 'sg41-grade-b' : p >= 40 ? 'sg41-grade-c' : 'sg41-grade-d'; }
  function gradeLetter(s, m) { var p = s / m * 100; return p >= 90 ? 'S' : p >= 75 ? 'A' : p >= 60 ? 'B' : p >= 40 ? 'C' : 'D'; }

  // ── Achievements (15 new: 347→362) ──
  var ACHIEVEMENTS = [
    { id: 'sg41_dispersion_master', name: '샷분산마스터', desc: '샷분산패턴분석기 첫 실행', icon: '🎯' },
    { id: 'sg41_green_reader', name: '그린리더', desc: '그린리딩슬로프맵 분석 완료', icon: '🟢' },
    { id: 'sg41_gap_analyst', name: '거리갭분석가', desc: '클럽간거리갭분석기 첫 사용', icon: '📏' },
    { id: 'sg41_mental_coach', name: '멘탈코치', desc: '라운드멘탈스코어카드 기록', icon: '🧠' },
    { id: 'sg41_putt_control', name: '퍼팅컨트롤러', desc: '퍼팅거리컨트롤맵 완료', icon: '⛳' },
    { id: 'sg41_swing_seq', name: '스윙시퀀서', desc: '스윙시퀀스타이밍 분석', icon: '⏱️' },
    { id: 'sg41_course_mgr', name: '코스매니저', desc: '코스매니지먼트 의사결정트리 완료', icon: '🏗️' },
    { id: 'sg41_fitness_guru', name: '피트니스구루', desc: '종합골프피트니스인덱스 확인', icon: '💪' },
    { id: 'sg41_iq_v25', name: 'Golf IQ v25', desc: 'Golf IQ v25 퀵즈 도전', icon: '🧪' },
    { id: 'sg41_iq_perfect', name: 'IQ만점자', desc: 'Golf IQ v25 15문 만점', icon: '🏆' },
    { id: 'sg41_all_features', name: 'v41마스터', desc: 'v41 8개 기능 모두 실행', icon: '⭐' },
    { id: 'sg41_triple_s', name: '트리플S', desc: '3개 기능에서 S등급 횟득', icon: '💎' },
    { id: 'sg41_analyzer', name: '데이터분석가', desc: '분석 기능 5개 이상 사용', icon: '📊' },
    { id: 'sg41_strategist', name: '전략가', desc: '의사결정트리 3회 이상 실행', icon: '♟️' },
    { id: 'sg41_well_rounded', name: '올라운더', desc: '모든 카테고리 S또는 A등급', icon: '🌟' }
  ];
  function unlockAchievement(achId) {
    if (LS('ach_' + achId)) return;
    LS('ach_' + achId, true);
    var ach = ACHIEVEMENTS.find(function (a) { return a.id === achId; });
    if (!ach) return;
    playSFX('achieve41');
    var toast = document.createElement('div');
    toast.className = 'sg41-toast';
    toast.innerHTML = ach.icon + ' <b>' + ach.name + '</b> ' + ach.desc;
    document.body.appendChild(toast);
    setTimeout(function () { toast.remove(); }, 3000);
  }

  // ═════════════════════════════════════════
  // FEATURE 1: 샷분산패턴분석기 Canvas 620x400
  // ═════════════════════════════════════════
  function openShotDispersion() {
    playSFX('dispersion');
    unlockAchievement('sg41_dispersion_master');
    var ov = createOverlay('sg41-dispersion');
    if (ov.querySelector('.sg41-panel')) { ov.classList.add('active'); return; }
    var panel = document.createElement('div'); panel.className = 'sg41-panel';
    panel.innerHTML = '<div class="sg41-title">🎯 샷분산패턴 분석기</div><div class="sg41-subtitle">클럽별 샷 분산 패턴을 2D 산점도로 시각화합니다</div><div class="sg41-tabs" id="sg41-disp-tabs"></div><div class="sg41-canvas-wrap"><canvas id="sg41-disp-cv" width="620" height="400"></canvas></div><div class="sg41-info" id="sg41-disp-info"></div>';
    ov.appendChild(panel);
    var clubs = ['Driver','3W','5W','4I','5I','6I','7I','8I','9I','PW','AW','SW','Putter'];
    var tabsEl = document.getElementById('sg41-disp-tabs');
    var currentClub = 0;
    clubs.forEach(function (c, i) {
      var btn = document.createElement('button'); btn.className = 'sg41-tab' + (i === 0 ? ' active' : '');
      btn.textContent = c; btn.onclick = function () {
        currentClub = i; tabsEl.querySelectorAll('.sg41-tab').forEach(function (b) { b.classList.remove('active'); }); btn.classList.add('active'); drawDispersion(); playSFX('tabSwitch41');
      };
      tabsEl.appendChild(btn);
    });
    function drawDispersion() {
      var cv = document.getElementById('sg41-disp-cv'), ctx = cv.getContext('2d');
      ctx.clearRect(0, 0, 620, 400);
      ctx.fillStyle = '#1a3d1a'; ctx.fillRect(0, 0, 620, 400);
      ctx.strokeStyle = 'rgba(255,255,255,0.15)';
      for (var gx = 0; gx < 620; gx += 40) { ctx.beginPath(); ctx.moveTo(gx, 0); ctx.lineTo(gx, 400); ctx.stroke(); }
      for (var gy = 0; gy < 400; gy += 40) { ctx.beginPath(); ctx.moveTo(0, gy); ctx.lineTo(620, gy); ctx.stroke(); }
      ctx.strokeStyle = 'rgba(255,255,255,0.4)'; ctx.setLineDash([4, 4]);
      ctx.beginPath(); ctx.moveTo(310, 0); ctx.lineTo(310, 400); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(0, 200); ctx.lineTo(620, 200); ctx.stroke();
      ctx.setLineDash([]);
      var spread = [45, 35, 30, 25, 22, 20, 18, 16, 14, 12, 10, 8, 3];
      var dist = [280, 250, 230, 210, 200, 190, 180, 170, 155, 140, 125, 100, 15];
      var sp = spread[currentClub], d = dist[currentClub];
      var seed = currentClub * 7 + 13;
      var points = [];
      for (var i = 0; i < 30; i++) {
        seed = (seed * 16807 + 1) % 2147483647;
        var nx = (seed / 2147483647 - 0.5) * 2;
        seed = (seed * 16807 + 1) % 2147483647;
        var ny = (seed / 2147483647 - 0.5) * 2;
        var px = 310 + nx * sp * 3;
        var py = 200 - ny * sp * 2 - d * 0.5;
        points.push({ x: px, y: py });
      }
      [60, 40, 20].forEach(function (r, ri) {
        ctx.beginPath(); ctx.ellipse(310, 200 - d * 0.5, sp * 3 * (1 - ri * 0.25), sp * 2 * (1 - ri * 0.25), 0, 0, Math.PI * 2);
        ctx.strokeStyle = ['rgba(76,175,80,0.3)', 'rgba(255,193,7,0.4)', 'rgba(244,67,54,0.5)'][ri]; ctx.lineWidth = 1.5; ctx.stroke();
      });
      points.forEach(function (p) {
        ctx.beginPath(); ctx.arc(p.x, p.y, 5, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255,255,255,0.85)'; ctx.fill();
        ctx.strokeStyle = '#4caf50'; ctx.lineWidth = 1.5; ctx.stroke();
      });
      var avgX = points.reduce(function (s, p) { return s + p.x; }, 0) / points.length;
      var avgY = points.reduce(function (s, p) { return s + p.y; }, 0) / points.length;
      ctx.beginPath(); ctx.arc(avgX, avgY, 8, 0, Math.PI * 2);
      ctx.fillStyle = '#ff5722'; ctx.fill();
      ctx.strokeStyle = '#fff'; ctx.lineWidth = 2; ctx.stroke();
      ctx.fillStyle = '#fff'; ctx.font = 'bold 14px sans-serif'; ctx.textAlign = 'center';
      ctx.fillText(clubs[currentClub] + ' 샷분산 패턴', 310, 24);
      ctx.font = '11px sans-serif';
      ctx.fillText('← ' + sp + 'yd →', 310, 385);
      ctx.fillText('평균거리: ' + d + 'yd', 310, 370);
      var consistency = Math.max(0, 100 - sp * 2);
      var info = document.getElementById('sg41-disp-info');
      info.innerHTML = '<b>' + clubs[currentClub] + '</b> | 평균거리: ' + d + 'yd | 좌우분산: ±' + sp + 'yd | 일관성: <span class="' + gradeClass(consistency, 100) + '">' + consistency + '% (' + gradeLetter(consistency, 100) + ')</span>';
    }
    drawDispersion();
  }

  // ═════════════════════════════════════════
  // FEATURE 2: 그린리딩슬로프맵 Canvas 640x400
  // ═════════════════════════════════════════
  function openGreenReading() {
    playSFX('greenRead');
    unlockAchievement('sg41_green_reader');
    var ov = createOverlay('sg41-greenread');
    if (ov.querySelector('.sg41-panel')) { ov.classList.add('active'); return; }
    var panel = document.createElement('div'); panel.className = 'sg41-panel';
    panel.innerHTML = '<div class="sg41-title">🟢 그린리딩 슬로프맵</div><div class="sg41-subtitle">그린 경사도를 등고선과 방향 화살표로 시각화합니다</div><div class="sg41-tabs" id="sg41-green-tabs"></div><div class="sg41-canvas-wrap"><canvas id="sg41-green-cv" width="640" height="400"></canvas></div><div class="sg41-info" id="sg41-green-info"></div>';
    ov.appendChild(panel);
    var greens = ['평탄형', '좌경사', '우경사', '언듈레이션', '두단그린', '배꼬린그린'];
    var tabsEl = document.getElementById('sg41-green-tabs');
    var currentGreen = 0;
    greens.forEach(function (g, i) {
      var btn = document.createElement('button'); btn.className = 'sg41-tab' + (i === 0 ? ' active' : '');
      btn.textContent = g; btn.onclick = function () {
        currentGreen = i; tabsEl.querySelectorAll('.sg41-tab').forEach(function (b) { b.classList.remove('active'); }); btn.classList.add('active'); drawGreen(); playSFX('tabSwitch41');
      };
      tabsEl.appendChild(btn);
    });
    function drawGreen() {
      var cv = document.getElementById('sg41-green-cv'), ctx = cv.getContext('2d');
      ctx.clearRect(0, 0, 640, 400);
      var grad = ctx.createRadialGradient(320, 200, 20, 320, 200, 250);
      grad.addColorStop(0, '#2e7d32'); grad.addColorStop(1, '#1b5e20');
      ctx.fillStyle = grad; ctx.fillRect(0, 0, 640, 400);
      ctx.beginPath(); ctx.ellipse(320, 200, 260, 170, 0, 0, Math.PI * 2);
      ctx.fillStyle = '#388e3c'; ctx.fill(); ctx.strokeStyle = '#fff'; ctx.lineWidth = 2; ctx.stroke();
      var slopeConfigs = [
        { angles: [0], strengths: [0.3] },
        { angles: [-0.4], strengths: [0.7] },
        { angles: [0.4], strengths: [0.7] },
        { angles: [0, 0.3, -0.3], strengths: [0.5, 0.8, 0.4] },
        { angles: [0.6, -0.5], strengths: [0.9, 0.6] },
        { angles: [-0.2], strengths: [0.5] }
      ];
      var cfg = slopeConfigs[currentGreen];
      for (var gx = 50; gx < 600; gx += 45) {
        for (var gy = 50; gy < 360; gy += 45) {
          var dx = gx - 320, dy = gy - 200;
          if (dx * dx / (260 * 260) + dy * dy / (170 * 170) > 0.85) continue;
          var angle = cfg.angles[0] + (dx / 260) * 0.3;
          var strength = cfg.strengths[0] * (1 + Math.abs(dy / 200) * 0.5);
          var arrowLen = Math.min(18, strength * 25);
          ctx.save();
          ctx.translate(gx, gy);
          ctx.rotate(angle + Math.PI / 2);
          ctx.beginPath(); ctx.moveTo(0, -arrowLen); ctx.lineTo(0, arrowLen);
          ctx.strokeStyle = 'rgba(255,255,255,0.6)'; ctx.lineWidth = 1.5; ctx.stroke();
          ctx.beginPath(); ctx.moveTo(0, arrowLen); ctx.lineTo(-4, arrowLen - 6); ctx.lineTo(4, arrowLen - 6); ctx.closePath();
          ctx.fillStyle = 'rgba(255,255,255,0.7)'; ctx.fill();
          ctx.restore();
        }
      }
      var contourColors = ['rgba(255,235,59,0.3)', 'rgba(255,193,7,0.35)', 'rgba(255,152,0,0.4)', 'rgba(244,67,54,0.3)'];
      for (var ci = 0; ci < 4; ci++) {
        ctx.beginPath(); ctx.ellipse(320 + (ci - 2) * 25 * cfg.angles[0], 200 + ci * 15, 230 - ci * 40, 150 - ci * 30, cfg.angles[0] * 0.3, 0, Math.PI * 2);
        ctx.strokeStyle = contourColors[ci]; ctx.lineWidth = 2; ctx.setLineDash([6, 4]); ctx.stroke(); ctx.setLineDash([]);
      }
      ctx.beginPath(); ctx.arc(320, 140, 6, 0, Math.PI * 2);
      ctx.fillStyle = '#fff'; ctx.fill(); ctx.strokeStyle = '#000'; ctx.lineWidth = 1.5; ctx.stroke();
      ctx.fillStyle = '#fff'; ctx.font = 'bold 14px sans-serif'; ctx.textAlign = 'center';
      ctx.fillText('그린리딩: ' + greens[currentGreen], 320, 24);
      ctx.font = '11px sans-serif';
      ctx.fillText('← 등고선 | → 경사방향', 320, 388);
      var slopePercent = Math.round(cfg.strengths[0] * 100);
      document.getElementById('sg41-green-info').innerHTML = '<b>' + greens[currentGreen] + '</b> | 경사도: ' + (cfg.strengths[0] * 4).toFixed(1) + '% | 볼스피드보정: ' + (cfg.strengths[0] > 0.5 ? '+15~25%' : '+5~10%') + ' | 난이도: <span class="' + gradeClass(100 - slopePercent, 100) + '">' + gradeLetter(100 - slopePercent, 100) + '</span>';
    }
    drawGreen();
  }

  // ═════════════════════════════════════════
  // FEATURE 3: 클럽간거리갭분석기 Canvas 620x400
  // ═════════════════════════════════════════
  function openDistanceGap() {
    playSFX('gapAnalysis');
    unlockAchievement('sg41_gap_analyst');
    var ov = createOverlay('sg41-distgap');
    if (ov.querySelector('.sg41-panel')) { ov.classList.add('active'); return; }
    var panel = document.createElement('div'); panel.className = 'sg41-panel';
    panel.innerHTML = '<div class="sg41-title">📏 클럽간 거리갭 분석기</div><div class="sg41-subtitle">클럽 사이 거리 갈격을 분석하여 빈 구간을 식별합니다</div><div class="sg41-canvas-wrap"><canvas id="sg41-gap-cv" width="620" height="400"></canvas></div><div class="sg41-info" id="sg41-gap-info"></div>';
    ov.appendChild(panel);
    var cv = document.getElementById('sg41-gap-cv'), ctx = cv.getContext('2d');
    var clubs = ['DR','3W','5W','3H','4I','5I','6I','7I','8I','9I','PW','AW','SW','LW'];
    var dists = [280,250,235,220,210,200,190,178,165,150,135,120,100,80];
    ctx.fillStyle = '#0d1b2a'; ctx.fillRect(0, 0, 620, 400);
    ctx.strokeStyle = 'rgba(255,255,255,0.1)';
    for (var gy = 50; gy < 360; gy += 50) { ctx.beginPath(); ctx.moveTo(50, gy); ctx.lineTo(590, gy); ctx.stroke(); }
    var barW = 30, startX = 65;
    var maxDist = 300;
    clubs.forEach(function (c, i) {
      var x = startX + i * 38;
      var h = (dists[i] / maxDist) * 300;
      var y = 360 - h;
      var grd = ctx.createLinearGradient(x, y, x, 360);
      grd.addColorStop(0, '#4caf50'); grd.addColorStop(1, '#1b5e20');
      ctx.fillStyle = grd;
      ctx.beginPath(); ctx.roundRect(x, y, barW, h, [4, 4, 0, 0]); ctx.fill();
      if (i > 0) {
        var gap = dists[i - 1] - dists[i];
        var idealGap = (i < 4) ? 15 : 12;
        var gapColor = Math.abs(gap - idealGap) <= 3 ? '#4caf50' : gap > idealGap + 5 ? '#f44336' : '#ff9800';
        ctx.fillStyle = gapColor; ctx.font = 'bold 10px sans-serif'; ctx.textAlign = 'center';
        ctx.fillText(gap + 'yd', x + barW / 2, y - 18);
        ctx.beginPath(); ctx.moveTo(x - 4, y - 12); ctx.lineTo(x + barW + 4, y - 12);
        ctx.strokeStyle = gapColor; ctx.lineWidth = 1; ctx.stroke();
      }
      ctx.fillStyle = '#fff'; ctx.font = '10px sans-serif'; ctx.textAlign = 'center';
      ctx.fillText(dists[i], x + barW / 2, y - 4);
      ctx.fillStyle = 'rgba(255,255,255,0.8)'; ctx.font = '9px sans-serif';
      ctx.fillText(c, x + barW / 2, 376);
    });
    ctx.fillStyle = '#fff'; ctx.font = 'bold 14px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('클럽간 거리갭 분석', 310, 24);
    ctx.font = '11px sans-serif';
    ctx.fillStyle = '#4caf50'; ctx.fillText('● 적정갭', 480, 24);
    ctx.fillStyle = '#ff9800'; ctx.fillText('● 주의', 530, 24);
    ctx.fillStyle = '#f44336'; ctx.fillText('● 문제', 575, 24);
    var gaps = []; for (var gi = 1; gi < dists.length; gi++) gaps.push(dists[gi - 1] - dists[gi]);
    var avgGap = Math.round(gaps.reduce(function (s, g) { return s + g; }, 0) / gaps.length);
    var maxGap = Math.max.apply(null, gaps);
    var problemIdx = gaps.indexOf(maxGap);
    var score = Math.max(0, 100 - (maxGap - 12) * 3);
    document.getElementById('sg41-gap-info').innerHTML = '평균갭: ' + avgGap + 'yd | 최대갭: ' + maxGap + 'yd (' + clubs[problemIdx] + '↔' + clubs[problemIdx + 1] + ') | 종합: <span class="' + gradeClass(score, 100) + '">' + score + '점 (' + gradeLetter(score, 100) + ')</span>';
  }

  // ═════════════════════════════════════════
  // FEATURE 4: 라운드멘탈스코어카드 Canvas 620x400
  // ═════════════════════════════════════════
  function openMentalScorecard() {
    playSFX('mentalScore');
    unlockAchievement('sg41_mental_coach');
    var ov = createOverlay('sg41-mental');
    if (ov.querySelector('.sg41-panel')) { ov.classList.add('active'); return; }
    var panel = document.createElement('div'); panel.className = 'sg41-panel';
    panel.innerHTML = '<div class="sg41-title">🧠 라운드 멘탈 스코어카드</div><div class="sg41-subtitle">18홀 멘탈 상태를 5개 축으로 추적합니다</div><div class="sg41-canvas-wrap"><canvas id="sg41-mental-cv" width="620" height="400"></canvas></div><div class="sg41-info" id="sg41-mental-info"></div>';
    ov.appendChild(panel);
    var cv = document.getElementById('sg41-mental-cv'), ctx = cv.getContext('2d');
    ctx.fillStyle = '#1a1a2e'; ctx.fillRect(0, 0, 620, 400);
    var axes = ['자신감', '집중력', '평정심', '루틴일관성', '적응력'];
    var colors = ['#4caf50', '#2196f3', '#ff9800', '#9c27b0', '#f44336'];
    var seed = 41;
    function rng() { seed = (seed * 16807 + 1) % 2147483647; return seed / 2147483647; }
    var data = [];
    for (var h = 0; h < 18; h++) {
      var row = [];
      for (var a = 0; a < 5; a++) { row.push(Math.round(40 + rng() * 55 + (h < 6 ? 5 : h > 14 ? -10 : 0))); }
      data.push(row);
    }
    var cellW = 28, cellH = 18, startX = 80, startY = 55;
    ctx.fillStyle = 'rgba(255,255,255,0.7)'; ctx.font = '10px sans-serif'; ctx.textAlign = 'center';
    for (var h2 = 0; h2 < 18; h2++) { ctx.fillText((h2 + 1) + 'H', startX + h2 * cellW + cellW / 2, startY - 6); }
    ctx.textAlign = 'right';
    axes.forEach(function (ax, ai) {
      ctx.fillStyle = colors[ai]; ctx.fillText(ax, startX - 8, startY + ai * cellH + cellH / 2 + 3);
    });
    for (var hi = 0; hi < 18; hi++) {
      for (var ai2 = 0; ai2 < 5; ai2++) {
        var val = data[hi][ai2];
        var intensity = val / 100;
        var r = Math.round(244 * (1 - intensity) + 76 * intensity);
        var g2 = Math.round(67 * (1 - intensity) + 175 * intensity);
        var b = Math.round(54 * (1 - intensity) + 80 * intensity);
        ctx.fillStyle = 'rgb(' + r + ',' + g2 + ',' + b + ')';
        ctx.fillRect(startX + hi * cellW + 1, startY + ai2 * cellH + 1, cellW - 2, cellH - 2);
        ctx.fillStyle = '#fff'; ctx.font = '8px sans-serif'; ctx.textAlign = 'center';
        ctx.fillText(val, startX + hi * cellW + cellW / 2, startY + ai2 * cellH + cellH / 2 + 3);
      }
    }
    var lineY = startY + 5 * cellH + 30;
    axes.forEach(function (ax, ai3) {
      ctx.beginPath();
      for (var hi2 = 0; hi2 < 18; hi2++) {
        var x = startX + hi2 * cellW + cellW / 2;
        var y = lineY + 120 - (data[hi2][ai3] / 100) * 120;
        if (hi2 === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = colors[ai3]; ctx.lineWidth = 2; ctx.stroke();
    });
    ctx.strokeStyle = 'rgba(255,255,255,0.1)'; ctx.lineWidth = 1;
    [0, 25, 50, 75, 100].forEach(function (v) {
      var y = lineY + 120 - (v / 100) * 120;
      ctx.beginPath(); ctx.moveTo(startX, y); ctx.lineTo(startX + 18 * cellW, y); ctx.stroke();
      ctx.fillStyle = 'rgba(255,255,255,0.4)'; ctx.font = '9px sans-serif'; ctx.textAlign = 'right';
      ctx.fillText(v, startX - 4, y + 3);
    });
    ctx.fillStyle = '#fff'; ctx.font = 'bold 14px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('라운드 멘탈 스코어카드', 310, 24);
    var avgScore = Math.round(data.reduce(function (s, r) { return s + r.reduce(function (s2, v) { return s2 + v; }, 0); }, 0) / 90);
    document.getElementById('sg41-mental-info').innerHTML = '평균 멘탈점수: <span class="' + gradeClass(avgScore, 100) + '">' + avgScore + '/100 (' + gradeLetter(avgScore, 100) + ')</span> | 최고: ' + axes[0] + ' | 개선필요: ' + axes[4];
  }

  // ═════════════════════════════════════════
  // FEATURE 5: 퍼팅거리컨트롤맵 Canvas 600x380
  // ═════════════════════════════════════════
  function openPuttingControl() {
    playSFX('puttControl');
    unlockAchievement('sg41_putt_control');
    var ov = createOverlay('sg41-puttctrl');
    if (ov.querySelector('.sg41-panel')) { ov.classList.add('active'); return; }
    var panel = document.createElement('div'); panel.className = 'sg41-panel';
    panel.innerHTML = '<div class="sg41-title">⛳ 퍼팅거리 컨트롤맵</div><div class="sg41-subtitle">거리대별 퍼팅 정확도와 잔여거리 맵핑</div><div class="sg41-canvas-wrap"><canvas id="sg41-putt-cv" width="600" height="380"></canvas></div><div class="sg41-info" id="sg41-putt-info"></div>';
    ov.appendChild(panel);
    var cv = document.getElementById('sg41-putt-cv'), ctx = cv.getContext('2d');
    ctx.fillStyle = '#0a2a0a'; ctx.fillRect(0, 0, 600, 380);
    var distances = [1, 2, 3, 4, 5, 6, 8, 10, 12, 15, 20, 25, 30];
    var makeRate = [98, 95, 88, 72, 58, 45, 32, 22, 15, 10, 6, 3, 1];
    var avgRemain = [0.2, 0.3, 0.5, 0.8, 1.2, 1.5, 2.0, 2.5, 3.2, 4.0, 5.5, 7.0, 9.0];
    var chartX = 70, chartY = 40, chartW = 480, chartH = 130;
    ctx.fillStyle = '#fff'; ctx.font = 'bold 13px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('퍼팅 성공률 (%)', 300, 28);
    ctx.strokeStyle = 'rgba(255,255,255,0.1)';
    [0, 25, 50, 75, 100].forEach(function (v) {
      var y = chartY + chartH - (v / 100) * chartH;
      ctx.beginPath(); ctx.moveTo(chartX, y); ctx.lineTo(chartX + chartW, y); ctx.stroke();
      ctx.fillStyle = 'rgba(255,255,255,0.5)'; ctx.font = '9px sans-serif'; ctx.textAlign = 'right';
      ctx.fillText(v + '%', chartX - 4, y + 3);
    });
    ctx.beginPath();
    distances.forEach(function (d, i) {
      var x = chartX + (i / (distances.length - 1)) * chartW;
      var y = chartY + chartH - (makeRate[i] / 100) * chartH;
      if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    });
    ctx.strokeStyle = '#4caf50'; ctx.lineWidth = 3; ctx.stroke();
    distances.forEach(function (d, i) {
      var x = chartX + (i / (distances.length - 1)) * chartW;
      var y = chartY + chartH - (makeRate[i] / 100) * chartH;
      ctx.beginPath(); ctx.arc(x, y, 4, 0, Math.PI * 2);
      ctx.fillStyle = makeRate[i] >= 50 ? '#4caf50' : makeRate[i] >= 20 ? '#ff9800' : '#f44336'; ctx.fill();
      ctx.fillStyle = 'rgba(255,255,255,0.6)'; ctx.font = '8px sans-serif'; ctx.textAlign = 'center';
      ctx.fillText(d + 'm', x, chartY + chartH + 14);
    });
    var chart2Y = 210, chart2H = 120;
    ctx.fillStyle = '#fff'; ctx.font = 'bold 13px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('평균 잔여거리 (m)', 300, chart2Y - 8);
    var maxRemain = 10;
    ctx.strokeStyle = 'rgba(255,255,255,0.1)';
    [0, 2.5, 5, 7.5, 10].forEach(function (v) {
      var y = chart2Y + chart2H - (v / maxRemain) * chart2H;
      ctx.beginPath(); ctx.moveTo(chartX, y); ctx.lineTo(chartX + chartW, y); ctx.stroke();
      ctx.fillStyle = 'rgba(255,255,255,0.5)'; ctx.font = '9px sans-serif'; ctx.textAlign = 'right';
      ctx.fillText(v + 'm', chartX - 4, y + 3);
    });
    var barWidth = chartW / distances.length * 0.6;
    distances.forEach(function (d, i) {
      var x = chartX + (i / (distances.length - 1)) * chartW - barWidth / 2;
      var h = (avgRemain[i] / maxRemain) * chart2H;
      var y = chart2Y + chart2H - h;
      var g = ctx.createLinearGradient(x, y, x, chart2Y + chart2H);
      g.addColorStop(0, avgRemain[i] <= 1 ? '#4caf50' : avgRemain[i] <= 3 ? '#ff9800' : '#f44336');
      g.addColorStop(1, 'rgba(0,0,0,0.3)');
      ctx.fillStyle = g;
      ctx.beginPath(); ctx.roundRect(x, y, barWidth, h, [3, 3, 0, 0]); ctx.fill();
      ctx.fillStyle = '#fff'; ctx.font = '8px sans-serif'; ctx.textAlign = 'center';
      ctx.fillText(avgRemain[i].toFixed(1), x + barWidth / 2, y - 4);
    });
    var totalScore = Math.round(makeRate.reduce(function (s, v) { return s + v; }, 0) / makeRate.length);
    document.getElementById('sg41-putt-info').innerHTML = '평균성공률: ' + totalScore + '% | 3m이하: ' + makeRate[2] + '% | 10m이상: ' + makeRate[9] + '% | 종합: <span class="' + gradeClass(totalScore, 100) + '">' + gradeLetter(totalScore, 100) + '</span>';
  }

  // ═════════════════════════════════════════
  // FEATURE 6: 스윙시퀀스타이밍분석기 Canvas 620x400
  // ═════════════════════════════════════════
  function openSwingSequence() {
    playSFX('swingSeq');
    unlockAchievement('sg41_swing_seq');
    var ov = createOverlay('sg41-swingseq');
    if (ov.querySelector('.sg41-panel')) { ov.classList.add('active'); return; }
    var panel = document.createElement('div'); panel.className = 'sg41-panel';
    panel.innerHTML = '<div class="sg41-title">⏱️ 스윙시퀀스 타이밍 분석기</div><div class="sg41-subtitle">스윙 단계별 시간 배분과 테포 분석</div><div class="sg41-canvas-wrap"><canvas id="sg41-swseq-cv" width="620" height="400"></canvas></div><div class="sg41-info" id="sg41-swseq-info"></div>';
    ov.appendChild(panel);
    var cv = document.getElementById('sg41-swseq-cv'), ctx = cv.getContext('2d');
    ctx.fillStyle = '#16213e'; ctx.fillRect(0, 0, 620, 400);
    var phases = ['어드레스', '테이크어웨이', '백스윙', '탑', '다운스윙', '임팩트', '팔로스루', '피니시'];
    var yourTime = [0.8, 0.3, 0.6, 0.15, 0.25, 0.02, 0.3, 0.5];
    var proTime  = [0.6, 0.25, 0.5, 0.12, 0.22, 0.015, 0.25, 0.4];
    var barH = 28, startX = 140, startY = 50, maxTime = 1.0;
    ctx.fillStyle = '#fff'; ctx.font = 'bold 14px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('스윙 시퀀스 타이밍 (초)', 310, 28);
    phases.forEach(function (ph, i) {
      var y = startY + i * (barH + 14);
      ctx.fillStyle = 'rgba(255,255,255,0.7)'; ctx.font = '11px sans-serif'; ctx.textAlign = 'right';
      ctx.fillText(ph, startX - 10, y + barH / 2 + 3);
      var w1 = (yourTime[i] / maxTime) * 350;
      var g1 = ctx.createLinearGradient(startX, y, startX + w1, y);
      g1.addColorStop(0, '#2196f3'); g1.addColorStop(1, '#1565c0');
      ctx.fillStyle = g1;
      ctx.beginPath(); ctx.roundRect(startX, y, w1, barH / 2 - 1, [4, 4, 0, 0]); ctx.fill();
      var w2 = (proTime[i] / maxTime) * 350;
      var g2 = ctx.createLinearGradient(startX, y + barH / 2, startX + w2, y + barH / 2);
      g2.addColorStop(0, '#4caf50'); g2.addColorStop(1, '#2e7d32');
      ctx.fillStyle = g2;
      ctx.beginPath(); ctx.roundRect(startX, y + barH / 2 + 1, w2, barH / 2 - 1, [0, 0, 4, 4]); ctx.fill();
      ctx.fillStyle = '#fff'; ctx.font = '9px sans-serif'; ctx.textAlign = 'left';
      ctx.fillText(yourTime[i].toFixed(3) + 's', startX + w1 + 4, y + barH / 2 - 2);
      ctx.fillText(proTime[i].toFixed(3) + 's', startX + w2 + 4, y + barH - 2);
      var diff = yourTime[i] - proTime[i];
      if (Math.abs(diff) > 0.05) {
        ctx.fillStyle = diff > 0 ? '#f44336' : '#4caf50'; ctx.font = 'bold 9px sans-serif'; ctx.textAlign = 'right';
        ctx.fillText((diff > 0 ? '+' : '') + diff.toFixed(3) + 's', 610, y + barH / 2 + 3);
      }
    });
    ctx.fillStyle = '#2196f3'; ctx.fillRect(160, 380, 12, 10);
    ctx.fillStyle = '#fff'; ctx.font = '10px sans-serif'; ctx.textAlign = 'left'; ctx.fillText('나', 176, 389);
    ctx.fillStyle = '#4caf50'; ctx.fillRect(210, 380, 12, 10);
    ctx.fillStyle = '#fff'; ctx.fillText('프로', 226, 389);
    var totalYou = yourTime.reduce(function (s, v) { return s + v; }, 0);
    var totalPro = proTime.reduce(function (s, v) { return s + v; }, 0);
    var ratio = yourTime[2] / yourTime[4];
    var proRatio = proTime[2] / proTime[4];
    document.getElementById('sg41-swseq-info').innerHTML = '총스윙시간: ' + totalYou.toFixed(2) + 's (Pro: ' + totalPro.toFixed(2) + 's) | 백/다운비율: ' + ratio.toFixed(1) + ':1 (Pro: ' + proRatio.toFixed(1) + ':1) | <span class="' + gradeClass(Math.max(0, 100 - Math.abs(ratio - proRatio) * 30), 100) + '">' + gradeLetter(Math.max(0, 100 - Math.abs(ratio - proRatio) * 30), 100) + '</span>';
  }

  // ═════════════════════════════════════════
  // FEATURE 7: 코스매니지먼트의사결정트리 Canvas 620x400
  // ═════════════════════════════════════════
  function openCourseDecisionTree() {
    playSFX('courseDecision');
    unlockAchievement('sg41_course_mgr');
    var ov = createOverlay('sg41-decision');
    if (ov.querySelector('.sg41-panel')) { ov.classList.add('active'); return; }
    var panel = document.createElement('div'); panel.className = 'sg41-panel';
    panel.innerHTML = '<div class="sg41-title">🏗️ 코스매니지먼트 의사결정트리</div><div class="sg41-subtitle">5단계 상황별 최적 전략 결정 트리</div><div class="sg41-canvas-wrap"><canvas id="sg41-dec-cv" width="620" height="400"></canvas></div><div class="sg41-info" id="sg41-dec-info"></div>';
    ov.appendChild(panel);
    var cv = document.getElementById('sg41-dec-cv'), ctx = cv.getContext('2d');
    ctx.fillStyle = '#1a2332'; ctx.fillRect(0, 0, 620, 400);
    var nodes = [
      { x: 310, y: 35, text: '티샷 상황', w: 120, color: '#e91e63' },
      { x: 155, y: 110, text: 'Par3/4 짧은홀', w: 110, color: '#9c27b0' },
      { x: 465, y: 110, text: 'Par4/5 긴홀', w: 110, color: '#9c27b0' },
      { x: 80, y: 190, text: '페어웨이 넓음\n→ 드라이버', w: 105, color: '#2196f3' },
      { x: 230, y: 190, text: '해저드 있음\n→ 아이언/우드', w: 105, color: '#ff9800' },
      { x: 390, y: 190, text: '풍향 순풍\n→ 공격적', w: 105, color: '#2196f3' },
      { x: 540, y: 190, text: '풍향 역풍\n→ 레이업', w: 105, color: '#ff9800' },
      { x: 50, y: 280, text: 'FIR ✓\n→ 그린공략', w: 90, color: '#4caf50' },
      { x: 160, y: 280, text: 'FIR ✗\n→ 안전탈출', w: 90, color: '#f44336' },
      { x: 270, y: 280, text: '피해성공\n→ 파세이브', w: 90, color: '#4caf50' },
      { x: 380, y: 280, text: '어프로치\n→ GIR노림', w: 90, color: '#4caf50' },
      { x: 490, y: 280, text: '레이업\n→ 웨지범위', w: 90, color: '#ff9800' },
      { x: 200, y: 360, text: '퍼팅: 2퍼트 이하', w: 100, color: '#00bcd4' },
      { x: 420, y: 360, text: '퍼팅: 라그 허용', w: 100, color: '#00bcd4' }
    ];
    var edges = [
      [0, 1], [0, 2], [1, 3], [1, 4], [2, 5], [2, 6],
      [3, 7], [3, 8], [4, 9], [5, 10], [6, 11],
      [7, 12], [10, 12], [9, 13], [11, 13]
    ];
    edges.forEach(function (e) {
      var from = nodes[e[0]], to = nodes[e[1]];
      ctx.beginPath(); ctx.moveTo(from.x, from.y + 20); ctx.lineTo(to.x, to.y - 12);
      ctx.strokeStyle = 'rgba(255,255,255,0.3)'; ctx.lineWidth = 1.5; ctx.stroke();
      var mx = (from.x + to.x) / 2, my = (from.y + to.y) / 2 + 5;
      ctx.beginPath(); ctx.moveTo(mx, my); ctx.lineTo(mx - 4, my - 6); ctx.lineTo(mx + 4, my - 6); ctx.closePath();
      ctx.fillStyle = 'rgba(255,255,255,0.4)'; ctx.fill();
    });
    nodes.forEach(function (n) {
      ctx.fillStyle = n.color; ctx.globalAlpha = 0.85;
      ctx.beginPath(); ctx.roundRect(n.x - n.w / 2, n.y - 14, n.w, 28, 8); ctx.fill();
      ctx.globalAlpha = 1; ctx.strokeStyle = 'rgba(255,255,255,0.3)'; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.roundRect(n.x - n.w / 2, n.y - 14, n.w, 28, 8); ctx.stroke();
      var lines = n.text.split('\n');
      ctx.fillStyle = '#fff'; ctx.font = '10px sans-serif'; ctx.textAlign = 'center';
      lines.forEach(function (l, li) { ctx.fillText(l, n.x, n.y + (li - (lines.length - 1) / 2) * 12 + 3); });
    });
    ctx.fillStyle = '#fff'; ctx.font = 'bold 13px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('코스매니지먼트 의사결정트리', 310, 16);
    document.getElementById('sg41-dec-info').innerHTML = '5단계 의사결정: 티샷→홀유형→상황판단→샷선택→퍼팅전략 | Arccos Caddie AI 수준 코스매니지먼트';
  }

  // ═════════════════════════════════════════
  // FEATURE 8: 종합골프피트니스인덱스 Canvas 620x400
  // ═════════════════════════════════════════
  function openGolfFitness() {
    playSFX('fitnessIdx');
    unlockAchievement('sg41_fitness_guru');
    var ov = createOverlay('sg41-fitness');
    if (ov.querySelector('.sg41-panel')) { ov.classList.add('active'); return; }
    var panel = document.createElement('div'); panel.className = 'sg41-panel';
    panel.innerHTML = '<div class="sg41-title">💪 종합골프피트니스 인덱스</div><div class="sg41-subtitle">8개 체력요소를 반원게이지로 평가합니다 (TPI 기반)</div><div class="sg41-canvas-wrap"><canvas id="sg41-fit-cv" width="620" height="400"></canvas></div><div class="sg41-info" id="sg41-fit-info"></div>';
    ov.appendChild(panel);
    var cv = document.getElementById('sg41-fit-cv'), ctx = cv.getContext('2d');
    ctx.fillStyle = '#1a1a2e'; ctx.fillRect(0, 0, 620, 400);
    var metrics = [
      { name: '코어안정성', score: 78, icon: '🧘' },
      { name: '골반회전력', score: 65, icon: '🔄' },
      { name: '어깨유연성', score: 72, icon: '🦴' },
      { name: '하체근력', score: 82, icon: '🦵' },
      { name: '밸런스', score: 70, icon: '⚖️' },
      { name: '지구력', score: 85, icon: '❤️' },
      { name: '포스처', score: 68, icon: '🧍' },
      { name: '파워', score: 75, icon: '⚡' }
    ];
    var cols = 4, rows = 2, gW = 130, gH = 130, padX = 30, padY = 50;
    ctx.fillStyle = '#fff'; ctx.font = 'bold 14px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('종합 골프 피트니스 인덱스 (TPI)', 310, 28);
    metrics.forEach(function (m, i) {
      var col = i % cols, row = Math.floor(i / cols);
      var cx = padX + col * (gW + 15) + gW / 2;
      var cy = padY + row * (gH + 35) + gH / 2;
      var radius = 45;
      ctx.beginPath(); ctx.arc(cx, cy, radius + 2, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(255,255,255,0.1)'; ctx.lineWidth = 8; ctx.stroke();
      var startAngle = -Math.PI / 2;
      var endAngle = startAngle + (m.score / 100) * Math.PI * 2;
      ctx.beginPath(); ctx.arc(cx, cy, radius + 2, startAngle, endAngle);
      var gc = m.score >= 80 ? '#4caf50' : m.score >= 60 ? '#ff9800' : '#f44336';
      ctx.strokeStyle = gc; ctx.lineWidth = 8; ctx.lineCap = 'round'; ctx.stroke(); ctx.lineCap = 'butt';
      ctx.fillStyle = '#fff'; ctx.font = '18px sans-serif'; ctx.textAlign = 'center';
      ctx.fillText(m.icon, cx, cy - 6);
      ctx.font = 'bold 16px sans-serif'; ctx.fillStyle = gc;
      ctx.fillText(m.score, cx, cy + 16);
      ctx.fillStyle = 'rgba(255,255,255,0.7)'; ctx.font = '10px sans-serif';
      ctx.fillText(m.name, cx, cy + radius + 18);
      ctx.fillStyle = 'rgba(255,255,255,0.5)'; ctx.font = '9px sans-serif';
      ctx.fillText(gradeLetter(m.score, 100), cx + radius - 5, cy - radius + 12);
    });
    var avgFit = Math.round(metrics.reduce(function (s, m) { return s + m.score; }, 0) / metrics.length);
    var weights = [0.15, 0.15, 0.12, 0.13, 0.1, 0.12, 0.1, 0.13];
    var weighted = Math.round(metrics.reduce(function (s, m, i) { return s + m.score * weights[i]; }, 0));
    document.getElementById('sg41-fit-info').innerHTML = '평균: ' + avgFit + '점 | 가중종합: <span class="' + gradeClass(weighted, 100) + '">' + weighted + '점 (' + gradeLetter(weighted, 100) + ')</span> | 최고: 지구력(' + metrics[5].score + ') | 개선: 골반회전(' + metrics[1].score + ')';
  }

  // ═════════════════════════════════════════
  // GOLF IQ v25 (15 questions)
  // ═════════════════════════════════════════
  function openGolfIQv25() {
    playSFX('quiz41');
    unlockAchievement('sg41_iq_v25');
    var ov = createOverlay('sg41-iq25');
    if (ov.querySelector('.sg41-panel')) { ov.classList.add('active'); return; }
    var panel = document.createElement('div'); panel.className = 'sg41-panel';
    var questions = [
      { q: '샷 디스퍼전(Shot Dispersion)을 줄이는 가장 효과적인 방법은?', o: ['클럽을 더 세게 잡는다', '일관된 프리샷 루틴을 유지한다', '항상 풀스윙으로 친다', '매번 다른 스탠스를 취한다'], a: 1 },
      { q: '그린 리딩에서 불의 망령선(Fall Line)이란?', o: ['그린의 가장자리 라인', '골프공이 직선으로 굴러가는 최대경사 방향', '홈과 그린을 연결하는 선', '프린지와 그린의 경계'], a: 1 },
      { q: '클럽 거리 갭핑(Gapping)에서 이상적인 아이언 간 거리 차이는?', o: ['5~8yd', '10~15yd', '20~25yd', '25~30yd'], a: 1 },
      { q: '멘탈 스코어카드에서 \'플로우 상태\'란?', o: ['분노에 매우 경직된 상태', '완전한 몰입과 집중의 상태', '무기력하고 지친 상태', '과도하게 흥분된 상태'], a: 1 },
      { q: '퍼팅에서 거리 컨트롤을 향상시키는 연습법은?', o: ['항상 같은 거리만 연습한다', '거리별 래더 드릴로 다양한 거리를 연습한다', '모든 퍼팅을 전력으로 친다', '목표를 보지 않고 친다'], a: 1 },
      { q: '스윙 시퀀스에서 3:1 템포 비율의 의미는?', o: ['백스윙이 다운스윙보다 3배 느리다', '다운스윙이 백스윙보다 3배 빠르다', '임팩트가 전체의 3분의 1이다', '팔로스루가 백스윙의 3배이다'], a: 0 },
      { q: '코스 매니지먼트에서 \'레이업\'이 필요한 상황은?', o: ['페어웨이가 넓을 때', '역풍+긴 홀+해저드 많을 때', '순풍에 짧은 Par3일 때', 'GIR 가능성이 높을 때'], a: 1 },
      { q: 'TPI(Titleist Performance Institute) 기반 골프 피트니스에서 가장 중요한 요소는?', o: ['상체 근력', '코어 안정성과 골반 회전력', '팔 유연성', '종아리 근력'], a: 1 },
      { q: '샷 분산 패턴에서 \'클러스터 분석\'이란?', o: ['샷이 모이는 영역을 통계적으로 묶는 것', '클럽을 묶음으로 분류하는 것', '코스를 구역별로 나누는 것', '선수를 실력별로 나누는 것'], a: 0 },
      { q: '퍼팅 거리별 성공률에서 PGA 투어 평균 6피트 성공률은 약?', o: ['90%', '70%', '50%', '30%'], a: 1 },
      { q: '스윙 시퀀스에서 \'트랜지션\'이란?', o: ['어드레스에서 테이크어웨이로의 전환', '백스윙 탑에서 다운스윙으로의 전환', '피니시에서 어드레스로의 복귀', '임팩트 후 팔로스루 시작'], a: 1 },
      { q: '그린 리딩에서 업힐 퍼팅과 다운힐 퍼팅의 속도 차이는?', o: ['업힐이 더 빠르다', '업힐이 더 느리고 다운힐이 더 빠르다', '같다', '상황에 따라 다르다'], a: 1 },
      { q: '코스 매니지먼트에서 \'디시전 트리\'의 첨번째 분기점은?', o: ['풀스윙 vs 하프스윙', '홀 유형별 전략 선택', '클럽 선택', '퍼팅 방향 결정'], a: 1 },
      { q: '골프 피트니스에서 X-Factor란?', o: ['상체 회전력', '어깨와 골반의 회전 각도 차이', '코어 근력 수치', '다리 발력'], a: 1 },
      { q: '퍼팅 거리 컨트롤에서 \'시계 드릴\'이란?', o: ['시계방향으로 퍼팅하는 것', '시계 바늘처럼 3/6/9/12시 방향으로 다양한 거리 연습', '시간을 재며 연습하는 것', '원형으로 돌며 퍼팅하는 것'], a: 1 }
    ];
    var currentQ = 0, score = 0, answered = [];
    function renderQuiz() {
      var q = questions[currentQ];
      var html = '<div class="sg41-title">🧪 Golf IQ v25</div>';
      html += '<div class="sg41-subtitle">문제 ' + (currentQ + 1) + '/15 | 점수: ' + score + '</div>';
      html += '<div style="padding:12px;font-size:0.95em;font-weight:600;margin:8px 0">' + q.q + '</div>';
      q.o.forEach(function (opt, oi) {
        var cls = 'sg41-quiz-opt';
        if (answered[currentQ] !== undefined) {
          if (oi === q.a) cls += ' correct';
          else if (oi === answered[currentQ] && oi !== q.a) cls += ' wrong';
        }
        html += '<button class="' + cls + '" data-oi="' + oi + '">' + (oi + 1) + '. ' + opt + '</button>';
      });
      if (answered[currentQ] !== undefined && currentQ < 14) {
        html += '<div style="text-align:center;margin-top:12px"><button class="sg41-btn" id="sg41-next-q">다음 →</button></div>';
      } else if (currentQ === 14 && answered[currentQ] !== undefined) {
        html += '<div style="text-align:center;margin-top:16px;font-size:1.1em"><b>최종점수: ' + score + '/15 (' + gradeLetter(score, 15) + ')</b></div>';
        if (score === 15) unlockAchievement('sg41_iq_perfect');
      }
      panel.innerHTML = html;
      panel.querySelectorAll('.sg41-quiz-opt').forEach(function (btn) {
        btn.addEventListener('click', function () {
          if (answered[currentQ] !== undefined) return;
          var oi = parseInt(btn.getAttribute('data-oi'));
          answered[currentQ] = oi;
          if (oi === q.a) { score++; playSFX('correct41'); } else { playSFX('wrong41'); }
          renderQuiz();
        });
      });
      var nextBtn = panel.querySelector('#sg41-next-q');
      if (nextBtn) nextBtn.addEventListener('click', function () { currentQ++; renderQuiz(); playSFX('tabSwitch41'); });
    }
    renderQuiz();
  }

  // ── Navigation: append 9 buttons to existing sg30-bottom-bar ──
  var navItems = [
    { icon: '🎯', label: '샷분산', fn: openShotDispersion },
    { icon: '🟢', label: '그린리딩', fn: openGreenReading },
    { icon: '📏', label: '거리갭', fn: openDistanceGap },
    { icon: '🧠', label: '멘탈', fn: openMentalScorecard },
    { icon: '⛳', label: '퍼팅컨트롤', fn: openPuttingControl },
    { icon: '⏱️', label: '스윙시퀀스', fn: openSwingSequence },
    { icon: '🏗️', label: '의사결정', fn: openCourseDecisionTree },
    { icon: '💪', label: '피트니스', fn: openGolfFitness },
    { icon: '🧪', label: 'IQ v25', fn: openGolfIQv25 }
  ];

  function attachNav() {
    var bar = document.querySelector('.sg30-bottom-bar');
    if (!bar) { setTimeout(attachNav, 500); return; }
    var existingBtn = bar.querySelector('.sg30-bbtn');
    navItems.forEach(function (item) {
      var btn = document.createElement('button');
      btn.className = existingBtn ? existingBtn.className : 'sg30-bbtn';
      btn.innerHTML = '<span class="sg30-bbtn-icon">' + item.icon + '</span><span class="sg30-bbtn-label">' + item.label + '</span>';
      btn.addEventListener('click', function () { playSFX('navClick41'); item.fn(); });
      bar.appendChild(btn);
    });
  }
  attachNav();

  // ── Keyboard shortcuts: Shift+Q/W/E/R/T/Y/U/I/O ──
  document.addEventListener('keydown', function (e) {
    if (!e.shiftKey) return;
    var map = { Q: 0, W: 1, E: 2, R: 3, T: 4, Y: 5, U: 6, I: 7, O: 8 };
    var idx = map[e.key.toUpperCase()];
    if (idx !== undefined && navItems[idx]) { e.preventDefault(); navItems[idx].fn(); }
  });

  // ── Global exposure ──
  window.openShotDispersion = openShotDispersion;
  window.openGreenReading = openGreenReading;
  window.openDistanceGap = openDistanceGap;
  window.openMentalScorecard = openMentalScorecard;
  window.openPuttingControl = openPuttingControl;
  window.openSwingSequence = openSwingSequence;
  window.openCourseDecisionTree = openCourseDecisionTree;
  window.openGolfFitness = openGolfFitness;
  window.openGolfIQv25 = openGolfIQv25;

  console.log('[SmartGolf v41.0] Loaded: ShotDispersion, GreenReading, DistanceGap, MentalScorecard, PuttingControl, SwingSequence, CourseDecisionTree, GolfFitness, GolfIQ v25');
})();
