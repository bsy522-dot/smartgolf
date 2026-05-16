(function(){
'use strict';

// === SmartGolf v8.0 Patch ===
// 1. 코스 난이도 분석기 (Course Difficulty Analyzer)
// 2. 샷 트래킹 시스템 (Shot Tracking System)
// 3. 소셜 리더보드 (Social Leaderboard & Achievements)
// 4. 코스 공략법 가이드 (Course Strategy Guide)
// 5. 그린피 트렌드 분석 (Price Trend Analysis)
// 6. 스윙 템포 메트로놈 (Swing Tempo Metronome)
// 7. 코스 포토 테마 (Course Visual Themes)
// 8. Quick Actions 패널 리뉴얼

// --- CSS Injection ---
var css8 = document.createElement('style');
css8.textContent = `
/* === v8 Overlay & Modal === */
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
.v8-btn{padding:10px 20px;border:none;border-radius:10px;font-size:13px;font-weight:600;cursor:pointer;transition:.2s}
.v8-btn-primary{background:linear-gradient(135deg,var(--primary),var(--primary-dark,#145a2a));color:#fff}
.v8-btn-primary:hover{transform:translateY(-1px);box-shadow:0 4px 12px rgba(26,122,58,.3)}
.v8-btn-secondary{background:var(--bg);color:var(--text);border:1px solid var(--border)}
.v8-tabs{display:flex;gap:6px;margin-bottom:16px;overflow-x:auto;padding-bottom:4px}
.v8-tab{padding:7px 14px;border-radius:20px;border:1px solid var(--border);background:var(--bg);font-size:12px;cursor:pointer;white-space:nowrap;transition:.2s}
.v8-tab.active{background:var(--primary);color:#fff;border-color:var(--primary)}

/* === 1. Difficulty Analyzer === */
.v8-diff-meter{width:100%;height:18px;border-radius:9px;background:linear-gradient(90deg,#4caf50 0%,#ffeb3b 33%,#ff9800 66%,#f44336 100%);position:relative;margin:12px 0;overflow:hidden}
.v8-diff-meter::after{content:'';position:absolute;top:0;left:0;right:0;bottom:0;background:rgba(255,255,255,.15);border-radius:9px}
.v8-diff-indicator{position:absolute;top:-2px;width:4px;height:22px;background:#222;border-radius:2px;transition:left .5s cubic-bezier(.23,1,.32,1)}
[data-theme="dark"] .v8-diff-indicator{background:#fff}
.v8-diff-badge{display:inline-block;padding:4px 12px;border-radius:12px;font-size:12px;font-weight:700}
.v8-diff-badge.beginner{background:#e8f5e9;color:#2e7d32}
.v8-diff-badge.intermediate{background:#fff3e0;color:#e65100}
.v8-diff-badge.advanced{background:#fce4ec;color:#c62828}
.v8-diff-badge.championship{background:#f3e5f5;color:#6a1b9a}
[data-theme="dark"] .v8-diff-badge.beginner{background:#1b3d20;color:#81c784}
[data-theme="dark"] .v8-diff-badge.intermediate{background:#3e2723;color:#ffb74d}
[data-theme="dark"] .v8-diff-badge.advanced{background:#3e1520;color:#ef9a9a}
[data-theme="dark"] .v8-diff-badge.championship{background:#2a1540;color:#ce93d8}
.v8-diff-stats{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:14px}
.v8-diff-stat{background:var(--bg);border-radius:12px;padding:14px;text-align:center}
.v8-diff-stat .val{font-size:24px;font-weight:800;color:var(--primary)}
.v8-diff-stat .lbl{font-size:11px;color:var(--text-muted);margin-top:2px}
.v8-diff-course-list{max-height:300px;overflow-y:auto}
.v8-diff-item{display:flex;align-items:center;justify-content:space-between;padding:10px 12px;border-radius:10px;background:var(--bg);margin-bottom:6px}
.v8-diff-item .cname{font-weight:600;font-size:13px;flex:1}
.v8-diff-item .cslope{font-size:12px;font-weight:700;color:var(--primary)}

/* === 2. Shot Tracking === */
.v8-shot-form{display:grid;grid-template-columns:1fr 1fr;gap:8px}
.v8-shot-form select,.v8-shot-form input{padding:10px 12px;border:1px solid var(--border);border-radius:10px;font-size:13px;background:var(--bg);color:var(--text);width:100%}
.v8-shot-form label{font-size:11px;font-weight:600;color:var(--text-muted);margin-bottom:3px;display:block}
.v8-shot-form .field{display:flex;flex-direction:column}
.v8-shot-toggle{display:flex;gap:6px}
.v8-shot-toggle button{flex:1;padding:8px;border:1px solid var(--border);border-radius:8px;background:var(--bg);cursor:pointer;font-size:12px;font-weight:600;transition:.2s}
.v8-shot-toggle button.active{background:var(--primary);color:#fff;border-color:var(--primary)}
.v8-shot-summary{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin-top:14px}
.v8-shot-summary .sbox{text-align:center;padding:10px;background:var(--bg);border-radius:10px}
.v8-shot-summary .sbox .sv{font-size:20px;font-weight:800;color:var(--primary)}
.v8-shot-summary .sbox .sl{font-size:10px;color:var(--text-muted)}
@media(max-width:480px){.v8-shot-summary{grid-template-columns:1fr 1fr}}
.v8-shot-bar{height:8px;background:var(--border);border-radius:4px;overflow:hidden;margin-top:4px}
.v8-shot-bar-fill{height:100%;border-radius:4px;transition:width .4s ease}
.v8-shot-holes{display:flex;gap:4px;flex-wrap:wrap;margin:12px 0}
.v8-shot-hole-btn{width:32px;height:32px;border-radius:8px;border:1px solid var(--border);display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;cursor:pointer;transition:.2s;background:var(--bg)}
.v8-shot-hole-btn.filled{background:var(--primary);color:#fff;border-color:var(--primary)}
.v8-shot-hole-btn.current{border:2px solid #ff6b35;color:#ff6b35}

/* === 3. Leaderboard === */
.v8-lb-card{background:linear-gradient(135deg,#ffd700,#ffaa00);border-radius:14px;padding:18px;margin-bottom:14px;text-align:center;color:#333}
.v8-lb-card .rank{font-size:36px;font-weight:900}
.v8-lb-card .hcp{font-size:14px;font-weight:600;margin-top:4px}
.v8-lb-row{display:flex;align-items:center;padding:10px 12px;border-radius:10px;background:var(--bg);margin-bottom:6px;gap:10px}
.v8-lb-row .lb-pos{width:28px;height:28px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:12px;background:var(--border);color:var(--text)}
.v8-lb-row .lb-pos.gold{background:#ffd700;color:#333}
.v8-lb-row .lb-pos.silver{background:#c0c0c0;color:#333}
.v8-lb-row .lb-pos.bronze{background:#cd7f32;color:#fff}
.v8-lb-row .lb-info{flex:1}
.v8-lb-row .lb-name{font-weight:700;font-size:13px}
.v8-lb-row .lb-sub{font-size:11px;color:var(--text-muted)}
.v8-lb-row .lb-score{font-weight:800;font-size:15px;color:var(--primary)}
.v8-achievement{display:flex;align-items:center;gap:10px;padding:12px;border-radius:12px;background:var(--bg);margin-bottom:8px}
.v8-achievement.locked{opacity:.5;filter:grayscale(1)}
.v8-achievement .ach-icon{font-size:24px}
.v8-achievement .ach-info{flex:1}
.v8-achievement .ach-name{font-weight:700;font-size:13px}
.v8-achievement .ach-desc{font-size:11px;color:var(--text-muted)}
.v8-achievement .ach-date{font-size:10px;color:var(--primary);font-weight:600}

/* === 4. Strategy Guide === */
.v8-strat-card{background:var(--bg);border-radius:12px;padding:14px;margin-bottom:10px}
.v8-strat-card h4{font-size:14px;font-weight:700;margin:0 0 8px;display:flex;align-items:center;gap:6px}
.v8-strat-card p{font-size:12px;color:var(--text-muted);line-height:1.6;margin:0}
.v8-strat-card ul{margin:8px 0 0;padding-left:16px}
.v8-strat-card ul li{font-size:12px;color:var(--text-muted);line-height:1.8}
.v8-checklist{list-style:none;padding:0;margin:0}
.v8-checklist li{display:flex;align-items:center;gap:8px;padding:8px 12px;border-radius:8px;margin-bottom:4px;background:var(--bg);font-size:13px;cursor:pointer;transition:.2s}
.v8-checklist li:hover{background:var(--primary-light,#e8f5e9)}
.v8-checklist li .chk{width:20px;height:20px;border:2px solid var(--border);border-radius:6px;display:flex;align-items:center;justify-content:center;transition:.2s;flex-shrink:0}
.v8-checklist li.checked .chk{background:var(--primary);border-color:var(--primary);color:#fff}

/* === 5. Price Trend === */
.v8-price-chart{width:100%;height:200px;background:var(--bg);border-radius:12px;overflow:hidden;position:relative;margin-bottom:14px}
.v8-price-chart canvas{width:100%!important;height:100%!important}
.v8-price-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:14px}
.v8-price-box{background:var(--bg);border-radius:12px;padding:14px;text-align:center}
.v8-price-box .pv{font-size:20px;font-weight:800;color:var(--primary)}
.v8-price-box .pl{font-size:11px;color:var(--text-muted);margin-top:2px}
.v8-price-rank{display:flex;align-items:center;padding:10px 12px;border-radius:10px;background:var(--bg);margin-bottom:6px;gap:10px}
.v8-price-rank .pr-idx{font-weight:800;font-size:14px;color:var(--primary)}
.v8-price-rank .pr-name{flex:1;font-size:13px;font-weight:600}
.v8-price-rank .pr-val{font-size:12px;color:var(--text-muted)}
.v8-budget-calc{background:var(--bg);border-radius:12px;padding:16px;margin-top:14px}
.v8-budget-calc input[type=range]{width:100%;margin:8px 0}
.v8-budget-result{font-size:18px;font-weight:800;color:var(--primary);text-align:center;margin-top:8px}

/* === 6. Metronome === */
.v8-metro-wrap{text-align:center;padding:20px 0}
.v8-metro-bpm{font-size:56px;font-weight:900;color:var(--primary);font-variant-numeric:tabular-nums}
.v8-metro-label{font-size:13px;color:var(--text-muted);margin-top:4px}
.v8-pendulum{width:100%;height:120px;position:relative;margin:20px 0}
.v8-pendulum-arm{position:absolute;bottom:0;left:50%;width:3px;height:100px;background:var(--primary);transform-origin:bottom center;border-radius:2px;transition:transform .15s linear}
.v8-pendulum-ball{position:absolute;top:-8px;left:50%;transform:translateX(-50%);width:16px;height:16px;border-radius:50%;background:var(--primary)}
.v8-metro-presets{display:flex;gap:8px;justify-content:center;margin:16px 0}
.v8-metro-presets button{padding:8px 16px;border:1px solid var(--border);border-radius:20px;background:var(--bg);font-size:12px;font-weight:600;cursor:pointer;transition:.2s}
.v8-metro-presets button.active{background:var(--primary);color:#fff;border-color:var(--primary)}
.v8-metro-controls{display:flex;gap:12px;justify-content:center;margin-top:16px}
.v8-metro-controls button{width:56px;height:56px;border-radius:50%;border:none;font-size:20px;cursor:pointer;transition:.2s}
.v8-metro-play{background:linear-gradient(135deg,var(--primary),#7bed9f);color:#fff}
.v8-metro-play:hover{transform:scale(1.08)}
.v8-metro-ratio{display:flex;align-items:center;gap:12px;justify-content:center;margin-top:14px}
.v8-metro-ratio .ratio-bar{flex:1;max-width:200px;height:8px;border-radius:4px;background:var(--border);overflow:hidden;display:flex}
.v8-metro-ratio .ratio-back{background:var(--primary);flex:3}
.v8-metro-ratio .ratio-down{background:#ff6b35;flex:1}
.v8-metro-beat{width:16px;height:16px;border-radius:50%;background:var(--border);transition:background .1s}
.v8-metro-beat.tick{background:var(--primary);box-shadow:0 0 12px rgba(26,122,58,.5)}

/* === 7. Visual Themes === */
.v8-theme-card{border-radius:14px;overflow:hidden;margin-bottom:10px;cursor:pointer;transition:.2s;border:2px solid transparent}
.v8-theme-card:hover{transform:translateY(-2px);box-shadow:0 6px 20px rgba(0,0,0,.15)}
.v8-theme-card.selected{border-color:var(--primary)}
.v8-theme-preview{width:100%;height:80px;position:relative}
.v8-theme-label{padding:8px 12px;font-size:12px;font-weight:700;background:var(--bg)}
.v8-header-anim{width:100%;height:60px;border-radius:12px;margin-bottom:14px;position:relative;overflow:hidden}
.v8-header-anim .sun-moon{position:absolute;width:20px;height:20px;border-radius:50%;transition:all 1s}
.v8-header-anim .cloud{position:absolute;background:rgba(255,255,255,.8);border-radius:20px;height:12px}
[data-theme="dark"] .v8-header-anim .cloud{background:rgba(255,255,255,.15)}

/* === 8. Quick Actions Renewal === */
.v8-quick-btn{display:flex;flex-direction:column;align-items:center;gap:4px;padding:10px 14px;border-radius:12px;background:var(--card-bg);border:1px solid var(--border);cursor:pointer;transition:.2s;font-size:11px;font-weight:600;color:var(--text);min-width:70px;position:relative}
.v8-quick-btn:hover{border-color:var(--primary);background:var(--primary-light,#e8f5e9);transform:translateY(-2px)}
.v8-quick-btn:hover .qicon{animation:v8Bounce .4s ease}
@keyframes v8Bounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-4px)}}
.v8-quick-btn .qicon{font-size:20px;line-height:1;transition:transform .2s}
.v8-quick-tooltip{position:absolute;bottom:calc(100% + 8px);left:50%;transform:translateX(-50%);background:#333;color:#fff;padding:6px 10px;border-radius:8px;font-size:10px;white-space:nowrap;opacity:0;pointer-events:none;transition:opacity .2s;z-index:10}
.v8-quick-btn.show-tip .v8-quick-tooltip{opacity:1}
[data-theme="dark"] .v8-quick-tooltip{background:#555}
`;
document.head.appendChild(css8);

// === Utility Functions ===
function v8Toast(msg, type) {
  var t = document.createElement('div');
  t.className = 'v7-toast ' + (type || 'info');
  t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(function(){ t.remove(); }, 2500);
}

function v8CreateOverlay(id) {
  var ov = document.createElement('div');
  ov.className = 'v8-overlay';
  ov.id = id;
  ov.addEventListener('click', function(e){ if(e.target === ov) ov.classList.remove('active'); });
  document.body.appendChild(ov);
  return ov;
}

function v8OpenOverlay(ov) {
  ov.classList.add('active');
}

function v8CloseOverlay(ov) {
  ov.classList.remove('active');
}

function v8Storage(key, val) {
  if (val === undefined) {
    try { return JSON.parse(localStorage.getItem('sg_v8_' + key)); } catch(e){ return null; }
  }
  localStorage.setItem('sg_v8_' + key, JSON.stringify(val));
}

function v8GetCourses() {
  return window.allCourses || [];
}

// ====================================================================
// 1. COURSE DIFFICULTY ANALYZER
// ====================================================================
var diffOverlay = v8CreateOverlay('v8DiffOverlay');
var diffModal = document.createElement('div');
diffModal.className = 'v8-modal';
diffOverlay.appendChild(diffModal);

function calculateDifficulty(course) {
  var score = 50;
  // Hole count factor
  if (course.h >= 36) score += 30;
  else if (course.h >= 27) score += 20;
  else if (course.h >= 18) score += 10;
  else if (course.h <= 6) score -= 15;
  else if (course.h <= 9) score -= 5;
  // Type factor
  if (course.t === '회원제') score += 20;
  else if (course.t === '대중제') score -= 5;
  // Price as proxy for difficulty/maintenance
  if (course.weekday > 200000) score += 15;
  else if (course.weekday > 150000) score += 10;
  else if (course.weekday > 100000) score += 5;
  else if (course.weekday && course.weekday < 50000) score -= 10;
  // Rating factor (higher rated courses tend to be well-maintained = harder)
  if (course.rt >= 9.0) score += 10;
  else if (course.rt >= 8.5) score += 5;
  // Grass type
  if (course.g === '양잔디') score += 5;
  // Distance factor
  if (course.d && course.d > 200) score += 10;
  else if (course.d && course.d > 100) score += 5;
  // Clamp
  return Math.max(0, Math.min(100, score));
}

function getSlopeRating(diffScore) {
  // Map 0-100 difficulty to slope 55-155
  return Math.round(55 + (diffScore / 100) * 100);
}

function getCourseRating(course) {
  // Estimate course rating based on holes and difficulty
  var base = 72;
  if (course.h === 9) base = 36;
  else if (course.h === 27) base = 108;
  else if (course.h >= 36) base = 144;
  var modifier = (calculateDifficulty(course) - 50) / 50 * 4;
  return (base + modifier).toFixed(1);
}

function getDifficultyCategory(score) {
  if (score < 30) return { label: '초급자 추천', cls: 'beginner' };
  if (score < 55) return { label: '중급', cls: 'intermediate' };
  if (score < 75) return { label: '상급', cls: 'advanced' };
  return { label: '챔피언십', cls: 'championship' };
}

function renderDifficultyAnalyzer(selectedCourse) {
  var courses = v8GetCourses();
  var coursesWithDiff = courses.map(function(c){
    return { course: c, diff: calculateDifficulty(c) };
  }).sort(function(a, b){ return b.diff - a.diff; });

  var target = selectedCourse || (courses.length > 0 ? courses[0] : null);
  var targetDiff = target ? calculateDifficulty(target) : 50;
  var targetSlope = getSlopeRating(targetDiff);
  var targetCR = target ? getCourseRating(target) : '72.0';
  var cat = getDifficultyCategory(targetDiff);

  var avgDiff = coursesWithDiff.reduce(function(a,b){ return a + b.diff; }, 0) / (coursesWithDiff.length || 1);

  diffModal.innerHTML = '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px">' +
    '<h2 style="margin:0"><span class="v8-icon" style="background:linear-gradient(135deg,#ff6b35,#ff8f65)">&#9968;</span> 코스 난이도 분석</h2>' +
    '<button class="v8-close" onclick="document.getElementById(\'v8DiffOverlay\').classList.remove(\'active\')">&times;</button></div>' +
    (target ? '<div class="v8-section"><h3>&#127947; ' + target.n + '</h3>' +
    '<div class="v8-diff-meter"><div class="v8-diff-indicator" style="left:' + targetDiff + '%"></div></div>' +
    '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px">' +
    '<span class="v8-diff-badge ' + cat.cls + '">' + cat.label + '</span>' +
    '<span style="font-size:12px;color:var(--text-muted)">난이도 ' + targetDiff + '/100</span></div>' +
    '<div class="v8-diff-stats">' +
    '<div class="v8-diff-stat"><div class="val">' + targetSlope + '</div><div class="lbl">Slope Rating</div></div>' +
    '<div class="v8-diff-stat"><div class="val">' + targetCR + '</div><div class="lbl">Course Rating</div></div>' +
    '<div class="v8-diff-stat"><div class="val">' + (target.h || '?') + '</div><div class="lbl">홀 수</div></div>' +
    '<div class="v8-diff-stat"><div class="val">' + (target.t || '-') + '</div><div class="lbl">코스 타입</div></div>' +
    '</div></div>' : '') +
    '<div class="v8-section"><h3>&#128200; 전체 난이도 분포</h3>' +
    '<div style="display:flex;justify-content:space-between;font-size:11px;color:var(--text-muted);margin-bottom:6px">' +
    '<span>초급 (' + coursesWithDiff.filter(function(x){return x.diff<30;}).length + ')</span>' +
    '<span>중급 (' + coursesWithDiff.filter(function(x){return x.diff>=30&&x.diff<55;}).length + ')</span>' +
    '<span>상급 (' + coursesWithDiff.filter(function(x){return x.diff>=55&&x.diff<75;}).length + ')</span>' +
    '<span>챔피언십 (' + coursesWithDiff.filter(function(x){return x.diff>=75;}).length + ')</span></div>' +
    '<div class="v8-diff-meter" style="height:12px;margin:4px 0 14px"></div>' +
    '<p style="font-size:12px;color:var(--text-muted)">평균 난이도: ' + avgDiff.toFixed(1) + '/100 | 전체 ' + courses.length + '개 코스</p></div>' +
    '<div class="v8-section"><h3>&#127942; 난이도 TOP 10</h3><div class="v8-diff-course-list">' +
    coursesWithDiff.slice(0, 10).map(function(item){
      var c2 = getDifficultyCategory(item.diff);
      return '<div class="v8-diff-item"><span class="cname">' + item.course.n + '</span>' +
        '<span class="v8-diff-badge ' + c2.cls + '" style="margin-right:8px">' + c2.label + '</span>' +
        '<span class="cslope">S' + getSlopeRating(item.diff) + '</span></div>';
    }).join('') + '</div></div>';
}

// ====================================================================
// 2. SHOT TRACKING SYSTEM
// ====================================================================
var shotOverlay = v8CreateOverlay('v8ShotOverlay');
var shotModal = document.createElement('div');
shotModal.className = 'v8-modal';
shotOverlay.appendChild(shotModal);

var CLUBS = ['Driver','3W','5W','3H','4I','5I','6I','7I','8I','9I','PW','AW','SW','Putter'];

function getShotData() {
  return v8Storage('shots') || [];
}

function saveShotData(data) {
  v8Storage('shots', data);
}

function calculateShotStats(rounds) {
  if (!rounds || !rounds.length) return { fir: 0, gir: 0, avgPutts: 0, avgScore: 0, totalRounds: 0 };
  var totalHoles = 0, firHit = 0, girHit = 0, totalPutts = 0, totalScore = 0;
  rounds.forEach(function(round){
    var holes = round.holes || [];
    totalScore += holes.reduce(function(a, h){ return a + (h.score || 0); }, 0);
    holes.forEach(function(h){
      totalHoles++;
      if (h.fairway) firHit++;
      if (h.gir) girHit++;
      totalPutts += (h.putts || 0);
    });
  });
  return {
    fir: totalHoles ? Math.round(firHit / totalHoles * 100) : 0,
    gir: totalHoles ? Math.round(girHit / totalHoles * 100) : 0,
    avgPutts: totalHoles ? (totalPutts / totalHoles).toFixed(1) : '0.0',
    avgScore: rounds.length ? Math.round(totalScore / rounds.length) : 0,
    totalRounds: rounds.length
  };
}

function renderShotTracking() {
  var rounds = getShotData();
  var stats = calculateShotStats(rounds);
  var currentRound = v8Storage('shot_current') || { holes: [], courseName: '', date: '' };

  shotModal.innerHTML = '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px">' +
    '<h2 style="margin:0"><span class="v8-icon" style="background:linear-gradient(135deg,#1565c0,#42a5f5)">&#127948;</span> 샷 트래킹</h2>' +
    '<button class="v8-close" onclick="document.getElementById(\'v8ShotOverlay\').classList.remove(\'active\')">&times;</button></div>' +
    '<div class="v8-tabs">' +
    '<div class="v8-tab active" data-tab="input">입력</div>' +
    '<div class="v8-tab" data-tab="stats">통계</div>' +
    '<div class="v8-tab" data-tab="history">기록</div></div>' +
    '<div id="v8ShotContent"></div>';

  var tabs = shotModal.querySelectorAll('.v8-tab');
  tabs.forEach(function(tab){
    tab.addEventListener('click', function(){
      tabs.forEach(function(t){ t.classList.remove('active'); });
      tab.classList.add('active');
      renderShotTab(tab.dataset.tab);
    });
  });
  renderShotTab('input');

  function renderShotTab(tabName) {
    var container = document.getElementById('v8ShotContent');
    if (tabName === 'input') {
      var holeNum = (currentRound.holes || []).length + 1;
      if (holeNum > 18) holeNum = 18;
      container.innerHTML = '<div class="v8-section">' +
        '<h3>&#9971; 라운드 정보</h3>' +
        '<input type="text" id="v8ShotCourse" placeholder="코스명 입력" value="' + (currentRound.courseName || '').replace(/"/g,'&quot;') + '" style="width:100%;padding:10px 12px;border:1px solid var(--border);border-radius:10px;font-size:13px;background:var(--bg);color:var(--text);margin-bottom:10px">' +
        '</div>' +
        '<div class="v8-section"><h3>&#127950; 홀별 입력 (Hole ' + holeNum + '/18)</h3>' +
        '<div class="v8-shot-holes" id="v8HoleBtns"></div>' +
        '<div class="v8-shot-form">' +
        '<div class="field"><label>클럽</label><select id="v8Club">' + CLUBS.map(function(c){ return '<option value="' + c + '">' + c + '</option>'; }).join('') + '</select></div>' +
        '<div class="field"><label>거리(m)</label><input type="number" id="v8Dist" placeholder="0" min="0" max="400"></div>' +
        '<div class="field"><label>페어웨이 안착</label><div class="v8-shot-toggle" id="v8FIR"><button data-v="1">Y</button><button data-v="0">N</button></div></div>' +
        '<div class="field"><label>GIR</label><div class="v8-shot-toggle" id="v8GIR"><button data-v="1">Y</button><button data-v="0">N</button></div></div>' +
        '<div class="field"><label>퍼팅 수</label><input type="number" id="v8Putts" placeholder="2" min="0" max="10" value="2"></div>' +
        '<div class="field"><label>스코어</label><input type="number" id="v8Score" placeholder="4" min="1" max="15" value="4"></div>' +
        '</div>' +
        '<div style="display:flex;gap:8px;margin-top:14px">' +
        '<button class="v8-btn v8-btn-primary" id="v8SaveHole" style="flex:1">&#10004; 홀 저장</button>' +
        '<button class="v8-btn v8-btn-secondary" id="v8FinishRound">라운드 완료</button></div></div>';

      // Render hole buttons
      var holeBtns = document.getElementById('v8HoleBtns');
      for (var i = 1; i <= 18; i++) {
        var cls = 'v8-shot-hole-btn';
        if (i <= (currentRound.holes || []).length) cls += ' filled';
        if (i === holeNum) cls += ' current';
        holeBtns.innerHTML += '<div class="' + cls + '">' + i + '</div>';
      }

      // Toggle buttons
      ['v8FIR', 'v8GIR'].forEach(function(id){
        var wrap = document.getElementById(id);
        if (!wrap) return;
        wrap.querySelectorAll('button').forEach(function(btn){
          btn.addEventListener('click', function(){
            wrap.querySelectorAll('button').forEach(function(b){ b.classList.remove('active'); });
            btn.classList.add('active');
          });
        });
      });

      // Save hole
      var saveBtn = document.getElementById('v8SaveHole');
      if (saveBtn) saveBtn.addEventListener('click', function(){
        var courseName = document.getElementById('v8ShotCourse').value.trim();
        var club = document.getElementById('v8Club').value;
        var dist = parseInt(document.getElementById('v8Dist').value) || 0;
        var firBtn = document.querySelector('#v8FIR button.active');
        var girBtn = document.querySelector('#v8GIR button.active');
        var putts = parseInt(document.getElementById('v8Putts').value) || 2;
        var score = parseInt(document.getElementById('v8Score').value) || 4;

        currentRound.courseName = courseName;
        if (!currentRound.date) currentRound.date = new Date().toISOString().slice(0, 10);
        currentRound.holes = currentRound.holes || [];
        currentRound.holes.push({
          hole: currentRound.holes.length + 1,
          club: club,
          distance: dist,
          fairway: firBtn ? firBtn.dataset.v === '1' : false,
          gir: girBtn ? girBtn.dataset.v === '1' : false,
          putts: putts,
          score: score
        });
        v8Storage('shot_current', currentRound);
        v8Toast('Hole ' + currentRound.holes.length + ' 저장!', 'success');
        renderShotTracking();
      });

      // Finish round
      var finishBtn = document.getElementById('v8FinishRound');
      if (finishBtn) finishBtn.addEventListener('click', function(){
        if (!currentRound.holes || !currentRound.holes.length) {
          v8Toast('최소 1홀 이상 입력해주세요', 'warn');
          return;
        }
        rounds.push({
          courseName: currentRound.courseName || '미지정',
          date: currentRound.date || new Date().toISOString().slice(0, 10),
          holes: currentRound.holes
        });
        saveShotData(rounds);
        v8Storage('shot_current', null);
        currentRound = { holes: [], courseName: '', date: '' };
        v8Toast('라운드 완료! 통계에 반영되었습니다.', 'success');
        renderShotTracking();
      });

    } else if (tabName === 'stats') {
      var st = calculateShotStats(rounds);
      container.innerHTML = '<div class="v8-section"><h3>&#128202; 종합 통계</h3>' +
        '<div class="v8-shot-summary">' +
        '<div class="sbox"><div class="sv">' + st.fir + '%</div><div class="sl">FIR%</div>' +
        '<div class="v8-shot-bar"><div class="v8-shot-bar-fill" style="width:' + st.fir + '%;background:linear-gradient(90deg,#4caf50,#81c784)"></div></div></div>' +
        '<div class="sbox"><div class="sv">' + st.gir + '%</div><div class="sl">GIR%</div>' +
        '<div class="v8-shot-bar"><div class="v8-shot-bar-fill" style="width:' + st.gir + '%;background:linear-gradient(90deg,#1565c0,#42a5f5)"></div></div></div>' +
        '<div class="sbox"><div class="sv">' + st.avgPutts + '</div><div class="sl">평균 퍼팅</div></div>' +
        '<div class="sbox"><div class="sv">' + st.avgScore + '</div><div class="sl">평균 스코어</div></div>' +
        '</div>' +
        '<p style="font-size:12px;color:var(--text-muted);margin-top:12px;text-align:center">총 ' + st.totalRounds + '라운드 기록</p></div>' +
        '<div class="v8-section"><h3>&#127919; 클럽별 평균 거리</h3>' +
        renderClubDistances(rounds) + '</div>';

    } else if (tabName === 'history') {
      container.innerHTML = '<div class="v8-section"><h3>&#128197; 라운드 기록</h3>' +
        (rounds.length === 0 ? '<p style="font-size:13px;color:var(--text-muted);text-align:center">아직 기록된 라운드가 없습니다</p>' :
        rounds.slice().reverse().map(function(r, i){
          var totalScore = r.holes.reduce(function(a,h){ return a + (h.score||0); }, 0);
          return '<div class="v8-diff-item"><span class="cname">' + (r.courseName || '미지정') + ' (' + r.date + ')</span><span class="cslope">' + totalScore + '타 / ' + r.holes.length + 'H</span></div>';
        }).join('')) + '</div>' +
        (rounds.length > 0 ? '<button class="v8-btn v8-btn-secondary" id="v8ClearShots" style="width:100%">&#128465; 전체 기록 삭제</button>' : '');

      var clearBtn = document.getElementById('v8ClearShots');
      if (clearBtn) clearBtn.addEventListener('click', function(){
        if (confirm('모든 샷 기록을 삭제하시겠습니까?')) {
          saveShotData([]);
          v8Toast('기록 삭제 완료', 'info');
          renderShotTracking();
        }
      });
    }
  }
}

function renderClubDistances(rounds) {
  var clubDist = {};
  rounds.forEach(function(r){
    (r.holes || []).forEach(function(h){
      if (h.club && h.distance > 0) {
        if (!clubDist[h.club]) clubDist[h.club] = [];
        clubDist[h.club].push(h.distance);
      }
    });
  });
  var html = '';
  CLUBS.forEach(function(club){
    if (clubDist[club] && clubDist[club].length > 0) {
      var avg = Math.round(clubDist[club].reduce(function(a,b){return a+b;},0) / clubDist[club].length);
      var max = Math.max.apply(null, clubDist[club]);
      var pct = Math.min(100, Math.round(avg / 300 * 100));
      html += '<div style="margin-bottom:8px"><div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:3px"><span style="font-weight:600">' + club + '</span><span style="color:var(--text-muted)">평균 ' + avg + 'm / 최대 ' + max + 'm</span></div>' +
        '<div class="v8-shot-bar"><div class="v8-shot-bar-fill" style="width:' + pct + '%;background:linear-gradient(90deg,#ff6b35,#ffab91)"></div></div></div>';
    }
  });
  return html || '<p style="font-size:12px;color:var(--text-muted);text-align:center">데이터가 없습니다</p>';
}

// ====================================================================
// 3. SOCIAL LEADERBOARD & ACHIEVEMENTS
// ====================================================================
var lbOverlay = v8CreateOverlay('v8LbOverlay');
var lbModal = document.createElement('div');
lbModal.className = 'v8-modal';
lbOverlay.appendChild(lbModal);

var ACHIEVEMENTS = [
  { id: 'first_round', icon: '&#127941;', name: '첫 라운드', desc: '첫 번째 라운드를 기록하세요', check: function(r){ return r.length >= 1; } },
  { id: 'five_rounds', icon: '&#127942;', name: '5라운드 달성', desc: '5회 라운드를 완료하세요', check: function(r){ return r.length >= 5; } },
  { id: 'ten_rounds', icon: '&#127895;', name: '10라운드 마스터', desc: '10회 라운드를 완료하세요', check: function(r){ return r.length >= 10; } },
  { id: 'break_100', icon: '&#128175;', name: '100타 깨기', desc: '18홀 100타 이하를 기록하세요', check: function(r){ return r.some(function(x){ var s = x.holes.reduce(function(a,h){return a+(h.score||0);},0); return x.holes.length >= 18 && s < 100; }); } },
  { id: 'break_90', icon: '&#11088;', name: '90타 깨기', desc: '18홀 90타 이하를 기록하세요', check: function(r){ return r.some(function(x){ var s = x.holes.reduce(function(a,h){return a+(h.score||0);},0); return x.holes.length >= 18 && s < 90; }); } },
  { id: 'break_80', icon: '&#128081;', name: '80타 깨기', desc: '18홀 80타 이하를 기록하세요', check: function(r){ return r.some(function(x){ var s = x.holes.reduce(function(a,h){return a+(h.score||0);},0); return x.holes.length >= 18 && s < 80; }); } },
  { id: 'low_putts', icon: '&#9971;', name: '퍼팅 마스터', desc: '평균 퍼팅 1.8 이하', check: function(r){ if(!r.length) return false; var th=0,tp=0; r.forEach(function(x){x.holes.forEach(function(h){th++;tp+=(h.putts||0);});}); return th>0 && (tp/th)<=1.8; } },
  { id: 'consistent', icon: '&#128170;', name: '일관성의 왕', desc: '최근 3라운드 스코어 차이 5타 이내', check: function(r){ if(r.length<3) return false; var last3=r.slice(-3).map(function(x){return x.holes.reduce(function(a,h){return a+(h.score||0);},0);}); return (Math.max.apply(null,last3)-Math.min.apply(null,last3))<=5; } }
];

function calculateHandicap(rounds) {
  // Simple handicap: (avg of best 3 from last 5 rounds - 72) * 0.96
  if (!rounds.length) return 36.0;
  var recent = rounds.slice(-5);
  var scores = recent.map(function(r){
    var total = r.holes.reduce(function(a,h){ return a + (h.score || 0); }, 0);
    // Normalize to 18 holes
    if (r.holes.length < 18) total = Math.round(total * (18 / r.holes.length));
    return total;
  }).sort(function(a,b){ return a - b; });
  var best3 = scores.slice(0, 3);
  var avg = best3.reduce(function(a,b){return a+b;},0) / best3.length;
  var hcp = (avg - 72) * 0.96;
  return Math.max(0, Math.min(54, hcp));
}

function renderLeaderboard() {
  var rounds = getShotData();
  var hcp = calculateHandicap(rounds);
  var unlocked = [];
  ACHIEVEMENTS.forEach(function(ach){
    if (ach.check(rounds)) unlocked.push(ach.id);
  });
  v8Storage('achievements', unlocked);

  // Generate leaderboard entries from rounds
  var monthlyScores = {};
  rounds.forEach(function(r){
    var month = (r.date || '').slice(0, 7);
    if (!monthlyScores[month]) monthlyScores[month] = [];
    var total = r.holes.reduce(function(a,h){ return a + (h.score||0); }, 0);
    if (r.holes.length < 18) total = Math.round(total * (18 / r.holes.length));
    monthlyScores[month].push({ score: total, course: r.courseName, date: r.date });
  });

  lbModal.innerHTML = '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px">' +
    '<h2 style="margin:0"><span class="v8-icon" style="background:linear-gradient(135deg,#ffd700,#ff8f00)">&#127942;</span> 리더보드</h2>' +
    '<button class="v8-close" onclick="document.getElementById(\'v8LbOverlay\').classList.remove(\'active\')">&times;</button></div>' +
    '<div class="v8-lb-card"><div class="rank">HCP ' + hcp.toFixed(1) + '</div><div class="hcp">나의 핸디캡 (최근 5라운드 기반)</div></div>' +
    '<div class="v8-tabs">' +
    '<div class="v8-tab active" data-lb="all">전체</div>' +
    '<div class="v8-tab" data-lb="month">월간</div>' +
    '<div class="v8-tab" data-lb="achieve">업적</div></div>' +
    '<div id="v8LbContent"></div>';

  var lbTabs = lbModal.querySelectorAll('.v8-tab');
  lbTabs.forEach(function(tab){
    tab.addEventListener('click', function(){
      lbTabs.forEach(function(t){t.classList.remove('active');});
      tab.classList.add('active');
      renderLbTab(tab.dataset.lb);
    });
  });
  renderLbTab('all');

  function renderLbTab(tabName) {
    var content = document.getElementById('v8LbContent');
    if (tabName === 'all') {
      var allScores = rounds.map(function(r){
        var total = r.holes.reduce(function(a,h){return a+(h.score||0);},0);
        if (r.holes.length < 18) total = Math.round(total * (18 / r.holes.length));
        return { score: total, course: r.courseName, date: r.date };
      }).sort(function(a,b){ return a.score - b.score; });

      content.innerHTML = '<div class="v8-section"><h3>&#127919; 베스트 스코어 랭킹</h3>' +
        (allScores.length === 0 ? '<p style="font-size:13px;color:var(--text-muted);text-align:center">라운드 기록이 없습니다</p>' :
        allScores.slice(0, 10).map(function(s, i){
          var posCls = i === 0 ? 'gold' : i === 1 ? 'silver' : i === 2 ? 'bronze' : '';
          return '<div class="v8-lb-row"><div class="lb-pos ' + posCls + '">' + (i+1) + '</div>' +
            '<div class="lb-info"><div class="lb-name">' + (s.course || '미지정') + '</div><div class="lb-sub">' + (s.date || '') + '</div></div>' +
            '<div class="lb-score">' + s.score + '</div></div>';
        }).join('')) + '</div>';

    } else if (tabName === 'month') {
      var months = Object.keys(monthlyScores).sort().reverse();
      content.innerHTML = '<div class="v8-section"><h3>&#128197; 월별 최고 기록</h3>' +
        (months.length === 0 ? '<p style="font-size:13px;color:var(--text-muted);text-align:center">데이터 없음</p>' :
        months.slice(0, 6).map(function(m){
          var best = monthlyScores[m].sort(function(a,b){return a.score-b.score;})[0];
          var avg = Math.round(monthlyScores[m].reduce(function(a,b){return a+b.score;},0)/monthlyScores[m].length);
          return '<div class="v8-lb-row"><div class="lb-info"><div class="lb-name">' + m + ' (' + monthlyScores[m].length + '회)</div><div class="lb-sub">평균 ' + avg + '타</div></div><div class="lb-score">베스트 ' + best.score + '</div></div>';
        }).join('')) + '</div>';

    } else if (tabName === 'achieve') {
      content.innerHTML = '<div class="v8-section"><h3>&#127775; 업적 (' + unlocked.length + '/' + ACHIEVEMENTS.length + ')</h3>' +
        ACHIEVEMENTS.map(function(ach){
          var isUnlocked = unlocked.indexOf(ach.id) >= 0;
          return '<div class="v8-achievement' + (isUnlocked ? '' : ' locked') + '">' +
            '<div class="ach-icon">' + ach.icon + '</div>' +
            '<div class="ach-info"><div class="ach-name">' + ach.name + '</div><div class="ach-desc">' + ach.desc + '</div>' +
            (isUnlocked ? '<div class="ach-date">&#10004; 달성!</div>' : '') + '</div></div>';
        }).join('') + '</div>';
    }
  }
}

// ====================================================================
// 4. COURSE STRATEGY GUIDE
// ====================================================================
var stratOverlay = v8CreateOverlay('v8StratOverlay');
var stratModal = document.createElement('div');
stratModal.className = 'v8-modal';
stratOverlay.appendChild(stratModal);

function getSeasonName() {
  var m = new Date().getMonth();
  if (m >= 2 && m <= 4) return 'spring';
  if (m >= 5 && m <= 7) return 'summer';
  if (m >= 8 && m <= 10) return 'fall';
  return 'winter';
}

function getSeasonTips(season) {
  var tips = {
    spring: ['아침 이슬이 많으므로 우레탄 소재 장갑 권장','바람이 강한 날이 많아 낮은 탄도 샷 위주로','그린 스피드가 느린 편이라 퍼팅 강도 조절','자외선 차단 필수 (선크림 + 모자)'],
    summer: ['열사병 예방: 충분한 수분 섭취 (18홀 기준 2L 이상)','러프가 깊어 페어웨이 키핑이 중요','습도 높아 그립력 저하 → 글러브 사용 권장','오후 뇌우 대비 우의 준비'],
    fall: ['낙엽으로 볼 찾기 어려움 → 칼러볼 사용 권장','건조한 날씨로 비거리 증가 → 클럽 선택 조정','그린 스피드 빨라짐 → 럠딩 지점 앞쪽으로','기온차 큰 날 레이어드 필수'],
    winter: ['근육 경직 예방: 충분한 워밍업 필수 (15분+)','동계용 볼이 더 날아감 → 한 클럽 위로 선택','그린 딱딱해 치핑 존 확대','방한 대책: 핸드워머 + 방풍 조끼 착용']
  };
  return tips[season] || tips.spring;
}

function getStrategyForCourse(course) {
  if (!course) return [];
  var tips = [];
  var diff = calculateDifficulty(course);
  var cat = getDifficultyCategory(diff);

  // Type-based tips
  if (course.t === '회원제') {
    tips.push('회원제 코스로 코스 관리 상태가 우수합니다. 그린 스피드가 빠를 수 있으니 주의하세요.');
    tips.push('캐디 정보를 최대한 활용하세요. 로컬 룰이 있을 수 있습니다.');
  } else {
    tips.push('대중제 코스로 자유로운 플레이가 가능합니다.');
    tips.push('카트 이용 시 GPS 거리 표시를 참고하세요.');
  }

  // Hole count strategy
  if (course.h >= 27) {
    tips.push(course.h + '홀 코스: 체력 안배가 중요합니다. 중반 이후 집중력 유지에 신경 쓰세요.');
  }

  // Grass type
  if (course.g === '양잔디') {
    tips.push('양잔디 코스: 러프가 질길 수 있어 웨지를 높이 들어올리세요.');
  } else if (course.g === '조선') {
    tips.push('조선디 코스: 그린 주변이 깔끔하여 치핑에 유리합니다.');
  }

  // Difficulty-based club recommendation
  if (diff >= 75) {
    tips.push('챔피언십 난이도: 드라이버보다 3번우드/하이브리드로 티샷 추천');
  } else if (diff >= 55) {
    tips.push('상급 난이도: 코스 매니지먼트가 중요. 안전한 위치를 노리세요.');
  } else if (diff >= 30) {
    tips.push('중급 난이도: 공격적 플레이와 안전 플레이를 번갈아 시도해보세요.');
  } else {
    tips.push('초급자 친화적 코스: 편하게 스윗 연습하세요.');
  }

  return tips;
}

function getChecklist(diff) {
  var base = [
    '골프화 및 장갑 준비',
    '볼 충분히 준비 (18홀 기준 6개+)',
    'GPS/거리측정기 충전',
    '스코어카드 & 연필',
    '수분/식음 준비'
  ];
  if (diff >= 55) {
    base.push('코스 레이아웃 사전 확인');
    base.push('연습 라운드 계획 수립');
  }
  if (diff >= 75) {
    base.push('전날 충분한 수면 (7시간+)');
    base.push('맨탈 루틴 준비 (호흡 & 시각화)');
  }
  return base;
}

function renderStrategyGuide(course) {
  var season = getSeasonName();
  var seasonNames = { spring: '봄', summer: '여름', fall: '가을', winter: '겨울' };
  var seasonTips = getSeasonTips(season);
  var courseTips = course ? getStrategyForCourse(course) : [];
  var diff = course ? calculateDifficulty(course) : 50;
  var checklist = getChecklist(diff);
  var checkState = v8Storage('checklist') || {};

  stratModal.innerHTML = '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px">' +
    '<h2 style="margin:0"><span class="v8-icon" style="background:linear-gradient(135deg,#6a1b9a,#ce93d8)">&#128218;</span> 코스 공략법</h2>' +
    '<button class="v8-close" onclick="document.getElementById(\'v8StratOverlay\').classList.remove(\'active\')">&times;</button></div>' +
    (course ? '<div class="v8-section"><h3>&#127947; ' + course.n + ' 공략</h3>' +
    courseTips.map(function(tip){ return '<div class="v8-strat-card"><p>&#8226; ' + tip + '</p></div>'; }).join('') + '</div>' :
    '<div class="v8-section"><h3>&#127947; 일반 코스 공략법</h3>' +
    '<div class="v8-strat-card"><h4>&#9968; 대중제 코스</h4><ul>' +
    '<li>GPS 거리 시스템 적극 활용</li><li>카트 이동 시간 절약을 위한 동선 계획</li><li>여유로운 플레이 페이스 유지</li></ul></div>' +
    '<div class="v8-strat-card"><h4>&#127968; 회원제 코스</h4><ul>' +
    '<li>캐디 조언 적극 활용</li><li>그린 스피드 사전 확인</li><li>로컬 룰 준수 (드레스코드 등)</li></ul></div></div>') +
    '<div class="v8-section"><h3>&#127808; ' + seasonNames[season] + ' 시즌 팁</h3>' +
    '<div class="v8-strat-card"><ul>' + seasonTips.map(function(t){ return '<li>' + t + '</li>'; }).join('') + '</ul></div></div>' +
    '<div class="v8-section"><h3>&#9989; 라운드 준비 체크리스트</h3>' +
    '<ul class="v8-checklist" id="v8Checklist">' +
    checklist.map(function(item, i){
      var checked = checkState['c' + i] ? ' checked' : '';
      return '<li class="' + checked + '" data-idx="' + i + '"><span class="chk">' + (checkState['c'+i] ? '&#10004;' : '') + '</span><span>' + item + '</span></li>';
    }).join('') + '</ul></div>';

  var clItems = stratModal.querySelectorAll('#v8Checklist li');
  clItems.forEach(function(li){
    li.addEventListener('click', function(){
      var idx = li.dataset.idx;
      checkState['c' + idx] = !checkState['c' + idx];
      v8Storage('checklist', checkState);
      li.classList.toggle('checked');
      var chk = li.querySelector('.chk');
      chk.innerHTML = checkState['c' + idx] ? '&#10004;' : '';
    });
  });
}

// ====================================================================
// 5. PRICE TREND ANALYSIS
// ====================================================================
var priceOverlay = v8CreateOverlay('v8PriceOverlay');
var priceModal = document.createElement('div');
priceModal.className = 'v8-modal';
priceOverlay.appendChild(priceModal);

function calculateValueIndex(course) {
  // Value = rating / (price / 10000) * holes_factor
  if (!course.weekday || course.weekday <= 0 || !course.rt) return 0;
  var holeFactor = (course.h || 18) / 18;
  return ((course.rt * holeFactor) / (course.weekday / 10000)) * 100;
}

function renderPriceTrend() {
  var courses = v8GetCourses();
  var withPrice = courses.filter(function(c){ return c.weekday && c.weekday > 0; });
  if (!withPrice.length) {
    priceModal.innerHTML = '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px">' +
      '<h2 style="margin:0"><span class="v8-icon" style="background:linear-gradient(135deg,#1565c0,#42a5f5)">&#128176;</span> 그린피 분석</h2>' +
      '<button class="v8-close" onclick="document.getElementById(\'v8PriceOverlay\').classList.remove(\'active\')">&times;</button></div>' +
      '<p style="text-align:center;color:var(--text-muted)">가격 데이터가 없습니다</p>';
    return;
  }

  // Stats
  var prices = withPrice.map(function(c){ return c.weekday; });
  var avgPrice = Math.round(prices.reduce(function(a,b){return a+b;},0) / prices.length);
  var minPrice = Math.min.apply(null, prices);
  var maxPrice = Math.max.apply(null, prices);

  // Region averages
  var regionMap = {};
  withPrice.forEach(function(c){
    if (!regionMap[c.r]) regionMap[c.r] = [];
    regionMap[c.r].push(c.weekday);
  });
  var regionAvgs = Object.keys(regionMap).map(function(r){
    var avg = Math.round(regionMap[r].reduce(function(a,b){return a+b;},0) / regionMap[r].length);
    return { region: r, avg: avg, count: regionMap[r].length };
  }).sort(function(a,b){ return a.avg - b.avg; });

  // Value index ranking
  var valueRanking = withPrice.map(function(c){
    return { course: c, value: calculateValueIndex(c) };
  }).filter(function(x){ return x.value > 0; }).sort(function(a,b){ return b.value - a.value; }).slice(0, 10);

  // Budget calculator state
  var budgetFreq = v8Storage('budget_freq') || 4;

  priceModal.innerHTML = '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px">' +
    '<h2 style="margin:0"><span class="v8-icon" style="background:linear-gradient(135deg,#1565c0,#42a5f5)">&#128176;</span> 그린피 트렌드</h2>' +
    '<button class="v8-close" onclick="document.getElementById(\'v8PriceOverlay\').classList.remove(\'active\')">&times;</button></div>' +
    '<div class="v8-section"><h3>&#128202; 가격 분포</h3>' +
    '<div class="v8-price-chart"><canvas id="v8PriceCanvas"></canvas></div>' +
    '<div class="v8-price-grid">' +
    '<div class="v8-price-box"><div class="pv">' + Math.round(avgPrice/10000) + '만</div><div class="pl">평균 그린피</div></div>' +
    '<div class="v8-price-box"><div class="pv">' + Math.round(minPrice/10000) + '~' + Math.round(maxPrice/10000) + '만</div><div class="pl">가격 범위</div></div>' +
    '<div class="v8-price-box"><div class="pv">' + withPrice.length + '</div><div class="pl">가격 데이터 수</div></div>' +
    '<div class="v8-price-box"><div class="pv">' + regionAvgs.length + '</div><div class="pl">지역 수</div></div>' +
    '</div></div>' +
    '<div class="v8-section"><h3>&#127463; 지역별 평균 그린피</h3>' +
    regionAvgs.map(function(ra){
      var pct = Math.round((ra.avg / maxPrice) * 100);
      return '<div class="v8-price-rank"><div class="pr-idx">' + Math.round(ra.avg/10000) + '만</div><div class="pr-name">' + ra.region + ' (' + ra.count + '개)</div>' +
        '<div style="width:60px"><div class="v8-shot-bar"><div class="v8-shot-bar-fill" style="width:' + pct + '%;background:linear-gradient(90deg,#1565c0,#42a5f5)"></div></div></div></div>';
    }).join('') + '</div>' +
    '<div class="v8-section"><h3>&#11088; 가성비 TOP 10</h3>' +
    valueRanking.map(function(item, i){
      var c = item.course;
      return '<div class="v8-price-rank"><div class="pr-idx">#' + (i+1) + '</div><div class="pr-name">' + c.n + '</div><div class="pr-val">' + Math.round(c.weekday/10000) + '만 / &#11088;' + (c.rt||0).toFixed(1) + '</div></div>';
    }).join('') + '</div>' +
    '<div class="v8-section"><h3>&#128178; 예산 계산기</h3>' +
    '<div class="v8-budget-calc"><label style="font-size:12px;font-weight:600">월 라운드 횟수: <span id="v8BudgetFreqVal">' + budgetFreq + '</span>회</label>' +
    '<input type="range" id="v8BudgetRange" min="1" max="12" value="' + budgetFreq + '">' +
    '<div class="v8-budget-result" id="v8BudgetResult">월 예상 그린피: ' + Math.round(avgPrice * budgetFreq / 10000) + '만원</div>' +
    '<p style="font-size:11px;color:var(--text-muted);text-align:center;margin-top:6px">(평균 그린피 ' + Math.round(avgPrice/10000) + '만원 기준)</p></div></div>';

  // Draw price distribution chart
  setTimeout(function(){
    drawPriceChart(withPrice);
  }, 100);

  // Budget range interaction
  var rangeEl = document.getElementById('v8BudgetRange');
  if (rangeEl) {
    rangeEl.addEventListener('input', function(){
      var val = parseInt(rangeEl.value);
      v8Storage('budget_freq', val);
      var freqVal = document.getElementById('v8BudgetFreqVal');
      var result = document.getElementById('v8BudgetResult');
      if (freqVal) freqVal.textContent = val;
      if (result) result.textContent = '월 예상 그린피: ' + Math.round(avgPrice * val / 10000) + '만원';
    });
  }
}

function drawPriceChart(courses) {
  var canvas = document.getElementById('v8PriceCanvas');
  if (!canvas) return;
  var ctx = canvas.getContext('2d');
  var rect = canvas.parentElement.getBoundingClientRect();
  canvas.width = rect.width * 2;
  canvas.height = rect.height * 2;
  ctx.scale(2, 2);
  var w = rect.width;
  var h = rect.height;

  // Create price buckets (5만 intervals)
  var buckets = {};
  var maxBucket = 0;
  courses.forEach(function(c){
    var bucket = Math.floor(c.weekday / 50000) * 5;
    buckets[bucket] = (buckets[bucket] || 0) + 1;
    if (buckets[bucket] > maxBucket) maxBucket = buckets[bucket];
  });

  var keys = Object.keys(buckets).map(Number).sort(function(a,b){return a-b;});
  var barWidth = Math.max(20, (w - 40) / (keys.length || 1));
  var startX = 20;

  // Background
  ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--bg') || '#f5f5f5';
  ctx.fillRect(0, 0, w, h);

  // Draw bars
  keys.forEach(function(key, i){
    var count = buckets[key];
    var barH = (count / maxBucket) * (h - 50);
    var x = startX + i * barWidth;
    var y = h - 30 - barH;

    var grad = ctx.createLinearGradient(x, y, x, h - 30);
    grad.addColorStop(0, '#42a5f5');
    grad.addColorStop(1, '#1565c0');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.roundRect(x + 2, y, barWidth - 4, barH, 4);
    ctx.fill();

    // Label
    ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--text-muted') || '#999';
    ctx.font = '9px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(key + '만', x + barWidth / 2, h - 16);
    ctx.fillText(count, x + barWidth / 2, y - 4);
  });
}

// ====================================================================
// 6. SWING TEMPO METRONOME
// ====================================================================
var metroOverlay = v8CreateOverlay('v8MetroOverlay');
var metroModal = document.createElement('div');
metroModal.className = 'v8-modal';
metroOverlay.appendChild(metroModal);

var metroState = {
  bpm: 72,
  playing: false,
  intervalId: null,
  audioCtx: null,
  beatCount: 0
};

function createMetroClick(freq, duration) {
  if (!metroState.audioCtx) {
    metroState.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  var ctx = metroState.audioCtx;
  var osc = ctx.createOscillator();
  var gain = ctx.createGain();
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.frequency.value = freq;
  osc.type = 'sine';
  gain.gain.setValueAtTime(0.5, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + duration);
}

function startMetronome() {
  if (metroState.playing) return;
  metroState.playing = true;
  metroState.beatCount = 0;

  // Resume audio context if suspended
  if (metroState.audioCtx && metroState.audioCtx.state === 'suspended') {
    metroState.audioCtx.resume();
  }

  var interval = 60000 / metroState.bpm;
  tick();
  metroState.intervalId = setInterval(tick, interval);

  function tick() {
    metroState.beatCount++;
    // 3:1 ratio - beats 1,2,3 are backswing, beat 4 is downswing
    var isDownswing = (metroState.beatCount % 4 === 0);
    createMetroClick(isDownswing ? 880 : 660, isDownswing ? 0.08 : 0.05);

    // Update visual
    var arm = document.querySelector('.v8-pendulum-arm');
    var beat = document.getElementById('v8MetroBeat');
    if (arm) {
      var angle = (metroState.beatCount % 2 === 0) ? 25 : -25;
      arm.style.transform = 'rotate(' + angle + 'deg)';
    }
    if (beat) {
      beat.classList.add('tick');
      setTimeout(function(){ beat.classList.remove('tick'); }, 100);
    }
  }

  updateMetroUI();
}

function stopMetronome() {
  metroState.playing = false;
  if (metroState.intervalId) {
    clearInterval(metroState.intervalId);
    metroState.intervalId = null;
  }
  var arm = document.querySelector('.v8-pendulum-arm');
  if (arm) arm.style.transform = 'rotate(0deg)';
  updateMetroUI();
}

function setMetroBpm(bpm) {
  metroState.bpm = bpm;
  if (metroState.playing) {
    stopMetronome();
    startMetronome();
  }
  updateMetroUI();
}

function updateMetroUI() {
  var bpmEl = document.getElementById('v8MetroBpmVal');
  var playBtn = document.getElementById('v8MetroPlayBtn');
  if (bpmEl) bpmEl.textContent = metroState.bpm;
  if (playBtn) playBtn.innerHTML = metroState.playing ? '&#9209;' : '&#9654;';

  var presets = document.querySelectorAll('.v8-metro-presets button');
  presets.forEach(function(btn){
    btn.classList.toggle('active', parseInt(btn.dataset.bpm) === metroState.bpm);
  });
}

function renderMetronome() {
  metroModal.innerHTML = '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px">' +
    '<h2 style="margin:0"><span class="v8-icon" style="background:linear-gradient(135deg,#e65100,#ffab91)">&#127926;</span> 스윙 템포</h2>' +
    '<button class="v8-close" id="v8MetroClose">&times;</button></div>' +
    '<div class="v8-metro-wrap">' +
    '<div class="v8-pendulum"><div class="v8-pendulum-arm" style="transform:rotate(0deg)"><div class="v8-pendulum-ball"></div></div></div>' +
    '<div class="v8-metro-bpm" id="v8MetroBpmVal">' + metroState.bpm + '</div>' +
    '<div class="v8-metro-label">BPM</div>' +
    '<div id="v8MetroBeat" class="v8-metro-beat" style="width:16px;height:16px;border-radius:50%;margin:12px auto"></div>' +
    '<div class="v8-metro-presets">' +
    '<button data-bpm="60"' + (metroState.bpm===60?' class="active"':'') + '>느리게 (60)</button>' +
    '<button data-bpm="72"' + (metroState.bpm===72?' class="active"':'') + '>보통 (72)</button>' +
    '<button data-bpm="84"' + (metroState.bpm===84?' class="active"':'') + '>빠르게 (84)</button></div>' +
    '<div class="v8-metro-controls">' +
    '<button class="v8-metro-play" id="v8MetroPlayBtn">' + (metroState.playing ? '&#9209;' : '&#9654;') + '</button></div>' +
    '<div class="v8-metro-ratio"><span style="font-size:11px;color:var(--text-muted)">백스윙 3</span>' +
    '<div class="ratio-bar"><div class="ratio-back"></div><div class="ratio-down"></div></div>' +
    '<span style="font-size:11px;color:var(--text-muted)">다운 1</span></div>' +
    '<p style="font-size:11px;color:var(--text-muted);margin-top:12px">Spacebar로 시작/정지</p></div>';

  // Close
  var closeBtn = document.getElementById('v8MetroClose');
  if (closeBtn) closeBtn.addEventListener('click', function(){
    stopMetronome();
    v8CloseOverlay(metroOverlay);
  });

  // Presets
  metroModal.querySelectorAll('.v8-metro-presets button').forEach(function(btn){
    btn.addEventListener('click', function(){
      setMetroBpm(parseInt(btn.dataset.bpm));
    });
  });

  // Play/Stop
  var playBtn = document.getElementById('v8MetroPlayBtn');
  if (playBtn) playBtn.addEventListener('click', function(){
    if (metroState.playing) stopMetronome();
    else startMetronome();
  });
}

// Spacebar handler for metronome
document.addEventListener('keydown', function(e){
  if (e.code === 'Space' && metroOverlay.classList.contains('active')) {
    e.preventDefault();
    if (metroState.playing) stopMetronome();
    else startMetronome();
  }
});

// ====================================================================
// 7. COURSE VISUAL THEMES
// ====================================================================
var themeOverlay = v8CreateOverlay('v8ThemeOverlay');
var themeModal = document.createElement('div');
themeModal.className = 'v8-modal';
themeOverlay.appendChild(themeModal);

var LANDSCAPE_TYPES = [
  { id: 'mountain', name: '산악', gradient: 'linear-gradient(180deg,#87ceeb 0%,#98d4a0 40%,#2e7d32 60%,#1b5e20 100%)', svg: '<svg viewBox="0 0 200 60" xmlns="http://www.w3.org/2000/svg"><polygon points="30,60 70,15 110,60" fill="#2e7d32"/><polygon points="80,60 130,10 180,60" fill="#1b5e20"/><polygon points="0,60 40,30 80,60" fill="#388e3c"/></svg>' },
  { id: 'links', name: '링크스', gradient: 'linear-gradient(180deg,#b3e5fc 0%,#81d4fa 30%,#aed581 50%,#8bc34a 100%)', svg: '<svg viewBox="0 0 200 60" xmlns="http://www.w3.org/2000/svg"><ellipse cx="100" cy="50" rx="90" ry="15" fill="#7cb342"/><path d="M20,45 Q60,35 100,45 T180,42" fill="none" stroke="#558b2f" stroke-width="1.5"/></svg>' },
  { id: 'flat', name: '평지', gradient: 'linear-gradient(180deg,#e3f2fd 0%,#bbdefb 30%,#c8e6c9 50%,#a5d6a7 100%)', svg: '<svg viewBox="0 0 200 60" xmlns="http://www.w3.org/2000/svg"><rect x="0" y="35" width="200" height="25" fill="#66bb6a"/><circle cx="50" cy="45" r="6" fill="#fff" stroke="#bbb" stroke-width="0.5"/><line x1="50" y1="30" x2="50" y2="39" stroke="#333" stroke-width="1"/><path d="M48,30 L50,26 L52,30" fill="#f44336"/></svg>' },
  { id: 'coastal', name: '해안', gradient: 'linear-gradient(180deg,#ffcc80 0%,#ffab40 20%,#4fc3f7 40%,#0288d1 100%)', svg: '<svg viewBox="0 0 200 60" xmlns="http://www.w3.org/2000/svg"><rect x="0" y="40" width="200" height="20" fill="#0288d1"/><path d="M0,40 Q25,35 50,40 T100,38 T150,40 T200,38" fill="#4fc3f7"/><rect x="0" y="30" width="200" height="12" fill="#fff9c4"/></svg>' }
];

function getTimeOfDay() {
  var h = new Date().getHours();
  if (h >= 5 && h < 7) return 'dawn';
  if (h >= 7 && h < 17) return 'day';
  if (h >= 17 && h < 20) return 'sunset';
  return 'night';
}

function getTimeGradient(tod) {
  var gradients = {
    dawn: 'linear-gradient(180deg,#1a237e 0%,#ff8a65 50%,#ffcc02 100%)',
    day: 'linear-gradient(180deg,#2196f3 0%,#64b5f6 50%,#bbdefb 100%)',
    sunset: 'linear-gradient(180deg,#1a237e 0%,#e65100 40%,#ff6f00 70%,#ffab00 100%)',
    night: 'linear-gradient(180deg,#0d0d2b 0%,#1a1a4e 50%,#2a2a6e 100%)'
  };
  return gradients[tod] || gradients.day;
}

function getSeasonalHeaderColor() {
  var season = getSeasonName();
  var colors = {
    spring: '#e8f5e9',
    summer: '#e3f2fd',
    fall: '#fff3e0',
    winter: '#eceff1'
  };
  return colors[season] || colors.spring;
}

function renderVisualThemes() {
  var tod = getTimeOfDay();
  var todNames = { dawn: '새벽', day: '낮', sunset: '석양', night: '밤' };
  var selectedTheme = v8Storage('visual_theme') || 'mountain';

  themeModal.innerHTML = '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px">' +
    '<h2 style="margin:0"><span class="v8-icon" style="background:linear-gradient(135deg,#4caf50,#81c784)">&#127796;</span> 코스 테마</h2>' +
    '<button class="v8-close" onclick="document.getElementById(\'v8ThemeOverlay\').classList.remove(\'active\')">&times;</button></div>' +
    '<div class="v8-section"><h3>&#127749; 현재 시간대: ' + todNames[tod] + '</h3>' +
    '<div class="v8-header-anim" style="background:' + getTimeGradient(tod) + '">' +
    (tod === 'day' ? '<div class="sun-moon" style="background:#ffeb3b;top:10px;right:30px;box-shadow:0 0 20px #ffeb3b"></div>' : '') +
    (tod === 'night' ? '<div class="sun-moon" style="background:#eceff1;top:10px;right:30px;box-shadow:0 0 10px #eceff1"></div>' : '') +
    (tod === 'dawn' || tod === 'sunset' ? '<div class="sun-moon" style="background:#ff8a65;top:25px;right:40px;box-shadow:0 0 15px #ff6f00"></div>' : '') +
    '<div class="cloud" style="width:40px;top:15px;left:20px;opacity:0.7"></div>' +
    '<div class="cloud" style="width:30px;top:20px;left:80px;opacity:0.5"></div></div>' +
    '<p style="font-size:11px;color:var(--text-muted)">계절 색상: ' + getSeasonalHeaderColor() + '</p></div>' +
    '<div class="v8-section"><h3>&#9968; 랜드스케이프 타입</h3>' +
    '<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">' +
    LANDSCAPE_TYPES.map(function(lt){
      return '<div class="v8-theme-card' + (selectedTheme === lt.id ? ' selected' : '') + '" data-theme-id="' + lt.id + '">' +
        '<div class="v8-theme-preview" style="background:' + lt.gradient + '">' + lt.svg + '</div>' +
        '<div class="v8-theme-label">' + lt.name + '</div></div>';
    }).join('') + '</div></div>' +
    '<div class="v8-section"><h3>&#127912; 선택된 테마 미리보기</h3>' +
    '<div id="v8ThemePreviewLarge" style="width:100%;height:120px;border-radius:12px;overflow:hidden;background:' + (LANDSCAPE_TYPES.find(function(x){return x.id===selectedTheme;})||LANDSCAPE_TYPES[0]).gradient + '">' +
    (LANDSCAPE_TYPES.find(function(x){return x.id===selectedTheme;})||LANDSCAPE_TYPES[0]).svg + '</div></div>';

  // Theme selection
  themeModal.querySelectorAll('.v8-theme-card').forEach(function(card){
    card.addEventListener('click', function(){
      themeModal.querySelectorAll('.v8-theme-card').forEach(function(c){c.classList.remove('selected');});
      card.classList.add('selected');
      var id = card.dataset.themeId;
      v8Storage('visual_theme', id);
      var lt = LANDSCAPE_TYPES.find(function(x){return x.id===id;});
      var preview = document.getElementById('v8ThemePreviewLarge');
      if (preview && lt) {
        preview.style.background = lt.gradient;
        preview.innerHTML = lt.svg;
      }
      v8Toast('테마 적용: ' + (lt ? lt.name : ''), 'success');
    });
  });
}

// ====================================================================
// 8. QUICK ACTIONS PANEL RENEWAL
// ====================================================================
function injectQuickActions() {
  var container = document.querySelector('.v7-quick');
  if (!container) {
    // Retry after DOM loads
    setTimeout(injectQuickActions, 1000);
    return;
  }

  var buttons = [
    { icon: '&#9968;', label: '난이도', tip: '코스 난이도 분석기', action: function(){ renderDifficultyAnalyzer(null); v8OpenOverlay(diffOverlay); } },
    { icon: '&#127948;', label: '샷트래킹', tip: '홀별 샷 기록', action: function(){ renderShotTracking(); v8OpenOverlay(shotOverlay); } },
    { icon: '&#127942;', label: '리더보드', tip: '순위 & 업적', action: function(){ renderLeaderboard(); v8OpenOverlay(lbOverlay); } },
    { icon: '&#128218;', label: '공략법', tip: '코스 전략 가이드', action: function(){ renderStrategyGuide(null); v8OpenOverlay(stratOverlay); } },
    { icon: '&#128176;', label: '그린피', tip: '가격 트렌드 분석', action: function(){ renderPriceTrend(); v8OpenOverlay(priceOverlay); } },
    { icon: '&#127926;', label: '템포', tip: '스윙 메트로놈', action: function(){ renderMetronome(); v8OpenOverlay(metroOverlay); } },
    { icon: '&#127796;', label: '테마', tip: '코스 비주얼 테마', action: function(){ renderVisualThemes(); v8OpenOverlay(themeOverlay); } }
  ];

  buttons.forEach(function(btn){
    var el = document.createElement('div');
    el.className = 'v8-quick-btn';
    el.innerHTML = '<span class="qicon">' + btn.icon + '</span>' + btn.label +
      '<div class="v8-quick-tooltip">' + btn.tip + '</div>';
    el.addEventListener('click', btn.action);

    // Long-press tooltip for mobile
    var pressTimer = null;
    el.addEventListener('touchstart', function(e){
      pressTimer = setTimeout(function(){
        el.classList.add('show-tip');
        setTimeout(function(){ el.classList.remove('show-tip'); }, 2000);
      }, 500);
    });
    el.addEventListener('touchend', function(){
      if (pressTimer) clearTimeout(pressTimer);
    });
    el.addEventListener('touchmove', function(){
      if (pressTimer) clearTimeout(pressTimer);
    });

    container.appendChild(el);
  });
}

// ====================================================================
// INITIALIZATION
// ====================================================================
function v8Init() {
  injectQuickActions();

  // Expose functions for external use (e.g., from course detail view)
  window.v8AnalyzeDifficulty = function(course) {
    renderDifficultyAnalyzer(course);
    v8OpenOverlay(diffOverlay);
  };
  window.v8ShowStrategy = function(course) {
    renderStrategyGuide(course);
    v8OpenOverlay(stratOverlay);
  };
}

// Wait for DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', v8Init);
} else {
  // Small delay to ensure v7 has loaded
  setTimeout(v8Init, 300);
}

})();
