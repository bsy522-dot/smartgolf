// SmartGolf v6.0 Patch Module - 홀별스코어카드+핸디캡+캘린더+성적추이+용어사전+전략가이드+테마+SEO+접근성
(function() {
'use strict';

// ===================== CSS Injection =====================
const v6CSS = document.createElement('style');
v6CSS.textContent = `
/* === v6.0 Scorecard System === */
.scorecard-overlay { display:none; position:fixed; top:0; left:0; right:0; bottom:0; background:rgba(0,0,0,0.6); z-index:250; align-items:center; justify-content:center; padding:12px; }
.scorecard-overlay.active { display:flex; }
.scorecard-modal { background:var(--card-bg); border-radius:var(--radius); max-width:800px; width:100%; max-height:90vh; overflow-y:auto; box-shadow:0 20px 60px rgba(0,0,0,0.35); }
.sc-header { padding:16px 20px; border-bottom:1px solid var(--border); display:flex; justify-content:space-between; align-items:center; }
.sc-header h2 { font-size:17px; font-weight:800; color:var(--primary); }
.sc-close { background:none; border:none; font-size:22px; cursor:pointer; color:var(--text-muted); }
.sc-body { padding:16px 20px; }
.sc-course-select { width:100%; padding:10px 12px; border:2px solid var(--border); border-radius:8px; font-size:14px; margin-bottom:12px; background:var(--card-bg); color:var(--text); }
.sc-course-select:focus { border-color:var(--primary); outline:none; }
.sc-date-row { display:flex; gap:10px; margin-bottom:12px; align-items:center; }
.sc-date-row input { padding:8px 12px; border:2px solid var(--border); border-radius:8px; font-size:13px; background:var(--card-bg); color:var(--text); }
.sc-date-row input:focus { border-color:var(--primary); outline:none; }
.sc-table-wrap { overflow-x:auto; margin:12px 0; }
.sc-table { width:100%; border-collapse:collapse; font-size:12px; min-width:600px; }
.sc-table th { background:var(--primary); color:white; padding:6px 4px; text-align:center; font-size:11px; white-space:nowrap; }
.sc-table td { padding:5px 3px; text-align:center; border-bottom:1px solid var(--border); }
.sc-table .sc-hole-num { font-weight:800; color:var(--primary); width:30px; }
.sc-table input[type="number"] { width:44px; padding:4px 2px; border:1px solid var(--border); border-radius:4px; text-align:center; font-size:12px; font-weight:700; background:var(--card-bg); color:var(--text); }
.sc-table input[type="number"]:focus { border-color:var(--primary); outline:none; }
.sc-table .sc-par { color:var(--text-muted); font-weight:600; }
.sc-table .sc-subtotal { font-weight:800; background:var(--primary-light); }
.sc-table .sc-total-row td { font-weight:800; font-size:13px; background:var(--primary-light); }
.sc-birdie { background:#e8f5e9 !important; color:#2e7d32 !important; }
.sc-eagle { background:#c8e6c9 !important; color:#1b5e20 !important; }
.sc-bogey { background:#fff3e0 !important; color:#e65100 !important; }
.sc-double { background:#fce4ec !important; color:#c62828 !important; }
[data-theme="dark"] .sc-birdie { background:#1a3a25 !important; color:#81c784 !important; }
[data-theme="dark"] .sc-eagle { background:#0a2a15 !important; color:#a5d6a7 !important; }
[data-theme="dark"] .sc-bogey { background:#3a2a1a !important; color:#ffb74d !important; }
[data-theme="dark"] .sc-double { background:#3a1a1a !important; color:#ef9a9a !important; }
.sc-actions { display:flex; gap:8px; margin-top:12px; flex-wrap:wrap; }
.sc-btn { padding:9px 18px; border:none; border-radius:8px; font-size:13px; font-weight:600; cursor:pointer; display:flex; align-items:center; gap:5px; }
.sc-btn-save { background:var(--primary); color:white; }
.sc-btn-save:hover { background:var(--primary-dark); }
.sc-btn-clear { background:#f5f5f5; color:var(--text-muted); border:1px solid var(--border); }
[data-theme="dark"] .sc-btn-clear { background:#2a2a2a; color:#ccc; border-color:#444; }
.sc-summary { margin-top:14px; display:grid; grid-template-columns:repeat(auto-fit, minmax(120px,1fr)); gap:8px; }
.sc-stat-card { background:var(--primary-light); border-radius:8px; padding:10px; text-align:center; }
.sc-stat-card .sc-stat-num { font-size:20px; font-weight:800; color:var(--primary); }
.sc-stat-card .sc-stat-label { font-size:10px; color:var(--text-muted); margin-top:2px; }
[data-theme="dark"] .sc-stat-card { background:#1a3a25; }

/* === v6.0 Handicap === */
.handicap-section { max-width:1400px; margin:0 auto; padding:4px 20px 8px; }
.handicap-card { background:linear-gradient(135deg, var(--primary-dark), var(--primary)); color:white; border-radius:var(--radius); padding:14px 18px; display:flex; align-items:center; gap:16px; box-shadow:var(--shadow); }
.hc-index { font-size:36px; font-weight:900; line-height:1; }
.hc-label { font-size:11px; opacity:0.85; }
.hc-detail { font-size:12px; opacity:0.9; display:flex; gap:14px; }
.hc-detail span { display:flex; align-items:center; gap:4px; }
.hc-info { flex:1; }
.hc-title { font-size:13px; font-weight:700; margin-bottom:4px; display:flex; align-items:center; gap:6px; }

/* === v6.0 Calendar === */
.cal-overlay { display:none; position:fixed; top:0; left:0; right:0; bottom:0; background:rgba(0,0,0,0.6); z-index:250; align-items:center; justify-content:center; padding:12px; }
.cal-overlay.active { display:flex; }
.cal-modal { background:var(--card-bg); border-radius:var(--radius); max-width:500px; width:100%; max-height:85vh; overflow-y:auto; box-shadow:0 20px 60px rgba(0,0,0,0.35); }
.cal-header { padding:16px 20px; border-bottom:1px solid var(--border); display:flex; justify-content:space-between; align-items:center; }
.cal-header h2 { font-size:17px; font-weight:800; }
.cal-nav { display:flex; gap:8px; align-items:center; padding:12px 20px; }
.cal-nav button { padding:6px 12px; border:1px solid var(--border); border-radius:6px; background:var(--card-bg); color:var(--text); cursor:pointer; font-size:13px; }
.cal-nav button:hover { background:var(--primary-light); }
.cal-nav .cal-month { font-size:15px; font-weight:700; flex:1; text-align:center; }
.cal-grid { display:grid; grid-template-columns:repeat(7,1fr); gap:2px; padding:0 20px 16px; }
.cal-day-header { text-align:center; font-size:11px; font-weight:700; color:var(--text-muted); padding:4px; }
.cal-day { text-align:center; padding:6px 2px; border-radius:6px; font-size:12px; min-height:36px; cursor:default; position:relative; }
.cal-day.today { background:var(--primary-light); font-weight:700; }
.cal-day.has-round { cursor:pointer; }
.cal-day.has-round::after { content:''; position:absolute; bottom:2px; left:50%; transform:translateX(-50%); width:6px; height:6px; background:var(--primary); border-radius:50%; }
.cal-day.has-round:hover { background:var(--primary-light); }
.cal-day .cal-score { font-size:10px; font-weight:700; color:var(--primary); display:block; }
.cal-day.other-month { color:var(--border); }
.cal-day.sunday { color:#c62828; }
.cal-day.saturday { color:#1565c0; }

/* === v6.0 Score Trend Chart === */
.trend-section { max-width:1400px; margin:0 auto; padding:4px 20px 8px; }
.trend-card { background:var(--card-bg); border-radius:var(--radius); padding:14px 18px; box-shadow:var(--shadow); }
.trend-title { font-size:13px; font-weight:700; color:var(--text-muted); margin-bottom:8px; display:flex; align-items:center; gap:6px; }
.trend-svg { width:100%; height:180px; display:block; }
.trend-svg text { fill:var(--text-muted); font-size:10px; }
.trend-svg .trend-line { fill:none; stroke:var(--primary); stroke-width:2; stroke-linecap:round; stroke-linejoin:round; }
.trend-svg .trend-area { fill:rgba(26,122,58,0.1); }
.trend-svg .trend-dot { fill:var(--primary); }
.trend-svg .trend-avg { stroke:var(--accent); stroke-width:1; stroke-dasharray:4,4; }
.trend-svg .trend-grid { stroke:var(--border); stroke-width:0.5; }
.trend-empty { text-align:center; padding:30px; color:var(--text-muted); font-size:13px; }

/* === v6.0 Glossary === */
.glossary-overlay { display:none; position:fixed; top:0; left:0; right:0; bottom:0; background:rgba(0,0,0,0.6); z-index:250; align-items:center; justify-content:center; padding:12px; }
.glossary-overlay.active { display:flex; }
.glossary-modal { background:var(--card-bg); border-radius:var(--radius); max-width:550px; width:100%; max-height:85vh; overflow-y:auto; box-shadow:0 20px 60px rgba(0,0,0,0.35); }
.gl-search { width:calc(100% - 40px); margin:12px 20px; padding:10px 14px; border:2px solid var(--border); border-radius:8px; font-size:14px; background:var(--card-bg); color:var(--text); }
.gl-search:focus { border-color:var(--primary); outline:none; }
.gl-list { padding:0 20px 16px; }
.gl-item { padding:10px 0; border-bottom:1px solid var(--border); }
.gl-term { font-size:14px; font-weight:700; color:var(--primary); display:flex; align-items:center; gap:6px; }
.gl-term .gl-en { font-size:11px; font-weight:400; color:var(--text-muted); }
.gl-desc { font-size:12px; color:var(--text); margin-top:3px; line-height:1.5; }

/* === v6.0 Strategy Guide === */
.strategy-overlay { display:none; position:fixed; top:0; left:0; right:0; bottom:0; background:rgba(0,0,0,0.6); z-index:250; align-items:center; justify-content:center; padding:12px; }
.strategy-overlay.active { display:flex; }
.strategy-modal { background:var(--card-bg); border-radius:var(--radius); max-width:600px; width:100%; max-height:85vh; overflow-y:auto; box-shadow:0 20px 60px rgba(0,0,0,0.35); }
.str-tabs { display:flex; gap:4px; padding:12px 20px; border-bottom:1px solid var(--border); }
.str-tab { padding:7px 14px; border-radius:20px; border:1px solid var(--border); background:transparent; color:var(--text-muted); font-size:12px; font-weight:600; cursor:pointer; }
.str-tab.active { background:var(--primary); color:white; border-color:var(--primary); }
.str-content { padding:16px 20px; }
.str-tip { margin-bottom:14px; padding:12px; background:var(--primary-light); border-radius:8px; border-left:3px solid var(--primary); }
[data-theme="dark"] .str-tip { background:#1a3a25; }
.str-tip-title { font-size:13px; font-weight:700; color:var(--primary); margin-bottom:4px; display:flex; align-items:center; gap:6px; }
.str-tip-desc { font-size:12px; color:var(--text); line-height:1.6; }

/* === v6.0 Theme Customizer === */
.theme-picker { display:flex; gap:4px; margin-left:4px; }
.theme-dot { width:18px; height:18px; border-radius:50%; cursor:pointer; border:2px solid rgba(255,255,255,0.3); transition:all 0.2s; }
.theme-dot:hover { transform:scale(1.2); }
.theme-dot.active { border-color:white; box-shadow:0 0 6px rgba(255,255,255,0.5); }
.theme-green { background:linear-gradient(135deg,#1a7a3a,#2e7d32); }
.theme-blue { background:linear-gradient(135deg,#1565c0,#1976d2); }
.theme-purple { background:linear-gradient(135deg,#6a1b9a,#8e24aa); }
.theme-orange { background:linear-gradient(135deg,#e65100,#f57c00); }
.theme-rose { background:linear-gradient(135deg,#880e4f,#c2185b); }
.theme-teal { background:linear-gradient(135deg,#00695c,#00897b); }

[data-color-theme="blue"] { --primary:#1565c0; --primary-dark:#0d47a1; --primary-light:#e3f2fd; }
[data-color-theme="blue"] .header { background:linear-gradient(135deg,#0d47a1,#1565c0) !important; }
[data-color-theme="blue"][data-theme="dark"] .header { background:linear-gradient(135deg,#0a2a5a,#0d47a1) !important; }
[data-color-theme="blue"][data-theme="dark"] { --primary-light:#0d1f3a; }
[data-color-theme="purple"] { --primary:#6a1b9a; --primary-dark:#4a148c; --primary-light:#f3e5f5; }
[data-color-theme="purple"] .header { background:linear-gradient(135deg,#4a148c,#6a1b9a) !important; }
[data-color-theme="purple"][data-theme="dark"] .header { background:linear-gradient(135deg,#1a0a2e,#4a148c) !important; }
[data-color-theme="purple"][data-theme="dark"] { --primary-light:#1a0a2e; }
[data-color-theme="orange"] { --primary:#e65100; --primary-dark:#bf360c; --primary-light:#fff3e0; }
[data-color-theme="orange"] .header { background:linear-gradient(135deg,#bf360c,#e65100) !important; }
[data-color-theme="orange"][data-theme="dark"] .header { background:linear-gradient(135deg,#3a1500,#bf360c) !important; }
[data-color-theme="orange"][data-theme="dark"] { --primary-light:#3a2a1a; }
[data-color-theme="rose"] { --primary:#c2185b; --primary-dark:#880e4f; --primary-light:#fce4ec; }
[data-color-theme="rose"] .header { background:linear-gradient(135deg,#880e4f,#c2185b) !important; }
[data-color-theme="rose"][data-theme="dark"] .header { background:linear-gradient(135deg,#2a0a1a,#880e4f) !important; }
[data-color-theme="rose"][data-theme="dark"] { --primary-light:#2a0a1a; }
[data-color-theme="teal"] { --primary:#00897b; --primary-dark:#00695c; --primary-light:#e0f2f1; }
[data-color-theme="teal"] .header { background:linear-gradient(135deg,#00695c,#00897b) !important; }
[data-color-theme="teal"][data-theme="dark"] .header { background:linear-gradient(135deg,#0a2a25,#00695c) !important; }
[data-color-theme="teal"][data-theme="dark"] { --primary-light:#0a2a25; }

/* v6.0 responsive additions */
@media (max-width:768px) {
  .sc-table { font-size:11px; }
  .sc-table input[type="number"] { width:38px; font-size:11px; }
  .handicap-card { flex-direction:column; text-align:center; }
  .hc-detail { justify-content:center; }
  .cal-grid { gap:1px; }
  .cal-day { font-size:11px; min-height:32px; padding:4px 1px; }
  .theme-picker { display:none; }
  .sc-summary { grid-template-columns:repeat(2,1fr); }
}
@media (max-width:480px) {
  .sc-modal { max-height:95vh; }
  .sc-table input[type="number"] { width:34px; padding:3px 1px; }
}
`;
document.head.appendChild(v6CSS);

// ===================== SEO / Meta Injection =====================
const metaTags = [
  {property:'og:title', content:'SmartGolf - 전국 590개 골프장 파인더'},
  {property:'og:description', content:'전국 590개 골프장 검색, AI 추천, 리뷰, 난이도, 스코어카드, 핸디캡, 캘린더, 성적 추이'},
  {property:'og:type', content:'website'},
  {name:'twitter:card', content:'summary_large_image'},
  {name:'twitter:title', content:'SmartGolf - 전국 골프장 파인더'},
  {name:'twitter:description', content:'590개 골프장 비교, AI 추천, 홀별 스코어카드, 핸디캡 자동 계산'}
];
metaTags.forEach(m => {
  if (!document.querySelector(`meta[${m.property?'property':'name'}="${m.property||m.name}"]`)) {
    const tag = document.createElement('meta');
    if (m.property) tag.setAttribute('property', m.property);
    if (m.name) tag.setAttribute('name', m.name);
    tag.setAttribute('content', m.content);
    document.head.appendChild(tag);
  }
});

const jsonLD = document.createElement('script');
jsonLD.type = 'application/ld+json';
jsonLD.textContent = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "SmartGolf",
  "description": "전국 590개 골프장 검색, AI 추천, 스코어카드, 핸디캡 계산기",
  "applicationCategory": "SportsApplication",
  "operatingSystem": "Web",
  "offers": {"@type": "Offer", "price": "0", "priceCurrency": "KRW"},
  "featureList": "골프장검색, AI추천, 스코어카드, 핸디캡, 캘린더, 성적추이, 용어사전, 전략가이드"
});
document.head.appendChild(jsonLD);

// ===================== Data & Storage =====================
const SC_KEY = 'sg_scorecards';
const HC_KEY = 'sg_handicap_rounds';

function getScorecards() { try { return JSON.parse(localStorage.getItem(SC_KEY)) || []; } catch { return []; } }
function saveScorecards(data) { localStorage.setItem(SC_KEY, JSON.stringify(data)); }

// Standard par for 18 holes
const STANDARD_PAR = [4,4,3,5,4,4,3,4,5, 4,3,5,4,4,3,4,5,4];

function calcHandicap() {
  const rounds = getAllRoundLogs();
  if (rounds.length < 3) return null;
  const scores = rounds.map(r => {
    if (r.holes && r.holes.length === 18) return r.holes.reduce((a,b) => a + (b||0), 0);
    return parseInt(r.s) || 0;
  }).filter(s => s > 0 && s < 200);
  if (scores.length < 3) return null;
  const recent = scores.slice(-20);
  const diffs = recent.map(s => s - 72);
  diffs.sort((a,b) => a - b);
  const take = Math.max(1, Math.floor(recent.length * 0.4));
  const best = diffs.slice(0, take);
  const avg = best.reduce((a,b) => a + b, 0) / best.length;
  const index = Math.max(0, avg * 0.96);
  return { index: index.toFixed(1), rounds: recent.length, best: Math.min(...scores), avg: (scores.reduce((a,b)=>a+b,0)/scores.length).toFixed(1) };
}

function getAllRoundLogs() {
  try {
    const logs = JSON.parse(localStorage.getItem('sg_roundlogs')) || {};
    const all = [];
    Object.keys(logs).forEach(name => {
      logs[name].forEach(r => all.push({ ...r, courseName: name }));
    });
    all.sort((a,b) => a.d.localeCompare(b.d));
    return all;
  } catch { return []; }
}

// ===================== Scorecard System =====================
function createScorecardModal() {
  const overlay = document.createElement('div');
  overlay.className = 'scorecard-overlay';
  overlay.id = 'scorecardOverlay';
  overlay.innerHTML = `
    <div class="scorecard-modal sc-modal">
      <div class="sc-header">
        <h2><i class="fas fa-golf-ball"></i> 홀별 스코어카드</h2>
        <button class="sc-close" id="scClose">&times;</button>
      </div>
      <div class="sc-body">
        <select class="sc-course-select" id="scCourseSelect">
          <option value="">골프장 선택...</option>
        </select>
        <div class="sc-date-row">
          <label style="font-size:12px;font-weight:600;color:var(--text-muted)">날짜:</label>
          <input type="date" id="scDate" />
          <label style="font-size:12px;font-weight:600;color:var(--text-muted);margin-left:8px">메모:</label>
          <input type="text" id="scMemo" placeholder="한줄 메모" style="flex:1" />
        </div>
        <div class="sc-table-wrap">
          <table class="sc-table">
            <thead>
              <tr>
                <th>홀</th>
                <th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>6</th><th>7</th><th>8</th><th>9</th>
                <th>OUT</th>
                <th>10</th><th>11</th><th>12</th><th>13</th><th>14</th><th>15</th><th>16</th><th>17</th><th>18</th>
                <th>IN</th><th>TOT</th>
              </tr>
            </thead>
            <tbody>
              <tr id="scParRow">
                <td class="sc-hole-num">PAR</td>
              </tr>
              <tr id="scScoreRow">
                <td class="sc-hole-num">SCORE</td>
              </tr>
              <tr id="scDiffRow">
                <td class="sc-hole-num">+/-</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="sc-actions">
          <button class="sc-btn sc-btn-save" id="scSave"><i class="fas fa-save"></i> 저장</button>
          <button class="sc-btn sc-btn-clear" id="scClear"><i class="fas fa-eraser"></i> 초기화</button>
        </div>
        <div class="sc-summary" id="scSummary"></div>
        <div id="scHistory" style="margin-top:16px"></div>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);

  const parRow = document.getElementById('scParRow');
  const scoreRow = document.getElementById('scScoreRow');
  const diffRow = document.getElementById('scDiffRow');

  STANDARD_PAR.forEach((p, i) => {
    parRow.insertAdjacentHTML('beforeend', `<td class="sc-par">${p}</td>`);
    if (i === 8) parRow.insertAdjacentHTML('beforeend', `<td class="sc-subtotal sc-par" id="scParOut">36</td>`);
  });
  parRow.insertAdjacentHTML('beforeend', `<td class="sc-subtotal sc-par" id="scParIn">36</td><td class="sc-subtotal sc-par" id="scParTot">72</td>`);

  for (let i = 0; i < 18; i++) {
    scoreRow.insertAdjacentHTML('beforeend', `<td><input type="number" min="1" max="15" id="scH${i}" data-hole="${i}" /></td>`);
    if (i === 8) scoreRow.insertAdjacentHTML('beforeend', `<td class="sc-subtotal" id="scOut">-</td>`);
  }
  scoreRow.insertAdjacentHTML('beforeend', `<td class="sc-subtotal" id="scIn">-</td><td class="sc-subtotal" id="scTot">-</td>`);

  for (let i = 0; i < 18; i++) {
    diffRow.insertAdjacentHTML('beforeend', `<td id="scD${i}">-</td>`);
    if (i === 8) diffRow.insertAdjacentHTML('beforeend', `<td class="sc-subtotal" id="scDOut">-</td>`);
  }
  diffRow.insertAdjacentHTML('beforeend', `<td class="sc-subtotal" id="scDIn">-</td><td class="sc-subtotal" id="scDTot">-</td>`);

  document.getElementById('scDate').value = new Date().toISOString().slice(0, 10);

  if (typeof allCourses !== 'undefined') {
    const sel = document.getElementById('scCourseSelect');
    allCourses.forEach(c => {
      sel.insertAdjacentHTML('beforeend', `<option value="${c.n.replace(/"/g,'&quot;')}">${c.n} (${c.r||''})</option>`);
    });
  }

  for (let i = 0; i < 18; i++) {
    document.getElementById(`scH${i}`).addEventListener('input', updateScorecard);
  }

  document.getElementById('scClose').addEventListener('click', () => overlay.classList.remove('active'));
  overlay.addEventListener('click', e => { if (e.target === overlay) overlay.classList.remove('active'); });
  document.getElementById('scSave').addEventListener('click', saveScorecard);
  document.getElementById('scClear').addEventListener('click', clearScorecard);
}

function updateScorecard() {
  let outScore = 0, inScore = 0, outPar = 0, inPar = 0;
  let filled = 0;
  for (let i = 0; i < 18; i++) {
    const val = parseInt(document.getElementById(`scH${i}`).value) || 0;
    const par = STANDARD_PAR[i];
    const diffEl = document.getElementById(`scD${i}`);
    if (val > 0) {
      filled++;
      const d = val - par;
      diffEl.textContent = d > 0 ? `+${d}` : d === 0 ? 'E' : `${d}`;
      diffEl.className = '';
      if (d <= -2) diffEl.className = 'sc-eagle';
      else if (d === -1) diffEl.className = 'sc-birdie';
      else if (d === 1) diffEl.className = 'sc-bogey';
      else if (d >= 2) diffEl.className = 'sc-double';
      if (i < 9) { outScore += val; outPar += par; }
      else { inScore += val; inPar += par; }
    } else {
      diffEl.textContent = '-';
      diffEl.className = '';
      if (i < 9) outPar += par; else inPar += par;
    }
  }
  document.getElementById('scOut').textContent = outScore || '-';
  document.getElementById('scIn').textContent = inScore || '-';
  document.getElementById('scTot').textContent = (outScore + inScore) || '-';
  const totalDiff = (outScore + inScore) - 72;
  const dOut = outScore - outPar;
  const dIn = inScore - inPar;
  document.getElementById('scDOut').textContent = outScore ? (dOut > 0 ? `+${dOut}` : dOut === 0 ? 'E' : `${dOut}`) : '-';
  document.getElementById('scDIn').textContent = inScore ? (dIn > 0 ? `+${dIn}` : dIn === 0 ? 'E' : `${dIn}`) : '-';
  document.getElementById('scDTot').textContent = (outScore+inScore) ? (totalDiff > 0 ? `+${totalDiff}` : totalDiff === 0 ? 'E' : `${totalDiff}`) : '-';

  if (filled > 0) {
    let birdies=0, pars=0, bogeys=0, doubles=0, eagles=0;
    for (let i = 0; i < 18; i++) {
      const v = parseInt(document.getElementById(`scH${i}`).value) || 0;
      if (v <= 0) continue;
      const d = v - STANDARD_PAR[i];
      if (d <= -2) eagles++;
      else if (d === -1) birdies++;
      else if (d === 0) pars++;
      else if (d === 1) bogeys++;
      else doubles++;
    }
    document.getElementById('scSummary').innerHTML = `
      <div class="sc-stat-card"><div class="sc-stat-num" style="color:#1b5e20">${eagles}</div><div class="sc-stat-label">이글 이하</div></div>
      <div class="sc-stat-card"><div class="sc-stat-num" style="color:#2e7d32">${birdies}</div><div class="sc-stat-label">버디</div></div>
      <div class="sc-stat-card"><div class="sc-stat-num">${pars}</div><div class="sc-stat-label">파</div></div>
      <div class="sc-stat-card"><div class="sc-stat-num" style="color:#e65100">${bogeys}</div><div class="sc-stat-label">보기</div></div>
      <div class="sc-stat-card"><div class="sc-stat-num" style="color:#c62828">${doubles}</div><div class="sc-stat-label">더블보기+</div></div>
      <div class="sc-stat-card"><div class="sc-stat-num">${filled}/18</div><div class="sc-stat-label">입력 홀</div></div>
    `;
  }
}

function saveScorecard() {
  const course = document.getElementById('scCourseSelect').value;
  const date = document.getElementById('scDate').value;
  const memo = document.getElementById('scMemo').value;
  if (!course) { if (typeof showToast === 'function') showToast('골프장을 선택해주세요', 'warning'); return; }
  const holes = [];
  let total = 0;
  for (let i = 0; i < 18; i++) {
    const v = parseInt(document.getElementById(`scH${i}`).value) || 0;
    holes.push(v);
    total += v;
  }
  if (total === 0) { if (typeof showToast === 'function') showToast('스코어를 입력해주세요', 'warning'); return; }

  const cards = getScorecards();
  cards.push({ course, date, memo, holes, total, par: 72, created: Date.now() });
  saveScorecards(cards);

  if (typeof addRoundLog === 'function') {
    addRoundLog(course, date, total, memo || `홀별 스코어 ${total}타`);
  }

  renderScorecardHistory();
  renderHandicapSection();
  renderTrendSection();
  if (typeof showToast === 'function') showToast(`스코어카드 저장: ${course} ${total}타`, 'success');
}

function clearScorecard() {
  for (let i = 0; i < 18; i++) document.getElementById(`scH${i}`).value = '';
  updateScorecard();
  document.getElementById('scSummary').innerHTML = '';
}

function renderScorecardHistory() {
  const el = document.getElementById('scHistory');
  if (!el) return;
  const cards = getScorecards().slice(-5).reverse();
  if (cards.length === 0) { el.innerHTML = '<div style="text-align:center;color:var(--text-muted);font-size:12px;padding:10px">저장된 스코어카드가 없습니다</div>'; return; }
  el.innerHTML = `<div style="font-size:12px;font-weight:600;color:var(--text-muted);margin-bottom:8px"><i class="fas fa-history"></i> 최근 스코어카드</div>` +
    cards.map(c => {
      const diff = c.total - 72;
      const diffStr = diff > 0 ? `+${diff}` : diff === 0 ? 'E' : `${diff}`;
      return `<div style="padding:8px 10px;background:var(--primary-light);border-radius:6px;margin-bottom:4px;font-size:12px;display:flex;justify-content:space-between;align-items:center">
        <div><strong>${c.course}</strong> <span style="color:var(--text-muted)">${c.date}</span></div>
        <div><strong style="font-size:14px">${c.total}타</strong> <span style="color:${diff>0?'#c62828':diff<0?'#2e7d32':'var(--text-muted)'}">(${diffStr})</span></div>
      </div>`;
    }).join('');
}

// ===================== Handicap Section =====================
function renderHandicapSection() {
  let section = document.getElementById('handicapSection');
  if (!section) {
    section = document.createElement('div');
    section.className = 'handicap-section';
    section.id = 'handicapSection';
    const roundlogSec = document.getElementById('roundlogSection');
    if (roundlogSec) roundlogSec.parentNode.insertBefore(section, roundlogSec);
    else document.querySelector('.results-section')?.parentNode.insertBefore(section, document.querySelector('.results-section'));
  }
  const hc = calcHandicap();
  if (!hc) { section.style.display = 'none'; return; }
  section.style.display = 'block';
  section.innerHTML = `
    <div class="handicap-card">
      <div>
        <div class="hc-index">${hc.index}</div>
        <div class="hc-label">핸디캡 인덱스</div>
      </div>
      <div class="hc-info">
        <div class="hc-title"><i class="fas fa-chart-line"></i> 핸디캡 분석</div>
        <div class="hc-detail">
          <span><i class="fas fa-clipboard-list"></i> ${hc.rounds}라운드</span>
          <span><i class="fas fa-trophy"></i> 베스트 ${hc.best}타</span>
          <span><i class="fas fa-chart-bar"></i> 평균 ${hc.avg}타</span>
        </div>
      </div>
    </div>
  `;
}

// ===================== Calendar =====================
function createCalendarModal() {
  const overlay = document.createElement('div');
  overlay.className = 'cal-overlay';
  overlay.id = 'calOverlay';
  overlay.innerHTML = `
    <div class="cal-modal">
      <div class="cal-header">
        <h2><i class="fas fa-calendar-alt"></i> 라운드 캘린더</h2>
        <button class="sc-close" id="calClose">&times;</button>
      </div>
      <div class="cal-nav">
        <button id="calPrev"><i class="fas fa-chevron-left"></i></button>
        <div class="cal-month" id="calMonth"></div>
        <button id="calNext"><i class="fas fa-chevron-right"></i></button>
      </div>
      <div class="cal-grid" id="calGrid">
        <div class="cal-day-header sunday">일</div>
        <div class="cal-day-header">월</div>
        <div class="cal-day-header">화</div>
        <div class="cal-day-header">수</div>
        <div class="cal-day-header">목</div>
        <div class="cal-day-header">금</div>
        <div class="cal-day-header saturday">토</div>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);

  let calDate = new Date();

  function renderCalendar() {
    const y = calDate.getFullYear(), m = calDate.getMonth();
    document.getElementById('calMonth').textContent = `${y}년 ${m + 1}월`;
    const grid = document.getElementById('calGrid');
    grid.querySelectorAll('.cal-day').forEach(d => d.remove());

    const rounds = getAllRoundLogs();
    const roundMap = {};
    rounds.forEach(r => {
      if (!roundMap[r.d]) roundMap[r.d] = [];
      roundMap[r.d].push(r);
    });

    const firstDay = new Date(y, m, 1).getDay();
    const daysInMonth = new Date(y, m + 1, 0).getDate();
    const prevDays = new Date(y, m, 0).getDate();
    const today = new Date().toISOString().slice(0, 10);

    for (let i = firstDay - 1; i >= 0; i--) {
      grid.insertAdjacentHTML('beforeend', `<div class="cal-day other-month">${prevDays - i}</div>`);
    }
    for (let d = 1; d <= daysInMonth; d++) {
      const dateStr = `${y}-${String(m+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
      const isToday = dateStr === today;
      const dayOfWeek = new Date(y, m, d).getDay();
      const hasRound = roundMap[dateStr];
      let cls = 'cal-day';
      if (isToday) cls += ' today';
      if (hasRound) cls += ' has-round';
      if (dayOfWeek === 0) cls += ' sunday';
      if (dayOfWeek === 6) cls += ' saturday';
      const score = hasRound ? `<span class="cal-score">${hasRound[0].s}타</span>` : '';
      grid.insertAdjacentHTML('beforeend', `<div class="${cls}" title="${hasRound ? hasRound.map(r=>`${r.courseName||r.n||''} ${r.s}타`).join(', ') : ''}">${d}${score}</div>`);
    }
    const totalCells = firstDay + daysInMonth;
    const remaining = (7 - (totalCells % 7)) % 7;
    for (let i = 1; i <= remaining; i++) {
      grid.insertAdjacentHTML('beforeend', `<div class="cal-day other-month">${i}</div>`);
    }
  }

  document.getElementById('calPrev').addEventListener('click', () => { calDate.setMonth(calDate.getMonth() - 1); renderCalendar(); });
  document.getElementById('calNext').addEventListener('click', () => { calDate.setMonth(calDate.getMonth() + 1); renderCalendar(); });
  document.getElementById('calClose').addEventListener('click', () => overlay.classList.remove('active'));
  overlay.addEventListener('click', e => { if (e.target === overlay) overlay.classList.remove('active'); });

  renderCalendar();
  return { refresh: renderCalendar };
}

// ===================== Score Trend Chart (SVG) =====================
function renderTrendSection() {
  let section = document.getElementById('trendSection');
  if (!section) {
    section = document.createElement('div');
    section.className = 'trend-section';
    section.id = 'trendSection';
    const handicapSec = document.getElementById('handicapSection');
    if (handicapSec) handicapSec.parentNode.insertBefore(section, handicapSec.nextSibling);
    else {
      const roundlogSec = document.getElementById('roundlogSection');
      if (roundlogSec) roundlogSec.parentNode.insertBefore(section, roundlogSec);
    }
  }

  const rounds = getAllRoundLogs().filter(r => {
    const s = parseInt(r.s);
    return s > 0 && s < 200;
  });

  if (rounds.length < 2) {
    section.style.display = 'none';
    return;
  }
  section.style.display = 'block';

  const scores = rounds.slice(-20).map(r => parseInt(r.s));
  const labels = rounds.slice(-20).map(r => r.d ? r.d.slice(5) : '');
  const avg = scores.reduce((a,b) => a + b, 0) / scores.length;
  const minS = Math.min(...scores) - 5;
  const maxS = Math.max(...scores) + 5;
  const range = maxS - minS || 1;

  const W = 100, H = 50, padL = 8, padR = 2, padT = 5, padB = 8;
  const chartW = W - padL - padR;
  const chartH = H - padT - padB;

  const points = scores.map((s, i) => {
    const x = padL + (i / Math.max(1, scores.length - 1)) * chartW;
    const y = padT + (1 - (s - minS) / range) * chartH;
    return { x, y };
  });

  const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ');
  const areaPath = linePath + ` L${points[points.length-1].x.toFixed(1)},${padT+chartH} L${points[0].x.toFixed(1)},${padT+chartH} Z`;
  const avgY = padT + (1 - (avg - minS) / range) * chartH;

  const gridLines = [minS, Math.round(minS + range/3), Math.round(minS + range*2/3), maxS].map(v => {
    const y = padT + (1 - (v - minS) / range) * chartH;
    return `<line class="trend-grid" x1="${padL}" y1="${y.toFixed(1)}" x2="${W-padR}" y2="${y.toFixed(1)}" />
    <text x="${padL-1}" y="${y.toFixed(1)}" text-anchor="end" dominant-baseline="middle" style="font-size:3px">${v}</text>`;
  }).join('');

  const dots = points.map((p, i) => `<circle class="trend-dot" cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="0.8"><title>${labels[i]} ${scores[i]}타</title></circle>`).join('');

  const xlabels = points.filter((_, i) => i === 0 || i === points.length - 1 || i === Math.floor(points.length / 2)).map((p, _, arr) => {
    const idx = points.indexOf(p);
    return `<text x="${p.x.toFixed(1)}" y="${padT+chartH+4}" text-anchor="middle" style="font-size:2.5px">${labels[idx]}</text>`;
  }).join('');

  section.innerHTML = `
    <div class="trend-card">
      <div class="trend-title"><i class="fas fa-chart-line"></i> 성적 추이 (최근 ${scores.length}라운드) <span style="font-size:11px;color:var(--accent);margin-left:8px">평균 ${avg.toFixed(1)}타</span></div>
      <svg class="trend-svg" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid meet">
        ${gridLines}
        <path class="trend-area" d="${areaPath}" />
        <path class="trend-line" d="${linePath}" />
        <line class="trend-avg" x1="${padL}" y1="${avgY.toFixed(1)}" x2="${W-padR}" y2="${avgY.toFixed(1)}" />
        ${dots}
        ${xlabels}
        <text x="${W-padR}" y="${avgY.toFixed(1)-1}" text-anchor="end" style="font-size:2.5px;fill:var(--accent)">AVG ${avg.toFixed(0)}</text>
      </svg>
    </div>
  `;
}

// ===================== Golf Glossary =====================
const GLOSSARY = [
  {term:'에이스', en:'Ace', desc:'티샷이 홀컵에 직접 들어가는 것. 홀인원과 동일한 뜻.'},
  {term:'알바트로스', en:'Albatross', desc:'파보다 3타 적게 치는 것. 더블이글이라고도 함.'},
  {term:'이글', en:'Eagle', desc:'파보다 2타 적게 홀을 마치는 것.'},
  {term:'버디', en:'Birdie', desc:'파보다 1타 적게 홀을 마치는 것.'},
  {term:'파', en:'Par', desc:'각 홀의 기준 타수. 보통 3, 4, 5 중 하나.'},
  {term:'보기', en:'Bogey', desc:'파보다 1타 많이 치는 것.'},
  {term:'더블보기', en:'Double Bogey', desc:'파보다 2타 많이 치는 것.'},
  {term:'트리플보기', en:'Triple Bogey', desc:'파보다 3타 많이 치는 것.'},
  {term:'핸디캡', en:'Handicap', desc:'골퍼의 실력을 수치화한 지표. 낮을수록 실력이 좋음.'},
  {term:'그린피', en:'Green Fee', desc:'골프장 이용 요금.'},
  {term:'페어웨이', en:'Fairway', desc:'티에서 그린까지의 잔디가 짧게 관리된 구역.'},
  {term:'러프', en:'Rough', desc:'페어웨이 양쪽의 잔디가 긴 구역. 탈출이 어려움.'},
  {term:'벙커', en:'Bunker', desc:'모래로 채워진 장애물 구역.'},
  {term:'그린', en:'Green', desc:'홀컵이 있는 매우 짧은 잔디 구역.'},
  {term:'퍼팅', en:'Putting', desc:'그린 위에서 퍼터로 공을 홀컵에 넣는 행위.'},
  {term:'드라이버', en:'Driver', desc:'가장 긴 거리를 내는 1번 우드 클럽.'},
  {term:'아이언', en:'Iron', desc:'중거리를 위한 클럽. 3~9번, PW, SW 등.'},
  {term:'웨지', en:'Wedge', desc:'짧은 거리와 높은 탄도를 위한 클럽 (PW, AW, SW, LW).'},
  {term:'퍼터', en:'Putter', desc:'그린 위에서 공을 굴려 홀에 넣기 위한 클럽.'},
  {term:'캐디', en:'Caddie', desc:'골퍼를 도와 클럽 운반, 코스 조언 등을 하는 사람.'},
  {term:'카트', en:'Cart', desc:'골프장에서 이동용으로 사용하는 전동차.'},
  {term:'OB', en:'Out of Bounds', desc:'코스 경계를 벗어난 구역. 1벌타 부과.'},
  {term:'해저드', en:'Hazard', desc:'워터 해저드(물)나 벙커 등 코스 내 장애물.'},
  {term:'티박스', en:'Tee Box', desc:'각 홀의 출발 지점.'},
  {term:'슬라이스', en:'Slice', desc:'공이 오른쪽으로 크게 휘어지는 샷 (오른손잡이 기준).'},
  {term:'훅', en:'Hook', desc:'공이 왼쪽으로 크게 휘어지는 샷 (오른손잡이 기준).'},
  {term:'멀리건', en:'Mulligan', desc:'비공식 규칙으로 첫 티샷을 다시 치는 것.'},
  {term:'포섬', en:'Foursome', desc:'4명이 한 조를 이루어 라운드하는 것.'},
  {term:'스트로크', en:'Stroke', desc:'공을 치려는 의도로 클럽을 휘두르는 동작.'},
  {term:'디봇', en:'Divot', desc:'샷 시 잔디가 파인 자국.'}
];

function createGlossaryModal() {
  const overlay = document.createElement('div');
  overlay.className = 'glossary-overlay';
  overlay.id = 'glossaryOverlay';
  overlay.innerHTML = `
    <div class="glossary-modal">
      <div class="cal-header">
        <h2><i class="fas fa-book"></i> 골프 용어 사전 (${GLOSSARY.length}개)</h2>
        <button class="sc-close" id="glossaryClose">&times;</button>
      </div>
      <input class="gl-search" id="glSearch" placeholder="용어 검색..." />
      <div class="gl-list" id="glList"></div>
    </div>
  `;
  document.body.appendChild(overlay);

  function renderGlossary(filter) {
    const f = (filter || '').toLowerCase();
    const filtered = f ? GLOSSARY.filter(g => g.term.includes(f) || g.en.toLowerCase().includes(f) || g.desc.includes(f)) : GLOSSARY;
    document.getElementById('glList').innerHTML = filtered.map(g =>
      `<div class="gl-item">
        <div class="gl-term">${g.term} <span class="gl-en">${g.en}</span></div>
        <div class="gl-desc">${g.desc}</div>
      </div>`
    ).join('') || '<div style="text-align:center;padding:20px;color:var(--text-muted)">검색 결과 없음</div>';
  }

  renderGlossary('');
  document.getElementById('glSearch').addEventListener('input', e => renderGlossary(e.target.value));
  document.getElementById('glossaryClose').addEventListener('click', () => overlay.classList.remove('active'));
  overlay.addEventListener('click', e => { if (e.target === overlay) overlay.classList.remove('active'); });
}

// ===================== Strategy Guide =====================
const STRATEGIES = {
  beginner: [
    {title:'그립 확인하기', icon:'fa-hand-paper', desc:'클럽을 너무 세게 잡지 마세요. 왼손은 V자가 오른쪽 어깨를 향하고, 오른손은 가볍게 감싸세요. 압력은 10점 만점에 4-5 정도가 적당합니다.'},
    {title:'정렬과 자세', icon:'fa-arrows-alt', desc:'발, 무릎, 엉덩이, 어깨를 목표 방향에 평행하게 정렬하세요. 무릎은 살짝 굽히고, 허리에서 편안하게 숙이세요.'},
    {title:'7번 아이언 마스터', icon:'fa-golf-ball', desc:'초보자는 7번 아이언부터 시작하세요. 가장 균형 잡힌 클럽으로, 기본기를 익히기에 최적입니다.'},
    {title:'퍼팅 연습 비중 높이기', icon:'fa-bullseye', desc:'전체 스코어의 40%가 퍼팅에서 결정됩니다. 3m 이내 거리의 퍼팅을 집중 연습하세요.'},
    {title:'코스 매니지먼트', icon:'fa-map', desc:'위험을 무릅쓰기보다 안전한 플레이를 선택하세요. 벙커와 해저드를 피해 페어웨이 중앙을 목표로 하면 스코어가 좋아집니다.'}
  ],
  intermediate: [
    {title:'스핀 컨트롤', icon:'fa-sync-alt', desc:'백스핀을 활용해 그린에서 공을 멈추는 연습을 하세요. 볼 위치를 약간 뒤로 옮기고, 다운블로로 공을 치면 스핀이 늘어납니다.'},
    {title:'거리 관리', icon:'fa-ruler', desc:'각 클럽별 정확한 비거리를 파악하세요. 드라이버 비거리보다 아이언의 일관성이 스코어에 더 큰 영향을 줍니다.'},
    {title:'바람 읽기', icon:'fa-wind', desc:'풀을 던져 바람 방향을 확인하세요. 맞바람에는 1-2클럽 올리고, 뒷바람에는 내리세요. 옆바람에는 반대 방향으로 에이밍합니다.'},
    {title:'러프 탈출', icon:'fa-leaf', desc:'러프에서는 클럽을 한 단계 올려(로프트 높은 걸로) 선택하세요. 스윙을 가파르게 하면 잔디 저항을 줄일 수 있습니다.'},
    {title:'라운드 전략', icon:'fa-chess', desc:'어려운 홀에서는 보기 목표, 쉬운 홀에서 버디 기회를 만드세요. 18홀 전체의 전략을 세우면 안정적인 스코어가 나옵니다.'}
  ],
  advanced: [
    {title:'샷 셰이핑', icon:'fa-bezier-curve', desc:'드로우(왼쪽 곡선)와 페이드(오른쪽 곡선)를 의도적으로 구사하세요. 클럽 페이스 각도와 스윙 패스의 관계를 이해하면 됩니다.'},
    {title:'핀 공략', icon:'fa-crosshairs', desc:'핀 위치에 따라 공략 방향을 바꾸세요. 핀이 앞쪽이면 핀 뒤로, 뒤쪽이면 핀 앞으로. 미스 방향을 항상 안전한 쪽으로 설정하세요.'},
    {title:'프레셔 퍼팅', icon:'fa-brain', desc:'중요한 퍼팅에서는 루틴을 지키세요. 그린 경사를 양쪽에서 확인하고, 3번의 연습 스트로크 후 바로 치세요. 과도한 생각은 독입니다.'},
    {title:'코스 컨디션 활용', icon:'fa-thermometer-half', desc:'아침 이슬, 오후 바람, 그린 속도 변화를 활용하세요. 습한 그린에는 스핀이 덜 먹히고, 건조한 그린에는 런이 길어집니다.'},
    {title:'멘탈 게임', icon:'fa-head-side-brain', desc:'나쁜 샷 후 2분 안에 잊으세요. 각 샷에만 집중하고, 결과가 아닌 과정에 초점을 맞추세요. 루틴을 일관되게 유지하는 것이 핵심입니다.'}
  ]
};

function createStrategyModal() {
  const overlay = document.createElement('div');
  overlay.className = 'strategy-overlay';
  overlay.id = 'strategyOverlay';
  overlay.innerHTML = `
    <div class="strategy-modal">
      <div class="cal-header">
        <h2><i class="fas fa-chess-knight"></i> 코스 전략 가이드</h2>
        <button class="sc-close" id="strategyClose">&times;</button>
      </div>
      <div class="str-tabs" id="strTabs">
        <button class="str-tab active" data-level="beginner"><i class="fas fa-seedling"></i> 초보</button>
        <button class="str-tab" data-level="intermediate"><i class="fas fa-user"></i> 중급</button>
        <button class="str-tab" data-level="advanced"><i class="fas fa-crown"></i> 고급</button>
      </div>
      <div class="str-content" id="strContent"></div>
    </div>
  `;
  document.body.appendChild(overlay);

  function renderStrategies(level) {
    const tips = STRATEGIES[level] || [];
    document.getElementById('strContent').innerHTML = tips.map(t =>
      `<div class="str-tip">
        <div class="str-tip-title"><i class="fas ${t.icon}"></i> ${t.title}</div>
        <div class="str-tip-desc">${t.desc}</div>
      </div>`
    ).join('');
  }

  renderStrategies('beginner');
  document.getElementById('strTabs').addEventListener('click', e => {
    const tab = e.target.closest('.str-tab');
    if (!tab) return;
    document.querySelectorAll('.str-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    renderStrategies(tab.dataset.level);
  });
  document.getElementById('strategyClose').addEventListener('click', () => overlay.classList.remove('active'));
  overlay.addEventListener('click', e => { if (e.target === overlay) overlay.classList.remove('active'); });
}

// ===================== Theme Customizer =====================
function addThemePicker() {
  const tools = document.querySelector('.header-tools');
  if (!tools) return;
  const picker = document.createElement('div');
  picker.className = 'theme-picker';
  picker.innerHTML = `
    <div class="theme-dot theme-green active" data-color="" title="초록 (기본)"></div>
    <div class="theme-dot theme-blue" data-color="blue" title="블루"></div>
    <div class="theme-dot theme-purple" data-color="purple" title="퍼플"></div>
    <div class="theme-dot theme-orange" data-color="orange" title="오렌지"></div>
    <div class="theme-dot theme-rose" data-color="rose" title="로즈"></div>
    <div class="theme-dot theme-teal" data-color="teal" title="틸"></div>
  `;
  tools.appendChild(picker);

  const saved = localStorage.getItem('sg_color_theme') || '';
  if (saved) {
    document.documentElement.setAttribute('data-color-theme', saved);
    picker.querySelector('.active')?.classList.remove('active');
    picker.querySelector(`[data-color="${saved}"]`)?.classList.add('active');
  }

  picker.addEventListener('click', e => {
    const dot = e.target.closest('.theme-dot');
    if (!dot) return;
    const color = dot.dataset.color;
    document.documentElement.setAttribute('data-color-theme', color);
    localStorage.setItem('sg_color_theme', color);
    picker.querySelectorAll('.theme-dot').forEach(d => d.classList.remove('active'));
    dot.classList.add('active');
    if (typeof showToast === 'function') showToast(`테마 변경: ${dot.title}`, 'info');
  });
}

// ===================== Header Buttons =====================
function addV6HeaderButtons() {
  const tools = document.querySelector('.header-tools');
  if (!tools) return;

  const btns = [
    {id:'scorecardBtn', icon:'fa-golf-ball', title:'스코어카드', overlay:'scorecardOverlay'},
    {id:'calBtn', icon:'fa-calendar', title:'캘린더', overlay:'calOverlay'},
    {id:'glossaryBtn', icon:'fa-book', title:'용어사전', overlay:'glossaryOverlay'},
    {id:'strategyBtn', icon:'fa-chess-knight', title:'전략가이드', overlay:'strategyOverlay'}
  ];

  const viewToggle = tools.querySelector('.view-toggle');
  btns.forEach(b => {
    const btn = document.createElement('button');
    btn.className = 'dark-toggle';
    btn.id = b.id;
    btn.title = b.title;
    btn.innerHTML = `<i class="fas ${b.icon}"></i>`;
    btn.addEventListener('click', () => {
      const o = document.getElementById(b.overlay);
      if (o) {
        o.classList.add('active');
        if (b.id === 'scorecardBtn') renderScorecardHistory();
        if (b.id === 'calBtn') {
          const calNav = document.getElementById('calPrev');
          if (calNav) calNav.click(); calNav?.click();
        }
      }
    });
    if (viewToggle && viewToggle.nextSibling) {
      tools.insertBefore(btn, viewToggle.nextSibling);
    } else {
      tools.prepend(btn);
    }
  });
}

// ===================== Keyboard Shortcuts v6 =====================
function addV6Shortcuts() {
  document.addEventListener('keydown', e => {
    if (e.target.closest('input,select,textarea')) return;
    switch(e.key) {
      case 'c': case 'C': e.preventDefault(); document.getElementById('scorecardBtn')?.click(); break;
      case 'k': case 'K': e.preventDefault(); document.getElementById('calBtn')?.click(); break;
      case 'b': case 'B': e.preventDefault(); document.getElementById('glossaryBtn')?.click(); break;
      case 'x': case 'X': e.preventDefault(); document.getElementById('strategyBtn')?.click(); break;
    }
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      ['scorecardOverlay','calOverlay','glossaryOverlay','strategyOverlay'].forEach(id => {
        document.getElementById(id)?.classList.remove('active');
      });
    }
  });
}

// ===================== Enhanced Accessibility =====================
function enhanceAccessibility() {
  document.querySelectorAll('.dark-toggle, .a11y-btn, .view-btn, .fav-filter').forEach(btn => {
    if (!btn.getAttribute('role')) btn.setAttribute('role', 'button');
    if (!btn.getAttribute('tabindex')) btn.setAttribute('tabindex', '0');
  });

  const mobileNavBtns = document.querySelectorAll('.mobile-nav-btn');
  mobileNavBtns.forEach(btn => {
    btn.setAttribute('role', 'button');
    btn.setAttribute('tabindex', '0');
  });

  const regionTags = document.querySelectorAll('.tag');
  regionTags.forEach(tag => {
    tag.setAttribute('role', 'button');
    tag.setAttribute('tabindex', '0');
  });
}

// ===================== Version Badge =====================
function addVersionBadge() {
  const footer = document.querySelector('.footer-brand span');
  if (footer) {
    footer.textContent = footer.textContent.replace(/v\d+\.\d+/, 'v6.0');
    if (!footer.textContent.includes('v6.0')) {
      footer.textContent += ' v6.0';
    }
  }
  const shareCardFn = window.generateShareCard;
  if (shareCardFn) {
    const canvasTexts = document.querySelectorAll('script');
    canvasTexts.forEach(s => {
      if (s.textContent.includes('SmartGolf v5.0')) {
        s.textContent = s.textContent.replace(/SmartGolf v5\.0/g, 'SmartGolf v6.0');
      }
    });
  }
}

// ===================== Init =====================
function initV6() {
  createScorecardModal();
  createCalendarModal();
  createGlossaryModal();
  createStrategyModal();
  addV6HeaderButtons();
  addThemePicker();
  addV6Shortcuts();
  enhanceAccessibility();
  renderHandicapSection();
  renderTrendSection();
  addVersionBadge();

  const shortcutsGrid = document.querySelector('.shortcuts-grid');
  if (shortcutsGrid) {
    shortcutsGrid.insertAdjacentHTML('beforeend', `
      <div class="shortcut-item"><span class="shortcut-key">C</span> 스코어카드</div>
      <div class="shortcut-item"><span class="shortcut-key">K</span> 캘린더</div>
      <div class="shortcut-item"><span class="shortcut-key">B</span> 용어사전</div>
      <div class="shortcut-item"><span class="shortcut-key">X</span> 전략가이드</div>
    `);
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initV6);
} else {
  setTimeout(initV6, 100);
}

})();
