(function(){
'use strict';

// === SmartGolf v11.0 Patch ===
// 1. 스트로크 게인드 분석기 (Strokes Gained Off-the-Tee/Approach/Short/Putting)
// 2. 코스 홀 레이아웃 SVG 9홀 (페어웨이/벙커/워터/그린 시각화)
// 3. 그립 가이드 6종 (SVG 시각화 + 장단점 + 추천)
// 4. 연습 드릴 라이브러리 12종 (카테고리별 + 진행률 추적)
// 5. 스코어 예측 AI (날씨/난이도/컨디션 기반)
// 6. 친구 매칭 시스템 (프로필+초대+매칭 요청)
// 7. 장비 비교 도구 (드라이버/아이언/퍼터 2개 비교)
// 8. 골프 히스토리 타임라인 20항목 (한국+세계)
// 9. 라운드 리포트 (통계 종합 리포트 Canvas)
// 10. 앰비언트 사운드 (코스 자연소리 Web Audio)
// + SFX 6종 + 키보드 단축키 5종

// --- CSS Injection ---
var css11 = document.createElement('style');
css11.textContent = `
.v11-overlay{position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,.76);z-index:10015;display:none;align-items:center;justify-content:center;backdrop-filter:blur(8px)}
.v11-overlay.active{display:flex}
.v11-modal{background:var(--card-bg,#fff);border-radius:24px;padding:28px;width:95%;max-width:680px;max-height:92vh;overflow-y:auto;box-shadow:0 32px 100px rgba(0,0,0,.5);animation:v11Rise .45s cubic-bezier(.22,1,.36,1)}
@keyframes v11Rise{from{opacity:0;transform:translateY(50px) scale(.93)}to{opacity:1;transform:translateY(0) scale(1)}}
.v11-hdr{display:flex;justify-content:space-between;align-items:center;margin-bottom:20px}
.v11-hdr h2{font-size:21px;font-weight:800;display:flex;align-items:center;gap:10px}
.v11-hdr h2 .v11i{font-size:26px}
.v11-x{background:none;border:none;font-size:26px;cursor:pointer;color:var(--text-muted);padding:4px 10px;border-radius:10px;transition:.2s}
.v11-x:hover{background:var(--border);color:var(--text)}
.v11-tabs{display:flex;gap:6px;margin-bottom:18px;overflow-x:auto;padding-bottom:4px;scrollbar-width:none}
.v11-tabs::-webkit-scrollbar{display:none}
.v11-tab{padding:9px 18px;border-radius:24px;border:1.5px solid var(--border);background:var(--bg);font-size:12px;font-weight:700;cursor:pointer;white-space:nowrap;transition:.25s}
.v11-tab.active{background:var(--primary);color:#fff;border-color:var(--primary);box-shadow:0 3px 12px rgba(26,122,58,.35)}
.v11-card{background:var(--bg);border-radius:16px;padding:18px;margin-bottom:12px;transition:.25s;border:1.5px solid transparent}
.v11-card:hover{border-color:var(--primary);transform:translateY(-2px);box-shadow:0 4px 16px rgba(26,122,58,.12)}
.v11-card h4{font-size:15px;font-weight:700;margin-bottom:8px;display:flex;align-items:center;gap:8px}
.v11-card p{font-size:12px;color:var(--text-muted);line-height:1.6}
.v11-btn{padding:11px 22px;border:none;border-radius:14px;font-size:13px;font-weight:700;cursor:pointer;transition:.25s;display:inline-flex;align-items:center;gap:6px}
.v11-btn-primary{background:linear-gradient(135deg,var(--primary),#34a853);color:#fff}
.v11-btn-primary:hover{transform:translateY(-2px);box-shadow:0 8px 20px rgba(26,122,58,.4)}
.v11-btn-sm{padding:7px 14px;font-size:11px;border-radius:10px}
.v11-btn-secondary{background:var(--bg);color:var(--text);border:1.5px solid var(--border)}
.v11-btn-secondary:hover{border-color:var(--primary);color:var(--primary)}
.v11-input{width:100%;padding:11px 16px;border:2px solid var(--border);border-radius:12px;font-size:13px;background:var(--bg);color:var(--text);transition:.2s}
.v11-input:focus{border-color:var(--primary);outline:none;box-shadow:0 0 0 3px rgba(26,122,58,.1)}
.v11-select{width:100%;padding:11px 16px;border:2px solid var(--border);border-radius:12px;font-size:13px;background:var(--bg);color:var(--text);cursor:pointer}
.v11-label{display:block;font-size:12px;font-weight:700;color:var(--text-muted);margin-bottom:6px;text-transform:uppercase;letter-spacing:.5px}
.v11-grid2{display:grid;grid-template-columns:1fr 1fr;gap:12px}
.v11-grid3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px}
.v11-grid4{display:grid;grid-template-columns:repeat(4,1fr);gap:10px}
@media(max-width:500px){.v11-grid2,.v11-grid3,.v11-grid4{grid-template-columns:1fr}}
.v11-divider{height:1px;background:var(--border);margin:18px 0}
.v11-badge{display:inline-block;padding:4px 12px;border-radius:14px;font-size:11px;font-weight:700}
.v11-badge-green{background:#e8f5e9;color:#2e7d32}
.v11-badge-blue{background:#e3f2fd;color:#1565c0}
.v11-badge-orange{background:#fff3e0;color:#e65100}
.v11-badge-red{background:#fce4ec;color:#c62828}
.v11-badge-purple{background:#f3e5f5;color:#7b1fa2}
.v11-badge-gold{background:linear-gradient(135deg,#fff8e1,#ffe082);color:#5a3e00}
[data-theme="dark"] .v11-badge-green{background:#1a3a25;color:#7bed9f}
[data-theme="dark"] .v11-badge-blue{background:#1a2a3a;color:#7ab8f5}
[data-theme="dark"] .v11-badge-orange{background:#3a2a1a;color:#f0c070}
[data-theme="dark"] .v11-badge-red{background:#3a1a1a;color:#f08080}
[data-theme="dark"] .v11-badge-purple{background:#2a1a3a;color:#ce93d8}
[data-theme="dark"] .v11-badge-gold{background:#3a3000;color:#ffd54f}
.v11-progress{width:100%;height:14px;background:var(--border);border-radius:7px;overflow:hidden;margin:10px 0}
.v11-progress-fill{height:100%;border-radius:7px;transition:width .6s ease}
.v11-stat{background:var(--bg);border-radius:14px;padding:14px;text-align:center}
.v11-stat .v11-sv{font-size:1.5em;font-weight:800;color:var(--primary)}
.v11-stat .v11-sl{font-size:0.7em;color:var(--text-muted);margin-top:4px}
.v11-sg-bar{display:flex;align-items:center;gap:10px;margin:8px 0}
.v11-sg-label{font-size:12px;font-weight:600;width:100px;flex-shrink:0}
.v11-sg-track{flex:1;height:20px;background:var(--border);border-radius:10px;position:relative;overflow:hidden}
.v11-sg-fill{height:100%;border-radius:10px;transition:width .8s ease}
.v11-sg-val{font-size:12px;font-weight:800;width:60px;text-align:right}
.v11-hole-svg{width:100%;max-width:280px;margin:0 auto;display:block}
.v11-grip-svg{width:140px;height:200px;margin:0 auto 10px;display:block}
.v11-drill{background:var(--bg);border-radius:16px;padding:16px;margin-bottom:10px;border-left:4px solid var(--primary);transition:.2s;cursor:pointer}
.v11-drill:hover{transform:translateX(4px);box-shadow:0 2px 12px rgba(0,0,0,.08)}
.v11-drill h5{font-size:14px;font-weight:700;margin-bottom:4px;display:flex;align-items:center;gap:6px}
.v11-drill .v11-dd{font-size:12px;color:var(--text-muted);line-height:1.6}
.v11-drill .v11-dm{display:flex;gap:8px;margin-top:8px;flex-wrap:wrap}
.v11-timeline{position:relative;padding-left:30px}
.v11-timeline::before{content:'';position:absolute;left:12px;top:0;bottom:0;width:3px;background:linear-gradient(180deg,var(--primary),#7bed9f);border-radius:2px}
.v11-tl-item{position:relative;margin-bottom:20px;padding-left:20px}
.v11-tl-item::before{content:'';position:absolute;left:-24px;top:4px;width:14px;height:14px;border-radius:50%;background:var(--primary);border:3px solid var(--card-bg);z-index:1}
.v11-tl-year{font-size:13px;font-weight:800;color:var(--primary);margin-bottom:2px}
.v11-tl-desc{font-size:12px;color:var(--text-muted);line-height:1.5}
.v11-compare-table{width:100%;border-collapse:collapse;font-size:12px;margin:12px 0}
.v11-compare-table th{background:var(--primary);color:#fff;padding:10px 12px;text-align:left;font-weight:700;font-size:11px}
.v11-compare-table td{padding:10px 12px;border-bottom:1px solid var(--border)}
.v11-compare-table tr:nth-child(even){background:var(--bg)}
.v11-compare-table .v11-win{color:var(--primary);font-weight:700}
.v11-friend-card{background:var(--bg);border-radius:14px;padding:14px;margin-bottom:10px;display:flex;align-items:center;gap:12px}
.v11-friend-avatar{width:44px;height:44px;border-radius:50%;background:linear-gradient(135deg,var(--primary),#7bed9f);display:flex;align-items:center;justify-content:center;font-size:18px;color:#fff;font-weight:700;flex-shrink:0}
.v11-friend-info{flex:1}
.v11-friend-info h5{font-size:13px;font-weight:700;margin-bottom:2px}
.v11-friend-info p{font-size:11px;color:var(--text-muted)}
.v11-ambient-btn{padding:10px 18px;border-radius:14px;border:2px solid var(--border);background:var(--bg);font-size:12px;font-weight:700;cursor:pointer;transition:.25s;display:flex;align-items:center;gap:8px}
.v11-ambient-btn.playing{border-color:var(--primary);background:var(--primary-light)}
.v11-ambient-btn.playing::after{content:'';width:8px;height:8px;border-radius:50%;background:var(--primary);animation:v11pulse 1s infinite}
@keyframes v11pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.5;transform:scale(.8)}}
.v11-report-preview{background:linear-gradient(135deg,#1a7a3a,#0d4a22);border-radius:20px;padding:24px;color:#fff;margin:16px 0}
.v11-report-preview h3{font-size:18px;font-weight:800;margin-bottom:12px;text-align:center}
.v11-report-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:10px}
.v11-report-item{background:rgba(255,255,255,.12);border-radius:14px;padding:12px;text-align:center}
.v11-report-item .v11-rv{font-size:20px;font-weight:800}
.v11-report-item .v11-rl{font-size:10px;opacity:.8;margin-top:3px}
.v11-toast{position:fixed;bottom:80px;left:50%;transform:translateX(-50%) translateY(100px);background:var(--toast-bg,#333);color:#fff;padding:12px 24px;border-radius:14px;font-size:13px;font-weight:600;z-index:10020;opacity:0;transition:.4s cubic-bezier(.34,1.56,.64,1);pointer-events:none;display:flex;align-items:center;gap:8px;max-width:90%;box-shadow:0 8px 30px rgba(0,0,0,.3)}
.v11-toast.show{opacity:1;transform:translateX(-50%) translateY(0)}
`;
document.head.appendChild(css11);

// --- SFX Engine ---
var v11Ctx = null;
function v11sfx(type){
  try {
    if(!v11Ctx) v11Ctx = new (window.AudioContext||window.webkitAudioContext)();
    var o = v11Ctx.createOscillator();
    var g = v11Ctx.createGain();
    o.connect(g); g.connect(v11Ctx.destination);
    var t = v11Ctx.currentTime;
    switch(type){
      case 'analyze':
        o.type='sine'; o.frequency.setValueAtTime(523,t);
        o.frequency.linearRampToValueAtTime(784,t+.15);
        g.gain.setValueAtTime(.12,t); g.gain.exponentialRampToValueAtTime(.001,t+.4);
        o.start(t); o.stop(t+.4); break;
      case 'drill':
        o.type='triangle'; o.frequency.setValueAtTime(440,t);
        o.frequency.linearRampToValueAtTime(660,t+.1);
        g.gain.setValueAtTime(.1,t); g.gain.exponentialRampToValueAtTime(.001,t+.25);
        o.start(t); o.stop(t+.25); break;
      case 'predict':
        o.type='sine'; o.frequency.setValueAtTime(392,t);
        o.frequency.linearRampToValueAtTime(523,t+.1);
        o.frequency.linearRampToValueAtTime(659,t+.2);
        g.gain.setValueAtTime(.1,t); g.gain.exponentialRampToValueAtTime(.001,t+.5);
        o.start(t); o.stop(t+.5); break;
      case 'friend':
        o.type='sine'; o.frequency.setValueAtTime(659,t);
        g.gain.setValueAtTime(.08,t); g.gain.exponentialRampToValueAtTime(.001,t+.2);
        o.start(t); o.stop(t+.2);
        var o2=v11Ctx.createOscillator(),g2=v11Ctx.createGain();
        o2.connect(g2); g2.connect(v11Ctx.destination);
        o2.type='sine'; o2.frequency.setValueAtTime(880,t+.15);
        g2.gain.setValueAtTime(.08,t+.15); g2.gain.exponentialRampToValueAtTime(.001,t+.35);
        o2.start(t+.15); o2.stop(t+.35); break;
      case 'compare':
        o.type='square'; o.frequency.setValueAtTime(330,t);
        g.gain.setValueAtTime(.06,t); g.gain.exponentialRampToValueAtTime(.001,t+.15);
        o.start(t); o.stop(t+.15); break;
      case 'ambient_toggle':
        o.type='sine'; o.frequency.setValueAtTime(261,t);
        o.frequency.linearRampToValueAtTime(392,t+.3);
        g.gain.setValueAtTime(.06,t); g.gain.exponentialRampToValueAtTime(.001,t+.5);
        o.start(t); o.stop(t+.5); break;
    }
  } catch(e){}
}

// --- Toast ---
var v11ToastEl = null;
var v11ToastTimer = null;
function v11toast(msg, icon){
  if(!v11ToastEl){
    v11ToastEl = document.createElement('div');
    v11ToastEl.className = 'v11-toast';
    document.body.appendChild(v11ToastEl);
  }
  v11ToastEl.innerHTML = (icon||'') + ' ' + msg;
  v11ToastEl.classList.add('show');
  clearTimeout(v11ToastTimer);
  v11ToastTimer = setTimeout(function(){ v11ToastEl.classList.remove('show'); }, 2800);
}

// --- Storage helpers ---
function v11get(k,d){ try{ var v=localStorage.getItem('sg11_'+k); return v?JSON.parse(v):d; }catch(e){return d;} }
function v11set(k,v){ try{ localStorage.setItem('sg11_'+k,JSON.stringify(v)); }catch(e){} }

// ============================================================
// 1. STROKES GAINED ANALYZER
// ============================================================
var sgAnalysisData = v11get('sg_analysis', {
  rounds: [],
  avgDriving: 0, avgApproach: 0, avgShortGame: 0, avgPutting: 0
});

var SG_BENCHMARKS = {
  scratch: { driving: 0, approach: 0, shortGame: 0, putting: 0 },
  bogey: { driving: -1.5, approach: -2.0, shortGame: -1.5, putting: -1.0 },
  avg20: { driving: -0.8, approach: -1.2, shortGame: -0.8, putting: -0.5 }
};

function calcStrokesGained(round){
  var sg = {};
  sg.driving = (round.fairwaysHit / Math.max(round.fairways,1)) * 2 - 1 + (round.avgDrive - 230) / 50;
  sg.approach = (round.greensHit / Math.max(round.greens,1)) * 2.5 - 1.25;
  sg.shortGame = (round.upAndDowns / Math.max(round.upAndDownAttempts,1)) * 2 - 0.8;
  sg.putting = (36 - round.totalPutts) / 6;
  sg.total = sg.driving + sg.approach + sg.shortGame + sg.putting;
  return sg;
}

function renderSGAnalysis(){
  var ov = document.getElementById('v11SGOverlay');
  if(!ov) return;
  var data = sgAnalysisData;
  var roundCount = data.rounds.length;

  var avgSG = { driving:0, approach:0, shortGame:0, putting:0, total:0 };
  if(roundCount > 0){
    data.rounds.forEach(function(r){
      var sg = calcStrokesGained(r);
      avgSG.driving += sg.driving;
      avgSG.approach += sg.approach;
      avgSG.shortGame += sg.shortGame;
      avgSG.putting += sg.putting;
      avgSG.total += sg.total;
    });
    avgSG.driving /= roundCount;
    avgSG.approach /= roundCount;
    avgSG.shortGame /= roundCount;
    avgSG.putting /= roundCount;
    avgSG.total /= roundCount;
  }

  function sgBar(label, val, color){
    var pct = Math.min(100, Math.max(0, (val + 3) / 6 * 100));
    var cls = val >= 0 ? 'v11-badge-green' : (val > -1 ? 'v11-badge-orange' : 'v11-badge-red');
    return '<div class="v11-sg-bar"><span class="v11-sg-label">' + label + '</span>' +
      '<div class="v11-sg-track"><div class="v11-sg-fill" style="width:' + pct + '%;background:' + color + '"></div></div>' +
      '<span class="v11-sg-val"><span class="v11-badge ' + cls + '">' + (val >= 0 ? '+' : '') + val.toFixed(2) + '</span></span></div>';
  }

  var html = '<div class="v11-hdr"><h2><span class="v11i">&#x1F4CA;</span> &#49828;&#53944;&#47196;&#53356; &#44172;&#51064;&#46300; &#48516;&#49437;</h2><button class="v11-x" onclick="document.getElementById(\'v11SGOverlay\').classList.remove(\'active\')">&times;</button></div>';

  if(roundCount === 0){
    html += '<div class="v11-card"><h4>&#x1F4DD; &#46972;&#50868;&#46300; &#45936;&#51060;&#53552; &#51077;&#47141;</h4><p>&#49828;&#53944;&#47196;&#53356; &#44172;&#51064;&#46300; &#48516;&#49437;&#51012; &#50948;&#54644; &#46972;&#50868;&#46300; &#45936;&#51060;&#53552;&#47484; &#51077;&#47141;&#54644;&#51452;&#49464;&#50836;.</p></div>';
  } else {
    html += '<div class="v11-grid4" style="margin-bottom:16px">';
    html += '<div class="v11-stat"><div class="v11-sv">' + avgSG.total.toFixed(1) + '</div><div class="v11-sl">&#52509;&#54633; SG</div></div>';
    html += '<div class="v11-stat"><div class="v11-sv">' + roundCount + '</div><div class="v11-sl">&#46972;&#50868;&#46300;</div></div>';
    html += '<div class="v11-stat"><div class="v11-sv">' + (avgSG.driving >= 0 ? '&#x2B06;' : '&#x2B07;') + '</div><div class="v11-sl">&#46300;&#46972;&#51060;&#48729;</div></div>';
    html += '<div class="v11-stat"><div class="v11-sv">' + (avgSG.putting >= 0 ? '&#x2B06;' : '&#x2B07;') + '</div><div class="v11-sl">&#54140;&#54021;</div></div>';
    html += '</div>';

    html += sgBar('Off the Tee', avgSG.driving, '#4caf50');
    html += sgBar('Approach', avgSG.approach, '#2196f3');
    html += sgBar('Short Game', avgSG.shortGame, '#ff9800');
    html += sgBar('Putting', avgSG.putting, '#9c27b0');
    html += '<div class="v11-divider"></div>';

    var weakest = 'driving', weakVal = avgSG.driving;
    if(avgSG.approach < weakVal){ weakest='approach'; weakVal=avgSG.approach; }
    if(avgSG.shortGame < weakVal){ weakest='shortGame'; weakVal=avgSG.shortGame; }
    if(avgSG.putting < weakVal){ weakest='putting'; weakVal=avgSG.putting; }
    var tips = {
      driving: '&#x1F3CC; &#46300;&#46972;&#51060;&#48729; &#50672;&#49845;: &#54168;&#51060;&#50612;&#50920;&#51060; &#51201;&#51473;&#47456;&#51012; &#45458;&#51060;&#44256; &#48708;&#44144;&#47532;&#47484; &#45720;&#47532;&#49464;&#50836;. &#53552;&#54532; &#50948; &#53440;&#51216; &#51068;&#44288;&#49457;&#51012; &#50672;&#49845;&#54616;&#49464;&#50836;.',
      approach: '&#x26F3; &#50612;&#54532;&#47196;&#52824; &#50672;&#49845;: &#44536;&#47536; &#51201;&#51473;&#47456;&#51012; &#45458;&#51060;&#44592; &#50948;&#54644; &#44144;&#47532;&#48324; &#53364;&#47101; &#49440;&#53469;&#51012; &#51221;&#54869;&#55176; &#54616;&#49464;&#50836;.',
      shortGame: '&#x1F3AF; &#49660;&#53944;&#44172;&#51076; &#50672;&#49845;: &#50629;&#50532;&#45796;&#50868; &#49457;&#44277;&#47456;&#51012; &#45458;&#51060;&#49464;&#50836;. &#52841;/&#54588;&#52824; &#50672;&#49845;&#50640; &#51665;&#51473;&#54616;&#49464;&#50836;.',
      putting: '&#x1F3B3; &#54140;&#54021; &#50672;&#49845;: 1.5m &#51060;&#45236; &#49660;&#53944;&#54140;&#53944; &#49457;&#44277;&#47456;&#51012; &#45458;&#51060;&#49464;&#50836;. &#46972;&#51064; &#51069;&#44592;&#50640; &#51665;&#51473;&#54616;&#49464;&#50836;.'
    };
    html += '<div class="v11-card"><h4>&#x1F4A1; &#44060;&#49440; &#54252;&#51064;&#53944;</h4><p>' + tips[weakest] + '</p></div>';
  }

  html += '<div class="v11-divider"></div>';
  html += '<h4 style="font-size:14px;font-weight:700;margin-bottom:12px">&#x2795; &#46972;&#50868;&#46300; &#45936;&#51060;&#53552; &#52628;&#44032;</h4>';
  html += '<div class="v11-grid2">';
  html += '<div><label class="v11-label">&#54168;&#50612;&#50920;&#51060; &#51201;&#51473;</label><input type="number" id="v11FwHit" class="v11-input" placeholder="8" min="0" max="14"></div>';
  html += '<div><label class="v11-label">&#54168;&#50612;&#50920;&#51060; &#52509;</label><input type="number" id="v11FwTotal" class="v11-input" placeholder="14" min="1" max="14"></div>';
  html += '<div><label class="v11-label">GIR &#51201;&#51473;</label><input type="number" id="v11GirHit" class="v11-input" placeholder="8" min="0" max="18"></div>';
  html += '<div><label class="v11-label">GIR &#52509;</label><input type="number" id="v11GirTotal" class="v11-input" placeholder="18" min="1" max="18"></div>';
  html += '<div><label class="v11-label">&#50629;&#50532;&#45796;&#50868; &#49457;&#44277;</label><input type="number" id="v11UdHit" class="v11-input" placeholder="4" min="0" max="18"></div>';
  html += '<div><label class="v11-label">&#50629;&#50532;&#45796;&#50868; &#49884;&#46020;</label><input type="number" id="v11UdTotal" class="v11-input" placeholder="8" min="0" max="18"></div>';
  html += '<div><label class="v11-label">&#52509; &#54140;&#53944; &#49688;</label><input type="number" id="v11Putts" class="v11-input" placeholder="32" min="18" max="54"></div>';
  html += '<div><label class="v11-label">&#54217;&#44512; &#46300;&#46972;&#51060;&#48652;(m)</label><input type="number" id="v11AvgDrive" class="v11-input" placeholder="220" min="100" max="350"></div>';
  html += '</div>';
  html += '<button class="v11-btn v11-btn-primary" style="width:100%;margin-top:14px;justify-content:center" onclick="v11AddSGRound()">&#x1F4CA; &#48516;&#49437; &#52628;&#44032;</button>';

  document.getElementById('v11SGModal').innerHTML = html;
  ov.classList.add('active');
  v11sfx('analyze');
}

window.v11AddSGRound = function(){
  var round = {
    fairwaysHit: parseInt(document.getElementById('v11FwHit').value)||0,
    fairways: parseInt(document.getElementById('v11FwTotal').value)||14,
    greensHit: parseInt(document.getElementById('v11GirHit').value)||0,
    greens: parseInt(document.getElementById('v11GirTotal').value)||18,
    upAndDowns: parseInt(document.getElementById('v11UdHit').value)||0,
    upAndDownAttempts: parseInt(document.getElementById('v11UdTotal').value)||1,
    totalPutts: parseInt(document.getElementById('v11Putts').value)||36,
    avgDrive: parseInt(document.getElementById('v11AvgDrive').value)||220,
    date: new Date().toISOString().slice(0,10)
  };
  sgAnalysisData.rounds.push(round);
  if(sgAnalysisData.rounds.length > 50) sgAnalysisData.rounds = sgAnalysisData.rounds.slice(-50);
  v11set('sg_analysis', sgAnalysisData);
  v11toast('&#x1F4CA; &#46972;&#50868;&#46300; &#45936;&#51060;&#53552;&#44032; &#52628;&#44032;&#46104;&#50632;&#49845;&#45768;&#45796;!', '&#x2705;');
  renderSGAnalysis();
  v11checkAchievements();
};

// ============================================================
// 2. COURSE HOLE LAYOUT SVG (9 holes)
// ============================================================
var holeLayouts = [
  { par:4, yards:380, name:'1&#48264; &#54848;', desc:'&#50724;&#47480;&#51901; &#46020;&#44536;&#47112;&#44536;, &#50812;&#51901; &#48268;&#52964;', fairway:'M60,280 Q80,200 90,140 Q95,100 100,60', green:'85,45', bunkers:[[65,50],[115,55]], water:null },
  { par:3, yards:165, name:'2&#48264; &#54848;', desc:'&#50500;&#51068;&#47004;&#46300; &#44536;&#47536;, &#51204;&#47732; &#50892;&#53552;', fairway:'M90,280 L90,100', green:'90,55', bunkers:[[70,60],[110,50]], water:{x:50,y:80,w:80,h:25} },
  { par:5, yards:530, name:'3&#48264; &#54848;', desc:'&#44596; &#54028;5, &#50812;&#51901;&#51004;&#47196; &#44396;&#48512;&#47084;&#51652; &#54168;&#50612;&#50920;&#51060;', fairway:'M70,280 Q60,220 55,160 Q60,120 80,80 Q90,60 95,40', green:'95,30', bunkers:[[75,35],[115,40]], water:null },
  { par:4, yards:410, name:'4&#48264; &#54848;', desc:'&#51649;&#49440; &#54028;4, &#50577;&#51901; &#48268;&#52964;', fairway:'M90,280 Q88,180 90,100 L90,60', green:'90,45', bunkers:[[65,50],[115,50],[70,130]], water:null },
  { par:3, yards:195, name:'5&#48264; &#54848;', desc:'&#44596; &#54028;3, &#46263;&#44536;&#47536; &#48268;&#52964;', fairway:'M90,280 L90,90', green:'90,55', bunkers:[[110,60],[75,70]], water:{x:30,y:90,w:40,h:60} },
  { par:4, yards:365, name:'6&#48264; &#54848;', desc:'&#50812;&#51901; &#46020;&#44536;&#47112;&#44536;, &#44536;&#47536; &#50526; &#50892;&#53552;', fairway:'M110,280 Q90,200 75,140 Q65,100 70,60', green:'70,40', bunkers:[[55,45],[90,50]], water:{x:55,y:55,w:35,h:15} },
  { par:5, yards:510, name:'7&#48264; &#54848;', desc:'S&#51088; &#54028;5, &#51204;&#47029;&#51201; &#53552;&#49399; &#54596;&#50836;', fairway:'M70,280 Q80,230 100,180 Q110,140 90,100 Q80,70 85,40', green:'85,30', bunkers:[[70,35],[105,35],[120,140]], water:null },
  { par:4, yards:395, name:'8&#48264; &#54848;', desc:'&#50724;&#47480;&#51901; &#46020;&#44536;&#47112;&#44536;, &#46356;&#54168;&#49828; &#54596;&#50836;', fairway:'M70,280 Q80,200 95,140 Q105,100 110,60', green:'110,42', bunkers:[[95,45],[125,50]], water:{x:60,y:120,w:30,h:40} },
  { par:4, yards:420, name:'9&#48264; &#54848;', desc:'&#47560;&#51648;&#47561; &#54028;4, &#44536;&#47536; &#50577;&#51901; &#48268;&#52964;+&#50892;&#53552;', fairway:'M90,280 Q85,200 88,140 Q90,100 90,60', green:'90,42', bunkers:[[65,45],[115,45]], water:{x:110,y:80,w:30,h:50} }
];

function renderHoleSVG(hole){
  var svg = '<svg viewBox="0 0 180 320" class="v11-hole-svg" xmlns="http://www.w3.org/2000/svg">';
  svg += '<rect width="180" height="320" fill="#2d5a27" rx="12"/>';
  svg += '<path d="' + hole.fairway + '" stroke="#5cb85c" stroke-width="30" fill="none" stroke-linecap="round"/>';
  svg += '<path d="' + hole.fairway + '" stroke="#7ed07e" stroke-width="22" fill="none" stroke-linecap="round"/>';
  if(hole.water){
    svg += '<rect x="' + hole.water.x + '" y="' + hole.water.y + '" width="' + hole.water.w + '" height="' + hole.water.h + '" fill="#4fc3f7" rx="8" opacity=".7"/>';
  }
  hole.bunkers.forEach(function(b){
    svg += '<ellipse cx="' + b[0] + '" cy="' + b[1] + '" rx="10" ry="7" fill="#f4d03f" opacity=".8"/>';
  });
  var gp = hole.green.split(',');
  svg += '<ellipse cx="' + gp[0] + '" cy="' + gp[1] + '" rx="16" ry="12" fill="#27ae60"/>';
  svg += '<circle cx="' + gp[0] + '" cy="' + (parseInt(gp[1])-2) + '" r="2" fill="#fff"/>';
  svg += '<line x1="' + gp[0] + '" y1="' + (parseInt(gp[1])-2) + '" x2="' + gp[0] + '" y2="' + (parseInt(gp[1])-10) + '" stroke="#fff" stroke-width="1"/>';
  svg += '<rect x="' + gp[0] + '" y="' + (parseInt(gp[1])-10) + '" width="8" height="5" fill="#e74c3c" rx="1"/>';
  svg += '<rect x="75" y="270" width="30" height="12" fill="#8b6914" rx="3"/>';
  svg += '</svg>';
  return svg;
}

function renderHoleLayouts(){
  var ov = document.getElementById('v11HoleOverlay');
  if(!ov) return;
  var currentHole = 0;

  function render(){
    var hole = holeLayouts[currentHole];
    var html = '<div class="v11-hdr"><h2><span class="v11i">&#x1F3CC;</span> &#53076;&#49828; &#54848; &#47112;&#51060;&#50500;&#50883;</h2><button class="v11-x" onclick="document.getElementById(\'v11HoleOverlay\').classList.remove(\'active\')">&times;</button></div>';
    html += '<div class="v11-tabs">';
    for(var i=0;i<9;i++){
      html += '<button class="v11-tab' + (i===currentHole?' active':'') + '" onclick="v11ShowHole('+i+')">' + (i+1) + '&#48264;</button>';
    }
    html += '</div>';
    html += '<div style="text-align:center;margin-bottom:16px">';
    html += '<h3 style="font-size:18px;font-weight:800;margin-bottom:4px">' + hole.name + '</h3>';
    html += '<div style="display:flex;gap:10px;justify-content:center;margin-bottom:10px">';
    html += '<span class="v11-badge v11-badge-green">Par ' + hole.par + '</span>';
    html += '<span class="v11-badge v11-badge-blue">' + hole.yards + ' yards</span>';
    html += '</div>';
    html += '<p style="font-size:12px;color:var(--text-muted)">' + hole.desc + '</p>';
    html += '</div>';
    html += renderHoleSVG(hole);
    html += '<div class="v11-divider"></div>';
    html += '<div class="v11-grid3">';
    html += '<div class="v11-stat"><div class="v11-sv" style="font-size:20px">&#x1F7E2;</div><div class="v11-sl">&#54168;&#50612;&#50920;&#51060;</div></div>';
    html += '<div class="v11-stat"><div class="v11-sv" style="font-size:20px">&#x1F7E1;</div><div class="v11-sl">&#48268;&#52964;</div></div>';
    html += '<div class="v11-stat"><div class="v11-sv" style="font-size:20px">&#x1F535;</div><div class="v11-sl">&#50892;&#53552;</div></div>';
    html += '</div>';
    html += '<div class="v11-card" style="margin-top:14px"><h4>&#x1F3AF; &#44277;&#47029; &#54021;</h4><p>';
    if(hole.par === 3) html += '&#53552;&#49399;&#51012; &#44536;&#47536; &#51473;&#50521;&#50640; &#47785;&#54364;&#54616;&#49464;&#50836;. &#48268;&#52964;&#47484; &#54588;&#54644; &#50504;&#51204;&#54620; &#51901;&#51012; &#45432;&#47532;&#49464;&#50836;.';
    else if(hole.par === 5) html += '2&#48264;&#50640; &#44397;&#51060; &#50500;&#45768;&#46972; 3&#48264;&#47564;&#50640; &#50724;&#47536; &#51204;&#47029;&#51012; &#49464;&#50864;&#49464;&#50836;. &#47112;&#51060;&#50629;&#51012; &#51096; &#44228;&#54925;&#54616;&#49464;&#50836;.';
    else html += '&#54168;&#50612;&#50920;&#51060; &#54077;&#51012; &#54869;&#51064;&#54616;&#44256; &#50504;&#51204;&#54620; &#53364;&#47101;&#51004;&#47196; &#54000;&#49399;&#54616;&#49464;&#50836;. &#48268;&#52964; &#50948;&#52824;&#47484; &#54588;&#54644;&#49464;&#50836;.';
    html += '</p></div>';
    document.getElementById('v11HoleModal').innerHTML = html;
  }

  window.v11ShowHole = function(idx){
    currentHole = idx;
    render();
  };

  render();
  ov.classList.add('active');
}

// ============================================================
// 3. GRIP GUIDE (6 types)
// ============================================================
var gripTypes = [
  { name:'&#50724;&#48260;&#47000;&#54609; &#44536;&#47549;', en:'Overlapping (Vardon)', desc:'&#50724;&#47480;&#49552; &#49352;&#45180;&#49552;&#44032;&#46973;&#51012; &#50812;&#49552; &#44160;&#51648;&#50752; &#51473;&#51648; &#49324;&#51060;&#50640; &#44152;&#52824;&#45716; &#44536;&#47549;. &#49552;&#51060; &#53360; &#44264;&#54140;&#50640;&#44172; &#51201;&#54633;.', pros:'&#49552;&#47785; &#50976;&#50672;&#49457;, &#51068;&#44288;&#46108; &#49828;&#50969;', cons:'&#49552;&#51060; &#51089;&#51004;&#47732; &#54798;', level:'&#x1F7E2; &#51473;&#44553;+', color:'#4caf50' },
  { name:'&#51064;&#53552;&#47196;&#53433; &#44536;&#47549;', en:'Interlocking', desc:'&#50724;&#47480;&#49552; &#49352;&#45180;&#49552;&#44032;&#46973;&#44284; &#50812;&#49552; &#44160;&#51648;&#47484; &#44368;&#52264;&#49884;&#53412;&#45716; &#44536;&#47549;. &#51061;&#47932;&#50640;&#44172; &#47566;&#51060; &#44428;&#51109;.', pros:'&#44053;&#54620; &#44536;&#47549;&#47141;, &#50504;&#51221;&#44048;', cons:'&#44288;&#51208; &#48512;&#45812; &#44032;&#45733;', level:'&#x1F7E2; &#52488;&#44553;~', color:'#2196f3' },
  { name:'&#48288;&#51060;&#49828;&#48380; &#44536;&#47549;', en:'Baseball (10-finger)', desc:'&#50676; &#49552;&#44032;&#46973;&#51012; &#47784;&#46160; &#53364;&#47101;&#50640; &#44048;&#45716; &#44536;&#47549;. &#52488;&#48372;&#51088;&#50752; &#50500;&#51060;&#46308;&#50640;&#44172; &#51201;&#54633;.', pros:'&#51649;&#44288;&#51201;, &#49933;&#50868; &#44536;&#47549;', cons:'&#49552; &#48516;&#47532; &#50864;&#47140;', level:'&#x1F7E1; &#52488;&#44553;', color:'#ff9800' },
  { name:'&#49828;&#53944;&#47217; &#44536;&#47549;', en:'Strong Grip', desc:'&#50812;&#49552;&#51012; &#45908; &#50724;&#47480;&#51901;&#51004;&#47196; &#46028;&#47140; &#51105;&#45716; &#44536;&#47549;. &#46300;&#47196;&#50864;/&#54985;&#51012; &#50976;&#46020;&#54633;&#45768;&#45796;.', pros:'&#46300;&#47196;&#50864; &#48169;&#51648;, &#54028;&#50892; &#51613;&#44032;', cons:'&#54985; &#44284;&#45796; &#44032;&#45733;', level:'&#x1F7E0; &#49345;&#54889;&#48324;', color:'#e91e63' },
  { name:'&#50948;&#53356; &#44536;&#47549;', en:'Weak Grip', desc:'&#50812;&#49552;&#51012; &#45908; &#50812;&#51901;&#51004;&#47196; &#46028;&#47140; &#51105;&#45716; &#44536;&#47549;. &#54168;&#51060;&#46300;&#47484; &#50976;&#46020;&#54633;&#45768;&#45796;.', pros:'&#49836;&#46972;&#51060;&#49828; &#44368;&#51221;, &#53080;&#53944;&#47204;', cons:'&#44144;&#47532; &#44048;&#49548; &#44032;&#45733;', level:'&#x1F7E0; &#49345;&#54889;&#48324;', color:'#9c27b0' },
  { name:'&#45684;&#53944;&#47092; &#44536;&#47549;', en:'Neutral Grip', desc:'&#50812;&#49552; V&#51088;&#44032; &#50724;&#47480;&#51901; &#50612;&#44648;&#47484; &#44032;&#47532;&#53412;&#45716; &#54364;&#51456; &#44536;&#47549;. &#44032;&#51109; &#47566;&#51060; &#44428;&#51109;&#46121;&#45768;&#45796;.', pros:'&#48184;&#47088;&#49828;, &#48276;&#50857;&#49457;', cons:'&#53945;&#48324;&#54620; &#45800;&#51216; &#50630;&#51020;', level:'&#x1F7E2; &#47784;&#46304; &#47112;&#48296;', color:'#00bcd4' }
];

function renderGripSVG(idx){
  var colors = ['#4caf50','#2196f3','#ff9800','#e91e63','#9c27b0','#00bcd4'];
  var c = colors[idx];
  var svg = '<svg viewBox="0 0 140 200" class="v11-grip-svg" xmlns="http://www.w3.org/2000/svg">';
  svg += '<rect x="62" y="20" width="16" height="160" rx="4" fill="#888" opacity=".3"/>';
  svg += '<rect x="64" y="30" width="12" height="100" rx="3" fill="#555"/>';
  if(idx === 0){
    svg += '<rect x="50" y="60" width="40" height="50" rx="8" fill="' + c + '" opacity=".7"/>';
    svg += '<ellipse cx="85" cy="70" rx="8" ry="5" fill="' + c + '" opacity=".9"/>';
    svg += '<text x="70" y="145" font-size="8" fill="var(--text-muted)" text-anchor="middle">Overlapping</text>';
  } else if(idx === 1){
    svg += '<rect x="50" y="60" width="40" height="50" rx="8" fill="' + c + '" opacity=".7"/>';
    svg += '<path d="M55,75 Q65,65 75,75" stroke="' + c + '" stroke-width="3" fill="none"/>';
    svg += '<text x="70" y="145" font-size="8" fill="var(--text-muted)" text-anchor="middle">Interlocking</text>';
  } else if(idx === 2){
    svg += '<rect x="48" y="58" width="44" height="55" rx="8" fill="' + c + '" opacity=".7"/>';
    svg += '<text x="70" y="145" font-size="8" fill="var(--text-muted)" text-anchor="middle">Baseball</text>';
  } else if(idx === 3){
    svg += '<rect x="50" y="60" width="40" height="50" rx="8" fill="' + c + '" opacity=".7"/>';
    svg += '<path d="M55,85 L48,95" stroke="' + c + '" stroke-width="4" fill="none" stroke-linecap="round"/>';
    svg += '<text x="70" y="145" font-size="8" fill="var(--text-muted)" text-anchor="middle">Strong</text>';
  } else if(idx === 4){
    svg += '<rect x="50" y="60" width="40" height="50" rx="8" fill="' + c + '" opacity=".7"/>';
    svg += '<path d="M85,85 L92,95" stroke="' + c + '" stroke-width="4" fill="none" stroke-linecap="round"/>';
    svg += '<text x="70" y="145" font-size="8" fill="var(--text-muted)" text-anchor="middle">Weak</text>';
  } else {
    svg += '<rect x="50" y="60" width="40" height="50" rx="8" fill="' + c + '" opacity=".7"/>';
    svg += '<line x1="70" y1="55" x2="70" y2="45" stroke="' + c + '" stroke-width="2"/>';
    svg += '<polygon points="66,47 70,40 74,47" fill="' + c + '"/>';
    svg += '<text x="70" y="145" font-size="8" fill="var(--text-muted)" text-anchor="middle">Neutral</text>';
  }
  svg += '</svg>';
  return svg;
}

function renderGripGuide(){
  var ov = document.getElementById('v11GripOverlay');
  if(!ov) return;
  var html = '<div class="v11-hdr"><h2><span class="v11i">&#x270B;</span> &#44536;&#47549; &#44032;&#51060;&#46300;</h2><button class="v11-x" onclick="document.getElementById(\'v11GripOverlay\').classList.remove(\'active\')">&times;</button></div>';
  html += '<p style="font-size:12px;color:var(--text-muted);margin-bottom:16px">&#50732;&#48148;&#47480; &#44536;&#47549;&#51008; &#49828;&#50969;&#51032; &#44592;&#52488;&#51077;&#45768;&#45796;. &#51088;&#49888;&#50640;&#44172; &#47582;&#45716; &#44536;&#47549;&#51012; &#52286;&#50500;&#48372;&#49464;&#50836;.</p>';
  gripTypes.forEach(function(g, idx){
    html += '<div class="v11-card">';
    html += '<h4><span style="color:' + g.color + '">&#x25CF;</span> ' + g.name + '</h4>';
    html += '<p style="font-size:11px;color:var(--text-muted);margin-bottom:4px">' + g.en + '</p>';
    html += renderGripSVG(idx);
    html += '<p>' + g.desc + '</p>';
    html += '<div style="display:flex;gap:8px;margin-top:8px;flex-wrap:wrap">';
    html += '<span class="v11-badge v11-badge-green">&#x2B06; ' + g.pros + '</span>';
    html += '<span class="v11-badge v11-badge-orange">&#x2B07; ' + g.cons + '</span>';
    html += '<span class="v11-badge v11-badge-blue">' + g.level + '</span>';
    html += '</div></div>';
  });
  document.getElementById('v11GripModal').innerHTML = html;
  ov.classList.add('active');
}

// ============================================================
// 4. PRACTICE DRILL LIBRARY (12 drills)
// ============================================================
var drills = [
  { id:'d1', cat:'driving', name:'&#x1F3CC; &#54000;&#49399; &#50620;&#46972;&#51064;&#47676;&#53944;', desc:'&#48156;, &#47924;&#47502;, &#50612;&#44648;, &#44277; &#51068;&#51649;&#49440; &#50620;&#46972;&#51064;. 3&#44060;&#51032; &#44277;&#51012; &#51068;&#51649;&#49440;&#50640; &#45459;&#44256; &#50672;&#49845;.', duration:'15&#48516;', level:'&#52488;&#44553;', reps:'20&#44060;' },
  { id:'d2', cat:'driving', name:'&#x1F4AA; &#54028;&#50892; &#46300;&#46972;&#51060;&#48652; &#46300;&#47540;', desc:'50% &#55192;&#51004;&#47196; &#49884;&#51089;&#54644; 10&#44060;&#47560;&#45796; 10%&#50473; &#55192; &#51613;&#44032;. &#47532;&#46316; &#50976;&#51648;&#50640; &#51665;&#51473;.', duration:'20&#48516;', level:'&#51473;&#44553;', reps:'30&#44060;' },
  { id:'d3', cat:'driving', name:'&#x1F3AF; &#54168;&#51060;&#46300;/&#46300;&#47196;&#50864; &#44368;&#51221;', desc:'&#53440;&#44191; &#50812;&#51901;/&#50724;&#47480;&#51901;&#50640; &#44368;&#45824;&#47196; &#50640;&#51076;. &#53364;&#47101;&#54168;&#51060;&#49828; &#51312;&#51208;&#47196; &#44396;&#51656; &#48169;&#54693; &#53080;&#53944;&#47204;.', duration:'20&#48516;', level:'&#51473;&#44553;', reps:'20&#44060;' },
  { id:'d4', cat:'iron', name:'&#x26F3; 9-7-5 &#50500;&#51060;&#50616; &#49324;&#45796;&#47532;', desc:'9&#48264; &#50500;&#51060;&#50616;&#48512;&#53552; 7&#48264;, 5&#48264;&#44620;&#51648; &#49692;&#52264;&#51201;&#51004;&#47196; &#50672;&#49845;. &#44033; 5&#44060;&#50473;.', duration:'25&#48516;', level:'&#52488;&#44553;', reps:'15&#44060;' },
  { id:'d5', cat:'iron', name:'&#x1F4CF; &#44144;&#47532; &#52968;&#53944;&#47204; &#46300;&#47540;', desc:'&#44057;&#51008; &#53364;&#47101;&#51004;&#47196; 3&#44032;&#51648; &#49828;&#50969; &#53356;&#44592;&#47196; &#52824;&#44592;. &#54400;&#49828;&#50969;/3/4 &#49828;&#50969;/&#54616;&#54532; &#49828;&#50969;.', duration:'15&#48516;', level:'&#51473;&#44553;', reps:'15&#44060;' },
  { id:'d6', cat:'iron', name:'&#x1F525; &#53440;&#44191; &#44536;&#47536; &#46300;&#47540;', desc:'50m, 100m, 150m &#53440;&#44191;&#50640; &#49692;&#49436;&#45824;&#47196; &#50640;&#51076;. &#49892;&#51204; &#53076;&#49828; &#49345;&#54889;&#52376;&#47100; &#50672;&#49845;.', duration:'20&#48516;', level:'&#49345;&#44553;', reps:'18&#44060;' },
  { id:'d7', cat:'short', name:'&#x1F3AF; &#52841; &#47004;&#46377; &#50672;&#49845;', desc:'&#44536;&#47536; &#51452;&#48320; 5m, 10m, 15m&#50640;&#49436; &#52841;&#49399;. &#48324;&#46300;&#47484; &#50976;&#51648;&#54616;&#47728; &#46028;&#47532;&#44592;.', duration:'15&#48516;', level:'&#52488;&#44553;', reps:'20&#44060;' },
  { id:'d8', cat:'short', name:'&#x1F3B3; &#48268;&#52964; &#53448;&#52636; &#46300;&#47540;', desc:'&#48268;&#52964;&#50640;&#49436; &#50724;&#54536; &#54168;&#51060;&#49828;&#47196; &#52824;&#44592;. &#47784;&#47000;&#47484; &#44032;&#47476;&#47728; &#49828;&#54592;&#50640; &#51665;&#51473;.', duration:'15&#48516;', level:'&#51473;&#44553;', reps:'15&#44060;' },
  { id:'d9', cat:'short', name:'&#x2B50; &#50629;&#50532;&#45796;&#50868; &#52268;&#47536;&#51648;', desc:'&#44536;&#47536; &#51452;&#48320; 4&#44275;&#50640;&#49436; &#50629;&#50532;&#45796;&#50868; &#49884;&#46020;. 4/4 &#49457;&#44277;&#54624; &#46412;&#44620;&#51648; &#48152;&#48373;.', duration:'20&#48516;', level:'&#49345;&#44553;', reps:'&#47924;&#51228;&#54620;' },
  { id:'d10', cat:'putting', name:'&#x1F3B3; &#49884;&#44228; &#54140;&#54021; &#46300;&#47540;', desc:'&#54848; &#51452;&#48320; 12&#49884; &#48169;&#54693;&#50640; &#44277; &#48176;&#52824;. 1m&#48512;&#53552; &#49884;&#51089;&#54644; &#47784;&#46160; &#49457;&#44277; &#49884; 1.5m&#51004;&#47196; &#54869;&#45824;.', duration:'15&#48516;', level:'&#52488;&#44553;', reps:'12&#44060;' },
  { id:'d11', cat:'putting', name:'&#x1F4CF; &#44144;&#47532;&#44048; &#54140;&#54021;', desc:'3m, 5m, 7m, 10m &#44144;&#47532;&#50640;&#49436; &#44033; 3&#44060;&#50473; &#54140;&#54021;. &#44144;&#47532;&#44048;&#50640; &#51665;&#51473;.', duration:'20&#48516;', level:'&#51473;&#44553;', reps:'12&#44060;' },
  { id:'d12', cat:'putting', name:'&#x1F947; &#54532;&#47112;&#49492; &#54140;&#54021; &#46300;&#47540;', desc:'&#51473;&#50836;&#54620; &#54140;&#54021; &#51204;&#50640; &#47336;&#54004;&#51012; &#49688;&#54665;. &#50672;&#49845;&#49828;&#50969; 3&#48264; &#54980; &#49892;&#51204; &#54140;&#54021;.', duration:'10&#48516;', level:'&#49345;&#44553;', reps:'5&#44060;' }
];

var drillProgress = v11get('drill_progress', {});

function renderDrillLibrary(){
  var ov = document.getElementById('v11DrillOverlay');
  if(!ov) return;
  var currentCat = 'all';

  function render(){
    var filtered = currentCat === 'all' ? drills : drills.filter(function(d){ return d.cat === currentCat; });
    var completedCount = Object.keys(drillProgress).filter(function(k){ return drillProgress[k] >= 3; }).length;
    var html = '<div class="v11-hdr"><h2><span class="v11i">&#x1F3CB;</span> &#50672;&#49845; &#46300;&#47540; &#46972;&#51060;&#48652;&#47084;&#47532;</h2><button class="v11-x" onclick="document.getElementById(\'v11DrillOverlay\').classList.remove(\'active\')">&times;</button></div>';
    html += '<div style="display:flex;gap:8px;margin-bottom:14px;flex-wrap:wrap">';
    html += '<span class="v11-badge v11-badge-green">' + completedCount + '/12 &#50756;&#47308;</span>';
    html += '<span class="v11-badge v11-badge-blue">' + Object.keys(drillProgress).length + '&#44060; &#49884;&#51089;</span>';
    html += '</div>';
    html += '<div class="v11-tabs">';
    var cats = [{k:'all',l:'&#51204;&#52404;'},{k:'driving',l:'&#46300;&#46972;&#51060;&#48729;'},{k:'iron',l:'&#50500;&#51060;&#50616;'},{k:'short',l:'&#49660;&#53944;&#44172;&#51076;'},{k:'putting',l:'&#54140;&#54021;'}];
    cats.forEach(function(c){
      html += '<button class="v11-tab' + (c.k===currentCat?' active':'') + '" onclick="v11FilterDrills(\''+c.k+'\')">' + c.l + '</button>';
    });
    html += '</div>';
    filtered.forEach(function(d){
      var prog = drillProgress[d.id] || 0;
      var pct = Math.min(100, (prog / 3) * 100);
      html += '<div class="v11-drill" onclick="v11DoDrill(\'' + d.id + '\')">';
      html += '<h5>' + d.name + (prog >= 3 ? ' <span class="v11-badge v11-badge-gold">&#x2705; &#50756;&#47308;</span>' : '') + '</h5>';
      html += '<div class="v11-dd">' + d.desc + '</div>';
      html += '<div class="v11-dm">';
      html += '<span class="v11-badge v11-badge-blue">&#x23F1; ' + d.duration + '</span>';
      html += '<span class="v11-badge v11-badge-green">' + d.level + '</span>';
      html += '<span class="v11-badge v11-badge-orange">&#x1F504; ' + d.reps + '</span>';
      html += '</div>';
      html += '<div class="v11-progress"><div class="v11-progress-fill" style="width:' + pct + '%;background:linear-gradient(90deg,var(--primary),#7bed9f)"></div></div>';
      html += '</div>';
    });
    document.getElementById('v11DrillModal').innerHTML = html;
  }

  window.v11FilterDrills = function(cat){
    currentCat = cat;
    render();
  };

  window.v11DoDrill = function(id){
    drillProgress[id] = (drillProgress[id] || 0) + 1;
    v11set('drill_progress', drillProgress);
    v11sfx('drill');
    v11toast('&#x1F4AA; &#46300;&#47540; &#50756;&#47308;! (' + drillProgress[id] + '/3)', '&#x1F3CB;');
    render();
    v11checkAchievements();
  };

  render();
  ov.classList.add('active');
  v11sfx('drill');
}

// ============================================================
// 5. SCORE PREDICTION AI
// ============================================================
function renderScorePrediction(){
  var ov = document.getElementById('v11PredictOverlay');
  if(!ov) return;
  var html = '<div class="v11-hdr"><h2><span class="v11i">&#x1F52E;</span> &#49828;&#53076;&#50612; &#50696;&#52769; AI</h2><button class="v11-x" onclick="document.getElementById(\'v11PredictOverlay\').classList.remove(\'active\')">&times;</button></div>';
  html += '<p style="font-size:12px;color:var(--text-muted);margin-bottom:16px">&#54788;&#51116; &#52968;&#46356;&#49496;&#51012; &#51077;&#47141;&#54616;&#47732; AI&#44032; &#50696;&#49345; &#49828;&#53076;&#50612;&#47484; &#50696;&#52769;&#54633;&#45768;&#45796;.</p>';
  html += '<div class="v11-grid2">';
  html += '<div><label class="v11-label">&#54217;&#44512; &#49828;&#53076;&#50612;</label><input type="number" id="v11PredAvg" class="v11-input" placeholder="90" min="60" max="130"></div>';
  html += '<div><label class="v11-label">&#53076;&#49828; &#45212;&#51060;&#46020;</label><select id="v11PredDiff" class="v11-select"><option value="easy">&#49772;&#50880; (Slope &lt;120)</option><option value="medium" selected>&#48372;&#53685; (120~135)</option><option value="hard">&#50612;&#47140;&#50880; (135+)</option></select></div>';
  html += '<div><label class="v11-label">&#45216;&#50472; &#49345;&#53468;</label><select id="v11PredWeather" class="v11-select"><option value="clear">&#x2600; &#47582;&#51020;</option><option value="cloudy">&#x26C5; &#54868;&#47548;</option><option value="windy">&#x1F4A8; &#48148;&#46988; (15km/h+)</option><option value="rain">&#x1F327; &#48708;</option></select></div>';
  html += '<div><label class="v11-label">&#52404;&#47141; &#49345;&#53468;</label><select id="v11PredCondition" class="v11-select"><option value="great">&#x1F4AA; &#52572;&#49345;</option><option value="good" selected>&#x1F44D; &#50577;&#54840;</option><option value="tired">&#x1F634; &#54588;&#44260;</option></select></div>';
  html += '<div><label class="v11-label">&#50672;&#49845; &#48712;&#46020;</label><select id="v11PredPractice" class="v11-select"><option value="frequent">&#x2B50; &#51452; 3&#54924;+</option><option value="moderate" selected>&#x1F44C; &#51452; 1~2&#54924;</option><option value="rare">&#x1F44E; &#44144;&#51032; &#50630;&#51020;</option></select></div>';
  html += '<div><label class="v11-label">&#46972;&#50868;&#46300; &#49884;&#44036;</label><select id="v11PredTime" class="v11-select"><option value="morning">&#x1F305; &#50724;&#51204; (&#49884;&#50896;)</option><option value="afternoon" selected>&#x2600; &#50724;&#54980;</option><option value="evening">&#x1F305; &#51200;&#45377; (&#45908;&#50868;)</option></select></div>';
  html += '</div>';
  html += '<button class="v11-btn v11-btn-primary" style="width:100%;margin-top:16px;justify-content:center" onclick="v11PredictScore()">&#x1F52E; &#49828;&#53076;&#50612; &#50696;&#52769;&#54616;&#44592;</button>';
  html += '<div id="v11PredResult" style="margin-top:16px"></div>';
  document.getElementById('v11PredictModal').innerHTML = html;
  ov.classList.add('active');
}

window.v11PredictScore = function(){
  var avg = parseInt(document.getElementById('v11PredAvg').value) || 90;
  var diff = document.getElementById('v11PredDiff').value;
  var weather = document.getElementById('v11PredWeather').value;
  var condition = document.getElementById('v11PredCondition').value;
  var practice = document.getElementById('v11PredPractice').value;
  var time = document.getElementById('v11PredTime').value;

  var score = avg;
  var factors = [];
  if(diff==='easy'){ score -= 3; factors.push('&#x2B07; &#49772;&#50868; &#53076;&#49828; -3'); }
  else if(diff==='hard'){ score += 4; factors.push('&#x2B06; &#50612;&#47140;&#50868; &#53076;&#49828; +4'); }
  if(weather==='windy'){ score += 3; factors.push('&#x1F4A8; &#48148;&#46988; +3'); }
  else if(weather==='rain'){ score += 5; factors.push('&#x1F327; &#48708; +5'); }
  else if(weather==='clear'){ score -= 1; factors.push('&#x2600; &#47582;&#51020; -1'); }
  if(condition==='great'){ score -= 2; factors.push('&#x1F4AA; &#52572;&#49345; &#52404;&#47141; -2'); }
  else if(condition==='tired'){ score += 3; factors.push('&#x1F634; &#54588;&#44260; +3'); }
  if(practice==='frequent'){ score -= 2; factors.push('&#x2B50; &#54876;&#48156;&#54620; &#50672;&#49845; -2'); }
  else if(practice==='rare'){ score += 2; factors.push('&#x1F44E; &#50672;&#49845; &#48512;&#51313; +2'); }
  if(time==='morning'){ score -= 1; factors.push('&#x1F305; &#49884;&#50896;&#54620; &#50724;&#51204; -1'); }
  else if(time==='evening'){ score += 1; factors.push('&#x1F305; &#45908;&#50868; &#51200;&#45377; +1'); }

  var range = Math.max(2, Math.round(Math.abs(score - avg) * 0.3 + 2));
  var lo = score - range, hi = score + range;
  var grade = score <= 72 ? 'S' : score <= 80 ? 'A' : score <= 90 ? 'B' : score <= 100 ? 'C' : 'D';
  var gradeColor = grade==='S'?'#ffd700':grade==='A'?'#4caf50':grade==='B'?'#2196f3':grade==='C'?'#ff9800':'#f44336';

  var html = '<div class="v11-report-preview">';
  html += '<h3>&#x1F52E; &#50696;&#49345; &#49828;&#53076;&#50612;</h3>';
  html += '<div class="v11-report-grid">';
  html += '<div class="v11-report-item"><div class="v11-rv">' + score + '</div><div class="v11-rl">&#50696;&#49345; &#49828;&#53076;&#50612;</div></div>';
  html += '<div class="v11-report-item"><div class="v11-rv">' + lo + '~' + hi + '</div><div class="v11-rl">&#50696;&#49345; &#48276;&#50948;</div></div>';
  html += '<div class="v11-report-item"><div class="v11-rv" style="color:' + gradeColor + '">' + grade + '</div><div class="v11-rl">&#50696;&#49345; &#46321;&#44553;</div></div>';
  html += '<div class="v11-report-item"><div class="v11-rv">' + (score - 72 >= 0 ? '+' : '') + (score-72) + '</div><div class="v11-rl">vs Par 72</div></div>';
  html += '</div></div>';
  html += '<div class="v11-card"><h4>&#x1F4CA; &#48516;&#49437; &#50836;&#51064;</h4>';
  factors.forEach(function(f){ html += '<p style="margin:4px 0">' + f + '</p>'; });
  html += '</div>';
  var tipArr = [
    '&#x1F4A1; &#46972;&#50868;&#46300; &#51204; &#50892;&#48141;&#50629;&#51012; &#52649;&#48516;&#55176; &#54616;&#49464;&#50836;.',
    '&#x1F4A1; &#49688;&#48516; &#49453;&#52712;&#47484; &#51105;&#51648; &#47560;&#49464;&#50836; (&#54848;&#47560;&#45796; &#47932; &#54620;&#47784;&#44552;).',
    '&#x1F4A1; &#54168;&#51060;&#49828; &#51312;&#51208;&#51012; &#51105;&#51004;&#49464;&#50836;. &#44553;&#54616;&#51648; &#47568;&#44256; &#54364;&#54637;&#51012; &#51060;&#50857;&#54616;&#49464;&#50836;.',
    '&#x1F4A1; &#46300;&#46972;&#51060;&#48260;&#48372;&#45796; &#50500;&#51060;&#50616;&#44284; &#54140;&#54021; &#50672;&#49845;&#50640; &#51665;&#51473;&#54616;&#49464;&#50836;.'
  ];
  html += '<div class="v11-card"><h4>&#x2728; &#50724;&#45720;&#51032; &#54021;</h4><p>' + tipArr[Math.floor(Math.random()*tipArr.length)] + '</p></div>';
  document.getElementById('v11PredResult').innerHTML = html;
  v11sfx('predict');
  v11toast('&#x1F52E; &#50696;&#49345; &#49828;&#53076;&#50612;: ' + score + ' (' + grade + '&#46321;&#44553;)', '&#x26F3;');
  v11checkAchievements();
};

// ============================================================
// 6. FRIEND MATCHING SYSTEM
// ============================================================
var friendsData = v11get('friends', []);

function renderFriendMatching(){
  var ov = document.getElementById('v11FriendOverlay');
  if(!ov) return;
  var html = '<div class="v11-hdr"><h2><span class="v11i">&#x1F91D;</span> &#44264;&#54532; &#48260;&#46356; &#47588;&#52845;</h2><button class="v11-x" onclick="document.getElementById(\'v11FriendOverlay\').classList.remove(\'active\')">&times;</button></div>';

  html += '<div class="v11-card"><h4>&#x2795; &#48260;&#46356; &#52628;&#44032;</h4>';
  html += '<div class="v11-grid2">';
  html += '<div><label class="v11-label">&#45769;&#45348;&#51076;</label><input type="text" id="v11FrName" class="v11-input" placeholder="&#48260;&#46356; &#45769;&#45348;&#51076;" maxlength="20"></div>';
  html += '<div><label class="v11-label">&#54648;&#46356;&#52897;</label><input type="number" id="v11FrHdcp" class="v11-input" placeholder="18" min="0" max="54"></div>';
  html += '<div><label class="v11-label">&#49440;&#54840; &#49884;&#44036;</label><select id="v11FrTime" class="v11-select"><option>&#50724;&#51204;</option><option>&#50724;&#54980;</option><option>&#50577;&#51901; &#44032;&#45733;</option></select></div>';
  html += '<div><label class="v11-label">&#49440;&#54840; &#51648;&#50669;</label><select id="v11FrRegion" class="v11-select"><option>&#49436;&#50872;</option><option>&#44221;&#44592;</option><option>&#52649;&#52397;</option><option>&#44053;&#50896;</option><option>&#51204;&#46972;</option><option>&#44221;&#49345;</option><option>&#51228;&#51452;</option></select></div>';
  html += '</div>';
  html += '<button class="v11-btn v11-btn-primary v11-btn-sm" style="margin-top:10px" onclick="v11AddFriend()">&#x2795; &#48260;&#46356; &#52628;&#44032;</button>';
  html += '</div>';

  html += '<div class="v11-divider"></div>';
  html += '<h4 style="font-size:14px;font-weight:700;margin-bottom:12px">&#x1F465; &#45236; &#48260;&#46356; &#47785;&#47197; (' + friendsData.length + '&#47749;)</h4>';

  if(friendsData.length === 0){
    html += '<p style="text-align:center;color:var(--text-muted);padding:20px">&#50500;&#51649; &#46321;&#47197;&#46108; &#48260;&#46356;&#44032; &#50630;&#49845;&#45768;&#45796;.</p>';
  } else {
    friendsData.forEach(function(f, idx){
      var initials = f.name.charAt(0);
      html += '<div class="v11-friend-card">';
      html += '<div class="v11-friend-avatar">' + initials + '</div>';
      html += '<div class="v11-friend-info"><h5>' + f.name + '</h5>';
      html += '<p>HC ' + f.handicap + ' | ' + f.time + ' | ' + f.region + ' | &#46972;&#50868;&#46300; ' + (f.rounds||0) + '&#54924;</p></div>';
      html += '<button class="v11-btn v11-btn-sm v11-btn-secondary" onclick="v11RemoveFriend(' + idx + ')">&#x274C;</button>';
      html += '</div>';
    });
  }

  html += '<div class="v11-divider"></div>';
  html += '<div class="v11-card"><h4>&#x1F4A1; &#47588;&#52845; &#54021;</h4>';
  html += '<p>&#48708;&#49847;&#54620; &#54648;&#46356;&#52897;&#51032; &#48260;&#46356;&#50752; &#54632;&#44760; &#46972;&#50868;&#46300;&#54616;&#47732; &#49436;&#47196;&#50640;&#44172; &#46041;&#44592;&#48512;&#50668;&#44032; &#46121;&#45768;&#45796;. &#45796;&#50577;&#54620; &#50672;&#47161;&#45824;&#51032; &#48260;&#46356;&#50752; &#46972;&#50868;&#46300;&#54644;&#48372;&#49464;&#50836;!</p>';
  html += '</div>';

  document.getElementById('v11FriendModal').innerHTML = html;
  ov.classList.add('active');
}

window.v11AddFriend = function(){
  var name = (document.getElementById('v11FrName').value||'').trim();
  if(!name){ v11toast('&#45769;&#45348;&#51076;&#51012; &#51077;&#47141;&#54644;&#51452;&#49464;&#50836;', '&#x26A0;'); return; }
  friendsData.push({
    name: name,
    handicap: parseInt(document.getElementById('v11FrHdcp').value)||18,
    time: document.getElementById('v11FrTime').value,
    region: document.getElementById('v11FrRegion').value,
    rounds: 0,
    added: new Date().toISOString().slice(0,10)
  });
  v11set('friends', friendsData);
  v11sfx('friend');
  v11toast('&#x1F91D; ' + name + '&#45784;&#51060; &#48260;&#46356;&#47196; &#52628;&#44032;&#46104;&#50632;&#49845;&#45768;&#45796;!', '&#x2705;');
  renderFriendMatching();
  v11checkAchievements();
};

window.v11RemoveFriend = function(idx){
  var name = friendsData[idx].name;
  friendsData.splice(idx, 1);
  v11set('friends', friendsData);
  v11toast(name + '&#45784; &#49325;&#51228;&#46120;', '&#x1F5D1;');
  renderFriendMatching();
};

// ============================================================
// 7. EQUIPMENT COMPARISON TOOL
// ============================================================
var equipmentDB = [
  { cat:'driver', name:'TaylorMade Qi35 LS', loft:'9.0&deg;', shaft:'Graphite', weight:'305g', price:'&#x20A9;699,000', flex:'S/R', forgiveness:'&#x2B50;&#x2B50;&#x2B50;&#x2B50;', distance:'&#x2B50;&#x2B50;&#x2B50;&#x2B50;&#x2B50;', feel:'&#x2B50;&#x2B50;&#x2B50;&#x2B50;' },
  { cat:'driver', name:'Callaway Paradym Ai Smoke', loft:'10.5&deg;', shaft:'Graphite', weight:'310g', price:'&#x20A9;649,000', flex:'S/R/L', forgiveness:'&#x2B50;&#x2B50;&#x2B50;&#x2B50;&#x2B50;', distance:'&#x2B50;&#x2B50;&#x2B50;&#x2B50;', feel:'&#x2B50;&#x2B50;&#x2B50;&#x2B50;&#x2B50;' },
  { cat:'driver', name:'Titleist TSR3', loft:'9.0&deg;', shaft:'Graphite', weight:'308g', price:'&#x20A9;729,000', flex:'S/X', forgiveness:'&#x2B50;&#x2B50;&#x2B50;', distance:'&#x2B50;&#x2B50;&#x2B50;&#x2B50;&#x2B50;', feel:'&#x2B50;&#x2B50;&#x2B50;&#x2B50;' },
  { cat:'driver', name:'Ping G430 Max', loft:'10.5&deg;', shaft:'Graphite', weight:'312g', price:'&#x20A9;599,000', flex:'S/R', forgiveness:'&#x2B50;&#x2B50;&#x2B50;&#x2B50;&#x2B50;', distance:'&#x2B50;&#x2B50;&#x2B50;&#x2B50;', feel:'&#x2B50;&#x2B50;&#x2B50;' },
  { cat:'iron', name:'Titleist T200', loft:'7i 30&deg;', shaft:'Steel/Graphite', weight:'Varies', price:'&#x20A9;1,890,000 (8&#48376;)', flex:'S/R', forgiveness:'&#x2B50;&#x2B50;&#x2B50;&#x2B50;', distance:'&#x2B50;&#x2B50;&#x2B50;&#x2B50;', feel:'&#x2B50;&#x2B50;&#x2B50;&#x2B50;&#x2B50;' },
  { cat:'iron', name:'Callaway Apex Pro', loft:'7i 31&deg;', shaft:'Steel', weight:'Varies', price:'&#x20A9;1,990,000 (8&#48376;)', flex:'S/X', forgiveness:'&#x2B50;&#x2B50;&#x2B50;', distance:'&#x2B50;&#x2B50;&#x2B50;&#x2B50;', feel:'&#x2B50;&#x2B50;&#x2B50;&#x2B50;&#x2B50;' },
  { cat:'iron', name:'TaylorMade P790', loft:'7i 30.5&deg;', shaft:'Steel/Graphite', weight:'Varies', price:'&#x20A9;1,790,000 (8&#48376;)', flex:'S/R', forgiveness:'&#x2B50;&#x2B50;&#x2B50;&#x2B50;', distance:'&#x2B50;&#x2B50;&#x2B50;&#x2B50;&#x2B50;', feel:'&#x2B50;&#x2B50;&#x2B50;&#x2B50;' },
  { cat:'iron', name:'Mizuno JPX925 Forged', loft:'7i 30&deg;', shaft:'Steel', weight:'Varies', price:'&#x20A9;1,690,000 (8&#48376;)', flex:'S/R', forgiveness:'&#x2B50;&#x2B50;&#x2B50;&#x2B50;', distance:'&#x2B50;&#x2B50;&#x2B50;&#x2B50;', feel:'&#x2B50;&#x2B50;&#x2B50;&#x2B50;&#x2B50;' },
  { cat:'putter', name:'Scotty Cameron Phantom X', loft:'3.5&deg;', shaft:'Steel', weight:'350g', price:'&#x20A9;599,000', flex:'-', forgiveness:'&#x2B50;&#x2B50;&#x2B50;&#x2B50;&#x2B50;', distance:'-', feel:'&#x2B50;&#x2B50;&#x2B50;&#x2B50;&#x2B50;' },
  { cat:'putter', name:'Odyssey White Hot OG', loft:'3&deg;', shaft:'Steel', weight:'340g', price:'&#x20A9;299,000', flex:'-', forgiveness:'&#x2B50;&#x2B50;&#x2B50;&#x2B50;', distance:'-', feel:'&#x2B50;&#x2B50;&#x2B50;&#x2B50;&#x2B50;' },
  { cat:'putter', name:'TaylorMade Spider GT', loft:'3&deg;', shaft:'Steel', weight:'355g', price:'&#x20A9;399,000', flex:'-', forgiveness:'&#x2B50;&#x2B50;&#x2B50;&#x2B50;&#x2B50;', distance:'-', feel:'&#x2B50;&#x2B50;&#x2B50;&#x2B50;' },
  { cat:'putter', name:'Ping PLD Milled', loft:'3&deg;', shaft:'Steel', weight:'345g', price:'&#x20A9;499,000', flex:'-', forgiveness:'&#x2B50;&#x2B50;&#x2B50;&#x2B50;', distance:'-', feel:'&#x2B50;&#x2B50;&#x2B50;&#x2B50;&#x2B50;' }
];

function renderEquipCompare(){
  var ov = document.getElementById('v11EquipOverlay');
  if(!ov) return;
  var currentCat = 'driver';
  var sel1 = 0, sel2 = 1;

  function render(){
    var filtered = equipmentDB.filter(function(e){ return e.cat === currentCat; });
    if(sel1 >= filtered.length) sel1 = 0;
    if(sel2 >= filtered.length) sel2 = Math.min(1, filtered.length-1);
    var e1 = filtered[sel1], e2 = filtered[sel2];

    var html = '<div class="v11-hdr"><h2><span class="v11i">&#x2696;</span> &#51109;&#48708; &#48708;&#44368;</h2><button class="v11-x" onclick="document.getElementById(\'v11EquipOverlay\').classList.remove(\'active\')">&times;</button></div>';
    html += '<div class="v11-tabs">';
    [{k:'driver',l:'&#46300;&#46972;&#51060;&#48260;'},{k:'iron',l:'&#50500;&#51060;&#50616;'},{k:'putter',l:'&#54140;&#53552;'}].forEach(function(c){
      html += '<button class="v11-tab' + (c.k===currentCat?' active':'') + '" onclick="v11EquipCat(\''+c.k+'\')">' + c.l + '</button>';
    });
    html += '</div>';

    html += '<div class="v11-grid2" style="margin-bottom:14px">';
    html += '<div><label class="v11-label">&#51109;&#48708; 1</label><select class="v11-select" onchange="v11EquipSel(0,this.value)">';
    filtered.forEach(function(e,i){ html += '<option value="'+i+'"'+(i===sel1?' selected':'')+'>'+e.name+'</option>'; });
    html += '</select></div>';
    html += '<div><label class="v11-label">&#51109;&#48708; 2</label><select class="v11-select" onchange="v11EquipSel(1,this.value)">';
    filtered.forEach(function(e,i){ html += '<option value="'+i+'"'+(i===sel2?' selected':'')+'>'+e.name+'</option>'; });
    html += '</select></div></div>';

    if(e1 && e2){
      html += '<table class="v11-compare-table">';
      html += '<tr><th>&#54637;&#47785;</th><th>' + e1.name + '</th><th>' + e2.name + '</th></tr>';
      var rows = [
        ['&#47196;&#54532;&#53944;', e1.loft, e2.loft],
        ['&#49380;&#54532;&#53944;', e1.shaft, e2.shaft],
        ['&#47924;&#44172;', e1.weight, e2.weight],
        ['&#44032;&#44201;', e1.price, e2.price],
        ['&#54540;&#47113;&#49828;', e1.flex, e2.flex],
        ['&#44288;&#50857;&#49457;', e1.forgiveness, e2.forgiveness],
        ['&#48708;&#44144;&#47532;', e1.distance, e2.distance],
        ['&#53440;&#44048;', e1.feel, e2.feel]
      ];
      rows.forEach(function(r){
        html += '<tr><td style="font-weight:700">' + r[0] + '</td><td>' + r[1] + '</td><td>' + r[2] + '</td></tr>';
      });
      html += '</table>';
    }

    document.getElementById('v11EquipModal').innerHTML = html;
  }

  window.v11EquipCat = function(cat){ currentCat = cat; sel1=0; sel2=1; render(); };
  window.v11EquipSel = function(which, val){ if(which===0) sel1=parseInt(val); else sel2=parseInt(val); render(); };

  render();
  ov.classList.add('active');
  v11sfx('compare');
}

// ============================================================
// 8. GOLF HISTORY TIMELINE (20 items, Korea + World)
// ============================================================
var golfHistory = [
  { year:'1457', desc:'&#49828;&#53076;&#53952;&#47004;&#46300; &#51228;&#51076;&#49828; 2&#49464;&#44032; &#44264;&#54532;&#47484; &#44552;&#51648;&#54620; &#52572;&#52488; &#44277;&#49885; &#44592;&#47197;', tag:'&#49464;&#44228;' },
  { year:'1764', desc:'&#49464;&#51064;&#53944; &#50532;&#46300;&#47336;&#49828; &#44264;&#54532; &#53364;&#47101; &#49444;&#47549; (&#49464;&#44228; &#52572;&#52488; &#44264;&#54532;&#53364;&#47101;)', tag:'&#49464;&#44228;' },
  { year:'1860', desc:'&#52572;&#52488;&#51032; &#46356; &#50724;&#54536; &#52268;&#54588;&#50616;&#49901; &#44060;&#52572; (&#54532;&#47112;&#49828;&#53944;&#50948;&#53356;)', tag:'&#49464;&#44228;' },
  { year:'1897', desc:'&#54620;&#44397; &#52572;&#52488; &#44264;&#54532;&#51109; - &#50896;&#49328; &#50689;&#44397;&#51064; &#44264;&#54532;&#53364;&#47101; &#49444;&#47549;', tag:'&#54620;&#44397;' },
  { year:'1900', desc:'&#44264;&#54532;&#44032; &#50732;&#47548;&#54589; &#51333;&#47785;&#51004;&#47196; &#52572;&#52488; &#52292;&#53469; (&#54028;&#47532;)', tag:'&#49464;&#44228;' },
  { year:'1916', desc:'PGA of America &#49444;&#47549; + &#52572;&#52488; PGA &#52268;&#54588;&#50616;&#49901;', tag:'&#49464;&#44228;' },
  { year:'1929', desc:'&#44221;&#49457;&#44264;&#54532;&#53364;&#47101; &#49444;&#47549; (&#54620;&#44397; &#52572;&#52488; &#48124;&#44036; &#44264;&#54532;&#51109;)', tag:'&#54620;&#44397;' },
  { year:'1934', desc:'&#52572;&#52488;&#51032; &#47560;&#49828;&#53552;&#49828; &#53664;&#45320;&#47676;&#53944; &#44060;&#52572; (&#50724;&#44144;&#49828;&#53440; &#45236;&#49492;&#45328;)', tag:'&#49464;&#44228;' },
  { year:'1941', desc:'&#51312;&#49440;&#44264;&#54532;&#54801;&#54924; &#49444;&#47549; (&#54620;&#44397; &#44264;&#54532;&#54801;&#54924; &#51204;&#49888;)', tag:'&#54620;&#44397;' },
  { year:'1958', desc:'&#54620;&#44397;&#54532;&#47196;&#44264;&#54532;&#54801;&#54924;(KPGA) &#44277;&#49885; &#52285;&#49444;', tag:'&#54620;&#44397;' },
  { year:'1971', desc:'&#54620;&#44397;&#50668;&#51088;&#54532;&#47196;&#44264;&#54532;&#54801;&#54924;(KLPGA) &#49444;&#47549;', tag:'&#54620;&#44397;' },
  { year:'1988', desc:'&#49436;&#50872; &#50732;&#47548;&#54589;&#50640;&#49436; &#44264;&#54532; &#49884;&#48276;&#51333;&#47785;&#51004;&#47196; &#52292;&#53469;', tag:'&#54620;&#44397;' },
  { year:'1997', desc:'&#53440;&#51060;&#44144; &#50864;&#51592; &#47560;&#49828;&#53552;&#49828; &#52572;&#52488; &#50864;&#49849; (21&#49464;, 12&#53440; &#52264;)', tag:'&#49464;&#44228;' },
  { year:'1998', desc:'&#48149;&#49464;&#47532; LPGA &#53804;&#50612; &#52572;&#52488; &#50864;&#49849; (&#54620;&#44397; &#49440;&#49688; LPGA &#52572;&#52488;)', tag:'&#54620;&#44397;' },
  { year:'2009', desc:'&#49888;&#51648;&#50528; US &#50668;&#51088;&#50724;&#54536; &#50864;&#49849; (&#45817;&#49884; &#52572;&#50672;&#49548;)', tag:'&#54620;&#44397;' },
  { year:'2015', desc:'&#44264;&#54532; 112&#45380; &#47564;&#50640; &#50732;&#47548;&#54589; &#51221;&#49885; &#51333;&#47785; &#48373;&#44480; &#44208;&#51221;', tag:'&#49464;&#44228;' },
  { year:'2016', desc:'&#47532;&#50864; &#50732;&#47548;&#54589;&#50640;&#49436; &#44264;&#54532; &#51221;&#49885; &#48373;&#44480;, &#48149;&#51064;&#48708; &#44552;&#47700;&#45804;', tag:'&#54620;&#44397;' },
  { year:'2020', desc:'&#53076;&#47196;&#45208;19 &#54032;&#45936;&#48121;&#51004;&#47196; &#44264;&#54532; &#45824;&#51473;&#54868; &#44032;&#49549;&#54868; (MZ&#49464;&#45824; &#50976;&#51077;)', tag:'&#49464;&#44228;' },
  { year:'2021', desc:'&#54620;&#44397; &#44264;&#54532; &#51064;&#44396; 500&#47564;&#47749; &#46028;&#54028; (&#50669;&#45824; &#52572;&#45796;)', tag:'&#54620;&#44397;' },
  { year:'2024', desc:'&#54028;&#47532; &#50732;&#47548;&#54589; &#44264;&#54532; 2&#54924; &#50672;&#49549; &#52292;&#53469;, &#54620;&#44397; &#49440;&#49688; &#54876;&#50557;', tag:'&#49464;&#44228;' }
];

function renderGolfHistory(){
  var ov = document.getElementById('v11HistoryOverlay');
  if(!ov) return;
  var currentFilter = 'all';

  function render(){
    var filtered = currentFilter === 'all' ? golfHistory :
      golfHistory.filter(function(h){ return h.tag === currentFilter; });

    var html = '<div class="v11-hdr"><h2><span class="v11i">&#x1F3DB;</span> &#44264;&#54532; &#55176;&#49828;&#53664;&#47532;</h2><button class="v11-x" onclick="document.getElementById(\'v11HistoryOverlay\').classList.remove(\'active\')">&times;</button></div>';
    html += '<div class="v11-tabs">';
    html += '<button class="v11-tab' + (currentFilter==='all'?' active':'') + '" onclick="v11HistFilter(\'all\')">&#51204;&#52404; (' + golfHistory.length + ')</button>';
    html += '<button class="v11-tab' + (currentFilter==='&#54620;&#44397;'?' active':'') + '" onclick="v11HistFilter(\'&#54620;&#44397;\')">&#x1F1F0;&#x1F1F7; &#54620;&#44397;</button>';
    html += '<button class="v11-tab' + (currentFilter==='&#49464;&#44228;'?' active':'') + '" onclick="v11HistFilter(\'&#49464;&#44228;\')">&#x1F30D; &#49464;&#44228;</button>';
    html += '</div>';
    html += '<div class="v11-timeline">';
    filtered.forEach(function(h){
      var tagBadge = h.tag === '&#54620;&#44397;' ? 'v11-badge-blue' : 'v11-badge-green';
      html += '<div class="v11-tl-item">';
      html += '<div class="v11-tl-year">' + h.year + ' <span class="v11-badge ' + tagBadge + '">' + h.tag + '</span></div>';
      html += '<div class="v11-tl-desc">' + h.desc + '</div>';
      html += '</div>';
    });
    html += '</div>';
    document.getElementById('v11HistoryModal').innerHTML = html;
  }

  window.v11HistFilter = function(f){ currentFilter = f; render(); };
  render();
  ov.classList.add('active');
}

// ============================================================
// 9. ROUND REPORT (Canvas-based comprehensive report)
// ============================================================
function renderRoundReport(){
  var ov = document.getElementById('v11ReportOverlay');
  if(!ov) return;

  var stats = v11get('sg_analysis', { rounds:[] });
  var drillsDone = Object.keys(drillProgress).length;
  var friendCount = friendsData.length;
  var achieveCount = v11get('achievements', []).length;
  var totalRounds = stats.rounds.length;

  var html = '<div class="v11-hdr"><h2><span class="v11i">&#x1F4CB;</span> &#46972;&#50868;&#46300; &#47532;&#54252;&#53944;</h2><button class="v11-x" onclick="document.getElementById(\'v11ReportOverlay\').classList.remove(\'active\')">&times;</button></div>';

  html += '<div class="v11-report-preview">';
  html += '<h3>&#x26F3; SmartGolf &#51333;&#54633; &#47532;&#54252;&#53944;</h3>';
  html += '<div class="v11-report-grid">';
  html += '<div class="v11-report-item"><div class="v11-rv">' + totalRounds + '</div><div class="v11-rl">&#52509; &#46972;&#50868;&#46300;</div></div>';
  html += '<div class="v11-report-item"><div class="v11-rv">' + drillsDone + '/12</div><div class="v11-rl">&#46300;&#47540; &#50756;&#47308;</div></div>';
  html += '<div class="v11-report-item"><div class="v11-rv">' + friendCount + '</div><div class="v11-rl">&#48260;&#46356;</div></div>';
  html += '<div class="v11-report-item"><div class="v11-rv">' + achieveCount + '</div><div class="v11-rl">&#50629;&#51201;</div></div>';
  html += '</div></div>';

  if(totalRounds > 0){
    var lastRound = stats.rounds[stats.rounds.length - 1];
    var sg = calcStrokesGained(lastRound);
    html += '<div class="v11-card"><h4>&#x1F4CA; &#52572;&#44540; &#46972;&#50868;&#46300; SG</h4>';
    html += '<div class="v11-grid4">';
    html += '<div class="v11-stat"><div class="v11-sv" style="font-size:16px">' + sg.driving.toFixed(1) + '</div><div class="v11-sl">Tee</div></div>';
    html += '<div class="v11-stat"><div class="v11-sv" style="font-size:16px">' + sg.approach.toFixed(1) + '</div><div class="v11-sl">Approach</div></div>';
    html += '<div class="v11-stat"><div class="v11-sv" style="font-size:16px">' + sg.shortGame.toFixed(1) + '</div><div class="v11-sl">Short</div></div>';
    html += '<div class="v11-stat"><div class="v11-sv" style="font-size:16px">' + sg.putting.toFixed(1) + '</div><div class="v11-sl">Putt</div></div>';
    html += '</div></div>';
  }

  html += '<div class="v11-card"><h4>&#x1F4C5; &#48372;&#44256;&#49436; &#49373;&#49457;</h4>';
  html += '<p>&#50500;&#47000; &#48260;&#53948;&#51012; &#45580;&#47084; Canvas &#44592;&#48152; &#51060;&#48120;&#51648; &#47532;&#54252;&#53944;&#47484; &#45796;&#50868;&#47196;&#46300;&#54616;&#49464;&#50836;.</p>';
  html += '<button class="v11-btn v11-btn-primary" style="width:100%;margin-top:10px;justify-content:center" onclick="v11GenerateReportCanvas()">&#x1F4E5; &#47532;&#54252;&#53944; &#45796;&#50868;&#47196;&#46300;</button>';
  html += '</div>';

  document.getElementById('v11ReportModal').innerHTML = html;
  ov.classList.add('active');
}

window.v11GenerateReportCanvas = function(){
  var canvas = document.createElement('canvas');
  canvas.width = 600; canvas.height = 400;
  var ctx = canvas.getContext('2d');

  var grad = ctx.createLinearGradient(0,0,600,400);
  grad.addColorStop(0,'#1a7a3a'); grad.addColorStop(1,'#0d4a22');
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.roundRect(0,0,600,400,20);
  ctx.fill();

  ctx.fillStyle = '#fff';
  ctx.font = 'bold 24px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('SmartGolf Report', 300, 45);

  ctx.font = '13px sans-serif';
  ctx.fillStyle = 'rgba(255,255,255,.7)';
  ctx.fillText(new Date().toLocaleDateString('ko-KR'), 300, 68);

  var stats = v11get('sg_analysis', {rounds:[]});
  var items = [
    {label:'Total Rounds', val: stats.rounds.length},
    {label:'Drills Done', val: Object.keys(drillProgress).length + '/12'},
    {label:'Buddies', val: friendsData.length},
    {label:'Achievements', val: v11get('achievements',[]).length}
  ];

  items.forEach(function(item, i){
    var x = 50 + (i % 2) * 270;
    var y = 100 + Math.floor(i / 2) * 100;
    ctx.fillStyle = 'rgba(255,255,255,.12)';
    ctx.beginPath(); ctx.roundRect(x,y,230,75,14); ctx.fill();
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 28px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(String(item.val), x+115, y+38);
    ctx.font = '12px sans-serif';
    ctx.fillStyle = 'rgba(255,255,255,.7)';
    ctx.fillText(item.label, x+115, y+58);
  });

  ctx.fillStyle = 'rgba(255,255,255,.5)';
  ctx.font = '11px sans-serif';
  ctx.fillText('Generated by SmartGolf v11.0', 300, 380);

  canvas.toBlob(function(blob){
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url; a.download = 'smartgolf-report-' + new Date().toISOString().slice(0,10) + '.png';
    a.click();
    URL.revokeObjectURL(url);
    v11toast('&#x1F4E5; &#47532;&#54252;&#53944;&#44032; &#45796;&#50868;&#47196;&#46300;&#46104;&#50632;&#49845;&#45768;&#45796;!', '&#x2705;');
  });
};

// ============================================================
// 10. AMBIENT SOUND (Course Nature Sounds via Web Audio)
// ============================================================
var ambientState = { playing: false, nodes: [] };

function createAmbientNoise(ctx, type){
  var bufferSize = ctx.sampleRate * 4;
  var buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  var data = buffer.getChannelData(0);

  if(type === 'wind'){
    for(var i=0;i<bufferSize;i++){
      data[i] = (Math.random()*2-1) * 0.03 * (1 + 0.5*Math.sin(i/ctx.sampleRate*0.3));
    }
  } else if(type === 'birds'){
    for(var i=0;i<bufferSize;i++){
      var t = i/ctx.sampleRate;
      var chirp = Math.sin(t*2000 + Math.sin(t*50)*10) * 0.02;
      var env = Math.max(0, Math.sin(t*2) * Math.sin(t*0.7));
      data[i] = chirp * env * (Math.random()>0.95?1:0.01);
    }
  } else {
    for(var i=0;i<bufferSize;i++){
      data[i] = (Math.random()*2-1) * 0.015;
    }
  }

  var source = ctx.createBufferSource();
  source.buffer = buffer;
  source.loop = true;

  var gain = ctx.createGain();
  gain.gain.setValueAtTime(0.4, ctx.currentTime);
  source.connect(gain);
  gain.connect(ctx.destination);
  source.start();
  return { source: source, gain: gain };
}

function toggleAmbient(){
  if(ambientState.playing){
    ambientState.nodes.forEach(function(n){ try{ n.source.stop(); }catch(e){} });
    ambientState.nodes = [];
    ambientState.playing = false;
    v11toast('&#x1F507; &#50544;&#48708;&#50616;&#53944; &#49324;&#50868;&#46300; &#51333;&#47308;', '&#x1F3CC;');
  } else {
    try {
      if(!v11Ctx) v11Ctx = new (window.AudioContext||window.webkitAudioContext)();
      ambientState.nodes.push(createAmbientNoise(v11Ctx, 'wind'));
      ambientState.nodes.push(createAmbientNoise(v11Ctx, 'birds'));
      ambientState.playing = true;
      v11toast('&#x1F3B5; &#53076;&#49828; &#50544;&#48708;&#50616;&#53944; &#49324;&#50868;&#46300; &#51116;&#49373;&#51473;...', '&#x1F333;');
    } catch(e){
      v11toast('&#50724;&#46356;&#50724; &#52488;&#44592;&#54868; &#49892;&#54056;', '&#x26A0;');
    }
  }
  v11sfx('ambient_toggle');
  updateAmbientButtons();
  v11checkAchievements();
}

function updateAmbientButtons(){
  document.querySelectorAll('.v11-ambient-btn').forEach(function(btn){
    if(ambientState.playing) btn.classList.add('playing');
    else btn.classList.remove('playing');
    btn.innerHTML = ambientState.playing ? '&#x1F507; &#50544;&#48708;&#50616;&#53944; &#51473;&#51648;' : '&#x1F333; &#53076;&#49828; &#50544;&#48708;&#50616;&#53944;';
  });
}

// ============================================================
// ACHIEVEMENT SYSTEM (10 new achievements)
// ============================================================
var v11Achievements = [
  { id:'sg_first_round', name:'&#52395; &#48516;&#49437;', desc:'&#49828;&#53944;&#47196;&#53356; &#44172;&#51064;&#46300; &#48516;&#49437; &#52395; &#46972;&#50868;&#46300; &#46321;&#47197;', check:function(){ return sgAnalysisData.rounds.length >= 1; } },
  { id:'sg_5_rounds', name:'&#45936;&#51060;&#53552; &#49688;&#51665;&#44032;', desc:'5&#46972;&#50868;&#46300; &#48516;&#49437; &#45936;&#51060;&#53552; &#52629;&#51201;', check:function(){ return sgAnalysisData.rounds.length >= 5; } },
  { id:'drill_3', name:'&#50672;&#49845;&#48268;&#47112;', desc:'3&#44060; &#46300;&#47540; &#50756;&#47308;', check:function(){ return Object.keys(drillProgress).filter(function(k){return drillProgress[k]>=3;}).length >= 3; } },
  { id:'drill_all', name:'&#46300;&#47540; &#47560;&#49828;&#53552;', desc:'12&#44060; &#46300;&#47540; &#47784;&#46160; &#50756;&#47308;', check:function(){ return Object.keys(drillProgress).filter(function(k){return drillProgress[k]>=3;}).length >= 12; } },
  { id:'friend_3', name:'&#49548;&#49500; &#47784;&#51076;', desc:'3&#47749; &#51060;&#49345; &#48260;&#46356; &#46321;&#47197;', check:function(){ return friendsData.length >= 3; } },
  { id:'friend_10', name:'&#49324;&#44368;&#50773;', desc:'10&#47749; &#51060;&#49345; &#48260;&#46356; &#46321;&#47197;', check:function(){ return friendsData.length >= 10; } },
  { id:'predict_first', name:'&#50696;&#50616;&#44032;', desc:'&#49828;&#53076;&#50612; &#50696;&#52769; &#52395; &#49324;&#50857;', check:function(){ return v11get('predict_used',false); } },
  { id:'equip_compare', name:'&#51109;&#48708; &#50672;&#44396;&#44032;', desc:'&#51109;&#48708; &#48708;&#44368; &#46020;&#44396; &#49324;&#50857;', check:function(){ return v11get('equip_used',false); } },
  { id:'ambient_first', name:'&#51088;&#50672;&#51064;', desc:'&#50544;&#48708;&#50616;&#53944; &#49324;&#50868;&#46300; &#52395; &#51116;&#49373;', check:function(){ return v11get('ambient_used',false); } },
  { id:'history_reader', name:'&#44264;&#54532; &#50669;&#49324;&#44032;', desc:'&#44264;&#54532; &#55176;&#49828;&#53664;&#47532; &#53440;&#51076;&#46972;&#51064; &#50676;&#46988;', check:function(){ return v11get('history_viewed',false); } }
];

var v11Unlocked = v11get('achievements', []);

function v11checkAchievements(){
  v11Achievements.forEach(function(a){
    if(v11Unlocked.indexOf(a.id) === -1 && a.check()){
      v11Unlocked.push(a.id);
      v11set('achievements', v11Unlocked);
      v11toast('&#x1F3C6; &#50629;&#51201; &#45804;&#49457;: ' + a.name, '&#x2B50;');
    }
  });
}

// ============================================================
// OVERLAY DOM CREATION
// ============================================================
var overlays = [
  {id:'v11SGOverlay', modal:'v11SGModal'},
  {id:'v11HoleOverlay', modal:'v11HoleModal'},
  {id:'v11GripOverlay', modal:'v11GripModal'},
  {id:'v11DrillOverlay', modal:'v11DrillModal'},
  {id:'v11PredictOverlay', modal:'v11PredictModal'},
  {id:'v11FriendOverlay', modal:'v11FriendModal'},
  {id:'v11EquipOverlay', modal:'v11EquipModal'},
  {id:'v11HistoryOverlay', modal:'v11HistoryModal'},
  {id:'v11ReportOverlay', modal:'v11ReportModal'}
];

overlays.forEach(function(o){
  var ov = document.createElement('div');
  ov.id = o.id;
  ov.className = 'v11-overlay';
  ov.setAttribute('role','dialog');
  ov.setAttribute('aria-modal','true');
  ov.innerHTML = '<div class="v11-modal" id="' + o.modal + '"></div>';
  ov.addEventListener('click', function(e){ if(e.target === ov) ov.classList.remove('active'); });
  document.body.appendChild(ov);
});

// ============================================================
// QUICK ACTION BUTTONS
// ============================================================
function injectQuickActions(){
  var container = document.querySelector('.search-section') || document.querySelector('.header');
  if(!container) return;

  var existing = document.getElementById('v11QuickActions');
  if(existing) return;

  var wrap = document.createElement('div');
  wrap.id = 'v11QuickActions';
  wrap.style.cssText = 'display:flex;gap:8px;flex-wrap:wrap;margin-top:12px;padding:0 20px;max-width:1400px;margin-left:auto;margin-right:auto';

  var buttons = [
    { label:'&#x1F4CA; SG &#48516;&#49437;', fn:'renderSGAnalysis' },
    { label:'&#x1F3CC; &#54848; &#47112;&#51060;&#50500;&#50883;', fn:'renderHoleLayouts' },
    { label:'&#x270B; &#44536;&#47549; &#44032;&#51060;&#46300;', fn:'renderGripGuide' },
    { label:'&#x1F3CB; &#46300;&#47540;', fn:'renderDrillLibrary' },
    { label:'&#x1F52E; &#49828;&#53076;&#50612; &#50696;&#52769;', fn:'renderScorePrediction' },
    { label:'&#x1F91D; &#48260;&#46356; &#47588;&#52845;', fn:'renderFriendMatching' },
    { label:'&#x2696; &#51109;&#48708; &#48708;&#44368;', fn:'renderEquipCompare' },
    { label:'&#x1F3DB; &#44264;&#54532; &#55176;&#49828;&#53664;&#47532;', fn:'renderGolfHistory' },
    { label:'&#x1F4CB; &#47532;&#54252;&#53944;', fn:'renderRoundReport' }
  ];

  buttons.forEach(function(b){
    var btn = document.createElement('button');
    btn.className = 'v11-btn v11-btn-sm v11-btn-secondary';
    btn.innerHTML = b.label;
    btn.addEventListener('click', function(){ window[b.fn](); });
    wrap.appendChild(btn);
  });

  var ambBtn = document.createElement('button');
  ambBtn.className = 'v11-ambient-btn';
  ambBtn.innerHTML = '&#x1F333; &#53076;&#49828; &#50544;&#48708;&#50616;&#53944;';
  ambBtn.addEventListener('click', function(){ toggleAmbient(); });
  wrap.appendChild(ambBtn);

  container.parentNode.insertBefore(wrap, container.nextSibling);
}

// ============================================================
// KEYBOARD SHORTCUTS (+5)
// ============================================================
document.addEventListener('keydown', function(e){
  var t = e.target.tagName;
  if(t === 'INPUT' || t === 'TEXTAREA' || t === 'SELECT') return;
  switch(e.key.toLowerCase()){
    case 'y': renderSGAnalysis(); break;
    case 'l': renderHoleLayouts(); break;
    case 'u': renderGripGuide(); break;
    case 'x': renderDrillLibrary(); break;
    case 'z': renderScorePrediction(); break;
  }
});

// ============================================================
// ESCAPE HANDLER
// ============================================================
document.addEventListener('keydown', function(e){
  if(e.key === 'Escape'){
    overlays.forEach(function(o){
      document.getElementById(o.id).classList.remove('active');
    });
  }
});

// ============================================================
// TRACKING for achievements
// ============================================================
var origRenderEquip = renderEquipCompare;
var _origEquip = renderEquipCompare;
renderEquipCompare = function(){
  v11set('equip_used', true);
  _origEquip();
};

var _origHistory = renderGolfHistory;
renderGolfHistory = function(){
  v11set('history_viewed', true);
  _origHistory();
};

var _origPredict = renderScorePrediction;
renderScorePrediction = function(){
  v11set('predict_used', true);
  _origPredict();
};

var _origAmbient = toggleAmbient;
toggleAmbient = function(){
  v11set('ambient_used', true);
  _origAmbient();
};

// ============================================================
// INIT
// ============================================================
setTimeout(function(){
  injectQuickActions();
  v11checkAchievements();
}, 800);

})();
