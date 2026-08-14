/* ====================================================================
 * SmartGolf v33.0 patch
 * 클럽수명트래커Canvas14종620x380 + 라운드난이도예측기Canvas600x380
 * + 골프훈련주기화Canvas12주580x360 + 샷궤적시뮬레이터Canvas600x380
 * + 코스조건전략매트릭스Canvas640x420 + 라운드페이스비교기Canvas600x360
 * + 클럽세트최적화Canvas620x380 + 라운드리듬분석기Canvas580x360
 * + Golf IQ v17 15문항 + 업적+15(227→242) + SFX13종(226→239) + 키보드8종
 * ==================================================================== */
(function () {
  'use strict';

  const LS = (k, v) => v === undefined ? JSON.parse(localStorage.getItem('sg33_' + k) || 'null') : localStorage.setItem('sg33_' + k, JSON.stringify(v));

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
    club_life: () => { sfx(330, 0.1); sfx(440, 0.12); },
    club_warn: () => { sfx(220, 0.15, 'sawtooth', 0.1); sfx(196, 0.2, 'sawtooth', 0.1); },
    diff_calc: () => { sfx(392, 0.08); sfx(494, 0.1); sfx(587, 0.12); },
    train_plan: () => { sfx(349, 0.1); sfx(440, 0.08); sfx(523, 0.12); },
    train_done: () => { sfx(523, 0.06); sfx(659, 0.06); sfx(784, 0.1, 'triangle'); },
    traj_launch: () => { sfx(262, 0.06); sfx(330, 0.06); sfx(392, 0.06); sfx(523, 0.1); },
    traj_land: () => { sfx(523, 0.1, 'triangle'); sfx(262, 0.15); },
    strategy_tap: () => { sfx(466, 0.1); sfx(587, 0.08); },
    pace_check: () => { sfx(415, 0.1); sfx(523, 0.12); },
    pace_fast: () => { sfx(784, 0.06); sfx(988, 0.08, 'triangle'); },
    set_optimize: () => { sfx(370, 0.1); sfx(466, 0.08); sfx(554, 0.12); },
    rhythm_beat: () => { sfx(440, 0.05, 'triangle'); },
    quiz_v17: () => { sfx(587, 0.1); sfx(740, 0.12); },
    achieve_v33: () => { sfx(523, 0.05); sfx(659, 0.05); sfx(784, 0.05); sfx(988, 0.05); sfx(1175, 0.05); sfx(1319, 0.2, 'triangle'); }
  };

  // ========== CSS ==========
  const css = `
.sg33-overlay{display:none;position:fixed;top:0;left:0;right:0;bottom:0;z-index:10030;background:rgba(0,0,0,.55);overflow-y:auto;padding:20px;animation:sg33FadeIn .25s}
.sg33-overlay.active{display:flex;align-items:flex-start;justify-content:center}
@keyframes sg33FadeIn{from{opacity:0}to{opacity:1}}
.sg33-panel{background:var(--card-bg,#fff);border-radius:16px;max-width:720px;width:100%;margin:30px auto;box-shadow:0 8px 40px rgba(0,0,0,.3);overflow:hidden;animation:sg33SlideUp .3s}
@keyframes sg33SlideUp{from{transform:translateY(30px);opacity:0}to{transform:translateY(0);opacity:1}}
.sg33-panel-head{padding:16px 20px;color:#fff;display:flex;align-items:center;justify-content:space-between}
.sg33-panel-head h3{font-size:16px;font-weight:700;display:flex;align-items:center;gap:8px}
.sg33-panel-close{background:rgba(255,255,255,.25);border:none;color:#fff;width:30px;height:30px;border-radius:50%;cursor:pointer;font-size:16px;font-family:inherit}
.sg33-panel-body{padding:16px 20px;max-height:70vh;overflow-y:auto}
.sg33-card{background:var(--bg,#f5f7f5);border-radius:12px;padding:14px;margin-bottom:10px;border:1px solid var(--border,#e0e0e0);cursor:pointer;transition:all .2s}
.sg33-card:hover{box-shadow:0 2px 12px rgba(0,0,0,.1);transform:translateY(-1px)}
.sg33-card-title{font-weight:700;font-size:14px;color:var(--text,#1a1a1a);margin-bottom:4px;display:flex;align-items:center;gap:6px}
.sg33-card-desc{font-size:12px;color:var(--text-muted,#666);line-height:1.5}
.sg33-badge{display:inline-block;padding:2px 8px;border-radius:10px;font-size:10px;font-weight:700}
.sg33-badge-purple{background:#ede7f6;color:#6a1b9a}
.sg33-badge-green{background:#e8f5e9;color:#2e7d32}
.sg33-badge-blue{background:#e3f2fd;color:#1565c0}
.sg33-badge-orange{background:#fff3e0;color:#e65100}
.sg33-badge-red{background:#ffebee;color:#c62828}
.sg33-badge-teal{background:#e0f2f1;color:#00695c}
.sg33-badge-pink{background:#fce4ec;color:#ad1457}
.sg33-badge-amber{background:#fff8e1;color:#ff6f00}
.sg33-tabs{display:flex;gap:4px;margin-bottom:12px;flex-wrap:wrap}
.sg33-tab{padding:6px 14px;border-radius:20px;border:1px solid var(--border,#e0e0e0);background:var(--bg,#f5f7f5);font-size:12px;cursor:pointer;font-weight:600;color:var(--text-muted,#666);transition:all .2s;font-family:inherit}
.sg33-tab.active{background:var(--primary,#1a7a3a);color:#fff;border-color:var(--primary,#1a7a3a)}
.sg33-row{display:flex;gap:8px;margin-bottom:8px;flex-wrap:wrap;align-items:center}
.sg33-label{font-size:12px;font-weight:600;color:var(--text-muted,#666);min-width:80px}
.sg33-val{font-size:14px;font-weight:700;color:var(--text,#1a1a1a)}
.sg33-slider{flex:1;min-width:120px;accent-color:var(--primary,#1a7a3a)}
.sg33-btn{padding:8px 16px;border-radius:10px;border:none;font-size:13px;font-weight:700;cursor:pointer;transition:all .2s;font-family:inherit}
.sg33-btn-primary{background:var(--primary,#1a7a3a);color:#fff}
.sg33-btn-primary:hover{opacity:.85}
.sg33-btn-outline{background:transparent;border:1px solid var(--border,#e0e0e0);color:var(--text,#1a1a1a)}
.sg33-grid{display:grid;gap:8px;margin-bottom:12px}
.sg33-stat{text-align:center;padding:8px;background:var(--bg,#f5f7f5);border-radius:10px;border:1px solid var(--border,#e0e0e0)}
.sg33-stat-val{font-size:18px;font-weight:800;color:var(--primary,#1a7a3a)}
.sg33-stat-label{font-size:10px;color:var(--text-muted,#666);margin-top:2px}
.sg33-progress{height:8px;background:var(--border,#e0e0e0);border-radius:4px;overflow:hidden;margin:4px 0}
.sg33-progress-fill{height:100%;border-radius:4px;transition:width .5s}
[data-theme="dark"] .sg33-badge-purple{background:#2a1a3a;color:#ce93d8}
[data-theme="dark"] .sg33-badge-green{background:#1a3a25;color:#81c784}
[data-theme="dark"] .sg33-badge-blue{background:#1a2a3a;color:#64b5f6}
[data-theme="dark"] .sg33-badge-orange{background:#3a2a1a;color:#ffb74d}
[data-theme="dark"] .sg33-badge-red{background:#3a1a1a;color:#ef9a9a}
[data-theme="dark"] .sg33-badge-teal{background:#1a3a35;color:#80cbc4}
[data-theme="dark"] .sg33-badge-pink{background:#3a1a2a;color:#f48fb1}
[data-theme="dark"] .sg33-badge-amber{background:#3a3000;color:#ffd54f}
`;
  const st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);

  function makeOverlay(id, gradient, title, contentHTML) {
    let ov = document.getElementById(id);
    if (ov) { ov.classList.add('active'); return ov; }
    ov = document.createElement('div');
    ov.id = id; ov.className = 'sg33-overlay';
    ov.innerHTML = '<div class="sg33-panel"><div class="sg33-panel-head" style="background:' + gradient + '"><h3>' + title + '</h3><button class="sg33-panel-close" onclick="this.closest(\'.sg33-overlay\').classList.remove(\'active\')">&times;</button></div><div class="sg33-panel-body">' + contentHTML + '</div></div>';
    ov.addEventListener('click', e => { if (e.target === ov) ov.classList.remove('active'); });
    document.body.appendChild(ov);
    ov.classList.add('active');
    return ov;
  }

  // ===============================================================
  // 1. 클럽 수명 트래커 Canvas 620x380
  // ===============================================================
  function openClubLifeTracker() {
    SFX.club_life();
    const clubs = ['Driver','3W','5W','3H','4I','5I','6I','7I','8I','9I','PW','AW','SW','LW'];
    const maxRounds = [300,350,400,400,500,500,500,500,500,500,600,600,600,600];
    // 저장된 사용자 기록이 없으면 0라운드에서 시작한다 (임의 사용량 생성 금지)
    let data = LS('clublife_v2') || clubs.map((c,i) => ({ name: c, rounds: 0, max: maxRounds[i], purchased: '' }));

    const html = '<canvas id="sg33-clublife-cv" width="620" height="380" style="width:100%;max-width:620px;border-radius:10px;background:#f9f9f9;margin-bottom:10px"></canvas>' +
      '<div class="sg33-row" style="justify-content:center;gap:6px;flex-wrap:wrap">' +
      '<button class="sg33-btn sg33-btn-primary" onclick="window._sg33_cl_add()">+10 Rounds</button>' +
      '<button class="sg33-btn sg33-btn-outline" onclick="window._sg33_cl_save()">&#x1F4BE; Save</button>' +
      '<button class="sg33-btn sg33-btn-outline" onclick="window._sg33_cl_reset()">Reset</button>' +
      '</div>' +
      '<div class="sg33-grid" style="grid-template-columns:repeat(3,1fr);margin-top:10px">' +
      '<div class="sg33-stat"><div class="sg33-stat-val" id="sg33-cl-need">0</div><div class="sg33-stat-label">Need Replace</div></div>' +
      '<div class="sg33-stat"><div class="sg33-stat-val" id="sg33-cl-avg">0%</div><div class="sg33-stat-label">Avg Life</div></div>' +
      '<div class="sg33-stat"><div class="sg33-stat-val" id="sg33-cl-oldest">-</div><div class="sg33-stat-label">Most Used</div></div></div>';

    makeOverlay('sg33-clublife', 'linear-gradient(135deg,#1565c0,#42a5f5)', '&#x1F527; Club Life Tracker', html);

    function draw() {
      const cv = document.getElementById('sg33-clublife-cv'); if (!cv) return;
      const ctx = cv.getContext('2d');
      const W = 620, H = 380;
      ctx.clearRect(0, 0, W, H);
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      ctx.fillStyle = isDark ? '#1e1e1e' : '#f9f9f9'; ctx.fillRect(0, 0, W, H);
      const ml = 60, mr = 20, mt = 40, mb = 50;
      const cw = W - ml - mr, ch = H - mt - mb;
      const bw = Math.floor(cw / clubs.length) - 4;

      ctx.fillStyle = isDark ? '#e0e0e0' : '#333';
      ctx.font = 'bold 14px Segoe UI, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Club Lifespan Tracker (Rounds)', W / 2, 24);

      // 빈 상태 가드: 기록된 라운드가 하나도 없으면 통계를 만들지 않는다
      const clTotal = data.reduce((s, d) => s + ((d && d.rounds) || 0), 0);

      clubs.forEach((c, i) => {
        const x = ml + i * (bw + 4);
        if (!data[i]) data[i] = { name: c, rounds: 0, max: maxRounds[i], purchased: '' };
        const pct = Math.min(data[i].rounds / data[i].max, 1);
        const bh = pct * ch;
        const color = pct >= 0.9 ? '#c62828' : pct >= 0.7 ? '#ef6c00' : pct >= 0.5 ? '#f9a825' : '#2e7d32';
        ctx.fillStyle = color;
        ctx.beginPath();
        const r = 3;
        const bx = x, by = mt + ch - bh, bwi = bw, bhi = bh;
        ctx.moveTo(bx + r, by); ctx.lineTo(bx + bwi - r, by);
        ctx.quadraticCurveTo(bx + bwi, by, bx + bwi, by + r);
        ctx.lineTo(bx + bwi, by + bhi); ctx.lineTo(bx, by + bhi);
        ctx.lineTo(bx, by + r);
        ctx.quadraticCurveTo(bx, by, bx + r, by);
        ctx.fill();

        ctx.fillStyle = isDark ? '#bbb' : '#555';
        ctx.font = '10px Segoe UI, sans-serif';
        ctx.textAlign = 'center';
        ctx.save();
        ctx.translate(x + bw / 2, H - mb + 10);
        ctx.rotate(-0.5);
        ctx.fillText(c, 0, 0);
        ctx.restore();

        ctx.fillStyle = isDark ? '#e0e0e0' : '#333';
        ctx.font = 'bold 9px Segoe UI, sans-serif';
        ctx.textAlign = 'center';
        if (bh > 15) ctx.fillText(data[i].rounds, x + bw / 2, mt + ch - bh + 12);

        ctx.fillStyle = isDark ? '#666' : '#ccc';
        ctx.font = '8px Segoe UI, sans-serif';
        ctx.fillText(Math.round(pct * 100) + '%', x + bw / 2, mt + ch - bh - 4);
      });

      [0, 0.25, 0.5, 0.75, 1].forEach(p => {
        const y = mt + ch - p * ch;
        ctx.strokeStyle = isDark ? '#333' : '#e0e0e0';
        ctx.lineWidth = 0.5;
        ctx.beginPath(); ctx.moveTo(ml - 5, y); ctx.lineTo(W - mr, y); ctx.stroke();
        ctx.fillStyle = isDark ? '#999' : '#888';
        ctx.font = '9px Segoe UI, sans-serif';
        ctx.textAlign = 'right';
        ctx.fillText(Math.round(p * 100) + '%', ml - 8, y + 3);
      });

      ctx.strokeStyle = '#c62828'; ctx.lineWidth = 1.5; ctx.setLineDash([5, 3]);
      const warnY = mt + ch - 0.8 * ch;
      ctx.beginPath(); ctx.moveTo(ml, warnY); ctx.lineTo(W - mr, warnY); ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = '#c62828'; ctx.font = '9px Segoe UI, sans-serif'; ctx.textAlign = 'left';
      ctx.fillText('Replace Zone (80%)', ml + 5, warnY - 4);

      const nEl = document.getElementById('sg33-cl-need');
      const aEl = document.getElementById('sg33-cl-avg');
      const oEl = document.getElementById('sg33-cl-oldest');

      if (!data.length || clTotal === 0) {
        ctx.fillStyle = isDark ? '#999' : '#888';
        ctx.font = '13px Segoe UI, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('기록을 추가하면 표시됩니다', W / 2, mt + ch / 2);
        if (nEl) nEl.textContent = '-';
        if (aEl) aEl.textContent = '-';
        if (oEl) oEl.textContent = '-';
        return;
      }

      const needReplace = data.filter(d => d.rounds / d.max >= 0.8).length;
      const avgLife = Math.round(data.reduce((s, d) => s + d.rounds / d.max, 0) / data.length * 100);
      const oldest = data.reduce((a, b) => a.rounds / a.max > b.rounds / b.max ? a : b);
      if (nEl) nEl.textContent = needReplace;
      if (aEl) aEl.textContent = avgLife + '%';
      if (oEl) oEl.textContent = oldest.name;
      // 자동 저장 제거: 저장은 Save 버튼에서만
    }

    window._sg33_cl_add = () => { data.forEach(d => { d.rounds = Math.min((d.rounds || 0) + 10, d.max); }); SFX.club_life(); draw(); };
    window._sg33_cl_save = () => { LS('clublife_v2', data); SFX.club_life(); };
    window._sg33_cl_reset = () => { data = clubs.map((c, i) => ({ name: c, rounds: 0, max: maxRounds[i], purchased: '' })); SFX.club_life(); draw(); };

    setTimeout(draw, 80);
    _checkAchievementsV33('club_life_opened');
  }

  // ===============================================================
  // 2. 라운드 난이도 예측기 Canvas 600x380
  // ===============================================================
  function openRoundDifficultyPredictor() {
    SFX.diff_calc();
    let params = LS('rndDiff') || { slope: 130, rating: 72, wind: 15, temp: 25, humidity: 60, rain: 0, fatigue: 3, hcp: 18 };

    const html = '<canvas id="sg33-diff-cv" width="600" height="380" style="width:100%;max-width:600px;border-radius:10px;background:#f9f9f9;margin-bottom:10px"></canvas>' +
      '<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:10px">' +
      '<div class="sg33-row"><span class="sg33-label">Slope</span><input type="range" class="sg33-slider" min="55" max="155" value="' + params.slope + '" id="sg33-diff-slope"><span class="sg33-val" id="sg33-diff-slopeV">' + params.slope + '</span></div>' +
      '<div class="sg33-row"><span class="sg33-label">Rating</span><input type="range" class="sg33-slider" min="62" max="78" value="' + params.rating + '" step="0.1" id="sg33-diff-rating"><span class="sg33-val" id="sg33-diff-ratingV">' + params.rating + '</span></div>' +
      '<div class="sg33-row"><span class="sg33-label">Wind km/h</span><input type="range" class="sg33-slider" min="0" max="50" value="' + params.wind + '" id="sg33-diff-wind"><span class="sg33-val" id="sg33-diff-windV">' + params.wind + '</span></div>' +
      '<div class="sg33-row"><span class="sg33-label">Temp &deg;C</span><input type="range" class="sg33-slider" min="-5" max="42" value="' + params.temp + '" id="sg33-diff-temp"><span class="sg33-val" id="sg33-diff-tempV">' + params.temp + '</span></div>' +
      '<div class="sg33-row"><span class="sg33-label">Humidity%</span><input type="range" class="sg33-slider" min="10" max="100" value="' + params.humidity + '" id="sg33-diff-hum"><span class="sg33-val" id="sg33-diff-humV">' + params.humidity + '</span></div>' +
      '<div class="sg33-row"><span class="sg33-label">Rain mm</span><input type="range" class="sg33-slider" min="0" max="30" value="' + params.rain + '" id="sg33-diff-rain"><span class="sg33-val" id="sg33-diff-rainV">' + params.rain + '</span></div>' +
      '<div class="sg33-row"><span class="sg33-label">Fatigue</span><input type="range" class="sg33-slider" min="1" max="10" value="' + params.fatigue + '" id="sg33-diff-fat"><span class="sg33-val" id="sg33-diff-fatV">' + params.fatigue + '</span></div>' +
      '<div class="sg33-row"><span class="sg33-label">HCP</span><input type="range" class="sg33-slider" min="0" max="36" value="' + params.hcp + '" id="sg33-diff-hcp"><span class="sg33-val" id="sg33-diff-hcpV">' + params.hcp + '</span></div>' +
      '</div>' +
      '<div class="sg33-grid" style="grid-template-columns:repeat(4,1fr)">' +
      '<div class="sg33-stat"><div class="sg33-stat-val" id="sg33-diff-score">-</div><div class="sg33-stat-label">Predicted</div></div>' +
      '<div class="sg33-stat"><div class="sg33-stat-val" id="sg33-diff-grade">-</div><div class="sg33-stat-label">Difficulty</div></div>' +
      '<div class="sg33-stat"><div class="sg33-stat-val" id="sg33-diff-penalty">-</div><div class="sg33-stat-label">Weather +</div></div>' +
      '<div class="sg33-stat"><div class="sg33-stat-val" id="sg33-diff-advice">-</div><div class="sg33-stat-label">Advice</div></div></div>';

    makeOverlay('sg33-diff', 'linear-gradient(135deg,#6a1b9a,#ab47bc)', '&#x1F4CA; Round Difficulty Predictor', html);

    const ids = ['slope','rating','wind','temp','hum','rain','fat','hcp'];
    const keys = ['slope','rating','wind','temp','humidity','rain','fatigue','hcp'];

    function draw() {
      ids.forEach((id, i) => {
        const el = document.getElementById('sg33-diff-' + id);
        if (el) { params[keys[i]] = parseFloat(el.value); document.getElementById('sg33-diff-' + id + 'V').textContent = el.value; }
      });

      const slopeFactor = (params.slope - 113) / 42;
      const windPenalty = params.wind > 20 ? (params.wind - 20) * 0.15 : 0;
      const tempPenalty = params.temp < 10 ? (10 - params.temp) * 0.2 : params.temp > 35 ? (params.temp - 35) * 0.3 : 0;
      const rainPenalty = params.rain * 0.5;
      const fatiguePenalty = params.fatigue > 5 ? (params.fatigue - 5) * 0.4 : 0;
      const totalWeatherPenalty = Math.round((windPenalty + tempPenalty + rainPenalty) * 10) / 10;
      const baseScore = params.rating + (params.slope / 113 - 1) * params.hcp;
      const predicted = Math.round((baseScore + totalWeatherPenalty + fatiguePenalty) * 10) / 10;
      const diffScore = slopeFactor * 30 + windPenalty + tempPenalty + rainPenalty + fatiguePenalty;
      const grade = diffScore > 20 ? 'Extreme' : diffScore > 14 ? 'Very Hard' : diffScore > 8 ? 'Hard' : diffScore > 3 ? 'Medium' : 'Easy';
      const advice = diffScore > 14 ? 'Conservative' : diffScore > 8 ? 'Smart Play' : diffScore > 3 ? 'Normal' : 'Aggressive';
      const gradeColor = { Extreme: '#c62828', 'Very Hard': '#e65100', Hard: '#f9a825', Medium: '#2e7d32', Easy: '#1565c0' };

      const cv = document.getElementById('sg33-diff-cv'); if (!cv) return;
      const ctx = cv.getContext('2d');
      const W = 600, H = 380;
      ctx.clearRect(0, 0, W, H);
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      ctx.fillStyle = isDark ? '#1e1e1e' : '#f9f9f9'; ctx.fillRect(0, 0, W, H);

      ctx.fillStyle = isDark ? '#e0e0e0' : '#333';
      ctx.font = 'bold 14px Segoe UI, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Round Difficulty Breakdown', W / 2, 24);

      const factors = [
        { name: 'Course Slope', val: slopeFactor * 30, max: 30, color: '#1565c0' },
        { name: 'Wind Effect', val: windPenalty, max: 5, color: '#0277bd' },
        { name: 'Temperature', val: tempPenalty, max: 4, color: '#c62828' },
        { name: 'Rain Impact', val: rainPenalty, max: 15, color: '#1565c0' },
        { name: 'Humidity', val: params.humidity > 80 ? (params.humidity - 80) * 0.1 : 0, max: 2, color: '#00695c' },
        { name: 'Fatigue', val: fatiguePenalty, max: 2, color: '#6a1b9a' },
        { name: 'HCP Adjust', val: params.hcp * 0.3, max: 10.8, color: '#e65100' }
      ];
      const ml = 110, mt = 45, bh = 28, gap = 6;
      const barW = W - ml - 40;
      factors.forEach((f, i) => {
        const y = mt + i * (bh + gap);
        ctx.fillStyle = isDark ? '#aaa' : '#555';
        ctx.font = '11px Segoe UI, sans-serif';
        ctx.textAlign = 'right';
        ctx.fillText(f.name, ml - 8, y + bh / 2 + 4);

        ctx.fillStyle = isDark ? '#333' : '#eee';
        ctx.fillRect(ml, y, barW, bh);

        const fw = Math.min(f.val / 30 * barW, barW);
        const grd = ctx.createLinearGradient(ml, y, ml + fw, y);
        grd.addColorStop(0, f.color); grd.addColorStop(1, f.color + '88');
        ctx.fillStyle = grd;
        ctx.beginPath();
        ctx.moveTo(ml + 3, y); ctx.lineTo(ml + fw - 3, y);
        ctx.quadraticCurveTo(ml + fw, y, ml + fw, y + 3);
        ctx.lineTo(ml + fw, y + bh - 3);
        ctx.quadraticCurveTo(ml + fw, y + bh, ml + fw - 3, y + bh);
        ctx.lineTo(ml + 3, y + bh);
        ctx.quadraticCurveTo(ml, y + bh, ml, y + bh - 3);
        ctx.lineTo(ml, y + 3);
        ctx.quadraticCurveTo(ml, y, ml + 3, y);
        ctx.fill();

        ctx.fillStyle = fw > 30 ? '#fff' : (isDark ? '#ddd' : '#333');
        ctx.font = 'bold 10px Segoe UI, sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText('+' + f.val.toFixed(1), ml + Math.min(fw + 4, barW - 30), y + bh / 2 + 4);
      });

      const gaugeY = mt + factors.length * (bh + gap) + 20;
      const gaugeW = W - 80, gaugeH = 30;
      const gx = 40;
      const colors = ['#2e7d32','#f9a825','#ef6c00','#c62828'];
      colors.forEach((c, i) => {
        ctx.fillStyle = c;
        ctx.fillRect(gx + i * gaugeW / 4, gaugeY, gaugeW / 4, gaugeH);
      });
      const needleX = gx + Math.min(diffScore / 25, 1) * gaugeW;
      ctx.fillStyle = isDark ? '#fff' : '#000';
      ctx.beginPath();
      ctx.moveTo(needleX - 5, gaugeY - 4); ctx.lineTo(needleX + 5, gaugeY - 4); ctx.lineTo(needleX, gaugeY + 5);
      ctx.fill();
      ctx.font = 'bold 12px Segoe UI, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillStyle = gradeColor[grade];
      ctx.fillText(grade + ' (' + diffScore.toFixed(1) + ')', W / 2, gaugeY + gaugeH + 18);
      ['Easy','Medium','Hard','Extreme'].forEach((l, i) => {
        ctx.fillStyle = isDark ? '#999' : '#888';
        ctx.font = '8px Segoe UI, sans-serif';
        ctx.fillText(l, gx + i * gaugeW / 4 + gaugeW / 8, gaugeY + gaugeH + 32);
      });

      document.getElementById('sg33-diff-score').textContent = predicted;
      document.getElementById('sg33-diff-grade').textContent = grade;
      document.getElementById('sg33-diff-penalty').textContent = '+' + totalWeatherPenalty;
      document.getElementById('sg33-diff-advice').textContent = advice;
      LS('rndDiff', params);
    }

    ids.forEach(id => {
      const el = document.getElementById('sg33-diff-' + id);
      if (el) el.addEventListener('input', () => { SFX.diff_calc(); draw(); });
    });
    setTimeout(draw, 80);
    _checkAchievementsV33('difficulty_opened');
  }

  // ===============================================================
  // 3. 골프 훈련 주기화 Canvas 580x360
  // ===============================================================
  function openTrainingPeriodization() {
    SFX.train_plan();
    let data = LS('trainPeriod') || { week: 1, completed: Array(12).fill(false) };
    const phases = [
      { name: 'Base', weeks: [1,2,3], color: '#2e7d32', focus: 'Fundamentals + Flexibility' },
      { name: 'Build', weeks: [4,5,6], color: '#1565c0', focus: 'Technique + Strength' },
      { name: 'Peak', weeks: [7,8,9], color: '#e65100', focus: 'Competition Prep + Speed' },
      { name: 'Taper', weeks: [10,11,12], color: '#6a1b9a', focus: 'Recovery + Mental Game' }
    ];
    const activities = ['Driving Range','Putting Green','Chipping Area','Course Play','Fitness','Flexibility','Mental','Video Analysis','Club Fitting','Nutrition','Rest','Competition'];

    const html = '<canvas id="sg33-train-cv" width="580" height="360" style="width:100%;max-width:580px;border-radius:10px;background:#f9f9f9;margin-bottom:10px"></canvas>' +
      '<div class="sg33-row" style="justify-content:center;gap:6px">' +
      '<button class="sg33-btn sg33-btn-outline" onclick="window._sg33_tr_prev()">&larr; Prev</button>' +
      '<span class="sg33-val" id="sg33-tr-weekLabel">Week ' + data.week + '</span>' +
      '<button class="sg33-btn sg33-btn-outline" onclick="window._sg33_tr_next()">Next &rarr;</button>' +
      '<button class="sg33-btn sg33-btn-primary" onclick="window._sg33_tr_complete()">Complete</button>' +
      '<button class="sg33-btn sg33-btn-outline" onclick="window._sg33_tr_reset()">Reset</button></div>' +
      '<div class="sg33-grid" style="grid-template-columns:repeat(4,1fr);margin-top:10px">' +
      phases.map(p => '<div class="sg33-stat" style="border-left:3px solid ' + p.color + '"><div class="sg33-stat-val" style="font-size:12px;color:' + p.color + '">' + p.name + '</div><div class="sg33-stat-label">' + p.focus + '</div></div>').join('') + '</div>';

    makeOverlay('sg33-train', 'linear-gradient(135deg,#2e7d32,#66bb6a)', '&#x1F3CB;&#xFE0F; Training Periodization', html);

    function draw() {
      const cv = document.getElementById('sg33-train-cv'); if (!cv) return;
      const ctx = cv.getContext('2d');
      const W = 580, H = 360;
      ctx.clearRect(0, 0, W, H);
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      ctx.fillStyle = isDark ? '#1e1e1e' : '#f9f9f9'; ctx.fillRect(0, 0, W, H);

      ctx.fillStyle = isDark ? '#e0e0e0' : '#333';
      ctx.font = 'bold 14px Segoe UI, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('12-Week Golf Training Periodization', W / 2, 22);

      const ml = 30, mr = 20, mt = 40, mb = 30;
      const cw = W - ml - mr, ch = H - mt - mb;
      const cellW = cw / 12, cellH = ch / activities.length;

      const intensityMap = [
        [7,8,7,5,6,7,4,5,6,3,4,5],
        [8,7,8,6,7,6,5,6,5,4,3,4],
        [6,7,6,7,8,7,6,5,4,3,4,3],
        [5,5,6,7,7,8,9,8,9,5,4,6],
        [6,7,7,8,8,7,6,5,5,3,4,3],
        [8,8,7,6,6,5,5,5,4,6,7,5],
        [4,5,5,6,6,7,8,8,9,7,6,8],
        [5,6,7,7,8,8,7,6,5,4,3,3],
        [3,3,4,5,5,5,4,4,3,6,5,4],
        [6,6,7,7,7,8,8,7,6,5,6,5],
        [3,3,3,3,3,3,3,3,3,7,7,6],
        [2,2,3,3,4,5,7,8,9,6,5,8]
      ];

      activities.forEach((act, ai) => {
        ctx.fillStyle = isDark ? '#aaa' : '#555';
        ctx.font = '8px Segoe UI, sans-serif';
        ctx.textAlign = 'right';
        ctx.fillText(act, ml - 3, mt + ai * cellH + cellH / 2 + 3);
      });

      for (let w = 0; w < 12; w++) {
        const phase = phases.find(p => p.weeks.includes(w + 1));
        ctx.fillStyle = isDark ? '#999' : '#666';
        ctx.font = w === data.week - 1 ? 'bold 9px Segoe UI, sans-serif' : '8px Segoe UI, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('W' + (w + 1), ml + w * cellW + cellW / 2, mt - 5);

        activities.forEach((act, ai) => {
          const intensity = intensityMap[ai][w];
          const alpha = intensity / 10;
          const color = phase ? phase.color : '#999';
          ctx.globalAlpha = 0.15 + alpha * 0.7;
          ctx.fillStyle = color;
          ctx.fillRect(ml + w * cellW + 1, mt + ai * cellH + 1, cellW - 2, cellH - 2);
          ctx.globalAlpha = 1;

          if (data.completed[w]) {
            ctx.strokeStyle = '#fff';
            ctx.lineWidth = 1.5;
            const cx = ml + w * cellW + cellW / 2, cy = mt + ai * cellH + cellH / 2;
            ctx.beginPath(); ctx.moveTo(cx - 3, cy); ctx.lineTo(cx - 1, cy + 3); ctx.lineTo(cx + 4, cy - 3); ctx.stroke();
          }
        });

        if (w === data.week - 1) {
          ctx.strokeStyle = '#ff6b35';
          ctx.lineWidth = 2;
          ctx.strokeRect(ml + w * cellW, mt, cellW, ch);
        }
      }

      phases.forEach(p => {
        const startW = p.weeks[0] - 1;
        const barX = ml + startW * cellW;
        const barW = 3 * cellW;
        ctx.fillStyle = p.color;
        ctx.globalAlpha = 0.3;
        ctx.fillRect(barX, H - mb + 5, barW, 12);
        ctx.globalAlpha = 1;
        ctx.fillStyle = isDark ? '#ddd' : '#333';
        ctx.font = 'bold 9px Segoe UI, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(p.name, barX + barW / 2, H - mb + 14);
      });

      const label = document.getElementById('sg33-tr-weekLabel');
      if (label) label.textContent = 'Week ' + data.week + ' / 12';
      LS('trainPeriod', data);
    }

    window._sg33_tr_prev = () => { data.week = Math.max(1, data.week - 1); SFX.train_plan(); draw(); };
    window._sg33_tr_next = () => { data.week = Math.min(12, data.week + 1); SFX.train_plan(); draw(); };
    window._sg33_tr_complete = () => { data.completed[data.week - 1] = true; SFX.train_done(); draw(); _checkAchievementsV33('train_week_done'); };
    window._sg33_tr_reset = () => { data = { week: 1, completed: Array(12).fill(false) }; SFX.train_plan(); draw(); };

    setTimeout(draw, 80);
    _checkAchievementsV33('training_opened');
  }

  // ===============================================================
  // 4. 샷 궤적 시뮬레이터 Canvas 600x380
  // ===============================================================
  function openShotTrajectorySimulator() {
    SFX.traj_launch();
    let params = LS('shotTraj') || { club: 0, speed: 100, loft: 10.5, spin: 2700, angle: 12 };
    const clubData = [
      { name: 'Driver', loft: 10.5, speed: 167, spin: 2700, carry: 250 },
      { name: '3-Wood', loft: 15, speed: 155, spin: 3400, carry: 225 },
      { name: '5-Iron', loft: 27, speed: 133, spin: 5300, carry: 185 },
      { name: '7-Iron', loft: 34, speed: 120, spin: 7000, carry: 160 },
      { name: '9-Iron', loft: 42, speed: 105, spin: 8500, carry: 130 },
      { name: 'PW', loft: 48, speed: 96, spin: 9500, carry: 115 },
      { name: 'SW', loft: 56, speed: 82, spin: 10500, carry: 85 },
      { name: 'LW', loft: 60, speed: 75, spin: 11000, carry: 65 }
    ];

    const html = '<canvas id="sg33-traj-cv" width="600" height="380" style="width:100%;max-width:600px;border-radius:10px;background:#f9f9f9;margin-bottom:10px"></canvas>' +
      '<div class="sg33-tabs" id="sg33-traj-tabs">' + clubData.map((c, i) => '<button class="sg33-tab' + (i === params.club ? ' active' : '') + '" data-i="' + i + '">' + c.name + '</button>').join('') + '</div>' +
      '<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">' +
      '<div class="sg33-row"><span class="sg33-label">Speed mph</span><input type="range" class="sg33-slider" min="60" max="190" value="' + params.speed + '" id="sg33-traj-speed"><span class="sg33-val" id="sg33-traj-speedV">' + params.speed + '</span></div>' +
      '<div class="sg33-row"><span class="sg33-label">Launch &deg;</span><input type="range" class="sg33-slider" min="2" max="45" value="' + params.angle + '" id="sg33-traj-angle"><span class="sg33-val" id="sg33-traj-angleV">' + params.angle + '</span></div>' +
      '<div class="sg33-row"><span class="sg33-label">Spin rpm</span><input type="range" class="sg33-slider" min="1000" max="12000" step="100" value="' + params.spin + '" id="sg33-traj-spin"><span class="sg33-val" id="sg33-traj-spinV">' + params.spin + '</span></div>' +
      '<div class="sg33-row"><span class="sg33-label">Loft &deg;</span><input type="range" class="sg33-slider" min="6" max="64" step="0.5" value="' + params.loft + '" id="sg33-traj-loft"><span class="sg33-val" id="sg33-traj-loftV">' + params.loft + '</span></div></div>' +
      '<div class="sg33-grid" style="grid-template-columns:repeat(4,1fr);margin-top:8px">' +
      '<div class="sg33-stat"><div class="sg33-stat-val" id="sg33-traj-carry">-</div><div class="sg33-stat-label">Carry yd</div></div>' +
      '<div class="sg33-stat"><div class="sg33-stat-val" id="sg33-traj-total">-</div><div class="sg33-stat-label">Total yd</div></div>' +
      '<div class="sg33-stat"><div class="sg33-stat-val" id="sg33-traj-apex">-</div><div class="sg33-stat-label">Apex yd</div></div>' +
      '<div class="sg33-stat"><div class="sg33-stat-val" id="sg33-traj-time">-</div><div class="sg33-stat-label">Hang sec</div></div></div>';

    makeOverlay('sg33-traj', 'linear-gradient(135deg,#00695c,#26a69a)', '&#x1F3CC;&#xFE0F; Shot Trajectory Simulator', html);

    function draw() {
      const cv = document.getElementById('sg33-traj-cv'); if (!cv) return;
      const ctx = cv.getContext('2d');
      const W = 600, H = 380;
      ctx.clearRect(0, 0, W, H);
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';

      ctx.fillStyle = isDark ? '#1e1e1e' : '#e8f5e9';
      ctx.fillRect(0, 0, W, H);

      ctx.fillStyle = isDark ? '#1a3a25' : '#c8e6c9';
      ctx.fillRect(0, H - 40, W, 40);

      const speed = params.speed * 0.44704;
      const anglRad = params.angle * Math.PI / 180;
      const vx = speed * Math.cos(anglRad);
      const vy = speed * Math.sin(anglRad);
      const g = 9.81;
      const dragCoef = 0.0003 + params.spin / 10000000;
      const liftCoef = params.spin / 800000;

      const points = [];
      let x = 0, y = 0, vxc = vx, vyc = vy, dt = 0.02, t = 0;
      let maxY = 0;
      for (let step = 0; step < 3000 && y >= 0; step++) {
        const v = Math.sqrt(vxc * vxc + vyc * vyc);
        const drag = dragCoef * v * v;
        const lift = liftCoef * v;
        vxc -= drag * (vxc / v) * dt;
        vyc -= (g - lift) * dt - drag * (vyc / v) * dt;
        x += vxc * dt;
        y += vyc * dt;
        t += dt;
        if (y < 0 && step > 10) break;
        if (y > maxY) maxY = y;
        points.push({ x, y });
      }

      const carryYd = Math.round(x * 1.09361);
      const totalYd = Math.round(carryYd * 1.05);
      const apexYd = Math.round(maxY * 1.09361);
      const hangTime = Math.round(t * 10) / 10;

      const ml = 50, mr = 30, mt = 40, mb = 50;
      const cw = W - ml - mr, ch = H - mt - mb;
      const xScale = cw / Math.max(x, 1);
      const yScale = ch / Math.max(maxY * 1.2, 1);

      ctx.strokeStyle = isDark ? '#333' : '#a5d6a7';
      ctx.lineWidth = 0.5;
      for (let i = 0; i <= 5; i++) {
        const gy = mt + ch - i * ch / 5;
        ctx.beginPath(); ctx.moveTo(ml, gy); ctx.lineTo(W - mr, gy); ctx.stroke();
        ctx.fillStyle = isDark ? '#999' : '#666';
        ctx.font = '9px Segoe UI, sans-serif';
        ctx.textAlign = 'right';
        ctx.fillText(Math.round(i * maxY * 1.09361 / 5) + 'yd', ml - 5, gy + 3);
      }
      for (let i = 0; i <= 5; i++) {
        const gx = ml + i * cw / 5;
        ctx.beginPath(); ctx.moveTo(gx, mt); ctx.lineTo(gx, mt + ch); ctx.stroke();
        ctx.fillStyle = isDark ? '#999' : '#666';
        ctx.font = '9px Segoe UI, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(Math.round(i * carryYd / 5) + 'yd', gx, mt + ch + 14);
      }

      if (points.length > 2) {
        const grd = ctx.createLinearGradient(ml, mt, ml, mt + ch);
        grd.addColorStop(0, 'rgba(255,107,53,0.3)');
        grd.addColorStop(1, 'rgba(255,107,53,0)');
        ctx.fillStyle = grd;
        ctx.beginPath();
        ctx.moveTo(ml, mt + ch);
        points.forEach(p => ctx.lineTo(ml + p.x * xScale, mt + ch - p.y * yScale));
        ctx.lineTo(ml + points[points.length - 1].x * xScale, mt + ch);
        ctx.fill();

        ctx.strokeStyle = '#ff6b35';
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        points.forEach((p, i) => {
          const px = ml + p.x * xScale, py = mt + ch - p.y * yScale;
          i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
        });
        ctx.stroke();

        const apexP = points.reduce((a, b) => b.y > a.y ? b : a);
        const apexPx = ml + apexP.x * xScale, apexPy = mt + ch - apexP.y * yScale;
        ctx.fillStyle = '#ff6b35';
        ctx.beginPath(); ctx.arc(apexPx, apexPy, 5, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = isDark ? '#fff' : '#333';
        ctx.font = 'bold 10px Segoe UI, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('Apex: ' + apexYd + 'yd', apexPx, apexPy - 10);
      }

      ctx.fillStyle = isDark ? '#e0e0e0' : '#333';
      ctx.font = 'bold 14px Segoe UI, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Shot Trajectory - ' + clubData[params.club].name, W / 2, 24);

      document.getElementById('sg33-traj-carry').textContent = carryYd;
      document.getElementById('sg33-traj-total').textContent = totalYd;
      document.getElementById('sg33-traj-apex').textContent = apexYd;
      document.getElementById('sg33-traj-time').textContent = hangTime + 's';
      LS('shotTraj', params);
    }

    document.getElementById('sg33-traj-tabs').addEventListener('click', e => {
      const btn = e.target.closest('.sg33-tab');
      if (!btn) return;
      const idx = parseInt(btn.dataset.i);
      document.querySelectorAll('#sg33-traj-tabs .sg33-tab').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      params.club = idx;
      const c = clubData[idx];
      params.speed = c.speed; params.loft = c.loft; params.spin = c.spin; params.angle = Math.round(c.loft * 0.75);
      document.getElementById('sg33-traj-speed').value = c.speed;
      document.getElementById('sg33-traj-angle').value = params.angle;
      document.getElementById('sg33-traj-spin').value = c.spin;
      document.getElementById('sg33-traj-loft').value = c.loft;
      SFX.traj_launch(); draw();
    });

    ['speed','angle','spin','loft'].forEach(id => {
      const el = document.getElementById('sg33-traj-' + id);
      if (el) el.addEventListener('input', () => {
        params[id === 'angle' ? 'angle' : id] = parseFloat(el.value);
        document.getElementById('sg33-traj-' + id + 'V').textContent = el.value;
        draw();
      });
    });

    setTimeout(draw, 80);
    _checkAchievementsV33('trajectory_opened');
  }

  // ===============================================================
  // 5. 코스 조건 전략 매트릭스 Canvas 640x420
  // ===============================================================
  function openCourseConditionMatrix() {
    SFX.strategy_tap();
    const conditions = ['Dry/Fast', 'Wet/Soft', 'Windy', 'Cold(<10C)', 'Hot(>35C)', 'Elevation(>500m)'];
    const strategies = ['Tee Shot', 'Approach', 'Chipping', 'Putting', 'Club Select', 'Risk Mgmt', 'Hydration', 'Warm-up'];
    const matrix = [
      [8,7,6,9,7,5,6,7],
      [5,8,9,6,8,7,7,8],
      [9,6,7,7,9,9,7,6],
      [6,5,7,8,8,6,8,9],
      [7,7,6,7,7,8,10,8],
      [8,6,7,8,9,7,8,7]
    ];

    const html = '<canvas id="sg33-matrix-cv" width="640" height="420" style="width:100%;max-width:640px;border-radius:10px;background:#f9f9f9;margin-bottom:10px"></canvas>' +
      '<div class="sg33-grid" style="grid-template-columns:repeat(3,1fr)">' +
      '<div class="sg33-stat"><div class="sg33-stat-val" style="font-size:12px;color:#c62828">&#x2B24; Critical (8-10)</div></div>' +
      '<div class="sg33-stat"><div class="sg33-stat-val" style="font-size:12px;color:#f9a825">&#x2B24; Important (5-7)</div></div>' +
      '<div class="sg33-stat"><div class="sg33-stat-val" style="font-size:12px;color:#2e7d32">&#x2B24; Normal (1-4)</div></div></div>';

    makeOverlay('sg33-matrix', 'linear-gradient(135deg,#37474f,#78909c)', '&#x1F9E9; Course Condition Strategy Matrix', html);

    function draw() {
      const cv = document.getElementById('sg33-matrix-cv'); if (!cv) return;
      const ctx = cv.getContext('2d');
      const W = 640, H = 420;
      ctx.clearRect(0, 0, W, H);
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      ctx.fillStyle = isDark ? '#1e1e1e' : '#f9f9f9'; ctx.fillRect(0, 0, W, H);

      ctx.fillStyle = isDark ? '#e0e0e0' : '#333';
      ctx.font = 'bold 14px Segoe UI, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Course Condition Strategy Matrix', W / 2, 22);

      const ml = 100, mt = 45, mr = 20, mb = 20;
      const cw = W - ml - mr, ch = H - mt - mb;
      const cellW = cw / strategies.length, cellH = ch / conditions.length;

      strategies.forEach((s, i) => {
        ctx.fillStyle = isDark ? '#bbb' : '#555';
        ctx.font = 'bold 9px Segoe UI, sans-serif';
        ctx.textAlign = 'center';
        ctx.save();
        ctx.translate(ml + i * cellW + cellW / 2, mt - 5);
        ctx.rotate(-0.4);
        ctx.fillText(s, 0, 0);
        ctx.restore();
      });

      conditions.forEach((c, ci) => {
        ctx.fillStyle = isDark ? '#bbb' : '#555';
        ctx.font = '10px Segoe UI, sans-serif';
        ctx.textAlign = 'right';
        ctx.fillText(c, ml - 6, mt + ci * cellH + cellH / 2 + 4);

        strategies.forEach((s, si) => {
          const val = matrix[ci][si];
          const color = val >= 8 ? (isDark ? 'rgba(198,40,40,0.7)' : 'rgba(198,40,40,0.6)') :
                        val >= 5 ? (isDark ? 'rgba(249,168,37,0.5)' : 'rgba(249,168,37,0.4)') :
                                   (isDark ? 'rgba(46,125,50,0.4)' : 'rgba(46,125,50,0.3)');
          ctx.fillStyle = color;
          const cx = ml + si * cellW + 2, cy = mt + ci * cellH + 2;
          ctx.beginPath();
          ctx.moveTo(cx + 4, cy); ctx.lineTo(cx + cellW - 6, cy);
          ctx.quadraticCurveTo(cx + cellW - 4, cy, cx + cellW - 4, cy + 4);
          ctx.lineTo(cx + cellW - 4, cy + cellH - 6);
          ctx.quadraticCurveTo(cx + cellW - 4, cy + cellH - 4, cx + cellW - 6, cy + cellH - 4);
          ctx.lineTo(cx + 4, cy + cellH - 4);
          ctx.quadraticCurveTo(cx + 2, cy + cellH - 4, cx + 2, cy + cellH - 6);
          ctx.lineTo(cx + 2, cy + 4);
          ctx.quadraticCurveTo(cx + 2, cy, cx + 4, cy);
          ctx.fill();

          ctx.fillStyle = isDark ? '#fff' : '#333';
          ctx.font = 'bold 14px Segoe UI, sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText(val, ml + si * cellW + cellW / 2, mt + ci * cellH + cellH / 2 + 5);
        });
      });
    }

    setTimeout(draw, 80);
    _checkAchievementsV33('matrix_opened');
  }

  // ===============================================================
  // 6. 라운드 페이스 비교기 Canvas 600x360
  // ===============================================================
  function openRoundPaceComparator() {
    SFX.pace_check();
    // actual(실제 소요시간)은 사용자가 입력할 때만 채워진다. ideal은 코스 기준값(고정 참고치).
    let data = LS('roundPace_v2') || Array.from({ length: 18 }, (_, i) => ({
      hole: i + 1,
      actual: null,
      ideal: i < 4 ? 13 : i < 9 ? 14 : i < 13 ? 14 : 15
    }));

    let holeOpts = '';
    for (let i = 1; i <= 18; i++) holeOpts += '<option value="' + i + '">' + i + 'H</option>';

    const html = '<canvas id="sg33-pace-cv" width="600" height="360" style="width:100%;max-width:600px;border-radius:10px;background:#f9f9f9;margin-bottom:10px"></canvas>' +
      '<div class="sg33-row" style="justify-content:center;gap:6px;flex-wrap:wrap">' +
      '<span class="sg33-label">Hole</span><select id="sg33-pace-hole" style="padding:4px 8px;border-radius:6px;border:1px solid var(--border,#ddd)">' + holeOpts + '</select>' +
      '<span class="sg33-label">Minutes</span><input type="number" id="sg33-pace-min" min="1" max="60" step="1" placeholder="-" style="width:70px;padding:4px 8px;border-radius:6px;border:1px solid var(--border,#ddd)">' +
      '<button class="sg33-btn sg33-btn-primary" onclick="window._sg33_pace_record()">&#x2795; Record</button></div>' +
      '<div class="sg33-row" style="justify-content:center;gap:6px;margin-top:6px">' +
      '<button class="sg33-btn sg33-btn-outline" onclick="window._sg33_pace_save()">&#x1F4BE; Save</button>' +
      '<button class="sg33-btn sg33-btn-outline" onclick="window._sg33_pace_reset()">Reset</button></div>' +
      '<div class="sg33-grid" style="grid-template-columns:repeat(4,1fr);margin-top:10px">' +
      '<div class="sg33-stat"><div class="sg33-stat-val" id="sg33-pace-total">-</div><div class="sg33-stat-label">Total min</div></div>' +
      '<div class="sg33-stat"><div class="sg33-stat-val" id="sg33-pace-ideal">-</div><div class="sg33-stat-label">Ideal min</div></div>' +
      '<div class="sg33-stat"><div class="sg33-stat-val" id="sg33-pace-diff">-</div><div class="sg33-stat-label">Difference</div></div>' +
      '<div class="sg33-stat"><div class="sg33-stat-val" id="sg33-pace-grade">-</div><div class="sg33-stat-label">Pace Grade</div></div></div>';

    makeOverlay('sg33-pace', 'linear-gradient(135deg,#e65100,#ff9800)', '&#x23F1;&#xFE0F; Round Pace Comparator', html);

    function draw() {
      const cv = document.getElementById('sg33-pace-cv'); if (!cv) return;
      const ctx = cv.getContext('2d');
      const W = 600, H = 360;
      ctx.clearRect(0, 0, W, H);
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      ctx.fillStyle = isDark ? '#1e1e1e' : '#f9f9f9'; ctx.fillRect(0, 0, W, H);

      ctx.fillStyle = isDark ? '#e0e0e0' : '#333';
      ctx.font = 'bold 14px Segoe UI, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Round Pace: Actual vs Ideal (min/hole)', W / 2, 22);

      const ml = 50, mr = 20, mt = 40, mb = 50;
      const cw = W - ml - mr, ch = H - mt - mb;
      const maxMin = 25;
      const bw = Math.floor(cw / 18) - 3;

      [5, 10, 15, 20, 25].forEach(v => {
        const y = mt + ch - (v / maxMin) * ch;
        ctx.strokeStyle = isDark ? '#333' : '#e0e0e0';
        ctx.lineWidth = 0.5;
        ctx.beginPath(); ctx.moveTo(ml, y); ctx.lineTo(W - mr, y); ctx.stroke();
        ctx.fillStyle = isDark ? '#999' : '#888';
        ctx.font = '9px Segoe UI, sans-serif';
        ctx.textAlign = 'right';
        ctx.fillText(v + 'm', ml - 5, y + 3);
      });

      const paceEntered = data.filter(d => typeof d.actual === 'number' && !isNaN(d.actual));

      data.forEach((d, i) => {
        const x = ml + i * (bw + 3);
        const ih = (d.ideal / maxMin) * ch;

        if (typeof d.actual === 'number' && !isNaN(d.actual)) {
          const ah = (d.actual / maxMin) * ch;
          ctx.fillStyle = d.actual > d.ideal + 2 ? '#c62828' : d.actual > d.ideal ? '#f9a825' : '#2e7d32';
          ctx.fillRect(x, mt + ch - ah, bw / 2 - 1, ah);
        }

        ctx.fillStyle = isDark ? '#555' : '#bbb';
        ctx.fillRect(x + bw / 2, mt + ch - ih, bw / 2 - 1, ih);

        ctx.fillStyle = isDark ? '#bbb' : '#555';
        ctx.font = '8px Segoe UI, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(d.hole, x + bw / 2, mt + ch + 14);
      });

      ctx.fillStyle = '#2e7d32'; ctx.fillRect(ml + cw - 100, mt + 5, 10, 10);
      ctx.fillStyle = isDark ? '#bbb' : '#555'; ctx.font = '9px Segoe UI, sans-serif'; ctx.textAlign = 'left';
      ctx.fillText('Actual', ml + cw - 86, mt + 14);
      ctx.fillStyle = isDark ? '#555' : '#bbb'; ctx.fillRect(ml + cw - 100, mt + 20, 10, 10);
      ctx.fillText('Ideal', ml + cw - 86, mt + 29);

      ctx.strokeStyle = '#ff6b35'; ctx.lineWidth = 1; ctx.setLineDash([3, 3]);
      const f9y = mt + ch - (9 * ch / (18 * maxMin)) * 18;
      ctx.beginPath();
      data.forEach((d, i) => {
        const x = ml + i * (bw + 3) + bw / 2;
        const y = mt + ch - (d.ideal / maxMin) * ch;
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      });
      ctx.stroke();
      ctx.setLineDash([]);

      const tEl = document.getElementById('sg33-pace-total');
      const iEl = document.getElementById('sg33-pace-ideal');
      const dEl = document.getElementById('sg33-pace-diff');
      const gEl = document.getElementById('sg33-pace-grade');

      if (!paceEntered.length) {
        ctx.fillStyle = isDark ? '#999' : '#888';
        ctx.font = '13px Segoe UI, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('기록을 추가하면 표시됩니다 (회색 = 기준 페이스)', W / 2, mt + 22);
        if (tEl) tEl.textContent = '-';
        if (iEl) iEl.textContent = '-';
        if (dEl) dEl.textContent = '-';
        if (gEl) gEl.textContent = '-';
        return;
      }

      // 입력된 홀만 비교한다 (기록 없는 홀을 0분으로 계산하지 않는다)
      const totalActual = paceEntered.reduce((s, d) => s + d.actual, 0);
      const totalIdeal = paceEntered.reduce((s, d) => s + d.ideal, 0);
      const diff = totalActual - totalIdeal;
      const grade = paceEntered.length < 18 ? '-' : (diff <= -5 ? 'S' : diff <= 0 ? 'A' : diff <= 10 ? 'B' : diff <= 20 ? 'C' : 'D');

      if (tEl) tEl.textContent = totalActual + ' (' + paceEntered.length + 'H)';
      if (iEl) iEl.textContent = totalIdeal;
      if (dEl) dEl.textContent = (diff >= 0 ? '+' : '') + diff;
      if (gEl) gEl.textContent = grade;
      // 자동 저장 제거: 저장은 Save 버튼에서만
    }

    window._sg33_pace_record = () => {
      const hSel = document.getElementById('sg33-pace-hole');
      const mIn = document.getElementById('sg33-pace-min');
      if (!hSel || !mIn) return;
      const h = parseInt(hSel.value);
      const m = parseInt(mIn.value);
      if (isNaN(h) || isNaN(m) || m < 1 || m > 60) return;
      const row = data.find(d => d.hole === h);
      if (row) row.actual = m;
      SFX.pace_check();
      draw();
    };
    window._sg33_pace_save = () => { LS('roundPace_v2', data); SFX.pace_fast(); };
    window._sg33_pace_reset = () => { data.forEach(d => { d.actual = null; }); SFX.pace_check(); draw(); };

    setTimeout(draw, 80);
    _checkAchievementsV33('pace_opened');
  }

  // ===============================================================
  // 7. 클럽 세트 최적화 Canvas 620x380
  // ===============================================================
  function openClubSetOptimizer() {
    SFX.set_optimize();
    const allClubs = [
      { name: 'Driver', dist: 250, gap: 0, type: 'wood' },
      { name: '3-Wood', dist: 230, gap: 20, type: 'wood' },
      { name: '5-Wood', dist: 215, gap: 15, type: 'wood' },
      { name: '3-Hybrid', dist: 205, gap: 10, type: 'hybrid' },
      { name: '4-Hybrid', dist: 195, gap: 10, type: 'hybrid' },
      { name: '4-Iron', dist: 190, gap: 5, type: 'iron' },
      { name: '5-Iron', dist: 180, gap: 10, type: 'iron' },
      { name: '6-Iron', dist: 170, gap: 10, type: 'iron' },
      { name: '7-Iron', dist: 160, gap: 10, type: 'iron' },
      { name: '8-Iron', dist: 150, gap: 10, type: 'iron' },
      { name: '9-Iron', dist: 140, gap: 10, type: 'iron' },
      { name: 'PW', dist: 130, gap: 10, type: 'wedge' },
      { name: 'GW(52)', dist: 115, gap: 15, type: 'wedge' },
      { name: 'SW(56)', dist: 95, gap: 20, type: 'wedge' },
      { name: 'LW(60)', dist: 75, gap: 20, type: 'wedge' },
      { name: 'Putter', dist: 0, gap: 0, type: 'putter' }
    ];
    let selected = LS('clubSet') || [0,1,4,6,7,8,9,10,11,12,13,14,15];

    const html = '<canvas id="sg33-clubset-cv" width="620" height="380" style="width:100%;max-width:620px;border-radius:10px;background:#f9f9f9;margin-bottom:10px"></canvas>' +
      '<div style="display:flex;flex-wrap:wrap;gap:4px;margin-bottom:10px">' +
      allClubs.map((c, i) => '<button class="sg33-tab' + (selected.includes(i) ? ' active' : '') + '" data-ci="' + i + '" id="sg33-cs-btn' + i + '">' + c.name + '</button>').join('') + '</div>' +
      '<div class="sg33-grid" style="grid-template-columns:repeat(4,1fr)">' +
      '<div class="sg33-stat"><div class="sg33-stat-val" id="sg33-cs-count">-</div><div class="sg33-stat-label">Clubs (max 14)</div></div>' +
      '<div class="sg33-stat"><div class="sg33-stat-val" id="sg33-cs-maxgap">-</div><div class="sg33-stat-label">Max Gap yd</div></div>' +
      '<div class="sg33-stat"><div class="sg33-stat-val" id="sg33-cs-coverage">-</div><div class="sg33-stat-label">Coverage</div></div>' +
      '<div class="sg33-stat"><div class="sg33-stat-val" id="sg33-cs-grade">-</div><div class="sg33-stat-label">Set Grade</div></div></div>';

    makeOverlay('sg33-clubset', 'linear-gradient(135deg,#4a148c,#7b1fa2)', '&#x1F3CC;&#xFE0F; Club Set Optimizer', html);

    function draw() {
      const cv = document.getElementById('sg33-clubset-cv'); if (!cv) return;
      const ctx = cv.getContext('2d');
      const W = 620, H = 380;
      ctx.clearRect(0, 0, W, H);
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      ctx.fillStyle = isDark ? '#1e1e1e' : '#f9f9f9'; ctx.fillRect(0, 0, W, H);

      ctx.fillStyle = isDark ? '#e0e0e0' : '#333';
      ctx.font = 'bold 14px Segoe UI, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Club Set Distance Coverage (14 Club Max)', W / 2, 22);

      const sel = selected.map(i => allClubs[i]).filter(c => c.dist > 0).sort((a, b) => b.dist - a.dist);
      const ml = 70, mr = 20, mt = 40, mb = 50;
      const cw = W - ml - mr, ch = H - mt - mb;
      const bw = sel.length > 0 ? Math.min(Math.floor(cw / sel.length) - 4, 40) : 30;

      sel.forEach((c, i) => {
        const x = ml + i * (bw + 4);
        const bh = (c.dist / 260) * ch;
        const typeColor = { wood: '#1565c0', hybrid: '#00695c', iron: '#2e7d32', wedge: '#e65100', putter: '#6a1b9a' };
        ctx.fillStyle = typeColor[c.type] || '#666';
        ctx.beginPath();
        const r = 3;
        ctx.moveTo(x + r, mt + ch - bh); ctx.lineTo(x + bw - r, mt + ch - bh);
        ctx.quadraticCurveTo(x + bw, mt + ch - bh, x + bw, mt + ch - bh + r);
        ctx.lineTo(x + bw, mt + ch); ctx.lineTo(x, mt + ch);
        ctx.lineTo(x, mt + ch - bh + r);
        ctx.quadraticCurveTo(x, mt + ch - bh, x + r, mt + ch - bh);
        ctx.fill();

        ctx.fillStyle = '#fff';
        ctx.font = 'bold 9px Segoe UI, sans-serif';
        ctx.textAlign = 'center';
        if (bh > 20) ctx.fillText(c.dist, x + bw / 2, mt + ch - bh + 14);

        ctx.fillStyle = isDark ? '#bbb' : '#555';
        ctx.font = '8px Segoe UI, sans-serif';
        ctx.save();
        ctx.translate(x + bw / 2, mt + ch + 10);
        ctx.rotate(-0.5);
        ctx.fillText(c.name, 0, 0);
        ctx.restore();

        if (i > 0) {
          const gap = sel[i - 1].dist - c.dist;
          const gapColor = gap > 20 ? '#c62828' : gap > 15 ? '#f9a825' : '#2e7d32';
          ctx.fillStyle = gapColor;
          ctx.font = 'bold 8px Segoe UI, sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText(gap + 'yd', x - 2, mt + ch - Math.max(bh, (sel[i - 1].dist / 260) * ch) - 5);

          ctx.strokeStyle = gapColor;
          ctx.lineWidth = 1;
          ctx.setLineDash([2, 2]);
          ctx.beginPath();
          ctx.moveTo(x - 2, mt + ch - bh);
          ctx.lineTo(x - 2, mt + ch - (sel[i - 1].dist / 260) * ch);
          ctx.stroke();
          ctx.setLineDash([]);
        }
      });

      const gaps = [];
      for (let i = 1; i < sel.length; i++) gaps.push(sel[i - 1].dist - sel[i].dist);
      const maxGap = gaps.length > 0 ? Math.max(...gaps) : 0;
      const coverage = sel.length > 0 ? sel[0].dist - (sel[sel.length - 1]?.dist || 0) : 0;
      const grade = selected.length > 14 ? 'Over!' : maxGap <= 12 ? 'S' : maxGap <= 15 ? 'A' : maxGap <= 20 ? 'B' : maxGap <= 25 ? 'C' : 'D';

      document.getElementById('sg33-cs-count').textContent = selected.length;
      document.getElementById('sg33-cs-count').style.color = selected.length > 14 ? '#c62828' : 'var(--primary, #1a7a3a)';
      document.getElementById('sg33-cs-maxgap').textContent = maxGap;
      document.getElementById('sg33-cs-coverage').textContent = coverage + 'yd';
      document.getElementById('sg33-cs-grade').textContent = grade;
      LS('clubSet', selected);
    }

    document.querySelectorAll('[data-ci]').forEach(btn => {
      btn.addEventListener('click', () => {
        const ci = parseInt(btn.dataset.ci);
        if (selected.includes(ci)) {
          selected = selected.filter(x => x !== ci);
          btn.classList.remove('active');
        } else {
          if (selected.length < 14) {
            selected.push(ci);
            btn.classList.add('active');
          }
        }
        SFX.set_optimize(); draw();
      });
    });

    setTimeout(draw, 80);
    _checkAchievementsV33('clubset_opened');
  }

  // ===============================================================
  // 8. 라운드 리듬 분석기 Canvas 580x360
  // ===============================================================
  function openRoundRhythmAnalyzer() {
    SFX.rhythm_beat();
    // score는 사용자가 입력할 때만 채워진다. par는 코스 기준값(고정 참고치).
    const rhPar = i => (i < 4 ? 4 : i === 4 ? 3 : i < 8 ? 4 : i === 8 ? 5 : i < 13 ? 4 : i === 13 ? 3 : i < 17 ? 4 : 5);
    let data = LS('roundRhythm_v2') || Array.from({ length: 18 }, (_, i) => ({
      hole: i + 1,
      score: null,
      par: rhPar(i)
    }));

    let rhHoleOpts = '';
    for (let i = 1; i <= 18; i++) rhHoleOpts += '<option value="' + i + '">' + i + 'H</option>';

    const html = '<canvas id="sg33-rhythm-cv" width="580" height="360" style="width:100%;max-width:580px;border-radius:10px;background:#f9f9f9;margin-bottom:10px"></canvas>' +
      '<div class="sg33-row" style="justify-content:center;gap:6px;flex-wrap:wrap">' +
      '<span class="sg33-label">Hole</span><select id="sg33-rh-hole" style="padding:4px 8px;border-radius:6px;border:1px solid var(--border,#ddd)">' + rhHoleOpts + '</select>' +
      '<span class="sg33-label">Score</span><input type="number" id="sg33-rh-score" min="1" max="12" step="1" placeholder="-" style="width:70px;padding:4px 8px;border-radius:6px;border:1px solid var(--border,#ddd)">' +
      '<button class="sg33-btn sg33-btn-primary" onclick="window._sg33_rh_record()">&#x2795; Record</button></div>' +
      '<div class="sg33-row" style="justify-content:center;gap:6px;margin-top:6px">' +
      '<button class="sg33-btn sg33-btn-outline" onclick="window._sg33_rh_save()">&#x1F4BE; Save</button>' +
      '<button class="sg33-btn sg33-btn-outline" onclick="window._sg33_rh_reset()">Reset</button></div>' +
      '<div class="sg33-grid" style="grid-template-columns:repeat(4,1fr);margin-top:10px">' +
      '<div class="sg33-stat"><div class="sg33-stat-val" id="sg33-rh-front">-</div><div class="sg33-stat-label">Front 9</div></div>' +
      '<div class="sg33-stat"><div class="sg33-stat-val" id="sg33-rh-back">-</div><div class="sg33-stat-label">Back 9</div></div>' +
      '<div class="sg33-stat"><div class="sg33-stat-val" id="sg33-rh-variance">-</div><div class="sg33-stat-label">Variance</div></div>' +
      '<div class="sg33-stat"><div class="sg33-stat-val" id="sg33-rh-rhythm">-</div><div class="sg33-stat-label">Rhythm Grade</div></div></div>';

    makeOverlay('sg33-rhythm', 'linear-gradient(135deg,#ad1457,#ec407a)', '&#x1F3B5; Round Rhythm Analyzer', html);

    function draw() {
      const cv = document.getElementById('sg33-rhythm-cv'); if (!cv) return;
      const ctx = cv.getContext('2d');
      const W = 580, H = 360;
      ctx.clearRect(0, 0, W, H);
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      ctx.fillStyle = isDark ? '#1e1e1e' : '#f9f9f9'; ctx.fillRect(0, 0, W, H);

      ctx.fillStyle = isDark ? '#e0e0e0' : '#333';
      ctx.font = 'bold 14px Segoe UI, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Round Rhythm Analysis (Score to Par)', W / 2, 22);

      const ml = 45, mr = 20, mt = 40, mb = 50;
      const cw = W - ml - mr, ch = H - mt - mb;
      const midY = mt + ch / 2;

      [-3, -2, -1, 0, 1, 2, 3].forEach(v => {
        const y = midY - v * (ch / 6);
        ctx.strokeStyle = v === 0 ? (isDark ? '#666' : '#999') : (isDark ? '#2a2a2a' : '#eee');
        ctx.lineWidth = v === 0 ? 1.5 : 0.5;
        ctx.beginPath(); ctx.moveTo(ml, y); ctx.lineTo(W - mr, y); ctx.stroke();
        ctx.fillStyle = isDark ? '#999' : '#888';
        ctx.font = '9px Segoe UI, sans-serif';
        ctx.textAlign = 'right';
        const labels = { '-3': 'Eagle', '-2': 'Birdie', '-1': 'Birdie', '0': 'Par', '1': 'Bogey', '2': 'Double', '3': 'Triple+' };
        ctx.fillText(labels[v] || '', ml - 5, y + 3);
      });

      ctx.fillStyle = isDark ? 'rgba(46,125,50,0.15)' : 'rgba(46,125,50,0.08)';
      ctx.fillRect(ml, midY - ch / 6, cw, ch / 6);

      ctx.strokeStyle = isDark ? '#444' : '#ddd';
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 4]);
      const splitX = ml + cw / 2;
      ctx.beginPath(); ctx.moveTo(splitX, mt); ctx.lineTo(splitX, mt + ch); ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = isDark ? '#888' : '#aaa';
      ctx.font = '10px Segoe UI, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Front 9', ml + cw / 4, mt + ch + 30);
      ctx.fillText('Back 9', ml + 3 * cw / 4, mt + ch + 30);

      const stepW = cw / 18;
      const hasSc = d => d && typeof d.score === 'number' && !isNaN(d.score);
      const rhEntered = data.filter(hasSc);

      // 홀 번호는 항상 표시
      data.forEach((d, i) => {
        ctx.fillStyle = isDark ? '#ddd' : '#333';
        ctx.font = '8px Segoe UI, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(d.hole, ml + i * stepW + stepW / 2, mt + ch + 14);
      });

      const fEl = document.getElementById('sg33-rh-front');
      const bEl = document.getElementById('sg33-rh-back');
      const vEl = document.getElementById('sg33-rh-variance');
      const gEl = document.getElementById('sg33-rh-rhythm');

      if (!rhEntered.length) {
        ctx.fillStyle = isDark ? '#999' : '#888';
        ctx.font = '13px Segoe UI, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('기록을 추가하면 표시됩니다', W / 2, midY - 10);
        if (fEl) fEl.textContent = '-';
        if (bEl) bEl.textContent = '-';
        if (vEl) vEl.textContent = '-';
        if (gEl) gEl.textContent = '-';
        return;
      }

      const pts = [];
      data.forEach((d, i) => {
        if (!hasSc(d)) return;
        pts.push({ x: ml + i * stepW + stepW / 2, y: midY - (d.score - d.par) * (ch / 6), diff: d.score - d.par });
      });

      if (pts.length >= 2) {
        ctx.fillStyle = isDark ? 'rgba(255,107,53,0.15)' : 'rgba(255,107,53,0.08)';
        ctx.beginPath();
        ctx.moveTo(pts[0].x, midY);
        pts.forEach(p => ctx.lineTo(p.x, p.y));
        ctx.lineTo(pts[pts.length - 1].x, midY);
        ctx.fill();

        ctx.strokeStyle = '#ff6b35';
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        pts.forEach((p, i) => { i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y); });
        ctx.stroke();
      }

      pts.forEach(p => {
        const dotColor = p.diff <= -1 ? '#2e7d32' : p.diff === 0 ? '#1565c0' : p.diff === 1 ? '#f9a825' : '#c62828';
        ctx.fillStyle = dotColor;
        ctx.beginPath(); ctx.arc(p.x, p.y, 4, 0, Math.PI * 2); ctx.fill();
      });

      // 입력된 홀만 집계한다 (기록 없는 홀을 0타로 계산하지 않는다)
      const frontList = data.slice(0, 9).filter(hasSc);
      const backList = data.slice(9).filter(hasSc);
      const front = frontList.reduce((s, d) => s + d.score, 0);
      const back = backList.reduce((s, d) => s + d.score, 0);
      const diffs = rhEntered.map(d => d.score - d.par);
      const mean = diffs.reduce((s, v) => s + v, 0) / diffs.length;
      const variance = Math.round(diffs.reduce((s, v) => s + (v - mean) * (v - mean), 0) / diffs.length * 100) / 100;
      const rhythm = rhEntered.length < 18 ? '-' : (variance <= 0.5 ? 'S' : variance <= 1.0 ? 'A' : variance <= 1.5 ? 'B' : variance <= 2.5 ? 'C' : 'D');

      if (fEl) fEl.textContent = frontList.length ? front + ' (' + frontList.length + 'H)' : '-';
      if (bEl) bEl.textContent = backList.length ? back + ' (' + backList.length + 'H)' : '-';
      if (vEl) vEl.textContent = rhEntered.length >= 2 ? variance : '-';
      if (gEl) gEl.textContent = rhythm;
      // 자동 저장 제거: 저장은 Save 버튼에서만
    }

    window._sg33_rh_record = () => {
      const hSel = document.getElementById('sg33-rh-hole');
      const sIn = document.getElementById('sg33-rh-score');
      if (!hSel || !sIn) return;
      const h = parseInt(hSel.value);
      const s = parseInt(sIn.value);
      if (isNaN(h) || isNaN(s) || s < 1 || s > 12) return;
      const row = data.find(d => d.hole === h);
      if (row) row.score = s;
      SFX.rhythm_beat();
      draw();
    };
    window._sg33_rh_save = () => { LS('roundRhythm_v2', data); SFX.rhythm_beat(); };
    window._sg33_rh_reset = () => { data.forEach(d => { d.score = null; }); SFX.rhythm_beat(); draw(); };

    setTimeout(draw, 80);
    _checkAchievementsV33('rhythm_opened');
  }

  // ===============================================================
  // Golf IQ v17 - 15 Questions
  // ===============================================================
  function openGolfIQv17() {
    SFX.quiz_v17();
    const questions = [
      { q: 'What is the maximum number of clubs allowed in a bag during a round?', o: ['12','14','16','No limit'], a: 1 },
      { q: 'What does &quot;smash factor&quot; measure in golf?', o: ['Spin rate','Ball speed / club speed ratio','Launch angle','Carry distance'], a: 1 },
      { q: 'A golf ball typically has how many dimples?', o: ['200-250','300-350','330-500','500-600'], a: 2 },
      { q: 'What is a &quot;flyer lie&quot; in golf?', o: ['Ball on a tee','Ball in thick rough causing less spin','Ball in a divot','Ball on hardpan'], a: 1 },
      { q: 'What club loft angle typically produces the most backspin?', o: ['Driver (10&deg;)','7-Iron (34&deg;)','Lob Wedge (60&deg;)','3-Wood (15&deg;)'], a: 2 },
      { q: 'In Stableford scoring, how many points for a birdie?', o: ['1','2','3','4'], a: 2 },
      { q: 'What is the average driving distance on the PGA Tour (2024)?', o: ['265 yards','285 yards','299 yards','315 yards'], a: 2 },
      { q: 'What does &quot;MOI&quot; stand for in club design?', o: ['Maximum Output Index','Moment of Inertia','Method of Impact','Margin of Improvement'], a: 1 },
      { q: 'Green speed is measured using which device?', o: ['Anemometer','Stimpmeter','Rangefinder','Accelerometer'], a: 1 },
      { q: 'What is &quot;shaft kick point&quot;?', o: ['Where the shaft bends most','Where you grip','Club head weight','Shaft length'], a: 0 },
      { q: 'A &quot;fried egg&quot; lie refers to what situation?', o: ['Ball in water','Ball plugged in bunker','Ball on cart path','Ball in divot'], a: 1 },
      { q: 'What is the penalty for hitting into a red penalty area?', o: ['1 stroke','2 strokes','Disqualification','No penalty'], a: 0 },
      { q: 'What does &quot;COR&quot; measure on a driver face?', o: ['Coefficient of Restitution','Center of Rotation','Compression of Rubber','Core of Responsiveness'], a: 0 },
      { q: 'What is the ideal launch angle for a driver to maximize distance?', o: ['8-10&deg;','10-14&deg;','15-20&deg;','20-25&deg;'], a: 1 },
      { q: 'In match play, what happens if both players tie a hole?', o: ['Replay the hole','Both get a point','The hole is halved','Higher handicap wins'], a: 2 }
    ];

    let idx = 0, score = 0, answered = Array(questions.length).fill(null);
    let history = LS('iqv17') || [];

    function buildQuiz() {
      const q = questions[idx];
      const html = '<div style="margin-bottom:12px"><span class="sg33-badge sg33-badge-blue">Q' + (idx + 1) + '/' + questions.length + '</span> <span class="sg33-badge sg33-badge-green">Score: ' + score + '</span></div>' +
        '<div style="font-weight:700;font-size:15px;margin-bottom:12px;line-height:1.5">' + q.q + '</div>' +
        '<div style="display:grid;gap:8px">' + q.o.map((o, i) => {
          const isAnswered = answered[idx] !== null;
          const isCorrect = i === q.a;
          const isSelected = answered[idx] === i;
          let style = '';
          if (isAnswered) {
            if (isCorrect) style = 'background:#e8f5e9;border-color:#2e7d32;color:#2e7d32';
            else if (isSelected) style = 'background:#ffebee;border-color:#c62828;color:#c62828';
          }
          return '<button class="sg33-card" style="' + style + '" ' + (isAnswered ? 'disabled' : 'onclick="window._sg33_iq17_ans(' + i + ')"') + '><div class="sg33-card-title">' + String.fromCharCode(65 + i) + '. ' + o + '</div></button>';
        }).join('') + '</div>' +
        '<div class="sg33-row" style="justify-content:center;gap:6px;margin-top:12px">' +
        (idx > 0 ? '<button class="sg33-btn sg33-btn-outline" onclick="window._sg33_iq17_prev()">&larr; Prev</button>' : '') +
        (idx < questions.length - 1 ? '<button class="sg33-btn sg33-btn-primary" onclick="window._sg33_iq17_next()">Next &rarr;</button>' : '') +
        (idx === questions.length - 1 && answered[idx] !== null ? '<button class="sg33-btn sg33-btn-primary" onclick="window._sg33_iq17_result()">Result</button>' : '') +
        '</div>';
      return html;
    }

    function showResult() {
      const pct = Math.round(score / questions.length * 100);
      const grade = pct >= 90 ? 'S' : pct >= 80 ? 'A' : pct >= 70 ? 'B' : pct >= 50 ? 'C' : 'D';
      history.push({ score, total: questions.length, pct, grade, date: new Date().toISOString().slice(0, 10) });
      if (history.length > 20) history = history.slice(-20);
      LS('iqv17', history);

      const html = '<div style="text-align:center;margin-bottom:16px"><div style="font-size:48px;font-weight:900;color:' +
        (grade === 'S' ? '#2e7d32' : grade === 'A' ? '#1565c0' : '#e65100') + '">' + grade + '</div>' +
        '<div style="font-size:24px;font-weight:700">' + score + ' / ' + questions.length + ' (' + pct + '%)</div>' +
        '<div style="font-size:13px;color:var(--text-muted,#666);margin-top:4px">Golf IQ v17</div></div>' +
        '<button class="sg33-btn sg33-btn-primary" onclick="window._sg33_iq17_retry()" style="display:block;margin:0 auto">Retry</button>';
      const body = document.querySelector('#sg33-iq17 .sg33-panel-body');
      if (body) body.innerHTML = html;
      if (grade === 'S') _checkAchievementsV33('iq_v17_s');
      _checkAchievementsV33('iq_v17_clear');
    }

    function render() {
      const body = document.querySelector('#sg33-iq17 .sg33-panel-body');
      if (body) body.innerHTML = buildQuiz();
    }

    window._sg33_iq17_ans = (i) => {
      answered[idx] = i;
      if (i === questions[idx].a) { score++; sfx(784, 0.1, 'triangle'); } else { sfx(220, 0.15, 'sawtooth', 0.08); }
      render();
    };
    window._sg33_iq17_prev = () => { idx = Math.max(0, idx - 1); render(); };
    window._sg33_iq17_next = () => { idx = Math.min(questions.length - 1, idx + 1); render(); };
    window._sg33_iq17_result = () => showResult();
    window._sg33_iq17_retry = () => { idx = 0; score = 0; answered = Array(questions.length).fill(null); render(); };

    makeOverlay('sg33-iq17', 'linear-gradient(135deg,#1565c0,#42a5f5)', '&#x1F9E0; Golf IQ v17', buildQuiz());
    _checkAchievementsV33('iq_v17_opened');
  }

  // ===============================================================
  // ACHIEVEMENTS v33 (+15, 227→242)
  // ===============================================================
  const ACHIEVEMENTS_V33 = [
    { id: 'club_life_opened', name: 'Club Inspector', desc: 'Opened Club Life Tracker' },
    { id: 'difficulty_opened', name: 'Risk Assessor', desc: 'Opened Round Difficulty Predictor' },
    { id: 'training_opened', name: 'Training Planner', desc: 'Opened Training Periodization' },
    { id: 'train_week_done', name: 'Week Warrior', desc: 'Completed a training week' },
    { id: 'trajectory_opened', name: 'Ballistics Expert', desc: 'Opened Shot Trajectory Simulator' },
    { id: 'matrix_opened', name: 'Strategy Master', desc: 'Opened Course Condition Matrix' },
    { id: 'pace_opened', name: 'Pace Controller', desc: 'Opened Round Pace Comparator' },
    { id: 'clubset_opened', name: 'Set Builder', desc: 'Opened Club Set Optimizer' },
    { id: 'rhythm_opened', name: 'Rhythm Analyst', desc: 'Opened Round Rhythm Analyzer' },
    { id: 'iq_v17_opened', name: 'IQ v17 Challenger', desc: 'Started Golf IQ v17' },
    { id: 'iq_v17_clear', name: 'IQ v17 Graduate', desc: 'Completed Golf IQ v17' },
    { id: 'iq_v17_s', name: 'IQ v17 Genius', desc: 'Got S rank on Golf IQ v17' },
    { id: 'multi_v33', name: 'v33 Multi-Tooler', desc: 'Opened 5+ v33 features' },
    { id: 'all_v33', name: 'v33 Explorer', desc: 'Opened all 8 v33 features' },
    { id: 'v33_complete', name: 'v33 Complete', desc: 'Unlocked all v33 achievements' }
  ];

  let _v33_unlocked = LS('achievements_v33') || {};
  let _v33_opened = {};

  function _checkAchievementsV33(trigger) {
    if (_v33_unlocked[trigger]) return;
    const featureIds = ['club_life_opened','difficulty_opened','training_opened','trajectory_opened','matrix_opened','pace_opened','clubset_opened','rhythm_opened'];
    _v33_opened[trigger] = true;

    if (featureIds.includes(trigger)) {
      const openedCount = featureIds.filter(id => _v33_opened[id] || _v33_unlocked[id]).length;
      if (openedCount >= 5 && !_v33_unlocked.multi_v33) {
        _v33_unlocked.multi_v33 = true;
        SFX.achieve_v33();
        _showAchievementToast('v33 Multi-Tooler');
      }
      if (openedCount >= 8 && !_v33_unlocked.all_v33) {
        _v33_unlocked.all_v33 = true;
        SFX.achieve_v33();
        _showAchievementToast('v33 Explorer');
      }
    }

    const ach = ACHIEVEMENTS_V33.find(a => a.id === trigger);
    if (ach && !_v33_unlocked[trigger]) {
      _v33_unlocked[trigger] = true;
      SFX.achieve_v33();
      _showAchievementToast(ach.name);
    }

    const total = ACHIEVEMENTS_V33.filter(a => _v33_unlocked[a.id]).length;
    if (total >= ACHIEVEMENTS_V33.length && !_v33_unlocked.v33_complete) {
      _v33_unlocked.v33_complete = true;
      SFX.achieve_v33();
      _showAchievementToast('v33 Complete!');
    }

    LS('achievements_v33', _v33_unlocked);
  }

  function _showAchievementToast(name) {
    const toast = document.createElement('div');
    toast.style.cssText = 'position:fixed;top:20px;right:20px;z-index:99999;background:linear-gradient(135deg,#ff6b35,#ff9800);color:#fff;padding:12px 20px;border-radius:12px;font-size:13px;font-weight:700;box-shadow:0 4px 20px rgba(0,0,0,.3);animation:sg33SlideUp .3s;display:flex;align-items:center;gap:8px';
    toast.innerHTML = '&#x1F3C6; Achievement: ' + name;
    document.body.appendChild(toast);
    setTimeout(() => { toast.style.opacity = '0'; toast.style.transition = 'opacity .5s'; setTimeout(() => toast.remove(), 500); }, 3000);
  }

  // ===============================================================
  // NAVIGATION - append to existing bar
  // ===============================================================
  const navItems = [
    { icon: '&#x1F527;', label: 'ClubLife', fn: openClubLifeTracker },
    { icon: '&#x1F4CA;', label: 'Difficulty', fn: openRoundDifficultyPredictor },
    { icon: '&#x1F3CB;&#xFE0F;', label: 'Training', fn: openTrainingPeriodization },
    { icon: '&#x1F680;', label: 'Trajectory', fn: openShotTrajectorySimulator },
    { icon: '&#x1F9E9;', label: 'Strategy', fn: openCourseConditionMatrix },
    { icon: '&#x23F1;&#xFE0F;', label: 'Pace', fn: openRoundPaceComparator },
    { icon: '&#x1F3CC;&#xFE0F;', label: 'ClubSet', fn: openClubSetOptimizer },
    { icon: '&#x1F3B5;', label: 'Rhythm', fn: openRoundRhythmAnalyzer },
    { icon: '&#x1F9E0;', label: 'IQ v17', fn: openGolfIQv17 }
  ];

  const existingBar = document.querySelector('.sg30-bottom-bar') || document.querySelector('[class*="bottom-bar"]');
  if (existingBar) {
    navItems.forEach(item => {
      const btn = document.createElement('button');
      btn.className = existingBar.querySelector('button') ? existingBar.querySelector('button').className : 'sg30-bbtn';
      btn.innerHTML = '<span class="' + (existingBar.querySelector('.sg30-bbtn-icon') ? 'sg30-bbtn-icon' : 'sg33-bbtn-icon') + '">' + item.icon + '</span><span class="' + (existingBar.querySelector('.sg30-bbtn-label') ? 'sg30-bbtn-label' : 'sg33-bbtn-label') + '">' + item.label + '</span>';
      btn.onclick = item.fn;
      existingBar.appendChild(btn);
    });
  }

  // ========== KEYBOARD SHORTCUTS ==========
  document.addEventListener('keydown', e => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'SELECT') return;
    if (!e.shiftKey) return;
    const map = { Q: openClubLifeTracker, W: openRoundDifficultyPredictor, E: openTrainingPeriodization, R: openShotTrajectorySimulator, T: openCourseConditionMatrix, Y: openRoundPaceComparator, U: openClubSetOptimizer, I: openRoundRhythmAnalyzer };
    if (map[e.key]) { e.preventDefault(); map[e.key](); }
  });

  // ========== ESC to close ==========
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.sg33-overlay.active').forEach(ov => ov.classList.remove('active'));
    }
  });

})();
