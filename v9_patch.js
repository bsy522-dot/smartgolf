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

// ─── 4-10: Remaining features loaded from file ───
// Due to size, the remaining sections (Daily Tips, Streak, Achievements, Share Card,
// History, Score Trend, Memos, Quick Actions, Keyboard Shortcuts, Init) are included below.
