/* ====================================================================
 * SmartGolf v31.0 patch
 * 라운드리플레이분석기Canvas18홀560x340 + 그린어택각도분석기Canvas580x360
 * + 페어웨이히트맵Canvas14클럽600x380 + 스코어분포벨커브Canvas560x320
 * + 파3홀전략시뮬Canvas580x360 + 멘탈에너지미터Canvas520x340
 * + 미스샷패턴코렉터Canvas580x380 + 시즌목표달성트래커Canvas600x360
 * + Golf IQ v15 15문항 + 업적+15(197→212) + SFX12종(202→214) + 키보드8종
 * ==================================================================== */
(function () {
  'use strict';

  const LS = (k, v) => v === undefined ? JSON.parse(localStorage.getItem('sg31_' + k) || 'null') : localStorage.setItem('sg31_' + k, JSON.stringify(v));

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
    replay_open: () => { sfx(440, 0.1); sfx(554, 0.12); },
    replay_play: () => { sfx(554, 0.08); sfx(698, 0.1); sfx(880, 0.12); },
    green_atk: () => { sfx(392, 0.12); sfx(494, 0.1); },
    green_calc: () => { sfx(494, 0.08); sfx(622, 0.1); sfx(784, 0.12); },
    fairway_open: () => { sfx(349, 0.1); sfx(440, 0.12); },
    fairway_gen: () => { sfx(523, 0.1); sfx(659, 0.1); sfx(784, 0.15); },
    score_dist: () => { sfx(330, 0.12); sfx(415, 0.1); },
    par3_open: () => { sfx(466, 0.12); sfx(587, 0.1); },
    mental_open: () => { sfx(294, 0.1); sfx(370, 0.12); },
    miss_open: () => { sfx(415, 0.12); sfx(523, 0.1); },
    goal_open: () => { sfx(370, 0.1); sfx(494, 0.12); },
    goal_achieve: () => { sfx(784, 0.1); sfx(1047, 0.1); sfx(1319, 0.15, 'triangle'); },
    quiz_v15: () => { sfx(587, 0.1); sfx(740, 0.12); },
    achieve_v31: () => { sfx(523, 0.06); sfx(659, 0.06); sfx(784, 0.06); sfx(1047, 0.06); sfx(1319, 0.2, 'triangle'); }
  };

  // ========== CSS ==========
  const css = `
.sg31-overlay{display:none;position:fixed;top:0;left:0;right:0;bottom:0;z-index:10020;background:rgba(0,0,0,.55);overflow-y:auto;padding:20px;animation:sg31FadeIn .25s}
.sg31-overlay.active{display:flex;align-items:flex-start;justify-content:center}
@keyframes sg31FadeIn{from{opacity:0}to{opacity:1}}
.sg31-panel{background:var(--card-bg,#fff);border-radius:16px;max-width:680px;width:100%;margin:30px auto;box-shadow:0 8px 40px rgba(0,0,0,.3);overflow:hidden;animation:sg31SlideUp .3s}
@keyframes sg31SlideUp{from{transform:translateY(30px);opacity:0}to{transform:translateY(0);opacity:1}}
.sg31-panel-head{padding:16px 20px;color:#fff;display:flex;align-items:center;justify-content:space-between}
.sg31-panel-head h3{font-size:16px;font-weight:700;display:flex;align-items:center;gap:8px}
.sg31-panel-close{background:rgba(255,255,255,.25);border:none;color:#fff;width:30px;height:30px;border-radius:50%;cursor:pointer;font-size:16px;font-family:inherit}
.sg31-panel-body{padding:16px 20px;max-height:70vh;overflow-y:auto}
.sg31-card{background:var(--bg,#f5f7f5);border-radius:12px;padding:14px;margin-bottom:10px;border:1px solid var(--border,#e0e0e0);cursor:pointer;transition:all .2s}
.sg31-card:hover{box-shadow:0 2px 12px rgba(0,0,0,.1);transform:translateY(-1px)}
.sg31-card-title{font-weight:700;font-size:14px;color:var(--text,#1a1a1a);margin-bottom:4px;display:flex;align-items:center;gap:6px}
.sg31-card-desc{font-size:12px;color:var(--text-muted,#666);line-height:1.5}
.sg31-badge{display:inline-block;padding:2px 8px;border-radius:10px;font-size:10px;font-weight:700}
.sg31-badge-purple{background:#ede7f6;color:#6a1b9a}
.sg31-badge-green{background:#e8f5e9;color:#2e7d32}
.sg31-badge-blue{background:#e3f2fd;color:#1565c0}
.sg31-badge-orange{background:#fff3e0;color:#e65100}
.sg31-badge-red{background:#ffebee;color:#c62828}
.sg31-badge-teal{background:#e0f2f1;color:#00695c}
.sg31-tabs{display:flex;gap:4px;margin-bottom:12px;flex-wrap:wrap}
.sg31-tab{padding:6px 14px;border-radius:20px;border:1px solid var(--border,#e0e0e0);background:var(--bg,#f5f7f5);font-size:12px;cursor:pointer;font-weight:600;color:var(--text-muted,#666);transition:all .2s;font-family:inherit}
.sg31-tab.active{background:var(--primary,#1a7a3a);color:#fff;border-color:var(--primary,#1a7a3a)}
.sg31-row{display:flex;gap:8px;margin-bottom:8px;flex-wrap:wrap;align-items:center}
.sg31-label{font-size:12px;font-weight:600;color:var(--text-muted,#666);min-width:80px}
.sg31-val{font-size:14px;font-weight:700;color:var(--text,#1a1a1a)}
.sg31-slider{flex:1;min-width:120px;accent-color:var(--primary,#1a7a3a)}
.sg31-btn{padding:8px 16px;border-radius:10px;border:none;font-size:13px;font-weight:700;cursor:pointer;transition:all .2s;font-family:inherit}
.sg31-btn-primary{background:var(--primary,#1a7a3a);color:#fff}
.sg31-btn-primary:hover{opacity:.85}
.sg31-btn-outline{background:transparent;border:1px solid var(--border,#e0e0e0);color:var(--text,#1a1a1a)}
.sg31-grid{display:grid;gap:8px;margin-bottom:12px}
.sg31-grid-2{grid-template-columns:1fr 1fr}
.sg31-grid-3{grid-template-columns:1fr 1fr 1fr}
.sg31-stat{text-align:center;padding:10px;background:var(--bg,#f5f7f5);border-radius:10px;border:1px solid var(--border,#e0e0e0)}
.sg31-stat-num{font-size:20px;font-weight:800;color:var(--primary,#1a7a3a)}
.sg31-stat-label{font-size:10px;color:var(--text-muted,#666);margin-top:2px}
.sg31-progress{height:8px;background:var(--border,#e0e0e0);border-radius:4px;overflow:hidden;margin:6px 0}
.sg31-progress-fill{height:100%;border-radius:4px;transition:width .5s ease}
.sg31-canvas-wrap{text-align:center;margin:12px 0}
.sg31-canvas-wrap canvas{max-width:100%;border-radius:10px;border:1px solid var(--border,#e0e0e0)}
[data-theme="dark"] .sg31-badge-purple{background:#2d1b4e;color:#ce93d8}
[data-theme="dark"] .sg31-badge-green{background:#1b3a25;color:#7bed9f}
[data-theme="dark"] .sg31-badge-blue{background:#1a2a3a;color:#7ab8f5}
[data-theme="dark"] .sg31-badge-orange{background:#3a2a1a;color:#f0c070}
[data-theme="dark"] .sg31-badge-red{background:#3a1a1a;color:#ef9a9a}
[data-theme="dark"] .sg31-badge-teal{background:#1a3a35;color:#80cbc4}
[data-theme="dark"] .sg31-stat{background:#2a2a2a;border-color:#444}
[data-theme="dark"] .sg31-card{background:#2a2a2a;border-color:#444}
[data-theme="dark"] .sg31-tab{background:#2a2a2a;border-color:#444;color:#ccc}
`;
  const styleEl = document.createElement('style');
  styleEl.textContent = css;
  document.head.appendChild(styleEl);

  // ========== HELPER ==========
  function makeOverlay(id, title, gradient, body) {
    let ov = document.getElementById(id);
    if (ov) { ov.classList.add('active'); return ov.querySelector('.sg31-panel-body'); }
    ov = document.createElement('div');
    ov.id = id;
    ov.className = 'sg31-overlay';
    ov.innerHTML = '<div class="sg31-panel"><div class="sg31-panel-head" style="background:' + gradient + '"><h3>' + title + '</h3><button class="sg31-panel-close" onclick="document.getElementById(\'' + id + '\').classList.remove(\'active\')">&times;</button></div><div class="sg31-panel-body">' + body + '</div></div>';
    ov.addEventListener('click', e => { if (e.target === ov) ov.classList.remove('active'); });
    document.body.appendChild(ov);
    ov.classList.add('active');
    return ov.querySelector('.sg31-panel-body');
  }

  function gradeFromScore(s, max) {
    const r = s / max;
    if (r >= 0.9) return { g: 'S', c: '#e91e63' };
    if (r >= 0.8) return { g: 'A', c: '#4caf50' };
    if (r >= 0.65) return { g: 'B', c: '#2196f3' };
    if (r >= 0.5) return { g: 'C', c: '#ff9800' };
    return { g: 'D', c: '#9e9e9e' };
  }

  // ========== 1. ROUND REPLAY ANALYZER ==========
  function openReplayAnalyzer() {
    SFX.replay_open();
    const saved = LS('replay_v2') || {};
    const holes = [];
    for (let i = 1; i <= 18; i++) {
      const s = saved[i];
      // 저장된 사용자 기록이 없으면 빈 상태로 시작한다 (점수를 임의로 만들지 않는다)
      holes.push(s ? s : { score: null, par: 4, putts: null, fir: false, gir: false });
    }
    const hasScore = h => h && h.score !== null && h.score !== undefined && !isNaN(h.score);
    const enteredHoles = () => holes.filter(hasScore);

    let html = '<div class="sg31-canvas-wrap"><canvas id="sg31ReplayCanvas" width="560" height="340"></canvas></div>';
    html += '<div class="sg31-tabs" id="sg31ReplayTabs"></div>';
    html += '<div id="sg31ReplayDetail"></div>';
    html += '<div class="sg31-grid sg31-grid-3" id="sg31ReplayStats"></div>';
    html += '<div style="margin-top:12px;text-align:center"><button class="sg31-btn sg31-btn-primary" id="sg31ReplaySave">&#x1F4BE; &#51200;&#51109;</button></div>';

    const body = makeOverlay('sg31replay', '&#x1F3AC; &#46972;&#50868;&#46300; &#47532;&#54540;&#47112;&#51060; &#48516;&#49437;&#44592;', 'linear-gradient(135deg,#1565c0,#0d47a1)', html);

    const tabsEl = body.querySelector('#sg31ReplayTabs');
    let selHole = 1;

    function renderTabs() {
      tabsEl.innerHTML = '';
      for (let i = 1; i <= 18; i++) {
        const t = document.createElement('button');
        t.className = 'sg31-tab' + (i === selHole ? ' active' : '');
        const hh = holes[i - 1];
        let sym = '';
        if (hasScore(hh)) {
          const diff = hh.score - hh.par;
          sym = diff <= -2 ? '&#x1F985;' : diff === -1 ? '&#x1F426;' : diff === 0 ? '' : diff === 1 ? '&#x25B2;' : '&#x25B2;&#x25B2;';
        }
        t.innerHTML = i + 'H ' + sym;
        t.onclick = () => { selHole = i; renderTabs(); renderDetail(); renderCanvas(); SFX.replay_play(); };
        tabsEl.appendChild(t);
      }
    }

    function renderDetail() {
      const h = holes[selHole - 1];
      const det = body.querySelector('#sg31ReplayDetail');
      det.innerHTML = '<div class="sg31-grid sg31-grid-2">' +
        '<div class="sg31-row"><span class="sg31-label">Par</span><select id="sg31RPar" style="padding:4px 8px;border-radius:6px;border:1px solid var(--border)">' +
        [3,4,5].map(p => '<option value="' + p + '"' + (h.par === p ? ' selected' : '') + '>' + p + '</option>').join('') + '</select></div>' +
        '<div class="sg31-row"><span class="sg31-label">Score</span><input type="number" id="sg31RScore" min="1" max="12" placeholder="-" value="' + (h.score == null ? '' : h.score) + '" style="width:60px;padding:4px 8px;border-radius:6px;border:1px solid var(--border)"></div>' +
        '<div class="sg31-row"><span class="sg31-label">Putts</span><input type="number" id="sg31RPutts" min="0" max="6" placeholder="-" value="' + (h.putts == null ? '' : h.putts) + '" style="width:60px;padding:4px 8px;border-radius:6px;border:1px solid var(--border)"></div>' +
        '<div class="sg31-row"><span class="sg31-label">FIR</span><label style="font-size:13px"><input type="checkbox" id="sg31RFIR"' + (h.fir ? ' checked' : '') + '> &#xD398;&#xC5B4;&#xC6E8;&#xC774;</label></div>' +
        '<div class="sg31-row"><span class="sg31-label">GIR</span><label style="font-size:13px"><input type="checkbox" id="sg31RGIR"' + (h.gir ? ' checked' : '') + '> &#xADF8;&#xB9B0;&#xC801;&#xC911;</label></div>' +
        '</div>';

      ['sg31RPar', 'sg31RScore', 'sg31RPutts', 'sg31RFIR', 'sg31RGIR'].forEach(id => {
        const el = det.querySelector('#' + id);
        if (el) el.onchange = () => {
          const pv = parseInt(det.querySelector('#sg31RPar').value);
          const sv = parseInt(det.querySelector('#sg31RScore').value);
          const uv = parseInt(det.querySelector('#sg31RPutts').value);
          h.par = isNaN(pv) ? 4 : pv;
          h.score = isNaN(sv) ? null : sv;
          h.putts = isNaN(uv) ? null : uv;
          h.fir = det.querySelector('#sg31RFIR').checked;
          h.gir = det.querySelector('#sg31RGIR').checked;
          renderCanvas(); renderStats(); renderTabs();
        };
      });
      renderStats();
    }

    function renderStats() {
      const stats = body.querySelector('#sg31ReplayStats');
      const list = enteredHoles();
      if (!list.length) {
        stats.innerHTML = '<div style="grid-column:1/-1;text-align:center;color:var(--text-muted,#666);font-size:13px;padding:12px">&#xAE30;&#xB85D;&#xC744; &#xCD94;&#xAC00;&#xD558;&#xBA74; &#xD45C;&#xC2DC;&#xB429;&#xB2C8;&#xB2E4;</div>';
        return;
      }
      const total = list.reduce((a, h) => a + h.score, 0);
      const totalPar = list.reduce((a, h) => a + h.par, 0);
      const totalPutts = list.reduce((a, h) => a + (h.putts || 0), 0);
      const firEligible = list.filter(h => h.par >= 4).length;
      const firCount = list.filter(h => h.fir).length;
      const girCount = list.filter(h => h.gir).length;
      const diff = total - totalPar;
      stats.innerHTML =
        '<div class="sg31-stat"><div class="sg31-stat-num">' + total + '</div><div class="sg31-stat-label">Total (' + (diff >= 0 ? '+' : '') + diff + ') / ' + list.length + 'H</div></div>' +
        '<div class="sg31-stat"><div class="sg31-stat-num">' + totalPutts + '</div><div class="sg31-stat-label">Total Putts</div></div>' +
        '<div class="sg31-stat"><div class="sg31-stat-num">' + (firEligible ? Math.round(firCount / firEligible * 100) + '%' : '-') + '</div><div class="sg31-stat-label">FIR (' + firEligible + 'H)</div></div>' +
        '<div class="sg31-stat"><div class="sg31-stat-num">' + Math.round(girCount / list.length * 100) + '%</div><div class="sg31-stat-label">GIR (' + list.length + 'H)</div></div>' +
        '<div class="sg31-stat"><div class="sg31-stat-num">' + (totalPutts / list.length).toFixed(1) + '</div><div class="sg31-stat-label">Avg Putts</div></div>' +
        '<div class="sg31-stat"><div class="sg31-stat-num">' + (total / list.length).toFixed(1) + '</div><div class="sg31-stat-label">Avg Score</div></div>';
    }

    function renderCanvas() {
      const c = body.querySelector('#sg31ReplayCanvas');
      if (!c) return;
      const ctx = c.getContext('2d');
      const W = c.width, H = c.height;
      ctx.clearRect(0, 0, W, H);
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      ctx.fillStyle = isDark ? '#1e1e1e' : '#fafafa';
      ctx.fillRect(0, 0, W, H);

      const marginL = 40, marginR = 20, marginT = 30, marginB = 40;
      const plotW = W - marginL - marginR;
      const plotH = H - marginT - marginB;
      const barW = plotW / 18;

      ctx.font = 'bold 13px sans-serif';
      ctx.fillStyle = isDark ? '#e0e0e0' : '#333';
      ctx.textAlign = 'center';
      ctx.fillText('18홀 스코어 리플레이', W / 2, 18);

      if (!enteredHoles().length) {
        ctx.font = '14px sans-serif';
        ctx.fillStyle = isDark ? '#999' : '#888';
        ctx.textAlign = 'center';
        ctx.fillText('기록을 추가하면 표시됩니다', W / 2, H / 2);
        return;
      }

      const maxDiff = 4;
      for (let i = 0; i < 18; i++) {
        const h = holes[i];
        const x = marginL + i * barW;
        const baseY = marginT + plotH * 0.5;

        if (i === selHole - 1) {
          ctx.fillStyle = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)';
          ctx.fillRect(x, marginT, barW, plotH);
        }

        ctx.fillStyle = isDark ? '#aaa' : '#666';
        ctx.font = '10px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText((i + 1) + '', x + barW / 2, H - marginB + 14);

        if (!hasScore(h)) continue;

        const diff = h.score - h.par;
        const barH = Math.min(Math.abs(diff) + 1, maxDiff + 1) / (maxDiff + 1) * plotH * 0.6;

        let color;
        if (diff <= -2) color = '#e91e63';
        else if (diff === -1) color = '#4caf50';
        else if (diff === 0) color = '#2196f3';
        else if (diff === 1) color = '#ff9800';
        else color = '#f44336';

        ctx.fillStyle = color;
        if (diff <= 0) {
          ctx.fillRect(x + 3, baseY - barH, barW - 6, barH);
        } else {
          ctx.fillRect(x + 3, baseY, barW - 6, barH);
        }

        ctx.fillStyle = color;
        ctx.font = 'bold 10px sans-serif';
        const label = diff === 0 ? 'E' : (diff > 0 ? '+' + diff : '' + diff);
        ctx.fillText(label, x + barW / 2, diff <= 0 ? baseY - barH - 4 : baseY + barH + 12);
      }

      ctx.strokeStyle = isDark ? '#555' : '#ccc';
      ctx.setLineDash([3, 3]);
      ctx.beginPath();
      ctx.moveTo(marginL, marginT + plotH * 0.5);
      ctx.lineTo(W - marginR, marginT + plotH * 0.5);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = isDark ? '#aaa' : '#888';
      ctx.font = '10px sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText('Par', marginL - 4, marginT + plotH * 0.5 + 4);
    }

    renderTabs();
    renderDetail();
    renderCanvas();

    body.querySelector('#sg31ReplaySave').onclick = () => {
      const obj = {};
      holes.forEach((h, i) => obj[i + 1] = h);
      LS('replay_v2', obj);
      SFX.replay_play();
    };
    checkAchievements();
  }

  // ========== 2. GREEN ATTACK ANGLE ANALYZER ==========
  function openGreenAttack() {
    SFX.green_atk();
    let dist = LS('greenatk_dist') || 120;
    let windSpd = LS('greenatk_wind') || 10;
    let windDir = LS('greenatk_wdir') || 0;
    let pinPos = LS('greenatk_pin') || 5;
    let lie = LS('greenatk_lie') || 0;

    let html = '<div class="sg31-canvas-wrap"><canvas id="sg31GreenCanvas" width="580" height="360"></canvas></div>';
    html += '<div class="sg31-grid sg31-grid-2">' +
      '<div class="sg31-row"><span class="sg31-label">&#xAC70;&#xB9AC;(yd)</span><input type="range" class="sg31-slider" id="sg31GDist" min="30" max="250" value="' + dist + '"><span class="sg31-val" id="sg31GDistV">' + dist + '</span></div>' +
      '<div class="sg31-row"><span class="sg31-label">&#xBC14;&#xB78C;(km/h)</span><input type="range" class="sg31-slider" id="sg31GWind" min="0" max="40" value="' + windSpd + '"><span class="sg31-val" id="sg31GWindV">' + windSpd + '</span></div>' +
      '<div class="sg31-row"><span class="sg31-label">&#xBC14;&#xB78C;&#xBC29;&#xD5A5;(&deg;)</span><input type="range" class="sg31-slider" id="sg31GWDir" min="0" max="359" value="' + windDir + '"><span class="sg31-val" id="sg31GWDirV">' + windDir + '&deg;</span></div>' +
      '<div class="sg31-row"><span class="sg31-label">&#xD540;&#xC704;&#xCE58;</span><select id="sg31GPin" style="padding:4px 8px;border-radius:6px;border:1px solid var(--border)">' +
      [{v:1,t:'앞좌'},{v:2,t:'앞중앙'},{v:3,t:'앞우'},{v:4,t:'중좌'},{v:5,t:'중앙'},{v:6,t:'중우'},{v:7,t:'뒷좌'},{v:8,t:'뒷중앙'},{v:9,t:'뒷우'}].map(p => '<option value="' + p.v + '"' + (pinPos === p.v ? ' selected' : '') + '>' + p.t + '</option>').join('') +
      '</select></div>' +
      '<div class="sg31-row"><span class="sg31-label">&#xB77C;&#xC774;</span><select id="sg31GLie" style="padding:4px 8px;border-radius:6px;border:1px solid var(--border)">' +
      [{v:0,t:'페;&#xC5B4;&#xC6E8;&#xC774;'},{v:1,t:'러;&#xD504;'},{v:2,t:'벙;&#xCEE4;'},{v:3,t:'디;&#xBCBF;'}].map(p => '<option value="' + p.v + '"' + (lie === p.v ? ' selected' : '') + '>' + p.t + '</option>').join('') +
      '</select></div>' +
      '</div>';
    html += '<div id="sg31GreenResult" style="margin-top:10px"></div>';
    html += '<div style="margin-top:10px;text-align:center"><button class="sg31-btn sg31-btn-primary" id="sg31GreenCalc">&#x1F3AF; &#xACF5;&#xB7B5; &#xBD84;&#xC11D;</button></div>';

    const body = makeOverlay('sg31green', '&#x1F3AF; &#xADF8;&#xB9B0; &#xC5B4;&#xD0DD; &#xAC01;&#xB3C4; &#xBD84;&#xC11D;&#xAE30;', 'linear-gradient(135deg,#2e7d32,#1b5e20)', html);

    const sliders = [
      { id: 'sg31GDist', vid: 'sg31GDistV', key: 'greenatk_dist', suffix: '' },
      { id: 'sg31GWind', vid: 'sg31GWindV', key: 'greenatk_wind', suffix: '' },
      { id: 'sg31GWDir', vid: 'sg31GWDirV', key: 'greenatk_wdir', suffix: '°' }
    ];
    sliders.forEach(s => {
      const el = body.querySelector('#' + s.id);
      if (el) el.oninput = () => {
        body.querySelector('#' + s.vid).textContent = el.value + s.suffix;
      };
    });

    body.querySelector('#sg31GreenCalc').onclick = () => {
      SFX.green_calc();
      dist = parseInt(body.querySelector('#sg31GDist').value);
      windSpd = parseInt(body.querySelector('#sg31GWind').value);
      windDir = parseInt(body.querySelector('#sg31GWDir').value);
      pinPos = parseInt(body.querySelector('#sg31GPin').value);
      lie = parseInt(body.querySelector('#sg31GLie').value);
      LS('greenatk_dist', dist); LS('greenatk_wind', windSpd);
      LS('greenatk_wdir', windDir); LS('greenatk_pin', pinPos); LS('greenatk_lie', lie);
      drawGreenCanvas(body);
    };
    drawGreenCanvas(body);
    checkAchievements();
  }

  function drawGreenCanvas(body) {
    const c = body.querySelector('#sg31GreenCanvas');
    if (!c) return;
    const ctx = c.getContext('2d');
    const W = c.width, H = c.height;
    ctx.clearRect(0, 0, W, H);
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';

    ctx.fillStyle = isDark ? '#1e1e1e' : '#fafafa';
    ctx.fillRect(0, 0, W, H);

    const cx = W / 2, cy = H / 2 + 20;
    const greenRx = 120, greenRy = 80;

    ctx.fillStyle = isDark ? '#1b3a25' : '#c8e6c9';
    ctx.beginPath();
    ctx.ellipse(cx, cy, greenRx, greenRy, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = isDark ? '#2e7d32' : '#388e3c';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.fillStyle = isDark ? '#0f5a28' : '#a5d6a7';
    ctx.beginPath();
    ctx.ellipse(cx, cy, greenRx * 0.6, greenRy * 0.6, 0, 0, Math.PI * 2);
    ctx.fill();

    const pinPos = parseInt(body.querySelector('#sg31GPin').value);
    const pinCol = Math.floor((pinPos - 1) % 3) - 1;
    const pinRow = Math.floor((pinPos - 1) / 3) - 1;
    const pinX = cx + pinCol * greenRx * 0.35;
    const pinY = cy + pinRow * greenRy * 0.35;

    ctx.fillStyle = '#f44336';
    ctx.beginPath();
    ctx.arc(pinX, pinY, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(pinX, pinY);
    ctx.lineTo(pinX, pinY - 25);
    ctx.stroke();
    ctx.fillStyle = '#f44336';
    ctx.beginPath();
    ctx.moveTo(pinX, pinY - 25);
    ctx.lineTo(pinX + 12, pinY - 20);
    ctx.lineTo(pinX, pinY - 15);
    ctx.fill();

    const dist = parseInt(body.querySelector('#sg31GDist').value);
    const windSpd = parseInt(body.querySelector('#sg31GWind').value);
    const windDir = parseInt(body.querySelector('#sg31GWDir').value) * Math.PI / 180;
    const lie = parseInt(body.querySelector('#sg31GLie').value);

    const attackAngle = Math.atan2(pinY - (cy + greenRy + 40), pinX - cx) * 180 / Math.PI;
    const windEffect = windSpd * 0.3;
    const windOffsetX = Math.cos(windDir) * windEffect;
    const windOffsetY = Math.sin(windDir) * windEffect;

    const clubs = ['PW', '9I', '8I', '7I', '6I', '5I', '4H', '3W'];
    const clubDists = [120, 135, 145, 155, 165, 180, 195, 230];
    let bestClub = 'PW';
    for (let i = 0; i < clubDists.length; i++) {
      if (dist <= clubDists[i] + 5) { bestClub = clubs[i]; break; }
      if (i === clubs.length - 1) bestClub = clubs[i];
    }

    const dispersion = dist * 0.04 * (1 + lie * 0.15);

    const ballStartX = cx;
    const ballStartY = cy + greenRy + 50;

    ctx.setLineDash([5, 5]);
    ctx.strokeStyle = '#ff9800';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(ballStartX, ballStartY);
    ctx.lineTo(pinX + windOffsetX, pinY + windOffsetY);
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.strokeStyle = 'rgba(255,152,0,0.3)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.ellipse(pinX + windOffsetX, pinY + windOffsetY, dispersion, dispersion * 1.5, 0, 0, Math.PI * 2);
    ctx.stroke();
    ctx.fillStyle = 'rgba(255,152,0,0.1)';
    ctx.fill();

    if (windSpd > 0) {
      const arrowLen = 30;
      const arrowX = W - 60, arrowY = 50;
      ctx.strokeStyle = '#2196f3';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(arrowX, arrowY);
      ctx.lineTo(arrowX + Math.cos(windDir) * arrowLen, arrowY + Math.sin(windDir) * arrowLen);
      ctx.stroke();
      const endX = arrowX + Math.cos(windDir) * arrowLen;
      const endY = arrowY + Math.sin(windDir) * arrowLen;
      ctx.fillStyle = '#2196f3';
      ctx.beginPath();
      ctx.moveTo(endX, endY);
      ctx.lineTo(endX - Math.cos(windDir - 0.4) * 8, endY - Math.sin(windDir - 0.4) * 8);
      ctx.lineTo(endX - Math.cos(windDir + 0.4) * 8, endY - Math.sin(windDir + 0.4) * 8);
      ctx.fill();
      ctx.font = '10px sans-serif';
      ctx.fillStyle = isDark ? '#7ab8f5' : '#1565c0';
      ctx.textAlign = 'center';
      ctx.fillText(windSpd + 'km/h', arrowX, arrowY - 12);
    }

    ctx.font = 'bold 13px sans-serif';
    ctx.fillStyle = isDark ? '#e0e0e0' : '#333';
    ctx.textAlign = 'center';
    ctx.fillText('그린 어택 각도 분석', W / 2, 18);

    const lieNames = ['페;&#xC5B4;&#xC6E8;&#xC774;', '러;&#xD504;', '벙;&#xCEE4;', '디;&#xBCBF;'];
    const result = body.querySelector('#sg31GreenResult');
    const safety = dispersion < greenRx * 0.3 ? '안;&#xC804;' : dispersion < greenRx * 0.6 ? '보;&#xD1B5;' : '위;&#xD5D8;';
    const safeColor = dispersion < greenRx * 0.3 ? '#4caf50' : dispersion < greenRx * 0.6 ? '#ff9800' : '#f44336';
    result.innerHTML = '<div class="sg31-grid sg31-grid-3">' +
      '<div class="sg31-stat"><div class="sg31-stat-num">' + bestClub + '</div><div class="sg31-stat-label">추천 클럽</div></div>' +
      '<div class="sg31-stat"><div class="sg31-stat-num" style="color:' + safeColor + '">' + safety + '</div><div class="sg31-stat-label">안전도</div></div>' +
      '<div class="sg31-stat"><div class="sg31-stat-num">' + dispersion.toFixed(1) + 'yd</div><div class="sg31-stat-label">분산범위</div></div>' +
      '</div>';
  }

  // ========== 3. FAIRWAY HITMAP GENERATOR ==========
  function openFairwayHitmap() {
    SFX.fairway_open();
    const clubs = ['DR', '3W', '5W', '4H', '5I', '6I', '7I', '8I', '9I', 'PW', 'AW', 'SW', 'LW', 'PT'];
    let selClub = LS('hitmap_club') || 0;
    const hitmapData = LS('hitmap_data_v2') || {};

    let html = '<div class="sg31-canvas-wrap"><canvas id="sg31HitmapCanvas" width="600" height="380"></canvas></div>';
    html += '<div class="sg31-tabs" id="sg31HitmapTabs"></div>';
    html += '<div class="sg31-row" style="margin-top:8px">';
    html += '<span class="sg31-label">&#xC88C;&#xC6B0;(&#xC88C;-/&#xC6B0;+)</span><input type="number" id="sg31HitmapX" min="-120" max="120" step="1" value="0" style="width:70px;padding:4px 8px;border-radius:6px;border:1px solid var(--border)">';
    html += '<span class="sg31-label">&#xC804;&#xD6C4;(&#xAE38;-/&#xC9E7;+)</span><input type="number" id="sg31HitmapY" min="-150" max="150" step="1" value="0" style="width:70px;padding:4px 8px;border-radius:6px;border:1px solid var(--border)">';
    html += '</div>';
    html += '<div class="sg31-grid sg31-grid-2" style="margin-top:8px">';
    html += '<button class="sg31-btn sg31-btn-primary" id="sg31HitmapAdd">&#x2795; &#xC0F7; &#xCD94;&#xAC00;</button>';
    html += '<button class="sg31-btn sg31-btn-outline" id="sg31HitmapReset">&#x1F5D1;&#xFE0F; &#xCD08;&#xAE30;&#xD654;</button>';
    html += '</div>';
    html += '<div id="sg31HitmapStats" style="margin-top:10px"></div>';

    const body = makeOverlay('sg31hitmap', '&#x1F4CD; &#xD398;&#xC5B4;&#xC6E8;&#xC774; &#xD788;&#xD2B8;&#xB9F5; &#xC81C;&#xB108;&#xB808;&#xC774;&#xD130;', 'linear-gradient(135deg,#558b2f,#33691e)', html);

    function renderTabs() {
      const tabsEl = body.querySelector('#sg31HitmapTabs');
      tabsEl.innerHTML = '';
      clubs.forEach((cl, i) => {
        const t = document.createElement('button');
        t.className = 'sg31-tab' + (i === selClub ? ' active' : '');
        t.textContent = cl;
        t.onclick = () => { selClub = i; LS('hitmap_club', i); renderTabs(); renderCanvas(); };
        tabsEl.appendChild(t);
      });
    }

    function renderCanvas() {
      const c = body.querySelector('#sg31HitmapCanvas');
      if (!c) return;
      const ctx = c.getContext('2d');
      const W = c.width, H = c.height;
      ctx.clearRect(0, 0, W, H);
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      ctx.fillStyle = isDark ? '#1e1e1e' : '#fafafa';
      ctx.fillRect(0, 0, W, H);

      const cx = W / 2, cy = H / 2;
      const gridW = 240, gridH = 300;

      ctx.fillStyle = isDark ? '#1b3a25' : '#dcedc8';
      ctx.fillRect(cx - gridW / 2, cy - gridH / 2, gridW, gridH);
      ctx.strokeStyle = isDark ? '#388e3c' : '#8bc34a';
      ctx.lineWidth = 1;
      ctx.strokeRect(cx - gridW / 2, cy - gridH / 2, gridW, gridH);

      for (let i = 1; i < 5; i++) {
        ctx.beginPath();
        ctx.moveTo(cx - gridW / 2, cy - gridH / 2 + i * gridH / 5);
        ctx.lineTo(cx + gridW / 2, cy - gridH / 2 + i * gridH / 5);
        ctx.strokeStyle = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)';
        ctx.stroke();
      }
      ctx.beginPath();
      ctx.moveTo(cx, cy - gridH / 2);
      ctx.lineTo(cx, cy + gridH / 2);
      ctx.stroke();

      const shots = hitmapData[clubs[selClub]] || [];
      const gridCells = {};
      const cellSize = 20;

      shots.forEach(s => {
        const gx = Math.floor((s.x + gridW / 2) / cellSize);
        const gy = Math.floor((s.y + gridH / 2) / cellSize);
        const key = gx + ',' + gy;
        gridCells[key] = (gridCells[key] || 0) + 1;
      });

      const maxCount = Math.max(1, ...Object.values(gridCells));
      Object.entries(gridCells).forEach(([key, count]) => {
        const [gx, gy] = key.split(',').map(Number);
        const intensity = count / maxCount;
        const r = Math.round(255 * intensity);
        const g = Math.round(100 * (1 - intensity));
        const b = 0;
        ctx.fillStyle = 'rgba(' + r + ',' + g + ',' + b + ',' + (0.3 + intensity * 0.5) + ')';
        ctx.fillRect(cx - gridW / 2 + gx * cellSize, cy - gridH / 2 + gy * cellSize, cellSize, cellSize);
      });

      shots.forEach(s => {
        ctx.fillStyle = 'rgba(244,67,54,0.7)';
        ctx.beginPath();
        ctx.arc(cx + s.x, cy + s.y - gridH * 0.1, 4, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.fillStyle = '#ff9800';
      ctx.beginPath();
      ctx.arc(cx, cy + gridH / 2 + 15, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = isDark ? '#aaa' : '#666';
      ctx.font = '10px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Ball', cx, cy + gridH / 2 + 30);

      ctx.font = 'bold 13px sans-serif';
      ctx.fillStyle = isDark ? '#e0e0e0' : '#333';
      ctx.fillText(clubs[selClub] + ' 페어웨이 히트맵 (' + shots.length + '샷)', W / 2, 20);

      const labels = ['좌', '우'];
      ctx.font = '10px sans-serif';
      ctx.fillStyle = isDark ? '#aaa' : '#888';
      ctx.fillText(labels[0], cx - gridW / 2 - 15, cy);
      ctx.fillText(labels[1], cx + gridW / 2 + 15, cy);

      if (!shots.length) {
        ctx.font = '13px sans-serif';
        ctx.fillStyle = isDark ? '#999' : '#888';
        ctx.textAlign = 'center';
        ctx.fillText('기록을 추가하면 표시됩니다', cx, cy);
      }

      renderStats(shots);
    }

    function renderStats(shots) {
      const statsEl = body.querySelector('#sg31HitmapStats');
      if (shots.length === 0) {
        statsEl.innerHTML = '<div style="text-align:center;color:var(--text-muted);font-size:13px">기록을 추가하면 표시됩니다</div>';
        return;
      }
      const avgX = shots.reduce((a, s) => a + s.x, 0) / shots.length;
      const avgY = shots.reduce((a, s) => a + s.y, 0) / shots.length;
      const spread = Math.sqrt(shots.reduce((a, s) => a + s.x * s.x + s.y * s.y, 0) / shots.length);
      const leftMiss = shots.filter(s => s.x < -30).length;
      const rightMiss = shots.filter(s => s.x > 30).length;
      const center = shots.length - leftMiss - rightMiss;

      statsEl.innerHTML = '<div class="sg31-grid sg31-grid-3">' +
        '<div class="sg31-stat"><div class="sg31-stat-num">' + center + '</div><div class="sg31-stat-label">센터</div></div>' +
        '<div class="sg31-stat"><div class="sg31-stat-num">' + leftMiss + '</div><div class="sg31-stat-label">좌측 미스</div></div>' +
        '<div class="sg31-stat"><div class="sg31-stat-num">' + rightMiss + '</div><div class="sg31-stat-label">우측 미스</div></div>' +
        '<div class="sg31-stat"><div class="sg31-stat-num">' + spread.toFixed(1) + '</div><div class="sg31-stat-label">분산도</div></div>' +
        '<div class="sg31-stat"><div class="sg31-stat-num">' + avgX.toFixed(1) + '</div><div class="sg31-stat-label">편향 (L/R)</div></div>' +
        '<div class="sg31-stat"><div class="sg31-stat-num">' + Math.round(center / shots.length * 100) + '%</div><div class="sg31-stat-label">적중률</div></div>' +
        '</div>';
    }

    // 사용자가 입력한 좌우/전후 편차만 기록한다 (임의 생성 없음)
    body.querySelector('#sg31HitmapAdd').onclick = () => {
      const xi = parseInt(body.querySelector('#sg31HitmapX').value);
      const yi = parseInt(body.querySelector('#sg31HitmapY').value);
      if (isNaN(xi) || isNaN(yi)) return;
      const x = Math.max(-120, Math.min(120, xi));
      const y = Math.max(-150, Math.min(150, yi));
      SFX.fairway_gen();
      const key = clubs[selClub];
      if (!hitmapData[key]) hitmapData[key] = [];
      hitmapData[key].push({ x: x, y: y });
      LS('hitmap_data_v2', hitmapData);
      renderCanvas();
    };

    body.querySelector('#sg31HitmapReset').onclick = () => {
      hitmapData[clubs[selClub]] = [];
      LS('hitmap_data_v2', hitmapData);
      renderCanvas();
    };

    renderTabs();
    renderCanvas();
    checkAchievements();
  }

  // ========== 4. SCORE DISTRIBUTION BELL CURVE ==========
  function openScoreDist() {
    SFX.score_dist();
    let scores = LS('scoredist_v2') || [];

    let html = '<div class="sg31-canvas-wrap"><canvas id="sg31DistCanvas" width="560" height="320"></canvas></div>';
    html += '<div class="sg31-row"><span class="sg31-label">스코어 추가</span><input type="number" id="sg31DistInput" min="60" max="130" value="85" style="width:70px;padding:4px 8px;border-radius:6px;border:1px solid var(--border)"> ';
    html += '<button class="sg31-btn sg31-btn-primary" id="sg31DistAdd">&#x2795; &#xCD94;&#xAC00;</button> ';
    html += '<button class="sg31-btn sg31-btn-outline" id="sg31DistClear">&#xCD08;&#xAE30;&#xD654;</button></div>';
    html += '<div id="sg31DistStats" class="sg31-grid sg31-grid-3" style="margin-top:10px"></div>';

    const body = makeOverlay('sg31dist', '&#x1F4CA; &#xC2A4;&#xCF54;&#xC5B4; &#xBD84;&#xD3EC; &#xBCA8;&#xCEE4;&#xBE0C; &#xBD84;&#xC11D;', 'linear-gradient(135deg,#6a1b9a,#4a148c)', html);

    function renderCanvas() {
      const c = body.querySelector('#sg31DistCanvas');
      if (!c) return;
      const ctx = c.getContext('2d');
      const W = c.width, H = c.height;
      ctx.clearRect(0, 0, W, H);
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      ctx.fillStyle = isDark ? '#1e1e1e' : '#fafafa';
      ctx.fillRect(0, 0, W, H);

      if (scores.length < 3) {
        ctx.font = '14px sans-serif';
        ctx.fillStyle = isDark ? '#999' : '#888';
        ctx.textAlign = 'center';
        ctx.fillText('기록을 추가하면 표시됩니다 (스코어 3개 이상)', W / 2, H / 2 - 8);
        ctx.font = '12px sans-serif';
        ctx.fillText('현재 ' + scores.length + '개 입력됨', W / 2, H / 2 + 14);
        const emptyStats = body.querySelector('#sg31DistStats');
        if (emptyStats) emptyStats.innerHTML = '<div style="grid-column:1/-1;text-align:center;color:var(--text-muted,#666);font-size:13px;padding:12px">&#xAE30;&#xB85D;&#xC744; &#xCD94;&#xAC00;&#xD558;&#xBA74; &#xD45C;&#xC2DC;&#xB429;&#xB2C8;&#xB2E4;</div>';
        return;
      }

      const mean = scores.reduce((a, b) => a + b, 0) / scores.length;
      const variance = scores.reduce((a, b) => a + (b - mean) * (b - mean), 0) / scores.length;
      const stddev = Math.sqrt(variance);

      const marginL = 50, marginR = 30, marginT = 35, marginB = 45;
      const plotW = W - marginL - marginR;
      const plotH = H - marginT - marginB;

      const minS = Math.floor(Math.min(...scores) - 5);
      const maxS = Math.ceil(Math.max(...scores) + 5);
      const range = maxS - minS;

      const bins = {};
      scores.forEach(s => {
        const b = Math.round(s);
        bins[b] = (bins[b] || 0) + 1;
      });
      const maxBin = Math.max(1, ...Object.values(bins));

      Object.entries(bins).forEach(([score, count]) => {
        const x = marginL + ((score - minS) / range) * plotW;
        const barH = (count / maxBin) * plotH * 0.5;
        ctx.fillStyle = 'rgba(156,39,176,0.4)';
        ctx.fillRect(x - 6, marginT + plotH - barH, 12, barH);
      });

      if (stddev > 0) {
        ctx.beginPath();
        ctx.strokeStyle = '#e91e63';
        ctx.lineWidth = 2.5;
        for (let px = 0; px <= plotW; px++) {
          const s = minS + (px / plotW) * range;
          const z = (s - mean) / stddev;
          const y = Math.exp(-0.5 * z * z) / (stddev * Math.sqrt(2 * Math.PI));
          const maxY = 1 / (stddev * Math.sqrt(2 * Math.PI));
          const py = marginT + plotH - (y / maxY) * plotH * 0.85;
          if (px === 0) ctx.moveTo(marginL + px, py);
          else ctx.lineTo(marginL + px, py);
        }
        ctx.stroke();
      }

      ctx.setLineDash([4, 4]);
      ctx.strokeStyle = '#4caf50';
      ctx.lineWidth = 1.5;
      const meanX = marginL + ((mean - minS) / range) * plotW;
      ctx.beginPath();
      ctx.moveTo(meanX, marginT);
      ctx.lineTo(meanX, marginT + plotH);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle = '#4caf50';
      ctx.font = 'bold 11px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('μ=' + mean.toFixed(1), meanX, marginT - 5);

      const sd1LX = marginL + ((mean - stddev - minS) / range) * plotW;
      const sd1RX = marginL + ((mean + stddev - minS) / range) * plotW;
      ctx.fillStyle = 'rgba(33,150,243,0.1)';
      ctx.fillRect(sd1LX, marginT, sd1RX - sd1LX, plotH);
      ctx.strokeStyle = 'rgba(33,150,243,0.4)';
      ctx.setLineDash([3, 3]);
      ctx.beginPath();
      ctx.moveTo(sd1LX, marginT); ctx.lineTo(sd1LX, marginT + plotH);
      ctx.moveTo(sd1RX, marginT); ctx.lineTo(sd1RX, marginT + plotH);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.strokeStyle = isDark ? '#555' : '#ccc';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(marginL, marginT + plotH);
      ctx.lineTo(marginL + plotW, marginT + plotH);
      ctx.stroke();

      for (let s = Math.ceil(minS / 5) * 5; s <= maxS; s += 5) {
        const x = marginL + ((s - minS) / range) * plotW;
        ctx.fillStyle = isDark ? '#aaa' : '#666';
        ctx.font = '10px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(s + '', x, marginT + plotH + 16);
      }

      ctx.font = 'bold 13px sans-serif';
      ctx.fillStyle = isDark ? '#e0e0e0' : '#333';
      ctx.textAlign = 'center';
      ctx.fillText('스코어 분포 벨커브 (' + scores.length + '라운드)', W / 2, 20);

      const statsEl = body.querySelector('#sg31DistStats');
      const median = [...scores].sort((a, b) => a - b)[Math.floor(scores.length / 2)];
      const best = Math.min(...scores);
      const worst = Math.max(...scores);
      statsEl.innerHTML =
        '<div class="sg31-stat"><div class="sg31-stat-num">' + mean.toFixed(1) + '</div><div class="sg31-stat-label">평균</div></div>' +
        '<div class="sg31-stat"><div class="sg31-stat-num">' + stddev.toFixed(1) + '</div><div class="sg31-stat-label">표준편차</div></div>' +
        '<div class="sg31-stat"><div class="sg31-stat-num">' + median + '</div><div class="sg31-stat-label">중앙값</div></div>' +
        '<div class="sg31-stat"><div class="sg31-stat-num" style="color:#4caf50">' + best + '</div><div class="sg31-stat-label">베스트</div></div>' +
        '<div class="sg31-stat"><div class="sg31-stat-num" style="color:#f44336">' + worst + '</div><div class="sg31-stat-label">워스트</div></div>' +
        '<div class="sg31-stat"><div class="sg31-stat-num">' + (worst - best) + '</div><div class="sg31-stat-label">범위</div></div>';
    }

    body.querySelector('#sg31DistAdd').onclick = () => {
      const v = parseInt(body.querySelector('#sg31DistInput').value);
      if (v >= 60 && v <= 130) {
        scores.push(v);
        LS('scoredist_v2', scores);
        renderCanvas();
        SFX.score_dist();
      }
    };

    body.querySelector('#sg31DistClear').onclick = () => {
      scores = [];
      LS('scoredist_v2', scores);
      renderCanvas();
    };

    renderCanvas();
    checkAchievements();
  }

  // ========== 5. PAR 3 STRATEGY SIMULATOR ==========
  function openPar3Strategy() {
    SFX.par3_open();
    const par3s = [
      { name: '파3 #1', dist: 155, wind: '역풍 10km/h', hazard: '앞 벙커', elev: '+5m', club: '7I', tip: '벙커 넘기는 한 클럽 업. 그린 앞쪽 보다 중앙 조준' },
      { name: '파3 #2', dist: 185, wind: '좌풍 15km/h', hazard: '좌측 워터', elev: '-3m', club: '5I', tip: '바람에 밀려 우측 조준. 내리막 고려해 한 클럽 다운' },
      { name: '파3 #3', dist: 130, wind: '순풍 5km/h', hazard: '좌우 벙커', elev: '0m', club: '9I', tip: '중앙 안전하게 공략. 핀이 좌측이라도 중앙 조준' },
      { name: '파3 #4', dist: 200, wind: '무풍', hazard: '앞 워터+뒷 OB', elev: '+8m', club: '4H', tip: '오르막이라 비거리 감소. 워터 넘기는 한 클럽 업' },
      { name: '파3 #5', dist: 165, wind: '우풍 20km/h', hazard: '우측 OB', elev: '-2m', club: '6I', tip: '강풍! 좌측 안전지대 공략. 홀 위치에 유혹되지 말 것' },
      { name: '파3 #6', dist: 140, wind: '역풍 8km/h', hazard: '앞 벙커+연못', elev: '+3m', club: '8I', tip: '오르막+역풍으로 실제 150yd 채감. PW보다 8I 추천' }
    ];
    let sel = 0;

    let html = '<div class="sg31-canvas-wrap"><canvas id="sg31Par3Canvas" width="580" height="360"></canvas></div>';
    html += '<div class="sg31-tabs" id="sg31Par3Tabs"></div>';
    html += '<div id="sg31Par3Info"></div>';

    const body = makeOverlay('sg31par3', '&#x26F3; &#xD30C;3&#xD640; &#xC804;&#xB7B5; &#xC2DC;&#xBBAC;&#xB808;&#xC774;&#xD130;', 'linear-gradient(135deg,#00695c,#004d40)', html);

    function renderTabs() {
      const tabsEl = body.querySelector('#sg31Par3Tabs');
      tabsEl.innerHTML = '';
      par3s.forEach((p, i) => {
        const t = document.createElement('button');
        t.className = 'sg31-tab' + (i === sel ? ' active' : '');
        t.textContent = p.name;
        t.onclick = () => { sel = i; renderTabs(); renderCanvas(); renderInfo(); SFX.par3_open(); };
        tabsEl.appendChild(t);
      });
    }

    function renderInfo() {
      const p = par3s[sel];
      body.querySelector('#sg31Par3Info').innerHTML = '<div class="sg31-grid sg31-grid-3" style="margin-top:8px">' +
        '<div class="sg31-stat"><div class="sg31-stat-num">' + p.dist + 'yd</div><div class="sg31-stat-label">거리</div></div>' +
        '<div class="sg31-stat"><div class="sg31-stat-num">' + p.club + '</div><div class="sg31-stat-label">추천 클럽</div></div>' +
        '<div class="sg31-stat"><div class="sg31-stat-num">' + p.elev + '</div><div class="sg31-stat-label">고저차</div></div>' +
        '</div>' +
        '<div class="sg31-card" style="margin-top:8px;cursor:default"><div class="sg31-card-title">&#x1F4A1; 전략 팁</div><div class="sg31-card-desc">' + p.tip + '</div></div>' +
        '<div class="sg31-card" style="cursor:default"><div class="sg31-card-title">&#x1F32C;&#xFE0F; 바람</div><div class="sg31-card-desc">' + p.wind + '</div></div>' +
        '<div class="sg31-card" style="cursor:default"><div class="sg31-card-title">&#x26A0;&#xFE0F; 해저드</div><div class="sg31-card-desc">' + p.hazard + '</div></div>';
    }

    function renderCanvas() {
      const c = body.querySelector('#sg31Par3Canvas');
      if (!c) return;
      const ctx = c.getContext('2d');
      const W = c.width, H = c.height;
      ctx.clearRect(0, 0, W, H);
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      ctx.fillStyle = isDark ? '#1e1e1e' : '#fafafa';
      ctx.fillRect(0, 0, W, H);

      const p = par3s[sel];
      const cx = W / 2, teeY = H - 40;

      ctx.fillStyle = isDark ? '#1b3a25' : '#c8e6c9';
      ctx.fillRect(cx - 100, 20, 200, H - 60);

      ctx.fillStyle = isDark ? '#0d3a15' : '#a5d6a7';
      ctx.beginPath();
      ctx.ellipse(cx, 80, 50, 35, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = isDark ? '#2e7d32' : '#388e3c';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.fillStyle = '#f44336';
      ctx.beginPath();
      ctx.arc(cx, 75, 3, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#333';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(cx, 75);
      ctx.lineTo(cx, 55);
      ctx.stroke();

      if (p.hazard.includes('벙커')) {
        ctx.fillStyle = isDark ? '#5d4037' : '#d7ccc8';
        ctx.beginPath();
        ctx.ellipse(cx - 30, 110, 15, 10, 0, 0, Math.PI * 2);
        ctx.fill();
      }
      if (p.hazard.includes('워터') || p.hazard.includes('연못')) {
        ctx.fillStyle = isDark ? '#0d47a1' : '#bbdefb';
        ctx.beginPath();
        ctx.ellipse(cx + 60, 90, 20, 12, 0, 0, Math.PI * 2);
        ctx.fill();
      }
      if (p.hazard.includes('OB')) {
        ctx.strokeStyle = '#f44336';
        ctx.lineWidth = 2;
        ctx.setLineDash([5, 5]);
        ctx.beginPath();
        ctx.moveTo(cx + 100, 20);
        ctx.lineTo(cx + 100, H - 40);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.font = '10px sans-serif';
        ctx.fillStyle = '#f44336';
        ctx.fillText('OB', cx + 110, 40);
      }

      ctx.fillStyle = isDark ? '#4e342e' : '#8d6e63';
      ctx.fillRect(cx - 15, teeY - 8, 30, 16);
      ctx.fillStyle = isDark ? '#e0e0e0' : '#333';
      ctx.font = '10px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('TEE', cx, teeY + 18);

      ctx.setLineDash([4, 4]);
      ctx.strokeStyle = '#ff9800';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(cx, teeY - 8);
      ctx.lineTo(cx, 80);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.font = 'bold 12px sans-serif';
      ctx.fillStyle = isDark ? '#ff9800' : '#e65100';
      ctx.fillText(p.dist + 'yd', cx + 20, (teeY + 80) / 2);

      ctx.font = 'bold 13px sans-serif';
      ctx.fillStyle = isDark ? '#e0e0e0' : '#333';
      ctx.fillText(p.name + ' 전략맵', W / 2, 15);
    }

    renderTabs();
    renderInfo();
    renderCanvas();
    checkAchievements();
  }

  // ========== 6. MENTAL ENERGY METER ==========
  function openMentalMeter() {
    SFX.mental_open();
    const axes = [
      { name: '자신감', key: 'conf', color: '#e91e63' },
      { name: '집중력', key: 'focus', color: '#2196f3' },
      { name: '평정심', key: 'calm', color: '#4caf50' },
      { name: '인내력', key: 'patience', color: '#ff9800' },
      { name: '투지', key: 'grit', color: '#9c27b0' },
      { name: '회복력', key: 'recovery', color: '#00bcd4' }
    ];

    const saved = LS('mental_v2') || {};
    // 저장된 값이 하나도 없으면 빈 상태 (슬라이더는 중립 50에서 시작하되 기록으로 표시하지 않는다)
    let mentalHasData = axes.some(a => typeof saved[a.key] === 'number');
    axes.forEach(a => { if (typeof saved[a.key] !== 'number') saved[a.key] = 50; });

    let html = '<div class="sg31-canvas-wrap"><canvas id="sg31MentalCanvas" width="520" height="340"></canvas></div>';
    html += '<div id="sg31MentalSliders"></div>';
    html += '<div id="sg31MentalAdvice" style="margin-top:10px"></div>';
    html += '<div style="margin-top:10px;text-align:center"><button class="sg31-btn sg31-btn-primary" id="sg31MentalSave">&#x1F4BE; &#xC800;&#xC7A5;</button></div>';

    const body = makeOverlay('sg31mental', '&#x1F9E0; &#xBA58;&#xD0C8; &#xC5D0;&#xB108;&#xC9C0; &#xBBF8;&#xD130;', 'linear-gradient(135deg,#6a1b9a,#4a148c)', html);

    const slidersEl = body.querySelector('#sg31MentalSliders');
    axes.forEach(a => {
      const row = document.createElement('div');
      row.className = 'sg31-row';
      row.innerHTML = '<span class="sg31-label" style="color:' + a.color + '">' + a.name + '</span>' +
        '<input type="range" class="sg31-slider" id="sg31M_' + a.key + '" min="0" max="100" value="' + saved[a.key] + '">' +
        '<span class="sg31-val" id="sg31MV_' + a.key + '">' + saved[a.key] + '</span>';
      slidersEl.appendChild(row);
      row.querySelector('input').oninput = function () {
        saved[a.key] = parseInt(this.value);
        mentalHasData = true;
        body.querySelector('#sg31MV_' + a.key).textContent = this.value;
        renderCanvas();
        renderAdvice();
      };
    });

    function renderCanvas() {
      const c = body.querySelector('#sg31MentalCanvas');
      if (!c) return;
      const ctx = c.getContext('2d');
      const W = c.width, H = c.height;
      ctx.clearRect(0, 0, W, H);
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      ctx.fillStyle = isDark ? '#1e1e1e' : '#fafafa';
      ctx.fillRect(0, 0, W, H);

      const cx = W / 2, cy = H / 2 + 10;
      const maxR = 120;

      for (let ring = 5; ring >= 1; ring--) {
        const r = maxR * ring / 5;
        ctx.beginPath();
        ctx.strokeStyle = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)';
        ctx.lineWidth = 1;
        for (let i = 0; i < 6; i++) {
          const angle = (Math.PI * 2 / 6) * i - Math.PI / 2;
          const x = cx + r * Math.cos(angle);
          const y = cy + r * Math.sin(angle);
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.stroke();
      }

      axes.forEach((a, i) => {
        const angle = (Math.PI * 2 / 6) * i - Math.PI / 2;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + maxR * Math.cos(angle), cy + maxR * Math.sin(angle));
        ctx.strokeStyle = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)';
        ctx.stroke();

        const labelR = maxR + 18;
        ctx.fillStyle = a.color;
        ctx.font = 'bold 11px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(a.name, cx + labelR * Math.cos(angle), cy + labelR * Math.sin(angle) + 4);
      });

      if (!mentalHasData) {
        ctx.font = 'bold 13px sans-serif';
        ctx.fillStyle = isDark ? '#e0e0e0' : '#333';
        ctx.textAlign = 'center';
        ctx.fillText('멘탈 에너지 미터', W / 2, 18);
        ctx.font = '13px sans-serif';
        ctx.fillStyle = isDark ? '#999' : '#888';
        ctx.fillText('슬라이더로 기록을 추가하면 표시됩니다', cx, cy + 4);
        return;
      }

      ctx.beginPath();
      axes.forEach((a, i) => {
        const angle = (Math.PI * 2 / 6) * i - Math.PI / 2;
        const r = maxR * saved[a.key] / 100;
        const x = cx + r * Math.cos(angle);
        const y = cy + r * Math.sin(angle);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.closePath();
      ctx.fillStyle = 'rgba(156,39,176,0.2)';
      ctx.fill();
      ctx.strokeStyle = '#9c27b0';
      ctx.lineWidth = 2;
      ctx.stroke();

      axes.forEach((a, i) => {
        const angle = (Math.PI * 2 / 6) * i - Math.PI / 2;
        const r = maxR * saved[a.key] / 100;
        ctx.fillStyle = a.color;
        ctx.beginPath();
        ctx.arc(cx + r * Math.cos(angle), cy + r * Math.sin(angle), 4, 0, Math.PI * 2);
        ctx.fill();
      });

      const avg = axes.reduce((a, ax) => a + saved[ax.key], 0) / 6;
      const grade = gradeFromScore(avg, 100);
      ctx.font = 'bold 24px sans-serif';
      ctx.fillStyle = grade.c;
      ctx.textAlign = 'center';
      ctx.fillText(grade.g, cx, cy + 6);
      ctx.font = '10px sans-serif';
      ctx.fillStyle = isDark ? '#aaa' : '#666';
      ctx.fillText(Math.round(avg) + '/100', cx, cy + 20);

      ctx.font = 'bold 13px sans-serif';
      ctx.fillStyle = isDark ? '#e0e0e0' : '#333';
      ctx.fillText('멘탈 에너지 미터', W / 2, 18);
    }

    function renderAdvice() {
      if (!mentalHasData) {
        body.querySelector('#sg31MentalAdvice').innerHTML =
          '<div class="sg31-card" style="cursor:default"><div class="sg31-card-desc" style="text-align:center">&#xAE30;&#xB85D;&#xC744; &#xCD94;&#xAC00;&#xD558;&#xBA74; &#xD45C;&#xC2DC;&#xB429;&#xB2C8;&#xB2E4;</div></div>';
        return;
      }
      const weakest = axes.reduce((min, a) => saved[a.key] < saved[min.key] ? a : min, axes[0]);
      const advices = {
        conf: '성공 경험을 떠올려 보세요. 지난 베스트 샷을 시각화하고, 프리샷 루틴을 반복하세요.',
        focus: '한 샷에만 집중하세요. 타겟을 정하고, 심호흡을 3번 한 후 샷을 시작하세요.',
        calm: '심호흡 4-7-8 테크닉을 연습하세요. 나쁘 샷 후에도 다음 샷에 집중하세요.',
        patience: '과정을 즐기세요. 결과보다 과정에 집중하면 인내력이 높아집니다.',
        grit: '어려운 상황을 성장 기회로 보세요. 보기 +2 이후의 회복이 진정한 실력입니다.',
        recovery: '미스샷 후 리셋 루틴을 만드세요. 심호흡, 어깨 풀기, 과거 성공 회상.'
      };
      body.querySelector('#sg31MentalAdvice').innerHTML =
        '<div class="sg31-card" style="cursor:default;border-left:3px solid ' + weakest.color + '">' +
        '<div class="sg31-card-title">&#x1F4A1; 약점 분석: ' + weakest.name + ' (' + saved[weakest.key] + '/100)</div>' +
        '<div class="sg31-card-desc">' + advices[weakest.key] + '</div></div>';
    }

    renderCanvas();
    renderAdvice();

    body.querySelector('#sg31MentalSave').onclick = () => {
      LS('mental_v2', saved);
      SFX.mental_open();
    };
    checkAchievements();
  }

  // ========== 7. MISS-SHOT PATTERN CORRECTOR ==========
  function openMissCorrector() {
    SFX.miss_open();
    const missTypes = [
      { name: '슬라이스', icon: '&#x27A1;&#xFE0F;', cause: '오픈 페이스, 아웃사이드 스윙 경로', fix: '클럽페이스 정렬 확인, 그립 압력 균등 분배, 피니시에서 타겟 보기' },
      { name: '훅', icon: '&#x2B05;&#xFE0F;', cause: '클로즈드 페이스, 인사이드 스윙 경로', fix: '얼라인먼트 책 사용, 백스윙 타이밍 조절, 샤프트 플렉스 확인' },
      { name: '탑볼', icon: '&#x2B06;&#xFE0F;', cause: '위부 타격, 고개 들기', fix: '공 위치 정확히 확인, 다운스윙시 고개 유지, 체중 이동 선행' },
      { name: '따이나', icon: '&#x2B07;&#xFE0F;', cause: '하부 타격, 몬통 리드, 스퀀 경사', fix: '공 위치를 스탠스 중앙에, 체중을 앞발에 유지' },
      { name: '팩', icon: '&#x1F4A5;', cause: '볼 뒤 땅 타격, 스톱 각도 문제', fix: '활에 힘빼고 아래로, 켜스트 리드 확인, 어드레스 볼 위치' },
      { name: '삹크', icon: '&#x1F4A2;', cause: '힐 타격, 호즐 너무 가까이', fix: '긴장감 유지, 어드레스 거리 확인, 무릭과 팔 간격 체크' },
      { name: '청크', icon: '&#x1F95A;', cause: '외측 타격, 스윙 아크 불안정', fix: '클럽의 스윗스팟 인지, 하프샷 연습으로 임팩트 위치 학습' },
      { name: '푸쉬파드', icon: '&#x1F622;', cause: '어필 까이는 샷, 슬로우 스윙에서 발생', fix: '팜 지름길 유지, 스윙 팀포 빠르게, 다운스윙에서 손목 힐지 유지' }
    ];

    let selMiss = LS('miss_sel') || 0;

    let html = '<div class="sg31-canvas-wrap"><canvas id="sg31MissCanvas" width="580" height="380"></canvas></div>';
    html += '<div class="sg31-tabs" id="sg31MissTabs"></div>';
    html += '<div id="sg31MissDetail"></div>';

    const body = makeOverlay('sg31miss', '&#x1F6E0;&#xFE0F; &#xBBF8;&#xC2A4;&#xC0F7; &#xD328;&#xD134; &#xCF54;&#xB809;&#xD130;', 'linear-gradient(135deg,#c62828,#b71c1c)', html);

    function renderTabs() {
      const tabsEl = body.querySelector('#sg31MissTabs');
      tabsEl.innerHTML = '';
      missTypes.forEach((m, i) => {
        const t = document.createElement('button');
        t.className = 'sg31-tab' + (i === selMiss ? ' active' : '');
        t.innerHTML = m.icon + ' ' + m.name;
        t.onclick = () => { selMiss = i; LS('miss_sel', i); renderTabs(); renderCanvas(); renderDetail(); SFX.miss_open(); };
        tabsEl.appendChild(t);
      });
    }

    function renderDetail() {
      const m = missTypes[selMiss];
      body.querySelector('#sg31MissDetail').innerHTML =
        '<div class="sg31-card" style="cursor:default;margin-top:8px;border-left:3px solid #f44336">' +
        '<div class="sg31-card-title">&#x26A0;&#xFE0F; 원인 분석</div><div class="sg31-card-desc">' + m.cause + '</div></div>' +
        '<div class="sg31-card" style="cursor:default;border-left:3px solid #4caf50">' +
        '<div class="sg31-card-title">&#x2705; 교정 방법</div><div class="sg31-card-desc">' + m.fix + '</div></div>';
    }

    function renderCanvas() {
      const c = body.querySelector('#sg31MissCanvas');
      if (!c) return;
      const ctx = c.getContext('2d');
      const W = c.width, H = c.height;
      ctx.clearRect(0, 0, W, H);
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      ctx.fillStyle = isDark ? '#1e1e1e' : '#fafafa';
      ctx.fillRect(0, 0, W, H);

      const cx = W / 2, cy = H / 2;
      const m = missTypes[selMiss];

      ctx.strokeStyle = isDark ? '#555' : '#ccc';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(cx, 40); ctx.lineTo(cx, H - 40);
      ctx.moveTo(80, cy); ctx.lineTo(W - 80, cy);
      ctx.stroke();

      ctx.fillStyle = isDark ? '#aaa' : '#888';
      ctx.font = '10px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('타겟', cx, 35);
      ctx.fillText('볼 위치', cx, H - 25);
      ctx.textAlign = 'left';
      ctx.fillText('훅', 85, cy - 8);
      ctx.textAlign = 'right';
      ctx.fillText('슬라이스', W - 85, cy - 8);

      ctx.fillStyle = '#4caf50';
      ctx.beginPath();
      ctx.arc(cx, cy - 60, 8, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = isDark ? '#e0e0e0' : '#333';
      ctx.font = '10px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('정상', cx, cy - 75);

      const missDir = {
        0: { x: 80, y: -30 }, 1: { x: -80, y: -30 },
        2: { x: 0, y: -100 }, 3: { x: 0, y: 40 },
        4: { x: 10, y: 50 }, 5: { x: 30, y: 20 },
        6: { x: 40, y: -50 }, 7: { x: -15, y: 30 }
      };
      const dir = missDir[selMiss] || { x: 0, y: 0 };

      ctx.fillStyle = '#f44336';
      ctx.beginPath();
      ctx.arc(cx + dir.x, cy - 60 + dir.y, 8, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = isDark ? '#ef9a9a' : '#c62828';
      ctx.font = 'bold 10px sans-serif';
      ctx.fillText(m.name, cx + dir.x, cy - 60 + dir.y - 14);

      ctx.setLineDash([3, 3]);
      ctx.strokeStyle = '#ff9800';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(cx, cy - 60);
      ctx.lineTo(cx + dir.x, cy - 60 + dir.y);
      ctx.stroke();
      ctx.setLineDash([]);

      const barW = 50, barH = 6;
      const metrics = [
        { name: '페;이;스 각도', val: selMiss < 2 ? 0.3 : 0.8 },
        { name: '스;윙 경;로', val: selMiss < 4 ? 0.4 : 0.7 },
        { name: '임;팩;트 위;치', val: selMiss >= 4 ? 0.3 : 0.8 },
        { name: '체;중 이;동', val: selMiss === 3 || selMiss === 4 ? 0.3 : 0.75 }
      ];

      ctx.font = '10px sans-serif';
      const metricsX = 30, metricsY = H - 100;
      metrics.forEach((mt, i) => {
        const y = metricsY + i * 18;
        ctx.fillStyle = isDark ? '#aaa' : '#666';
        ctx.textAlign = 'left';
        ctx.fillText(mt.name, metricsX, y + 5);
        ctx.fillStyle = isDark ? '#333' : '#e0e0e0';
        ctx.fillRect(metricsX + 90, y, barW, barH);
        ctx.fillStyle = mt.val > 0.6 ? '#4caf50' : mt.val > 0.4 ? '#ff9800' : '#f44336';
        ctx.fillRect(metricsX + 90, y, barW * mt.val, barH);
      });

      ctx.font = 'bold 13px sans-serif';
      ctx.fillStyle = isDark ? '#e0e0e0' : '#333';
      ctx.textAlign = 'center';
      ctx.fillText(m.name + ' 미스샷 패턴 분석', W / 2, 20);
    }

    renderTabs();
    renderDetail();
    renderCanvas();
    checkAchievements();
  }

  // ========== 8. SEASON GOAL ACHIEVEMENT TRACKER ==========
  function openGoalTracker() {
    SFX.goal_open();
    const goals = [
      { name: '80타 베리어 돌파', target: 1, unit: '회', icon: '&#x1F3AF;' },
      { name: '보기 프리 라운드', target: 3, unit: '회', icon: '&#x1F31F;' },
      { name: '버디 50개 달성', target: 50, unit: '개', icon: '&#x1F426;' },
      { name: 'FIR 60% 이상', target: 60, unit: '%', icon: '&#x1F3CC;&#xFE0F;' },
      { name: 'GIR 50% 이상', target: 50, unit: '%', icon: '&#x26F3;' },
      { name: '평균 퍼트 32이하', target: 32, unit: '퍼트', icon: '&#x1F3F3;&#xFE0F;' },
      { name: '월간 라운드 8회', target: 8, unit: '회', icon: '&#x1F4C5;' },
      { name: '연습장 20회 방문', target: 20, unit: '회', icon: '&#x1F3CB;&#xFE0F;' },
      { name: '새 코스 5곳 정복', target: 5, unit: '곳', icon: '&#x1F5FA;&#xFE0F;' },
      { name: '핸디칡 2 개선', target: 2, unit: '타', icon: '&#x1F4C9;' }
    ];

    const saved = LS('goals_v2') || {};
    // 저장된 진행도가 없으면 0에서 시작한다 (임의 진행도 생성 금지)
    goals.forEach((g, i) => { if (typeof saved[i] !== 'number') saved[i] = 0; });

    let html = '<div class="sg31-canvas-wrap"><canvas id="sg31GoalCanvas" width="600" height="360"></canvas></div>';
    html += '<div id="sg31GoalList"></div>';
    html += '<div style="margin-top:10px;text-align:center"><button class="sg31-btn sg31-btn-primary" id="sg31GoalSave">&#x1F4BE; &#xC800;&#xC7A5;</button></div>';

    const body = makeOverlay('sg31goal', '&#x1F3C6; &#xC2DC;&#xC998; &#xBAA9;&#xD45C; &#xB2EC;&#xC131; &#xD2B8;&#xB798;&#xCEE4;', 'linear-gradient(135deg,#e65100,#bf360c)', html);

    function renderList() {
      const listEl = body.querySelector('#sg31GoalList');
      listEl.innerHTML = '';
      goals.forEach((g, i) => {
        const cur = saved[i] || 0;
        const pct = Math.min(100, Math.round(cur / g.target * 100));
        const done = pct >= 100;
        const card = document.createElement('div');
        card.className = 'sg31-card';
        card.style.cursor = 'default';
        if (done) card.style.borderColor = '#4caf50';
        card.innerHTML =
          '<div class="sg31-card-title">' + g.icon + ' ' + g.name + (done ? ' <span class="sg31-badge sg31-badge-green">완료!</span>' : '') + '</div>' +
          '<div style="display:flex;align-items:center;gap:8px">' +
          '<div class="sg31-progress" style="flex:1"><div class="sg31-progress-fill" style="width:' + pct + '%;background:' + (done ? '#4caf50' : pct > 50 ? '#ff9800' : '#2196f3') + '"></div></div>' +
          '<span style="font-size:12px;font-weight:700;min-width:80px;text-align:right">' + cur + '/' + g.target + ' ' + g.unit + ' (' + pct + '%)</span>' +
          '<button class="sg31-btn sg31-btn-outline" data-gi="' + i + '" style="padding:4px 10px;font-size:11px">+1</button>' +
          '</div>';
        listEl.appendChild(card);
      });
      listEl.querySelectorAll('[data-gi]').forEach(btn => {
        btn.onclick = () => {
          const idx = parseInt(btn.dataset.gi);
          saved[idx] = (saved[idx] || 0) + 1;
          if (saved[idx] >= goals[idx].target) SFX.goal_achieve();
          else SFX.goal_open();
          renderList();
          renderCanvas();
        };
      });
    }

    function renderCanvas() {
      const c = body.querySelector('#sg31GoalCanvas');
      if (!c) return;
      const ctx = c.getContext('2d');
      const W = c.width, H = c.height;
      ctx.clearRect(0, 0, W, H);
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      ctx.fillStyle = isDark ? '#1e1e1e' : '#fafafa';
      ctx.fillRect(0, 0, W, H);

      const marginL = 120, marginR = 30, marginT = 35, marginB = 30;
      const plotW = W - marginL - marginR;
      const plotH = H - marginT - marginB;
      const barH = plotH / goals.length - 4;

      goals.forEach((g, i) => {
        const cur = saved[i] || 0;
        const pct = Math.min(1, cur / g.target);
        const y = marginT + i * (barH + 4);

        ctx.fillStyle = isDark ? '#333' : '#e0e0e0';
        ctx.fillRect(marginL, y, plotW, barH);

        const color = pct >= 1 ? '#4caf50' : pct > 0.5 ? '#ff9800' : '#2196f3';
        const grad = ctx.createLinearGradient(marginL, 0, marginL + plotW * pct, 0);
        grad.addColorStop(0, color);
        grad.addColorStop(1, pct >= 1 ? '#81c784' : color);
        ctx.fillStyle = grad;
        ctx.fillRect(marginL, y, plotW * pct, barH);

        ctx.fillStyle = isDark ? '#e0e0e0' : '#333';
        ctx.font = '10px sans-serif';
        ctx.textAlign = 'right';
        ctx.fillText(g.name, marginL - 6, y + barH / 2 + 4);

        ctx.fillStyle = pct >= 1 ? '#fff' : (isDark ? '#e0e0e0' : '#333');
        ctx.font = 'bold 10px sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText(Math.round(pct * 100) + '%', marginL + plotW * pct + 4, y + barH / 2 + 4);
      });

      const achieved = goals.filter((g, i) => (saved[i] || 0) >= g.target).length;
      ctx.font = 'bold 13px sans-serif';
      ctx.fillStyle = isDark ? '#e0e0e0' : '#333';
      ctx.textAlign = 'center';
      ctx.fillText('시즌 목표 달성 (' + achieved + '/' + goals.length + ' 완료)', W / 2, 20);

      const totalProgress = goals.reduce((a, g, i) => a + (saved[i] || 0), 0);
      if (totalProgress === 0) {
        ctx.font = '13px sans-serif';
        ctx.fillStyle = isDark ? '#999' : '#888';
        ctx.fillText('기록을 추가하면 표시됩니다 (+1 버튼)', W / 2, H - 10);
      }
    }

    renderList();
    renderCanvas();

    body.querySelector('#sg31GoalSave').onclick = () => {
      LS('goals_v2', saved);
      SFX.goal_open();
    };
    checkAchievements();
  }

  // ========== GOLF IQ v15 ==========
  function openGolfIQv15() {
    SFX.quiz_v15();
    const questions = [
      { q: '드로우 샷을 치려면 볼을 스탠스의 어디에 놓아야 하나?', a: ['앞발 앞', '중앙', '뒣발 앞', '앞발 안쪽'], c: 2 },
      { q: '페이드 샷과 드로우 샷의 차이점은?', a: ['그립이 다르다', '볼의 휘어지는 방향이 반대', '클럽이 다르다', '스윙 속도가 다르다'], c: 1 },
      { q: '바운스 룰에서 볼이 레드 페널티 구역에 들어가면?', a: ['1벌타', '2벌타 밌 드롭', '재타권', '볼 있는 곳에서 플레이'], c: 1 },
      { q: '퍼팅 시 볼이 홈 근처에서 속도가 빠르면?', a: ['세게 쳐야 한다', '개인 취향이다', '더 세게 쳐야 한다 (각도 변화 무시)', '볼을 홈을 지나쳐 보내야 한다'], c: 3 },
      { q: '투어 프로 선수들의 평균 드라이버 비거리는 약?', a: ['250yd', '275yd', '295yd', '320yd'], c: 2 },
      { q: 'Stimpmeter로 측정한 그린 스피드 12는 어떤 수준인가?', a: ['느린 그린', '보통 그린', '빠른 그린', '투어급 초고속 그린'], c: 2 },
      { q: '코스 레이팅과 슬로프 레이팅의 차이점은?', a: ['같은 의미', '슬로프는 보기 플레이어의 난이도', '코스 레이팅이 더 중요', '슬로프는 날씨 변수'], c: 1 },
      { q: '런치 앵글 12도와 15도 중 바람에 강한 탄도는?', a: ['12도 (낮은 탄도)', '15도 (높은 탄도)', '같다', '바람과 무관'], c: 0 },
      { q: '스트로크 게인드(SG) 통계에서 양수값은?', a: ['평균보다 좋은 성적', '평균보다 나쁜 성적', '기준 타수', '베스트 스코어'], c: 0 },
      { q: '프리샷 루틴의 주요 목적은?', a: ['시간 끌기', '일관된 스윙과 멘탈 준비', '동반자에게 보여주기', '규칙상 의무'], c: 1 },
      { q: '바람이 20km/h일 때 비거리 변화는 약?', a: ['5%', '10%', '15%', '20%'], c: 1 },
      { q: '업힐 라이에서 공을 칠 때 주의점은?', a: ['클럽을 세게 치다', '볼을 먼저 입수한다', '체중을 낮춘고 스윙을 짧게', '풀 스윙을 한다'], c: 2 },
      { q: '핸디칡 인덱스 계산에서 ESC(이퀘터블 스트로크 컨트롤)의 역할은?', a: ['보너스 타수 추가', '이상치 높은 타수 제한', '날씨 보정', '소수점 조정'], c: 1 },
      { q: '그린이 다운힐(앞에서 뒤로 경사)일 때 퍼팅 전략은?', a: ['약하게 쳐야 한다 (경사가 볼을 가속)', '강하게 쳐야 한다', '경사와 무관하다', '홀을 지나 쳐야 한다'], c: 0 },
      { q: '공의 디뼜 수가 적을수록 발생하는 현상은?', a: ['더 많이 뜨고 더 멀리 간다', '더 많이 뜨지만 곧 떨어진다', '더 낮게 날아간다', '바람에 더 약해진다'], c: 2 }
    ];

    let cur = 0, score = 0, answered = new Array(questions.length).fill(-1);

    let html = '<div id="sg31IQContent"></div>';
    const body = makeOverlay('sg31iq', '&#x1F9E0; Golf IQ v15 (15&#xBB38;&#xD56D;)', 'linear-gradient(135deg,#283593,#1a237e)', html);

    function renderQ() {
      const cont = body.querySelector('#sg31IQContent');
      if (cur >= questions.length) {
        const pct = Math.round(score / questions.length * 100);
        const grade = gradeFromScore(score, questions.length);
        cont.innerHTML = '<div style="text-align:center;padding:20px">' +
          '<div style="font-size:48px;font-weight:800;color:' + grade.c + '">' + grade.g + '</div>' +
          '<div style="font-size:24px;font-weight:700;margin:8px 0">' + score + '/' + questions.length + ' (' + pct + '%)</div>' +
          '<div style="font-size:14px;color:var(--text-muted)">Golf IQ v15 완료!</div>' +
          '<button class="sg31-btn sg31-btn-primary" style="margin-top:16px" onclick="document.getElementById(\'sg31iq\').classList.remove(\'active\')">닫기</button></div>';
        LS('iq_v15', score);
        checkAchievements();
        return;
      }

      const q = questions[cur];
      cont.innerHTML = '<div style="margin-bottom:12px"><span class="sg31-badge sg31-badge-blue">Q' + (cur + 1) + '/' + questions.length + '</span></div>' +
        '<div style="font-size:15px;font-weight:700;margin-bottom:12px;line-height:1.5">' + q.q + '</div>' +
        q.a.map((a, i) => '<div class="sg31-card sg31-answer" data-ai="' + i + '" style="margin-bottom:6px"><div class="sg31-card-desc" style="font-size:13px">' + a + '</div></div>').join('');

      cont.querySelectorAll('.sg31-answer').forEach(card => {
        card.onclick = () => {
          const ai = parseInt(card.dataset.ai);
          answered[cur] = ai;
          if (ai === q.c) { score++; card.style.borderColor = '#4caf50'; card.style.background = 'rgba(76,175,80,0.15)'; }
          else { card.style.borderColor = '#f44336'; card.style.background = 'rgba(244,67,54,0.15)'; }
          cont.querySelectorAll('.sg31-answer').forEach(c => { c.style.pointerEvents = 'none'; });
          const correct = cont.querySelectorAll('.sg31-answer')[q.c];
          correct.style.borderColor = '#4caf50';
          correct.style.background = 'rgba(76,175,80,0.15)';
          SFX.quiz_v15();
          setTimeout(() => { cur++; renderQ(); }, 1200);
        };
      });
    }
    renderQ();
  }

  // ========== ACHIEVEMENTS ==========
  function checkAchievements() {
    const achs = [
      { id: 'v31_replay', name: '라운드 리플레이어', desc: '라운드 리플레이 분석기 열기', check: () => LS('replay_v2') !== null },
      { id: 'v31_green', name: '그린 공략가', desc: '그린 어택 각도 분석 사용', check: () => LS('greenatk_dist') !== null },
      { id: 'v31_hitmap', name: '페어웨이 분석가', desc: '페어웨이 히트맵 20샷 기록', check: () => { const d = LS('hitmap_data_v2'); return d && Object.values(d).some(v => v && v.length >= 20); } },
      { id: 'v31_bell', name: '통계 분석가', desc: '스코어 벨커브 분석 사용', check: () => { const s = LS('scoredist_v2'); return s && s.length >= 5; } },
      { id: 'v31_par3', name: '파3 전략가', desc: '파3 전략 시뮬레이터 전체 확인', check: () => !!document.getElementById('sg31par3') },
      { id: 'v31_mental', name: '멘탈 코치', desc: '멘탈 에너지 미터 저장', check: () => LS('mental_v2') !== null },
      { id: 'v31_miss', name: '미스샷 닥터', desc: '미스샷 패턴 코렉터 전체 확인', check: () => !!document.getElementById('sg31miss') },
      { id: 'v31_goal5', name: '목표 달성자', desc: '시즘 목표 5개 이상 달성', check: () => { const g = LS('goals_v2'); return g && Object.values(g).filter((v, i) => v >= [1,3,50,60,50,32,8,20,5,2][i]).length >= 5; } },
      { id: 'v31_iq15s', name: 'Golf IQ v15 S등급', desc: 'Golf IQ v15에서 S등급 획득', check: () => { const s = LS('iq_v15'); return s !== null && s >= 14; } },
      { id: 'v31_iq15', name: 'Golf IQ v15 클리어', desc: 'Golf IQ v15 완료', check: () => LS('iq_v15') !== null },
      { id: 'v31_hitmap3', name: '멀티 클럽 분석', desc: '히트맵 3개 클럽 이상 데이터 입력', check: () => { const d = LS('hitmap_data_v2'); return d && Object.values(d).filter(v => v && v.length > 0).length >= 3; } },
      { id: 'v31_goal10', name: '목표 완주자', desc: '시즘 목표 10개 전부 달성', check: () => { const g = LS('goals_v2'); return g && Object.values(g).filter((v, i) => v >= [1,3,50,60,50,32,8,20,5,2][i]).length >= 10; } },
      { id: 'v31_score30', name: '리플레이 수집가', desc: '스코어 30개 이상 기록', check: () => { const s = LS('scoredist_v2'); return s && s.length >= 30; } },
      { id: 'v31_mentalS', name: '멘탈 챔피언', desc: '멘탈 에너지 전체 80이상', check: () => { const m = LS('mental_v2'); return m && Object.values(m).every(v => v >= 80); } },
      { id: 'v31_complete', name: 'v31 컴플리트', desc: 'v31 전체 기능 탐험 완료', check: () => LS('replay_v2') !== null && LS('greenatk_dist') !== null && LS('mental_v2') !== null && LS('iq_v15') !== null && LS('goals_v2') !== null }
    ];

    achs.forEach(a => {
      if (!LS('ach_' + a.id) && a.check()) {
        LS('ach_' + a.id, true);
        SFX.achieve_v31();
        const toast = document.createElement('div');
        toast.style.cssText = 'position:fixed;top:20px;right:20px;z-index:99999;background:#4caf50;color:#fff;padding:12px 20px;border-radius:12px;font-size:13px;font-weight:700;box-shadow:0 4px 20px rgba(0,0,0,.3);animation:sg31SlideUp .3s;max-width:300px';
        toast.innerHTML = '&#x1F3C6; ' + a.name + '<br><span style="font-weight:400;font-size:11px">' + a.desc + '</span>';
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 3000);
      }
    });
  }

  // ========== APPEND TO EXISTING NAV ==========
  const navItems = [
    { icon: '&#x1F3AC;', label: 'Replay', fn: openReplayAnalyzer },
    { icon: '&#x1F3AF;', label: 'GreenAtk', fn: openGreenAttack },
    { icon: '&#x1F4CD;', label: 'Hitmap', fn: openFairwayHitmap },
    { icon: '&#x1F4CA;', label: 'BellCurve', fn: openScoreDist },
    { icon: '&#x26F3;', label: 'Par3Sim', fn: openPar3Strategy },
    { icon: '&#x1F9E0;', label: 'Mental', fn: openMentalMeter },
    { icon: '&#x1F6E0;&#xFE0F;', label: 'MissFix', fn: openMissCorrector },
    { icon: '&#x1F3C6;', label: 'GoalTrack', fn: openGoalTracker },
    { icon: '&#x1F4DD;', label: 'IQ v15', fn: openGolfIQv15 }
  ];

  const existingBar = document.querySelector('.sg30-bottom-bar') || document.querySelector('[class*="bottom-bar"]');
  if (existingBar) {
    navItems.forEach(item => {
      const btn = document.createElement('button');
      btn.className = existingBar.querySelector('button') ? existingBar.querySelector('button').className : 'sg30-bbtn';
      btn.innerHTML = '<span class="' + (existingBar.querySelector('.sg30-bbtn-icon') ? 'sg30-bbtn-icon' : 'sg31-bbtn-icon') + '">' + item.icon + '</span><span class="' + (existingBar.querySelector('.sg30-bbtn-label') ? 'sg30-bbtn-label' : 'sg31-bbtn-label') + '">' + item.label + '</span>';
      btn.onclick = item.fn;
      existingBar.appendChild(btn);
    });
  }

  // ========== KEYBOARD SHORTCUTS ==========
  document.addEventListener('keydown', e => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'SELECT') return;
    if (!e.shiftKey) return;
    const map = { A: openReplayAnalyzer, G: openGreenAttack, F: openFairwayHitmap, B: openScoreDist, T: openPar3Strategy, E: openMentalMeter, X: openMissCorrector, D: openGoalTracker };
    if (map[e.key]) { e.preventDefault(); map[e.key](); }
  });

  // ========== ESC to close ==========
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.sg31-overlay.active').forEach(ov => ov.classList.remove('active'));
    }
  });

})();
