/* ====================================================================
 * SmartGolf v34.0 patch
 * 티샷성공률분석기Canvas14홀620x380 + 라운드감정트래커Canvas18홀580x360
 * + 파세이브분석기Canvas620x400 + 골프시즌캘린더Canvas12월620x380
 * + 코스공략노트패드Canvas18홀600x360 + 클럽거리히스토그램Canvas14클럽620x400
 * + 라운드에너지매니저Canvas18홀580x360 + 핸디캡시뮬레이터Canvas600x380
 * + Golf IQ v18 15문항 + 업적+15(242→257) + SFX13종(239→252) + 키보드8종
 * ==================================================================== */
(function () {
  'use strict';

  const LS = (k, v) => v === undefined ? JSON.parse(localStorage.getItem('sg34_' + k) || 'null') : localStorage.setItem('sg34_' + k, JSON.stringify(v));

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
    tee_hit: () => { sfx(392, 0.08); sfx(523, 0.1); sfx(659, 0.12); },
    tee_miss: () => { sfx(330, 0.12, 'sawtooth', 0.1); sfx(262, 0.15, 'sawtooth', 0.08); },
    emotion_log: () => { sfx(440, 0.08); sfx(554, 0.1, 'triangle'); },
    emotion_up: () => { sfx(523, 0.06); sfx(659, 0.06); sfx(784, 0.1, 'triangle'); },
    par_save: () => { sfx(587, 0.06); sfx(740, 0.06); sfx(880, 0.12); },
    par_miss: () => { sfx(294, 0.1, 'sawtooth', 0.08); },
    season_view: () => { sfx(349, 0.1); sfx(440, 0.08); },
    note_write: () => { sfx(466, 0.06); sfx(554, 0.08, 'triangle'); },
    dist_scan: () => { sfx(370, 0.08); sfx(466, 0.06); sfx(554, 0.1); },
    energy_check: () => { sfx(415, 0.1); sfx(523, 0.08); },
    energy_low: () => { sfx(220, 0.15, 'sawtooth', 0.1); sfx(196, 0.2, 'sawtooth', 0.08); },
    hcp_sim: () => { sfx(494, 0.08); sfx(587, 0.1); sfx(740, 0.12); },
    quiz_v18: () => { sfx(587, 0.1); sfx(740, 0.12); },
    achieve_v34: () => { sfx(523, 0.04); sfx(659, 0.04); sfx(784, 0.04); sfx(988, 0.04); sfx(1175, 0.04); sfx(1319, 0.18, 'triangle'); }
  };

  // ========== CSS ==========
  const css = `
.sg34-overlay{display:none;position:fixed;top:0;left:0;right:0;bottom:0;z-index:10040;background:rgba(0,0,0,.55);overflow-y:auto;padding:20px;animation:sg34FadeIn .25s}
.sg34-overlay.active{display:flex;align-items:flex-start;justify-content:center}
@keyframes sg34FadeIn{from{opacity:0}to{opacity:1}}
.sg34-panel{background:var(--card-bg,#fff);border-radius:16px;max-width:720px;width:100%;margin:30px auto;box-shadow:0 8px 40px rgba(0,0,0,.3);overflow:hidden;animation:sg34SlideUp .3s}
@keyframes sg34SlideUp{from{transform:translateY(30px);opacity:0}to{transform:translateY(0);opacity:1}}
.sg34-panel-head{padding:16px 20px;color:#fff;display:flex;align-items:center;justify-content:space-between}
.sg34-panel-head h3{font-size:16px;font-weight:700;display:flex;align-items:center;gap:8px}
.sg34-panel-close{background:rgba(255,255,255,.25);border:none;color:#fff;width:30px;height:30px;border-radius:50%;cursor:pointer;font-size:16px;font-family:inherit}
.sg34-panel-body{padding:16px 20px;max-height:70vh;overflow-y:auto}
.sg34-card{background:var(--bg,#f5f7f5);border-radius:12px;padding:14px;margin-bottom:10px;border:1px solid var(--border,#e0e0e0);cursor:pointer;transition:all .2s}
.sg34-card:hover{box-shadow:0 2px 12px rgba(0,0,0,.1);transform:translateY(-1px)}
.sg34-card-title{font-weight:700;font-size:14px;color:var(--text,#1a1a1a);margin-bottom:4px;display:flex;align-items:center;gap:6px}
.sg34-card-desc{font-size:12px;color:var(--text-muted,#666);line-height:1.5}
.sg34-badge{display:inline-block;padding:2px 8px;border-radius:10px;font-size:10px;font-weight:700}
.sg34-badge-green{background:#e8f5e9;color:#2e7d32}
.sg34-badge-blue{background:#e3f2fd;color:#1565c0}
.sg34-badge-orange{background:#fff3e0;color:#e65100}
.sg34-badge-red{background:#ffebee;color:#c62828}
.sg34-badge-purple{background:#ede7f6;color:#6a1b9a}
.sg34-badge-teal{background:#e0f2f1;color:#00695c}
.sg34-badge-pink{background:#fce4ec;color:#ad1457}
.sg34-badge-amber{background:#fff8e1;color:#ff6f00}
.sg34-tabs{display:flex;gap:4px;margin-bottom:12px;flex-wrap:wrap}
.sg34-tab{padding:6px 14px;border-radius:20px;border:1px solid var(--border,#e0e0e0);background:var(--bg,#f5f7f5);font-size:12px;cursor:pointer;font-weight:600;color:var(--text-muted,#666);transition:all .2s;font-family:inherit}
.sg34-tab.active{background:var(--primary,#1a7a3a);color:#fff;border-color:var(--primary,#1a7a3a)}
.sg34-row{display:flex;gap:8px;margin-bottom:8px;flex-wrap:wrap;align-items:center}
.sg34-label{font-size:12px;font-weight:600;color:var(--text-muted,#666);min-width:80px}
.sg34-val{font-size:14px;font-weight:700;color:var(--text,#1a1a1a)}
.sg34-slider{flex:1;min-width:120px;accent-color:var(--primary,#1a7a3a)}
.sg34-btn{padding:8px 16px;border-radius:10px;border:none;font-size:13px;font-weight:700;cursor:pointer;transition:all .2s;font-family:inherit}
.sg34-btn-primary{background:var(--primary,#1a7a3a);color:#fff}
.sg34-btn-primary:hover{opacity:.85}
.sg34-btn-outline{background:transparent;border:1px solid var(--border,#e0e0e0);color:var(--text,#1a1a1a)}
.sg34-grade{font-size:28px;font-weight:900;text-align:center;margin:10px 0}
.sg34-grade-s{color:#e91e63}.sg34-grade-a{color:#ff5722}.sg34-grade-b{color:#ff9800}.sg34-grade-c{color:#4caf50}.sg34-grade-d{color:#9e9e9e}
.sg34-canvas-wrap{text-align:center;margin:10px 0}
.sg34-canvas-wrap canvas{max-width:100%;border-radius:10px;background:#fafafa;border:1px solid var(--border,#e0e0e0)}
[data-theme="dark"] .sg34-canvas-wrap canvas{background:#1a1a1a}
[data-theme="dark"] .sg34-badge-green{background:#1a3a25;color:#7bed9f}
[data-theme="dark"] .sg34-badge-blue{background:#1a2a3a;color:#7ab8f5}
[data-theme="dark"] .sg34-badge-orange{background:#3a2a1a;color:#f0c070}
[data-theme="dark"] .sg34-badge-red{background:#3a1a1a;color:#f08080}
[data-theme="dark"] .sg34-badge-purple{background:#2a1a3a;color:#c9a0dc}
[data-theme="dark"] .sg34-badge-teal{background:#0a2a2a;color:#80cbc4}
[data-theme="dark"] .sg34-badge-pink{background:#3a1a2a;color:#f48fb1}
[data-theme="dark"] .sg34-badge-amber{background:#3a3000;color:#ffd54f}
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
    ov.className = 'sg34-overlay active';
    ov.innerHTML = '<div class="sg34-panel"><div class="sg34-panel-head" style="background:' + gradient + '"><h3>' + title + '</h3><button class="sg34-panel-close" onclick="this.closest(\'.sg34-overlay\').classList.remove(\'active\')">&times;</button></div><div class="sg34-panel-body">' + content + '</div></div>';
    ov.addEventListener('click', e => { if (e.target === ov) ov.classList.remove('active'); });
    document.body.appendChild(ov);
  }

  function isDark() { return document.documentElement.getAttribute('data-theme') === 'dark'; }
  function cText() { return isDark() ? '#e0e0e0' : '#1a1a1a'; }
  function cMuted() { return isDark() ? '#999' : '#666'; }
  function cBg() { return isDark() ? '#1a1a1a' : '#fafafa'; }
  function cGrid() { return isDark() ? '#333' : '#e0e0e0'; }

  function grade(pct) {
    if (pct >= 90) return { g: 'S', c: '#e91e63', cls: 'sg34-grade-s' };
    if (pct >= 75) return { g: 'A', c: '#ff5722', cls: 'sg34-grade-a' };
    if (pct >= 60) return { g: 'B', c: '#ff9800', cls: 'sg34-grade-b' };
    if (pct >= 40) return { g: 'C', c: '#4caf50', cls: 'sg34-grade-c' };
    return { g: 'D', c: '#9e9e9e', cls: 'sg34-grade-d' };
  }

  // ---- 빈 상태 / 입력 헬퍼 (v34: 데이터는 사용자가 입력한 것만 사용한다) ----
  const IST = 'padding:4px 8px;border-radius:6px;border:1px solid var(--border,#e0e0e0);background:var(--card-bg,#fff);color:var(--text,#1a1a1a);font-family:inherit;font-size:12px';
  const EMPTY_MSG = '기록을 추가하면 표시됩니다';
  function drawEmpty(ctx, W, H, msg) {
    ctx.save();
    ctx.fillStyle = isDark() ? '#999' : '#888';
    ctx.font = '13px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(msg || EMPTY_MSG, W / 2, H / 2);
    ctx.restore();
  }
  function holeOptions(n) {
    let s = '';
    for (let i = 1; i <= n; i++) s += '<option value="' + i + '">' + i + 'H</option>';
    return s;
  }
  function numVal(id, min, max) {
    const el = document.getElementById(id);
    if (!el) return null;
    const v = parseFloat(el.value);
    if (isNaN(v)) return null;
    if (typeof min === 'number' && v < min) return null;
    if (typeof max === 'number' && v > max) return null;
    return v;
  }

  // ===============================================================
  // 1. TEE SHOT SUCCESS ANALYZER - Canvas 620x380
  // ===============================================================
  function openTeeShotAnalyzer() {
    SFX.tee_hit();
    // result/club 은 사용자가 기록할 때만 채워진다 (임의 생성 금지)
    const holes = [];
    for (let i = 0; i < 14; i++) {
      holes.push({
        hole: i < 10 ? 'H' + (i + 1) : 'H' + (i + 4),
        par: i < 4 ? 4 : (i < 8 ? 5 : 4),
        result: null,
        club: ''
      });
    }
    let data = LS('tee_data_v2') || holes;

    function render(d) {
      const cid = 'sg34-canvas-tee';
      let wrap = document.getElementById(cid + '-wrap');
      if (!wrap) return;
      wrap.innerHTML = '<canvas id="' + cid + '" width="620" height="380"></canvas>';
      const canvas = document.getElementById(cid);
      const ctx = canvas.getContext('2d');
      const W = 620, H = 380;
      ctx.fillStyle = cBg(); ctx.fillRect(0, 0, W, H);

      const rec = d.filter(h => h.result === 'FW' || h.result === 'L' || h.result === 'R');
      const hitCount = rec.filter(h => h.result === 'FW').length;
      const hitPct = rec.length ? Math.round(hitCount / rec.length * 100) : 0;
      const leftMiss = rec.filter(h => h.result === 'L').length;
      const rightMiss = rec.filter(h => h.result === 'R').length;

      ctx.fillStyle = cText(); ctx.font = 'bold 15px sans-serif';
      ctx.fillText(rec.length ? ('Tee Shot Success Rate: ' + hitPct + '% (' + hitCount + '/' + rec.length + ')') : 'Tee Shot Success Rate: -', 20, 30);

      const barW = 30, gap = 10, startX = 50, startY = 340;
      const maxH = 250;

      d.forEach((h, i) => {
        const x = startX + i * (barW + gap);
        const barH = maxH * 0.7;
        const has = h.result === 'FW' || h.result === 'L' || h.result === 'R';
        if (has) {
          ctx.fillStyle = h.result === 'FW' ? '#4caf50' : (h.result === 'L' ? '#f44336' : '#ff9800');
          ctx.fillRect(x, startY - barH, barW, barH);
        } else {
          ctx.strokeStyle = cGrid(); ctx.lineWidth = 1;
          ctx.strokeRect(x, startY - barH, barW, barH);
        }
        ctx.fillStyle = cText(); ctx.font = '10px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(h.hole, x + barW / 2, startY + 14);
        ctx.fillText(h.club || '-', x + barW / 2, startY + 26);
        ctx.fillText(has ? h.result : '', x + barW / 2, startY - barH - 6);
      });
      ctx.textAlign = 'left';

      if (!rec.length) {
        drawEmpty(ctx, W, H);
        return;
      }

      ctx.font = 'bold 12px sans-serif';
      ctx.fillStyle = '#4caf50';
      ctx.fillRect(W - 200, 20, 12, 12); ctx.fillStyle = cText();
      ctx.fillText('Fairway Hit: ' + hitCount, W - 184, 31);
      ctx.fillStyle = '#f44336';
      ctx.fillRect(W - 200, 38, 12, 12); ctx.fillStyle = cText();
      ctx.fillText('Left Miss: ' + leftMiss, W - 184, 49);
      ctx.fillStyle = '#ff9800';
      ctx.fillRect(W - 200, 56, 12, 12); ctx.fillStyle = cText();
      ctx.fillText('Right Miss: ' + rightMiss, W - 184, 67);

      // 표본이 5홀 미만이면 등급을 매기지 않는다
      if (rec.length >= 5) {
        const g = grade(hitPct);
        ctx.font = 'bold 22px sans-serif'; ctx.fillStyle = g.c;
        ctx.fillText('Grade: ' + g.g, W - 200, 100);
      } else {
        ctx.font = 'bold 12px sans-serif'; ctx.fillStyle = cMuted();
        ctx.fillText('Grade: - (5홀 이상 기록 필요)', W - 200, 100);
      }
    }

    const html = '<div class="sg34-row"><span class="sg34-badge sg34-badge-green">Canvas 620x380</span> <span class="sg34-badge sg34-badge-blue">14 Par4/5 Holes</span></div>' +
      '<p class="sg34-card-desc">14개 Par4/5 홀의 티샷 페어웨이 적중률을 분석합니다. 좌/우 미스 비율, 클럽별 성공률을 시각화합니다.</p>' +
      '<div class="sg34-row" style="margin-top:10px">' +
      '<span class="sg34-label">Hole</span><select id="sg34-tee-hole" style="' + IST + '">' + data.map((h, i) => '<option value="' + i + '">' + h.hole + ' (Par ' + h.par + ')</option>').join('') + '</select>' +
      '<span class="sg34-label">Result</span><select id="sg34-tee-result" style="' + IST + '"><option value="FW">Fairway</option><option value="L">Left Miss</option><option value="R">Right Miss</option></select>' +
      '<span class="sg34-label">Club</span><select id="sg34-tee-club" style="' + IST + '"><option value="DR">DR</option><option value="3W">3W</option><option value="5W">5W</option><option value="HY">HY</option><option value="IR">IR</option></select>' +
      '<button class="sg34-btn sg34-btn-primary" onclick="window._sg34_tee_record()">&#x2795; Record</button></div>' +
      '<div class="sg34-row"><button class="sg34-btn sg34-btn-outline" onclick="window._sg34_tee_save()">&#x1F4BE; Save</button> <button class="sg34-btn sg34-btn-outline" onclick="window._sg34_tee_reset()">&#x21BB; Reset</button></div>' +
      '<div id="sg34-canvas-tee-wrap" class="sg34-canvas-wrap"></div>';

    window._sg34_tee_record = () => {
      const hEl = document.getElementById('sg34-tee-hole');
      const rEl = document.getElementById('sg34-tee-result');
      const cEl = document.getElementById('sg34-tee-club');
      if (!hEl || !rEl || !cEl) return;
      const idx = parseInt(hEl.value);
      if (isNaN(idx) || !data[idx]) return;
      data[idx].result = rEl.value;
      data[idx].club = cEl.value;
      SFX.tee_hit(); render(data);
    };
    window._sg34_tee_save = () => { LS('tee_data_v2', data); SFX.tee_hit(); };
    // 이 패널만 초기화한다 (페이지 새로고침 금지)
    window._sg34_tee_reset = () => {
      data.forEach(h => { h.result = null; h.club = ''; });
      render(data);
    };

    makeOverlay('sg34-tee', 'linear-gradient(135deg,#2e7d32,#66bb6a)', '&#x1F3CC;&#xFE0F; Tee Shot Analyzer', html);
    setTimeout(() => render(data), 100);
    _checkAchievementsV34('tee_opened');
  }

  // ===============================================================
  // 2. ROUND EMOTION TRACKER - Canvas 580x360
  // ===============================================================
  function openRoundEmotionTracker() {
    SFX.emotion_log();
    const EMOTIONS = ['Confident', 'Focused', 'Relaxed', 'Excited', 'Nervous', 'Frustrated', 'Calm', 'Determined'];
    const COLORS = ['#e91e63', '#2196f3', '#4caf50', '#ff9800', '#9c27b0', '#f44336', '#00bcd4', '#ff5722'];
    // 홀별 감정은 사용자가 기록할 때만 채워진다 (null = 미기록)
    let holeEmotions = LS('emotions_v2') || Array.from({length: 18}, () => null);

    function render(d) {
      const cid = 'sg34-canvas-emotion';
      let wrap = document.getElementById(cid + '-wrap');
      if (!wrap) return;
      wrap.innerHTML = '<canvas id="' + cid + '" width="580" height="360"></canvas>';
      const canvas = document.getElementById(cid);
      const ctx = canvas.getContext('2d');
      const W = 580, H = 360;
      ctx.fillStyle = cBg(); ctx.fillRect(0, 0, W, H);

      ctx.fillStyle = cText(); ctx.font = 'bold 14px sans-serif';
      ctx.fillText('Round Emotion Flow - 18 Holes', 20, 25);

      const startX = 50, endX = W - 30, startY = 60, endY = H - 80;
      const stepX = (endX - startX) / 17;

      ctx.strokeStyle = cGrid(); ctx.lineWidth = 0.5;
      for (let i = 0; i < 8; i++) {
        const y = startY + (endY - startY) * i / 7;
        ctx.beginPath(); ctx.moveTo(startX, y); ctx.lineTo(endX, y); ctx.stroke();
        ctx.fillStyle = cMuted(); ctx.font = '9px sans-serif'; ctx.textAlign = 'right';
        ctx.fillText(EMOTIONS[i], startX - 4, y + 3);
      }
      ctx.textAlign = 'left';

      // 홀 라벨은 항상 표시
      d.forEach((e, i) => {
        const x = startX + i * stepX;
        ctx.fillStyle = cText(); ctx.font = '9px sans-serif'; ctx.textAlign = 'center';
        ctx.fillText('H' + (i + 1), x, endY + 18);
      });
      ctx.textAlign = 'left';

      const pts = [];
      d.forEach((e, i) => {
        if (typeof e !== 'number' || isNaN(e)) return;
        pts.push({ x: startX + i * stepX, y: startY + (endY - startY) * e / 7, e: e });
      });

      if (!pts.length) {
        drawEmpty(ctx, W, H);
        return;
      }

      if (pts.length >= 2) {
        ctx.strokeStyle = '#1a7a3a'; ctx.lineWidth = 2.5;
        ctx.beginPath();
        pts.forEach((p, i) => { if (i === 0) ctx.moveTo(p.x, p.y); else ctx.lineTo(p.x, p.y); });
        ctx.stroke();
      }

      pts.forEach(p => {
        ctx.fillStyle = COLORS[p.e];
        ctx.beginPath(); ctx.arc(p.x, p.y, 5, 0, Math.PI * 2); ctx.fill();
      });

      const counts = {};
      pts.forEach(p => { counts[p.e] = (counts[p.e] || 0) + 1; });
      const dominant = Object.entries(counts).sort((a, b) => b[1] - a[1])[0];
      ctx.font = 'bold 12px sans-serif'; ctx.fillStyle = COLORS[dominant[0]];
      ctx.fillText('Dominant: ' + EMOTIONS[dominant[0]] + ' (' + dominant[1] + '/' + pts.length + ' holes)', 20, H - 15);
    }

    const html = '<div class="sg34-row"><span class="sg34-badge sg34-badge-pink">Canvas 580x360</span> <span class="sg34-badge sg34-badge-purple">8 Emotions</span></div>' +
      '<p class="sg34-card-desc">18홀 라운드 중 각 홀에서의 감정 변화를 추적합니다. 감정 곡선으로 멘탈 패턴을 파악하세요.</p>' +
      '<div class="sg34-row" style="margin-top:10px">' +
      '<span class="sg34-label">Hole</span><select id="sg34-emo-hole" style="' + IST + '">' + holeOptions(18) + '</select>' +
      '<span class="sg34-label">Emotion</span><select id="sg34-emo-val" style="' + IST + '">' + EMOTIONS.map((e, i) => '<option value="' + i + '">' + e + '</option>').join('') + '</select>' +
      '<button class="sg34-btn sg34-btn-primary" onclick="window._sg34_emotion_record()">&#x2795; Record</button></div>' +
      '<div class="sg34-row"><button class="sg34-btn sg34-btn-outline" onclick="window._sg34_emotion_save()">&#x1F4BE; Save</button> <button class="sg34-btn sg34-btn-outline" onclick="window._sg34_emotion_reset()">&#x21BB; Reset</button></div>' +
      '<div id="sg34-canvas-emotion-wrap" class="sg34-canvas-wrap"></div>';

    window._sg34_emotion_record = () => {
      const h = numVal('sg34-emo-hole', 1, 18);
      const e = numVal('sg34-emo-val', 0, 7);
      if (h === null || e === null) return;
      holeEmotions[h - 1] = e;
      SFX.emotion_up(); render(holeEmotions);
    };
    window._sg34_emotion_save = () => { LS('emotions_v2', holeEmotions); SFX.emotion_log(); };
    window._sg34_emotion_reset = () => { holeEmotions = Array.from({length: 18}, () => null); render(holeEmotions); };

    makeOverlay('sg34-emotion', 'linear-gradient(135deg,#ad1457,#f06292)', '&#x1F60C; Round Emotion Tracker', html);
    setTimeout(() => render(holeEmotions), 100);
    _checkAchievementsV34('emotion_opened');
  }

  // ===============================================================
  // 3. PAR SAVE ANALYZER - Canvas 620x400
  // ===============================================================
  function openParSaveAnalyzer() {
    SFX.par_save();
    const SITUATIONS = ['Green Miss', 'Bunker', 'Rough', 'Water Adj', 'Deep Rough', 'Fringe', 'Fairway Bunker', 'Downhill Lie'];
    const COLORS_PS = ['#4caf50', '#ff9800', '#8bc34a', '#2196f3', '#795548', '#00bcd4', '#ffc107', '#9c27b0'];
    // 시도/세이브는 사용자가 입력할 때만 채워진다 (임의 생성 금지)
    let saveData = LS('par_saves_v2') || SITUATIONS.map(() => ({ attempts: 0, saves: 0 }));

    function render(d) {
      const cid = 'sg34-canvas-parsave';
      let wrap = document.getElementById(cid + '-wrap');
      if (!wrap) return;
      wrap.innerHTML = '<canvas id="' + cid + '" width="620" height="400"></canvas>';
      const canvas = document.getElementById(cid);
      const ctx = canvas.getContext('2d');
      const W = 620, H = 400;
      ctx.fillStyle = cBg(); ctx.fillRect(0, 0, W, H);

      ctx.fillStyle = cText(); ctx.font = 'bold 14px sans-serif';
      ctx.fillText('Par Save Rate by Situation', 20, 25);

      const totalAttempts = d.reduce((s, v) => s + v.attempts, 0);
      const totalSaves = d.reduce((s, v) => s + v.saves, 0);
      const totalPct = totalAttempts > 0 ? Math.round(totalSaves / totalAttempts * 100) : 0;
      ctx.font = '12px sans-serif'; ctx.fillStyle = cMuted();
      ctx.fillText(totalAttempts > 0 ? ('Overall: ' + totalSaves + '/' + totalAttempts + ' (' + totalPct + '%)') : 'Overall: -', 20, 45);

      const barH = 28, gap = 8, startY = 65, startX = 130, maxBarW = 400;

      d.forEach((item, i) => {
        const y = startY + i * (barH + gap);
        const pct = item.attempts > 0 ? item.saves / item.attempts : 0;
        const barW = maxBarW * pct;

        ctx.fillStyle = cMuted(); ctx.font = '11px sans-serif'; ctx.textAlign = 'right';
        ctx.fillText(SITUATIONS[i], startX - 8, y + barH / 2 + 4);
        ctx.textAlign = 'left';

        ctx.fillStyle = isDark() ? '#333' : '#eee';
        ctx.fillRect(startX, y, maxBarW, barH);

        ctx.fillStyle = COLORS_PS[i];
        ctx.fillRect(startX, y, barW, barH);

        ctx.fillStyle = barW > 60 ? '#fff' : cText();
        ctx.font = 'bold 11px sans-serif';
        ctx.fillText(item.attempts > 0 ? (Math.round(pct * 100) + '% (' + item.saves + '/' + item.attempts + ')') : '-', startX + (barW > 60 ? 8 : barW + 8), y + barH / 2 + 4);
      });

      if (totalAttempts === 0) {
        drawEmpty(ctx, W, H, EMPTY_MSG);
        ctx.font = 'bold 24px sans-serif'; ctx.fillStyle = cMuted();
        ctx.textAlign = 'center';
        ctx.fillText('-', W - 60, H - 40);
        ctx.font = '11px sans-serif';
        ctx.fillText('Overall Grade', W - 60, H - 22);
        ctx.textAlign = 'left';
        return;
      }

      const g = grade(totalPct);
      ctx.font = 'bold 24px sans-serif'; ctx.fillStyle = g.c;
      ctx.textAlign = 'center';
      ctx.fillText(g.g, W - 60, H - 40);
      ctx.font = '11px sans-serif'; ctx.fillStyle = cMuted();
      ctx.fillText('Overall Grade', W - 60, H - 22);
      ctx.textAlign = 'left';

      // Pie chart for situation distribution
      const pieX = W - 120, pieY = 150, pieR = 55;
      let startAngle = -Math.PI / 2;
      d.forEach((item, i) => {
        if (item.attempts === 0) return;
        const angle = (item.attempts / totalAttempts) * Math.PI * 2;
        ctx.fillStyle = COLORS_PS[i];
        ctx.beginPath();
        ctx.moveTo(pieX, pieY);
        ctx.arc(pieX, pieY, pieR, startAngle, startAngle + angle);
        ctx.closePath();
        ctx.fill();
        startAngle += angle;
      });
    }

    const html = '<div class="sg34-row"><span class="sg34-badge sg34-badge-green">Canvas 620x400</span> <span class="sg34-badge sg34-badge-orange">8 Situations</span></div>' +
      '<p class="sg34-card-desc">그린미스/벙커/러프 등 상황별 파세이브 성공률을 분석합니다. 취약 상황을 파악하고 연습 계획을 세우세요.</p>' +
      '<div class="sg34-row" style="margin-top:10px">' +
      '<span class="sg34-label">Situation</span><select id="sg34-ps-sit" style="' + IST + '">' + SITUATIONS.map((s, i) => '<option value="' + i + '">' + s + '</option>').join('') + '</select>' +
      '<span class="sg34-label">Attempts</span><input type="number" id="sg34-ps-att" min="0" max="200" step="1" placeholder="-" style="width:70px;' + IST + '">' +
      '<span class="sg34-label">Saves</span><input type="number" id="sg34-ps-sav" min="0" max="200" step="1" placeholder="-" style="width:70px;' + IST + '">' +
      '<button class="sg34-btn sg34-btn-primary" onclick="window._sg34_parsave_record()">&#x2795; Record</button></div>' +
      '<div class="sg34-row"><button class="sg34-btn sg34-btn-outline" onclick="window._sg34_parsave_save()">&#x1F4BE; Save</button> <button class="sg34-btn sg34-btn-outline" onclick="window._sg34_parsave_reset()">&#x21BB; Reset</button></div>' +
      '<div id="sg34-canvas-parsave-wrap" class="sg34-canvas-wrap"></div>';

    window._sg34_parsave_record = () => {
      const i = numVal('sg34-ps-sit', 0, SITUATIONS.length - 1);
      const att = numVal('sg34-ps-att', 0, 200);
      const sav = numVal('sg34-ps-sav', 0, 200);
      if (i === null || att === null || sav === null) return;
      if (sav > att) return; // 세이브가 시도보다 많을 수 없다
      saveData[i] = { attempts: Math.round(att), saves: Math.round(sav) };
      SFX.par_save(); render(saveData);
    };
    window._sg34_parsave_save = () => { LS('par_saves_v2', saveData); SFX.par_save(); };
    window._sg34_parsave_reset = () => { saveData = SITUATIONS.map(() => ({ attempts: 0, saves: 0 })); render(saveData); };

    makeOverlay('sg34-parsave', 'linear-gradient(135deg,#1b5e20,#43a047)', '&#x1F3AF; Par Save Analyzer', html);
    setTimeout(() => render(saveData), 100);
    _checkAchievementsV34('parsave_opened');
  }

  // ===============================================================
  // 4. GOLF SEASON CALENDAR - Canvas 620x380
  // ===============================================================
  function openGolfSeasonCalendar() {
    SFX.season_view();
    const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    // 월별 라운드/평균스코어/핸디캡은 사용자가 입력할 때만 채워진다
    let seasonData = LS('season_cal_v2') || MONTHS.map(m => ({
      month: m,
      rounds: 0,
      avgScore: null,
      hcp: null
    }));

    function render(d) {
      const cid = 'sg34-canvas-season';
      let wrap = document.getElementById(cid + '-wrap');
      if (!wrap) return;
      wrap.innerHTML = '<canvas id="' + cid + '" width="620" height="380"></canvas>';
      const canvas = document.getElementById(cid);
      const ctx = canvas.getContext('2d');
      const W = 620, H = 380;
      ctx.fillStyle = cBg(); ctx.fillRect(0, 0, W, H);

      ctx.fillStyle = cText(); ctx.font = 'bold 14px sans-serif';
      ctx.fillText('Golf Season Calendar 2026', 20, 25);

      const cellW = 46, cellH = 46, startX = 30, startY = 50;
      const maxRounds = Math.max(...d.map(m => m.rounds), 1);

      // Heatmap grid (3 rows x 4 cols)
      d.forEach((m, i) => {
        const col = i % 4, row = Math.floor(i / 4);
        const x = startX + col * (cellW + 8) + col * 90;
        const y = startY + row * (cellH + 50);
        const intensity = m.rounds / maxRounds;
        const r = Math.round(200 - intensity * 180);
        const g = Math.round(230 - intensity * 50);
        const b = Math.round(200 - intensity * 180);
        ctx.fillStyle = isDark() ? 'rgba(' + (30 + intensity * 50) + ',' + (80 + intensity * 100) + ',' + (30 + intensity * 50) + ',1)' : 'rgb(' + r + ',' + g + ',' + b + ')';
        ctx.fillRect(x, y, cellW + 80, cellH);
        ctx.strokeStyle = cGrid(); ctx.strokeRect(x, y, cellW + 80, cellH);

        ctx.fillStyle = intensity > 0.6 ? '#fff' : cText();
        ctx.font = 'bold 13px sans-serif'; ctx.textAlign = 'center';
        ctx.fillText(m.month, x + (cellW + 80) / 2, y + 18);
        ctx.font = '10px sans-serif';
        const avgTxt = (typeof m.avgScore === 'number' && !isNaN(m.avgScore)) ? m.avgScore : '-';
        const hcpTxt = (typeof m.hcp === 'number' && !isNaN(m.hcp)) ? m.hcp.toFixed(1) : '-';
        ctx.fillText((m.rounds || 0) + 'R / Avg ' + avgTxt, x + (cellW + 80) / 2, y + 34);
        ctx.fillText('HCP ' + hcpTxt, x + (cellW + 80) / 2, y + 44);
      });
      ctx.textAlign = 'left';

      // Summary
      const totalRounds = d.reduce((s, m) => s + (m.rounds || 0), 0);
      const playedMonths = d.filter(m => m.rounds > 0);
      const scored = playedMonths.filter(m => typeof m.avgScore === 'number' && !isNaN(m.avgScore));
      const overallAvg = scored.length > 0 ? (scored.reduce((s, m) => s + m.avgScore, 0) / scored.length).toFixed(1) : '-';

      if (totalRounds === 0) {
        ctx.fillStyle = cMuted(); ctx.font = 'bold 12px sans-serif';
        ctx.fillText(EMPTY_MSG, 20, H - 20);
        return;
      }

      ctx.fillStyle = cText(); ctx.font = 'bold 12px sans-serif';
      ctx.fillText('Total Rounds: ' + totalRounds + ' | Avg Score: ' + overallAvg + ' | Active Months: ' + playedMonths.length + '/12', 20, H - 20);
    }

    const html = '<div class="sg34-row"><span class="sg34-badge sg34-badge-teal">Canvas 620x380</span> <span class="sg34-badge sg34-badge-amber">12 Months</span></div>' +
      '<p class="sg34-card-desc">12개월 시즌 히트맵으로 라운드 빈도, 평균 스코어, 핸디캡 추이를 한눈에 파악합니다.</p>' +
      '<div class="sg34-row" style="margin-top:10px">' +
      '<span class="sg34-label">Month</span><select id="sg34-se-month" style="' + IST + '">' + MONTHS.map((m, i) => '<option value="' + i + '">' + m + '</option>').join('') + '</select>' +
      '<span class="sg34-label">Rounds</span><input type="number" id="sg34-se-rounds" min="0" max="31" step="1" placeholder="-" style="width:66px;' + IST + '">' +
      '<span class="sg34-label">Avg Score</span><input type="number" id="sg34-se-avg" min="50" max="150" step="1" placeholder="-" style="width:70px;' + IST + '">' +
      '<span class="sg34-label">HCP</span><input type="number" id="sg34-se-hcp" min="0" max="54" step="0.1" placeholder="-" style="width:70px;' + IST + '">' +
      '<button class="sg34-btn sg34-btn-primary" onclick="window._sg34_season_record()">&#x2795; Record</button></div>' +
      '<div class="sg34-row"><button class="sg34-btn sg34-btn-outline" onclick="window._sg34_season_save()">&#x1F4BE; Save</button> <button class="sg34-btn sg34-btn-outline" onclick="window._sg34_season_reset()">&#x21BB; Reset</button></div>' +
      '<div id="sg34-canvas-season-wrap" class="sg34-canvas-wrap"></div>';

    window._sg34_season_record = () => {
      const i = numVal('sg34-se-month', 0, 11);
      if (i === null) return;
      const r = numVal('sg34-se-rounds', 0, 31);
      if (r === null) return; // 라운드 수는 필수
      const a = numVal('sg34-se-avg', 50, 150);
      const h = numVal('sg34-se-hcp', 0, 54);
      seasonData[i] = { month: MONTHS[i], rounds: Math.round(r), avgScore: a === null ? null : Math.round(a), hcp: h };
      SFX.season_view(); render(seasonData);
    };
    window._sg34_season_save = () => { LS('season_cal_v2', seasonData); SFX.season_view(); };
    window._sg34_season_reset = () => {
      seasonData = MONTHS.map(m => ({ month: m, rounds: 0, avgScore: null, hcp: null }));
      render(seasonData);
    };

    makeOverlay('sg34-season', 'linear-gradient(135deg,#00695c,#26a69a)', '&#x1F4C5; Golf Season Calendar', html);
    setTimeout(() => render(seasonData), 100);
    _checkAchievementsV34('season_opened');
  }

  // ===============================================================
  // 5. COURSE STRATEGY NOTEPAD - Canvas 600x360
  // ===============================================================
  function openCourseStrategyNotepad() {
    SFX.note_write();
    let notes = LS('course_notes') || Array.from({length: 18}, (_, i) => ({
      hole: i + 1,
      par: [4,4,3,5,4,4,3,4,5,4,4,3,5,4,4,3,4,5][i],
      pin: ['Center','Front-L','Back-R','Center','Front-R','Back-L','Center','Front','Back','Center','Front-L','Back-R','Center','Front-R','Back','Center','Front-L','Back-R'][i],
      wind: ['None','Tail','Head','Cross-L','None','Cross-R','Head','Tail','None','Cross-L','None','Head','Tail','Cross-R','None','Cross-L','Head','None'][i],
      strategy: ''
    }));
    let selectedHole = 0;

    function render(d) {
      const cid = 'sg34-canvas-notepad';
      let wrap = document.getElementById(cid + '-wrap');
      if (!wrap) return;
      wrap.innerHTML = '<canvas id="' + cid + '" width="600" height="360"></canvas>';
      const canvas = document.getElementById(cid);
      const ctx = canvas.getContext('2d');
      const W = 600, H = 360;
      ctx.fillStyle = cBg(); ctx.fillRect(0, 0, W, H);

      ctx.fillStyle = cText(); ctx.font = 'bold 14px sans-serif';
      ctx.fillText('Course Strategy Notepad', 20, 25);

      // Mini-map: 18 hole buttons
      const btnW = 28, btnH = 28, startX = 20, startY = 45;
      d.forEach((h, i) => {
        const col = i % 9, row = Math.floor(i / 9);
        const x = startX + col * (btnW + 4);
        const y = startY + row * (btnH + 4);
        ctx.fillStyle = i === selectedHole ? '#1a7a3a' : (h.strategy ? '#4caf50' : (isDark() ? '#333' : '#e0e0e0'));
        ctx.fillRect(x, y, btnW, btnH);
        ctx.strokeStyle = cGrid(); ctx.strokeRect(x, y, btnW, btnH);
        ctx.fillStyle = i === selectedHole ? '#fff' : (h.strategy ? '#fff' : cText());
        ctx.font = 'bold 10px sans-serif'; ctx.textAlign = 'center';
        ctx.fillText('H' + (i + 1), x + btnW / 2, y + btnH / 2 + 3);
      });
      ctx.textAlign = 'left';

      // Selected hole details
      const sel = d[selectedHole];
      const detailY = 120;
      ctx.fillStyle = cText(); ctx.font = 'bold 16px sans-serif';
      ctx.fillText('Hole ' + sel.hole + ' (Par ' + sel.par + ')', 20, detailY);

      ctx.font = '12px sans-serif'; ctx.fillStyle = cMuted();
      ctx.fillText('Pin: ' + sel.pin + '  |  Wind: ' + sel.wind, 20, detailY + 22);

      // Strategy visualization
      ctx.fillStyle = isDark() ? '#252525' : '#f0f0f0';
      ctx.fillRect(20, detailY + 40, W - 40, 180);
      ctx.strokeStyle = cGrid();
      ctx.strokeRect(20, detailY + 40, W - 40, 180);

      // Simple hole layout
      const holeX = 100, holeY = detailY + 60, holeW = 120, holeH = 150;
      ctx.fillStyle = '#81c784'; ctx.fillRect(holeX, holeY, holeW, holeH);
      ctx.fillStyle = '#a5d6a7';
      ctx.beginPath(); ctx.arc(holeX + holeW / 2, holeY + 25, 22, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#fff'; ctx.font = '8px sans-serif'; ctx.textAlign = 'center';
      ctx.fillText('GREEN', holeX + holeW / 2, holeY + 28);
      ctx.fillStyle = '#4a4'; ctx.font = '8px sans-serif';
      ctx.fillText('FAIRWAY', holeX + holeW / 2, holeY + holeH / 2 + 10);
      ctx.fillStyle = '#c62828'; ctx.font = 'bold 6px sans-serif';
      ctx.fillText('Pin: ' + sel.pin, holeX + holeW / 2, holeY + 42);
      ctx.fillStyle = '#1565c0'; ctx.font = '8px sans-serif';
      ctx.fillText('Wind: ' + sel.wind, holeX + holeW / 2, holeY + holeH - 10);
      ctx.textAlign = 'left';

      // Notes filled count
      const filled = d.filter(h => h.strategy).length;
      ctx.fillStyle = cText(); ctx.font = '12px sans-serif';
      ctx.fillText('Notes filled: ' + filled + '/18', 280, detailY + 70);

      // Strategy tips
      const tips = sel.par === 3 ? ['Club selection key', 'Aim for green center', 'Avoid long-side miss'] :
                   sel.par === 5 ? ['Layup or go for it?', 'Check wind for 2nd', 'Short game crucial'] :
                   ['Driver or iron off tee?', 'Target: left/center/right', 'Approach distance plan'];
      ctx.fillStyle = cMuted(); ctx.font = '11px sans-serif';
      tips.forEach((t, i) => ctx.fillText('&#8226; ' + t, 280, detailY + 95 + i * 18));

      ctx.fillStyle = '#1a7a3a'; ctx.font = 'bold 11px sans-serif';
      ctx.fillText('Click hole number to select', 280, detailY + 170);
    }

    const html = '<div class="sg34-row"><span class="sg34-badge sg34-badge-blue">Canvas 600x360</span> <span class="sg34-badge sg34-badge-green">18 Holes</span></div>' +
      '<p class="sg34-card-desc">18홀 각 홀의 핀 위치, 바람, 전략을 메모합니다. 라운드 전 코스 공략을 미리 계획하세요.</p>' +
      '<div class="sg34-tabs" id="sg34-notepad-tabs"></div>' +
      '<div id="sg34-canvas-notepad-wrap" class="sg34-canvas-wrap"></div>';

    makeOverlay('sg34-notepad', 'linear-gradient(135deg,#1565c0,#42a5f5)', '&#x1F4DD; Course Strategy Notepad', html);

    setTimeout(() => {
      const tabsEl = document.getElementById('sg34-notepad-tabs');
      if (tabsEl) {
        for (let i = 0; i < 18; i++) {
          const tab = document.createElement('button');
          tab.className = 'sg34-tab' + (i === 0 ? ' active' : '');
          tab.textContent = 'H' + (i + 1);
          tab.onclick = () => {
            selectedHole = i;
            tabsEl.querySelectorAll('.sg34-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            SFX.note_write();
            render(notes);
          };
          tabsEl.appendChild(tab);
        }
      }
      render(notes);
    }, 100);
    _checkAchievementsV34('notepad_opened');
  }

  // ===============================================================
  // 6. CLUB DISTANCE HISTOGRAM - Canvas 620x400
  // ===============================================================
  function openClubDistanceHistogram() {
    SFX.dist_scan();
    const CLUBS = ['DR', '3W', '5W', '3H', '4I', '5I', '6I', '7I', '8I', '9I', 'PW', 'GW', 'SW', 'LW'];
    const BASE_DIST = [250, 230, 215, 200, 190, 180, 170, 160, 145, 135, 125, 110, 95, 75];
    // 클럽별 거리는 사용자가 입력할 때만 채워진다 (BASE_DIST는 입력 폼의 참고 힌트로만 사용)
    let distData = LS('club_dist_v2') || CLUBS.map(c => ({
      club: c,
      avg: null,
      min: null,
      max: null,
      stdev: null
    }));

    function render(d) {
      const cid = 'sg34-canvas-dist';
      let wrap = document.getElementById(cid + '-wrap');
      if (!wrap) return;
      wrap.innerHTML = '<canvas id="' + cid + '" width="620" height="400"></canvas>';
      const canvas = document.getElementById(cid);
      const ctx = canvas.getContext('2d');
      const W = 620, H = 400;
      ctx.fillStyle = cBg(); ctx.fillRect(0, 0, W, H);

      ctx.fillStyle = cText(); ctx.font = 'bold 14px sans-serif';
      ctx.fillText('Club Distance Distribution', 20, 25);

      const barW = 32, gap = 8, startX = 45, startY = H - 60;
      const hasDist = c => typeof c.avg === 'number' && !isNaN(c.avg);
      const distRec = d.filter(hasDist);
      const maxDist = Math.max.apply(null, distRec.map(c => (typeof c.max === 'number' ? c.max : c.avg)).concat([280]));
      const scaleY = (startY - 50) / maxDist;

      // Y axis
      for (let y = 0; y <= maxDist; y += 50) {
        const py = startY - y * scaleY;
        ctx.strokeStyle = cGrid(); ctx.lineWidth = 0.5;
        ctx.beginPath(); ctx.moveTo(startX - 5, py); ctx.lineTo(W - 10, py); ctx.stroke();
        ctx.fillStyle = cMuted(); ctx.font = '9px sans-serif'; ctx.textAlign = 'right';
        ctx.fillText(y + 'y', startX - 8, py + 3);
      }
      ctx.textAlign = 'left';

      d.forEach((c, i) => {
        const x = startX + i * (barW + gap);

        // Labels (클럽명은 항상 표시)
        ctx.fillStyle = cText(); ctx.font = 'bold 9px sans-serif'; ctx.textAlign = 'center';
        ctx.fillText(c.club, x + barW / 2, startY + 14);

        if (!hasDist(c)) return;

        const avgH = c.avg * scaleY;

        // Range bar (min-max) - 입력된 경우만
        if (typeof c.min === 'number' && typeof c.max === 'number') {
          const minY = startY - c.min * scaleY;
          const maxY = startY - c.max * scaleY;
          ctx.fillStyle = isDark() ? 'rgba(76,175,80,0.3)' : 'rgba(76,175,80,0.15)';
          ctx.fillRect(x + barW / 4, maxY, barW / 2, minY - maxY);
        }

        // Average bar
        const gradient = ctx.createLinearGradient(0, startY - avgH, 0, startY);
        gradient.addColorStop(0, '#2e7d32');
        gradient.addColorStop(1, '#81c784');
        ctx.fillStyle = gradient;
        ctx.fillRect(x, startY - avgH, barW, avgH);

        // Stdev markers - 입력된 경우만
        if (typeof c.stdev === 'number' && !isNaN(c.stdev)) {
          ctx.strokeStyle = '#ff9800'; ctx.lineWidth = 2;
          const sdTop = startY - (c.avg + c.stdev) * scaleY;
          const sdBot = startY - (c.avg - c.stdev) * scaleY;
          ctx.beginPath(); ctx.moveTo(x, sdTop); ctx.lineTo(x + barW, sdTop); ctx.stroke();
          ctx.beginPath(); ctx.moveTo(x, sdBot); ctx.lineTo(x + barW, sdBot); ctx.stroke();
        }

        ctx.font = '8px sans-serif'; ctx.fillStyle = cMuted(); ctx.textAlign = 'center';
        ctx.fillText(c.avg + 'y', x + barW / 2, startY - avgH - 6);
      });
      ctx.textAlign = 'left';

      if (!distRec.length) {
        drawEmpty(ctx, W, H);
        return;
      }

      // Legend
      ctx.fillStyle = '#2e7d32'; ctx.fillRect(W - 200, 15, 10, 10);
      ctx.fillStyle = cText(); ctx.font = '10px sans-serif';
      ctx.fillText('Average', W - 186, 24);
      ctx.fillStyle = 'rgba(76,175,80,0.3)'; ctx.fillRect(W - 200, 30, 10, 10);
      ctx.fillStyle = cText(); ctx.fillText('Min-Max Range', W - 186, 39);
      ctx.strokeStyle = '#ff9800'; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(W - 200, 50); ctx.lineTo(W - 190, 50); ctx.stroke();
      ctx.fillStyle = cText(); ctx.fillText('+/- 1 Stdev', W - 186, 54);
    }

    const html = '<div class="sg34-row"><span class="sg34-badge sg34-badge-green">Canvas 620x400</span> <span class="sg34-badge sg34-badge-blue">14 Clubs</span></div>' +
      '<p class="sg34-card-desc">14클럽의 거리 분포를 히스토그램으로 표시합니다. 평균, 최소-최대 범위, 표준편차를 시각화합니다.</p>' +
      '<div class="sg34-row" style="margin-top:10px">' +
      '<span class="sg34-label">Club</span><select id="sg34-cd-club" style="' + IST + '">' + CLUBS.map((c, i) => '<option value="' + i + '">' + c + ' (' + BASE_DIST[i] + 'y 참고)</option>').join('') + '</select>' +
      '<span class="sg34-label">Avg(y)</span><input type="number" id="sg34-cd-avg" min="10" max="400" step="1" placeholder="-" style="width:70px;' + IST + '">' +
      '<span class="sg34-label">Min</span><input type="number" id="sg34-cd-min" min="10" max="400" step="1" placeholder="-" style="width:66px;' + IST + '">' +
      '<span class="sg34-label">Max</span><input type="number" id="sg34-cd-max" min="10" max="400" step="1" placeholder="-" style="width:66px;' + IST + '">' +
      '<span class="sg34-label">Stdev</span><input type="number" id="sg34-cd-sd" min="0" max="50" step="1" placeholder="-" style="width:62px;' + IST + '">' +
      '<button class="sg34-btn sg34-btn-primary" onclick="window._sg34_dist_record()">&#x2795; Record</button></div>' +
      '<div class="sg34-row"><button class="sg34-btn sg34-btn-outline" onclick="window._sg34_dist_save()">&#x1F4BE; Save</button> <button class="sg34-btn sg34-btn-outline" onclick="window._sg34_dist_reset()">&#x21BB; Reset</button></div>' +
      '<div id="sg34-canvas-dist-wrap" class="sg34-canvas-wrap"></div>';

    window._sg34_dist_record = () => {
      const i = numVal('sg34-cd-club', 0, CLUBS.length - 1);
      const avg = numVal('sg34-cd-avg', 10, 400);
      if (i === null || avg === null) return; // 평균 거리는 필수
      let mn = numVal('sg34-cd-min', 10, 400);
      let mx = numVal('sg34-cd-max', 10, 400);
      if (mn !== null && mx !== null && mn > mx) { const t = mn; mn = mx; mx = t; }
      const sd = numVal('sg34-cd-sd', 0, 50);
      distData[i] = { club: CLUBS[i], avg: Math.round(avg), min: mn === null ? null : Math.round(mn), max: mx === null ? null : Math.round(mx), stdev: sd === null ? null : Math.round(sd) };
      SFX.dist_scan(); render(distData);
    };
    window._sg34_dist_save = () => { LS('club_dist_v2', distData); SFX.dist_scan(); };
    window._sg34_dist_reset = () => { distData = CLUBS.map(c => ({ club: c, avg: null, min: null, max: null, stdev: null })); render(distData); };

    makeOverlay('sg34-dist', 'linear-gradient(135deg,#1b5e20,#4caf50)', '&#x1F4CF; Club Distance Histogram', html);
    setTimeout(() => render(distData), 100);
    _checkAchievementsV34('dist_opened');
  }

  // ===============================================================
  // 7. ROUND ENERGY MANAGER - Canvas 580x360
  // ===============================================================
  function openRoundEnergyManager() {
    SFX.energy_check();
    // 에너지/수분/영양은 사용자가 홀마다 입력할 때만 채워진다
    let energyData = LS('energy_v2') || Array.from({length: 18}, (_, i) => ({
      hole: i + 1,
      energy: null,
      hydration: null,
      nutrition: null
    }));

    function render(d) {
      const cid = 'sg34-canvas-energy';
      let wrap = document.getElementById(cid + '-wrap');
      if (!wrap) return;
      wrap.innerHTML = '<canvas id="' + cid + '" width="580" height="360"></canvas>';
      const canvas = document.getElementById(cid);
      const ctx = canvas.getContext('2d');
      const W = 580, H = 360;
      ctx.fillStyle = cBg(); ctx.fillRect(0, 0, W, H);

      ctx.fillStyle = cText(); ctx.font = 'bold 14px sans-serif';
      ctx.fillText('Round Energy Manager', 20, 25);

      const startX = 55, endX = W - 25, startY = 50, endY = H - 60;
      const stepX = (endX - startX) / 17;

      // Y axis
      for (let p = 0; p <= 100; p += 25) {
        const y = endY - (endY - startY) * p / 100;
        ctx.strokeStyle = cGrid(); ctx.lineWidth = 0.5;
        ctx.beginPath(); ctx.moveTo(startX, y); ctx.lineTo(endX, y); ctx.stroke();
        ctx.fillStyle = cMuted(); ctx.font = '9px sans-serif'; ctx.textAlign = 'right';
        ctx.fillText(p + '%', startX - 6, y + 3);
      }
      ctx.textAlign = 'left';

      // Danger zone (below 30%)
      const dangerY = endY - (endY - startY) * 0.3;
      ctx.fillStyle = isDark() ? 'rgba(244,67,54,0.1)' : 'rgba(244,67,54,0.05)';
      ctx.fillRect(startX, dangerY, endX - startX, endY - dangerY);
      ctx.fillStyle = '#f44336'; ctx.font = '9px sans-serif';
      ctx.fillText('Danger Zone', startX + 5, dangerY + 12);

      // Draw lines
      const lines = [
        { key: 'energy', color: '#4caf50', label: 'Energy' },
        { key: 'hydration', color: '#2196f3', label: 'Hydration' },
        { key: 'nutrition', color: '#ff9800', label: 'Nutrition' }
      ];

      const hasVal = v => typeof v === 'number' && !isNaN(v);
      const anyEntry = d.some(h => hasVal(h.energy) || hasVal(h.hydration) || hasVal(h.nutrition));

      lines.forEach(line => {
        const pts = [];
        d.forEach((h, i) => {
          if (!hasVal(h[line.key])) return;
          const val = Math.min(100, Math.max(0, h[line.key]));
          pts.push({ x: startX + i * stepX, y: endY - (endY - startY) * val / 100, val: val });
        });

        if (pts.length >= 2) {
          ctx.strokeStyle = line.color; ctx.lineWidth = 2.5;
          ctx.beginPath();
          pts.forEach((p, i) => { if (i === 0) ctx.moveTo(p.x, p.y); else ctx.lineTo(p.x, p.y); });
          ctx.stroke();
        }

        // Dots
        pts.forEach(p => {
          ctx.fillStyle = p.val < 30 ? '#f44336' : line.color;
          ctx.beginPath(); ctx.arc(p.x, p.y, 3, 0, Math.PI * 2); ctx.fill();
        });
      });

      // X axis labels
      d.forEach((h, i) => {
        const x = startX + i * stepX;
        ctx.fillStyle = cText(); ctx.font = '8px sans-serif'; ctx.textAlign = 'center';
        ctx.fillText(i + 1, x, endY + 14);
      });
      ctx.textAlign = 'left';

      // Legend
      lines.forEach((line, i) => {
        const lx = 20 + i * 130;
        ctx.fillStyle = line.color; ctx.fillRect(lx, H - 25, 10, 10);
        ctx.fillStyle = cText(); ctx.font = '10px sans-serif';
        ctx.fillText(line.label, lx + 14, H - 16);
      });

      if (!anyEntry) {
        drawEmpty(ctx, W, H);
        return;
      }

      // Recommendations - 마지막으로 기록된 홀 기준
      const lastRec = d.slice().reverse().find(h => hasVal(h.energy) || hasVal(h.hydration));
      if (lastRec && ((hasVal(lastRec.energy) && lastRec.energy < 30) || (hasVal(lastRec.hydration) && lastRec.hydration < 30))) {
        ctx.fillStyle = '#f44336'; ctx.font = 'bold 10px sans-serif';
        ctx.fillText('Warning: Low levels detected! (H' + lastRec.hole + ')', W - 280, 25);
      }
    }

    const html = '<div class="sg34-row"><span class="sg34-badge sg34-badge-orange">Canvas 580x360</span> <span class="sg34-badge sg34-badge-red">3 Metrics</span></div>' +
      '<p class="sg34-card-desc">18홀 동안의 에너지/수분/영양 레벨을 추적합니다. 위험 구간을 감지하고 보급 타이밍을 최적화하세요.</p>' +
      '<div class="sg34-row" style="margin-top:10px">' +
      '<span class="sg34-label">Hole</span><select id="sg34-en-hole" style="' + IST + '">' + holeOptions(18) + '</select>' +
      '<span class="sg34-label">Energy%</span><input type="number" id="sg34-en-e" min="0" max="100" step="1" placeholder="-" style="width:66px;' + IST + '">' +
      '<span class="sg34-label">Hydration%</span><input type="number" id="sg34-en-h" min="0" max="100" step="1" placeholder="-" style="width:66px;' + IST + '">' +
      '<span class="sg34-label">Nutrition%</span><input type="number" id="sg34-en-n" min="0" max="100" step="1" placeholder="-" style="width:66px;' + IST + '">' +
      '<button class="sg34-btn sg34-btn-primary" onclick="window._sg34_energy_record()">&#x2795; Record</button></div>' +
      '<div class="sg34-row"><button class="sg34-btn sg34-btn-outline" onclick="window._sg34_energy_save()">&#x1F4BE; Save</button> <button class="sg34-btn sg34-btn-outline" onclick="window._sg34_energy_reset()">&#x21BB; Reset</button></div>' +
      '<div id="sg34-canvas-energy-wrap" class="sg34-canvas-wrap"></div>';

    window._sg34_energy_record = () => {
      const h = numVal('sg34-en-hole', 1, 18);
      if (h === null) return;
      const e = numVal('sg34-en-e', 0, 100);
      const hy = numVal('sg34-en-h', 0, 100);
      const n = numVal('sg34-en-n', 0, 100);
      if (e === null && hy === null && n === null) return;
      const row = energyData[h - 1];
      if (!row) return;
      if (e !== null) row.energy = Math.round(e);
      if (hy !== null) row.hydration = Math.round(hy);
      if (n !== null) row.nutrition = Math.round(n);
      SFX.energy_check(); render(energyData);
    };
    window._sg34_energy_save = () => { LS('energy_v2', energyData); SFX.energy_check(); };
    window._sg34_energy_reset = () => {
      energyData = Array.from({length: 18}, (_, i) => ({ hole: i + 1, energy: null, hydration: null, nutrition: null }));
      render(energyData);
    };

    makeOverlay('sg34-energy', 'linear-gradient(135deg,#e65100,#ff9800)', '&#x26A1; Round Energy Manager', html);
    setTimeout(() => render(energyData), 100);
    _checkAchievementsV34('energy_opened');
  }

  // ===============================================================
  // 8. HANDICAP SIMULATOR - Canvas 600x380
  // ===============================================================
  function openHandicapSimulator() {
    SFX.hcp_sim();
    // 라운드 기록은 사용자가 직접 추가한 것만 사용한다 (빈 배열로 시작)
    let rounds = LS('hcp_rounds_v2') || [];

    function calcHCP(rds) {
      if (rds.length < 3) return null;
      const diffs = rds.map(r => (r.score - r.courseRating) * 113 / r.slopeRating);
      diffs.sort((a, b) => a - b);
      const n = rds.length;
      let take;
      if (n <= 4) take = 1;
      else if (n <= 6) take = 2;
      else if (n <= 8) take = 3;
      else if (n <= 11) take = 4;
      else if (n <= 14) take = 5;
      else if (n <= 16) take = 6;
      else if (n <= 18) take = 7;
      else take = 8;
      const best = diffs.slice(0, take);
      return (best.reduce((s, v) => s + v, 0) / take);
    }

    function render(rds) {
      const cid = 'sg34-canvas-hcp';
      let wrap = document.getElementById(cid + '-wrap');
      if (!wrap) return;
      wrap.innerHTML = '<canvas id="' + cid + '" width="600" height="380"></canvas>';
      const canvas = document.getElementById(cid);
      const ctx = canvas.getContext('2d');
      const W = 600, H = 380;
      ctx.fillStyle = cBg(); ctx.fillRect(0, 0, W, H);

      const hcp = calcHCP(rds);
      ctx.fillStyle = cText(); ctx.font = 'bold 14px sans-serif';
      ctx.fillText('WHS Handicap Simulator', 20, 25);
      if (hcp !== null) {
        ctx.font = 'bold 28px sans-serif'; ctx.fillStyle = '#1a7a3a';
        ctx.fillText('HCP: ' + hcp.toFixed(1), 20, 65);
      }

      ctx.font = '11px sans-serif'; ctx.fillStyle = cMuted();
      ctx.fillText('Rounds: ' + rds.length + '/20' + (rds.length >= 3 ? ' | Best differentials used' : ' | 3라운드 이상 입력 시 HCP 계산'), 20, 85);

      if (!rds.length) {
        drawEmpty(ctx, W, H);
        return;
      }

      // Score line chart
      const startX = 50, endX = W - 25, startY = 110, endY = H - 50;
      const stepX = rds.length > 1 ? (endX - startX) / (rds.length - 1) : 0;
      const minScore = Math.min(...rds.map(r => r.score)) - 2;
      const maxScore = Math.max(...rds.map(r => r.score)) + 2;
      const scaleY = (endY - startY) / (maxScore - minScore);

      // Grid
      for (let s = Math.floor(minScore / 5) * 5; s <= maxScore; s += 5) {
        const y = endY - (s - minScore) * scaleY;
        ctx.strokeStyle = cGrid(); ctx.lineWidth = 0.5;
        ctx.beginPath(); ctx.moveTo(startX, y); ctx.lineTo(endX, y); ctx.stroke();
        ctx.fillStyle = cMuted(); ctx.font = '9px sans-serif'; ctx.textAlign = 'right';
        ctx.fillText(s, startX - 6, y + 3);
      }
      ctx.textAlign = 'left';

      // Score line
      ctx.strokeStyle = '#2196f3'; ctx.lineWidth = 2;
      ctx.beginPath();
      rds.forEach((r, i) => {
        const x = startX + i * stepX;
        const y = endY - (r.score - minScore) * scaleY;
        if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      });
      ctx.stroke();

      // Course rating line
      ctx.strokeStyle = '#ff9800'; ctx.lineWidth = 1.5; ctx.setLineDash([4, 4]);
      ctx.beginPath();
      rds.forEach((r, i) => {
        const x = startX + i * stepX;
        const y = endY - (r.courseRating - minScore) * scaleY;
        if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      });
      ctx.stroke();
      ctx.setLineDash([]);

      // Dots
      rds.forEach((r, i) => {
        const x = startX + i * stepX;
        const y = endY - (r.score - minScore) * scaleY;
        ctx.fillStyle = r.score <= r.courseRating + 2 ? '#4caf50' : '#f44336';
        ctx.beginPath(); ctx.arc(x, y, 4, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = cText(); ctx.font = '8px sans-serif'; ctx.textAlign = 'center';
        ctx.fillText('R' + (i + 1), x, endY + 14);
      });
      ctx.textAlign = 'left';

      // Legend
      ctx.strokeStyle = '#2196f3'; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(W - 190, H - 32); ctx.lineTo(W - 170, H - 32); ctx.stroke();
      ctx.fillStyle = cText(); ctx.font = '10px sans-serif';
      ctx.fillText('Score', W - 166, H - 28);
      ctx.strokeStyle = '#ff9800'; ctx.setLineDash([4, 4]);
      ctx.beginPath(); ctx.moveTo(W - 190, H - 16); ctx.lineTo(W - 170, H - 16); ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillText('Course Rating', W - 166, H - 12);

      // Target HCP projection
      if (hcp !== null) {
        const target = Math.max(0, hcp - 2);
        ctx.fillStyle = '#1a7a3a'; ctx.font = '11px sans-serif';
        ctx.fillText('Target: HCP ' + target.toFixed(1) + ' (need avg ' + (72 + target).toFixed(0) + ')', 200, 65);
      }
    }

    const html = '<div class="sg34-row"><span class="sg34-badge sg34-badge-purple">Canvas 600x380</span> <span class="sg34-badge sg34-badge-teal">WHS Formula</span></div>' +
      '<p class="sg34-card-desc">WHS 공식 기반 핸디캡을 시뮬레이션합니다. 20라운드 스코어로 핸디캡 인덱스를 계산하고 목표 달성을 예측합니다.</p>' +
      '<div class="sg34-row" style="margin-top:10px">' +
      '<span class="sg34-label">Score</span><input type="number" id="sg34-hcp-score" min="50" max="150" step="1" placeholder="-" style="width:70px;' + IST + '">' +
      '<span class="sg34-label">Course Rating</span><input type="number" id="sg34-hcp-cr" min="55" max="80" step="0.1" placeholder="72.0" style="width:74px;' + IST + '">' +
      '<span class="sg34-label">Slope</span><input type="number" id="sg34-hcp-slope" min="55" max="155" step="1" placeholder="113" style="width:70px;' + IST + '">' +
      '<button class="sg34-btn sg34-btn-primary" onclick="window._sg34_hcp_add()">&#x2795; Add Round</button></div>' +
      '<div class="sg34-row"><button class="sg34-btn sg34-btn-outline" onclick="window._sg34_hcp_undo()">&#x21A9; Undo</button> <button class="sg34-btn sg34-btn-outline" onclick="window._sg34_hcp_save()">&#x1F4BE; Save</button> <button class="sg34-btn sg34-btn-outline" onclick="window._sg34_hcp_reset()">&#x21BB; Reset</button></div>' +
      '<div id="sg34-canvas-hcp-wrap" class="sg34-canvas-wrap"></div>';

    window._sg34_hcp_add = () => {
      const sc = numVal('sg34-hcp-score', 50, 150);
      const cr = numVal('sg34-hcp-cr', 55, 80);
      const sl = numVal('sg34-hcp-slope', 55, 155);
      if (sc === null || cr === null || sl === null) return; // 세 값 모두 필요
      rounds.push({ score: Math.round(sc), courseRating: cr, slopeRating: Math.round(sl) });
      if (rounds.length > 20) rounds.shift(); // WHS: 최근 20라운드
      SFX.hcp_sim(); render(rounds);
    };
    window._sg34_hcp_undo = () => { rounds.pop(); render(rounds); };
    window._sg34_hcp_save = () => { LS('hcp_rounds_v2', rounds); SFX.hcp_sim(); };
    window._sg34_hcp_reset = () => { rounds = []; render(rounds); };

    makeOverlay('sg34-hcp', 'linear-gradient(135deg,#4a148c,#7b1fa2)', '&#x1F4C9; Handicap Simulator', html);
    setTimeout(() => render(rounds), 100);
    _checkAchievementsV34('hcp_opened');
  }

  // ===============================================================
  // GOLF IQ v18 - 15 Questions
  // ===============================================================
  function openGolfIQv18() {
    SFX.quiz_v18();
    const questions = [
      { q: 'WHS에서 핸디캡 인덱스 계산 시 사용하는 최대 라운드 수는?', o: ['10', '15', '20', '25'], a: 2 },
      { q: '골프공의 최대 무게 제한은?', o: ['45.93g', '42.67g', '48.00g', '50.00g'], a: 0 },
      { q: 'Stimpmeter로 측정하는 것은?', o: ['바람 속도', '그린 스피드', '페어웨이 경도', '모래 밀도'], a: 1 },
      { q: '파5홀에서 2온 성공을 무엇이라 하는가?', o: ['이글 퍼트', 'GIR', '앨버트로스 시도', '2온 그린'], a: 0 },
      { q: 'PGA 투어 평균 드라이버 런치 앵글은?', o: ['8-9도', '10.5-11.5도', '13-14도', '15-16도'], a: 1 },
      { q: 'Slope Rating 155는 어떤 의미인가?', o: ['매우 쉬운 코스', '표준 난이도', '매우 어려운 코스', '파72 코스'], a: 2 },
      { q: '골프에서 Scrambling이란?', o: ['그린미스 후 파세이브', '더블보기 회피', 'OB 후 3번째 샷', '번째 티샷'], a: 0 },
      { q: '바람 10mph 맞바람에서 거리 보정은 약?', o: ['3-5%', '5-8%', '10-12%', '15-20%'], a: 1 },
      { q: 'MOI(Moment of Inertia)가 높은 드라이버의 특징은?', o: ['더 긴 비거리', '미스히트 관용성 증가', '스핀 감소', '낮은 탄도'], a: 1 },
      { q: 'Strokes Gained: Putting에서 양수 값은?', o: ['필드 평균보다 나쁨', '필드 평균과 동일', '필드 평균보다 좋음', '파 기준 초과'], a: 2 },
      { q: '코스 레이팅 73.5의 의미는?', o: ['파 73.5', '스크래치 골퍼 기대 스코어 73.5', 'HCP 73.5', '슬로프 73.5'], a: 1 },
      { q: '골프공 딤플의 주요 역할은?', o: ['그립감 향상', '양력 생성 및 항력 감소', '스핀 증가', '소리 개선'], a: 1 },
      { q: 'Up-and-Down 성공률 PGA 투어 평균은 약?', o: ['40-45%', '50-55%', '58-62%', '70-75%'], a: 2 },
      { q: 'ESC(Equitable Stroke Control)에서 코스 핸디캡 10-19는 최대?', o: ['더블보기', '7타', '8타', '9타'], a: 1 },
      { q: 'USGA에서 규정하는 최대 클럽 개수는?', o: ['12개', '14개', '16개', '18개'], a: 1 }
    ];

    let idx = 0, score = 0, answered = Array(questions.length).fill(null);

    function buildQuiz() {
      return '<div id="sg34-iq18-content"></div>';
    }

    function render() {
      const el = document.getElementById('sg34-iq18-content');
      if (!el) return;
      const q = questions[idx];
      let html = '<div class="sg34-row" style="margin-bottom:8px"><span class="sg34-badge sg34-badge-blue">Q' + (idx + 1) + '/' + questions.length + '</span> <span class="sg34-badge sg34-badge-green">Score: ' + score + '</span></div>';
      html += '<div class="sg34-card"><div class="sg34-card-title">' + q.q + '</div></div>';
      q.o.forEach((opt, oi) => {
        const selected = answered[idx] === oi;
        const isCorrect = oi === q.a;
        const showResult = answered[idx] !== null;
        let style = '';
        if (showResult && selected && isCorrect) style = 'border:2px solid #4caf50;background:#e8f5e9';
        else if (showResult && selected && !isCorrect) style = 'border:2px solid #f44336;background:#ffebee';
        else if (showResult && isCorrect) style = 'border:2px solid #4caf50;background:#e8f5e9';
        html += '<div class="sg34-card" style="' + style + '" onclick="window._sg34_iq18_answer(' + oi + ')"><div class="sg34-card-desc">' + String.fromCharCode(65 + oi) + '. ' + opt + '</div></div>';
      });
      html += '<div class="sg34-row" style="margin-top:12px;justify-content:space-between">';
      html += '<button class="sg34-btn sg34-btn-outline" onclick="window._sg34_iq18_prev()" ' + (idx === 0 ? 'disabled' : '') + '>&larr; Prev</button>';
      if (idx < questions.length - 1) html += '<button class="sg34-btn sg34-btn-primary" onclick="window._sg34_iq18_next()">Next &rarr;</button>';
      else html += '<button class="sg34-btn sg34-btn-primary" onclick="window._sg34_iq18_result()">Result &#x1F3C6;</button>';
      html += '</div>';
      el.innerHTML = html;
    }

    function showResult() {
      const el = document.getElementById('sg34-iq18-content');
      if (!el) return;
      const pct = Math.round(score / questions.length * 100);
      const g = grade(pct);
      let html = '<div style="text-align:center;padding:20px">';
      html += '<div class="sg34-grade ' + g.cls + '">Grade: ' + g.g + '</div>';
      html += '<div style="font-size:20px;font-weight:700;margin:10px 0">' + score + ' / ' + questions.length + ' (' + pct + '%)</div>';
      html += '<button class="sg34-btn sg34-btn-primary" onclick="window._sg34_iq18_retry()">&#x21BB; Retry</button>';
      html += '</div>';
      el.innerHTML = html;

      _checkAchievementsV34('iq_v18_clear');
      if (pct >= 90) _checkAchievementsV34('iq_v18_s');
    }

    window._sg34_iq18_answer = (oi) => {
      if (answered[idx] !== null) return;
      answered[idx] = oi;
      if (oi === questions[idx].a) { score++; SFX.quiz_v18(); } else { SFX.tee_miss(); }
      render();
    };
    window._sg34_iq18_prev = () => { idx = Math.max(0, idx - 1); render(); };
    window._sg34_iq18_next = () => { idx = Math.min(questions.length - 1, idx + 1); render(); };
    window._sg34_iq18_result = () => showResult();
    window._sg34_iq18_retry = () => { idx = 0; score = 0; answered = Array(questions.length).fill(null); render(); };

    makeOverlay('sg34-iq18', 'linear-gradient(135deg,#1565c0,#42a5f5)', '&#x1F9E0; Golf IQ v18', buildQuiz());
    setTimeout(() => render(), 100);
    _checkAchievementsV34('iq_v18_opened');
  }

  // ===============================================================
  // ACHIEVEMENTS v34 (+15, 242→257)
  // ===============================================================
  const ACHIEVEMENTS_V34 = [
    { id: 'tee_opened', name: 'Tee Master', desc: 'Opened Tee Shot Analyzer' },
    { id: 'emotion_opened', name: 'Emotion Reader', desc: 'Opened Round Emotion Tracker' },
    { id: 'parsave_opened', name: 'Par Saver', desc: 'Opened Par Save Analyzer' },
    { id: 'season_opened', name: 'Season Planner', desc: 'Opened Golf Season Calendar' },
    { id: 'notepad_opened', name: 'Course Scout', desc: 'Opened Course Strategy Notepad' },
    { id: 'dist_opened', name: 'Distance Guru', desc: 'Opened Club Distance Histogram' },
    { id: 'energy_opened', name: 'Energy Manager', desc: 'Opened Round Energy Manager' },
    { id: 'hcp_opened', name: 'Handicap Analyst', desc: 'Opened Handicap Simulator' },
    { id: 'iq_v18_opened', name: 'IQ v18 Challenger', desc: 'Started Golf IQ v18' },
    { id: 'iq_v18_clear', name: 'IQ v18 Graduate', desc: 'Completed Golf IQ v18' },
    { id: 'iq_v18_s', name: 'IQ v18 Genius', desc: 'Got S rank on Golf IQ v18' },
    { id: 'multi_v34', name: 'v34 Multi-Tooler', desc: 'Opened 5+ v34 features' },
    { id: 'all_v34', name: 'v34 Explorer', desc: 'Opened all 8 v34 features' },
    { id: 'v34_complete', name: 'v34 Complete', desc: 'Unlocked all v34 achievements' }
  ];

  let _v34_unlocked = LS('achievements_v34') || {};
  let _v34_opened = {};

  function _checkAchievementsV34(trigger) {
    if (_v34_unlocked[trigger]) return;
    const featureIds = ['tee_opened','emotion_opened','parsave_opened','season_opened','notepad_opened','dist_opened','energy_opened','hcp_opened'];
    _v34_opened[trigger] = true;

    if (featureIds.includes(trigger)) {
      const openedCount = featureIds.filter(id => _v34_opened[id] || _v34_unlocked[id]).length;
      if (openedCount >= 5 && !_v34_unlocked.multi_v34) {
        _v34_unlocked.multi_v34 = true;
        SFX.achieve_v34();
        _showAchievementToast34('v34 Multi-Tooler');
      }
      if (openedCount >= 8 && !_v34_unlocked.all_v34) {
        _v34_unlocked.all_v34 = true;
        SFX.achieve_v34();
        _showAchievementToast34('v34 Explorer');
      }
    }

    const ach = ACHIEVEMENTS_V34.find(a => a.id === trigger);
    if (ach && !_v34_unlocked[trigger]) {
      _v34_unlocked[trigger] = true;
      SFX.achieve_v34();
      _showAchievementToast34(ach.name);
    }

    const total = ACHIEVEMENTS_V34.filter(a => _v34_unlocked[a.id]).length;
    if (total >= ACHIEVEMENTS_V34.length && !_v34_unlocked.v34_complete) {
      _v34_unlocked.v34_complete = true;
      SFX.achieve_v34();
      _showAchievementToast34('v34 Complete!');
    }

    LS('achievements_v34', _v34_unlocked);
  }

  function _showAchievementToast34(name) {
    const toast = document.createElement('div');
    toast.style.cssText = 'position:fixed;top:20px;right:20px;z-index:99999;background:linear-gradient(135deg,#ff6b35,#ff9800);color:#fff;padding:12px 20px;border-radius:12px;font-size:13px;font-weight:700;box-shadow:0 4px 20px rgba(0,0,0,.3);animation:sg34SlideUp .3s;display:flex;align-items:center;gap:8px';
    toast.innerHTML = '&#x1F3C6; Achievement: ' + name;
    document.body.appendChild(toast);
    setTimeout(() => { toast.style.opacity = '0'; toast.style.transition = 'opacity .5s'; setTimeout(() => toast.remove(), 500); }, 3000);
  }

  // ===============================================================
  // NAVIGATION - append to existing bar
  // ===============================================================
  const navItems = [
    { icon: '&#x1F3CC;&#xFE0F;', label: 'TeeShot', fn: openTeeShotAnalyzer },
    { icon: '&#x1F60C;', label: 'Emotion', fn: openRoundEmotionTracker },
    { icon: '&#x1F3AF;', label: 'ParSave', fn: openParSaveAnalyzer },
    { icon: '&#x1F4C5;', label: 'Season', fn: openGolfSeasonCalendar },
    { icon: '&#x1F4DD;', label: 'Notes', fn: openCourseStrategyNotepad },
    { icon: '&#x1F4CF;', label: 'Distance', fn: openClubDistanceHistogram },
    { icon: '&#x26A1;', label: 'Energy', fn: openRoundEnergyManager },
    { icon: '&#x1F4C9;', label: 'HCP Sim', fn: openHandicapSimulator },
    { icon: '&#x1F9E0;', label: 'IQ v18', fn: openGolfIQv18 }
  ];

  const existingBar = document.querySelector('.sg30-bottom-bar') || document.querySelector('[class*="bottom-bar"]');
  if (existingBar) {
    navItems.forEach(item => {
      const btn = document.createElement('button');
      btn.className = existingBar.querySelector('button') ? existingBar.querySelector('button').className : 'sg30-bbtn';
      btn.innerHTML = '<span class="' + (existingBar.querySelector('.sg30-bbtn-icon') ? 'sg30-bbtn-icon' : 'sg34-bbtn-icon') + '">' + item.icon + '</span><span class="' + (existingBar.querySelector('.sg30-bbtn-label') ? 'sg30-bbtn-label' : 'sg34-bbtn-label') + '">' + item.label + '</span>';
      btn.onclick = item.fn;
      existingBar.appendChild(btn);
    });
  }

  // ========== KEYBOARD SHORTCUTS ==========
  document.addEventListener('keydown', e => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'SELECT') return;
    if (!e.shiftKey) return;
    const map = { A: openTeeShotAnalyzer, S: openRoundEmotionTracker, D: openParSaveAnalyzer, F: openGolfSeasonCalendar, G: openCourseStrategyNotepad, H: openClubDistanceHistogram, J: openRoundEnergyManager, K: openHandicapSimulator };
    if (map[e.key]) { e.preventDefault(); map[e.key](); }
  });

  // ========== ESC to close ==========
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.sg34-overlay.active').forEach(ov => ov.classList.remove('active'));
    }
  });

})();
