(function(){
'use strict';

// === SmartGolf v8.0 Patch ===
// 1. 홀별 스코어카드 (18홀 파/버디/보기 입력+통계)
// 2. 코스 난이도 지수 (알고리즘 기반 1~10)
// 3. 라운딩 체크리스트 (28항목 카테고리별)
// 4. 클럽 거리 관리 (14클럽 개인 거리 기록)
// 5. 동반자 관리 (함께 라운딩한 파트너 관리)
// 6. 코스 전략 가이드 (코스 유형별 공략법)
// 7. 연습 드릴 플래너 (주간 연습 계획)
// 8. 스코어 목표 추적 (목표 설정+달성률)
// 9. 골프 에티켓 심화 가이드 (30+)
// 10. 스윙 템포 메트로놈 (Web Audio)

var css8 = document.createElement('style');
css8.textContent = `
/* === v8 Global === */
.v8-overlay{position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,.65);z-index:10004;display:none;align-items:center;justify-content:center;backdrop-filter:blur(5px)}
.v8-overlay.active{display:flex}
.v8-modal{background:var(--card-bg,#fff);border-radius:20px;padding:24px;width:94%;max-width:580px;max-height:88vh;overflow-y:auto;box-shadow:0 24px 80px rgba(0,0,0,.35);animation:v8SlideUp .4s cubic-bezier(.23,1,.32,1)}
@keyframes v8SlideUp{from{opacity:0;transform:translateY(40px)}to{opacity:1;transform:translateY(0)}}
.v8-modal h2{font-size:20px;margin:0 0 16px;display:flex;align-items:center;gap:8px}
.v8-modal h2 .v8-icon{width:28px;height:28px;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:16px}
.v8-close{background:none;border:none;font-size:22px;cursor:pointer;color:var(--text-muted);padding:4px 8px;border-radius:8px;transition:.2s}
.v8-close:hover{background:var(--border);color:var(--text)}
.v8-section{margin-bottom:20px}
.v8-section h3{font-size:14px;font-weight:700;margin-bottom:10px;color:var(--primary);display:flex;align-items:center;gap:6px}
.v8-tabs{display:flex;gap:6px;margin-bottom:16px;overflow-x:auto;padding-bottom:4px}
.v8-tab{padding:7px 14px;border-radius:20px;border:1px solid var(--border);background:var(--bg);font-size:12px;cursor:pointer;white-space:nowrap;transition:.2s}
.v8-tab.active{background:var(--primary);color:#fff;border-color:var(--primary)}
.v8-btn{padding:10px 20px;border:none;border-radius:10px;font-size:13px;font-weight:600;cursor:pointer;transition:.2s}
.v8-btn-primary{background:linear-gradient(135deg,var(--primary),var(--primary-dark));color:#fff}
.v8-btn-primary:hover{transform:translateY(-1px);box-shadow:0 4px 12px rgba(26,122,58,.3)}
.v8-btn-sm{padding:6px 12px;font-size:11px;border-radius:8px}

/* Scorecard */
.sc-table{width:100%;border-collapse:separate;border-spacing:0;font-size:12px;border-radius:12px;overflow:hidden}
.sc-table th{background:var(--primary);color:#fff;padding:8px 4px;font-weight:600;text-align:center;font-size:11px}
.sc-table td{padding:6px 2px;text-align:center;border-bottom:1px solid var(--border)}
.sc-table input[type="number"]{width:40px;padding:4px;text-align:center;border:1px solid var(--border);border-radius:6px;font-size:13px;font-weight:700;background:var(--card-bg);color:var(--text)}
.sc-table input:focus{border-color:var(--primary);outline:none}
.sc-birdie{background:#e8f5e9!important;color:#2e7d32;font-weight:700}
.sc-eagle{background:#bbdefb!important;color:#1565c0;font-weight:700}
.sc-par{background:var(--bg)}
.sc-bogey{background:#fff3e0!important;color:#e65100;font-weight:700}
.sc-double{background:#fce4ec!important;color:#c62828;font-weight:700}
.sc-hole-num{font-weight:700;color:var(--primary);font-size:13px}
.sc-par-row{font-size:11px;color:var(--text-muted);font-weight:600}
.sc-total-row td{font-weight:800;font-size:14px;background:var(--primary-light);border-top:2px solid var(--primary)}
.sc-summary{display:grid;grid-template-columns:repeat(5,1fr);gap:8px;margin:16px 0}
.sc-sum-item{text-align:center;padding:10px;border-radius:10px;background:var(--bg)}
.sc-sum-item .sc-sv{font-size:20px;font-weight:800}
.sc-sum-item .sc-sl{font-size:10px;color:var(--text-muted);margin-top:2px}
.sc-sum-eagle .sc-sv{color:#1565c0}
.sc-sum-birdie .sc-sv{color:#2e7d32}
.sc-sum-par .sc-sv{color:var(--text)}
.sc-sum-bogey .sc-sv{color:#e65100}
.sc-sum-double .sc-sv{color:#c62828}

/* Difficulty */
.diff-meter{display:flex;align-items:center;gap:8px;margin:4px 0}
.diff-bar-bg{flex:1;height:8px;background:var(--border);border-radius:4px;overflow:hidden}
.diff-bar-fill{height:100%;border-radius:4px;transition:width .6s ease}
.diff-val{font-weight:800;font-size:14px;min-width:32px;text-align:right}
.diff-easy{color:#2e7d32}.diff-easy .diff-bar-fill{background:linear-gradient(90deg,#4caf50,#81c784)}
.diff-mid{color:#f57f17}.diff-mid .diff-bar-fill{background:linear-gradient(90deg,#ff9800,#ffb74d)}
.diff-hard{color:#c62828}.diff-hard .diff-bar-fill{background:linear-gradient(90deg,#e53935,#ef5350)}
.diff-card{padding:14px;border-radius:12px;background:var(--bg);margin-bottom:10px;display:flex;align-items:center;gap:12px}
.diff-card .diff-icon{font-size:28px}
.diff-card .diff-info{flex:1}
.diff-card .diff-name{font-weight:700;font-size:14px;margin-bottom:2px}
.diff-card .diff-desc{font-size:11px;color:var(--text-muted)}
.diff-factors{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:12px}
.diff-factor{padding:10px;border-radius:10px;background:var(--bg)}
.diff-factor .df-label{font-size:10px;color:var(--text-muted)}
.diff-factor .df-val{font-size:14px;font-weight:700;margin-top:2px}

/* Checklist */
.cl-group{margin-bottom:16px}
.cl-group-title{font-size:13px;font-weight:700;margin-bottom:8px;display:flex;align-items:center;gap:6px}
.cl-item{display:flex;align-items:center;gap:10px;padding:10px 12px;border-radius:10px;background:var(--bg);margin-bottom:4px;cursor:pointer;transition:.2s}
.cl-item:hover{background:var(--primary-light)}
.cl-item.checked{opacity:.6;text-decoration:line-through}
.cl-check{width:22px;height:22px;border-radius:6px;border:2px solid var(--border);display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:.2s;font-size:12px;color:transparent}
.cl-item.checked .cl-check{background:var(--primary);border-color:var(--primary);color:#fff}
.cl-text{font-size:13px;flex:1}
.cl-progress{display:flex;align-items:center;gap:8px;margin-bottom:16px}
.cl-progress-bar{flex:1;height:8px;background:var(--border);border-radius:4px;overflow:hidden}
.cl-progress-fill{height:100%;background:linear-gradient(90deg,var(--primary),#7bed9f);border-radius:4px;transition:width .3s}
.cl-progress-text{font-size:13px;font-weight:700;color:var(--primary);min-width:40px;text-align:right}

/* Club Distance */
.cd-table{width:100%;border-collapse:separate;border-spacing:0;font-size:12px;border-radius:12px;overflow:hidden}
.cd-table th{background:var(--primary);color:#fff;padding:8px;font-weight:600}
.cd-table td{padding:8px;border-bottom:1px solid var(--border);vertical-align:middle}
.cd-table input{width:60px;padding:5px;text-align:center;border:1px solid var(--border);border-radius:6px;font-size:13px;font-weight:600;background:var(--card-bg);color:var(--text)}
.cd-table input:focus{border-color:var(--primary);outline:none}
.cd-icon{font-size:16px;text-align:center}
.cd-name{font-weight:600}
.cd-chart-wrap{position:relative;width:100%;height:220px;margin:16px 0;background:var(--bg);border-radius:12px;overflow:hidden}

/* Partner */
.pt-card{display:flex;align-items:center;gap:12px;padding:12px;border-radius:12px;background:var(--bg);margin-bottom:8px}
.pt-avatar{width:42px;height:42px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:20px;flex-shrink:0}
.pt-info{flex:1}
.pt-name{font-weight:700;font-size:14px}
.pt-meta{font-size:11px;color:var(--text-muted)}
.pt-actions{display:flex;gap:4px}
.pt-btn{padding:4px 8px;border-radius:6px;border:none;cursor:pointer;font-size:11px;transition:.2s}
.pt-btn-edit{background:var(--primary-light);color:var(--primary)}
.pt-btn-del{background:#fce4ec;color:#c62828}
.pt-form{display:grid;gap:10px;margin-top:12px}
.pt-form input{padding:8px 12px;border:1px solid var(--border);border-radius:8px;font-size:13px;background:var(--card-bg);color:var(--text)}

/* Strategy */
.stg-card{padding:16px;border-radius:14px;background:var(--bg);margin-bottom:10px}
.stg-card h4{font-size:14px;font-weight:700;margin-bottom:6px;display:flex;align-items:center;gap:6px}
.stg-card p{font-size:12px;color:var(--text-muted);line-height:1.6}
.stg-tip{display:flex;gap:8px;padding:10px;border-radius:10px;border-left:3px solid var(--primary);background:var(--primary-light);margin-top:8px;font-size:12px;line-height:1.5}
[data-theme="dark"] .stg-tip{background:rgba(26,122,58,.15)}

/* Drill Planner */
.dp-day{margin-bottom:12px}
.dp-day-title{font-size:13px;font-weight:700;margin-bottom:6px;display:flex;align-items:center;gap:6px}
.dp-drill{display:flex;align-items:center;gap:10px;padding:10px 12px;border-radius:10px;background:var(--bg);margin-bottom:4px}
.dp-drill .dp-icon{font-size:18px;flex-shrink:0}
.dp-drill .dp-name{font-weight:600;font-size:13px}
.dp-drill .dp-dur{font-size:11px;color:var(--text-muted)}
.dp-drill .dp-check{margin-left:auto;width:20px;height:20px;border-radius:50%;border:2px solid var(--border);cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:10px;color:transparent;transition:.2s}
.dp-drill .dp-check.done{background:var(--primary);border-color:var(--primary);color:#fff}

/* Goal Tracker */
.gt-goal{padding:16px;border-radius:14px;background:var(--bg);margin-bottom:10px}
.gt-goal .gt-target{font-size:12px;color:var(--text-muted);margin-bottom:4px}
.gt-goal .gt-val{font-size:24px;font-weight:800;color:var(--primary)}
.gt-goal .gt-current{font-size:12px;margin-top:4px}
.gt-progress{height:10px;background:var(--border);border-radius:5px;overflow:hidden;margin-top:8px}
.gt-progress-fill{height:100%;border-radius:5px;transition:width .5s ease}
.gt-achieved{background:linear-gradient(90deg,#4caf50,#81c784)}
.gt-in-progress{background:linear-gradient(90deg,#ff9800,#ffb74d)}
.gt-far{background:linear-gradient(90deg,#e53935,#ef5350)}
.gt-form{display:grid;gap:10px;margin-top:16px}
.gt-form input,.gt-form select{padding:8px 12px;border:1px solid var(--border);border-radius:8px;font-size:13px;background:var(--card-bg);color:var(--text)}

/* Etiquette */
.et-item{padding:14px;border-radius:12px;background:var(--bg);margin-bottom:8px;cursor:pointer;transition:.2s}
.et-item:hover{background:var(--primary-light)}
.et-item .et-title{font-weight:700;font-size:14px;display:flex;align-items:center;gap:6px}
.et-item .et-cat{font-size:10px;padding:2px 8px;border-radius:10px;font-weight:600}
.et-cat-green{background:#e8f5e9;color:#2e7d32}
.et-cat-course{background:#e3f2fd;color:#1565c0}
.et-cat-social{background:#f3e5f5;color:#7b1fa2}
.et-cat-pace{background:#fff3e0;color:#e65100}
.et-item .et-desc{font-size:12px;color:var(--text-muted);line-height:1.5;display:none;margin-top:8px}
.et-item.expanded .et-desc{display:block}
.et-item .et-arrow{margin-left:auto;transition:transform .2s;color:var(--text-muted)}
.et-item.expanded .et-arrow{transform:rotate(180deg)}
.et-importance{display:inline-block;font-size:10px;margin-left:6px}

/* Metronome */
.metro-display{text-align:center;padding:20px}
.metro-bpm{font-size:64px;font-weight:800;color:var(--primary);font-variant-numeric:tabular-nums}
.metro-label{font-size:14px;color:var(--text-muted);margin-top:4px}
.metro-visual{width:80px;height:80px;border-radius:50%;margin:16px auto;border:4px solid var(--primary);display:flex;align-items:center;justify-content:center;font-size:32px;transition:.1s}
.metro-visual.beat{transform:scale(1.15);background:var(--primary);color:#fff}
.metro-controls{display:flex;gap:8px;justify-content:center;margin-top:16px;flex-wrap:wrap}
.metro-ctrl-btn{padding:10px 20px;border-radius:10px;border:none;font-size:14px;font-weight:600;cursor:pointer;transition:.2s}
.metro-start{background:var(--primary);color:#fff}
.metro-start.active{background:#c62828}
.metro-adjust{background:var(--bg);border:1px solid var(--border);color:var(--text);min-width:44px}
.metro-slider{width:100%;margin:12px 0;accent-color:var(--primary)}
.metro-presets{display:flex;gap:6px;justify-content:center;margin-top:12px;flex-wrap:wrap}
.metro-preset{padding:6px 12px;border-radius:20px;border:1px solid var(--border);background:var(--bg);font-size:11px;cursor:pointer;transition:.2s}
.metro-preset.active{background:var(--primary);color:#fff;border-color:var(--primary)}
.metro-desc{font-size:11px;color:var(--text-muted);text-align:center;margin-top:12px;line-height:1.6}

/* Quick Actions v8 */
.v8-quick{display:flex;gap:8px;flex-wrap:wrap;justify-content:center;margin:12px 0}
.v8-quick-btn{display:flex;flex-direction:column;align-items:center;gap:4px;padding:10px 12px;border-radius:12px;background:var(--card-bg);border:1px solid var(--border);cursor:pointer;transition:.2s;font-size:10px;font-weight:600;color:var(--text);min-width:64px}
.v8-quick-btn:hover{border-color:var(--primary);background:var(--primary-light);transform:translateY(-2px)}
.v8-quick-btn .qicon{font-size:18px;line-height:1}
@media(max-width:480px){
  .sc-summary{grid-template-columns:repeat(3,1fr)}
  .diff-factors{grid-template-columns:1fr}
  .cd-chart-wrap{height:180px}
  .metro-bpm{font-size:48px}
}
`;
document.head.appendChild(css8);

function v8Toast(msg, type) {
  var t = document.createElement('div');
  t.className = 'v7-toast ' + (type||'info');
  t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(function(){ t.remove(); }, 2500);
}

function v8CreateOverlay(id) {
  var ov = document.createElement('div');
  ov.className = 'v8-overlay';
  ov.id = id;
  ov.addEventListener('click', function(e){ if(e.target===ov) ov.classList.remove('active'); });
  document.body.appendChild(ov);
  return ov;
}

// ====================================================================
// 1. HOLE-BY-HOLE SCORECARD
// ====================================================================
var scOv = v8CreateOverlay('v8ScOv');
var scMd = document.createElement('div');
scMd.className = 'v8-modal';
scMd.style.maxWidth = '640px';
scOv.appendChild(scMd);

var defaultPars = [4,4,3,5,4,4,3,4,5, 4,3,5,4,4,3,4,5,4];

function getHoleScores() {
  return JSON.parse(localStorage.getItem('sg_v8_holescores') || '[]');
}
function saveHoleScores(data) {
  localStorage.setItem('sg_v8_holescores', JSON.stringify(data));
}

function scoreClass(score, par) {
  var diff = score - par;
  if(diff <= -2) return 'sc-eagle';
  if(diff === -1) return 'sc-birdie';
  if(diff === 0) return 'sc-par';
  if(diff === 1) return 'sc-bogey';
  return 'sc-double';
}

function scoreName(diff) {
  if(diff <= -3) return 'Albatross';
  if(diff === -2) return 'Eagle';
  if(diff === -1) return 'Birdie';
  if(diff === 0) return 'Par';
  if(diff === 1) return 'Bogey';
  if(diff === 2) return 'Double';
  return 'Triple+';
}

function renderHoleScorecard(roundIdx) {
  var allRounds = getHoleScores();
  var isNew = roundIdx === undefined || roundIdx === null;
  var current = isNew ? {
    date: new Date().toISOString().split('T')[0],
    course: '',
    pars: defaultPars.slice(),
    scores: new Array(18).fill(0),
    putts: new Array(18).fill(0)
  } : allRounds[roundIdx];

  var front9par = current.pars.slice(0,9).reduce(function(a,b){return a+b;},0);
  var back9par = current.pars.slice(9).reduce(function(a,b){return a+b;},0);
  var front9score = current.scores.slice(0,9).reduce(function(a,b){return a+b;},0);
  var back9score = current.scores.slice(9).reduce(function(a,b){return a+b;},0);
  var totalPar = front9par + back9par;
  var totalScore = front9score + back9score;

  var eagles=0, birdies=0, pars=0, bogeys=0, doubles=0;
  current.scores.forEach(function(s, i){
    if(s <= 0) return;
    var diff = s - current.pars[i];
    if(diff <= -2) eagles++;
    else if(diff === -1) birdies++;
    else if(diff === 0) pars++;
    else if(diff === 1) bogeys++;
    else doubles++;
  });

  scMd.innerHTML = '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px">' +
    '<h2 style="margin:0"><span class="v8-icon" style="background:linear-gradient(135deg,#1565c0,#42a5f5)">&#9971;</span> ' + (isNew ? '새 스코어카드' : '스코어카드') + '</h2>' +
    '<button class="v8-close" id="v8HscClose">&times;</button></div>' +
    '<div style="display:flex;gap:8px;margin-bottom:12px;flex-wrap:wrap">' +
    '<input type="date" id="v8HscDate" value="' + current.date + '" style="padding:6px 10px;border:1px solid var(--border);border-radius:8px;font-size:12px;background:var(--card-bg);color:var(--text)">' +
    '<input type="text" id="v8HscCourse" value="' + (current.course||'').replace(/"/g,'&quot;') + '" placeholder="골프장 이름" style="flex:1;padding:6px 10px;border:1px solid var(--border);border-radius:8px;font-size:12px;background:var(--card-bg);color:var(--text)">' +
    '</div>' +
    '<div style="overflow-x:auto">' +
    '<table class="sc-table"><thead><tr><th>홀</th>';

  var html = scMd.innerHTML;
  for(var i=1;i<=9;i++) html += '<th>' + i + '</th>';
  html += '<th style="background:#0f5a28">OUT</th></tr></thead><tbody>';
  html += '<tr><td class="sc-par-row">Par</td>';
  for(var i=0;i<9;i++) html += '<td class="sc-par-row">' + current.pars[i] + '</td>';
  html += '<td class="sc-par-row" style="font-weight:800">' + front9par + '</td></tr>';
  html += '<tr><td style="font-weight:700">Score</td>';
  for(var i=0;i<9;i++){
    var cls = current.scores[i] > 0 ? scoreClass(current.scores[i], current.pars[i]) : '';
    html += '<td class="' + cls + '"><input type="number" data-hole="' + i + '" value="' + (current.scores[i]||'') + '" min="1" max="15" placeholder="-"></td>';
  }
  html += '<td style="font-weight:800">' + (front9score||'-') + '</td></tr>';

  html += '<tr><td colspan="11" style="height:4px;padding:0;background:var(--border)"></td></tr>';

  html += '<tr style="background:var(--bg)"><th style="background:var(--primary-dark)">홀</th>';
  for(var i=10;i<=18;i++) html += '<th style="background:var(--primary-dark)">' + i + '</th>';
  html += '<th style="background:#0f5a28">IN</th></tr>';
  html += '<tr><td class="sc-par-row">Par</td>';
  for(var i=9;i<18;i++) html += '<td class="sc-par-row">' + current.pars[i] + '</td>';
  html += '<td class="sc-par-row" style="font-weight:800">' + back9par + '</td></tr>';
  html += '<tr><td style="font-weight:700">Score</td>';
  for(var i=9;i<18;i++){
    var cls = current.scores[i] > 0 ? scoreClass(current.scores[i], current.pars[i]) : '';
    html += '<td class="' + cls + '"><input type="number" data-hole="' + i + '" value="' + (current.scores[i]||'') + '" min="1" max="15" placeholder="-"></td>';
  }
  html += '<td style="font-weight:800">' + (back9score||'-') + '</td></tr>';

  html += '<tr class="sc-total-row"><td>TOTAL</td><td colspan="9" style="text-align:right">Par ' + totalPar + '</td>' +
    '<td style="font-size:18px;color:' + (totalScore && totalScore <= totalPar ? 'var(--primary)' : totalScore && totalScore <= totalPar+10 ? '#1565c0' : '#e65100') + '">' +
    (totalScore||'-') + (totalScore ? ' (' + (totalScore-totalPar >= 0 ? '+' : '') + (totalScore-totalPar) + ')' : '') + '</td></tr>';
  html += '</tbody></table></div>';

  html += '<div class="sc-summary">' +
    '<div class="sc-sum-item sc-sum-eagle"><div class="sc-sv">' + eagles + '</div><div class="sc-sl">Eagle-</div></div>' +
    '<div class="sc-sum-item sc-sum-birdie"><div class="sc-sv">' + birdies + '</div><div class="sc-sl">Birdie</div></div>' +
    '<div class="sc-sum-item sc-sum-par"><div class="sc-sv">' + pars + '</div><div class="sc-sl">Par</div></div>' +
    '<div class="sc-sum-item sc-sum-bogey"><div class="sc-sv">' + bogeys + '</div><div class="sc-sl">Bogey</div></div>' +
    '<div class="sc-sum-item sc-sum-double"><div class="sc-sv">' + doubles + '</div><div class="sc-sl">Double+</div></div>' +
    '</div>';

  html += '<div style="display:flex;gap:8px;justify-content:center;margin-top:12px">' +
    '<button class="v8-btn v8-btn-primary" id="v8HscSave">&#128190; 저장</button>' +
    '<button class="v8-btn" id="v8HscHistory" style="background:var(--bg);border:1px solid var(--border);color:var(--text)">&#128203; 기록 보기</button>' +
    '</div>';

  scMd.innerHTML = html;

  scMd.querySelectorAll('input[data-hole]').forEach(function(inp){
    inp.addEventListener('change', function(){
      var h = parseInt(inp.dataset.hole);
      current.scores[h] = parseInt(inp.value) || 0;
      var cls = current.scores[h] > 0 ? scoreClass(current.scores[h], current.pars[h]) : '';
      inp.parentElement.className = cls;
    });
  });

  document.getElementById('v8HscClose').addEventListener('click', function(){ scOv.classList.remove('active'); });

  document.getElementById('v8HscSave').addEventListener('click', function(){
    current.date = document.getElementById('v8HscDate').value;
    current.course = document.getElementById('v8HscCourse').value;
    scMd.querySelectorAll('input[data-hole]').forEach(function(inp){
      current.scores[parseInt(inp.dataset.hole)] = parseInt(inp.value) || 0;
    });
    if(isNew) allRounds.push(current);
    else allRounds[roundIdx] = current;
    saveHoleScores(allRounds);
    v8Toast('스코어카드 저장 완료!', 'success');

    var ts = current.scores.reduce(function(a,b){return a+b;},0);
    if(ts > 0){
      var rounds = JSON.parse(localStorage.getItem('sg_rounds') || '[]');
      rounds.push({course: current.course, date: current.date, score: ts, memo: 'v8 홀별 스코어카드'});
      localStorage.setItem('sg_rounds', JSON.stringify(rounds));
    }
  });

  document.getElementById('v8HscHistory').addEventListener('click', function(){
    var all = getHoleScores();
    if(!all.length){ v8Toast('저장된 스코어카드가 없습니다', 'warn'); return; }
    var histHtml = '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px">' +
      '<h2 style="margin:0">&#128203; 스코어카드 기록</h2>' +
      '<button class="v8-close" id="v8HscBackBtn">&times;</button></div>';
    all.slice().reverse().forEach(function(r, ri){
      var idx = all.length - 1 - ri;
      var tp = r.pars.reduce(function(a,b){return a+b;},0);
      var ts = r.scores.reduce(function(a,b){return a+b;},0);
      histHtml += '<div class="pt-card" style="cursor:pointer" data-ridx="' + idx + '">' +
        '<div class="pt-avatar" style="background:' + (ts <= tp ? '#e8f5e9' : '#fff3e0') + '">' + (ts <= tp ? '&#127942;' : '&#9971;') + '</div>' +
        '<div class="pt-info"><div class="pt-name">' + (r.course||'미정') + '</div>' +
        '<div class="pt-meta">' + r.date + ' &middot; ' + ts + ' (' + (ts-tp >= 0 ? '+' : '') + (ts-tp) + ')</div></div></div>';
    });
    scMd.innerHTML = histHtml;
    document.getElementById('v8HscBackBtn').addEventListener('click', function(){ scOv.classList.remove('active'); });
    scMd.querySelectorAll('[data-ridx]').forEach(function(el){
      el.addEventListener('click', function(){ renderHoleScorecard(parseInt(el.dataset.ridx)); });
    });
  });
}

// ====================================================================
// 2. COURSE DIFFICULTY INDEX
// ====================================================================
function calcDifficulty(course) {
  var score = 5;
  if(course.h >= 36) score += 1.5;
  else if(course.h >= 27) score += 1;
  else if(course.h === 9) score -= 1;

  if(course.t === '회원제') score += 1;
  else if(course.t === '군골프장') score -= 1;

  if(course.weekday > 200000) score += 0.5;
  else if(course.weekday > 0 && course.weekday < 80000) score -= 0.5;

  if(course.rt >= 9) score += 0.5;
  else if(course.rt < 7) score -= 0.5;

  if(course.g === '양잔디') score += 0.5;

  var region = course.r || '';
  if(region === '강원' || region === '제주') score += 0.5;

  return Math.max(1, Math.min(10, Math.round(score * 10) / 10));
}

function diffLabel(val) {
  if(val <= 3.5) return {text:'초급 코스', cls:'diff-easy', icon:'&#127793;', desc:'초보자도 편하게 즐길 수 있는 쉬운 코스'};
  if(val <= 5.5) return {text:'중급 코스', cls:'diff-mid', icon:'&#127796;', desc:'중간 난이도로 다양한 전략이 필요한 코스'};
  if(val <= 7.5) return {text:'상급 코스', cls:'diff-hard', icon:'&#127795;', desc:'숙련된 골퍼에게 도전적인 고난이도 코스'};
  return {text:'최상급 코스', cls:'diff-hard', icon:'&#128293;', desc:'프로 수준의 극한 도전 코스'};
}

window.v8CalcDifficulty = calcDifficulty;
window.v8DiffLabel = diffLabel;

// ====================================================================
// 3. ROUNDING CHECKLIST
// ====================================================================
var clOv = v8CreateOverlay('v8ClOv');
var clMd = document.createElement('div');
clMd.className = 'v8-modal';
clOv.appendChild(clMd);

var checklistData = [
  {cat:'장비', items:['드라이버','우드/유틸리티','아이언 세트','웨지 (SW/AW/LW)','퍼터','골프공 (여분 포함)','티 (롱/숏)','볼마커','디봇수리도구','장갑 (여분)','거리측정기','우산']},
  {cat:'의류', items:['골프화','골프 모자/선바이저','기능성 티셔츠','골프 바지/치마','방수 자켓','양말 (여분)','선글라스']},
  {cat:'개인용품', items:['자외선 차단제','수건/쿨링타올','물/음료','간식/에너지바','반창고','두통약','현금 (캐디팁 등)']},
  {cat:'준비사항', items:['티타임 확인','날씨 확인','코스 파악','동반자 연락','네비 설정 (출발 30분전)','스트레칭/워밍업','연습 스윙','스코어카드 준비']}
];

function getCheckedItems() {
  return JSON.parse(localStorage.getItem('sg_v8_checklist') || '{}');
}
function saveCheckedItems(data) {
  localStorage.setItem('sg_v8_checklist', JSON.stringify(data));
}

function renderChecklist() {
  var checked = getCheckedItems();
  var totalItems = 0;
  var checkedCount = 0;
  checklistData.forEach(function(g){ g.items.forEach(function(item){
    totalItems++;
    if(checked[item]) checkedCount++;
  }); });
  var pct = totalItems > 0 ? Math.round(checkedCount / totalItems * 100) : 0;

  var html = '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px">' +
    '<h2 style="margin:0"><span class="v8-icon" style="background:linear-gradient(135deg,#ff6b35,#ff8f65)">&#9989;</span> 라운딩 체크리스트</h2>' +
    '<button class="v8-close" id="v8ClClose">&times;</button></div>' +
    '<div class="cl-progress"><div class="cl-progress-bar"><div class="cl-progress-fill" style="width:' + pct + '%"></div></div>' +
    '<div class="cl-progress-text">' + pct + '%</div></div>' +
    '<div style="display:flex;gap:8px;margin-bottom:16px"><span style="font-size:12px;color:var(--text-muted)">' + checkedCount + '/' + totalItems + ' 완료</span>' +
    '<button class="v8-btn v8-btn-sm" id="v8ClReset" style="margin-left:auto;background:#fce4ec;color:#c62828">초기화</button></div>';

  checklistData.forEach(function(g){
    html += '<div class="cl-group"><div class="cl-group-title">&#128230; ' + g.cat + '</div>';
    g.items.forEach(function(item){
      var isChecked = checked[item] ? ' checked' : '';
      html += '<div class="cl-item' + isChecked + '" data-item="' + item.replace(/"/g,'&quot;') + '">' +
        '<div class="cl-check">' + (checked[item] ? '&#10003;' : '') + '</div>' +
        '<div class="cl-text">' + item + '</div></div>';
    });
    html += '</div>';
  });

  clMd.innerHTML = html;
  document.getElementById('v8ClClose').addEventListener('click', function(){ clOv.classList.remove('active'); });

  clMd.querySelectorAll('.cl-item').forEach(function(el){
    el.addEventListener('click', function(){
      var item = el.dataset.item;
      if(checked[item]) delete checked[item];
      else checked[item] = true;
      saveCheckedItems(checked);
      renderChecklist();
    });
  });

  document.getElementById('v8ClReset').addEventListener('click', function(){
    localStorage.removeItem('sg_v8_checklist');
    renderChecklist();
    v8Toast('체크리스트 초기화 완료', 'info');
  });
}

// ====================================================================
// 4. CLUB DISTANCE MANAGER
// ====================================================================
var cdOv = v8CreateOverlay('v8CdOv');
var cdMd = document.createElement('div');
cdMd.className = 'v8-modal';
cdMd.style.maxWidth = '580px';
cdOv.appendChild(cdMd);

var defaultClubs = [
  {name:'드라이버', icon:'&#127948;', avg:220, type:'우드'},
  {name:'3번 우드', icon:'&#127795;', avg:200, type:'우드'},
  {name:'5번 우드', icon:'&#127795;', avg:185, type:'우드'},
  {name:'4번 유틸', icon:'&#128296;', avg:175, type:'유틸'},
  {name:'5번 아이언', icon:'&#9971;', avg:165, type:'아이언'},
  {name:'6번 아이언', icon:'&#9971;', avg:155, type:'아이언'},
  {name:'7번 아이언', icon:'&#9971;', avg:145, type:'아이언'},
  {name:'8번 아이언', icon:'&#9971;', avg:135, type:'아이언'},
  {name:'9번 아이언', icon:'&#9971;', avg:125, type:'아이언'},
  {name:'PW', icon:'&#127919;', avg:110, type:'웨지'},
  {name:'AW (50)', icon:'&#127919;', avg:95, type:'웨지'},
  {name:'SW (56)', icon:'&#127919;', avg:80, type:'웨지'},
  {name:'LW (60)', icon:'&#127919;', avg:60, type:'웨지'},
  {name:'퍼터', icon:'&#128310;', avg:0, type:'퍼터'}
];

function getClubDistances() {
  var saved = JSON.parse(localStorage.getItem('sg_v8_clubs') || 'null');
  if(!saved) return defaultClubs.map(function(c){ return {name:c.name, icon:c.icon, avg:c.avg, min:Math.round(c.avg*0.9), max:Math.round(c.avg*1.1), type:c.type}; });
  return saved;
}
function saveClubDistances(data) {
  localStorage.setItem('sg_v8_clubs', JSON.stringify(data));
}

function renderClubDistance() {
  var clubs = getClubDistances();

  var html = '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px">' +
    '<h2 style="margin:0"><span class="v8-icon" style="background:linear-gradient(135deg,#7b1fa2,#ce93d8)">&#127948;</span> 클럽 거리 관리</h2>' +
    '<button class="v8-close" id="v8CdClose">&times;</button></div>' +
    '<p style="font-size:12px;color:var(--text-muted);margin-bottom:12px">각 클럽의 평균 비거리를 입력하세요 (미터)</p>' +
    '<div style="overflow-x:auto"><table class="cd-table"><thead><tr><th></th><th>클럽</th><th>최소</th><th>평균</th><th>최대</th></tr></thead><tbody>';

  clubs.forEach(function(c, i){
    if(c.type === '퍼터') return;
    html += '<tr>' +
      '<td class="cd-icon">' + c.icon + '</td>' +
      '<td class="cd-name">' + c.name + '</td>' +
      '<td><input type="number" data-idx="' + i + '" data-field="min" value="' + (c.min||'') + '" placeholder="-"></td>' +
      '<td><input type="number" data-idx="' + i + '" data-field="avg" value="' + (c.avg||'') + '" placeholder="-" style="font-weight:800;color:var(--primary)"></td>' +
      '<td><input type="number" data-idx="' + i + '" data-field="max" value="' + (c.max||'') + '" placeholder="-"></td>' +
      '</tr>';
  });

  html += '</tbody></table></div>' +
    '<div class="cd-chart-wrap"><canvas id="v8CdChart"></canvas></div>' +
    '<div style="display:flex;gap:8px;justify-content:center;margin-top:12px">' +
    '<button class="v8-btn v8-btn-primary" id="v8CdSave">&#128190; 저장</button>' +
    '<button class="v8-btn" id="v8CdReset" style="background:var(--bg);border:1px solid var(--border);color:var(--text)">&#128260; 기본값</button></div>';

  cdMd.innerHTML = html;
  document.getElementById('v8CdClose').addEventListener('click', function(){ cdOv.classList.remove('active'); });

  document.getElementById('v8CdSave').addEventListener('click', function(){
    cdMd.querySelectorAll('input[data-idx]').forEach(function(inp){
      var idx = parseInt(inp.dataset.idx);
      var field = inp.dataset.field;
      clubs[idx][field] = parseInt(inp.value) || 0;
    });
    saveClubDistances(clubs);
    v8Toast('클럽 거리 저장 완료!', 'success');
    drawClubChart(clubs);
  });

  document.getElementById('v8CdReset').addEventListener('click', function(){
    localStorage.removeItem('sg_v8_clubs');
    renderClubDistance();
    v8Toast('기본값으로 복원', 'info');
  });

  setTimeout(function(){ drawClubChart(clubs); }, 100);
}

function drawClubChart(clubs) {
  var canvas = document.getElementById('v8CdChart');
  if(!canvas) return;
  var ctx = canvas.getContext('2d');
  var w = canvas.parentElement.offsetWidth;
  var h = 220;
  canvas.width = w * 2; canvas.height = h * 2;
  canvas.style.width = w + 'px'; canvas.style.height = h + 'px';
  ctx.scale(2, 2);

  var filtered = clubs.filter(function(c){ return c.type !== '퍼터' && c.avg > 0; });
  if(!filtered.length) return;

  var maxDist = Math.max.apply(null, filtered.map(function(c){ return c.max || c.avg; })) + 20;
  var pad = {top:20, right:20, bottom:50, left:10};
  var cw = w - pad.left - pad.right;
  var ch = h - pad.top - pad.bottom;
  var barW = Math.min(30, (cw / filtered.length) - 8);

  filtered.forEach(function(c, i){
    var x = pad.left + (cw / filtered.length) * i + (cw / filtered.length - barW) / 2;
    var barH = (c.avg / maxDist) * ch;
    var y = pad.top + ch - barH;

    var grad = ctx.createLinearGradient(x, y, x, pad.top + ch);
    grad.addColorStop(0, '#1a7a3a');
    grad.addColorStop(1, '#7bed9f');
    ctx.fillStyle = grad;
    ctx.beginPath();
    var r = 4;
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + barW - r, y);
    ctx.quadraticCurveTo(x + barW, y, x + barW, y + r);
    ctx.lineTo(x + barW, pad.top + ch);
    ctx.lineTo(x, pad.top + ch);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.fill();

    if(c.min > 0 && c.max > 0){
      var minY = pad.top + ch - (c.min / maxDist) * ch;
      var maxY = pad.top + ch - (c.max / maxDist) * ch;
      ctx.strokeStyle = 'rgba(26,122,58,0.5)';
      ctx.lineWidth = 2;
      var cx2 = x + barW / 2;
      ctx.beginPath(); ctx.moveTo(cx2, maxY); ctx.lineTo(cx2, minY); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(cx2 - 4, maxY); ctx.lineTo(cx2 + 4, maxY); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(cx2 - 4, minY); ctx.lineTo(cx2 + 4, minY); ctx.stroke();
    }

    ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--text').trim() || '#1a1a1a';
    ctx.font = 'bold 10px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(c.avg + 'm', x + barW/2, y - 6);

    ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--text-muted').trim() || '#666';
    ctx.font = '9px sans-serif';
    ctx.save();
    ctx.translate(x + barW/2, pad.top + ch + 10);
    ctx.rotate(-Math.PI / 4);
    ctx.textAlign = 'right';
    ctx.fillText(c.name, 0, 0);
    ctx.restore();
  });
}

// ====================================================================
// 5. PARTNER MANAGEMENT
// ====================================================================
var ptOv = v8CreateOverlay('v8PtOv');
var ptMd = document.createElement('div');
ptMd.className = 'v8-modal';
ptOv.appendChild(ptMd);

function getPartners() {
  return JSON.parse(localStorage.getItem('sg_v8_partners') || '[]');
}
function savePartners(data) {
  localStorage.setItem('sg_v8_partners', JSON.stringify(data));
}

var avatarColors = ['#e53935','#1565c0','#2e7d32','#f57f17','#7b1fa2','#00838f','#d84315','#37474f'];
var avatarEmojis = ['&#128051;','&#127948;','&#9971;','&#127942;','&#128170;','&#11088;','&#128293;','&#127793;'];

function renderPartners() {
  var partners = getPartners();
  var html = '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px">' +
    '<h2 style="margin:0"><span class="v8-icon" style="background:linear-gradient(135deg,#00838f,#4dd0e1)">&#128101;</span> 동반자 관리</h2>' +
    '<button class="v8-close" id="v8PtClose">&times;</button></div>' +
    '<p style="font-size:12px;color:var(--text-muted);margin-bottom:12px">함께 라운딩하는 파트너를 관리하세요 (' + partners.length + '명)</p>';

  if(partners.length === 0){
    html += '<div style="text-align:center;padding:24px;color:var(--text-muted)"><div style="font-size:40px;margin-bottom:8px">&#128101;</div>' +
      '<p style="font-size:13px">등록된 동반자가 없습니다<br>아래에서 추가해보세요!</p></div>';
  } else {
    partners.forEach(function(p, i){
      var color = avatarColors[i % avatarColors.length];
      html += '<div class="pt-card"><div class="pt-avatar" style="background:' + color + '22;color:' + color + '">' + avatarEmojis[i % avatarEmojis.length] + '</div>' +
        '<div class="pt-info"><div class="pt-name">' + p.name + '</div>' +
        '<div class="pt-meta">' + (p.handicap ? 'HC ' + p.handicap : '') + (p.phone ? ' &middot; ' + p.phone : '') + ' &middot; ' + (p.rounds||0) + '회 동반</div></div>' +
        '<div class="pt-actions">' +
        '<button class="pt-btn pt-btn-del" data-delidx="' + i + '">&#128465;</button>' +
        '</div></div>';
    });
  }

  html += '<div class="v8-section" style="margin-top:16px"><h3>&#10133; 동반자 추가</h3>' +
    '<div class="pt-form">' +
    '<input type="text" id="v8PtName" placeholder="이름 (필수)">' +
    '<input type="text" id="v8PtPhone" placeholder="연락처">' +
    '<input type="number" id="v8PtHc" placeholder="핸디캡" min="0" max="54">' +
    '<button class="v8-btn v8-btn-primary" id="v8PtAdd">&#10133; 추가하기</button>' +
    '</div></div>';

  ptMd.innerHTML = html;
  document.getElementById('v8PtClose').addEventListener('click', function(){ ptOv.classList.remove('active'); });

  document.getElementById('v8PtAdd').addEventListener('click', function(){
    var name = document.getElementById('v8PtName').value.trim();
    if(!name){ v8Toast('이름을 입력하세요', 'warn'); return; }
    partners.push({
      name: name,
      phone: document.getElementById('v8PtPhone').value.trim(),
      handicap: parseInt(document.getElementById('v8PtHc').value) || null,
      rounds: 0,
      added: new Date().toISOString().split('T')[0]
    });
    savePartners(partners);
    renderPartners();
    v8Toast(name + ' 추가 완료!', 'success');
  });

  ptMd.querySelectorAll('[data-delidx]').forEach(function(btn){
    btn.addEventListener('click', function(){
      var idx = parseInt(btn.dataset.delidx);
      partners.splice(idx, 1);
      savePartners(partners);
      renderPartners();
      v8Toast('동반자 삭제 완료', 'info');
    });
  });
}

// ====================================================================
// 6. COURSE STRATEGY GUIDE
// ====================================================================
var sgOv = v8CreateOverlay('v8SgOv');
var sgMd = document.createElement('div');
sgMd.className = 'v8-modal';
sgOv.appendChild(sgMd);

var strategyData = [
  {cat:'티샷 전략',title:'드라이버 vs 아이언 티샷',tip:'파4 홀에서 좁은 페어웨이나 해저드가 있으면 3번 우드 또는 아이언으로 안전하게 레이업. 거리보다 정확성이 중요한 홀을 파악하세요.',detail:'페어웨이 폭이 30야드 이하거나, 200야드 이내에 워터해저드가 있는 경우 클럽 다운을 권장합니다.'},
  {cat:'티샷 전략',title:'바람 대응 티샷',tip:'맞바람에서는 공을 낮게(펀치샷), 뒷바람에서는 높게 띄워 비거리를 활용. 티 높이를 조절하면 탄도를 제어할 수 있습니다.',detail:'맞바람 10m/s당 약 10% 거리 손실. 뒷바람은 5~7% 추가 비거리.'},
  {cat:'어프로치',title:'그린 공략 방향',tip:'핀 위치보다 그린 중앙을 노리는 것이 안전. 핀이 가장자리에 있을 때 무리하면 벙커나 OB 위험 증가.',detail:'아마추어 골퍼의 그린 적중률은 평균 30%. 중앙 공략 시 2퍼트 파 세이브 확률이 60% 이상.'},
  {cat:'어프로치',title:'업힐 vs 다운힐 어프로치',tip:'오르막 그린은 한 클럽 크게, 내리막은 한 클럽 작게 선택. 표고차 10m당 약 1클럽 차이가 납니다.',detail:'경사도가 있는 코스에서는 거리측정기의 경사 보정 기능 활용을 권장합니다.'},
  {cat:'벙커',title:'벙커 탈출 기본',tip:'모래가 많은 벙커는 공 뒤 5cm를 노리고, 모래가 적은 벙커는 클린하게 접촉. 체중의 70%를 왼발에 싣고 오픈 스탠스로 스윙.',detail:'페어웨이 벙커에서는 한 클럽 크게 잡고 볼을 먼저 맞히는 것이 핵심.'},
  {cat:'벙커',title:'턱이 높은 벙커',tip:'로브웨지(60도)를 열어 높이 띄우세요. 볼 위치는 왼발 앞, 백스윙을 크게 하되 폴로스루를 충분히.',detail:'턱 높이가 1m 이상이면 옆으로 탈출하는 것이 안전한 판단일 수 있습니다.'},
  {cat:'퍼팅',title:'라인 읽기',tip:'그린에 올라서면 먼저 전체 경사를 파악하세요. 저지대에서 보면 경사가 잘 보입니다. 공 뒤쪽과 반대편 양쪽에서 확인.',detail:'대부분의 아마추어는 브레이크를 실제보다 작게 읽습니다. 두 배로 읽으면 적중률이 높아집니다.'},
  {cat:'퍼팅',title:'거리 조절',tip:'롱퍼트에서는 방향보다 거리 조절이 중요. 3퍼트를 피하려면 홀 주변 1m 원 안에 넣는 것을 목표로 하세요.',detail:'퍼팅 거리 연습: 눈을 감고 3m, 6m, 9m를 치면서 감각을 키우세요.'},
  {cat:'코스 관리',title:'더블보기 방지',tip:'보기는 허용하되 더블보기 이상을 방지하세요. 위험한 샷 대신 안전한 선택을 하면 스코어가 크게 줄어듭니다.',detail:'핸디캡 18 기준, 더블보기를 3개만 줄여도 스코어 6타 감소 효과.'},
  {cat:'코스 관리',title:'레이업 전략',tip:'파5에서 무리하게 2온을 노리기보다, 3번째 샷으로 좋은 거리를 남기는 레이업이 더 높은 파 세이브율을 보입니다.',detail:'100야드 이내 웨지 샷이 가장 정확한 거리. 파5에서 3번째 샷을 90~110야드로 남기세요.'},
  {cat:'멘탈',title:'미스 샷 후 대응',tip:'나쁜 샷 후 바로 만회하려 하지 마세요. 다음 샷에 집중하고, 한 홀 단위로 기분을 리셋하세요.',detail:'프로 골퍼도 18홀 중 4~5개의 미스 샷을 합니다. 차이는 미스 후 대응 방법입니다.'},
  {cat:'멘탈',title:'프리샷 루틴',tip:'매 샷 전 동일한 루틴을 수행하세요. 타겟 확인 → 연습 스윙 → 셋업 → 스윙. 일관된 루틴이 일관된 결과를 만듭니다.',detail:'프리샷 루틴 시간은 15~20초가 적당합니다. 너무 길면 오히려 긴장됩니다.'}
];

function renderStrategy(filterCat) {
  var cats = [];
  strategyData.forEach(function(s){ if(cats.indexOf(s.cat)===-1) cats.push(s.cat); });
  var shown = filterCat ? strategyData.filter(function(s){ return s.cat === filterCat; }) : strategyData;

  var html = '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px">' +
    '<h2 style="margin:0"><span class="v8-icon" style="background:linear-gradient(135deg,#2e7d32,#66bb6a)">&#127919;</span> 코스 전략 가이드</h2>' +
    '<button class="v8-close" id="v8SgClose">&times;</button></div>' +
    '<p style="font-size:12px;color:var(--text-muted);margin-bottom:12px">' + strategyData.length + '개 전략 &middot; 프로처럼 코스를 공략하세요</p>' +
    '<div class="v8-tabs">' +
    '<div class="v8-tab' + (!filterCat?' active':'') + '" data-scat="">전체</div>' +
    cats.map(function(c){ return '<div class="v8-tab' + (filterCat===c?' active':'') + '" data-scat="' + c + '">' + c + '</div>'; }).join('') +
    '</div>';

  shown.forEach(function(s){
    html += '<div class="stg-card"><h4>&#128161; ' + s.title + '</h4>' +
      '<p>' + s.tip + '</p>' +
      '<div class="stg-tip">&#128202; <strong>데이터:</strong> ' + s.detail + '</div></div>';
  });

  sgMd.innerHTML = html;
  document.getElementById('v8SgClose').addEventListener('click', function(){ sgOv.classList.remove('active'); });
  sgMd.querySelectorAll('.v8-tab').forEach(function(tab){
    tab.addEventListener('click', function(){ renderStrategy(tab.dataset.scat || null); });
  });
}

// ====================================================================
// 7. PRACTICE DRILL PLANNER
// ====================================================================
var dpOv = v8CreateOverlay('v8DpOv');
var dpMd = document.createElement('div');
dpMd.className = 'v8-modal';
dpOv.appendChild(dpMd);

var drillPlan = {
  '월요일': [
    {icon:'&#127948;', name:'드라이버 정확성', dur:'20분', desc:'타겟 좌우 30야드 이내 적중 연습'},
    {icon:'&#9971;', name:'아이언 거리조절', dur:'20분', desc:'7번 아이언 80%/90%/100% 스윙'},
    {icon:'&#128170;', name:'코어 스트레칭', dur:'10분', desc:'골프 근육 활성화 루틴'}
  ],
  '화요일': [
    {icon:'&#127919;', name:'숏게임 집중', dur:'30분', desc:'30/50/70야드 웨지 연습'},
    {icon:'&#128310;', name:'퍼팅 거리감', dur:'20분', desc:'3m/6m/9m 반복 퍼팅'}
  ],
  '수요일': [
    {icon:'&#128170;', name:'휴식 또는 유산소', dur:'30분', desc:'가볍게 걷기 또는 조깅'},
    {icon:'&#128218;', name:'룰/전략 공부', dur:'15분', desc:'규칙서 읽기 또는 코스 전략 분석'}
  ],
  '목요일': [
    {icon:'&#127948;', name:'드라이버 비거리', dur:'20분', desc:'스윙 속도 향상 드릴'},
    {icon:'&#127919;', name:'벙커 연습', dur:'15분', desc:'다양한 모래 조건 탈출 연습'},
    {icon:'&#128310;', name:'숏퍼팅', dur:'15분', desc:'1.5m 이내 30개 연속 성공 도전'}
  ],
  '금요일': [
    {icon:'&#9971;', name:'풀스윙 종합', dur:'20분', desc:'전 클럽 5발씩 루틴 연습'},
    {icon:'&#127919;', name:'칩샷/피치샷', dur:'20분', desc:'그린 주변 다양한 상황 연습'},
    {icon:'&#128170;', name:'밸런스 훈련', dur:'10분', desc:'한발 서기, 밸런스 보드'}
  ],
  '토요일': [
    {icon:'&#128161;', name:'코스 시뮬레이션', dur:'30분', desc:'실제 코스 상상하며 연습'},
    {icon:'&#128310;', name:'퍼팅 라인 읽기', dur:'20분', desc:'경사 연습 그린에서 라인 연습'}
  ],
  '일요일': [
    {icon:'&#127942;', name:'라운딩 또는 휴식', dur:'-', desc:'실전 라운딩 또는 완전 휴식'}
  ]
};

function getDrillDone() {
  var today = new Date().toISOString().split('T')[0];
  var saved = JSON.parse(localStorage.getItem('sg_v8_drills') || '{}');
  if(saved._date !== today) return {_date: today};
  return saved;
}
function saveDrillDone(data) {
  localStorage.setItem('sg_v8_drills', JSON.stringify(data));
}

function renderDrillPlanner() {
  var done = getDrillDone();
  var dayNames = ['일요일','월요일','화요일','수요일','목요일','금요일','토요일'];
  var today = dayNames[new Date().getDay()];

  var html = '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px">' +
    '<h2 style="margin:0"><span class="v8-icon" style="background:linear-gradient(135deg,#d84315,#ff8a65)">&#128170;</span> 연습 드릴 플래너</h2>' +
    '<button class="v8-close" id="v8DpClose">&times;</button></div>' +
    '<p style="font-size:12px;color:var(--text-muted);margin-bottom:12px">오늘은 <strong>' + today + '</strong> &middot; 매일 꾸준한 연습이 실력 향상의 비결!</p>';

  Object.keys(drillPlan).forEach(function(day){
    var isToday = day === today;
    html += '<div class="dp-day">' +
      '<div class="dp-day-title">' + (isToday ? '&#128293; ' : '&#128197; ') + day + (isToday ? ' (오늘)' : '') + '</div>';
    drillPlan[day].forEach(function(d, i){
      var key = day + '_' + i;
      var isDone = done[key];
      html += '<div class="dp-drill">' +
        '<div class="dp-icon">' + d.icon + '</div>' +
        '<div style="flex:1"><div class="dp-name">' + d.name + '</div>' +
        '<div class="dp-dur">' + d.dur + ' &middot; ' + d.desc + '</div></div>' +
        '<div class="dp-check' + (isDone ? ' done' : '') + '" data-dkey="' + key + '">' + (isDone ? '&#10003;' : '') + '</div></div>';
    });
    html += '</div>';
  });

  dpMd.innerHTML = html;
  document.getElementById('v8DpClose').addEventListener('click', function(){ dpOv.classList.remove('active'); });

  dpMd.querySelectorAll('.dp-check').forEach(function(el){
    el.addEventListener('click', function(){
      var key = el.dataset.dkey;
      if(done[key]) delete done[key];
      else done[key] = true;
      saveDrillDone(done);
      el.classList.toggle('done');
      el.innerHTML = done[key] ? '&#10003;' : '';
      if(done[key]) v8Toast('드릴 완료! &#128170;', 'success');
    });
  });
}

// ====================================================================
// 8. SCORE GOAL TRACKER
// ====================================================================
var gtOv = v8CreateOverlay('v8GtOv');
var gtMd = document.createElement('div');
gtMd.className = 'v8-modal';
gtOv.appendChild(gtMd);

function getGoals() {
  return JSON.parse(localStorage.getItem('sg_v8_goals') || '[]');
}
function saveGoals(data) {
  localStorage.setItem('sg_v8_goals', JSON.stringify(data));
}

function renderGoalTracker() {
  var goals = getGoals();
  var rounds = JSON.parse(localStorage.getItem('sg_rounds') || '[]');
  var scores = rounds.map(function(r){ return r.score; }).filter(Boolean);
  var currentAvg = scores.length ? Math.round(scores.reduce(function(a,b){return a+b;},0)/scores.length) : null;
  var bestScore = scores.length ? Math.min.apply(null, scores) : null;

  var html = '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px">' +
    '<h2 style="margin:0"><span class="v8-icon" style="background:linear-gradient(135deg,#f57f17,#ffb74d)">&#127919;</span> 스코어 목표 추적</h2>' +
    '<button class="v8-close" id="v8GtClose">&times;</button></div>';

  if(currentAvg) {
    html += '<div style="display:flex;gap:12px;margin-bottom:16px">' +
      '<div class="gt-goal" style="flex:1;text-align:center"><div class="gt-target">현재 평균</div><div class="gt-val">' + currentAvg + '</div></div>' +
      '<div class="gt-goal" style="flex:1;text-align:center"><div class="gt-target">최저 스코어</div><div class="gt-val" style="color:#2e7d32">' + bestScore + '</div></div>' +
      '<div class="gt-goal" style="flex:1;text-align:center"><div class="gt-target">라운드 수</div><div class="gt-val">' + scores.length + '</div></div></div>';
  }

  if(goals.length === 0){
    html += '<div style="text-align:center;padding:24px;color:var(--text-muted)"><div style="font-size:40px;margin-bottom:8px">&#127919;</div>' +
      '<p style="font-size:13px">설정된 목표가 없습니다<br>아래에서 목표를 추가하세요!</p></div>';
  } else {
    goals.forEach(function(g, i){
      var progress = 0;
      var status = '';
      if(g.type === 'avg' && currentAvg){
        var startDiff = g.startAvg - g.target;
        var currentDiff = g.startAvg - currentAvg;
        progress = startDiff > 0 ? Math.min(100, Math.round(currentDiff / startDiff * 100)) : (currentAvg <= g.target ? 100 : 0);
        status = currentAvg <= g.target ? '목표 달성!' : '평균 ' + currentAvg + ' → 목표 ' + g.target;
      } else if(g.type === 'best' && bestScore){
        progress = bestScore <= g.target ? 100 : Math.max(0, Math.round((1 - (bestScore - g.target) / 20) * 100));
        status = bestScore <= g.target ? '목표 달성!' : '최저 ' + bestScore + ' → 목표 ' + g.target;
      } else if(g.type === 'rounds'){
        progress = Math.min(100, Math.round(scores.length / g.target * 100));
        status = scores.length + '/' + g.target + '회 라운딩';
      }

      var fillCls = progress >= 100 ? 'gt-achieved' : progress >= 50 ? 'gt-in-progress' : 'gt-far';

      html += '<div class="gt-goal">' +
        '<div style="display:flex;justify-content:space-between;align-items:center">' +
        '<div><div class="gt-target">' + g.label + '</div>' +
        '<div class="gt-current" style="color:var(--text-muted)">' + status + '</div></div>' +
        '<button class="pt-btn pt-btn-del" data-gdelidx="' + i + '">&#128465;</button></div>' +
        '<div class="gt-progress"><div class="gt-progress-fill ' + fillCls + '" style="width:' + progress + '%"></div></div>' +
        '<div style="text-align:right;font-size:11px;color:var(--text-muted);margin-top:4px">' + progress + '%</div></div>';
    });
  }

  html += '<div class="v8-section" style="margin-top:16px"><h3>&#10133; 새 목표 추가</h3>' +
    '<div class="gt-form">' +
    '<select id="v8GtType"><option value="avg">평균 스코어 목표</option><option value="best">최저 스코어 목표</option><option value="rounds">라운드 횟수 목표</option></select>' +
    '<input type="number" id="v8GtTarget" placeholder="목표값 (예: 85)" min="1">' +
    '<input type="text" id="v8GtLabel" placeholder="목표 이름 (예: 올해 80타 달성)">' +
    '<button class="v8-btn v8-btn-primary" id="v8GtAdd">&#127919; 목표 추가</button>' +
    '</div></div>';

  gtMd.innerHTML = html;
  document.getElementById('v8GtClose').addEventListener('click', function(){ gtOv.classList.remove('active'); });

  document.getElementById('v8GtAdd').addEventListener('click', function(){
    var type = document.getElementById('v8GtType').value;
    var target = parseInt(document.getElementById('v8GtTarget').value);
    var label = document.getElementById('v8GtLabel').value.trim();
    if(!target){ v8Toast('목표값을 입력하세요', 'warn'); return; }
    if(!label) label = type === 'avg' ? '평균 ' + target + '타 달성' : type === 'best' ? '최저 ' + target + '타 달성' : target + '회 라운딩';
    goals.push({type:type, target:target, label:label, startAvg: currentAvg||100, created: new Date().toISOString().split('T')[0]});
    saveGoals(goals);
    renderGoalTracker();
    v8Toast('목표 추가 완료! 화이팅!', 'success');
  });

  gtMd.querySelectorAll('[data-gdelidx]').forEach(function(btn){
    btn.addEventListener('click', function(){
      goals.splice(parseInt(btn.dataset.gdelidx), 1);
      saveGoals(goals);
      renderGoalTracker();
      v8Toast('목표 삭제 완료', 'info');
    });
  });
}

// ====================================================================
// 9. GOLF ETIQUETTE ADVANCED GUIDE (30+)
// ====================================================================
var etOv = v8CreateOverlay('v8EtOv');
var etMd = document.createElement('div');
etMd.className = 'v8-modal';
etOv.appendChild(etMd);

var etiquetteData = [
  {cat:'그린',importance:3,title:'그린 위 볼마크 수리',desc:'자신의 볼마크는 물론 눈에 보이는 다른 볼마크도 수리해주세요. 볼마크 수리 도구를 사용하여 잔디 가장자리를 중앙으로 밀어 넣고 평평하게 다져주세요.'},
  {cat:'그린',importance:3,title:'다른 플레이어 라인 존중',desc:'다른 플레이어의 퍼팅 라인 위를 걷지 마세요. 라인 주변을 돌아서 이동하고, 홀 뒤쪽도 밟지 않도록 주의하세요.'},
  {cat:'그린',importance:2,title:'그린 위 그림자',desc:'다른 플레이어가 퍼팅할 때 그림자가 퍼팅 라인이나 홀에 드리우지 않도록 위치를 조절하세요.'},
  {cat:'그린',importance:2,title:'깃대 관리',desc:'깃대를 뺄 때는 그린 가장자리에 조심스럽게 놓으세요. 다시 꽂을 때는 홀 가장자리를 손상시키지 않도록 주의하세요.'},
  {cat:'그린',importance:3,title:'퍼팅 시 정숙',desc:'다른 플레이어가 퍼팅할 때 절대 움직이거나 소리를 내지 마세요. 클럽을 내려놓거나 벨크로를 열지 마세요.'},
  {cat:'코스',importance:3,title:'디봇 복구',desc:'페어웨이에서 디봇을 만들면 반드시 잔디를 원래 자리에 다시 덮거나, 모래주머니의 모래로 채우세요.'},
  {cat:'코스',importance:2,title:'벙커 고르기',desc:'벙커에서 나올 때는 반드시 레이크로 발자국과 샷 자국을 정리하세요. 가장 낮은 쪽으로 나와 레이크를 벙커 밖에 놓으세요.'},
  {cat:'코스',importance:2,title:'카트 경로 준수',desc:'카트 경로를 벗어나지 마세요. 특히 비 온 후에는 페어웨이 진입을 삼가고, 90도 규칙을 준수하세요.'},
  {cat:'코스',importance:1,title:'자연 보호',desc:'담배꽁초, 간식 포장지 등 쓰레기를 절대 코스에 버리지 마세요. 야생동물을 방해하지 마세요.'},
  {cat:'코스',importance:2,title:'연습 스윙 잔디',desc:'연습 스윙으로 잔디를 뜯지 마세요. 특히 티박스와 그린 주변에서 주의하세요. 연습 스윙은 공 옆에서 하세요.'},
  {cat:'진행',importance:3,title:'플레이 속도',desc:'18홀 4시간 15분 이내를 목표로 하세요. 자기 차례가 오기 전에 미리 클럽 선택과 거리 확인을 마쳐두세요.'},
  {cat:'진행',importance:3,title:'레디 골프',desc:'준비된 사람이 먼저 치는 Ready Golf를 실천하세요. 단, 안전이 확보된 경우에만. 특히 파3 홀에서 효과적입니다.'},
  {cat:'진행',importance:2,title:'공 찾기 시간',desc:'공 찾는 시간은 3분 이내. 찾기 어려울 것 같으면 미리 잠정구를 치세요. 뒷팀을 배려하는 것이 매너입니다.'},
  {cat:'진행',importance:2,title:'퍼팅 후 이동',desc:'홀아웃 후 그린에서 스코어를 적지 마세요. 빠르게 그린을 벗어나 다음 티로 이동하면서 스코어를 기록하세요.'},
  {cat:'진행',importance:2,title:'앞팀과 간격',desc:'앞팀과 1홀 이상 벌어지면 뒷팀에게 패스를 제안하세요. 뒷팀이 기다리게 하지 않는 것이 좋은 매너입니다.'},
  {cat:'사회',importance:3,title:'안전 확인',desc:'샷 전에 반드시 전방과 주변에 사람이 없는지 확인하세요. 위험 시 즉시 &quot;포어!&quot;를 외치세요. 가장 중요한 에티켓입니다.'},
  {cat:'사회',importance:2,title:'휴대폰 매너',desc:'라운딩 중 휴대폰은 무음 모드. 통화는 짧게, 다른 플레이어의 샷 중에는 절대 통화하지 마세요.'},
  {cat:'사회',importance:2,title:'감정 조절',desc:'클럽을 던지거나 심한 욕설은 절대 금지. 좌절감은 자연스럽지만 같은 팀과 주변 팀에게 불쾌감을 줍니다.'},
  {cat:'사회',importance:1,title:'복장 규정',desc:'골프장 드레스 코드를 준수하세요. 일반적으로 칼라 셔츠, 골프 바지, 골프화가 기본. 청바지, 슬리퍼, 민소매는 대부분 금지입니다.'},
  {cat:'사회',importance:2,title:'인사와 감사',desc:'첫 홀 티에서 동반자에게 인사하고, 18홀 후 악수하며 감사를 표하세요. 캐디에게도 수고했다는 말을 건네세요.'},
  {cat:'사회',importance:2,title:'캐디 존중',desc:'캐디의 조언을 경청하고 존중하세요. 명령 투가 아닌 부탁 투로 대화하고, 라운드 후 적절한 팁을 준비하세요.'},
  {cat:'사회',importance:1,title:'동반자 격려',desc:'좋은 샷에는 칭찬을, 미스 샷에는 위로를 건네세요. 지나친 조언은 삼가되, 요청 시 친절하게 도와주세요.'},
  {cat:'그린',importance:2,title:'홀컵 주변 보호',desc:'홀컵에서 공을 꺼낼 때 퍼터를 홀에 기대지 마세요. 홀 가장자리 잔디가 손상됩니다. 손으로 공만 꺼내세요.'},
  {cat:'코스',importance:2,title:'물/해저드 주변',desc:'해저드 표시 말뚝 근처에서 연습 스윙을 하지 마세요. 말뚝을 뽑거나 움직이지 마세요(움직일 수 있는 장해물 제외).'},
  {cat:'진행',importance:1,title:'비가 올 때',desc:'비가 와도 가능하면 플레이를 계속하세요. 번개 시에만 대피소로 이동. 우천용 장갑과 타올을 미리 준비하세요.'},
  {cat:'사회',importance:1,title:'사진 촬영',desc:'다른 플레이어의 스윙 중에는 사진/영상 촬영을 삼가세요. 셔터 소리가 집중을 방해합니다. 미리 양해를 구하세요.'},
  {cat:'코스',importance:2,title:'카트 에티켓',desc:'카트에서 내릴 때 파킹브레이크를 확인하세요. 내리막에서는 특히 주의. 경사면에서 카트를 세우지 마세요.'},
  {cat:'진행',importance:2,title:'티잉 구역 준비',desc:'티에 올라서기 전에 클럽, 볼, 티를 미리 준비하세요. 티잉 구역에서 여러 번 연습 스윙을 하면 진행이 느려집니다.'},
  {cat:'그린',importance:1,title:'마크 후 공 닦기',desc:'볼을 마크한 후 수건으로 닦아 이물질을 제거하세요. 더러운 공은 퍼팅 방향에 영향을 줄 수 있습니다.'},
  {cat:'사회',importance:2,title:'배팅 주의',desc:'과도한 배팅은 삼가세요. 가벼운 내기는 재미를 더하지만, 금액이 크면 관계를 해칠 수 있습니다. 법적 문제도 발생할 수 있으니 주의하세요.'}
];

function renderEtiquette(filterCat) {
  var cats = [];
  etiquetteData.forEach(function(e){ if(cats.indexOf(e.cat)===-1) cats.push(e.cat); });
  var shown = filterCat ? etiquetteData.filter(function(e){ return e.cat === filterCat; }) : etiquetteData;

  var catCls = {'그린':'et-cat-green', '코스':'et-cat-course', '진행':'et-cat-pace', '사회':'et-cat-social'};

  var html = '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px">' +
    '<h2 style="margin:0"><span class="v8-icon" style="background:linear-gradient(135deg,#1565c0,#64b5f6)">&#129309;</span> 골프 에티켓 가이드</h2>' +
    '<button class="v8-close" id="v8EtClose">&times;</button></div>' +
    '<p style="font-size:12px;color:var(--text-muted);margin-bottom:12px">' + etiquetteData.length + '개 에티켓 &middot; 좋은 골퍼는 매너로 완성됩니다</p>' +
    '<div class="v8-tabs">' +
    '<div class="v8-tab' + (!filterCat?' active':'') + '" data-ecat="">전체 (' + etiquetteData.length + ')</div>' +
    cats.map(function(c){
      var cnt = etiquetteData.filter(function(e){ return e.cat===c; }).length;
      return '<div class="v8-tab' + (filterCat===c?' active':'') + '" data-ecat="' + c + '">' + c + ' (' + cnt + ')</div>';
    }).join('') + '</div>';

  shown.forEach(function(e){
    var cls = catCls[e.cat] || 'et-cat-green';
    var stars = '';
    for(var s=0;s<e.importance;s++) stars += '&#11088;';
    html += '<div class="et-item"><div class="et-title"><span class="et-cat ' + cls + '">' + e.cat + '</span> ' + e.title +
      '<span class="et-importance">' + stars + '</span>' +
      '<span class="et-arrow">&#9660;</span></div>' +
      '<div class="et-desc">' + e.desc + '</div></div>';
  });

  etMd.innerHTML = html;
  document.getElementById('v8EtClose').addEventListener('click', function(){ etOv.classList.remove('active'); });

  etMd.querySelectorAll('.v8-tab').forEach(function(tab){
    tab.addEventListener('click', function(){ renderEtiquette(tab.dataset.ecat || null); });
  });
  etMd.querySelectorAll('.et-item').forEach(function(item){
    item.addEventListener('click', function(){ item.classList.toggle('expanded'); });
  });
}

// ====================================================================
// 10. SWING TEMPO METRONOME (Web Audio)
// ====================================================================
var mtOv = v8CreateOverlay('v8MtOv');
var mtMd = document.createElement('div');
mtMd.className = 'v8-modal';
mtMd.style.maxWidth = '420px';
mtOv.appendChild(mtMd);

var metroState = {bpm: 72, running: false, intervalId: null, audioCtx: null, beatCount: 0};

function playMetroBeat(freq, dur) {
  if(!metroState.audioCtx) metroState.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  var ctx = metroState.audioCtx;
  var osc = ctx.createOscillator();
  var gain = ctx.createGain();
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.frequency.value = freq;
  osc.type = 'sine';
  gain.gain.setValueAtTime(0.4, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + dur);
  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + dur);
}

function renderMetronome() {
  var presets = [
    {bpm:60, name:'슬로우', desc:'초보자/퍼팅'},
    {bpm:72, name:'스탠다드', desc:'일반 스윙'},
    {bpm:80, name:'퀵', desc:'빠른 템포'},
    {bpm:92, name:'투어프로', desc:'PGA 선수 기준'}
  ];

  var html = '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px">' +
    '<h2 style="margin:0"><span class="v8-icon" style="background:linear-gradient(135deg,#e65100,#ff9800)">&#127925;</span> 스윙 메트로놈</h2>' +
    '<button class="v8-close" id="v8MtClose">&times;</button></div>' +
    '<div class="metro-display">' +
    '<div class="metro-bpm" id="v8MtBpm">' + metroState.bpm + '</div>' +
    '<div class="metro-label">BPM (Beats Per Minute)</div>' +
    '<div class="metro-visual" id="v8MtVisual">&#127925;</div></div>' +
    '<input type="range" class="metro-slider" id="v8MtSlider" min="40" max="120" value="' + metroState.bpm + '">' +
    '<div class="metro-controls">' +
    '<button class="metro-ctrl-btn metro-adjust" id="v8MtMinus5">-5</button>' +
    '<button class="metro-ctrl-btn metro-adjust" id="v8MtMinus1">-1</button>' +
    '<button class="metro-ctrl-btn metro-start' + (metroState.running ? ' active' : '') + '" id="v8MtToggle">' + (metroState.running ? '&#9209; 정지' : '&#9654; 시작') + '</button>' +
    '<button class="metro-ctrl-btn metro-adjust" id="v8MtPlus1">+1</button>' +
    '<button class="metro-ctrl-btn metro-adjust" id="v8MtPlus5">+5</button></div>' +
    '<div class="metro-presets">';

  presets.forEach(function(p){
    html += '<div class="metro-preset' + (metroState.bpm === p.bpm ? ' active' : '') + '" data-mbpm="' + p.bpm + '">' + p.name + ' (' + p.bpm + ')</div>';
  });

  html += '</div>' +
    '<div class="metro-desc">&#128161; <strong>스윙 템포 가이드:</strong><br>' +
    '백스윙 3박 + 다운스윙 1박 = 3:1 리듬이 이상적<br>' +
    '72 BPM 기준: 백스윙 2.5초, 다운스윙 0.83초<br>' +
    '일정한 템포가 일관된 샷의 핵심입니다</div>';

  mtMd.innerHTML = html;
  document.getElementById('v8MtClose').addEventListener('click', function(){
    stopMetronome();
    mtOv.classList.remove('active');
  });

  document.getElementById('v8MtSlider').addEventListener('input', function(){
    metroState.bpm = parseInt(this.value);
    document.getElementById('v8MtBpm').textContent = metroState.bpm;
    if(metroState.running){ stopMetronome(); startMetronome(); }
    updatePresetHighlight();
  });

  document.getElementById('v8MtToggle').addEventListener('click', function(){
    if(metroState.running) stopMetronome();
    else startMetronome();
    this.classList.toggle('active');
    this.innerHTML = metroState.running ? '&#9209; 정지' : '&#9654; 시작';
  });

  [['v8MtMinus5',-5],['v8MtMinus1',-1],['v8MtPlus1',1],['v8MtPlus5',5]].forEach(function(p){
    document.getElementById(p[0]).addEventListener('click', function(){
      metroState.bpm = Math.max(40, Math.min(120, metroState.bpm + p[1]));
      document.getElementById('v8MtBpm').textContent = metroState.bpm;
      document.getElementById('v8MtSlider').value = metroState.bpm;
      if(metroState.running){ stopMetronome(); startMetronome(); }
      updatePresetHighlight();
    });
  });

  mtMd.querySelectorAll('.metro-preset').forEach(function(el){
    el.addEventListener('click', function(){
      metroState.bpm = parseInt(el.dataset.mbpm);
      document.getElementById('v8MtBpm').textContent = metroState.bpm;
      document.getElementById('v8MtSlider').value = metroState.bpm;
      if(metroState.running){ stopMetronome(); startMetronome(); }
      updatePresetHighlight();
    });
  });

  function updatePresetHighlight(){
    mtMd.querySelectorAll('.metro-preset').forEach(function(el){
      el.classList.toggle('active', parseInt(el.dataset.mbpm) === metroState.bpm);
    });
  }
}

function startMetronome() {
  metroState.running = true;
  metroState.beatCount = 0;
  var interval = 60000 / metroState.bpm;
  metroState.intervalId = setInterval(function(){
    metroState.beatCount++;
    var isAccent = metroState.beatCount % 4 === 1;
    playMetroBeat(isAccent ? 880 : 660, 0.08);
    var visual = document.getElementById('v8MtVisual');
    if(visual){
      visual.classList.add('beat');
      setTimeout(function(){ visual.classList.remove('beat'); }, 100);
    }
  }, interval);
}

function stopMetronome() {
  metroState.running = false;
  if(metroState.intervalId) clearInterval(metroState.intervalId);
  metroState.intervalId = null;
}

// ====================================================================
// QUICK ACTIONS BAR - v8
// ====================================================================
function injectV8QuickActions() {
  var existing = document.querySelector('.v7-quick');
  if(!existing) return;

  var v8Actions = document.createElement('div');
  v8Actions.className = 'v8-quick';
  v8Actions.innerHTML =
    '<div class="v8-quick-btn" id="v8BtnScorecard"><div class="qicon">&#9971;</div>스코어카드</div>' +
    '<div class="v8-quick-btn" id="v8BtnChecklist"><div class="qicon">&#9989;</div>체크리스트</div>' +
    '<div class="v8-quick-btn" id="v8BtnClubDist"><div class="qicon">&#127948;</div>클럽거리</div>' +
    '<div class="v8-quick-btn" id="v8BtnPartners"><div class="qicon">&#128101;</div>동반자</div>' +
    '<div class="v8-quick-btn" id="v8BtnStrategy"><div class="qicon">&#127919;</div>전략</div>' +
    '<div class="v8-quick-btn" id="v8BtnDrills"><div class="qicon">&#128170;</div>연습</div>' +
    '<div class="v8-quick-btn" id="v8BtnGoals"><div class="qicon">&#127919;</div>목표</div>' +
    '<div class="v8-quick-btn" id="v8BtnEtiquette"><div class="qicon">&#129309;</div>에티켓</div>' +
    '<div class="v8-quick-btn" id="v8BtnMetronome"><div class="qicon">&#127925;</div>메트로놈</div>';

  existing.parentNode.insertBefore(v8Actions, existing.nextSibling);

  document.getElementById('v8BtnScorecard').addEventListener('click', function(){ renderHoleScorecard(); scOv.classList.add('active'); });
  document.getElementById('v8BtnChecklist').addEventListener('click', function(){ renderChecklist(); clOv.classList.add('active'); });
  document.getElementById('v8BtnClubDist').addEventListener('click', function(){ renderClubDistance(); cdOv.classList.add('active'); });
  document.getElementById('v8BtnPartners').addEventListener('click', function(){ renderPartners(); ptOv.classList.add('active'); });
  document.getElementById('v8BtnStrategy').addEventListener('click', function(){ renderStrategy(); sgOv.classList.add('active'); });
  document.getElementById('v8BtnDrills').addEventListener('click', function(){ renderDrillPlanner(); dpOv.classList.add('active'); });
  document.getElementById('v8BtnGoals').addEventListener('click', function(){ renderGoalTracker(); gtOv.classList.add('active'); });
  document.getElementById('v8BtnEtiquette').addEventListener('click', function(){ renderEtiquette(); etOv.classList.add('active'); });
  document.getElementById('v8BtnMetronome').addEventListener('click', function(){ renderMetronome(); mtOv.classList.add('active'); });
}

// ====================================================================
// DIFFICULTY BADGE IN COURSE DETAIL MODAL
// ====================================================================
function injectDifficultyBadge() {
  var origShowDetail = window.showDetail;
  if(!origShowDetail) return;

  window.showDetail = function(course) {
    origShowDetail(course);
    setTimeout(function(){
      var modalBody = document.getElementById('modalBody');
      if(!modalBody) return;

      var diff = calcDifficulty(course);
      var dl = diffLabel(diff);

      var existing = modalBody.querySelector('.v8-difficulty-section');
      if(existing) existing.remove();

      var section = document.createElement('div');
      section.className = 'v8-difficulty-section';
      section.style.cssText = 'margin:12px 0;padding:12px;border-radius:12px;background:var(--bg)';
      section.innerHTML = '<div style="font-size:12px;font-weight:700;margin-bottom:8px;display:flex;align-items:center;gap:6px">' +
        dl.icon + ' 코스 난이도</div>' +
        '<div class="diff-meter ' + dl.cls + '">' +
        '<div class="diff-bar-bg"><div class="diff-bar-fill" style="width:' + (diff*10) + '%"></div></div>' +
        '<div class="diff-val">' + diff.toFixed(1) + '</div></div>' +
        '<div style="font-size:11px;color:var(--text-muted);margin-top:4px">' + dl.text + ' &middot; ' + dl.desc + '</div>';

      var firstRow = modalBody.querySelector('.modal-row');
      if(firstRow) modalBody.insertBefore(section, firstRow);
      else modalBody.appendChild(section);
    }, 50);
  };
}

// ====================================================================
// KEYBOARD SHORTCUTS v8
// ====================================================================
document.addEventListener('keydown', function(e){
  if(e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'SELECT') return;
  if(e.key === 'C' || e.key === 'c' && !e.ctrlKey && !e.metaKey){
    if(e.key === 'C'){
      renderChecklist(); clOv.classList.add('active'); e.preventDefault();
    }
  }
  if(e.key === 'P'){
    renderPartners(); ptOv.classList.add('active'); e.preventDefault();
  }
  if(e.key === 'T'){
    renderMetronome(); mtOv.classList.add('active'); e.preventDefault();
  }
  if(e.key === 'Escape'){
    [scOv, clOv, cdOv, ptOv, sgOv, dpOv, gtOv, etOv, mtOv].forEach(function(ov){
      ov.classList.remove('active');
    });
    stopMetronome();
  }
});

// ====================================================================
// FOOTER + VERSION UPDATE
// ====================================================================
function updateFooterVersion() {
  var footer = document.querySelector('.footer-bottom');
  if(footer) {
    footer.textContent = footer.textContent.replace(/v\d+\.\d+/, 'v8.0');
  }
  var logo = document.querySelector('.logo span[style*="font-size:10px"]');
  if(logo) logo.textContent = 'v8.0';

  var featureCol = document.querySelector('.footer-col:nth-child(3) div');
  if(featureCol){
    featureCol.innerHTML += '<br>홀별 스코어카드<br>코스 난이도 지수<br>클럽 거리 관리<br>라운딩 체크리스트<br>스윙 메트로놈';
  }

  var shortcutCol = document.querySelector('.footer-col:nth-child(4) div');
  if(shortcutCol){
    shortcutCol.innerHTML += '<br><span class="shortcut-key" style="font-size:10px;padding:1px 6px">C</span> 체크리스트 ' +
      '<span class="shortcut-key" style="font-size:10px;padding:1px 6px">P</span> 동반자<br>' +
      '<span class="shortcut-key" style="font-size:10px;padding:1px 6px">T</span> 메트로놈';
  }

  var shortcutsGrid = document.querySelector('.shortcuts-grid');
  if(shortcutsGrid){
    shortcutsGrid.innerHTML += '<span class="shortcut-key">C</span><span>라운딩 체크리스트</span>' +
      '<span class="shortcut-key">P</span><span>동반자 관리</span>' +
      '<span class="shortcut-key">T</span><span>스윙 메트로놈</span>';
  }
}

// ====================================================================
// INIT
// ====================================================================
function v8Init() {
  setTimeout(function(){
    injectV8QuickActions();
    injectDifficultyBadge();
    updateFooterVersion();
  }, 500);
}

if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', v8Init);
else v8Init();

})();
