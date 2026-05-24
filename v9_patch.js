// SmartGolf v9.0 Patch - PRIME Holdings NEXTERA+PRISM
// 핸디캡계산기+코스비교+골프퀴즈20문+일일팁+출석시스템+업적30개+공유카드+골프역사연표+스코어트렌드+연습메모
(function(){
'use strict';
if(window.__sg_v9) return;
window.__sg_v9 = true;

// ─── Utility ───
const LS = k => { try { return JSON.parse(localStorage.getItem('sg_v9_'+k)); } catch(e) { return null; } };
const SS = (k,v) => { try { localStorage.setItem('sg_v9_'+k, JSON.stringify(v)); } catch(e){} };
const $ = s => document.querySelector(s);
const $$ = s => document.querySelectorAll(s);
const CE = (tag, cls, html) => { const e = document.createElement(tag); if(cls) e.className = cls; if(html) e.innerHTML = html; return e; };
function toast(msg) { if(window.showToast) window.showToast(msg); else { const t = CE('div','',msg); Object.assign(t.style,{position:'fixed',bottom:'80px',left:'50%',transform:'translateX(-50%)',background:'#333',color:'#fff',padding:'10px 20px',borderRadius:'8px',zIndex:'99999',fontSize:'14px',whiteSpace:'nowrap'}); document.body.appendChild(t); setTimeout(()=>t.remove(),2500); } }
const today = () => new Date().toISOString().slice(0,10);
const dateSeed = () => { const d = new Date(); return d.getFullYear()*10000 + (d.getMonth()+1)*100 + d.getDate(); };

// ─── Web Audio SFX ───
const AC = new (window.AudioContext||window.webkitAudioContext)();
const SFX = {
  handicap(){ const o=AC.createOscillator(),g=AC.createGain();o.type='triangle';o.frequency.setValueAtTime(523,AC.currentTime);o.frequency.exponentialRampToValueAtTime(784,AC.currentTime+0.15);g.gain.setValueAtTime(0.25,AC.currentTime);g.gain.exponentialRampToValueAtTime(0.01,AC.currentTime+0.3);o.connect(g);g.connect(AC.destination);o.start();o.stop(AC.currentTime+0.3); },
  quiz_correct(){ const o=AC.createOscillator(),g=AC.createGain();o.type='sine';o.frequency.setValueAtTime(659,AC.currentTime);o.frequency.setValueAtTime(880,AC.currentTime+0.1);g.gain.setValueAtTime(0.2,AC.currentTime);g.gain.exponentialRampToValueAtTime(0.01,AC.currentTime+0.25);o.connect(g);g.connect(AC.destination);o.start();o.stop(AC.currentTime+0.25); },
  quiz_wrong(){ const o=AC.createOscillator(),g=AC.createGain();o.type='sawtooth';o.frequency.setValueAtTime(200,AC.currentTime);o.frequency.exponentialRampToValueAtTime(100,AC.currentTime+0.3);g.gain.setValueAtTime(0.15,AC.currentTime);g.gain.exponentialRampToValueAtTime(0.01,AC.currentTime+0.3);o.connect(g);g.connect(AC.destination);o.start();o.stop(AC.currentTime+0.3); },
  achievement(){ [523,659,784].forEach((f,i)=>{ const o=AC.createOscillator(),g=AC.createGain();o.type='sine';o.frequency.value=f;g.gain.setValueAtTime(0.2,AC.currentTime+i*0.12);g.gain.exponentialRampToValueAtTime(0.01,AC.currentTime+i*0.12+0.2);o.connect(g);g.connect(AC.destination);o.start(AC.currentTime+i*0.12);o.stop(AC.currentTime+i*0.12+0.2); }); },
  share(){ const o=AC.createOscillator(),g=AC.createGain();o.type='sine';o.frequency.setValueAtTime(440,AC.currentTime);o.frequency.exponentialRampToValueAtTime(880,AC.currentTime+0.2);g.gain.setValueAtTime(0.15,AC.currentTime);g.gain.exponentialRampToValueAtTime(0.01,AC.currentTime+0.3);o.connect(g);g.connect(AC.destination);o.start();o.stop(AC.currentTime+0.3); },
  streak(){ const o=AC.createOscillator(),g=AC.createGain();o.type='triangle';o.frequency.setValueAtTime(392,AC.currentTime);o.frequency.setValueAtTime(523,AC.currentTime+0.1);o.frequency.setValueAtTime(659,AC.currentTime+0.2);g.gain.setValueAtTime(0.2,AC.currentTime);g.gain.exponentialRampToValueAtTime(0.01,AC.currentTime+0.35);o.connect(g);g.connect(AC.destination);o.start();o.stop(AC.currentTime+0.35); }
};
function playSFX(name){ try{ if(AC.state==='suspended') AC.resume(); if(SFX[name]) SFX[name](); }catch(e){} }

// ─── CSS Injection ───
const css = document.createElement('style');
css.textContent = `
.sg9-overlay{position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.6);z-index:10000;display:none;align-items:center;justify-content:center;padding:16px;backdrop-filter:blur(4px)}
.sg9-overlay.active{display:flex}
.sg9-modal{background:var(--card-bg,#fff);border-radius:16px;max-width:600px;width:100%;max-height:85vh;overflow-y:auto;padding:24px;position:relative;box-shadow:0 20px 60px rgba(0,0,0,0.3);animation:sg9SlideUp .3s ease}
@keyframes sg9SlideUp{from{transform:translateY(30px);opacity:0}to{transform:translateY(0);opacity:1}}
.sg9-modal h2{font-size:20px;margin-bottom:16px;color:var(--primary,#1a7a3a);display:flex;align-items:center;gap:8px}
.sg9-close{position:absolute;top:12px;right:16px;background:none;border:none;font-size:24px;cursor:pointer;color:var(--text-muted,#666);line-height:1}
.sg9-close:hover{color:var(--text,#1a1a1a)}
.sg9-tabs{display:flex;gap:6px;margin-bottom:16px;flex-wrap:wrap}
.sg9-tab{padding:6px 14px;border-radius:20px;border:1px solid var(--border,#e0e0e0);background:var(--card-bg,#fff);cursor:pointer;font-size:13px;transition:all .2s}
.sg9-tab.active{background:var(--primary,#1a7a3a);color:#fff;border-color:var(--primary,#1a7a3a)}
.sg9-card{background:var(--primary-light,#e8f5e9);border-radius:12px;padding:16px;margin-bottom:12px}
.sg9-card h3{font-size:15px;margin-bottom:8px;color:var(--primary-dark,#0f5a28)}
.sg9-card p{font-size:13px;line-height:1.6;color:var(--text,#1a1a1a)}
.sg9-btn{padding:10px 20px;border:none;border-radius:8px;background:var(--primary,#1a7a3a);color:#fff;cursor:pointer;font-size:14px;font-weight:600;transition:all .2s}
.sg9-btn:hover{background:var(--primary-dark,#0f5a28);transform:translateY(-1px)}
.sg9-btn.secondary{background:var(--primary-light,#e8f5e9);color:var(--primary,#1a7a3a)}
.sg9-input{width:100%;padding:10px 14px;border:1px solid var(--border,#e0e0e0);border-radius:8px;font-size:14px;background:var(--card-bg,#fff);color:var(--text,#1a1a1a);margin-bottom:8px}
.sg9-input:focus{outline:none;border-color:var(--primary,#1a7a3a)}
.sg9-grid2{display:grid;grid-template-columns:1fr 1fr;gap:12px}
@media(max-width:480px){.sg9-grid2{grid-template-columns:1fr}}
.sg9-badge{display:inline-flex;align-items:center;gap:4px;padding:4px 10px;border-radius:12px;font-size:11px;font-weight:600;background:var(--primary-light,#e8f5e9);color:var(--primary,#1a7a3a)}
.sg9-badge.gold{background:#fff3cd;color:#856404}
.sg9-badge.silver{background:#e2e3e5;color:#383d41}
.sg9-badge.locked{background:#f8f9fa;color:#999;opacity:0.6}
.sg9-progress{width:100%;height:8px;background:var(--border,#e0e0e0);border-radius:4px;overflow:hidden;margin:8px 0}
.sg9-progress-fill{height:100%;background:linear-gradient(90deg,var(--primary,#1a7a3a),var(--accent,#ff6b35));border-radius:4px;transition:width .5s ease}
.sg9-timeline{position:relative;padding-left:24px}
.sg9-timeline::before{content:'';position:absolute;left:8px;top:0;bottom:0;width:2px;background:var(--primary,#1a7a3a)}
.sg9-tl-item{position:relative;margin-bottom:20px;padding-left:16px}
.sg9-tl-item::before{content:'';position:absolute;left:-20px;top:4px;width:12px;height:12px;border-radius:50%;background:var(--primary,#1a7a3a);border:2px solid #fff;box-shadow:0 0 0 2px var(--primary,#1a7a3a)}
.sg9-tl-year{font-size:12px;font-weight:700;color:var(--accent,#ff6b35);margin-bottom:2px}
.sg9-tl-title{font-size:14px;font-weight:600;color:var(--text,#1a1a1a)}
.sg9-tl-desc{font-size:12px;color:var(--text-muted,#666);margin-top:2px}
.sg9-quiz-opt{display:block;width:100%;padding:12px 16px;margin:6px 0;border:2px solid var(--border,#e0e0e0);border-radius:10px;background:var(--card-bg,#fff);cursor:pointer;text-align:left;font-size:14px;transition:all .2s}
.sg9-quiz-opt:hover{border-color:var(--primary,#1a7a3a);background:var(--primary-light,#e8f5e9)}
.sg9-quiz-opt.correct{border-color:#28a745;background:#d4edda;color:#155724}
.sg9-quiz-opt.wrong{border-color:#dc3545;background:#f8d7da;color:#721c24}
.sg9-streak-bar{display:flex;gap:4px;margin:12px 0}
.sg9-streak-day{width:28px;height:28px;border-radius:6px;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:600;background:var(--border,#e0e0e0);color:var(--text-muted,#666)}
.sg9-streak-day.done{background:var(--primary,#1a7a3a);color:#fff}
.sg9-streak-day.today{border:2px solid var(--accent,#ff6b35)}
.sg9-memo-item{background:var(--card-bg,#fff);border:1px solid var(--border,#e0e0e0);border-radius:10px;padding:14px;margin-bottom:10px;position:relative}
.sg9-memo-item h4{font-size:14px;color:var(--primary,#1a7a3a);margin-bottom:4px}
.sg9-memo-item p{font-size:13px;color:var(--text,#1a1a1a);line-height:1.5}
.sg9-memo-del{position:absolute;top:10px;right:12px;background:none;border:none;color:#dc3545;cursor:pointer;font-size:16px}
.sg9-compare-side{border:1px solid var(--border,#e0e0e0);border-radius:12px;padding:16px;text-align:center}
.sg9-compare-side h3{font-size:15px;color:var(--primary,#1a7a3a);margin-bottom:8px}
.sg9-compare-row{display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid var(--border,#e0e0e0);font-size:13px}
.sg9-compare-row:last-child{border-bottom:none}
.sg9-compare-label{font-weight:600;color:var(--text-muted,#666);flex:0 0 80px}
.sg9-compare-val{flex:1;text-align:center;font-weight:500}
.sg9-compare-val.highlight{color:var(--primary,#1a7a3a);font-weight:700}
`;
document.head.appendChild(css);

// ─── 1. 핸디캡 계산기 (WHS 방식) ───
function showHandicap(){
  let ov = document.getElementById('sg9HandicapOv');
  if(!ov){
    ov = CE('div','sg9-overlay');
    ov.id = 'sg9HandicapOv';
    ov.setAttribute('role','dialog');
    ov.setAttribute('aria-label','핸디캡 계산기');
    document.body.appendChild(ov);
  }
  const rounds = LS('hc_rounds') || [];
  const hcIndex = calcHandicap(rounds);

  let roundsHTML = '';
  rounds.forEach((r,i) => {
    roundsHTML += `<div class="sg9-compare-row"><span>${r.date}</span><span>${r.course||'코스'}</span><span>스코어: ${r.score}</span><span>CR/SR: ${r.cr}/${r.sr}</span><span style="color:#dc3545;cursor:pointer" onclick="window.__sg9_delRound(${i})">&#10005;</span></div>`;
  });

  ov.innerHTML = `<div class="sg9-modal">
    <button class="sg9-close" onclick="this.closest('.sg9-overlay').classList.remove('active')">&times;</button>
    <h2>&#9971; 핸디캡 계산기</h2>
    <div class="sg9-card">
      <h3>내 핸디캡 인덱스</h3>
      <div style="text-align:center;padding:16px">
        <div style="font-size:48px;font-weight:800;color:var(--primary,#1a7a3a)">${hcIndex !== null ? hcIndex.toFixed(1) : '--'}</div>
        <div style="font-size:13px;color:var(--text-muted,#666);margin-top:4px">WHS (World Handicap System) 기준</div>
        <div style="font-size:12px;color:var(--text-muted,#666)">최근 20라운드 중 best 8 디퍼렌셜 평균 &times; 0.96</div>
      </div>
    </div>
    <h3 style="font-size:15px;margin:16px 0 8px">라운드 기록 추가</h3>
    <div class="sg9-grid2">
      <input class="sg9-input" id="sg9HcDate" type="date" value="${today()}">
      <input class="sg9-input" id="sg9HcCourse" placeholder="코스명">
    </div>
    <div class="sg9-grid2" style="margin-top:4px">
      <input class="sg9-input" id="sg9HcScore" type="number" placeholder="총 스코어 (예: 92)" min="50" max="150">
      <div style="display:flex;gap:4px">
        <input class="sg9-input" id="sg9HcCR" type="number" step="0.1" placeholder="CR (예: 72.3)" style="flex:1">
        <input class="sg9-input" id="sg9HcSR" type="number" placeholder="SR (예: 130)" style="flex:1">
      </div>
    </div>
    <button class="sg9-btn" onclick="window.__sg9_addRound()" style="width:100%;margin:10px 0">라운드 추가</button>
    <h3 style="font-size:15px;margin:12px 0 8px">라운드 기록 (${rounds.length}/20)</h3>
    <div style="max-height:200px;overflow-y:auto">${roundsHTML || '<p style="text-align:center;color:var(--text-muted,#666);padding:20px">아직 기록이 없습니다. 라운드를 추가하세요!</p>'}</div>
    <div class="sg9-card" style="margin-top:12px">
      <h3>핸디캡 등급표</h3>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px;font-size:12px;text-align:center">
        <span class="sg9-badge gold">스크래치 &lt;1</span>
        <span class="sg9-badge" style="background:#c3e6cb">싱글 1~9</span>
        <span class="sg9-badge silver">보기 10~18</span>
        <span class="sg9-badge" style="background:#ffeeba">중급 19~28</span>
        <span class="sg9-badge" style="background:#f5c6cb">초급 29~36</span>
        <span class="sg9-badge locked">입문 36+</span>
      </div>
    </div>
  </div>`;
  ov.classList.add('active');
  playSFX('handicap');
  trackAchievement('handicap_opened');
}
function calcHandicap(rounds){
  if(!rounds || rounds.length < 3) return null;
  const diffs = rounds.map(r => {
    const diff = (r.score - r.cr) * (113 / r.sr);
    return diff;
  }).sort((a,b) => a - b);
  let n = Math.min(rounds.length, 20);
  let take = n <= 3 ? 1 : n <= 5 ? 1 : n <= 6 ? 2 : n <= 8 ? 2 : n <= 11 ? 3 : n <= 14 ? 4 : n <= 16 ? 5 : n <= 18 ? 6 : n <= 19 ? 7 : 8;
  const best = diffs.slice(0, take);
  const avg = best.reduce((a,b)=>a+b,0) / best.length;
  return avg * 0.96;
}
window.__sg9_addRound = function(){
  const date = document.getElementById('sg9HcDate').value;
  const course = document.getElementById('sg9HcCourse').value.trim();
  const score = parseFloat(document.getElementById('sg9HcScore').value);
  const cr = parseFloat(document.getElementById('sg9HcCR').value);
  const sr = parseFloat(document.getElementById('sg9HcSR').value);
  if(!score || !cr || !sr || score < 50 || score > 200) { toast('스코어/CR/SR을 올바르게 입력하세요'); return; }
  const rounds = LS('hc_rounds') || [];
  rounds.unshift({ date: date||today(), course: course||'미입력', score, cr, sr });
  if(rounds.length > 20) rounds.length = 20;
  SS('hc_rounds', rounds);
  toast('라운드 추가 완료!');
  trackAchievement('round_added');
  if(rounds.length >= 5) trackAchievement('rounds_5');
  if(rounds.length >= 10) trackAchievement('rounds_10');
  if(rounds.length >= 20) trackAchievement('rounds_20');
  showHandicap();
};
window.__sg9_delRound = function(i){
  const rounds = LS('hc_rounds') || [];
  rounds.splice(i,1);
  SS('hc_rounds', rounds);
  showHandicap();
};

// ─── 2. 코스 1:1 비교 ───
function showCourseCompare(){
  let ov = document.getElementById('sg9CompareOv');
  if(!ov){
    ov = CE('div','sg9-overlay');
    ov.id = 'sg9CompareOv';
    ov.setAttribute('role','dialog');
    document.body.appendChild(ov);
  }
  const courses = window.allCourses || window.courses || [];
  const sel = LS('compare_sel') || [null, null];
  const optionsHTML = courses.map((c,i) => `<option value="${i}">${c.name || c[1] || ('코스 '+(i+1))}</option>`).join('');

  let compHTML = '';
  if(sel[0] !== null && sel[1] !== null && courses[sel[0]] && courses[sel[1]]){
    const a = courses[sel[0]], b = courses[sel[1]];
    const gn = c => c.name || c[1] || '코스';
    const gp = c => c.price || c[7] || '-';
    const gr = c => c.region || c[2] || '-';
    const gt = c => c.type || c[3] || '-';
    const gh = c => c.holes || c[4] || '-';
    const gg = c => c.grass || c[5] || '-';
    const ga = c => c.address || c[6] || '-';
    const fields = [
      ['지역', gr(a), gr(b)],
      ['타입', gt(a), gt(b)],
      ['홀수', gh(a), gh(b)],
      ['잔디', gg(a), gg(b)],
      ['가격', gp(a), gp(b)],
      ['주소', ga(a), ga(b)]
    ];
    compHTML = `<div class="sg9-grid2" style="margin-top:16px">
      <div class="sg9-compare-side"><h3>${gn(a)}</h3></div>
      <div class="sg9-compare-side"><h3>${gn(b)}</h3></div>
    </div>
    <div style="margin-top:12px">
      ${fields.map(f => `<div class="sg9-compare-row"><span class="sg9-compare-label">${f[0]}</span><span class="sg9-compare-val">${f[1]}</span><span class="sg9-compare-val">${f[2]}</span></div>`).join('')}
    </div>`;
    trackAchievement('compare_used');
  }

  ov.innerHTML = `<div class="sg9-modal">
    <button class="sg9-close" onclick="this.closest('.sg9-overlay').classList.remove('active')">&times;</button>
    <h2>&#128200; 코스 1:1 비교</h2>
    <p style="font-size:13px;color:var(--text-muted,#666);margin-bottom:12px">두 코스를 선택하여 가격, 지역, 시설을 한눈에 비교하세요.</p>
    <div class="sg9-grid2">
      <select class="sg9-input" id="sg9Comp1" onchange="window.__sg9_selComp(0,this.value)">
        <option value="">코스 A 선택</option>${optionsHTML}
      </select>
      <select class="sg9-input" id="sg9Comp2" onchange="window.__sg9_selComp(1,this.value)">
        <option value="">코스 B 선택</option>${optionsHTML}
      </select>
    </div>
    ${compHTML}
  </div>`;
  ov.classList.add('active');
  if(sel[0]!==null) document.getElementById('sg9Comp1').value = sel[0];
  if(sel[1]!==null) document.getElementById('sg9Comp2').value = sel[1];
}
window.__sg9_selComp = function(idx, val){
  const sel = LS('compare_sel') || [null, null];
  sel[idx] = val === '' ? null : parseInt(val);
  SS('compare_sel', sel);
  showCourseCompare();
};

// ─── 3. 골프 퀴즈 20문 ───
const QUIZ_DATA = [
  {q:'골프에서 1타 줄인 것을 무엇이라 하나요?',o:['버디','이글','보기','알바트로스'],a:0,cat:'기본',ex:'파보다 1타 적은 스코어를 버디(Birdie)라고 합니다.'},
  {q:'티잉 구역(Teeing Area)에서 티를 꽂을 수 있는 범위는?',o:['티 마커 앞 2클럽 길이','티 마커 뒤 2클럽 길이','제한 없음','티 마커 옆 1클럽 길이'],a:1,cat:'규칙',ex:'2019 규칙개정으로 티 마커 뒤 2클럽 길이 이내에서 티업할 수 있습니다.'},
  {q:'OB(Out of Bounds)의 벌타는 몇 타인가요?',o:['0벌타','1벌타','2벌타','실격'],a:1,cat:'규칙',ex:'OB는 1벌타를 받고 직전 위치에서 다시 칩니다 (스트로크와 거리의 벌).'},
  {q:'샌드웨지의 일반적인 로프트 각도는?',o:['46~48도','50~52도','54~56도','60~64도'],a:2,cat:'장비',ex:'샌드웨지(SW)는 보통 54~56도의 로프트를 가지고 있습니다.'},
  {q:'골프공의 딤플(dimple) 수는 보통 몇 개인가요?',o:['200~250개','300~350개','330~500개','500~600개'],a:2,cat:'장비',ex:'대부분의 골프공은 330~500개의 딤플을 가지고 있으며 비행 안정성을 높입니다.'},
  {q:'그린 위에서 공이 다른 공을 맞추면?',o:['벌타 없음','맞춘 사람 1벌타','맞은 사람 1벌타','양쪽 1벌타'],a:0,cat:'규칙',ex:'2019 규칙개정으로 그린 위에서 공이 다른 공을 맞춰도 벌타가 없습니다.'},
  {q:'핸디캡 계산에 사용되는 국제 표준 시스템은?',o:['USGA 시스템','WHS','EGA 시스템','JGA 시스템'],a:1,cat:'기본',ex:'2020년부터 World Handicap System(WHS)이 전세계 통합 표준으로 사용됩니다.'},
  {q:'드라이버의 최대 허용 클럽 길이는?',o:['43인치','45인치','46인치','48인치'],a:2,cat:'장비',ex:'R&A/USGA 규칙상 드라이버 최대 길이는 46인치(약 116.84cm)입니다.'},
  {q:'코스 레이팅(CR)이란?',o:['스크래치 골퍼의 예상 스코어','보기 골퍼의 예상 스코어','프로의 평균 스코어','아마추어 평균 스코어'],a:0,cat:'기본',ex:'코스 레이팅은 핸디캡 0인 스크래치 골퍼가 그 코스에서 기대하는 스코어입니다.'},
  {q:'슬로프 레이팅(SR)의 범위는?',o:['50~150','55~155','80~140','100~155'],a:1,cat:'기본',ex:'슬로프 레이팅은 55(쉬움)~155(어려움) 범위이며, 표준 코스는 113입니다.'},
  {q:'골프 역사상 최초의 메이저 대회는?',o:['마스터즈','US 오픈','디 오픈 챔피언십','PGA 챔피언십'],a:2,cat:'역사',ex:'디 오픈 챔피언십(The Open)은 1860년에 시작된 세계 최초의 메이저 대회입니다.'},
  {q:'대한민국 최초의 골프장은?',o:['한양CC','서울CC','군자리CC(효창원)','제주CC'],a:2,cat:'역사',ex:'1897년 원산에 비공식 코스가 있었고, 1921년 효창원에 군자리CC가 개장했습니다.'},
  {q:'페어웨이에서 디봇(divot)을 고치지 않으면?',o:['2벌타','경고','벌타 없음(에티켓)','실격'],a:2,cat:'규칙',ex:'디봇 복구는 벌타 규정은 아니지만, 골프 에티켓의 기본입니다.'},
  {q:'퍼팅에서 &quot;읽기(Reading)&quot;란?',o:['그린의 경사와 속도 파악','퍼터 스펙 확인','스코어카드 확인','라인 위 잔디결 파악만'],a:0,cat:'기술',ex:'그린 리딩은 경사, 잔디결, 속도를 종합적으로 파악하는 것을 말합니다.'},
  {q:'백스윙에서 왼팔(오른손잡이 기준)의 이상적 형태는?',o:['자연스럽게 구부림','완전히 펴기','90도 구부림','어깨 높이까지만'],a:1,cat:'기술',ex:'왼팔을 펴서 큰 아크를 만들면 일관성 있는 스윙을 할 수 있습니다.'},
  {q:'파3 홀에서 홀인원은 다른 말로?',o:['에이스','알바트로스','콘도르','이글'],a:0,cat:'기본',ex:'홀인원(Hole-in-one)을 에이스(Ace)라고도 부릅니다.'},
  {q:'골프 그립 종류 중 &quot;인터로킹 그립&quot;은?',o:['양손 겹치기','새끼손가락 교차','열 손가락 쥐기','왼손 위 오른손'],a:1,cat:'기술',ex:'인터로킹 그립은 오른손 새끼손가락과 왼손 검지를 교차시키는 방법입니다.'},
  {q:'라운드 중 연습 스윙으로 공이 움직이면?',o:['벌타 없음, 원위치','1벌타, 원위치','1벌타, 있는 자리에서','2벌타'],a:1,cat:'규칙',ex:'의도하지 않게 공이 움직이면 1벌타를 받고 원래 자리에 놓아야 합니다.'},
  {q:'스테이블포드(Stableford) 방식에서 버디는 몇 점?',o:['1점','2점','3점','4점'],a:2,cat:'기본',ex:'스테이블포드: 더블보기이상=0, 보기=1, 파=2, 버디=3, 이글=4, 알바트로스=5'},
  {q:'한국 KLPGA 투어가 창설된 해는?',o:['1978년','1988년','1998년','2008년'],a:1,cat:'역사',ex:'KLPGA 투어는 1988년에 공식 창설되었습니다.'}
];

let quizState = { idx: 0, score: 0, answered: false, answers: [], filter: '전체' };
function showQuiz(){
  let ov = document.getElementById('sg9QuizOv');
  if(!ov){
    ov = CE('div','sg9-overlay');
    ov.id = 'sg9QuizOv';
    ov.setAttribute('role','dialog');
    document.body.appendChild(ov);
  }
  quizState = { idx: 0, score: 0, answered: false, answers: [], filter: '전체' };
  renderQuiz(ov);
  ov.classList.add('active');
}
function renderQuiz(ov){
  const cats = ['전체','기본','규칙','장비','기술','역사'];
  const filtered = quizState.filter === '전체' ? QUIZ_DATA : QUIZ_DATA.filter(q=>q.cat===quizState.filter);

  if(quizState.idx >= filtered.length){
    const pct = Math.round(quizState.score / filtered.length * 100);
    const grade = pct >= 90 ? 'S' : pct >= 80 ? 'A' : pct >= 70 ? 'B' : pct >= 60 ? 'C' : 'D';
    trackAchievement('quiz_completed');
    if(pct >= 80) trackAchievement('quiz_master');
    if(pct === 100) trackAchievement('quiz_perfect');
    ov.innerHTML = `<div class="sg9-modal">
      <button class="sg9-close" onclick="this.closest('.sg9-overlay').classList.remove('active')">&times;</button>
      <h2>&#127942; 퀴즈 결과</h2>
      <div style="text-align:center;padding:24px">
        <div style="font-size:64px;font-weight:800;color:var(--primary,#1a7a3a)">${grade}</div>
        <div style="font-size:18px;margin:8px 0">${quizState.score} / ${filtered.length} 정답 (${pct}%)</div>
        <div class="sg9-progress"><div class="sg9-progress-fill" style="width:${pct}%"></div></div>
      </div>
      <button class="sg9-btn" onclick="window.__sg9_retryQuiz()" style="width:100%">다시 도전</button>
    </div>`;
    return;
  }
  const q = filtered[quizState.idx];
  ov.innerHTML = `<div class="sg9-modal">
    <button class="sg9-close" onclick="this.closest('.sg9-overlay').classList.remove('active')">&times;</button>
    <h2>&#128218; 골프 퀴즈</h2>
    <div class="sg9-tabs">${cats.map(c=>`<button class="sg9-tab ${quizState.filter===c?'active':''}" onclick="window.__sg9_quizFilter('${c}')">${c}</button>`).join('')}</div>
    <div style="font-size:12px;color:var(--text-muted,#666);margin-bottom:8px">문제 ${quizState.idx+1} / ${filtered.length} | 카테고리: ${q.cat}</div>
    <div class="sg9-card"><p style="font-size:15px;font-weight:600">${q.q}</p></div>
    <div id="sg9QuizOpts">${q.o.map((o,i)=>`<button class="sg9-quiz-opt" onclick="window.__sg9_answer(${i})">${String.fromCharCode(9312+i)} ${o}</button>`).join('')}</div>
    <div id="sg9QuizExpl" style="display:none"></div>
    <div style="display:flex;justify-content:space-between;margin-top:12px">
      <span style="font-size:13px">&#9989; ${quizState.score}점</span>
      <button class="sg9-btn" id="sg9QuizNext" style="display:none" onclick="window.__sg9_nextQ()">다음 &#10140;</button>
    </div>
  </div>`;
};
window.__sg9_answer = function(i){
  if(quizState.answered) return;
  quizState.answered = true;
  const filtered = quizState.filter === '전체' ? QUIZ_DATA : QUIZ_DATA.filter(q=>q.cat===quizState.filter);
  const q = filtered[quizState.idx];
  const btns = document.querySelectorAll('#sg9QuizOpts .sg9-quiz-opt');
  btns[q.a].classList.add('correct');
  if(i === q.a){ quizState.score++; playSFX('quiz_correct'); }
  else { btns[i].classList.add('wrong'); playSFX('quiz_wrong'); }
  quizState.answers.push(i === q.a);
  const expl = document.getElementById('sg9QuizExpl');
  expl.style.display = 'block';
  expl.innerHTML = `<div class="sg9-card" style="margin-top:8px"><p>&#128161; ${q.ex}</p></div>`;
  document.getElementById('sg9QuizNext').style.display = 'inline-block';
};
window.__sg9_nextQ = function(){
  quizState.idx++;
  quizState.answered = false;
  renderQuiz(document.getElementById('sg9QuizOv'));
};
window.__sg9_retryQuiz = function(){
  quizState = { idx:0, score:0, answered:false, answers:[], filter:quizState.filter };
  renderQuiz(document.getElementById('sg9QuizOv'));
};
window.__sg9_quizFilter = function(cat){
  quizState.filter = cat;
  quizState.idx = 0;
  quizState.score = 0;
  quizState.answered = false;
  quizState.answers = [];
  renderQuiz(document.getElementById('sg9QuizOv'));
};

// ─── 4. 일일 골프 팁 ───
const DAILY_TIPS = [
  {title:'드라이버 비거리 늘리기',tip:'어드레스 시 체중을 오른발(오른손잡이) 55%에 두고, 다운스윙에서 하체 리드로 전환하세요. 상체가 먼저 돌면 슬라이스가 납니다.',cat:'스윙'},
  {title:'퍼팅 거리감 연습',tip:'3m, 5m, 8m 거리에서 각각 10번씩 연습하세요. 공이 홀을 30cm 지나가는 것을 목표로 하면 적절한 거리감을 익힐 수 있습니다.',cat:'퍼팅'},
  {title:'벙커 탈출 핵심',tip:'벙커에서는 공 뒤 5cm 모래를 치세요. 클럽페이스를 열고 풀스윙하며, 공을 직접 치려 하지 마세요. 모래가 공을 띄워줍니다.',cat:'기술'},
  {title:'라운드 전 스트레칭',tip:'어깨 회전, 허리 비틀기, 햄스트링 스트레칭을 각 30초씩 하세요. 워밍업 없이 바로 치면 부상 위험이 높아집니다.',cat:'체력'},
  {title:'코스 매니지먼트',tip:'무리한 샷보다 안전한 레이업을 선택하세요. 벙커와 워터해저드를 피하는 것만으로도 5타 이상 줄일 수 있습니다.',cat:'전략'},
  {title:'그립 압력',tip:'클럽을 1~10 중 4~5 정도의 힘으로 잡으세요. 너무 세게 잡으면 손목이 경직되어 헤드 스피드가 줄어듭니다.',cat:'스윙'},
  {title:'그린 읽기 방법',tip:'가장 낮은 지점에서 그린을 바라보세요. 물이 흐르는 방향을 상상하면 경사를 쉽게 읽을 수 있습니다.',cat:'퍼팅'},
  {title:'어프로치 웨지 선택',tip:'핀까지 30m 이내는 52도 웨지, 20m 이내는 56도 웨지, 10m 이내는 60도 웨지가 기본입니다. 상황에 따라 조절하세요.',cat:'기술'},
  {title:'라운드 중 수분 섭취',tip:'매 3홀마다 200ml 이상 수분을 섭취하세요. 탈수는 집중력 저하의 주원인입니다. 카페인보다 물이나 스포츠음료가 좋습니다.',cat:'체력'},
  {title:'바람 대처법',tip:'맞바람에서는 클럽을 1~2개 더 긴 것으로 선택하고, 공 위치를 볼 1개 뒤로 놓아 낮은 탄도를 만드세요.',cat:'전략'},
  {title:'임팩트 위치 연습',tip:'하프스윙으로 정확한 임팩트 위치를 익히세요. 풀스윙보다 하프스윙 100번이 실력 향상에 더 효과적입니다.',cat:'스윙'},
  {title:'슬라이스 교정',tip:'그립을 스트롱 그립으로 바꾸고, 다운스윙에서 클럽을 인사이드아웃 궤도로 보내세요. 오른발 앞에서 릴리스하는 느낌을 가지세요.',cat:'기술'},
  {title:'멘탈 관리',tip:'실수한 샷에 연연하지 마세요. 프로도 10번 중 3번은 실수합니다. 다음 샷에 집중하는 프리샷 루틴을 만드세요.',cat:'전략'},
  {title:'라운드 후 복기',tip:'라운드 후 3가지를 기록하세요: 1) 잘한 샷, 2) 아쉬운 샷, 3) 다음에 개선할 점. 이 습관이 실력 향상의 핵심입니다.',cat:'전략'}
];
function showDailyTip(){
  let ov = document.getElementById('sg9TipOv');
  if(!ov){ ov = CE('div','sg9-overlay'); ov.id='sg9TipOv'; ov.setAttribute('role','dialog'); document.body.appendChild(ov); }
  const seed = dateSeed();
  const tipIdx = seed % DAILY_TIPS.length;
  const tip = DAILY_TIPS[tipIdx];
  const catIcons = {스윙:'&#127948;',퍼팅:'&#9971;',기술:'&#127775;',체력:'&#128170;',전략:'&#129504;'};
  ov.innerHTML = `<div class="sg9-modal">
    <button class="sg9-close" onclick="this.closest('.sg9-overlay').classList.remove('active')">&times;</button>
    <h2>&#128161; 오늘의 골프 팁</h2>
    <div style="text-align:center;font-size:13px;color:var(--text-muted,#666);margin-bottom:12px">${today()} | ${tip.cat} ${catIcons[tip.cat]||''}</div>
    <div class="sg9-card">
      <h3>${tip.title}</h3>
      <p style="margin-top:8px">${tip.tip}</p>
    </div>
    <h3 style="font-size:15px;margin:16px 0 8px">모든 팁 목록</h3>
    <div style="max-height:300px;overflow-y:auto">
      ${DAILY_TIPS.map((t,i) => `<div class="sg9-card" style="opacity:${i===tipIdx?1:0.7}">
        <div style="display:flex;justify-content:space-between;align-items:center">
          <h3>${i===tipIdx?'&#127775; ':''} ${t.title}</h3>
          <span class="sg9-badge">${t.cat}</span>
        </div>
        <p style="margin-top:4px">${t.tip}</p>
      </div>`).join('')}
    </div>
  </div>`;
  ov.classList.add('active');
  trackAchievement('tip_viewed');
}

// ─── 5. 연속 출석 시스템 ───
function trackStreak(){
  const data = LS('streak') || { days: [], streak: 0, total: 0, lastDate: '' };
  const td = today();
  if(data.lastDate === td) return data;

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate()-1);
  const yd = yesterday.toISOString().slice(0,10);

  data.streak = (data.lastDate === yd) ? data.streak + 1 : 1;
  data.total = (data.total||0) + 1;
  data.lastDate = td;
  if(!data.days.includes(td)) data.days.push(td);
  if(data.days.length > 30) data.days = data.days.slice(-30);

  SS('streak', data);
  if(data.streak >= 7) trackAchievement('streak_7');
  if(data.streak >= 30) trackAchievement('streak_30');
  if(data.total >= 50) trackAchievement('visits_50');
  playSFX('streak');
  return data;
}
function showStreak(){
  let ov = document.getElementById('sg9StreakOv');
  if(!ov){ ov = CE('div','sg9-overlay'); ov.id='sg9StreakOv'; ov.setAttribute('role','dialog'); document.body.appendChild(ov); }
  const data = LS('streak') || { days:[], streak:0, total:0 };
  const dayNames = ['일','월','화','수','목','금','토'];
  const now = new Date();
  let weekHTML = '';
  for(let i = 6; i >= 0; i--){
    const d = new Date(now);
    d.setDate(d.getDate()-i);
    const ds = d.toISOString().slice(0,10);
    const done = data.days.includes(ds);
    const isToday = i === 0;
    weekHTML += `<div class="sg9-streak-day ${done?'done':''} ${isToday?'today':''}">${dayNames[d.getDay()]}</div>`;
  }
  ov.innerHTML = `<div class="sg9-modal">
    <button class="sg9-close" onclick="this.closest('.sg9-overlay').classList.remove('active')">&times;</button>
    <h2>&#128293; 연속 출석</h2>
    <div style="text-align:center;padding:16px">
      <div style="font-size:48px;font-weight:800;color:var(--accent,#ff6b35)">${data.streak}</div>
      <div style="font-size:14px;color:var(--text-muted,#666)">연속 출석일</div>
    </div>
    <div style="display:flex;justify-content:center"><div class="sg9-streak-bar">${weekHTML}</div></div>
    <div class="sg9-grid2" style="margin-top:16px">
      <div class="sg9-card" style="text-align:center"><h3>${data.total||0}</h3><p>총 방문일</p></div>
      <div class="sg9-card" style="text-align:center"><h3>${data.days.length}</h3><p>최근 30일 출석</p></div>
    </div>
    <div class="sg9-card" style="margin-top:12px">
      <h3>출석 보상</h3>
      <div style="font-size:13px;line-height:1.8">
        <div>${data.streak>=3?'&#9989;':'&#11036;'} 3일 연속: 초보 골퍼</div>
        <div>${data.streak>=7?'&#9989;':'&#11036;'} 7일 연속: 열정 골퍼</div>
        <div>${data.streak>=14?'&#9989;':'&#11036;'} 14일 연속: 골프 매니아</div>
        <div>${data.streak>=30?'&#9989;':'&#11036;'} 30일 연속: 골프 중독자</div>
      </div>
    </div>
  </div>`;
  ov.classList.add('active');
}

// ─── 6. 업적 시스템 30개 ───
const ACHIEVEMENTS = [
  {id:'first_visit',name:'첫 방문',desc:'SmartGolf에 처음 방문',icon:'&#127968;'},
  {id:'handicap_opened',name:'핸디캡 도전',desc:'핸디캡 계산기를 처음 열기',icon:'&#9971;'},
  {id:'round_added',name:'첫 라운드 기록',desc:'핸디캡에 첫 라운드 추가',icon:'&#127948;'},
  {id:'rounds_5',name:'5라운드 달성',desc:'핸디캡 라운드 5개 기록',icon:'&#11088;'},
  {id:'rounds_10',name:'10라운드 달성',desc:'핸디캡 라운드 10개 기록',icon:'&#127942;'},
  {id:'rounds_20',name:'20라운드 마스터',desc:'핸디캡 라운드 20개 완성',icon:'&#127941;'},
  {id:'compare_used',name:'비교 분석가',desc:'코스 1:1 비교 기능 사용',icon:'&#128200;'},
  {id:'quiz_completed',name:'퀴즈 도전자',desc:'골프 퀴즈를 끝까지 풀기',icon:'&#128218;'},
  {id:'quiz_master',name:'퀴즈 고수',desc:'퀴즈 80% 이상 정답',icon:'&#129351;'},
  {id:'quiz_perfect',name:'퀴즈 만점왕',desc:'퀴즈 전문제 정답',icon:'&#128081;'},
  {id:'tip_viewed',name:'팁 탐험가',desc:'오늘의 골프 팁 확인',icon:'&#128161;'},
  {id:'streak_7',name:'7일 연속 출석',desc:'7일 연속으로 방문',icon:'&#128293;'},
  {id:'streak_30',name:'30일 연속 출석',desc:'30일 연속으로 방문',icon:'&#128142;'},
  {id:'visits_50',name:'50회 방문',desc:'총 50회 이상 방문',icon:'&#127775;'},
  {id:'memo_first',name:'첫 메모',desc:'연습 메모를 처음 작성',icon:'&#128221;'},
  {id:'memo_10',name:'메모 10개',desc:'연습 메모 10개 작성',icon:'&#128214;'},
  {id:'share_card',name:'공유 달인',desc:'공유 프로필 카드 생성',icon:'&#128228;'},
  {id:'history_viewed',name:'역사 탐험가',desc:'골프 역사 연표 확인',icon:'&#128205;'},
  {id:'trend_viewed',name:'트렌드 분석가',desc:'스코어 트렌드 차트 확인',icon:'&#128200;'},
  {id:'search_10',name:'탐색가',desc:'코스 검색 10회 이상',icon:'&#128269;'},
  {id:'fav_5',name:'즐겨찾기 5개',desc:'즐겨찾기 5개 이상 등록',icon:'&#10084;'},
  {id:'fav_20',name:'코스 수집가',desc:'즐겨찾기 20개 이상 등록',icon:'&#128155;'},
  {id:'dark_mode',name:'다크모드 사용자',desc:'다크모드를 켜보기',icon:'&#127769;'},
  {id:'keyboard_user',name:'키보드 마스터',desc:'키보드 단축키 사용',icon:'&#9000;'},
  {id:'score_trend_5',name:'5라운드 분석',desc:'스코어 트렌드 5라운드 이상',icon:'&#128202;'},
  {id:'score_under_90',name:'90 이하 달성',desc:'스코어 90 이하 기록',icon:'&#127937;'},
  {id:'score_under_80',name:'80타 클럽',desc:'스코어 80 이하 기록',icon:'&#129352;'},
  {id:'all_features',name:'올라운더',desc:'v9 기능 5종 이상 사용',icon:'&#127380;'},
  {id:'memo_review',name:'복기 마스터',desc:'메모에 &quot;개선점&quot; 포함하여 작성',icon:'&#129504;'},
  {id:'golfer_pro',name:'SmartGolf 프로',desc:'업적 20개 이상 달성',icon:'&#127944;'}
];

function trackAchievement(id){
  const unlocked = LS('achievements') || [];
  if(unlocked.includes(id)) return;
  unlocked.push(id);
  SS('achievements', unlocked);
  const ach = ACHIEVEMENTS.find(a=>a.id===id);
  if(ach){
    playSFX('achievement');
    toast(`${ach.icon} 업적 달성: ${ach.name}`);
  }
  if(unlocked.length >= 5) trackAchievement('all_features');
  if(unlocked.length >= 20) trackAchievement('golfer_pro');
}

function showAchievements(){
  let ov = document.getElementById('sg9AchOv');
  if(!ov){ ov = CE('div','sg9-overlay'); ov.id='sg9AchOv'; ov.setAttribute('role','dialog'); document.body.appendChild(ov); }
  const unlocked = LS('achievements') || [];
  const pct = Math.round(unlocked.length / ACHIEVEMENTS.length * 100);
  ov.innerHTML = `<div class="sg9-modal">
    <button class="sg9-close" onclick="this.closest('.sg9-overlay').classList.remove('active')">&times;</button>
    <h2>&#127942; 업적 컬렉션</h2>
    <div style="text-align:center;margin-bottom:16px">
      <span style="font-size:24px;font-weight:700">${unlocked.length}</span>
      <span style="font-size:14px;color:var(--text-muted,#666)"> / ${ACHIEVEMENTS.length} (${pct}%)</span>
      <div class="sg9-progress"><div class="sg9-progress-fill" style="width:${pct}%"></div></div>
    </div>
    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:10px">
      ${ACHIEVEMENTS.map(a => {
        const done = unlocked.includes(a.id);
        return `<div class="sg9-card" style="opacity:${done?1:0.4};display:flex;align-items:center;gap:12px;padding:12px">
          <span style="font-size:28px">${a.icon}</span>
          <div>
            <div style="font-size:14px;font-weight:600">${a.name}</div>
            <div style="font-size:12px;color:var(--text-muted,#666)">${a.desc}</div>
            ${done?'<span class="sg9-badge gold" style="margin-top:4px">&#9989; 달성</span>':'<span class="sg9-badge locked" style="margin-top:4px">&#128274; 미달성</span>'}
          </div>
        </div>`;
      }).join('')}
    </div>
  </div>`;
  ov.classList.add('active');
}

// ─── 7. 공유 프로필 카드 ───
function showShareCard(){
  let ov = document.getElementById('sg9ShareOv');
  if(!ov){ ov = CE('div','sg9-overlay'); ov.id='sg9ShareOv'; ov.setAttribute('role','dialog'); document.body.appendChild(ov); }

  const rounds = LS('hc_rounds') || [];
  const streak = LS('streak') || { streak:0, total:0 };
  const unlocked = LS('achievements') || [];
  const memos = LS('memos') || [];
  const hcIndex = calcHandicap(rounds);

  ov.innerHTML = `<div class="sg9-modal">
    <button class="sg9-close" onclick="this.closest('.sg9-overlay').classList.remove('active')">&times;</button>
    <h2>&#128228; 공유 프로필 카드</h2>
    <canvas id="sg9ShareCanvas" width="600" height="380" style="width:100%;border-radius:12px;margin-bottom:16px"></canvas>
    <div class="sg9-grid2">
      <button class="sg9-btn" onclick="window.__sg9_downloadCard()">&#128190; PNG 다운로드</button>
      <button class="sg9-btn secondary" onclick="window.__sg9_copyCard()">&#128203; 클립보드 복사</button>
    </div>
  </div>`;
  ov.classList.add('active');

  setTimeout(()=>{
    const canvas = document.getElementById('sg9ShareCanvas');
    if(!canvas) return;
    const ctx = canvas.getContext('2d');

    const grad = ctx.createLinearGradient(0,0,600,380);
    grad.addColorStop(0,'#0f5a28');
    grad.addColorStop(0.5,'#1a7a3a');
    grad.addColorStop(1,'#2e8b57');
    ctx.fillStyle = grad;
    ctx.fillRect(0,0,600,380);

    ctx.fillStyle = 'rgba(255,255,255,0.05)';
    for(let i=0;i<6;i++){
      ctx.beginPath();
      ctx.arc(100+i*100, 50+Math.sin(i)*30, 40+i*5, 0, Math.PI*2);
      ctx.fill();
    }

    ctx.fillStyle = '#fff';
    ctx.font = 'bold 28px system-ui, sans-serif';
    ctx.fillText('SmartGolf', 30, 50);
    ctx.font = '14px system-ui, sans-serif';
    ctx.fillStyle = 'rgba(255,255,255,0.7)';
    ctx.fillText('My Golf Profile Card', 30, 72);

    ctx.fillStyle = 'rgba(255,255,255,0.1)';
    ctx.fillRect(20, 90, 560, 1);

    const stats = [
      ['핸디캡', hcIndex !== null ? hcIndex.toFixed(1) : '--'],
      ['라운드', rounds.length + '회'],
      ['연속출석', streak.streak + '일'],
      ['총방문', (streak.total||0) + '일'],
      ['업적', unlocked.length + '/' + ACHIEVEMENTS.length],
      ['메모', memos.length + '개']
    ];

    stats.forEach((s,i)=>{
      const x = 30 + (i%3) * 190;
      const y = 120 + Math.floor(i/3) * 90;

      ctx.fillStyle = 'rgba(255,255,255,0.1)';
      ctx.beginPath();
      ctx.roundRect(x, y, 170, 70, 10);
      ctx.fill();

      ctx.fillStyle = 'rgba(255,255,255,0.6)';
      ctx.font = '12px system-ui, sans-serif';
      ctx.fillText(s[0], x+15, y+25);

      ctx.fillStyle = '#fff';
      ctx.font = 'bold 22px system-ui, sans-serif';
      ctx.fillText(s[1], x+15, y+52);
    });

    ctx.fillStyle = 'rgba(255,255,255,0.5)';
    ctx.font = '12px system-ui, sans-serif';
    ctx.fillText(today() + ' | SmartGolf v9.0 | PRIME Holdings', 30, 360);

    if(rounds.length > 0){
      const bestScore = Math.min(...rounds.map(r=>r.score));
      ctx.fillStyle = '#ffd700';
      ctx.font = 'bold 14px system-ui, sans-serif';
      ctx.fillText('Best Score: ' + bestScore, 420, 360);
    }
  }, 100);

  playSFX('share');
  trackAchievement('share_card');
}

window.__sg9_downloadCard = function(){
  const canvas = document.getElementById('sg9ShareCanvas');
  if(!canvas) return;
  const a = document.createElement('a');
  a.download = 'smartgolf-profile-'+today()+'.png';
  a.href = canvas.toDataURL('image/png');
  a.click();
};
window.__sg9_copyCard = function(){
  const canvas = document.getElementById('sg9ShareCanvas');
  if(!canvas) return;
  canvas.toBlob(blob=>{
    if(navigator.clipboard && navigator.clipboard.write){
      navigator.clipboard.write([new ClipboardItem({'image/png':blob})]).then(()=>toast('클립보드에 복사되었습니다!')).catch(()=>toast('복사 실패 - PNG 다운로드를 이용해주세요'));
    } else { toast('이 브라우저에서는 클립보드 복사를 지원하지 않습니다'); }
  });
};

// ─── 8. 골프 역사 연표 ───
const GOLF_HISTORY = [
  {year:'1457',title:'스코틀랜드 골프 금지령',desc:'제임스 2세가 군사 훈련을 방해한다는 이유로 골프를 금지했습니다.'},
  {year:'1744',title:'세계 최초 골프 클럽 설립',desc:'에든버러의 The Honourable Company of Edinburgh Golfers가 최초의 공식 골프 클럽으로 설립되었습니다.'},
  {year:'1860',title:'디 오픈 챔피언십 시작',desc:'세계 최초의 메이저 골프 대회가 프레스트윅 골프클럽에서 시작되었습니다.'},
  {year:'1894',title:'USGA 설립',desc:'미국골프협회(USGA)가 설립되어 미국 골프 규칙 표준화가 시작되었습니다.'},
  {year:'1897',title:'한국 최초 골프',desc:'원산에 영국인들이 비공식 골프코스를 만들어 한국에 골프가 처음 전해졌습니다.'},
  {year:'1900',title:'골프 올림픽 종목 채택',desc:'파리 올림픽에서 골프가 정식 종목으로 채택되었습니다 (이후 1904년까지).'},
  {year:'1921',title:'효창원 골프장 개장',desc:'서울 효창원에 한국 최초의 공식 골프장(군자리CC)이 개장했습니다.'},
  {year:'1934',title:'마스터즈 토너먼트 시작',desc:'바비 존스가 오거스타 내셔널에서 마스터즈를 창설했습니다.'},
  {year:'1961',title:'대한골프협회 설립',desc:'KGA가 설립되어 한국 골프의 체계적 발전이 시작되었습니다.'},
  {year:'1988',title:'KLPGA 투어 창설',desc:'한국여자프로골프협회 투어가 공식 출범했습니다.'},
  {year:'1997',title:'타이거 우즈 마스터즈 우승',desc:'21세의 타이거 우즈가 마스터즈에서 12타차 대승, 골프 역사를 바꿨습니다.'},
  {year:'2002',title:'최경주 PGA 투어 우승',desc:'한국 남자 선수 최초로 PGA 투어에서 우승을 차지했습니다.'},
  {year:'2009',title:'신지애 세계랭킹 1위',desc:'한국 여자 골퍼 최초로 세계랭킹 1위에 올랐습니다.'},
  {year:'2016',title:'골프 올림픽 복귀',desc:'112년 만에 리우 올림픽에서 골프가 정식 종목으로 복귀했습니다.'},
  {year:'2020',title:'WHS 통합 핸디캡',desc:'World Handicap System이 전세계 통합 핸디캡 표준으로 시행되었습니다.'}
];
function showHistory(){
  let ov = document.getElementById('sg9HistOv');
  if(!ov){ ov = CE('div','sg9-overlay'); ov.id='sg9HistOv'; ov.setAttribute('role','dialog'); document.body.appendChild(ov); }
  ov.innerHTML = `<div class="sg9-modal">
    <button class="sg9-close" onclick="this.closest('.sg9-overlay').classList.remove('active')">&times;</button>
    <h2>&#128205; 골프 역사 연표</h2>
    <p style="font-size:13px;color:var(--text-muted,#666);margin-bottom:16px">1457년부터 현재까지, 골프의 주요 역사적 순간들</p>
    <div class="sg9-timeline">
      ${GOLF_HISTORY.map(h => `<div class="sg9-tl-item">
        <div class="sg9-tl-year">${h.year}</div>
        <div class="sg9-tl-title">${h.title}</div>
        <div class="sg9-tl-desc">${h.desc}</div>
      </div>`).join('')}
    </div>
  </div>`;
  ov.classList.add('active');
  trackAchievement('history_viewed');
}

// ─── 9. 스코어 트렌드 차트 ───
function showScoreTrend(){
  let ov = document.getElementById('sg9TrendOv');
  if(!ov){ ov = CE('div','sg9-overlay'); ov.id='sg9TrendOv'; ov.setAttribute('role','dialog'); document.body.appendChild(ov); }
  const rounds = LS('hc_rounds') || [];

  ov.innerHTML = `<div class="sg9-modal">
    <button class="sg9-close" onclick="this.closest('.sg9-overlay').classList.remove('active')">&times;</button>
    <h2>&#128200; 스코어 트렌드</h2>
    ${rounds.length < 2 ? '<div class="sg9-card"><p style="text-align:center">핸디캡 계산기에서 2개 이상의 라운드를 기록하면 트렌드를 볼 수 있습니다.</p></div>' : `
    <canvas id="sg9TrendCanvas" width="560" height="280" style="width:100%;border-radius:12px;background:var(--card-bg,#fff);border:1px solid var(--border,#e0e0e0);margin-bottom:16px"></canvas>
    <div class="sg9-grid2">
      <div class="sg9-card" style="text-align:center">
        <h3>평균 스코어</h3>
        <div style="font-size:24px;font-weight:700;color:var(--primary)">${(rounds.reduce((a,r)=>a+r.score,0)/rounds.length).toFixed(1)}</div>
      </div>
      <div class="sg9-card" style="text-align:center">
        <h3>베스트 스코어</h3>
        <div style="font-size:24px;font-weight:700;color:var(--accent)">${Math.min(...rounds.map(r=>r.score))}</div>
      </div>
    </div>
    <div class="sg9-grid2">
      <div class="sg9-card" style="text-align:center">
        <h3>최근 스코어</h3>
        <div style="font-size:24px;font-weight:700">${rounds[0].score}</div>
      </div>
      <div class="sg9-card" style="text-align:center">
        <h3>라운드 수</h3>
        <div style="font-size:24px;font-weight:700">${rounds.length}</div>
      </div>
    </div>
    `}
  </div>`;
  ov.classList.add('active');
  trackAchievement('trend_viewed');
  if(rounds.length >= 5) trackAchievement('score_trend_5');

  if(rounds.length >= 2){
    setTimeout(()=>{
      const canvas = document.getElementById('sg9TrendCanvas');
      if(!canvas) return;
      const ctx = canvas.getContext('2d');
      const W = 560, H = 280, pad = 50;
      const data = [...rounds].reverse();
      const scores = data.map(r=>r.score);
      const minS = Math.min(...scores) - 5;
      const maxS = Math.max(...scores) + 5;
      const rangeS = maxS - minS || 1;

      ctx.clearRect(0,0,W,H);

      ctx.strokeStyle = '#e0e0e0';
      ctx.lineWidth = 0.5;
      for(let i=0;i<=4;i++){
        const y = pad + (H-2*pad) * i/4;
        ctx.beginPath();ctx.moveTo(pad,y);ctx.lineTo(W-20,y);ctx.stroke();
        ctx.fillStyle = '#999';ctx.font = '11px system-ui';
        ctx.fillText(Math.round(maxS - rangeS*i/4), 5, y+4);
      }

      const xStep = (W - pad - 20) / (scores.length - 1 || 1);
      const pts = scores.map((s,i) => ({
        x: pad + i * xStep,
        y: pad + (maxS - s) / rangeS * (H - 2*pad)
      }));

      const grad = ctx.createLinearGradient(0,pad,0,H-pad);
      grad.addColorStop(0,'rgba(26,122,58,0.3)');
      grad.addColorStop(1,'rgba(26,122,58,0.02)');
      ctx.beginPath();
      ctx.moveTo(pts[0].x, H-pad);
      pts.forEach(p=>ctx.lineTo(p.x,p.y));
      ctx.lineTo(pts[pts.length-1].x, H-pad);
      ctx.closePath();
      ctx.fillStyle = grad;
      ctx.fill();

      ctx.beginPath();
      ctx.strokeStyle = '#1a7a3a';
      ctx.lineWidth = 2.5;
      ctx.lineJoin = 'round';
      pts.forEach((p,i)=>{ if(i===0) ctx.moveTo(p.x,p.y); else ctx.lineTo(p.x,p.y); });
      ctx.stroke();

      pts.forEach((p,i)=>{
        ctx.beginPath();
        ctx.fillStyle = scores[i] === Math.min(...scores) ? '#ff6b35' : '#1a7a3a';
        ctx.arc(p.x, p.y, 4, 0, Math.PI*2);
        ctx.fill();
        ctx.fillStyle = '#333';
        ctx.font = '10px system-ui';
        ctx.textAlign = 'center';
        ctx.fillText(scores[i], p.x, p.y - 10);
      });

      ctx.fillStyle = '#666';
      ctx.font = '10px system-ui';
      ctx.textAlign = 'center';
      data.forEach((r,i)=>{
        if(data.length <= 10 || i % Math.ceil(data.length/10) === 0){
          ctx.fillText(r.date.slice(5), pts[i].x, H - 15);
        }
      });

      const bestIdx = scores.indexOf(Math.min(...scores));
      if(rounds.some(r=>r.score<=90)) trackAchievement('score_under_90');
      if(rounds.some(r=>r.score<=80)) trackAchievement('score_under_80');
    }, 150);
  }
}

// ─── 10. 연습 메모 ───
function showMemos(){
  let ov = document.getElementById('sg9MemoOv');
  if(!ov){ ov = CE('div','sg9-overlay'); ov.id='sg9MemoOv'; ov.setAttribute('role','dialog'); document.body.appendChild(ov); }
  const memos = LS('memos') || [];
  const cats = ['전체','라운드','연습','개선점','기타'];
  const filter = LS('memo_filter') || '전체';
  const filtered = filter === '전체' ? memos : memos.filter(m=>m.cat===filter);

  ov.innerHTML = `<div class="sg9-modal">
    <button class="sg9-close" onclick="this.closest('.sg9-overlay').classList.remove('active')">&times;</button>
    <h2>&#128221; 연습 메모</h2>
    <div class="sg9-tabs">${cats.map(c=>`<button class="sg9-tab ${filter===c?'active':''}" onclick="window.__sg9_memoFilter('${c}')">${c}</button>`).join('')}</div>
    <div style="margin-bottom:16px">
      <input class="sg9-input" id="sg9MemoTitle" placeholder="제목 (예: 드라이버 연습)">
      <div style="display:flex;gap:4px;margin-bottom:4px">
        <input class="sg9-input" id="sg9MemoDate" type="date" value="${today()}" style="flex:1">
        <select class="sg9-input" id="sg9MemoCat" style="flex:1">
          <option value="라운드">라운드</option>
          <option value="연습">연습</option>
          <option value="개선점">개선점</option>
          <option value="기타">기타</option>
        </select>
      </div>
      <textarea class="sg9-input" id="sg9MemoBody" placeholder="내용을 입력하세요..." rows="3" style="resize:vertical"></textarea>
      <button class="sg9-btn" onclick="window.__sg9_addMemo()" style="width:100%">메모 추가</button>
    </div>
    <h3 style="font-size:14px;margin-bottom:8px">메모 목록 (${filtered.length}개)</h3>
    <div style="max-height:300px;overflow-y:auto">
      ${filtered.length === 0 ? '<p style="text-align:center;color:var(--text-muted,#666);padding:20px">메모가 없습니다. 첫 메모를 작성해보세요!</p>' :
        filtered.map((m,i) => `<div class="sg9-memo-item">
          <button class="sg9-memo-del" onclick="window.__sg9_delMemo(${memos.indexOf(m)})" title="삭제">&#10005;</button>
          <h4>${m.title} <span class="sg9-badge" style="margin-left:6px">${m.cat}</span></h4>
          <div style="font-size:11px;color:var(--text-muted,#666);margin-bottom:4px">${m.date}</div>
          <p>${m.body}</p>
        </div>`).join('')}
    </div>
  </div>`;
  ov.classList.add('active');
}

window.__sg9_addMemo = function(){
  const title = document.getElementById('sg9MemoTitle').value.trim();
  const date = document.getElementById('sg9MemoDate').value;
  const cat = document.getElementById('sg9MemoCat').value;
  const body = document.getElementById('sg9MemoBody').value.trim();
  if(!title || !body){ toast('제목과 내용을 입력하세요'); return; }
  const memos = LS('memos') || [];
  memos.unshift({ title, date: date||today(), cat, body: body.replace(/</g,'&lt;').replace(/>/g,'&gt;') });
  SS('memos', memos);
  toast('메모가 추가되었습니다!');
  trackAchievement('memo_first');
  if(memos.length >= 10) trackAchievement('memo_10');
  if(body.includes('개선') || cat === '개선점') trackAchievement('memo_review');
  showMemos();
};
window.__sg9_delMemo = function(i){
  const memos = LS('memos') || [];
  memos.splice(i,1);
  SS('memos', memos);
  showMemos();
};
window.__sg9_memoFilter = function(cat){
  SS('memo_filter', cat);
  showMemos();
};

// ─── 퀵 액션 버튼 삽입 ───
function insertQuickActions(){
  const target = document.querySelector('.results-section') || document.querySelector('#cardGrid')?.parentElement;
  if(!target) return;
  const existing = document.getElementById('sg9QuickActions');
  if(existing) return;

  const div = CE('div','');
  div.id = 'sg9QuickActions';
  div.style.cssText = 'display:flex;flex-wrap:wrap;gap:8px;padding:12px 16px;justify-content:center';

  const btns = [
    {label:'&#9971; 핸디캡',fn:'showHandicap'},
    {label:'&#128200; 코스비교',fn:'showCourseCompare'},
    {label:'&#128218; 퀴즈',fn:'showQuiz'},
    {label:'&#128161; 오늘의팁',fn:'showDailyTip'},
    {label:'&#128293; 출석',fn:'showStreak'},
    {label:'&#127942; 업적',fn:'showAchievements'},
    {label:'&#128228; 공유카드',fn:'showShareCard'},
    {label:'&#128205; 역사',fn:'showHistory'},
    {label:'&#128202; 트렌드',fn:'showScoreTrend'},
    {label:'&#128221; 메모',fn:'showMemos'}
  ];

  btns.forEach(b => {
    const btn = CE('button','sg9-btn secondary');
    btn.innerHTML = b.label;
    btn.style.cssText = 'font-size:12px;padding:6px 12px;border-radius:16px;white-space:nowrap';
    btn.onclick = () => window['__sg9_'+b.fn]();
    div.appendChild(btn);
  });

  target.insertBefore(div, target.firstChild);
}

// Global function references
window.__sg9_showHandicap = showHandicap;
window.__sg9_showCourseCompare = showCourseCompare;
window.__sg9_showQuiz = showQuiz;
window.__sg9_showDailyTip = showDailyTip;
window.__sg9_showStreak = showStreak;
window.__sg9_showAchievements = showAchievements;
window.__sg9_showShareCard = showShareCard;
window.__sg9_showHistory = showHistory;
window.__sg9_showScoreTrend = showScoreTrend;
window.__sg9_showMemos = showMemos;

// ─── 키보드 단축키 ───
document.addEventListener('keydown', e => {
  const t = e.target.tagName;
  if(t==='INPUT'||t==='TEXTAREA'||t==='SELECT') return;
  switch(e.key.toUpperCase()){
    case 'H': showHandicap(); break;
    case 'O': showCourseCompare(); break;
    case 'Z': showQuiz(); break;
    case 'X': showDailyTip(); break;
    case 'K': showStreak(); break;
    case 'A': showAchievements(); break;
    case 'V': showShareCard(); break;
    case 'L': showHistory(); break;
    case 'W': showScoreTrend(); break;
    case 'N': showMemos(); break;
  }
  trackAchievement('keyboard_user');
});

// ─── Escape 키로 모달 닫기 ───
document.addEventListener('keydown', e => {
  if(e.key === 'Escape'){
    $$('.sg9-overlay.active').forEach(ov => ov.classList.remove('active'));
  }
});

// ─── 초기화 ───
function init(){
  trackStreak();
  trackAchievement('first_visit');

  const dm = document.querySelector('[onclick*="dark"]') || document.querySelector('.dark-toggle');
  if(dm){
    const origClick = dm.onclick;
    dm.addEventListener('click', () => trackAchievement('dark_mode'));
  }

  insertQuickActions();

  const searchInput = document.querySelector('#searchInput') || document.querySelector('input[type="search"]') || document.querySelector('input[placeholder*="검색"]');
  if(searchInput){
    let searchCount = parseInt(localStorage.getItem('sg_v9_search_count')||'0');
    searchInput.addEventListener('input', ()=>{
      searchCount++;
      localStorage.setItem('sg_v9_search_count', searchCount);
      if(searchCount >= 10) trackAchievement('search_10');
    });
  }

  const checkFavs = () => {
    try {
      const favs = JSON.parse(localStorage.getItem('sg_favorites')||'[]');
      if(favs.length >= 5) trackAchievement('fav_5');
      if(favs.length >= 20) trackAchievement('fav_20');
    } catch(e){}
  };
  setInterval(checkFavs, 10000);
  checkFavs();
}

if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
else init();

})();
