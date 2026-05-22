(function(){
'use strict';

// === SmartGolf v9.0 Patch ===
// 1. 라운드 플래너 (날짜/인원/예산 기반 코스 자동추천+일정생성)
// 2. 스코어 분석 AI (라운드 데이터 패턴분석+약점파악+맞춤 드릴 추천)
// 3. 골프 피팅 시뮬레이터 (신장/스윙속도/핸디캡 기반 클럽 스펙 추천)
// 4. 코스 난이도 매트릭스 (590개 코스 슬로프/레이팅 시각화)
// 5. 프로 골퍼 통계 비교 (내 스코어 vs PGA/LPGA/KPGA 평균)
// 6. 골프 영양/식단 가이드 (라운드 전중후 식단 추천)
// 7. 클럽 관리 다이어리 (그립/샤프트 교체주기+점검 알림)
// 8. 코스 포토 갤러리 (홀별 사진 업로드+뷰어)
// 9. 골프 용어 퀴즈 30문 (용어사전 연동, 등급제)
// 10. 연습장 파인더 (주변 연습장 검색+거리순)
// + Web Audio SFX 6종 + 키보드 단축키 5종

// --- CSS Injection ---
var css9 = document.createElement('style');
css9.textContent = `
/* === v9 Base === */
.v9-overlay{position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,.72);z-index:10005;display:none;align-items:center;justify-content:center;backdrop-filter:blur(7px)}
.v9-overlay.active{display:flex}
.v9-modal{background:var(--card-bg,#fff);border-radius:24px;padding:28px;width:95%;max-width:640px;max-height:92vh;overflow-y:auto;box-shadow:0 30px 100px rgba(0,0,0,.45);animation:v9Slide .4s cubic-bezier(.34,1.56,.64,1)}
@keyframes v9Slide{from{opacity:0;transform:translateY(40px) scale(.95)}to{opacity:1;transform:translateY(0) scale(1)}}
.v9-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:20px}
.v9-header h2{font-size:21px;font-weight:800;display:flex;align-items:center;gap:10px}
.v9-header h2 .v9-icon{font-size:26px}
.v9-close{background:none;border:none;font-size:26px;cursor:pointer;color:var(--text-muted);padding:4px 10px;border-radius:10px;transition:.2s}
.v9-close:hover{background:var(--border);color:var(--text)}
.v9-tabs{display:flex;gap:6px;margin-bottom:18px;overflow-x:auto;padding-bottom:4px;scrollbar-width:none}
.v9-tabs::-webkit-scrollbar{display:none}
.v9-tab{padding:9px 18px;border-radius:24px;border:1.5px solid var(--border);background:var(--bg);font-size:12px;font-weight:700;cursor:pointer;white-space:nowrap;transition:.25s}
.v9-tab.active{background:var(--primary);color:#fff;border-color:var(--primary);box-shadow:0 3px 12px rgba(26,122,58,.35)}
.v9-card{background:var(--bg);border-radius:16px;padding:18px;margin-bottom:12px;transition:.25s;border:1.5px solid transparent}
.v9-card:hover{border-color:var(--primary);transform:translateY(-2px);box-shadow:0 4px 16px rgba(26,122,58,.12)}
.v9-card h4{font-size:15px;font-weight:700;margin-bottom:8px;display:flex;align-items:center;gap:8px}
.v9-card p{font-size:12px;color:var(--text-muted);line-height:1.6}
.v9-btn{padding:11px 22px;border:none;border-radius:14px;font-size:13px;font-weight:700;cursor:pointer;transition:.25s}
.v9-btn-primary{background:linear-gradient(135deg,var(--primary),#34a853);color:#fff}
.v9-btn-primary:hover{transform:translateY(-2px);box-shadow:0 8px 20px rgba(26,122,58,.4)}
.v9-btn-secondary{background:var(--bg);color:var(--text);border:1.5px solid var(--border)}
.v9-btn-secondary:hover{border-color:var(--primary);color:var(--primary)}
.v9-input{width:100%;padding:11px 16px;border:2px solid var(--border);border-radius:12px;font-size:13px;background:var(--bg);color:var(--text);transition:.2s}
.v9-input:focus{border-color:var(--primary);outline:none;box-shadow:0 0 0 3px rgba(26,122,58,.1)}
.v9-select{width:100%;padding:11px 16px;border:2px solid var(--border);border-radius:12px;font-size:13px;background:var(--bg);color:var(--text);cursor:pointer;appearance:none;-webkit-appearance:none}
.v9-label{display:block;font-size:12px;font-weight:700;color:var(--text-muted);margin-bottom:6px;text-transform:uppercase;letter-spacing:.5px}
.v9-grid2{display:grid;grid-template-columns:1fr 1fr;gap:12px}
.v9-grid3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px}
@media(max-width:500px){.v9-grid2,.v9-grid3{grid-template-columns:1fr}}
.v9-divider{height:1px;background:var(--border);margin:18px 0}
.v9-badge{display:inline-block;padding:4px 12px;border-radius:14px;font-size:11px;font-weight:700}
.v9-badge-green{background:#e8f5e9;color:#2e7d32}
.v9-badge-blue{background:#e3f2fd;color:#1565c0}
.v9-badge-orange{background:#fff3e0;color:#e65100}
.v9-badge-red{background:#fce4ec;color:#c62828}
.v9-badge-purple{background:#f3e5f5;color:#7b1fa2}
.v9-badge-gold{background:linear-gradient(135deg,#fff8e1,#ffe082);color:#5a3e00}
[data-theme="dark"] .v9-badge-green{background:#1a3a25;color:#7bed9f}
[data-theme="dark"] .v9-badge-blue{background:#1a2a3a;color:#7ab8f5}
[data-theme="dark"] .v9-badge-orange{background:#3a2a1a;color:#f0c070}
[data-theme="dark"] .v9-badge-red{background:#3a1a1a;color:#ff8a80}
[data-theme="dark"] .v9-badge-purple{background:#2a1a3a;color:#ce93d8}
[data-theme="dark"] .v9-badge-gold{background:#3a3000;color:#ffd54f}
.v9-progress{width:100%;height:10px;background:var(--border);border-radius:5px;overflow:hidden;margin:10px 0}
.v9-progress-fill{height:100%;border-radius:5px;background:linear-gradient(90deg,var(--primary),#7bed9f);transition:width .5s ease}
.v9-stat-row{display:flex;align-items:center;gap:12px;padding:12px;border-radius:14px;background:var(--bg);margin-bottom:8px}
.v9-stat-row .v9-sr-icon{width:44px;height:44px;border-radius:14px;display:flex;align-items:center;justify-content:center;font-size:22px;flex-shrink:0}
.v9-stat-row .v9-sr-text{flex:1}
.v9-stat-row .v9-sr-title{font-weight:700;font-size:14px}
.v9-stat-row .v9-sr-sub{font-size:11px;color:var(--text-muted);margin-top:2px}
.v9-stat-row .v9-sr-val{font-weight:800;font-size:18px;color:var(--primary)}
.v9-chart-wrap{background:var(--bg);border-radius:14px;padding:16px;margin:12px 0}
.v9-chart-wrap canvas{width:100%;height:160px}
.v9-quiz-option{display:block;width:100%;padding:14px 18px;border:2px solid var(--border);border-radius:14px;background:var(--bg);font-size:13px;font-weight:600;cursor:pointer;transition:.2s;margin-bottom:8px;text-align:left;color:var(--text)}
.v9-quiz-option:hover{border-color:var(--primary);background:var(--primary-light)}
.v9-quiz-option.correct{border-color:#4caf50;background:#e8f5e9;color:#2e7d32}
.v9-quiz-option.wrong{border-color:#e53935;background:#fce4ec;color:#c62828}
[data-theme="dark"] .v9-quiz-option.correct{background:#1a3a25;color:#7bed9f}
[data-theme="dark"] .v9-quiz-option.wrong{background:#3a1a1a;color:#ff8a80}
.v9-photo-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}
.v9-photo-cell{aspect-ratio:4/3;border-radius:12px;overflow:hidden;background:var(--border);position:relative;cursor:pointer;transition:.2s}
.v9-photo-cell:hover{transform:scale(1.03)}
.v9-photo-cell canvas{width:100%;height:100%;object-fit:cover}
.v9-photo-cell .v9-ph-label{position:absolute;bottom:0;left:0;right:0;background:linear-gradient(transparent,rgba(0,0,0,.7));color:#fff;padding:6px 10px;font-size:10px;font-weight:700}

/* Quick Actions v9 row */
.v9-quick-row{display:flex;gap:8px;flex-wrap:wrap;justify-content:center;margin:8px 0}
.v9-qbtn{display:flex;flex-direction:column;align-items:center;gap:4px;padding:11px 14px;border-radius:14px;background:var(--card-bg);border:1.5px solid var(--border);cursor:pointer;transition:.25s;font-size:10px;font-weight:700;color:var(--text);min-width:68px;text-align:center}
.v9-qbtn:hover{border-color:var(--primary);background:var(--primary-light);transform:translateY(-3px);box-shadow:0 6px 16px rgba(26,122,58,.18)}
.v9-qbtn .v9-qi{font-size:24px;line-height:1}

/* Nutrition cards */
.v9-nutrition-card{background:var(--bg);border-radius:14px;padding:16px;margin-bottom:10px;border-left:4px solid var(--primary)}
.v9-nutrition-card h5{font-size:13px;font-weight:700;margin-bottom:6px;display:flex;align-items:center;gap:6px}
.v9-nutrition-card ul{margin:0;padding-left:18px;font-size:12px;color:var(--text-muted);line-height:1.8}

/* Fitting result */
.v9-fit-result{background:linear-gradient(135deg,#f0f8ff,#e8f5e9);border-radius:16px;padding:20px;margin:16px 0;border:1px solid #c8e6c9;text-align:center}
.v9-fit-result h3{font-size:16px;font-weight:800;color:var(--primary);margin-bottom:12px}
[data-theme="dark"] .v9-fit-result{background:linear-gradient(135deg,#1a2a20,#1e3a25);border-color:#2e5a35}

/* Difficulty matrix */
.v9-diff-bar{display:flex;align-items:center;gap:8px;margin-bottom:6px}
.v9-diff-bar .v9-db-name{font-size:11px;font-weight:600;width:100px;text-overflow:ellipsis;overflow:hidden;white-space:nowrap}
.v9-diff-bar .v9-db-track{flex:1;height:14px;background:var(--border);border-radius:7px;overflow:hidden;position:relative}
.v9-diff-bar .v9-db-fill{height:100%;border-radius:7px;transition:width .4s ease}
.v9-diff-bar .v9-db-val{font-size:11px;font-weight:700;width:40px;text-align:right}
`;
document.head.appendChild(css9);

// ====================================================================
// 1. WEB AUDIO SFX ENGINE (v9)
// ====================================================================
var v9Ctx = null;
function getV9Ctx(){
  if(!v9Ctx) try{v9Ctx=new(window.AudioContext||window.webkitAudioContext)()}catch(e){}
  return v9Ctx;
}
function v9Sfx(type){
  var ctx=getV9Ctx();if(!ctx)return;
  var o=ctx.createOscillator(),g=ctx.createGain();
  o.connect(g);g.connect(ctx.destination);
  var t=ctx.currentTime;
  switch(type){
    case 'planner':
      o.type='sine';o.frequency.setValueAtTime(523,t);o.frequency.linearRampToValueAtTime(784,t+.15);
      g.gain.setValueAtTime(.2,t);g.gain.linearRampToValueAtTime(0,t+.3);o.start(t);o.stop(t+.3);break;
    case 'analyze':
      o.type='triangle';o.frequency.setValueAtTime(660,t);o.frequency.linearRampToValueAtTime(880,t+.1);
      o.frequency.linearRampToValueAtTime(1047,t+.2);
      g.gain.setValueAtTime(.15,t);g.gain.linearRampToValueAtTime(0,t+.35);o.start(t);o.stop(t+.35);break;
    case 'quiz_correct':
      o.type='sine';o.frequency.setValueAtTime(523,t);o.frequency.setValueAtTime(659,t+.1);o.frequency.setValueAtTime(784,t+.2);
      g.gain.setValueAtTime(.2,t);g.gain.linearRampToValueAtTime(0,t+.4);o.start(t);o.stop(t+.4);break;
    case 'quiz_wrong':
      o.type='sawtooth';o.frequency.setValueAtTime(200,t);o.frequency.linearRampToValueAtTime(100,t+.3);
      g.gain.setValueAtTime(.12,t);g.gain.linearRampToValueAtTime(0,t+.35);o.start(t);o.stop(t+.35);break;
    case 'fitting':
      o.type='sine';o.frequency.setValueAtTime(440,t);
      var o2=ctx.createOscillator(),g2=ctx.createGain();o2.connect(g2);g2.connect(ctx.destination);
      o2.type='sine';o2.frequency.setValueAtTime(554,t);
      g.gain.setValueAtTime(.15,t);g.gain.linearRampToValueAtTime(0,t+.5);
      g2.gain.setValueAtTime(.12,t);g2.gain.linearRampToValueAtTime(0,t+.5);
      o.start(t);o.stop(t+.5);o2.start(t);o2.stop(t+.5);break;
    case 'photo':
      o.type='square';o.frequency.setValueAtTime(1200,t);
      g.gain.setValueAtTime(.08,t);g.gain.linearRampToValueAtTime(0,t+.08);o.start(t);o.stop(t+.1);break;
  }
}

// ====================================================================
// 2. OVERLAY HELPER
// ====================================================================
var v9Overlay = document.createElement('div');
v9Overlay.className='v9-overlay';
v9Overlay.setAttribute('role','dialog');
v9Overlay.setAttribute('aria-modal','true');
v9Overlay.innerHTML='<div class="v9-modal" id="v9ModalContent"></div>';
document.body.appendChild(v9Overlay);
v9Overlay.addEventListener('click',function(e){if(e.target===v9Overlay)v9Overlay.classList.remove('active')});

function showV9Modal(html){
  document.getElementById('v9ModalContent').innerHTML=html;
  v9Overlay.classList.add('active');
}
function closeV9(){v9Overlay.classList.remove('active')}

// ====================================================================
// 3. ROUND PLANNER (날짜/인원/예산 기반 코스 자동추천+일정생성)
// ====================================================================
function renderRoundPlanner(){
  v9Sfx('planner');
  var plans=JSON.parse(localStorage.getItem('sg_plans')||'[]');
  var html='<div class="v9-header"><h2><span class="v9-icon">&#x1F4CB;</span> 라운드 플래너</h2><button class="v9-close" onclick="closeV9()">&times;</button></div>';
  html+='<div class="v9-tabs"><button class="v9-tab active" data-pt="create">일정 생성</button><button class="v9-tab" data-pt="saved">저장된 일정 ('+plans.length+')</button><button class="v9-tab" data-pt="checklist">체크리스트</button></div>';
  html+='<div id="v9PlanCreate">';
  html+='<div class="v9-grid2">';
  html+='<div><label class="v9-label">라운드 날짜</label><input type="date" class="v9-input" id="v9PlanDate" value="'+new Date().toISOString().split('T')[0]+'"></div>';
  html+='<div><label class="v9-label">인원수</label><select class="v9-select" id="v9PlanPpl"><option value="1">1명 (솔로)</option><option value="2">2명 (투썸)</option><option value="3">3명</option><option value="4" selected>4명 (포썸)</option></select></div>';
  html+='</div><div style="height:12px"></div><div class="v9-grid2">';
  html+='<div><label class="v9-label">1인 예산 (만원)</label><input type="number" class="v9-input" id="v9PlanBudget" value="20" min="5" max="100"></div>';
  html+='<div><label class="v9-label">선호 지역</label><select class="v9-select" id="v9PlanRegion"><option value="">전국</option>';
  ['경기','강원','충북','충남','경북','경남','전북','전남','제주','인천','부산','서울'].forEach(function(r){
    html+='<option value="'+r+'">'+r+'</option>';
  });
  html+='</select></div></div><div style="height:12px"></div>';
  html+='<div class="v9-grid2"><div><label class="v9-label">선호 홀수</label><select class="v9-select" id="v9PlanHoles"><option value="0">상관없음</option><option value="9">9홀</option><option value="18" selected>18홀+</option><option value="27">27홀+</option></select></div>';
  html+='<div><label class="v9-label">선호 종류</label><select class="v9-select" id="v9PlanType"><option value="">전체</option><option value="&#xB300;&#xC911;&#xC81C;">대중제</option><option value="&#xD68C;&#xC6D0;&#xC81C;">회원제</option></select></div></div>';
  html+='<div style="height:16px"></div><button class="v9-btn v9-btn-primary" style="width:100%" onclick="v9SearchPlan()">&#x1F50D; AI 코스 추천 받기</button>';
  html+='<div id="v9PlanResults" style="margin-top:16px"></div>';
  html+='</div>';
  html+='<div id="v9PlanSaved" style="display:none"></div>';
  html+='<div id="v9PlanChecklist" style="display:none"></div>';
  showV9Modal(html);

  v9Overlay.querySelectorAll('.v9-tab').forEach(function(tab){
    tab.addEventListener('click',function(){
      v9Overlay.querySelectorAll('.v9-tab').forEach(function(t){t.classList.remove('active')});
      tab.classList.add('active');
      var v=tab.dataset.pt;
      document.getElementById('v9PlanCreate').style.display=v==='create'?'':'none';
      document.getElementById('v9PlanSaved').style.display=v==='saved'?'':'none';
      document.getElementById('v9PlanChecklist').style.display=v==='checklist'?'':'none';
      if(v==='saved') v9RenderSavedPlans();
      if(v==='checklist') v9RenderChecklist();
    });
  });
}

window.v9SearchPlan=function(){
  var date=document.getElementById('v9PlanDate').value;
  var ppl=parseInt(document.getElementById('v9PlanPpl').value);
  var budget=parseInt(document.getElementById('v9PlanBudget').value)*10000;
  var region=document.getElementById('v9PlanRegion').value;
  var holes=parseInt(document.getElementById('v9PlanHoles').value);
  var type=document.getElementById('v9PlanType').value;
  var isWeekend=false;
  if(date){var dow=new Date(date).getDay();isWeekend=dow===0||dow===6;}

  var courses=window._sgCourses||[];
  var results=courses.filter(function(c){
    if(region&&c.r!==region)return false;
    if(holes&&c.h<holes)return false;
    if(type&&c.t!==type)return false;
    var price=isWeekend?(c.weekend||c.weekday||0):(c.weekday||0);
    if(price&&price>budget)return false;
    return true;
  });

  results.sort(function(a,b){return(b.rt||0)-(a.rt||0)});
  results=results.slice(0,8);

  var el=document.getElementById('v9PlanResults');
  if(!results.length){
    el.innerHTML='<div class="v9-card" style="text-align:center"><p>&#x1F614; 조건에 맞는 코스가 없습니다. 예산이나 지역을 조정해보세요.</p></div>';
    return;
  }
  var h='<h4 style="font-size:14px;font-weight:700;margin-bottom:12px">&#x2B50; 추천 코스 '+results.length+'곳</h4>';
  results.forEach(function(c,i){
    var price=isWeekend?(c.weekend||c.weekday||0):(c.weekday||0);
    var total=price?price*ppl:0;
    h+='<div class="v9-stat-row">';
    h+='<div class="v9-sr-icon" style="background:linear-gradient(135deg,var(--primary),#34a853);color:#fff;font-size:16px;font-weight:800">'+(i+1)+'</div>';
    h+='<div class="v9-sr-text"><div class="v9-sr-title">'+c.n+'</div>';
    h+='<div class="v9-sr-sub">'+c.r+' '+c.c+' &middot; '+c.h+'홀 &middot; '+(c.t||'')+'</div></div>';
    h+='<div style="text-align:right"><div style="font-weight:800;color:var(--primary)">'+(price?Math.round(price/10000)+'만':'가격미정')+'</div>';
    if(total) h+='<div style="font-size:10px;color:var(--text-muted)">'+ppl+'인 '+(total/10000).toLocaleString()+'만</div>';
    h+='</div></div>';
  });
  h+='<div style="margin-top:12px"><button class="v9-btn v9-btn-primary" onclick="v9SavePlan()">&#x1F4BE; 일정 저장</button></div>';
  el.innerHTML=h;
  window._v9PlanResults=results;
  window._v9PlanMeta={date:date,ppl:ppl,budget:budget,region:region};
};

window.v9SavePlan=function(){
  if(!window._v9PlanResults)return;
  var plans=JSON.parse(localStorage.getItem('sg_plans')||'[]');
  plans.unshift({
    id:Date.now(),
    date:window._v9PlanMeta.date,
    ppl:window._v9PlanMeta.ppl,
    courses:window._v9PlanResults.map(function(c){return c.n}),
    created:new Date().toISOString()
  });
  if(plans.length>20) plans=plans.slice(0,20);
  localStorage.setItem('sg_plans',JSON.stringify(plans));
  v9Sfx('planner');
  if(typeof showToast==='function') showToast('일정이 저장되었습니다!','success');
};

function v9RenderSavedPlans(){
  var plans=JSON.parse(localStorage.getItem('sg_plans')||'[]');
  var el=document.getElementById('v9PlanSaved');
  if(!plans.length){el.innerHTML='<div class="v9-card" style="text-align:center"><p>저장된 일정이 없습니다.</p></div>';return;}
  var h='';
  plans.forEach(function(p,i){
    h+='<div class="v9-card"><h4>&#x1F4C5; '+p.date+' ('+p.ppl+'인)</h4>';
    h+='<p>추천 코스: '+p.courses.slice(0,3).join(', ')+(p.courses.length>3?' 외 '+(p.courses.length-3)+'곳':'')+'</p>';
    h+='<button class="v9-btn v9-btn-secondary" style="margin-top:8px;padding:6px 14px;font-size:11px" onclick="v9DeletePlan('+i+')">삭제</button></div>';
  });
  el.innerHTML=h;
}
window.v9DeletePlan=function(i){
  var plans=JSON.parse(localStorage.getItem('sg_plans')||'[]');
  plans.splice(i,1);
  localStorage.setItem('sg_plans',JSON.stringify(plans));
  v9RenderSavedPlans();
};

function v9RenderChecklist(){
  var items=[
    {icon:'&#x1F3CC;&#xFE0F;',text:'골프채 세트 (드라이버/아이언/퍼터)',key:'cl_clubs'},
    {icon:'&#x26F3;',text:'골프공 (최소 6개)',key:'cl_balls'},
    {icon:'&#x1F9E4;',text:'골프 장갑',key:'cl_glove'},
    {icon:'&#x1F455;',text:'골프웨어 (칼라 셔츠 필수)',key:'cl_wear'},
    {icon:'&#x1F45F;',text:'골프화',key:'cl_shoes'},
    {icon:'&#x1F9CA;',text:'물/음료',key:'cl_water'},
    {icon:'&#x2602;&#xFE0F;',text:'우산/우의',key:'cl_umbrella'},
    {icon:'&#x1F9F4;',text:'선크림/선글라스',key:'cl_sun'},
    {icon:'&#x1FA79;',text:'반창고/구급약',key:'cl_aid'},
    {icon:'&#x1F4B3;',text:'카드/현금 (카트비/캐디피)',key:'cl_money'},
    {icon:'&#x1F4F1;',text:'거리측정기/GPS',key:'cl_gps'},
    {icon:'&#x1F967;',text:'간식/에너지바',key:'cl_snack'}
  ];
  var checks=JSON.parse(localStorage.getItem('sg_checklist')||'{}');
  var done=items.filter(function(it){return checks[it.key]}).length;
  var el=document.getElementById('v9PlanChecklist');
  var h='<div style="text-align:center;margin-bottom:16px"><div style="font-size:14px;font-weight:700">'+done+'/'+items.length+' 완료</div>';
  h+='<div class="v9-progress"><div class="v9-progress-fill" style="width:'+Math.round(done/items.length*100)+'%"></div></div></div>';
  items.forEach(function(it){
    var ch=checks[it.key]?'checked':'';
    h+='<label class="v9-stat-row" style="cursor:pointer"><div class="v9-sr-icon" style="background:var(--primary-light);font-size:20px">'+it.icon+'</div>';
    h+='<div class="v9-sr-text"><div class="v9-sr-title" style="'+(ch?'text-decoration:line-through;opacity:.5':'')+'">'+it.text+'</div></div>';
    h+='<input type="checkbox" '+ch+' onchange="v9ToggleCheck(\''+it.key+'\')" style="width:22px;height:22px;accent-color:var(--primary)"></label>';
  });
  h+='<button class="v9-btn v9-btn-secondary" style="width:100%;margin-top:12px" onclick="v9ResetChecklist()">&#x1F504; 초기화</button>';
  el.innerHTML=h;
}
window.v9ToggleCheck=function(key){
  var checks=JSON.parse(localStorage.getItem('sg_checklist')||'{}');
  checks[key]=!checks[key];
  localStorage.setItem('sg_checklist',JSON.stringify(checks));
  v9RenderChecklist();
};
window.v9ResetChecklist=function(){
  localStorage.removeItem('sg_checklist');
  v9RenderChecklist();
};

// ====================================================================
// 4. SCORE ANALYSIS AI (라운드 패턴분석+약점파악+맞춤드릴)
// ====================================================================
function renderScoreAnalysis(){
  v9Sfx('analyze');
  var rounds=JSON.parse(localStorage.getItem('sg_rounds')||'[]');
  var html='<div class="v9-header"><h2><span class="v9-icon">&#x1F4CA;</span> 스코어 분석 AI</h2><button class="v9-close" onclick="closeV9()">&times;</button></div>';

  if(rounds.length<2){
    html+='<div class="v9-card" style="text-align:center"><p>&#x1F4DD; 최소 2개 이상의 라운드 기록이 필요합니다.<br>라운드 기록을 먼저 추가해주세요.</p></div>';
    html+='<div class="v9-divider"></div>';
  }

  var scores=rounds.map(function(r){return r.score}).filter(function(s){return s>0});
  var avg=scores.length?Math.round(scores.reduce(function(a,b){return a+b},0)/scores.length*10)/10:0;
  var best=scores.length?Math.min.apply(null,scores):0;
  var worst=scores.length?Math.max.apply(null,scores):0;
  var trend=scores.length>=3?(scores[0]-scores[scores.length-1]):0;

  html+='<div class="v9-tabs"><button class="v9-tab active" data-at="overview">종합</button><button class="v9-tab" data-at="weakness">약점분석</button><button class="v9-tab" data-at="drill">추천드릴</button><button class="v9-tab" data-at="compare">프로비교</button></div>';

  // Overview
  html+='<div id="v9AOverview"><div class="v9-grid3">';
  html+='<div class="v9-card" style="text-align:center"><div style="font-size:28px;font-weight:800;color:var(--primary)">'+(avg||'-')+'</div><div style="font-size:11px;color:var(--text-muted)">평균 스코어</div></div>';
  html+='<div class="v9-card" style="text-align:center"><div style="font-size:28px;font-weight:800;color:#1565c0">'+(best||'-')+'</div><div style="font-size:11px;color:var(--text-muted)">베스트</div></div>';
  html+='<div class="v9-card" style="text-align:center"><div style="font-size:28px;font-weight:800;color:#e65100">'+(worst||'-')+'</div><div style="font-size:11px;color:var(--text-muted)">워스트</div></div>';
  html+='</div>';

  // Trend
  html+='<div class="v9-card"><h4>&#x1F4C8; 스코어 추이</h4>';
  if(scores.length>=2){
    var trendText=trend>0?'&#x2B06;&#xFE0F; '+trend+'타 향상 추세':'&#x2B07;&#xFE0F; '+Math.abs(trend)+'타 하락 추세';
    if(trend===0)trendText='&#x27A1;&#xFE0F; 유지 추세';
    html+='<p>최근 '+scores.length+'라운드 기준: <strong>'+trendText+'</strong></p>';
    html+='<div class="v9-chart-wrap"><canvas id="v9ScoreChart"></canvas></div>';
  } else {
    html+='<p>2개 이상의 라운드 기록이 필요합니다.</p>';
  }
  html+='</div>';

  // Handicap estimate
  var hcp=avg?Math.max(0,Math.round((avg-72)*0.96)):null;
  if(hcp!==null){
    var hcClass=hcp<=9?'hc-single':hcp<=18?'hc-mid':'hc-high';
    html+='<div class="v9-card"><h4>&#x1F3F7;&#xFE0F; 추정 핸디캡</h4>';
    html+='<div style="text-align:center;margin:8px 0"><span class="handicap-badge '+hcClass+'">'+hcp+'</span></div>';
    html+='<p style="text-align:center">'+(hcp<=9?'싱글 핸디캡! 상위 10% 골퍼입니다.':hcp<=18?'중급 골퍼 수준. 꾸준한 연습으로 싱글에 도전하세요.':'초/중급 수준. 기본기 연습에 집중하세요.')+'</p></div>';
  }
  html+='</div>';

  // Weakness
  html+='<div id="v9AWeakness" style="display:none">';
  var weaknesses=[
    {area:'드라이버',icon:'&#x1F3CC;&#xFE0F;',risk:avg>90?'높음':avg>80?'보통':'양호',desc:'티샷 정확도와 비거리 안정성',tip:avg>90?'드라이버 페이스 각도 점검, 그립 재교정 필요':'현재 수준 유지, 코스 매니지먼트에 집중'},
    {area:'아이언',icon:'&#x26F3;',risk:avg>95?'높음':avg>85?'보통':'양호',desc:'세컨샷 그린 적중률',tip:avg>95?'다운스윙 경로 확인, 볼 포지션 체크':'꾸준한 연습 유지'},
    {area:'쇼트게임',icon:'&#x1F3AF;',risk:avg>88?'높음':avg>80?'보통':'양호',desc:'50야드 이내 어프로치 정확도',tip:avg>88?'피칭웨지/샌드웨지 거리감 연습, 런닝 어프로치 추가':'업다운 성공률 향상에 집중'},
    {area:'퍼팅',icon:'&#x1F3F3;&#xFE0F;',risk:avg>85?'높음':avg>78?'보통':'양호',desc:'그린 위 퍼트 수',tip:avg>85?'거리 퍼팅 연습, 에이밍 루틴 정립':'숏 퍼팅 확실히 넣기'},
    {area:'멘탈',icon:'&#x1F9E0;',risk:worst-best>15?'높음':worst-best>10?'보통':'양호',desc:'스코어 편차 (일관성)',tip:worst-best>15?'프리샷 루틴 고정, 호흡법 활용':'안정적인 플레이 유지'}
  ];
  weaknesses.forEach(function(w){
    var badgeClass=w.risk==='높음'?'v9-badge-red':w.risk==='보통'?'v9-badge-orange':'v9-badge-green';
    html+='<div class="v9-stat-row"><div class="v9-sr-icon" style="background:var(--primary-light);font-size:22px">'+w.icon+'</div>';
    html+='<div class="v9-sr-text"><div class="v9-sr-title">'+w.area+' <span class="v9-badge '+badgeClass+'">'+w.risk+'</span></div>';
    html+='<div class="v9-sr-sub">'+w.desc+'</div></div></div>';
    html+='<div style="padding:0 12px 12px;font-size:12px;color:var(--text-muted)">&#x1F4A1; '+w.tip+'</div>';
  });
  html+='</div>';

  // Drills
  html+='<div id="v9ADrill" style="display:none">';
  var drills=[
    {name:'게이트 드릴',target:'퍼팅',time:'10분',desc:'퍼터 헤드 양옆에 티를 꽂고 좁은 게이트 통과 연습. 스트로크 경로 교정.',level:'초급'},
    {name:'타올 드릴',target:'아이언',time:'15분',desc:'타올을 공 5cm 앞에 놓고 치기. 다운블로우 임팩트 훈련.',level:'초급'},
    {name:'9샷 드릴',target:'드라이버',time:'20분',desc:'3가지 탄도(높/중/낮) x 3가지 구질(페이드/스트레이트/드로우) = 9구. 다양한 샷 메이킹.',level:'중급'},
    {name:'업다운 게임',target:'쇼트게임',time:'15분',desc:'그린 주변 5곳에서 각각 칩샷 후 1퍼팅 도전. 5/5 성공 목표.',level:'초급'},
    {name:'래더 드릴',target:'퍼팅',time:'10분',desc:'3피트/6피트/9피트 연속 퍼팅. 거리감 훈련의 기본.',level:'초급'},
    {name:'시계 드릴',target:'쇼트게임',time:'20분',desc:'웨지 백스윙 길이별(7시/8시/9시/10시) 거리 파악. 거리 조절 마스터.',level:'중급'},
    {name:'1클럽 드릴',target:'전체',time:'30분',desc:'7번 아이언 하나로 9홀 라운드. 다양한 상황 대처 능력 향상.',level:'상급'},
    {name:'블라인드 퍼팅',target:'퍼팅',time:'10분',desc:'눈을 감고 퍼팅. 거리감각과 터치 감각 극대화.',level:'중급'}
  ];
  var drillTarget=avg>90?'드라이버':avg>85?'아이언':avg>80?'쇼트게임':'퍼팅';
  html+='<div class="v9-card" style="background:linear-gradient(135deg,var(--primary-light),rgba(123,237,159,.1))"><h4>&#x1F3AF; 당신을 위한 추천: '+drillTarget+' 집중 훈련</h4>';
  html+='<p>현재 평균 '+(avg||'?')+'타 기준, '+drillTarget+' 영역 개선이 가장 효과적입니다.</p></div>';
  drills.forEach(function(d){
    var lvBadge=d.level==='초급'?'v9-badge-green':d.level==='중급'?'v9-badge-blue':'v9-badge-purple';
    html+='<div class="v9-card"><h4>'+d.name+' <span class="v9-badge '+lvBadge+'">'+d.level+'</span></h4>';
    html+='<p><strong>대상:</strong> '+d.target+' | <strong>시간:</strong> '+d.time+'</p>';
    html+='<p>'+d.desc+'</p></div>';
  });
  html+='</div>';

  // Pro comparison
  html+='<div id="v9ACompare" style="display:none">';
  var proStats=[
    {tour:'PGA Tour',avg:70.5,best:58,icon:'&#x1F1FA;&#x1F1F8;'},
    {tour:'LPGA Tour',avg:71.2,best:59,icon:'&#x1F1FA;&#x1F1F8;'},
    {tour:'KPGA Tour',avg:71.8,best:61,icon:'&#x1F1F0;&#x1F1F7;'},
    {tour:'KLPGA Tour',avg:72.0,best:62,icon:'&#x1F1F0;&#x1F1F7;'},
    {tour:'아마추어 상위10%',avg:82,best:74,icon:'&#x1F3C6;'},
    {tour:'일반 아마추어',avg:100,best:85,icon:'&#x26F3;'}
  ];
  html+='<div class="v9-card" style="text-align:center"><h4>&#x1F4CA; 나의 평균: '+(avg||'?')+'타</h4></div>';
  proStats.forEach(function(p){
    var diff=avg?(avg-p.avg):0;
    var diffText=diff>0?'+'+Math.round(diff*10)/10:''+Math.round(diff*10)/10;
    var barW=avg?Math.min(100,Math.round(p.avg/avg*100)):50;
    html+='<div class="v9-diff-bar">';
    html+='<div class="v9-db-name">'+p.icon+' '+p.tour+'</div>';
    html+='<div class="v9-db-track"><div class="v9-db-fill" style="width:'+barW+'%;background:linear-gradient(90deg,'+(diff>0?'#4caf50':'#ff9800')+','+(diff>0?'#7bed9f':'#ffcc02')+')"></div></div>';
    html+='<div class="v9-db-val">'+p.avg+'</div>';
    html+='</div>';
  });
  if(avg){
    var pct=avg<=82?10:avg<=90?30:avg<=100?60:90;
    html+='<div class="v9-card" style="text-align:center;margin-top:12px"><p>당신은 전체 골퍼 중 <strong style="color:var(--primary)">상위 '+pct+'%</strong> 수준입니다.</p></div>';
  }
  html+='</div>';

  showV9Modal(html);

  // Tab switching
  v9Overlay.querySelectorAll('.v9-tab').forEach(function(tab){
    tab.addEventListener('click',function(){
      v9Overlay.querySelectorAll('.v9-tab').forEach(function(t){t.classList.remove('active')});
      tab.classList.add('active');
      var v=tab.dataset.at;
      document.getElementById('v9AOverview').style.display=v==='overview'?'':'none';
      document.getElementById('v9AWeakness').style.display=v==='weakness'?'':'none';
      document.getElementById('v9ADrill').style.display=v==='drill'?'':'none';
      document.getElementById('v9ACompare').style.display=v==='compare'?'':'none';
    });
  });

  // Draw chart
  if(scores.length>=2){
    setTimeout(function(){
      var canvas=document.getElementById('v9ScoreChart');
      if(!canvas)return;
      var ctx=canvas.getContext('2d');
      var rect=canvas.parentElement.getBoundingClientRect();
      canvas.width=rect.width;canvas.height=160;
      var pts=scores.slice().reverse().slice(-10);
      var minS=Math.min.apply(null,pts)-5;
      var maxS=Math.max.apply(null,pts)+5;
      var stepX=canvas.width/(pts.length-1||1);
      ctx.clearRect(0,0,canvas.width,canvas.height);
      // Grid
      ctx.strokeStyle='rgba(128,128,128,.15)';ctx.lineWidth=1;
      for(var g=0;g<5;g++){var gy=g/4*140+10;ctx.beginPath();ctx.moveTo(0,gy);ctx.lineTo(canvas.width,gy);ctx.stroke();}
      // Area
      ctx.beginPath();
      pts.forEach(function(s,i){
        var x=i*stepX;var y=10+(maxS-s)/(maxS-minS)*140;
        if(i===0)ctx.moveTo(x,y);else ctx.lineTo(x,y);
      });
      ctx.lineTo((pts.length-1)*stepX,150);ctx.lineTo(0,150);ctx.closePath();
      var grad=ctx.createLinearGradient(0,0,0,160);
      grad.addColorStop(0,'rgba(26,122,58,.25)');grad.addColorStop(1,'rgba(26,122,58,.02)');
      ctx.fillStyle=grad;ctx.fill();
      // Line
      ctx.beginPath();
      pts.forEach(function(s,i){
        var x=i*stepX;var y=10+(maxS-s)/(maxS-minS)*140;
        if(i===0)ctx.moveTo(x,y);else ctx.lineTo(x,y);
      });
      ctx.strokeStyle='#1a7a3a';ctx.lineWidth=2.5;ctx.stroke();
      // Points
      pts.forEach(function(s,i){
        var x=i*stepX;var y=10+(maxS-s)/(maxS-minS)*140;
        ctx.beginPath();ctx.arc(x,y,4,0,Math.PI*2);
        ctx.fillStyle='#1a7a3a';ctx.fill();
        ctx.fillStyle=getComputedStyle(document.body).color||'#333';
        ctx.font='bold 10px sans-serif';ctx.textAlign='center';
        ctx.fillText(s,x,y-10);
      });
    },100);
  }
}

// ====================================================================
// 5. GOLF FITTING SIMULATOR
// ====================================================================
function renderFittingSimulator(){
  v9Sfx('fitting');
  var html='<div class="v9-header"><h2><span class="v9-icon">&#x1F3CC;&#xFE0F;</span> 클럽 피팅 시뮬레이터</h2><button class="v9-close" onclick="closeV9()">&times;</button></div>';
  html+='<div class="v9-grid2">';
  html+='<div><label class="v9-label">신장 (cm)</label><input type="number" class="v9-input" id="v9FitHeight" value="175" min="140" max="210"></div>';
  html+='<div><label class="v9-label">손목~바닥 (cm)</label><input type="number" class="v9-input" id="v9FitWrist" value="85" min="60" max="110"></div>';
  html+='</div><div style="height:12px"></div><div class="v9-grid2">';
  html+='<div><label class="v9-label">드라이버 헤드스피드 (mph)</label><input type="number" class="v9-input" id="v9FitSpeed" value="95" min="50" max="130"></div>';
  html+='<div><label class="v9-label">핸디캡</label><input type="number" class="v9-input" id="v9FitHcp" value="18" min="0" max="54"></div>';
  html+='</div><div style="height:12px"></div>';
  html+='<div><label class="v9-label">스윙 템포</label><select class="v9-select" id="v9FitTempo"><option value="fast">빠른 (3:1 이하)</option><option value="mid" selected>보통 (3:1)</option><option value="slow">느린 (4:1 이상)</option></select></div>';
  html+='<div style="height:16px"></div><button class="v9-btn v9-btn-primary" style="width:100%" onclick="v9CalcFitting()">&#x1F527; 피팅 분석</button>';
  html+='<div id="v9FitResult"></div>';
  showV9Modal(html);
}

window.v9CalcFitting=function(){
  var height=parseInt(document.getElementById('v9FitHeight').value);
  var wrist=parseInt(document.getElementById('v9FitWrist').value);
  var speed=parseInt(document.getElementById('v9FitSpeed').value);
  var hcp=parseInt(document.getElementById('v9FitHcp').value);
  var tempo=document.getElementById('v9FitTempo').value;

  // Shaft length
  var shaftAdj=0;
  if(height<165) shaftAdj=-1;
  else if(height<170) shaftAdj=-0.5;
  else if(height>185) shaftAdj=0.5;
  else if(height>190) shaftAdj=1;

  // Lie angle
  var lieAdj=0;
  var wristRatio=wrist/height;
  if(wristRatio<0.47) lieAdj=2;
  else if(wristRatio<0.49) lieAdj=1;
  else if(wristRatio>0.52) lieAdj=-1;
  else if(wristRatio>0.54) lieAdj=-2;

  // Shaft flex
  var flex='R';
  if(speed>=105) flex='S';
  if(speed>=115) flex='X';
  if(speed<85) flex='A';
  if(speed<75) flex='L';

  // Shaft weight
  var shaftWeight=speed>=100?'60-70g':speed>=90?'55-65g':speed>=80?'50-60g':'40-55g';

  // Grip size
  var gripSize=height>=185?'미드사이즈/점보':height>=175?'스탠다드/미드사이즈':height>=165?'스탠다드':'언더사이즈';

  // Driver loft
  var loft=speed>=110?'8.5-9.5&deg;':speed>=100?'9.5-10.5&deg;':speed>=90?'10.5-12&deg;':'12-14&deg;';

  // Ball recommendation
  var ball=hcp<=10?'투어급 우레탄 (Pro V1, TP5)':hcp<=20?'중급 3피스 (Chrome Soft, Q-Star)':'고반발 2피스 (Velocity, Noodle)';

  var el=document.getElementById('v9FitResult');
  var h='<div class="v9-fit-result"><h3>&#x2705; 피팅 결과</h3></div>';
  h+='<div class="v9-divider"></div>';

  var specs=[
    {label:'샤프트 플렉스',value:flex,desc:'헤드스피드 '+speed+'mph 기준'},
    {label:'샤프트 길이 조정',value:(shaftAdj>=0?'+':'')+shaftAdj+'인치',desc:'신장 '+height+'cm 기준'},
    {label:'라이각 조정',value:(lieAdj>=0?'+':'')+lieAdj+'&deg;',desc:'손목비율 '+(wristRatio*100).toFixed(1)+'%'},
    {label:'샤프트 무게',value:shaftWeight,desc:'스윙속도+템포 기반'},
    {label:'그립 사이즈',value:gripSize,desc:'신장 기반'},
    {label:'드라이버 로프트',value:loft,desc:'최적 런치앵글 기준'},
    {label:'추천 볼',value:ball,desc:'핸디캡 '+hcp+' 기준'}
  ];
  specs.forEach(function(s){
    h+='<div class="v9-stat-row"><div class="v9-sr-text"><div class="v9-sr-title">'+s.label+'</div>';
    h+='<div class="v9-sr-sub">'+s.desc+'</div></div>';
    h+='<div class="v9-sr-val" style="font-size:14px">'+s.value+'</div></div>';
  });

  h+='<div class="v9-card" style="margin-top:16px"><h4>&#x1F4A1; 추가 팁</h4><p>';
  if(tempo==='fast') h+='빠른 템포에는 가벼운 샤프트가 유리합니다. 토크가 낮은 샤프트를 선택하세요.';
  else if(tempo==='slow') h+='느린 템포에는 킥포인트가 낮은 샤프트가 비거리에 도움됩니다.';
  else h+='보통 템포에 가장 폭넓은 선택이 가능합니다. 시타를 통해 최적 조합을 찾으세요.';
  h+='</p></div>';

  el.innerHTML=h;
  v9Sfx('fitting');
};

// ====================================================================
// 6. COURSE DIFFICULTY MATRIX
// ====================================================================
function renderDifficultyMatrix(){
  var courses=window._sgCourses||[];
  var html='<div class="v9-header"><h2><span class="v9-icon">&#x1F4CA;</span> 코스 난이도 매트릭스</h2><button class="v9-close" onclick="closeV9()">&times;</button></div>';
  html+='<div class="v9-tabs"><button class="v9-tab active" data-dt="rating">평점순</button><button class="v9-tab" data-dt="holes">홀수순</button><button class="v9-tab" data-dt="region">지역별</button></div>';

  // Rating-based difficulty
  html+='<div id="v9DRating">';
  var top20=courses.slice().sort(function(a,b){return(b.rt||0)-(a.rt||0)}).slice(0,20);
  html+='<div class="v9-card"><h4>&#x1F3C6; TOP 20 최고 평점 코스</h4></div>';
  top20.forEach(function(c){
    var pct=Math.round(((c.rt||7)/10)*100);
    var color=c.rt>=9?'#4caf50':c.rt>=8.5?'#2196f3':c.rt>=8?'#ff9800':'#999';
    html+='<div class="v9-diff-bar"><div class="v9-db-name" title="'+c.n+'">'+c.n+'</div>';
    html+='<div class="v9-db-track"><div class="v9-db-fill" style="width:'+pct+'%;background:'+color+'"></div></div>';
    html+='<div class="v9-db-val" style="color:'+color+'">'+(c.rt||'-')+'</div></div>';
  });
  html+='</div>';

  // Holes
  html+='<div id="v9DHoles" style="display:none">';
  var holeCounts={};
  courses.forEach(function(c){
    var h=c.h||0;
    var cat=h>=36?'36+':h>=27?'27':h>=18?'18':h>=9?'9':'기타';
    holeCounts[cat]=(holeCounts[cat]||0)+1;
  });
  html+='<div class="v9-card"><h4>&#x26F3; 홀수별 분포</h4>';
  ['36+','27','18','9','기타'].forEach(function(cat){
    var cnt=holeCounts[cat]||0;
    var pct=Math.round(cnt/courses.length*100);
    html+='<div class="v9-diff-bar"><div class="v9-db-name">'+cat+'홀</div>';
    html+='<div class="v9-db-track"><div class="v9-db-fill" style="width:'+pct+'%;background:var(--primary)"></div></div>';
    html+='<div class="v9-db-val">'+cnt+'개</div></div>';
  });
  html+='</div></div>';

  // Region
  html+='<div id="v9DRegion" style="display:none">';
  var regionCounts={};
  courses.forEach(function(c){regionCounts[c.r]=(regionCounts[c.r]||0)+1;});
  var regionArr=Object.keys(regionCounts).map(function(k){return{r:k,c:regionCounts[k]}}).sort(function(a,b){return b.c-a.c});
  html+='<div class="v9-card"><h4>&#x1F5FA;&#xFE0F; 지역별 골프장 수</h4>';
  regionArr.forEach(function(r){
    var pct=Math.round(r.c/courses.length*100);
    html+='<div class="v9-diff-bar"><div class="v9-db-name">'+r.r+'</div>';
    html+='<div class="v9-db-track"><div class="v9-db-fill" style="width:'+pct+'%;background:linear-gradient(90deg,var(--primary),#7bed9f)"></div></div>';
    html+='<div class="v9-db-val">'+r.c+'</div></div>';
  });
  html+='</div></div>';

  showV9Modal(html);

  v9Overlay.querySelectorAll('.v9-tab').forEach(function(tab){
    tab.addEventListener('click',function(){
      v9Overlay.querySelectorAll('.v9-tab').forEach(function(t){t.classList.remove('active')});
      tab.classList.add('active');
      var v=tab.dataset.dt;
      document.getElementById('v9DRating').style.display=v==='rating'?'':'none';
      document.getElementById('v9DHoles').style.display=v==='holes'?'':'none';
      document.getElementById('v9DRegion').style.display=v==='region'?'':'none';
    });
  });
}

// ====================================================================
// 7. NUTRITION GUIDE (골프 영양/식단 가이드)
// ====================================================================
function renderNutritionGuide(){
  var html='<div class="v9-header"><h2><span class="v9-icon">&#x1F957;</span> 골프 영양 가이드</h2><button class="v9-close" onclick="closeV9()">&times;</button></div>';
  html+='<div class="v9-tabs"><button class="v9-tab active" data-nt="before">라운드 전</button><button class="v9-tab" data-nt="during">라운드 중</button><button class="v9-tab" data-nt="after">라운드 후</button><button class="v9-tab" data-nt="hydration">수분 섭취</button></div>';

  // Before
  html+='<div id="v9NBefore">';
  html+='<div class="v9-nutrition-card"><h5>&#x1F373; 라운드 2-3시간 전 식사</h5><ul>';
  html+='<li><strong>탄수화물 60%:</strong> 통곡물 빵, 오트밀, 바나나</li>';
  html+='<li><strong>단백질 25%:</strong> 달걀, 닭가슴살, 그릭요거트</li>';
  html+='<li><strong>지방 15%:</strong> 아보카도, 견과류 소량</li>';
  html+='<li>카페인은 1컵까지 (집중력 향상)</li></ul></div>';
  html+='<div class="v9-nutrition-card"><h5>&#x26A0;&#xFE0F; 피해야 할 음식</h5><ul>';
  html+='<li>고지방/튀긴 음식 (소화 지연)</li>';
  html+='<li>고섬유질 음식 (복부 불편)</li>';
  html+='<li>탄산음료 (가스/팽만)</li>';
  html+='<li>새로운 음식 (소화 불확실)</li></ul></div>';
  html+='</div>';

  // During
  html+='<div id="v9NDuring" style="display:none">';
  html+='<div class="v9-nutrition-card"><h5>&#x1F34C; 전반 9홀 (에너지 유지)</h5><ul>';
  html+='<li>바나나 1개 (즉각적 에너지)</li>';
  html+='<li>에너지바 (탄수화물 위주)</li>';
  html+='<li>물 200ml씩 2-3홀마다</li>';
  html+='<li>스포츠음료 (30분 이상 활동 시)</li></ul></div>';
  html+='<div class="v9-nutrition-card"><h5>&#x1F36B; 후반 9홀 (집중력 유지)</h5><ul>';
  html+='<li>견과류 한 줌 (오메가3, 지속 에너지)</li>';
  html+='<li>건포도/건과일 (빠른 당 보충)</li>';
  html+='<li>초콜릿 2-3조각 (도파민 + 당분)</li>';
  html+='<li>물 지속 섭취 (탈수 방지)</li></ul></div>';
  html+='</div>';

  // After
  html+='<div id="v9NAfter" style="display:none">';
  html+='<div class="v9-nutrition-card"><h5>&#x1F356; 라운드 후 30분 내</h5><ul>';
  html+='<li><strong>단백질:</strong> 닭고기, 연어, 두부 (근회복)</li>';
  html+='<li><strong>탄수화물:</strong> 현미밥, 고구마 (글리코겐 재충전)</li>';
  html+='<li><strong>채소:</strong> 항산화 비타민 보충</li>';
  html+='<li>충분한 수분 섭취</li></ul></div>';
  html+='<div class="v9-nutrition-card"><h5>&#x1F378; 주의사항</h5><ul>';
  html+='<li>알코올은 1잔까지 (탈수 촉진)</li>';
  html+='<li>과식 금지 (소화 에너지 낭비)</li>';
  html+='<li>마그네슘/칼슘 보충 (근육 경련 예방)</li></ul></div>';
  html+='</div>';

  // Hydration
  html+='<div id="v9NHydration" style="display:none">';
  html+='<div class="v9-card"><h4>&#x1F4A7; 수분 섭취 가이드</h4>';
  html+='<div class="v9-grid2">';
  html+='<div class="v9-card" style="text-align:center"><div style="font-size:32px">&#x1F4A7;</div><div style="font-weight:800;font-size:20px;color:var(--primary)">2~3L</div><div style="font-size:11px;color:var(--text-muted)">18홀 기준 권장량</div></div>';
  html+='<div class="v9-card" style="text-align:center"><div style="font-size:32px">&#x23F0;</div><div style="font-weight:800;font-size:20px;color:var(--primary)">15분</div><div style="font-size:11px;color:var(--text-muted)">수분 섭취 간격</div></div>';
  html+='</div></div>';
  html+='<div class="v9-nutrition-card"><h5>&#x1F321;&#xFE0F; 날씨별 수분 섭취</h5><ul>';
  html+='<li><strong>30&deg;C+:</strong> 기본의 1.5배, 전해질 보충 필수</li>';
  html+='<li><strong>25-30&deg;C:</strong> 기본 권장량 (200ml/2홀)</li>';
  html+='<li><strong>20-25&deg;C:</strong> 기본 권장량의 80%</li>';
  html+='<li><strong>20&deg;C-:</strong> 갈증 느끼기 전에 마시기</li></ul></div>';
  html+='</div>';

  showV9Modal(html);
  v9Overlay.querySelectorAll('.v9-tab').forEach(function(tab){
    tab.addEventListener('click',function(){
      v9Overlay.querySelectorAll('.v9-tab').forEach(function(t){t.classList.remove('active')});
      tab.classList.add('active');
      var v=tab.dataset.nt;
      ['Before','During','After','Hydration'].forEach(function(s){
        document.getElementById('v9N'+s).style.display=s.toLowerCase()===v?'':'none';
      });
    });
  });
}

// ====================================================================
// 8. CLUB MAINTENANCE DIARY
// ====================================================================
function renderClubDiary(){
  var clubs=JSON.parse(localStorage.getItem('sg_clubs')||'[]');
  if(!clubs.length){
    clubs=[
      {name:'드라이버',type:'driver',gripDate:'',shaftDate:'',rounds:0,notes:''},
      {name:'3번 우드',type:'wood',gripDate:'',shaftDate:'',rounds:0,notes:''},
      {name:'5번 우드',type:'wood',gripDate:'',shaftDate:'',rounds:0,notes:''},
      {name:'유틸리티',type:'hybrid',gripDate:'',shaftDate:'',rounds:0,notes:''},
      {name:'5번 아이언',type:'iron',gripDate:'',shaftDate:'',rounds:0,notes:''},
      {name:'6번 아이언',type:'iron',gripDate:'',shaftDate:'',rounds:0,notes:''},
      {name:'7번 아이언',type:'iron',gripDate:'',shaftDate:'',rounds:0,notes:''},
      {name:'8번 아이언',type:'iron',gripDate:'',shaftDate:'',rounds:0,notes:''},
      {name:'9번 아이언',type:'iron',gripDate:'',shaftDate:'',rounds:0,notes:''},
      {name:'PW',type:'wedge',gripDate:'',shaftDate:'',rounds:0,notes:''},
      {name:'SW',type:'wedge',gripDate:'',shaftDate:'',rounds:0,notes:''},
      {name:'LW',type:'wedge',gripDate:'',shaftDate:'',rounds:0,notes:''},
      {name:'퍼터',type:'putter',gripDate:'',shaftDate:'',rounds:0,notes:''}
    ];
    localStorage.setItem('sg_clubs',JSON.stringify(clubs));
  }

  var html='<div class="v9-header"><h2><span class="v9-icon">&#x1F3CC;&#xFE0F;</span> 클럽 관리 다이어리</h2><button class="v9-close" onclick="closeV9()">&times;</button></div>';
  html+='<div class="v9-card" style="background:linear-gradient(135deg,var(--primary-light),rgba(123,237,159,.1))">';
  html+='<h4>&#x1F527; 관리 기준</h4>';
  html+='<p>그립 교체: <strong>40~60라운드</strong> 또는 <strong>1년</strong> | 그루브 점검: <strong>매 라운드</strong></p></div>';

  clubs.forEach(function(c,i){
    var icon=c.type==='driver'?'&#x1F3CC;&#xFE0F;':c.type==='wood'?'&#x1FAB5;':c.type==='iron'?'&#x26F3;':c.type==='wedge'?'&#x1F3AF;':'&#x1F6A9;';
    var gripStatus='';
    if(c.gripDate){
      var daysSince=Math.floor((Date.now()-new Date(c.gripDate).getTime())/(86400000));
      gripStatus=daysSince>365?'<span class="v9-badge v9-badge-red">교체 필요</span>':daysSince>270?'<span class="v9-badge v9-badge-orange">점검 권장</span>':'<span class="v9-badge v9-badge-green">양호</span>';
    }
    html+='<div class="v9-stat-row">';
    html+='<div class="v9-sr-icon" style="background:var(--primary-light);font-size:20px">'+icon+'</div>';
    html+='<div class="v9-sr-text"><div class="v9-sr-title">'+c.name+' '+gripStatus+'</div>';
    html+='<div class="v9-sr-sub">라운드: '+c.rounds+'회'+(c.gripDate?' | 그립교체: '+c.gripDate:'')+'</div></div>';
    html+='<button class="v9-btn v9-btn-secondary" style="padding:6px 12px;font-size:11px" onclick="v9EditClub('+i+')">편집</button></div>';
  });

  html+='<div style="margin-top:16px"><button class="v9-btn v9-btn-primary" onclick="v9AddRoundToClubs()">&#x2795; 라운드 기록 (+1)</button></div>';
  showV9Modal(html);
}

window.v9EditClub=function(idx){
  var clubs=JSON.parse(localStorage.getItem('sg_clubs')||'[]');
  var c=clubs[idx];if(!c)return;
  var html='<div class="v9-header"><h2><span class="v9-icon">&#x270F;&#xFE0F;</span> '+c.name+' 편집</h2><button class="v9-close" onclick="renderClubDiary()">&times;</button></div>';
  html+='<div><label class="v9-label">그립 교체일</label><input type="date" class="v9-input" id="v9ClubGrip" value="'+(c.gripDate||'')+'"></div>';
  html+='<div style="height:12px"></div>';
  html+='<div><label class="v9-label">누적 라운드</label><input type="number" class="v9-input" id="v9ClubRounds" value="'+(c.rounds||0)+'" min="0"></div>';
  html+='<div style="height:12px"></div>';
  html+='<div><label class="v9-label">메모</label><textarea class="v9-input" id="v9ClubNotes" rows="3" style="resize:vertical">'+(c.notes||'')+'</textarea></div>';
  html+='<div style="height:16px"></div>';
  html+='<button class="v9-btn v9-btn-primary" style="width:100%" onclick="v9SaveClub('+idx+')">&#x1F4BE; 저장</button>';
  showV9Modal(html);
};

window.v9SaveClub=function(idx){
  var clubs=JSON.parse(localStorage.getItem('sg_clubs')||'[]');
  clubs[idx].gripDate=document.getElementById('v9ClubGrip').value;
  clubs[idx].rounds=parseInt(document.getElementById('v9ClubRounds').value)||0;
  clubs[idx].notes=document.getElementById('v9ClubNotes').value;
  localStorage.setItem('sg_clubs',JSON.stringify(clubs));
  renderClubDiary();
};

window.v9AddRoundToClubs=function(){
  var clubs=JSON.parse(localStorage.getItem('sg_clubs')||'[]');
  clubs.forEach(function(c){c.rounds=(c.rounds||0)+1;});
  localStorage.setItem('sg_clubs',JSON.stringify(clubs));
  if(typeof showToast==='function') showToast('전 클럽 라운드 +1 기록!','success');
  renderClubDiary();
};

// ====================================================================
// 9. COURSE PHOTO GALLERY
// ====================================================================
function renderPhotoGallery(){
  v9Sfx('photo');
  var photos=JSON.parse(localStorage.getItem('sg_photos')||'[]');
  var html='<div class="v9-header"><h2><span class="v9-icon">&#x1F4F7;</span> 코스 포토 갤러리</h2><button class="v9-close" onclick="closeV9()">&times;</button></div>';
  html+='<div class="v9-card"><h4>&#x1F4F8; 라운드 사진 기록</h4>';
  html+='<p>홀별 풍경, 멋진 샷, 코스 컨디션을 기록하세요.</p></div>';
  html+='<div class="v9-grid2" style="margin-bottom:16px">';
  html+='<div><label class="v9-label">골프장명</label><input class="v9-input" id="v9PhotoCourse" placeholder="골프장 이름"></div>';
  html+='<div><label class="v9-label">홀 번호</label><input type="number" class="v9-input" id="v9PhotoHole" min="1" max="36" value="1"></div>';
  html+='</div>';
  html+='<div><label class="v9-label">메모</label><input class="v9-input" id="v9PhotoMemo" placeholder="특이사항, 풍경 설명..."></div>';
  html+='<div style="height:12px"></div>';
  html+='<button class="v9-btn v9-btn-primary" style="width:100%" onclick="v9AddPhoto()">&#x1F4F7; 기록 추가</button>';
  html+='<div class="v9-divider"></div>';
  html+='<h4 style="margin-bottom:12px">&#x1F5BC;&#xFE0F; 저장된 기록 ('+photos.length+')</h4>';
  if(!photos.length){
    html+='<div class="v9-card" style="text-align:center"><p>아직 기록이 없습니다.</p></div>';
  } else {
    photos.forEach(function(p,i){
      html+='<div class="v9-stat-row">';
      html+='<div class="v9-sr-icon" style="background:linear-gradient(135deg,#e3f2fd,#bbdefb);font-size:18px">'+p.hole+'H</div>';
      html+='<div class="v9-sr-text"><div class="v9-sr-title">'+p.course+'</div>';
      html+='<div class="v9-sr-sub">'+p.memo+' &middot; '+p.date+'</div></div>';
      html+='<button onclick="v9DeletePhoto('+i+')" style="background:none;border:none;color:#e53935;cursor:pointer;font-size:16px">&times;</button></div>';
    });
  }
  showV9Modal(html);
}

window.v9AddPhoto=function(){
  var course=document.getElementById('v9PhotoCourse').value.trim();
  var hole=document.getElementById('v9PhotoHole').value;
  var memo=document.getElementById('v9PhotoMemo').value.trim();
  if(!course){if(typeof showToast==='function')showToast('골프장명을 입력하세요','warning');return;}
  var photos=JSON.parse(localStorage.getItem('sg_photos')||'[]');
  photos.unshift({course:course,hole:parseInt(hole),memo:memo||'',date:new Date().toISOString().split('T')[0],id:Date.now()});
  if(photos.length>100) photos=photos.slice(0,100);
  localStorage.setItem('sg_photos',JSON.stringify(photos));
  v9Sfx('photo');
  renderPhotoGallery();
};

window.v9DeletePhoto=function(i){
  var photos=JSON.parse(localStorage.getItem('sg_photos')||'[]');
  photos.splice(i,1);
  localStorage.setItem('sg_photos',JSON.stringify(photos));
  renderPhotoGallery();
};

// ====================================================================
// 10. GOLF TERMINOLOGY QUIZ (30문)
// ====================================================================
var v9QuizPool=[
  {q:'OB(Out of Bounds)의 뜻은?',a:['경기구역 밖으로 볼이 나간 것','볼이 워터해저드에 빠진 것','볼이 벙커에 들어간 것','그린 위에서 볼이 멈춘 것'],c:0},
  {q:'버디(Birdie)란?',a:['파보다 1타 적게 친 것','파보다 2타 적게 친 것','파보다 1타 많이 친 것','홀인원'],c:0},
  {q:'이글(Eagle)의 정확한 의미는?',a:['파보다 2타 적게 친 것','파보다 1타 적게 친 것','파보다 3타 적게 친 것','첫 샷에 홀에 넣는 것'],c:0},
  {q:'보기(Bogey)란 무엇인가?',a:['파보다 1타 많이 친 것','파보다 2타 많이 친 것','파보다 1타 적게 친 것','볼이 페어웨이에 있는 것'],c:0},
  {q:'알바트로스(Albatross)는?',a:['파보다 3타 적게 친 것','파보다 2타 적게 친 것','파보다 4타 적게 친 것','18홀을 1타에 끝내는 것'],c:0},
  {q:'페어웨이(Fairway)란?',a:['티와 그린 사이의 잘 깎인 잔디 구역','러프 지역','벙커 안의 모래','그린 위의 잔디'],c:0},
  {q:'러프(Rough)란?',a:['페어웨이 바깥의 긴 잔디 구역','벙커 안의 구역','그린 위의 깃발','OB 구역'],c:0},
  {q:'핀(Pin)이란?',a:['그린 위 홀 위치를 표시하는 깃대','티샷 목표점','볼 마커','디봇 수리도구'],c:0},
  {q:'어프로치(Approach) 샷이란?',a:['그린 근처에서 그린을 공략하는 샷','티샷','퍼팅','벙커샷'],c:0},
  {q:'칩(Chip) 샷의 특징은?',a:['낮은 탄도로 굴려서 그린에 올리는 샷','높은 탄도의 로브샷','드라이버 샷','퍼팅'],c:0},
  {q:'피치(Pitch) 샷의 특징은?',a:['높은 탄도로 그린에 올리고 빨리 멈추는 샷','낮은 탄도의 런닝 샷','드라이버로 멀리 치는 것','퍼팅'],c:0},
  {q:'슬라이스(Slice)란?',a:['오른손잡이 기준 오른쪽으로 크게 휘는 구질','왼쪽으로 크게 휘는 구질','직선으로 가는 구질','낮게 깔리는 구질'],c:0},
  {q:'훅(Hook)이란?',a:['오른손잡이 기준 왼쪽으로 크게 휘는 구질','오른쪽으로 크게 휘는 구질','높이 올라가는 구질','스핀 없는 구질'],c:0},
  {q:'드로우(Draw)란?',a:['약간 왼쪽으로 휘어지는 이상적인 구질','약간 오른쪽으로 휘는 구질','직선 구질','높은 탄도의 구질'],c:0},
  {q:'페이드(Fade)란?',a:['약간 오른쪽으로 살짝 휘는 컨트롤된 구질','크게 왼쪽으로 휘는 구질','낮은 탄도','백스핀이 많은 샷'],c:0},
  {q:'GIR(Green in Regulation)이란?',a:['파-2 타 이내에 그린에 올리는 것','첫 타에 그린에 올리는 것','퍼팅 2번 이내로 마치는 것','보기 이하로 마치는 것'],c:0},
  {q:'FIR(Fairway in Regulation)이란?',a:['드라이버 샷이 페어웨이에 안착한 비율','그린 적중률','퍼트 수','버디 비율'],c:0},
  {q:'디봇(Divot)이란?',a:['샷 시 잔디가 파인 자국','볼 마크','벙커의 모래 자국','퍼팅 라인'],c:0},
  {q:'레이업(Lay-Up)이란?',a:['위험을 피해 일부러 짧게 치는 전략적 샷','최대 비거리로 치는 것','벙커에서 탈출하는 것','퍼팅'],c:0},
  {q:'캐리(Carry)와 런(Run)의 차이?',a:['캐리는 공중비행거리, 런은 착지 후 굴러간 거리','캐리는 총거리, 런은 공중거리','둘 다 같은 의미','캐리는 역방향, 런은 순방향'],c:0},
  {q:'멀리건(Mulligan)이란?',a:['비공식적으로 첫 샷을 다시 치는 것','공식 규칙에 따른 재샷','페널티 없는 드롭','프로 대회 규정'],c:0},
  {q:'업앤다운(Up and Down)이란?',a:['그린 밖에서 한 번에 올린 후 1퍼트로 마치는 것','2퍼트로 마치는 것','더블보기를 기록하는 것','티샷에서 홀인원'],c:0},
  {q:'스크래치 골퍼란?',a:['핸디캡 0인 골퍼','초보 골퍼','프로 골퍼만을 지칭','핸디캡 36인 골퍼'],c:0},
  {q:'그린피(Green Fee)란?',a:['골프장 이용 요금','그린 잔디 관리비','캐디 비용','카트 이용료'],c:0},
  {q:'스탠스(Stance)란?',a:['스윙 시 발의 위치와 자세','퍼팅 그립','볼 위치','클럽 선택'],c:0},
  {q:'임팩트(Impact)란?',a:['클럽 헤드가 볼에 접촉하는 순간','백스윙 정점','팔로우스루','어드레스'],c:0},
  {q:'백스핀(Backspin)이란?',a:['볼이 역회전하여 착지 후 뒤로 굴러오는 현상','볼이 앞으로 많이 굴러가는 것','볼이 옆으로 회전하는 것','스핀이 없는 상태'],c:0},
  {q:'핸디캡(Handicap)의 용도는?',a:['실력이 다른 골퍼들이 공정하게 경기하기 위한 보정값','골프 클럽의 종류','골프장 난이도 표시','캐디의 등급'],c:0},
  {q:'샹크(Shank)란?',a:['클럽 호젤(목) 부분에 볼이 맞아 옆으로 나가는 미스샷','완벽한 샷','높이 올라가는 샷','짧게 치는 샷'],c:0},
  {q:'코스 매니지먼트란?',a:['자신의 실력을 고려한 전략적 코스 공략','코스 잔디 관리','골프장 운영','캐디 배치 관리'],c:0}
];

function renderGolfQuiz(){
  var qState=JSON.parse(localStorage.getItem('sg_quiz9')||'{"score":0,"total":0,"best":0}');
  var shuffled=v9QuizPool.slice().sort(function(){return Math.random()-0.5});
  var idx=0,score=0;

  function renderQ(){
    if(idx>=10){
      var grade=score>=9?'S':score>=8?'A':score>=6?'B':score>=4?'C':'D';
      var gradeColor=score>=9?'#ffd700':score>=8?'#c0c0c0':score>=6?'#cd7f32':score>=4?'var(--primary)':'#999';
      qState.total+=10;qState.score+=score;
      if(score>qState.best) qState.best=score;
      localStorage.setItem('sg_quiz9',JSON.stringify(qState));
      var h='<div class="v9-header"><h2><span class="v9-icon">&#x1F3C6;</span> 퀴즈 결과</h2><button class="v9-close" onclick="closeV9()">&times;</button></div>';
      h+='<div style="text-align:center"><div style="font-size:64px;font-weight:900;color:'+gradeColor+'">'+grade+'</div>';
      h+='<div style="font-size:24px;font-weight:800;margin:8px 0">'+score+'/10</div>';
      h+='<div style="font-size:13px;color:var(--text-muted)">누적: '+qState.score+'/'+qState.total+' | 최고: '+qState.best+'/10</div></div>';
      h+='<div class="v9-divider"></div>';
      h+='<button class="v9-btn v9-btn-primary" style="width:100%" onclick="renderGolfQuiz()">&#x1F504; 다시 풀기</button>';
      showV9Modal(h);
      return;
    }
    var q=shuffled[idx];
    var opts=q.a.map(function(a,i){return{text:a,isCorrect:i===q.c}});
    opts.sort(function(){return Math.random()-0.5});
    var h='<div class="v9-header"><h2><span class="v9-icon">&#x1F4DD;</span> 골프 용어 퀴즈</h2><button class="v9-close" onclick="closeV9()">&times;</button></div>';
    h+='<div style="display:flex;justify-content:space-between;margin-bottom:16px">';
    h+='<span class="v9-badge v9-badge-blue">'+(idx+1)+'/10</span>';
    h+='<span class="v9-badge v9-badge-green">'+score+'점</span></div>';
    h+='<div class="v9-progress"><div class="v9-progress-fill" style="width:'+((idx)/10*100)+'%"></div></div>';
    h+='<div class="v9-card"><h4>'+q.q+'</h4></div>';
    opts.forEach(function(o,oi){
      h+='<button class="v9-quiz-option" data-correct="'+o.isCorrect+'" data-idx="'+oi+'">'+o.text+'</button>';
    });
    showV9Modal(h);
    v9Overlay.querySelectorAll('.v9-quiz-option').forEach(function(btn){
      btn.addEventListener('click',function(){
        if(btn.dataset.answered)return;
        v9Overlay.querySelectorAll('.v9-quiz-option').forEach(function(b){
          b.dataset.answered='1';
          if(b.dataset.correct==='true') b.classList.add('correct');
        });
        if(btn.dataset.correct==='true'){
          btn.classList.add('correct');
          score++;
          v9Sfx('quiz_correct');
        } else {
          btn.classList.add('wrong');
          v9Sfx('quiz_wrong');
        }
        idx++;
        setTimeout(renderQ,1200);
      });
    });
  }
  renderQ();
}

// ====================================================================
// 11. PRACTICE RANGE FINDER (연습장 파인더)
// ====================================================================
function renderPracticeRange(){
  var html='<div class="v9-header"><h2><span class="v9-icon">&#x1F3AF;</span> 연습장 파인더</h2><button class="v9-close" onclick="closeV9()">&times;</button></div>';
  var ranges=[
    {name:'서울 강남 골프연습장',region:'서울',type:'실내',bays:60,price:'1시간 2만원',lat:37.497,lng:127.028},
    {name:'분당 야탑 드라이빙레인지',region:'경기',type:'야외',bays:120,price:'100구 1.5만원',lat:37.412,lng:127.128},
    {name:'일산 골프레인지',region:'경기',type:'야외',bays:150,price:'100구 1.2만원',lat:37.659,lng:126.770},
    {name:'인천 청라 골프존',region:'인천',type:'스크린',bays:20,price:'1시간 2.5만원',lat:37.527,lng:126.640},
    {name:'수원 인계동 연습장',region:'경기',type:'야외',bays:80,price:'100구 1.3만원',lat:37.262,lng:127.031},
    {name:'대전 둔산 스크린골프',region:'대전',type:'스크린',bays:15,price:'1시간 2만원',lat:36.352,lng:127.377},
    {name:'부산 해운대 드라이빙레인지',region:'부산',type:'야외',bays:100,price:'100구 1.5만원',lat:35.159,lng:129.160},
    {name:'제주 서귀포 연습장',region:'제주',type:'야외',bays:50,price:'100구 1만원',lat:33.254,lng:126.560},
    {name:'광주 상무 골프연습장',region:'광주',type:'야외',bays:90,price:'100구 1.2만원',lat:35.153,lng:126.852},
    {name:'대구 수성 스크린골프',region:'대구',type:'스크린',bays:25,price:'1시간 2.2만원',lat:35.857,lng:128.630},
    {name:'창원 마산 드라이빙레인지',region:'경남',type:'야외',bays:70,price:'100구 1.1만원',lat:35.218,lng:128.573},
    {name:'전주 효자 연습장',region:'전북',type:'야외',bays:60,price:'100구 1만원',lat:35.825,lng:127.108}
  ];

  html+='<div class="v9-tabs"><button class="v9-tab active" data-rt="">전체</button><button class="v9-tab" data-rt="야외">야외</button><button class="v9-tab" data-rt="실내">실내</button><button class="v9-tab" data-rt="스크린">스크린</button></div>';
  html+='<div id="v9RangeList">';
  ranges.forEach(function(r){
    var typeColor=r.type==='야외'?'v9-badge-green':r.type==='실내'?'v9-badge-blue':'v9-badge-purple';
    html+='<div class="v9-stat-row v9-range-item" data-rtype="'+r.type+'">';
    html+='<div class="v9-sr-icon" style="background:var(--primary-light);font-size:18px">&#x1F3CC;&#xFE0F;</div>';
    html+='<div class="v9-sr-text"><div class="v9-sr-title">'+r.name+' <span class="v9-badge '+typeColor+'">'+r.type+'</span></div>';
    html+='<div class="v9-sr-sub">'+r.region+' | '+r.bays+'타석 | '+r.price+'</div></div></div>';
  });
  html+='</div>';

  html+='<div class="v9-divider"></div>';
  html+='<div class="v9-card"><h4>&#x1F4A1; 연습장 선택 팁</h4>';
  html+='<p>야외: 실전감각 + 비거리 확인 | 실내: 날씨 무관 + 스윙분석 | 스크린: 코스 시뮬레이션 + 재미</p></div>';

  showV9Modal(html);

  v9Overlay.querySelectorAll('.v9-tab').forEach(function(tab){
    tab.addEventListener('click',function(){
      v9Overlay.querySelectorAll('.v9-tab').forEach(function(t){t.classList.remove('active')});
      tab.classList.add('active');
      var ft=tab.dataset.rt;
      v9Overlay.querySelectorAll('.v9-range-item').forEach(function(item){
        item.style.display=(!ft||item.dataset.rtype===ft)?'':'none';
      });
    });
  });
}

// ====================================================================
// 12. QUICK ACTIONS INJECTION
// ====================================================================
function injectV9QuickActions(){
  var existing=document.querySelector('.v8-quick-row');
  if(!existing) existing=document.querySelector('.quick-filters');
  if(!existing) return;

  var v9Row=document.createElement('div');
  v9Row.className='v9-quick-row';
  v9Row.innerHTML=[
    {icon:'&#x1F4CB;',label:'라운드플래너',fn:'renderRoundPlanner'},
    {icon:'&#x1F4CA;',label:'스코어분석',fn:'renderScoreAnalysis'},
    {icon:'&#x1F527;',label:'클럽피팅',fn:'renderFittingSimulator'},
    {icon:'&#x1F4CA;',label:'난이도분석',fn:'renderDifficultyMatrix'},
    {icon:'&#x1F957;',label:'영양가이드',fn:'renderNutritionGuide'},
    {icon:'&#x1F3CC;&#xFE0F;',label:'클럽관리',fn:'renderClubDiary'},
    {icon:'&#x1F4F7;',label:'포토갤러리',fn:'renderPhotoGallery'},
    {icon:'&#x1F4DD;',label:'용어퀴즈',fn:'renderGolfQuiz'},
    {icon:'&#x1F3AF;',label:'연습장',fn:'renderPracticeRange'}
  ].map(function(b){
    return '<div class="v9-qbtn" data-v9fn="'+b.fn+'"><span class="v9-qi">'+b.icon+'</span>'+b.label+'</div>';
  }).join('');

  existing.parentNode.insertBefore(v9Row, existing.nextSibling);

  v9Row.querySelectorAll('.v9-qbtn').forEach(function(btn){
    btn.addEventListener('click',function(){
      var fn=btn.dataset.v9fn;
      var fnMap={
        renderRoundPlanner:renderRoundPlanner,
        renderScoreAnalysis:renderScoreAnalysis,
        renderFittingSimulator:renderFittingSimulator,
        renderDifficultyMatrix:renderDifficultyMatrix,
        renderNutritionGuide:renderNutritionGuide,
        renderClubDiary:renderClubDiary,
        renderPhotoGallery:renderPhotoGallery,
        renderGolfQuiz:renderGolfQuiz,
        renderPracticeRange:renderPracticeRange
      };
      if(fnMap[fn]) fnMap[fn]();
    });
  });
}

// ====================================================================
// 13. KEYBOARD SHORTCUTS (v9 추가)
// ====================================================================
document.addEventListener('keydown',function(e){
  var t=e.target.tagName;
  if(t==='INPUT'||t==='TEXTAREA'||t==='SELECT')return;
  if(e.key==='r'||e.key==='R'&&!e.ctrlKey) renderRoundPlanner();
  if(e.key==='a'||e.key==='A'&&!e.ctrlKey) renderScoreAnalysis();
  if(e.key==='f'||e.key==='F'&&!e.ctrlKey&&!e.metaKey) renderFittingSimulator();
  if(e.key==='n'||e.key==='N'&&!e.ctrlKey) renderNutritionGuide();
  if(e.key==='z'||e.key==='Z'&&!e.ctrlKey&&!e.metaKey) renderGolfQuiz();
});

// ====================================================================
// 14. COURSES DATA HOOK
// ====================================================================
(function hookCoursesData(){
  var origFetch=window.fetch;
  if(!origFetch)return;
  window.fetch=function(){
    var args=arguments;
    var result=origFetch.apply(this,args);
    if(args[0]&&typeof args[0]==='string'&&args[0].includes('courses_enriched')){
      result.then(function(r){
        return r.clone().json().then(function(data){
          window._sgCourses=data;
        }).catch(function(){});
      }).catch(function(){});
    }
    return result;
  };
})();

// ====================================================================
// INITIALIZATION
// ====================================================================
if(document.readyState==='loading'){
  document.addEventListener('DOMContentLoaded',injectV9QuickActions);
}else{
  setTimeout(injectV9QuickActions,800);
}

})();
