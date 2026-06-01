(function(){
'use strict';

var css21 = document.createElement('style');
css21.textContent = `
.v21-overlay{position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,.88);z-index:10300;display:none;align-items:center;justify-content:center;backdrop-filter:blur(20px)}
.v21-overlay.active{display:flex}
.v21-modal{background:var(--card-bg,#fff);border-radius:28px;padding:32px;width:97%;max-width:920px;max-height:94vh;overflow-y:auto;box-shadow:0 48px 140px rgba(0,0,0,.7);animation:v21Rise .35s cubic-bezier(.22,1,.36,1)}
@keyframes v21Rise{from{opacity:0;transform:translateY(48px) scale(.92)}to{opacity:1;transform:translateY(0) scale(1)}}
.v21-hdr{display:flex;justify-content:space-between;align-items:center;margin-bottom:22px}
.v21-hdr h2{font-size:24px;font-weight:800;display:flex;align-items:center;gap:10px}
.v21-hdr h2 .v21i{font-size:30px}
.v21-x{background:none;border:none;font-size:30px;cursor:pointer;color:var(--text-muted);padding:4px 10px;border-radius:10px;transition:.2s}
.v21-x:hover{background:var(--border);color:var(--text)}
.v21-tabs{display:flex;gap:6px;margin-bottom:18px;overflow-x:auto;padding-bottom:4px;scrollbar-width:none}
.v21-tabs::-webkit-scrollbar{display:none}
.v21-tab{padding:10px 20px;border-radius:26px;border:1.5px solid var(--border);background:var(--bg);font-size:12px;font-weight:700;cursor:pointer;white-space:nowrap;transition:.25s}
.v21-tab.active{background:var(--primary);color:#fff;border-color:var(--primary);box-shadow:0 3px 16px rgba(26,122,58,.35)}
.v21-card{background:var(--bg);border-radius:18px;padding:20px;margin-bottom:12px;transition:.25s;border:1.5px solid transparent}
.v21-card:hover{border-color:var(--primary);transform:translateY(-2px);box-shadow:0 4px 18px rgba(26,122,58,.12)}
.v21-card h4{font-size:15px;font-weight:700;margin-bottom:8px;display:flex;align-items:center;gap:8px}
.v21-card p{font-size:12px;color:var(--text-muted);line-height:1.7}
.v21-btn{padding:11px 24px;border:none;border-radius:14px;font-size:13px;font-weight:700;cursor:pointer;transition:.25s;display:inline-flex;align-items:center;gap:6px}
.v21-btn-primary{background:linear-gradient(135deg,var(--primary),#2e9e4f);color:#fff}
.v21-btn-primary:hover{transform:translateY(-2px);box-shadow:0 8px 22px rgba(26,122,58,.4)}
.v21-btn-sm{padding:7px 14px;font-size:11px;border-radius:10px}
.v21-btn-secondary{background:var(--bg);color:var(--text);border:1.5px solid var(--border)}
.v21-btn-secondary:hover{border-color:var(--primary);color:var(--primary)}
.v21-btn-danger{background:#ff4757;color:#fff}
.v21-btn-danger:hover{background:#e03e4e}
.v21-input{width:100%;padding:11px 16px;border:2px solid var(--border);border-radius:12px;font-size:13px;background:var(--bg);color:var(--text);transition:.2s}
.v21-input:focus{border-color:var(--primary);outline:none;box-shadow:0 0 0 3px rgba(26,122,58,.12)}
.v21-select{padding:9px 14px;border:2px solid var(--border);border-radius:10px;font-size:13px;background:var(--bg);color:var(--text)}
.v21-grid2{display:grid;grid-template-columns:1fr 1fr;gap:12px}
.v21-grid3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px}
.v21-grid4{display:grid;grid-template-columns:repeat(4,1fr);gap:10px}
@media(max-width:520px){.v21-grid2,.v21-grid3,.v21-grid4{grid-template-columns:1fr}}
.v21-divider{height:1px;background:var(--border);margin:18px 0}
.v21-badge{display:inline-block;padding:5px 14px;border-radius:16px;font-size:11px;font-weight:700}
.v21-progress{width:100%;height:14px;background:var(--border);border-radius:7px;overflow:hidden;margin:8px 0}
.v21-progress-fill{height:100%;border-radius:7px;transition:width .6s ease}
.v21-stat-row{display:flex;justify-content:space-between;align-items:center;padding:13px 0;border-bottom:1px solid var(--border)}
.v21-stat-row:last-child{border-bottom:none}
.v21-putt-canvas{width:100%;max-width:500px;height:420px;margin:0 auto;display:block;border-radius:16px;border:2px solid var(--border);touch-action:none}
.v21-live-table{width:100%;border-collapse:collapse;font-size:11px}
.v21-live-table th{background:var(--primary);color:#fff;padding:8px 5px;text-align:center;font-size:10px;font-weight:700;position:sticky;top:0}
.v21-live-table td{padding:7px 5px;text-align:center;border-bottom:1px solid var(--border)}
.v21-live-table input{width:36px;padding:4px;text-align:center;border:1.5px solid var(--border);border-radius:6px;font-size:12px;font-weight:700;background:var(--bg);color:var(--text)}
.v21-live-table .eagle-cell{background:#ffd700;color:#000;font-weight:800;border-radius:4px}
.v21-live-table .birdie-cell{background:#2e9e4f;color:#fff;font-weight:700;border-radius:4px}
.v21-live-table .par-cell{background:var(--bg)}
.v21-live-table .bogey-cell{background:#ff9f43;color:#fff;border-radius:4px}
.v21-live-table .dbl-cell{background:#ff4757;color:#fff;border-radius:4px}
.v21-fitness-item{display:flex;gap:14px;align-items:center;padding:16px;background:var(--bg);border-radius:16px;margin-bottom:10px;transition:.25s;cursor:pointer}
.v21-fitness-item:hover{border-color:var(--primary);transform:translateY(-1px)}
.v21-fitness-item.done{opacity:.5;text-decoration:line-through}
.v21-fitness-icon{width:48px;height:48px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:22px;flex-shrink:0}
.v21-fitness-info{flex:1}
.v21-fitness-name{font-size:14px;font-weight:700;margin-bottom:3px}
.v21-fitness-desc{font-size:11px;color:var(--text-muted);line-height:1.5}
.v21-fitness-time{font-size:11px;color:var(--primary);font-weight:700;margin-top:3px}
.v21-diary-entry{background:var(--bg);border-radius:16px;padding:16px;margin-bottom:10px;border-left:4px solid var(--primary)}
.v21-diary-date{font-size:11px;color:var(--text-muted);margin-bottom:6px}
.v21-diary-mood{font-size:20px;margin-bottom:4px}
.v21-diary-text{font-size:13px;line-height:1.6}
.v21-price-bar{display:flex;align-items:flex-end;gap:4px;height:120px;margin:12px 0}
.v21-price-col{flex:1;background:linear-gradient(to top,var(--primary),#4ecca3);border-radius:6px 6px 0 0;transition:.3s;position:relative;cursor:pointer;min-width:20px}
.v21-price-col:hover{opacity:.8}
.v21-price-label{position:absolute;bottom:-20px;left:50%;transform:translateX(-50%);font-size:9px;white-space:nowrap;color:var(--text-muted)}
.v21-price-val{position:absolute;top:-18px;left:50%;transform:translateX(-50%);font-size:10px;font-weight:700;color:var(--primary)}
.v21-buddy-card{display:flex;gap:14px;align-items:center;padding:14px;background:var(--bg);border-radius:16px;margin-bottom:10px;transition:.25s}
.v21-buddy-card:hover{transform:translateY(-2px);box-shadow:0 3px 12px rgba(26,122,58,.1)}
.v21-buddy-avatar{width:48px;height:48px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:22px;flex-shrink:0;background:linear-gradient(135deg,var(--primary),#4ecca3);color:#fff;font-weight:800}
.v21-buddy-info{flex:1}
.v21-buddy-name{font-size:14px;font-weight:700;margin-bottom:3px}
.v21-buddy-meta{font-size:11px;color:var(--text-muted)}
.v21-rule-scenario{background:var(--bg);border-radius:16px;padding:18px;margin-bottom:12px;border:1.5px solid var(--border);transition:.25s}
.v21-rule-scenario:hover{border-color:var(--primary)}
.v21-rule-q{font-size:14px;font-weight:700;margin-bottom:10px;line-height:1.5}
.v21-rule-choices{display:flex;flex-direction:column;gap:6px}
.v21-rule-choice{padding:10px 14px;border:1.5px solid var(--border);border-radius:12px;font-size:12px;cursor:pointer;transition:.2s}
.v21-rule-choice:hover{border-color:var(--primary);background:var(--primary-light)}
.v21-rule-choice.correct{border-color:#2e9e4f;background:#e8f5e9;color:#2e9e4f;font-weight:700}
.v21-rule-choice.wrong{border-color:#ff4757;background:#ffe5e8;color:#ff4757}
`;
document.head.appendChild(css21);

// ===== 1. PUTTING SIMULATOR (Canvas) =====
var v21PuttState={power:50,angle:0,slope:2,speed:9,rolling:false,ballX:250,ballY:350,ballVX:0,ballVY:0,holeX:250,holeY:80,trail:[],made:0,attempts:0};

function v21OpenPutt(){
  var ov=document.getElementById('v21PuttOverlay');
  if(!ov){
    ov=document.createElement('div');ov.id='v21PuttOverlay';ov.className='v21-overlay';
    ov.innerHTML='<div class="v21-modal"><div class="v21-hdr"><h2><span class="v21i">&#x26F3;</span> &#xD37C;&#xD305; &#xC2DC;&#xBBAC;&#xB808;&#xC774;&#xD130;</h2><button class="v21-x" onclick="document.getElementById(\'v21PuttOverlay\').classList.remove(\'active\')">&times;</button></div><div style="text-align:center;margin-bottom:14px"><span class="v21-badge" style="background:#e8f5e9;color:var(--primary)">&#xC131;&#xACF5;: <span id="v21PuttMade">0</span>/<span id="v21PuttAttempts">0</span></span></div><canvas id="v21PuttCanvas" class="v21-putt-canvas" width="500" height="420"></canvas><div class="v21-grid3" style="margin-top:14px"><div><label style="font-size:11px;font-weight:700">&#xD30C;&#xC6CC;</label><input type="range" id="v21PuttPower" min="10" max="100" value="50" style="width:100%"><span id="v21PuttPowerVal" style="font-size:11px">50%</span></div><div><label style="font-size:11px;font-weight:700">&#xACBD;&#xC0AC;&#xB3C4;</label><input type="range" id="v21PuttSlope" min="0" max="8" value="2" style="width:100%"><span id="v21PuttSlopeVal" style="font-size:11px">2%</span></div><div><label style="font-size:11px;font-weight:700">&#xADF8;&#xB9B0;&#xC2A4;&#xD53C;&#xB4DC;</label><input type="range" id="v21PuttSpeed" min="6" max="14" value="9" style="width:100%"><span id="v21PuttSpeedVal" style="font-size:11px">9ft</span></div></div><p style="font-size:11px;color:var(--text-muted);margin-top:10px;text-align:center">&#xCE94;&#xBC84;&#xC2A4;&#xB97C; &#xD074;&#xB9AD;/&#xD130;&#xCE58;&#xD558;&#xC5EC; &#xBC29;&#xD5A5;&#xC744; &#xC124;&#xC815;&#xD558;&#xACE0; &quot;&#xD37C;&#xD305;&quot; &#xBC84;&#xD2BC;&#xC744; &#xB204;&#xB974;&#xC138;&#xC694;</p><div style="text-align:center;margin-top:10px"><button class="v21-btn v21-btn-primary" onclick="v21DoPutt()">&#x26F3; &#xD37C;&#xD305;</button> <button class="v21-btn v21-btn-secondary" onclick="v21ResetPutt()">&#x1F504; &#xB9AC;&#xC14B;</button></div></div>';
    document.body.appendChild(ov);
    document.getElementById('v21PuttPower').oninput=function(){v21PuttState.power=+this.value;document.getElementById('v21PuttPowerVal').textContent=this.value+'%';};
    document.getElementById('v21PuttSlope').oninput=function(){v21PuttState.slope=+this.value;document.getElementById('v21PuttSlopeVal').textContent=this.value+'%';v21DrawPutt();};
    document.getElementById('v21PuttSpeed').oninput=function(){v21PuttState.speed=+this.value;document.getElementById('v21PuttSpeedVal').textContent=this.value+'ft';};
    var canvas=document.getElementById('v21PuttCanvas');
    canvas.addEventListener('click',function(e){
      var rect=canvas.getBoundingClientRect();
      var x=(e.clientX-rect.left)*(500/rect.width);
      var y=(e.clientY-rect.top)*(420/rect.height);
      v21PuttState.angle=Math.atan2(y-v21PuttState.ballY,x-v21PuttState.ballX);
      v21DrawPutt();
    });
    canvas.addEventListener('touchstart',function(e){
      e.preventDefault();
      var t=e.touches[0];var rect=canvas.getBoundingClientRect();
      var x=(t.clientX-rect.left)*(500/rect.width);
      var y=(t.clientY-rect.top)*(420/rect.height);
      v21PuttState.angle=Math.atan2(y-v21PuttState.ballY,x-v21PuttState.ballX);
      v21DrawPutt();
    });
  }
  ov.classList.add('active');
  v21ResetPutt();
  v21PlaySFX('putt_setup');
}

function v21DrawPutt(){
  var c=document.getElementById('v21PuttCanvas');if(!c)return;
  var ctx=c.getContext('2d');
  ctx.clearRect(0,0,500,420);
  var grad=ctx.createRadialGradient(250,210,20,250,210,250);
  grad.addColorStop(0,'#4ecca3');grad.addColorStop(0.6,'#2e9e4f');grad.addColorStop(1,'#1a7a3a');
  ctx.fillStyle=grad;ctx.fillRect(0,0,500,420);
  // slope arrows
  var s=v21PuttState.slope;
  if(s>0){
    ctx.strokeStyle='rgba(255,255,255,0.3)';ctx.lineWidth=1;
    for(var i=0;i<6;i++){
      var y=60+i*60;
      ctx.beginPath();ctx.moveTo(50,y);ctx.lineTo(450,y);ctx.stroke();
      ctx.beginPath();ctx.moveTo(445,y-4);ctx.lineTo(450,y);ctx.lineTo(445,y+4);ctx.stroke();
    }
    ctx.fillStyle='rgba(255,255,255,0.5)';ctx.font='10px sans-serif';
    ctx.fillText('slope '+s+'% →',200,20);
  }
  // hole
  ctx.beginPath();ctx.arc(v21PuttState.holeX,v21PuttState.holeY,12,0,Math.PI*2);
  ctx.fillStyle='#000';ctx.fill();
  ctx.beginPath();ctx.arc(v21PuttState.holeX,v21PuttState.holeY,14,0,Math.PI*2);
  ctx.strokeStyle='#fff';ctx.lineWidth=2;ctx.stroke();
  // flag
  ctx.fillStyle='#ff4757';ctx.fillRect(v21PuttState.holeX,v21PuttState.holeY-30,20,12);
  ctx.strokeStyle='#fff';ctx.lineWidth=1.5;
  ctx.beginPath();ctx.moveTo(v21PuttState.holeX,v21PuttState.holeY);ctx.lineTo(v21PuttState.holeX,v21PuttState.holeY-32);ctx.stroke();
  // trail
  if(v21PuttState.trail.length>1){
    ctx.beginPath();ctx.moveTo(v21PuttState.trail[0][0],v21PuttState.trail[0][1]);
    for(var i=1;i<v21PuttState.trail.length;i++){
      ctx.lineTo(v21PuttState.trail[i][0],v21PuttState.trail[i][1]);
    }
    ctx.strokeStyle='rgba(255,255,255,0.6)';ctx.lineWidth=2;ctx.setLineDash([4,4]);ctx.stroke();ctx.setLineDash([]);
  }
  // ball
  ctx.beginPath();ctx.arc(v21PuttState.ballX,v21PuttState.ballY,8,0,Math.PI*2);
  ctx.fillStyle='#fff';ctx.fill();
  ctx.strokeStyle='#ccc';ctx.lineWidth=1;ctx.stroke();
  // aim line
  if(!v21PuttState.rolling){
    var aimLen=60;
    var ax=v21PuttState.ballX+Math.cos(v21PuttState.angle)*aimLen;
    var ay=v21PuttState.ballY+Math.sin(v21PuttState.angle)*aimLen;
    ctx.beginPath();ctx.moveTo(v21PuttState.ballX,v21PuttState.ballY);ctx.lineTo(ax,ay);
    ctx.strokeStyle='rgba(255,107,53,0.8)';ctx.lineWidth=2;ctx.setLineDash([6,4]);ctx.stroke();ctx.setLineDash([]);
    ctx.beginPath();ctx.moveTo(ax,ay);
    ctx.lineTo(ax-8*Math.cos(v21PuttState.angle-0.4),ay-8*Math.sin(v21PuttState.angle-0.4));
    ctx.lineTo(ax-8*Math.cos(v21PuttState.angle+0.4),ay-8*Math.sin(v21PuttState.angle+0.4));
    ctx.closePath();ctx.fillStyle='rgba(255,107,53,0.8)';ctx.fill();
  }
  // distance
  var dist=Math.sqrt(Math.pow(v21PuttState.ballX-v21PuttState.holeX,2)+Math.pow(v21PuttState.ballY-v21PuttState.holeY,2));
  ctx.fillStyle='#fff';ctx.font='bold 12px sans-serif';
  ctx.fillText((dist*0.03).toFixed(1)+'m',v21PuttState.ballX+14,v21PuttState.ballY-14);
}

function v21DoPutt(){
  if(v21PuttState.rolling)return;
  v21PuttState.rolling=true;
  v21PuttState.trail=[[v21PuttState.ballX,v21PuttState.ballY]];
  var speedFactor=(15-v21PuttState.speed)*0.15+1;
  var pwr=v21PuttState.power*0.06*speedFactor;
  v21PuttState.ballVX=Math.cos(v21PuttState.angle)*pwr;
  v21PuttState.ballVY=Math.sin(v21PuttState.angle)*pwr;
  v21PuttState.attempts++;
  document.getElementById('v21PuttAttempts').textContent=v21PuttState.attempts;
  v21PlaySFX('putt_hit');
  v21AnimatePutt();
}

function v21AnimatePutt(){
  if(!v21PuttState.rolling)return;
  var friction=0.97-(v21PuttState.speed-6)*0.003;
  var slopeForce=v21PuttState.slope*0.012;
  v21PuttState.ballVX+=slopeForce;
  v21PuttState.ballVX*=friction;
  v21PuttState.ballVY*=friction;
  v21PuttState.ballX+=v21PuttState.ballVX;
  v21PuttState.ballY+=v21PuttState.ballVY;
  v21PuttState.trail.push([v21PuttState.ballX,v21PuttState.ballY]);
  // boundary check
  if(v21PuttState.ballX<10||v21PuttState.ballX>490||v21PuttState.ballY<10||v21PuttState.ballY>410){
    v21PuttState.rolling=false;
    v21DrawPutt();
    v21Toast('&#x274C; &#xADF8;&#xB9B0;&#xC744; &#xBC97;&#xC5B4;&#xB0AC;&#xC2B5;&#xB2C8;&#xB2E4;!');
    v21PlaySFX('putt_miss');
    return;
  }
  // hole check
  var dx=v21PuttState.ballX-v21PuttState.holeX;
  var dy=v21PuttState.ballY-v21PuttState.holeY;
  var dist=Math.sqrt(dx*dx+dy*dy);
  var spd=Math.sqrt(v21PuttState.ballVX*v21PuttState.ballVX+v21PuttState.ballVY*v21PuttState.ballVY);
  if(dist<14&&spd<4){
    v21PuttState.rolling=false;
    v21PuttState.ballX=v21PuttState.holeX;
    v21PuttState.ballY=v21PuttState.holeY;
    v21PuttState.made++;
    document.getElementById('v21PuttMade').textContent=v21PuttState.made;
    v21DrawPutt();
    v21Toast('&#x1F3C6; &#xD37C;&#xD305; &#xC131;&#xACF5;! (' + v21PuttState.made + '/' + v21PuttState.attempts + ')');
    v21PlaySFX('putt_made');
    localStorage.setItem('sg_putt_made',''+(parseInt(localStorage.getItem('sg_putt_made')||'0')+1));
    return;
  }
  // stop check
  if(spd<0.15){
    v21PuttState.rolling=false;
    v21DrawPutt();
    v21Toast('&#x26D4; &#xD640; &#xADFC;&#xCC98;&#xC5D0; &#xBA48;&#xCDA4;&#xC2B5;&#xB2C8;&#xB2E4; (' + dist.toFixed(0) + 'px)');
    v21PlaySFX('putt_short');
    return;
  }
  v21DrawPutt();
  requestAnimationFrame(v21AnimatePutt);
}

function v21ResetPutt(){
  v21PuttState.ballX=250;v21PuttState.ballY=350;v21PuttState.ballVX=0;v21PuttState.ballVY=0;
  v21PuttState.rolling=false;v21PuttState.trail=[];v21PuttState.angle=-Math.PI/2;
  v21DrawPutt();
}
window.v21OpenPutt=v21OpenPutt;
window.v21DoPutt=v21DoPutt;
window.v21ResetPutt=v21ResetPutt;

// ===== 2. LIVE SCORECARD (18-hole real-time input) =====
var v21LivePars=[4,4,3,5,4,4,3,4,5,4,3,5,4,4,3,4,5,4];

function v21OpenLive(){
  var ov=document.getElementById('v21LiveOverlay');
  if(!ov){
    ov=document.createElement('div');ov.id='v21LiveOverlay';ov.className='v21-overlay';
    var h='<div class="v21-modal"><div class="v21-hdr"><h2><span class="v21i">&#x1F4CB;</span> &#xB77C;&#xC6B4;&#xB4DC; &#xB77C;&#xC774;&#xBE0C;&#xC2A4;&#xCF54;&#xC5B4;</h2><button class="v21-x" onclick="document.getElementById(\'v21LiveOverlay\').classList.remove(\'active\')">&times;</button></div>';
    h+='<div style="overflow-x:auto"><table class="v21-live-table"><thead><tr><th>Hole</th>';
    for(var i=1;i<=18;i++) h+='<th>'+i+'</th>';
    h+='<th>OUT</th><th>IN</th><th>TOT</th></tr><tr><th>Par</th>';
    for(var i=0;i<18;i++) h+='<th>'+v21LivePars[i]+'</th>';
    h+='<th>36</th><th>36</th><th>72</th></tr></thead><tbody><tr><th>Score</th>';
    for(var i=0;i<18;i++) h+='<td><input type="number" id="v21H'+(i+1)+'" min="1" max="12" onchange="v21CalcLive()"></td>';
    h+='<td id="v21Out" style="font-weight:800">-</td><td id="v21In" style="font-weight:800">-</td><td id="v21Tot" style="font-weight:800;color:var(--primary)">-</td></tr>';
    h+='<tr><th>Putts</th>';
    for(var i=0;i<18;i++) h+='<td><input type="number" id="v21P'+(i+1)+'" min="0" max="6" onchange="v21CalcLive()"></td>';
    h+='<td id="v21POut">-</td><td id="v21PIn">-</td><td id="v21PTot">-</td></tr>';
    h+='<tr><th>FIR</th>';
    for(var i=0;i<18;i++){
      if(v21LivePars[i]>=4) h+='<td><input type="checkbox" id="v21F'+(i+1)+'" onchange="v21CalcLive()"></td>';
      else h+='<td>-</td>';
    }
    h+='<td id="v21FOut">-</td><td id="v21FIn">-</td><td id="v21FTot">-</td></tr>';
    h+='</tbody></table></div>';
    h+='<div class="v21-divider"></div><div class="v21-grid4" id="v21LiveStats"></div>';
    h+='<div style="text-align:center;margin-top:14px"><button class="v21-btn v21-btn-primary" onclick="v21SaveLive()">&#x1F4BE; &#xC800;&#xC7A5;</button> <button class="v21-btn v21-btn-danger" onclick="v21ClearLive()">&#x1F5D1; &#xCD08;&#xAE30;&#xD654;</button></div></div>';
    ov.innerHTML=h;
    document.body.appendChild(ov);
  }
  ov.classList.add('active');
  v21LoadLive();
  v21PlaySFX('live_open');
}

function v21CalcLive(){
  var out=0,inn=0,pout=0,pinn=0,fout=0,finn=0,fcout=0,fcinn=0;
  for(var i=1;i<=18;i++){
    var s=parseInt(document.getElementById('v21H'+i).value)||0;
    var p=parseInt(document.getElementById('v21P'+i).value)||0;
    if(i<=9){out+=s;pout+=p;}else{inn+=s;pinn+=p;}
    if(v21LivePars[i-1]>=4){
      var fb=document.getElementById('v21F'+i);
      if(fb){if(i<=9){fcout++;if(fb.checked)fout++;}else{fcinn++;if(fb.checked)finn++;}}
    }
    // color cells
    var inp=document.getElementById('v21H'+i);
    if(inp&&s>0){
      var diff=s-v21LivePars[i-1];
      inp.className='';
      if(diff<=-2)inp.className='eagle-cell';
      else if(diff===-1)inp.className='birdie-cell';
      else if(diff===0)inp.className='par-cell';
      else if(diff===1)inp.className='bogey-cell';
      else if(diff>=2)inp.className='dbl-cell';
    }
  }
  document.getElementById('v21Out').textContent=out||'-';
  document.getElementById('v21In').textContent=inn||'-';
  document.getElementById('v21Tot').textContent=(out+inn)||'-';
  document.getElementById('v21POut').textContent=pout||'-';
  document.getElementById('v21PIn').textContent=pinn||'-';
  document.getElementById('v21PTot').textContent=(pout+pinn)||'-';
  document.getElementById('v21FOut').textContent=fout+'/'+fcout;
  document.getElementById('v21FIn').textContent=finn+'/'+fcinn;
  document.getElementById('v21FTot').textContent=(fout+finn)+'/'+(fcout+fcinn);
  // stats
  var tot=out+inn;var par=72;var birdies=0;var pars=0;var bogeys=0;var doubles=0;
  for(var i=1;i<=18;i++){
    var s=parseInt(document.getElementById('v21H'+i).value)||0;
    if(s===0)continue;
    var d=s-v21LivePars[i-1];
    if(d<=-1)birdies++;else if(d===0)pars++;else if(d===1)bogeys++;else if(d>=2)doubles++;
  }
  var statsHtml='<div class="v21-card" style="text-align:center"><div style="font-size:20px;font-weight:900;color:var(--primary)">'+(tot?((tot-par>=0?'+':'')+(tot-par)):'-')+'</div><div style="font-size:10px;color:var(--text-muted)">vs Par</div></div>';
  statsHtml+='<div class="v21-card" style="text-align:center"><div style="font-size:20px;font-weight:900;color:#2e9e4f">'+birdies+'</div><div style="font-size:10px;color:var(--text-muted)">Birdies</div></div>';
  statsHtml+='<div class="v21-card" style="text-align:center"><div style="font-size:20px;font-weight:900">'+(pout+pinn||'-')+'</div><div style="font-size:10px;color:var(--text-muted)">Total Putts</div></div>';
  statsHtml+='<div class="v21-card" style="text-align:center"><div style="font-size:20px;font-weight:900;color:var(--accent)">'+(fcout+fcinn>0?Math.round((fout+finn)/(fcout+fcinn)*100)+'%':'-')+'</div><div style="font-size:10px;color:var(--text-muted)">FIR%</div></div>';
  document.getElementById('v21LiveStats').innerHTML=statsHtml;
}

function v21SaveLive(){
  var data={date:new Date().toISOString().slice(0,10),scores:[],putts:[],fir:[]};
  for(var i=1;i<=18;i++){
    data.scores.push(parseInt(document.getElementById('v21H'+i).value)||0);
    data.putts.push(parseInt(document.getElementById('v21P'+i).value)||0);
    var fb=document.getElementById('v21F'+i);
    data.fir.push(fb?fb.checked:false);
  }
  var rounds=JSON.parse(localStorage.getItem('sg_live_rounds')||'[]');
  rounds.unshift(data);if(rounds.length>50)rounds.pop();
  localStorage.setItem('sg_live_rounds',JSON.stringify(rounds));
  localStorage.setItem('sg_rounds_cnt',''+(parseInt(localStorage.getItem('sg_rounds_cnt')||'0')+1));
  v21Toast('&#x2705; &#xB77C;&#xC6B4;&#xB4DC; &#xC800;&#xC7A5; &#xC644;&#xB8CC;!');
  v21PlaySFX('live_save');
}

function v21ClearLive(){
  for(var i=1;i<=18;i++){
    document.getElementById('v21H'+i).value='';
    document.getElementById('v21P'+i).value='';
    var fb=document.getElementById('v21F'+i);if(fb)fb.checked=false;
    var inp=document.getElementById('v21H'+i);inp.className='';
  }
  v21CalcLive();
}

function v21LoadLive(){
  var rounds=JSON.parse(localStorage.getItem('sg_live_rounds')||'[]');
  if(rounds.length>0){
    var last=rounds[0];
    for(var i=0;i<18;i++){
      if(last.scores[i])document.getElementById('v21H'+(i+1)).value=last.scores[i];
      if(last.putts[i])document.getElementById('v21P'+(i+1)).value=last.putts[i];
      var fb=document.getElementById('v21F'+(i+1));if(fb&&last.fir[i])fb.checked=true;
    }
    v21CalcLive();
  }
}
window.v21OpenLive=v21OpenLive;
window.v21CalcLive=v21CalcLive;
window.v21SaveLive=v21SaveLive;
window.v21ClearLive=v21ClearLive;

// ===== 3. GOLF FITNESS PLANNER =====
var v21Fitness=[
  {name:'&#xBAA9; &#xC2A4;&#xD2B8;&#xB808;&#xCE6D;',desc:'&#xC88C;&#xC6B0; &#xAC01; 15&#xCD08;&#xC529; &#xBAA9;&#xC744; &#xCC9C;&#xCC9C;&#xD788; &#xB298;&#xB824;&#xC90D;&#xB2C8;&#xB2E4;',time:'30&#xCD08;',icon:'&#x1F9D8;',cat:'warmup'},
  {name:'&#xC5B4;&#xAE68; &#xD68C;&#xC804;',desc:'&#xC591;&#xD314;&#xC744; &#xD06C;&#xAC8C; &#xC6D0;&#xC744; &#xADF8;&#xB9AC;&#xBA70; &#xD68C;&#xC804;&#xD569;&#xB2C8;&#xB2E4;',time:'45&#xCD08;',icon:'&#x1F4AA;',cat:'warmup'},
  {name:'&#xD5C8;&#xB9AC; &#xD68C;&#xC804;',desc:'&#xC591;&#xC190;&#xC744; &#xD5C8;&#xB9AC;&#xC5D0; &#xB300;&#xACE0; &#xC88C;&#xC6B0;&#xB85C; &#xBE44;&#xD2C0;&#xC5B4; &#xD68C;&#xC804;&#xD569;&#xB2C8;&#xB2E4;',time:'30&#xCD08;',icon:'&#x1F300;',cat:'warmup'},
  {name:'&#xD587;&#xC2A4;&#xD2B8;&#xB9C1; &#xC2A4;&#xD2B8;&#xB808;&#xCE6D;',desc:'&#xD587;&#xC2A4;&#xD2B8;&#xB9C1;&#xC744; &#xB298;&#xB824; &#xC190;&#xBAA9;&#xACFC; &#xD314;&#xB791; &#xC2A0;&#xC804;&#xB450;&#xB97C; &#xD480;&#xC5B4;&#xC90D;&#xB2C8;&#xB2E4;',time:'30&#xCD08;',icon:'&#x270B;',cat:'warmup'},
  {name:'&#xBB34;&#xB986; &#xC2A4;&#xCFFC;&#xD2B8;',desc:'&#xC5C9;&#xB369;&#xC774; &#xC548;&#xC815;&#xC131;&#xC744; &#xC704;&#xD55C; &#xD558;&#xCCB4; &#xAC15;&#xD654; &#xC6B4;&#xB3D9;',time:'60&#xCD08;',icon:'&#x1F9B5;',cat:'strength'},
  {name:'&#xD50C;&#xB7AD;&#xD06C;',desc:'&#xCF54;&#xC5B4; &#xADFC;&#xC721; &#xAC15;&#xD654;&#xB85C; &#xC2A4;&#xC719; &#xC548;&#xC815;&#xC131; &#xD5A5;&#xC0C1;',time:'45&#xCD08;',icon:'&#x1F3CB;',cat:'strength'},
  {name:'&#xBC84;&#xB4DC;&#xB3C5;',desc:'&#xC804;&#xC2E0; &#xADFC;&#xC721; &#xD65C;&#xC131;&#xD654;&#xC640; &#xC2A4;&#xC719; &#xD30C;&#xC6CC; &#xD5A5;&#xC0C1;',time:'60&#xCD08;',icon:'&#x1F426;',cat:'strength'},
  {name:'&#xBC84;&#xD504; &#xD2B8;&#xC704;&#xC2A4;&#xD2B8;',desc:'&#xD5C8;&#xB9AC; &#xD68C;&#xC804;&#xB825; &#xAC15;&#xD654;&#xB85C; &#xBE44;&#xAC70;&#xB9AC; &#xC99D;&#xAC00;',time:'45&#xCD08;',icon:'&#x1F504;',cat:'strength'},
  {name:'&#xD568;&#xC2A4;&#xD2B8;&#xB9C1; &#xC2A4;&#xD2B8;&#xB808;&#xCE6D;',desc:'&#xD314;&#xB791;&#xACFC; &#xC190;&#xBAA9; &#xADFC;&#xC721; &#xC774;&#xC644;',time:'30&#xCD08;',icon:'&#x1F91A;',cat:'cooldown'},
  {name:'&#xB4F1; &#xC2A4;&#xD2B8;&#xB808;&#xCE6D;',desc:'&#xB4F1; &#xADFC;&#xC721; &#xC774;&#xC644;&#xC73C;&#xB85C; &#xB77C;&#xC6B4;&#xB4DC; &#xD53C;&#xB85C; &#xD68C;&#xBCF5;',time:'45&#xCD08;',icon:'&#x1F9D8;&#x200D;&#x2642;&#xFE0F;',cat:'cooldown'},
  {name:'&#xACE0;&#xAD00;&#xC808; &#xC2A4;&#xD2B8;&#xB808;&#xCE6D;',desc:'&#xACE0;&#xAD00;&#xC808; &#xC624;&#xAE08;/&#xC2E0;&#xC804; &#xC774;&#xC644;&#xC73C;&#xB85C; &#xBD80;&#xC0C1; &#xC608;&#xBC29;',time:'30&#xCD08;',icon:'&#x1F9B6;',cat:'cooldown'},
  {name:'&#xC2EC;&#xD638;&#xD761; &#xBA85;&#xC0C1;',desc:'4&#xCD08; &#xD761;&#xC785;-7&#xCD08; &#xC720;&#xC9C0;-8&#xCD08; &#xD638;&#xD761;&#xC73C;&#xB85C; &#xBA58;&#xD0C8; &#xB9AC;&#xC14B;',time:'60&#xCD08;',icon:'&#x1F32C;&#xFE0F;',cat:'cooldown'}
];

function v21OpenFitness(){
  var ov=document.getElementById('v21FitnessOverlay');
  if(!ov){
    ov=document.createElement('div');ov.id='v21FitnessOverlay';ov.className='v21-overlay';
    ov.innerHTML='<div class="v21-modal"><div class="v21-hdr"><h2><span class="v21i">&#x1F3CB;&#xFE0F;</span> &#xACE8;&#xD504; &#xD53C;&#xD2B8;&#xB2C8;&#xC2A4;</h2><button class="v21-x" onclick="document.getElementById(\'v21FitnessOverlay\').classList.remove(\'active\')">&times;</button></div><div class="v21-tabs" id="v21FitTabs"></div><div id="v21FitList"></div><div style="text-align:center;margin-top:12px"><span class="v21-badge" style="background:#e8f5e9;color:var(--primary)">&#xC644;&#xB8CC;: <span id="v21FitDone">0</span>/12</span></div></div>';
    document.body.appendChild(ov);
  }
  ov.classList.add('active');
  v21RenderFitness('all');
  v21PlaySFX('fitness_open');
}

function v21RenderFitness(cat){
  var tabs=[{id:'all',label:'&#xC804;&#xCCB4;'},{id:'warmup',label:'&#x1F525; &#xC6CC;&#xBC0D;&#xC5C5;'},{id:'strength',label:'&#x1F4AA; &#xADFC;&#xB825;'},{id:'cooldown',label:'&#x2744;&#xFE0F; &#xCFE8;&#xB2E4;&#xC6B4;'}];
  var tabH='';tabs.forEach(function(t){
    tabH+='<div class="v21-tab'+(t.id===cat?' active':'')+'" onclick="v21RenderFitness(\''+t.id+'\')">'+t.label+'</div>';
  });
  document.getElementById('v21FitTabs').innerHTML=tabH;
  var done=JSON.parse(localStorage.getItem('sg_fit_done')||'[]');
  var list='';
  v21Fitness.forEach(function(f,i){
    if(cat!=='all'&&f.cat!==cat)return;
    var isDone=done.indexOf(i)!==-1;
    list+='<div class="v21-fitness-item'+(isDone?' done':'')+'" onclick="v21ToggleFit('+i+')"><div class="v21-fitness-icon" style="background:'+(isDone?'#ccc':'linear-gradient(135deg,var(--primary),#4ecca3)')+'">'+f.icon+'</div><div class="v21-fitness-info"><div class="v21-fitness-name">'+f.name+'</div><div class="v21-fitness-desc">'+f.desc+'</div><div class="v21-fitness-time">&#x23F1; '+f.time+'</div></div><div style="font-size:18px">'+(isDone?'&#x2705;':'&#x2B55;')+'</div></div>';
  });
  document.getElementById('v21FitList').innerHTML=list;
  document.getElementById('v21FitDone').textContent=done.length;
}

function v21ToggleFit(idx){
  var done=JSON.parse(localStorage.getItem('sg_fit_done')||'[]');
  var pos=done.indexOf(idx);
  if(pos===-1){done.push(idx);v21PlaySFX('fitness_done');}else{done.splice(pos,1);}
  localStorage.setItem('sg_fit_done',JSON.stringify(done));
  if(done.length>=12){localStorage.setItem('sg_fit_all','1');}
  v21RenderFitness(document.querySelector('.v21-tab.active')?.textContent.includes('&#xC6CC;&#xBC0D;')?'warmup':document.querySelector('.v21-tab.active')?.textContent.includes('&#xADFC;&#xB825;')?'strength':document.querySelector('.v21-tab.active')?.textContent.includes('&#xCFE8;&#xB2E4;')?'cooldown':'all');
}
window.v21OpenFitness=v21OpenFitness;
window.v21RenderFitness=v21RenderFitness;
window.v21ToggleFit=v21ToggleFit;

// ===== 4. GOLF DIARY =====
function v21OpenDiary(){
  var ov=document.getElementById('v21DiaryOverlay');
  if(!ov){
    ov=document.createElement('div');ov.id='v21DiaryOverlay';ov.className='v21-overlay';
    ov.innerHTML='<div class="v21-modal"><div class="v21-hdr"><h2><span class="v21i">&#x1F4D3;</span> &#xACE8;&#xD504; &#xC77C;&#xAE30;</h2><button class="v21-x" onclick="document.getElementById(\'v21DiaryOverlay\').classList.remove(\'active\')">&times;</button></div><div class="v21-card"><h4>&#x270F;&#xFE0F; &#xC0C8; &#xC77C;&#xAE30; &#xC791;&#xC131;</h4><div class="v21-grid3" style="margin-bottom:10px"><div><label style="font-size:11px;font-weight:700">&#xAE30;&#xBD84;</label><select id="v21DiaryMood" class="v21-select" style="width:100%"><option value="&#x1F60A;">&#x1F60A; &#xC88B;&#xC74C;</option><option value="&#x1F60C;">&#x1F60C; &#xBCF4;&#xD1B5;</option><option value="&#x1F924;">&#x1F924; &#xD53C;&#xACE4;</option><option value="&#x1F620;">&#x1F620; &#xC9DC;&#xC99D;</option><option value="&#x1F929;">&#x1F929; &#xCD5C;&#xACE0;</option></select></div><div><label style="font-size:11px;font-weight:700">&#xB0A0;&#xC528;</label><select id="v21DiaryWeather" class="v21-select" style="width:100%"><option value="&#x2600;&#xFE0F;">&#x2600;&#xFE0F; &#xB9D1;&#xC74C;</option><option value="&#x26C5;">&#x26C5; &#xD750;&#xB9BC;</option><option value="&#x1F327;&#xFE0F;">&#x1F327;&#xFE0F; &#xBE44;</option><option value="&#x1F32C;&#xFE0F;">&#x1F32C;&#xFE0F; &#xBC14;&#xB78C;</option></select></div><div><label style="font-size:11px;font-weight:700">&#xC2A4;&#xCF54;&#xC5B4;</label><input type="number" id="v21DiaryScore" class="v21-input" placeholder="ex) 92" min="50" max="150"></div></div><textarea id="v21DiaryText" class="v21-input" rows="3" placeholder="&#xC624;&#xB298; &#xB77C;&#xC6B4;&#xB4DC;&#xC5D0;&#xC11C; &#xBC30;&#xC6B4; &#xC810;, &#xAD50;&#xD6C8;, &#xBAA9;&#xD45C;..." style="resize:vertical"></textarea><div style="text-align:right;margin-top:8px"><button class="v21-btn v21-btn-primary" onclick="v21SaveDiary()">&#x1F4BE; &#xC800;&#xC7A5;</button></div></div><div class="v21-divider"></div><div id="v21DiaryList"></div></div>';
    document.body.appendChild(ov);
  }
  ov.classList.add('active');
  v21RenderDiaries();
  v21PlaySFX('diary_open');
}

function v21SaveDiary(){
  var mood=document.getElementById('v21DiaryMood').value;
  var weather=document.getElementById('v21DiaryWeather').value;
  var score=document.getElementById('v21DiaryScore').value;
  var text=document.getElementById('v21DiaryText').value.trim();
  if(!text){v21Toast('&#x26A0;&#xFE0F; &#xB0B4;&#xC6A9;&#xC744; &#xC785;&#xB825;&#xD574;&#xC8FC;&#xC138;&#xC694;');return;}
  var entries=JSON.parse(localStorage.getItem('sg_diary')||'[]');
  entries.unshift({date:new Date().toISOString().slice(0,10),mood:mood,weather:weather,score:score,text:text.replace(/</g,'&lt;').replace(/>/g,'&gt;')});
  if(entries.length>100)entries.pop();
  localStorage.setItem('sg_diary',JSON.stringify(entries));
  localStorage.setItem('sg_diary_cnt',''+entries.length);
  document.getElementById('v21DiaryText').value='';
  document.getElementById('v21DiaryScore').value='';
  v21RenderDiaries();
  v21Toast('&#x1F4D3; &#xC77C;&#xAE30; &#xC800;&#xC7A5; &#xC644;&#xB8CC;!');
  v21PlaySFX('diary_save');
}

function v21RenderDiaries(){
  var entries=JSON.parse(localStorage.getItem('sg_diary')||'[]');
  var h='';
  if(entries.length===0){h='<p style="text-align:center;color:var(--text-muted);padding:20px">&#xC544;&#xC9C1; &#xC791;&#xC131;&#xD55C; &#xC77C;&#xAE30;&#xAC00; &#xC5C6;&#xC2B5;&#xB2C8;&#xB2E4;</p>';}
  entries.slice(0,20).forEach(function(e){
    h+='<div class="v21-diary-entry"><div class="v21-diary-date">'+e.date+' '+e.weather+(e.score?' | Score: '+e.score:'')+'</div><div class="v21-diary-mood">'+e.mood+'</div><div class="v21-diary-text">'+e.text+'</div></div>';
  });
  document.getElementById('v21DiaryList').innerHTML=h;
}
window.v21OpenDiary=v21OpenDiary;
window.v21SaveDiary=v21SaveDiary;

// ===== 5. TEE TIME PRICE SIMULATOR =====
var v21PriceData={
  weekday_early:[80000,90000,100000,110000,95000,85000],
  weekday_prime:[120000,140000,150000,160000,145000,130000],
  weekday_late:[90000,100000,110000,120000,105000,95000],
  weekend_early:[130000,150000,160000,180000,155000,140000],
  weekend_prime:[180000,200000,220000,250000,210000,190000],
  weekend_late:[140000,160000,170000,190000,165000,150000]
};
var v21Seasons=['&#xBD04;(3-4&#xC6D4;)','&#xCD08;&#xC5EC;&#xB984;(5-6&#xC6D4;)','&#xC131;&#xC218;&#xAE30;(7-8&#xC6D4;)','&#xAC00;&#xC744;(9-10&#xC6D4;)','&#xB2A8;&#xC744;(11-12&#xC6D4;)','&#xACBD;&#xC2DC;(1-2&#xC6D4;)'];

function v21OpenPrice(){
  var ov=document.getElementById('v21PriceOverlay');
  if(!ov){
    ov=document.createElement('div');ov.id='v21PriceOverlay';ov.className='v21-overlay';
    ov.innerHTML='<div class="v21-modal"><div class="v21-hdr"><h2><span class="v21i">&#x1F4B0;</span> &#xD2F0;&#xD0C0;&#xC784; &#xAC00;&#xACA9; &#xBE44;&#xAD50;</h2><button class="v21-x" onclick="document.getElementById(\'v21PriceOverlay\').classList.remove(\'active\')">&times;</button></div><div class="v21-tabs" id="v21PriceTabs"></div><div id="v21PriceContent"></div><div class="v21-divider"></div><div class="v21-card"><h4>&#x1F4A1; &#xC808;&#xC57D; &#xD301;</h4><p>&#x2022; &#xD3C9;&#xC77C; &#xC624;&#xD6C4; &#xB808;&#xC774;&#xD2B8;&#xAC00; &#xC8FC;&#xB9D0; &#xB300;&#xBE44; 30-40% &#xC800;&#xB834;<br>&#x2022; &#xACBD;&#xC2DC;(1-2&#xC6D4;) &#xACFC; &#xBD04;(3-4&#xC6D4;) &#xCD08;&#xBC18;&#xC774; &#xAC00;&#xC7A5; &#xC800;&#xB834;<br>&#x2022; &#xC5BC;&#xB9AC;&#xBC84;&#xB4DC; &#xC608;&#xC57D;&#xC73C;&#xB85C; 10-15% &#xCD94;&#xAC00; &#xD560;&#xC778;<br>&#x2022; 4&#xC778; &#xADF8;&#xB8F9; &#xC608;&#xC57D; &#xC2DC; &#xC778;&#xB2F9; &#xBE44;&#xC6A9; &#xC808;&#xAC10;</p></div></div>';
    document.body.appendChild(ov);
  }
  ov.classList.add('active');
  v21RenderPrice('weekday');
  v21PlaySFX('price_open');
}

function v21RenderPrice(type){
  var tabs=[{id:'weekday',label:'&#x1F4C5; &#xD3C9;&#xC77C;'},{id:'weekend',label:'&#x1F3D6;&#xFE0F; &#xC8FC;&#xB9D0;'}];
  var tabH='';tabs.forEach(function(t){
    tabH+='<div class="v21-tab'+(t.id===type?' active':'')+'" onclick="v21RenderPrice(\''+t.id+'\')">'+t.label+'</div>';
  });
  document.getElementById('v21PriceTabs').innerHTML=tabH;
  var early=v21PriceData[type+'_early'];
  var prime=v21PriceData[type+'_prime'];
  var late=v21PriceData[type+'_late'];
  var maxP=Math.max.apply(null,prime);
  var h='<div style="margin-bottom:16px"><h4 style="font-size:14px;font-weight:700;margin-bottom:10px">&#x2600;&#xFE0F; &#xC5BC;&#xB9AC; (06:00-08:00)</h4><div class="v21-price-bar">';
  early.forEach(function(p,i){
    var pct=Math.round(p/maxP*100);
    h+='<div class="v21-price-col" style="height:'+pct+'%"><span class="v21-price-val">'+(p/10000).toFixed(0)+'&#xB9CC;</span><span class="v21-price-label">'+v21Seasons[i].split('(')[0]+'</span></div>';
  });
  h+='</div></div>';
  h+='<div style="margin-bottom:16px;margin-top:30px"><h4 style="font-size:14px;font-weight:700;margin-bottom:10px">&#x1F31F; &#xD504;&#xB77C;&#xC784; (08:00-12:00)</h4><div class="v21-price-bar">';
  prime.forEach(function(p,i){
    var pct=Math.round(p/maxP*100);
    h+='<div class="v21-price-col" style="height:'+pct+'%;background:linear-gradient(to top,#ff6b35,#ffd700)"><span class="v21-price-val">'+(p/10000).toFixed(0)+'&#xB9CC;</span><span class="v21-price-label">'+v21Seasons[i].split('(')[0]+'</span></div>';
  });
  h+='</div></div>';
  h+='<div style="margin-top:30px"><h4 style="font-size:14px;font-weight:700;margin-bottom:10px">&#x1F307; &#xB808;&#xC774;&#xD2B8; (12:00-)</h4><div class="v21-price-bar">';
  late.forEach(function(p,i){
    var pct=Math.round(p/maxP*100);
    h+='<div class="v21-price-col" style="height:'+pct+'%;background:linear-gradient(to top,#5f27cd,#a55eea)"><span class="v21-price-val">'+(p/10000).toFixed(0)+'&#xB9CC;</span><span class="v21-price-label">'+v21Seasons[i].split('(')[0]+'</span></div>';
  });
  h+='</div></div>';
  document.getElementById('v21PriceContent').innerHTML=h;
}
window.v21OpenPrice=v21OpenPrice;
window.v21RenderPrice=v21RenderPrice;

// ===== 6. BUDDY PROFILE MANAGER =====
function v21OpenBuddy(){
  var ov=document.getElementById('v21BuddyOverlay');
  if(!ov){
    ov=document.createElement('div');ov.id='v21BuddyOverlay';ov.className='v21-overlay';
    ov.innerHTML='<div class="v21-modal"><div class="v21-hdr"><h2><span class="v21i">&#x1F465;</span> &#xB3D9;&#xBC18;&#xC790; &#xD504;&#xB85C;&#xD544;</h2><button class="v21-x" onclick="document.getElementById(\'v21BuddyOverlay\').classList.remove(\'active\')">&times;</button></div><div class="v21-card"><h4>&#x2795; &#xC0C8; &#xB3D9;&#xBC18;&#xC790; &#xCD94;&#xAC00;</h4><div class="v21-grid2"><div><input type="text" id="v21BuddyName" class="v21-input" placeholder="&#xC774;&#xB984;"></div><div><input type="number" id="v21BuddyHdcp" class="v21-input" placeholder="&#xD578;&#xB514;&#xCEA1; (ex:18)" min="0" max="54"></div></div><div class="v21-grid2" style="margin-top:8px"><div><select id="v21BuddyStyle" class="v21-select" style="width:100%"><option value="aggressive">&#x1F525; &#xACF5;&#xACA9;&#xC801;</option><option value="safe">&#x1F6E1;&#xFE0F; &#xC548;&#xC804;&#xD615;</option><option value="balanced">&#x2696;&#xFE0F; &#xADE0;&#xD615;&#xD615;</option><option value="putter">&#x26F3; &#xD37C;&#xD305;&#xACE0;&#xC218;</option></select></div><div><input type="text" id="v21BuddyPhone" class="v21-input" placeholder="&#xC5F0;&#xB77D;&#xCC98; (&#xC120;&#xD0DD;)"></div></div><div style="text-align:right;margin-top:8px"><button class="v21-btn v21-btn-primary" onclick="v21AddBuddy()">&#x2795; &#xCD94;&#xAC00;</button></div></div><div class="v21-divider"></div><div id="v21BuddyList"></div></div>';
    document.body.appendChild(ov);
  }
  ov.classList.add('active');
  v21RenderBuddies();
  v21PlaySFX('buddy_open');
}

function v21AddBuddy(){
  var name=document.getElementById('v21BuddyName').value.trim();
  if(!name){v21Toast('&#x26A0;&#xFE0F; &#xC774;&#xB984;&#xC744; &#xC785;&#xB825;&#xD574;&#xC8FC;&#xC138;&#xC694;');return;}
  var hdcp=document.getElementById('v21BuddyHdcp').value||'N/A';
  var style=document.getElementById('v21BuddyStyle').value;
  var phone=document.getElementById('v21BuddyPhone').value.trim();
  var buddies=JSON.parse(localStorage.getItem('sg_buddies')||'[]');
  buddies.push({name:name.replace(/</g,'&lt;'),hdcp:hdcp,style:style,phone:phone.replace(/</g,'&lt;'),rounds:0,added:new Date().toISOString().slice(0,10)});
  localStorage.setItem('sg_buddies',JSON.stringify(buddies));
  localStorage.setItem('sg_buddy_cnt',''+buddies.length);
  document.getElementById('v21BuddyName').value='';
  document.getElementById('v21BuddyHdcp').value='';
  document.getElementById('v21BuddyPhone').value='';
  v21RenderBuddies();
  v21Toast('&#x2705; &#xB3D9;&#xBC18;&#xC790; &#xCD94;&#xAC00; &#xC644;&#xB8CC;!');
  v21PlaySFX('buddy_add');
}

function v21RenderBuddies(){
  var buddies=JSON.parse(localStorage.getItem('sg_buddies')||'[]');
  var h='';
  if(buddies.length===0){h='<p style="text-align:center;color:var(--text-muted);padding:20px">&#xB4F1;&#xB85D;&#xB41C; &#xB3D9;&#xBC18;&#xC790;&#xAC00; &#xC5C6;&#xC2B5;&#xB2C8;&#xB2E4;</p>';}
  var styleLabels={aggressive:'&#x1F525; &#xACF5;&#xACA9;&#xC801;',safe:'&#x1F6E1;&#xFE0F; &#xC548;&#xC804;&#xD615;',balanced:'&#x2696;&#xFE0F; &#xADE0;&#xD615;&#xD615;',putter:'&#x26F3; &#xD37C;&#xD305;&#xACE0;&#xC218;'};
  buddies.forEach(function(b,i){
    h+='<div class="v21-buddy-card"><div class="v21-buddy-avatar">'+b.name.charAt(0)+'</div><div class="v21-buddy-info"><div class="v21-buddy-name">'+b.name+'</div><div class="v21-buddy-meta">HDCP: '+b.hdcp+' | '+(styleLabels[b.style]||b.style)+' | &#xB4F1;&#xB85D;: '+b.added+'</div></div><button class="v21-btn v21-btn-sm v21-btn-danger" onclick="v21DelBuddy('+i+')">&#x1F5D1;</button></div>';
  });
  document.getElementById('v21BuddyList').innerHTML=h;
}

function v21DelBuddy(idx){
  var buddies=JSON.parse(localStorage.getItem('sg_buddies')||'[]');
  buddies.splice(idx,1);
  localStorage.setItem('sg_buddies',JSON.stringify(buddies));
  localStorage.setItem('sg_buddy_cnt',''+buddies.length);
  v21RenderBuddies();
  v21Toast('&#x1F5D1; &#xC0AD;&#xC81C;&#xB428;');
}
window.v21OpenBuddy=v21OpenBuddy;
window.v21AddBuddy=v21AddBuddy;
window.v21DelBuddy=v21DelBuddy;

// ===== 7. RULES SIMULATOR (Situational Golf Rules) =====
var v21Rules=[
  {q:'&#xBCFC;&#xC774; OB &#xAD6C;&#xC5ED;&#xC73C;&#xB85C; &#xB0A0;&#xC544;&#xAC14;&#xC2B5;&#xB2C8;&#xB2E4;. &#xC5B4;&#xB5BB;&#xAC8C; &#xD574;&#xC57C; &#xD558;&#xB098;&#xC694;?',choices:['&#xBCFC;&#xC774; &#xBA48;&#xCD98; &#xACF3;&#xC5D0;&#xC11C; &#xADF8;&#xB300;&#xB85C; &#xD50C;&#xB808;&#xC774;','&#xC6D0;&#xB798; &#xC790;&#xB9AC;&#xC5D0;&#xC11C; 1&#xBC8C;&#xD0C0; &#xCD94;&#xAC00;&#xD558;&#xC5EC; &#xC7AC;&#xD0C0;','2&#xBC8C;&#xD0C0; &#xCD94;&#xAC00;&#xD558;&#xACE0; &#xBC1C;&#xACAC; &#xC9C0;&#xC810;&#xC5D0;&#xC11C; &#xB4DC;&#xB86D;','OB &#xACBD;&#xACC4;&#xC120; &#xADFC;&#xCC98;&#xC5D0; &#xBCFC;&#xC744; &#xB193;&#xACE0; &#xCE58;&#xB294;&#xB2E4;'],ans:1,explain:'OB&#xB294; &#xC6D0;&#xB798; &#xC790;&#xB9AC;&#xC5D0;&#xC11C; 1&#xBC8C;&#xD0C0; &#xCD94;&#xAC00;(&#xC2A4;&#xD2B8;&#xB85C;&#xD06C;+&#xAC70;&#xB9AC;)&#xD558;&#xC5EC; &#xC7AC;&#xD0C0;&#xD569;&#xB2C8;&#xB2E4;. (&#xADDC;&#xCE59; 18.2)'},
  {q:'&#xBC99;&#xCEE4;&#xC5D0;&#xC11C; &#xBCFC;&#xC774; &#xC5B8;&#xD50C;&#xB808;&#xC774;&#xC5B4;&#xBE14; &#xC0C1;&#xD669;&#xC785;&#xB2C8;&#xB2E4;. &#xC5B4;&#xB5BB;&#xAC8C; &#xD558;&#xB098;&#xC694;?',choices:['&#xADF8;&#xB300;&#xB85C; &#xCE5C;&#xB2E4; (&#xBC8C;&#xD0C0; &#xC5C6;&#xC74C;)','1&#xBC8C;&#xD0C0; &#xCD94;&#xAC00;&#xD558;&#xACE0; &#xAC00;&#xC7A5; &#xAC00;&#xAE4C;&#xC6B4; &#xAD6C;&#xC81C; &#xC9C0;&#xC810;&#xC5D0;&#xC11C; &#xB4DC;&#xB86D;','2&#xD074;&#xB7FD; &#xC774;&#xB0B4;&#xC5D0; &#xBCFC;&#xC744; &#xB193;&#xACE0; &#xBCFC;&#xD0C0; &#xC5C6;&#xC774; &#xD50C;&#xB808;&#xC774;','&#xBC29;&#xD574;&#xBB3C;&#xC744; &#xC81C;&#xAC70;&#xD558;&#xACE0; &#xADF8;&#xB300;&#xB85C; &#xD50C;&#xB808;&#xC774;'],ans:1,explain:'&#xBC99;&#xCEE4;&#xC5D0;&#xC11C; &#xC5B8;&#xD50C;&#xB808;&#xC774;&#xC5B4;&#xBE14;&#xC774;&#xBA74; 1&#xBC8C;&#xD0C0; &#xBC8C;&#xCE59;&#xC744; &#xBC1B;&#xACE0; &#xAD6C;&#xC81C;(&#xB808;&#xD130;&#xB7F4; &#xB9B4;&#xB9AC;&#xD504;) &#xBC1B;&#xC2B5;&#xB2C8;&#xB2E4;. (&#xADDC;&#xCE59; 19.1)'},
  {q:'&#xD398;&#xC5B4;&#xC6E8;&#xC774;&#xC5D0;&#xC11C; &#xD504;&#xB9AC;&#xC0F7; &#xB8E8;&#xD2F4; &#xC911; &#xC6B0;&#xC5F0;&#xD788; &#xBCFC;&#xC744; &#xAC74;&#xB4DC;&#xB838;&#xC2B5;&#xB2C8;&#xB2E4;. &#xBC8C;&#xD0C0;&#xAC00; &#xC788;&#xB098;&#xC694;?',choices:['2&#xBC8C;&#xD0C0;','1&#xBC8C;&#xD0C0;','&#xBC8C;&#xD0C0; &#xC5C6;&#xC74C;','&#xC2A4;&#xD2B8;&#xB85C;&#xD06C; &#xCDE8;&#xC18C;'],ans:2,explain:'&#xD398;&#xC5B4;&#xC6E8;&#xC774;&#xC5D0;&#xC11C; &#xD504;&#xB9AC;&#xC0F7; &#xB8E8;&#xD2F4; &#xC5F0;&#xC2B5; &#xC2A4;&#xC719; &#xC911; &#xC6B0;&#xC5F0;&#xD788; &#xBCFC;&#xC744; &#xAC74;&#xB4DC;&#xB9AC;&#xB294; &#xAC83;&#xC740; &#xBC8C;&#xD0C0;&#xAC00; &#xC5C6;&#xC2B5;&#xB2C8;&#xB2E4;. (&#xADDC;&#xCE59; 10.1a)'},
  {q:'&#xADF8;&#xB9B0; &#xC704;&#xC5D0;&#xC11C; &#xBCFC; &#xB9C8;&#xCEE4;&#xB97C; &#xC9D1;&#xC5B4;&#xC62C;&#xB9B0; &#xD6C4; &#xBCFC;&#xC774; &#xC6C0;&#xC9C1;&#xC600;&#xC2B5;&#xB2C8;&#xB2E4;. &#xBC8C;&#xD0C0;&#xC778;&#xAC00;&#xC694;?',choices:['1&#xBC8C;&#xD0C0;','2&#xBC8C;&#xD0C0;','&#xBC8C;&#xD0C0; &#xC5C6;&#xC74C;, &#xC6D0;&#xC704;&#xCE58;&#xB85C; &#xBCF5;&#xAD6C;','&#xC6C0;&#xC9C1;&#xC778; &#xC704;&#xCE58;&#xC5D0;&#xC11C; &#xADF8;&#xB300;&#xB85C; &#xD50C;&#xB808;&#xC774;'],ans:2,explain:'&#xBCFC; &#xB9C8;&#xCEE4;&#xB97C; &#xC9D1;&#xC5B4;&#xC62C;&#xB9B4; &#xB54C; &#xBCFC;&#xC774; &#xC6C0;&#xC9C1;&#xC600;&#xB2E4;&#xBA74; &#xBC8C;&#xD0C0; &#xC5C6;&#xC774; &#xC6D0;&#xB798; &#xC704;&#xCE58;&#xB85C; &#xBCF5;&#xAD6C;&#xD569;&#xB2C8;&#xB2E4;. (&#xADDC;&#xCE59; 9.4b)'},
  {q:'&#xC77C;&#xC2DC;&#xC801; &#xACE0;&#xC778; &#xBB3C;(&#xBE44; &#xC628; &#xD6C4; &#xBB3C;&#xC6C5;&#xB369;&#xC774;)&#xC5D0; &#xBCFC;&#xC774; &#xBE60;&#xC84C;&#xC2B5;&#xB2C8;&#xB2E4;. &#xC5B4;&#xB5BB;&#xAC8C; &#xD558;&#xB098;&#xC694;?',choices:['&#xADF8;&#xB300;&#xB85C; &#xCE5C;&#xB2E4;','&#xBB34;&#xBC8C;&#xD0C0; &#xAD6C;&#xC81C; &#xAC00;&#xB2A5; (&#xAC00;&#xC7A5; &#xAC00;&#xAE4C;&#xC6B4; &#xC644;&#xC804;&#xAD6C;&#xC81C; &#xC9C0;&#xC810;&#xC5D0; &#xB4DC;&#xB86D;)','1&#xBC8C;&#xD0C0; &#xCD94;&#xAC00; &#xD6C4; &#xC6D0;&#xB798; &#xC790;&#xB9AC;&#xC5D0;&#xC11C; &#xC7AC;&#xD0C0;','&#xAC8C;&#xC784;&#xC744; &#xC911;&#xB2E8;&#xD55C;&#xB2E4;'],ans:1,explain:'&#xC77C;&#xC2DC;&#xC801; &#xACE0;&#xC778; &#xBB3C;&#xC740; &#xBE44;&#xC815;&#xC0C1;&#xC801; &#xCF54;&#xC2A4; &#xC0C1;&#xD669;&#xC73C;&#xB85C; &#xBB34;&#xBC8C;&#xD0C0; &#xAD6C;&#xC81C;&#xAC00; &#xAC00;&#xB2A5;&#xD569;&#xB2C8;&#xB2E4;. (&#xADDC;&#xCE59; 16.1e)'},
  {q:'&#xD2F0;&#xC0F7; &#xC2DC; &#xD2F0; &#xC704;&#xC5D0; &#xBCFC;&#xC744; &#xC62C;&#xB824;&#xB193;&#xACE0; &#xC5B4;&#xB4DC;&#xB808;&#xC2A4; &#xD6C4; &#xBCFC;&#xC774; &#xB5A8;&#xC5B4;&#xC84C;&#xC2B5;&#xB2C8;&#xB2E4;. &#xCE74;&#xC6B4;&#xD2B8;&#xB418;&#xB098;&#xC694;?',choices:['&#xC608;, 1&#xD0C0;&#xB85C; &#xCE74;&#xC6B4;&#xD2B8;','&#xC544;&#xB2C8;&#xC624;, &#xBCFC;&#xD0C0; &#xC5C6;&#xC774; &#xB2E4;&#xC2DC; &#xD2F0;&#xC5C5;','&#xC608;, 2&#xD0C0;&#xB85C; &#xCE74;&#xC6B4;&#xD2B8;','&#xC544;&#xB2C8;&#xC624;, &#xC5B4;&#xB4DC;&#xB808;&#xC2A4;&#xB294; &#xC2A4;&#xD2B8;&#xB85C;&#xD06C;&#xAC00; &#xC544;&#xB2D8;'],ans:1,explain:'&#xD2F0;&#xC5C5; &#xAD6C;&#xC5ED;&#xC5D0;&#xC11C; &#xC5B4;&#xB4DC;&#xB808;&#xC2A4; &#xD6C4; &#xBCFC;&#xC774; &#xB5A8;&#xC5B4;&#xC9C0;&#xBA74; &#xBC8C;&#xD0C0; &#xC5C6;&#xC774; &#xB2E4;&#xC2DC; &#xD2F0;&#xC5C5;&#xD569;&#xB2C8;&#xB2E4;. (&#xADDC;&#xCE59; 6.2b(5))'},
  {q:'&#xB3D9;&#xBC18;&#xC790;&#xC758; &#xD37C;&#xD305; &#xB77C;&#xC778;&#xC744; &#xBB3C;&#xC5B4;&#xBD24;&#xC2B5;&#xB2C8;&#xB2E4;. &#xBC8C;&#xD0C0;&#xC778;&#xAC00;&#xC694;?',choices:['2&#xBC8C;&#xD0C0;','1&#xBC8C;&#xD0C0;','&#xBC8C;&#xD0C0; &#xC5C6;&#xC74C;','&#xACBD;&#xACE0;&#xB9CC; &#xBC1B;&#xC74C;'],ans:0,explain:'&#xB3D9;&#xBC18;&#xC790;&#xC5D0;&#xAC8C; &#xD37C;&#xD305; &#xB77C;&#xC778;&#xC744; &#xBB3C;&#xC5B4;&#xBCF4;&#xB294; &#xAC83;&#xC740; &#xC5B4;&#xB4DC;&#xBC14;&#xC774;&#xC2A4; &#xC704;&#xBC18;&#xC73C;&#xB85C; 2&#xBC8C;&#xD0C0;&#xC785;&#xB2C8;&#xB2E4;. (&#xADDC;&#xCE59; 10.2a)'},
  {q:'&#xCE74;&#xD2B8;&#xBC31;&#xC5D0;&#xC11C; &#xD50C;&#xB808;&#xC774; &#xC911; &#xD074;&#xB7FD;&#xC774; 14&#xAC1C;&#xAC00; &#xB118;&#xB294; &#xAC83;&#xC744; &#xBC1C;&#xACAC;&#xD588;&#xC2B5;&#xB2C8;&#xB2E4;. &#xC5B4;&#xB5BB;&#xAC8C; &#xB418;&#xB098;&#xC694;?',choices:['&#xBC1C;&#xACAC; &#xC989;&#xC2DC; &#xCD08;&#xACFC; &#xD074;&#xB7FD;&#xC744; &#xC81C;&#xAC70;&#xD558;&#xACE0; &#xD640;&#xB2F9; 2&#xBC8C;&#xD0C0; &#xCD5C;&#xB300; 4&#xD0C0;','&#xC2E4;&#xACA9;','&#xD074;&#xB7FD; &#xC81C;&#xAC70; &#xC5C6;&#xC774; &#xACC4;&#xC18D; &#xD50C;&#xB808;&#xC774;','&#xB77C;&#xC6B4;&#xB4DC; &#xC2E4;&#xACA9; &#xCC98;&#xB9AC;'],ans:0,explain:'&#xCD08;&#xACFC; &#xD074;&#xB7FD;&#xC744; &#xC989;&#xC2DC; &#xC81C;&#xAC70;&#xD558;&#xACE0; &#xBC1C;&#xACAC; &#xC804; &#xD640;&#xB2F9; 2&#xBC8C;&#xD0C0;(&#xCD5C;&#xB300; 4&#xD0C0;). (&#xADDC;&#xCE59; 4.1b)'},
  {q:'&#xBCFC;&#xC774; &#xB098;&#xBB34; &#xC704;&#xC5D0; &#xAC78;&#xB824; &#xC788;&#xC2B5;&#xB2C8;&#xB2E4;. &#xBCFC;&#xC744; &#xD754;&#xB4E4;&#xC5B4; &#xB5A8;&#xC5B4;&#xB728;&#xB9B4; &#xC218; &#xC788;&#xB098;&#xC694;?',choices:['&#xC608;, &#xBB34;&#xBC8C;&#xD0C0;&#xB85C; &#xD754;&#xB4E4; &#xC218; &#xC788;&#xB2E4;','&#xC544;&#xB2C8;&#xC624;, &#xC5B8;&#xD50C;&#xB808;&#xC774;&#xC5B4;&#xBE14;&#xB85C; &#xCC98;&#xB9AC;&#xD574;&#xC57C; &#xD55C;&#xB2E4;','&#xC608;, &#xD558;&#xC9C0;&#xB9CC; 1&#xBC8C;&#xD0C0; &#xCD94;&#xAC00;','&#xB098;&#xBB34;&#xB97C; &#xD754;&#xB4E4;&#xBA74; 2&#xBC8C;&#xD0C0;'],ans:3,explain:'&#xB098;&#xBB34;&#xB97C; &#xD754;&#xB4E4;&#xC5B4; &#xBCFC;&#xC744; &#xB5A8;&#xC5B4;&#xB728;&#xB9AC;&#xBA74; &#xBCFC;&#xC744; &#xC6C0;&#xC9C1;&#xC778; &#xAC83;&#xC73C;&#xB85C; 1&#xBC8C;&#xD0C0;+&#xBCF5;&#xAD6C;. &#xADF8;&#xB300;&#xB85C; &#xCE58;&#xAC70;&#xB098; &#xC5B8;&#xD50C;&#xB808;&#xC774;&#xC5B4;&#xBE14; &#xAD6C;&#xC81C;&#xB97C; &#xBC1B;&#xC73C;&#xC138;&#xC694;. (&#xADDC;&#xCE59; 9.4)'},
  {q:'&#xD398;&#xB110;&#xD2F0; &#xAD6C;&#xC5ED;(&#xBE68;&#xAC04; &#xB9D0;&#xB69A;) &#xC548;&#xC5D0; &#xBCFC;&#xC774; &#xC788;&#xC2B5;&#xB2C8;&#xB2E4;. &#xC120;&#xD0DD;&#xC9C0;&#xB294;?',choices:['&#xADF8;&#xB300;&#xB85C; &#xCE5C;&#xB2E4; (&#xBB34;&#xBC8C;&#xD0C0;)','1&#xBC8C;&#xD0C0;: 2&#xD074;&#xB7FD; &#xC774;&#xB0B4; &#xB4DC;&#xB86D; / &#xD640; &#xB4A4;&#xC5D0;&#xC11C; &#xB4DC;&#xB86D; / &#xC7AC;&#xD0C0;','2&#xBC8C;&#xD0C0;&#xB9CC; &#xCD94;&#xAC00;','&#xBB34;&#xBC8C;&#xD0C0; &#xAD6C;&#xC81C;'],ans:1,explain:'&#xD398;&#xB110;&#xD2F0; &#xAD6C;&#xC5ED;&#xC5D0;&#xC11C;&#xB294; 3&#xAC00;&#xC9C0; &#xC120;&#xD0DD;&#xC9C0;(&#xBAA8;&#xB450; 1&#xBC8C;&#xD0C0;): &#xD640; &#xB4A4; &#xB4DC;&#xB86D;, 2&#xD074;&#xB7FD; &#xC774;&#xB0B4; &#xB4DC;&#xB86D;, &#xC6D0;&#xB798; &#xC790;&#xB9AC;&#xC5D0;&#xC11C; &#xC7AC;&#xD0C0;. (&#xADDC;&#xCE59; 17.1)'},
  {q:'&#xADF8;&#xB9B0;&#xC5D0;&#xC11C; &#xD37C;&#xD305; &#xC2A4;&#xD0E0;&#xC2A4;&#xB97C; &#xCDE8;&#xD55C; &#xD6C4; &#xBC1C;&#xC774; &#xBBF8;&#xB044;&#xB7EC;&#xC838; &#xBCFC;&#xC774; &#xC6C0;&#xC9C1;&#xC600;&#xC2B5;&#xB2C8;&#xB2E4;. &#xBC8C;&#xD0C0;?',choices:['1&#xBC8C;&#xD0C0;, &#xBCF5;&#xAD6C;','&#xBC8C;&#xD0C0; &#xC5C6;&#xC74C;, &#xBCF5;&#xAD6C;','&#xC6C0;&#xC9C1;&#xC778; &#xC704;&#xCE58;&#xC5D0;&#xC11C; &#xADF8;&#xB300;&#xB85C;','2&#xBC8C;&#xD0C0;'],ans:0,explain:'&#xADF8;&#xB9B0; &#xC704;&#xC5D0;&#xC11C; &#xBC1C;&#xC774; &#xBBF8;&#xB044;&#xB7EC;&#xC838; &#xBCFC;&#xC774; &#xC6C0;&#xC9C1;&#xC600;&#xB2E4;&#xBA74; 1&#xBC8C;&#xD0C0;&#xC774;&#xBA70; &#xBCFC;&#xC744; &#xC6D0;&#xB798; &#xC704;&#xCE58;&#xB85C; &#xBCF5;&#xAD6C;&#xD574;&#xC57C; &#xD569;&#xB2C8;&#xB2E4;. (&#xADDC;&#xCE59; 9.4b)'}
];
var v21RuleIdx=0;var v21RuleScore=0;var v21RuleAnswered=false;

function v21OpenRules(){
  var ov=document.getElementById('v21RulesOverlay');
  if(!ov){
    ov=document.createElement('div');ov.id='v21RulesOverlay';ov.className='v21-overlay';
    ov.innerHTML='<div class="v21-modal"><div class="v21-hdr"><h2><span class="v21i">&#x1F4D6;</span> &#xACE8;&#xD504; &#xADDC;&#xCE59; &#xC2DC;&#xBBAC;&#xB808;&#xC774;&#xD130;</h2><button class="v21-x" onclick="document.getElementById(\'v21RulesOverlay\').classList.remove(\'active\')">&times;</button></div><div style="text-align:center;margin-bottom:14px"><span class="v21-badge" style="background:#e8f5e9;color:var(--primary)">&#xC810;&#xC218;: <span id="v21RuleScore">0</span>/10 | &#xBB38;&#xC81C;: <span id="v21RuleNum">1</span>/10</span></div><div id="v21RuleContent"></div></div>';
    document.body.appendChild(ov);
  }
  ov.classList.add('active');
  v21RuleIdx=0;v21RuleScore=0;v21RuleAnswered=false;
  v21RenderRule();
  v21PlaySFX('rules_open');
}

function v21RenderRule(){
  if(v21RuleIdx>=10){
    var pct=v21RuleScore*10;
    var grade=pct>=90?'S':pct>=70?'A':pct>=50?'B':pct>=30?'C':'D';
    document.getElementById('v21RuleContent').innerHTML='<div style="text-align:center;padding:30px"><div style="font-size:60px;margin-bottom:10px">&#x1F3C6;</div><div style="font-size:28px;font-weight:900;color:var(--primary)">'+grade+' &#xB4F1;&#xAE09;</div><div style="font-size:16px;margin-top:8px">'+v21RuleScore+'/10 &#xC815;&#xB2F5; ('+pct+'%)</div><div style="margin-top:16px"><button class="v21-btn v21-btn-primary" onclick="v21RuleIdx=0;v21RuleScore=0;v21RuleAnswered=false;v21RenderRule();">&#x1F504; &#xB2E4;&#xC2DC; &#xD480;&#xAE30;</button></div></div>';
    document.getElementById('v21RuleScore').textContent=v21RuleScore;
    document.getElementById('v21RuleNum').textContent='10';
    localStorage.setItem('sg_rules_score',''+Math.max(parseInt(localStorage.getItem('sg_rules_score')||'0'),v21RuleScore));
    if(v21RuleScore>=8)localStorage.setItem('sg_rules_master','1');
    return;
  }
  document.getElementById('v21RuleScore').textContent=v21RuleScore;
  document.getElementById('v21RuleNum').textContent=(v21RuleIdx+1);
  var r=v21Rules[v21RuleIdx];
  var h='<div class="v21-rule-scenario"><div class="v21-rule-q">Q'+(v21RuleIdx+1)+'. '+r.q+'</div><div class="v21-rule-choices">';
  r.choices.forEach(function(c,i){
    h+='<div class="v21-rule-choice" id="v21RC'+i+'" onclick="v21AnswerRule('+i+')">'+String.fromCharCode(65+i)+'. '+c+'</div>';
  });
  h+='</div><div id="v21RuleExplain" style="display:none;margin-top:12px;padding:12px;background:var(--primary-light);border-radius:12px;font-size:12px;line-height:1.6"></div></div>';
  h+='<div style="text-align:center;margin-top:12px"><button class="v21-btn v21-btn-primary" id="v21RuleNext" style="display:none" onclick="v21RuleIdx++;v21RuleAnswered=false;v21RenderRule();">&#xB2E4;&#xC74C; &#x2192;</button></div>';
  document.getElementById('v21RuleContent').innerHTML=h;
  v21RuleAnswered=false;
}

function v21AnswerRule(idx){
  if(v21RuleAnswered)return;
  v21RuleAnswered=true;
  var r=v21Rules[v21RuleIdx];
  if(idx===r.ans){
    v21RuleScore++;
    document.getElementById('v21RC'+idx).classList.add('correct');
    v21PlaySFX('rule_correct');
  }else{
    document.getElementById('v21RC'+idx).classList.add('wrong');
    document.getElementById('v21RC'+r.ans).classList.add('correct');
    v21PlaySFX('rule_wrong');
  }
  document.getElementById('v21RuleExplain').style.display='block';
  document.getElementById('v21RuleExplain').innerHTML='&#x1F4A1; '+r.explain;
  document.getElementById('v21RuleNext').style.display='inline-flex';
  document.getElementById('v21RuleScore').textContent=v21RuleScore;
}
window.v21OpenRules=v21OpenRules;
window.v21AnswerRule=v21AnswerRule;

// ===== 8. GOLF IQ v6 QUIZ (15 new questions) =====
var v21Quiz=[
  {q:'&#xB4DC;&#xB85C;&#xC0F7;(draw shot)&#xC758; &#xBCFC; &#xBE44;&#xD589; &#xACBD;&#xB85C;&#xB294;?',o:['&#xC67C;&#xCABD;&#xC73C;&#xB85C; &#xD718;&#xC5B4;&#xC9C0;&#xB294; &#xAD6C;&#xC9C8;','&#xC624;&#xB978;&#xCABD;&#xC73C;&#xB85C; &#xD718;&#xC5B4;&#xC9C0;&#xB294; &#xAD6C;&#xC9C8;','&#xC9C1;&#xC9C4;','&#xB192;&#xC774; &#xB9CE;&#xC774; &#xC62C;&#xB77C;&#xAC00;&#xB294; &#xAD6C;&#xC9C8;'],a:0},
  {q:'&#xD56D;&#xACF5;&#xC5ED;&#xD559;&#xC5D0;&#xC11C; &#xB9AC;&#xD504;&#xD2B8;(lift)&#xB97C; &#xBC1C;&#xC0DD;&#xC2DC;&#xD0A4;&#xB294; &#xC694;&#xC778;&#xC740;?',o:['&#xBC31;&#xC2A4;&#xD540;','&#xD0D1;&#xC2A4;&#xD540;','&#xC0AC;&#xC774;&#xB4DC;&#xC2A4;&#xD540;','&#xC911;&#xB825;'],a:0},
  {q:'PGA &#xD22C;&#xC5B4;&#xC5D0;&#xC11C; 1&#xB77C;&#xC6B4;&#xB4DC; &#xC120;&#xB450;&#xADF8;&#xB8F9;&#xC758; &#xD2F0;&#xC624;&#xD504; &#xAC04;&#xACA9;&#xC740; &#xBCF4;&#xD1B5;?',o:['7-8&#xBD84;','10-11&#xBD84;','15-20&#xBD84;','5&#xBD84;'],a:1},
  {q:'&#xD074;&#xB7FD;&#xC758; &#xBC14;&#xC6B4;&#xC2A4; &#xAC01;&#xB3C4;(bounce angle)&#xAC00; &#xB192;&#xC744;&#xC218;&#xB85D; &#xC5B4;&#xB5A4; &#xC0C1;&#xD669;&#xC5D0; &#xC720;&#xB9AC;&#xD55C;&#xAC00;?',o:['&#xBD80;&#xB4DC;&#xB7EC;&#xC6B4; &#xBAA8;&#xB798;/&#xD480;','&#xB2E8;&#xB2E8;&#xD55C; &#xD398;&#xC5B4;&#xC6E8;&#xC774;','&#xD0C0;&#xC774;&#xD2B8;&#xD55C; &#xB77C;&#xC774;','&#xBE44;&#xC624;&#xB294; &#xB0A0;'],a:0},
  {q:'&#xC2A4;&#xD2B8;&#xB85C;&#xD06C; &#xAC8C;&#xC778;&#xB4DC; &#xBD84;&#xC11D;&#xC5D0;&#xC11C; &#xAC00;&#xC7A5; &#xC911;&#xC694;&#xD55C; &#xC601;&#xC5ED;&#xC740;?',o:['&#xD37C;&#xD305;','&#xB4DC;&#xB77C;&#xC774;&#xBE44;&#xB4DC;','&#xC5B4;&#xD504;&#xB85C;&#xCE58;','&#xC0F7;&#xD2B8; &#xAC8C;&#xC784;'],a:2},
  {q:'&#xBCFC;&#xC758; &#xC2A4;&#xD540;&#xB7C9;(RPM)&#xC774; &#xB9CE;&#xC744;&#xC218;&#xB85D; &#xC5B4;&#xB5BB;&#xAC8C; &#xB418;&#xB098;?',o:['&#xBE44;&#xAC70;&#xB9AC;&#xAC00; &#xB298;&#xC5B4;&#xB09C;&#xB2E4;','&#xB7F0;&#xC774; &#xB9CE;&#xC774; &#xB098;&#xC628;&#xB2E4;','&#xADF8;&#xB9B0;&#xC5D0;&#xC11C; &#xBE68;&#xB9AC; &#xBA48;&#xCD98;&#xB2E4;','&#xD0C4;&#xB3C4;&#xAC00; &#xB192;&#xC544;&#xC9C4;&#xB2E4;'],a:2},
  {q:'&#xCF54;&#xC2A4; &#xB808;&#xC774;&#xD305; 72.0, &#xC2AC;&#xB85C;&#xD504; &#xB808;&#xC774;&#xD305; 135&#xC778; &#xCF54;&#xC2A4;&#xC5D0;&#xC11C; &#xD578;&#xB514;&#xCEA1; 18&#xC778; &#xD50C;&#xB808;&#xC774;&#xC5B4;&#xC758; &#xCF54;&#xC2A4; &#xD578;&#xB514;&#xCEA1;&#xC740;?',o:['18','20','21','24'],a:2},
  {q:'&#xB9E4;&#xCE58;&#xD50C;&#xB808;&#xC774;&#xC5D0;&#xC11C; &#xD638;&#xB984; &#xBC1C;&#xAE30; &#xC804; &#xBA87; &#xD640;&#xBD80;&#xD130; &#xC2B9;&#xBD80;&#xAC00; &#xACB0;&#xC815;&#xB418;&#xB098;?',o:['&#xB0A8;&#xC740; &#xD640;&#xC218;&#xC640; &#xAC19;&#xC744; &#xB54C; (2&amp;1 &#xB4F1;)','&#xD56D;&#xC0C1; 18&#xD640; &#xC804;&#xBD80; &#xD50C;&#xB808;&#xC774;','&#xC120;&#xC218;&#xAC00; &#xD56D;&#xBCF5;&#xD560; &#xB54C;','&#xBD80;&#xC871; &#xD640; &#xC218;&#xAC00; &#xB0A8;&#xC740; &#xD640;&#xC218;&#xBCF4;&#xB2E4; &#xB9CE;&#xC744; &#xB54C;'],a:3},
  {q:'&#xC6E8;&#xC9C0;&#xC758; &#xB85C;&#xD504;&#xD2B8; &#xAC01;&#xB3C4;(loft)&#xAC00; &#xD074;&#xC218;&#xB85D;?',o:['&#xBE44;&#xAC70;&#xB9AC;&#xAC00; &#xC904;&#xACE0; &#xB192;&#xC774; &#xC62C;&#xB77C;&#xAC04;&#xB2E4;','&#xBE44;&#xAC70;&#xB9AC;&#xAC00; &#xB298;&#xACE0; &#xB0AE;&#xAC8C; &#xB0A0;&#xC544;&#xAC04;&#xB2E4;','&#xC2A4;&#xD540;&#xC774; &#xC904;&#xC5B4;&#xB4E0;&#xB2E4;','&#xBC14;&#xC6B4;&#xC2A4;&#xAC00; &#xC904;&#xC5B4;&#xB4E0;&#xB2E4;'],a:0},
  {q:'&#xB9C8;&#xC2A4;&#xD130;&#xC2A4; &#xD1A0;&#xB108;&#xBA3C;&#xD2B8;&#xC758; &#xAC1C;&#xCD5C;&#xC9C0;&#xB294;?',o:['&#xC624;&#xAC70;&#xC2A4;&#xD0C0; &#xB0B4;&#xC154;&#xB110;','&#xC138;&#xC778;&#xD2B8; &#xC564;&#xB4DC;&#xB958;&#xC2A4;','&#xD398;&#xBE14;&#xBE44;&#xCE58;','&#xD30C;&#xC778;&#xD5C8;&#xC2A4;&#xD2B8;'],a:0},
  {q:'&#xD37C;&#xD305;&#xC5D0;&#xC11C; &#xC778;&#xC0AC;&#xC774;&#xB4DC;-&#xC778; &#xD37C;&#xD305; &#xB77C;&#xC778;&#xC744; &#xC77D;&#xC744; &#xB54C; &#xACE0;&#xB824;&#xD574;&#xC57C; &#xD560; &#xAC83;&#xC740;?',o:['&#xBC14;&#xB78C; &#xBC29;&#xD5A5;','&#xACBD;&#xC0AC;, &#xC794;&#xB514; &#xACB0;, &#xC18D;&#xB3C4;','&#xD074;&#xB7FD; &#xBE0C;&#xB79C;&#xB4DC;','&#xC2E0;&#xBC1C; &#xC885;&#xB958;'],a:1},
  {q:'&#xB4DC;&#xB77C;&#xC774;&#xBC84; &#xC0F7;&#xC5D0;&#xC11C; &#xC774;&#xC0C1;&#xC801;&#xC778; &#xB7F0;&#xCE58; &#xC575;&#xAE00;&#xC740; &#xC57D; &#xBA87; &#xB3C4;?',o:['5-8&#xB3C4;','10-12&#xB3C4;','15-18&#xB3C4;','20-25&#xB3C4;'],a:1},
  {q:'&#xCE90;&#xB9AC;&#xAC70;&#xB9AC;(carry distance)&#xC640; &#xCD1D;&#xAC70;&#xB9AC;(total distance)&#xC758; &#xCC28;&#xC774;&#xB294;?',o:['&#xBCFC;&#xC774; &#xB545;&#xC5D0; &#xB5A8;&#xC5B4;&#xC9C4; &#xD6C4; &#xAD6C;&#xB974;&#xB294; &#xAC70;&#xB9AC;(&#xB7F0;)','&#xBC14;&#xB78C;&#xC5D0; &#xC758;&#xD55C; &#xCD94;&#xAC00; &#xAC70;&#xB9AC;','&#xB4DC;&#xB85C;&#xC6B0;/&#xD398;&#xC774;&#xB4DC;&#xC5D0; &#xC758;&#xD55C; &#xD3B8;&#xCC28;','&#xD0C4;&#xB3C4; &#xCC28;&#xC774;'],a:0},
  {q:'GIR(Green in Regulation) &#xD3C9;&#xADE0;&#xC774; 50%&#xC778; &#xD50C;&#xB808;&#xC774;&#xC5B4;&#xC758; &#xC608;&#xC0C1; &#xD578;&#xB514;&#xCEA1; &#xBC94;&#xC704;&#xB294;?',o:['&#xC2F1;&#xAE00;(0 &#xC774;&#xD558;)','10-15','15-20','25+'],a:2},
  {q:'&#xBCFC;&#xC758; &#xB529;&#xD50C;(dimple)&#xC758; &#xC8FC;&#xC694; &#xC5ED;&#xD560;&#xC740;?',o:['&#xACF5;&#xAE30; &#xC800;&#xD56D;&#xC744; &#xC904;&#xC5EC; &#xBE44;&#xAC70;&#xB9AC; &#xC99D;&#xAC00;','&#xADF8;&#xB9AC;&#xD504;&#xB825; &#xD5A5;&#xC0C1;','&#xBB34;&#xAC8C; &#xAC10;&#xC18C;','&#xBCFC;&#xC758; &#xB0B4;&#xAD6C;&#xC131; &#xD5A5;&#xC0C1;'],a:0}
];
var v21QIdx=0;var v21QScore=0;

function v21OpenQuiz(){
  var ov=document.getElementById('v21QuizOverlay');
  if(!ov){
    ov=document.createElement('div');ov.id='v21QuizOverlay';ov.className='v21-overlay';
    ov.innerHTML='<div class="v21-modal"><div class="v21-hdr"><h2><span class="v21i">&#x1F9E0;</span> Golf IQ v6</h2><button class="v21-x" onclick="document.getElementById(\'v21QuizOverlay\').classList.remove(\'active\')">&times;</button></div><div style="text-align:center;margin-bottom:14px"><span class="v21-badge" style="background:#e8f5e9;color:var(--primary)">&#xC810;&#xC218;: <span id="v21QScore">0</span>/15 | &#xBB38;&#xC81C;: <span id="v21QNum">1</span>/15</span></div><div id="v21QContent"></div></div>';
    document.body.appendChild(ov);
  }
  ov.classList.add('active');
  v21QIdx=0;v21QScore=0;
  v21RenderQuiz();
  v21PlaySFX('quiz_open');
}

function v21RenderQuiz(){
  if(v21QIdx>=15){
    var pct=Math.round(v21QScore/15*100);
    var grade=pct>=90?'S':pct>=70?'A':pct>=50?'B':pct>=30?'C':'D';
    document.getElementById('v21QContent').innerHTML='<div style="text-align:center;padding:30px"><div style="font-size:60px;margin-bottom:10px">&#x1F3C6;</div><div style="font-size:28px;font-weight:900;color:var(--primary)">'+grade+' &#xB4F1;&#xAE09;</div><div style="font-size:16px;margin-top:8px">'+v21QScore+'/15 &#xC815;&#xB2F5; ('+pct+'%)</div><div style="margin-top:16px"><button class="v21-btn v21-btn-primary" onclick="v21QIdx=0;v21QScore=0;v21RenderQuiz();">&#x1F504; &#xB2E4;&#xC2DC; &#xD480;&#xAE30;</button></div></div>';
    localStorage.setItem('sg_quiz_v6',''+Math.max(parseInt(localStorage.getItem('sg_quiz_v6')||'0'),v21QScore));
    if(v21QScore>=12)localStorage.setItem('sg_quiz_master_v6','1');
    return;
  }
  document.getElementById('v21QScore').textContent=v21QScore;
  document.getElementById('v21QNum').textContent=(v21QIdx+1);
  var q=v21Quiz[v21QIdx];
  var h='<div class="v21-rule-scenario"><div class="v21-rule-q">Q'+(v21QIdx+1)+'. '+q.q+'</div><div class="v21-rule-choices">';
  q.o.forEach(function(o,i){
    h+='<div class="v21-rule-choice" id="v21QC'+i+'" onclick="v21AnswerQuiz('+i+')">'+String.fromCharCode(65+i)+'. '+o+'</div>';
  });
  h+='</div></div><div style="text-align:center;margin-top:12px"><button class="v21-btn v21-btn-primary" id="v21QNext" style="display:none" onclick="v21QIdx++;v21RenderQuiz();">&#xB2E4;&#xC74C; &#x2192;</button></div>';
  document.getElementById('v21QContent').innerHTML=h;
}

function v21AnswerQuiz(idx){
  if(document.getElementById('v21QNext').style.display==='inline-flex')return;
  var q=v21Quiz[v21QIdx];
  if(idx===q.a){
    v21QScore++;
    document.getElementById('v21QC'+idx).classList.add('correct');
    v21PlaySFX('quiz_correct');
  }else{
    document.getElementById('v21QC'+idx).classList.add('wrong');
    document.getElementById('v21QC'+q.a).classList.add('correct');
    v21PlaySFX('quiz_wrong');
  }
  document.getElementById('v21QNext').style.display='inline-flex';
  document.getElementById('v21QScore').textContent=v21QScore;
}
window.v21OpenQuiz=v21OpenQuiz;
window.v21AnswerQuiz=v21AnswerQuiz;

// ===== 9. ACHIEVEMENTS (12 new: 80→92) =====
function v21CheckAchievements(){
  var achs=[
    {id:'putt_first',name:'&#xCCAB; &#xD37C;&#xD305;',desc:'&#xD37C;&#xD305; &#xC2DC;&#xBBAC;&#xB808;&#xC774;&#xD130; &#xCCAB; &#xC131;&#xACF5;',check:function(){return parseInt(localStorage.getItem('sg_putt_made')||'0')>=1;}},
    {id:'putt_10',name:'&#xD37C;&#xD305; &#xB9C8;&#xC2A4;&#xD130;',desc:'&#xD37C;&#xD305; 10&#xD68C; &#xC131;&#xACF5;',check:function(){return parseInt(localStorage.getItem('sg_putt_made')||'0')>=10;}},
    {id:'live_first',name:'&#xCCAB; &#xB77C;&#xC774;&#xBE0C; &#xC2A4;&#xCF54;&#xC5B4;',desc:'&#xB77C;&#xC774;&#xBE0C; &#xC2A4;&#xCF54;&#xC5B4;&#xCE74;&#xB4DC; &#xCCAB; &#xC800;&#xC7A5;',check:function(){return parseInt(localStorage.getItem('sg_rounds_cnt')||'0')>=1;}},
    {id:'live_10',name:'10&#xB77C;&#xC6B4;&#xB4DC; &#xAE30;&#xB85D;&#xAC00;',desc:'&#xB77C;&#xC774;&#xBE0C; &#xC2A4;&#xCF54;&#xC5B4; 10&#xD68C; &#xC800;&#xC7A5;',check:function(){return parseInt(localStorage.getItem('sg_rounds_cnt')||'0')>=10;}},
    {id:'fit_all',name:'&#xD53C;&#xD2B8;&#xB2C8;&#xC2A4; &#xB9C8;&#xC2A4;&#xD130;',desc:'12&#xAC00;&#xC9C0; &#xC6B4;&#xB3D9; &#xC804;&#xBD80; &#xC644;&#xB8CC;',check:function(){return localStorage.getItem('sg_fit_all')==='1';}},
    {id:'diary_5',name:'&#xACE8;&#xD504; &#xC77C;&#xAE30;&#xC7A5;',desc:'&#xACE8;&#xD504; &#xC77C;&#xAE30; 5&#xD3B8; &#xC791;&#xC131;',check:function(){return parseInt(localStorage.getItem('sg_diary_cnt')||'0')>=5;}},
    {id:'diary_20',name:'&#xACE8;&#xD504; &#xC791;&#xAC00;',desc:'&#xACE8;&#xD504; &#xC77C;&#xAE30; 20&#xD3B8; &#xC791;&#xC131;',check:function(){return parseInt(localStorage.getItem('sg_diary_cnt')||'0')>=20;}},
    {id:'buddy_3',name:'&#xACE8;&#xD504; &#xBC84;&#xB514;',desc:'&#xB3D9;&#xBC18;&#xC790; 3&#xBA85; &#xB4F1;&#xB85D;',check:function(){return parseInt(localStorage.getItem('sg_buddy_cnt')||'0')>=3;}},
    {id:'buddy_10',name:'&#xC18C;&#xC15C; &#xACE8;&#xD37C;',desc:'&#xB3D9;&#xBC18;&#xC790; 10&#xBA85; &#xB4F1;&#xB85D;',check:function(){return parseInt(localStorage.getItem('sg_buddy_cnt')||'0')>=10;}},
    {id:'rules_master',name:'&#xADDC;&#xCE59; &#xB9C8;&#xC2A4;&#xD130;',desc:'&#xADDC;&#xCE59; &#xC2DC;&#xBBAC;&#xB808;&#xC774;&#xD130; 8/10 &#xC774;&#xC0C1;',check:function(){return localStorage.getItem('sg_rules_master')==='1';}},
    {id:'quiz_v6',name:'Golf IQ v6 &#xB9C8;&#xC2A4;&#xD130;',desc:'Golf IQ v6 12/15 &#xC774;&#xC0C1;',check:function(){return localStorage.getItem('sg_quiz_master_v6')==='1';}},
    {id:'v21_all',name:'v21 &#xC62C;&#xB77C;&#xC6B4;&#xB354;',desc:'v21 &#xBAA8;&#xB4E0; &#xAE30;&#xB2A5; &#xC0AC;&#xC6A9;',check:function(){return parseInt(localStorage.getItem('sg_putt_made')||'0')>=1&&parseInt(localStorage.getItem('sg_rounds_cnt')||'0')>=1&&parseInt(localStorage.getItem('sg_diary_cnt')||'0')>=1&&parseInt(localStorage.getItem('sg_buddy_cnt')||'0')>=1;}}
  ];
  var unlocked=JSON.parse(localStorage.getItem('sg_v21_ach')||'[]');
  achs.forEach(function(a){
    if(unlocked.indexOf(a.id)===-1&&a.check()){
      unlocked.push(a.id);
      v21Toast('&#x1F3C5; &#xC5C5;&#xC801; &#xB2EC;&#xC131;: '+a.name);
      v21PlaySFX('achievement');
    }
  });
  localStorage.setItem('sg_v21_ach',JSON.stringify(unlocked));
}

// ===== 10. SFX (12 new sounds: 80→92) =====
var v21SFXCtx=null;
function v21PlaySFX(type){
  try{
    if(!v21SFXCtx)v21SFXCtx=new(window.AudioContext||window.webkitAudioContext)();
    var ctx=v21SFXCtx;var osc=ctx.createOscillator();var gain=ctx.createGain();
    osc.connect(gain);gain.connect(ctx.destination);
    gain.gain.value=0.12;
    var now=ctx.currentTime;
    switch(type){
      case'putt_setup':osc.frequency.value=440;osc.type='sine';gain.gain.setValueAtTime(0.08,now);gain.gain.exponentialRampToValueAtTime(0.001,now+0.2);osc.start(now);osc.stop(now+0.2);break;
      case'putt_hit':osc.frequency.value=200;osc.type='triangle';gain.gain.setValueAtTime(0.15,now);gain.gain.exponentialRampToValueAtTime(0.001,now+0.15);osc.start(now);osc.stop(now+0.15);break;
      case'putt_made':osc.frequency.value=523;osc.type='sine';gain.gain.setValueAtTime(0.12,now);osc.frequency.setValueAtTime(659,now+0.1);osc.frequency.setValueAtTime(784,now+0.2);gain.gain.exponentialRampToValueAtTime(0.001,now+0.5);osc.start(now);osc.stop(now+0.5);break;
      case'putt_miss':osc.frequency.value=220;osc.type='sawtooth';gain.gain.setValueAtTime(0.1,now);gain.gain.exponentialRampToValueAtTime(0.001,now+0.3);osc.start(now);osc.stop(now+0.3);break;
      case'putt_short':osc.frequency.value=330;osc.type='sine';gain.gain.setValueAtTime(0.08,now);gain.gain.exponentialRampToValueAtTime(0.001,now+0.2);osc.start(now);osc.stop(now+0.2);break;
      case'live_open':osc.frequency.value=660;osc.type='sine';gain.gain.setValueAtTime(0.08,now);gain.gain.exponentialRampToValueAtTime(0.001,now+0.15);osc.start(now);osc.stop(now+0.15);break;
      case'live_save':osc.frequency.value=880;osc.type='sine';gain.gain.setValueAtTime(0.1,now);osc.frequency.setValueAtTime(1100,now+0.08);gain.gain.exponentialRampToValueAtTime(0.001,now+0.25);osc.start(now);osc.stop(now+0.25);break;
      case'fitness_open':osc.frequency.value=392;osc.type='triangle';gain.gain.setValueAtTime(0.08,now);gain.gain.exponentialRampToValueAtTime(0.001,now+0.2);osc.start(now);osc.stop(now+0.2);break;
      case'fitness_done':osc.frequency.value=587;osc.type='sine';gain.gain.setValueAtTime(0.1,now);osc.frequency.setValueAtTime(784,now+0.1);gain.gain.exponentialRampToValueAtTime(0.001,now+0.3);osc.start(now);osc.stop(now+0.3);break;
      case'diary_open':case'diary_save':osc.frequency.value=493;osc.type='sine';gain.gain.setValueAtTime(0.07,now);gain.gain.exponentialRampToValueAtTime(0.001,now+0.2);osc.start(now);osc.stop(now+0.2);break;
      case'price_open':osc.frequency.value=550;osc.type='triangle';gain.gain.setValueAtTime(0.08,now);gain.gain.exponentialRampToValueAtTime(0.001,now+0.15);osc.start(now);osc.stop(now+0.15);break;
      case'buddy_open':case'buddy_add':osc.frequency.value=440;osc.type='sine';gain.gain.setValueAtTime(0.08,now);osc.frequency.setValueAtTime(554,now+0.08);gain.gain.exponentialRampToValueAtTime(0.001,now+0.2);osc.start(now);osc.stop(now+0.2);break;
      case'rules_open':osc.frequency.value=370;osc.type='square';gain.gain.setValueAtTime(0.06,now);gain.gain.exponentialRampToValueAtTime(0.001,now+0.2);osc.start(now);osc.stop(now+0.2);break;
      case'rule_correct':case'quiz_correct':osc.frequency.value=523;osc.type='sine';gain.gain.setValueAtTime(0.1,now);osc.frequency.setValueAtTime(659,now+0.08);gain.gain.exponentialRampToValueAtTime(0.001,now+0.25);osc.start(now);osc.stop(now+0.25);break;
      case'rule_wrong':case'quiz_wrong':osc.frequency.value=200;osc.type='sawtooth';gain.gain.setValueAtTime(0.08,now);gain.gain.exponentialRampToValueAtTime(0.001,now+0.25);osc.start(now);osc.stop(now+0.25);break;
      case'quiz_open':osc.frequency.value=698;osc.type='sine';gain.gain.setValueAtTime(0.08,now);gain.gain.exponentialRampToValueAtTime(0.001,now+0.15);osc.start(now);osc.stop(now+0.15);break;
      case'achievement':osc.frequency.value=523;osc.type='sine';gain.gain.setValueAtTime(0.12,now);osc.frequency.setValueAtTime(659,now+0.12);osc.frequency.setValueAtTime(784,now+0.24);osc.frequency.setValueAtTime(1047,now+0.36);gain.gain.exponentialRampToValueAtTime(0.001,now+0.6);osc.start(now);osc.stop(now+0.6);break;
      default:osc.frequency.value=440;gain.gain.setValueAtTime(0.05,now);gain.gain.exponentialRampToValueAtTime(0.001,now+0.1);osc.start(now);osc.stop(now+0.1);
    }
  }catch(e){}
}

// ===== 11. TOAST =====
function v21Toast(msg){
  var t=document.createElement('div');
  t.style.cssText='position:fixed;bottom:90px;left:50%;transform:translateX(-50%);background:var(--toast-bg,#333);color:#fff;padding:12px 24px;border-radius:14px;font-size:13px;font-weight:600;z-index:10400;box-shadow:0 6px 24px rgba(0,0,0,.3);max-width:90vw;text-align:center;animation:v21Rise .3s ease';
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
    case'P':v21OpenPutt();e.preventDefault();break;
    case'L':v21OpenLive();e.preventDefault();break;
    case'F':v21OpenFitness();e.preventDefault();break;
    case'J':v21OpenDiary();e.preventDefault();break;
    case'T':v21OpenPrice();e.preventDefault();break;
    case'B':v21OpenBuddy();e.preventDefault();break;
    case'U':v21OpenRules();e.preventDefault();break;
    case'Q':v21OpenQuiz();e.preventDefault();break;
  }
});

// ===== 13. INJECT BUTTONS =====
function injectV21Buttons(){
  var target=document.querySelector('.search-section')||document.querySelector('.header');
  if(!target)return;
  var bar=document.createElement('div');
  bar.style.cssText='display:flex;gap:6px;flex-wrap:wrap;margin:10px 0;padding:0 0 6px';
  var buttons=[
    {label:'&#x26F3; &#xD37C;&#xD305;&#xC2DC;&#xBBAC;',fn:'v21OpenPutt()'},
    {label:'&#x1F4CB; &#xB77C;&#xC774;&#xBE0C;&#xC2A4;&#xCF54;&#xC5B4;',fn:'v21OpenLive()'},
    {label:'&#x1F3CB;&#xFE0F; &#xD53C;&#xD2B8;&#xB2C8;&#xC2A4;',fn:'v21OpenFitness()'},
    {label:'&#x1F4D3; &#xACE8;&#xD504;&#xC77C;&#xAE30;',fn:'v21OpenDiary()'},
    {label:'&#x1F4B0; &#xAC00;&#xACA9;&#xBE44;&#xAD50;',fn:'v21OpenPrice()'},
    {label:'&#x1F465; &#xB3D9;&#xBC18;&#xC790;',fn:'v21OpenBuddy()'},
    {label:'&#x1F4D6; &#xADDC;&#xCE59;&#xC2DC;&#xBBAC;',fn:'v21OpenRules()'},
    {label:'&#x1F9E0; IQ v6',fn:'v21OpenQuiz()'}
  ];
  buttons.forEach(function(b){
    var btn=document.createElement('button');
    btn.className='v21-btn v21-btn-sm v21-btn-secondary';
    btn.innerHTML=b.label;
    btn.setAttribute('onclick',b.fn);
    bar.appendChild(btn);
  });
  target.parentNode.insertBefore(bar,target.nextSibling);
}

// ===== 14. INIT =====
setTimeout(function(){
  injectV21Buttons();
  v21CheckAchievements();
},1000);

})();
