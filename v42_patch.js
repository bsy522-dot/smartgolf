(function () {
  'use strict';

  // ── LS helper ──
  var LS = function (k, v) {
    var key = 'sg42_' + k;
    if (v === undefined) { try { return JSON.parse(localStorage.getItem(key)); } catch (e) { return null; } }
    localStorage.setItem(key, JSON.stringify(v));
  };

  // ── SFX Engine (16 new sounds) ──
  var audioCtx;
  function getCtx() { if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)(); return audioCtx; }
  var SFX_MAP = {
    tempoTap:     { f: 540, d: 0.15, t: 'sine',     v: 0.3  },
    readyCheck:   { f: 460, d: 0.2,  t: 'triangle', v: 0.25 },
    courseReview:  { f: 580, d: 0.18, t: 'sine',     v: 0.28 },
    roundReflect: { f: 400, d: 0.22, t: 'triangle', v: 0.25 },
    practiceLog:  { f: 500, d: 0.17, t: 'sine',     v: 0.27 },
    goalTrack:    { f: 640, d: 0.2,  t: 'triangle', v: 0.25 },
    bagBuild:     { f: 480, d: 0.19, t: 'sine',     v: 0.3  },
    selfDiag:     { f: 520, d: 0.22, t: 'triangle', v: 0.25 },
    achieve42:    { f: 880, d: 0.3,  t: 'sine',     v: 0.25 },
    quiz42:       { f: 660, d: 0.15, t: 'triangle', v: 0.22 },
    correct42:    { f: 784, d: 0.25, t: 'sine',     v: 0.3  },
    wrong42:      { f: 220, d: 0.3,  t: 'sawtooth', v: 0.15 },
    navClick42:   { f: 1200, d: 0.08, t: 'sine',    v: 0.15 },
    panelOpen42:  { f: 700, d: 0.12, t: 'triangle', v: 0.2  },
    panelClose42: { f: 350, d: 0.1,  t: 'sine',     v: 0.18 },
    tabSwitch42:  { f: 900, d: 0.06, t: 'sine',     v: 0.12 }
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
    '.sg42-overlay{position:fixed;top:0;left:0;right:0;bottom:0;z-index:10020;background:rgba(0,0,0,0.85);overflow-y:auto;display:none;padding:12px}',
    '.sg42-overlay.active{display:block}',
    '.sg42-panel{max-width:700px;margin:20px auto;background:var(--card-bg,#fff);border-radius:16px;padding:20px;box-shadow:0 8px 32px rgba(0,0,0,0.3)}',
    '.sg42-title{font-size:1.3em;font-weight:700;color:var(--primary,#1a7a3a);margin-bottom:12px;text-align:center}',
    '.sg42-subtitle{font-size:0.85em;color:var(--text-muted,#666);text-align:center;margin-bottom:16px}',
    '.sg42-canvas-wrap{text-align:center;margin:12px 0;overflow-x:auto}',
    '.sg42-canvas-wrap canvas{border-radius:8px;max-width:100%}',
    '.sg42-btn{display:inline-block;padding:8px 16px;border-radius:8px;border:none;background:var(--primary,#1a7a3a);color:#fff;cursor:pointer;font-size:0.85em;margin:4px}',
    '.sg42-btn:hover{opacity:0.85}',
    '.sg42-btn-danger{background:#f44336}',
    '.sg42-close{position:absolute;top:12px;right:16px;font-size:1.5em;color:#fff;cursor:pointer;z-index:10021;background:rgba(0,0,0,0.4);border-radius:50%;width:36px;height:36px;display:flex;align-items:center;justify-content:center}',
    '.sg42-info{font-size:0.8em;color:var(--text-muted,#666);margin-top:8px;text-align:center;line-height:1.5}',
    '.sg42-grade-s{color:#e91e63;font-weight:700}',
    '.sg42-grade-a{color:#ff5722;font-weight:700}',
    '.sg42-grade-b{color:#ff9800;font-weight:700}',
    '.sg42-grade-c{color:#2196f3;font-weight:700}',
    '.sg42-grade-d{color:#9e9e9e;font-weight:700}',
    '.sg42-input{padding:6px 10px;border:1px solid var(--border,#e0e0e0);border-radius:6px;font-size:0.85em;margin:4px;background:var(--card-bg,#fff);color:var(--text,#333);width:80px}',
    '.sg42-input-wide{width:160px}',
    '.sg42-select{padding:6px 10px;border:1px solid var(--border,#e0e0e0);border-radius:6px;font-size:0.85em;margin:4px;background:var(--card-bg,#fff);color:var(--text,#333)}',
    '.sg42-form-row{display:flex;align-items:center;gap:8px;margin:6px 0;flex-wrap:wrap;justify-content:center}',
    '.sg42-checklist-item{display:flex;align-items:center;gap:8px;padding:8px 12px;margin:4px 0;border:1px solid var(--border,#e0e0e0);border-radius:8px;cursor:pointer;transition:all 0.2s;font-size:0.88em}',
    '.sg42-checklist-item.checked{background:var(--primary-light,#e8f5e9);border-color:var(--primary,#1a7a3a)}',
    '.sg42-checklist-check{width:20px;height:20px;border:2px solid var(--border,#ccc);border-radius:4px;display:flex;align-items:center;justify-content:center;font-size:14px;flex-shrink:0}',
    '.sg42-checklist-item.checked .sg42-checklist-check{background:var(--primary,#1a7a3a);border-color:var(--primary,#1a7a3a);color:#fff}',
    '.sg42-stars{display:inline-flex;gap:2px;cursor:pointer}',
    '.sg42-star{font-size:1.2em;color:var(--border,#ccc);transition:color 0.15s}',
    '.sg42-star.active{color:#ff9800}',
    '.sg42-quiz-opt{display:block;width:100%;padding:12px;margin:6px 0;border:2px solid var(--border,#e0e0e0);border-radius:10px;background:var(--card-bg,#fff);cursor:pointer;text-align:left;font-size:0.9em;transition:all 0.2s}',
    '.sg42-quiz-opt:hover{border-color:var(--primary,#1a7a3a);background:var(--primary-light,#e8f5e9)}',
    '.sg42-quiz-opt.correct{border-color:#4caf50;background:#e8f5e9}',
    '.sg42-quiz-opt.wrong{border-color:#f44336;background:#fce4ec}',
    '.sg42-tabs{display:flex;gap:4px;margin-bottom:12px;flex-wrap:wrap;justify-content:center}',
    '.sg42-tab{padding:6px 12px;border-radius:6px;border:1px solid var(--border,#e0e0e0);background:transparent;cursor:pointer;font-size:0.78em;transition:all 0.2s}',
    '.sg42-tab.active{background:var(--primary,#1a7a3a);color:#fff;border-color:var(--primary,#1a7a3a)}',
    '.sg42-toast{position:fixed;bottom:80px;left:50%;transform:translateX(-50%);background:var(--primary,#1a7a3a);color:#fff;padding:12px 24px;border-radius:12px;z-index:10030;font-size:0.85em;box-shadow:0 4px 16px rgba(0,0,0,0.3);animation:sg42-toast-in 0.3s ease}',
    '@keyframes sg42-toast-in{from{opacity:0;transform:translateX(-50%) translateY(20px)}to{opacity:1;transform:translateX(-50%) translateY(0)}}',
    '.sg42-tap-btn{display:block;width:200px;height:200px;margin:12px auto;border-radius:50%;border:none;font-size:1em;font-weight:700;color:#fff;cursor:pointer;transition:all 0.15s}',
    '.sg42-tap-btn:active{transform:scale(0.95)}'
  ].join('\n');
  document.head.appendChild(style);

  // ── Utilities ──
  function createOverlay(id) {
    var el = document.getElementById(id);
    if (el) { el.classList.add('active'); return el; }
    el = document.createElement('div');
    el.id = id; el.className = 'sg42-overlay active';
    var closeBtn = document.createElement('div');
    closeBtn.className = 'sg42-close'; closeBtn.textContent = '×';
    closeBtn.onclick = function () { el.classList.remove('active'); playSFX('panelClose42'); };
    el.appendChild(closeBtn);
    el.addEventListener('click', function (e) { if (e.target === el) { el.classList.remove('active'); playSFX('panelClose42'); } });
    document.body.appendChild(el);
    return el;
  }
  function gradeClass(s, m) { var p = s / m * 100; return p >= 90 ? 'sg42-grade-s' : p >= 75 ? 'sg42-grade-a' : p >= 60 ? 'sg42-grade-b' : p >= 40 ? 'sg42-grade-c' : 'sg42-grade-d'; }
  function gradeLetter(s, m) { var p = s / m * 100; return p >= 90 ? 'S' : p >= 75 ? 'A' : p >= 60 ? 'B' : p >= 40 ? 'C' : 'D'; }
  function emptyCanvasText(ctx, w, h, msg) {
    ctx.save(); ctx.fillStyle = 'rgba(255,255,255,0.55)';
    ctx.font = '15px sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText(msg || '기록을 추가하면 표시됩니다', w / 2, h / 2);
    ctx.restore();
  }
  function mean(arr) { return arr.length ? arr.reduce(function (s, v) { return s + v; }, 0) / arr.length : 0; }
  function pad2(n) { return n < 10 ? '0' + n : '' + n; }
  function todayStr() { var d = new Date(); return d.getFullYear() + '-' + pad2(d.getMonth() + 1) + '-' + pad2(d.getDate()); }
  function monthStr() { var d = new Date(); return d.getFullYear() + '-' + pad2(d.getMonth() + 1); }
  function showToast(msg) {
    var t = document.createElement('div'); t.className = 'sg42-toast'; t.textContent = msg;
    document.body.appendChild(t); setTimeout(function () { t.remove(); }, 2500);
  }
  function drawRadar(ctx, cx, cy, r, labels, values, maxVal) {
    var n = labels.length, step = Math.PI * 2 / n;
    [0.25, 0.5, 0.75, 1].forEach(function (s) {
      ctx.beginPath();
      for (var i = 0; i <= n; i++) { var a = -Math.PI / 2 + (i % n) * step; var px = cx + Math.cos(a) * r * s; var py = cy + Math.sin(a) * r * s; if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py); }
      ctx.strokeStyle = 'rgba(255,255,255,0.15)'; ctx.lineWidth = 1; ctx.stroke();
    });
    for (var i = 0; i < n; i++) {
      var a = -Math.PI / 2 + i * step;
      ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + Math.cos(a) * r, cy + Math.sin(a) * r);
      ctx.strokeStyle = 'rgba(255,255,255,0.15)'; ctx.stroke();
      ctx.fillStyle = 'rgba(255,255,255,0.8)'; ctx.font = '11px sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText(labels[i], cx + Math.cos(a) * (r + 22), cy + Math.sin(a) * (r + 22));
    }
    ctx.beginPath();
    for (var i = 0; i < n; i++) { var a = -Math.PI / 2 + i * step; var v = Math.min((values[i] || 0) / maxVal, 1); if (i === 0) ctx.moveTo(cx + Math.cos(a) * r * v, cy + Math.sin(a) * r * v); else ctx.lineTo(cx + Math.cos(a) * r * v, cy + Math.sin(a) * r * v); }
    ctx.closePath(); ctx.fillStyle = 'rgba(76,175,80,0.25)'; ctx.fill(); ctx.strokeStyle = '#4caf50'; ctx.lineWidth = 2; ctx.stroke();
    for (var i = 0; i < n; i++) { var a = -Math.PI / 2 + i * step; var v = Math.min((values[i] || 0) / maxVal, 1); ctx.beginPath(); ctx.arc(cx + Math.cos(a) * r * v, cy + Math.sin(a) * r * v, 4, 0, Math.PI * 2); ctx.fillStyle = '#4caf50'; ctx.fill(); }
  }

  // ── Achievements (15 new: 362-377) ──
  var ACHIEVEMENTS = [
    { id: 'sg42_tempo_master', name: '템포마스터', desc: '스윙 템포 측정 완료', icon: '⏱️' },
    { id: 'sg42_ready_checker', name: '준비완료', desc: '라운드 준비도 체크 완료', icon: '✅' },
    { id: 'sg42_course_reviewer', name: '코스리뷰어', desc: '코스 리뷰 첫 작성', icon: '⛳' },
    { id: 'sg42_round_reflect', name: '라운드복기', desc: '라운드 복기 일지 첫 작성', icon: '📝' },
    { id: 'sg42_practice_logger', name: '연습기록가', desc: '연습 세션 첫 기록', icon: '💪' },
    { id: 'sg42_goal_tracker', name: '목표추적자', desc: '라운드 목표 첫 설정', icon: '🎯' },
    { id: 'sg42_bag_builder', name: '백빌더', desc: '클럽 가방 첫 구성', icon: '🏌️' },
    { id: 'sg42_self_diagnosis', name: '셀프진단', desc: '월간 셀프 진단 완료', icon: '📊' },
    { id: 'sg42_iq_v26', name: 'Golf IQ v26', desc: 'Golf IQ v26 퀴즈 도전', icon: '🧪' },
    { id: 'sg42_iq_perfect', name: 'IQ만점자v26', desc: 'Golf IQ v26 15문 만점', icon: '🏆' },
    { id: 'sg42_all_features', name: 'v42마스터', desc: 'v42 8개 기능 모두 실행', icon: '⭐' },
    { id: 'sg42_streak_3', name: '3일연속연습', desc: '3일 연속 연습 기록', icon: '🔥' },
    { id: 'sg42_analyzer', name: '분석마니아', desc: '분석 기능 5개 이상 사용', icon: '📈' },
    { id: 'sg42_goal_achiever', name: '목표달성자', desc: '목표 달성률 90% 이상', icon: '🏅' },
    { id: 'sg42_complete', name: '완벽주의자', desc: '모든 v42 업적 달성', icon: '🌟' }
  ];
  function unlockAchievement(achId) {
    if (LS('ach_' + achId)) return;
    LS('ach_' + achId, true);
    var ach = ACHIEVEMENTS.find(function (a) { return a.id === achId; });
    if (!ach) return;
    playSFX('achieve42');
    var toast = document.createElement('div'); toast.className = 'sg42-toast';
    toast.innerHTML = ach.icon + ' <b>' + ach.name + '</b> ' + ach.desc;
    document.body.appendChild(toast);
    setTimeout(function () { toast.remove(); }, 3000);
    // '완벽주의자'는 나머지 업적을 실제로 모두 달성했을 때만 부여한다
    if (achId !== 'sg42_complete') {
      var rest = ACHIEVEMENTS.filter(function (a) { return a.id !== 'sg42_complete'; });
      if (rest.every(function (a) { return LS('ach_' + a.id); })) unlockAchievement('sg42_complete');
    }
  }
  function trackFeature(name) {
    var used = LS('featused') || {};
    used[name] = true; LS('featused', used);
    var keys = Object.keys(used);
    if (keys.length >= 5) unlockAchievement('sg42_analyzer');
    if (keys.length >= 8) unlockAchievement('sg42_all_features');
  }

  // ═══════════════════════════════════════════
  // FEATURE 1: 스윙 템포 탭 측정기 Canvas 620x400
  // ═══════════════════════════════════════════
  function openSwingTempo() {
    playSFX('tempoTap'); trackFeature('tempo');
    var ov = createOverlay('sg42-tempo');
    var old = ov.querySelector('.sg42-panel'); if (old) old.remove();
    var panel = document.createElement('div'); panel.className = 'sg42-panel';
    panel.innerHTML = '<div class="sg42-title">⏱️ 스윙 템포 탭 측정기</div><div class="sg42-subtitle">탭 3회: 백스윙 시작 → 백스윙 탑 → 임팩트</div>' +
      '<div class="sg42-canvas-wrap"><canvas id="sg42-tempo-cv" width="620" height="400"></canvas></div>' +
      '<div style="text-align:center"><button class="sg42-tap-btn" id="sg42-tempo-tapbtn" style="background:#4caf50">탭하여\n백스윙 시작</button></div>' +
      '<div class="sg42-info" id="sg42-tempo-info"></div>';
    ov.appendChild(panel);
    var tapState = 0, t1 = 0, t2 = 0;
    var tapBtn = document.getElementById('sg42-tempo-tapbtn');
    function drawTempoChart() {
      var cv = document.getElementById('sg42-tempo-cv'), ctx = cv.getContext('2d');
      ctx.clearRect(0, 0, 620, 400); ctx.fillStyle = '#16213e'; ctx.fillRect(0, 0, 620, 400);
      ctx.fillStyle = '#fff'; ctx.font = 'bold 14px sans-serif'; ctx.textAlign = 'center';
      ctx.fillText('스윙 템포 측정 기록', 310, 24);
      var records = LS('tempo') || [];
      if (!records.length) { emptyCanvasText(ctx, 620, 400, '기록을 추가하면 표시됩니다'); return; }
      var last10 = records.slice(-10), cX = 60, cY = 50, cW = 500, cH = 140;
      var maxT = 0.1;
      last10.forEach(function (r) { maxT = Math.max(maxT, r.bs, r.ds); });
      maxT *= 1.2;
      ctx.strokeStyle = 'rgba(255,255,255,0.1)';
      for (var i = 0; i <= 4; i++) { var y = cY + i * (cH / 4); ctx.beginPath(); ctx.moveTo(cX, y); ctx.lineTo(cX + cW, y); ctx.stroke(); ctx.fillStyle = 'rgba(255,255,255,0.4)'; ctx.font = '9px sans-serif'; ctx.textAlign = 'right'; ctx.fillText((maxT * (1 - i / 4)).toFixed(2) + 's', cX - 4, y + 3); }
      // Backswing line
      ctx.beginPath();
      last10.forEach(function (r, i) { var x = cX + (i / Math.max(1, last10.length - 1)) * cW; var y = cY + cH - (r.bs / maxT) * cH; if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y); });
      ctx.strokeStyle = '#2196f3'; ctx.lineWidth = 2; ctx.stroke();
      // Downswing line
      ctx.beginPath();
      last10.forEach(function (r, i) { var x = cX + (i / Math.max(1, last10.length - 1)) * cW; var y = cY + cH - (r.ds / maxT) * cH; if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y); });
      ctx.strokeStyle = '#ff9800'; ctx.lineWidth = 2; ctx.stroke();
      // Ratio chart
      var rY = cY + cH + 40, rH = 120;
      ctx.fillStyle = '#fff'; ctx.font = 'bold 12px sans-serif'; ctx.textAlign = 'center';
      ctx.fillText('백스윙:다운스윙 비율', 310, rY - 10);
      var refLineY = rY + rH - (3 / 6) * rH;
      ctx.beginPath(); ctx.moveTo(cX, refLineY); ctx.lineTo(cX + cW, refLineY);
      ctx.strokeStyle = 'rgba(76,175,80,0.5)'; ctx.lineWidth = 1; ctx.setLineDash([4, 4]); ctx.stroke(); ctx.setLineDash([]);
      ctx.fillStyle = 'rgba(76,175,80,0.7)'; ctx.font = '9px sans-serif'; ctx.textAlign = 'left';
      ctx.fillText('3:1 (일반 참고 기준)', cX + cW + 5, refLineY + 3);
      ctx.beginPath();
      last10.forEach(function (r, i) { var x = cX + (i / Math.max(1, last10.length - 1)) * cW; var ratio = r.ds > 0 ? r.bs / r.ds : 0; var y = rY + rH - (Math.min(ratio, 6) / 6) * rH; if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y); });
      ctx.strokeStyle = '#e91e63'; ctx.lineWidth = 2; ctx.stroke();
      last10.forEach(function (r, i) { var x = cX + (i / Math.max(1, last10.length - 1)) * cW; var ratio = r.ds > 0 ? r.bs / r.ds : 0; var y = rY + rH - (Math.min(ratio, 6) / 6) * rH; ctx.beginPath(); ctx.arc(x, y, 4, 0, Math.PI * 2); ctx.fillStyle = '#e91e63'; ctx.fill(); ctx.fillStyle = '#fff'; ctx.font = '9px sans-serif'; ctx.textAlign = 'center'; ctx.fillText(ratio.toFixed(1), x, y - 8); });
      // Legend
      ctx.font = '10px sans-serif';
      ctx.fillStyle = '#2196f3'; ctx.fillRect(140, 385, 10, 8); ctx.fillStyle = '#fff'; ctx.textAlign = 'left'; ctx.fillText('백스윙', 154, 393);
      ctx.fillStyle = '#ff9800'; ctx.fillRect(220, 385, 10, 8); ctx.fillStyle = '#fff'; ctx.fillText('다운스윙', 234, 393);
      ctx.fillStyle = '#e91e63'; ctx.fillRect(320, 385, 10, 8); ctx.fillStyle = '#fff'; ctx.fillText('비율', 334, 393);
      var info = document.getElementById('sg42-tempo-info');
      var last = last10[last10.length - 1]; var ratio = last.ds > 0 ? last.bs / last.ds : 0;
      if (info) info.innerHTML = '총 ' + records.length + '회 측정 | 최근: 백스윙 ' + last.bs.toFixed(3) + 's, 다운스윙 ' + last.ds.toFixed(3) + 's, 비율 ' + ratio.toFixed(1) + ':1 (일반 참고 기준: ~0.75s:0.25s, 3:1)';
    }
    tapBtn.addEventListener('click', function () {
      playSFX('tempoTap');
      if (tapState === 0) { t1 = Date.now(); tapState = 1; tapBtn.textContent = '탭하여\n백스윙 탑'; tapBtn.style.background = '#ff9800'; }
      else if (tapState === 1) { t2 = Date.now(); tapState = 2; tapBtn.textContent = '탭하여\n임팩트'; tapBtn.style.background = '#f44336'; }
      else { var t3 = Date.now(); var bs = (t2 - t1) / 1000; var ds = (t3 - t2) / 1000; var records = LS('tempo') || []; records.push({ bs: bs, ds: ds, date: todayStr() }); LS('tempo', records); tapState = 0; tapBtn.textContent = '탭하여\n백스윙 시작'; tapBtn.style.background = '#4caf50'; unlockAchievement('sg42_tempo_master'); drawTempoChart(); }
    });
    drawTempoChart();
  }

  // ═══════════════════════════════════════════
  // FEATURE 2: 라운드 준비도 체크리스트 Canvas 620x400
  // ═══════════════════════════════════════════
  function openRoundReadiness() {
    playSFX('readyCheck'); trackFeature('ready');
    var ov = createOverlay('sg42-readiness');
    var old = ov.querySelector('.sg42-panel'); if (old) old.remove();
    var panel = document.createElement('div'); panel.className = 'sg42-panel';
    var ITEMS = ['장비점검', '워밍업', '코스확인', '날씨체크', '목표설정', '영양보충', '수분섭취', '멘탈준비'];
    var ICONS = ['🏌️', '🧘', '🗺️', '⛅', '🎯', '🍌', '💧', '🧠'];
    var checked = LS('ready_current') || [];
    if (!Array.isArray(checked) || checked.length !== 8) checked = [false, false, false, false, false, false, false, false];
    var html = '<div class="sg42-title">✅ 라운드 준비도 체크리스트</div><div class="sg42-subtitle">8개 항목을 체크하고 준비도를 확인하세요</div>';
    html += '<div id="sg42-ready-list">';
    ITEMS.forEach(function (item, i) { html += '<div class="sg42-checklist-item' + (checked[i] ? ' checked' : '') + '" data-idx="' + i + '"><div class="sg42-checklist-check">' + (checked[i] ? '✓' : '') + '</div><span>' + ICONS[i] + ' ' + item + '</span></div>'; });
    html += '</div><div class="sg42-canvas-wrap"><canvas id="sg42-ready-cv" width="620" height="400"></canvas></div>';
    html += '<div style="text-align:center"><button class="sg42-btn" id="sg42-ready-save">라운드 준비 저장</button></div>';
    html += '<div class="sg42-info" id="sg42-ready-info"></div>';
    panel.innerHTML = html; ov.appendChild(panel);
    function drawDonut() {
      var cv = document.getElementById('sg42-ready-cv'), ctx = cv.getContext('2d');
      ctx.clearRect(0, 0, 620, 400); ctx.fillStyle = '#1a2332'; ctx.fillRect(0, 0, 620, 400);
      var count = checked.filter(function (c) { return c; }).length;
      var pct = count / 8;
      ctx.fillStyle = '#fff'; ctx.font = 'bold 14px sans-serif'; ctx.textAlign = 'center';
      ctx.fillText('라운드 준비도', 200, 30);
      // Donut
      var cx2 = 200, cy2 = 210, r = 100, thick = 30;
      ctx.beginPath(); ctx.arc(cx2, cy2, r, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(255,255,255,0.1)'; ctx.lineWidth = thick; ctx.stroke();
      if (pct > 0) { ctx.beginPath(); ctx.arc(cx2, cy2, r, -Math.PI / 2, -Math.PI / 2 + pct * Math.PI * 2); var gc = pct >= 0.875 ? '#4caf50' : pct >= 0.625 ? '#ff9800' : '#f44336'; ctx.strokeStyle = gc; ctx.lineWidth = thick; ctx.lineCap = 'round'; ctx.stroke(); ctx.lineCap = 'butt'; }
      ctx.fillStyle = '#fff'; ctx.font = 'bold 32px sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText(Math.round(pct * 100) + '%', cx2, cy2 - 8);
      ctx.font = '14px sans-serif'; ctx.fillText(gradeLetter(count, 8) + '등급', cx2, cy2 + 22);
      // Item status on right side
      ctx.textAlign = 'left'; ctx.font = '13px sans-serif';
      ITEMS.forEach(function (item, i) {
        var y = 60 + i * 40;
        ctx.fillStyle = checked[i] ? '#4caf50' : 'rgba(255,255,255,0.3)';
        ctx.fillText((checked[i] ? '✓ ' : '✗ ') + ICONS[i] + ' ' + item, 370, y);
      });
      // History
      var history = LS('ready_history') || [];
      if (history.length) { ctx.fillStyle = 'rgba(255,255,255,0.5)'; ctx.font = '10px sans-serif'; ctx.textAlign = 'center'; ctx.fillText('지난 ' + history.length + '회 평균 준비도: ' + Math.round(mean(history.map(function (h) { return h.pct; })) * 100) + '%', 310, 385); }
      var info = document.getElementById('sg42-ready-info');
      if (info) info.innerHTML = '체크: ' + count + '/8 | 준비도: <span class="' + gradeClass(count, 8) + '">' + Math.round(pct * 100) + '% (' + gradeLetter(count, 8) + ')</span>';
    }
    panel.querySelectorAll('.sg42-checklist-item').forEach(function (el) {
      el.addEventListener('click', function () {
        var idx = parseInt(el.getAttribute('data-idx'));
        checked[idx] = !checked[idx]; LS('ready_current', checked);
        el.classList.toggle('checked'); el.querySelector('.sg42-checklist-check').textContent = checked[idx] ? '✓' : '';
        playSFX('readyCheck'); drawDonut();
      });
    });
    document.getElementById('sg42-ready-save').addEventListener('click', function () {
      var count = checked.filter(function (c) { return c; }).length;
      var history = LS('ready_history') || [];
      history.push({ date: todayStr(), pct: count / 8 }); LS('ready_history', history);
      unlockAchievement('sg42_ready_checker'); showToast('준비도 저장 완료 (' + Math.round(count / 8 * 100) + '%)');
      checked = [false, false, false, false, false, false, false, false]; LS('ready_current', checked);
      drawDonut();
    });
    drawDonut();
  }

  // ═══════════════════════════════════════════
  // FEATURE 3: 개인 코스 리뷰 기록기 Canvas 640x400
  // ═══════════════════════════════════════════
  function openCourseReview() {
    playSFX('courseReview'); trackFeature('review');
    var ov = createOverlay('sg42-coursereview');
    var old = ov.querySelector('.sg42-panel'); if (old) old.remove();
    var panel = document.createElement('div'); panel.className = 'sg42-panel';
    var reviews = LS('reviews') || [];
    var selIdx = reviews.length ? reviews.length - 1 : -1;
    var AXES = ['난이도', '관리상태', '편의시설', '경치', '가성비'];
    var html = '<div class="sg42-title">⛳ 개인 코스 리뷰 기록기</div><div class="sg42-subtitle">코스별 5개 항목을 평가하고 레이더 차트로 시각화합니다</div>';
    html += '<div class="sg42-tabs" id="sg42-rev-tabs"></div>';
    html += '<div class="sg42-canvas-wrap"><canvas id="sg42-rev-cv" width="640" height="400"></canvas></div>';
    html += '<div style="border-top:1px solid var(--border,#e0e0e0);padding-top:12px;margin-top:12px">';
    html += '<div class="sg42-form-row"><span>코스명:</span> <input class="sg42-input sg42-input-wide" id="sg42-rev-name" placeholder="코스명 입력"></div>';
    AXES.forEach(function (ax, i) { html += '<div class="sg42-form-row"><span>' + ax + ':</span> <input type="number" min="1" max="5" class="sg42-input" id="sg42-rev-ax' + i + '" placeholder="1-5"></div>'; });
    html += '<div style="text-align:center"><button class="sg42-btn" id="sg42-rev-save">리뷰 저장</button></div></div>';
    html += '<div class="sg42-info" id="sg42-rev-info"></div>';
    panel.innerHTML = html; ov.appendChild(panel);
    function buildTabs() {
      var tabsEl = document.getElementById('sg42-rev-tabs'); tabsEl.innerHTML = '';
      reviews.forEach(function (r, i) {
        var btn = document.createElement('button'); btn.className = 'sg42-tab' + (i === selIdx ? ' active' : '');
        btn.textContent = r.name; btn.onclick = function () { selIdx = i; buildTabs(); drawReview(); playSFX('tabSwitch42'); };
        tabsEl.appendChild(btn);
      });
    }
    function drawReview() {
      var cv = document.getElementById('sg42-rev-cv'), ctx = cv.getContext('2d');
      ctx.clearRect(0, 0, 640, 400); ctx.fillStyle = '#1a3d1a'; ctx.fillRect(0, 0, 640, 400);
      ctx.fillStyle = '#fff'; ctx.font = 'bold 14px sans-serif'; ctx.textAlign = 'center';
      ctx.fillText('코스 리뷰 레이더', 320, 24);
      if (selIdx < 0 || !reviews.length) { emptyCanvasText(ctx, 640, 400, '기록을 추가하면 표시됩니다'); return; }
      var r = reviews[selIdx];
      drawRadar(ctx, 320, 220, 130, AXES, r.scores, 5);
      ctx.fillStyle = '#fff'; ctx.font = 'bold 13px sans-serif'; ctx.textAlign = 'center';
      ctx.fillText(r.name, 320, 50);
      ctx.font = '11px sans-serif'; ctx.fillStyle = 'rgba(255,255,255,0.6)';
      ctx.fillText(r.date, 320, 68);
      var avg = mean(r.scores);
      var info = document.getElementById('sg42-rev-info');
      if (info) info.innerHTML = '총 ' + reviews.length + '개 리뷰 | <b>' + r.name + '</b> 평균: <span class="' + gradeClass(avg, 5) + '">' + avg.toFixed(1) + '/5 (' + gradeLetter(avg, 5) + ')</span>';
    }
    document.getElementById('sg42-rev-save').addEventListener('click', function () {
      var name = document.getElementById('sg42-rev-name').value.trim();
      if (!name) { showToast('코스명을 입력하세요'); return; }
      var scores = [];
      for (var i = 0; i < 5; i++) { var v = parseInt(document.getElementById('sg42-rev-ax' + i).value) || 0; scores.push(Math.max(1, Math.min(5, v || 1))); }
      reviews.push({ name: name, scores: scores, date: todayStr() }); LS('reviews', reviews);
      selIdx = reviews.length - 1; buildTabs(); drawReview();
      unlockAchievement('sg42_course_reviewer'); showToast(name + ' 리뷰 저장 완료');
      document.getElementById('sg42-rev-name').value = '';
      for (var i = 0; i < 5; i++) document.getElementById('sg42-rev-ax' + i).value = '';
    });
    buildTabs(); drawReview();
  }

  // ═══════════════════════════════════════════
  // FEATURE 4: 라운드 복기 일지 Canvas 620x400
  // ═══════════════════════════════════════════
  function openRoundReflection() {
    playSFX('roundReflect'); trackFeature('reflect');
    var ov = createOverlay('sg42-reflect');
    var old = ov.querySelector('.sg42-panel'); if (old) old.remove();
    var panel = document.createElement('div'); panel.className = 'sg42-panel';
    var CATS = ['드라이버', '아이언', '숏게임', '퍼팅', '멘탈', '체력', '전략', '운'];
    var ratings = [0, 0, 0, 0, 0, 0, 0, 0];
    var history = LS('reflections') || [];
    var viewIdx = -1;
    var html = '<div class="sg42-title">📝 라운드 복기 일지</div><div class="sg42-subtitle">8개 카테고리별 1-5 별점 평가</div>';
    if (history.length) {
      html += '<div class="sg42-tabs" id="sg42-ref-tabs"></div>';
    }
    html += '<div class="sg42-canvas-wrap"><canvas id="sg42-ref-cv" width="620" height="400"></canvas></div>';
    html += '<div id="sg42-ref-form">';
    CATS.forEach(function (cat, i) {
      html += '<div class="sg42-form-row"><span style="min-width:70px">' + cat + ':</span><div class="sg42-stars" data-cat="' + i + '">';
      for (var s = 1; s <= 5; s++) html += '<span class="sg42-star" data-v="' + s + '">★</span>';
      html += '</div></div>';
    });
    html += '<div style="text-align:center"><button class="sg42-btn" id="sg42-ref-save">복기 저장</button></div></div>';
    html += '<div class="sg42-info" id="sg42-ref-info"></div>';
    panel.innerHTML = html; ov.appendChild(panel);
    function buildHistoryTabs() {
      var tabsEl = document.getElementById('sg42-ref-tabs'); if (!tabsEl) return; tabsEl.innerHTML = '';
      var btn0 = document.createElement('button'); btn0.className = 'sg42-tab' + (viewIdx === -1 ? ' active' : ''); btn0.textContent = '새 기록';
      btn0.onclick = function () { viewIdx = -1; ratings = [0, 0, 0, 0, 0, 0, 0, 0]; updateStars(); drawRefChart(); playSFX('tabSwitch42'); buildHistoryTabs(); };
      tabsEl.appendChild(btn0);
      history.slice(-5).forEach(function (h, i) {
        var realIdx = history.length - 5 + i; if (realIdx < 0) return;
        var btn = document.createElement('button'); btn.className = 'sg42-tab' + (viewIdx === realIdx ? ' active' : '');
        btn.textContent = history[realIdx].date;
        btn.onclick = function () { viewIdx = realIdx; ratings = history[realIdx].scores.slice(); updateStars(); drawRefChart(); playSFX('tabSwitch42'); buildHistoryTabs(); };
        tabsEl.appendChild(btn);
      });
    }
    function updateStars() {
      panel.querySelectorAll('.sg42-stars').forEach(function (el) {
        var cat = parseInt(el.getAttribute('data-cat'));
        el.querySelectorAll('.sg42-star').forEach(function (s) { s.classList.toggle('active', parseInt(s.getAttribute('data-v')) <= ratings[cat]); });
      });
    }
    function drawRefChart() {
      var cv = document.getElementById('sg42-ref-cv'), ctx = cv.getContext('2d');
      ctx.clearRect(0, 0, 620, 400); ctx.fillStyle = '#1a1a2e'; ctx.fillRect(0, 0, 620, 400);
      ctx.fillStyle = '#fff'; ctx.font = 'bold 14px sans-serif'; ctx.textAlign = 'center';
      ctx.fillText('라운드 복기 평가', 310, 24);
      var hasData = ratings.some(function (r) { return r > 0; });
      if (!hasData) { emptyCanvasText(ctx, 620, 400, '기록을 추가하면 표시됩니다'); return; }
      var barW = 50, gap = 18, startX = 40;
      ctx.strokeStyle = 'rgba(255,255,255,0.1)';
      for (var g = 1; g <= 5; g++) { var y = 350 - (g / 5) * 280; ctx.beginPath(); ctx.moveTo(30, y); ctx.lineTo(600, y); ctx.stroke(); ctx.fillStyle = 'rgba(255,255,255,0.4)'; ctx.font = '9px sans-serif'; ctx.textAlign = 'right'; ctx.fillText(g, 26, y + 3); }
      var colors = ['#e91e63', '#2196f3', '#ff9800', '#4caf50', '#9c27b0', '#00bcd4', '#ff5722', '#607d8b'];
      CATS.forEach(function (cat, i) {
        var x = startX + i * (barW + gap); var h = (ratings[i] / 5) * 280; var y = 350 - h;
        var grd = ctx.createLinearGradient(x, y, x, 350); grd.addColorStop(0, colors[i]); grd.addColorStop(1, colors[i] + '66');
        ctx.fillStyle = grd; ctx.beginPath(); ctx.roundRect(x, y, barW, h, [4, 4, 0, 0]); ctx.fill();
        ctx.fillStyle = '#fff'; ctx.font = 'bold 14px sans-serif'; ctx.textAlign = 'center'; ctx.fillText(ratings[i], x + barW / 2, y - 8);
        ctx.fillStyle = 'rgba(255,255,255,0.8)'; ctx.font = '10px sans-serif'; ctx.fillText(cat, x + barW / 2, 368);
      });
      var avg = mean(ratings.filter(function (r) { return r > 0; }));
      var info = document.getElementById('sg42-ref-info');
      if (info) info.innerHTML = '평균: <span class="' + gradeClass(avg, 5) + '">' + avg.toFixed(1) + '/5 (' + gradeLetter(avg, 5) + ')</span> | 기록 히스토리: ' + history.length + '회';
    }
    panel.querySelectorAll('.sg42-stars').forEach(function (el) {
      el.querySelectorAll('.sg42-star').forEach(function (star) {
        star.addEventListener('click', function () {
          var cat = parseInt(el.getAttribute('data-cat'));
          var val = parseInt(star.getAttribute('data-v'));
          ratings[cat] = val; updateStars(); drawRefChart(); playSFX('tempoTap');
        });
      });
    });
    document.getElementById('sg42-ref-save').addEventListener('click', function () {
      if (!ratings.some(function (r) { return r > 0; })) { showToast('평가를 입력하세요'); return; }
      history.push({ date: todayStr(), scores: ratings.slice() }); LS('reflections', history);
      unlockAchievement('sg42_round_reflect'); showToast('복기 일지 저장 완료');
      ratings = [0, 0, 0, 0, 0, 0, 0, 0]; updateStars(); drawRefChart();
    });
    if (history.length) buildHistoryTabs();
    drawRefChart();
  }

  // ═══════════════════════════════════════════
  // FEATURE 5: 연습 세션 로거 Canvas 620x400
  // ═══════════════════════════════════════════
  function openPracticeLogger() {
    playSFX('practiceLog'); trackFeature('practice');
    var ov = createOverlay('sg42-practice');
    var old = ov.querySelector('.sg42-panel'); if (old) old.remove();
    var panel = document.createElement('div'); panel.className = 'sg42-panel';
    var TYPES = ['레인지', '퍼팅', '칩/숏게임', '코스', '피트니스'];
    var html = '<div class="sg42-title">💪 연습 세션 로거</div><div class="sg42-subtitle">연습 유형, 시간, 날짜를 기록합니다</div>';
    html += '<div class="sg42-form-row"><select class="sg42-select" id="sg42-pr-type">';
    TYPES.forEach(function (t) { html += '<option value="' + t + '">' + t + '</option>'; });
    html += '</select><input type="number" class="sg42-input" id="sg42-pr-dur" placeholder="분" min="1"><input type="date" class="sg42-input sg42-input-wide" id="sg42-pr-date" value="' + todayStr() + '"><button class="sg42-btn" id="sg42-pr-add">추가</button></div>';
    html += '<div class="sg42-canvas-wrap"><canvas id="sg42-pr-cv" width="620" height="400"></canvas></div>';
    html += '<div class="sg42-info" id="sg42-pr-info"></div>';
    panel.innerHTML = html; ov.appendChild(panel);
    function drawPractice() {
      var cv = document.getElementById('sg42-pr-cv'), ctx = cv.getContext('2d');
      ctx.clearRect(0, 0, 620, 400); ctx.fillStyle = '#0d1b2a'; ctx.fillRect(0, 0, 620, 400);
      var sessions = LS('practice') || [];
      ctx.fillStyle = '#fff'; ctx.font = 'bold 14px sans-serif'; ctx.textAlign = 'center';
      ctx.fillText('주간 연습 히트맵', 310, 24);
      if (!sessions.length) { emptyCanvasText(ctx, 620, 400, '기록을 추가하면 표시됩니다'); return; }
      // Build 7-day heatmap
      var today = new Date(), days = [], dayNames = ['일', '월', '화', '수', '목', '금', '토'];
      for (var d = 6; d >= 0; d--) { var dt = new Date(today); dt.setDate(dt.getDate() - d); days.push({ str: dt.getFullYear() + '-' + pad2(dt.getMonth() + 1) + '-' + pad2(dt.getDate()), name: dayNames[dt.getDay()], short: pad2(dt.getMonth() + 1) + '/' + pad2(dt.getDate()) }); }
      var heatmap = {};
      sessions.forEach(function (s) { var key = s.date + '_' + s.type; heatmap[key] = (heatmap[key] || 0) + s.duration; });
      var maxDur = 1;
      Object.keys(heatmap).forEach(function (k) { maxDur = Math.max(maxDur, heatmap[k]); });
      var cellW = 65, cellH = 40, startX = 130, startY = 60;
      // Column headers (days)
      ctx.fillStyle = 'rgba(255,255,255,0.7)'; ctx.font = '10px sans-serif'; ctx.textAlign = 'center';
      days.forEach(function (day, i) { ctx.fillText(day.name + '\n' + day.short, startX + i * cellW + cellW / 2, startY - 12); });
      // Row headers (types)
      ctx.textAlign = 'right';
      TYPES.forEach(function (t, i) { ctx.fillStyle = 'rgba(255,255,255,0.7)'; ctx.font = '11px sans-serif'; ctx.fillText(t, startX - 10, startY + i * cellH + cellH / 2 + 4); });
      // Cells
      days.forEach(function (day, di) {
        TYPES.forEach(function (t, ti) {
          var dur = heatmap[day.str + '_' + t] || 0;
          var intensity = dur / maxDur;
          var x = startX + di * cellW + 1, y = startY + ti * cellH + 1, w = cellW - 2, h = cellH - 2;
          if (dur > 0) { ctx.fillStyle = 'rgba(76,175,80,' + (0.2 + intensity * 0.8) + ')'; } else { ctx.fillStyle = 'rgba(255,255,255,0.05)'; }
          ctx.fillRect(x, y, w, h);
          if (dur > 0) { ctx.fillStyle = '#fff'; ctx.font = '10px sans-serif'; ctx.textAlign = 'center'; ctx.fillText(dur + '분', x + w / 2, y + h / 2 + 3); }
        });
      });
      // Stats
      var dateSet = {}, totalMin = 0;
      sessions.forEach(function (s) { dateSet[s.date] = true; totalMin += s.duration; });
      var uniqueDates = Object.keys(dateSet).sort().reverse();
      var streak = 0, checkDate = new Date(today);
      for (var i = 0; i < 365; i++) { var ds = checkDate.getFullYear() + '-' + pad2(checkDate.getMonth() + 1) + '-' + pad2(checkDate.getDate()); if (dateSet[ds]) { streak++; checkDate.setDate(checkDate.getDate() - 1); } else break; }
      if (streak >= 3) unlockAchievement('sg42_streak_3');
      var statsY = startY + TYPES.length * cellH + 30;
      ctx.fillStyle = '#fff'; ctx.font = 'bold 13px sans-serif'; ctx.textAlign = 'center';
      ctx.fillText('연속 연습: ' + streak + '일 | 총 세션: ' + sessions.length + '회 | 총 시간: ' + Math.round(totalMin / 60 * 10) / 10 + '시간', 310, statsY);
      var info = document.getElementById('sg42-pr-info');
      if (info) info.innerHTML = '연속 연습 ' + streak + '일 | 총 ' + sessions.length + '세션 | ' + Math.round(totalMin / 60 * 10) / 10 + '시간';
    }
    document.getElementById('sg42-pr-add').addEventListener('click', function () {
      var type = document.getElementById('sg42-pr-type').value;
      var dur = parseInt(document.getElementById('sg42-pr-dur').value);
      var date = document.getElementById('sg42-pr-date').value || todayStr();
      if (!dur || dur <= 0) { showToast('연습 시간을 입력하세요'); return; }
      var sessions = LS('practice') || [];
      sessions.push({ type: type, duration: dur, date: date }); LS('practice', sessions);
      unlockAchievement('sg42_practice_logger'); showToast(type + ' ' + dur + '분 기록 완료');
      document.getElementById('sg42-pr-dur').value = '';
      drawPractice();
    });
    drawPractice();
  }

  // ═══════════════════════════════════════════
  // FEATURE 6: 라운드 목표 트래커 Canvas 640x400
  // ═══════════════════════════════════════════
  function openGoalTracker() {
    playSFX('goalTrack'); trackFeature('goal');
    var ov = createOverlay('sg42-goal');
    var old = ov.querySelector('.sg42-panel'); if (old) old.remove();
    var panel = document.createElement('div'); panel.className = 'sg42-panel';
    var METRICS = [{ key: 'score', name: '목표스코어', unit: '타' }, { key: 'fir', name: 'FIR%', unit: '%' }, { key: 'gir', name: 'GIR%', unit: '%' }, { key: 'putts', name: '평균퍼트수', unit: '개' }, { key: 'parsave', name: '파세이브%', unit: '%' }];
    var saved = LS('goals') || {};
    var html = '<div class="sg42-title">🎯 라운드 목표 트래커</div><div class="sg42-subtitle">목표를 설정하고 실제 성적을 비교합니다</div>';
    html += '<table style="width:100%;border-collapse:collapse;margin:8px 0;font-size:0.85em"><tr style="border-bottom:1px solid var(--border,#e0e0e0)"><th style="padding:6px">항목</th><th>목표</th><th>실제</th></tr>';
    METRICS.forEach(function (m) {
      var g = saved[m.key + '_goal'] || ''; var a = saved[m.key + '_actual'] || '';
      html += '<tr style="border-bottom:1px solid var(--border,#e0e0e0)"><td style="padding:6px">' + m.name + ' (' + m.unit + ')</td><td><input type="number" class="sg42-input" id="sg42-g-' + m.key + '" value="' + g + '" placeholder="목표"></td><td><input type="number" class="sg42-input" id="sg42-a-' + m.key + '" value="' + a + '" placeholder="실제"></td></tr>';
    });
    html += '</table><div style="text-align:center"><button class="sg42-btn" id="sg42-goal-save">저장 및 비교</button></div>';
    html += '<div class="sg42-canvas-wrap"><canvas id="sg42-goal-cv" width="640" height="400"></canvas></div>';
    html += '<div class="sg42-info" id="sg42-goal-info"></div>';
    panel.innerHTML = html; ov.appendChild(panel);
    function drawGoalChart() {
      var cv = document.getElementById('sg42-goal-cv'), ctx = cv.getContext('2d');
      ctx.clearRect(0, 0, 640, 400); ctx.fillStyle = '#16213e'; ctx.fillRect(0, 0, 640, 400);
      ctx.fillStyle = '#fff'; ctx.font = 'bold 14px sans-serif'; ctx.textAlign = 'center';
      ctx.fillText('목표 vs 실제 비교', 320, 24);
      var data = LS('goals') || {};
      var hasData = METRICS.some(function (m) { return data[m.key + '_goal'] && data[m.key + '_actual']; });
      if (!hasData) { emptyCanvasText(ctx, 640, 400, '기록을 추가하면 표시됩니다'); return; }
      var barW = 30, groupW = 90, startX = 70;
      // Find max value for scaling
      var maxVal = 1;
      METRICS.forEach(function (m) { maxVal = Math.max(maxVal, Number(data[m.key + '_goal']) || 0, Number(data[m.key + '_actual']) || 0); });
      ctx.strokeStyle = 'rgba(255,255,255,0.1)';
      for (var i = 0; i <= 4; i++) { var y = 350 - (i / 4) * 280; ctx.beginPath(); ctx.moveTo(50, y); ctx.lineTo(610, y); ctx.stroke(); }
      var achievePcts = [];
      METRICS.forEach(function (m, i) {
        var goal = Number(data[m.key + '_goal']) || 0;
        var actual = Number(data[m.key + '_actual']) || 0;
        if (!goal && !actual) return;
        var x = startX + i * groupW;
        // Goal bar
        var h1 = (goal / maxVal) * 280; var y1 = 350 - h1;
        ctx.fillStyle = 'rgba(33,150,243,0.7)';
        ctx.beginPath(); ctx.roundRect(x, y1, barW, h1, [4, 4, 0, 0]); ctx.fill();
        ctx.fillStyle = '#fff'; ctx.font = '9px sans-serif'; ctx.textAlign = 'center'; ctx.fillText(goal, x + barW / 2, y1 - 5);
        // Actual bar
        var h2 = (actual / maxVal) * 280; var y2 = 350 - h2;
        ctx.fillStyle = actual >= goal ? 'rgba(76,175,80,0.8)' : 'rgba(244,67,54,0.7)';
        ctx.beginPath(); ctx.roundRect(x + barW + 4, y2, barW, h2, [4, 4, 0, 0]); ctx.fill();
        ctx.fillStyle = '#fff'; ctx.fillText(actual, x + barW + 4 + barW / 2, y2 - 5);
        // Label
        ctx.fillStyle = 'rgba(255,255,255,0.8)'; ctx.font = '10px sans-serif'; ctx.fillText(m.name, x + barW + 2, 370);
        // Achievement %
        if (goal > 0) {
          var pct;
          if (m.key === 'score' || m.key === 'putts') { pct = actual <= goal ? 100 : Math.max(0, 100 - (actual - goal) * 5); }
          else { pct = Math.min(100, (actual / goal) * 100); }
          achievePcts.push(pct);
          ctx.fillStyle = pct >= 90 ? '#4caf50' : pct >= 70 ? '#ff9800' : '#f44336';
          ctx.font = 'bold 10px sans-serif'; ctx.fillText(Math.round(pct) + '%', x + barW + 2, 385);
        }
      });
      // Legend
      ctx.fillStyle = 'rgba(33,150,243,0.7)'; ctx.fillRect(460, 50, 12, 10);
      ctx.fillStyle = '#fff'; ctx.font = '10px sans-serif'; ctx.textAlign = 'left'; ctx.fillText('목표', 476, 59);
      ctx.fillStyle = 'rgba(76,175,80,0.8)'; ctx.fillRect(460, 68, 12, 10);
      ctx.fillStyle = '#fff'; ctx.fillText('실제', 476, 77);
      var overall = achievePcts.length ? Math.round(mean(achievePcts)) : 0;
      if (overall >= 90) unlockAchievement('sg42_goal_achiever');
      var info = document.getElementById('sg42-goal-info');
      if (info && achievePcts.length) info.innerHTML = '종합 달성률: <span class="' + gradeClass(overall, 100) + '">' + overall + '% (' + gradeLetter(overall, 100) + ')</span>';
    }
    document.getElementById('sg42-goal-save').addEventListener('click', function () {
      var data = {};
      METRICS.forEach(function (m) { data[m.key + '_goal'] = Number(document.getElementById('sg42-g-' + m.key).value) || 0; data[m.key + '_actual'] = Number(document.getElementById('sg42-a-' + m.key).value) || 0; });
      LS('goals', data); unlockAchievement('sg42_goal_tracker');
      showToast('목표 저장 완료'); drawGoalChart();
    });
    drawGoalChart();
  }

  // ═══════════════════════════════════════════
  // FEATURE 7: 클럽 가방 구성기 Canvas 620x400
  // ═══════════════════════════════════════════
  function openClubBag() {
    playSFX('bagBuild'); trackFeature('bag');
    var ov = createOverlay('sg42-bag');
    var old = ov.querySelector('.sg42-panel'); if (old) old.remove();
    var panel = document.createElement('div'); panel.className = 'sg42-panel';
    var CLUB_TYPES = ['Driver', '3W', '5W', 'Hybrid', '3I', '4I', '5I', '6I', '7I', '8I', '9I', 'PW', 'AW', 'SW', 'LW', 'Putter'];
    var clubs = LS('clubbag') || [];
    var html = '<div class="sg42-title">🏌️ 클럽 가방 구성기</div><div class="sg42-subtitle">최대 14개 클럽을 등록하고 로프트 간격을 분석합니다</div>';
    html += '<div class="sg42-form-row"><select class="sg42-select" id="sg42-bag-type">';
    CLUB_TYPES.forEach(function (t) { html += '<option value="' + t + '">' + t + '</option>'; });
    html += '</select><input class="sg42-input" id="sg42-bag-nick" placeholder="별명"><input type="number" class="sg42-input" id="sg42-bag-loft" placeholder="로프트(°)" min="1" max="64">';
    html += '<button class="sg42-btn" id="sg42-bag-add">추가</button></div>';
    html += '<div id="sg42-bag-list" style="max-height:120px;overflow-y:auto;margin:8px 0;font-size:0.82em"></div>';
    html += '<div class="sg42-canvas-wrap"><canvas id="sg42-bag-cv" width="620" height="400"></canvas></div>';
    html += '<div class="sg42-info" id="sg42-bag-info">일반 참고 로프트각 · 내 클럽 설정에 따라 다름</div>';
    panel.innerHTML = html; ov.appendChild(panel);
    function renderList() {
      var listEl = document.getElementById('sg42-bag-list'); listEl.innerHTML = '';
      clubs.forEach(function (c, i) {
        var div = document.createElement('div');
        div.style.cssText = 'display:flex;align-items:center;gap:8px;padding:4px 8px;border-bottom:1px solid var(--border,#e0e0e0)';
        div.innerHTML = '<span style="flex:1">' + c.type + (c.nick ? ' (' + c.nick + ')' : '') + ' - ' + c.loft + '°</span>';
        var delBtn = document.createElement('button'); delBtn.className = 'sg42-btn sg42-btn-danger'; delBtn.textContent = '삭제'; delBtn.style.cssText = 'padding:2px 8px;font-size:0.75em';
        delBtn.addEventListener('click', function () { clubs.splice(i, 1); LS('clubbag', clubs); renderList(); drawBag(); });
        div.appendChild(delBtn); listEl.appendChild(div);
      });
    }
    function drawBag() {
      var cv = document.getElementById('sg42-bag-cv'), ctx = cv.getContext('2d');
      ctx.clearRect(0, 0, 620, 400); ctx.fillStyle = '#1a2332'; ctx.fillRect(0, 0, 620, 400);
      ctx.fillStyle = '#fff'; ctx.font = 'bold 14px sans-serif'; ctx.textAlign = 'center';
      ctx.fillText('클럽 가방 구성 (' + clubs.length + '/14)', 310, 24);
      if (!clubs.length) { emptyCanvasText(ctx, 620, 400, '기록을 추가하면 표시됩니다'); return; }
      var sorted = clubs.slice().sort(function (a, b) { return a.loft - b.loft; });
      var startY = 50, rowH = Math.min(24, (340 / sorted.length));
      var maxLoft = sorted[sorted.length - 1].loft || 64;
      var barStartX = 180, barMaxW = 380;
      sorted.forEach(function (c, i) {
        var y = startY + i * rowH;
        var barW = (c.loft / maxLoft) * barMaxW;
        // Club label
        ctx.fillStyle = 'rgba(255,255,255,0.8)'; ctx.font = '11px sans-serif'; ctx.textAlign = 'right';
        ctx.fillText(c.type + (c.nick ? '(' + c.nick + ')' : ''), barStartX - 10, y + rowH / 2 + 3);
        // Bar
        var grd = ctx.createLinearGradient(barStartX, y, barStartX + barW, y);
        grd.addColorStop(0, '#4caf50'); grd.addColorStop(1, '#1b5e20');
        ctx.fillStyle = grd;
        ctx.beginPath(); ctx.roundRect(barStartX, y + 2, barW, rowH - 4, 4); ctx.fill();
        // Loft label
        ctx.fillStyle = '#fff'; ctx.font = '10px sans-serif'; ctx.textAlign = 'left';
        ctx.fillText(c.loft + '°', barStartX + barW + 6, y + rowH / 2 + 3);
        // Gap analysis (distance to next club's loft)
        if (i < sorted.length - 1) {
          var gap = sorted[i + 1].loft - c.loft;
          var gapColor = gap >= 3 && gap <= 5 ? '#4caf50' : gap > 5 ? '#f44336' : '#ff9800';
          ctx.fillStyle = gapColor; ctx.font = '9px sans-serif'; ctx.textAlign = 'right';
          ctx.fillText('Δ' + gap + '°', barStartX - 50, y + rowH + 2);
        }
      });
      // Gap analysis legend
      ctx.font = '10px sans-serif'; ctx.textAlign = 'center';
      ctx.fillStyle = '#4caf50'; ctx.fillText('● 3-5° 적정', 440, 385);
      ctx.fillStyle = '#ff9800'; ctx.fillText('● <3° 좁음', 510, 385);
      ctx.fillStyle = '#f44336'; ctx.fillText('● >5° 넓음', 580, 385);
      var info = document.getElementById('sg42-bag-info');
      var gaps = []; for (var i = 0; i < sorted.length - 1; i++) gaps.push(sorted[i + 1].loft - sorted[i].loft);
      if (gaps.length) { var avgGap = mean(gaps); var maxGap = Math.max.apply(null, gaps); info.innerHTML = clubs.length + '/14개 | 평균간격: ' + avgGap.toFixed(1) + '° | 최대간격: ' + maxGap + '° | 일반 참고 로프트각 · 내 클럽 설정에 따라 다름'; }
    }
    document.getElementById('sg42-bag-add').addEventListener('click', function () {
      if (clubs.length >= 14) { showToast('최대 14개까지 등록 가능합니다'); return; }
      var type = document.getElementById('sg42-bag-type').value;
      var nick = document.getElementById('sg42-bag-nick').value.trim();
      var loft = parseInt(document.getElementById('sg42-bag-loft').value);
      if (!loft || loft <= 0) { showToast('로프트각을 입력하세요'); return; }
      clubs.push({ type: type, nick: nick, loft: loft }); LS('clubbag', clubs);
      unlockAchievement('sg42_bag_builder'); showToast(type + ' 추가 완료');
      document.getElementById('sg42-bag-nick').value = ''; document.getElementById('sg42-bag-loft').value = '';
      renderList(); drawBag();
    });
    renderList(); drawBag();
  }

  // ═══════════════════════════════════════════
  // FEATURE 8: 종합 월간 셀프 진단 Canvas 620x400
  // ═══════════════════════════════════════════
  function openMonthlySelfDiag() {
    playSFX('selfDiag'); trackFeature('diag');
    var ov = createOverlay('sg42-selfdiag');
    var old = ov.querySelector('.sg42-panel'); if (old) old.remove();
    var panel = document.createElement('div'); panel.className = 'sg42-panel';
    var AXES = ['드라이버', '아이언', '숏게임', '퍼팅', '체력', '멘탈', '코스관리', '연습량'];
    var WEIGHTS = [15, 15, 15, 15, 10, 10, 10, 10];
    var diagHistory = LS('diaghistory') || {};
    var curMonth = monthStr();
    var scores = diagHistory[curMonth] || [0, 0, 0, 0, 0, 0, 0, 0];
    var html = '<div class="sg42-title">📊 종합 월간 셀프 진단</div><div class="sg42-subtitle">8개 축을 1-10점으로 평가하세요 (' + curMonth + ')</div>';
    AXES.forEach(function (ax, i) {
      html += '<div class="sg42-form-row"><span style="min-width:80px">' + ax + ':</span><input type="number" min="1" max="10" class="sg42-input sg42-diag-score" data-idx="' + i + '" value="' + (scores[i] || '') + '" placeholder="1-10"></div>';
    });
    html += '<div style="text-align:center"><button class="sg42-btn" id="sg42-diag-save">진단 저장</button></div>';
    html += '<div class="sg42-tabs" id="sg42-diag-tabs"></div>';
    html += '<div class="sg42-canvas-wrap"><canvas id="sg42-diag-cv" width="620" height="400"></canvas></div>';
    html += '<div class="sg42-info" id="sg42-diag-info"></div>';
    panel.innerHTML = html; ov.appendChild(panel);
    var viewMonth = curMonth;
    function buildMonthTabs() {
      var tabsEl = document.getElementById('sg42-diag-tabs'); tabsEl.innerHTML = '';
      var months = Object.keys(diagHistory).sort().reverse().slice(0, 6);
      if (months.indexOf(curMonth) < 0) months.unshift(curMonth);
      months.forEach(function (m) {
        var btn = document.createElement('button'); btn.className = 'sg42-tab' + (viewMonth === m ? ' active' : '');
        btn.textContent = m; btn.onclick = function () { viewMonth = m; buildMonthTabs(); drawDiag(); playSFX('tabSwitch42'); };
        tabsEl.appendChild(btn);
      });
    }
    function drawDiag() {
      var cv = document.getElementById('sg42-diag-cv'), ctx = cv.getContext('2d');
      ctx.clearRect(0, 0, 620, 400); ctx.fillStyle = '#1a1a2e'; ctx.fillRect(0, 0, 620, 400);
      var data = diagHistory[viewMonth] || [];
      var hasData = data.some(function (v) { return v > 0; });
      ctx.fillStyle = '#fff'; ctx.font = 'bold 14px sans-serif'; ctx.textAlign = 'center';
      ctx.fillText('월간 셀프 진단: ' + viewMonth, 310, 24);
      if (!hasData) { emptyCanvasText(ctx, 620, 400, '기록을 추가하면 표시됩니다'); return; }
      // Radar chart (left half)
      drawRadar(ctx, 200, 200, 120, AXES, data, 10);
      // Half-circle gauge (right half) — weighted overall score
      var weighted = 0, totalW = 0;
      data.forEach(function (v, i) { weighted += (v || 0) * WEIGHTS[i]; totalW += WEIGHTS[i]; });
      var overall = totalW > 0 ? Math.round(weighted / totalW * 10) : 0;
      var gCx = 480, gCy = 260, gR = 70;
      ctx.beginPath(); ctx.arc(gCx, gCy, gR, Math.PI, 2 * Math.PI, false);
      ctx.strokeStyle = 'rgba(255,255,255,0.1)'; ctx.lineWidth = 16; ctx.stroke();
      if (overall > 0) {
        var pct = Math.min(overall, 100) / 100;
        ctx.beginPath(); ctx.arc(gCx, gCy, gR, Math.PI, Math.PI + pct * Math.PI, false);
        ctx.strokeStyle = overall >= 80 ? '#4caf50' : overall >= 60 ? '#ff9800' : '#f44336';
        ctx.lineWidth = 16; ctx.lineCap = 'round'; ctx.stroke(); ctx.lineCap = 'butt';
      }
      ctx.fillStyle = '#fff'; ctx.font = 'bold 22px sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'bottom';
      ctx.fillText(overall + '/100', gCx, gCy - 8);
      ctx.font = '12px sans-serif'; ctx.textBaseline = 'top';
      ctx.fillText('종합점수 (' + gradeLetter(overall, 100) + ')', gCx, gCy + 8);
      // Trend (last 6 months mini line chart)
      var allMonths = Object.keys(diagHistory).sort().slice(-6);
      if (allMonths.length > 1) {
        var tY = 320, tH = 50, tX = 380, tW = 200;
        ctx.fillStyle = 'rgba(255,255,255,0.5)'; ctx.font = '10px sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.fillText('월별 추이', tX + tW / 2, tY - 10);
        ctx.beginPath();
        allMonths.forEach(function (m, i) {
          var d = diagHistory[m] || [];
          var w2 = 0, tw2 = 0;
          d.forEach(function (v, j) { w2 += (v || 0) * WEIGHTS[j]; tw2 += WEIGHTS[j]; });
          var sc = tw2 > 0 ? (w2 / tw2 * 10) : 0;
          var x = tX + (i / Math.max(1, allMonths.length - 1)) * tW;
          var y = tY + tH - (sc / 100) * tH;
          if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        });
        ctx.strokeStyle = '#4caf50'; ctx.lineWidth = 2; ctx.stroke();
        allMonths.forEach(function (m, i) {
          var x = tX + (i / Math.max(1, allMonths.length - 1)) * tW;
          ctx.fillStyle = 'rgba(255,255,255,0.4)'; ctx.font = '8px sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'top';
          ctx.fillText(m.slice(5), x, tY + tH + 4);
        });
      }
      var info = document.getElementById('sg42-diag-info');
      if (info) info.innerHTML = viewMonth + ' 종합: <span class="' + gradeClass(overall, 100) + '">' + overall + '/100 (' + gradeLetter(overall, 100) + ')</span> | 가중치 적용 (드라이버/아이언/숏게임/퍼팅 15%, 나머지 10%)';
    }
    document.getElementById('sg42-diag-save').addEventListener('click', function () {
      var newScores = [];
      panel.querySelectorAll('.sg42-diag-score').forEach(function (el) {
        var v = parseInt(el.value) || 0; newScores.push(Math.max(0, Math.min(10, v)));
      });
      if (!newScores.some(function (v) { return v > 0; })) { showToast('점수를 입력하세요'); return; }
      diagHistory[curMonth] = newScores; LS('diaghistory', diagHistory);
      unlockAchievement('sg42_self_diagnosis'); showToast(curMonth + ' 진단 저장 완료');
      viewMonth = curMonth; buildMonthTabs(); drawDiag();
    });
    buildMonthTabs(); drawDiag();
  }

  // ═══════════════════════════════════════════
  // GOLF IQ v26 (15 questions)
  // ═══════════════════════════════════════════
  function openGolfIQv26() {
    playSFX('quiz42'); unlockAchievement('sg42_iq_v26');
    var ov = createOverlay('sg42-iq26');
    var old = ov.querySelector('.sg42-panel'); if (old) old.remove();
    var panel = document.createElement('div'); panel.className = 'sg42-panel';
    var questions = [
      { q: "골프에서 '도그레그(Dogleg)'란?", o: ['그린 주변이 경사진 홀', '페어웨이가 좌우로 꺾이는 홀 형태', '티에서 그린까지 직선인 홀', '워터 해저드가 있는 홀'], a: 1 },
      { q: '2019년 룰 개정 후 벙커에서 연습 스윙 시 모래를 건드리면?', o: ['2벌타 페널티', '1벌타 페널티', '페널티 없음 (단, 볼 앞뒤 모래 테스트는 금지)', '즉시 실격'], a: 2 },
      { q: '일반적으로 로프트각이 가장 큰 웨지는?', o: ['피칭 웨지(PW, 약 44-48°)', '샌드 웨지(SW, 약 54-58°)', '로브 웨지(LW, 약 58-64°)', '어프로치 웨지(AW, 약 50-52°)'], a: 2 },
      { q: '골프공 표면의 딤플의 주된 역할은?', o: ['디자인 미관을 위해', '그린 위에서 브레이크를 줄이기 위해', '공기 저항을 줄이고 양력을 발생시켜 비거리 증가', '잡을 때 미끄러지지 않기 위해'], a: 2 },
      { q: "'알바트로스(Albatross)'는 해당 홀 파 대비 몇 타?", o: ['파보다 1타 적음 (-1)', '파보다 2타 적음 (-2)', '파보다 3타 적음 (-3)', '파보다 4타 적음 (-4)'], a: 2 },
      { q: 'USGA 규정상 캐디백에 넣을 수 있는 최대 클럽 수는?', o: ['12개', '13개', '14개', '제한 없음'], a: 2 },
      { q: "'스크래치 골퍼'란?", o: ['핸디캡이 10인 골퍼', '핸디캡이 0인 골퍼', '프로 투어 선수', '시니어 투어 선수'], a: 1 },
      { q: "골프에서 '레이업(Lay-up)'이란?", o: ['볼을 높이 띄우는 샷', '해저드를 피해 의도적으로 짧게 치는 전략적 샷', '벙커에서 탈출하는 샷', '그린 위에서 치는 샷'], a: 1 },
      { q: '드라이버의 일반적인 로프트각 범위는?', o: ['3° ~ 6°', '8.5° ~ 12°', '14° ~ 18°', '20° ~ 24°'], a: 1 },
      { q: '그린 위 볼 마크를 수리할 때 올바른 방법은?', o: ['포크로 들어 올리기', '가장자리에서 안쪽으로 밀어 올림', '밟아서 평평하게 누르기', '볼을 올려놓고 흠을 채우기'], a: 1 },
      { q: "퍼팅에서 '브레이크(Break)'란?", o: ['퍼터가 부러지는 것', '그린 경사에 의해 공이 꺾이는 정도', '퍼팅 전 잠시 멈추는 것', '스트로크 중간에 멈추는 것'], a: 1 },
      { q: 'OB(아웃 오브 바운즈) 페널티 처리는?', o: ['벌타 없이 드롭', '1벌타, 원래 위치에서 다시 침', '2벌타, OB 지점에서 드롭', '1벌타, OB 지점에서 드롭'], a: 1 },
      { q: '매치 플레이와 스트로크 플레이의 근본적 차이는?', o: ['클럽 수 제한이 다름', '매치는 홀별 승패, 스트로크는 총 타수', '라운드 수가 다름', '사용 티 종류가 다름'], a: 1 },
      { q: '골프 코스 해저드의 2019년 이후 공식 명칭은?', o: ['워터 해저드', '레터럴 워터', '페널티 구역(Penalty Area)', '위험 구역'], a: 2 },
      { q: '피치 샷과 칩 샷의 주요 차이는?', o: ['피치는 웨지, 칩은 아이언으로만 침', '피치는 높이 띄워 멈추고, 칩은 낮게 굴림', '둘 다 같은 높이로 침', '피치는 백스윙 없이 침'], a: 1 }
    ];
    var currentQ = 0, score = 0, answered = [];
    function renderQuiz() {
      var q = questions[currentQ];
      var html = '<div class="sg42-title">🧪 Golf IQ v26</div>';
      html += '<div class="sg42-subtitle">문제 ' + (currentQ + 1) + '/15 | 점수: ' + score + '</div>';
      html += '<div style="padding:12px;font-size:0.95em;font-weight:600;margin:8px 0">' + q.q + '</div>';
      q.o.forEach(function (opt, oi) {
        var cls = 'sg42-quiz-opt';
        if (answered[currentQ] !== undefined) {
          if (oi === q.a) cls += ' correct';
          else if (oi === answered[currentQ] && oi !== q.a) cls += ' wrong';
        }
        html += '<button class="' + cls + '" data-oi="' + oi + '">' + (oi + 1) + '. ' + opt + '</button>';
      });
      if (answered[currentQ] !== undefined && currentQ < 14) {
        html += '<div style="text-align:center;margin-top:12px"><button class="sg42-btn" id="sg42-next-q">다음 →</button></div>';
      } else if (currentQ === 14 && answered[currentQ] !== undefined) {
        html += '<div style="text-align:center;margin-top:16px;font-size:1.1em"><b>최종점수: ' + score + '/15 (' + gradeLetter(score, 15) + ')</b></div>';
        if (score === 15) unlockAchievement('sg42_iq_perfect');
      }
      panel.innerHTML = html;
      panel.querySelectorAll('.sg42-quiz-opt').forEach(function (btn) {
        btn.addEventListener('click', function () {
          if (answered[currentQ] !== undefined) return;
          var oi = parseInt(btn.getAttribute('data-oi'));
          answered[currentQ] = oi;
          if (oi === q.a) { score++; playSFX('correct42'); } else { playSFX('wrong42'); }
          renderQuiz();
        });
      });
      var nextBtn = panel.querySelector('#sg42-next-q');
      if (nextBtn) nextBtn.addEventListener('click', function () { currentQ++; renderQuiz(); playSFX('tabSwitch42'); });
    }
    ov.appendChild(panel);
    renderQuiz();
  }

  // ── Navigation: append 9 buttons to existing sg30-bottom-bar ──
  var navItems = [
    { icon: '⏱️', label: '템포측정', fn: openSwingTempo },
    { icon: '✅', label: '준비도', fn: openRoundReadiness },
    { icon: '⛳', label: '코스리뷰', fn: openCourseReview },
    { icon: '📝', label: '라운드복기', fn: openRoundReflection },
    { icon: '💪', label: '연습로거', fn: openPracticeLogger },
    { icon: '🎯', label: '목표트래커', fn: openGoalTracker },
    { icon: '🏌️', label: '클럽가방', fn: openClubBag },
    { icon: '📊', label: '셀프진단', fn: openMonthlySelfDiag },
    { icon: '🧪', label: 'IQ v26', fn: openGolfIQv26 }
  ];

  var navRetries = 20;
  function attachNav() {
    // sg30 도크가 없을 수 있으므로(해당 패치 미로드) 남아 있는 아무 하단바에나 붙인다.
    // 폴백이 없으면 버튼이 영영 생성되지 않고 재시도 타이머만 계속 돈다.
    var bar = document.querySelector('.sg30-bottom-bar') || document.querySelector('[class*="bottom-bar"]');
    if (!bar) { if (--navRetries > 0) setTimeout(attachNav, 500); return; }
    var existingBtn = bar.querySelector('.sg30-bbtn') || bar.querySelector('button');
    navItems.forEach(function (item) {
      var btn = document.createElement('button');
      btn.className = existingBtn ? existingBtn.className : 'sg30-bbtn';
      btn.innerHTML = '<span class="sg30-bbtn-icon">' + item.icon + '</span><span class="sg30-bbtn-label">' + item.label + '</span>';
      btn.addEventListener('click', function () { playSFX('navClick42'); item.fn(); });
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
  window.openSwingTempo = openSwingTempo;
  window.openRoundReadiness = openRoundReadiness;
  window.openCourseReview = openCourseReview;
  window.openRoundReflection = openRoundReflection;
  window.openPracticeLogger = openPracticeLogger;
  window.openGoalTracker = openGoalTracker;
  window.openClubBag = openClubBag;
  window.openMonthlySelfDiag = openMonthlySelfDiag;
  window.openGolfIQv26 = openGolfIQv26;

  console.log('[SmartGolf v42.0] Loaded: SwingTempo, RoundReadiness, CourseReview, RoundReflection, PracticeLogger, GoalTracker, ClubBag, MonthlySelfDiag, GolfIQ v26');
})();
