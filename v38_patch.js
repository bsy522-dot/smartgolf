(function () {
  'use strict';

  // ===== LOCALSTORAGE HELPER =====
  var LS = function (k, v) {
    return v === undefined
      ? JSON.parse(localStorage.getItem('sg38_' + k) || 'null')
      : localStorage.setItem('sg38_' + k, JSON.stringify(v));
  };

  // ===== SFX ENGINE (16 new SFX, 300->316) =====
  var sfxCtx = null;
  function sg38sfx(name) {
    if (!sfxCtx) {
      try { sfxCtx = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) { return; }
    }
    var map = {
      consistency_scan:  { f: 520, d: 0.15, t: 'sine', v: 0.25 },
      consistency_grade: { f: 660, d: 0.25, t: 'triangle', v: 0.3 },
      risk_plot:         { f: 440, d: 0.12, t: 'square', v: 0.18 },
      risk_decide:       { f: 580, d: 0.2, t: 'sine', v: 0.28 },
      stroke_analyze:    { f: 380, d: 0.18, t: 'sine', v: 0.22 },
      stroke_optimal:    { f: 720, d: 0.22, t: 'triangle', v: 0.26 },
      rotation_spin:     { f: 350, d: 0.3, t: 'sawtooth', v: 0.15 },
      rotation_rec:      { f: 600, d: 0.2, t: 'triangle', v: 0.25 },
      mental_scan:       { f: 480, d: 0.25, t: 'sine', v: 0.2 },
      mental_grow:       { f: 800, d: 0.3, t: 'triangle', v: 0.28 },
      sg_analyze:        { f: 550, d: 0.15, t: 'sine', v: 0.22 },
      sg_highlight:      { f: 700, d: 0.2, t: 'triangle', v: 0.3 },
      yardage_scan:      { f: 420, d: 0.18, t: 'square', v: 0.18 },
      yardage_hot:       { f: 640, d: 0.22, t: 'sine', v: 0.28 },
      growth_gauge:      { f: 500, d: 0.2, t: 'triangle', v: 0.24 },
      achieve_v38:       { f: 880, d: 0.35, t: 'sine', v: 0.32 }
    };
    var s = map[name];
    if (!s) return;
    var osc = sfxCtx.createOscillator();
    var gain = sfxCtx.createGain();
    osc.type = s.t;
    osc.frequency.value = s.f;
    gain.gain.setValueAtTime(s.v, sfxCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, sfxCtx.currentTime + s.d);
    osc.connect(gain);
    gain.connect(sfxCtx.destination);
    osc.start(sfxCtx.currentTime);
    osc.stop(sfxCtx.currentTime + s.d);
  }

  // ===== CSS =====
  var css38 = document.createElement('style');
  css38.textContent = [
    '.sg38-overlay{position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,.88);z-index:10080;display:none;align-items:center;justify-content:center;backdrop-filter:blur(20px)}',
    '.sg38-overlay.active{display:flex}',
    '.sg38-panel{background:#1a1a2e;border-radius:24px;padding:28px;width:96%;max-width:720px;max-height:92vh;overflow-y:auto;box-shadow:0 40px 120px rgba(0,0,0,.7);animation:sg38Rise .35s cubic-bezier(.22,1,.36,1)}',
    '@keyframes sg38Rise{from{opacity:0;transform:translateY(40px) scale(.92)}to{opacity:1;transform:translateY(0) scale(1)}}',
    '.sg38-hdr{display:flex;justify-content:space-between;align-items:center;margin-bottom:18px;padding-bottom:14px;border-bottom:1px solid rgba(255,255,255,.1)}',
    '.sg38-hdr h2{font-size:20px;font-weight:800;color:#fff;display:flex;align-items:center;gap:10px}',
    '.sg38-hdr-icon{font-size:26px}',
    '.sg38-x{background:none;border:none;font-size:28px;cursor:pointer;color:rgba(255,255,255,.5);padding:4px 10px;border-radius:10px;transition:.2s}',
    '.sg38-x:hover{background:rgba(255,255,255,.1);color:#fff}',
    '.sg38-card{background:rgba(255,255,255,.06);border-radius:16px;padding:18px;margin-bottom:12px;border:1px solid rgba(255,255,255,.08);transition:.25s}',
    '.sg38-card:hover{border-color:rgba(255,255,255,.2);transform:translateY(-1px)}',
    '.sg38-card h4{font-size:14px;font-weight:700;color:#fff;margin-bottom:8px;display:flex;align-items:center;gap:8px}',
    '.sg38-card p{font-size:12px;color:rgba(255,255,255,.6);line-height:1.7}',
    '.sg38-grade{display:inline-flex;align-items:center;justify-content:center;width:42px;height:42px;border-radius:50%;font-size:18px;font-weight:900;color:#fff}',
    '.sg38-grade-s{background:linear-gradient(135deg,#ffd700,#ffaa00)}',
    '.sg38-grade-a{background:linear-gradient(135deg,#2ecc71,#27ae60)}',
    '.sg38-grade-b{background:linear-gradient(135deg,#3498db,#2980b9)}',
    '.sg38-grade-c{background:linear-gradient(135deg,#e67e22,#d35400)}',
    '.sg38-grade-d{background:linear-gradient(135deg,#e74c3c,#c0392b)}',
    '.sg38-btn{padding:10px 22px;border:none;border-radius:12px;font-size:13px;font-weight:700;cursor:pointer;transition:.25s;display:inline-flex;align-items:center;gap:6px;color:#fff}',
    '.sg38-btn:hover{transform:translateY(-2px);box-shadow:0 6px 18px rgba(0,0,0,.3)}',
    '.sg38-tabs{display:flex;gap:6px;margin-bottom:16px;overflow-x:auto;padding-bottom:4px;scrollbar-width:none}',
    '.sg38-tabs::-webkit-scrollbar{display:none}',
    '.sg38-tab{padding:9px 18px;border-radius:22px;border:1.5px solid rgba(255,255,255,.15);background:transparent;font-size:11px;font-weight:700;cursor:pointer;white-space:nowrap;transition:.25s;color:rgba(255,255,255,.6)}',
    '.sg38-tab.active{background:#2ecc71;color:#fff;border-color:#2ecc71;box-shadow:0 3px 14px rgba(46,204,113,.35)}',
    '.sg38-stat{display:flex;justify-content:space-between;align-items:center;padding:12px 0;border-bottom:1px solid rgba(255,255,255,.08);color:#fff;font-size:13px}',
    '.sg38-stat:last-child{border-bottom:none}',
    '.sg38-stat-val{font-weight:800;font-size:15px}',
    '.sg38-progress{width:100%;height:12px;background:rgba(255,255,255,.1);border-radius:6px;overflow:hidden;margin:6px 0}',
    '.sg38-progress-fill{height:100%;border-radius:6px;transition:width .6s ease}',
    '.sg38-canvas-wrap{text-align:center;margin:10px 0}',
    '.sg38-canvas-wrap canvas{border-radius:14px;max-width:100%}',
    '.sg38-quiz-opt{display:block;width:100%;padding:12px 16px;margin-bottom:8px;border:1.5px solid rgba(255,255,255,.15);border-radius:12px;background:transparent;color:rgba(255,255,255,.8);font-size:13px;text-align:left;cursor:pointer;transition:.2s}',
    '.sg38-quiz-opt:hover{border-color:#3498db;background:rgba(52,152,219,.1)}',
    '.sg38-quiz-opt.correct{border-color:#2ecc71;background:rgba(46,204,113,.15);color:#2ecc71;font-weight:700}',
    '.sg38-quiz-opt.wrong{border-color:#e74c3c;background:rgba(231,76,60,.15);color:#e74c3c}',
    '.sg38-achieve-item{display:flex;gap:12px;align-items:center;padding:14px;background:rgba(255,255,255,.05);border-radius:14px;margin-bottom:8px;transition:.25s}',
    '.sg38-achieve-item.unlocked{background:rgba(46,204,113,.12);border:1px solid rgba(46,204,113,.3)}',
    '.sg38-achieve-icon{font-size:24px;flex-shrink:0}',
    '.sg38-achieve-info{flex:1}',
    '.sg38-achieve-name{font-size:13px;font-weight:700;color:#fff}',
    '.sg38-achieve-desc{font-size:11px;color:rgba(255,255,255,.5);margin-top:2px}',
    '.sg38-grid2{display:grid;grid-template-columns:1fr 1fr;gap:10px}',
    '.sg38-grid4{display:grid;grid-template-columns:repeat(4,1fr);gap:8px}',
    '@media(max-width:520px){.sg38-grid2,.sg38-grid4{grid-template-columns:1fr 1fr}.sg38-panel{padding:18px;border-radius:18px}}'
  ].join('\n');
  document.head.appendChild(css38);

  // ===== HELPER FUNCTIONS =====
  function createOverlay(id, title, bgColor, icon) {
    var ov = document.getElementById(id);
    if (ov) { ov.classList.add('active'); return { ov: ov, body: ov.querySelector('.sg38-panel-body') }; }
    ov = document.createElement('div');
    ov.id = id;
    ov.className = 'sg38-overlay';
    var hdrGrad = bgColor || 'linear-gradient(135deg,#2ecc71,#27ae60)';
    ov.innerHTML = '<div class="sg38-panel"><div class="sg38-hdr" style="background:' + hdrGrad + ';margin:-28px -28px 18px;padding:22px 28px;border-radius:24px 24px 0 0"><h2><span class="sg38-hdr-icon">' + (icon || '') + '</span> ' + title + '</h2><button class="sg38-x" data-close="1">&times;</button></div><div class="sg38-panel-body"></div></div>';
    ov.addEventListener('click', function (e) {
      if (e.target === ov || e.target.dataset.close) ov.classList.remove('active');
    });
    document.body.appendChild(ov);
    ov.classList.add('active');
    return { ov: ov, body: ov.querySelector('.sg38-panel-body') };
  }

  function gradeClass(score, max) {
    var p = score / max * 100;
    if (p >= 90) return 'sg38-grade-s';
    if (p >= 75) return 'sg38-grade-a';
    if (p >= 60) return 'sg38-grade-b';
    if (p >= 40) return 'sg38-grade-c';
    return 'sg38-grade-d';
  }

  function gradeLabel(score, max) {
    var p = score / max * 100;
    if (p >= 90) return 'S';
    if (p >= 75) return 'A';
    if (p >= 60) return 'B';
    if (p >= 40) return 'C';
    return 'D';
  }

  // ===== ACHIEVEMENTS =====
  var sg38Achievements = [
    { id: 'consistency_analyst', name: '일관성 분석가', desc: '스윙 일관성 인덱스를 처음 확인', icon: '📊' },
    { id: 'risk_strategist', name: '리스크 전략가', desc: '리스크-리워드 매트릭스를 분석', icon: '⚖️' },
    { id: 'stroke_master', name: '스트로크 마스터', desc: '퍼팅 스트로크 분석기 사용', icon: '🎯' },
    { id: 'rotation_expert', name: '로테이션 전문가', desc: '클럽 로테이션 최적화 확인', icon: '🔄' },
    { id: 'mental_warrior', name: '멘탈 전사', desc: '멘탈 회복력 트래커 시작', icon: '🧠' },
    { id: 'sg_expert', name: 'SG 전문가', desc: 'Strokes Gained 분석 확인', icon: '📈' },
    { id: 'yardage_king', name: '거리 지배자', desc: '야디지 도미넌스 히트맵 분석', icon: '🔥' },
    { id: 'growth_tracker', name: '성장 추적자', desc: '성장 리포트 확인', icon: '📋' },
    { id: 'golf_iq_v22_starter', name: 'Golf IQ v22 도전자', desc: 'Golf IQ v22 퀴즈 시작', icon: '📝' },
    { id: 'golf_iq_v22_master', name: 'Golf IQ v22 마스터', desc: 'Golf IQ v22에서 12문제 이상 정답', icon: '🏆' },
    { id: 'v38_explorer', name: 'v38 탐험가', desc: 'v38 기능 3개 이상 사용', icon: '🗺️' },
    { id: 'v38_complete', name: 'v38 완전정복', desc: 'v38 기능 모두 사용', icon: '⭐' },
    { id: 'stroke_pro', name: '스트로크 프로', desc: '퍼팅 분석 3회 이상', icon: '🏅' },
    { id: 'mental_champion', name: '멘탈 챔피언', desc: '멘탈 4개 축 80점 이상 달성', icon: '💪' },
    { id: 'growth_achiever', name: '성장 달성자', desc: '성장 리포트에서 종합 B등급 이상', icon: '🌟' }
  ];

  function unlockAchieve(id) {
    var list = LS('achievements') || [];
    if (list.indexOf(id) === -1) {
      list.push(id);
      LS('achievements', list);
      sg38sfx('achieve_v38');
      showAchieveToast(id);
    }
  }

  function showAchieveToast(id) {
    var a = sg38Achievements.filter(function (x) { return x.id === id; })[0];
    if (!a) return;
    var t = document.createElement('div');
    t.style.cssText = 'position:fixed;top:20px;right:20px;background:linear-gradient(135deg,#2ecc71,#27ae60);color:#fff;padding:14px 22px;border-radius:14px;z-index:10090;font-size:13px;font-weight:700;box-shadow:0 8px 30px rgba(0,0,0,.4);animation:sg38Rise .35s ease;display:flex;align-items:center;gap:10px';
    t.innerHTML = '<span style="font-size:22px">' + a.icon + '</span><div><div style="font-size:10px;opacity:.8">업적 달성!</div>' + a.name + '</div>';
    document.body.appendChild(t);
    setTimeout(function () { t.style.transition = '.5s'; t.style.opacity = '0'; t.style.transform = 'translateY(-20px)'; setTimeout(function () { t.remove(); }, 500); }, 2500);
  }

  function trackFeatureUse(feat) {
    var used = LS('features_used') || [];
    if (used.indexOf(feat) === -1) {
      used.push(feat);
      LS('features_used', used);
    }
    if (used.length >= 3) unlockAchieve('v38_explorer');
    if (used.length >= 8) unlockAchieve('v38_complete');
  }

  // ===== SIMULATED DATA =====
  var CLUBS = ['DR', '3W', '5W', '4H', '5I', '6I', '7I', '8I', '9I', 'PW', 'GW', 'SW', 'LW', 'PT'];
  var CLUB_MEANS = [245, 225, 210, 195, 185, 175, 165, 155, 143, 130, 115, 95, 75, 0];
  var CLUB_STDDEVS = [18, 15, 14, 13, 12, 10, 9, 8, 7, 6, 6, 5, 5, 0];
  var PARS = [4, 4, 3, 5, 4, 4, 3, 4, 5, 4, 3, 4, 5, 4, 4, 3, 4, 5];

  // ===== 1. SWING CONSISTENCY INDEX =====
  function openSwingConsistencyIndex() {
    sg38sfx('consistency_scan');
    trackFeatureUse('consistency');
    unlockAchieve('consistency_analyst');

    var o = createOverlay('sg38ConsistOv', '스윙 일관성 인덱스', 'linear-gradient(135deg,#2ecc71,#27ae60)', '📊');
    var body = o.body;

    var saved = LS('consist_data');
    var cvData = saved || CLUBS.map(function (c, i) {
      if (i === 13) return { club: c, cv: +(3 + Math.random() * 10).toFixed(1), mean: 1.8, std: 0.15 };
      var mean = CLUB_MEANS[i] + (Math.random() - 0.5) * 10;
      var std = CLUB_STDDEVS[i] * (0.7 + Math.random() * 0.6);
      return { club: c, cv: +(std / mean * 100).toFixed(1), mean: +mean.toFixed(0), std: +std.toFixed(1) };
    });
    if (!saved) LS('consist_data', cvData);

    var totalCV = cvData.reduce(function (s, d) { return s + d.cv; }, 0) / cvData.length;
    var overallScore = Math.max(0, Math.min(100, Math.round(100 - totalCV * 5)));

    body.innerHTML = '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px"><div><span style="color:rgba(255,255,255,.5);font-size:12px">종합 일관성 점수</span><div style="font-size:28px;font-weight:900;color:#fff">' + overallScore + '<span style="font-size:14px;color:rgba(255,255,255,.5)">/100</span></div></div><div class="sg38-grade ' + gradeClass(overallScore, 100) + '">' + gradeLabel(overallScore, 100) + '</div></div>' +
      '<div class="sg38-canvas-wrap"><canvas id="sg38ConsistCanvas" width="620" height="400"></canvas></div>' +
      '<div class="sg38-card" style="margin-top:10px"><h4>범례</h4><div style="display:flex;gap:16px;font-size:11px;color:rgba(255,255,255,.6)"><span style="display:flex;align-items:center;gap:4px"><span style="display:inline-block;width:12px;height:12px;background:#2ecc71;border-radius:3px"></span> 우수 (CV < 8%)</span><span style="display:flex;align-items:center;gap:4px"><span style="display:inline-block;width:12px;height:12px;background:#f1c40f;border-radius:3px"></span> 보통 (8-15%)</span><span style="display:flex;align-items:center;gap:4px"><span style="display:inline-block;width:12px;height:12px;background:#e74c3c;border-radius:3px"></span> 주의 (> 15%)</span></div></div>' +
      '<div id="sg38ConsistDetail" class="sg38-card" style="display:none;margin-top:10px"></div>';

    sg38sfx('consistency_grade');

    var canvas = document.getElementById('sg38ConsistCanvas');
    var ctx = canvas.getContext('2d');
    var hoverIdx = -1;

    function drawChart() {
      ctx.clearRect(0, 0, 620, 400);
      // Background
      ctx.fillStyle = '#161625';
      ctx.fillRect(0, 0, 620, 400);

      // Title
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 16px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('클럽별 변동계수 (CV%)', 310, 30);

      var barH = 20, gap = 5, startY = 50, maxCV = 25, barAreaW = 380, leftM = 60;

      for (var i = 0; i < cvData.length; i++) {
        var y = startY + i * (barH + gap);
        // Club label
        ctx.fillStyle = 'rgba(255,255,255,.7)';
        ctx.font = '12px sans-serif';
        ctx.textAlign = 'right';
        ctx.fillText(cvData[i].club, leftM - 8, y + barH / 2 + 4);

        // Bar
        var w = Math.min(cvData[i].cv / maxCV, 1) * barAreaW;
        var color = cvData[i].cv < 8 ? '#2ecc71' : cvData[i].cv < 15 ? '#f1c40f' : '#e74c3c';
        if (i === hoverIdx) {
          ctx.fillStyle = color;
          ctx.globalAlpha = 1;
          ctx.shadowColor = color;
          ctx.shadowBlur = 12;
        } else {
          ctx.fillStyle = color;
          ctx.globalAlpha = 0.85;
        }
        ctx.beginPath();
        ctx.roundRect(leftM, y, w, barH, 4);
        ctx.fill();
        ctx.globalAlpha = 1;
        ctx.shadowBlur = 0;

        // Value
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 11px sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText(cvData[i].cv + '%', leftM + w + 6, y + barH / 2 + 4);
      }

      // Grid lines
      ctx.strokeStyle = 'rgba(255,255,255,.08)';
      ctx.lineWidth = 1;
      for (var g = 0; g <= 25; g += 5) {
        var gx = leftM + (g / maxCV) * barAreaW;
        ctx.beginPath(); ctx.moveTo(gx, 45); ctx.lineTo(gx, startY + cvData.length * (barH + gap)); ctx.stroke();
        ctx.fillStyle = 'rgba(255,255,255,.3)';
        ctx.font = '10px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(g + '%', gx, startY + cvData.length * (barH + gap) + 14);
      }
    }

    drawChart();

    canvas.addEventListener('mousemove', function (e) {
      var rect = canvas.getBoundingClientRect();
      var scaleY = 400 / rect.height;
      var my = (e.clientY - rect.top) * scaleY;
      var barH = 20, gap = 5, startY = 50;
      var idx = Math.floor((my - startY) / (barH + gap));
      if (idx >= 0 && idx < cvData.length && my >= startY) {
        hoverIdx = idx;
        canvas.style.cursor = 'pointer';
      } else {
        hoverIdx = -1;
        canvas.style.cursor = 'default';
      }
      drawChart();
    });

    canvas.addEventListener('click', function () {
      if (hoverIdx >= 0 && hoverIdx < cvData.length) {
        var d = cvData[hoverIdx];
        var detail = document.getElementById('sg38ConsistDetail');
        detail.style.display = 'block';
        detail.innerHTML = '<h4>' + d.club + ' 상세 분석</h4><div class="sg38-stat"><span>평균 거리</span><span class="sg38-stat-val">' + d.mean + (d.club === 'PT' ? 'ft' : 'yd') + '</span></div><div class="sg38-stat"><span>표준편차</span><span class="sg38-stat-val">' + d.std + '</span></div><div class="sg38-stat"><span>변동계수 (CV)</span><span class="sg38-stat-val" style="color:' + (d.cv < 8 ? '#2ecc71' : d.cv < 15 ? '#f1c40f' : '#e74c3c') + '">' + d.cv + '%</span></div><div class="sg38-stat"><span>등급</span><span class="sg38-stat-val">' + (d.cv < 8 ? '우수' : d.cv < 15 ? '보통' : '주의') + '</span></div>';
        sg38sfx('consistency_scan');
      }
    });
  }

  // ===== 2. RISK REWARD MATRIX =====
  function openRiskRewardMatrix() {
    sg38sfx('risk_plot');
    trackFeatureUse('risk');
    unlockAchieve('risk_strategist');

    var o = createOverlay('sg38RiskOv', '리스크-리워드 매트릭스', 'linear-gradient(135deg,#e74c3c,#c0392b)', '⚖️');
    var body = o.body;

    var saved = LS('risk_data');
    var holes = saved || Array.from({ length: 18 }, function (_, i) {
      return { hole: i + 1, risk: +(1 + Math.random() * 9).toFixed(1), reward: +(1 + Math.random() * 9).toFixed(1), par: PARS[i], score: PARS[i] + Math.floor(Math.random() * 3 - 1) };
    });
    if (!saved) LS('risk_data', holes);

    body.innerHTML = '<div class="sg38-canvas-wrap"><canvas id="sg38RiskCanvas" width="640" height="400"></canvas></div>' +
      '<div id="sg38RiskDetail" class="sg38-card" style="display:none;margin-top:10px"></div>' +
      '<div class="sg38-grid2" style="margin-top:12px"><div class="sg38-card"><h4>공격적 홀</h4><p id="sg38Aggressive">-</p></div><div class="sg38-card"><h4>효율적 홀</h4><p id="sg38Efficient">-</p></div></div>';

    var aggressive = holes.filter(function (h) { return h.risk > 5 && h.reward > 5; }).map(function (h) { return h.hole; });
    var efficient = holes.filter(function (h) { return h.risk <= 5 && h.reward > 5; }).map(function (h) { return h.hole; });
    document.getElementById('sg38Aggressive').textContent = aggressive.length > 0 ? aggressive.join(', ') + '번 홀' : '없음';
    document.getElementById('sg38Efficient').textContent = efficient.length > 0 ? efficient.join(', ') + '번 홀' : '없음';

    var canvas = document.getElementById('sg38RiskCanvas');
    var ctx = canvas.getContext('2d');
    var hoverHole = -1;

    function drawRisk() {
      ctx.clearRect(0, 0, 640, 400);
      ctx.fillStyle = '#1a1a2e';
      ctx.fillRect(0, 0, 640, 400);

      var left = 60, top = 40, w = 540, h = 320;

      // Quadrant backgrounds
      ctx.globalAlpha = 0.08;
      ctx.fillStyle = '#e74c3c'; ctx.fillRect(left + w / 2, top, w / 2, h / 2); // high risk high reward
      ctx.fillStyle = '#3498db'; ctx.fillRect(left, top, w / 2, h / 2); // low risk high reward
      ctx.fillStyle = '#f39c12'; ctx.fillRect(left + w / 2, top + h / 2, w / 2, h / 2); // high risk low reward
      ctx.fillStyle = '#2ecc71'; ctx.fillRect(left, top + h / 2, w / 2, h / 2); // low risk low reward
      ctx.globalAlpha = 1;

      // Quadrant labels
      ctx.font = 'bold 12px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillStyle = 'rgba(231,76,60,.5)'; ctx.fillText('공격적', left + w * 0.75, top + 20);
      ctx.fillStyle = 'rgba(52,152,219,.5)'; ctx.fillText('효율적', left + w * 0.25, top + 20);
      ctx.fillStyle = 'rgba(243,156,18,.5)'; ctx.fillText('비효율', left + w * 0.75, top + h - 8);
      ctx.fillStyle = 'rgba(46,204,113,.5)'; ctx.fillText('보수적', left + w * 0.25, top + h - 8);

      // Axes
      ctx.strokeStyle = 'rgba(255,255,255,.2)';
      ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(left, top + h); ctx.lineTo(left + w, top + h); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(left, top); ctx.lineTo(left, top + h); ctx.stroke();

      // Axis labels
      ctx.fillStyle = 'rgba(255,255,255,.5)';
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('리스크 레벨', left + w / 2, top + h + 30);
      ctx.save();
      ctx.translate(20, top + h / 2);
      ctx.rotate(-Math.PI / 2);
      ctx.fillText('리워드 잠재력', 0, 0);
      ctx.restore();

      // Axis ticks
      for (var t = 1; t <= 10; t++) {
        var tx = left + (t / 10) * w;
        var ty = top + h - (t / 10) * h;
        ctx.fillStyle = 'rgba(255,255,255,.3)';
        ctx.font = '9px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(t, tx, top + h + 14);
        ctx.textAlign = 'right';
        ctx.fillText(t, left - 6, ty + 3);
      }

      // Center lines
      ctx.strokeStyle = 'rgba(255,255,255,.1)';
      ctx.setLineDash([4, 4]);
      ctx.beginPath(); ctx.moveTo(left + w / 2, top); ctx.lineTo(left + w / 2, top + h); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(left, top + h / 2); ctx.lineTo(left + w, top + h / 2); ctx.stroke();
      ctx.setLineDash([]);

      // Dots
      for (var i = 0; i < holes.length; i++) {
        var hx = left + (holes[i].risk / 10) * w;
        var hy = top + h - (holes[i].reward / 10) * h;
        var r = i === hoverHole ? 14 : 10;

        var dotColor;
        if (holes[i].risk > 5 && holes[i].reward > 5) dotColor = '#e74c3c';
        else if (holes[i].risk <= 5 && holes[i].reward > 5) dotColor = '#3498db';
        else if (holes[i].risk > 5 && holes[i].reward <= 5) dotColor = '#f39c12';
        else dotColor = '#2ecc71';

        ctx.fillStyle = dotColor;
        ctx.globalAlpha = i === hoverHole ? 1 : 0.8;
        ctx.beginPath();
        ctx.arc(hx, hy, r, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;

        ctx.fillStyle = '#fff';
        ctx.font = 'bold 9px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(holes[i].hole, hx, hy + 3);
      }
    }

    drawRisk();

    canvas.addEventListener('mousemove', function (e) {
      var rect = canvas.getBoundingClientRect();
      var sx = 640 / rect.width, sy = 400 / rect.height;
      var mx = (e.clientX - rect.left) * sx, my = (e.clientY - rect.top) * sy;
      var left = 60, top = 40, w = 540, h = 320;
      hoverHole = -1;
      for (var i = 0; i < holes.length; i++) {
        var hx = left + (holes[i].risk / 10) * w;
        var hy = top + h - (holes[i].reward / 10) * h;
        if (Math.sqrt((mx - hx) * (mx - hx) + (my - hy) * (my - hy)) < 14) { hoverHole = i; break; }
      }
      canvas.style.cursor = hoverHole >= 0 ? 'pointer' : 'default';
      drawRisk();
    });

    canvas.addEventListener('click', function () {
      if (hoverHole >= 0) {
        var h = holes[hoverHole];
        var det = document.getElementById('sg38RiskDetail');
        det.style.display = 'block';
        det.innerHTML = '<h4>' + h.hole + '번 홀 상세</h4><div class="sg38-stat"><span>Par</span><span class="sg38-stat-val">' + h.par + '</span></div><div class="sg38-stat"><span>리스크</span><span class="sg38-stat-val" style="color:#e74c3c">' + h.risk + '/10</span></div><div class="sg38-stat"><span>리워드</span><span class="sg38-stat-val" style="color:#2ecc71">' + h.reward + '/10</span></div><div class="sg38-stat"><span>평균 스코어</span><span class="sg38-stat-val">' + h.score + '</span></div>';
        sg38sfx('risk_decide');
      }
    });
  }

  // ===== 3. PUTTING STROKE ANALYZER =====
  function openPuttingStrokeAnalyzer() {
    sg38sfx('stroke_analyze');
    trackFeatureUse('stroke');
    unlockAchieve('stroke_master');

    var sessions = LS('stroke_sessions') || 0;
    sessions++;
    LS('stroke_sessions', sessions);
    if (sessions >= 3) unlockAchieve('stroke_pro');

    var o = createOverlay('sg38StrokeOv', '퍼팅 스트로크 분석기', 'linear-gradient(135deg,#3498db,#2980b9)', '🎯');
    var body = o.body;

    var distances = [3, 6, 10, 15, 20, 30];
    var optimalBackswing = [2, 4, 7, 11, 15, 22]; // inches
    var currentBackswing = optimalBackswing.map(function (v) { return +(v + (Math.random() - 0.5) * v * 0.4).toFixed(1); });
    var tempoData = distances.map(function () { return +(0.8 + Math.random() * 0.6).toFixed(2); });

    body.innerHTML = '<div class="sg38-canvas-wrap"><canvas id="sg38StrokeCanvas" width="600" height="380"></canvas></div>' +
      '<div class="sg38-card" style="margin-top:10px"><h4>템포 분석</h4><p>백스윙:임팩트 비율이 2:1에 가까울수록 안정적입니다.</p></div>';

    var canvas = document.getElementById('sg38StrokeCanvas');
    var ctx = canvas.getContext('2d');

    function drawStroke() {
      ctx.clearRect(0, 0, 600, 380);
      ctx.fillStyle = '#162030';
      ctx.fillRect(0, 0, 600, 380);

      // Title
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 14px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('거리별 백스윙 크기 상관관계', 300, 25);

      // Scatter area
      var left = 70, top = 45, w = 460, h = 200;

      // Optimal zone (shaded)
      ctx.fillStyle = 'rgba(46,204,113,.1)';
      ctx.beginPath();
      ctx.moveTo(left, top + h);
      for (var z = 0; z < distances.length; z++) {
        var zx = left + (z / (distances.length - 1)) * w;
        var zy = top + h - (optimalBackswing[z] / 25) * h;
        ctx.lineTo(zx, zy - 15);
      }
      for (var z2 = distances.length - 1; z2 >= 0; z2--) {
        var zx2 = left + (z2 / (distances.length - 1)) * w;
        var zy2 = top + h - (optimalBackswing[z2] / 25) * h;
        ctx.lineTo(zx2, zy2 + 15);
      }
      ctx.closePath();
      ctx.fill();

      // Optimal line
      ctx.strokeStyle = '#2ecc71';
      ctx.lineWidth = 2;
      ctx.setLineDash([6, 3]);
      ctx.beginPath();
      for (var ol = 0; ol < distances.length; ol++) {
        var ox = left + (ol / (distances.length - 1)) * w;
        var oy = top + h - (optimalBackswing[ol] / 25) * h;
        if (ol === 0) ctx.moveTo(ox, oy); else ctx.lineTo(ox, oy);
      }
      ctx.stroke();
      ctx.setLineDash([]);

      // Current data points
      for (var p = 0; p < distances.length; p++) {
        var px = left + (p / (distances.length - 1)) * w;
        var py = top + h - (currentBackswing[p] / 25) * h;

        ctx.fillStyle = '#00d2ff';
        ctx.shadowColor = '#00d2ff';
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(px, py, 7, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        // Label
        ctx.fillStyle = '#fff';
        ctx.font = '10px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(currentBackswing[p] + '"', px, py - 12);
      }

      // Axis labels
      ctx.fillStyle = 'rgba(255,255,255,.5)';
      ctx.font = '10px sans-serif';
      ctx.textAlign = 'center';
      for (var dl = 0; dl < distances.length; dl++) {
        var dx = left + (dl / (distances.length - 1)) * w;
        ctx.fillText(distances[dl] + 'ft', dx, top + h + 18);
      }
      ctx.fillText('퍼팅 거리', left + w / 2, top + h + 35);

      ctx.save();
      ctx.translate(18, top + h / 2);
      ctx.rotate(-Math.PI / 2);
      ctx.fillText('백스윙 크기 (inch)', 0, 0);
      ctx.restore();

      // Y-axis ticks
      for (var yt = 0; yt <= 25; yt += 5) {
        var yy = top + h - (yt / 25) * h;
        ctx.fillStyle = 'rgba(255,255,255,.3)';
        ctx.textAlign = 'right';
        ctx.fillText(yt, left - 8, yy + 3);
        ctx.strokeStyle = 'rgba(255,255,255,.05)';
        ctx.beginPath(); ctx.moveTo(left, yy); ctx.lineTo(left + w, yy); ctx.stroke();
      }

      // Legend
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'left';
      ctx.fillStyle = '#2ecc71'; ctx.fillRect(left, top + h + 48, 12, 12);
      ctx.fillStyle = 'rgba(255,255,255,.6)'; ctx.fillText('최적 라인', left + 18, top + h + 58);
      ctx.fillStyle = '#00d2ff'; ctx.beginPath(); ctx.arc(left + 120, top + h + 54, 5, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = 'rgba(255,255,255,.6)'; ctx.fillText('현재 데이터', left + 130, top + h + 58);

      // Tempo bar chart at bottom
      var tempoTop = 280, tempoH = 70, barW = 50;
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 12px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('스트로크 템포', 300, tempoTop);

      for (var t = 0; t < tempoData.length; t++) {
        var bx = left + 30 + t * (barW + 20);
        var bh = (tempoData[t] / 1.6) * tempoH;
        var by = tempoTop + 15 + tempoH - bh;

        var ideal = tempoData[t] >= 0.9 && tempoData[t] <= 1.2;
        ctx.fillStyle = ideal ? 'rgba(0,210,255,.7)' : 'rgba(231,76,60,.7)';
        ctx.beginPath();
        ctx.roundRect(bx, by, barW, bh, 4);
        ctx.fill();

        ctx.fillStyle = '#fff';
        ctx.font = '10px sans-serif';
        ctx.fillText(tempoData[t] + 's', bx + barW / 2, by - 5);
        ctx.fillStyle = 'rgba(255,255,255,.4)';
        ctx.fillText(distances[t] + 'ft', bx + barW / 2, tempoTop + 15 + tempoH + 12);
      }
    }

    drawStroke();
    sg38sfx('stroke_optimal');
  }

  // ===== 4. CLUB ROTATION OPTIMIZER =====
  function openClubRotationOptimizer() {
    sg38sfx('rotation_spin');
    trackFeatureUse('rotation');
    unlockAchieve('rotation_expert');

    var o = createOverlay('sg38RotateOv', '클럽 로테이션 최적화', 'linear-gradient(135deg,#9b59b6,#8e44ad)', '🔄');
    var body = o.body;

    var currentUsage = [18, 8, 5, 4, 6, 7, 10, 12, 11, 8, 4, 3, 2, 22]; // percent (sum ~120, normalize)
    var optimalUsage = [12, 6, 5, 5, 7, 8, 10, 10, 10, 9, 6, 5, 3, 14];
    var totalCur = currentUsage.reduce(function (a, b) { return a + b; }, 0);
    var totalOpt = optimalUsage.reduce(function (a, b) { return a + b; }, 0);
    var curNorm = currentUsage.map(function (v) { return +(v / totalCur * 100).toFixed(1); });
    var optNorm = optimalUsage.map(function (v) { return +(v / totalOpt * 100).toFixed(1); });

    body.innerHTML = '<div class="sg38-canvas-wrap"><canvas id="sg38RotateCanvas" width="620" height="380"></canvas></div>' +
      '<div class="sg38-card" style="margin-top:12px"><h4>추천사항</h4><p id="sg38RotateRecs"></p></div>';

    var canvas = document.getElementById('sg38RotateCanvas');
    var ctx = canvas.getContext('2d');

    var purpleColors = ['#9b59b6', '#8e44ad', '#7d3c98', '#6c3483', '#5b2c6f', '#4a235a', '#a569bd', '#bb8fce', '#d2b4de', '#c39bd3', '#af7ac5', '#884ea0', '#76448a', '#633974'];

    function drawRotation() {
      ctx.clearRect(0, 0, 620, 380);
      ctx.fillStyle = '#1e1025';
      ctx.fillRect(0, 0, 620, 380);

      var cx = 200, cy = 170, outerR = 130, innerR = 85, innerR2 = 50;

      // Title
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 14px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('클럽 사용 빈도 분석', 310, 22);

      // Outer ring (current)
      var angle = -Math.PI / 2;
      for (var i = 0; i < CLUBS.length; i++) {
        var slice = (curNorm[i] / 100) * Math.PI * 2;
        ctx.fillStyle = purpleColors[i % purpleColors.length];
        ctx.globalAlpha = 0.85;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.arc(cx, cy, outerR, angle, angle + slice);
        ctx.closePath();
        ctx.fill();

        // Label on slice
        if (curNorm[i] > 4) {
          var midAngle = angle + slice / 2;
          var lx = cx + Math.cos(midAngle) * (outerR - 22);
          var ly = cy + Math.sin(midAngle) * (outerR - 22);
          ctx.fillStyle = '#fff';
          ctx.font = 'bold 9px sans-serif';
          ctx.textAlign = 'center';
          ctx.globalAlpha = 1;
          ctx.fillText(CLUBS[i], lx, ly + 3);
        }
        angle += slice;
      }

      // Inner ring (optimal)
      angle = -Math.PI / 2;
      for (var j = 0; j < CLUBS.length; j++) {
        var slice2 = (optNorm[j] / 100) * Math.PI * 2;
        ctx.fillStyle = purpleColors[j % purpleColors.length];
        ctx.globalAlpha = 0.5;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.arc(cx, cy, innerR, angle, angle + slice2);
        ctx.closePath();
        ctx.fill();
        angle += slice2;
      }
      ctx.globalAlpha = 1;

      // Center circle
      ctx.fillStyle = '#1e1025';
      ctx.beginPath();
      ctx.arc(cx, cy, innerR2, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 11px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('현재', cx, cy - 5);
      ctx.fillText('vs 최적', cx, cy + 10);

      // Ring labels
      ctx.fillStyle = 'rgba(255,255,255,.4)';
      ctx.font = '10px sans-serif';
      ctx.fillText('외측: 현재', cx, cy + innerR2 + 14);
      ctx.fillText('내측: 최적', cx, cy + innerR2 + 28);

      // Gap analysis bar chart (right side)
      var barLeft = 380, barTop = 45, barW = 200, barH = 16, gap = 4;
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 12px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('갭 분석 (현재 - 최적)', barLeft + barW / 2, barTop - 5);

      for (var k = 0; k < CLUBS.length; k++) {
        var y = barTop + 10 + k * (barH + gap);
        var diff = curNorm[k] - optNorm[k];
        var maxDiff = 8;

        // Club label
        ctx.fillStyle = 'rgba(255,255,255,.6)';
        ctx.font = '10px sans-serif';
        ctx.textAlign = 'right';
        ctx.fillText(CLUBS[k], barLeft - 6, y + barH / 2 + 3);

        // Zero line
        var zeroX = barLeft + barW / 2;
        var bw = Math.abs(diff) / maxDiff * (barW / 2);
        bw = Math.min(bw, barW / 2);

        ctx.fillStyle = diff > 0 ? 'rgba(231,76,60,.7)' : 'rgba(46,204,113,.7)';
        if (diff > 0) {
          ctx.fillRect(zeroX, y, bw, barH);
        } else {
          ctx.fillRect(zeroX - bw, y, bw, barH);
        }

        ctx.fillStyle = '#fff';
        ctx.font = '9px sans-serif';
        ctx.textAlign = diff > 0 ? 'left' : 'right';
        ctx.fillText((diff > 0 ? '+' : '') + diff.toFixed(1) + '%', diff > 0 ? zeroX + bw + 4 : zeroX - bw - 4, y + barH / 2 + 3);
      }

      // Zero line
      ctx.strokeStyle = 'rgba(255,255,255,.3)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(barLeft + barW / 2, barTop + 10);
      ctx.lineTo(barLeft + barW / 2, barTop + 10 + CLUBS.length * (barH + gap));
      ctx.stroke();
    }

    drawRotation();

    // Recommendations
    var recs = [];
    for (var r = 0; r < CLUBS.length; r++) {
      var d = curNorm[r] - optNorm[r];
      if (d > 3) recs.push(CLUBS[r] + ' 사용 줄이기 (' + d.toFixed(1) + '% 초과)');
      else if (d < -3) recs.push(CLUBS[r] + ' 사용 늘리기 (' + Math.abs(d).toFixed(1) + '% 부족)');
    }
    document.getElementById('sg38RotateRecs').textContent = recs.length > 0 ? recs.join(' / ') : '현재 로테이션이 최적에 가깝습니다!';
    sg38sfx('rotation_rec');
  }

  // ===== 5. MENTAL RESILIENCE TRACKER =====
  function openMentalResilienceTracker() {
    sg38sfx('mental_scan');
    trackFeatureUse('mental');
    unlockAchieve('mental_warrior');

    var o = createOverlay('sg38MentalOv', '멘탈 회복력 트래커', 'linear-gradient(135deg,#00b894,#00a884)', '🧠');
    var body = o.body;

    var axes = ['집중력', '자신감', '회복력', '인내심', '압박대처', '긍정사고'];
    var saved = LS('mental_scores');
    var scores = saved || axes.map(function () { return Math.floor(50 + Math.random() * 40); });
    if (!saved) LS('mental_scores', scores);

    var scenarios = [
      '더블보기 직후 다음 홀 전략은?',
      'OB 후 멘탈 리셋 방법은?',
      '버디 퍼트를 놓쳤을 때 반응은?',
      '동반자가 좋은 샷을 했을 때는?',
      '마지막 3홀에서 리드할 때는?',
      '비가 오기 시작했을 때는?',
      '드라이버가 안 맞는 날은?',
      '중요한 퍼트 앞에서는?',
      '티샷 전 루틴이 방해받았을 때는?',
      '전반 9홀이 좋지 않았을 때는?'
    ];

    var sessionData = LS('mental_sessions') || [
      scores.reduce(function (a, b) { return a + b; }, 0) / axes.length - 10,
      scores.reduce(function (a, b) { return a + b; }, 0) / axes.length - 5,
      scores.reduce(function (a, b) { return a + b; }, 0) / axes.length - 2,
      scores.reduce(function (a, b) { return a + b; }, 0) / axes.length,
      scores.reduce(function (a, b) { return a + b; }, 0) / axes.length + 3
    ];
    LS('mental_sessions', sessionData);

    body.innerHTML = '<div class="sg38-canvas-wrap"><canvas id="sg38MentalCanvas" width="620" height="400"></canvas></div>' +
      '<div class="sg38-card" style="margin-top:10px"><h4>스트레스 시나리오 점수</h4><div id="sg38ScenarioList"></div></div>' +
      '<div style="margin-top:10px;text-align:center"><button class="sg38-btn" style="background:linear-gradient(135deg,#00b894,#00a884)" onclick="(function(){var s=JSON.parse(localStorage.getItem(\'sg38_mental_scores\')||\'[60,60,60,60,60,60]\');for(var i=0;i<s.length;i++){s[i]=Math.min(100,s[i]+Math.floor(Math.random()*5));}localStorage.setItem(\'sg38_mental_scores\',JSON.stringify(s));document.getElementById(\'sg38MentalOv\').classList.remove(\'active\');})()">멘탈 훈련 완료</button></div>';

    // Scenario buttons
    var scenList = document.getElementById('sg38ScenarioList');
    scenarios.forEach(function (sc, idx) {
      var row = document.createElement('div');
      row.style.cssText = 'display:flex;justify-content:space-between;align-items:center;padding:8px 0;border-bottom:1px solid rgba(255,255,255,.06);font-size:12px;color:rgba(255,255,255,.7)';
      row.innerHTML = '<span>' + (idx + 1) + '. ' + sc + '</span><span style="color:#00b894;font-weight:700">' + (60 + Math.floor(Math.random() * 30)) + '점</span>';
      scenList.appendChild(row);
    });

    // Check mental champion achievement
    var above80 = scores.filter(function (s) { return s >= 80; }).length;
    if (above80 >= 4) unlockAchieve('mental_champion');

    var canvas = document.getElementById('sg38MentalCanvas');
    var ctx = canvas.getContext('2d');

    function drawMental() {
      ctx.clearRect(0, 0, 620, 400);
      ctx.fillStyle = '#1a1a2e';
      ctx.fillRect(0, 0, 620, 400);

      // Radar chart
      var rcx = 180, rcy = 180, rr = 120;
      var n = axes.length;

      // Grid
      for (var ring = 1; ring <= 5; ring++) {
        var gr = rr * ring / 5;
        ctx.strokeStyle = 'rgba(255,255,255,.08)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        for (var gi = 0; gi <= n; gi++) {
          var ga = -Math.PI / 2 + (gi / n) * Math.PI * 2;
          var gx = rcx + Math.cos(ga) * gr;
          var gy = rcy + Math.sin(ga) * gr;
          if (gi === 0) ctx.moveTo(gx, gy); else ctx.lineTo(gx, gy);
        }
        ctx.closePath();
        ctx.stroke();
      }

      // Axis lines & labels
      for (var ai = 0; ai < n; ai++) {
        var aa = -Math.PI / 2 + (ai / n) * Math.PI * 2;
        var ax1 = rcx + Math.cos(aa) * rr;
        var ay1 = rcy + Math.sin(aa) * rr;
        ctx.strokeStyle = 'rgba(255,255,255,.15)';
        ctx.beginPath(); ctx.moveTo(rcx, rcy); ctx.lineTo(ax1, ay1); ctx.stroke();

        var lx = rcx + Math.cos(aa) * (rr + 22);
        var ly = rcy + Math.sin(aa) * (rr + 22);
        ctx.fillStyle = 'rgba(255,255,255,.7)';
        ctx.font = '11px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(axes[ai], lx, ly + 4);
        ctx.fillStyle = 'rgba(255,255,255,.4)';
        ctx.font = '9px sans-serif';
        ctx.fillText(scores[ai], lx, ly + 16);
      }

      // Data polygon
      ctx.fillStyle = 'rgba(0,184,148,.2)';
      ctx.strokeStyle = '#00b894';
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (var di = 0; di <= n; di++) {
        var da = -Math.PI / 2 + (di % n / n) * Math.PI * 2;
        var dr = rr * (scores[di % n] / 100);
        var dxx = rcx + Math.cos(da) * dr;
        var dyy = rcy + Math.sin(da) * dr;
        if (di === 0) ctx.moveTo(dxx, dyy); else ctx.lineTo(dxx, dyy);
      }
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Data points
      for (var pi = 0; pi < n; pi++) {
        var pa = -Math.PI / 2 + (pi / n) * Math.PI * 2;
        var pr = rr * (scores[pi] / 100);
        var ppx = rcx + Math.cos(pa) * pr;
        var ppy = rcy + Math.sin(pa) * pr;
        ctx.fillStyle = '#00b894';
        ctx.beginPath();
        ctx.arc(ppx, ppy, 4, 0, Math.PI * 2);
        ctx.fill();
      }

      // Session growth curve (right side)
      var gLeft = 370, gTop = 60, gW = 220, gH = 140;
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 13px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('세션별 성장 곡선', gLeft + gW / 2, gTop - 10);

      // Grid
      ctx.strokeStyle = 'rgba(255,255,255,.06)';
      for (var gl = 0; gl <= 4; gl++) {
        var gy2 = gTop + (gl / 4) * gH;
        ctx.beginPath(); ctx.moveTo(gLeft, gy2); ctx.lineTo(gLeft + gW, gy2); ctx.stroke();
      }

      // Line
      ctx.strokeStyle = '#00b894';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      for (var si = 0; si < sessionData.length; si++) {
        var sx = gLeft + (si / (sessionData.length - 1)) * gW;
        var sy = gTop + gH - ((sessionData[si] - 30) / 70) * gH;
        if (si === 0) ctx.moveTo(sx, sy); else ctx.lineTo(sx, sy);
      }
      ctx.stroke();

      // Points
      for (var si2 = 0; si2 < sessionData.length; si2++) {
        var sx2 = gLeft + (si2 / (sessionData.length - 1)) * gW;
        var sy2 = gTop + gH - ((sessionData[si2] - 30) / 70) * gH;
        ctx.fillStyle = '#00b894';
        ctx.beginPath();
        ctx.arc(sx2, sy2, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#fff';
        ctx.font = '10px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(Math.round(sessionData[si2]), sx2, sy2 - 10);
      }

      // X labels
      ctx.fillStyle = 'rgba(255,255,255,.4)';
      ctx.font = '10px sans-serif';
      for (var sl = 0; sl < sessionData.length; sl++) {
        var slx = gLeft + (sl / (sessionData.length - 1)) * gW;
        ctx.fillText('S' + (sl + 1), slx, gTop + gH + 16);
      }

      // Overall score (bottom right)
      var avgScore = Math.round(scores.reduce(function (a, b) { return a + b; }, 0) / axes.length);
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 14px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('종합 멘탈 점수', gLeft + gW / 2, gTop + gH + 55);
      ctx.font = 'bold 36px sans-serif';
      ctx.fillStyle = avgScore >= 80 ? '#00b894' : avgScore >= 60 ? '#f1c40f' : '#e74c3c';
      ctx.fillText(avgScore, gLeft + gW / 2, gTop + gH + 95);
      ctx.font = '12px sans-serif';
      ctx.fillStyle = 'rgba(255,255,255,.4)';
      ctx.fillText('/ 100', gLeft + gW / 2 + 30, gTop + gH + 95);

      sg38sfx('mental_grow');
    }

    drawMental();
  }

  // ===== 6. STROKES GAINED BY HOLE =====
  function openStrokesGainedByHole() {
    sg38sfx('sg_analyze');
    trackFeatureUse('sg');
    unlockAchieve('sg_expert');

    var o = createOverlay('sg38SGOv', 'Strokes Gained by Hole', 'linear-gradient(135deg,#1a7a3a,#0f5a28)', '📈');
    var body = o.body;

    var saved = LS('sg_data');
    var sgData = saved || Array.from({ length: 18 }, function (_, i) {
      return { hole: i + 1, sg: +((Math.random() - 0.45) * 1.5).toFixed(2), par: PARS[i] };
    });
    if (!saved) LS('sg_data', sgData);

    var totalSG = sgData.reduce(function (s, d) { return s + d.sg; }, 0);
    var sorted = sgData.slice().sort(function (a, b) { return b.sg - a.sg; });
    var top3 = sorted.slice(0, 3).map(function (d) { return d.hole; });
    var bottom3 = sorted.slice(-3).map(function (d) { return d.hole; });

    body.innerHTML = '<div style="text-align:center;margin-bottom:12px"><span style="color:rgba(255,255,255,.5);font-size:12px">Total Strokes Gained</span><div style="font-size:32px;font-weight:900;color:' + (totalSG >= 0 ? '#2ecc71' : '#e74c3c') + '">' + (totalSG >= 0 ? '+' : '') + totalSG.toFixed(2) + '</div></div>' +
      '<div class="sg38-canvas-wrap"><canvas id="sg38SGCanvas" width="620" height="400"></canvas></div>' +
      '<div class="sg38-grid2" style="margin-top:12px"><div class="sg38-card"><h4 style="color:#2ecc71">강점 홀 (Top 3)</h4><p>' + top3.map(function (h) { return h + '번 홀 (+' + sgData[h - 1].sg.toFixed(2) + ')'; }).join(', ') + '</p></div><div class="sg38-card"><h4 style="color:#e74c3c">약점 홀 (Bottom 3)</h4><p>' + bottom3.map(function (h) { return h + '번 홀 (' + sgData[h - 1].sg.toFixed(2) + ')'; }).join(', ') + '</p></div></div>';

    var canvas = document.getElementById('sg38SGCanvas');
    var ctx = canvas.getContext('2d');

    function drawSG() {
      ctx.clearRect(0, 0, 620, 400);
      ctx.fillStyle = '#161625';
      ctx.fillRect(0, 0, 620, 400);

      ctx.fillStyle = '#fff';
      ctx.font = 'bold 14px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('홀별 Strokes Gained', 310, 25);

      var left = 50, top = 45, w = 540, h = 310;
      var maxSG = 1.2;
      var zeroY = top + h / 2;
      var barW = w / 18 - 4;

      // Zero line
      ctx.strokeStyle = 'rgba(255,255,255,.3)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(left, zeroY);
      ctx.lineTo(left + w, zeroY);
      ctx.stroke();

      // Grid lines
      ctx.strokeStyle = 'rgba(255,255,255,.06)';
      for (var g = -1; g <= 1; g += 0.5) {
        if (g === 0) continue;
        var gy = zeroY - (g / maxSG) * (h / 2);
        ctx.beginPath(); ctx.moveTo(left, gy); ctx.lineTo(left + w, gy); ctx.stroke();
        ctx.fillStyle = 'rgba(255,255,255,.3)';
        ctx.font = '9px sans-serif';
        ctx.textAlign = 'right';
        ctx.fillText((g > 0 ? '+' : '') + g.toFixed(1), left - 6, gy + 3);
      }

      // Bars
      for (var i = 0; i < sgData.length; i++) {
        var bx = left + i * (w / 18) + 2;
        var bh = Math.abs(sgData[i].sg) / maxSG * (h / 2);
        bh = Math.min(bh, h / 2 - 5);

        var isTop = top3.indexOf(sgData[i].hole) >= 0;
        var isBottom = bottom3.indexOf(sgData[i].hole) >= 0;

        if (sgData[i].sg >= 0) {
          ctx.fillStyle = isTop ? '#2ecc71' : 'rgba(46,204,113,.6)';
          ctx.shadowColor = isTop ? '#2ecc71' : 'transparent';
          ctx.shadowBlur = isTop ? 10 : 0;
          ctx.beginPath();
          ctx.roundRect(bx, zeroY - bh, barW, bh, [4, 4, 0, 0]);
          ctx.fill();
        } else {
          ctx.fillStyle = isBottom ? '#e74c3c' : 'rgba(231,76,60,.6)';
          ctx.shadowColor = isBottom ? '#e74c3c' : 'transparent';
          ctx.shadowBlur = isBottom ? 10 : 0;
          ctx.beginPath();
          ctx.roundRect(bx, zeroY, barW, bh, [0, 0, 4, 4]);
          ctx.fill();
        }
        ctx.shadowBlur = 0;

        // Value label
        ctx.fillStyle = '#fff';
        ctx.font = '8px sans-serif';
        ctx.textAlign = 'center';
        var valY = sgData[i].sg >= 0 ? zeroY - bh - 8 : zeroY + bh + 12;
        ctx.fillText((sgData[i].sg >= 0 ? '+' : '') + sgData[i].sg.toFixed(2), bx + barW / 2, valY);

        // Hole number
        ctx.fillStyle = 'rgba(255,255,255,.5)';
        ctx.font = '10px sans-serif';
        ctx.fillText(sgData[i].hole, bx + barW / 2, top + h + 14);
      }

      // Highlight markers
      ctx.fillStyle = 'rgba(255,255,255,.3)';
      ctx.font = '10px sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText('0', left - 12, zeroY + 3);
    }

    drawSG();
    sg38sfx('sg_highlight');
  }

  // ===== 7. YARDAGE DOMINANCE HEATMAP =====
  function openYardageDominanceHeatmap() {
    sg38sfx('yardage_scan');
    trackFeatureUse('yardage');
    unlockAchieve('yardage_king');

    var o = createOverlay('sg38YardageOv', '야디지 도미넌스 히트맵', 'linear-gradient(135deg,#f39c12,#e67e22)', '🔥');
    var body = o.body;

    var bands = ['50-75', '75-100', '100-125', '125-150', '150-175', '175-200', '200-225', '225-250'];
    var metrics = ['GIR%', 'Up&Down%', '평균퍼트', '스코어링효율'];
    var data = bands.map(function () {
      return [
        Math.floor(30 + Math.random() * 60),   // GIR%
        Math.floor(25 + Math.random() * 55),   // Up&Down%
        +(1.5 + Math.random() * 0.8).toFixed(1), // Avg putts
        Math.floor(40 + Math.random() * 50)    // Scoring efficiency
      ];
    });

    body.innerHTML = '<div class="sg38-canvas-wrap"><canvas id="sg38YardageCanvas" width="600" height="380"></canvas></div>' +
      '<div id="sg38YardageDetail" class="sg38-card" style="display:none;margin-top:10px"></div>';

    var canvas = document.getElementById('sg38YardageCanvas');
    var ctx = canvas.getContext('2d');
    var hoverCell = { r: -1, c: -1 };

    function heatColor(val, metric) {
      // For putts, lower is better
      var norm;
      if (metric === 2) {
        norm = 1 - Math.min(Math.max((val - 1.5) / 1.0, 0), 1);
      } else {
        norm = Math.min(Math.max(val / 100, 0), 1);
      }
      var r = Math.floor(220 - norm * 180);
      var g = Math.floor(50 + norm * 170);
      var b = Math.floor(50);
      return 'rgb(' + r + ',' + g + ',' + b + ')';
    }

    function drawHeatmap() {
      ctx.clearRect(0, 0, 600, 380);
      ctx.fillStyle = '#1a2520';
      ctx.fillRect(0, 0, 600, 380);

      ctx.fillStyle = '#fff';
      ctx.font = 'bold 14px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('야디지별 퍼포먼스 히트맵', 300, 25);

      var left = 90, top = 55, cellW = 110, cellH = 34;

      // Column headers
      ctx.font = 'bold 11px sans-serif';
      ctx.fillStyle = '#f39c12';
      for (var c = 0; c < metrics.length; c++) {
        ctx.fillText(metrics[c], left + c * cellW + cellW / 2, top - 8);
      }

      // Rows
      for (var rr = 0; rr < bands.length; rr++) {
        var y = top + rr * cellH;

        // Row label
        ctx.fillStyle = 'rgba(255,255,255,.6)';
        ctx.font = '11px sans-serif';
        ctx.textAlign = 'right';
        ctx.fillText(bands[rr] + ' yd', left - 8, y + cellH / 2 + 4);

        for (var cc = 0; cc < metrics.length; cc++) {
          var x = left + cc * cellW;
          var val = data[rr][cc];

          var isHover = rr === hoverCell.r && cc === hoverCell.c;
          ctx.fillStyle = heatColor(val, cc);
          ctx.globalAlpha = isHover ? 1 : 0.8;

          ctx.beginPath();
          ctx.roundRect(x + 2, y + 2, cellW - 4, cellH - 4, 4);
          ctx.fill();
          ctx.globalAlpha = 1;

          if (isHover) {
            ctx.strokeStyle = '#fff';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.roundRect(x + 2, y + 2, cellW - 4, cellH - 4, 4);
            ctx.stroke();
          }

          // Value
          ctx.fillStyle = '#fff';
          ctx.font = 'bold 12px sans-serif';
          ctx.textAlign = 'center';
          var display = cc === 2 ? val.toFixed(1) : val + '%';
          ctx.fillText(display, x + cellW / 2, y + cellH / 2 + 4);
        }
      }
    }

    drawHeatmap();

    canvas.addEventListener('mousemove', function (e) {
      var rect = canvas.getBoundingClientRect();
      var sx = 600 / rect.width, sy = 380 / rect.height;
      var mx = (e.clientX - rect.left) * sx;
      var my = (e.clientY - rect.top) * sy;
      var left = 90, top = 55, cellW = 110, cellH = 34;
      var c = Math.floor((mx - left) / cellW);
      var r = Math.floor((my - top) / cellH);
      if (c >= 0 && c < 4 && r >= 0 && r < 8) {
        hoverCell = { r: r, c: c };
        canvas.style.cursor = 'pointer';
      } else {
        hoverCell = { r: -1, c: -1 };
        canvas.style.cursor = 'default';
      }
      drawHeatmap();
    });

    canvas.addEventListener('click', function () {
      if (hoverCell.r >= 0 && hoverCell.c >= 0) {
        var det = document.getElementById('sg38YardageDetail');
        det.style.display = 'block';
        var val = data[hoverCell.r][hoverCell.c];
        var metricName = metrics[hoverCell.c];
        var bandName = bands[hoverCell.r];
        var rating = hoverCell.c === 2 ? (val <= 1.8 ? '우수' : val <= 2.0 ? '보통' : '주의') : (val >= 70 ? '우수' : val >= 50 ? '보통' : '주의');
        det.innerHTML = '<h4>' + bandName + ' yd - ' + metricName + '</h4><div class="sg38-stat"><span>수치</span><span class="sg38-stat-val">' + (hoverCell.c === 2 ? val.toFixed(1) : val + '%') + '</span></div><div class="sg38-stat"><span>평가</span><span class="sg38-stat-val" style="color:' + (rating === '우수' ? '#2ecc71' : rating === '보통' ? '#f1c40f' : '#e74c3c') + '">' + rating + '</span></div>';
        sg38sfx('yardage_hot');
      }
    });
  }

  // ===== 8. GROWTH REPORT =====
  function openGrowthReport() {
    sg38sfx('growth_gauge');
    trackFeatureUse('growth');
    unlockAchieve('growth_tracker');

    var o = createOverlay('sg38GrowthOv', '성장 리포트', 'linear-gradient(135deg,#e17055,#d63031)', '📋');
    var body = o.body;

    var categories = ['드라이빙', '아이언', '숏게임', '퍼팅', '코스전략', '멘탈', '체력', '종합'];
    var saved = LS('growth_scores');
    var currentScores = saved || categories.map(function () { return Math.floor(40 + Math.random() * 50); });
    if (!saved) LS('growth_scores', currentScores);
    var prevScores = currentScores.map(function (s) { return Math.max(0, s - Math.floor(Math.random() * 15 - 3)); });
    var overall = currentScores[7];

    if (overall >= 60) unlockAchieve('growth_achiever');

    body.innerHTML = '<div style="text-align:center;margin-bottom:14px"><span style="color:rgba(255,255,255,.5);font-size:12px">종합 등급</span><div class="sg38-grade ' + gradeClass(overall, 100) + '" style="width:56px;height:56px;font-size:24px;margin:8px auto">' + gradeLabel(overall, 100) + '</div></div>' +
      '<div class="sg38-canvas-wrap"><canvas id="sg38GrowthCanvas" width="620" height="400"></canvas></div>';

    var canvas = document.getElementById('sg38GrowthCanvas');
    var ctx = canvas.getContext('2d');

    function drawGrowth() {
      ctx.clearRect(0, 0, 620, 400);
      ctx.fillStyle = '#1a1a30';
      ctx.fillRect(0, 0, 620, 400);

      var cols = 4, rows = 2;
      var cellW = 140, cellH = 170;
      var startX = (620 - cols * cellW) / 2;
      var startY = 20;

      for (var i = 0; i < categories.length; i++) {
        var col = i % cols;
        var row = Math.floor(i / cols);
        var cx = startX + col * cellW + cellW / 2;
        var cy = startY + row * cellH + 65;
        var r = 52;

        var score = currentScores[i];
        var prev = prevScores[i];
        var diff = score - prev;

        // Half-circle gauge background
        ctx.strokeStyle = 'rgba(255,255,255,.1)';
        ctx.lineWidth = 12;
        ctx.beginPath();
        ctx.arc(cx, cy, r, Math.PI, 0);
        ctx.stroke();

        // Gauge fill
        var pct = score / 100;
        var gaugeAngle = Math.PI + pct * Math.PI;
        var grad = ctx.createLinearGradient(cx - r, cy, cx + r, cy);
        if (score >= 75) {
          grad.addColorStop(0, '#2ecc71');
          grad.addColorStop(1, '#27ae60');
        } else if (score >= 50) {
          grad.addColorStop(0, '#f39c12');
          grad.addColorStop(1, '#e67e22');
        } else {
          grad.addColorStop(0, '#e74c3c');
          grad.addColorStop(1, '#c0392b');
        }
        ctx.strokeStyle = grad;
        ctx.lineWidth = 12;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.arc(cx, cy, r, Math.PI, gaugeAngle);
        ctx.stroke();
        ctx.lineCap = 'butt';

        // Score in center
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 22px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(score, cx, cy + 6);

        // Category label
        ctx.fillStyle = 'rgba(255,255,255,.7)';
        ctx.font = 'bold 12px sans-serif';
        ctx.fillText(categories[i], cx, cy - r - 16);

        // Diff arrow
        var arrowColor = diff > 0 ? '#2ecc71' : diff < 0 ? '#e74c3c' : '#f1c40f';
        var arrowText = diff > 0 ? '+' + diff : diff === 0 ? '=' : '' + diff;
        ctx.fillStyle = arrowColor;
        ctx.font = 'bold 12px sans-serif';
        ctx.fillText((diff > 0 ? '▲' : diff < 0 ? '▼' : '●') + ' ' + arrowText, cx, cy + r - 16);

        // Grade label
        ctx.fillStyle = 'rgba(255,255,255,.4)';
        ctx.font = '10px sans-serif';
        ctx.fillText(gradeLabel(score, 100) + '등급', cx, cy + r - 2);
      }
    }

    drawGrowth();
  }

  // ===== GOLF IQ v22 (15 questions) =====
  function openGolfIQv22() {
    sg38sfx('consistency_scan');
    trackFeatureUse('iqv22');
    unlockAchieve('golf_iq_v22_starter');

    var questions = [
      { q: '스윙 일관성을 측정하는 가장 적절한 통계 지표는?', o: ['평균 비거리', '변동계수(CV)', '최대 비거리', '중앙값'], c: 1 },
      { q: '리스크-리워드 매트릭스에서 "효율적" 홀이란?', o: ['높은 리스크, 높은 리워드', '낮은 리스크, 높은 리워드', '높은 리스크, 낮은 리워드', '낮은 리스크, 낮은 리워드'], c: 1 },
      { q: '퍼팅 스트로크에서 이상적인 백스윙:임팩트 템포 비율은?', o: ['1:1', '2:1', '3:1', '1:2'], c: 1 },
      { q: '클럽 로테이션 최적화의 주요 목적은?', o: ['모든 클럽 동일 사용', '코스에 맞는 최적 배분', '드라이버 위주 사용', '웨지 사용 최소화'], c: 1 },
      { q: '멘탈 회복력에서 "바운스백"이란?', o: ['보기 후 파 기록', '더블보기 후 버디 이상 기록', '보기 후 버디 이상 기록', 'OB 후 파 기록'], c: 2 },
      { q: 'Strokes Gained이 양수(+)인 홀의 의미는?', o: ['평균보다 나쁜 성적', '평균과 동일한 성적', '평균보다 좋은 성적', 'Par와 동일한 성적'], c: 2 },
      { q: '야디지 컨트롤에서 가장 중요한 요소는?', o: ['최대 거리', '거리 정확도와 일관성', '스핀량', '탄도 높이'], c: 1 },
      { q: '성장 리포트에서 S등급 기준은?', o: ['60점 이상', '70점 이상', '80점 이상', '90점 이상'], c: 3 },
      { q: '변동계수(CV)가 8% 미만인 클럽의 일관성 등급은?', o: ['주의', '보통', '우수', '최우수'], c: 2 },
      { q: 'GIR(Greens In Regulation) 퍼센트의 의미는?', o: ['페어웨이 안착률', '그린 적중률', '퍼팅 성공률', '파 세이브율'], c: 1 },
      { q: 'Up & Down 성공률이 높다는 것은?', o: ['드라이버 정확도가 높음', '퍼팅 거리가 김', '숏게임 회복 능력이 우수', '아이언 비거리가 김'], c: 2 },
      { q: '스코어링 효율성에 가장 큰 영향을 미치는 거리 구간은?', o: ['200-250 yd', '150-200 yd', '100-150 yd', '50-100 yd'], c: 3 },
      { q: '바운스백률이 30%라면 이는 어떤 수준인가?', o: ['매우 낮음', '낮음', '보통 이상', '매우 높음'], c: 2 },
      { q: '코스 매니지먼트에서 가장 중요한 판단 기준은?', o: ['항상 공격적 플레이', '자신의 능력과 상황에 맞는 판단', '항상 보수적 플레이', '동반자의 전략 따라하기'], c: 1 },
      { q: '샷 분산(Dispersion)이 좁다는 것은?', o: ['비거리가 짧음', '일관성이 높음', '스핀이 많음', '탄도가 낮음'], c: 1 }
    ];

    var o = createOverlay('sg38IQOv', 'Golf IQ v22', 'linear-gradient(135deg,#3498db,#2980b9)', '📝');
    var body = o.body;

    var state = { current: 0, correct: 0, answered: false };

    function renderQuestion() {
      var q = questions[state.current];
      var html = '<div style="margin-bottom:14px"><span style="color:rgba(255,255,255,.4);font-size:12px">Question ' + (state.current + 1) + ' / ' + questions.length + '</span><div class="sg38-progress"><div class="sg38-progress-fill" style="width:' + ((state.current + 1) / questions.length * 100) + '%;background:linear-gradient(90deg,#3498db,#2980b9)"></div></div></div>' +
        '<div class="sg38-card"><h4 style="line-height:1.5">' + q.q + '</h4></div>' +
        '<div id="sg38IQOptions"></div>' +
        '<div id="sg38IQResult" style="display:none;margin-top:12px"></div>' +
        '<div style="text-align:center;margin-top:14px"><span style="color:rgba(255,255,255,.5);font-size:12px">정답: ' + state.correct + ' / ' + state.current + '</span></div>';
      body.innerHTML = html;

      var optsDiv = document.getElementById('sg38IQOptions');
      q.o.forEach(function (opt, idx) {
        var btn = document.createElement('button');
        btn.className = 'sg38-quiz-opt';
        btn.textContent = String.fromCharCode(65 + idx) + '. ' + opt;
        btn.onclick = function () {
          if (state.answered) return;
          state.answered = true;
          var isCorrect = idx === q.c;
          if (isCorrect) {
            state.correct++;
            btn.classList.add('correct');
            sg38sfx('consistency_grade');
          } else {
            btn.classList.add('wrong');
            optsDiv.children[q.c].classList.add('correct');
            sg38sfx('risk_plot');
          }

          var result = document.getElementById('sg38IQResult');
          result.style.display = 'block';
          result.innerHTML = '<div class="sg38-card" style="border-color:' + (isCorrect ? 'rgba(46,204,113,.3)' : 'rgba(231,76,60,.3)') + '"><p style="color:' + (isCorrect ? '#2ecc71' : '#e74c3c') + ';font-weight:700">' + (isCorrect ? '정답입니다!' : '오답! 정답은 ' + String.fromCharCode(65 + q.c) + '입니다.') + '</p></div>' +
            '<div style="text-align:center;margin-top:10px"><button class="sg38-btn" style="background:linear-gradient(135deg,#3498db,#2980b9)" id="sg38IQNext">' + (state.current < questions.length - 1 ? '다음 문제' : '결과 보기') + '</button></div>';

          document.getElementById('sg38IQNext').onclick = function () {
            state.current++;
            state.answered = false;
            if (state.current < questions.length) {
              renderQuestion();
            } else {
              showResults();
            }
          };
        };
        optsDiv.appendChild(btn);
      });
    }

    function showResults() {
      var pct = Math.round(state.correct / questions.length * 100);
      var grade = gradeLabel(state.correct, questions.length);
      LS('iq_v22_score', state.correct);
      if (state.correct >= 12) unlockAchieve('golf_iq_v22_master');

      body.innerHTML = '<div style="text-align:center"><div style="font-size:48px;margin-bottom:10px">' + (pct >= 80 ? '🏆' : pct >= 60 ? '👏' : '📚') + '</div>' +
        '<div style="font-size:14px;color:rgba(255,255,255,.5);margin-bottom:8px">Golf IQ v22 결과</div>' +
        '<div style="font-size:36px;font-weight:900;color:#fff;margin-bottom:6px">' + state.correct + '<span style="font-size:18px;color:rgba(255,255,255,.4)"> / ' + questions.length + '</span></div>' +
        '<div class="sg38-grade ' + gradeClass(state.correct, questions.length) + '" style="margin:12px auto">' + grade + '</div>' +
        '<div style="font-size:13px;color:rgba(255,255,255,.6);margin-top:12px">정답률: ' + pct + '%</div>' +
        '<div class="sg38-progress" style="max-width:300px;margin:10px auto"><div class="sg38-progress-fill" style="width:' + pct + '%;background:linear-gradient(90deg,#3498db,#2980b9)"></div></div>' +
        '<button class="sg38-btn" style="background:linear-gradient(135deg,#3498db,#2980b9);margin-top:16px" onclick="document.getElementById(\'sg38IQOv\').classList.remove(\'active\')">닫기</button></div>';
    }

    renderQuestion();
  }

  // ===== NAVIGATION =====
  var navItems = [
    { icon: '📊', label: 'Consist', fn: openSwingConsistencyIndex },
    { icon: '⚖️', label: 'Risk', fn: openRiskRewardMatrix },
    { icon: '🎯', label: 'Stroke', fn: openPuttingStrokeAnalyzer },
    { icon: '🔄', label: 'Rotate', fn: openClubRotationOptimizer },
    { icon: '🧠', label: 'Resilience', fn: openMentalResilienceTracker },
    { icon: '📈', label: 'SG', fn: openStrokesGainedByHole },
    { icon: '🔥', label: 'Yardage', fn: openYardageDominanceHeatmap },
    { icon: '📋', label: 'Growth', fn: openGrowthReport },
    { icon: '📝', label: 'IQ v22', fn: openGolfIQv22 }
  ];

  var existingBar = document.querySelector('.sg30-bottom-bar') || document.querySelector('[class*="bottom-bar"]');
  if (existingBar) {
    navItems.forEach(function (item) {
      var btn = document.createElement('button');
      btn.className = existingBar.querySelector('button') ? existingBar.querySelector('button').className : 'sg30-bbtn';
      btn.innerHTML = '<span class="' + (existingBar.querySelector('.sg30-bbtn-icon') ? 'sg30-bbtn-icon' : 'sg38-bbtn-icon') + '">' + item.icon + '</span><span class="' + (existingBar.querySelector('.sg30-bbtn-label') ? 'sg30-bbtn-label' : 'sg38-bbtn-label') + '">' + item.label + '</span>';
      btn.onclick = item.fn;
      existingBar.appendChild(btn);
    });
  }

  // ===== KEYBOARD SHORTCUTS (Shift+Key) =====
  var keyMap = {
    Q: openSwingConsistencyIndex,
    W: openRiskRewardMatrix,
    E: openPuttingStrokeAnalyzer,
    R: openClubRotationOptimizer,
    T: openMentalResilienceTracker,
    Y: openStrokesGainedByHole,
    U: openYardageDominanceHeatmap,
    I: openGrowthReport,
    O: openGolfIQv22
  };

  document.addEventListener('keydown', function (e) {
    // ESC closes overlays
    if (e.key === 'Escape') {
      var overlays = document.querySelectorAll('.sg38-overlay.active');
      overlays.forEach(function (ov) { ov.classList.remove('active'); });
      return;
    }
    // Shift+key shortcuts
    if (e.shiftKey && !e.ctrlKey && !e.altKey && !e.metaKey) {
      var key = e.key.toUpperCase();
      if (keyMap[key]) {
        e.preventDefault();
        keyMap[key]();
      }
    }
  });

  // ===== EXPOSE GLOBALS FOR INLINE ONCLICK =====
  window.openSwingConsistencyIndex = openSwingConsistencyIndex;
  window.openRiskRewardMatrix = openRiskRewardMatrix;
  window.openPuttingStrokeAnalyzer = openPuttingStrokeAnalyzer;
  window.openClubRotationOptimizer = openClubRotationOptimizer;
  window.openMentalResilienceTracker = openMentalResilienceTracker;
  window.openStrokesGainedByHole = openStrokesGainedByHole;
  window.openYardageDominanceHeatmap = openYardageDominanceHeatmap;
  window.openGrowthReport = openGrowthReport;
  window.openGolfIQv22 = openGolfIQv22;

  console.log('[SmartGolf v38.0] Loaded: 8 canvas features, Golf IQ v22, 15 achievements, 16 SFX, 9 nav buttons');
})();
