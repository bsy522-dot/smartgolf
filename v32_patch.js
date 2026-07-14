/* ====================================================================
 * SmartGolf v32.0 patch
 * 클럽퍼포먼스히트맵Canvas14x6_620x400 + 라운드비용최적화Canvas580x360
 * + 스윙템포메트로놈Canvas580x340 + 핸디캡코스매칭Canvas600x380
 * + 퍼팅성공확률계산기Canvas560x340 + 연습스트릭캘린더Canvas580x360
 * + 골프바디밸런스6축RadarCanvas560x360 + 나만의코스레시피Canvas600x380
 * + Golf IQ v16 15문항 + 업적+15(212→227) + SFX12종(214→226) + 키보드8종
 * ==================================================================== */
(function () {
  'use strict';

  const LS = (k, v) => v === undefined ? JSON.parse(localStorage.getItem('sg32_' + k) || 'null') : localStorage.setItem('sg32_' + k, JSON.stringify(v));

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
    club_perf: () => { sfx(440, 0.1); sfx(554, 0.12); },
    cost_open: () => { sfx(349, 0.12); sfx(440, 0.1); },
    cost_calc: () => { sfx(523, 0.08); sfx(659, 0.1); sfx(784, 0.12); },
    tempo_tap: () => { sfx(880, 0.06, 'triangle'); },
    tempo_good: () => { sfx(523, 0.1); sfx(659, 0.1); sfx(784, 0.12); },
    hcp_match: () => { sfx(392, 0.12); sfx(494, 0.1); },
    putt_calc: () => { sfx(466, 0.12); sfx(587, 0.1); },
    putt_hole: () => { sfx(784, 0.08); sfx(1047, 0.1); sfx(1319, 0.15, 'triangle'); },
    streak_log: () => { sfx(494, 0.08); sfx(622, 0.1); },
    body_scan: () => { sfx(294, 0.1); sfx(370, 0.12); },
    course_design: () => { sfx(415, 0.12); sfx(523, 0.1); },
    quiz_v16: () => { sfx(587, 0.1); sfx(740, 0.12); },
    achieve_v32: () => { sfx(523, 0.06); sfx(659, 0.06); sfx(784, 0.06); sfx(1047, 0.06); sfx(1319, 0.2, 'triangle'); }
  };

  // ========== CSS ==========
  const css = `
.sg32-overlay{display:none;position:fixed;top:0;left:0;right:0;bottom:0;z-index:10020;background:rgba(0,0,0,.55);overflow-y:auto;padding:20px;animation:sg32FadeIn .25s}
.sg32-overlay.active{display:flex;align-items:flex-start;justify-content:center}
@keyframes sg32FadeIn{from{opacity:0}to{opacity:1}}
.sg32-panel{background:var(--card-bg,#fff);border-radius:16px;max-width:700px;width:100%;margin:30px auto;box-shadow:0 8px 40px rgba(0,0,0,.3);overflow:hidden;animation:sg32SlideUp .3s}
@keyframes sg32SlideUp{from{transform:translateY(30px);opacity:0}to{transform:translateY(0);opacity:1}}
.sg32-panel-head{padding:16px 20px;color:#fff;display:flex;align-items:center;justify-content:space-between}
.sg32-panel-head h3{font-size:16px;font-weight:700;display:flex;align-items:center;gap:8px}
.sg32-panel-close{background:rgba(255,255,255,.25);border:none;color:#fff;width:30px;height:30px;border-radius:50%;cursor:pointer;font-size:16px;font-family:inherit}
.sg32-panel-body{padding:16px 20px;max-height:70vh;overflow-y:auto}
.sg32-card{background:var(--bg,#f5f7f5);border-radius:12px;padding:14px;margin-bottom:10px;border:1px solid var(--border,#e0e0e0);cursor:pointer;transition:all .2s}
.sg32-card:hover{box-shadow:0 2px 12px rgba(0,0,0,.1);transform:translateY(-1px)}
.sg32-card-title{font-weight:700;font-size:14px;color:var(--text,#1a1a1a);margin-bottom:4px;display:flex;align-items:center;gap:6px}
.sg32-card-desc{font-size:12px;color:var(--text-muted,#666);line-height:1.5}
.sg32-badge{display:inline-block;padding:2px 8px;border-radius:10px;font-size:10px;font-weight:700}
.sg32-badge-purple{background:#ede7f6;color:#6a1b9a}
.sg32-badge-green{background:#e8f5e9;color:#2e7d32}
.sg32-badge-blue{background:#e3f2fd;color:#1565c0}
.sg32-badge-orange{background:#fff3e0;color:#e65100}
.sg32-badge-red{background:#ffebee;color:#c62828}
.sg32-badge-teal{background:#e0f2f1;color:#00695c}
.sg32-badge-pink{background:#fce4ec;color:#ad1457}
.sg32-badge-amber{background:#fff8e1;color:#ff6f00}
.sg32-tabs{display:flex;gap:4px;margin-bottom:12px;flex-wrap:wrap}
.sg32-tab{padding:6px 14px;border-radius:20px;border:1px solid var(--border,#e0e0e0);background:var(--bg,#f5f7f5);font-size:12px;cursor:pointer;font-weight:600;color:var(--text-muted,#666);transition:all .2s;font-family:inherit}
.sg32-tab.active{background:var(--primary,#1a7a3a);color:#fff;border-color:var(--primary,#1a7a3a)}
.sg32-row{display:flex;gap:8px;margin-bottom:8px;flex-wrap:wrap;align-items:center}
.sg32-label{font-size:12px;font-weight:600;color:var(--text-muted,#666);min-width:80px}
.sg32-val{font-size:14px;font-weight:700;color:var(--text,#1a1a1a)}
.sg32-slider{flex:1;min-width:120px;accent-color:var(--primary,#1a7a3a)}
.sg32-btn{padding:8px 16px;border-radius:10px;border:none;font-size:13px;font-weight:700;cursor:pointer;transition:all .2s;font-family:inherit}
.sg32-btn-primary{background:var(--primary,#1a7a3a);color:#fff}
.sg32-btn-primary:hover{opacity:.85}
.sg32-btn-outline{background:transparent;border:1px solid var(--border,#e0e0e0);color:var(--text,#1a1a1a)}
.sg32-grid{display:grid;gap:8px;margin-bottom:12px}
.sg32-grid-2{grid-template-columns:1fr 1fr}
.sg32-grid-3{grid-template-columns:1fr 1fr 1fr}
.sg32-grid-4{grid-template-columns:1fr 1fr 1fr 1fr}
.sg32-stat{text-align:center;background:var(--bg,#f5f7f5);border-radius:10px;padding:10px 6px;border:1px solid var(--border,#e0e0e0)}
.sg32-stat-num{font-size:20px;font-weight:800;color:var(--primary,#1a7a3a)}
.sg32-stat-label{font-size:10px;color:var(--text-muted,#666);margin-top:2px}
.sg32-input{width:100%;padding:8px 12px;border:2px solid var(--border,#e0e0e0);border-radius:8px;font-size:13px;font-family:inherit;background:var(--card-bg,#fff);color:var(--text,#1a1a1a)}
.sg32-input:focus{border-color:var(--primary,#1a7a3a);outline:none}
.sg32-select{padding:8px 12px;border:2px solid var(--border,#e0e0e0);border-radius:8px;font-size:13px;font-family:inherit;background:var(--card-bg,#fff);color:var(--text,#1a1a1a)}
@media(max-width:600px){
  .sg32-grid-3{grid-template-columns:1fr 1fr}
  .sg32-grid-4{grid-template-columns:1fr 1fr}
  .sg32-panel{margin:10px auto;border-radius:12px}
  .sg32-panel-body{padding:12px 14px}
}
[data-theme="dark"] .sg32-badge-purple{background:#2a1a3a;color:#ce93d8}
[data-theme="dark"] .sg32-badge-green{background:#1a3a25;color:#81c784}
[data-theme="dark"] .sg32-badge-blue{background:#1a2a3a;color:#64b5f6}
[data-theme="dark"] .sg32-badge-orange{background:#3a2a1a;color:#ffb74d}
[data-theme="dark"] .sg32-badge-red{background:#3a1a1a;color:#e57373}
[data-theme="dark"] .sg32-badge-teal{background:#1a3a3a;color:#4db6ac}
[data-theme="dark"] .sg32-badge-pink{background:#3a1a2a;color:#f48fb1}
[data-theme="dark"] .sg32-badge-amber{background:#3a3a1a;color:#ffd54f}
`;
  const styleEl = document.createElement('style');
  styleEl.textContent = css;
  document.head.appendChild(styleEl);

  function createOverlay(id, headBg, title, bodyHTML) {
    let ov = document.getElementById(id);
    if (ov) { ov.classList.add('active'); return ov; }
    ov = document.createElement('div');
    ov.id = id;
    ov.className = 'sg32-overlay';
    ov.innerHTML = '<div class="sg32-panel"><div class="sg32-panel-head" style="background:' + headBg + '"><h3>' + title + '</h3><button class="sg32-panel-close" onclick="this.closest(\'.sg32-overlay\').classList.remove(\'active\')">&times;</button></div><div class="sg32-panel-body">' + bodyHTML + '</div></div>';
    ov.addEventListener('click', e => { if (e.target === ov) ov.classList.remove('active'); });
    document.body.appendChild(ov);
    ov.classList.add('active');
    return ov;
  }

  // ===================================================================
  // 1. CLUB PERFORMANCE HEATMAP - 14클럽 x 6성능지표 히트맵 Canvas 620x400
  // ===================================================================
  function openClubPerfHeatmap() {
    SFX.club_perf();
    const clubs = ['DR','3W','5W','3H','4I','5I','6I','7I','8I','9I','PW','AW','SW','LW'];
    const metrics = ['Distance','Accuracy','Consistency','Trajectory','Spin','Feel'];
    const saved = LS('clubperf') || {};

    let html = '<p style="font-size:12px;color:var(--text-muted);margin-bottom:12px">14개 클럽 x 6성능 지표를 1~10점으로 평가. 셀 클릭으로 점수 조정.</p>';
    html += '<canvas id="sg32-clubperf-cv" width="620" height="400" style="width:100%;border-radius:10px;background:var(--bg,#f5f7f5);border:1px solid var(--border,#e0e0e0)"></canvas>';
    html += '<div class="sg32-row" style="margin-top:10px;justify-content:space-between"><button class="sg32-btn sg32-btn-primary" id="sg32-clubperf-rand">&#x1F3B2; Random Data</button><button class="sg32-btn sg32-btn-outline" id="sg32-clubperf-reset">&#x1F504; Reset</button></div>';
    html += '<div class="sg32-grid sg32-grid-3" style="margin-top:10px" id="sg32-clubperf-stats"></div>';

    const ov = createOverlay('sg32-clubperf', 'linear-gradient(135deg,#1565c0,#0d47a1)', '&#x1F3AF; Club Performance Heatmap', html);

    const data = {};
    clubs.forEach(c => {
      data[c] = saved[c] || {};
      metrics.forEach(m => {
        if (!data[c][m]) data[c][m] = 5;
      });
    });

    function draw() {
      const cv = document.getElementById('sg32-clubperf-cv');
      if (!cv) return;
      const ctx = cv.getContext('2d');
      const W = cv.width, H = cv.height;
      ctx.clearRect(0, 0, W, H);

      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      const textColor = isDark ? '#e0e0e0' : '#1a1a1a';
      const mutedColor = isDark ? '#999' : '#666';

      const padL = 55, padT = 40, padR = 20, padB = 30;
      const cellW = (W - padL - padR) / clubs.length;
      const cellH = (H - padT - padB) / metrics.length;

      ctx.font = 'bold 11px sans-serif';
      ctx.fillStyle = textColor;
      ctx.textAlign = 'center';
      clubs.forEach((c, i) => {
        ctx.fillText(c, padL + i * cellW + cellW / 2, padT - 10);
      });

      ctx.textAlign = 'right';
      metrics.forEach((m, j) => {
        ctx.fillText(m, padL - 6, padT + j * cellH + cellH / 2 + 4);
      });

      clubs.forEach((c, i) => {
        metrics.forEach((m, j) => {
          const val = data[c][m];
          const ratio = (val - 1) / 9;
          const r = Math.round(255 * (1 - ratio) * 0.8 + 40);
          const g = Math.round(200 * ratio + 55);
          const b = Math.round(100 * (1 - Math.abs(ratio - 0.5) * 2) + 30);
          ctx.fillStyle = 'rgb(' + r + ',' + g + ',' + b + ')';
          const x = padL + i * cellW + 2;
          const y = padT + j * cellH + 2;
          ctx.beginPath();
          ctx.roundRect(x, y, cellW - 4, cellH - 4, 4);
          ctx.fill();
          ctx.fillStyle = ratio > 0.5 ? '#fff' : '#1a1a1a';
          ctx.font = 'bold 13px sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText(val, padL + i * cellW + cellW / 2, padT + j * cellH + cellH / 2 + 5);
        });
      });

      ctx.fillStyle = mutedColor;
      ctx.font = '10px sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText('1=Low', padL, H - 6);
      ctx.textAlign = 'right';
      ctx.fillText('10=High', W - padR, H - 6);

      const statsEl = document.getElementById('sg32-clubperf-stats');
      if (statsEl) {
        let bestClub = '', bestAvg = 0;
        let worstClub = '', worstAvg = 10;
        clubs.forEach(c => {
          const avg = metrics.reduce((s, m) => s + data[c][m], 0) / metrics.length;
          if (avg > bestAvg) { bestAvg = avg; bestClub = c; }
          if (avg < worstAvg) { worstAvg = avg; worstClub = c; }
        });
        const totalAvg = (clubs.reduce((s, c) => s + metrics.reduce((ss, m) => ss + data[c][m], 0), 0) / (clubs.length * metrics.length)).toFixed(1);
        statsEl.innerHTML = '<div class="sg32-stat"><div class="sg32-stat-num">' + bestClub + '</div><div class="sg32-stat-label">Best Club (' + bestAvg.toFixed(1) + ')</div></div>' +
          '<div class="sg32-stat"><div class="sg32-stat-num">' + worstClub + '</div><div class="sg32-stat-label">Weakest (' + worstAvg.toFixed(1) + ')</div></div>' +
          '<div class="sg32-stat"><div class="sg32-stat-num">' + totalAvg + '</div><div class="sg32-stat-label">Overall Avg</div></div>';
      }
      LS('clubperf', data);
    }

    setTimeout(() => {
      draw();
      const cv = document.getElementById('sg32-clubperf-cv');
      if (cv) {
        cv.addEventListener('click', e => {
          const rect = cv.getBoundingClientRect();
          const sx = (e.clientX - rect.left) * (cv.width / rect.width);
          const sy = (e.clientY - rect.top) * (cv.height / rect.height);
          const padL = 55, padT = 40, padR = 20, padB = 30;
          const cellW = (cv.width - padL - padR) / clubs.length;
          const cellH = (cv.height - padT - padB) / metrics.length;
          const ci = Math.floor((sx - padL) / cellW);
          const mi = Math.floor((sy - padT) / cellH);
          if (ci >= 0 && ci < clubs.length && mi >= 0 && mi < metrics.length) {
            const c = clubs[ci], m = metrics[mi];
            data[c][m] = data[c][m] >= 10 ? 1 : data[c][m] + 1;
            SFX.club_perf();
            draw();
          }
        });
      }
      const randBtn = document.getElementById('sg32-clubperf-rand');
      if (randBtn) randBtn.onclick = () => {
        clubs.forEach(c => metrics.forEach(m => { data[c][m] = Math.floor(Math.random() * 10) + 1; }));
        SFX.club_perf();
        draw();
      };
      const resetBtn = document.getElementById('sg32-clubperf-reset');
      if (resetBtn) resetBtn.onclick = () => {
        clubs.forEach(c => metrics.forEach(m => { data[c][m] = 5; }));
        draw();
      };
    }, 100);
    checkAchievements('clubperf');
  }

  // ===================================================================
  // 2. ROUND COST OPTIMIZER - 라운드 비용 최적화 Canvas 580x360
  // ===================================================================
  function openRoundCostOptimizer() {
    SFX.cost_open();
    const categories = ['Green Fee', 'Cart', 'Caddie', 'Food &amp; Drink', 'Equipment', 'Other'];
    const catColors = ['#2196f3','#4caf50','#ff9800','#e91e63','#9c27b0','#607d8b'];
    let rounds = LS('roundcosts') || [];

    let html = '<p style="font-size:12px;color:var(--text-muted);margin-bottom:12px">라운드별 비용을 기록하고 최적화 포인트를 분석합니다.</p>';
    html += '<div class="sg32-grid sg32-grid-3" style="margin-bottom:10px">';
    categories.forEach((c, i) => {
      html += '<div><label class="sg32-label">' + c + '</label><input type="number" class="sg32-input sg32-cost-input" data-cat="' + i + '" placeholder="0" min="0" style="margin-top:4px"></div>';
    });
    html += '</div>';
    html += '<div class="sg32-row"><input type="text" class="sg32-input" id="sg32-cost-course" placeholder="Course name" style="flex:1"><button class="sg32-btn sg32-btn-primary" id="sg32-cost-add">&#x2795; Add Round</button></div>';
    html += '<canvas id="sg32-cost-cv" width="580" height="360" style="width:100%;border-radius:10px;background:var(--bg,#f5f7f5);border:1px solid var(--border,#e0e0e0);margin-top:10px"></canvas>';
    html += '<div class="sg32-grid sg32-grid-3" style="margin-top:10px" id="sg32-cost-stats"></div>';
    html += '<div id="sg32-cost-tip" style="margin-top:10px;font-size:12px;color:var(--text-muted);background:var(--bg,#f5f7f5);padding:10px;border-radius:8px;border:1px solid var(--border)"></div>';

    const ov = createOverlay('sg32-roundcost', 'linear-gradient(135deg,#e65100,#bf360c)', '&#x1F4B0; Round Cost Optimizer', html);

    function drawCost() {
      const cv = document.getElementById('sg32-cost-cv');
      if (!cv) return;
      const ctx = cv.getContext('2d');
      const W = cv.width, H = cv.height;
      ctx.clearRect(0, 0, W, H);

      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      const textColor = isDark ? '#e0e0e0' : '#1a1a1a';

      if (rounds.length === 0) {
        ctx.fillStyle = isDark ? '#666' : '#999';
        ctx.font = '14px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('Add rounds to see cost analysis', W / 2, H / 2);
        return;
      }

      const cx = 150, cy = H / 2, radius = 100;
      const totals = categories.map((_, i) => rounds.reduce((s, r) => s + (r.costs[i] || 0), 0));
      const grandTotal = totals.reduce((a, b) => a + b, 0);
      if (grandTotal === 0) return;

      let angle = -Math.PI / 2;
      categories.forEach((c, i) => {
        if (totals[i] === 0) return;
        const slice = (totals[i] / grandTotal) * Math.PI * 2;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.arc(cx, cy, radius, angle, angle + slice);
        ctx.closePath();
        ctx.fillStyle = catColors[i];
        ctx.fill();
        const midAngle = angle + slice / 2;
        const lx = cx + Math.cos(midAngle) * (radius * 0.65);
        const ly = cy + Math.sin(midAngle) * (radius * 0.65);
        const pct = ((totals[i] / grandTotal) * 100).toFixed(0);
        if (parseInt(pct) > 5) {
          ctx.fillStyle = '#fff';
          ctx.font = 'bold 11px sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText(pct + '%', lx, ly + 4);
        }
        angle += slice;
      });

      ctx.beginPath();
      ctx.arc(cx, cy, 35, 0, Math.PI * 2);
      ctx.fillStyle = isDark ? '#1e1e1e' : '#fff';
      ctx.fill();
      ctx.fillStyle = textColor;
      ctx.font = 'bold 12px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Total', cx, cy - 6);
      ctx.font = 'bold 14px sans-serif';
      ctx.fillText((grandTotal / 10000).toFixed(1) + '&#xB9CC;', cx, cy + 12);

      const barX = 310, barW = W - barX - 30;
      const barH = 22, gap = 6;
      ctx.font = '11px sans-serif';
      categories.forEach((c, i) => {
        const y = 30 + i * (barH + gap + 16);
        ctx.fillStyle = textColor;
        ctx.textAlign = 'left';
        ctx.fillText(c.replace('&amp;', '&'), barX, y - 4);
        ctx.fillStyle = isDark ? '#333' : '#eee';
        ctx.beginPath();
        ctx.roundRect(barX, y, barW, barH, 4);
        ctx.fill();
        const w = grandTotal > 0 ? (totals[i] / grandTotal) * barW : 0;
        ctx.fillStyle = catColors[i];
        ctx.beginPath();
        ctx.roundRect(barX, y, Math.max(w, 2), barH, 4);
        ctx.fill();
        ctx.fillStyle = textColor;
        ctx.textAlign = 'right';
        ctx.fillText((totals[i] / 10000).toFixed(1) + '&#xB9CC;', W - 30, y + 15);
      });

      ctx.fillStyle = textColor;
      ctx.font = 'bold 12px sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText('Last ' + rounds.length + ' rounds', barX, H - 20);
      ctx.textAlign = 'right';
      ctx.fillText('Avg: ' + (grandTotal / rounds.length / 10000).toFixed(1) + '&#xB9CC;/round', W - 30, H - 20);

      const statsEl = document.getElementById('sg32-cost-stats');
      if (statsEl) {
        const avgPerRound = (grandTotal / rounds.length).toFixed(0);
        const maxIdx = totals.indexOf(Math.max(...totals));
        statsEl.innerHTML = '<div class="sg32-stat"><div class="sg32-stat-num">' + rounds.length + '</div><div class="sg32-stat-label">Total Rounds</div></div>' +
          '<div class="sg32-stat"><div class="sg32-stat-num">' + (parseInt(avgPerRound) / 10000).toFixed(1) + '&#xB9CC;</div><div class="sg32-stat-label">Avg Cost</div></div>' +
          '<div class="sg32-stat"><div class="sg32-stat-num">' + categories[maxIdx].replace('&amp;', '&') + '</div><div class="sg32-stat-label">Biggest Expense</div></div>';
      }

      const tipEl = document.getElementById('sg32-cost-tip');
      if (tipEl) {
        const maxCat = categories[totals.indexOf(Math.max(...totals))].replace('&amp;', '&');
        const tips = {
          'Green Fee': 'Early bird / twilight tee times can save 30-50% on green fees.',
          'Cart': 'Walking rounds save cart fees and improve fitness.',
          'Caddie': 'Consider self-caddie rounds for practice rounds.',
          'Food & Drink': 'Bring your own snacks and drinks to cut costs.',
          'Equipment': 'Buy previous-season models for 40-60% savings.',
          'Other': 'Bundle bookings for group discounts.'
        };
        tipEl.innerHTML = '&#x1F4A1; <strong>Optimization Tip:</strong> ' + (tips[maxCat] || 'Track more rounds for better insights.');
      }
    }

    setTimeout(() => {
      drawCost();
      const addBtn = document.getElementById('sg32-cost-add');
      if (addBtn) addBtn.onclick = () => {
        const inputs = document.querySelectorAll('.sg32-cost-input');
        const costs = [];
        inputs.forEach(inp => costs.push(parseInt(inp.value) || 0));
        const course = document.getElementById('sg32-cost-course');
        if (costs.every(c => c === 0)) return;
        rounds.push({ course: course ? course.value : '', costs: costs, date: new Date().toISOString().slice(0, 10) });
        if (rounds.length > 30) rounds = rounds.slice(-30);
        LS('roundcosts', rounds);
        SFX.cost_calc();
        inputs.forEach(inp => { inp.value = ''; });
        if (course) course.value = '';
        drawCost();
      };
    }, 100);
    checkAchievements('roundcost');
  }

  // ===================================================================
  // 3. SWING TEMPO METRONOME - 스윙 템포 메트로놈 Canvas 580x340
  // ===================================================================
  function openSwingTempoMetronome() {
    SFX.tempo_tap();
    let taps = [];
    let sessions = LS('temposessions') || [];

    let html = '<p style="font-size:12px;color:var(--text-muted);margin-bottom:12px">Tap the button to measure your swing tempo. Ideal ratio: 3:1 (backswing:downswing).</p>';
    html += '<div class="sg32-grid sg32-grid-2" style="margin-bottom:10px">';
    html += '<button class="sg32-btn sg32-btn-primary" id="sg32-tempo-tap" style="padding:20px;font-size:16px">&#x1F3B5; TAP</button>';
    html += '<button class="sg32-btn sg32-btn-outline" id="sg32-tempo-save">&#x1F4BE; Save Session</button>';
    html += '</div>';
    html += '<div class="sg32-grid sg32-grid-4" id="sg32-tempo-live" style="margin-bottom:10px"></div>';
    html += '<canvas id="sg32-tempo-cv" width="580" height="340" style="width:100%;border-radius:10px;background:var(--bg,#f5f7f5);border:1px solid var(--border,#e0e0e0)"></canvas>';
    html += '<div class="sg32-grid sg32-grid-3" style="margin-top:10px" id="sg32-tempo-stats"></div>';
    html += '<button class="sg32-btn sg32-btn-outline" id="sg32-tempo-reset" style="margin-top:8px;width:100%">&#x1F504; Reset Taps</button>';

    const ov = createOverlay('sg32-swingtemp', 'linear-gradient(135deg,#6a1b9a,#4a148c)', '&#x1F3B6; Swing Tempo Metronome', html);

    function updateLive() {
      const el = document.getElementById('sg32-tempo-live');
      if (!el) return;
      if (taps.length < 2) {
        el.innerHTML = '<div class="sg32-stat" style="grid-column:1/-1"><div class="sg32-stat-num">--</div><div class="sg32-stat-label">Tap at least 2 times</div></div>';
        return;
      }
      const intervals = [];
      for (let i = 1; i < taps.length; i++) intervals.push(taps[i] - taps[i - 1]);
      const avgMs = intervals.reduce((a, b) => a + b, 0) / intervals.length;
      const bpm = Math.round(60000 / avgMs);
      const consistency = intervals.length > 1 ? Math.max(0, 100 - (Math.sqrt(intervals.reduce((s, v) => s + Math.pow(v - avgMs, 2), 0) / intervals.length) / avgMs * 100)).toFixed(0) : 100;
      const ratio = intervals.length >= 2 ? (intervals[0] / intervals[1]).toFixed(1) : '--';
      const grade = parseInt(consistency) >= 90 ? 'S' : parseInt(consistency) >= 75 ? 'A' : parseInt(consistency) >= 60 ? 'B' : parseInt(consistency) >= 45 ? 'C' : 'D';
      el.innerHTML = '<div class="sg32-stat"><div class="sg32-stat-num">' + bpm + '</div><div class="sg32-stat-label">BPM</div></div>' +
        '<div class="sg32-stat"><div class="sg32-stat-num">' + avgMs.toFixed(0) + 'ms</div><div class="sg32-stat-label">Avg Interval</div></div>' +
        '<div class="sg32-stat"><div class="sg32-stat-num">' + consistency + '%</div><div class="sg32-stat-label">Consistency</div></div>' +
        '<div class="sg32-stat"><div class="sg32-stat-num">' + grade + '</div><div class="sg32-stat-label">Grade</div></div>';
    }

    function drawTempo() {
      const cv = document.getElementById('sg32-tempo-cv');
      if (!cv) return;
      const ctx = cv.getContext('2d');
      const W = cv.width, H = cv.height;
      ctx.clearRect(0, 0, W, H);

      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      const textColor = isDark ? '#e0e0e0' : '#1a1a1a';
      const gridColor = isDark ? '#333' : '#e0e0e0';

      if (sessions.length === 0 && taps.length < 2) {
        ctx.fillStyle = isDark ? '#666' : '#999';
        ctx.font = '14px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('Tap to start measuring tempo', W / 2, H / 2);
        return;
      }

      const padL = 50, padT = 30, padR = 20, padB = 40;
      const plotW = W - padL - padR, plotH = H - padT - padB;

      const allBPMs = sessions.map(s => s.bpm);
      if (taps.length >= 2) {
        const intervals = [];
        for (let i = 1; i < taps.length; i++) intervals.push(taps[i] - taps[i - 1]);
        const avgMs = intervals.reduce((a, b) => a + b, 0) / intervals.length;
        allBPMs.push(Math.round(60000 / avgMs));
      }
      if (allBPMs.length === 0) return;

      const maxBPM = Math.max(...allBPMs, 100);
      const minBPM = Math.min(...allBPMs, 40);
      const range = Math.max(maxBPM - minBPM, 20);

      ctx.strokeStyle = gridColor;
      ctx.lineWidth = 0.5;
      for (let i = 0; i <= 4; i++) {
        const y = padT + (plotH / 4) * i;
        ctx.beginPath(); ctx.moveTo(padL, y); ctx.lineTo(W - padR, y); ctx.stroke();
        const val = (maxBPM + 5 - (range + 10) * (i / 4)).toFixed(0);
        ctx.fillStyle = isDark ? '#999' : '#666';
        ctx.font = '10px sans-serif';
        ctx.textAlign = 'right';
        ctx.fillText(val + ' BPM', padL - 6, y + 4);
      }

      ctx.strokeStyle = 'rgba(76,175,80,0.3)';
      ctx.lineWidth = 2;
      ctx.setLineDash([5, 5]);
      const idealBPM = 72;
      const idealY = padT + plotH - ((idealBPM - (minBPM - 5)) / (range + 10)) * plotH;
      ctx.beginPath(); ctx.moveTo(padL, idealY); ctx.lineTo(W - padR, idealY); ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = '#4caf50';
      ctx.font = '10px sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText('Ideal: 72 BPM', padL + 4, idealY - 6);

      if (allBPMs.length > 1) {
        const step = plotW / (allBPMs.length - 1);
        ctx.strokeStyle = '#2196f3';
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        allBPMs.forEach((bpm, i) => {
          const x = padL + i * step;
          const y = padT + plotH - ((bpm - (minBPM - 5)) / (range + 10)) * plotH;
          if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        });
        ctx.stroke();

        allBPMs.forEach((bpm, i) => {
          const x = padL + i * step;
          const y = padT + plotH - ((bpm - (minBPM - 5)) / (range + 10)) * plotH;
          ctx.beginPath();
          ctx.arc(x, y, 4, 0, Math.PI * 2);
          ctx.fillStyle = '#2196f3';
          ctx.fill();
        });
      }

      ctx.fillStyle = textColor;
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Session History', W / 2, H - 8);

      const statsEl = document.getElementById('sg32-tempo-stats');
      if (statsEl && allBPMs.length > 0) {
        const avg = (allBPMs.reduce((a, b) => a + b, 0) / allBPMs.length).toFixed(0);
        const best = Math.min(...allBPMs.filter(b => b >= 60 && b <= 84));
        statsEl.innerHTML = '<div class="sg32-stat"><div class="sg32-stat-num">' + allBPMs.length + '</div><div class="sg32-stat-label">Sessions</div></div>' +
          '<div class="sg32-stat"><div class="sg32-stat-num">' + avg + '</div><div class="sg32-stat-label">Avg BPM</div></div>' +
          '<div class="sg32-stat"><div class="sg32-stat-num">' + (isFinite(best) ? best : '--') + '</div><div class="sg32-stat-label">Best BPM</div></div>';
      }
    }

    setTimeout(() => {
      updateLive();
      drawTempo();
      const tapBtn = document.getElementById('sg32-tempo-tap');
      if (tapBtn) tapBtn.onclick = () => {
        taps.push(Date.now());
        if (taps.length > 20) taps = taps.slice(-20);
        SFX.tempo_tap();
        updateLive();
      };
      const saveBtn = document.getElementById('sg32-tempo-save');
      if (saveBtn) saveBtn.onclick = () => {
        if (taps.length < 2) return;
        const intervals = [];
        for (let i = 1; i < taps.length; i++) intervals.push(taps[i] - taps[i - 1]);
        const avgMs = intervals.reduce((a, b) => a + b, 0) / intervals.length;
        const bpm = Math.round(60000 / avgMs);
        sessions.push({ bpm: bpm, date: new Date().toISOString().slice(0, 10), taps: taps.length });
        if (sessions.length > 30) sessions = sessions.slice(-30);
        LS('temposessions', sessions);
        SFX.tempo_good();
        taps = [];
        updateLive();
        drawTempo();
      };
      const resetBtn = document.getElementById('sg32-tempo-reset');
      if (resetBtn) resetBtn.onclick = () => { taps = []; updateLive(); };
    }, 100);
    checkAchievements('tempo');
  }

  // ===================================================================
  // 4. HANDICAP-COURSE MATCHING - 핸디캡 코스 매칭 Canvas 600x380
  // ===================================================================
  function openHandicapCourseMatch() {
    SFX.hcp_match();
    let html = '<p style="font-size:12px;color:var(--text-muted);margin-bottom:12px">Your handicap determines the ideal course difficulty, tee selection, and strategy.</p>';
    html += '<div class="sg32-row" style="margin-bottom:10px"><span class="sg32-label">Handicap</span><input type="range" class="sg32-slider" id="sg32-hcp-slider" min="0" max="36" value="18"><span class="sg32-val" id="sg32-hcp-val">18</span></div>';
    html += '<canvas id="sg32-hcp-cv" width="600" height="380" style="width:100%;border-radius:10px;background:var(--bg,#f5f7f5);border:1px solid var(--border,#e0e0e0)"></canvas>';
    html += '<div id="sg32-hcp-rec" style="margin-top:10px;font-size:12px;line-height:1.8;color:var(--text);background:var(--bg,#f5f7f5);padding:12px;border-radius:8px;border:1px solid var(--border)"></div>';

    const ov = createOverlay('sg32-hcpmatch', 'linear-gradient(135deg,#00695c,#004d40)', '&#x1F3CC;&#xFE0F; Handicap Course Matching', html);

    function drawHcp(hcp) {
      const cv = document.getElementById('sg32-hcp-cv');
      if (!cv) return;
      const ctx = cv.getContext('2d');
      const W = cv.width, H = cv.height;
      ctx.clearRect(0, 0, W, H);

      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      const textColor = isDark ? '#e0e0e0' : '#1a1a1a';
      const mutedColor = isDark ? '#999' : '#666';

      const tees = [
        { name: 'Championship', color: '#212121', yards: 7200, slope: 140, recHcp: [0, 5] },
        { name: 'Back', color: '#1565c0', yards: 6700, slope: 130, recHcp: [5, 12] },
        { name: 'Middle', color: '#fff', yards: 6200, slope: 120, recHcp: [12, 20], textCol: '#333' },
        { name: 'Senior', color: '#fdd835', yards: 5700, slope: 110, recHcp: [20, 28] },
        { name: 'Forward', color: '#c62828', yards: 5200, slope: 100, recHcp: [28, 36] }
      ];

      const padL = 120, padT = 50, padR = 30, padB = 50;
      const barH = 36, gap = 16;

      ctx.fillStyle = textColor;
      ctx.font = 'bold 14px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Tee Selection Guide (HCP: ' + hcp + ')', W / 2, 28);

      let recTee = tees[tees.length - 1];
      tees.forEach(t => {
        if (hcp >= t.recHcp[0] && hcp <= t.recHcp[1]) recTee = t;
      });

      tees.forEach((t, i) => {
        const y = padT + i * (barH + gap);
        const isRec = (hcp >= t.recHcp[0] && hcp <= t.recHcp[1]);

        ctx.fillStyle = textColor;
        ctx.font = '12px sans-serif';
        ctx.textAlign = 'right';
        ctx.fillText(t.name, padL - 10, y + barH / 2 + 4);

        const maxYards = 7500;
        const barW = (t.yards / maxYards) * (W - padL - padR);

        if (isRec) {
          ctx.shadowColor = 'rgba(76,175,80,0.5)';
          ctx.shadowBlur = 12;
        }
        ctx.fillStyle = t.color;
        ctx.strokeStyle = isRec ? '#4caf50' : (isDark ? '#555' : '#ccc');
        ctx.lineWidth = isRec ? 3 : 1;
        ctx.beginPath();
        ctx.roundRect(padL, y, barW, barH, 6);
        ctx.fill();
        ctx.stroke();
        ctx.shadowBlur = 0;

        ctx.fillStyle = t.textCol || '#fff';
        ctx.font = 'bold 12px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(t.yards + 'yd | Slope ' + t.slope, padL + barW / 2, y + barH / 2 + 4);

        ctx.fillStyle = mutedColor;
        ctx.font = '10px sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText('HCP ' + t.recHcp[0] + '-' + t.recHcp[1], padL + barW + 8, y + barH / 2 + 4);

        if (isRec) {
          ctx.fillStyle = '#4caf50';
          ctx.font = 'bold 10px sans-serif';
          ctx.textAlign = 'left';
          ctx.fillText('&#x2714; RECOMMENDED', padL + barW + 8, y + barH / 2 - 8);
        }
      });

      const strats = [
        { hcpMax: 5, text: 'Aggressive play, attack pins, go for par-5s in two' },
        { hcpMax: 12, text: 'Smart aggression, play center of green, manage risks' },
        { hcpMax: 20, text: 'Conservative strategy, avoid trouble, focus on bogey golf' },
        { hcpMax: 28, text: 'Course management priority, layup on par-5s, aim for double-bogey avoidance' },
        { hcpMax: 36, text: 'Enjoy the round, focus on contact, keep the ball in play' }
      ];
      const strat = strats.find(s => hcp <= s.hcpMax) || strats[strats.length - 1];
      ctx.fillStyle = textColor;
      ctx.font = '12px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Strategy: ' + strat.text, W / 2, H - 15);

      const recEl = document.getElementById('sg32-hcp-rec');
      if (recEl) {
        const expectedScore = 72 + hcp;
        const targetPutts = Math.round(30 + hcp * 0.2);
        const targetFIR = Math.max(20, 70 - hcp * 1.5).toFixed(0);
        const targetGIR = Math.max(5, 50 - hcp * 1.5).toFixed(0);
        recEl.innerHTML = '&#x1F3AF; <strong>Recommended Tee:</strong> ' + recTee.name + ' (' + recTee.yards + 'yd)<br>' +
          '&#x1F4CA; <strong>Expected Score:</strong> ' + expectedScore + ' (Par 72 + HCP ' + hcp + ')<br>' +
          '&#x26F3; <strong>Target Putts:</strong> ' + targetPutts + ' per round<br>' +
          '&#x1F3CC;&#xFE0F; <strong>Target FIR:</strong> ' + targetFIR + '% | <strong>GIR:</strong> ' + targetGIR + '%';
      }
    }

    setTimeout(() => {
      drawHcp(18);
      const slider = document.getElementById('sg32-hcp-slider');
      const valEl = document.getElementById('sg32-hcp-val');
      if (slider) slider.oninput = () => {
        const v = parseInt(slider.value);
        if (valEl) valEl.textContent = v;
        SFX.hcp_match();
        drawHcp(v);
      };
    }, 100);
    checkAchievements('hcpmatch');
  }

  // ===================================================================
  // 5. PUTTING SUCCESS PROBABILITY CALCULATOR - 퍼팅 성공 확률 Canvas 560x340
  // ===================================================================
  function openPuttingProbCalc() {
    SFX.putt_calc();
    let html = '<p style="font-size:12px;color:var(--text-muted);margin-bottom:12px">PGA Tour statistics-based putting success probability by distance, slope, and green speed.</p>';
    html += '<div class="sg32-row"><span class="sg32-label">Distance</span><input type="range" class="sg32-slider" id="sg32-putt-dist" min="1" max="60" value="10"><span class="sg32-val" id="sg32-putt-distv">10ft</span></div>';
    html += '<div class="sg32-row"><span class="sg32-label">Slope</span><input type="range" class="sg32-slider" id="sg32-putt-slope" min="0" max="8" value="2" step="0.5"><span class="sg32-val" id="sg32-putt-slopev">2%</span></div>';
    html += '<div class="sg32-row"><span class="sg32-label">Stimp</span><input type="range" class="sg32-slider" id="sg32-putt-stimp" min="6" max="14" value="10" step="0.5"><span class="sg32-val" id="sg32-putt-stimpv">10</span></div>';
    html += '<canvas id="sg32-putt-cv" width="560" height="340" style="width:100%;border-radius:10px;background:var(--bg,#f5f7f5);border:1px solid var(--border,#e0e0e0);margin-top:10px"></canvas>';
    html += '<div class="sg32-grid sg32-grid-4" style="margin-top:10px" id="sg32-putt-stats"></div>';

    const ov = createOverlay('sg32-puttprob', 'linear-gradient(135deg,#2e7d32,#1b5e20)', '&#x26F3; Putting Success Probability', html);

    function calcProb(dist, slope, stimp) {
      const baseProbPGA = [
        [1, 99], [2, 97], [3, 93], [4, 87], [5, 77], [6, 68], [7, 60],
        [8, 54], [9, 49], [10, 44], [12, 37], [15, 28], [20, 18],
        [25, 12], [30, 8], [40, 4], [50, 2], [60, 1]
      ];
      let baseProb = 1;
      for (let i = 0; i < baseProbPGA.length - 1; i++) {
        if (dist >= baseProbPGA[i][0] && dist <= baseProbPGA[i + 1][0]) {
          const ratio = (dist - baseProbPGA[i][0]) / (baseProbPGA[i + 1][0] - baseProbPGA[i][0]);
          baseProb = baseProbPGA[i][1] + (baseProbPGA[i + 1][1] - baseProbPGA[i][1]) * ratio;
          break;
        }
        if (dist <= baseProbPGA[0][0]) baseProb = baseProbPGA[0][1];
        if (dist >= baseProbPGA[baseProbPGA.length - 1][0]) baseProb = baseProbPGA[baseProbPGA.length - 1][1];
      }
      const slopePenalty = 1 - slope * 0.04;
      const stimpFactor = 1 - Math.abs(stimp - 10) * 0.02;
      return Math.max(0.5, Math.min(99, baseProb * slopePenalty * stimpFactor));
    }

    function drawPutt() {
      const dist = parseInt(document.getElementById('sg32-putt-dist').value);
      const slope = parseFloat(document.getElementById('sg32-putt-slope').value);
      const stimp = parseFloat(document.getElementById('sg32-putt-stimp').value);
      document.getElementById('sg32-putt-distv').textContent = dist + 'ft';
      document.getElementById('sg32-putt-slopev').textContent = slope + '%';
      document.getElementById('sg32-putt-stimpv').textContent = stimp;

      const cv = document.getElementById('sg32-putt-cv');
      if (!cv) return;
      const ctx = cv.getContext('2d');
      const W = cv.width, H = cv.height;
      ctx.clearRect(0, 0, W, H);

      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      const textColor = isDark ? '#e0e0e0' : '#1a1a1a';
      const gridColor = isDark ? '#333' : '#e0e0e0';

      const padL = 50, padT = 40, padR = 20, padB = 40;
      const plotW = W - padL - padR, plotH = H - padT - padB;

      ctx.fillStyle = textColor;
      ctx.font = 'bold 13px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Putting Success Rate by Distance', W / 2, 22);

      ctx.strokeStyle = gridColor;
      ctx.lineWidth = 0.5;
      for (let i = 0; i <= 5; i++) {
        const y = padT + (plotH / 5) * i;
        ctx.beginPath(); ctx.moveTo(padL, y); ctx.lineTo(W - padR, y); ctx.stroke();
        ctx.fillStyle = isDark ? '#999' : '#666';
        ctx.font = '10px sans-serif';
        ctx.textAlign = 'right';
        ctx.fillText((100 - i * 20) + '%', padL - 6, y + 4);
      }

      const gradient = ctx.createLinearGradient(padL, padT, padL, padT + plotH);
      gradient.addColorStop(0, 'rgba(76,175,80,0.3)');
      gradient.addColorStop(1, 'rgba(76,175,80,0.02)');
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.moveTo(padL, padT + plotH);
      const points = [];
      for (let d = 1; d <= 60; d++) {
        const prob = calcProb(d, slope, stimp);
        const x = padL + ((d - 1) / 59) * plotW;
        const y = padT + plotH - (prob / 100) * plotH;
        points.push({ x, y, d, prob });
        ctx.lineTo(x, y);
      }
      ctx.lineTo(padL + plotW, padT + plotH);
      ctx.closePath();
      ctx.fill();

      ctx.strokeStyle = '#4caf50';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      points.forEach((p, i) => { if (i === 0) ctx.moveTo(p.x, p.y); else ctx.lineTo(p.x, p.y); });
      ctx.stroke();

      const curProb = calcProb(dist, slope, stimp);
      const curX = padL + ((dist - 1) / 59) * plotW;
      const curY = padT + plotH - (curProb / 100) * plotH;
      ctx.setLineDash([4, 4]);
      ctx.strokeStyle = '#ff5722';
      ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(curX, padT); ctx.lineTo(curX, padT + plotH); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(padL, curY); ctx.lineTo(W - padR, curY); ctx.stroke();
      ctx.setLineDash([]);
      ctx.beginPath();
      ctx.arc(curX, curY, 7, 0, Math.PI * 2);
      ctx.fillStyle = '#ff5722';
      ctx.fill();
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.fillStyle = textColor;
      ctx.font = 'bold 14px sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText(curProb.toFixed(1) + '%', curX + 12, curY - 8);
      ctx.font = '10px sans-serif';
      ctx.fillText(dist + 'ft', curX + 12, curY + 8);

      [5, 10, 20, 30, 40, 50].forEach(d => {
        const x = padL + ((d - 1) / 59) * plotW;
        ctx.fillStyle = isDark ? '#999' : '#666';
        ctx.font = '10px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(d + 'ft', x, H - 10);
      });

      const statsEl = document.getElementById('sg32-putt-stats');
      if (statsEl) {
        const grade = curProb >= 80 ? 'S' : curProb >= 60 ? 'A' : curProb >= 40 ? 'B' : curProb >= 20 ? 'C' : 'D';
        const putt3ft = calcProb(3, slope, stimp).toFixed(0);
        const putt10ft = calcProb(10, slope, stimp).toFixed(0);
        const putt20ft = calcProb(20, slope, stimp).toFixed(0);
        statsEl.innerHTML = '<div class="sg32-stat"><div class="sg32-stat-num">' + curProb.toFixed(1) + '%</div><div class="sg32-stat-label">Current (' + dist + 'ft)</div></div>' +
          '<div class="sg32-stat"><div class="sg32-stat-num">' + putt3ft + '%</div><div class="sg32-stat-label">3ft Make</div></div>' +
          '<div class="sg32-stat"><div class="sg32-stat-num">' + putt10ft + '%</div><div class="sg32-stat-label">10ft Make</div></div>' +
          '<div class="sg32-stat"><div class="sg32-stat-num">' + grade + '</div><div class="sg32-stat-label">Difficulty</div></div>';
      }
    }

    setTimeout(() => {
      drawPutt();
      ['sg32-putt-dist', 'sg32-putt-slope', 'sg32-putt-stimp'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.oninput = () => { SFX.putt_calc(); drawPutt(); };
      });
    }, 100);
    checkAchievements('puttprob');
  }

  // ===================================================================
  // 6. PRACTICE STREAK CALENDAR - 연습 스트릭 캘린더 Canvas 580x360
  // ===================================================================
  function openPracticeStreak() {
    SFX.streak_log();
    let streakData = LS('streakdata') || {};

    let html = '<p style="font-size:12px;color:var(--text-muted);margin-bottom:12px">Track your daily golf practice. Build streaks to unlock achievements.</p>';
    html += '<div class="sg32-row" style="margin-bottom:10px">';
    html += '<select class="sg32-select" id="sg32-streak-type"><option value="range">Driving Range</option><option value="putting">Putting Green</option><option value="chipping">Chipping</option><option value="course">Course Play</option><option value="fitness">Golf Fitness</option><option value="mental">Mental Training</option></select>';
    html += '<input type="number" class="sg32-input" id="sg32-streak-mins" placeholder="Minutes" min="5" max="480" style="width:80px">';
    html += '<button class="sg32-btn sg32-btn-primary" id="sg32-streak-log">&#x2705; Log Today</button>';
    html += '</div>';
    html += '<canvas id="sg32-streak-cv" width="580" height="360" style="width:100%;border-radius:10px;background:var(--bg,#f5f7f5);border:1px solid var(--border,#e0e0e0)"></canvas>';
    html += '<div class="sg32-grid sg32-grid-4" style="margin-top:10px" id="sg32-streak-stats"></div>';

    const ov = createOverlay('sg32-streak', 'linear-gradient(135deg,#ff6f00,#e65100)', '&#x1F525; Practice Streak Calendar', html);

    function drawStreak() {
      const cv = document.getElementById('sg32-streak-cv');
      if (!cv) return;
      const ctx = cv.getContext('2d');
      const W = cv.width, H = cv.height;
      ctx.clearRect(0, 0, W, H);

      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      const textColor = isDark ? '#e0e0e0' : '#1a1a1a';
      const mutedColor = isDark ? '#999' : '#666';

      const now = new Date();
      const year = now.getFullYear();
      const month = now.getMonth();
      const daysInMonth = new Date(year, month + 1, 0).getDate();
      const firstDay = new Date(year, month, 1).getDay();
      const monthNames = ['January','February','March','April','May','June','July','August','September','October','November','December'];
      const dayNames = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

      ctx.fillStyle = textColor;
      ctx.font = 'bold 16px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(monthNames[month] + ' ' + year, W / 2, 28);

      const padL = 30, padT = 50, padR = 30;
      const cellW = (W - padL - padR) / 7;
      const cellH = 42;

      ctx.font = 'bold 11px sans-serif';
      ctx.fillStyle = mutedColor;
      dayNames.forEach((d, i) => {
        ctx.textAlign = 'center';
        ctx.fillText(d, padL + i * cellW + cellW / 2, padT);
      });

      let currentStreak = 0, maxStreak = 0, totalMins = 0, totalDays = 0;
      let tempStreak = 0;

      for (let d = 1; d <= daysInMonth; d++) {
        const dateKey = year + '-' + String(month + 1).padStart(2, '0') + '-' + String(d).padStart(2, '0');
        const col = (firstDay + d - 1) % 7;
        const row = Math.floor((firstDay + d - 1) / 7);
        const x = padL + col * cellW;
        const y = padT + 15 + row * cellH;

        const dayData = streakData[dateKey];
        const hasPractice = dayData && dayData.mins > 0;

        if (hasPractice) {
          totalDays++;
          totalMins += dayData.mins;
          tempStreak++;
          if (tempStreak > maxStreak) maxStreak = tempStreak;
          const intensity = Math.min(dayData.mins / 120, 1);
          const r = Math.round(255 - intensity * 200);
          const g = Math.round(140 + intensity * 80);
          const b = Math.round(50);
          ctx.fillStyle = 'rgb(' + r + ',' + g + ',' + b + ')';
        } else {
          tempStreak = 0;
          ctx.fillStyle = isDark ? '#2a2a2a' : '#f0f0f0';
        }

        ctx.beginPath();
        ctx.roundRect(x + 3, y, cellW - 6, cellH - 6, 6);
        ctx.fill();

        if (d === now.getDate()) {
          ctx.strokeStyle = '#ff5722';
          ctx.lineWidth = 2;
          ctx.stroke();
        }

        ctx.fillStyle = hasPractice ? '#fff' : mutedColor;
        ctx.font = 'bold 12px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(d, x + cellW / 2, y + 16);

        if (hasPractice) {
          ctx.font = '9px sans-serif';
          ctx.fillText(dayData.mins + 'm', x + cellW / 2, y + 28);
        }
      }

      const today = year + '-' + String(month + 1).padStart(2, '0') + '-' + String(now.getDate()).padStart(2, '0');
      currentStreak = 0;
      for (let d = now.getDate(); d >= 1; d--) {
        const dk = year + '-' + String(month + 1).padStart(2, '0') + '-' + String(d).padStart(2, '0');
        if (streakData[dk] && streakData[dk].mins > 0) currentStreak++;
        else break;
      }

      const statsEl = document.getElementById('sg32-streak-stats');
      if (statsEl) {
        statsEl.innerHTML = '<div class="sg32-stat"><div class="sg32-stat-num">' + currentStreak + '</div><div class="sg32-stat-label">Current Streak</div></div>' +
          '<div class="sg32-stat"><div class="sg32-stat-num">' + maxStreak + '</div><div class="sg32-stat-label">Max Streak</div></div>' +
          '<div class="sg32-stat"><div class="sg32-stat-num">' + totalDays + '</div><div class="sg32-stat-label">Days Practiced</div></div>' +
          '<div class="sg32-stat"><div class="sg32-stat-num">' + totalMins + 'm</div><div class="sg32-stat-label">Total Minutes</div></div>';
      }
    }

    setTimeout(() => {
      drawStreak();
      const logBtn = document.getElementById('sg32-streak-log');
      if (logBtn) logBtn.onclick = () => {
        const type = document.getElementById('sg32-streak-type').value;
        const mins = parseInt(document.getElementById('sg32-streak-mins').value) || 30;
        const now = new Date();
        const dateKey = now.getFullYear() + '-' + String(now.getMonth() + 1).padStart(2, '0') + '-' + String(now.getDate()).padStart(2, '0');
        if (!streakData[dateKey]) streakData[dateKey] = { mins: 0, types: [] };
        streakData[dateKey].mins += mins;
        if (!streakData[dateKey].types.includes(type)) streakData[dateKey].types.push(type);
        LS('streakdata', streakData);
        SFX.streak_log();
        drawStreak();
      };
    }, 100);
    checkAchievements('streak');
  }

  // ===================================================================
  // 7. GOLF BODY BALANCE TEST - 골프 바디 밸런스 6축 Radar Canvas 560x360
  // ===================================================================
  function openGolfBodyBalance() {
    SFX.body_scan();
    const axes = ['Flexibility','Core','Lower Body','Upper Body','Balance','Endurance'];
    const tests = [
      { axis: 0, name: 'Toe Touch', desc: 'Touch toes without bending knees' },
      { axis: 0, name: 'Shoulder Rotation', desc: 'Rotate shoulders 90+ degrees' },
      { axis: 1, name: 'Plank Hold', desc: 'Hold plank position 60+ seconds' },
      { axis: 1, name: 'Side Plank', desc: 'Hold side plank 30+ seconds each' },
      { axis: 2, name: 'Single Leg Squat', desc: '5 reps each leg without wobble' },
      { axis: 2, name: 'Lunge Walk', desc: '10 walking lunges with good form' },
      { axis: 3, name: 'Push-ups', desc: '15+ push-ups with full range' },
      { axis: 3, name: 'Band Pull-apart', desc: '20 reps with resistance band' },
      { axis: 4, name: 'Eyes-closed Stand', desc: 'Stand on one foot 30+ seconds eyes closed' },
      { axis: 4, name: 'Bosu Ball Balance', desc: 'Hold balance on unstable surface 45s' }
    ];

    let scores = LS('bodyscores') || {};
    axes.forEach((a, i) => { if (!scores[i]) scores[i] = 5; });

    let html = '<p style="font-size:12px;color:var(--text-muted);margin-bottom:12px">Assess your golf-specific physical fitness across 6 key areas.</p>';
    html += '<canvas id="sg32-body-cv" width="560" height="360" style="width:100%;border-radius:10px;background:var(--bg,#f5f7f5);border:1px solid var(--border,#e0e0e0)"></canvas>';
    html += '<div style="margin-top:12px">';
    axes.forEach((a, i) => {
      html += '<div class="sg32-row"><span class="sg32-label">' + a + '</span><input type="range" class="sg32-slider sg32-body-slider" data-idx="' + i + '" min="1" max="10" value="' + scores[i] + '"><span class="sg32-val sg32-body-val" data-idx="' + i + '">' + scores[i] + '</span></div>';
    });
    html += '</div>';
    html += '<div class="sg32-grid sg32-grid-3" style="margin-top:10px" id="sg32-body-stats"></div>';
    html += '<div id="sg32-body-tests" style="margin-top:12px"></div>';

    const ov = createOverlay('sg32-bodybal', 'linear-gradient(135deg,#ad1457,#880e4f)', '&#x1F4AA; Golf Body Balance Test', html);

    function drawBody() {
      const cv = document.getElementById('sg32-body-cv');
      if (!cv) return;
      const ctx = cv.getContext('2d');
      const W = cv.width, H = cv.height;
      ctx.clearRect(0, 0, W, H);

      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      const textColor = isDark ? '#e0e0e0' : '#1a1a1a';
      const gridColor = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)';

      const cx = W / 2, cy = H / 2 + 10, radius = 130;
      const n = axes.length;

      for (let r = 1; r <= 5; r++) {
        ctx.beginPath();
        ctx.strokeStyle = gridColor;
        ctx.lineWidth = 1;
        for (let i = 0; i <= n; i++) {
          const angle = (Math.PI * 2 / n) * i - Math.PI / 2;
          const x = cx + Math.cos(angle) * (radius * r / 5);
          const y = cy + Math.sin(angle) * (radius * r / 5);
          if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      for (let i = 0; i < n; i++) {
        const angle = (Math.PI * 2 / n) * i - Math.PI / 2;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + Math.cos(angle) * radius, cy + Math.sin(angle) * radius);
        ctx.strokeStyle = gridColor;
        ctx.stroke();
      }

      ctx.beginPath();
      axes.forEach((a, i) => {
        const angle = (Math.PI * 2 / n) * i - Math.PI / 2;
        const val = scores[i] / 10;
        const x = cx + Math.cos(angle) * (radius * val);
        const y = cy + Math.sin(angle) * (radius * val);
        if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      });
      ctx.closePath();
      ctx.fillStyle = 'rgba(233,30,99,0.25)';
      ctx.fill();
      ctx.strokeStyle = '#e91e63';
      ctx.lineWidth = 2.5;
      ctx.stroke();

      axes.forEach((a, i) => {
        const angle = (Math.PI * 2 / n) * i - Math.PI / 2;
        const val = scores[i] / 10;
        const dx = cx + Math.cos(angle) * (radius * val);
        const dy = cy + Math.sin(angle) * (radius * val);
        ctx.beginPath();
        ctx.arc(dx, dy, 5, 0, Math.PI * 2);
        ctx.fillStyle = '#e91e63';
        ctx.fill();

        const lx = cx + Math.cos(angle) * (radius + 20);
        const ly = cy + Math.sin(angle) * (radius + 20);
        ctx.fillStyle = textColor;
        ctx.font = 'bold 11px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(a, lx, ly + 4);
        ctx.font = '10px sans-serif';
        ctx.fillText(scores[i] + '/10', lx, ly + 16);
      });

      const avg = (Object.values(scores).reduce((a, b) => a + b, 0) / n).toFixed(1);
      const grade = avg >= 9 ? 'S' : avg >= 7.5 ? 'A' : avg >= 6 ? 'B' : avg >= 4.5 ? 'C' : 'D';
      ctx.fillStyle = textColor;
      ctx.font = 'bold 18px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(grade, cx, cy - 4);
      ctx.font = '11px sans-serif';
      ctx.fillText('Avg: ' + avg, cx, cy + 12);

      const statsEl = document.getElementById('sg32-body-stats');
      if (statsEl) {
        const strongest = axes[Object.values(scores).indexOf(Math.max(...Object.values(scores)))];
        const weakest = axes[Object.values(scores).indexOf(Math.min(...Object.values(scores)))];
        statsEl.innerHTML = '<div class="sg32-stat"><div class="sg32-stat-num">' + grade + '</div><div class="sg32-stat-label">Overall Grade</div></div>' +
          '<div class="sg32-stat"><div class="sg32-stat-num">' + strongest + '</div><div class="sg32-stat-label">Strongest</div></div>' +
          '<div class="sg32-stat"><div class="sg32-stat-num">' + weakest + '</div><div class="sg32-stat-label">Needs Work</div></div>';
      }

      const testsEl = document.getElementById('sg32-body-tests');
      if (testsEl) {
        const weakIdx = Object.values(scores).indexOf(Math.min(...Object.values(scores)));
        const relTests = tests.filter(t => t.axis === weakIdx);
        testsEl.innerHTML = '<div style="font-size:12px;font-weight:700;margin-bottom:6px">&#x1F4CB; Recommended Tests for ' + axes[weakIdx] + ':</div>' +
          relTests.map(t => '<div class="sg32-card" style="cursor:default"><div class="sg32-card-title">' + t.name + '</div><div class="sg32-card-desc">' + t.desc + '</div></div>').join('');
      }

      LS('bodyscores', scores);
    }

    setTimeout(() => {
      drawBody();
      document.querySelectorAll('.sg32-body-slider').forEach(sl => {
        sl.oninput = () => {
          const idx = parseInt(sl.dataset.idx);
          scores[idx] = parseInt(sl.value);
          const valEl = document.querySelector('.sg32-body-val[data-idx="' + idx + '"]');
          if (valEl) valEl.textContent = sl.value;
          SFX.body_scan();
          drawBody();
        };
      });
    }, 100);
    checkAchievements('bodybal');
  }

  // ===================================================================
  // 8. MY COURSE RECIPE - 나만의 코스 레시피 Canvas 600x380
  // ===================================================================
  function openCourseRecipe() {
    SFX.course_design();
    let holes = LS('courserecipe') || [];
    if (holes.length === 0) {
      holes = Array.from({ length: 18 }, (_, i) => ({
        num: i + 1,
        par: i % 3 === 0 ? 5 : i % 3 === 1 ? 4 : 3,
        yards: i % 3 === 0 ? 520 : i % 3 === 1 ? 380 : 165,
        hazards: 0,
        note: ''
      }));
    }

    let html = '<p style="font-size:12px;color:var(--text-muted);margin-bottom:12px">Design your dream 18-hole course. Set par, distance, and hazards for each hole.</p>';
    html += '<canvas id="sg32-recipe-cv" width="600" height="380" style="width:100%;border-radius:10px;background:var(--bg,#f5f7f5);border:1px solid var(--border,#e0e0e0)"></canvas>';
    html += '<div class="sg32-tabs" id="sg32-recipe-tabs"></div>';
    html += '<div id="sg32-recipe-editor"></div>';
    html += '<div class="sg32-grid sg32-grid-4" style="margin-top:10px" id="sg32-recipe-stats"></div>';
    html += '<div class="sg32-row" style="margin-top:8px"><button class="sg32-btn sg32-btn-primary" id="sg32-recipe-randomize" style="flex:1">&#x1F3B2; Randomize</button><button class="sg32-btn sg32-btn-outline" id="sg32-recipe-reset" style="flex:1">&#x1F504; Reset to Standard</button></div>';

    const ov = createOverlay('sg32-recipe', 'linear-gradient(135deg,#283593,#1a237e)', '&#x1F3D7;&#xFE0F; My Course Recipe', html);

    let selectedHole = 0;

    function drawRecipe() {
      const cv = document.getElementById('sg32-recipe-cv');
      if (!cv) return;
      const ctx = cv.getContext('2d');
      const W = cv.width, H = cv.height;
      ctx.clearRect(0, 0, W, H);

      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      const textColor = isDark ? '#e0e0e0' : '#1a1a1a';
      const mutedColor = isDark ? '#999' : '#666';

      ctx.fillStyle = textColor;
      ctx.font = 'bold 13px sans-serif';
      ctx.textAlign = 'center';
      const totalPar = holes.reduce((s, h) => s + h.par, 0);
      const totalYards = holes.reduce((s, h) => s + h.yards, 0);
      ctx.fillText('My Course: Par ' + totalPar + ' | ' + totalYards + ' yards', W / 2, 22);

      const padL = 30, padT = 45, padR = 20, padB = 50;
      const barW = (W - padL - padR) / 18 - 2;
      const maxYards = Math.max(...holes.map(h => h.yards), 600);

      holes.forEach((h, i) => {
        const x = padL + i * (barW + 2);
        const barH = (h.yards / maxYards) * (H - padT - padB);
        const y = H - padB - barH;

        const parColors = { 3: '#4caf50', 4: '#2196f3', 5: '#ff9800' };
        const color = parColors[h.par] || '#9c27b0';

        if (i === selectedHole) {
          ctx.shadowColor = color;
          ctx.shadowBlur = 10;
        }
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.roundRect(x, y, barW, barH, [4, 4, 0, 0]);
        ctx.fill();
        ctx.shadowBlur = 0;

        if (i === selectedHole) {
          ctx.strokeStyle = '#ff5722';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.roundRect(x - 1, y - 1, barW + 2, barH + 2, [4, 4, 0, 0]);
          ctx.stroke();
        }

        ctx.fillStyle = '#fff';
        ctx.font = 'bold 10px sans-serif';
        ctx.textAlign = 'center';
        if (barH > 30) {
          ctx.fillText(h.yards, x + barW / 2, y + 14);
        }

        ctx.fillStyle = textColor;
        ctx.font = '9px sans-serif';
        ctx.fillText(i + 1, x + barW / 2, H - padB + 12);
        ctx.fillStyle = mutedColor;
        ctx.font = '8px sans-serif';
        ctx.fillText('P' + h.par, x + barW / 2, H - padB + 22);

        if (h.hazards > 0) {
          ctx.fillStyle = '#f44336';
          ctx.beginPath();
          ctx.arc(x + barW / 2, y - 8, 4, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = '#fff';
          ctx.font = 'bold 7px sans-serif';
          ctx.fillText(h.hazards, x + barW / 2, y - 5);
        }
      });

      ctx.fillStyle = mutedColor;
      ctx.font = '10px sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText('Hole Number', padL, H - 5);
      ctx.textAlign = 'right';
      ctx.fillText('&#x1F534; = Hazards', W - padR, H - 5);

      const front9 = holes.slice(0, 9).reduce((s, h) => s + h.par, 0);
      const back9 = holes.slice(9).reduce((s, h) => s + h.par, 0);

      const legendY = 36;
      ctx.font = '10px sans-serif';
      [{ c: '#4caf50', l: 'Par 3' }, { c: '#2196f3', l: 'Par 4' }, { c: '#ff9800', l: 'Par 5' }].forEach((item, i) => {
        const lx = padL + i * 70;
        ctx.fillStyle = item.c;
        ctx.fillRect(lx, legendY, 10, 10);
        ctx.fillStyle = textColor;
        ctx.textAlign = 'left';
        ctx.fillText(item.l, lx + 14, legendY + 9);
      });

      const statsEl = document.getElementById('sg32-recipe-stats');
      if (statsEl) {
        const par3s = holes.filter(h => h.par === 3).length;
        const par4s = holes.filter(h => h.par === 4).length;
        const par5s = holes.filter(h => h.par === 5).length;
        statsEl.innerHTML = '<div class="sg32-stat"><div class="sg32-stat-num">Par ' + totalPar + '</div><div class="sg32-stat-label">Front ' + front9 + ' / Back ' + back9 + '</div></div>' +
          '<div class="sg32-stat"><div class="sg32-stat-num">' + totalYards + '</div><div class="sg32-stat-label">Total Yards</div></div>' +
          '<div class="sg32-stat"><div class="sg32-stat-num">' + par3s + '/' + par4s + '/' + par5s + '</div><div class="sg32-stat-label">Par 3/4/5</div></div>' +
          '<div class="sg32-stat"><div class="sg32-stat-num">' + holes.reduce((s, h) => s + h.hazards, 0) + '</div><div class="sg32-stat-label">Total Hazards</div></div>';
      }
    }

    function renderTabs() {
      const tabsEl = document.getElementById('sg32-recipe-tabs');
      if (!tabsEl) return;
      tabsEl.innerHTML = holes.map((h, i) => '<button class="sg32-tab' + (i === selectedHole ? ' active' : '') + '" data-idx="' + i + '">H' + (i + 1) + '</button>').join('');
      tabsEl.querySelectorAll('.sg32-tab').forEach(btn => {
        btn.onclick = () => {
          selectedHole = parseInt(btn.dataset.idx);
          renderTabs();
          renderEditor();
          drawRecipe();
        };
      });
    }

    function renderEditor() {
      const edEl = document.getElementById('sg32-recipe-editor');
      if (!edEl) return;
      const h = holes[selectedHole];
      edEl.innerHTML = '<div class="sg32-card" style="cursor:default"><div class="sg32-card-title">Hole ' + (selectedHole + 1) + ' Settings</div>' +
        '<div class="sg32-row"><span class="sg32-label">Par</span>' +
        [3, 4, 5].map(p => '<button class="sg32-btn ' + (h.par === p ? 'sg32-btn-primary' : 'sg32-btn-outline') + ' sg32-recipe-par" data-par="' + p + '" style="padding:6px 14px">Par ' + p + '</button>').join('') + '</div>' +
        '<div class="sg32-row"><span class="sg32-label">Yards</span><input type="range" class="sg32-slider" id="sg32-recipe-yards" min="90" max="620" value="' + h.yards + '" step="5"><span class="sg32-val" id="sg32-recipe-yardsv">' + h.yards + '</span></div>' +
        '<div class="sg32-row"><span class="sg32-label">Hazards</span><input type="range" class="sg32-slider" id="sg32-recipe-haz" min="0" max="5" value="' + h.hazards + '"><span class="sg32-val" id="sg32-recipe-hazv">' + h.hazards + '</span></div>' +
        '</div>';

      edEl.querySelectorAll('.sg32-recipe-par').forEach(btn => {
        btn.onclick = () => {
          holes[selectedHole].par = parseInt(btn.dataset.par);
          LS('courserecipe', holes);
          SFX.course_design();
          renderEditor();
          drawRecipe();
        };
      });

      const yardsSlider = document.getElementById('sg32-recipe-yards');
      if (yardsSlider) yardsSlider.oninput = () => {
        holes[selectedHole].yards = parseInt(yardsSlider.value);
        document.getElementById('sg32-recipe-yardsv').textContent = yardsSlider.value;
        LS('courserecipe', holes);
        drawRecipe();
      };

      const hazSlider = document.getElementById('sg32-recipe-haz');
      if (hazSlider) hazSlider.oninput = () => {
        holes[selectedHole].hazards = parseInt(hazSlider.value);
        document.getElementById('sg32-recipe-hazv').textContent = hazSlider.value;
        LS('courserecipe', holes);
        drawRecipe();
      };
    }

    setTimeout(() => {
      renderTabs();
      renderEditor();
      drawRecipe();

      const randBtn = document.getElementById('sg32-recipe-randomize');
      if (randBtn) randBtn.onclick = () => {
        holes.forEach(h => {
          const r = Math.random();
          h.par = r < 0.25 ? 3 : r < 0.75 ? 4 : 5;
          h.yards = h.par === 3 ? 120 + Math.floor(Math.random() * 100) : h.par === 4 ? 300 + Math.floor(Math.random() * 150) : 480 + Math.floor(Math.random() * 120);
          h.hazards = Math.floor(Math.random() * 4);
        });
        LS('courserecipe', holes);
        SFX.course_design();
        renderTabs();
        renderEditor();
        drawRecipe();
      };

      const resetBtn = document.getElementById('sg32-recipe-reset');
      if (resetBtn) resetBtn.onclick = () => {
        holes = Array.from({ length: 18 }, (_, i) => ({
          num: i + 1,
          par: i % 3 === 0 ? 5 : i % 3 === 1 ? 4 : 3,
          yards: i % 3 === 0 ? 520 : i % 3 === 1 ? 380 : 165,
          hazards: 0,
          note: ''
        }));
        LS('courserecipe', holes);
        renderTabs();
        renderEditor();
        drawRecipe();
      };

      const cv = document.getElementById('sg32-recipe-cv');
      if (cv) {
        cv.addEventListener('click', e => {
          const rect = cv.getBoundingClientRect();
          const sx = (e.clientX - rect.left) * (cv.width / rect.width);
          const padL = 30, padR = 20;
          const barW = (cv.width - padL - padR) / 18 - 2;
          const idx = Math.floor((sx - padL) / (barW + 2));
          if (idx >= 0 && idx < 18) {
            selectedHole = idx;
            SFX.course_design();
            renderTabs();
            renderEditor();
            drawRecipe();
          }
        });
      }
    }, 100);
    checkAchievements('recipe');
  }

  // ===================================================================
  // 9. GOLF IQ v16 - 15 Questions
  // ===================================================================
  function openGolfIQv16() {
    SFX.quiz_v16();
    const questions = [
      { q: 'What is the standard number of dimples on a typical golf ball?', o: ['252','336','392','428'], a: 1 },
      { q: 'In match play, what happens if both players make the same score on a hole?', o: ['Hole replayed','Stroke added','Hole halved','Coin flip'], a: 2 },
      { q: 'What does &quot;lag putting&quot; mean?', o: ['Putting uphill','Long putt aimed to finish close','Putting with eyes closed','Putting against the grain'], a: 1 },
      { q: 'Which club has the MOST loft in a standard set?', o: ['Pitching Wedge','Sand Wedge','Lob Wedge','Gap Wedge'], a: 2 },
      { q: 'What is &quot;compression&quot; in golf ball specs?', o: ['Spin rate measure','Core firmness rating','Dimple depth','Cover thickness'], a: 1 },
      { q: 'What is the penalty for hitting out of a bunker and the ball comes back in?', o: ['1 stroke','2 strokes','No penalty, play as it lies','Re-drop'], a: 2 },
      { q: 'What does &quot;MOI&quot; stand for in club design?', o: ['Moment of Impact','Moment of Inertia','Maximum Offset Index','Midline Offset Indicator'], a: 1 },
      { q: 'In a scramble format, how many players hit each shot?', o: ['1','2','All team members','Alternating'], a: 2 },
      { q: 'What is the typical swing speed of a PGA Tour player with a driver?', o: ['95-100 mph','105-110 mph','112-120 mph','125-135 mph'], a: 2 },
      { q: 'What is &quot;grain&quot; on a putting green?', o: ['Sand particle size','Direction grass grows','Green firmness','Type of grass seed'], a: 1 },
      { q: 'Which material is most common for driver faces today?', o: ['Stainless steel','Carbon fiber','Titanium','Aluminum'], a: 2 },
      { q: 'What is the maximum club length allowed by the Rules of Golf?', o: ['46 inches','48 inches','50 inches','No limit'], a: 1 },
      { q: 'What does &quot;Stimpmeter 12&quot; indicate?', o: ['Green is very fast','Green is average','Green is slow','Course slope rating'], a: 0 },
      { q: 'In Stableford scoring, how many points for a birdie?', o: ['1','2','3','4'], a: 2 },
      { q: 'What is a &quot;flyer lie&quot;?', o: ['Ball on a tee','Ball sitting up in light rough causing extra distance','Ball plugged in sand','Ball on cart path'], a: 1 }
    ];

    let ci = 0, score = 0, answered = [];
    let html = '<div id="sg32-quiz-area"></div><div class="sg32-grid sg32-grid-3" style="margin-top:10px" id="sg32-quiz-stats"></div>';

    const ov = createOverlay('sg32-iqv16', 'linear-gradient(135deg,#f57f17,#e65100)', '&#x1F9E0; Golf IQ v16', html);

    function renderQ() {
      const area = document.getElementById('sg32-quiz-area');
      if (!area) return;
      if (ci >= questions.length) {
        const grade = score >= 14 ? 'S' : score >= 12 ? 'A' : score >= 9 ? 'B' : score >= 6 ? 'C' : 'D';
        area.innerHTML = '<div style="text-align:center;padding:20px"><div style="font-size:48px;font-weight:800;color:var(--primary)">' + grade + '</div><div style="font-size:14px;margin-top:8px">' + score + ' / ' + questions.length + ' correct</div><button class="sg32-btn sg32-btn-primary" style="margin-top:12px" onclick="document.getElementById(\'sg32-iqv16\').classList.remove(\'active\')">Close</button></div>';
        const prev = LS('iqv16_best') || 0;
        if (score > prev) LS('iqv16_best', score);
        checkAchievements('iqv16');
        return;
      }
      const q = questions[ci];
      area.innerHTML = '<div style="font-size:12px;color:var(--text-muted);margin-bottom:8px">Question ' + (ci + 1) + ' / ' + questions.length + '</div>' +
        '<div style="font-size:14px;font-weight:700;margin-bottom:12px;line-height:1.5">' + q.q + '</div>' +
        q.o.map((o, i) => '<button class="sg32-btn sg32-btn-outline sg32-quiz-opt" data-idx="' + i + '" style="display:block;width:100%;margin-bottom:6px;text-align:left;padding:10px 14px">' + String.fromCharCode(65 + i) + '. ' + o + '</button>').join('');

      area.querySelectorAll('.sg32-quiz-opt').forEach(btn => {
        btn.onclick = () => {
          const sel = parseInt(btn.dataset.idx);
          const correct = sel === q.a;
          if (correct) { score++; SFX.quiz_v16(); }
          else { sfx(200, 0.15, 'sawtooth', 0.1); }
          btn.style.background = correct ? '#4caf50' : '#f44336';
          btn.style.color = '#fff';
          if (!correct) {
            const correctBtn = area.querySelector('.sg32-quiz-opt[data-idx="' + q.a + '"]');
            if (correctBtn) { correctBtn.style.background = '#4caf50'; correctBtn.style.color = '#fff'; }
          }
          area.querySelectorAll('.sg32-quiz-opt').forEach(b => { b.disabled = true; });
          answered.push({ qi: ci, sel: sel, correct: correct });
          ci++;
          setTimeout(renderQ, 800);
        };
      });

      const statsEl = document.getElementById('sg32-quiz-stats');
      if (statsEl) {
        statsEl.innerHTML = '<div class="sg32-stat"><div class="sg32-stat-num">' + score + '</div><div class="sg32-stat-label">Correct</div></div>' +
          '<div class="sg32-stat"><div class="sg32-stat-num">' + (ci > 0 ? ((score / ci) * 100).toFixed(0) : '--') + '%</div><div class="sg32-stat-label">Accuracy</div></div>' +
          '<div class="sg32-stat"><div class="sg32-stat-num">' + (questions.length - ci) + '</div><div class="sg32-stat-label">Remaining</div></div>';
      }
    }

    setTimeout(renderQ, 100);
  }

  // ===================================================================
  // ACHIEVEMENTS - 업적 +15 (212→227)
  // ===================================================================
  const ACHIEVEMENTS_V32 = [
    { id: 'sg32_clubperf', name: 'Club Analyst', desc: 'Open the Club Performance Heatmap', check: () => LS('ach_clubperf') },
    { id: 'sg32_costtrack', name: 'Budget Pro', desc: 'Log 3+ rounds in Cost Optimizer', check: () => (LS('roundcosts') || []).length >= 3 },
    { id: 'sg32_tempo_s', name: 'Metronome Master', desc: 'Achieve 90%+ consistency in Swing Tempo', check: () => LS('ach_tempo_s') },
    { id: 'sg32_hcp_check', name: 'Course Matcher', desc: 'Use Handicap-Course Matching', check: () => LS('ach_hcpmatch') },
    { id: 'sg32_putt_calc', name: 'Probability Guru', desc: 'Use Putting Success Calculator', check: () => LS('ach_puttprob') },
    { id: 'sg32_streak3', name: '3-Day Streak', desc: 'Practice 3 consecutive days', check: () => { const d = LS('streakdata') || {}; let s = 0; const now = new Date(); for (let i = 0; i < 30; i++) { const dt = new Date(now); dt.setDate(dt.getDate() - i); const k = dt.getFullYear() + '-' + String(dt.getMonth() + 1).padStart(2, '0') + '-' + String(dt.getDate()).padStart(2, '0'); if (d[k] && d[k].mins > 0) s++; else break; } return s >= 3; } },
    { id: 'sg32_streak7', name: '7-Day Warrior', desc: 'Practice 7 consecutive days', check: () => { const d = LS('streakdata') || {}; let s = 0; const now = new Date(); for (let i = 0; i < 30; i++) { const dt = new Date(now); dt.setDate(dt.getDate() - i); const k = dt.getFullYear() + '-' + String(dt.getMonth() + 1).padStart(2, '0') + '-' + String(dt.getDate()).padStart(2, '0'); if (d[k] && d[k].mins > 0) s++; else break; } return s >= 7; } },
    { id: 'sg32_body_a', name: 'Golf Athlete', desc: 'Score A or higher in Body Balance', check: () => { const s = LS('bodyscores') || {}; const vals = Object.values(s); return vals.length >= 6 && (vals.reduce((a, b) => a + b, 0) / vals.length) >= 7.5; } },
    { id: 'sg32_recipe', name: 'Course Architect', desc: 'Design a custom 18-hole course', check: () => LS('ach_recipe') },
    { id: 'sg32_iq16_s', name: 'IQ v16 Genius', desc: 'Score S grade on Golf IQ v16', check: () => (LS('iqv16_best') || 0) >= 14 },
    { id: 'sg32_iq16_clear', name: 'IQ v16 Clear', desc: 'Complete Golf IQ v16 quiz', check: () => (LS('iqv16_best') || 0) > 0 },
    { id: 'sg32_multi_tool', name: 'Multi-Tooler', desc: 'Open 5+ v32 features', check: () => { let c = 0; ['ach_clubperf','ach_roundcost','ach_tempo','ach_hcpmatch','ach_puttprob','ach_streak','ach_bodybal','ach_recipe'].forEach(k => { if (LS(k)) c++; }); return c >= 5; } },
    { id: 'sg32_cost5', name: 'Expense Tracker', desc: 'Log 5+ rounds in Cost Optimizer', check: () => (LS('roundcosts') || []).length >= 5 },
    { id: 'sg32_tempo5', name: 'Rhythm Keeper', desc: 'Save 5+ tempo sessions', check: () => (LS('temposessions') || []).length >= 5 },
    { id: 'sg32_complete', name: 'v32 Complete', desc: 'Unlock 10+ v32 achievements', check: () => { let c = 0; ACHIEVEMENTS_V32.forEach(a => { if (a.id !== 'sg32_complete' && a.check()) c++; }); return c >= 10; } }
  ];

  function checkAchievements(feature) {
    LS('ach_' + feature, true);
    ACHIEVEMENTS_V32.forEach(a => {
      if (a.check() && !LS('ach_done_' + a.id)) {
        LS('ach_done_' + a.id, true);
        SFX.achieve_v32();
        showToast('&#x1F3C6; Achievement: ' + a.name);
      }
    });
  }

  function showToast(msg) {
    const toast = document.createElement('div');
    toast.style.cssText = 'position:fixed;top:20px;left:50%;transform:translateX(-50%);background:var(--toast-bg,#333);color:#fff;padding:12px 24px;border-radius:12px;font-size:13px;font-weight:600;z-index:10100;animation:sg32FadeIn .3s;box-shadow:0 4px 20px rgba(0,0,0,.3);pointer-events:none';
    toast.innerHTML = msg;
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transition = 'opacity .3s';
      setTimeout(() => toast.remove(), 300);
    }, 2500);
  }

  // ===================================================================
  // APPEND TO EXISTING NAV
  // ===================================================================
  const navItems = [
    { icon: '&#x1F3AF;', label: 'ClubPerf', fn: openClubPerfHeatmap },
    { icon: '&#x1F4B0;', label: 'Cost', fn: openRoundCostOptimizer },
    { icon: '&#x1F3B6;', label: 'Tempo', fn: openSwingTempoMetronome },
    { icon: '&#x1F3CC;&#xFE0F;', label: 'HCPMatch', fn: openHandicapCourseMatch },
    { icon: '&#x26F3;', label: 'PuttProb', fn: openPuttingProbCalc },
    { icon: '&#x1F525;', label: 'Streak', fn: openPracticeStreak },
    { icon: '&#x1F4AA;', label: 'BodyTest', fn: openGolfBodyBalance },
    { icon: '&#x1F3D7;&#xFE0F;', label: 'Recipe', fn: openCourseRecipe },
    { icon: '&#x1F4DD;', label: 'IQ v16', fn: openGolfIQv16 }
  ];

  const existingBar = document.querySelector('.sg30-bottom-bar') || document.querySelector('[class*="bottom-bar"]');
  if (existingBar) {
    navItems.forEach(item => {
      const btn = document.createElement('button');
      btn.className = existingBar.querySelector('button') ? existingBar.querySelector('button').className : 'sg30-bbtn';
      btn.innerHTML = '<span class="' + (existingBar.querySelector('.sg30-bbtn-icon') ? 'sg30-bbtn-icon' : 'sg32-bbtn-icon') + '">' + item.icon + '</span><span class="' + (existingBar.querySelector('.sg30-bbtn-label') ? 'sg30-bbtn-label' : 'sg32-bbtn-label') + '">' + item.label + '</span>';
      btn.onclick = item.fn;
      existingBar.appendChild(btn);
    });
  }

  // ========== KEYBOARD SHORTCUTS ==========
  document.addEventListener('keydown', e => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'SELECT') return;
    if (!e.shiftKey) return;
    const map = { H: openClubPerfHeatmap, J: openRoundCostOptimizer, K: openSwingTempoMetronome, L: openHandicapCourseMatch, M: openPuttingProbCalc, N: openPracticeStreak, O: openGolfBodyBalance, P: openCourseRecipe };
    if (map[e.key]) { e.preventDefault(); map[e.key](); }
  });

  // ========== ESC to close ==========
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.sg32-overlay.active').forEach(ov => ov.classList.remove('active'));
    }
  });

})();
