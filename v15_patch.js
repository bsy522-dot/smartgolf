(function(){
'use strict';

// === SmartGolf v15.0 Patch ===
// 1. 클럽별 샷 통계 대시보드 (14클럽 거리/방향/빈도 추적)
// 2. 코스 레이팅 & 슬로프 계산기 (USGA 정밀 핸디캡)
// 3. 라운드 파트너 관리 (동반자 기록/통계)
// 4. 날씨 기반 라운드 추천 (5일 예보 시뮬레이션)
// 5. 그린 리딩 가이드 (Canvas 퍼팅라인 시각화)
// 6. 컨디션 & 피로도 트래커 (체력/수면/스트레스)
// 7. 골프 규칙 퀴즈 20문 (R&A/USGA 규칙)
// 8. 샷 플래너 (Canvas 코스전략 시각화)
// 9. 연습 루틴 빌더 (6종 프리셋 + 커스텀)
// 10. 라운드 공유 카드 (Canvas 600x380 + PNG 다운로드)

var css15 = document.createElement('style');
css15.textContent = [
'.v15-overlay{position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,.82);z-index:10040;display:none;align-items:center;justify-content:center;backdrop-filter:blur(14px)}',
'.v15-overlay.active{display:flex}',
'.v15-modal{background:var(--card-bg,#fff);border-radius:24px;padding:28px;width:95%;max-width:760px;max-height:92vh;overflow-y:auto;box-shadow:0 32px 100px rgba(0,0,0,.55);animation:v15Rise .4s cubic-bezier(.22,1,.36,1)}',
'@keyframes v15Rise{from{opacity:0;transform:translateY(40px) scale(.94)}to{opacity:1;transform:translateY(0) scale(1)}}',
'.v15-hdr{display:flex;justify-content:space-between;align-items:center;margin-bottom:18px}',
'.v15-hdr h2{font-size:21px;font-weight:800;display:flex;align-items:center;gap:10px}',
'.v15-hdr h2 .v15i{font-size:26px}',
'.v15-x{background:none;border:none;font-size:26px;cursor:pointer;color:var(--text-muted);padding:4px 10px;border-radius:10px;transition:.2s}',
'.v15-x:hover{background:var(--border);color:var(--text)}',
'.v15-tabs{display:flex;gap:6px;margin-bottom:16px;overflow-x:auto;padding-bottom:4px;scrollbar-width:none}',
'.v15-tabs::-webkit-scrollbar{display:none}',
'.v15-tab{padding:9px 18px;border-radius:24px;border:1.5px solid var(--border);background:var(--bg);font-size:12px;font-weight:700;cursor:pointer;white-space:nowrap;transition:.25s}',
'.v15-tab.active{background:var(--primary);color:#fff;border-color:var(--primary);box-shadow:0 3px 12px rgba(26,122,58,.35)}',
'.v15-card{background:var(--bg);border-radius:16px;padding:18px;margin-bottom:12px;transition:.25s;border:1.5px solid transparent}',
'.v15-card:hover{border-color:var(--primary);transform:translateY(-2px);box-shadow:0 4px 16px rgba(26,122,58,.12)}',
'.v15-card h4{font-size:15px;font-weight:700;margin-bottom:8px;display:flex;align-items:center;gap:8px}',
'.v15-card p{font-size:12px;color:var(--text-muted);line-height:1.7}',
'.v15-btn{padding:11px 22px;border:none;border-radius:14px;font-size:13px;font-weight:700;cursor:pointer;transition:.25s;display:inline-flex;align-items:center;gap:6px}',
'.v15-btn-primary{background:linear-gradient(135deg,var(--primary),#34a853);color:#fff}',
'.v15-btn-primary:hover{transform:translateY(-2px);box-shadow:0 8px 20px rgba(26,122,58,.4)}',
'.v15-btn-sm{padding:7px 14px;font-size:11px;border-radius:10px}',
'.v15-btn-secondary{background:var(--bg);color:var(--text);border:1.5px solid var(--border)}',
'.v15-btn-secondary:hover{border-color:var(--primary);color:var(--primary)}',
'.v15-btn-danger{background:#ff4444;color:#fff}',
'.v15-btn-danger:hover{background:#cc0000}',
'.v15-input{width:100%;padding:11px 16px;border:2px solid var(--border);border-radius:12px;font-size:13px;background:var(--bg);color:var(--text);transition:.2s}',
'.v15-input:focus{border-color:var(--primary);outline:none;box-shadow:0 0 0 3px rgba(26,122,58,.1)}',
'.v15-textarea{width:100%;padding:11px 16px;border:2px solid var(--border);border-radius:12px;font-size:13px;background:var(--bg);color:var(--text);min-height:80px;resize:vertical;font-family:inherit}',
'.v15-textarea:focus{border-color:var(--primary);outline:none}',
'.v15-select{padding:9px 14px;border:2px solid var(--border);border-radius:10px;font-size:13px;background:var(--bg);color:var(--text)}',
'.v15-grid2{display:grid;grid-template-columns:1fr 1fr;gap:12px}',
'.v15-grid3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px}',
'.v15-grid4{display:grid;grid-template-columns:repeat(4,1fr);gap:10px}',
'@media(max-width:500px){.v15-grid2,.v15-grid3,.v15-grid4{grid-template-columns:1fr}}',
'.v15-divider{height:1px;background:var(--border);margin:16px 0}',
'.v15-badge{display:inline-block;padding:4px 12px;border-radius:14px;font-size:11px;font-weight:700}',
'.v15-progress{width:100%;height:10px;background:var(--border);border-radius:5px;overflow:hidden;margin:8px 0}',
'.v15-progress-fill{height:100%;border-radius:5px;transition:width .6s ease}',
'.v15-stat-row{display:flex;justify-content:space-between;align-items:center;padding:12px 0;border-bottom:1px solid var(--border)}',
'.v15-stat-row:last-child{border-bottom:none}',
'.v15-stat-card{text-align:center;padding:16px;background:var(--bg);border-radius:14px;border:1.5px solid var(--border)}',
'.v15-stat-card .val{font-size:24px;font-weight:900;color:var(--primary)}',
'.v15-stat-card .lbl{font-size:10px;color:var(--text-muted);margin-top:4px}',
'.v15-canvas-wrap{width:100%;border-radius:16px;overflow:hidden;margin-bottom:14px}',
'.v15-canvas-wrap canvas{width:100%;display:block}',
'.v15-chip{display:inline-flex;align-items:center;gap:4px;padding:6px 14px;border-radius:20px;font-size:11px;font-weight:700;cursor:pointer;transition:.2s;border:1.5px solid var(--border);background:var(--bg)}',
'.v15-chip.active{background:var(--primary);color:#fff;border-color:var(--primary)}',
'.v15-chip:hover{border-color:var(--primary)}',
'.v15-weather-card{padding:16px;border-radius:16px;text-align:center;border:1.5px solid var(--border);background:var(--bg);transition:.25s}',
'.v15-weather-card.recommended{border-color:var(--primary);background:var(--primary-light)}',
'.v15-weather-icon{font-size:36px;margin-bottom:6px}',
'.v15-green-canvas{width:100%;height:320px;border-radius:16px;background:radial-gradient(ellipse at center,#3a8c3f,#2d6a30);cursor:crosshair;touch-action:none}',
'.v15-routine-item{display:flex;align-items:center;gap:12px;padding:14px;background:var(--bg);border-radius:14px;margin-bottom:8px;border-left:4px solid var(--primary)}',
'.v15-routine-item .check{width:24px;height:24px;border-radius:50%;border:2.5px solid var(--primary);cursor:pointer;display:flex;align-items:center;justify-content:center;transition:.2s;flex-shrink:0}',
'.v15-routine-item .check.done{background:var(--primary);color:#fff}',
'.v15-partner-avatar{width:44px;height:44px;border-radius:50%;background:linear-gradient(135deg,var(--primary),#34a853);display:flex;align-items:center;justify-content:center;color:#fff;font-weight:800;font-size:16px;flex-shrink:0}',
'.v15-quiz-option{padding:14px 18px;border:2px solid var(--border);border-radius:14px;cursor:pointer;transition:.25s;font-size:13px;margin-bottom:8px}',
'.v15-quiz-option:hover{border-color:var(--primary);background:var(--primary-light)}',
'.v15-quiz-option.correct{border-color:#4caf50;background:#e8f5e9;color:#2e7d32}',
'.v15-quiz-option.wrong{border-color:#f44336;background:#ffebee;color:#c62828}',
'.v15-share-canvas{width:100%;max-width:600px;margin:0 auto;border-radius:16px;display:block}'
].join('\n');
document.head.appendChild(css15);

// === SFX Engine ===
var v15Ctx;
function v15SFX(type){
  try{
    if(!v15Ctx) v15Ctx=new(window.AudioContext||window.webkitAudioContext)();
    var o=v15Ctx.createOscillator(),g=v15Ctx.createGain();
    o.connect(g);g.connect(v15Ctx.destination);
    var now=v15Ctx.currentTime;
    var presets={
      club_stat:{f:660,t:'sine',d:.12,v:.15},
      rating:{f:523,t:'triangle',d:.15,v:.14},
      partner:{f:784,t:'sine',d:.1,v:.13},
      weather:{f:440,t:'triangle',d:.2,v:.12},
      green:{f:880,t:'sine',d:.08,v:.14},
      condition:{f:392,t:'sine',d:.15,v:.13},
      quiz_correct:{f:988,t:'sine',d:.18,v:.16},
      quiz_wrong:{f:220,t:'sawtooth',d:.25,v:.1},
      planner:{f:698,t:'triangle',d:.12,v:.13},
      routine:{f:587,t:'sine',d:.14,v:.14},
      share:{f:1047,t:'sine',d:.15,v:.15},
      achieve:{f:1175,t:'sine',d:.2,v:.16}
    };
    var p=presets[type]||presets.club_stat;
    o.type=p.t;o.frequency.setValueAtTime(p.f,now);
    g.gain.setValueAtTime(p.v,now);g.gain.exponentialRampToValueAtTime(0.001,now+p.d);
    o.start(now);o.stop(now+p.d);
  }catch(e){}
}

// === 1. Club Shot Statistics Dashboard ===
function v15ClubStats(){
  var ov=document.createElement('div');ov.className='v15-overlay';ov.id='v15ClubStatsOverlay';
  var clubs=[
    {id:'driver',name:'드라이버',icon:'&#x1F3CC;',avgDist:230,maxDist:260},
    {id:'w3',name:'3번 우드',icon:'&#x1F3CC;',avgDist:210,maxDist:235},
    {id:'w5',name:'5번 우드',icon:'&#x1F3CC;',avgDist:195,maxDist:220},
    {id:'u3',name:'3번 유틸',icon:'&#x1F3CC;',avgDist:190,maxDist:215},
    {id:'u5',name:'5번 유틸',icon:'&#x1F3CC;',avgDist:180,maxDist:200},
    {id:'i5',name:'5번 아이언',icon:'&#x26F3;',avgDist:170,maxDist:190},
    {id:'i6',name:'6번 아이언',icon:'&#x26F3;',avgDist:160,maxDist:178},
    {id:'i7',name:'7번 아이언',icon:'&#x26F3;',avgDist:150,maxDist:168},
    {id:'i8',name:'8번 아이언',icon:'&#x26F3;',avgDist:140,maxDist:155},
    {id:'i9',name:'9번 아이언',icon:'&#x26F3;',avgDist:130,maxDist:145},
    {id:'pw',name:'PW',icon:'&#x26F3;',avgDist:120,maxDist:135},
    {id:'aw',name:'AW (52)',icon:'&#x26F3;',avgDist:100,maxDist:115},
    {id:'sw',name:'SW (56)',icon:'&#x26F3;',avgDist:80,maxDist:95},
    {id:'putter',name:'퍼터',icon:'&#x1F3AF;',avgDist:10,maxDist:20}
  ];
  var saved=JSON.parse(localStorage.getItem('v15_club_stats')||'{}');
  var selClub=clubs[0].id;
  function render(){
    var data=saved[selClub]||{shots:[],notes:''};
    var shots=data.shots||[];
    var avg=shots.length?Math.round(shots.reduce(function(a,b){return a+b.dist},0)/shots.length):0;
    var maxD=shots.length?Math.max.apply(null,shots.map(function(s){return s.dist})):0;
    var cl=clubs.find(function(c){return c.id===selClub});
    var leftC=0,rightC=0,straightC=0;
    shots.forEach(function(s){if(s.dir==='left')leftC++;else if(s.dir==='right')rightC++;else straightC++});
    ov.innerHTML='<div class="v15-modal"><div class="v15-hdr"><h2><span class="v15i">&#x1F4CA;</span> &#xD074;&#xB7FD;&#xBCC4; &#xC0F7; &#xD1B5;&#xACC4;</h2><button class="v15-x" onclick="document.getElementById(\'v15ClubStatsOverlay\').classList.remove(\'active\')">&times;</button></div>'
      +'<div class="v15-tabs" id="v15ClubTabs">'+clubs.map(function(c){
        return '<div class="v15-tab'+(c.id===selClub?' active':'')+'" data-club="'+c.id+'">'+c.name+'</div>';
      }).join('')+'</div>'
      +'<div class="v15-grid4" style="margin-bottom:16px">'
      +'<div class="v15-stat-card"><div class="val">'+shots.length+'</div><div class="lbl">&#xCD1D; &#xC0F7;</div></div>'
      +'<div class="v15-stat-card"><div class="val">'+avg+'m</div><div class="lbl">&#xD3C9;&#xADE0; &#xBE44;&#xAC70;&#xB9AC;</div></div>'
      +'<div class="v15-stat-card"><div class="val">'+maxD+'m</div><div class="lbl">&#xCD5C;&#xB300; &#xBE44;&#xAC70;&#xB9AC;</div></div>'
      +'<div class="v15-stat-card"><div class="val">'+straightC+'</div><div class="lbl">&#xC2A4;&#xD2B8;&#xB808;&#xC774;&#xD2B8;</div></div>'
      +'</div>'
      +'<div class="v15-canvas-wrap"><canvas id="v15ClubChart" width="700" height="200"></canvas></div>'
      +'<div class="v15-divider"></div>'
      +'<h4 style="margin-bottom:12px">&#x2795; &#xC0F7; &#xAE30;&#xB85D; &#xCD94;&#xAC00;</h4>'
      +'<div class="v15-grid3" style="margin-bottom:12px">'
      +'<div><label style="font-size:11px;font-weight:700;color:var(--text-muted)">&#xBE44;&#xAC70;&#xB9AC; (m)</label><input type="number" class="v15-input" id="v15ShotDist" placeholder="'+cl.avgDist+'" min="1" max="400"></div>'
      +'<div><label style="font-size:11px;font-weight:700;color:var(--text-muted)">&#xBC29;&#xD5A5;</label><select class="v15-select" id="v15ShotDir" style="width:100%"><option value="straight">&#xC2A4;&#xD2B8;&#xB808;&#xC774;&#xD2B8;</option><option value="left">&#xD398;&#xC774;&#xB4DC;/&#xD6C5;</option><option value="right">&#xC2AC;&#xB77C;&#xC774;&#xC2A4;/&#xD478;&#xC2DC;</option></select></div>'
      +'<div style="display:flex;align-items:end"><button class="v15-btn v15-btn-primary" onclick="v15AddShot()" style="width:100%">&#xAE30;&#xB85D;</button></div>'
      +'</div>'
      +'<div style="display:flex;gap:8px;justify-content:space-between">'
      +'<span style="font-size:11px;color:var(--text-muted)">&#xD398;&#xC774;&#xB4DC;/&#xD6C5;: '+leftC+' | &#xC2A4;&#xD2B8;&#xB808;&#xC774;&#xD2B8;: '+straightC+' | &#xC2AC;&#xB77C;&#xC774;&#xC2A4;/&#xD478;&#xC2DC;: '+rightC+'</span>'
      +'<button class="v15-btn v15-btn-sm v15-btn-danger" onclick="v15ResetClub()">&#xCD08;&#xAE30;&#xD654;</button>'
      +'</div></div>';
    var tabs=ov.querySelectorAll('.v15-tab');
    tabs.forEach(function(tab){tab.addEventListener('click',function(){selClub=this.dataset.club;render();v15SFX('club_stat')})});
    drawClubChart(shots,cl);
  }
  function drawClubChart(shots,cl){
    var canvas=document.getElementById('v15ClubChart');if(!canvas)return;
    var ctx=canvas.getContext('2d');
    var W=canvas.width,H=canvas.height;
    ctx.clearRect(0,0,W,H);
    ctx.fillStyle=getComputedStyle(document.documentElement).getPropertyValue('--bg').trim()||'#f5f7f5';
    ctx.fillRect(0,0,W,H);
    if(!shots.length){
      ctx.fillStyle='#999';ctx.font='14px sans-serif';ctx.textAlign='center';
      ctx.fillText('샷 기록을 추가해보세요',W/2,H/2);return;
    }
    var maxVal=Math.max.apply(null,shots.map(function(s){return s.dist}))*1.1;
    var barW=Math.min(28,Math.floor((W-80)/shots.length)-4);
    var startX=50;
    ctx.strokeStyle='#ddd';ctx.lineWidth=1;ctx.font='10px sans-serif';ctx.fillStyle='#999';ctx.textAlign='right';
    for(var g=0;g<=4;g++){
      var yy=H-30-(g/4)*(H-50);
      ctx.beginPath();ctx.moveTo(45,yy);ctx.lineTo(W-10,yy);ctx.stroke();
      ctx.fillText(Math.round(maxVal*g/4)+'m',42,yy+4);
    }
    shots.slice(-20).forEach(function(s,i){
      var bh=(s.dist/maxVal)*(H-50);
      var x=startX+i*(barW+4);
      var grd=ctx.createLinearGradient(x,H-30-bh,x,H-30);
      if(s.dir==='straight'){grd.addColorStop(0,'#1a7a3a');grd.addColorStop(1,'#34a853')}
      else if(s.dir==='left'){grd.addColorStop(0,'#1565c0');grd.addColorStop(1,'#42a5f5')}
      else{grd.addColorStop(0,'#e65100');grd.addColorStop(1,'#ff9800')}
      ctx.fillStyle=grd;
      ctx.beginPath();ctx.roundRect(x,H-30-bh,barW,bh,4);ctx.fill();
      ctx.fillStyle='#666';ctx.font='9px sans-serif';ctx.textAlign='center';
      ctx.fillText(s.dist+'',x+barW/2,H-30-bh-4);
    });
  }
  window.v15AddShot=function(){
    var dist=parseInt(document.getElementById('v15ShotDist').value);
    var dir=document.getElementById('v15ShotDir').value;
    if(!dist||dist<1)return;
    if(!saved[selClub])saved[selClub]={shots:[],notes:''};
    saved[selClub].shots.push({dist:dist,dir:dir,date:new Date().toISOString().slice(0,10)});
    localStorage.setItem('v15_club_stats',JSON.stringify(saved));
    v15SFX('club_stat');render();
  };
  window.v15ResetClub=function(){
    if(!confirm('이 클럽의 모든 샷 기록을 초기화할까요?'))return;
    delete saved[selClub];localStorage.setItem('v15_club_stats',JSON.stringify(saved));render();
  };
  document.body.appendChild(ov);render();
}

// === 2. Course Rating & Slope Calculator ===
function v15CourseRating(){
  var ov=document.createElement('div');ov.className='v15-overlay';ov.id='v15RatingOverlay';
  var ratings=JSON.parse(localStorage.getItem('v15_course_ratings')||'[]');
  function calcHdcp(){
    if(ratings.length<5)return{hdcp:0,diff:[],msg:'최소 5라운드 필요'};
    var diffs=ratings.map(function(r){return r.adjScore-r.courseRating})
      .map(function(d){return Math.round(d*113/ratings[0].slope*10)/10});
    diffs.sort(function(a,b){return a-b});
    var useCount=Math.max(1,Math.floor(ratings.length*0.4));
    var best=diffs.slice(0,useCount);
    var avg=best.reduce(function(a,b){return a+b},0)/best.length;
    return{hdcp:Math.round(avg*10)/10,diff:diffs,msg:'USGA 핸디캡 인덱스'};
  }
  function render(){
    var hc=calcHdcp();
    ov.innerHTML='<div class="v15-modal"><div class="v15-hdr"><h2><span class="v15i">&#x1F4CF;</span> &#xCF54;&#xC2A4; &#xB808;&#xC774;&#xD305; &amp; &#xD578;&#xB514;&#xCEA1;</h2><button class="v15-x" onclick="document.getElementById(\'v15RatingOverlay\').classList.remove(\'active\')">&times;</button></div>'
      +'<div class="v15-grid3" style="margin-bottom:16px">'
      +'<div class="v15-stat-card"><div class="val">'+hc.hdcp+'</div><div class="lbl">'+hc.msg+'</div></div>'
      +'<div class="v15-stat-card"><div class="val">'+ratings.length+'</div><div class="lbl">&#xB4F1;&#xB85D; &#xB77C;&#xC6B4;&#xB4DC;</div></div>'
      +'<div class="v15-stat-card"><div class="val">'+(ratings.length?Math.round(ratings.reduce(function(a,r){return a+r.adjScore},0)/ratings.length):'&#x2014;')+'</div><div class="lbl">&#xD3C9;&#xADE0; &#xC2A4;&#xCF54;&#xC5B4;</div></div>'
      +'</div>'
      +'<div class="v15-divider"></div>'
      +'<h4 style="margin-bottom:12px">&#x2795; &#xB77C;&#xC6B4;&#xB4DC; &#xC2A4;&#xCF54;&#xC5B4; &#xC785;&#xB825;</h4>'
      +'<div class="v15-grid2" style="margin-bottom:8px">'
      +'<div><label style="font-size:11px;font-weight:700;color:var(--text-muted)">&#xCF54;&#xC2A4;&#xBA85;</label><input class="v15-input" id="v15RCourseName" placeholder="&#xC608;: &#xD30C;&#xC778;&#xD06C;&#xB9AC;&#xD06C;CC"></div>'
      +'<div><label style="font-size:11px;font-weight:700;color:var(--text-muted)">&#xC2A4;&#xCF54;&#xC5B4; (18&#xD640;)</label><input type="number" class="v15-input" id="v15RScore" placeholder="85" min="50" max="150"></div>'
      +'</div>'
      +'<div class="v15-grid3" style="margin-bottom:12px">'
      +'<div><label style="font-size:11px;font-weight:700;color:var(--text-muted)">&#xCF54;&#xC2A4;&#xB808;&#xC774;&#xD305;</label><input type="number" class="v15-input" id="v15RCR" placeholder="72.0" step="0.1" min="60" max="80"></div>'
      +'<div><label style="font-size:11px;font-weight:700;color:var(--text-muted)">&#xC2AC;&#xB85C;&#xD504;&#xB808;&#xC774;&#xD305;</label><input type="number" class="v15-input" id="v15RSR" placeholder="130" min="55" max="155"></div>'
      +'<div style="display:flex;align-items:end"><button class="v15-btn v15-btn-primary" onclick="v15AddRating()" style="width:100%">&#xB4F1;&#xB85D;</button></div>'
      +'</div>'
      +'<div style="max-height:200px;overflow-y:auto">'+ratings.slice().reverse().map(function(r,i){
        return '<div class="v15-stat-row"><span style="font-weight:700">'+r.name+'</span><span>'+r.adjScore+' (CR:'+r.courseRating+' / SR:'+r.slope+')</span></div>';
      }).join('')+'</div></div>';
  }
  window.v15AddRating=function(){
    var name=document.getElementById('v15RCourseName').value.trim();
    var score=parseFloat(document.getElementById('v15RScore').value);
    var cr=parseFloat(document.getElementById('v15RCR').value);
    var sr=parseFloat(document.getElementById('v15RSR').value);
    if(!name||!score||!cr||!sr)return;
    ratings.push({name:name,adjScore:score,courseRating:cr,slope:sr,date:new Date().toISOString().slice(0,10)});
    localStorage.setItem('v15_course_ratings',JSON.stringify(ratings));
    v15SFX('rating');render();
  };
  document.body.appendChild(ov);render();
}

// === 3. Round Partner Management ===
function v15Partners(){
  var ov=document.createElement('div');ov.className='v15-overlay';ov.id='v15PartnerOverlay';
  var partners=JSON.parse(localStorage.getItem('v15_partners')||'[]');
  function render(){
    ov.innerHTML='<div class="v15-modal"><div class="v15-hdr"><h2><span class="v15i">&#x1F91D;</span> &#xB77C;&#xC6B4;&#xB4DC; &#xD30C;&#xD2B8;&#xB108;</h2><button class="v15-x" onclick="document.getElementById(\'v15PartnerOverlay\').classList.remove(\'active\')">&times;</button></div>'
      +'<div class="v15-grid2" style="margin-bottom:12px">'
      +'<div><input class="v15-input" id="v15PName" placeholder="&#xD30C;&#xD2B8;&#xB108; &#xC774;&#xB984;"></div>'
      +'<div style="display:flex;gap:8px"><input class="v15-input" id="v15PHdcp" placeholder="&#xD578;&#xB514;&#xCEA1;" type="number" min="0" max="54" style="flex:1"><button class="v15-btn v15-btn-primary v15-btn-sm" onclick="v15AddPartner()">&#xCD94;&#xAC00;</button></div>'
      +'</div>'
      +(partners.length?partners.map(function(p,i){
        var initials=p.name.slice(0,2);
        return '<div class="v15-card" style="display:flex;align-items:center;gap:14px">'
          +'<div class="v15-partner-avatar">'+initials+'</div>'
          +'<div style="flex:1"><h4 style="margin:0">'+p.name+'</h4><p style="margin:0">&#xD578;&#xB514;&#xCEA1;: '+(p.hdcp||'&#x2014;')+' | &#xD568;&#xAED8;: '+p.rounds+'&#xD68C; | &#xCD5C;&#xADFC;: '+(p.lastDate||'&#x2014;')+'</p></div>'
          +'<button class="v15-btn v15-btn-sm v15-btn-secondary" onclick="v15PartnerRound('+i+')">&#x1F3CC; &#xB77C;&#xC6B4;&#xB4DC;</button>'
          +'<button class="v15-x" onclick="v15DelPartner('+i+')" style="font-size:18px">&times;</button>'
          +'</div>';
      }).join(''):'<div class="v15-card"><p style="text-align:center">&#xD568;&#xAED8; &#xB77C;&#xC6B4;&#xB4DC;&#xD558;&#xB294; &#xD30C;&#xD2B8;&#xB108;&#xB97C; &#xCD94;&#xAC00;&#xD574;&#xBCF4;&#xC138;&#xC694;</p></div>')
      +'</div>';
  }
  window.v15AddPartner=function(){
    var name=document.getElementById('v15PName').value.trim();
    if(!name)return;
    var hdcp=parseInt(document.getElementById('v15PHdcp').value)||0;
    partners.push({name:name,hdcp:hdcp,rounds:0,lastDate:null});
    localStorage.setItem('v15_partners',JSON.stringify(partners));
    v15SFX('partner');render();
  };
  window.v15PartnerRound=function(idx){
    partners[idx].rounds++;partners[idx].lastDate=new Date().toISOString().slice(0,10);
    localStorage.setItem('v15_partners',JSON.stringify(partners));v15SFX('partner');render();
  };
  window.v15DelPartner=function(idx){
    partners.splice(idx,1);localStorage.setItem('v15_partners',JSON.stringify(partners));render();
  };
  document.body.appendChild(ov);render();
}

// === 4. Weather-Based Round Recommendation ===
function v15Weather(){
  var ov=document.createElement('div');ov.className='v15-overlay';ov.id='v15WeatherOverlay';
  var forecasts=[
    {day:'오늘',icon:'&#x2600;&#xFE0F;',temp:24,wind:8,rain:0,uv:6,score:92},
    {day:'내일',icon:'&#x26C5;',temp:22,wind:12,rain:10,uv:4,score:78},
    {day:'모레',icon:'&#x1F327;&#xFE0F;',temp:18,wind:20,rain:80,uv:2,score:25},
    {day:'3일 후',icon:'&#x2600;&#xFE0F;',temp:26,wind:6,rain:0,uv:7,score:95},
    {day:'4일 후',icon:'&#x26C5;',temp:23,wind:10,rain:15,uv:5,score:80}
  ];
  var now=new Date();
  forecasts.forEach(function(f,i){
    var d=new Date(now);d.setDate(d.getDate()+i);
    f.dateStr=(d.getMonth()+1)+'/'+ d.getDate()+'('+ ['일','월','화','수','목','금','토'][d.getDay()]+')';
    f.temp=f.temp+Math.floor(Math.random()*5-2);
    f.wind=Math.max(0,f.wind+Math.floor(Math.random()*6-3));
    f.rain=Math.max(0,Math.min(100,f.rain+Math.floor(Math.random()*10-5)));
    f.score=Math.max(0,Math.min(100,f.score+Math.floor(Math.random()*8-4)));
  });
  function scoreColor(s){return s>=80?'#4caf50':s>=60?'#ff9800':'#f44336'}
  function render(){
    ov.innerHTML='<div class="v15-modal"><div class="v15-hdr"><h2><span class="v15i">&#x1F326;&#xFE0F;</span> &#xB0A0;&#xC528; &#xAE30;&#xBC18; &#xB77C;&#xC6B4;&#xB4DC; &#xCD94;&#xCC9C;</h2><button class="v15-x" onclick="document.getElementById(\'v15WeatherOverlay\').classList.remove(\'active\')">&times;</button></div>'
      +'<div class="v15-grid3" style="margin-bottom:16px">'+forecasts.slice(0,3).map(function(f){
        return '<div class="v15-weather-card'+(f.score>=80?' recommended':'')+'">'
          +'<div class="v15-weather-icon">'+f.icon+'</div>'
          +'<div style="font-weight:800;font-size:14px">'+f.day+'</div>'
          +'<div style="font-size:11px;color:var(--text-muted)">'+f.dateStr+'</div>'
          +'<div style="font-size:24px;font-weight:900;margin:8px 0">'+f.temp+'&#xB0;C</div>'
          +'<div style="font-size:11px">풍속 '+f.wind+'m/s | 강수 '+f.rain+'%</div>'
          +'<div style="margin-top:8px"><span class="v15-badge" style="background:'+scoreColor(f.score)+';color:#fff">라운드 적합도 '+f.score+'&#xC810;</span></div>'
          +(f.score>=80?'<div style="margin-top:6px;font-size:11px;color:var(--primary);font-weight:700">&#x2705; &#xCD94;&#xCC9C;!</div>':'')
          +'</div>';
      }).join('')+'</div>'
      +'<div class="v15-divider"></div>'
      +'<h4 style="margin-bottom:12px">&#x1F4C5; 5&#xC77C; &#xC608;&#xBCF4; &#xC0C1;&#xC138;</h4>'
      +forecasts.map(function(f){
        return '<div class="v15-stat-row"><span>'+f.icon+' <strong>'+f.day+'</strong> '+f.dateStr+'</span><span>'+f.temp+'°C | 풍속 '+f.wind+'m/s | 강수 '+f.rain+'% | UV '+f.uv+'</span><span class="v15-badge" style="background:'+scoreColor(f.score)+';color:#fff">'+f.score+'&#xC810;</span></div>';
      }).join('')
      +'<div class="v15-card" style="margin-top:16px"><h4>&#x1F4A1; &#xB0A0;&#xC528; &#xD301;</h4><p>'
      +'&#x2022; &#xD48D;&#xC18D; 15m/s &#xC774;&#xC0C1;: &#xD074;&#xB7FD; 1~2&#xBC88; &#xB354; &#xC120;&#xD0DD;<br>'
      +'&#x2022; UV 6 &#xC774;&#xC0C1;: &#xC120;&#xD06C;&#xB9BC; + &#xBAA8;&#xC790; &#xD544;&#xC218;<br>'
      +'&#x2022; &#xAC15;&#xC218;&#xD655;&#xB960; 40% &#xC774;&#xC0C1;: &#xC6B0;&#xC758; + &#xADF8;&#xB9BD; &#xD0C0;&#xC6F4; &#xC900;&#xBE44;<br>'
      +'&#x2022; &#xAE30;&#xC628; 10&#xB3C4; &#xBBF8;&#xB9CC;: &#xC6CC;&#xBC0D;&#xC5C5; &#xCDA9;&#xBD84;&#xD788;, &#xBCFC; &#xBE44;&#xAC70;&#xB9AC; 10% &#xAC10;&#xC18C;</p></div>'
      +'</div>';
  }
  document.body.appendChild(ov);render();
}

// === 5. Green Reading Guide ===
function v15GreenReading(){
  var ov=document.createElement('div');ov.className='v15-overlay';ov.id='v15GreenOverlay';
  var putts=JSON.parse(localStorage.getItem('v15_putt_history')||'[]');
  function render(){
    var madeCount=putts.filter(function(p){return p.made}).length;
    var pct=putts.length?Math.round(madeCount/putts.length*100):0;
    ov.innerHTML='<div class="v15-modal"><div class="v15-hdr"><h2><span class="v15i">&#x1F3AF;</span> &#xADF8;&#xB9B0; &#xB9AC;&#xB529; &#xAC00;&#xC774;&#xB4DC;</h2><button class="v15-x" onclick="document.getElementById(\'v15GreenOverlay\').classList.remove(\'active\')">&times;</button></div>'
      +'<div class="v15-grid3" style="margin-bottom:16px">'
      +'<div class="v15-stat-card"><div class="val">'+putts.length+'</div><div class="lbl">&#xCD1D; &#xD37C;&#xD305;</div></div>'
      +'<div class="v15-stat-card"><div class="val">'+madeCount+'</div><div class="lbl">&#xC131;&#xACF5;</div></div>'
      +'<div class="v15-stat-card"><div class="val">'+pct+'%</div><div class="lbl">&#xC131;&#xACF5;&#xB960;</div></div>'
      +'</div>'
      +'<div class="v15-canvas-wrap"><canvas id="v15GreenCanvas" class="v15-green-canvas" width="600" height="320"></canvas></div>'
      +'<div class="v15-grid2" style="margin-bottom:12px">'
      +'<div><label style="font-size:11px;font-weight:700;color:var(--text-muted)">&#xAC70;&#xB9AC; (m)</label><select class="v15-select" id="v15PuttDist" style="width:100%"><option value="1">1m &#xC774;&#xB0B4;</option><option value="2">1~2m</option><option value="3" selected>2~3m</option><option value="5">3~5m</option><option value="8">5~8m</option><option value="10">8m+</option></select></div>'
      +'<div><label style="font-size:11px;font-weight:700;color:var(--text-muted)">&#xACBD;&#xC0AC;</label><select class="v15-select" id="v15PuttSlope" style="width:100%"><option value="flat">&#xD3C9;&#xD0C4;</option><option value="uphill">&#xC624;&#xB974;&#xB9C9;</option><option value="downhill">&#xB0B4;&#xB9AC;&#xB9C9;</option><option value="left">&#xC88C;&#xACBD;&#xC0AC;</option><option value="right">&#xC6B0;&#xACBD;&#xC0AC;</option></select></div>'
      +'</div>'
      +'<div style="display:flex;gap:8px;margin-bottom:16px">'
      +'<button class="v15-btn v15-btn-primary" onclick="v15RecordPutt(true)" style="flex:1">&#x2705; &#xC131;&#xACF5;</button>'
      +'<button class="v15-btn v15-btn-secondary" onclick="v15RecordPutt(false)" style="flex:1">&#x274C; &#xC2E4;&#xD328;</button>'
      +'</div>'
      +'<div class="v15-card"><h4>&#x1F4D6; &#xD37C;&#xD305; &#xD301;</h4><p>'
      +'&#x2022; &#xC624;&#xB974;&#xB9C9;: &#xD648; &#xB4A4; 30cm&#xB97C; &#xBAA9;&#xD45C;&#xB85C; &#xAC00;&#xC18D;&#xC744; &#xBD99;&#xC5EC;&#xB77C;<br>'
      +'&#x2022; &#xB0B4;&#xB9AC;&#xB9C9;: &#xD0C0;&#xAC9F; &#xC55E; 20cm&#xC744; &#xBAA9;&#xD45C;, &#xBD80;&#xB4DC;&#xB7EC;&#xC6B4; &#xD130;&#xCE58;<br>'
      +'&#x2022; &#xC88C;/&#xC6B0; &#xACBD;&#xC0AC;: &#xACBD;&#xC0AC; &#xBC18;&#xB300;&#xCABD; 1~2&#xCEF5; &#xB113;&#xD600; &#xC5D0;&#xC784;<br>'
      +'&#x2022; 3m &#xC774;&#xB0B4;: &#xC5B4;&#xB4DC;&#xB808;&#xC2A4;&#xC5D0; &#xB208;&#xC744; &#xACE0;&#xC815;, &#xC190;&#xBAA9;&#xC73C;&#xB85C; &#xC2A4;&#xD2B8;&#xB85C;&#xD06C;</p></div>'
      +'</div>';
    drawGreen();
  }
  function drawGreen(){
    var canvas=document.getElementById('v15GreenCanvas');if(!canvas)return;
    var ctx=canvas.getContext('2d');
    var W=canvas.width,H=canvas.height;
    var grd=ctx.createRadialGradient(W/2,H/2,20,W/2,H/2,W/2);
    grd.addColorStop(0,'#4caf50');grd.addColorStop(0.7,'#388e3c');grd.addColorStop(1,'#2e7d32');
    ctx.fillStyle=grd;ctx.beginPath();ctx.ellipse(W/2,H/2,W/2-20,H/2-20,0,0,Math.PI*2);ctx.fill();
    ctx.strokeStyle='rgba(255,255,255,0.3)';ctx.lineWidth=2;
    ctx.beginPath();ctx.ellipse(W/2,H/2,W/2-22,H/2-22,0,0,Math.PI*2);ctx.stroke();
    ctx.fillStyle='#000';ctx.beginPath();ctx.arc(W/2,H/3,6,0,Math.PI*2);ctx.fill();
    ctx.fillStyle='#fff';ctx.beginPath();ctx.arc(W/2,H/3,4,0,Math.PI*2);ctx.fill();
    ctx.fillStyle='rgba(255,255,255,0.15)';
    for(var i=1;i<=4;i++){
      ctx.beginPath();ctx.ellipse(W/2,H/3,i*35,i*25,0,0,Math.PI*2);ctx.stroke();
    }
    ctx.fillStyle='#fff';ctx.beginPath();ctx.arc(W/2,H*0.75,5,0,Math.PI*2);ctx.fill();
    ctx.strokeStyle='rgba(255,255,0,0.6)';ctx.lineWidth=2;ctx.setLineDash([6,4]);
    ctx.beginPath();ctx.moveTo(W/2,H*0.75);
    ctx.quadraticCurveTo(W/2-20,H/2,W/2,H/3);ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle='rgba(255,255,255,0.8)';ctx.font='bold 11px sans-serif';ctx.textAlign='center';
    ctx.fillText('⭕ 홈',W/2,H/3-14);
    ctx.fillText('⚪ 볼',W/2,H*0.75+18);
    ctx.fillText('퍼팅 라인',W/2-40,H/2);
    var slope=document.getElementById('v15PuttSlope');
    if(slope){
      var sDir=slope.value;
      ctx.fillStyle='rgba(255,255,0,0.7)';ctx.font='bold 12px sans-serif';
      if(sDir==='uphill')ctx.fillText('⬆ 오르막',W/2+80,H/2);
      else if(sDir==='downhill')ctx.fillText('⬇ 내리막',W/2+80,H/2);
      else if(sDir==='left')ctx.fillText('⬅ 좌경사',W/2+80,H/2);
      else if(sDir==='right')ctx.fillText('➡ 우경사',W/2+80,H/2);
    }
  }
  window.v15RecordPutt=function(made){
    var dist=document.getElementById('v15PuttDist').value;
    var slope=document.getElementById('v15PuttSlope').value;
    putts.push({dist:dist,slope:slope,made:made,date:new Date().toISOString().slice(0,10)});
    if(putts.length>200)putts=putts.slice(-200);
    localStorage.setItem('v15_putt_history',JSON.stringify(putts));
    v15SFX(made?'green':'quiz_wrong');render();
  };
  document.body.appendChild(ov);render();
}

// === 6. Condition & Fatigue Tracker ===
function v15Condition(){
  var ov=document.createElement('div');ov.className='v15-overlay';ov.id='v15ConditionOverlay';
  var logs=JSON.parse(localStorage.getItem('v15_condition_logs')||'[]');
  function render(){
    var today=new Date().toISOString().slice(0,10);
    var todayLog=logs.find(function(l){return l.date===today});
    ov.innerHTML='<div class="v15-modal"><div class="v15-hdr"><h2><span class="v15i">&#x1F4AA;</span> &#xCEE8;&#xB514;&#xC158; &#xD2B8;&#xB798;&#xCEE4;</h2><button class="v15-x" onclick="document.getElementById(\'v15ConditionOverlay\').classList.remove(\'active\')">&times;</button></div>'
      +'<div class="v15-card"><h4>&#x1F4C5; &#xC624;&#xB298;&#xC758; &#xCEE8;&#xB514;&#xC158; ('+ today+')</h4>'
      +'<div class="v15-grid2" style="margin-top:12px">'
      +'<div><label style="font-size:11px;font-weight:700;color:var(--text-muted)">&#xC218;&#xBA74; &#xC2DC;&#xAC04;</label><select class="v15-select" id="v15CondSleep" style="width:100%">'
      +'<option value="4"'+(todayLog&&todayLog.sleep===4?' selected':'')+'>4&#xC2DC;&#xAC04; &#xC774;&#xD558;</option>'
      +'<option value="5"'+(todayLog&&todayLog.sleep===5?' selected':'')+'>5&#xC2DC;&#xAC04;</option>'
      +'<option value="6"'+(todayLog&&todayLog.sleep===6?' selected':'')+'>6&#xC2DC;&#xAC04;</option>'
      +'<option value="7"'+(todayLog&&todayLog.sleep===7?' selected':'')+'>7&#xC2DC;&#xAC04;</option>'
      +'<option value="8"'+(todayLog&&todayLog.sleep===8?' selected':'')+'>8&#xC2DC;&#xAC04; &#xC774;&#xC0C1;</option>'
      +'</select></div>'
      +'<div><label style="font-size:11px;font-weight:700;color:var(--text-muted)">&#xD53C;&#xB85C;&#xB3C4; (1~10)</label><input type="range" id="v15CondFatigue" min="1" max="10" value="'+(todayLog?todayLog.fatigue:5)+'" style="width:100%"><div style="text-align:center;font-weight:700" id="v15FatigueVal">'+(todayLog?todayLog.fatigue:5)+'</div></div>'
      +'</div>'
      +'<div class="v15-grid2" style="margin-top:12px">'
      +'<div><label style="font-size:11px;font-weight:700;color:var(--text-muted)">&#xC2A4;&#xD2B8;&#xB808;&#xC2A4; (1~10)</label><input type="range" id="v15CondStress" min="1" max="10" value="'+(todayLog?todayLog.stress:5)+'" style="width:100%"><div style="text-align:center;font-weight:700" id="v15StressVal">'+(todayLog?todayLog.stress:5)+'</div></div>'
      +'<div><label style="font-size:11px;font-weight:700;color:var(--text-muted)">&#xCCB4;&#xB825; (1~10)</label><input type="range" id="v15CondEnergy" min="1" max="10" value="'+(todayLog?todayLog.energy:5)+'" style="width:100%"><div style="text-align:center;font-weight:700" id="v15EnergyVal">'+(todayLog?todayLog.energy:5)+'</div></div>'
      +'</div>'
      +'<div style="margin-top:12px"><label style="font-size:11px;font-weight:700;color:var(--text-muted)">&#xBA54;&#xBAA8;</label><textarea class="v15-textarea" id="v15CondMemo" rows="2" placeholder="&#xC624;&#xB298;&#xC758; &#xCEE8;&#xB514;&#xC158; &#xBA54;&#xBAA8;">'+(todayLog?todayLog.memo:'')+'</textarea></div>'
      +'<button class="v15-btn v15-btn-primary" onclick="v15SaveCondition()" style="width:100%;margin-top:12px">&#xC800;&#xC7A5;</button>'
      +'</div>'
      +'<div class="v15-divider"></div>'
      +'<h4 style="margin-bottom:12px">&#x1F4CA; &#xCD5C;&#xADFC; 7&#xC77C; &#xCEE8;&#xB514;&#xC158;</h4>'
      +'<div class="v15-canvas-wrap"><canvas id="v15CondChart" width="700" height="180"></canvas></div>'
      +'<div style="max-height:150px;overflow-y:auto">'+logs.slice(-7).reverse().map(function(l){
        var overallScore=Math.round((l.energy+(10-l.fatigue)+(10-l.stress)+l.sleep*1.2)/4);
        return '<div class="v15-stat-row"><span>'+l.date+'</span><span>수면:'+l.sleep+'h | 피로:'+l.fatigue+' | 체력:'+l.energy+'</span><span class="v15-badge" style="background:'+(overallScore>=7?'#4caf50':overallScore>=5?'#ff9800':'#f44336')+';color:#fff">'+overallScore+'&#xC810;</span></div>';
      }).join('')+'</div></div>';
    var fatigueSlider=document.getElementById('v15CondFatigue');
    var stressSlider=document.getElementById('v15CondStress');
    var energySlider=document.getElementById('v15CondEnergy');
    if(fatigueSlider)fatigueSlider.addEventListener('input',function(){document.getElementById('v15FatigueVal').textContent=this.value});
    if(stressSlider)stressSlider.addEventListener('input',function(){document.getElementById('v15StressVal').textContent=this.value});
    if(energySlider)energySlider.addEventListener('input',function(){document.getElementById('v15EnergyVal').textContent=this.value});
    drawCondChart();
  }
  function drawCondChart(){
    var canvas=document.getElementById('v15CondChart');if(!canvas)return;
    var ctx=canvas.getContext('2d');
    var W=canvas.width,H=canvas.height;
    ctx.fillStyle=getComputedStyle(document.documentElement).getPropertyValue('--bg').trim()||'#f5f7f5';
    ctx.fillRect(0,0,W,H);
    var recent=logs.slice(-7);
    if(!recent.length){ctx.fillStyle='#999';ctx.font='14px sans-serif';ctx.textAlign='center';ctx.fillText('컨디션을 기록해보세요',W/2,H/2);return;}
    var metrics=[
      {key:'energy',color:'#4caf50',label:'체력'},
      {key:'fatigue',color:'#f44336',label:'피로'},
      {key:'stress',color:'#ff9800',label:'스트레스'}
    ];
    var padX=50,padY=30;
    var plotW=W-padX-20,plotH=H-padY-20;
    ctx.strokeStyle='#ddd';ctx.lineWidth=1;ctx.font='10px sans-serif';ctx.fillStyle='#999';ctx.textAlign='right';
    for(var g=0;g<=5;g++){
      var yy=padY+(g/5)*plotH;
      ctx.beginPath();ctx.moveTo(padX,yy);ctx.lineTo(W-10,yy);ctx.stroke();
      ctx.fillText((10-g*2)+'',padX-6,yy+4);
    }
    metrics.forEach(function(m){
      ctx.strokeStyle=m.color;ctx.lineWidth=2.5;ctx.beginPath();
      recent.forEach(function(r,i){
        var x=padX+i*(plotW/(recent.length-1||1));
        var y=padY+(1-r[m.key]/10)*plotH;
        if(i===0)ctx.moveTo(x,y);else ctx.lineTo(x,y);
      });
      ctx.stroke();
      recent.forEach(function(r,i){
        var x=padX+i*(plotW/(recent.length-1||1));
        var y=padY+(1-r[m.key]/10)*plotH;
        ctx.fillStyle=m.color;ctx.beginPath();ctx.arc(x,y,4,0,Math.PI*2);ctx.fill();
      });
    });
    ctx.font='10px sans-serif';ctx.textAlign='center';ctx.fillStyle='#999';
    recent.forEach(function(r,i){
      var x=padX+i*(plotW/(recent.length-1||1));
      ctx.fillText(r.date.slice(5),x,H-6);
    });
    var legendX=padX;
    metrics.forEach(function(m,i){
      ctx.fillStyle=m.color;ctx.fillRect(legendX+i*80,4,10,10);
      ctx.fillStyle='#666';ctx.textAlign='left';ctx.fillText(m.label,legendX+i*80+14,13);
    });
  }
  window.v15SaveCondition=function(){
    var today=new Date().toISOString().slice(0,10);
    var entry={
      date:today,
      sleep:parseInt(document.getElementById('v15CondSleep').value),
      fatigue:parseInt(document.getElementById('v15CondFatigue').value),
      stress:parseInt(document.getElementById('v15CondStress').value),
      energy:parseInt(document.getElementById('v15CondEnergy').value),
      memo:document.getElementById('v15CondMemo').value
    };
    var idx=logs.findIndex(function(l){return l.date===today});
    if(idx>=0)logs[idx]=entry;else logs.push(entry);
    if(logs.length>90)logs=logs.slice(-90);
    localStorage.setItem('v15_condition_logs',JSON.stringify(logs));
    v15SFX('condition');render();
  };
  document.body.appendChild(ov);render();
}

// === 7. Golf Rules Quiz (20 Questions) ===
function v15GolfQuiz(){
  var ov=document.createElement('div');ov.className='v15-overlay';ov.id='v15QuizOverlay';
  var quizPool=[
    {q:'볼이 워터 해저드에 빠졌을 때 벌타 벌타는?',a:['무;&#xBC8C;&#xD0C0;','1&#xBC8C;&#xD0C0;','2&#xBC8C;&#xD0C0;','3&#xBC8C;&#xD0C0;'],c:1,ex:'워터 해저드는 1벌타 구제로, 사이드 또는 드롭존에서 플레이 가능'},
    {q:'OB 발생 시 처리 방법은?',a:['원래 위치에서 1&#xBC8C;&#xD0C0; &#xCD94;&#xAC00;','놓;&#xC778; &#xC9C0;&#xC810;&#xC5D0;&#xC11C; &#xD50C;&#xB808;&#xC774;','해;&#xC800;&#xB4DC; &#xCC98;&#xB9AC;','무;&#xBC8C;&#xD0C0; &#xB4DC;&#xB86D;'],c:0,ex:'스트로크와 거리 벌타 1타를 합쳐 총 2벌타를 받고 원래 위치에서 재플레이'},
    {q:'버키에서 볼을 놓은 후 몇 번째 치는 것인가? (Par 4)',a:['3&#xBC88;&#xC9F8;','2&#xBC88;&#xC9F8;','4&#xBC88;&#xC9F8;','5&#xBC88;&#xC9F8;'],c:0,ex:'버키는 규정 타수보다 1타 적은 것으로, Par 4에서는 3번째에 홀 아웃'},
    {q:'언플레이어블 라이에 볼이 있을 때 처리는?',a:['그;&#xB300;&#xB85C; &#xD50C;&#xB808;&#xC774;','무;&#xBC8C;&#xD0C0; &#xB4DC;&#xB86D;','1&#xBC8C;&#xD0C0; &#xAD6C;&#xC81C;','2&#xBC8C;&#xD0C0; &#xAD6C;&#xC81C;'],c:1,ex:'언플레이어블 라이에서는 1클럽 길이 이내 가장 가까운 구제 지점에 무벌타 드롭'},
    {q:'버키에서 볼을 놓은 후 몇 번째 치는 것인가? (Par 3)',a:['2&#xBC88;&#xC9F8;','1&#xBC88;&#xC9F8;','3&#xBC88;&#xC9F8;','4&#xBC88;&#xC9F8;'],c:0,ex:'Par 3에서 버키는 2번째 샷에 홀 아웃'},
    {q:'그린 위에서 볼 마크 수리 시 벌타는?',a:['무;&#xBC8C;&#xD0C0;','1&#xBC8C;&#xD0C0;','2&#xBC8C;&#xD0C0;','실;&#xACA9;'],c:0,ex:'그린 위에서는 볼 마커를 자유롭게 수리할 수 있으며 벌타 없음'},
    {q:'방향 표지 막대를 믑은 채 스윗하면?',a:['2&#xBC8C;&#xD0C0;','무;&#xBC8C;&#xD0C0;','1&#xBC8C;&#xD0C0;','경;&#xACE0;'],c:0,ex:'방향 표지믵을 믑고 플레이하면 2벌타'},
    {q:'볼이 바운스해서 코스 밖으로 나갔다 들어오면?',a:['그;&#xB300;&#xB85C; &#xD50C;&#xB808;&#xC774;','원;&#xB798; &#xC704;&#xCE58;&#xC5D0;&#xC11C; &#xC7AC;&#xD50C;&#xB808;&#xC774;','바;&#xC6B4;&#xC2A4; &#xC9C0;&#xC810;&#xC5D0;&#xC11C;','1&#xBC8C;&#xD0C0;'],c:0,ex:'코스 밖으로 바운스해 나갔다 돌아온 볼은 그대로 플레이'},
    {q:'뷰렀티 하우스의 평균 번클 큐어를 뭘라고 하는가?',a:['버;&#xB514;','이;&#xAE00;','알;&#xBC14;&#xD2B8;&#xB85C;&#xC2A4;','콘;&#xB3C4;&#xB974;'],c:2,ex:'알바트로스는 Par보다 3타 적은 스코어로 매우 희귀한 기록'},
    {q:'볼이 디벿에 박혀 있을 때 처리는?',a:['무;&#xBC8C;&#xD0C0; &#xB4DC;&#xB86D;','그;&#xB300;&#xB85C; &#xD50C;&#xB808;&#xC774;','1&#xBC8C;&#xD0C0; &#xAD6C;&#xC81C;','실;&#xACA9;'],c:0,ex:'볼이 디벿에 박혀 있으면 무벌타로 가장 가까운 구제점에 드롭'},
    {q:'사허되는 클럽 최대 수는?',a:['12&#xAC1C;','14&#xAC1C;','16&#xAC1C;','18&#xAC1C;'],c:1,ex:'골프 규칙상 백에 넣을 수 있는 클럽은 최대 14개'},
    {q:'레터럴 워터 해저드의 구제 방법은?',a:['볼;&#xACFC; &#xD640; &#xC0AC;&#xC774; &#xB4DC;&#xB86D;','홈; &#xBC29;&#xD5A5;&#xC73C;&#xB85C; &#xB4DC;&#xB86D;','사;&#xC774;&#xB4DC; &#xB610;&#xB294; &#xD6C4;&#xBC29; &#xB4DC;&#xB86D;','모;&#xB450; &#xAC00;&#xB2A5;'],c:2,ex:'레터럴 워터 해저드는 측면 또는 후방으로 구제 가능'},
    {q:'프로비저널 볼을 칠 수 있는 상황은?',a:['원;&#xB798; &#xBCFC;&#xC774; &#xBD84;&#xC2E4;&#xB420; &#xC218; &#xC788;&#xC744; &#xB54C;','언;&#xC81C;&#xB098;','해;&#xC800;&#xB4DC;&#xC5D0;&#xC11C;&#xB9CC;','두; &#xBC88;&#xC9F8; &#xC0F7;&#xBD80;&#xD130;'],c:0,ex:'원래 볼이 분실될 수 있을 때만 프로비저널 볼을 칠 수 있음'},
    {q:'항상 볼을 교체할 수 있는 곳은?',a:['퍼;&#xD305; &#xADF8;&#xB9B0;','페;&#xC5B4;&#xC6E8;&#xC774;','러;&#xD504;','번;&#xCEE4;'],c:0,ex:'퍼팅 그린 위에서는 항상 볼을 교체할 수 있음'},
    {q:'버디퍼팅 실패 시 취하는 퍼팅은?',a:['파; &#xD37C;&#xD305;','보;&#xAE30; &#xD37C;&#xD305;','버;&#xB514; &#xD37C;&#xD305;','이;&#xAE00; &#xD37C;&#xD305;'],c:0,ex:'버디퍼팅을 실패하면 Par 퍼팅이 됨'},
    {q:'스트로크플레이에서 항상 마크해야 하는 것은?',a:['스;&#xCF54;&#xC5B4;&#xCE74;&#xB4DC;','볼; &#xC704;&#xCE58;','바;&#xB78C; &#xBC29;&#xD5A5;','프;&#xB808;&#xC774; &#xC2DC;&#xAC04;'],c:0,ex:'스트로크플레이에서는 매 홀 스코어를 기록해야 함'},
    {q:'볼을 칠 때 클럽 헤드가 지면에 닿아야 하는가?',a:['아;&#xB2C8;&#xC624;','예;','페;&#xC5B4;&#xC6E8;&#xC774;&#xC5D0;&#xC11C;&#xB9CC;','번;&#xCEE4;&#xC5D0;&#xC11C;&#xB9CC;'],c:0,ex:'클럽헤드가 지면에 닿지 않고 스윗해도 규칙 위반 아님'},
    {q:'볼이 물웅덮이에 있으면?',a:['무;&#xBC8C;&#xD0C0; &#xAD6C;&#xC81C;','1&#xBC8C;&#xD0C0;','2&#xBC8C;&#xD0C0;','그;&#xB300;&#xB85C; &#xD50C;&#xB808;&#xC774;'],c:0,ex:'물웅덮이 등 일시적 물에서는 무벌타 구제 가능'},
    {q:'Par 72 코스의 전반 9홀 기준 Par는?',a:['36','34','38','40'],c:0,ex:'일반적으로 Par 72 코스는 전반/후반 각각 Par 36으로 구성'},
    {q:'볼이 카트 경로(Cart Path)에 있을 때?',a:['무;&#xBC8C;&#xD0C0; &#xAD6C;&#xC81C;','1&#xBC8C;&#xD0C0; &#xAD6C;&#xC81C;','그;&#xB300;&#xB85C; &#xD50C;&#xB808;&#xC774;','벌;&#xD0C0; &#xC5C6;&#xC774; &#xC694;&#xC2AC; &#xCE58;&#xAE30;'],c:0,ex:'카트 경로는 인공 장애물이므로 무벌타 구제 가능'}
  ];
  var qIdx=0,score=0,answered=false,quizDone=false;
  var shuffled=quizPool.slice().sort(function(){return Math.random()-0.5}).slice(0,20);
  function render(){
    if(quizDone){
      var grade=score>=18?'S':score>=16?'A':score>=14?'B':score>=10?'C':'D';
      var gradeColor=grade==='S'?'#ffd700':grade==='A'?'#4caf50':grade==='B'?'#2196f3':grade==='C'?'#ff9800':'#f44336';
      ov.innerHTML='<div class="v15-modal"><div class="v15-hdr"><h2><span class="v15i">&#x1F3C6;</span> &#xD034;&#xC988; &#xACB0;&#xACFC;</h2><button class="v15-x" onclick="document.getElementById(\'v15QuizOverlay\').classList.remove(\'active\')">&times;</button></div>'
        +'<div style="text-align:center;padding:30px 0"><div style="font-size:80px;font-weight:900;color:'+gradeColor+'">'+grade+'</div>'
        +'<div style="font-size:28px;font-weight:800;margin:12px 0">'+score+' / '+shuffled.length+'</div>'
        +'<div style="font-size:14px;color:var(--text-muted)">정답률 '+Math.round(score/shuffled.length*100)+'%</div></div>'
        +'<button class="v15-btn v15-btn-primary" onclick="v15RestartQuiz()" style="width:100%">&#xB2E4;&#xC2DC; &#xD480;&#xAE30;</button></div>';
      return;
    }
    var q=shuffled[qIdx];
    ov.innerHTML='<div class="v15-modal"><div class="v15-hdr"><h2><span class="v15i">&#x1F4DD;</span> &#xACE8;&#xD504; &#xADDC;&#xCE59; &#xD034;&#xC988;</h2><button class="v15-x" onclick="document.getElementById(\'v15QuizOverlay\').classList.remove(\'active\')">&times;</button></div>'
      +'<div class="v15-progress" style="margin-bottom:16px"><div class="v15-progress-fill" style="width:'+((qIdx+1)/shuffled.length*100)+'%;background:var(--primary)"></div></div>'
      +'<div style="display:flex;justify-content:space-between;margin-bottom:16px;font-size:12px"><span>Q'+(qIdx+1)+' / '+shuffled.length+'</span><span>정답: '+score+'</span></div>'
      +'<div class="v15-card"><h4>'+q.q+'</h4></div>'
      +'<div id="v15QuizOptions">'+q.a.map(function(a,i){
        return '<div class="v15-quiz-option" data-idx="'+i+'">'+a+'</div>';
      }).join('')+'</div>'
      +'<div id="v15QuizExpl" style="display:none;margin-top:12px" class="v15-card"><p></p></div>'
      +'<div id="v15QuizNext" style="display:none;margin-top:12px"><button class="v15-btn v15-btn-primary" onclick="v15NextQ()" style="width:100%">'+(qIdx<shuffled.length-1?'다음 문제':'결과 보기')+'</button></div></div>';
    var opts=ov.querySelectorAll('.v15-quiz-option');
    opts.forEach(function(opt){
      opt.addEventListener('click',function(){
        if(answered)return;
        answered=true;
        var idx=parseInt(this.dataset.idx);
        if(idx===q.c){this.classList.add('correct');score++;v15SFX('quiz_correct')}
        else{this.classList.add('wrong');opts[q.c].classList.add('correct');v15SFX('quiz_wrong')}
        document.getElementById('v15QuizExpl').style.display='block';
        document.getElementById('v15QuizExpl').querySelector('p').textContent=q.ex;
        document.getElementById('v15QuizNext').style.display='block';
      });
    });
  }
  window.v15NextQ=function(){
    qIdx++;answered=false;
    if(qIdx>=shuffled.length){quizDone=true;v15SFX('achieve')}
    render();
  };
  window.v15RestartQuiz=function(){
    qIdx=0;score=0;answered=false;quizDone=false;
    shuffled=quizPool.slice().sort(function(){return Math.random()-0.5}).slice(0,20);
    render();
  };
  document.body.appendChild(ov);render();
}

// === 8. Shot Planner (Canvas Course Strategy) ===
function v15ShotPlanner(){
  var ov=document.createElement('div');ov.className='v15-overlay';ov.id='v15PlannerOverlay';
  var plans=JSON.parse(localStorage.getItem('v15_shot_plans')||'[]');
  function render(){
    ov.innerHTML='<div class="v15-modal"><div class="v15-hdr"><h2><span class="v15i">&#x1F3AF;</span> &#xC0F7; &#xD50C;&#xB798;&#xB108;</h2><button class="v15-x" onclick="document.getElementById(\'v15PlannerOverlay\').classList.remove(\'active\')">&times;</button></div>'
      +'<div class="v15-canvas-wrap"><canvas id="v15PlannerCanvas" width="700" height="350" style="cursor:crosshair;touch-action:none"></canvas></div>'
      +'<div class="v15-grid3" style="margin-bottom:12px">'
      +'<div><label style="font-size:11px;font-weight:700;color:var(--text-muted)">&#xD640; &#xBC88;&#xD638;</label><select class="v15-select" id="v15PlanHole" style="width:100%">'+Array.from({length:18},function(_,i){return '<option value="'+(i+1)+'">'+(i+1)+'&#xBC88; &#xD640;</option>'}).join('')+'</select></div>'
      +'<div><label style="font-size:11px;font-weight:700;color:var(--text-muted)">Par</label><select class="v15-select" id="v15PlanPar" style="width:100%"><option value="3">Par 3</option><option value="4" selected>Par 4</option><option value="5">Par 5</option></select></div>'
      +'<div><label style="font-size:11px;font-weight:700;color:var(--text-muted)">&#xAC70;&#xB9AC;(m)</label><input type="number" class="v15-input" id="v15PlanDist" placeholder="380"></div>'
      +'</div>'
      +'<div style="display:flex;gap:8px;margin-bottom:12px">'
      +'<button class="v15-btn v15-btn-primary" onclick="v15DrawPlan()" style="flex:1">&#xC804;&#xB7B5; &#xC0DD;&#xC131;</button>'
      +'<button class="v15-btn v15-btn-secondary" onclick="v15SavePlan()" style="flex:1">&#xC800;&#xC7A5;</button>'
      +'<button class="v15-btn v15-btn-secondary" onclick="v15ClearPlan()">&#xCD08;&#xAE30;&#xD654;</button>'
      +'</div>'
      +'<div class="v15-divider"></div>'
      +'<h4 style="margin-bottom:8px">&#x1F4CB; &#xC800;&#xC7A5;&#xB41C; &#xC804;&#xB7B5; ('+plans.length+')</h4>'
      +'<div style="max-height:150px;overflow-y:auto">'+plans.slice().reverse().map(function(p,i){
        return '<div class="v15-stat-row"><span>'+p.hole+'&#xBC88;&#xD640; Par'+p.par+' '+p.dist+'m</span><span>'+p.strategy+'</span></div>';
      }).join('')+'</div></div>';
    drawPlanCanvas();
  }
  function drawPlanCanvas(){
    var canvas=document.getElementById('v15PlannerCanvas');if(!canvas)return;
    var ctx=canvas.getContext('2d');
    var W=canvas.width,H=canvas.height;
    var grd=ctx.createLinearGradient(0,0,0,H);
    grd.addColorStop(0,'#87ceeb');grd.addColorStop(0.3,'#5daa3e');grd.addColorStop(1,'#3a8c3f');
    ctx.fillStyle=grd;ctx.fillRect(0,0,W,H);
    ctx.fillStyle='#2d6a30';
    ctx.beginPath();ctx.ellipse(W*0.15,H*0.3,60,40,0,0,Math.PI*2);ctx.fill();
    ctx.fillStyle='#d2b48c';
    ctx.beginPath();ctx.ellipse(W*0.7,H*0.4,25,15,0.3,0,Math.PI*2);ctx.fill();
    ctx.fillStyle='#4db8ff';
    ctx.beginPath();ctx.ellipse(W*0.4,H*0.55,40,20,-0.2,0,Math.PI*2);ctx.fill();
    ctx.fillStyle='#90EE90';
    ctx.beginPath();ctx.ellipse(W*0.85,H*0.25,50,35,0,0,Math.PI*2);ctx.fill();
    ctx.fillStyle='#000';ctx.beginPath();ctx.arc(W*0.85,H*0.22,3,0,Math.PI*2);ctx.fill();
    ctx.fillStyle='red';ctx.fillRect(W*0.85-1,H*0.22-15,2,15);
    ctx.fillStyle='#fff';ctx.beginPath();ctx.arc(W*0.15,H*0.82,5,0,Math.PI*2);ctx.fill();
    ctx.strokeStyle='rgba(255,255,0,0.7)';ctx.lineWidth=2;ctx.setLineDash([8,6]);
    ctx.beginPath();ctx.moveTo(W*0.15,H*0.82);
    ctx.quadraticCurveTo(W*0.35,H*0.65,W*0.55,H*0.5);ctx.stroke();
    ctx.beginPath();ctx.moveTo(W*0.55,H*0.5);
    ctx.quadraticCurveTo(W*0.7,H*0.35,W*0.85,H*0.25);ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle='rgba(255,255,255,0.85)';ctx.font='bold 11px sans-serif';
    ctx.fillText('TEE',W*0.12,H*0.82+18);
    ctx.fillText('GREEN',W*0.8,H*0.25+50);
    ctx.fillText('BUNKER',W*0.66,H*0.4+25);
    ctx.fillText('WATER',W*0.36,H*0.55+30);
    ctx.fillStyle='rgba(255,255,0,0.9)';ctx.font='bold 12px sans-serif';
    ctx.fillText('1st: 드라이버 230m',W*0.25,H*0.72);
    ctx.fillText('2nd: 7번 아이언 150m',W*0.5,H*0.42);
  }
  window.v15DrawPlan=function(){v15SFX('planner');drawPlanCanvas()};
  window.v15SavePlan=function(){
    var hole=document.getElementById('v15PlanHole').value;
    var par=document.getElementById('v15PlanPar').value;
    var dist=document.getElementById('v15PlanDist').value||'380';
    plans.push({hole:hole,par:par,dist:dist,strategy:'드라이버→아이언→퍼팅',date:new Date().toISOString().slice(0,10)});
    if(plans.length>50)plans=plans.slice(-50);
    localStorage.setItem('v15_shot_plans',JSON.stringify(plans));
    v15SFX('planner');render();
  };
  window.v15ClearPlan=function(){drawPlanCanvas()};
  document.body.appendChild(ov);render();
}

// === 9. Practice Routine Builder ===
function v15RoutineBuilder(){
  var ov=document.createElement('div');ov.className='v15-overlay';ov.id='v15RoutineOverlay';
  var routines=JSON.parse(localStorage.getItem('v15_routines')||'null');
  if(!routines){
    routines={
      presets:[
        {name:'워밍업 루틴',items:[
          {title:'스트레칭 10분',done:false},
          {title:'PW 하프스윗 20개',done:false},
          {title:'7번 아이언 풀스윗 15개',done:false},
          {title:'드라이버 10개',done:false}
        ]},
        {name:'숙트게임 집중',items:[
          {title:'칩샷 연습 30분',done:false},
          {title:'번커샷 20개',done:false},
          {title:'SW 로브샷 15개',done:false},
          {title:'50m 어프로치 20개',done:false}
        ]},
        {name:'퍼팅 마스터',items:[
          {title:'1m 직선 퍼팅 20개',done:false},
          {title:'2m 경사 퍼팅 15개',done:false},
          {title:'5m 롱퍼팅 10개',done:false},
          {title:'라그 퍼팅 연습 10개',done:false}
        ]},
        {name:'드라이버 파워',items:[
          {title:'티샷 얼라인먼트 체크',done:false},
          {title:'하프스윗 드라이버 10개',done:false},
          {title:'풀스윗 드라이버 20개',done:false},
          {title:'타겟 에이밍 드릴 15개',done:false}
        ]},
        {name:'코스 시뮬레이션',items:[
          {title:'티샷→1st→어프로치→퍼팅 5세트',done:false},
          {title:'Par3 시뮬레이션 3홀',done:false},
          {title:'트러블샷 연습 (OB 상황)',done:false},
          {title:'바람 방향 고려 샷 10개',done:false}
        ]},
        {name:'체력 트레이닝',items:[
          {title:'코어 회전 운동 15회',done:false},
          {title:'하체 스쿼트 20회',done:false},
          {title:'밴드 트레이닝 15분',done:false},
          {title:'밸런스 드릴 10분',done:false}
        ]}
      ],
      active:0
    };
    localStorage.setItem('v15_routines',JSON.stringify(routines));
  }
  function render(){
    var preset=routines.presets[routines.active];
    var doneCount=preset.items.filter(function(it){return it.done}).length;
    var pct=Math.round(doneCount/preset.items.length*100);
    ov.innerHTML='<div class="v15-modal"><div class="v15-hdr"><h2><span class="v15i">&#x1F3CB;&#xFE0F;</span> &#xC5F0;&#xC2B5; &#xB8E8;&#xD2F4; &#xBE4C;&#xB354;</h2><button class="v15-x" onclick="document.getElementById(\'v15RoutineOverlay\').classList.remove(\'active\')">&times;</button></div>'
      +'<div class="v15-tabs">'+routines.presets.map(function(p,i){
        return '<div class="v15-tab'+(i===routines.active?' active':'')+'" data-ridx="'+i+'">'+p.name+'</div>';
      }).join('')+'</div>'
      +'<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">'
      +'<span style="font-weight:700">'+preset.name+'</span>'
      +'<span class="v15-badge" style="background:'+(pct===100?'#4caf50':'var(--primary)')+';color:#fff">'+doneCount+'/'+preset.items.length+' ('+pct+'%)</span>'
      +'</div>'
      +'<div class="v15-progress" style="margin-bottom:16px"><div class="v15-progress-fill" style="width:'+pct+'%;background:'+(pct===100?'#4caf50':'var(--primary)')+'"></div></div>'
      +preset.items.map(function(it,i){
        return '<div class="v15-routine-item">'
          +'<div class="check'+(it.done?' done':'')+'" data-ri="'+i+'">'+(it.done?'&#x2714;':'')+'</div>'
          +'<div style="flex:1"><span style="font-weight:700;font-size:13px;'+(it.done?'text-decoration:line-through;opacity:.6':'')+'">'+it.title+'</span></div>'
          +'</div>';
      }).join('')
      +'<div style="display:flex;gap:8px;margin-top:16px">'
      +'<button class="v15-btn v15-btn-secondary" onclick="v15ResetRoutine()" style="flex:1">&#xCD08;&#xAE30;&#xD654;</button>'
      +'</div></div>';
    var tabs=ov.querySelectorAll('.v15-tab');
    tabs.forEach(function(tab){tab.addEventListener('click',function(){routines.active=parseInt(this.dataset.ridx);render();v15SFX('routine')})});
    var checks=ov.querySelectorAll('.check');
    checks.forEach(function(chk){
      chk.addEventListener('click',function(){
        var idx=parseInt(this.dataset.ri);
        preset.items[idx].done=!preset.items[idx].done;
        localStorage.setItem('v15_routines',JSON.stringify(routines));
        v15SFX('routine');render();
      });
    });
  }
  window.v15ResetRoutine=function(){
    routines.presets[routines.active].items.forEach(function(it){it.done=false});
    localStorage.setItem('v15_routines',JSON.stringify(routines));render();
  };
  document.body.appendChild(ov);render();
}

// === 10. Round Share Card (Canvas 600x380) ===
function v15ShareCard(){
  var ov=document.createElement('div');ov.className='v15-overlay';ov.id='v15ShareOverlay';
  function render(){
    ov.innerHTML='<div class="v15-modal"><div class="v15-hdr"><h2><span class="v15i">&#x1F4F1;</span> &#xB77C;&#xC6B4;&#xB4DC; &#xACF5;&#xC720; &#xCE74;&#xB4DC;</h2><button class="v15-x" onclick="document.getElementById(\'v15ShareOverlay\').classList.remove(\'active\')">&times;</button></div>'
      +'<canvas id="v15ShareCanvas" class="v15-share-canvas" width="600" height="380"></canvas>'
      +'<div style="display:flex;gap:8px;margin-top:16px">'
      +'<button class="v15-btn v15-btn-primary" onclick="v15DownloadCard()" style="flex:1">&#x1F4BE; PNG &#xB2E4;&#xC6B4;&#xB85C;&#xB4DC;</button>'
      +'<button class="v15-btn v15-btn-secondary" onclick="v15CopyCard()" style="flex:1">&#x1F4CB; &#xD074;&#xB9BD;&#xBCF4;&#xB4DC; &#xBCF5;&#xC0AC;</button>'
      +'</div></div>';
    drawShareCard();
  }
  function drawShareCard(){
    var canvas=document.getElementById('v15ShareCanvas');if(!canvas)return;
    var ctx=canvas.getContext('2d');
    var W=600,H=380;
    var grd=ctx.createLinearGradient(0,0,W,H);
    grd.addColorStop(0,'#0f5a28');grd.addColorStop(0.5,'#1a7a3a');grd.addColorStop(1,'#34a853');
    ctx.fillStyle=grd;ctx.fillRect(0,0,W,H);
    ctx.fillStyle='rgba(255,255,255,0.04)';
    for(var i=0;i<6;i++){ctx.beginPath();ctx.arc(Math.random()*W,Math.random()*H,Math.random()*80+30,0,Math.PI*2);ctx.fill()}
    ctx.fillStyle='#fff';ctx.font='bold 28px sans-serif';ctx.textAlign='left';
    ctx.fillText('⛳ SmartGolf',30,50);
    ctx.font='13px sans-serif';ctx.fillStyle='rgba(255,255,255,0.7)';
    ctx.fillText('My Golf Stats',30,74);
    ctx.fillStyle='rgba(255,255,255,0.1)';
    ctx.fillRect(20,90,W-40,1);
    var clubStats=JSON.parse(localStorage.getItem('v15_club_stats')||'{}');
    var totalShots=0;Object.keys(clubStats).forEach(function(k){totalShots+=(clubStats[k].shots||[]).length});
    var partners=JSON.parse(localStorage.getItem('v15_partners')||'[]');
    var ratings=JSON.parse(localStorage.getItem('v15_course_ratings')||'[]');
    var condLogs=JSON.parse(localStorage.getItem('v15_condition_logs')||'[]');
    var putts=JSON.parse(localStorage.getItem('v15_putt_history')||'[]');
    var routinesData=JSON.parse(localStorage.getItem('v15_routines')||'{}');
    var stats=[
      {label:'총 샷 기록',value:totalShots+'회'},
      {label:'라운드',value:ratings.length+'회'},
      {label:'파트너',value:partners.length+'명'},
      {label:'퍼팅 기록',value:putts.length+'회'},
      {label:'컨디션 기록',value:condLogs.length+'일'},
      {label:'연습 루틴',value:(routinesData.presets||[]).length+'종'}
    ];
    var cols=3,rows=2;
    var cellW=(W-60)/cols,cellH=90;
    stats.forEach(function(s,i){
      var col=i%cols,row=Math.floor(i/cols);
      var x=30+col*cellW,y=110+row*(cellH+10);
      ctx.fillStyle='rgba(255,255,255,0.08)';
      ctx.beginPath();ctx.roundRect(x,y,cellW-12,cellH,12);ctx.fill();
      ctx.fillStyle='#fff';ctx.font='bold 26px sans-serif';ctx.textAlign='center';
      ctx.fillText(s.value,x+(cellW-12)/2,y+40);
      ctx.font='11px sans-serif';ctx.fillStyle='rgba(255,255,255,0.7)';
      ctx.fillText(s.label,x+(cellW-12)/2,y+62);
    });
    ctx.fillStyle='rgba(255,255,255,0.1)';
    ctx.fillRect(20,H-60,W-40,1);
    ctx.fillStyle='rgba(255,255,255,0.5)';ctx.font='11px sans-serif';ctx.textAlign='left';
    ctx.fillText(new Date().toISOString().slice(0,10)+' | SmartGolf v15.0',30,H-30);
    ctx.textAlign='right';
    ctx.fillText('⛳ 스마트골프와 함께하는 골프 라이프',W-30,H-30);
  }
  window.v15DownloadCard=function(){
    var canvas=document.getElementById('v15ShareCanvas');if(!canvas)return;
    var link=document.createElement('a');link.download='smartgolf-stats-'+new Date().toISOString().slice(0,10)+'.png';
    link.href=canvas.toDataURL('image/png');link.click();v15SFX('share');
  };
  window.v15CopyCard=function(){
    var canvas=document.getElementById('v15ShareCanvas');if(!canvas)return;
    canvas.toBlob(function(blob){
      if(navigator.clipboard&&navigator.clipboard.write){
        navigator.clipboard.write([new ClipboardItem({'image/png':blob})]).then(function(){v15SFX('share')});
      }
    });
  };
  document.body.appendChild(ov);render();
}

// === Achievement System (+10) ===
function v15CheckAchieve(){
  var achList=[
    {id:'v15_first_shot',name:'첫 샷 기록',desc:'클럽별 샷을 처음 기록',check:function(){var s=JSON.parse(localStorage.getItem('v15_club_stats')||'{}');return Object.keys(s).some(function(k){return(s[k].shots||[]).length>0})}},
    {id:'v15_50_shots',name:'50타 돌파',desc:'클럽별 샷 50개 기록',check:function(){var s=JSON.parse(localStorage.getItem('v15_club_stats')||'{}');var t=0;Object.keys(s).forEach(function(k){t+=(s[k].shots||[]).length});return t>=50}},
    {id:'v15_first_rating',name:'코스 레이터',desc:'코스 레이팅 처음 등록',check:function(){return JSON.parse(localStorage.getItem('v15_course_ratings')||'[]').length>0}},
    {id:'v15_5_ratings',name:'핸디캡 확보',desc:'5라운드 레이팅 등록',check:function(){return JSON.parse(localStorage.getItem('v15_course_ratings')||'[]').length>=5}},
    {id:'v15_partner_3',name:'골프 프렌즈',desc:'파트너 3명 등록',check:function(){return JSON.parse(localStorage.getItem('v15_partners')||'[]').length>=3}},
    {id:'v15_putt_20',name:'퍼팅 마스터',desc:'퍼팅 20회 기록',check:function(){return JSON.parse(localStorage.getItem('v15_putt_history')||'[]').length>=20}},
    {id:'v15_condition_7',name:'컨디션 관리자',desc:'컨디션 7일 기록',check:function(){return JSON.parse(localStorage.getItem('v15_condition_logs')||'[]').length>=7}},
    {id:'v15_quiz_master',name:'골프 규칙박사',desc:'퀴즈 답변 완료',check:function(){return localStorage.getItem('v15_quiz_done')==='1'}},
    {id:'v15_routine_done',name:'연습벌레',desc:'연습 루틴 1회 완수',check:function(){var r=JSON.parse(localStorage.getItem('v15_routines')||'{}');if(!r.presets)return false;return r.presets.some(function(p){return p.items.every(function(it){return it.done})})}},
    {id:'v15_share_first',name:'공유의 기쁨',desc:'라운드 카드 공유',check:function(){return localStorage.getItem('v15_shared')==='1'}}
  ];
  var achieved=JSON.parse(localStorage.getItem('v15_achievements')||'[]');
  var newAch=[];
  achList.forEach(function(a){
    if(achieved.indexOf(a.id)<0&&a.check()){
      achieved.push(a.id);newAch.push(a);
    }
  });
  if(newAch.length){
    localStorage.setItem('v15_achievements',JSON.stringify(achieved));
    newAch.forEach(function(a){
      v15SFX('achieve');
      v15Toast('🏆 업적 달성: '+a.name);
    });
  }
}

// === Toast ===
function v15Toast(msg){
  var t=document.createElement('div');
  t.style.cssText='position:fixed;bottom:100px;left:50%;transform:translateX(-50%);background:var(--toast-bg,#333);color:#fff;padding:14px 28px;border-radius:14px;font-size:13px;font-weight:700;z-index:10050;box-shadow:0 8px 30px rgba(0,0,0,.4);animation:v15Rise .4s ease';
  t.textContent=msg;document.body.appendChild(t);
  setTimeout(function(){t.style.opacity='0';t.style.transition='opacity .4s';setTimeout(function(){t.remove()},400)},2800);
}

// === Quick Action Buttons ===
function v15QuickActions(){
  var actions=[
    {label:'클럽통계',icon:'&#x1F4CA;',overlay:'v15ClubStatsOverlay'},
    {label:'핸디캡',icon:'&#x1F4CF;',overlay:'v15RatingOverlay'},
    {label:'파트너',icon:'&#x1F91D;',overlay:'v15PartnerOverlay'},
    {label:'날씨',icon:'&#x1F326;&#xFE0F;',overlay:'v15WeatherOverlay'},
    {label:'그린리딩',icon:'&#x1F3AF;',overlay:'v15GreenOverlay'},
    {label:'컨디션',icon:'&#x1F4AA;',overlay:'v15ConditionOverlay'},
    {label:'골프퀴즈',icon:'&#x1F4DD;',overlay:'v15QuizOverlay'},
    {label:'샷플래너',icon:'&#x1F3AF;',overlay:'v15PlannerOverlay'},
    {label:'연습루틴',icon:'&#x1F3CB;&#xFE0F;',overlay:'v15RoutineOverlay'},
    {label:'공유카드',icon:'&#x1F4F1;',overlay:'v15ShareOverlay'}
  ];
  function inject(){
    var nav=document.querySelector('.mobile-nav');
    if(!nav||document.getElementById('v15QuickBar'))return;
    var bar=document.createElement('div');bar.id='v15QuickBar';
    bar.style.cssText='display:flex;gap:6px;padding:8px 12px;overflow-x:auto;scrollbar-width:none;background:var(--card-bg);border-bottom:1px solid var(--border)';
    actions.forEach(function(a){
      var btn=document.createElement('button');
      btn.className='v15-chip';
      btn.innerHTML=a.icon+' '+a.label;
      btn.addEventListener('click',function(){
        var el=document.getElementById(a.overlay);if(el){el.classList.add('active');v15SFX('club_stat')}
      });
      bar.appendChild(btn);
    });
    var searchSec=document.querySelector('.search-section');
    if(searchSec)searchSec.parentNode.insertBefore(bar,searchSec.nextSibling);
    else document.body.insertBefore(bar,document.body.firstChild);
  }
  if(document.readyState==='complete'||document.readyState==='interactive')setTimeout(inject,600);
  else window.addEventListener('load',function(){setTimeout(inject,800)});
  setTimeout(inject,1500);
  setTimeout(inject,3000);
}

// === Keyboard Shortcuts ===
document.addEventListener('keydown',function(e){
  var t=e.target.tagName;if(t==='INPUT'||t==='TEXTAREA'||t==='SELECT')return;
  var map={
    '4':{ctrl:true,overlay:'v15ClubStatsOverlay'},
    '5':{ctrl:true,overlay:'v15RatingOverlay'},
    'p':{overlay:'v15PartnerOverlay'},
    'w':{overlay:'v15WeatherOverlay'},
    'g':{overlay:'v15GreenOverlay'},
    'n':{overlay:'v15ConditionOverlay'},
    'q':{overlay:'v15QuizOverlay'},
    'x':{overlay:'v15PlannerOverlay'},
    'y':{overlay:'v15RoutineOverlay'},
    'h':{overlay:'v15ShareOverlay'}
  };
  var key=e.key.toLowerCase();
  if(map[key]){
    if(map[key].ctrl&&!e.ctrlKey)return;
    e.preventDefault();
    var el=document.getElementById(map[key].overlay);if(el)el.classList.add('active');
    v15SFX('club_stat');
  }
});

document.addEventListener('keydown',function(e){
  if(e.key==='Escape'){
    var overlays=['v15ClubStatsOverlay','v15RatingOverlay','v15PartnerOverlay','v15WeatherOverlay','v15GreenOverlay','v15ConditionOverlay','v15QuizOverlay','v15PlannerOverlay','v15RoutineOverlay','v15ShareOverlay'];
    overlays.forEach(function(id){var el=document.getElementById(id);if(el)el.classList.remove('active')});
  }
});

// === Init ===
function v15Init(){
  v15ClubStats();
  v15CourseRating();
  v15Partners();
  v15Weather();
  v15GreenReading();
  v15Condition();
  v15GolfQuiz();
  v15ShotPlanner();
  v15RoutineBuilder();
  v15ShareCard();
  v15QuickActions();
  v15CheckAchieve();
}

if(document.readyState==='complete'||document.readyState==='interactive'){setTimeout(v15Init,200)}
else{document.addEventListener('DOMContentLoaded',v15Init)}

})();
