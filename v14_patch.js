(function(){
'use strict';

// === SmartGolf v14.0 Patch ===
// 1. 골프 라운드 캘린더 (월간 뷰 + 라운드 일정 관리)
// 2. 가상 코스 플레이 시뮬레이터 (9홀 캔버스 + 샷 트래킹)
// 3. 성장 곡선 분석기 (장기 진행 그래프 + 마일스톤)
// 4. 골프 안전 & 에머전시 가이드 (낙뢰/열사병/응급)
// 5. 코스별 공략 노트 (개인 메모 CRUD)
// 6. 골프 버킷리스트 (드림 코스 위시리스트)
// 7. 스윙 템포 메트로놈 (BPM 조절 + 비프음)
// 8. 볼 포지션 & 얼라인먼트 가이드 (SVG 시각화)
// 9. 시즌 목표 추적기 (연간 목표 설정 + 진행률)
// 10. 골프 멘탈 다이어리 (라운드별 감정/집중도 기록)

var css14 = document.createElement('style');
css14.textContent = `
.v14-overlay{position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,.8);z-index:10035;display:none;align-items:center;justify-content:center;backdrop-filter:blur(12px)}
.v14-overlay.active{display:flex}
.v14-modal{background:var(--card-bg,#fff);border-radius:24px;padding:28px;width:95%;max-width:740px;max-height:92vh;overflow-y:auto;box-shadow:0 32px 100px rgba(0,0,0,.55);animation:v14Rise .4s cubic-bezier(.22,1,.36,1)}
@keyframes v14Rise{from{opacity:0;transform:translateY(40px) scale(.94)}to{opacity:1;transform:translateY(0) scale(1)}}
.v14-hdr{display:flex;justify-content:space-between;align-items:center;margin-bottom:18px}
.v14-hdr h2{font-size:21px;font-weight:800;display:flex;align-items:center;gap:10px}
.v14-hdr h2 .v14i{font-size:26px}
.v14-x{background:none;border:none;font-size:26px;cursor:pointer;color:var(--text-muted);padding:4px 10px;border-radius:10px;transition:.2s}
.v14-x:hover{background:var(--border);color:var(--text)}
.v14-tabs{display:flex;gap:6px;margin-bottom:16px;overflow-x:auto;padding-bottom:4px;scrollbar-width:none}
.v14-tabs::-webkit-scrollbar{display:none}
.v14-tab{padding:9px 18px;border-radius:24px;border:1.5px solid var(--border);background:var(--bg);font-size:12px;font-weight:700;cursor:pointer;white-space:nowrap;transition:.25s}
.v14-tab.active{background:var(--primary);color:#fff;border-color:var(--primary);box-shadow:0 3px 12px rgba(26,122,58,.35)}
.v14-card{background:var(--bg);border-radius:16px;padding:18px;margin-bottom:12px;transition:.25s;border:1.5px solid transparent}
.v14-card:hover{border-color:var(--primary);transform:translateY(-2px);box-shadow:0 4px 16px rgba(26,122,58,.12)}
.v14-card h4{font-size:15px;font-weight:700;margin-bottom:8px;display:flex;align-items:center;gap:8px}
.v14-card p{font-size:12px;color:var(--text-muted);line-height:1.7}
.v14-btn{padding:11px 22px;border:none;border-radius:14px;font-size:13px;font-weight:700;cursor:pointer;transition:.25s;display:inline-flex;align-items:center;gap:6px}
.v14-btn-primary{background:linear-gradient(135deg,var(--primary),#34a853);color:#fff}
.v14-btn-primary:hover{transform:translateY(-2px);box-shadow:0 8px 20px rgba(26,122,58,.4)}
.v14-btn-sm{padding:7px 14px;font-size:11px;border-radius:10px}
.v14-btn-secondary{background:var(--bg);color:var(--text);border:1.5px solid var(--border)}
.v14-btn-secondary:hover{border-color:var(--primary);color:var(--primary)}
.v14-btn-danger{background:#ff4444;color:#fff}
.v14-btn-danger:hover{background:#cc0000}
.v14-input{width:100%;padding:11px 16px;border:2px solid var(--border);border-radius:12px;font-size:13px;background:var(--bg);color:var(--text);transition:.2s}
.v14-input:focus{border-color:var(--primary);outline:none;box-shadow:0 0 0 3px rgba(26,122,58,.1)}
.v14-textarea{width:100%;padding:11px 16px;border:2px solid var(--border);border-radius:12px;font-size:13px;background:var(--bg);color:var(--text);min-height:80px;resize:vertical;font-family:inherit}
.v14-textarea:focus{border-color:var(--primary);outline:none}
.v14-select{padding:9px 14px;border:2px solid var(--border);border-radius:10px;font-size:13px;background:var(--bg);color:var(--text)}
.v14-grid2{display:grid;grid-template-columns:1fr 1fr;gap:12px}
.v14-grid3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px}
@media(max-width:500px){.v14-grid2,.v14-grid3{grid-template-columns:1fr}}
.v14-divider{height:1px;background:var(--border);margin:16px 0}
.v14-badge{display:inline-block;padding:4px 12px;border-radius:14px;font-size:11px;font-weight:700}
.v14-progress{width:100%;height:10px;background:var(--border);border-radius:5px;overflow:hidden;margin:8px 0}
.v14-progress-fill{height:100%;border-radius:5px;transition:width .6s ease}
.v14-stat-row{display:flex;justify-content:space-between;align-items:center;padding:12px 0;border-bottom:1px solid var(--border)}
.v14-stat-row:last-child{border-bottom:none}
.v14-cal-grid{display:grid;grid-template-columns:repeat(7,1fr);gap:4px;margin-bottom:16px}
.v14-cal-hdr{text-align:center;font-size:11px;font-weight:700;color:var(--text-muted);padding:8px 0}
.v14-cal-day{text-align:center;padding:10px 4px;border-radius:10px;font-size:13px;cursor:pointer;transition:.2s;min-height:44px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px}
.v14-cal-day:hover{background:var(--primary-light)}
.v14-cal-day.today{background:var(--primary);color:#fff;font-weight:800}
.v14-cal-day.has-round{position:relative}
.v14-cal-day.has-round::after{content:'';width:6px;height:6px;border-radius:50%;background:var(--accent);position:absolute;bottom:4px}
.v14-cal-day.empty{opacity:.3;cursor:default}
.v14-cal-day.empty:hover{background:transparent}
.v14-cal-nav{display:flex;justify-content:space-between;align-items:center;margin-bottom:14px}
.v14-cal-nav h3{font-size:17px;font-weight:800}
.v14-cal-nav button{background:none;border:1.5px solid var(--border);border-radius:10px;padding:6px 14px;cursor:pointer;font-size:14px;color:var(--text);transition:.2s}
.v14-cal-nav button:hover{border-color:var(--primary);color:var(--primary)}
.v14-metronome-circle{width:160px;height:160px;border-radius:50%;border:6px solid var(--primary);display:flex;align-items:center;justify-content:center;margin:20px auto;position:relative}
.v14-metronome-bpm{font-size:42px;font-weight:900;color:var(--primary)}
.v14-metronome-label{font-size:11px;color:var(--text-muted);text-align:center;margin-top:4px}
.v14-metronome-pulse{position:absolute;width:100%;height:100%;border-radius:50%;border:3px solid var(--primary);animation:v14Pulse 1s infinite;opacity:0}
@keyframes v14Pulse{0%{transform:scale(1);opacity:.6}100%{transform:scale(1.3);opacity:0}}
.v14-sim-canvas{width:100%;height:280px;border-radius:16px;background:#2d5a27;margin-bottom:14px;cursor:crosshair}
.v14-sim-info{display:flex;justify-content:space-around;padding:12px;background:var(--bg);border-radius:12px;margin-bottom:12px}
.v14-sim-stat{text-align:center}
.v14-sim-stat .val{font-size:20px;font-weight:800;color:var(--primary)}
.v14-sim-stat .lbl{font-size:10px;color:var(--text-muted);margin-top:2px}
.v14-goal-item{display:flex;align-items:center;gap:14px;padding:14px;background:var(--bg);border-radius:14px;margin-bottom:10px;border-left:4px solid var(--primary)}
.v14-goal-info{flex:1}
.v14-goal-title{font-size:13px;font-weight:700}
.v14-goal-sub{font-size:11px;color:var(--text-muted);margin-top:3px}
.v14-mood-btn{width:48px;height:48px;border-radius:50%;border:2px solid var(--border);background:var(--bg);font-size:22px;cursor:pointer;transition:.2s;display:flex;align-items:center;justify-content:center}
.v14-mood-btn.selected{border-color:var(--primary);background:var(--primary-light);transform:scale(1.15)}
.v14-note-item{padding:14px;background:var(--bg);border-radius:14px;margin-bottom:10px;border-left:4px solid var(--accent)}
.v14-note-item h5{font-size:13px;font-weight:700;margin-bottom:6px}
.v14-note-item p{font-size:12px;color:var(--text-muted);line-height:1.6}
.v14-note-meta{font-size:10px;color:var(--text-muted);margin-top:6px}
.v14-bucket-item{display:flex;align-items:center;gap:14px;padding:14px;background:var(--bg);border-radius:14px;margin-bottom:10px;transition:.2s}
.v14-bucket-item:hover{transform:translateX(4px)}
.v14-bucket-check{width:24px;height:24px;border-radius:50%;border:2px solid var(--border);cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:12px;flex-shrink:0;transition:.2s}
.v14-bucket-check.done{background:var(--primary);border-color:var(--primary);color:#fff}
.v14-bucket-info{flex:1}
.v14-bucket-name{font-size:13px;font-weight:700}
.v14-bucket-loc{font-size:11px;color:var(--text-muted)}
.v14-safety-card{background:var(--bg);border-radius:16px;padding:18px;margin-bottom:12px;border-left:4px solid}
.v14-safety-card.danger{border-left-color:#ff4444}
.v14-safety-card.warning{border-left-color:#ffaa00}
.v14-safety-card.info{border-left-color:#4488ff}
.v14-safety-card h4{font-size:15px;font-weight:700;margin-bottom:8px}
.v14-safety-steps{counter-reset:step}
.v14-safety-steps li{font-size:12px;color:var(--text-muted);padding:6px 0 6px 28px;position:relative;line-height:1.6;list-style:none}
.v14-safety-steps li::before{counter-increment:step;content:counter(step);position:absolute;left:0;top:6px;width:20px;height:20px;border-radius:50%;background:var(--primary);color:#fff;font-size:10px;font-weight:700;display:flex;align-items:center;justify-content:center}
.v14-align-svg{width:100%;max-width:320px;margin:16px auto;display:block}
.v14-toast{position:fixed;bottom:80px;left:50%;transform:translateX(-50%) translateY(100px);background:var(--toast-bg,#333);color:#fff;padding:12px 24px;border-radius:14px;font-size:13px;font-weight:600;z-index:11000;opacity:0;transition:.4s;pointer-events:none;display:flex;align-items:center;gap:8px}
.v14-toast.show{transform:translateX(-50%) translateY(0);opacity:1}
`;
document.head.appendChild(css14);

// --- Helpers ---
function v14LS(k,v){if(v!==undefined){localStorage.setItem('sg_v14_'+k,JSON.stringify(v));return v}try{return JSON.parse(localStorage.getItem('sg_v14_'+k))}catch(e){return null}}
function v14Toast(msg){var t=document.querySelector('.v14-toast');if(!t){t=document.createElement('div');t.className='v14-toast';document.body.appendChild(t)}t.textContent=msg;t.classList.add('show');setTimeout(function(){t.classList.remove('show')},2600)}
function v14SFX(type){try{var a=new(window.AudioContext||window.webkitAudioContext)(),o=a.createOscillator(),g=a.createGain();o.connect(g);g.connect(a.destination);var map={calendar:{f:523,d:.15,w:'sine'},sim_shot:{f:330,d:.2,w:'triangle'},growth:{f:660,d:.18,w:'sine'},safety:{f:440,d:.25,w:'square'},note:{f:494,d:.12,w:'sine'},bucket:{f:587,d:.15,w:'triangle'},metronome:{f:880,d:.08,w:'square'},align:{f:392,d:.15,w:'sine'},goal:{f:698,d:.2,w:'sine'},diary:{f:554,d:.12,w:'triangle'}};var s=map[type]||{f:440,d:.15,w:'sine'};o.type=s.w;o.frequency.value=s.f;g.gain.value=.15;g.gain.exponentialRampToValueAtTime(.001,a.currentTime+s.d);o.start();o.stop(a.currentTime+s.d)}catch(e){}}

// --- 1. Golf Round Calendar ---
function v14Calendar(){
  var data = v14LS('calendar_rounds') || [];
  var now = new Date();
  var year = now.getFullYear(), month = now.getMonth();

  function render(y,m){
    var first = new Date(y,m,1), last = new Date(y,m+1,0);
    var startDay = first.getDay(), days = last.getDate();
    var months = ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'];
    var today = new Date();
    var roundDates = data.map(function(r){return r.date});

    var html = '<div class="v14-cal-nav"><button onclick="this.closest(\'.v14-modal\').querySelector(\'[data-action=prev]\').click()">&lt;</button><h3>'+y+'년 '+months[m]+'</h3><button onclick="this.closest(\'.v14-modal\').querySelector(\'[data-action=next]\').click()">&gt;</button></div>';
    html += '<div class="v14-cal-grid">';
    var dayNames = ['일','월','화','수','목','금','토'];
    dayNames.forEach(function(d){html += '<div class="v14-cal-hdr">'+d+'</div>'});

    for(var i=0;i<startDay;i++) html += '<div class="v14-cal-day empty"></div>';
    for(var d=1;d<=days;d++){
      var dateStr = y+'-'+(m+1<10?'0':'')+(m+1)+'-'+(d<10?'0':'')+d;
      var isToday = (y===today.getFullYear()&&m===today.getMonth()&&d===today.getDate());
      var hasRound = roundDates.indexOf(dateStr)>=0;
      var cls = 'v14-cal-day'+(isToday?' today':'')+(hasRound?' has-round':'');
      html += '<div class="'+cls+'" data-date="'+dateStr+'" onclick="window._v14CalClick(\''+dateStr+'\')">'+d+'</div>';
    }
    html += '</div>';

    var monthRounds = data.filter(function(r){return r.date.startsWith(y+'-'+(m+1<10?'0':'')+(m+1))});
    if(monthRounds.length>0){
      html += '<div class="v14-divider"></div><h4 style="font-size:14px;font-weight:700;margin-bottom:10px">이번 달 라운드 ('+monthRounds.length+'회)</h4>';
      monthRounds.forEach(function(r,i){
        html += '<div class="v14-card"><h4>'+r.course+' <span class="v14-badge" style="background:var(--primary-light);color:var(--primary)">'+r.score+'타</span></h4><p>'+r.date+' | '+r.companion+'</p><button class="v14-btn v14-btn-sm v14-btn-danger" onclick="window._v14CalDel('+i+')">삭제</button></div>';
      });
    }

    html += '<div class="v14-divider"></div><h4 style="font-size:14px;font-weight:700;margin-bottom:10px">라운드 추가</h4>';
    html += '<div class="v14-grid2" style="margin-bottom:10px"><input class="v14-input" id="v14CalDate" type="date" value="'+today.toISOString().split('T')[0]+'"><input class="v14-input" id="v14CalCourse" placeholder="골프장 이름"></div>';
    html += '<div class="v14-grid2" style="margin-bottom:12px"><input class="v14-input" id="v14CalScore" type="number" placeholder="스코어" min="50" max="200"><input class="v14-input" id="v14CalComp" placeholder="동반자"></div>';
    html += '<button class="v14-btn v14-btn-primary" onclick="window._v14CalAdd()">라운드 추가</button>';

    html += '<div class="v14-divider"></div><div class="v14-stat-row"><span class="v14-stat-label">총 라운드</span><span style="font-size:16px;font-weight:800;color:var(--primary)">'+data.length+'회</span></div>';
    if(data.length>0){
      var avg = Math.round(data.reduce(function(s,r){return s+r.score},0)/data.length);
      var best = Math.min.apply(null,data.map(function(r){return r.score}));
      html += '<div class="v14-stat-row"><span class="v14-stat-label">평균 스코어</span><span style="font-size:16px;font-weight:800;color:var(--primary)">'+avg+'타</span></div>';
      html += '<div class="v14-stat-row"><span class="v14-stat-label">베스트</span><span style="font-size:16px;font-weight:800;color:var(--accent)">'+best+'타</span></div>';
    }
    return html;
  }

  window._v14CalAdd = function(){
    var d=document.getElementById('v14CalDate').value,c=document.getElementById('v14CalCourse').value,s=parseInt(document.getElementById('v14CalScore').value),p=document.getElementById('v14CalComp').value||'솔로';
    if(!d||!c||!s){v14Toast('모든 항목을 입력해주세요');return}
    data.push({date:d,course:c,score:s,companion:p});
    v14LS('calendar_rounds',data);v14SFX('calendar');v14Toast('라운드가 추가되었습니다');v14CheckAchieve();
    document.querySelector('#v14CalendarOverlay .v14-modal').querySelector('.v14-content').innerHTML=render(year,month);
  };
  window._v14CalDel = function(i){data.splice(i,1);v14LS('calendar_rounds',data);v14Toast('삭제되었습니다');document.querySelector('#v14CalendarOverlay .v14-modal').querySelector('.v14-content').innerHTML=render(year,month)};
  window._v14CalClick = function(dateStr){document.getElementById('v14CalDate').value=dateStr};

  var ov=document.createElement('div');ov.id='v14CalendarOverlay';ov.className='v14-overlay';ov.setAttribute('role','dialog');ov.setAttribute('aria-label','골프 라운드 캘린더');
  ov.innerHTML='<div class="v14-modal"><div class="v14-hdr"><h2><span class="v14i">&#x1F4C5;</span> 라운드 캘린더</h2><button class="v14-x" aria-label="닫기">&times;</button></div><div class="v14-content">'+render(year,month)+'</div><button data-action="prev" style="display:none"></button><button data-action="next" style="display:none"></button></div>';
  document.body.appendChild(ov);
  ov.querySelector('.v14-x').addEventListener('click',function(){ov.classList.remove('active')});
  ov.addEventListener('click',function(e){if(e.target===ov)ov.classList.remove('active')});
  ov.querySelector('[data-action=prev]').addEventListener('click',function(){month--;if(month<0){month=11;year--}ov.querySelector('.v14-content').innerHTML=render(year,month)});
  ov.querySelector('[data-action=next]').addEventListener('click',function(){month++;if(month>11){month=0;year++}ov.querySelector('.v14-content').innerHTML=render(year,month)});
}

// --- 2. Virtual Course Play Simulator ---
function v14Simulator(){
  var simData = v14LS('sim_history') || [];
  var currentHole = 1, shots = 0, totalShots = 0, parTotal = 0;
  var holes = [
    {par:4,dist:380,name:'1번홀 - 직선 미들',desc:'평탄한 페어웨이, 좌측 벙커 주의'},
    {par:3,dist:165,name:'2번홀 - 아일랜드 그린',desc:'워터해저드 둘러싼 숏홀'},
    {par:5,dist:520,name:'3번홀 - 도그렉 좌',desc:'왼쪽으로 휘는 롱홀, 2온 가능'},
    {par:4,dist:410,name:'4번홀 - 업힐',desc:'오르막 미들홀, 클럽 1개 더'},
    {par:4,dist:350,name:'5번홀 - 다운힐',desc:'내리막, 바람 고려 필수'},
    {par:3,dist:190,name:'6번홀 - 벙커 가드',desc:'그린 주변 4개 벙커'},
    {par:5,dist:540,name:'7번홀 - 워터 롱',desc:'페어웨이 우측 연못'},
    {par:4,dist:395,name:'8번홀 - 좁은 페어웨이',desc:'정확성이 핵심인 미들홀'},
    {par:4,dist:430,name:'9번홀 - 시그니처',desc:'클럽하우스 뷰 피니시 홀'}
  ];

  function renderSim(){
    var h = holes[currentHole-1];
    parTotal = holes.slice(0,currentHole).reduce(function(s,x){return s+x.par},0);
    var html = '<div class="v14-card" style="border-color:var(--primary)"><h4>'+h.name+' <span class="v14-badge" style="background:var(--primary-light);color:var(--primary)">Par '+h.par+' / '+h.dist+'m</span></h4><p>'+h.desc+'</p></div>';
    html += '<canvas id="v14SimCanvas" class="v14-sim-canvas" width="700" height="280"></canvas>';
    html += '<div class="v14-sim-info"><div class="v14-sim-stat"><div class="val">'+currentHole+'/9</div><div class="lbl">홀</div></div><div class="v14-sim-stat"><div class="val">'+shots+'</div><div class="lbl">현재 샷</div></div><div class="v14-sim-stat"><div class="val">'+totalShots+'</div><div class="lbl">총 샷</div></div><div class="v14-sim-stat"><div class="val">'+(totalShots-parTotal>=0?'+':'')+(totalShots-parTotal)+'</div><div class="lbl">오버/언더</div></div></div>';
    html += '<div style="display:flex;gap:8px;flex-wrap:wrap;justify-content:center">';
    for(var i=1;i<=7;i++){
      var label = i===1?'홀인원':i===2?'이글':i===3?'버디':i===4?'파':i===5?'보기':i===6?'더블보기':'트리플+';
      html += '<button class="v14-btn v14-btn-sm '+(i<=3?'v14-btn-primary':'v14-btn-secondary')+'" onclick="window._v14SimShot('+i+')">'+label+'</button>';
    }
    html += '</div>';
    if(currentHole>9){
      var score = totalShots;
      var overPar = score - holes.reduce(function(s,x){return s+x.par},0);
      html = '<div style="text-align:center;padding:30px"><div style="font-size:48px;margin-bottom:10px">&#x1F3CC;&#xFE0F;</div><h3 style="font-size:24px;font-weight:900;margin-bottom:10px">라운드 완료!</h3><div style="font-size:42px;font-weight:900;color:var(--primary)">'+score+'타</div><div style="font-size:16px;color:var(--text-muted);margin-top:8px">'+(overPar>=0?'+':'')+overPar+' (Par 36)</div><div class="v14-divider"></div><button class="v14-btn v14-btn-primary" onclick="window._v14SimReset()">다시 플레이</button></div>';
    }
    return html;
  }

  window._v14SimShot = function(s){
    shots = s;totalShots += s;currentHole++;
    if(currentHole>9){
      var score = totalShots;
      simData.push({date:new Date().toISOString().split('T')[0],score:score,par:36});
      v14LS('sim_history',simData);v14SFX('sim_shot');v14CheckAchieve();
    } else {v14SFX('sim_shot')}
    shots=0;
    document.querySelector('#v14SimOverlay .v14-content').innerHTML=renderSim();
    if(currentHole<=9) v14DrawHole(currentHole);
  };
  window._v14SimReset = function(){currentHole=1;shots=0;totalShots=0;document.querySelector('#v14SimOverlay .v14-content').innerHTML=renderSim();v14DrawHole(1)};

  var ov=document.createElement('div');ov.id='v14SimOverlay';ov.className='v14-overlay';ov.setAttribute('role','dialog');ov.setAttribute('aria-label','가상 코스 시뮬레이터');
  ov.innerHTML='<div class="v14-modal"><div class="v14-hdr"><h2><span class="v14i">&#x1F3CC;&#xFE0F;</span> 가상 코스 플레이</h2><button class="v14-x" aria-label="닫기">&times;</button></div><div class="v14-content">'+renderSim()+'</div></div>';
  document.body.appendChild(ov);
  ov.querySelector('.v14-x').addEventListener('click',function(){ov.classList.remove('active')});
  ov.addEventListener('click',function(e){if(e.target===ov)ov.classList.remove('active')});
}

function v14DrawHole(num){
  var c=document.getElementById('v14SimCanvas');if(!c)return;
  var ctx=c.getContext('2d');var w=c.width,h=c.height;
  ctx.fillStyle='#2d5a27';ctx.fillRect(0,0,w,h);
  ctx.fillStyle='#4a8a3a';
  var fwX=w*0.3,fwW=w*0.4;
  if(num===3){ctx.beginPath();ctx.moveTo(fwX,h);ctx.quadraticCurveTo(fwX-60,h*0.5,fwX+20,0);ctx.lineTo(fwX+fwW+20,0);ctx.quadraticCurveTo(fwX+fwW-40,h*0.5,fwX+fwW,h);ctx.fill()}
  else{ctx.fillRect(fwX,0,fwW,h)}
  ctx.fillStyle='#dcc06e';
  if(num===1||num===6){ctx.beginPath();ctx.ellipse(fwX-10,h*0.3,25,15,0,0,Math.PI*2);ctx.fill()}
  if(num===6){ctx.beginPath();ctx.ellipse(fwX+fwW+10,h*0.3,20,12,0,0,Math.PI*2);ctx.fill();ctx.beginPath();ctx.ellipse(fwX+fwW/2-30,h*0.15,18,10,0,0,Math.PI*2);ctx.fill();ctx.beginPath();ctx.ellipse(fwX+fwW/2+30,h*0.15,18,10,0,0,Math.PI*2);ctx.fill()}
  if(num===2||num===7){ctx.fillStyle='#3388cc';ctx.beginPath();ctx.ellipse(fwX+fwW/2,h*0.25,50,30,0,0,Math.PI*2);ctx.fill()}
  ctx.fillStyle='#66cc66';ctx.beginPath();ctx.ellipse(fwX+fwW/2,h*0.12,30,22,0,0,Math.PI*2);ctx.fill();
  ctx.fillStyle='#fff';ctx.beginPath();ctx.arc(fwX+fwW/2,h*0.12,3,0,Math.PI*2);ctx.fill();
  ctx.fillStyle='#fff';ctx.beginPath();ctx.arc(fwX+fwW/2,h*0.88,5,0,Math.PI*2);ctx.fill();
  ctx.fillStyle='rgba(255,255,255,0.7)';ctx.font='bold 13px sans-serif';ctx.textAlign='center';
  ctx.fillText('Hole '+num+' | Par '+[4,3,5,4,4,3,5,4,4][num-1],w/2,h-10);
}

// --- 3. Growth Curve Analyzer ---
function v14GrowthCurve(){
  var calData = v14LS('calendar_rounds') || [];
  var milestones = [
    {name:'첫 라운드',target:1,icon:'&#x1F3CC;&#xFE0F;'},
    {name:'10회 라운드',target:10,icon:'&#x1F3AF;'},
    {name:'100타 돌파',target:100,icon:'&#x2B50;'},
    {name:'90타 돌파',target:90,icon:'&#x1F31F;'},
    {name:'80타 돌파',target:80,icon:'&#x1F3C6;'},
    {name:'싱글 핸디캡',target:79,icon:'&#x1F451;'}
  ];

  function render(){
    var html = '';
    if(calData.length>=2){
      html += '<h4 style="font-size:14px;font-weight:700;margin-bottom:12px">스코어 추이 그래프</h4>';
      html += '<canvas id="v14GrowthCanvas" width="680" height="200" style="width:100%;height:200px;background:var(--bg);border-radius:12px;margin-bottom:16px"></canvas>';
    }

    html += '<h4 style="font-size:14px;font-weight:700;margin-bottom:12px">마일스톤 달성 현황</h4>';
    var bestScore = calData.length>0?Math.min.apply(null,calData.map(function(r){return r.score})):999;
    milestones.forEach(function(m){
      var achieved = false;
      if(m.target<=10) achieved = calData.length>=m.target;
      else achieved = bestScore<=m.target;
      html += '<div class="v14-goal-item" style="border-left-color:'+(achieved?'var(--primary)':'var(--border)')+'"><span style="font-size:24px">'+m.icon+'</span><div class="v14-goal-info"><div class="v14-goal-title">'+m.name+'</div><div class="v14-goal-sub">'+(achieved?'달성 완료!':'아직 미달성')+'</div></div><span style="font-size:18px">'+(achieved?'&#x2705;':'&#x1F512;')+'</span></div>';
    });

    if(calData.length>0){
      html += '<div class="v14-divider"></div><h4 style="font-size:14px;font-weight:700;margin-bottom:12px">성장 통계</h4>';
      var sorted = calData.slice().sort(function(a,b){return a.date.localeCompare(b.date)});
      var firstScore = sorted[0].score, lastScore = sorted[sorted.length-1].score;
      var improvement = firstScore - lastScore;
      html += '<div class="v14-stat-row"><span class="v14-stat-label">첫 라운드 스코어</span><span style="font-size:16px;font-weight:800">'+firstScore+'타</span></div>';
      html += '<div class="v14-stat-row"><span class="v14-stat-label">최근 스코어</span><span style="font-size:16px;font-weight:800">'+lastScore+'타</span></div>';
      html += '<div class="v14-stat-row"><span class="v14-stat-label">성장폭</span><span style="font-size:16px;font-weight:800;color:'+(improvement>0?'var(--primary)':'var(--accent)')+'">'+(improvement>0?'-':'+')+''+Math.abs(improvement)+'타</span></div>';
    }
    return html;
  }

  var ov=document.createElement('div');ov.id='v14GrowthOverlay';ov.className='v14-overlay';ov.setAttribute('role','dialog');
  ov.innerHTML='<div class="v14-modal"><div class="v14-hdr"><h2><span class="v14i">&#x1F4C8;</span> 성장 곡선 분석</h2><button class="v14-x" aria-label="닫기">&times;</button></div><div class="v14-content">'+render()+'</div></div>';
  document.body.appendChild(ov);
  ov.querySelector('.v14-x').addEventListener('click',function(){ov.classList.remove('active')});
  ov.addEventListener('click',function(e){if(e.target===ov)ov.classList.remove('active')});

  var obs = new MutationObserver(function(){
    if(ov.classList.contains('active')){
      setTimeout(function(){v14DrawGrowth()},100);
    }
  });
  obs.observe(ov,{attributes:true,attributeFilter:['class']});
}

function v14DrawGrowth(){
  var c=document.getElementById('v14GrowthCanvas');if(!c)return;
  var ctx=c.getContext('2d');var w=c.width,h=c.height;
  var data=(v14LS('calendar_rounds')||[]).slice().sort(function(a,b){return a.date.localeCompare(b.date)});
  if(data.length<2)return;
  ctx.clearRect(0,0,w,h);
  var scores=data.map(function(r){return r.score});
  var minS=Math.min.apply(null,scores)-5,maxS=Math.max.apply(null,scores)+5;
  var pad={l:50,r:20,t:20,b:30};
  ctx.strokeStyle='var(--border)';ctx.lineWidth=1;
  for(var i=0;i<5;i++){
    var y=pad.t+(h-pad.t-pad.b)*i/4;
    ctx.beginPath();ctx.moveTo(pad.l,y);ctx.lineTo(w-pad.r,y);ctx.stroke();
    ctx.fillStyle='var(--text-muted)';ctx.font='11px sans-serif';ctx.textAlign='right';
    ctx.fillText(Math.round(maxS-(maxS-minS)*i/4),pad.l-8,y+4);
  }
  ctx.beginPath();ctx.strokeStyle='#1a7a3a';ctx.lineWidth=3;ctx.lineJoin='round';
  scores.forEach(function(s,i){
    var x=pad.l+(w-pad.l-pad.r)*i/(scores.length-1);
    var y=pad.t+(h-pad.t-pad.b)*(1-(s-minS)/(maxS-minS));
    if(i===0)ctx.moveTo(x,y);else ctx.lineTo(x,y);
  });
  ctx.stroke();
  ctx.fillStyle='#1a7a3a';
  scores.forEach(function(s,i){
    var x=pad.l+(w-pad.l-pad.r)*i/(scores.length-1);
    var y=pad.t+(h-pad.t-pad.b)*(1-(s-minS)/(maxS-minS));
    ctx.beginPath();ctx.arc(x,y,4,0,Math.PI*2);ctx.fill();
  });
}

// --- 4. Safety & Emergency Guide ---
function v14Safety(){
  var guides = [
    {cat:'danger',title:'낙뢰 대피 프로토콜',items:['즉시 플레이 중단, 클럽을 내려놓으세요','높은 나무 아래 절대 피하지 마세요','클럽하우스나 차량으로 대피하세요','웅크린 자세로 발을 모으고 앉으세요','번개 후 30분간 실외 활동 자제하세요','대피 불가 시 낮은 지대로 이동하세요']},
    {cat:'danger',title:'열사병/탈수 예방',items:['15분마다 물 또는 전해질 음료 섭취','모자와 자외선 차단제 필수 착용','어지럼증 느끼면 즉시 그늘로 이동','젖은 수건으로 목과 손목 냉각','기온 35도 이상 시 라운드 자제','동반자의 상태도 수시로 확인']},
    {cat:'warning',title:'골프 부상 예방',items:['라운드 전 10분 이상 워밍업 필수','스윙 시 무리한 힘 사용 금지','골프 엘보 예방: 스트레칭 3세트','허리 보호: 코어 근력 강화 운동','손목 보호대 착용 권장','통증 느끼면 즉시 라운드 중단']},
    {cat:'warning',title:'카트 안전 수칙',items:['항상 카트 도로 위에서만 운행','경사로에서 급제동/급회전 금지','탑승 시 손발 카트 밖으로 내밀지 마세요','내리막에서 감속 운행','주차 시 핸드브레이크 필수','음주 후 카트 운전 금지']},
    {cat:'info',title:'응급처치 기본',items:['타구 사고: 얼음찜질 + 병원 방문','근육 경련: 스트레칭 + 수분 보충','벌레 물림: 환부 세척 + 항히스타민','일사병: 그늘 이동 + 시원한 물 섭취','골절 의심: 움직이지 말고 119 호출','AED 위치: 클럽하우스 로비 확인']},
    {cat:'info',title:'코스 에티켓 안전',items:['샷 전 반드시 전방 확인 (Fore!)','다른 팀 샷 범위에 들어가지 마세요','벙커 레이크로 발자국 정리','디봇 수리: 잔디 덮어 밟아주기','그린 위 볼마크 수리 도구 사용','카트 그린 주변 30m 이내 진입 금지']}
  ];

  function render(){
    var html = '<div class="v14-tabs" id="v14SafetyTabs">';
    html += '<div class="v14-tab active" data-idx="all">전체</div>';
    html += '<div class="v14-tab" data-idx="danger">긴급</div>';
    html += '<div class="v14-tab" data-idx="warning">주의</div>';
    html += '<div class="v14-tab" data-idx="info">정보</div>';
    html += '</div><div id="v14SafetyList">';
    guides.forEach(function(g){
      html += '<div class="v14-safety-card '+g.cat+'" data-cat="'+g.cat+'"><h4>'+(g.cat==='danger'?'&#x26A0;&#xFE0F;':g.cat==='warning'?'&#x1F6A7;':'&#x2139;&#xFE0F;')+' '+g.title+'</h4><ol class="v14-safety-steps">';
      g.items.forEach(function(item){html+='<li>'+item+'</li>'});
      html += '</ol></div>';
    });
    html += '</div>';
    return html;
  }

  var ov=document.createElement('div');ov.id='v14SafetyOverlay';ov.className='v14-overlay';ov.setAttribute('role','dialog');
  ov.innerHTML='<div class="v14-modal"><div class="v14-hdr"><h2><span class="v14i">&#x1F6D1;</span> 안전 &amp; 응급 가이드</h2><button class="v14-x" aria-label="닫기">&times;</button></div><div class="v14-content">'+render()+'</div></div>';
  document.body.appendChild(ov);
  ov.querySelector('.v14-x').addEventListener('click',function(){ov.classList.remove('active')});
  ov.addEventListener('click',function(e){if(e.target===ov)ov.classList.remove('active')});
  ov.querySelector('#v14SafetyTabs').addEventListener('click',function(e){
    var tab=e.target.closest('.v14-tab');if(!tab)return;
    ov.querySelectorAll('.v14-tab').forEach(function(t){t.classList.remove('active')});tab.classList.add('active');
    var idx=tab.dataset.idx;
    ov.querySelectorAll('.v14-safety-card').forEach(function(c){c.style.display=(idx==='all'||c.dataset.cat===idx)?'block':'none'});
    v14SFX('safety');
  });
}

// --- 5. Course Strategy Notes ---
function v14CourseNotes(){
  var notes = v14LS('course_notes') || [];

  function render(){
    var html = '<div style="margin-bottom:16px"><input class="v14-input" id="v14NoteCourse" placeholder="골프장 이름" style="margin-bottom:8px"><textarea class="v14-textarea" id="v14NoteText" placeholder="공략 노트를 입력하세요... (예: 3번홀 좌측 벙커 주의, 7번홀 2온 가능)"></textarea><div style="margin-top:8px;display:flex;gap:8px"><select class="v14-select" id="v14NoteTag"><option value="strategy">전략</option><option value="danger">위험요소</option><option value="tip">팁</option><option value="club">클럽선택</option></select><button class="v14-btn v14-btn-primary" onclick="window._v14NoteAdd()">메모 저장</button></div></div>';
    html += '<div class="v14-divider"></div>';
    if(notes.length===0){
      html += '<p style="text-align:center;color:var(--text-muted);padding:30px">아직 공략 노트가 없습니다.<br>코스별 전략을 기록해보세요!</p>';
    } else {
      html += '<h4 style="font-size:14px;font-weight:700;margin-bottom:12px">저장된 노트 ('+notes.length+'개)</h4>';
      notes.slice().reverse().forEach(function(n,i){
        var realIdx = notes.length-1-i;
        var tagColors = {strategy:'#1a7a3a',danger:'#ff4444',tip:'#ff6b35',club:'#4488ff'};
        var tagNames = {strategy:'전략',danger:'위험',tip:'팁',club:'클럽'};
        html += '<div class="v14-note-item"><h5>'+n.course+' <span class="v14-badge" style="background:'+tagColors[n.tag]+';color:#fff">'+tagNames[n.tag]+'</span></h5><p>'+n.text.replace(/</g,'&lt;').replace(/>/g,'&gt;')+'</p><div class="v14-note-meta">'+n.date+' <button style="background:none;border:none;color:#ff4444;cursor:pointer;font-size:11px" onclick="window._v14NoteDel('+realIdx+')">삭제</button></div></div>';
      });
    }
    return html;
  }

  window._v14NoteAdd = function(){
    var c=document.getElementById('v14NoteCourse').value.trim(),t=document.getElementById('v14NoteText').value.trim(),tag=document.getElementById('v14NoteTag').value;
    if(!c||!t){v14Toast('골프장 이름과 노트를 입력해주세요');return}
    notes.push({course:c,text:t,tag:tag,date:new Date().toISOString().split('T')[0]});
    v14LS('course_notes',notes);v14SFX('note');v14Toast('공략 노트 저장 완료');v14CheckAchieve();
    document.querySelector('#v14NotesOverlay .v14-content').innerHTML=render();
  };
  window._v14NoteDel = function(i){notes.splice(i,1);v14LS('course_notes',notes);v14Toast('삭제되었습니다');document.querySelector('#v14NotesOverlay .v14-content').innerHTML=render()};

  var ov=document.createElement('div');ov.id='v14NotesOverlay';ov.className='v14-overlay';ov.setAttribute('role','dialog');
  ov.innerHTML='<div class="v14-modal"><div class="v14-hdr"><h2><span class="v14i">&#x1F4DD;</span> 코스 공략 노트</h2><button class="v14-x" aria-label="닫기">&times;</button></div><div class="v14-content">'+render()+'</div></div>';
  document.body.appendChild(ov);
  ov.querySelector('.v14-x').addEventListener('click',function(){ov.classList.remove('active')});
  ov.addEventListener('click',function(e){if(e.target===ov)ov.classList.remove('active')});
}

// --- 6. Golf Bucket List ---
function v14BucketList(){
  var defaultBuckets = [
    {name:'세인트앤드루스 올드코스',loc:'스코틀랜드',done:false},
    {name:'어거스타 내셔널',loc:'미국 조지아',done:false},
    {name:'페블비치',loc:'미국 캘리포니아',done:false},
    {name:'로열 멜버른',loc:'호주',done:false},
    {name:'나인브릿지',loc:'제주도, 한국',done:false},
    {name:'핀크스 GC',loc:'제주도, 한국',done:false},
    {name:'사우스케이프',loc:'경남 남해, 한국',done:false},
    {name:'블랙스톤',loc:'경기도, 한국',done:false},
    {name:'스카이72',loc:'인천, 한국',done:false},
    {name:'턴베리',loc:'스코틀랜드',done:false},
    {name:'카네기 링크스',loc:'스코틀랜드',done:false},
    {name:'밸러라트',loc:'아일랜드',done:false}
  ];

  var buckets = v14LS('bucket_list') || defaultBuckets;

  function render(){
    var doneCount = buckets.filter(function(b){return b.done}).length;
    var html = '<div class="v14-stat-row" style="margin-bottom:16px"><span class="v14-stat-label">달성률</span><span style="font-size:16px;font-weight:800;color:var(--primary)">'+doneCount+'/'+buckets.length+' ('+(Math.round(doneCount/buckets.length*100))+'%)</span></div>';
    html += '<div class="v14-progress"><div class="v14-progress-fill" style="width:'+(doneCount/buckets.length*100)+'%;background:linear-gradient(90deg,var(--primary),#34a853)"></div></div>';
    html += '<div class="v14-divider"></div>';

    buckets.forEach(function(b,i){
      html += '<div class="v14-bucket-item"><div class="v14-bucket-check'+(b.done?' done':'')+'" onclick="window._v14BucketToggle('+i+')">'+(b.done?'&#x2713;':'')+'</div><div class="v14-bucket-info"><div class="v14-bucket-name"'+(b.done?' style="text-decoration:line-through;opacity:.6"':'')+'>'+b.name+'</div><div class="v14-bucket-loc">'+b.loc+'</div></div></div>';
    });

    html += '<div class="v14-divider"></div><h4 style="font-size:14px;font-weight:700;margin-bottom:10px">나만의 버킷리스트 추가</h4>';
    html += '<div class="v14-grid2"><input class="v14-input" id="v14BucketName" placeholder="골프장 이름"><input class="v14-input" id="v14BucketLoc" placeholder="위치"></div>';
    html += '<button class="v14-btn v14-btn-primary" style="margin-top:10px" onclick="window._v14BucketAdd()">추가</button>';
    return html;
  }

  window._v14BucketToggle = function(i){buckets[i].done=!buckets[i].done;v14LS('bucket_list',buckets);v14SFX('bucket');v14CheckAchieve();document.querySelector('#v14BucketOverlay .v14-content').innerHTML=render()};
  window._v14BucketAdd = function(){
    var n=document.getElementById('v14BucketName').value.trim(),l=document.getElementById('v14BucketLoc').value.trim();
    if(!n){v14Toast('골프장 이름을 입력해주세요');return}
    buckets.push({name:n,loc:l||'미지정',done:false});v14LS('bucket_list',buckets);v14SFX('bucket');v14Toast('버킷리스트에 추가!');
    document.querySelector('#v14BucketOverlay .v14-content').innerHTML=render();
  };

  var ov=document.createElement('div');ov.id='v14BucketOverlay';ov.className='v14-overlay';ov.setAttribute('role','dialog');
  ov.innerHTML='<div class="v14-modal"><div class="v14-hdr"><h2><span class="v14i">&#x1F3F3;&#xFE0F;</span> 골프 버킷리스트</h2><button class="v14-x" aria-label="닫기">&times;</button></div><div class="v14-content">'+render()+'</div></div>';
  document.body.appendChild(ov);
  ov.querySelector('.v14-x').addEventListener('click',function(){ov.classList.remove('active')});
  ov.addEventListener('click',function(e){if(e.target===ov)ov.classList.remove('active')});
}

// --- 7. Swing Tempo Metronome ---
function v14Metronome(){
  var bpm = 72, running = false, intervalId = null;
  var tempos = [
    {name:'존 럼 스타일',bpm:60,desc:'느리고 파워풀한 스윙'},
    {name:'표준 템포',bpm:72,desc:'대부분의 골퍼에게 적합'},
    {name:'로리 맥킬로이',bpm:80,desc:'빠르고 부드러운 리듬'},
    {name:'스카티 셰플러',bpm:76,desc:'안정적이고 일관된 템포'},
    {name:'임성재 스타일',bpm:68,desc:'여유로운 백스윙 + 임팩트 집중'}
  ];

  function render(){
    var html = '<div class="v14-metronome-circle"><div class="v14-metronome-bpm" id="v14BpmDisplay">'+bpm+'</div>'+(running?'<div class="v14-metronome-pulse"></div>':'')+'</div>';
    html += '<div class="v14-metronome-label">BPM (Beats Per Minute)</div>';
    html += '<div style="display:flex;align-items:center;justify-content:center;gap:14px;margin:20px 0">';
    html += '<button class="v14-btn v14-btn-secondary v14-btn-sm" onclick="window._v14BpmChange(-4)">-4</button>';
    html += '<input type="range" id="v14BpmSlider" min="40" max="120" value="'+bpm+'" style="flex:1;max-width:200px" oninput="window._v14BpmSlide(this.value)">';
    html += '<button class="v14-btn v14-btn-secondary v14-btn-sm" onclick="window._v14BpmChange(4)">+4</button>';
    html += '</div>';
    html += '<div style="text-align:center;margin-bottom:20px"><button class="v14-btn '+(running?'v14-btn-danger':'v14-btn-primary')+'" id="v14MetroToggle" onclick="window._v14MetroToggle()">'+(running?'&#x23F9; 정지':'&#x25B6; 시작')+'</button></div>';
    html += '<div class="v14-divider"></div><h4 style="font-size:14px;font-weight:700;margin-bottom:12px">프로 골퍼 템포 프리셋</h4>';
    tempos.forEach(function(t){
      html += '<div class="v14-card" style="cursor:pointer" onclick="window._v14BpmSet('+t.bpm+')"><h4>'+t.name+' <span class="v14-badge" style="background:var(--primary-light);color:var(--primary)">'+t.bpm+' BPM</span></h4><p>'+t.desc+'</p></div>';
    });
    html += '<div class="v14-divider"></div><div class="v14-card"><h4>&#x1F4A1; 스윙 템포 팁</h4><p>백스윙:다운스윙 비율은 3:1이 이상적입니다. '+bpm+' BPM 기준으로 백스윙 '+(60/bpm*3).toFixed(1)+'초, 다운스윙 '+(60/bpm).toFixed(1)+'초를 목표로 연습하세요.</p></div>';
    return html;
  }

  window._v14BpmChange = function(d){bpm=Math.max(40,Math.min(120,bpm+d));document.querySelector('#v14MetroOverlay .v14-content').innerHTML=render();if(running){clearInterval(intervalId);intervalId=setInterval(function(){v14SFX('metronome')},60000/bpm)}};
  window._v14BpmSlide = function(v){bpm=parseInt(v);document.getElementById('v14BpmDisplay').textContent=bpm;if(running){clearInterval(intervalId);intervalId=setInterval(function(){v14SFX('metronome')},60000/bpm)}};
  window._v14BpmSet = function(b){bpm=b;document.querySelector('#v14MetroOverlay .v14-content').innerHTML=render();if(running){clearInterval(intervalId);intervalId=setInterval(function(){v14SFX('metronome')},60000/bpm)}v14SFX('metronome')};
  window._v14MetroToggle = function(){
    running=!running;
    if(running){intervalId=setInterval(function(){v14SFX('metronome')},60000/bpm);v14Toast('메트로놈 시작: '+bpm+' BPM')}
    else{clearInterval(intervalId);intervalId=null;v14Toast('메트로놈 정지')}
    document.querySelector('#v14MetroOverlay .v14-content').innerHTML=render();
  };

  var ov=document.createElement('div');ov.id='v14MetroOverlay';ov.className='v14-overlay';ov.setAttribute('role','dialog');
  ov.innerHTML='<div class="v14-modal"><div class="v14-hdr"><h2><span class="v14i">&#x1F3B5;</span> 스윙 메트로놈</h2><button class="v14-x" aria-label="닫기">&times;</button></div><div class="v14-content">'+render()+'</div></div>';
  document.body.appendChild(ov);
  ov.querySelector('.v14-x').addEventListener('click',function(){ov.classList.remove('active');if(running){running=false;clearInterval(intervalId);intervalId=null}});
  ov.addEventListener('click',function(e){if(e.target===ov){ov.classList.remove('active');if(running){running=false;clearInterval(intervalId);intervalId=null}}});
}

// --- 8. Ball Position & Alignment Guide ---
function v14Alignment(){
  var clubs = [
    {name:'드라이버',pos:'왼발 안쪽',stance:'넓게 (어깨 이상)',ball:'티 위 (높게)',angle:'약간 업스윙',color:'#ff4444'},
    {name:'3번 우드',pos:'왼발 안쪽에서 1볼 우측',stance:'넓게',ball:'티 위 (낮게) 또는 지면',angle:'수평~약간 업',color:'#ff6b35'},
    {name:'5번 아이언',pos:'중앙에서 1볼 좌측',stance:'어깨 너비',ball:'지면',angle:'약간 다운블로',color:'#ffaa00'},
    {name:'7번 아이언',pos:'중앙',stance:'어깨 너비',ball:'지면',angle:'다운블로',color:'#44aa44'},
    {name:'9번 아이언',pos:'중앙에서 1볼 우측',stance:'좁게',ball:'지면',angle:'강한 다운블로',color:'#4488ff'},
    {name:'PW/SW',pos:'중앙~우측',stance:'좁게',ball:'지면',angle:'급격한 다운블로',color:'#8844cc'},
    {name:'퍼터',pos:'왼쪽 눈 바로 아래',stance:'편한 너비',ball:'지면',angle:'수평 스트로크',color:'#1a7a3a'}
  ];

  var alignTips = [
    {title:'타겟 정렬 루틴',desc:'1) 볼 뒤에서 타겟 확인 2) 중간 타겟 설정 (볼 앞 1m 지점) 3) 클럽페이스를 중간 타겟에 정렬 4) 발, 무릎, 엉덩이, 어깨를 타겟 라인에 평행하게'},
    {title:'스탠스 체크포인트',desc:'양발 끝이 타겟라인과 평행한지 확인. 어깨선이 목표를 향하는지 점검. 볼 위치는 클럽에 따라 조정. 체중 분배는 양발 50:50 (드라이버는 60:40 우측)'},
    {title:'그립 압력 가이드',desc:'10점 만점 기준 4~5 정도의 압력. 왼손(리드손) 마지막 3개 손가락에 힘. 오른손(트레일)은 부드럽게 감싸기. 어깨와 팔의 긴장은 최소화'}
  ];

  function render(){
    var html = '<h4 style="font-size:14px;font-weight:700;margin-bottom:12px">클럽별 볼 포지션</h4>';
    html += '<svg viewBox="0 0 400 200" class="v14-align-svg" style="max-width:100%">';
    html += '<rect x="0" y="0" width="400" height="200" rx="12" fill="var(--bg)"/>';
    html += '<line x1="200" y1="30" x2="200" y2="170" stroke="var(--border)" stroke-width="1" stroke-dasharray="4"/>';
    html += '<text x="200" y="190" text-anchor="middle" font-size="10" fill="var(--text-muted)">중앙</text>';
    html += '<rect x="100" y="160" width="200" height="12" rx="6" fill="var(--border)" opacity=".5"/>';
    html += '<text x="90" y="168" text-anchor="end" font-size="9" fill="var(--text-muted)">좌(타겟)</text>';
    html += '<text x="310" y="168" font-size="9" fill="var(--text-muted)">우</text>';
    clubs.forEach(function(c,i){
      var x = 130 + i*25;
      var y = 60 + i*12;
      html += '<circle cx="'+x+'" cy="'+y+'" r="6" fill="'+c.color+'"/>';
      html += '<text x="'+x+'" y="'+(y-10)+'" text-anchor="middle" font-size="8" font-weight="700" fill="'+c.color+'">'+c.name.substring(0,2)+'</text>';
    });
    html += '</svg>';

    clubs.forEach(function(c){
      html += '<div class="v14-card"><h4><span style="display:inline-block;width:12px;height:12px;border-radius:50%;background:'+c.color+'"></span> '+c.name+'</h4><div class="v14-grid2"><div><span style="font-size:11px;color:var(--text-muted)">볼 위치</span><div style="font-size:13px;font-weight:600">'+c.pos+'</div></div><div><span style="font-size:11px;color:var(--text-muted)">스탠스</span><div style="font-size:13px;font-weight:600">'+c.stance+'</div></div><div><span style="font-size:11px;color:var(--text-muted)">볼 높이</span><div style="font-size:13px;font-weight:600">'+c.ball+'</div></div><div><span style="font-size:11px;color:var(--text-muted)">타격 각도</span><div style="font-size:13px;font-weight:600">'+c.angle+'</div></div></div></div>';
    });

    html += '<div class="v14-divider"></div><h4 style="font-size:14px;font-weight:700;margin-bottom:12px">얼라인먼트 팁</h4>';
    alignTips.forEach(function(t){
      html += '<div class="v14-card"><h4>'+t.title+'</h4><p>'+t.desc+'</p></div>';
    });
    return html;
  }

  var ov=document.createElement('div');ov.id='v14AlignOverlay';ov.className='v14-overlay';ov.setAttribute('role','dialog');
  ov.innerHTML='<div class="v14-modal"><div class="v14-hdr"><h2><span class="v14i">&#x1F3AF;</span> 볼 포지션 &amp; 얼라인먼트</h2><button class="v14-x" aria-label="닫기">&times;</button></div><div class="v14-content">'+render()+'</div></div>';
  document.body.appendChild(ov);
  ov.querySelector('.v14-x').addEventListener('click',function(){ov.classList.remove('active')});
  ov.addEventListener('click',function(e){if(e.target===ov)ov.classList.remove('active')});
}

// --- 9. Season Goal Tracker ---
function v14SeasonGoals(){
  var defaultGoals = [
    {name:'연간 라운드 24회',target:24,current:0,unit:'회',icon:'&#x1F3CC;&#xFE0F;'},
    {name:'베스트 스코어 갱신',target:1,current:0,unit:'회',icon:'&#x1F3C6;'},
    {name:'80타 이하 3회',target:3,current:0,unit:'회',icon:'&#x2B50;'},
    {name:'새 코스 5곳 방문',target:5,current:0,unit:'곳',icon:'&#x1F30D;'},
    {name:'연습 100회',target:100,current:0,unit:'회',icon:'&#x1F4AA;'},
    {name:'버디 30개',target:30,current:0,unit:'개',icon:'&#x1F426;'},
    {name:'스윙 연습 주 3회',target:144,current:0,unit:'회',icon:'&#x1F3CC;&#xFE0F;'},
    {name:'골프 퀴즈 100문제',target:100,current:0,unit:'문제',icon:'&#x1F4DA;'}
  ];

  var goals = v14LS('season_goals') || defaultGoals;
  var seasonYear = new Date().getFullYear();

  function render(){
    var totalPct = goals.length>0?Math.round(goals.reduce(function(s,g){return s+Math.min(100,g.current/g.target*100)},0)/goals.length):0;
    var html = '<div style="text-align:center;margin-bottom:20px"><div style="font-size:14px;font-weight:700;color:var(--text-muted)">'+seasonYear+'년 시즌 목표</div><div style="font-size:48px;font-weight:900;color:var(--primary);margin:8px 0">'+totalPct+'%</div><div class="v14-progress" style="max-width:300px;margin:0 auto"><div class="v14-progress-fill" style="width:'+totalPct+'%;background:linear-gradient(90deg,var(--primary),#34a853)"></div></div></div>';
    html += '<div class="v14-divider"></div>';

    goals.forEach(function(g,i){
      var pct = Math.min(100,Math.round(g.current/g.target*100));
      html += '<div class="v14-goal-item"><span style="font-size:24px">'+g.icon+'</span><div class="v14-goal-info"><div class="v14-goal-title">'+g.name+'</div><div class="v14-goal-sub">'+g.current+'/'+g.target+' '+g.unit+' ('+pct+'%)</div><div class="v14-progress"><div class="v14-progress-fill" style="width:'+pct+'%;background:'+(pct>=100?'#34a853':'var(--primary)')+'"></div></div></div><div style="display:flex;gap:4px"><button class="v14-btn v14-btn-sm v14-btn-secondary" onclick="window._v14GoalUpdate('+i+',-1)">-</button><button class="v14-btn v14-btn-sm v14-btn-primary" onclick="window._v14GoalUpdate('+i+',1)">+</button></div></div>';
    });

    html += '<div class="v14-divider"></div><h4 style="font-size:14px;font-weight:700;margin-bottom:10px">사용자 정의 목표 추가</h4>';
    html += '<div class="v14-grid2" style="margin-bottom:8px"><input class="v14-input" id="v14GoalName" placeholder="목표 이름"><input class="v14-input" id="v14GoalTarget" type="number" placeholder="목표 수치" min="1"></div>';
    html += '<button class="v14-btn v14-btn-primary" onclick="window._v14GoalAdd()">목표 추가</button>';
    html += '<button class="v14-btn v14-btn-secondary" style="margin-left:8px" onclick="window._v14GoalReset()">초기화</button>';
    return html;
  }

  window._v14GoalUpdate = function(i,d){goals[i].current=Math.max(0,goals[i].current+d);v14LS('season_goals',goals);v14SFX('goal');if(goals[i].current>=goals[i].target)v14Toast(goals[i].name+' 달성!');v14CheckAchieve();document.querySelector('#v14GoalsOverlay .v14-content').innerHTML=render()};
  window._v14GoalAdd = function(){
    var n=document.getElementById('v14GoalName').value.trim(),t=parseInt(document.getElementById('v14GoalTarget').value);
    if(!n||!t){v14Toast('이름과 목표 수치를 입력해주세요');return}
    goals.push({name:n,target:t,current:0,unit:'',icon:'&#x1F3AF;'});v14LS('season_goals',goals);v14Toast('목표 추가 완료');
    document.querySelector('#v14GoalsOverlay .v14-content').innerHTML=render();
  };
  window._v14GoalReset = function(){goals=defaultGoals.map(function(g){return Object.assign({},g)});v14LS('season_goals',goals);v14Toast('목표가 초기화되었습니다');document.querySelector('#v14GoalsOverlay .v14-content').innerHTML=render()};

  var ov=document.createElement('div');ov.id='v14GoalsOverlay';ov.className='v14-overlay';ov.setAttribute('role','dialog');
  ov.innerHTML='<div class="v14-modal"><div class="v14-hdr"><h2><span class="v14i">&#x1F3AF;</span> 시즌 목표 추적</h2><button class="v14-x" aria-label="닫기">&times;</button></div><div class="v14-content">'+render()+'</div></div>';
  document.body.appendChild(ov);
  ov.querySelector('.v14-x').addEventListener('click',function(){ov.classList.remove('active')});
  ov.addEventListener('click',function(e){if(e.target===ov)ov.classList.remove('active')});
}

// --- 10. Mental Diary ---
function v14MentalDiary(){
  var entries = v14LS('mental_diary') || [];
  var moods = [
    {emoji:'&#x1F60E;',label:'최고',value:5},
    {emoji:'&#x1F60A;',label:'좋음',value:4},
    {emoji:'&#x1F610;',label:'보통',value:3},
    {emoji:'&#x1F61F;',label:'불안',value:2},
    {emoji:'&#x1F624;',label:'분노',value:1}
  ];

  function render(){
    var html = '<h4 style="font-size:14px;font-weight:700;margin-bottom:12px">오늘의 멘탈 기록</h4>';
    html += '<div style="margin-bottom:14px"><input class="v14-input" id="v14DiaryDate" type="date" value="'+new Date().toISOString().split('T')[0]+'" style="margin-bottom:8px"></div>';
    html += '<div style="margin-bottom:14px"><label style="font-size:12px;font-weight:700;display:block;margin-bottom:6px">라운드 전 기분</label><div style="display:flex;gap:10px;justify-content:center" id="v14MoodBefore">';
    moods.forEach(function(m){html+='<button class="v14-mood-btn" data-val="'+m.value+'" onclick="window._v14MoodSelect(\'before\',this)" title="'+m.label+'">'+m.emoji+'</button>'});
    html += '</div></div>';
    html += '<div style="margin-bottom:14px"><label style="font-size:12px;font-weight:700;display:block;margin-bottom:6px">라운드 후 기분</label><div style="display:flex;gap:10px;justify-content:center" id="v14MoodAfter">';
    moods.forEach(function(m){html+='<button class="v14-mood-btn" data-val="'+m.value+'" onclick="window._v14MoodSelect(\'after\',this)" title="'+m.label+'">'+m.emoji+'</button>'});
    html += '</div></div>';
    html += '<div style="margin-bottom:14px"><label style="font-size:12px;font-weight:700;display:block;margin-bottom:6px">집중도 (1~10)</label><div style="display:flex;align-items:center;gap:10px"><input type="range" id="v14Focus" min="1" max="10" value="5" style="flex:1" oninput="document.getElementById(\'v14FocusVal\').textContent=this.value"><span id="v14FocusVal" style="font-size:18px;font-weight:800;color:var(--primary);min-width:30px;text-align:center">5</span></div></div>';
    html += '<div style="margin-bottom:14px"><label style="font-size:12px;font-weight:700;display:block;margin-bottom:6px">멘탈 메모</label><textarea class="v14-textarea" id="v14DiaryMemo" placeholder="오늘 라운드에서 느낀 점, 멘탈 관리 성공/실패 경험..."></textarea></div>';
    html += '<button class="v14-btn v14-btn-primary" onclick="window._v14DiaryAdd()">기록 저장</button>';

    if(entries.length>0){
      html += '<div class="v14-divider"></div><h4 style="font-size:14px;font-weight:700;margin-bottom:12px">지난 기록 ('+entries.length+'개)</h4>';
      var moodMap = {};moods.forEach(function(m){moodMap[m.value]=m.emoji});
      entries.slice().reverse().forEach(function(e,i){
        var realIdx=entries.length-1-i;
        html += '<div class="v14-card"><h4>'+e.date+' <span style="font-size:12px;color:var(--text-muted)">집중도: '+e.focus+'/10</span></h4><p>기분: '+moodMap[e.before]+' &rarr; '+moodMap[e.after]+'</p>'+(e.memo?'<p style="margin-top:6px">'+e.memo.replace(/</g,'&lt;')+'</p>':'')+'<button style="background:none;border:none;color:#ff4444;cursor:pointer;font-size:11px;margin-top:6px" onclick="window._v14DiaryDel('+realIdx+')">삭제</button></div>';
      });

      if(entries.length>=3){
        var avgFocus = Math.round(entries.reduce(function(s,e){return s+e.focus},0)/entries.length*10)/10;
        var avgBefore = Math.round(entries.reduce(function(s,e){return s+e.before},0)/entries.length*10)/10;
        var avgAfter = Math.round(entries.reduce(function(s,e){return s+e.after},0)/entries.length*10)/10;
        html += '<div class="v14-divider"></div><h4 style="font-size:14px;font-weight:700;margin-bottom:12px">멘탈 통계</h4>';
        html += '<div class="v14-stat-row"><span class="v14-stat-label">평균 집중도</span><span style="font-size:16px;font-weight:800;color:var(--primary)">'+avgFocus+'/10</span></div>';
        html += '<div class="v14-stat-row"><span class="v14-stat-label">평균 기분 (전)</span><span style="font-size:16px;font-weight:800">'+avgBefore+'/5</span></div>';
        html += '<div class="v14-stat-row"><span class="v14-stat-label">평균 기분 (후)</span><span style="font-size:16px;font-weight:800">'+avgAfter+'/5</span></div>';
      }
    }
    return html;
  }

  var selectedMood = {before:0,after:0};
  window._v14MoodSelect = function(type,btn){
    selectedMood[type]=parseInt(btn.dataset.val);
    var container = document.getElementById(type==='before'?'v14MoodBefore':'v14MoodAfter');
    container.querySelectorAll('.v14-mood-btn').forEach(function(b){b.classList.remove('selected')});
    btn.classList.add('selected');
  };
  window._v14DiaryAdd = function(){
    if(!selectedMood.before||!selectedMood.after){v14Toast('라운드 전후 기분을 선택해주세요');return}
    entries.push({date:document.getElementById('v14DiaryDate').value,before:selectedMood.before,after:selectedMood.after,focus:parseInt(document.getElementById('v14Focus').value),memo:document.getElementById('v14DiaryMemo').value.trim()});
    v14LS('mental_diary',entries);v14SFX('diary');v14Toast('멘탈 다이어리 저장 완료');v14CheckAchieve();selectedMood={before:0,after:0};
    document.querySelector('#v14DiaryOverlay .v14-content').innerHTML=render();
  };
  window._v14DiaryDel = function(i){entries.splice(i,1);v14LS('mental_diary',entries);v14Toast('삭제되었습니다');document.querySelector('#v14DiaryOverlay .v14-content').innerHTML=render()};

  var ov=document.createElement('div');ov.id='v14DiaryOverlay';ov.className='v14-overlay';ov.setAttribute('role','dialog');
  ov.innerHTML='<div class="v14-modal"><div class="v14-hdr"><h2><span class="v14i">&#x1F9E0;</span> 멘탈 다이어리</h2><button class="v14-x" aria-label="닫기">&times;</button></div><div class="v14-content">'+render()+'</div></div>';
  document.body.appendChild(ov);
  ov.querySelector('.v14-x').addEventListener('click',function(){ov.classList.remove('active')});
  ov.addEventListener('click',function(e){if(e.target===ov)ov.classList.remove('active')});
}

// --- Achievement System ---
var v14Achievements = [
  {id:'v14_calendar_first',name:'첫 라운드 기록',desc:'캘린더에 첫 라운드 추가',check:function(){return (v14LS('calendar_rounds')||[]).length>=1}},
  {id:'v14_calendar_10',name:'라운드 마니아',desc:'캘린더에 10회 라운드 기록',check:function(){return (v14LS('calendar_rounds')||[]).length>=10}},
  {id:'v14_sim_play',name:'가상 라운드 클리어',desc:'코스 시뮬레이터 1회 완료',check:function(){return (v14LS('sim_history')||[]).length>=1}},
  {id:'v14_note_first',name:'전략가의 시작',desc:'코스 공략 노트 첫 작성',check:function(){return (v14LS('course_notes')||[]).length>=1}},
  {id:'v14_note_10',name:'코스 분석가',desc:'공략 노트 10개 작성',check:function(){return (v14LS('course_notes')||[]).length>=10}},
  {id:'v14_bucket_done',name:'드림 코스 정복',desc:'버킷리스트 1곳 달성',check:function(){return (v14LS('bucket_list')||[]).filter(function(b){return b.done}).length>=1}},
  {id:'v14_bucket_3',name:'세계 여행 골퍼',desc:'버킷리스트 3곳 달성',check:function(){return (v14LS('bucket_list')||[]).filter(function(b){return b.done}).length>=3}},
  {id:'v14_goal_complete',name:'목표 달성자',desc:'시즌 목표 1개 100% 달성',check:function(){return (v14LS('season_goals')||[]).filter(function(g){return g.current>=g.target}).length>=1}},
  {id:'v14_diary_first',name:'멘탈 케어 시작',desc:'멘탈 다이어리 첫 기록',check:function(){return (v14LS('mental_diary')||[]).length>=1}},
  {id:'v14_diary_7',name:'멘탈 마스터',desc:'멘탈 다이어리 7회 기록',check:function(){return (v14LS('mental_diary')||[]).length>=7}}
];

function v14CheckAchieve(){
  var achieved = v14LS('achievements') || {};
  v14Achievements.forEach(function(a){
    if(!achieved[a.id]&&a.check()){
      achieved[a.id]=new Date().toISOString();v14LS('achievements',achieved);
      v14Toast('&#x1F3C5; '+a.name+' 업적 달성!');v14SFX('goal');
    }
  });
}

// --- Quick Action Buttons ---
function v14QuickActions(){
  var actions = [
    {id:'v14CalBtn',label:'&#x1F4C5; 캘린더',overlay:'v14CalendarOverlay'},
    {id:'v14SimBtn',label:'&#x1F3CC;&#xFE0F; 가상플레이',overlay:'v14SimOverlay'},
    {id:'v14GrowthBtn',label:'&#x1F4C8; 성장곡선',overlay:'v14GrowthOverlay'},
    {id:'v14SafetyBtn',label:'&#x1F6D1; 안전가이드',overlay:'v14SafetyOverlay'},
    {id:'v14NotesBtn',label:'&#x1F4DD; 공략노트',overlay:'v14NotesOverlay'},
    {id:'v14BucketBtn',label:'&#x1F3F3;&#xFE0F; 버킷리스트',overlay:'v14BucketOverlay'},
    {id:'v14MetroBtn',label:'&#x1F3B5; 메트로놈',overlay:'v14MetroOverlay'},
    {id:'v14AlignBtn',label:'&#x1F3AF; 볼포지션',overlay:'v14AlignOverlay'},
    {id:'v14GoalsBtn',label:'&#x1F3AF; 시즌목표',overlay:'v14GoalsOverlay'},
    {id:'v14DiaryBtn',label:'&#x1F9E0; 멘탈다이어리',overlay:'v14DiaryOverlay'}
  ];

  function inject(){
    var container = document.querySelector('.quick-actions, .v13-quick, .v12-quick, .v11-quick, .v10-quick, .v9-quick, .v8-quick');
    if(!container){
      var cards = document.querySelector('.cards-grid, .card-grid, .results, #results');
      if(!cards) return;
      container = document.createElement('div');
      container.style.cssText = 'display:flex;flex-wrap:wrap;gap:8px;padding:12px 20px;max-width:1400px;margin:0 auto';
      cards.parentNode.insertBefore(container, cards);
    }
    actions.forEach(function(a){
      if(document.getElementById(a.id)) return;
      var btn = document.createElement('button');
      btn.id = a.id;
      btn.innerHTML = a.label;
      btn.style.cssText = 'padding:8px 16px;border:1.5px solid var(--border);border-radius:20px;background:var(--card-bg);font-size:12px;font-weight:600;cursor:pointer;transition:.2s;color:var(--text);white-space:nowrap';
      btn.addEventListener('mouseover',function(){this.style.borderColor='var(--primary)';this.style.color='var(--primary)'});
      btn.addEventListener('mouseout',function(){this.style.borderColor='var(--border)';this.style.color='var(--text)'});
      btn.addEventListener('click',function(){document.getElementById(a.overlay).classList.add('active');v14SFX('calendar')});
      container.appendChild(btn);
    });
  }

  if(document.readyState==='complete')inject();
  else window.addEventListener('load',function(){setTimeout(inject,800)});
  setTimeout(inject,1500);
  setTimeout(inject,3000);
}

// --- Keyboard Shortcuts ---
document.addEventListener('keydown',function(e){
  var t=e.target.tagName;if(t==='INPUT'||t==='TEXTAREA'||t==='SELECT')return;
  var map={
    '1':{ctrl:true,overlay:'v14CalendarOverlay'},
    '3':{ctrl:true,overlay:'v14SimOverlay'},
    'u':{overlay:'v14GrowthOverlay'},
    'j':{overlay:'v14SafetyOverlay'},
    'o':{overlay:'v14NotesOverlay'}
  };
  var key=e.key.toLowerCase();
  if(map[key]){
    if(map[key].ctrl&&!e.ctrlKey)return;
    e.preventDefault();
    var el=document.getElementById(map[key].overlay);if(el)el.classList.add('active');
    v14SFX('calendar');
  }
});

document.addEventListener('keydown',function(e){
  if(e.key==='Escape'){
    var overlays=['v14CalendarOverlay','v14SimOverlay','v14GrowthOverlay','v14SafetyOverlay','v14NotesOverlay','v14BucketOverlay','v14MetroOverlay','v14AlignOverlay','v14GoalsOverlay','v14DiaryOverlay'];
    overlays.forEach(function(id){var el=document.getElementById(id);if(el)el.classList.remove('active')});
    if(window._v14MetroToggle){var ov=document.getElementById('v14MetroOverlay');if(ov&&!ov.classList.contains('active')){}}
  }
});

// --- Init ---
function v14Init(){
  v14Calendar();
  v14Simulator();
  v14GrowthCurve();
  v14Safety();
  v14CourseNotes();
  v14BucketList();
  v14Metronome();
  v14Alignment();
  v14SeasonGoals();
  v14MentalDiary();
  v14QuickActions();
  v14CheckAchieve();
}

if(document.readyState==='complete'||document.readyState==='interactive'){setTimeout(v14Init,200)}
else{document.addEventListener('DOMContentLoaded',v14Init)}

})();
