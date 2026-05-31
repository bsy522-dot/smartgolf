(function(){
'use strict';

var css20 = document.createElement('style');
css20.textContent = `
.v20-overlay{position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,.88);z-index:10100;display:none;align-items:center;justify-content:center;backdrop-filter:blur(20px)}
.v20-overlay.active{display:flex}
.v20-modal{background:var(--card-bg,#fff);border-radius:28px;padding:32px;width:97%;max-width:900px;max-height:94vh;overflow-y:auto;box-shadow:0 48px 140px rgba(0,0,0,.7);animation:v20Rise .35s cubic-bezier(.22,1,.36,1)}
@keyframes v20Rise{from{opacity:0;transform:translateY(48px) scale(.92)}to{opacity:1;transform:translateY(0) scale(1)}}
.v20-hdr{display:flex;justify-content:space-between;align-items:center;margin-bottom:22px}
.v20-hdr h2{font-size:24px;font-weight:800;display:flex;align-items:center;gap:10px}
.v20-hdr h2 .v20i{font-size:30px}
.v20-x{background:none;border:none;font-size:30px;cursor:pointer;color:var(--text-muted);padding:4px 10px;border-radius:10px;transition:.2s}
.v20-x:hover{background:var(--border);color:var(--text)}
.v20-tabs{display:flex;gap:6px;margin-bottom:18px;overflow-x:auto;padding-bottom:4px;scrollbar-width:none}
.v20-tabs::-webkit-scrollbar{display:none}
.v20-tab{padding:10px 20px;border-radius:26px;border:1.5px solid var(--border);background:var(--bg);font-size:12px;font-weight:700;cursor:pointer;white-space:nowrap;transition:.25s}
.v20-tab.active{background:var(--primary);color:#fff;border-color:var(--primary);box-shadow:0 3px 16px rgba(26,122,58,.35)}
.v20-card{background:var(--bg);border-radius:18px;padding:20px;margin-bottom:12px;transition:.25s;border:1.5px solid transparent}
.v20-card:hover{border-color:var(--primary);transform:translateY(-2px);box-shadow:0 4px 18px rgba(26,122,58,.12)}
.v20-card h4{font-size:15px;font-weight:700;margin-bottom:8px;display:flex;align-items:center;gap:8px}
.v20-card p{font-size:12px;color:var(--text-muted);line-height:1.7}
.v20-btn{padding:11px 24px;border:none;border-radius:14px;font-size:13px;font-weight:700;cursor:pointer;transition:.25s;display:inline-flex;align-items:center;gap:6px}
.v20-btn-primary{background:linear-gradient(135deg,var(--primary),#2e9e4f);color:#fff}
.v20-btn-primary:hover{transform:translateY(-2px);box-shadow:0 8px 22px rgba(26,122,58,.4)}
.v20-btn-sm{padding:7px 14px;font-size:11px;border-radius:10px}
.v20-btn-secondary{background:var(--bg);color:var(--text);border:1.5px solid var(--border)}
.v20-btn-secondary:hover{border-color:var(--primary);color:var(--primary)}
.v20-input{width:100%;padding:11px 16px;border:2px solid var(--border);border-radius:12px;font-size:13px;background:var(--bg);color:var(--text);transition:.2s}
.v20-input:focus{border-color:var(--primary);outline:none;box-shadow:0 0 0 3px rgba(26,122,58,.12)}
.v20-select{padding:9px 14px;border:2px solid var(--border);border-radius:10px;font-size:13px;background:var(--bg);color:var(--text)}
.v20-grid2{display:grid;grid-template-columns:1fr 1fr;gap:12px}
.v20-grid3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px}
.v20-grid4{display:grid;grid-template-columns:repeat(4,1fr);gap:10px}
@media(max-width:520px){.v20-grid2,.v20-grid3,.v20-grid4{grid-template-columns:1fr}}
.v20-divider{height:1px;background:var(--border);margin:18px 0}
.v20-badge{display:inline-block;padding:5px 14px;border-radius:16px;font-size:11px;font-weight:700}
.v20-progress{width:100%;height:14px;background:var(--border);border-radius:7px;overflow:hidden;margin:8px 0}
.v20-progress-fill{height:100%;border-radius:7px;transition:width .6s ease}
.v20-stat-row{display:flex;justify-content:space-between;align-items:center;padding:13px 0;border-bottom:1px solid var(--border)}
.v20-stat-row:last-child{border-bottom:none}
.v20-hole-card{background:var(--bg);border-radius:16px;padding:16px;margin-bottom:10px;border-left:4px solid var(--primary);transition:.25s}
.v20-hole-card:hover{transform:translateX(4px);box-shadow:0 3px 14px rgba(26,122,58,.1)}
.v20-hole-num{display:inline-flex;align-items:center;justify-content:center;width:32px;height:32px;border-radius:50%;background:var(--primary);color:#fff;font-weight:800;font-size:14px;margin-right:10px}
.v20-hole-par{font-size:12px;font-weight:700;padding:3px 10px;border-radius:12px;display:inline-block}
.v20-hole-par3{background:#e3f2fd;color:#1565c0}
.v20-hole-par4{background:#e8f5e9;color:#2e7d32}
.v20-hole-par5{background:#fff3e0;color:#e65100}
.v20-hole-hazard{display:inline-block;padding:2px 8px;border-radius:8px;font-size:10px;font-weight:600;margin:2px}
.v20-hazard-water{background:#e3f2fd;color:#1565c0}
.v20-hazard-bunker{background:#fff8e1;color:#f57f17}
.v20-hazard-ob{background:#fce4ec;color:#c62828}
.v20-hazard-slope{background:#f3e5f5;color:#7b1fa2}
.v20-season-month{width:100%;height:32px;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;cursor:pointer;transition:.2s}
.v20-season-best{background:linear-gradient(135deg,#4caf50,#2e7d32);color:#fff}
.v20-season-good{background:#e8f5e9;color:#2e7d32}
.v20-season-normal{background:var(--bg);color:var(--text-muted)}
.v20-season-avoid{background:#fce4ec;color:#c62828}
.v20-split-row{display:flex;justify-content:space-between;align-items:center;padding:12px 0;border-bottom:1px solid var(--border)}
.v20-split-total{font-size:20px;font-weight:900;color:var(--primary);text-align:center;padding:16px 0}
.v20-collection-card{background:var(--bg);border-radius:16px;padding:16px;margin-bottom:10px;cursor:pointer;transition:.25s;border:2px solid transparent}
.v20-collection-card:hover{border-color:var(--primary);transform:translateY(-2px)}
.v20-collection-icon{font-size:28px;margin-bottom:6px}
.v20-collection-name{font-size:14px;font-weight:700}
.v20-collection-count{font-size:11px;color:var(--text-muted)}
.v20-trend-chart{width:100%;max-width:560px;margin:0 auto;display:block;border-radius:12px}
.v20-nutrition-card{background:var(--bg);border-radius:16px;padding:16px;margin-bottom:10px;display:flex;gap:14px;align-items:flex-start;transition:.25s}
.v20-nutrition-card:hover{transform:translateY(-2px);box-shadow:0 3px 12px rgba(26,122,58,.1)}
.v20-nutrition-icon{width:48px;height:48px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:22px;flex-shrink:0}
.v20-nutrition-info{flex:1}
.v20-nutrition-name{font-size:14px;font-weight:700;margin-bottom:3px}
.v20-nutrition-desc{font-size:11px;color:var(--text-muted);line-height:1.6}
.v20-tempo-visual{display:flex;align-items:center;justify-content:center;gap:4px;height:60px;margin:16px 0}
.v20-tempo-bar{width:6px;border-radius:3px;background:var(--primary);transition:height .15s}
.v20-strategy-tier{padding:16px;border-radius:16px;margin-bottom:12px}
.v20-strategy-tier.beginner{background:linear-gradient(135deg,#e3f2fd,#bbdefb);border-left:4px solid #1565c0}
.v20-strategy-tier.intermediate{background:linear-gradient(135deg,#e8f5e9,#c8e6c9);border-left:4px solid #2e7d32}
.v20-strategy-tier.advanced{background:linear-gradient(135deg,#fff3e0,#ffe0b2);border-left:4px solid #e65100}
[data-theme="dark"] .v20-strategy-tier.beginner{background:linear-gradient(135deg,#1a2a3a,#1a3a5a);border-left-color:#42a5f5}
[data-theme="dark"] .v20-strategy-tier.intermediate{background:linear-gradient(135deg,#1a3a25,#1a4a30);border-left-color:#66bb6a}
[data-theme="dark"] .v20-strategy-tier.advanced{background:linear-gradient(135deg,#3a2a1a,#4a3520);border-left-color:#ff9800}
`;
document.head.appendChild(css20);

// =============================================
// SFX ENGINE (12 new sounds: 68→80)
// =============================================
var sfx20 = {};
var AC20 = window.AudioContext || window.webkitAudioContext;
var actx20 = null;
function initAudio20(){ if(!actx20) try{ actx20 = new AC20(); } catch(e){} }

function playSfx20(name){
  initAudio20(); if(!actx20) return;
  var o = actx20.createOscillator();
  var g = actx20.createGain();
  o.connect(g); g.connect(actx20.destination);
  var t = actx20.currentTime;
  var presets = {
    hole_guide: function(){ o.type='sine'; o.frequency.setValueAtTime(523,t); o.frequency.linearRampToValueAtTime(784,t+.15); g.gain.setValueAtTime(.18,t); g.gain.linearRampToValueAtTime(0,t+.3); o.start(t); o.stop(t+.3); },
    course_strategy: function(){ o.type='triangle'; o.frequency.setValueAtTime(440,t); o.frequency.linearRampToValueAtTime(660,t+.2); g.gain.setValueAtTime(.15,t); g.gain.linearRampToValueAtTime(0,t+.35); o.start(t); o.stop(t+.35); },
    price_trend: function(){ o.type='sine'; o.frequency.setValueAtTime(392,t); g.gain.setValueAtTime(.12,t); g.gain.linearRampToValueAtTime(0,t+.2); o.start(t); o.stop(t+.2); },
    cost_split: function(){ o.type='square'; o.frequency.setValueAtTime(587,t); o.frequency.linearRampToValueAtTime(880,t+.12); g.gain.setValueAtTime(.1,t); g.gain.linearRampToValueAtTime(0,t+.2); o.start(t); o.stop(t+.2); },
    season_cal: function(){ o.type='sine'; o.frequency.setValueAtTime(659,t); g.gain.setValueAtTime(.14,t); g.gain.linearRampToValueAtTime(0,t+.25); o.start(t); o.stop(t+.25); },
    collection_add: function(){ o.type='triangle'; o.frequency.setValueAtTime(523,t); o.frequency.linearRampToValueAtTime(1047,t+.2); g.gain.setValueAtTime(.16,t); g.gain.linearRampToValueAtTime(0,t+.3); o.start(t); o.stop(t+.3); },
    nutrition_tip: function(){ o.type='sine'; o.frequency.setValueAtTime(440,t); o.frequency.linearRampToValueAtTime(554,t+.15); g.gain.setValueAtTime(.12,t); g.gain.linearRampToValueAtTime(0,t+.25); o.start(t); o.stop(t+.25); },
    tempo_tick: function(){ o.type='square'; o.frequency.setValueAtTime(1000,t); g.gain.setValueAtTime(.2,t); g.gain.linearRampToValueAtTime(0,t+.05); o.start(t); o.stop(t+.06); },
    tempo_accent: function(){ o.type='square'; o.frequency.setValueAtTime(1500,t); g.gain.setValueAtTime(.25,t); g.gain.linearRampToValueAtTime(0,t+.06); o.start(t); o.stop(t+.07); },
    quiz_v5: function(){ o.type='triangle'; o.frequency.setValueAtTime(698,t); o.frequency.linearRampToValueAtTime(880,t+.1); g.gain.setValueAtTime(.15,t); g.gain.linearRampToValueAtTime(0,t+.2); o.start(t); o.stop(t+.2); },
    achievement_v20: function(){ o.type='sine'; o.frequency.setValueAtTime(523,t); o.frequency.setValueAtTime(659,t+.1); o.frequency.setValueAtTime(784,t+.2); o.frequency.setValueAtTime(1047,t+.3); g.gain.setValueAtTime(.18,t); g.gain.linearRampToValueAtTime(0,t+.5); o.start(t); o.stop(t+.5); },
    gallery_view: function(){ o.type='sine'; o.frequency.setValueAtTime(349,t); o.frequency.linearRampToValueAtTime(523,t+.2); g.gain.setValueAtTime(.1,t); g.gain.linearRampToValueAtTime(0,t+.3); o.start(t); o.stop(t+.3); }
  };
  if(presets[name]) presets[name]();
}

// =============================================
// 1. HOLE-BY-HOLE COURSE GUIDE (홀별 코스 가이드)
// =============================================
var courseGuideData = {
  '남서울CC': {
    par: 72, total: 6850, holes: [
      {h:1,p:4,y:380,hcp:7,tip:'우측 벙커 주의. 2번 아이언 레이업 추천',hazards:['bunker']},
      {h:2,p:3,y:175,hcp:15,tip:'핀 위치에 따라 클럽 선택. 숏 아이언 정확도',hazards:['water']},
      {h:3,p:5,y:520,hcp:1,tip:'시그니처 홀. 좌측 워터해저드, 3온 전략 유효',hazards:['water','bunker']},
      {h:4,p:4,y:405,hcp:5,tip:'내리막 티샷. 드라이버 정확도가 핵심',hazards:['slope']},
      {h:5,p:4,y:370,hcp:11,tip:'평탄한 페어웨이. 공격적 플레이 가능',hazards:['bunker']},
      {h:6,p:3,y:165,hcp:17,tip:'그린 앞 벙커 깊음. 한 클럽 크게',hazards:['bunker']},
      {h:7,p:4,y:395,hcp:3,tip:'도그레그 좌. 우측 에이밍 후 미들아이언',hazards:['ob']},
      {h:8,p:5,y:530,hcp:9,tip:'오르막 파5. 롱히터는 2온 가능',hazards:['bunker','slope']},
      {h:9,p:4,y:410,hcp:13,tip:'넓은 페어웨이. 드라이버 풀스윙',hazards:['bunker']},
      {h:10,p:4,y:390,hcp:8,tip:'바람 영향 큰 홀. 클럽 조정 필수',hazards:['bunker']},
      {h:11,p:3,y:190,hcp:14,tip:'그린 경사 심함. 핀 아래쪽 공략',hazards:['water','bunker']},
      {h:12,p:5,y:545,hcp:2,tip:'전략적 파5. 레이업 시 150~160야드 남기기',hazards:['water','bunker','ob']},
      {h:13,p:4,y:365,hcp:12,tip:'숏 파4. 3번 우드 or 하이브리드 추천',hazards:['bunker']},
      {h:14,p:4,y:420,hcp:4,tip:'가장 긴 파4. 정확한 티샷이 스코어 결정',hazards:['ob','slope']},
      {h:15,p:3,y:155,hcp:18,tip:'작은 그린. 핀 방향 확인 후 정교한 샷',hazards:['bunker']},
      {h:16,p:4,y:385,hcp:10,tip:'좌측 OB 주의. 우측 에이밍',hazards:['ob','bunker']},
      {h:17,p:5,y:510,hcp:6,tip:'내리막 파5. 이글 기회. 과감한 2온 시도',hazards:['water']},
      {h:18,p:4,y:440,hcp:16,tip:'마무리 홀. 클럽하우스 앞 갤러리 의식 말고 집중',hazards:['bunker','water']}
    ]
  },
  '파인크리크CC': {
    par: 72, total: 7100, holes: [
      {h:1,p:4,y:395,hcp:9,tip:'오프닝 홀. 우측 러프 깊음',hazards:['bunker']},
      {h:2,p:5,y:555,hcp:3,tip:'롱 파5. 3온 전략 추천. 좌측 OB',hazards:['ob','bunker']},
      {h:3,p:3,y:185,hcp:13,tip:'아이랜드 그린. 바람 체크 필수',hazards:['water']},
      {h:4,p:4,y:430,hcp:1,tip:'난이도 최고. S자 도그레그',hazards:['water','bunker','ob']},
      {h:5,p:4,y:375,hcp:11,tip:'내리막 티샷. 한 클럽 짧게',hazards:['slope']},
      {h:6,p:3,y:170,hcp:17,tip:'그린 둘레 벙커 4개. 정확도 승부',hazards:['bunker']},
      {h:7,p:4,y:410,hcp:5,tip:'페어웨이 좁음. 3번 우드 안전 플레이',hazards:['bunker','ob']},
      {h:8,p:4,y:380,hcp:15,tip:'평탄하고 넓음. 버디 찬스',hazards:['bunker']},
      {h:9,p:5,y:540,hcp:7,tip:'워터 크로싱. 레이업 거리 계산',hazards:['water','bunker']},
      {h:10,p:4,y:400,hcp:8,tip:'백나인 시작. 좌측 경사 주의',hazards:['slope','bunker']},
      {h:11,p:3,y:195,hcp:14,tip:'롱 파3. 미들아이언 or 하이브리드',hazards:['bunker','water']},
      {h:12,p:4,y:415,hcp:4,tip:'바람 통로. 로우볼 추천',hazards:['bunker']},
      {h:13,p:5,y:530,hcp:10,tip:'이글 찬스. 2온 시 좌측 안전 지역',hazards:['water']},
      {h:14,p:4,y:390,hcp:12,tip:'그린 언듈레이션 심함. 3퍼트 주의',hazards:['bunker']},
      {h:15,p:4,y:425,hcp:2,tip:'2번째 난이도. 정밀 티샷 필수',hazards:['ob','water','bunker']},
      {h:16,p:3,y:160,hcp:18,tip:'짧은 파3. 핀하이 공략',hazards:['bunker']},
      {h:17,p:4,y:405,hcp:6,tip:'경사진 페어웨이. 라이 대응력',hazards:['slope','bunker']},
      {h:18,p:5,y:560,hcp:16,tip:'피니싱 파5. 워터 왼쪽 레이업 후 웨지',hazards:['water','bunker']}
    ]
  },
  '블랙스톤CC': {
    par: 72, total: 6950, holes: [
      {h:1,p:4,y:385,hcp:7,tip:'스타팅 홀. 좌측 페어웨이 노리기',hazards:['bunker']},
      {h:2,p:3,y:180,hcp:15,tip:'바람 노출 심한 파3. 클럽 +1',hazards:['bunker','water']},
      {h:3,p:5,y:525,hcp:3,tip:'3온 안전 전략. 우측 크릭 주의',hazards:['water','bunker']},
      {h:4,p:4,y:410,hcp:1,tip:'가장 어려운 홀. 드라이버 정확도',hazards:['ob','water']},
      {h:5,p:4,y:360,hcp:13,tip:'짧은 파4. 버디 찬스 홀',hazards:['bunker']},
      {h:6,p:4,y:400,hcp:5,tip:'오르막 세컨샷. 거리감 중요',hazards:['slope','bunker']},
      {h:7,p:3,y:170,hcp:17,tip:'그린 뒤 절벽. 짧은 게 안전',hazards:['ob']},
      {h:8,p:5,y:540,hcp:9,tip:'롱히터 유리. 이글 도전 가능',hazards:['bunker']},
      {h:9,p:4,y:395,hcp:11,tip:'도그레그 우측. 페이드 샷 유리',hazards:['bunker','ob']},
      {h:10,p:4,y:375,hcp:10,tip:'내리막 어프로치. 런 계산',hazards:['bunker']},
      {h:11,p:5,y:550,hcp:2,tip:'시그니처 파5. 워터 2번 횡단',hazards:['water','water','bunker']},
      {h:12,p:3,y:165,hcp:18,tip:'핀 위치별 전략 변경. 안전 중앙',hazards:['bunker']},
      {h:13,p:4,y:420,hcp:4,tip:'롱 파4. 3번 우드 후 미들아이언',hazards:['bunker','slope']},
      {h:14,p:4,y:380,hcp:12,tip:'그린 좌측 경사. 우측 공략',hazards:['slope']},
      {h:15,p:3,y:190,hcp:14,tip:'롱 파3. 그린 뒤 벙커 깊음',hazards:['bunker','water']},
      {h:16,p:5,y:515,hcp:8,tip:'업힐 파5. 3온 전략이 안전',hazards:['slope','bunker']},
      {h:17,p:4,y:405,hcp:6,tip:'바람 강한 홀. 저탄도 샷',hazards:['bunker']},
      {h:18,p:4,y:435,hcp:16,tip:'피니싱 롱파4. 파 세이브 목표',hazards:['bunker','water']}
    ]
  }
};

function renderHoleGuide(courseName){
  var data = courseGuideData[courseName];
  if(!data) return '<div style="text-align:center;padding:30px;color:var(--text-muted)"><div style="font-size:40px;margin-bottom:12px">&#9971;</div><p>이 코스의 홀별 가이드가 준비 중입니다.</p><p style="font-size:11px;margin-top:8px">남서울CC, 파인크리크CC, 블랙스톤CC 가이드가 준비되어 있습니다.</p></div>';
  var html = '<div style="display:flex;justify-content:space-between;margin-bottom:16px"><div><span class="v20-badge" style="background:var(--primary);color:#fff">PAR '+data.par+'</span></div><div style="font-size:13px;font-weight:700;color:var(--text-muted)">Total '+data.total.toLocaleString()+' yards</div></div>';
  data.holes.forEach(function(hole){
    var parClass = hole.p === 3 ? 'v20-hole-par3' : hole.p === 5 ? 'v20-hole-par5' : 'v20-hole-par4';
    var hazardHtml = hole.hazards.map(function(h){
      var cls = h === 'water' ? 'v20-hazard-water' : h === 'bunker' ? 'v20-hazard-bunker' : h === 'ob' ? 'v20-hazard-ob' : 'v20-hazard-slope';
      var label = h === 'water' ? '&#128167; 워터' : h === 'bunker' ? '&#9898; 벙커' : h === 'ob' ? '&#9940; OB' : '&#9968; 경사';
      return '<span class="v20-hole-hazard '+cls+'">'+label+'</span>';
    }).join('');
    html += '<div class="v20-hole-card"><div style="display:flex;align-items:center;flex-wrap:wrap;gap:8px"><span class="v20-hole-num">'+hole.h+'</span><span class="v20-hole-par '+parClass+'">PAR '+hole.p+'</span><span style="font-size:13px;font-weight:700">'+hole.y+'y</span><span style="font-size:11px;color:var(--text-muted)">HCP '+hole.hcp+'</span><div style="margin-left:auto">'+hazardHtml+'</div></div><p style="font-size:12px;color:var(--text-muted);margin-top:8px;line-height:1.6">&#128161; '+hole.tip+'</p></div>';
  });
  return html;
}

// =============================================
// 2. AI COURSE STRATEGY (AI 코스 전략가)
// =============================================
var strategyTips = {
  beginner: {
    title: '&#127942; 초보자 전략 (HC 30+)',
    tips: [
      {title: '보기 플레이 목표', desc: '모든 홀에서 보기를 목표로 하세요. 파는 보너스입니다. 무리한 공략보다 안정적 3온 전략이 핵심.'},
      {title: '드라이버보다 3번 우드', desc: '티샷에서 방향성이 불안하면 3번 우드나 하이브리드로 페어웨이 키핑에 집중하세요.'},
      {title: '100야드 이내 집중', desc: '100야드 이내 어프로치와 퍼팅 연습에 시간의 60%를 투자하세요. 스코어 단축의 핵심입니다.'},
      {title: '해저드 회피 우선', desc: '워터해저드나 깊은 벙커가 있으면 무조건 안전 루트로 돌아가세요. 1타 손해가 3타 손해보다 낫습니다.'},
      {title: '그린 중앙 공략', desc: '핀 위치와 관계없이 그린 중앙을 노리세요. 2퍼트 이내가 목표입니다.'}
    ]
  },
  intermediate: {
    title: '&#127941; 중급자 전략 (HC 15-29)',
    tips: [
      {title: '코스 매니지먼트', desc: '파5에서 버디 기회를 만들고, 어려운 파4에서는 보기 허용. 리스크-리워드 계산이 핵심.'},
      {title: '150야드 기준 클럽 선택', desc: '세컨샷 150야드를 기준으로 티샷 거리를 역산하세요. 자신 있는 거리를 남기는 것이 중요.'},
      {title: '퍼팅 거리감 훈련', desc: '10m 이상 롱퍼트에서 거리감을 맞추는 연습. 3퍼트를 줄이면 5타는 줄어듭니다.'},
      {title: '바운스 활용 어프로치', desc: '그린 주변에서 다양한 어프로치 샷(피치, 칩, 범프앤런)을 구사하세요.'},
      {title: '라운드 후반 집중력', desc: '14번홀 이후 집중력 저하에 대비. 프리샷 루틴을 꼭 지키세요.'}
    ]
  },
  advanced: {
    title: '&#127942; 상급자 전략 (HC 0-14)',
    tips: [
      {title: '샷 쉐이핑 활용', desc: '도그레그 홀에서 페이드/드로우를 의도적으로 구사. 코스 디자인에 맞춘 샷 선택.'},
      {title: '핀 포지션 공략', desc: '그린 경사와 핀 위치를 분석해 홀 쪽으로 공을 굴릴 수 있는 착지 지점을 선택하세요.'},
      {title: '스트로크 게인드 분석', desc: '어프로치(100-150y)와 퍼팅에서 SG를 추적. 약점 파악 후 집중 연습.'},
      {title: '코스 레코드 도전', desc: '버디 가능 홀(숏 파4, 파5)을 미리 파악하고 적극적으로 공략하세요.'},
      {title: '멘탈 리셋', desc: '더블 보기 이후 다음 홀에서 감정 리셋. 3홀 단위로 사고하는 습관을 기르세요.'}
    ]
  }
};

function renderStrategy(){
  var html = '';
  ['beginner','intermediate','advanced'].forEach(function(tier){
    var data = strategyTips[tier];
    html += '<div class="v20-strategy-tier '+tier+'"><h4 style="font-size:16px;font-weight:800;margin-bottom:12px">'+data.title+'</h4>';
    data.tips.forEach(function(tip){
      html += '<div class="v20-card"><h4>'+tip.title+'</h4><p>'+tip.desc+'</p></div>';
    });
    html += '</div>';
  });
  return html;
}

// =============================================
// 3. GREEN FEE PRICE TREND (그린피 시세 트렌드)
// =============================================
var priceTrendData = {
  months: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
  weekday: [120,115,135,155,170,165,160,155,150,165,140,125],
  weekend: [195,185,215,250,275,265,255,245,240,260,220,200]
};

function drawPriceTrend(canvasId){
  var canvas = document.getElementById(canvasId);
  if(!canvas) return;
  var ctx = canvas.getContext('2d');
  var W = canvas.width = canvas.parentElement.offsetWidth || 560;
  var H = canvas.height = 280;
  var pad = {top:30,right:20,bottom:40,left:55};
  var cW = W - pad.left - pad.right;
  var cH = H - pad.top - pad.bottom;

  ctx.clearRect(0,0,W,H);
  var isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  ctx.fillStyle = isDark ? '#1e1e1e' : '#fff';
  ctx.fillRect(0,0,W,H);

  var maxVal = Math.max.apply(null, priceTrendData.weekend) + 20;
  var minVal = Math.min.apply(null, priceTrendData.weekday) - 20;
  var range = maxVal - minVal;

  ctx.strokeStyle = isDark ? '#333' : '#e0e0e0';
  ctx.lineWidth = 1;
  for(var g = 0; g < 5; g++){
    var gy = pad.top + (cH / 4) * g;
    ctx.beginPath(); ctx.moveTo(pad.left, gy); ctx.lineTo(W - pad.right, gy); ctx.stroke();
    var val = Math.round(maxVal - (range / 4) * g);
    ctx.fillStyle = isDark ? '#999' : '#666';
    ctx.font = '11px sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText(val + '천', pad.left - 8, gy + 4);
  }

  ctx.textAlign = 'center';
  priceTrendData.months.forEach(function(m, i){
    var x = pad.left + (cW / 11) * i;
    ctx.fillStyle = isDark ? '#999' : '#666';
    ctx.fillText(m, x, H - 12);
  });

  function drawLine(data, color, label){
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = 3;
    ctx.lineJoin = 'round';
    data.forEach(function(v, i){
      var x = pad.left + (cW / 11) * i;
      var y = pad.top + cH - ((v - minVal) / range) * cH;
      if(i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();

    data.forEach(function(v, i){
      var x = pad.left + (cW / 11) * i;
      var y = pad.top + cH - ((v - minVal) / range) * cH;
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 2;
      ctx.stroke();
    });
  }

  drawLine(priceTrendData.weekday, '#1565c0', '주중');
  drawLine(priceTrendData.weekend, '#c62828', '주말');

  ctx.font = 'bold 12px sans-serif';
  ctx.fillStyle = '#1565c0';
  ctx.fillText('&#9632; 주중', W - 90, 18);
  ctx.fillStyle = '#c62828';
  ctx.fillText('&#9632; 주말', W - 30, 18);

  ctx.fillStyle = '#1565c0'; ctx.fillRect(W-100, 10, 10, 10);
  ctx.fillStyle = '#c62828'; ctx.fillRect(W-40, 10, 10, 10);
  ctx.fillStyle = isDark ? '#ccc' : '#333';
  ctx.font = '11px sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText('주중', W-88, 19);
  ctx.fillText('주말', W-28, 19);
}

// =============================================
// 4. ROUND COST SPLITTER (라운드 비용 정산기)
// =============================================
var splitState = { people: 4, greenFee: 160, cartFee: 80, caddyFee: 120, meal: 60, extra: 0 };

function calcSplit(){
  var total = (splitState.greenFee + splitState.cartFee + splitState.caddyFee + splitState.meal + splitState.extra) * 1000;
  var perPerson = Math.ceil(total / splitState.people);
  return { total: total, perPerson: perPerson };
}

function renderSplitCalc(){
  var result = calcSplit();
  var html = '<div style="margin-bottom:16px"><label style="font-size:13px;font-weight:700;display:block;margin-bottom:8px">&#128101; 인원수</label><div style="display:flex;gap:8px">';
  [2,3,4,5].forEach(function(n){
    html += '<button class="v20-btn v20-btn-sm '+(n===splitState.people?'v20-btn-primary':'v20-btn-secondary')+'" onclick="window._v20SetPeople('+n+')">'+n+'명</button>';
  });
  html += '</div></div><div class="v20-divider"></div>';

  var items = [
    {key:'greenFee',label:'&#9971; 그린피',val:splitState.greenFee},
    {key:'cartFee',label:'&#128664; 카트비',val:splitState.cartFee},
    {key:'caddyFee',label:'&#128694; 캐디피',val:splitState.caddyFee},
    {key:'meal',label:'&#127860; 식사',val:splitState.meal},
    {key:'extra',label:'&#128178; 기타',val:splitState.extra}
  ];

  items.forEach(function(item){
    html += '<div class="v20-split-row"><span style="font-size:13px;font-weight:600">'+item.label+'</span><div style="display:flex;align-items:center;gap:8px"><input type="number" class="v20-input" style="width:100px;text-align:right" value="'+item.val+'" onchange="window._v20SetCost(\''+item.key+'\',this.value)"><span style="font-size:12px;color:var(--text-muted)">천원</span></div></div>';
  });

  html += '<div class="v20-divider"></div>';
  html += '<div class="v20-split-total">총 비용: '+result.total.toLocaleString()+'원</div>';
  html += '<div class="v20-split-total" style="font-size:24px;color:var(--accent)">1인당: '+result.perPerson.toLocaleString()+'원</div>';
  html += '<div style="text-align:center;margin-top:8px"><button class="v20-btn v20-btn-primary" onclick="window._v20ShareSplit()">&#128172; 정산 결과 공유</button></div>';
  return html;
}

window._v20SetPeople = function(n){ splitState.people = n; document.getElementById('v20SplitContent').innerHTML = renderSplitCalc(); playSfx20('cost_split'); };
window._v20SetCost = function(key, val){ splitState[key] = parseInt(val) || 0; document.getElementById('v20SplitContent').innerHTML = renderSplitCalc(); };
window._v20ShareSplit = function(){
  var r = calcSplit();
  var text = '&#9971; 라운드 비용 정산\n인원: '+splitState.people+'명\n총 비용: '+r.total.toLocaleString()+'원\n1인당: '+r.perPerson.toLocaleString()+'원\n\n- 그린피: '+(splitState.greenFee*1000).toLocaleString()+'원\n- 카트비: '+(splitState.cartFee*1000).toLocaleString()+'원\n- 캐디피: '+(splitState.caddyFee*1000).toLocaleString()+'원\n- 식사: '+(splitState.meal*1000).toLocaleString()+'원';
  if(navigator.share){ navigator.share({title:'라운드 비용 정산',text:text}); }
  else{ navigator.clipboard.writeText(text).then(function(){ if(window.showToast) window.showToast('정산 결과가 복사되었습니다!','success'); }); }
};

// =============================================
// 5. GOLF SEASON CALENDAR (골프 시즌 캘린더)
// =============================================
var seasonData = {
  regions: [
    {name:'수도권', months:[2,2,3,4,4,3,2,2,3,4,3,2], best:[4,5,10], avoid:[1,2,7,8]},
    {name:'강원도', months:[1,1,3,4,4,3,2,2,3,4,3,1], best:[5,6,9,10], avoid:[12,1,2]},
    {name:'충청도', months:[2,2,3,4,4,3,2,2,3,4,3,2], best:[4,5,10], avoid:[1,7]},
    {name:'전라도', months:[2,2,3,4,4,3,2,3,3,4,3,2], best:[4,5,10,11], avoid:[7,8]},
    {name:'경상도', months:[2,2,3,4,4,3,2,2,3,4,3,2], best:[4,5,10], avoid:[7,8]},
    {name:'제주도', months:[3,3,3,4,4,3,3,3,3,4,4,3], best:[3,4,5,10,11], avoid:[]}
  ]
};

function renderSeasonCalendar(){
  var monthNames = ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'];
  var html = '<div style="overflow-x:auto"><table style="width:100%;border-collapse:collapse;font-size:12px"><thead><tr><th style="text-align:left;padding:8px;font-weight:700">지역</th>';
  monthNames.forEach(function(m){ html += '<th style="padding:8px;text-align:center;font-weight:600">'+m+'</th>'; });
  html += '</tr></thead><tbody>';

  seasonData.regions.forEach(function(region){
    html += '<tr><td style="padding:8px;font-weight:700">'+region.name+'</td>';
    region.months.forEach(function(score, i){
      var cls = score === 4 ? 'v20-season-best' : score === 3 ? 'v20-season-good' : score === 2 ? 'v20-season-normal' : 'v20-season-avoid';
      var label = score === 4 ? '&#127775;' : score === 3 ? '&#9898;' : score === 2 ? '&#9711;' : '&#10060;';
      html += '<td style="padding:4px"><div class="v20-season-month '+cls+'">'+label+'</div></td>';
    });
    html += '</tr>';
  });

  html += '</tbody></table></div>';
  html += '<div style="display:flex;gap:16px;margin-top:12px;font-size:11px;flex-wrap:wrap">';
  html += '<span>&#127775; 최적기</span><span>&#9898; 좋음</span><span>&#9711; 보통</span><span>&#10060; 비추천</span>';
  html += '</div>';

  var now = new Date();
  var currentMonth = now.getMonth();
  html += '<div class="v20-divider"></div><h4 style="font-size:15px;font-weight:700;margin-bottom:12px">&#128197; '+monthNames[currentMonth]+' 추천 지역</h4>';
  var recs = seasonData.regions.filter(function(r){ return r.months[currentMonth] >= 3; }).sort(function(a,b){ return b.months[currentMonth] - a.months[currentMonth]; });
  if(recs.length > 0){
    recs.forEach(function(r){
      var score = r.months[currentMonth];
      html += '<div class="v20-card"><h4>'+(score === 4 ? '&#127775;' : '&#9898;')+' '+r.name+'</h4><p>'+(score === 4 ? '이번 달 최적의 골프 시즌입니다! 예약 서두르세요.' : '쾌적한 라운드가 가능합니다.')+'</p></div>';
    });
  }
  return html;
}

// =============================================
// 6. COURSE COLLECTION (코스 컬렉션)
// =============================================
var collections = JSON.parse(localStorage.getItem('sg_collections') || '{"bucketlist":[],"played":[],"favorites":[],"nearby":[]}');
function saveCollections(){ localStorage.setItem('sg_collections', JSON.stringify(collections)); }

var collectionMeta = {
  bucketlist: {icon:'&#127919;', name:'버킷리스트', desc:'꼭 가보고 싶은 골프장'},
  played: {icon:'&#9989;', name:'라운드 완료', desc:'이미 라운드한 골프장'},
  favorites: {icon:'&#10084;&#65039;', name:'즐겨찾기', desc:'자주 가는 골프장'},
  nearby: {icon:'&#128205;', name:'근처 추천', desc:'가까운 거리의 골프장'}
};

function renderCollections(){
  var html = '<div class="v20-grid2">';
  Object.keys(collectionMeta).forEach(function(key){
    var meta = collectionMeta[key];
    var count = (collections[key] || []).length;
    html += '<div class="v20-collection-card" onclick="window._v20ShowCollection(\''+key+'\')"><div class="v20-collection-icon">'+meta.icon+'</div><div class="v20-collection-name">'+meta.name+'</div><div class="v20-collection-count">'+count+'개 코스</div></div>';
  });
  html += '</div>';

  html += '<div class="v20-divider"></div>';
  html += '<h4 style="font-size:14px;font-weight:700;margin-bottom:12px">&#10133; 코스 추가</h4>';
  html += '<div style="display:flex;gap:8px;flex-wrap:wrap"><input type="text" class="v20-input" id="v20CollInput" placeholder="골프장명 입력" style="flex:1;min-width:200px"><select class="v20-select" id="v20CollSelect">';
  Object.keys(collectionMeta).forEach(function(key){
    html += '<option value="'+key+'">'+collectionMeta[key].name+'</option>';
  });
  html += '</select><button class="v20-btn v20-btn-primary v20-btn-sm" onclick="window._v20AddToCollection()">추가</button></div>';
  html += '<div id="v20CollDetail" style="margin-top:16px"></div>';
  return html;
}

window._v20ShowCollection = function(key){
  var meta = collectionMeta[key];
  var items = collections[key] || [];
  var html = '<h4 style="font-size:15px;font-weight:700;margin-bottom:12px">'+meta.icon+' '+meta.name+' ('+items.length+'개)</h4>';
  if(items.length === 0){
    html += '<p style="color:var(--text-muted);text-align:center;padding:20px">아직 추가된 코스가 없습니다.</p>';
  } else {
    items.forEach(function(name,i){
      html += '<div class="v20-card" style="display:flex;justify-content:space-between;align-items:center"><span style="font-weight:600">'+name+'</span><button class="v20-btn v20-btn-sm v20-btn-secondary" onclick="window._v20RemoveFromCollection(\''+key+'\','+i+')">&#10060;</button></div>';
    });
  }
  document.getElementById('v20CollDetail').innerHTML = html;
  playSfx20('collection_add');
};

window._v20AddToCollection = function(){
  var name = document.getElementById('v20CollInput').value.trim();
  var key = document.getElementById('v20CollSelect').value;
  if(!name) return;
  if(!collections[key]) collections[key] = [];
  if(collections[key].indexOf(name) === -1){
    collections[key].push(name);
    saveCollections();
    document.getElementById('v20CollInput').value = '';
    if(window.showToast) window.showToast(collectionMeta[key].name+'에 추가됨!','success');
    playSfx20('collection_add');
    var wrapper = document.getElementById('v20CollectionsContent');
    if(wrapper) wrapper.innerHTML = renderCollections();
  }
};

window._v20RemoveFromCollection = function(key, idx){
  collections[key].splice(idx, 1);
  saveCollections();
  window._v20ShowCollection(key);
};

// =============================================
// 7. SWING TEMPO TRAINER V2 (스윙 템포 트레이너 v2)
// =============================================
var tempoState = { bpm: 72, running: false, interval: null, beat: 0, ratio: '3:1' };

var tempoPresets = [
  {name:'느린 템포', bpm:60, ratio:'3:1', desc:'초보자/시니어 추천. 안정적 스윙'},
  {name:'표준 템포', bpm:72, ratio:'3:1', desc:'PGA 투어 평균 템포'},
  {name:'빠른 템포', bpm:84, ratio:'3:1', desc:'경험 많은 골퍼. 단호한 스윙'},
  {name:'니클라우스', bpm:66, ratio:'4:1', desc:'잭 니클라우스 스타일. 느린 백스윙'},
  {name:'타이거 우즈', bpm:76, ratio:'3:1', desc:'타이거 우즈 스타일. 강력한 임팩트'},
  {name:'로리 맥길로이', bpm:82, ratio:'2.5:1', desc:'빠른 템포. 파워풀한 스윙'}
];

function renderTempoTrainer(){
  var html = '<div style="text-align:center;margin-bottom:20px"><div style="font-size:48px;font-weight:900;color:var(--primary)" id="v20TempoBPM">'+tempoState.bpm+'</div><div style="font-size:12px;color:var(--text-muted)">BPM (Beats Per Minute)</div></div>';

  html += '<div style="margin-bottom:16px"><input type="range" min="40" max="120" value="'+tempoState.bpm+'" style="width:100%;accent-color:var(--primary)" oninput="window._v20SetTempo(this.value)"></div>';

  html += '<div class="v20-tempo-visual" id="v20TempoVisual">';
  for(var i = 0; i < 8; i++){
    html += '<div class="v20-tempo-bar" style="height:10px;background:var(--border)" id="v20Bar'+i+'"></div>';
  }
  html += '</div>';

  html += '<div style="display:flex;gap:10px;justify-content:center;margin-bottom:20px">';
  html += '<button class="v20-btn v20-btn-primary" id="v20TempoToggle" onclick="window._v20ToggleTempo()">&#9654; 시작</button>';
  html += '</div>';

  html += '<div class="v20-divider"></div><h4 style="font-size:14px;font-weight:700;margin-bottom:12px">&#127926; 프리셋</h4>';
  html += '<div class="v20-grid2">';
  tempoPresets.forEach(function(p){
    html += '<div class="v20-card" style="cursor:pointer" onclick="window._v20ApplyPreset('+p.bpm+')"><h4>'+p.name+' ('+p.bpm+' BPM)</h4><p>'+p.desc+'</p></div>';
  });
  html += '</div>';

  html += '<div class="v20-divider"></div>';
  html += '<div class="v20-card"><h4>&#128161; 스윙 템포 팁</h4><p>백스윙:다운스윙 비율 3:1이 가장 이상적입니다. 백스윙 0.75초, 다운스윙 0.25초 (72 BPM 기준). 메트로놈 첫 비트에 백스윙 시작, 네 번째 비트에 임팩트하세요.</p></div>';
  return html;
}

window._v20SetTempo = function(val){
  tempoState.bpm = parseInt(val);
  var el = document.getElementById('v20TempoBPM');
  if(el) el.textContent = tempoState.bpm;
  if(tempoState.running){
    clearInterval(tempoState.interval);
    startTempoLoop();
  }
};

window._v20ApplyPreset = function(bpm){
  tempoState.bpm = bpm;
  var el = document.getElementById('v20TempoBPM');
  if(el) el.textContent = bpm;
  var slider = document.querySelector('#v20TempoContent input[type="range"]');
  if(slider) slider.value = bpm;
  playSfx20('tempo_tick');
};

function startTempoLoop(){
  tempoState.beat = 0;
  tempoState.interval = setInterval(function(){
    var isAccent = tempoState.beat % 4 === 0;
    playSfx20(isAccent ? 'tempo_accent' : 'tempo_tick');
    for(var i = 0; i < 8; i++){
      var bar = document.getElementById('v20Bar'+i);
      if(bar){
        var h = i === tempoState.beat % 8 ? 50 : 10;
        var bg = i === tempoState.beat % 8 ? 'var(--primary)' : 'var(--border)';
        bar.style.height = h + 'px';
        bar.style.background = bg;
      }
    }
    tempoState.beat++;
  }, 60000 / tempoState.bpm);
}

window._v20ToggleTempo = function(){
  tempoState.running = !tempoState.running;
  var btn = document.getElementById('v20TempoToggle');
  if(tempoState.running){
    if(btn) btn.innerHTML = '&#9724; 정지';
    startTempoLoop();
  } else {
    if(btn) btn.innerHTML = '&#9654; 시작';
    clearInterval(tempoState.interval);
    for(var i = 0; i < 8; i++){
      var bar = document.getElementById('v20Bar'+i);
      if(bar){ bar.style.height = '10px'; bar.style.background = 'var(--border)'; }
    }
  }
};

// =============================================
// 8. GOLF NUTRITION GUIDE V2 (골프 영양 가이드 v2)
// =============================================
var nutritionGuide = {
  before: [
    {icon:'&#127838;',name:'라운드 2시간 전 식사',desc:'복합탄수화물 위주 (통곡물 빵, 오트밀). 단백질은 달걀 또는 치킨. 기름진 음식 피하기.',color:'#e8f5e9'},
    {icon:'&#127827;',name:'라운드 30분 전 간식',desc:'바나나 1개 + 견과류 한줌. 빠른 에너지 공급과 지속력 확보.',color:'#fff3e0'},
    {icon:'&#128167;',name:'수분 섭취',desc:'라운드 시작 1시간 전 물 500ml. 카페인은 소량(커피 1잔) 집중력에 도움.',color:'#e3f2fd'}
  ],
  during: [
    {icon:'&#127820;',name:'3홀마다 수분',desc:'매 3홀마다 물 또는 스포츠음료 150-200ml. 탈수는 집중력과 스윙 정확도를 떨어뜨립니다.',color:'#e3f2fd'},
    {icon:'&#127852;',name:'9홀 후 간식',desc:'에너지바, 바나나, 견과류 등. 혈당 유지가 후반 9홀 퍼포먼스의 핵심.',color:'#fff8e1'},
    {icon:'&#127815;',name:'전해질 보충',desc:'땀을 많이 흘리는 여름철에는 전해질 음료 필수. 나트륨/칼륨 보충.',color:'#f3e5f5'},
    {icon:'&#127826;',name:'과일 간식',desc:'포도, 오렌지 등 수분 함량 높은 과일. 비타민C로 피로 회복 도움.',color:'#fce4ec'}
  ],
  after: [
    {icon:'&#127830;',name:'30분 내 단백질',desc:'라운드 후 30분 이내 단백질 섭취. 닭가슴살, 생선, 두부 등. 근육 회복 촉진.',color:'#e8f5e9'},
    {icon:'&#129380;',name:'항산화 식품',desc:'블루베리, 시금치 등 항산화 식품으로 운동 후 산화 스트레스 줄이기.',color:'#f3e5f5'},
    {icon:'&#128167;',name:'수분 회복',desc:'체중 감소분의 150% 수분 보충. 라운드 전후 체중 체크 습관화.',color:'#e3f2fd'}
  ]
};

function renderNutritionGuide(){
  var html = '';
  var phases = [{key:'before',title:'&#127774; 라운드 전',data:nutritionGuide.before},{key:'during',title:'&#9971; 라운드 중',data:nutritionGuide.during},{key:'after',title:'&#127769; 라운드 후',data:nutritionGuide.after}];

  phases.forEach(function(phase){
    html += '<h4 style="font-size:15px;font-weight:700;margin-bottom:12px;margin-top:16px">'+phase.title+'</h4>';
    phase.data.forEach(function(item){
      html += '<div class="v20-nutrition-card"><div class="v20-nutrition-icon" style="background:'+item.color+'">'+item.icon+'</div><div class="v20-nutrition-info"><div class="v20-nutrition-name">'+item.name+'</div><div class="v20-nutrition-desc">'+item.desc+'</div></div></div>';
    });
  });
  return html;
}

// =============================================
// 9. GOLF IQ v5 QUIZ (15 new questions, 80→95)
// =============================================
var quizV5 = [
  {q:'골프에서 &quot;스티미&quot;(stymie)란?',a:['그린 위에서 다른 공이 퍼트 라인을 막는 상황','벙커에서 공이 묻힌 상황','러프에서 공을 찾지 못하는 상황','티샷이 OB 구역에 들어가는 상황'],c:0},
  {q:'PGA 투어에서 &quot;FedEx Cup&quot;이 시작된 해는?',a:['2005년','2007년','2009년','2003년'],c:1},
  {q:'&quot;베어 트랩&quot;(Bear Trap)으로 유명한 PGA 내셔널은 몇 번 홀이 유명한가?',a:['7-8-9번','13-14-15번','15-16-17번','10-11-12번'],c:2},
  {q:'골프공의 딤플 개수가 가장 일반적인 범위는?',a:['200-250개','300-500개','500-700개','100-200개'],c:1},
  {q:'&quot;하젤타인 내셔널&quot;에서 2016년 라이더컵 유럽팀 캡틴은?',a:['콜린 몽고메리','다렌 클라크','토마스 비외른','이안 울스남'],c:1},
  {q:'&quot;캘러웨이 핸디캡 시스템&quot;의 특징은?',a:['한 라운드 점수로 핸디캡 산출 가능','반드시 20라운드 이상 필요','공식 대회에서만 사용 가능','프로 선수에게만 적용'],c:0},
  {q:'드라이버의 &quot;COR&quot;(반발계수) 규제 상한값은?',a:['0.800','0.830','0.850','0.900'],c:1},
  {q:'&quot;아이리시 링크스&quot; 코스의 특징이 아닌 것은?',a:['해안가에 위치','풍성한 나무 숲','자연 모래 벙커','포트 러프'],c:1},
  {q:'골프에서 &quot;프로비저널 볼&quot;을 선언해야 하는 경우는?',a:['공이 워터해저드에 빠졌을 때','공이 분실되었거나 OB일 수 있을 때','그린에서 3퍼트 했을 때','동반자가 요청했을 때'],c:1},
  {q:'&quot;거스트 오브 윈드&quot;가 주요 변수가 되는 대회가 아닌 것은?',a:['디 오픈 챔피언십','마스터즈','아일랜드 오픈','스코티시 오픈'],c:1},
  {q:'웨지의 &quot;바운스 각도&quot;가 높을 때(12-16도) 유리한 라이는?',a:['단단한 라이','부드러운 모래/잔디','페어웨이','그린 위'],c:1},
  {q:'&quot;로스트 볼&quot;의 공식 수색 시간은 2019년 규칙 개정 후?',a:['5분','3분','2분','10분'],c:1},
  {q:'골프 스윙에서 &quot;X-팩터&quot;란?',a:['비거리','어깨 회전과 힙 회전의 각도 차이','팔로우스루 크기','그립 강도'],c:1},
  {q:'&quot;컨디셔닝&quot;에서 그린 스피드를 측정하는 기구는?',a:['레이저 거리계','스팀프미터','디지미터','그린리더'],c:1},
  {q:'&quot;언플레이어블&quot; 선언 시 선택할 수 없는 구제방법은?',a:['2클럽 이내 드롭','홀과 공을 잇는 선 뒤로 드롭','원래 위치에서 재타','최초 프리 드롭'],c:3}
];

var quizV5State = { current: 0, score: 0, answered: false, total: quizV5.length, streak: 0 };

function renderQuizV5(){
  if(quizV5State.current >= quizV5State.total){
    var pct = Math.round((quizV5State.score / quizV5State.total) * 100);
    var grade = pct >= 90 ? 'S' : pct >= 80 ? 'A' : pct >= 60 ? 'B' : pct >= 40 ? 'C' : 'D';
    var gradeColor = grade === 'S' ? '#ff6b35' : grade === 'A' ? '#4caf50' : grade === 'B' ? '#1565c0' : grade === 'C' ? '#f57f17' : '#c62828';
    return '<div style="text-align:center;padding:30px"><div style="font-size:60px;font-weight:900;color:'+gradeColor+'">'+grade+'</div><div style="font-size:20px;font-weight:700;margin:12px 0">'+quizV5State.score+' / '+quizV5State.total+' ('+pct+'%)</div><p style="color:var(--text-muted)">Golf IQ v5 완료!</p><button class="v20-btn v20-btn-primary" onclick="window._v20RestartQuiz()" style="margin-top:16px">&#128260; 다시 도전</button></div>';
  }

  var q = quizV5[quizV5State.current];
  var html = '<div style="display:flex;justify-content:space-between;margin-bottom:16px"><span class="v20-badge" style="background:var(--primary);color:#fff">'+(quizV5State.current+1)+' / '+quizV5State.total+'</span><span style="font-size:13px;font-weight:700">&#127942; '+quizV5State.score+'점</span></div>';
  html += '<div class="v20-card"><h4 style="font-size:14px;line-height:1.6">'+q.q+'</h4></div>';
  q.a.forEach(function(ans, i){
    html += '<button class="v20-btn v20-btn-secondary" style="width:100%;margin-bottom:8px;text-align:left;justify-content:flex-start" onclick="window._v20AnswerQuiz('+i+')" id="v20Ans'+i+'">'+String.fromCharCode(9312+i)+' '+ans+'</button>';
  });
  html += '<div id="v20QuizFeedback"></div>';
  return html;
}

window._v20AnswerQuiz = function(idx){
  if(quizV5State.answered) return;
  quizV5State.answered = true;
  var q = quizV5[quizV5State.current];
  var correct = idx === q.c;
  if(correct){ quizV5State.score++; quizV5State.streak++; }
  else { quizV5State.streak = 0; }

  var correctBtn = document.getElementById('v20Ans'+q.c);
  if(correctBtn) correctBtn.style.background = '#4caf50';
  if(correctBtn) correctBtn.style.color = '#fff';
  if(!correct){
    var wrongBtn = document.getElementById('v20Ans'+idx);
    if(wrongBtn) wrongBtn.style.background = '#c62828';
    if(wrongBtn) wrongBtn.style.color = '#fff';
  }

  var fb = document.getElementById('v20QuizFeedback');
  if(fb) fb.innerHTML = '<div class="v20-card" style="margin-top:12px;border-left:4px solid '+(correct?'#4caf50':'#c62828')+'"><p>'+(correct?'&#9989; 정답!':'&#10060; 오답!')+(quizV5State.streak >= 3 ? ' &#128293; '+quizV5State.streak+'연속!' : '')+'</p></div><button class="v20-btn v20-btn-primary" onclick="window._v20NextQuiz()" style="margin-top:8px">다음 문제 &#10132;</button>';
  playSfx20('quiz_v5');
};

window._v20NextQuiz = function(){
  quizV5State.current++;
  quizV5State.answered = false;
  document.getElementById('v20QuizContent').innerHTML = renderQuizV5();
};

window._v20RestartQuiz = function(){
  quizV5State.current = 0;
  quizV5State.score = 0;
  quizV5State.streak = 0;
  quizV5State.answered = false;
  document.getElementById('v20QuizContent').innerHTML = renderQuizV5();
};

// =============================================
// 10. ACHIEVEMENTS V20 (12 new: 68→80)
// =============================================
var achievements20 = [
  {id:'hole_guide_user',icon:'&#128214;',name:'코스 분석가',desc:'홀별 코스 가이드 3회 열람',check:function(){return parseInt(localStorage.getItem('sg_hole_guide_views')||'0')>=3}},
  {id:'strategy_reader',icon:'&#129504;',name:'전략의 달인',desc:'AI 코스 전략 열람',check:function(){return localStorage.getItem('sg_strategy_viewed')==='1'}},
  {id:'price_tracker',icon:'&#128200;',name:'시세 분석가',desc:'그린피 트렌드 차트 확인',check:function(){return localStorage.getItem('sg_price_trend_viewed')==='1'}},
  {id:'cost_splitter',icon:'&#128176;',name:'정산왕',desc:'비용 정산기 사용',check:function(){return localStorage.getItem('sg_cost_split_used')==='1'}},
  {id:'season_planner',icon:'&#127774;',name:'시즌 플래너',desc:'골프 시즌 캘린더 확인',check:function(){return localStorage.getItem('sg_season_viewed')==='1'}},
  {id:'collection_5',icon:'&#127919;',name:'코스 수집가',desc:'컬렉션에 5개 이상 코스 추가',check:function(){var c=JSON.parse(localStorage.getItem('sg_collections')||'{}');var t=0;Object.keys(c).forEach(function(k){t+=c[k].length});return t>=5}},
  {id:'tempo_master',icon:'&#127926;',name:'템포 마스터',desc:'스윙 템포 트레이너 사용',check:function(){return localStorage.getItem('sg_tempo_used')==='1'}},
  {id:'nutrition_reader',icon:'&#127823;',name:'영양 전문가',desc:'골프 영양 가이드 열람',check:function(){return localStorage.getItem('sg_nutrition_viewed')==='1'}},
  {id:'quiz_v5_pass',icon:'&#129351;',name:'Golf IQ 마스터 v5',desc:'Golf IQ v5에서 80% 이상',check:function(){return parseInt(localStorage.getItem('sg_quiz_v5_score')||'0')>=12}},
  {id:'quiz_v5_perfect',icon:'&#127942;',name:'만점 골퍼',desc:'Golf IQ v5 15문항 전부 정답',check:function(){return parseInt(localStorage.getItem('sg_quiz_v5_score')||'0')>=15}},
  {id:'all_tabs_v20',icon:'&#127775;',name:'v20 올라운더',desc:'v20.0의 모든 탭 열람',check:function(){return localStorage.getItem('sg_v20_tabs_all')==='1'}},
  {id:'streak_collector',icon:'&#128293;',name:'퀴즈 연속왕',desc:'Golf IQ v5에서 5연속 정답',check:function(){return parseInt(localStorage.getItem('sg_quiz_v5_streak')||'0')>=5}}
];

function checkAchievements20(){
  var unlocked = JSON.parse(localStorage.getItem('sg_achievements_v20') || '[]');
  var newUnlocks = [];
  achievements20.forEach(function(ach){
    if(unlocked.indexOf(ach.id) === -1 && ach.check()){
      unlocked.push(ach.id);
      newUnlocks.push(ach);
    }
  });
  if(newUnlocks.length > 0){
    localStorage.setItem('sg_achievements_v20', JSON.stringify(unlocked));
    newUnlocks.forEach(function(ach){
      if(window.showToast) window.showToast(ach.icon+' '+ach.name+' 업적 달성!','success');
      playSfx20('achievement_v20');
    });
  }
}

function renderAchievements20(){
  var unlocked = JSON.parse(localStorage.getItem('sg_achievements_v20') || '[]');
  var html = '<div style="text-align:center;margin-bottom:16px"><span class="v20-badge" style="background:var(--primary);color:#fff">'+unlocked.length+' / '+achievements20.length+' 달성</span></div>';
  html += '<div class="v20-progress"><div class="v20-progress-fill" style="width:'+Math.round(unlocked.length/achievements20.length*100)+'%;background:linear-gradient(90deg,var(--primary),#2e9e4f)"></div></div>';
  html += '<div class="v20-grid2" style="margin-top:16px">';
  achievements20.forEach(function(ach){
    var done = unlocked.indexOf(ach.id) !== -1;
    html += '<div class="v20-card" style="text-align:center;opacity:'+(done?1:.4)+'"><div style="font-size:28px;margin-bottom:6px">'+ach.icon+'</div><div style="font-size:13px;font-weight:700">'+ach.name+'</div><div style="font-size:11px;color:var(--text-muted)">'+ach.desc+'</div>'+(done?'<div style="font-size:10px;color:var(--primary);margin-top:4px">&#10004; 달성</div>':'')+'</div>';
  });
  html += '</div>';
  return html;
}

// =============================================
// MAIN OVERLAY UI
// =============================================
var v20TabsVisited = {};

var overlay20 = document.createElement('div');
overlay20.className = 'v20-overlay';
overlay20.id = 'v20Overlay';
overlay20.innerHTML = '<div class="v20-modal"><div class="v20-hdr"><h2><span class="v20i">&#9971;</span> SmartGolf v20.0</h2><button class="v20-x" onclick="document.getElementById(\'v20Overlay\').classList.remove(\'active\')">&times;</button></div><div class="v20-tabs" id="v20Tabs"></div><div id="v20Content"></div></div>';
document.body.appendChild(overlay20);

overlay20.addEventListener('click', function(e){ if(e.target === overlay20) overlay20.classList.remove('active'); });

var v20Tabs = [
  {id:'holes',icon:'&#127948;',label:'홀별 가이드'},
  {id:'strategy',icon:'&#129504;',label:'AI 전략'},
  {id:'trend',icon:'&#128200;',label:'시세 트렌드'},
  {id:'split',icon:'&#128176;',label:'비용 정산'},
  {id:'season',icon:'&#127774;',label:'시즌 캘린더'},
  {id:'collection',icon:'&#127919;',label:'컬렉션'},
  {id:'tempo',icon:'&#127926;',label:'템포 v2'},
  {id:'nutrition',icon:'&#127823;',label:'영양 가이드'},
  {id:'quizv5',icon:'&#129504;',label:'Golf IQ v5'},
  {id:'achv20',icon:'&#127942;',label:'업적 v20'}
];

function renderV20Tabs(activeId){
  var tabsHtml = '';
  v20Tabs.forEach(function(tab){
    tabsHtml += '<div class="v20-tab'+(tab.id===activeId?' active':'')+'" onclick="window._v20SwitchTab(\''+tab.id+'\')">'+tab.icon+' '+tab.label+'</div>';
  });
  document.getElementById('v20Tabs').innerHTML = tabsHtml;
}

function renderV20Content(tabId){
  v20TabsVisited[tabId] = true;
  var content = '';
  switch(tabId){
    case 'holes':
      localStorage.setItem('sg_hole_guide_views', (parseInt(localStorage.getItem('sg_hole_guide_views')||'0')+1).toString());
      content = '<div style="margin-bottom:16px"><select class="v20-select" id="v20CourseSelect" onchange="window._v20SwitchCourse(this.value)">';
      Object.keys(courseGuideData).forEach(function(name, i){
        content += '<option value="'+name+'"'+(i===0?' selected':'')+'>'+name+'</option>';
      });
      content += '</select></div><div id="v20HoleContent">'+renderHoleGuide(Object.keys(courseGuideData)[0])+'</div>';
      playSfx20('hole_guide');
      break;
    case 'strategy':
      localStorage.setItem('sg_strategy_viewed','1');
      content = renderStrategy();
      playSfx20('course_strategy');
      break;
    case 'trend':
      localStorage.setItem('sg_price_trend_viewed','1');
      content = '<h4 style="font-size:15px;font-weight:700;margin-bottom:12px">&#128200; 전국 평균 그린피 월별 추이 (천원)</h4><canvas id="v20TrendCanvas" class="v20-trend-chart"></canvas><div class="v20-divider"></div><div class="v20-card"><h4>&#128161; 가성비 팁</h4><p>1-2월이 가장 저렴합니다 (주중 11.5~12만원). 4-5월, 10월이 성수기로 주말 25만원 이상. 예약은 2-3주 전이 가장 유리하며, 얼리버드 할인을 노려보세요.</p></div>';
      setTimeout(function(){ drawPriceTrend('v20TrendCanvas'); }, 100);
      playSfx20('price_trend');
      break;
    case 'split':
      content = '<div id="v20SplitContent">'+renderSplitCalc()+'</div>';
      localStorage.setItem('sg_cost_split_used','1');
      playSfx20('cost_split');
      break;
    case 'season':
      localStorage.setItem('sg_season_viewed','1');
      content = renderSeasonCalendar();
      playSfx20('season_cal');
      break;
    case 'collection':
      content = '<div id="v20CollectionsContent">'+renderCollections()+'</div>';
      break;
    case 'tempo':
      localStorage.setItem('sg_tempo_used','1');
      content = '<div id="v20TempoContent">'+renderTempoTrainer()+'</div>';
      break;
    case 'nutrition':
      localStorage.setItem('sg_nutrition_viewed','1');
      content = renderNutritionGuide();
      playSfx20('nutrition_tip');
      break;
    case 'quizv5':
      content = '<div id="v20QuizContent">'+renderQuizV5()+'</div>';
      break;
    case 'achv20':
      checkAchievements20();
      content = renderAchievements20();
      break;
  }

  if(Object.keys(v20TabsVisited).length >= v20Tabs.length){
    localStorage.setItem('sg_v20_tabs_all','1');
  }

  document.getElementById('v20Content').innerHTML = content;
  checkAchievements20();
}

window._v20SwitchTab = function(tabId){
  renderV20Tabs(tabId);
  renderV20Content(tabId);
};

window._v20SwitchCourse = function(name){
  document.getElementById('v20HoleContent').innerHTML = renderHoleGuide(name);
  playSfx20('hole_guide');
};

function openV20(){
  overlay20.classList.add('active');
  renderV20Tabs('holes');
  renderV20Content('holes');
}

// =============================================
// QUICK ACTION BUTTONS
// =============================================
var quickBtns = [
  {label:'&#127948; 홀가이드',tab:'holes'},
  {label:'&#129504; AI전략',tab:'strategy'},
  {label:'&#128200; 시세',tab:'trend'},
  {label:'&#128176; 정산',tab:'split'},
  {label:'&#127774; 시즌',tab:'season'}
];

var quickBar = document.createElement('div');
quickBar.style.cssText = 'max-width:1400px;margin:8px auto;padding:0 20px;display:flex;gap:6px;flex-wrap:wrap';
quickBtns.forEach(function(btn){
  var b = document.createElement('button');
  b.className = 'quick-btn';
  b.innerHTML = btn.label;
  b.addEventListener('click', function(){
    openV20();
    setTimeout(function(){ window._v20SwitchTab(btn.tab); }, 100);
  });
  quickBar.appendChild(b);
});

var statsBar = document.querySelector('.stats-bar');
if(statsBar && statsBar.parentNode){
  statsBar.parentNode.insertBefore(quickBar, statsBar.nextSibling);
}

// =============================================
// HEADER BUTTON
// =============================================
var hdr = document.querySelector('.header-inner') || document.querySelector('.header');
if(hdr){
  var v20btn = document.createElement('button');
  v20btn.className = 'view-btn';
  v20btn.innerHTML = '&#9971; v20';
  v20btn.title = 'SmartGolf v20.0 기능';
  v20btn.addEventListener('click', openV20);
  var viewToggle = hdr.querySelector('.view-toggle');
  if(viewToggle) viewToggle.appendChild(v20btn);
  else hdr.appendChild(v20btn);
}

// =============================================
// KEYBOARD SHORTCUTS (+5: Shift+1~5)
// =============================================
document.addEventListener('keydown', function(e){
  var t = e.target.tagName;
  if(t === 'INPUT' || t === 'TEXTAREA' || t === 'SELECT') return;
  if(!e.shiftKey) return;

  var shortcuts = {'1':'holes','2':'strategy','3':'trend','4':'split','5':'season'};
  if(shortcuts[e.key]){
    e.preventDefault();
    openV20();
    setTimeout(function(){ window._v20SwitchTab(shortcuts[e.key]); }, 100);
  }
});

// =============================================
// ESCAPE KEY
// =============================================
document.addEventListener('keydown', function(e){
  if(e.key === 'Escape'){
    overlay20.classList.remove('active');
    if(tempoState.running) window._v20ToggleTempo();
  }
});

// =============================================
// SAVE QUIZ RESULTS ON TAB SWITCH
// =============================================
var origSwitchTab = window._v20SwitchTab;
window._v20SwitchTab = function(tabId){
  if(quizV5State.current > 0){
    localStorage.setItem('sg_quiz_v5_score', quizV5State.score.toString());
    localStorage.setItem('sg_quiz_v5_streak', quizV5State.streak.toString());
  }
  renderV20Tabs(tabId);
  renderV20Content(tabId);
};

})();
