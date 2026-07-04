/* ====================================================================
 * SmartGolf v29.0 patch
 * 핸디캡골트래커Canvas마일스톤 + 라운드페이스타이머18홀 + 클럽피팅어드바이저6축RadarCanvas
 * + 골프여행플래너8지역Canvas + 코스컨디션로거6요소 + 멘탈게임워크샵Canvas6기법호흡
 * + 샷메이킹가이드Canvas10종탄도 + 골프에티켓마스터20시나리오
 * + Golf IQ v13 15문항 + 업적+15(167→182) + SFX12종(171→183) + 키보드8종
 * ==================================================================== */
(function () {
  'use strict';

  const SGV29 = {};
  const LS = (k, v) => v === undefined ? JSON.parse(localStorage.getItem('sg29_' + k) || 'null') : localStorage.setItem('sg29_' + k, JSON.stringify(v));

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
    hcp_open: () => { sfx(392, 0.1); sfx(494, 0.12); },
    hcp_milestone: () => { sfx(523, 0.08); sfx(659, 0.1); sfx(784, 0.12); sfx(1047, 0.15, 'triangle'); },
    pace_open: () => { sfx(440, 0.12); sfx(554, 0.1); },
    pace_tick: () => { sfx(880, 0.04, 'square', 0.08); },
    fitting_open: () => { sfx(349, 0.1); sfx(440, 0.12); },
    fitting_analyze: () => { sfx(523, 0.1); sfx(659, 0.08); sfx(784, 0.12); },
    travel_open: () => { sfx(466, 0.12); sfx(587, 0.1); },
    travel_plan: () => { sfx(587, 0.08); sfx(740, 0.08); sfx(880, 0.12); },
    condition_open: () => { sfx(330, 0.12); sfx(415, 0.1); },
    condition_save: () => { sfx(523, 0.1); sfx(784, 0.12); },
    mental_open: () => { sfx(294, 0.1); sfx(370, 0.12); },
    mental_breathe: () => { sfx(220, 0.6, 'sine', 0.1); sfx(330, 0.6, 'sine', 0.06); },
    shot_open: () => { sfx(370, 0.1); sfx(466, 0.12); },
    shot_trace: () => { sfx(466, 0.08); sfx(587, 0.08); sfx(740, 0.12); },
    etiquette_open: () => { sfx(415, 0.12); sfx(523, 0.1); },
    etiquette_correct: () => { sfx(784, 0.1); sfx(1047, 0.15); },
    quiz_v13: () => { sfx(554, 0.1); sfx(698, 0.12); },
    quiz_correct13: () => { sfx(830, 0.1); sfx(1108, 0.15); },
    achieve_v29: () => { sfx(523, 0.06); sfx(659, 0.06); sfx(784, 0.06); sfx(1047, 0.06); sfx(1319, 0.2, 'triangle'); }
  };

  // ========== CSS ==========
  const css = `
.sg29-bottom-bar{position:fixed;bottom:0;left:0;right:0;z-index:97;background:var(--glass-bg,rgba(255,255,255,.92));backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);border-top:1px solid var(--border,#e0e0e0);padding:8px 12px;display:flex;gap:8px;overflow-x:auto;scrollbar-width:none;-ms-overflow-style:none}
.sg29-bottom-bar::-webkit-scrollbar{display:none}
.sg29-bbtn{flex-shrink:0;display:flex;flex-direction:column;align-items:center;gap:3px;padding:6px 10px;border-radius:10px;border:1px solid var(--border,#e0e0e0);background:var(--card-bg,#fff);cursor:pointer;transition:all .2s;min-width:58px}
.sg29-bbtn:hover,.sg29-bbtn:active{background:var(--primary-light,#e8f5e9);border-color:var(--primary,#1a7a3a)}
.sg29-bbtn-icon{font-size:18px;line-height:1}
.sg29-bbtn-label{font-size:9px;font-weight:700;color:var(--text-muted,#666);white-space:nowrap}
.sg29-overlay{display:none;position:fixed;top:0;left:0;right:0;bottom:0;z-index:1001;background:rgba(0,0,0,.55);overflow-y:auto;padding:20px;animation:sg29FadeIn .25s}
.sg29-overlay.active{display:flex;align-items:flex-start;justify-content:center}
@keyframes sg29FadeIn{from{opacity:0}to{opacity:1}}
.sg29-panel{background:var(--card-bg,#fff);border-radius:16px;max-width:640px;width:100%;margin:30px auto;box-shadow:0 8px 40px rgba(0,0,0,.3);overflow:hidden;animation:sg29SlideUp .3s}
@keyframes sg29SlideUp{from{transform:translateY(30px);opacity:0}to{transform:translateY(0);opacity:1}}
.sg29-panel-head{padding:16px 20px;color:#fff;display:flex;align-items:center;justify-content:space-between}
.sg29-panel-head h3{font-size:16px;font-weight:700;display:flex;align-items:center;gap:8px}
.sg29-panel-close{background:rgba(255,255,255,.25);border:none;color:#fff;width:30px;height:30px;border-radius:50%;cursor:pointer;font-size:16px}
.sg29-panel-body{padding:16px 20px;max-height:70vh;overflow-y:auto}
.sg29-card{background:var(--bg,#f5f7f5);border-radius:12px;padding:14px;margin-bottom:10px;border:1px solid var(--border,#e0e0e0);cursor:pointer;transition:all .2s}
.sg29-card:hover{box-shadow:0 2px 12px rgba(0,0,0,.1);transform:translateY(-1px)}
.sg29-card-title{font-weight:700;font-size:14px;color:var(--text,#1a1a1a);margin-bottom:4px;display:flex;align-items:center;gap:6px}
.sg29-card-desc{font-size:12px;color:var(--text-muted,#666);line-height:1.5}
.sg29-badge{display:inline-block;padding:2px 8px;border-radius:10px;font-size:10px;font-weight:700}
.sg29-badge-purple{background:#ede7f6;color:#6a1b9a}
.sg29-badge-green{background:#e8f5e9;color:#2e7d32}
.sg29-badge-blue{background:#e3f2fd;color:#1565c0}
.sg29-badge-orange{background:#fff3e0;color:#e65100}
.sg29-badge-red{background:#ffebee;color:#c62828}
.sg29-badge-teal{background:#e0f2f1;color:#00695c}
.sg29-tabs{display:flex;gap:4px;margin-bottom:12px;flex-wrap:wrap}
.sg29-tab{padding:6px 14px;border-radius:20px;border:1px solid var(--border,#e0e0e0);background:var(--bg,#f5f7f5);font-size:12px;cursor:pointer;font-weight:600;color:var(--text-muted,#666);transition:all .2s}
.sg29-tab.active{background:var(--primary,#1a7a3a);color:#fff;border-color:var(--primary,#1a7a3a)}
.sg29-btn{padding:8px 16px;border-radius:8px;border:none;font-size:13px;font-weight:600;cursor:pointer;transition:all .2s}
.sg29-btn-primary{background:var(--primary,#1a7a3a);color:#fff}
.sg29-btn-primary:hover{opacity:.9}
.sg29-btn-secondary{background:var(--bg,#f5f7f5);color:var(--text,#1a1a1a);border:1px solid var(--border,#e0e0e0)}
.sg29-progress{width:100%;height:8px;background:var(--border,#e0e0e0);border-radius:4px;overflow:hidden;margin:6px 0}
.sg29-progress-fill{height:100%;border-radius:4px;transition:width .4s}
.sg29-grid2{display:grid;grid-template-columns:1fr 1fr;gap:8px}
@media(max-width:480px){.sg29-grid2{grid-template-columns:1fr}}
.sg29-stat{text-align:center;padding:10px;background:var(--bg,#f5f7f5);border-radius:10px;border:1px solid var(--border,#e0e0e0)}
.sg29-stat-val{font-size:22px;font-weight:800;color:var(--primary,#1a7a3a)}
.sg29-stat-label{font-size:10px;color:var(--text-muted,#666);margin-top:2px}
.sg29-canvas-wrap{text-align:center;margin:12px 0}
.sg29-canvas-wrap canvas{max-width:100%;border-radius:12px;border:1px solid var(--border,#e0e0e0)}
.sg29-scenario{background:var(--bg,#f5f7f5);border-radius:12px;padding:14px;margin-bottom:10px;border:1px solid var(--border,#e0e0e0)}
.sg29-scenario-q{font-weight:700;font-size:14px;margin-bottom:8px;color:var(--text,#1a1a1a)}
.sg29-scenario-opts{display:flex;flex-direction:column;gap:6px}
.sg29-scenario-opt{padding:10px 14px;border-radius:8px;border:1px solid var(--border,#e0e0e0);background:var(--card-bg,#fff);cursor:pointer;font-size:13px;transition:all .2s}
.sg29-scenario-opt:hover{border-color:var(--primary,#1a7a3a);background:var(--primary-light,#e8f5e9)}
.sg29-scenario-opt.correct{background:#c8e6c9;border-color:#2e7d32;color:#1b5e20}
.sg29-scenario-opt.wrong{background:#ffcdd2;border-color:#c62828;color:#b71c1c}
.sg29-breathe-circle{width:120px;height:120px;border-radius:50%;background:radial-gradient(circle,#4caf50,#1a7a3a);margin:20px auto;display:flex;align-items:center;justify-content:center;color:#fff;font-weight:700;font-size:16px;transition:transform 4s ease-in-out}
.sg29-breathe-circle.inhale{transform:scale(1.4)}
.sg29-breathe-circle.exhale{transform:scale(0.8)}
`;
  const styleEl = document.createElement('style');
  styleEl.textContent = css;
  document.head.appendChild(styleEl);

  // ========== UTILITY ==========
  function makeOverlay(id) {
    const d = document.createElement('div');
    d.className = 'sg29-overlay';
    d.id = id;
    d.addEventListener('click', e => { if (e.target === d) d.classList.remove('active'); });
    document.body.appendChild(d);
    return d;
  }
  function makePanel(parent, title, icon, color) {
    const p = document.createElement('div');
    p.className = 'sg29-panel';
    p.innerHTML = `<div class="sg29-panel-head" style="background:${color}"><h3>${icon} ${title}</h3><button class="sg29-panel-close">&times;</button></div><div class="sg29-panel-body"></div>`;
    p.querySelector('.sg29-panel-close').onclick = () => parent.classList.remove('active');
    parent.innerHTML = '';
    parent.appendChild(p);
    return p.querySelector('.sg29-panel-body');
  }
  function isDark() { return document.documentElement.getAttribute('data-theme') === 'dark'; }

  // ========== 1. HANDICAP GOAL TRACKER ==========
  SGV29.handicapTracker = function () {
    SFX.hcp_open();
    const ov = document.getElementById('sg29hcpOv') || makeOverlay('sg29hcpOv');
    const body = makePanel(ov, '핸디캡 골 트래커', '⛳', 'linear-gradient(135deg,#1a7a3a,#2e7d32)');
    ov.classList.add('active');

    const data = LS('hcp_data') || { entries: [], goal: 18 };

    body.innerHTML = `
      <p style="font-size:13px;color:var(--text-muted);margin-bottom:12px">핸디캡 목표를 설정하고, 라운드마다 핸디캡을 기록하여 성장을 추적하세요.</p>
      <div class="sg29-grid2" style="margin-bottom:12px">
        <div class="sg29-stat"><div class="sg29-stat-val" id="hcpCurrent">${data.entries.length ? data.entries[data.entries.length - 1].hcp : '--'}</div><div class="sg29-stat-label">현재 핸디캡</div></div>
        <div class="sg29-stat"><div class="sg29-stat-val" style="color:#e65100" id="hcpGoal">${data.goal}</div><div class="sg29-stat-label">목표 핸디캡</div></div>
      </div>
      <div style="display:flex;gap:8px;margin-bottom:12px;flex-wrap:wrap">
        <input type="number" id="hcpInput" placeholder="핸디캡" min="0" max="54" step="0.1" style="flex:1;min-width:80px;padding:8px;border:2px solid var(--border);border-radius:8px;font-size:14px;background:var(--card-bg);color:var(--text)">
        <input type="number" id="hcpGoalInput" placeholder="목표" min="0" max="54" step="0.1" value="${data.goal}" style="width:70px;padding:8px;border:2px solid var(--border);border-radius:8px;font-size:14px;background:var(--card-bg);color:var(--text)">
        <button class="sg29-btn sg29-btn-primary" id="hcpAdd">기록</button>
      </div>
      <div class="sg29-canvas-wrap"><canvas id="hcpCanvas" width="560" height="320"></canvas></div>
      <div id="hcpMilestones" style="margin-top:12px"></div>
      <div id="hcpHistory" style="margin-top:12px"></div>
    `;

    const milestones = [
      { hcp: 36, label: '입문', icon: '🌱', color: '#8bc34a' },
      { hcp: 28, label: '비기너', icon: '🌿', color: '#4caf50' },
      { hcp: 20, label: '중급자', icon: '⭐', color: '#ff9800' },
      { hcp: 14, label: '상급자', icon: '🏆', color: '#f57c00' },
      { hcp: 9, label: '싱글', icon: '🔥', color: '#f44336' },
      { hcp: 4, label: '스크래치', icon: '💎', color: '#9c27b0' },
      { hcp: 0, label: '프로급', icon: '👑', color: '#ffd700' }
    ];

    function drawChart() {
      const c = document.getElementById('hcpCanvas');
      if (!c) return;
      const ctx = c.getContext('2d');
      const dk = isDark();
      ctx.clearRect(0, 0, 560, 320);

      ctx.fillStyle = dk ? '#1e1e1e' : '#fafafa';
      ctx.fillRect(0, 0, 560, 320);

      const entries = data.entries.slice(-20);
      if (entries.length < 2) {
        ctx.fillStyle = dk ? '#999' : '#666';
        ctx.font = '14px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('2개 이상 기록하면 그래프가 표시됩니다', 280, 160);
        return;
      }

      const padL = 50, padR = 20, padT = 30, padB = 40;
      const w = 560 - padL - padR, h = 320 - padT - padB;
      const maxH = Math.max(...entries.map(e => e.hcp), data.goal) + 5;
      const minH = Math.max(0, Math.min(...entries.map(e => e.hcp), data.goal) - 3);

      ctx.strokeStyle = dk ? '#444' : '#ddd';
      ctx.lineWidth = 1;
      for (let i = 0; i <= 5; i++) {
        const y = padT + (h / 5) * i;
        ctx.beginPath(); ctx.moveTo(padL, y); ctx.lineTo(padL + w, y); ctx.stroke();
        const val = maxH - ((maxH - minH) / 5) * i;
        ctx.fillStyle = dk ? '#999' : '#666';
        ctx.font = '11px sans-serif';
        ctx.textAlign = 'right';
        ctx.fillText(val.toFixed(1), padL - 8, y + 4);
      }

      const goalY = padT + h * (1 - (data.goal - minH) / (maxH - minH));
      ctx.strokeStyle = '#f44336';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([6, 4]);
      ctx.beginPath(); ctx.moveTo(padL, goalY); ctx.lineTo(padL + w, goalY); ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = '#f44336';
      ctx.font = 'bold 10px sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText('목표 ' + data.goal, padL + w - 60, goalY - 6);

      const grad = ctx.createLinearGradient(0, padT, 0, padT + h);
      grad.addColorStop(0, 'rgba(26,122,58,0.3)');
      grad.addColorStop(1, 'rgba(26,122,58,0.02)');

      ctx.beginPath();
      entries.forEach((e, i) => {
        const x = padL + (w / (entries.length - 1)) * i;
        const y = padT + h * (1 - (e.hcp - minH) / (maxH - minH));
        if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      });
      const lastX = padL + w;
      const firstX = padL;
      ctx.lineTo(lastX, padT + h);
      ctx.lineTo(firstX, padT + h);
      ctx.closePath();
      ctx.fillStyle = grad;
      ctx.fill();

      ctx.beginPath();
      entries.forEach((e, i) => {
        const x = padL + (w / (entries.length - 1)) * i;
        const y = padT + h * (1 - (e.hcp - minH) / (maxH - minH));
        if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      });
      ctx.strokeStyle = '#1a7a3a';
      ctx.lineWidth = 2.5;
      ctx.stroke();

      entries.forEach((e, i) => {
        const x = padL + (w / (entries.length - 1)) * i;
        const y = padT + h * (1 - (e.hcp - minH) / (maxH - minH));
        ctx.beginPath(); ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fillStyle = '#1a7a3a'; ctx.fill();
        ctx.strokeStyle = '#fff'; ctx.lineWidth = 2; ctx.stroke();
      });

      ctx.fillStyle = dk ? '#ccc' : '#333';
      ctx.font = 'bold 13px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('핵디캅 추이 차트', 280, 18);

      entries.forEach((e, i) => {
        if (i % Math.max(1, Math.floor(entries.length / 6)) === 0 || i === entries.length - 1) {
          const x = padL + (w / (entries.length - 1)) * i;
          ctx.fillStyle = dk ? '#888' : '#999';
          ctx.font = '9px sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText(e.date || (i + 1) + 'R', x, padT + h + 18);
        }
      });
    }

    function renderMilestones() {
      const cur = data.entries.length ? data.entries[data.entries.length - 1].hcp : 54;
      const el = document.getElementById('hcpMilestones');
      if (!el) return;
      el.innerHTML = '<div style="font-weight:700;font-size:13px;margin-bottom:8px">🏅 마일스톤</div>' +
        milestones.map(m => {
          const reached = cur <= m.hcp;
          return `<div style="display:flex;align-items:center;gap:8px;padding:6px 0;opacity:${reached ? 1 : 0.4}">
            <span style="font-size:20px">${m.icon}</span>
            <span style="font-weight:600;font-size:13px;flex:1">${m.label} (${m.hcp} 이하)</span>
            <span class="sg29-badge ${reached ? 'sg29-badge-green' : 'sg29-badge-orange'}">${reached ? '달성' : m.hcp - cur > 0 ? (cur - m.hcp).toFixed(1) + ' 남음' : '대기'}</span>
          </div>`;
        }).join('');
    }

    function renderHistory() {
      const el = document.getElementById('hcpHistory');
      if (!el) return;
      const recent = data.entries.slice(-10).reverse();
      el.innerHTML = '<div style="font-weight:700;font-size:13px;margin-bottom:8px">📝 최근 기록</div>' +
        (recent.length ? recent.map((e, i) => {
          const prev = i < recent.length - 1 ? recent[i + 1].hcp : e.hcp;
          const diff = e.hcp - prev;
          return `<div style="display:flex;align-items:center;gap:8px;padding:6px 0;border-bottom:1px solid var(--border)">
            <span style="font-weight:600;font-size:14px">${e.hcp}</span>
            <span style="font-size:11px;color:var(--text-muted)">${e.date || '-'}</span>
            <span style="margin-left:auto;font-size:12px;font-weight:700;color:${diff < 0 ? '#2e7d32' : diff > 0 ? '#c62828' : '#999'}">${diff < 0 ? '▼' + Math.abs(diff).toFixed(1) : diff > 0 ? '▲' + diff.toFixed(1) : '-'}</span>
          </div>`;
        }).join('') : '<div style="font-size:12px;color:var(--text-muted);padding:10px">아직 기록이 없습니다</div>');
    }

    document.getElementById('hcpAdd').onclick = () => {
      const v = parseFloat(document.getElementById('hcpInput').value);
      const g = parseFloat(document.getElementById('hcpGoalInput').value);
      if (isNaN(v) || v < 0 || v > 54) return;
      data.goal = isNaN(g) ? data.goal : g;
      const today = new Date();
      data.entries.push({ hcp: v, date: (today.getMonth() + 1) + '/' + today.getDate() });
      LS('hcp_data', data);
      document.getElementById('hcpCurrent').textContent = v;
      document.getElementById('hcpGoal').textContent = data.goal;
      drawChart(); renderMilestones(); renderHistory();
      SFX.hcp_milestone();
      checkAchieve('hcp_first');
      if (data.entries.length >= 10) checkAchieve('hcp_10');
      if (v <= data.goal) checkAchieve('hcp_goal_reached');
    };

    drawChart(); renderMilestones(); renderHistory();
  };

  // ========== 2. ROUND PACE TIMER ==========
  SGV29.paceTimer = function () {
    SFX.pace_open();
    const ov = document.getElementById('sg29paceOv') || makeOverlay('sg29paceOv');
    const body = makePanel(ov, '라운드 페이스 타이머', '⏱️', 'linear-gradient(135deg,#1565c0,#0d47a1)');
    ov.classList.add('active');

    const paceData = LS('pace_data') || { currentHole: 1, times: [], totalTarget: 240 };
    const TARGETS = [14,14,14,14,14,14,14,14,14,12,12,14,14,14,14,14,14,12];

    let timerInterval = null;
    let elapsed = 0;

    body.innerHTML = `
      <p style="font-size:13px;color:var(--text-muted);margin-bottom:12px">18홀 라운드 시간을 관리하여 적절한 플레이 속도를 유지하세요. 기준 4시간.</p>
      <div class="sg29-grid2" style="margin-bottom:12px">
        <div class="sg29-stat"><div class="sg29-stat-val" id="paceHole">${paceData.currentHole}</div><div class="sg29-stat-label">현재 홀</div></div>
        <div class="sg29-stat"><div class="sg29-stat-val" id="paceElapsed" style="color:#1565c0">00:00</div><div class="sg29-stat-label">현재 홀 경과</div></div>
      </div>
      <div style="text-align:center;margin-bottom:12px">
        <span style="font-size:12px;color:var(--text-muted)">목표: <strong>${TARGETS[paceData.currentHole - 1]}분</strong> | 전체 목표: 4시간 (240분)</span>
      </div>
      <div class="sg29-progress"><div class="sg29-progress-fill" id="paceProg" style="width:0%;background:linear-gradient(90deg,#1565c0,#42a5f5)"></div></div>
      <div style="display:flex;gap:8px;margin:12px 0;justify-content:center;flex-wrap:wrap">
        <button class="sg29-btn sg29-btn-primary" id="paceStart" style="background:#1565c0">▶ 시작</button>
        <button class="sg29-btn sg29-btn-secondary" id="paceNext">다음 홀 ➡</button>
        <button class="sg29-btn sg29-btn-secondary" id="paceReset">🔄 리셋</button>
      </div>
      <div id="paceLog" style="margin-top:12px"></div>
    `;

    function updateTimer() {
      elapsed++;
      const m = Math.floor(elapsed / 60), s = elapsed % 60;
      const el = document.getElementById('paceElapsed');
      if (el) el.textContent = String(m).padStart(2, '0') + ':' + String(s).padStart(2, '0');
      const target = TARGETS[paceData.currentHole - 1] * 60;
      const prog = document.getElementById('paceProg');
      if (prog) {
        const pct = Math.min(100, (elapsed / target) * 100);
        prog.style.width = pct + '%';
        prog.style.background = pct > 100 ? '#f44336' : pct > 75 ? '#ff9800' : 'linear-gradient(90deg,#1565c0,#42a5f5)';
      }
      if (elapsed % 60 === 0) SFX.pace_tick();
    }

    document.getElementById('paceStart').onclick = () => {
      if (timerInterval) { clearInterval(timerInterval); timerInterval = null; document.getElementById('paceStart').textContent = '▶ 시작'; }
      else { timerInterval = setInterval(updateTimer, 1000); document.getElementById('paceStart').textContent = '⏸ 일시정지'; }
    };

    document.getElementById('paceNext').onclick = () => {
      if (paceData.currentHole > 18) return;
      paceData.times.push({ hole: paceData.currentHole, seconds: elapsed });
      paceData.currentHole = Math.min(18, paceData.currentHole + 1);
      LS('pace_data', paceData);
      elapsed = 0;
      document.getElementById('paceHole').textContent = paceData.currentHole;
      document.getElementById('paceElapsed').textContent = '00:00';
      renderLog();
      SFX.pace_open();
      if (paceData.times.length >= 18) checkAchieve('pace_complete');
    };

    document.getElementById('paceReset').onclick = () => {
      if (timerInterval) { clearInterval(timerInterval); timerInterval = null; }
      paceData.currentHole = 1; paceData.times = []; elapsed = 0;
      LS('pace_data', paceData);
      document.getElementById('paceHole').textContent = '1';
      document.getElementById('paceElapsed').textContent = '00:00';
      document.getElementById('paceStart').textContent = '▶ 시작';
      renderLog();
    };

    function renderLog() {
      const el = document.getElementById('paceLog');
      if (!el) return;
      if (!paceData.times.length) { el.innerHTML = '<div style="font-size:12px;color:var(--text-muted);padding:10px">홀별 기록이 없습니다</div>'; return; }
      const total = paceData.times.reduce((s, t) => s + t.seconds, 0);
      el.innerHTML = '<div style="font-weight:700;font-size:13px;margin-bottom:8px">홀별 시간</div>' +
        paceData.times.map(t => {
          const m = Math.floor(t.seconds / 60), s = t.seconds % 60;
          const target = TARGETS[t.hole - 1] * 60;
          const status = t.seconds <= target ? '✅' : '⚠️';
          return `<div style="display:flex;align-items:center;gap:8px;padding:4px 0;font-size:12px;border-bottom:1px solid var(--border)">
            <span style="font-weight:700">${t.hole}H</span>
            <span>${m}분 ${s}초</span>
            <span style="margin-left:auto">${status}</span>
          </div>`;
        }).join('') +
        `<div style="margin-top:8px;font-weight:700;font-size:13px">총 시간: ${Math.floor(total / 60)}분 ${total % 60}초</div>`;
    }

    renderLog();
  };

  // ========== 3. CLUB FITTING ADVISOR ==========
  SGV29.clubFitting = function () {
    SFX.fitting_open();
    const ov = document.getElementById('sg29fitOv') || makeOverlay('sg29fitOv');
    const body = makePanel(ov, '클럽 피팅 어드바이저', '🔧', 'linear-gradient(135deg,#6a1b9a,#4a148c)');
    ov.classList.add('active');

    const specs = LS('fitting_specs') || { height: 175, swing: 90, tempo: 'mid', flex: 'R', grip: 'mid', priority: 'distance' };

    body.innerHTML = `
      <p style="font-size:13px;color:var(--text-muted);margin-bottom:12px">신체 조건과 스윙 특성에 맞는 클럽 피팅을 추천합니다.</p>
      <div class="sg29-grid2" style="margin-bottom:12px">
        <div class="sg29-card" style="cursor:default">
          <div class="sg29-card-title">𛒡 신장 (cm)</div>
          <input type="number" id="fitHeight" value="${specs.height}" min="140" max="200" style="width:100%;padding:8px;border:2px solid var(--border);border-radius:8px;font-size:14px;background:var(--card-bg);color:var(--text)">
        </div>
        <div class="sg29-card" style="cursor:default">
          <div class="sg29-card-title">🏌️ 헤드스피드 (mph)</div>
          <input type="number" id="fitSwing" value="${specs.swing}" min="50" max="130" style="width:100%;padding:8px;border:2px solid var(--border);border-radius:8px;font-size:14px;background:var(--card-bg);color:var(--text)">
        </div>
      </div>
      <div class="sg29-grid2" style="margin-bottom:12px">
        <div class="sg29-card" style="cursor:default">
          <div class="sg29-card-title">⏰ 스윙 템포</div>
          <select id="fitTempo" style="width:100%;padding:8px;border:2px solid var(--border);border-radius:8px;font-size:13px;background:var(--card-bg);color:var(--text)">
            <option value="slow" ${specs.tempo === 'slow' ? 'selected' : ''}>느림 (어니 얼스)</option>
            <option value="mid" ${specs.tempo === 'mid' ? 'selected' : ''}>보통 (에르니엘스)</option>
            <option value="fast" ${specs.tempo === 'fast' ? 'selected' : ''}>빠름 (데샤보)</option>
          </select>
        </div>
        <div class="sg29-card" style="cursor:default">
          <div class="sg29-card-title">🧑‍💻 우선순위</div>
          <select id="fitPriority" style="width:100%;padding:8px;border:2px solid var(--border);border-radius:8px;font-size:13px;background:var(--card-bg);color:var(--text)">
            <option value="distance" ${specs.priority === 'distance' ? 'selected' : ''}>비거리</option>
            <option value="accuracy" ${specs.priority === 'accuracy' ? 'selected' : ''}>정확도</option>
            <option value="feel" ${specs.priority === 'feel' ? 'selected' : ''}>타괐</option>
          </select>
        </div>
      </div>
      <div style="text-align:center;margin-bottom:12px">
        <button class="sg29-btn sg29-btn-primary" id="fitAnalyze" style="background:#6a1b9a">🔍 피팅 분석</button>
      </div>
      <div class="sg29-canvas-wrap"><canvas id="fitCanvas" width="520" height="440"></canvas></div>
      <div id="fitResult" style="margin-top:12px"></div>
    `;

    document.getElementById('fitAnalyze').onclick = () => {
      SFX.fitting_analyze();
      const h = parseInt(document.getElementById('fitHeight').value) || 175;
      const sw = parseInt(document.getElementById('fitSwing').value) || 90;
      const tempo = document.getElementById('fitTempo').value;
      const priority = document.getElementById('fitPriority').value;

      const lenScore = h >= 180 ? 90 : h >= 170 ? 75 : h >= 160 ? 60 : 50;
      const loftScore = sw >= 100 ? 85 : sw >= 90 ? 70 : sw >= 80 ? 60 : 50;
      const flexScore = sw >= 105 ? 90 : sw >= 95 ? 80 : sw >= 85 ? 65 : 50;
      const lieScore = h >= 180 ? 85 : h >= 170 ? 70 : 60;
      const gripScore = h >= 175 ? 80 : h >= 165 ? 70 : 55;
      const weightScore = tempo === 'fast' ? 85 : tempo === 'mid' ? 70 : 55;

      const axes = [
        { label: '레슸트 길이', val: lenScore },
        { label: '로프트 각도', val: loftScore },
        { label: '샤프트 플렉스', val: flexScore },
        { label: '라이 각도', val: lieScore },
        { label: '그립 사이즈', val: gripScore },
        { label: '스윙 웨이트', val: weightScore }
      ];

      drawRadar(document.getElementById('fitCanvas'), axes, '클럽 피팅 분석', '#6a1b9a');

      const flexRec = sw >= 105 ? 'X (Extra Stiff)' : sw >= 95 ? 'S (Stiff)' : sw >= 85 ? 'R (Regular)' : 'A (Senior)';
      const lenAdj = h >= 185 ? '+1인치' : h >= 175 ? '표준' : h >= 165 ? '-0.5인치' : '-1인치';
      const gripRec = h >= 180 ? '오버사이즈' : h >= 170 ? '표준' : '언더사이즈';
      const loftRec = sw >= 100 ? '낮은 로프트 (9-10.5°)' : sw >= 90 ? '중간 로프트 (10.5-12°)' : '높은 로프트 (12-15°)';

      document.getElementById('fitResult').innerHTML = `
        <div style="font-weight:700;font-size:13px;margin-bottom:8px">📊 피팅 추천</div>
        <div class="sg29-card" style="cursor:default"><div class="sg29-card-title">샤프트 플렉스</div><div class="sg29-card-desc">${flexRec} (헤드스피드 ${sw}mph 기준)</div></div>
        <div class="sg29-card" style="cursor:default"><div class="sg29-card-title">클럽 길이</div><div class="sg29-card-desc">${lenAdj} (신장 ${h}cm 기준)</div></div>
        <div class="sg29-card" style="cursor:default"><div class="sg29-card-title">그립 사이즈</div><div class="sg29-card-desc">${gripRec}</div></div>
        <div class="sg29-card" style="cursor:default"><div class="sg29-card-title">드라이버 로프트</div><div class="sg29-card-desc">${loftRec}</div></div>
      `;
      LS('fitting_specs', { height: h, swing: sw, tempo, priority });
      checkAchieve('fitting_first');
    };
  };

  function drawRadar(canvas, axes, title, color) {
    const ctx = canvas.getContext('2d');
    const dk = isDark();
    const cx = 260, cy = 240, r = 160, n = axes.length;
    ctx.clearRect(0, 0, 520, 440);
    ctx.fillStyle = dk ? '#1e1e1e' : '#fafafa';
    ctx.fillRect(0, 0, 520, 440);

    ctx.fillStyle = dk ? '#ddd' : '#333';
    ctx.font = 'bold 14px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(title, cx, 24);

    for (let ring = 1; ring <= 5; ring++) {
      const rr = (r / 5) * ring;
      ctx.beginPath();
      for (let i = 0; i <= n; i++) {
        const a = (Math.PI * 2 / n) * i - Math.PI / 2;
        const x = cx + Math.cos(a) * rr, y = cy + Math.sin(a) * rr;
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.strokeStyle = dk ? '#444' : '#ddd';
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    for (let i = 0; i < n; i++) {
      const a = (Math.PI * 2 / n) * i - Math.PI / 2;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + Math.cos(a) * r, cy + Math.sin(a) * r);
      ctx.strokeStyle = dk ? '#555' : '#ccc';
      ctx.stroke();
    }

    ctx.beginPath();
    axes.forEach((ax, i) => {
      const a = (Math.PI * 2 / n) * i - Math.PI / 2;
      const v = (ax.val / 100) * r;
      const x = cx + Math.cos(a) * v, y = cy + Math.sin(a) * v;
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    });
    ctx.closePath();
    ctx.fillStyle = color + '33';
    ctx.fill();
    ctx.strokeStyle = color;
    ctx.lineWidth = 2.5;
    ctx.stroke();

    axes.forEach((ax, i) => {
      const a = (Math.PI * 2 / n) * i - Math.PI / 2;
      const v = (ax.val / 100) * r;
      ctx.beginPath();
      ctx.arc(cx + Math.cos(a) * v, cy + Math.sin(a) * v, 4, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();

      const lx = cx + Math.cos(a) * (r + 28);
      const ly = cy + Math.sin(a) * (r + 28);
      ctx.fillStyle = dk ? '#ccc' : '#333';
      ctx.font = 'bold 11px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(ax.label, lx, ly);
      ctx.font = '10px sans-serif';
      ctx.fillStyle = color;
      ctx.fillText(ax.val + '점', lx, ly + 14);
    });

    const avg = Math.round(axes.reduce((s, a) => s + a.val, 0) / n);
    const grade = avg >= 85 ? 'S' : avg >= 70 ? 'A' : avg >= 55 ? 'B' : avg >= 40 ? 'C' : 'D';
    const gc = { S: '#ffd700', A: '#4caf50', B: '#2196f3', C: '#ff9800', D: '#f44336' }[grade];
    ctx.beginPath();
    ctx.arc(cx, cy + r + 52, 18, 0, Math.PI * 2);
    ctx.fillStyle = gc;
    ctx.fill();
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 18px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(grade, cx, cy + r + 53);
    ctx.fillStyle = dk ? '#aaa' : '#666';
    ctx.font = '11px sans-serif';
    ctx.fillText('평균 ' + avg + '점', cx, cy + r + 78);
  }

  // ========== 4. GOLF TRAVEL PLANNER ==========
  SGV29.travelPlanner = function () {
    SFX.travel_open();
    const ov = document.getElementById('sg29travelOv') || makeOverlay('sg29travelOv');
    const body = makePanel(ov, '골프 여행 플래너', '✈️', 'linear-gradient(135deg,#e65100,#bf360c)');
    ov.classList.add('active');

    const regions = [
      { name: '제주도', courses: ['핀크스GC', '라헤스톤CC', '제주컌트리GC', '더클래식'], season: '봄/가을', icon: '🏴', color: '#e65100', desc: '아름다운 해안 코스와 온화한 날씨' },
      { name: '강원도', courses: ['파인CC', '알포레CC', '용평CC', '소노CC'], season: '여름', icon: '⛰️', color: '#2e7d32', desc: '산간 코스와 시원한 기후' },
      { name: '충청도', courses: ['안성CC', '체리CC', '보은CC', '반돌아CC'], season: '봄/가을', icon: '🌾', color: '#f57c00', desc: '북중부 접근성 좋은 코스' },
      { name: '경상도', courses: ['경주CC', '무영CC', '은평CC', '남해CC'], season: '가을', icon: '🏯', color: '#c62828', desc: '역사적 정운의 코스' },
      { name: '전라도', courses: ['나인브릿지', '미리내CC', '해남CC', '무등CC'], season: '봄', icon: '🌺', color: '#6a1b9a', desc: '일조량이 많고 따뜻한 남부' },
      { name: '수도권', courses: ['남서울CC', '레이크힐GC', '베어즈타운CC', '코리아CC'], season: '봄/가을', icon: '🏙️', color: '#1565c0', desc: '서울 근교 프리미엄 코스' },
      { name: '동남아(태국)', courses: ['알파인GC', '레오팔레스CC', '라차프루크CC', '사이암CC'], season: '겁외 12월-2월', icon: '🇹🇭', color: '#00695c', desc: '겁외 원정 코스 (비용효율적)' },
      { name: '일본', courses: ['카와나GC', '퇠계CC', '바이론CC', '오키나와GC'], season: '봄/가을', icon: '🇯🇵', color: '#d32f2f', desc: '겁외 평일 라운드 경험' }
    ];

    body.innerHTML = `
      <p style="font-size:13px;color:var(--text-muted);margin-bottom:12px">지역별 추천 코스와 최적 시즘을 확인하세요.</p>
      <div class="sg29-tabs" id="travelTabs"></div>
      <div id="travelContent"></div>
    `;

    let selRegion = 0;
    function render() {
      document.getElementById('travelTabs').innerHTML = regions.map((r, i) =>
        `<div class="sg29-tab ${i === selRegion ? 'active' : ''}" data-i="${i}">${r.icon} ${r.name}</div>`
      ).join('');

      document.querySelectorAll('#travelTabs .sg29-tab').forEach(tab => {
        tab.onclick = () => { selRegion = parseInt(tab.dataset.i); render(); SFX.travel_plan(); };
      });

      const reg = regions[selRegion];
      document.getElementById('travelContent').innerHTML = `
        <div class="sg29-card" style="border-left:4px solid ${reg.color};cursor:default">
          <div class="sg29-card-title" style="color:${reg.color}">${reg.icon} ${reg.name} 골프 여행</div>
          <div class="sg29-card-desc">${reg.desc}</div>
          <div style="margin-top:8px"><span class="sg29-badge sg29-badge-green">최적 시즘: ${reg.season}</span></div>
        </div>
        <div style="font-weight:700;font-size:13px;margin:12px 0 8px">⛳ 추천 코스</div>
        ${reg.courses.map((c, i) => `
          <div class="sg29-card" style="cursor:default">
            <div class="sg29-card-title"><span class="sg29-badge sg29-badge-purple">${i + 1}</span> ${c}</div>
          </div>
        `).join('')}
        <div style="margin-top:12px;padding:12px;background:var(--bg);border-radius:12px;border:1px solid var(--border)">
          <div style="font-weight:700;font-size:13px;margin-bottom:6px">💡 여행 팁</div>
          <ul style="font-size:12px;color:var(--text-muted);line-height:1.8;margin:0;padding-left:16px">
            <li>예약은 2주 전 확정 추천</li>
            <li>조회 이용 시 그린피 20-30% 절약</li>
            <li>렉터에 따른 장비 지참 준비</li>
          </ul>
        </div>
      `;
      checkAchieve('travel_explorer');
    }
    render();
  };

  // ========== 5. COURSE CONDITION LOGGER ==========
  SGV29.conditionLogger = function () {
    SFX.condition_open();
    const ov = document.getElementById('sg29condOv') || makeOverlay('sg29condOv');
    const body = makePanel(ov, '코스 컨디션 로거', '📝', 'linear-gradient(135deg,#2e7d32,#1b5e20)');
    ov.classList.add('active');

    const logs = LS('cond_logs') || [];

    body.innerHTML = `
      <p style="font-size:13px;color:var(--text-muted);margin-bottom:12px">코스 컨디션을 6요소로 평가하고 기록하세요.</p>
      <div class="sg29-card" style="cursor:default">
        <div class="sg29-card-title">⛳ 코스명</div>
        <input type="text" id="condCourse" placeholder="코스명 입력" style="width:100%;padding:8px;border:2px solid var(--border);border-radius:8px;font-size:14px;margin-top:4px;background:var(--card-bg);color:var(--text)">
      </div>
      <div style="font-weight:700;font-size:13px;margin:12px 0 8px">평가 항목 (1-10)</div>
      ${['greenSpeed|그린 스피드|🟫', 'fairway|페어웨이 상태|🏌️', 'rough|러프 상태|🌿', 'bunker|벙커 상태|⛱️', 'teeBox|티박스 상태|🟩', 'facilities|시설 상태|🏠'].map(item => {
        const [key, label, icon] = item.split('|');
        return `<div style="display:flex;align-items:center;gap:8px;padding:8px 0;border-bottom:1px solid var(--border)">
          <span style="font-size:16px">${icon}</span>
          <span style="font-size:13px;font-weight:600;flex:1">${label}</span>
          <input type="range" id="cond_${key}" min="1" max="10" value="7" style="width:100px;accent-color:#2e7d32">
          <span id="condV_${key}" style="font-weight:700;font-size:14px;min-width:24px;text-align:center">7</span>
        </div>`;
      }).join('')}
      <textarea id="condMemo" placeholder="메모 (선택)" rows="2" style="width:100%;padding:8px;border:2px solid var(--border);border-radius:8px;font-size:13px;margin-top:8px;resize:vertical;background:var(--card-bg);color:var(--text)"></textarea>
      <div style="text-align:center;margin-top:12px">
        <button class="sg29-btn sg29-btn-primary" id="condSave">💾 저장</button>
      </div>
      <div id="condHistory" style="margin-top:16px"></div>
    `;

    ['greenSpeed', 'fairway', 'rough', 'bunker', 'teeBox', 'facilities'].forEach(k => {
      const slider = document.getElementById('cond_' + k);
      const display = document.getElementById('condV_' + k);
      if (slider && display) {
        slider.oninput = () => { display.textContent = slider.value; };
      }
    });

    document.getElementById('condSave').onclick = () => {
      const course = document.getElementById('condCourse').value.trim();
      if (!course) return;
      const entry = {
        course,
        date: new Date().toLocaleDateString('ko-KR'),
        greenSpeed: parseInt(document.getElementById('cond_greenSpeed').value),
        fairway: parseInt(document.getElementById('cond_fairway').value),
        rough: parseInt(document.getElementById('cond_rough').value),
        bunker: parseInt(document.getElementById('cond_bunker').value),
        teeBox: parseInt(document.getElementById('cond_teeBox').value),
        facilities: parseInt(document.getElementById('cond_facilities').value),
        memo: document.getElementById('condMemo').value.trim()
      };
      entry.avg = Math.round((entry.greenSpeed + entry.fairway + entry.rough + entry.bunker + entry.teeBox + entry.facilities) / 6 * 10) / 10;
      logs.unshift(entry);
      if (logs.length > 50) logs.length = 50;
      LS('cond_logs', logs);
      renderHistory();
      SFX.condition_save();
      checkAchieve('condition_first');
      if (logs.length >= 10) checkAchieve('condition_10');
    };

    function renderHistory() {
      const el = document.getElementById('condHistory');
      if (!el) return;
      if (!logs.length) { el.innerHTML = '<div style="font-size:12px;color:var(--text-muted);padding:10px">아직 기록이 없습니다</div>'; return; }
      el.innerHTML = '<div style="font-weight:700;font-size:13px;margin-bottom:8px">📄 최근 기록</div>' +
        logs.slice(0, 10).map(l => {
          const grade = l.avg >= 8.5 ? 'S' : l.avg >= 7 ? 'A' : l.avg >= 5.5 ? 'B' : l.avg >= 4 ? 'C' : 'D';
          const gc = { S: '#ffd700', A: '#4caf50', B: '#2196f3', C: '#ff9800', D: '#f44336' }[grade];
          return `<div class="sg29-card" style="cursor:default">
            <div class="sg29-card-title">${l.course} <span class="sg29-badge" style="background:${gc}22;color:${gc}">${grade} (${l.avg})</span></div>
            <div class="sg29-card-desc">${l.date}${l.memo ? ' — ' + l.memo : ''}</div>
          </div>`;
        }).join('');
    }
    renderHistory();
  };

  // ========== 6. MENTAL GAME WORKSHOP ==========
  SGV29.mentalWorkshop = function () {
    SFX.mental_open();
    const ov = document.getElementById('sg29mentalOv') || makeOverlay('sg29mentalOv');
    const body = makePanel(ov, '멘탈 게임 워크샵', '🧠', 'linear-gradient(135deg,#00695c,#004d40)');
    ov.classList.add('active');

    const techniques = [
      { name: '프리샷 호흡법', icon: '🌬️', desc: '샷 전 4초 흩싴-4초 참기-4초 내쉴기. 심녉 안정화와 집중력 향상.', type: 'breathe' },
      { name: '시각화 훈련', icon: '👁️', desc: '샷을 치기 전 탄도, 램딩, 구르는 볼을 상상하세요. 뇌가 근육을 미리 프로그래밍합니다.', type: 'guide' },
      { name: '자기대화', icon: '💬', desc: '부정적 자기대화를 기회로 바꾸세요. &quot;여기서 OB내면 어쩌지&quot; → &quot;페어웨이 중앙을 노리자&quot;', type: 'guide' },
      { name: '프레셔 전환 기법', icon: '💡', desc: '압박감을 도전으로 전환하세요. &quot;나는 이 상황을 즐긴다&quot;라고 말하세요.', type: 'guide' },
      { name: '박스 호흡법', icon: '🔲', desc: '4초 흩싴-7초 참기-8초 내쉴기. 대회 전날 수면과 심적 안정에 효과적.', type: 'breathe478' },
      { name: '마인드풀니스 스캔', icon: '🧘', desc: '발끝부터 머리끝까지 근육을 순차적으로 스캔하며 긴장을 풀어보세요.', type: 'guide' }
    ];

    body.innerHTML = `
      <p style="font-size:13px;color:var(--text-muted);margin-bottom:12px">6가지 멘탈 기법으로 라운드 중 심리적 안정을 유지하세요.</p>
      ${techniques.map((t, i) => `
        <div class="sg29-card" id="mentalCard${i}">
          <div class="sg29-card-title">${t.icon} ${t.name} <span class="sg29-badge sg29-badge-teal">${t.type === 'breathe' || t.type === 'breathe478' ? '호흡' : '가이드'}</span></div>
          <div class="sg29-card-desc">${t.desc}</div>
          ${t.type === 'breathe' || t.type === 'breathe478' ? `<div style="text-align:center;margin-top:10px"><button class="sg29-btn sg29-btn-primary" style="background:#00695c" data-breathe="${t.type}" data-idx="${i}">🌬️ 호흡 시작</button></div>` : ''}
        </div>
      `).join('')}
      <div id="breatheArea" style="text-align:center;margin-top:12px;display:none">
        <div class="sg29-breathe-circle" id="breatheCircle">준비</div>
        <div id="breatheStatus" style="font-size:14px;font-weight:700;margin-top:12px;color:var(--text)"></div>
        <button class="sg29-btn sg29-btn-secondary" id="breatheStop" style="margin-top:8px">정지</button>
      </div>
    `;

    let breatheTimer = null;
    document.querySelectorAll('[data-breathe]').forEach(btn => {
      btn.onclick = () => {
        const type = btn.dataset.breathe;
        const area = document.getElementById('breatheArea');
        const circle = document.getElementById('breatheCircle');
        const status = document.getElementById('breatheStatus');
        area.style.display = 'block';

        if (breatheTimer) clearInterval(breatheTimer);
        let phase = 0, sec = 0;
        const phases = type === 'breathe478'
          ? [{ name: '흩싴기', dur: 4, cls: 'inhale' }, { name: '참기', dur: 7, cls: '' }, { name: '내쉴기', dur: 8, cls: 'exhale' }]
          : [{ name: '흩싴기', dur: 4, cls: 'inhale' }, { name: '참기', dur: 4, cls: '' }, { name: '내쉴기', dur: 4, cls: 'exhale' }];
        let cycles = 0;

        function tick() {
          const p = phases[phase];
          circle.className = 'sg29-breathe-circle ' + p.cls;
          circle.textContent = p.name;
          status.textContent = `${p.name} ${sec + 1}/${p.dur}초 | 사이클 ${cycles + 1}`;

          sec++;
          if (sec >= p.dur) {
            sec = 0;
            phase++;
            if (phase >= phases.length) { phase = 0; cycles++; }
            if (cycles >= 3) {
              clearInterval(breatheTimer);
              breatheTimer = null;
              circle.className = 'sg29-breathe-circle';
              circle.textContent = '완료';
              status.textContent = '3사이클 완료! 마음이 편안해졌나요?';
              SFX.mental_breathe();
              checkAchieve('mental_breathe');
              return;
            }
          }
          SFX.mental_breathe();
        }

        tick();
        breatheTimer = setInterval(tick, 1000);
      };
    });

    document.getElementById('breatheStop').onclick = () => {
      if (breatheTimer) { clearInterval(breatheTimer); breatheTimer = null; }
      document.getElementById('breatheArea').style.display = 'none';
    };

    checkAchieve('mental_open');
  };

  // ========== 7. SHOT MAKING GUIDE ==========
  SGV29.shotGuide = function () {
    SFX.shot_open();
    const ov = document.getElementById('sg29shotOv') || makeOverlay('sg29shotOv');
    const body = makePanel(ov, '샷 메이킹 가이드', '🎯', 'linear-gradient(135deg,#c62828,#b71c1c)');
    ov.classList.add('active');

    const shots = [
      { name: '스트레이트', icon: '↔️', path: 'straight', desc: '목표를 향해 일직선으로 비행. 기본 중의 기본.', tip: '얼라인먼트를 정확히 하고, 클럽페이스를 스퀘어로 유지' },
      { name: '드로우', icon: '↩️', path: 'draw', desc: '오른쪽으로 출발하여 왼쪽으로 휴어지는 샷 (오른손잡이).', tip: '클로즈드 페이스 + 인사이드-아웃 스윙 패스' },
      { name: '페이드', icon: '↪️', path: 'fade', desc: '왼쪽으로 출발하여 오른쪽으로 휴어지는 샷.', tip: '오픈 페이스 + 아웃사이드-인 스윙 패스' },
      { name: '로우 드로우', icon: '⬇️', path: 'low', desc: '낮은 탄도의 드로우. 바람이 강할 때 효과적.', tip: '볼 위치를 뒤로, 손을 앞으로, 팔로스루 줄이기' },
      { name: '하이 페이드', icon: '⬆️', path: 'high', desc: '높은 탄도로 올라가며 오른쪽으로 휴어지는 샷.', tip: '볼을 앞으로, 오픈 페이스로 높이 올리기' },
      { name: '펄 샷', icon: '🪨', path: 'pull', desc: '목표 왼쪽으로 일직선 비행. 수비침반 포지션 대응.', tip: '클로즈드 스탠스, 그립 압력 조절' },
      { name: '푸시 샷', icon: '🥏', path: 'push', desc: '목표 오른쪽으로 일직선 비행.', tip: '오픈 스탠스와 전방 압력' },
      { name: '릴백 샷', icon: '🔄', path: 'release', desc: '핸드릴리스를 강조하여 강한 드로우 생성.', tip: '임팩트 시 손목 턴오버 강조' },
      { name: '폭스리 플롭', icon: '🏈', path: 'flop', desc: '높이 띄우고 램딩 후 즉시 멈추는 샷.', tip: '오픈 페이스, 양손 릴리스, 로프트 60°+' },
      { name: '노크다운', icon: '🎳', path: 'knockdown', desc: '바람 아래로 낮게 나는 컨트롤 샷.', tip: '짧은 팔로스루, 볼 뒤광, 클럽 1-2번 더' }
    ];

    let selShot = 0;

    body.innerHTML = `
      <p style="font-size:13px;color:var(--text-muted);margin-bottom:12px">10종 샷 쉘이프와 탄도를 시각적으로 학습하세요.</p>
      <div class="sg29-tabs" id="shotTabs"></div>
      <div class="sg29-canvas-wrap"><canvas id="shotCanvas" width="560" height="300"></canvas></div>
      <div id="shotInfo"></div>
    `;

    function render() {
      document.getElementById('shotTabs').innerHTML = shots.map((s, i) =>
        `<div class="sg29-tab ${i === selShot ? 'active' : ''}" data-i="${i}">${s.icon} ${s.name}</div>`
      ).join('');
      document.querySelectorAll('#shotTabs .sg29-tab').forEach(tab => {
        tab.onclick = () => { selShot = parseInt(tab.dataset.i); render(); SFX.shot_trace(); };
      });
      drawShot();
      const s = shots[selShot];
      document.getElementById('shotInfo').innerHTML = `
        <div class="sg29-card" style="border-left:4px solid #c62828;cursor:default">
          <div class="sg29-card-title">${s.icon} ${s.name}</div>
          <div class="sg29-card-desc">${s.desc}</div>
          <div style="margin-top:8px;padding:8px;background:var(--bg);border-radius:8px;font-size:12px">
            <strong>💡 팁:</strong> ${s.tip}
          </div>
        </div>
      `;
      checkAchieve('shot_student');
    }

    function drawShot() {
      const c = document.getElementById('shotCanvas');
      if (!c) return;
      const ctx = c.getContext('2d');
      const dk = isDark();
      ctx.clearRect(0, 0, 560, 300);

      ctx.fillStyle = dk ? '#1b3a25' : '#c8e6c9';
      ctx.fillRect(0, 200, 560, 100);
      ctx.fillStyle = dk ? '#0d47a1' : '#bbdefb';
      ctx.fillRect(0, 0, 560, 200);

      ctx.fillStyle = dk ? '#1e1e1e' : '#fff';
      ctx.beginPath(); ctx.arc(530, 230, 8, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = '#f44336'; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.arc(530, 230, 8, 0, Math.PI * 2); ctx.stroke();

      const shot = shots[selShot];
      ctx.lineWidth = 3;
      ctx.strokeStyle = '#f44336';
      ctx.setLineDash([]);

      const sx = 50, sy = 230;
      ctx.beginPath();

      switch (shot.path) {
        case 'straight':
          ctx.moveTo(sx, sy);
          ctx.quadraticCurveTo(280, 60, 530, 230);
          break;
        case 'draw':
          ctx.moveTo(sx, sy);
          ctx.bezierCurveTo(150, 100, 400, 30, 530, 230);
          break;
        case 'fade':
          ctx.moveTo(sx, sy);
          ctx.bezierCurveTo(150, 100, 350, 180, 530, 230);
          break;
        case 'low':
          ctx.moveTo(sx, sy);
          ctx.quadraticCurveTo(280, 140, 530, 230);
          break;
        case 'high':
          ctx.moveTo(sx, sy);
          ctx.bezierCurveTo(150, -20, 400, 30, 530, 230);
          break;
        case 'pull':
          ctx.moveTo(sx, sy);
          ctx.quadraticCurveTo(200, 70, 460, 200);
          break;
        case 'push':
          ctx.moveTo(sx, sy);
          ctx.quadraticCurveTo(350, 70, 560, 180);
          break;
        case 'release':
          ctx.moveTo(sx, sy);
          ctx.bezierCurveTo(120, 80, 380, 20, 520, 240);
          break;
        case 'flop':
          ctx.moveTo(sx, sy);
          ctx.bezierCurveTo(60, -30, 120, -20, 150, 220);
          break;
        case 'knockdown':
          ctx.moveTo(sx, sy);
          ctx.quadraticCurveTo(280, 160, 530, 230);
          break;
      }
      ctx.stroke();

      ctx.fillStyle = '#fff';
      ctx.beginPath(); ctx.arc(sx, sy, 5, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = '#333'; ctx.lineWidth = 1;
      ctx.stroke();

      ctx.fillStyle = dk ? '#ddd' : '#333';
      ctx.font = 'bold 14px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(shot.icon + ' ' + shot.name + ' 탄도', 280, 24);
    }

    render();
  };

  // ========== 8. GOLF ETIQUETTE MASTER ==========
  SGV29.etiquetteMaster = function () {
    SFX.etiquette_open();
    const ov = document.getElementById('sg29etiqOv') || makeOverlay('sg29etiqOv');
    const body = makePanel(ov, '골프 에티켓 마스터', '🎓', 'linear-gradient(135deg,#4a148c,#311b92)');
    ov.classList.add('active');

    const scenarios = [
      { q: '동반자가 샷을 치려고 할 때 어떻게 해야 할까요?', opts: ['조용히 서서 기다린다', '대화를 계속한다', '전화를 받는다'], correct: 0 },
      { q: '벙커에서 샷을 친 후 어떻게 해야 할까요?', opts: ['그냥 나온다', '레이크로 모래를 고른다', '발로 대충 메운다'], correct: 1 },
      { q: '그린에서 다른 사람의 퍼팅 라인을 밟으면?', opts: ['모르는 척한다', '사과하고 볼마크를 고친다', '빠르게 지나간다'], correct: 1 },
      { q: '앞 조가 느릴 때 어떻게 해야 할까요?', opts: ['큰 소리로 서두르라고 한다', '마샬에게 알리고 인내한다', '강제로 앞지른다'], correct: 1 },
      { q: '디봇 수리는 언제 하나요?', opts: ['라운드 끝나고', '그린 위에서 바로', '다음 홀 티박스에서'], correct: 1 },
      { q: '카트를 운전할 때 주의할 점은?', opts: ['그린 근처 진입 금지', '얼마든지 달려도 됨', '골프장 내 어디서든 운전 가능'], correct: 0 },
      { q: '다른 사람이 치는 동안 어디에 서야 하나요?', opts: ['매우 가까이', '타격자의 시야 밖, 조용히', '타격자 바로 뒤'], correct: 1 },
      { q: 'OB 가능성이 있을 때 어떻게 하나요?', opts: ['임시구를 친다 (프로비저널 볼)', '그냥 다음 홀로 간다', '버리고 새 볼로 친다'], correct: 0 },
      { q: '우레 소리가 들리면?', opts: ['계속 플레이한다', '낮은 자세로 엎드린다', '카트로 돌아간다'], correct: 1 },
      { q: '레디 골프(플레이 준비)란?', opts: ['자기 차례에 즉시 친다', '얰치기 이접 조건서를 정리해둔다', '조건서 없이 즉시 막 친다'], correct: 1 },
      { q: '동반자의 샷이 좋았을 때 어떻게 하나요?', opts: ['무시한다', '나이스 샷이라고 말한다', '질투한다'], correct: 1 },
      { q: '코스 관리원의 지시에 대해?', opts: ['무시해도 된다', '반드시 따라야 한다', '항의한다'], correct: 1 },
      { q: '플레이 속도가 느려질 때?', opts: ['앞조를 추월한다', '마샬에게 말하고 뒤조를 먼저 보낸다', '느리게 플레이한다'], correct: 1 },
      { q: '드레스코드는 왜 중요한가요?', opts: ['코스와 다른 플레이어에 대한 존중', '멋을 내기 위해', '규칙이 없다'], correct: 0 },
      { q: '핀을 빼고 꽂을 때 주의점은?', opts: ['피러버리면 된다', '핀 깃대 자국에 주의, 신중하게', '다른 사람이 해준다'], correct: 1 },
      { q: '등산로기는 어떻게 사용하나요?', opts: ['까리에 싸서 버리고 간다', '보이면 바로 막는다', '거리측정용으로만 사용'], correct: 2 },
      { q: '볼을 찾는 시간 제한은?', opts: ['5분', '3분', '무제한'], correct: 1 },
      { q: '티박스에서 연습 스윙은?', opts: ['허용되지 않는다', '마음껏 해도 된다', '안전한 방향으로 1회 허용'], correct: 2 },
      { q: '다른 홀에서 쳐진 걸 보면?', opts: ['퍼를 너머 주세요라고 큰 소리로 외친다', '조용히 기다렸다가 알려준다', '몰래 친다'], correct: 1 },
      { q: '아너 영예라는 무엇인가요?', opts: ['완벽한 스윙', '골프 규범을 정직하게 지키는 자세', '빠른 플레이'], correct: 1 }
    ];

    let current = 0, score = 0, answered = new Set();

    body.innerHTML = `
      <p style="font-size:13px;color:var(--text-muted);margin-bottom:12px">20가지 시나리오로 골프 에티켓을 마스터하세요.</p>
      <div class="sg29-grid2" style="margin-bottom:12px">
        <div class="sg29-stat"><div class="sg29-stat-val" id="etiqScore">0</div><div class="sg29-stat-label">점수</div></div>
        <div class="sg29-stat"><div class="sg29-stat-val" id="etiqProg" style="color:#4a148c">1/20</div><div class="sg29-stat-label">진행</div></div>
      </div>
      <div id="etiqContent"></div>
    `;

    function renderQ() {
      if (current >= scenarios.length) {
        const pct = Math.round((score / scenarios.length) * 100);
        const grade = pct >= 90 ? 'S' : pct >= 75 ? 'A' : pct >= 60 ? 'B' : pct >= 40 ? 'C' : 'D';
        document.getElementById('etiqContent').innerHTML = `
          <div style="text-align:center;padding:20px">
            <div style="font-size:48px;margin-bottom:12px">${pct >= 90 ? '🏆' : pct >= 60 ? '⭐' : '📚'}</div>
            <div style="font-size:24px;font-weight:800">${score}/${scenarios.length} (🏅 ${grade}등급)</div>
            <div style="font-size:14px;color:var(--text-muted);margin-top:8px">${pct >= 90 ? '완벽한 에티켓 마스터!' : pct >= 60 ? '좋은 매너를 가지고 있어요!' : '더 열심히 배워보세요!'}</div>
            <button class="sg29-btn sg29-btn-primary" style="margin-top:16px;background:#4a148c" onclick="document.getElementById('sg29etiqOv').classList.remove('active')">닫기</button>
          </div>
        `;
        if (pct >= 90) checkAchieve('etiquette_master');
        checkAchieve('etiquette_complete');
        return;
      }

      const s = scenarios[current];
      document.getElementById('etiqProg').textContent = (current + 1) + '/20';
      document.getElementById('etiqContent').innerHTML = `
        <div class="sg29-scenario">
          <div class="sg29-scenario-q">❓ ${s.q}</div>
          <div class="sg29-scenario-opts">
            ${s.opts.map((o, i) => `<div class="sg29-scenario-opt" data-i="${i}">${o}</div>`).join('')}
          </div>
        </div>
      `;

      document.querySelectorAll('.sg29-scenario-opt').forEach(opt => {
        opt.onclick = () => {
          if (answered.has(current)) return;
          answered.add(current);
          const idx = parseInt(opt.dataset.i);
          document.querySelectorAll('.sg29-scenario-opt').forEach((o, i) => {
            if (i === s.correct) o.classList.add('correct');
            else if (i === idx && idx !== s.correct) o.classList.add('wrong');
          });
          if (idx === s.correct) { score++; SFX.etiquette_correct(); }
          document.getElementById('etiqScore').textContent = score;
          setTimeout(() => { current++; renderQ(); }, 1200);
        };
      });
    }

    renderQ();
  };

  // ========== GOLF IQ v13 ==========
  SGV29.golfIQv13 = function () {
    SFX.quiz_v13();
    const ov = document.getElementById('sg29iqOv') || makeOverlay('sg29iqOv');
    const body = makePanel(ov, 'Golf IQ v13', '🧠', 'linear-gradient(135deg,#1a7a3a,#0f5a28)');
    ov.classList.add('active');

    const questions = [
      { q: '핵디캅 인덱스에서 &lsquo;슬로프 레이팅&rsquo;이란?', opts: ['코스 경사도', '코스 난이도 지표', '그린 속도', '페어웨이 유지율'], correct: 1 },
      { q: '스트로크 게인드(SG) 분석에서 가장 중요한 분야는?', opts: ['SG Off the Tee', 'SG Approach', 'SG Around the Green', 'SG Putting'], correct: 3 },
      { q: '스템프미터는 무엇을 측정하나요?', opts: ['바람 속도', '그린 스피드', '볼 바운스', '코스 길이'], correct: 1 },
      { q: '드라이버 헤드스피드 100mph일 때 예상 비거리는?', opts: ['200야드', '230야드', '250야드', '280야드'], correct: 2 },
      { q: 'GIR(Greens In Regulation)이란?', opts: ['그린 위 시간', '규정타수 이하로 그린 온', '그린 스피드', '그린 경사도'], correct: 1 },
      { q: '칼러웨이 디자인이란?', opts: ['코스 설계자의 의도대로 불리한 위치', '평탄한 코스', '쿠쉰이 많은 코스', '짧은 코스'], correct: 0 },
      { q: '분추간법(Fractional Swing)이란?', opts: ['풀 스윙의 일부만 사용하는 기법', '두 번 친다', '클럽을 분리한다', '왼손만 사용'], correct: 0 },
      { q: '퍼팅에서 &lsquo;에임포인트&rsquo;란?', opts: ['홈 컵 위치', '경사를 고려한 조준점', '볼의 위치', '그린 중앙'], correct: 1 },
      { q: '코스 레이팅 계산에서 보기 골퍼 기준은?', opts: ['남성 평균', '보기 골퍼(handicap 20-24)', '스크래치 골퍼', '프로 골퍼'], correct: 1 },
      { q: '스타츠프리 대회에서 포인트 계산법은?', opts: ['스트로크 플레이', '보기=2,파=0,버디=3 등의 포인트제', '매치 플레이', '스킨스 게임'], correct: 1 },
      { q: '카비티 드라이버(칼로웨이웩드) vs 검럼 웡드는?', opts: ['웡드가 더 멀리 나간다', '칼로웨이웩드가 슬라이스 감소 효과', '둘 다 같다', '검럼이 더 비싸다'], correct: 1 },
      { q: '라운드 페이스 관리의 기본 원칙은?', opts: ['아무리 빨리', '4시간 18홀 기준, 앞조와 간격 유지', '2시간 안에 끝내기', '시간 무제한'], correct: 1 },
      { q: '퍼팅 시 대칭점(symmetry point)이란?', opts: ['그린의 중앙', '홀컵 대칭점에 조준하여 경사를 읽는 기법', '볼의 반대편', '퍼터의 바닥 중앙'], correct: 1 },
      { q: '먔니유어 샷 vs 실제 샷 차이의 핸들링 방법은?', opts: ['무시한다', '연습으로 실제 샷에 적용한다', '코치를 고용한다', '장비를 바꾼다'], correct: 1 },
      { q: '골프 에티켓에서 &lsquo;아너&rsquo;란?', opts: ['완벽한 스윙', '친절함', '골프 규범을 정직하게 지키는 정신', '공격적 플레이'], correct: 2 }
    ];

    let qi = 0, qs = 0, qAnswered = new Set();

    body.innerHTML = `
      <p style="font-size:13px;color:var(--text-muted);margin-bottom:12px">Golf IQ v13 - 15문항 골프 지식 테스트</p>
      <div class="sg29-grid2" style="margin-bottom:12px">
        <div class="sg29-stat"><div class="sg29-stat-val" id="iqScore">0</div><div class="sg29-stat-label">점수</div></div>
        <div class="sg29-stat"><div class="sg29-stat-val" id="iqProg" style="color:#1a7a3a">1/15</div><div class="sg29-stat-label">진행</div></div>
      </div>
      <div id="iqContent"></div>
    `;

    function renderIQ() {
      if (qi >= questions.length) {
        const pct = Math.round((qs / questions.length) * 100);
        const grade = pct >= 90 ? 'S' : pct >= 75 ? 'A' : pct >= 60 ? 'B' : pct >= 40 ? 'C' : 'D';
        document.getElementById('iqContent').innerHTML = `
          <div style="text-align:center;padding:20px">
            <div style="font-size:48px">${pct >= 90 ? '🧠' : pct >= 60 ? '⭐' : '📚'}</div>
            <div style="font-size:24px;font-weight:800;margin:12px 0">Golf IQ: ${qs}/${questions.length} (${grade})</div>
            <div style="font-size:14px;color:var(--text-muted)">${pct >= 90 ? '골프 지식 마스터!' : pct >= 60 ? '좋은 지식입니다!' : '더 배워보세요!'}</div>
          </div>
        `;
        if (pct >= 90) checkAchieve('iq_v13_perfect');
        checkAchieve('iq_v13_complete');
        return;
      }

      const q = questions[qi];
      document.getElementById('iqProg').textContent = (qi + 1) + '/15';
      document.getElementById('iqContent').innerHTML = `
        <div class="sg29-scenario">
          <div class="sg29-scenario-q">${qi + 1}. ${q.q}</div>
          <div class="sg29-scenario-opts">
            ${q.opts.map((o, i) => `<div class="sg29-scenario-opt" data-i="${i}">${o}</div>`).join('')}
          </div>
        </div>
      `;

      document.querySelectorAll('.sg29-scenario-opt').forEach(opt => {
        opt.onclick = () => {
          if (qAnswered.has(qi)) return;
          qAnswered.add(qi);
          const idx = parseInt(opt.dataset.i);
          document.querySelectorAll('.sg29-scenario-opt').forEach((o, i) => {
            if (i === q.correct) o.classList.add('correct');
            else if (i === idx && idx !== q.correct) o.classList.add('wrong');
          });
          if (idx === q.correct) { qs++; SFX.quiz_correct13(); }
          document.getElementById('iqScore').textContent = qs;
          setTimeout(() => { qi++; renderIQ(); }, 1000);
        };
      });
    }

    renderIQ();
  };

  // ========== ACHIEVEMENTS ==========
  const ACHIEVEMENTS = [
    { id: 'hcp_first', name: '핵디캅 첫 기록', icon: '⛳', desc: '핵디캅을 처음으로 기록했습니다' },
    { id: 'hcp_10', name: '핵디캅 10회 기록', icon: '📊', desc: '핵디캅을 10회 이상 기록했습니다' },
    { id: 'hcp_goal_reached', name: '목표 핵디캅 달성', icon: '🏆', desc: '목표 핵디캅을 달성했습니다' },
    { id: 'pace_complete', name: '18홀 페이스 완료', icon: '⏱️', desc: '18홀 페이스 타이머를 완료했습니다' },
    { id: 'fitting_first', name: '클럽 피팅 분석', icon: '🔧', desc: '클럽 피팅 분석을 처음 실행했습니다' },
    { id: 'travel_explorer', name: '골프 여행 탐험가', icon: '✈️', desc: '골프 여행 플래너를 탐색했습니다' },
    { id: 'condition_first', name: '컨디션 첫 기록', icon: '📝', desc: '코스 컨디션을 처음 기록했습니다' },
    { id: 'condition_10', name: '컨디션 10회 기록', icon: '📚', desc: '컨디션을 10회 이상 기록했습니다' },
    { id: 'mental_open', name: '멘탈 워크샵 입장', icon: '🧠', desc: '멘탈 게임 워크샵을 열었습니다' },
    { id: 'mental_breathe', name: '호흡 마스터', icon: '🌬️', desc: '호흡 연습을 완료했습니다' },
    { id: 'shot_student', name: '샷 메이킹 학생', icon: '🎯', desc: '샷 메이킹 가이드를 확인했습니다' },
    { id: 'etiquette_complete', name: '에티켓 테스트 완료', icon: '🎓', desc: '에티켓 테스트를 완료했습니다' },
    { id: 'etiquette_master', name: '에티켓 마스터', icon: '👑', desc: '에티켓 테스트에서 90% 이상 획득' },
    { id: 'iq_v13_complete', name: 'Golf IQ v13 완료', icon: '🧠', desc: 'Golf IQ v13을 완료했습니다' },
    { id: 'iq_v13_perfect', name: 'Golf IQ v13 만점', icon: '💎', desc: 'Golf IQ v13에서 만점을 획득했습니다' }
  ];

  function checkAchieve(id) {
    const achieved = LS('achievements29') || [];
    if (achieved.includes(id)) return;
    achieved.push(id);
    LS('achievements29', achieved);
    const a = ACHIEVEMENTS.find(x => x.id === id);
    if (!a) return;
    SFX.achieve_v29();
    const toast = document.createElement('div');
    toast.style.cssText = 'position:fixed;top:20px;left:50%;transform:translateX(-50%);z-index:9999;background:linear-gradient(135deg,#ffd700,#ffb300);color:#333;padding:12px 24px;border-radius:12px;font-size:14px;font-weight:700;box-shadow:0 4px 20px rgba(0,0,0,.3);animation:sg29SlideUp .3s';
    toast.textContent = a.icon + ' ' + a.name + ' 해금!';
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2500);
  }

  // ========== KEYBOARD SHORTCUTS ==========
  document.addEventListener('keydown', e => {
    if (['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)) return;
    if (!e.shiftKey) return;
    const map = {
      'H': SGV29.handicapTracker,
      'P': SGV29.paceTimer,
      'F': SGV29.clubFitting,
      'T': SGV29.travelPlanner,
      'L': SGV29.conditionLogger,
      'M': SGV29.mentalWorkshop,
      'S': SGV29.shotGuide,
      'E': SGV29.etiquetteMaster
    };
    if (map[e.key]) { e.preventDefault(); map[e.key](); }
  });

  // ========== BOTTOM BAR ==========
  function initBottomBar() {
    const bar = document.createElement('div');
    bar.className = 'sg29-bottom-bar';
    const btns = [
      { icon: '⛳', label: '핵디캅', fn: 'handicapTracker' },
      { icon: '⏱️', label: '페이스', fn: 'paceTimer' },
      { icon: '🔧', label: '피팅', fn: 'clubFitting' },
      { icon: '✈️', label: '여행', fn: 'travelPlanner' },
      { icon: '📝', label: '컨디션', fn: 'conditionLogger' },
      { icon: '🧠', label: '멘탈', fn: 'mentalWorkshop' },
      { icon: '🎯', label: '샷가이드', fn: 'shotGuide' },
      { icon: '🎓', label: '에티켓', fn: 'etiquetteMaster' },
      { icon: '🧠', label: 'IQ v13', fn: 'golfIQv13' }
    ];
    bar.innerHTML = btns.map(b => `<div class="sg29-bbtn" data-fn="${b.fn}"><span class="sg29-bbtn-icon">${b.icon}</span><span class="sg29-bbtn-label">${b.label}</span></div>`).join('');
    bar.querySelectorAll('.sg29-bbtn').forEach(b => {
      b.addEventListener('click', () => { if (SGV29[b.dataset.fn]) SGV29[b.dataset.fn](); });
    });
    document.body.appendChild(bar);
    document.body.style.paddingBottom = '72px';
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initBottomBar);
  else initBottomBar();

  window.SGV29 = SGV29;
})();
