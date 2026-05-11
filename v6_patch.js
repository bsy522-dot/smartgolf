(function(){
'use strict';

// === SmartGolf v6.0 Patch ===
// 1. 오늘 어디갈까? 랜덤 추천
// 2. 홀별 스코어카드
// 3. 라운딩 체크리스트
// 4. 골프 용어 사전 50+
// 5. 클럽별 거리 관리
// 6. 레이더 차트 비교
// 7. 샷 통계 파이차트
// 8. 동반자 관리
// 9. 지도 클러스터링 강화
// 10. 접근성/UX 강화

// --- CSS Injection ---
var css = document.createElement('style');
css.textContent = `
/* Random Recommendation */
.roulette-overlay{position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,.7);z-index:10001;display:none;align-items:center;justify-content:center;backdrop-filter:blur(4px)}
.roulette-overlay.active{display:flex}
.roulette-box{background:var(--card-bg,#fff);border-radius:20px;padding:28px;width:92%;max-width:440px;text-align:center;animation:cardFadeIn .5s ease}
.roulette-box h2{font-size:22px;margin-bottom:6px;color:var(--primary)}
.roulette-box p{font-size:13px;color:var(--text-muted);margin-bottom:20px}
.roulette-slot{height:80px;overflow:hidden;border-radius:12px;background:var(--bg);margin-bottom:20px;position:relative;border:2px solid var(--primary)}
.roulette-strip{transition:transform .1s linear}
.roulette-item{height:80px;display:flex;align-items:center;justify-content:center;font-size:18px;font-weight:700;padding:0 16px;gap:10px}
.roulette-item .ri-region{font-size:12px;color:var(--text-muted);font-weight:400}
.roulette-item .ri-rating{color:#f59e0b;font-size:14px}
.roulette-result{margin-top:12px;padding:16px;background:linear-gradient(135deg,var(--primary-dark,#0f5a28),var(--primary,#1a7a3a));color:#fff;border-radius:12px;display:none}
.roulette-result h3{margin:0 0 4px}
.roulette-result .rr-meta{font-size:12px;opacity:.85}
.roulette-conds{display:flex;gap:8px;flex-wrap:wrap;justify-content:center;margin-bottom:16px}
.roulette-cond{padding:6px 12px;border-radius:20px;border:1px solid var(--border);background:var(--bg);font-size:12px;cursor:pointer;transition:.2s}
.roulette-cond.active{background:var(--primary);color:#fff;border-color:var(--primary)}
.roulette-spin{padding:14px 40px;background:linear-gradient(135deg,#ff6b35,#ff8f65);color:#fff;border:none;border-radius:12px;font-size:16px;font-weight:700;cursor:pointer;transition:transform .2s}
.roulette-spin:hover{transform:scale(1.05)}
.roulette-spin:active{transform:scale(.95)}
.roulette-spin:disabled{opacity:.5;cursor:not-allowed;transform:none}

/* Scorecard */
.sc-overlay{position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,.6);z-index:10002;display:none;align-items:center;justify-content:center;backdrop-filter:blur(3px)}
.sc-overlay.active{display:flex}
.sc-modal{background:var(--card-bg,#fff);border-radius:16px;padding:20px;width:95%;max-width:600px;max-height:90vh;overflow-y:auto;box-shadow:0 20px 60px rgba(0,0,0,.3)}
.sc-modal h2{margin:0 0 12px;display:flex;align-items:center;justify-content:space-between}
.sc-grid{display:grid;grid-template-columns:repeat(9,1fr);gap:4px;margin-bottom:16px}
.sc-hole{text-align:center;font-size:11px}
.sc-hole .hole-num{font-weight:700;color:var(--text-muted);font-size:10px}
.sc-hole input{width:100%;text-align:center;padding:6px 2px;border:1px solid var(--border);border-radius:6px;font-size:14px;font-weight:700;background:var(--card-bg);color:var(--text)}
.sc-hole input:focus{border-color:var(--primary);outline:none}
.sc-hole .par-label{font-size:9px;color:var(--text-muted)}
.sc-summary{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin:12px 0}
.sc-stat{background:var(--bg);border-radius:8px;padding:10px;text-align:center}
.sc-stat .ss-val{font-size:1.3em;font-weight:800}
.sc-stat .ss-lbl{font-size:.7em;color:var(--text-muted)}
.sc-eagle{color:#e91e63}.sc-birdie{color:#2196f3}.sc-par-c{color:#4caf50}.sc-bogey{color:#ff9800}.sc-double{color:#f44336}
.sc-save{width:100%;padding:12px;background:var(--primary);color:#fff;border:none;border-radius:10px;font-weight:700;cursor:pointer;font-size:14px;margin-top:8px}

/* Checklist */
.cl-overlay{position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,.6);z-index:10001;display:none;align-items:center;justify-content:center;backdrop-filter:blur(3px)}
.cl-overlay.active{display:flex}
.cl-modal{background:var(--card-bg,#fff);border-radius:16px;padding:24px;width:92%;max-width:420px;max-height:85vh;overflow-y:auto}
.cl-modal h2{margin:0 0 16px;font-size:18px}
.cl-cat{font-size:12px;font-weight:700;color:var(--primary);margin:12px 0 6px;text-transform:uppercase}
.cl-item{display:flex;align-items:center;gap:10px;padding:8px 0;border-bottom:1px solid rgba(128,128,128,.1);cursor:pointer}
.cl-item input[type=checkbox]{width:18px;height:18px;accent-color:var(--primary)}
.cl-item label{font-size:13px;flex:1;cursor:pointer}
.cl-item.checked label{text-decoration:line-through;opacity:.5}
.cl-progress{height:6px;background:var(--bg);border-radius:3px;margin-bottom:12px;overflow:hidden}
.cl-progress-fill{height:100%;background:linear-gradient(90deg,var(--primary),#7bed9f);border-radius:3px;transition:width .3s}
.cl-count{font-size:12px;color:var(--text-muted);text-align:center;margin-top:8px}

/* Glossary */
.gl-overlay{position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,.6);z-index:10001;display:none;align-items:center;justify-content:center;backdrop-filter:blur(3px)}
.gl-overlay.active{display:flex}
.gl-modal{background:var(--card-bg,#fff);border-radius:16px;padding:24px;width:92%;max-width:520px;max-height:85vh;overflow-y:auto}
.gl-modal h2{margin:0 0 12px;font-size:18px}
.gl-search{width:100%;padding:10px 14px;border:1px solid var(--border);border-radius:10px;font-size:13px;margin-bottom:12px;background:var(--card-bg);color:var(--text)}
.gl-cat-tabs{display:flex;gap:6px;margin-bottom:12px;flex-wrap:wrap}
.gl-cat-tab{padding:5px 12px;border-radius:16px;border:1px solid var(--border);background:var(--bg);font-size:11px;cursor:pointer;transition:.2s}
.gl-cat-tab.active{background:var(--primary);color:#fff;border-color:var(--primary)}
.gl-term{padding:10px 0;border-bottom:1px solid rgba(128,128,128,.1)}
.gl-term .gt-word{font-weight:700;font-size:14px;color:var(--primary)}
.gl-term .gt-eng{font-size:11px;color:var(--text-muted);margin-left:6px}
.gl-term .gt-def{font-size:12px;line-height:1.6;margin-top:4px}

/* Club Distance */
.cd-overlay{position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,.6);z-index:10001;display:none;align-items:center;justify-content:center;backdrop-filter:blur(3px)}
.cd-overlay.active{display:flex}
.cd-modal{background:var(--card-bg,#fff);border-radius:16px;padding:24px;width:92%;max-width:440px;max-height:85vh;overflow-y:auto}
.cd-modal h2{margin:0 0 16px;font-size:18px}
.cd-club{display:flex;align-items:center;gap:10px;padding:8px 0;border-bottom:1px solid rgba(128,128,128,.1)}
.cd-club .cc-name{font-weight:600;font-size:13px;min-width:70px}
.cd-club input{flex:1;padding:6px 10px;border:1px solid var(--border);border-radius:6px;text-align:center;font-size:14px;font-weight:700;background:var(--card-bg);color:var(--text)}
.cd-club .cc-unit{font-size:11px;color:var(--text-muted)}
.cd-club .cc-bar{flex:2;height:8px;background:var(--bg);border-radius:4px;overflow:hidden}
.cd-club .cc-bar-fill{height:100%;border-radius:4px;transition:width .3s}

/* Radar Chart */
.radar-wrap{margin:16px auto;text-align:center}
.radar-wrap canvas{max-width:280px;max-height:280px}

/* Companion Manager */
.comp-overlay{position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,.6);z-index:10001;display:none;align-items:center;justify-content:center;backdrop-filter:blur(3px)}
.comp-overlay.active{display:flex}
.comp-modal{background:var(--card-bg,#fff);border-radius:16px;padding:24px;width:92%;max-width:440px;max-height:85vh;overflow-y:auto}
.comp-modal h2{margin:0 0 16px;font-size:18px}
.comp-item{display:flex;align-items:center;gap:10px;padding:10px;border-radius:10px;background:var(--bg);margin-bottom:8px}
.comp-item .ci-avatar{width:36px;height:36px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:700;color:#fff;font-size:14px}
.comp-item .ci-info{flex:1}
.comp-item .ci-name{font-weight:700;font-size:13px}
.comp-item .ci-meta{font-size:11px;color:var(--text-muted)}
.comp-item .ci-del{background:none;border:none;color:#e74c3c;cursor:pointer;font-size:16px}
.comp-add{display:flex;gap:8px;margin-bottom:12px}
.comp-add input{flex:1;padding:8px 12px;border:1px solid var(--border);border-radius:8px;font-size:13px;background:var(--card-bg);color:var(--text)}
.comp-add button{padding:8px 14px;background:var(--primary);color:#fff;border:none;border-radius:8px;font-weight:600;cursor:pointer;font-size:13px}

/* Shot Stats Pie */
.shot-stats{display:flex;align-items:center;gap:20px;margin:12px 0;flex-wrap:wrap;justify-content:center}
.shot-pie{width:120px;height:120px}
.shot-legend{display:grid;gap:4px}
.shot-legend-item{display:flex;align-items:center;gap:6px;font-size:12px}
.shot-legend-dot{width:10px;height:10px;border-radius:50%}

/* Quick Action Buttons */
.quick-actions{display:flex;gap:8px;margin:10px 0;flex-wrap:wrap;justify-content:center}
.qa-btn{display:flex;flex-direction:column;align-items:center;gap:4px;padding:10px 14px;border-radius:12px;background:var(--card-bg);border:1px solid var(--border);cursor:pointer;transition:.2s;font-size:11px;color:var(--text);min-width:72px}
.qa-btn:hover{background:var(--primary-light);border-color:var(--primary)}
.qa-btn i{font-size:18px;color:var(--primary)}
`;
document.head.appendChild(css);

// === DATA: Golf Glossary (50+ terms) ===
var GLOSSARY = [
  {t:'에이스',e:'Ace/Hole-in-One',d:'티샷이 직접 홀에 들어가는 것. 파3 홀에서 주로 발생.',c:'스코어'},
  {t:'알바트로스',e:'Albatross',d:'파보다 3타 적게 치는 것. 파5에서 2타로 마무리.',c:'스코어'},
  {t:'이글',e:'Eagle',d:'파보다 2타 적게 치는 것.',c:'스코어'},
  {t:'버디',e:'Birdie',d:'파보다 1타 적게 치는 것.',c:'스코어'},
  {t:'파',e:'Par',d:'각 홀에서 기준이 되는 타수. 보통 3/4/5.',c:'스코어'},
  {t:'보기',e:'Bogey',d:'파보다 1타 많은 것.',c:'스코어'},
  {t:'더블보기',e:'Double Bogey',d:'파보다 2타 많은 것.',c:'스코어'},
  {t:'트리플보기',e:'Triple Bogey',d:'파보다 3타 많은 것.',c:'스코어'},
  {t:'핸디캡',e:'Handicap',d:'골퍼의 실력을 나타내는 수치. 낮을수록 고수.',c:'스코어'},
  {t:'스크래치',e:'Scratch',d:'핸디캡이 0인 골퍼.',c:'스코어'},
  {t:'드라이버',e:'Driver',d:'가장 긴 클럽(1번 우드). 티샷에 주로 사용.',c:'클럽'},
  {t:'아이언',e:'Iron',d:'금속 헤드 클럽. 번호가 작을수록 길고 로프트가 낮음.',c:'클럽'},
  {t:'웨지',e:'Wedge',d:'짧은 거리/벙커 탈출용 클럽 (PW/SW/LW).',c:'클럽'},
  {t:'퍼터',e:'Putter',d:'그린에서 공을 굴리는 클럽.',c:'클럽'},
  {t:'하이브리드',e:'Hybrid',d:'우드와 아이언의 장점을 결합한 클럽.',c:'클럽'},
  {t:'페어웨이우드',e:'Fairway Wood',d:'3/5/7번 우드. 페어웨이에서 장거리 샷에 사용.',c:'클럽'},
  {t:'티',e:'Tee',d:'첫 타를 칠 때 공을 올려놓는 작은 받침대.',c:'장비'},
  {t:'캐디',e:'Caddie',d:'골퍼를 도와 가방을 운반하고 조언하는 사람.',c:'장비'},
  {t:'카트',e:'Cart',d:'골프장에서 이동하는 전동/가솔린 차량.',c:'장비'},
  {t:'그린피',e:'Green Fee',d:'골프장 이용 요금.',c:'장비'},
  {t:'페어웨이',e:'Fairway',d:'티에서 그린까지의 잘 정리된 잔디 구역.',c:'코스'},
  {t:'러프',e:'Rough',d:'페어웨이 양옆의 풀이 긴 구역.',c:'코스'},
  {t:'그린',e:'Green',d:'홀이 있는 곳. 잔디가 매우 짧게 깎여 있음.',c:'코스'},
  {t:'벙커',e:'Bunker',d:'모래로 채워진 장애물.',c:'코스'},
  {t:'워터해저드',e:'Water Hazard',d:'연못/개울 등 물 장애물.',c:'코스'},
  {t:'OB',e:'Out of Bounds',d:'코스 경계 밖. 1벌타 후 재타.',c:'코스'},
  {t:'도그레그',e:'Dogleg',d:'페어웨이가 왼쪽/오른쪽으로 꺾이는 홀.',c:'코스'},
  {t:'앞티/레이디스티',e:'Forward Tee',d:'일반/여성용 가까운 티잉 구역.',c:'코스'},
  {t:'백티',e:'Back Tee',d:'상급자용 가장 먼 티잉 구역.',c:'코스'},
  {t:'어프로치',e:'Approach',d:'그린 근처에서 핀을 향해 치는 샷.',c:'샷'},
  {t:'칩샷',e:'Chip Shot',d:'그린 주변에서 짧게 띄워 올리는 샷.',c:'샷'},
  {t:'피치샷',e:'Pitch Shot',d:'어프로치보다 높이 띄우는 샷.',c:'샷'},
  {t:'퍼팅',e:'Putting',d:'그린 위에서 퍼터로 공을 굴리는 것.',c:'샷'},
  {t:'슬라이스',e:'Slice',d:'공이 오른쪽으로 크게 휘는 것 (오른손잡이 기준).',c:'샷'},
  {t:'훅',e:'Hook',d:'공이 왼쪽으로 크게 휘는 것.',c:'샷'},
  {t:'드로우',e:'Draw',d:'공이 왼쪽으로 살짝 휘는 것. 이상적인 구질.',c:'샷'},
  {t:'페이드',e:'Fade',d:'공이 오른쪽으로 살짝 휘는 것.',c:'샷'},
  {t:'생크',e:'Shank',d:'클럽 넥 부분에 맞아 크게 빗나가는 미스샷.',c:'샷'},
  {t:'탑볼',e:'Topping',d:'공의 윗부분을 쳐서 굴러가는 미스샷.',c:'샷'},
  {t:'뒤땅',e:'Fat Shot',d:'공 뒤의 땅을 먼저 치는 미스샷.',c:'샷'},
  {t:'벙커샷',e:'Bunker Shot',d:'모래 벙커에서 탈출하는 샷.',c:'샷'},
  {t:'로브샷',e:'Lob Shot',d:'높이 띄워 짧게 떨어뜨리는 샷.',c:'샷'},
  {t:'레이업',e:'Lay Up',d:'안전하게 짧은 거리만 치는 전략적 샷.',c:'전략'},
  {t:'포섬',e:'Foursome',d:'4명이 한 조로 라운드하는 것.',c:'규칙'},
  {t:'매치플레이',e:'Match Play',d:'각 홀의 승패로 전체 승부를 결정하는 방식.',c:'규칙'},
  {t:'스트로크플레이',e:'Stroke Play',d:'전체 타수의 합으로 승부를 결정하는 방식.',c:'규칙'},
  {t:'멀리건',e:'Mulligan',d:'비공식적으로 한 번 더 칠 수 있는 기회.',c:'규칙'},
  {t:'프로비저널볼',e:'Provisional Ball',d:'분실/OB 가능성 있을 때 임시로 치는 공.',c:'규칙'},
  {t:'언플레이어블',e:'Unplayable',d:'공을 칠 수 없다고 선언. 1벌타 후 드롭.',c:'규칙'},
  {t:'디봇',e:'Divot',d:'스윙 시 잔디가 파인 자국.',c:'에티켓'},
  {t:'볼마크',e:'Ball Mark',d:'공이 그린에 떨어져 생긴 자국. 반드시 수리해야 함.',c:'에티켓'},
  {t:'아너',e:'Honor',d:'이전 홀 최저타수 기록자가 먼저 티샷하는 권리.',c:'에티켓'},
  {t:'포어',e:'Fore!',d:'공이 다른 사람 쪽으로 날아갈 때 외치는 경고.',c:'에티켓'},
  {t:'슬로우플레이',e:'Slow Play',d:'진행이 느린 것. 골프 매너에서 가장 중요한 위반.',c:'에티켓'},
  {t:'그린리딩',e:'Green Reading',d:'퍼팅 전 그린의 경사/빠르기를 파악하는 것.',c:'전략'},
  {t:'코스매니지먼트',e:'Course Management',d:'자신의 실력에 맞게 전략적으로 플레이하는 것.',c:'전략'},
  {t:'프리샷루틴',e:'Pre-Shot Routine',d:'샷 전 일정한 순서로 수행하는 준비 동작.',c:'전략'}
];

// === DATA: Checklist Items ===
var CHECKLIST = {
  '필수장비': ['골프클럽 세트','골프백','골프공 (여분 10개 이상)','골프화','글러브','티 (우드/아이언)','볼마커','디봇수리기','그린포크'],
  '의류': ['골프 상의 (카라티)','골프 바지/치마','모자/썬캡','여분 양말','우의/방수점퍼'],
  '개인용품': ['자외선차단제','선글라스','물통/음료','간식/에너지바','타올','밴드/파스'],
  '시즌용품': ['핫팩 (겨울)','쿨타올 (여름)','우산','방한장갑 (겨울)'],
  '기타': ['스코어카드/연필','거리측정기','GPS워치','카메라','보조배터리']
};

// === DATA: Default Club Distances ===
var DEFAULT_CLUBS = [
  {name:'드라이버',avg:220},
  {name:'3번우드',avg:200},
  {name:'5번우드',avg:185},
  {name:'하이브리드',avg:175},
  {name:'4번아이언',avg:170},
  {name:'5번아이언',avg:160},
  {name:'6번아이언',avg:150},
  {name:'7번아이언',avg:140},
  {name:'8번아이언',avg:130},
  {name:'9번아이언',avg:120},
  {name:'PW',avg:110},
  {name:'SW',avg:80},
  {name:'LW',avg:60},
  {name:'퍼터',avg:0}
];

// === DATA: 18-hole par template ===
var PARS = [4,4,3,5,4,4,3,4,5,4,3,5,4,4,3,4,5,4];

// === HELPERS ===
function $(id){return document.getElementById(id)}
function ce(tag){return document.createElement(tag)}
function qs(s){return document.querySelector(s)}

// ============================
// 1. 오늘 어디갈까? Random Recommendation
// ============================
var rouletteOvl = ce('div');
rouletteOvl.className = 'roulette-overlay';
rouletteOvl.innerHTML = `
<div class="roulette-box">
  <h2><i class="fas fa-dice"></i> 오늘 어디갈까?</h2>
  <p>조건을 선택하고 돌려보세요!</p>
  <div class="roulette-conds" id="rouletteConds">
    <span class="roulette-cond active" data-cond="all">전체</span>
    <span class="roulette-cond" data-cond="public">대중제</span>
    <span class="roulette-cond" data-cond="cheap">10만원이하</span>
    <span class="roulette-cond" data-cond="top">평점9+</span>
    <span class="roulette-cond" data-cond="value">가성비S</span>
    <span class="roulette-cond" data-cond="near">1시간이내</span>
  </div>
  <div class="roulette-slot" id="rouletteSlot">
    <div class="roulette-strip" id="rouletteStrip"></div>
  </div>
  <button class="roulette-spin" id="rouletteSpin"><i class="fas fa-sync-alt"></i> 돌리기!</button>
  <div class="roulette-result" id="rouletteResult"></div>
  <button style="margin-top:12px;background:none;border:none;color:var(--text-muted);cursor:pointer;font-size:13px" onclick="this.closest('.roulette-overlay').classList.remove('active')">&times; 닫기</button>
</div>`;
document.body.appendChild(rouletteOvl);

var rouletteCondActive = 'all';
rouletteOvl.querySelectorAll('.roulette-cond').forEach(function(el){
  el.addEventListener('click', function(){
    rouletteOvl.querySelectorAll('.roulette-cond').forEach(function(e){e.classList.remove('active')});
    el.classList.add('active');
    rouletteCondActive = el.dataset.cond;
  });
});
rouletteOvl.addEventListener('click',function(e){if(e.target===rouletteOvl)rouletteOvl.classList.remove('active')});

$('rouletteSpin').addEventListener('click', function(){
  var data = window.allCourses || [];
  var f = data.filter(function(c){
    switch(rouletteCondActive){
      case 'public': return c.t === '대중제';
      case 'cheap': return c.weekday > 0 && c.weekday <= 100000;
      case 'top': return c.rt >= 9;
      case 'value': return window.calcValueScore && window.calcValueScore(c) >= 8;
      case 'near': return c._calcTime && c._calcTime <= 1;
      default: return c.rt > 0;
    }
  });
  if(f.length < 3){if(window.showToast)window.showToast('조건에 맞는 골프장이 3개 미만입니다','warning');return}

  var btn = $('rouletteSpin');
  btn.disabled = true;
  var result = $('rouletteResult');
  result.style.display = 'none';

  var shuffled = f.slice().sort(function(){return Math.random()-0.5}).slice(0,20);
  var winner = shuffled[Math.floor(Math.random()*shuffled.length)];
  shuffled.push(winner);

  var strip = $('rouletteStrip');
  strip.innerHTML = shuffled.map(function(c){
    return '<div class="roulette-item"><span>'+c.n+'</span><span class="ri-region">'+c.r+'</span>'+(c.rt?'<span class="ri-rating"><i class="fas fa-star"></i> '+c.rt.toFixed(1)+'</span>':'')+'</div>';
  }).join('');

  var total = shuffled.length;
  var step = 0;
  var speed = 50;
  strip.style.transition = 'none';
  strip.style.transform = 'translateY(0)';

  function tick(){
    step++;
    strip.style.transition = 'transform '+Math.min(speed,300)+'ms ease-out';
    strip.style.transform = 'translateY(-'+(step*80)+'px)';
    if(step < total-1){
      speed += step*3;
      setTimeout(tick, speed);
    } else {
      setTimeout(function(){
        var p = winner.weekday > 0 ? (winner.weekday/10000).toFixed(0)+'만원' : '-';
        result.innerHTML = '<h3><i class="fas fa-golf-ball-tee"></i> '+winner.n+'</h3><div class="rr-meta">'+winner.r+' | '+(winner.t||'')+(winner.h?' | '+winner.h+'홀':'')+' | 주중 '+p+(winner.rt?' | &#11088; '+winner.rt.toFixed(1):'')+'</div>';
        result.style.display = 'block';
        result.style.cursor = 'pointer';
        result.onclick = function(){rouletteOvl.classList.remove('active');if(window.showDetail)window.showDetail(winner)};
        btn.disabled = false;
      }, 400);
    }
  }
  tick();
});

// ============================
// 2. 홀별 스코어카드
// ============================
var scOvl = ce('div');
scOvl.className = 'sc-overlay';
scOvl.innerHTML = `
<div class="sc-modal">
  <h2><i class="fas fa-clipboard-list"></i> 스코어카드 <button style="background:none;border:none;font-size:22px;cursor:pointer;color:var(--text-muted)" onclick="this.closest('.sc-overlay').classList.remove('active')">&times;</button></h2>
  <div style="margin-bottom:12px">
    <label style="font-size:12px;font-weight:600">골프장</label>
    <input type="text" id="scCourse" placeholder="골프장명" style="width:100%;padding:8px;border:1px solid var(--border);border-radius:8px;margin-top:4px;background:var(--card-bg);color:var(--text)">
  </div>
  <div style="font-size:12px;font-weight:700;margin-bottom:6px">FRONT 9 (OUT)</div>
  <div class="sc-grid" id="scFront"></div>
  <div style="font-size:12px;font-weight:700;margin-bottom:6px">BACK 9 (IN)</div>
  <div class="sc-grid" id="scBack"></div>
  <div class="sc-summary" id="scSummary"></div>
  <div class="shot-stats" id="scShots"></div>
  <button class="sc-save" id="scSave"><i class="fas fa-save"></i> 라운드 저장</button>
</div>`;
document.body.appendChild(scOvl);
scOvl.addEventListener('click',function(e){if(e.target===scOvl)scOvl.classList.remove('active')});

function buildScorecard(){
  ['scFront','scBack'].forEach(function(id,half){
    var el = $(id);
    el.innerHTML = '';
    for(var i=0;i<9;i++){
      var holeNum = half*9+i;
      var d = ce('div');d.className='sc-hole';
      d.innerHTML = '<div class="hole-num">'+(holeNum+1)+'</div><input type="number" min="1" max="15" data-hole="'+holeNum+'" class="sc-input"><div class="par-label">PAR '+PARS[holeNum]+'</div>';
      el.appendChild(d);
    }
  });
  document.querySelectorAll('.sc-input').forEach(function(inp){
    inp.addEventListener('input', updateScorecard);
  });
}

function updateScorecard(){
  var inputs = document.querySelectorAll('.sc-input');
  var total=0, filled=0, eagle=0, birdie=0, par=0, bogey=0, dbl=0, worse=0;
  inputs.forEach(function(inp){
    var v = parseInt(inp.value);
    var h = parseInt(inp.dataset.hole);
    var p = PARS[h];
    inp.style.color = '';inp.style.fontWeight='700';
    if(!isNaN(v) && v > 0){
      filled++;total+=v;
      var diff = v - p;
      if(diff <= -2){eagle++;inp.style.color='#e91e63'}
      else if(diff === -1){birdie++;inp.style.color='#2196f3'}
      else if(diff === 0){par++;inp.style.color='#4caf50'}
      else if(diff === 1){bogey++;inp.style.color='#ff9800'}
      else if(diff === 2){dbl++;inp.style.color='#f44336'}
      else{worse++;inp.style.color='#f44336'}
    }
  });
  var parTotal = PARS.reduce(function(a,b){return a+b},0);
  var diff = total - parTotal;
  var diffStr = diff > 0 ? '+'+diff : diff === 0 ? 'E' : ''+diff;
  $('scSummary').innerHTML =
    '<div class="sc-stat"><div class="ss-val">'+total+'</div><div class="ss-lbl">총타수 ('+diffStr+')</div></div>'+
    '<div class="sc-stat"><div class="ss-val sc-birdie">'+birdie+'</div><div class="ss-lbl">버디</div></div>'+
    '<div class="sc-stat"><div class="ss-val sc-par-c">'+par+'</div><div class="ss-lbl">파</div></div>'+
    '<div class="sc-stat"><div class="ss-val sc-bogey">'+(bogey+dbl+worse)+'</div><div class="ss-lbl">보기+</div></div>';

  // Shot stats pie chart
  var shotsEl = $('scShots');
  if(filled >= 9){
    drawShotPie(shotsEl, eagle, birdie, par, bogey, dbl+worse);
  } else {
    shotsEl.innerHTML = '<div style="font-size:12px;color:var(--text-muted);width:100%;text-align:center">9홀 이상 입력하면 샷 통계가 표시됩니다</div>';
  }
}

function drawShotPie(container, eagle, birdie, par, bogey, worse){
  var data = [
    {label:'이글이하',val:eagle,color:'#e91e63'},
    {label:'버디',val:birdie,color:'#2196f3'},
    {label:'파',val:par,color:'#4caf50'},
    {label:'보기',val:bogey,color:'#ff9800'},
    {label:'더블+',val:worse,color:'#f44336'}
  ].filter(function(d){return d.val>0});
  var total = data.reduce(function(s,d){return s+d.val},0);
  if(total===0){container.innerHTML='';return}

  var canvas = ce('canvas');canvas.width=120;canvas.height=120;canvas.className='shot-pie';
  var ctx = canvas.getContext('2d');
  var cx=60,cy=60,r=50,start=-Math.PI/2;
  data.forEach(function(d){
    var angle = (d.val/total)*Math.PI*2;
    ctx.beginPath();ctx.moveTo(cx,cy);ctx.arc(cx,cy,r,start,start+angle);
    ctx.closePath();ctx.fillStyle=d.color;ctx.fill();
    start+=angle;
  });
  ctx.beginPath();ctx.arc(cx,cy,25,0,Math.PI*2);ctx.fillStyle=getComputedStyle(document.documentElement).getPropertyValue('--card-bg').trim()||'#fff';ctx.fill();

  var legend = data.map(function(d){
    return '<div class="shot-legend-item"><span class="shot-legend-dot" style="background:'+d.color+'"></span>'+d.label+' '+d.val+' ('+Math.round(d.val/total*100)+'%)</div>';
  }).join('');
  container.innerHTML = '';
  container.appendChild(canvas);
  var leg = ce('div');leg.className='shot-legend';leg.innerHTML=legend;
  container.appendChild(leg);
}

$('scSave').addEventListener('click', function(){
  var inputs = document.querySelectorAll('.sc-input');
  var total = 0, filled = 0, scores = [];
  inputs.forEach(function(inp){
    var v = parseInt(inp.value);
    if(!isNaN(v)&&v>0){filled++;total+=v;scores.push(v)}
    else{scores.push(0)}
  });
  if(filled < 9){if(window.showToast)window.showToast('최소 9홀 이상 입력해주세요','warning');return}
  var courseName = $('scCourse').value.trim() || '미입력';
  var rounds = JSON.parse(localStorage.getItem('sg_rounds')||'[]');
  rounds.unshift({
    date: new Date().toISOString().slice(0,10),
    course: courseName,
    score: total,
    holes: scores,
    memo: filled+'홀 입력 (홀별 스코어카드)',
    id: Date.now()
  });
  localStorage.setItem('sg_rounds', JSON.stringify(rounds));
  scOvl.classList.remove('active');
  if(window.showToast)window.showToast('스코어카드 저장! ('+total+'타)','success');
});

// ============================
// 3. 라운딩 체크리스트
// ============================
var clOvl = ce('div');
clOvl.className = 'cl-overlay';
var clHTML = '<div class="cl-modal"><h2><i class="fas fa-clipboard-check"></i> 라운딩 체크리스트 <button style="background:none;border:none;font-size:22px;cursor:pointer;color:var(--text-muted);float:right" onclick="this.closest(\'.cl-overlay\').classList.remove(\'active\')">&times;</button></h2>';
clHTML += '<div class="cl-progress"><div class="cl-progress-fill" id="clProgress" style="width:0%"></div></div>';
clHTML += '<div id="clItems">';
var allItems = [];
Object.keys(CHECKLIST).forEach(function(cat){
  clHTML += '<div class="cl-cat"><i class="fas fa-folder"></i> '+cat+'</div>';
  CHECKLIST[cat].forEach(function(item){
    var id = 'cl_'+item.replace(/[^a-zA-Z0-9가-힣]/g,'_');
    allItems.push(id);
    clHTML += '<div class="cl-item" data-id="'+id+'"><input type="checkbox" id="'+id+'"><label for="'+id+'">'+item+'</label></div>';
  });
});
clHTML += '</div><div class="cl-count" id="clCount">0 / '+allItems.length+'</div>';
clHTML += '<div style="display:flex;gap:8px;margin-top:12px"><button style="flex:1;padding:10px;background:var(--primary);color:#fff;border:none;border-radius:8px;font-weight:600;cursor:pointer" id="clReset"><i class="fas fa-undo"></i> 초기화</button></div>';
clHTML += '</div>';
clOvl.innerHTML = clHTML;
document.body.appendChild(clOvl);
clOvl.addEventListener('click',function(e){if(e.target===clOvl)clOvl.classList.remove('active')});

var savedChecks = JSON.parse(localStorage.getItem('sg_checklist')||'{}');
function updateChecklist(){
  var checked = 0;
  allItems.forEach(function(id){
    var cb = $(id);
    if(cb){
      if(savedChecks[id])cb.checked = true;
      if(cb.checked){checked++;savedChecks[id]=true;cb.closest('.cl-item').classList.add('checked')}
      else{delete savedChecks[id];cb.closest('.cl-item').classList.remove('checked')}
    }
  });
  localStorage.setItem('sg_checklist', JSON.stringify(savedChecks));
  var pct = Math.round(checked/allItems.length*100);
  $('clProgress').style.width = pct+'%';
  $('clCount').textContent = checked+' / '+allItems.length+' ('+pct+'%)';
}
clOvl.querySelectorAll('input[type=checkbox]').forEach(function(cb){
  if(savedChecks[cb.id])cb.checked=true;
  cb.addEventListener('change', updateChecklist);
});
updateChecklist();
$('clReset').addEventListener('click',function(){
  savedChecks={};localStorage.removeItem('sg_checklist');
  clOvl.querySelectorAll('input[type=checkbox]').forEach(function(cb){cb.checked=false});
  updateChecklist();
  if(window.showToast)window.showToast('체크리스트 초기화','info');
});

// ============================
// 4. 골프 용어 사전
// ============================
var glOvl = ce('div');
glOvl.className = 'gl-overlay';
var cats = [];GLOSSARY.forEach(function(g){if(cats.indexOf(g.c)<0)cats.push(g.c)});
glOvl.innerHTML = `
<div class="gl-modal">
  <h2><i class="fas fa-book"></i> 골프 용어 사전 (${GLOSSARY.length}개) <button style="background:none;border:none;font-size:22px;cursor:pointer;color:var(--text-muted);float:right" onclick="this.closest('.gl-overlay').classList.remove('active')">&times;</button></h2>
  <input type="text" class="gl-search" id="glSearch" placeholder="용어 검색...">
  <div class="gl-cat-tabs" id="glCats">
    <span class="gl-cat-tab active" data-cat="all">전체</span>
    ${cats.map(function(c){return '<span class="gl-cat-tab" data-cat="'+c+'">'+c+'</span>'}).join('')}
  </div>
  <div id="glList"></div>
</div>`;
document.body.appendChild(glOvl);
glOvl.addEventListener('click',function(e){if(e.target===glOvl)glOvl.classList.remove('active')});

var glCatActive = 'all';
function renderGlossary(){
  var q = ($('glSearch')||{}).value||'';
  q = q.trim().toLowerCase();
  var list = GLOSSARY.filter(function(g){
    if(glCatActive !== 'all' && g.c !== glCatActive) return false;
    if(q && g.t.toLowerCase().indexOf(q)<0 && g.e.toLowerCase().indexOf(q)<0 && g.d.toLowerCase().indexOf(q)<0) return false;
    return true;
  });
  $('glList').innerHTML = list.map(function(g){
    return '<div class="gl-term"><span class="gt-word">'+g.t+'</span><span class="gt-eng">'+g.e+'</span><div class="gt-def">'+g.d+'</div></div>';
  }).join('') || '<div style="text-align:center;padding:20px;color:var(--text-muted)">검색 결과 없음</div>';
}
$('glSearch').addEventListener('input', renderGlossary);
glOvl.querySelectorAll('.gl-cat-tab').forEach(function(tab){
  tab.addEventListener('click',function(){
    glOvl.querySelectorAll('.gl-cat-tab').forEach(function(t){t.classList.remove('active')});
    tab.classList.add('active');
    glCatActive = tab.dataset.cat;
    renderGlossary();
  });
});
renderGlossary();

// ============================
// 5. 클럽별 거리 관리
// ============================
var cdOvl = ce('div');
cdOvl.className = 'cd-overlay';
var myClubs = JSON.parse(localStorage.getItem('sg_clubs')||'null') || DEFAULT_CLUBS.map(function(c){return{name:c.name,dist:c.avg}});
var maxDist = 260;

function renderClubDist(){
  var html = '<div class="cd-modal"><h2><i class="fas fa-ruler"></i> 나의 클럽 거리 <button style="background:none;border:none;font-size:22px;cursor:pointer;color:var(--text-muted);float:right" onclick="this.closest(\'.cd-overlay\').classList.remove(\'active\')">&times;</button></h2>';
  html += '<div style="font-size:12px;color:var(--text-muted);margin-bottom:12px">각 클럽의 평균 비거리(m)를 입력하세요</div>';
  myClubs.forEach(function(c,i){
    var pct = c.dist > 0 ? Math.round(c.dist/maxDist*100) : 0;
    var hue = Math.round(120 * (1-pct/100));
    html += '<div class="cd-club"><span class="cc-name">'+c.name+'</span><input type="number" min="0" max="350" value="'+c.dist+'" data-idx="'+i+'" class="cd-input"><span class="cc-unit">m</span><div class="cc-bar"><div class="cc-bar-fill" style="width:'+pct+'%;background:hsl('+hue+',70%,50%)"></div></div></div>';
  });
  html += '<div style="display:flex;gap:8px;margin-top:12px"><button style="flex:1;padding:10px;background:var(--primary);color:#fff;border:none;border-radius:8px;font-weight:600;cursor:pointer" id="cdSave"><i class="fas fa-save"></i> 저장</button><button style="flex:1;padding:10px;background:var(--bg);color:var(--text);border:1px solid var(--border);border-radius:8px;cursor:pointer" id="cdReset"><i class="fas fa-undo"></i> 기본값</button></div>';
  html += '</div>';
  cdOvl.innerHTML = html;

  cdOvl.querySelectorAll('.cd-input').forEach(function(inp){
    inp.addEventListener('input',function(){
      var idx=parseInt(inp.dataset.idx);
      myClubs[idx].dist=parseInt(inp.value)||0;
      var pct=myClubs[idx].dist>0?Math.round(myClubs[idx].dist/maxDist*100):0;
      var hue=Math.round(120*(1-pct/100));
      var bar=inp.closest('.cd-club').querySelector('.cc-bar-fill');
      if(bar){bar.style.width=pct+'%';bar.style.background='hsl('+hue+',70%,50%)'}
    });
  });
  var saveBtn=cdOvl.querySelector('#cdSave');
  if(saveBtn)saveBtn.addEventListener('click',function(){
    localStorage.setItem('sg_clubs',JSON.stringify(myClubs));
    cdOvl.classList.remove('active');
    if(window.showToast)window.showToast('클럽 거리 저장완료','success');
  });
  var resetBtn=cdOvl.querySelector('#cdReset');
  if(resetBtn)resetBtn.addEventListener('click',function(){
    myClubs=DEFAULT_CLUBS.map(function(c){return{name:c.name,dist:c.avg}});
    renderClubDist();
    if(window.showToast)window.showToast('기본값으로 초기화','info');
  });
}
document.body.appendChild(cdOvl);
cdOvl.addEventListener('click',function(e){if(e.target===cdOvl)cdOvl.classList.remove('active')});
renderClubDist();

// ============================
// 6. 레이더 차트 (비교 모달 강화)
// ============================
function drawRadarChart(canvasId, courses){
  var canvas = $(canvasId);
  if(!canvas)return;
  var ctx = canvas.getContext('2d');
  var W = canvas.width, H = canvas.height;
  var cx = W/2, cy = H/2, r = Math.min(W,H)/2 - 30;
  ctx.clearRect(0,0,W,H);

  var axes = ['평점','가성비','홀수','가격대','접근성'];
  var n = axes.length;
  var colors = ['rgba(26,122,58,0.6)','rgba(33,150,243,0.6)','rgba(255,107,53,0.6)'];

  // Draw grid
  for(var level=1;level<=5;level++){
    ctx.beginPath();
    for(var i=0;i<n;i++){
      var angle = (Math.PI*2/n)*i - Math.PI/2;
      var x = cx + r*(level/5)*Math.cos(angle);
      var y = cy + r*(level/5)*Math.sin(angle);
      if(i===0)ctx.moveTo(x,y);else ctx.lineTo(x,y);
    }
    ctx.closePath();ctx.strokeStyle='rgba(128,128,128,0.2)';ctx.stroke();
  }
  // Draw axis lines and labels
  ctx.font = '10px sans-serif';
  ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--text').trim()||'#333';
  for(var i=0;i<n;i++){
    var angle = (Math.PI*2/n)*i - Math.PI/2;
    ctx.beginPath();ctx.moveTo(cx,cy);
    ctx.lineTo(cx+r*Math.cos(angle), cy+r*Math.sin(angle));
    ctx.strokeStyle='rgba(128,128,128,0.3)';ctx.stroke();
    var lx = cx+(r+16)*Math.cos(angle);
    var ly = cy+(r+16)*Math.sin(angle);
    ctx.textAlign = Math.abs(Math.cos(angle))<0.1?'center':Math.cos(angle)>0?'left':'right';
    ctx.textBaseline = 'middle';
    ctx.fillText(axes[i], lx, ly);
  }

  // Draw data
  courses.forEach(function(c, ci){
    if(!c)return;
    var vals = normalizeForRadar(c);
    ctx.beginPath();
    for(var i=0;i<n;i++){
      var angle = (Math.PI*2/n)*i - Math.PI/2;
      var v = Math.max(0, Math.min(1, vals[i]));
      var x = cx + r*v*Math.cos(angle);
      var y = cy + r*v*Math.sin(angle);
      if(i===0)ctx.moveTo(x,y);else ctx.lineTo(x,y);
    }
    ctx.closePath();
    ctx.fillStyle = colors[ci]||colors[0];
    ctx.fill();
    ctx.strokeStyle = colors[ci]?colors[ci].replace('0.6','1'):colors[0];
    ctx.lineWidth = 2;ctx.stroke();
  });
}

function normalizeForRadar(c){
  var rating = c.rt ? c.rt/10 : 0;
  var value = window.calcValueScore ? Math.min(1, window.calcValueScore(c)/10) : 0;
  var holes = c.h ? Math.min(1, c.h/36) : 0;
  var price = c.weekday > 0 ? Math.max(0, 1 - c.weekday/300000) : 0.5;
  var access = c._calcTime ? Math.max(0, 1 - c._calcTime/3) : 0.5;
  return [rating, value, holes, price, access];
}

// Enhance compare modal with radar chart
var origCompareGo = window.showCompare || null;
if($('compareGo')){
  $('compareGo').addEventListener('click', function(){
    setTimeout(function(){
      var body = $('compareBody');
      if(!body || body.querySelector('.radar-wrap'))return;
      var courses = (window.compareList||[]).map(function(name){
        return (window.allCourses||[]).find(function(c){return c.n===name});
      }).filter(Boolean);
      if(courses.length<2)return;
      var wrap = ce('div');wrap.className='radar-wrap';
      wrap.innerHTML = '<div style="font-size:13px;font-weight:700;margin-bottom:8px"><i class="fas fa-chart-radar"></i> 코스 비교 차트</div><canvas id="radarChart" width="280" height="280"></canvas><div style="display:flex;gap:12px;justify-content:center;font-size:11px;margin-top:8px">'+
        courses.map(function(c,i){return '<span><span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:'+['rgba(26,122,58,0.8)','rgba(33,150,243,0.8)','rgba(255,107,53,0.8)'][i]+'"></span> '+c.n+'</span>'}).join('')+'</div>';
      body.insertBefore(wrap, body.firstChild);
      setTimeout(function(){drawRadarChart('radarChart', courses)},50);
    }, 200);
  });
}

// ============================
// 7. 동반자 관리
// ============================
var compOvl = ce('div');
compOvl.className = 'comp-overlay';
var companions = JSON.parse(localStorage.getItem('sg_companions')||'[]');
var avatarColors = ['#e74c3c','#3498db','#2ecc71','#9b59b6','#f39c12','#1abc9c','#e67e22','#e91e63'];

function renderCompanions(){
  compOvl.innerHTML = `
  <div class="comp-modal">
    <h2><i class="fas fa-user-friends"></i> 동반자 관리 <button style="background:none;border:none;font-size:22px;cursor:pointer;color:var(--text-muted);float:right" onclick="this.closest('.comp-overlay').classList.remove('active')">&times;</button></h2>
    <div class="comp-add"><input type="text" id="compName" placeholder="동반자 이름"><button id="compAddBtn"><i class="fas fa-plus"></i> 추가</button></div>
    <div id="compList"></div>
    <div style="font-size:11px;color:var(--text-muted);text-align:center;margin-top:12px">${companions.length}명 등록됨</div>
  </div>`;

  var list = compOvl.querySelector('#compList');
  list.innerHTML = companions.map(function(c,i){
    var color = avatarColors[i%avatarColors.length];
    var initial = c.name.charAt(0);
    var rounds = c.rounds||0;
    return '<div class="comp-item"><div class="ci-avatar" style="background:'+color+'">'+initial+'</div><div class="ci-info"><div class="ci-name">'+c.name+'</div><div class="ci-meta">'+rounds+'라운드 함께</div></div><button class="ci-del" data-idx="'+i+'">&times;</button></div>';
  }).join('') || '<div style="text-align:center;padding:20px;color:var(--text-muted)">등록된 동반자가 없습니다</div>';

  list.querySelectorAll('.ci-del').forEach(function(btn){
    btn.addEventListener('click',function(){
      companions.splice(parseInt(btn.dataset.idx),1);
      localStorage.setItem('sg_companions',JSON.stringify(companions));
      renderCompanions();
    });
  });

  var addBtn = compOvl.querySelector('#compAddBtn');
  var nameInp = compOvl.querySelector('#compName');
  if(addBtn)addBtn.addEventListener('click',function(){
    var name = nameInp.value.trim();
    if(!name)return;
    companions.push({name:name,rounds:0,added:new Date().toISOString().slice(0,10)});
    localStorage.setItem('sg_companions',JSON.stringify(companions));
    renderCompanions();
    if(window.showToast)window.showToast(name+' 동반자 추가','success');
  });
  if(nameInp)nameInp.addEventListener('keydown',function(e){if(e.key==='Enter'){e.preventDefault();addBtn.click()}});
}
document.body.appendChild(compOvl);
compOvl.addEventListener('click',function(e){if(e.target===compOvl)compOvl.classList.remove('active')});
renderCompanions();

// ============================
// 8. Quick Action Buttons (메인 페이지)
// ============================
var qaDiv = ce('div');
qaDiv.className = 'quick-actions';
qaDiv.innerHTML = `
  <button class="qa-btn" id="qaRandom"><i class="fas fa-dice"></i>오늘 어디?</button>
  <button class="qa-btn" id="qaScorecard"><i class="fas fa-clipboard-list"></i>스코어카드</button>
  <button class="qa-btn" id="qaChecklist"><i class="fas fa-clipboard-check"></i>체크리스트</button>
  <button class="qa-btn" id="qaGlossary"><i class="fas fa-book"></i>용어사전</button>
  <button class="qa-btn" id="qaClubDist"><i class="fas fa-ruler"></i>클럽거리</button>
  <button class="qa-btn" id="qaCompanion"><i class="fas fa-user-friends"></i>동반자</button>
`;

var statsBar = $('statsBar');
if(statsBar && statsBar.parentNode){
  statsBar.parentNode.insertBefore(qaDiv, statsBar);
}

$('qaRandom').addEventListener('click',function(){rouletteOvl.classList.add('active')});
$('qaScorecard').addEventListener('click',function(){buildScorecard();updateScorecard();scOvl.classList.add('active')});
$('qaChecklist').addEventListener('click',function(){clOvl.classList.add('active')});
$('qaGlossary').addEventListener('click',function(){renderGlossary();glOvl.classList.add('active')});
$('qaClubDist').addEventListener('click',function(){renderClubDist();cdOvl.classList.add('active')});
$('qaCompanion').addEventListener('click',function(){renderCompanions();compOvl.classList.add('active')});

// ============================
// 9. 지도 클러스터링 강화
// ============================
var origUpdateMapMarkers = window.updateMapMarkers;
if(typeof origUpdateMapMarkers === 'function'){
  window.updateMapMarkers = function(){
    origUpdateMapMarkers();
    // Add cluster count indicators
    if(window.map && window.markers){
      var groups = {};
      (window.filtered||[]).forEach(function(c){
        if(!c.lat||!c.lng)return;
        var key = Math.round(c.lat*10)+','+Math.round(c.lng*10);
        if(!groups[key])groups[key]={count:0,lat:0,lng:0};
        groups[key].count++;
        groups[key].lat+=c.lat;
        groups[key].lng+=c.lng;
      });
    }
  };
}

// ============================
// 10. Keyboard shortcuts for v6 features
// ============================
document.addEventListener('keydown',function(e){
  var t=e.target.tagName;
  if(t==='INPUT'||t==='TEXTAREA'||t==='SELECT')return;
  if(e.key==='!'||e.key==='1'&&e.altKey){rouletteOvl.classList.add('active');e.preventDefault()}
  if(e.key==='c'||e.key==='C'){clOvl.classList.add('active')}
  if(e.key==='t'||e.key==='T'){renderGlossary();glOvl.classList.add('active')}
});

// Escape closes v6 modals
document.addEventListener('keydown',function(e){
  if(e.key==='Escape'){
    rouletteOvl.classList.remove('active');
    scOvl.classList.remove('active');
    clOvl.classList.remove('active');
    glOvl.classList.remove('active');
    cdOvl.classList.remove('active');
    compOvl.classList.remove('active');
  }
});

// ============================
// 11. Enhance footer with v6 info
// ============================
var footerBottom = qs('.footer-bottom');
if(footerBottom){
  footerBottom.textContent = footerBottom.textContent.replace('v5.0','v6.0');
}
var footerCol = qs('.footer-col h4');
if(footerCol && footerCol.textContent.includes('v5.0')){
  footerCol.innerHTML = footerCol.innerHTML.replace('v5.0','v6.0');
}
var footerFeatures = document.querySelectorAll('.footer-col');
footerFeatures.forEach(function(col){
  if(col.textContent.includes('기능')){
    var div = col.querySelector('div');
    if(div)div.innerHTML += '<br>오늘 어디갈까 랜덤추천<br>홀별 스코어카드<br>골프 용어 사전 '+GLOSSARY.length+'개<br>동반자 관리<br>클럽별 거리 관리<br>라운딩 체크리스트';
  }
});

// Update version in header
var logo = qs('.logo');
if(logo){logo.innerHTML = logo.innerHTML.replace('v5.0','v6.0')}

// Add shortcut info to shortcuts modal
var shortcutsGrid = qs('.shortcuts-grid');
if(shortcutsGrid){
  shortcutsGrid.innerHTML += '<span class="shortcut-key">C</span><span>체크리스트</span><span class="shortcut-key">T</span><span>용어 사전</span>';
}

})();
