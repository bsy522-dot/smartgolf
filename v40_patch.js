(function () {
  'use strict';

  // ===== LOCALSTORAGE HELPER =====
  var LS = function (k, v) {
    return v === undefined
      ? JSON.parse(localStorage.getItem('sg40b_' + k) || 'null')
      : localStorage.setItem('sg40b_' + k, JSON.stringify(v));
  };

  // ===== SFX ENGINE (16 new SFX, 332->348) =====
  var sfxCtx = null;
  function sg40sfx(name) {
    if (!sfxCtx) {
      try { sfxCtx = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) { return; }
    }
    var map = {
      swing_phase:     { f: 480, d: 0.20, t: 'sine', v: 0.22 },
      swing_torque:    { f: 720, d: 0.25, t: 'triangle', v: 0.28 },
      risk_plot:       { f: 440, d: 0.18, t: 'sine', v: 0.20 },
      risk_strat:      { f: 660, d: 0.22, t: 'triangle', v: 0.26 },
      combo_calc:      { f: 520, d: 0.15, t: 'sine', v: 0.20 },
      combo_opt:       { f: 780, d: 0.28, t: 'triangle', v: 0.30 },
      sleep_corr:      { f: 360, d: 0.20, t: 'sine', v: 0.18 },
      sleep_trend:     { f: 600, d: 0.22, t: 'triangle', v: 0.24 },
      pattern_mine:    { f: 500, d: 0.18, t: 'square', v: 0.16 },
      pattern_streak:  { f: 700, d: 0.25, t: 'sine', v: 0.28 },
      cond_radar:      { f: 420, d: 0.20, t: 'sine', v: 0.22 },
      cond_impact:     { f: 640, d: 0.22, t: 'triangle', v: 0.26 },
      miss_scan:       { f: 380, d: 0.18, t: 'sawtooth', v: 0.14 },
      miss_fix:        { f: 750, d: 0.25, t: 'triangle', v: 0.28 },
      entropy_calc:    { f: 460, d: 0.20, t: 'sine', v: 0.22 },
      achieve_v40:     { f: 920, d: 0.35, t: 'sine', v: 0.32 }
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
  var css40 = document.createElement('style');
  css40.textContent = [
    '.sg40-overlay{position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,.88);z-index:10100;display:none;align-items:center;justify-content:center;backdrop-filter:blur(20px)}',
    '.sg40-overlay.active{display:flex}',
    '.sg40-panel{background:#0d1b2a;border-radius:24px;padding:28px;width:96%;max-width:720px;max-height:92vh;overflow-y:auto;box-shadow:0 40px 120px rgba(0,0,0,.7);animation:sg40Rise .35s cubic-bezier(.22,1,.36,1)}',
    '@keyframes sg40Rise{from{opacity:0;transform:translateY(40px) scale(.92)}to{opacity:1;transform:translateY(0) scale(1)}}',
    '.sg40-hdr{display:flex;justify-content:space-between;align-items:center;margin-bottom:18px;padding-bottom:14px;border-bottom:1px solid rgba(255,255,255,.1)}',
    '.sg40-hdr h2{font-size:20px;font-weight:800;color:#fff;display:flex;align-items:center;gap:10px}',
    '.sg40-hdr-icon{font-size:26px}',
    '.sg40-x{background:none;border:none;font-size:28px;cursor:pointer;color:rgba(255,255,255,.5);padding:4px 10px;border-radius:10px;transition:.2s}',
    '.sg40-x:hover{background:rgba(255,255,255,.1);color:#fff}',
    '.sg40-card{background:rgba(255,255,255,.06);border-radius:16px;padding:18px;margin-bottom:12px;border:1px solid rgba(255,255,255,.08);transition:.25s}',
    '.sg40-card:hover{border-color:rgba(255,255,255,.2);transform:translateY(-1px)}',
    '.sg40-card h4{font-size:14px;font-weight:700;color:#fff;margin-bottom:8px;display:flex;align-items:center;gap:8px}',
    '.sg40-card p{font-size:12px;color:rgba(255,255,255,.6);line-height:1.7}',
    '.sg40-grade{display:inline-flex;align-items:center;justify-content:center;width:42px;height:42px;border-radius:50%;font-size:18px;font-weight:900;color:#fff}',
    '.sg40-grade-s{background:linear-gradient(135deg,#ffd700,#ffaa00)}',
    '.sg40-grade-a{background:linear-gradient(135deg,#2ecc71,#27ae60)}',
    '.sg40-grade-b{background:linear-gradient(135deg,#3498db,#2980b9)}',
    '.sg40-grade-c{background:linear-gradient(135deg,#e67e22,#d35400)}',
    '.sg40-grade-d{background:linear-gradient(135deg,#e74c3c,#c0392b)}',
    '.sg40-btn{padding:10px 22px;border:none;border-radius:12px;font-size:13px;font-weight:700;cursor:pointer;transition:.25s;display:inline-flex;align-items:center;gap:6px;color:#fff}',
    '.sg40-btn:hover{transform:translateY(-2px);box-shadow:0 6px 18px rgba(0,0,0,.3)}',
    '.sg40-tabs{display:flex;gap:6px;margin-bottom:16px;overflow-x:auto;padding-bottom:4px;scrollbar-width:none}',
    '.sg40-tabs::-webkit-scrollbar{display:none}',
    '.sg40-tab{padding:9px 18px;border-radius:22px;border:1.5px solid rgba(255,255,255,.15);background:transparent;font-size:11px;font-weight:700;cursor:pointer;white-space:nowrap;transition:.25s;color:rgba(255,255,255,.6)}',
    '.sg40-tab.active{background:#0077b6;color:#fff;border-color:#0077b6;box-shadow:0 3px 14px rgba(0,119,182,.35)}',
    '.sg40-stat{display:flex;justify-content:space-between;align-items:center;padding:12px 0;border-bottom:1px solid rgba(255,255,255,.08);color:#fff;font-size:13px}',
    '.sg40-stat:last-child{border-bottom:none}',
    '.sg40-stat-val{font-weight:800;font-size:15px}',
    '.sg40-progress{width:100%;height:12px;background:rgba(255,255,255,.1);border-radius:6px;overflow:hidden;margin:6px 0}',
    '.sg40-progress-fill{height:100%;border-radius:6px;transition:width .6s ease}',
    '.sg40-quiz-opt{display:block;width:100%;padding:14px 18px;margin-bottom:8px;background:rgba(255,255,255,.06);border:1.5px solid rgba(255,255,255,.12);border-radius:14px;color:#fff;font-size:13px;cursor:pointer;transition:.25s;text-align:left}',
    '.sg40-quiz-opt:hover{background:rgba(255,255,255,.12);border-color:rgba(255,255,255,.25)}',
    '.sg40-quiz-opt.correct{background:rgba(46,204,113,.25);border-color:#2ecc71}',
    '.sg40-quiz-opt.wrong{background:rgba(231,76,60,.25);border-color:#e74c3c}'
  ].join('\n');
  document.head.appendChild(css40);

  // ===== UTILITY =====
  function createOverlay(id) {
    var ov = document.createElement('div');
    ov.className = 'sg40-overlay';
    ov.id = id;
    ov.addEventListener('click', function (e) { if (e.target === ov) ov.classList.remove('active'); });
    document.body.appendChild(ov);
    return ov;
  }

  function gradeClass(score, max) {
    var pct = score / max * 100;
    if (pct >= 90) return 'sg40-grade-s';
    if (pct >= 75) return 'sg40-grade-a';
    if (pct >= 60) return 'sg40-grade-b';
    if (pct >= 40) return 'sg40-grade-c';
    return 'sg40-grade-d';
  }

  function gradeLetter(score, max) {
    var pct = score / max * 100;
    if (pct >= 90) return 'S';
    if (pct >= 75) return 'A';
    if (pct >= 60) return 'B';
    if (pct >= 40) return 'C';
    return 'D';
  }

  // ===== 빈 상태 안내 =====
  var EMPTY_MSG = '기록을 추가하면 표시됩니다';
  function drawEmpty40(ctx, W, H, title) {
    ctx.fillStyle = '#0a0a1a';
    ctx.fillRect(0, 0, W, H);
    if (title) {
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 14px sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText(title, 20, 30);
    }
    ctx.fillStyle = 'rgba(255,255,255,.45)';
    ctx.font = '14px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(EMPTY_MSG, W / 2, H / 2);
    ctx.textBaseline = 'alphabetic';
  }

  // ===== ACHIEVEMENTS ENGINE (15 new, 332->347) =====
  var achievements40 = [
    { id: 'sg40_swing_mech', name: '스윙 역학자', desc: '스윙 역학 시뮬레이터 첫 분석', icon: '🔬' },
    { id: 'sg40_risk_analyst', name: '리스크 분석가', desc: '리스크-리워드 매트릭스 완료', icon: '⚖️' },
    { id: 'sg40_safe_player', name: '안전 루트 전문가', desc: '안전 루트 전략 3회 수립', icon: '🛡️' },
    { id: 'sg40_combo_opt', name: '클럽 조합 최적가', desc: '클럽 조합 최적화 첫 실행', icon: '🎒' },
    { id: 'sg40_coverage', name: '거리 커버리지 100%', desc: '전 거리대 커버 달성', icon: '📏' },
    { id: 'sg40_sleep_track', name: '수면 관리자', desc: '수면-성적 상관분석 첫 조회', icon: '😴' },
    { id: 'sg40_pattern_miner', name: '패턴 마이너', desc: '스코어카드 패턴 마이닝 완료', icon: '🔍' },
    { id: 'sg40_streak_finder', name: '연속 기록 탐지', desc: '3홀 연속 파 이상 패턴 발견', icon: '🔥' },
    { id: 'sg40_cond_expert', name: '코스 컨디션 전문가', desc: '코스 컨디션 5축 분석 완료', icon: '🌿' },
    { id: 'sg40_miss_analyst', name: '미스샷 분석가', desc: '미스샷 교정 가이드 첫 조회', icon: '🎯' },
    { id: 'sg40_fix_master', name: '교정 마스터', desc: '3개 이상 미스샷 교정 계획 수립', icon: '🔧' },
    { id: 'sg40_entropy_low', name: '일관성의 대가', desc: '라운드 엔트로피 30% 이하 달성', icon: '📐' },
    { id: 'sg40_iq24_pass', name: 'Golf IQ v24', desc: 'Golf IQ v24 퀴즈 70% 이상', icon: '🧠' },
    { id: 'sg40_iq24_perfect', name: 'IQ v24 만점', desc: 'Golf IQ v24 100% 정답', icon: '👑' }
  ];

  function unlockAchievement(achId) {
    if (LS('ach_' + achId)) return;
    LS('ach_' + achId, true);
    sg40sfx('achieve_v40');
    var ach = achievements40.find(function (a) { return a.id === achId; });
    if (!ach) return;
    var toast = document.createElement('div');
    toast.style.cssText = 'position:fixed;top:20px;left:50%;transform:translateX(-50%);background:linear-gradient(135deg,#0077b6,#023e8a);color:#fff;padding:16px 28px;border-radius:16px;z-index:99999;font-size:14px;font-weight:700;box-shadow:0 10px 40px rgba(0,0,0,.5);animation:sg40Rise .4s ease;display:flex;align-items:center;gap:10px';
    toast.innerHTML = '<span style="font-size:24px">' + ach.icon + '</span><span>' + ach.name + ' &#128275;</span>';
    document.body.appendChild(toast);
    setTimeout(function () { toast.remove(); }, 3500);
  }

  // ===== 1. SWING MECHANICS SIMULATOR (Canvas 620x400) =====
  function openSwingMechanics() {
    sg40sfx('swing_phase');
    unlockAchievement('sg40_swing_mech');
    var ov = document.getElementById('sg40-swing') || createOverlay('sg40-swing');
    var phases = [
      { name: '어드레스', angle: 0, torque: 10, optimal: [0, 5], color: '#3498db' },
      { name: '테이크어웨이', angle: 45, torque: 25, optimal: [40, 50], color: '#2ecc71' },
      { name: '백스윙 탑', angle: 90, torque: 40, optimal: [85, 95], color: '#f39c12' },
      { name: '다운스윙', angle: 60, torque: 75, optimal: [55, 65], color: '#e74c3c' },
      { name: '임팩트', angle: 0, torque: 100, optimal: [-2, 3], color: '#9b59b6' },
      { name: '팔로우스루', angle: -30, torque: 55, optimal: [-35, -25], color: '#1abc9c' },
      { name: '피니시', angle: -60, torque: 15, optimal: [-65, -55], color: '#e67e22' }
    ];

    var html = '<div class="sg40-panel"><div class="sg40-hdr"><h2><span class="sg40-hdr-icon">🔬</span>스윙 역학 시뮬레이터</h2><button class="sg40-x" onclick="this.closest(\'.sg40-overlay\').classList.remove(\'active\')">&times;</button></div>';
    html += '<canvas id="sg40-swing-cv" width="620" height="400" style="width:100%;border-radius:14px;background:#0a0a1a;margin-bottom:16px"></canvas>';
    html += '<div class="sg40-card"><h4>📊 스윙 단계별 기준값 <span style="font-size:11px;font-weight:400;color:rgba(255,255,255,.5)">(참고 자료 · 측정치 아님)</span></h4>';
    phases.forEach(function (p, i) {
      html += '<div class="sg40-stat"><span>' + (i + 1) + '. ' + p.name + '</span><span class="sg40-stat-val" style="color:' + p.color + '">' + p.angle + '&deg; / ' + p.torque + '%</span></div>';
    });
    html += '</div>';
    html += '<div class="sg40-card"><h4>ℹ️ 이 표에 대하여</h4><p style="color:rgba(255,255,255,.6);font-size:13px;line-height:1.6;margin:8px 0 0">' +
      '위 각도·토크는 일반적인 스윙 단계를 설명하기 위한 <b>교육용 기준값</b>이며, 내 스윙을 측정한 값이 아닙니다. ' +
      '따라서 이 화면은 개인 점수나 등급을 매기지 않습니다.</p></div></div>';
    ov.innerHTML = html;
    ov.classList.add('active');

    setTimeout(function () {
      var cv = document.getElementById('sg40-swing-cv');
      if (!cv) return;
      var ctx = cv.getContext('2d');
      var W = 620, H = 400;
      ctx.fillStyle = '#0a0a1a';
      ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 14px sans-serif';
      ctx.fillText('스윙 각도 &amp; 토크 분석', 20, 30);

      var padL = 70, padR = 30, padT = 55, padB = 60;
      var chartW = W - padL - padR, chartH = H - padT - padB;
      var n = phases.length;

      // grid
      ctx.strokeStyle = 'rgba(255,255,255,.08)';
      ctx.lineWidth = 1;
      for (var i = 0; i <= 5; i++) {
        var y = padT + chartH * i / 5;
        ctx.beginPath(); ctx.moveTo(padL, y); ctx.lineTo(padL + chartW, y); ctx.stroke();
      }

      // angle line
      ctx.strokeStyle = '#3498db';
      ctx.lineWidth = 3;
      ctx.beginPath();
      phases.forEach(function (p, i) {
        var x = padL + (i / (n - 1)) * chartW;
        var y = padT + chartH / 2 - (p.angle / 100) * (chartH / 2);
        if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      });
      ctx.stroke();

      // torque line
      ctx.strokeStyle = '#e74c3c';
      ctx.lineWidth = 3;
      ctx.beginPath();
      phases.forEach(function (p, i) {
        var x = padL + (i / (n - 1)) * chartW;
        var y = padT + chartH - (p.torque / 100) * chartH;
        if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      });
      ctx.stroke();

      // dots
      phases.forEach(function (p, i) {
        var x = padL + (i / (n - 1)) * chartW;
        var yA = padT + chartH / 2 - (p.angle / 100) * (chartH / 2);
        var yT = padT + chartH - (p.torque / 100) * chartH;
        ctx.fillStyle = '#3498db';
        ctx.beginPath(); ctx.arc(x, yA, 5, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#e74c3c';
        ctx.beginPath(); ctx.arc(x, yT, 5, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = 'rgba(255,255,255,.6)';
        ctx.font = '10px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(p.name, x, H - padB + 20);
      });

      // Y labels
      ctx.fillStyle = 'rgba(255,255,255,.5)';
      ctx.font = '10px sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText('90°', padL - 8, padT + 10);
      ctx.fillText('0°', padL - 8, padT + chartH / 2 + 4);
      ctx.fillText('-90°', padL - 8, padT + chartH);

      // legend
      ctx.font = 'bold 11px sans-serif';
      ctx.fillStyle = '#3498db';
      ctx.fillRect(W - 180, 20, 12, 12);
      ctx.fillStyle = '#fff';
      ctx.textAlign = 'left';
      ctx.fillText('각도(°)', W - 164, 31);
      ctx.fillStyle = '#e74c3c';
      ctx.fillRect(W - 100, 20, 12, 12);
      ctx.fillStyle = '#fff';
      ctx.fillText('토크(%)', W - 84, 31);
    }, 80);
  }

  // ===== 2. HOLE RISK-REWARD MATRIX (Canvas 640x400) =====
  function openRiskRewardMatrix() {
    sg40sfx('risk_plot');
    unlockAchievement('sg40_risk_analyst');
    var ov = document.getElementById('sg40-risk') || createOverlay('sg40-risk');
    var holes = LS('risk_data') || [];

    var safeCount = holes.filter(function (h) { return h.strategy === 'safe'; }).length;
    if (safeCount >= 6) unlockAchievement('sg40_safe_player');

    var html = '<div class="sg40-panel"><div class="sg40-hdr"><h2><span class="sg40-hdr-icon">⚖️</span>홀별 리스크-리워드 매트릭스</h2><button class="sg40-x" onclick="this.closest(\'.sg40-overlay\').classList.remove(\'active\')">&times;</button></div>';
    html += '<canvas id="sg40-risk-cv" width="640" height="400" style="width:100%;border-radius:14px;background:#0a0a1a;margin-bottom:16px"></canvas>';
    html += '<div class="sg40-card"><h4>🗺️ 홀별 전략 요약</h4>';
    if (!holes.length) {
      html += '<p style="color:rgba(255,255,255,.5)">' + EMPTY_MSG + '</p>';
    } else {
      html += '<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px">';
      holes.forEach(function (h) {
        var bgColor = h.strategy === 'aggressive' ? 'rgba(231,76,60,.15)' : 'rgba(46,204,113,.15)';
        var borderColor = h.strategy === 'aggressive' ? 'rgba(231,76,60,.4)' : 'rgba(46,204,113,.4)';
        html += '<div style="background:' + bgColor + ';border:1px solid ' + borderColor + ';border-radius:10px;padding:8px;text-align:center"><div style="color:#fff;font-weight:800;font-size:13px">' + h.hole + 'H</div><div style="font-size:10px;color:rgba(255,255,255,.5)">Par ' + h.par + '</div><div style="font-size:10px;color:' + (h.strategy === 'aggressive' ? '#e74c3c' : '#2ecc71') + ';font-weight:700;margin-top:2px">' + (h.strategy === 'aggressive' ? '공격' : '안전') + '</div></div>';
      });
      html += '</div>';
    }
    html += '</div></div>';
    ov.innerHTML = html;
    ov.classList.add('active');

    setTimeout(function () {
      var cv = document.getElementById('sg40-risk-cv');
      if (!cv) return;
      var ctx = cv.getContext('2d');
      var W = 640, H = 400;
      if (!holes.length) { drawEmpty40(ctx, W, H, '리스크 vs 리워드 산점도'); return; }
      ctx.fillStyle = '#0a0a1a';
      ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 14px sans-serif';
      ctx.fillText('리스크 vs 리워드 산점도', 20, 30);

      var padL = 60, padR = 30, padT = 50, padB = 50;
      var cW = W - padL - padR, cH = H - padT - padB;

      // quadrant bg
      ctx.fillStyle = 'rgba(46,204,113,.04)';
      ctx.fillRect(padL, padT, cW / 2, cH / 2);
      ctx.fillStyle = 'rgba(241,196,15,.04)';
      ctx.fillRect(padL + cW / 2, padT, cW / 2, cH / 2);
      ctx.fillStyle = 'rgba(52,152,219,.04)';
      ctx.fillRect(padL, padT + cH / 2, cW / 2, cH / 2);
      ctx.fillStyle = 'rgba(231,76,60,.04)';
      ctx.fillRect(padL + cW / 2, padT + cH / 2, cW / 2, cH / 2);

      // axes
      ctx.strokeStyle = 'rgba(255,255,255,.15)';
      ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(padL, padT + cH); ctx.lineTo(padL + cW, padT + cH); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(padL, padT); ctx.lineTo(padL, padT + cH); ctx.stroke();

      // labels
      ctx.fillStyle = 'rgba(255,255,255,.5)';
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('→ 리스크 (높음)', padL + cW / 2, H - 10);
      ctx.save();
      ctx.translate(15, padT + cH / 2);
      ctx.rotate(-Math.PI / 2);
      ctx.fillText('→ 리워드 (높음)', 0, 0);
      ctx.restore();

      // dots
      holes.forEach(function (h) {
        var x = padL + (h.risk / 100) * cW;
        var y = padT + cH - (h.reward / 100) * cH;
        ctx.fillStyle = h.strategy === 'aggressive' ? 'rgba(231,76,60,.8)' : 'rgba(46,204,113,.8)';
        ctx.beginPath(); ctx.arc(x, y, 10, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 9px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(h.hole + '', x, y + 3);
      });

      // quadrant labels
      ctx.font = 'bold 11px sans-serif';
      ctx.fillStyle = 'rgba(46,204,113,.5)';
      ctx.fillText('저위험/고리워드', padL + cW * 0.25, padT + 25);
      ctx.fillStyle = 'rgba(241,196,15,.5)';
      ctx.fillText('고위험/고리워드', padL + cW * 0.75, padT + 25);
      ctx.fillStyle = 'rgba(52,152,219,.5)';
      ctx.fillText('저위험/저리워드', padL + cW * 0.25, padT + cH - 10);
      ctx.fillStyle = 'rgba(231,76,60,.5)';
      ctx.fillText('고위험/저리워드', padL + cW * 0.75, padT + cH - 10);
    }, 80);
  }

  // ===== 3. CLUB COMBO OPTIMIZER (Canvas 620x400) =====
  function openClubComboOptimizer() {
    sg40sfx('combo_calc');
    unlockAchievement('sg40_combo_opt');
    var ov = document.getElementById('sg40-combo') || createOverlay('sg40-combo');
    var CLUB_DEFS = [
      { name: 'DR', color: '#e74c3c' }, { name: '3W', color: '#e67e22' }, { name: '5W', color: '#f39c12' },
      { name: '4I', color: '#2ecc71' }, { name: '5I', color: '#27ae60' }, { name: '6I', color: '#1abc9c' },
      { name: '7I', color: '#3498db' }, { name: '8I', color: '#2980b9' }, { name: '9I', color: '#9b59b6' },
      { name: 'PW', color: '#8e44ad' }, { name: 'AW', color: '#e74c3c' }, { name: 'SW', color: '#c0392b' },
      { name: 'LW', color: '#d35400' }, { name: 'PT', color: '#7f8c8d' }
    ];
    var clubStats = LS('club_stats') || {};
    var clubs = CLUB_DEFS.map(function (c) {
      var s = clubStats[c.name] || {};
      var dist = Number(s.dist), freq = Number(s.freq);
      return { name: c.name, color: c.color, dist: isFinite(dist) ? dist : null, freq: isFinite(freq) ? freq : null };
    }).filter(function (c) { return c.dist !== null && c.freq !== null; });

    var totalFreq = clubs.reduce(function (s, c) { return s + c.freq; }, 0);
    var sorted = clubs.slice().sort(function (a, b) { return b.freq - a.freq; });
    var optimal7 = sorted.slice(0, Math.min(7, sorted.length));
    var coverage = totalFreq > 0 ? Math.round(optimal7.reduce(function (s, c) { return s + c.freq; }, 0) / totalFreq * 100) : null;
    if (coverage !== null && coverage >= 70) unlockAchievement('sg40_coverage');

    var html = '<div class="sg40-panel"><div class="sg40-hdr"><h2><span class="sg40-hdr-icon">🎒</span>클럽 조합 최적화기</h2><button class="sg40-x" onclick="this.closest(\'.sg40-overlay\').classList.remove(\'active\')">&times;</button></div>';
    html += '<canvas id="sg40-combo-cv" width="620" height="400" style="width:100%;border-radius:14px;background:#0a0a1a;margin-bottom:16px"></canvas>';
    html += '<div class="sg40-card"><h4>🏆 사용빈도 상위 클럽</h4>';
    if (!clubs.length) {
      html += '<p style="color:rgba(255,255,255,.5)">클럽별 거리·사용 기록이 없습니다. ' + EMPTY_MSG + '</p>';
    } else {
      optimal7.forEach(function (c, i) {
        html += '<div class="sg40-stat"><span style="color:' + c.color + '">' + (i + 1) + '. ' + c.name + ' (' + c.dist + 'yd)</span><span class="sg40-stat-val">사용빈도 ' + c.freq + '회</span></div>';
      });
      html += '<div style="margin-top:12px;text-align:center"><div style="color:#0077b6;font-size:24px;font-weight:900">' + coverage + '%</div><div style="color:rgba(255,255,255,.5);font-size:11px">상위 클럽 사용 비중</div></div>';
    }
    html += '</div></div>';
    ov.innerHTML = html;
    ov.classList.add('active');

    setTimeout(function () {
      var cv = document.getElementById('sg40-combo-cv');
      if (!cv) return;
      var ctx = cv.getContext('2d');
      var W = 620, H = 400;
      if (!clubs.length) { drawEmpty40(ctx, W, H, '클럽 거리 커버리지 분석'); return; }
      ctx.fillStyle = '#0a0a1a';
      ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 14px sans-serif';
      ctx.fillText('클럽 거리 커버리지 분석 (기록 ' + clubs.length + '개)', 20, 30);

      var padL = 60, padR = 20, padT = 50, padB = 60;
      var cW = W - padL - padR, cH = H - padT - padB;
      var barW = cW / clubs.length - 4;
      var maxD = Math.max(50, Math.ceil(Math.max.apply(null, clubs.map(function (c) { return c.dist; })) / 50) * 50);

      clubs.forEach(function (c, i) {
        var x = padL + i * (cW / clubs.length) + 2;
        var barH = c.dist > 0 ? (c.dist / maxD) * cH : 0;
        var y = padT + cH - barH;
        var isOptimal = optimal7.indexOf(c) >= 0;
        ctx.fillStyle = isOptimal ? c.color : 'rgba(255,255,255,.15)';
        ctx.beginPath();
        ctx.roundRect(x, y, barW, barH, [4, 4, 0, 0]);
        ctx.fill();
        if (isOptimal) {
          ctx.fillStyle = 'rgba(255,255,255,.08)';
          ctx.fillRect(x, padT, barW, cH);
        }
        ctx.fillStyle = isOptimal ? '#fff' : 'rgba(255,255,255,.4)';
        ctx.font = (isOptimal ? 'bold ' : '') + '10px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(c.name, x + barW / 2, H - padB + 16);
        if (c.dist > 0) {
          ctx.fillText(c.dist + 'yd', x + barW / 2, y - 6);
        }
      });

      // Y axis
      ctx.fillStyle = 'rgba(255,255,255,.4)';
      ctx.font = '10px sans-serif';
      ctx.textAlign = 'right';
      for (var d = 0; d <= maxD; d += 50) {
        var y = padT + cH - (d / maxD) * cH;
        ctx.fillText(d + 'yd', padL - 8, y + 4);
        ctx.strokeStyle = 'rgba(255,255,255,.06)';
        ctx.beginPath(); ctx.moveTo(padL, y); ctx.lineTo(padL + cW, y); ctx.stroke();
      }

      ctx.font = 'bold 11px sans-serif';
      ctx.fillStyle = '#0077b6';
      ctx.textAlign = 'left';
      ctx.fillText('█ 사용빈도 상위', W - 160, 28);
      ctx.fillStyle = 'rgba(255,255,255,.3)';
      ctx.fillText('█ 미선택', W - 80, 28);
    }, 80);
  }

  // ===== 4. SLEEP-PERFORMANCE CORRELATOR (Canvas 600x380) =====
  function openSleepPerformance() {
    sg40sfx('sleep_corr');
    unlockAchievement('sg40_sleep_track');
    var ov = document.getElementById('sg40-sleep') || createOverlay('sg40-sleep');
    var data = LS('sleep_data') || [];
    var hasSleep = data.length > 0;

    var avgSleep = hasSleep ? Math.round(data.reduce(function (s, d) { return s + d.sleep; }, 0) / data.length * 10) / 10 : null;
    var avgScore = hasSleep ? Math.round(data.reduce(function (s, d) { return s + d.score; }, 0) / data.length) : null;

    var html = '<div class="sg40-panel"><div class="sg40-hdr"><h2><span class="sg40-hdr-icon">😴</span>수면-성적 상관분석기</h2><button class="sg40-x" onclick="this.closest(\'.sg40-overlay\').classList.remove(\'active\')">&times;</button></div>';
    html += '<canvas id="sg40-sleep-cv" width="600" height="380" style="width:100%;border-radius:14px;background:#0a0a1a;margin-bottom:16px"></canvas>';
    html += '<div class="sg40-card"><h4>📊 수면 통계 요약</h4>';
    html += '<div class="sg40-stat"><span>기록 수</span><span class="sg40-stat-val" style="color:#0077b6">' + data.length + '건</span></div>';
    html += '<div class="sg40-stat"><span>평균 수면 시간</span><span class="sg40-stat-val" style="color:#9b59b6">' + (hasSleep ? avgSleep + '시간' : '-') + '</span></div>';
    html += '<div class="sg40-stat"><span>평균 스코어</span><span class="sg40-stat-val" style="color:#2ecc71">' + (hasSleep ? avgScore + '타' : '-') + '</span></div>';
    if (!hasSleep) html += '<p style="color:rgba(255,255,255,.5);margin-top:8px">' + EMPTY_MSG + '</p>';
    html += '</div>';
    html += '<div class="sg40-card"><h4>💡 수면 기록 팁</h4><p>라운드 전날 수면 시간과 그날 스코어를 함께 기록하면 위 산점도에 내 데이터가 표시됩니다.</p></div></div>';
    ov.innerHTML = html;
    ov.classList.add('active');

    setTimeout(function () {
      var cv = document.getElementById('sg40-sleep-cv');
      if (!cv) return;
      var ctx = cv.getContext('2d');
      var W = 600, H = 380;
      if (!data.length) { drawEmpty40(ctx, W, H, '수면시간 vs 스코어 산점도'); return; }
      ctx.fillStyle = '#0a0a1a';
      ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 14px sans-serif';
      ctx.fillText('수면시간 vs 스코어 산점도', 20, 30);

      var padL = 60, padR = 20, padT = 50, padB = 50;
      var cW = W - padL - padR, cH = H - padT - padB;

      // grid
      ctx.strokeStyle = 'rgba(255,255,255,.08)';
      for (var h = 5; h <= 9; h++) {
        var x = padL + ((h - 5) / 4) * cW;
        ctx.beginPath(); ctx.moveTo(x, padT); ctx.lineTo(x, padT + cH); ctx.stroke();
        ctx.fillStyle = 'rgba(255,255,255,.4)';
        ctx.font = '10px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(h + 'h', x, H - padB + 18);
      }
      for (var s = 70; s <= 100; s += 10) {
        var y = padT + cH - ((s - 70) / 30) * cH;
        ctx.beginPath(); ctx.moveTo(padL, y); ctx.lineTo(padL + cW, y); ctx.stroke();
        ctx.fillStyle = 'rgba(255,255,255,.4)';
        ctx.textAlign = 'right';
        ctx.fillText(s + '타', padL - 8, y + 4);
      }

      // optimal zone
      ctx.fillStyle = 'rgba(46,204,113,.08)';
      var x1 = padL + ((7 - 5) / 4) * cW;
      var x2 = padL + ((8 - 5) / 4) * cW;
      ctx.fillRect(x1, padT, x2 - x1, cH);
      ctx.fillStyle = 'rgba(46,204,113,.3)';
      ctx.font = '10px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('일반 권장 수면대 (참고)', (x1 + x2) / 2, padT + 15);

      // dots
      data.forEach(function (d) {
        var x = padL + ((d.sleep - 5) / 4) * cW;
        var y = padT + cH - ((d.score - 70) / 30) * cH;
        var qual = d.quality / 100;
        ctx.fillStyle = 'rgba(155,89,182,' + (0.4 + qual * 0.5) + ')';
        ctx.beginPath(); ctx.arc(x, y, 4 + qual * 5, 0, Math.PI * 2); ctx.fill();
      });

      // axis labels
      ctx.fillStyle = 'rgba(255,255,255,.5)';
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('→ 수면시간', padL + cW / 2, H - 8);
    }, 80);
  }

  // ===== 5. SCORECARD PATTERN MINER (Canvas 640x400) =====
  function openScorecardPatternMiner() {
    sg40sfx('pattern_mine');
    unlockAchievement('sg40_pattern_miner');
    var ov = document.getElementById('sg40-pattern') || createOverlay('sg40-pattern');
    var labels = ['DblBogey+', 'Bogey', 'Par', 'Birdie', 'Eagle'];
    var colors = ['#e74c3c', '#e67e22', '#3498db', '#2ecc71', '#ffd700'];
    var savedRounds = LS('scorecards');
    var rounds = Array.isArray(savedRounds) ? savedRounds.filter(function (rd) { return Array.isArray(rd) && rd.length; }) : [];

    // find streaks
    var streaks = [];
    rounds.forEach(function (rd, ri) {
      var streak = 0;
      rd.forEach(function (v, hi) {
        if (v >= 2) { streak++; if (streak >= 3) streaks.push('R' + (ri + 1) + ' H' + (hi - 1) + '-' + (hi + 1)); } else { streak = 0; }
      });
    });
    if (streaks.length > 0) unlockAchievement('sg40_streak_finder');

    var html = '<div class="sg40-panel"><div class="sg40-hdr"><h2><span class="sg40-hdr-icon">🔍</span>스코어카드 패턴 마이너</h2><button class="sg40-x" onclick="this.closest(\'.sg40-overlay\').classList.remove(\'active\')">&times;</button></div>';
    html += '<canvas id="sg40-pattern-cv" width="640" height="400" style="width:100%;border-radius:14px;background:#0a0a1a;margin-bottom:16px"></canvas>';
    html += '<div class="sg40-card"><h4>🔥 발견된 연속 패턴 (Par 이상 3홀+)</h4>';
    if (!rounds.length) {
      html += '<p style="color:rgba(255,255,255,.5)">' + EMPTY_MSG + '</p>';
    } else if (streaks.length > 0) {
      streaks.forEach(function (s) { html += '<div class="sg40-stat"><span style="color:#2ecc71">' + s + '</span><span class="sg40-stat-val">3+홀 연속</span></div>'; });
    } else {
      html += '<p style="color:rgba(255,255,255,.5)">3홀 연속 Par 이상 패턴 미발견</p>';
    }
    html += '</div>';
    html += '<div class="sg40-card"><h4>📊 스코어 분포</h4>';
    var total = rounds.reduce(function (s, rd) { return s + rd.length; }, 0);
    if (!total) {
      html += '<p style="color:rgba(255,255,255,.5)">' + EMPTY_MSG + '</p>';
    } else {
      labels.forEach(function (lb, li) {
        var cnt = 0;
        rounds.forEach(function (rd) { rd.forEach(function (v) { if (v === li) cnt++; }); });
        var pct = Math.round(cnt / total * 100);
        html += '<div class="sg40-stat"><span style="color:' + colors[li] + '">' + lb + '</span><span class="sg40-stat-val">' + cnt + '홀 (' + pct + '%)</span></div>';
      });
    }
    html += '</div></div>';
    ov.innerHTML = html;
    ov.classList.add('active');

    setTimeout(function () {
      var cv = document.getElementById('sg40-pattern-cv');
      if (!cv) return;
      var ctx = cv.getContext('2d');
      var W = 640, H = 400;
      if (!rounds.length) { drawEmpty40(ctx, W, H, '라운드별 홀 패턴 히트맵'); return; }
      ctx.fillStyle = '#0a0a1a';
      ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 14px sans-serif';
      var maxHoles = Math.max.apply(null, rounds.map(function (rd) { return rd.length; }));
      ctx.fillText(rounds.length + '라운드 x ' + maxHoles + '홀 패턴 히트맵', 20, 30);

      var padL = 80, padR = 20, padT = 55, padB = 40;
      var cellW = (W - padL - padR) / maxHoles;
      var cellH = (H - padT - padB) / rounds.length;

      rounds.forEach(function (rd, ri) {
        ctx.fillStyle = 'rgba(255,255,255,.5)';
        ctx.font = '11px sans-serif';
        ctx.textAlign = 'right';
        ctx.fillText('R' + (ri + 1), padL - 10, padT + ri * cellH + cellH / 2 + 4);

        rd.forEach(function (v, hi) {
          var x = padL + hi * cellW;
          var y = padT + ri * cellH;
          ctx.fillStyle = colors[v] || 'rgba(255,255,255,.15)';
          ctx.globalAlpha = 0.7;
          ctx.fillRect(x + 1, y + 1, cellW - 2, cellH - 2);
          ctx.globalAlpha = 1;
        });
      });

      // column headers
      for (var h = 1; h <= maxHoles; h++) {
        ctx.fillStyle = 'rgba(255,255,255,.5)';
        ctx.font = '9px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(h + '', padL + (h - 1) * cellW + cellW / 2, padT - 6);
      }

      // legend
      var legY = H - 18;
      ctx.font = '10px sans-serif';
      ctx.textAlign = 'left';
      labels.forEach(function (lb, li) {
        var lx = padL + li * 110;
        ctx.fillStyle = colors[li];
        ctx.fillRect(lx, legY - 8, 10, 10);
        ctx.fillStyle = 'rgba(255,255,255,.6)';
        ctx.fillText(lb, lx + 14, legY);
      });
    }, 80);
  }

  // ===== 6. COURSE CONDITION IMPACT ANALYZER (Canvas 620x400) =====
  function openCourseConditionImpact() {
    sg40sfx('cond_radar');
    unlockAchievement('sg40_cond_expert');
    var ov = document.getElementById('sg40-cond') || createOverlay('sg40-cond');
    var COND_DEFS = [
      { key: 'green', name: '그린스피드', tip: 'Stimpmeter 10+ = 빠른 그린. 퍼팅 터치 조절 필요' },
      { key: 'fairway', name: '페어웨이 상태', tip: '잔디 밀도 높을수록 클린 컨택 용이. 런 감소' },
      { key: 'rough', name: '러프 높이', tip: '4인치 이상 러프: 탈출 우선. 웨지 사용 권장' },
      { key: 'bunker', name: '벙커 모래질', tip: '부드러운 모래: 높은 바운스. 단단한 모래: 낮은 바운스' },
      { key: 'humidity', name: '습도/수분', tip: '습한 코스: 비거리 감소. 클럽업 고려' }
    ];
    var condSaved = LS('course_cond') || {};
    var axes = COND_DEFS.map(function (d) {
      var v = Number(condSaved[d.key]);
      return { name: d.name, tip: d.tip, max: 100, value: (isFinite(v) && v > 0) ? Math.min(100, v) : null };
    });
    var hasCond = axes.every(function (a) { return a.value !== null; });
    var totalScore = hasCond ? Math.round(axes.reduce(function (s, a) { return s + a.value; }, 0) / axes.length) : null;

    var html = '<div class="sg40-panel"><div class="sg40-hdr"><h2><span class="sg40-hdr-icon">🌿</span>코스 컨디션 임팩트 분석기</h2><button class="sg40-x" onclick="this.closest(\'.sg40-overlay\').classList.remove(\'active\')">&times;</button></div>';
    html += '<canvas id="sg40-cond-cv" width="620" height="400" style="width:100%;border-radius:14px;background:#0a0a1a;margin-bottom:16px"></canvas>';
    html += '<div class="sg40-card"><h4>🎯 컨디션 상세 분석</h4>';
    axes.forEach(function (a) {
      var rated = a.value !== null;
      var pct = rated ? Math.round(a.value / a.max * 100) : 0;
      var barColor = !rated ? 'rgba(255,255,255,.15)' : (pct >= 80 ? '#2ecc71' : (pct >= 60 ? '#f39c12' : '#e74c3c'));
      html += '<div style="margin-bottom:14px"><div class="sg40-stat"><span>' + a.name + '</span><span class="sg40-stat-val" style="color:' + barColor + '">' + (rated ? pct + '%' : '-') + '</span></div>';
      html += '<div class="sg40-progress"><div class="sg40-progress-fill" style="width:' + pct + '%;background:' + barColor + '"></div></div>';
      html += '<p style="color:rgba(255,255,255,.4);font-size:11px;margin-top:4px">' + a.tip + '</p></div>';
    });
    if (!hasCond) html += '<p style="color:rgba(255,255,255,.5)">코스 컨디션을 입력하지 않았습니다. ' + EMPTY_MSG + '</p>';
    html += '</div>';
    html += '<div class="sg40-card"><h4>🏆 코스 컨디션 종합 등급</h4>' + (hasCond ? '<div style="display:flex;align-items:center;gap:16px;margin-top:10px"><div class="sg40-grade ' + gradeClass(totalScore, 100) + '">' + gradeLetter(totalScore, 100) + '</div><div><div style="color:#fff;font-size:18px;font-weight:800">' + totalScore + '점</div><div style="color:rgba(255,255,255,.5);font-size:12px">5축 컨디션 종합</div></div></div>' : '<p style="color:rgba(255,255,255,.5)">' + EMPTY_MSG + '</p>') + '</div></div>';
    ov.innerHTML = html;
    ov.classList.add('active');

    setTimeout(function () {
      var cv = document.getElementById('sg40-cond-cv');
      if (!cv) return;
      var ctx = cv.getContext('2d');
      var W = 620, H = 400;
      if (!hasCond) { drawEmpty40(ctx, W, H, '코스 컨디션 5축 Radar'); return; }
      ctx.fillStyle = '#0a0a1a';
      ctx.fillRect(0, 0, W, H);

      var cx = W / 2, cy = H / 2 + 10, R = 140;
      var n = axes.length;

      // radar grid
      for (var ring = 1; ring <= 4; ring++) {
        var r = R * ring / 4;
        ctx.strokeStyle = 'rgba(255,255,255,.08)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        for (var i = 0; i <= n; i++) {
          var angle = (Math.PI * 2 * i / n) - Math.PI / 2;
          var px = cx + Math.cos(angle) * r;
          var py = cy + Math.sin(angle) * r;
          if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
        }
        ctx.stroke();
      }

      // spokes
      for (var i = 0; i < n; i++) {
        var angle = (Math.PI * 2 * i / n) - Math.PI / 2;
        ctx.strokeStyle = 'rgba(255,255,255,.1)';
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + Math.cos(angle) * R, cy + Math.sin(angle) * R);
        ctx.stroke();
      }

      // data
      ctx.fillStyle = 'rgba(0,119,182,.2)';
      ctx.strokeStyle = 'rgba(0,119,182,.8)';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      axes.forEach(function (a, i) {
        var angle = (Math.PI * 2 * i / n) - Math.PI / 2;
        var val = a.value / a.max;
        var px = cx + Math.cos(angle) * R * val;
        var py = cy + Math.sin(angle) * R * val;
        if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
      });
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // labels and dots
      axes.forEach(function (a, i) {
        var angle = (Math.PI * 2 * i / n) - Math.PI / 2;
        var val = a.value / a.max;
        var px = cx + Math.cos(angle) * R * val;
        var py = cy + Math.sin(angle) * R * val;
        ctx.fillStyle = '#0077b6';
        ctx.beginPath(); ctx.arc(px, py, 5, 0, Math.PI * 2); ctx.fill();

        var lx = cx + Math.cos(angle) * (R + 25);
        var ly = cy + Math.sin(angle) * (R + 25);
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 11px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(a.name, lx, ly);
        ctx.fillStyle = 'rgba(255,255,255,.5)';
        ctx.font = '10px sans-serif';
        ctx.fillText(a.value + '%', lx, ly + 14);
      });

      ctx.fillStyle = '#fff';
      ctx.font = 'bold 14px sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText('코스 컨디션 5축 Radar', 20, 30);
    }, 80);
  }

  // ===== 7. MISS-SHOT CORRECTION GUIDE (Canvas 600x380) =====
  function openMissShotGuide() {
    sg40sfx('miss_scan');
    unlockAchievement('sg40_miss_analyst');
    var ov = document.getElementById('sg40-miss') || createOverlay('sg40-miss');
    var MISS_DEFS = [
      { name: '슬라이스', fix: '그립 강화, 클럽페이스 닫기, 아웃-인 스윙패스 교정', color: '#e74c3c' },
      { name: '훅', fix: '그립 약화, 몸 회전 동기화, 클럽페이스 오픈 유지', color: '#e67e22' },
      { name: '탑핑', fix: '머리 고정, 스윙 아크 유지, 공 위치 확인', color: '#f39c12' },
      { name: '뒤땅', fix: '체중 이동, 최저점 앞으로, 볼 포지션 조정', color: '#2ecc71' },
      { name: '생크', fix: '어드레스 거리 확인, 힐 컨택 방지, 팔 경로 교정', color: '#9b59b6' },
      { name: '푸시', fix: '타겟 정렬 확인, 인-아웃 패스 줄이기, 릴리스 타이밍', color: '#3498db' },
      { name: '풀', fix: '어깨 정렬, 다운스윙 시작 하체 주도, 클럽 릴리스 조절', color: '#1abc9c' }
    ];
    var missLog = LS('miss_stats') || {};
    var misses = MISS_DEFS.map(function (m) {
      var c = Number(missLog[m.name]);
      return { name: m.name, fix: m.fix, color: m.color, count: (isFinite(c) && c > 0) ? c : 0 };
    });
    var recorded = misses.filter(function (m) { return m.count > 0; });
    var missTotal = recorded.reduce(function (s, m) { return s + m.count; }, 0);

    if (recorded.length >= 3) unlockAchievement('sg40_fix_master');

    var html = '<div class="sg40-panel"><div class="sg40-hdr"><h2><span class="sg40-hdr-icon">🎯</span>미스샷 유형별 교정 가이드</h2><button class="sg40-x" onclick="this.closest(\'.sg40-overlay\').classList.remove(\'active\')">&times;</button></div>';
    html += '<canvas id="sg40-miss-cv" width="600" height="380" style="width:100%;border-radius:14px;background:#0a0a1a;margin-bottom:16px"></canvas>';
    if (!recorded.length) html += '<div class="sg40-card"><p style="color:rgba(255,255,255,.5)">기록된 미스샷이 없습니다. ' + EMPTY_MSG + ' (아래는 유형별 일반 교정법입니다)</p></div>';
    misses.forEach(function (m) {
      var pct = missTotal > 0 ? Math.round(m.count / missTotal * 100) : 0;
      html += '<div class="sg40-card"><h4><span style="color:' + m.color + '">&#9632;</span> ' + m.name + (m.count > 0 ? ' (내 기록 ' + m.count + '회 / ' + pct + '%)' : '') + '</h4>';
      html += '<p style="color:rgba(255,255,255,.7)"><strong>교정법:</strong> ' + m.fix + '</p></div>';
    });
    html += '</div>';
    ov.innerHTML = html;
    ov.classList.add('active');

    setTimeout(function () {
      var cv = document.getElementById('sg40-miss-cv');
      if (!cv) return;
      var ctx = cv.getContext('2d');
      var W = 600, H = 380;
      if (!recorded.length) { drawEmpty40(ctx, W, H, '내 미스샷 기록 분포'); return; }
      ctx.fillStyle = '#0a0a1a';
      ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 14px sans-serif';
      ctx.fillText('내 미스샷 기록 분포 (총 ' + missTotal + '회)', 20, 30);

      var padL = 90, padR = 20, padT = 50, padB = 30;
      var cH = H - padT - padB;
      var barH = cH / misses.length - 8;
      var maxCount = Math.max.apply(null, misses.map(function (m) { return m.count; })) || 1;

      misses.forEach(function (m, i) {
        var y = padT + i * (cH / misses.length) + 4;
        var cntW = (m.count / maxCount) * (W - padL - padR - 40);

        ctx.fillStyle = m.color;
        ctx.globalAlpha = 0.7;
        ctx.beginPath();
        ctx.roundRect(padL, y, cntW, barH, [4, 4, 4, 4]);
        ctx.fill();
        ctx.globalAlpha = 1;

        // label
        ctx.fillStyle = '#fff';
        ctx.font = '11px sans-serif';
        ctx.textAlign = 'right';
        ctx.fillText(m.name, padL - 8, y + barH / 2 + 2);

        // value
        ctx.fillStyle = 'rgba(255,255,255,.6)';
        ctx.font = '9px sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText(m.count + '회', padL + cntW + 4, y + barH / 2 + 2);
      });

      // legend
      ctx.font = '10px sans-serif';
      ctx.textAlign = 'right';
      ctx.fillStyle = 'rgba(255,255,255,.6)';
      ctx.fillText('█ 기록된 미스샷 횟수', W - 20, 28);
    }, 80);
  }

  // ===== 8. ROUND ENTROPY ANALYZER (Canvas 620x400) =====
  function openRoundEntropyAnalyzer() {
    sg40sfx('entropy_calc');
    var ov = document.getElementById('sg40-entropy') || createOverlay('sg40-entropy');
    var KPI_DEFS = [
      { key: 'score_consistency', name: '스코어 일관성', icon: '📊', desc: '라운드 간 스코어 표준편차 기반' },
      { key: 'hole_stability', name: '홀별 안정성', icon: '⛳', desc: '홀 타입별 스코어 변동 계수' },
      { key: 'front_back', name: '전반/후반 밸런스', icon: '⚖️', desc: 'Front 9 vs Back 9 편차' },
      { key: 'par_balance', name: '파3/4/5 균형', icon: '🎯', desc: '파 타입별 성적 균등도' },
      { key: 'mental', name: '멘탈 안정도', icon: '🧠', desc: '더블보기 후 회복 속도' },
      { key: 'weather', name: '날씨 적응력', icon: '🌤️', desc: '기상 변화 시 성적 유지율' },
      { key: 'club', name: '클럽 일관성', icon: '🏌️', desc: '클럽별 거리 분산도' },
      { key: 'putting', name: '퍼팅 정밀도', icon: '🎱', desc: '퍼팅 거리별 정확도 일관성' }
    ];
    var kpiSaved = LS('entropy_kpis') || {};
    var kpis = KPI_DEFS.map(function (d) {
      var v = Number(kpiSaved[d.key]);
      return { name: d.name, icon: d.icon, desc: d.desc, value: (isFinite(v) && v > 0) ? Math.min(100, v) : null };
    });
    var ratedKpis = kpis.filter(function (k) { return k.value !== null; });
    var avgEntropy = ratedKpis.length ? Math.round(ratedKpis.reduce(function (s, k) { return s + k.value; }, 0) / ratedKpis.length) : null;
    if (avgEntropy !== null && avgEntropy >= 70) unlockAchievement('sg40_entropy_low');

    var html = '<div class="sg40-panel"><div class="sg40-hdr"><h2><span class="sg40-hdr-icon">📐</span>라운드 엔트로피 분석기</h2><button class="sg40-x" onclick="this.closest(\'.sg40-overlay\').classList.remove(\'active\')">&times;</button></div>';
    html += '<canvas id="sg40-entropy-cv" width="620" height="400" style="width:100%;border-radius:14px;background:#0a0a1a;margin-bottom:16px"></canvas>';
    html += '<div class="sg40-card"><h4>📈 8대 일관성 지표</h4>';
    if (!ratedKpis.length) html += '<p style="color:rgba(255,255,255,.5)">' + EMPTY_MSG + '</p>';
    kpis.forEach(function (k) {
      var rated = k.value !== null;
      var barColor = !rated ? 'rgba(255,255,255,.15)' : (k.value >= 80 ? '#2ecc71' : (k.value >= 60 ? '#f39c12' : '#e74c3c'));
      html += '<div style="margin-bottom:10px"><div class="sg40-stat"><span>' + k.icon + ' ' + k.name + '</span><span class="sg40-stat-val" style="color:' + barColor + '">' + (rated ? k.value + '%' : '-') + '</span></div>';
      html += '<div class="sg40-progress"><div class="sg40-progress-fill" style="width:' + (rated ? k.value : 0) + '%;background:' + barColor + '"></div></div>';
      html += '<div style="color:rgba(255,255,255,.35);font-size:10px">' + k.desc + '</div></div>';
    });
    html += '</div>';
    html += '<div class="sg40-card"><h4>🏆 종합 엔트로피 등급</h4>' + (avgEntropy === null ? '<p style="color:rgba(255,255,255,.5)">' + EMPTY_MSG + '</p>' : '<div style="display:flex;align-items:center;gap:16px;margin-top:10px"><div class="sg40-grade ' + gradeClass(avgEntropy, 100) + '">' + gradeLetter(avgEntropy, 100) + '</div><div><div style="color:#fff;font-size:18px;font-weight:800">' + avgEntropy + '점</div><div style="color:rgba(255,255,255,.5);font-size:12px">기록된 ' + ratedKpis.length + '개 지표 평균</div></div></div>') + '</div></div>';
    ov.innerHTML = html;
    ov.classList.add('active');

    setTimeout(function () {
      var cv = document.getElementById('sg40-entropy-cv');
      if (!cv) return;
      var ctx = cv.getContext('2d');
      var W = 620, H = 400;
      if (!ratedKpis.length) { drawEmpty40(ctx, W, H, '8KPI 반원 게이지 대시보드'); return; }
      ctx.fillStyle = '#0a0a1a';
      ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 14px sans-serif';
      ctx.fillText('8KPI 반원 게이지 대시보드', 20, 30);

      var cols = 4, rows = 2;
      var gW = (W - 40) / cols, gH = (H - 70) / rows;

      kpis.forEach(function (k, i) {
        var col = i % cols, row = Math.floor(i / cols);
        var cx = 20 + col * gW + gW / 2;
        var cy = 55 + row * gH + gH / 2;
        var radius = Math.min(gW, gH) * 0.32;

        // bg arc
        ctx.strokeStyle = 'rgba(255,255,255,.08)';
        ctx.lineWidth = 10;
        ctx.beginPath();
        ctx.arc(cx, cy, radius, Math.PI, 0);
        ctx.stroke();

        // value arc (기록이 있을 때만)
        var rated = k.value !== null;
        var pct = rated ? k.value / 100 : 0;
        if (rated) {
          var endAngle = Math.PI + Math.PI * pct;
          var gc = pct >= 0.8 ? '#2ecc71' : (pct >= 0.6 ? '#f39c12' : '#e74c3c');
          ctx.strokeStyle = gc;
          ctx.lineWidth = 10;
          ctx.beginPath();
          ctx.arc(cx, cy, radius, Math.PI, endAngle);
          ctx.stroke();
        }

        // value text
        ctx.fillStyle = rated ? '#fff' : 'rgba(255,255,255,.35)';
        ctx.font = 'bold 16px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(rated ? k.value + '%' : '-', cx, cy + 6);

        // label
        ctx.fillStyle = 'rgba(255,255,255,.6)';
        ctx.font = '10px sans-serif';
        ctx.fillText(k.name, cx, cy + radius + 20);

        // icon
        ctx.font = '16px sans-serif';
        ctx.fillText(k.icon, cx, cy - radius - 6);
      });
    }, 80);
  }

  // ===== 9. GOLF IQ v24 (15 QUESTIONS) =====
  function openGolfIQv24() {
    sg40sfx('swing_phase');
    var ov = document.getElementById('sg40-iq24') || createOverlay('sg40-iq24');
    var questions = [
      { q: '드라이버의 최적 발사각(Launch Angle)은 대략 몇 도인가?', opts: ['5-8°', '10-14°', '18-22°', '25-30°'], ans: 1 },
      { q: '스윙 시 가장 큰 토크가 발생하는 단계는?', opts: ['테이크어웨이', '백스윙 탑', '다운스윙 전환', '임팩트'], ans: 2 },
      { q: '그린 스피드 측정 단위인 Stimpmeter의 빠른 그린 기준은?', opts: ['5 이상', '8 이상', '10 이상', '14 이상'], ans: 2 },
      { q: 'Strokes Gained Approach에서 가장 영향력 있는 거리대는?', opts: ['50yd 이내', '100-150yd', '150-200yd', '200yd 이상'], ans: 1 },
      { q: '라운드 중 수분 보충의 권장 간격은?', opts: ['1홀마다', '3홀마다', '9홀마다', '갈증 느낄 때만'], ans: 1 },
      { q: 'Fade 샷의 클럽페이스와 스윙패스 관계는?', opts: ['페이스 오픈 + 인-아웃', '페이스 클로즈 + 아웃-인', '페이스 오픈 + 아웃-인', '페이스 오픈 + 타겟정렬'], ans: 3 },
      { q: '18홀 라운드의 평균 걷는 거리는 약?', opts: ['3km', '5km', '8km', '12km'], ans: 2 },
      { q: '퍼팅에서 &quot;Golden Putt&quot; 거리(1퍼팅 확률 50%)는?', opts: ['3피트', '6피트', '8피트', '12피트'], ans: 2 },
      { q: '코스 레이팅과 슬로프 레이팅 중 핸디캡 산출에 더 큰 영향을 주는 것은?', opts: ['코스 레이팅', '슬로프 레이팅', '둘 다 동일', '상황에 따라 다름'], ans: 1 },
      { q: '겨울철(5°C) 골프 시 여름 대비 비거리 감소율은 약?', opts: ['2-3%', '5-8%', '10-15%', '20% 이상'], ans: 1 },
      { q: '프로 골퍼의 평균 클럽헤드 스피드(드라이버)는?', opts: ['90mph', '105mph', '113mph', '125mph'], ans: 2 },
      { q: '엔트로피(Entropy)가 낮은 라운드의 특징은?', opts: ['스코어 변동이 큰', '일관된 플레이', '많은 버디', '적은 퍼팅 수'], ans: 1 },
      { q: '러프에서의 플라이어 라이(Flyer Lie)에서 예상되는 결과는?', opts: ['거리 줄어듦', '거리 늘어남', '훅 발생', '높은 탄도'], ans: 1 },
      { q: '스코어카드에서 &quot;X&quot; 표기의 의미는?', opts: ['미기록', '홀인원', '핸디캡 적용 홀', '최대 점수 도달'], ans: 3 },
      { q: '7번 아이언의 표준 로프트 각도(현대 클럽)는 약?', opts: ['24-26°', '28-30°', '33-35°', '38-40°'], ans: 1 }
    ];

    var state = LS('iq24_state') || { idx: 0, score: 0, done: false, answers: [] };

    function renderQuiz() {
      if (state.done) {
        var pct = Math.round(state.score / questions.length * 100);
        if (pct >= 70) unlockAchievement('sg40_iq24_pass');
        if (pct === 100) unlockAchievement('sg40_iq24_perfect');
        var html = '<div class="sg40-panel"><div class="sg40-hdr"><h2><span class="sg40-hdr-icon">🧠</span>Golf IQ v24 결과</h2><button class="sg40-x" onclick="this.closest(\'.sg40-overlay\').classList.remove(\'active\')">&times;</button></div>';
        html += '<div class="sg40-card" style="text-align:center"><div class="sg40-grade ' + gradeClass(state.score, questions.length) + '" style="width:80px;height:80px;font-size:32px;margin:0 auto 16px">' + gradeLetter(state.score, questions.length) + '</div>';
        html += '<div style="color:#fff;font-size:28px;font-weight:900">' + state.score + ' / ' + questions.length + '</div>';
        html += '<div style="color:rgba(255,255,255,.5);font-size:14px;margin-top:6px">' + pct + '% 정답률</div></div>';
        html += '<button class="sg40-btn" style="background:#0077b6;width:100%;justify-content:center;margin-top:12px" onclick="localStorage.removeItem(\'sg40_iq24_state\');openGolfIQv24()">다시 풀기</button></div>';
        ov.innerHTML = html;
        return;
      }

      var q = questions[state.idx];
      var html = '<div class="sg40-panel"><div class="sg40-hdr"><h2><span class="sg40-hdr-icon">🧠</span>Golf IQ v24</h2><button class="sg40-x" onclick="this.closest(\'.sg40-overlay\').classList.remove(\'active\')">&times;</button></div>';
      html += '<div style="color:rgba(255,255,255,.5);font-size:12px;margin-bottom:12px">문제 ' + (state.idx + 1) + ' / ' + questions.length + '</div>';
      html += '<div class="sg40-progress"><div class="sg40-progress-fill" style="width:' + (state.idx / questions.length * 100) + '%;background:#0077b6"></div></div>';
      html += '<div class="sg40-card"><h4>Q' + (state.idx + 1) + '. ' + q.q + '</h4></div>';
      q.opts.forEach(function (opt, oi) {
        html += '<button class="sg40-quiz-opt" data-oi="' + oi + '">' + (oi + 1) + '. ' + opt + '</button>';
      });
      html += '</div>';
      ov.innerHTML = html;

      var btns = ov.querySelectorAll('.sg40-quiz-opt');
      btns.forEach(function (btn) {
        btn.addEventListener('click', function () {
          var oi = parseInt(btn.getAttribute('data-oi'));
          var correct = oi === q.ans;
          if (correct) {
            state.score++;
            btn.classList.add('correct');
            sg40sfx('combo_opt');
          } else {
            btn.classList.add('wrong');
            btns[q.ans].classList.add('correct');
            sg40sfx('miss_scan');
          }
          state.answers.push(oi);
          btns.forEach(function (b) { b.style.pointerEvents = 'none'; });
          setTimeout(function () {
            state.idx++;
            if (state.idx >= questions.length) state.done = true;
            LS('iq24_state', state);
            renderQuiz();
          }, 1200);
        });
      });
    }

    renderQuiz();
    ov.classList.add('active');
  }

  // ===== NAVIGATION =====
  var navItems = [
    { icon: '🔬', label: 'Swing', fn: openSwingMechanics },
    { icon: '⚖️', label: 'Risk', fn: openRiskRewardMatrix },
    { icon: '🎒', label: 'Combo', fn: openClubComboOptimizer },
    { icon: '😴', label: 'Sleep', fn: openSleepPerformance },
    { icon: '🔍', label: 'Pattern', fn: openScorecardPatternMiner },
    { icon: '🌿', label: 'Cond', fn: openCourseConditionImpact },
    { icon: '🎯', label: 'Miss', fn: openMissShotGuide },
    { icon: '📐', label: 'Entropy', fn: openRoundEntropyAnalyzer },
    { icon: '🧠', label: 'IQ v24', fn: openGolfIQv24 }
  ];

  var existingBar = document.querySelector('.sg30-bottom-bar') || document.querySelector('[class*="bottom-bar"]');
  if (existingBar) {
    navItems.forEach(function (item) {
      var btn = document.createElement('button');
      btn.className = existingBar.querySelector('button') ? existingBar.querySelector('button').className : 'sg30-bbtn';
      btn.innerHTML = '<span class="' + (existingBar.querySelector('.sg30-bbtn-icon') ? 'sg30-bbtn-icon' : 'sg40-bbtn-icon') + '">' + item.icon + '</span><span class="' + (existingBar.querySelector('.sg30-bbtn-label') ? 'sg30-bbtn-label' : 'sg40-bbtn-label') + '">' + item.label + '</span>';
      btn.onclick = item.fn;
      existingBar.appendChild(btn);
    });
  }

  // ===== KEYBOARD SHORTCUTS (Shift+Key) =====
  var keyMap = {
    Q: openSwingMechanics,
    W: openRiskRewardMatrix,
    E: openClubComboOptimizer,
    R: openSleepPerformance,
    T: openScorecardPatternMiner,
    Y: openCourseConditionImpact,
    U: openMissShotGuide,
    I: openRoundEntropyAnalyzer,
    O: openGolfIQv24
  };

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      var overlays = document.querySelectorAll('.sg40-overlay.active');
      overlays.forEach(function (ov) { ov.classList.remove('active'); });
      return;
    }
    if (e.shiftKey && !e.ctrlKey && !e.altKey && !e.metaKey) {
      var key = e.key.toUpperCase();
      if (keyMap[key]) {
        e.preventDefault();
        keyMap[key]();
      }
    }
  });

  // ===== EXPOSE GLOBALS FOR INLINE ONCLICK =====
  window.openSwingMechanics = openSwingMechanics;
  window.openRiskRewardMatrix = openRiskRewardMatrix;
  window.openClubComboOptimizer = openClubComboOptimizer;
  window.openSleepPerformance = openSleepPerformance;
  window.openScorecardPatternMiner = openScorecardPatternMiner;
  window.openCourseConditionImpact = openCourseConditionImpact;
  window.openMissShotGuide = openMissShotGuide;
  window.openRoundEntropyAnalyzer = openRoundEntropyAnalyzer;
  window.openGolfIQv24 = openGolfIQv24;

  console.log('[SmartGolf v40.0] Loaded: 8 canvas features, Golf IQ v24, 15 achievements, 16 SFX, 9 nav buttons');
})();
