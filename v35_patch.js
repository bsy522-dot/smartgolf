/* ====================================================================
 * SmartGolf v35.0 patch
 * 스윙플레인분석기Canvas8체크620x400 + 홀바이홀전략맵Canvas18홀640x400
 * + 퍼포먼스트렌드라인Canvas30라운드620x380 + 골프장비수명관리Canvas17아이템600x380
 * + 라운드날씨상관분석Canvas4축620x400 + 스코어카드히트맵Canvas18x10 620x380
 * + 골프체형분석기Canvas5축600x380 + 라운드목표달성률Canvas8목표620x380
 * + Golf IQ v19 15문항 + 업적+15(257->272) + SFX16종(252->268) + 키보드8종
 * ==================================================================== */
(function () {
  'use strict';

  const LS = (k, v) => v === undefined ? JSON.parse(localStorage.getItem('sg35b_' + k) || 'null') : localStorage.setItem('sg35b_' + k, JSON.stringify(v));

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
    swing_check: () => { sfx(440, 0.06); sfx(554, 0.08); sfx(659, 0.1); },
    swing_grade: () => { sfx(523, 0.05); sfx(659, 0.05); sfx(784, 0.05); sfx(988, 0.12, 'triangle'); },
    strategy_edit: () => { sfx(392, 0.08); sfx(494, 0.06, 'triangle'); },
    strategy_save: () => { sfx(523, 0.06); sfx(659, 0.06); sfx(784, 0.1); },
    trend_scan: () => { sfx(370, 0.06); sfx(440, 0.06); sfx(554, 0.1); },
    trend_peak: () => { sfx(587, 0.05); sfx(740, 0.05); sfx(880, 0.12, 'triangle'); },
    equip_wear: () => { sfx(330, 0.1, 'sawtooth', 0.08); sfx(262, 0.12, 'sawtooth', 0.06); },
    equip_replace: () => { sfx(494, 0.06); sfx(587, 0.06); sfx(740, 0.1); },
    weather_scan: () => { sfx(349, 0.08); sfx(440, 0.06); sfx(523, 0.1); },
    weather_best: () => { sfx(523, 0.04); sfx(659, 0.04); sfx(784, 0.04); sfx(988, 0.14, 'triangle'); },
    heatmap_log: () => { sfx(415, 0.06); sfx(523, 0.08, 'triangle'); },
    body_scan: () => { sfx(466, 0.08); sfx(587, 0.06); sfx(698, 0.1); },
    goal_set: () => { sfx(392, 0.06); sfx(494, 0.08); },
    goal_achieve: () => { sfx(523, 0.04); sfx(659, 0.04); sfx(784, 0.04); sfx(1047, 0.15, 'triangle'); },
    quiz_v19: () => { sfx(587, 0.1); sfx(740, 0.12); },
    achieve_v35: () => { sfx(523, 0.04); sfx(659, 0.04); sfx(784, 0.04); sfx(988, 0.04); sfx(1175, 0.04); sfx(1319, 0.18, 'triangle'); }
  };

  // ========== CSS ==========
  const css = `
.sg35-overlay{display:none;position:fixed;top:0;left:0;right:0;bottom:0;z-index:10050;background:rgba(0,0,0,.55);overflow-y:auto;padding:20px;animation:sg35FadeIn .25s}
.sg35-overlay.active{display:flex;align-items:flex-start;justify-content:center}
@keyframes sg35FadeIn{from{opacity:0}to{opacity:1}}
.sg35-panel{background:var(--card-bg,#fff);border-radius:16px;max-width:720px;width:100%;margin:30px auto;box-shadow:0 8px 40px rgba(0,0,0,.3);overflow:hidden;animation:sg35SlideUp .3s}
@keyframes sg35SlideUp{from{transform:translateY(30px);opacity:0}to{transform:translateY(0);opacity:1}}
.sg35-panel-head{padding:16px 20px;color:#fff;display:flex;align-items:center;justify-content:space-between}
.sg35-panel-head h3{font-size:16px;font-weight:700;display:flex;align-items:center;gap:8px}
.sg35-panel-close{background:rgba(255,255,255,.25);border:none;color:#fff;width:30px;height:30px;border-radius:50%;cursor:pointer;font-size:16px;font-family:inherit}
.sg35-panel-body{padding:16px 20px;max-height:70vh;overflow-y:auto}
.sg35-card{background:var(--bg,#f5f7f5);border-radius:12px;padding:14px;margin-bottom:10px;border:1px solid var(--border,#e0e0e0);cursor:pointer;transition:all .2s}
.sg35-card:hover{box-shadow:0 2px 12px rgba(0,0,0,.1);transform:translateY(-1px)}
.sg35-card-title{font-weight:700;font-size:14px;color:var(--text,#1a1a1a);margin-bottom:4px;display:flex;align-items:center;gap:6px}
.sg35-card-desc{font-size:12px;color:var(--text-muted,#666);line-height:1.5}
.sg35-badge{display:inline-block;padding:2px 8px;border-radius:10px;font-size:10px;font-weight:700}
.sg35-badge-green{background:#e8f5e9;color:#2e7d32}
.sg35-badge-blue{background:#e3f2fd;color:#1565c0}
.sg35-badge-orange{background:#fff3e0;color:#e65100}
.sg35-badge-red{background:#ffebee;color:#c62828}
.sg35-badge-purple{background:#ede7f6;color:#6a1b9a}
.sg35-badge-teal{background:#e0f2f1;color:#00695c}
.sg35-badge-pink{background:#fce4ec;color:#ad1457}
.sg35-badge-amber{background:#fff8e1;color:#ff6f00}
.sg35-tabs{display:flex;gap:4px;margin-bottom:12px;flex-wrap:wrap}
.sg35-tab{padding:6px 14px;border-radius:20px;border:1px solid var(--border,#e0e0e0);background:var(--bg,#f5f7f5);font-size:12px;cursor:pointer;font-weight:600;color:var(--text-muted,#666);transition:all .2s;font-family:inherit}
.sg35-tab.active{background:var(--primary,#1a7a3a);color:#fff;border-color:var(--primary,#1a7a3a)}
.sg35-row{display:flex;gap:8px;margin-bottom:8px;flex-wrap:wrap;align-items:center}
.sg35-label{font-size:12px;font-weight:600;color:var(--text-muted,#666);min-width:80px}
.sg35-val{font-size:14px;font-weight:700;color:var(--text,#1a1a1a)}
.sg35-slider{flex:1;min-width:120px;accent-color:var(--primary,#1a7a3a)}
.sg35-btn{padding:8px 16px;border-radius:10px;border:none;font-size:13px;font-weight:700;cursor:pointer;transition:all .2s;font-family:inherit}
.sg35-btn-primary{background:var(--primary,#1a7a3a);color:#fff}
.sg35-btn-primary:hover{opacity:.85}
.sg35-btn-outline{background:transparent;border:1px solid var(--border,#e0e0e0);color:var(--text,#1a1a1a)}
.sg35-grade{font-size:28px;font-weight:900;text-align:center;margin:10px 0}
.sg35-grade-s{color:#e91e63}.sg35-grade-a{color:#ff5722}.sg35-grade-b{color:#ff9800}.sg35-grade-c{color:#4caf50}.sg35-grade-d{color:#9e9e9e}
.sg35-canvas-wrap{text-align:center;margin:10px 0}
.sg35-canvas-wrap canvas{max-width:100%;border-radius:10px;background:#fafafa;border:1px solid var(--border,#e0e0e0)}
[data-theme="dark"] .sg35-canvas-wrap canvas{background:#1a1a1a}
[data-theme="dark"] .sg35-badge-green{background:#1a3a25;color:#7bed9f}
[data-theme="dark"] .sg35-badge-blue{background:#1a2a3a;color:#7ab8f5}
[data-theme="dark"] .sg35-badge-orange{background:#3a2a1a;color:#f0c070}
[data-theme="dark"] .sg35-badge-red{background:#3a1a1a;color:#f08080}
[data-theme="dark"] .sg35-badge-purple{background:#2a1a3a;color:#c9a0dc}
[data-theme="dark"] .sg35-badge-teal{background:#0a2a2a;color:#80cbc4}
[data-theme="dark"] .sg35-badge-pink{background:#3a1a2a;color:#f48fb1}
[data-theme="dark"] .sg35-badge-amber{background:#3a3000;color:#ffd54f}
`;
  const sty = document.createElement('style');
  sty.textContent = css;
  document.head.appendChild(sty);

  // ========== UTILITY ==========
  function makeOverlay(id, gradient, title, content) {
    let ov = document.getElementById(id);
    if (ov) { ov.classList.add('active'); return; }
    ov = document.createElement('div');
    ov.id = id;
    ov.className = 'sg35-overlay active';
    ov.innerHTML = '<div class="sg35-panel"><div class="sg35-panel-head" style="background:' + gradient + '"><h3>' + title + '</h3><button class="sg35-panel-close" onclick="this.closest(\'.sg35-overlay\').classList.remove(\'active\')">&times;</button></div><div class="sg35-panel-body">' + content + '</div></div>';
    ov.addEventListener('click', e => { if (e.target === ov) ov.classList.remove('active'); });
    document.body.appendChild(ov);
  }

  function isDark() { return document.documentElement.getAttribute('data-theme') === 'dark'; }
  function cText() { return isDark() ? '#e0e0e0' : '#1a1a1a'; }
  function cMuted() { return isDark() ? '#999' : '#666'; }
  function cBg() { return isDark() ? '#1a1a1a' : '#fafafa'; }
  function cGrid() { return isDark() ? '#333' : '#e0e0e0'; }

  function grade(pct) {
    if (pct >= 90) return { g: 'S', c: '#e91e63', cls: 'sg35-grade-s' };
    if (pct >= 75) return { g: 'A', c: '#ff5722', cls: 'sg35-grade-a' };
    if (pct >= 60) return { g: 'B', c: '#ff9800', cls: 'sg35-grade-b' };
    if (pct >= 40) return { g: 'C', c: '#4caf50', cls: 'sg35-grade-c' };
    return { g: 'D', c: '#9e9e9e', cls: 'sg35-grade-d' };
  }

  // 빈 상태 안내: 저장된 사용자 데이터가 없을 때 캔버스 가운데에 회색 안내문만 그린다.
  function drawEmpty(ctx, W, H, msg) {
    ctx.save();
    ctx.fillStyle = cMuted();
    ctx.font = '13px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(msg || '기록을 추가하면 표시됩니다', W / 2, H / 2);
    ctx.restore();
  }

  // 입력창 값 읽기(비어 있거나 숫자가 아니면 null)
  function readNum(id) {
    var el = document.getElementById(id);
    if (!el || el.value === '') return null;
    var v = parseFloat(el.value);
    return isNaN(v) ? null : v;
  }

  // ===============================================================
  // 1. SWING PLANE ANALYZER - Canvas 620x400
  // ===============================================================
  function openSwingPlaneAnalyzer() {
    SFX.swing_check();
    const CHECKPOINTS = ['Address', 'Takeaway', 'Halfway Back', 'Top', 'Transition', 'Halfway Down', 'Impact', 'Follow Through'];
    const CP_COLORS = ['#e91e63', '#2196f3', '#4caf50', '#ff9800', '#9c27b0', '#00bcd4', '#ff5722', '#795548'];
    let swingData = LS('swing_plane') || [];
    let history = LS('swing_history') || [];

    function render(d) {
      const cid = 'sg35-canvas-swing';
      var wrap = document.getElementById(cid + '-wrap');
      if (!wrap) return;
      wrap.innerHTML = '<canvas id="' + cid + '" width="620" height="400"></canvas>';
      var canvas = document.getElementById(cid);
      var ctx = canvas.getContext('2d');
      var W = 620, H = 400;
      ctx.fillStyle = cBg(); ctx.fillRect(0, 0, W, H);

      ctx.fillStyle = cText(); ctx.font = 'bold 14px sans-serif';
      ctx.fillText('Swing Plane Analysis - 8 Checkpoints', 20, 25);

      if (!d || !d.length) { drawEmpty(ctx, W, H, '체크포인트 점수를 입력하면 표시됩니다'); return; }

      // Radar chart
      var cx = 200, cy = 220, maxR = 130;
      var angleStep = (Math.PI * 2) / 8;

      // Grid circles
      for (var r = 2; r <= 10; r += 2) {
        var radius = maxR * r / 10;
        ctx.strokeStyle = cGrid(); ctx.lineWidth = 0.5;
        ctx.beginPath();
        for (var a = 0; a < 8; a++) {
          var ax = cx + Math.cos(angleStep * a - Math.PI / 2) * radius;
          var ay = cy + Math.sin(angleStep * a - Math.PI / 2) * radius;
          if (a === 0) ctx.moveTo(ax, ay); else ctx.lineTo(ax, ay);
        }
        ctx.closePath(); ctx.stroke();
        ctx.fillStyle = cMuted(); ctx.font = '8px sans-serif';
        ctx.fillText(r, cx + 3, cy - radius + 10);
      }

      // Axis lines and labels
      CHECKPOINTS.forEach(function(cp, i) {
        var angle = angleStep * i - Math.PI / 2;
        var ex = cx + Math.cos(angle) * maxR;
        var ey = cy + Math.sin(angle) * maxR;
        ctx.strokeStyle = cGrid(); ctx.lineWidth = 0.5;
        ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(ex, ey); ctx.stroke();

        var lx = cx + Math.cos(angle) * (maxR + 20);
        var ly = cy + Math.sin(angle) * (maxR + 20);
        ctx.fillStyle = CP_COLORS[i]; ctx.font = 'bold 9px sans-serif';
        ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.fillText(cp, lx, ly);
      });
      ctx.textAlign = 'left'; ctx.textBaseline = 'alphabetic';

      // Data polygon
      ctx.fillStyle = isDark() ? 'rgba(26,122,58,0.25)' : 'rgba(26,122,58,0.15)';
      ctx.strokeStyle = '#1a7a3a'; ctx.lineWidth = 2.5;
      ctx.beginPath();
      d.forEach(function(val, i) {
        var angle = angleStep * i - Math.PI / 2;
        var dr = maxR * val / 10;
        var px = cx + Math.cos(angle) * dr;
        var py = cy + Math.sin(angle) * dr;
        if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
      });
      ctx.closePath(); ctx.fill(); ctx.stroke();

      // Data points
      d.forEach(function(val, i) {
        var angle = angleStep * i - Math.PI / 2;
        var dr = maxR * val / 10;
        var px = cx + Math.cos(angle) * dr;
        var py = cy + Math.sin(angle) * dr;
        ctx.fillStyle = CP_COLORS[i];
        ctx.beginPath(); ctx.arc(px, py, 5, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#fff'; ctx.font = 'bold 7px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(val, px, py + 3);
      });
      ctx.textAlign = 'left';

      // Overall score and grade
      var total = d.reduce(function(s, v) { return s + v; }, 0);
      var avg = total / d.length;
      var pct = avg * 10;
      var g = grade(pct);

      ctx.fillStyle = cText(); ctx.font = 'bold 13px sans-serif';
      ctx.fillText('Score Breakdown', 400, 55);

      d.forEach(function(val, i) {
        var y = 75 + i * 22;
        ctx.fillStyle = CP_COLORS[i]; ctx.fillRect(400, y - 8, 8, 8);
        ctx.fillStyle = cText(); ctx.font = '11px sans-serif';
        ctx.fillText(CHECKPOINTS[i] + ': ' + val + '/10', 414, y);
        // Mini bar
        ctx.fillStyle = isDark() ? '#333' : '#e0e0e0';
        ctx.fillRect(540, y - 8, 60, 8);
        ctx.fillStyle = CP_COLORS[i];
        ctx.fillRect(540, y - 8, 60 * val / 10, 8);
      });

      ctx.font = 'bold 28px sans-serif'; ctx.fillStyle = g.c;
      ctx.fillText(g.g, 450, 290);
      ctx.font = '12px sans-serif'; ctx.fillStyle = cMuted();
      ctx.fillText('Avg: ' + avg.toFixed(1) + '/10 (' + Math.round(pct) + '%)', 400, 310);

      // History count
      ctx.font = '11px sans-serif'; ctx.fillStyle = cMuted();
      ctx.fillText('Sessions recorded: ' + history.length, 400, 340);

      if (pct >= 90) _checkAchievementsV35('swing_s_rank');
    }

    var sliderHtml = CHECKPOINTS.map(function(cp, i) {
      var v = (swingData.length === CHECKPOINTS.length) ? swingData[i] : 5;
      return '<div class="sg35-row"><span class="sg35-label">' + cp + '</span>' +
        '<input type="range" class="sg35-slider" id="sg35-swing-in-' + i + '" min="1" max="10" step="1" value="' + v + '" oninput="document.getElementById(\'sg35-swing-val-' + i + '\').textContent=this.value">' +
        '<span class="sg35-val" id="sg35-swing-val-' + i + '">' + v + '</span></div>';
    }).join('');

    var html = '<div class="sg35-row"><span class="sg35-badge sg35-badge-green">Canvas 620x400</span> <span class="sg35-badge sg35-badge-pink">8 Checkpoints</span></div>' +
      '<p class="sg35-card-desc">8개 스윙 체크포인트를 직접 1~10점으로 평가해 입력하세요. 입력한 점수만 레이더 차트에 표시됩니다.</p>' +
      sliderHtml +
      '<div class="sg35-row" style="margin-top:10px"><button class="sg35-btn sg35-btn-primary" onclick="window._sg35_swing_apply()">&#x2713; 평가 적용</button> <button class="sg35-btn sg35-btn-outline" onclick="window._sg35_swing_save()">&#x1F4BE; 기록 저장</button> <button class="sg35-btn sg35-btn-outline" onclick="window._sg35_swing_reset()">&#x21BB; 초기화</button></div>' +
      '<div id="sg35-canvas-swing-wrap" class="sg35-canvas-wrap"></div>';

    window._sg35_swing_apply = function() {
      swingData = CHECKPOINTS.map(function(_, i) {
        var el = document.getElementById('sg35-swing-in-' + i);
        var v = el ? parseInt(el.value, 10) : NaN;
        return isNaN(v) ? 5 : Math.max(1, Math.min(10, v));
      });
      LS('swing_plane', swingData); SFX.swing_check(); render(swingData);
    };
    window._sg35_swing_save = function() {
      if (!swingData.length) { alert('먼저 [평가 적용]으로 점수를 입력하세요.'); return; }
      history.push({ date: new Date().toISOString().slice(0, 10), scores: swingData.slice() });
      if (history.length > 50) history = history.slice(-50);
      LS('swing_history', history); SFX.swing_grade();
      _checkAchievementsV35('swing_plane_master');
      render(swingData);
    };
    window._sg35_swing_reset = function() { swingData = []; LS('swing_plane', swingData); render(swingData); };

    makeOverlay('sg35-swing', 'linear-gradient(135deg,#880e4f,#e91e63)', '&#x1F3CC;&#xFE0F; Swing Plane Analyzer', html);
    setTimeout(function() { render(swingData); }, 100);
    _checkAchievementsV35('swing_opened');
  }

  // ===============================================================
  // 2. HOLE-BY-HOLE STRATEGY MAP - Canvas 640x400
  // ===============================================================
  function openHoleStrategyMap() {
    SFX.strategy_edit();
    var PARS = [4,4,3,5,4,4,3,4,5,4,4,3,5,4,4,3,4,5];
    var DISTS = [380,410,175,520,395,365,190,430,540,400,385,165,510,370,420,200,445,530];
    var WINDS = ['None', 'Tail', 'Head', 'Cross'];

    // 파/거리는 편집 가능한 코스 템플릿 값이며, 클럽·바람·난이도·공략 노트는 사용자가 입력하기 전까지 비워 둔다.
    var holeData = LS('strategy_map') || PARS.map(function(p, i) {
      return { par: p, dist: DISTS[i], strategy: '', club: '', wind: 'None', diff: 0 };
    });
    var selectedHole = 0;

    function render(d) {
      var cid = 'sg35-canvas-strategy';
      var wrap = document.getElementById(cid + '-wrap');
      if (!wrap) return;
      wrap.innerHTML = '<canvas id="' + cid + '" width="640" height="400"></canvas>';
      var canvas = document.getElementById(cid);
      var ctx = canvas.getContext('2d');
      var W = 640, H = 400;
      ctx.fillStyle = cBg(); ctx.fillRect(0, 0, W, H);

      ctx.fillStyle = cText(); ctx.font = 'bold 14px sans-serif';
      ctx.fillText('Hole-by-Hole Strategy Map', 20, 25);

      // 18-hole grid (3 rows x 6 cols)
      var cellW = 90, cellH = 55, startX = 20, startY = 50;
      d.forEach(function(h, i) {
        var col = i % 6, row = Math.floor(i / 6);
        var x = startX + col * (cellW + 6);
        var y = startY + row * (cellH + 6);

        // Difficulty color
        var diffColors = ['#e8f5e9','#c8e6c9','#fff9c4','#ffe0b2','#ffcdd2'];
        var diffColorsDark = ['#1a3a25','#2a4a30','#3a3520','#3a2a1a','#3a1a1a'];
        var dIdx = (h.diff >= 1 && h.diff <= 5) ? h.diff - 1 : -1;
        ctx.fillStyle = dIdx < 0 ? (isDark() ? '#2a2a2a' : '#f0f0f0') : (isDark() ? diffColorsDark[dIdx] : diffColors[dIdx]);
        if (i === selectedHole) {
          ctx.fillStyle = '#1a7a3a';
        }
        ctx.fillRect(x, y, cellW, cellH);
        ctx.strokeStyle = i === selectedHole ? '#fff' : cGrid();
        ctx.lineWidth = i === selectedHole ? 2 : 0.5;
        ctx.strokeRect(x, y, cellW, cellH);

        ctx.fillStyle = i === selectedHole ? '#fff' : cText();
        ctx.font = 'bold 11px sans-serif'; ctx.textAlign = 'center';
        ctx.fillText('H' + (i + 1) + ' Par' + h.par, x + cellW / 2, y + 16);
        ctx.font = '9px sans-serif';
        ctx.fillStyle = i === selectedHole ? 'rgba(255,255,255,.8)' : cMuted();
        ctx.fillText(h.dist + 'yd | ' + (h.club || '-'), x + cellW / 2, y + 32);
        ctx.fillText('Diff: ' + (h.diff >= 1 ? h.diff + '/5' : '-'), x + cellW / 2, y + 46);
      });
      ctx.textAlign = 'left';

      // Selected hole detail panel
      var sel = d[selectedHole];
      var detailY = startY + 3 * (cellH + 6) + 15;
      ctx.fillStyle = isDark() ? '#252525' : '#f0f4f0';
      ctx.fillRect(20, detailY, W - 40, 180);
      ctx.strokeStyle = '#1a7a3a'; ctx.lineWidth = 1;
      ctx.strokeRect(20, detailY, W - 40, 180);

      ctx.fillStyle = cText(); ctx.font = 'bold 15px sans-serif';
      ctx.fillText('Hole ' + (selectedHole + 1) + ' Detail', 35, detailY + 24);

      ctx.font = '12px sans-serif'; ctx.fillStyle = cMuted();
      ctx.fillText('Par: ' + sel.par + '  |  Distance: ' + sel.dist + 'yd  |  Club: ' + (sel.club || '-') + '  |  Wind: ' + (sel.wind || '-'), 35, detailY + 46);
      ctx.fillText('Difficulty: ' + (sel.diff >= 1 ? sel.diff + '/5' : '-') + '  |  Strategy: ' + (sel.strategy || '-'), 35, detailY + 66);

      // Mini hole visualization
      var holeX = 450, holeY = detailY + 20, holeW = 140, holeH = 150;
      // Fairway
      ctx.fillStyle = '#66bb6a';
      ctx.beginPath();
      ctx.moveTo(holeX + 40, holeY + holeH);
      ctx.lineTo(holeX + holeW - 40, holeY + holeH);
      ctx.lineTo(holeX + holeW - 20, holeY + 40);
      ctx.lineTo(holeX + 20, holeY + 40);
      ctx.closePath(); ctx.fill();
      // Green
      ctx.fillStyle = '#a5d6a7';
      ctx.beginPath(); ctx.ellipse(holeX + holeW / 2, holeY + 30, 30, 18, 0, 0, Math.PI * 2); ctx.fill();
      // Pin
      ctx.fillStyle = '#f44336';
      ctx.fillRect(holeX + holeW / 2, holeY + 15, 2, 20);
      ctx.beginPath(); ctx.moveTo(holeX + holeW / 2 + 2, holeY + 15); ctx.lineTo(holeX + holeW / 2 + 12, holeY + 20); ctx.lineTo(holeX + holeW / 2 + 2, holeY + 25); ctx.fill();
      // Tee box
      ctx.fillStyle = '#2e7d32';
      ctx.fillRect(holeX + holeW / 2 - 15, holeY + holeH - 10, 30, 8);
      ctx.fillStyle = '#fff'; ctx.font = '7px sans-serif'; ctx.textAlign = 'center';
      ctx.fillText('TEE', holeX + holeW / 2, holeY + holeH - 4);
      ctx.fillText('GREEN', holeX + holeW / 2, holeY + 33);

      // Difficulty legend
      ctx.textAlign = 'left';
      ctx.font = '10px sans-serif'; ctx.fillStyle = cMuted();
      ctx.fillText('Difficulty Heatmap:', 35, detailY + 95);
      var legendLabels = ['Easy','Medium','Moderate','Hard','Very Hard'];
      var legendColors = ['#e8f5e9','#c8e6c9','#fff9c4','#ffe0b2','#ffcdd2'];
      legendLabels.forEach(function(lbl, li) {
        ctx.fillStyle = legendColors[li];
        ctx.fillRect(35 + li * 75, detailY + 105, 12, 12);
        ctx.fillStyle = cText(); ctx.font = '9px sans-serif';
        ctx.fillText(lbl, 50 + li * 75, detailY + 115);
      });

      // Total difficulty summary
      var rated = d.filter(function(h) { return h.diff >= 1; });
      var avgDiffTxt = '-', hardestTxt = '-';
      if (rated.length) {
        avgDiffTxt = (rated.reduce(function(s, h) { return s + h.diff; }, 0) / rated.length).toFixed(1) + '/5';
        hardestTxt = 'H' + (d.indexOf(rated.slice().sort(function(a, b) { return b.diff - a.diff; })[0]) + 1);
      }
      ctx.font = 'bold 12px sans-serif'; ctx.fillStyle = cText();
      ctx.fillText('Avg Difficulty: ' + avgDiffTxt + '  |  Hardest: ' + hardestTxt, 35, detailY + 145);
      var notedCount = d.filter(function(h) { return h.strategy && h.strategy.length > 0; }).length;
      ctx.fillText('Strategy Notes: ' + notedCount + '/18 holes filled', 35, detailY + 165);
    }

    var windOpts = WINDS.map(function(w) { return '<option value="' + w + '">' + w + '</option>'; }).join('');
    var diffOpts = '<option value="0">미입력</option>' + [1, 2, 3, 4, 5].map(function(n) { return '<option value="' + n + '">' + n + '</option>'; }).join('');

    var html = '<div class="sg35-row"><span class="sg35-badge sg35-badge-blue">Canvas 640x400</span> <span class="sg35-badge sg35-badge-green">18 Holes</span></div>' +
      '<p class="sg35-card-desc">홀을 고른 뒤 거리·클럽·바람·난이도·공략 노트를 직접 입력해 저장하세요. 입력한 홀만 값이 표시됩니다.</p>' +
      '<div class="sg35-tabs" id="sg35-strategy-tabs"></div>' +
      '<div class="sg35-row"><span class="sg35-label">거리(yd)</span><input type="number" id="sg35-st-dist" min="0" max="800" style="width:80px">' +
      '<span class="sg35-label">클럽</span><input type="text" id="sg35-st-club" maxlength="6" style="width:70px">' +
      '<span class="sg35-label">바람</span><select id="sg35-st-wind">' + windOpts + '</select>' +
      '<span class="sg35-label">난이도</span><select id="sg35-st-diff">' + diffOpts + '</select></div>' +
      '<div class="sg35-row"><span class="sg35-label">공략 노트</span><input type="text" id="sg35-st-note" style="flex:1;min-width:180px"></div>' +
      '<div class="sg35-row" style="margin-top:6px"><button class="sg35-btn sg35-btn-primary" onclick="window._sg35_strategy_apply()">&#x2713; 이 홀 저장</button> <button class="sg35-btn sg35-btn-outline" onclick="window._sg35_strategy_reset()">&#x21BB; 전체 초기화</button></div>' +
      '<div id="sg35-canvas-strategy-wrap" class="sg35-canvas-wrap"></div>';

    function fillHoleForm() {
      var distEl = document.getElementById('sg35-st-dist');
      if (!distEl) return;
      var h = holeData[selectedHole];
      distEl.value = h.dist;
      document.getElementById('sg35-st-club').value = h.club || '';
      document.getElementById('sg35-st-wind').value = h.wind || 'None';
      document.getElementById('sg35-st-diff').value = String(h.diff || 0);
      document.getElementById('sg35-st-note').value = h.strategy || '';
    }

    window._sg35_strategy_apply = function() {
      var h = holeData[selectedHole];
      var dist = readNum('sg35-st-dist');
      if (dist !== null) h.dist = Math.max(0, Math.round(dist));
      h.club = (document.getElementById('sg35-st-club').value || '').trim();
      h.wind = document.getElementById('sg35-st-wind').value || 'None';
      h.diff = parseInt(document.getElementById('sg35-st-diff').value, 10) || 0;
      h.strategy = (document.getElementById('sg35-st-note').value || '').trim();
      LS('strategy_map', holeData); SFX.strategy_save(); render(holeData);
    };
    window._sg35_strategy_reset = function() {
      holeData = PARS.map(function(p, i) { return { par: p, dist: DISTS[i], strategy: '', club: '', wind: 'None', diff: 0 }; });
      LS('strategy_map', holeData); fillHoleForm(); render(holeData);
    };

    makeOverlay('sg35-strategy', 'linear-gradient(135deg,#1565c0,#42a5f5)', '&#x1F5FA;&#xFE0F; Hole Strategy Map', html);
    setTimeout(function() {
      var tabsEl = document.getElementById('sg35-strategy-tabs');
      if (tabsEl) {
        for (var i = 0; i < 18; i++) {
          (function(idx) {
            var tab = document.createElement('button');
            tab.className = 'sg35-tab' + (idx === 0 ? ' active' : '');
            tab.textContent = 'H' + (idx + 1);
            tab.onclick = function() {
              selectedHole = idx;
              tabsEl.querySelectorAll('.sg35-tab').forEach(function(t) { t.classList.remove('active'); });
              tab.classList.add('active');
              SFX.strategy_edit(); fillHoleForm(); render(holeData);
            };
            tabsEl.appendChild(tab);
          })(i);
        }
      }
      fillHoleForm();
      render(holeData);
    }, 100);
    _checkAchievementsV35('strategy_mapper');
  }

  // ===============================================================
  // 3. PERFORMANCE TREND LINE - Canvas 620x380
  // ===============================================================
  function openPerformanceTrendLine() {
    SFX.trend_scan();
    var METRICS = ['Score', 'Putts', 'FIR%', 'GIR%', 'Penalties'];
    var METRIC_COLORS = ['#2196f3', '#4caf50', '#ff9800', '#9c27b0', '#f44336'];
    var activeMetric = 0;

    var trendData = LS('trend_data') || [];

    function getMetricValue(r, metric) {
      var v;
      if (metric === 0) v = r.score;
      else if (metric === 1) v = r.putts;
      else if (metric === 2) v = r.fir;
      else if (metric === 3) v = r.gir;
      else v = r.penalties;
      return (v === null || v === undefined || isNaN(v)) ? null : v;
    }

    function movingAvg(arr, window) {
      var result = [];
      for (var i = 0; i < arr.length; i++) {
        var start = Math.max(0, i - window + 1);
        var slice = arr.slice(start, i + 1);
        result.push(slice.reduce(function(s, v) { return s + v; }, 0) / slice.length);
      }
      return result;
    }

    function render(d) {
      var cid = 'sg35-canvas-trend';
      var wrap = document.getElementById(cid + '-wrap');
      if (!wrap) return;
      wrap.innerHTML = '<canvas id="' + cid + '" width="620" height="380"></canvas>';
      var canvas = document.getElementById(cid);
      var ctx = canvas.getContext('2d');
      var W = 620, H = 380;
      ctx.fillStyle = cBg(); ctx.fillRect(0, 0, W, H);

      ctx.fillStyle = cText(); ctx.font = 'bold 14px sans-serif';
      ctx.fillText('Performance Trend - ' + METRICS[activeMetric] + ' (' + d.length + ' Rounds)', 20, 25);

      if (!d.length) { drawEmpty(ctx, W, H, '라운드를 추가하면 표시됩니다'); return; }

      var pts = [];
      d.forEach(function(r, i) {
        var v = getMetricValue(r, activeMetric);
        if (v !== null) pts.push({ i: i, v: v });
      });
      if (!pts.length) { drawEmpty(ctx, W, H, '이 지표에 입력된 값이 없습니다'); return; }

      var values = pts.map(function(p) { return p.v; });
      var ma = movingAvg(values, 5);

      var minVal = Math.min.apply(null, values) - 2;
      var maxVal = Math.max.apply(null, values) + 2;
      if (maxVal === minVal) maxVal = minVal + 10;

      var startX = 55, endX = W - 25, startY = 50, endY = H - 60;
      var stepX = values.length > 1 ? (endX - startX) / (values.length - 1) : 0;
      var scaleY = (endY - startY) / (maxVal - minVal);

      // Grid lines
      var gridSteps = 5;
      for (var gi = 0; gi <= gridSteps; gi++) {
        var gVal = minVal + (maxVal - minVal) * gi / gridSteps;
        var gy = endY - (gVal - minVal) * scaleY;
        ctx.strokeStyle = cGrid(); ctx.lineWidth = 0.5;
        ctx.beginPath(); ctx.moveTo(startX, gy); ctx.lineTo(endX, gy); ctx.stroke();
        ctx.fillStyle = cMuted(); ctx.font = '9px sans-serif'; ctx.textAlign = 'right';
        ctx.fillText(Math.round(gVal), startX - 6, gy + 3);
      }
      ctx.textAlign = 'left';

      // Main data line
      var color = METRIC_COLORS[activeMetric];
      ctx.strokeStyle = color; ctx.lineWidth = 2;
      ctx.beginPath();
      values.forEach(function(v, i) {
        var x = startX + i * stepX;
        var y = endY - (v - minVal) * scaleY;
        if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      });
      ctx.stroke();

      // Moving average line (dashed)
      ctx.strokeStyle = '#ff9800'; ctx.lineWidth = 1.5; ctx.setLineDash([5, 5]);
      ctx.beginPath();
      ma.forEach(function(v, i) {
        var x = startX + i * stepX;
        var y = endY - (v - minVal) * scaleY;
        if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      });
      ctx.stroke();
      ctx.setLineDash([]);

      // Data points
      var bestVal = activeMetric <= 1 || activeMetric === 4 ? Math.min.apply(null, values) : Math.max.apply(null, values);
      var worstVal = activeMetric <= 1 || activeMetric === 4 ? Math.max.apply(null, values) : Math.min.apply(null, values);
      var avgVal = values.reduce(function(s, v) { return s + v; }, 0) / values.length;

      values.forEach(function(v, i) {
        var x = startX + i * stepX;
        var y = endY - (v - minVal) * scaleY;
        ctx.fillStyle = v === bestVal ? '#4caf50' : (v === worstVal ? '#f44336' : color);
        var r = (v === bestVal || v === worstVal) ? 5 : 3;
        ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
      });

      // X-axis labels (every 5)
      for (var xi = 0; xi < pts.length; xi += 5) {
        var x = startX + xi * stepX;
        ctx.fillStyle = cText(); ctx.font = '8px sans-serif'; ctx.textAlign = 'center';
        ctx.fillText('R' + (pts[xi].i + 1), x, endY + 14);
      }
      ctx.textAlign = 'left';

      // Best / Worst / Avg markers
      ctx.font = 'bold 11px sans-serif';
      ctx.fillStyle = '#4caf50'; ctx.fillText('Best: ' + bestVal, W - 180, H - 38);
      ctx.fillStyle = '#f44336'; ctx.fillText('Worst: ' + worstVal, W - 180, H - 22);
      ctx.fillStyle = cText(); ctx.fillText('Avg: ' + avgVal.toFixed(1), W - 180, H - 6);

      // Legend
      ctx.strokeStyle = color; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(20, H - 38); ctx.lineTo(40, H - 38); ctx.stroke();
      ctx.fillStyle = cText(); ctx.font = '10px sans-serif'; ctx.fillText(METRICS[activeMetric], 44, H - 34);
      ctx.strokeStyle = '#ff9800'; ctx.setLineDash([5, 5]);
      ctx.beginPath(); ctx.moveTo(20, H - 22); ctx.lineTo(40, H - 22); ctx.stroke();
      ctx.setLineDash([]); ctx.fillText('5-Round MA', 44, H - 18);

      if (d.length >= 30) _checkAchievementsV35('trend_30round');
    }

    var html = '<div class="sg35-row"><span class="sg35-badge sg35-badge-blue">Canvas 620x380</span> <span class="sg35-badge sg35-badge-purple">5 Metrics</span></div>' +
      '<p class="sg35-card-desc">직접 입력한 라운드 기록만 트렌드로 표시합니다. 지표 탭 선택, 이동평균 오버레이, Best/Worst 마커를 지원합니다.</p>' +
      '<div class="sg35-tabs" id="sg35-trend-tabs"></div>' +
      '<div class="sg35-row"><span class="sg35-label">Score</span><input type="number" id="sg35-tr-score" min="50" max="200" style="width:70px">' +
      '<span class="sg35-label">Putts</span><input type="number" id="sg35-tr-putts" min="0" max="80" style="width:70px">' +
      '<span class="sg35-label">FIR%</span><input type="number" id="sg35-tr-fir" min="0" max="100" style="width:70px">' +
      '<span class="sg35-label">GIR%</span><input type="number" id="sg35-tr-gir" min="0" max="100" style="width:70px">' +
      '<span class="sg35-label">Penalties</span><input type="number" id="sg35-tr-pen" min="0" max="30" style="width:70px"></div>' +
      '<div class="sg35-row" style="margin-top:6px"><button class="sg35-btn sg35-btn-primary" onclick="window._sg35_trend_add()">&#x2795; 라운드 추가</button> <button class="sg35-btn sg35-btn-outline" onclick="window._sg35_trend_reset()">&#x21BB; 전체 삭제</button></div>' +
      '<div id="sg35-canvas-trend-wrap" class="sg35-canvas-wrap"></div>';

    window._sg35_trend_add = function() {
      var score = readNum('sg35-tr-score');
      var putts = readNum('sg35-tr-putts');
      var fir = readNum('sg35-tr-fir');
      var gir = readNum('sg35-tr-gir');
      var pen = readNum('sg35-tr-pen');
      if (score === null && putts === null && fir === null && gir === null && pen === null) {
        alert('라운드 기록을 하나 이상 입력하세요.'); return;
      }
      trendData.push({ round: trendData.length + 1, score: score, putts: putts, fir: fir, gir: gir, penalties: pen });
      LS('trend_data', trendData); SFX.trend_peak();
      ['sg35-tr-score', 'sg35-tr-putts', 'sg35-tr-fir', 'sg35-tr-gir', 'sg35-tr-pen'].forEach(function(id) {
        var el = document.getElementById(id); if (el) el.value = '';
      });
      render(trendData);
    };
    window._sg35_trend_reset = function() {
      trendData = [];
      LS('trend_data', trendData); render(trendData);
    };

    makeOverlay('sg35-trend', 'linear-gradient(135deg,#4a148c,#7b1fa2)', '&#x1F4C8; Performance Trend Line', html);
    setTimeout(function() {
      var tabsEl = document.getElementById('sg35-trend-tabs');
      if (tabsEl) {
        METRICS.forEach(function(m, mi) {
          var tab = document.createElement('button');
          tab.className = 'sg35-tab' + (mi === 0 ? ' active' : '');
          tab.textContent = m;
          tab.onclick = function() {
            activeMetric = mi;
            tabsEl.querySelectorAll('.sg35-tab').forEach(function(t) { t.classList.remove('active'); });
            tab.classList.add('active');
            SFX.trend_scan(); render(trendData);
          };
          tabsEl.appendChild(tab);
        });
      }
      render(trendData);
    }, 100);
    _checkAchievementsV35('trend_analyst');
  }

  // ===============================================================
  // 4. GOLF EQUIPMENT LIFE MANAGER - Canvas 600x380
  // ===============================================================
  function openEquipmentLifeManager() {
    SFX.equip_wear();
    var ITEMS = ['Driver','3-Wood','5-Wood','3-Hybrid','4-Iron','5-Iron','6-Iron','7-Iron','8-Iron','9-Iron','PW','GW','SW','LW','Bag','Shoes','Gloves'];
    var MAX_USAGE = [300,250,250,250,400,400,400,400,400,400,500,500,500,500,200,150,80];

    var equipData = LS('equip_data') || [];

    function render(d) {
      var cid = 'sg35-canvas-equip';
      var wrap = document.getElementById(cid + '-wrap');
      if (!wrap) return;
      wrap.innerHTML = '<canvas id="' + cid + '" width="600" height="380"></canvas>';
      var canvas = document.getElementById(cid);
      var ctx = canvas.getContext('2d');
      var W = 600, H = 380;
      ctx.fillStyle = cBg(); ctx.fillRect(0, 0, W, H);

      ctx.fillStyle = cText(); ctx.font = 'bold 14px sans-serif';
      ctx.fillText('Golf Equipment Life Manager - 17 Items', 20, 25);

      if (!d || !d.length) { drawEmpty(ctx, W, H, '장비 사용 횟수를 입력하면 표시됩니다'); return; }

      var barH = 16, gap = 3, startY = 45, startX = 80, maxBarW = W - startX - 80;
      var needReplace = 0;

      d.forEach(function(item, i) {
        var y = startY + i * (barH + gap);
        var entered = typeof item.usage === 'number';
        var wearPct = entered ? Math.min(100, Math.round(item.usage / item.maxUsage * 100)) : 0;

        // Label
        ctx.fillStyle = cMuted(); ctx.font = '9px sans-serif'; ctx.textAlign = 'right';
        ctx.fillText(item.name, startX - 6, y + barH / 2 + 3);
        ctx.textAlign = 'left';

        // Background bar
        ctx.fillStyle = isDark() ? '#333' : '#eee';
        ctx.fillRect(startX, y, maxBarW, barH);

        if (!entered) {
          ctx.fillStyle = cMuted(); ctx.font = '8px sans-serif';
          ctx.fillText('미입력', startX + 4, y + barH / 2 + 3);
          return;
        }

        // Wear bar with color gradient
        var barColor = wearPct >= 80 ? '#f44336' : (wearPct >= 60 ? '#ff9800' : (wearPct >= 40 ? '#ffc107' : '#4caf50'));
        ctx.fillStyle = barColor;
        ctx.fillRect(startX, y, maxBarW * wearPct / 100, barH);

        // Percentage text
        ctx.fillStyle = wearPct >= 50 ? '#fff' : cText();
        ctx.font = 'bold 8px sans-serif';
        var textX = maxBarW * wearPct / 100 > 50 ? startX + 4 : startX + maxBarW * wearPct / 100 + 4;
        ctx.fillText(wearPct + '% (' + item.usage + '/' + item.maxUsage + ')', textX, y + barH / 2 + 3);

        // Replacement warning icon
        if (wearPct >= 80) {
          ctx.fillStyle = '#f44336'; ctx.font = 'bold 10px sans-serif';
          ctx.fillText('!', W - 50, y + barH / 2 + 4);
          needReplace++;
        }
      });

      // Summary (입력된 장비만 집계)
      var entered = d.filter(function(item) { return typeof item.usage === 'number'; });
      ctx.fillStyle = cText(); ctx.font = 'bold 11px sans-serif'; ctx.textAlign = 'left';
      if (!entered.length) {
        ctx.fillText('입력된 장비 사용량이 없습니다', 20, H - 12);
      } else {
        var totalWear = entered.reduce(function(s, item) { return s + item.usage / item.maxUsage; }, 0) / entered.length * 100;
        ctx.fillText('Overall Wear: ' + Math.round(totalWear) + '%  |  Need Replacement: ' + needReplace + ' items  |  입력 ' + entered.length + '/' + d.length, 20, H - 12);
      }

      // Legend
      var legendX = W - 200;
      ctx.fillStyle = '#4caf50'; ctx.fillRect(legendX, H - 30, 8, 8);
      ctx.fillStyle = cText(); ctx.font = '8px sans-serif'; ctx.fillText('Good', legendX + 12, H - 23);
      ctx.fillStyle = '#ffc107'; ctx.fillRect(legendX + 50, H - 30, 8, 8);
      ctx.fillText('Fair', legendX + 62, H - 23);
      ctx.fillStyle = '#ff9800'; ctx.fillRect(legendX + 92, H - 30, 8, 8);
      ctx.fillText('Worn', legendX + 104, H - 23);
      ctx.fillStyle = '#f44336'; ctx.fillRect(legendX + 142, H - 30, 8, 8);
      ctx.fillText('Replace', legendX + 154, H - 23);
    }

    var equipInputs = ITEMS.map(function(item, i) {
      var cur = '';
      if (equipData.length === ITEMS.length && equipData[i] && typeof equipData[i].usage === 'number') cur = equipData[i].usage;
      return '<div class="sg35-row"><span class="sg35-label">' + item + '</span>' +
        '<input type="number" id="sg35-eq-in-' + i + '" min="0" step="1" value="' + cur + '" style="width:80px">' +
        '<span class="sg35-card-desc">회 사용 / 교체 기준 ' + MAX_USAGE[i] + '회(앱 설정값)</span></div>';
    }).join('');

    var html = '<div class="sg35-row"><span class="sg35-badge sg35-badge-orange">Canvas 600x380</span> <span class="sg35-badge sg35-badge-red">17 Items</span></div>' +
      '<p class="sg35-card-desc">14클럽 + 백 + 신발 + 글러브 17개 장비의 사용 횟수를 직접 입력하면 마모도를 수평 바 차트로 보여줍니다. 교체 기준 횟수는 앱이 정한 설정값입니다.</p>' +
      equipInputs +
      '<div class="sg35-row" style="margin-top:10px"><button class="sg35-btn sg35-btn-primary" onclick="window._sg35_equip_apply()">&#x2713; 사용량 저장</button> <button class="sg35-btn sg35-btn-outline" onclick="window._sg35_equip_reset()">&#x21BB; 전체 삭제</button></div>' +
      '<div id="sg35-canvas-equip-wrap" class="sg35-canvas-wrap"></div>';

    window._sg35_equip_apply = function() {
      var next = [], any = false;
      ITEMS.forEach(function(item, i) {
        var v = readNum('sg35-eq-in-' + i);
        if (v !== null) any = true;
        next.push({ name: item, usage: v === null ? null : Math.max(0, Math.round(v)), maxUsage: MAX_USAGE[i] });
      });
      if (!any) { alert('장비 사용 횟수를 하나 이상 입력하세요.'); return; }
      equipData = next;
      LS('equip_data', equipData); SFX.equip_replace(); render(equipData);
    };
    window._sg35_equip_reset = function() {
      equipData = [];
      LS('equip_data', equipData);
      ITEMS.forEach(function(_, i) { var el = document.getElementById('sg35-eq-in-' + i); if (el) el.value = ''; });
      render(equipData);
    };

    makeOverlay('sg35-equip', 'linear-gradient(135deg,#e65100,#ff9800)', '&#x1F3CC;&#xFE0F; Equipment Life Manager', html);
    setTimeout(function() { render(equipData); }, 100);
    _checkAchievementsV35('equipment_guardian');
  }

  // ===============================================================
  // 5. ROUND WEATHER CORRELATION - Canvas 620x400
  // ===============================================================
  function openWeatherCorrelation() {
    SFX.weather_scan();
    var weatherData = LS('weather_data') || [];

    function render(d) {
      var cid = 'sg35-canvas-weather';
      var wrap = document.getElementById(cid + '-wrap');
      if (!wrap) return;
      wrap.innerHTML = '<canvas id="' + cid + '" width="620" height="400"></canvas>';
      var canvas = document.getElementById(cid);
      var ctx = canvas.getContext('2d');
      var W = 620, H = 400;
      ctx.fillStyle = cBg(); ctx.fillRect(0, 0, W, H);

      ctx.fillStyle = cText(); ctx.font = 'bold 14px sans-serif';
      ctx.fillText('Round Weather Correlation Analysis', 20, 25);

      if (!d || !d.length) { drawEmpty(ctx, W, H, '라운드 날씨 기록을 추가하면 표시됩니다'); return; }

      // Scatter plot area (Temperature vs Score)
      var plotX = 60, plotY = 50, plotW = 320, plotH = 260;

      // X axis: Temperature 10~35
      // Y axis: Score (lower = better)
      var minTemp = 10, maxTemp = 35;
      var scores = d.map(function(r) { return r.score; });
      var minScore = Math.min.apply(null, scores) - 2;
      var maxScore = Math.max.apply(null, scores) + 2;

      // Grid
      for (var t = minTemp; t <= maxTemp; t += 5) {
        var tx = plotX + plotW * (t - minTemp) / (maxTemp - minTemp);
        ctx.strokeStyle = cGrid(); ctx.lineWidth = 0.5;
        ctx.beginPath(); ctx.moveTo(tx, plotY); ctx.lineTo(tx, plotY + plotH); ctx.stroke();
        ctx.fillStyle = cMuted(); ctx.font = '9px sans-serif'; ctx.textAlign = 'center';
        ctx.fillText(t + '&#176;C', tx, plotY + plotH + 14);
      }
      for (var s = Math.floor(minScore / 5) * 5; s <= maxScore; s += 5) {
        var sy = plotY + plotH - plotH * (s - minScore) / (maxScore - minScore);
        ctx.strokeStyle = cGrid(); ctx.lineWidth = 0.5;
        ctx.beginPath(); ctx.moveTo(plotX, sy); ctx.lineTo(plotX + plotW, sy); ctx.stroke();
        ctx.fillStyle = cMuted(); ctx.font = '9px sans-serif'; ctx.textAlign = 'right';
        ctx.fillText(s, plotX - 6, sy + 3);
      }
      ctx.textAlign = 'left';

      // Scatter dots
      d.forEach(function(r) {
        var px = plotX + plotW * (r.temp - minTemp) / (maxTemp - minTemp);
        var py = plotY + plotH - plotH * (r.score - minScore) / (maxScore - minScore);

        var dotColor = r.score <= 80 ? '#4caf50' : (r.score <= 88 ? '#ff9800' : '#f44336');
        ctx.fillStyle = dotColor;
        ctx.globalAlpha = 0.7;
        ctx.beginPath(); ctx.arc(px, py, 6, 0, Math.PI * 2); ctx.fill();
        ctx.globalAlpha = 1;
      });

      // Axis labels
      ctx.fillStyle = cMuted(); ctx.font = '11px sans-serif'; ctx.textAlign = 'center';
      ctx.fillText('Temperature', plotX + plotW / 2, plotY + plotH + 30);
      ctx.save();
      ctx.translate(15, plotY + plotH / 2);
      ctx.rotate(-Math.PI / 2);
      ctx.fillText('Score', 0, 0);
      ctx.restore();

      // 4-axis analysis panel (right side)
      var panelX = 410, panelY = 50;
      ctx.fillStyle = cText(); ctx.font = 'bold 12px sans-serif';
      ctx.fillText('4-Axis Analysis', panelX, panelY);

      var axes = [
        { name: 'Temperature', key: 'temp', unit: '&#176;C', color: '#f44336' },
        { name: 'Wind Speed', key: 'wind', unit: 'km/h', color: '#2196f3' },
        { name: 'Humidity', key: 'humidity', unit: '%', color: '#4caf50' },
        { name: 'Rain Prob', key: 'rain', unit: '%', color: '#9c27b0' }
      ];

      axes.forEach(function(axis, ai) {
        var ay = panelY + 25 + ai * 55;
        var vals = d.map(function(r) { return r[axis.key]; }).filter(function(v) { return typeof v === 'number' && !isNaN(v); });

        ctx.fillStyle = axis.color; ctx.fillRect(panelX, ay, 8, 8);
        ctx.fillStyle = cText(); ctx.font = 'bold 10px sans-serif';
        ctx.fillText(axis.name, panelX + 14, ay + 8);

        if (!vals.length) {
          ctx.fillStyle = cMuted(); ctx.font = '9px sans-serif';
          ctx.fillText('미입력', panelX + 14, ay + 22);
          return;
        }

        var avg = vals.reduce(function(s, v) { return s + v; }, 0) / vals.length;
        var min = Math.min.apply(null, vals);
        var max = Math.max.apply(null, vals);

        ctx.fillStyle = cMuted(); ctx.font = '9px sans-serif';
        ctx.fillText('Avg: ' + avg.toFixed(1) + axis.unit + '  Min: ' + min + '  Max: ' + max, panelX + 14, ay + 22);

        // Mini bar for average
        ctx.fillStyle = isDark() ? '#333' : '#eee';
        ctx.fillRect(panelX + 14, ay + 28, 170, 6);
        var barMax = axis.key === 'temp' ? 40 : 100;
        ctx.fillStyle = axis.color;
        ctx.fillRect(panelX + 14, ay + 28, Math.max(0, Math.min(170, 170 * avg / barMax)), 6);
      });

      // Best/Worst weather identification
      var bestRound = d.slice().sort(function(a, b) { return a.score - b.score; })[0];
      var worstRound = d.slice().sort(function(a, b) { return b.score - a.score; })[0];

      var windTxt = function(r) { return (typeof r.wind === 'number' && !isNaN(r.wind)) ? 'W' + r.wind : 'W-'; };
      ctx.fillStyle = '#4caf50'; ctx.font = 'bold 10px sans-serif';
      ctx.fillText('Best: ' + bestRound.score + ' (' + bestRound.temp + 'C, ' + windTxt(bestRound) + ')', panelX, H - 50);
      ctx.fillStyle = '#f44336';
      ctx.fillText('Worst: ' + worstRound.score + ' (' + worstRound.temp + 'C, ' + windTxt(worstRound) + ')', panelX, H - 34);

      // 표본 수만 표기 (지어낸 이력에서 파생된 "Optimal Temp" 주장은 삭제)
      ctx.fillStyle = cMuted(); ctx.font = '10px sans-serif';
      ctx.fillText('입력한 ' + d.length + '라운드 기준', panelX, H - 14);
      if (d.length >= 5) _checkAchievementsV35('weather_best');

      // Dot legend
      ctx.fillStyle = '#4caf50'; ctx.beginPath(); ctx.arc(20, H - 42, 5, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = cText(); ctx.font = '9px sans-serif'; ctx.fillText('<=80', 30, H - 38);
      ctx.fillStyle = '#ff9800'; ctx.beginPath(); ctx.arc(70, H - 42, 5, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = cText(); ctx.fillText('81-88', 80, H - 38);
      ctx.fillStyle = '#f44336'; ctx.beginPath(); ctx.arc(125, H - 42, 5, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = cText(); ctx.fillText('89+', 135, H - 38);
    }

    var html = '<div class="sg35-row"><span class="sg35-badge sg35-badge-teal">Canvas 620x400</span> <span class="sg35-badge sg35-badge-blue">4-Axis</span></div>' +
      '<p class="sg35-card-desc">라운드마다 기온/풍속/습도/강수확률과 스코어를 직접 입력하면 산점도로 표시합니다. 기온과 스코어는 필수입니다.</p>' +
      '<div class="sg35-row"><span class="sg35-label">기온(C)</span><input type="number" id="sg35-wt-temp" style="width:70px">' +
      '<span class="sg35-label">풍속(km/h)</span><input type="number" id="sg35-wt-wind" min="0" style="width:70px">' +
      '<span class="sg35-label">습도(%)</span><input type="number" id="sg35-wt-hum" min="0" max="100" style="width:70px"></div>' +
      '<div class="sg35-row"><span class="sg35-label">강수확률(%)</span><input type="number" id="sg35-wt-rain" min="0" max="100" style="width:70px">' +
      '<span class="sg35-label">스코어</span><input type="number" id="sg35-wt-score" min="50" max="200" style="width:70px"></div>' +
      '<div class="sg35-row" style="margin-top:10px"><button class="sg35-btn sg35-btn-primary" onclick="window._sg35_weather_add()">&#x2795; 라운드 추가</button> <button class="sg35-btn sg35-btn-outline" onclick="window._sg35_weather_reset()">&#x21BB; 전체 삭제</button></div>' +
      '<div id="sg35-canvas-weather-wrap" class="sg35-canvas-wrap"></div>';

    window._sg35_weather_add = function() {
      var temp = readNum('sg35-wt-temp');
      var score = readNum('sg35-wt-score');
      if (temp === null || score === null) { alert('기온과 스코어는 반드시 입력해야 합니다.'); return; }
      weatherData.push({
        temp: temp, wind: readNum('sg35-wt-wind'), humidity: readNum('sg35-wt-hum'),
        rain: readNum('sg35-wt-rain'), score: score
      });
      LS('weather_data', weatherData); SFX.weather_best();
      ['sg35-wt-temp', 'sg35-wt-wind', 'sg35-wt-hum', 'sg35-wt-rain', 'sg35-wt-score'].forEach(function(id) {
        var el = document.getElementById(id); if (el) el.value = '';
      });
      render(weatherData);
    };
    window._sg35_weather_reset = function() {
      weatherData = [];
      LS('weather_data', weatherData); render(weatherData);
    };

    makeOverlay('sg35-weather', 'linear-gradient(135deg,#00695c,#26a69a)', '&#x26C5; Weather Correlation', html);
    setTimeout(function() { render(weatherData); }, 100);
    _checkAchievementsV35('weather_analyst');
  }

  // ===============================================================
  // 6. SCORECARD HEATMAP GENERATOR - Canvas 620x380
  // ===============================================================
  function openScorecardHeatmap() {
    SFX.heatmap_log();
    var PARS = [4,4,3,5,4,4,3,4,5,4,4,3,5,4,4,3,4,5];
    var heatmapData = LS('heatmap_data') || [];

    function render(d) {
      var cid = 'sg35-canvas-heatmap';
      var wrap = document.getElementById(cid + '-wrap');
      if (!wrap) return;
      wrap.innerHTML = '<canvas id="' + cid + '" width="620" height="380"></canvas>';
      var canvas = document.getElementById(cid);
      var ctx = canvas.getContext('2d');
      var W = 620, H = 380;
      ctx.fillStyle = cBg(); ctx.fillRect(0, 0, W, H);

      ctx.fillStyle = cText(); ctx.font = 'bold 14px sans-serif';
      ctx.fillText('Scorecard Heatmap - 18 Holes x ' + d.length + ' Rounds', 20, 25);

      if (!d || !d.length) { drawEmpty(ctx, W, H, '라운드 스코어를 입력하면 표시됩니다'); return; }

      var cellW = 28, cellH = 22, startX = 60, startY = 55;

      // Column headers (holes)
      for (var h = 0; h < 18; h++) {
        var hx = startX + h * (cellW + 2);
        ctx.fillStyle = cMuted(); ctx.font = 'bold 8px sans-serif'; ctx.textAlign = 'center';
        ctx.fillText('H' + (h + 1), hx + cellW / 2, startY - 6);
      }

      // Row headers (rounds) + cells
      d.forEach(function(round, ri) {
        var ry = startY + ri * (cellH + 2);
        ctx.fillStyle = cMuted(); ctx.font = '9px sans-serif'; ctx.textAlign = 'right';
        ctx.fillText('R' + (ri + 1), startX - 6, ry + cellH / 2 + 3);

        round.forEach(function(score, hi) {
          var hx = startX + hi * (cellW + 2);
          var par = PARS[hi];
          var diff = score - par;

          // Color based on score vs par
          var cellColor;
          if (diff <= -2) cellColor = '#1565c0'; // Eagle or better = dark blue
          else if (diff === -1) cellColor = '#42a5f5'; // Birdie = blue
          else if (diff === 0) cellColor = '#4caf50'; // Par = green
          else if (diff === 1) cellColor = '#ffc107'; // Bogey = yellow
          else if (diff === 2) cellColor = '#ff9800'; // Double = orange
          else cellColor = '#f44336'; // Triple+ = red

          ctx.fillStyle = cellColor;
          ctx.fillRect(hx, ry, cellW, cellH);
          ctx.strokeStyle = isDark() ? '#555' : '#fff';
          ctx.lineWidth = 0.5;
          ctx.strokeRect(hx, ry, cellW, cellH);

          ctx.fillStyle = diff >= 2 || diff <= -2 ? '#fff' : (isDark() ? '#fff' : '#333');
          ctx.font = 'bold 9px sans-serif'; ctx.textAlign = 'center';
          ctx.fillText(score, hx + cellW / 2, ry + cellH / 2 + 3);
        });
      });
      ctx.textAlign = 'left';

      // Par row
      var parY = startY + d.length * (cellH + 2) + 5;
      ctx.fillStyle = cMuted(); ctx.font = 'bold 8px sans-serif'; ctx.textAlign = 'right';
      ctx.fillText('Par', startX - 6, parY + 10);
      PARS.forEach(function(p, hi) {
        var hx = startX + hi * (cellW + 2);
        ctx.fillStyle = isDark() ? '#333' : '#e0e0e0';
        ctx.fillRect(hx, parY, cellW, 14);
        ctx.fillStyle = cText(); ctx.font = 'bold 8px sans-serif'; ctx.textAlign = 'center';
        ctx.fillText(p, hx + cellW / 2, parY + 10);
      });
      ctx.textAlign = 'left';

      // Legend
      var legY = parY + 28;
      var legColors = [['Eagle-','#1565c0'],['Birdie','#42a5f5'],['Par','#4caf50'],['Bogey','#ffc107'],['Dbl','#ff9800'],['Trp+','#f44336']];
      legColors.forEach(function(lc, li) {
        var lx = 20 + li * 95;
        ctx.fillStyle = lc[1]; ctx.fillRect(lx, legY, 10, 10);
        ctx.fillStyle = cText(); ctx.font = '9px sans-serif';
        ctx.fillText(lc[0], lx + 14, legY + 9);
      });

      // Strength/Weakness analysis
      var holeAvgs = [];
      for (var hi = 0; hi < 18; hi++) {
        var sum = 0;
        d.forEach(function(round) { sum += round[hi] - PARS[hi]; });
        holeAvgs.push(sum / d.length);
      }
      var bestHole = holeAvgs.indexOf(Math.min.apply(null, holeAvgs));
      var worstHole = holeAvgs.indexOf(Math.max.apply(null, holeAvgs));

      ctx.font = 'bold 10px sans-serif';
      ctx.fillStyle = '#4caf50';
      ctx.fillText('Strength: H' + (bestHole + 1) + ' (avg ' + (PARS[bestHole] + holeAvgs[bestHole]).toFixed(1) + ')', 20, legY + 28);
      ctx.fillStyle = '#f44336';
      ctx.fillText('Weakness: H' + (worstHole + 1) + ' (avg ' + (PARS[worstHole] + holeAvgs[worstHole]).toFixed(1) + ')', 250, legY + 28);
    }

    var holeInputs = PARS.map(function(p, i) {
      return '<div style="display:inline-block;text-align:center;margin:2px 4px">' +
        '<div style="font-size:10px;color:var(--text-muted,#666)">H' + (i + 1) + ' (P' + p + ')</div>' +
        '<input type="number" id="sg35-hm-in-' + i + '" min="1" max="15" style="width:46px">' +
        '</div>';
    }).join('');

    var html = '<div class="sg35-row"><span class="sg35-badge sg35-badge-green">Canvas 620x380</span> <span class="sg35-badge sg35-badge-amber">18 Holes</span></div>' +
      '<p class="sg35-card-desc">라운드별 18홀 스코어를 직접 입력해 추가하세요. 버디=파랑, 파=초록, 보기=노랑, 더블+=빨강으로 표시합니다.</p>' +
      '<div style="margin:6px 0">' + holeInputs + '</div>' +
      '<div class="sg35-row" style="margin-top:10px"><button class="sg35-btn sg35-btn-primary" onclick="window._sg35_heatmap_add()">&#x2795; 라운드 추가</button> <button class="sg35-btn sg35-btn-outline" onclick="window._sg35_heatmap_reset()">&#x21BB; 전체 삭제</button></div>' +
      '<div id="sg35-canvas-heatmap-wrap" class="sg35-canvas-wrap"></div>';

    window._sg35_heatmap_add = function() {
      var row = [], missing = [];
      PARS.forEach(function(p, i) {
        var v = readNum('sg35-hm-in-' + i);
        if (v === null) missing.push(i + 1);
        row.push(v === null ? null : Math.max(1, Math.round(v)));
      });
      if (missing.length) { alert('18홀 스코어를 모두 입력하세요. 미입력: H' + missing.join(', H')); return; }
      heatmapData.push(row);
      LS('heatmap_data', heatmapData); SFX.heatmap_log();
      PARS.forEach(function(_, i) { var el = document.getElementById('sg35-hm-in-' + i); if (el) el.value = ''; });
      render(heatmapData);
    };
    window._sg35_heatmap_reset = function() {
      heatmapData = [];
      LS('heatmap_data', heatmapData); render(heatmapData);
    };

    makeOverlay('sg35-heatmap', 'linear-gradient(135deg,#bf360c,#ff5722)', '&#x1F5FA;&#xFE0F; Scorecard Heatmap', html);
    setTimeout(function() { render(heatmapData); }, 100);
    _checkAchievementsV35('heatmap_creator');
  }

  // ===============================================================
  // 7. GOLF BODY TYPE ANALYZER - Canvas 600x380
  // ===============================================================
  function openBodyTypeAnalyzer() {
    SFX.body_scan();
    var bodyData = LS('body_data') || null;
    var BODY_FIELDS = [
      { id: 'height', label: '키(cm)', min: 100, max: 230 },
      { id: 'weight', label: '몸무게(kg)', min: 30, max: 200 },
      { id: 'armLen', label: '팔길이(cm)', min: 30, max: 110 },
      { id: 'legLen', label: '다리길이(cm)', min: 40, max: 140 },
      { id: 'flexibility', label: '유연성(1~10)', min: 1, max: 10 }
    ];

    function classify(bd) {
      var bmi = bd.weight / ((bd.height / 100) * (bd.height / 100));
      var ratio = bd.armLen / bd.legLen;
      if (bmi >= 27 && bd.flexibility <= 4) return { type: 'Power', color: '#f44336', desc: 'Strong build, maximize torque. Use stiffer shafts, heavier clubhead.', swing: 'Compact backswing, strong rotation' };
      if (bd.flexibility >= 8 && ratio > 0.72) return { type: 'Flexible', color: '#9c27b0', desc: 'Great range of motion. Use regular flex, lighter clubs.', swing: 'Full extension, wide arc' };
      if (bd.height >= 185 && bd.armLen >= 70) return { type: 'Technical', color: '#2196f3', desc: 'Tall frame suits upright plane. +1 inch clubs, upright lie.', swing: 'Upright plane, smooth tempo' };
      if (bd.height <= 170 && bd.weight <= 70) return { type: 'Compact', color: '#ff9800', desc: 'Lower center of gravity. Standard or -0.5 inch clubs.', swing: 'Flat plane, quick hip turn' };
      return { type: 'Balanced', color: '#4caf50', desc: 'Well-proportioned build. Standard specs recommended.', swing: 'Neutral plane, balanced tempo' };
    }

    function render(bd) {
      var cid = 'sg35-canvas-body';
      var wrap = document.getElementById(cid + '-wrap');
      if (!wrap) return;
      wrap.innerHTML = '<canvas id="' + cid + '" width="600" height="380"></canvas>';
      var canvas = document.getElementById(cid);
      var ctx = canvas.getContext('2d');
      var W = 600, H = 380;
      ctx.fillStyle = cBg(); ctx.fillRect(0, 0, W, H);

      ctx.fillStyle = cText(); ctx.font = 'bold 14px sans-serif';
      ctx.fillText('Golf Body Type Analysis', 20, 25);

      if (!bd) { drawEmpty(ctx, W, H, '신체 정보를 입력하면 표시됩니다'); return; }

      // 5-axis radar chart
      var AXES = ['Height', 'Weight', 'Arm Length', 'Leg Length', 'Flexibility'];
      var maxVals = [200, 120, 85, 110, 10];
      var values = [bd.height, bd.weight, bd.armLen, bd.legLen, bd.flexibility];
      var normalized = values.map(function(v, i) { return Math.min(1, v / maxVals[i]); });

      var cx = 170, cy = 195, maxR = 110;
      var angleStep = (Math.PI * 2) / 5;
      var radarColors = ['#e91e63', '#2196f3', '#4caf50', '#ff9800', '#9c27b0'];

      // Grid
      for (var r = 0.2; r <= 1; r += 0.2) {
        ctx.strokeStyle = cGrid(); ctx.lineWidth = 0.5;
        ctx.beginPath();
        for (var a = 0; a < 5; a++) {
          var gx = cx + Math.cos(angleStep * a - Math.PI / 2) * maxR * r;
          var gy = cy + Math.sin(angleStep * a - Math.PI / 2) * maxR * r;
          if (a === 0) ctx.moveTo(gx, gy); else ctx.lineTo(gx, gy);
        }
        ctx.closePath(); ctx.stroke();
      }

      // Axes and labels
      AXES.forEach(function(ax, i) {
        var angle = angleStep * i - Math.PI / 2;
        var ex = cx + Math.cos(angle) * maxR;
        var ey = cy + Math.sin(angle) * maxR;
        ctx.strokeStyle = cGrid(); ctx.lineWidth = 0.5;
        ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(ex, ey); ctx.stroke();

        var lx = cx + Math.cos(angle) * (maxR + 22);
        var ly = cy + Math.sin(angle) * (maxR + 22);
        ctx.fillStyle = radarColors[i]; ctx.font = 'bold 9px sans-serif';
        ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.fillText(ax, lx, ly);
      });
      ctx.textAlign = 'left'; ctx.textBaseline = 'alphabetic';

      // Data polygon
      ctx.fillStyle = isDark() ? 'rgba(33,150,243,0.2)' : 'rgba(33,150,243,0.12)';
      ctx.strokeStyle = '#2196f3'; ctx.lineWidth = 2.5;
      ctx.beginPath();
      normalized.forEach(function(v, i) {
        var angle = angleStep * i - Math.PI / 2;
        var px = cx + Math.cos(angle) * maxR * v;
        var py = cy + Math.sin(angle) * maxR * v;
        if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
      });
      ctx.closePath(); ctx.fill(); ctx.stroke();

      // Data points
      normalized.forEach(function(v, i) {
        var angle = angleStep * i - Math.PI / 2;
        var px = cx + Math.cos(angle) * maxR * v;
        var py = cy + Math.sin(angle) * maxR * v;
        ctx.fillStyle = radarColors[i];
        ctx.beginPath(); ctx.arc(px, py, 5, 0, Math.PI * 2); ctx.fill();
      });

      // Body type classification
      var result = classify(bd);
      ctx.fillStyle = result.color; ctx.font = 'bold 22px sans-serif';
      ctx.fillText(result.type, 340, 65);

      ctx.fillStyle = cText(); ctx.font = '11px sans-serif';
      // Input values
      ctx.fillText('Height: ' + bd.height + 'cm', 340, 95);
      ctx.fillText('Weight: ' + bd.weight + 'kg', 340, 115);
      ctx.fillText('Arm: ' + bd.armLen + 'cm', 340, 135);
      ctx.fillText('Leg: ' + bd.legLen + 'cm', 340, 155);
      ctx.fillText('Flexibility: ' + bd.flexibility + '/10', 340, 175);

      // Recommendations
      ctx.fillStyle = cText(); ctx.font = 'bold 12px sans-serif';
      ctx.fillText('Recommendation', 340, 210);
      ctx.font = '10px sans-serif'; ctx.fillStyle = cMuted();
      // Word wrap description
      var words = result.desc.split(' ');
      var line = '', lineY = 230;
      words.forEach(function(w) {
        var test = line + w + ' ';
        if (ctx.measureText(test).width > 230) {
          ctx.fillText(line.trim(), 340, lineY);
          line = w + ' '; lineY += 16;
        } else { line = test; }
      });
      if (line.trim()) ctx.fillText(line.trim(), 340, lineY);

      ctx.fillStyle = result.color; ctx.font = 'bold 10px sans-serif';
      ctx.fillText('Swing: ' + result.swing, 340, lineY + 22);

      // BMI info
      var bmi = bd.weight / ((bd.height / 100) * (bd.height / 100));
      ctx.fillStyle = cMuted(); ctx.font = '10px sans-serif';
      ctx.fillText('BMI: ' + bmi.toFixed(1), 340, H - 20);
    }

    var bodyInputs = BODY_FIELDS.map(function(f) {
      var v = (bodyData && typeof bodyData[f.id] === 'number') ? bodyData[f.id] : '';
      return '<div class="sg35-row"><span class="sg35-label">' + f.label + '</span>' +
        '<input type="number" id="sg35-bd-' + f.id + '" min="' + f.min + '" max="' + f.max + '" value="' + v + '" style="width:90px"></div>';
    }).join('');

    var html = '<div class="sg35-row"><span class="sg35-badge sg35-badge-purple">Canvas 600x380</span> <span class="sg35-badge sg35-badge-pink">5-Axis</span></div>' +
      '<p class="sg35-card-desc">신장/체중/팔길이/다리길이/유연성을 직접 입력하면 체형을 분류합니다. Power/Technical/Balanced/Flexible/Compact 5가지 타입 중 추천 스윙과 클럽 스펙을 안내합니다.</p>' +
      bodyInputs +
      '<div class="sg35-row" style="margin-top:10px"><button class="sg35-btn sg35-btn-primary" onclick="window._sg35_body_apply()">&#x2713; 분석</button> <button class="sg35-btn sg35-btn-outline" onclick="window._sg35_body_reset()">&#x21BB; 초기화</button></div>' +
      '<div id="sg35-canvas-body-wrap" class="sg35-canvas-wrap"></div>';

    window._sg35_body_apply = function() {
      var next = {}, missing = [];
      BODY_FIELDS.forEach(function(f) {
        var v = readNum('sg35-bd-' + f.id);
        if (v === null) missing.push(f.label);
        next[f.id] = v;
      });
      if (missing.length) { alert('다음 항목을 입력하세요: ' + missing.join(', ')); return; }
      bodyData = next;
      LS('body_data', bodyData); SFX.body_scan(); render(bodyData);
    };
    window._sg35_body_reset = function() {
      bodyData = null;
      LS('body_data', null);
      BODY_FIELDS.forEach(function(f) { var el = document.getElementById('sg35-bd-' + f.id); if (el) el.value = ''; });
      render(bodyData);
    };

    makeOverlay('sg35-body', 'linear-gradient(135deg,#6a1b9a,#ab47bc)', '&#x1F9CD; Body Type Analyzer', html);
    setTimeout(function() { render(bodyData); }, 100);
    _checkAchievementsV35('body_analyst');
  }

  // ===============================================================
  // 8. ROUND GOAL ACHIEVEMENT RATE - Canvas 620x380
  // ===============================================================
  function openGoalAchievementRate() {
    SFX.goal_set();
    var GOAL_NAMES = ['Score Target', 'FIR%', 'GIR%', 'Total Putts', 'Par Saves', 'Bogey-Free', 'Up&Down%', 'Penalties<N'];
    var GOAL_COLORS = ['#2196f3', '#4caf50', '#9c27b0', '#ff9800', '#00bcd4', '#e91e63', '#795548', '#f44336'];

    var goalData = LS('goal_data') || null;

    var goalHistory = LS('goal_history') || [];

    // 목표/실제가 모두 입력된 항목만 집계한다.
    function calcAchievement(targets, actuals) {
      var achieved = 0, counted = 0;
      targets.forEach(function(t, i) {
        var a = actuals[i];
        if (typeof t !== 'number' || typeof a !== 'number') return;
        counted++;
        if (i === 0 || i === 3 || i === 7) { if (a <= t) achieved++; }
        else { if (a >= t) achieved++; }
      });
      return { achieved: achieved, counted: counted };
    }

    function render(gd) {
      var cid = 'sg35-canvas-goal';
      var wrap = document.getElementById(cid + '-wrap');
      if (!wrap) return;
      wrap.innerHTML = '<canvas id="' + cid + '" width="620" height="380"></canvas>';
      var canvas = document.getElementById(cid);
      var ctx = canvas.getContext('2d');
      var W = 620, H = 380;
      ctx.fillStyle = cBg(); ctx.fillRect(0, 0, W, H);

      ctx.fillStyle = cText(); ctx.font = 'bold 14px sans-serif';
      ctx.fillText('Round Goal Achievement Rate', 20, 25);

      if (!gd) { drawEmpty(ctx, W, H, '목표와 실제 값을 입력하면 표시됩니다'); return; }

      var res = calcAchievement(gd.targets, gd.actuals);
      if (!res.counted) { drawEmpty(ctx, W, H, '목표와 실제 값을 입력하면 표시됩니다'); return; }
      var achieved = res.achieved;
      var pct = Math.round(achieved / res.counted * 100);
      var g = grade(pct);

      function goalMet(i) {
        var t = gd.targets[i], a = gd.actuals[i];
        if (typeof t !== 'number' || typeof a !== 'number') return null;
        return (i === 0 || i === 3 || i === 7) ? a <= t : a >= t;
      }

      // Donut chart
      var donutX = 150, donutY = 185, outerR = 100, innerR = 55;
      var startAngle = -Math.PI / 2;

      gd.targets.forEach(function(t, i) {
        var angle = (Math.PI * 2) / gd.targets.length;
        var isAchieved = goalMet(i);

        ctx.fillStyle = isAchieved ? GOAL_COLORS[i] : (isDark() ? '#333' : '#e0e0e0');
        ctx.beginPath();
        ctx.arc(donutX, donutY, outerR, startAngle, startAngle + angle);
        ctx.arc(donutX, donutY, innerR, startAngle + angle, startAngle, true);
        ctx.closePath();
        ctx.fill();

        // Segment border
        ctx.strokeStyle = isDark() ? '#1a1a1a' : '#fff';
        ctx.lineWidth = 2;
        ctx.stroke();

        startAngle += angle;
      });

      // Center text
      ctx.fillStyle = g.c; ctx.font = 'bold 28px sans-serif'; ctx.textAlign = 'center';
      ctx.fillText(pct + '%', donutX, donutY - 5);
      ctx.font = 'bold 14px sans-serif';
      ctx.fillText(g.g, donutX, donutY + 18);
      ctx.font = '10px sans-serif'; ctx.fillStyle = cMuted();
      ctx.fillText(achieved + '/' + res.counted + ' goals', donutX, donutY + 34);
      ctx.textAlign = 'left';

      // Goal details panel (right side)
      var panelX = 290, panelY = 50;
      ctx.fillStyle = cText(); ctx.font = 'bold 12px sans-serif';
      ctx.fillText('Goal Details', panelX, panelY);

      gd.targets.forEach(function(t, i) {
        var y = panelY + 20 + i * 32;
        var isAchieved = goalMet(i);
        var a = gd.actuals[i];

        ctx.fillStyle = GOAL_COLORS[i]; ctx.fillRect(panelX, y, 8, 8);
        ctx.fillStyle = cText(); ctx.font = 'bold 10px sans-serif';
        ctx.fillText(GOAL_NAMES[i], panelX + 14, y + 8);

        ctx.fillStyle = isAchieved === null ? cMuted() : (isAchieved ? '#4caf50' : '#f44336');
        ctx.font = '9px sans-serif';
        var actualStr = typeof a === 'number' ? a : '-';
        var targetStr = typeof t === 'number' ? t : '-';
        var symbol = isAchieved === null ? '' : (isAchieved ? ' ✓' : ' ✗');
        ctx.fillText('Actual: ' + actualStr + ' / Target: ' + targetStr + symbol, panelX + 14, y + 22);

        // Mini progress bar
        var barX = panelX + 200, barW = 100;
        var progress = 0;
        if (isAchieved !== null) {
          if (i === 0 || i === 3 || i === 7) {
            progress = Math.min(1, t / Math.max(1, a));
          } else {
            progress = Math.min(1, a / Math.max(1, t));
          }
        }
        ctx.fillStyle = isDark() ? '#333' : '#eee';
        ctx.fillRect(barX, y, barW, 8);
        ctx.fillStyle = isAchieved ? '#4caf50' : GOAL_COLORS[i];
        ctx.fillRect(barX, y, barW * progress, 8);
      });

      // History summary
      ctx.fillStyle = cText(); ctx.font = 'bold 11px sans-serif';
      ctx.fillText('History: ' + goalHistory.length + ' rounds tracked', 20, H - 15);

      if (pct >= 75) _checkAchievementsV35('goal_achiever');
    }

    var goalInputs = GOAL_NAMES.map(function(name, i) {
      var t = (goalData && typeof goalData.targets[i] === 'number') ? goalData.targets[i] : '';
      var a = (goalData && typeof goalData.actuals[i] === 'number') ? goalData.actuals[i] : '';
      return '<div class="sg35-row"><span class="sg35-label">' + name + '</span>' +
        '<span class="sg35-card-desc">목표</span><input type="number" id="sg35-gl-t-' + i + '" value="' + t + '" style="width:70px">' +
        '<span class="sg35-card-desc">실제</span><input type="number" id="sg35-gl-a-' + i + '" value="' + a + '" style="width:70px"></div>';
    }).join('');

    var html = '<div class="sg35-row"><span class="sg35-badge sg35-badge-pink">Canvas 620x380</span> <span class="sg35-badge sg35-badge-blue">8 Goals</span></div>' +
      '<p class="sg35-card-desc">8개 목표(스코어/FIR/GIR/퍼팅/파세이브/보기프리/업앤다운/페널티)의 목표값과 실제값을 직접 입력하세요. 두 값이 모두 입력된 항목만 달성률에 반영됩니다.</p>' +
      goalInputs +
      '<div class="sg35-row" style="margin-top:10px"><button class="sg35-btn sg35-btn-primary" onclick="window._sg35_goal_apply()">&#x2713; 적용</button> <button class="sg35-btn sg35-btn-outline" onclick="window._sg35_goal_save()">&#x1F4BE; 기록 저장</button> <button class="sg35-btn sg35-btn-outline" onclick="window._sg35_goal_reset()">&#x21BB; 초기화</button></div>' +
      '<div id="sg35-canvas-goal-wrap" class="sg35-canvas-wrap"></div>';

    window._sg35_goal_apply = function() {
      var targets = [], actuals = [], any = false;
      GOAL_NAMES.forEach(function(_, i) {
        var t = readNum('sg35-gl-t-' + i);
        var a = readNum('sg35-gl-a-' + i);
        if (t !== null && a !== null) any = true;
        targets.push(t);
        actuals.push(a);
      });
      if (!any) { alert('목표와 실제 값을 모두 입력한 항목이 최소 1개 필요합니다.'); return; }
      goalData = { targets: targets, actuals: actuals };
      LS('goal_data', goalData); SFX.goal_achieve(); render(goalData);
    };
    window._sg35_goal_save = function() {
      if (!goalData) { alert('먼저 목표와 실제 값을 입력하고 [적용]을 누르세요.'); return; }
      var res = calcAchievement(goalData.targets, goalData.actuals);
      if (!res.counted) { alert('저장할 목표 기록이 없습니다.'); return; }
      goalHistory.push({ date: new Date().toISOString().slice(0, 10), achieved: res.achieved, total: res.counted });
      if (goalHistory.length > 30) goalHistory = goalHistory.slice(-30);
      LS('goal_history', goalHistory); SFX.goal_set();
      render(goalData);
    };
    window._sg35_goal_reset = function() {
      goalData = null;
      LS('goal_data', null);
      GOAL_NAMES.forEach(function(_, i) {
        var te = document.getElementById('sg35-gl-t-' + i); if (te) te.value = '';
        var ae = document.getElementById('sg35-gl-a-' + i); if (ae) ae.value = '';
      });
      render(goalData);
    };

    makeOverlay('sg35-goal', 'linear-gradient(135deg,#ad1457,#f06292)', '&#x1F3AF; Goal Achievement Rate', html);
    setTimeout(function() { render(goalData); }, 100);
    _checkAchievementsV35('goal_opened');
  }

  // ===============================================================
  // GOLF IQ v19 - 15 Questions
  // ===============================================================
  function openGolfIQv19() {
    SFX.quiz_v19();
    var questions = [
      { q: '이상적인 스윙 플레인 각도는 대략 몇 도인가?', o: ['45-50도', '55-60도', '68-72도', '80-85도'], a: 2 },
      { q: '드라이버 최적 런치 앵글(Launch Angle)은?', o: ['8-10도', '10.5-13도', '15-18도', '20-22도'], a: 1 },
      { q: '스핀축 틸트(Spin Axis Tilt)가 양수이면 공은 어느 방향으로 휘는가?', o: ['좌측(훅)', '우측(슬라이스)', '높이 뜸', '낮게 깔림'], a: 1 },
      { q: '디봇(Divot) 수리 시 올바른 방법은?', o: ['떼어낸 잔디를 다시 덮는다', '모래로 채운다', '가장자리를 안쪽으로 밀어 넣는다', '그대로 둔다'], a: 2 },
      { q: 'OB 발생 시 새로운 로컬룰(2019) 드롭 절차는?', o: ['OB 지점에서 2클럽 이내 드롭, 2벌타', 'OB 지점에서 1클럽 이내 드롭, 1벌타', '티잉구역에서 재 티샷, 거리벌', '가장 가까운 페어웨이에서 드롭, 1벌타'], a: 0 },
      { q: '언플레이어블(Unplayable) 선언 시 옵션이 아닌 것은?', o: ['2클럽 이내 드롭', '볼과 홀 잇는 선 후방 드롭', '직전 샷 위치에서 재플레이', '가장 가까운 페어웨이로 이동'], a: 3 },
      { q: '코스 레이팅(Course Rating)과 슬로프 레이팅(Slope Rating)의 차이는?', o: ['코스 레이팅은 스크래치 골퍼 기준, 슬로프는 보기 골퍼 대비 난이도', '둘 다 동일한 의미', '슬로프가 코스 레이팅의 하위 개념', '코스 레이팅은 거리만, 슬로프는 장애물만 측정'], a: 0 },
      { q: '타이거 우즈의 메이저 대회 총 우승 횟수는?', o: ['12회', '15회', '18회', '20회'], a: 1 },
      { q: 'PGA 투어 2024 시즌 평균 드라이버 거리는 약?', o: ['270야드', '282야드', '299야드', '310야드'], a: 2 },
      { q: '웨지의 바운스(Bounce) 각도의 주요 용도는?', o: ['비거리 증가', '클럽이 땅에 파고드는 것을 방지', '백스핀 증가', '탄도 낮추기'], a: 1 },
      { q: '퍼터의 로프트가 3-4도인 이유는?', o: ['그린에서 미끄러짐 방지', '공을 살짝 띄워 초기 스키드를 줄이기 위해', '거리 컨트롤을 위해', '시각적 정렬 도움'], a: 1 },
      { q: '클럽의 MOI(Moment of Inertia)가 높으면?', o: ['헤드 스피드가 증가한다', '미스히트 시 헤드 회전이 적어 관용성이 높다', '스핀량이 크게 증가한다', '클럽 무게가 가벼워진다'], a: 1 },
      { q: '백스핀이 감소하는 요인이 아닌 것은?', o: ['로프트가 적은 클럽', '비가 오는 조건', '새 그루브의 웨지', '러프에서의 샷'], a: 2 },
      { q: '그린 리딩에서 에임포인트(AimPoint) 기법이란?', o: ['레이저 거리측정기 사용', '발바닥 경사 감지 후 손가락으로 에임포인트 결정', '플럼밥 기법의 다른 이름', '그린 맵 소프트웨어 사용'], a: 1 },
      { q: '일반적으로 그린의 브레이크가 가장 큰 구간은?', o: ['홀 바로 앞', '퍼트 시작 지점', '홀 주변 1m 이내(공 속도가 가장 느린 구간)', '그린 중앙'], a: 2 }
    ];

    var idx = 0, score = 0, answered = Array(questions.length).fill(null);

    function buildQuiz() {
      return '<div id="sg35-iq19-content"></div>';
    }

    function render() {
      var el = document.getElementById('sg35-iq19-content');
      if (!el) return;
      var q = questions[idx];
      var html = '<div class="sg35-row" style="margin-bottom:8px"><span class="sg35-badge sg35-badge-blue">Q' + (idx + 1) + '/' + questions.length + '</span> <span class="sg35-badge sg35-badge-green">Score: ' + score + '</span></div>';
      html += '<div class="sg35-card"><div class="sg35-card-title">' + q.q + '</div></div>';
      q.o.forEach(function(opt, oi) {
        var selected = answered[idx] === oi;
        var isCorrect = oi === q.a;
        var showResult = answered[idx] !== null;
        var style = '';
        if (showResult && selected && isCorrect) style = 'border:2px solid #4caf50;background:#e8f5e9';
        else if (showResult && selected && !isCorrect) style = 'border:2px solid #f44336;background:#ffebee';
        else if (showResult && isCorrect) style = 'border:2px solid #4caf50;background:#e8f5e9';
        html += '<div class="sg35-card" style="' + style + '" onclick="window._sg35_iq19_answer(' + oi + ')"><div class="sg35-card-desc">' + String.fromCharCode(65 + oi) + '. ' + opt + '</div></div>';
      });
      html += '<div class="sg35-row" style="margin-top:12px;justify-content:space-between">';
      html += '<button class="sg35-btn sg35-btn-outline" onclick="window._sg35_iq19_prev()" ' + (idx === 0 ? 'disabled' : '') + '>&larr; Prev</button>';
      if (idx < questions.length - 1) html += '<button class="sg35-btn sg35-btn-primary" onclick="window._sg35_iq19_next()">Next &rarr;</button>';
      else html += '<button class="sg35-btn sg35-btn-primary" onclick="window._sg35_iq19_result()">Result &#x1F3C6;</button>';
      html += '</div>';
      el.innerHTML = html;
    }

    function showResult() {
      var el = document.getElementById('sg35-iq19-content');
      if (!el) return;
      var pct = Math.round(score / questions.length * 100);
      var g = grade(pct);
      var html = '<div style="text-align:center;padding:20px">';
      html += '<div class="sg35-grade ' + g.cls + '">Grade: ' + g.g + '</div>';
      html += '<div style="font-size:20px;font-weight:700;margin:10px 0">' + score + ' / ' + questions.length + ' (' + pct + '%)</div>';
      html += '<button class="sg35-btn sg35-btn-primary" onclick="window._sg35_iq19_retry()">&#x21BB; Retry</button>';
      html += '</div>';
      el.innerHTML = html;

      _checkAchievementsV35('iq_v19_clear');
      if (pct >= 90) _checkAchievementsV35('iq_v19_genius');
    }

    window._sg35_iq19_answer = function(oi) {
      if (answered[idx] !== null) return;
      answered[idx] = oi;
      if (oi === questions[idx].a) { score++; SFX.quiz_v19(); } else { SFX.equip_wear(); }
      render();
    };
    window._sg35_iq19_prev = function() { idx = Math.max(0, idx - 1); render(); };
    window._sg35_iq19_next = function() { idx = Math.min(questions.length - 1, idx + 1); render(); };
    window._sg35_iq19_result = function() { showResult(); };
    window._sg35_iq19_retry = function() { idx = 0; score = 0; answered = Array(questions.length).fill(null); render(); };

    makeOverlay('sg35-iq19', 'linear-gradient(135deg,#1565c0,#42a5f5)', '&#x1F9E0; Golf IQ v19', buildQuiz());
    setTimeout(function() { render(); }, 100);
    _checkAchievementsV35('iq_v19_opened');
  }

  // ===============================================================
  // ACHIEVEMENTS v35 (+15, 257->272)
  // ===============================================================
  var ACHIEVEMENTS_V35 = [
    { id: 'swing_opened', name: 'Swing Plane Master', desc: 'Opened Swing Plane Analyzer' },
    { id: 'strategy_mapper', name: 'Strategy Mapper', desc: 'Opened Hole Strategy Map' },
    { id: 'trend_analyst', name: 'Trend Analyst', desc: 'Opened Performance Trend Line' },
    { id: 'equipment_guardian', name: 'Equipment Guardian', desc: 'Opened Equipment Life Manager' },
    { id: 'weather_analyst', name: 'Weather Analyst', desc: 'Opened Weather Correlation' },
    { id: 'heatmap_creator', name: 'Heatmap Creator', desc: 'Opened Scorecard Heatmap' },
    { id: 'body_analyst', name: 'Body Analyst', desc: 'Opened Body Type Analyzer' },
    { id: 'goal_opened', name: 'Goal Achiever', desc: 'Opened Goal Achievement Rate' },
    { id: 'iq_v19_opened', name: 'IQ v19 Challenger', desc: 'Started Golf IQ v19' },
    { id: 'iq_v19_clear', name: 'IQ v19 Graduate', desc: 'Completed Golf IQ v19' },
    { id: 'iq_v19_genius', name: 'IQ v19 Genius', desc: 'Got S rank on Golf IQ v19' },
    { id: 'multi_feature_v35', name: 'v35 Multi-Tooler', desc: 'Opened 5+ v35 features' },
    { id: 'swing_s_rank', name: 'Swing S Rank', desc: 'Got S rank on Swing Plane Analyzer' },
    { id: 'trend_30round', name: 'Trend 30 Round', desc: 'Analyzed 30 rounds of performance' },
    { id: 'weather_best', name: 'Weather Logger', desc: 'Recorded 5+ rounds of weather data' },
    { id: 'swing_plane_master', name: 'Swing Plane Saved', desc: 'Saved a swing plane session' },
    { id: 'goal_achiever', name: 'Goal Champion', desc: 'Achieved 75%+ goal completion' },
    { id: 'v35_complete', name: 'v35 Complete', desc: 'Unlocked all v35 achievements' }
  ];

  var _v35_unlocked = LS('achievements_v35') || {};
  var _v35_opened = {};

  function _checkAchievementsV35(trigger) {
    if (_v35_unlocked[trigger]) return;
    var featureIds = ['swing_opened','strategy_mapper','trend_analyst','equipment_guardian','weather_analyst','heatmap_creator','body_analyst','goal_opened'];
    _v35_opened[trigger] = true;

    if (featureIds.indexOf(trigger) >= 0) {
      var openedCount = featureIds.filter(function(id) { return _v35_opened[id] || _v35_unlocked[id]; }).length;
      if (openedCount >= 5 && !_v35_unlocked.multi_feature_v35) {
        _v35_unlocked.multi_feature_v35 = true;
        SFX.achieve_v35();
        _showAchievementToast35('v35 Multi-Tooler');
      }
    }

    var ach = ACHIEVEMENTS_V35.filter(function(a) { return a.id === trigger; })[0];
    if (ach && !_v35_unlocked[trigger]) {
      _v35_unlocked[trigger] = true;
      SFX.achieve_v35();
      _showAchievementToast35(ach.name);
    }

    var total = ACHIEVEMENTS_V35.filter(function(a) { return _v35_unlocked[a.id]; }).length;
    if (total >= ACHIEVEMENTS_V35.length && !_v35_unlocked.v35_complete) {
      _v35_unlocked.v35_complete = true;
      SFX.achieve_v35();
      _showAchievementToast35('v35 Complete!');
    }

    LS('achievements_v35', _v35_unlocked);
  }

  function _showAchievementToast35(name) {
    var toast = document.createElement('div');
    toast.style.cssText = 'position:fixed;top:20px;right:20px;z-index:99999;background:linear-gradient(135deg,#6a1b9a,#ab47bc);color:#fff;padding:12px 20px;border-radius:12px;font-size:13px;font-weight:700;box-shadow:0 4px 20px rgba(0,0,0,.3);animation:sg35SlideUp .3s;display:flex;align-items:center;gap:8px';
    toast.innerHTML = '&#x1F3C6; Achievement: ' + name;
    document.body.appendChild(toast);
    setTimeout(function() { toast.style.opacity = '0'; toast.style.transition = 'opacity .5s'; setTimeout(function() { toast.remove(); }, 500); }, 3000);
  }

  // ===============================================================
  // NAVIGATION - append to existing bar
  // ===============================================================
  var navItems = [
    { icon: '&#x1F3CC;&#xFE0F;', label: 'Swing', fn: openSwingPlaneAnalyzer },
    { icon: '&#x1F5FA;&#xFE0F;', label: 'Strategy', fn: openHoleStrategyMap },
    { icon: '&#x1F4C8;', label: 'Trend', fn: openPerformanceTrendLine },
    { icon: '&#x1F6E0;&#xFE0F;', label: 'Equip', fn: openEquipmentLifeManager },
    { icon: '&#x26C5;', label: 'Weather', fn: openWeatherCorrelation },
    { icon: '&#x1F5FA;&#xFE0F;', label: 'Heatmap', fn: openScorecardHeatmap },
    { icon: '&#x1F9CD;', label: 'BodyType', fn: openBodyTypeAnalyzer },
    { icon: '&#x1F3AF;', label: 'Goals', fn: openGoalAchievementRate },
    { icon: '&#x1F9E0;', label: 'IQ v19', fn: openGolfIQv19 }
  ];

  var existingBar = document.querySelector('.sg30-bottom-bar') || document.querySelector('[class*="bottom-bar"]');
  if (existingBar) {
    navItems.forEach(function(item) {
      var btn = document.createElement('button');
      btn.className = existingBar.querySelector('button') ? existingBar.querySelector('button').className : 'sg30-bbtn';
      btn.innerHTML = '<span class="' + (existingBar.querySelector('.sg30-bbtn-icon') ? 'sg30-bbtn-icon' : 'sg35-bbtn-icon') + '">' + item.icon + '</span><span class="' + (existingBar.querySelector('.sg30-bbtn-label') ? 'sg30-bbtn-label' : 'sg35-bbtn-label') + '">' + item.label + '</span>';
      btn.onclick = item.fn;
      existingBar.appendChild(btn);
    });
  }

  // ========== KEYBOARD SHORTCUTS ==========
  document.addEventListener('keydown', function(e) {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'SELECT') return;
    if (!e.shiftKey) return;
    var map = { Q: openSwingPlaneAnalyzer, W: openHoleStrategyMap, E: openPerformanceTrendLine, R: openEquipmentLifeManager, T: openWeatherCorrelation, Y: openScorecardHeatmap, U: openBodyTypeAnalyzer, I: openGoalAchievementRate };
    if (map[e.key]) { e.preventDefault(); map[e.key](); }
  });

  // ========== ESC to close ==========
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      document.querySelectorAll('.sg35-overlay.active').forEach(function(ov) { ov.classList.remove('active'); });
    }
  });

})();
