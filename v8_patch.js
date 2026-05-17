(function(){
'use strict';

// === SmartGolf v8.0 Patch ===
// 1. 코스 공략 가이드 (18홀 전략/클럽추천/위험지대)
// 2. 스윙 다이어리 (일별 연습기록/메모/목표설정)
// 3. 그린 리딩 가이드 (경사읽기/속도/AimPoint)
// 4. 장비 추천 시스템 (예산/실력별 맞춤 추천)
// 5. 토너먼트 모드 (대회생성/리더보드/핸디캡배분)
// 6. 멘탈 코칭 (프리샷루틴/호흡법/집중력)
// 7. 골프 에티켓 가이드 (초보~고급 25개 매너)
// 8. 계절별 코스 컨디션 (잔디/그린속도/추천시간대)
// 9. Web Audio 효과음 (성취/알림/전환)
// 10. 라운드 타임라인 (홀별 시간추적/페이스관리)

// --- CSS Injection ---
var css8 = document.createElement('style');
css8.textContent = `
/* === v8 Overlay/Modal Base === */
.v8-overlay{position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,.7);z-index:10004;display:none;align-items:center;justify-content:center;backdrop-filter:blur(6px)}
.v8-overlay.active{display:flex}
.v8-modal{background:var(--card-bg,#fff);border-radius:22px;padding:26px;width:95%;max-width:600px;max-height:90vh;overflow-y:auto;box-shadow:0 28px 90px rgba(0,0,0,.4);animation:v8Pop .35s cubic-bezier(.34,1.56,.64,1)}
@keyframes v8Pop{from{opacity:0;transform:scale(.92) translateY(30px)}to{opacity:1;transform:scale(1) translateY(0)}}
.v8-modal-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:18px}
.v8-modal-header h2{font-size:20px;font-weight:800;display:flex;align-items:center;gap:8px}
.v8-modal-header h2 .v8-emoji{font-size:24px}
.v8-close{background:none;border:none;font-size:24px;cursor:pointer;color:var(--text-muted);padding:4px 10px;border-radius:8px;transition:.2s}
.v8-close:hover{background:var(--border);color:var(--text)}
.v8-tabs{display:flex;gap:6px;margin-bottom:16px;overflow-x:auto;padding-bottom:4px;scrollbar-width:none}
.v8-tabs::-webkit-scrollbar{display:none}
.v8-tab{padding:8px 16px;border-radius:22px;border:1.5px solid var(--border);background:var(--bg);font-size:12px;font-weight:600;cursor:pointer;white-space:nowrap;transition:.2s}
.v8-tab.active{background:var(--primary);color:#fff;border-color:var(--primary);box-shadow:0 2px 8px rgba(26,122,58,.3)}
.v8-card{background:var(--bg);border-radius:14px;padding:16px;margin-bottom:10px;transition:.2s;border:1px solid transparent}
.v8-card:hover{border-color:var(--primary);transform:translateY(-1px)}
.v8-card h4{font-size:14px;font-weight:700;margin-bottom:6px}
.v8-card p{font-size:12px;color:var(--text-muted);line-height:1.5}
.v8-btn{padding:10px 20px;border:none;border-radius:12px;font-size:13px;font-weight:700;cursor:pointer;transition:.2s}
.v8-btn-primary{background:linear-gradient(135deg,var(--primary),#2e8b4a);color:#fff}
.v8-btn-primary:hover{transform:translateY(-2px);box-shadow:0 6px 16px rgba(26,122,58,.35)}
.v8-btn-secondary{background:var(--bg);color:var(--text);border:1.5px solid var(--border)}
.v8-btn-danger{background:linear-gradient(135deg,#e53935,#d32f2f);color:#fff}
.v8-input{width:100%;padding:10px 14px;border:2px solid var(--border);border-radius:10px;font-size:13px;background:var(--bg);color:var(--text);transition:.2s}
.v8-input:focus{border-color:var(--primary);outline:none}
.v8-textarea{width:100%;padding:10px 14px;border:2px solid var(--border);border-radius:10px;font-size:13px;background:var(--bg);color:var(--text);min-height:80px;resize:vertical;font-family:inherit}
.v8-textarea:focus{border-color:var(--primary);outline:none}
.v8-badge{display:inline-block;padding:3px 10px;border-radius:12px;font-size:11px;font-weight:700}
.v8-badge-green{background:#e8f5e9;color:#2e7d32}
.v8-badge-blue{background:#e3f2fd;color:#1565c0}
.v8-badge-orange{background:#fff3e0;color:#e65100}
.v8-badge-red{background:#fce4ec;color:#c62828}
.v8-badge-purple{background:#f3e5f5;color:#7b1fa2}
[data-theme="dark"] .v8-badge-green{background:#1a3a25;color:#7bed9f}
[data-theme="dark"] .v8-badge-blue{background:#1a2a3a;color:#7ab8f5}
[data-theme="dark"] .v8-badge-orange{background:#3a2a1a;color:#f0c070}
[data-theme="dark"] .v8-badge-red{background:#3a1a1a;color:#ff8a80}
[data-theme="dark"] .v8-badge-purple{background:#2a1a3a;color:#ce93d8}
.v8-progress{width:100%;height:8px;background:var(--border);border-radius:4px;overflow:hidden;margin:8px 0}
.v8-progress-bar{height:100%;background:linear-gradient(90deg,var(--primary),#7bed9f);border-radius:4px;transition:width .4s ease}
.v8-grid2{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.v8-grid3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px}
@media(max-width:500px){.v8-grid2,.v8-grid3{grid-template-columns:1fr}}
.v8-divider{height:1px;background:var(--border);margin:16px 0}
.v8-list-item{display:flex;align-items:center;gap:12px;padding:12px;border-radius:12px;background:var(--bg);margin-bottom:8px;cursor:pointer;transition:.2s}
.v8-list-item:hover{background:var(--primary-light);transform:translateX(4px)}
.v8-list-item .v8-li-icon{width:40px;height:40px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:20px;flex-shrink:0}
.v8-list-item .v8-li-text{flex:1}
.v8-list-item .v8-li-title{font-weight:700;font-size:13px}
.v8-list-item .v8-li-sub{font-size:11px;color:var(--text-muted);margin-top:2px}
.v8-list-item .v8-li-arrow{color:var(--text-muted);font-size:14px}
.v8-empty{text-align:center;padding:40px 20px;color:var(--text-muted)}
.v8-empty .v8-empty-icon{font-size:48px;margin-bottom:12px;opacity:.5}
.v8-empty p{font-size:13px;line-height:1.6}

/* Quick Actions v8 extension */
.v8-quick-row{display:flex;gap:8px;flex-wrap:wrap;justify-content:center;margin:8px 0}
.v8-qbtn{display:flex;flex-direction:column;align-items:center;gap:3px;padding:10px 12px;border-radius:12px;background:var(--card-bg);border:1.5px solid var(--border);cursor:pointer;transition:.2s;font-size:10px;font-weight:700;color:var(--text);min-width:64px;text-align:center}
.v8-qbtn:hover{border-color:var(--primary);background:var(--primary-light);transform:translateY(-3px);box-shadow:0 4px 12px rgba(26,122,58,.15)}
.v8-qbtn .v8-qi{font-size:22px;line-height:1}

/* Course Strategy */
.cs-hole{display:flex;align-items:center;gap:12px;padding:14px;border-radius:14px;background:var(--bg);margin-bottom:8px;transition:.2s}
.cs-hole:hover{background:var(--primary-light)}
.cs-hole .cs-num{width:38px;height:38px;border-radius:50%;background:linear-gradient(135deg,var(--primary),#2e8b4a);color:#fff;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:14px;flex-shrink:0}
.cs-hole .cs-info{flex:1}
.cs-hole .cs-par{font-size:11px;color:var(--text-muted)}
.cs-hole .cs-tip{font-size:12px;font-weight:600;margin-top:2px;line-height:1.4}
.cs-hole .cs-club{margin-top:4px;display:flex;gap:4px;flex-wrap:wrap}
.cs-hole .cs-club span{padding:2px 8px;border-radius:8px;font-size:10px;font-weight:600;background:#e3f2fd;color:#1565c0}
[data-theme="dark"] .cs-hole .cs-club span{background:#1a2a3a;color:#7ab8f5}
.cs-danger{margin-top:4px;font-size:11px;color:#e53935;display:flex;align-items:center;gap:4px}

/* Swing Diary */
.sd-entry{background:var(--bg);border-radius:14px;padding:14px;margin-bottom:10px;border-left:4px solid var(--primary)}
.sd-entry .sd-date{font-size:11px;color:var(--text-muted);margin-bottom:4px}
.sd-entry .sd-title{font-weight:700;font-size:14px;margin-bottom:6px}
.sd-entry .sd-body{font-size:12px;color:var(--text-muted);line-height:1.5}
.sd-entry .sd-tags{display:flex;gap:4px;flex-wrap:wrap;margin-top:8px}
.sd-entry .sd-tags span{padding:2px 8px;border-radius:8px;font-size:10px;background:var(--primary-light);color:var(--primary-dark)}
.sd-goal{background:linear-gradient(135deg,#f0f8ff,#e8f5e9);border-radius:14px;padding:16px;margin-bottom:16px;border:1px solid #c8e6c9}
[data-theme="dark"] .sd-goal{background:linear-gradient(135deg,#1a2a20,#1e3a25);border-color:#2e5a35}
.sd-goal h4{font-size:14px;font-weight:700;margin-bottom:8px;color:var(--primary)}

/* Green Reading */
.gr-visual{position:relative;width:100%;aspect-ratio:1;background:linear-gradient(180deg,#4caf50 0%,#388e3c 30%,#2e7d32 60%,#1b5e20 100%);border-radius:50%;margin:16px auto;max-width:260px;overflow:hidden;box-shadow:inset 0 4px 20px rgba(0,0,0,.3)}
.gr-visual .gr-hole{position:absolute;top:50%;left:50%;width:16px;height:16px;background:#111;border-radius:50%;transform:translate(-50%,-50%);box-shadow:0 0 8px rgba(0,0,0,.5)}
.gr-visual .gr-flag{position:absolute;top:calc(50% - 30px);left:calc(50% + 2px);width:2px;height:30px;background:#fff}
.gr-visual .gr-flag::after{content:'';position:absolute;top:0;left:2px;width:14px;height:10px;background:#e53935;clip-path:polygon(0 0,100% 50%,0 100%)}
.gr-visual .gr-arrow{position:absolute;font-size:20px;color:rgba(255,255,255,.8);animation:grPulse 2s infinite}
@keyframes grPulse{0%,100%{opacity:.5;transform:scale(.9)}50%{opacity:1;transform:scale(1.1)}}
.gr-tip-card{background:var(--bg);border-radius:12px;padding:14px;margin-bottom:8px}
.gr-tip-card h5{font-size:13px;font-weight:700;margin-bottom:6px;display:flex;align-items:center;gap:6px}
.gr-tip-card p{font-size:12px;color:var(--text-muted);line-height:1.5}

/* Equipment */
.eq-item{display:flex;gap:14px;padding:14px;border-radius:14px;background:var(--bg);margin-bottom:10px;align-items:center}
.eq-item .eq-icon{width:48px;height:48px;border-radius:12px;background:linear-gradient(135deg,#e8f5e9,#c8e6c9);display:flex;align-items:center;justify-content:center;font-size:24px;flex-shrink:0}
[data-theme="dark"] .eq-item .eq-icon{background:linear-gradient(135deg,#1a3a25,#2e5a35)}
.eq-item .eq-info{flex:1}
.eq-item .eq-name{font-weight:700;font-size:14px}
.eq-item .eq-brand{font-size:11px;color:var(--text-muted)}
.eq-item .eq-price{font-size:13px;font-weight:700;color:var(--primary);margin-top:2px}
.eq-item .eq-level{font-size:10px;padding:2px 8px;border-radius:8px;font-weight:600}

/* Tournament */
.tn-card{background:linear-gradient(135deg,#1a7a3a,#0f5a28);border-radius:16px;padding:18px;color:#fff;margin-bottom:14px;position:relative;overflow:hidden}
.tn-card::after{content:'';position:absolute;top:-30%;right:-20%;width:60%;height:160%;background:rgba(255,255,255,.05);border-radius:50%;transform:rotate(-15deg)}
.tn-card h3{font-size:18px;font-weight:800;margin-bottom:6px}
.tn-card .tn-meta{font-size:12px;opacity:.85;margin-bottom:12px}
.tn-card .tn-players{display:flex;gap:-8px}
.tn-card .tn-avatar{width:32px;height:32px;border-radius:50%;background:rgba(255,255,255,.2);border:2px solid rgba(255,255,255,.5);display:flex;align-items:center;justify-content:center;font-size:14px;margin-left:-8px}
.tn-card .tn-avatar:first-child{margin-left:0}
.tn-leaderboard{background:var(--bg);border-radius:12px;overflow:hidden}
.tn-lb-row{display:flex;align-items:center;padding:12px 14px;border-bottom:1px solid var(--border);gap:12px}
.tn-lb-row:last-child{border-bottom:none}
.tn-lb-rank{width:28px;height:28px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:12px;flex-shrink:0}
.tn-lb-rank.gold{background:#ffd700;color:#5d4037}
.tn-lb-rank.silver{background:#bdbdbd;color:#424242}
.tn-lb-rank.bronze{background:#cd7f32;color:#fff}
.tn-lb-rank.normal{background:var(--border);color:var(--text-muted)}
.tn-lb-name{flex:1;font-weight:600;font-size:13px}
.tn-lb-score{font-weight:800;font-size:14px;color:var(--primary)}

/* Mental Coaching */
.mc-breath{display:flex;align-items:center;justify-content:center;margin:20px 0}
.mc-circle{width:120px;height:120px;border-radius:50%;background:linear-gradient(135deg,#e8f5e9,#c8e6c9);display:flex;align-items:center;justify-content:center;font-size:16px;font-weight:700;color:var(--primary);border:3px solid var(--primary);transition:all 1s ease}
.mc-circle.inhale{transform:scale(1.3);background:linear-gradient(135deg,#c8e6c9,#a5d6a7)}
.mc-circle.exhale{transform:scale(0.8);background:linear-gradient(135deg,#f1f8e9,#dcedc8)}
[data-theme="dark"] .mc-circle{background:linear-gradient(135deg,#1a3a25,#2e5a35);border-color:#7bed9f}
.mc-routine{counter-reset:step}
.mc-routine .mc-step{position:relative;padding:12px 12px 12px 50px;border-radius:12px;background:var(--bg);margin-bottom:8px;font-size:13px;line-height:1.5}
.mc-routine .mc-step::before{counter-increment:step;content:counter(step);position:absolute;left:12px;top:50%;transform:translateY(-50%);width:28px;height:28px;border-radius:50%;background:var(--primary);color:#fff;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:12px}

/* Etiquette */
.et-item{display:flex;gap:12px;padding:14px;border-radius:14px;background:var(--bg);margin-bottom:8px;align-items:flex-start}
.et-item .et-num{width:32px;height:32px;border-radius:10px;background:var(--primary);color:#fff;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:12px;flex-shrink:0}
.et-item .et-text{flex:1}
.et-item .et-title{font-weight:700;font-size:13px;margin-bottom:4px}
.et-item .et-desc{font-size:12px;color:var(--text-muted);line-height:1.5}
.et-item .et-level{font-size:10px;padding:2px 8px;border-radius:8px;font-weight:600;margin-top:6px;display:inline-block}

/* Season Condition */
.sc-season-tabs{display:flex;gap:6px;margin-bottom:16px}
.sc-season-tab{flex:1;padding:10px;border-radius:12px;text-align:center;cursor:pointer;border:1.5px solid var(--border);transition:.2s;font-size:12px;font-weight:700}
.sc-season-tab.active{border-color:var(--primary);background:var(--primary-light);color:var(--primary)}
.sc-meter{display:flex;align-items:center;gap:10px;padding:10px;border-radius:10px;background:var(--bg);margin-bottom:8px}
.sc-meter .sc-label{width:80px;font-size:12px;font-weight:600;flex-shrink:0}
.sc-meter .sc-bar{flex:1;height:10px;background:var(--border);border-radius:5px;overflow:hidden}
.sc-meter .sc-fill{height:100%;border-radius:5px;transition:width .5s ease}
.sc-meter .sc-val{width:40px;text-align:right;font-size:12px;font-weight:700;color:var(--primary)}

/* Timeline */
.tl-hole{display:flex;align-items:center;gap:10px;padding:10px 14px;border-radius:10px;margin-bottom:4px;background:var(--bg);font-size:12px}
.tl-hole .tl-num{width:28px;height:28px;border-radius:50%;background:var(--primary);color:#fff;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:11px;flex-shrink:0}
.tl-hole .tl-time{font-weight:700;color:var(--primary);min-width:50px}
.tl-hole .tl-pace{padding:2px 8px;border-radius:8px;font-size:10px;font-weight:700}
.tl-hole .tl-pace.fast{background:#e8f5e9;color:#2e7d32}
.tl-hole .tl-pace.ok{background:#fff8e1;color:#f57f17}
.tl-hole .tl-pace.slow{background:#fce4ec;color:#c62828}
`;
document.head.appendChild(css8);

// === Web Audio SFX Engine ===
var v8Ctx = null;
function v8InitAudio() {
  if (!v8Ctx) {
    try { v8Ctx = new (window.AudioContext || window.webkitAudioContext)(); } catch(e) {}
  }
  return v8Ctx;
}
function v8Sfx(type) {
  var ctx = v8InitAudio();
  if (!ctx) return;
  var osc = ctx.createOscillator();
  var gain = ctx.createGain();
  osc.connect(gain);
  gain.connect(ctx.destination);
  var t = ctx.currentTime;
  switch(type) {
    case 'success':
      osc.type = 'sine';
      osc.frequency.setValueAtTime(523, t);
      osc.frequency.setValueAtTime(659, t+0.1);
      osc.frequency.setValueAtTime(784, t+0.2);
      gain.gain.setValueAtTime(0.15, t);
      gain.gain.exponentialRampToValueAtTime(0.01, t+0.4);
      osc.start(t); osc.stop(t+0.4);
      break;
    case 'click':
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1000, t);
      gain.gain.setValueAtTime(0.08, t);
      gain.gain.exponentialRampToValueAtTime(0.01, t+0.08);
      osc.start(t); osc.stop(t+0.08);
      break;
    case 'notify':
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(880, t);
      osc.frequency.setValueAtTime(1100, t+0.08);
      gain.gain.setValueAtTime(0.12, t);
      gain.gain.exponentialRampToValueAtTime(0.01, t+0.2);
      osc.start(t); osc.stop(t+0.2);
      break;
    case 'achieve':
      osc.type = 'sine';
      osc.frequency.setValueAtTime(392, t);
      osc.frequency.setValueAtTime(523, t+0.12);
      osc.frequency.setValueAtTime(659, t+0.24);
      osc.frequency.setValueAtTime(784, t+0.36);
      gain.gain.setValueAtTime(0.18, t);
      gain.gain.exponentialRampToValueAtTime(0.01, t+0.6);
      osc.start(t); osc.stop(t+0.6);
      break;
    case 'timer':
      osc.type = 'square';
      osc.frequency.setValueAtTime(660, t);
      gain.gain.setValueAtTime(0.06, t);
      gain.gain.exponentialRampToValueAtTime(0.01, t+0.12);
      osc.start(t); osc.stop(t+0.12);
      break;
  }
}

// === Utilities ===
function v8Toast(msg, type) {
  v8Sfx('notify');
  var t = document.createElement('div');
  t.className = 'v7-toast ' + (type||'info');
  t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(function(){ t.remove(); }, 2800);
}

function v8CreateOverlay(id) {
  var ov = document.createElement('div');
  ov.className = 'v8-overlay';
  ov.id = id;
  ov.addEventListener('click', function(e){ if(e.target===ov){ ov.classList.remove('active'); } });
  document.body.appendChild(ov);
  return ov;
}

function v8CreateModal(overlay) {
  var m = document.createElement('div');
  m.className = 'v8-modal';
  overlay.appendChild(m);
  return m;
}

// ====================================================================
// 1. COURSE STRATEGY GUIDE (코스 공략 가이드)
// ====================================================================
var csOverlay = v8CreateOverlay('v8CsOverlay');
var csModal = v8CreateModal(csOverlay);

var courseStrategies = [
  {hole:1,par:4,dist:380,tip:'페어웨이 우측 공략. 좌측 벙커 주의.',clubs:['드라이버','7번 아이언'],danger:'좌측 페어웨이 벙커 2개'},
  {hole:2,par:3,dist:165,tip:'핀 위치 확인 후 클럽 선택. 바람 영향 큼.',clubs:['6번 아이언','7번 아이언'],danger:'그린 앞 워터해저드'},
  {hole:3,par:5,dist:520,tip:'레이업 전략 추천. 2온 무리하지 말 것.',clubs:['드라이버','5번 우드','웨지'],danger:'세컨샷 우측 OB'},
  {hole:4,par:4,dist:400,tip:'도그렉 좌. 코너 넘기려면 250m+ 캐리 필요.',clubs:['드라이버','8번 아이언'],danger:'좌측 수목 OB 라인'},
  {hole:5,par:4,dist:360,tip:'짧은 파4. 정확성 우선. 3번 우드도 고려.',clubs:['3번 우드','PW'],danger:'그린 좌측 깊은 벙커'},
  {hole:6,par:3,dist:185,tip:'맞바람 시 1클럽 UP. 그린 뒤 경사 심함.',clubs:['5번 아이언','유틸'],danger:'그린 뒤쪽 급경사'},
  {hole:7,par:5,dist:540,tip:'2타째 워터 넘기기 도전 시 230m+ 필요.',clubs:['드라이버','3번 우드','웨지'],danger:'2nd~3rd 사이 연못'},
  {hole:8,par:4,dist:410,tip:'오르막 홀. 실제 거리 +10m 감안.',clubs:['드라이버','6번 아이언'],danger:'페어웨이 중앙 나무'},
  {hole:9,par:4,dist:390,tip:'내리막. 런 많이 남. 드라이버 자제도 OK.',clubs:['3번 우드','9번 아이언'],danger:'그린 앞 크릭'},
  {hole:10,par:4,dist:375,tip:'후반 시작. 워밍업 스윙 권장. 안전 공략.',clubs:['드라이버','8번 아이언'],danger:'좌측 OB'},
  {hole:11,par:5,dist:510,tip:'짧은 파5. 이글 기회. 적극 공략 가능.',clubs:['드라이버','5번 아이언'],danger:'그린 주변 3면 벙커'},
  {hole:12,par:3,dist:155,tip:'숏홀이지만 바람 골 심함. 클럽 +/-1 판단.',clubs:['8번 아이언','9번 아이언'],danger:'좌측 워터해저드'},
  {hole:13,par:4,dist:420,tip:'긴 파4. 투온 어려우면 레이업 후 어프로치.',clubs:['드라이버','5번 아이언'],danger:'페어웨이 우측 벙커'},
  {hole:14,par:4,dist:350,tip:'짧지만 그린 어려움. 핀 위치가 핵심.',clubs:['3번 우드','PW'],danger:'그린 3단 포텐셜'},
  {hole:15,par:5,dist:550,tip:'시그니처 홀. 경관 좋지만 집중력 유지.',clubs:['드라이버','3번 우드','웨지'],danger:'우측 전체 워터'},
  {hole:16,par:3,dist:200,tip:'긴 파3. 유틸/우드 사용. 그린 히트가 목표.',clubs:['유틸리티','5번 우드'],danger:'그린 미스 시 깊은 러프'},
  {hole:17,par:4,dist:405,tip:'승부처. 공격적 티샷 후 정확한 세컨드.',clubs:['드라이버','7번 아이언'],danger:'좌우 벙커 협소 페어웨이'},
  {hole:18,par:4,dist:430,tip:'마지막 홀. 긴 거리. 보기 OK 마인드.',clubs:['드라이버','5번 아이언'],danger:'그린 앞 대형 벙커'}
];

function renderCourseStrategy() {
  var html = '<div class="v8-modal-header"><h2><span class="v8-emoji">&#x26F3;</span> 코스 공략 가이드</h2><button class="v8-close" onclick="document.getElementById(\'v8CsOverlay\').classList.remove(\'active\')">&times;</button></div>';
  html += '<p style="font-size:12px;color:var(--text-muted);margin-bottom:16px">18홀 전략 가이드. 각 홀별 추천 클럽과 위험 지역을 확인하세요.</p>';
  html += '<div class="v8-tabs"><div class="v8-tab active" data-cs="all">전체</div><div class="v8-tab" data-cs="front">전반 (1~9)</div><div class="v8-tab" data-cs="back">후반 (10~18)</div><div class="v8-tab" data-cs="par3">파3</div><div class="v8-tab" data-cs="par5">파5</div></div>';
  html += '<div id="v8CsHoles">';
  courseStrategies.forEach(function(h){
    html += '<div class="cs-hole" data-hole="'+h.hole+'" data-par="'+h.par+'">';
    html += '<div class="cs-num">'+h.hole+'</div>';
    html += '<div class="cs-info">';
    html += '<div class="cs-par">Par '+h.par+' &middot; '+h.dist+'m</div>';
    html += '<div class="cs-tip">'+h.tip+'</div>';
    html += '<div class="cs-club">'+h.clubs.map(function(c){return '<span>'+c+'</span>';}).join('')+'</div>';
    html += '<div class="cs-danger">&#x26A0;&#xFE0F; '+h.danger+'</div>';
    html += '</div></div>';
  });
  html += '</div>';
  csModal.innerHTML = html;
  csOverlay.classList.add('active');
  v8Sfx('click');

  csModal.querySelectorAll('.v8-tab').forEach(function(tab){
    tab.addEventListener('click', function(){
      csModal.querySelectorAll('.v8-tab').forEach(function(t){t.classList.remove('active');});
      tab.classList.add('active');
      var filter = tab.dataset.cs;
      csModal.querySelectorAll('.cs-hole').forEach(function(h){
        var hole = parseInt(h.dataset.hole);
        var par = parseInt(h.dataset.par);
        if(filter==='all') h.style.display='';
        else if(filter==='front') h.style.display = hole<=9?'':'none';
        else if(filter==='back') h.style.display = hole>9?'':'none';
        else if(filter==='par3') h.style.display = par===3?'':'none';
        else if(filter==='par5') h.style.display = par===5?'':'none';
      });
    });
  });
}

// ====================================================================
// 2. SWING DIARY (스윙 다이어리)
// ====================================================================
var sdOverlay = v8CreateOverlay('v8SdOverlay');
var sdModal = v8CreateModal(sdOverlay);

function getSwingDiary() { return JSON.parse(localStorage.getItem('sg_swing_diary')||'[]'); }
function saveSwingDiary(d) { localStorage.setItem('sg_swing_diary', JSON.stringify(d)); }
function getSwingGoal() { return JSON.parse(localStorage.getItem('sg_swing_goal')||'null'); }
function saveSwingGoal(g) { localStorage.setItem('sg_swing_goal', JSON.stringify(g)); }

function renderSwingDiary() {
  var entries = getSwingDiary();
  var goal = getSwingGoal();
  var html = '<div class="v8-modal-header"><h2><span class="v8-emoji">&#x1F4D3;</span> 스윙 다이어리</h2><button class="v8-close" onclick="document.getElementById(\'v8SdOverlay\').classList.remove(\'active\')">&times;</button></div>';

  // Goal section
  html += '<div class="sd-goal"><h4>&#x1F3AF; 이번 달 목표</h4>';
  if (goal) {
    html += '<p style="font-size:13px;margin-bottom:8px">'+goal.text+'</p>';
    var progress = Math.min(100, Math.round((entries.length / (goal.target||10))*100));
    html += '<div class="v8-progress"><div class="v8-progress-bar" style="width:'+progress+'%"></div></div>';
    html += '<p style="font-size:11px;color:var(--text-muted)">'+entries.length+'/'+goal.target+' 연습 완료 ('+progress+'%)</p>';
  } else {
    html += '<p style="font-size:12px;color:var(--text-muted)">목표를 설정하면 연습 동기부여가 됩니다.</p>';
  }
  html += '<button class="v8-btn v8-btn-secondary" style="margin-top:8px;font-size:11px" id="v8SetGoal">목표 설정</button>';
  html += '</div>';

  // Add entry button
  html += '<div style="display:flex;gap:8px;margin-bottom:16px"><button class="v8-btn v8-btn-primary" id="v8AddDiary">+ 연습 기록 추가</button></div>';

  // Entries
  if (entries.length === 0) {
    html += '<div class="v8-empty"><div class="v8-empty-icon">&#x1F3CC;&#xFE0F;</div><p>아직 기록이 없습니다.<br>오늘 연습을 기록해보세요!</p></div>';
  } else {
    entries.slice().reverse().forEach(function(e, i){
      html += '<div class="sd-entry">';
      html += '<div class="sd-date">'+e.date+'</div>';
      html += '<div class="sd-title">'+e.title+'</div>';
      html += '<div class="sd-body">'+e.body+'</div>';
      if(e.tags && e.tags.length) {
        html += '<div class="sd-tags">'+e.tags.map(function(t){return '<span>'+t+'</span>';}).join('')+'</div>';
      }
      html += '</div>';
    });
  }
  sdModal.innerHTML = html;
  sdOverlay.classList.add('active');
  v8Sfx('click');

  document.getElementById('v8AddDiary').addEventListener('click', showAddDiaryForm);
  document.getElementById('v8SetGoal').addEventListener('click', showGoalForm);
}

function showAddDiaryForm() {
  var today = new Date().toISOString().split('T')[0];
  sdModal.innerHTML = '<div class="v8-modal-header"><h2><span class="v8-emoji">&#x270F;&#xFE0F;</span> 연습 기록</h2><button class="v8-close" onclick="document.getElementById(\'v8SdOverlay\').classList.remove(\'active\')">&times;</button></div>';
  sdModal.innerHTML += '<div style="margin-bottom:12px"><label style="font-size:12px;font-weight:600;display:block;margin-bottom:4px">날짜</label><input type="date" class="v8-input" id="v8DiaryDate" value="'+today+'"></div>';
  sdModal.innerHTML += '<div style="margin-bottom:12px"><label style="font-size:12px;font-weight:600;display:block;margin-bottom:4px">제목</label><input class="v8-input" id="v8DiaryTitle" placeholder="예: 드라이버 연습 50구"></div>';
  sdModal.innerHTML += '<div style="margin-bottom:12px"><label style="font-size:12px;font-weight:600;display:block;margin-bottom:4px">내용</label><textarea class="v8-textarea" id="v8DiaryBody" placeholder="오늘 연습 내용, 느낀점, 개선사항 등"></textarea></div>';
  sdModal.innerHTML += '<div style="margin-bottom:16px"><label style="font-size:12px;font-weight:600;display:block;margin-bottom:4px">태그 (쉼표 구분)</label><input class="v8-input" id="v8DiaryTags" placeholder="드라이버, 슬라이스교정, 실내연습"></div>';
  sdModal.innerHTML += '<div style="display:flex;gap:8px"><button class="v8-btn v8-btn-primary" id="v8SaveDiary">저장</button><button class="v8-btn v8-btn-secondary" id="v8CancelDiary">취소</button></div>';

  document.getElementById('v8SaveDiary').addEventListener('click', function(){
    var d = getSwingDiary();
    var title = document.getElementById('v8DiaryTitle').value.trim();
    var body = document.getElementById('v8DiaryBody').value.trim();
    if(!title) { v8Toast('제목을 입력하세요', 'warn'); return; }
    d.push({
      date: document.getElementById('v8DiaryDate').value,
      title: title,
      body: body,
      tags: document.getElementById('v8DiaryTags').value.split(',').map(function(s){return s.trim();}).filter(Boolean)
    });
    saveSwingDiary(d);
    v8Toast('연습 기록이 저장되었습니다!', 'success');
    v8Sfx('success');
    renderSwingDiary();
  });
  document.getElementById('v8CancelDiary').addEventListener('click', renderSwingDiary);
}

function showGoalForm() {
  var goal = getSwingGoal();
  sdModal.innerHTML = '<div class="v8-modal-header"><h2><span class="v8-emoji">&#x1F3AF;</span> 월간 목표 설정</h2><button class="v8-close" onclick="document.getElementById(\'v8SdOverlay\').classList.remove(\'active\')">&times;</button></div>';
  sdModal.innerHTML += '<div style="margin-bottom:12px"><label style="font-size:12px;font-weight:600;display:block;margin-bottom:4px">목표 내용</label><input class="v8-input" id="v8GoalText" value="'+(goal?goal.text:'')+'" placeholder="예: 이번 달 연습장 10회 방문"></div>';
  sdModal.innerHTML += '<div style="margin-bottom:16px"><label style="font-size:12px;font-weight:600;display:block;margin-bottom:4px">목표 횟수</label><input type="number" class="v8-input" id="v8GoalTarget" value="'+(goal?goal.target:10)+'" min="1" max="50"></div>';
  sdModal.innerHTML += '<button class="v8-btn v8-btn-primary" id="v8SaveGoal">저장</button>';

  document.getElementById('v8SaveGoal').addEventListener('click', function(){
    var text = document.getElementById('v8GoalText').value.trim();
    var target = parseInt(document.getElementById('v8GoalTarget').value)||10;
    if(!text) { v8Toast('목표를 입력하세요', 'warn'); return; }
    saveSwingGoal({text:text, target:target, month: new Date().getMonth()});
    v8Toast('목표가 설정되었습니다!', 'success');
    v8Sfx('achieve');
    renderSwingDiary();
  });
}

// ====================================================================
// 3. GREEN READING GUIDE (그린 리딩 가이드)
// ====================================================================
var grOverlay = v8CreateOverlay('v8GrOverlay');
var grModal = v8CreateModal(grOverlay);

var greenTips = [
  {title:'발바닥 경사 읽기',desc:'그린 위에서 발바닥으로 미세한 경사를 느껴보세요. 한쪽 발이 높으면 그 반대로 공이 굴러갑니다.'},
  {title:'AimPoint 기법',desc:'그린 뒤에서 홀을 보며 손가락으로 경사를 측정합니다. 1% 경사 = 손가락 1개 너비만큼 보정.'},
  {title:'그린 스피드 체크',desc:'연습그린에서 3m 퍼팅을 해보세요. 홀을 30~50cm 지나가는 세기가 최적입니다.'},
  {title:'오르막 vs 내리막',desc:'오르막: 홀 뒤쪽 목표, 강하게. 내리막: 홀 앞쪽 목표, 부드럽게 터치.'},
  {title:'좌우 경사 보정',desc:'브레이크 1m 예상 시 홀 반대편 1m에 에이밍. 속도가 느릴수록 휨이 큽니다.'},
  {title:'잔디결 읽기',desc:'홀 주변 잔디를 관찰하세요. 밝게 보이면 순결(빠름), 어둡게 보이면 역결(느림).'},
  {title:'비 온 뒤 그린',desc:'비 후에는 그린이 무거워집니다. 평소보다 1~2m 더 강하게 치세요.'},
  {title:'핀 위치별 전략',desc:'핀이 앞쪽: 숏사이드 노려도 OK. 핀이 뒤쪽: 오버 금물, 센터 공략.'}
];

function renderGreenReading() {
  var html = '<div class="v8-modal-header"><h2><span class="v8-emoji">&#x1F7E2;</span> 그린 리딩 가이드</h2><button class="v8-close" onclick="document.getElementById(\'v8GrOverlay\').classList.remove(\'active\')">&times;</button></div>';
  html += '<div class="gr-visual"><div class="gr-hole"></div><div class="gr-flag"></div>';
  html += '<span class="gr-arrow" style="top:25%;left:45%">&#x2B07;&#xFE0F;</span>';
  html += '<span class="gr-arrow" style="top:60%;left:70%">&#x2B05;&#xFE0F;</span>';
  html += '<span class="gr-arrow" style="top:70%;left:30%">&#x2197;&#xFE0F;</span>';
  html += '</div>';
  html += '<p style="text-align:center;font-size:12px;color:var(--text-muted);margin-bottom:20px">그린 경사와 브레이크를 읽는 핵심 팁</p>';
  html += '<div class="v8-divider"></div>';
  greenTips.forEach(function(tip){
    html += '<div class="gr-tip-card"><h5>&#x1F4A1; '+tip.title+'</h5><p>'+tip.desc+'</p></div>';
  });
  grModal.innerHTML = html;
  grOverlay.classList.add('active');
  v8Sfx('click');
}

// ====================================================================
// 4. EQUIPMENT RECOMMENDATION (장비 추천 시스템)
// ====================================================================
var eqOverlay = v8CreateOverlay('v8EqOverlay');
var eqModal = v8CreateModal(eqOverlay);

var equipmentData = {
  beginner: [
    {name:'풀세트 패키지 (입문용)',brand:'미즈노/캘러웨이/테일러메이드',price:'50~80만원',icon:'&#x1F3CC;&#xFE0F;',desc:'드라이버+우드+유틸+아이언5개+웨지+퍼터 포함'},
    {name:'드라이버 (관용성 중시)',brand:'캘러웨이 Paradym Ai Smoke',price:'40~60만원',icon:'&#x1F3CC;&#xFE0F;',desc:'큰 스위트스팟, 미스샷에 관대함'},
    {name:'아이언세트 (캐비티백)',brand:'테일러메이드 Qi',price:'80~120만원',icon:'&#x26F3;',desc:'넓은 솔, 높은 탄도, 초보에게 최적'},
    {name:'퍼터 (말렛형)',brand:'오디세이 White Hot',price:'15~25만원',icon:'&#x1F3AF;',desc:'관성이 높아 직선 스트로크에 유리'}
  ],
  intermediate: [
    {name:'드라이버 (밸런스형)',brand:'타이틀리스트 GT2',price:'60~80만원',icon:'&#x1F3CC;&#xFE0F;',desc:'관용성과 조작성 균형'},
    {name:'아이언세트 (반블레이드)',brand:'타이틀리스트 T150',price:'120~160만원',icon:'&#x26F3;',desc:'피드백 좋고 컨트롤 가능'},
    {name:'웨지 (3개 구성)',brand:'타이틀리스트 보키 SM10',price:'각 15~20만원',icon:'&#x1F4A8;',desc:'50/54/58도 구성 추천'},
    {name:'거리측정기',brand:'부쉬넬 Tour V6',price:'30~50만원',icon:'&#x1F4CF;',desc:'핀시커 기능으로 정확한 거리 측정'}
  ],
  advanced: [
    {name:'드라이버 (로우스핀)',brand:'타이틀리스트 GT3',price:'70~90만원',icon:'&#x1F3CC;&#xFE0F;',desc:'낮은 스핀으로 거리 극대화'},
    {name:'아이언 (블레이드)',brand:'미즈노 Pro 245',price:'150~200만원',icon:'&#x26F3;',desc:'타감과 조작성 최고 수준'},
    {name:'유틸리티 우드',brand:'타이틀리스트 TSR',price:'30~45만원',icon:'&#x1F3AF;',desc:'긴 거리 정확한 어프로치'},
    {name:'맞춤 피팅',brand:'트루스펙/클럽챔피언',price:'10~30만원',icon:'&#x1F527;',desc:'스윙 데이터 기반 최적 스펙 추천'}
  ]
};

function renderEquipment() {
  var html = '<div class="v8-modal-header"><h2><span class="v8-emoji">&#x1F3CC;&#xFE0F;</span> 장비 추천</h2><button class="v8-close" onclick="document.getElementById(\'v8EqOverlay\').classList.remove(\'active\')">&times;</button></div>';
  html += '<p style="font-size:12px;color:var(--text-muted);margin-bottom:16px">실력과 예산에 맞는 장비를 추천합니다.</p>';
  html += '<div class="v8-tabs" id="v8EqTabs"><div class="v8-tab active" data-eq="beginner">&#x1F331; 입문자</div><div class="v8-tab" data-eq="intermediate">&#x1F4AA; 중급자</div><div class="v8-tab" data-eq="advanced">&#x1F3C6; 상급자</div></div>';
  html += '<div id="v8EqList"></div>';
  eqModal.innerHTML = html;

  function renderList(level) {
    var list = equipmentData[level] || [];
    var lh = '';
    list.forEach(function(item){
      lh += '<div class="eq-item">';
      lh += '<div class="eq-icon">'+item.icon+'</div>';
      lh += '<div class="eq-info">';
      lh += '<div class="eq-name">'+item.name+'</div>';
      lh += '<div class="eq-brand">'+item.brand+'</div>';
      lh += '<div class="eq-price">'+item.price+'</div>';
      lh += '<p style="font-size:11px;color:var(--text-muted);margin-top:4px">'+item.desc+'</p>';
      lh += '</div></div>';
    });
    document.getElementById('v8EqList').innerHTML = lh;
  }
  renderList('beginner');

  eqModal.querySelectorAll('.v8-tab').forEach(function(tab){
    tab.addEventListener('click', function(){
      eqModal.querySelectorAll('.v8-tab').forEach(function(t){t.classList.remove('active');});
      tab.classList.add('active');
      renderList(tab.dataset.eq);
      v8Sfx('click');
    });
  });
  eqOverlay.classList.add('active');
  v8Sfx('click');
}

// ====================================================================
// 5. TOURNAMENT MODE (토너먼트 모드)
// ====================================================================
var tnOverlay = v8CreateOverlay('v8TnOverlay');
var tnModal = v8CreateModal(tnOverlay);

function getTournaments() { return JSON.parse(localStorage.getItem('sg_tournaments')||'[]'); }
function saveTournaments(t) { localStorage.setItem('sg_tournaments', JSON.stringify(t)); }

function renderTournament() {
  var tours = getTournaments();
  var html = '<div class="v8-modal-header"><h2><span class="v8-emoji">&#x1F3C6;</span> 토너먼트</h2><button class="v8-close" onclick="document.getElementById(\'v8TnOverlay\').classList.remove(\'active\')">&times;</button></div>';
  html += '<button class="v8-btn v8-btn-primary" id="v8CreateTour" style="margin-bottom:16px">+ 새 대회 만들기</button>';

  if (tours.length === 0) {
    html += '<div class="v8-empty"><div class="v8-empty-icon">&#x1F3C6;</div><p>아직 대회가 없습니다.<br>친구들과 함께하는 대회를 만들어보세요!</p></div>';
  } else {
    tours.slice().reverse().forEach(function(t){
      html += '<div class="tn-card">';
      html += '<h3>'+t.name+'</h3>';
      html += '<div class="tn-meta">'+t.date+' &middot; '+t.players.length+'명 참가</div>';
      html += '<div class="tn-players">'+t.players.slice(0,5).map(function(p){return '<div class="tn-avatar">'+p.charAt(0)+'</div>';}).join('')+'</div>';
      html += '</div>';
      html += '<div class="tn-leaderboard">';
      var sorted = t.players.slice().sort(function(a,b){ return (t.scores[a]||999)-(t.scores[b]||999); });
      sorted.forEach(function(p, i){
        var rankCls = i===0?'gold':i===1?'silver':i===2?'bronze':'normal';
        html += '<div class="tn-lb-row"><div class="tn-lb-rank '+rankCls+'">'+(i+1)+'</div><div class="tn-lb-name">'+p+'</div><div class="tn-lb-score">'+(t.scores[p]||'-')+'</div></div>';
      });
      html += '</div><div style="margin-bottom:20px"></div>';
    });
  }
  tnModal.innerHTML = html;
  tnOverlay.classList.add('active');
  v8Sfx('click');

  document.getElementById('v8CreateTour').addEventListener('click', showCreateTournament);
}

function showCreateTournament() {
  var today = new Date().toISOString().split('T')[0];
  tnModal.innerHTML = '<div class="v8-modal-header"><h2><span class="v8-emoji">&#x1F3C6;</span> 대회 만들기</h2><button class="v8-close" onclick="document.getElementById(\'v8TnOverlay\').classList.remove(\'active\')">&times;</button></div>';
  tnModal.innerHTML += '<div style="margin-bottom:12px"><label style="font-size:12px;font-weight:600;display:block;margin-bottom:4px">대회명</label><input class="v8-input" id="v8TourName" placeholder="예: 2026 봄 우정 대회"></div>';
  tnModal.innerHTML += '<div style="margin-bottom:12px"><label style="font-size:12px;font-weight:600;display:block;margin-bottom:4px">날짜</label><input type="date" class="v8-input" id="v8TourDate" value="'+today+'"></div>';
  tnModal.innerHTML += '<div style="margin-bottom:12px"><label style="font-size:12px;font-weight:600;display:block;margin-bottom:4px">참가자 (쉼표 구분)</label><input class="v8-input" id="v8TourPlayers" placeholder="홍길동, 김철수, 이영희"></div>';
  tnModal.innerHTML += '<div style="margin-bottom:16px"><label style="font-size:12px;font-weight:600;display:block;margin-bottom:4px">스코어 (쉼표 구분, 참가자 순서대로)</label><input class="v8-input" id="v8TourScores" placeholder="85, 92, 78"></div>';
  tnModal.innerHTML += '<div style="display:flex;gap:8px"><button class="v8-btn v8-btn-primary" id="v8SaveTour">저장</button><button class="v8-btn v8-btn-secondary" id="v8CancelTour">취소</button></div>';

  document.getElementById('v8SaveTour').addEventListener('click', function(){
    var name = document.getElementById('v8TourName').value.trim();
    var date = document.getElementById('v8TourDate').value;
    var players = document.getElementById('v8TourPlayers').value.split(',').map(function(s){return s.trim();}).filter(Boolean);
    var scores = document.getElementById('v8TourScores').value.split(',').map(function(s){return parseInt(s.trim());});
    if(!name || players.length < 2) { v8Toast('대회명과 2명 이상 참가자를 입력하세요', 'warn'); return; }
    var scoreMap = {};
    players.forEach(function(p, i){ scoreMap[p] = scores[i] || 0; });
    var tours = getTournaments();
    tours.push({name:name, date:date, players:players, scores:scoreMap});
    saveTournaments(tours);
    v8Toast('대회가 생성되었습니다!', 'success');
    v8Sfx('achieve');
    renderTournament();
  });
  document.getElementById('v8CancelTour').addEventListener('click', renderTournament);
}

// ====================================================================
// 6. MENTAL COACHING (멘탈 코칭)
// ====================================================================
var mcOverlay = v8CreateOverlay('v8McOverlay');
var mcModal = v8CreateModal(mcOverlay);

var mentalTips = {
  routine: [
    '공 뒤에서 목표 확인 (3초)',
    '클럽 정렬 후 스탠스 진입',
    '워글 1~2회로 긴장 해소',
    '깊은 숨 한 번 (4초 흡입)',
    '타겟만 보며 백스윙 시작',
    '팔로스루까지 밸런스 유지'
  ],
  breathing: [
    {phase:'들숨',duration:4,desc:'코로 깊게 숨을 들이쉽니다'},
    {phase:'멈춤',duration:4,desc:'숨을 참고 집중합니다'},
    {phase:'날숨',duration:6,desc:'입으로 천천히 내쉽니다'},
    {phase:'이완',duration:2,desc:'몸의 긴장을 풀어줍니다'}
  ],
  focus: [
    '과거 실수는 잊고 현재 샷에만 집중',
    '스코어보드가 아닌 프로세스에 집중',
    '"한 샷씩" 마인드 — 18홀이 아닌 이 1타',
    '긍정적 셀프톡: "할 수 있다" 반복',
    '미스 후 10초 규칙: 10초 안에 감정 리셋',
    '라운드 전 5분 명상으로 마음 비우기',
    '체크포인트 설정: 3홀마다 마인드 리셋',
    '동반자 플레이에 영향받지 않기'
  ]
};

var breathInterval = null;

function renderMentalCoaching() {
  var html = '<div class="v8-modal-header"><h2><span class="v8-emoji">&#x1F9D8;</span> 멘탈 코칭</h2><button class="v8-close" onclick="document.getElementById(\'v8McOverlay\').classList.remove(\'active\');clearInterval(breathInterval)">&times;</button></div>';
  html += '<div class="v8-tabs"><div class="v8-tab active" data-mc="routine">프리샷 루틴</div><div class="v8-tab" data-mc="breath">호흡법</div><div class="v8-tab" data-mc="focus">집중력 팁</div></div>';
  html += '<div id="v8McContent"></div>';
  mcModal.innerHTML = html;

  function showTab(tab) {
    clearInterval(breathInterval);
    var content = document.getElementById('v8McContent');
    if (tab === 'routine') {
      var rh = '<p style="font-size:12px;color:var(--text-muted);margin-bottom:12px">매 샷 전 동일한 루틴을 반복하면 일관성이 높아집니다.</p>';
      rh += '<div class="mc-routine">';
      mentalTips.routine.forEach(function(step){
        rh += '<div class="mc-step">'+step+'</div>';
      });
      rh += '</div>';
      content.innerHTML = rh;
    } else if (tab === 'breath') {
      var bh = '<p style="font-size:12px;color:var(--text-muted);margin-bottom:12px">4-4-6-2 호흡법으로 긴장을 해소하세요. 시작 버튼을 누르세요.</p>';
      bh += '<div class="mc-breath"><div class="mc-circle" id="v8BreathCircle">준비</div></div>';
      bh += '<div style="text-align:center;margin-top:16px"><button class="v8-btn v8-btn-primary" id="v8StartBreath">호흡 시작</button></div>';
      content.innerHTML = bh;
      document.getElementById('v8StartBreath').addEventListener('click', startBreathing);
    } else if (tab === 'focus') {
      var fh = '<p style="font-size:12px;color:var(--text-muted);margin-bottom:12px">프로들이 사용하는 집중력 유지 전략입니다.</p>';
      mentalTips.focus.forEach(function(tip, i){
        fh += '<div class="v8-card"><h4>'+(i+1)+'. '+tip+'</h4></div>';
      });
      content.innerHTML = fh;
    }
  }

  showTab('routine');
  mcModal.querySelectorAll('.v8-tab').forEach(function(tab){
    tab.addEventListener('click', function(){
      mcModal.querySelectorAll('.v8-tab').forEach(function(t){t.classList.remove('active');});
      tab.classList.add('active');
      showTab(tab.dataset.mc);
      v8Sfx('click');
    });
  });
  mcOverlay.classList.add('active');
  v8Sfx('click');
}

function startBreathing() {
  var circle = document.getElementById('v8BreathCircle');
  var phases = mentalTips.breathing;
  var idx = 0;
  var count = 0;

  function tick() {
    var p = phases[idx % phases.length];
    count++;
    if (count > p.duration) {
      count = 1;
      idx++;
      if (idx >= phases.length * 3) { // 3 cycles
        clearInterval(breathInterval);
        circle.textContent = '완료!';
        circle.className = 'mc-circle';
        v8Sfx('achieve');
        v8Toast('호흡 운동 완료!', 'success');
        return;
      }
    }
    var cp = phases[idx % phases.length];
    circle.textContent = cp.phase + ' ' + count + '/' + cp.duration;
    circle.className = 'mc-circle ' + (cp.phase==='들숨'?'inhale':cp.phase==='날숨'?'exhale':'');
    v8Sfx('timer');
  }
  tick();
  breathInterval = setInterval(tick, 1000);
}

// ====================================================================
// 7. GOLF ETIQUETTE GUIDE (골프 에티켓 가이드)
// ====================================================================
var etOverlay = v8CreateOverlay('v8EtOverlay');
var etModal = v8CreateModal(etOverlay);

var etiquetteData = [
  {title:'시간 엄수',desc:'티업 시간 30분 전 도착. 첫 홀 지연은 뒷팀 모두에게 영향.',level:'필수',color:'red'},
  {title:'정숙 유지',desc:'동반자가 어드레스에 들어가면 움직이거나 소리내지 않기.',level:'필수',color:'red'},
  {title:'디봇 수리',desc:'아이언 샷 후 뜯긴 잔디(디봇)를 원래 자리에 덮어주기.',level:'필수',color:'red'},
  {title:'볼 마크 수리',desc:'그린 위 공이 떨어진 자국을 포크로 평탄하게 수리.',level:'필수',color:'red'},
  {title:'벙커 정리',desc:'벙커 샷 후 레이크로 모래를 고르게 정리하고 나오기.',level:'필수',color:'red'},
  {title:'카트 운행 규칙',desc:'페어웨이 위 카트 진입은 카트 전용도로만. 90도 규칙 준수.',level:'중요',color:'orange'},
  {title:'플레이 속도',desc:'자기 순서가 오면 바로 칠 준비. Ready Golf 권장.',level:'중요',color:'orange'},
  {title:'안전 확인',desc:'"볼!" 외치기. 앞팀이 타구 거리 밖으로 간 후 티샷.',level:'필수',color:'red'},
  {title:'깃발 관리',desc:'퍼팅 시 깃발을 뽑은 후 그린 밖에 놓기.',level:'기본',color:'green'},
  {title:'쓰레기 관리',desc:'빈 병, 간식 포장지는 쓰레기통에. 코스를 깨끗하게.',level:'기본',color:'green'},
  {title:'핸드폰 매너',desc:'핸드폰은 무음/진동. 통화는 동반자에게 양해 후 간단히.',level:'중요',color:'orange'},
  {title:'축하 매너',desc:'동반자의 좋은 샷에 박수와 격려. 미스샷은 조용히.',level:'기본',color:'green'},
  {title:'라인 밟지 않기',desc:'그린 위 동반자의 퍼팅 라인을 밟지 않도록 주의.',level:'필수',color:'red'},
  {title:'OB/로스트볼 대처',desc:'공을 잃었을 때 3분 이상 찾지 않기. 잠정구 선언.',level:'중요',color:'orange'},
  {title:'그림자 주의',desc:'동반자 퍼팅 시 자신의 그림자가 라인에 비치지 않도록.',level:'기본',color:'green'},
  {title:'복장 규정',desc:'클럽하우스 복장 코드 준수. 카라 있는 상의, 면바지/골프팬츠.',level:'기본',color:'green'},
  {title:'갤러리/외부인',desc:'동반자 이외 지인과 대화 시 플레이 방해하지 않기.',level:'기본',color:'green'},
  {title:'클럽하우스 매너',desc:'흙이 묻은 신발로 카펫 밟지 않기. 샤워 후 정리.',level:'기본',color:'green'},
  {title:'캐디 존중',desc:'캐디에게 반말/무시하지 않기. 팁은 감사의 표시.',level:'중요',color:'orange'},
  {title:'벌타 자진 신고',desc:'벌타를 정직하게 카운트. 골프는 신사의 스포츠.',level:'필수',color:'red'},
  {title:'양보 정신',desc:'플레이가 느릴 때 뒷팀에게 먼저 치라고 양보(패스).',level:'중요',color:'orange'},
  {title:'홀아웃 후 퇴장',desc:'홀아웃 후 그린에서 바로 이동. 스코어는 다음 티에서.',level:'기본',color:'green'},
  {title:'연습 스윙 주의',desc:'연습 스윙 시 잔디 뜯기지 않도록. 매트 있으면 활용.',level:'기본',color:'green'},
  {title:'비 오는 날',desc:'천둥/번개 시 즉시 대피. 안전이 최우선.',level:'필수',color:'red'},
  {title:'라운드 후 인사',desc:'18번 홀 그린 후 악수와 감사 인사. 좋은 마무리.',level:'기본',color:'green'}
];

function renderEtiquette() {
  var html = '<div class="v8-modal-header"><h2><span class="v8-emoji">&#x1F3A9;</span> 골프 에티켓 가이드</h2><button class="v8-close" onclick="document.getElementById(\'v8EtOverlay\').classList.remove(\'active\')">&times;</button></div>';
  html += '<p style="font-size:12px;color:var(--text-muted);margin-bottom:12px">25가지 골프 에티켓. 초보~고급 매너까지 모두 확인하세요.</p>';
  html += '<div class="v8-tabs"><div class="v8-tab active" data-et="all">전체 (25)</div><div class="v8-tab" data-et="red">필수</div><div class="v8-tab" data-et="orange">중요</div><div class="v8-tab" data-et="green">기본</div></div>';
  html += '<div id="v8EtList">';
  etiquetteData.forEach(function(et, i){
    html += '<div class="et-item" data-level="'+et.color+'">';
    html += '<div class="et-num">'+(i+1)+'</div>';
    html += '<div class="et-text">';
    html += '<div class="et-title">'+et.title+'</div>';
    html += '<div class="et-desc">'+et.desc+'</div>';
    html += '<span class="et-level v8-badge v8-badge-'+et.color+'">'+et.level+'</span>';
    html += '</div></div>';
  });
  html += '</div>';
  etModal.innerHTML = html;
  etOverlay.classList.add('active');
  v8Sfx('click');

  etModal.querySelectorAll('.v8-tab').forEach(function(tab){
    tab.addEventListener('click', function(){
      etModal.querySelectorAll('.v8-tab').forEach(function(t){t.classList.remove('active');});
      tab.classList.add('active');
      var filter = tab.dataset.et;
      etModal.querySelectorAll('.et-item').forEach(function(item){
        if(filter==='all') item.style.display='';
        else item.style.display = item.dataset.level===filter?'':'none';
      });
    });
  });
}

// ====================================================================
// 8. SEASON CONDITION (계절별 코스 컨디션)
// ====================================================================
var scOverlay = v8CreateOverlay('v8ScOverlay');
var scModal = v8CreateModal(scOverlay);

var seasonData = {
  spring: {name:'봄 (3~5월)',grass:75,green:70,fairway:65,rough:60,recommend:'오전 10시~오후 2시',tips:['황사 날은 마스크 권장','잔디 성장기, 디봇 빨리 회복','바람 변화 심함 - 바람 체크 필수','그린 무르기 시작 - 볼마크 주의']},
  summer: {name:'여름 (6~8월)',grass:95,green:85,fairway:90,rough:95,recommend:'새벽 6시 or 오후 4시 이후',tips:['열사병 주의 - 수분/전해질 보충','러프가 매우 깊음 - 탈출 우선','그린 빠름 - 터치 주의','소나기 예보 확인 필수']},
  autumn: {name:'가을 (9~11월)',grass:85,green:90,fairway:85,rough:70,recommend:'오전 9시~오후 3시',tips:['최적의 라운드 시즌','낙엽으로 공 찾기 어려움','일교차 큼 - 레이어드 복장','그린 컨디션 최상']},
  winter: {name:'겨울 (12~2월)',grass:30,green:40,fairway:35,rough:25,recommend:'오전 11시~오후 2시',tips:['공 비거리 10~15% 감소','그라운드 딱딱 - 런 많음','보온 장갑/핫팩 필수','서리 녹은 후 라운드 시작']}
};

function renderSeasonCondition() {
  var month = new Date().getMonth()+1;
  var currentSeason = month>=3&&month<=5?'spring':month>=6&&month<=8?'summer':month>=9&&month<=11?'autumn':'winter';

  var html = '<div class="v8-modal-header"><h2><span class="v8-emoji">&#x1F33F;</span> 계절별 코스 컨디션</h2><button class="v8-close" onclick="document.getElementById(\'v8ScOverlay\').classList.remove(\'active\')">&times;</button></div>';
  html += '<div class="sc-season-tabs" id="v8ScTabs">';
  html += '<div class="sc-season-tab'+(currentSeason==='spring'?' active':'')+'" data-sc="spring">&#x1F338; 봄</div>';
  html += '<div class="sc-season-tab'+(currentSeason==='summer'?' active':'')+'" data-sc="summer">&#x2600;&#xFE0F; 여름</div>';
  html += '<div class="sc-season-tab'+(currentSeason==='autumn'?' active':'')+'" data-sc="autumn">&#x1F341; 가을</div>';
  html += '<div class="sc-season-tab'+(currentSeason==='winter'?' active':'')+'" data-sc="winter">&#x2744;&#xFE0F; 겨울</div>';
  html += '</div>';
  html += '<div id="v8ScContent"></div>';
  scModal.innerHTML = html;

  function showSeason(s) {
    var d = seasonData[s];
    var ch = '<h3 style="font-size:16px;font-weight:800;margin-bottom:16px">'+d.name+'</h3>';
    ch += '<div class="sc-meter"><span class="sc-label">잔디 상태</span><div class="sc-bar"><div class="sc-fill" style="width:'+d.grass+'%;background:linear-gradient(90deg,#4caf50,#8bc34a)"></div></div><span class="sc-val">'+d.grass+'%</span></div>';
    ch += '<div class="sc-meter"><span class="sc-label">그린 속도</span><div class="sc-bar"><div class="sc-fill" style="width:'+d.green+'%;background:linear-gradient(90deg,#2196f3,#03a9f4)"></div></div><span class="sc-val">'+d.green+'%</span></div>';
    ch += '<div class="sc-meter"><span class="sc-label">페어웨이</span><div class="sc-bar"><div class="sc-fill" style="width:'+d.fairway+'%;background:linear-gradient(90deg,#ff9800,#ffc107)"></div></div><span class="sc-val">'+d.fairway+'%</span></div>';
    ch += '<div class="sc-meter"><span class="sc-label">러프 깊이</span><div class="sc-bar"><div class="sc-fill" style="width:'+d.rough+'%;background:linear-gradient(90deg,#f44336,#e91e63)"></div></div><span class="sc-val">'+d.rough+'%</span></div>';
    ch += '<div class="v8-divider"></div>';
    ch += '<div class="v8-card" style="background:linear-gradient(135deg,#e8f5e9,#f1f8e9);border:1px solid #c8e6c9"><h4>&#x23F0; 추천 티업 시간</h4><p style="font-weight:700;color:var(--primary)">'+d.recommend+'</p></div>';
    ch += '<div class="v8-divider"></div>';
    ch += '<h4 style="font-size:14px;font-weight:700;margin-bottom:10px">&#x1F4A1; 시즌 팁</h4>';
    d.tips.forEach(function(tip){
      ch += '<div class="v8-card"><p>'+tip+'</p></div>';
    });
    document.getElementById('v8ScContent').innerHTML = ch;
  }
  showSeason(currentSeason);

  scModal.querySelectorAll('.sc-season-tab').forEach(function(tab){
    tab.addEventListener('click', function(){
      scModal.querySelectorAll('.sc-season-tab').forEach(function(t){t.classList.remove('active');});
      tab.classList.add('active');
      showSeason(tab.dataset.sc);
      v8Sfx('click');
    });
  });
  scOverlay.classList.add('active');
  v8Sfx('click');
}

// ====================================================================
// 9. ROUND TIMELINE (라운드 타임라인)
// ====================================================================
var tlOverlay = v8CreateOverlay('v8TlOverlay');
var tlModal = v8CreateModal(tlOverlay);

function getRoundTimeline() { return JSON.parse(localStorage.getItem('sg_timeline')||'null'); }
function saveRoundTimeline(t) { localStorage.setItem('sg_timeline', JSON.stringify(t)); }

function renderTimeline() {
  var tl = getRoundTimeline();
  var html = '<div class="v8-modal-header"><h2><span class="v8-emoji">&#x23F1;&#xFE0F;</span> 라운드 타임라인</h2><button class="v8-close" onclick="document.getElementById(\'v8TlOverlay\').classList.remove(\'active\')">&times;</button></div>';
  html += '<p style="font-size:12px;color:var(--text-muted);margin-bottom:16px">홀별 소요 시간을 추적하여 플레이 페이스를 관리하세요. 목표: 홀당 12~15분.</p>';

  if (!tl || !tl.active) {
    html += '<div style="text-align:center;margin:20px 0"><button class="v8-btn v8-btn-primary" id="v8StartTimeline" style="font-size:15px;padding:14px 28px">&#x23F1;&#xFE0F; 라운드 타이머 시작</button></div>';
    if (tl && tl.holes && tl.holes.length === 18) {
      html += '<div class="v8-divider"></div><h4 style="font-size:14px;font-weight:700;margin-bottom:12px">최근 라운드 기록</h4>';
      var total = 0;
      tl.holes.forEach(function(h){
        total += h.time;
        var pace = h.time <= 13 ? 'fast' : h.time <= 16 ? 'ok' : 'slow';
        var paceText = h.time <= 13 ? '빠름' : h.time <= 16 ? '보통' : '느림';
        html += '<div class="tl-hole"><div class="tl-num">'+h.hole+'</div><div class="tl-time">'+h.time+'분</div><span class="tl-pace '+pace+'">'+paceText+'</span><span style="flex:1"></span><span style="font-size:11px;color:var(--text-muted)">Par '+h.par+'</span></div>';
      });
      html += '<div class="v8-card" style="margin-top:12px;text-align:center"><h4>총 소요 시간</h4><p style="font-size:24px;font-weight:800;color:var(--primary)">'+Math.floor(total/60)+'시간 '+(total%60)+'분</p></div>';
    }
  } else {
    var current = tl.currentHole || 1;
    var elapsed = Math.round((Date.now() - tl.holeStart) / 60000);
    html += '<div class="v8-card" style="text-align:center;border:2px solid var(--primary)">';
    html += '<h4 style="font-size:18px;margin-bottom:4px">현재: '+current+'번 홀</h4>';
    html += '<p style="font-size:36px;font-weight:800;color:var(--primary);font-variant-numeric:tabular-nums">'+elapsed+'분</p>';
    html += '<p style="font-size:12px;color:var(--text-muted)">목표: 12~15분 이내</p>';
    html += '</div>';
    html += '<div style="display:flex;gap:8px;justify-content:center;margin:16px 0">';
    if (current < 18) {
      html += '<button class="v8-btn v8-btn-primary" id="v8NextHole">다음 홀 &#x27A1;&#xFE0F;</button>';
    }
    html += '<button class="v8-btn v8-btn-danger" id="v8EndTimeline">종료</button></div>';

    if (tl.holes && tl.holes.length > 0) {
      html += '<div class="v8-divider"></div>';
      tl.holes.forEach(function(h){
        var pace = h.time <= 13 ? 'fast' : h.time <= 16 ? 'ok' : 'slow';
        var paceText = h.time <= 13 ? '빠름' : h.time <= 16 ? '보통' : '느림';
        html += '<div class="tl-hole"><div class="tl-num">'+h.hole+'</div><div class="tl-time">'+h.time+'분</div><span class="tl-pace '+pace+'">'+paceText+'</span></div>';
      });
    }
  }

  tlModal.innerHTML = html;
  tlOverlay.classList.add('active');
  v8Sfx('click');

  var startBtn = document.getElementById('v8StartTimeline');
  if (startBtn) {
    startBtn.addEventListener('click', function(){
      saveRoundTimeline({active:true, currentHole:1, holeStart:Date.now(), roundStart:Date.now(), holes:[]});
      v8Toast('라운드 타이머가 시작되었습니다!', 'success');
      v8Sfx('success');
      renderTimeline();
    });
  }

  var nextBtn = document.getElementById('v8NextHole');
  if (nextBtn) {
    nextBtn.addEventListener('click', function(){
      var t = getRoundTimeline();
      var elapsed = Math.round((Date.now() - t.holeStart) / 60000);
      t.holes.push({hole:t.currentHole, time: elapsed || 1, par: courseStrategies[t.currentHole-1]?courseStrategies[t.currentHole-1].par:4});
      t.currentHole++;
      t.holeStart = Date.now();
      saveRoundTimeline(t);
      v8Sfx('click');
      renderTimeline();
    });
  }

  var endBtn = document.getElementById('v8EndTimeline');
  if (endBtn) {
    endBtn.addEventListener('click', function(){
      var t = getRoundTimeline();
      if (t.currentHole <= 18) {
        var elapsed = Math.round((Date.now() - t.holeStart) / 60000);
        t.holes.push({hole:t.currentHole, time: elapsed || 1, par: courseStrategies[t.currentHole-1]?courseStrategies[t.currentHole-1].par:4});
      }
      t.active = false;
      saveRoundTimeline(t);
      v8Toast('라운드 타이머 종료!', 'success');
      v8Sfx('achieve');
      renderTimeline();
    });
  }
}

// ====================================================================
// 10. QUICK ACTION BUTTONS INJECTION
// ====================================================================
function injectV8QuickActions() {
  var existing = document.querySelector('.v7-quick');
  if (!existing) {
    var searchSection = document.querySelector('.search-section');
    if (searchSection) {
      existing = document.createElement('div');
      existing.className = 'v7-quick';
      searchSection.parentNode.insertBefore(existing, searchSection.nextSibling);
    }
  }
  if (!existing) return;

  var v8Row = document.createElement('div');
  v8Row.className = 'v8-quick-row';
  v8Row.innerHTML = [
    {icon:'&#x26F3;',label:'코스공략',fn:'renderCourseStrategy'},
    {icon:'&#x1F4D3;',label:'스윙일기',fn:'renderSwingDiary'},
    {icon:'&#x1F7E2;',label:'그린리딩',fn:'renderGreenReading'},
    {icon:'&#x1F3CC;&#xFE0F;',label:'장비추천',fn:'renderEquipment'},
    {icon:'&#x1F3C6;',label:'토너먼트',fn:'renderTournament'},
    {icon:'&#x1F9D8;',label:'멘탈코칭',fn:'renderMentalCoaching'},
    {icon:'&#x1F3A9;',label:'에티켓',fn:'renderEtiquette'},
    {icon:'&#x1F33F;',label:'시즌정보',fn:'renderSeasonCondition'},
    {icon:'&#x23F1;&#xFE0F;',label:'타임라인',fn:'renderTimeline'}
  ].map(function(b){
    return '<div class="v8-qbtn" data-v8fn="'+b.fn+'"><span class="v8-qi">'+b.icon+'</span>'+b.label+'</div>';
  }).join('');

  existing.parentNode.insertBefore(v8Row, existing.nextSibling);

  v8Row.querySelectorAll('.v8-qbtn').forEach(function(btn){
    btn.addEventListener('click', function(){
      var fn = btn.dataset.v8fn;
      if (fn === 'renderCourseStrategy') renderCourseStrategy();
      else if (fn === 'renderSwingDiary') renderSwingDiary();
      else if (fn === 'renderGreenReading') renderGreenReading();
      else if (fn === 'renderEquipment') renderEquipment();
      else if (fn === 'renderTournament') renderTournament();
      else if (fn === 'renderMentalCoaching') renderMentalCoaching();
      else if (fn === 'renderEtiquette') renderEtiquette();
      else if (fn === 'renderSeasonCondition') renderSeasonCondition();
      else if (fn === 'renderTimeline') renderTimeline();
    });
  });
}

// ====================================================================
// 11. KEYBOARD SHORTCUTS (v8 추가)
// ====================================================================
document.addEventListener('keydown', function(e){
  var t = e.target.tagName;
  if(t==='INPUT'||t==='TEXTAREA'||t==='SELECT') return;
  if(e.key==='g'||e.key==='G') renderCourseStrategy();
  if(e.key==='j'||e.key==='J') renderSwingDiary();
  if(e.key==='p'||e.key==='P'&&!e.ctrlKey) renderGreenReading();
  if(e.key==='e'||e.key==='E') renderEquipment();
  if(e.key==='t'||e.key==='T'&&!e.ctrlKey) renderTournament();
  if(e.key==='m'||e.key==='M') renderMentalCoaching();
  if(e.key==='q'||e.key==='Q') renderEtiquette();
});

// ====================================================================
// INITIALIZATION
// ====================================================================
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', injectV8QuickActions);
} else {
  setTimeout(injectV8QuickActions, 500);
}

})();
