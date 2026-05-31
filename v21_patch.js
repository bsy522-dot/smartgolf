(function(){
'use strict';

var css21 = document.createElement('style');
css21.textContent = `
.v21-overlay{position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,.88);z-index:10200;display:none;align-items:center;justify-content:center;backdrop-filter:blur(20px)}
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
.v21-putt-canvas{width:100%;max-width:500px;height:380px;margin:0 auto;display:block;border-radius:16px;border:2px solid var(--border);cursor:crosshair;touch-action:none}
.v21-putt-info{display:flex;justify-content:space-around;padding:14px;background:var(--bg);border-radius:14px;margin:12px 0}
.v21-putt-stat{text-align:center}
.v21-putt-stat .num{font-size:24px;font-weight:900;color:var(--primary)}
.v21-putt-stat .lbl{font-size:11px;color:var(--text-muted);margin-top:2px}
.v21-club-rec{display:flex;gap:14px;align-items:center;padding:14px;background:var(--bg);border-radius:14px;margin-bottom:10px;transition:.25s}
.v21-club-rec:hover{transform:translateY(-2px);box-shadow:0 3px 12px rgba(26,122,58,.1)}
.v21-club-icon{width:50px;height:50px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:24px;flex-shrink:0}
.v21-club-info{flex:1}
.v21-club-name{font-size:14px;font-weight:700;margin-bottom:2px}
.v21-club-desc{font-size:11px;color:var(--text-muted);line-height:1.6}
.v21-checklist-item{display:flex;align-items:center;gap:12px;padding:14px;background:var(--bg);border-radius:14px;margin-bottom:8px;cursor:pointer;transition:.25s}
.v21-checklist-item:hover{transform:translateY(-1px);box-shadow:0 2px 10px rgba(26,122,58,.08)}
.v21-checklist-item.checked{opacity:.6}
.v21-checklist-item.checked .v21-check-box{background:var(--primary);border-color:var(--primary);color:#fff}
.v21-check-box{width:28px;height:28px;border:2px solid var(--border);border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:14px;flex-shrink:0;transition:.2s}
.v21-check-text{flex:1}
.v21-check-title{font-size:13px;font-weight:700}
.v21-check-desc{font-size:11px;color:var(--text-muted);margin-top:2px}
.v21-strategy-hole{background:var(--bg);border-radius:18px;padding:18px;margin-bottom:12px;border-left:4px solid var(--primary)}
.v21-strategy-num{font-size:18px;font-weight:900;color:var(--primary);margin-bottom:4px}
.v21-strategy-detail{font-size:12px;color:var(--text-muted);line-height:1.8}
.v21-gir-grid{display:grid;grid-template-columns:repeat(9,1fr);gap:6px;margin-bottom:12px}
.v21-gir-cell{aspect-ratio:1;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:800;cursor:pointer;transition:.2s;border:2px solid var(--border);background:var(--bg)}
.v21-gir-cell.gir-hit{background:#2e9e4f;color:#fff;border-color:#2e9e4f}
.v21-gir-cell.gir-miss{background:#ff4757;color:#fff;border-color:#ff4757}
.v21-fitness-item{display:flex;gap:14px;align-items:center;padding:16px;background:var(--bg);border-radius:16px;margin-bottom:10px;transition:.25s}
.v21-fitness-item:hover{transform:translateY(-2px);box-shadow:0 3px 12px rgba(26,122,58,.1)}
.v21-fitness-icon{width:48px;height:48px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:22px;flex-shrink:0}
.v21-fitness-info{flex:1}
.v21-fitness-name{font-size:14px;font-weight:700;margin-bottom:3px}
.v21-fitness-desc{font-size:11px;color:var(--text-muted);line-height:1.6}
.v21-fitness-sets{font-size:10px;font-weight:700;color:var(--primary);margin-top:4px}
.v21-pace-ring{width:140px;height:140px;margin:0 auto}
.v21-pace-ring svg{width:100%;height:100%}
.v21-pace-time{font-size:32px;font-weight:900;color:var(--primary);text-align:center;margin-top:10px}
.v21-pace-label{font-size:12px;color:var(--text-muted);text-align:center}
.v21-quiz-option{padding:14px 18px;background:var(--bg);border:2px solid var(--border);border-radius:14px;margin-bottom:8px;cursor:pointer;font-size:13px;transition:.25s}
.v21-quiz-option:hover{border-color:var(--primary);background:var(--primary-light)}
.v21-quiz-option.correct{background:#2e9e4f;color:#fff;border-color:#2e9e4f}
.v21-quiz-option.wrong{background:#ff4757;color:#fff;border-color:#ff4757}
`;
document.head.appendChild(css21);

// ===== SFX ENGINE =====
var v21Sfx = {};
function v21PlaySFX(name){
  try {
    var AC = window.AudioContext || window.webkitAudioContext;
    if(!AC) return;
    var ctx = new AC();
    var o = ctx.createOscillator();
    var g = ctx.createGain();
    o.connect(g);
    g.connect(ctx.destination);
    var presets = {
      putt_hit: {f:220,t:'sine',d:.25,a:.3},
      putt_hole: {f:880,t:'sine',d:.4,a:.4},
      club_select: {f:600,t:'triangle',d:.15,a:.25},
      checklist_check: {f:700,t:'sine',d:.12,a:.2},
      strategy_open: {f:440,t:'triangle',d:.2,a:.25},
      gir_toggle: {f:550,t:'sine',d:.1,a:.2},
      fitness_start: {f:330,t:'square',d:.2,a:.15},
      pace_tick: {f:1000,t:'sine',d:.05,a:.15},
      pace_alert: {f:800,t:'sawtooth',d:.3,a:.3},
      quiz_correct_v6: {f:880,t:'sine',d:.3,a:.35},
      quiz_wrong_v6: {f:200,t:'sawtooth',d:.3,a:.25},
      achievement_v21: {f:660,t:'triangle',d:.5,a:.4}
    };
    var p = presets[name] || presets.club_select;
    o.type = p.t;
    o.frequency.setValueAtTime(p.f, ctx.currentTime);
    g.gain.setValueAtTime(p.a, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + p.d);
    o.start(ctx.currentTime);
    o.stop(ctx.currentTime + p.d);
    setTimeout(function(){ctx.close();}, (p.d+.1)*1000);
  } catch(e){}
}

// ===== 1. PUTTING SIMULATOR (퍼팅 연습 시뮬레이터) =====
var v21PuttState = {
  balls: [],
  distance: 3,
  breakDir: 0,
  breakAmt: 0,
  power: 0,
  aiming: false,
  aimX: 0,
  aimY: 0,
  ballX: 250,
  ballY: 330,
  holeX: 250,
  holeY: 60,
  rolling: false,
  made: 0,
  attempts: 0,
  streak: 0,
  bestStreak: 0
};

function v21OpenPutt(){
  var ov = document.getElementById('v21PuttOv');
  if(!ov){
    ov = document.createElement('div');
    ov.id = 'v21PuttOv';
    ov.className = 'v21-overlay';
    ov.innerHTML = '<div class="v21-modal" id="v21PuttModal"></div>';
    ov.addEventListener('click', function(e){ if(e.target===ov) ov.classList.remove('active'); });
    document.body.appendChild(ov);
  }
  v21PuttState.attempts = 0;
  v21PuttState.made = 0;
  v21PuttState.streak = 0;
  v21RenderPutt();
  ov.classList.add('active');
  v21PlaySFX('putt_hit');
}
window.v21OpenPutt = v21OpenPutt;

function v21RenderPutt(){
  var m = document.getElementById('v21PuttModal');
  var s = v21PuttState;
  var pct = s.attempts > 0 ? Math.round(s.made/s.attempts*100) : 0;
  var h = '<div class="v21-hdr"><h2><span class="v21i">&#x26F3;</span> &#xD37C;&#xD305; &#xC2DC;&#xBBAC;&#xB808;&#xC774;&#xD130;</h2><button class="v21-x" onclick="document.getElementById(\'v21PuttOv\').classList.remove(\'active\')">&times;</button></div>';
  h += '<div class="v21-putt-info"><div class="v21-putt-stat"><div class="num">' + s.distance + 'm</div><div class="lbl">&#xAC70;&#xB9AC;</div></div>';
  h += '<div class="v21-putt-stat"><div class="num">' + s.made + '/' + s.attempts + '</div><div class="lbl">&#xC131;&#xACF5;&#xB960; ' + pct + '%</div></div>';
  h += '<div class="v21-putt-stat"><div class="num">' + s.streak + '</div><div class="lbl">&#xC5F0;&#xC18D; &#xC131;&#xACF5;</div></div>';
  h += '<div class="v21-putt-stat"><div class="num">' + s.bestStreak + '</div><div class="lbl">&#xCD5C;&#xACE0; &#xC5F0;&#xC18D;</div></div></div>';
  h += '<div style="margin:12px 0"><label style="font-size:12px;font-weight:700">&#xAC70;&#xB9AC; &#xC124;&#xC815;: ' + s.distance + 'm</label>';
  h += '<input type="range" min="1" max="15" value="' + s.distance + '" style="width:100%;accent-color:var(--primary)" onchange="v21SetPuttDist(this.value)"></div>';
  h += '<div style="margin-bottom:12px"><label style="font-size:12px;font-weight:700">&#xBE0C;&#xB808;&#xC774;&#xD06C;:</label>';
  h += '<div class="v21-grid3" style="margin-top:6px">';
  var breaks = [{l:'&#x2B05; &#xC88C;',v:-1},{l:'&#x2195;&#xFE0F; &#xC9C1;&#xC120;',v:0},{l:'&#x27A1;&#xFE0F; &#xC6B0;',v:1}];
  breaks.forEach(function(b){
    h += '<div class="v21-tab' + (s.breakDir===b.v?' active':'') + '" onclick="v21SetBreak(' + b.v + ')" style="text-align:center">' + b.l + '</div>';
  });
  h += '</div></div>';
  h += '<canvas id="v21PuttCanvas" class="v21-putt-canvas" width="500" height="380"></canvas>';
  h += '<div style="text-align:center;margin-top:12px;font-size:12px;color:var(--text-muted)">&#xCE94;&#xBC84;&#xC2A4;&#xB97C; &#xD074;&#xB9AD;/&#xD130;&#xCE58;&#xD558;&#xC5EC; &#xBC29;&#xD5A5;&#xACFC; &#xD30C;&#xC6CC;&#xB97C; &#xC124;&#xC815;&#xD558;&#xC138;&#xC694;</div>';
  h += '<div style="display:flex;gap:8px;justify-content:center;margin-top:12px">';
  h += '<button class="v21-btn v21-btn-primary v21-btn-sm" onclick="v21PuttShoot()">&#x1F3CC;&#xFE0F; &#xD37C;&#xD305;!</button>';
  h += '<button class="v21-btn v21-btn-secondary v21-btn-sm" onclick="v21PuttReset()">&#x1F504; &#xCD08;&#xAE30;&#xD654;</button></div>';
  m.innerHTML = h;
  setTimeout(v21DrawPuttGreen, 50);
}

function v21SetPuttDist(v){ v21PuttState.distance = parseInt(v); v21RenderPutt(); }
window.v21SetPuttDist = v21SetPuttDist;
function v21SetBreak(v){ v21PuttState.breakDir = v; v21RenderPutt(); }
window.v21SetBreak = v21SetBreak;

function v21DrawPuttGreen(){
  var c = document.getElementById('v21PuttCanvas');
  if(!c) return;
  var ctx = c.getContext('2d');
  var w = c.width, h = c.height;
  var s = v21PuttState;

  ctx.clearRect(0,0,w,h);
  var grd = ctx.createLinearGradient(0,0,0,h);
  grd.addColorStop(0,'#1a7a3a');
  grd.addColorStop(1,'#2e9e4f');
  ctx.fillStyle = grd;
  ctx.beginPath();
  ctx.roundRect(0,0,w,h,16);
  ctx.fill();

  for(var i=0;i<30;i++){
    ctx.strokeStyle = 'rgba(255,255,255,0.05)';
    ctx.beginPath();
    ctx.moveTo(0, i*13);
    ctx.lineTo(w, i*13);
    ctx.stroke();
  }

  ctx.fillStyle = '#0f5a28';
  ctx.beginPath();
  ctx.arc(s.holeX, s.holeY, 14, 0, Math.PI*2);
  ctx.fill();
  ctx.strokeStyle = '#fff';
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.fillStyle = '#ff6b35';
  ctx.beginPath();
  ctx.moveTo(s.holeX, s.holeY - 30);
  ctx.lineTo(s.holeX + 3, s.holeY - 14);
  ctx.lineTo(s.holeX - 1, s.holeY - 14);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = '#888';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(s.holeX, s.holeY - 30);
  ctx.lineTo(s.holeX, s.holeY - 14);
  ctx.stroke();

  if(s.breakDir !== 0){
    ctx.strokeStyle = 'rgba(255,255,255,0.3)';
    ctx.lineWidth = 1;
    ctx.setLineDash([4,4]);
    for(var y = 80; y < h - 40; y += 30){
      ctx.beginPath();
      var offset = s.breakDir * (h - y) * 0.15;
      ctx.moveTo(100 + offset, y);
      ctx.lineTo(400 + offset, y);
      ctx.stroke();
    }
    ctx.setLineDash([]);
    ctx.fillStyle = 'rgba(255,255,255,0.5)';
    ctx.font = '11px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(s.breakDir < 0 ? '&#x2190; &#xC88C; &#xBE0C;&#xB808;&#xC774;&#xD06C;' : '&#xC6B0; &#xBE0C;&#xB808;&#xC774;&#xD06C; &#x2192;', 250, h - 10);
  }

  ctx.fillStyle = '#fff';
  ctx.beginPath();
  ctx.arc(s.ballX, s.ballY, 8, 0, Math.PI*2);
  ctx.fill();
  ctx.strokeStyle = '#ccc';
  ctx.lineWidth = 1;
  ctx.stroke();

  if(s.aiming){
    ctx.strokeStyle = 'rgba(255,107,53,0.7)';
    ctx.lineWidth = 2;
    ctx.setLineDash([6,4]);
    ctx.beginPath();
    ctx.moveTo(s.ballX, s.ballY);
    ctx.lineTo(s.aimX, s.aimY);
    ctx.stroke();
    ctx.setLineDash([]);
  }

  s.balls.forEach(function(b){
    ctx.fillStyle = b.made ? 'rgba(46,158,79,0.6)' : 'rgba(255,71,87,0.4)';
    ctx.beginPath();
    ctx.arc(b.x, b.y, 4, 0, Math.PI*2);
    ctx.fill();
  });

  c.onmousedown = c.ontouchstart = function(e){
    e.preventDefault();
    var rect = c.getBoundingClientRect();
    var scaleX = w / rect.width;
    var scaleY = h / rect.height;
    var px = ((e.touches?e.touches[0].clientX:e.clientX) - rect.left) * scaleX;
    var py = ((e.touches?e.touches[0].clientY:e.clientY) - rect.top) * scaleY;
    s.aiming = true;
    s.aimX = px;
    s.aimY = py;
    v21DrawPuttGreen();
  };
  c.onmousemove = c.ontouchmove = function(e){
    if(!s.aiming) return;
    e.preventDefault();
    var rect = c.getBoundingClientRect();
    var scaleX = w / rect.width;
    var scaleY = h / rect.height;
    s.aimX = ((e.touches?e.touches[0].clientX:e.clientX) - rect.left) * scaleX;
    s.aimY = ((e.touches?e.touches[0].clientY:e.clientY) - rect.top) * scaleY;
    v21DrawPuttGreen();
  };
  c.onmouseup = c.ontouchend = function(e){
    if(!s.aiming) return;
    s.aiming = false;
    v21DrawPuttGreen();
  };
}

function v21PuttShoot(){
  var s = v21PuttState;
  if(s.rolling) return;
  var dx = s.aimX - s.ballX;
  var dy = s.aimY - s.ballY;
  var dist = Math.sqrt(dx*dx + dy*dy);
  if(dist < 10){ return; }

  s.rolling = true;
  s.attempts++;
  var breakEffect = s.breakDir * s.distance * 2;
  var finalX = s.aimX + breakEffect + (Math.random()-0.5)*s.distance*3;
  var finalY = s.aimY + (Math.random()-0.5)*s.distance*2;

  var holeDist = Math.sqrt((finalX-s.holeX)*(finalX-s.holeX) + (finalY-s.holeY)*(finalY-s.holeY));
  var made = holeDist < 18;

  if(made){
    finalX = s.holeX;
    finalY = s.holeY;
    s.made++;
    s.streak++;
    if(s.streak > s.bestStreak) s.bestStreak = s.streak;
    v21PlaySFX('putt_hole');
  } else {
    s.streak = 0;
    v21PlaySFX('putt_hit');
  }

  s.balls.push({x:finalX, y:finalY, made:made});
  if(s.balls.length > 30) s.balls.shift();

  setTimeout(function(){
    s.rolling = false;
    v21RenderPutt();
  }, 600);

  v21SavePuttStats();
  v21CheckAchievements21();
}
window.v21PuttShoot = v21PuttShoot;

function v21PuttReset(){
  v21PuttState.balls = [];
  v21PuttState.attempts = 0;
  v21PuttState.made = 0;
  v21PuttState.streak = 0;
  v21RenderPutt();
}
window.v21PuttReset = v21PuttReset;

function v21SavePuttStats(){
  var s = v21PuttState;
  var data = JSON.parse(localStorage.getItem('sg_putt_stats') || '{"total":0,"made":0,"best":0}');
  data.total = (data.total||0) + 1;
  if(s.made > 0 && s.attempts > 0 && s.balls[s.balls.length-1].made) data.made = (data.made||0) + 1;
  if(s.bestStreak > (data.best||0)) data.best = s.bestStreak;
  localStorage.setItem('sg_putt_stats', JSON.stringify(data));
}

// ===== 2. CLUB RECOMMENDATION AI (클럽 추천 AI) =====
var V21_CLUBS = [
  {name:'&#xB4DC;&#xB77C;&#xC774;&#xBC84;',icon:'&#x1F3CC;&#xFE0F;',dist:[200,260],loft:'9-12&deg;',desc:'&#xD2F0;&#xC0F7; &#xCD5C;&#xB300; &#xBE44;&#xAC70;&#xB9AC;. &#xD398;&#xC5B4;&#xC6E8;&#xC774; &#xB113;&#xC740; &#xD640;&#xC5D0;&#xC11C; &#xC0AC;&#xC6A9;',cat:'wood'},
  {name:'3&#xBC88; &#xC6B0;&#xB4DC;',icon:'&#x1F3CC;&#xFE0F;',dist:[180,230],loft:'15&deg;',desc:'&#xD398;&#xC5B4;&#xC6E8;&#xC774; &#xC138;&#xCEE8;&#xB4DC; &#xC0F7;. &#xAE34; &#xD30C;4/&#xD30C;5&#xC5D0;&#xC11C; &#xD65C;&#xC6A9;',cat:'wood'},
  {name:'5&#xBC88; &#xC6B0;&#xB4DC;',icon:'&#x1F3CC;&#xFE0F;',dist:[170,210],loft:'18&deg;',desc:'&#xADF8;&#xB77C;&#xC6B4;&#xB4DC;/&#xB7EC;&#xD504;&#xC5D0;&#xC11C; &#xD65C;&#xC6A9;&#xB3C4; &#xB192;&#xC74C;',cat:'wood'},
  {name:'4&#xBC88; &#xC544;&#xC774;&#xC5B8;',icon:'&#x26F3;',dist:[160,195],loft:'21-24&deg;',desc:'&#xAE34; &#xC544;&#xC774;&#xC5B8;. &#xC815;&#xD655;&#xB3C4; &#xC694;&#xAD6C;&#xB418;&#xB294; &#xAE34; &#xAC70;&#xB9AC;',cat:'iron'},
  {name:'5&#xBC88; &#xC544;&#xC774;&#xC5B8;',icon:'&#x26F3;',dist:[150,185],loft:'25-28&deg;',desc:'&#xC911;&#xAC70;&#xB9AC; &#xC5B4;&#xD504;&#xB85C;&#xCE58;. &#xD30C;3 &#xD2F0;&#xC0F7;&#xC5D0;&#xB3C4; &#xD65C;&#xC6A9;',cat:'iron'},
  {name:'6&#xBC88; &#xC544;&#xC774;&#xC5B8;',icon:'&#x26F3;',dist:[140,175],loft:'29-32&deg;',desc:'&#xC911;&#xAC70;&#xB9AC; &#xC815;&#xD655;&#xB3C4;. &#xADF8;&#xB9B0; &#xACF5;&#xB7B5;&#xC5D0; &#xC801;&#xD569;',cat:'iron'},
  {name:'7&#xBC88; &#xC544;&#xC774;&#xC5B8;',icon:'&#x26F3;',dist:[130,165],loft:'33-36&deg;',desc:'&#xAC00;&#xC7A5; &#xB9CE;&#xC774; &#xC0AC;&#xC6A9;&#xB418;&#xB294; &#xD074;&#xB7FD;. &#xC5F0;&#xC2B5; &#xAE30;&#xBCF8; &#xD074;&#xB7FD;',cat:'iron'},
  {name:'8&#xBC88; &#xC544;&#xC774;&#xC5B8;',icon:'&#x26F3;',dist:[120,155],loft:'37-40&deg;',desc:'&#xC27D; &#xC5B4;&#xD504;&#xB85C;&#xCE58;. &#xB192;&#xC740; &#xD0C4;&#xB3C4;&#xB85C; &#xADF8;&#xB9B0;&#xC5D0; &#xC815;&#xC9C0;',cat:'iron'},
  {name:'9&#xBC88; &#xC544;&#xC774;&#xC5B8;',icon:'&#x26F3;',dist:[110,140],loft:'41-44&deg;',desc:'&#xC27D; &#xAC70;&#xB9AC; &#xC5B4;&#xD504;&#xB85C;&#xCE58;. &#xD540; &#xC704;&#xCE58; &#xACF5;&#xB7B5;',cat:'iron'},
  {name:'PW (&#xD53C;&#xCE6D;&#xC6E8;&#xC9C0;)',icon:'&#x1F3AF;',dist:[100,130],loft:'44-48&deg;',desc:'100m &#xC774;&#xB0B4; &#xC5B4;&#xD504;&#xB85C;&#xCE58;. &#xD480; &#xC2A4;&#xC719; &#xAE30;&#xBCF8;',cat:'wedge'},
  {name:'GW (&#xAC29;&#xC6E8;&#xC9C0;)',icon:'&#x1F3AF;',dist:[80,110],loft:'50-52&deg;',desc:'&#xADF8;&#xB9B0; &#xC8FC;&#xBCC0; &#xCE69; &#xC0F7;. &#xBC88;&#xCEE4; &#xD0C8;&#xCD9C;&#xC5D0;&#xB3C4; &#xD65C;&#xC6A9;',cat:'wedge'},
  {name:'SW (&#xC0CC;&#xB4DC;&#xC6E8;&#xC9C0;)',icon:'&#x1F3AF;',dist:[60,90],loft:'54-58&deg;',desc:'&#xBC88;&#xCEE4; &#xD0C8;&#xCD9C; &#xC804;&#xBB38;. &#xB192;&#xC740; &#xD0C4;&#xB3C4;&#xB85C; &#xBD80;&#xB4DC;&#xB7EC;&#xC6B4; &#xB79C;&#xB529;',cat:'wedge'},
  {name:'LW (&#xB85C;&#xBE0C;&#xC6E8;&#xC9C0;)',icon:'&#x1F3AF;',dist:[40,70],loft:'58-64&deg;',desc:'&#xCD5C;&#xB2E8;&#xAC70;&#xB9AC; &#xB86D; &#xC0F7;. &#xADF8;&#xB9B0; &#xC8FC;&#xBCC0; &#xC7A5;&#xC560;&#xBB3C; &#xB118;&#xAE30;&#xAE30;',cat:'wedge'},
  {name:'&#xD37C;&#xD130;',icon:'&#x1F3CC;&#xFE0F;',dist:[0,30],loft:'2-5&deg;',desc:'&#xADF8;&#xB9B0; &#xC704; &#xD37C;&#xD305; &#xC804;&#xC6A9;. &#xC815;&#xD655;&#xB3C4;&#xAC00; &#xC0DD;&#xBA85;',cat:'putter'}
];

function v21OpenClubRec(){
  var ov = document.getElementById('v21ClubOv');
  if(!ov){
    ov = document.createElement('div');
    ov.id = 'v21ClubOv';
    ov.className = 'v21-overlay';
    ov.innerHTML = '<div class="v21-modal" id="v21ClubModal"></div>';
    ov.addEventListener('click', function(e){ if(e.target===ov) ov.classList.remove('active'); });
    document.body.appendChild(ov);
  }
  v21RenderClubRec(150);
  ov.classList.add('active');
  v21PlaySFX('club_select');
}
window.v21OpenClubRec = v21OpenClubRec;

function v21RenderClubRec(targetDist){
  var m = document.getElementById('v21ClubModal');
  var d = parseInt(targetDist) || 150;
  var h = '<div class="v21-hdr"><h2><span class="v21i">&#x1F3AF;</span> &#xD074;&#xB7FD; &#xCD94;&#xCC9C; AI</h2><button class="v21-x" onclick="document.getElementById(\'v21ClubOv\').classList.remove(\'active\')">&times;</button></div>';
  h += '<div style="margin-bottom:18px"><label style="font-size:13px;font-weight:700">&#xBAA9;&#xD45C; &#xAC70;&#xB9AC;: <span style="color:var(--primary);font-size:18px">' + d + 'm</span></label>';
  h += '<input type="range" min="10" max="280" value="' + d + '" style="width:100%;accent-color:var(--primary)" oninput="v21RenderClubRec(this.value)"></div>';

  var conditions = JSON.parse(localStorage.getItem('sg_club_conditions') || '{"wind":"none","lie":"fairway","elevation":"flat"}');
  h += '<div class="v21-grid3" style="margin-bottom:16px">';
  h += '<div><label style="font-size:11px;font-weight:700;color:var(--text-muted)">&#xBC14;&#xB78C;</label><select class="v21-select" style="width:100%" onchange="v21SetCondition(\'wind\',this.value)">';
  [{v:'none',l:'&#xC5C6;&#xC74C;'},{v:'headwind',l:'&#xC5ED;&#xD48D; &#x1F4A8;'},{v:'tailwind',l:'&#xC21C;&#xD48D; &#x1F343;'},{v:'crosswind',l:'&#xCE21;&#xD48D; &#x1F32C;&#xFE0F;'}].forEach(function(w){
    h += '<option value="' + w.v + '"' + (conditions.wind===w.v?' selected':'') + '>' + w.l + '</option>';
  });
  h += '</select></div>';
  h += '<div><label style="font-size:11px;font-weight:700;color:var(--text-muted)">&#xB77C;&#xC774;</label><select class="v21-select" style="width:100%" onchange="v21SetCondition(\'lie\',this.value)">';
  [{v:'fairway',l:'&#xD398;&#xC5B4;&#xC6E8;&#xC774;'},{v:'rough',l:'&#xB7EC;&#xD504;'},{v:'bunker',l:'&#xBC88;&#xCEE4;'},{v:'tee',l:'&#xD2F0; &#xC5C5;'}].forEach(function(l){
    h += '<option value="' + l.v + '"' + (conditions.lie===l.v?' selected':'') + '>' + l.l + '</option>';
  });
  h += '</select></div>';
  h += '<div><label style="font-size:11px;font-weight:700;color:var(--text-muted)">&#xACBD;&#xC0AC;</label><select class="v21-select" style="width:100%" onchange="v21SetCondition(\'elevation\',this.value)">';
  [{v:'flat',l:'&#xD3C9;&#xC9C0;'},{v:'uphill',l:'&#xC624;&#xB974;&#xB9C9; &#x2B06;&#xFE0F;'},{v:'downhill',l:'&#xB0B4;&#xB9AC;&#xB9C9; &#x2B07;&#xFE0F;'}].forEach(function(e){
    h += '<option value="' + e.v + '"' + (conditions.elevation===e.v?' selected':'') + '>' + e.l + '</option>';
  });
  h += '</select></div></div>';

  var adjusted = d;
  if(conditions.wind==='headwind') adjusted = Math.round(d * 1.1);
  else if(conditions.wind==='tailwind') adjusted = Math.round(d * 0.9);
  if(conditions.elevation==='uphill') adjusted = Math.round(adjusted * 1.08);
  else if(conditions.elevation==='downhill') adjusted = Math.round(adjusted * 0.92);
  if(conditions.lie==='rough') adjusted = Math.round(adjusted * 0.85);
  else if(conditions.lie==='bunker') adjusted = Math.round(adjusted * 0.7);

  if(adjusted !== d){
    h += '<div style="text-align:center;margin-bottom:14px;padding:10px;background:var(--primary-light);border-radius:12px;font-size:13px"><b>&#xBCF4;&#xC815; &#xAC70;&#xB9AC;: <span style="color:var(--primary);font-size:16px">' + adjusted + 'm</span></b> (&#xC870;&#xAC74; &#xBCF4;&#xC815; &#xBC18;&#xC601;)</div>';
  }

  h += '<h3 style="font-size:16px;font-weight:800;margin-bottom:14px">&#x1F3CC;&#xFE0F; &#xCD94;&#xCC9C; &#xD074;&#xB7FD;</h3>';
  var ranked = V21_CLUBS.filter(function(c){
    return adjusted >= c.dist[0] - 15 && adjusted <= c.dist[1] + 15;
  }).sort(function(a,b){
    var midA = (a.dist[0]+a.dist[1])/2;
    var midB = (b.dist[0]+b.dist[1])/2;
    return Math.abs(midA-adjusted) - Math.abs(midB-adjusted);
  });

  if(ranked.length === 0){
    h += '<div class="v21-card"><p>&#xD574;&#xB2F9; &#xAC70;&#xB9AC;&#xC5D0; &#xC801;&#xD569;&#xD55C; &#xD074;&#xB7FD;&#xC744; &#xCC3E;&#xC744; &#xC218; &#xC5C6;&#xC2B5;&#xB2C8;&#xB2E4;.</p></div>';
  } else {
    ranked.forEach(function(c, idx){
      var colors = {wood:'#1565c0',iron:'#2e7d32',wedge:'#e65100',putter:'#7b1fa2'};
      var bg = colors[c.cat] || '#1a7a3a';
      var match = 100 - Math.round(Math.abs((c.dist[0]+c.dist[1])/2 - adjusted) / adjusted * 100);
      if(match > 100) match = 100;
      if(match < 0) match = 0;
      h += '<div class="v21-club-rec">';
      h += '<div class="v21-club-icon" style="background:' + bg + ';color:#fff">' + c.icon + '</div>';
      h += '<div class="v21-club-info"><div class="v21-club-name">' + (idx===0?'&#x2B50; ':'') + c.name + ' <span style="font-size:10px;color:var(--text-muted)">(' + c.dist[0] + '-' + c.dist[1] + 'm)</span></div>';
      h += '<div class="v21-club-desc">' + c.desc + '</div>';
      h += '<div style="margin-top:6px"><div class="v21-progress"><div class="v21-progress-fill" style="width:' + match + '%;background:' + bg + '"></div></div>';
      h += '<span style="font-size:10px;color:var(--text-muted)">&#xC801;&#xD569;&#xB3C4; ' + match + '%</span></div>';
      h += '</div></div>';
    });
  }

  m.innerHTML = h;
}
window.v21RenderClubRec = v21RenderClubRec;

function v21SetCondition(key, val){
  var c = JSON.parse(localStorage.getItem('sg_club_conditions') || '{"wind":"none","lie":"fairway","elevation":"flat"}');
  c[key] = val;
  localStorage.setItem('sg_club_conditions', JSON.stringify(c));
}
window.v21SetCondition = v21SetCondition;

// ===== 3. SWING CHECKLIST (스윙 체크리스트) =====
var V21_CHECKLIST = [
  {id:'grip',title:'&#xADF8;&#xB9BD; &#xCCB4;&#xD06C;',desc:'&#xC591;&#xC190; V&#xC790;&#xAC00; &#xC6B0;&#xCE21; &#xC5B4;&#xAE68;&#xB97C; &#xAC00;&#xB9AC;&#xD0A4;&#xB294;&#xC9C0; &#xD655;&#xC778;',cat:'setup'},
  {id:'stance',title:'&#xC2A4;&#xD0E0;&#xC2A4; &#xB108;&#xBE44;',desc:'&#xC5B4;&#xAE68;&#xB108;&#xBE44;&#xB85C; &#xBC1C;&#xC744; &#xBC8C;&#xB9AC;&#xACE0; &#xBB34;&#xAC8C;&#xC911;&#xC2EC; &#xD655;&#xC778;',cat:'setup'},
  {id:'align',title:'&#xC5BC;&#xB77C;&#xC778;&#xBA3C;&#xD2B8;',desc:'&#xBC1C;/&#xC5B4;&#xAE68;/&#xD78C;&#xC774; &#xBAA9;&#xD45C;&#xC640; &#xD3C9;&#xD589;&#xC778;&#xC9C0; &#xCCB4;&#xD06C;',cat:'setup'},
  {id:'ballpos',title:'&#xBCFC; &#xD3EC;&#xC9C0;&#xC158;',desc:'&#xB4DC;&#xB77C;&#xC774;&#xBC84;: &#xC67C;&#xBC1C; &#xC548;&#xCABD;, &#xC544;&#xC774;&#xC5B8;: &#xC911;&#xC559; &#xD655;&#xC778;',cat:'setup'},
  {id:'takeaway',title:'&#xD14C;&#xC774;&#xD06C;&#xC5B4;&#xC6E8;&#xC774;',desc:'&#xD074;&#xB7FD;&#xD5E4;&#xB4DC;&#xAC00; &#xC190;&#xBCF4;&#xB2E4; &#xC55E;&#xC5D0;&#xC11C; &#xC774;&#xB3D9;&#xD558;&#xB294;&#xC9C0; &#xD655;&#xC778;',cat:'swing'},
  {id:'backswing',title:'&#xBC31;&#xC2A4;&#xC719; &#xD0D1;',desc:'&#xC67C;&#xC5B4;&#xAE68;&#xAC00; &#xD134; &#xC544;&#xB798;&#xC5D0; &#xC704;&#xCE58;&#xD558;&#xB294;&#xC9C0; &#xCCB4;&#xD06C;',cat:'swing'},
  {id:'transition',title:'&#xB2E4;&#xC6B4;&#xC2A4;&#xC719; &#xC2DC;&#xC791;',desc:'&#xD558;&#xCCB4; &#xB9AC;&#xB4DC;&#xB85C; &#xC804;&#xD658;&#xC774; &#xC2DC;&#xC791;&#xB418;&#xB294;&#xC9C0; &#xD655;&#xC778;',cat:'swing'},
  {id:'impact',title:'&#xC784;&#xD329;&#xD2B8; &#xC790;&#xC138;',desc:'&#xC190;&#xC774; &#xD074;&#xB7FD;&#xD5E4;&#xB4DC;&#xBCF4;&#xB2E4; &#xC55E;&#xC5D0; &#xC788;&#xB294;&#xC9C0; &#xCCB4;&#xD06C;',cat:'swing'},
  {id:'follow',title:'&#xD314;&#xB85C;&#xC2A4;&#xB8E8;',desc:'&#xD0C0;&#xAC9F;&#xC744; &#xD5A5;&#xD574; &#xD074;&#xB7FD;&#xC774; &#xC790;&#xC5F0;&#xC2A4;&#xB7FD;&#xAC8C; &#xC774;&#xB3D9;',cat:'swing'},
  {id:'finish',title:'&#xD53C;&#xB2C8;&#xC2DC; &#xC790;&#xC138;',desc:'&#xBC84;&#xD074;&#xC744; &#xD5A5;&#xD574; &#xBC38;&#xB7F0;&#xC2A4;&#xB97C; &#xC720;&#xC9C0;&#xD558;&#xBA70; &#xB9C8;&#xBB34;&#xB9AC;',cat:'finish'},
  {id:'tempo',title:'&#xD15C;&#xD3EC; &#xCCB4;&#xD06C;',desc:'3:1 &#xBC31;&#xC2A4;&#xC719;:&#xB2E4;&#xC6B4;&#xC2A4;&#xC719; &#xBE44;&#xC728;&#xC744; &#xC720;&#xC9C0;',cat:'rhythm'},
  {id:'breath',title:'&#xD638;&#xD761; &#xCCB4;&#xD06C;',desc:'&#xBC31;&#xC2A4;&#xC719;&#xC5D0;&#xC11C; &#xD638;&#xD761;&#xD558;&#xACE0; &#xC784;&#xD329;&#xD2B8; &#xC804; &#xD638;&#xD765;',cat:'rhythm'}
];

function v21OpenChecklist(){
  var ov = document.getElementById('v21CheckOv');
  if(!ov){
    ov = document.createElement('div');
    ov.id = 'v21CheckOv';
    ov.className = 'v21-overlay';
    ov.innerHTML = '<div class="v21-modal" id="v21CheckModal"></div>';
    ov.addEventListener('click', function(e){ if(e.target===ov) ov.classList.remove('active'); });
    document.body.appendChild(ov);
  }
  v21RenderChecklist();
  ov.classList.add('active');
  v21PlaySFX('checklist_check');
}
window.v21OpenChecklist = v21OpenChecklist;

function v21GetChecked(){
  return JSON.parse(localStorage.getItem('sg_swing_checklist') || '{}');
}

function v21RenderChecklist(){
  var m = document.getElementById('v21CheckModal');
  var checked = v21GetChecked();
  var total = V21_CHECKLIST.length;
  var done = Object.keys(checked).filter(function(k){return checked[k];}).length;

  var h = '<div class="v21-hdr"><h2><span class="v21i">&#x2705;</span> &#xC2A4;&#xC719; &#xCCB4;&#xD06C;&#xB9AC;&#xC2A4;&#xD2B8;</h2><button class="v21-x" onclick="document.getElementById(\'v21CheckOv\').classList.remove(\'active\')">&times;</button></div>';
  h += '<div style="margin-bottom:16px"><div style="display:flex;justify-content:space-between;align-items:center"><span style="font-size:13px;font-weight:700">' + done + '/' + total + ' &#xC644;&#xB8CC;</span>';
  h += '<button class="v21-btn v21-btn-secondary v21-btn-sm" onclick="v21ResetChecklist()">&#x1F504; &#xCD08;&#xAE30;&#xD654;</button></div>';
  h += '<div class="v21-progress"><div class="v21-progress-fill" style="width:' + Math.round(done/total*100) + '%;background:linear-gradient(90deg,var(--primary),#2e9e4f)"></div></div></div>';

  var cats = [{id:'setup',name:'&#x1F3CC;&#xFE0F; &#xC140;&#xC5C5;'},{id:'swing',name:'&#x1F4AA; &#xC2A4;&#xC719;'},{id:'finish',name:'&#x1F3C6; &#xD53C;&#xB2C8;&#xC2DC;'},{id:'rhythm',name:'&#x1F3B5; &#xB9AC;&#xB4EC;'}];
  cats.forEach(function(cat){
    var items = V21_CHECKLIST.filter(function(c){return c.cat===cat.id;});
    h += '<h3 style="font-size:14px;font-weight:800;margin:16px 0 10px">' + cat.name + '</h3>';
    items.forEach(function(item){
      var isChecked = checked[item.id];
      h += '<div class="v21-checklist-item' + (isChecked?' checked':'') + '" onclick="v21ToggleCheck(\'' + item.id + '\')">';
      h += '<div class="v21-check-box">' + (isChecked?'&#x2714;':'') + '</div>';
      h += '<div class="v21-check-text"><div class="v21-check-title">' + item.title + '</div>';
      h += '<div class="v21-check-desc">' + item.desc + '</div></div></div>';
    });
  });

  m.innerHTML = h;
}

function v21ToggleCheck(id){
  var checked = v21GetChecked();
  checked[id] = !checked[id];
  localStorage.setItem('sg_swing_checklist', JSON.stringify(checked));
  v21PlaySFX('checklist_check');
  v21RenderChecklist();
  v21CheckAchievements21();
}
window.v21ToggleCheck = v21ToggleCheck;

function v21ResetChecklist(){
  localStorage.setItem('sg_swing_checklist', '{}');
  v21RenderChecklist();
}
window.v21ResetChecklist = v21ResetChecklist;

// ===== 4. COURSE MANAGEMENT STRATEGY (코스 매니지먼트 전략) =====
var V21_STRATEGIES = [
  {hole:1,par:4,yard:380,strategy:'&#xD2F0;&#xC0F7;: &#xB4DC;&#xB77C;&#xC774;&#xBC84;&#xB85C; &#xD398;&#xC5B4;&#xC6E8;&#xC774; &#xC88C;&#xCE21; &#xACF5;&#xB7B5;. &#xC6B0;&#xCE21; OB &#xC8FC;&#xC758;.',tip:'&#xBC14;&#xB78C;&#xC774; &#xC5ED;&#xD48D;&#xC774;&#xBA74; 3&#xBC88; &#xC6B0;&#xB4DC;&#xB85C; &#xC548;&#xC804;&#xD558;&#xAC8C; &#xACF5;&#xB7B5;',risk:'&#xC6B0;&#xCE21; OB, &#xC88C;&#xCE21; &#xBC88;&#xCEE4;'},
  {hole:2,par:4,yard:410,strategy:'&#xD398;&#xC5B4;&#xC6E8;&#xC774; &#xC88C;&#xCE21; &#xB3C4;&#xADF8;&#xB808;&#xADF8;. &#xB4DC;&#xB77C;&#xC774;&#xBC84; 230m &#xD0C0;&#xAC9F;.',tip:'&#xC138;&#xCEE8;&#xB4DC; &#xC0F7;&#xC73C;&#xB85C; &#xADF8;&#xB9B0; &#xC5D0;&#xC9C0; &#xACF5;&#xB7B5;. &#xD540; &#xC544;&#xB798;&#xCABD; &#xACF5;&#xB7B5;',risk:'&#xC88C;&#xCE21; &#xC6CC;&#xD130;, &#xADF8;&#xB9B0; &#xC55E; &#xBC88;&#xCEE4;'},
  {hole:3,par:3,yard:165,strategy:'7&#xBC88; &#xC544;&#xC774;&#xC5B8;&#xC73C;&#xB85C; &#xADF8;&#xB9B0; &#xC911;&#xC559; &#xACF5;&#xB7B5;.',tip:'&#xD540; &#xC704;&#xCE58;&#xC5D0; &#xAD00;&#xACC4;&#xC5C6;&#xC774; &#xC911;&#xC559; &#xACF5;&#xB7B5;&#xC774; &#xC548;&#xC804;',risk:'&#xC88C;&#xC6B0; &#xBC88;&#xCEE4;, &#xADF8;&#xB9B0; &#xAE30;&#xC6B8;&#xAE30; &#xC88C;&#x2192;&#xC6B0;'},
  {hole:4,par:5,yard:530,strategy:'3&#xC628; &#xC804;&#xB7B5;. &#xB4DC;&#xB77C;&#xC774;&#xBC84; + 5I + &#xC6E8;&#xC9C0;.',tip:'&#xC774;&#xAE00; &#xC2DC;&#xB3C4;&#xBCF4;&#xB2E4; &#xC548;&#xC804;&#xD55C; 3&#xC628;&#xC73C;&#xB85C; &#xBC84;&#xB514; &#xCCAB; &#xD655;&#xBCF4;',risk:'&#xC6B0;&#xCE21; &#xC6CC;&#xD130; &#xD574;&#xC800;&#xB4DC;, &#xADF8;&#xB9B0; &#xB4A4; &#xACBD;&#xC0AC;'},
  {hole:5,par:4,yard:395,strategy:'&#xD398;&#xC5B4;&#xC6E8;&#xC774; &#xC6B0;&#xCE21; &#xB3C4;&#xADF8;&#xB808;&#xADF8;. 3W&#xB85C; &#xCF54;&#xB108; &#xACF5;&#xB7B5;.',tip:'&#xC6B0;&#xCE21; &#xCF54;&#xB108; &#xC0F7;&#xCEBB;&#xC73C;&#xB85C; &#xC138;&#xCEE8;&#xB4DC; &#xC0F7; &#xAC70;&#xB9AC; &#xB2E8;&#xCD95;',risk:'&#xCF54;&#xB108; &#xCEBB;&#xD305; &#xC2DC; &#xB098;&#xBB34; &#xC8FC;&#xC758;'},
  {hole:6,par:4,yard:350,strategy:'&#xC9E7;&#xC740; &#xD30C;4. &#xC544;&#xC774;&#xC5B8;&#xC73C;&#xB85C; &#xC548;&#xC804;&#xD558;&#xAC8C; &#xD398;&#xC5B4;&#xC6E8;&#xC774;.',tip:'&#xBC84;&#xB514; &#xAE30;&#xD68C; &#xD640;. &#xC6E8;&#xC9C0; &#xC5B4;&#xD504;&#xB85C;&#xCE58;&#xB97C; &#xC790;&#xC2E0; &#xC788;&#xAC8C;',risk:'&#xADF8;&#xB9B0; &#xC55E; &#xBC88;&#xCEE4; 3&#xAC1C;'},
  {hole:7,par:3,yard:195,strategy:'5&#xBC88; &#xC544;&#xC774;&#xC5B8;/&#xD558;&#xC774;&#xBE0C;&#xB9AC;&#xB4DC;. &#xBE0C;&#xB808;&#xC774;&#xD06C; &#xC5C6;&#xB294; &#xCE21;&#xC73C;&#xB85C;.',tip:'&#xAE34; &#xD30C;3&#xB294; &#xBCF4;&#xAE30;&#xAC00; &#xC131;&#xACF5;. &#xADF8;&#xB9B0; &#xBBF8;&#xC2A4; &#xD6C4; &#xCE69;&#xC73C;&#xB85C; &#xB9CC;&#xD68C;',risk:'&#xC6B0;&#xCE21; &#xAE4A;&#xC740; &#xBC88;&#xCEE4;'},
  {hole:8,par:4,yard:420,strategy:'&#xAE34; &#xD30C;4. &#xB4DC;&#xB77C;&#xC774;&#xBC84; &#xD544;&#xC218;. &#xD398;&#xC5B4;&#xC6E8;&#xC774; &#xC88C;&#xCE21; &#xACF5;&#xB7B5;.',tip:'&#xC138;&#xCEE8;&#xB4DC; &#xC0F7; 170m+ &#xD544;&#xC694;. &#xADF8;&#xB9B0; &#xC55E; &#xC548;&#xC804; &#xC804;&#xB7B5;&#xB3C4; OK',risk:'&#xC88C;&#xCE21; OB, &#xADF8;&#xB9B0; 2&#xB2E8; &#xACBD;&#xC0AC;'},
  {hole:9,par:5,yard:520,strategy:'&#xB9C8;&#xBB34;&#xB9AC; &#xD30C;5. &#xACF5;&#xACA9;&#xC801; &#xD50C;&#xB808;&#xC774; &#xAC00;&#xB2A5;.',tip:'2&#xC628; &#xC2DC;&#xB3C4; &#xC2DC; &#xC6B0;&#xCE21; &#xACBD;&#xC0AC; &#xD65C;&#xC6A9;. &#xC67C;&#xCE21; &#xC5B4;&#xD504;&#xB85C;&#xCE58; &#xAE08;&#xC9C0;',risk:'&#xADF8;&#xB9B0; &#xB4A4; &#xC6CC;&#xD130;, &#xC88C;&#xCE21; &#xC5B4;&#xD504;&#xB85C;&#xCE58; &#xC704;&#xD5D8;'}
];

function v21OpenStrategy(){
  var ov = document.getElementById('v21StratOv');
  if(!ov){
    ov = document.createElement('div');
    ov.id = 'v21StratOv';
    ov.className = 'v21-overlay';
    ov.innerHTML = '<div class="v21-modal" id="v21StratModal"></div>';
    ov.addEventListener('click', function(e){ if(e.target===ov) ov.classList.remove('active'); });
    document.body.appendChild(ov);
  }
  v21RenderStrategy();
  ov.classList.add('active');
  v21PlaySFX('strategy_open');
}
window.v21OpenStrategy = v21OpenStrategy;

function v21RenderStrategy(){
  var m = document.getElementById('v21StratModal');
  var h = '<div class="v21-hdr"><h2><span class="v21i">&#x1F9E0;</span> &#xCF54;&#xC2A4; &#xB9E4;&#xB2C8;&#xC9C0;&#xBA3C;&#xD2B8;</h2><button class="v21-x" onclick="document.getElementById(\'v21StratOv\').classList.remove(\'active\')">&times;</button></div>';
  h += '<p style="font-size:13px;color:var(--text-muted);margin-bottom:18px;line-height:1.7">&#xD640;&#xBCC4; &#xC804;&#xB7B5; &#xAC00;&#xC774;&#xB4DC;. &#xC548;&#xC804;&#xD55C; &#xCF54;&#xC2A4; &#xACF5;&#xB7B5;&#xC73C;&#xB85C; &#xC2A4;&#xCF54;&#xC5B4;&#xB97C; &#xC904;&#xC774;&#xC138;&#xC694;.</p>';

  V21_STRATEGIES.forEach(function(s){
    h += '<div class="v21-strategy-hole">';
    h += '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">';
    h += '<div class="v21-strategy-num">Hole ' + s.hole + '</div>';
    h += '<div><span class="v21-badge" style="background:var(--primary-light);color:var(--primary)">PAR ' + s.par + '</span> ';
    h += '<span class="v21-badge" style="background:#fff3e0;color:#e65100">' + s.yard + 'yd</span></div></div>';
    h += '<div class="v21-strategy-detail"><b>&#xC804;&#xB7B5;:</b> ' + s.strategy + '</div>';
    h += '<div class="v21-strategy-detail" style="margin-top:6px"><b>&#x1F4A1; &#xD301;:</b> ' + s.tip + '</div>';
    h += '<div class="v21-strategy-detail" style="margin-top:6px;color:#ff4757"><b>&#x26A0;&#xFE0F; &#xC704;&#xD5D8;:</b> ' + s.risk + '</div>';
    h += '</div>';
  });

  m.innerHTML = h;
}

// ===== 5. GIR/FIR TRACKER =====
function v21OpenGIR(){
  var ov = document.getElementById('v21GIROv');
  if(!ov){
    ov = document.createElement('div');
    ov.id = 'v21GIROv';
    ov.className = 'v21-overlay';
    ov.innerHTML = '<div class="v21-modal" id="v21GIRModal"></div>';
    ov.addEventListener('click', function(e){ if(e.target===ov) ov.classList.remove('active'); });
    document.body.appendChild(ov);
  }
  v21RenderGIR();
  ov.classList.add('active');
  v21PlaySFX('gir_toggle');
}
window.v21OpenGIR = v21OpenGIR;

function v21GetGIRData(){
  return JSON.parse(localStorage.getItem('sg_gir_data') || '{"gir":[],"fir":[],"scramble":[]}');
}

function v21RenderGIR(){
  var m = document.getElementById('v21GIRModal');
  var d = v21GetGIRData();
  var girCount = d.gir.filter(function(v){return v===1;}).length;
  var firCount = d.fir.filter(function(v){return v===1;}).length;
  var scrCount = d.scramble.filter(function(v){return v===1;}).length;
  var girPct = d.gir.length > 0 ? Math.round(girCount/18*100) : 0;
  var firPct = d.fir.length > 0 ? Math.round(firCount/14*100) : 0;

  var h = '<div class="v21-hdr"><h2><span class="v21i">&#x1F4CA;</span> GIR/FIR &#xD2B8;&#xB798;&#xCEE4;</h2><button class="v21-x" onclick="document.getElementById(\'v21GIROv\').classList.remove(\'active\')">&times;</button></div>';
  h += '<div class="v21-grid3" style="margin-bottom:18px">';
  h += '<div class="v21-card" style="text-align:center"><div style="font-size:28px;font-weight:900;color:var(--primary)">' + girPct + '%</div><div style="font-size:11px;color:var(--text-muted)">GIR (' + girCount + '/18)</div></div>';
  h += '<div class="v21-card" style="text-align:center"><div style="font-size:28px;font-weight:900;color:#1565c0">' + firPct + '%</div><div style="font-size:11px;color:var(--text-muted)">FIR (' + firCount + '/14)</div></div>';
  h += '<div class="v21-card" style="text-align:center"><div style="font-size:28px;font-weight:900;color:#e65100">' + scrCount + '</div><div style="font-size:11px;color:var(--text-muted)">Scramble</div></div></div>';

  h += '<h3 style="font-size:14px;font-weight:800;margin-bottom:10px">&#x26F3; GIR (Greens in Regulation) - 18&#xD640;</h3>';
  h += '<p style="font-size:11px;color:var(--text-muted);margin-bottom:10px">&#xADF8;&#xB9B0;&#xC5D0; &#xADDC;&#xC815;&#xD0C0;&#xC218; &#xC774;&#xD558;&#xB85C; &#xC62C;&#xB838;&#xB294;&#xC9C0; &#xCCB4;&#xD06C;&#xD558;&#xC138;&#xC694; (&#xD074;&#xB9AD; &#xD1A0;&#xAE00;)</p>';
  h += '<div class="v21-gir-grid">';
  for(var i=0;i<18;i++){
    var state = d.gir[i];
    var cls = state === 1 ? 'gir-hit' : (state === 0 ? 'gir-miss' : '');
    h += '<div class="v21-gir-cell ' + cls + '" onclick="v21ToggleGIR(\'gir\',' + i + ')">' + (i+1) + '</div>';
    if(i === 8) h += '</div><div class="v21-gir-grid" style="margin-top:-6px">';
  }
  h += '</div>';

  h += '<div class="v21-divider"></div>';
  h += '<h3 style="font-size:14px;font-weight:800;margin-bottom:10px">&#x1F3CC;&#xFE0F; FIR (Fairways in Regulation) - 14&#xD640;</h3>';
  h += '<p style="font-size:11px;color:var(--text-muted);margin-bottom:10px">&#xD30C;3 &#xC81C;&#xC678; 14&#xD640; &#xD398;&#xC5B4;&#xC6E8;&#xC774; &#xC801;&#xC911; &#xC5EC;&#xBD80;</p>';
  h += '<div class="v21-gir-grid">';
  var firHoles = [1,2,4,5,6,8,9,10,11,12,14,15,16,18];
  firHoles.forEach(function(holeNum, idx){
    var state = d.fir[idx];
    var cls = state === 1 ? 'gir-hit' : (state === 0 ? 'gir-miss' : '');
    h += '<div class="v21-gir-cell ' + cls + '" style="' + (state===1?'':'') + '" onclick="v21ToggleGIR(\'fir\',' + idx + ')">' + holeNum + '</div>';
  });
  h += '</div>';

  h += '<div class="v21-divider"></div>';
  h += '<div style="display:flex;gap:8px;flex-wrap:wrap">';
  h += '<button class="v21-btn v21-btn-primary v21-btn-sm" onclick="v21SaveGIRRound()">&#x1F4BE; &#xB77C;&#xC6B4;&#xB4DC; &#xC800;&#xC7A5;</button>';
  h += '<button class="v21-btn v21-btn-danger v21-btn-sm" onclick="v21ResetGIR()">&#x1F5D1; &#xCD08;&#xAE30;&#xD654;</button></div>';

  m.innerHTML = h;
}

function v21ToggleGIR(type, idx){
  var d = v21GetGIRData();
  var maxLen = type === 'gir' ? 18 : 14;
  while(d[type].length < maxLen) d[type].push(-1);
  if(d[type][idx] === -1) d[type][idx] = 1;
  else if(d[type][idx] === 1) d[type][idx] = 0;
  else d[type][idx] = -1;
  localStorage.setItem('sg_gir_data', JSON.stringify(d));
  v21PlaySFX('gir_toggle');
  v21RenderGIR();
  v21CheckAchievements21();
}
window.v21ToggleGIR = v21ToggleGIR;

function v21SaveGIRRound(){
  var d = v21GetGIRData();
  var history = JSON.parse(localStorage.getItem('sg_gir_history') || '[]');
  history.unshift({date:new Date().toISOString().slice(0,10), gir:d.gir.slice(), fir:d.fir.slice()});
  if(history.length > 50) history = history.slice(0,50);
  localStorage.setItem('sg_gir_history', JSON.stringify(history));
  if(typeof showToast === 'function') showToast('GIR/FIR &#xB77C;&#xC6B4;&#xB4DC; &#xC800;&#xC7A5; &#xC644;&#xB8CC;!', 'success');
}
window.v21SaveGIRRound = v21SaveGIRRound;

function v21ResetGIR(){
  localStorage.setItem('sg_gir_data', '{"gir":[],"fir":[],"scramble":[]}');
  v21RenderGIR();
}
window.v21ResetGIR = v21ResetGIR;

// ===== 6. GOLF FITNESS ROUTINE (골프 피트니스 루틴) =====
var V21_FITNESS = [
  {name:'&#xD799; &#xB85C;&#xD14C;&#xC774;&#xC158;',icon:'&#x1F9D8;',sets:'3&#xC138;&#xD2B8; x 15&#xD68C;',desc:'&#xD799; &#xD68C;&#xC804;&#xB825; &#xAC15;&#xD654;. &#xC2A4;&#xC719; &#xD30C;&#xC6CC;&#xC758; &#xC6D0;&#xCC9C;',muscles:'&#xB300;&#xB465;&#xADFC;, &#xACE0;&#xAD00;&#xC808;',bg:'#e8f5e9'},
  {name:'&#xD1A0;&#xC18C; &#xB85C;&#xD14C;&#xC774;&#xC158;',icon:'&#x1F504;',sets:'3&#xC138;&#xD2B8; x 20&#xD68C;',desc:'&#xBAB8;&#xD1B5; &#xD68C;&#xC804;&#xB825; &#xD5A5;&#xC0C1;. &#xBC31;&#xC2A4;&#xC719; &#xAC01;&#xB3C4; &#xD655;&#xB300;',muscles:'&#xBCF5;&#xC0AC;&#xADFC;, &#xCF54;&#xC5B4;',bg:'#e3f2fd'},
  {name:'&#xC2A4;&#xCFFC;&#xD2B8;',icon:'&#x1F3CB;&#xFE0F;',sets:'3&#xC138;&#xD2B8; x 15&#xD68C;',desc:'&#xD558;&#xCCB4; &#xC548;&#xC815;&#xC131;&#xACFC; &#xD30C;&#xC6CC;. &#xC560;&#xB4DC;&#xB808;&#xC2A4; &#xC2DC; &#xD558;&#xCCB4; &#xC548;&#xC815;',muscles:'&#xB300;&#xD1F4;&#xC0AC;&#xB450;&#xADFC;, &#xB465;&#xADFC;',bg:'#fff3e0'},
  {name:'&#xD50C;&#xB7AD;&#xD06C;',icon:'&#x1F4AA;',sets:'3&#xC138;&#xD2B8; x 30&#xCD08;',desc:'&#xCF54;&#xC5B4; &#xADFC;&#xB825; &#xAC15;&#xD654;. &#xC2A4;&#xC719; &#xC548;&#xC815;&#xC131;&#xC758; &#xD575;&#xC2EC;',muscles:'&#xBCF5;&#xC9C1;&#xADFC;, &#xCF54;&#xC5B4; &#xC804;&#xCCB4;',bg:'#f3e5f5'},
  {name:'&#xC5B4;&#xAE68; &#xC2A4;&#xD2B8;&#xB808;&#xCE6D;',icon:'&#x1F9D8;&#x200D;&#x2642;&#xFE0F;',sets:'3&#xC138;&#xD2B8; x 20&#xCD08;',desc:'&#xC5B4;&#xAE68; &#xC720;&#xC5F0;&#xC131; &#xBC0F; &#xBD80;&#xC0C1; &#xBC29;&#xC9C0;',muscles:'&#xD68C;&#xC804;&#xADFC;&#xAC1C;, &#xC0BC;&#xAC01;&#xADFC;',bg:'#e8f5e9'},
  {name:'&#xB7F0;&#xC9C0;',icon:'&#x1F3C3;',sets:'3&#xC138;&#xD2B8; x 12&#xD68C; (&#xC591;&#xCABD;)',desc:'&#xD558;&#xCCB4; &#xADE0;&#xD615;&#xACFC; &#xC720;&#xC5F0;&#xC131;. &#xACBD;&#xC0AC; &#xC704; &#xC548;&#xC815;&#xAC10;',muscles:'&#xB300;&#xD1F4;&#xC0AC;&#xB450;&#xADFC;, &#xACE0;&#xAD00;&#xC808;',bg:'#e3f2fd'},
  {name:'&#xBC34;&#xB4DC; &#xD480;&#xC5B4;&#xD30C;&#xD2B8;',icon:'&#x1F4CF;',sets:'3&#xC138;&#xD2B8; x 10&#xD68C;',desc:'&#xC800;&#xD56D; &#xBC34;&#xB4DC;&#xB85C; &#xD68C;&#xC804;&#xB825; + &#xC800;&#xD56D; &#xD6C8;&#xB828;',muscles:'&#xC804;&#xC2E0; &#xD68C;&#xC804; &#xADFC;&#xC721;',bg:'#fff3e0'},
  {name:'&#xD574;&#xBA38;&#xC2A4;&#xD2B8;&#xB9C1; &#xCEEC;',icon:'&#x1F9D8;&#x200D;&#x2640;&#xFE0F;',sets:'3&#xC138;&#xD2B8; x 15&#xD68C;',desc:'&#xD587;&#xC2A4;&#xD2B8;&#xB9C1; &#xC720;&#xC5F0;&#xC131; &#xD5A5;&#xC0C1;. &#xBC31;&#xC2A4;&#xC719; &#xAC01;&#xB3C4; &#xD5A5;&#xC0C1;',muscles:'&#xD587;&#xC2A4;&#xD2B8;&#xB9C1;, &#xC885;&#xC544;&#xB9AC;',bg:'#f3e5f5'},
  {name:'&#xB370;&#xB4DC;&#xBC84;&#xADF8;',icon:'&#x1F41B;',sets:'3&#xC138;&#xD2B8; x 10&#xD68C;',desc:'&#xB4F1; &#xADFC;&#xC721; &#xAC15;&#xD654;. &#xB2E4;&#xC6B4;&#xC2A4;&#xC719; &#xD30C;&#xC6CC; &#xC5C5;',muscles:'&#xD65C;&#xBC30;&#xADFC;, &#xC2B9;&#xBAA8;&#xADFC;',bg:'#e8f5e9'},
  {name:'&#xCE74;&#xD504; &#xB808;&#xC774;&#xC988;',icon:'&#x1F9B6;',sets:'3&#xC138;&#xD2B8; x 20&#xD68C;',desc:'&#xC885;&#xC544;&#xB9AC; &#xADFC;&#xB825;. 18&#xD640; &#xAC78;&#xAE30; &#xC9C0;&#xAD6C;&#xB825;',muscles:'&#xBE44;&#xBCF5;&#xADFC;, &#xAC00;&#xC790;&#xBBF8;&#xADFC;',bg:'#e3f2fd'},
  {name:'&#xBC84;&#xB4DC;&#xB3C5;',icon:'&#x1F426;',sets:'3&#xC138;&#xD2B8; x 12&#xD68C; (&#xC591;&#xCABD;)',desc:'&#xADE0;&#xD615;&#xAC10;&#xACFC; &#xC548;&#xC815;&#xC131;. &#xD55C;&#xBC1C; &#xBC38;&#xB7F0;&#xC2A4;',muscles:'&#xC804;&#xC2E0; &#xADE0;&#xD615;, &#xCF54;&#xC5B4;',bg:'#fff3e0'},
  {name:'&#xB125; &#xC2A4;&#xD2B8;&#xB808;&#xCE6D;',icon:'&#x1F64F;',sets:'3&#xC138;&#xD2B8; x 15&#xCD08; (&#xAC01; &#xBC29;&#xD5A5;)',desc:'&#xBAA9; &#xC720;&#xC5F0;&#xC131; &#xBC0F; &#xBD80;&#xC0C1; &#xBC29;&#xC9C0;. &#xD5E4;&#xB4DC;&#xC5C5; &#xC720;&#xC9C0;',muscles:'&#xBAA9; &#xC8FC;&#xBCC0;&#xADFC;, &#xC2B9;&#xBAA8;&#xADFC;',bg:'#f3e5f5'}
];

function v21OpenFitness(){
  var ov = document.getElementById('v21FitOv');
  if(!ov){
    ov = document.createElement('div');
    ov.id = 'v21FitOv';
    ov.className = 'v21-overlay';
    ov.innerHTML = '<div class="v21-modal" id="v21FitModal"></div>';
    ov.addEventListener('click', function(e){ if(e.target===ov) ov.classList.remove('active'); });
    document.body.appendChild(ov);
  }
  v21RenderFitness();
  ov.classList.add('active');
  v21PlaySFX('fitness_start');
}
window.v21OpenFitness = v21OpenFitness;

function v21RenderFitness(){
  var m = document.getElementById('v21FitModal');
  var done = JSON.parse(localStorage.getItem('sg_fitness_done') || '{}');
  var today = new Date().toISOString().slice(0,10);
  var todayDone = done[today] || [];
  var total = V21_FITNESS.length;
  var completed = todayDone.length;

  var h = '<div class="v21-hdr"><h2><span class="v21i">&#x1F4AA;</span> &#xACE8;&#xD504; &#xD53C;&#xD2B8;&#xB2C8;&#xC2A4;</h2><button class="v21-x" onclick="document.getElementById(\'v21FitOv\').classList.remove(\'active\')">&times;</button></div>';
  h += '<div style="margin-bottom:16px"><div style="display:flex;justify-content:space-between;align-items:center"><span style="font-size:13px;font-weight:700">&#xC624;&#xB298; ' + completed + '/' + total + ' &#xC644;&#xB8CC;</span>';
  h += '<button class="v21-btn v21-btn-secondary v21-btn-sm" onclick="v21ResetFitness()">&#x1F504; &#xCD08;&#xAE30;&#xD654;</button></div>';
  h += '<div class="v21-progress"><div class="v21-progress-fill" style="width:' + Math.round(completed/total*100) + '%;background:linear-gradient(90deg,#ff6b35,#ff9f43)"></div></div></div>';

  V21_FITNESS.forEach(function(f, idx){
    var isDone = todayDone.indexOf(idx) !== -1;
    h += '<div class="v21-fitness-item" style="' + (isDone?'opacity:.5;':'') + 'background:' + f.bg + '">';
    h += '<div class="v21-fitness-icon" style="background:rgba(0,0,0,.08);font-size:28px">' + f.icon + '</div>';
    h += '<div class="v21-fitness-info"><div class="v21-fitness-name">' + f.name + '</div>';
    h += '<div class="v21-fitness-desc">' + f.desc + '</div>';
    h += '<div class="v21-fitness-sets">' + f.sets + ' | &#xD0C0;&#xAC9F;: ' + f.muscles + '</div></div>';
    h += '<button class="v21-btn ' + (isDone?'v21-btn-secondary':'v21-btn-primary') + ' v21-btn-sm" onclick="v21ToggleFitness(' + idx + ')">' + (isDone?'&#x2714;':'&#x25B6;') + '</button>';
    h += '</div>';
  });

  m.innerHTML = h;
}

function v21ToggleFitness(idx){
  var done = JSON.parse(localStorage.getItem('sg_fitness_done') || '{}');
  var today = new Date().toISOString().slice(0,10);
  if(!done[today]) done[today] = [];
  var pos = done[today].indexOf(idx);
  if(pos === -1) done[today].push(idx);
  else done[today].splice(pos, 1);
  localStorage.setItem('sg_fitness_done', JSON.stringify(done));
  v21PlaySFX('fitness_start');
  v21RenderFitness();
  v21CheckAchievements21();
}
window.v21ToggleFitness = v21ToggleFitness;

function v21ResetFitness(){
  var done = JSON.parse(localStorage.getItem('sg_fitness_done') || '{}');
  var today = new Date().toISOString().slice(0,10);
  done[today] = [];
  localStorage.setItem('sg_fitness_done', JSON.stringify(done));
  v21RenderFitness();
}
window.v21ResetFitness = v21ResetFitness;

// ===== 7. PACE OF PLAY TRACKER (라운드 타임 트래커) =====
var v21PaceState = {
  running: false,
  startTime: 0,
  elapsed: 0,
  holeStart: 0,
  holeTimes: [],
  currentHole: 1,
  intervalId: null
};

function v21OpenPace(){
  var ov = document.getElementById('v21PaceOv');
  if(!ov){
    ov = document.createElement('div');
    ov.id = 'v21PaceOv';
    ov.className = 'v21-overlay';
    ov.innerHTML = '<div class="v21-modal" id="v21PaceModal"></div>';
    ov.addEventListener('click', function(e){ if(e.target===ov) ov.classList.remove('active'); });
    document.body.appendChild(ov);
  }
  v21RenderPace();
  ov.classList.add('active');
  v21PlaySFX('pace_tick');
}
window.v21OpenPace = v21OpenPace;

function v21FormatTime(ms){
  var sec = Math.floor(ms/1000);
  var h = Math.floor(sec/3600);
  var m = Math.floor((sec%3600)/60);
  var s = sec%60;
  return (h>0?h+'h ':'') + (m<10?'0':'') + m + ':' + (s<10?'0':'') + s;
}

function v21RenderPace(){
  var m = document.getElementById('v21PaceModal');
  var s = v21PaceState;
  var elapsed = s.running ? (Date.now() - s.startTime) : s.elapsed;
  var totalTarget = 4*60*60*1000;
  var pct = Math.min(100, Math.round(elapsed/totalTarget*100));
  var paceStatus = elapsed < totalTarget * (s.currentHole/18) ? '&#x2705; &#xC591;&#xD638;' : '&#x26A0;&#xFE0F; &#xB290;&#xB9BC;';

  var h = '<div class="v21-hdr"><h2><span class="v21i">&#x23F1;&#xFE0F;</span> &#xD398;&#xC774;&#xC2A4; &#xD2B8;&#xB798;&#xCEE4;</h2><button class="v21-x" onclick="v21StopPaceTimer();document.getElementById(\'v21PaceOv\').classList.remove(\'active\')">&times;</button></div>';

  var r = 60;
  var circ = 2 * Math.PI * r;
  var offset = circ - (pct/100) * circ;
  var color = pct < 60 ? '#2e9e4f' : (pct < 80 ? '#ff9f43' : '#ff4757');

  h += '<div style="text-align:center;margin-bottom:18px">';
  h += '<div class="v21-pace-ring"><svg viewBox="0 0 140 140"><circle cx="70" cy="70" r="' + r + '" fill="none" stroke="var(--border)" stroke-width="10"/>';
  h += '<circle cx="70" cy="70" r="' + r + '" fill="none" stroke="' + color + '" stroke-width="10" stroke-dasharray="' + circ + '" stroke-dashoffset="' + offset + '" stroke-linecap="round" transform="rotate(-90 70 70)"/></svg></div>';
  h += '<div class="v21-pace-time">' + v21FormatTime(elapsed) + '</div>';
  h += '<div class="v21-pace-label">&#xBAA9;&#xD45C;: 4&#xC2DC;&#xAC04; | &#xD604;&#xC7AC; &#xD640;: ' + s.currentHole + '/18 | ' + paceStatus + '</div></div>';

  h += '<div style="display:flex;gap:8px;justify-content:center;margin-bottom:18px;flex-wrap:wrap">';
  if(!s.running){
    h += '<button class="v21-btn v21-btn-primary" onclick="v21StartPace()">&#x25B6;&#xFE0F; &#xC2DC;&#xC791;</button>';
  } else {
    h += '<button class="v21-btn v21-btn-danger" onclick="v21StopPaceTimer()">&#x23F9;&#xFE0F; &#xC815;&#xC9C0;</button>';
    h += '<button class="v21-btn v21-btn-primary" onclick="v21NextHole()">&#x2B07;&#xFE0F; &#xB2E4;&#xC74C; &#xD640;</button>';
  }
  h += '<button class="v21-btn v21-btn-secondary" onclick="v21ResetPace()">&#x1F504; &#xCD08;&#xAE30;&#xD654;</button></div>';

  if(s.holeTimes.length > 0){
    h += '<h3 style="font-size:14px;font-weight:800;margin-bottom:10px">&#xD640;&#xBCC4; &#xC2DC;&#xAC04;</h3>';
    var avgTarget = totalTarget/18;
    s.holeTimes.forEach(function(t, idx){
      var isPace = t <= avgTarget * 1.1;
      h += '<div class="v21-stat-row">';
      h += '<span style="font-weight:700">Hole ' + (idx+1) + '</span>';
      h += '<span style="color:' + (isPace?'var(--primary)':'#ff4757') + ';font-weight:700">' + v21FormatTime(t) + '</span></div>';
    });
  }

  m.innerHTML = h;
}

function v21StartPace(){
  var s = v21PaceState;
  s.running = true;
  s.startTime = Date.now() - s.elapsed;
  s.holeStart = Date.now();
  s.intervalId = setInterval(function(){ v21RenderPace(); }, 1000);
  v21PlaySFX('pace_tick');
  v21RenderPace();
}
window.v21StartPace = v21StartPace;

function v21StopPaceTimer(){
  var s = v21PaceState;
  if(s.running){
    s.running = false;
    s.elapsed = Date.now() - s.startTime;
    if(s.intervalId){ clearInterval(s.intervalId); s.intervalId = null; }
  }
  v21RenderPace();
}
window.v21StopPaceTimer = v21StopPaceTimer;

function v21NextHole(){
  var s = v21PaceState;
  if(!s.running) return;
  var holeTime = Date.now() - s.holeStart;
  s.holeTimes.push(holeTime);
  s.currentHole = Math.min(18, s.currentHole + 1);
  s.holeStart = Date.now();
  v21PlaySFX('pace_tick');
  if(s.currentHole > 18){
    v21StopPaceTimer();
    v21PlaySFX('achievement_v21');
    if(typeof showToast === 'function') showToast('18&#xD640; &#xB77C;&#xC6B4;&#xB4DC; &#xC644;&#xB8CC;!', 'success');
  }
  v21RenderPace();
  v21CheckAchievements21();
}
window.v21NextHole = v21NextHole;

function v21ResetPace(){
  v21StopPaceTimer();
  v21PaceState.elapsed = 0;
  v21PaceState.holeTimes = [];
  v21PaceState.currentHole = 1;
  v21RenderPace();
}
window.v21ResetPace = v21ResetPace;

// ===== 8. GOLF IQ v6 QUIZ =====
var V21_QUIZ = [
  {q:'&#xD37C;&#xD305;&#xC5D0;&#xC11C; &quot;&#xC5D0;&#xC784;&#xD3EC;&#xC778;&#xD2B8; &#xB9AC;&#xB529;&quot;&#xC740; &#xBB34;&#xC5C7;&#xC744; &#xBD84;&#xC11D;&#xD558;&#xB294; &#xAE30;&#xBC95;&#xC778;&#xAC00;?',o:['&#xADF8;&#xB9B0;&#xC758; &#xACBD;&#xC0AC;&#xC640; &#xBE0C;&#xB808;&#xC774;&#xD06C;','&#xBC14;&#xB78C;&#xC758; &#xBC29;&#xD5A5;','&#xBCFC;&#xC758; &#xC2A4;&#xD540;&#xB7C9;','&#xADF8;&#xB9B0;&#xC758; &#xC2B5;&#xB3C4;'],a:0},
  {q:'&#xACE8;&#xD504;&#xC5D0;&#xC11C; &quot;&#xB808;&#xC774; &#xC5C5;&quot;&#xC774;&#xB780; &#xBB34;&#xC5C7;&#xC744; &#xC758;&#xBBF8;&#xD558;&#xB294;&#xAC00;?',o:['&#xBCFC;&#xC774; &#xB54C;&#xC778; &#xC704;&#xCE58;&#xC5D0;&#xC11C; &#xCE58;&#xB294; &#xAC83;','&#xBCFC;&#xC744; &#xC67C;&#xC190;&#xC73C;&#xB85C; &#xCE58;&#xB294; &#xAC83;','&#xBCFC;&#xC744; &#xB192;&#xC774; &#xB744;&#xC6B0;&#xB294; &#xAC83;','&#xBCFC;&#xC744; &#xB4DC;&#xB86D; &#xAD6C;&#xC5ED;&#xC5D0;&#xC11C; &#xCE58;&#xB294; &#xAC83;'],a:0},
  {q:'PGA &#xD22C;&#xC5B4;&#xC5D0;&#xC11C; &#xD3C9;&#xADE0; &#xB4DC;&#xB77C;&#xC774;&#xBE44;&#xBC84; &#xBE44;&#xAC70;&#xB9AC;&#xB294; &#xC57D; &#xC5BC;&#xB9C8;&#xC778;&#xAC00;?',o:['230m','260m','295m','320m'],a:2},
  {q:'&quot;&#xD504;&#xB9AC;&#xC0F7; &#xB8E8;&#xD2F4;&quot;&#xC758; &#xC8FC;&#xC694; &#xBAA9;&#xC801;&#xC740;?',o:['&#xC2A4;&#xC719; &#xC18D;&#xB3C4; &#xD5A5;&#xC0C1;','&#xC77C;&#xAD00;&#xB41C; &#xC0F7; &#xC804; &#xB8E8;&#xD2F4;&#xC73C;&#xB85C; &#xBA58;&#xD0C8; &#xC548;&#xC815;','&#xACBD;&#xC7C1; &#xC0C1;&#xB300; &#xC704;&#xD611;','&#xBCFC;&#xC758; &#xC2A4;&#xD540;&#xB7C9; &#xC870;&#xC808;'],a:1},
  {q:'&#xACE8;&#xD504;&#xC5D0;&#xC11C; &quot;&#xC2A4;&#xD2B8;&#xB85C;&#xD06C; &#xAC8C;&#xC778;&#xB4DC;&quot; &#xBD84;&#xC11D;&#xC758; &#xAE30;&#xC900;&#xC740;?',o:['&#xD544;&#xB4DC; &#xD3C9;&#xADE0; &#xB300;&#xBE44; &#xAC1C;&#xC778; &#xC131;&#xACFC;','&#xD578;&#xB514;&#xCE61; &#xB300;&#xBE44; &#xC2E4;&#xC81C; &#xD0C0;&#xC218;','&#xBCFC; &#xC2A4;&#xD53C;&#xB4DC; &#xB300;&#xBE44; &#xBE44;&#xAC70;&#xB9AC;','&#xD074;&#xB7FD; &#xBE44;&#xC6A9; &#xB300;&#xBE44; &#xC131;&#xACFC;'],a:0},
  {q:'&#xACE8;&#xD504;&#xC5D0;&#xC11C; &quot;&#xCE68;&#xBB35;&#xC758; &#xB8F0;&quot;&#xC740; &#xBB34;&#xC5C7;&#xC778;&#xAC00;?',o:['&#xC0F7; &#xC2DC; &#xC18C;&#xB9AC;&#xB97C; &#xB0B4;&#xBA74; &#xC548; &#xB428;','&#xB2E4;&#xB978; &#xD50C;&#xB808;&#xC774;&#xC5B4; &#xC2A4;&#xC719; &#xC2DC; &#xC870;&#xC6A9;&#xD788;','&#xBC14;&#xB78C;&#xC774; &#xBD80;&#xB294; &#xBC29;&#xD5A5;&#xC73C;&#xB85C; &#xCC58;','&#xD37C;&#xD305; &#xC2DC; &#xB9D0;&#xD558;&#xC9C0; &#xC54A;&#xAE30;'],a:1},
  {q:'&#xACE8;&#xD504; &#xD074;&#xB7FD;&#xC758; &quot;&#xBC14;&#xC6B4;&#xC2A4; &#xAC01;&#xB3C4;&quot;&#xB780;?',o:['&#xBCFC;&#xC774; &#xD074;&#xB7FD;&#xD398;&#xC774;&#xC2A4;&#xC5D0;&#xC11C; &#xBC18;&#xC0AC;&#xB418;&#xB294; &#xAC01;&#xB3C4;','&#xBCFC;&#xC774; &#xD398;&#xC5B4;&#xC6E8;&#xC774;&#xC5D0;&#xC11C; &#xD2C0;&#xB294; &#xAC01;&#xB3C4;','&#xC2A4;&#xC719; &#xC2DC; &#xD074;&#xB7FD;&#xC758; &#xD68C;&#xC804;&#xAC01;','&#xD074;&#xB7FD;&#xD5E4;&#xB4DC;&#xC758; &#xAE30;&#xC6B8;&#xAE30;'],a:0},
  {q:'&quot;&#xBC84;&#xB514; &#xD37C;&#xD305;&quot;&#xC5D0;&#xC11C; &#xAC00;&#xC7A5; &#xC911;&#xC694;&#xD55C; &#xC694;&#xC18C;&#xB294;?',o:['&#xD30C;&#xC6CC;','&#xBC29;&#xD5A5; &#xC815;&#xD655;&#xB3C4;','&#xAC70;&#xB9AC; &#xC870;&#xC808;','&#xBC31;&#xC2A4;&#xC719; &#xD06C;&#xAE30;'],a:2},
  {q:'&#xACE8;&#xD504;&#xC5D0;&#xC11C; &quot;&#xD2F0;&#xC5C5; &#xD558;&#xC774;&#xD2B8;&quot;&#xB780;?',o:['&#xD2F0;&#xC5C5; &#xC704;&#xCE58;&#xC758; &#xB192;&#xC774;','&#xD2F0; &#xBC15;&#xC2A4;&#xC758; &#xC0C9;&#xC0C1;','&#xBCFC;&#xC744; &#xB192;&#xC774; &#xCE58;&#xB294; &#xAE30;&#xC220;','&#xD2F0; &#xD0C0;&#xC784; &#xC608;&#xC57D; &#xAE08;&#xC561;'],a:0},
  {q:'&#xACE8;&#xD504;&#xC5D0;&#xC11C; &quot;&#xB808;&#xC774;&#xD2B8; &#xD788;&#xD2B8;&quot;&#xB294; &#xBB34;&#xC5C7;&#xC744; &#xC758;&#xBBF8;&#xD558;&#xB294;&#xAC00;?',o:['&#xBCFC;&#xC774; &#xC624;&#xB978;&#xCABD;&#xC73C;&#xB85C; &#xD718;&#xC5B4;&#xC9C0;&#xB294; &#xC0F7;','&#xBCFC;&#xC774; &#xB2A6;&#xAC8C; &#xCD9C;&#xBC1C;&#xD558;&#xB294; &#xC0F7;','&#xD074;&#xB7FD;&#xD398;&#xC774;&#xC2A4;&#xC758; &#xB4A4;&#xCABD;(&#xD790;)&#xC5D0; &#xBCFC;&#xC774; &#xB9DE;&#xB294; &#xAC83;','&#xBCFC;&#xC774; &#xB290;&#xB9AC;&#xAC8C; &#xAD6C;&#xB974;&#xB294; &#xAC83;'],a:2},
  {q:'&#xACE8;&#xD504; &#xC2A4;&#xC719;&#xC5D0;&#xC11C; &quot;X-&#xD329;&#xD130;&quot;&#xB780;?',o:['&#xC784;&#xD329;&#xD2B8; &#xC2DC; &#xD314;&#xC774; &#xAD50;&#xCC28;&#xD558;&#xB294; &#xC9C0;&#xC810;','&#xBCFC;&#xC774; &#xC5B4;&#xB514;&#xC11C; &#xACBD;&#xB85C;&#xB97C; &#xBC14;&#xAFB8;&#xB294; &#xC9C0;&#xC810;','&#xADF8;&#xB9B0; &#xC704;&#xC758; &#xD0C0;&#xAC9F; &#xD45C;&#xC2DC;','&#xD074;&#xB7FD;&#xC758; &#xBB34;&#xAC8C; &#xBC38;&#xB7F0;&#xC2A4; &#xD3EC;&#xC778;&#xD2B8;'],a:0},
  {q:'&#xACE8;&#xD504;&#xC5D0;&#xC11C; &quot;&#xD50C;&#xB7FD; &#xB77C;&#xC774;&quot;&#xB294; &#xC5B4;&#xB5A4; &#xC0C1;&#xD669;&#xC744; &#xC758;&#xBBF8;&#xD558;&#xB294;&#xAC00;?',o:['&#xBCFC;&#xC774; &#xC798;&#xB514; &#xD480;&#xC5D0; &#xBB3B;&#xD788;&#xB294; &#xAC83;','&#xBCFC;&#xC774; &#xADF8;&#xB9B0; &#xC704;&#xC5D0; &#xC548;&#xCC29;&#xD558;&#xC9C0; &#xC54A;&#xB294; &#xAC83;','&#xBCFC;&#xC774; &#xC544;&#xC8FC; &#xC88B;&#xC740; &#xC704;&#xCE58;&#xC5D0; &#xB193;&#xC774;&#xB294; &#xAC83;','&#xBCFC;&#xC774; &#xD398;&#xC5B4;&#xC6E8;&#xC774;&#xC5D0; &#xC548;&#xCC29;&#xD558;&#xB294; &#xAC83;'],a:2},
  {q:'&#xACE8;&#xD504;&#xC5D0;&#xC11C; &quot;&#xCF54;&#xC2A4; &#xB808;&#xC774;&#xD305;&quot;&#xACFC; &quot;&#xC2AC;&#xB85C;&#xD504;&quot;&#xC758; &#xCC28;&#xC774;&#xB294;?',o:['&#xB808;&#xC774;&#xD305;&#xC740; &#xC2A4;&#xD06C;&#xB798;&#xCE58; &#xACE8;&#xD37C;, &#xC2AC;&#xB85C;&#xD504;&#xB294; &#xBCF4;&#xAE30; &#xACE8;&#xD37C; &#xAE30;&#xC900;','&#xB808;&#xC774;&#xD305;&#xC740; &#xB09C;&#xC774;&#xB3C4;, &#xC2AC;&#xB85C;&#xD504;&#xB294; &#xACBD;&#xC0AC;&#xB3C4;','&#xB808;&#xC774;&#xD305;&#xC740; &#xAE38;&#xC774;, &#xC2AC;&#xB85C;&#xD504;&#xB294; &#xB108;&#xBE44;','&#xB808;&#xC774;&#xD305;&#xC740; &#xADF8;&#xB9B0; &#xC18D;&#xB3C4;, &#xC2AC;&#xB85C;&#xD504;&#xB294; &#xB7EC;&#xD504; &#xAE4A;&#xC774;'],a:0},
  {q:'&#xACE8;&#xD504;&#xC5D0;&#xC11C; &quot;&#xCE5C;&#xD658;&#xACBD; &#xBCF4;&#xD638; &#xAD6C;&#xC5ED;&quot;(ESA)&#xC740;?',o:['&#xD504;&#xB85C;&#xB9CC; &#xC0AC;&#xC6A9;&#xD558;&#xB294; &#xD2F0; &#xBC15;&#xC2A4;','&#xBCFC;&#xC744; &#xCE58;&#xBA74; &#xC548; &#xB418;&#xB294; &#xC790;&#xC5F0;&#xBCF4;&#xD638; &#xAD6C;&#xC5ED;','&#xCE74;&#xD2B8; &#xC804;&#xC6A9; &#xB3C4;&#xB85C;','&#xC6B0;&#xCC9C; &#xC608;&#xC57D; &#xAD6C;&#xC5ED;'],a:1},
  {q:'&quot;&#xBCFC;&#xB9C8;&#xD06C; &#xB77C;&#xC778;&quot;&#xC740; &#xC5B4;&#xB5A4; &#xC6A9;&#xB3C4;&#xC778;&#xAC00;?',o:['&#xBCFC;&#xC758; &#xBC29;&#xD5A5;&#xC744; &#xC815;&#xB82C;&#xD558;&#xAE30; &#xC704;&#xD55C; &#xD45C;&#xC2DC;&#xC120;','&#xBCFC;&#xC758; &#xBE0C;&#xB79C;&#xB4DC; &#xB85C;&#xACE0;','&#xADF8;&#xB9B0; &#xC704;&#xC758; &#xC7C1;&#xB514; &#xD45C;&#xC2DC;','&#xD2F0; &#xBC15;&#xC2A4; &#xAD6C;&#xBD84;&#xC120;'],a:0}
];

var v21QuizState = { current: 0, score: 0, answered: false, history: [] };

function v21OpenQuiz(){
  var ov = document.getElementById('v21QuizOv');
  if(!ov){
    ov = document.createElement('div');
    ov.id = 'v21QuizOv';
    ov.className = 'v21-overlay';
    ov.innerHTML = '<div class="v21-modal" id="v21QuizModal"></div>';
    ov.addEventListener('click', function(e){ if(e.target===ov) ov.classList.remove('active'); });
    document.body.appendChild(ov);
  }
  v21QuizState = { current: 0, score: 0, answered: false, history: [] };
  v21RenderQuiz();
  ov.classList.add('active');
}
window.v21OpenQuiz = v21OpenQuiz;

function v21RenderQuiz(){
  var m = document.getElementById('v21QuizModal');
  var s = v21QuizState;
  var h = '<div class="v21-hdr"><h2><span class="v21i">&#x1F9E0;</span> Golf IQ v6</h2><button class="v21-x" onclick="document.getElementById(\'v21QuizOv\').classList.remove(\'active\')">&times;</button></div>';

  if(s.current >= V21_QUIZ.length){
    var grade = s.score >= 14 ? 'S' : (s.score >= 12 ? 'A' : (s.score >= 10 ? 'B' : (s.score >= 7 ? 'C' : 'D')));
    var gradeColors = {S:'#ffd700',A:'#2e9e4f',B:'#1565c0',C:'#ff9f43',D:'#ff4757'};
    h += '<div style="text-align:center;padding:30px 0">';
    h += '<div style="font-size:60px;font-weight:900;color:' + gradeColors[grade] + '">' + grade + '</div>';
    h += '<div style="font-size:24px;font-weight:800;margin:10px 0">' + s.score + '/' + V21_QUIZ.length + ' &#xC815;&#xB2F5;</div>';
    h += '<div style="font-size:14px;color:var(--text-muted);margin-bottom:20px">';
    if(grade==='S') h+='&#xD504;&#xB85C; &#xC218;&#xC900;&#xC758; &#xACE8;&#xD504; &#xC9C0;&#xC2DD;!';
    else if(grade==='A') h+='&#xC6B0;&#xC218;&#xD55C; &#xACE8;&#xD504; &#xC9C0;&#xC2DD;&#xC785;&#xB2C8;&#xB2E4;!';
    else if(grade==='B') h+='&#xC591;&#xD638;&#xD55C; &#xC218;&#xC900;. &#xC870;&#xAE08; &#xB354; &#xD559;&#xC2B5;&#xD574;&#xBCF4;&#xC138;&#xC694;.';
    else if(grade==='C') h+='&#xAE30;&#xBCF8;&#xAE30;&#xB97C; &#xB354; &#xC775;&#xD600;&#xBCF4;&#xC138;&#xC694;.';
    else h+='&#xACE8;&#xD504; &#xC9C0;&#xC2DD;&#xC744; &#xB354; &#xC313;&#xC544;&#xBCF4;&#xC138;&#xC694;!';
    h += '</div>';
    h += '<button class="v21-btn v21-btn-primary" onclick="v21QuizState.current=0;v21QuizState.score=0;v21QuizState.answered=false;v21QuizState.history=[];v21RenderQuiz()">&#x1F504; &#xB2E4;&#xC2DC; &#xD480;&#xAE30;</button></div>';
    v21SaveQuizResult(s.score);
    m.innerHTML = h;
    return;
  }

  var q = V21_QUIZ[s.current];
  h += '<div style="margin-bottom:6px;font-size:12px;color:var(--text-muted)">&#xBB38;&#xC81C; ' + (s.current+1) + '/' + V21_QUIZ.length + ' | &#xC810;&#xC218;: ' + s.score + '</div>';
  h += '<div class="v21-progress"><div class="v21-progress-fill" style="width:' + Math.round((s.current/V21_QUIZ.length)*100) + '%;background:linear-gradient(90deg,var(--primary),#2e9e4f)"></div></div>';
  h += '<div style="font-size:16px;font-weight:700;margin:18px 0;line-height:1.6">' + q.q + '</div>';

  q.o.forEach(function(opt, idx){
    var cls = '';
    if(s.answered){
      if(idx === q.a) cls = ' correct';
      else if(s.history[s.current] === idx && idx !== q.a) cls = ' wrong';
    }
    h += '<div class="v21-quiz-option' + cls + '" onclick="v21AnswerQuiz(' + idx + ')">' + (idx+1) + '. ' + opt + '</div>';
  });

  if(s.answered){
    h += '<div style="margin-top:14px;text-align:center"><button class="v21-btn v21-btn-primary" onclick="v21NextQuiz()">&#xB2E4;&#xC74C; &#xBB38;&#xC81C; &#x27A1;&#xFE0F;</button></div>';
  }

  m.innerHTML = h;
}

function v21AnswerQuiz(idx){
  var s = v21QuizState;
  if(s.answered) return;
  s.answered = true;
  s.history[s.current] = idx;
  if(idx === V21_QUIZ[s.current].a){
    s.score++;
    v21PlaySFX('quiz_correct_v6');
  } else {
    v21PlaySFX('quiz_wrong_v6');
  }
  v21RenderQuiz();
}
window.v21AnswerQuiz = v21AnswerQuiz;

function v21NextQuiz(){
  v21QuizState.current++;
  v21QuizState.answered = false;
  v21RenderQuiz();
}
window.v21NextQuiz = v21NextQuiz;

function v21SaveQuizResult(score){
  var results = JSON.parse(localStorage.getItem('sg_quiz_v6') || '[]');
  results.unshift({date:new Date().toISOString().slice(0,10), score:score, total:V21_QUIZ.length});
  if(results.length > 30) results = results.slice(0,30);
  localStorage.setItem('sg_quiz_v6', JSON.stringify(results));
  v21CheckAchievements21();
}

// ===== 9. ACHIEVEMENTS (업적 12개 추가: 80→92) =====
var V21_ACHIEVEMENTS = [
  {id:'v21_putt_10',name:'&#xD37C;&#xD305; &#xC5F0;&#xC2B5;&#xC0DD;',desc:'&#xD37C;&#xD305; &#xC2DC;&#xBBAC;&#xB808;&#xC774;&#xD130; 10&#xD68C; &#xC2DC;&#xB3C4;',check:function(){var d=JSON.parse(localStorage.getItem('sg_putt_stats')||'{}');return(d.total||0)>=10;}},
  {id:'v21_putt_streak5',name:'&#xD37C;&#xD305; &#xB9C8;&#xC2A4;&#xD130;',desc:'&#xD37C;&#xD305; 5&#xC5F0;&#xC18D; &#xC131;&#xACF5;',check:function(){var d=JSON.parse(localStorage.getItem('sg_putt_stats')||'{}');return(d.best||0)>=5;}},
  {id:'v21_club_used',name:'&#xD074;&#xB7FD; &#xC5B4;&#xB4DC;&#xBC14;&#xC774;&#xC800;',desc:'&#xD074;&#xB7FD; &#xCD94;&#xCC9C; AI &#xC0AC;&#xC6A9;',check:function(){return!!localStorage.getItem('sg_club_conditions');}},
  {id:'v21_checklist_all',name:'&#xCCB4;&#xD06C;&#xB9AC;&#xC2A4;&#xD2B8; &#xC644;&#xB8CC;',desc:'&#xC2A4;&#xC719; &#xCCB4;&#xD06C;&#xB9AC;&#xC2A4;&#xD2B8; 12&#xD56D;&#xBAA9; &#xC804;&#xBD80; &#xC644;&#xB8CC;',check:function(){var c=JSON.parse(localStorage.getItem('sg_swing_checklist')||'{}');return Object.keys(c).filter(function(k){return c[k];}).length>=12;}},
  {id:'v21_strategy_view',name:'&#xC804;&#xB7B5;&#xAC00;',desc:'&#xCF54;&#xC2A4; &#xB9E4;&#xB2C8;&#xC9C0;&#xBA3C;&#xD2B8; &#xC5F4;&#xB78C;',check:function(){return!!document.getElementById('v21StratOv');}},
  {id:'v21_gir_50',name:'GIR 50%+',desc:'GIR 50% &#xC774;&#xC0C1; &#xB2EC;&#xC131;',check:function(){var d=JSON.parse(localStorage.getItem('sg_gir_data')||'{}');var g=d.gir||[];var hit=g.filter(function(v){return v===1;}).length;return g.length>=18&&hit>=9;}},
  {id:'v21_fir_50',name:'FIR 50%+',desc:'FIR 50% &#xC774;&#xC0C1; &#xB2EC;&#xC131;',check:function(){var d=JSON.parse(localStorage.getItem('sg_gir_data')||'{}');var f=d.fir||[];var hit=f.filter(function(v){return v===1;}).length;return f.length>=14&&hit>=7;}},
  {id:'v21_fitness_all',name:'&#xD53C;&#xD2B8;&#xB2C8;&#xC2A4; &#xB2EC;&#xC778;',desc:'&#xD558;&#xB8E8; 12&#xAC00;&#xC9C0; &#xC6B4;&#xB3D9; &#xC644;&#xB8CC;',check:function(){var d=JSON.parse(localStorage.getItem('sg_fitness_done')||'{}');var t=new Date().toISOString().slice(0,10);return(d[t]||[]).length>=12;}},
  {id:'v21_pace_18',name:'18&#xD640; &#xC644;&#xC8FC;',desc:'&#xD398;&#xC774;&#xC2A4; &#xD2B8;&#xB798;&#xCEE4; 18&#xD640; &#xC644;&#xB8CC;',check:function(){return v21PaceState.holeTimes.length>=18;}},
  {id:'v21_pace_under4h',name:'&#xC2A4;&#xD53C;&#xB4DC; &#xB77C;&#xC6B4;&#xB354;',desc:'4&#xC2DC;&#xAC04; &#xC774;&#xB0B4; &#xB77C;&#xC6B4;&#xB4DC; &#xC644;&#xB8CC;',check:function(){if(v21PaceState.holeTimes.length<18)return false;var total=v21PaceState.holeTimes.reduce(function(a,b){return a+b;},0);return total<4*60*60*1000;}},
  {id:'v21_quiz_s',name:'Golf IQ S&#xB4F1;&#xAE09;',desc:'Golf IQ v6&#xC5D0;&#xC11C; S&#xB4F1;&#xAE09; &#xD68D;&#xB4DD;',check:function(){var r=JSON.parse(localStorage.getItem('sg_quiz_v6')||'[]');return r.some(function(x){return x.score>=14;});}},
  {id:'v21_all_rounder',name:'v21 &#xC62C;&#xB77C;&#xC6B4;&#xB354;',desc:'v21&#xC758; &#xBAA8;&#xB4E0; &#xAE30;&#xB2A5;&#xC744; 1&#xD68C; &#xC774;&#xC0C1; &#xC0AC;&#xC6A9;',check:function(){return!!localStorage.getItem('sg_putt_stats')&&!!localStorage.getItem('sg_club_conditions')&&!!localStorage.getItem('sg_swing_checklist')&&!!localStorage.getItem('sg_gir_data')&&!!localStorage.getItem('sg_fitness_done')&&v21PaceState.holeTimes.length>0&&(JSON.parse(localStorage.getItem('sg_quiz_v6')||'[]')).length>0;}}
];

function v21CheckAchievements21(){
  var unlocked = JSON.parse(localStorage.getItem('sg_achievements_v21') || '[]');
  V21_ACHIEVEMENTS.forEach(function(a){
    if(unlocked.indexOf(a.id) === -1){
      try {
        if(a.check()){
          unlocked.push(a.id);
          localStorage.setItem('sg_achievements_v21', JSON.stringify(unlocked));
          v21PlaySFX('achievement_v21');
          if(typeof showToast === 'function') showToast('&#x1F3C6; &#xC5C5;&#xC801; &#xD574;&#xAE08;: ' + a.name, 'success');
        }
      } catch(e){}
    }
  });
}

// ===== QUICK ACTION BUTTONS =====
function v21AddButtons(){
  var container = document.querySelector('.search-section') || document.querySelector('.results-section');
  if(!container) return;
  var existing = document.getElementById('v21QuickBar');
  if(existing) return;

  var bar = document.createElement('div');
  bar.id = 'v21QuickBar';
  bar.style.cssText = 'display:flex;gap:6px;flex-wrap:wrap;margin:10px 0;padding:0 0 8px';
  var btns = [
    {label:'&#x26F3; &#xD37C;&#xD305;',fn:'v21OpenPutt()'},
    {label:'&#x1F3AF; &#xD074;&#xB7FD;AI',fn:'v21OpenClubRec()'},
    {label:'&#x2705; &#xCCB4;&#xD06C;',fn:'v21OpenChecklist()'},
    {label:'&#x1F9E0; &#xC804;&#xB7B5;',fn:'v21OpenStrategy()'},
    {label:'&#x1F4CA; GIR',fn:'v21OpenGIR()'},
    {label:'&#x1F4AA; &#xD53C;&#xD2B8;&#xB2C8;&#xC2A4;',fn:'v21OpenFitness()'},
    {label:'&#x23F1;&#xFE0F; &#xD398;&#xC774;&#xC2A4;',fn:'v21OpenPace()'},
    {label:'&#x1F9E0; IQ v6',fn:'v21OpenQuiz()'}
  ];

  btns.forEach(function(b){
    var el = document.createElement('button');
    el.className = 'tag';
    el.innerHTML = b.label;
    el.setAttribute('onclick', b.fn);
    el.style.cssText = 'cursor:pointer;font-weight:700;font-size:11px;border:none;transition:.2s';
    bar.appendChild(el);
  });

  container.insertBefore(bar, container.children[1] || null);
}

// ===== KEYBOARD SHORTCUTS =====
document.addEventListener('keydown', function(e){
  var t = e.target.tagName;
  if(t === 'INPUT' || t === 'TEXTAREA' || t === 'SELECT') return;
  if(!e.shiftKey) return;
  switch(e.key){
    case 'P': v21OpenPutt(); break;
    case 'C': v21OpenClubRec(); break;
    case 'L': v21OpenChecklist(); break;
    case 'M': v21OpenStrategy(); break;
    case 'J': v21OpenGIR(); break;
    case 'W': v21OpenFitness(); break;
    case 'T': v21OpenPace(); break;
    case 'Q': v21OpenQuiz(); break;
  }
});

// ===== INIT =====
setTimeout(function(){
  v21AddButtons();
  v21CheckAchievements21();
}, 1500);

})();
