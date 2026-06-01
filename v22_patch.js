(function(){
'use strict';

var css22=document.createElement('style');
css22.textContent=`
.v22-overlay{position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,.88);z-index:10500;display:none;align-items:center;justify-content:center;backdrop-filter:blur(20px)}
.v22-overlay.active{display:flex}
.v22-modal{background:var(--card-bg,#fff);border-radius:28px;padding:32px;width:97%;max-width:920px;max-height:94vh;overflow-y:auto;box-shadow:0 48px 140px rgba(0,0,0,.7);animation:v22Rise .35s cubic-bezier(.22,1,.36,1)}
@keyframes v22Rise{from{opacity:0;transform:translateY(48px) scale(.92)}to{opacity:1;transform:translateY(0) scale(1)}}
.v22-hdr{display:flex;justify-content:space-between;align-items:center;margin-bottom:22px}
.v22-hdr h2{font-size:24px;font-weight:800;display:flex;align-items:center;gap:10px}
.v22-hdr h2 .v22i{font-size:30px}
.v22-x{background:none;border:none;font-size:30px;cursor:pointer;color:var(--text-muted);padding:4px 10px;border-radius:10px;transition:.2s}
.v22-x:hover{background:var(--border);color:var(--text)}
.v22-tabs{display:flex;gap:6px;margin-bottom:18px;overflow-x:auto;padding-bottom:4px;scrollbar-width:none}
.v22-tabs::-webkit-scrollbar{display:none}
.v22-tab{padding:10px 20px;border-radius:26px;border:1.5px solid var(--border);background:var(--bg);font-size:12px;font-weight:700;cursor:pointer;white-space:nowrap;transition:.25s}
.v22-tab.active{background:var(--primary);color:#fff;border-color:var(--primary);box-shadow:0 3px 16px rgba(26,122,58,.35)}
.v22-card{background:var(--bg);border-radius:18px;padding:20px;margin-bottom:12px;transition:.25s;border:1.5px solid transparent}
.v22-card:hover{border-color:var(--primary);transform:translateY(-2px);box-shadow:0 4px 18px rgba(26,122,58,.12)}
.v22-card h4{font-size:15px;font-weight:700;margin-bottom:8px;display:flex;align-items:center;gap:8px}
.v22-card p{font-size:12px;color:var(--text-muted);line-height:1.7}
.v22-btn{padding:11px 24px;border:none;border-radius:14px;font-size:13px;font-weight:700;cursor:pointer;transition:.25s;display:inline-flex;align-items:center;gap:6px}
.v22-btn-primary{background:linear-gradient(135deg,var(--primary),#2e9e4f);color:#fff}
.v22-btn-primary:hover{transform:translateY(-2px);box-shadow:0 8px 22px rgba(26,122,58,.4)}
.v22-btn-sm{padding:7px 14px;font-size:11px;border-radius:10px}
.v22-btn-secondary{background:var(--bg);color:var(--text);border:1.5px solid var(--border)}
.v22-btn-secondary:hover{border-color:var(--primary);color:var(--primary)}
.v22-btn-danger{background:#ff4757;color:#fff}
.v22-input{width:100%;padding:11px 16px;border:2px solid var(--border);border-radius:12px;font-size:13px;background:var(--bg);color:var(--text);transition:.2s}
.v22-input:focus{border-color:var(--primary);outline:none;box-shadow:0 0 0 3px rgba(26,122,58,.12)}
.v22-select{padding:9px 14px;border:2px solid var(--border);border-radius:10px;font-size:13px;background:var(--bg);color:var(--text)}
.v22-grid2{display:grid;grid-template-columns:1fr 1fr;gap:12px}
.v22-grid3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px}
.v22-grid4{display:grid;grid-template-columns:repeat(4,1fr);gap:10px}
@media(max-width:520px){.v22-grid2,.v22-grid3,.v22-grid4{grid-template-columns:1fr}}
.v22-divider{height:1px;background:var(--border);margin:18px 0}
.v22-badge{display:inline-block;padding:5px 14px;border-radius:16px;font-size:11px;font-weight:700}
.v22-progress{width:100%;height:14px;background:var(--border);border-radius:7px;overflow:hidden;margin:8px 0}
.v22-progress-fill{height:100%;border-radius:7px;transition:width .6s ease}
.v22-stat-row{display:flex;justify-content:space-between;align-items:center;padding:13px 0;border-bottom:1px solid var(--border)}
.v22-stat-row:last-child{border-bottom:none}
.v22-club-row{display:flex;gap:12px;align-items:center;padding:14px;background:var(--bg);border-radius:14px;margin-bottom:8px;transition:.25s}
.v22-club-row:hover{border-color:var(--primary);transform:translateY(-1px)}
.v22-club-icon{width:44px;height:44px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:20px;flex-shrink:0}
.v22-club-info{flex:1}
.v22-club-name{font-size:14px;font-weight:700;margin-bottom:2px}
.v22-club-dist{font-size:12px;color:var(--text-muted)}
.v22-club-input{width:60px;padding:6px;text-align:center;border:1.5px solid var(--border);border-radius:8px;font-size:13px;font-weight:700;background:var(--bg);color:var(--text)}
.v22-routine-step{display:flex;gap:12px;align-items:center;padding:14px;background:var(--bg);border-radius:14px;margin-bottom:8px;cursor:pointer;transition:.25s}
.v22-routine-step:hover{background:var(--primary-light)}
.v22-routine-step.done{opacity:.5;text-decoration:line-through}
.v22-routine-num{width:32px;height:32px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:800;flex-shrink:0}
.v22-routine-text{flex:1;font-size:13px;font-weight:600}
.v22-routine-time{font-size:11px;color:var(--primary);font-weight:700}
.v22-note-entry{background:var(--bg);border-radius:16px;padding:16px;margin-bottom:10px;border-left:4px solid #ff6b35}
.v22-note-meta{font-size:11px;color:var(--text-muted);margin-bottom:6px;display:flex;justify-content:space-between}
.v22-note-text{font-size:13px;line-height:1.6}
.v22-note-tags{display:flex;gap:4px;margin-top:6px;flex-wrap:wrap}
.v22-note-tag{padding:3px 8px;border-radius:10px;font-size:10px;font-weight:700;background:var(--primary-light);color:var(--primary)}
.v22-goal-item{background:var(--bg);border-radius:16px;padding:16px;margin-bottom:10px;transition:.25s}
.v22-goal-item.completed{border-left:4px solid #4caf50}
.v22-goal-item.active{border-left:4px solid #ff6b35}
.v22-goal-title{font-size:14px;font-weight:700;margin-bottom:6px;display:flex;justify-content:space-between}
.v22-goal-desc{font-size:12px;color:var(--text-muted);margin-bottom:8px}
.v22-nutri-card{background:var(--bg);border-radius:16px;padding:16px;margin-bottom:10px;display:flex;gap:14px;align-items:center;transition:.25s}
.v22-nutri-card:hover{transform:translateY(-1px)}
.v22-nutri-icon{width:48px;height:48px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:22px;flex-shrink:0}
.v22-nutri-info{flex:1}
.v22-nutri-name{font-size:14px;font-weight:700;margin-bottom:3px}
.v22-nutri-desc{font-size:11px;color:var(--text-muted);line-height:1.5}
.v22-nutri-timing{font-size:10px;color:var(--primary);font-weight:700;margin-top:3px}
.v22-weather-calc{background:var(--bg);border-radius:16px;padding:20px}
.v22-weather-result{background:linear-gradient(135deg,var(--primary-dark),var(--primary));color:#fff;padding:18px;border-radius:14px;text-align:center;margin-top:14px}
.v22-compare-canvas{width:100%;max-width:600px;height:300px;margin:0 auto;display:block;border-radius:16px;border:2px solid var(--border)}
.v22-practice-entry{background:var(--bg);border-radius:14px;padding:14px;margin-bottom:8px;border-left:4px solid var(--primary)}
.v22-practice-date{font-size:11px;color:var(--text-muted);margin-bottom:4px}
.v22-practice-details{font-size:13px;display:flex;gap:12px;flex-wrap:wrap}
.v22-practice-stat{display:flex;align-items:center;gap:4px}
`;
document.head.appendChild(css22);

// ===== 1. PRE-SHOT ROUTINE BUILDER =====
var v22DefaultRoutine=[
  {step:'&#xB4A4;&#xC5D0;&#xC11C; &#xD0C0;&#xAC9F; &#xD655;&#xC778;',time:'3&#xCD08;',icon:'&#x1F3AF;'},
  {step:'&#xD074;&#xB7FD; &#xC120;&#xD0DD; &#xBC0F; &#xAC70;&#xB9AC; &#xD655;&#xC778;',time:'5&#xCD08;',icon:'&#x1F3CC;&#xFE0F;'},
  {step:'&#xBC14;&#xB78C; &#xBC29;&#xD5A5;/&#xC138;&#xAE30; &#xCCB4;&#xD06C;',time:'3&#xCD08;',icon:'&#x1F32C;&#xFE0F;'},
  {step:'&#xBCFC; &#xB4A4; &#xC5BC;&#xB77C;&#xC778;&#xBA3C;&#xD2B8; &#xC124;&#xC815;',time:'5&#xCD08;',icon:'&#x1F9ED;'},
  {step:'&#xC5F0;&#xC2B5; &#xC2A4;&#xC719; 1-2&#xD68C;',time:'5&#xCD08;',icon:'&#x1F504;'},
  {step:'&#xC5B4;&#xB4DC;&#xB808;&#xC2A4; (&#xBC1C; &#xC704;&#xCE58; &#xC870;&#xC815;)',time:'3&#xCD08;',icon:'&#x1F9B6;'},
  {step:'&#xADF8;&#xB9BD; &#xCCB4;&#xD06C; &#xBC0F; &#xC870;&#xC815;',time:'2&#xCD08;',icon:'&#x270B;'},
  {step:'&#xD0C0;&#xAC9F;&#xC5D0; &#xC9D1;&#xC911; (&#xC2DC;&#xC120; &#xACE0;&#xC815;)',time:'3&#xCD08;',icon:'&#x1F440;'},
  {step:'&#xC2EC;&#xD638;&#xD761; (4&#xCD08; &#xD761;&#xC785;-4&#xCD08; &#xD638;&#xD761;)',time:'8&#xCD08;',icon:'&#x1F32C;&#xFE0F;'},
  {step:'&#xC6E8;&#xAE00; (&#xBC18;&#xB3D9;&#xC791; &#xC2DC;&#xC791;)',time:'2&#xCD08;',icon:'&#x1F3CC;&#xFE0F;'},
  {step:'&#xBC31;&#xC2A4;&#xC719; (&#xD14C;&#xC774;&#xD06C;&#xBC31;)',time:'2&#xCD08;',icon:'&#x2B06;&#xFE0F;'},
  {step:'&#xD3C4;&#xB85C;&#xC2A4;&#xB8E8; (&#xD0C0;&#xAC9F; &#xBC29;&#xD5A5;&#xC73C;&#xB85C;)',time:'2&#xCD08;',icon:'&#x2714;&#xFE0F;'}
];

function v22OpenRoutine(){
  var ov=document.getElementById('v22RoutineOverlay');
  if(!ov){
    ov=document.createElement('div');ov.id='v22RoutineOverlay';ov.className='v22-overlay';
    ov.innerHTML='<div class="v22-modal"><div class="v22-hdr"><h2><span class="v22i">&#x1F3AF;</span> &#xD504;&#xB9AC;&#xC0F7; &#xB8E8;&#xD2F4; &#xBE4C;&#xB354;</h2><button class="v22-x" onclick="document.getElementById(\'v22RoutineOverlay\').classList.remove(\'active\')">&times;</button></div><div style="text-align:center;margin-bottom:14px"><span class="v22-badge" style="background:#e8f5e9;color:var(--primary)">&#xC644;&#xB8CC;: <span id="v22RoutineDone">0</span>/12 | &#xCD1D;&#xC2DC;&#xAC04;: <span id="v22RoutineTime">0</span>&#xCD08;</span></div><div id="v22RoutineList"></div><div style="text-align:center;margin-top:14px"><button class="v22-btn v22-btn-primary" onclick="v22RunRoutine()">&#x25B6;&#xFE0F; &#xC21C;&#xCC28; &#xC2E4;&#xD589;</button> <button class="v22-btn v22-btn-secondary" onclick="v22ResetRoutine()">&#x1F504; &#xB9AC;&#xC14B;</button></div></div>';
    document.body.appendChild(ov);
  }
  ov.classList.add('active');
  v22RenderRoutine();
  v22PlaySFX('routine_open');
}

function v22RenderRoutine(){
  var done=JSON.parse(localStorage.getItem('sg_routine_done')||'[]');
  var h='';var totalTime=0;
  v22DefaultRoutine.forEach(function(r,i){
    var isDone=done.indexOf(i)!==-1;
    if(isDone)totalTime+=parseInt(r.time);
    h+='<div class="v22-routine-step'+(isDone?' done':'')+'" onclick="v22ToggleRoutineStep('+i+')"><div class="v22-routine-num" style="background:'+(isDone?'#4caf50':'linear-gradient(135deg,var(--primary),#4ecca3)')+';color:#fff">'+(isDone?'&#x2714;':(i+1))+'</div><div class="v22-routine-text">'+r.icon+' '+r.step+'</div><div class="v22-routine-time">'+r.time+'</div></div>';
  });
  document.getElementById('v22RoutineList').innerHTML=h;
  document.getElementById('v22RoutineDone').textContent=done.length;
  document.getElementById('v22RoutineTime').textContent=totalTime;
}

function v22ToggleRoutineStep(idx){
  var done=JSON.parse(localStorage.getItem('sg_routine_done')||'[]');
  var pos=done.indexOf(idx);
  if(pos===-1){done.push(idx);v22PlaySFX('routine_step');}else{done.splice(pos,1);}
  localStorage.setItem('sg_routine_done',JSON.stringify(done));
  if(done.length>=12)localStorage.setItem('sg_routine_all','1');
  v22RenderRoutine();
}

var v22RunIdx=-1;
function v22RunRoutine(){
  localStorage.setItem('sg_routine_done','[]');
  v22RunIdx=0;
  v22RunNextStep();
}
function v22RunNextStep(){
  if(v22RunIdx>=12){v22Toast('&#x2705; &#xD504;&#xB9AC;&#xC0F7; &#xB8E8;&#xD2F4; &#xC644;&#xB8CC;!');v22PlaySFX('routine_complete');localStorage.setItem('sg_routine_count',''+(parseInt(localStorage.getItem('sg_routine_count')||'0')+1));return;}
  var done=JSON.parse(localStorage.getItem('sg_routine_done')||'[]');
  done.push(v22RunIdx);
  localStorage.setItem('sg_routine_done',JSON.stringify(done));
  v22RenderRoutine();
  v22PlaySFX('routine_step');
  var sec=parseInt(v22DefaultRoutine[v22RunIdx].time);
  v22RunIdx++;
  setTimeout(v22RunNextStep,sec*1000);
}
function v22ResetRoutine(){localStorage.setItem('sg_routine_done','[]');v22RunIdx=-1;v22RenderRoutine();}
window.v22OpenRoutine=v22OpenRoutine;window.v22ToggleRoutineStep=v22ToggleRoutineStep;
window.v22RunRoutine=v22RunRoutine;window.v22ResetRoutine=v22ResetRoutine;

// ===== 2. CLUB DISTANCE MANAGER =====
var v22ClubDefaults=[
  {name:'&#xB4DC;&#xB77C;&#xC774;&#xBC84;',icon:'&#x1F3CC;&#xFE0F;',avg:220,max:250,loft:'9-12&#xB3C4;'},
  {name:'3&#xBC88;&#xC6B0;&#xB4DC;',icon:'&#x1F332;',avg:200,max:230,loft:'15&#xB3C4;'},
  {name:'5&#xBC88;&#xC6B0;&#xB4DC;',icon:'&#x1F332;',avg:185,max:210,loft:'18&#xB3C4;'},
  {name:'3&#xBC88; &#xD558;&#xC774;&#xBE0C;&#xB9AC;&#xB4DC;',icon:'&#x1F528;',avg:190,max:215,loft:'19&#xB3C4;'},
  {name:'4&#xBC88; &#xD558;&#xC774;&#xBE0C;&#xB9AC;&#xB4DC;',icon:'&#x1F528;',avg:180,max:200,loft:'22&#xB3C4;'},
  {name:'5&#xBC88; &#xC544;&#xC774;&#xC5B8;',icon:'&#x1F3F7;&#xFE0F;',avg:165,max:185,loft:'25&#xB3C4;'},
  {name:'6&#xBC88; &#xC544;&#xC774;&#xC5B8;',icon:'&#x1F3F7;&#xFE0F;',avg:155,max:175,loft:'28&#xB3C4;'},
  {name:'7&#xBC88; &#xC544;&#xC774;&#xC5B8;',icon:'&#x1F3F7;&#xFE0F;',avg:145,max:165,loft:'32&#xB3C4;'},
  {name:'8&#xBC88; &#xC544;&#xC774;&#xC5B8;',icon:'&#x1F3F7;&#xFE0F;',avg:135,max:150,loft:'36&#xB3C4;'},
  {name:'9&#xBC88; &#xC544;&#xC774;&#xC5B8;',icon:'&#x1F3F7;&#xFE0F;',avg:125,max:140,loft:'40&#xB3C4;'},
  {name:'PW (&#xD53C;&#xCE6D;&#xC6E8;&#xC9C0;)',icon:'&#x26F3;',avg:110,max:130,loft:'44&#xB3C4;'},
  {name:'GW (&#xAC6B;&#xC6E8;&#xC9C0;)',icon:'&#x26F3;',avg:95,max:115,loft:'50&#xB3C4;'},
  {name:'SW (&#xC0CC;&#xB4DC;&#xC6E8;&#xC9C0;)',icon:'&#x26F3;',avg:80,max:100,loft:'56&#xB3C4;'},
  {name:'LW (&#xB85C;&#xBE0C;&#xC6E8;&#xC9C0;)',icon:'&#x26F3;',avg:60,max:80,loft:'60&#xB3C4;'}
];

function v22OpenClub(){
  var ov=document.getElementById('v22ClubOverlay');
  if(!ov){
    ov=document.createElement('div');ov.id='v22ClubOverlay';ov.className='v22-overlay';
    ov.innerHTML='<div class="v22-modal"><div class="v22-hdr"><h2><span class="v22i">&#x1F3CC;&#xFE0F;</span> &#xD074;&#xB7FD; &#xAC70;&#xB9AC; &#xB9E4;&#xB2C8;&#xC800;</h2><button class="v22-x" onclick="document.getElementById(\'v22ClubOverlay\').classList.remove(\'active\')">&times;</button></div><p style="font-size:12px;color:var(--text-muted);margin-bottom:14px">&#xAC01; &#xD074;&#xB7FD;&#xC758; &#xD3C9;&#xADE0;/&#xCD5C;&#xB300; &#xBE44;&#xAC70;&#xB9AC;&#xB97C; &#xC785;&#xB825;&#xD558;&#xC138;&#xC694; (&#xC57C;&#xB4DC;)</p><div id="v22ClubList"></div><div style="text-align:center;margin-top:14px"><button class="v22-btn v22-btn-primary" onclick="v22SaveClubs()">&#x1F4BE; &#xC800;&#xC7A5;</button> <button class="v22-btn v22-btn-secondary" onclick="v22ResetClubs()">&#xAE30;&#xBCF8;&#xAC12; &#xBCF5;&#xC6D0;</button></div><div class="v22-divider"></div><canvas id="v22ClubChart" class="v22-compare-canvas" width="600" height="300"></canvas></div>';
    document.body.appendChild(ov);
  }
  ov.classList.add('active');
  v22RenderClubs();
  v22PlaySFX('club_open');
}

function v22GetClubData(){
  var saved=JSON.parse(localStorage.getItem('sg_clubs')||'null');
  if(saved&&saved.length===14)return saved;
  return v22ClubDefaults.map(function(c){return{name:c.name,avg:c.avg,max:c.max};});
}

function v22RenderClubs(){
  var data=v22GetClubData();
  var h='';
  v22ClubDefaults.forEach(function(c,i){
    h+='<div class="v22-club-row"><div class="v22-club-icon" style="background:linear-gradient(135deg,var(--primary),#4ecca3);color:#fff">'+c.icon+'</div><div class="v22-club-info"><div class="v22-club-name">'+c.name+'</div><div class="v22-club-dist">&#xB85C;&#xD504;&#xD2B8;: '+c.loft+'</div></div><div style="text-align:center"><label style="font-size:10px;font-weight:700;display:block">&#xD3C9;&#xADE0;</label><input type="number" class="v22-club-input" id="v22CAvg'+i+'" value="'+data[i].avg+'" min="0" max="350"></div><div style="text-align:center"><label style="font-size:10px;font-weight:700;display:block">&#xCD5C;&#xB300;</label><input type="number" class="v22-club-input" id="v22CMax'+i+'" value="'+data[i].max+'" min="0" max="400"></div></div>';
  });
  document.getElementById('v22ClubList').innerHTML=h;
  setTimeout(v22DrawClubChart,100);
}

function v22SaveClubs(){
  var data=[];
  v22ClubDefaults.forEach(function(c,i){
    data.push({name:c.name,avg:parseInt(document.getElementById('v22CAvg'+i).value)||0,max:parseInt(document.getElementById('v22CMax'+i).value)||0});
  });
  localStorage.setItem('sg_clubs',JSON.stringify(data));
  localStorage.setItem('sg_clubs_saved','1');
  v22Toast('&#x2705; &#xD074;&#xB7FD; &#xAC70;&#xB9AC; &#xC800;&#xC7A5; &#xC644;&#xB8CC;!');
  v22PlaySFX('club_save');
  v22DrawClubChart();
}

function v22ResetClubs(){
  localStorage.removeItem('sg_clubs');
  v22RenderClubs();
  v22Toast('&#x1F504; &#xAE30;&#xBCF8;&#xAC12;&#xC73C;&#xB85C; &#xBCF5;&#xC6D0;');
}

function v22DrawClubChart(){
  var canvas=document.getElementById('v22ClubChart');if(!canvas)return;
  var ctx=canvas.getContext('2d');
  var W=canvas.width=canvas.offsetWidth||600;var H=canvas.height=300;
  var data=v22GetClubData();
  var maxD=Math.max.apply(null,data.map(function(d){return d.max;}))||250;
  var isDark=document.documentElement.getAttribute('data-theme')==='dark';
  ctx.clearRect(0,0,W,H);
  var padL=50,padR=10,padT=20,padB=60;
  var plotW=W-padL-padR;var plotH=H-padT-padB;
  var barW=Math.floor(plotW/14)-6;
  ctx.strokeStyle=isDark?'rgba(255,255,255,0.1)':'rgba(0,0,0,0.08)';ctx.lineWidth=0.5;
  for(var g=0;g<=5;g++){
    var gy=padT+plotH-plotH*g/5;
    ctx.beginPath();ctx.moveTo(padL,gy);ctx.lineTo(W-padR,gy);ctx.stroke();
    ctx.fillStyle=isDark?'rgba(255,255,255,0.4)':'rgba(0,0,0,0.4)';ctx.font='9px sans-serif';ctx.textAlign='right';
    ctx.fillText(Math.round(maxD*g/5)+'y',padL-4,gy+3);
  }
  data.forEach(function(d,i){
    var x=padL+i*(barW+6)+3;
    var hAvg=d.avg/maxD*plotH;
    var hMax=d.max/maxD*plotH;
    ctx.fillStyle='rgba(26,122,58,0.25)';
    ctx.fillRect(x,padT+plotH-hMax,barW,hMax);
    var grad=ctx.createLinearGradient(0,padT+plotH-hAvg,0,padT+plotH);
    grad.addColorStop(0,'#1a7a3a');grad.addColorStop(1,'#4ecca3');
    ctx.fillStyle=grad;
    ctx.fillRect(x,padT+plotH-hAvg,barW,hAvg);
    ctx.fillStyle=isDark?'#ccc':'#333';ctx.font='bold 9px sans-serif';ctx.textAlign='center';
    ctx.fillText(d.avg,x+barW/2,padT+plotH-hAvg-4);
    ctx.save();ctx.translate(x+barW/2,H-5);ctx.rotate(-Math.PI/4);
    ctx.fillStyle=isDark?'rgba(255,255,255,0.5)':'rgba(0,0,0,0.5)';ctx.font='8px sans-serif';ctx.textAlign='right';
    var label=v22ClubDefaults[i].name.replace(/&#x[^;]+;/g,'');
    if(label.length>6)label=label.substring(0,6);
    ctx.fillText(label,0,0);ctx.restore();
  });
}
window.v22OpenClub=v22OpenClub;window.v22SaveClubs=v22SaveClubs;window.v22ResetClubs=v22ResetClubs;

// ===== 3. PRACTICE LOG TRACKER =====
function v22OpenPractice(){
  var ov=document.getElementById('v22PracticeOverlay');
  if(!ov){
    ov=document.createElement('div');ov.id='v22PracticeOverlay';ov.className='v22-overlay';
    ov.innerHTML='<div class="v22-modal"><div class="v22-hdr"><h2><span class="v22i">&#x1F4DD;</span> &#xC5F0;&#xC2B5; &#xB85C;&#xADF8;</h2><button class="v22-x" onclick="document.getElementById(\'v22PracticeOverlay\').classList.remove(\'active\')">&times;</button></div><div class="v22-card"><h4>&#x2795; &#xC0C8; &#xC5F0;&#xC2B5; &#xAE30;&#xB85D;</h4><div class="v22-grid3"><div><label style="font-size:11px;font-weight:700">&#xC720;&#xD615;</label><select id="v22PracType" class="v22-select" style="width:100%"><option value="range">&#x1F3CC;&#xFE0F; &#xB4DC;&#xB77C;&#xC774;&#xBE59;&#xB808;&#xC778;&#xC9C0;</option><option value="putting">&#x26F3; &#xD37C;&#xD305;&#xC5F0;&#xC2B5;</option><option value="chipping">&#x26F3; &#xC5B4;&#xD504;&#xB85C;&#xCE58;/&#xCE69;</option><option value="bunker">&#x1F3D6;&#xFE0F; &#xBC99;&#xCEE4;&#xC5F0;&#xC2B5;</option><option value="simulator">&#x1F4BB; &#xC2A4;&#xD06C;&#xB9B0;&#xACE8;&#xD504;</option></select></div><div><label style="font-size:11px;font-weight:700">&#xC2DC;&#xAC04;(&#xBD84;)</label><input type="number" id="v22PracDur" class="v22-input" value="60" min="10" max="300"></div><div><label style="font-size:11px;font-weight:700">&#xACF5; &#xC218;</label><input type="number" id="v22PracBalls" class="v22-input" value="100" min="0" max="500"></div></div><div style="margin-top:8px"><label style="font-size:11px;font-weight:700">&#xBA54;&#xBAA8;</label><input type="text" id="v22PracMemo" class="v22-input" placeholder="&#xC624;&#xB298; &#xC5F0;&#xC2B5; &#xD3EC;&#xCEE4;&#xC2A4;..." maxlength="100"></div><div style="text-align:right;margin-top:8px"><button class="v22-btn v22-btn-primary" onclick="v22SavePractice()">&#x1F4BE; &#xC800;&#xC7A5;</button></div></div><div class="v22-divider"></div><div class="v22-grid4" id="v22PracStats"></div><div class="v22-divider"></div><div id="v22PracList"></div></div>';
    document.body.appendChild(ov);
  }
  ov.classList.add('active');
  v22RenderPractice();
  v22PlaySFX('practice_open');
}

function v22SavePractice(){
  var type=document.getElementById('v22PracType').value;
  var dur=parseInt(document.getElementById('v22PracDur').value)||60;
  var balls=parseInt(document.getElementById('v22PracBalls').value)||0;
  var memo=document.getElementById('v22PracMemo').value.trim().replace(/</g,'&lt;').replace(/>/g,'&gt;');
  var logs=JSON.parse(localStorage.getItem('sg_practice')||'[]');
  logs.unshift({date:new Date().toISOString().slice(0,10),type:type,dur:dur,balls:balls,memo:memo});
  if(logs.length>100)logs.pop();
  localStorage.setItem('sg_practice',JSON.stringify(logs));
  localStorage.setItem('sg_practice_cnt',''+logs.length);
  document.getElementById('v22PracMemo').value='';
  v22RenderPractice();
  v22Toast('&#x2705; &#xC5F0;&#xC2B5; &#xAE30;&#xB85D; &#xC800;&#xC7A5;!');
  v22PlaySFX('practice_save');
}

function v22RenderPractice(){
  var logs=JSON.parse(localStorage.getItem('sg_practice')||'[]');
  var typeLabels={range:'&#x1F3CC;&#xFE0F; &#xB4DC;&#xB77C;&#xC774;&#xBE59;',putting:'&#x26F3; &#xD37C;&#xD305;',chipping:'&#x26F3; &#xCE69;/&#xC5B4;&#xD504;&#xB85C;&#xCE58;',bunker:'&#x1F3D6;&#xFE0F; &#xBC99;&#xCEE4;',simulator:'&#x1F4BB; &#xC2A4;&#xD06C;&#xB9B0;&#xACE8;&#xD504;'};
  var totalMin=0;var totalBalls=0;var weekMin=0;var weekCount=0;
  var now=new Date();var weekAgo=new Date(now.getTime()-7*24*60*60*1000);
  logs.forEach(function(l){
    totalMin+=l.dur;totalBalls+=l.balls;
    if(new Date(l.date)>=weekAgo){weekMin+=l.dur;weekCount++;}
  });
  document.getElementById('v22PracStats').innerHTML=
    '<div class="v22-card" style="text-align:center"><div style="font-size:20px;font-weight:900;color:var(--primary)">'+logs.length+'</div><div style="font-size:10px;color:var(--text-muted)">&#xCD1D; &#xC5F0;&#xC2B5;</div></div>'+
    '<div class="v22-card" style="text-align:center"><div style="font-size:20px;font-weight:900;color:var(--primary)">'+(totalMin>=60?Math.floor(totalMin/60)+'h '+totalMin%60+'m':totalMin+'m')+'</div><div style="font-size:10px;color:var(--text-muted)">&#xCD1D; &#xC2DC;&#xAC04;</div></div>'+
    '<div class="v22-card" style="text-align:center"><div style="font-size:20px;font-weight:900;color:var(--accent)">'+totalBalls+'</div><div style="font-size:10px;color:var(--text-muted)">&#xCD1D; &#xACF5;</div></div>'+
    '<div class="v22-card" style="text-align:center"><div style="font-size:20px;font-weight:900;color:#2196f3">'+weekCount+'</div><div style="font-size:10px;color:var(--text-muted)">&#xC8FC;&#xAC04; &#xC5F0;&#xC2B5;</div></div>';
  var h='';
  if(logs.length===0){h='<p style="text-align:center;color:var(--text-muted);padding:20px">&#xC544;&#xC9C1; &#xC5F0;&#xC2B5; &#xAE30;&#xB85D;&#xC774; &#xC5C6;&#xC2B5;&#xB2C8;&#xB2E4;</p>';}
  logs.slice(0,20).forEach(function(l){
    h+='<div class="v22-practice-entry"><div class="v22-practice-date">'+l.date+'</div><div class="v22-practice-details"><span class="v22-practice-stat">'+(typeLabels[l.type]||l.type)+'</span><span class="v22-practice-stat">&#x23F1; '+l.dur+'&#xBD84;</span><span class="v22-practice-stat">&#x26BE; '+l.balls+'&#xACF5;</span></div>'+(l.memo?'<div style="font-size:11px;color:var(--text-muted);margin-top:4px">'+l.memo+'</div>':'')+'</div>';
  });
  document.getElementById('v22PracList').innerHTML=h;
}
window.v22OpenPractice=v22OpenPractice;window.v22SavePractice=v22SavePractice;

// ===== 4. COURSE STRATEGY NOTEBOOK =====
function v22OpenNotes(){
  var ov=document.getElementById('v22NotesOverlay');
  if(!ov){
    ov=document.createElement('div');ov.id='v22NotesOverlay';ov.className='v22-overlay';
    ov.innerHTML='<div class="v22-modal"><div class="v22-hdr"><h2><span class="v22i">&#x1F4D4;</span> &#xCF54;&#xC2A4; &#xACF5;&#xB7B5; &#xB178;&#xD2B8;</h2><button class="v22-x" onclick="document.getElementById(\'v22NotesOverlay\').classList.remove(\'active\')">&times;</button></div><div class="v22-card"><h4>&#x270F;&#xFE0F; &#xC0C8; &#xB178;&#xD2B8;</h4><div class="v22-grid2"><div><label style="font-size:11px;font-weight:700">&#xACE8;&#xD504;&#xC7A5;</label><input type="text" id="v22NoteCourse" class="v22-input" placeholder="&#xACE8;&#xD504;&#xC7A5; &#xC774;&#xB984;" maxlength="30"></div><div><label style="font-size:11px;font-weight:700">&#xD640; &#xBC88;&#xD638;</label><select id="v22NoteHole" class="v22-select" style="width:100%"><option value="&#xC804;&#xCCB4;">&#xC804;&#xCCB4;</option><option value="1H">1H</option><option value="2H">2H</option><option value="3H">3H</option><option value="4H">4H</option><option value="5H">5H</option><option value="6H">6H</option><option value="7H">7H</option><option value="8H">8H</option><option value="9H">9H</option><option value="10H">10H</option><option value="11H">11H</option><option value="12H">12H</option><option value="13H">13H</option><option value="14H">14H</option><option value="15H">15H</option><option value="16H">16H</option><option value="17H">17H</option><option value="18H">18H</option></select></div></div><div style="margin-top:8px"><label style="font-size:11px;font-weight:700">&#xC804;&#xB7B5; &#xBA54;&#xBAA8;</label><textarea id="v22NoteText" class="v22-input" rows="3" placeholder="&#xD2F0;&#xC0F7;: &#xC67C;&#xCABD; OB &#xC8FC;&#xC758;, &#xADF8;&#xB9B0;: &#xC55E;&#xD3B0; &#xACBD;&#xC0AC;..." style="resize:vertical" maxlength="300"></textarea></div><div style="margin-top:8px"><label style="font-size:11px;font-weight:700">&#xD0DC;&#xADF8;</label><div style="display:flex;gap:4px;flex-wrap:wrap" id="v22NoteTags"><span class="v22-note-tag" style="cursor:pointer" onclick="this.classList.toggle(\'active\')" data-tag="OB&#xC8FC;&#xC758;">OB&#xC8FC;&#xC758;</span><span class="v22-note-tag" style="cursor:pointer" onclick="this.classList.toggle(\'active\')" data-tag="&#xBCFC;&#xC6CC;&#xD130;">&#xBCFC;&#xC6CC;&#xD130;</span><span class="v22-note-tag" style="cursor:pointer" onclick="this.classList.toggle(\'active\')" data-tag="&#xBC14;&#xB78C;&#xC8FC;&#xC758;">&#xBC14;&#xB78C;&#xC8FC;&#xC758;</span><span class="v22-note-tag" style="cursor:pointer" onclick="this.classList.toggle(\'active\')" data-tag="&#xADF8;&#xB9B0;&#xACBD;&#xC0AC;">&#xADF8;&#xB9B0;&#xACBD;&#xC0AC;</span><span class="v22-note-tag" style="cursor:pointer" onclick="this.classList.toggle(\'active\')" data-tag="&#xBC99;&#xCEE4;">&#xBC99;&#xCEE4;</span><span class="v22-note-tag" style="cursor:pointer" onclick="this.classList.toggle(\'active\')" data-tag="&#xB808;&#xC774;&#xC5C5;">&#xB808;&#xC774;&#xC5C5;</span></div></div><div style="text-align:right;margin-top:8px"><button class="v22-btn v22-btn-primary" onclick="v22SaveNote()">&#x1F4BE; &#xC800;&#xC7A5;</button></div></div><div class="v22-divider"></div><div id="v22NoteList"></div></div>';
    document.body.appendChild(ov);
  }
  ov.classList.add('active');
  v22RenderNotes();
  v22PlaySFX('notes_open');
}

function v22SaveNote(){
  var course=document.getElementById('v22NoteCourse').value.trim().replace(/</g,'&lt;');
  var hole=document.getElementById('v22NoteHole').value;
  var text=document.getElementById('v22NoteText').value.trim().replace(/</g,'&lt;').replace(/>/g,'&gt;');
  if(!course||!text){v22Toast('&#x26A0;&#xFE0F; &#xACE8;&#xD504;&#xC7A5;&#xACFC; &#xBA54;&#xBAA8;&#xB97C; &#xC785;&#xB825;&#xD574;&#xC8FC;&#xC138;&#xC694;');return;}
  var tags=[];document.querySelectorAll('#v22NoteTags .v22-note-tag.active').forEach(function(t){tags.push(t.dataset.tag);});
  var notes=JSON.parse(localStorage.getItem('sg_course_notes')||'[]');
  notes.unshift({date:new Date().toISOString().slice(0,10),course:course,hole:hole,text:text,tags:tags});
  if(notes.length>100)notes.pop();
  localStorage.setItem('sg_course_notes',JSON.stringify(notes));
  localStorage.setItem('sg_notes_cnt',''+notes.length);
  document.getElementById('v22NoteText').value='';
  document.querySelectorAll('#v22NoteTags .v22-note-tag').forEach(function(t){t.classList.remove('active');});
  v22RenderNotes();
  v22Toast('&#x1F4D4; &#xCF54;&#xC2A4; &#xB178;&#xD2B8; &#xC800;&#xC7A5;!');
  v22PlaySFX('notes_save');
}

function v22RenderNotes(){
  var notes=JSON.parse(localStorage.getItem('sg_course_notes')||'[]');
  var h='';
  if(notes.length===0){h='<p style="text-align:center;color:var(--text-muted);padding:20px">&#xC544;&#xC9C1; &#xC791;&#xC131;&#xD55C; &#xB178;&#xD2B8;&#xAC00; &#xC5C6;&#xC2B5;&#xB2C8;&#xB2E4;</p>';}
  notes.slice(0,20).forEach(function(n,i){
    h+='<div class="v22-note-entry"><div class="v22-note-meta"><span>'+n.course+' | '+n.hole+' | '+n.date+'</span><button class="v22-btn v22-btn-sm" style="background:#ff4757;color:#fff;padding:3px 8px" onclick="v22DelNote('+i+')">&#x1F5D1;</button></div><div class="v22-note-text">'+n.text+'</div>'+(n.tags&&n.tags.length?'<div class="v22-note-tags">'+n.tags.map(function(t){return '<span class="v22-note-tag">'+t+'</span>';}).join('')+'</div>':'')+'</div>';
  });
  document.getElementById('v22NoteList').innerHTML=h;
}
function v22DelNote(idx){
  var notes=JSON.parse(localStorage.getItem('sg_course_notes')||'[]');
  notes.splice(idx,1);localStorage.setItem('sg_course_notes',JSON.stringify(notes));
  localStorage.setItem('sg_notes_cnt',''+notes.length);v22RenderNotes();v22Toast('&#x1F5D1; &#xC0AD;&#xC81C;&#xB428;');
}
window.v22OpenNotes=v22OpenNotes;window.v22SaveNote=v22SaveNote;window.v22DelNote=v22DelNote;

// ===== 5. GOLF GOAL PLANNER =====
function v22OpenGoals(){
  var ov=document.getElementById('v22GoalsOverlay');
  if(!ov){
    ov=document.createElement('div');ov.id='v22GoalsOverlay';ov.className='v22-overlay';
    ov.innerHTML='<div class="v22-modal"><div class="v22-hdr"><h2><span class="v22i">&#x1F3AF;</span> &#xACE8;&#xD504; &#xBAA9;&#xD45C; &#xD50C;&#xB798;&#xB108;</h2><button class="v22-x" onclick="document.getElementById(\'v22GoalsOverlay\').classList.remove(\'active\')">&times;</button></div><div class="v22-card"><h4>&#x2795; &#xC0C8; &#xBAA9;&#xD45C;</h4><div class="v22-grid2"><div><label style="font-size:11px;font-weight:700">&#xBAA9;&#xD45C;</label><input type="text" id="v22GoalTitle" class="v22-input" placeholder="&#xC608;: &#xBCA0;&#xC2A4;&#xD2B8; 90&#xD0C0; &#xAE68;&#xAE30;" maxlength="40"></div><div><label style="font-size:11px;font-weight:700">&#xAE30;&#xAC04;</label><select id="v22GoalPeriod" class="v22-select" style="width:100%"><option value="weekly">&#xC8FC;&#xAC04;</option><option value="monthly">&#xC6D4;&#xAC04;</option><option value="season">&#xC2DC;&#xC98C;</option><option value="yearly">&#xC5F0;&#xAC04;</option></select></div></div><div style="margin-top:8px"><label style="font-size:11px;font-weight:700">&#xC0C1;&#xC138; &#xC124;&#xBA85;</label><input type="text" id="v22GoalDesc" class="v22-input" placeholder="&#xAD6C;&#xCCB4;&#xC801;&#xC778; &#xC2E4;&#xD589; &#xBC29;&#xBC95;..." maxlength="80"></div><div style="text-align:right;margin-top:8px"><button class="v22-btn v22-btn-primary" onclick="v22AddGoal()">&#x2795; &#xCD94;&#xAC00;</button></div></div><div class="v22-divider"></div><div id="v22GoalList"></div></div>';
    document.body.appendChild(ov);
  }
  ov.classList.add('active');
  v22RenderGoals();
  v22PlaySFX('goals_open');
}

function v22AddGoal(){
  var title=document.getElementById('v22GoalTitle').value.trim().replace(/</g,'&lt;');
  if(!title){v22Toast('&#x26A0;&#xFE0F; &#xBAA9;&#xD45C;&#xB97C; &#xC785;&#xB825;&#xD574;&#xC8FC;&#xC138;&#xC694;');return;}
  var period=document.getElementById('v22GoalPeriod').value;
  var desc=document.getElementById('v22GoalDesc').value.trim().replace(/</g,'&lt;').replace(/>/g,'&gt;');
  var goals=JSON.parse(localStorage.getItem('sg_goals')||'[]');
  goals.unshift({title:title,period:period,desc:desc,created:new Date().toISOString().slice(0,10),completed:false,progress:0});
  localStorage.setItem('sg_goals',JSON.stringify(goals));
  localStorage.setItem('sg_goals_cnt',''+goals.length);
  document.getElementById('v22GoalTitle').value='';document.getElementById('v22GoalDesc').value='';
  v22RenderGoals();v22Toast('&#x1F3AF; &#xBAA9;&#xD45C; &#xCD94;&#xAC00;!');v22PlaySFX('goals_add');
}

function v22RenderGoals(){
  var goals=JSON.parse(localStorage.getItem('sg_goals')||'[]');
  var periodLabels={weekly:'&#x1F4C5; &#xC8FC;&#xAC04;',monthly:'&#x1F5D3;&#xFE0F; &#xC6D4;&#xAC04;',season:'&#x2600;&#xFE0F; &#xC2DC;&#xC98C;',yearly:'&#x1F389; &#xC5F0;&#xAC04;'};
  var h='';
  if(goals.length===0){h='<p style="text-align:center;color:var(--text-muted);padding:20px">&#xC124;&#xC815;&#xB41C; &#xBAA9;&#xD45C;&#xAC00; &#xC5C6;&#xC2B5;&#xB2C8;&#xB2E4;</p>';}
  goals.forEach(function(g,i){
    h+='<div class="v22-goal-item '+(g.completed?'completed':'active')+'"><div class="v22-goal-title"><span>'+(g.completed?'&#x2705; ':'')+g.title+'</span><span style="font-size:11px;color:var(--text-muted)">'+(periodLabels[g.period]||g.period)+'</span></div>'+(g.desc?'<div class="v22-goal-desc">'+g.desc+'</div>':'')+'<div class="v22-progress"><div class="v22-progress-fill" style="width:'+g.progress+'%;background:linear-gradient(90deg,var(--primary),#4ecca3)"></div></div><div style="display:flex;gap:6px;align-items:center;margin-top:8px"><input type="range" min="0" max="100" value="'+g.progress+'" style="flex:1;accent-color:var(--primary)" onchange="v22UpdateGoalProgress('+i+',this.value)"><span style="font-size:12px;font-weight:700;color:var(--primary);min-width:36px">'+g.progress+'%</span><button class="v22-btn v22-btn-sm '+(g.completed?'v22-btn-secondary':'v22-btn-primary')+'" onclick="v22ToggleGoal('+i+')">'+(g.completed?'&#xCDE8;&#xC18C;':'&#xC644;&#xB8CC;')+'</button><button class="v22-btn v22-btn-sm" style="background:#ff4757;color:#fff" onclick="v22DelGoal('+i+')">&#x1F5D1;</button></div></div>';
  });
  document.getElementById('v22GoalList').innerHTML=h;
}
function v22UpdateGoalProgress(idx,val){
  var goals=JSON.parse(localStorage.getItem('sg_goals')||'[]');
  goals[idx].progress=parseInt(val);
  if(parseInt(val)>=100)goals[idx].completed=true;
  localStorage.setItem('sg_goals',JSON.stringify(goals));v22RenderGoals();
}
function v22ToggleGoal(idx){
  var goals=JSON.parse(localStorage.getItem('sg_goals')||'[]');
  goals[idx].completed=!goals[idx].completed;
  if(goals[idx].completed){goals[idx].progress=100;v22PlaySFX('goals_complete');}
  localStorage.setItem('sg_goals',JSON.stringify(goals));v22RenderGoals();
}
function v22DelGoal(idx){
  var goals=JSON.parse(localStorage.getItem('sg_goals')||'[]');goals.splice(idx,1);
  localStorage.setItem('sg_goals',JSON.stringify(goals));localStorage.setItem('sg_goals_cnt',''+goals.length);
  v22RenderGoals();v22Toast('&#x1F5D1; &#xC0AD;&#xC81C;&#xB428;');
}
window.v22OpenGoals=v22OpenGoals;window.v22AddGoal=v22AddGoal;
window.v22UpdateGoalProgress=v22UpdateGoalProgress;window.v22ToggleGoal=v22ToggleGoal;window.v22DelGoal=v22DelGoal;

// ===== 6. WEATHER CLUB ADJUSTMENT GUIDE =====
function v22OpenWeatherClub(){
  var ov=document.getElementById('v22WeatherClubOverlay');
  if(!ov){
    ov=document.createElement('div');ov.id='v22WeatherClubOverlay';ov.className='v22-overlay';
    ov.innerHTML='<div class="v22-modal"><div class="v22-hdr"><h2><span class="v22i">&#x1F321;&#xFE0F;</span> &#xB0A0;&#xC528; &#xD074;&#xB7FD; &#xC870;&#xC815;</h2><button class="v22-x" onclick="document.getElementById(\'v22WeatherClubOverlay\').classList.remove(\'active\')">&times;</button></div><div class="v22-weather-calc"><h4 style="font-size:15px;font-weight:700;margin-bottom:12px">&#x2699;&#xFE0F; &#xC870;&#xAC74; &#xC785;&#xB825;</h4><div class="v22-grid2"><div><label style="font-size:11px;font-weight:700">&#xAE30;&#xC628; (&deg;C)</label><input type="number" id="v22WTemp" class="v22-input" value="20" min="-10" max="45"></div><div><label style="font-size:11px;font-weight:700">&#xBC14;&#xB78C; (m/s)</label><input type="number" id="v22WWind" class="v22-input" value="0" min="0" max="20"></div><div><label style="font-size:11px;font-weight:700">&#xBC14;&#xB78C; &#xBC29;&#xD5A5;</label><select id="v22WDir" class="v22-select" style="width:100%"><option value="none">&#xC5C6;&#xC74C;</option><option value="head">&#xC5ED;&#xD48D; (&#xB9DE;&#xBC14;&#xB78C;)</option><option value="tail">&#xC21C;&#xD48D; (&#xB4B7;&#xBC14;&#xB78C;)</option><option value="cross">&#xCE21;&#xD48D;</option></select></div><div><label style="font-size:11px;font-weight:700">&#xACE0;&#xB3C4; (m)</label><input type="number" id="v22WAlt" class="v22-input" value="0" min="0" max="2000"></div></div><div style="margin-top:10px"><label style="font-size:11px;font-weight:700">&#xBAA9;&#xD45C; &#xAC70;&#xB9AC; (&#xC57C;&#xB4DC;)</label><input type="number" id="v22WDist" class="v22-input" value="150" min="30" max="300"></div><div style="text-align:center;margin-top:12px"><button class="v22-btn v22-btn-primary" onclick="v22CalcWeather()">&#x1F4CA; &#xBCF4;&#xC815; &#xACC4;&#xC0B0;</button></div></div><div id="v22WeatherResult"></div><div class="v22-divider"></div><div class="v22-card"><h4>&#x1F4A1; &#xBCF4;&#xC815; &#xC6D0;&#xB9AC;</h4><p>&#x2022; <strong>&#xAE30;&#xC628;</strong>: 20&deg;C &#xAE30;&#xC900;, 10&deg;C&#xB2F9; &#xC57D; 2% &#xAC70;&#xB9AC; &#xBCC0;&#xD654;<br>&#x2022; <strong>&#xC5ED;&#xD48D;</strong>: 1m/s&#xB2F9; &#xC57D; 1.5% &#xAC70;&#xB9AC; &#xAC10;&#xC18C;<br>&#x2022; <strong>&#xC21C;&#xD48D;</strong>: 1m/s&#xB2F9; &#xC57D; 1% &#xAC70;&#xB9AC; &#xC99D;&#xAC00;<br>&#x2022; <strong>&#xCE21;&#xD48D;</strong>: 1m/s&#xB2F9; &#xC57D; 0.5% &#xAC10;&#xC18C; (&#xCE21;&#xBA74; &#xC800;&#xD56D;)<br>&#x2022; <strong>&#xACE0;&#xB3C4;</strong>: 300m&#xB2F9; &#xC57D; 2% &#xAC70;&#xB9AC; &#xC99D;&#xAC00; (&#xACF5;&#xAE30; &#xBC00;&#xB3C4; &#xAC10;&#xC18C;)</p></div></div>';
    document.body.appendChild(ov);
  }
  ov.classList.add('active');
  v22PlaySFX('weather_club_open');
}

function v22CalcWeather(){
  var temp=parseInt(document.getElementById('v22WTemp').value)||20;
  var wind=parseInt(document.getElementById('v22WWind').value)||0;
  var dir=document.getElementById('v22WDir').value;
  var alt=parseInt(document.getElementById('v22WAlt').value)||0;
  var dist=parseInt(document.getElementById('v22WDist').value)||150;
  var tempAdj=(temp-20)*0.002*dist;
  var windAdj=0;
  if(dir==='head')windAdj=-wind*0.015*dist;
  else if(dir==='tail')windAdj=wind*0.01*dist;
  else if(dir==='cross')windAdj=-wind*0.005*dist;
  var altAdj=alt/300*0.02*dist;
  var totalAdj=tempAdj+windAdj+altAdj;
  var adjusted=Math.round(dist+totalAdj);
  var clubs=v22GetClubData();
  var recommended='';
  for(var i=0;i<clubs.length;i++){
    if(clubs[i].avg>=adjusted-8&&clubs[i].avg<=adjusted+8){
      recommended=v22ClubDefaults[i].name+' (&#xD3C9;&#xADE0; '+clubs[i].avg+'y)';break;
    }
  }
  if(!recommended){
    for(var i=0;i<clubs.length;i++){
      if(clubs[i].avg>=adjusted-15&&clubs[i].avg<=adjusted+15){
        recommended=v22ClubDefaults[i].name+' (&#xD3C9;&#xADE0; '+clubs[i].avg+'y)';break;
      }
    }
  }
  var h='<div class="v22-weather-result"><div style="font-size:12px;opacity:.8;margin-bottom:6px">&#xBCF4;&#xC815; &#xAC70;&#xB9AC;</div><div style="font-size:36px;font-weight:900">'+adjusted+'y</div><div style="font-size:12px;margin-top:6px">(&#xC6D0;&#xB798; '+dist+'y '+(totalAdj>=0?'+':'')+Math.round(totalAdj)+'y)</div>'+(recommended?'<div style="margin-top:10px;font-size:14px;font-weight:700">&#x1F3CC;&#xFE0F; &#xCD94;&#xCC9C;: '+recommended+'</div>':'')+'</div>';
  h+='<div class="v22-grid3" style="margin-top:12px"><div class="v22-card" style="text-align:center"><div style="font-size:16px;font-weight:800;color:'+(tempAdj>=0?'#c62828':'#1565c0')+'">'+(tempAdj>=0?'+':'')+Math.round(tempAdj)+'y</div><div style="font-size:10px;color:var(--text-muted)">&#xAE30;&#xC628; '+temp+'&deg;C</div></div><div class="v22-card" style="text-align:center"><div style="font-size:16px;font-weight:800;color:'+(windAdj>=0?'#c62828':'#1565c0')+'">'+(windAdj>=0?'+':'')+Math.round(windAdj)+'y</div><div style="font-size:10px;color:var(--text-muted)">&#xBC14;&#xB78C; '+wind+'m/s</div></div><div class="v22-card" style="text-align:center"><div style="font-size:16px;font-weight:800;color:#2e7d32">+'+Math.round(altAdj)+'y</div><div style="font-size:10px;color:var(--text-muted)">&#xACE0;&#xB3C4; '+alt+'m</div></div></div>';
  document.getElementById('v22WeatherResult').innerHTML=h;
  v22PlaySFX('weather_calc');
}
window.v22OpenWeatherClub=v22OpenWeatherClub;window.v22CalcWeather=v22CalcWeather;

// ===== 7. GOLF NUTRITION GUIDE =====
var v22Nutrition=[
  {name:'&#xC218;&#xBD84; &#xBCF4;&#xCDA9;',desc:'&#xB77C;&#xC6B4;&#xB4DC; 1&#xC2DC;&#xAC04; &#xC804;&#xBD80;&#xD130; 500ml &#xC218;&#xBD84; &#xC12D;&#xCDE8;. &#xD0C8;&#xC218; &#xBC29;&#xC9C0;&#xC5D0; &#xD544;&#xC218;.',icon:'&#x1F4A7;',timing:'&#xB77C;&#xC6B4;&#xB4DC; 1&#xC2DC;&#xAC04; &#xC804;',cat:'before',bg:'#e3f2fd'},
  {name:'&#xD0C4;&#xC218;&#xD654;&#xBB3C; &#xBCF4;&#xCDA9;',desc:'&#xBC14;&#xB098;&#xB098;, &#xC624;&#xD2B8;&#xBC00;, &#xD1A0;&#xC2A4;&#xD2B8; &#xB4F1;&#xC73C;&#xB85C; &#xC5D0;&#xB108;&#xC9C0; &#xC800;&#xC7A5;. &#xC9C0;&#xBC29;/&#xB2E8;&#xBC31;&#xC9C8; &#xACFC;&#xB2E4; &#xC12D;&#xCDE8; &#xD53C;&#xD560;&#xAC83;.',icon:'&#x1F34C;',timing:'&#xB77C;&#xC6B4;&#xB4DC; 1-2&#xC2DC;&#xAC04; &#xC804;',cat:'before',bg:'#fff8e1'},
  {name:'&#xCE74;&#xD398;&#xC778; &#xC801;&#xB7C9; &#xC12D;&#xCDE8;',desc:'&#xCEE4;&#xD53C; 1&#xC794; &#xC815;&#xB3C4;&#xB85C; &#xC9D1;&#xC911;&#xB825; &#xD5A5;&#xC0C1;. &#xACFC;&#xB2E4;&#xD558;&#xBA74; &#xC190; &#xB5A8;&#xB9BC; &#xBC1C;&#xC0DD;.',icon:'&#x2615;',timing:'&#xB77C;&#xC6B4;&#xB4DC; 30&#xBD84; &#xC804;',cat:'before',bg:'#efebe9'},
  {name:'&#xD648; &#xC0AC;&#xC774; &#xC218;&#xBD84;',desc:'3&#xD640;&#xB9C8;&#xB2E4; 200ml &#xC774;&#xC0C1; &#xC218;&#xBD84; &#xC12D;&#xCDE8;. &#xAC08;&#xC99D;&#xC744; &#xB290;&#xB07C;&#xBA74; &#xC774;&#xBBF8; &#xD0C8;&#xC218; &#xC2DC;&#xC791;.',icon:'&#x1F4A7;',timing:'3&#xD640;&#xB9C8;&#xB2E4;',cat:'during',bg:'#e3f2fd'},
  {name:'&#xC5D0;&#xB108;&#xC9C0;&#xBC14;/&#xACAC;&#xACFC;&#xB958;',desc:'9&#xD640; &#xD6C4; &#xBC14;&#xB098;&#xB098;, &#xACAC;&#xACFC;&#xB958;, &#xC5D0;&#xB108;&#xC9C0;&#xBC14;&#xB85C; &#xBE60;&#xB978; &#xC5D0;&#xB108;&#xC9C0; &#xBCF4;&#xCDA9;.',icon:'&#x1F36B;',timing:'9&#xD640; &#xC804;&#xD6C4;',cat:'during',bg:'#fff8e1'},
  {name:'&#xC804;&#xD574;&#xC9C8; &#xBCF4;&#xCDA9;',desc:'&#xB540;&#xC774; &#xB9CE;&#xC740; &#xB0A0;&#xC5D4; &#xC2A4;&#xD3EC;&#xCE20;&#xC74C;&#xB8CC;&#xB85C; &#xB098;&#xD2B8;&#xB968;/&#xCE7C;&#xB968; &#xBCF4;&#xCDA9;.',icon:'&#x1F9C3;',timing:'&#xC5EC;&#xB984;&#xCCA0; &#xD544;&#xC218;',cat:'during',bg:'#e8f5e9'},
  {name:'&#xB2E8;&#xBC31;&#xC9C8; &#xBCF4;&#xCDA9;',desc:'&#xB77C;&#xC6B4;&#xB4DC; &#xD6C4; 30&#xBD84; &#xC774;&#xB0B4; &#xB2ED;&#xAC00;&#xC2B4;/&#xD504;&#xB85C;&#xD2F4;&#xC170;&#xC774;&#xD06C;&#xB85C; &#xADFC;&#xC721; &#xD68C;&#xBCF5;.',icon:'&#x1F357;',timing:'&#xB77C;&#xC6B4;&#xB4DC; &#xC9C1;&#xD6C4;',cat:'after',bg:'#fce4ec'},
  {name:'&#xD68C;&#xBCF5; &#xC2DD;&#xC0AC;',desc:'&#xADE0;&#xD615; &#xC7A1;&#xD78C; &#xC2DD;&#xC0AC;&#xB85C; &#xD0C4;&#xC218;&#xD654;&#xBB3C;+&#xB2E8;&#xBC31;&#xC9C8;+&#xBE44;&#xD0C0;&#xBBFC; &#xC12D;&#xCDE8;. &#xB2E4;&#xC74C; &#xB77C;&#xC6B4;&#xB4DC; &#xC900;&#xBE44;.',icon:'&#x1F371;',timing:'&#xB77C;&#xC6B4;&#xB4DC; 1-2&#xC2DC;&#xAC04; &#xD6C4;',cat:'after',bg:'#e8f5e9'}
];

function v22OpenNutrition(){
  var ov=document.getElementById('v22NutritionOverlay');
  if(!ov){
    ov=document.createElement('div');ov.id='v22NutritionOverlay';ov.className='v22-overlay';
    ov.innerHTML='<div class="v22-modal"><div class="v22-hdr"><h2><span class="v22i">&#x1F34E;</span> &#xACE8;&#xD504; &#xC601;&#xC591; &#xAC00;&#xC774;&#xB4DC;</h2><button class="v22-x" onclick="document.getElementById(\'v22NutritionOverlay\').classList.remove(\'active\')">&times;</button></div><div class="v22-tabs" id="v22NutriTabs"></div><div id="v22NutriList"></div></div>';
    document.body.appendChild(ov);
  }
  ov.classList.add('active');
  v22RenderNutrition('all');
  v22PlaySFX('nutrition_open');
}

function v22RenderNutrition(cat){
  var tabs=[{id:'all',label:'&#xC804;&#xCCB4;'},{id:'before',label:'&#x2600;&#xFE0F; &#xB77C;&#xC6B4;&#xB4DC; &#xC804;'},{id:'during',label:'&#x26F3; &#xB77C;&#xC6B4;&#xB4DC; &#xC911;'},{id:'after',label:'&#x1F3E0; &#xB77C;&#xC6B4;&#xB4DC; &#xD6C4;'}];
  var tabH='';tabs.forEach(function(t){
    tabH+='<div class="v22-tab'+(t.id===cat?' active':'')+'" onclick="v22RenderNutrition(\''+t.id+'\')">'+t.label+'</div>';
  });
  document.getElementById('v22NutriTabs').innerHTML=tabH;
  var h='';
  v22Nutrition.forEach(function(n){
    if(cat!=='all'&&n.cat!==cat)return;
    h+='<div class="v22-nutri-card"><div class="v22-nutri-icon" style="background:'+n.bg+'">'+n.icon+'</div><div class="v22-nutri-info"><div class="v22-nutri-name">'+n.name+'</div><div class="v22-nutri-desc">'+n.desc+'</div><div class="v22-nutri-timing">&#x23F0; '+n.timing+'</div></div></div>';
  });
  document.getElementById('v22NutriList').innerHTML=h;
}
window.v22OpenNutrition=v22OpenNutrition;window.v22RenderNutrition=v22RenderNutrition;

// ===== 8. GOLF IQ v7 QUIZ (15 new questions) =====
var v22Quiz=[
  {q:'&#xD3EC;&#xC11C;&#xBCFC;(four-ball) &#xB9E4;&#xCE58;&#xD50C;&#xB808;&#xC774;&#xC5D0;&#xC11C; &#xAC01; &#xD300;&#xC758; &#xC2A4;&#xCF54;&#xC5B4;&#xB294; &#xC5B4;&#xB5BB;&#xAC8C; &#xACC4;&#xC0B0;&#xB418;&#xB098;?',o:['&#xB450; &#xD50C;&#xB808;&#xC774;&#xC5B4; &#xC2A4;&#xCF54;&#xC5B4;&#xC758; &#xD569;','&#xB450; &#xD50C;&#xB808;&#xC774;&#xC5B4; &#xC911; &#xB354; &#xB0AE;&#xC740; &#xC2A4;&#xCF54;&#xC5B4;','&#xB450; &#xD50C;&#xB808;&#xC774;&#xC5B4;&#xC758; &#xD3C9;&#xADE0;','&#xBC88;&#xAC08;&#xC544; &#xC0AC;&#xC6A9;'],a:1},
  {q:'&#xACE8;&#xD504;&#xC5D0;&#xC11C; &#x201C;&#xC54C;&#xBC14;&#xD2B8;&#xB85C;&#xC2A4;&#x201D;&#xB780; &#xBB34;&#xC5C7;&#xC778;&#xAC00;?',o:['&#xD30C; &#xBCF4;&#xB2E4; 3&#xD0C0; &#xC801;&#xAC8C;','&#xD30C; &#xBCF4;&#xB2E4; 2&#xD0C0; &#xC801;&#xAC8C;','&#xD30C; &#xBCF4;&#xB2E4; 1&#xD0C0; &#xC801;&#xAC8C;','&#xD640;&#xC778;&#xC6D0;'],a:0},
  {q:'&#xB4DC;&#xB77C;&#xC774;&#xBC84; &#xD5E4;&#xB4DC;&#xC758; MOI(&#xAD00;&#xC131;&#xBAA8;&#xBA3C;&#xD2B8;)&#xAC00; &#xB192;&#xC744;&#xC218;&#xB85D;?',o:['&#xBBF8;&#xC2A4;&#xD788;&#xD2B8; &#xC2DC; &#xAC70;&#xB9AC; &#xC190;&#xC2E4;&#xC774; &#xC904;&#xC5B4;&#xB4E0;&#xB2E4;','&#xBE44;&#xAC70;&#xB9AC;&#xAC00; &#xB298;&#xC5B4;&#xB09C;&#xB2E4;','&#xC2A4;&#xD540;&#xC774; &#xB9CE;&#xC774; &#xAC78;&#xB9B0;&#xB2E4;','&#xBCFC;&#xC774; &#xB354; &#xB192;&#xC774; &#xB728;&#xB2E4;'],a:0},
  {q:'WHS(World Handicap System)&#xC5D0;&#xC11C; &#xD578;&#xB514;&#xCEA1; &#xC778;&#xB371;&#xC2A4;&#xB294; &#xCD5C;&#xADFC; &#xBA87; &#xB77C;&#xC6B4;&#xB4DC; &#xC911; &#xBA87; &#xAC1C;&#xB97C; &#xC0AC;&#xC6A9;&#xD558;&#xB098;?',o:['20&#xB77C;&#xC6B4;&#xB4DC; &#xC911; &#xBCA0;&#xC2A4;&#xD2B8; 8&#xAC1C;','10&#xB77C;&#xC6B4;&#xB4DC; &#xC911; &#xBCA0;&#xC2A4;&#xD2B8; 3&#xAC1C;','&#xBAA8;&#xB4E0; &#xB77C;&#xC6B4;&#xB4DC;&#xC758; &#xD3C9;&#xADE0;','5&#xB77C;&#xC6B4;&#xB4DC; &#xC911; &#xBCA0;&#xC2A4;&#xD2B8; 1&#xAC1C;'],a:0},
  {q:'&#xD398;&#xC774;&#xB4DC;(fade) &#xC0F7;&#xC744; &#xCE58;&#xAE30; &#xC704;&#xD574; &#xD074;&#xB7FD;&#xD398;&#xC774;&#xC2A4;&#xB294; &#xC5B4;&#xB5BB;&#xAC8C; &#xC124;&#xC815;&#xD558;&#xB098;?',o:['&#xC57D;&#xAC04; &#xC624;&#xD508;','&#xC57D;&#xAC04; &#xB2EB;&#xD798;','&#xC2A4;&#xCE58;&#xC5B4;','&#xBC14;&#xB2E5;&#xC5D0; &#xB300;&#xACE0;'],a:0},
  {q:'&#xACE8;&#xD504;&#xACF5;&#xC758; &#xC555;&#xCD95;&#xB960;(compression)&#xC774; &#xB0AE;&#xC744;&#xC218;&#xB85D;?',o:['&#xBD80;&#xB4DC;&#xB7EC;&#xC6B4; &#xD0C0;&#xACAC;&#xAC10;, &#xC2A4;&#xC719;&#xC2A4;&#xD53C;&#xB4DC; &#xB290;&#xB9B0; &#xACE8;&#xD37C;&#xC5D0;&#xAC8C; &#xC720;&#xB9AC;','&#xB2E8;&#xB2E8;&#xD55C; &#xD0C0;&#xACAC;&#xAC10;, &#xD504;&#xB85C;&#xC5D0;&#xAC8C; &#xC720;&#xB9AC;','&#xBE44;&#xAC70;&#xB9AC;&#xAC00; &#xB354; &#xB098;&#xAC04;&#xB2E4;','&#xC2A4;&#xD540;&#xC774; &#xB354; &#xB9CE;&#xC774; &#xAC78;&#xB9B0;&#xB2E4;'],a:0},
  {q:'&#xC2A4;&#xD305;&#xD504;&#xBBF8;&#xD130;(stimpmeter) 10&#xC758; &#xADF8;&#xB9B0;&#xC740; &#xC5B4;&#xB5A4; &#xC0C1;&#xD0DC;&#xC778;&#xAC00;?',o:['&#xB9E4;&#xC6B0; &#xBE60;&#xB978; &#xADF8;&#xB9B0; (&#xD1A0;&#xB108;&#xBA3C;&#xD2B8;&#xAE09;)','&#xBCF4;&#xD1B5; &#xC18D;&#xB3C4;&#xC758; &#xADF8;&#xB9B0;','&#xB290;&#xB9B0; &#xADF8;&#xB9B0;','&#xC801;&#xC2DC; &#xD6C4; &#xADF8;&#xB9B0;'],a:0},
  {q:'&#xBCFC; &#xB9C8;&#xD06C; &#xC218;&#xB9AC; &#xC2DC; &#xC62C;&#xBC14;&#xB978; &#xBC29;&#xBC95;&#xC740;?',o:['&#xBCFC; &#xB9C8;&#xD06C; &#xC218;&#xB9AC;&#xAE30;&#xB85C; &#xC190;&#xC0C1;&#xB41C; &#xC794;&#xB514;&#xB97C; &#xC704;&#xB85C; &#xBC00;&#xC5B4;&#xC62C;&#xB9B4; &#xAC83;','&#xBC1C;&#xB85C; &#xBC1F;&#xC5B4; &#xB204;&#xB97C; &#xAC83;','&#xBC29;&#xCE58;&#xD560; &#xAC83;','&#xD37C;&#xD130;&#xB85C; &#xB450;&#xB4DC;&#xB9AC;&#xBA70; &#xD3F4; &#xAC83;'],a:0},
  {q:'&#xACE8;&#xD504;&#xC5D0;&#xC11C; &#x201C;&#xB808;&#xC774;(lay)&#x201D;&#xB780;?',o:['&#xBCFC;&#xC774; &#xD398;&#xC5B4;&#xC6E8;&#xC774;&#xB098; &#xB7EC;&#xD504;&#xC5D0; &#xB193;&#xC778; &#xC0C1;&#xD0DC;','&#xD0C0;&#xAC9F;&#xC744; &#xD5A5;&#xD574; &#xBE44;&#xD589;&#xC120;&#xC744; &#xADF8;&#xB9AC;&#xB294; &#xAC83;','&#xC758;&#xB3C4;&#xC801;&#xC73C;&#xB85C; &#xC9E7;&#xAC8C; &#xCE58;&#xB294; &#xC804;&#xB7B5;','&#xBCFC;&#xC744; &#xAD50;&#xCCB4;&#xD558;&#xB294; &#xAC83;'],a:0},
  {q:'&#xC2A4;&#xCF54;&#xC5B4;&#xCE74;&#xB4DC;&#xC5D0;&#xC11C; GIR(Green in Regulation)&#xC758; &#xC815;&#xC758;&#xB294;?',o:['&#xD30C;-2&#xD0C0; &#xC774;&#xD558;&#xB85C; &#xADF8;&#xB9B0;&#xC5D0; &#xC62C;&#xB9AC;&#xB294; &#xAC83;','1&#xD0C0;&#xB9CC;&#xC5D0; &#xADF8;&#xB9B0;&#xC5D0; &#xC62C;&#xB9AC;&#xB294; &#xAC83;','&#xD30C; &#xC774;&#xD558;&#xB85C; &#xADF8;&#xB9B0;&#xC5D0; &#xC62C;&#xB9AC;&#xB294; &#xAC83;','3&#xD37C;&#xD2B8; &#xC774;&#xB0B4;&#xB85C; &#xADF8;&#xB9B0;&#xC5D0; &#xC62C;&#xB9AC;&#xB294; &#xAC83;'],a:0},
  {q:'&#xD398;&#xC5B4;&#xC6E8;&#xC774; &#xBC84;&#xB2C8;&#xC5D0;&#xC11C; &#xACE8;&#xD504;&#xB2F5;&#xB2E4;&#xC6B4; &#xD45C;&#xD604;&#xC778; &#x201C;&#xBC84;&#xB514;&#x201D;&#xB294; &#xD30C; &#xB300;&#xBE44; &#xBA87; &#xD0C0;?',o:['1&#xD0C0; &#xC801;&#xAC8C;','2&#xD0C0; &#xC801;&#xAC8C;','&#xD30C;&#xC640; &#xAC19;&#xAC8C;','1&#xD0C0; &#xB9CE;&#xAC8C;'],a:0},
  {q:'&#xC5D0;&#xC774;&#xC2A4;(ace)&#xB77C;&#xACE0;&#xB3C4; &#xBD88;&#xB9AC;&#xB294; &#xACE8;&#xD504; &#xC6A9;&#xC5B4;&#xB294;?',o:['&#xD640;&#xC778;&#xC6D0;','&#xBCA0;&#xC2A4;&#xD2B8;&#xBCFC;','&#xB354;&#xBE14;&#xC774;&#xAE00;','&#xCF58;&#xB3C4;&#xB974;'],a:0},
  {q:'&#xBC31;&#xC2A4;&#xC719;&#xC5D0;&#xC11C; &#xD074;&#xB7FD;&#xC758; &#xB77C;&#xC774;&#xAC01;(lie angle)&#xC774; &#xB108;&#xBB34; &#xC5C5;&#xB77C;&#xC774;&#xD2B8;&#xBA74;?',o:['&#xBCFC;&#xC774; &#xC67C;&#xCABD;&#xC73C;&#xB85C; &#xB0A0;&#xC544;&#xAC04;&#xB2E4;','&#xBCFC;&#xC774; &#xC624;&#xB978;&#xCABD;&#xC73C;&#xB85C; &#xB0A0;&#xC544;&#xAC04;&#xB2E4;','&#xBCFC;&#xC774; &#xB192;&#xC774; &#xB738;&#xB2E4;','&#xBE44;&#xAC70;&#xB9AC;&#xAC00; &#xC904;&#xC5B4;&#xB4E0;&#xB2E4;'],a:0},
  {q:'PGA &#xD22C;&#xC5B4;&#xC5D0;&#xC11C; &#xD3C9;&#xADE0; &#xB4DC;&#xB77C;&#xC774;&#xBE59; &#xBE44;&#xAC70;&#xB9AC;&#xB294; &#xC57D; &#xBA87; &#xC57C;&#xB4DC;?',o:['280-300 &#xC57C;&#xB4DC;','250-260 &#xC57C;&#xB4DC;','320-340 &#xC57C;&#xB4DC;','220-240 &#xC57C;&#xB4DC;'],a:0},
  {q:'&#xACE8;&#xD504; &#xC6A9;&#xC5B4; &#x201C;&#xC2A4;&#xD2F0;&#xD504;&#xD55C; &#xC0F7;&#x201D;&#xC740; &#xBB34;&#xC5C7;&#xC744; &#xC758;&#xBBF8;&#xD558;&#xB294;&#xAC00;?',o:['&#xD14D;&#xC2A4;&#xB85C; &#xB192;&#xC774; &#xB5A0;&#xBA70; &#xADF8;&#xB9B0;&#xC5D0;&#xC11C; &#xBE68;&#xB9AC; &#xBA48;&#xCD94;&#xB294; &#xC0F7;','&#xB0AE;&#xAC8C; &#xD37C; &#xB098;&#xAC00;&#xB294; &#xC0F7;','&#xC624;&#xB978;&#xCABD;&#xC73C;&#xB85C; &#xD718;&#xC5B4;&#xC9C0;&#xB294; &#xC0F7;','&#xD1B1;&#xC2A4;&#xD540;&#xC73C;&#xB85C; &#xBE60;&#xC9C0;&#xB294; &#xC0F7;'],a:0}
];
var v22QIdx=0;var v22QScore=0;

function v22OpenQuiz(){
  var ov=document.getElementById('v22QuizOverlay');
  if(!ov){
    ov=document.createElement('div');ov.id='v22QuizOverlay';ov.className='v22-overlay';
    ov.innerHTML='<div class="v22-modal"><div class="v22-hdr"><h2><span class="v22i">&#x1F9E0;</span> Golf IQ v7</h2><button class="v22-x" onclick="document.getElementById(\'v22QuizOverlay\').classList.remove(\'active\')">&times;</button></div><div style="text-align:center;margin-bottom:14px"><span class="v22-badge" style="background:#e8f5e9;color:var(--primary)">&#xC810;&#xC218;: <span id="v22QScore">0</span>/15 | &#xBB38;&#xC81C;: <span id="v22QNum">1</span>/15</span></div><div id="v22QContent"></div></div>';
    document.body.appendChild(ov);
  }
  ov.classList.add('active');
  v22QIdx=0;v22QScore=0;
  v22RenderQuiz();
  v22PlaySFX('quiz_open');
}

function v22RenderQuiz(){
  if(v22QIdx>=15){
    var pct=Math.round(v22QScore/15*100);
    var grade=pct>=90?'S':pct>=70?'A':pct>=50?'B':pct>=30?'C':'D';
    document.getElementById('v22QContent').innerHTML='<div style="text-align:center;padding:30px"><div style="font-size:60px;margin-bottom:10px">&#x1F3C6;</div><div style="font-size:28px;font-weight:900;color:var(--primary)">'+grade+' &#xB4F1;&#xAE09;</div><div style="font-size:16px;margin-top:8px">'+v22QScore+'/15 &#xC815;&#xB2F5; ('+pct+'%)</div><div style="margin-top:16px"><button class="v22-btn v22-btn-primary" onclick="v22QIdx=0;v22QScore=0;v22RenderQuiz();">&#x1F504; &#xB2E4;&#xC2DC; &#xD480;&#xAE30;</button></div></div>';
    localStorage.setItem('sg_quiz_v7',''+Math.max(parseInt(localStorage.getItem('sg_quiz_v7')||'0'),v22QScore));
    if(v22QScore>=12)localStorage.setItem('sg_quiz_master_v7','1');
    return;
  }
  document.getElementById('v22QScore').textContent=v22QScore;
  document.getElementById('v22QNum').textContent=(v22QIdx+1);
  var q=v22Quiz[v22QIdx];
  var h='<div style="background:var(--bg);border-radius:16px;padding:18px;margin-bottom:12px;border:1.5px solid var(--border)"><div style="font-size:14px;font-weight:700;margin-bottom:10px;line-height:1.5">Q'+(v22QIdx+1)+'. '+q.q+'</div><div style="display:flex;flex-direction:column;gap:6px">';
  q.o.forEach(function(o,i){
    h+='<div id="v22QC'+i+'" style="padding:10px 14px;border:1.5px solid var(--border);border-radius:12px;font-size:12px;cursor:pointer;transition:.2s" onclick="v22AnswerQuiz('+i+')">'+String.fromCharCode(65+i)+'. '+o+'</div>';
  });
  h+='</div></div><div style="text-align:center;margin-top:12px"><button class="v22-btn v22-btn-primary" id="v22QNext" style="display:none" onclick="v22QIdx++;v22RenderQuiz();">&#xB2E4;&#xC74C; &#x2192;</button></div>';
  document.getElementById('v22QContent').innerHTML=h;
}

function v22AnswerQuiz(idx){
  if(document.getElementById('v22QNext').style.display==='inline-flex')return;
  var q=v22Quiz[v22QIdx];
  if(idx===q.a){
    v22QScore++;
    document.getElementById('v22QC'+idx).style.borderColor='#2e9e4f';document.getElementById('v22QC'+idx).style.background='#e8f5e9';document.getElementById('v22QC'+idx).style.color='#2e9e4f';document.getElementById('v22QC'+idx).style.fontWeight='700';
    v22PlaySFX('quiz_correct');
  }else{
    document.getElementById('v22QC'+idx).style.borderColor='#ff4757';document.getElementById('v22QC'+idx).style.background='#ffe5e8';document.getElementById('v22QC'+idx).style.color='#ff4757';
    document.getElementById('v22QC'+q.a).style.borderColor='#2e9e4f';document.getElementById('v22QC'+q.a).style.background='#e8f5e9';document.getElementById('v22QC'+q.a).style.color='#2e9e4f';document.getElementById('v22QC'+q.a).style.fontWeight='700';
    v22PlaySFX('quiz_wrong');
  }
  document.getElementById('v22QNext').style.display='inline-flex';
  document.getElementById('v22QScore').textContent=v22QScore;
}
window.v22OpenQuiz=v22OpenQuiz;window.v22AnswerQuiz=v22AnswerQuiz;

// ===== 9. ACHIEVEMENTS (12 new: 92→104) =====
function v22CheckAchievements(){
  var achs=[
    {id:'routine_first',name:'&#xCCAB; &#xB8E8;&#xD2F4;',desc:'&#xD504;&#xB9AC;&#xC0F7; &#xB8E8;&#xD2F4; &#xCCAB; &#xC644;&#xB8CC;',check:function(){return parseInt(localStorage.getItem('sg_routine_count')||'0')>=1;}},
    {id:'routine_10',name:'&#xB8E8;&#xD2F4; &#xB9C8;&#xC2A4;&#xD130;',desc:'&#xD504;&#xB9AC;&#xC0F7; &#xB8E8;&#xD2F4; 10&#xD68C; &#xC644;&#xB8CC;',check:function(){return parseInt(localStorage.getItem('sg_routine_count')||'0')>=10;}},
    {id:'club_saved',name:'&#xD074;&#xB7FD; &#xB9E4;&#xB2C8;&#xC800;',desc:'&#xD074;&#xB7FD; &#xAC70;&#xB9AC; &#xC800;&#xC7A5; &#xC644;&#xB8CC;',check:function(){return localStorage.getItem('sg_clubs_saved')==='1';}},
    {id:'practice_5',name:'&#xC5F0;&#xC2B5;&#xBC8C;&#xB808;',desc:'&#xC5F0;&#xC2B5; 5&#xD68C; &#xAE30;&#xB85D;',check:function(){return parseInt(localStorage.getItem('sg_practice_cnt')||'0')>=5;}},
    {id:'practice_20',name:'&#xC5F0;&#xC2B5; &#xC911;&#xB3C5;',desc:'&#xC5F0;&#xC2B5; 20&#xD68C; &#xAE30;&#xB85D;',check:function(){return parseInt(localStorage.getItem('sg_practice_cnt')||'0')>=20;}},
    {id:'notes_3',name:'&#xCF54;&#xC2A4; &#xBD84;&#xC11D;&#xAC00;',desc:'&#xCF54;&#xC2A4; &#xB178;&#xD2B8; 3&#xAC1C; &#xC791;&#xC131;',check:function(){return parseInt(localStorage.getItem('sg_notes_cnt')||'0')>=3;}},
    {id:'notes_10',name:'&#xCF54;&#xC2A4; &#xC804;&#xB7B5;&#xAC00;',desc:'&#xCF54;&#xC2A4; &#xB178;&#xD2B8; 10&#xAC1C; &#xC791;&#xC131;',check:function(){return parseInt(localStorage.getItem('sg_notes_cnt')||'0')>=10;}},
    {id:'goals_3',name:'&#xBAA9;&#xD45C; &#xC124;&#xC815;&#xC790;',desc:'&#xBAA9;&#xD45C; 3&#xAC1C; &#xC124;&#xC815;',check:function(){return parseInt(localStorage.getItem('sg_goals_cnt')||'0')>=3;}},
    {id:'goals_complete',name:'&#xBAA9;&#xD45C; &#xB2EC;&#xC131;&#xC790;',desc:'&#xBAA9;&#xD45C; 1&#xAC1C; &#xC644;&#xB8CC;',check:function(){var g=JSON.parse(localStorage.getItem('sg_goals')||'[]');return g.some(function(x){return x.completed;});}},
    {id:'quiz_v7',name:'Golf IQ v7 &#xB9C8;&#xC2A4;&#xD130;',desc:'Golf IQ v7 12/15 &#xC774;&#xC0C1;',check:function(){return localStorage.getItem('sg_quiz_master_v7')==='1';}},
    {id:'nutrition_read',name:'&#xC601;&#xC591; &#xC804;&#xBB38;&#xAC00;',desc:'&#xC601;&#xC591; &#xAC00;&#xC774;&#xB4DC; &#xC5F4;&#xB78C;',check:function(){return localStorage.getItem('sg_nutri_opened')==='1';}},
    {id:'v22_all',name:'v22 &#xC62C;&#xB77C;&#xC6B4;&#xB354;',desc:'v22 &#xBAA8;&#xB4E0; &#xAE30;&#xB2A5; &#xC0AC;&#xC6A9;',check:function(){return parseInt(localStorage.getItem('sg_routine_count')||'0')>=1&&localStorage.getItem('sg_clubs_saved')==='1'&&parseInt(localStorage.getItem('sg_practice_cnt')||'0')>=1&&parseInt(localStorage.getItem('sg_notes_cnt')||'0')>=1&&parseInt(localStorage.getItem('sg_goals_cnt')||'0')>=1;}}
  ];
  var unlocked=JSON.parse(localStorage.getItem('sg_v22_ach')||'[]');
  achs.forEach(function(a){
    if(unlocked.indexOf(a.id)===-1&&a.check()){
      unlocked.push(a.id);
      v22Toast('&#x1F3C5; &#xC5C5;&#xC801; &#xB2EC;&#xC131;: '+a.name);
      v22PlaySFX('achievement');
    }
  });
  localStorage.setItem('sg_v22_ach',JSON.stringify(unlocked));
}

// ===== 10. SFX (12 new: 92→104) =====
var v22SFXCtx=null;
function v22PlaySFX(type){
  try{
    if(!v22SFXCtx)v22SFXCtx=new(window.AudioContext||window.webkitAudioContext)();
    var ctx=v22SFXCtx;var osc=ctx.createOscillator();var gain=ctx.createGain();
    osc.connect(gain);gain.connect(ctx.destination);gain.gain.value=0.12;
    var now=ctx.currentTime;
    switch(type){
      case'routine_open':osc.frequency.value=440;osc.type='sine';gain.gain.setValueAtTime(0.08,now);gain.gain.exponentialRampToValueAtTime(0.001,now+0.2);osc.start(now);osc.stop(now+0.2);break;
      case'routine_step':osc.frequency.value=523;osc.type='sine';gain.gain.setValueAtTime(0.1,now);gain.gain.exponentialRampToValueAtTime(0.001,now+0.15);osc.start(now);osc.stop(now+0.15);break;
      case'routine_complete':osc.frequency.value=523;osc.type='sine';gain.gain.setValueAtTime(0.12,now);osc.frequency.setValueAtTime(659,now+0.1);osc.frequency.setValueAtTime(784,now+0.2);osc.frequency.setValueAtTime(1047,now+0.3);gain.gain.exponentialRampToValueAtTime(0.001,now+0.5);osc.start(now);osc.stop(now+0.5);break;
      case'club_open':osc.frequency.value=392;osc.type='triangle';gain.gain.setValueAtTime(0.08,now);gain.gain.exponentialRampToValueAtTime(0.001,now+0.2);osc.start(now);osc.stop(now+0.2);break;
      case'club_save':osc.frequency.value=880;osc.type='sine';gain.gain.setValueAtTime(0.1,now);osc.frequency.setValueAtTime(1100,now+0.08);gain.gain.exponentialRampToValueAtTime(0.001,now+0.25);osc.start(now);osc.stop(now+0.25);break;
      case'practice_open':case'practice_save':osc.frequency.value=660;osc.type='sine';gain.gain.setValueAtTime(0.08,now);gain.gain.exponentialRampToValueAtTime(0.001,now+0.15);osc.start(now);osc.stop(now+0.15);break;
      case'notes_open':case'notes_save':osc.frequency.value=493;osc.type='sine';gain.gain.setValueAtTime(0.07,now);gain.gain.exponentialRampToValueAtTime(0.001,now+0.2);osc.start(now);osc.stop(now+0.2);break;
      case'goals_open':case'goals_add':osc.frequency.value=440;osc.type='triangle';gain.gain.setValueAtTime(0.08,now);gain.gain.exponentialRampToValueAtTime(0.001,now+0.2);osc.start(now);osc.stop(now+0.2);break;
      case'goals_complete':osc.frequency.value=523;osc.type='sine';gain.gain.setValueAtTime(0.12,now);osc.frequency.setValueAtTime(784,now+0.15);gain.gain.exponentialRampToValueAtTime(0.001,now+0.4);osc.start(now);osc.stop(now+0.4);break;
      case'weather_club_open':case'weather_calc':osc.frequency.value=550;osc.type='triangle';gain.gain.setValueAtTime(0.08,now);gain.gain.exponentialRampToValueAtTime(0.001,now+0.15);osc.start(now);osc.stop(now+0.15);break;
      case'nutrition_open':osc.frequency.value=370;osc.type='sine';gain.gain.setValueAtTime(0.06,now);gain.gain.exponentialRampToValueAtTime(0.001,now+0.2);osc.start(now);osc.stop(now+0.2);break;
      case'quiz_open':osc.frequency.value=698;osc.type='sine';gain.gain.setValueAtTime(0.08,now);gain.gain.exponentialRampToValueAtTime(0.001,now+0.15);osc.start(now);osc.stop(now+0.15);break;
      case'quiz_correct':osc.frequency.value=523;osc.type='sine';gain.gain.setValueAtTime(0.1,now);osc.frequency.setValueAtTime(659,now+0.08);gain.gain.exponentialRampToValueAtTime(0.001,now+0.25);osc.start(now);osc.stop(now+0.25);break;
      case'quiz_wrong':osc.frequency.value=200;osc.type='sawtooth';gain.gain.setValueAtTime(0.08,now);gain.gain.exponentialRampToValueAtTime(0.001,now+0.25);osc.start(now);osc.stop(now+0.25);break;
      case'achievement':osc.frequency.value=523;osc.type='sine';gain.gain.setValueAtTime(0.12,now);osc.frequency.setValueAtTime(659,now+0.12);osc.frequency.setValueAtTime(784,now+0.24);osc.frequency.setValueAtTime(1047,now+0.36);gain.gain.exponentialRampToValueAtTime(0.001,now+0.6);osc.start(now);osc.stop(now+0.6);break;
      default:osc.frequency.value=440;gain.gain.setValueAtTime(0.05,now);gain.gain.exponentialRampToValueAtTime(0.001,now+0.1);osc.start(now);osc.stop(now+0.1);
    }
  }catch(e){}
}

// ===== 11. TOAST =====
function v22Toast(msg){
  var t=document.createElement('div');
  t.style.cssText='position:fixed;bottom:90px;left:50%;transform:translateX(-50%);background:var(--toast-bg,#333);color:#fff;padding:12px 24px;border-radius:14px;font-size:13px;font-weight:600;z-index:10600;box-shadow:0 6px 24px rgba(0,0,0,.3);max-width:90vw;text-align:center;animation:v22Rise .3s ease';
  t.innerHTML=msg;
  document.body.appendChild(t);
  setTimeout(function(){t.style.opacity='0';t.style.transition='opacity .3s';setTimeout(function(){t.remove();},300);},3000);
}

// ===== 12. KEYBOARD SHORTCUTS =====
document.addEventListener('keydown',function(e){
  var t=e.target.tagName;
  if(t==='INPUT'||t==='TEXTAREA'||t==='SELECT')return;
  if(!e.shiftKey)return;
  switch(e.key){
    case'R':v22OpenRoutine();e.preventDefault();break;
    case'C':v22OpenClub();e.preventDefault();break;
    case'X':v22OpenPractice();e.preventDefault();break;
    case'N':v22OpenNotes();e.preventDefault();break;
    case'O':v22OpenGoals();e.preventDefault();break;
    case'W':v22OpenWeatherClub();e.preventDefault();break;
    case'A':v22OpenNutrition();e.preventDefault();break;
    case'V':v22OpenQuiz();e.preventDefault();break;
  }
});

// ===== 13. INJECT BUTTONS =====
function injectV22Buttons(){
  var target=document.querySelector('.search-section')||document.querySelector('.header');
  if(!target)return;
  var bar=document.createElement('div');
  bar.style.cssText='display:flex;gap:6px;flex-wrap:wrap;margin:10px 0;padding:0 0 6px';
  var buttons=[
    {label:'&#x1F3AF; &#xD504;&#xB9AC;&#xC0F7;&#xB8E8;&#xD2F4;',fn:'v22OpenRoutine()'},
    {label:'&#x1F3CC;&#xFE0F; &#xD074;&#xB7FD;&#xAC70;&#xB9AC;',fn:'v22OpenClub()'},
    {label:'&#x1F4DD; &#xC5F0;&#xC2B5;&#xB85C;&#xADF8;',fn:'v22OpenPractice()'},
    {label:'&#x1F4D4; &#xCF54;&#xC2A4;&#xB178;&#xD2B8;',fn:'v22OpenNotes()'},
    {label:'&#x1F3AF; &#xBAA9;&#xD45C;&#xD50C;&#xB798;&#xB108;',fn:'v22OpenGoals()'},
    {label:'&#x1F321;&#xFE0F; &#xB0A0;&#xC528;&#xBCF4;&#xC815;',fn:'v22OpenWeatherClub()'},
    {label:'&#x1F34E; &#xC601;&#xC591;&#xAC00;&#xC774;&#xB4DC;',fn:'v22OpenNutrition()'},
    {label:'&#x1F9E0; IQ v7',fn:'v22OpenQuiz()'}
  ];
  buttons.forEach(function(b){
    var btn=document.createElement('button');
    btn.className='v22-btn v22-btn-sm v22-btn-secondary';
    btn.innerHTML=b.label;
    btn.setAttribute('onclick',b.fn);
    bar.appendChild(btn);
  });
  target.parentNode.insertBefore(bar,target.nextSibling);
}

// ===== 14. NUTRITION OPEN TRACKER =====
var origV22OpenNutrition=v22OpenNutrition;
v22OpenNutrition=function(){localStorage.setItem('sg_nutri_opened','1');origV22OpenNutrition();};
window.v22OpenNutrition=v22OpenNutrition;

// ===== 15. INIT =====
setTimeout(function(){
  injectV22Buttons();
  v22CheckAchievements();
},1200);

})();
