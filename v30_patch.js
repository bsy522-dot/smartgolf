/* ====================================================================
 * SmartGolf v30.0 patch
 * 스윙스피드존분석기Canvas14클럽x5존 + 코스매니지먼트플래너Canvas18홀전략맵
 * + 퍼팅그린브레이크시뮬Canvas3D경사 + 라운드컨디션최적화Canvas6축Radar
 * + 골프장날씨비교Canvas8코스3일 + 프로샷라이브러리Canvas10프로12샷
 * + 클럽헤드스피드트래커CanvasLine20세션 + 시즌챌린지보드Canvas12미션
 * + Golf IQ v14 15문항 + 업적+15(182→197) + SFX19종(183→202) + 키보드8종
 * ==================================================================== */
(function () {
  'use strict';

  const LS = (k, v) => v === undefined ? JSON.parse(localStorage.getItem('sg30_' + k) || 'null') : localStorage.setItem('sg30_' + k, JSON.stringify(v));

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
    speed_open: () => { sfx(392, 0.1); sfx(523, 0.12); },
    speed_record: () => { sfx(523, 0.08); sfx(659, 0.1); sfx(784, 0.12); },
    course_open: () => { sfx(440, 0.12); sfx(554, 0.1); },
    course_plan: () => { sfx(554, 0.08); sfx(698, 0.1); sfx(880, 0.12); },
    putt3d_open: () => { sfx(349, 0.1); sfx(466, 0.12); },
    putt3d_roll: () => { sfx(220, 0.3, 'sine', 0.1); sfx(330, 0.2, 'sine', 0.06); },
    putt3d_hole: () => { sfx(784, 0.1); sfx(1047, 0.1); sfx(1319, 0.15, 'triangle'); },
    condition_opt: () => { sfx(466, 0.12); sfx(587, 0.1); },
    condition_score: () => { sfx(587, 0.08); sfx(740, 0.08); sfx(880, 0.12); },
    weather_cmp: () => { sfx(330, 0.12); sfx(415, 0.1); },
    weather_refresh: () => { sfx(523, 0.1); sfx(784, 0.12); },
    pro_open: () => { sfx(294, 0.1); sfx(370, 0.12); },
    pro_select: () => { sfx(370, 0.08); sfx(466, 0.08); sfx(587, 0.12); },
    headspd_open: () => { sfx(415, 0.12); sfx(523, 0.1); },
    headspd_record: () => { sfx(523, 0.1); sfx(659, 0.1); sfx(784, 0.15); },
    challenge_open: () => { sfx(370, 0.1); sfx(494, 0.12); },
    challenge_done: () => { sfx(784, 0.1); sfx(1047, 0.1); sfx(1319, 0.15, 'triangle'); },
    quiz_v14: () => { sfx(554, 0.1); sfx(698, 0.12); },
    achieve_v30: () => { sfx(523, 0.06); sfx(659, 0.06); sfx(784, 0.06); sfx(1047, 0.06); sfx(1319, 0.2, 'triangle'); }
  };

  // ========== CSS ==========
  const css = `
.sg30-bottom-bar{position:fixed;bottom:0;left:0;right:0;z-index:10010;background:var(--glass-bg,rgba(255,255,255,.92));backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);border-top:1px solid var(--border,#e0e0e0);padding:8px 12px;display:flex;gap:8px;overflow-x:auto;scrollbar-width:none;-ms-overflow-style:none}
.sg30-bottom-bar::-webkit-scrollbar{display:none}
.sg30-bbtn{flex-shrink:0;display:flex;flex-direction:column;align-items:center;gap:3px;padding:6px 10px;border-radius:10px;border:1px solid var(--border,#e0e0e0);background:var(--card-bg,#fff);cursor:pointer;transition:all .2s;min-width:58px;font-family:inherit}
.sg30-bbtn:hover,.sg30-bbtn:active{background:var(--primary-light,#e8f5e9);border-color:var(--primary,#1a7a3a)}
.sg30-bbtn-icon{font-size:18px;line-height:1}
.sg30-bbtn-label{font-size:9px;font-weight:700;color:var(--text-muted,#666);white-space:nowrap}
.sg30-overlay{display:none;position:fixed;top:0;left:0;right:0;bottom:0;z-index:10020;background:rgba(0,0,0,.55);overflow-y:auto;padding:20px;animation:sg30FadeIn .25s}
.sg30-overlay.active{display:flex;align-items:flex-start;justify-content:center}
@keyframes sg30FadeIn{from{opacity:0}to{opacity:1}}
.sg30-panel{background:var(--card-bg,#fff);border-radius:16px;max-width:660px;width:100%;margin:30px auto;box-shadow:0 8px 40px rgba(0,0,0,.3);overflow:hidden;animation:sg30SlideUp .3s}
@keyframes sg30SlideUp{from{transform:translateY(30px);opacity:0}to{transform:translateY(0);opacity:1}}
.sg30-panel-head{padding:16px 20px;color:#fff;display:flex;align-items:center;justify-content:space-between}
.sg30-panel-head h3{font-size:16px;font-weight:700;display:flex;align-items:center;gap:8px}
.sg30-panel-close{background:rgba(255,255,255,.25);border:none;color:#fff;width:30px;height:30px;border-radius:50%;cursor:pointer;font-size:16px;font-family:inherit}
.sg30-panel-body{padding:16px 20px;max-height:70vh;overflow-y:auto}
.sg30-card{background:var(--bg,#f5f7f5);border-radius:12px;padding:14px;margin-bottom:10px;border:1px solid var(--border,#e0e0e0);cursor:pointer;transition:all .2s}
.sg30-card:hover{box-shadow:0 2px 12px rgba(0,0,0,.1);transform:translateY(-1px)}
.sg30-card-title{font-weight:700;font-size:14px;color:var(--text,#1a1a1a);margin-bottom:4px;display:flex;align-items:center;gap:6px}
.sg30-card-desc{font-size:12px;color:var(--text-muted,#666);line-height:1.5}
.sg30-badge{display:inline-block;padding:2px 8px;border-radius:10px;font-size:10px;font-weight:700}
.sg30-badge-purple{background:#ede7f6;color:#6a1b9a}
.sg30-badge-green{background:#e8f5e9;color:#2e7d32}
.sg30-badge-blue{background:#e3f2fd;color:#1565c0}
.sg30-badge-orange{background:#fff3e0;color:#e65100}
.sg30-badge-red{background:#ffebee;color:#c62828}
.sg30-badge-teal{background:#e0f2f1;color:#00695c}
.sg30-tabs{display:flex;gap:4px;margin-bottom:12px;flex-wrap:wrap}
.sg30-tab{padding:6px 14px;border-radius:20px;border:1px solid var(--border,#e0e0e0);background:var(--bg,#f5f7f5);font-size:12px;cursor:pointer;font-weight:600;color:var(--text-muted,#666);transition:all .2s;font-family:inherit}
.sg30-tab.active{background:var(--primary,#1a7a3a);color:#fff;border-color:var(--primary,#1a7a3a)}
.sg30-input{width:100%;padding:8px 12px;border:2px solid var(--border,#e0e0e0);border-radius:8px;font-size:13px;font-family:inherit;background:var(--card-bg,#fff);color:var(--text,#1a1a1a)}
.sg30-input:focus{border-color:var(--primary,#1a7a3a);outline:none}
.sg30-btn{padding:8px 16px;border-radius:8px;border:none;font-size:13px;font-weight:600;cursor:pointer;transition:all .2s;font-family:inherit}
.sg30-btn-primary{background:var(--primary,#1a7a3a);color:#fff}
.sg30-btn-primary:hover{opacity:.85}
.sg30-btn-secondary{background:var(--bg,#f5f7f5);color:var(--text,#1a1a1a);border:1px solid var(--border,#e0e0e0)}
.sg30-slider{width:100%;-webkit-appearance:none;height:6px;border-radius:3px;background:var(--border,#e0e0e0);outline:none}
.sg30-slider::-webkit-slider-thumb{-webkit-appearance:none;width:18px;height:18px;border-radius:50%;background:var(--primary,#1a7a3a);cursor:pointer}
.sg30-grid{display:grid;gap:8px}
.sg30-grid-2{grid-template-columns:1fr 1fr}
.sg30-grid-3{grid-template-columns:1fr 1fr 1fr}
.sg30-stat{text-align:center;padding:10px;background:var(--bg,#f5f7f5);border-radius:10px;border:1px solid var(--border,#e0e0e0)}
.sg30-stat-val{font-size:20px;font-weight:800;color:var(--primary,#1a7a3a)}
.sg30-stat-label{font-size:10px;color:var(--text-muted,#666);margin-top:2px}
.sg30-progress{height:8px;background:var(--border,#e0e0e0);border-radius:4px;overflow:hidden}
.sg30-progress-fill{height:100%;border-radius:4px;transition:width .5s}
@media(max-width:480px){.sg30-grid-3{grid-template-columns:1fr 1fr}.sg30-panel{margin:10px auto}}
`;
  const style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  // ========== UTILITY ==========
  function mkOverlay(id, title, color, content) {
    let ov = document.getElementById(id);
    if (ov) { ov.classList.add('active'); return ov; }
    ov = document.createElement('div');
    ov.id = id;
    ov.className = 'sg30-overlay active';
    ov.innerHTML = `<div class="sg30-panel"><div class="sg30-panel-head" style="background:${color}"><h3>${title}</h3><button class="sg30-panel-close" aria-label="close">&times;</button></div><div class="sg30-panel-body">${content}</div></div>`;
    document.body.appendChild(ov);
    ov.querySelector('.sg30-panel-close').onclick = () => ov.classList.remove('active');
    ov.addEventListener('click', e => { if (e.target === ov) ov.classList.remove('active'); });
    return ov;
  }

  // ========== 1. SWING SPEED ZONE ANALYZER (14 Clubs x 5 Zones) ==========
  function openSwingSpeed() {
    SFX.speed_open();
    const saved = LS('swingspeed') || {};
    const clubs = ['DR','3W','5W','7W','3I','4I','5I','6I','7I','8I','9I','PW','SW','LW'];
    const zones = ['Sweet','Inside','Outside','Heel','Toe'];
    const zColors = ['#4CAF50','#2196F3','#FF9800','#F44336','#9C27B0'];

    let selClub = 0;
    function render() {
      const data = saved[clubs[selClub]] || zones.map(() => Math.floor(Math.random()*20+60));
      const maxV = Math.max(...data, 1);
      let barsHTML = data.map((v, i) => `
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">
          <div style="width:60px;font-size:11px;font-weight:600;color:var(--text-muted)">${zones[i]}</div>
          <div style="flex:1;height:24px;background:var(--border);border-radius:4px;overflow:hidden;position:relative">
            <div style="width:${(v/maxV*100).toFixed(1)}%;height:100%;background:${zColors[i]};border-radius:4px;transition:width .4s"></div>
            <span style="position:absolute;right:6px;top:3px;font-size:11px;font-weight:700;color:#333">${v} mph</span>
          </div>
        </div>
      `).join('');

      const body = document.querySelector('#sg30-swingspeed .sg30-panel-body');
      if (!body) return;
      body.innerHTML = `
        <div class="sg30-tabs">${clubs.map((c,i) => `<button class="sg30-tab${i===selClub?' active':''}" data-ci="${i}">${c}</button>`).join('')}</div>
        <canvas id="sg30-ssc" width="580" height="340" style="width:100%;border-radius:12px;border:1px solid var(--border)"></canvas>
        <div style="margin-top:14px">${barsHTML}</div>
        <div class="sg30-grid sg30-grid-2" style="margin-top:12px">
          ${zones.map((z, i) => `
            <div style="display:flex;align-items:center;gap:6px">
              <label style="font-size:11px;width:55px;font-weight:600">${z}</label>
              <input type="number" class="sg30-input" style="width:70px;padding:4px 6px" min="0" max="200" value="${data[i]}" data-zi="${i}">
              <span style="font-size:10px;color:var(--text-muted)">mph</span>
            </div>
          `).join('')}
        </div>
        <button class="sg30-btn sg30-btn-primary" style="margin-top:12px;width:100%" id="sg30-ssSave">&#x1F4BE; Save Data</button>
        <div class="sg30-grid sg30-grid-3" style="margin-top:12px">
          <div class="sg30-stat"><div class="sg30-stat-val">${Math.max(...data)}</div><div class="sg30-stat-label">Max Speed</div></div>
          <div class="sg30-stat"><div class="sg30-stat-val">${(data.reduce((a,b)=>a+b,0)/data.length).toFixed(1)}</div><div class="sg30-stat-label">Average</div></div>
          <div class="sg30-stat"><div class="sg30-stat-val">${(Math.max(...data)-Math.min(...data))}</div><div class="sg30-stat-label">Range</div></div>
        </div>
      `;
      drawSpeedCanvas(data);
      body.querySelectorAll('.sg30-tab').forEach(t => t.onclick = () => { selClub = +t.dataset.ci; render(); SFX.speed_open(); });
      body.querySelector('#sg30-ssSave').onclick = () => {
        const vals = [];
        body.querySelectorAll('input[data-zi]').forEach(inp => vals[+inp.dataset.zi] = +inp.value || 0);
        saved[clubs[selClub]] = vals;
        LS('swingspeed', saved);
        SFX.speed_record();
        render();
      };
    }

    function drawSpeedCanvas(data) {
      const c = document.getElementById('sg30-ssc');
      if (!c) return;
      const ctx = c.getContext('2d');
      const W = c.width, H = c.height;
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = isDark ? '#1e1e1e' : '#fafafa';
      ctx.fillRect(0, 0, W, H);

      const cx = W / 2, cy = H / 2, maxR = Math.min(W, H) * 0.38;
      const maxV = Math.max(...data, 1);
      const angles = zones.map((_, i) => (Math.PI * 2 / zones.length) * i - Math.PI / 2);

      for (let r = 1; r <= 4; r++) {
        ctx.beginPath();
        const rad = maxR * r / 4;
        angles.forEach((a, i) => {
          const x = cx + Math.cos(a) * rad, y = cy + Math.sin(a) * rad;
          i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        });
        ctx.closePath();
        ctx.strokeStyle = isDark ? '#333' : '#ddd';
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      ctx.beginPath();
      data.forEach((v, i) => {
        const rad = (v / maxV) * maxR;
        const x = cx + Math.cos(angles[i]) * rad, y = cy + Math.sin(angles[i]) * rad;
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      });
      ctx.closePath();
      ctx.fillStyle = 'rgba(26,122,58,0.25)';
      ctx.fill();
      ctx.strokeStyle = '#1a7a3a';
      ctx.lineWidth = 2.5;
      ctx.stroke();

      data.forEach((v, i) => {
        const rad = (v / maxV) * maxR;
        const x = cx + Math.cos(angles[i]) * rad, y = cy + Math.sin(angles[i]) * rad;
        ctx.beginPath();
        ctx.arc(x, y, 5, 0, Math.PI * 2);
        ctx.fillStyle = zColors[i];
        ctx.fill();
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 2;
        ctx.stroke();

        const lx = cx + Math.cos(angles[i]) * (maxR + 22);
        const ly = cy + Math.sin(angles[i]) * (maxR + 22);
        ctx.fillStyle = isDark ? '#ccc' : '#333';
        ctx.font = 'bold 12px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(zones[i], lx, ly);
      });

      ctx.fillStyle = isDark ? '#ccc' : '#333';
      ctx.font = 'bold 14px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(clubs[selClub] + ' Speed Zone Analysis', cx, 22);
    }

    const content = '<div>Loading...</div>';
    mkOverlay('sg30-swingspeed', '&#x1F3CC;&#xFE0F; Swing Speed Zone Analyzer', 'linear-gradient(135deg,#1a7a3a,#2e7d32)', content);
    render();
  }

  // ========== 2. COURSE MANAGEMENT PLANNER (18-Hole Strategy Map) ==========
  function openCourseMgmt() {
    SFX.course_open();
    const saved = LS('coursemgmt') || {};
    const holes = Array.from({length:18}, (_,i) => ({
      num: i+1,
      par: [4,3,5,4,4,3,4,5,4,4,3,5,4,4,3,4,5,4][i],
      yards: [380,165,520,410,395,185,430,545,360,405,175,510,390,425,195,440,530,375][i],
      strategy: saved[i+1]?.strategy || '',
      club: saved[i+1]?.club || '',
      risk: saved[i+1]?.risk || 3
    }));
    let selHole = 0;

    function render() {
      const h = holes[selHole];
      const body = document.querySelector('#sg30-coursemgmt .sg30-panel-body');
      if (!body) return;
      body.innerHTML = `
        <div class="sg30-tabs" style="flex-wrap:wrap">${holes.map((ho,i) =>
          `<button class="sg30-tab${i===selHole?' active':''}" data-hi="${i}" style="min-width:32px;padding:5px 8px;font-size:11px">${ho.num}</button>`
        ).join('')}</div>
        <canvas id="sg30-cmc" width="600" height="360" style="width:100%;border-radius:12px;border:1px solid var(--border)"></canvas>
        <div class="sg30-grid sg30-grid-3" style="margin-top:12px">
          <div class="sg30-stat"><div class="sg30-stat-val">H${h.num}</div><div class="sg30-stat-label">Hole</div></div>
          <div class="sg30-stat"><div class="sg30-stat-val">Par ${h.par}</div><div class="sg30-stat-label">Par</div></div>
          <div class="sg30-stat"><div class="sg30-stat-val">${h.yards}y</div><div class="sg30-stat-label">Distance</div></div>
        </div>
        <div style="margin-top:12px">
          <label style="font-size:12px;font-weight:600;display:block;margin-bottom:4px">&#x1F3AF; Tee Shot Club</label>
          <select class="sg30-input" id="sg30-cmClub" style="margin-bottom:10px">
            <option value="">Select club...</option>
            ${['DR','3W','5W','7W','3I','4I','5I','6I','7I','8I','9I','PW','SW','LW'].map(c => `<option value="${c}"${h.club===c?' selected':''}>${c}</option>`).join('')}
          </select>
          <label style="font-size:12px;font-weight:600;display:block;margin-bottom:4px">&#x1F4DD; Strategy Note</label>
          <textarea class="sg30-input" id="sg30-cmStrat" rows="3" placeholder="e.g. Aim left center, avoid right bunker...">${h.strategy}</textarea>
          <div style="margin-top:10px">
            <label style="font-size:12px;font-weight:600">&#x26A0;&#xFE0F; Risk Level: <span id="sg30-riskVal">${h.risk}</span>/5</label>
            <input type="range" class="sg30-slider" min="1" max="5" value="${h.risk}" id="sg30-cmRisk">
          </div>
          <button class="sg30-btn sg30-btn-primary" style="margin-top:10px;width:100%" id="sg30-cmSave">&#x1F4BE; Save Strategy</button>
        </div>
      `;
      drawCourseCanvas(holes);
      body.querySelectorAll('.sg30-tab').forEach(t => t.onclick = () => { selHole = +t.dataset.hi; render(); SFX.course_open(); });
      body.querySelector('#sg30-cmRisk').oninput = e => { body.querySelector('#sg30-riskVal').textContent = e.target.value; };
      body.querySelector('#sg30-cmSave').onclick = () => {
        h.strategy = body.querySelector('#sg30-cmStrat').value;
        h.club = body.querySelector('#sg30-cmClub').value;
        h.risk = +body.querySelector('#sg30-cmRisk').value;
        saved[h.num] = { strategy: h.strategy, club: h.club, risk: h.risk };
        LS('coursemgmt', saved);
        SFX.course_plan();
        render();
      };
    }

    function drawCourseCanvas(holes) {
      const c = document.getElementById('sg30-cmc');
      if (!c) return;
      const ctx = c.getContext('2d');
      const W = c.width, H = c.height;
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      ctx.clearRect(0, 0, W, H);

      const grd = ctx.createLinearGradient(0, 0, 0, H);
      grd.addColorStop(0, isDark ? '#0a3015' : '#e8f5e9');
      grd.addColorStop(1, isDark ? '#1e1e1e' : '#fff');
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, W, H);

      const barW = (W - 60) / 18;
      const maxY = 560;
      holes.forEach((h, i) => {
        const x = 40 + i * barW;
        const bh = (h.yards / maxY) * (H - 80);
        const riskColors = ['#4CAF50','#8BC34A','#FFC107','#FF9800','#F44336'];
        ctx.fillStyle = riskColors[(h.risk || 1) - 1];
        ctx.fillRect(x + 2, H - 40 - bh, barW - 4, bh);
        ctx.fillStyle = isDark ? '#aaa' : '#333';
        ctx.font = 'bold 9px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(h.num.toString(), x + barW / 2, H - 26);
        ctx.font = '8px sans-serif';
        ctx.fillText(h.yards + 'y', x + barW / 2, H - 40 - bh - 4);

        if (i === selHole) {
          ctx.strokeStyle = '#1a7a3a';
          ctx.lineWidth = 2;
          ctx.strokeRect(x, H - 42 - bh, barW, bh + 4);
        }
      });

      ctx.fillStyle = isDark ? '#ccc' : '#333';
      ctx.font = 'bold 13px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('18-Hole Course Strategy Map', W / 2, 20);
      ctx.font = '10px sans-serif';
      ctx.fillStyle = isDark ? '#888' : '#999';
      ctx.fillText('Bar height = distance | Color = risk level (green=safe, red=aggressive)', W / 2, 36);
    }

    const content = '<div>Loading...</div>';
    mkOverlay('sg30-coursemgmt', '&#x1F5FA;&#xFE0F; Course Management Planner', 'linear-gradient(135deg,#1565c0,#1976d2)', content);
    render();
  }

  // ========== 3. PUTTING GREEN BREAK SIMULATOR (3D Slope Canvas) ==========
  function openPuttBreak() {
    SFX.putt3d_open();
    let slope = 3, speed = 10, dist = 15, aim = 0;
    const saved = LS('puttbreak') || { attempts: 0, holes: 0 };

    function render() {
      const body = document.querySelector('#sg30-puttbreak .sg30-panel-body');
      if (!body) return;
      const breakAmt = (slope * 0.8 * (dist / 10)).toFixed(1);
      const aimPt = (slope > 0 ? 'left' : slope < 0 ? 'right' : 'center');
      body.innerHTML = `
        <canvas id="sg30-pbc" width="600" height="380" style="width:100%;border-radius:12px;border:1px solid var(--border);cursor:crosshair"></canvas>
        <div class="sg30-grid sg30-grid-2" style="margin-top:12px">
          <div>
            <label style="font-size:11px;font-weight:600">&#x26F3; Distance: <span id="sg30-distV">${dist}</span>ft</label>
            <input type="range" class="sg30-slider" min="3" max="60" value="${dist}" id="sg30-pbDist">
          </div>
          <div>
            <label style="font-size:11px;font-weight:600">&#x1F4D0; Slope: <span id="sg30-slopeV">${slope}</span>%</label>
            <input type="range" class="sg30-slider" min="-8" max="8" value="${slope}" id="sg30-pbSlope">
          </div>
          <div>
            <label style="font-size:11px;font-weight:600">&#x26A1; Green Speed: <span id="sg30-speedV">${speed}</span></label>
            <input type="range" class="sg30-slider" min="6" max="14" value="${speed}" id="sg30-pbSpeed">
          </div>
          <div>
            <label style="font-size:11px;font-weight:600">&#x1F3AF; Aim Offset: <span id="sg30-aimV">${aim}</span>&deg;</label>
            <input type="range" class="sg30-slider" min="-30" max="30" value="${aim}" id="sg30-pbAim">
          </div>
        </div>
        <div class="sg30-grid sg30-grid-3" style="margin-top:12px">
          <div class="sg30-stat"><div class="sg30-stat-val">${breakAmt}&quot;</div><div class="sg30-stat-label">Break</div></div>
          <div class="sg30-stat"><div class="sg30-stat-val">${aimPt}</div><div class="sg30-stat-label">Aim Point</div></div>
          <div class="sg30-stat"><div class="sg30-stat-val">${speed >= 11 ? 'Fast' : speed >= 8 ? 'Medium' : 'Slow'}</div><div class="sg30-stat-label">Pace</div></div>
        </div>
        <button class="sg30-btn sg30-btn-primary" style="margin-top:10px;width:100%" id="sg30-pbPutt">&#x26F3; Simulate Putt</button>
        <div id="sg30-pbResult" style="margin-top:10px;text-align:center;font-size:13px;color:var(--text-muted)"></div>
        <div class="sg30-grid sg30-grid-2" style="margin-top:10px">
          <div class="sg30-stat"><div class="sg30-stat-val">${saved.attempts}</div><div class="sg30-stat-label">Attempts</div></div>
          <div class="sg30-stat"><div class="sg30-stat-val">${saved.holes}</div><div class="sg30-stat-label">Holed</div></div>
        </div>
      `;
      drawPuttCanvas();
      const sliders = [
        ['sg30-pbDist', 'sg30-distV', v => { dist = +v; }],
        ['sg30-pbSlope', 'sg30-slopeV', v => { slope = +v; }],
        ['sg30-pbSpeed', 'sg30-speedV', v => { speed = +v; }],
        ['sg30-pbAim', 'sg30-aimV', v => { aim = +v; }]
      ];
      sliders.forEach(([id, vid, fn]) => {
        const el = body.querySelector('#' + id);
        if (el) el.oninput = e => { fn(e.target.value); body.querySelector('#' + vid).textContent = e.target.value; drawPuttCanvas(); };
      });
      body.querySelector('#sg30-pbPutt').onclick = () => {
        saved.attempts++;
        const idealAim = Math.atan2(slope * 0.8, dist) * (180 / Math.PI);
        const diff = Math.abs(aim - idealAim);
        const holed = diff < (3 + (14 - speed) * 0.5);
        if (holed) { saved.holes++; SFX.putt3d_hole(); }
        else { SFX.putt3d_roll(); }
        LS('puttbreak', saved);
        const res = body.querySelector('#sg30-pbResult');
        if (res) res.innerHTML = holed
          ? '<span style="color:#4CAF50;font-weight:700">&#x26F3; HOLED! Great read!</span>'
          : '<span style="color:#F44336;font-weight:700">&#x274C; Missed! Ideal aim was ' + idealAim.toFixed(1) + '&deg;</span>';
        render();
      };
    }

    function drawPuttCanvas() {
      const c = document.getElementById('sg30-pbc');
      if (!c) return;
      const ctx = c.getContext('2d');
      const W = c.width, H = c.height;
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      ctx.clearRect(0, 0, W, H);

      const grd = ctx.createLinearGradient(0, 0, W, 0);
      const baseG = isDark ? 30 : 100;
      for (let i = 0; i <= 10; i++) {
        const intensity = baseG + slope * (i - 5) * (isDark ? 2 : 5);
        grd.addColorStop(i / 10, `rgb(${isDark?20:40},${Math.max(40,Math.min(200,intensity))},${isDark?20:30})`);
      }
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, W, H);

      for (let i = 0; i < 12; i++) {
        ctx.beginPath();
        ctx.moveTo(0, 30 + i * (H / 12));
        for (let x = 0; x < W; x += 4) {
          ctx.lineTo(x, 30 + i * (H / 12) + Math.sin(x * 0.02 + slope * 0.5) * (Math.abs(slope) * 2));
        }
        ctx.strokeStyle = isDark ? 'rgba(100,200,100,0.15)' : 'rgba(255,255,255,0.2)';
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      const holeX = W / 2, holeY = 60;
      ctx.beginPath();
      ctx.arc(holeX, holeY, 8, 0, Math.PI * 2);
      ctx.fillStyle = '#111';
      ctx.fill();
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 2;
      ctx.stroke();

      const ballX = W / 2, ballY = H - 50;
      ctx.beginPath();
      ctx.arc(ballX, ballY, 6, 0, Math.PI * 2);
      ctx.fillStyle = '#fff';
      ctx.fill();
      ctx.strokeStyle = '#ccc';
      ctx.lineWidth = 1;
      ctx.stroke();

      const aimRad = aim * Math.PI / 180;
      const lineLen = (dist / 60) * (H - 120);
      const endX = ballX + Math.sin(aimRad) * lineLen;
      const endY = ballY - Math.cos(aimRad) * lineLen;
      ctx.beginPath();
      ctx.setLineDash([6, 4]);
      ctx.moveTo(ballX, ballY);
      ctx.lineTo(endX, endY);
      ctx.strokeStyle = '#FFD700';
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.setLineDash([]);

      const breakPx = slope * 3;
      ctx.beginPath();
      ctx.moveTo(ballX, ballY);
      ctx.quadraticCurveTo(ballX + breakPx * 3, (ballY + holeY) / 2, holeX, holeY);
      ctx.strokeStyle = 'rgba(255,107,53,0.7)';
      ctx.lineWidth = 2;
      ctx.setLineDash([4, 3]);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle = isDark ? '#ccc' : '#fff';
      ctx.font = 'bold 13px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Putting Break Simulator', W / 2, 22);
      ctx.font = '10px sans-serif';
      ctx.fillText(`${dist}ft | Slope ${slope}% | Speed ${speed} | Break ${(slope * 0.8 * dist / 10).toFixed(1)}"`, W / 2, H - 14);
    }

    const content = '<div>Loading...</div>';
    mkOverlay('sg30-puttbreak', '&#x26F3; Putting Break Simulator', 'linear-gradient(135deg,#2e7d32,#388e3c)', content);
    render();
  }

  // ========== 4. ROUND CONDITION OPTIMIZER (6-Axis Radar) ==========
  function openConditionOpt() {
    SFX.condition_opt();
    const axes = ['Physical','Mental','Weather','Equipment','Course','Rest'];
    const saved = LS('condopt') || {};
    let vals = saved.vals || [7,6,8,7,5,8];

    function render() {
      const total = vals.reduce((a,b) => a+b, 0);
      const maxTotal = axes.length * 10;
      const pct = (total / maxTotal * 100).toFixed(0);
      const grade = pct >= 90 ? 'S' : pct >= 80 ? 'A' : pct >= 70 ? 'B' : pct >= 60 ? 'C' : 'D';
      const gradeColor = {S:'#FFD700',A:'#4CAF50',B:'#2196F3',C:'#FF9800',D:'#F44336'}[grade];
      const body = document.querySelector('#sg30-condopt .sg30-panel-body');
      if (!body) return;
      body.innerHTML = `
        <canvas id="sg30-coc" width="560" height="360" style="width:100%;border-radius:12px;border:1px solid var(--border)"></canvas>
        <div style="text-align:center;margin-top:12px">
          <span style="font-size:36px;font-weight:900;color:${gradeColor}">${grade}</span>
          <div style="font-size:12px;color:var(--text-muted)">Overall Readiness ${pct}%</div>
        </div>
        <div style="margin-top:14px">
          ${axes.map((a, i) => `
            <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">
              <div style="width:70px;font-size:11px;font-weight:600">${a}</div>
              <input type="range" class="sg30-slider" min="1" max="10" value="${vals[i]}" data-ai="${i}" style="flex:1">
              <span style="font-size:12px;font-weight:700;width:24px;text-align:right" data-av="${i}">${vals[i]}</span>
            </div>
          `).join('')}
        </div>
        <button class="sg30-btn sg30-btn-primary" style="margin-top:10px;width:100%" id="sg30-coSave">&#x1F4BE; Save Assessment</button>
        <div style="margin-top:14px;padding:12px;background:var(--bg);border-radius:10px;border:1px solid var(--border)">
          <div style="font-weight:700;font-size:13px;margin-bottom:6px">&#x1F4A1; Recommendations</div>
          ${vals.map((v, i) => v <= 5 ? `<div style="font-size:11px;color:var(--text-muted);margin-bottom:4px">&#x26A0;&#xFE0F; <b>${axes[i]}</b>: ${
            ['Stretch + hydrate before round','Practice breathing exercises','Check forecast, adjust strategy','Review equipment setup','Study course layout beforehand','Get 7+ hours sleep tonight'][i]
          }</div>` : '').join('')}
        </div>
      `;
      drawCondCanvas();
      body.querySelectorAll('input[data-ai]').forEach(inp => {
        inp.oninput = e => {
          vals[+inp.dataset.ai] = +e.target.value;
          body.querySelector(`[data-av="${inp.dataset.ai}"]`).textContent = e.target.value;
          drawCondCanvas();
        };
      });
      body.querySelector('#sg30-coSave').onclick = () => {
        LS('condopt', { vals: [...vals], date: new Date().toISOString().slice(0,10) });
        SFX.condition_score();
        render();
      };
    }

    function drawCondCanvas() {
      const c = document.getElementById('sg30-coc');
      if (!c) return;
      const ctx = c.getContext('2d');
      const W = c.width, H = c.height;
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = isDark ? '#1e1e1e' : '#fafafa';
      ctx.fillRect(0, 0, W, H);

      const cx = W / 2, cy = H / 2 + 10, maxR = Math.min(W, H) * 0.36;
      const n = axes.length;
      const angles = axes.map((_, i) => (Math.PI * 2 / n) * i - Math.PI / 2);

      for (let r = 2; r <= 10; r += 2) {
        ctx.beginPath();
        angles.forEach((a, i) => {
          const rad = maxR * r / 10;
          const x = cx + Math.cos(a) * rad, y = cy + Math.sin(a) * rad;
          i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        });
        ctx.closePath();
        ctx.strokeStyle = isDark ? '#333' : '#e0e0e0';
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      angles.forEach((a, i) => {
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + Math.cos(a) * maxR, cy + Math.sin(a) * maxR);
        ctx.strokeStyle = isDark ? '#444' : '#ccc';
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      ctx.beginPath();
      vals.forEach((v, i) => {
        const rad = (v / 10) * maxR;
        const x = cx + Math.cos(angles[i]) * rad, y = cy + Math.sin(angles[i]) * rad;
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      });
      ctx.closePath();
      ctx.fillStyle = 'rgba(26,122,58,0.2)';
      ctx.fill();
      ctx.strokeStyle = '#1a7a3a';
      ctx.lineWidth = 2.5;
      ctx.stroke();

      vals.forEach((v, i) => {
        const rad = (v / 10) * maxR;
        const x = cx + Math.cos(angles[i]) * rad, y = cy + Math.sin(angles[i]) * rad;
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fillStyle = v >= 7 ? '#4CAF50' : v >= 4 ? '#FF9800' : '#F44336';
        ctx.fill();

        const lx = cx + Math.cos(angles[i]) * (maxR + 20);
        const ly = cy + Math.sin(angles[i]) * (maxR + 20);
        ctx.fillStyle = isDark ? '#ccc' : '#333';
        ctx.font = 'bold 11px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(`${axes[i]} (${v})`, lx, ly);
      });

      ctx.fillStyle = isDark ? '#ccc' : '#333';
      ctx.font = 'bold 13px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Round Condition Radar', cx, 18);
    }

    mkOverlay('sg30-condopt', '&#x1F4CA; Round Condition Optimizer', 'linear-gradient(135deg,#e65100,#ff6d00)', content);
    var content = '<div>Loading...</div>';
    render();
  }

  // ========== 5. GOLF COURSE WEATHER COMPARE (8 Courses x 3 Days) ==========
  function openWeatherCompare() {
    SFX.weather_cmp();
    const courses = [
      { name: 'Sky72 해늘', region: '인천', lat: 37.38, lon: 126.56 },
      { name: '나인브릿지', region: '제주', lat: 33.38, lon: 126.83 },
      { name: '핀크스', region: '제주', lat: 33.43, lon: 126.84 },
      { name: '해슬리 나인', region: '이천', lat: 37.27, lon: 127.43 },
      { name: '서울CC', region: '서울', lat: 37.45, lon: 127.05 },
      { name: '블랙스톤', region: '이천', lat: 37.28, lon: 127.38 },
      { name: '사우스스프링스', region: '이천', lat: 37.16, lon: 127.36 },
      { name: '잭니클라우스GC', region: '인천', lat: 37.38, lon: 126.55 }
    ];
    const days = ['Today','Tomorrow','Day 3'];

    function genWeather() {
      return courses.map(c => ({
        name: c.name, region: c.region,
        days: days.map((_, di) => ({
          temp: Math.round(22 + Math.random() * 12 - di * 2),
          wind: Math.round(Math.random() * 20 + 3),
          rain: Math.round(Math.random() * 60),
          humidity: Math.round(50 + Math.random() * 30)
        }))
      }));
    }

    const weatherData = LS('weathercmp') || genWeather();
    let selDay = 0;

    function render() {
      const body = document.querySelector('#sg30-weathercmp .sg30-panel-body');
      if (!body) return;
      body.innerHTML = `
        <div class="sg30-tabs">${days.map((d,i) => `<button class="sg30-tab${i===selDay?' active':''}" data-di="${i}">${d}</button>`).join('')}</div>
        <canvas id="sg30-wcc" width="600" height="360" style="width:100%;border-radius:12px;border:1px solid var(--border)"></canvas>
        <div style="margin-top:12px">
          ${weatherData.map((c, ci) => {
            const d = c.days[selDay];
            const playability = Math.max(0, 100 - d.rain - d.wind * 1.5 - Math.abs(d.temp - 24) * 2).toFixed(0);
            return `<div class="sg30-card" style="display:flex;align-items:center;gap:10px;padding:10px">
              <div style="flex:1">
                <div style="font-weight:700;font-size:13px">${c.name} <span class="sg30-badge sg30-badge-blue">${c.region}</span></div>
                <div style="font-size:11px;color:var(--text-muted);margin-top:2px">${d.temp}&deg;C | Wind ${d.wind}km/h | Rain ${d.rain}% | Humidity ${d.humidity}%</div>
              </div>
              <div style="text-align:center">
                <div style="font-size:18px;font-weight:800;color:${+playability>=70?'#4CAF50':+playability>=40?'#FF9800':'#F44336'}">${playability}%</div>
                <div style="font-size:9px;color:var(--text-muted)">Playability</div>
              </div>
            </div>`;
          }).join('')}
        </div>
        <button class="sg30-btn sg30-btn-secondary" style="margin-top:10px;width:100%" id="sg30-wcRefresh">&#x1F504; Refresh Weather</button>
      `;
      drawWeatherCanvas();
      body.querySelectorAll('.sg30-tab').forEach(t => t.onclick = () => { selDay = +t.dataset.di; render(); SFX.weather_cmp(); });
      body.querySelector('#sg30-wcRefresh').onclick = () => {
        const newData = genWeather();
        weatherData.splice(0, weatherData.length, ...newData);
        LS('weathercmp', newData);
        SFX.weather_refresh();
        render();
      };
    }

    function drawWeatherCanvas() {
      const c = document.getElementById('sg30-wcc');
      if (!c) return;
      const ctx = c.getContext('2d');
      const W = c.width, H = c.height;
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = isDark ? '#1e1e1e' : '#fafafa';
      ctx.fillRect(0, 0, W, H);

      const barW = (W - 80) / weatherData.length;
      const metrics = ['temp', 'wind', 'rain'];
      const mColors = ['#FF6B35', '#2196F3', '#4CAF50'];
      const mLabels = ['Temp(&deg;C)', 'Wind(km/h)', 'Rain(%)'];
      const maxVals = [40, 30, 100];

      weatherData.forEach((c, ci) => {
        const x = 50 + ci * barW;
        metrics.forEach((m, mi) => {
          const val = c.days[selDay][m];
          const bh = (val / maxVals[mi]) * (H - 100);
          const bw = (barW - 8) / 3;
          ctx.fillStyle = mColors[mi];
          ctx.globalAlpha = 0.8;
          ctx.fillRect(x + mi * bw + 2, H - 50 - bh, bw - 2, bh);
          ctx.globalAlpha = 1;
          ctx.fillStyle = isDark ? '#ccc' : '#333';
          ctx.font = '8px sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText(val.toString(), x + mi * bw + bw / 2, H - 52 - bh);
        });
        ctx.fillStyle = isDark ? '#aaa' : '#555';
        ctx.font = '9px sans-serif';
        ctx.textAlign = 'center';
        ctx.save();
        ctx.translate(x + barW / 2, H - 10);
        ctx.rotate(-0.3);
        ctx.fillText(c.name.slice(0, 6), 0, 0);
        ctx.restore();
      });

      metrics.forEach((m, mi) => {
        ctx.fillStyle = mColors[mi];
        ctx.fillRect(W - 130, 12 + mi * 16, 10, 10);
        ctx.fillStyle = isDark ? '#ccc' : '#333';
        ctx.font = '10px sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText(['Temperature', 'Wind', 'Rain%'][mi], W - 115, 21 + mi * 16);
      });

      ctx.fillStyle = isDark ? '#ccc' : '#333';
      ctx.font = 'bold 13px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(`Course Weather Compare - ${days[selDay]}`, W / 2, 20);
    }

    mkOverlay('sg30-weathercmp', '&#x1F326;&#xFE0F; Course Weather Compare', 'linear-gradient(135deg,#0277bd,#0288d1)', '<div>Loading...</div>');
    render();
  }

  // ========== 6. PRO SHOT LIBRARY (10 Pros x 12 Shots Canvas) ==========
  function openProShots() {
    SFX.pro_open();
    const pros = [
      { name: 'Tiger Woods', flag: '&#x1F1FA;&#x1F1F8;', style: 'Power Fade', majors: 15 },
      { name: 'Rory McIlroy', flag: '&#x1F1EC;&#x1F1E7;', style: 'Power Draw', majors: 4 },
      { name: 'Jon Rahm', flag: '&#x1F1EA;&#x1F1F8;', style: 'Controlled Fade', majors: 2 },
      { name: 'Scottie Scheffler', flag: '&#x1F1FA;&#x1F1F8;', style: 'Straight', majors: 2 },
      { name: 'Brooks Koepka', flag: '&#x1F1FA;&#x1F1F8;', style: 'Low Stinger', majors: 5 },
      { name: 'Dustin Johnson', flag: '&#x1F1FA;&#x1F1F8;', style: 'High Fade', majors: 2 },
      { name: 'Justin Thomas', flag: '&#x1F1FA;&#x1F1F8;', style: 'Precision', majors: 2 },
      { name: 'Collin Morikawa', flag: '&#x1F1FA;&#x1F1F8;', style: 'Iron Master', majors: 2 },
      { name: 'Viktor Hovland', flag: '&#x1F1F3;&#x1F1F4;', style: 'Stock Draw', majors: 0 },
      { name: 'Xander Schauffele', flag: '&#x1F1FA;&#x1F1F8;', style: 'All-Around', majors: 2 }
    ];
    const shots = ['Drive','3W Fairway','Long Iron','Mid Iron','Short Iron','Pitch','Chip','Flop','Bunker','Putt','Stinger','Punch'];
    let selPro = 0;

    function render() {
      const p = pros[selPro];
      const body = document.querySelector('#sg30-proshots .sg30-panel-body');
      if (!body) return;
      const ratings = shots.map(() => Math.floor(Math.random() * 3 + 7));
      body.innerHTML = `
        <div class="sg30-tabs">${pros.map((pr,i) => `<button class="sg30-tab${i===selPro?' active':''}" data-pi="${i}" style="font-size:10px;padding:5px 8px">${pr.name.split(' ')[1]||pr.name}</button>`).join('')}</div>
        <div style="text-align:center;padding:10px;background:var(--bg);border-radius:12px;margin-bottom:12px;border:1px solid var(--border)">
          <div style="font-size:24px;font-weight:900">${p.flag} ${p.name}</div>
          <div style="font-size:12px;color:var(--text-muted);margin-top:4px">Style: <b>${p.style}</b> | Majors: <b>${p.majors}</b></div>
        </div>
        <canvas id="sg30-psc" width="580" height="340" style="width:100%;border-radius:12px;border:1px solid var(--border)"></canvas>
        <div style="margin-top:12px">
          ${shots.map((s, i) => {
            const r = ratings[i];
            return `<div style="display:flex;align-items:center;gap:8px;margin-bottom:6px">
              <div style="width:70px;font-size:11px;font-weight:600">${s}</div>
              <div class="sg30-progress" style="flex:1"><div class="sg30-progress-fill" style="width:${r*10}%;background:${r>=9?'#4CAF50':r>=7?'#2196F3':'#FF9800'}"></div></div>
              <span style="font-size:11px;font-weight:700;width:24px">${r}/10</span>
            </div>`;
          }).join('')}
        </div>
      `;
      drawProCanvas(ratings);
      body.querySelectorAll('.sg30-tab').forEach(t => t.onclick = () => { selPro = +t.dataset.pi; SFX.pro_select(); render(); });
    }

    function drawProCanvas(ratings) {
      const c = document.getElementById('sg30-psc');
      if (!c) return;
      const ctx = c.getContext('2d');
      const W = c.width, H = c.height;
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = isDark ? '#1e1e1e' : '#fafafa';
      ctx.fillRect(0, 0, W, H);

      const barW = (W - 60) / shots.length;
      ratings.forEach((r, i) => {
        const x = 40 + i * barW;
        const bh = (r / 10) * (H - 80);
        const hue = (r - 5) * 24;
        ctx.fillStyle = `hsl(${hue}, 70%, 50%)`;
        ctx.fillRect(x + 3, H - 40 - bh, barW - 6, bh);
        ctx.fillStyle = isDark ? '#aaa' : '#555';
        ctx.font = '8px sans-serif';
        ctx.textAlign = 'center';
        ctx.save();
        ctx.translate(x + barW / 2, H - 24);
        ctx.rotate(-0.5);
        ctx.fillText(shots[i], 0, 0);
        ctx.restore();
        ctx.fillStyle = isDark ? '#ccc' : '#333';
        ctx.font = 'bold 10px sans-serif';
        ctx.fillText(r.toString(), x + barW / 2, H - 44 - bh);
      });

      ctx.fillStyle = isDark ? '#ccc' : '#333';
      ctx.font = 'bold 13px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(`${pros[selPro].name} - Shot Ratings`, W / 2, 20);
    }

    mkOverlay('sg30-proshots', '&#x1F3C6; Pro Shot Library', 'linear-gradient(135deg,#6a1b9a,#8e24aa)', '<div>Loading...</div>');
    render();
  }

  // ========== 7. CLUBHEAD SPEED TRACKER (Line Canvas 20 Sessions) ==========
  function openHeadSpeed() {
    SFX.headspd_open();
    const saved = LS('headspeed') || { sessions: [] };

    function render() {
      const body = document.querySelector('#sg30-headspeed .sg30-panel-body');
      if (!body) return;
      const sessions = saved.sessions.slice(-20);
      const avg = sessions.length ? (sessions.reduce((a,b) => a + b.speed, 0) / sessions.length).toFixed(1) : '0';
      const max = sessions.length ? Math.max(...sessions.map(s => s.speed)) : 0;
      const trend = sessions.length >= 2 ? (sessions[sessions.length-1].speed - sessions[sessions.length-2].speed).toFixed(1) : '0';

      body.innerHTML = `
        <canvas id="sg30-hsc" width="580" height="320" style="width:100%;border-radius:12px;border:1px solid var(--border)"></canvas>
        <div class="sg30-grid sg30-grid-3" style="margin-top:12px">
          <div class="sg30-stat"><div class="sg30-stat-val">${avg}</div><div class="sg30-stat-label">Avg mph</div></div>
          <div class="sg30-stat"><div class="sg30-stat-val">${max}</div><div class="sg30-stat-label">Max mph</div></div>
          <div class="sg30-stat"><div class="sg30-stat-val" style="color:${+trend>=0?'#4CAF50':'#F44336'}">${+trend>=0?'+':''}${trend}</div><div class="sg30-stat-label">Trend</div></div>
        </div>
        <div style="margin-top:14px;display:flex;gap:8px;align-items:end">
          <div style="flex:1">
            <label style="font-size:11px;font-weight:600">Speed (mph)</label>
            <input type="number" class="sg30-input" id="sg30-hsSpeed" min="50" max="180" placeholder="e.g. 105">
          </div>
          <div style="flex:1">
            <label style="font-size:11px;font-weight:600">Club</label>
            <select class="sg30-input" id="sg30-hsClub">
              <option value="DR">Driver</option><option value="3W">3W</option><option value="7I">7I</option><option value="PW">PW</option>
            </select>
          </div>
          <button class="sg30-btn sg30-btn-primary" id="sg30-hsAdd" style="padding:8px 14px">+ Add</button>
        </div>
        <div style="margin-top:12px;max-height:200px;overflow-y:auto">
          ${sessions.slice().reverse().map((s, i) => `
            <div style="display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px solid var(--border);font-size:12px">
              <span>Session ${sessions.length - i}</span>
              <span><b>${s.speed} mph</b> (${s.club})</span>
            </div>
          `).join('')}
        </div>
      `;
      drawHeadSpeedCanvas(sessions);
      body.querySelector('#sg30-hsAdd').onclick = () => {
        const spd = +body.querySelector('#sg30-hsSpeed').value;
        const club = body.querySelector('#sg30-hsClub').value;
        if (!spd || spd < 50 || spd > 180) return;
        saved.sessions.push({ speed: spd, club: club });
        LS('headspeed', saved);
        SFX.headspd_record();
        render();
      };
    }

    function drawHeadSpeedCanvas(sessions) {
      const c = document.getElementById('sg30-hsc');
      if (!c) return;
      const ctx = c.getContext('2d');
      const W = c.width, H = c.height;
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = isDark ? '#1e1e1e' : '#fafafa';
      ctx.fillRect(0, 0, W, H);

      if (sessions.length < 2) {
        ctx.fillStyle = isDark ? '#888' : '#999';
        ctx.font = '14px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('Add at least 2 sessions to see trend chart', W / 2, H / 2);
        return;
      }

      const speeds = sessions.map(s => s.speed);
      const minS = Math.min(...speeds) - 5;
      const maxS = Math.max(...speeds) + 5;
      const padL = 50, padR = 20, padT = 40, padB = 40;
      const plotW = W - padL - padR, plotH = H - padT - padB;

      for (let i = 0; i <= 4; i++) {
        const y = padT + (plotH / 4) * i;
        const val = maxS - ((maxS - minS) / 4) * i;
        ctx.strokeStyle = isDark ? '#333' : '#e0e0e0';
        ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(padL, y); ctx.lineTo(W - padR, y); ctx.stroke();
        ctx.fillStyle = isDark ? '#888' : '#999';
        ctx.font = '10px sans-serif';
        ctx.textAlign = 'right';
        ctx.fillText(val.toFixed(0), padL - 6, y + 4);
      }

      ctx.beginPath();
      sessions.forEach((s, i) => {
        const x = padL + (i / (sessions.length - 1)) * plotW;
        const y = padT + ((maxS - s.speed) / (maxS - minS)) * plotH;
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      });
      ctx.strokeStyle = '#1a7a3a';
      ctx.lineWidth = 2.5;
      ctx.stroke();

      sessions.forEach((s, i) => {
        const x = padL + (i / (sessions.length - 1)) * plotW;
        const y = padT + ((maxS - s.speed) / (maxS - minS)) * plotH;
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fillStyle = '#1a7a3a';
        ctx.fill();
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 2;
        ctx.stroke();
      });

      ctx.fillStyle = isDark ? '#ccc' : '#333';
      ctx.font = 'bold 13px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Clubhead Speed Trend', W / 2, 20);
    }

    mkOverlay('sg30-headspeed', '&#x1F4C8; Clubhead Speed Tracker', 'linear-gradient(135deg,#1a7a3a,#4CAF50)', '<div>Loading...</div>');
    render();
  }

  // ========== 8. SEASON CHALLENGE BOARD (12 Missions) ==========
  function openChallenges() {
    SFX.challenge_open();
    const missions = [
      { id: 'eagle', title: 'Eagle Hunter', desc: 'Make 3 eagles in a season', target: 3, icon: '&#x1F985;' },
      { id: 'par3', title: 'Par 3 Master', desc: 'Score par or better on 20 par-3 holes', target: 20, icon: '&#x26F3;' },
      { id: 'fairway', title: 'Fairway Finder', desc: 'Hit 70%+ fairways in 5 rounds', target: 5, icon: '&#x1F3AF;' },
      { id: 'putt30', title: '30-Putt Round', desc: 'Complete a round with 30 or fewer putts', target: 1, icon: '&#x1F3CC;&#xFE0F;' },
      { id: 'sub80', title: 'Break 80', desc: 'Score under 80 for 18 holes', target: 1, icon: '&#x1F525;' },
      { id: 'birdie5', title: 'Birdie Streak', desc: '5 birdies in a single round', target: 1, icon: '&#x1F426;' },
      { id: 'course10', title: 'Course Explorer', desc: 'Play 10 different courses', target: 10, icon: '&#x1F5FA;&#xFE0F;' },
      { id: 'practice20', title: 'Range Rat', desc: 'Log 20 practice sessions', target: 20, icon: '&#x1F3CB;&#xFE0F;' },
      { id: 'gir50', title: 'GIR Machine', desc: 'Hit 50%+ GIR in 3 rounds', target: 3, icon: '&#x2705;' },
      { id: 'mental', title: 'Zen Golfer', desc: 'Complete 10 mental training sessions', target: 10, icon: '&#x1F9D8;' },
      { id: 'weather', title: 'All-Weather', desc: 'Play rounds in rain, wind, and sun', target: 3, icon: '&#x1F326;&#xFE0F;' },
      { id: 'bogey0', title: 'Bogey Free 9', desc: 'Play 9 holes without a bogey', target: 1, icon: '&#x1F31F;' }
    ];
    const saved = LS('challenges') || {};

    function render() {
      const body = document.querySelector('#sg30-challenges .sg30-panel-body');
      if (!body) return;
      const completed = missions.filter(m => (saved[m.id] || 0) >= m.target).length;
      body.innerHTML = `
        <div style="text-align:center;margin-bottom:14px">
          <div class="sg30-progress" style="height:12px;margin-bottom:6px"><div class="sg30-progress-fill" style="width:${(completed/missions.length*100).toFixed(0)}%;background:linear-gradient(90deg,#1a7a3a,#4CAF50)"></div></div>
          <span style="font-size:12px;font-weight:700;color:var(--primary)">${completed}/${missions.length} Missions Complete</span>
        </div>
        <canvas id="sg30-chc" width="580" height="300" style="width:100%;border-radius:12px;border:1px solid var(--border)"></canvas>
        <div style="margin-top:12px">
          ${missions.map(m => {
            const progress = saved[m.id] || 0;
            const done = progress >= m.target;
            const pct = Math.min(100, (progress / m.target * 100)).toFixed(0);
            return `<div class="sg30-card" style="opacity:${done ? 0.7 : 1}">
              <div class="sg30-card-title">${m.icon} ${m.title} ${done ? '<span class="sg30-badge sg30-badge-green">DONE</span>' : `<span class="sg30-badge sg30-badge-orange">${progress}/${m.target}</span>`}</div>
              <div class="sg30-card-desc">${m.desc}</div>
              <div class="sg30-progress" style="margin-top:6px"><div class="sg30-progress-fill" style="width:${pct}%;background:${done?'#4CAF50':'#FF9800'}"></div></div>
              ${!done ? `<div style="margin-top:6px;display:flex;gap:6px"><button class="sg30-btn sg30-btn-secondary" data-mid="${m.id}" data-act="inc" style="font-size:11px;padding:4px 10px">+1</button><button class="sg30-btn sg30-btn-secondary" data-mid="${m.id}" data-act="dec" style="font-size:11px;padding:4px 10px">-1</button></div>` : ''}
            </div>`;
          }).join('')}
        </div>
      `;
      drawChallengeCanvas(missions, saved);
      body.querySelectorAll('[data-mid]').forEach(btn => {
        btn.onclick = () => {
          const mid = btn.dataset.mid, act = btn.dataset.act;
          const m = missions.find(x => x.id === mid);
          const cur = saved[mid] || 0;
          if (act === 'inc') {
            saved[mid] = Math.min(m.target, cur + 1);
            if (saved[mid] >= m.target) SFX.challenge_done();
            else SFX.challenge_open();
          } else {
            saved[mid] = Math.max(0, cur - 1);
          }
          LS('challenges', saved);
          render();
        };
      });
    }

    function drawChallengeCanvas(missions, saved) {
      const c = document.getElementById('sg30-chc');
      if (!c) return;
      const ctx = c.getContext('2d');
      const W = c.width, H = c.height;
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = isDark ? '#1e1e1e' : '#fafafa';
      ctx.fillRect(0, 0, W, H);

      const barW = (W - 60) / missions.length;
      missions.forEach((m, i) => {
        const progress = saved[m.id] || 0;
        const pct = Math.min(1, progress / m.target);
        const x = 40 + i * barW;
        const bh = pct * (H - 80);

        ctx.fillStyle = pct >= 1 ? '#4CAF50' : pct >= 0.5 ? '#FF9800' : '#e0e0e0';
        ctx.fillRect(x + 4, H - 40 - bh, barW - 8, bh);

        if (pct < 1) {
          const remH = (1 - pct) * (H - 80);
          ctx.fillStyle = isDark ? '#2a2a2a' : '#f0f0f0';
          ctx.fillRect(x + 4, H - 40 - bh - remH, barW - 8, remH);
        }

        ctx.fillStyle = isDark ? '#aaa' : '#555';
        ctx.font = '8px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(m.id.slice(0, 5), x + barW / 2, H - 24);
        ctx.fillStyle = isDark ? '#ccc' : '#333';
        ctx.font = 'bold 9px sans-serif';
        ctx.fillText((pct * 100).toFixed(0) + '%', x + barW / 2, H - 44 - bh);
      });

      ctx.fillStyle = isDark ? '#ccc' : '#333';
      ctx.font = 'bold 13px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Season Challenge Progress', W / 2, 20);
    }

    mkOverlay('sg30-challenges', '&#x1F3C5; Season Challenge Board', 'linear-gradient(135deg,#e65100,#ff8f00)', '<div>Loading...</div>');
    render();
  }

  // ========== 9. GOLF IQ v14 QUIZ (15 Questions) ==========
  function openGolfIQv14() {
    SFX.quiz_v14();
    const questions = [
      { q: 'What is the standard stimpmeter reading for a PGA Tour green?', o: ['8-9','10-11','12-13','14-15'], a: 2 },
      { q: 'In a handicap system, what does &quot;Course Handicap&quot; represent?', o: ['Your total strokes','Adjusted strokes for a specific course','Average score','Tournament ranking'], a: 1 },
      { q: 'What club generates the most backspin?', o: ['Driver','5 Iron','Pitching Wedge','Lob Wedge'], a: 3 },
      { q: 'What is the penalty for grounding your club in a bunker before the stroke (2019 Rules)?', o: ['No penalty','1 stroke','2 strokes','Disqualification'], a: 0 },
      { q: 'What angle is considered a &quot;strong loft&quot; for a 7-iron?', o: ['38&deg;','34&deg;','28&deg;','25&deg;'], a: 2 },
      { q: 'What does &quot;smash factor&quot; measure?', o: ['Swing speed ratio','Ball speed / clubhead speed','Spin rate / launch angle','Distance / carry ratio'], a: 1 },
      { q: 'What is the ideal launch angle for maximum driver distance?', o: ['8-10&deg;','10-12&deg;','12-15&deg;','16-18&deg;'], a: 2 },
      { q: 'What is a &quot;fried egg&quot; lie in golf?', o: ['Ball in tall grass','Ball buried in bunker sand','Ball on hardpan','Ball in divot'], a: 1 },
      { q: 'What is the maximum number of clubs allowed in a tournament bag?', o: ['12','13','14','15'], a: 2 },
      { q: 'In stroke play, what happens if you play from the wrong teeing area?', o: ['No penalty','1 stroke penalty','2 stroke penalty + replay','Disqualification'], a: 2 },
      { q: 'What is the purpose of the &quot;equitable stroke control&quot; (ESC)?', o: ['Limit max score per hole for handicap','Calculate course rating','Determine tee assignment','Rank tournament results'], a: 0 },
      { q: 'What does a shaft with &quot;low kick point&quot; produce?', o: ['Lower trajectory','Higher trajectory','More spin','Less distance'], a: 1 },
      { q: 'What is the difference between slope rating 113 and 155?', o: ['The course is longer','The course is harder for bogey golfers','The greens are faster','The fairways are narrower'], a: 1 },
      { q: 'When can you clean your ball on the putting green?', o: ['Never','Only if marked and lifted','Only on first putt','Only in competition'], a: 1 },
      { q: 'What is &quot;coefficient of restitution&quot; (COR) limit for drivers?', o: ['0.800','0.830','0.850','0.900'], a: 1 }
    ];

    let idx = 0, score = 0, answered = [];
    const saved = LS('iqv14') || { best: 0, attempts: 0 };

    function render() {
      const body = document.querySelector('#sg30-iqv14 .sg30-panel-body');
      if (!body) return;
      if (idx >= questions.length) {
        const pct = (score / questions.length * 100).toFixed(0);
        const grade = pct >= 90 ? 'S' : pct >= 80 ? 'A' : pct >= 70 ? 'B' : pct >= 60 ? 'C' : 'D';
        saved.attempts++;
        if (score > saved.best) saved.best = score;
        LS('iqv14', saved);
        body.innerHTML = `
          <div style="text-align:center;padding:20px">
            <div style="font-size:48px;font-weight:900;color:${grade==='S'?'#FFD700':grade==='A'?'#4CAF50':'#2196F3'}">${grade}</div>
            <div style="font-size:20px;font-weight:700;margin-top:8px">${score}/${questions.length} Correct (${pct}%)</div>
            <div style="font-size:13px;color:var(--text-muted);margin-top:6px">Best: ${saved.best}/${questions.length} | Attempts: ${saved.attempts}</div>
            <button class="sg30-btn sg30-btn-primary" style="margin-top:16px" id="sg30-iqRetry">&#x1F504; Try Again</button>
          </div>
        `;
        body.querySelector('#sg30-iqRetry').onclick = () => { idx = 0; score = 0; answered = []; render(); };
        return;
      }
      const q = questions[idx];
      body.innerHTML = `
        <div class="sg30-progress" style="margin-bottom:12px"><div class="sg30-progress-fill" style="width:${((idx+1)/questions.length*100).toFixed(0)}%;background:var(--primary)"></div></div>
        <div style="font-size:12px;color:var(--text-muted);margin-bottom:6px">Question ${idx+1}/${questions.length}</div>
        <div style="font-size:15px;font-weight:700;margin-bottom:14px;line-height:1.5">${q.q}</div>
        ${q.o.map((opt, oi) => `<button class="sg30-btn sg30-btn-secondary" style="width:100%;margin-bottom:8px;text-align:left;padding:10px 14px" data-oi="${oi}">${opt}</button>`).join('')}
      `;
      body.querySelectorAll('[data-oi]').forEach(btn => {
        btn.onclick = () => {
          const chosen = +btn.dataset.oi;
          if (chosen === q.a) { score++; SFX.quiz_v14(); }
          answered.push(chosen);
          idx++;
          render();
        };
      });
    }

    mkOverlay('sg30-iqv14', '&#x1F9E0; Golf IQ v14', 'linear-gradient(135deg,#1565c0,#42a5f5)', '<div>Loading...</div>');
    render();
  }

  // ========== ACHIEVEMENTS v30 (+15) ==========
  const ACHIEVEMENTS_V30 = [
    { id: 'sg30_speedzone_first', title: 'Speed Zone Explorer', desc: 'Open Swing Speed Analyzer', icon: '&#x1F3CC;&#xFE0F;' },
    { id: 'sg30_speedzone_5clubs', title: 'Speed Scientist', desc: 'Record speed data for 5+ clubs', icon: '&#x1F52C;' },
    { id: 'sg30_coursemgmt_first', title: 'Course Strategist', desc: 'Open Course Management Planner', icon: '&#x1F5FA;&#xFE0F;' },
    { id: 'sg30_coursemgmt_18', title: 'Grand Strategist', desc: 'Set strategy for all 18 holes', icon: '&#x1F3C6;' },
    { id: 'sg30_puttbreak_first', title: 'Green Reader', desc: 'Open Putting Break Simulator', icon: '&#x26F3;' },
    { id: 'sg30_puttbreak_10holes', title: 'Putt Master', desc: 'Hole 10 putts in the simulator', icon: '&#x1F3AF;' },
    { id: 'sg30_condopt_first', title: 'Condition Analyst', desc: 'Open Round Condition Optimizer', icon: '&#x1F4CA;' },
    { id: 'sg30_condopt_gradeA', title: 'Peak Performance', desc: 'Score A or S grade on condition assessment', icon: '&#x1F31F;' },
    { id: 'sg30_weather_first', title: 'Weather Watcher', desc: 'Open Course Weather Compare', icon: '&#x1F326;&#xFE0F;' },
    { id: 'sg30_proshots_first', title: 'Pro Student', desc: 'Open Pro Shot Library', icon: '&#x1F393;' },
    { id: 'sg30_proshots_5pros', title: 'Pro Analyst', desc: 'View 5+ pro profiles', icon: '&#x1F50D;' },
    { id: 'sg30_headspeed_first', title: 'Speed Tracker', desc: 'Open Clubhead Speed Tracker', icon: '&#x1F4C8;' },
    { id: 'sg30_headspeed_10', title: 'Speed Dedicated', desc: 'Log 10+ speed sessions', icon: '&#x1F525;' },
    { id: 'sg30_challenge_first', title: 'Challenger', desc: 'Open Season Challenge Board', icon: '&#x1F3C5;' },
    { id: 'sg30_iqv14_pass', title: 'Golf IQ v14 Scholar', desc: 'Score 70%+ on Golf IQ v14', icon: '&#x1F9E0;' }
  ];

  function checkAchievements() {
    const unlocked = LS('achievements_v30') || {};
    ACHIEVEMENTS_V30.forEach(a => {
      if (unlocked[a.id]) return;
      let earned = false;
      switch (a.id) {
        case 'sg30_speedzone_first': earned = !!document.getElementById('sg30-swingspeed'); break;
        case 'sg30_speedzone_5clubs': { const d = LS('swingspeed') || {}; earned = Object.keys(d).length >= 5; break; }
        case 'sg30_coursemgmt_first': earned = !!document.getElementById('sg30-coursemgmt'); break;
        case 'sg30_coursemgmt_18': { const d = LS('coursemgmt') || {}; earned = Object.keys(d).length >= 18; break; }
        case 'sg30_puttbreak_first': earned = !!document.getElementById('sg30-puttbreak'); break;
        case 'sg30_puttbreak_10holes': { const d = LS('puttbreak') || {}; earned = (d.holes || 0) >= 10; break; }
        case 'sg30_condopt_first': earned = !!document.getElementById('sg30-condopt'); break;
        case 'sg30_condopt_gradeA': { const d = LS('condopt') || {}; if (d.vals) { const t = d.vals.reduce((a,b)=>a+b,0); earned = t >= 48; } break; }
        case 'sg30_weather_first': earned = !!document.getElementById('sg30-weathercmp'); break;
        case 'sg30_proshots_first': earned = !!document.getElementById('sg30-proshots'); break;
        case 'sg30_headspeed_first': earned = !!document.getElementById('sg30-headspeed'); break;
        case 'sg30_headspeed_10': { const d = LS('headspeed') || {}; earned = (d.sessions || []).length >= 10; break; }
        case 'sg30_challenge_first': earned = !!document.getElementById('sg30-challenges'); break;
        case 'sg30_iqv14_pass': { const d = LS('iqv14') || {}; earned = (d.best || 0) >= 11; break; }
      }
      if (earned) {
        unlocked[a.id] = true;
        LS('achievements_v30', unlocked);
        SFX.achieve_v30();
        showAchieveToast(a);
      }
    });
  }

  function showAchieveToast(a) {
    const t = document.createElement('div');
    t.style.cssText = 'position:fixed;top:20px;right:20px;z-index:10050;background:linear-gradient(135deg,#1a7a3a,#4CAF50);color:#fff;padding:12px 18px;border-radius:12px;box-shadow:0 4px 20px rgba(0,0,0,0.3);animation:sg30SlideUp .3s;max-width:300px';
    t.innerHTML = `<div style="font-weight:700;font-size:13px">${a.icon} Achievement Unlocked!</div><div style="font-size:11px;margin-top:4px;opacity:0.9">${a.title}: ${a.desc}</div>`;
    document.body.appendChild(t);
    setTimeout(() => { t.style.opacity = '0'; t.style.transition = 'opacity .3s'; setTimeout(() => t.remove(), 300); }, 3000);
  }

  setInterval(checkAchievements, 3000);

  // ========== BOTTOM BAR ==========
  const barItems = [
    { icon: '&#x1F3CC;&#xFE0F;', label: 'SwingSpd', fn: openSwingSpeed },
    { icon: '&#x1F5FA;&#xFE0F;', label: 'CourseMgr', fn: openCourseMgmt },
    { icon: '&#x26F3;', label: 'PuttBreak', fn: openPuttBreak },
    { icon: '&#x1F4CA;', label: 'Condition', fn: openConditionOpt },
    { icon: '&#x1F326;&#xFE0F;', label: 'Weather', fn: openWeatherCompare },
    { icon: '&#x1F3C6;', label: 'ProShots', fn: openProShots },
    { icon: '&#x1F4C8;', label: 'HeadSpd', fn: openHeadSpeed },
    { icon: '&#x1F3C5;', label: 'Challenge', fn: openChallenges },
    { icon: '&#x1F9E0;', label: 'IQ v14', fn: openGolfIQv14 }
  ];

  const bar = document.createElement('div');
  bar.className = 'sg30-bottom-bar';
  barItems.forEach(item => {
    const btn = document.createElement('button');
    btn.className = 'sg30-bbtn';
    btn.innerHTML = `<span class="sg30-bbtn-icon">${item.icon}</span><span class="sg30-bbtn-label">${item.label}</span>`;
    btn.onclick = item.fn;
    bar.appendChild(btn);
  });
  document.body.appendChild(bar);

  // ========== KEYBOARD SHORTCUTS ==========
  document.addEventListener('keydown', e => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'SELECT') return;
    if (!e.shiftKey) return;
    const map = { S: openSwingSpeed, C: openCourseMgmt, P: openPuttBreak, O: openConditionOpt, W: openWeatherCompare, R: openProShots, H: openHeadSpeed, M: openChallenges };
    if (map[e.key]) { e.preventDefault(); map[e.key](); }
  });

  // ========== ESC to close ==========
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.sg30-overlay.active').forEach(ov => ov.classList.remove('active'));
    }
  });

  // Adjust body padding for bottom bar
  document.body.style.paddingBottom = (parseInt(getComputedStyle(document.body).paddingBottom) || 0) + 60 + 'px';

})();
