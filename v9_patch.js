// SmartGolf v9.0 Patch - PRIME Holdings NEXTERA+PRISM
// 핸디측계산기+코스비교+골프퀴즈20문+일일팁+출석시스템+업적30개+공유카드+골프역사연표+스코어트렌드+연습메모
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

// ─── 1. 핸디측 계산기 (WHS 방식) ───
function showHandicap(){
  let ov = document.getElementById('sg9HandicapOv');
  if(!ov){
    ov = CE('div','sg9-overlay');
    ov.id = 'sg9HandicapOv';
    ov.setAttribute('role','dialog');
    ov.setAttribute('aria-label','핸디측 계산기');
    document.body.appendChild(ov);
  }
  const rounds = LS('hc_rounds') || [];
  const hcIndex = calcHandicap(rounds);

  let roundsHTML = '';
  rounds.forEach((r,i) => {
    roundsHTML += `<div class="sg9-compare-row"><span>${r.date}</span><span>${r.course||'코스'}</span><span>스코어: ${r.score}</span><span>CR/SR: ${r.cr}/${r.sr}</span><span style="color:#dc3545;cursor:pointer" onclick="window.__sg9_delRound(${i})">&cross;</span></div>`;
  });

  ov.innerHTML = `<div class="sg9-modal">
    <button class="sg9-close" onclick="this.closest('.sg9-overlay').classList.remove('active')">&times;</button>
    <h2>&#9971; 핸디측 계산기</h2>
    <div class="sg9-card">
      <h3>내 핸디측 인덱스</h3>
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
      <h3>핸디측 등급표</h3>
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

})();
