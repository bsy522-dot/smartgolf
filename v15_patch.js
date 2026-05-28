(function(){
'use strict';

// === SmartGolf v15.0 Patch ===
// 1. 골프 소셜 허브 (골퍼프로필+도전+활동피드)
// 2. 스윙 체크리스트 (라운드전/중/후 20항목)
// 3. 날씨 비거리 보정 계산기 (풍속/고도/온도/습도)
// 4. 골프 피트니스 8종 운동 가이드
// 5. 샷 패턴 분석기 (미스샷 경향 추적 + 차트)
// 6. 라운드 복기 시스템 (홀별 반성/분석)
// 7. 클럽 추천 AI (상황별 클럽 선택)
// 8. 골프 룰 백과 30항목 + 퀴즈
// 9. 퍼팅 연습 미니게임 (Canvas 퍼팅)
// 10. 골프 커뮤니티 게시판 (팁/후기/질문)

var css15 = document.createElement('style');
css15.textContent = `
.v15-overlay{position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,.82);z-index:10040;display:none;align-items:center;justify-content:center;backdrop-filter:blur(14px)}
.v15-overlay.active{display:flex}
.v15-modal{background:var(--card-bg,#fff);border-radius:26px;padding:30px;width:96%;max-width:760px;max-height:93vh;overflow-y:auto;box-shadow:0 36px 110px rgba(0,0,0,.6);animation:v15Rise .38s cubic-bezier(.22,1,.36,1)}
@keyframes v15Rise{from{opacity:0;transform:translateY(36px) scale(.93)}to{opacity:1;transform:translateY(0) scale(1)}}
.v15-hdr{display:flex;justify-content:space-between;align-items:center;margin-bottom:18px}
.v15-hdr h2{font-size:22px;font-weight:800;display:flex;align-items:center;gap:10px}
.v15-hdr h2 .v15i{font-size:28px}
.v15-x{background:none;border:none;font-size:28px;cursor:pointer;color:var(--text-muted);padding:4px 10px;border-radius:10px;transition:.2s}
.v15-x:hover{background:var(--border);color:var(--text)}
.v15-tabs{display:flex;gap:6px;margin-bottom:16px;overflow-x:auto;padding-bottom:4px;scrollbar-width:none}
.v15-tabs::-webkit-scrollbar{display:none}
.v15-tab{padding:9px 18px;border-radius:24px;border:1.5px solid var(--border);background:var(--bg);font-size:12px;font-weight:700;cursor:pointer;white-space:nowrap;transition:.25s}
.v15-tab.active{background:var(--primary);color:#fff;border-color:var(--primary);box-shadow:0 3px 12px rgba(26,122,58,.35)}
.v15-card{background:var(--bg);border-radius:16px;padding:18px;margin-bottom:12px;transition:.25s;border:1.5px solid transparent}
.v15-card:hover{border-color:var(--primary);transform:translateY(-2px);box-shadow:0 4px 16px rgba(26,122,58,.12)}
.v15-card h4{font-size:15px;font-weight:700;margin-bottom:8px;display:flex;align-items:center;gap:8px}
.v15-card p{font-size:12px;color:var(--text-muted);line-height:1.7}
.v15-btn{padding:11px 22px;border:none;border-radius:14px;font-size:13px;font-weight:700;cursor:pointer;transition:.25s;display:inline-flex;align-items:center;gap:6px}
.v15-btn-primary{background:linear-gradient(135deg,var(--primary),#34a853);color:#fff}
.v15-btn-primary:hover{transform:translateY(-2px);box-shadow:0 8px 20px rgba(26,122,58,.4)}
.v15-btn-sm{padding:7px 14px;font-size:11px;border-radius:10px}
.v15-btn-secondary{background:var(--bg);color:var(--text);border:1.5px solid var(--border)}
.v15-btn-secondary:hover{border-color:var(--primary);color:var(--primary)}
.v15-btn-danger{background:#ff4444;color:#fff}
.v15-btn-danger:hover{background:#cc0000}
.v15-input{width:100%;padding:11px 16px;border:2px solid var(--border);border-radius:12px;font-size:13px;background:var(--bg);color:var(--text);transition:.2s}
.v15-input:focus{border-color:var(--primary);outline:none;box-shadow:0 0 0 3px rgba(26,122,58,.1)}
.v15-textarea{width:100%;padding:11px 16px;border:2px solid var(--border);border-radius:12px;font-size:13px;background:var(--bg);color:var(--text);min-height:80px;resize:vertical;font-family:inherit}
.v15-textarea:focus{border-color:var(--primary);outline:none}
.v15-select{padding:9px 14px;border:2px solid var(--border);border-radius:10px;font-size:13px;background:var(--bg);color:var(--text)}
.v15-grid2{display:grid;grid-template-columns:1fr 1fr;gap:12px}
.v15-grid3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px}
@media(max-width:500px){.v15-grid2,.v15-grid3{grid-template-columns:1fr}}
.v15-stat-card{background:linear-gradient(135deg,var(--primary),#2ecc71);color:#fff;border-radius:16px;padding:18px;text-align:center}
.v15-stat-card .num{font-size:32px;font-weight:900}
.v15-stat-card .lbl{font-size:11px;opacity:.85;margin-top:4px}
.v15-progress{width:100%;height:10px;background:var(--border);border-radius:5px;overflow:hidden;margin:8px 0}
.v15-progress-fill{height:100%;background:linear-gradient(90deg,var(--primary),#2ecc71);border-radius:5px;transition:width .6s ease}
.v15-badge{display:inline-block;padding:4px 10px;border-radius:12px;font-size:10px;font-weight:700}
.v15-badge-green{background:#e8f5e9;color:#1a7a3a}
.v15-badge-red{background:#fce4ec;color:#c62828}
.v15-badge-blue{background:#e3f2fd;color:#1565c0}
.v15-badge-orange{background:#fff3e0;color:#e65100}
.v15-checklist-item{display:flex;align-items:center;gap:10px;padding:10px 14px;border-radius:12px;background:var(--bg);margin-bottom:6px;cursor:pointer;transition:.2s;user-select:none}
.v15-checklist-item:hover{background:var(--primary-light)}
.v15-checklist-item.checked{opacity:.6;text-decoration:line-through}
.v15-checklist-item .chk{width:22px;height:22px;border:2px solid var(--border);border-radius:6px;display:flex;align-items:center;justify-content:center;font-size:14px;transition:.2s;flex-shrink:0}
.v15-checklist-item.checked .chk{background:var(--primary);border-color:var(--primary);color:#fff}
.v15-putt-canvas{width:100%;max-width:400px;margin:0 auto;display:block;border-radius:16px;border:2px solid var(--border);cursor:crosshair;touch-action:none}
.v15-feed-item{padding:14px;border-radius:14px;background:var(--bg);margin-bottom:10px;border-left:4px solid var(--primary)}
.v15-feed-item .feed-author{font-weight:700;font-size:13px;margin-bottom:4px}
.v15-feed-item .feed-time{font-size:10px;color:var(--text-muted)}
.v15-feed-item .feed-body{font-size:12px;line-height:1.6;margin-top:6px}
.v15-chart-bar{display:flex;align-items:end;gap:6px;height:120px;padding:10px 0}
.v15-chart-bar .bar{flex:1;background:linear-gradient(to top,var(--primary),#2ecc71);border-radius:6px 6px 0 0;min-height:4px;transition:height .5s ease;position:relative}
.v15-chart-bar .bar-label{position:absolute;bottom:-18px;left:50%;transform:translateX(-50%);font-size:9px;color:var(--text-muted);white-space:nowrap}
.v15-chart-bar .bar-val{position:absolute;top:-16px;left:50%;transform:translateX(-50%);font-size:10px;font-weight:700;color:var(--text)}
.v15-rule-card{padding:14px;border-radius:14px;background:var(--bg);margin-bottom:8px;border-left:4px solid #1565c0;cursor:pointer;transition:.2s}
.v15-rule-card:hover{transform:translateX(4px)}
.v15-rule-card .rule-num{font-size:10px;font-weight:800;color:#1565c0;margin-bottom:4px}
.v15-rule-card .rule-title{font-size:14px;font-weight:700;margin-bottom:4px}
.v15-rule-card .rule-desc{font-size:12px;color:var(--text-muted);line-height:1.6;display:none}
.v15-rule-card.expanded .rule-desc{display:block}
.v15-exercise{display:flex;gap:14px;padding:14px;border-radius:14px;background:var(--bg);margin-bottom:10px;align-items:center}
.v15-exercise .ex-icon{font-size:36px;flex-shrink:0}
.v15-exercise .ex-name{font-size:14px;font-weight:700}
.v15-exercise .ex-info{font-size:11px;color:var(--text-muted);margin-top:3px}
.v15-exercise .ex-btn{margin-left:auto;flex-shrink:0}
`;
document.head.appendChild(css15);

// === SFX Engine v15 ===
var actx15=null;
function initAudio15(){if(!actx15)try{actx15=new(window.AudioContext||window.webkitAudioContext)}catch(e){}}
function sfx15(type){
  initAudio15();if(!actx15)return;
  var t=actx15.currentTime,o,g;
  g=actx15.createGain();g.connect(actx15.destination);
  switch(type){
    case 'social':
      o=actx15.createOscillator();o.type='sine';o.frequency.setValueAtTime(523,t);o.frequency.linearRampToValueAtTime(784,t+.08);
      g.gain.setValueAtTime(.15,t);g.gain.linearRampToValueAtTime(0,t+.2);o.connect(g);o.start(t);o.stop(t+.2);break;
    case 'checklist':
      o=actx15.createOscillator();o.type='triangle';o.frequency.setValueAtTime(880,t);
      g.gain.setValueAtTime(.12,t);g.gain.linearRampToValueAtTime(0,t+.12);o.connect(g);o.start(t);o.stop(t+.12);break;
    case 'weather':
      o=actx15.createOscillator();o.type='sine';o.frequency.setValueAtTime(392,t);o.frequency.linearRampToValueAtTime(523,t+.15);
      g.gain.setValueAtTime(.1,t);g.gain.linearRampToValueAtTime(0,t+.25);o.connect(g);o.start(t);o.stop(t+.25);break;
    case 'fitness':
      o=actx15.createOscillator();o.type='square';o.frequency.setValueAtTime(660,t);
      g.gain.setValueAtTime(.08,t);g.gain.linearRampToValueAtTime(0,t+.1);o.connect(g);o.start(t);o.stop(t+.1);
      var o2=actx15.createOscillator(),g2=actx15.createGain();g2.connect(actx15.destination);
      o2.type='square';o2.frequency.setValueAtTime(880,t+.12);g2.gain.setValueAtTime(.08,t+.12);g2.gain.linearRampToValueAtTime(0,t+.22);
      o2.connect(g2);o2.start(t+.12);o2.stop(t+.22);break;
    case 'shot_pattern':
      o=actx15.createOscillator();o.type='sawtooth';o.frequency.setValueAtTime(440,t);o.frequency.linearRampToValueAtTime(660,t+.1);
      g.gain.setValueAtTime(.07,t);g.gain.linearRampToValueAtTime(0,t+.18);o.connect(g);o.start(t);o.stop(t+.18);break;
    case 'review':
      o=actx15.createOscillator();o.type='sine';o.frequency.setValueAtTime(349,t);o.frequency.linearRampToValueAtTime(523,t+.2);
      g.gain.setValueAtTime(.1,t);g.gain.linearRampToValueAtTime(0,t+.3);o.connect(g);o.start(t);o.stop(t+.3);break;
    case 'club_ai':
      [523,659,784].forEach(function(f,i){
        var oo=actx15.createOscillator(),gg=actx15.createGain();gg.connect(actx15.destination);
        oo.type='sine';oo.frequency.setValueAtTime(f,t+i*.06);gg.gain.setValueAtTime(.1,t+i*.06);
        gg.gain.linearRampToValueAtTime(0,t+i*.06+.12);oo.connect(gg);oo.start(t+i*.06);oo.stop(t+i*.06+.12);
      });break;
    case 'rule':
      o=actx15.createOscillator();o.type='triangle';o.frequency.setValueAtTime(440,t);
      g.gain.setValueAtTime(.1,t);g.gain.linearRampToValueAtTime(0,t+.15);o.connect(g);o.start(t);o.stop(t+.15);break;
    case 'putt_hit':
      o=actx15.createOscillator();o.type='sine';o.frequency.setValueAtTime(1200,t);o.frequency.linearRampToValueAtTime(600,t+.08);
      g.gain.setValueAtTime(.15,t);g.gain.linearRampToValueAtTime(0,t+.12);o.connect(g);o.start(t);o.stop(t+.12);break;
    case 'putt_hole':
      [784,988,1175].forEach(function(f,i){
        var oo=actx15.createOscillator(),gg=actx15.createGain();gg.connect(actx15.destination);
        oo.type='sine';oo.frequency.setValueAtTime(f,t+i*.08);gg.gain.setValueAtTime(.12,t+i*.08);
        gg.gain.linearRampToValueAtTime(0,t+i*.08+.15);oo.connect(gg);oo.start(t+i*.08);oo.stop(t+i*.08+.15);
      });break;
    case 'community':
      o=actx15.createOscillator();o.type='sine';o.frequency.setValueAtTime(659,t);o.frequency.linearRampToValueAtTime(880,t+.1);
      g.gain.setValueAtTime(.1,t);g.gain.linearRampToValueAtTime(0,t+.2);o.connect(g);o.start(t);o.stop(t+.2);break;
    case 'achieve_v15':
      [523,659,784,1047].forEach(function(f,i){
        var oo=actx15.createOscillator(),gg=actx15.createGain();gg.connect(actx15.destination);
        oo.type='sine';oo.frequency.setValueAtTime(f,t+i*.1);gg.gain.setValueAtTime(.12,t+i*.1);
        gg.gain.linearRampToValueAtTime(0,t+i*.1+.2);oo.connect(gg);oo.start(t+i*.1);oo.stop(t+i*.1+.2);
      });break;
  }
}

// === Toast ===
function toast15(msg){
  var d=document.createElement('div');
  d.style.cssText='position:fixed;bottom:80px;left:50%;transform:translateX(-50%);background:var(--toast-bg,#333);color:#fff;padding:12px 24px;border-radius:14px;font-size:13px;font-weight:600;z-index:10050;box-shadow:0 8px 30px rgba(0,0,0,.35);animation:v15Rise .3s ease;max-width:90vw;text-align:center';
  d.textContent=msg;document.body.appendChild(d);setTimeout(function(){d.remove()},2800);
}

// === localStorage helpers ===
function lsGet(k,def){try{var v=localStorage.getItem('sg_'+k);return v?JSON.parse(v):def}catch(e){return def}}
function lsSet(k,v){try{localStorage.setItem('sg_'+k,JSON.stringify(v))}catch(e){}}

// === Modal helper ===
function openV15(id){document.getElementById(id).classList.add('active');sfx15('social')}
function closeV15(id){document.getElementById(id).classList.remove('active')}

// ============================================================
// 1. GOLF SOCIAL HUB - 골퍼 프로필 + 도전 + 활동 피드
// ============================================================
var socialOverlay=document.createElement('div');
socialOverlay.className='v15-overlay';socialOverlay.id='v15-social';
socialOverlay.innerHTML='<div class="v15-modal"><div class="v15-hdr"><h2><span class="v15i">&#x1F465;</span> 골프 소셜 허브</h2><button class="v15-x" onclick="closeV15(\'v15-social\')">&times;</button></div><div class="v15-tabs" id="v15-social-tabs"></div><div id="v15-social-body"></div></div>';
socialOverlay.addEventListener('click',function(e){if(e.target===socialOverlay)closeV15('v15-social')});
document.body.appendChild(socialOverlay);

var socialProfile=lsGet('social_profile',{nickname:'Golfer_'+Math.floor(Math.random()*9999),handicap:36,homeCourse:'',rounds:0,bestScore:0,motto:''});
var socialFeed=lsGet('social_feed',[
  {author:'ProGolfer_Kim',time:'2분 전',body:'오늘 파3 홀인원 성공! 7번 아이언으로 150야드를 깔끔하게 넣었습니다!',likes:24,type:'achievement'},
  {author:'GolfMaster_Lee',time:'15분 전',body:'드라이버 슬라이스 교정 팁: 그립 강도를 7에서 4로 줄이고 왼발을 살짝 열어보세요.',likes:18,type:'tip'},
  {author:'Birdie_Park',time:'1시간 전',body:'남해 사우스링스 라운딩 후기 - 바다뷰가 정말 환상적이었어요. 그린 컨디션도 최고!',likes:31,type:'review'},
  {author:'Eagle_Choi',time:'2시간 전',body:'이번 주 목표: 드라이버 페어웨이 안착률 60% 달성하기. 어제는 55%였는데 꾸준히 올라가고 있어요.',likes:12,type:'goal'},
  {author:'Ace_Jung',time:'3시간 전',body:'비오는 날 라운딩 팁: 여벌 장갑 3개, 타월 2장 필수. 그린 속도 20% 느려지니 좀 더 세게 치세요.',likes:27,type:'tip'}
]);
var socialChallenges=[
  {id:1,title:'이번 주 페어웨이 챌린지',desc:'드라이버 14홀 중 10홀 페어웨이 안착',reward:'+50 XP',difficulty:'medium',participants:42},
  {id:2,title:'퍼팅 마스터 챌린지',desc:'18홀 퍼트 수 32개 이하 달성',reward:'+80 XP',difficulty:'hard',participants:28},
  {id:3,title:'파세이브 달인',desc:'GIR 미스 시 5번 연속 파세이브',reward:'+60 XP',difficulty:'hard',participants:15},
  {id:4,title:'버디 헌터',desc:'1라운드에 버디 3개 이상',reward:'+100 XP',difficulty:'expert',participants:9},
  {id:5,title:'꾸준한 골퍼',desc:'7일 연속 연습 기록',reward:'+40 XP',difficulty:'easy',participants:67},
  {id:6,title:'골프 지식왕',desc:'룰 퀴즈 20문제 연속 정답',reward:'+70 XP',difficulty:'medium',participants:33}
];

function renderSocial(tab){
  var tabs=['프로필','활동 피드','챌린지','친구 랭킹'];
  var th=document.getElementById('v15-social-tabs');
  th.innerHTML=tabs.map(function(t,i){return '<button class="v15-tab'+(i===(tab||0)?' active':'')+'" onclick="renderSocial('+i+')">'+t+'</button>'}).join('');
  var bd=document.getElementById('v15-social-body');
  var idx=tab||0;
  if(idx===0){
    bd.innerHTML='<div class="v15-card" style="text-align:center;padding:28px"><div style="font-size:64px;margin-bottom:12px">&#x26F3;</div><div style="font-size:11px;color:var(--text-muted);margin-bottom:6px">닉네임</div><input class="v15-input" id="v15-nick" value="'+socialProfile.nickname+'" style="text-align:center;font-size:18px;font-weight:800;max-width:300px;margin:0 auto 14px" /><div class="v15-grid2" style="max-width:400px;margin:0 auto"><div><div style="font-size:11px;color:var(--text-muted)">핸디캡</div><input type="number" class="v15-input" id="v15-hcp" value="'+socialProfile.handicap+'" min="0" max="54" style="text-align:center;margin-top:4px"/></div><div><div style="font-size:11px;color:var(--text-muted)">베스트 스코어</div><input type="number" class="v15-input" id="v15-best" value="'+socialProfile.bestScore+'" min="50" max="200" style="text-align:center;margin-top:4px"/></div></div><div style="margin-top:14px"><div style="font-size:11px;color:var(--text-muted)">홈 코스</div><input class="v15-input" id="v15-home" value="'+socialProfile.homeCourse+'" placeholder="자주 가는 골프장" style="max-width:400px;margin:6px auto 0"/></div><div style="margin-top:14px"><div style="font-size:11px;color:var(--text-muted)">좌우명</div><input class="v15-input" id="v15-motto" value="'+socialProfile.motto+'" placeholder="나의 골프 좌우명" style="max-width:400px;margin:6px auto 0"/></div><button class="v15-btn v15-btn-primary" style="margin-top:18px" onclick="saveSocialProfile()">프로필 저장</button></div>';
  } else if(idx===1){
    var h='<div style="margin-bottom:14px"><textarea class="v15-textarea" id="v15-feed-input" placeholder="골프 팁, 라운딩 후기, 질문을 공유하세요..." style="min-height:60px"></textarea><div style="display:flex;gap:8px;margin-top:8px"><select class="v15-select" id="v15-feed-type"><option value="tip">팁</option><option value="review">후기</option><option value="question">질문</option><option value="achievement">성과</option></select><button class="v15-btn v15-btn-primary v15-btn-sm" onclick="addFeedPost()">게시</button></div></div>';
    socialFeed.forEach(function(f){
      var typeLabel={'tip':'&#x1F4A1; 팁','review':'&#x1F3CC; 후기','question':'&#x2753; 질문','achievement':'&#x1F3C6; 성과','goal':'&#x1F3AF; 목표'}[f.type]||'&#x1F4AC; 일반';
      h+='<div class="v15-feed-item"><div style="display:flex;justify-content:space-between;align-items:center"><div class="feed-author">'+f.author+' <span class="v15-badge v15-badge-green">'+typeLabel+'</span></div><div class="feed-time">'+f.time+'</div></div><div class="feed-body">'+f.body+'</div><div style="margin-top:8px;display:flex;gap:12px;font-size:11px;color:var(--text-muted)"><span style="cursor:pointer">&#x2764; '+f.likes+'</span><span style="cursor:pointer">&#x1F4AC; 댓글</span></div></div>';
    });
    bd.innerHTML=h;
  } else if(idx===2){
    var joined=lsGet('social_challenges_joined',[]);
    var h='<div style="font-size:13px;color:var(--text-muted);margin-bottom:14px">도전 과제에 참여하고 XP를 획득하세요!</div>';
    socialChallenges.forEach(function(c){
      var isJoined=joined.indexOf(c.id)!==-1;
      var diffColor={'easy':'v15-badge-green','medium':'v15-badge-blue','hard':'v15-badge-orange','expert':'v15-badge-red'}[c.difficulty];
      var diffLabel={'easy':'쉬움','medium':'보통','hard':'어려움','expert':'전문가'}[c.difficulty];
      h+='<div class="v15-card"><h4>'+c.title+'</h4><p>'+c.desc+'</p><div style="display:flex;gap:8px;align-items:center;margin-top:10px;flex-wrap:wrap"><span class="v15-badge '+diffColor+'">'+diffLabel+'</span><span class="v15-badge v15-badge-green">'+c.reward+'</span><span style="font-size:11px;color:var(--text-muted)">'+c.participants+'명 참여중</span><button class="v15-btn v15-btn-sm '+(isJoined?'v15-btn-secondary':'v15-btn-primary')+'" onclick="toggleChallenge('+c.id+')" style="margin-left:auto">'+(isJoined?'참여중':'참여하기')+'</button></div></div>';
    });
    bd.innerHTML=h;
  } else {
    var rankings=[
      {name:'ProGolfer_Kim',hcp:5,rounds:142,best:68},
      {name:'Eagle_Choi',hcp:8,rounds:98,best:72},
      {name:'Birdie_Park',hcp:12,rounds:87,best:76},
      {name:'GolfMaster_Lee',hcp:15,rounds:65,best:79},
      {name:socialProfile.nickname,hcp:socialProfile.handicap,rounds:socialProfile.rounds,best:socialProfile.bestScore||99},
      {name:'Ace_Jung',hcp:18,rounds:53,best:82},
      {name:'Par_Yoon',hcp:22,rounds:41,best:88}
    ].sort(function(a,b){return a.hcp-b.hcp});
    var h='<div style="font-size:13px;color:var(--text-muted);margin-bottom:14px">핸디캡 기준 랭킹</div>';
    rankings.forEach(function(r,i){
      var medal=['&#x1F947;','&#x1F948;','&#x1F949;'][i]||'<span style="font-size:14px;font-weight:800;color:var(--text-muted)">'+(i+1)+'</span>';
      var isMe=r.name===socialProfile.nickname;
      h+='<div class="v15-card" style="display:flex;align-items:center;gap:14px;'+(isMe?'border-color:var(--primary);background:var(--primary-light)':'')+'"><div style="font-size:24px">'+medal+'</div><div style="flex:1"><div style="font-size:14px;font-weight:700">'+r.name+(isMe?' <span class="v15-badge v15-badge-green">나</span>':'')+'</div><div style="font-size:11px;color:var(--text-muted)">'+r.rounds+'라운드 | 베스트 '+r.best+'</div></div><div style="text-align:right"><div style="font-size:18px;font-weight:800;color:var(--primary)">HC '+r.hcp+'</div></div></div>';
    });
    bd.innerHTML=h;
  }
}
window.renderSocial=renderSocial;
window.saveSocialProfile=function(){
  socialProfile.nickname=document.getElementById('v15-nick').value||socialProfile.nickname;
  socialProfile.handicap=parseInt(document.getElementById('v15-hcp').value)||36;
  socialProfile.bestScore=parseInt(document.getElementById('v15-best').value)||0;
  socialProfile.homeCourse=document.getElementById('v15-home').value;
  socialProfile.motto=document.getElementById('v15-motto').value;
  lsSet('social_profile',socialProfile);sfx15('social');toast15('프로필이 저장되었습니다!');
};
window.addFeedPost=function(){
  var inp=document.getElementById('v15-feed-input');
  var tp=document.getElementById('v15-feed-type');
  if(!inp.value.trim())return toast15('내용을 입력하세요');
  socialFeed.unshift({author:socialProfile.nickname,time:'방금 전',body:inp.value.trim(),likes:0,type:tp.value});
  lsSet('social_feed',socialFeed);sfx15('community');toast15('게시되었습니다!');renderSocial(1);
};
window.toggleChallenge=function(id){
  var j=lsGet('social_challenges_joined',[]);
  var idx=j.indexOf(id);if(idx===-1){j.push(id);sfx15('achieve_v15');toast15('챌린지에 참여했습니다!')}else{j.splice(idx,1);toast15('참여를 취소했습니다')}
  lsSet('social_challenges_joined',j);renderSocial(2);
};

// ============================================================
// 2. SWING CHECKLIST - 스윙 체크리스트 (라운드 전/중/후)
// ============================================================
var chkOverlay=document.createElement('div');
chkOverlay.className='v15-overlay';chkOverlay.id='v15-checklist';
chkOverlay.innerHTML='<div class="v15-modal"><div class="v15-hdr"><h2><span class="v15i">&#x2705;</span> 스윙 체크리스트</h2><button class="v15-x" onclick="closeV15(\'v15-checklist\')">&times;</button></div><div class="v15-tabs" id="v15-chk-tabs"></div><div id="v15-chk-body"></div></div>';
chkOverlay.addEventListener('click',function(e){if(e.target===chkOverlay)closeV15('v15-checklist')});
document.body.appendChild(chkOverlay);

var checklistData={
  pre:['장비 점검 (드라이버, 아이언, 퍼터, 볼, 티)','스트레칭 & 워밍업 15분','연습 그린에서 퍼팅 감각 잡기','드라이빙 레인지 10-15발','오늘의 목표 설정 (스코어/페어웨이/퍼트수)','코스 정보 확인 (핀 위치, 그린 속도)','날씨 체크 (바람 방향, 습도)','수분 & 간식 준비'],
  during:['프리샷 루틴 매샷 수행','그립 압력 체크 (4-5/10)','정렬 확인 (타겟 라인-발-어깨)','템포 유지 (3:1 비율)','바람 고려 클럽 선택','그린 경사 읽기 후 퍼팅','미스샷 후 3초 호흡법','수분 섭취 (3홀마다 1컵)'],
  post:['스코어카드 정리 & 기록','좋았던 샷 3가지 메모','개선할 점 3가지 메모','장비 청소 & 정리','다음 라운드 목표 수립','컨디션 & 멘탈 상태 기록']
};

function renderChecklist(tab){
  var tabs=['라운드 전','라운드 중','라운드 후','통계'];
  var th=document.getElementById('v15-chk-tabs');
  th.innerHTML=tabs.map(function(t,i){return '<button class="v15-tab'+(i===(tab||0)?' active':'')+'" onclick="renderChecklist('+i+')">'+t+'</button>'}).join('');
  var bd=document.getElementById('v15-chk-body');
  var idx=tab||0;
  var today=new Date().toISOString().slice(0,10);
  var checked=lsGet('checklist_'+today,{pre:[],during:[],post:[]});
  if(idx<3){
    var phase=['pre','during','post'][idx];
    var items=checklistData[phase];
    var done=checked[phase]||[];
    var total=items.length,doneCount=done.length;
    var pct=total?Math.round(doneCount/total*100):0;
    var h='<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px"><span style="font-size:13px;font-weight:700">완료: '+doneCount+'/'+total+'</span><span class="v15-badge '+(pct===100?'v15-badge-green':'v15-badge-blue')+'">'+pct+'%</span></div><div class="v15-progress"><div class="v15-progress-fill" style="width:'+pct+'%"></div></div>';
    items.forEach(function(item,i){
      var isDone=done.indexOf(i)!==-1;
      h+='<div class="v15-checklist-item'+(isDone?' checked':'')+'" onclick="toggleCheck(\''+phase+'\','+i+')"><div class="chk">'+(isDone?'&#x2713;':'')+'</div><span style="font-size:13px">'+item+'</span></div>';
    });
    if(pct===100)h+='<div style="text-align:center;margin-top:16px;font-size:14px;font-weight:700;color:var(--primary)">&#x1F389; 모든 항목 완료! 훌륭합니다!</div>';
    bd.innerHTML=h;
  } else {
    var weekDates=[];for(var d=6;d>=0;d--){var dt=new Date();dt.setDate(dt.getDate()-d);weekDates.push(dt.toISOString().slice(0,10))}
    var weekStats=weekDates.map(function(dd){
      var c=lsGet('checklist_'+dd,{pre:[],during:[],post:[]});
      return (c.pre||[]).length+(c.during||[]).length+(c.post||[]).length;
    });
    var maxStat=Math.max.apply(null,weekStats)||1;
    var h='<div style="font-size:13px;font-weight:700;margin-bottom:12px">최근 7일 체크 완료 수</div><div class="v15-chart-bar">';
    weekStats.forEach(function(s,i){
      var dayLabel=['일','월','화','수','목','금','토'][new Date(weekDates[i]).getDay()];
      h+='<div class="bar" style="height:'+Math.max(s/maxStat*100,4)+'%"><span class="bar-val">'+s+'</span><span class="bar-label">'+dayLabel+'</span></div>';
    });
    h+='</div><div style="margin-top:30px;font-size:13px;font-weight:700">총 항목 수</div><div class="v15-grid3" style="margin-top:10px"><div class="v15-stat-card"><div class="num">'+checklistData.pre.length+'</div><div class="lbl">라운드 전</div></div><div class="v15-stat-card" style="background:linear-gradient(135deg,#1565c0,#42a5f5)"><div class="num">'+checklistData.during.length+'</div><div class="lbl">라운드 중</div></div><div class="v15-stat-card" style="background:linear-gradient(135deg,#e65100,#ff9800)"><div class="num">'+checklistData.post.length+'</div><div class="lbl">라운드 후</div></div></div>';
    bd.innerHTML=h;
  }
}
window.renderChecklist=renderChecklist;
window.toggleCheck=function(phase,idx){
  var today=new Date().toISOString().slice(0,10);
  var checked=lsGet('checklist_'+today,{pre:[],during:[],post:[]});
  if(!checked[phase])checked[phase]=[];
  var pos=checked[phase].indexOf(idx);
  if(pos===-1){checked[phase].push(idx);sfx15('checklist')}else{checked[phase].splice(pos,1)}
  lsSet('checklist_'+today,checked);
  var tabIdx={pre:0,during:1,post:2}[phase];
  renderChecklist(tabIdx);
};

// ============================================================
// 3. WEATHER DISTANCE CALCULATOR - 날씨 비거리 보정 계산기
// ============================================================
var wxOverlay=document.createElement('div');
wxOverlay.className='v15-overlay';wxOverlay.id='v15-weather';
wxOverlay.innerHTML='<div class="v15-modal"><div class="v15-hdr"><h2><span class="v15i">&#x1F327;</span> 날씨 비거리 보정</h2><button class="v15-x" onclick="closeV15(\'v15-weather\')">&times;</button></div><div id="v15-wx-body"></div></div>';
wxOverlay.addEventListener('click',function(e){if(e.target===wxOverlay)closeV15('v15-weather')});
document.body.appendChild(wxOverlay);

var wxClubs=[
  {name:'드라이버',dist:230},{name:'3번 우드',dist:210},{name:'5번 우드',dist:195},
  {name:'4번 아이언',dist:180},{name:'5번 아이언',dist:170},{name:'6번 아이언',dist:160},
  {name:'7번 아이언',dist:150},{name:'8번 아이언',dist:140},{name:'9번 아이언',dist:130},
  {name:'PW',dist:120},{name:'AW',dist:105},{name:'SW',dist:90},{name:'LW',dist:70}
];

function renderWeather(){
  var saved=lsGet('wx_settings',{temp:25,humidity:50,altitude:0,wind:0,windDir:'headwind'});
  var h='<div class="v15-card"><h4>&#x1F321; 환경 조건 입력</h4><div class="v15-grid2" style="margin-top:12px"><div><label style="font-size:11px;font-weight:700;color:var(--text-muted)">기온 (&#xb0;C)</label><input type="range" id="v15-wx-temp" min="-5" max="45" value="'+saved.temp+'" style="width:100%" oninput="calcWeather()"><div style="text-align:center;font-size:14px;font-weight:700" id="v15-wx-temp-val">'+saved.temp+'&#xb0;C</div></div><div><label style="font-size:11px;font-weight:700;color:var(--text-muted)">습도 (%)</label><input type="range" id="v15-wx-hum" min="0" max="100" value="'+saved.humidity+'" style="width:100%" oninput="calcWeather()"><div style="text-align:center;font-size:14px;font-weight:700" id="v15-wx-hum-val">'+saved.humidity+'%</div></div><div><label style="font-size:11px;font-weight:700;color:var(--text-muted)">고도 (m)</label><input type="range" id="v15-wx-alt" min="0" max="2000" step="50" value="'+saved.altitude+'" style="width:100%" oninput="calcWeather()"><div style="text-align:center;font-size:14px;font-weight:700" id="v15-wx-alt-val">'+saved.altitude+'m</div></div><div><label style="font-size:11px;font-weight:700;color:var(--text-muted)">바람 (km/h)</label><input type="range" id="v15-wx-wind" min="0" max="50" value="'+saved.wind+'" style="width:100%" oninput="calcWeather()"><div style="text-align:center;font-size:14px;font-weight:700" id="v15-wx-wind-val">'+saved.wind+'km/h</div></div></div><div style="margin-top:12px;display:flex;gap:6px;justify-content:center"><button class="v15-btn v15-btn-sm '+(saved.windDir==='headwind'?'v15-btn-primary':'v15-btn-secondary')+'" onclick="setWindDir(\'headwind\')">&#x2B06; 맞바람</button><button class="v15-btn v15-btn-sm '+(saved.windDir==='tailwind'?'v15-btn-primary':'v15-btn-secondary')+'" onclick="setWindDir(\'tailwind\')">&#x2B07; 뒷바람</button><button class="v15-btn v15-btn-sm '+(saved.windDir==='crosswind'?'v15-btn-primary':'v15-btn-secondary')+'" onclick="setWindDir(\'crosswind\')">&#x27A1; 옆바람</button></div></div><div style="margin-top:14px;font-size:13px;font-weight:700;margin-bottom:10px">보정 결과</div><div id="v15-wx-results"></div><div class="v15-card" style="margin-top:14px"><h4>&#x1F4A1; 보정 원리</h4><p>&#x2022; <b>기온:</b> 10&#xb0;C 상승 &rarr; 약 +2야드 (공기밀도 감소)<br>&#x2022; <b>고도:</b> 300m 상승 &rarr; 약 +2% 비거리<br>&#x2022; <b>습도:</b> 높은 습도 = 약간 더 멀리 (습한 공기가 가벼움)<br>&#x2022; <b>맞바람:</b> 10km/h &rarr; 약 -5~8% 비거리<br>&#x2022; <b>뒷바람:</b> 10km/h &rarr; 약 +3~5% 비거리<br>&#x2022; <b>옆바람:</b> 비거리 영향 적으나 방향 편차 발생</p></div>';
  document.getElementById('v15-wx-body').innerHTML=h;
  calcWeather();
}

var currentWindDir='headwind';
window.setWindDir=function(d){
  currentWindDir=d;
  var saved=lsGet('wx_settings',{temp:25,humidity:50,altitude:0,wind:0,windDir:'headwind'});
  saved.windDir=d;lsSet('wx_settings',saved);
  renderWeather();sfx15('weather');
};

window.calcWeather=function(){
  var temp=parseInt(document.getElementById('v15-wx-temp').value);
  var hum=parseInt(document.getElementById('v15-wx-hum').value);
  var alt=parseInt(document.getElementById('v15-wx-alt').value);
  var wind=parseInt(document.getElementById('v15-wx-wind').value);
  document.getElementById('v15-wx-temp-val').innerHTML=temp+'&#xb0;C';
  document.getElementById('v15-wx-hum-val').textContent=hum+'%';
  document.getElementById('v15-wx-alt-val').textContent=alt+'m';
  document.getElementById('v15-wx-wind-val').textContent=wind+'km/h';
  lsSet('wx_settings',{temp:temp,humidity:hum,altitude:alt,wind:wind,windDir:currentWindDir});

  var tempFactor=(temp-20)*0.002;
  var altFactor=alt/300*0.02;
  var humFactor=(hum-50)*0.0001;
  var windFactor=0;
  if(currentWindDir==='headwind')windFactor=-wind*0.006;
  else if(currentWindDir==='tailwind')windFactor=wind*0.004;
  else windFactor=-wind*0.001;

  var totalFactor=tempFactor+altFactor+humFactor+windFactor;
  var h='';
  wxClubs.forEach(function(c){
    var adjusted=Math.round(c.dist*(1+totalFactor));
    var diff=adjusted-c.dist;
    var diffStr=diff>=0?'+'+diff:String(diff);
    var color=diff>0?'var(--primary)':diff<0?'#c62828':'var(--text-muted)';
    h+='<div style="display:flex;align-items:center;padding:8px 14px;border-radius:10px;background:var(--bg);margin-bottom:4px"><span style="flex:1;font-size:13px;font-weight:600">'+c.name+'</span><span style="font-size:12px;color:var(--text-muted);margin-right:12px">기본 '+c.dist+'y</span><span style="font-size:15px;font-weight:800;color:'+color+'">'+adjusted+'y</span><span style="font-size:11px;margin-left:8px;color:'+color+'">'+diffStr+'</span></div>';
  });
  document.getElementById('v15-wx-results').innerHTML=h;
};

// ============================================================
// 4. GOLF FITNESS - 골프 피트니스 8종 운동 가이드
// ============================================================
var fitOverlay=document.createElement('div');
fitOverlay.className='v15-overlay';fitOverlay.id='v15-fitness';
fitOverlay.innerHTML='<div class="v15-modal"><div class="v15-hdr"><h2><span class="v15i">&#x1F4AA;</span> 골프 피트니스</h2><button class="v15-x" onclick="closeV15(\'v15-fitness\')">&times;</button></div><div class="v15-tabs" id="v15-fit-tabs"></div><div id="v15-fit-body"></div></div>';
fitOverlay.addEventListener('click',function(e){if(e.target===fitOverlay)closeV15('v15-fitness')});
document.body.appendChild(fitOverlay);

var fitnessExercises=[
  {name:'힙 로테이션',icon:'&#x1F504;',category:'하체',duration:'30초 x 3세트',muscle:'둔근, 외회전근',desc:'양발 어깨너비로 서서 골반을 좌우로 회전. 상체 고정, 골반만 움직이기. 스윙의 파워 소스인 힙턴을 강화합니다.',tip:'거울 앞에서 상체가 흔들리지 않는지 확인하세요.'},
  {name:'토렁크 트위스트',icon:'&#x1F3CB;',category:'코어',duration:'20회 x 3세트',muscle:'외복사근, 내복사근',desc:'메디신볼이나 물병을 들고 좌우 회전. 척추 중립 유지하면서 코어의 회전력을 키웁니다.',tip:'빠르게 하지 말고 천천히 컨트롤하면서 수행하세요.'},
  {name:'숄더 스트레치',icon:'&#x1F9D8;',category:'상체',duration:'15초 x 4세트',muscle:'삼각근, 회전근개',desc:'한쪽 팔을 가슴 앞으로 당기고 반대팔로 잡아주기. 백스윙/팔로스루 범위를 넓혀줍니다.',tip:'통증이 느껴지면 즉시 멈추고 가볍게 진행하세요.'},
  {name:'스쿼트',icon:'&#x1F9CE;',category:'하체',duration:'15회 x 3세트',muscle:'대퇴사두근, 둔근, 햄스트링',desc:'발 어깨너비, 무릎이 발끝을 넘지 않게 앉았다 일어서기. 하체 안정성이 일관된 스윙의 핵심입니다.',tip:'등을 곧게 펴고, 무릎이 안쪽으로 모이지 않게 주의하세요.'},
  {name:'플랭크',icon:'&#x1F4AA;',category:'코어',duration:'30초 x 3세트',muscle:'복직근, 복횡근, 척추기립근',desc:'팔꿈치와 발끝으로 지지, 몸을 일직선 유지. 코어 안정성을 키워 스윙 중 축 흔들림을 방지합니다.',tip:'엉덩이가 처지거나 올라가지 않도록 거울로 자세를 확인하세요.'},
  {name:'밴드 풀 어파트',icon:'&#x1F4CF;',category:'상체',duration:'12회 x 3세트',muscle:'후면삼각근, 승모근',desc:'탄성 밴드를 양손에 잡고 가슴 높이에서 좌우로 벌리기. 등 근육을 강화해 임팩트 시 안정성을 높입니다.',tip:'어깨를 내리고 견갑골을 모으는 느낌으로 당기세요.'},
  {name:'런지 위드 로테이션',icon:'&#x1F6B6;',category:'전신',duration:'10회 x 2세트(각 다리)',muscle:'대퇴사두근, 둔근, 코어',desc:'한발 앞으로 런지 후 상체를 앞다리 방향으로 회전. 하체 밸런스와 코어 회전력을 동시에 트레이닝합니다.',tip:'뒷무릎이 바닥에 닿기 직전까지 내려가세요.'},
  {name:'캣카우 스트레치',icon:'&#x1F408;',category:'유연성',duration:'10회 x 2세트',muscle:'척추기립근, 복근',desc:'네 발 자세에서 등을 둥글게(캣)-젖히기(카우) 반복. 척추 유연성을 높여 부상을 예방합니다.',tip:'호흡과 함께: 둥글게 할 때 내쉬고, 젖힐 때 들이쉬세요.'}
];
var fitnessDone=lsGet('fitness_done',{});

function renderFitness(tab){
  var tabs=['전체','하체','코어','상체','전신/유연성','기록'];
  var th=document.getElementById('v15-fit-tabs');
  th.innerHTML=tabs.map(function(t,i){return '<button class="v15-tab'+(i===(tab||0)?' active':'')+'" onclick="renderFitness('+i+')">'+t+'</button>'}).join('');
  var bd=document.getElementById('v15-fit-body');
  var idx=tab||0;
  if(idx===5){
    var today=new Date().toISOString().slice(0,10);
    var totalDone=Object.keys(fitnessDone).reduce(function(s,k){return s+fitnessDone[k]},0);
    var todayDone=lsGet('fitness_today_'+today,0);
    var h='<div class="v15-grid2"><div class="v15-stat-card"><div class="num">'+totalDone+'</div><div class="lbl">총 운동 횟수</div></div><div class="v15-stat-card" style="background:linear-gradient(135deg,#e65100,#ff9800)"><div class="num">'+todayDone+'</div><div class="lbl">오늘 운동</div></div></div><div style="margin-top:18px;font-size:13px;font-weight:700">운동별 완료 횟수</div>';
    fitnessExercises.forEach(function(ex){
      var cnt=fitnessDone[ex.name]||0;
      h+='<div style="display:flex;align-items:center;padding:8px 14px;border-radius:10px;background:var(--bg);margin-top:6px"><span style="font-size:20px;margin-right:10px">'+ex.icon+'</span><span style="flex:1;font-size:13px;font-weight:600">'+ex.name+'</span><span style="font-size:14px;font-weight:800;color:var(--primary)">'+cnt+'회</span></div>';
    });
    bd.innerHTML=h;return;
  }
  var filtered=fitnessExercises;
  if(idx===1)filtered=fitnessExercises.filter(function(e){return e.category==='하체'});
  else if(idx===2)filtered=fitnessExercises.filter(function(e){return e.category==='코어'});
  else if(idx===3)filtered=fitnessExercises.filter(function(e){return e.category==='상체'});
  else if(idx===4)filtered=fitnessExercises.filter(function(e){return e.category==='전신'||e.category==='유연성'});
  var h='';
  filtered.forEach(function(ex){
    h+='<div class="v15-exercise"><div class="ex-icon">'+ex.icon+'</div><div style="flex:1"><div class="ex-name">'+ex.name+' <span class="v15-badge v15-badge-blue">'+ex.category+'</span></div><div class="ex-info">'+ex.duration+' | '+ex.muscle+'</div><div style="font-size:12px;color:var(--text-muted);margin-top:6px;line-height:1.6">'+ex.desc+'</div><div style="font-size:11px;color:var(--primary);margin-top:4px;font-weight:600">&#x1F4A1; '+ex.tip+'</div></div><button class="v15-btn v15-btn-primary v15-btn-sm ex-btn" onclick="completeFitness(\''+ex.name+'\')">&#x2713; 완료</button></div>';
  });
  bd.innerHTML=h;
}
window.renderFitness=renderFitness;
window.completeFitness=function(name){
  fitnessDone[name]=(fitnessDone[name]||0)+1;lsSet('fitness_done',fitnessDone);
  var today=new Date().toISOString().slice(0,10);
  var td=lsGet('fitness_today_'+today,0);lsSet('fitness_today_'+today,td+1);
  sfx15('fitness');toast15(name+' 완료! (총 '+fitnessDone[name]+'회)');
  checkAchievements15();
};

// ============================================================
// 5. SHOT PATTERN ANALYZER - 샷 패턴 분석기
// ============================================================
var shotOverlay=document.createElement('div');
shotOverlay.className='v15-overlay';shotOverlay.id='v15-shotpat';
shotOverlay.innerHTML='<div class="v15-modal"><div class="v15-hdr"><h2><span class="v15i">&#x1F3AF;</span> 샷 패턴 분석</h2><button class="v15-x" onclick="closeV15(\'v15-shotpat\')">&times;</button></div><div class="v15-tabs" id="v15-shot-tabs"></div><div id="v15-shot-body"></div></div>';
shotOverlay.addEventListener('click',function(e){if(e.target===shotOverlay)closeV15('v15-shotpat')});
document.body.appendChild(shotOverlay);

var shotPatterns=lsGet('shot_patterns',[]);
var missTypes=[
  {id:'slice',name:'슬라이스',icon:'&#x27A1;',color:'#e65100',desc:'볼이 오른쪽으로 크게 휘는 샷 (오픈 페이스)'},
  {id:'hook',name:'훅',icon:'&#x2B05;',color:'#1565c0',desc:'볼이 왼쪽으로 크게 휘는 샷 (클로즈드 페이스)'},
  {id:'push',name:'푸시',icon:'&#x2197;',color:'#ff9800',desc:'볼이 오른쪽 직선으로 나가는 샷 (인-아웃 스윙패스)'},
  {id:'pull',name:'풀',icon:'&#x2196;',color:'#9c27b0',desc:'볼이 왼쪽 직선으로 나가는 샷 (아웃-인 스윙패스)'},
  {id:'top',name:'토핑',icon:'&#x2B07;',color:'#f44336',desc:'볼 위를 때려 낮게 굴러가는 샷'},
  {id:'fat',name:'뒤땅',icon:'&#x1F4A5;',color:'#795548',desc:'볼 뒤 지면을 먼저 치는 샷'},
  {id:'shank',name:'생크',icon:'&#x26A0;',color:'#c62828',desc:'호젤에 맞아 옆으로 나가는 샷'},
  {id:'sky',name:'스카이볼',icon:'&#x2B06;',color:'#00bcd4',desc:'볼이 너무 높이 떠서 거리가 안 나는 샷'}
];

function renderShotPattern(tab){
  var tabs=['기록하기','패턴 분석','교정 가이드'];
  var th=document.getElementById('v15-shot-tabs');
  th.innerHTML=tabs.map(function(t,i){return '<button class="v15-tab'+(i===(tab||0)?' active':'')+'" onclick="renderShotPattern('+i+')">'+t+'</button>'}).join('');
  var bd=document.getElementById('v15-shot-body');
  var idx=tab||0;
  if(idx===0){
    var h='<div style="font-size:13px;color:var(--text-muted);margin-bottom:14px">미스샷이 나왔을 때 아래 버튼을 눌러 기록하세요.</div><div class="v15-grid2">';
    missTypes.forEach(function(m){
      h+='<div class="v15-card" style="cursor:pointer;text-align:center;border-left:4px solid '+m.color+'" onclick="recordMiss(\''+m.id+'\')"><div style="font-size:28px">'+m.icon+'</div><div style="font-size:14px;font-weight:700;margin-top:6px">'+m.name+'</div><div style="font-size:11px;color:var(--text-muted);margin-top:3px">'+m.desc+'</div></div>';
    });
    h+='</div>';
    if(shotPatterns.length>0){
      h+='<div style="margin-top:18px;font-size:13px;font-weight:700">최근 기록</div>';
      shotPatterns.slice(-10).reverse().forEach(function(p){
        var mt=missTypes.find(function(m){return m.id===p.type});
        h+='<div style="display:flex;align-items:center;padding:6px 12px;border-radius:8px;background:var(--bg);margin-top:4px"><span style="font-size:16px;margin-right:8px">'+(mt?mt.icon:'')+'</span><span style="font-size:12px;flex:1">'+(mt?mt.name:'')+'</span><span style="font-size:10px;color:var(--text-muted)">'+new Date(p.date).toLocaleString('ko')+'</span></div>';
      });
    }
    bd.innerHTML=h;
  } else if(idx===1){
    var counts={};missTypes.forEach(function(m){counts[m.id]=0});
    shotPatterns.forEach(function(p){if(counts[p.type]!==undefined)counts[p.type]++});
    var total=shotPatterns.length||1;
    var maxCount=Math.max.apply(null,Object.values(counts))||1;
    var sorted=missTypes.slice().sort(function(a,b){return counts[b.id]-counts[a.id]});
    var h='<div class="v15-stat-card" style="margin-bottom:14px"><div class="num">'+shotPatterns.length+'</div><div class="lbl">총 미스샷 기록</div></div>';
    h+='<div style="font-size:13px;font-weight:700;margin-bottom:10px">미스샷 분포</div>';
    sorted.forEach(function(m){
      var cnt=counts[m.id];
      var pct=Math.round(cnt/total*100);
      h+='<div style="margin-bottom:8px"><div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:3px"><span style="font-weight:600">'+m.icon+' '+m.name+'</span><span>'+cnt+'회 ('+pct+'%)</span></div><div class="v15-progress"><div class="v15-progress-fill" style="width:'+Math.round(cnt/maxCount*100)+'%;background:'+m.color+'"></div></div></div>';
    });
    if(sorted[0]&&counts[sorted[0].id]>0){
      h+='<div class="v15-card" style="border-left:4px solid '+sorted[0].color+';margin-top:14px"><h4>&#x26A0; 주요 패턴: '+sorted[0].name+'</h4><p>가장 빈번한 미스샷입니다. 아래 &quot;교정 가이드&quot; 탭에서 교정법을 확인하세요.</p></div>';
    }
    bd.innerHTML=h;
  } else {
    var corrections={
      slice:{title:'슬라이스 교정',steps:['그립 강화: 왼손을 약간 더 오른쪽으로 (스트롱 그립)','스탠스: 약간 클로즈드 스탠스로 변경','백스윙: 인사이드로 테이크어웨이','다운스윙: 오른쪽 팔꿈치를 몸에 붙이고','임팩트: 페이스가 스퀘어되도록 의식적으로 릴리즈']},
      hook:{title:'훅 교정',steps:['그립 약화: 왼손을 약간 왼쪽으로 (위크 그립)','스탠스: 약간 오픈 스탠스로','다운스윙: 과도한 손목 롤링 방지','임팩트: 왼쪽으로 빠지지 않게 타겟 방향 유지','팔로스루: 클럽을 타겟 라인으로 뻗어주기']},
      push:{title:'푸시 교정',steps:['어드레스: 볼 위치를 약간 왼쪽으로','스윙패스: 인-아웃이 과도한지 체크','다운스윙: 상체가 우측으로 밀리지 않게','힙턴: 좀 더 적극적으로 왼쪽 힙 개방','체중 이동: 왼발로의 이동을 의식']},
      pull:{title:'풀 교정',steps:['어드레스: 볼 위치를 약간 오른쪽으로','스윙패스: 아웃-인을 인사이드-아웃으로 변경','다운스윙: 왼쪽 어깨가 빨리 열리지 않게','하체 리드: 상체보다 하체가 먼저 회전','정렬: 어깨-발-타겟 라인 재확인']},
      top:{title:'토핑 교정',steps:['셋업: 무릎 각도 유지, 앞으로 숙이지 않기','시선: 볼 뒤쪽(6시 방향) 보기','스윙: 팔이 줄어들지 않게 extension 유지','체중: 뒤꿈치에 남지 않게 왼발로 이동','연습: 티 위에서 연습 (공 바로 아래 솔)']},
      fat:{title:'뒤땅 교정',steps:['볼 위치: 스탠스 중앙보다 약간 오른쪽','체중 이동: 다운스윙에서 확실히 왼쪽으로','손목: 얼리 릴리즈 방지 (래깅 유지)','스윙 최저점: 볼 앞에 있도록 의식','연습: 수건을 볼 뒤 10cm에 놓고 연습']},
      shank:{title:'생크 교정',steps:['어드레스: 볼과의 거리 재확인 (팔 하나 거리)','체중: 발가락 쪽으로 쏠리지 않게','다운스윙: 몸이 볼 쪽으로 쏠리지 않게','임팩트: 토(클럽 앞부분)로 치는 의식','연습: 볼 바깥에 헤드커버 놓고 안 건드리기']},
      sky:{title:'스카이볼 교정',steps:['티 높이: 드라이버 크라운 위로 볼 반 정도','볼 위치: 왼발 안쪽과 일치','스윙: 다운블로가 아닌 어퍼블로','앵글: 어깨선이 약간 오른쪽 아래를 향하게','임팩트: 최저점 이후 상승하면서 맞히기']}
    };
    var h='';
    Object.keys(corrections).forEach(function(k){
      var c=corrections[k];var mt=missTypes.find(function(m){return m.id===k});
      h+='<div class="v15-card" style="border-left:4px solid '+(mt?mt.color:'var(--primary)')+'"><h4>'+(mt?mt.icon+' ':'')+c.title+'</h4><ol style="margin-top:8px;padding-left:20px">';
      c.steps.forEach(function(s){h+='<li style="font-size:12px;line-height:1.8;color:var(--text-muted)">'+s+'</li>'});
      h+='</ol></div>';
    });
    bd.innerHTML=h;
  }
}
window.renderShotPattern=renderShotPattern;
window.recordMiss=function(type){
  shotPatterns.push({type:type,date:Date.now()});lsSet('shot_patterns',shotPatterns);
  sfx15('shot_pattern');var mt=missTypes.find(function(m){return m.id===type});
  toast15((mt?mt.name:type)+' 기록 완료');renderShotPattern(0);checkAchievements15();
};

// ============================================================
// 6. ROUND REVIEW SYSTEM - 라운드 복기 시스템
// ============================================================
var rvOverlay=document.createElement('div');
rvOverlay.className='v15-overlay';rvOverlay.id='v15-review';
rvOverlay.innerHTML='<div class="v15-modal"><div class="v15-hdr"><h2><span class="v15i">&#x1F4DD;</span> 라운드 복기</h2><button class="v15-x" onclick="closeV15(\'v15-review\')">&times;</button></div><div class="v15-tabs" id="v15-rv-tabs"></div><div id="v15-rv-body"></div></div>';
rvOverlay.addEventListener('click',function(e){if(e.target===rvOverlay)closeV15('v15-review')});
document.body.appendChild(rvOverlay);

var roundReviews=lsGet('round_reviews',[]);

function renderReview(tab){
  var tabs=['새 복기 작성','복기 기록','통계'];
  var th=document.getElementById('v15-rv-tabs');
  th.innerHTML=tabs.map(function(t,i){return '<button class="v15-tab'+(i===(tab||0)?' active':'')+'" onclick="renderReview('+i+')">'+t+'</button>'}).join('');
  var bd=document.getElementById('v15-rv-body');
  var idx=tab||0;
  if(idx===0){
    var h='<div class="v15-card"><h4>&#x1F4C5; 기본 정보</h4><div class="v15-grid2" style="margin-top:10px"><div><label style="font-size:11px;font-weight:700;color:var(--text-muted)">날짜</label><input type="date" class="v15-input" id="v15-rv-date" value="'+new Date().toISOString().slice(0,10)+'" style="margin-top:4px"></div><div><label style="font-size:11px;font-weight:700;color:var(--text-muted)">코스명</label><input class="v15-input" id="v15-rv-course" placeholder="골프장 이름" style="margin-top:4px"></div></div><div class="v15-grid2" style="margin-top:10px"><div><label style="font-size:11px;font-weight:700;color:var(--text-muted)">스코어</label><input type="number" class="v15-input" id="v15-rv-score" placeholder="72" min="50" max="200" style="margin-top:4px"></div><div><label style="font-size:11px;font-weight:700;color:var(--text-muted)">퍼트 수</label><input type="number" class="v15-input" id="v15-rv-putts" placeholder="32" min="10" max="80" style="margin-top:4px"></div></div></div>';
    h+='<div class="v15-card"><h4>&#x2B50; 셀프 평가 (5점 만점)</h4><div class="v15-grid2" style="margin-top:10px">';
    ['드라이버','아이언','쇼트게임','퍼팅','코스매니지먼트','멘탈'].forEach(function(cat){
      h+='<div><label style="font-size:11px;font-weight:700;color:var(--text-muted)">'+cat+'</label><input type="range" min="1" max="5" value="3" class="v15-rv-rating" data-cat="'+cat+'" style="width:100%;margin-top:4px" oninput="this.nextElementSibling.textContent=this.value+\'/5\'"><span style="font-size:12px;font-weight:700">3/5</span></div>';
    });
    h+='</div></div>';
    h+='<div class="v15-card"><h4>&#x1F4AC; 상세 복기</h4><div style="margin-top:10px"><label style="font-size:11px;font-weight:700;color:var(--text-muted)">오늘 잘한 점 (3가지)</label><textarea class="v15-textarea" id="v15-rv-good" placeholder="1. 드라이버 방향성이 좋았다&#10;2. 퍼팅 거리감이 좋았다&#10;3. 멘탈 관리가 잘 되었다" style="margin-top:4px"></textarea></div><div style="margin-top:10px"><label style="font-size:11px;font-weight:700;color:var(--text-muted)">개선할 점 (3가지)</label><textarea class="v15-textarea" id="v15-rv-improve" placeholder="1. 벙커샷 연습 필요&#10;2. 3퍼트가 2번 있었다&#10;3. 후반 집중력 저하" style="margin-top:4px"></textarea></div><div style="margin-top:10px"><label style="font-size:11px;font-weight:700;color:var(--text-muted)">다음 라운드 목표</label><input class="v15-input" id="v15-rv-next" placeholder="3퍼트 0개, 페어웨이 60% 이상" style="margin-top:4px"></div></div>';
    h+='<button class="v15-btn v15-btn-primary" style="margin-top:16px;width:100%" onclick="saveReview()">&#x1F4BE; 복기 저장</button>';
    bd.innerHTML=h;
  } else if(idx===1){
    if(roundReviews.length===0){bd.innerHTML='<div style="text-align:center;padding:40px;color:var(--text-muted)">아직 복기 기록이 없습니다.<br>새 복기를 작성해보세요!</div>';return}
    var h='';
    roundReviews.slice().reverse().forEach(function(r,i){
      var avgRating=0;var rCount=0;
      if(r.ratings){Object.values(r.ratings).forEach(function(v){avgRating+=v;rCount++})}
      avgRating=rCount?Math.round(avgRating/rCount*10)/10:0;
      h+='<div class="v15-card"><div style="display:flex;justify-content:space-between;align-items:start"><div><h4>'+r.course+' <span class="v15-badge v15-badge-green">'+r.score+'타</span></h4><div style="font-size:11px;color:var(--text-muted)">'+r.date+' | 퍼트 '+r.putts+' | 평균 평가 '+avgRating+'/5</div></div><button class="v15-btn v15-btn-sm v15-btn-danger" onclick="deleteReview('+(roundReviews.length-1-i)+')">삭제</button></div>';
      if(r.good)h+='<div style="margin-top:8px;font-size:12px"><span style="font-weight:700;color:var(--primary)">&#x2713; 잘한 점:</span> '+r.good+'</div>';
      if(r.improve)h+='<div style="margin-top:4px;font-size:12px"><span style="font-weight:700;color:#e65100">&#x25B2; 개선점:</span> '+r.improve+'</div>';
      if(r.next)h+='<div style="margin-top:4px;font-size:12px"><span style="font-weight:700;color:#1565c0">&#x1F3AF; 다음 목표:</span> '+r.next+'</div>';
      h+='</div>';
    });
    bd.innerHTML=h;
  } else {
    if(roundReviews.length<2){bd.innerHTML='<div style="text-align:center;padding:40px;color:var(--text-muted)">복기를 2개 이상 작성하면 통계가 표시됩니다.</div>';return}
    var scores=roundReviews.map(function(r){return r.score});
    var avgScore=Math.round(scores.reduce(function(a,b){return a+b},0)/scores.length*10)/10;
    var bestScore=Math.min.apply(null,scores);
    var avgPutts=Math.round(roundReviews.map(function(r){return r.putts}).reduce(function(a,b){return a+b},0)/roundReviews.length*10)/10;
    var h='<div class="v15-grid3"><div class="v15-stat-card"><div class="num">'+avgScore+'</div><div class="lbl">평균 스코어</div></div><div class="v15-stat-card" style="background:linear-gradient(135deg,#1565c0,#42a5f5)"><div class="num">'+bestScore+'</div><div class="lbl">베스트</div></div><div class="v15-stat-card" style="background:linear-gradient(135deg,#e65100,#ff9800)"><div class="num">'+avgPutts+'</div><div class="lbl">평균 퍼트</div></div></div>';
    var last5=scores.slice(-5);var maxS=Math.max.apply(null,last5);var minS=Math.min.apply(null,last5);var range=maxS-minS||1;
    h+='<div style="margin-top:18px;font-size:13px;font-weight:700">최근 스코어 추이</div><div class="v15-chart-bar">';
    last5.forEach(function(s,i){
      var pct=100-((s-minS)/range*80);
      h+='<div class="bar" style="height:'+Math.max(pct,10)+'%"><span class="bar-val">'+s+'</span><span class="bar-label">R'+(roundReviews.length-last5.length+i+1)+'</span></div>';
    });
    h+='</div>';
    bd.innerHTML=h;
  }
}
window.renderReview=renderReview;
window.saveReview=function(){
  var course=document.getElementById('v15-rv-course').value.trim();
  var score=parseInt(document.getElementById('v15-rv-score').value);
  var putts=parseInt(document.getElementById('v15-rv-putts').value);
  if(!course||!score)return toast15('코스명과 스코어를 입력하세요');
  var ratings={};
  document.querySelectorAll('.v15-rv-rating').forEach(function(el){ratings[el.dataset.cat]=parseInt(el.value)});
  roundReviews.push({
    date:document.getElementById('v15-rv-date').value,
    course:course,score:score,putts:putts||0,ratings:ratings,
    good:document.getElementById('v15-rv-good').value.trim(),
    improve:document.getElementById('v15-rv-improve').value.trim(),
    next:document.getElementById('v15-rv-next').value.trim()
  });
  lsSet('round_reviews',roundReviews);sfx15('review');toast15('라운드 복기가 저장되었습니다!');
  renderReview(1);checkAchievements15();
};
window.deleteReview=function(i){roundReviews.splice(i,1);lsSet('round_reviews',roundReviews);toast15('삭제되었습니다');renderReview(1)};

// ============================================================
// 7. CLUB RECOMMENDATION AI - 클럽 추천 AI
// ============================================================
var clubOverlay=document.createElement('div');
clubOverlay.className='v15-overlay';clubOverlay.id='v15-clubai';
clubOverlay.innerHTML='<div class="v15-modal"><div class="v15-hdr"><h2><span class="v15i">&#x1F916;</span> 클럽 추천 AI</h2><button class="v15-x" onclick="closeV15(\'v15-clubai\')">&times;</button></div><div id="v15-club-body"></div></div>';
clubOverlay.addEventListener('click',function(e){if(e.target===clubOverlay)closeV15('v15-clubai')});
document.body.appendChild(clubOverlay);

var clubDB=[
  {name:'드라이버',dist:[200,260],loft:10.5,use:'티샷 (파4, 파5)',situation:'넓은 페어웨이, 장타 필요'},
  {name:'3번 우드',dist:[185,230],loft:15,use:'페어웨이, 긴 파3',situation:'2nd 장타, 좁은 티샷'},
  {name:'5번 우드',dist:[175,210],loft:18,use:'페어웨이, 러프',situation:'러프에서 떠야 할 때'},
  {name:'4번 하이브리드',dist:[165,200],loft:22,use:'페어웨이, 러프',situation:'긴 거리 + 정확도 필요'},
  {name:'5번 아이언',dist:[155,185],loft:25,use:'페어웨이',situation:'정확한 거리 조절'},
  {name:'6번 아이언',dist:[145,175],loft:28,use:'페어웨이',situation:'중거리 어프로치'},
  {name:'7번 아이언',dist:[135,165],loft:32,use:'페어웨이, 러프',situation:'가장 많이 쓰는 클럽'},
  {name:'8번 아이언',dist:[125,155],loft:36,use:'어프로치',situation:'그린 공략 어프로치'},
  {name:'9번 아이언',dist:[115,140],loft:40,use:'어프로치',situation:'높이 띄워 세우기'},
  {name:'PW',dist:[100,130],loft:44,use:'어프로치, 피칭',situation:'100y 이내 어프로치'},
  {name:'AW (52도)',dist:[80,110],loft:52,use:'어프로치, 벙커',situation:'짧은 어프로치'},
  {name:'SW (56도)',dist:[60,90],loft:56,use:'벙커, 칩',situation:'벙커탈출, 로브샷'},
  {name:'LW (60도)',dist:[40,70],loft:60,use:'로브샷, 플롭',situation:'높이 띄워야 할 때'}
];

function renderClubAI(){
  var h='<div class="v15-card"><h4>&#x1F3CC; 상황 입력</h4><div class="v15-grid2" style="margin-top:12px"><div><label style="font-size:11px;font-weight:700;color:var(--text-muted)">남은 거리 (야드)</label><input type="number" class="v15-input" id="v15-club-dist" placeholder="150" min="30" max="300" style="margin-top:4px"></div><div><label style="font-size:11px;font-weight:700;color:var(--text-muted)">라이 상태</label><select class="v15-select" id="v15-club-lie" style="width:100%;margin-top:4px"><option value="fairway">페어웨이</option><option value="rough">러프</option><option value="bunker">벙커</option><option value="tee">티샷</option><option value="uphill">오르막</option><option value="downhill">내리막</option></select></div><div><label style="font-size:11px;font-weight:700;color:var(--text-muted)">바람</label><select class="v15-select" id="v15-club-wind" style="width:100%;margin-top:4px"><option value="none">없음</option><option value="head">맞바람</option><option value="tail">뒷바람</option><option value="cross">옆바람</option></select></div><div><label style="font-size:11px;font-weight:700;color:var(--text-muted)">핀 위치</label><select class="v15-select" id="v15-club-pin" style="width:100%;margin-top:4px"><option value="center">가운데</option><option value="front">앞</option><option value="back">뒤</option><option value="left">왼쪽</option><option value="right">오른쪽</option></select></div></div><button class="v15-btn v15-btn-primary" style="margin-top:14px;width:100%" onclick="recommendClub()">&#x1F916; AI 클럽 추천</button></div><div id="v15-club-result"></div>';
  h+='<div style="margin-top:18px;font-size:13px;font-weight:700;margin-bottom:10px">전체 클럽 차트</div>';
  clubDB.forEach(function(c){
    h+='<div style="display:flex;align-items:center;padding:8px 14px;border-radius:10px;background:var(--bg);margin-bottom:4px"><span style="flex:0 0 110px;font-size:13px;font-weight:600">'+c.name+'</span><div style="flex:1;display:flex;align-items:center;gap:6px"><div style="background:var(--border);height:6px;flex:1;border-radius:3px;position:relative"><div style="position:absolute;left:'+Math.round(c.dist[0]/260*100)+'%;width:'+Math.round((c.dist[1]-c.dist[0])/260*100)+'%;height:100%;background:linear-gradient(90deg,var(--primary),#2ecc71);border-radius:3px"></div></div></div><span style="font-size:11px;color:var(--text-muted);flex:0 0 80px;text-align:right">'+c.dist[0]+'-'+c.dist[1]+'y</span></div>';
  });
  document.getElementById('v15-club-body').innerHTML=h;
}

window.recommendClub=function(){
  var dist=parseInt(document.getElementById('v15-club-dist').value);
  if(!dist||dist<30||dist>300)return toast15('거리를 30~300 사이로 입력하세요');
  var lie=document.getElementById('v15-club-lie').value;
  var wind=document.getElementById('v15-club-wind').value;
  var pin=document.getElementById('v15-club-pin').value;
  var adjustedDist=dist;
  if(wind==='head')adjustedDist=Math.round(dist*1.08);
  else if(wind==='tail')adjustedDist=Math.round(dist*0.95);
  if(lie==='rough')adjustedDist=Math.round(adjustedDist*1.05);
  else if(lie==='bunker')adjustedDist=Math.round(adjustedDist*0.85);
  else if(lie==='uphill')adjustedDist=Math.round(adjustedDist*1.1);
  else if(lie==='downhill')adjustedDist=Math.round(adjustedDist*0.92);
  if(pin==='front')adjustedDist=Math.round(adjustedDist*0.97);
  else if(pin==='back')adjustedDist=Math.round(adjustedDist*1.03);

  var candidates=clubDB.filter(function(c){
    var mid=(c.dist[0]+c.dist[1])/2;
    return Math.abs(mid-adjustedDist)<30;
  }).sort(function(a,b){
    var midA=(a.dist[0]+a.dist[1])/2;var midB=(b.dist[0]+b.dist[1])/2;
    return Math.abs(midA-adjustedDist)-Math.abs(midB-adjustedDist);
  });

  if(lie==='bunker')candidates=candidates.filter(function(c){return c.loft>=52});
  if(candidates.length===0)candidates=[clubDB[clubDB.length-1]];

  var best=candidates[0];var alt=candidates[1];
  var tips=[];
  if(wind==='head')tips.push('맞바람이므로 한 클럽 크게 선택했습니다.');
  if(wind==='tail')tips.push('뒷바람이므로 한 클럽 작게 선택했습니다.');
  if(lie==='rough')tips.push('러프에서는 거리가 줄어들므로 보정했습니다.');
  if(lie==='bunker')tips.push('벙커에서는 웨지 계열을 추천합니다.');
  if(lie==='uphill')tips.push('오르막에서는 거리가 줄어들므로 큰 클럽을 추천합니다.');
  if(lie==='downhill')tips.push('내리막에서는 거리가 늘어나므로 작은 클럽을 추천합니다.');
  if(pin==='front')tips.push('핀이 앞이므로 짧게 치는 것이 안전합니다.');
  if(pin==='back')tips.push('핀이 뒤이므로 약간 더 세게 치세요.');

  var h='<div class="v15-card" style="border-left:4px solid var(--primary);margin-top:14px"><h4>&#x1F3C6; AI 추천: '+best.name+'</h4><p>보정 거리: '+adjustedDist+'y (원래 '+dist+'y)<br>비거리 범위: '+best.dist[0]+'-'+best.dist[1]+'y<br>용도: '+best.use+'</p>';
  if(tips.length>0){h+='<div style="margin-top:8px">';tips.forEach(function(t){h+='<div style="font-size:11px;color:var(--primary);margin-top:3px">&#x1F4A1; '+t+'</div>'});h+='</div>'}
  h+='</div>';
  if(alt)h+='<div class="v15-card" style="border-left:4px solid #1565c0"><h4>&#x1F504; 대안: '+alt.name+'</h4><p>비거리 범위: '+alt.dist[0]+'-'+alt.dist[1]+'y<br>상황: '+alt.situation+'</p></div>';
  document.getElementById('v15-club-result').innerHTML=h;
  sfx15('club_ai');checkAchievements15();
};

// ============================================================
// 8. GOLF RULES ENCYCLOPEDIA - 골프 룰 백과 30항목
// ============================================================
var ruleOverlay=document.createElement('div');
ruleOverlay.className='v15-overlay';ruleOverlay.id='v15-rules';
ruleOverlay.innerHTML='<div class="v15-modal"><div class="v15-hdr"><h2><span class="v15i">&#x1F4D6;</span> 골프 룰 백과</h2><button class="v15-x" onclick="closeV15(\'v15-rules\')">&times;</button></div><div class="v15-tabs" id="v15-rule-tabs"></div><div id="v15-rule-body"></div></div>';
ruleOverlay.addEventListener('click',function(e){if(e.target===ruleOverlay)closeV15('v15-rules')});
document.body.appendChild(ruleOverlay);

var golfRules=[
  {cat:'기본',num:'R1',title:'플레이어의 행동 기준',desc:'정직, 다른 플레이어 배려, 코스 보호, 안전 우선. 2019 신규칙에서 행동 규범 강화.'},
  {cat:'기본',num:'R2',title:'라운드 및 홀의 정의',desc:'18홀(또는 위원회 결정)이 한 라운드. 각 홀은 티잉구역→페어웨이→퍼팅그린의 순서.'},
  {cat:'기본',num:'R3',title:'스코어 형태',desc:'스트로크 플레이(총타수)와 매치 플레이(홀별 승패). 대부분 아마추어 경기는 스트로크 플레이.'},
  {cat:'기본',num:'R4',title:'사용 클럽 제한',desc:'라운드 중 최대 14개 클럽. 초과 시 스트로크 플레이: 홀당 2벌타(최대 4벌타).'},
  {cat:'기본',num:'R5',title:'볼 규격',desc:'지름 42.67mm 이상, 무게 45.93g 이하. 공인구만 사용 가능.'},
  {cat:'티샷',num:'R6',title:'티잉 구역 규칙',desc:'티마커 사이, 뒤로 2클럽 이내에서 티샷. 구역 밖에서 치면 2벌타+재타.'},
  {cat:'티샷',num:'R7',title:'프로비저널 볼',desc:'OB나 분실이 의심될 때 잠정구 선언 후 타격. 원구 발견 시 잠정구 포기.'},
  {cat:'티샷',num:'R8',title:'티 높이 자유',desc:'티 사용은 티잉 구역에서만. 페어웨이/러프에서 티 사용 불가.'},
  {cat:'일반',num:'R9',title:'볼 식별',desc:'자기 볼을 식별하기 위해 마킹 권장. 확인 위해 들어올릴 수 있으나 선 고지.'},
  {cat:'일반',num:'R10',title:'있는 그대로 플레이',desc:'볼이 놓인 상태 그대로 치는 것이 원칙. 개선 행위(깔린 잔디 누르기 등) 금지.'},
  {cat:'일반',num:'R11',title:'루스 임페디먼트 제거',desc:'돌, 나뭇잎 등 자연물(루스 임페디먼트) 어디서든 제거 가능. 2019 신규칙.'},
  {cat:'일반',num:'R12',title:'움직인 볼 복원',desc:'자연의 힘(바람 등)으로 움직이면 새 위치에서 플레이. 사람에 의해 움직이면 복원.'},
  {cat:'구제',num:'R13',title:'언플레이어블 선언',desc:'어디서든 선언 가능(벙커 제외시 +1벌타). 3가지 옵션: 후방, 2클럽 이내, 원위치.'},
  {cat:'구제',num:'R14',title:'페널티 구역 (구 해저드)',desc:'노란 말뚝(2옵션)/빨간 말뚝(3옵션). 1벌타 구제. 그 안에서 칠 수도 있음.'},
  {cat:'구제',num:'R15',title:'OB (아웃 오브 바운즈)',desc:'흰 말뚝 밖으로 나가면 1벌타+원위치에서 재타(스트로크와 거리).'},
  {cat:'구제',num:'R16',title:'분실구 처리',desc:'3분 이내 찾지 못하면 분실구. 1벌타+원위치 재타. 프로비저널 볼 권장.'},
  {cat:'구제',num:'R17',title:'비정상 코스상태 구제',desc:'GUR(수리지), 임시고인물, 동물구멍에서 무벌타 구제. 가장 가까운 구제점 + 1클럽.'},
  {cat:'구제',num:'R18',title:'박힌 볼 구제',desc:'제너럴 구역(페어웨이 등)에서 볼이 박혔을 때 무벌타 구제. 2019 확대 적용.'},
  {cat:'그린',num:'R19',title:'그린 위 볼 마킹',desc:'퍼팅그린에서 볼을 집어 올리고 닦을 수 있음. 반드시 마크 후.'},
  {cat:'그린',num:'R20',title:'그린 위 수리',desc:'스파이크 자국, 볼 자국 등 그린 위 손상을 수리할 수 있음. 2019 확대.'},
  {cat:'그린',num:'R21',title:'깃대 꽂아둔 채 퍼팅',desc:'2019 신규칙: 깃대를 꽂아둔 채 퍼팅 가능. 맞아도 무벌타.'},
  {cat:'그린',num:'R22',title:'퍼팅 라인 터치',desc:'그린 위 퍼팅라인을 터치해도 무벌타(2019). 단, 개선 행위는 여전히 금지.'},
  {cat:'벙커',num:'R23',title:'벙커 기본 규칙',desc:'벙커 내에서 클럽으로 모래 터치 금지(백스윙/연습스윙). 위반 시 2벌타.'},
  {cat:'벙커',num:'R24',title:'벙커 내 루스 임페디먼트',desc:'2019 신규칙: 벙커 내 돌/나뭇잎 제거 가능. 모래 터치만 불가.'},
  {cat:'벙커',num:'R25',title:'벙커 언플레이어블',desc:'벙커 밖으로 드롭 시 2벌타. 벙커 안에서 드롭 시 1벌타.'},
  {cat:'페널티',num:'R26',title:'오구 플레이 (스트로크)',desc:'다른 사람 볼을 치면 2벌타 + 원구로 재플레이. 매치에서는 그 홀 패배.'},
  {cat:'페널티',num:'R27',title:'연습 스트로크',desc:'홀과 홀 사이에 전 홀 그린에서 연습 퍼팅 가능. 라운드 중 다른 연습 금지.'},
  {cat:'페널티',num:'R28',title:'부당한 지연',desc:'과도한 시간 소비 시 경고 → 1벌타 → 2벌타 → 실격 순차 적용.'},
  {cat:'페널티',num:'R29',title:'어드바이스',desc:'같은 팀(포볼 등)이 아닌 한 다른 플레이어에게 조언 요청/제공 금지. 2벌타.'},
  {cat:'페널티',num:'R30',title:'이중 타격',desc:'스윙 중 볼을 두 번 맞혀도 1타로 카운트. 2019 변경(이전에는 벌타).'}
];

function renderRules(tab){
  var cats=['전체','기본','티샷','일반','구제','그린','벙커','페널티','퀴즈'];
  var th=document.getElementById('v15-rule-tabs');
  th.innerHTML=cats.map(function(c,i){return '<button class="v15-tab'+(i===(tab||0)?' active':'')+'" onclick="renderRules('+i+')">'+c+'</button>'}).join('');
  var bd=document.getElementById('v15-rule-body');
  var idx=tab||0;
  if(idx===8){
    renderRuleQuiz();return;
  }
  var filtered=idx===0?golfRules:golfRules.filter(function(r){return r.cat===cats[idx]});
  var h='<div style="font-size:12px;color:var(--text-muted);margin-bottom:12px">카드를 클릭하면 상세 내용이 표시됩니다. ('+filtered.length+'개 규칙)</div>';
  filtered.forEach(function(r,i){
    h+='<div class="v15-rule-card" onclick="this.classList.toggle(\'expanded\');sfx15(\'rule\')"><div class="rule-num">'+r.num+' | '+r.cat+'</div><div class="rule-title">'+r.title+'</div><div class="rule-desc">'+r.desc+'</div></div>';
  });
  bd.innerHTML=h;
}
window.renderRules=renderRules;

var ruleQuizPool=[
  {q:'라운드 중 최대 몇 개의 클럽을 사용할 수 있나요?',a:['14개','12개','16개','18개'],correct:0},
  {q:'볼을 찾을 수 있는 최대 시간은?',a:['3분','5분','2분','10분'],correct:0},
  {q:'2019 신규칙에서 깃대를 꽂아둔 채 퍼팅하면?',a:['무벌타','1벌타','2벌타','실격'],correct:0},
  {q:'OB 처리 방법은?',a:['1벌타+원위치 재타','무벌타 드롭','2벌타+드롭','1벌타+전진 드롭'],correct:0},
  {q:'벙커에서 모래를 클럽으로 터치하면?',a:['2벌타','1벌타','무벌타','실격'],correct:0},
  {q:'티잉 구역의 범위는?',a:['티마커 사이, 뒤로 2클럽','티마커 사이, 뒤로 1클럽','티마커 앞 1m','제한 없음'],correct:0},
  {q:'빨간 페널티 구역에서의 구제 옵션 수는?',a:['3가지','2가지','1가지','4가지'],correct:0},
  {q:'공인 골프볼의 최소 지름은?',a:['42.67mm','43.00mm','41.00mm','44.00mm'],correct:0},
  {q:'2019 규칙에서 벙커 내 돌을 제거하면?',a:['무벌타','1벌타','2벌타','실격'],correct:0},
  {q:'스윙 중 볼을 두 번 맞히면? (2019 규칙)',a:['1타로 카운트','2타 카운트','벌타 추가','재타'],correct:0},
  {q:'비정상 코스상태(GUR)에서의 구제는?',a:['무벌타','1벌타','2벌타','구제 불가'],correct:0},
  {q:'다른 플레이어에게 어드바이스를 주면?',a:['2벌타','1벌타','무벌타','경고'],correct:0}
];

function renderRuleQuiz(){
  var bd=document.getElementById('v15-rule-body');
  var quizState=lsGet('rule_quiz_state',{idx:0,score:0,total:0,answered:false});
  if(quizState.idx>=ruleQuizPool.length)quizState={idx:0,score:0,total:0,answered:false};
  var q=ruleQuizPool[quizState.idx];
  var h='<div class="v15-stat-card" style="margin-bottom:14px"><div class="num">'+(quizState.idx+1)+'/'+ruleQuizPool.length+'</div><div class="lbl">현재 진행 | 정답 '+quizState.score+'개</div></div>';
  h+='<div class="v15-card"><h4>Q'+(quizState.idx+1)+'. '+q.q+'</h4><div style="margin-top:12px">';
  q.a.forEach(function(a,i){
    h+='<div class="v15-checklist-item" onclick="answerRuleQuiz('+i+')" style="cursor:pointer"><div class="chk" style="font-size:12px;font-weight:800">'+(i+1)+'</div><span style="font-size:13px">'+a+'</span></div>';
  });
  h+='</div></div>';
  if(quizState.answered){
    h+='<div style="text-align:center;margin-top:14px"><button class="v15-btn v15-btn-primary" onclick="nextRuleQuiz()">다음 문제 &rarr;</button></div>';
  }
  bd.innerHTML=h;
}
window.answerRuleQuiz=function(i){
  var quizState=lsGet('rule_quiz_state',{idx:0,score:0,total:0,answered:false});
  if(quizState.answered)return;
  quizState.answered=true;quizState.total++;
  if(i===ruleQuizPool[quizState.idx].correct){quizState.score++;sfx15('achieve_v15');toast15('정답!')}
  else{sfx15('shot_pattern');toast15('오답! 정답은 "'+ruleQuizPool[quizState.idx].a[0]+'"')}
  lsSet('rule_quiz_state',quizState);renderRuleQuiz();checkAchievements15();
};
window.nextRuleQuiz=function(){
  var quizState=lsGet('rule_quiz_state',{idx:0,score:0,total:0,answered:false});
  quizState.idx++;quizState.answered=false;
  if(quizState.idx>=ruleQuizPool.length){
    toast15('퀴즈 완료! '+quizState.score+'/'+ruleQuizPool.length+'개 정답');
    quizState={idx:0,score:0,total:0,answered:false};
  }
  lsSet('rule_quiz_state',quizState);renderRuleQuiz();
};

// ============================================================
// 9. PUTTING MINI GAME - 퍼팅 연습 미니게임 (Canvas)
// ============================================================
var puttOverlay=document.createElement('div');
puttOverlay.className='v15-overlay';puttOverlay.id='v15-putt';
puttOverlay.innerHTML='<div class="v15-modal"><div class="v15-hdr"><h2><span class="v15i">&#x26F3;</span> 퍼팅 미니게임</h2><button class="v15-x" onclick="closeV15(\'v15-putt\')">&times;</button></div><div id="v15-putt-body"></div></div>';
puttOverlay.addEventListener('click',function(e){if(e.target===puttOverlay)closeV15('v15-putt')});
document.body.appendChild(puttOverlay);

var puttGame={canvas:null,ctx:null,ball:{x:200,y:350},hole:{x:200,y:80,r:14},aim:{x:200,y:80},power:0,isPulling:false,isMoving:false,score:0,attempts:0,level:1,dx:0,dy:0};

function renderPuttGame(){
  var best=lsGet('putt_best',0);
  var totalHoles=lsGet('putt_total_holes',0);
  var h='<div class="v15-grid3" style="margin-bottom:14px"><div class="v15-stat-card"><div class="num" id="v15-putt-score">'+puttGame.score+'</div><div class="lbl">현재 스코어</div></div><div class="v15-stat-card" style="background:linear-gradient(135deg,#1565c0,#42a5f5)"><div class="num">'+best+'</div><div class="lbl">최고 기록</div></div><div class="v15-stat-card" style="background:linear-gradient(135deg,#e65100,#ff9800)"><div class="num">Lv.'+puttGame.level+'</div><div class="lbl">레벨</div></div></div>';
  h+='<canvas id="v15-putt-cvs" class="v15-putt-canvas" width="400" height="400"></canvas>';
  h+='<div style="text-align:center;margin-top:12px;font-size:12px;color:var(--text-muted)">볼을 터치/클릭한 채 드래그하여 방향과 힘을 조절하세요. 놓으면 발사!</div>';
  h+='<div style="text-align:center;margin-top:10px"><button class="v15-btn v15-btn-secondary v15-btn-sm" onclick="resetPuttGame()">새 게임</button></div>';
  document.getElementById('v15-putt-body').innerHTML=h;
  initPuttCanvas();
}

function initPuttCanvas(){
  var cvs=document.getElementById('v15-putt-cvs');if(!cvs)return;
  puttGame.canvas=cvs;puttGame.ctx=cvs.getContext('2d');
  puttGame.ball={x:200,y:350};
  puttGame.isMoving=false;puttGame.isPulling=false;
  randomHolePosition();
  drawPutt();

  cvs.addEventListener('mousedown',puttStart);
  cvs.addEventListener('mousemove',puttMove);
  cvs.addEventListener('mouseup',puttEnd);
  cvs.addEventListener('touchstart',function(e){e.preventDefault();puttStart(e.touches[0])},{passive:false});
  cvs.addEventListener('touchmove',function(e){e.preventDefault();puttMove(e.touches[0])},{passive:false});
  cvs.addEventListener('touchend',function(e){e.preventDefault();puttEnd()},{passive:false});
}

function randomHolePosition(){
  var margin=40;
  puttGame.hole.x=margin+Math.random()*(400-margin*2);
  puttGame.hole.y=40+Math.random()*120;
  if(puttGame.level>=3){
    puttGame.obstacles=[];
    var numObs=Math.min(puttGame.level-2,4);
    for(var i=0;i<numObs;i++){
      puttGame.obstacles.push({
        x:60+Math.random()*280,
        y:140+Math.random()*140,
        w:30+Math.random()*40,
        h:8+Math.random()*12
      });
    }
  }else{puttGame.obstacles=[]}
}

function getCvsPos(e){
  var rect=puttGame.canvas.getBoundingClientRect();
  var scaleX=400/rect.width;
  return{x:(e.clientX-rect.left)*scaleX,y:(e.clientY-rect.top)*scaleX};
}

function puttStart(e){
  if(puttGame.isMoving)return;
  var p=getCvsPos(e);
  var dx=p.x-puttGame.ball.x,dy=p.y-puttGame.ball.y;
  if(Math.sqrt(dx*dx+dy*dy)<30){puttGame.isPulling=true;puttGame.aim=p}
}
function puttMove(e){
  if(!puttGame.isPulling)return;
  puttGame.aim=getCvsPos(e);drawPutt();
}
function puttEnd(){
  if(!puttGame.isPulling)return;
  puttGame.isPulling=false;
  var dx=puttGame.ball.x-puttGame.aim.x;
  var dy=puttGame.ball.y-puttGame.aim.y;
  var dist=Math.sqrt(dx*dx+dy*dy);
  if(dist<5)return;
  var speed=Math.min(dist/15,12);
  var angle=Math.atan2(dy,dx);
  puttGame.dx=Math.cos(angle)*speed;
  puttGame.dy=Math.sin(angle)*speed;
  puttGame.isMoving=true;puttGame.attempts++;
  sfx15('putt_hit');animatePutt();
}

function animatePutt(){
  if(!puttGame.isMoving)return;
  puttGame.ball.x+=puttGame.dx;
  puttGame.ball.y+=puttGame.dy;
  puttGame.dx*=0.985;puttGame.dy*=0.985;

  if(puttGame.ball.x<10||puttGame.ball.x>390){puttGame.dx*=-0.6;puttGame.ball.x=Math.max(10,Math.min(390,puttGame.ball.x))}
  if(puttGame.ball.y<10||puttGame.ball.y>390){puttGame.dy*=-0.6;puttGame.ball.y=Math.max(10,Math.min(390,puttGame.ball.y))}

  if(puttGame.obstacles){
    puttGame.obstacles.forEach(function(o){
      if(puttGame.ball.x>o.x&&puttGame.ball.x<o.x+o.w&&puttGame.ball.y>o.y&&puttGame.ball.y<o.y+o.h){
        puttGame.dy*=-0.7;puttGame.ball.y=puttGame.dy>0?o.y-8:o.y+o.h+8;
      }
    });
  }

  var hdx=puttGame.ball.x-puttGame.hole.x;
  var hdy=puttGame.ball.y-puttGame.hole.y;
  var hDist=Math.sqrt(hdx*hdx+hdy*hdy);
  var speed=Math.sqrt(puttGame.dx*puttGame.dx+puttGame.dy*puttGame.dy);

  if(hDist<puttGame.hole.r&&speed<8){
    puttGame.isMoving=false;puttGame.score++;
    puttGame.ball={x:200,y:350};
    if(puttGame.score%3===0)puttGame.level++;
    randomHolePosition();
    sfx15('putt_hole');toast15('홀인! ('+puttGame.score+'개)');
    var best=lsGet('putt_best',0);
    if(puttGame.score>best){lsSet('putt_best',puttGame.score);toast15('새 최고 기록!')}
    var total=lsGet('putt_total_holes',0);lsSet('putt_total_holes',total+1);
    var el=document.getElementById('v15-putt-score');if(el)el.textContent=puttGame.score;
    drawPutt();checkAchievements15();return;
  }

  if(speed<0.3){puttGame.isMoving=false;drawPutt();return}
  drawPutt();requestAnimationFrame(animatePutt);
}

function drawPutt(){
  var ctx=puttGame.ctx;if(!ctx)return;
  ctx.clearRect(0,0,400,400);

  var grad=ctx.createLinearGradient(0,0,0,400);
  grad.addColorStop(0,'#2d8a4e');grad.addColorStop(1,'#1a6b35');
  ctx.fillStyle=grad;ctx.fillRect(0,0,400,400);

  for(var i=0;i<400;i+=20){ctx.strokeStyle='rgba(255,255,255,0.05)';ctx.beginPath();ctx.moveTo(i,0);ctx.lineTo(i,400);ctx.stroke();ctx.beginPath();ctx.moveTo(0,i);ctx.lineTo(400,i);ctx.stroke()}

  if(puttGame.obstacles){
    puttGame.obstacles.forEach(function(o){
      ctx.fillStyle='#5d4037';ctx.fillRect(o.x,o.y,o.w,o.h);
      ctx.fillStyle='#8d6e63';ctx.fillRect(o.x+2,o.y+2,o.w-4,o.h-4);
    });
  }

  ctx.beginPath();ctx.arc(puttGame.hole.x,puttGame.hole.y,puttGame.hole.r+4,0,Math.PI*2);ctx.fillStyle='rgba(0,0,0,0.2)';ctx.fill();
  ctx.beginPath();ctx.arc(puttGame.hole.x,puttGame.hole.y,puttGame.hole.r,0,Math.PI*2);ctx.fillStyle='#111';ctx.fill();
  ctx.beginPath();ctx.arc(puttGame.hole.x-3,puttGame.hole.y-3,3,0,Math.PI*2);ctx.fillStyle='rgba(255,255,255,0.15)';ctx.fill();

  ctx.fillStyle='#d32f2f';ctx.fillRect(puttGame.hole.x-1,puttGame.hole.y-30,2,30);
  ctx.beginPath();ctx.moveTo(puttGame.hole.x+1,puttGame.hole.y-30);ctx.lineTo(puttGame.hole.x+15,puttGame.hole.y-25);ctx.lineTo(puttGame.hole.x+1,puttGame.hole.y-20);ctx.fillStyle='#f44336';ctx.fill();

  if(puttGame.isPulling){
    ctx.beginPath();ctx.moveTo(puttGame.ball.x,puttGame.ball.y);ctx.lineTo(puttGame.aim.x,puttGame.aim.y);
    ctx.strokeStyle='rgba(255,255,255,0.5)';ctx.lineWidth=2;ctx.setLineDash([5,5]);ctx.stroke();ctx.setLineDash([]);
    var dx=puttGame.ball.x-puttGame.aim.x;var dy=puttGame.ball.y-puttGame.aim.y;
    var dist=Math.sqrt(dx*dx+dy*dy);
    var pwr=Math.min(Math.round(dist/3),100);
    ctx.fillStyle='rgba(255,255,255,0.8)';ctx.font='bold 12px sans-serif';ctx.textAlign='center';
    ctx.fillText('Power: '+pwr+'%',puttGame.ball.x,puttGame.ball.y+25);
    var angle=Math.atan2(dy,dx);var arrowLen=Math.min(dist*0.3,40);
    ctx.beginPath();ctx.moveTo(puttGame.ball.x,puttGame.ball.y);ctx.lineTo(puttGame.ball.x+Math.cos(angle)*arrowLen,puttGame.ball.y+Math.sin(angle)*arrowLen);
    ctx.strokeStyle='#ffeb3b';ctx.lineWidth=3;ctx.stroke();
  }

  ctx.beginPath();ctx.arc(puttGame.ball.x,puttGame.ball.y,8,0,Math.PI*2);ctx.fillStyle='#fff';ctx.fill();
  ctx.strokeStyle='#ccc';ctx.lineWidth=1;ctx.stroke();
  ctx.beginPath();ctx.arc(puttGame.ball.x-2,puttGame.ball.y-2,2,0,Math.PI*2);ctx.fillStyle='rgba(200,200,200,0.5)';ctx.fill();

  ctx.fillStyle='rgba(255,255,255,0.9)';ctx.font='bold 14px sans-serif';ctx.textAlign='left';
  ctx.fillText('Score: '+puttGame.score,10,25);
  ctx.fillText('Lv.'+puttGame.level,10,45);
  ctx.textAlign='right';ctx.fillText('Shots: '+puttGame.attempts,390,25);
}

window.resetPuttGame=function(){
  puttGame.score=0;puttGame.attempts=0;puttGame.level=1;
  puttGame.ball={x:200,y:350};puttGame.isMoving=false;puttGame.isPulling=false;
  randomHolePosition();drawPutt();toast15('새 게임 시작!');
};

// ============================================================
// 10. GOLF COMMUNITY BOARD - 골프 커뮤니티 게시판
// ============================================================
var commOverlay=document.createElement('div');
commOverlay.className='v15-overlay';commOverlay.id='v15-community';
commOverlay.innerHTML='<div class="v15-modal"><div class="v15-hdr"><h2><span class="v15i">&#x1F4AC;</span> 골프 커뮤니티</h2><button class="v15-x" onclick="closeV15(\'v15-community\')">&times;</button></div><div class="v15-tabs" id="v15-comm-tabs"></div><div id="v15-comm-body"></div></div>';
commOverlay.addEventListener('click',function(e){if(e.target===commOverlay)closeV15('v15-community')});
document.body.appendChild(commOverlay);

var defaultPosts=[
  {id:1,cat:'tip',title:'드라이버 슬라이스 완전 정복법',author:'ProGolfer_Kim',date:'2026-05-28',body:'슬라이스의 3대 원인: 오픈 페이스, 아웃-인 스윙패스, 위크 그립. 가장 먼저 그립부터 교정하세요. 왼손 너클이 2-3개 보이도록 스트롱 그립으로 잡으면 페이스가 닫히면서 슬라이스가 줄어듭니다.',likes:45,replies:12},
  {id:2,cat:'review',title:'남해 사우스링스 라운딩 솔직 후기',author:'Birdie_Park',date:'2026-05-27',body:'코스 컨디션: 9/10, 서비스: 8/10, 가성비: 7/10. 바다뷰가 압도적이지만 바람이 강해서 클럽 선택이 중요합니다. 캐디 서비스도 친절했고, 식당 갈비탕이 맛있었습니다.',likes:38,replies:8},
  {id:3,cat:'question',title:'7번 아이언 vs 하이브리드, 150야드에서 어떤 게 낫나요?',author:'Ace_Jung',date:'2026-05-27',body:'최근에 7번 아이언이 잘 안 맞아서 하이브리드로 바꿀까 고민 중입니다. 러프에서는 하이브리드가 확실히 나은 것 같은데, 페어웨이에서는 7번이 컨트롤이 좋은 것 같기도 하고...',likes:22,replies:15},
  {id:4,cat:'tip',title:'아침 라운드 전 10분 스트레칭 루틴',author:'GolfMaster_Lee',date:'2026-05-26',body:'1. 목 돌리기 (좌우 10회) 2. 어깨 회전 (전후 각 10회) 3. 허리 트위스트 (좌우 15초씩) 4. 힙 로테이션 (좌우 10회) 5. 햄스트링 스트레치 (15초씩). 부상 예방에 정말 효과적입니다!',likes:56,replies:6},
  {id:5,cat:'review',title:'핑 G430 Max 드라이버 6개월 사용기',author:'Eagle_Choi',date:'2026-05-25',body:'관용성이 정말 좋습니다. 미스히트에도 거리 손실이 적고, 소리도 기분 좋은 타격감. 다만 무게가 약간 무거운 편이라 헤드스피드가 느린 분은 주의. 전체적으로 9/10 추천합니다.',likes:41,replies:9}
];
var communityPosts=lsGet('community_posts',defaultPosts);

function renderCommunity(tab){
  var tabs=['전체','팁','후기','질문','글쓰기'];
  var th=document.getElementById('v15-comm-tabs');
  th.innerHTML=tabs.map(function(t,i){return '<button class="v15-tab'+(i===(tab||0)?' active':'')+'" onclick="renderCommunity('+i+')">'+t+'</button>'}).join('');
  var bd=document.getElementById('v15-comm-body');
  var idx=tab||0;
  if(idx===4){
    bd.innerHTML='<div class="v15-card"><h4>&#x270F; 새 글 작성</h4><div style="margin-top:10px"><label style="font-size:11px;font-weight:700;color:var(--text-muted)">카테고리</label><select class="v15-select" id="v15-comm-cat" style="width:100%;margin-top:4px"><option value="tip">팁</option><option value="review">후기</option><option value="question">질문</option></select></div><div style="margin-top:10px"><label style="font-size:11px;font-weight:700;color:var(--text-muted)">제목</label><input class="v15-input" id="v15-comm-title" placeholder="제목을 입력하세요" style="margin-top:4px"></div><div style="margin-top:10px"><label style="font-size:11px;font-weight:700;color:var(--text-muted)">내용</label><textarea class="v15-textarea" id="v15-comm-body" placeholder="자세한 내용을 작성하세요..." style="margin-top:4px;min-height:120px"></textarea></div><button class="v15-btn v15-btn-primary" style="margin-top:14px;width:100%" onclick="addCommunityPost()">게시하기</button></div>';
    return;
  }
  var catMap=['','tip','review','question'];
  var filtered=idx===0?communityPosts:communityPosts.filter(function(p){return p.cat===catMap[idx]});
  var h='';
  filtered.forEach(function(p,i){
    var catLabel={'tip':'&#x1F4A1; 팁','review':'&#x1F3CC; 후기','question':'&#x2753; 질문'}[p.cat]||'';
    h+='<div class="v15-card"><div style="display:flex;justify-content:space-between;align-items:start"><div style="flex:1"><h4>'+p.title+'</h4><div style="font-size:11px;color:var(--text-muted);margin-top:2px">'+p.author+' | '+p.date+' <span class="v15-badge v15-badge-blue">'+catLabel+'</span></div></div></div><p style="margin-top:10px">'+p.body+'</p><div style="margin-top:10px;display:flex;gap:14px;font-size:12px;color:var(--text-muted)"><span style="cursor:pointer" onclick="likeCommunityPost('+p.id+')">&#x2764; '+p.likes+'</span><span>&#x1F4AC; '+p.replies+' 댓글</span></div></div>';
  });
  if(filtered.length===0)h='<div style="text-align:center;padding:40px;color:var(--text-muted)">아직 글이 없습니다.</div>';
  bd.innerHTML=h;
}
window.renderCommunity=renderCommunity;
window.addCommunityPost=function(){
  var title=document.getElementById('v15-comm-title').value.trim();
  var body=document.getElementById('v15-comm-body').value.trim();
  var cat=document.getElementById('v15-comm-cat').value;
  if(!title||!body)return toast15('제목과 내용을 입력하세요');
  communityPosts.unshift({
    id:Date.now(),cat:cat,title:title,author:socialProfile.nickname,
    date:new Date().toISOString().slice(0,10),body:body,likes:0,replies:0
  });
  lsSet('community_posts',communityPosts);sfx15('community');toast15('게시되었습니다!');
  renderCommunity(0);checkAchievements15();
};
window.likeCommunityPost=function(id){
  var post=communityPosts.find(function(p){return p.id===id});
  if(post){post.likes++;lsSet('community_posts',communityPosts);renderCommunity(0)}
};

// ============================================================
// ACHIEVEMENTS v15
// ============================================================
var achievements15=[
  {id:'social_profile',name:'골퍼 데뷔',desc:'소셜 프로필 저장',icon:'&#x1F465;'},
  {id:'challenge_join',name:'도전자',desc:'챌린지 1개 참여',icon:'&#x1F3C6;'},
  {id:'feed_post',name:'소셜 골퍼',desc:'피드에 글 1개 작성',icon:'&#x1F4DD;'},
  {id:'checklist_full',name:'체크리스트 마스터',desc:'하루 체크리스트 전체 완료',icon:'&#x2705;'},
  {id:'weather_calc',name:'기상캐스터',desc:'날씨 비거리 보정 사용',icon:'&#x1F327;'},
  {id:'fitness_10',name:'피트니스 입문',desc:'운동 총 10회 완료',icon:'&#x1F4AA;'},
  {id:'shot_pattern_20',name:'패턴 분석가',desc:'미스샷 20개 기록',icon:'&#x1F3AF;'},
  {id:'review_5',name:'라운드 복기왕',desc:'복기 5개 작성',icon:'&#x1F4DD;'},
  {id:'club_ai_use',name:'AI 상담사',desc:'클럽 추천 AI 사용',icon:'&#x1F916;'},
  {id:'rule_quiz_10',name:'규칙 박사',desc:'룰 퀴즈 10문제 풀기',icon:'&#x1F4D6;'},
  {id:'putt_10',name:'퍼팅 달인',desc:'퍼팅 게임 10홀 성공',icon:'&#x26F3;'},
  {id:'community_post',name:'커뮤니티 기여자',desc:'커뮤니티에 글 1개 작성',icon:'&#x1F4AC;'}
];
var unlockedAch15=lsGet('achievements_v15',[]);

function checkAchievements15(){
  var newUnlocks=[];
  function chk(id){return unlockedAch15.indexOf(id)===-1}
  if(chk('social_profile')&&socialProfile.nickname!=='Golfer_'+socialProfile.nickname.split('_')[1]){newUnlocks.push('social_profile')}
  if(chk('challenge_join')&&lsGet('social_challenges_joined',[]).length>0){newUnlocks.push('challenge_join')}
  if(chk('feed_post')&&socialFeed.some(function(f){return f.author===socialProfile.nickname})){newUnlocks.push('feed_post')}
  var today=new Date().toISOString().slice(0,10);
  var todayChk=lsGet('checklist_'+today,{pre:[],during:[],post:[]});
  if(chk('checklist_full')&&(todayChk.pre||[]).length>=checklistData.pre.length&&(todayChk.during||[]).length>=checklistData.during.length&&(todayChk.post||[]).length>=checklistData.post.length){newUnlocks.push('checklist_full')}
  if(chk('fitness_10')){var total=Object.values(fitnessDone).reduce(function(s,v){return s+v},0);if(total>=10)newUnlocks.push('fitness_10')}
  if(chk('shot_pattern_20')&&shotPatterns.length>=20){newUnlocks.push('shot_pattern_20')}
  if(chk('review_5')&&roundReviews.length>=5){newUnlocks.push('review_5')}
  if(chk('club_ai_use')){newUnlocks.push('club_ai_use')}
  var qs=lsGet('rule_quiz_state',{idx:0,score:0,total:0});
  if(chk('rule_quiz_10')&&qs.total>=10){newUnlocks.push('rule_quiz_10')}
  if(chk('putt_10')&&lsGet('putt_total_holes',0)>=10){newUnlocks.push('putt_10')}
  if(chk('community_post')&&communityPosts.some(function(p){return p.author===socialProfile.nickname})){newUnlocks.push('community_post')}

  newUnlocks.forEach(function(id){
    if(unlockedAch15.indexOf(id)===-1){
      unlockedAch15.push(id);
      var ach=achievements15.find(function(a){return a.id===id});
      if(ach){sfx15('achieve_v15');toast15('&#x1F3C6; '+ach.name+' 업적 달성!')}
    }
  });
  lsSet('achievements_v15',unlockedAch15);
}

// ============================================================
// QUICK ACTION BUTTONS
// ============================================================
function injectV15Buttons(){
  var container=document.querySelector('.quick-actions')||document.querySelector('.header-inner');
  if(!container)return;

  var btns=[
    {label:'&#x1F465; 소셜',fn:'openV15(\'v15-social\');renderSocial(0)'},
    {label:'&#x2705; 체크리스트',fn:'openV15(\'v15-checklist\');renderChecklist(0)'},
    {label:'&#x1F327; 비거리보정',fn:'openV15(\'v15-weather\');renderWeather()'},
    {label:'&#x1F4AA; 피트니스',fn:'openV15(\'v15-fitness\');renderFitness(0)'},
    {label:'&#x1F3AF; 샷패턴',fn:'openV15(\'v15-shotpat\');renderShotPattern(0)'},
    {label:'&#x1F4DD; 복기',fn:'openV15(\'v15-review\');renderReview(0)'},
    {label:'&#x1F916; 클럽AI',fn:'openV15(\'v15-clubai\');renderClubAI()'},
    {label:'&#x1F4D6; 룰북',fn:'openV15(\'v15-rules\');renderRules(0)'},
    {label:'&#x26F3; 퍼팅게임',fn:'openV15(\'v15-putt\');renderPuttGame()'},
    {label:'&#x1F4AC; 커뮤니티',fn:'openV15(\'v15-community\');renderCommunity(0)'}
  ];

  var wrap=document.createElement('div');
  wrap.style.cssText='display:flex;flex-wrap:wrap;gap:6px;padding:10px 20px;max-width:1400px;margin:0 auto;justify-content:center';
  btns.forEach(function(b){
    var btn=document.createElement('button');
    btn.innerHTML=b.label;
    btn.style.cssText='padding:7px 14px;border:1.5px solid var(--border);border-radius:20px;background:var(--card-bg);color:var(--text);font-size:11px;font-weight:700;cursor:pointer;transition:.2s;white-space:nowrap';
    btn.onmouseover=function(){this.style.borderColor='var(--primary)';this.style.color='var(--primary)'};
    btn.onmouseout=function(){this.style.borderColor='var(--border)';this.style.color='var(--text)'};
    btn.setAttribute('onclick',b.fn);
    wrap.appendChild(btn);
  });

  var searchSection=document.querySelector('.search-section');
  if(searchSection){searchSection.parentNode.insertBefore(wrap,searchSection)}
  else{document.body.insertBefore(wrap,document.body.children[1]||null)}
}

// ============================================================
// KEYBOARD SHORTCUTS
// ============================================================
document.addEventListener('keydown',function(e){
  if(e.target.tagName==='INPUT'||e.target.tagName==='TEXTAREA'||e.target.tagName==='SELECT')return;
  if(e.shiftKey)return;
  switch(e.key.toUpperCase()){
    case 'O':openV15('v15-social');renderSocial(0);break;
    case 'L':openV15('v15-checklist');renderChecklist(0);break;
    case 'W':openV15('v15-weather');renderWeather();break;
    case 'X':openV15('v15-fitness');renderFitness(0);break;
    case 'Z':openV15('v15-shotpat');renderShotPattern(0);break;
  }
});

// Init
if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',injectV15Buttons)}
else{injectV15Buttons()}

})();
