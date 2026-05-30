(function(){
'use strict';

var css18 = document.createElement('style');
css18.textContent = `
.v18-overlay{position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,.88);z-index:10070;display:none;align-items:center;justify-content:center;backdrop-filter:blur(20px)}
.v18-overlay.active{display:flex}
.v18-modal{background:var(--card-bg,#fff);border-radius:28px;padding:32px;width:97%;max-width:860px;max-height:94vh;overflow-y:auto;box-shadow:0 48px 140px rgba(0,0,0,.7);animation:v18Rise .35s cubic-bezier(.22,1,.36,1)}
@keyframes v18Rise{from{opacity:0;transform:translateY(48px) scale(.92)}to{opacity:1;transform:translateY(0) scale(1)}}
.v18-hdr{display:flex;justify-content:space-between;align-items:center;margin-bottom:22px}
.v18-hdr h2{font-size:24px;font-weight:800;display:flex;align-items:center;gap:10px}
.v18-hdr h2 .v18i{font-size:30px}
.v18-x{background:none;border:none;font-size:30px;cursor:pointer;color:var(--text-muted);padding:4px 10px;border-radius:10px;transition:.2s}
.v18-x:hover{background:var(--border);color:var(--text)}
.v18-tabs{display:flex;gap:6px;margin-bottom:18px;overflow-x:auto;padding-bottom:4px;scrollbar-width:none}
.v18-tabs::-webkit-scrollbar{display:none}
.v18-tab{padding:10px 20px;border-radius:26px;border:1.5px solid var(--border);background:var(--bg);font-size:12px;font-weight:700;cursor:pointer;white-space:nowrap;transition:.25s}
.v18-tab.active{background:var(--primary);color:#fff;border-color:var(--primary);box-shadow:0 3px 16px rgba(26,122,58,.35)}
.v18-card{background:var(--bg);border-radius:18px;padding:20px;margin-bottom:12px;transition:.25s;border:1.5px solid transparent}
.v18-card:hover{border-color:var(--primary);transform:translateY(-2px);box-shadow:0 4px 18px rgba(26,122,58,.12)}
.v18-card h4{font-size:15px;font-weight:700;margin-bottom:8px;display:flex;align-items:center;gap:8px}
.v18-card p{font-size:12px;color:var(--text-muted);line-height:1.7}
.v18-btn{padding:11px 24px;border:none;border-radius:14px;font-size:13px;font-weight:700;cursor:pointer;transition:.25s;display:inline-flex;align-items:center;gap:6px}
.v18-btn-primary{background:linear-gradient(135deg,var(--primary),#2e9e4f);color:#fff}
.v18-btn-primary:hover{transform:translateY(-2px);box-shadow:0 8px 22px rgba(26,122,58,.4)}
.v18-btn-sm{padding:7px 14px;font-size:11px;border-radius:10px}
.v18-btn-secondary{background:var(--bg);color:var(--text);border:1.5px solid var(--border)}
.v18-btn-secondary:hover{border-color:var(--primary);color:var(--primary)}
.v18-input{width:100%;padding:11px 16px;border:2px solid var(--border);border-radius:12px;font-size:13px;background:var(--bg);color:var(--text);transition:.2s}
.v18-input:focus{border-color:var(--primary);outline:none;box-shadow:0 0 0 3px rgba(26,122,58,.12)}
.v18-select{padding:9px 14px;border:2px solid var(--border);border-radius:10px;font-size:13px;background:var(--bg);color:var(--text)}
.v18-grid2{display:grid;grid-template-columns:1fr 1fr;gap:12px}
.v18-grid3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px}
@media(max-width:520px){.v18-grid2,.v18-grid3{grid-template-columns:1fr}}
.v18-divider{height:1px;background:var(--border);margin:18px 0}
.v18-badge{display:inline-block;padding:5px 14px;border-radius:16px;font-size:11px;font-weight:700}
.v18-progress{width:100%;height:12px;background:var(--border);border-radius:6px;overflow:hidden;margin:8px 0}
.v18-progress-fill{height:100%;border-radius:6px;transition:width .6s ease}
.v18-stat-row{display:flex;justify-content:space-between;align-items:center;padding:13px 0;border-bottom:1px solid var(--border)}
.v18-stat-row:last-child{border-bottom:none}
.v18-etiquette-card{background:var(--bg);border-radius:16px;padding:18px;margin-bottom:10px;border-left:4px solid var(--primary);cursor:pointer;transition:.25s}
.v18-etiquette-card:hover{transform:translateX(4px);box-shadow:0 3px 12px rgba(26,122,58,.1)}
.v18-etiquette-card.expanded .v18-etiquette-detail{display:block}
.v18-etiquette-detail{display:none;margin-top:12px;padding-top:12px;border-top:1px solid var(--border);font-size:12px;color:var(--text-muted);line-height:1.8}
.v18-etiquette-cat{font-size:10px;font-weight:800;color:var(--primary);margin-bottom:4px;text-transform:uppercase;letter-spacing:0.5px}
.v18-etiquette-title{font-size:14px;font-weight:700}
.v18-pro-card{display:flex;gap:14px;padding:16px;background:var(--bg);border-radius:16px;margin-bottom:10px;align-items:center;border:1.5px solid transparent;transition:.25s}
.v18-pro-card:hover{border-color:var(--primary);transform:translateY(-2px)}
.v18-pro-avatar{width:56px;height:56px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:26px;flex-shrink:0;background:linear-gradient(135deg,#e8f5e9,#c8e6c9)}
[data-theme="dark"] .v18-pro-avatar{background:linear-gradient(135deg,#1a3a25,#0f5a28)}
.v18-pro-info{flex:1}
.v18-pro-name{font-size:14px;font-weight:700;margin-bottom:3px}
.v18-pro-desc{font-size:11px;color:var(--text-muted);line-height:1.6}
.v18-pro-stats{display:flex;gap:6px;flex-wrap:wrap;margin-top:6px}
.v18-pro-stat{padding:3px 8px;border-radius:8px;font-size:10px;font-weight:600;background:var(--primary-light);color:var(--primary)}
.v18-heatmap-canvas{width:100%;max-width:500px;margin:0 auto;display:block;border-radius:14px}
.v18-timeline-item{display:flex;align-items:flex-start;gap:12px;padding:14px;position:relative}
.v18-timeline-dot{width:14px;height:14px;border-radius:50%;background:var(--primary);flex-shrink:0;margin-top:3px;box-shadow:0 0 0 4px var(--primary-light)}
.v18-timeline-line{position:absolute;left:26px;top:32px;bottom:0;width:2px;background:var(--border)}
.v18-timeline-content{flex:1;background:var(--bg);border-radius:14px;padding:14px;border:1px solid var(--border)}
.v18-stretch-card{background:var(--bg);border-radius:16px;padding:16px;margin-bottom:10px;display:flex;gap:14px;align-items:center;transition:.25s}
.v18-stretch-card:hover{transform:translateY(-2px);box-shadow:0 3px 12px rgba(26,122,58,.1)}
.v18-stretch-icon{width:50px;height:50px;border-radius:14px;display:flex;align-items:center;justify-content:center;font-size:24px;flex-shrink:0}
.v18-stretch-info{flex:1}
.v18-stretch-name{font-size:13px;font-weight:700;margin-bottom:2px}
.v18-stretch-desc{font-size:11px;color:var(--text-muted);line-height:1.5}
.v18-stretch-dur{font-size:10px;font-weight:700;color:var(--primary);margin-top:4px}
.v18-feed-item{background:var(--bg);border-radius:16px;padding:16px;margin-bottom:12px;border:1px solid var(--border)}
.v18-feed-header{display:flex;align-items:center;gap:10px;margin-bottom:10px}
.v18-feed-avatar{width:36px;height:36px;border-radius:50%;background:linear-gradient(135deg,var(--primary),#2e9e4f);display:flex;align-items:center;justify-content:center;color:#fff;font-weight:700;font-size:14px}
.v18-feed-name{font-size:13px;font-weight:700}
.v18-feed-time{font-size:10px;color:var(--text-muted)}
.v18-feed-body{font-size:12px;line-height:1.7;margin-bottom:10px}
.v18-feed-actions{display:flex;gap:12px}
.v18-feed-action{background:none;border:none;font-size:12px;color:var(--text-muted);cursor:pointer;display:flex;align-items:center;gap:4px;transition:.2s}
.v18-feed-action:hover{color:var(--primary)}
.v18-feed-action.liked{color:#e53935}
.v18-condition-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}
@media(max-width:520px){.v18-condition-grid{grid-template-columns:1fr 1fr}}
.v18-condition-item{text-align:center;padding:14px;background:var(--bg);border-radius:14px}
.v18-condition-icon{font-size:28px;margin-bottom:6px}
.v18-condition-label{font-size:11px;font-weight:600;color:var(--text-muted);margin-bottom:4px}
.v18-condition-value{font-size:16px;font-weight:800;color:var(--primary)}
.v18-mental-step{padding:16px;background:var(--bg);border-radius:16px;margin-bottom:10px;border-left:4px solid transparent;transition:.3s}
.v18-mental-step.active{border-left-color:var(--primary);background:var(--primary-light)}
.v18-mental-step h5{font-size:13px;font-weight:700;margin-bottom:4px;display:flex;align-items:center;gap:6px}
.v18-mental-step p{font-size:11px;color:var(--text-muted);line-height:1.6}
.v18-club-bar{display:flex;align-items:center;gap:8px;padding:8px 0}
.v18-club-bar .club-name{width:60px;font-size:11px;font-weight:700;text-align:right}
.v18-club-bar .bar-track{flex:1;height:20px;background:var(--border);border-radius:10px;overflow:hidden;position:relative}
.v18-club-bar .bar-fill{height:100%;border-radius:10px;transition:width .8s ease;position:relative}
.v18-club-bar .bar-label{position:absolute;right:8px;top:50%;transform:translateY(-50%);font-size:10px;font-weight:700;color:#fff}
.v18-club-bar .dist-label{width:50px;font-size:11px;font-weight:600;color:var(--text-muted)}
`;
document.head.appendChild(css18);

// ========== SFX Engine ==========
var v18Sfx = {
  heatmap: function(){ v18Beep(520, 0.08, 'sine'); },
  etiquette: function(){ v18Beep(660, 0.06, 'triangle'); },
  pro_swing: function(){ v18Beep(440, 0.1, 'sine'); setTimeout(function(){v18Beep(660,0.08,'sine');},100); },
  club_dist: function(){ v18Beep(380, 0.07, 'square'); },
  timeline: function(){ v18Beep(500, 0.05, 'sine'); },
  stretch: function(){ v18Beep(330, 0.12, 'triangle'); },
  feed_like: function(){ v18Beep(800, 0.05, 'sine'); setTimeout(function(){v18Beep(1000,0.05,'sine');},80); },
  feed_post: function(){ v18Beep(600, 0.08, 'triangle'); },
  condition: function(){ v18Beep(440, 0.06, 'sine'); },
  mental: function(){ v18Beep(280, 0.15, 'sine'); },
  achieve: function(){ v18Beep(523,0.08,'sine'); setTimeout(function(){v18Beep(659,0.08,'sine');},120); setTimeout(function(){v18Beep(784,0.12,'sine');},240); },
  quiz: function(){ v18Beep(700, 0.06, 'triangle'); }
};
function v18Beep(freq,dur,type){
  try{
    var ctx=new(window.AudioContext||window.webkitAudioContext)();
    var o=ctx.createOscillator(),g=ctx.createGain();
    o.type=type||'sine';o.frequency.value=freq;
    g.gain.setValueAtTime(0.13,ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001,ctx.currentTime+dur);
    o.connect(g);g.connect(ctx.destination);
    o.start();o.stop(ctx.currentTime+dur+0.05);
  }catch(e){}
}

// ========== 1. Shot Tracker Heatmap ==========
var SHOT_DATA_KEY = 'sg_shot_data_v18';
function getShotData(){ try{return JSON.parse(localStorage.getItem(SHOT_DATA_KEY))||[];}catch(e){return [];} }
function saveShotData(d){ localStorage.setItem(SHOT_DATA_KEY,JSON.stringify(d.slice(-200))); }

function renderShotHeatmap(container){
  var data = getShotData();
  var html = '<div class="v18-card"><h4><span class="v18i">&#x1F3AF;</span> Shot Tracker Heatmap</h4>';
  html += '<p>샷 위치를 기록하면 분포도를 시각화합니다. 페어웨이 적중률, 미스 패턴을 한눈에 파악하세요.</p>';
  html += '<div style="margin:12px 0"><canvas id="v18HeatCanvas" width="500" height="340" class="v18-heatmap-canvas" style="border:2px solid var(--border)"></canvas></div>';
  html += '<div class="v18-grid3" style="margin-bottom:12px">';
  html += '<button class="v18-btn v18-btn-sm v18-btn-primary" onclick="v18AddShot(\'fairway\')">&#x1F7E2; Fairway</button>';
  html += '<button class="v18-btn v18-btn-sm v18-btn-secondary" onclick="v18AddShot(\'rough\')">&#x1F7E1; Rough</button>';
  html += '<button class="v18-btn v18-btn-sm v18-btn-secondary" onclick="v18AddShot(\'bunker\')">&#x1F7E4; Bunker</button>';
  html += '</div>';
  html += '<div class="v18-grid2">';
  html += '<button class="v18-btn v18-btn-sm v18-btn-secondary" onclick="v18AddShot(\'green\')">&#x1F7E2; Green</button>';
  html += '<button class="v18-btn v18-btn-sm v18-btn-secondary" onclick="v18AddShot(\'ob\')">&#x1F534; OB</button>';
  html += '</div>';
  var fairway=0,rough=0,bunker=0,green=0,ob=0;
  data.forEach(function(s){
    if(s.type==='fairway') fairway++;
    else if(s.type==='rough') rough++;
    else if(s.type==='bunker') bunker++;
    else if(s.type==='green') green++;
    else if(s.type==='ob') ob++;
  });
  var total = data.length || 1;
  html += '<div class="v18-divider"></div>';
  html += '<div class="v18-stat-row"><span>&#x1F7E2; Fairway</span><strong>' + fairway + ' (' + Math.round(fairway/total*100) + '%)</strong></div>';
  html += '<div class="v18-stat-row"><span>&#x1F7E1; Rough</span><strong>' + rough + ' (' + Math.round(rough/total*100) + '%)</strong></div>';
  html += '<div class="v18-stat-row"><span>&#x1F7E4; Bunker</span><strong>' + bunker + '</strong></div>';
  html += '<div class="v18-stat-row"><span>&#x1F7E2; Green</span><strong>' + green + '</strong></div>';
  html += '<div class="v18-stat-row"><span>&#x1F534; OB</span><strong>' + ob + '</strong></div>';
  html += '<div style="margin-top:12px"><button class="v18-btn v18-btn-sm v18-btn-secondary" onclick="v18ClearShots()">&#x1F5D1; Reset Shots</button></div>';
  html += '</div>';
  container.innerHTML = html;
  setTimeout(function(){ v18DrawHeatmap(data); }, 100);
}

window.v18AddShot = function(type){
  var data = getShotData();
  var cx = 250 + (Math.random()-0.5)*300;
  var cy = 170 + (Math.random()-0.5)*240;
  if(type==='fairway'){ cx = 250 + (Math.random()-0.5)*80; cy = 170 + (Math.random()-0.5)*200; }
  else if(type==='rough'){ cx = 250 + (Math.random()>0.5?1:-1)*(60+Math.random()*80); }
  else if(type==='bunker'){ cx = 250 + (Math.random()-0.5)*120; cy = 260 + Math.random()*50; }
  else if(type==='green'){ cx = 250 + (Math.random()-0.5)*60; cy = 50 + Math.random()*60; }
  else if(type==='ob'){ cx = 250 + (Math.random()>0.5?1:-1)*(120+Math.random()*60); }
  data.push({type:type,x:Math.round(cx),y:Math.round(cy),ts:Date.now()});
  saveShotData(data);
  v18Sfx.heatmap();
  v18DrawHeatmap(data);
  v18CheckAchievements();
  if(typeof showToast==='function') showToast(type.toUpperCase()+' shot recorded','success');
};

window.v18ClearShots = function(){
  localStorage.removeItem(SHOT_DATA_KEY);
  v18DrawHeatmap([]);
  if(typeof showToast==='function') showToast('Shot data cleared','info');
};

function v18DrawHeatmap(data){
  var c = document.getElementById('v18HeatCanvas');
  if(!c) return;
  var ctx = c.getContext('2d');
  ctx.clearRect(0,0,500,340);
  // draw course outline
  ctx.fillStyle='#2e7d32'; ctx.fillRect(0,0,500,340);
  // fairway
  ctx.fillStyle='#4caf50'; ctx.beginPath();
  ctx.moveTo(200,340); ctx.lineTo(180,200); ctx.lineTo(210,40); ctx.lineTo(290,40); ctx.lineTo(320,200); ctx.lineTo(300,340);
  ctx.closePath(); ctx.fill();
  // green
  ctx.fillStyle='#66bb6a'; ctx.beginPath();
  ctx.ellipse(250,50,50,35,0,0,Math.PI*2); ctx.fill();
  // bunkers
  ctx.fillStyle='#e8c872';
  ctx.beginPath(); ctx.ellipse(310,80,18,10,0.3,0,Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.ellipse(210,270,15,8,-0.2,0,Math.PI*2); ctx.fill();
  // tee box
  ctx.fillStyle='#388e3c'; ctx.fillRect(235,310,30,20);
  // flag
  ctx.strokeStyle='#fff'; ctx.lineWidth=2; ctx.beginPath(); ctx.moveTo(250,50); ctx.lineTo(250,20); ctx.stroke();
  ctx.fillStyle='#f44336'; ctx.beginPath(); ctx.moveTo(250,20); ctx.lineTo(265,27); ctx.lineTo(250,34); ctx.fill();
  // labels
  ctx.fillStyle='rgba(255,255,255,0.7)'; ctx.font='bold 10px sans-serif'; ctx.textAlign='center';
  ctx.fillText('TEE',250,325); ctx.fillText('GREEN',250,55);
  ctx.fillText('FAIRWAY',250,190);
  // draw shots
  data.forEach(function(s){
    var colors = {fairway:'#00e676',rough:'#ffd600',bunker:'#ff9800',green:'#00bcd4',ob:'#f44336'};
    ctx.beginPath();
    ctx.arc(s.x,s.y,5,0,Math.PI*2);
    ctx.fillStyle = colors[s.type]||'#fff';
    ctx.globalAlpha=0.8;
    ctx.fill();
    ctx.globalAlpha=0.4;
    ctx.beginPath();
    ctx.arc(s.x,s.y,12,0,Math.PI*2);
    ctx.fill();
    ctx.globalAlpha=1;
  });
}

// ========== 2. Golf Etiquette Master (30 rules) ==========
var ETIQUETTE_RULES = [
  {cat:'Tee Box',title:'Tee 순서 지키기',detail:'Honor system: 이전 홀에서 가장 좋은 스코어를 기록한 플레이어가 먼저 티샷합니다. 첫 홀은 핸디캡 순서 또는 가위바위보로 결정.'},
  {cat:'Tee Box',title:'티잉 구역 내 서기',detail:'티 마커 앞으로 나가지 마세요. 티 마커 뒤로 2클럽 길이까지가 티잉 구역입니다.'},
  {cat:'Tee Box',title:'다른 사람 스윙 중 정숙',detail:'동반자가 어드레스에 들어가면 움직이거나 말하지 마세요. 그림자가 비치지 않도록 위치에 주의합니다.'},
  {cat:'Tee Box',title:'디봇 수리',detail:'티샷으로 생긴 디봇(잔디 조각)은 반드시 제자리에 놓고 발로 밟아 고정하세요.'},
  {cat:'Tee Box',title:'준비된 플레이어 우선 (Ready Golf)',detail:'캐주얼 라운드에서는 준비된 사람이 먼저 치는 Ready Golf를 권장합니다. 플레이 속도 향상에 도움.'},
  {cat:'Fairway',title:'앞 팀 안전거리 확인',detail:'앞 팀이 충분히 멀어진 후 샷하세요. 드라이버 기준 최소 250야드 이상 안전거리 확보.'},
  {cat:'Fairway',title:'Fore! 외치기',detail:'공이 다른 플레이어 방향으로 날아가면 즉시 크게 &quot;Fore!&quot;를 외쳐 위험을 알리세요.'},
  {cat:'Fairway',title:'디봇 모래 채우기',detail:'아이언 샷으로 생긴 디봇에 모래/종자 혼합물을 채워주세요. 코스 보호의 기본입니다.'},
  {cat:'Fairway',title:'카트 경로 준수',detail:'카트는 지정된 경로로만 이동하세요. 젖은 날에는 특히 그린 주변 진입을 삼가세요.'},
  {cat:'Fairway',title:'플레이 속도 유지',detail:'한 홀당 약 15분을 목표로 하세요. 공을 잃었으면 3분 이내에 탐색 후 프로비저널 볼을 드롭하세요.'},
  {cat:'Green',title:'그린 위 발자국 주의',detail:'스파이크 자국을 남기지 않도록 발을 끌지 마세요. 그린 위에서는 뛰지 않습니다.'},
  {cat:'Green',title:'볼 마크 수리',detail:'그린에 떨어진 공이 만든 볼 마크(피치마크)를 반드시 수리하세요. 그린포크 사용이 기본.'},
  {cat:'Green',title:'퍼팅 라인 밟지 않기',detail:'다른 플레이어의 퍼팅 라인 위를 걷지 마세요. 라인 옆으로 돌아가세요.'},
  {cat:'Green',title:'깃대(Pin) 관리',detail:'깃대를 뽑을 때 그린에 던지지 말고 부드럽게 내려놓으세요. 홀 가장자리를 손상시키지 않도록 주의.'},
  {cat:'Green',title:'퍼팅 순서',detail:'홀에서 가장 먼 플레이어가 먼저 퍼팅합니다. 이미 홀아웃한 플레이어는 깃대를 잡아주거나 조용히 기다립니다.'},
  {cat:'Bunker',title:'벙커 레이크 사용',detail:'벙커에서 탈출한 후 반드시 레이크로 발자국과 샷 자국을 정리하세요.'},
  {cat:'Bunker',title:'벙커 진입 방법',detail:'벙커의 가장 낮은 부분으로 진입하세요. 벽면으로 오르내리면 모래가 무너집니다.'},
  {cat:'Bunker',title:'레이크 위치',detail:'사용 후 레이크는 벙커 밖 가장자리를 따라 놓으세요. 핸들이 그린 방향을 향하지 않도록.'},
  {cat:'Club House',title:'드레스 코드 준수',detail:'각 골프장의 드레스 코드를 확인하세요. 일반적으로 카라 있는 셔츠, 골프화, 긴바지 또는 골프 반바지가 기본입니다.'},
  {cat:'Club House',title:'휴대폰 매너',detail:'라운드 중 휴대폰은 무음 또는 진동 모드로 설정하세요. 통화는 동반자와 떨어진 곳에서 짧게.'},
  {cat:'Club House',title:'식당 에티켓',detail:'라운드 후 식사 시 골프화를 갈아신으세요. 골프화 스파이크가 바닥을 손상시킬 수 있습니다.'},
  {cat:'General',title:'시간 엄수',detail:'티타임 최소 30분 전에 도착하세요. 늦으면 동반자와 뒤 팀 모두에게 폐가 됩니다.'},
  {cat:'General',title:'경기 기록 정확히',detail:'자신의 스코어를 정확하게 기록하세요. 골프는 신사의 스포츠, 정직함이 핵심입니다.'},
  {cat:'General',title:'자연환경 보호',detail:'쓰레기는 반드시 지정된 쓰레기통에 버리세요. 담배꽁초를 코스에 버리지 마세요.'},
  {cat:'General',title:'감정 절제',detail:'미스샷에 화내거나 클럽을 던지지 마세요. 동반자와 코스 모두에 대한 존중입니다.'},
  {cat:'General',title:'양보 매너',detail:'뒤 팀이 계속 기다리고 있다면, 먼저 플레이하도록 양보(pass through)하세요.'},
  {cat:'General',title:'캐디 존중',detail:'캐디에게 예의 바르게 대하세요. 코스 조언을 구하고, 라운드 후 팁을 잊지 마세요.'},
  {cat:'General',title:'안전 확인 습관',detail:'스윙 전 주변에 사람이 없는지 반드시 확인하세요. 연습 스윙도 마찬가지입니다.'},
  {cat:'General',title:'멀리건 남용 금지',detail:'멀리건(다시치기)은 친선 라운드에서만 홀당 1회 이내로. 공식 경기에서는 금지.'},
  {cat:'General',title:'라운드 후 인사',detail:'라운드 종료 후 동반자와 악수하며 감사 인사를 나누세요. 좋은 샷에 대한 칭찬도 잊지 마세요.'}
];

function renderEtiquette(container){
  var cats = ['All','Tee Box','Fairway','Green','Bunker','Club House','General'];
  var html = '<div class="v18-tabs" id="v18EtiqTabs">';
  cats.forEach(function(c,i){
    html += '<button class="v18-tab'+(i===0?' active':'')+'" data-cat="'+c+'" onclick="v18FilterEtiq(\''+c+'\')">'+c+' <span style="opacity:.6;font-size:10px">('+(c==='All'?ETIQUETTE_RULES.length:ETIQUETTE_RULES.filter(function(r){return r.cat===c;}).length)+')</span></button>';
  });
  html += '</div>';
  html += '<div id="v18EtiqList">';
  ETIQUETTE_RULES.forEach(function(r,i){
    html += '<div class="v18-etiquette-card" data-ecat="'+r.cat+'" onclick="v18ToggleEtiq(this)">';
    html += '<div class="v18-etiquette-cat">'+r.cat+'</div>';
    html += '<div class="v18-etiquette-title">'+r.title+'</div>';
    html += '<div class="v18-etiquette-detail">'+r.detail+'</div>';
    html += '</div>';
  });
  html += '</div>';
  container.innerHTML = html;
}

window.v18FilterEtiq = function(cat){
  v18Sfx.etiquette();
  document.querySelectorAll('#v18EtiqTabs .v18-tab').forEach(function(t){ t.classList.toggle('active', t.dataset.cat===cat); });
  document.querySelectorAll('#v18EtiqList .v18-etiquette-card').forEach(function(c){
    c.style.display = (cat==='All' || c.dataset.ecat===cat) ? '' : 'none';
  });
};

window.v18ToggleEtiq = function(el){
  el.classList.toggle('expanded');
};

// ========== 3. Pro Swing Library (10 pros) ==========
var PRO_SWINGS = [
  {name:'Tiger Woods',emoji:'&#x1F42F;',country:'USA',majors:15,style:'Power Fade',tip:'왼쪽을 겨냥하고 컨트롤된 페이드를 구사. 임팩트 시 왼쪽 무릎 회전이 핵심.',stat:'Avg Drive: 296yd'},
  {name:'Rory McIlroy',emoji:'&#x2618;',country:'NIR',majors:4,style:'High Draw',tip:'백스윙 탑에서 왼쪽 힙 회전으로 다운스윙 시작. 자연스러운 릴리스로 드로우 구사.',stat:'Avg Drive: 314yd'},
  {name:'Ben Hogan',emoji:'&#x1F3CC;',country:'USA',majors:9,style:'Controlled Fade',tip:'약한 그립에서 강한 몸통 회전. 시크릿: 왼쪽 손목의 supination 동작.',stat:'Avg GIR: 72%'},
  {name:'Jack Nicklaus',emoji:'&#x1F43B;',country:'USA',majors:18,style:'High Power',tip:'높은 티와 업라이트 스윙 플레인. 헤드업을 두려워하지 않는 독특한 피니시.',stat:'Majors: 18'},
  {name:'Seve Ballesteros',emoji:'&#x1F1EA;&#x1F1F8;',country:'ESP',majors:5,style:'Creative Shot',tip:'상상력 넘치는 숏게임. 다양한 탄도와 스핀으로 불가능한 샷을 가능하게.',stat:'European Tour: 50W'},
  {name:'Sam Snead',emoji:'&#x1F3A9;',country:'USA',majors:7,style:'Natural Swing',tip:'역사상 가장 아름다운 스윙. 유연성이 핵심, 힘을 빼고 리듬감 있는 템포 유지.',stat:'PGA Tour: 82W'},
  {name:'Bobby Jones',emoji:'&#x1F3C6;',country:'USA',majors:13,style:'Classic Form',tip:'그랜드슬램 달성 유일한 골퍼. 정확한 아이언 플레이와 안정적인 퍼팅.',stat:'Grand Slam: 1930'},
  {name:'Annika Sorenstam',emoji:'&#x1F451;',country:'SWE',majors:10,style:'Precision',tip:'비전54 철학: 모든 홀을 버디로. 정확한 거리 컨트롤과 일관된 스윙 플레인.',stat:'LPGA: 72W'},
  {name:'Tom Watson',emoji:'&#x1F3CC;',country:'USA',majors:8,style:'Links Golf',tip:'링크스 코스의 달인. 낮은 탄도의 스팅어 샷과 바람 속 컨트롤.',stat:'British Open: 5W'},
  {name:'Byron Nelson',emoji:'&#x26F3;',country:'USA',majors:5,style:'Modern Swing',tip:'현대 골프 스윙의 아버지. 다리와 힙 드라이브로 일관성 확보.',stat:'1945: 18 Consecutive W'}
];

function renderProSwings(container){
  var html = '';
  PRO_SWINGS.forEach(function(p){
    html += '<div class="v18-pro-card" onclick="v18Sfx.pro_swing()">';
    html += '<div class="v18-pro-avatar">'+p.emoji+'</div>';
    html += '<div class="v18-pro-info">';
    html += '<div class="v18-pro-name">'+p.name+' <span style="font-size:10px;color:var(--text-muted)">'+p.country+'</span></div>';
    html += '<div class="v18-pro-desc"><strong>Style:</strong> '+p.style+'<br>'+p.tip+'</div>';
    html += '<div class="v18-pro-stats">';
    html += '<span class="v18-pro-stat">&#x1F3C6; Majors: '+p.majors+'</span>';
    html += '<span class="v18-pro-stat">'+p.stat+'</span>';
    html += '</div></div></div>';
  });
  container.innerHTML = html;
}

// ========== 4. Club Distance Chart (14 clubs Canvas) ==========
var CLUB_DIST_KEY = 'sg_club_distances_v18';
var DEFAULT_CLUBS = [
  {name:'Driver',avg:230,color:'#e53935'},
  {name:'3W',avg:210,color:'#f44336'},
  {name:'5W',avg:195,color:'#e91e63'},
  {name:'3H',avg:185,color:'#9c27b0'},
  {name:'4I',avg:175,color:'#673ab7'},
  {name:'5I',avg:165,color:'#3f51b5'},
  {name:'6I',avg:155,color:'#2196f3'},
  {name:'7I',avg:145,color:'#03a9f4'},
  {name:'8I',avg:135,color:'#00bcd4'},
  {name:'9I',avg:125,color:'#009688'},
  {name:'PW',avg:115,color:'#4caf50'},
  {name:'GW',avg:100,color:'#8bc34a'},
  {name:'SW',avg:85,color:'#cddc39'},
  {name:'LW',avg:65,color:'#ffeb3b'}
];

function getClubDists(){ try{return JSON.parse(localStorage.getItem(CLUB_DIST_KEY))||DEFAULT_CLUBS;}catch(e){return DEFAULT_CLUBS;} }
function saveClubDists(d){ localStorage.setItem(CLUB_DIST_KEY,JSON.stringify(d)); }

function renderClubDistChart(container){
  var clubs = getClubDists();
  var maxDist = 0;
  clubs.forEach(function(c){ if(c.avg>maxDist) maxDist=c.avg; });
  var html = '<div class="v18-card"><h4><span class="v18i">&#x1F4CA;</span> Club Distance Chart</h4>';
  html += '<p>클럽별 평균 비거리를 시각화합니다. 숫자를 클릭하면 거리를 수정할 수 있습니다.</p>';
  clubs.forEach(function(c,i){
    var pct = Math.round(c.avg/maxDist*100);
    html += '<div class="v18-club-bar">';
    html += '<span class="club-name">'+c.name+'</span>';
    html += '<div class="bar-track"><div class="bar-fill" style="width:'+pct+'%;background:'+c.color+'"><span class="bar-label">'+c.avg+'yd</span></div></div>';
    html += '<span class="dist-label"><input type="number" class="v18-input" style="width:65px;padding:4px 6px;font-size:11px;text-align:center" value="'+c.avg+'" min="0" max="400" data-cidx="'+i+'" onchange="v18UpdateClubDist(this)"> yd</span>';
    html += '</div>';
  });
  html += '<div style="margin-top:12px;text-align:center">';
  html += '<button class="v18-btn v18-btn-sm v18-btn-secondary" onclick="v18ResetClubDists()">&#x1F504; Reset to Default</button>';
  html += '</div></div>';
  container.innerHTML = html;
}

window.v18UpdateClubDist = function(el){
  var clubs = getClubDists();
  var idx = parseInt(el.dataset.cidx);
  clubs[idx].avg = parseInt(el.value)||0;
  saveClubDists(clubs);
  v18Sfx.club_dist();
  v18CheckAchievements();
};

window.v18ResetClubDists = function(){
  localStorage.removeItem(CLUB_DIST_KEY);
  if(typeof showToast==='function') showToast('Club distances reset','info');
};

// ========== 5. Round Timeline ==========
var TIMELINE_KEY = 'sg_round_timeline_v18';
function getTimelines(){ try{return JSON.parse(localStorage.getItem(TIMELINE_KEY))||[];}catch(e){return [];} }
function saveTimelines(d){ localStorage.setItem(TIMELINE_KEY,JSON.stringify(d.slice(-20))); }

function renderTimeline(container){
  var rounds = getTimelines();
  var html = '<div class="v18-card"><h4><span class="v18i">&#x23F1;</span> Round Timeline</h4>';
  html += '<p>라운드의 샷별 타임라인을 기록하세요. 홀별로 상세한 플레이 기록을 관리합니다.</p>';
  html += '<div style="margin-bottom:14px">';
  html += '<button class="v18-btn v18-btn-primary" onclick="v18NewTimeline()">&#x2795; New Round</button>';
  html += '</div>';
  if(rounds.length===0){
    html += '<p style="text-align:center;color:var(--text-muted);padding:20px">아직 기록된 라운드가 없습니다. &quot;New Round&quot;를 눌러 시작하세요.</p>';
  } else {
    rounds.slice().reverse().forEach(function(r,ri){
      html += '<div style="margin-bottom:16px;padding-bottom:16px;border-bottom:1px solid var(--border)">';
      html += '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px">';
      html += '<strong>'+r.course+' - '+r.date+'</strong>';
      html += '<span class="v18-badge" style="background:var(--primary-light);color:var(--primary)">'+r.holes.length+' holes</span>';
      html += '</div>';
      r.holes.forEach(function(h){
        var scoreColor = h.score<=h.par-1?'#2e7d32':h.score===h.par?'var(--primary)':h.score===h.par+1?'#f57c00':'#e53935';
        var scoreName = h.score<=h.par-2?'Eagle':h.score===h.par-1?'Birdie':h.score===h.par?'Par':h.score===h.par+1?'Bogey':h.score===h.par+2?'Double':'Triple+';
        html += '<div class="v18-timeline-item">';
        html += '<div class="v18-timeline-dot" style="background:'+scoreColor+'"></div>';
        html += '<div class="v18-timeline-content">';
        html += '<div style="display:flex;justify-content:space-between;align-items:center">';
        html += '<strong>Hole '+h.num+' (Par '+h.par+')</strong>';
        html += '<span style="font-weight:800;color:'+scoreColor+'">'+h.score+' ('+scoreName+')</span>';
        html += '</div>';
        if(h.note) html += '<div style="font-size:11px;color:var(--text-muted);margin-top:4px">'+h.note+'</div>';
        html += '</div></div>';
      });
      html += '</div>';
    });
  }
  html += '</div>';
  container.innerHTML = html;
}

window.v18NewTimeline = function(){
  v18Sfx.timeline();
  var courseName = prompt('Course name (e.g., Pine Valley GC):');
  if(!courseName) return;
  var numHoles = parseInt(prompt('How many holes? (9 or 18):'))||9;
  var holes = [];
  for(var i=1;i<=numHoles;i++){
    var par = [4,4,3,5,4,3,4,5,4,4,4,3,5,4,3,4,5,4][(i-1)%18];
    var score = par + Math.floor(Math.random()*3) - (Math.random()>0.7?1:0);
    if(score<1) score=1;
    holes.push({num:i,par:par,score:score,note:''});
  }
  var rounds = getTimelines();
  rounds.push({course:courseName,date:new Date().toISOString().slice(0,10),holes:holes});
  saveTimelines(rounds);
  v18CheckAchievements();
  if(typeof showToast==='function') showToast(courseName+' round recorded!','success');
  v18OpenMain('timeline');
};

// ========== 6. Golf Stretching Guide (12 exercises) ==========
var STRETCHES = [
  {name:'Neck Rotation',emoji:'&#x1F9D8;',cat:'Warmup',dur:'30s',desc:'머리를 천천히 좌우로 돌려 목 근육을 풀어줍니다. 각 방향 5회.'},
  {name:'Shoulder Circles',emoji:'&#x1F4AA;',cat:'Warmup',dur:'30s',desc:'양팔을 옆으로 들고 큰 원을 그리며 어깨 관절을 워밍업합니다.'},
  {name:'Trunk Rotation',emoji:'&#x1F500;',cat:'Warmup',dur:'45s',desc:'클럽을 어깨에 걸치고 상체를 좌우로 회전. 스윙 범위를 넓혀줍니다.'},
  {name:'Hip Circles',emoji:'&#x1F6B6;',cat:'Warmup',dur:'30s',desc:'양손을 허리에 놓고 엉덩이로 큰 원을 그립니다. 힙 유연성이 스윙 파워의 핵심.'},
  {name:'Hamstring Stretch',emoji:'&#x1F9B5;',cat:'Warmup',dur:'30s',desc:'한쪽 발을 앞으로 뻗고 상체를 숙여 뒷허벅지를 늘려줍니다. 각 15초.'},
  {name:'Wrist Flexor Stretch',emoji:'&#x270B;',cat:'Warmup',dur:'20s',desc:'팔을 앞으로 뻗고 반대 손으로 손가락을 뒤로 당겨 전완근을 스트레칭.'},
  {name:'Club Behind Back',emoji:'&#x1F3CC;',cat:'Pre-Shot',dur:'30s',desc:'클럽을 등 뒤에서 양손으로 잡고 좌우 회전. 코어와 어깨를 동시에 활성화.'},
  {name:'Standing Side Bend',emoji:'&#x21A9;',cat:'Pre-Shot',dur:'20s',desc:'클럽을 머리 위로 들고 좌우로 기울여 옆구리를 늘립니다. 스윙 평면 개선.'},
  {name:'Walking Lunges',emoji:'&#x1F6B6;',cat:'Pre-Shot',dur:'45s',desc:'큰 보폭으로 런지를 하며 전진. 하체 안정성과 밸런스를 향상시킵니다.'},
  {name:'Cat-Cow Stretch',emoji:'&#x1F408;',cat:'Cooldown',dur:'45s',desc:'네 발로 엎드려 등을 둥글게/오목하게 반복. 라운드 후 척추 이완에 효과적.'},
  {name:'Forearm Roller',emoji:'&#x1F4AA;',cat:'Cooldown',dur:'30s',desc:'주먹을 쥐었다 펴며 전완근 피로를 풀어줍니다. 그립 지구력 회복.'},
  {name:'Child\'s Pose',emoji:'&#x1F9D8;',cat:'Cooldown',dur:'60s',desc:'무릎 꿇고 상체를 앞으로 숙여 등과 어깨를 이완. 라운드 마무리의 필수 스트레칭.'}
];

function renderStretching(container){
  var cats = ['All','Warmup','Pre-Shot','Cooldown'];
  var html = '<div class="v18-tabs" id="v18StretchTabs">';
  cats.forEach(function(c,i){
    html += '<button class="v18-tab'+(i===0?' active':'')+'" data-scat="'+c+'" onclick="v18FilterStretch(\''+c+'\')">'+c+' ('+
      (c==='All'?STRETCHES.length:STRETCHES.filter(function(s){return s.cat===c;}).length)+')</button>';
  });
  html += '</div>';
  html += '<div id="v18StretchList">';
  STRETCHES.forEach(function(s){
    html += '<div class="v18-stretch-card" data-scat="'+s.cat+'" onclick="v18Sfx.stretch()">';
    html += '<div class="v18-stretch-icon" style="background:var(--primary-light)">'+s.emoji+'</div>';
    html += '<div class="v18-stretch-info">';
    html += '<div class="v18-stretch-name">'+s.name+' <span class="v18-badge" style="background:var(--primary-light);color:var(--primary);font-size:9px;padding:2px 8px">'+s.cat+'</span></div>';
    html += '<div class="v18-stretch-desc">'+s.desc+'</div>';
    html += '<div class="v18-stretch-dur">&#x23F1; '+s.dur+'</div>';
    html += '</div></div>';
  });
  html += '</div>';
  container.innerHTML = html;
}

window.v18FilterStretch = function(cat){
  v18Sfx.stretch();
  document.querySelectorAll('#v18StretchTabs .v18-tab').forEach(function(t){ t.classList.toggle('active',t.dataset.scat===cat); });
  document.querySelectorAll('#v18StretchList .v18-stretch-card').forEach(function(c){
    c.style.display = (cat==='All' || c.dataset.scat===cat) ? '' : 'none';
  });
};

// ========== 7. Social Feed ==========
var FEED_KEY = 'sg_social_feed_v18';
function getFeed(){ try{return JSON.parse(localStorage.getItem(FEED_KEY))||getDefaultFeed();}catch(e){return getDefaultFeed();} }
function saveFeed(d){ localStorage.setItem(FEED_KEY,JSON.stringify(d.slice(-50))); }
function getDefaultFeed(){
  return [
    {id:1,user:'GolfPro Kim',avatar:'K',time:'2h ago',body:'Pine Valley GC 에서 이글 달성! 7번 홀 Par5 세컨드샷이 핀 옆 2미터에 안착. 최고의 라운드!',likes:24,liked:false,comments:5},
    {id:2,user:'Birdie Hunter',avatar:'B',time:'5h ago',body:'드라이버 비거리 280yd 돌파! 3개월간 스트레칭과 체력 훈련의 결과. 코어 근력이 확실히 차이를 만든다.',likes:18,liked:false,comments:3},
    {id:3,user:'Green Master',avatar:'G',time:'8h ago',body:'오늘 퍼팅 연습 50개 완료. 1.5m 안쪽 성공률 92%. 눈 위치와 스트로크 일관성에 집중.',likes:12,liked:false,comments:2},
    {id:4,user:'Weekend Golfer',avatar:'W',time:'1d ago',body:'첫 80타 진입! 82로 마무리했는데 정말 감격스럽다. 숏게임 연습이 핵심이었어요.',likes:35,liked:false,comments:8},
    {id:5,user:'Iron Man Lee',avatar:'L',time:'1d ago',body:'새 아이언 세트로 교체 후 첫 라운드. 6I 비거리가 10yd 늘었다. 샤프트 피팅의 중요성을 실감.',likes:9,liked:false,comments:1}
  ];
}

function renderFeed(container){
  var feed = getFeed();
  var html = '<div style="margin-bottom:14px">';
  html += '<div class="v18-card" style="padding:14px">';
  html += '<textarea id="v18FeedInput" class="v18-input" placeholder="Share your golf story..." style="min-height:60px;resize:vertical;font-family:inherit;margin-bottom:8px"></textarea>';
  html += '<button class="v18-btn v18-btn-primary v18-btn-sm" onclick="v18PostFeed()">&#x1F4E4; Post</button>';
  html += '</div></div>';
  feed.slice().reverse().forEach(function(f){
    html += '<div class="v18-feed-item">';
    html += '<div class="v18-feed-header">';
    html += '<div class="v18-feed-avatar">'+f.avatar+'</div>';
    html += '<div><div class="v18-feed-name">'+f.user+'</div><div class="v18-feed-time">'+f.time+'</div></div>';
    html += '</div>';
    html += '<div class="v18-feed-body">'+f.body+'</div>';
    html += '<div class="v18-feed-actions">';
    html += '<button class="v18-feed-action'+(f.liked?' liked':'')+'" onclick="v18LikeFeed('+f.id+',this)">&#x2764; '+f.likes+'</button>';
    html += '<button class="v18-feed-action">&#x1F4AC; '+f.comments+'</button>';
    html += '<button class="v18-feed-action" onclick="v18ShareFeedItem('+f.id+')">&#x1F517; Share</button>';
    html += '</div></div>';
  });
  container.innerHTML = html;
}

window.v18PostFeed = function(){
  var input = document.getElementById('v18FeedInput');
  if(!input || !input.value.trim()) return;
  var feed = getFeed();
  feed.push({
    id: Date.now(),
    user: 'You',
    avatar: 'Y',
    time: 'Just now',
    body: input.value.trim().replace(/</g,'&lt;').replace(/>/g,'&gt;'),
    likes: 0,
    liked: false,
    comments: 0
  });
  saveFeed(feed);
  input.value = '';
  v18Sfx.feed_post();
  v18CheckAchievements();
  if(typeof showToast==='function') showToast('Posted!','success');
  v18OpenMain('feed');
};

window.v18LikeFeed = function(id,el){
  var feed = getFeed();
  feed.forEach(function(f){
    if(f.id===id){ f.liked=!f.liked; f.likes += f.liked?1:-1; }
  });
  saveFeed(feed);
  v18Sfx.feed_like();
  el.classList.toggle('liked');
  el.innerHTML = '&#x2764; ' + feed.find(function(f){return f.id===id;}).likes;
};

window.v18ShareFeedItem = function(id){
  if(typeof showToast==='function') showToast('Link copied!','success');
};

// ========== 8. Course Condition Report ==========
var CONDITION_KEY = 'sg_course_condition_v18';
function getConditions(){ try{return JSON.parse(localStorage.getItem(CONDITION_KEY))||[];}catch(e){return [];} }
function saveConditions(d){ localStorage.setItem(CONDITION_KEY,JSON.stringify(d.slice(-30))); }

function renderConditionReport(container){
  var reports = getConditions();
  var html = '<div class="v18-card"><h4><span class="v18i">&#x1F4CB;</span> Course Condition Report</h4>';
  html += '<p>방문한 골프장의 코스 컨디션을 기록하고 공유하세요.</p>';
  html += '<div style="margin-bottom:14px">';
  html += '<input id="v18CondCourse" class="v18-input" placeholder="Golf course name" style="margin-bottom:8px">';
  html += '<div class="v18-condition-grid" style="margin-bottom:12px">';
  var metrics = [
    {key:'green',label:'Green Speed',icon:'&#x1F7E2;',options:['Slow','Medium','Fast','Very Fast']},
    {key:'fairway',label:'Fairway',icon:'&#x1F33F;',options:['Poor','Fair','Good','Excellent']},
    {key:'bunker',label:'Bunker Sand',icon:'&#x1F3DD;',options:['Hard','Firm','Soft','Fluffy']},
    {key:'rough',label:'Rough',icon:'&#x1F33E;',options:['Light','Medium','Thick','Very Thick']},
    {key:'cart_path',label:'Cart Path',icon:'&#x1F6D2;',options:['Poor','Fair','Good','Excellent']},
    {key:'overall',label:'Overall',icon:'&#x2B50;',options:['1/5','2/5','3/5','4/5','5/5']}
  ];
  metrics.forEach(function(m){
    html += '<div class="v18-condition-item">';
    html += '<div class="v18-condition-icon">'+m.icon+'</div>';
    html += '<div class="v18-condition-label">'+m.label+'</div>';
    html += '<select id="v18Cond_'+m.key+'" class="v18-select" style="width:100%;font-size:11px">';
    m.options.forEach(function(o,i){ html += '<option value="'+i+'">'+o+'</option>'; });
    html += '</select></div>';
  });
  html += '</div>';
  html += '<button class="v18-btn v18-btn-primary v18-btn-sm" onclick="v18SaveCondition()">&#x1F4BE; Save Report</button>';
  html += '</div>';
  html += '<div class="v18-divider"></div>';
  html += '<h4 style="margin-bottom:10px">Recent Reports</h4>';
  if(reports.length===0){
    html += '<p style="text-align:center;color:var(--text-muted);padding:16px">No reports yet.</p>';
  }
  reports.slice().reverse().forEach(function(r){
    html += '<div style="padding:12px;background:var(--bg);border-radius:12px;margin-bottom:8px;border:1px solid var(--border)">';
    html += '<div style="display:flex;justify-content:space-between"><strong>'+r.course+'</strong><span style="font-size:10px;color:var(--text-muted)">'+r.date+'</span></div>';
    html += '<div style="display:flex;gap:6px;margin-top:6px;flex-wrap:wrap">';
    html += '<span class="v18-badge" style="background:#e8f5e9;color:#2e7d32">Green: '+['Slow','Medium','Fast','Very Fast'][r.green]+'</span>';
    html += '<span class="v18-badge" style="background:#e3f2fd;color:#1565c0">Fairway: '+['Poor','Fair','Good','Excellent'][r.fairway]+'</span>';
    html += '<span class="v18-badge" style="background:#fff3e0;color:#e65100">Overall: '+['1/5','2/5','3/5','4/5','5/5'][r.overall]+'</span>';
    html += '</div></div>';
  });
  html += '</div>';
  container.innerHTML = html;
}

window.v18SaveCondition = function(){
  var course = document.getElementById('v18CondCourse');
  if(!course || !course.value.trim()) { if(typeof showToast==='function') showToast('Enter course name','warning'); return; }
  var report = {
    course: course.value.trim(),
    date: new Date().toISOString().slice(0,10),
    green: parseInt(document.getElementById('v18Cond_green').value),
    fairway: parseInt(document.getElementById('v18Cond_fairway').value),
    bunker: parseInt(document.getElementById('v18Cond_bunker').value),
    rough: parseInt(document.getElementById('v18Cond_rough').value),
    cart_path: parseInt(document.getElementById('v18Cond_cart_path').value),
    overall: parseInt(document.getElementById('v18Cond_overall').value)
  };
  var reports = getConditions();
  reports.push(report);
  saveConditions(reports);
  v18Sfx.condition();
  v18CheckAchievements();
  if(typeof showToast==='function') showToast(report.course+' condition saved!','success');
  v18OpenMain('condition');
};

// ========== 9. Mental Coaching Program ==========
var MENTAL_STEPS = [
  {title:'Pre-Shot Breathing',emoji:'&#x1F4A8;',desc:'티샷 전 4-7-8 호흡법: 4초 들이쉬고, 7초 유지, 8초 내쉬기. 3회 반복하면 심박수 안정화.'},
  {title:'Visualization',emoji:'&#x1F441;',desc:'샷을 치기 전 이상적인 탄도, 착지점, 구르는 모습을 머릿속에 그리세요. 프로들은 매 샷 전 실행.'},
  {title:'Process Focus',emoji:'&#x1F3AF;',desc:'결과가 아닌 과정에 집중하세요. &quot;잘 쳐야지&quot;가 아니라 &quot;왼쪽 어깨로 치자&quot;처럼 구체적 동작에 집중.'},
  {title:'Acceptance Mindset',emoji:'&#x1F9D8;',desc:'미스샷을 받아들이세요. 프로도 GIR 70% 미만. 다음 샷에 집중하는 것이 핵심 스킬.'},
  {title:'10-Second Rule',emoji:'&#x23F1;',desc:'나쁜 샷 후 10초간만 감정을 느끼세요. 10초가 지나면 완전히 리셋. 타이거 우즈의 멘탈 루틴.'},
  {title:'Positive Self-Talk',emoji:'&#x1F4AC;',desc:'&quot;OB 치면 안 돼&quot;가 아닌 &quot;페어웨이 중앙으로 보내자&quot;. 긍정적 명령으로 뇌에 올바른 신호를.'},
  {title:'Routine Consistency',emoji:'&#x1F504;',desc:'매 샷 동일한 프리샷 루틴을 실행하세요. 일관된 루틴이 일관된 결과를 만듭니다.'},
  {title:'Pressure as Excitement',emoji:'&#x26A1;',desc:'긴장감을 불안이 아닌 흥분으로 재정의하세요. &quot;I\'m nervous&quot; 대신 &quot;I\'m excited&quot;.'},
  {title:'Hole-by-Hole Reset',emoji:'&#x1F6B9;',desc:'매 홀을 새 게임으로 생각하세요. 이전 홀의 트리플 보기가 다음 홀에 영향을 주면 안 됩니다.'},
  {title:'Post-Round Reflection',emoji:'&#x1F4DD;',desc:'라운드 후 3가지만 기록: 잘한 것 1가지, 개선할 것 1가지, 감사한 것 1가지.'}
];

var MENTAL_PROGRESS_KEY = 'sg_mental_progress_v18';
function getMentalProgress(){ try{return JSON.parse(localStorage.getItem(MENTAL_PROGRESS_KEY))||{};}catch(e){return {};} }
function saveMentalProgress(d){ localStorage.setItem(MENTAL_PROGRESS_KEY,JSON.stringify(d)); }

function renderMentalCoaching(container){
  var progress = getMentalProgress();
  var completed = Object.keys(progress).filter(function(k){return progress[k];}).length;
  var html = '<div class="v18-card"><h4><span class="v18i">&#x1F9E0;</span> Mental Coaching Program</h4>';
  html += '<p>10단계 골프 멘탈 코칭 프로그램. 각 단계를 학습하고 체크하면 진행률이 올라갑니다.</p>';
  html += '<div class="v18-progress"><div class="v18-progress-fill" style="width:'+Math.round(completed/MENTAL_STEPS.length*100)+'%;background:linear-gradient(90deg,var(--primary),#66bb6a)"></div></div>';
  html += '<div style="text-align:center;font-size:12px;color:var(--text-muted);margin-bottom:14px">'+completed+'/'+MENTAL_STEPS.length+' completed</div></div>';
  MENTAL_STEPS.forEach(function(s,i){
    var done = progress[i];
    html += '<div class="v18-mental-step'+(done?' active':'')+'">';
    html += '<h5>'+s.emoji+' Step '+(i+1)+': '+s.title+'</h5>';
    html += '<p>'+s.desc+'</p>';
    html += '<button class="v18-btn v18-btn-sm '+(done?'v18-btn-primary':'v18-btn-secondary')+'" style="margin-top:8px" onclick="v18ToggleMental('+i+',this)">';
    html += done ? '&#x2705; Completed' : '&#x2B55; Mark as Done';
    html += '</button></div>';
  });
  container.innerHTML = html;
}

window.v18ToggleMental = function(idx,el){
  var progress = getMentalProgress();
  progress[idx] = !progress[idx];
  saveMentalProgress(progress);
  v18Sfx.mental();
  v18CheckAchievements();
  v18OpenMain('mental');
};

// ========== 10. Golf Quiz v3 (15 questions) ==========
var QUIZ_V3 = [
  {q:'골프에서 &quot;스팅어(Stinger)&quot; 샷은 어떤 특징의 샷인가요?',a:['높은 탄도의 페이드','극도로 낮은 탄도의 관통 샷','백스핀이 강한 로브 샷','사이드 스핀이 강한 훅'],c:1,exp:'스팅어는 타이거 우즈의 시그니처 샷으로, 바람이 강한 날 낮은 탄도로 정확도를 높이는 샷입니다.'},
  {q:'PGA 투어에서 &quot;FedEx Cup&quot;은 무엇인가요?',a:['4대 메이저 합산 순위','시즌 종합 포인트 레이스','유럽-미국 대항전','아마추어 국제대회'],c:1,exp:'FedEx Cup은 PGA 투어의 시즌 종합 포인트 경쟁으로, 시즌 마지막 플레이오프에서 최종 우승자를 결정합니다.'},
  {q:'&quot;Links&quot; 코스의 특징이 아닌 것은?',a:['해변가에 위치','나무가 거의 없음','인공 연못이 많음','바람이 강함'],c:2,exp:'링크스 코스는 해안가의 자연 지형으로, 나무가 적고 바람이 강한 것이 특징. 인공 연못은 파크랜드 코스의 특징입니다.'},
  {q:'골프 클럽의 &quot;로프트 각도&quot;가 커지면?',a:['비거리 증가, 탄도 낮아짐','비거리 감소, 탄도 높아짐','스핀 감소, 롤 증가','비거리 증가, 스핀 감소'],c:1,exp:'로프트 각도가 커지면 공이 더 높이 뜨고 비거리는 줄어듭니다. PW(46도)보다 7I(33도)가 더 멀리 갑니다.'},
  {q:'&quot;핸디캡 인덱스&quot; 계산에 사용되는 라운드 수는?',a:['최근 5라운드','최근 10라운드 중 상위 5개','최근 20라운드 중 상위 8개','최근 20라운드 전체 평균'],c:2,exp:'WHS 기준 핸디캡 인덱스는 최근 20라운드 중 가장 좋은 8개의 스코어 디퍼런셜 평균으로 계산합니다.'},
  {q:'라이더컵(Ryder Cup)의 대진 구성은?',a:['미국 vs 일본','미국 vs 유럽','미국 vs 아시아','유럽 vs 아시아'],c:1,exp:'라이더컵은 1927년 시작된 미국 vs 유럽 대항전으로, 2년마다 개최됩니다.'},
  {q:'&quot;Course Rating&quot;과 &quot;Slope Rating&quot;의 차이는?',a:['둘 다 프로 기준 난이도','CR은 스크래치 골퍼 기준, SR은 보기 골퍼 기준 난이도','CR은 그린 속도, SR은 페어웨이 폭','CR은 길이, SR은 장애물 수'],c:1,exp:'Course Rating은 스크래치 골퍼(핸디캡 0)의 예상 스코어, Slope Rating은 보기 골퍼 대비 상대적 난이도입니다.'},
  {q:'골프공의 딤플(Dimple)은 왜 있나요?',a:['브랜드 디자인','공기 저항을 줄여 비거리 증가','손에 잡기 쉽게','소리를 좋게 하려고'],c:1,exp:'딤플은 공 주위 경계층을 터뷸런트로 만들어 공기 저항을 줄이고 양력을 증가시켜 비거리를 약 2배 늘립니다.'},
  {q:'&quot;Stimp Meter&quot;로 측정하는 것은?',a:['바람의 세기','드라이버 헤드 속도','그린 속도','코스 전체 난이도'],c:2,exp:'Stimp Meter는 경사면에서 공을 굴려 그린의 속도를 측정합니다. PGA 투어 기준 약 11-13피트.'},
  {q:'&quot;Dormie&quot;는 매치 플레이에서 어떤 상황인가요?',a:['타이 상태','남은 홀 수만큼 앞서는 상태','올 스퀘어로 끝난 경기','연장전 진입'],c:1,exp:'Dormie는 리드하는 홀 수와 남은 홀 수가 같은 상태입니다. 예: 3홀 남기고 3업.'},
  {q:'&quot;Shaft Flex&quot;에서 &quot;S&quot;는?',a:['Soft','Stiff','Standard','Slim'],c:1,exp:'S = Stiff. 헤드스피드가 빠른 골퍼(95-105mph)에게 적합. L(Ladies)/A(Amateur)/R(Regular)/S(Stiff)/X(Extra Stiff).'},
  {q:'PGA 투어 역대 최다 우승 기록 보유자는?',a:['Jack Nicklaus','Tiger Woods','Sam Snead','Ben Hogan'],c:2,exp:'Sam Snead가 PGA 투어 82승으로 역대 최다 우승 기록을 보유하고 있습니다 (Tiger Woods는 82승으로 타이).'},
  {q:'그린에서 &quot;Break&quot;를 읽을 때 가장 중요한 요소는?',a:['잔디 종류만','경사와 잔디결(Grain) 방향','바람의 세기','공의 브랜드'],c:1,exp:'Break 읽기에서 가장 중요한 것은 경사의 방향과 정도, 그리고 잔디결(grain) 방향입니다.'},
  {q:'&quot;Up and Down&quot;이란?',a:['버디와 보기 번갈아 치기','그린 주변에서 1번에 올리고 1퍼팅으로 홀아웃','스코어카드 제출','전반 후반 비교'],c:1,exp:'Up and Down은 그린을 놓친 후 어프로치(Up) 1번 + 퍼팅(Down) 1번으로 파 세이브하는 것입니다.'},
  {q:'골프에서 &quot;Albatross&quot;는 몇 타를 의미하나요?',a:['파보다 1타 적음','파보다 2타 적음','파보다 3타 적음','홀인원'],c:2,exp:'Albatross(Double Eagle)는 파보다 3타 적은 것으로, Par5 홀에서 2온 1퍼팅(=2타) 등으로 달성합니다.'}
];

var QUIZ_V3_KEY = 'sg_quiz_v3_scores';
function getQuizV3Scores(){ try{return JSON.parse(localStorage.getItem(QUIZ_V3_KEY))||[];}catch(e){return [];} }

function renderQuizV3(container){
  var scores = getQuizV3Scores();
  var html = '<div class="v18-card"><h4><span class="v18i">&#x1F9E0;</span> Golf Knowledge Quiz v3</h4>';
  html += '<p>15문항 프로급 골프 지식 퀴즈. 규칙, 장비, 역사, 전략을 모두 테스트합니다.</p>';
  if(scores.length>0){
    var best = Math.max.apply(null,scores);
    html += '<div class="v18-stat-row"><span>Best Score</span><strong>'+best+'/'+QUIZ_V3.length+'</strong></div>';
    html += '<div class="v18-stat-row"><span>Attempts</span><strong>'+scores.length+'</strong></div>';
  }
  html += '<button class="v18-btn v18-btn-primary" style="margin-top:12px" onclick="v18StartQuizV3()">&#x1F3AE; Start Quiz</button>';
  html += '</div>';
  container.innerHTML = html;
}

var v18QuizState = {idx:0, score:0, answers:[]};

window.v18StartQuizV3 = function(){
  v18QuizState = {idx:0, score:0, answers:[]};
  v18RenderQuizQuestion();
};

function v18RenderQuizQuestion(){
  var ov = document.getElementById('v18MainOverlay');
  if(!ov) return;
  var body = ov.querySelector('.v18-modal');
  if(!body) return;
  if(v18QuizState.idx >= QUIZ_V3.length){
    var scores = getQuizV3Scores();
    scores.push(v18QuizState.score);
    localStorage.setItem(QUIZ_V3_KEY,JSON.stringify(scores.slice(-20)));
    var pct = Math.round(v18QuizState.score/QUIZ_V3.length*100);
    var grade = pct>=90?'S':pct>=80?'A':pct>=70?'B':pct>=60?'C':'D';
    var gradeColor = grade==='S'?'#ffd700':grade==='A'?'#4caf50':grade==='B'?'#2196f3':grade==='C'?'#ff9800':'#e53935';
    var html = '<div class="v18-hdr"><h2><span class="v18i">&#x1F3C6;</span> Quiz Result</h2><button class="v18-x" onclick="v18CloseMain()">&times;</button></div>';
    html += '<div style="text-align:center;padding:20px">';
    html += '<div style="font-size:64px;font-weight:900;color:'+gradeColor+'">'+grade+'</div>';
    html += '<div style="font-size:24px;font-weight:800;margin:8px 0">'+v18QuizState.score+' / '+QUIZ_V3.length+'</div>';
    html += '<div style="font-size:14px;color:var(--text-muted)">'+pct+'% correct</div>';
    html += '<div class="v18-progress" style="margin:16px auto;max-width:300px"><div class="v18-progress-fill" style="width:'+pct+'%;background:'+gradeColor+'"></div></div>';
    html += '<button class="v18-btn v18-btn-primary" style="margin-top:12px" onclick="v18StartQuizV3()">&#x1F504; Retry</button> ';
    html += '<button class="v18-btn v18-btn-secondary" style="margin-top:12px" onclick="v18OpenMain(\'quiz\')">&#x2B05; Back</button>';
    html += '</div>';
    body.innerHTML = html;
    v18Sfx.achieve();
    v18CheckAchievements();
    return;
  }
  var q = QUIZ_V3[v18QuizState.idx];
  var html = '<div class="v18-hdr"><h2><span class="v18i">&#x1F4DD;</span> Q'+(v18QuizState.idx+1)+'/'+QUIZ_V3.length+'</h2><button class="v18-x" onclick="v18CloseMain()">&times;</button></div>';
  html += '<div class="v18-progress"><div class="v18-progress-fill" style="width:'+Math.round((v18QuizState.idx)/QUIZ_V3.length*100)+'%;background:var(--primary)"></div></div>';
  html += '<div class="v18-card"><h4>'+q.q+'</h4>';
  q.a.forEach(function(a,i){
    html += '<button class="v18-btn v18-btn-secondary" style="width:100%;margin-bottom:8px;text-align:left;justify-content:flex-start" onclick="v18AnswerQuizV3('+i+')">'+String.fromCharCode(65+i)+'. '+a+'</button>';
  });
  html += '</div>';
  body.innerHTML = html;
}

window.v18AnswerQuizV3 = function(idx){
  var q = QUIZ_V3[v18QuizState.idx];
  if(idx === q.c){ v18QuizState.score++; v18Sfx.quiz(); }
  v18QuizState.answers.push(idx);
  v18QuizState.idx++;
  v18RenderQuizQuestion();
};

// ========== Achievement System (12 new) ==========
var V18_ACHIEVE_KEY = 'sg_achieve_v18';
function getV18Achievements(){ try{return JSON.parse(localStorage.getItem(V18_ACHIEVE_KEY))||{};}catch(e){return {};} }
function saveV18Achievements(d){ localStorage.setItem(V18_ACHIEVE_KEY,JSON.stringify(d)); }

var V18_ACHIEVEMENTS = [
  {id:'shot_tracker',name:'Shot Tracker',desc:'Record your first shot on the heatmap',icon:'&#x1F3AF;',check:function(){return getShotData().length>=1;}},
  {id:'shot_50',name:'50 Shots Recorded',desc:'Record 50 shots on the heatmap',icon:'&#x1F4CA;',check:function(){return getShotData().length>=50;}},
  {id:'fairway_finder',name:'Fairway Finder',desc:'Record 20 fairway hits',icon:'&#x1F7E2;',check:function(){return getShotData().filter(function(s){return s.type==='fairway';}).length>=20;}},
  {id:'etiquette_reader',name:'Etiquette Master',desc:'Open the etiquette guide',icon:'&#x1F3A9;',check:function(){return true;}},
  {id:'pro_fan',name:'Pro Swing Fan',desc:'Open the pro swing library',icon:'&#x1F3CC;',check:function(){return true;}},
  {id:'club_setup',name:'Club Distance Setup',desc:'Customize your club distances',icon:'&#x1F4CF;',check:function(){try{return !!localStorage.getItem(CLUB_DIST_KEY);}catch(e){return false;}}},
  {id:'round_recorder',name:'Round Recorder',desc:'Record your first round timeline',icon:'&#x23F1;',check:function(){return getTimelines().length>=1;}},
  {id:'five_rounds',name:'5 Rounds Logged',desc:'Record 5 round timelines',icon:'&#x1F4C5;',check:function(){return getTimelines().length>=5;}},
  {id:'stretcher',name:'Warm Up Pro',desc:'Open the stretching guide',icon:'&#x1F9D8;',check:function(){return true;}},
  {id:'social_poster',name:'Social Poster',desc:'Post your first feed entry',icon:'&#x1F4E4;',check:function(){return getFeed().some(function(f){return f.user==='You';});}},
  {id:'condition_reporter',name:'Course Reporter',desc:'Submit a course condition report',icon:'&#x1F4CB;',check:function(){return getConditions().length>=1;}},
  {id:'mental_master',name:'Mental Master',desc:'Complete all 10 mental coaching steps',icon:'&#x1F9E0;',check:function(){var p=getMentalProgress();return Object.keys(p).filter(function(k){return p[k];}).length>=10;}}
];

function v18CheckAchievements(){
  var achieved = getV18Achievements();
  var newlyUnlocked = [];
  V18_ACHIEVEMENTS.forEach(function(a){
    if(!achieved[a.id] && a.check()){
      achieved[a.id] = Date.now();
      newlyUnlocked.push(a);
    }
  });
  if(newlyUnlocked.length>0){
    saveV18Achievements(achieved);
    newlyUnlocked.forEach(function(a){
      v18Sfx.achieve();
      if(typeof showToast==='function') showToast('Achievement: '+a.name+'!','success');
    });
  }
}

function renderAchievements(container){
  var achieved = getV18Achievements();
  var total = V18_ACHIEVEMENTS.length;
  var unlocked = Object.keys(achieved).length;
  var html = '<div class="v18-card"><h4><span class="v18i">&#x1F3C5;</span> v18 Achievements</h4>';
  html += '<div class="v18-progress"><div class="v18-progress-fill" style="width:'+Math.round(unlocked/total*100)+'%;background:linear-gradient(90deg,#ffd700,#ff9800)"></div></div>';
  html += '<div style="text-align:center;font-size:12px;color:var(--text-muted);margin-bottom:14px">'+unlocked+'/'+total+' unlocked</div></div>';
  V18_ACHIEVEMENTS.forEach(function(a){
    var done = achieved[a.id];
    html += '<div class="v18-card" style="opacity:'+(done?'1':'.5')+';border-left:4px solid '+(done?'#4caf50':'var(--border)')+'">';
    html += '<h4>'+a.icon+' '+a.name+(done?' &#x2705;':'')+'</h4>';
    html += '<p>'+a.desc+'</p>';
    if(done) html += '<div style="font-size:10px;color:var(--text-muted);margin-top:4px">Unlocked: '+new Date(done).toLocaleDateString()+'</div>';
    html += '</div>';
  });
  container.innerHTML = html;
}

// ========== Main Overlay Controller ==========
function createV18Overlay(){
  var ov = document.createElement('div');
  ov.className = 'v18-overlay';
  ov.id = 'v18MainOverlay';
  ov.innerHTML = '<div class="v18-modal" id="v18ModalBody"></div>';
  ov.addEventListener('click',function(e){ if(e.target===ov) v18CloseMain(); });
  document.body.appendChild(ov);
  return ov;
}

var V18_SECTIONS = [
  {key:'heatmap',label:'Shot Heatmap',icon:'&#x1F3AF;',render:renderShotHeatmap},
  {key:'etiquette',label:'Etiquette 30',icon:'&#x1F3A9;',render:renderEtiquette},
  {key:'pro',label:'Pro Swings',icon:'&#x1F3CC;',render:renderProSwings},
  {key:'clubdist',label:'Club Distance',icon:'&#x1F4CA;',render:renderClubDistChart},
  {key:'timeline',label:'Round Timeline',icon:'&#x23F1;',render:renderTimeline},
  {key:'stretch',label:'Stretching',icon:'&#x1F9D8;',render:renderStretching},
  {key:'feed',label:'Social Feed',icon:'&#x1F4AC;',render:renderFeed},
  {key:'condition',label:'Course Condition',icon:'&#x1F4CB;',render:renderConditionReport},
  {key:'mental',label:'Mental Coach',icon:'&#x1F9E0;',render:renderMentalCoaching},
  {key:'quiz',label:'Quiz v3',icon:'&#x1F4DD;',render:renderQuizV3},
  {key:'achieve',label:'Achievements',icon:'&#x1F3C5;',render:renderAchievements}
];

window.v18OpenMain = function(sectionKey){
  var ov = document.getElementById('v18MainOverlay') || createV18Overlay();
  var body = document.getElementById('v18ModalBody');
  var html = '<div class="v18-hdr"><h2><span class="v18i">&#x26F3;</span> SmartGolf v18</h2><button class="v18-x" onclick="v18CloseMain()">&times;</button></div>';
  html += '<div class="v18-tabs">';
  V18_SECTIONS.forEach(function(s){
    html += '<button class="v18-tab'+(s.key===sectionKey?' active':'')+'" onclick="v18OpenMain(\''+s.key+'\')">'+s.icon+' '+s.label+'</button>';
  });
  html += '</div>';
  html += '<div id="v18Content"></div>';
  body.innerHTML = html;
  ov.classList.add('active');
  var contentDiv = document.getElementById('v18Content');
  var section = V18_SECTIONS.find(function(s){return s.key===sectionKey;});
  if(section){
    section.render(contentDiv);
    if(sectionKey==='etiquette') v18CheckAchievementDirect('etiquette_reader');
    if(sectionKey==='pro') v18CheckAchievementDirect('pro_fan');
    if(sectionKey==='stretch') v18CheckAchievementDirect('stretcher');
  }
};

function v18CheckAchievementDirect(id){
  var achieved = getV18Achievements();
  if(!achieved[id]){
    achieved[id] = Date.now();
    saveV18Achievements(achieved);
    v18Sfx.achieve();
    var a = V18_ACHIEVEMENTS.find(function(x){return x.id===id;});
    if(a && typeof showToast==='function') showToast('Achievement: '+a.name+'!','success');
  }
}

window.v18CloseMain = function(){
  var ov = document.getElementById('v18MainOverlay');
  if(ov) ov.classList.remove('active');
};

// ========== Menu Buttons ==========
function injectV18Buttons(){
  var target = document.querySelector('.results-header') || document.querySelector('.search-section');
  if(!target) return;
  var bar = document.createElement('div');
  bar.style.cssText = 'display:flex;gap:6px;flex-wrap:wrap;padding:8px 0;';
  var mainBtns = [
    {key:'heatmap',label:'Shot Map',icon:'&#x1F3AF;'},
    {key:'etiquette',label:'Etiquette',icon:'&#x1F3A9;'},
    {key:'pro',label:'Pro Swings',icon:'&#x1F3CC;'},
    {key:'clubdist',label:'Club Dist',icon:'&#x1F4CA;'},
    {key:'timeline',label:'Timeline',icon:'&#x23F1;'},
    {key:'stretch',label:'Stretch',icon:'&#x1F9D8;'},
    {key:'feed',label:'Feed',icon:'&#x1F4AC;'},
    {key:'condition',label:'Condition',icon:'&#x1F4CB;'},
    {key:'mental',label:'Mental',icon:'&#x1F9E0;'},
    {key:'quiz',label:'Quiz v3',icon:'&#x1F4DD;'}
  ];
  mainBtns.forEach(function(b){
    var btn = document.createElement('button');
    btn.className = 'v18-btn v18-btn-sm v18-btn-secondary';
    btn.innerHTML = b.icon+' '+b.label;
    btn.onclick = function(){ v18OpenMain(b.key); };
    bar.appendChild(btn);
  });
  target.parentNode.insertBefore(bar,target.nextSibling);
}

// ========== Keyboard Shortcuts ==========
document.addEventListener('keydown',function(e){
  var t = e.target.tagName;
  if(t==='INPUT'||t==='TEXTAREA'||t==='SELECT') return;
  if(e.shiftKey && e.key==='H'){ v18OpenMain('heatmap'); }
  if(e.shiftKey && e.key==='E'){ v18OpenMain('etiquette'); }
  if(e.shiftKey && e.key==='P'){ v18OpenMain('pro'); }
  if(e.shiftKey && e.key==='D'){ v18OpenMain('clubdist'); }
  if(e.shiftKey && e.key==='T'){ v18OpenMain('timeline'); }
  if(e.shiftKey && e.key==='W'){ v18OpenMain('stretch'); }
  if(e.shiftKey && e.key==='L'){ v18OpenMain('feed'); }
  if(e.shiftKey && e.key==='C'){ v18OpenMain('condition'); }
  if(e.shiftKey && e.key==='M'){ v18OpenMain('mental'); }
  if(e.shiftKey && e.key==='Q'){ v18OpenMain('quiz'); }
});

// ========== Init ==========
if(document.readyState==='loading'){
  document.addEventListener('DOMContentLoaded',function(){ setTimeout(injectV18Buttons,800); });
} else {
  setTimeout(injectV18Buttons,800);
}

})();
