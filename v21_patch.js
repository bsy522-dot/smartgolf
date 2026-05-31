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
.v21-sg-bar{display:flex;align-items:center;gap:8px;margin:6px 0}
.v21-sg-label{font-size:11px;font-weight:700;width:100px;text-align:right}
.v21-sg-track{flex:1;height:22px;background:var(--border);border-radius:11px;position:relative;overflow:hidden}
.v21-sg-fill{height:100%;border-radius:11px;transition:width .6s;display:flex;align-items:center;justify-content:flex-end;padding-right:8px;font-size:10px;font-weight:800;color:#fff}
.v21-sg-positive{background:linear-gradient(135deg,#2e9e4f,#4caf50)}
.v21-sg-negative{background:linear-gradient(135deg,#ff4757,#ff6b81)}
.v21-share-canvas{width:100%;max-width:600px;margin:0 auto;display:block;border-radius:16px;box-shadow:0 4px 20px rgba(0,0,0,.15)}
.v21-putt-table{width:100%;border-collapse:collapse;font-size:12px}
.v21-putt-table th{background:var(--primary);color:#fff;padding:9px 6px;text-align:center;font-size:11px;font-weight:700}
.v21-putt-table td{padding:8px 6px;text-align:center;border-bottom:1px solid var(--border)}
.v21-putt-table input{width:40px;text-align:center;border:1.5px solid var(--border);border-radius:6px;padding:4px;font-size:12px;background:var(--bg);color:var(--text)}
.v21-putt-1{color:#2e9e4f;font-weight:800}
.v21-putt-3{color:#ff4757;font-weight:800}
.v21-compare-row{display:grid;grid-template-columns:1fr 80px 80px 80px;gap:8px;padding:10px 0;border-bottom:1px solid var(--border);align-items:center;font-size:13px}
.v21-compare-hdr{font-weight:800;color:var(--text-muted);font-size:11px}
.v21-delta-pos{color:#2e9e4f;font-weight:700}
.v21-delta-neg{color:#ff4757;font-weight:700}
.v21-booking-card{background:var(--bg);border-radius:16px;padding:18px;margin-bottom:10px;display:flex;gap:14px;align-items:center;transition:.25s}
.v21-booking-card:hover{transform:translateY(-2px);box-shadow:0 3px 14px rgba(26,122,58,.12)}
.v21-booking-icon{width:48px;height:48px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:22px;flex-shrink:0}
.v21-booking-info{flex:1}
.v21-booking-name{font-size:14px;font-weight:700;margin-bottom:2px}
.v21-booking-desc{font-size:11px;color:var(--text-muted)}
.v21-booking-go{padding:8px 16px;border:none;border-radius:10px;font-size:12px;font-weight:700;cursor:pointer;transition:.2s}
.v21-dict-item{padding:14px;background:var(--bg);border-radius:14px;margin-bottom:8px;cursor:pointer;transition:.25s}
.v21-dict-item:hover{border-color:var(--primary);transform:translateY(-1px)}
.v21-dict-term{font-size:14px;font-weight:800;color:var(--primary);margin-bottom:3px;display:flex;align-items:center;gap:8px}
.v21-dict-en{font-size:11px;color:var(--text-muted);font-weight:600}
.v21-dict-def{font-size:12px;color:var(--text-muted);line-height:1.7;display:none}
.v21-dict-item.open .v21-dict-def{display:block;margin-top:8px}
.v21-check-item{display:flex;gap:12px;align-items:center;padding:12px 16px;background:var(--bg);border-radius:14px;margin-bottom:8px;cursor:pointer;transition:.25s}
.v21-check-item.done{opacity:.6;text-decoration:line-through}
.v21-check-box{width:26px;height:26px;border:2px solid var(--border);border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:16px;flex-shrink:0;transition:.25s}
.v21-check-item.done .v21-check-box{background:var(--primary);border-color:var(--primary);color:#fff}
.v21-plan-day{background:var(--bg);border-radius:16px;padding:16px;margin-bottom:10px}
.v21-plan-day h4{font-size:14px;font-weight:800;margin-bottom:8px;display:flex;align-items:center;gap:6px}
.v21-plan-slot{display:flex;gap:8px;margin-bottom:6px;align-items:center}
.v21-plan-time{font-size:11px;font-weight:700;color:var(--primary);width:50px;flex-shrink:0}
.v21-plan-act{flex:1;padding:8px 12px;border:1.5px solid var(--border);border-radius:10px;font-size:12px;background:var(--bg);color:var(--text)}
`;
document.head.appendChild(css21);

// ─── SFX Engine (12 new sounds: 80→92) ───
var sfx21 = {};
var sfxCtx21 = null;
function initSfx21(){ if(!sfxCtx21) sfxCtx21 = new (window.AudioContext||window.webkitAudioContext)(); }
function playSfx21(name){
  try{
    initSfx21();
    var c = sfxCtx21, o, g;
    g = c.createGain(); g.connect(c.destination); g.gain.value = 0.25;
    var t = c.currentTime;
    switch(name){
      case 'sg_calc': o=c.createOscillator();o.type='triangle';o.frequency.setValueAtTime(523,t);o.frequency.linearRampToValueAtTime(784,t+.15);o.connect(g);o.start(t);o.stop(t+.2);break;
      case 'sg_positive': o=c.createOscillator();o.type='sine';o.frequency.setValueAtTime(659,t);o.frequency.linearRampToValueAtTime(880,t+.12);o.connect(g);o.start(t);o.stop(t+.18);break;
      case 'sg_negative': o=c.createOscillator();o.type='sawtooth';o.frequency.setValueAtTime(330,t);o.frequency.linearRampToValueAtTime(220,t+.2);o.connect(g);g.gain.value=0.15;o.start(t);o.stop(t+.25);break;
      case 'share_card': o=c.createOscillator();o.type='sine';o.frequency.setValueAtTime(440,t);o.frequency.linearRampToValueAtTime(660,t+.08);o.frequency.linearRampToValueAtTime(880,t+.16);o.connect(g);o.start(t);o.stop(t+.22);break;
      case 'putt_track': o=c.createOscillator();o.type='sine';o.frequency.setValueAtTime(392,t);o.connect(g);o.start(t);o.stop(t+.1);break;
      case 'putt_1': o=c.createOscillator();o.type='triangle';o.frequency.setValueAtTime(784,t);o.frequency.linearRampToValueAtTime(1047,t+.15);o.connect(g);o.start(t);o.stop(t+.2);break;
      case 'compare': o=c.createOscillator();o.type='square';o.frequency.setValueAtTime(440,t);o.frequency.linearRampToValueAtTime(554,t+.1);o.connect(g);g.gain.value=0.12;o.start(t);o.stop(t+.15);break;
      case 'booking': o=c.createOscillator();o.type='sine';o.frequency.setValueAtTime(523,t);o.frequency.linearRampToValueAtTime(659,t+.1);o.connect(g);o.start(t);o.stop(t+.15);break;
      case 'dict_open': o=c.createOscillator();o.type='sine';o.frequency.setValueAtTime(587,t);o.connect(g);g.gain.value=0.15;o.start(t);o.stop(t+.08);break;
      case 'checklist': o=c.createOscillator();o.type='triangle';o.frequency.setValueAtTime(698,t);o.connect(g);o.start(t);o.stop(t+.1);break;
      case 'planner': o=c.createOscillator();o.type='sine';o.frequency.setValueAtTime(494,t);o.frequency.linearRampToValueAtTime(659,t+.12);o.connect(g);o.start(t);o.stop(t+.18);break;
      case 'quiz21': o=c.createOscillator();o.type='triangle';o.frequency.setValueAtTime(523,t);o.frequency.linearRampToValueAtTime(698,t+.1);o.connect(g);o.start(t);o.stop(t+.15);break;
    }
  }catch(e){}
}

// ─── Helper ───
function showToast21(msg, type){
  if(typeof showToast === 'function') return showToast(msg, type);
  var t = document.createElement('div');
  t.textContent = msg;
  t.style.cssText = 'position:fixed;bottom:80px;left:50%;transform:translateX(-50%);background:#333;color:#fff;padding:12px 24px;border-radius:12px;z-index:20000;font-size:13px;';
  document.body.appendChild(t);
  setTimeout(function(){ t.remove(); }, 2500);
}

// ─── 1. Strokes Gained Calculator ───
var SG_BASELINE = {
  tee: { avg_drive: 245, fir_pct: 60 },
  approach: { gir_pct: 33, avg_proximity: 40 },
  short: { scramble_pct: 30 },
  putting: { avg_putts: 36, one_putt_pct: 25, three_putt_pct: 8 }
};

function calcStrokesGained(data){
  var sg = { tee:0, approach:0, short:0, putting:0, total:0 };
  if(data.fir !== undefined){
    var firDelta = (data.fir - SG_BASELINE.tee.fir_pct) / 100;
    sg.tee = -firDelta * 1.5;
  }
  if(data.gir !== undefined){
    var girDelta = (data.gir - SG_BASELINE.approach.gir_pct) / 100;
    sg.approach = -girDelta * 2.0;
  }
  if(data.gir !== undefined){
    var missedGreens = 18 * (1 - data.gir/100);
    var scrambleNeeded = missedGreens;
    var expectedUp = scrambleNeeded * (SG_BASELINE.short.scramble_pct/100);
    var actualScramble = data.scrambles || 0;
    sg.short = -(actualScramble - expectedUp) * 0.5;
  }
  if(data.putts !== undefined){
    sg.putting = -(SG_BASELINE.putting.avg_putts - data.putts) * 0.5;
  }
  sg.total = sg.tee + sg.approach + sg.short + sg.putting;
  return sg;
}

function renderSGOverlay(){
  var ov = document.getElementById('v21sgOverlay');
  if(!ov) return;
  var records = JSON.parse(localStorage.getItem('sg_post_rounds') || '[]');
  var html = '<div class="v21-hdr"><h2><span class="v21i">&#128202;</span> Strokes Gained &#48516;&#49437;&#44592;</h2><button class="v21-x" onclick="document.getElementById(\'v21sgOverlay\').classList.remove(\'active\')">&times;</button></div>';

  if(records.length === 0){
    html += '<div class="v21-card"><p>&#46972;&#50868;&#46300; &#49324;&#54980;&#48516;&#49437;(Shift+P) &#45936;&#51060;&#53552;&#44032; &#54596;&#50836;&#54633;&#45768;&#45796;. &#47676;&#51200; &#46972;&#50868;&#46300;&#47484; &#44592;&#47197;&#54644;&#51452;&#49464;&#50836;.</p></div>';
    html += '<div class="v21-divider"></div><h3 style="font-size:15px;font-weight:800;margin-bottom:12px">&#49688;&#46041; &#48516;&#49437;</h3>';
    html += '<div class="v21-grid2">';
    html += '<div><label style="font-size:11px;font-weight:700;display:block;margin-bottom:4px">FIR% (&#54168;&#50612;&#50920;&#51060;&#50504;&#52265;&#47456;)</label><input class="v21-input" id="v21sgFir" type="number" min="0" max="100" value="50"></div>';
    html += '<div><label style="font-size:11px;font-weight:700;display:block;margin-bottom:4px">GIR% (&#44536;&#47536;&#51201;&#51473;&#47456;)</label><input class="v21-input" id="v21sgGir" type="number" min="0" max="100" value="33"></div>';
    html += '<div><label style="font-size:11px;font-weight:700;display:block;margin-bottom:4px">&#52509;&#54140;&#53944;&#49688;</label><input class="v21-input" id="v21sgPutts" type="number" min="18" max="60" value="36"></div>';
    html += '<div><label style="font-size:11px;font-weight:700;display:block;margin-bottom:4px">&#49828;&#53356;&#47016;&#48660;&#49688;</label><input class="v21-input" id="v21sgScrambles" type="number" min="0" max="18" value="3"></div>';
    html += '</div>';
    html += '<button class="v21-btn v21-btn-primary" style="margin-top:14px;width:100%" onclick="v21ManualSG()">&#48516;&#49437; &#49892;&#54665;</button>';
    html += '<div id="v21sgResult"></div>';
  } else {
    var latest = records[records.length - 1];
    var sg = calcStrokesGained({
      fir: latest.fir || 50,
      gir: latest.gir || 33,
      putts: latest.putts || 36,
      scrambles: latest.scrambles || 3
    });
    html += renderSGBars(sg);
    html += '<div class="v21-divider"></div>';
    html += '<h3 style="font-size:15px;font-weight:800;margin-bottom:12px">&#52628;&#51060; &#48516;&#49437; (&#52572;&#44540; 5&#46972;&#50868;&#46300;)</h3>';
    var last5 = records.slice(-5);
    last5.forEach(function(r, i){
      var s = calcStrokesGained({fir:r.fir||50,gir:r.gir||33,putts:r.putts||36,scrambles:r.scrambles||3});
      html += '<div class="v21-stat-row"><span>' + (r.date||'N/A') + ' ' + (r.course||'') + '</span><span style="font-weight:800;color:' + (s.total<=0?'#2e9e4f':'#ff4757') + '">' + (s.total<=0?'':'+') + s.total.toFixed(1) + '</span></div>';
    });
  }

  ov.querySelector('.v21-modal').innerHTML = html;
  ov.classList.add('active');
  playSfx21('sg_calc');
}

function renderSGBars(sg){
  var cats = [
    {name:'Tee-to-Green (&#46300;&#46972;&#51060;&#48260;)', val:sg.tee},
    {name:'Approach (&#50612;&#54532;&#47196;&#52824;)', val:sg.approach},
    {name:'Short Game (&#49660;&#53944;&#44172;&#51076;)', val:sg.short},
    {name:'Putting (&#54140;&#54021;)', val:sg.putting}
  ];
  var h = '<div style="margin-bottom:16px">';
  h += '<div style="text-align:center;margin-bottom:16px"><span style="font-size:36px;font-weight:900;color:' + (sg.total<=0?'#2e9e4f':'#ff4757') + '">' + (sg.total<=0?'':'+') + sg.total.toFixed(1) + '</span><div style="font-size:12px;color:var(--text-muted)">Total Strokes Gained (vs Bogey Golfer)</div></div>';
  cats.forEach(function(c){
    var pct = Math.min(Math.abs(c.val)/3*100, 100);
    var cls = c.val <= 0 ? 'v21-sg-positive' : 'v21-sg-negative';
    h += '<div class="v21-sg-bar"><div class="v21-sg-label">' + c.name + '</div><div class="v21-sg-track"><div class="v21-sg-fill ' + cls + '" style="width:' + pct + '%">' + (c.val<=0?'':'+') + c.val.toFixed(1) + '</div></div></div>';
  });
  h += '<p style="font-size:11px;color:var(--text-muted);margin-top:10px">&#8251; &#51020;&#49688;(&#45433;&#49353;)&#44032; &#51339;&#51020;. &#48372;&#44592;&#44264;&#54140; &#45824;&#48708; &#49828;&#53944;&#47196;&#53356; &#51208;&#50557;&#47049;.</p>';
  h += '</div>';
  return h;
}

window.v21ManualSG = function(){
  var fir = parseInt(document.getElementById('v21sgFir').value)||50;
  var gir = parseInt(document.getElementById('v21sgGir').value)||33;
  var putts = parseInt(document.getElementById('v21sgPutts').value)||36;
  var scrambles = parseInt(document.getElementById('v21sgScrambles').value)||3;
  var sg = calcStrokesGained({fir:fir,gir:gir,putts:putts,scrambles:scrambles});
  document.getElementById('v21sgResult').innerHTML = '<div class="v21-divider"></div>' + renderSGBars(sg);
  playSfx21(sg.total <= 0 ? 'sg_positive' : 'sg_negative');
};

// ─── 2. Score Share Card (Canvas PNG) ───
function renderShareCard(){
  var ov = document.getElementById('v21shareOverlay');
  if(!ov) return;
  var records = JSON.parse(localStorage.getItem('sg_post_rounds') || '[]');
  var rounds = JSON.parse(localStorage.getItem('sg_rounds') || '[]');
  var allRounds = rounds.concat(records);

  var html = '<div class="v21-hdr"><h2><span class="v21i">&#127912;</span> &#49828;&#53076;&#50612; &#44277;&#50976; &#52852;&#46300;</h2><button class="v21-x" onclick="document.getElementById(\'v21shareOverlay\').classList.remove(\'active\')">&times;</button></div>';

  if(allRounds.length === 0){
    html += '<div class="v21-card"><p>&#44277;&#50976;&#54624; &#46972;&#50868;&#46300; &#45936;&#51060;&#53552;&#44032; &#50630;&#49845;&#45768;&#45796;.</p></div>';
  } else {
    html += '<canvas id="v21ShareCanvas" class="v21-share-canvas" width="600" height="380"></canvas>';
    html += '<div class="v21-grid2" style="margin-top:14px">';
    html += '<button class="v21-btn v21-btn-primary" onclick="v21DownloadCard()">&#128190; PNG &#45796;&#50868;&#47196;&#46300;</button>';
    html += '<button class="v21-btn v21-btn-secondary" onclick="v21CopyCard()">&#128203; &#53364;&#47549;&#48372;&#46300; &#48373;&#49324;</button>';
    html += '</div>';
  }

  ov.querySelector('.v21-modal').innerHTML = html;
  ov.classList.add('active');

  if(allRounds.length > 0){
    setTimeout(function(){ drawShareCanvas(allRounds); }, 100);
  }
  playSfx21('share_card');
}

function drawShareCanvas(allRounds){
  var canvas = document.getElementById('v21ShareCanvas');
  if(!canvas) return;
  var ctx = canvas.getContext('2d');
  var w = 600, h = 380;

  var grad = ctx.createLinearGradient(0,0,w,h);
  grad.addColorStop(0,'#0f5a28');
  grad.addColorStop(0.5,'#1a7a3a');
  grad.addColorStop(1,'#2e9e4f');
  ctx.fillStyle = grad;
  ctx.fillRect(0,0,w,h);

  ctx.fillStyle = 'rgba(255,255,255,0.04)';
  for(var i=0;i<8;i++){
    ctx.beginPath();
    ctx.arc(Math.random()*w, Math.random()*h, 30+Math.random()*60, 0, Math.PI*2);
    ctx.fill();
  }

  ctx.fillStyle = '#fff';
  ctx.font = 'bold 28px sans-serif';
  ctx.fillText('⛳ SmartGolf', 30, 45);
  ctx.font = '13px sans-serif';
  ctx.fillStyle = 'rgba(255,255,255,0.7)';
  ctx.fillText(new Date().toLocaleDateString('ko-KR') + ' 기준', 30, 68);

  var scores = allRounds.filter(function(r){return r.score > 0;}).map(function(r){return r.score;});
  var totalR = allRounds.length;
  var avg = scores.length ? Math.round(scores.reduce(function(a,b){return a+b;},0)/scores.length) : 0;
  var best = scores.length ? Math.min.apply(null, scores) : 0;
  var worst = scores.length ? Math.max.apply(null, scores) : 0;

  var stats = [
    {label:'총 라운드', val:totalR + '회'},
    {label:'평균 타수', val:avg + '타'},
    {label:'베스트', val:best + '타'},
    {label:'워스트', val:worst + '타'}
  ];

  stats.forEach(function(s, idx){
    var sx = 30 + idx * 140;
    ctx.fillStyle = 'rgba(255,255,255,0.12)';
    ctx.beginPath();
    ctx.roundRect(sx, 90, 125, 80, 14);
    ctx.fill();
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 32px sans-serif';
    ctx.fillText(s.val, sx+14, 138);
    ctx.font = '11px sans-serif';
    ctx.fillStyle = 'rgba(255,255,255,0.6)';
    ctx.fillText(s.label, sx+14, 158);
  });

  if(scores.length >= 2){
    var chartScores = scores.slice(-10);
    var chartH = 100, chartW = 540, chartX = 30, chartY = 200;
    var mn = Math.min.apply(null, chartScores) - 5;
    var mx = Math.max.apply(null, chartScores) + 5;
    var range = mx - mn || 1;

    ctx.strokeStyle = 'rgba(255,255,255,0.15)';
    ctx.lineWidth = 1;
    for(var li=0;li<4;li++){
      var ly = chartY + (li/3)*chartH;
      ctx.beginPath();ctx.moveTo(chartX,ly);ctx.lineTo(chartX+chartW,ly);ctx.stroke();
    }

    ctx.beginPath();
    ctx.strokeStyle = 'rgba(123,237,159,0.8)';
    ctx.lineWidth = 3;
    chartScores.forEach(function(sc, si){
      var px = chartX + (si/(chartScores.length-1)) * chartW;
      var py = chartY + chartH - ((sc - mn)/range) * chartH;
      if(si===0) ctx.moveTo(px,py); else ctx.lineTo(px,py);
    });
    ctx.stroke();

    chartScores.forEach(function(sc, si){
      var px = chartX + (si/(chartScores.length-1)) * chartW;
      var py = chartY + chartH - ((sc - mn)/range) * chartH;
      ctx.fillStyle = '#7bed9f';
      ctx.beginPath();ctx.arc(px,py,4,0,Math.PI*2);ctx.fill();
      ctx.fillStyle = 'rgba(255,255,255,0.7)';
      ctx.font = '10px sans-serif';
      ctx.fillText(sc+'', px-8, py-10);
    });
  }

  ctx.fillStyle = 'rgba(255,255,255,0.4)';
  ctx.font = '11px sans-serif';
  ctx.fillText('Generated by SmartGolf PWA | smartgolf.app', 30, h-18);

  var records2 = JSON.parse(localStorage.getItem('sg_post_rounds') || '[]');
  if(records2.length > 0){
    var last = records2[records2.length-1];
    var sg = calcStrokesGained({fir:last.fir||50,gir:last.gir||33,putts:last.putts||36,scrambles:last.scrambles||3});
    ctx.fillStyle = 'rgba(255,255,255,0.12)';
    ctx.beginPath();ctx.roundRect(30, 320, 540, 40, 10);ctx.fill();
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 12px sans-serif';
    ctx.fillText('SG Total: ' + (sg.total<=0?'':'+') + sg.total.toFixed(1) + '  |  Tee: ' + sg.tee.toFixed(1) + '  |  Approach: ' + sg.approach.toFixed(1) + '  |  Short: ' + sg.short.toFixed(1) + '  |  Putting: ' + sg.putting.toFixed(1), 44, 344);
  }
}

window.v21DownloadCard = function(){
  var canvas = document.getElementById('v21ShareCanvas');
  if(!canvas) return;
  canvas.toBlob(function(blob){
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = 'smartgolf_score_' + new Date().toISOString().slice(0,10) + '.png';
    a.click();
    URL.revokeObjectURL(url);
    showToast21('PNG 다운로드 완료', 'success');
  });
};

window.v21CopyCard = function(){
  var canvas = document.getElementById('v21ShareCanvas');
  if(!canvas) return;
  canvas.toBlob(function(blob){
    if(navigator.clipboard && navigator.clipboard.write){
      navigator.clipboard.write([new ClipboardItem({'image/png': blob})]).then(function(){
        showToast21('클립보드에 복사됨', 'success');
      });
    } else {
      showToast21('브라우저가 클립보드 복사를 지원하지 않습니다', 'warning');
    }
  });
};

// ─── 3. Per-Hole Putt Tracker ───
function renderPuttTracker(){
  var ov = document.getElementById('v21puttOverlay');
  if(!ov) return;
  var saved = JSON.parse(localStorage.getItem('sg_putt_records') || '[]');

  var html = '<div class="v21-hdr"><h2><span class="v21i">&#9971;</span> &#54140;&#53944; &#53944;&#47000;&#52964; 18&#54848;</h2><button class="v21-x" onclick="document.getElementById(\'v21puttOverlay\').classList.remove(\'active\')">&times;</button></div>';

  html += '<div class="v21-tabs" id="v21puttTabs"><div class="v21-tab active" data-tab="input">기록</div><div class="v21-tab" data-tab="stats">통계</div><div class="v21-tab" data-tab="history">이력</div></div>';

  html += '<div id="v21puttInput">';
  html += '<div style="margin-bottom:12px"><label style="font-size:11px;font-weight:700;display:block;margin-bottom:4px">날짜</label><input class="v21-input" id="v21puttDate" type="date" value="' + new Date().toISOString().slice(0,10) + '"></div>';
  html += '<div style="margin-bottom:12px"><label style="font-size:11px;font-weight:700;display:block;margin-bottom:4px">골프장</label><input class="v21-input" id="v21puttCourse" placeholder="골프장명 입력"></div>';
  html += '<table class="v21-putt-table"><thead><tr><th>Hole</th>';
  for(var hi=1;hi<=18;hi++) html += '<th>' + hi + '</th>';
  html += '<th>Total</th></tr></thead><tbody><tr><td style="font-weight:700">Putts</td>';
  for(var hi2=1;hi2<=18;hi2++) html += '<td><input id="v21p' + hi2 + '" type="number" min="0" max="9" value="2" onchange="v21UpdatePuttTotal()"></td>';
  html += '<td id="v21puttTotal" style="font-weight:900;font-size:16px;color:var(--primary)">36</td></tr></tbody></table>';
  html += '<button class="v21-btn v21-btn-primary" style="margin-top:14px;width:100%" onclick="v21SavePutts()">저장</button>';
  html += '</div>';

  html += '<div id="v21puttStats" style="display:none"></div>';
  html += '<div id="v21puttHistory" style="display:none"></div>';

  ov.querySelector('.v21-modal').innerHTML = html;
  ov.classList.add('active');
  playSfx21('putt_track');

  ov.querySelectorAll('.v21-tab').forEach(function(tab){
    tab.addEventListener('click', function(){
      ov.querySelectorAll('.v21-tab').forEach(function(t){t.classList.remove('active');});
      tab.classList.add('active');
      var tb = tab.dataset.tab;
      document.getElementById('v21puttInput').style.display = tb==='input'?'':'none';
      document.getElementById('v21puttStats').style.display = tb==='stats'?'':'none';
      document.getElementById('v21puttHistory').style.display = tb==='history'?'':'none';
      if(tb==='stats') v21RenderPuttStats();
      if(tb==='history') v21RenderPuttHistory();
    });
  });
}

window.v21UpdatePuttTotal = function(){
  var total = 0;
  for(var i=1;i<=18;i++){
    var v = parseInt(document.getElementById('v21p'+i).value)||0;
    total += v;
  }
  document.getElementById('v21puttTotal').textContent = total;
};

window.v21SavePutts = function(){
  var putts = [];
  var total = 0;
  for(var i=1;i<=18;i++){
    var v = parseInt(document.getElementById('v21p'+i).value)||0;
    putts.push(v);
    total += v;
  }
  var record = {
    date: document.getElementById('v21puttDate').value,
    course: document.getElementById('v21puttCourse').value || '미입력',
    putts: putts,
    total: total,
    onePutt: putts.filter(function(p){return p===1;}).length,
    threePutt: putts.filter(function(p){return p>=3;}).length
  };
  var saved = JSON.parse(localStorage.getItem('sg_putt_records') || '[]');
  saved.push(record);
  if(saved.length > 100) saved = saved.slice(-100);
  localStorage.setItem('sg_putt_records', JSON.stringify(saved));
  showToast21('텀트 기록 저장 (' + total + '텀트)', 'success');
  playSfx21(record.onePutt >= 5 ? 'putt_1' : 'putt_track');
  v21CheckAchievements();
};

function v21RenderPuttStats(){
  var saved = JSON.parse(localStorage.getItem('sg_putt_records') || '[]');
  var el = document.getElementById('v21puttStats');
  if(saved.length === 0){
    el.innerHTML = '<div class="v21-card"><p>기록된 텀트 데이터가 없습니다.</p></div>';
    return;
  }
  var avgTotal = Math.round(saved.reduce(function(s,r){return s+r.total;},0)/saved.length*10)/10;
  var avgOnePutt = Math.round(saved.reduce(function(s,r){return s+r.onePutt;},0)/saved.length*10)/10;
  var avgThreePutt = Math.round(saved.reduce(function(s,r){return s+r.threePutt;},0)/saved.length*10)/10;
  var bestTotal = Math.min.apply(null, saved.map(function(r){return r.total;}));

  var html = '<div class="v21-grid2">';
  html += '<div class="v21-card" style="text-align:center"><div style="font-size:32px;font-weight:900;color:var(--primary)">' + avgTotal + '</div><div style="font-size:11px;color:var(--text-muted)">평균 텀트수</div></div>';
  html += '<div class="v21-card" style="text-align:center"><div style="font-size:32px;font-weight:900;color:#2e9e4f">' + bestTotal + '</div><div style="font-size:11px;color:var(--text-muted)">베스트</div></div>';
  html += '<div class="v21-card" style="text-align:center"><div style="font-size:32px;font-weight:900;color:#2e9e4f">' + avgOnePutt + '</div><div style="font-size:11px;color:var(--text-muted)">평균 1텀트</div></div>';
  html += '<div class="v21-card" style="text-align:center"><div style="font-size:32px;font-weight:900;color:#ff4757">' + avgThreePutt + '</div><div style="font-size:11px;color:var(--text-muted)">평균 3텀트</div></div>';
  html += '</div>';

  html += '<div class="v21-divider"></div>';
  html += '<h3 style="font-size:14px;font-weight:800;margin-bottom:10px">홀별 평균 텀트</h3>';
  var holeAvg = [];
  for(var h=0;h<18;h++){
    var sum = saved.reduce(function(s,r){return s+(r.putts[h]||0);},0);
    holeAvg.push(Math.round(sum/saved.length*10)/10);
  }
  html += '<div style="display:flex;gap:4px;flex-wrap:wrap">';
  holeAvg.forEach(function(avg, idx){
    var bgc = avg <= 1.5 ? '#2e9e4f' : avg <= 2.0 ? '#ffa502' : '#ff4757';
    html += '<div style="width:48px;text-align:center;padding:8px 4px;border-radius:10px;background:' + bgc + ';color:#fff;font-size:11px;font-weight:700"><div style="font-size:9px;opacity:.7">H' + (idx+1) + '</div>' + avg + '</div>';
  });
  html += '</div>';
  el.innerHTML = html;
}

function v21RenderPuttHistory(){
  var saved = JSON.parse(localStorage.getItem('sg_putt_records') || '[]');
  var el = document.getElementById('v21puttHistory');
  if(saved.length === 0){
    el.innerHTML = '<div class="v21-card"><p>기록이 없습니다.</p></div>';
    return;
  }
  var html = '';
  saved.slice().reverse().slice(0,20).forEach(function(r){
    html += '<div class="v21-card"><h4>' + r.date + ' - ' + r.course + '</h4>';
    html += '<p>Total: <strong>' + r.total + '</strong> | <span class="v21-putt-1">1텀트: ' + r.onePutt + '</span> | <span class="v21-putt-3">3텀트+: ' + r.threePutt + '</span></p>';
    html += '<p style="font-size:10px;margin-top:4px">' + r.putts.join('-') + '</p></div>';
  });
  el.innerHTML = html;
}

// ─── 4. Round Comparison View ───
function renderComparison(){
  var ov = document.getElementById('v21compareOverlay');
  if(!ov) return;
  var records = JSON.parse(localStorage.getItem('sg_post_rounds') || '[]');
  var rounds = JSON.parse(localStorage.getItem('sg_rounds') || '[]');

  var html = '<div class="v21-hdr"><h2><span class="v21i">&#128260;</span> 라운드 비교</h2><button class="v21-x" onclick="document.getElementById(\'v21compareOverlay\').classList.remove(\'active\')">&times;</button></div>';

  if(records.length < 2 && rounds.length < 2){
    html += '<div class="v21-card"><p>2개 이상의 라운드 기록이 필요합니다.</p></div>';
  } else {
    var allR = records.length >= 2 ? records : rounds;
    html += '<div class="v21-grid2" style="margin-bottom:14px">';
    html += '<div><label style="font-size:11px;font-weight:700;display:block;margin-bottom:4px">라운드 A</label><select class="v21-select" id="v21cmpA" style="width:100%">';
    allR.forEach(function(r,i){ html += '<option value="' + i + '">' + (r.date||'') + ' ' + (r.course||'#'+(i+1)) + '</option>'; });
    html += '</select></div>';
    html += '<div><label style="font-size:11px;font-weight:700;display:block;margin-bottom:4px">라운드 B</label><select class="v21-select" id="v21cmpB" style="width:100%">';
    allR.forEach(function(r,i){ html += '<option value="' + i + '"' + (i===allR.length-1?' selected':'') + '>' + (r.date||'') + ' ' + (r.course||'#'+(i+1)) + '</option>'; });
    html += '</select></div>';
    html += '</div>';
    html += '<button class="v21-btn v21-btn-primary" style="width:100%;margin-bottom:16px" onclick="v21DoCompare()">비교 실행</button>';
    html += '<div id="v21cmpResult"></div>';
  }

  ov.querySelector('.v21-modal').innerHTML = html;
  ov.classList.add('active');
  playSfx21('compare');
}

window.v21DoCompare = function(){
  var records = JSON.parse(localStorage.getItem('sg_post_rounds') || '[]');
  var rounds = JSON.parse(localStorage.getItem('sg_rounds') || '[]');
  var allR = records.length >= 2 ? records : rounds;
  var ai = parseInt(document.getElementById('v21cmpA').value);
  var bi = parseInt(document.getElementById('v21cmpB').value);
  var a = allR[ai], b = allR[bi];
  if(!a || !b) return;

  var metrics = [
    {name:'스코어', a:a.score||0, b:b.score||0, lower:true},
    {name:'FIR%', a:a.fir||0, b:b.fir||0, lower:false},
    {name:'GIR%', a:a.gir||0, b:b.gir||0, lower:false},
    {name:'텀트', a:a.putts||0, b:b.putts||0, lower:true},
    {name:'벌타', a:a.penalties||0, b:b.penalties||0, lower:true},
    {name:'버디', a:a.birdies||0, b:b.birdies||0, lower:false}
  ];

  var html = '<div class="v21-compare-row v21-compare-hdr"><div>항목</div><div style="text-align:center">A</div><div style="text-align:center">B</div><div style="text-align:center">차이</div></div>';
  metrics.forEach(function(m){
    var delta = m.b - m.a;
    var better = m.lower ? delta > 0 : delta < 0;
    var cls = delta === 0 ? '' : (better ? 'v21-delta-neg' : 'v21-delta-pos');
    if(m.lower) cls = delta === 0 ? '' : (delta > 0 ? 'v21-delta-pos' : 'v21-delta-neg');
    else cls = delta === 0 ? '' : (delta > 0 ? 'v21-delta-pos' : 'v21-delta-neg');

    var sign = delta > 0 ? '+' : '';
    html += '<div class="v21-compare-row"><div style="font-weight:700">' + m.name + '</div><div style="text-align:center">' + m.a + '</div><div style="text-align:center">' + m.b + '</div><div style="text-align:center" class="' + cls + '">' + sign + delta + '</div></div>';
  });

  document.getElementById('v21cmpResult').innerHTML = html;
};

// ─── 5. Booking Deep-Link Generator ───
function renderBooking(){
  var ov = document.getElementById('v21bookingOverlay');
  if(!ov) return;

  var html = '<div class="v21-hdr"><h2><span class="v21i">&#128279;</span> 예약 바로가기</h2><button class="v21-x" onclick="document.getElementById(\'v21bookingOverlay\').classList.remove(\'active\')">&times;</button></div>';

  html += '<div style="margin-bottom:16px"><label style="font-size:11px;font-weight:700;display:block;margin-bottom:4px">골프장명 입력</label><input class="v21-input" id="v21bookingName" placeholder="예: 남서울CC, 비제이힐스"></div>';
  html += '<button class="v21-btn v21-btn-primary" style="width:100%;margin-bottom:18px" onclick="v21GenBookingLinks()">예약 링크 생성</button>';

  html += '<div id="v21bookingLinks">';
  var platforms = [
    {name:'네이버 스포츠 골프', icon:'🏌️', bg:'#1ec800', color:'#fff', desc:'네이버 스포츠에서 골프장 검색'},
    {name:'카카오 골프예약', icon:'⛳', bg:'#fee500', color:'#000', desc:'카카오 골프에서 티타임 예약'},
    {name:'골프존 예약', icon:'🎯', bg:'#ff6b35', color:'#fff', desc:'골프존에서 예약 검색'},
    {name:'스마트스코어', icon:'📱', bg:'#1a7a3a', color:'#fff', desc:'스마트스코어 예약'},
    {name:'구글 검색', icon:'🔍', bg:'#4285f4', color:'#fff', desc:'구글에서 골프장 정보 검색'}
  ];
  platforms.forEach(function(p){
    html += '<div class="v21-booking-card"><div class="v21-booking-icon" style="background:' + p.bg + ';color:' + p.color + '">' + p.icon + '</div>';
    html += '<div class="v21-booking-info"><div class="v21-booking-name">' + p.name + '</div><div class="v21-booking-desc">' + p.desc + '</div></div>';
    html += '<button class="v21-booking-go" style="background:' + p.bg + ';color:' + p.color + '" data-platform="' + p.name + '" onclick="v21OpenBooking(\'' + p.name + '\')">바로가기</button></div>';
  });
  html += '</div>';

  ov.querySelector('.v21-modal').innerHTML = html;
  ov.classList.add('active');
  playSfx21('booking');
}

window.v21GenBookingLinks = function(){
  var name = document.getElementById('v21bookingName').value.trim();
  if(!name){ showToast21('골프장명을 입력해주세요', 'warning'); return; }
  showToast21(name + ' 예약 링크 준비 완료', 'success');
};

window.v21OpenBooking = function(platform){
  var name = document.getElementById('v21bookingName').value.trim() || '골프장';
  var encoded = encodeURIComponent(name + ' 골프장 예약');
  var url = '';
  switch(platform){
    case '네이버 스포츠 골프': url='https://m.sports.naver.com/golf/record/search?query='+encoded; break;
    case '카카오 골프예약': url='https://golf.kakao.com/search?q='+encodeURIComponent(name); break;
    case '골프존 예약': url='https://www.golfzon.com/search/?q='+encodeURIComponent(name); break;
    case '스마트스코어': url='https://www.smartscore.kr/search?keyword='+encodeURIComponent(name); break;
    default: url='https://www.google.com/search?q='+encoded; break;
  }
  window.open(url, '_blank');
  playSfx21('booking');
};

// ─── 6. Golf Dictionary (100 Terms) ───
var GOLF_DICT = [
  {t:'에이스', en:'Ace', d:'홀인원. 티샷 한 번에 공이 홈에 들어가는 것.'},
  {t:'알바트로스', en:'Albatross', d:'파 대비 3타 적은 스코어. 파5 홀을 2타에 넣는 것.'},
  {t:'어프로치', en:'Approach', d:'그린 주변에서 홈컷을 노리고 치는 샷.'},
  {t:'백스핀', en:'Backspin', d:'공이 뒤로 회전하며 착지 후 멈추거나 뒤로 구르는 현상.'},
  {t:'버디', en:'Birdie', d:'파 대비 1타 적은 스코어.'},
  {t:'보기', en:'Bogey', d:'파 대비 1타 많은 스코어.'},
  {t:'번커', en:'Bunker', d:'모래로 채워진 장애물 구역.'},
  {t:'캐디', en:'Caddie', d:'골퍼의 클럽을 들고 코스 공략 조언을 하는 사람.'},
  {t:'치핑', en:'Chipping', d:'그린 근처에서 낮게 띄우는 샷.'},
  {t:'드로우', en:'Draw', d:'공이 오른쪽에서 왼쪽으로 휘는 구질(오른손 기준).'},
  {t:'드라이버', en:'Driver', d:'1번 우드. 가장 먼 거리를 보내는 클럽.'},
  {t:'이글', en:'Eagle', d:'파 대비 2타 적은 스코어.'},
  {t:'페이드', en:'Fade', d:'공이 왼쪽에서 오른쪽으로 휘는 구질.'},
  {t:'페어웨이', en:'Fairway', d:'티와 그린 사이 잘 정리된 잔디 지역.'},
  {t:'FIR', en:'Fairway In Regulation', d:'페어웨이 안착률. 드라이버 샷이 페어웨이에 안착한 비율.'},
  {t:'플래그', en:'Flag', d:'홀컷의 위치를 나타내는 깃대.'},
  {t:'포아', en:'Fore', d:'공이 다른 사람 방향으로 갔을 때 경고하는 외침.'},
  {t:'GIR', en:'Green In Regulation', d:'그린 적중률. 파-2 이하 타수로 그린에 올리는 것.'},
  {t:'그린', en:'Green', d:'홀컷이 있는 잔디가 짧게 깎인 구역.'},
  {t:'그립', en:'Grip', d:'클럽을 잡는 방법 또는 클럽의 손잡이 부분.'},
  {t:'핵디캡', en:'Handicap', d:'골퍼의 실력을 수치화한 것. 낮을수록 실력이 좋음.'},
  {t:'해저드', en:'Hazard', d:'벼측을 받는 장애물 구역 (워터/번커 등).'},
  {t:'홀', en:'Hole', d:'공을 넣는 구멍 또는 티에서 그린까지의 전체 영역.'},
  {t:'홀인원', en:'Hole-in-One', d:'티샷 한 번에 공이 홀컷에 들어가는 것.'},
  {t:'훅', en:'Hook', d:'공이 오른쪽에서 왼쪽으로 강하게 휘는 구질.'},
  {t:'아이언', en:'Iron', d:'금속 헤드의 클럽. 3~9번까지 있음.'},
  {t:'레이업', en:'Lay-up', d:'위험을 피해 의도적으로 짧게 치는 전략적 샷.'},
  {t:'로프트', en:'Loft', d:'클럽 페이스의 각도. 클수록 공이 높이 떠오름.'},
  {t:'매치플레이', en:'Match Play', d:'홀별로 승부를 겨루는 경기 방식.'},
  {t:'멀리건', en:'Mulligan', d:'비공식적으로 첫 샷을 다시 치는 것.'},
  {t:'나쏠', en:'Nassau', d:'3판 내기 방식. 전반/후반/전체 승자 계산.'},
  {t:'OB', en:'Out of Bounds', d:'경기 구역 밖. 1벌타 부과.'},
  {t:'파', en:'Par', d:'각 홀의 기준 타수.'},
  {t:'피치', en:'Pitch', d:'높이 띄워 그린에 올리는 샷.'},
  {t:'피봇', en:'Pivot', d:'스윙 중 몸의 회전 축.'},
  {t:'플레이오프', en:'Playoff', d:'동타 시 승부를 가리는 연장전.'},
  {t:'퍼터', en:'Putter', d:'그린 위에서 공을 굴리는 클럽.'},
  {t:'퍼팅', en:'Putting', d:'그린 위에서 퍼터로 공을 굴리는 행위.'},
  {t:'러프', en:'Rough', d:'페어웨이 바깥의 잔디가 긴 구역.'},
  {t:'라운드', en:'Round', d:'18홀을 완주하는 한 번의 경기.'},
  {t:'샌드웨지', en:'Sand Wedge', d:'번커 샷에 주로 사용하는 클럽.'},
  {t:'스캔크', en:'Shank', d:'공이 호즐(클럽 목) 부분에 맞아 오른쪽으로 튜는 미스샷.'},
  {t:'슬라이스', en:'Slice', d:'공이 왼쪽에서 오른쪽으로 강하게 휘는 구질.'},
  {t:'스탠스', en:'Stance', d:'스윙 전 발의 위치와 자세.'},
  {t:'스트로크', en:'Stroke', d:'공을 치는 동작 1회.'},
  {t:'스트로크스 게인드', en:'Strokes Gained', d:'PGA 투어 통계 기반 실력 분석 지표.'},
  {t:'스티프미터', en:'Stimpmeter', d:'그린 스피드를 측정하는 도구.'},
  {t:'스윙', en:'Swing', d:'골프 클럽을 휘두르는 동작 전체.'},
  {t:'티', en:'Tee', d:'공을 올려놓는 받침대 또는 첫 샷을 치는 장소.'},
  {t:'티오프', en:'Tee Off', d:'홀의 첫 샷을 치는 것.'},
  {t:'티타임', en:'Tee Time', d:'예약된 라운드 시작 시간.'},
  {t:'텍스체어', en:'Texture', d:'그린의 잔디 결.'},
  {t:'티아우트', en:'Time Out', d:'경기 중 일시 정지.'},
  {t:'토핑', en:'Topping', d:'공의 윗부분을 때려 공이 굴러가는 미스샷.'},
  {t:'트라블샷', en:'Trouble Shot', d:'어려운 상황에서 탈출하는 샷.'},
  {t:'언더파', en:'Under Par', d:'파 기준보다 적은 타수.'},
  {t:'오버파', en:'Over Par', d:'파 기준보다 많은 타수.'},
  {t:'웨지', en:'Wedge', d:'짧은 거리 샷용 클럽 (PW/AW/SW/LW).'},
  {t:'우드', en:'Wood', d:'먼 거리를 보내는 클럽 종류 (1W/3W/5W).'},
  {t:'워터 해저드', en:'Water Hazard', d:'물이 있는 장애물 구역.'},
  {t:'스크램블', en:'Scramble', d:'그린 미스 시 파 이하로 구제하는 것.'},
  {t:'프리샷 루틴', en:'Pre-shot Routine', d:'샷 전 반복하는 준비 동작.'},
  {t:'디벳', en:'Divot', d:'클럽으로 땅을 파낸 흙덩어리.'},
  {t:'도그레그', en:'Dogleg', d:'페어웨이가 좌우로 괽은 홀 형태.'},
  {t:'프린지', en:'Fringe', d:'그린 주변의 약간 긴 잔디 구역.'},
  {t:'그린피', en:'Green Fee', d:'골프장 이용료.'},
  {t:'레이트럴 해저드', en:'Lateral Hazard', d:'측면 수역 장애물 (1벌타).'},
  {t:'파타일', en:'Par Trial', d:'파 또는 그 이하로 치려는 시도.'},
  {t:'핀', en:'Pin', d:'홀컷에 꼽힌 깃대 (플래그스틱).'},
  {t:'피치 마크', en:'Pitch Mark', d:'공이 그린에 착지하면서 생긴 자국.'},
  {t:'플레이 오프', en:'Play Off', d:'동타 시 승부를 가리는 연장전.'},
  {t:'프로비젌널', en:'Provisional', d:'OB/분실 우려 시 처음 치는 임시 공.'},
  {t:'리프', en:'Lip', d:'홀컷의 가장자리. 립아웃 = 공이 홀컷 가장자리에서 안 들어간 것.'},
  {t:'리케버리', en:'Recovery', d:'불리한 위치에서 탈출하는 샷.'},
  {t:'레인수트', en:'Rain Suit', d:'골프용 비옷.'},
  {t:'속공', en:'Fast Ball', d:'빠르게 굴러가는 공 또는 빠른 그린.'},
  {t:'스코어카드', en:'Scorecard', d:'각 홀의 타수를 기록하는 카드.'},
  {t:'샤프트', en:'Shaft', d:'클럽의 긴 막대 부분.'},
  {t:'샤프트 플렉스', en:'Shaft Flex', d:'샤프트의 휘어지는 정도 (L/A/R/S/X).'},
  {t:'스킨스', en:'Skins', d:'홀별 배팅 방식. 홀 승자가 판돈을 가져감.'},
  {t:'스탠스 오픈', en:'Stance Open', d:'왼발을 타겟 라인보다 뒤로 빼는 자세.'},
  {t:'스티브', en:'Stave', d:'공이 아주 짧은 거리로 굴러가는 것.'},
  {t:'스트로크플레이', en:'Stroke Play', d:'총 타수로 승부를 겨루는 경기 방식.'},
  {t:'텀오버', en:'Turnover', d:'공이 공중에서 회전하며 방향이 바뀔는 것.'},
  {t:'업앤다운', en:'Up and Down', d:'그린 미스 후 1칩+1퍼트로 파 세이브.'},
  {t:'유틸리티', en:'Utility', d:'하이브리드 클럽. 아이언+우드의 장점 결합.'},
  {t:'비거리', en:'Distance', d:'티에서 그린까지 또는 클럽별 비거리.'},
  {t:'레이각', en:'Lie Angle', d:'클럽 솔과 지면 사이의 각도.'},
  {t:'바운스', en:'Bounce', d:'웨지 바닥의 볼록한 부분.'},
  {t:'백스윙', en:'Backswing', d:'스윙의 뒤로 들어올리는 동작.'},
  {t:'다운스윙', en:'Downswing', d:'스윙의 위에서 아래로 내려치는 동작.'},
  {t:'팔로스루', en:'Follow Through', d:'공을 친 후 클럽을 계속 휘두르는 동작.'},
  {t:'임팩트', en:'Impact', d:'클럽 페이스가 공에 닿는 순간.'},
  {t:'텍스체어', en:'Texture', d:'그린의 잔디 결과 빠르기.'},
  {t:'컴프레션', en:'Compression', d:'골프공의 단단함 지표 (70/80/90/100).'},
  {t:'클리크', en:'Cleek', d:'오래된 아이언 클럽의 명칭.'},
  {t:'클럽하우스', en:'Clubhouse', d:'골프장 본관 건물.'},
  {t:'카트', en:'Cart', d:'골프장에서 이동에 사용하는 전동차.'},
  {t:'레이아웃', en:'Layout', d:'코스의 전체 설계 및 배치.'},
  {t:'코스레이팅', en:'Course Rating', d:'코스 난이도를 수치화한 값.'},
  {t:'슬로프레이팅', en:'Slope Rating', d:'보기골퍼 대비 난이도 비율 (55~155).'}
];

function renderDictionary(){
  var ov = document.getElementById('v21dictOverlay');
  if(!ov) return;
  var html = '<div class="v21-hdr"><h2><span class="v21i">&#128218;</span> 골프 용어사전 <span style="font-size:14px;color:var(--text-muted)">' + GOLF_DICT.length + '개</span></h2><button class="v21-x" onclick="document.getElementById(\'v21dictOverlay\').classList.remove(\'active\')">&times;</button></div>';
  html += '<div style="margin-bottom:14px"><input class="v21-input" id="v21dictSearch" placeholder="용어 검색..." oninput="v21FilterDict()"></div>';
  html += '<div id="v21dictList">';
  GOLF_DICT.forEach(function(d, i){
    html += '<div class="v21-dict-item" data-idx="' + i + '" onclick="v21ToggleDict(this)"><div class="v21-dict-term">' + d.t + ' <span class="v21-dict-en">' + d.en + '</span></div><div class="v21-dict-def">' + d.d + '</div></div>';
  });
  html += '</div>';

  ov.querySelector('.v21-modal').innerHTML = html;
  ov.classList.add('active');
  playSfx21('dict_open');
}

window.v21ToggleDict = function(el){
  el.classList.toggle('open');
  if(el.classList.contains('open')) playSfx21('dict_open');
};

window.v21FilterDict = function(){
  var q = document.getElementById('v21dictSearch').value.toLowerCase();
  var items = document.querySelectorAll('#v21dictList .v21-dict-item');
  items.forEach(function(item){
    var idx = parseInt(item.dataset.idx);
    var d = GOLF_DICT[idx];
    var match = d.t.toLowerCase().includes(q) || d.en.toLowerCase().includes(q) || d.d.toLowerCase().includes(q);
    item.style.display = match ? '' : 'none';
  });
};

// ─── 7. Pre-Round Checklist ───
var CHECKLIST_ITEMS = [
  {icon:'🏌️', text:'스윙 연습 (10분 레인지)'},
  {icon:'🥊', text:'스트레칭 및 워밍업'},
  {icon:'⛳', text:'퍼팅 연습 (10~30피트)'},
  {icon:'🎯', text:'칩핑/피치 연습'},
  {icon:'🌞', text:'코스 컨디션 확인 (날씨/바람)'},
  {icon:'📋', text:'스코어카드/티마커 준비'},
  {icon:'🧴', text:'선크림/물/간식 챕김'},
  {icon:'🧤', text:'글러브/티/공/볼마커 확인'},
  {icon:'📱', text:'거리측정기/GPS 충전'},
  {icon:'🧘', text:'멘탈 준비 (목표 설정, 호흡법)'}
];

function renderChecklist(){
  var ov = document.getElementById('v21checkOverlay');
  if(!ov) return;
  var saved = JSON.parse(localStorage.getItem('sg_checklist_' + new Date().toISOString().slice(0,10)) || '[]');

  var html = '<div class="v21-hdr"><h2><span class="v21i">&#9989;</span> 프리라운드 체크리스트</h2><button class="v21-x" onclick="document.getElementById(\'v21checkOverlay\').classList.remove(\'active\')">&times;</button></div>';
  html += '<p style="font-size:12px;color:var(--text-muted);margin-bottom:16px">라운드 전 준비 사항을 체크하세요. 오늘 날짜 기준 자동 저장됩니다.</p>';

  var done = 0;
  CHECKLIST_ITEMS.forEach(function(item, i){
    var checked = saved.includes(i);
    if(checked) done++;
    html += '<div class="v21-check-item' + (checked?' done':'') + '" data-idx="' + i + '" onclick="v21ToggleCheck(' + i + ',this)"><div class="v21-check-box">' + (checked?'✓':'') + '</div><div style="flex:1"><span style="font-size:18px;margin-right:6px">' + item.icon + '</span><span style="font-size:13px;font-weight:600">' + item.text + '</span></div></div>';
  });

  html += '<div class="v21-divider"></div>';
  html += '<div style="text-align:center"><div class="v21-progress"><div class="v21-progress-fill" style="width:' + (done/CHECKLIST_ITEMS.length*100) + '%;background:linear-gradient(135deg,var(--primary),#2e9e4f)"></div></div>';
  html += '<span style="font-size:12px;color:var(--text-muted)">' + done + '/' + CHECKLIST_ITEMS.length + ' 완료</span></div>';

  ov.querySelector('.v21-modal').innerHTML = html;
  ov.classList.add('active');
  playSfx21('checklist');
}

window.v21ToggleCheck = function(idx, el){
  var key = 'sg_checklist_' + new Date().toISOString().slice(0,10);
  var saved = JSON.parse(localStorage.getItem(key) || '[]');
  var pos = saved.indexOf(idx);
  if(pos >= 0) saved.splice(pos,1); else saved.push(idx);
  localStorage.setItem(key, JSON.stringify(saved));
  el.classList.toggle('done');
  var box = el.querySelector('.v21-check-box');
  box.textContent = el.classList.contains('done') ? '✓' : '';
  playSfx21('checklist');
  v21CheckAchievements();
};

// ─── 8. Weekly Practice Planner ───
var PRACTICE_TEMPLATES = {
  '월': [{time:'07:00', act:'레인지 스윙 50구'}, {time:'18:00', act:'퍼팅 연습 30분'}],
  '화': [{time:'07:00', act:'칩핑/피치 30분'}, {time:'18:00', act:'피지컬 트레이닝'}],
  '수': [{time:'07:00', act:'레인지 드라이버 50구'}, {time:'18:00', act:'웨지 번커샷 20분'}],
  '목': [{time:'07:00', act:'퍼팅 연습 1시간'}, {time:'18:00', act:'스트레칭 및 휴식'}],
  '금': [{time:'07:00', act:'코스 라운드 전략 수립'}, {time:'18:00', act:'맨탈 트레이닝 및 시각화'}],
  '토': [{time:'06:00', act:'라운드 또는 18홀 시뮬레이션'}],
  '일': [{time:'10:00', act:'경기 분석 및 복습'}, {time:'15:00', act:'해비트 개선점 정리'}]
};

function renderPlanner(){
  var ov = document.getElementById('v21planOverlay');
  if(!ov) return;
  var saved = JSON.parse(localStorage.getItem('sg_practice_plan') || 'null');
  var plan = saved || PRACTICE_TEMPLATES;

  var html = '<div class="v21-hdr"><h2><span class="v21i">&#128197;</span> 주간 연습 플래너</h2><button class="v21-x" onclick="document.getElementById(\'v21planOverlay\').classList.remove(\'active\')">&times;</button></div>';

  var days = ['월','화','수','목','금','토','일'];
  var dayIcons = ['🟢','🔵','🟠','🟣','🔴','⭐','🌟'];
  days.forEach(function(day, di){
    var slots = plan[day] || [];
    html += '<div class="v21-plan-day"><h4>' + dayIcons[di] + ' ' + day + '요일</h4>';
    slots.forEach(function(s, si){
      html += '<div class="v21-plan-slot"><span class="v21-plan-time">' + s.time + '</span><input class="v21-plan-act" value="' + s.act + '" data-day="' + day + '" data-slot="' + si + '" onchange="v21UpdatePlan(this)"></div>';
    });
    html += '<button class="v21-btn v21-btn-sm v21-btn-secondary" onclick="v21AddSlot(\'' + day + '\')">+ 추가</button>';
    html += '</div>';
  });

  html += '<div class="v21-divider"></div>';
  html += '<div class="v21-grid2"><button class="v21-btn v21-btn-primary" onclick="v21SavePlan()">저장</button><button class="v21-btn v21-btn-secondary" onclick="v21ResetPlan()">초기화</button></div>';

  ov.querySelector('.v21-modal').innerHTML = html;
  ov.classList.add('active');
  playSfx21('planner');
}

window.v21UpdatePlan = function(el){
  var day = el.dataset.day;
  var slot = parseInt(el.dataset.slot);
  var plan = JSON.parse(localStorage.getItem('sg_practice_plan') || JSON.stringify(PRACTICE_TEMPLATES));
  if(plan[day] && plan[day][slot]) plan[day][slot].act = el.value;
  localStorage.setItem('sg_practice_plan', JSON.stringify(plan));
};

window.v21AddSlot = function(day){
  var plan = JSON.parse(localStorage.getItem('sg_practice_plan') || JSON.stringify(PRACTICE_TEMPLATES));
  if(!plan[day]) plan[day] = [];
  plan[day].push({time:'12:00', act:'새 연습'});
  localStorage.setItem('sg_practice_plan', JSON.stringify(plan));
  renderPlanner();
};

window.v21SavePlan = function(){
  var inputs = document.querySelectorAll('.v21-plan-act');
  var plan = JSON.parse(localStorage.getItem('sg_practice_plan') || JSON.stringify(PRACTICE_TEMPLATES));
  inputs.forEach(function(el){
    var day = el.dataset.day, slot = parseInt(el.dataset.slot);
    if(plan[day] && plan[day][slot]) plan[day][slot].act = el.value;
  });
  localStorage.setItem('sg_practice_plan', JSON.stringify(plan));
  showToast21('연습 플래너 저장 완료', 'success');
  playSfx21('planner');
  v21CheckAchievements();
};

window.v21ResetPlan = function(){
  localStorage.removeItem('sg_practice_plan');
  renderPlanner();
  showToast21('플래너 초기화됨', 'info');
};

// ─── 9. Golf IQ v6 Quiz (15 new questions) ───
var QUIZ_V6 = [
  {q:'스트로크스 게인드(SG)를 처음 도입한 투어는?', a:['유럽 PGA','PGA 투어','LPGA','KPGA'], c:1, e:'PGA 투어가 2011년 ShotLink 데이터로 SG 통계를 처음 도입했습니다.'},
  {q:'USGA 핸디캡 인덱스 계산 시 사용하는 최근 스코어 수는?', a:['5개','8개','10개','20개'], c:1, e:'최근 20라운드 중 베스트 8개 스코어 차이(Score Differential)를 사용합니다.'},
  {q:'골프 공의 딩플(dimple) 개수는 보통 몇 개?', a:['100~200','250~350','300~500','500~600'], c:2, e:'보통 300~500개의 딩플이 있으며, 공기역학적 양력을 발생시킵니다.'},
  {q:'스티프미터 수치가 12이면 그린 스피드는?', a:['느림','보통','빠름','매우 빠름'], c:3, e:'스티프미터 12 이상은 투어 수준의 매우 빠른 그린입니다.'},
  {q:'골프에서 \"레이업\" 전략을 사용하는 가장 좋은 상황은?', a:['티샷 시','해저드 앞에서','그린 근처에서','번커 안에서'], c:1, e:'해저드 앞에서 무리하지 않고 안전한 거리에 놓는 것이 레이업입니다.'},
  {q:'나쏠(Nassau) 배팅에서 전반 9홀 승자가 받는 배팅 비율은?', a:['전체의 1/4','전체의 1/3','전체의 1/2','전체의 2/3'], c:1, e:'나쏠는 전반/후반/전체 3판으로 각 1/3 비율입니다.'},
  {q:'R&A와 USGA가 골프 규칙을 통합한 연도는?', a:['2000년','2010년','2019년','2023년'], c:2, e:'2019년 1월 1일부터 통합 골프 규칙이 시행되었습니다.'},
  {q:'파4 홀에서 GIR을 달성하려면 몇 타 이내에 그린에 올려야 하나?', a:['1타','2타','3타','4타'], c:1, e:'GIR = 파-2 이하. 파4의 경우 2타 이내입니다.'},
  {q:'골프에서 \"스킨스 게임\"의 규칙은?', a:['전체 타수 합산','홀별 최저타 승자 판돈','팀 베스트볼','더블스 매치'], c:1, e:'스킨스는 홀별 최저타수 기록자가 판돈을 가져갑니다.'},
  {q:'코스 슬로프 레이팅의 표준값은?', a:['100','113','120','135'], c:1, e:'슬로프 레이팅 113이 표준 난이도입니다.'},
  {q:'공이 바운스 후 워터 해저드에 빠졌을 때 벌타는?', a:['벌타 없음','1벌타','2벌타','3벌타'], c:1, e:'레드 페널티 에어리어(워터 해저드) 진입 시 1벌타입니다.'},
  {q:'프리샷 루틴에서 가장 중요한 요소는?', a:['스윙 속도','일관성','힘','길이'], c:1, e:'프리샷 루틴의 핵심은 매번 동일하게 반복하는 일관성입니다.'},
  {q:'골프장에서 \"카트 패스\"란?', a:['카트 이동 경로','카트 비용','카트 예약','카트 반납'], c:0, e:'카트 패스는 골프 카트의 이동 경로입니다.'},
  {q:'공이 그린에 올라간 뒤 1퍼트로 마무리하면 이것은?', a:['파 세이브','업 앤 다운','버디 치프','샌드 세이브'], c:1, e:'그린 미스 후 1칩+1퍼트로 파를 만드는 것이 업앤다운입니다.'}
];

function renderQuizV6(){
  var ov = document.getElementById('v21quizOverlay');
  if(!ov) return;
  var state = { current:0, score:0, answers:[], done:false };

  function renderQ(){
    var q = QUIZ_V6[state.current];
    var html = '<div class="v21-hdr"><h2><span class="v21i">&#129504;</span> Golf IQ v6</h2><button class="v21-x" onclick="document.getElementById(\'v21quizOverlay\').classList.remove(\'active\')">&times;</button></div>';
    html += '<div style="display:flex;justify-content:space-between;margin-bottom:14px"><span style="font-size:13px;font-weight:700">' + (state.current+1) + '/' + QUIZ_V6.length + '</span><span style="font-size:13px;font-weight:700;color:var(--primary)">점수: ' + state.score + '</span></div>';
    html += '<div class="v21-progress"><div class="v21-progress-fill" style="width:' + ((state.current+1)/QUIZ_V6.length*100) + '%;background:linear-gradient(135deg,var(--primary),#2e9e4f)"></div></div>';
    html += '<div class="v21-card"><h4>' + q.q + '</h4></div>';
    q.a.forEach(function(a, ai){
      html += '<button class="v21-btn v21-btn-secondary" style="width:100%;margin-bottom:8px;justify-content:flex-start" onclick="v21AnswerQuiz(' + ai + ',' + q.c + ')">' + (ai+1) + '. ' + a + '</button>';
    });
    ov.querySelector('.v21-modal').innerHTML = html;
  }

  function renderResult(){
    var pct = Math.round(state.score/QUIZ_V6.length*100);
    var grade = pct>=90?'S':pct>=80?'A':pct>=60?'B':pct>=40?'C':'D';
    var html = '<div class="v21-hdr"><h2><span class="v21i">&#129504;</span> Golf IQ v6 결과</h2><button class="v21-x" onclick="document.getElementById(\'v21quizOverlay\').classList.remove(\'active\')">&times;</button></div>';
    html += '<div style="text-align:center;margin-bottom:20px"><div style="font-size:72px;font-weight:900;color:var(--primary)">' + grade + '</div><div style="font-size:14px;color:var(--text-muted)">' + state.score + '/' + QUIZ_V6.length + ' (' + pct + '%)</div></div>';

    var best = parseInt(localStorage.getItem('sg_quiz_v6_best') || '0');
    if(state.score > best){
      localStorage.setItem('sg_quiz_v6_best', state.score);
      html += '<div class="v21-card" style="text-align:center;border-color:var(--primary)"><h4>🎉 신기록!</h4></div>';
    }

    html += '<button class="v21-btn v21-btn-primary" style="width:100%" onclick="v21StartQuiz()">다시 풀기</button>';
    ov.querySelector('.v21-modal').innerHTML = html;
    v21CheckAchievements();
  }

  window.v21AnswerQuiz = function(selected, correct){
    if(selected === correct) state.score++;
    state.answers.push(selected);
    playSfx21('quiz21');
    if(state.current < QUIZ_V6.length - 1){
      state.current++;
      renderQ();
    } else {
      state.done = true;
      renderResult();
    }
  };

  window.v21StartQuiz = function(){
    state.current = 0; state.score = 0; state.answers = []; state.done = false;
    renderQ();
  };

  renderQ();
  ov.classList.add('active');
  playSfx21('quiz21');
}

// ─── 10. Achievements (12 new: 80→92) ───
var V21_ACHIEVEMENTS = [
  {id:'sg_analyst', name:'SG 분석가', desc:'Strokes Gained 분석기 처음 사용', icon:'📈'},
  {id:'share_master', name:'공유 마스터', desc:'스코어 공유 카드 생성', icon:'📤'},
  {id:'putt_tracker', name:'텀트 추적자', desc:'텀트 트래커 처음 기록', icon:'⛳'},
  {id:'putt_master', name:'텀트 마스터', desc:'평균 32텀트 이하 달성', icon:'🏆'},
  {id:'one_putt_king', name:'1텀트 킹', desc:'한 라운드 7회 이상 1텀트', icon:'👑'},
  {id:'round_compare', name:'비교 분석가', desc:'라운드 비교 처음 사용', icon:'🔍'},
  {id:'booking_user', name:'예약 활용가', desc:'예약 바로가기 처음 사용', icon:'🔗'},
  {id:'dict_scholar', name:'골프 학자', desc:'용어사전 50개 이상 열람', icon:'📚'},
  {id:'prep_ready', name:'완벽 준비', desc:'체크리스트 10개 모두 완료', icon:'✅'},
  {id:'plan_setter', name:'계획적 골퍼', desc:'주간 플래너 처음 저장', icon:'📋'},
  {id:'quiz_v6_pass', name:'Golf IQ v6 합격', desc:'Golf IQ v6 퀴즈 B등급 이상', icon:'🧠'},
  {id:'all_rounder_v21', name:'v21 올라운더', desc:'v21 기능 10개 중 8개 이상 사용', icon:'🌟'}
];

function v21CheckAchievements(){
  var unlocked = JSON.parse(localStorage.getItem('sg_v21_achievements') || '[]');
  var newUnlocks = [];

  var postRounds = JSON.parse(localStorage.getItem('sg_post_rounds') || '[]');
  var puttRecords = JSON.parse(localStorage.getItem('sg_putt_records') || '[]');
  var quizBest = parseInt(localStorage.getItem('sg_quiz_v6_best') || '0');
  var todayKey = 'sg_checklist_' + new Date().toISOString().slice(0,10);
  var checklist = JSON.parse(localStorage.getItem(todayKey) || '[]');
  var plan = localStorage.getItem('sg_practice_plan');

  function check(id, cond){
    if(!unlocked.includes(id) && cond){
      unlocked.push(id);
      newUnlocks.push(id);
    }
  }

  check('sg_analyst', postRounds.length > 0 || document.getElementById('v21sgResult'));
  check('putt_tracker', puttRecords.length > 0);
  check('putt_master', puttRecords.some(function(r){return r.total <= 32;}));
  check('one_putt_king', puttRecords.some(function(r){return r.onePutt >= 7;}));
  check('quiz_v6_pass', quizBest >= 9);
  check('prep_ready', checklist.length >= 10);
  check('plan_setter', plan !== null);

  localStorage.setItem('sg_v21_achievements', JSON.stringify(unlocked));

  newUnlocks.forEach(function(id){
    var ach = V21_ACHIEVEMENTS.find(function(a){return a.id===id;});
    if(ach) showToast21(ach.icon + ' 업적 해금: ' + ach.name, 'success');
  });
}

// ─── Create Overlays ───
var overlayIds = ['v21sgOverlay','v21shareOverlay','v21puttOverlay','v21compareOverlay','v21bookingOverlay','v21dictOverlay','v21checkOverlay','v21planOverlay','v21quizOverlay'];
overlayIds.forEach(function(id){
  var ov = document.createElement('div');
  ov.id = id;
  ov.className = 'v21-overlay';
  ov.innerHTML = '<div class="v21-modal"></div>';
  ov.addEventListener('click', function(e){ if(e.target === ov) ov.classList.remove('active'); });
  document.body.appendChild(ov);
});

// ─── Menu Buttons ───
function injectV21Buttons(){
  var container = document.querySelector('.search-section') || document.querySelector('.header');
  if(!container) return;
  var bar = document.createElement('div');
  bar.style.cssText = 'display:flex;gap:6px;flex-wrap:wrap;margin-top:10px;padding:0 20px;max-width:1400px;margin-left:auto;margin-right:auto;';
  var btns = [
    {label:'📈 SG분석', fn:'renderSGOverlay'},
    {label:'🎨 공유카드', fn:'renderShareCard'},
    {label:'⛳ 텀트트래커', fn:'renderPuttTracker'},
    {label:'🔄 라운드비교', fn:'renderComparison'},
    {label:'🔗 예약바로가기', fn:'renderBooking'},
    {label:'📚 용어사전', fn:'renderDictionary'},
    {label:'✅ 체크리스트', fn:'renderChecklist'},
    {label:'📅 연습플래너', fn:'renderPlanner'},
    {label:'🧠 Quiz v6', fn:'renderQuizV6'}
  ];
  btns.forEach(function(b){
    var btn = document.createElement('button');
    btn.textContent = b.label;
    btn.style.cssText = 'padding:7px 14px;border:1.5px solid var(--border);border-radius:22px;background:var(--card-bg);font-size:11px;font-weight:700;cursor:pointer;transition:.25s;color:var(--text);white-space:nowrap;';
    btn.addEventListener('mouseenter', function(){ btn.style.borderColor='var(--primary)'; btn.style.color='var(--primary)'; });
    btn.addEventListener('mouseleave', function(){ btn.style.borderColor='var(--border)'; btn.style.color='var(--text)'; });
    btn.addEventListener('click', function(){ window[b.fn](); });
    bar.appendChild(btn);
  });
  container.parentNode.insertBefore(bar, container.nextSibling);
}

// ─── Keyboard Shortcuts ───
document.addEventListener('keydown', function(e){
  var t = e.target.tagName;
  if(t === 'INPUT' || t === 'TEXTAREA' || t === 'SELECT') return;
  if(!e.shiftKey) return;
  switch(e.key){
    case 'G': renderSGOverlay(); e.preventDefault(); break;
    case 'C': renderShareCard(); e.preventDefault(); break;
    case 'T': renderPuttTracker(); e.preventDefault(); break;
    case 'R': renderComparison(); e.preventDefault(); break;
    case 'B': renderBooking(); e.preventDefault(); break;
    case 'V': renderDictionary(); e.preventDefault(); break;
    case 'K': renderChecklist(); e.preventDefault(); break;
    case 'J': renderPlanner(); e.preventDefault(); break;
    case 'I': renderQuizV6(); e.preventDefault(); break;
  }
});

// ─── Escape to close ───
document.addEventListener('keydown', function(e){
  if(e.key === 'Escape'){
    overlayIds.forEach(function(id){
      var el = document.getElementById(id);
      if(el) el.classList.remove('active');
    });
  }
});

// ─── Init ───
window.renderSGOverlay = renderSGOverlay;
window.renderShareCard = renderShareCard;
window.renderPuttTracker = renderPuttTracker;
window.renderComparison = renderComparison;
window.renderBooking = renderBooking;
window.renderDictionary = renderDictionary;
window.renderChecklist = renderChecklist;
window.renderPlanner = renderPlanner;
window.renderQuizV6 = renderQuizV6;

setTimeout(injectV21Buttons, 800);
setTimeout(v21CheckAchievements, 2000);

})();
