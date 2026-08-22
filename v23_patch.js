(function(){
'use strict';

var css23=document.createElement('style');
css23.textContent=`
.v23-overlay{position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,.88);z-index:10600;display:none;align-items:center;justify-content:center;backdrop-filter:blur(20px)}
.v23-overlay.active{display:flex}
.v23-modal{background:var(--card-bg,#fff);border-radius:28px;padding:32px;width:97%;max-width:940px;max-height:94vh;overflow-y:auto;box-shadow:0 48px 140px rgba(0,0,0,.7);animation:v23Rise .35s cubic-bezier(.22,1,.36,1)}
@keyframes v23Rise{from{opacity:0;transform:translateY(48px) scale(.92)}to{opacity:1;transform:translateY(0) scale(1)}}
.v23-hdr{display:flex;justify-content:space-between;align-items:center;margin-bottom:22px}
.v23-hdr h2{font-size:24px;font-weight:800;display:flex;align-items:center;gap:10px}
.v23-hdr h2 .v23i{font-size:30px}
.v23-x{background:none;border:none;font-size:30px;cursor:pointer;color:var(--text-muted);padding:4px 10px;border-radius:10px;transition:.2s}
.v23-x:hover{background:var(--border);color:var(--text)}
.v23-tabs{display:flex;gap:6px;margin-bottom:18px;overflow-x:auto;padding-bottom:4px;scrollbar-width:none}
.v23-tabs::-webkit-scrollbar{display:none}
.v23-tab{padding:10px 20px;border-radius:26px;border:1.5px solid var(--border);background:var(--bg);font-size:12px;font-weight:700;cursor:pointer;white-space:nowrap;transition:.25s}
.v23-tab.active{background:var(--primary);color:#fff;border-color:var(--primary);box-shadow:0 3px 16px rgba(26,122,58,.35)}
.v23-card{background:var(--bg);border-radius:18px;padding:20px;margin-bottom:12px;transition:.25s;border:1.5px solid transparent}
.v23-card:hover{border-color:var(--primary);transform:translateY(-2px);box-shadow:0 4px 18px rgba(26,122,58,.12)}
.v23-card h4{font-size:15px;font-weight:700;margin-bottom:8px;display:flex;align-items:center;gap:8px}
.v23-card p{font-size:12px;color:var(--text-muted);line-height:1.7}
.v23-btn{padding:11px 24px;border:none;border-radius:14px;font-size:13px;font-weight:700;cursor:pointer;transition:.25s;display:inline-flex;align-items:center;gap:6px}
.v23-btn-primary{background:linear-gradient(135deg,var(--primary),#2e9e4f);color:#fff}
.v23-btn-primary:hover{transform:translateY(-2px);box-shadow:0 8px 22px rgba(26,122,58,.4)}
.v23-btn-sm{padding:7px 14px;font-size:11px;border-radius:10px}
.v23-btn-secondary{background:var(--bg);color:var(--text);border:1.5px solid var(--border)}
.v23-btn-secondary:hover{border-color:var(--primary);color:var(--primary)}
.v23-input{width:100%;padding:11px 16px;border:2px solid var(--border);border-radius:12px;font-size:13px;background:var(--bg);color:var(--text);transition:.2s}
.v23-input:focus{border-color:var(--primary);outline:none;box-shadow:0 0 0 3px rgba(26,122,58,.12)}
.v23-grid2{display:grid;grid-template-columns:1fr 1fr;gap:12px}
.v23-grid3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px}
@media(max-width:520px){.v23-grid2,.v23-grid3{grid-template-columns:1fr}}
.v23-divider{height:1px;background:var(--border);margin:18px 0}
.v23-badge{display:inline-block;padding:5px 14px;border-radius:16px;font-size:11px;font-weight:700}
.v23-progress{width:100%;height:14px;background:var(--border);border-radius:7px;overflow:hidden;margin:8px 0}
.v23-progress-fill{height:100%;border-radius:7px;transition:width .6s ease}
.v23-stat-row{display:flex;justify-content:space-between;align-items:center;padding:13px 0;border-bottom:1px solid var(--border)}
.v23-stat-row:last-child{border-bottom:none}
.v23-glossary-item{background:var(--bg);border-radius:14px;padding:14px;margin-bottom:8px;cursor:pointer;transition:.25s;border-left:4px solid var(--primary)}
.v23-glossary-item:hover{transform:translateX(4px)}
.v23-glossary-term{font-size:15px;font-weight:800;color:var(--primary);margin-bottom:2px}
.v23-glossary-eng{font-size:11px;color:var(--text-muted);margin-bottom:4px}
.v23-glossary-def{font-size:12px;line-height:1.6;color:var(--text)}
.v23-glossary-level{display:inline-block;padding:2px 8px;border-radius:8px;font-size:10px;font-weight:700;margin-left:8px}
.v23-lvl-beginner{background:#e8f5e9;color:#2e7d32}
.v23-lvl-intermediate{background:#fff3e0;color:#e65100}
.v23-lvl-advanced{background:#fce4ec;color:#c62828}
.v23-swing-canvas{width:100%;max-width:600px;height:320px;margin:0 auto 16px;display:block;border-radius:16px;border:2px solid var(--border);background:#f9faf9}
[data-theme="dark"] .v23-swing-canvas{background:#1a1a1a}
.v23-swing-step{display:flex;gap:12px;align-items:center;padding:14px;background:var(--bg);border-radius:14px;margin-bottom:8px;cursor:pointer;transition:.25s}
.v23-swing-step:hover{background:var(--primary-light)}
.v23-swing-step.checked{border-left:4px solid #4caf50}
.v23-swing-num{width:36px;height:36px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:16px;font-weight:800;flex-shrink:0;background:var(--primary);color:#fff}
.v23-swing-step.checked .v23-swing-num{background:#4caf50}
.v23-drill-card{background:var(--bg);border-radius:16px;padding:16px;margin-bottom:10px;display:flex;gap:14px;align-items:center;transition:.25s}
.v23-drill-card:hover{transform:translateY(-1px);border-color:var(--primary)}
.v23-drill-icon{width:48px;height:48px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:22px;flex-shrink:0}
.v23-drill-info{flex:1}
.v23-drill-name{font-size:14px;font-weight:700;margin-bottom:3px}
.v23-drill-desc{font-size:11px;color:var(--text-muted);line-height:1.5}
.v23-drill-time{font-size:10px;color:var(--primary);font-weight:700;margin-top:3px}
.v23-remind-item{background:var(--bg);border-radius:14px;padding:16px;margin-bottom:10px;border-left:4px solid #ff6b35}
.v23-remind-dday{font-size:28px;font-weight:900;color:var(--primary);text-align:center;margin:8px 0}
.v23-review-stars{display:flex;gap:4px;margin:6px 0}
.v23-review-star{font-size:20px;cursor:pointer;color:var(--border);transition:.2s}
.v23-review-star.active{color:#f59e0b}
.v23-quote-box{background:linear-gradient(135deg,var(--primary-dark),var(--primary));color:#fff;border-radius:20px;padding:24px;text-align:center;margin-bottom:16px}
.v23-quote-text{font-size:16px;font-weight:600;line-height:1.7;margin-bottom:12px;font-style:italic}
.v23-quote-author{font-size:12px;opacity:.8}
.v23-trend-canvas{width:100%;max-width:620px;height:280px;margin:0 auto 16px;display:block;border-radius:16px;border:2px solid var(--border)}
.v23-checklist-item{display:flex;align-items:center;gap:10px;padding:10px;background:var(--bg);border-radius:10px;margin-bottom:6px;cursor:pointer;transition:.2s}
.v23-checklist-item.done{opacity:.5;text-decoration:line-through}
.v23-checklist-check{width:24px;height:24px;border-radius:6px;border:2px solid var(--border);display:flex;align-items:center;justify-content:center;font-size:14px;flex-shrink:0;transition:.2s}
.v23-checklist-item.done .v23-checklist-check{background:var(--primary);border-color:var(--primary);color:#fff}
`;
document.head.appendChild(css23);

// ===== SFX ENGINE =====
var v23AC;
try{v23AC=new(window.AudioContext||window.webkitAudioContext)();}catch(e){v23AC=null;}
function v23SFX(type){
  if(!v23AC)return;
  if(v23AC.state==='suspended')v23AC.resume();
  var o=v23AC.createOscillator(),g=v23AC.createGain(),t=v23AC.currentTime;
  o.connect(g);g.connect(v23AC.destination);
  var presets={
    glossary_open:[440,.15,'sine'],glossary_search:[520,.1,'triangle'],
    swing_open:[330,.15,'sine'],swing_check:[660,.12,'triangle'],swing_complete:[880,.2,'sine'],
    drill_open:[392,.15,'sine'],drill_start:[523,.12,'triangle'],
    remind_open:[370,.15,'sine'],remind_save:[587,.12,'triangle'],
    review_open:[415,.15,'sine'],review_save:[622,.12,'triangle'],
    quote_open:[466,.15,'sine'],quote_refresh:[554,.1,'triangle'],
    trend_open:[349,.15,'sine'],trend_draw:[494,.12,'triangle'],
    quiz_v8_open:[440,.15,'sine'],quiz_v8_correct:[880,.15,'triangle'],
    quiz_v8_wrong:[220,.15,'sawtooth'],achievement_v23:[660,.25,'sine']
  };
  var p=presets[type]||[440,.12,'sine'];
  o.frequency.setValueAtTime(p[0],t);
  o.type=p[2];
  g.gain.setValueAtTime(0.15,t);
  g.gain.exponentialRampToValueAtTime(0.001,t+p[1]);
  o.start(t);o.stop(t+p[1]);
}

// ===== 1. GOLF GLOSSARY 150 TERMS =====
var v23Glossary=[
{t:'&#xC5D0;&#xC774;&#xC2A4;',e:'Ace',d:'&#xD640;&#xC778;&#xC6D0;. &#xD2F0;&#xC0F7;&#xC5D0;&#xC11C; &#xD55C; &#xBC88;&#xC758; &#xC2A4;&#xD2B8;&#xB85C;&#xD06C;&#xB85C; &#xACF5;&#xC744; &#xD640;&#xC5D0; &#xB123;&#xB294; &#xAC83;.',l:'b'},
{t:'&#xC54C;&#xBC14;&#xD2B8;&#xB85C;&#xC2A4;',e:'Albatross',d:'&#xD30C; &#xB300;&#xBE44; 3&#xD0C0; &#xC801;&#xC740; &#xC2A4;&#xCF54;&#xC5B4;. &#xB354;&#xBE14;&#xC774;&#xAE00;&#xC774;&#xB77C;&#xACE0;&#xB3C4; &#xD568;.',l:'a'},
{t:'&#xC5B4;&#xD504;&#xB85C;&#xCE58;',e:'Approach',d:'&#xADF8;&#xB9B0;&#xC744; &#xD5A5;&#xD574; &#xCE58;&#xB294; &#xC0F7;. &#xBCF4;&#xD1B5; 100&#xBBF8;&#xD130; &#xC774;&#xB0B4;&#xC758; &#xC0F7;&#xC744; &#xB9D0;&#xD568;.',l:'b'},
{t:'&#xC5B4;&#xB4DC;&#xB808;&#xC2A4;',e:'Address',d:'&#xACF5;&#xC744; &#xCE58;&#xAE30; &#xC804; &#xC2A4;&#xD0E0;&#xC2A4;&#xB97C; &#xC7A1;&#xACE0; &#xD074;&#xB7FD; &#xD5E4;&#xB4DC;&#xB97C; &#xACF5; &#xB4A4;&#xC5D0; &#xB193;&#xB294; &#xC790;&#xC138;.',l:'b'},
{t:'&#xBC31;&#xC2A4;&#xC719;',e:'Backswing',d:'&#xD074;&#xB7FD;&#xC744; &#xB4A4;&#xB85C; &#xB4E4;&#xC5B4;&#xC62C;&#xB9AC;&#xB294; &#xB3D9;&#xC791;. &#xC2A4;&#xC719;&#xC758; &#xCCAB; &#xBC88;&#xC9F8; &#xB2E8;&#xACC4;.',l:'b'},
{t:'&#xBC84;&#xB514;',e:'Birdie',d:'&#xD30C; &#xB300;&#xBE44; 1&#xD0C0; &#xC801;&#xC740; &#xC2A4;&#xCF54;&#xC5B4;.',l:'b'},
{t:'&#xBCF4;&#xAE30;',e:'Bogey',d:'&#xD30C; &#xB300;&#xBE44; 1&#xD0C0; &#xB9CE;&#xC740; &#xC2A4;&#xCF54;&#xC5B4;.',l:'b'},
{t:'&#xBC88;&#xCEE4;',e:'Bunker',d:'&#xBAA8;&#xB798;&#xB85C; &#xCC44;&#xC6CC;&#xC9C4; &#xD574;&#xC800;&#xB4DC; &#xAD6C;&#xC5ED;.',l:'b'},
{t:'&#xCE90;&#xB514;',e:'Caddie',d:'&#xD50C;&#xB808;&#xC774;&#xC5B4;&#xC758; &#xD074;&#xB7FD;&#xC744; &#xC6B4;&#xBC18;&#xD558;&#xACE0; &#xC870;&#xC5B8;&#xC744; &#xD574;&#xC8FC;&#xB294; &#xC0AC;&#xB78C;.',l:'b'},
{t:'&#xCE69;&#xC0F7;',e:'Chip Shot',d:'&#xADF8;&#xB9B0; &#xC8FC;&#xBCC0;&#xC5D0;&#xC11C; &#xB0AE;&#xAC8C; &#xCE58;&#xB294; &#xC0F7;. &#xACF5;&#xC774; &#xAD6C;&#xB974;&#xB294; &#xC2DC;&#xAC04;&#xC774; &#xAE40;.',l:'b'},
{t:'&#xB514;&#xBCBF;',e:'Divot',d:'&#xC2A4;&#xC719; &#xC2DC; &#xD074;&#xB7FD;&#xC774; &#xB545;&#xC744; &#xD30C;&#xBA74;&#xC11C; &#xB5A8;&#xC5B4;&#xC838; &#xB098;&#xAC04; &#xC794;&#xB514; &#xC870;&#xAC01;.',l:'b'},
{t:'&#xB4DC;&#xB85C;&#xC6B0;',e:'Draw',d:'&#xACF5;&#xC774; &#xC624;&#xB978;&#xCABD;&#xC5D0;&#xC11C; &#xC67C;&#xCABD;&#xC73C;&#xB85C; &#xC0B4;&#xC9DD; &#xD718;&#xC5B4;&#xC9C0;&#xB294; &#xAD6C;&#xC9C8;.',l:'i'},
{t:'&#xB4DC;&#xB77C;&#xC774;&#xBC84;',e:'Driver',d:'&#xAC00;&#xC7A5; &#xBA3C; &#xAC70;&#xB9AC;&#xB97C; &#xBCF4;&#xB0B4;&#xB294; 1&#xBC88; &#xC6B0;&#xB4DC; &#xD074;&#xB7FD;.',l:'b'},
{t:'&#xC774;&#xAE00;',e:'Eagle',d:'&#xD30C; &#xB300;&#xBE44; 2&#xD0C0; &#xC801;&#xC740; &#xC2A4;&#xCF54;&#xC5B4;.',l:'b'},
{t:'&#xD398;&#xC5B4;&#xC6E8;&#xC774;',e:'Fairway',d:'&#xD2F0;&#xC640; &#xADF8;&#xB9B0; &#xC0AC;&#xC774;&#xC758; &#xC794;&#xB514;&#xAC00; &#xC798; &#xAD00;&#xB9AC;&#xB41C; &#xAD6C;&#xC5ED;.',l:'b'},
{t:'&#xD398;&#xC774;&#xB4DC;',e:'Fade',d:'&#xACF5;&#xC774; &#xC67C;&#xCABD;&#xC5D0;&#xC11C; &#xC624;&#xB978;&#xCABD;&#xC73C;&#xB85C; &#xC0B4;&#xC9DD; &#xD718;&#xC5B4;&#xC9C0;&#xB294; &#xAD6C;&#xC9C8;.',l:'i'},
{t:'&#xD50C;&#xB7AB;',e:'Flat',d:'&#xC2A4;&#xC719; &#xD3C9;&#xBA74;&#xC774; &#xC218;&#xD3C9;&#xC5D0; &#xAC00;&#xAE4C;&#xC6B4; &#xC2A4;&#xC719; &#xD615;&#xD0DC;.',l:'i'},
{t:'&#xD50C;&#xB86D;',e:'Flop',d:'&#xB192;&#xC774; &#xB744;&#xC6B0;&#xACE0; &#xC9E7;&#xAC8C; &#xCE58;&#xB294; &#xC0F7;. &#xBC99;&#xCEE4; &#xB2D8;&#xAE30; &#xB4F1;&#xC5D0; &#xC0AC;&#xC6A9;.',l:'a'},
{t:'&#xD3EC;&#xC5B4;&#xC378;',e:'Foursome',d:'4&#xBA85;&#xC774; &#xD568;&#xAED8; &#xB77C;&#xC6B4;&#xB4DC;&#xD558;&#xB294; &#xACBD;&#xAE30; &#xBC29;&#xC2DD;.',l:'b'},
{t:'&#xADF8;&#xB9B0;',e:'Green',d:'&#xD640; &#xC8FC;&#xBCC0;&#xC758; &#xAD6C;&#xC5ED;&#xC73C;&#xB85C; &#xC794;&#xB514;&#xAC00; &#xB9E4;&#xC6B0; &#xC9E7;&#xAC8C; &#xAE4E;&#xC778; &#xD37C;&#xD305; &#xC601;&#xC5ED;.',l:'b'},
{t:'&#xADF8;&#xB9B0;&#xD53C;',e:'Green Fee',d:'&#xACE8;&#xD504;&#xC7A5; &#xC774;&#xC6A9;&#xB8CC;.',l:'b'},
{t:'&#xADF8;&#xB9BD;',e:'Grip',d:'&#xD074;&#xB7FD;&#xC744; &#xC7A1;&#xB294; &#xBC29;&#xBC95; &#xB610;&#xB294; &#xD074;&#xB7FD;&#xC758; &#xC190;&#xC7A1;&#xC774; &#xBD80;&#xBD84;.',l:'b'},
{t:'GIR',e:'Green in Regulation',d:'&#xADDC;&#xC815;&#xD0C0;&#xC218; &#xC774;&#xB0B4;&#xC5D0; &#xADF8;&#xB9B0;&#xC5D0; &#xACF5;&#xC744; &#xC62C;&#xB9AC;&#xB294; &#xAC83;. &#xD30C;4&#xB294; 2&#xD0C0;, &#xD30C;5&#xB294; 3&#xD0C0;.',l:'i'},
{t:'&#xD575;&#xB514;&#xCEA1;',e:'Handicap',d:'&#xACE8;&#xD37C;&#xC758; &#xC2E4;&#xB825;&#xC744; &#xC218;&#xCE58;&#xD654;&#xD55C; &#xAC83;. &#xB0AE;&#xC744;&#xC218;&#xB85D; &#xC2E4;&#xB825;&#xC774; &#xC88B;&#xC74C;.',l:'b'},
{t:'&#xD574;&#xC800;&#xB4DC;',e:'Hazard',d:'&#xCF54;&#xC2A4; &#xB0B4; &#xC7A5;&#xC560;&#xBB3C;. &#xBC99;&#xCEE4;, &#xC6CC;&#xD130; &#xD574;&#xC800;&#xB4DC; &#xB4F1;.',l:'b'},
{t:'&#xD6C4;&#xD06C;',e:'Hook',d:'&#xACF5;&#xC774; &#xC624;&#xB978;&#xCABD;&#xC5D0;&#xC11C; &#xC67C;&#xCABD;&#xC73C;&#xB85C; &#xD06C;&#xAC8C; &#xD718;&#xC5B4;&#xC9C0;&#xB294; &#xAD6C;&#xC9C8;.',l:'i'},
{t:'&#xC784;&#xD329;&#xD2B8;',e:'Impact',d:'&#xD074;&#xB7FD; &#xD5E4;&#xB4DC;&#xAC00; &#xACF5;&#xACFC; &#xB9DE;&#xB2FF;&#xB294; &#xC21C;&#xAC04;.',l:'b'},
{t:'&#xC778;&#xD50C;&#xB808;&#xC774;',e:'In Play',d:'&#xACF5;&#xC774; &#xD2F0;&#xC0F7; &#xD6C4; OB&#xB098; &#xBD84;&#xC2E4;&#xAD6C; &#xC5C6;&#xC774; &#xD50C;&#xB808;&#xC774; &#xC911;&#xC778; &#xC0C1;&#xD0DC;.',l:'b'},
{t:'&#xC544;&#xC774;&#xC5B8;',e:'Iron',d:'&#xAE08;&#xC18D; &#xD5E4;&#xB4DC;&#xC758; &#xD074;&#xB7FD;. 3~9&#xBC88;&#xACFC; &#xC6E8;&#xC9C0;&#xAC00; &#xC788;&#xC74C;.',l:'b'},
{t:'&#xB808;&#xC774;',e:'Lie',d:'&#xACF5;&#xC774; &#xB193;&#xC5EC; &#xC788;&#xB294; &#xC704;&#xCE58;&#xC640; &#xC0C1;&#xD0DC;.',l:'b'},
{t:'&#xB77C;&#xC778;',e:'Line',d:'&#xACF5;&#xC774; &#xAD6C;&#xB974;&#xAC70;&#xB098; &#xB0A0;&#xC544;&#xAC08; &#xC608;&#xC0C1; &#xACBD;&#xB85C;.',l:'b'},
{t:'&#xB85C;&#xD504;&#xD2B8;',e:'Loft',d:'&#xD074;&#xB7FD;&#xD398;&#xC774;&#xC2A4;&#xC758; &#xAC01;&#xB3C4;. &#xB85C;&#xD504;&#xD2B8;&#xAC00; &#xD074;&#xC218;&#xB85D; &#xACF5;&#xC774; &#xB192;&#xC774; &#xB5DC;.',l:'i'},
{t:'&#xB9E4;&#xCE58;&#xD50C;&#xB808;&#xC774;',e:'Match Play',d:'&#xD640;&#xBCC4; &#xC2B9;&#xBD80;&#xB85C; &#xACBD;&#xAE30;&#xD558;&#xB294; &#xBC29;&#xC2DD;.',l:'i'},
{t:'&#xBA4E;&#xB9AC;&#xAC74;',e:'Mulligan',d:'&#xBE44;&#xACF5;&#xC2DD;&#xC801;&#xC73C;&#xB85C; &#xC7AC;&#xC0F7;&#xC744; &#xD5C8;&#xC6A9;&#xD558;&#xB294; &#xAD00;&#xD589;.',l:'b'},
{t:'&#xB2C8;&#xC5B4;&#xD540;',e:'Nearest Pin',d:'&#xD30C;3 &#xD640;&#xC5D0;&#xC11C; &#xD540;&#xC5D0; &#xAC00;&#xC7A5; &#xAC00;&#xAE5C;&#xC774; &#xBD99;&#xC778; &#xC0AC;&#xB78C;&#xC774; &#xC774;&#xAE30;&#xB294; &#xAC8C;&#xC784;.',l:'b'},
{t:'OB',e:'Out of Bounds',d:'&#xCF54;&#xC2A4; &#xACBD;&#xACC4; &#xBC16;&#xC73C;&#xB85C; &#xACF5;&#xC774; &#xB098;&#xAC04; &#xAC83;. 1&#xBC8C;&#xD0C0; &#xBD80;&#xACFC;.',l:'b'},
{t:'&#xD30C;',e:'Par',d:'&#xD640;&#xC5D0; &#xC124;&#xC815;&#xB41C; &#xAE30;&#xC900; &#xD0C0;&#xC218;.',l:'b'},
{t:'&#xD37C;&#xD305;',e:'Putting',d:'&#xADF8;&#xB9B0; &#xC704;&#xC5D0;&#xC11C; &#xD37C;&#xD130;&#xB85C; &#xACF5;&#xC744; &#xAD6C;&#xB974;&#xB294; &#xAC83;.',l:'b'},
{t:'&#xD37C;&#xD130;',e:'Putter',d:'&#xADF8;&#xB9B0; &#xC704;&#xC5D0;&#xC11C; &#xACF5;&#xC744; &#xAD6C;&#xB974;&#xB294; &#xB370; &#xC0AC;&#xC6A9;&#xD558;&#xB294; &#xD074;&#xB7FD;.',l:'b'},
{t:'&#xB7EC;&#xD504;',e:'Rough',d:'&#xD398;&#xC5B4;&#xC6E8;&#xC774; &#xBC14;&#xAE65;&#xC758; &#xC794;&#xB514;&#xAC00; &#xAE34; &#xAD6C;&#xC5ED;.',l:'b'},
{t:'&#xC0E4;&#xD504;&#xD2B8;',e:'Shaft',d:'&#xD074;&#xB7FD;&#xC758; &#xAE34; &#xB9C9;&#xB300; &#xBD80;&#xBD84;.',l:'b'},
{t:'&#xC2AC;&#xB77C;&#xC774;&#xC2A4;',e:'Slice',d:'&#xACF5;&#xC774; &#xC67C;&#xCABD;&#xC5D0;&#xC11C; &#xC624;&#xB978;&#xCABD;&#xC73C;&#xB85C; &#xD06C;&#xAC8C; &#xD718;&#xC5B4;&#xC9C0;&#xB294; &#xAD6C;&#xC9C8;.',l:'i'},
{t:'&#xC2A4;&#xD0E0;&#xC2A4;',e:'Stance',d:'&#xC2A4;&#xC719; &#xC2DC; &#xBC1C;&#xC758; &#xC704;&#xCE58;&#xC640; &#xBC29;&#xD5A5;.',l:'b'},
{t:'&#xC2A4;&#xD2B8;&#xB85C;&#xD06C;',e:'Stroke',d:'&#xACF5;&#xC744; &#xCE58;&#xB294; &#xB3D9;&#xC791; 1&#xD68C;. &#xAE30;&#xB85D; &#xB2E8;&#xC704;.',l:'b'},
{t:'&#xC2A4;&#xD2B8;&#xB85C;&#xD06C;&#xD50C;&#xB808;&#xC774;',e:'Stroke Play',d:'&#xCD1D; &#xD0C0;&#xC218;&#xB85C; &#xC2B9;&#xBD80;&#xB97C; &#xACA8;&#xB8E8;&#xB294; &#xBC29;&#xC2DD;.',l:'i'},
{t:'&#xD2F0;',e:'Tee',d:'&#xACF5;&#xC744; &#xC62C;&#xB824;&#xB193;&#xB294; &#xC791;&#xC740; &#xBC1B;&#xCE68;&#xB300; &#xB610;&#xB294; &#xCCAB; &#xC0F7;&#xC744; &#xCE58;&#xB294; &#xAD6C;&#xC5ED;.',l:'b'},
{t:'&#xD2F0;&#xC0F7;',e:'Tee Shot',d:'&#xAC01; &#xD640;&#xC758; &#xCCAB; &#xBC88;&#xC9F8; &#xC0F7;.',l:'b'},
{t:'&#xD2F0;&#xC5C5;',e:'Tee Up',d:'&#xD2F0; &#xC704;&#xC5D0; &#xACF5;&#xC744; &#xC62C;&#xB824;&#xB193;&#xB294; &#xAC83;.',l:'b'},
{t:'&#xD0D1;',e:'Top',d:'&#xACF5;&#xC758; &#xC717;&#xBD80;&#xBD84;&#xC744; &#xCE58;&#xB294; &#xBBF8;&#xC2A4;&#xC0F7;. &#xACF5;&#xC774; &#xB545;&#xC744; &#xAD6C;&#xB984;.',l:'i'},
{t:'&#xC6B0;&#xB4DC;',e:'Wood',d:'&#xBA3C; &#xAC70;&#xB9AC;&#xB97C; &#xBCF4;&#xB0B4;&#xB294; &#xD074;&#xB7FD;. &#xB4DC;&#xB77C;&#xC774;&#xBC84;, 3&#xBC88;&#xC6B0;&#xB4DC; &#xB4F1;.',l:'b'},
{t:'&#xC6E8;&#xC9C0;',e:'Wedge',d:'&#xC9E7;&#xC740; &#xAC70;&#xB9AC;&#xC758; &#xC0F7;&#xC5D0; &#xC0AC;&#xC6A9;&#xD558;&#xB294; &#xD074;&#xB7FD;. PW, SW, LW &#xB4F1;.',l:'b'},
{t:'&#xC6CC;&#xD130;&#xD574;&#xC800;&#xB4DC;',e:'Water Hazard',d:'&#xCF54;&#xC2A4; &#xB0B4; &#xC5F0;&#xBABB;, &#xAC1C;&#xC6B8; &#xB4F1; &#xBB3C;&#xC774; &#xC788;&#xB294; &#xAD6C;&#xC5ED;.',l:'b'},
{t:'&#xD540;',e:'Pin',d:'&#xD640;&#xC758; &#xC704;&#xCE58;&#xB97C; &#xD45C;&#xC2DC;&#xD558;&#xB294; &#xAE43;&#xB300;(&#xD50C;&#xB798;&#xADF8;&#xC2A4;&#xD2F1;).',l:'b'},
{t:'&#xD50C;&#xB808;&#xC774;&#xC624;&#xD504;',e:'Playoff',d:'&#xB3D9;&#xD0C0; &#xC2DC; &#xC2B9;&#xBD80;&#xB97C; &#xAC00;&#xB9AC;&#xAE30; &#xC704;&#xD55C; &#xC5F0;&#xC7A5;&#xC804;.',l:'i'},
{t:'&#xB808;&#xC774;&#xC5C5;',e:'Lay Up',d:'&#xC7A5;&#xC560;&#xBB3C;&#xC744; &#xD53C;&#xD574; &#xC758;&#xB3C4;&#xC801;&#xC73C;&#xB85C; &#xC9E7;&#xAC8C; &#xCE58;&#xB294; &#xC804;&#xB7B5;&#xC801; &#xC0F7;.',l:'i'},
{t:'&#xD504;&#xB9AC;&#xC0F7;&#xB8E8;&#xD2F4;',e:'Pre-shot Routine',d:'&#xC0F7; &#xC804; &#xC2E4;&#xD589;&#xD558;&#xB294; &#xC77C;&#xB828;&#xC758; &#xC900;&#xBE44; &#xB3D9;&#xC791;.',l:'i'},
{t:'&#xD3EC;&#xC5B4;&#xC12C;',e:'Foursome',d:'2&#xC778;1&#xC870; 4&#xBA85;&#xC774; &#xBC88;&#xAC08;&#xC544; &#xCE58;&#xB294; &#xACBD;&#xAE30; &#xBC29;&#xC2DD;.',l:'a'},
{t:'&#xBCA0;&#xC2A4;&#xD2B8;&#xBCFC;',e:'Best Ball',d:'&#xD300;&#xC6D0; &#xC911; &#xAC00;&#xC7A5; &#xC88B;&#xC740; &#xC2A4;&#xCF54;&#xC5B4;&#xB97C; &#xD300; &#xC810;&#xC218;&#xB85C; &#xCC44;&#xD0DD;&#xD558;&#xB294; &#xBC29;&#xC2DD;.',l:'i'},
{t:'&#xC2A4;&#xD0A4;&#xB2C8;',e:'Skinny',d:'&#xD398;&#xC5B4;&#xC6E8;&#xC774;&#xAC00; &#xC88C;&#xC6B0;&#xB85C; &#xC88B;&#xC740; &#xC704;&#xCE58;. &#xACF5;&#xC774; &#xD398;&#xC5B4;&#xC6E8;&#xC774; &#xC911;&#xC559;&#xC5D0; &#xC788;&#xC74C;.',l:'i'},
{t:'&#xB514;&#xD53C;&#xCEC0;&#xC15C;',e:'Differential',d:'&#xC870;&#xC815; &#xADF8;&#xB85C;&#xC2A4; &#xC2A4;&#xCF54;&#xC5B4;&#xC640; &#xCF54;&#xC2A4; &#xB808;&#xC774;&#xD305;/&#xC2AC;&#xB85C;&#xD504;&#xB97C; &#xBC18;&#xC601;&#xD55C; &#xAC12;.',l:'a'},
{t:'FIR',e:'Fairway in Regulation',d:'&#xD2F0;&#xC0F7;&#xC774; &#xD398;&#xC5B4;&#xC6E8;&#xC774;&#xC5D0; &#xC548;&#xCC29;&#xD55C; &#xBE44;&#xC728;.',l:'i'},
{t:'&#xC2A4;&#xD06C;&#xB7A8;&#xBE14;',e:'Scramble',d:'&#xBAA8;&#xB4E0; &#xD300;&#xC6D0;&#xC774; &#xCE58;&#xACE0; &#xAC00;&#xC7A5; &#xC88B;&#xC740; &#xACF5;&#xC5D0;&#xC11C; &#xB2E4;&#xC2DC; &#xCE58;&#xB294; &#xBC29;&#xC2DD;.',l:'i'},
{t:'&#xC2A4;&#xD2B8;&#xB85C;&#xD06C;&#xAC8C;&#xC778;&#xB4DC;',e:'Strokes Gained',d:'PGA &#xD22C;&#xC5B4; &#xD1B5;&#xACC4; &#xAE30;&#xBC18; &#xC131;&#xACFC; &#xBD84;&#xC11D; &#xC9C0;&#xD45C;.',l:'a'},
{t:'&#xCF54;&#xC2A4;&#xB808;&#xC774;&#xD305;',e:'Course Rating',d:'&#xC2A4;&#xD06C;&#xB798;&#xCE58; &#xACE8;&#xD37C;&#xC758; &#xC608;&#xC0C1; &#xD0C0;&#xC218;&#xB85C; &#xCF54;&#xC2A4; &#xB09C;&#xC774;&#xB3C4; &#xC9C0;&#xD45C;.',l:'a'},
{t:'&#xC2AC;&#xB85C;&#xD504;&#xB808;&#xC774;&#xD305;',e:'Slope Rating',d:'&#xBCF4;&#xAE30; &#xACE8;&#xD37C; &#xB300;&#xBE44; &#xCF54;&#xC2A4; &#xB09C;&#xC774;&#xB3C4;. 55~155 &#xBC94;&#xC704;.',l:'a'},
{t:'&#xC2A4;&#xD0C0;&#xC784;&#xD53C;&#xBBF8;&#xD130;',e:'Stimpmeter',d:'&#xADF8;&#xB9B0; &#xC18D;&#xB3C4;&#xB97C; &#xCE21;&#xC815;&#xD558;&#xB294; &#xB3C4;&#xAD6C;.',l:'a'},
{t:'&#xD504;&#xB85C;&#xADF8;',e:'Frog Hair',d:'&#xADF8;&#xB9B0; &#xBC14;&#xB85C; &#xBC14;&#xAE65; &#xC794;&#xB514;. &#xD504;&#xB9B0;&#xC9C0;&#xB77C;&#xACE0;&#xB3C4; &#xD568;.',l:'a'},
{t:'&#xCE58;&#xD540;',e:'Chip In',d:'&#xADF8;&#xB9B0; &#xBC16;&#xC5D0;&#xC11C; &#xCE69;&#xC0F7;&#xC744; &#xD558;&#xC5EC; &#xBC14;&#xB85C; &#xD640;&#xC5D0; &#xB123;&#xB294; &#xAC83;.',l:'i'},
{t:'&#xD53C;&#xCE58;',e:'Pitch',d:'&#xB192;&#xC774; &#xB744;&#xC6B0;&#xACE0; &#xAD6C;&#xB984;&#xC774; &#xC801;&#xC740; &#xC5B4;&#xD504;&#xB85C;&#xCE58; &#xC0F7;.',l:'b'},
{t:'&#xD380;&#xCE58;&#xC0F7;',e:'Punch Shot',d:'&#xB0AE;&#xAC8C; &#xB098;&#xAC00;&#xB294; &#xC0F7;. &#xBC14;&#xB78C;&#xC774; &#xAC15;&#xD560; &#xB54C; &#xC0AC;&#xC6A9;.',l:'i'},
{t:'&#xC5C5;&#xC564;&#xB2E4;&#xC6B4;',e:'Up and Down',d:'&#xADF8;&#xB9B0; &#xC8FC;&#xBCC0;&#xC5D0;&#xC11C; 2&#xD0C0; &#xB9CC;&#xC5D0; &#xD640;&#xC5D0; &#xB123;&#xB294; &#xAC83;.',l:'i'},
{t:'&#xC0CC;&#xB4DC;&#xC138;&#xC774;&#xBE0C;',e:'Sand Save',d:'&#xBC99;&#xCEE4;&#xC5D0;&#xC11C; &#xD0C8;&#xCD9C; &#xD6C4; 2&#xD0C0; &#xC774;&#xB0B4;&#xC5D0; &#xD640;&#xC544;&#xC6C3;.',l:'i'},
{t:'&#xBC14;&#xC6B4;&#xC2A4;',e:'Bounce',d:'&#xD074;&#xB7FD;&#xC194;&#xC758; &#xC544;&#xB7AB;&#xBD80;&#xBD84; &#xAC01;&#xB3C4;. &#xBC99;&#xCEE4; &#xC0F7; &#xC2DC; &#xC911;&#xC694;.',l:'a'},
{t:'&#xD14C;&#xC774;&#xD06C;&#xBC31;',e:'Takeaway',d:'&#xC2A4;&#xC719; &#xC2DC;&#xC791; &#xC2DC; &#xD074;&#xB7FD;&#xC744; &#xB4A4;&#xB85C; &#xAC00;&#xC838;&#xAC00;&#xB294; &#xCCAB; &#xB3D9;&#xC791;.',l:'i'},
{t:'&#xD314;&#xB85C;&#xC2A4;&#xB8E8;',e:'Follow Through',d:'&#xC784;&#xD329;&#xD2B8; &#xD6C4; &#xD074;&#xB7FD;&#xC774; &#xC5B4;&#xB514;&#xB85C; &#xAC00;&#xB294;&#xC9C0;&#xC758; &#xB9C8;&#xBB34;&#xB9AC; &#xB3D9;&#xC791;.',l:'b'},
{t:'&#xD53C;&#xB2C8;&#xC2DC;',e:'Finish',d:'&#xC2A4;&#xC719;&#xC758; &#xCD5C;&#xC885; &#xC790;&#xC138;. &#xBC38;&#xB7F0;&#xC2A4;&#xC640; &#xC790;&#xC138;&#xAC00; &#xC911;&#xC694;.',l:'b'},
{t:'&#xCF54;&#xD0B9;',e:'Cocking',d:'&#xBC31;&#xC2A4;&#xC719; &#xC2DC; &#xC190;&#xBAA9;&#xC744; &#xAD7D;&#xD600; &#xAC01;&#xB3C4;&#xB97C; &#xB9CC;&#xB4DC;&#xB294; &#xB3D9;&#xC791;.',l:'i'},
{t:'&#xD53C;&#xBD07;',e:'Pivot',d:'&#xC2A4;&#xC719; &#xC2DC; &#xBAB8;&#xC758; &#xD68C;&#xC804; &#xC6B4;&#xB3D9;.',l:'i'},
{t:'&#xCF58;&#xD329;',e:'Compact',d:'&#xC2A4;&#xC719; &#xD06C;&#xAE30;&#xB97C; &#xC904;&#xC5EC; &#xC815;&#xD655;&#xB3C4;&#xB97C; &#xB192;&#xC774;&#xB294; &#xC2A4;&#xC719;.',l:'a'},
{t:'&#xB525;',e:'Duck Hook',d:'&#xACF5;&#xC774; &#xAE09;&#xACA9;&#xD558;&#xAC8C; &#xC67C;&#xCABD;&#xC73C;&#xB85C; &#xD718;&#xC5B4;&#xC9C0;&#xB294; &#xC0F7;.',l:'i'},
{t:'&#xB300;&#xD504;',e:'Duff',d:'&#xACF5; &#xC717;&#xBD80;&#xBD84;&#xC744; &#xB9DE;&#xCDB0; &#xC798; &#xB098;&#xAC00;&#xC9C0; &#xC54A;&#xB294; &#xBBF8;&#xC2A4;&#xC0F7;.',l:'b'},
{t:'&#xC2A4;&#xC719;&#xD50C;&#xB808;&#xC778;',e:'Swing Plane',d:'&#xC2A4;&#xC719; &#xC2DC; &#xD074;&#xB7FD;&#xC774; &#xC774;&#xB3D9;&#xD558;&#xB294; &#xAC00;&#xC0C1;&#xC758; &#xD3C9;&#xBA74;.',l:'a'},
{t:'&#xC5B8;&#xB354;&#xD30C;',e:'Under Par',d:'&#xD30C; &#xBCF4;&#xB2E4; &#xC801;&#xC740; &#xD0C0;&#xC218;.',l:'b'},
{t:'&#xC624;&#xBC84;&#xD30C;',e:'Over Par',d:'&#xD30C; &#xBCF4;&#xB2E4; &#xB9CE;&#xC740; &#xD0C0;&#xC218;.',l:'b'},
{t:'&#xC774;&#xBE10;&#xD30C;',e:'Even Par',d:'&#xD30C;&#xC640; &#xAC19;&#xC740; &#xD0C0;&#xC218;.',l:'b'},
{t:'&#xB354;&#xBE14;&#xBCF4;&#xAE30;',e:'Double Bogey',d:'&#xD30C; &#xB300;&#xBE44; 2&#xD0C0; &#xB9CE;&#xC740; &#xC2A4;&#xCF54;&#xC5B4;.',l:'b'},
{t:'&#xD2B8;&#xB9AC;&#xD50C;&#xBCF4;&#xAE30;',e:'Triple Bogey',d:'&#xD30C; &#xB300;&#xBE44; 3&#xD0C0; &#xB9CE;&#xC740; &#xC2A4;&#xCF54;&#xC5B4;.',l:'b'},
{t:'&#xCF58;&#xB3C4;&#xB974;',e:'Condor',d:'&#xD30C; &#xB300;&#xBE44; 4&#xD0C0; &#xC801;&#xC740; &#xC2A4;&#xCF54;&#xC5B4;. &#xADF9;&#xD788; &#xB4DC;&#xBB3C;.',l:'a'},
{t:'&#xCE74;&#xD2B8;',e:'Cart',d:'&#xACE8;&#xD504;&#xC7A5;&#xC5D0;&#xC11C; &#xC774;&#xB3D9;&#xC5D0; &#xC0AC;&#xC6A9;&#xD558;&#xB294; &#xC804;&#xB3D9; &#xCE74;&#xD2B8;.',l:'b'},
{t:'&#xC2A4;&#xD0C0;&#xD2F0;&#xD2F0;',e:'Starter Tee',d:'&#xCCAB; &#xBC88;&#xC9F8; &#xD640;&#xC758; &#xD2F0;&#xC5C5; &#xAD6C;&#xC5ED;.',l:'b'},
{t:'&#xD074;&#xB7FD;&#xD558;&#xC6B0;&#xC2A4;',e:'Clubhouse',d:'&#xACE8;&#xD504;&#xC7A5;&#xC758; &#xC8FC; &#xAC74;&#xBB3C;. &#xB77C;&#xCEE4;&#xB8F8;, &#xC2DD;&#xB2F9; &#xB4F1;.',l:'b'},
{t:'&#xD504;&#xB85C;&#xC0F5;',e:'Pro Shop',d:'&#xACE8;&#xD504; &#xC7A5;&#xBE44;&#xB97C; &#xD310;&#xB9E4;&#xD558;&#xB294; &#xB9E4;&#xC7A5;.',l:'b'},
{t:'&#xC5C4;&#xBE0C;&#xB809;&#xB77C;',e:'Umbrella',d:'&#xC8FC;&#xB85C; &#xBE44; &#xC62C; &#xB54C; &#xC0AC;&#xC6A9;&#xD558;&#xB294; &#xACE8;&#xD504;&#xC6A9; &#xC6B0;&#xC0B0;.',l:'b'},
{t:'&#xB808;&#xC778;&#xAE00;&#xB7EC;&#xBE0C;',e:'Rain Glove',d:'&#xBE44; &#xC62C; &#xB54C; &#xC0AC;&#xC6A9;&#xD558;&#xB294; &#xBC29;&#xC218; &#xACE8;&#xD504; &#xC7A5;&#xAC11;.',l:'i'},
{t:'&#xB514;&#xBCBB;&#xD234;',e:'Divot Tool',d:'&#xADF8;&#xB9B0; &#xC704;&#xC758; &#xBCFC;&#xB9C8;&#xD06C;&#xB97C; &#xACE0;&#xCE58;&#xB294; &#xB3C4;&#xAD6C;.',l:'b'},
{t:'&#xBCFC;&#xB9C8;&#xCEE4;',e:'Ball Marker',d:'&#xADF8;&#xB9B0; &#xC704;&#xC5D0;&#xC11C; &#xACF5;&#xC758; &#xC704;&#xCE58;&#xB97C; &#xD45C;&#xC2DC;&#xD558;&#xB294; &#xD1A0;&#xD070;.',l:'b'},
{t:'&#xB808;&#xC774;&#xD06C;',e:'Rake',d:'&#xBC99;&#xCEE4; &#xC0AC;&#xC6A9; &#xD6C4; &#xBAA8;&#xB798;&#xB97C; &#xACE0;&#xB974;&#xB294; &#xB3C4;&#xAD6C;.',l:'b'},
{t:'&#xC559;&#xCE74;',e:'Yardage(Anka)',d:'&#xD648; &#xB9C8;&#xB2E4; &#xB0A8;&#xC740; &#xAC70;&#xB9AC;&#xB97C; &#xC54C;&#xB824;&#xC8FC;&#xB294; &#xD45C;&#xC9C0;&#xD310;.',l:'b'},
{t:'&#xB808;&#xC774;&#xD305;',e:'Rating',d:'&#xCF54;&#xC2A4;&#xC758; &#xB09C;&#xC774;&#xB3C4; &#xD3C9;&#xAC00; &#xC2DC;&#xC2A4;&#xD15C;.',l:'i'},
{t:'&#xBC31;&#xD2F0;',e:'Back Tee',d:'&#xAC00;&#xC7A5; &#xBA3C; &#xD2F0;&#xC5C5; &#xAD6C;&#xC5ED;. &#xC0C1;&#xAE09;&#xC790;&#xC6A9;.',l:'i'},
{t:'&#xB808;&#xADC0;&#xB7EC;&#xD2F0;',e:'Regular Tee',d:'&#xC77C;&#xBC18; &#xB0A8;&#xC131; &#xACE8;&#xD37C;&#xC6A9; &#xD2F0;&#xC5C5; &#xAD6C;&#xC5ED;.',l:'b'},
{t:'&#xB808;&#xB514;&#xC2A4;&#xD2F0;',e:'Ladies Tee',d:'&#xC5EC;&#xC131; &#xACE8;&#xD37C;&#xC6A9; &#xD2F0;&#xC5C5; &#xAD6C;&#xC5ED;.',l:'b'},
{t:'&#xD504;&#xB860;&#xD2B8;&#xB098;&#xC778;',e:'Front Nine',d:'1~9&#xBC88; &#xD640;. &#xC544;&#xC6C3; &#xCF54;&#xC2A4;.',l:'b'},
{t:'&#xBC31;&#xB098;&#xC778;',e:'Back Nine',d:'10~18&#xBC88; &#xD640;. &#xC778; &#xCF54;&#xC2A4;.',l:'b'},
{t:'&#xD558;&#xD504;',e:'Half',d:'9&#xD640;&#xC744; &#xC758;&#xBBF8;. &#xC804;&#xBC18;/&#xD6C4;&#xBC18; &#xAD6C;&#xBD84;.',l:'b'},
{t:'&#xC2A4;&#xD0A8;&#xC2A4;',e:'Skins',d:'&#xD640;&#xBCC4; &#xC2B9;&#xC790;&#xAC00; &#xD310;&#xB3C8;&#xC744; &#xAC00;&#xC838;&#xAC00;&#xB294; &#xB0B4;&#xAE30; &#xBC29;&#xC2DD;.',l:'i'},
{t:'&#xB098;&#xC3D8;',e:'Nassau',d:'&#xC804;&#xBC18;/&#xD6C4;&#xBC18;/&#xC804;&#xCCB4; 3&#xAC1C; &#xB0B4;&#xAE30;&#xB97C; &#xD558;&#xB294; &#xBC29;&#xC2DD;.',l:'i'},
{t:'&#xCF58;&#xD53C;&#xD2F0;&#xC158;',e:'Competition',d:'&#xACE8;&#xD504; &#xB300;&#xD68C;&#xB098; &#xACBD;&#xAE30;.',l:'b'},
{t:'&#xD648;&#xC778;&#xC6D0;',e:'Hole in One',d:'&#xD2F0;&#xC0F7;&#xC774; &#xBC14;&#xB85C; &#xD640;&#xC5D0; &#xB4E4;&#xC5B4;&#xAC00;&#xB294; &#xAC83;. 1&#xD0C0;&#xB9CC;&#xC5D0; &#xD640;&#xC544;&#xC6C3;.',l:'b'},
{t:'&#xBC84;&#xB514;&#xC2A4;&#xD2B8;&#xB9AD;',e:'Birdie Streak',d:'&#xC5F0;&#xC18D;&#xC73C;&#xB85C; &#xBC84;&#xB514;&#xB97C; &#xAE30;&#xB85D;&#xD558;&#xB294; &#xAC83;.',l:'i'},
{t:'&#xD648;&#xC544;&#xC6C3;',e:'Hole Out',d:'&#xACF5;&#xC774; &#xD640;&#xC5D0; &#xB4E4;&#xC5B4;&#xAC00;&#xB294; &#xAC83;.',l:'b'},
{t:'&#xAE30;&#xBC84;',e:'Gimme',d:'&#xBE44;&#xACF5;&#xC2DD; &#xACBD;&#xAE30;&#xC5D0;&#xC11C; &#xC9E7;&#xC740; &#xD37C;&#xD305;&#xC744; &#xBA74;&#xC81C;&#xD574;&#xC8FC;&#xB294; &#xAD00;&#xD589;.',l:'b'},
{t:'&#xB9AC;&#xD50C;&#xB808;&#xC774;&#xC2A4;',e:'Replace',d:'&#xACF5;&#xC744; &#xC6D0;&#xB798; &#xC704;&#xCE58;&#xC5D0; &#xB2E4;&#xC2DC; &#xB193;&#xB294; &#xAC83;.',l:'b'},
{t:'&#xD504;&#xB9AC;&#xB4DC;&#xB86D;',e:'Free Drop',d:'&#xBD88;&#xD3B8;&#xD55C; &#xC0C1;&#xD669;&#xC5D0;&#xC11C; &#xBC8C;&#xD0C0; &#xC5C6;&#xC774; &#xACF5;&#xC744; &#xB4DC;&#xB86D;&#xD558;&#xB294; &#xAC83;.',l:'i'},
{t:'&#xBCFC;&#xB4DC;&#xB86D;',e:'Ball Drop',d:'&#xD314;&#xC744; &#xBBBB;&#xACE0; &#xBB34;&#xB98E; &#xB192;&#xC774;&#xC5D0;&#xC11C; &#xACF5;&#xC744; &#xB5A8;&#xC5B4;&#xB728;&#xB9AC;&#xB294; &#xAC83;.',l:'b'},
{t:'&#xD504;&#xB85C;&#xBE44;&#xC800;&#xB110;&#xBCFC;',e:'Provisional Ball',d:'OB&#xB098; &#xBD84;&#xC2E4;&#xAD6C; &#xC758;&#xC2EC; &#xC2DC; &#xC784;&#xC2DC;&#xB85C; &#xCE58;&#xB294; &#xACF5;.',l:'i'},
{t:'&#xB9C8;&#xC154;',e:'Marshal',d:'&#xACE8;&#xD504;&#xC7A5;&#xC5D0;&#xC11C; &#xACBD;&#xAE30; &#xC9C4;&#xD589;&#xC744; &#xAD00;&#xB9AC;&#xD558;&#xB294; &#xC9C1;&#xC6D0;.',l:'b'},
{t:'&#xC5D0;&#xC774;&#xD504;&#xB7F0;',e:'Apron',d:'&#xADF8;&#xB9B0; &#xC8FC;&#xBCC0;&#xC758; &#xC794;&#xB514;&#xAC00; &#xC9E7;&#xC740; &#xAD6C;&#xC5ED;.',l:'b'},
{t:'&#xC778;&#xD130;&#xB77D;&#xD0B9;&#xADF8;&#xB9BD;',e:'Interlocking Grip',d:'&#xC591;&#xC190;&#xC744; &#xAC78;&#xC5B4; &#xC7A1;&#xB294; &#xADF8;&#xB9BD; &#xBC29;&#xBC95;.',l:'i'},
{t:'&#xC624;&#xBC84;&#xB798;&#xD551;&#xADF8;&#xB9BD;',e:'Overlapping Grip',d:'&#xC624;&#xB978;&#xC190; &#xC0C8;&#xB07C;&#xB97C; &#xC67C;&#xC190; &#xC704;&#xC5D0; &#xAC78;&#xCE58;&#xB294; &#xADF8;&#xB9BD;.',l:'i'},
{t:'&#xBCA0;&#xC774;&#xC2A4;&#xBCFC;&#xADF8;&#xB9BD;',e:'Baseball Grip',d:'&#xC57C;&#xAD6C; &#xBC30;&#xD2B8;&#xCCB4;&#xB7FC; &#xD074;&#xB7FD;&#xC744; &#xC7A1;&#xB294; &#xBC29;&#xBC95;.',l:'b'},
{t:'&#xC2A4;&#xC704;&#xD2B8;&#xC2A4;&#xD31F;',e:'Sweet Spot',d:'&#xD074;&#xB7FD;&#xD398;&#xC774;&#xC2A4;&#xC758; &#xCD5C;&#xC801; &#xD0C0;&#xACA9; &#xC9C0;&#xC810;.',l:'i'},
{t:'&#xD1A0;',e:'Toe',d:'&#xD074;&#xB7FD;&#xD5E4;&#xB4DC;&#xC758; &#xB05D; &#xBD80;&#xBD84; (&#xC0E4;&#xD504;&#xD2B8; &#xBC18;&#xB300;&#xCABD;).',l:'i'},
{t:'&#xD790;',e:'Heel',d:'&#xD074;&#xB7FD;&#xD5E4;&#xB4DC;&#xC5D0;&#xC11C; &#xC0E4;&#xD504;&#xD2B8;&#xC640; &#xAC00;&#xAE4C;&#xC6B4; &#xBD80;&#xBD84;.',l:'i'},
{t:'&#xC18C;&#xB808;',e:'Sole',d:'&#xD074;&#xB7FD;&#xD5E4;&#xB4DC;&#xC758; &#xBC14;&#xB2E5; &#xBD80;&#xBD84;.',l:'i'},
{t:'&#xD638;&#xC170;',e:'Hosel',d:'&#xD074;&#xB7FD;&#xD5E4;&#xB4DC;&#xC640; &#xC0E4;&#xD504;&#xD2B8;&#xAC00; &#xC5F0;&#xACB0;&#xB418;&#xB294; &#xBD80;&#xBD84;.',l:'a'},
{t:'&#xC0F9;&#xD06C;',e:'Shank',d:'&#xACF5;&#xC774; &#xD638;&#xC170;&#xC5D0; &#xB9DE;&#xC544; &#xC624;&#xB978;&#xCABD;&#xC73C;&#xB85C; &#xD29C;&#xB294; &#xBBF8;&#xC2A4;&#xC0F7;.',l:'i'},
{t:'&#xD504;&#xB9AC;&#xD50C;&#xB77C;&#xC787;',e:'Pre-flight',d:'&#xACF5;&#xC774; &#xB0A0;&#xC544;&#xAC00;&#xAE30; &#xC804; &#xCD08;&#xAE30; &#xD0C4;&#xB3C4;.',l:'a'},
{t:'&#xBC31;&#xC2A4;&#xD540;',e:'Backspin',d:'&#xACF5;&#xC5D0; &#xC5ED;&#xD68C;&#xC804;&#xC744; &#xC8FC;&#xC5B4; &#xCC29;&#xC9C0; &#xD6C4; &#xBA48;&#xCD94;&#xAC8C; &#xD558;&#xB294; &#xAE30;&#xC220;.',l:'i'},
{t:'&#xC0AC;&#xC774;&#xB4DC;&#xC2A4;&#xD540;',e:'Sidespin',d:'&#xACF5;&#xC758; &#xC88C;&#xC6B0; &#xD68C;&#xC804;. &#xB4DC;&#xB85C;&#xC6B0;&#xB098; &#xD398;&#xC774;&#xB4DC;&#xC758; &#xC6D0;&#xC778;.',l:'a'},
{t:'&#xB808;&#xC778;&#xB515;&#xB808;&#xC774;',e:'Rainy Day',d:'&#xBE44; &#xC624;&#xB294; &#xB0A0;&#xC758; &#xB77C;&#xC6B4;&#xB4DC; &#xC870;&#xAC74;.',l:'b'},
{t:'&#xCF54;&#xC2A4;&#xB9E4;&#xB2C8;&#xC9C0;&#xBA3C;&#xD2B8;',e:'Course Management',d:'&#xC804;&#xB7B5;&#xC801;&#xC73C;&#xB85C; &#xCF54;&#xC2A4;&#xB97C; &#xACF5;&#xB7B5;&#xD558;&#xB294; &#xB2A5;&#xB825;.',l:'a'},
{t:'WHS',e:'World Handicap System',d:'2020&#xB144; &#xD1B5;&#xD569;&#xB41C; &#xC138;&#xACC4; &#xD575;&#xB514;&#xCEA1; &#xC2DC;&#xC2A4;&#xD15C;.',l:'a'},
{t:'&#xC778;&#xB3C4;&#xC5B4;&#xACE8;&#xD504;',e:'Indoor Golf',d:'&#xC2E4;&#xB0B4;&#xC5D0;&#xC11C; &#xC2DC;&#xBBAC;&#xB808;&#xC774;&#xC158;&#xC73C;&#xB85C; &#xC990;&#xAE30;&#xB294; &#xACE8;&#xD504;.',l:'b'},
{t:'&#xC2A4;&#xD06C;&#xB9B0;&#xACE8;&#xD504;',e:'Screen Golf',d:'&#xD55C;&#xAD6D;&#xC5D0;&#xC11C; &#xC720;&#xD589;&#xD558;&#xB294; &#xC2E4;&#xB0B4; &#xACE8;&#xD504; &#xC2DC;&#xBBAC;&#xB808;&#xC774;&#xC158;.',l:'b'},
{t:'&#xD50C;&#xB808;&#xC2DC;&#xBE14;',e:'Flexible',d:'&#xC0E4;&#xD504;&#xD2B8;&#xC758; &#xD718;&#xC5B4;&#xC9C0;&#xB294; &#xC815;&#xB3C4;(&#xD50C;&#xB809;&#xC2A4;).',l:'i'},
{t:'&#xC5C5;&#xB77C;&#xC774;&#xD2B8;',e:'Upright',d:'&#xC2A4;&#xC719; &#xD3C9;&#xBA74;&#xC774; &#xC218;&#xC9C1;&#xC5D0; &#xAC00;&#xAE4C;&#xC6B4; &#xC2A4;&#xC719;.',l:'a'},
{t:'&#xB77C;&#xC6B4;&#xB4DC;',e:'Round',d:'18&#xD640; &#xB610;&#xB294; 9&#xD640;&#xC744; &#xD50C;&#xB808;&#xC774;&#xD558;&#xB294; &#xD55C; &#xBC88;&#xC758; &#xACBD;&#xAE30;.',l:'b'},
{t:'&#xC5D0;&#xC774;&#xC9C0;&#xC0F7;',e:'Age Shot',d:'&#xC790;&#xC2E0;&#xC758; &#xB098;&#xC774;&#xBCF4;&#xB2E4; &#xC801;&#xC740; &#xD0C0;&#xC218;&#xB85C; &#xB77C;&#xC6B4;&#xB4DC;&#xD558;&#xB294; &#xAC83;.',l:'a'},
{t:'&#xBC84;&#xB514;&#xD37C;&#xD305;',e:'Birdie Putt',d:'&#xBC84;&#xB514;&#xB97C; &#xC704;&#xD55C; &#xD37C;&#xD305; &#xC2DC;&#xB3C4;.',l:'b'},
{t:'&#xD30C;&#xC138;&#xC774;&#xBE0C;',e:'Par Save',d:'&#xC704;&#xAE30;&#xC5D0;&#xC11C; &#xD30C;&#xB97C; &#xC9C0;&#xCF1C;&#xB0B4;&#xB294; &#xAC83;.',l:'i'},
{t:'&#xD1B5;&#xACC4;',e:'Statistics',d:'&#xD398;&#xC5B4;&#xC6E8;&#xC774; &#xC548;&#xCC29;&#xB960;, GIR, &#xD37C;&#xD305; &#xC218; &#xB4F1;&#xC758; &#xB370;&#xC774;&#xD130;.',l:'i'},
{t:'&#xCF58;&#xD37C;&#xD2B8;&#xC874;',e:'Comfort Zone',d:'&#xC790;&#xC2E0;&#xC788;&#xAC8C; &#xC0F7;&#xC744; &#xCE60; &#xC218; &#xC788;&#xB294; &#xAC70;&#xB9AC; &#xBC94;&#xC704;.',l:'i'},
{t:'&#xD14C;&#xD06C;&#xB2C8;&#xD06C;',e:'Technique',d:'&#xC2A4;&#xC719;, &#xD37C;&#xD305; &#xB4F1; &#xACE8;&#xD504; &#xAE30;&#xC220;&#xC758; &#xCD1D;&#xCE6D;.',l:'b'},
{t:'&#xBA58;&#xD0C8;&#xAC8C;&#xC784;',e:'Mental Game',d:'&#xACE8;&#xD504;&#xC5D0;&#xC11C; &#xC2EC;&#xB9AC;&#xC801; &#xC694;&#xC18C;&#xC758; &#xC911;&#xC694;&#xC131;.',l:'i'},
{t:'&#xBE44;&#xAC70;&#xB9AC;',e:'Distance',d:'&#xACF5;&#xC774; &#xB0A0;&#xC544;&#xAC04; &#xCD1D; &#xAC70;&#xB9AC; &#xB610;&#xB294; &#xBAA9;&#xD45C;&#xAE4C;&#xC9C0;&#xC758; &#xAC70;&#xB9AC;.',l:'b'},
{t:'&#xC5B4;&#xD504;&#xB85C;&#xCE58;&#xC6E8;&#xC9C0;',e:'Approach Wedge',d:'&#xD53C;&#xCE6D;&#xC6E8;&#xC9C0;&#xC640; &#xC0CC;&#xB4DC;&#xC6E8;&#xC9C0; &#xC0AC;&#xC774; &#xD074;&#xB7FD;(48~52&#xB3C4;).',l:'i'},
{t:'&#xAC2D;&#xC6E8;&#xC9C0;',e:'Gap Wedge',d:'PW&#xC640; SW &#xC0AC;&#xC774;&#xC758; &#xACF5;&#xBC31;&#xC744; &#xBA54;&#xC6B0;&#xB294; &#xD074;&#xB7FD;.',l:'i'},
{t:'&#xB85C;&#xBE0C;&#xC6E8;&#xC9C0;',e:'Lob Wedge',d:'60&#xB3C4; &#xC774;&#xC0C1;&#xC758; &#xB85C;&#xD504;&#xD2B8;. &#xB192;&#xC774; &#xB744;&#xC6B0;&#xACE0; &#xC9E7;&#xAC8C; &#xCE68;.',l:'a'},
{t:'&#xD558;&#xC774;&#xBE0C;&#xB9AC;&#xB4DC;',e:'Hybrid',d:'&#xC6B0;&#xB4DC;&#xC640; &#xC544;&#xC774;&#xC5B8;&#xC758; &#xC7A5;&#xC810;&#xC744; &#xACB0;&#xD569;&#xD55C; &#xD074;&#xB7FD;.',l:'b'},
{t:'&#xC720;&#xD2F8;&#xB9AC;&#xD2F0;',e:'Utility',d:'&#xB2E4;&#xC591;&#xD55C; &#xC0C1;&#xD669;&#xC5D0;&#xC11C; &#xC0AC;&#xC6A9; &#xAC00;&#xB2A5;&#xD55C; &#xB9CC;&#xB2A5; &#xD074;&#xB7FD;.',l:'i'},
{t:'&#xCE90;&#xB9AC;&#xBC31;',e:'Carry Bag',d:'&#xAC00;&#xBCBC;&#xC6B4; &#xACE8;&#xD504;&#xBC31;. &#xC9C1;&#xC811; &#xBA54;&#xACE0; &#xB2E4;&#xB2D8;.',l:'b'},
{t:'&#xC2A4;&#xD0E0;&#xB4DC;&#xBC31;',e:'Stand Bag',d:'&#xC790;&#xCCB4; &#xC2A4;&#xD0E0;&#xB4DC;&#xAC00; &#xC788;&#xB294; &#xACE8;&#xD504;&#xBC31;.',l:'b'},
{t:'&#xD22C;&#xC5B4;&#xBC31;',e:'Tour Bag',d:'&#xD504;&#xB85C; &#xC120;&#xC218;&#xAC00; &#xC0AC;&#xC6A9;&#xD558;&#xB294; &#xB300;&#xD615; &#xACE8;&#xD504;&#xBC31;.',l:'i'},
{t:'&#xBC14;&#xB780;&#xC2A4;&#xD3EC;&#xC778;&#xD2B8;',e:'Balance Point',d:'&#xD074;&#xB7FD;&#xC758; &#xBB34;&#xAC8C;&#xC911;&#xC2EC;. &#xC2A4;&#xC719;&#xC6E8;&#xC774;&#xD2B8;&#xC640; &#xAD00;&#xB828;.',l:'a'},
{t:'MOI',e:'Moment of Inertia',d:'&#xAD00;&#xC131; &#xBAA8;&#xBA3C;&#xD2B8;. &#xD074;&#xB7FD;&#xD5E4;&#xB4DC;&#xC758; &#xBE44;&#xD2C0;&#xB9BC; &#xC800;&#xD56D; &#xC9C0;&#xD45C;.',l:'a'},
{t:'COR',e:'Coefficient of Restitution',d:'&#xBC18;&#xBC1C;&#xACC4;&#xC218;. &#xD5E4;&#xB4DC;&#xC640; &#xACF5;&#xC758; &#xBC18;&#xBC1C;&#xB825;.',l:'a'},
{t:'&#xC2A4;&#xD2B8;&#xC601;&#xADF8;&#xB9BD;',e:'Strong Grip',d:'&#xC190;&#xC744; &#xC624;&#xB978;&#xCABD;&#xC73C;&#xB85C; &#xB3CC;&#xB824; &#xC7A1;&#xB294; &#xADF8;&#xB9BD;.',l:'i'},
{t:'&#xC704;&#xD06C;&#xADF8;&#xB9BD;',e:'Weak Grip',d:'&#xC190;&#xC744; &#xC67C;&#xCABD;&#xC73C;&#xB85C; &#xB3CC;&#xB824; &#xC7A1;&#xB294; &#xADF8;&#xB9BD;.',l:'i'},
{t:'&#xB274;&#xD2B8;&#xB7F4;&#xADF8;&#xB9BD;',e:'Neutral Grip',d:'&#xC190;&#xC774; &#xC911;&#xB9BD;&#xC778; &#xD45C;&#xC900; &#xADF8;&#xB9BD;.',l:'i'},
{t:'&#xD56D;&#xB82F;&#xB514;&#xC790;&#xC778;',e:'Hole Layout Design',d:'&#xD640; &#xC124;&#xACC4; &#xBC0F; &#xBC30;&#xCE58;. &#xB3C5;&#xB809;, &#xC6CC;&#xD130; &#xB4F1; &#xBC30;&#xCE58;.',l:'a'},
{t:'&#xB4DC;&#xB808;&#xC774;&#xB2C8;&#xC9C0;',e:'Drainage',d:'&#xCF54;&#xC2A4; &#xBC30;&#xC218; &#xC2DC;&#xC2A4;&#xD15C;. &#xD3C9;&#xD0C4;&#xD55C; &#xCF54;&#xC2A4; &#xC720;&#xC9C0;&#xC5D0; &#xD544;&#xC218;.',l:'a'},
{t:'&#xBC84;&#xBBA4;&#xB2E4;&#xADF8;&#xB798;&#xC2A4;',e:'Bermuda Grass',d:'&#xB354;&#xC6B4; &#xC9C0;&#xBC29;&#xC5D0;&#xC11C; &#xC0AC;&#xC6A9;&#xD558;&#xB294; &#xC794;&#xB514; &#xC885;&#xB958;.',l:'i'},
{t:'&#xBCA4;&#xD2B8;&#xADF8;&#xB798;&#xC2A4;',e:'Bent Grass',d:'&#xC11C;&#xB298;&#xD55C; &#xC9C0;&#xBC29;&#xC758; &#xADF8;&#xB9B0;&#xC5D0; &#xC0AC;&#xC6A9;&#xD558;&#xB294; &#xC794;&#xB514;.',l:'i'},
{t:'&#xBCA0;&#xC2A4;&#xD2B8;&#xBCFC;',e:'Best Ball',d:'&#xD300; &#xACBD;&#xAE30;&#xC5D0;&#xC11C; &#xAC00;&#xC7A5; &#xC88B;&#xC740; &#xACF5;&#xC744; &#xC120;&#xD0DD;&#xD558;&#xB294; &#xBC29;&#xC2DD;.',l:'i'},
{t:'&#xCC44;&#xD504;&#xB9CC;&#xC2ED;',e:'Chapman System',d:'2&#xC778; 1&#xC870; &#xACBD;&#xAE30; &#xBC29;&#xC2DD;&#xC758; &#xD558;&#xB098;.',l:'a'},
{t:'&#xC624;&#xB108;',e:'Honor',d:'&#xD2F0;&#xC0F7; &#xC21C;&#xC11C;&#xC5D0;&#xC11C; &#xBA3C;&#xC800; &#xCE58;&#xB294; &#xAD8C;&#xB9AC;.',l:'b'},
{t:'&#xD504;&#xB808;&#xC2DC;&#xC154;',e:'Pressure',d:'&#xC911;&#xC694;&#xD55C; &#xC0F7;&#xC5D0;&#xC11C; &#xB290;&#xB07C;&#xB294; &#xC2EC;&#xB9AC;&#xC801; &#xBD80;&#xB2F4;.',l:'i'},
{t:'&#xC874;',e:'Zone',d:'&#xCD5C;&#xC0C1;&#xC758; &#xC9D1;&#xC911;&#xB825;&#xC744; &#xBC1C;&#xD718;&#xD558;&#xB294; &#xC2EC;&#xB9AC; &#xC0C1;&#xD0DC;.',l:'i'},
{t:'&#xC2A4;&#xCF54;&#xC5B4;&#xCE74;&#xB4DC;',e:'Scorecard',d:'&#xB77C;&#xC6B4;&#xB4DC; &#xC2A4;&#xCF54;&#xC5B4;&#xB97C; &#xAE30;&#xB85D;&#xD558;&#xB294; &#xCE74;&#xB4DC;.',l:'b'},
{t:'&#xD55C;&#xD0C0;',e:'One Stroke',d:'1&#xD0C0;. &#xACE8;&#xD504; &#xC2A4;&#xCF54;&#xC5B4;&#xC758; &#xAE30;&#xBCF8; &#xB2E8;&#xC704;.',l:'b'},
{t:'&#xCF54;&#xCE58;',e:'Coach',d:'&#xACE8;&#xD504; &#xB808;&#xC2A8;&#xC744; &#xC81C;&#xACF5;&#xD558;&#xB294; &#xC9C0;&#xB3C4;&#xC790;.',l:'b'},
{t:'&#xC5F0;&#xC2B5;&#xC7A5;',e:'Driving Range',d:'&#xACE8;&#xD504; &#xC2A4;&#xC719;&#xC744; &#xC5F0;&#xC2B5;&#xD558;&#xB294; &#xC2DC;&#xC124;.',l:'b'},
{t:'&#xD30C;&#xD305;&#xADF8;&#xB9B0;',e:'Putting Green',d:'&#xD37C;&#xD305; &#xC5F0;&#xC2B5;&#xC744; &#xC704;&#xD55C; &#xBCC4;&#xB3C4;&#xC758; &#xADF8;&#xB9B0;.',l:'b'},
{t:'&#xBC84;&#xB514;&#xCC2C;&#xC2A4;',e:'Birdie Chance',d:'&#xBC84;&#xB514;&#xB97C; &#xAE30;&#xB85D;&#xD560; &#xC218; &#xC788;&#xB294; &#xAE30;&#xD68C; &#xC0C1;&#xD669;.',l:'b'},
{t:'&#xD074;&#xB7FD;&#xD588;&#xC2A4;',e:'Clubface',d:'&#xD074;&#xB7FD;&#xD5E4;&#xB4DC;&#xC758; &#xACF5;&#xACFC; &#xB9DE;&#xB2FF;&#xB294; &#xBA74;.',l:'i'},
{t:'&#xB9AC;&#xCF54;&#xBC84;&#xB9AC;&#xC0F7;',e:'Recovery Shot',d:'&#xC5B4;&#xB824;&#xC6B4; &#xC0C1;&#xD669;&#xC5D0;&#xC11C; &#xD0C8;&#xCD9C;&#xD558;&#xB294; &#xC0F7;.',l:'i'},
{t:'&#xD2B8;&#xB7EC;&#xBE14;&#xC0F7;',e:'Trouble Shot',d:'&#xB098;&#xBB34;/&#xBC99;&#xCEE4;/&#xACBD;&#xC0AC; &#xB4F1; &#xC5B4;&#xB824;&#xC6B4; &#xC704;&#xCE58;&#xC5D0;&#xC11C;&#xC758; &#xC0F7;.',l:'i'},
{t:'&#xD558;&#xC774;&#xD540;',e:'High Pin',d:'&#xADF8;&#xB9B0; &#xC704;&#xCABD;&#xC5D0; &#xD540;&#xC774; &#xC704;&#xCE58;&#xD55C; &#xAC83;.',l:'i'},
{t:'&#xB85C;&#xC6B0;&#xD540;',e:'Low Pin',d:'&#xADF8;&#xB9B0; &#xC544;&#xB798;&#xCABD;&#xC5D0; &#xD540;&#xC774; &#xC704;&#xCE58;&#xD55C; &#xAC83;.',l:'i'},
{t:'&#xCE74;&#xD2B8;&#xD328;&#xC2A4;',e:'Cart Path',d:'&#xCE74;&#xD2B8; &#xC804;&#xC6A9; &#xB3C4;&#xB85C;.',l:'b'},
{t:'&#xD074;&#xB7ED;&#xC640;&#xC774;&#xC988;',e:'Clockwise',d:'&#xD37C;&#xD305; &#xC2DC; &#xACF5;&#xC774; &#xC624;&#xB978;&#xCABD;&#xC73C;&#xB85C; &#xD718;&#xB294; &#xBE0C;&#xB808;&#xC774;&#xD06C;.',l:'i'},
{t:'&#xBC18;&#xC2DC;&#xACC4;',e:'Counter-Clockwise',d:'&#xD37C;&#xD305; &#xC2DC; &#xACF5;&#xC774; &#xC67C;&#xCABD;&#xC73C;&#xB85C; &#xD718;&#xB294; &#xBE0C;&#xB808;&#xC774;&#xD06C;.',l:'i'},
{t:'&#xBE0C;&#xB808;&#xC774;&#xD06C;',e:'Break',d:'&#xADF8;&#xB9B0;&#xC5D0;&#xC11C; &#xACF5;&#xC774; &#xD718;&#xB294; &#xBC29;&#xD5A5;.',l:'b'},
{t:'&#xC5C5;&#xD790;&#xB77C;&#xC774;',e:'Uphill Lie',d:'&#xACF5;&#xC774; &#xBC1C;&#xBCF4;&#xB2E4; &#xB192;&#xC740; &#xC704;&#xCE58;&#xC5D0; &#xC788;&#xB294; &#xC0C1;&#xD669;.',l:'i'},
{t:'&#xB2E4;&#xC6B4;&#xD790;&#xB77C;&#xC774;',e:'Downhill Lie',d:'&#xACF5;&#xC774; &#xBC1C;&#xBCF4;&#xB2E4; &#xB0AE;&#xC740; &#xC704;&#xCE58;&#xC5D0; &#xC788;&#xB294; &#xC0C1;&#xD669;.',l:'i'},
{t:'&#xD14D;&#xC2A4;&#xCC98;&#xC6E8;&#xC774;&#xC2A4;&#xD2B8;',e:'Texture Waste',d:'&#xCF54;&#xC2A4;&#xD558;&#xB294; &#xBC29;&#xBC95; &#xC911;&#xD558;&#xB098;.',l:'a'},
{t:'&#xB77C;&#xC6B4;&#xB4DC;&#xC218;',e:'Round Count',d:'&#xCD1D; &#xD50C;&#xB808;&#xC774;&#xD55C; &#xB77C;&#xC6B4;&#xB4DC; &#xD69F;&#xC218;.',l:'b'}
];

function v23OpenGlossary(){
  v23SFX('glossary_open');
  var id='v23GlossaryOverlay';
  var existing=document.getElementById(id);
  if(existing){existing.classList.add('active');return;}
  var ov=document.createElement('div');
  ov.className='v23-overlay';ov.id=id;
  ov.innerHTML='<div class="v23-modal"><div class="v23-hdr"><h2><span class="v23i">&#x1F4D6;</span> &#xACE8;&#xD504; &#xC6A9;&#xC5B4; &#xC0AC;&#xC804; <span class="v23-badge" style="background:var(--primary);color:#fff">150&#xAC1C;</span></h2><button class="v23-x" onclick="document.getElementById(\'v23GlossaryOverlay\').classList.remove(\'active\')">&times;</button></div><div style="margin-bottom:14px"><input class="v23-input" id="v23GlossarySearch" placeholder="&#xC6A9;&#xC5B4; &#xAC80;&#xC0C9;... (&#xD55C;&#xAE00;/&#xC601;&#xC5B4;)" oninput="v23FilterGlossary()"></div><div style="display:flex;gap:6px;margin-bottom:14px;flex-wrap:wrap"><button class="v23-btn v23-btn-sm v23-btn-secondary v23-glvl-btn active" data-lvl="all" onclick="v23FilterByLevel(\'all\')">&#xC804;&#xCCB4;</button><button class="v23-btn v23-btn-sm v23-btn-secondary v23-glvl-btn" data-lvl="b" onclick="v23FilterByLevel(\'b\')">&#x1F7E2; &#xCD08;&#xAE09;</button><button class="v23-btn v23-btn-sm v23-btn-secondary v23-glvl-btn" data-lvl="i" onclick="v23FilterByLevel(\'i\')">&#x1F7E1; &#xC911;&#xAE09;</button><button class="v23-btn v23-btn-sm v23-btn-secondary v23-glvl-btn" data-lvl="a" onclick="v23FilterByLevel(\'a\')">&#x1F534; &#xACE0;&#xAE09;</button></div><div id="v23GlossaryList"></div><div id="v23GlossaryCount" style="text-align:center;font-size:12px;color:var(--text-muted);margin-top:10px"></div></div>';
  document.body.appendChild(ov);
  ov.addEventListener('click',function(e){if(e.target===ov)ov.classList.remove('active');});
  ov.classList.add('active');
  v23FilterGlossary();
}
window.v23OpenGlossary=v23OpenGlossary;

var v23GlossaryLevel='all';
function v23FilterByLevel(lvl){
  v23GlossaryLevel=lvl;
  document.querySelectorAll('.v23-glvl-btn').forEach(function(b){b.classList.toggle('active',b.dataset.lvl===lvl);});
  v23FilterGlossary();
}
window.v23FilterByLevel=v23FilterByLevel;

function v23FilterGlossary(){
  v23SFX('glossary_search');
  var searchEl=document.getElementById('v23GlossarySearch');
  var q=searchEl?searchEl.value.toLowerCase():'';
  var list=document.getElementById('v23GlossaryList');
  if(!list)return;
  var filtered=v23Glossary.filter(function(g){
    var matchLevel=v23GlossaryLevel==='all'||g.l===v23GlossaryLevel;
    var matchQ=!q||g.t.toLowerCase().indexOf(q)>=0||g.e.toLowerCase().indexOf(q)>=0||g.d.toLowerCase().indexOf(q)>=0;
    return matchLevel&&matchQ;
  });
  var lvlMap={b:'&#xCD08;&#xAE09;',i:'&#xC911;&#xAE09;',a:'&#xACE0;&#xAE09;'};
  var lvlCls={b:'v23-lvl-beginner',i:'v23-lvl-intermediate',a:'v23-lvl-advanced'};
  var h='';
  filtered.forEach(function(g){
    h+='<div class="v23-glossary-item"><div class="v23-glossary-term">'+g.t+' <span class="v23-glossary-level '+lvlCls[g.l]+'">'+lvlMap[g.l]+'</span></div><div class="v23-glossary-eng">'+g.e+'</div><div class="v23-glossary-def">'+g.d+'</div></div>';
  });
  list.innerHTML=h||'<div style="text-align:center;padding:20px;color:var(--text-muted)">&#xAC80;&#xC0C9; &#xACB0;&#xACFC;&#xAC00; &#xC5C6;&#xC2B5;&#xB2C8;&#xB2E4;.</div>';
  var cnt=document.getElementById('v23GlossaryCount');
  if(cnt)cnt.textContent=filtered.length+'/'+v23Glossary.length+'&#xAC1C; &#xD45C;&#xC2DC;';
}
window.v23FilterGlossary=v23FilterGlossary;

// ===== 2. SWING CHECKPOINT 6-STEP CANVAS =====
var v23SwingSteps=[
  {name:'&#xC5B4;&#xB4DC;&#xB808;&#xC2A4;',checks:['&#xBC1C; &#xB108;&#xBE44; &#xC5B4;&#xAE68; &#xB108;&#xBE44;','&#xBB34;&#xB9CE; &#xC0B4;&#xC9DD; &#xAD7D;&#xD798;','&#xC591;&#xD314; &#xC0BC;&#xAC01;&#xD615; &#xC720;&#xC9C0;','&#xACF5; &#xC704;&#xCE58; &#xC67C;&#xBC1C; &#xC548;&#xCABD;','&#xCCB4;&#xC911; &#xC591;&#xBC1C; &#xADE0;&#xB4F1;'],color:'#4caf50',angle:0},
  {name:'&#xD14C;&#xC774;&#xD06C;&#xBC31;',checks:['&#xC190;&#xBAA9;-&#xD314;-&#xD074;&#xB7FD; &#xC77C;&#xC9C1;&#xC120;','&#xD558;&#xCCB4; &#xACE0;&#xC815; &#xC720;&#xC9C0;','&#xD074;&#xB7FD;&#xD5E4;&#xB4DC; &#xC9C0;&#xBA74; &#xB530;&#xB77C; &#xC774;&#xB3D9;','&#xC67C;&#xD314; &#xBC8B;&#xBC8B;&#xD558;&#xAC8C;','&#xBCF4;&#xB514; &#xD134; &#xC5C6;&#xC774;'],color:'#2196f3',angle:30},
  {name:'&#xD0D1; (&#xBC31;&#xC2A4;&#xC719; &#xC815;&#xC810;)',checks:['&#xC67C;&#xC5B4;&#xAE68; 90&#xB3C4; &#xD68C;&#xC804;','&#xC190;&#xBAA9; &#xCF54;&#xD0B9; &#xC644;&#xB8CC;','&#xCCB4;&#xC911; &#xC624;&#xB978;&#xBC1C; 60%','&#xD074;&#xB7FD; &#xC0E4;&#xD504;&#xD2B8; &#xD3C9;&#xD589;','&#xC67C;&#xD314; &#xBC8B;&#xBC8B;&#xD558;&#xAC8C;'],color:'#ff9800',angle:90},
  {name:'&#xB2E4;&#xC6B4;&#xC2A4;&#xC719;',checks:['&#xD558;&#xCCB4;&#xBD80;&#xD130; &#xC2DC;&#xC791;','&#xCCB4;&#xC911; &#xC67C;&#xBC1C;&#xB85C; &#xC774;&#xB3D9;','&#xD314;&#xAFC8;&#xCE58; &#xC720;&#xC9C0; (&#xB808;&#xC774;&#xD2B8; &#xB9B4;&#xB9AC;&#xC2A4;)','&#xD074;&#xB7FD; &#xC778;&#xC0AC;&#xC774;&#xB4DC; &#xACBD;&#xB85C;','&#xB208;&#xC740; &#xACF5;&#xC5D0; &#xACE0;&#xC815;'],color:'#e91e63',angle:45},
  {name:'&#xC784;&#xD329;&#xD2B8;',checks:['&#xD074;&#xB7FD;&#xD398;&#xC774;&#xC2A4; &#xC2A4;&#xD018;&#xC5B4;','&#xC190;&#xC774; &#xACF5;&#xBCF4;&#xB2E4; &#xC55E;','&#xCCB4;&#xC911; &#xC67C;&#xBC1C; 80%','&#xD5E4;&#xB4DC; &#xB2E4;&#xC6B4; (&#xC2A4;&#xD14C;&#xC774; &#xB2E4;&#xC6B4;)','&#xC5C9;&#xB369;&#xC774; &#xD0C0;&#xAC9F; &#xBC29;&#xD5A5;'],color:'#f44336',angle:0},
  {name:'&#xD314;&#xB85C;&#xC2A4;&#xB8E8;',checks:['&#xC591;&#xD314; &#xD3BC;&#xC9D0; (&#xC775;&#xC2A4;&#xD150;&#xC158;)','&#xCCB4;&#xC911; &#xC67C;&#xBC1C; 95%','&#xBC84;&#xD074; &#xD0C0;&#xAC9F; &#xBC29;&#xD5A5;','&#xBAB8;&#xD1B5; &#xD0C0;&#xAC9F; &#xD5A5;&#xD574; &#xD68C;&#xC804;','&#xBC38;&#xB7F0;&#xC2A4; &#xC720;&#xC9C0;&#xD558;&#xBA70; &#xD53C;&#xB2C8;&#xC2DC;'],color:'#9c27b0',angle:150}
];

var v23SwingChecked=JSON.parse(localStorage.getItem('sg_swing_checks')||'{}');

function v23OpenSwing(){
  v23SFX('swing_open');
  var id='v23SwingOverlay';
  var existing=document.getElementById(id);
  if(existing){existing.classList.add('active');v23RenderSwing();return;}
  var ov=document.createElement('div');
  ov.className='v23-overlay';ov.id=id;
  ov.innerHTML='<div class="v23-modal"><div class="v23-hdr"><h2><span class="v23i">&#x1F3CC;&#xFE0F;</span> &#xC2A4;&#xC719; &#xCCB4;&#xD06C;&#xD3EC;&#xC778;&#xD2B8; 6&#xB2E8;&#xACC4;</h2><button class="v23-x" onclick="document.getElementById(\'v23SwingOverlay\').classList.remove(\'active\')">&times;</button></div><canvas id="v23SwingCanvas" class="v23-swing-canvas" width="600" height="320"></canvas><div id="v23SwingSteps"></div><div id="v23SwingProgress" style="text-align:center;margin-top:12px"></div></div>';
  document.body.appendChild(ov);
  ov.addEventListener('click',function(e){if(e.target===ov)ov.classList.remove('active');});
  ov.classList.add('active');
  v23RenderSwing();
}
window.v23OpenSwing=v23OpenSwing;

function v23RenderSwing(){
  var container=document.getElementById('v23SwingSteps');
  if(!container)return;
  var totalChecks=0,doneChecks=0;
  var h='';
  v23SwingSteps.forEach(function(step,si){
    var allDone=true;
    h+='<div class="v23-card" style="border-left:4px solid '+step.color+'"><h4><span class="v23-swing-num" style="background:'+step.color+'">'+String(si+1)+'</span> '+step.name+'</h4>';
    step.checks.forEach(function(c,ci){
      var key=si+'_'+ci;
      var done=v23SwingChecked[key]||false;
      totalChecks++;
      if(done)doneChecks++;else allDone=false;
      h+='<div class="v23-checklist-item'+(done?' done':'')+'" onclick="v23ToggleSwingCheck('+si+','+ci+')" style="cursor:pointer"><div class="v23-checklist-check">'+(done?'&#x2714;':'')+'</div><span style="font-size:13px">'+c+'</span></div>';
    });
    h+='</div>';
  });
  container.innerHTML=h;
  var pct=totalChecks?Math.round(doneChecks/totalChecks*100):0;
  var prog=document.getElementById('v23SwingProgress');
  if(prog)prog.innerHTML='<div class="v23-progress"><div class="v23-progress-fill" style="width:'+pct+'%;background:linear-gradient(90deg,#4caf50,#2196f3)"></div></div><div style="font-size:13px;font-weight:700;color:var(--primary)">'+pct+'% &#xC644;&#xB8CC; ('+doneChecks+'/'+totalChecks+')</div>';
  v23DrawSwingCanvas(doneChecks,totalChecks);
  if(pct===100){v23SFX('swing_complete');localStorage.setItem('sg_swing_mastered','1');}
}

function v23ToggleSwingCheck(si,ci){
  v23SFX('swing_check');
  var key=si+'_'+ci;
  v23SwingChecked[key]=!v23SwingChecked[key];
  localStorage.setItem('sg_swing_checks',JSON.stringify(v23SwingChecked));
  v23RenderSwing();
}
window.v23ToggleSwingCheck=v23ToggleSwingCheck;

function v23DrawSwingCanvas(done,total){
  var canvas=document.getElementById('v23SwingCanvas');
  if(!canvas)return;
  var ctx=canvas.getContext('2d');
  var w=canvas.width,h=canvas.height;
  ctx.clearRect(0,0,w,h);
  var isDark=document.documentElement.getAttribute('data-theme')==='dark';
  ctx.fillStyle=isDark?'#1a1a1a':'#f9faf9';
  ctx.fillRect(0,0,w,h);
  var cx=w/2,cy=h/2+10;
  ctx.strokeStyle=isDark?'#333':'#e0e0e0';
  ctx.lineWidth=1;
  ctx.beginPath();ctx.arc(cx,cy,110,0,Math.PI*2);ctx.stroke();
  ctx.beginPath();ctx.arc(cx,cy,80,0,Math.PI*2);ctx.stroke();
  v23SwingSteps.forEach(function(step,i){
    var angle=-Math.PI/2+i*(Math.PI*2/6);
    var x=cx+Math.cos(angle)*110;
    var y=cy+Math.sin(angle)*110;
    var allDone=true;
    step.checks.forEach(function(c,ci){if(!v23SwingChecked[i+'_'+ci])allDone=false;});
    ctx.beginPath();ctx.arc(x,y,18,0,Math.PI*2);
    ctx.fillStyle=allDone?step.color:(isDark?'#333':'#e0e0e0');
    ctx.fill();
    ctx.fillStyle=allDone?'#fff':(isDark?'#666':'#999');
    ctx.font='bold 12px sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';
    ctx.fillText(String(i+1),x,y);
    var lx=cx+Math.cos(angle)*145;
    var ly=cy+Math.sin(angle)*145;
    ctx.fillStyle=isDark?'#ccc':'#333';
    ctx.font='bold 11px sans-serif';
    ctx.fillText(step.name,lx,ly);
  });
  var pct=total?done/total:0;
  ctx.beginPath();ctx.arc(cx,cy,50,0,Math.PI*2);
  ctx.fillStyle=isDark?'#222':'#fff';ctx.fill();
  ctx.strokeStyle=isDark?'#444':'#ddd';ctx.lineWidth=4;ctx.stroke();
  ctx.beginPath();ctx.arc(cx,cy,50,-Math.PI/2,-Math.PI/2+Math.PI*2*pct);
  ctx.strokeStyle='#4caf50';ctx.lineWidth=6;ctx.stroke();
  ctx.fillStyle=isDark?'#eee':'#333';
  ctx.font='bold 20px sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';
  ctx.fillText(Math.round(pct*100)+'%',cx,cy-6);
  ctx.font='11px sans-serif';ctx.fillStyle=isDark?'#999':'#666';
  ctx.fillText(done+'/'+total,cx,cy+14);
}

// ===== 3. PRACTICE DRILLS 12 =====
var v23Drills=[
  {name:'&#xD37C;&#xD305; &#xAC8C;&#xC774;&#xD2B8; &#xB4DC;&#xB9B4;',cat:'&#xD37C;&#xD305;',time:'10&#xBD84;',desc:'&#xD2F0;&#xB97C; 2&#xAC1C; &#xC138;&#xC6CC; &#xACF5;&#xC774; &#xC0AC;&#xC774;&#xB85C; &#xC9C0;&#xB098;&#xAC00;&#xB3C4;&#xB85D; &#xD37C;&#xD305;. &#xBC29;&#xD5A5;&#xC131; &#xD6C8;&#xB828;.',icon:'&#x1F3AF;',color:'#4caf50'},
  {name:'&#xD37C;&#xD305; &#xAC70;&#xB9AC;&#xAC10; &#xB4DC;&#xB9B4;',cat:'&#xD37C;&#xD305;',time:'15&#xBD84;',desc:'1m/2m/3m/5m &#xC21C;&#xC11C;&#xB85C; &#xD37C;&#xD305;. &#xAC01; &#xAC70;&#xB9AC; 5&#xAC1C;&#xC529;. &#xAC70;&#xB9AC;&#xAC10; &#xD6C8;&#xB828;.',icon:'&#x1F4CF;',color:'#2196f3'},
  {name:'&#xCE69;&#xC0F7; &#xD0C0;&#xAC9F; &#xB4DC;&#xB9B4;',cat:'&#xCE69;&#xC0F7;',time:'10&#xBD84;',desc:'&#xADF8;&#xB9B0; &#xC5E3;&#xC9C0;&#xC5D0;&#xC11C; &#xD0C0;&#xC6D4; &#xD0C0;&#xAC9F;&#xC5D0; &#xCC29;&#xC9C0;&#xC2DC;&#xD0A4;&#xAE30;. 10&#xAC1C;&#xC529; 3&#xC138;&#xD2B8;.',icon:'&#x1F3F3;&#xFE0F;',color:'#ff9800'},
  {name:'&#xCE69;&#xC0F7; &#xD074;&#xB7FD;&#xBCC0;&#xACBD; &#xB4DC;&#xB9B4;',cat:'&#xCE69;&#xC0F7;',time:'15&#xBD84;',desc:'&#xAC19;&#xC740; &#xAC70;&#xB9AC;&#xC5D0;&#xC11C; 7I/9I/PW/SW&#xB85C; &#xBC88;&#xAC08;&#xC544; &#xCE68;. &#xD0C4;&#xB3C4;&#xC640; &#xAD6C;&#xB984; &#xCC28;&#xC774; &#xCCB4;&#xD5D8;.',icon:'&#x1F504;',color:'#e91e63'},
  {name:'&#xC5B4;&#xD504;&#xB85C;&#xCE58; 50/75/100 &#xB4DC;&#xB9B4;',cat:'&#xC5B4;&#xD504;&#xB85C;&#xCE58;',time:'20&#xBD84;',desc:'50m/75m/100m &#xD0C0;&#xAC9F;&#xC744; &#xBC88;&#xAC08;&#xC544; &#xC5F0;&#xC2B5;. &#xAC01; 10&#xAC1C;&#xC529;.',icon:'&#x1F4A8;',color:'#9c27b0'},
  {name:'&#xC5B4;&#xD504;&#xB85C;&#xCE58; &#xD558;&#xD504;&#xC2A4;&#xC719; &#xB4DC;&#xB9B4;',cat:'&#xC5B4;&#xD504;&#xB85C;&#xCE58;',time:'15&#xBD84;',desc:'&#xD478;&#xC2A4;&#xC719;&#xC744; &#xD558;&#xD504;/3/4&#xB85C; &#xB098;&#xB220; &#xAC70;&#xB9AC; &#xCEE8;&#xD2B8;&#xB864; &#xC5F0;&#xC2B5;.',icon:'&#x1F3CB;&#xFE0F;',color:'#ff5722'},
  {name:'&#xB4DC;&#xB77C;&#xC774;&#xBC84; &#xC5BC;&#xB77C;&#xC778;&#xBA3C;&#xD2B8; &#xB4DC;&#xB9B4;',cat:'&#xB4DC;&#xB77C;&#xC774;&#xBC84;',time:'15&#xBD84;',desc:'&#xD0C0;&#xAC9F; &#xB77C;&#xC778;&#xC744; &#xC124;&#xC815;&#xD558;&#xACE0; &#xBC29;&#xD5A5;&#xC131; &#xC9D1;&#xC911; &#xC5F0;&#xC2B5;. 10&#xAC1C;&#xC529; 3&#xC138;&#xD2B8;.',icon:'&#x1F3CC;&#xFE0F;',color:'#f44336'},
  {name:'&#xB4DC;&#xB77C;&#xC774;&#xBC84; &#xD2F0; &#xB192;&#xC774; &#xB4DC;&#xB9B4;',cat:'&#xB4DC;&#xB77C;&#xC774;&#xBC84;',time:'10&#xBD84;',desc:'&#xD2F0; &#xB192;&#xC774;&#xB97C; &#xB2E4;&#xC591;&#xD558;&#xAC8C; &#xBCC0;&#xACBD;&#xD558;&#xBA70; &#xD0C4;&#xB3C4; &#xBC0F; &#xAC70;&#xB9AC; &#xBCC0;&#xD654; &#xD655;&#xC778;.',icon:'&#x2B06;&#xFE0F;',color:'#795548'},
  {name:'&#xC544;&#xC774;&#xC5B8; &#xBCFC;&#xD3EC;&#xC9C0;&#xC158; &#xB4DC;&#xB9B4;',cat:'&#xC544;&#xC774;&#xC5B8;',time:'15&#xBD84;',desc:'7I&#xB85C; &#xACF5; &#xC704;&#xCE58;&#xB97C; &#xC55E;/&#xC911;&#xAC04;/&#xB4A4;&#xB85C; &#xBCC0;&#xACBD;. &#xD0C4;&#xB3C4; &#xCC28;&#xC774; &#xCCB4;&#xD5D8;.',icon:'&#x26F3;',color:'#3f51b5'},
  {name:'&#xC544;&#xC774;&#xC5B8; &#xD074;&#xB7FD;&#xC21C;&#xD658; &#xB4DC;&#xB9B4;',cat:'&#xC544;&#xC774;&#xC5B8;',time:'20&#xBD84;',desc:'9I&#x2192;8I&#x2192;7I&#x2192;6I &#xC21C;&#xC11C;&#xB85C; &#xAC01; 5&#xAC1C;&#xC529;. &#xD074;&#xB7FD;&#xBCC4; &#xAC70;&#xB9AC; &#xD655;&#xC778;.',icon:'&#x1F503;',color:'#009688'},
  {name:'&#xC6E8;&#xC9C0; &#xBC99;&#xCEE4;&#xC0F7; &#xB4DC;&#xB9B4;',cat:'&#xC6E8;&#xC9C0;',time:'15&#xBD84;',desc:'&#xBAA8;&#xB798; &#xC704;&#xC5D0;&#xC11C; SW&#xB85C; &#xB192;&#xC774; &#xB744;&#xC6B0;&#xAE30; &#xC5F0;&#xC2B5;. &#xC624;&#xD508;&#xD398;&#xC774;&#xC2A4;&#xB85C; &#xCE58;&#xAE30;.',icon:'&#x1F3D6;&#xFE0F;',color:'#ffc107'},
  {name:'&#xC6E8;&#xC9C0; &#xD50C;&#xB86D;&#xC0F7; &#xB4DC;&#xB9B4;',cat:'&#xC6E8;&#xC9C0;',time:'10&#xBD84;',desc:'LW&#xB85C; &#xD398;&#xC774;&#xC2A4; &#xC5F4;&#xACE0; &#xB192;&#xC774; &#xB744;&#xC6B0;&#xB294; &#xC0F7; &#xC5F0;&#xC2B5;. &#xBC99;&#xCEE4;&#xB2D8;&#xAE30;/&#xAE4A;&#xC740;&#xB7EC;&#xD504; &#xB300;&#xBE44;.',icon:'&#x2B50;',color:'#e040fb'}
];

var v23DrillLog=JSON.parse(localStorage.getItem('sg_drill_log')||'[]');

function v23OpenDrills(){
  v23SFX('drill_open');
  var id='v23DrillOverlay';
  var existing=document.getElementById(id);
  if(existing){existing.classList.add('active');return;}
  var ov=document.createElement('div');
  ov.className='v23-overlay';ov.id=id;
  var h='<div class="v23-modal"><div class="v23-hdr"><h2><span class="v23i">&#x1F3CB;&#xFE0F;</span> &#xC5F0;&#xC2B5; &#xB4DC;&#xB9B4; 12&#xC885;</h2><button class="v23-x" onclick="document.getElementById(\'v23DrillOverlay\').classList.remove(\'active\')">&times;</button></div>';
  var cats=['&#xD37C;&#xD305;','&#xCE69;&#xC0F7;','&#xC5B4;&#xD504;&#xB85C;&#xCE58;','&#xB4DC;&#xB77C;&#xC774;&#xBC84;','&#xC544;&#xC774;&#xC5B8;','&#xC6E8;&#xC9C0;'];
  cats.forEach(function(cat){
    h+='<h3 style="font-size:14px;font-weight:700;margin:16px 0 8px;color:var(--primary)">'+cat+'</h3>';
    v23Drills.filter(function(d){return d.cat===cat;}).forEach(function(d,i){
      h+='<div class="v23-drill-card"><div class="v23-drill-icon" style="background:'+d.color+'22;color:'+d.color+'">'+d.icon+'</div><div class="v23-drill-info"><div class="v23-drill-name">'+d.name+'</div><div class="v23-drill-desc">'+d.desc+'</div><div class="v23-drill-time">&#x23F1;&#xFE0F; '+d.time+'</div></div><button class="v23-btn v23-btn-sm v23-btn-primary" onclick="v23StartDrill(\''+d.name.replace(/'/g,'\\\'')+'\')" style="flex-shrink:0">&#xC2DC;&#xC791;</button></div>';
    });
  });
  h+='<div class="v23-divider"></div><h3 style="font-size:14px;font-weight:700;margin-bottom:8px">&#xCD5C;&#xADFC; &#xC5F0;&#xC2B5; &#xAE30;&#xB85D;</h3><div id="v23DrillHistory"></div></div>';
  ov.innerHTML=h;
  document.body.appendChild(ov);
  ov.addEventListener('click',function(e){if(e.target===ov)ov.classList.remove('active');});
  ov.classList.add('active');
  v23RenderDrillHistory();
}
window.v23OpenDrills=v23OpenDrills;

function v23StartDrill(name){
  v23SFX('drill_start');
  v23DrillLog.unshift({name:name,date:new Date().toISOString().slice(0,10),time:new Date().toLocaleTimeString('ko-KR',{hour:'2-digit',minute:'2-digit'})});
  if(v23DrillLog.length>30)v23DrillLog=v23DrillLog.slice(0,30);
  localStorage.setItem('sg_drill_log',JSON.stringify(v23DrillLog));
  v23RenderDrillHistory();
  v23Toast('&#x1F3CB;&#xFE0F; '+name+' &#xC2DC;&#xC791;!');
}
window.v23StartDrill=v23StartDrill;

function v23RenderDrillHistory(){
  var el=document.getElementById('v23DrillHistory');
  if(!el)return;
  if(!v23DrillLog.length){el.innerHTML='<div style="text-align:center;padding:16px;color:var(--text-muted)">&#xC544;&#xC9C1; &#xC5F0;&#xC2B5; &#xAE30;&#xB85D;&#xC774; &#xC5C6;&#xC2B5;&#xB2C8;&#xB2E4;.</div>';return;}
  var h='';
  v23DrillLog.slice(0,10).forEach(function(d){
    h+='<div style="display:flex;justify-content:space-between;padding:8px;background:var(--bg);border-radius:8px;margin-bottom:4px;font-size:12px"><span style="font-weight:600">'+d.name+'</span><span style="color:var(--text-muted)">'+d.date+' '+d.time+'</span></div>';
  });
  el.innerHTML=h;
}

// ===== 4. ROUND REMINDER =====
var v23Reminders=JSON.parse(localStorage.getItem('sg_reminders')||'[]');
var v23Checklist=['&#xACE8;&#xD504;&#xBC31;','&#xACE8;&#xD504;&#xD654;','&#xACE8;&#xD504;&#xC7A5;&#xAC11;','&#xACE8;&#xD504;&#xACF5;','&#xD2F0;','&#xBCFC;&#xB9C8;&#xCEE4;','&#xB514;&#xBCBB;&#xD234;','&#xC120;&#xD06C;&#xB9BC;','&#xBAA8;&#xC790;','&#xC6B0;&#xBE44;','&#xD0C0;&#xC6D4;','&#xC218;&#xAC74;/&#xC74C;&#xB8CC;'];

function v23OpenReminder(){
  v23SFX('remind_open');
  var id='v23RemindOverlay';
  var existing=document.getElementById(id);
  if(existing){existing.classList.add('active');v23RenderReminder();return;}
  var ov=document.createElement('div');
  ov.className='v23-overlay';ov.id=id;
  ov.innerHTML='<div class="v23-modal"><div class="v23-hdr"><h2><span class="v23i">&#x23F0;</span> &#xB77C;&#xC6B4;&#xB4DC; &#xB9AC;&#xB9C8;&#xC778;&#xB354;</h2><button class="v23-x" onclick="document.getElementById(\'v23RemindOverlay\').classList.remove(\'active\')">&times;</button></div><div id="v23RemindContent"></div></div>';
  document.body.appendChild(ov);
  ov.addEventListener('click',function(e){if(e.target===ov)ov.classList.remove('active');});
  ov.classList.add('active');
  v23RenderReminder();
}
window.v23OpenReminder=v23OpenReminder;

function v23RenderReminder(){
  var el=document.getElementById('v23RemindContent');
  if(!el)return;
  var h='<div class="v23-card"><h4>&#x2795; &#xC0C8; &#xB77C;&#xC6B4;&#xB4DC; &#xB4F1;&#xB85D;</h4><div class="v23-grid2" style="margin-bottom:12px"><div><label style="font-size:11px;font-weight:600;display:block;margin-bottom:4px">&#xB0A0;&#xC9DC;</label><input type="date" class="v23-input" id="v23RemindDate"></div><div><label style="font-size:11px;font-weight:600;display:block;margin-bottom:4px">&#xACE8;&#xD504;&#xC7A5;</label><input type="text" class="v23-input" id="v23RemindCourse" placeholder="&#xACE8;&#xD504;&#xC7A5;&#xBA85;"></div></div><div><label style="font-size:11px;font-weight:600;display:block;margin-bottom:4px">&#xBA54;&#xBAA8;</label><input type="text" class="v23-input" id="v23RemindMemo" placeholder="&#xB3D9;&#xBC18;&#xC790;, &#xD2F0;&#xD0C0;&#xC784; &#xB4F1;"></div><button class="v23-btn v23-btn-primary" style="width:100%;margin-top:10px" onclick="v23AddReminder()">&#xB4F1;&#xB85D;</button></div>';
  h+='<div class="v23-divider"></div><h3 style="font-size:14px;font-weight:700;margin-bottom:12px">&#xC608;&#xC815; &#xB77C;&#xC6B4;&#xB4DC;</h3>';
  var today=new Date();today.setHours(0,0,0,0);
  v23Reminders.sort(function(a,b){return new Date(a.date)-new Date(b.date);});
  if(!v23Reminders.length)h+='<div style="text-align:center;padding:20px;color:var(--text-muted)">&#xB4F1;&#xB85D;&#xB41C; &#xB77C;&#xC6B4;&#xB4DC;&#xAC00; &#xC5C6;&#xC2B5;&#xB2C8;&#xB2E4;.</div>';
  v23Reminders.forEach(function(r,i){
    var rd=new Date(r.date);rd.setHours(0,0,0,0);
    var diff=Math.ceil((rd-today)/(1000*60*60*24));
    var ddayText=diff>0?'D-'+diff:diff===0?'D-DAY!':'&#xC644;&#xB8CC;';
    var ddayColor=diff>7?'var(--primary)':diff>0?'#ff6b35':'#e53935';
    h+='<div class="v23-remind-item"><div style="display:flex;justify-content:space-between;align-items:center"><div><div style="font-size:15px;font-weight:700">'+r.course+'</div><div style="font-size:12px;color:var(--text-muted)">'+r.date+(r.memo?' | '+r.memo:'')+'</div></div><div style="text-align:right"><div class="v23-remind-dday" style="color:'+ddayColor+';font-size:24px;margin:0">'+ddayText+'</div><button class="v23-btn v23-btn-sm" style="background:#ff4757;color:#fff;padding:3px 8px;font-size:10px" onclick="v23DelReminder('+i+')">&#xC0AD;&#xC81C;</button></div></div></div>';
  });
  h+='<div class="v23-divider"></div><h3 style="font-size:14px;font-weight:700;margin-bottom:12px">&#x2705; &#xC900;&#xBE44;&#xBB3C; &#xCCB4;&#xD06C;&#xB9AC;&#xC2A4;&#xD2B8;</h3>';
  var chkState=JSON.parse(localStorage.getItem('sg_checklist')||'{}');
  v23Checklist.forEach(function(item,i){
    var done=chkState[i]||false;
    h+='<div class="v23-checklist-item'+(done?' done':'')+'" onclick="v23ToggleChecklist('+i+')"><div class="v23-checklist-check">'+(done?'&#x2714;':'')+'</div><span style="font-size:13px">'+item+'</span></div>';
  });
  el.innerHTML=h;
}

function v23AddReminder(){
  v23SFX('remind_save');
  var d=document.getElementById('v23RemindDate').value;
  var c=document.getElementById('v23RemindCourse').value;
  if(!d||!c){v23Toast('&#x26A0;&#xFE0F; &#xB0A0;&#xC9DC;&#xC640; &#xACE8;&#xD504;&#xC7A5;&#xC744; &#xC785;&#xB825;&#xD558;&#xC138;&#xC694;.');return;}
  var m=document.getElementById('v23RemindMemo').value;
  v23Reminders.push({date:d,course:c,memo:m});
  localStorage.setItem('sg_reminders',JSON.stringify(v23Reminders));
  v23RenderReminder();
  v23Toast('&#x23F0; &#xB77C;&#xC6B4;&#xB4DC; &#xB4F1;&#xB85D; &#xC644;&#xB8CC;!');
}
window.v23AddReminder=v23AddReminder;

function v23DelReminder(i){v23Reminders.splice(i,1);localStorage.setItem('sg_reminders',JSON.stringify(v23Reminders));v23RenderReminder();}
window.v23DelReminder=v23DelReminder;

function v23ToggleChecklist(i){
  var chk=JSON.parse(localStorage.getItem('sg_checklist')||'{}');
  chk[i]=!chk[i];localStorage.setItem('sg_checklist',JSON.stringify(chk));
  v23RenderReminder();
}
window.v23ToggleChecklist=v23ToggleChecklist;

// ===== 5. PERFORMANCE TREND DASHBOARD =====
function v23OpenTrend(){
  v23SFX('trend_open');
  var id='v23TrendOverlay';
  var existing=document.getElementById(id);
  if(existing){existing.classList.add('active');v23DrawTrend();return;}
  var ov=document.createElement('div');
  ov.className='v23-overlay';ov.id=id;
  ov.innerHTML='<div class="v23-modal"><div class="v23-hdr"><h2><span class="v23i">&#x1F4C8;</span> &#xD37C;&#xD3EC;&#xBA3C;&#xC2A4; &#xD2B8;&#xB80C;&#xB4DC;</h2><button class="v23-x" onclick="document.getElementById(\'v23TrendOverlay\').classList.remove(\'active\')">&times;</button></div><canvas id="v23TrendCanvas" class="v23-trend-canvas" width="620" height="280"></canvas><div id="v23TrendStats"></div></div>';
  document.body.appendChild(ov);
  ov.addEventListener('click',function(e){if(e.target===ov)ov.classList.remove('active');});
  ov.classList.add('active');
  v23DrawTrend();
}
window.v23OpenTrend=v23OpenTrend;

function v23DrawTrend(){
  v23SFX('trend_draw');
  var rounds=JSON.parse(localStorage.getItem('sg_rounds')||'[]');
  var canvas=document.getElementById('v23TrendCanvas');
  if(!canvas)return;
  var ctx=canvas.getContext('2d');
  var w=canvas.width,h=canvas.height;
  ctx.clearRect(0,0,w,h);
  var isDark=document.documentElement.getAttribute('data-theme')==='dark';
  ctx.fillStyle=isDark?'#1e1e1e':'#fff';
  ctx.fillRect(0,0,w,h);
  var recent=rounds.slice(0,10).reverse();
  if(recent.length<2){
    ctx.fillStyle=isDark?'#999':'#666';
    ctx.font='14px sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';
    ctx.fillText('2개 이상의 라운드 기록이 필요합니다. 하단 ⛳ GPS 라운드로 기록해 보세요.',w/2,h/2);
    return;
  }
  var scores=recent.map(function(r){return r.score;});
  var maxS=Math.max.apply(null,scores)+5;
  var minS=Math.min.apply(null,scores)-5;
  var padL=50,padR=20,padT=30,padB=40;
  var chartW=w-padL-padR,chartH=h-padT-padB;
  ctx.strokeStyle=isDark?'#333':'#e0e0e0';
  ctx.lineWidth=1;
  for(var g=0;g<5;g++){
    var gy=padT+chartH*g/4;
    ctx.beginPath();ctx.moveTo(padL,gy);ctx.lineTo(w-padR,gy);ctx.stroke();
    var val=Math.round(maxS-(maxS-minS)*g/4);
    ctx.fillStyle=isDark?'#999':'#666';ctx.font='11px sans-serif';ctx.textAlign='right';ctx.textBaseline='middle';
    ctx.fillText(String(val),padL-8,gy);
  }
  var points=[];
  scores.forEach(function(s,i){
    var x=padL+i*chartW/(scores.length-1);
    var y=padT+chartH*(1-(s-minS)/(maxS-minS));
    points.push({x:x,y:y,score:s,date:recent[i].date});
  });
  var grad=ctx.createLinearGradient(0,padT,0,h-padB);
  grad.addColorStop(0,'rgba(26,122,58,0.3)');
  grad.addColorStop(1,'rgba(26,122,58,0.02)');
  ctx.beginPath();ctx.moveTo(points[0].x,h-padB);
  points.forEach(function(p){ctx.lineTo(p.x,p.y);});
  ctx.lineTo(points[points.length-1].x,h-padB);
  ctx.fillStyle=grad;ctx.fill();
  ctx.beginPath();
  points.forEach(function(p,i){if(i===0)ctx.moveTo(p.x,p.y);else ctx.lineTo(p.x,p.y);});
  ctx.strokeStyle='#1a7a3a';ctx.lineWidth=3;ctx.stroke();
  points.forEach(function(p){
    ctx.beginPath();ctx.arc(p.x,p.y,5,0,Math.PI*2);
    ctx.fillStyle='#1a7a3a';ctx.fill();
    ctx.fillStyle='#fff';ctx.beginPath();ctx.arc(p.x,p.y,2,0,Math.PI*2);ctx.fill();
    ctx.fillStyle=isDark?'#ccc':'#333';
    ctx.font='bold 11px sans-serif';ctx.textAlign='center';ctx.textBaseline='bottom';
    ctx.fillText(String(p.score),p.x,p.y-10);
  });
  points.forEach(function(p){
    ctx.fillStyle=isDark?'#999':'#666';ctx.font='9px sans-serif';ctx.textAlign='center';ctx.textBaseline='top';
    ctx.fillText(p.date.slice(5),p.x,h-padB+6);
  });
  ctx.fillStyle=isDark?'#ccc':'#333';ctx.font='bold 12px sans-serif';ctx.textAlign='center';
  ctx.fillText('최근 '+scores.length+'라운드 스코어 추이',w/2,15);
  var statsEl=document.getElementById('v23TrendStats');
  if(statsEl){
    var avg=Math.round(scores.reduce(function(a,b){return a+b;},0)/scores.length*10)/10;
    var best=Math.min.apply(null,scores);
    var worst=Math.max.apply(null,scores);
    var trend=scores[scores.length-1]-scores[0];
    statsEl.innerHTML='<div class="v23-grid3" style="margin-top:12px"><div class="v23-card" style="text-align:center"><div style="font-size:24px;font-weight:800;color:var(--primary)">'+avg+'</div><div style="font-size:11px;color:var(--text-muted)">&#xD3C9;&#xADE0;</div></div><div class="v23-card" style="text-align:center"><div style="font-size:24px;font-weight:800;color:#4caf50">'+best+'</div><div style="font-size:11px;color:var(--text-muted)">&#xBCA0;&#xC2A4;&#xD2B8;</div></div><div class="v23-card" style="text-align:center"><div style="font-size:24px;font-weight:800;color:'+(trend<0?'#4caf50':'#f44336')+'">'+((trend>0?'+':'')+trend)+'</div><div style="font-size:11px;color:var(--text-muted)">&#xCD94;&#xC138;</div></div></div>';
  }
}

// ===== 6. GOLF QUOTES 100 =====
var v23Quotes=[
['&#xACE8;&#xD504;&#xB294; &#xC790;&#xC2E0;&#xACFC;&#xC758; &#xC2F8;&#xC6C0;&#xC774;&#xB2E4;.','&#xBC25; &#xC874;&#xC2A4;'],
['&#xC2E4;&#xD328;&#xD55C; &#xC0F7;&#xC740; &#xC78A;&#xC5B4;&#xB77C;. &#xB2E4;&#xC74C; &#xC0F7;&#xC5D0; &#xC9D1;&#xC911;&#xD558;&#xB77C;.','&#xC6F9;&#xD130; &#xD574;&#xAC90;'],
['&#xACE8;&#xD504;&#xC5D0;&#xC11C; &#xAC00;&#xC7A5; &#xC911;&#xC694;&#xD55C; &#xAC70;&#xB9AC;&#xB294; &#xADE0; &#xC0AC;&#xC774;&#xC758; 6&#xC778;&#xCE58;&#xC774;&#xB2E4;.','&#xBC25; &#xC874;&#xC2A4;'],
['&#xC5F0;&#xC2B5;&#xC740; &#xAC70;&#xC9D3;&#xB9D0;&#xC744; &#xD558;&#xC9C0; &#xC54A;&#xB294;&#xB2E4;.','&#xBCA4; &#xD638;&#xAC74;'],
['&#xACE8;&#xD504;&#xB294; &#xC644;&#xBCBD;&#xD568;&#xC744; &#xCD94;&#xAD6C;&#xD558;&#xB294; &#xAC8C;&#xC784;&#xC774; &#xC544;&#xB2C8;&#xB2E4;.','&#xD0C0;&#xC774;&#xAC70; &#xC6B0;&#xC988;'],
['&#xBAA8;&#xB4E0; &#xC0F7;&#xC740; &#xB2E4;&#xB978; &#xC0F7;&#xC758; &#xC900;&#xBE44;&#xC774;&#xB2E4;.','&#xBC25; &#xC874;&#xC2A4;'],
['&#xC2AC;&#xB85C;&#xC6B0; &#xC774;&#xC988; &#xC2A4;&#xBB34;&#xB4DC;.','&#xACE8;&#xD504; &#xACA9;&#xC5B8;'],
['&#xD37C;&#xD305;&#xC740; &#xC2A4;&#xCF54;&#xC5B4;&#xC758; 40%&#xB97C; &#xCC28;&#xC9C0;&#xD55C;&#xB2E4;.','&#xBCA4; &#xD638;&#xAC74;'],
['&#xACE8;&#xD504;&#xB294; 90%&#xAC00; &#xBA58;&#xD0C8;&#xC774;&#xB2E4;.','&#xC7AD; &#xB2C8;&#xD074;&#xB77C;&#xC6B0;&#xC2A4;'],
['&#xB4DC;&#xB77C;&#xC774;&#xBC84;&#xB294; &#xC1FC;&#xB97C; &#xC704;&#xD55C; &#xAC83;&#xC774;&#xACE0;, &#xD37C;&#xD305;&#xC740; &#xB3C8;&#xC744; &#xC704;&#xD55C; &#xAC83;&#xC774;&#xB2E4;.','&#xACE8;&#xD504; &#xACA9;&#xC5B8;'],
['&#xC5B4;&#xC81C;&#xBCF4;&#xB2E4; &#xB098;&#xC740; &#xACE8;&#xD37C;&#xAC00; &#xB418;&#xB294; &#xAC83;&#xC774; &#xBAA9;&#xD45C;&#xB2E4;.','&#xACE8;&#xD504; &#xBA85;&#xC5B8;'],
['&#xCF54;&#xC2A4; &#xB9E4;&#xB2C8;&#xC9C0;&#xBA3C;&#xD2B8;&#xAC00; &#xC2A4;&#xC719;&#xBCF4;&#xB2E4; &#xC911;&#xC694;&#xD558;&#xB2E4;.','&#xBCA4; &#xD638;&#xAC74;'],
['&#xD638;&#xAE30;&#xC2EC;&#xC740; &#xACE8;&#xD504;&#xC758; &#xAC00;&#xC7A5; &#xD070; &#xC801;&#xC774;&#xB2E4;.','&#xC6F9;&#xD130; &#xD574;&#xAC90;'],
['&#xACE8;&#xD504;&#xB97C; &#xC990;&#xACA8;&#xB77C;. &#xADF8;&#xAC83;&#xC774; &#xAC00;&#xC7A5; &#xC911;&#xC694;&#xD55C; &#xADDC;&#xCE59;&#xC774;&#xB2E4;.','&#xACE8;&#xD504; &#xBA85;&#xC5B8;'],
['&#xC790;&#xC2E0;&#xC758; &#xD55C;&#xACC4;&#xB97C; &#xC544;&#xB294; &#xAC83;&#xC774; &#xC88B;&#xC740; &#xACE8;&#xD504;&#xC758; &#xC2DC;&#xC791;&#xC774;&#xB2E4;.','&#xD1B0; &#xC6CC;&#xD2B8;&#xC2A8;'],
['&#xACE8;&#xD504;&#xB294; &#xC778;&#xC0DD;&#xACFC; &#xAC19;&#xB2E4;. &#xD56D;&#xC0C1; &#xACF5;&#xC815;&#xD558;&#xC9C0;&#xB294; &#xC54A;&#xB2E4;.','&#xACE8;&#xD504; &#xBA85;&#xC5B8;'],
['&#xC2A4;&#xC719;&#xC744; &#xBC14;&#xAFB8;&#xC9C0; &#xB9C8;&#xB77C;. &#xC5F0;&#xC2B5;&#xC73C;&#xB85C; &#xAC1C;&#xC120;&#xD558;&#xB77C;.','&#xACE8;&#xD504; &#xBA85;&#xC5B8;'],
['&#xB0A0;&#xC528;&#xAC00; &#xB098;&#xBE60;&#xB3C4; &#xACE8;&#xD504;&#xB294; &#xC990;&#xACA8;&#xC57C; &#xD55C;&#xB2E4;.','&#xACE8;&#xD504; &#xBA85;&#xC5B8;'],
['&#xD55C; &#xD0C0;&#xC5D0; &#xC9D1;&#xC911;&#xD558;&#xB77C;. &#xADF8;&#xAC83;&#xC774; &#xC804;&#xBD80;&#xB2E4;.','&#xD0C0;&#xC774;&#xAC70; &#xC6B0;&#xC988;'],
['&#xACE8;&#xD504;&#xB294; &#xAC70;&#xB9AC;&#xAC00; &#xC544;&#xB2C8;&#xB77C; &#xBC29;&#xD5A5;&#xC774;&#xB2E4;.','&#xACE8;&#xD504; &#xBA85;&#xC5B8;'],
['&#xD504;&#xB9AC;&#xC0F7; &#xB8E8;&#xD2F4;&#xC774; &#xC77C;&#xAD00;&#xC131;&#xC744; &#xB9CC;&#xB4E0;&#xB2E4;.','&#xACE8;&#xD504; &#xBA85;&#xC5B8;'],
['&#xBC99;&#xCEE4;&#xC5D0;&#xC11C; &#xD0C8;&#xCD9C;&#xD558;&#xB294; &#xBC95;&#xC744; &#xC5F0;&#xC2B5;&#xD558;&#xB77C;.','&#xACE8;&#xD504; &#xBA85;&#xC5B8;'],
['&#xADF8;&#xB9B0; &#xC77D;&#xAE30;&#xB294; &#xACBD;&#xD5D8;&#xC5D0;&#xC11C; &#xB098;&#xC628;&#xB2E4;.','&#xACE8;&#xD504; &#xBA85;&#xC5B8;'],
['&#xACE8;&#xD504;&#xB294; &#xC790;&#xC5F0;&#xACFC; &#xD568;&#xAED8;&#xD558;&#xB294; &#xC2A4;&#xD3EC;&#xCE20;&#xB2E4;.','&#xACE8;&#xD504; &#xBA85;&#xC5B8;'],
['&#xD3EC;&#xAE30;&#xD558;&#xC9C0; &#xB9C8;&#xB77C;. &#xACE8;&#xD504;&#xB294; &#xC778;&#xB0B4;&#xC758; &#xAC8C;&#xC784;&#xC774;&#xB2E4;.','&#xACE8;&#xD504; &#xBA85;&#xC5B8;']
];

function v23OpenQuote(){
  v23SFX('quote_open');
  var id='v23QuoteOverlay';
  var existing=document.getElementById(id);
  if(existing){existing.classList.add('active');v23RenderQuote();return;}
  var ov=document.createElement('div');
  ov.className='v23-overlay';ov.id=id;
  ov.innerHTML='<div class="v23-modal"><div class="v23-hdr"><h2><span class="v23i">&#x1F4AC;</span> &#xC624;&#xB298;&#xC758; &#xACE8;&#xD504; &#xBA85;&#xC5B8;</h2><button class="v23-x" onclick="document.getElementById(\'v23QuoteOverlay\').classList.remove(\'active\')">&times;</button></div><div id="v23QuoteContent"></div></div>';
  document.body.appendChild(ov);
  ov.addEventListener('click',function(e){if(e.target===ov)ov.classList.remove('active');});
  ov.classList.add('active');
  v23RenderQuote();
}
window.v23OpenQuote=v23OpenQuote;

function v23RenderQuote(){
  var el=document.getElementById('v23QuoteContent');
  if(!el)return;
  var today=new Date();
  var dayOfYear=Math.floor((today-new Date(today.getFullYear(),0,0))/(1000*60*60*24));
  var idx=dayOfYear%v23Quotes.length;
  var q=v23Quotes[idx];
  var h='<div class="v23-quote-box"><div class="v23-quote-text">&ldquo;'+q[0]+'&rdquo;</div><div class="v23-quote-author">- '+q[1]+'</div></div>';
  h+='<div style="text-align:center;margin:12px 0"><button class="v23-btn v23-btn-secondary" onclick="v23RandomQuote()">&#x1F504; &#xB79C;&#xB364; &#xBA85;&#xC5B8;</button></div>';
  h+='<div class="v23-divider"></div><h3 style="font-size:14px;font-weight:700;margin-bottom:12px">&#xC804;&#xCCB4; &#xBA85;&#xC5B8; ('+v23Quotes.length+'&#xAC1C;)</h3>';
  v23Quotes.forEach(function(q,i){
    h+='<div style="padding:10px;border-bottom:1px solid var(--border);font-size:12px"><span style="color:var(--primary);font-weight:700">#'+(i+1)+'</span> &ldquo;'+q[0]+'&rdquo; <span style="color:var(--text-muted)">- '+q[1]+'</span></div>';
  });
  el.innerHTML=h;
}

function v23RandomQuote(){
  v23SFX('quote_refresh');
  var el=document.getElementById('v23QuoteContent');
  if(!el)return;
  var idx=Math.floor(Math.random()*v23Quotes.length);
  var q=v23Quotes[idx];
  var box=el.querySelector('.v23-quote-box');
  if(box){
    box.innerHTML='<div class="v23-quote-text">&ldquo;'+q[0]+'&rdquo;</div><div class="v23-quote-author">- '+q[1]+'</div>';
  }
}
window.v23RandomQuote=v23RandomQuote;

// ===== 7. COURSE REVIEW SYSTEM =====
var v23Reviews=JSON.parse(localStorage.getItem('sg_reviews')||'{}');
var v23ReviewTags=['&#xAD00;&#xB9AC;&#xC88B;&#xC74C;','&#xAC00;&#xC131;&#xBE44;','&#xC811;&#xADFC;&#xC131;','&#xACBD;&#xCE58;&#xC88B;&#xC74C;','&#xC2DD;&#xB2F9;&#xB9DB;&#xC9D1;','&#xCE90;&#xB514;&#xCE5C;&#xC808;','&#xC2DC;&#xC124;&#xC88B;&#xC74C;','&#xCD08;&#xBCF4;&#xC790;&#xCD94;&#xCC9C;'];

function v23OpenReview(courseName){
  v23SFX('review_open');
  var id='v23ReviewOverlay';
  var existing=document.getElementById(id);
  if(existing){existing.remove();}
  var ov=document.createElement('div');
  ov.className='v23-overlay active';ov.id=id;
  var reviews=v23Reviews[courseName]||[];
  var h='<div class="v23-modal"><div class="v23-hdr"><h2><span class="v23i">&#x2B50;</span> &#xCF54;&#xC2A4; &#xB9AC;&#xBDF0;</h2><button class="v23-x" onclick="document.getElementById(\'v23ReviewOverlay\').classList.remove(\'active\')">&times;</button></div>';
  h+='<div class="v23-card"><h4>&#x1F4DD; &#xB9AC;&#xBDF0; &#xC791;&#xC131;</h4>';
  h+='<div style="margin-bottom:8px"><label style="font-size:11px;font-weight:600">&#xACE8;&#xD504;&#xC7A5;</label><input class="v23-input" id="v23RevCourse" value="'+(courseName||'')+'" placeholder="&#xACE8;&#xD504;&#xC7A5;&#xBA85;"></div>';
  h+='<div style="margin-bottom:8px"><label style="font-size:11px;font-weight:600">&#xBCC4;&#xC810;</label><div class="v23-review-stars" id="v23RevStars">';
  for(var s=1;s<=5;s++)h+='<span class="v23-review-star" data-star="'+s+'" onclick="v23SetStar('+s+')">&#x2605;</span>';
  h+='</div></div>';
  h+='<div style="margin-bottom:8px"><label style="font-size:11px;font-weight:600">&#xD55C;&#xC904;&#xD3C9;</label><input class="v23-input" id="v23RevText" placeholder="&#xD55C; &#xC904;&#xB85C; &#xD3C9;&#xAC00;&#xD574;&#xC8FC;&#xC138;&#xC694;"></div>';
  h+='<div style="margin-bottom:8px"><label style="font-size:11px;font-weight:600">&#xD0DC;&#xADF8;</label><div style="display:flex;gap:4px;flex-wrap:wrap">';
  v23ReviewTags.forEach(function(tag){
    h+='<button class="v23-btn v23-btn-sm v23-btn-secondary v23-rev-tag" data-tag="'+tag+'" onclick="this.classList.toggle(\'active\');this.style.background=this.classList.contains(\'active\')?\'var(--primary)\':\'\'">'+tag+'</button>';
  });
  h+='</div></div>';
  h+='<button class="v23-btn v23-btn-primary" style="width:100%;margin-top:8px" onclick="v23SaveReview()">&#xC800;&#xC7A5;</button></div>';
  h+='<div class="v23-divider"></div><h3 style="font-size:14px;font-weight:700;margin-bottom:12px">&#xB9AC;&#xBDF0; &#xBAA9;&#xB85D;</h3><div id="v23RevList"></div></div>';
  ov.innerHTML=h;
  document.body.appendChild(ov);
  ov.addEventListener('click',function(e){if(e.target===ov)ov.classList.remove('active');});
  v23RenderReviews();
}
window.v23OpenReview=v23OpenReview;

var v23StarVal=0;
function v23SetStar(n){
  v23StarVal=n;
  document.querySelectorAll('#v23RevStars .v23-review-star').forEach(function(s){
    s.classList.toggle('active',parseInt(s.dataset.star)<=n);
  });
}
window.v23SetStar=v23SetStar;

function v23SaveReview(){
  v23SFX('review_save');
  var course=document.getElementById('v23RevCourse').value;
  var text=document.getElementById('v23RevText').value;
  if(!course||!v23StarVal){v23Toast('&#x26A0;&#xFE0F; &#xACE8;&#xD504;&#xC7A5;&#xACFC; &#xBCC4;&#xC810;&#xC744; &#xC785;&#xB825;&#xD558;&#xC138;&#xC694;.');return;}
  var tags=[];
  document.querySelectorAll('.v23-rev-tag.active').forEach(function(t){tags.push(t.dataset.tag);});
  if(!v23Reviews[course])v23Reviews[course]=[];
  v23Reviews[course].unshift({star:v23StarVal,text:text,tags:tags,date:new Date().toISOString().slice(0,10)});
  localStorage.setItem('sg_reviews',JSON.stringify(v23Reviews));
  v23StarVal=0;
  v23RenderReviews();
  v23Toast('&#x2B50; &#xB9AC;&#xBDF0; &#xC800;&#xC7A5; &#xC644;&#xB8CC;!');
}
window.v23SaveReview=v23SaveReview;

function v23RenderReviews(){
  var el=document.getElementById('v23RevList');
  if(!el)return;
  var all=[];
  Object.keys(v23Reviews).forEach(function(course){
    v23Reviews[course].forEach(function(r){all.push({course:course,star:r.star,text:r.text,tags:r.tags||[],date:r.date});});
  });
  all.sort(function(a,b){return b.date.localeCompare(a.date);});
  if(!all.length){el.innerHTML='<div style="text-align:center;padding:20px;color:var(--text-muted)">&#xC544;&#xC9C1; &#xB9AC;&#xBDF0;&#xAC00; &#xC5C6;&#xC2B5;&#xB2C8;&#xB2E4;.</div>';return;}
  var h='';
  all.slice(0,20).forEach(function(r){
    h+='<div class="v23-card" style="border-left:4px solid #f59e0b"><div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px"><span style="font-weight:700">'+r.course+'</span><span style="color:#f59e0b;font-weight:700">'+'&#x2605;'.repeat(r.star)+'&#x2606;'.repeat(5-r.star)+'</span></div>';
    if(r.text)h+='<div style="font-size:13px;margin-bottom:6px">'+r.text+'</div>';
    if(r.tags.length)h+='<div style="display:flex;gap:4px;flex-wrap:wrap">'+r.tags.map(function(t){return '<span class="v23-badge" style="background:var(--primary-light);color:var(--primary)">'+t+'</span>';}).join('')+'</div>';
    h+='<div style="font-size:10px;color:var(--text-muted);margin-top:4px">'+r.date+'</div></div>';
  });
  el.innerHTML=h;
}

// ===== 8. GOLF IQ v8 - 15 QUESTIONS =====
var v23QuizData=[
{q:'&#xACE8;&#xD504;&#xC5D0;&#xC11C; &ldquo;&#xBCA0;&#xC2A4;&#xD2B8;&#xBCFC;&rdquo; &#xBC29;&#xC2DD;&#xC740; &#xBB34;&#xC5C7;&#xC778;&#xAC00;&#xC694;?',a:['&#xD300;&#xC6D0; &#xC911; &#xAC00;&#xC7A5; &#xC88B;&#xC740; &#xACF5;&#xC744; &#xD300; &#xC810;&#xC218;&#xB85C; &#xCC44;&#xD0DD;','&#xBAA8;&#xB4E0; &#xD300;&#xC6D0;&#xC774; &#xAC19;&#xC740; &#xACF5;&#xC744; &#xCE68;','&#xAC00;&#xC7A5; &#xBA3C; &#xACF5;&#xC744; &#xC120;&#xD0DD;','&#xAC01;&#xC790; &#xACF5;&#xC744; &#xCE58;&#xACE0; &#xD569;&#xC0B0;'],c:0},
{q:'WHS(World Handicap System)&#xC5D0;&#xC11C; &#xD575;&#xB514;&#xCEA1; &#xC0B0;&#xCD9C;&#xC5D0; &#xC0AC;&#xC6A9;&#xD558;&#xB294; &#xCD5C;&#xADFC; &#xB77C;&#xC6B4;&#xB4DC; &#xC218;&#xB294;?',a:['10&#xB77C;&#xC6B4;&#xB4DC;','20&#xB77C;&#xC6B4;&#xB4DC; &#xC911; &#xBCA0;&#xC2A4;&#xD2B8; 8&#xAC1C;','30&#xB77C;&#xC6B4;&#xB4DC;','5&#xB77C;&#xC6B4;&#xB4DC;'],c:1},
{q:'&#xADF8;&#xB9B0; &#xC18D;&#xB3C4;&#xB97C; &#xCE21;&#xC815;&#xD558;&#xB294; &#xB3C4;&#xAD6C;&#xB294;?',a:['&#xB808;&#xC774;&#xC800;','&#xC2A4;&#xD0C0;&#xC784;&#xD53C;&#xBBF8;&#xD130;','&#xB808;&#xC774;&#xB2E4;','&#xD48D;&#xC18D;&#xACC4;'],c:1},
{q:'&#xD074;&#xB7FD;&#xD5E4;&#xB4DC;&#xC758; &#xD638;&#xC170;(Hosel)&#xC5D0; &#xACF5;&#xC774; &#xB9DE;&#xC73C;&#xBA74; &#xBC1C;&#xC0DD;&#xD558;&#xB294; &#xBBF8;&#xC2A4;&#xC0F7;&#xC740;?',a:['&#xD1B1;','&#xC0F9;&#xD06C;','&#xD6C5;','&#xC2AC;&#xB77C;&#xC774;&#xC2A4;'],c:1},
{q:'PGA &#xD22C;&#xC5B4;&#xC5D0;&#xC11C; &#xC0AC;&#xC6A9;&#xD558;&#xB294; &#xC131;&#xACFC; &#xBD84;&#xC11D; &#xC9C0;&#xD45C;&#xB294;?',a:['xG','WAR','Strokes Gained','ELO'],c:2},
{q:'&#xACE8;&#xD504;&#xACF5;&#xC758; &#xB51C;&#xD50C; &#xC218;&#xB294; &#xBCF4;&#xD1B5; &#xBA87; &#xAC1C;&#xC778;&#xAC00;&#xC694;?',a:['100~200&#xAC1C;','250~350&#xAC1C;','300~500&#xAC1C;','500~700&#xAC1C;'],c:2},
{q:'&#xBC14;&#xC6B4;&#xC2A4;(Bounce)&#xAC00; &#xB192;&#xC740; &#xC6E8;&#xC9C0;&#xAC00; &#xC801;&#xD569;&#xD55C; &#xC0C1;&#xD669;&#xC740;?',a:['&#xB538;&#xB531;&#xD55C; &#xB545;','&#xBD80;&#xB4DC;&#xB7EC;&#xC6B4; &#xBAA8;&#xB798;/&#xB7EC;&#xD504;','&#xADF8;&#xB9B0; &#xC704;','&#xBE44; &#xC62C; &#xB54C;'],c:1},
{q:'&#xACE8;&#xD504;&#xC5D0;&#xC11C; &ldquo;&#xCF58;&#xB3C4;&#xB974;&rdquo;&#xB294; &#xD30C; &#xB300;&#xBE44; &#xBA87; &#xD0C0; &#xC801;&#xC740; &#xC2A4;&#xCF54;&#xC5B4;&#xC778;&#xAC00;&#xC694;?',a:['2&#xD0C0;','3&#xD0C0;','4&#xD0C0;','5&#xD0C0;'],c:2},
{q:'&#xD504;&#xB9AC;&#xC0F7; &#xB8E8;&#xD2F4;&#xC5D0;&#xC11C; &#xAC00;&#xC7A5; &#xC911;&#xC694;&#xD55C; &#xC694;&#xC18C;&#xB294;?',a:['&#xD798;&#xC744; &#xCD5C;&#xB300;&#xD55C; &#xB0B4;&#xB294; &#xAC83;','&#xC77C;&#xAD00;&#xC131;(&#xBC18;&#xBCF5; &#xAC00;&#xB2A5;&#xD55C; &#xD328;&#xD134;)','&#xBE60;&#xB978; &#xC2A4;&#xC719;','&#xD074;&#xB7FD; &#xC120;&#xD0DD;'],c:1},
{q:'&#xC2AC;&#xB85C;&#xD504; &#xB808;&#xC774;&#xD305; 113&#xC740; &#xBB34;&#xC5C7;&#xC744; &#xC758;&#xBBF8;&#xD558;&#xB098;&#xC694;?',a:['&#xD45C;&#xC900; &#xB09C;&#xC774;&#xB3C4;','&#xC27D;&#xC6B4; &#xCF54;&#xC2A4;','&#xC5B4;&#xB824;&#xC6B4; &#xCF54;&#xC2A4;','&#xD3C9;&#xADE0; &#xD0C0;&#xC218;'],c:0},
{q:'&#xBC97;&#xADF8;&#xB798;&#xC2A4;&#xC640; &#xBC84;&#xBBA4;&#xB2E4;&#xADF8;&#xB798;&#xC2A4;&#xC758; &#xCC28;&#xC774;&#xC810;&#xC740;?',a:['&#xC0C9;&#xAE54;&#xB9CC; &#xB2E4;&#xB984;','&#xBC97;&#xD2B8;&#xB294; &#xC11C;&#xB298;/&#xBC84;&#xBBA4;&#xB2E4;&#xB294; &#xB354;&#xC6B4; &#xAE30;&#xD6C4; &#xC801;&#xD569;','&#xB458; &#xB2E4; &#xAC19;&#xC740; &#xAE30;&#xD6C4;&#xC5D0; &#xC790;&#xB78C;','&#xBC97;&#xD2B8;&#xAC00; &#xB354; &#xBE44;&#xC2F8;&#xB2E4;'],c:1},
{q:'&#xB4DC;&#xB85C;&#xC6B0;&#xC640; &#xD398;&#xC774;&#xB4DC;&#xC758; &#xADFC;&#xBCF8; &#xCC28;&#xC774;&#xC810;&#xC740;?',a:['&#xB450; &#xAD6C;&#xC9C8; &#xBAA8;&#xB450; &#xC9C1;&#xC9C4;&#xC774;&#xB2E4;','&#xB4DC;&#xB85C;&#xC6B0;&#xB294; &#xC67C;&#xCABD;/&#xD398;&#xC774;&#xB4DC;&#xB294; &#xC624;&#xB978;&#xCABD;&#xC73C;&#xB85C; &#xD718;&#xC5B4;&#xC9D0;','&#xB458; &#xB2E4; &#xC624;&#xB978;&#xCABD;&#xC73C;&#xB85C; &#xD718;&#xC5B4;&#xC9D0;','&#xCC28;&#xC774;&#xAC00; &#xC5C6;&#xB2E4;'],c:1},
{q:'&#xCF54;&#xC2A4; &#xB808;&#xC774;&#xD305;&#xC774; 72.0&#xC774;&#xB77C;&#xBA74; &#xBB34;&#xC5C7;&#xC744; &#xC758;&#xBBF8;&#xD558;&#xB098;&#xC694;?',a:['&#xD30C;72 &#xCF54;&#xC2A4;&#xC640; &#xB09C;&#xC774;&#xB3C4;&#xAC00; &#xAC19;&#xC74C;','&#xC2A4;&#xD06C;&#xB798;&#xCE58; &#xACE8;&#xD37C;&#xC758; &#xC608;&#xC0C1; &#xD0C0;&#xC218;','&#xCD1D; &#xD640; &#xC218;&#xAC00; 72','&#xACBD;&#xC0AC;&#xC758; &#xAC01;&#xB3C4;&#xAC00; 72&#xB3C4;'],c:1},
{q:'MOI(Moment of Inertia)&#xAC00; &#xB192;&#xC740; &#xD074;&#xB7FD;&#xD5E4;&#xB4DC;&#xC758; &#xC7A5;&#xC810;&#xC740;?',a:['&#xBB34;&#xAC8C;&#xAC00; &#xAC00;&#xBCBC;&#xC6C0;','&#xBBF8;&#xC2A4;&#xC0F7; &#xC2DC; &#xBE44;&#xD2C0;&#xB9BC;&#xC774; &#xC801;&#xC74C;','&#xACF5;&#xC774; &#xB354; &#xBA3C;&#xB9AC; &#xB0A0;&#xC544;&#xAC10;','&#xAC00;&#xACA9;&#xC774; &#xC800;&#xB834;&#xD568;'],c:1},
{q:'&#xACE8;&#xD504;&#xC5D0;&#xC11C; &ldquo;&#xC5D0;&#xC774;&#xC9C0; &#xC0F7;&rdquo;&#xC740; &#xBB34;&#xC5C7;&#xC778;&#xAC00;&#xC694;?',a:['&#xB098;&#xC774;&#xBCF4;&#xB2E4; &#xC801;&#xC740; &#xD0C0;&#xC218;&#xB85C; &#xB77C;&#xC6B4;&#xB4DC;','100&#xD0C0; &#xC774;&#xD558;&#xB85C; &#xCE58;&#xB294; &#xAC83;','&#xD640;&#xC778;&#xC6D0;&#xC744; &#xD558;&#xB294; &#xAC83;','&#xD30C;&#xB85C; &#xCE58;&#xB294; &#xAC83;'],c:0}
];
var v23QIdx=0,v23QScore=0,v23QAnswered={};

function v23OpenQuiz(){
  v23SFX('quiz_v8_open');
  v23QIdx=0;v23QScore=0;v23QAnswered={};
  var id='v23QuizOverlay';
  var existing=document.getElementById(id);
  if(existing){existing.classList.add('active');v23RenderQuiz();return;}
  var ov=document.createElement('div');
  ov.className='v23-overlay';ov.id=id;
  ov.innerHTML='<div class="v23-modal"><div class="v23-hdr"><h2><span class="v23i">&#x1F9E0;</span> Golf IQ v8</h2><button class="v23-x" onclick="document.getElementById(\'v23QuizOverlay\').classList.remove(\'active\')">&times;</button></div><div id="v23QuizContent"></div></div>';
  document.body.appendChild(ov);
  ov.addEventListener('click',function(e){if(e.target===ov)ov.classList.remove('active');});
  ov.classList.add('active');
  v23RenderQuiz();
}
window.v23OpenQuiz=v23OpenQuiz;

function v23RenderQuiz(){
  var el=document.getElementById('v23QuizContent');
  if(!el)return;
  if(v23QIdx>=v23QuizData.length){
    var pct=Math.round(v23QScore/v23QuizData.length*100);
    var grade=pct>=90?'S':pct>=80?'A':pct>=70?'B':pct>=60?'C':'D';
    var gradeColor={S:'#ffd700',A:'#c0c0c0',B:'#cd7f32',C:'#666',D:'#999'};
    localStorage.setItem('sg_iq_v8_score',String(pct));
    el.innerHTML='<div style="text-align:center;padding:30px"><div style="font-size:60px;font-weight:900;color:'+gradeColor[grade]+'">'+grade+'</div><div style="font-size:24px;font-weight:700;margin:10px 0">'+v23QScore+'/'+v23QuizData.length+' ('+pct+'%)</div><div style="font-size:14px;color:var(--text-muted);margin-bottom:20px">Golf IQ v8 &#xC644;&#xB8CC;!</div><button class="v23-btn v23-btn-primary" onclick="v23QIdx=0;v23QScore=0;v23QAnswered={};v23RenderQuiz();">&#xB2E4;&#xC2DC; &#xD480;&#xAE30;</button></div>';
    return;
  }
  var q=v23QuizData[v23QIdx];
  var h='<div style="margin-bottom:12px"><div class="v23-progress"><div class="v23-progress-fill" style="width:'+Math.round((v23QIdx/v23QuizData.length)*100)+'%;background:var(--primary)"></div></div><div style="display:flex;justify-content:space-between;font-size:12px;color:var(--text-muted)"><span>'+(v23QIdx+1)+'/'+v23QuizData.length+'</span><span>&#xC810;&#xC218;: '+v23QScore+'</span></div></div>';
  h+='<div class="v23-card"><h4 style="font-size:16px;line-height:1.5">Q'+(v23QIdx+1)+'. '+q.q+'</h4></div>';
  q.a.forEach(function(a,i){
    var answered=v23QAnswered[v23QIdx]!==undefined;
    var isCorrect=i===q.c;
    var isSelected=v23QAnswered[v23QIdx]===i;
    var style='';
    if(answered){
      if(isCorrect)style='border-color:#4caf50;background:#e8f5e9;';
      else if(isSelected)style='border-color:#f44336;background:#fce4ec;';
    }
    h+='<div class="v23-card" style="cursor:'+(answered?'default':'pointer')+';padding:14px;'+style+'" '+(answered?'':'onclick="v23AnswerQuiz('+i+')"')+'><span style="font-size:13px">'+(answered&&isCorrect?'&#x2705; ':answered&&isSelected?'&#x274C; ':'')+a+'</span></div>';
  });
  if(v23QAnswered[v23QIdx]!==undefined){
    h+='<div style="text-align:center;margin-top:12px"><button class="v23-btn v23-btn-primary" onclick="v23QIdx++;v23RenderQuiz();">'+(v23QIdx<v23QuizData.length-1?'&#xB2E4;&#xC74C; &#x2192;':'&#xACB0;&#xACFC; &#xBCF4;&#xAE30;')+'</button></div>';
  }
  el.innerHTML=h;
}
window.v23RenderQuiz=v23RenderQuiz;

function v23AnswerQuiz(i){
  if(v23QAnswered[v23QIdx]!==undefined)return;
  v23QAnswered[v23QIdx]=i;
  if(i===v23QuizData[v23QIdx].c){v23QScore++;v23SFX('quiz_v8_correct');}
  else{v23SFX('quiz_v8_wrong');}
  v23RenderQuiz();
}
window.v23AnswerQuiz=v23AnswerQuiz;

// ===== 9. ACHIEVEMENTS +12 (104->116) =====
var v23Achievements=[
  {id:'glossary_open',name:'&#xC6A9;&#xC5B4; &#xD0D0;&#xD5D8;&#xAC00;',desc:'&#xACE8;&#xD504; &#xC6A9;&#xC5B4; &#xC0AC;&#xC804; &#xCC98;&#xC74C; &#xC5F4;&#xAE30;',icon:'&#x1F4D6;'},
  {id:'glossary_all',name:'&#xC6A9;&#xC5B4; &#xB9C8;&#xC2A4;&#xD130;',desc:'150&#xAC1C; &#xC6A9;&#xC5B4; &#xC804;&#xCCB4; &#xD655;&#xC778;',icon:'&#x1F4DA;'},
  {id:'swing_start',name:'&#xC2A4;&#xC719; &#xCCB4;&#xCEE4;',desc:'&#xC2A4;&#xC719; &#xCCB4;&#xD06C;&#xD3EC;&#xC778;&#xD2B8; &#xCC98;&#xC74C; &#xC2DC;&#xC791;',icon:'&#x1F3CC;&#xFE0F;'},
  {id:'swing_master',name:'&#xC2A4;&#xC719; &#xB9C8;&#xC2A4;&#xD130;',desc:'6&#xB2E8;&#xACC4; &#xC804;&#xCCB4; &#xCCB4;&#xD06C; &#xC644;&#xB8CC;',icon:'&#x1F3C6;'},
  {id:'drill_5',name:'&#xC5F0;&#xC2B5;&#xBC8C;&#xB808;',desc:'&#xC5F0;&#xC2B5; &#xB4DC;&#xB9B4; 5&#xD68C; &#xC2DC;&#xC791;',icon:'&#x1F3CB;&#xFE0F;'},
  {id:'remind_first',name:'&#xACC4;&#xD68D;&#xC131; &#xACE8;&#xD37C;',desc:'&#xB77C;&#xC6B4;&#xB4DC; &#xB9AC;&#xB9C8;&#xC778;&#xB354; &#xCC98;&#xC74C; &#xB4F1;&#xB85D;',icon:'&#x23F0;'},
  {id:'trend_view',name:'&#xB370;&#xC774;&#xD130; &#xBD84;&#xC11D;&#xAC00;',desc:'&#xD37C;&#xD3EC;&#xBA3C;&#xC2A4; &#xD2B8;&#xB80C;&#xB4DC; &#xCC98;&#xC74C; &#xD655;&#xC778;',icon:'&#x1F4C8;'},
  {id:'quote_reader',name:'&#xBA85;&#xC5B8; &#xC560;&#xD638;&#xAC00;',desc:'&#xACE8;&#xD504; &#xBA85;&#xC5B8; &#xCC98;&#xC74C; &#xC5F4;&#xAE30;',icon:'&#x1F4AC;'},
  {id:'review_first',name:'&#xCF54;&#xC2A4; &#xD3C9;&#xB860;&#xAC00;',desc:'&#xCCAB; &#xBC88;&#xC9F8; &#xCF54;&#xC2A4; &#xB9AC;&#xBDF0; &#xC791;&#xC131;',icon:'&#x2B50;'},
  {id:'review_5',name:'&#xB9AC;&#xBDF0; &#xB2EC;&#xC778;',desc:'&#xCF54;&#xC2A4; &#xB9AC;&#xBDF0; 5&#xAC1C; &#xC791;&#xC131;',icon:'&#x1F4DD;'},
  {id:'iq_v8_90',name:'IQ v8 &#xCC9C;&#xC7AC;',desc:'Golf IQ v8&#xC5D0;&#xC11C; 90&#xC810; &#xC774;&#xC0C1;',icon:'&#x1F9E0;'},
  {id:'v23_explorer',name:'v23 &#xD0D0;&#xD5D8;&#xAC00;',desc:'v23 &#xC804;&#xCCB4; &#xAE30;&#xB2A5; &#xD55C; &#xBC88;&#xC529; &#xC5F4;&#xAE30;',icon:'&#x1F680;'}
];

var v23Unlocked=JSON.parse(localStorage.getItem('sg_v23_achievements')||'[]');

function v23UnlockAchievement(id){
  if(v23Unlocked.indexOf(id)>=0)return;
  v23Unlocked.push(id);
  localStorage.setItem('sg_v23_achievements',JSON.stringify(v23Unlocked));
  var ach=v23Achievements.find(function(a){return a.id===id;});
  if(ach){
    v23SFX('achievement_v23');
    v23Toast(ach.icon+' &#xC5C5;&#xC801; &#xD574;&#xAE08;: '+ach.name);
  }
}

function v23CheckAchievements(){
  if(localStorage.getItem('sg_glossary_opened'))v23UnlockAchievement('glossary_open');
  if(localStorage.getItem('sg_swing_mastered'))v23UnlockAchievement('swing_master');
  if(v23SwingChecked&&Object.keys(v23SwingChecked).length>0)v23UnlockAchievement('swing_start');
  if(v23DrillLog.length>=5)v23UnlockAchievement('drill_5');
  if(v23Reminders.length>=1)v23UnlockAchievement('remind_first');
  if(localStorage.getItem('sg_trend_opened'))v23UnlockAchievement('trend_view');
  if(localStorage.getItem('sg_quote_opened'))v23UnlockAchievement('quote_reader');
  var totalReviews=0;
  Object.keys(v23Reviews).forEach(function(k){totalReviews+=v23Reviews[k].length;});
  if(totalReviews>=1)v23UnlockAchievement('review_first');
  if(totalReviews>=5)v23UnlockAchievement('review_5');
  var iqScore=parseInt(localStorage.getItem('sg_iq_v8_score')||'0');
  if(iqScore>=90)v23UnlockAchievement('iq_v8_90');
  var feats=['sg_glossary_opened','sg_swing_checks','sg_drill_log','sg_reminders','sg_trend_opened','sg_quote_opened','sg_reviews','sg_iq_v8_score'];
  var allOpened=feats.every(function(f){return localStorage.getItem(f);});
  if(allOpened)v23UnlockAchievement('v23_explorer');
}

// Track opens
var origV23OpenGlossary=v23OpenGlossary;
v23OpenGlossary=function(){localStorage.setItem('sg_glossary_opened','1');origV23OpenGlossary();v23CheckAchievements();};
window.v23OpenGlossary=v23OpenGlossary;

var origV23OpenTrend=v23OpenTrend;
v23OpenTrend=function(){localStorage.setItem('sg_trend_opened','1');origV23OpenTrend();v23CheckAchievements();};
window.v23OpenTrend=v23OpenTrend;

var origV23OpenQuote=v23OpenQuote;
v23OpenQuote=function(){localStorage.setItem('sg_quote_opened','1');origV23OpenQuote();v23CheckAchievements();};
window.v23OpenQuote=v23OpenQuote;

// ===== 10. TOAST =====
function v23Toast(msg){
  var container=document.querySelector('.toast-container');
  if(!container){container=document.createElement('div');container.className='toast-container';document.body.appendChild(container);}
  var t=document.createElement('div');
  t.className='toast toast-success';
  t.innerHTML='<span>'+msg+'</span>';
  container.appendChild(t);
  setTimeout(function(){t.remove();},3500);
}

// ===== 11. KEYBOARD SHORTCUTS =====
document.addEventListener('keydown',function(e){
  var t=e.target.tagName;
  if(t==='INPUT'||t==='TEXTAREA'||t==='SELECT')return;
  if(!e.shiftKey)return;
  switch(e.key){
    case'G':v23OpenGlossary();e.preventDefault();break;
    case'K':v23OpenSwing();e.preventDefault();break;
    case'L':v23OpenDrills();e.preventDefault();break;
    case'E':v23OpenReminder();e.preventDefault();break;
    case'T':v23OpenTrend();e.preventDefault();break;
    case'Q':v23OpenQuote();e.preventDefault();break;
    case'R':v23OpenReview('');e.preventDefault();break;
    case'I':v23OpenQuiz();e.preventDefault();break;
  }
});

document.addEventListener('keydown',function(e){
  if(e.key==='Escape'){
    ['v23GlossaryOverlay','v23SwingOverlay','v23DrillOverlay','v23RemindOverlay','v23TrendOverlay','v23QuoteOverlay','v23ReviewOverlay','v23QuizOverlay'].forEach(function(id){
      var el=document.getElementById(id);
      if(el)el.classList.remove('active');
    });
  }
});

// ===== 12. INJECT BUTTONS =====
function injectV23Buttons(){
  var target=document.querySelector('.search-section')||document.querySelector('.header');
  if(!target)return;
  var bar=document.createElement('div');
  bar.style.cssText='display:flex;gap:6px;flex-wrap:wrap;margin:10px 0;padding:0 0 6px';
  var buttons=[
    {label:'&#x1F4D6; &#xC6A9;&#xC5B4;&#xC0AC;&#xC804;',fn:'v23OpenGlossary()'},
    {label:'&#x1F3CC;&#xFE0F; &#xC2A4;&#xC719;&#xCCB4;&#xD06C;',fn:'v23OpenSwing()'},
    {label:'&#x1F3CB;&#xFE0F; &#xC5F0;&#xC2B5;&#xB4DC;&#xB9B4;',fn:'v23OpenDrills()'},
    {label:'&#x23F0; &#xB9AC;&#xB9C8;&#xC778;&#xB354;',fn:'v23OpenReminder()'},
    {label:'&#x1F4C8; &#xD2B8;&#xB80C;&#xB4DC;',fn:'v23OpenTrend()'},
    {label:'&#x1F4AC; &#xBA85;&#xC5B8;',fn:'v23OpenQuote()'},
    {label:'&#x2B50; &#xCF54;&#xC2A4;&#xB9AC;&#xBDF0;',fn:'v23OpenReview(\'\')'},
    {label:'&#x1F9E0; IQ v8',fn:'v23OpenQuiz()'}
  ];
  buttons.forEach(function(b){
    var btn=document.createElement('button');
    btn.className='v23-btn v23-btn-sm v23-btn-secondary';
    btn.innerHTML=b.label;
    btn.setAttribute('onclick',b.fn);
    bar.appendChild(btn);
  });
  target.parentNode.insertBefore(bar,target.nextSibling);
}

// ===== 13. INIT =====
setTimeout(function(){
  injectV23Buttons();
  v23CheckAchievements();
},1400);

})();
