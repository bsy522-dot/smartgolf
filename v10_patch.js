(function(){
'use strict';

// === SmartGolf v10.0 Patch ===

var css10 = document.createElement('style');
css10.textContent = `
.v10-overlay{position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,.74);z-index:10010;display:none;align-items:center;justify-content:center;backdrop-filter:blur(8px)}
.v10-overlay.active{display:flex}
.v10-modal{background:var(--card-bg,#fff);border-radius:24px;padding:28px;width:95%;max-width:660px;max-height:92vh;overflow-y:auto;box-shadow:0 32px 100px rgba(0,0,0,.5);animation:v10Rise .45s cubic-bezier(.22,1,.36,1)}
@keyframes v10Rise{from{opacity:0;transform:translateY(50px) scale(.93)}to{opacity:1;transform:translateY(0) scale(1)}}
.v10-hdr{display:flex;justify-content:space-between;align-items:center;margin-bottom:20px}
.v10-hdr h2{font-size:21px;font-weight:800;display:flex;align-items:center;gap:10px}
.v10-hdr h2 .v10i{font-size:26px}
.v10-x{background:none;border:none;font-size:26px;cursor:pointer;color:var(--text-muted);padding:4px 10px;border-radius:10px;transition:.2s}
.v10-x:hover{background:var(--border);color:var(--text)}
.v10-tabs{display:flex;gap:6px;margin-bottom:18px;overflow-x:auto;padding-bottom:4px;scrollbar-width:none}
.v10-tabs::-webkit-scrollbar{display:none}
.v10-tab{padding:9px 18px;border-radius:24px;border:1.5px solid var(--border);background:var(--bg);font-size:12px;font-weight:700;cursor:pointer;white-space:nowrap;transition:.25s}
.v10-tab.active{background:var(--primary);color:#fff;border-color:var(--primary);box-shadow:0 3px 12px rgba(26,122,58,.35)}
.v10-card{background:var(--bg);border-radius:16px;padding:18px;margin-bottom:12px;transition:.25s;border:1.5px solid transparent}
.v10-card:hover{border-color:var(--primary);transform:translateY(-2px);box-shadow:0 4px 16px rgba(26,122,58,.12)}
.v10-card h4{font-size:15px;font-weight:700;margin-bottom:8px;display:flex;align-items:center;gap:8px}
.v10-card p{font-size:12px;color:var(--text-muted);line-height:1.6}
.v10-btn{padding:11px 22px;border:none;border-radius:14px;font-size:13px;font-weight:700;cursor:pointer;transition:.25s;display:inline-flex;align-items:center;gap:6px}
.v10-btn-primary{background:linear-gradient(135deg,var(--primary),#34a853);color:#fff}
.v10-btn-primary:hover{transform:translateY(-2px);box-shadow:0 8px 20px rgba(26,122,58,.4)}
.v10-btn-sm{padding:7px 14px;font-size:11px;border-radius:10px}
.v10-input{width:100%;padding:11px 16px;border:2px solid var(--border);border-radius:12px;font-size:13px;background:var(--bg);color:var(--text);transition:.2s}
.v10-input:focus{border-color:var(--primary);outline:none;box-shadow:0 0 0 3px rgba(26,122,58,.1)}
.v10-select{width:100%;padding:11px 16px;border:2px solid var(--border);border-radius:12px;font-size:13px;background:var(--bg);color:var(--text);cursor:pointer}
.v10-label{display:block;font-size:12px;font-weight:700;color:var(--text-muted);margin-bottom:6px;text-transform:uppercase;letter-spacing:.5px}
.v10-grid2{display:grid;grid-template-columns:1fr 1fr;gap:12px}
.v10-grid3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px}
@media(max-width:500px){.v10-grid2,.v10-grid3{grid-template-columns:1fr}}
.v10-divider{height:1px;background:var(--border);margin:18px 0}
.v10-badge{display:inline-block;padding:4px 12px;border-radius:14px;font-size:11px;font-weight:700}
.v10-badge-green{background:#e8f5e9;color:#2e7d32}
.v10-badge-blue{background:#e3f2fd;color:#1565c0}
.v10-badge-orange{background:#fff3e0;color:#e65100}
.v10-badge-gold{background:linear-gradient(135deg,#fff8e1,#ffe082);color:#5a3e00}
.v10-badge-purple{background:#f3e5f5;color:#7b1fa2}
[data-theme="dark"] .v10-badge-green{background:#1a3a25;color:#7bed9f}
[data-theme="dark"] .v10-badge-blue{background:#1a2a3a;color:#7ab8f5}
[data-theme="dark"] .v10-badge-orange{background:#3a2a1a;color:#f0c070}
[data-theme="dark"] .v10-badge-gold{background:#3a3000;color:#ffd54f}
[data-theme="dark"] .v10-badge-purple{background:#2a1a3a;color:#ce93d8}
.v10-progress{width:100%;height:12px;background:var(--border);border-radius:6px;overflow:hidden;margin:10px 0}
.v10-progress-fill{height:100%;border-radius:6px;background:linear-gradient(90deg,var(--primary),#7bed9f);transition:width .6s ease}
.v10-stat{background:var(--bg);border-radius:14px;padding:14px;text-align:center}
.v10-stat .v10-sv{font-size:1.5em;font-weight:800;color:var(--primary)}
.v10-stat .v10-sl{font-size:0.7em;color:var(--text-muted);margin-top:4px}
.v10-metronome-ring{width:120px;height:120px;border-radius:50%;border:6px solid var(--border);position:relative;margin:0 auto 16px;display:flex;align-items:center;justify-content:center;transition:.3s}
.v10-metronome-ring.active{border-color:var(--primary);box-shadow:0 0 20px rgba(26,122,58,.3)}
.v10-metronome-bpm{font-size:32px;font-weight:800;color:var(--primary)}
.v10-metronome-label{font-size:10px;color:var(--text-muted);margin-top:2px}
.v10-metronome-dot{position:absolute;width:14px;height:14px;border-radius:50%;background:var(--primary);top:-7px;left:50%;margin-left:-7px;transition:transform .1s;opacity:.7}
.v10-metronome-dot.beat{opacity:1;transform:scale(1.5);box-shadow:0 0 12px rgba(26,122,58,.6)}
.v10-shot-card{background:var(--bg);border-radius:16px;padding:16px;margin-bottom:10px;border-left:4px solid var(--primary);cursor:pointer;transition:.2s}
.v10-shot-card:hover{transform:translateX(4px);box-shadow:0 2px 12px rgba(0,0,0,.08)}
.v10-shot-card h5{font-size:14px;font-weight:700;margin-bottom:4px;display:flex;align-items:center;gap:6px}
.v10-shot-card .v10-sd{font-size:12px;color:var(--text-muted);line-height:1.6}
.v10-lesson{background:var(--bg);border-radius:16px;padding:18px;margin-bottom:12px;position:relative;overflow:hidden}
.v10-lesson::before{content:'';position:absolute;top:0;left:0;width:4px;height:100%;background:linear-gradient(180deg,var(--primary),#7bed9f)}
.v10-lesson h5{font-size:14px;font-weight:700;margin-bottom:6px;padding-left:12px;display:flex;align-items:center;gap:6px}
.v10-lesson p{font-size:12px;color:var(--text-muted);line-height:1.7;padding-left:12px}
.v10-lesson .v10-step{display:flex;align-items:flex-start;gap:10px;margin-top:8px;padding-left:12px}
.v10-lesson .v10-sn{width:24px;height:24px;border-radius:50%;background:var(--primary);color:#fff;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;flex-shrink:0}
.v10-lesson .v10-st{font-size:12px;line-height:1.5;flex:1}
.v10-cal-grid{display:grid;grid-template-columns:repeat(7,1fr);gap:4px;margin-top:10px}
.v10-cal-hdr{font-size:10px;font-weight:700;text-align:center;color:var(--text-muted);padding:4px}
.v10-cal-day{text-align:center;font-size:11px;padding:6px 2px;border-radius:8px;cursor:pointer;transition:.2s;min-height:32px;display:flex;align-items:center;justify-content:center}
.v10-cal-day:hover{background:var(--primary-light)}
.v10-cal-day.today{border:2px solid var(--primary);font-weight:700}
.v10-cal-day.has-round{background:var(--primary);color:#fff;font-weight:700}
.v10-cal-day.has-practice{background:#e3f2fd;color:#1565c0;font-weight:700}
[data-theme="dark"] .v10-cal-day.has-practice{background:#1a2a3a;color:#7ab8f5}
.v10-cal-day.empty{opacity:.3;cursor:default}
.v10-cal-nav{display:flex;justify-content:space-between;align-items:center;margin-bottom:8px}
.v10-cal-nav button{background:none;border:1px solid var(--border);border-radius:8px;padding:6px 12px;cursor:pointer;font-weight:700;color:var(--text);transition:.2s}
.v10-cal-nav button:hover{border-color:var(--primary);color:var(--primary)}
.v10-cal-nav span{font-size:15px;font-weight:800}
.v10-journal-entry{background:var(--bg);border-radius:14px;padding:14px;margin-bottom:10px;border-left:4px solid #42a5f5}
.v10-journal-entry h5{font-size:13px;font-weight:700;margin-bottom:4px;display:flex;justify-content:space-between}
.v10-journal-entry p{font-size:12px;color:var(--text-muted);line-height:1.5}
.v10-journal-entry .v10-jd{font-size:10px;color:var(--text-muted)}
.v10-share-preview{background:linear-gradient(135deg,#1a7a3a,#0f5a28);border-radius:16px;padding:24px;color:#fff;margin:16px 0;text-align:center}
.v10-share-preview h3{font-size:18px;font-weight:800;margin-bottom:8px}
.v10-share-preview .v10-sp-stats{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-top:12px}
.v10-share-preview .v10-sp-item{background:rgba(255,255,255,.15);border-radius:12px;padding:10px}
.v10-share-preview .v10-sp-val{font-size:18px;font-weight:800}
.v10-share-preview .v10-sp-lbl{font-size:10px;opacity:.8;margin-top:2px}
.v10-quote{background:linear-gradient(135deg,var(--primary-light),rgba(123,237,159,.08));border-radius:16px;padding:20px;margin:12px 0;text-align:center;border:1px solid rgba(26,122,58,.15)}
.v10-quote .v10-qt{font-size:15px;font-style:italic;font-weight:600;line-height:1.6;margin-bottom:8px}
.v10-quote .v10-qa{font-size:12px;color:var(--text-muted)}
[data-theme="dark"] .v10-quote{background:linear-gradient(135deg,#1b3a25,rgba(123,237,159,.03));border-color:rgba(123,237,159,.1)}
.v10-goal-item{background:var(--bg);border-radius:14px;padding:14px;margin-bottom:10px;display:flex;align-items:center;gap:12px}
.v10-goal-check{width:28px;height:28px;border-radius:50%;border:2.5px solid var(--border);cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:14px;color:transparent;transition:.2s;flex-shrink:0}
.v10-goal-check.done{background:var(--primary);border-color:var(--primary);color:#fff}
.v10-goal-text{flex:1}
.v10-goal-text h5{font-size:13px;font-weight:700;margin-bottom:2px}
.v10-goal-text p{font-size:11px;color:var(--text-muted)}
.v10-qrow{display:flex;gap:8px;flex-wrap:wrap;justify-content:center;margin:8px 0}
.v10-qbtn{display:flex;flex-direction:column;align-items:center;gap:4px;padding:11px 14px;border-radius:14px;background:var(--card-bg);border:1.5px solid var(--border);cursor:pointer;transition:.25s;font-size:10px;font-weight:700;color:var(--text);min-width:68px;text-align:center}
.v10-qbtn:hover{border-color:var(--primary);background:var(--primary-light);transform:translateY(-3px);box-shadow:0 6px 16px rgba(26,122,58,.18)}
.v10-qbtn .v10-qi{font-size:24px;line-height:1}
.v10-daily-card{background:linear-gradient(135deg,var(--primary),#34a853);border-radius:16px;padding:20px;color:#fff;margin:12px 0;text-align:center}
.v10-daily-card h4{font-size:16px;font-weight:800;margin-bottom:12px}
.v10-daily-opt{display:block;width:100%;padding:12px 16px;border:2px solid rgba(255,255,255,.3);border-radius:12px;background:rgba(255,255,255,.1);font-size:13px;font-weight:600;cursor:pointer;transition:.2s;margin-bottom:8px;text-align:left;color:#fff}
.v10-daily-opt:hover{background:rgba(255,255,255,.2);border-color:rgba(255,255,255,.5)}
.v10-daily-opt.correct{border-color:#7bed9f;background:rgba(123,237,159,.25)}
.v10-daily-opt.wrong{border-color:#ff6b6b;background:rgba(255,107,107,.2)}
`;
document.head.appendChild(css10);

// ====================================================================
// 1. WEB AUDIO SFX (v10)
// ====================================================================
var v10Ctx = null;
function getV10Ctx(){
  if(!v10Ctx) try{v10Ctx=new(window.AudioContext||window.webkitAudioContext)()}catch(e){}
  return v10Ctx;
}
function v10Sfx(type){
  var ctx=getV10Ctx();if(!ctx)return;
  var o=ctx.createOscillator(),g=ctx.createGain();
  o.connect(g);g.connect(ctx.destination);
  var t=ctx.currentTime;
  switch(type){
    case 'metronome':
      o.type='sine';o.frequency.setValueAtTime(880,t);
      g.gain.setValueAtTime(.25,t);g.gain.linearRampToValueAtTime(0,t+.06);o.start(t);o.stop(t+.08);break;
    case 'metronome_accent':
      o.type='sine';o.frequency.setValueAtTime(1174,t);
      g.gain.setValueAtTime(.3,t);g.gain.linearRampToValueAtTime(0,t+.08);o.start(t);o.stop(t+.1);break;
    case 'goal_complete':
      o.type='sine';o.frequency.setValueAtTime(523,t);o.frequency.setValueAtTime(659,t+.1);o.frequency.setValueAtTime(784,t+.2);o.frequency.setValueAtTime(1047,t+.3);
      g.gain.setValueAtTime(.2,t);g.gain.linearRampToValueAtTime(0,t+.5);o.start(t);o.stop(t+.5);break;
    case 'journal':
      o.type='triangle';o.frequency.setValueAtTime(392,t);o.frequency.linearRampToValueAtTime(523,t+.15);
      g.gain.setValueAtTime(.15,t);g.gain.linearRampToValueAtTime(0,t+.3);o.start(t);o.stop(t+.3);break;
    case 'share':
      o.type='sine';o.frequency.setValueAtTime(659,t);o.frequency.setValueAtTime(784,t+.08);o.frequency.setValueAtTime(1047,t+.16);
      g.gain.setValueAtTime(.18,t);g.gain.linearRampToValueAtTime(0,t+.35);o.start(t);o.stop(t+.35);break;
    case 'daily':
      o.type='triangle';o.frequency.setValueAtTime(440,t);o.frequency.linearRampToValueAtTime(660,t+.2);
      g.gain.setValueAtTime(.15,t);g.gain.linearRampToValueAtTime(0,t+.4);o.start(t);o.stop(t+.4);break;
  }
}

// ====================================================================
// 2. OVERLAY
// ====================================================================
var v10Ov = document.createElement('div');
v10Ov.className='v10-overlay';
v10Ov.setAttribute('role','dialog');
v10Ov.setAttribute('aria-modal','true');
v10Ov.innerHTML='<div class="v10-modal" id="v10MC"></div>';
document.body.appendChild(v10Ov);
v10Ov.addEventListener('click',function(e){if(e.target===v10Ov)v10Ov.classList.remove('active')});

function showV10(html){document.getElementById('v10MC').innerHTML=html;v10Ov.classList.add('active')}
function closeV10(){v10Ov.classList.remove('active')}

function v10TabSwitch(container,prefix){
  container.querySelectorAll('.v10-tab').forEach(function(tab){
    tab.addEventListener('click',function(){
      container.querySelectorAll('.v10-tab').forEach(function(t){t.classList.remove('active')});
      tab.classList.add('active');
      var id=tab.getAttribute('data-v10t');
      container.querySelectorAll('[data-v10p]').forEach(function(p){p.style.display=p.getAttribute('data-v10p')===id?'block':'none'});
    });
  });
}

// ====================================================================
// 3. SWING TEMPO METRONOME
// ====================================================================
var metroInterval=null,metroBeat=0;

function renderMetronome(){
  v10Sfx('metronome');
  var bpm=parseInt(localStorage.getItem('sg_metro_bpm')||'72');
  var beats=parseInt(localStorage.getItem('sg_metro_beats')||'4');
  var html='<div class="v10-hdr"><h2><span class="v10i">&#x1F3B5;</span> &#xC2A4;&#xC719; &#xD15C;&#xD3EC; &#xBA54;&#xD2B8;&#xB85C;&#xB188;</h2><button class="v10-x" onclick="closeV10()">&times;</button></div>';
  html+='<div class="v10-tabs"><button class="v10-tab active" data-v10t="metro">&#xBA54;&#xD2B8;&#xB85C;&#xB188;</button><button class="v10-tab" data-v10t="guide">&#xD15C;&#xD3EC; &#xAC00;&#xC774;&#xB4DC;</button><button class="v10-tab" data-v10t="presets">&#xD504;&#xB9AC;&#xC14B;</button></div>';

  html+='<div data-v10p="metro">';
  html+='<div class="v10-metronome-ring" id="v10MetroRing"><div class="v10-metronome-dot" id="v10MetroDot"></div><div style="text-align:center"><div class="v10-metronome-bpm" id="v10BpmVal">'+bpm+'</div><div class="v10-metronome-label">BPM</div></div></div>';
  html+='<div style="text-align:center;margin-bottom:16px"><input type="range" min="40" max="160" value="'+bpm+'" style="width:80%;accent-color:var(--primary)" id="v10BpmSlider"><div style="display:flex;justify-content:space-between;font-size:10px;color:var(--text-muted);padding:0 10%"><span>40</span><span>100</span><span>160</span></div></div>';
  html+='<div class="v10-grid2" style="margin-bottom:16px"><div><label class="v10-label">&#xBC15;&#xC790;</label><select class="v10-select" id="v10BeatsSel"><option value="3"'+(beats===3?' selected':'')+'>3/4 (&#xC654;&#xCE20;)</option><option value="4"'+(beats===4?' selected':'')+'>4/4 (&#xAE30;&#xBCF8;)</option><option value="6"'+(beats===6?' selected':'')+'>6/8</option></select></div><div style="display:flex;align-items:end;gap:8px"><button class="v10-btn v10-btn-primary" style="flex:1" id="v10MetroStart" onclick="toggleMetro()">&#x25B6; &#xC2DC;&#xC791;</button></div></div>';
  html+='<div class="v10-card"><h4>&#x1F3CC;&#xFE0F; &#xC2A4;&#xC719; &#xD15C;&#xD3EC; &#xD301;</h4><p>&#xBC31;&#xC2A4;&#xC719;: 3&#xBC15;&#xC790; / &#xB2E4;&#xC6B4;&#xC2A4;&#xC719;: 1&#xBC15;&#xC790; / &#xC784;&#xD329;&#xD2B8; &#xC21C;&#xAC04;&#xC5D0; &#xBE44;&#xD2B8;&#xC640; &#xB9DE;&#xCDA4;&#xC138;&#xC694;. &#xD504;&#xB85C; &#xAC00;&#xC774;&#xB4DC; BPM: 70-80 (&#xB290;&#xB9BC;) / 80-90 (&#xBCF4;&#xD1B5;) / 90-100 (&#xBE60;&#xB984;)</p></div>';
  html+='</div>';

  html+='<div data-v10p="guide" style="display:none">';
  var tempoGuides=[
    {title:'&#xBC31;&#xC2A4;&#xC719; &#xD15C;&#xD3EC;',desc:'&#xD074;&#xB7FD;&#xC744; &#xB4A4;&#xB85C; &#xAC00;&#xC838;&#xAC00;&#xB294; &#xB3D9;&#xC791;. &#xCC9C;&#xCC9C;&#xD788; &#xBD80;&#xB4DC;&#xB7FD;&#xAC8C; 3&#xBC15;&#xC790;&#xC5D0; &#xAC78;&#xCCD0; &#xC644;&#xC131;. &#xC5B4;&#xAE68;&#xAC00; &#xCDA9;&#xBD84;&#xD788; &#xD68C;&#xC804;&#xD560; &#xB54C;&#xAE4C;&#xC9C0; &#xAE30;&#xB2E4;&#xB9AC;&#xC138;&#xC694;.',bpm:'60-72'},
    {title:'&#xD2B8;&#xB79C;&#xC9C0;&#xC158;',desc:'&#xBC31;&#xC2A4;&#xC719; &#xC815;&#xC810;&#xC5D0;&#xC11C; &#xB2E4;&#xC6B4;&#xC2A4;&#xC719;&#xC73C;&#xB85C; &#xC804;&#xD658;&#xD558;&#xB294; &#xC21C;&#xAC04;. &#xD558;&#xCCB4; &#xB9AC;&#xB4DC;, &#xC0C1;&#xCCB4;&#xB294; &#xC790;&#xC5F0;&#xC2A4;&#xB7FD;&#xAC8C; &#xB530;&#xB77C;&#xAC11;&#xB2C8;&#xB2E4;.',bpm:'&#xC21C;&#xAC04;&#xC801;'},
    {title:'&#xB2E4;&#xC6B4;&#xC2A4;&#xC719;',desc:'&#xD074;&#xB7FD;&#xC744; &#xBCFC;&#xB85C; &#xAC00;&#xC838;&#xAC00;&#xB294; &#xB3D9;&#xC791;. &#xC784;&#xD329;&#xD2B8; &#xC21C;&#xAC04;&#xC5D0; &#xAC00;&#xC18D;&#xD558;&#xBA70; 1&#xBC15;&#xC790; &#xB9CC;&#xC5D0; &#xC644;&#xC131;.',bpm:'100-120'},
    {title:'&#xD314;&#xB85C;&#xC2A4;&#xB8E8;',desc:'&#xC784;&#xD329;&#xD2B8; &#xD6C4; &#xD074;&#xB7FD;&#xC774; &#xBAB8; &#xC8FC;&#xC704;&#xB97C; &#xAC10;&#xC2F8;&#xBA70; &#xB9C8;&#xBB34;&#xB9AC;. &#xC5B4;&#xAE68;&#xB85C; &#xD131;&#xC744; &#xAC00;&#xB9AC;&#xD0A4;&#xB294; &#xB290;&#xB08C;&#xC73C;&#xB85C;.',bpm:'40-60'}
  ];
  tempoGuides.forEach(function(tg){
    html+='<div class="v10-card"><h4>'+tg.title+' <span class="v10-badge v10-badge-green">'+tg.bpm+' BPM</span></h4><p>'+tg.desc+'</p></div>';
  });
  html+='</div>';

  html+='<div data-v10p="presets" style="display:none">';
  var presets=[
    {name:'&#xCD08;&#xBCF4;&#xC790; &#xC5F0;&#xC2B5;',bpm:60,desc:'&#xCC9C;&#xCC9C;&#xD788; &#xD3FC; &#xC815;&#xB9BD;&#xC5D0; &#xC9D1;&#xC911;'},
    {name:'&#xD504;&#xB85C; &#xD45C;&#xC900;',bpm:76,desc:'PGA &#xD22C;&#xC5B4; &#xD3C9;&#xADE0; &#xC2A4;&#xC719; &#xD15C;&#xD3EC;'},
    {name:'&#xBE60;&#xB978; &#xD15C;&#xD3EC;',bpm:92,desc:'&#xACBD;&#xC7C1; &#xB77C;&#xC6B4;&#xB4DC;&#xC6A9; &#xBE60;&#xB978; &#xB9AC;&#xB4EC;'},
    {name:'&#xD37C;&#xD305; &#xB9AC;&#xB4EC;',bpm:54,desc:'&#xD37C;&#xD305; &#xC2A4;&#xD2B8;&#xB85C;&#xD06C; &#xC5F0;&#xC2B5;&#xC6A9;'},
    {name:'&#xCE69; &#xC0F7; &#xB9AC;&#xB4EC;',bpm:66,desc:'50&#xC57C;&#xB4DC; &#xC774;&#xB0B4; &#xC5B4;&#xD504;&#xB85C;&#xCE58;'},
    {name:'&#xBC88;&#xCEE4; &#xC0F7;',bpm:84,desc:'&#xD2F0;&#xC0F7; &#xD480;&#xC2A4;&#xC719; &#xD15C;&#xD3EC;'}
  ];
  presets.forEach(function(p){
    html+='<div class="v10-shot-card" onclick="applyMetroPreset('+p.bpm+')"><h5>'+p.name+' <span class="v10-badge v10-badge-blue">'+p.bpm+' BPM</span></h5><div class="v10-sd">'+p.desc+'</div></div>';
  });
  html+='</div>';

  showV10(html);
  v10TabSwitch(document.getElementById('v10MC'),'v10');

  var slider=document.getElementById('v10BpmSlider');
  slider.addEventListener('input',function(){
    var v=parseInt(slider.value);
    document.getElementById('v10BpmVal').textContent=v;
    localStorage.setItem('sg_metro_bpm',v);
    if(metroInterval){stopMetro();startMetro()}
  });
}

window.applyMetroPreset=function(bpm){
  document.getElementById('v10BpmSlider').value=bpm;
  document.getElementById('v10BpmVal').textContent=bpm;
  localStorage.setItem('sg_metro_bpm',bpm);
  if(metroInterval){stopMetro();startMetro()}
};

function startMetro(){
  var bpm=parseInt(document.getElementById('v10BpmSlider').value);
  var beats=parseInt(document.getElementById('v10BeatsSel').value);
  metroBeat=0;
  var interval=60000/bpm;
  metroInterval=setInterval(function(){
    metroBeat++;
    var isAccent=(metroBeat%beats===1);
    v10Sfx(isAccent?'metronome_accent':'metronome');
    var dot=document.getElementById('v10MetroDot');
    if(dot){dot.classList.add('beat');setTimeout(function(){dot.classList.remove('beat')},100)}
    var ring=document.getElementById('v10MetroRing');
    if(ring)ring.classList.add('active');
  },interval);
  document.getElementById('v10MetroStart').innerHTML='&#x23F8; &#xC815;&#xC9C0;';
}

function stopMetro(){
  clearInterval(metroInterval);metroInterval=null;metroBeat=0;
  var btn=document.getElementById('v10MetroStart');
  if(btn)btn.innerHTML='&#x25B6; &#xC2DC;&#xC791;';
  var ring=document.getElementById('v10MetroRing');
  if(ring)ring.classList.remove('active');
}

window.toggleMetro=function(){metroInterval?stopMetro():startMetro()};

// ====================================================================
// 4. SHOT ENCYCLOPEDIA (20 shots)
// ====================================================================
var shotData=[
  {name:'&#xB4DC;&#xB77C;&#xC774;&#xBE0C;',cat:'&#xD2F0;&#xC0F7;',desc:'&#xD2F0;&#xC5D0;&#xC11C; &#xB4DC;&#xB77C;&#xC774;&#xBC84;&#xB85C; &#xCE58;&#xB294; &#xC0F7;. &#xCD5C;&#xB300; &#xBE44;&#xAC70;&#xB9AC;&#xB97C; &#xBAA9;&#xD45C;&#xB85C; &#xD569;&#xB2C8;&#xB2E4;.',tip:'&#xBCFC;&#xC744; &#xC67C;&#xBC1C; &#xC548;&#xCABD;&#xC5D0; &#xB193;&#xACE0; &#xC5B4;&#xAE68; &#xD68C;&#xC804;&#xC744; &#xD06C;&#xAC8C;'},
  {name:'&#xC544;&#xC774;&#xC5B8; &#xC0F7;',cat:'&#xC544;&#xC774;&#xC5B8;',desc:'&#xC544;&#xC774;&#xC5B8;&#xC73C;&#xB85C; &#xCE58;&#xB294; &#xC815;&#xD655;&#xD55C; &#xC0F7;. &#xADF8;&#xB9B0;&#xC744; &#xACF5;&#xB7B5;&#xD569;&#xB2C8;&#xB2E4;.',tip:'&#xBCFC;&#xC744; &#xC2A4;&#xD0E0;&#xC2A4; &#xC911;&#xC559;&#xC5D0; &#xB193;&#xACE0; &#xB2E4;&#xC6B4;&#xBE14;&#xB85C;'},
  {name:'&#xD53C;&#xCE58; &#xC0F7;',cat:'&#xC5B4;&#xD504;&#xB85C;&#xCE58;',desc:'&#xBCFC;&#xC744; &#xB192;&#xC774; &#xB744;&#xC6CC; &#xADF8;&#xB9B0; &#xC704;&#xC5D0; &#xBD80;&#xB4DC;&#xB7FD;&#xAC8C; &#xCC29;&#xC9C0;&#xC2DC;&#xD0A4;&#xB294; &#xC0F7;.',tip:'&#xC624;&#xD508; &#xD398;&#xC774;&#xC2A4;&#xB85C; &#xBCFC; &#xC544;&#xB798;&#xB97C; &#xD30C;&#xACE0;&#xB4E4;&#xBA74;&#xC11C; &#xD0C0;&#xACA9;'},
  {name:'&#xCE69; &#xC0F7;',cat:'&#xC5B4;&#xD504;&#xB85C;&#xCE58;',desc:'&#xADF8;&#xB9B0; &#xC8FC;&#xBCC0;&#xC5D0;&#xC11C; &#xBCFC;&#xC744; &#xAD74;&#xB824; &#xBCF4;&#xB0B4;&#xB294; &#xB0AE;&#xC740; &#xC0F7;.',tip:'7-8&#xBC88; &#xC544;&#xC774;&#xC5B8;&#xC73C;&#xB85C; &#xD37C;&#xD305;&#xCC98;&#xB7FC; &#xCE58;&#xBA74; &#xC548;&#xC815;&#xC801;'},
  {name:'&#xB85C;&#xBE0C; &#xC0F7;',cat:'&#xC5B4;&#xD504;&#xB85C;&#xCE58;',desc:'&#xADF8;&#xB9B0; &#xC8FC;&#xBCC0;&#xC5D0;&#xC11C; &#xBCFC;&#xC744; &#xB6F0;&#xC6CC; &#xC62C;&#xB9AC;&#xB294; &#xB192;&#xC740; &#xC0F7;.',tip:'56-60&#xB3C4; &#xC6E8;&#xC9C0;&#xB85C; &#xC624;&#xD508; &#xD398;&#xC774;&#xC2A4; &#xD65C;&#xC6A9;'},
  {name:'&#xBC99;&#xCEE4; &#xC0F7;',cat:'&#xD2B8;&#xB7EC;&#xBE14;',desc:'&#xBAA8;&#xB798; &#xBC99;&#xCEE4;&#xC5D0;&#xC11C; &#xD0C8;&#xCD9C;&#xD558;&#xB294; &#xC0F7;.',tip:'&#xBCFC; &#xB4A4; 2cm&#xC5D0; &#xD074;&#xB7FD; &#xC785;&#xC0AC;, &#xBAA8;&#xB798;&#xB97C; &#xD3ED;&#xBC1C;&#xC2DC;&#xCF1C;&#xC694;'},
  {name:'&#xD37C;&#xD305;',cat:'&#xD37C;&#xD305;',desc:'&#xADF8;&#xB9B0; &#xC704;&#xC5D0;&#xC11C; &#xBCFC;&#xC744; &#xD640;&#xC5D0; &#xB123;&#xB294; &#xC0F7;.',tip:'&#xC5B4;&#xAE68;&#xC640; &#xC190;&#xBAA9;&#xC744; &#xACE0;&#xC815;, &#xBCFC;&#xC744; &#xBCF4;&#xC9C0; &#xB9D0;&#xACE0; &#xD640;&#xC744; &#xBCF4;&#xC138;&#xC694;'},
  {name:'&#xB4DC;&#xB85C;&#xC6B0;',cat:'&#xD2B8;&#xB7EC;&#xBE14;',desc:'&#xBCFC;&#xC774; &#xC624;&#xB978;&#xCABD;&#xC73C;&#xB85C; &#xD718;&#xC5B4;&#xC9C0;&#xB294; &#xAD6C;&#xC9C8; (&#xC624;&#xB978;&#xC190;&#xC7A1;&#xC774;).',tip:'&#xADF8;&#xB9BD; &#xAC15;&#xD654;, &#xD074;&#xB7FD; &#xD398;&#xC774;&#xC2A4; &#xB2EB;&#xD798; &#xD655;&#xC778;'},
  {name:'&#xD398;&#xC774;&#xB4DC;',cat:'&#xD2B8;&#xB7EC;&#xBE14;',desc:'&#xBCFC;&#xC774; &#xC67C;&#xCABD;&#xC73C;&#xB85C; &#xD718;&#xC5B4;&#xC9C0;&#xB294; &#xAD6C;&#xC9C8; (&#xC624;&#xB978;&#xC190;&#xC7A1;&#xC774;).',tip:'&#xC778;&#xC0AC;&#xC774;&#xB4DC;-&#xC544;&#xC6C3; &#xC2A4;&#xC719; &#xACBD;&#xB85C; &#xC5F0;&#xC2B5;'},
  {name:'&#xD380;&#xCE58; &#xC0F7;',cat:'&#xC5B4;&#xD504;&#xB85C;&#xCE58;',desc:'&#xBCFC;&#xC744; &#xB0AE;&#xAC8C; &#xB0A0;&#xB824; &#xADF8;&#xB9B0; &#xC704;&#xC5D0; &#xAD74;&#xB9AC;&#xB294; &#xC0F7;.',tip:'&#xBCFC; &#xC704;&#xCE58;&#xB97C; &#xB4A4;&#xCCAD;&#xC73C;&#xB85C;, &#xC190; &#xC55E;&#xC138;&#xC6CC; &#xD0C0;&#xACA9;'},
  {name:'&#xD50C;&#xB86D; &#xC0F7;',cat:'&#xC5B4;&#xD504;&#xB85C;&#xCE58;',desc:'&#xBCFC;&#xC744; &#xB192;&#xC774; &#xB744;&#xC6CC; &#xBE60;&#xB974;&#xAC8C; &#xBA48;&#xCDA4;&#xC5D0; &#xD558;&#xB294; &#xC0F7;.',tip:'&#xBCFC; &#xC544;&#xB798; &#xD30C;&#xACE0;&#xB4DC;&#xB294; &#xB290;&#xB08C;&#xC73C;&#xB85C; &#xB85C;&#xD504;&#xD2B8; &#xAC00;&#xB4DD;'},
  {name:'&#xB808;&#xC774;&#xC5C5;',cat:'&#xD2F0;&#xC0F7;',desc:'&#xC9C0;&#xBA74;&#xC5D0;&#xC11C; &#xCE58;&#xB294; &#xD2F0; &#xC0F7;. &#xD398;&#xC5B4;&#xC6E8;&#xC774; &#xC6B0;&#xB4DC;&#xB098; &#xD558;&#xC774;&#xBE0C;&#xB9AC;&#xB4DC; &#xC0AC;&#xC6A9;.',tip:'&#xBCFC;&#xC744; &#xC2A4;&#xD0E0;&#xC2A4; &#xC911;&#xC559;&#xBCF4;&#xB2E4; &#xC0B4;&#xC9DD; &#xC55E;&#xC5D0;'},
  {name:'&#xC2A4;&#xD305;&#xC5B4; &#xC0F7;',cat:'&#xD2B8;&#xB7EC;&#xBE14;',desc:'&#xBCFC;&#xC774; &#xB098;&#xBB34; &#xC0AC;&#xC774; &#xB4F1;&#xC5D0; &#xAE34; &#xC0C1;&#xD669;. &#xCE58;&#xC9C0; &#xC54A;&#xACE0; &#xB4DC;&#xB86D;&#xD558;&#xB294; &#xAC83;&#xB3C4; &#xC804;&#xB7B5;.',tip:'&#xBB34;&#xB9AC;&#xD558;&#xC9C0; &#xB9D0;&#xACE0; &#xC548;&#xC804;&#xD55C; &#xBC29;&#xD5A5;&#xC73C;&#xB85C; &#xD0C8;&#xCD9C;'},
  {name:'&#xD504;&#xB85C;&#xBE44;&#xC804;&#xB0BC; &#xC0F7;',cat:'&#xD2B8;&#xB7EC;&#xBE14;',desc:'&#xB7EC;&#xD504;&#xC5D0;&#xC11C; &#xD50C;&#xB808;&#xC774;. &#xBC14;&#xC6B4;&#xC2A4; &#xB4A4; &#xD718;&#xC5B4;&#xC9C0;&#xB294; &#xBCFC;&#xC5D0; &#xB300;&#xBE44;.',tip:'&#xCF00;&#xB9AC;&#xB97C; &#xC904;&#xC774;&#xACE0; &#xB7F0;&#xB2DD; &#xD65C;&#xC6A9;'},
  {name:'&#xD6C5; &#xC0F7;',cat:'&#xD2B8;&#xB7EC;&#xBE14;',desc:'&#xC758;&#xB3C4;&#xC801;&#xC73C;&#xB85C; &#xBCFC;&#xC744; &#xC67C;&#xCABD;&#xC73C;&#xB85C; &#xD718;&#xAC8C; &#xD558;&#xB294; &#xC0F7;.',tip:'&#xD074;&#xB85C;&#xC988;&#xB4DC; &#xD398;&#xC774;&#xC2A4;, &#xC778;-&#xD22C;-&#xC544;&#xC6C3; &#xC2A4;&#xC719; &#xACBD;&#xB85C;'},
  {name:'&#xC2AC;&#xB77C;&#xC774;&#xC2A4;',cat:'&#xD2B8;&#xB7EC;&#xBE14;',desc:'&#xC758;&#xB3C4;&#xC801;&#xC73C;&#xB85C; &#xBCFC;&#xC744; &#xC624;&#xB978;&#xCABD;&#xC73C;&#xB85C; &#xD718;&#xAC8C; &#xD558;&#xB294; &#xC0F7;.',tip:'&#xC624;&#xD508; &#xD398;&#xC774;&#xC2A4;, &#xC544;&#xC6C3;-&#xD22C;-&#xC778; &#xC2A4;&#xC719; &#xACBD;&#xB85C;'},
  {name:'&#xD504;&#xB9BD; &#xC0F7;',cat:'&#xC5B4;&#xD504;&#xB85C;&#xCE58;',desc:'&#xADF8;&#xB9B0; &#xC6B0;&#xC758; &#xAE4A;&#xC740; &#xB7EC;&#xD504;&#xC5D0;&#xC11C; &#xBCFC;&#xC744; &#xD22C;&#xC6CC; &#xC62C;&#xB9AC;&#xB294; &#xC0F7;.',tip:'&#xD398;&#xC774;&#xC2A4;&#xB97C; &#xC5F4;&#xACE0; &#xBCFC; &#xC544;&#xB798;&#xB97C; &#xD30C;&#xACE0;&#xB4DC;&#xB294; &#xB290;&#xB08C;'},
  {name:'&#xB77C;&#xAC70; &#xD37C;&#xD305;',cat:'&#xD37C;&#xD305;',desc:'2m &#xC774;&#xC0C1; &#xAE34; &#xD37C;&#xD305;. &#xAC70;&#xB9AC;&#xAC10;&#xACFC; &#xB77C;&#xC778;&#xC774; &#xC911;&#xC694;.',tip:'&#xC2DC;&#xACC4;&#xCD94; &#xBC29;&#xC2DD;&#xC73C;&#xB85C; &#xC190;&#xBAA9; &#xACE0;&#xC815;, &#xD765;&#xB4E4;&#xB9AC;&#xB294; &#xAC70;&#xB9AC; &#xACB0;&#xC815;'},
  {name:'&#xC5C5;&#xD790; &#xD37C;&#xD305;',cat:'&#xD37C;&#xD305;',desc:'&#xC624;&#xB974;&#xB9C9; &#xD37C;&#xD305;. &#xBCFC;&#xC774; &#xB290;&#xB824;&#xC9C0;&#xBBC0;&#xB85C; &#xC138;&#xAC8C; &#xCE58;&#xC138;&#xC694;.',tip:'&#xD640; &#xC704;&#xCABD;&#xC73C;&#xB85C; &#xC870;&#xC900;, &#xD3C9;&#xC18C;&#xBCF4;&#xB2E4; 10-15% &#xAC15;&#xD558;&#xAC8C;'},
  {name:'&#xB0B4;&#xB9AC;&#xB9C9; &#xD37C;&#xD305;',cat:'&#xD37C;&#xD305;',desc:'&#xB0B4;&#xB9AC;&#xB9C9; &#xD37C;&#xD305;. &#xBCFC;&#xC774; &#xBE60;&#xB77C;&#xC9C0;&#xBBC0;&#xB85C; &#xBD80;&#xB4DC;&#xB7FD;&#xAC8C;.',tip:'&#xD640; &#xC544;&#xB798;&#xCABD;&#xC73C;&#xB85C; &#xC870;&#xC900;, &#xD3C9;&#xC18C;&#xBCF4;&#xB2E4; 10-15% &#xC57D;&#xD558;&#xAC8C;'}
];

function renderShotEncyclopedia(){
  v10Sfx('journal');
  var cats=['&#xC804;&#xCCB4;','&#xD2F0;&#xC0F7;','&#xC544;&#xC774;&#xC5B8;','&#xC5B4;&#xD504;&#xB85C;&#xCE58;','&#xD37C;&#xD305;','&#xD2B8;&#xB7EC;&#xBE14;'];
  var html='<div class="v10-hdr"><h2><span class="v10i">&#x1F4D6;</span> &#xC0F7; &#xC720;&#xD615; &#xB3C4;&#xAC10; <span class="v10-badge v10-badge-green">'+shotData.length+'&#xC885;</span></h2><button class="v10-x" onclick="closeV10()">&times;</button></div>';
  html+='<div class="v10-tabs" id="v10ShotTabs">';
  cats.forEach(function(c,i){html+='<button class="v10-tab'+(i===0?' active':'')+'" data-v10sc="'+c+'">'+c+'</button>'});
  html+='</div><div id="v10ShotList">';
  shotData.forEach(function(s){
    html+='<div class="v10-shot-card" data-scat="'+s.cat+'"><h5>'+s.name+' <span class="v10-badge v10-badge-blue">'+s.cat+'</span></h5><div class="v10-sd">'+s.desc+'</div><div class="v10-sd" style="margin-top:6px;color:var(--primary)"><strong>&#x1F4A1; Tip:</strong> '+s.tip+'</div></div>';
  });
  html+='</div>';
  showV10(html);

  document.querySelectorAll('#v10ShotTabs .v10-tab').forEach(function(tab){
    tab.addEventListener('click',function(){
      document.querySelectorAll('#v10ShotTabs .v10-tab').forEach(function(t){t.classList.remove('active')});
      tab.classList.add('active');
      var cat=tab.getAttribute('data-v10sc');
      document.querySelectorAll('#v10ShotList .v10-shot-card').forEach(function(c){
        c.style.display=(cat==='&#xC804;&#xCCB4;'||c.getAttribute('data-scat')===cat)?'block':'none';
      });
    });
  });
}

// ====================================================================
// 5. BEGINNER ACADEMY (6 lessons)
// ====================================================================
var academyLessons=[
  {title:'&#xADF8;&#xB9BD; &#xC7A1;&#xAE30;',icon:'&#x270B;',steps:['&#xC67C;&#xC190;&#xC744; &#xD074;&#xB7FD; &#xC704;&#xC5D0; &#xB193;&#xACE0; &#xC190;&#xAC00;&#xB77D;&#xC73C;&#xB85C; &#xAC10;&#xC2FC;&#xB2E4;','&#xC624;&#xB978;&#xC190;&#xC744; &#xC67C;&#xC190; &#xC544;&#xB798;&#xC5D0; &#xAC10;&#xC2FC;&#xB2E4;','V&#xC790; &#xBAA8;&#xC591;&#xC774; &#xD131;&#xC744; &#xAC00;&#xB9AC;&#xD0A4;&#xB294;&#xC9C0; &#xD655;&#xC778;','&#xC190;&#xBC14;&#xB2E5; &#xC544;&#xB798; &#xBD80;&#xBD84;&#xC5D0; &#xD798;&#xC744; &#xC8FC;&#xACE0; &#xC190;&#xAC00;&#xB77D;&#xC740; &#xBD80;&#xB4DC;&#xB7FD;&#xAC8C;']},
  {title:'&#xC2A4;&#xD0E0;&#xC2A4; (&#xC5B4;&#xB4DC;&#xB808;&#xC2A4;)',icon:'&#x1F9CD;',steps:['&#xBC1C;&#xC744; &#xC5B4;&#xAE68; &#xB108;&#xBE44;&#xB85C; &#xBC8C;&#xB9B0;&#xB2E4;','&#xBB34;&#xB984;&#xC744; &#xC0B4;&#xC9DD; &#xAD7D;&#xD788;&#xACE0; &#xCCB4;&#xC911;&#xC744; &#xBC1C;&#xBC14;&#xB2E5;&#xC5D0;','&#xBCFC;&#xC740; &#xC2A4;&#xD0E0;&#xC2A4; &#xC911;&#xC559; &#xC55E;&#xC5D0; &#xB193;&#xB294;&#xB2E4;','&#xC591;&#xD314;&#xC744; &#xC790;&#xC5F0;&#xC2A4;&#xB7FD;&#xAC8C; &#xB298;&#xC5B4;&#xD2B8;&#xB9B0;&#xB2E4;']},
  {title:'&#xBC31;&#xC2A4;&#xC719;',icon:'&#x1F3CC;&#xFE0F;',steps:['&#xC190;&#xBAA9;, &#xD314;, &#xC5B4;&#xAE68;&#xB97C; &#xD558;&#xB098;&#xB85C; &#xC5F0;&#xACB0;','&#xD074;&#xB7FD;&#xC744; &#xCC9C;&#xCC9C;&#xD788; &#xB4A4;&#xB85C; &#xAC00;&#xC838;&#xAC04;&#xB2E4;','&#xC67C;&#xD314;&#xC744; &#xC313; &#xD3B4;&#xACE0; &#xC5B4;&#xAE68; &#xD68C;&#xC804;','&#xD074;&#xB7FD;&#xC774; &#xACFC;&#xB140; &#xC704;&#xC5D0;&#xC11C; &#xC218;&#xD3C9;&#xC774; &#xB418;&#xB294;&#xC9C0; &#xD655;&#xC778;']},
  {title:'&#xB2E4;&#xC6B4;&#xC2A4;&#xC719;',icon:'&#x26A1;',steps:['&#xD558;&#xCCB4;&#xBD80;&#xD130; &#xC2DC;&#xC791; (&#xBC1C; &#x2192; &#xD5C8;&#xB9AC; &#x2192; &#xC5B4;&#xAE68;)','&#xD074;&#xB7FD; &#xD5E4;&#xB4DC;&#xB97C; &#xBCFC;&#xB85C; &#xAC00;&#xC838;&#xAC04;&#xB2E4;','&#xC784;&#xD329;&#xD2B8; &#xC21C;&#xAC04; &#xD314;&#xC744; &#xC313; &#xD3B4;&#xACE0; &#xD5E4;&#xB4DC;&#xB97C; &#xC2A4;&#xCF00;&#xC5B4;&#xB85C;','&#xD314;&#xB85C;&#xC2A4;&#xB8E8; &#x2014; &#xD074;&#xB7FD;&#xC774; &#xBAB8;&#xC744; &#xAC10;&#xC2F8;&#xACE0; &#xB9C8;&#xBB34;&#xB9AC;']},
  {title:'&#xD37C;&#xD305; &#xAE30;&#xCD08;',icon:'&#x1F3AF;',steps:['&#xC190;&#xBAA9;&#xC744; &#xACE0;&#xC815;&#xD558;&#xACE0; &#xC5B4;&#xAE68;&#xB85C; &#xC2A4;&#xD2B8;&#xB85C;&#xD06C;','&#xBCFC;&#xC744; &#xBCF4;&#xC9C0; &#xB9D0;&#xACE0; &#xD640;&#xC744; &#xBCF4;&#xC138;&#xC694;','&#xAC70;&#xB9AC;&#xAC10;: &#xBC1C;&#xC744; &#xBC8C;&#xB9AC;&#xB294; &#xD3ED;&#xC73C;&#xB85C; &#xC870;&#xC808;','3&#xBC1C;&#xC790; &#xB4DC;&#xB9B4;: 1(&#xBC31;) 2(&#xD0C0;&#xACA9;) 3(&#xD314;&#xB85C;&#xC2A4;&#xB8E8;)']},
  {title:'&#xCF54;&#xC2A4; &#xB9E4;&#xB108;',icon:'&#x1F3F3;&#xFE0F;',steps:['&#xD2F0;&#xC0F7;: &#xD2F0; &#xB192;&#xC774;&#xB97C; &#xADE0;&#xC77C;&#xD558;&#xAC8C; (1.5-2&#xC778;&#xCE58;)','&#xBC14;&#xB85C; &#xC55E; &#xC870;&#xC5D0;&#xC11C; &#xBD88;&#xD544;&#xC694;&#xD55C; &#xC704;&#xD5D8;&#xC744; &#xD53C;&#xD574;&#xB77C;','&#xB514;&#xBCBB;: &#xBC1C;&#xC790;&#xAD6D;&#xC744; &#xBC1B;&#xC544;&#xC11C; &#xBAA8;&#xB798;&#xB97C; &#xBA54;&#xC6B0;&#xC138;&#xC694;','&#xD50C;&#xB808;&#xC774; &#xC18D;&#xB3C4;&#xB97C; &#xC9C0;&#xCF1C;&#xB77C; (4&#xC2DC;&#xAC04; &#xC774;&#xB0B4; 18&#xD640;)']},
];

function renderAcademy(){
  v10Sfx('journal');
  var done=JSON.parse(localStorage.getItem('sg_academy')||'[]');
  var html='<div class="v10-hdr"><h2><span class="v10i">&#x1F393;</span> &#xCD08;&#xBCF4;&#xC790; &#xC544;&#xCE74;&#xB370;&#xBBF8; <span class="v10-badge v10-badge-green">'+done.length+'/'+academyLessons.length+'</span></h2><button class="v10-x" onclick="closeV10()">&times;</button></div>';
  html+='<div class="v10-progress"><div class="v10-progress-fill" style="width:'+Math.round(done.length/academyLessons.length*100)+'%"></div></div>';
  academyLessons.forEach(function(l,i){
    var isDone=done.indexOf(i)!==-1;
    html+='<div class="v10-lesson"><h5>'+l.icon+' &#xB808;&#xC2A8; '+(i+1)+': '+l.title+(isDone?' <span class="v10-badge v10-badge-green">&#xC644;&#xB8CC;</span>':'')+'</h5>';
    l.steps.forEach(function(s,si){
      html+='<div class="v10-step"><div class="v10-sn">'+(si+1)+'</div><div class="v10-st">'+s+'</div></div>';
    });
    if(!isDone) html+='<div style="text-align:right;margin-top:10px"><button class="v10-btn v10-btn-sm v10-btn-primary" onclick="completeLesson('+i+')">&#x2705; &#xC644;&#xB8CC; &#xCCB4;&#xD06C;</button></div>';
    html+='</div>';
  });
  showV10(html);
}

window.completeLesson=function(i){
  var done=JSON.parse(localStorage.getItem('sg_academy')||'[]');
  if(done.indexOf(i)===-1){done.push(i);localStorage.setItem('sg_academy',JSON.stringify(done));v10Sfx('goal_complete')}
  renderAcademy();
};

// ====================================================================
// 6. GOLF CALENDAR
// ====================================================================
var calMonth=new Date().getMonth(),calYear=new Date().getFullYear();

function renderCalendar(){
  v10Sfx('journal');
  var entries=JSON.parse(localStorage.getItem('sg_calendar')||'[]');
  var html='<div class="v10-hdr"><h2><span class="v10i">&#x1F4C5;</span> &#xACE8;&#xD504; &#xCE98;&#xB9B0;&#xB354;</h2><button class="v10-x" onclick="closeV10()">&times;</button></div>';
  html+='<div class="v10-cal-nav"><button onclick="v10CalNav(-1)">&larr;</button><span>'+calYear+'&#xB144; '+(calMonth+1)+'&#xC6D4;</span><button onclick="v10CalNav(1)">&rarr;</button></div>';
  html+='<div class="v10-cal-grid">';
  ['&#xC77C;','&#xC6D4;','&#xD654;','&#xC218;','&#xBAA9;','&#xAE08;','&#xD1A0;'].forEach(function(d){html+='<div class="v10-cal-hdr">'+d+'</div>'});

  var first=new Date(calYear,calMonth,1);
  var lastDay=new Date(calYear,calMonth+1,0).getDate();
  var startDay=first.getDay();
  var today=new Date();

  for(var i=0;i<startDay;i++) html+='<div class="v10-cal-day empty"></div>';
  for(var d=1;d<=lastDay;d++){
    var dateStr=calYear+'-'+String(calMonth+1).padStart(2,'0')+'-'+String(d).padStart(2,'0');
    var entry=entries.find(function(e){return e.date===dateStr});
    var cls='v10-cal-day';
    if(today.getFullYear()===calYear&&today.getMonth()===calMonth&&today.getDate()===d) cls+=' today';
    if(entry&&entry.type==='round') cls+=' has-round';
    if(entry&&entry.type==='practice') cls+=' has-practice';
    html+='<div class="'+cls+'" onclick="v10CalClick(\''+dateStr+'\')">'+d+'</div>';
  }
  html+='</div>';

  html+='<div class="v10-divider"></div>';
  html+='<div class="v10-grid2" style="margin-bottom:12px">';
  html+='<div class="v10-stat"><div class="v10-sv">'+entries.filter(function(e){return e.type==='round'}).length+'</div><div class="v10-sl">&#xB77C;&#xC6B4;&#xB4DC;</div></div>';
  html+='<div class="v10-stat"><div class="v10-sv">'+entries.filter(function(e){return e.type==='practice'}).length+'</div><div class="v10-sl">&#xC5F0;&#xC2B5;</div></div>';
  html+='</div>';

  var monthEntries=entries.filter(function(e){return e.date.startsWith(calYear+'-'+String(calMonth+1).padStart(2,'0'))}).sort(function(a,b){return a.date.localeCompare(b.date)});
  if(monthEntries.length>0){
    html+='<h4 style="font-size:14px;font-weight:700;margin-bottom:8px">&#xC774;&#xBC88; &#xB2EC; &#xAE30;&#xB85D;</h4>';
    monthEntries.forEach(function(e){
      var icon=e.type==='round'?'&#x26F3;':'&#x1F3CC;&#xFE0F;';
      html+='<div class="v10-journal-entry"><h5><span>'+icon+' '+e.date+'</span><span class="v10-jd">'+e.memo+'</span></h5></div>';
    });
  }
  showV10(html);
}

window.v10CalNav=function(dir){calMonth+=dir;if(calMonth<0){calMonth=11;calYear--}if(calMonth>11){calMonth=0;calYear++}renderCalendar()};

window.v10CalClick=function(dateStr){
  var entries=JSON.parse(localStorage.getItem('sg_calendar')||'[]');
  var existing=entries.find(function(e){return e.date===dateStr});
  if(existing){
    if(confirm(dateStr+' &#xAE30;&#xB85D; &#xC0AD;&#xC81C;?')){
      entries=entries.filter(function(e){return e.date!==dateStr});
      localStorage.setItem('sg_calendar',JSON.stringify(entries));
      renderCalendar();
    }
    return;
  }
  var type=confirm('&#x26F3; &#xB77C;&#xC6B4;&#xB4DC;(OK) / &#x1F3CC;&#xFE0F; &#xC5F0;&#xC2B5;(&#xCDE8;&#xC18C;)')?'round':'practice';
  var memo=prompt('&#xBA54;&#xBAA8; (&#xC120;&#xD0DD;&#xC0AC;&#xD56D;):','');
  entries.push({date:dateStr,type:type,memo:memo||''});
  localStorage.setItem('sg_calendar',JSON.stringify(entries));
  v10Sfx('journal');
  renderCalendar();
};

// ====================================================================
// 7. GOAL TRACKER
// ====================================================================
var defaultGoals=[
  {id:'g1',text:'&#xD578;&#xB514;&#xCE61; 10 &#xC774;&#xD558; &#xB2EC;&#xC131;',cat:'&#xC2A4;&#xCF54;&#xC5B4;'},
  {id:'g2',text:'&#xC8FC; 2&#xD68C; &#xC5F0;&#xC2B5;&#xC7A5; &#xBC29;&#xBB38;',cat:'&#xC5F0;&#xC2B5;'},
  {id:'g3',text:'&#xD37C;&#xD305; 36&#xD640; &#xD3C9;&#xADE0; 2.0 &#xC774;&#xD558;',cat:'&#xD37C;&#xD305;'},
  {id:'g4',text:'&#xD398;&#xC5B4;&#xC6E8;&#xC774; &#xC548;&#xCC29;&#xB960; 50% &#xB2EC;&#xC131;',cat:'&#xC0F7;'},
  {id:'g5',text:'90&#xD0C0; &#xAE68;&#xAE30;',cat:'&#xC2A4;&#xCF54;&#xC5B4;'},
  {id:'g6',text:'&#xBC84;&#xB514; &#xC6D4; 3&#xAC1C; &#xC774;&#xC0C1;',cat:'&#xC2A4;&#xCF54;&#xC5B4;'},
  {id:'g7',text:'&#xB4DC;&#xB77C;&#xC774;&#xBC84; &#xBE44;&#xAC70;&#xB9AC; 200m+',cat:'&#xC0F7;'},
  {id:'g8',text:'&#xC6D4; 4&#xD68C; &#xB77C;&#xC6B4;&#xB4DC;',cat:'&#xB77C;&#xC6B4;&#xB4DC;'},
  {id:'g9',text:'&#xACE8;&#xD504; &#xC6A9;&#xC5B4; &#xD000;&#xC988; S&#xB4F1;&#xAE09;',cat:'&#xD559;&#xC2B5;'},
  {id:'g10',text:'&#xCCA0;&#xBD04; &#xCCA0; &#xBE44;&#xAC70;&#xB9AC; 150m',cat:'&#xC0F7;'}
];

function renderGoals(){
  v10Sfx('goal_complete');
  var completed=JSON.parse(localStorage.getItem('sg_goals')||'[]');
  var html='<div class="v10-hdr"><h2><span class="v10i">&#x1F3AF;</span> &#xBAA9;&#xD45C; &#xCD94;&#xC801; <span class="v10-badge v10-badge-gold">'+completed.length+'/'+defaultGoals.length+'</span></h2><button class="v10-x" onclick="closeV10()">&times;</button></div>';
  html+='<div class="v10-progress"><div class="v10-progress-fill" style="width:'+Math.round(completed.length/defaultGoals.length*100)+'%"></div></div>';
  defaultGoals.forEach(function(g){
    var isDone=completed.indexOf(g.id)!==-1;
    html+='<div class="v10-goal-item"><div class="v10-goal-check'+(isDone?' done':'')+'" onclick="toggleGoal(\''+g.id+'\')">'+(isDone?'&#x2713;':'')+'</div><div class="v10-goal-text"><h5>'+g.text+'</h5><p>'+g.cat+'</p></div></div>';
  });
  showV10(html);
}

window.toggleGoal=function(id){
  var completed=JSON.parse(localStorage.getItem('sg_goals')||'[]');
  var idx=completed.indexOf(id);
  if(idx===-1){completed.push(id);v10Sfx('goal_complete')}else{completed.splice(idx,1)}
  localStorage.setItem('sg_goals',JSON.stringify(completed));
  renderGoals();
};

// ====================================================================
// 8. ROUND JOURNAL
// ====================================================================
function renderJournal(){
  v10Sfx('journal');
  var journals=JSON.parse(localStorage.getItem('sg_journal')||'[]');
  var html='<div class="v10-hdr"><h2><span class="v10i">&#x1F4DD;</span> &#xB77C;&#xC6B4;&#xB4DC; &#xC800;&#xB110; <span class="v10-badge v10-badge-blue">'+journals.length+'&#xAC74;</span></h2><button class="v10-x" onclick="closeV10()">&times;</button></div>';

  html+='<div style="margin-bottom:16px"><label class="v10-label">&#xC0C8; &#xAE30;&#xB85D; &#xCD94;&#xAC00;</label>';
  html+='<div class="v10-grid2" style="margin-bottom:8px"><div><input type="date" class="v10-input" id="v10JDate" value="'+new Date().toISOString().split('T')[0]+'"></div><div><input type="text" class="v10-input" id="v10JCourse" placeholder="&#xACE8;&#xD504;&#xC7A5; &#xC774;&#xB984;"></div></div>';
  html+='<div class="v10-grid2" style="margin-bottom:8px"><div><input type="number" class="v10-input" id="v10JScore" placeholder="&#xC2A4;&#xCF54;&#xC5B4;" min="60" max="200"></div><div><select class="v10-select" id="v10JMood"><option value="&#x1F60A;">&#x1F60A; &#xC88B;&#xC74C;</option><option value="&#x1F610;">&#x1F610; &#xBCF4;&#xD1B5;</option><option value="&#x1F614;">&#x1F614; &#xC544;&#xC26C;&#xC6C0;</option></select></div></div>';
  html+='<textarea class="v10-input" id="v10JMemo" rows="3" placeholder="&#xC624;&#xB298; &#xB77C;&#xC6B4;&#xB4DC; &#xBA54;&#xBAA8;... (&#xC88B;&#xC558;&#xB358; &#xC810;, &#xAC1C;&#xC120;&#xD560; &#xC810;)" style="resize:vertical"></textarea>';
  html+='<button class="v10-btn v10-btn-primary" style="width:100%;margin-top:8px" onclick="addJournal()">&#x1F4BE; &#xC800;&#xC7A5;</button></div>';
  html+='<div class="v10-divider"></div>';

  if(journals.length>0){
    journals.sort(function(a,b){return b.date.localeCompare(a.date)});
    journals.forEach(function(j,i){
      html+='<div class="v10-journal-entry"><h5><span>'+j.mood+' '+j.course+' ('+j.score+'&#xD0C0;)</span><span class="v10-jd">'+j.date+' <button style="background:none;border:none;color:#e53935;cursor:pointer;font-size:12px" onclick="delJournal('+i+')">&#xC0AD;&#xC81C;</button></span></h5><p>'+j.memo+'</p></div>';
    });
  } else {
    html+='<p style="text-align:center;color:var(--text-muted);padding:20px">&#xC544;&#xC9C1; &#xAE30;&#xB85D;&#xC774; &#xC5C6;&#xC2B5;&#xB2C8;&#xB2E4;. &#xCCAB; &#xB77C;&#xC6B4;&#xB4DC;&#xB97C; &#xAE30;&#xB85D;&#xD574;&#xBCF4;&#xC138;&#xC694;!</p>';
  }
  showV10(html);
}

window.addJournal=function(){
  var date=document.getElementById('v10JDate').value;
  var course=document.getElementById('v10JCourse').value;
  var score=document.getElementById('v10JScore').value;
  var mood=document.getElementById('v10JMood').value;
  var memo=document.getElementById('v10JMemo').value;
  if(!course||!score){alert('&#xACE8;&#xD504;&#xC7A5;&#xACFC; &#xC2A4;&#xCF54;&#xC5B4;&#xB97C; &#xC785;&#xB825;&#xD574;&#xC8FC;&#xC138;&#xC694;');return}
  var journals=JSON.parse(localStorage.getItem('sg_journal')||'[]');
  journals.push({date:date,course:course,score:parseInt(score),mood:mood,memo:memo||''});
  localStorage.setItem('sg_journal',JSON.stringify(journals));
  v10Sfx('journal');
  renderJournal();
};

window.delJournal=function(i){
  var journals=JSON.parse(localStorage.getItem('sg_journal')||'[]');
  journals.splice(i,1);
  localStorage.setItem('sg_journal',JSON.stringify(journals));
  renderJournal();
};

// ====================================================================
// 9. SHARE CARD (Canvas)
// ====================================================================
function renderShareCard(){
  v10Sfx('share');
  var journals=JSON.parse(localStorage.getItem('sg_journal')||'[]');
  var goals=JSON.parse(localStorage.getItem('sg_goals')||'[]');
  var cal=JSON.parse(localStorage.getItem('sg_calendar')||'[]');
  var rounds=cal.filter(function(e){return e.type==='round'}).length;
  var practices=cal.filter(function(e){return e.type==='practice'}).length;
  var avgScore=0;
  if(journals.length>0){var sum=0;journals.forEach(function(j){sum+=j.score});avgScore=Math.round(sum/journals.length)}

  var html='<div class="v10-hdr"><h2><span class="v10i">&#x1F4F1;</span> &#xACF5;&#xC720; &#xCE74;&#xB4DC;</h2><button class="v10-x" onclick="closeV10()">&times;</button></div>';
  html+='<div class="v10-share-preview"><h3>&#x26F3; My SmartGolf Stats</h3><div class="v10-sp-stats">';
  html+='<div class="v10-sp-item"><div class="v10-sp-val">'+(avgScore||'--')+'</div><div class="v10-sp-lbl">&#xD3C9;&#xADE0; &#xC2A4;&#xCF54;&#xC5B4;</div></div>';
  html+='<div class="v10-sp-item"><div class="v10-sp-val">'+rounds+'</div><div class="v10-sp-lbl">&#xB77C;&#xC6B4;&#xB4DC;</div></div>';
  html+='<div class="v10-sp-item"><div class="v10-sp-val">'+goals.length+'/'+defaultGoals.length+'</div><div class="v10-sp-lbl">&#xBAA9;&#xD45C; &#xB2EC;&#xC131;</div></div>';
  html+='</div></div>';
  html+='<canvas id="v10ShareCanvas" width="600" height="380" style="display:none"></canvas>';
  html+='<div class="v10-grid2" style="margin-top:12px"><button class="v10-btn v10-btn-primary" style="flex:1" onclick="genShareCard()">&#x1F5BC;&#xFE0F; &#xC774;&#xBBF8;&#xC9C0; &#xC0DD;&#xC131;</button><button class="v10-btn v10-btn-primary" style="flex:1;background:linear-gradient(135deg,#1565c0,#42a5f5)" onclick="copyShareCard()">&#x1F4CB; &#xD074;&#xB9BD;&#xBCF4;&#xB4DC; &#xBCF5;&#xC0AC;</button></div>';
  html+='<div id="v10ShareResult" style="margin-top:12px;text-align:center"></div>';
  showV10(html);
}

window.genShareCard=function(){
  var c=document.getElementById('v10ShareCanvas');c.style.display='block';
  var ctx=c.getContext('2d');
  var grd=ctx.createLinearGradient(0,0,600,380);grd.addColorStop(0,'#1a7a3a');grd.addColorStop(1,'#0f5a28');
  ctx.fillStyle=grd;ctx.beginPath();ctx.roundRect(0,0,600,380,16);ctx.fill();

  ctx.fillStyle='rgba(255,255,255,.1)';ctx.beginPath();ctx.arc(500,60,120,0,Math.PI*2);ctx.fill();
  ctx.beginPath();ctx.arc(100,320,80,0,Math.PI*2);ctx.fill();

  ctx.fillStyle='#fff';ctx.font='bold 28px -apple-system,sans-serif';ctx.textAlign='center';
  ctx.fillText('⛳ SmartGolf v10.0',300,50);
  ctx.font='14px -apple-system,sans-serif';ctx.fillStyle='rgba(255,255,255,.8)';
  ctx.fillText('나의 골프 프로필',300,75);

  var journals=JSON.parse(localStorage.getItem('sg_journal')||'[]');
  var goals=JSON.parse(localStorage.getItem('sg_goals')||'[]');
  var cal=JSON.parse(localStorage.getItem('sg_calendar')||'[]');
  var rounds=cal.filter(function(e){return e.type==='round'}).length;
  var practices=cal.filter(function(e){return e.type==='practice'}).length;
  var avgScore=0;
  if(journals.length>0){var sum=0;journals.forEach(function(j){sum+=j.score});avgScore=Math.round(sum/journals.length)}

  var stats=[
    {label:'평균 스코어',val:avgScore||'--'},
    {label:'라운드',val:rounds},
    {label:'연습',val:practices},
    {label:'목표 달성',val:goals.length+'/'+defaultGoals.length},
    {label:'저널 기록',val:journals.length},
    {label:'캘린더 일수',val:cal.length}
  ];

  stats.forEach(function(s,i){
    var x=80+(i%3)*190;var y=110+Math.floor(i/3)*120;
    ctx.fillStyle='rgba(255,255,255,.12)';ctx.beginPath();ctx.roundRect(x-60,y-10,160,90,12);ctx.fill();
    ctx.fillStyle='#fff';ctx.font='bold 24px -apple-system,sans-serif';ctx.textAlign='center';
    ctx.fillText(String(s.val),x+20,y+30);
    ctx.font='11px -apple-system,sans-serif';ctx.fillStyle='rgba(255,255,255,.7)';
    ctx.fillText(s.label,x+20,y+55);
  });

  ctx.fillStyle='rgba(255,255,255,.5)';ctx.font='10px -apple-system,sans-serif';
  ctx.fillText('PRIME Holdings \xB7 '+new Date().toLocaleDateString('ko-KR'),300,370);

  var link=document.createElement('a');link.download='smartgolf-share.png';link.href=c.toDataURL('image/png');link.click();
  document.getElementById('v10ShareResult').innerHTML='<span class="v10-badge v10-badge-green">&#x2705; &#xC774;&#xBBF8;&#xC9C0; &#xC800;&#xC7A5;&#xB428;!</span>';
};

window.copyShareCard=function(){
  var c=document.getElementById('v10ShareCanvas');
  if(!c||c.style.display==='none'){genShareCard()}
  try{
    c.toBlob(function(blob){
      navigator.clipboard.write([new ClipboardItem({'image/png':blob})]).then(function(){
        document.getElementById('v10ShareResult').innerHTML='<span class="v10-badge v10-badge-green">&#x2705; &#xD074;&#xB9BD;&#xBCF4;&#xB4DC;&#xC5D0; &#xBCF5;&#xC0AC;&#xB428;!</span>';
      });
    });
  }catch(e){
    document.getElementById('v10ShareResult').innerHTML='<span class="v10-badge v10-badge-orange">&#xC774;&#xBBF8;&#xC9C0;&#xB97C; &#xBA3C;&#xC800; &#xC0DD;&#xC131;&#xD574;&#xC8FC;&#xC138;&#xC694;</span>';
  }
};

// ====================================================================
// 10. DAILY QUIZ
// ====================================================================
var dailyQuizPool=[
  {q:'OB &#xD398;&#xB110;&#xD2F0;&#xB294; &#xBA87; &#xD0C0;?',a:['1&#xD0C0;','2&#xD0C0;','&#xBCFC; &#xBD84;&#xC2E4;&#xC740; 1&#xD0C0; &#xD398;&#xB110;&#xD2F0; + &#xAC70;&#xB9AC; &#xD398;&#xB110;&#xD2F0;'],c:1,exp:'OB &#xC2DC; 1&#xD0C0; &#xD398;&#xB110;&#xD2F0; + &#xAC70;&#xB9AC; &#xD398;&#xB110;&#xD2F0;&#xB85C; &#xC2E4;&#xC9C8;&#xC801;&#xC73C;&#xB85C; 2&#xD0C0; &#xCD94;&#xAC00;'},
  {q:'&#xADF8;&#xB9B0; &#xC704;&#xC5D0;&#xC11C; &#xBCFC;&#xC744; &#xB9C8;&#xD06C;&#xD560; &#xB54C; &#xCF54;&#xC778;&#xC744; &#xB193;&#xB294; &#xC704;&#xCE58;&#xB294;?',a:['&#xBCFC; &#xBC14;&#xB85C; &#xB4A4;','&#xBCFC; &#xBC14;&#xB85C; &#xC55E;','&#xBCFC; &#xBC14;&#xB85C; &#xC606;'],c:0,exp:'&#xBCFC;&#xB9C8;&#xD06C;&#xB294; &#xBCFC; &#xBC14;&#xB85C; &#xB4A4;&#xC5D0; &#xCF54;&#xC778;&#xC744; &#xB193;&#xC544; &#xBCFC;&#xC758; &#xC704;&#xCE58;&#xB97C; &#xD45C;&#xC2DC;'},
  {q:'&#xD30C; 3 &#xD640;&#xC5D0;&#xC11C; 2&#xD0C0;&#xB9CC;&#xC5D0; &#xB123;&#xC73C;&#xBA74;?',a:['&#xBC84;&#xB514;','&#xC774;&#xAE00;','&#xC54C;&#xBC14;&#xD2B8;&#xB85C;&#xC2A4;'],c:1,exp:'&#xD30C;&#xBCF4;&#xB2E4; 2&#xD0C0; &#xC801;&#xC73C;&#xBA74; &#xC774;&#xAE00;'},
  {q:'&#xB4DC;&#xB77C;&#xC774;&#xBC84; &#xB85C;&#xD504;&#xD2B8; &#xAC01;&#xB3C4;&#xB294; &#xBCF4;&#xD1B5; &#xBA87; &#xB3C4;?',a:['8-11&#xB3C4;','12-15&#xB3C4;','5-7&#xB3C4;'],c:0,exp:'&#xB4DC;&#xB77C;&#xC774;&#xBC84;&#xB294; &#xBCF4;&#xD1B5; 8-12&#xB3C4; &#xB85C;&#xD504;&#xD2B8;'},
  {q:'WHS &#xD578;&#xB514;&#xCE61; &#xACC4;&#xC0B0;&#xC5D0; &#xC0AC;&#xC6A9;&#xD558;&#xB294; &#xC2A4;&#xCF54;&#xC5B4; &#xC218;&#xB294;?',a:['&#xCD5C;&#xADFC; 20&#xB77C;&#xC6B4;&#xB4DC; &#xC911; 8&#xAC1C;','&#xCD5C;&#xADFC; 10&#xB77C;&#xC6B4;&#xB4DC; &#xC804;&#xCCB4;','&#xCD5C;&#xADFC; 5&#xB77C;&#xC6B4;&#xB4DC;'],c:0,exp:'WHS&#xB294; &#xCD5C;&#xADFC; 20&#xB77C;&#xC6B4;&#xB4DC; &#xC911; &#xC0C1;&#xC704; 8&#xAC1C; &#xC2A4;&#xCF54;&#xC5B4; &#xD3C9;&#xADE0;&#xC73C;&#xB85C; &#xACC4;&#xC0B0;'},
  {q:'&#xADF8;&#xB9B0;&#xC5D0;&#xC11C; &#xBCFC;&#xC774; &#xC6C0;&#xC9C1;&#xC600;&#xC744; &#xB54C; &#xD398;&#xB110;&#xD2F0;&#xB294;?',a:['1&#xD0C0;','2&#xD0C0;','&#xD398;&#xB110;&#xD2F0; &#xC5C6;&#xC74C; (&#xC6D0;&#xC704;&#xCE58; &#xD50C;&#xB808;&#xC774;)'],c:2,exp:'2019&#xB144; &#xADDC;&#xCE59; &#xAC1C;&#xC815;&#xC73C;&#xB85C; &#xADF8;&#xB9B0;&#xC5D0;&#xC11C; &#xC6B0;&#xC5F0;&#xD788; &#xBCFC;&#xC744; &#xC6C0;&#xC9C1;&#xC5EC;&#xB3C4; &#xBB34;&#xBC8C;'},
  {q:'&#xD2F0;&#xC0F7; &#xC2DC; &#xD2F0;&#xC758; &#xC801;&#xC808;&#xD55C; &#xB192;&#xC774;&#xB294;?',a:['1.5-2&#xC778;&#xCE58;','3&#xC778;&#xCE58; &#xC774;&#xC0C1;','&#xBC14;&#xB2E5;&#xC5D0; &#xBD99;&#xC5EC;&#xC11C;'],c:0,exp:'&#xBCFC;&#xC758; &#xC808;&#xBC18; &#xC815;&#xB3C4;&#xAC00; &#xD2F0; &#xC704;&#xB85C; &#xB098;&#xC624;&#xB294; 1.5-2&#xC778;&#xCE58;&#xAC00; &#xC801;&#xC808;'},
  {q:'&#xD074;&#xB7FD; 14&#xAC1C; &#xC81C;&#xD55C; &#xADDC;&#xC815;&#xC744; &#xC5B4;&#xAE30;&#xBA74;?',a:['&#xACBD;&#xACE0;','2&#xD0C0; &#xD398;&#xB110;&#xD2F0;/&#xD640;','&#xC2E4;&#xACA9;'],c:2,exp:'14&#xAC1C; &#xCD08;&#xACFC; &#xD074;&#xB7FD;&#xC73C;&#xB85C; &#xCE5C; &#xD640;&#xB9C8;&#xB2E4; 2&#xD0C0; &#xD398;&#xB110;&#xD2F0; (&#xCD5C;&#xB300; &#xB77C;&#xC6B4;&#xB4DC;&#xB2F9; 4&#xD0C0;)'},
  {q:'&#xBCFC;&#xC774; &#xC6CC;&#xD130;&#xD574;&#xC800;&#xB4DC;&#xC5D0; &#xBE60;&#xC84C;&#xC744; &#xB54C; &#xB4DC;&#xB86D; &#xC704;&#xCE58;&#xB294;?',a:['&#xB9C8;&#xC9C0;&#xB9C9; &#xACBD;&#xACC4; &#xC9C0;&#xC810;&#xC5D0;&#xC11C; &#xD074;&#xB7FD; 1&#xAC1C; &#xC774;&#xB0B4;','&#xBCFC;&#xC774; &#xB4E4;&#xC5B4;&#xAC04; &#xC9C0;&#xC810;','&#xB4DC;&#xB86D; &#xAD6C;&#xC5ED;'],c:0,exp:'&#xC6CC;&#xD130;&#xD574;&#xC800;&#xB4DC; &#xB4DC;&#xB86D;&#xC740; &#xB9C8;&#xC9C0;&#xB9C9; &#xACBD;&#xACC4; &#xC9C0;&#xC810;&#xC5D0;&#xC11C; 1&#xD074;&#xB7FD;&#xB808;&#xC2A4; &#xC774;&#xB0B4;&#xC5D0;&#xC11C; &#xD640;&#xC5D0; &#xAC00;&#xAE4C;&#xC6CC;&#xC9C0;&#xC9C0; &#xC54A;&#xAC8C;'},
  {q:'&#xBC14;&#xB78C;&#xC774; &#xAC15;&#xD560; &#xB54C; &#xBCFC;&#xC758; &#xD0C4;&#xB3C4;&#xB97C; &#xB0AE;&#xCDA4;&#xC5D0; &#xD558;&#xB824;&#xBA74;?',a:['&#xBCFC;&#xC744; &#xC2A4;&#xD0E0;&#xC2A4; &#xB4A4;&#xCCAD;&#xC5D0; &#xB193;&#xACE0; &#xC190;&#xC744; &#xC55E;&#xC73C;&#xB85C;','&#xB9AC;&#xD504;&#xD2B8;&#xB97C; &#xC62C;&#xB9AC;&#xACE0; &#xD30C;&#xC6CC; &#xC2A4;&#xC719;','&#xBCFC;&#xC744; &#xC55E;&#xCCAD;&#xC5D0; &#xB193;&#xACE0; &#xACF5;&#xC744; &#xB6F0;&#xC6CC;&#xC11C;'],c:0,exp:'&#xBCFC;&#xC744; &#xB4A4;&#xCCAD;&#xC5D0; &#xB193;&#xACE0; &#xC190;&#xC744; &#xC55E;&#xC73C;&#xB85C; &#xD558;&#xBA74; &#xB514;&#xB85C;&#xD504;&#xD305;&#xB418;&#xBA70; &#xB0AE;&#xC740; &#xD0C4;&#xB3C4; &#xC0F7; &#xAC00;&#xB2A5;'}
];

function renderDailyQuiz(){
  v10Sfx('daily');
  var today=new Date().toISOString().split('T')[0];
  var seed=0;for(var i=0;i<today.length;i++)seed+=today.charCodeAt(i);
  var qIdx=seed%dailyQuizPool.length;
  var q=dailyQuizPool[qIdx];
  var answered=localStorage.getItem('sg_daily_'+today);

  var html='<div class="v10-hdr"><h2><span class="v10i">&#x2753;</span> &#xC624;&#xB298;&#xC758; &#xACE8;&#xD504; &#xD000;&#xC988;</h2><button class="v10-x" onclick="closeV10()">&times;</button></div>';
  html+='<div class="v10-daily-card"><h4>&#x1F4A1; '+q.q+'</h4>';
  q.a.forEach(function(a,i){
    var cls='v10-daily-opt';
    if(answered){
      if(i===q.c) cls+=' correct';
      else if(parseInt(answered)===i&&i!==q.c) cls+=' wrong';
    }
    html+='<button class="'+cls+'" '+(answered?'disabled':'onclick="answerDaily('+qIdx+','+i+')"')+'>'+String.fromCharCode(9312+i)+' '+a+'</button>';
  });
  if(answered){
    html+='<div style="background:rgba(255,255,255,.15);border-radius:12px;padding:14px;margin-top:12px;text-align:left;font-size:12px;line-height:1.6"><strong>&#x1F4DA; &#xD574;&#xC124;:</strong> '+q.exp+'</div>';
  }
  html+='</div>';

  var streak=parseInt(localStorage.getItem('sg_daily_streak')||'0');
  html+='<div class="v10-grid3" style="margin-top:12px">';
  html+='<div class="v10-stat"><div class="v10-sv">'+streak+'</div><div class="v10-sl">&#xC5F0;&#xC18D; &#xC815;&#xB2F5;</div></div>';
  html+='<div class="v10-stat"><div class="v10-sv">'+dailyQuizPool.length+'</div><div class="v10-sl">&#xCD1D; &#xBB38;&#xC81C;</div></div>';
  html+='<div class="v10-stat"><div class="v10-sv">'+(answered?'&#x2705;':'&#x23F3;')+'</div><div class="v10-sl">&#xC624;&#xB298; &#xC0C1;&#xD0DC;</div></div>';
  html+='</div>';
  showV10(html);
}

window.answerDaily=function(qIdx,ans){
  var today=new Date().toISOString().split('T')[0];
  localStorage.setItem('sg_daily_'+today,String(ans));
  var streak=parseInt(localStorage.getItem('sg_daily_streak')||'0');
  if(ans===dailyQuizPool[qIdx].c){streak++;v10Sfx('goal_complete')}else{streak=0}
  localStorage.setItem('sg_daily_streak',String(streak));
  renderDailyQuiz();
};

// ====================================================================
// 11. MOTIVATIONAL QUOTES
// ====================================================================
var golfQuotes=[
  {q:'&#xACE8;&#xD504;&#xB294; &#xC544;&#xBB34;&#xB9AC; &#xC5F4;&#xC2EC;&#xD788; &#xC5F0;&#xC2B5;&#xD574;&#xB3C4; &#xBD80;&#xC871;&#xD55C; &#xC2A4;&#xD3EC;&#xCE20;&#xC774;&#xB2E4;. &#xADF8;&#xB798;&#xC11C; &#xB354; &#xBA4B;&#xC9C0;&#xB2E4;.',a:'&#xBCB4; &#xD638;&#xAC74;'},
  {q:'&#xC131;&#xACF5;&#xC740; &#xBC18;&#xBCF5;&#xC758; &#xACB0;&#xACFC;&#xC774;&#xB2E4;. &#xD55C; &#xBC88;&#xC758; &#xD589;&#xC6B4;&#xC774; &#xC544;&#xB2C8;&#xB77C;.',a:'&#xD0C0;&#xC774;&#xAC70; &#xC6B0;&#xC988;'},
  {q:'&#xAC00;&#xC7A5; &#xC911;&#xC694;&#xD55C; &#xC0F7;&#xC740; &#xB2E4;&#xC74C; &#xC0F7;&#xC774;&#xB2E4;.',a:'&#xBCB4; &#xD2B8;&#xB808;&#xBE44;&#xB178;'},
  {q:'&#xD37C;&#xD305;&#xC740; &#xACE8;&#xD504;&#xC758; 43%&#xB97C; &#xCC28;&#xC9C0;&#xD55C;&#xB2E4;. &#xC5F0;&#xC2B5;&#xC7A5;&#xC5D0;&#xC11C; &#xAC00;&#xC7A5; &#xBA3C;&#xC800; &#xD574;&#xC57C; &#xD560; &#xAC83;&#xC740; &#xD37C;&#xD305;&#xC774;&#xB2E4;.',a:'&#xC7AD; &#xB2C8;&#xD074;&#xB77C;&#xC6B0;&#xC2A4;'},
  {q:'&#xACE8;&#xD504;&#xB294; 6&#xC778;&#xCE58; &#xCEF5;&#xC5D0; &#xBCFC;&#xC744; &#xB123;&#xB294; &#xAC8C;&#xC784;&#xC774;&#xB2E4;. &#xADF8;&#xACB3;&#xAE4C;&#xC9C0; &#xAC00;&#xB294; &#xACFC;&#xC815;&#xC744; &#xC990;&#xACA8;&#xB77C;.',a:'&#xBCB4; &#xD638;&#xAC74;'},
  {q:'&#xC790;&#xC2E0;&#xAC10;&#xC740; &#xACE8;&#xD504;&#xC5D0;&#xC11C; &#xAC00;&#xC7A5; &#xC911;&#xC694;&#xD55C; &#xD074;&#xB7FD;&#xC774;&#xB2E4;.',a:'&#xC544;&#xB2C8;&#xCE74; &#xC18C;&#xB80C;&#xC2A4;&#xD0D0;'},
  {q:'&#xC2A4;&#xC719;&#xC744; &#xBC14;&#xAFD4;&#xB77C;&#xACE0; &#xD558;&#xC9C0; &#xB9C8;&#xB77C;. &#xC790;&#xC5F0;&#xC2A4;&#xB7FD;&#xAC8C; &#xB450;&#xC5B4;&#xB77C;.',a:'&#xC544;&#xB180;&#xB4DC; &#xD30C;&#xBA38;'},
  {q:'18&#xD640;&#xC744; &#xB3CC;&#xBA74;&#xC11C; &#xC778;&#xC0DD;&#xC744; &#xBC30;&#xC6B4;&#xB2E4;.',a:'&#xD558;&#xBE44; &#xC544;&#xC708;'},
  {q:'&#xB098;&#xC058; &#xB77C;&#xC6B4;&#xB4DC;&#xB3C4; &#xC88B;&#xC740; &#xC0B0;&#xCC45;&#xBCF4;&#xB2E4; &#xB0AB;&#xB2E4;.',a:'&#xACE8;&#xD504; &#xACA9;&#xC5B8;'},
  {q:'&#xACE8;&#xD504;&#xC5D0;&#xC11C; &#xAC00;&#xC7A5; &#xC5B4;&#xB824;&#xC6B4; &#xAC83;&#xC740; &#xAC04;&#xB2E8;&#xD558;&#xAC8C; &#xCE58;&#xB294; &#xAC83;&#xC774;&#xB2E4;.',a:'&#xC0D8; &#xC2A4;&#xB2C8;&#xB4DC;'}
];

function showDailyQuote(){
  var today=new Date();
  var dayOfYear=Math.floor((today-new Date(today.getFullYear(),0,0))/(86400000));
  var q=golfQuotes[dayOfYear%golfQuotes.length];
  var quoteDiv=document.createElement('div');
  quoteDiv.className='v10-quote';
  quoteDiv.innerHTML='<div class="v10-qt">&ldquo;'+q.q+'&rdquo;</div><div class="v10-qa">&mdash; '+q.a+'</div>';
  var statsBar=document.querySelector('.stats-bar');
  if(statsBar&&!document.getElementById('v10DailyQuote')){
    quoteDiv.id='v10DailyQuote';
    quoteDiv.style.maxWidth='1400px';quoteDiv.style.margin='0 auto';quoteDiv.style.padding='12px 20px';
    statsBar.parentNode.insertBefore(quoteDiv,statsBar.nextSibling);
  }
}

// ====================================================================
// 12. QUICK ACTION BUTTONS
// ====================================================================
function addV10QuickActions(){
  var qbtns=[
    {icon:'&#x1F3B5;',label:'&#xD15C;&#xD3EC;',fn:'renderMetronome'},
    {icon:'&#x1F4D6;',label:'&#xC0F7;&#xB3C4;&#xAC10;',fn:'renderShotEncyclopedia'},
    {icon:'&#x1F393;',label:'&#xC544;&#xCE74;&#xB370;&#xBBF8;',fn:'renderAcademy'},
    {icon:'&#x1F4C5;',label:'&#xCE98;&#xB9B0;&#xB354;',fn:'renderCalendar'},
    {icon:'&#x1F3AF;',label:'&#xBAA9;&#xD45C;',fn:'renderGoals'},
    {icon:'&#x1F4DD;',label:'&#xC800;&#xB110;',fn:'renderJournal'},
    {icon:'&#x1F4F1;',label:'&#xACF5;&#xC720;&#xCE74;&#xB4DC;',fn:'renderShareCard'},
    {icon:'&#x2753;',label:'&#xC624;&#xB298;&#xD000;&#xC988;',fn:'renderDailyQuiz'}
  ];
  var row=document.createElement('div');row.className='v10-qrow';row.id='v10QuickRow';
  qbtns.forEach(function(b){
    row.innerHTML+='<div class="v10-qbtn" onclick="'+b.fn+'()"><div class="v10-qi">'+b.icon+'</div>'+b.label+'</div>';
  });
  var existing=document.querySelector('.v9-quick-row');
  if(existing) existing.parentNode.insertBefore(row,existing.nextSibling);
  else{
    var ss=document.querySelector('.search-section');
    if(ss) ss.appendChild(row);
  }
}

// ====================================================================
// 13. KEYBOARD SHORTCUTS (v10)
// ====================================================================
document.addEventListener('keydown',function(e){
  var t=e.target.tagName;
  if(t==='INPUT'||t==='TEXTAREA'||t==='SELECT') return;
  switch(e.key.toUpperCase()){
    case 'W': renderMetronome();break;
    case 'E': renderShotEncyclopedia();break;
    case 'L': renderAcademy();break;
    case 'C': renderCalendar();break;
    case 'O': renderGoals();break;
    case 'J': renderJournal();break;
    case 'X': renderShareCard();break;
    case 'Q': renderDailyQuiz();break;
  }
});

document.addEventListener('keydown',function(e){
  if(e.key==='Escape') v10Ov.classList.remove('active');
});

// ====================================================================
// 14. EXPOSE GLOBALS + INIT
// ====================================================================
window.renderMetronome=renderMetronome;
window.renderShotEncyclopedia=renderShotEncyclopedia;
window.renderAcademy=renderAcademy;
window.renderCalendar=renderCalendar;
window.renderGoals=renderGoals;
window.renderJournal=renderJournal;
window.renderShareCard=renderShareCard;
window.renderDailyQuiz=renderDailyQuiz;
window.closeV10=closeV10;

addV10QuickActions();
showDailyQuote();

})();
