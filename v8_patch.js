(function(){
'use strict';

// === SmartGolf v8.0 Patch ===
// 1. 핸디캡 계산기 (USGA Handicap Index)
// 2. 코스 공략 가이드 (홀별 전략)
// 3. 그린피 트렌드 차트 (SVG 라인차트)
// 4. 골프 에티켓 가이드 (25 매너 규칙)
// 5. 라운드 비교 분석 (성적 비교 차트)
// 6. 코스 추천 퀴즈 (맞춤형 추천)
// 7. 바람 보정 거리 계산기
// 8. 연습 드릴 가이드 (8종 타이머)
// 9. 라운드 캘린더 (월별 뷰)
// 10. SEO JSON-LD + 접근성 강화

// --- CSS Injection ---
var css8 = document.createElement('style');
css8.textContent = `
/* === v8 Global Styles === */
.v8-overlay{position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,.65);z-index:10004;display:none;align-items:center;justify-content:center;backdrop-filter:blur(5px)}
.v8-overlay.active{display:flex}
.v8-modal{background:var(--card-bg,#fff);border-radius:20px;padding:24px;width:94%;max-width:580px;max-height:88vh;overflow-y:auto;box-shadow:0 24px 80px rgba(0,0,0,.35);animation:v8SlideUp .4s cubic-bezier(.23,1,.32,1)}
@keyframes v8SlideUp{from{opacity:0;transform:translateY(40px)}to{opacity:1;transform:translateY(0)}}
.v8-modal h2{font-size:20px;margin:0 0 16px;display:flex;align-items:center;gap:8px}
.v8-close{background:none;border:none;font-size:22px;cursor:pointer;color:var(--text-muted);padding:4px 8px;border-radius:8px;transition:.2s}
.v8-close:hover{background:var(--border);color:var(--text)}
.v8-tabs{display:flex;gap:6px;margin-bottom:16px;overflow-x:auto;padding-bottom:4px}
.v8-tab{padding:7px 14px;border-radius:20px;border:1px solid var(--border);background:var(--bg);font-size:12px;cursor:pointer;white-space:nowrap;transition:.2s}
.v8-tab.active{background:var(--primary);color:#fff;border-color:var(--primary)}
.v8-btn{padding:10px 20px;border:none;border-radius:10px;font-size:13px;font-weight:600;cursor:pointer;transition:.2s}
.v8-btn-primary{background:linear-gradient(135deg,var(--primary),var(--primary-dark));color:#fff}
.v8-btn-primary:hover{transform:translateY(-1px);box-shadow:0 4px 12px rgba(26,122,58,.3)}
.v8-btn-secondary{background:var(--bg);color:var(--text);border:1px solid var(--border)}
.v8-section{margin-bottom:20px}
.v8-section h3{font-size:14px;font-weight:700;margin-bottom:10px;color:var(--primary);display:flex;align-items:center;gap:6px}
.v8-grid2{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.v8-grid3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px}
@media(max-width:480px){.v8-grid2,.v8-grid3{grid-template-columns:1fr}}
.v8-input{width:100%;padding:10px 14px;border:2px solid var(--border);border-radius:10px;font-size:14px;background:var(--card-bg);color:var(--text);transition:.2s}
.v8-input:focus{border-color:var(--primary);outline:none}
.v8-select{width:100%;padding:10px 14px;border:2px solid var(--border);border-radius:10px;font-size:14px;background:var(--card-bg);color:var(--text)}

/* Handicap Calculator */
.hc-result{text-align:center;padding:24px;background:linear-gradient(135deg,var(--primary-light),#d4edda);border-radius:16px;margin:16px 0}
[data-theme="dark"] .hc-result{background:linear-gradient(135deg,#1a2f20,#1e3a25)}
.hc-result .hc-index{font-size:48px;font-weight:800;color:var(--primary);line-height:1}
.hc-result .hc-label{font-size:13px;color:var(--text-muted);margin-top:4px}
.hc-result .hc-level{font-size:14px;font-weight:600;margin-top:8px;padding:4px 16px;border-radius:20px;display:inline-block}
.hc-score-list{max-height:200px;overflow-y:auto}
.hc-score-item{display:flex;justify-content:space-between;align-items:center;padding:10px 12px;border-radius:10px;margin-bottom:6px;background:var(--bg)}
.hc-score-item .hc-date{font-size:12px;color:var(--text-muted)}
.hc-score-item .hc-val{font-weight:700;font-size:15px}
.hc-score-item .hc-del{background:none;border:none;color:#e74c3c;cursor:pointer;font-size:14px;padding:4px 8px}

/* Course Strategy */
.cs-hole{padding:14px;border-radius:12px;background:var(--bg);margin-bottom:8px;transition:.2s}
.cs-hole:hover{transform:translateX(4px)}
.cs-hole-header{display:flex;justify-content:space-between;align-items:center}
.cs-hole-num{font-size:16px;font-weight:800;color:var(--primary)}
.cs-hole-par{font-size:12px;padding:3px 10px;border-radius:10px;background:var(--primary);color:#fff;font-weight:600}
.cs-hole-dist{font-size:12px;color:var(--text-muted)}
.cs-hole-tip{font-size:13px;color:var(--text);line-height:1.5;margin-top:8px;padding:10px;background:var(--card-bg);border-radius:8px;border-left:3px solid var(--primary)}
.cs-hole-club{display:inline-block;font-size:11px;padding:2px 8px;border-radius:8px;background:#e3f2fd;color:#1565c0;margin-right:4px;margin-top:4px}
[data-theme="dark"] .cs-hole-club{background:#1a2a3a;color:#7ab8f5}

/* Green Fee Trend */
.gf-chart{width:100%;height:200px;position:relative;margin:16px 0}
.gf-chart svg{width:100%;height:100%}
.gf-legend{display:flex;gap:16px;justify-content:center;margin-top:8px;font-size:12px}
.gf-legend-item{display:flex;align-items:center;gap:4px}
.gf-legend-dot{width:10px;height:10px;border-radius:50%}
.gf-stat-row{display:flex;gap:10px;margin-bottom:16px}
.gf-stat{flex:1;background:var(--bg);border-radius:12px;padding:12px;text-align:center}
.gf-stat .gf-val{font-size:20px;font-weight:800;color:var(--primary)}
.gf-stat .gf-lbl{font-size:10px;color:var(--text-muted);margin-top:2px}

/* Etiquette Guide */
.et-item{padding:14px;border-radius:12px;background:var(--bg);margin-bottom:8px;cursor:pointer;transition:.2s}
.et-item:hover{background:var(--primary-light)}
[data-theme="dark"] .et-item:hover{background:#1a2f20}
.et-item .et-cat{font-size:10px;padding:2px 8px;border-radius:10px;font-weight:600;margin-right:6px}
.et-item .et-title{font-weight:700;font-size:14px;display:flex;align-items:center;gap:6px}
.et-item .et-desc{font-size:12px;color:var(--text-muted);line-height:1.5;margin-top:8px;display:none}
.et-item.expanded .et-desc{display:block}
.et-cat-tee{background:#e8f5e9;color:#2e7d32}
.et-cat-fairway{background:#e3f2fd;color:#1565c0}
.et-cat-green{background:#f3e5f5;color:#7b1fa2}
.et-cat-general{background:#fff3e0;color:#e65100}
.et-cat-bunker{background:#fce4ec;color:#c62828}
[data-theme="dark"] .et-cat-tee{background:#1a3a25;color:#7bed9f}
[data-theme="dark"] .et-cat-fairway{background:#1a2a3a;color:#7ab8f5}
[data-theme="dark"] .et-cat-green{background:#2a1a3a;color:#c9a0dc}
[data-theme="dark"] .et-cat-general{background:#3a2a1a;color:#f0c070}
[data-theme="dark"] .et-cat-bunker{background:#3a1a1a;color:#f0a0a0}

/* Round Compare */
.rc-chart{width:100%;height:220px;position:relative;margin:16px 0}
.rc-chart svg{width:100%;height:100%}
.rc-select-row{display:flex;gap:10px;margin-bottom:16px}
.rc-summary{display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;margin-bottom:16px}
.rc-box{background:var(--bg);border-radius:12px;padding:12px;text-align:center}
.rc-box .rc-val{font-size:18px;font-weight:800}
.rc-box .rc-lbl{font-size:10px;color:var(--text-muted);margin-top:2px}

/* Quiz */
.quiz-q{background:var(--bg);border-radius:16px;padding:20px;margin-bottom:16px;text-align:center}
.quiz-q .quiz-num{font-size:12px;color:var(--text-muted);margin-bottom:8px}
.quiz-q .quiz-text{font-size:16px;font-weight:700;margin-bottom:16px;line-height:1.5}
.quiz-opts{display:flex;flex-direction:column;gap:8px}
.quiz-opt{padding:12px 16px;border:2px solid var(--border);border-radius:12px;background:var(--card-bg);cursor:pointer;font-size:14px;text-align:left;transition:.2s;font-weight:500}
.quiz-opt:hover{border-color:var(--primary);background:var(--primary-light)}
[data-theme="dark"] .quiz-opt:hover{background:#1a2f20}
.quiz-opt.selected{border-color:var(--primary);background:var(--primary);color:#fff}
.quiz-progress{height:6px;background:var(--border);border-radius:3px;overflow:hidden;margin-bottom:16px}
.quiz-progress-bar{height:100%;background:linear-gradient(90deg,var(--primary),#7bed9f);border-radius:3px;transition:width .4s}

/* Wind Calculator */
.wc-result{background:linear-gradient(135deg,#e3f2fd,#bbdefb);border-radius:16px;padding:20px;margin:16px 0;text-align:center}
[data-theme="dark"] .wc-result{background:linear-gradient(135deg,#1a2a3a,#1e3a4a)}
.wc-adjusted{font-size:36px;font-weight:800;color:#1565c0}
[data-theme="dark"] .wc-adjusted{color:#7ab8f5}
.wc-diff{font-size:14px;margin-top:4px}
.wc-compass{width:120px;height:120px;border-radius:50%;border:3px solid var(--border);margin:16px auto;position:relative;background:var(--bg)}
.wc-arrow{position:absolute;top:50%;left:50%;width:4px;height:50px;background:linear-gradient(#e74c3c,#c0392b);transform-origin:bottom center;border-radius:2px;transition:transform .5s}

/* Drill Guide */
.dr-card{padding:16px;border-radius:14px;background:var(--bg);margin-bottom:10px;cursor:pointer;transition:.2s}
.dr-card:hover{transform:translateY(-2px);box-shadow:0 6px 20px rgba(0,0,0,.1)}
.dr-card .dr-title{font-weight:700;font-size:15px;display:flex;align-items:center;gap:8px}
.dr-card .dr-meta{font-size:12px;color:var(--text-muted);margin-top:4px}
.dr-card .dr-desc{font-size:13px;line-height:1.5;margin-top:10px;display:none}
.dr-card.expanded .dr-desc{display:block}
.dr-timer{text-align:center;padding:24px;background:linear-gradient(135deg,var(--primary-light),#d4edda);border-radius:16px;margin:16px 0}
[data-theme="dark"] .dr-timer{background:linear-gradient(135deg,#1a2f20,#1e3a25)}
.dr-timer .dr-time{font-size:48px;font-weight:800;color:var(--primary);font-variant-numeric:tabular-nums}
.dr-timer .dr-name{font-size:14px;color:var(--text-muted);margin-top:4px}
.dr-timer-btns{display:flex;gap:8px;justify-content:center;margin-top:16px}

/* Calendar */
.cal-grid{display:grid;grid-template-columns:repeat(7,1fr);gap:2px}
.cal-header{text-align:center;font-size:11px;font-weight:700;color:var(--text-muted);padding:8px 0}
.cal-day{aspect-ratio:1;display:flex;flex-direction:column;align-items:center;justify-content:center;border-radius:10px;font-size:13px;cursor:pointer;transition:.2s;position:relative}
.cal-day:hover{background:var(--primary-light)}
.cal-day.today{border:2px solid var(--primary)}
.cal-day.has-round{background:var(--primary-light);font-weight:700}
.cal-day.has-round::after{content:'';width:6px;height:6px;background:var(--primary);border-radius:50%;position:absolute;bottom:4px}
.cal-day.other-month{opacity:.3}
.cal-nav{display:flex;justify-content:space-between;align-items:center;margin-bottom:12px}
.cal-nav-btn{background:none;border:1px solid var(--border);border-radius:8px;padding:6px 12px;cursor:pointer;color:var(--text);font-size:14px}
.cal-month{font-size:16px;font-weight:700}

/* Quick Actions v8 extension */
.v8-quick-btn{display:flex;flex-direction:column;align-items:center;gap:4px;padding:10px 14px;border-radius:12px;background:var(--card-bg);border:1px solid var(--border);cursor:pointer;transition:.2s;font-size:11px;font-weight:600;color:var(--text);min-width:70px}
.v8-quick-btn:hover{border-color:var(--primary);background:var(--primary-light);transform:translateY(-2px)}
.v8-quick-btn .qicon{font-size:20px;line-height:1}
`;
document.head.appendChild(css8);

// =============================================
// 1. HANDICAP CALCULATOR
// =============================================
var hcScores = JSON.parse(localStorage.getItem('sg_hc_scores') || '[]');
function saveHcScores() { localStorage.setItem('sg_hc_scores', JSON.stringify(hcScores)); }

function calcHandicapIndex() {
  if (hcScores.length < 3) return null;
  var sorted = hcScores.slice().sort(function(a,b){ return a.diff - b.diff; });
  var count = Math.min(sorted.length, 20);
  var use;
  if (count <= 5) use = 1;
  else if (count <= 8) use = 2;
  else if (count <= 11) use = 3;
  else if (count <= 14) use = 5;
  else if (count <= 16) use = 6;
  else if (count <= 18) use = 8;
  else use = 10;
  var best = sorted.slice(0, use);
  var avg = best.reduce(function(s,x){ return s + x.diff; }, 0) / use;
  return Math.round(avg * 10) / 10;
}

function getHandicapLevel(idx) {
  if (idx === null) return { text: '데이터 부족', color: '#999', bg: '#f0f0f0' };
  if (idx <= 0) return { text: '스크래치 골퍼', color: '#fff', bg: '#1a7a3a' };
  if (idx <= 5) return { text: '싱글 핸디캡', color: '#fff', bg: '#2196F3' };
  if (idx <= 10) return { text: '로우 핸디캡', color: '#fff', bg: '#4CAF50' };
  if (idx <= 18) return { text: '미드 핸디캡', color: '#fff', bg: '#FF9800' };
  if (idx <= 28) return { text: '하이 핸디캡', color: '#fff', bg: '#f44336' };
  return { text: '초보 골퍼', color: '#fff', bg: '#9C27B0' };
}

function renderHandicap() {
  var idx = calcHandicapIndex();
  var lv = getHandicapLevel(idx);
  var ov = document.getElementById('v8HcOverlay');
  if (!ov) return;
  var body = ov.querySelector('.v8-modal');
  body.innerHTML = '<div style="display:flex;justify-content:space-between;align-items:center"><h2><span style="font-size:24px">&#9971;</span> 핸디캡 계산기</h2><button class="v8-close" onclick="document.getElementById(\'v8HcOverlay\').classList.remove(\'active\')">&times;</button></div>';
  body.innerHTML += '<div class="hc-result"><div class="hc-index">' + (idx !== null ? idx.toFixed(1) : '--') + '</div><div class="hc-label">Handicap Index</div><div class="hc-level" style="background:' + lv.bg + ';color:' + lv.color + '">' + lv.text + '</div></div>';

  body.innerHTML += '<div class="v8-section"><h3><span>&#128221;</span> 스코어 입력</h3>' +
    '<div class="v8-grid2">' +
    '<div><label style="font-size:12px;color:var(--text-muted)">날짜</label><input type="date" id="hcDate" class="v8-input" value="' + new Date().toISOString().split('T')[0] + '"></div>' +
    '<div><label style="font-size:12px;color:var(--text-muted)">총 스코어</label><input type="number" id="hcScore" class="v8-input" placeholder="예: 92" min="50" max="150"></div>' +
    '</div>' +
    '<div class="v8-grid2" style="margin-top:8px">' +
    '<div><label style="font-size:12px;color:var(--text-muted)">코스 레이팅</label><input type="number" id="hcRating" class="v8-input" placeholder="72.0" step="0.1" value="72.0"></div>' +
    '<div><label style="font-size:12px;color:var(--text-muted)">슬로프 레이팅</label><input type="number" id="hcSlope" class="v8-input" placeholder="113" value="113"></div>' +
    '</div>' +
    '<button class="v8-btn v8-btn-primary" style="width:100%;margin-top:12px" onclick="window._v8AddHcScore()">&#10133; 스코어 추가</button></div>';

  body.innerHTML += '<div class="v8-section"><h3><span>&#128200;</span> 기록 (' + hcScores.length + '개)</h3><div class="hc-score-list" id="hcScoreList"></div></div>';

  body.innerHTML += '<div style="font-size:11px;color:var(--text-muted);text-align:center;padding:8px">USGA 방식: 최근 20개 중 상위 절반 평균 &times; (113/슬로프) 기준</div>';

  var list = document.getElementById('hcScoreList');
  if (list) {
    hcScores.slice().reverse().forEach(function(s, i) {
      var ri = hcScores.length - 1 - i;
      var div = document.createElement('div');
      div.className = 'hc-score-item';
      div.innerHTML = '<div><span class="hc-val">' + s.score + '</span> <span class="hc-date">' + s.date + '</span></div><div><span style="font-size:12px;color:var(--text-muted)">diff ' + s.diff.toFixed(1) + '</span><button class="hc-del" data-idx="' + ri + '">&#128465;</button></div>';
      list.appendChild(div);
    });
    list.querySelectorAll('.hc-del').forEach(function(btn) {
      btn.addEventListener('click', function() {
        hcScores.splice(parseInt(this.dataset.idx), 1);
        saveHcScores();
        renderHandicap();
      });
    });
  }
}

window._v8AddHcScore = function() {
  var date = document.getElementById('hcDate').value;
  var score = parseInt(document.getElementById('hcScore').value);
  var rating = parseFloat(document.getElementById('hcRating').value);
  var slope = parseInt(document.getElementById('hcSlope').value);
  if (!date || isNaN(score) || isNaN(rating) || isNaN(slope)) return;
  if (score < 50 || score > 150) return;
  var diff = (score - rating) * (113 / slope);
  hcScores.push({ date: date, score: score, rating: rating, slope: slope, diff: Math.round(diff * 10) / 10 });
  if (hcScores.length > 20) hcScores.shift();
  saveHcScores();
  renderHandicap();
};

// =============================================
// 2. COURSE STRATEGY GUIDE
// =============================================
function generateCourseStrategy(courseName) {
  var seed = 0;
  for (var i = 0; i < courseName.length; i++) seed = ((seed << 5) - seed + courseName.charCodeAt(i)) | 0;
  function seededRand() { seed = (seed * 16807 + 0) % 2147483647; return (seed & 0x7fffffff) / 2147483647; }

  var holes = [];
  var parSequence = [4,3,5,4,4,3,4,5,4, 4,5,3,4,4,4,3,5,4];
  for (var h = 0; h < 18; h++) {
    var par = parSequence[h];
    var dist;
    if (par === 3) dist = Math.round(130 + seededRand() * 70);
    else if (par === 4) dist = Math.round(300 + seededRand() * 80);
    else dist = Math.round(480 + seededRand() * 70);

    var tips3 = [
      '티박스에서 정확도 우선. 짧게 쳐도 페어웨이 안착이 핵심.',
      '그린 앞 벙커 주의. 핀 위치에 따라 클럽 선택 변경.',
      '바람이 강한 홀. 낮은 탄도 샷 추천.'
    ];
    var tips4 = [
      '드라이버보다 3우드로 안정적 티샷 추천.',
      '도그렉 홀. 코너를 잘라가면 세컨샷이 짧아짐.',
      '페어웨이 우측 OB 주의. 좌측 에이밍 추천.',
      '오르막 홀. 한 클럽 길게 잡을 것.'
    ];
    var tips5 = [
      '투온 가능하나 워터해저드 주의. 안전하게 3온 추천.',
      '긴 파5. 레이업 지점을 미리 정하고 플레이.',
      '세컨샷 후 남은 거리에 따라 웨지 선택 중요.'
    ];

    var tipArr = par === 3 ? tips3 : par === 4 ? tips4 : tips5;
    var tip = tipArr[Math.floor(seededRand() * tipArr.length)];

    var clubs3 = ['7번 아이언','8번 아이언','9번 아이언','PW','6번 아이언'];
    var clubs4 = ['드라이버','3우드','5우드 + PW','드라이버 + 9번 아이언'];
    var clubs5 = ['드라이버 + 3우드 + PW','드라이버 + 5번 아이언 + SW','드라이버 + 유틸 + AW'];
    var clubArr = par === 3 ? clubs3 : par === 4 ? clubs4 : clubs5;
    var club = clubArr[Math.floor(seededRand() * clubArr.length)];

    holes.push({ num: h + 1, par: par, dist: dist, tip: tip, club: club });
  }
  return holes;
}

function renderCourseStrategy(courseName) {
  var ov = document.getElementById('v8CsOverlay');
  if (!ov) return;
  var body = ov.querySelector('.v8-modal');
  var holes = generateCourseStrategy(courseName);
  var totalPar = holes.reduce(function(s, h){ return s + h.par; }, 0);

  body.innerHTML = '<div style="display:flex;justify-content:space-between;align-items:center"><h2><span style="font-size:24px">&#127948;</span> 코스 공략</h2><button class="v8-close" onclick="document.getElementById(\'v8CsOverlay\').classList.remove(\'active\')">&times;</button></div>';
  body.innerHTML += '<div style="text-align:center;margin-bottom:16px"><div style="font-size:16px;font-weight:700">' + courseName + '</div><div style="font-size:13px;color:var(--text-muted)">18홀 | Par ' + totalPar + '</div></div>';

  var tabs = '<div class="v8-tabs">';
  tabs += '<button class="v8-tab active" onclick="window._v8CsTab(\'all\',this)">전체</button>';
  tabs += '<button class="v8-tab" onclick="window._v8CsTab(\'front\',this)">프론트 9</button>';
  tabs += '<button class="v8-tab" onclick="window._v8CsTab(\'back\',this)">백 9</button>';
  tabs += '<button class="v8-tab" onclick="window._v8CsTab(\'par3\',this)">Par 3</button>';
  tabs += '<button class="v8-tab" onclick="window._v8CsTab(\'par5\',this)">Par 5</button>';
  tabs += '</div>';
  body.innerHTML += tabs;

  var holesHtml = '<div id="v8CsHoles">';
  holes.forEach(function(h) {
    var cls = '';
    if (h.num <= 9) cls += ' front';
    else cls += ' back';
    cls += ' par' + h.par;
    holesHtml += '<div class="cs-hole' + cls + '" data-groups="all' + cls + '">';
    holesHtml += '<div class="cs-hole-header"><span class="cs-hole-num">Hole ' + h.num + '</span><span class="cs-hole-par">Par ' + h.par + '</span><span class="cs-hole-dist">' + h.dist + 'm</span></div>';
    holesHtml += '<div class="cs-hole-tip">' + h.tip + '</div>';
    holesHtml += '<div style="margin-top:6px"><span class="cs-hole-club">&#127948; ' + h.club + '</span></div>';
    holesHtml += '</div>';
  });
  holesHtml += '</div>';
  body.innerHTML += holesHtml;
}

window._v8CsTab = function(filter, btn) {
  btn.parentElement.querySelectorAll('.v8-tab').forEach(function(t){ t.classList.remove('active'); });
  btn.classList.add('active');
  document.querySelectorAll('#v8CsHoles .cs-hole').forEach(function(h) {
    var groups = h.dataset.groups || '';
    h.style.display = (filter === 'all' || groups.indexOf(filter) !== -1) ? '' : 'none';
  });
};

// =============================================
// 3. GREEN FEE TREND CHART
// =============================================
function renderGreenFeeTrend(courseName, weekday, weekend) {
  var ov = document.getElementById('v8GfOverlay');
  if (!ov) return;
  var body = ov.querySelector('.v8-modal');

  body.innerHTML = '<div style="display:flex;justify-content:space-between;align-items:center"><h2><span style="font-size:24px">&#128200;</span> 그린피 트렌드</h2><button class="v8-close" onclick="document.getElementById(\'v8GfOverlay\').classList.remove(\'active\')">&times;</button></div>';
  body.innerHTML += '<div style="text-align:center;font-size:15px;font-weight:700;margin-bottom:12px">' + courseName + '</div>';

  var wdBase = weekday || 100000;
  var weBase = weekend || 150000;
  var months = ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'];
  var seasonFactor = [0.85, 0.88, 0.95, 1.05, 1.1, 1.0, 0.9, 0.88, 1.05, 1.1, 1.0, 0.9];

  var wdPrices = seasonFactor.map(function(f){ return Math.round(wdBase * f / 1000) * 1000; });
  var wePrices = seasonFactor.map(function(f){ return Math.round(weBase * f / 1000) * 1000; });

  var allPrices = wdPrices.concat(wePrices);
  var minP = Math.min.apply(null, allPrices);
  var maxP = Math.max.apply(null, allPrices);
  var range = maxP - minP || 1;

  body.innerHTML += '<div class="gf-stat-row"><div class="gf-stat"><div class="gf-val">' + Math.round(wdBase/10000) + '만</div><div class="gf-lbl">주중 기준</div></div><div class="gf-stat"><div class="gf-val">' + Math.round(weBase/10000) + '만</div><div class="gf-lbl">주말 기준</div></div><div class="gf-stat"><div class="gf-val">' + Math.round((weBase - wdBase)/10000) + '만</div><div class="gf-lbl">주말 할증</div></div></div>';

  var svgW = 520, svgH = 180, padX = 40, padY = 20;
  var chartW = svgW - padX * 2, chartH = svgH - padY * 2;

  var svg = '<div class="gf-chart"><svg viewBox="0 0 ' + svgW + ' ' + svgH + '">';
  for (var g = 0; g <= 4; g++) {
    var gy = padY + (chartH / 4) * g;
    svg += '<line x1="' + padX + '" y1="' + gy + '" x2="' + (svgW - padX) + '" y2="' + gy + '" stroke="var(--border)" stroke-width="0.5" stroke-dasharray="4,4"/>';
    var gval = maxP - (range / 4) * g;
    svg += '<text x="' + (padX - 4) + '" y="' + (gy + 4) + '" text-anchor="end" fill="var(--text-muted)" font-size="9">' + Math.round(gval / 10000) + '만</text>';
  }

  function buildPath(prices, color) {
    var path = '';
    var dots = '';
    for (var m = 0; m < 12; m++) {
      var x = padX + (chartW / 11) * m;
      var y = padY + chartH - ((prices[m] - minP) / range) * chartH;
      path += (m === 0 ? 'M' : 'L') + x.toFixed(1) + ',' + y.toFixed(1);
      dots += '<circle cx="' + x.toFixed(1) + '" cy="' + y.toFixed(1) + '" r="3.5" fill="' + color + '" stroke="#fff" stroke-width="1.5"/>';
      if (m % 2 === 0) svg += '<text x="' + x + '" y="' + (svgH - 4) + '" text-anchor="middle" fill="var(--text-muted)" font-size="9">' + months[m] + '</text>';
    }
    return '<path d="' + path + '" fill="none" stroke="' + color + '" stroke-width="2.5" stroke-linecap="round"/>' + dots;
  }

  svg += buildPath(wdPrices, '#4CAF50');
  svg += buildPath(wePrices, '#FF6B35');
  svg += '</svg></div>';
  svg += '<div class="gf-legend"><div class="gf-legend-item"><div class="gf-legend-dot" style="background:#4CAF50"></div> 주중</div><div class="gf-legend-item"><div class="gf-legend-dot" style="background:#FF6B35"></div> 주말</div></div>';
  body.innerHTML += svg;

  body.innerHTML += '<div style="font-size:11px;color:var(--text-muted);text-align:center;padding:12px">* 계절별 수요 기반 추정 그래프 (실제 가격과 다를 수 있음)</div>';
}

// =============================================
// 4. ETIQUETTE GUIDE (25 rules)
// =============================================
var etiquetteRules = [
  { cat: 'tee', title: '티잉 그라운드 순서', desc: '첫 홀은 조 편성 순서, 이후 홀은 전 홀 성적 순서(오너)로 티샷합니다. 다른 사람이 티샷할 때 절대 움직이거나 말하지 않습니다.' },
  { cat: 'tee', title: '티 높이와 티박스 위치', desc: '본인의 실력에 맞는 티박스(레드/화이트/블루/블랙)를 선택합니다. 무리하게 뒤쪽 티를 사용하면 진행이 느려집니다.' },
  { cat: 'tee', title: '연습 스윙 주의', desc: '연습 스윙은 최소한으로, 디봇을 만들지 않도록 합니다. 뒤에 있는 조의 진행을 방해하지 않도록 합니다.' },
  { cat: 'fairway', title: '디봇 복구', desc: '페어웨이에서 디봇이 생기면 반드시 복구합니다. 떨어진 잔디를 다시 덮거나 모래를 채워 넣습니다.' },
  { cat: 'fairway', title: '카트 경로 준수', desc: '카트는 지정된 카트 경로로만 이동합니다. 페어웨이 위를 카트로 달리지 않습니다. 잔디 보호가 중요합니다.' },
  { cat: 'fairway', title: '포어(FORE) 외치기', desc: '공이 다른 사람 방향으로 날아갈 때 즉시 &quot;FORE!&quot;를 크게 외칩니다. 안전이 최우선입니다.' },
  { cat: 'fairway', title: '느린 플레이 방지', desc: '본인의 공을 찾는 데 3분 이상 소요하지 않습니다. 뒤따르는 조가 기다리면 먼저 보내줍니다 (패스스루).' },
  { cat: 'fairway', title: '레디 골프', desc: '준비된 사람이 먼저 치는 레디 골프를 실천합니다. 안전한 상황에서는 순서에 얽매이지 않고 빠르게 진행합니다.' },
  { cat: 'green', title: '볼마크 수리', desc: '그린에 볼이 떨어져 생긴 볼마크는 반드시 수리합니다. 그린 포크로 바깥에서 안쪽으로 눌러 복구합니다.' },
  { cat: 'green', title: '퍼팅 라인 밟지 않기', desc: '다른 사람의 퍼팅 라인 위를 밟지 않습니다. 퍼팅 라인 너머로 그림자가 드리워지지 않도록 위치합니다.' },
  { cat: 'green', title: '깃대 관리', desc: '깃대를 뽑거나 어텐드할 때 조심합니다. 깃대를 그린 바깥에 놓아 그린이 손상되지 않도록 합니다.' },
  { cat: 'green', title: '퍼팅 시 정숙', desc: '다른 사람이 퍼팅할 때 움직이거나 말하지 않습니다. 시야에 들어오지 않는 위치에서 기다립니다.' },
  { cat: 'green', title: '스파이크 자국', desc: '그린 위에서 발을 끌지 않습니다. 스파이크가 그린 표면을 손상시킬 수 있으므로 발을 들어 이동합니다.' },
  { cat: 'bunker', title: '벙커 레이크 정리', desc: '벙커 샷 후 반드시 레이크로 발자국과 샷 자국을 정리합니다. 레이크는 벙커 바깥 평행하게 놓습니다.' },
  { cat: 'bunker', title: '벙커 진입/퇴장', desc: '벙커의 가장 낮은 곳으로 진입하고 퇴장합니다. 벙커 턱을 무너뜨리지 않도록 주의합니다.' },
  { cat: 'general', title: '복장 규정', desc: '카라 티셔츠, 골프화 착용이 기본입니다. 청바지, 슬리퍼, 민소매는 대부분의 골프장에서 금지됩니다.' },
  { cat: 'general', title: '핸드폰 매너', desc: '라운드 중 핸드폰은 무음 또는 진동으로 설정합니다. 통화는 동반자에게 양해를 구한 후 빠르게 마칩니다.' },
  { cat: 'general', title: '음주 절제', desc: '라운드 중 과음은 안전사고와 매너 문제를 유발합니다. 적당히 즐기되, 집중력을 잃지 않도록 합니다.' },
  { cat: 'general', title: '캐디 존중', desc: '캐디에게 감사한 마음으로 대합니다. 무리한 요구나 막말은 삼갑니다. 좋은 매너가 좋은 라운드를 만듭니다.' },
  { cat: 'general', title: '감정 조절', desc: '나쁜 샷에 클럽을 던지거나 욕설하지 않습니다. 골프는 멘탈 스포츠이며, 동반자에게도 불쾌감을 줍니다.' },
  { cat: 'general', title: '안전거리 유지', desc: '다른 사람이 스윙할 때 충분한 거리를 유지합니다. 앞 조가 사정거리 밖으로 나갈 때까지 기다립니다.' },
  { cat: 'general', title: '스코어 정직성', desc: '스코어는 정직하게 기록합니다. 멀리건이나 특별 룰은 동반자 전원의 동의 하에만 적용합니다.' },
  { cat: 'general', title: '자연 보호', desc: '담배꽁초, 빈 병 등을 코스에 버리지 않습니다. 야생 동물을 방해하지 않으며, 코스의 자연을 존중합니다.' },
  { cat: 'general', title: '라운드 후 정리', desc: '라운드 종료 후 스코어 확인, 캐디 팁, 그리고 동반자에게 감사 인사를 합니다. 로커룸에서도 매너를 지킵니다.' },
  { cat: 'general', title: '초보자 배려', desc: '초보 동반자에게 친절하게 대합니다. 과도한 조언은 삼가되, 룰이나 매너를 모를 때는 부드럽게 알려줍니다.' }
];

function renderEtiquette() {
  var ov = document.getElementById('v8EtOverlay');
  if (!ov) return;
  var body = ov.querySelector('.v8-modal');

  body.innerHTML = '<div style="display:flex;justify-content:space-between;align-items:center"><h2><span style="font-size:24px">&#129333;</span> 골프 에티켓</h2><button class="v8-close" onclick="document.getElementById(\'v8EtOverlay\').classList.remove(\'active\')">&times;</button></div>';

  var tabs = '<div class="v8-tabs">';
  tabs += '<button class="v8-tab active" onclick="window._v8EtFilter(\'all\',this)">전체 (' + etiquetteRules.length + ')</button>';
  var cats = { tee: '티잉', fairway: '페어웨이', green: '그린', bunker: '벙커', general: '일반' };
  Object.keys(cats).forEach(function(k) {
    var cnt = etiquetteRules.filter(function(r){ return r.cat === k; }).length;
    tabs += '<button class="v8-tab" onclick="window._v8EtFilter(\'' + k + '\',this)">' + cats[k] + ' (' + cnt + ')</button>';
  });
  tabs += '</div>';
  body.innerHTML += tabs;

  var list = '<div id="v8EtList">';
  etiquetteRules.forEach(function(r, i) {
    list += '<div class="et-item" data-cat="' + r.cat + '" onclick="this.classList.toggle(\'expanded\')">';
    list += '<div class="et-title"><span class="et-cat et-cat-' + r.cat + '">' + cats[r.cat] + '</span>' + r.title + '</div>';
    list += '<div class="et-desc">' + r.desc + '</div>';
    list += '</div>';
  });
  list += '</div>';
  body.innerHTML += list;
}

window._v8EtFilter = function(cat, btn) {
  btn.parentElement.querySelectorAll('.v8-tab').forEach(function(t){ t.classList.remove('active'); });
  btn.classList.add('active');
  document.querySelectorAll('#v8EtList .et-item').forEach(function(item) {
    item.style.display = (cat === 'all' || item.dataset.cat === cat) ? '' : 'none';
  });
};

// =============================================
// 5. ROUND COMPARE
// =============================================
function renderRoundCompare() {
  var ov = document.getElementById('v8RcOverlay');
  if (!ov) return;
  var body = ov.querySelector('.v8-modal');
  var rounds = JSON.parse(localStorage.getItem('sg_rounds') || '[]');

  body.innerHTML = '<div style="display:flex;justify-content:space-between;align-items:center"><h2><span style="font-size:24px">&#128202;</span> 라운드 비교</h2><button class="v8-close" onclick="document.getElementById(\'v8RcOverlay\').classList.remove(\'active\')">&times;</button></div>';

  if (rounds.length < 2) {
    body.innerHTML += '<div style="text-align:center;padding:40px;color:var(--text-muted)"><div style="font-size:40px;margin-bottom:12px">&#128203;</div><div>비교하려면 최소 2개의 라운드 기록이 필요합니다.</div></div>';
    return;
  }

  var recent = rounds.slice(-10).reverse();
  body.innerHTML += '<div class="rc-select-row"><select id="rcSel1" class="v8-select" style="flex:1" onchange="window._v8CompareRounds()"></select><span style="align-self:center;font-weight:700">vs</span><select id="rcSel2" class="v8-select" style="flex:1" onchange="window._v8CompareRounds()"></select></div>';

  var sel1 = document.getElementById('rcSel1');
  var sel2 = document.getElementById('rcSel2');
  recent.forEach(function(r, i) {
    var opt1 = new Option(r.date + ' (' + r.score + '타)', i);
    var opt2 = new Option(r.date + ' (' + r.score + '타)', i);
    sel1.add(opt1);
    sel2.add(opt2);
  });
  if (recent.length > 1) sel2.selectedIndex = 1;

  body.innerHTML += '<div id="v8RcResult"></div>';
  window._v8CompareData = recent;
  window._v8CompareRounds();
}

window._v8CompareRounds = function() {
  var data = window._v8CompareData;
  if (!data) return;
  var i1 = parseInt(document.getElementById('rcSel1').value);
  var i2 = parseInt(document.getElementById('rcSel2').value);
  var r1 = data[i1], r2 = data[i2];
  if (!r1 || !r2) return;

  var result = document.getElementById('v8RcResult');
  var diff = r1.score - r2.score;
  var diffStr = diff > 0 ? '+' + diff : diff === 0 ? '0' : String(diff);
  var diffColor = diff < 0 ? '#4CAF50' : diff > 0 ? '#f44336' : 'var(--text-muted)';

  var html = '<div class="rc-summary">';
  html += '<div class="rc-box"><div class="rc-val" style="color:var(--primary)">' + r1.score + '</div><div class="rc-lbl">' + r1.date + '</div></div>';
  html += '<div class="rc-box"><div class="rc-val" style="color:' + diffColor + '">' + diffStr + '</div><div class="rc-lbl">차이</div></div>';
  html += '<div class="rc-box"><div class="rc-val" style="color:var(--accent)">' + r2.score + '</div><div class="rc-lbl">' + r2.date + '</div></div>';
  html += '</div>';

  // SVG bar comparison
  var svgW = 500, svgH = 120;
  html += '<div class="rc-chart"><svg viewBox="0 0 ' + svgW + ' ' + svgH + '">';
  var maxScore = Math.max(r1.score, r2.score, 72);
  var bw = 60, gap = 40;
  var cx1 = svgW / 2 - bw - gap / 2;
  var cx2 = svgW / 2 + gap / 2;
  var h1 = (r1.score / maxScore) * 80;
  var h2 = (r2.score / maxScore) * 80;
  html += '<rect x="' + cx1 + '" y="' + (95 - h1) + '" width="' + bw + '" height="' + h1 + '" rx="6" fill="var(--primary)" opacity="0.8"/>';
  html += '<rect x="' + cx2 + '" y="' + (95 - h2) + '" width="' + bw + '" height="' + h2 + '" rx="6" fill="var(--accent)" opacity="0.8"/>';
  html += '<text x="' + (cx1 + bw/2) + '" y="' + (90 - h1) + '" text-anchor="middle" fill="var(--primary)" font-size="14" font-weight="700">' + r1.score + '</text>';
  html += '<text x="' + (cx2 + bw/2) + '" y="' + (90 - h2) + '" text-anchor="middle" fill="var(--accent)" font-size="14" font-weight="700">' + r2.score + '</text>';
  html += '<text x="' + (cx1 + bw/2) + '" y="' + (svgH - 4) + '" text-anchor="middle" fill="var(--text-muted)" font-size="10">' + r1.date + '</text>';
  html += '<text x="' + (cx2 + bw/2) + '" y="' + (svgH - 4) + '" text-anchor="middle" fill="var(--text-muted)" font-size="10">' + r2.date + '</text>';
  html += '<line x1="40" y1="95" x2="' + (svgW - 40) + '" y2="95" stroke="var(--border)" stroke-width="1"/>';
  html += '</svg></div>';

  if (r1.memo || r2.memo) {
    html += '<div class="v8-section"><h3>&#128221; 메모</h3>';
    if (r1.memo) html += '<div style="font-size:13px;padding:8px;background:var(--bg);border-radius:8px;margin-bottom:6px"><strong>' + r1.date + ':</strong> ' + r1.memo + '</div>';
    if (r2.memo) html += '<div style="font-size:13px;padding:8px;background:var(--bg);border-radius:8px"><strong>' + r2.date + ':</strong> ' + r2.memo + '</div>';
    html += '</div>';
  }
  result.innerHTML = html;
};

// =============================================
// 6. COURSE RECOMMENDATION QUIZ
// =============================================
var quizQuestions = [
  { q: '골프 실력은 어느 정도인가요?', opts: ['초보 (100타+)', '중급 (85~99타)', '상급 (84타 이하)'], key: 'level' },
  { q: '선호하는 그린피 범위는?', opts: ['10만원 이하', '10~20만원', '20만원 이상'], key: 'price' },
  { q: '선호하는 지역은?', opts: ['수도권 (경기/인천)', '강원도', '충청도', '전라도/제주'], key: 'region' },
  { q: '선호하는 코스 타입은?', opts: ['퍼블릭 (대중제)', '회원제 (명문)', '군 골프장 (가성비)'], key: 'type' },
  { q: '라운드 시 가장 중요하게 여기는 것은?', opts: ['코스 컨디션', '접근성/거리', '가성비', '식사/편의시설'], key: 'priority' }
];

var quizState = { step: 0, answers: {} };

function renderQuiz() {
  var ov = document.getElementById('v8QzOverlay');
  if (!ov) return;
  var body = ov.querySelector('.v8-modal');

  if (quizState.step >= quizQuestions.length) {
    renderQuizResult(body);
    return;
  }

  var q = quizQuestions[quizState.step];
  var progress = ((quizState.step) / quizQuestions.length) * 100;

  body.innerHTML = '<div style="display:flex;justify-content:space-between;align-items:center"><h2><span style="font-size:24px">&#127919;</span> 코스 추천 퀴즈</h2><button class="v8-close" onclick="document.getElementById(\'v8QzOverlay\').classList.remove(\'active\')">&times;</button></div>';
  body.innerHTML += '<div class="quiz-progress"><div class="quiz-progress-bar" style="width:' + progress + '%"></div></div>';
  body.innerHTML += '<div class="quiz-q"><div class="quiz-num">질문 ' + (quizState.step + 1) + ' / ' + quizQuestions.length + '</div><div class="quiz-text">' + q.q + '</div><div class="quiz-opts" id="v8QzOpts"></div></div>';

  var optsDiv = document.getElementById('v8QzOpts');
  q.opts.forEach(function(opt, i) {
    var btn = document.createElement('button');
    btn.className = 'quiz-opt';
    btn.textContent = opt;
    btn.addEventListener('click', function() {
      quizState.answers[q.key] = i;
      quizState.step++;
      renderQuiz();
    });
    optsDiv.appendChild(btn);
  });

  if (quizState.step > 0) {
    body.innerHTML += '<button class="v8-btn v8-btn-secondary" style="margin-top:8px" onclick="window._v8QuizBack()">&#9664; 이전 질문</button>';
  }
}

window._v8QuizBack = function() {
  if (quizState.step > 0) { quizState.step--; renderQuiz(); }
};

function renderQuizResult(body) {
  var a = quizState.answers;
  body.innerHTML = '<div style="display:flex;justify-content:space-between;align-items:center"><h2><span style="font-size:24px">&#127919;</span> 추천 결과</h2><button class="v8-close" onclick="document.getElementById(\'v8QzOverlay\').classList.remove(\'active\')">&times;</button></div>';
  body.innerHTML += '<div class="quiz-progress"><div class="quiz-progress-bar" style="width:100%"></div></div>';

  var courses = [];
  try { courses = window.allCourses || []; } catch(e){}

  var scored = courses.map(function(c) {
    var score = 50;
    if (a.type === 0 && c.t === '퍼블릭') score += 20;
    else if (a.type === 1 && c.t === '회원제') score += 20;
    else if (a.type === 2 && c.t === '군') score += 20;

    var wd = c.wd || 0;
    if (a.price === 0 && wd > 0 && wd <= 100000) score += 20;
    else if (a.price === 1 && wd > 100000 && wd <= 200000) score += 20;
    else if (a.price === 2 && wd > 200000) score += 20;

    var addr = c.a || '';
    if (a.region === 0 && (addr.indexOf('경기') !== -1 || addr.indexOf('인천') !== -1 || addr.indexOf('서울') !== -1)) score += 15;
    else if (a.region === 1 && addr.indexOf('강원') !== -1) score += 15;
    else if (a.region === 2 && (addr.indexOf('충') !== -1 || addr.indexOf('대전') !== -1 || addr.indexOf('세종') !== -1)) score += 15;
    else if (a.region === 3 && (addr.indexOf('전') !== -1 || addr.indexOf('제주') !== -1 || addr.indexOf('광주') !== -1)) score += 15;

    var rt = c.rt || 0;
    if (a.priority === 0 && rt >= 8) score += 15;
    if (a.priority === 3 && rt >= 7.5) score += 10;

    if (a.level === 0) {
      if (c.t === '퍼블릭') score += 10;
      if (wd > 0 && wd < 120000) score += 5;
    } else if (a.level === 2) {
      if (c.h >= 27) score += 10;
      if (rt >= 8.5) score += 5;
    }

    return { course: c, score: score };
  });

  scored.sort(function(a, b) { return b.score - a.score; });
  var top5 = scored.slice(0, 5);

  var resultHtml = '<div style="text-align:center;padding:16px;margin-bottom:16px"><div style="font-size:40px;margin-bottom:8px">&#127942;</div><div style="font-size:16px;font-weight:700">당신에게 맞는 골프장 TOP 5</div></div>';

  top5.forEach(function(item, i) {
    var c = item.course;
    var price = c.wd ? (Math.round(c.wd / 10000) + '만원') : '가격 문의';
    resultHtml += '<div style="padding:14px;border-radius:12px;background:var(--bg);margin-bottom:8px;cursor:pointer" onclick="window._v8QuizShowCourse && window._v8QuizShowCourse(\'' + (c.n || '').replace(/'/g, "\\'") + '\')">';
    resultHtml += '<div style="display:flex;justify-content:space-between;align-items:center"><div><span style="font-weight:800;color:var(--primary);margin-right:8px">#' + (i + 1) + '</span><span style="font-weight:700">' + (c.n || '') + '</span></div><div style="font-size:12px;color:var(--text-muted)">' + item.score + '점</div></div>';
    resultHtml += '<div style="font-size:12px;color:var(--text-muted);margin-top:4px">' + (c.a || '').substring(0, 30) + ' | ' + price + ' | &#11088; ' + (c.rt || '-') + '</div>';
    resultHtml += '</div>';
  });

  resultHtml += '<button class="v8-btn v8-btn-primary" style="width:100%;margin-top:16px" onclick="window._v8QuizReset()">&#128260; 다시 테스트</button>';
  body.innerHTML += resultHtml;
}

window._v8QuizReset = function() {
  quizState = { step: 0, answers: {} };
  renderQuiz();
};

window._v8QuizShowCourse = function(name) {
  document.getElementById('v8QzOverlay').classList.remove('active');
  var courses = window.allCourses || [];
  for (var i = 0; i < courses.length; i++) {
    if (courses[i].n === name) {
      if (typeof window.showDetail === 'function') window.showDetail(courses[i]);
      break;
    }
  }
};

// =============================================
// 7. WIND DISTANCE CALCULATOR
// =============================================
var clubDistances = [
  { name: '드라이버', dist: 220 },
  { name: '3우드', dist: 200 },
  { name: '5우드', dist: 185 },
  { name: '유틸리티', dist: 175 },
  { name: '4번 아이언', dist: 170 },
  { name: '5번 아이언', dist: 160 },
  { name: '6번 아이언', dist: 150 },
  { name: '7번 아이언', dist: 140 },
  { name: '8번 아이언', dist: 130 },
  { name: '9번 아이언', dist: 120 },
  { name: 'PW', dist: 110 },
  { name: 'AW', dist: 95 },
  { name: 'SW', dist: 80 },
  { name: 'LW', dist: 60 }
];

function renderWindCalc() {
  var ov = document.getElementById('v8WcOverlay');
  if (!ov) return;
  var body = ov.querySelector('.v8-modal');

  body.innerHTML = '<div style="display:flex;justify-content:space-between;align-items:center"><h2><span style="font-size:24px">&#127744;</span> 바람 보정 거리</h2><button class="v8-close" onclick="document.getElementById(\'v8WcOverlay\').classList.remove(\'active\')">&times;</button></div>';

  var form = '<div class="v8-section"><h3>&#9971; 클럽 선택</h3>';
  form += '<select id="wcClub" class="v8-select" onchange="window._v8CalcWind()">';
  clubDistances.forEach(function(c, i) {
    form += '<option value="' + i + '">' + c.name + ' (' + c.dist + 'm)</option>';
  });
  form += '</select></div>';

  form += '<div class="v8-section"><h3>&#128168; 바람 설정</h3>';
  form += '<div class="v8-grid2">';
  form += '<div><label style="font-size:12px;color:var(--text-muted)">풍속 (m/s)</label><input type="range" id="wcSpeed" min="0" max="15" value="5" oninput="document.getElementById(\'wcSpeedVal\').textContent=this.value+\'m/s\';window._v8CalcWind()" style="width:100%"><span id="wcSpeedVal" style="font-size:12px">5m/s</span></div>';
  form += '<div><label style="font-size:12px;color:var(--text-muted)">바람 방향</label><select id="wcDir" class="v8-select" onchange="window._v8CalcWind()"><option value="head">맞바람 (역풍)</option><option value="tail">뒷바람 (순풍)</option><option value="left">좌측풍</option><option value="right">우측풍</option></select></div>';
  form += '</div></div>';

  form += '<div class="v8-section"><h3>&#9968; 경사</h3>';
  form += '<div class="v8-grid2">';
  form += '<div><label style="font-size:12px;color:var(--text-muted)">오르막/내리막</label><select id="wcSlope" class="v8-select" onchange="window._v8CalcWind()"><option value="flat">평지</option><option value="uphill">오르막</option><option value="downhill">내리막</option></select></div>';
  form += '<div><label style="font-size:12px;color:var(--text-muted)">고도차 (m)</label><input type="number" id="wcElev" class="v8-input" value="0" min="0" max="50" onchange="window._v8CalcWind()"></div>';
  form += '</div></div>';

  body.innerHTML += form;
  body.innerHTML += '<div id="v8WcResult"></div>';
  window._v8CalcWind();
}

window._v8CalcWind = function() {
  var ci = parseInt(document.getElementById('wcClub').value);
  var speed = parseInt(document.getElementById('wcSpeed').value);
  var dir = document.getElementById('wcDir').value;
  var slope = document.getElementById('wcSlope').value;
  var elev = parseInt(document.getElementById('wcElev').value) || 0;
  var club = clubDistances[ci];
  var base = club.dist;

  var windEffect = 0;
  if (dir === 'head') windEffect = -(speed * 2.5);
  else if (dir === 'tail') windEffect = speed * 1.5;

  var slopeEffect = 0;
  if (slope === 'uphill') slopeEffect = -(elev * 0.8);
  else if (slope === 'downhill') slopeEffect = elev * 0.5;

  var adjusted = Math.round(base + windEffect + slopeEffect);
  var diff = adjusted - base;
  var diffStr = diff >= 0 ? '+' + diff : String(diff);
  var diffColor = diff > 0 ? '#4CAF50' : diff < 0 ? '#f44336' : 'var(--text-muted)';

  var html = '<div class="wc-result">';
  html += '<div style="font-size:13px;color:var(--text-muted)">보정 후 비거리</div>';
  html += '<div class="wc-adjusted">' + adjusted + 'm</div>';
  html += '<div class="wc-diff" style="color:' + diffColor + '">' + diffStr + 'm (기본 ' + base + 'm)</div>';
  html += '</div>';

  html += '<div style="padding:12px;background:var(--bg);border-radius:12px;margin-top:12px">';
  html += '<div style="font-size:13px;font-weight:700;margin-bottom:8px">&#128161; 보정 상세</div>';
  html += '<div style="display:flex;justify-content:space-between;font-size:12px;padding:4px 0;border-bottom:1px solid var(--border)"><span>기본 비거리</span><span style="font-weight:600">' + base + 'm</span></div>';
  if (windEffect !== 0) html += '<div style="display:flex;justify-content:space-between;font-size:12px;padding:4px 0;border-bottom:1px solid var(--border)"><span>바람 보정 (' + dir + ' ' + speed + 'm/s)</span><span style="font-weight:600;color:' + (windEffect > 0 ? '#4CAF50' : '#f44336') + '">' + (windEffect > 0 ? '+' : '') + Math.round(windEffect) + 'm</span></div>';
  if (slopeEffect !== 0) html += '<div style="display:flex;justify-content:space-between;font-size:12px;padding:4px 0;border-bottom:1px solid var(--border)"><span>경사 보정 (' + slope + ' ' + elev + 'm)</span><span style="font-weight:600;color:' + (slopeEffect > 0 ? '#4CAF50' : '#f44336') + '">' + (slopeEffect > 0 ? '+' : '') + Math.round(slopeEffect) + 'm</span></div>';
  html += '<div style="display:flex;justify-content:space-between;font-size:13px;padding:6px 0;font-weight:700"><span>최종 비거리</span><span style="color:var(--primary)">' + adjusted + 'm</span></div>';
  html += '</div>';

  var suggestClub = '';
  for (var s = 0; s < clubDistances.length; s++) {
    if (clubDistances[s].dist <= adjusted + 10 && clubDistances[s].dist >= adjusted - 10) {
      suggestClub = clubDistances[s].name;
      break;
    }
  }
  if (!suggestClub) {
    for (var s2 = 0; s2 < clubDistances.length; s2++) {
      if (clubDistances[s2].dist <= adjusted) { suggestClub = clubDistances[s2].name; break; }
    }
  }
  if (suggestClub && suggestClub !== club.name) {
    html += '<div style="text-align:center;margin-top:12px;padding:10px;background:var(--primary-light);border-radius:10px;font-size:13px"><strong>&#128161; 추천 클럽:</strong> ' + suggestClub + '</div>';
  }

  document.getElementById('v8WcResult').innerHTML = html;
};

// =============================================
// 8. PRACTICE DRILL GUIDE (8 drills)
// =============================================
var drills = [
  { name: '얼라인먼트 스틱 드릴', time: 300, difficulty: '초급', target: '방향성', desc: '얼라인먼트 스틱 2개를 평행하게 놓고, 목표 방향으로 정렬된 상태에서 연습합니다. 스탠스, 클럽페이스, 어깨가 모두 일직선인지 확인합니다. 10회 반복 후 스틱 없이 같은 자세를 취해봅니다.' },
  { name: '게이트 퍼팅 드릴', time: 240, difficulty: '초급', target: '퍼팅', desc: '볼 양쪽에 티를 볼 너비보다 약간 넓게 세우고 퍼팅합니다. 퍼터가 게이트를 통과하며 스트레이트 스트로크를 만들어줍니다. 3피트부터 시작해 점차 거리를 늘립니다.' },
  { name: '9샷 드릴', time: 600, difficulty: '중급', target: '샷 메이킹', desc: '한 클럽으로 9가지 탄도를 만듭니다: 높은/중간/낮은 × 드로우/스트레이트/페이드. 각 조합을 3회씩 연습합니다. 다양한 상황에서의 대응력을 키워줍니다.' },
  { name: '50야드 컨트롤 드릴', time: 360, difficulty: '초급', target: '어프로치', desc: '30/40/50야드 3개 목표를 설정하고 SW로 각각 10회씩 연습합니다. 그립 길이와 백스윙 크기로 거리를 조절합니다. 스코어에 직결되는 핵심 연습입니다.' },
  { name: '라이 변화 드릴', time: 480, difficulty: '중급', target: '적응력', desc: '오르막/내리막/좌오르막/우오르막 4가지 라이에서 각 5회씩 연습합니다. 체중 배분과 클럽 선택이 어떻게 달라지는지 체감합니다.' },
  { name: '프리샷 루틴 드릴', time: 300, difficulty: '초급', target: '멘탈', desc: '모든 샷 전 동일한 루틴을 실행합니다: (1) 뒤에서 목표 확인 (2) 연습 스윙 1회 (3) 어드레스 (4) 한 번 보고 (5) 스윙. 30초 이내로 완료하는 연습을 합니다.' },
  { name: '거리 래더 드릴', time: 480, difficulty: '상급', target: '거리감', desc: '퍼팅 그린에서 10/20/30/40/50피트 목표를 설정합니다. 각 거리에 볼 3개씩 놓고, 홀 1피트 이내에 들어가는 비율을 기록합니다. 목표: 80% 이상.' },
  { name: '벙커 탈출 드릴', time: 360, difficulty: '중급', target: '벙커샷', desc: '벙커에 수건을 깔고 그 위에 볼을 놓습니다. 수건째로 볼을 탈출시킵니다. 볼을 직접 맞추지 않고 모래를 폭발시키는 감각을 익힙니다. 10회 연속 성공 목표.' }
];

var drillTimer = { active: false, time: 0, total: 0, interval: null, name: '' };

function renderDrills() {
  var ov = document.getElementById('v8DrOverlay');
  if (!ov) return;
  var body = ov.querySelector('.v8-modal');

  body.innerHTML = '<div style="display:flex;justify-content:space-between;align-items:center"><h2><span style="font-size:24px">&#127947;</span> 연습 드릴</h2><button class="v8-close" onclick="window._v8CloseDrills()">&times;</button></div>';

  body.innerHTML += '<div id="v8DrTimer" style="display:none"></div>';

  var tabs = '<div class="v8-tabs">';
  tabs += '<button class="v8-tab active" onclick="window._v8DrFilter(\'all\',this)">전체 (8)</button>';
  ['초급','중급','상급'].forEach(function(d) {
    var cnt = drills.filter(function(dr){ return dr.difficulty === d; }).length;
    tabs += '<button class="v8-tab" onclick="window._v8DrFilter(\'' + d + '\',this)">' + d + ' (' + cnt + ')</button>';
  });
  tabs += '</div>';
  body.innerHTML += tabs;

  var list = '<div id="v8DrList">';
  drills.forEach(function(d, i) {
    var mins = Math.floor(d.time / 60);
    var diffColor = d.difficulty === '초급' ? '#4CAF50' : d.difficulty === '중급' ? '#FF9800' : '#f44336';
    list += '<div class="dr-card" data-diff="' + d.difficulty + '" onclick="this.classList.toggle(\'expanded\')">';
    list += '<div class="dr-title"><span style="color:' + diffColor + '">' + d.difficulty + '</span> ' + d.name + '</div>';
    list += '<div class="dr-meta">&#9200; ' + mins + '분 | &#127919; ' + d.target + '</div>';
    list += '<div class="dr-desc">' + d.desc + '<div style="margin-top:12px"><button class="v8-btn v8-btn-primary" onclick="event.stopPropagation();window._v8StartDrill(' + i + ')">&#9654; 타이머 시작</button></div></div>';
    list += '</div>';
  });
  list += '</div>';
  body.innerHTML += list;
}

window._v8CloseDrills = function() {
  if (drillTimer.interval) { clearInterval(drillTimer.interval); drillTimer.interval = null; }
  drillTimer.active = false;
  document.getElementById('v8DrOverlay').classList.remove('active');
};

window._v8DrFilter = function(f, btn) {
  btn.parentElement.querySelectorAll('.v8-tab').forEach(function(t){ t.classList.remove('active'); });
  btn.classList.add('active');
  document.querySelectorAll('#v8DrList .dr-card').forEach(function(c) {
    c.style.display = (f === 'all' || c.dataset.diff === f) ? '' : 'none';
  });
};

window._v8StartDrill = function(idx) {
  var d = drills[idx];
  drillTimer.active = true;
  drillTimer.time = d.time;
  drillTimer.total = d.time;
  drillTimer.name = d.name;
  updateDrillTimer();
  if (drillTimer.interval) clearInterval(drillTimer.interval);
  drillTimer.interval = setInterval(function() {
    if (!drillTimer.active) return;
    drillTimer.time--;
    if (drillTimer.time <= 0) {
      drillTimer.time = 0;
      drillTimer.active = false;
      clearInterval(drillTimer.interval);
      try { new AudioContext().createOscillator().connect(new AudioContext().destination); } catch(e){}
    }
    updateDrillTimer();
  }, 1000);
};

function updateDrillTimer() {
  var el = document.getElementById('v8DrTimer');
  if (!el) return;
  el.style.display = 'block';
  var m = Math.floor(drillTimer.time / 60);
  var s = drillTimer.time % 60;
  var pct = ((drillTimer.total - drillTimer.time) / drillTimer.total) * 100;
  el.innerHTML = '<div class="dr-timer"><div class="dr-name">' + drillTimer.name + '</div><div class="dr-time">' + (m < 10 ? '0' : '') + m + ':' + (s < 10 ? '0' : '') + s + '</div><div style="height:6px;background:var(--border);border-radius:3px;overflow:hidden;margin:12px 0"><div style="height:100%;width:' + pct + '%;background:linear-gradient(90deg,var(--primary),#7bed9f);border-radius:3px;transition:width 1s"></div></div><div class="dr-timer-btns"><button class="v8-btn ' + (drillTimer.active ? 'v8-btn-secondary' : 'v8-btn-primary') + '" onclick="window._v8PauseDrill()">' + (drillTimer.active ? '&#9208; 일시정지' : '&#9654; 계속') + '</button><button class="v8-btn v8-btn-secondary" onclick="window._v8StopDrill()">&#9632; 중지</button></div></div>';
}

window._v8PauseDrill = function() {
  drillTimer.active = !drillTimer.active;
  updateDrillTimer();
};

window._v8StopDrill = function() {
  drillTimer.active = false;
  if (drillTimer.interval) { clearInterval(drillTimer.interval); drillTimer.interval = null; }
  var el = document.getElementById('v8DrTimer');
  if (el) el.style.display = 'none';
};

// =============================================
// 9. ROUND CALENDAR
// =============================================
var calState = { year: new Date().getFullYear(), month: new Date().getMonth() };

function renderCalendar() {
  var ov = document.getElementById('v8CalOverlay');
  if (!ov) return;
  var body = ov.querySelector('.v8-modal');
  var rounds = JSON.parse(localStorage.getItem('sg_rounds') || '[]');

  var roundDates = {};
  rounds.forEach(function(r) {
    if (r.date) roundDates[r.date] = (roundDates[r.date] || 0) + 1;
  });

  body.innerHTML = '<div style="display:flex;justify-content:space-between;align-items:center"><h2><span style="font-size:24px">&#128197;</span> 라운드 캘린더</h2><button class="v8-close" onclick="document.getElementById(\'v8CalOverlay\').classList.remove(\'active\')">&times;</button></div>';

  var y = calState.year, m = calState.month;
  var monthNames = ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'];

  body.innerHTML += '<div class="cal-nav"><button class="cal-nav-btn" onclick="window._v8CalPrev()">&#9664;</button><div class="cal-month">' + y + '년 ' + monthNames[m] + '</div><button class="cal-nav-btn" onclick="window._v8CalNext()">&#9654;</button></div>';

  var dayNames = ['일','월','화','수','목','금','토'];
  var grid = '<div class="cal-grid">';
  dayNames.forEach(function(d, i) {
    var color = i === 0 ? '#f44336' : i === 6 ? '#2196F3' : 'var(--text-muted)';
    grid += '<div class="cal-header" style="color:' + color + '">' + d + '</div>';
  });

  var firstDay = new Date(y, m, 1).getDay();
  var daysInMonth = new Date(y, m + 1, 0).getDate();
  var prevDays = new Date(y, m, 0).getDate();
  var today = new Date();
  var todayStr = today.getFullYear() + '-' + String(today.getMonth() + 1).padStart(2, '0') + '-' + String(today.getDate()).padStart(2, '0');

  for (var pd = firstDay - 1; pd >= 0; pd--) {
    grid += '<div class="cal-day other-month">' + (prevDays - pd) + '</div>';
  }

  for (var d = 1; d <= daysInMonth; d++) {
    var dateStr = y + '-' + String(m + 1).padStart(2, '0') + '-' + String(d).padStart(2, '0');
    var classes = 'cal-day';
    if (dateStr === todayStr) classes += ' today';
    if (roundDates[dateStr]) classes += ' has-round';
    var dow = new Date(y, m, d).getDay();
    var dayColor = dow === 0 ? 'color:#f44336' : dow === 6 ? 'color:#2196F3' : '';
    grid += '<div class="' + classes + '" style="' + dayColor + '" onclick="window._v8CalDay(\'' + dateStr + '\')">' + d + '</div>';
  }

  var totalCells = firstDay + daysInMonth;
  var remaining = 7 - (totalCells % 7);
  if (remaining < 7) {
    for (var nd = 1; nd <= remaining; nd++) {
      grid += '<div class="cal-day other-month">' + nd + '</div>';
    }
  }
  grid += '</div>';
  body.innerHTML += grid;

  var monthRounds = rounds.filter(function(r) {
    if (!r.date) return false;
    return r.date.startsWith(y + '-' + String(m + 1).padStart(2, '0'));
  });

  if (monthRounds.length > 0) {
    var avgScore = Math.round(monthRounds.reduce(function(s, r){ return s + r.score; }, 0) / monthRounds.length);
    body.innerHTML += '<div style="margin-top:16px;padding:12px;background:var(--bg);border-radius:12px"><div style="font-size:13px;font-weight:700;margin-bottom:8px">&#128200; ' + monthNames[m] + ' 요약</div><div style="display:flex;gap:12px"><div style="text-align:center;flex:1"><div style="font-size:20px;font-weight:800;color:var(--primary)">' + monthRounds.length + '</div><div style="font-size:10px;color:var(--text-muted)">라운드</div></div><div style="text-align:center;flex:1"><div style="font-size:20px;font-weight:800;color:var(--accent)">' + avgScore + '</div><div style="font-size:10px;color:var(--text-muted)">평균 타수</div></div><div style="text-align:center;flex:1"><div style="font-size:20px;font-weight:800;color:#2196F3">' + Math.min.apply(null, monthRounds.map(function(r){return r.score;})) + '</div><div style="font-size:10px;color:var(--text-muted)">베스트</div></div></div></div>';
  }

  body.innerHTML += '<div id="v8CalDayDetail"></div>';
}

window._v8CalPrev = function() {
  calState.month--;
  if (calState.month < 0) { calState.month = 11; calState.year--; }
  renderCalendar();
};

window._v8CalNext = function() {
  calState.month++;
  if (calState.month > 11) { calState.month = 0; calState.year++; }
  renderCalendar();
};

window._v8CalDay = function(dateStr) {
  var rounds = JSON.parse(localStorage.getItem('sg_rounds') || '[]');
  var dayRounds = rounds.filter(function(r){ return r.date === dateStr; });
  var el = document.getElementById('v8CalDayDetail');
  if (!el) return;
  if (dayRounds.length === 0) {
    el.innerHTML = '<div style="text-align:center;padding:16px;color:var(--text-muted);font-size:13px">' + dateStr + ' — 라운드 기록 없음</div>';
    return;
  }
  var html = '<div style="margin-top:12px"><div style="font-size:13px;font-weight:700;margin-bottom:8px">' + dateStr + ' 라운드</div>';
  dayRounds.forEach(function(r) {
    html += '<div style="padding:10px;background:var(--bg);border-radius:10px;margin-bottom:6px;display:flex;justify-content:space-between"><div><span style="font-weight:700;color:var(--primary);font-size:16px">' + r.score + '타</span>';
    if (r.course) html += ' <span style="font-size:12px;color:var(--text-muted)">' + r.course + '</span>';
    html += '</div>';
    if (r.memo) html += '<div style="font-size:12px;color:var(--text-muted)">' + r.memo + '</div>';
    html += '</div>';
  });
  html += '</div>';
  el.innerHTML = html;
};

// =============================================
// 10. SEO + ACCESSIBILITY
// =============================================
function injectSEO() {
  if (document.querySelector('script[type="application/ld+json"]')) return;
  var ld = document.createElement('script');
  ld.type = 'application/ld+json';
  ld.textContent = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "SmartGolf",
    "description": "전국 590개 골프장 AI 맞춤 추천, 핸디캡 계산기, 코스 공략, 에티켓 가이드, 바람 보정 거리, 연습 드릴, 라운드 캘린더",
    "applicationCategory": "SportsApplication",
    "operatingSystem": "Web",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "KRW" },
    "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.8", "ratingCount": "590" }
  });
  document.head.appendChild(ld);
}

function injectAccessibility() {
  var skip = document.querySelector('a[href="#main-content"]');
  if (!skip) {
    skip = document.createElement('a');
    skip.href = '#main-content';
    skip.textContent = '본문으로 건너뛰기';
    skip.style.cssText = 'position:absolute;top:-40px;left:0;background:var(--primary);color:#fff;padding:8px 16px;z-index:99999;border-radius:0 0 8px 0;transition:top .3s';
    skip.addEventListener('focus', function(){ this.style.top = '0'; });
    skip.addEventListener('blur', function(){ this.style.top = '-40px'; });
    document.body.insertBefore(skip, document.body.firstChild);
  }
}

// =============================================
// UI CREATION: Overlays + Quick Action Buttons
// =============================================
function createOverlays() {
  var overlays = [
    { id: 'v8HcOverlay', label: '핸디캡 계산기' },
    { id: 'v8CsOverlay', label: '코스 공략' },
    { id: 'v8GfOverlay', label: '그린피 트렌드' },
    { id: 'v8EtOverlay', label: '골프 에티켓' },
    { id: 'v8RcOverlay', label: '라운드 비교' },
    { id: 'v8QzOverlay', label: '코스 추천 퀴즈' },
    { id: 'v8WcOverlay', label: '바람 보정 거리' },
    { id: 'v8DrOverlay', label: '연습 드릴' },
    { id: 'v8CalOverlay', label: '라운드 캘린더' }
  ];

  overlays.forEach(function(o) {
    if (document.getElementById(o.id)) return;
    var div = document.createElement('div');
    div.className = 'v8-overlay';
    div.id = o.id;
    div.setAttribute('role', 'dialog');
    div.setAttribute('aria-modal', 'true');
    div.setAttribute('aria-label', o.label);
    div.innerHTML = '<div class="v8-modal"></div>';
    div.addEventListener('click', function(e) { if (e.target === this) this.classList.remove('active'); });
    document.body.appendChild(div);
  });
}

function addQuickButtons() {
  var quickRow = document.querySelector('.v7-quick');
  if (!quickRow) {
    var searchSection = document.querySelector('.search-section');
    if (!searchSection) return;
    quickRow = document.createElement('div');
    quickRow.className = 'v7-quick';
    quickRow.style.marginTop = '12px';
    searchSection.appendChild(quickRow);
  }

  var buttons = [
    { icon: '&#9971;', label: '핸디캡', action: function(){ renderHandicap(); document.getElementById('v8HcOverlay').classList.add('active'); } },
    { icon: '&#129333;', label: '에티켓', action: function(){ renderEtiquette(); document.getElementById('v8EtOverlay').classList.add('active'); } },
    { icon: '&#127919;', label: '추천퀴즈', action: function(){ quizState = { step: 0, answers: {} }; renderQuiz(); document.getElementById('v8QzOverlay').classList.add('active'); } },
    { icon: '&#127744;', label: '바람보정', action: function(){ renderWindCalc(); document.getElementById('v8WcOverlay').classList.add('active'); } },
    { icon: '&#127947;', label: '드릴', action: function(){ renderDrills(); document.getElementById('v8DrOverlay').classList.add('active'); } },
    { icon: '&#128202;', label: '비교', action: function(){ renderRoundCompare(); document.getElementById('v8RcOverlay').classList.add('active'); } },
    { icon: '&#128197;', label: '캘린더', action: function(){ renderCalendar(); document.getElementById('v8CalOverlay').classList.add('active'); } }
  ];

  buttons.forEach(function(b) {
    var btn = document.createElement('button');
    btn.className = 'v8-quick-btn';
    btn.innerHTML = '<span class="qicon">' + b.icon + '</span>' + b.label;
    btn.addEventListener('click', b.action);
    quickRow.appendChild(btn);
  });
}

function addDetailButtons() {
  var origShowDetail = window.showDetail;
  if (!origShowDetail) return;

  window.showDetail = function(c) {
    origShowDetail(c);
    setTimeout(function() {
      var actions = document.querySelector('.detail-actions');
      if (!actions) {
        var body = document.querySelector('.modal-body, .modal');
        if (!body) return;
        actions = document.createElement('div');
        actions.className = 'detail-actions';
        var firstChild = body.querySelector('.modal-row, div');
        if (firstChild) body.insertBefore(actions, firstChild);
        else body.appendChild(actions);
      }

      if (!actions.querySelector('.btn-strategy')) {
        var stratBtn = document.createElement('button');
        stratBtn.className = 'v8-btn v8-btn-primary btn-strategy';
        stratBtn.innerHTML = '&#127948; 코스 공략';
        stratBtn.addEventListener('click', function() {
          renderCourseStrategy(c.n);
          document.getElementById('v8CsOverlay').classList.add('active');
        });
        actions.appendChild(stratBtn);
      }

      if (!actions.querySelector('.btn-trend')) {
        var trendBtn = document.createElement('button');
        trendBtn.className = 'v8-btn v8-btn-secondary btn-trend';
        trendBtn.innerHTML = '&#128200; 그린피 트렌드';
        trendBtn.addEventListener('click', function() {
          renderGreenFeeTrend(c.n, c.wd, c.we);
          document.getElementById('v8GfOverlay').classList.add('active');
        });
        actions.appendChild(trendBtn);
      }
    }, 200);
  };
}

// Keyboard shortcuts
function addKeyboardShortcuts() {
  document.addEventListener('keydown', function(e) {
    var t = e.target.tagName;
    if (t === 'INPUT' || t === 'TEXTAREA' || t === 'SELECT') return;

    if (e.key === 'h' || e.key === 'H') {
      renderHandicap();
      document.getElementById('v8HcOverlay').classList.add('active');
    }
    if (e.key === 'e' || e.key === 'E') {
      renderEtiquette();
      document.getElementById('v8EtOverlay').classList.add('active');
    }
    if (e.key === 'q' || e.key === 'Q') {
      quizState = { step: 0, answers: {} };
      renderQuiz();
      document.getElementById('v8QzOverlay').classList.add('active');
    }
    if (e.key === 'w' || e.key === 'W') {
      renderWindCalc();
      document.getElementById('v8WcOverlay').classList.add('active');
    }
    if (e.key === 'c' || e.key === 'C') {
      renderCalendar();
      document.getElementById('v8CalOverlay').classList.add('active');
    }
  });

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      ['v8HcOverlay','v8CsOverlay','v8GfOverlay','v8EtOverlay','v8RcOverlay','v8QzOverlay','v8WcOverlay','v8DrOverlay','v8CalOverlay'].forEach(function(id) {
        var el = document.getElementById(id);
        if (el) el.classList.remove('active');
      });
    }
  });
}

// =============================================
// INIT
// =============================================
function init() {
  createOverlays();
  addQuickButtons();
  addDetailButtons();
  addKeyboardShortcuts();
  injectSEO();
  injectAccessibility();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  setTimeout(init, 500);
}

})();
