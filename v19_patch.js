(function(){
'use strict';

var css19 = document.createElement('style');
css19.textContent = `
.v19-overlay{position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,.88);z-index:10080;display:none;align-items:center;justify-content:center;backdrop-filter:blur(20px)}
.v19-overlay.active{display:flex}
.v19-modal{background:var(--card-bg,#fff);border-radius:28px;padding:32px;width:97%;max-width:880px;max-height:94vh;overflow-y:auto;box-shadow:0 48px 140px rgba(0,0,0,.7);animation:v19Rise .35s cubic-bezier(.22,1,.36,1)}
@keyframes v19Rise{from{opacity:0;transform:translateY(48px) scale(.92)}to{opacity:1;transform:translateY(0) scale(1)}}
.v19-hdr{display:flex;justify-content:space-between;align-items:center;margin-bottom:22px}
.v19-hdr h2{font-size:24px;font-weight:800;display:flex;align-items:center;gap:10px}
.v19-hdr h2 .v19i{font-size:30px}
.v19-x{background:none;border:none;font-size:30px;cursor:pointer;color:var(--text-muted);padding:4px 10px;border-radius:10px;transition:.2s}
.v19-x:hover{background:var(--border);color:var(--text)}
.v19-tabs{display:flex;gap:6px;margin-bottom:18px;overflow-x:auto;padding-bottom:4px;scrollbar-width:none}
.v19-tabs::-webkit-scrollbar{display:none}
.v19-tab{padding:10px 20px;border-radius:26px;border:1.5px solid var(--border);background:var(--bg);font-size:12px;font-weight:700;cursor:pointer;white-space:nowrap;transition:.25s}
.v19-tab.active{background:var(--primary);color:#fff;border-color:var(--primary);box-shadow:0 3px 16px rgba(26,122,58,.35)}
.v19-card{background:var(--bg);border-radius:18px;padding:20px;margin-bottom:12px;transition:.25s;border:1.5px solid transparent}
.v19-card:hover{border-color:var(--primary);transform:translateY(-2px);box-shadow:0 4px 18px rgba(26,122,58,.12)}
.v19-card h4{font-size:15px;font-weight:700;margin-bottom:8px;display:flex;align-items:center;gap:8px}
.v19-card p{font-size:12px;color:var(--text-muted);line-height:1.7}
.v19-btn{padding:11px 24px;border:none;border-radius:14px;font-size:13px;font-weight:700;cursor:pointer;transition:.25s;display:inline-flex;align-items:center;gap:6px}
.v19-btn-primary{background:linear-gradient(135deg,var(--primary),#2e9e4f);color:#fff}
.v19-btn-primary:hover{transform:translateY(-2px);box-shadow:0 8px 22px rgba(26,122,58,.4)}
.v19-btn-sm{padding:7px 14px;font-size:11px;border-radius:10px}
.v19-btn-secondary{background:var(--bg);color:var(--text);border:1.5px solid var(--border)}
.v19-btn-secondary:hover{border-color:var(--primary);color:var(--primary)}
.v19-input{width:100%;padding:11px 16px;border:2px solid var(--border);border-radius:12px;font-size:13px;background:var(--bg);color:var(--text);transition:.2s}
.v19-input:focus{border-color:var(--primary);outline:none;box-shadow:0 0 0 3px rgba(26,122,58,.12)}
.v19-select{padding:9px 14px;border:2px solid var(--border);border-radius:10px;font-size:13px;background:var(--bg);color:var(--text)}
.v19-grid2{display:grid;grid-template-columns:1fr 1fr;gap:12px}
.v19-grid3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px}
.v19-grid4{display:grid;grid-template-columns:repeat(4,1fr);gap:10px}
@media(max-width:520px){.v19-grid2,.v19-grid3,.v19-grid4{grid-template-columns:1fr}}
.v19-divider{height:1px;background:var(--border);margin:18px 0}
.v19-badge{display:inline-block;padding:5px 14px;border-radius:16px;font-size:11px;font-weight:700}
.v19-progress{width:100%;height:14px;background:var(--border);border-radius:7px;overflow:hidden;margin:8px 0}
.v19-progress-fill{height:100%;border-radius:7px;transition:width .6s ease}
.v19-stat-row{display:flex;justify-content:space-between;align-items:center;padding:13px 0;border-bottom:1px solid var(--border)}
.v19-stat-row:last-child{border-bottom:none}
.v19-wind-arrow{display:inline-block;font-size:32px;transition:transform .3s}
.v19-wind-card{background:var(--bg);border-radius:18px;padding:18px;margin-bottom:10px;border:1.5px solid transparent;transition:.25s;cursor:pointer}
.v19-wind-card:hover{border-color:var(--primary);transform:translateY(-2px)}
.v19-wind-card.expanded .v19-wind-detail{display:block}
.v19-wind-detail{display:none;margin-top:12px;padding-top:12px;border-top:1px solid var(--border);font-size:12px;color:var(--text-muted);line-height:1.8}
.v19-dress-card{background:var(--bg);border-radius:18px;padding:18px;display:flex;gap:14px;align-items:center;margin-bottom:10px;transition:.25s;cursor:pointer}
.v19-dress-card:hover{transform:translateY(-2px);box-shadow:0 3px 14px rgba(26,122,58,.1)}
.v19-dress-icon{width:56px;height:56px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:26px;flex-shrink:0}
.v19-dress-info{flex:1}
.v19-dress-name{font-size:14px;font-weight:700;margin-bottom:3px}
.v19-dress-desc{font-size:11px;color:var(--text-muted);line-height:1.6}
.v19-penalty-bar{display:flex;align-items:center;gap:8px;margin-bottom:8px}
.v19-penalty-label{font-size:12px;font-weight:600;min-width:80px}
.v19-penalty-track{flex:1;height:10px;background:var(--border);border-radius:5px;overflow:hidden}
.v19-penalty-fill{height:100%;border-radius:5px;transition:width .5s}
.v19-penalty-val{font-size:12px;font-weight:700;min-width:36px;text-align:right}
.v19-companion-card{background:var(--bg);border-radius:16px;padding:16px;display:flex;gap:12px;align-items:center;margin-bottom:10px;transition:.25s}
.v19-companion-card:hover{transform:translateY(-2px);box-shadow:0 3px 12px rgba(26,122,58,.1)}
.v19-companion-avatar{width:48px;height:48px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:20px;font-weight:700;color:#fff;flex-shrink:0}
.v19-companion-info{flex:1}
.v19-companion-name{font-size:14px;font-weight:700}
.v19-companion-stat{font-size:11px;color:var(--text-muted)}
.v19-level-track{position:relative;padding:20px 0}
.v19-level-line{position:absolute;top:50%;left:0;right:0;height:4px;background:var(--border);border-radius:2px;transform:translateY(-50%)}
.v19-level-fill{position:absolute;top:50%;left:0;height:4px;background:linear-gradient(90deg,var(--primary),#2e9e4f);border-radius:2px;transform:translateY(-50%);transition:width .6s}
.v19-level-nodes{display:flex;justify-content:space-between;position:relative;z-index:1}
.v19-level-node{width:32px;height:32px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;border:3px solid var(--border);background:var(--card-bg);transition:.3s}
.v19-level-node.reached{border-color:var(--primary);background:var(--primary);color:#fff}
.v19-level-node.current{border-color:var(--accent);background:var(--accent);color:#fff;box-shadow:0 0 0 4px rgba(255,107,53,.3);animation:v19pulse 1.5s infinite}
@keyframes v19pulse{0%,100%{box-shadow:0 0 0 4px rgba(255,107,53,.3)}50%{box-shadow:0 0 0 8px rgba(255,107,53,.15)}}
.v19-hof-card{background:var(--bg);border-radius:18px;padding:18px;text-align:center;border:2px solid transparent;transition:.3s}
.v19-hof-card:hover{border-color:gold;transform:translateY(-3px)}
.v19-hof-icon{font-size:40px;margin-bottom:8px}
.v19-hof-type{font-size:14px;font-weight:800;margin-bottom:4px}
.v19-hof-detail{font-size:11px;color:var(--text-muted);line-height:1.6}
.v19-hof-date{font-size:10px;color:var(--primary);font-weight:700;margin-top:6px}
.v19-confetti-canvas{position:fixed;top:0;left:0;width:100%;height:100%;z-index:10090;pointer-events:none}
.v19-post-section{background:var(--bg);border-radius:18px;padding:20px;margin-bottom:14px}
.v19-post-title{font-size:15px;font-weight:700;margin-bottom:10px;display:flex;align-items:center;gap:8px}
.v19-post-chart{width:100%;max-width:520px;margin:0 auto;display:block;border-radius:12px}
.v19-rating-calc{background:linear-gradient(135deg,#e8f5e9,#c8e6c9);border-radius:18px;padding:20px;margin-bottom:14px}
[data-theme="dark"] .v19-rating-calc{background:linear-gradient(135deg,#1a3a25,#0f5a28)}
.v19-slope-result{font-size:28px;font-weight:900;color:var(--primary);text-align:center;margin:16px 0}
`;
document.head.appendChild(css19);

// =============================================
// 1. POST-ROUND ANALYSIS (라운드 사후 분석)
// =============================================
var postRoundData = JSON.parse(localStorage.getItem('sg_post_round') || '[]');

function savePostRound(){ localStorage.setItem('sg_post_round', JSON.stringify(postRoundData)); }

function analyzeRound(rd){
  var strengths = [], weaknesses = [], tips = [];
  if(rd.fairway >= 60) strengths.push('페어웨이 안착률 우수 ('+rd.fairway+'%)');
  else weaknesses.push('페어웨이 안착률 개선 필요 ('+rd.fairway+'%)');
  if(rd.gir >= 50) strengths.push('GIR 양호 ('+rd.gir+'%)');
  else weaknesses.push('GIR 개선 필요 ('+rd.gir+'%)');
  if(rd.putts <= 32) strengths.push('퍼팅 효율적 ('+rd.putts+'퍼트)');
  else weaknesses.push('퍼팅 연습 필요 ('+rd.putts+'퍼트)');
  if(rd.penalties <= 2) strengths.push('벌타 관리 우수 ('+rd.penalties+'벌타)');
  else weaknesses.push('벌타 줄이기 필요 ('+rd.penalties+'벌타)');
  if(rd.fairway < 50) tips.push('드라이버 연습: 목표 방향 설정 후 3/4 스윙으로 시작');
  if(rd.gir < 40) tips.push('아이언 정확도: 그린 중앙 공략, 핀 대신 안전 지역 타겟');
  if(rd.putts > 34) tips.push('퍼팅 드릴: 1.5m 직선퍼트 10연속 성공 연습');
  if(rd.penalties > 3) tips.push('코스 매니지먼트: 위험 지역 회피, 레이업 전략 활용');
  if(tips.length === 0) tips.push('현재 수준 유지하며 라운드 경험을 늘려보세요!');
  var total = rd.score;
  var grade = total <= 72 ? 'S' : total <= 80 ? 'A' : total <= 90 ? 'B' : total <= 100 ? 'C' : 'D';
  var gradeColors = {S:'#FFD700',A:'#4CAF50',B:'#2196F3',C:'#FF9800',D:'#f44336'};
  return { strengths:strengths, weaknesses:weaknesses, tips:tips, grade:grade, gradeColor:gradeColors[grade] };
}

function renderPostRound(containerId){
  var c = document.getElementById(containerId); if(!c) return;
  var html = '<div class="v19-hdr"><h2><span class="v19i">&#x1F4CA;</span> 라운드 사후 분석</h2><button class="v19-x" onclick="document.getElementById(\'v19PostOverlay\').classList.remove(\'active\')">&times;</button></div>';
  html += '<div class="v19-tabs">';
  html += '<button class="v19-tab active" onclick="v19PostTab(\'record\',this)">새 기록</button>';
  html += '<button class="v19-tab" onclick="v19PostTab(\'history\',this)">분석 이력 ('+postRoundData.length+')</button>';
  html += '</div>';
  html += '<div id="v19PostRecord">';
  html += '<div class="v19-post-section"><div class="v19-post-title">&#x26F3; 라운드 정보 입력</div>';
  html += '<div class="v19-grid2">';
  html += '<div><label style="font-size:11px;font-weight:600;color:var(--text-muted)">코스명</label><input class="v19-input" id="v19prCourse" placeholder="예: 남서울CC"></div>';
  html += '<div><label style="font-size:11px;font-weight:600;color:var(--text-muted)">날짜</label><input class="v19-input" id="v19prDate" type="date"></div>';
  html += '<div><label style="font-size:11px;font-weight:600;color:var(--text-muted)">총 타수</label><input class="v19-input" id="v19prScore" type="number" placeholder="85" min="50" max="150"></div>';
  html += '<div><label style="font-size:11px;font-weight:600;color:var(--text-muted)">총 퍼트 수</label><input class="v19-input" id="v19prPutts" type="number" placeholder="32" min="10" max="60"></div>';
  html += '<div><label style="font-size:11px;font-weight:600;color:var(--text-muted)">페어웨이 안착률 (%)</label><input class="v19-input" id="v19prFairway" type="number" placeholder="57" min="0" max="100"></div>';
  html += '<div><label style="font-size:11px;font-weight:600;color:var(--text-muted)">GIR (%)</label><input class="v19-input" id="v19prGIR" type="number" placeholder="44" min="0" max="100"></div>';
  html += '<div><label style="font-size:11px;font-weight:600;color:var(--text-muted)">벌타 수</label><input class="v19-input" id="v19prPenalties" type="number" placeholder="3" min="0" max="20"></div>';
  html += '<div><label style="font-size:11px;font-weight:600;color:var(--text-muted)">버디 수</label><input class="v19-input" id="v19prBirdies" type="number" placeholder="1" min="0" max="18"></div>';
  html += '</div>';
  html += '<div style="margin-top:14px"><label style="font-size:11px;font-weight:600;color:var(--text-muted)">메모</label><textarea class="v19-input" id="v19prMemo" rows="2" placeholder="오늘의 컨디션, 특이사항..."></textarea></div>';
  html += '<button class="v19-btn v19-btn-primary" style="margin-top:14px;width:100%" onclick="v19SavePostRound()">&#x1F4CA; 분석 시작</button>';
  html += '</div></div>';
  html += '<div id="v19PostHistory" style="display:none"></div>';
  c.innerHTML = html;
  var dateInput = document.getElementById('v19prDate');
  if(dateInput) dateInput.value = new Date().toISOString().slice(0,10);
}

window.v19PostTab = function(tab, btn){
  document.querySelectorAll('#v19PostModal .v19-tab').forEach(function(t){ t.classList.remove('active'); });
  btn.classList.add('active');
  document.getElementById('v19PostRecord').style.display = tab==='record' ? '' : 'none';
  var hist = document.getElementById('v19PostHistory');
  hist.style.display = tab==='history' ? '' : 'none';
  if(tab==='history') v19RenderHistory(hist);
};

function v19RenderHistory(el){
  if(postRoundData.length===0){ el.innerHTML='<div class="v19-card" style="text-align:center"><p>&#x1F4DD; 아직 분석 기록이 없습니다. 새 기록을 입력해보세요!</p></div>'; return; }
  var html = '';
  postRoundData.slice().reverse().forEach(function(rd,i){
    var a = analyzeRound(rd);
    html += '<div class="v19-card">';
    html += '<h4><span style="color:'+a.gradeColor+';font-size:22px;font-weight:900">'+a.grade+'</span> '+rd.course+' - '+rd.date+'</h4>';
    html += '<div class="v19-grid2" style="margin-bottom:10px">';
    html += '<div class="v19-stat-row"><span>&#x26F3; 총 타수</span><span style="font-weight:700">'+rd.score+'</span></div>';
    html += '<div class="v19-stat-row"><span>&#x1F3AF; GIR</span><span style="font-weight:700">'+rd.gir+'%</span></div>';
    html += '<div class="v19-stat-row"><span>&#x1F6E3;&#xFE0F; 페어웨이</span><span style="font-weight:700">'+rd.fairway+'%</span></div>';
    html += '<div class="v19-stat-row"><span>&#x1F3CC;&#xFE0F; 퍼트</span><span style="font-weight:700">'+rd.putts+'</span></div>';
    html += '</div>';
    html += '<div style="margin-bottom:8px"><strong style="color:#4CAF50;font-size:12px">&#x2705; 강점:</strong><span style="font-size:12px"> '+a.strengths.join(', ')+'</span></div>';
    html += '<div style="margin-bottom:8px"><strong style="color:#f44336;font-size:12px">&#x26A0;&#xFE0F; 약점:</strong><span style="font-size:12px"> '+a.weaknesses.join(', ')+'</span></div>';
    html += '<div><strong style="color:#2196F3;font-size:12px">&#x1F4A1; 팁:</strong><span style="font-size:12px"> '+a.tips.join(' / ')+'</span></div>';
    html += '<button class="v19-btn v19-btn-sm v19-btn-secondary" style="margin-top:10px" onclick="v19DeletePost('+(postRoundData.length-1-i)+')">&#x1F5D1;&#xFE0F; 삭제</button>';
    html += '</div>';
  });
  el.innerHTML = html;
}

window.v19SavePostRound = function(){
  var course = document.getElementById('v19prCourse').value.trim();
  var date = document.getElementById('v19prDate').value;
  var score = parseInt(document.getElementById('v19prScore').value);
  var putts = parseInt(document.getElementById('v19prPutts').value);
  var fairway = parseInt(document.getElementById('v19prFairway').value);
  var gir = parseInt(document.getElementById('v19prGIR').value);
  var penalties = parseInt(document.getElementById('v19prPenalties').value) || 0;
  var birdies = parseInt(document.getElementById('v19prBirdies').value) || 0;
  var memo = document.getElementById('v19prMemo').value.trim();
  if(!course || !date || isNaN(score)){ if(typeof showToast==='function') showToast('코스명, 날짜, 타수를 입력해주세요','error'); return; }
  postRoundData.push({course:course,date:date,score:score,putts:putts||30,fairway:fairway||50,gir:gir||40,penalties:penalties,birdies:birdies,memo:memo,ts:Date.now()});
  savePostRound();
  v19PlaySFX('post_analysis');
  if(typeof showToast==='function') showToast('라운드 분석이 완료되었습니다!','success');
  v19CheckAchievements();
  document.querySelector('#v19PostModal .v19-tab:nth-child(2)').click();
};

window.v19DeletePost = function(idx){
  postRoundData.splice(idx,1); savePostRound();
  v19RenderHistory(document.getElementById('v19PostHistory'));
};

// =============================================
// 2. WIND STRATEGY GUIDE (바람 전략 가이드 8종)
// =============================================
var windStrategies = [
  {dir:'맞바람 (Against)',icon:'&#x2B06;&#xFE0F;',color:'#e53935',club:'+1~2클럽',ball:'낮은 탄도 스윙, 볼을 뒤쪽에 배치',detail:'맞바람이 강할수록 스핀이 증폭됩니다. 3/4 스윙으로 스핀량을 줄이고, 볼을 스탠스 중앙~뒤쪽에 배치하세요. 10m/s 이상이면 2클럽 업, 페이드/슬라이스 구질은 더욱 크게 휩니다.'},
  {dir:'뒷바람 (Following)',icon:'&#x2B07;&#xFE0F;',color:'#43A047',club:'-1~2클럽',ball:'높은 탄도로 바람 활용',detail:'뒷바람은 캐리와 런 모두 증가시킵니다. 1~2클럽 짧게 잡고, 높은 탄도로 바람을 태우세요. 그린 앞 벙커 주의. 퍼팅 시 내리막 속도감에 영향을 줄 수 있습니다.'},
  {dir:'좌측 바람 (Left-to-Right)',icon:'&#x27A1;&#xFE0F;',color:'#1E88E5',club:'좌측 에임',ball:'왼쪽 타겟으로 보정',detail:'왼쪽에서 오른쪽으로 부는 바람은 볼을 오른쪽으로 밀어냅니다. 타겟을 왼쪽으로 잡고, 드로우 구질이면 상쇄 효과가 있습니다. 풍속 5m/s당 약 5~10야드 보정하세요.'},
  {dir:'우측 바람 (Right-to-Left)',icon:'&#x2B05;&#xFE0F;',color:'#8E24AA',club:'우측 에임',ball:'오른쪽 타겟으로 보정',detail:'오른쪽에서 왼쪽으로 부는 바람입니다. 타겟을 오른쪽으로 설정하고, 페이드 구질로 맞바람 효과를 활용할 수 있습니다. 그린 좌측 벙커/해저드 주의.'},
  {dir:'좌측 맞바람 (L-Headwind)',icon:'&#x2196;&#xFE0F;',color:'#FF6F00',club:'+1클럽, 좌측 에임',ball:'드로우 유리, 왼쪽으로 에임',detail:'좌측에서 대각선으로 불어오는 맞바람. 거리 감소 + 우측 편향이 동시에 발생합니다. 드로우 구질이 유리하며, +1클럽 + 왼쪽 에임으로 대응하세요.'},
  {dir:'우측 맞바람 (R-Headwind)',icon:'&#x2197;&#xFE0F;',color:'#00ACC1',club:'+1클럽, 우측 에임',ball:'페이드 유리, 오른쪽으로 에임',detail:'우측에서 대각선으로 불어오는 맞바람. 거리 감소 + 좌측 편향. 페이드 구질이 유리하며, 볼을 약간 뒤에 배치하여 탄도를 낮추세요.'},
  {dir:'좌측 뒷바람 (L-Tailwind)',icon:'&#x2199;&#xFE0F;',color:'#7CB342',club:'-1클럽, 좌측 에임',ball:'높은 탄도로 런 활용',detail:'좌측 뒷바람은 볼을 멀리 + 오른쪽으로 보냅니다. 거리가 늘어나므로 -1클럽, 왼쪽 에임으로 보정하세요. 런이 많아 그린 뒤쪽 OB 주의.'},
  {dir:'우측 뒷바람 (R-Tailwind)',icon:'&#x2198;&#xFE0F;',color:'#D81B60',club:'-1클럽, 우측 에임',ball:'높은 탄도, 드로우 주의',detail:'우측 뒷바람은 볼을 멀리 + 왼쪽으로 보냅니다. 드로우 구질이면 훅이 심해질 수 있으니 주의. 오른쪽 에임 + 페이드 구질이 안전합니다.'}
];

function renderWindGuide(containerId){
  var c = document.getElementById(containerId); if(!c) return;
  var html = '<div class="v19-hdr"><h2><span class="v19i">&#x1F32C;&#xFE0F;</span> 바람 전략 가이드</h2><button class="v19-x" onclick="document.getElementById(\'v19WindOverlay\').classList.remove(\'active\')">&times;</button></div>';
  html += '<p style="font-size:13px;color:var(--text-muted);margin-bottom:18px">풍향별 클럽 선택과 에임 보정 전략을 확인하세요. 카드를 터치하면 상세 전략이 펼쳐집니다.</p>';
  windStrategies.forEach(function(w,i){
    html += '<div class="v19-wind-card" onclick="this.classList.toggle(\'expanded\');v19PlaySFX(\'wind_tip\')">';
    html += '<div style="display:flex;align-items:center;gap:12px">';
    html += '<span class="v19-wind-arrow" style="color:'+w.color+'">'+w.icon+'</span>';
    html += '<div style="flex:1"><div style="font-size:14px;font-weight:700">'+w.dir+'</div>';
    html += '<div style="font-size:11px;color:var(--text-muted);margin-top:2px">클럽: <strong>'+w.club+'</strong> | '+w.ball+'</div></div>';
    html += '</div>';
    html += '<div class="v19-wind-detail">'+w.detail+'</div>';
    html += '</div>';
  });
  html += '<div class="v19-divider"></div>';
  html += '<div class="v19-card"><h4>&#x1F4CF; 풍속별 거리 보정표</h4>';
  html += '<table style="width:100%;font-size:11px;border-collapse:collapse">';
  html += '<tr style="background:var(--primary);color:#fff"><th style="padding:8px;border-radius:8px 0 0 0">풍속</th><th style="padding:8px">맞바람 거리 감소</th><th style="padding:8px">뒷바람 거리 증가</th><th style="padding:8px;border-radius:0 8px 0 0">측풍 편향</th></tr>';
  var windTable = [{spd:'5 m/s',h:'-5~8%',t:'+3~5%',s:'5~8 yd'},{spd:'10 m/s',h:'-10~15%',t:'+5~10%',s:'10~15 yd'},{spd:'15 m/s',h:'-15~25%',t:'+8~15%',s:'15~25 yd'},{spd:'20+ m/s',h:'-25~35%',t:'+12~20%',s:'25~40 yd'}];
  windTable.forEach(function(r,i){
    html += '<tr style="background:'+(i%2?'var(--bg)':'var(--card-bg)')+'"><td style="padding:8px;font-weight:700">'+r.spd+'</td><td style="padding:8px;color:#e53935">'+r.h+'</td><td style="padding:8px;color:#43A047">'+r.t+'</td><td style="padding:8px;color:#1E88E5">'+r.s+'</td></tr>';
  });
  html += '</table></div>';
  c.innerHTML = html;
}

// =============================================
// 3. GOLF DRESS CODE GUIDE (드레스코드 가이드 8종)
// =============================================
var dressCodes = [
  {name:'퍼블릭 골프장',icon:'&#x1F3CC;&#xFE0F;',color:'linear-gradient(135deg,#4CAF50,#81C784)',items:['카라 있는 폴로 셔츠','면바지 또는 골프 팬츠','골프화 (소프트 스파이크 권장)','모자/바이저 자유'],note:'청바지, 민소매, 슬리퍼는 대부분 금지'},
  {name:'프라이빗 클럽',icon:'&#x1F451;',color:'linear-gradient(135deg,#1565C0,#42A5F5)',items:['카라 셔츠 필수 (터틀넥 가능)','골프 전용 슬랙스','골프화 필수 (메탈 스파이크 금지)','클럽하우스: 재킷 착용 권장'],note:'운동복, 카고바지, 스니커즈 금지'},
  {name:'토너먼트/대회',icon:'&#x1F3C6;',color:'linear-gradient(135deg,#FF6F00,#FFA726)',items:['대회 규정 유니폼','스폰서 로고 규정 확인','골프화 필수','모자 착용 권장 (양산 금지)'],note:'대회별 복장 규정을 반드시 사전 확인'},
  {name:'여름 라운드',icon:'&#x2600;&#xFE0F;',color:'linear-gradient(135deg,#E53935,#EF5350)',items:['UV 차단 카라 셔츠','통풍 좋은 골프 반바지 (무릎 위)','선글라스, 챙 넓은 모자','팔 토시/선크림 필수'],note:'민소매 허용 여부는 골프장마다 다름'},
  {name:'겨울 라운드',icon:'&#x2744;&#xFE0F;',color:'linear-gradient(135deg,#455A64,#78909C)',items:['기능성 방한 내의','고어텍스/방풍 골프 재킷','방한 골프 장갑, 핫팩','방한 귀마개, 넥워머'],note:'두꺼운 패딩보다 레이어링이 스윙에 유리'},
  {name:'비 오는 날',icon:'&#x1F327;&#xFE0F;',color:'linear-gradient(135deg,#37474F,#607D8B)',items:['방수 골프 재킷 & 팬츠','방수 골프화','레인 장갑 (그립력 유지)','우산, 타올 여분 준비'],note:'캐디백 레인커버 필수, 여분 장갑 2~3켤레'},
  {name:'접대/비즈니스 라운드',icon:'&#x1F454;',color:'linear-gradient(135deg,#5E35B1,#7E57C2)',items:['깔끔한 카라 셔츠 (단색 권장)','정장 스타일 골프 팬츠','구두형 골프화','벨트 착용, 셔츠 인'],note:'과도한 캐주얼보다 깔끔함이 중요'},
  {name:'연습장',icon:'&#x1F3AF;',color:'linear-gradient(135deg,#00897B,#26A69A)',items:['편안한 운동복 OK','운동화 가능','장갑 착용 권장','자외선 차단 필수 (야외)'],note:'실내 연습장은 복장 제한 거의 없음'}
];

function renderDressCode(containerId){
  var c = document.getElementById(containerId); if(!c) return;
  var html = '<div class="v19-hdr"><h2><span class="v19i">&#x1F455;</span> 골프 드레스코드</h2><button class="v19-x" onclick="document.getElementById(\'v19DressOverlay\').classList.remove(\'active\')">&times;</button></div>';
  html += '<p style="font-size:13px;color:var(--text-muted);margin-bottom:18px">상황별 올바른 골프 복장 가이드입니다.</p>';
  dressCodes.forEach(function(d){
    html += '<div class="v19-dress-card" onclick="v19PlaySFX(\'dress_tip\')">';
    html += '<div class="v19-dress-icon" style="background:'+d.color+'">'+d.icon+'</div>';
    html += '<div class="v19-dress-info"><div class="v19-dress-name">'+d.name+'</div>';
    html += '<div class="v19-dress-desc">'+d.items.join(' &middot; ')+'</div>';
    html += '<div style="font-size:10px;color:var(--accent);font-weight:600;margin-top:4px">&#x26A0;&#xFE0F; '+d.note+'</div>';
    html += '</div></div>';
  });
  c.innerHTML = html;
}

// =============================================
// 4. COURSE RATING & SLOPE CALCULATOR
// =============================================
function renderRatingCalc(containerId){
  var c = document.getElementById(containerId); if(!c) return;
  var html = '<div class="v19-hdr"><h2><span class="v19i">&#x1F4D0;</span> 코스레이팅 &amp; 슬로프 계산기</h2><button class="v19-x" onclick="document.getElementById(\'v19RatingOverlay\').classList.remove(\'active\')">&times;</button></div>';
  html += '<div class="v19-rating-calc">';
  html += '<p style="font-size:13px;margin-bottom:16px">코스 레이팅과 슬로프 레이팅으로 보기 기준 기대타수와 코스 핸디캡을 계산합니다.</p>';
  html += '<div class="v19-grid2">';
  html += '<div><label style="font-size:11px;font-weight:600">코스 레이팅</label><input class="v19-input" id="v19crRating" type="number" step="0.1" placeholder="72.3" min="60" max="80"></div>';
  html += '<div><label style="font-size:11px;font-weight:600">슬로프 레이팅</label><input class="v19-input" id="v19crSlope" type="number" placeholder="131" min="55" max="155"></div>';
  html += '<div><label style="font-size:11px;font-weight:600">내 핸디캡 인덱스</label><input class="v19-input" id="v19crHdcp" type="number" step="0.1" placeholder="18.5" min="0" max="54"></div>';
  html += '<div><label style="font-size:11px;font-weight:600">파 (Par)</label><input class="v19-input" id="v19crPar" type="number" placeholder="72" min="60" max="80"></div>';
  html += '</div>';
  html += '<button class="v19-btn v19-btn-primary" style="margin-top:16px;width:100%" onclick="v19CalcRating()">&#x1F4CA; 계산하기</button>';
  html += '</div>';
  html += '<div id="v19RatingResult"></div>';
  html += '<div class="v19-divider"></div>';
  html += '<div class="v19-card"><h4>&#x1F4D6; 코스 난이도 해석 가이드</h4>';
  html += '<table style="width:100%;font-size:11px;border-collapse:collapse">';
  html += '<tr style="background:var(--primary);color:#fff"><th style="padding:8px;border-radius:8px 0 0 0">슬로프</th><th style="padding:8px">난이도</th><th style="padding:8px;border-radius:0 8px 0 0">설명</th></tr>';
  var slopeGuide = [{s:'55~90',d:'쉬움',desc:'평탄하고 넓은 페어웨이, 초보자 적합'},{s:'91~110',d:'보통',desc:'적절한 도전 요소, 중급자 적합'},{s:'111~130',d:'어려움',desc:'좁은 페어웨이, 많은 벙커/해저드'},{s:'131~155',d:'매우 어려움',desc:'프로 수준, 극한의 코스 디자인'}];
  slopeGuide.forEach(function(r,i){
    html += '<tr style="background:'+(i%2?'var(--bg)':'var(--card-bg)')+'"><td style="padding:8px;font-weight:700">'+r.s+'</td><td style="padding:8px;font-weight:700;color:var(--primary)">'+r.d+'</td><td style="padding:8px;color:var(--text-muted)">'+r.desc+'</td></tr>';
  });
  html += '</table></div>';
  c.innerHTML = html;
}

window.v19CalcRating = function(){
  var rating = parseFloat(document.getElementById('v19crRating').value);
  var slope = parseInt(document.getElementById('v19crSlope').value);
  var hdcp = parseFloat(document.getElementById('v19crHdcp').value);
  var par = parseInt(document.getElementById('v19crPar').value) || 72;
  if(isNaN(rating) || isNaN(slope) || isNaN(hdcp)){ if(typeof showToast==='function') showToast('모든 값을 입력해주세요','error'); return; }
  var courseHdcp = Math.round(hdcp * (slope / 113) + (rating - par));
  var expectedScore = par + courseHdcp;
  var bogeyRating = rating + (5.381 * slope / 113);
  var difficulty = slope < 91 ? '쉬움' : slope < 111 ? '보통' : slope < 131 ? '어려움' : '매우 어려움';
  var diffColor = slope < 91 ? '#4CAF50' : slope < 111 ? '#2196F3' : slope < 131 ? '#FF9800' : '#f44336';
  var result = document.getElementById('v19RatingResult');
  result.innerHTML = '<div class="v19-card" style="text-align:center;border-color:var(--primary)">';
  result.innerHTML += '<div class="v19-slope-result">코스 핸디캡: '+courseHdcp+'</div>';
  result.innerHTML += '<div class="v19-grid3" style="margin-top:14px">';
  result.innerHTML += '<div><div style="font-size:11px;color:var(--text-muted)">기대 타수</div><div style="font-size:22px;font-weight:800;color:var(--primary)">'+expectedScore+'</div></div>';
  result.innerHTML += '<div><div style="font-size:11px;color:var(--text-muted)">보기 레이팅</div><div style="font-size:22px;font-weight:800;color:var(--accent)">'+bogeyRating.toFixed(1)+'</div></div>';
  result.innerHTML += '<div><div style="font-size:11px;color:var(--text-muted)">난이도</div><div style="font-size:18px;font-weight:800;color:'+diffColor+'">'+difficulty+'</div></div>';
  result.innerHTML += '</div></div>';
  v19PlaySFX('rating_calc');
};

// =============================================
// 5. PENALTY PATTERN TRACKER (벌타 분석)
// =============================================
var penaltyData = JSON.parse(localStorage.getItem('sg_penalty_tracker') || '[]');
function savePenalty(){ localStorage.setItem('sg_penalty_tracker', JSON.stringify(penaltyData)); }

function renderPenaltyTracker(containerId){
  var c = document.getElementById(containerId); if(!c) return;
  var html = '<div class="v19-hdr"><h2><span class="v19i">&#x26A0;&#xFE0F;</span> 벌타 분석 트래커</h2><button class="v19-x" onclick="document.getElementById(\'v19PenaltyOverlay\').classList.remove(\'active\')">&times;</button></div>';
  html += '<div class="v19-tabs">';
  html += '<button class="v19-tab active" onclick="v19PenaltyTab(\'add\',this)">기록 추가</button>';
  html += '<button class="v19-tab" onclick="v19PenaltyTab(\'stats\',this)">통계 분석</button>';
  html += '<button class="v19-tab" onclick="v19PenaltyTab(\'tips\',this)">개선 전략</button>';
  html += '</div>';
  html += '<div id="v19PenAdd">';
  html += '<div class="v19-post-section"><div class="v19-post-title">&#x1F4DD; 벌타 기록</div>';
  html += '<div class="v19-grid2">';
  html += '<div><label style="font-size:11px;font-weight:600">날짜</label><input class="v19-input" id="v19penDate" type="date"></div>';
  html += '<div><label style="font-size:11px;font-weight:600">코스명</label><input class="v19-input" id="v19penCourse" placeholder="예: 남서울CC"></div>';
  html += '<div><label style="font-size:11px;font-weight:600">유형</label><select class="v19-select" id="v19penType" style="width:100%"><option value="OB">OB (아웃오브바운즈)</option><option value="water">워터 해저드</option><option value="lateral">래터럴 해저드</option><option value="unplay">언플레이어블</option><option value="lost">분실구</option><option value="other">기타</option></select></div>';
  html += '<div><label style="font-size:11px;font-weight:600">홀 번호</label><input class="v19-input" id="v19penHole" type="number" placeholder="7" min="1" max="18"></div>';
  html += '<div><label style="font-size:11px;font-weight:600">클럽</label><select class="v19-select" id="v19penClub" style="width:100%"><option value="driver">드라이버</option><option value="wood">우드</option><option value="hybrid">하이브리드</option><option value="iron">아이언</option><option value="wedge">웨지</option><option value="putter">퍼터</option></select></div>';
  html += '<div><label style="font-size:11px;font-weight:600">벌타 수</label><input class="v19-input" id="v19penStrokes" type="number" value="1" min="1" max="4"></div>';
  html += '</div>';
  html += '<button class="v19-btn v19-btn-primary" style="margin-top:14px;width:100%" onclick="v19AddPenalty()">&#x2795; 벌타 기록 추가</button>';
  html += '</div></div>';
  html += '<div id="v19PenStats" style="display:none"></div>';
  html += '<div id="v19PenTips" style="display:none"></div>';
  c.innerHTML = html;
  var d = document.getElementById('v19penDate'); if(d) d.value = new Date().toISOString().slice(0,10);
}

window.v19PenaltyTab = function(tab, btn){
  document.querySelectorAll('#v19PenaltyModal .v19-tab').forEach(function(t){t.classList.remove('active');}); btn.classList.add('active');
  document.getElementById('v19PenAdd').style.display = tab==='add'?'':'none';
  var stats = document.getElementById('v19PenStats'); stats.style.display = tab==='stats'?'':'none';
  var tips = document.getElementById('v19PenTips'); tips.style.display = tab==='tips'?'':'none';
  if(tab==='stats') v19RenderPenaltyStats(stats);
  if(tab==='tips') v19RenderPenaltyTips(tips);
};

window.v19AddPenalty = function(){
  var date=document.getElementById('v19penDate').value, course=document.getElementById('v19penCourse').value.trim();
  var type=document.getElementById('v19penType').value, hole=parseInt(document.getElementById('v19penHole').value);
  var club=document.getElementById('v19penClub').value, strokes=parseInt(document.getElementById('v19penStrokes').value)||1;
  if(!date||!course||isNaN(hole)){if(typeof showToast==='function')showToast('날짜, 코스, 홀 번호를 입력해주세요','error');return;}
  penaltyData.push({date:date,course:course,type:type,hole:hole,club:club,strokes:strokes,ts:Date.now()});
  savePenalty(); v19PlaySFX('penalty_add');
  if(typeof showToast==='function') showToast('벌타 기록이 추가되었습니다','success');
  v19CheckAchievements();
};

function v19RenderPenaltyStats(el){
  if(penaltyData.length===0){el.innerHTML='<div class="v19-card" style="text-align:center"><p>&#x1F4CA; 벌타 기록을 추가하면 통계를 분석해드립니다.</p></div>';return;}
  var types={OB:0,water:0,lateral:0,unplay:0,lost:0,other:0};
  var clubs={driver:0,wood:0,hybrid:0,iron:0,wedge:0,putter:0};
  var totalStrokes=0;
  penaltyData.forEach(function(p){types[p.type]=(types[p.type]||0)+1;clubs[p.club]=(clubs[p.club]||0)+1;totalStrokes+=p.strokes;});
  var typeNames={OB:'OB',water:'워터해저드',lateral:'래터럴',unplay:'언플레이어블',lost:'분실구',other:'기타'};
  var clubNames={driver:'드라이버',wood:'우드',hybrid:'하이브리드',iron:'아이언',wedge:'웨지',putter:'퍼터'};
  var typeColors={OB:'#e53935',water:'#1E88E5',lateral:'#00ACC1',unplay:'#FF6F00',lost:'#7B1FA2',other:'#757575'};
  var html = '<div class="v19-card"><h4>&#x1F4CA; 벌타 유형별 분포</h4>';
  var maxType = Math.max.apply(null, Object.values(types)) || 1;
  Object.keys(types).forEach(function(k){
    var pct = Math.round(types[k]/penaltyData.length*100);
    html += '<div class="v19-penalty-bar"><span class="v19-penalty-label">'+typeNames[k]+'</span>';
    html += '<div class="v19-penalty-track"><div class="v19-penalty-fill" style="width:'+pct+'%;background:'+typeColors[k]+'"></div></div>';
    html += '<span class="v19-penalty-val" style="color:'+typeColors[k]+'">'+types[k]+'</span></div>';
  });
  html += '</div>';
  html += '<div class="v19-card"><h4>&#x1F3CC;&#xFE0F; 클럽별 벌타 빈도</h4>';
  var maxClub = Math.max.apply(null, Object.values(clubs)) || 1;
  Object.keys(clubs).forEach(function(k){
    if(clubs[k]===0)return;
    var pct=Math.round(clubs[k]/penaltyData.length*100);
    html+='<div class="v19-penalty-bar"><span class="v19-penalty-label">'+clubNames[k]+'</span>';
    html+='<div class="v19-penalty-track"><div class="v19-penalty-fill" style="width:'+pct+'%;background:var(--primary)"></div></div>';
    html+='<span class="v19-penalty-val">'+clubs[k]+'</span></div>';
  });
  html += '</div>';
  html += '<div class="v19-grid3">';
  html += '<div class="v19-card" style="text-align:center"><div style="font-size:28px;font-weight:900;color:var(--primary)">'+penaltyData.length+'</div><div style="font-size:11px;color:var(--text-muted)">총 벌타 횟수</div></div>';
  html += '<div class="v19-card" style="text-align:center"><div style="font-size:28px;font-weight:900;color:#e53935">'+totalStrokes+'</div><div style="font-size:11px;color:var(--text-muted)">총 벌타 타수</div></div>';
  var avgPer = penaltyData.length > 0 ? (totalStrokes / penaltyData.length).toFixed(1) : '0';
  html += '<div class="v19-card" style="text-align:center"><div style="font-size:28px;font-weight:900;color:var(--accent)">'+avgPer+'</div><div style="font-size:11px;color:var(--text-muted)">건당 평균 벌타</div></div>';
  html += '</div>';
  el.innerHTML = html;
}

function v19RenderPenaltyTips(el){
  var types={OB:0,water:0,lateral:0,unplay:0,lost:0,other:0};
  penaltyData.forEach(function(p){types[p.type]=(types[p.type]||0)+1;});
  var tipList = [
    {type:'OB',title:'OB 줄이기 전략',tips:['드라이버 대신 3번 우드/하이브리드로 안전하게 티샷','좁은 홀에서 페어웨이 중앙 공략','백스윙을 3/4로 줄여 정확도 향상','프리샷 루틴에서 OB 방향 확인 후 반대편 에임']},
    {type:'water',title:'워터 해저드 회피',tips:['해저드 거리를 정확히 파악하고 레이업','바람이 해저드 방향이면 1클럽 추가','그린 공략 시 핀이 물 가까이면 안전 지역 공략','연습 라운드에서 해저드 위치 사전 파악']},
    {type:'lateral',title:'래터럴 해저드 대응',tips:['해저드와 평행한 방향으로 안전하게 플레이','드롭 지점을 미리 파악해 둘 것','무리한 리커버리 샷 자제','클럽 선택 시 해저드까지 남은 거리 계산']},
    {type:'lost',title:'분실구 방지',tips:['러프가 깊은 홀에서는 밝은 색 볼 사용','동반자에게 볼 방향 확인 요청','잠정구를 적극 활용','비거리보다 방향성에 집중']}
  ];
  var html = '';
  tipList.forEach(function(t){
    var count = types[t.type] || 0;
    html += '<div class="v19-card" style="border-left:4px solid '+(count>3?'#e53935':count>1?'#FF9800':'#4CAF50')+'">';
    html += '<h4>'+t.title+' <span class="v19-badge" style="background:'+(count>3?'#ffebee':'#e8f5e9')+';color:'+(count>3?'#e53935':'#4CAF50')+'">'+count+'회</span></h4>';
    html += '<ul style="font-size:12px;color:var(--text-muted);line-height:2;padding-left:20px">';
    t.tips.forEach(function(tip){html+='<li>'+tip+'</li>';});
    html += '</ul></div>';
  });
  el.innerHTML = html;
}

// =============================================
// 6. COMPANION MANAGER (동반자 관리)
// =============================================
var companions = JSON.parse(localStorage.getItem('sg_companions') || '[]');
function saveCompanions(){ localStorage.setItem('sg_companions', JSON.stringify(companions)); }

var companionColors = ['#e53935','#1E88E5','#43A047','#FF6F00','#7B1FA2','#00897B','#C62828','#283593'];

function renderCompanionManager(containerId){
  var c = document.getElementById(containerId); if(!c) return;
  var html = '<div class="v19-hdr"><h2><span class="v19i">&#x1F465;</span> 동반자 관리</h2><button class="v19-x" onclick="document.getElementById(\'v19CompanionOverlay\').classList.remove(\'active\')">&times;</button></div>';
  html += '<div class="v19-tabs">';
  html += '<button class="v19-tab active" onclick="v19CompTab(\'list\',this)">동반자 목록 ('+companions.length+')</button>';
  html += '<button class="v19-tab" onclick="v19CompTab(\'add\',this)">추가</button>';
  html += '<button class="v19-tab" onclick="v19CompTab(\'compare\',this)">성적 비교</button>';
  html += '</div>';
  html += '<div id="v19CompList"></div>';
  html += '<div id="v19CompAdd" style="display:none">';
  html += '<div class="v19-post-section"><div class="v19-post-title">&#x2795; 새 동반자 등록</div>';
  html += '<div class="v19-grid2">';
  html += '<div><label style="font-size:11px;font-weight:600">이름</label><input class="v19-input" id="v19compName" placeholder="홍길동"></div>';
  html += '<div><label style="font-size:11px;font-weight:600">별명</label><input class="v19-input" id="v19compNick" placeholder="길동이"></div>';
  html += '<div><label style="font-size:11px;font-weight:600">평균 타수</label><input class="v19-input" id="v19compAvg" type="number" placeholder="90" min="50" max="150"></div>';
  html += '<div><label style="font-size:11px;font-weight:600">핸디캡</label><input class="v19-input" id="v19compHdcp" type="number" step="0.1" placeholder="18" min="0" max="54"></div>';
  html += '<div><label style="font-size:11px;font-weight:600">함께 라운드 횟수</label><input class="v19-input" id="v19compRounds" type="number" placeholder="5" min="0"></div>';
  html += '<div><label style="font-size:11px;font-weight:600">연락처/메모</label><input class="v19-input" id="v19compMemo" placeholder="010-xxxx-xxxx"></div>';
  html += '</div>';
  html += '<button class="v19-btn v19-btn-primary" style="margin-top:14px;width:100%" onclick="v19AddCompanion()">&#x2795; 동반자 등록</button>';
  html += '</div></div>';
  html += '<div id="v19CompCompare" style="display:none"></div>';
  c.innerHTML = html;
  v19RenderCompList();
}

window.v19CompTab = function(tab, btn){
  document.querySelectorAll('#v19CompanionModal .v19-tab').forEach(function(t){t.classList.remove('active');}); btn.classList.add('active');
  document.getElementById('v19CompList').style.display = tab==='list'?'':'none';
  document.getElementById('v19CompAdd').style.display = tab==='add'?'':'none';
  var cmp = document.getElementById('v19CompCompare'); cmp.style.display = tab==='compare'?'':'none';
  if(tab==='list') v19RenderCompList();
  if(tab==='compare') v19RenderCompCompare(cmp);
};

function v19RenderCompList(){
  var el = document.getElementById('v19CompList'); if(!el) return;
  if(companions.length===0){el.innerHTML='<div class="v19-card" style="text-align:center"><p>&#x1F465; 아직 등록된 동반자가 없습니다.</p></div>';return;}
  var html = '';
  companions.forEach(function(cp,i){
    var color = companionColors[i % companionColors.length];
    var initials = cp.name.slice(0,1);
    html += '<div class="v19-companion-card">';
    html += '<div class="v19-companion-avatar" style="background:'+color+'">'+initials+'</div>';
    html += '<div class="v19-companion-info"><div class="v19-companion-name">'+cp.name+(cp.nick?' ('+cp.nick+')':'')+'</div>';
    html += '<div class="v19-companion-stat">평균 '+cp.avg+'타 &middot; 핸디캡 '+cp.hdcp+' &middot; '+cp.rounds+'회 라운드</div>';
    if(cp.memo) html += '<div style="font-size:10px;color:var(--text-muted);margin-top:2px">'+cp.memo+'</div>';
    html += '</div>';
    html += '<button class="v19-btn v19-btn-sm v19-btn-secondary" onclick="v19DeleteComp('+i+');event.stopPropagation()">&#x1F5D1;&#xFE0F;</button>';
    html += '</div>';
  });
  el.innerHTML = html;
}

window.v19AddCompanion = function(){
  var name=document.getElementById('v19compName').value.trim();
  var nick=document.getElementById('v19compNick').value.trim();
  var avg=parseInt(document.getElementById('v19compAvg').value)||90;
  var hdcp=parseFloat(document.getElementById('v19compHdcp').value)||18;
  var rounds=parseInt(document.getElementById('v19compRounds').value)||0;
  var memo=document.getElementById('v19compMemo').value.trim();
  if(!name){if(typeof showToast==='function')showToast('이름을 입력해주세요','error');return;}
  companions.push({name:name,nick:nick,avg:avg,hdcp:hdcp,rounds:rounds,memo:memo,ts:Date.now()});
  saveCompanions(); v19PlaySFX('companion_add');
  if(typeof showToast==='function') showToast(name+'님이 등록되었습니다','success');
  v19CheckAchievements();
  document.querySelector('#v19CompanionModal .v19-tab:first-child').click();
};

window.v19DeleteComp = function(i){
  companions.splice(i,1); saveCompanions();
  v19RenderCompList();
};

function v19RenderCompCompare(el){
  if(companions.length<2){el.innerHTML='<div class="v19-card" style="text-align:center"><p>2명 이상 등록하면 성적을 비교할 수 있습니다.</p></div>';return;}
  var sorted = companions.slice().sort(function(a,b){return a.avg-b.avg;});
  var html = '<div class="v19-card"><h4>&#x1F3C6; 평균 타수 랭킹</h4>';
  sorted.forEach(function(cp,i){
    var medal = i===0?'&#x1F947;':i===1?'&#x1F948;':i===2?'&#x1F949;':(i+1)+'위';
    html += '<div class="v19-stat-row"><span>'+medal+' '+cp.name+'</span><span style="font-weight:700;color:var(--primary)">'+cp.avg+'타</span></div>';
  });
  html += '</div>';
  var sortedHdcp = companions.slice().sort(function(a,b){return a.hdcp-b.hdcp;});
  html += '<div class="v19-card"><h4>&#x1F4C9; 핸디캡 랭킹</h4>';
  sortedHdcp.forEach(function(cp,i){
    var medal = i===0?'&#x1F947;':i===1?'&#x1F948;':i===2?'&#x1F949;':(i+1)+'위';
    html += '<div class="v19-stat-row"><span>'+medal+' '+cp.name+'</span><span style="font-weight:700;color:var(--accent)">'+cp.hdcp+'</span></div>';
  });
  html += '</div>';
  el.innerHTML = html;
}

// =============================================
// 7. GOLF MILEAGE & LEVEL-UP (마일리지 레벨업)
// =============================================
var mileageData = JSON.parse(localStorage.getItem('sg_mileage') || '{"xp":0,"level":1,"history":[]}');
function saveMileage(){ localStorage.setItem('sg_mileage', JSON.stringify(mileageData)); }

var levelTiers = [
  {lv:1,name:'비기너',xp:0,icon:'&#x1F331;'},
  {lv:2,name:'루키',xp:100,icon:'&#x1F33F;'},
  {lv:3,name:'아마추어',xp:300,icon:'&#x1F340;'},
  {lv:4,name:'중급자',xp:600,icon:'&#x26F3;'},
  {lv:5,name:'상급자',xp:1000,icon:'&#x1F3CC;&#xFE0F;'},
  {lv:6,name:'세미프로',xp:1500,icon:'&#x1F3C5;'},
  {lv:7,name:'프로',xp:2200,icon:'&#x1F3C6;'},
  {lv:8,name:'마스터',xp:3000,icon:'&#x1F451;'},
  {lv:9,name:'챔피언',xp:4000,icon:'&#x1F48E;'},
  {lv:10,name:'레전드',xp:5500,icon:'&#x2B50;'}
];

function getCurrentLevel(){
  var lv = 1;
  for(var i=levelTiers.length-1;i>=0;i--){
    if(mileageData.xp >= levelTiers[i].xp){ lv = levelTiers[i].lv; break; }
  }
  return lv;
}

function addXP(amount, reason){
  mileageData.xp += amount;
  mileageData.level = getCurrentLevel();
  mileageData.history.push({amount:amount,reason:reason,ts:Date.now()});
  if(mileageData.history.length > 100) mileageData.history = mileageData.history.slice(-100);
  saveMileage();
}

function renderMileage(containerId){
  var c = document.getElementById(containerId); if(!c) return;
  var lv = getCurrentLevel();
  var tier = levelTiers[lv-1];
  var nextTier = lv < 10 ? levelTiers[lv] : null;
  var progress = nextTier ? Math.min(100, Math.round((mileageData.xp - tier.xp) / (nextTier.xp - tier.xp) * 100)) : 100;

  var html = '<div class="v19-hdr"><h2><span class="v19i">&#x1F3AE;</span> 골프 마일리지</h2><button class="v19-x" onclick="document.getElementById(\'v19MileageOverlay\').classList.remove(\'active\')">&times;</button></div>';
  html += '<div class="v19-card" style="text-align:center;border-color:var(--primary)">';
  html += '<div style="font-size:48px;margin-bottom:8px">'+tier.icon+'</div>';
  html += '<div style="font-size:22px;font-weight:900;color:var(--primary)">Lv.'+lv+' '+tier.name+'</div>';
  html += '<div style="font-size:14px;color:var(--text-muted);margin-top:4px">총 XP: <strong style="color:var(--primary)">'+mileageData.xp+'</strong></div>';
  if(nextTier){
    html += '<div class="v19-progress"><div class="v19-progress-fill" style="width:'+progress+'%;background:linear-gradient(90deg,var(--primary),#2e9e4f)"></div></div>';
    html += '<div style="font-size:11px;color:var(--text-muted)">다음 레벨 ('+nextTier.name+')까지 <strong>'+(nextTier.xp - mileageData.xp)+'XP</strong> 필요</div>';
  } else {
    html += '<div style="font-size:14px;font-weight:700;color:gold;margin-top:8px">&#x2B50; MAX LEVEL &#x2B50;</div>';
  }
  html += '</div>';

  html += '<div class="v19-card"><h4>&#x1F3C5; 레벨 트랙</h4>';
  html += '<div class="v19-level-track">';
  var fillPct = nextTier ? Math.round(((lv-1)/(levelTiers.length-1)*100) + progress/(levelTiers.length-1)) : 100;
  html += '<div class="v19-level-line"></div>';
  html += '<div class="v19-level-fill" style="width:'+fillPct+'%"></div>';
  html += '<div class="v19-level-nodes">';
  levelTiers.forEach(function(t){
    var cls = t.lv < lv ? 'reached' : t.lv === lv ? 'current' : '';
    html += '<div class="v19-level-node '+cls+'" title="Lv.'+t.lv+' '+t.name+' ('+t.xp+'XP)">'+t.lv+'</div>';
  });
  html += '</div></div></div>';

  html += '<div class="v19-card"><h4>&#x1F4B0; XP 적립 방법</h4>';
  var xpMethods = [
    {act:'라운드 사후 분석 기록',xp:'+20 XP'},{act:'벌타 기록 추가',xp:'+5 XP'},{act:'동반자 등록',xp:'+10 XP'},
    {act:'명예의 전당 등록',xp:'+30 XP'},{act:'퀴즈 도전 완료',xp:'+15 XP'},{act:'업적 달성',xp:'+10 XP'}
  ];
  xpMethods.forEach(function(m){
    html += '<div class="v19-stat-row"><span style="font-size:13px">'+m.act+'</span><span style="font-weight:700;color:var(--primary)">'+m.xp+'</span></div>';
  });
  html += '</div>';

  if(mileageData.history.length > 0){
    html += '<div class="v19-card"><h4>&#x1F4DC; 최근 XP 이력</h4>';
    mileageData.history.slice(-10).reverse().forEach(function(h){
      var date = new Date(h.ts).toLocaleDateString('ko-KR');
      html += '<div class="v19-stat-row"><span style="font-size:12px">'+h.reason+'</span><span style="font-weight:700;color:var(--primary)">+'+h.amount+' XP <span style="font-size:10px;color:var(--text-muted)">'+date+'</span></span></div>';
    });
    html += '</div>';
  }
  c.innerHTML = html;
}

// =============================================
// 8. HALL OF FAME (명예의 전당)
// =============================================
var hofData = JSON.parse(localStorage.getItem('sg_hall_of_fame') || '[]');
function saveHoF(){ localStorage.setItem('sg_hall_of_fame', JSON.stringify(hofData)); }

function renderHallOfFame(containerId){
  var c = document.getElementById(containerId); if(!c) return;
  var html = '<div class="v19-hdr"><h2><span class="v19i">&#x1F3C6;</span> 명예의 전당</h2><button class="v19-x" onclick="document.getElementById(\'v19HoFOverlay\').classList.remove(\'active\')">&times;</button></div>';
  html += '<p style="font-size:13px;color:var(--text-muted);margin-bottom:18px">홀인원, 이글, 알바트로스 등 특별한 샷을 기록하고 축하하세요!</p>';
  html += '<div class="v19-tabs">';
  html += '<button class="v19-tab active" onclick="v19HoFTab(\'records\',this)">기록 ('+hofData.length+')</button>';
  html += '<button class="v19-tab" onclick="v19HoFTab(\'add\',this)">새 기록</button>';
  html += '</div>';
  html += '<div id="v19HoFRecords"></div>';
  html += '<div id="v19HoFAdd" style="display:none">';
  html += '<div class="v19-post-section"><div class="v19-post-title">&#x2B50; 특별 샷 기록</div>';
  html += '<div class="v19-grid2">';
  html += '<div><label style="font-size:11px;font-weight:600">유형</label><select class="v19-select" id="v19hofType" style="width:100%"><option value="holeinone">&#x1F3C6; 홀인원</option><option value="albatross">&#x1F985; 알바트로스 (-3)</option><option value="eagle">&#x1F985; 이글 (-2)</option><option value="birdie">&#x1F426; 버디 (-1)</option><option value="best">&#x1F31F; 최저타</option></select></div>';
  html += '<div><label style="font-size:11px;font-weight:600">날짜</label><input class="v19-input" id="v19hofDate" type="date"></div>';
  html += '<div><label style="font-size:11px;font-weight:600">코스명</label><input class="v19-input" id="v19hofCourse" placeholder="예: 남서울CC"></div>';
  html += '<div><label style="font-size:11px;font-weight:600">홀 번호</label><input class="v19-input" id="v19hofHole" type="number" placeholder="7" min="1" max="18"></div>';
  html += '<div><label style="font-size:11px;font-weight:600">사용 클럽</label><input class="v19-input" id="v19hofClub" placeholder="7번 아이언"></div>';
  html += '<div><label style="font-size:11px;font-weight:600">거리 (야드)</label><input class="v19-input" id="v19hofDist" type="number" placeholder="150"></div>';
  html += '</div>';
  html += '<div style="margin-top:10px"><label style="font-size:11px;font-weight:600">메모</label><textarea class="v19-input" id="v19hofMemo" rows="2" placeholder="그 순간의 감동을 기록하세요..."></textarea></div>';
  html += '<button class="v19-btn v19-btn-primary" style="margin-top:14px;width:100%" onclick="v19AddHoF()">&#x1F3C6; 명예의 전당 등록</button>';
  html += '</div></div>';
  c.innerHTML = html;
  var d = document.getElementById('v19hofDate'); if(d) d.value = new Date().toISOString().slice(0,10);
  v19RenderHoFRecords();
}

window.v19HoFTab = function(tab, btn){
  document.querySelectorAll('#v19HoFModal .v19-tab').forEach(function(t){t.classList.remove('active');}); btn.classList.add('active');
  document.getElementById('v19HoFRecords').style.display = tab==='records'?'':'none';
  document.getElementById('v19HoFAdd').style.display = tab==='add'?'':'none';
  if(tab==='records') v19RenderHoFRecords();
};

function v19RenderHoFRecords(){
  var el = document.getElementById('v19HoFRecords'); if(!el) return;
  if(hofData.length===0){el.innerHTML='<div class="v19-card" style="text-align:center"><p>&#x1F3C6; 아직 등록된 기록이 없습니다. 특별한 샷을 기록해보세요!</p></div>';return;}
  var typeInfo={holeinone:{name:'홀인원',icon:'&#x1F3C6;',color:'gold'},albatross:{name:'알바트로스',icon:'&#x1F985;',color:'#9C27B0'},eagle:{name:'이글',icon:'&#x1F985;',color:'#1E88E5'},birdie:{name:'버디',icon:'&#x1F426;',color:'#43A047'},best:{name:'최저타',icon:'&#x1F31F;',color:'#FF6F00'}};
  var html = '<div class="v19-grid2">';
  hofData.slice().reverse().forEach(function(h){
    var info = typeInfo[h.type] || typeInfo.birdie;
    html += '<div class="v19-hof-card" style="border-color:'+info.color+'">';
    html += '<div class="v19-hof-icon">'+info.icon+'</div>';
    html += '<div class="v19-hof-type" style="color:'+info.color+'">'+info.name+'</div>';
    html += '<div class="v19-hof-detail">'+h.course+' '+h.hole+'번홀<br>'+h.club+' / '+h.dist+'yd</div>';
    if(h.memo) html += '<div style="font-size:10px;color:var(--text-muted);margin-top:4px;font-style:italic">&quot;'+h.memo+'&quot;</div>';
    html += '<div class="v19-hof-date">'+h.date+'</div>';
    html += '</div>';
  });
  html += '</div>';
  el.innerHTML = html;
}

window.v19AddHoF = function(){
  var type=document.getElementById('v19hofType').value;
  var date=document.getElementById('v19hofDate').value;
  var course=document.getElementById('v19hofCourse').value.trim();
  var hole=parseInt(document.getElementById('v19hofHole').value);
  var club=document.getElementById('v19hofClub').value.trim();
  var dist=parseInt(document.getElementById('v19hofDist').value)||0;
  var memo=document.getElementById('v19hofMemo').value.trim();
  if(!date||!course||isNaN(hole)){if(typeof showToast==='function')showToast('날짜, 코스, 홀 번호를 입력해주세요','error');return;}
  hofData.push({type:type,date:date,course:course,hole:hole,club:club||'-',dist:dist,memo:memo,ts:Date.now()});
  saveHoF(); v19PlaySFX('hall_of_fame');
  addXP(30, '명예의 전당 등록: '+course+' '+hole+'번홀');
  v19LaunchConfetti();
  if(typeof showToast==='function') showToast('명예의 전당에 등록되었습니다!','success');
  v19CheckAchievements();
  document.querySelector('#v19HoFModal .v19-tab:first-child').click();
};

// =============================================
// 9. CONFETTI ANIMATION
// =============================================
function v19LaunchConfetti(){
  var canvas = document.createElement('canvas');
  canvas.className = 'v19-confetti-canvas';
  document.body.appendChild(canvas);
  var ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  var particles = [];
  var colors = ['#FFD700','#FF6B35','#4CAF50','#1E88E5','#E53935','#9C27B0','#00BCD4'];
  for(var i=0;i<80;i++){
    particles.push({
      x:canvas.width/2+Math.random()*200-100,y:canvas.height/2,
      vx:(Math.random()-0.5)*12,vy:Math.random()*-14-4,
      size:Math.random()*8+4,color:colors[Math.floor(Math.random()*colors.length)],
      rotation:Math.random()*360,rotSpeed:(Math.random()-0.5)*10,
      alpha:1,gravity:0.3
    });
  }
  var frame = 0;
  function animate(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    var alive = false;
    particles.forEach(function(p){
      p.x += p.vx; p.y += p.vy; p.vy += p.gravity;
      p.rotation += p.rotSpeed; p.alpha -= 0.008;
      if(p.alpha <= 0) return;
      alive = true;
      ctx.save(); ctx.translate(p.x,p.y); ctx.rotate(p.rotation*Math.PI/180);
      ctx.globalAlpha = Math.max(0,p.alpha);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size/2,-p.size/2,p.size,p.size);
      ctx.restore();
    });
    frame++;
    if(alive && frame < 180) requestAnimationFrame(animate);
    else { document.body.removeChild(canvas); }
  }
  animate();
}

// =============================================
// 10. GOLF IQ v4 QUIZ (15 NEW QUESTIONS)
// =============================================
var quizV4 = [
  {q:'코스 레이팅(Course Rating)의 의미는?',a:['스크래치 골퍼의 기대 스코어','코스의 총 거리','그린의 속도','벙커의 수'],c:0},
  {q:'슬로프 레이팅 113은 무엇을 의미하나?',a:['표준 난이도 코스','가장 쉬운 코스','가장 어려운 코스','프로 전용 코스'],c:0},
  {q:'스트로크 앤 디스턴스(Stroke and Distance) 벌칙은?',a:['1벌타 + 원래 위치에서 재타','2벌타 + 전진','벌타 없이 드롭','실격'],c:0},
  {q:'비정상적인 코스 상태(Abnormal Course Condition)에 해당하지 않는 것은?',a:['벙커 안의 모래','일시적으로 고인 물','수리지','동물이 만든 구멍'],c:0},
  {q:'매치 플레이에서 상대가 컨시드한 퍼트는?',a:['자동으로 홀 아웃 처리','반드시 퍼팅해야 함','심판 판단 필요','다음 홀에서 결정'],c:0},
  {q:'드롭 시 볼이 릴리프 에리어 밖으로 나가면?',a:['다시 드롭, 두 번째도 나가면 놓기','그대로 플레이','1벌타 추가','원래 위치로 복귀'],c:0},
  {q:'퍼팅 그린에서 볼 마크(피치 마크)는?',a:['수리 가능','수리 불가','심판 허가 필요','상대 동의 필요'],c:0},
  {q:'암(Arm) 로크 퍼팅 그립의 특징은?',a:['퍼터 샤프트를 전완에 고정','양손을 교차','한 손만 사용','손목을 자유롭게'],c:0},
  {q:'플라이어 라이(Flyer Lie)에서 볼은?',a:['예상보다 멀리 날아감','예상보다 짧게 날아감','좌우로 크게 휨','높이 뜨지 않음'],c:0},
  {q:'스팀프미터(Stimpmeter) 수치 11은?',a:['빠른 그린 (투어급)','느린 그린','보통 그린','아주 느린 그린'],c:0},
  {q:'바람 맞바람 10m/s에서 일반적인 클럽 조정은?',a:['+1~2클럽 업','-1클럽 다운','클럽 변경 불필요','+3클럽 업'],c:0},
  {q:'핀 시트(Pin Sheet)란?',a:['그날의 핀 위치를 표시한 문서','홀 컵의 규격서','코스 설계도','스코어카드 양식'],c:0},
  {q:'리빌딩(Re-building) 스윙의 적정 기간은?',a:['최소 3~6개월','1주일','하루','1년 이상'],c:0},
  {q:'우천 시 그립력 유지에 가장 효과적인 방법은?',a:['레인 장갑 착용','맨손 플레이','파우더 사용','장갑 위에 테이핑'],c:0},
  {q:'코스 핸디캡 계산 공식은?',a:['핸디캡 인덱스 x 슬로프/113 + (CR-Par)','핸디캡 인덱스 x 2','총 타수 - 파','핸디캡 인덱스 / 2'],c:0}
];

function renderQuizV4(containerId){
  var c = document.getElementById(containerId); if(!c) return;
  var state = {idx:0, score:0, answered:false};
  function renderQ(){
    var q = quizV4[state.idx];
    var html = '<div class="v19-hdr"><h2><span class="v19i">&#x1F9E0;</span> Golf IQ v4</h2><button class="v19-x" onclick="document.getElementById(\'v19QuizOverlay\').classList.remove(\'active\')">&times;</button></div>';
    html += '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px">';
    html += '<span class="v19-badge" style="background:var(--primary-light);color:var(--primary)">Q'+(state.idx+1)+'/'+quizV4.length+'</span>';
    html += '<span class="v19-badge" style="background:#fff3e0;color:#FF6F00">&#x2705; '+state.score+'점</span>';
    html += '</div>';
    html += '<div class="v19-card" style="border-color:var(--primary)"><h4>'+q.q+'</h4></div>';
    q.a.forEach(function(ans,i){
      html += '<button class="v19-btn v19-btn-secondary" style="width:100%;margin-bottom:8px;justify-content:flex-start" onclick="v19AnswerQuiz('+i+')" id="v19qa'+i+'">'+String.fromCharCode(65+i)+'. '+ans+'</button>';
    });
    html += '<div id="v19QuizFeedback"></div>';
    c.innerHTML = html;
  }
  window.v19AnswerQuiz = function(i){
    if(state.answered) return;
    state.answered = true;
    var q = quizV4[state.idx];
    var correct = i === q.c;
    if(correct) state.score++;
    var btn = document.getElementById('v19qa'+i);
    btn.style.background = correct ? '#4CAF50' : '#e53935';
    btn.style.color = '#fff';
    if(!correct){
      var cBtn = document.getElementById('v19qa'+q.c);
      cBtn.style.background = '#4CAF50'; cBtn.style.color = '#fff';
    }
    v19PlaySFX(correct ? 'quiz_correct' : 'quiz_wrong');
    var fb = document.getElementById('v19QuizFeedback');
    fb.innerHTML = '<div style="text-align:center;margin-top:14px"><p style="font-size:14px;font-weight:700;color:'+(correct?'#4CAF50':'#e53935')+'">'+(correct?'&#x2705; 정답!':'&#x274C; 오답!')+'</p>';
    if(state.idx < quizV4.length - 1){
      fb.innerHTML += '<button class="v19-btn v19-btn-primary" style="margin-top:10px" onclick="v19NextQuiz()">다음 문제 &#x27A1;&#xFE0F;</button></div>';
    } else {
      var grade = state.score >= 14 ? 'S' : state.score >= 12 ? 'A' : state.score >= 9 ? 'B' : state.score >= 6 ? 'C' : 'D';
      fb.innerHTML += '<div style="margin-top:14px;font-size:22px;font-weight:900;color:var(--primary)">최종 점수: '+state.score+'/'+quizV4.length+' ('+grade+'등급)</div>';
      fb.innerHTML += '<button class="v19-btn v19-btn-primary" style="margin-top:10px" onclick="v19RestartQuiz()">&#x1F504; 다시 도전</button></div>';
      addXP(15, 'Golf IQ v4 퀴즈 완료 ('+state.score+'/'+quizV4.length+')');
      v19CheckAchievements();
    }
  };
  window.v19NextQuiz = function(){
    state.idx++; state.answered = false; renderQ();
  };
  window.v19RestartQuiz = function(){
    state.idx = 0; state.score = 0; state.answered = false; renderQ();
  };
  renderQ();
}

// =============================================
// 11. ACHIEVEMENTS v19 (업적 12개 추가, 56→68)
// =============================================
var v19Achievements = [
  {id:'v19_first_analysis',name:'첫 라운드 분석',desc:'라운드 사후 분석을 처음 기록',icon:'&#x1F4CA;',check:function(){return postRoundData.length>=1;}},
  {id:'v19_5_analyses',name:'분석 전문가',desc:'라운드 사후 분석 5회 기록',icon:'&#x1F4C8;',check:function(){return postRoundData.length>=5;}},
  {id:'v19_wind_reader',name:'바람 읽기 달인',desc:'바람 전략 가이드를 열어본 횟수 3회 이상',icon:'&#x1F32C;&#xFE0F;',check:function(){return (parseInt(localStorage.getItem('sg_wind_views')||'0'))>=3;}},
  {id:'v19_dress_master',name:'패션 마스터',desc:'드레스코드 가이드 확인',icon:'&#x1F455;',check:function(){return (parseInt(localStorage.getItem('sg_dress_views')||'0'))>=1;}},
  {id:'v19_rating_calc',name:'코스 분석가',desc:'코스레이팅 계산기 사용',icon:'&#x1F4D0;',check:function(){return (parseInt(localStorage.getItem('sg_rating_calcs')||'0'))>=1;}},
  {id:'v19_penalty_tracker',name:'벌타 파수꾼',desc:'벌타 기록 5건 이상',icon:'&#x26A0;&#xFE0F;',check:function(){return penaltyData.length>=5;}},
  {id:'v19_3_companions',name:'소셜 골퍼',desc:'동반자 3명 이상 등록',icon:'&#x1F465;',check:function(){return companions.length>=3;}},
  {id:'v19_5_companions',name:'네트워커',desc:'동반자 5명 이상 등록',icon:'&#x1F91D;',check:function(){return companions.length>=5;}},
  {id:'v19_level_5',name:'상급자 도달',desc:'마일리지 레벨 5 달성',icon:'&#x1F3CC;&#xFE0F;',check:function(){return getCurrentLevel()>=5;}},
  {id:'v19_level_10',name:'레전드',desc:'마일리지 레벨 10 달성',icon:'&#x2B50;',check:function(){return getCurrentLevel()>=10;}},
  {id:'v19_first_hof',name:'명예의 전당 입성',desc:'명예의 전당에 첫 기록 등록',icon:'&#x1F3C6;',check:function(){return hofData.length>=1;}},
  {id:'v19_quiz_v4',name:'Golf IQ v4 마스터',desc:'Golf IQ v4 퀴즈 완료',icon:'&#x1F9E0;',check:function(){return (parseInt(localStorage.getItem('sg_quiz_v4_done')||'0'))>=1;}}
];

function v19CheckAchievements(){
  var unlocked = JSON.parse(localStorage.getItem('sg_achievements_v19') || '[]');
  var newUnlocks = [];
  v19Achievements.forEach(function(a){
    if(unlocked.indexOf(a.id)===-1 && a.check()){
      unlocked.push(a.id);
      newUnlocks.push(a);
      addXP(10, '업적 달성: ' + a.name);
    }
  });
  if(newUnlocks.length > 0){
    localStorage.setItem('sg_achievements_v19', JSON.stringify(unlocked));
    newUnlocks.forEach(function(a){
      if(typeof showToast==='function') showToast('&#x1F3C5; 업적 달성: '+a.name, 'success');
    });
  }
}

// =============================================
// 12. SFX ENGINE (12 new sounds, 56→68)
// =============================================
var v19SFXDefs = {
  post_analysis:{type:'triangle',freq:660,dur:0.25,freq2:880},
  wind_tip:{type:'sine',freq:400,dur:0.15,freq2:500},
  dress_tip:{type:'sine',freq:520,dur:0.12,freq2:620},
  rating_calc:{type:'triangle',freq:700,dur:0.3,freq2:1050},
  penalty_add:{type:'sawtooth',freq:300,dur:0.2,freq2:200},
  companion_add:{type:'sine',freq:550,dur:0.2,freq2:730},
  mileage_up:{type:'triangle',freq:600,dur:0.35,freq2:900},
  hall_of_fame:{type:'sine',freq:523,dur:0.5,freq2:784},
  quiz_correct:{type:'triangle',freq:660,dur:0.15,freq2:880},
  quiz_wrong:{type:'sawtooth',freq:250,dur:0.25,freq2:180},
  level_up:{type:'sine',freq:440,dur:0.4,freq2:880},
  confetti:{type:'triangle',freq:800,dur:0.2,freq2:1200}
};

function v19PlaySFX(name){
  if(localStorage.getItem('sg_mute')==='1') return;
  var def = v19SFXDefs[name]; if(!def) return;
  try{
    var ac = new (window.AudioContext||window.webkitAudioContext)();
    var osc = ac.createOscillator();
    var gain = ac.createGain();
    osc.type = def.type;
    osc.frequency.setValueAtTime(def.freq, ac.currentTime);
    osc.frequency.linearRampToValueAtTime(def.freq2, ac.currentTime + def.dur);
    gain.gain.setValueAtTime(0.12, ac.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + def.dur);
    osc.connect(gain); gain.connect(ac.destination);
    osc.start(ac.currentTime); osc.stop(ac.currentTime + def.dur);
    setTimeout(function(){ac.close();}, (def.dur+0.1)*1000);
  } catch(e){}
}

// =============================================
// 13. OVERLAY + BUTTON INJECTION
// =============================================
function createOverlay(id, modalId, renderFn){
  var overlay = document.createElement('div');
  overlay.className = 'v19-overlay';
  overlay.id = id;
  overlay.innerHTML = '<div class="v19-modal" id="'+modalId+'"></div>';
  overlay.addEventListener('click', function(e){ if(e.target===overlay) overlay.classList.remove('active'); });
  document.body.appendChild(overlay);
  return overlay;
}

var postOverlay = createOverlay('v19PostOverlay','v19PostModal');
var windOverlay = createOverlay('v19WindOverlay','v19WindModal');
var dressOverlay = createOverlay('v19DressOverlay','v19DressModal');
var ratingOverlay = createOverlay('v19RatingOverlay','v19RatingModal');
var penaltyOverlay = createOverlay('v19PenaltyOverlay','v19PenaltyModal');
var companionOverlay = createOverlay('v19CompanionOverlay','v19CompanionModal');
var mileageOverlay = createOverlay('v19MileageOverlay','v19MileageModal');
var hofOverlay = createOverlay('v19HoFOverlay','v19HoFModal');
var quizOverlay = createOverlay('v19QuizOverlay','v19QuizModal');

function openV19(overlayId, modalId, renderFn){
  renderFn(modalId);
  document.getElementById(overlayId).classList.add('active');
}

window.v19OpenPost = function(){ openV19('v19PostOverlay','v19PostModal',renderPostRound); };
window.v19OpenWind = function(){ var views=parseInt(localStorage.getItem('sg_wind_views')||'0')+1; localStorage.setItem('sg_wind_views',''+views); openV19('v19WindOverlay','v19WindModal',renderWindGuide); v19CheckAchievements(); };
window.v19OpenDress = function(){ var views=parseInt(localStorage.getItem('sg_dress_views')||'0')+1; localStorage.setItem('sg_dress_views',''+views); openV19('v19DressOverlay','v19DressModal',renderDressCode); v19CheckAchievements(); };
window.v19OpenRating = function(){ openV19('v19RatingOverlay','v19RatingModal',renderRatingCalc); };
window.v19OpenPenalty = function(){ openV19('v19PenaltyOverlay','v19PenaltyModal',renderPenaltyTracker); };
window.v19OpenCompanion = function(){ openV19('v19CompanionOverlay','v19CompanionModal',renderCompanionManager); };
window.v19OpenMileage = function(){ openV19('v19MileageOverlay','v19MileageModal',renderMileage); };
window.v19OpenHoF = function(){ openV19('v19HoFOverlay','v19HoFModal',renderHallOfFame); };
window.v19OpenQuiz = function(){ openV19('v19QuizOverlay','v19QuizModal',renderQuizV4); };

// Escape closes v19 overlays
document.addEventListener('keydown', function(e){
  if(e.key==='Escape'){
    ['v19PostOverlay','v19WindOverlay','v19DressOverlay','v19RatingOverlay','v19PenaltyOverlay','v19CompanionOverlay','v19MileageOverlay','v19HoFOverlay','v19QuizOverlay'].forEach(function(id){
      var el=document.getElementById(id); if(el) el.classList.remove('active');
    });
  }
});

// Keyboard shortcuts
document.addEventListener('keydown', function(e){
  var t = e.target.tagName;
  if(t==='INPUT'||t==='TEXTAREA'||t==='SELECT') return;
  if(e.shiftKey && e.key==='P') v19OpenPost();
  if(e.shiftKey && e.key==='W') v19OpenWind();
  if(e.shiftKey && e.key==='D') v19OpenDress();
  if(e.shiftKey && e.key==='L') v19OpenRating();
  if(e.shiftKey && e.key==='X') v19OpenPenalty();
  if(e.shiftKey && e.key==='N') v19OpenCompanion();
  if(e.shiftKey && e.key==='M') v19OpenMileage();
  if(e.shiftKey && e.key==='O') v19OpenHoF();
  if(e.shiftKey && e.key==='Q') v19OpenQuiz();
});

// Quick action buttons injection
function injectV19Buttons(){
  var target = document.querySelector('.results-header') || document.querySelector('.search-section');
  if(!target) return;
  var bar = document.createElement('div');
  bar.style.cssText = 'display:flex;gap:6px;flex-wrap:wrap;margin:10px 0;padding:0 0 6px';
  var buttons = [
    {label:'&#x1F4CA; 사후분석',fn:'v19OpenPost()'},
    {label:'&#x1F32C;&#xFE0F; 바람전략',fn:'v19OpenWind()'},
    {label:'&#x1F455; 드레스코드',fn:'v19OpenDress()'},
    {label:'&#x1F4D0; 코스레이팅',fn:'v19OpenRating()'},
    {label:'&#x26A0;&#xFE0F; 벌타분석',fn:'v19OpenPenalty()'},
    {label:'&#x1F465; 동반자',fn:'v19OpenCompanion()'},
    {label:'&#x1F3AE; 마일리지',fn:'v19OpenMileage()'},
    {label:'&#x1F3C6; 명예의전당',fn:'v19OpenHoF()'},
    {label:'&#x1F9E0; Quiz v4',fn:'v19OpenQuiz()'}
  ];
  buttons.forEach(function(b){
    var btn = document.createElement('button');
    btn.className = 'v19-btn v19-btn-sm v19-btn-secondary';
    btn.innerHTML = b.label;
    btn.setAttribute('onclick', b.fn);
    bar.appendChild(btn);
  });
  target.parentNode.insertBefore(bar, target.nextSibling);
}

// Rating calc tracking for achievements
var _origV19Calc = window.v19CalcRating;
var _wrappedCalc = window.v19CalcRating;
window.v19CalcRating = function(){
  var c = parseInt(localStorage.getItem('sg_rating_calcs')||'0')+1;
  localStorage.setItem('sg_rating_calcs',''+c);
  _wrappedCalc();
  v19CheckAchievements();
};

// Quiz completion tracking
var _origV19Answer = window.v19AnswerQuiz;
var origNextQuiz = window.v19NextQuiz;

// XP hooks for existing features
if(typeof window.v19SavePostRound === 'function'){
  var _origSavePost = window.v19SavePostRound;
  window.v19SavePostRound = function(){
    _origSavePost();
    addXP(20, '라운드 사후 분석 기록');
  };
}

// Init
setTimeout(function(){
  injectV19Buttons();
  v19CheckAchievements();
}, 800);

})();
