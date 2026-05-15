(function(){
'use strict';

// === SmartGolf v7.0 Patch ===
// 1. 스마트 AI 추천 엔진 (개인화 추천)
// 2. 상세 통계 대시보드 (월별 추이/성장곡선/코스별 분석)
// 3. 골프 룰 퀵가이드 (25+ 핵심 규칙)
// 4. 라운드 공유 카드 (Canvas 이미지 생성)
// 5. 골프 피트니스 워밍업 (8단계 스트레칭 타이머)
// 6. 코스 실시간 날씨 (상세 기상정보)
// 7. 즐겨찾기 폴더 (코스 분류 시스템)
// 8. 용어사전 확장 (57→80+ 용어)
// 9. 다크모드 영속 + null 가격 표시 수정
// 10. 성능 최적화 (API 디바운스/GPS 타임아웃)

// --- CSS Injection ---
var css7 = document.createElement('style');
css7.textContent = `
/* === v7 Global === */
.v7-overlay{position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,.65);z-index:10003;display:none;align-items:center;justify-content:center;backdrop-filter:blur(5px)}
.v7-overlay.active{display:flex}
.v7-modal{background:var(--card-bg,#fff);border-radius:20px;padding:24px;width:94%;max-width:560px;max-height:88vh;overflow-y:auto;box-shadow:0 24px 80px rgba(0,0,0,.35);animation:v7SlideUp .4s cubic-bezier(.23,1,.32,1)}
@keyframes v7SlideUp{from{opacity:0;transform:translateY(40px)}to{opacity:1;transform:translateY(0)}}
.v7-modal h2{font-size:20px;margin:0 0 16px;display:flex;align-items:center;gap:8px}
.v7-modal h2 .v7-icon{width:28px;height:28px;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:16px}
.v7-close{background:none;border:none;font-size:22px;cursor:pointer;color:var(--text-muted);padding:4px 8px;border-radius:8px;transition:.2s}
.v7-close:hover{background:var(--border);color:var(--text)}
.v7-section{margin-bottom:20px}
.v7-section h3{font-size:14px;font-weight:700;margin-bottom:10px;color:var(--primary);display:flex;align-items:center;gap:6px}
.v7-badge{display:inline-block;padding:3px 10px;border-radius:12px;font-size:11px;font-weight:600}
.v7-tabs{display:flex;gap:6px;margin-bottom:16px;overflow-x:auto;padding-bottom:4px}
.v7-tab{padding:7px 14px;border-radius:20px;border:1px solid var(--border);background:var(--bg);font-size:12px;cursor:pointer;white-space:nowrap;transition:.2s}
.v7-tab.active{background:var(--primary);color:#fff;border-color:var(--primary)}
.v7-btn{padding:10px 20px;border:none;border-radius:10px;font-size:13px;font-weight:600;cursor:pointer;transition:.2s}
.v7-btn-primary{background:linear-gradient(135deg,var(--primary),var(--primary-dark));color:#fff}
.v7-btn-primary:hover{transform:translateY(-1px);box-shadow:0 4px 12px rgba(26,122,58,.3)}
.v7-btn-secondary{background:var(--bg);color:var(--text);border:1px solid var(--border)}
.v7-btn-accent{background:linear-gradient(135deg,#ff6b35,#ff8f65);color:#fff}
.v7-btn-accent:hover{transform:translateY(-1px);box-shadow:0 4px 12px rgba(255,107,53,.3)}
.v7-grid2{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.v7-grid3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px}
@media(max-width:480px){.v7-grid2,.v7-grid3{grid-template-columns:1fr}}

/* Quick Actions v7 */
.v7-quick{display:flex;gap:8px;flex-wrap:wrap;justify-content:center;margin:12px 0}
.v7-quick-btn{display:flex;flex-direction:column;align-items:center;gap:4px;padding:10px 14px;border-radius:12px;background:var(--card-bg);border:1px solid var(--border);cursor:pointer;transition:.2s;font-size:11px;font-weight:600;color:var(--text);min-width:70px}
.v7-quick-btn:hover{border-color:var(--primary);background:var(--primary-light);transform:translateY(-2px)}
.v7-quick-btn .qicon{font-size:20px;line-height:1}

/* Smart Recommend */
.sr-card{background:linear-gradient(135deg,#f8fffe,#e8f5e9);border:1px solid #c8e6c9;border-radius:14px;padding:16px;margin-bottom:12px;cursor:pointer;transition:.2s}
.sr-card:hover{transform:translateY(-2px);box-shadow:0 6px 20px rgba(26,122,58,.15)}
[data-theme="dark"] .sr-card{background:linear-gradient(135deg,#1a2f20,#1e3a25);border-color:#2e5a35}
.sr-card .sr-rank{font-size:12px;font-weight:800;color:var(--primary);margin-bottom:4px}
.sr-card .sr-name{font-size:16px;font-weight:700;margin-bottom:4px}
.sr-card .sr-meta{font-size:12px;color:var(--text-muted);margin-bottom:8px}
.sr-card .sr-reason{font-size:11px;color:var(--primary);background:var(--primary-light);padding:6px 10px;border-radius:8px;line-height:1.4}
[data-theme="dark"] .sr-card .sr-reason{background:rgba(26,122,58,.2)}
.sr-pref{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:16px}
.sr-pref-chip{padding:6px 12px;border-radius:20px;border:1px solid var(--border);font-size:12px;cursor:pointer;transition:.2s;background:var(--bg)}
.sr-pref-chip.active{background:var(--primary);color:#fff;border-color:var(--primary)}

/* Stats Dashboard v2 */
.sd-stat-row{display:flex;gap:10px;margin-bottom:16px;overflow-x:auto}
.sd-stat-box{flex:1;min-width:100px;background:var(--bg);border-radius:12px;padding:12px;text-align:center}
.sd-stat-box .sd-val{font-size:22px;font-weight:800;color:var(--primary)}
.sd-stat-box .sd-label{font-size:10px;color:var(--text-muted);margin-top:2px}
.sd-chart-wrap{position:relative;width:100%;height:200px;background:var(--bg);border-radius:12px;overflow:hidden;margin-bottom:16px}
.sd-chart-wrap canvas{width:100%!important;height:100%!important}
.sd-course-item{display:flex;justify-content:space-between;align-items:center;padding:10px 12px;border-radius:10px;margin-bottom:6px;background:var(--bg)}
.sd-course-item .sd-cn{font-weight:600;font-size:13px}
.sd-course-item .sd-cs{font-size:12px;color:var(--text-muted)}

/* Rules Guide */
.rule-item{padding:14px;border-radius:12px;background:var(--bg);margin-bottom:8px;cursor:pointer;transition:.2s}
.rule-item:hover{background:var(--primary-light)}
.rule-item .rule-title{font-weight:700;font-size:14px;margin-bottom:4px;display:flex;align-items:center;gap:6px}
.rule-item .rule-cat{font-size:10px;padding:2px 8px;border-radius:10px;background:var(--primary);color:#fff}
.rule-item .rule-desc{font-size:12px;color:var(--text-muted);line-height:1.5;display:none}
.rule-item.expanded .rule-desc{display:block;margin-top:8px}
.rule-item .rule-arrow{margin-left:auto;transition:transform .2s;color:var(--text-muted)}
.rule-item.expanded .rule-arrow{transform:rotate(180deg)}

/* Share Card */
.share-preview{border-radius:12px;overflow:hidden;margin:16px 0;box-shadow:0 4px 20px rgba(0,0,0,.15)}
.share-preview canvas{width:100%;display:block}
.share-btns{display:flex;gap:8px;justify-content:center}

/* Fitness Guide */
.fit-step{display:flex;gap:14px;padding:14px;border-radius:12px;background:var(--bg);margin-bottom:8px;align-items:center}
.fit-step .fit-num{width:36px;height:36px;border-radius:50%;background:var(--primary);color:#fff;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:14px;flex-shrink:0}
.fit-step .fit-info{flex:1}
.fit-step .fit-name{font-weight:700;font-size:14px;margin-bottom:2px}
.fit-step .fit-desc{font-size:12px;color:var(--text-muted);line-height:1.4}
.fit-step .fit-dur{font-size:11px;color:var(--primary);font-weight:600;margin-top:4px}
.fit-step.active{background:linear-gradient(135deg,#e8f5e9,#c8e6c9);border:2px solid var(--primary)}
[data-theme="dark"] .fit-step.active{background:linear-gradient(135deg,#1a3a25,#2e5a35)}
.fit-timer{text-align:center;margin:20px 0}
.fit-timer .fit-time{font-size:48px;font-weight:800;color:var(--primary);font-variant-numeric:tabular-nums}
.fit-timer .fit-current{font-size:16px;font-weight:600;margin-bottom:8px}
.fit-progress{width:100%;height:6px;background:var(--border);border-radius:3px;overflow:hidden;margin-top:12px}
.fit-progress-bar{height:100%;background:linear-gradient(90deg,var(--primary),#7bed9f);border-radius:3px;transition:width .3s}

/* Weather Detail */
.wx-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-top:12px}
.wx-card{text-align:center;padding:10px;border-radius:10px;background:var(--bg)}
.wx-card .wx-icon{font-size:24px;margin-bottom:4px}
.wx-card .wx-val{font-size:14px;font-weight:700}
.wx-card .wx-label{font-size:10px;color:var(--text-muted)}

/* Folder System */
.fld-list{display:flex;flex-direction:column;gap:6px}
.fld-item{display:flex;align-items:center;gap:10px;padding:12px;border-radius:12px;background:var(--bg);cursor:pointer;transition:.2s}
.fld-item:hover{background:var(--primary-light)}
.fld-item .fld-icon{width:36px;height:36px;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:18px;flex-shrink:0}
.fld-item .fld-name{font-weight:600;font-size:14px}
.fld-item .fld-count{font-size:12px;color:var(--text-muted)}
.fld-item .fld-arrow{margin-left:auto;color:var(--text-muted)}
.fld-courses{display:grid;grid-template-columns:1fr;gap:6px;margin-top:12px}
.fld-course{display:flex;justify-content:space-between;align-items:center;padding:10px 12px;border-radius:10px;background:var(--bg)}
.fld-course .fld-cn{font-weight:600;font-size:13px}
.fld-course .fld-rm{color:#e53935;cursor:pointer;font-size:12px;padding:4px 8px;border-radius:6px;transition:.2s}
.fld-course .fld-rm:hover{background:#fce4ec}

/* Toast Enhancement */
.v7-toast{position:fixed;top:80px;left:50%;transform:translateX(-50%);padding:10px 20px;border-radius:12px;font-size:13px;font-weight:600;z-index:99999;animation:v7ToastIn .3s ease;box-shadow:0 4px 20px rgba(0,0,0,.2)}
@keyframes v7ToastIn{from{opacity:0;transform:translateX(-50%) translateY(-20px)}to{opacity:1;transform:translateX(-50%) translateY(0)}}
.v7-toast.success{background:#2e7d32;color:#fff}
.v7-toast.info{background:#1565c0;color:#fff}
.v7-toast.warn{background:#e65100;color:#fff}
`;
document.head.appendChild(css7);

// === Utility ===
function v7Toast(msg, type) {
  var t = document.createElement('div');
  t.className = 'v7-toast ' + (type||'info');
  t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(function(){ t.remove(); }, 2500);
}

function v7CreateOverlay(id) {
  var ov = document.createElement('div');
  ov.className = 'v7-overlay';
  ov.id = id;
  ov.addEventListener('click', function(e){ if(e.target===ov) ov.classList.remove('active'); });
  document.body.appendChild(ov);
  return ov;
}

// ====================================================================
// 1. SMART AI RECOMMEND ENGINE
// ====================================================================
var srOverlay = v7CreateOverlay('v7SrOverlay');
var srModal = document.createElement('div');
srModal.className = 'v7-modal';
srOverlay.appendChild(srModal);

function getSmartRecommendations(prefs) {
  var courses = window.allCourses || [];
  if (!courses.length) return [];
  var visited = JSON.parse(localStorage.getItem('sg_visited') || '[]');
  var rounds = JSON.parse(localStorage.getItem('sg_rounds') || '[]');
  var favs = JSON.parse(localStorage.getItem('sg_favorites') || '[]');

  var visitedRegions = {};
  var visitedTypes = {};
  var avgPrice = 0;
  var priceCount = 0;
  visited.forEach(function(vn){
    var vc = courses.find(function(x){ return x.n === vn; });
    if(vc){
      visitedRegions[vc.r] = (visitedRegions[vc.r]||0)+1;
      visitedTypes[vc.t||''] = (visitedTypes[vc.t||'']||0)+1;
      if(vc.weekday>0){ avgPrice += vc.weekday; priceCount++; }
    }
  });
  if(priceCount) avgPrice /= priceCount;

  var favRegions = {};
  favs.forEach(function(fn){
    var fc = courses.find(function(x){ return x.n === fn; });
    if(fc) favRegions[fc.r] = (favRegions[fc.r]||0)+2;
  });

  var bestScoreAvg = 0;
  if(rounds.length){
    var scores = rounds.map(function(r){ return r.score; }).filter(Boolean);
    if(scores.length) bestScoreAvg = scores.reduce(function(a,b){return a+b;},0)/scores.length;
  }

  return courses.map(function(c){
    var score = 0;
    var reasons = [];

    // Rating bonus
    if(c.rt >= 9){ score += 20; reasons.push('평점 ' + c.rt.toFixed(1) + '점 (최상위)'); }
    else if(c.rt >= 8){ score += 12; }
    else if(c.rt >= 7){ score += 6; }

    // Region preference
    var regionScore = (visitedRegions[c.r]||0)*3 + (favRegions[c.r]||0)*5;
    if(regionScore > 0){ score += Math.min(regionScore, 15); reasons.push(c.r + ' 지역 선호도 높음'); }

    // Type preference
    if(visitedTypes[c.t]){ score += visitedTypes[c.t]*4; reasons.push(c.t + ' 타입 자주 방문'); }

    // Price range match
    if(avgPrice > 0 && c.weekday > 0){
      var pDiff = Math.abs(c.weekday - avgPrice);
      if(pDiff < 30000){ score += 10; reasons.push('평소 가격대와 유사'); }
      else if(pDiff < 60000){ score += 5; }
    }

    // Not visited bonus (discovery)
    if(visited.indexOf(c.n) === -1){ score += 8; reasons.push('아직 방문하지 않은 코스'); }
    else { score -= 3; }

    // Favorite bonus
    if(favs.indexOf(c.n) >= 0){ score += 5; }

    // Preference filters
    if(prefs){
      if(prefs.budget && c.weekday > 0){
        if(prefs.budget === 'low' && c.weekday <= 80000) score += 15;
        else if(prefs.budget === 'mid' && c.weekday > 80000 && c.weekday <= 150000) score += 15;
        else if(prefs.budget === 'high' && c.weekday > 150000) score += 15;
      }
      if(prefs.holes && c.h){
        if(prefs.holes === '18' && c.h >= 18) score += 10;
        else if(prefs.holes === '9' && c.h === 9) score += 10;
        else if(prefs.holes === '27+' && c.h >= 27) score += 10;
      }
      if(prefs.type && c.t === prefs.type) score += 12;
    }

    // Value score bonus
    if(c.rt && c.weekday > 0){
      var vs = (c.rt / (c.weekday / 10000)) * 10;
      if(vs > 20) score += 8;
    }

    return { course: c, score: score, reasons: reasons.slice(0,3) };
  }).sort(function(a,b){ return b.score - a.score; }).slice(0,8);
}

function renderSmartRecommend() {
  var prefs = JSON.parse(localStorage.getItem('sg_v7_prefs') || '{}');
  var recs = getSmartRecommendations(prefs);

  srModal.innerHTML = '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px">' +
    '<h2 style="margin:0"><span class="v7-icon" style="background:linear-gradient(135deg,#1a7a3a,#7bed9f)">&#129302;</span> AI 코스 추천</h2>' +
    '<button class="v7-close" id="v7SrClose">&times;</button></div>' +
    '<p style="font-size:12px;color:var(--text-muted);margin-bottom:16px">방문 이력, 즐겨찾기, 가격 선호도를 분석하여 맞춤 추천합니다</p>' +
    '<div class="v7-section"><h3>&#9881; 선호 설정</h3>' +
    '<div class="sr-pref">' +
    '<div class="sr-pref-chip' + (prefs.budget==='low'?' active':'') + '" data-key="budget" data-val="low">&#128176; 10만원 이하</div>' +
    '<div class="sr-pref-chip' + (prefs.budget==='mid'?' active':'') + '" data-key="budget" data-val="mid">&#128177; 10~15만원</div>' +
    '<div class="sr-pref-chip' + (prefs.budget==='high'?' active':'') + '" data-key="budget" data-val="high">&#128178; 15만원+</div>' +
    '<div class="sr-pref-chip' + (prefs.holes==='9'?' active':'') + '" data-key="holes" data-val="9">9홀</div>' +
    '<div class="sr-pref-chip' + (prefs.holes==='18'?' active':'') + '" data-key="holes" data-val="18">18홀</div>' +
    '<div class="sr-pref-chip' + (prefs.holes==='27+'?' active':'') + '" data-key="holes" data-val="27+">27홀+</div>' +
    '<div class="sr-pref-chip' + (prefs.type==='대중제'?' active':'') + '" data-key="type" data-val="대중제">대중제</div>' +
    '<div class="sr-pref-chip' + (prefs.type==='회원제'?' active':'') + '" data-key="type" data-val="회원제">회원제</div>' +
    '</div></div>' +
    '<div class="v7-section" id="v7SrResults"><h3>&#127942; 맞춤 추천 TOP 8</h3>' +
    recs.map(function(r, i){
      var c = r.course;
      var priceStr = c.weekday > 0 ? Math.round(c.weekday/10000) + '만원' : '가격미정';
      return '<div class="sr-card" data-name="' + c.n.replace(/"/g,'&quot;') + '">' +
        '<div class="sr-rank">#' + (i+1) + ' 추천</div>' +
        '<div class="sr-name">' + c.n + '</div>' +
        '<div class="sr-meta">' + c.r + ' ' + (c.c||'') + ' &middot; ' + (c.t||'') + ' &middot; ' + (c.h||'?') + '홀 &middot; ' + priceStr +
        (c.rt ? ' &middot; &#11088;' + c.rt.toFixed(1) : '') + '</div>' +
        (r.reasons.length ? '<div class="sr-reason">&#128161; ' + r.reasons.join(' / ') + '</div>' : '') +
        '</div>';
    }).join('') +
    '</div>';

  srModal.querySelectorAll('.sr-pref-chip').forEach(function(chip){
    chip.addEventListener('click', function(){
      var key = chip.dataset.key;
      var val = chip.dataset.val;
      if(prefs[key] === val){ delete prefs[key]; chip.classList.remove('active'); }
      else {
        srModal.querySelectorAll('.sr-pref-chip[data-key="'+key+'"]').forEach(function(c){ c.classList.remove('active'); });
        prefs[key] = val; chip.classList.add('active');
      }
      localStorage.setItem('sg_v7_prefs', JSON.stringify(prefs));
      var newRecs = getSmartRecommendations(prefs);
      var container = document.getElementById('v7SrResults');
      container.innerHTML = '<h3>&#127942; 맞춤 추천 TOP 8</h3>' +
        newRecs.map(function(r, i){
          var c = r.course;
          var priceStr = c.weekday > 0 ? Math.round(c.weekday/10000) + '만원' : '가격미정';
          return '<div class="sr-card" data-name="' + c.n.replace(/"/g,'&quot;') + '">' +
            '<div class="sr-rank">#' + (i+1) + ' 추천</div>' +
            '<div class="sr-name">' + c.n + '</div>' +
            '<div class="sr-meta">' + c.r + ' ' + (c.c||'') + ' &middot; ' + (c.t||'') + ' &middot; ' + (c.h||'?') + '홀 &middot; ' + priceStr +
            (c.rt ? ' &middot; &#11088;' + c.rt.toFixed(1) : '') + '</div>' +
            (r.reasons.length ? '<div class="sr-reason">&#128161; ' + r.reasons.join(' / ') + '</div>' : '') +
            '</div>';
        }).join('');
      bindSrCards(container);
    });
  });

  function bindSrCards(container) {
    container.querySelectorAll('.sr-card').forEach(function(card){
      card.addEventListener('click', function(){
        var name = card.dataset.name;
        var found = (window.allCourses||[]).find(function(x){ return x.n === name; });
        if(found && typeof window.showDetail === 'function'){
          srOverlay.classList.remove('active');
          window.showDetail(found);
        }
      });
    });
  }
  bindSrCards(srModal);

  document.getElementById('v7SrClose').addEventListener('click', function(){ srOverlay.classList.remove('active'); });
}

// ====================================================================
// 2. STATS DASHBOARD V2
// ====================================================================
var sdOverlay = v7CreateOverlay('v7SdOverlay');
var sdModal = document.createElement('div');
sdModal.className = 'v7-modal';
sdModal.style.maxWidth = '620px';
sdOverlay.appendChild(sdModal);

function renderStatsDashboard() {
  var rounds = JSON.parse(localStorage.getItem('sg_rounds') || '[]');
  var visited = JSON.parse(localStorage.getItem('sg_visited') || '[]');
  var favs = JSON.parse(localStorage.getItem('sg_favorites') || '[]');
  var courses = window.allCourses || [];

  var totalRounds = rounds.length;
  var scores = rounds.map(function(r){ return r.score; }).filter(Boolean);
  var avgScore = scores.length ? (scores.reduce(function(a,b){return a+b;},0)/scores.length).toFixed(1) : '-';
  var bestScore = scores.length ? Math.min.apply(null, scores) : '-';
  var uniqueCourses = [];
  rounds.forEach(function(r){ if(r.course && uniqueCourses.indexOf(r.course)===-1) uniqueCourses.push(r.course); });

  // Monthly data
  var monthly = {};
  rounds.forEach(function(r){
    if(r.date){
      var m = r.date.substring(0,7);
      if(!monthly[m]) monthly[m] = {count:0, scores:[]};
      monthly[m].count++;
      if(r.score) monthly[m].scores.push(r.score);
    }
  });
  var months = Object.keys(monthly).sort();

  // Course performance
  var coursePerf = {};
  rounds.forEach(function(r){
    if(r.course && r.score){
      if(!coursePerf[r.course]) coursePerf[r.course] = [];
      coursePerf[r.course].push(r.score);
    }
  });

  sdModal.innerHTML = '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px">' +
    '<h2 style="margin:0"><span class="v7-icon" style="background:linear-gradient(135deg,#1565c0,#42a5f5)">&#128202;</span> 통계 대시보드</h2>' +
    '<button class="v7-close" id="v7SdClose">&times;</button></div>' +

    '<div class="sd-stat-row">' +
    '<div class="sd-stat-box"><div class="sd-val">' + totalRounds + '</div><div class="sd-label">총 라운드</div></div>' +
    '<div class="sd-stat-box"><div class="sd-val">' + avgScore + '</div><div class="sd-label">평균 스코어</div></div>' +
    '<div class="sd-stat-box"><div class="sd-val">' + bestScore + '</div><div class="sd-label">최저 스코어</div></div>' +
    '<div class="sd-stat-box"><div class="sd-val">' + uniqueCourses.length + '</div><div class="sd-label">방문 코스</div></div>' +
    '</div>' +

    '<div class="v7-section"><h3>&#128200; 월별 스코어 추이</h3>' +
    '<div class="sd-chart-wrap"><canvas id="v7MonthlyChart"></canvas></div></div>' +

    '<div class="v7-section"><h3>&#128203; 최근 라운드</h3>' +
    (rounds.length === 0 ? '<p style="font-size:13px;color:var(--text-muted);text-align:center;padding:20px">아직 기록된 라운드가 없습니다.<br>스코어카드에서 라운드를 저장해보세요!</p>' :
    rounds.slice(-10).reverse().map(function(r){
      return '<div class="sd-course-item"><div><div class="sd-cn">' + (r.course||'미정') + '</div><div class="sd-cs">' + (r.date||'') + '</div></div>' +
        '<div style="font-weight:700;font-size:16px;color:' + (r.score && r.score <= 80 ? 'var(--primary)' : r.score && r.score <= 90 ? '#1565c0' : '#e65100') + '">' + (r.score||'-') + '</div></div>';
    }).join('')) + '</div>' +

    '<div class="v7-section"><h3>&#127969; 코스별 성적</h3>' +
    (Object.keys(coursePerf).length === 0 ? '<p style="font-size:13px;color:var(--text-muted);text-align:center;padding:10px">코스별 성적 데이터가 없습니다</p>' :
    Object.keys(coursePerf).map(function(cn){
      var sc = coursePerf[cn];
      var avg = (sc.reduce(function(a,b){return a+b;},0)/sc.length).toFixed(1);
      var best = Math.min.apply(null, sc);
      return '<div class="sd-course-item"><div><div class="sd-cn">' + cn + '</div><div class="sd-cs">' + sc.length + '회 방문 &middot; 최저 ' + best + '</div></div>' +
        '<div style="font-weight:700;color:var(--primary)">' + avg + '</div></div>';
    }).join('')) + '</div>' +

    '<div class="v7-section"><h3>&#127919; 성장 분석</h3>' +
    '<div class="sd-chart-wrap"><canvas id="v7GrowthChart"></canvas></div></div>';

  document.getElementById('v7SdClose').addEventListener('click', function(){ sdOverlay.classList.remove('active'); });

  // Draw monthly chart
  setTimeout(function(){
    var canvas = document.getElementById('v7MonthlyChart');
    if(!canvas || months.length < 2) return;
    var ctx = canvas.getContext('2d');
    var w = canvas.parentElement.offsetWidth;
    var h = 200;
    canvas.width = w * 2; canvas.height = h * 2;
    canvas.style.width = w + 'px'; canvas.style.height = h + 'px';
    ctx.scale(2, 2);

    var vals = months.map(function(m){ var s = monthly[m].scores; return s.length ? s.reduce(function(a,b){return a+b;},0)/s.length : null; });
    var validVals = vals.filter(function(v){ return v !== null; });
    if(!validVals.length) return;
    var maxV = Math.max.apply(null, validVals) + 5;
    var minV = Math.min.apply(null, validVals) - 5;
    var range = maxV - minV || 1;
    var pad = {top:20, right:20, bottom:30, left:45};
    var cw = w - pad.left - pad.right;
    var ch = h - pad.top - pad.bottom;

    // Grid
    ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue('--border').trim() || '#e0e0e0';
    ctx.lineWidth = 0.5;
    for(var gi=0;gi<=4;gi++){
      var gy = pad.top + (ch/4)*gi;
      ctx.beginPath(); ctx.moveTo(pad.left, gy); ctx.lineTo(w-pad.right, gy); ctx.stroke();
      ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--text-muted').trim() || '#666';
      ctx.font = '10px sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText(Math.round(maxV - (range/4)*gi), pad.left - 5, gy + 4);
    }

    // Line
    ctx.beginPath();
    ctx.strokeStyle = '#1a7a3a';
    ctx.lineWidth = 2.5;
    ctx.lineJoin = 'round';
    var firstDrawn = false;
    vals.forEach(function(v, i){
      if(v === null) return;
      var x = pad.left + (cw/(months.length-1||1))*i;
      var y = pad.top + ch - ((v - minV)/range)*ch;
      if(!firstDrawn){ ctx.moveTo(x, y); firstDrawn = true; }
      else ctx.lineTo(x, y);
    });
    ctx.stroke();

    // Points + labels
    vals.forEach(function(v, i){
      if(v === null) return;
      var x = pad.left + (cw/(months.length-1||1))*i;
      var y = pad.top + ch - ((v - minV)/range)*ch;
      ctx.beginPath();
      ctx.fillStyle = '#1a7a3a';
      ctx.arc(x, y, 4, 0, Math.PI*2);
      ctx.fill();
      ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--text').trim() || '#1a1a1a';
      ctx.font = 'bold 10px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(Math.round(v), x, y - 10);
    });

    // X labels
    ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--text-muted').trim() || '#666';
    ctx.font = '10px sans-serif';
    months.forEach(function(m, i){
      var x = pad.left + (cw/(months.length-1||1))*i;
      ctx.textAlign = 'center';
      ctx.fillText(m.substring(5), x, h - 5);
    });
  }, 100);

  // Growth chart (all rounds in order)
  setTimeout(function(){
    var canvas = document.getElementById('v7GrowthChart');
    if(!canvas || scores.length < 2) return;
    var ctx = canvas.getContext('2d');
    var w = canvas.parentElement.offsetWidth;
    var h = 200;
    canvas.width = w * 2; canvas.height = h * 2;
    canvas.style.width = w + 'px'; canvas.style.height = h + 'px';
    ctx.scale(2, 2);

    var maxS = Math.max.apply(null, scores) + 5;
    var minS = Math.min.apply(null, scores) - 5;
    var range = maxS - minS || 1;
    var pad = {top:20, right:20, bottom:25, left:45};
    var cw = w - pad.left - pad.right;
    var ch = h - pad.top - pad.bottom;

    // Gradient fill
    ctx.beginPath();
    scores.forEach(function(s, i){
      var x = pad.left + (cw/(scores.length-1||1))*i;
      var y = pad.top + ch - ((s - minS)/range)*ch;
      if(i===0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.lineTo(pad.left + cw, pad.top + ch);
    ctx.lineTo(pad.left, pad.top + ch);
    ctx.closePath();
    var grad = ctx.createLinearGradient(0, pad.top, 0, pad.top + ch);
    grad.addColorStop(0, 'rgba(26,122,58,0.3)');
    grad.addColorStop(1, 'rgba(26,122,58,0.02)');
    ctx.fillStyle = grad;
    ctx.fill();

    // Line
    ctx.beginPath();
    ctx.strokeStyle = '#1a7a3a';
    ctx.lineWidth = 2;
    scores.forEach(function(s, i){
      var x = pad.left + (cw/(scores.length-1||1))*i;
      var y = pad.top + ch - ((s - minS)/range)*ch;
      if(i===0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();

    // Trend line (linear regression)
    if(scores.length >= 3){
      var n = scores.length;
      var sumX = 0, sumY = 0, sumXY = 0, sumX2 = 0;
      scores.forEach(function(s, i){ sumX+=i; sumY+=s; sumXY+=i*s; sumX2+=i*i; });
      var slope = (n*sumXY - sumX*sumY)/(n*sumX2 - sumX*sumX);
      var intercept = (sumY - slope*sumX)/n;
      ctx.beginPath();
      ctx.strokeStyle = slope < 0 ? '#2e7d32' : '#e53935';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([6,4]);
      var y0 = pad.top + ch - ((intercept - minS)/range)*ch;
      var yN = pad.top + ch - (((slope*(n-1)+intercept) - minS)/range)*ch;
      ctx.moveTo(pad.left, y0);
      ctx.lineTo(pad.left + cw, yN);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle = slope < 0 ? '#2e7d32' : '#e53935';
      ctx.font = 'bold 11px sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText(slope < 0 ? '&#9660; 하락 추세 (실력 향상!)' : '상승 추세', w - pad.right, pad.top + 12);
    }

    ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--text-muted').trim() || '#666';
    ctx.font = '10px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('1', pad.left, h - 5);
    ctx.fillText(scores.length + '', pad.left + cw, h - 5);
    ctx.fillText('라운드 순서 &#8594;', w/2, h - 5);
  }, 200);
}

// ====================================================================
// 3. GOLF RULES QUICK GUIDE (25+ rules)
// ====================================================================
var rulesData = [
  {cat:'티잉',title:'티잉 구역',desc:'티 마커 사이와 뒤로 최대 2클럽 길이 이내의 직사각형 구역에서만 티샷 가능. 발이 구역 밖에 있어도 공이 구역 안에 있으면 합법.'},
  {cat:'티잉',title:'티 순서',desc:'첫 홀은 핸디캡 또는 추첨. 이후 홀에서는 이전 홀 성적이 가장 좋은 플레이어가 먼저(오너). 2019 규칙 개정으로 준비된 사람이 먼저 치는 &quot;Ready Golf&quot; 권장.'},
  {cat:'티잉',title:'프로비저널 볼',desc:'OB 또는 분실이 의심되면 잠정구 선언 후 추가 샷 가능. 원구 발견 시 잠정구 무효. 미선언 시 잠정구가 인플레이 볼이 됨.'},
  {cat:'플레이',title:'있는 그대로 플레이',desc:'공의 위치를 개선하거나 의도적으로 스탠스를 개선하는 것은 금지. 자연물(나뭇잎, 돌)은 루스 임페디먼트로 제거 가능 (벙커 포함, 2019 개정).'},
  {cat:'플레이',title:'움직인 공',desc:'바람이나 중력으로 움직인 공은 새 위치에서 플레이. 플레이어가 실수로 움직이면 1벌타 + 원위치 복구. 수색 중 움직이면 벌타 없이 복구 (2019 개정).'},
  {cat:'플레이',title:'언플레이어블',desc:'벙커 외 어디서든 1벌타로 선언 가능. 3가지 옵션: (1) 직전 위치에서 재타, (2) 홀과 공을 잇는 선 후방 드롭, (3) 공 위치 2클럽 이내 드롭.'},
  {cat:'플레이',title:'OB (아웃 오브 바운즈)',desc:'백색 말뚝/선 너머. 1벌타 + 직전 위치에서 재타 (거리 벌타). 로컬룰로 &quot;2벌타 + OB 지점 근처 드롭&quot; 허용하는 곳도 있음.'},
  {cat:'벌타',title:'워터 해저드 (페널티 구역)',desc:'노란 말뚝: 1벌타로 (1) 직전 위치 재타 또는 (2) 공이 마지막 경계를 넘은 지점과 홀을 잇는 선 후방 드롭. 빨간 말뚝: 추가로 (3) 경계 넘은 지점 2클럽 이내 드롭.'},
  {cat:'벌타',title:'이중 타격',desc:'한 번의 스윙에서 공을 두 번 맞히면 2019 규칙 개정으로 벌타 없음. 1타로만 계산.'},
  {cat:'벌타',title:'잘못된 공 플레이',desc:'자신의 공이 아닌 공을 치면 2벌타 (매치플레이: 해당 홀 패). 즉시 정정해야 하며, 잘못된 공의 타수는 불산입.'},
  {cat:'벌타',title:'연습 스윙 접촉',desc:'연습 스윙 중 실수로 공을 맞히면 스트로크가 아님. 공이 움직였으면 1벌타 + 원위치 복구.'},
  {cat:'그린',title:'퍼팅 라인 터치',desc:'2019 규칙 개정으로 퍼팅 라인을 손이나 클럽으로 터치해도 벌타 없음. 단, 라인을 고의로 개선(흠집 만들기 등)하면 벌타.'},
  {cat:'그린',title:'깃발 꽂은 채 퍼팅',desc:'2019 규칙 개정으로 그린에서 깃발을 꽂은 채로 퍼팅해도 벌타 없음. 공이 깃발에 맞아 홀인하면 유효.'},
  {cat:'그린',title:'볼 마크 수리',desc:'그린 위 볼 마크, 구두 자국, 동물 발자국 등 손상을 수리할 수 있음 (2019 개정으로 확대). 에어레이션 구멍은 수리 불가.'},
  {cat:'그린',title:'마커 놓기',desc:'공 바로 뒤에 볼 마커를 놓고 집어 올림. 다른 플레이어의 라인에 방해되면 클럽 헤드 1-2개 거리만큼 옮긴 후 반드시 원위치 복구.'},
  {cat:'벙커',title:'벙커 규칙',desc:'2019 규칙 개정: 벙커 내 루스 임페디먼트(나뭇잎, 돌) 제거 가능. 단, 클럽으로 모래를 터치하거나 연습 스윙에서 모래를 건드리면 2벌타.'},
  {cat:'벙커',title:'벙커 언플레이어블',desc:'벙커 안에서 언플레이어블 선언 시: (1) 벙커 안 2클럽 드롭, (2) 벙커 안 후방 드롭은 1벌타. (3) 벙커 밖 후방 드롭은 2벌타.'},
  {cat:'에티켓',title:'디봇 수리',desc:'페어웨이에서 디봇(잔디 뜯긴 자국)은 반드시 원래 잔디를 덮거나 모래로 채워야 함. 그린 위 볼 마크도 즉시 수리. 코스 보호의 기본 매너.'},
  {cat:'에티켓',title:'포어! (Fore!)',desc:'공이 다른 플레이어 쪽으로 날아갈 때 즉시 &quot;포어!&quot;를 외쳐 경고. 들리면 머리를 감싸고 몸을 낮춰야 함. 가장 중요한 안전 매너.'},
  {cat:'에티켓',title:'슬로우 플레이',desc:'18홀 기준 4시간 15분 이내가 권장. 앞 팀과 1홀 이상 벌어지면 뒷팀에 먼저 치게 양보(패스). Ready Golf로 순서 상관없이 준비되면 바로 플레이.'},
  {cat:'에티켓',title:'그린 에티켓',desc:'다른 플레이어의 퍼팅 라인을 밟지 않기. 그림자가 라인에 들지 않게 위치. 퍼팅 시 움직이거나 소리 내지 않기. 홀 근처에서 발로 잔디 밟지 않기.'},
  {cat:'장비',title:'14클럽 제한',desc:'라운드 중 최대 14개 클럽만 휴대 가능. 초과 시 매 홀 2벌타(최대 4벌타). 라운드 중 클럽 교체 불가(파손 제외). 타인 클럽 공유 불가.'},
  {cat:'장비',title:'거리측정기',desc:'레이저 거리측정기 사용은 로컬룰로 허용 가능(기본 허용, 2019). 단, 경사 보정 기능은 경기에서 사용 금지. 바람/고도 보정 기능도 금지.'},
  {cat:'기타',title:'매치플레이 컨시드',desc:'매치플레이에서 상대방의 다음 퍼트를 인정(컨시드)할 수 있음. &quot;OK&quot;라고 선언하면 해당 퍼트는 홀인 처리. 한번 컨시드하면 취소 불가.'},
  {cat:'기타',title:'3분 수색 시간',desc:'2019 규칙 개정으로 공 수색 시간이 5분에서 3분으로 단축. 3분 초과 시 분실구 처리. 타이머는 수색 시작부터 적용.'}
];

var rlOverlay = v7CreateOverlay('v7RlOverlay');
var rlModal = document.createElement('div');
rlModal.className = 'v7-modal';
rlOverlay.appendChild(rlModal);

function renderRulesGuide(filterCat) {
  var cats = [];
  rulesData.forEach(function(r){ if(cats.indexOf(r.cat)===-1) cats.push(r.cat); });
  var shown = filterCat ? rulesData.filter(function(r){ return r.cat === filterCat; }) : rulesData;

  rlModal.innerHTML = '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px">' +
    '<h2 style="margin:0"><span class="v7-icon" style="background:linear-gradient(135deg,#e65100,#ff9800)">&#128220;</span> 골프 룰 가이드</h2>' +
    '<button class="v7-close" id="v7RlClose">&times;</button></div>' +
    '<p style="font-size:12px;color:var(--text-muted);margin-bottom:12px">2019 규칙 개정 반영 &middot; ' + rulesData.length + '개 핵심 규칙</p>' +
    '<div class="v7-tabs" id="v7RlTabs">' +
    '<div class="v7-tab' + (!filterCat?' active':'') + '" data-cat="">전체 (' + rulesData.length + ')</div>' +
    cats.map(function(c){
      var cnt = rulesData.filter(function(r){ return r.cat===c; }).length;
      return '<div class="v7-tab' + (filterCat===c?' active':'') + '" data-cat="' + c + '">' + c + ' (' + cnt + ')</div>';
    }).join('') + '</div>' +
    '<div id="v7RlList">' +
    shown.map(function(r, i){
      return '<div class="rule-item" data-idx="' + i + '">' +
        '<div class="rule-title"><span class="rule-cat">' + r.cat + '</span> ' + r.title + ' <span class="rule-arrow">&#9660;</span></div>' +
        '<div class="rule-desc">' + r.desc + '</div></div>';
    }).join('') + '</div>';

  document.getElementById('v7RlClose').addEventListener('click', function(){ rlOverlay.classList.remove('active'); });

  document.getElementById('v7RlTabs').querySelectorAll('.v7-tab').forEach(function(tab){
    tab.addEventListener('click', function(){
      renderRulesGuide(tab.dataset.cat || null);
    });
  });

  document.getElementById('v7RlList').querySelectorAll('.rule-item').forEach(function(item){
    item.addEventListener('click', function(){ item.classList.toggle('expanded'); });
  });
}

// ====================================================================
// 4. ROUND SHARE CARD (Canvas)
// ====================================================================
var scOverlay = v7CreateOverlay('v7ScOverlay');
var scModal = document.createElement('div');
scModal.className = 'v7-modal';
scOverlay.appendChild(scModal);

function renderShareCard(roundData) {
  if(!roundData) {
    var rounds = JSON.parse(localStorage.getItem('sg_rounds') || '[]');
    if(rounds.length) roundData = rounds[rounds.length - 1];
  }
  if(!roundData) {
    roundData = { course: 'SmartGolf', date: new Date().toISOString().split('T')[0], score: 0, memo: '' };
  }

  scModal.innerHTML = '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px">' +
    '<h2 style="margin:0"><span class="v7-icon" style="background:linear-gradient(135deg,#7b1fa2,#ce93d8)">&#127912;</span> 라운드 공유 카드</h2>' +
    '<button class="v7-close" id="v7ScClose">&times;</button></div>' +
    '<div class="share-preview"><canvas id="v7ShareCanvas" width="1200" height="800"></canvas></div>' +
    '<div class="share-btns">' +
    '<button class="v7-btn v7-btn-primary" id="v7ShareDl">&#128190; 이미지 저장</button>' +
    '<button class="v7-btn v7-btn-accent" id="v7ShareSend">&#128228; 공유하기</button>' +
    '</div>';

  document.getElementById('v7ScClose').addEventListener('click', function(){ scOverlay.classList.remove('active'); });

  var canvas = document.getElementById('v7ShareCanvas');
  var ctx = canvas.getContext('2d');
  var W = 1200, H = 800;

  // Background gradient
  var bg = ctx.createLinearGradient(0, 0, W, H);
  bg.addColorStop(0, '#0f5a28');
  bg.addColorStop(0.5, '#1a7a3a');
  bg.addColorStop(1, '#2e7d32');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  // Decorative circles
  ctx.globalAlpha = 0.06;
  ctx.fillStyle = '#fff';
  ctx.beginPath(); ctx.arc(100, 100, 200, 0, Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.arc(W-150, H-100, 250, 0, Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.arc(W/2, -50, 150, 0, Math.PI*2); ctx.fill();
  ctx.globalAlpha = 1;

  // Card shape
  var cx = 80, cy = 80, cw = W-160, ch = H-160;
  ctx.fillStyle = 'rgba(255,255,255,0.95)';
  roundRect(ctx, cx, cy, cw, ch, 30);
  ctx.fill();

  // Header bar
  var hg = ctx.createLinearGradient(cx, cy, cx+cw, cy);
  hg.addColorStop(0, '#1a7a3a');
  hg.addColorStop(1, '#2e7d32');
  ctx.fillStyle = hg;
  roundRectTop(ctx, cx, cy, cw, 100, 30);
  ctx.fill();

  // Logo
  ctx.fillStyle = '#fff';
  ctx.font = 'bold 32px -apple-system, sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText('SmartGolf', cx+30, cy+60);
  ctx.font = '16px sans-serif';
  ctx.globalAlpha = 0.8;
  ctx.fillText('Round Card', cx+230, cy+60);
  ctx.globalAlpha = 1;

  // Date
  ctx.textAlign = 'right';
  ctx.font = '18px sans-serif';
  ctx.fillText(roundData.date || '', cx+cw-30, cy+60);

  // Course name
  ctx.fillStyle = '#1a1a1a';
  ctx.textAlign = 'center';
  ctx.font = 'bold 42px -apple-system, sans-serif';
  ctx.fillText(roundData.course || 'Golf Course', W/2, cy+180);

  // Score circle
  var scoreX = W/2, scoreY = cy+320;
  ctx.beginPath();
  ctx.arc(scoreX, scoreY, 80, 0, Math.PI*2);
  var sg = ctx.createRadialGradient(scoreX, scoreY, 10, scoreX, scoreY, 80);
  sg.addColorStop(0, '#1a7a3a');
  sg.addColorStop(1, '#0f5a28');
  ctx.fillStyle = sg;
  ctx.fill();
  ctx.fillStyle = '#fff';
  ctx.font = 'bold 56px -apple-system, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(roundData.score || '-', scoreX, scoreY+20);
  ctx.font = '14px sans-serif';
  ctx.globalAlpha = 0.7;
  ctx.fillText('SCORE', scoreX, scoreY+45);
  ctx.globalAlpha = 1;

  // Stats boxes
  if(roundData.holes){
    var holes = roundData.holes;
    var eagle=0,birdie=0,par=0,bogey=0,dbl=0;
    var pars = [4,4,4,3,4,5,4,3,4,4,4,3,5,4,4,3,4,5];
    holes.forEach(function(h,i){ if(!h) return; var diff=h-(pars[i]||4); if(diff<=-2)eagle++; else if(diff===-1)birdie++; else if(diff===0)par++; else if(diff===1)bogey++; else dbl++; });

    var stats = [
      {label:'Eagle',val:eagle,color:'#e91e63'},
      {label:'Birdie',val:birdie,color:'#2196f3'},
      {label:'Par',val:par,color:'#4caf50'},
      {label:'Bogey',val:bogey,color:'#ff9800'},
      {label:'Double+',val:dbl,color:'#f44336'}
    ];
    var bw = 120, bh = 60, startX = W/2 - (stats.length*bw + (stats.length-1)*15)/2;
    stats.forEach(function(s, i){
      var bx = startX + i*(bw+15);
      var by = cy + 440;
      ctx.fillStyle = s.color + '15';
      roundRect(ctx, bx, by, bw, bh, 10);
      ctx.fill();
      ctx.fillStyle = s.color;
      ctx.font = 'bold 24px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(s.val, bx+bw/2, by+30);
      ctx.fillStyle = '#666';
      ctx.font = '12px sans-serif';
      ctx.fillText(s.label, bx+bw/2, by+50);
    });
  }

  // Memo
  if(roundData.memo){
    ctx.fillStyle = '#666';
    ctx.font = '16px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(roundData.memo.substring(0, 50), W/2, cy+ch-60);
  }

  // Footer
  ctx.fillStyle = '#999';
  ctx.font = '14px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('smartgolf.app &middot; Powered by PRIME Holdings', W/2, cy+ch-25);

  // Download
  document.getElementById('v7ShareDl').addEventListener('click', function(){
    var link = document.createElement('a');
    link.download = 'smartgolf-round-' + (roundData.date||'card') + '.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
    v7Toast('이미지가 저장되었습니다', 'success');
  });

  // Share
  document.getElementById('v7ShareSend').addEventListener('click', function(){
    if(navigator.share){
      canvas.toBlob(function(blob){
        var file = new File([blob], 'smartgolf-round.png', {type:'image/png'});
        navigator.share({title:'SmartGolf 라운드', text:(roundData.course||'') + ' ' + (roundData.score||'') + '타', files:[file]}).catch(function(){});
      });
    } else {
      canvas.toDataURL('image/png');
      v7Toast('공유 기능은 모바일에서 사용 가능합니다', 'warn');
    }
  });
}

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x+r, y);
  ctx.lineTo(x+w-r, y); ctx.quadraticCurveTo(x+w, y, x+w, y+r);
  ctx.lineTo(x+w, y+h-r); ctx.quadraticCurveTo(x+w, y+h, x+w-r, y+h);
  ctx.lineTo(x+r, y+h); ctx.quadraticCurveTo(x, y+h, x, y+h-r);
  ctx.lineTo(x, y+r); ctx.quadraticCurveTo(x, y, x+r, y);
  ctx.closePath();
}
function roundRectTop(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x+r, y);
  ctx.lineTo(x+w-r, y); ctx.quadraticCurveTo(x+w, y, x+w, y+r);
  ctx.lineTo(x+w, y+h);
  ctx.lineTo(x, y+h);
  ctx.lineTo(x, y+r); ctx.quadraticCurveTo(x, y, x+r, y);
  ctx.closePath();
}

// ====================================================================
// 5. GOLF FITNESS WARMUP (8-step stretching timer)
// ====================================================================
var fitOverlay = v7CreateOverlay('v7FitOverlay');
var fitModal = document.createElement('div');
fitModal.className = 'v7-modal';
fitOverlay.appendChild(fitModal);

var fitSteps = [
  {name:'목 스트레칭', desc:'머리를 천천히 좌우로 기울여 목 옆면 근육을 풀어줍니다. 각 방향 15초씩 유지.', dur:30, emoji:'&#129504;'},
  {name:'어깨 회전', desc:'양팔을 옆으로 벌리고 어깨를 크게 앞뒤로 10회씩 돌립니다. 회전 범위를 점점 넓혀가세요.', dur:30, emoji:'&#128170;'},
  {name:'몸통 회전', desc:'골프 자세를 취한 후 클럽을 어깨에 걸치고 좌우로 천천히 회전합니다. 유연성의 핵심!', dur:45, emoji:'&#128260;'},
  {name:'고관절 스트레칭', desc:'런지 자세에서 앞 무릎을 90도로 구부리고 뒷 다리를 뻗습니다. 양쪽 20초씩.', dur:40, emoji:'&#129470;'},
  {name:'손목 스트레칭', desc:'손바닥을 위/아래로 번갈아 당기며 손목과 전완 근육을 풀어줍니다. 각 15초씩.', dur:30, emoji:'&#9995;'},
  {name:'햄스트링 스트레칭', desc:'다리를 앞으로 뻗고 발끝을 잡아당깁니다. 무릎을 펴고 허리를 곧게 유지하세요.', dur:30, emoji:'&#129469;'},
  {name:'연습 스윙', desc:'공 없이 8-10회 연습 스윙. 하프 스윙부터 시작하여 점진적으로 풀 스윙으로. 리듬과 밸런스에 집중.', dur:60, emoji:'&#127948;'},
  {name:'퍼팅 연습', desc:'짧은 거리(1-3m)부터 시작. 스트로크의 리듬을 만들고 공이 일직선으로 굴러가는 느낌을 기억하세요.', dur:60, emoji:'&#9971;'}
];

var fitTimerId = null;
var fitCurrentStep = -1;

function renderFitnessGuide(autoStart) {
  var totalTime = fitSteps.reduce(function(s,f){ return s+f.dur; }, 0);

  fitModal.innerHTML = '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px">' +
    '<h2 style="margin:0"><span class="v7-icon" style="background:linear-gradient(135deg,#c62828,#ef5350)">&#127939;</span> 라운드 전 워밍업</h2>' +
    '<button class="v7-close" id="v7FitClose">&times;</button></div>' +
    '<p style="font-size:12px;color:var(--text-muted);margin-bottom:16px">총 ' + Math.ceil(totalTime/60) + '분 &middot; ' + fitSteps.length + '단계 스트레칭 프로그램</p>' +
    '<div class="fit-timer" id="v7FitTimer" style="display:none">' +
    '<div class="fit-current" id="v7FitCurrent"></div>' +
    '<div class="fit-time" id="v7FitTime">00:00</div>' +
    '<div class="fit-progress"><div class="fit-progress-bar" id="v7FitBar"></div></div>' +
    '</div>' +
    '<div style="text-align:center;margin-bottom:16px">' +
    '<button class="v7-btn v7-btn-accent" id="v7FitStart">&#9654; 타이머 시작</button>' +
    '<button class="v7-btn v7-btn-secondary" id="v7FitStop" style="display:none;margin-left:8px">&#9724; 중지</button>' +
    '</div>' +
    '<div id="v7FitList">' +
    fitSteps.map(function(s, i){
      return '<div class="fit-step" data-idx="' + i + '">' +
        '<div class="fit-num">' + (i+1) + '</div>' +
        '<div class="fit-info"><div class="fit-name">' + s.emoji + ' ' + s.name + '</div>' +
        '<div class="fit-desc">' + s.desc + '</div>' +
        '<div class="fit-dur">' + s.dur + '초</div></div></div>';
    }).join('') + '</div>';

  document.getElementById('v7FitClose').addEventListener('click', function(){
    if(fitTimerId) clearInterval(fitTimerId);
    fitTimerId = null;
    fitCurrentStep = -1;
    fitOverlay.classList.remove('active');
  });

  document.getElementById('v7FitStart').addEventListener('click', function(){
    fitCurrentStep = 0;
    startFitTimer();
  });

  if(autoStart) { fitCurrentStep = 0; setTimeout(startFitTimer, 500); }
}

function startFitTimer() {
  if(fitCurrentStep >= fitSteps.length){ finishFit(); return; }
  var step = fitSteps[fitCurrentStep];
  var remaining = step.dur;

  var timerDiv = document.getElementById('v7FitTimer');
  var startBtn = document.getElementById('v7FitStart');
  var stopBtn = document.getElementById('v7FitStop');
  timerDiv.style.display = 'block';
  startBtn.style.display = 'none';
  stopBtn.style.display = 'inline-block';

  document.getElementById('v7FitCurrent').textContent = step.emoji + ' ' + step.name + ' (' + (fitCurrentStep+1) + '/' + fitSteps.length + ')';

  var steps = document.querySelectorAll('.fit-step');
  steps.forEach(function(s, i){
    s.classList.toggle('active', i === fitCurrentStep);
    if(i === fitCurrentStep) s.scrollIntoView({behavior:'smooth', block:'nearest'});
  });

  if(fitTimerId) clearInterval(fitTimerId);

  function updateDisplay(){
    var m = Math.floor(remaining/60);
    var s = remaining % 60;
    document.getElementById('v7FitTime').textContent = (m<10?'0':'')+m+':'+(s<10?'0':'')+s;
    document.getElementById('v7FitBar').style.width = ((step.dur - remaining)/step.dur*100) + '%';
  }
  updateDisplay();

  fitTimerId = setInterval(function(){
    remaining--;
    if(remaining <= 0){
      clearInterval(fitTimerId);
      fitTimerId = null;
      fitCurrentStep++;
      if(fitCurrentStep < fitSteps.length){
        try { new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdH+Jj4+Nh3lpaXSEk5iXkYJ0Z2p5iJSZl5CLfnFsc4KRm5mVjIB1bXOBj5iYlIyBdnFzgI6Wl5OKgXdxcoGPl5eTioF3cXKBj5eXk4qBd3Fy').replace(/\s/g,''); } catch(e){}
        v7Toast(fitSteps[fitCurrentStep].name + ' 시작!', 'info');
        startFitTimer();
      } else { finishFit(); }
    } else { updateDisplay(); }
  }, 1000);

  stopBtn.onclick = function(){
    if(fitTimerId){ clearInterval(fitTimerId); fitTimerId = null; }
    timerDiv.style.display = 'none';
    startBtn.style.display = 'inline-block';
    stopBtn.style.display = 'none';
    fitCurrentStep = -1;
    steps.forEach(function(s){ s.classList.remove('active'); });
  };
}

function finishFit(){
  var timerDiv = document.getElementById('v7FitTimer');
  if(timerDiv){
    document.getElementById('v7FitCurrent').textContent = '&#127881; 워밍업 완료!';
    document.getElementById('v7FitTime').textContent = 'DONE';
    document.getElementById('v7FitBar').style.width = '100%';
  }
  var startBtn = document.getElementById('v7FitStart');
  var stopBtn = document.getElementById('v7FitStop');
  if(startBtn){ startBtn.style.display = 'inline-block'; startBtn.textContent = '&#128260; 다시 시작'; }
  if(stopBtn) stopBtn.style.display = 'none';
  v7Toast('워밍업 완료! 좋은 라운드 되세요!', 'success');
}

// ====================================================================
// 6. COURSE WEATHER DETAIL
// ====================================================================
function fetchCourseWeather(lat, lng, callback) {
  if(!lat || !lng){ callback(null); return; }
  var cacheKey = 'sg_wx_' + lat.toFixed(2) + '_' + lng.toFixed(2);
  var cached = sessionStorage.getItem(cacheKey);
  if(cached){
    try{ callback(JSON.parse(cached)); return; }catch(e){}
  }
  var url = 'https://api.open-meteo.com/v1/forecast?latitude='+lat+'&longitude='+lng+'&current=temperature_2m,relative_humidity_2m,wind_speed_10m,wind_direction_10m,weather_code,uv_index&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max,weather_code&timezone=Asia/Seoul&forecast_days=3';
  fetch(url).then(function(r){ return r.json(); }).then(function(data){
    sessionStorage.setItem(cacheKey, JSON.stringify(data));
    callback(data);
  }).catch(function(){ callback(null); });
}

function getWeatherIcon(code) {
  if(code <= 1) return '&#9728;&#65039;';
  if(code <= 3) return '&#9925;';
  if(code <= 48) return '&#127787;&#65039;';
  if(code <= 67) return '&#127783;&#65039;';
  if(code <= 77) return '&#127784;&#65039;';
  if(code <= 82) return '&#9748;';
  return '&#9889;';
}

function getWindDirection(deg) {
  var dirs = ['N','NE','E','SE','S','SW','W','NW'];
  return dirs[Math.round(deg/45)%8];
}

function injectWeatherToDetail() {
  var origShowDetail = window.showDetail;
  if(!origShowDetail) return;

  window.showDetail = function(c) {
    origShowDetail(c);
    if(c.lat && c.lng){
      fetchCourseWeather(c.lat, c.lng, function(wx){
        if(!wx || !wx.current) return;
        var cur = wx.current;
        var container = document.getElementById('modalBody');
        if(!container) return;

        var wxHTML = '<div style="margin-top:16px;padding:16px;background:linear-gradient(135deg,#e3f2fd,#bbdefb);border-radius:14px">' +
          '<div style="font-weight:700;font-size:14px;margin-bottom:8px;color:#1565c0">&#127780; 현재 코스 날씨</div>' +
          '<div class="wx-grid">' +
          '<div class="wx-card"><div class="wx-icon">' + getWeatherIcon(cur.weather_code) + '</div><div class="wx-val">' + Math.round(cur.temperature_2m) + '&deg;C</div><div class="wx-label">기온</div></div>' +
          '<div class="wx-card"><div class="wx-icon">&#128168;</div><div class="wx-val">' + Math.round(cur.wind_speed_10m) + 'km/h</div><div class="wx-label">' + getWindDirection(cur.wind_direction_10m) + '풍</div></div>' +
          '<div class="wx-card"><div class="wx-icon">&#128167;</div><div class="wx-val">' + cur.relative_humidity_2m + '%</div><div class="wx-label">습도</div></div>' +
          '</div>';

        if(wx.daily){
          wxHTML += '<div style="margin-top:12px;font-size:12px;color:#1565c0;font-weight:600">3일 예보</div>' +
            '<div style="display:flex;gap:8px;margin-top:6px">';
          var days = ['오늘','내일','모레'];
          for(var i=0; i<3 && i<(wx.daily.time||[]).length; i++){
            wxHTML += '<div style="flex:1;text-align:center;padding:8px;background:rgba(255,255,255,.7);border-radius:8px">' +
              '<div style="font-size:11px;font-weight:600">' + days[i] + '</div>' +
              '<div style="font-size:18px">' + getWeatherIcon(wx.daily.weather_code[i]) + '</div>' +
              '<div style="font-size:12px;font-weight:700">' + Math.round(wx.daily.temperature_2m_min[i]) + '~' + Math.round(wx.daily.temperature_2m_max[i]) + '&deg;</div>' +
              '<div style="font-size:10px;color:#666">&#127783;' + (wx.daily.precipitation_probability_max[i]||0) + '%</div>' +
              '</div>';
          }
          wxHTML += '</div>';
        }

        // Golf condition advice
        var temp = cur.temperature_2m;
        var wind = cur.wind_speed_10m;
        var advice = '';
        if(wind > 30) advice = '&#9888; 강풍 주의! 클럽 선택을 1-2번 올리고 낮은 탄도로 플레이하세요.';
        else if(wind > 20) advice = '&#128168; 바람이 강합니다. 바람 방향을 고려한 에이밍이 필요합니다.';
        else if(temp > 33) advice = '&#127774; 폭염 주의! 충분한 수분 섭취와 자외선 차단에 신경 쓰세요.';
        else if(temp < 5) advice = '&#129398; 낮은 기온에는 공이 덜 날아갑니다. 여분의 레이어와 핫팩을 준비하세요.';
        else if(temp >= 18 && temp <= 28 && wind < 15) advice = '&#127919; 최고의 골프 날씨! 편안한 라운드를 즐기세요.';
        else advice = '&#9989; 적당한 날씨입니다. 좋은 라운드 되세요!';

        wxHTML += '<div style="margin-top:10px;font-size:12px;padding:8px;background:rgba(255,255,255,.5);border-radius:8px;line-height:1.4">' + advice + '</div>';
        wxHTML += '</div>';

        // Insert before recommend section
        var recSection = container.querySelector('.recommend-section');
        if(recSection){
          recSection.insertAdjacentHTML('beforebegin', wxHTML);
        } else {
          container.insertAdjacentHTML('beforeend', wxHTML);
        }
      });
    }
  };
}

// ====================================================================
// 7. FAVORITES FOLDER SYSTEM
// ====================================================================
var fldOverlay = v7CreateOverlay('v7FldOverlay');
var fldModal = document.createElement('div');
fldModal.className = 'v7-modal';
fldOverlay.appendChild(fldModal);

function getFolders() {
  return JSON.parse(localStorage.getItem('sg_v7_folders') || JSON.stringify([
    {id:'want',name:'가고 싶은 곳',icon:'&#128151;',color:'#e91e63',courses:[]},
    {id:'frequent',name:'자주 가는 곳',icon:'&#11088;',color:'#ff9800',courses:[]},
    {id:'recommend',name:'추천 코스',icon:'&#128077;',color:'#4caf50',courses:[]}
  ]));
}
function saveFolders(f){ localStorage.setItem('sg_v7_folders', JSON.stringify(f)); }

function renderFolders(selectedFolderId) {
  var folders = getFolders();
  var favs = JSON.parse(localStorage.getItem('sg_favorites') || '[]');

  if(selectedFolderId){
    var folder = folders.find(function(f){ return f.id === selectedFolderId; });
    if(!folder) return;

    fldModal.innerHTML = '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px">' +
      '<h2 style="margin:0"><span class="v7-icon" style="background:' + folder.color + '">' + folder.icon + '</span> ' + folder.name + '</h2>' +
      '<button class="v7-close" id="v7FldClose">&times;</button></div>' +
      '<button class="v7-btn v7-btn-secondary" id="v7FldBack" style="margin-bottom:16px">&larr; 폴더 목록</button>' +
      '<div class="v7-section"><h3>즐겨찾기에서 추가</h3>' +
      '<div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:16px">' +
      favs.filter(function(fn){ return folder.courses.indexOf(fn)===-1; }).map(function(fn){
        return '<div class="sr-pref-chip" data-add="' + fn.replace(/"/g,'&quot;') + '">+ ' + fn + '</div>';
      }).join('') +
      (favs.filter(function(fn){ return folder.courses.indexOf(fn)===-1; }).length === 0 ? '<span style="font-size:12px;color:var(--text-muted)">추가할 즐겨찾기가 없습니다</span>' : '') +
      '</div></div>' +
      '<div class="v7-section"><h3>' + folder.icon + ' ' + folder.name + ' (' + folder.courses.length + '개)</h3>' +
      '<div class="fld-courses">' +
      (folder.courses.length === 0 ? '<p style="font-size:13px;color:var(--text-muted);text-align:center;padding:16px">코스를 추가해보세요</p>' :
      folder.courses.map(function(cn){
        return '<div class="fld-course"><span class="fld-cn">' + cn + '</span><span class="fld-rm" data-rm="' + cn.replace(/"/g,'&quot;') + '">&times; 제거</span></div>';
      }).join('')) +
      '</div></div>';

    document.getElementById('v7FldClose').addEventListener('click', function(){ fldOverlay.classList.remove('active'); });
    document.getElementById('v7FldBack').addEventListener('click', function(){ renderFolders(); });

    fldModal.querySelectorAll('[data-add]').forEach(function(chip){
      chip.addEventListener('click', function(){
        folder.courses.push(chip.dataset.add);
        saveFolders(folders);
        renderFolders(selectedFolderId);
        v7Toast(chip.dataset.add + ' 추가됨', 'success');
      });
    });

    fldModal.querySelectorAll('[data-rm]').forEach(function(btn){
      btn.addEventListener('click', function(){
        folder.courses = folder.courses.filter(function(c){ return c !== btn.dataset.rm; });
        saveFolders(folders);
        renderFolders(selectedFolderId);
      });
    });
    return;
  }

  fldModal.innerHTML = '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px">' +
    '<h2 style="margin:0"><span class="v7-icon" style="background:linear-gradient(135deg,#ff6b35,#ff9800)">&#128194;</span> 즐겨찾기 폴더</h2>' +
    '<button class="v7-close" id="v7FldClose">&times;</button></div>' +
    '<p style="font-size:12px;color:var(--text-muted);margin-bottom:16px">골프장을 폴더별로 분류하여 관리하세요</p>' +
    '<div class="fld-list">' +
    folders.map(function(f){
      return '<div class="fld-item" data-fid="' + f.id + '">' +
        '<div class="fld-icon" style="background:' + f.color + '22;color:' + f.color + '">' + f.icon + '</div>' +
        '<div><div class="fld-name">' + f.name + '</div><div class="fld-count">' + f.courses.length + '개 코스</div></div>' +
        '<div class="fld-arrow">&#8250;</div></div>';
    }).join('') + '</div>' +
    '<div style="margin-top:16px;display:flex;gap:8px">' +
    '<input type="text" id="v7FldNew" placeholder="새 폴더 이름" style="flex:1;padding:10px;border:1px solid var(--border);border-radius:10px;background:var(--bg);color:var(--text)">' +
    '<button class="v7-btn v7-btn-primary" id="v7FldAdd">추가</button></div>';

  document.getElementById('v7FldClose').addEventListener('click', function(){ fldOverlay.classList.remove('active'); });

  fldModal.querySelectorAll('.fld-item').forEach(function(item){
    item.addEventListener('click', function(){ renderFolders(item.dataset.fid); });
  });

  document.getElementById('v7FldAdd').addEventListener('click', function(){
    var name = document.getElementById('v7FldNew').value.trim();
    if(!name) return;
    var emojis = ['&#128204;','&#127919;','&#127948;','&#9971;','&#127969;','&#128640;'];
    var colors = ['#9c27b0','#009688','#3f51b5','#795548','#607d8b','#f44336'];
    var idx = folders.length % emojis.length;
    folders.push({id:'custom_'+Date.now(), name:name, icon:emojis[idx], color:colors[idx], courses:[]});
    saveFolders(folders);
    renderFolders();
    v7Toast('폴더 &quot;' + name + '&quot; 생성', 'success');
  });
}

// ====================================================================
// 8. GLOSSARY EXTENSION (23 new terms → 80+)
// ====================================================================
function extendGlossary() {
  if(!window.v6GlossaryExtended){
    window.v6GlossaryExtended = true;
    var extraTerms = [
      {cat:'샷',term:'플랍 샷',desc:'높이 띄워 빠르게 멈추는 샷. 그린 주변 장애물을 넘길 때 사용. 클럽 페이스를 크게 열고 부드럽게 스윙.'},
      {cat:'샷',term:'스팅어',desc:'낮은 탄도의 관통 샷. 바람이 강할 때 유용. 백스윙을 짧게, 팔로스루를 낮게 마무리.'},
      {cat:'샷',term:'펀치 샷',desc:'나무 아래로 보내는 낮은 샷. 공을 뒤에 놓고 3/4 스윙으로 임팩트 후 손목을 잠금.'},
      {cat:'샷',term:'레이업',desc:'위험 구간 앞에 의도적으로 짧게 보내는 전략적 샷. 안전하게 다음 샷을 준비.'},
      {cat:'코스',term:'GIR (Greens in Regulation)',desc:'파 기준 타수에서 2타를 뺀 이하의 타수로 그린에 올리는 것. 파3에서 1온, 파4에서 2온, 파5에서 3온.'},
      {cat:'코스',term:'FIR (Fairway in Regulation)',desc:'드라이버 또는 티샷이 페어웨이에 안착하는 비율. 투어 프로 평균 약 60%.'},
      {cat:'코스',term:'캐리',desc:'공이 날아가서 처음 지면에 닿는 지점까지의 거리. 전체 비거리에서 롤(런)을 제외한 거리.'},
      {cat:'코스',term:'슬로프 레이팅',desc:'보기 골퍼의 예상 성적과 스크래치 골퍼의 예상 성적 차이를 나타내는 55~155 범위의 난이도 지표.'},
      {cat:'장비',term:'로프트',desc:'클럽 페이스의 기울기 각도. 높을수록 공이 높이 뜨고 짧게 날아감. 드라이버 9~12도, PW 44~48도.'},
      {cat:'장비',term:'라이 앵글',desc:'클럽 샤프트와 지면이 이루는 각도. 체형에 맞지 않으면 방향성에 영향. 피팅 시 중요 항목.'},
      {cat:'장비',term:'밸런스 포인트',desc:'클럽의 무게 중심점. 스윙 웨이트(D0~D4)로 표기. 느낌과 컨트롤에 영향.'},
      {cat:'장비',term:'그립 사이즈',desc:'손 크기에 맞는 그립 두께. 오버사이즈, 미드사이즈, 스탠다드. 맞지 않으면 릴리스 타이밍 불량.'},
      {cat:'전략',term:'레이아웃 관리',desc:'코스 전체를 보며 각 홀의 공략 루트를 미리 계획하는 것. 위험 구간을 피하고 강점을 살리는 전략.'},
      {cat:'전략',term:'디시전 트리',desc:'각 상황(라이, 거리, 바람, 장애물)에서 최적의 클럽과 샷을 선택하는 의사결정 과정.'},
      {cat:'전략',term:'리스크-리워드',desc:'공격적 공략의 성공 보상과 실패 위험을 비교 분석. 리드 시 보수적, 추격 시 공격적으로.'},
      {cat:'규칙',term:'드롭 절차',desc:'2019 개정: 무릎 높이에서 드롭. 2번 시도 후 릴리프 구역 밖으로 나가면 놓인 지점에 플레이스.'},
      {cat:'규칙',term:'임시 수면',desc:'비 등으로 코스에 고인 물. 벌타 없이 가장 가까운 완전한 릴리프 지점에서 1클럽 이내 드롭.'},
      {cat:'에티켓',term:'레이크 벙커',desc:'벙커 샷 후 반드시 레이크로 발자국과 샷 자국을 정리. 레이크는 벙커 밖에 놓되 공이 굴러들지 않게.'},
      {cat:'에티켓',term:'그린 핀 관리',desc:'퍼팅 완료 후 깃발을 꽂을 때 그린을 찍지 않도록 주의. 홀 가장자리를 밟지 않기.'},
      {cat:'스코어',term:'스테이블포드',desc:'각 홀 성적을 점수로 변환. 이글=4점, 버디=3점, 파=2점, 보기=1점, 더블보기+=0점. 높은 점수가 우승.'},
      {cat:'스코어',term:'그로스/네트',desc:'그로스: 핸디캡 미적용 실제 타수. 네트: 그로스에서 핸디캡을 뺀 타수. 대회에서는 네트로 순위 결정.'},
      {cat:'기타',term:'캐디 팁',desc:'한국에서는 캐디당 보통 1-3만원의 별도 팁을 지급. 4인 1캐디가 일반적. 좋은 서비스에는 감사를 표현.'},
      {cat:'기타',term:'싱글 핸디캡',desc:'핸디캡 지수가 1~9인 골퍼. 아마추어 상위 10% 수준. 매 라운드 80타 전후의 안정적 성적 필요.'}
    ];

    var existing = document.querySelectorAll('.glossary-item, .gl-item');
    if(existing.length > 0){
      // v6 glossary exists, hook into it
    }
    window.v7ExtraGlossary = extraTerms;
  }
}

// ====================================================================
// 9. DARK MODE PERSISTENCE FIX + NULL PRICE FIX
// ====================================================================
function fixDarkModePersistence() {
  var saved = localStorage.getItem('sg_dark');
  if(saved === 'true'){
    document.documentElement.setAttribute('data-theme', 'dark');
    var toggle = document.getElementById('darkToggle');
    if(toggle) toggle.innerHTML = '<i class="fas fa-sun"></i>';
  }
}

function fixNullPrices() {
  var origFmtPriceFull = window.fmtPriceFull;
  if(origFmtPriceFull){
    window.fmtPriceFull = function(v){
      if(!v || v <= 0) return '<span style="color:var(--text-muted);font-size:12px">문의 필요</span>';
      return origFmtPriceFull(v);
    };
  }
  var origFmtPrice = window.fmtPrice;
  if(origFmtPrice){
    window.fmtPrice = function(v){
      if(!v || v <= 0) return '문의';
      return origFmtPrice(v);
    };
  }
}

// ====================================================================
// 10. PERFORMANCE OPTIMIZATIONS
// ====================================================================
function optimizePerformance() {
  // GPS timeout
  var origGpsBtn = document.getElementById('gpsBtn');
  if(origGpsBtn){
    var origClick = origGpsBtn.onclick;
    origGpsBtn.addEventListener('click', function(){
      var timeoutId = setTimeout(function(){
        v7Toast('GPS 위치를 가져올 수 없습니다. 설정에서 위치 권한을 확인하세요.', 'warn');
      }, 12000);
      if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(
          function(){ clearTimeout(timeoutId); },
          function(err){
            clearTimeout(timeoutId);
            if(err.code === 1) v7Toast('위치 권한이 거부되었습니다', 'warn');
            else if(err.code === 2) v7Toast('위치를 확인할 수 없습니다', 'warn');
            else v7Toast('위치 조회 시간 초과', 'warn');
          },
          {timeout: 10000, enableHighAccuracy: false}
        );
      }
    });
  }

  // Session cache for OSRM
  window.v7OsrmCache = window.v7OsrmCache || {};
  var origFetch = window.fetch;
  window.fetch = function(url, opts){
    if(typeof url === 'string' && url.includes('router.project-osrm.org')){
      var key = url.split('?')[0];
      if(window.v7OsrmCache[key]) return Promise.resolve(new Response(JSON.stringify(window.v7OsrmCache[key])));
      return origFetch(url, opts).then(function(r){
        return r.clone().json().then(function(data){
          window.v7OsrmCache[key] = data;
          return new Response(JSON.stringify(data));
        });
      });
    }
    return origFetch(url, opts);
  };
}

// ====================================================================
// QUICK ACTION BUTTONS (v7 enhanced)
// ====================================================================
function injectQuickActions() {
  var container = document.querySelector('.search-section');
  if(!container) return;

  var existing = document.querySelector('.v7-quick');
  if(existing) return;

  var quickDiv = document.createElement('div');
  quickDiv.className = 'v7-quick';
  quickDiv.innerHTML =
    '<div class="v7-quick-btn" id="v7QAi"><div class="qicon">&#129302;</div>AI 추천</div>' +
    '<div class="v7-quick-btn" id="v7QStats"><div class="qicon">&#128202;</div>통계</div>' +
    '<div class="v7-quick-btn" id="v7QRules"><div class="qicon">&#128220;</div>룰 가이드</div>' +
    '<div class="v7-quick-btn" id="v7QShare"><div class="qicon">&#127912;</div>공유 카드</div>' +
    '<div class="v7-quick-btn" id="v7QFit"><div class="qicon">&#127939;</div>워밍업</div>' +
    '<div class="v7-quick-btn" id="v7QFolder"><div class="qicon">&#128194;</div>폴더</div>';

  var statsBar = container.querySelector('#statsBar') || container.querySelector('.stats-bar');
  if(statsBar) statsBar.parentNode.insertBefore(quickDiv, statsBar.nextSibling);
  else container.appendChild(quickDiv);

  document.getElementById('v7QAi').addEventListener('click', function(){ renderSmartRecommend(); srOverlay.classList.add('active'); });
  document.getElementById('v7QStats').addEventListener('click', function(){ renderStatsDashboard(); sdOverlay.classList.add('active'); });
  document.getElementById('v7QRules').addEventListener('click', function(){ renderRulesGuide(); rlOverlay.classList.add('active'); });
  document.getElementById('v7QShare').addEventListener('click', function(){ renderShareCard(); scOverlay.classList.add('active'); });
  document.getElementById('v7QFit').addEventListener('click', function(){ renderFitnessGuide(); fitOverlay.classList.add('active'); });
  document.getElementById('v7QFolder').addEventListener('click', function(){ renderFolders(); fldOverlay.classList.add('active'); });
}

// ====================================================================
// KEYBOARD SHORTCUTS (v7)
// ====================================================================
document.addEventListener('keydown', function(e){
  var t = e.target.tagName;
  if(t === 'INPUT' || t === 'TEXTAREA' || t === 'SELECT') return;
  if(e.key === 'a' || e.key === 'A'){ renderSmartRecommend(); srOverlay.classList.add('active'); }
  if(e.key === 'f' || e.key === 'F'){ renderFolders(); fldOverlay.classList.add('active'); }
  if(e.key === 'w' || e.key === 'W'){ renderFitnessGuide(); fitOverlay.classList.add('active'); }
  if(e.key === 'u' || e.key === 'U'){ renderRulesGuide(); rlOverlay.classList.add('active'); }
  if(e.key === 'Escape'){
    document.querySelectorAll('.v7-overlay.active').forEach(function(ov){ ov.classList.remove('active'); });
    if(fitTimerId){ clearInterval(fitTimerId); fitTimerId = null; }
  }
});

// ====================================================================
// INIT
// ====================================================================
function v7Init() {
  fixDarkModePersistence();
  fixNullPrices();
  optimizePerformance();
  injectWeatherToDetail();
  extendGlossary();

  // Wait for courses to load then inject UI
  var waitForCourses = setInterval(function(){
    if(window.allCourses && window.allCourses.length > 0){
      clearInterval(waitForCourses);
      injectQuickActions();
    }
  }, 300);

  // Fallback inject after 3s
  setTimeout(function(){
    clearInterval(waitForCourses);
    injectQuickActions();
  }, 3000);
}

if(document.readyState === 'loading'){
  document.addEventListener('DOMContentLoaded', v7Init);
} else {
  v7Init();
}

})();
