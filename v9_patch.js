// v9_patch.js – SmartGolf v9: WHS핸디캡, 샷통계, 프로레슨, 퀴즈, 캘린더, 업적, 비거리계산기, 일일팁, 코스비교강화, SFX6
(function(){
'use strict';

/* ── CSS ─────────────────────────────────────────────────── */
const style=document.createElement('style');
style.textContent=`
.v9-overlay{position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,.55);z-index:10005;display:flex;align-items:center;justify-content:center;animation:v9fadeIn .25s}
.v9-modal{background:var(--card-bg,#fff);color:var(--text,#333);border-radius:16px;width:94%;max-width:480px;max-height:88vh;overflow-y:auto;padding:20px;position:relative;animation:v9pop .3s}
.v9-modal h2{margin:0 0 14px;font-size:1.25rem;display:flex;align-items:center;gap:8px}
.v9-close{position:absolute;top:12px;right:14px;background:none;border:none;font-size:1.4rem;cursor:pointer;color:var(--text-muted,#999)}
@keyframes v9fadeIn{from{opacity:0}to{opacity:1}}
@keyframes v9pop{from{transform:scale(.9);opacity:0}to{transform:scale(1);opacity:1}}
.v9-tabs{display:flex;gap:6px;margin-bottom:12px;flex-wrap:wrap}
.v9-tab{padding:6px 12px;border-radius:20px;border:1px solid var(--border,#ddd);background:var(--bg,#f5f5f5);cursor:pointer;font-size:.82rem;color:var(--text,#333)}
.v9-tab.active{background:var(--primary,#2d6a4f);color:#fff;border-color:var(--primary,#2d6a4f)}
.v9-card{background:var(--bg,#f5f5f5);border-radius:12px;padding:14px;margin-bottom:10px;border:1px solid var(--border,#ddd)}
.v9-btn{display:inline-block;padding:8px 18px;border-radius:8px;border:none;background:var(--primary,#2d6a4f);color:#fff;cursor:pointer;font-size:.9rem;margin:4px}
.v9-btn:active{opacity:.8}
.v9-btn-outline{background:transparent;border:1px solid var(--primary,#2d6a4f);color:var(--primary,#2d6a4f)}
.v9-input{width:100%;padding:8px 10px;border-radius:8px;border:1px solid var(--border,#ddd);background:var(--card-bg,#fff);color:var(--text,#333);font-size:.9rem;box-sizing:border-box;margin-bottom:8px}
.v9-grid2{display:grid;grid-template-columns:1fr 1fr;gap:8px}
.v9-grid3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px}
.v9-bar{height:18px;border-radius:9px;background:var(--border,#ddd);overflow:hidden;margin:4px 0}
.v9-bar-fill{height:100%;border-radius:9px;background:var(--primary,#2d6a4f);transition:width .4s}
.v9-heatmap{display:grid;grid-template-columns:repeat(7,1fr);gap:3px}
.v9-heat-cell{width:100%;aspect-ratio:1;border-radius:3px;cursor:pointer;position:relative}
.v9-heat-0{background:var(--bg,#ebedf0)}.v9-heat-1{background:#9be9a8}.v9-heat-2{background:#40c463}.v9-heat-3{background:#30a14e}.v9-heat-4{background:#216e39}
.v9-badge{display:flex;align-items:center;gap:10px;padding:10px;border-radius:10px;background:var(--bg,#f5f5f5);border:1px solid var(--border,#ddd);margin-bottom:8px}
.v9-badge.locked{opacity:.45;filter:grayscale(.8)}
.v9-badge-icon{font-size:1.6rem;min-width:36px;text-align:center}
.v9-badge-info{flex:1;font-size:.85rem}
.v9-badge-info strong{display:block;font-size:.92rem}
.v9-toast{position:fixed;bottom:80px;left:50%;transform:translateX(-50%);background:var(--primary,#2d6a4f);color:#fff;padding:12px 22px;border-radius:24px;z-index:10010;animation:v9pop .3s;font-size:.92rem;box-shadow:0 4px 16px rgba(0,0,0,.2)}
.v9-gauge{height:22px;border-radius:11px;background:var(--border,#ddd);position:relative;overflow:hidden;margin:8px 0}
.v9-gauge-fill{height:100%;border-radius:11px;background:linear-gradient(90deg,#40c463,#2d6a4f);transition:width .5s}
.v9-gauge-label{position:absolute;top:0;left:0;right:0;text-align:center;line-height:22px;font-size:.75rem;font-weight:700;color:#fff}
.v9-quiz-opt{display:block;width:100%;text-align:left;padding:12px 14px;margin:6px 0;border-radius:10px;border:1px solid var(--border,#ddd);background:var(--card-bg,#fff);cursor:pointer;font-size:.9rem;color:var(--text,#333);transition:background .2s}
.v9-quiz-opt:hover{background:var(--bg,#f0f0f0)}
.v9-quiz-opt.correct{background:#d4edda;border-color:#40c463}
.v9-quiz-opt.wrong{background:#f8d7da;border-color:#e74c3c}
.v9-compare-row{display:grid;grid-template-columns:1fr 40px 1fr;gap:4px;align-items:center;padding:6px 0;border-bottom:1px solid var(--border,#eee);font-size:.85rem}
.v9-compare-winner{font-weight:700;color:var(--primary,#2d6a4f)}
.v9-tip-banner{background:linear-gradient(135deg,var(--primary,#2d6a4f),#1b4332);color:#fff;border-radius:12px;padding:14px 16px;margin:10px 0;cursor:pointer;animation:v9pop .4s}
.v9-tip-banner small{opacity:.75}
.v9-radar-v9{display:block;margin:0 auto}
.v9-stat-num{font-size:1.6rem;font-weight:700;color:var(--primary,#2d6a4f)}
.v9-lesson-step{display:flex;gap:8px;margin:6px 0;font-size:.88rem}
.v9-lesson-step .num{min-width:24px;height:24px;border-radius:50%;background:var(--primary,#2d6a4f);color:#fff;display:flex;align-items:center;justify-content:center;font-size:.75rem;font-weight:700}
`;
document.head.appendChild(style);

/* ── Helpers ──────────────────────────────────────────────── */
function sg(k,d){try{const v=localStorage.getItem(k);return v?JSON.parse(v):d}catch(e){return d}}
function ss(k,v){localStorage.setItem(k,JSON.stringify(v))}
function $(s,p){return(p||document).querySelector(s)}
function $$(s,p){return[...(p||document).querySelectorAll(s)]}
function el(tag,cls,html){const e=document.createElement(tag);if(cls)e.className=cls;if(html)e.innerHTML=html;return e}
function clamp(v,lo,hi){return Math.max(lo,Math.min(hi,v))}
function fmtDate(d){return d instanceof Date?d.toISOString().slice(0,10):String(d||'')}

function showOverlay(html){
  const ov=el('div','v9-overlay');
  ov.innerHTML=`<div class="v9-modal"><button class="v9-close" aria-label="닫기">&times;</button>${html}</div>`;
  document.body.appendChild(ov);
  const close=()=>{ov.remove()};
  ov.querySelector('.v9-close').onclick=close;
  ov.addEventListener('click',e=>{if(e.target===ov)close()});
  const esc=e=>{if(e.key==='Escape'){close();document.removeEventListener('keydown',esc)}};
  document.addEventListener('keydown',esc);
  return ov;
}

function toast(msg){
  const t=el('div','v9-toast',msg);
  document.body.appendChild(t);
  setTimeout(()=>t.remove(),2800);
}

function drawRadarSVG(axes,vals,size){
  const cx=size/2,cy=size/2,r=size/2-15;
  const n=axes.length;
  const gridLines=[.33,.66,1].map(s=>{
    const pts=axes.map((_,i)=>{
      const a=(Math.PI*2*i/n)-Math.PI/2;
      return`${cx+r*s*Math.cos(a)},${cy+r*s*Math.sin(a)}`;
    }).join(' ');
    return`<polygon points="${pts}" fill="none" stroke="var(--border,#ddd)" stroke-width="${s===1?'1':'.5'}"/>`;
  }).join('');
  const spokes=axes.map((_,i)=>{
    const a=(Math.PI*2*i/n)-Math.PI/2;
    return`<line x1="${cx}" y1="${cy}" x2="${cx+r*Math.cos(a)}" y2="${cy+r*Math.sin(a)}" stroke="var(--border,#ddd)" stroke-width=".5"/>`;
  }).join('');
  const labels=axes.map((lbl,i)=>{
    const a=(Math.PI*2*i/n)-Math.PI/2;
    return`<text x="${cx+(r+12)*Math.cos(a)}" y="${cy+(r+12)*Math.sin(a)}" text-anchor="middle" dominant-baseline="middle" font-size="8" fill="var(--text-muted,#999)">${lbl}</text>`;
  }).join('');
  const dataPts=vals.map((v,i)=>{
    const a=(Math.PI*2*i/n)-Math.PI/2;
    const vr=clamp(v,0,100)/100*r;
    return`${cx+vr*Math.cos(a)},${cy+vr*Math.sin(a)}`;
  }).join(' ');
  return`<svg class="v9-radar-v9" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">${gridLines}${spokes}${labels}<polygon points="${dataPts}" fill="rgba(45,106,79,.25)" stroke="var(--primary,#2d6a4f)" stroke-width="1.5"/></svg>`;
}

/* ── 10. Web Audio SFX v9 ────────────────────────────────── */
const V9SFX={
  _ctx:null,
  _getCtx(){if(!this._ctx)this._ctx=new(window.AudioContext||window.webkitAudioContext)();return this._ctx},
  _tone(freq,dur,type,t){const c=this._getCtx(),o=c.createOscillator(),g=c.createGain();o.type=type||'sine';o.frequency.setValueAtTime(freq,t);g.gain.setValueAtTime(.12,t);g.gain.exponentialRampToValueAtTime(.001,t+dur);o.connect(g);g.connect(c.destination);o.start(t);o.stop(t+dur)},
  quiz_correct(){const c=this._getCtx(),t=c.currentTime;[523,659,784].forEach((f,i)=>this._tone(f,.15,'triangle',t+i*.08))},
  quiz_wrong(){const c=this._getCtx(),t=c.currentTime;this._tone(330,.25,'sawtooth',t);this._tone(262,.3,'sawtooth',t+.12)},
  achievement(){const c=this._getCtx(),t=c.currentTime;[523,659,784,1047].forEach((f,i)=>this._tone(f,.2,'triangle',t+i*.1))},
  calendar(){const c=this._getCtx(),t=c.currentTime;this._tone(880,.06,'sine',t)},
  lesson(){const c=this._getCtx(),t=c.currentTime;this._tone(600,.08,'sine',t);this._tone(800,.06,'sine',t+.06)},
  distance(){const c=this._getCtx(),t=c.currentTime;const o=c.createOscillator(),g=c.createGain();o.type='sine';o.frequency.setValueAtTime(300,t);o.frequency.exponentialRampToValueAtTime(1200,t+.25);g.gain.setValueAtTime(.1,t);g.gain.exponentialRampToValueAtTime(.001,t+.3);o.connect(g);g.connect(c.destination);o.start(t);o.stop(t+.3)}
};

/* ── 1. WHS 핸디캡 시스템 ────────────────────────────────── */
function calcWHS(rounds){
  if(!rounds.length)return{hcIndex:0,diffs:[],best8:[]};
  const diffs=rounds.map(r=>+((113/r.sr)*(r.adjScore-r.cr)).toFixed(1));
  const sorted=[...diffs].sort((a,b)=>a-b);
  // WHS: use count-based table for best differentials
  const countMap={1:1,2:1,3:1,4:1,5:1,6:1,7:2,8:2,9:3,10:3,11:4,12:4,13:5,14:5,15:6,16:6,17:7,18:8,19:8,20:8};
  const useCount=countMap[Math.min(rounds.length,20)]||Math.ceil(rounds.length*.4);
  const best8=sorted.slice(0,useCount);
  const hcIndex=+(best8.reduce((a,b)=>a+b,0)/best8.length).toFixed(1);
  return{hcIndex,diffs,best8};
}

function whsHistoryChart(rounds){
  if(rounds.length<2)return'';
  // SVG line chart of HC Index over time (rolling calc)
  const w=320,h=100,pad=24;
  const pts=[];
  for(let i=0;i<rounds.length;i++){
    const sub=rounds.slice(Math.max(0,i-19),i+1);
    const {hcIndex}=calcWHS(sub);
    pts.push(hcIndex);
  }
  const maxV=Math.max(...pts,1),minV=Math.min(...pts,0);
  const range=maxV-minV||1;
  const coords=pts.map((v,i)=>{
    const x=pad+i/(pts.length-1)*(w-pad*2);
    const y=pad+(1-(v-minV)/range)*(h-pad*2);
    return`${x},${y}`;
  });
  return`<div style="margin:10px 0">
    <div style="font-size:.82rem;font-weight:600;margin-bottom:4px">HC Index 추이</div>
    <svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" style="display:block;width:100%;max-width:${w}px">
      <line x1="${pad}" y1="${h-pad}" x2="${w-pad}" y2="${h-pad}" stroke="var(--border,#ddd)" stroke-width=".5"/>
      <text x="${pad-2}" y="${pad}" font-size="7" fill="var(--text-muted)" text-anchor="end">${maxV}</text>
      <text x="${pad-2}" y="${h-pad}" font-size="7" fill="var(--text-muted)" text-anchor="end">${minV}</text>
      <polyline points="${coords.join(' ')}" fill="none" stroke="var(--primary,#2d6a4f)" stroke-width="2"/>
      ${coords.map((c,i)=>`<circle cx="${c.split(',')[0]}" cy="${c.split(',')[1]}" r="2.5" fill="var(--primary,#2d6a4f)"/>`).join('')}
    </svg>
  </div>`;
}

function openWHS(){
  checkAchievement('whs_start',true);
  const rounds=sg('sg_whs_rounds',[]);
  const {hcIndex,diffs,best8}=calcWHS(rounds);
  const prev=sg('sg_whs_prev_hc',null);
  const trend=prev===null?'':hcIndex<prev?' &#x25BC; improving':hcIndex>prev?' &#x25B2; declining':' &#x2500; stable';
  const trendColor=prev===null?'':hcIndex<prev?'#40c463':hcIndex>prev?'#e74c3c':'var(--text-muted)';
  ss('sg_whs_prev_hc',hcIndex);

  // Per-round differential listing
  const histHtml=rounds.slice(-10).map((r,i)=>{
    const d=+((113/r.sr)*(r.adjScore-r.cr)).toFixed(1);
    const pct=clamp(d/50*100,0,100);
    const isBest=best8.includes(d);
    return`<div style="display:flex;align-items:center;gap:6px;font-size:.82rem;margin:3px 0">
      <span style="min-width:60px">${r.date||''}</span>
      <span style="min-width:28px;font-size:.72rem;color:var(--text-muted)">${r.adjScore}</span>
      <div class="v9-bar" style="flex:1"><div class="v9-bar-fill" style="width:${pct}%;${isBest?'background:#40c463':''}"></div></div>
      <span style="min-width:32px;font-weight:${isBest?'700':'400'}">${d}</span>
    </div>`;
  }).join('');

  const chartHtml=whsHistoryChart(rounds);

  const ov=showOverlay(`
    <h2>&#x1f3cc;&#xfe0f; WHS 핸디캡</h2>
    <div class="v9-grid2" style="margin-bottom:14px">
      <div class="v9-card" style="text-align:center">
        <div style="font-size:.78rem;color:var(--text-muted)">HC Index</div>
        <div class="v9-stat-num">${hcIndex}</div>
        <div style="font-size:.72rem;color:${trendColor}">${trend}</div>
      </div>
      <div class="v9-card" style="text-align:center">
        <div style="font-size:.78rem;color:var(--text-muted)">기록 라운드</div>
        <div class="v9-stat-num">${rounds.length}<small>/20</small></div>
        <div style="font-size:.72rem;color:var(--text-muted)">Best ${best8.length} used</div>
      </div>
    </div>
    ${chartHtml}
    <h3 style="font-size:.95rem;margin-bottom:6px">라운드 추가</h3>
    <div class="v9-grid2">
      <input class="v9-input" id="v9whsCR" type="number" step="0.1" placeholder="Course Rating (72.0)">
      <input class="v9-input" id="v9whsSR" type="number" placeholder="Slope Rating (113)">
    </div>
    <input class="v9-input" id="v9whsScore" type="number" placeholder="Adjusted Gross Score">
    <input class="v9-input" id="v9whsDate" type="date" value="${fmtDate(new Date())}">
    <button class="v9-btn" id="v9whsAdd" style="width:100%">기록 추가</button>
    <h3 style="font-size:.95rem;margin:14px 0 6px">최근 기록 <span style="font-size:.72rem;color:var(--text-muted)">(굵은 글씨 = Best 선정)</span></h3>
    ${histHtml||'<p style="font-size:.85rem;color:var(--text-muted)">아직 기록이 없습니다. CR, SR, 스코어를 입력하세요.</p>'}
    <p style="font-size:.75rem;color:var(--text-muted);margin-top:10px">WHS 공식: Differential = (113 &divide; Slope) &times; (Score &minus; CR)<br>최근 20라운드 중 Best N개 평균</p>
  `);
  ov.querySelector('#v9whsAdd').onclick=()=>{
    const cr=parseFloat(ov.querySelector('#v9whsCR').value);
    const sr=parseFloat(ov.querySelector('#v9whsSR').value);
    const sc=parseFloat(ov.querySelector('#v9whsScore').value);
    const dt=ov.querySelector('#v9whsDate').value||fmtDate(new Date());
    if(!cr||!sr||!sc){toast('CR, SR, Score를 모두 입력하세요');return}
    if(sr<55||sr>155){toast('Slope Rating은 55~155 범위입니다');return}
    rounds.push({cr,sr,adjScore:sc,date:dt});
    if(rounds.length>20)rounds.shift();
    ss('sg_whs_rounds',rounds);
    // Check HC achievements
    const newHC=calcWHS(rounds).hcIndex;
    checkAchievement('hc_30',newHC<=30&&newHC>0);
    checkAchievement('hc_20',newHC<=20&&newHC>0);
    checkAchievement('hc_10',newHC<=10&&newHC>0);
    toast(`기록 추가! Differential: ${((113/sr)*(sc-cr)).toFixed(1)}`);
    ov.remove();openWHS();
  };
}

/* ── 2. 샷 통계 분석 ─────────────────────────────────────── */
function openShotStats(){
  const stats=sg('sg_shot_stats',[]);
  const latest=stats[stats.length-1]||{};
  const avgGIR=stats.length?(stats.reduce((s,r)=>s+r.gir,0)/stats.length).toFixed(1):'-';
  const avgFIR=stats.length?(stats.reduce((s,r)=>s+r.fir,0)/stats.length).toFixed(1):'-';
  const avgPutts=stats.length?(stats.reduce((s,r)=>s+r.putts,0)/stats.length).toFixed(1):'-';
  const avgSand=stats.length?(stats.reduce((s,r)=>s+(r.sand||0),0)/stats.length*100).toFixed(0):'-';
  const avgUpDown=stats.length?(stats.reduce((s,r)=>s+(r.updown||0),0)/stats.length*100).toFixed(0):'-';

  const barChart=stats.slice(-8).map(r=>{
    const girP=(r.gir/18*100).toFixed(0);
    const firP=(r.fir/14*100).toFixed(0);
    return`<div style="display:flex;gap:4px;font-size:.78rem;margin:3px 0"><span style="min-width:50px">${r.date||''}</span><div class="v9-bar" style="flex:1"><div class="v9-bar-fill" style="width:${girP}%;background:#40c463"></div></div><div class="v9-bar" style="flex:1"><div class="v9-bar-fill" style="width:${firP}%;background:#3498db"></div></div></div>`;
  }).join('');

  // Radar SVG via shared helper
  const axes=['GIR','FIR','Putts','Scramble','Score'];
  const vals=[
    avgGIR!=='-'?avgGIR/18*100:0,
    avgFIR!=='-'?avgFIR/14*100:0,
    avgPutts!=='-'?Math.max(0,100-(avgPutts-28)*5):0,
    avgUpDown!=='-'?+avgUpDown:0,
    stats.length?Math.max(0,100-(stats.reduce((s,r)=>s+r.score,0)/stats.length-72)*2):0
  ];
  const radarSvg=drawRadarSVG(axes,vals,150);

  const ov=showOverlay(`
    <h2>&#x1f4ca; 샷 통계 분석</h2>
    ${radarSvg}
    <div class="v9-grid3" style="margin:12px 0;text-align:center">
      <div class="v9-card"><div style="font-size:.72rem;color:var(--text-muted)">GIR</div><div class="v9-stat-num" style="font-size:1.2rem">${avgGIR}<small>/18</small></div></div>
      <div class="v9-card"><div style="font-size:.72rem;color:var(--text-muted)">FIR</div><div class="v9-stat-num" style="font-size:1.2rem">${avgFIR}<small>/14</small></div></div>
      <div class="v9-card"><div style="font-size:.72rem;color:var(--text-muted)">Putts</div><div class="v9-stat-num" style="font-size:1.2rem">${avgPutts}</div></div>
    </div>
    <div class="v9-grid2" style="text-align:center;margin-bottom:12px">
      <div class="v9-card"><div style="font-size:.72rem;color:var(--text-muted)">Sand Save</div><div style="font-size:1.1rem;font-weight:700">${avgSand}%</div></div>
      <div class="v9-card"><div style="font-size:.72rem;color:var(--text-muted)">Up&amp;Down</div><div style="font-size:1.1rem;font-weight:700">${avgUpDown}%</div></div>
    </div>
    <div style="font-size:.78rem;margin-bottom:4px"><span style="color:#40c463">&#x25A0;</span> GIR &nbsp; <span style="color:#3498db">&#x25A0;</span> FIR</div>
    ${barChart||'<p style="font-size:.85rem;color:var(--text-muted)">기록 없음</p>'}
    <h3 style="font-size:.95rem;margin:14px 0 6px">라운드 통계 입력</h3>
    <div class="v9-grid2">
      <input class="v9-input" id="v9sGir" type="number" min="0" max="18" placeholder="GIR (/18)">
      <input class="v9-input" id="v9sFir" type="number" min="0" max="14" placeholder="FIR (/14)">
    </div>
    <div class="v9-grid3">
      <input class="v9-input" id="v9sPutts" type="number" placeholder="퍼트수">
      <input class="v9-input" id="v9sSand" type="number" step="0.01" min="0" max="1" placeholder="Sand%">
      <input class="v9-input" id="v9sUpdown" type="number" step="0.01" min="0" max="1" placeholder="U&amp;D%">
    </div>
    <input class="v9-input" id="v9sScore" type="number" placeholder="총 스코어">
    <button class="v9-btn" id="v9sAdd" style="width:100%">기록 추가</button>
  `);
  ov.querySelector('#v9sAdd').onclick=()=>{
    const gir=+ov.querySelector('#v9sGir').value,fir=+ov.querySelector('#v9sFir').value;
    const putts=+ov.querySelector('#v9sPutts').value,score=+ov.querySelector('#v9sScore').value;
    const sand=+ov.querySelector('#v9sSand').value||0,updown=+ov.querySelector('#v9sUpdown').value||0;
    if(!gir&&!fir&&!putts){toast('통계를 입력하세요');return}
    stats.push({gir,fir,putts,sand,updown,score,date:fmtDate(new Date())});
    ss('sg_shot_stats',stats);
    checkAchievement('stats_entry',true);
    toast('통계 저장!');ov.remove();openShotStats();
  };
}

/* ── 3. 프로 레슨 가이드 ─────────────────────────────────── */
const LESSONS=[
  {title:'그립 (Grip)',icon:'&#x270b;',level:'초급',tips:['인터로킹: 왼손 검지와 오른손 소지를 교차하여 일체감 확보','오버래핑: 오른손 소지를 왼손 위에 올려 안정적 그립','베이스볼: 10개 손가락 모두 사용, 초보자에게 편안','그립 압력은 10점 만점에 4~5, 새가 날아가지 않을 정도']},
  {title:'어드레스 (Address)',icon:'&#x1f9cd;',level:'초급',tips:['양발 어깨 너비로 벌리고 무릎 살짝 굽히기','볼 위치: 드라이버는 왼발 안쪽, 아이언은 중앙','목표선에 양발/어깨/클럽페이스 평행 정렬','체중은 양발 균등 배분, 약간 앞꿈치에 실기']},
  {title:'백스윙 (Backswing)',icon:'&#x1f504;',level:'중급',tips:['테이크어웨이: 손목이 아닌 어깨/몸통으로 시작','손이 허리 높이에서 자연스러운 코킹 시작','상체 90도, 하체 45도 회전이 이상적','왼팔(오른손잡이) 가능한 곧게 유지']},
  {title:'다운스윙 (Downswing)',icon:'&#x26a1;',level:'중급',tips:['하체가 먼저 리드: 왼쪽 힙이 타겟 방향으로 회전','손목 래깅 유지하여 임팩트 직전까지 파워 축적','팔이 아닌 몸의 회전으로 클럽을 끌어내리기','급하게 치지 말고 리듬감 있게 가속']},
  {title:'임팩트 (Impact)',icon:'&#x1f4a5;',level:'고급',tips:['핸드퍼스트: 손이 볼보다 앞서 임팩트','볼 앞쪽 잔디를 깎는 느낌의 다운블로','클럽페이스 스퀘어 유지가 방향의 핵심','체중 70% 이상 왼발로 이동']},
  {title:'팔로스루 (Follow-through)',icon:'&#x1f3af;',level:'중급',tips:['팔을 타겟 방향으로 길게 뻗기','벨트 버클이 타겟을 향하도록 완전 회전','피니시에서 오른발 발끝만 지면에 닿기','3초간 피니시 자세를 유지할 수 있어야 밸런스 OK']},
  {title:'퍼팅 (Putting)',icon:'&#x1f3cc;&#xfe0f;',level:'초급',tips:['역 오버래핑 그립으로 손목 고정','진자 운동: 어깨로만 스트로크','거리감은 백스윙 크기로 조절, 속도 일정','홀 30cm 뒤를 목표로 자신감 있게 스트로크']},
  {title:'어프로치 (Approach)',icon:'&#x26f3;',level:'고급',tips:['피치: 높은 탄도, SW/LW, 그린 위에서 멈추기','칩: 낮은 탄도, 7~9번, 굴려서 홀에 접근','로브: 페이스 활짝 열고 모래 위 치듯 부드럽게','범프앤런: PW로 낮게 쳐서 최대한 굴리기']}
];

function openLesson(){
  V9SFX.lesson();
  let idx=0;
  function render(){
    const l=LESSONS[idx];
    const tipsHtml=l.tips.map((t,i)=>`<div class="v9-lesson-step"><div class="num">${i+1}</div><div>${t}</div></div>`).join('');
    const tabHtml=LESSONS.map((le,i)=>`<button class="v9-tab${i===idx?' active':''}" data-i="${i}">${le.icon}</button>`).join('');
    const lvColor=l.level==='초급'?'#40c463':l.level==='중급'?'#f39c12':'#e74c3c';
    return`
      <h2>${l.icon} ${l.title}</h2>
      <div class="v9-tabs">${tabHtml}</div>
      <div style="margin-bottom:10px"><span style="background:${lvColor};color:#fff;padding:3px 10px;border-radius:12px;font-size:.78rem">${l.level}</span></div>
      <div class="v9-card">${tipsHtml}</div>
      <div style="display:flex;justify-content:space-between;margin-top:10px">
        <button class="v9-btn v9-btn-outline" id="v9lPrev" ${idx===0?'disabled':''}>&larr; 이전</button>
        <span style="font-size:.82rem;color:var(--text-muted)">${idx+1}/${LESSONS.length}</span>
        <button class="v9-btn" id="v9lNext" ${idx===LESSONS.length-1?'disabled':''}>다음 &rarr;</button>
      </div>`;
  }
  const ov=showOverlay(render());
  function bind(){
    const m=ov.querySelector('.v9-modal');
    $$('.v9-tab',m).forEach(t=>t.onclick=()=>{idx=+t.dataset.i;m.innerHTML=`<button class="v9-close">&times;</button>${render()}`;ov.querySelector('.v9-close').onclick=()=>ov.remove();bind()});
    const p=m.querySelector('#v9lPrev'),n=m.querySelector('#v9lNext');
    if(p)p.onclick=()=>{if(idx>0){idx--;m.innerHTML=`<button class="v9-close">&times;</button>${render()}`;ov.querySelector('.v9-close').onclick=()=>ov.remove();bind();V9SFX.lesson()}};
    if(n)n.onclick=()=>{if(idx<LESSONS.length-1){idx++;m.innerHTML=`<button class="v9-close">&times;</button>${render()}`;ov.querySelector('.v9-close').onclick=()=>ov.remove();bind();V9SFX.lesson()}};
  }
  bind();
}

/* ── 4. 골프 지식 퀴즈 ───────────────────────────────────── */
const QUIZZES=[
  {q:'OB 시 적용되는 벌타 수는?',a:['1벌타','2벌타','무벌타','3벌타'],c:0,cat:'규칙'},
  {q:'GIR은 무엇의 약자인가?',a:['Green In Regulation','Great Iron Result','Golf Impact Rate','Ground In Range'],c:0,cat:'용어'},
  {q:'파4 홀에서 이글은 몇 타?',a:['2타','3타','1타','4타'],c:0,cat:'용어'},
  {q:'벙커에서 클럽이 모래에 닿으면?',a:['2벌타','1벌타','무벌타','실격'],c:0,cat:'규칙'},
  {q:'드라이버 일반적 로프트 각도는?',a:['9~12도','15~18도','5~7도','20~25도'],c:0,cat:'장비'},
  {q:'보기(Bogey)는 파 대비?',a:['+1','+2','-1','0'],c:0,cat:'용어'},
  {q:'그린 위에서 다른 볼을 맞히면?',a:['2벌타(스트로크)','무벌타','1벌타','재타'],c:0,cat:'규칙'},
  {q:'페어웨이 우드 중 가장 흔한 번호는?',a:['3번','5번','7번','2번'],c:0,cat:'장비'},
  {q:'핸디캡 계산 시 사용하는 Slope 기준값은?',a:['113','100','120','72'],c:0,cat:'전략'},
  {q:'티잉 구역에서 볼이 떨어지면?',a:['무벌타 재티업','1벌타','2벌타','그대로 플레이'],c:0,cat:'규칙'},
  {q:'알바트로스는 파 대비?',a:['-3','-2','-4','-1'],c:0,cat:'용어'},
  {q:'퍼팅 그린에서 볼 마크를 수리할 수 있는가?',a:['예','아니오','위원회 허가 필요','캐디만 가능'],c:0,cat:'에티켓'},
  {q:'매치 플레이에서 컨시드란?',a:['상대 퍼트 인정','기권 선언','벌타 면제','홀 무효'],c:0,cat:'전략'},
  {q:'56도 웨지는 주로 어떤 용도?',a:['샌드웨지','피칭웨지','갭웨지','로브웨지'],c:0,cat:'장비'},
  {q:'라운드 중 최대 휴대 클럽 수는?',a:['14개','12개','16개','제한없음'],c:0,cat:'규칙'},
  {q:'도그레그 홀이란?',a:['꺾이는 홀','직선 홀','내리막 홀','섬 그린 홀'],c:0,cat:'전략'},
  {q:'스테이블포드 방식에서 파는 몇 점?',a:['2점','1점','3점','0점'],c:0,cat:'전략'},
  {q:'동반자 티샷 시 적절한 위치는?',a:['뒤쪽 측면','바로 옆','앞쪽','어디든 상관없음'],c:0,cat:'에티켓'},
  {q:'FIR의 F는?',a:['Fairway','First','Forward','Fade'],c:0,cat:'용어'},
  {q:'디봇 수리 후 잔디를 다시 덮어야 하는가?',a:['예','아니오','코스마다 다름','캐디 역할'],c:0,cat:'에티켓'}
];

function openQuiz(){
  const cats=['전체','규칙','용어','전략','에티켓','장비'];
  let cat='전체',qi=0,score=0,streak=0,answered=false;
  const filtered=()=>cat==='전체'?QUIZZES:QUIZZES.filter(q=>q.cat===cat);

  function render(){
    const qs=filtered();
    if(qi>=qs.length)return showResult();
    const q=qs[qi];
    const tabH=cats.map(c=>`<button class="v9-tab${c===cat?' active':''}" data-c="${c}">${c}</button>`).join('');
    const optsH=q.a.map((a,i)=>`<button class="v9-quiz-opt" data-i="${i}">${a}</button>`).join('');
    return`<h2>&#x1f9e0; 골프 퀴즈</h2>
      <div class="v9-tabs">${tabH}</div>
      <div style="font-size:.78rem;color:var(--text-muted);margin-bottom:8px">문제 ${qi+1}/${qs.length} &middot; 점수: ${score} &middot; 연속: ${streak}</div>
      <div class="v9-card"><strong>${q.q}</strong></div>
      <div id="v9qOpts">${optsH}</div>`;
  }

  function showResult(){
    const qs=filtered();
    const pct=(score/qs.length*100).toFixed(0);
    const grade=pct>=90?'S':pct>=80?'A':pct>=70?'B':pct>=50?'C':'D';
    const best=sg('sg_quiz_best',0);
    if(score>best)ss('sg_quiz_best',score);
    checkAchievement('quiz_perfect',score===qs.length);
    const m=ov.querySelector('.v9-modal');
    m.innerHTML=`<button class="v9-close">&times;</button>
      <h2>&#x1f3c6; 퀴즈 결과</h2>
      <div style="text-align:center;margin:20px 0">
        <div style="font-size:3rem;font-weight:700">${grade}</div>
        <div class="v9-stat-num">${score}/${qs.length} (${pct}%)</div>
        <div style="font-size:.85rem;margin-top:8px;color:var(--text-muted)">최고기록: ${Math.max(score,best)}</div>
      </div>
      <button class="v9-btn" style="width:100%" id="v9qRetry">다시 도전</button>`;
    ov.querySelector('.v9-close').onclick=()=>ov.remove();
    m.querySelector('#v9qRetry').onclick=()=>{qi=0;score=0;streak=0;answered=false;update()};
  }

  const ov=showOverlay(render());
  function update(){
    const m=ov.querySelector('.v9-modal');
    m.innerHTML=`<button class="v9-close">&times;</button>${render()}`;
    ov.querySelector('.v9-close').onclick=()=>ov.remove();
    bindQuiz();
  }
  function bindQuiz(){
    answered=false;
    $$('.v9-tab',ov).forEach(t=>t.onclick=()=>{cat=t.dataset.c;qi=0;score=0;streak=0;update()});
    $$('.v9-quiz-opt',ov).forEach(btn=>btn.onclick=()=>{
      if(answered)return;answered=true;
      const qs=filtered();const q=qs[qi];const i=+btn.dataset.i;
      if(i===q.c){btn.classList.add('correct');score++;streak++;V9SFX.quiz_correct()}
      else{btn.classList.add('wrong');streak=0;V9SFX.quiz_wrong();ov.querySelectorAll('.v9-quiz-opt')[q.c].classList.add('correct')}
      setTimeout(()=>{qi++;update()},900);
    });
  }
  bindQuiz();
}

/* ── 5. 라운드 캘린더 ────────────────────────────────────── */
function openCalendar(){
  V9SFX.calendar();
  let viewDate=new Date();
  const rounds=sg('sg_round_history',[]);

  function roundsOnDay(y,m,d){
    const ds=`${y}-${String(m+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
    return rounds.filter(r=>(r.date||'').startsWith(ds));
  }

  function render(){
    const y=viewDate.getFullYear(),m=viewDate.getMonth();
    const first=new Date(y,m,1).getDay(),days=new Date(y,m+1,0).getDate();
    const monthRounds=rounds.filter(r=>{const d=r.date||'';return d.startsWith(`${y}-${String(m+1).padStart(2,'0')}`)});
    const avgScore=monthRounds.length?(monthRounds.reduce((s,r)=>s+(r.score||0),0)/monthRounds.length).toFixed(1):'-';
    let cells='<div style="font-size:.7rem;color:var(--text-muted);text-align:center">일</div><div style="font-size:.7rem;color:var(--text-muted);text-align:center">월</div><div style="font-size:.7rem;color:var(--text-muted);text-align:center">화</div><div style="font-size:.7rem;color:var(--text-muted);text-align:center">수</div><div style="font-size:.7rem;color:var(--text-muted);text-align:center">목</div><div style="font-size:.7rem;color:var(--text-muted);text-align:center">금</div><div style="font-size:.7rem;color:var(--text-muted);text-align:center">토</div>';
    for(let i=0;i<first;i++)cells+='<div></div>';
    for(let d=1;d<=days;d++){
      const cnt=roundsOnDay(y,m,d).length;
      const lv=cnt===0?0:cnt===1?1:cnt===2?2:cnt===3?3:4;
      cells+=`<div class="v9-heat-cell v9-heat-${lv}" data-d="${d}" title="${cnt}라운드"><span style="font-size:.65rem;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);color:${lv>1?'#fff':'var(--text,#333)'}">${d}</span></div>`;
    }
    return`<h2>&#x1f4c5; 라운드 캘린더</h2>
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px">
        <button class="v9-btn v9-btn-outline" id="v9cPrev">&larr;</button>
        <strong>${y}년 ${m+1}월</strong>
        <button class="v9-btn v9-btn-outline" id="v9cNext">&rarr;</button>
      </div>
      <div class="v9-heatmap">${cells}</div>
      <div class="v9-grid2" style="margin-top:12px;text-align:center">
        <div class="v9-card"><div style="font-size:.72rem;color:var(--text-muted)">이달 라운드</div><div class="v9-stat-num" style="font-size:1.2rem">${monthRounds.length}</div></div>
        <div class="v9-card"><div style="font-size:.72rem;color:var(--text-muted)">평균 스코어</div><div class="v9-stat-num" style="font-size:1.2rem">${avgScore}</div></div>
      </div>
      ${monthRounds.length>=4?'<div style="font-size:.78rem;color:#40c463;margin-top:4px;text-align:center">&#x2705; 이 달 4회 이상 라운드 달성!</div>':''}
      <h3 style="font-size:.95rem;margin:12px 0 6px">라운드 추가</h3>
      <div class="v9-grid2">
        <input class="v9-input" id="v9calDate" type="date" value="${fmtDate(new Date())}">
        <input class="v9-input" id="v9calScore" type="number" placeholder="스코어">
      </div>
      <input class="v9-input" id="v9calCourse" placeholder="골프장 이름">
      <button class="v9-btn" id="v9calAdd" style="width:100%">라운드 기록</button>
      <div id="v9cDetail" style="margin-top:8px"></div>`;
  }

  const ov=showOverlay(render());
  function refreshCal(){
    ov.querySelector('.v9-modal').innerHTML=`<button class="v9-close">&times;</button>${render()}`;
    ov.querySelector('.v9-close').onclick=()=>ov.remove();
    bind();
  }
  function bind(){
    ov.querySelector('#v9cPrev').onclick=()=>{viewDate.setMonth(viewDate.getMonth()-1);refreshCal()};
    ov.querySelector('#v9cNext').onclick=()=>{viewDate.setMonth(viewDate.getMonth()+1);refreshCal()};
    const addBtn=ov.querySelector('#v9calAdd');
    if(addBtn)addBtn.onclick=()=>{
      const dt=ov.querySelector('#v9calDate').value;
      const sc=+ov.querySelector('#v9calScore').value;
      const crs=ov.querySelector('#v9calCourse').value.trim();
      if(!dt||!sc){toast('날짜와 스코어를 입력하세요');return}
      rounds.push({date:dt,score:sc,course:crs||'미지정'});
      ss('sg_round_history',rounds);
      // Achievement checks
      checkAchievement('first_round',rounds.length>=1);
      checkAchievement('round_10',rounds.length>=10);
      checkAchievement('round_50',rounds.length>=50);
      checkAchievement('best_90',sc<=90);
      checkAchievement('best_80',sc<=80);
      checkAchievement('best_70',sc<=70);
      const y=new Date(dt).getFullYear(),m=new Date(dt).getMonth();
      const mRounds=rounds.filter(r=>(r.date||'').startsWith(`${y}-${String(m+1).padStart(2,'0')}`));
      checkAchievement('calendar_month',mRounds.length>=4);
      toast(`${crs||'라운드'} ${sc}타 기록!`);
      V9SFX.calendar();
      refreshCal();
    };
    $$('.v9-heat-cell',ov).forEach(c=>c.onclick=()=>{
      const d=+c.dataset.d,y=viewDate.getFullYear(),m=viewDate.getMonth();
      const dr=roundsOnDay(y,m,d);
      const det=ov.querySelector('#v9cDetail');
      if(!dr.length){det.innerHTML=`<div class="v9-card" style="font-size:.85rem">${m+1}월 ${d}일 - 라운드 없음</div>`;return}
      det.innerHTML=`<div style="font-size:.82rem;font-weight:600;margin-bottom:4px">${m+1}월 ${d}일 라운드</div>`+dr.map(r=>`<div class="v9-card" style="font-size:.85rem"><strong>${r.course||'골프장'}</strong> - ${r.score||'?'}타</div>`).join('');
      V9SFX.calendar();
    });
  }
  bind();
}

/* ── 6. 업적/배지 시스템 ─────────────────────────────────── */
const ACHIEVEMENTS=[
  {id:'first_round',name:'첫 라운드',desc:'첫 라운드를 기록하세요',icon:'&#x1f3cc;&#xfe0f;',cat:'라운드'},
  {id:'round_10',name:'10라운드 달성',desc:'10라운드를 기록하세요',icon:'&#x1f3af;',cat:'라운드'},
  {id:'round_50',name:'50라운드 마스터',desc:'50라운드를 기록하세요',icon:'&#x1f451;',cat:'라운드'},
  {id:'best_90',name:'90타 브레이크',desc:'90타 이하 달성',icon:'&#x1f947;',cat:'라운드'},
  {id:'best_80',name:'80타 브레이크',desc:'80타 이하 달성',icon:'&#x1f948;',cat:'라운드'},
  {id:'best_70',name:'70타 브레이크',desc:'70타 이하 달성',icon:'&#x1f949;',cat:'라운드'},
  {id:'hc_30',name:'핸디캡 30이하',desc:'HC Index 30 이하 달성',icon:'&#x1f4c9;',cat:'라운드'},
  {id:'hc_20',name:'핸디캡 20이하',desc:'HC Index 20 이하 달성',icon:'&#x1f4ca;',cat:'라운드'},
  {id:'hc_10',name:'싱글 핸디캡',desc:'HC Index 10 이하 달성',icon:'&#x2b50;',cat:'마스터리'},
  {id:'streak_5',name:'5일 연속 접속',desc:'5일 연속 앱 사용',icon:'&#x1f525;',cat:'소셜'},
  {id:'streak_10',name:'10일 연속 접속',desc:'10일 연속 앱 사용',icon:'&#x1f525;',cat:'소셜'},
  {id:'streak_30',name:'30일 연속 접속',desc:'30일 연속 앱 사용',icon:'&#x1f4aa;',cat:'마스터리'},
  {id:'quiz_perfect',name:'퀴즈 만점',desc:'퀴즈에서 만점 받기',icon:'&#x1f4af;',cat:'학습'},
  {id:'lesson_all',name:'레슨 마스터',desc:'모든 레슨 확인',icon:'&#x1f4d6;',cat:'학습'},
  {id:'visit_10',name:'10개 골프장 방문',desc:'10개 골프장 방문 체크',icon:'&#x1f30d;',cat:'소셜'},
  {id:'visit_30',name:'30개 골프장 방문',desc:'30개 골프장 방문 체크',icon:'&#x1f5fa;&#xfe0f;',cat:'마스터리'},
  {id:'first_review',name:'첫 리뷰 작성',desc:'골프장 리뷰를 작성하세요',icon:'&#x270d;&#xfe0f;',cat:'소셜'},
  {id:'share_card',name:'공유왕',desc:'라운드 공유 카드 생성',icon:'&#x1f4e4;',cat:'소셜'},
  {id:'tip_read_10',name:'팁 독서가',desc:'일일 팁 10개 읽기',icon:'&#x1f4d6;',cat:'학습'},
  {id:'tip_read_30',name:'팁 마스터',desc:'일일 팁 30개 읽기',icon:'&#x1f393;',cat:'학습'},
  {id:'fitness_done',name:'워밍업 완료',desc:'피트니스 워밍업 실행',icon:'&#x1f3cb;&#xfe0f;',cat:'연습'},
  {id:'distance_calc',name:'비거리 분석가',desc:'비거리 계산기 사용',icon:'&#x1f4cf;',cat:'연습'},
  {id:'calendar_month',name:'한 달 기록',desc:'한 달간 4회 이상 라운드',icon:'&#x1f4c5;',cat:'라운드'},
  {id:'stats_entry',name:'통계 분석가',desc:'샷 통계 입력',icon:'&#x1f4ca;',cat:'연습'},
  {id:'whs_start',name:'WHS 시작',desc:'WHS 핸디캡 라운드 입력',icon:'&#x1f3cc;&#xfe0f;',cat:'라운드'},
  {id:'compare_course',name:'코스 비교왕',desc:'코스 비교 기능 사용',icon:'&#x2696;&#xfe0f;',cat:'연습'},
  {id:'night_owl',name:'야간 골퍼',desc:'밤 10시 이후 앱 사용',icon:'&#x1f989;',cat:'소셜'},
  {id:'early_bird',name:'얼리버드',desc:'새벽 5시~7시 앱 사용',icon:'&#x1f426;',cat:'소셜'},
  {id:'rule_master',name:'규칙 전문가',desc:'골프룰 25개 모두 확인',icon:'&#x1f4dc;',cat:'학습'},
  {id:'equipment',name:'장비 전문가',desc:'장비추천 기능 사용',icon:'&#x1f3cc;&#xfe0f;',cat:'연습'}
];

function checkAchievement(id,condition){
  if(!condition)return;
  const unlocked=sg('sg_achievements',[]);
  if(unlocked.includes(id))return;
  unlocked.push(id);
  ss('sg_achievements',unlocked);
  const ach=ACHIEVEMENTS.find(a=>a.id===id);
  if(ach){V9SFX.achievement();toast(`&#x1f3c6; 업적 달성: ${ach.name}`);}
}

function openAchievements(){
  const unlocked=sg('sg_achievements',[]);
  const cats=['전체','라운드','학습','연습','소셜','마스터리'];
  let cat='전체';

  function render(){
    const filtered=cat==='전체'?ACHIEVEMENTS:ACHIEVEMENTS.filter(a=>a.cat===cat);
    const tabH=cats.map(c=>`<button class="v9-tab${c===cat?' active':''}" data-c="${c}">${c}</button>`).join('');
    const listH=filtered.map(a=>{
      const done=unlocked.includes(a.id);
      return`<div class="v9-badge${done?'':' locked'}"><div class="v9-badge-icon">${a.icon}</div><div class="v9-badge-info"><strong>${a.name}</strong>${a.desc}<br><span style="font-size:.72rem">${done?'&#x2705; 달성':'&#x1f512; 미달성'}</span></div></div>`;
    }).join('');
    const pct=(unlocked.length/ACHIEVEMENTS.length*100).toFixed(0);
    return`<h2>&#x1f3c6; 업적 (${unlocked.length}/${ACHIEVEMENTS.length})</h2>
      <div class="v9-bar" style="margin-bottom:12px"><div class="v9-bar-fill" style="width:${pct}%"></div></div>
      <div class="v9-tabs">${tabH}</div>
      ${listH}`;
  }

  const ov=showOverlay(render());
  function bind(){
    $$('.v9-tab',ov).forEach(t=>t.onclick=()=>{cat=t.dataset.c;ov.querySelector('.v9-modal').innerHTML=`<button class="v9-close">&times;</button>${render()}`;ov.querySelector('.v9-close').onclick=()=>ov.remove();bind()});
  }
  bind();
}

/* ── 7. 비거리 계산기 ────────────────────────────────────── */
const CLUBS_DIST=[
  {name:'드라이버',avg:220},{name:'3우드',avg:200},{name:'5우드',avg:185},{name:'하이브리드',avg:175},
  {name:'4아이언',avg:165},{name:'5아이언',avg:155},{name:'6아이언',avg:145},{name:'7아이언',avg:135},
  {name:'8아이언',avg:125},{name:'9아이언',avg:115},{name:'PW',avg:105},{name:'GW',avg:90},
  {name:'SW',avg:75},{name:'LW',avg:55}
];

function openDistCalc(){
  V9SFX.distance();
  checkAchievement('distance_calc',true);
  const myDist=sg('sg_my_club_dist',{});

  // Club distance table
  const clubTable=CLUBS_DIST.map(c=>{
    const my=myDist[c.name]||'';
    const pct=clamp((my||c.avg)/300*100,0,100);
    return`<div style="display:flex;align-items:center;gap:6px;font-size:.82rem;margin:3px 0">
      <span style="min-width:68px;font-weight:600">${c.name}</span>
      <div class="v9-gauge" style="flex:1;height:16px;margin:0"><div class="v9-gauge-fill" style="width:${pct}%;height:100%"></div></div>
      <input type="number" class="v9-input v9-club-dist" data-club="${c.name}" value="${my}" placeholder="${c.avg}" style="width:52px;margin:0;padding:4px;text-align:center;font-size:.78rem">
      <span style="font-size:.7rem;color:var(--text-muted);min-width:20px">m</span>
    </div>`;
  }).join('');

  const ov=showOverlay(`
    <h2>&#x1f4cf; 비거리 계산기</h2>
    <label style="font-size:.85rem">목표 거리 (m)</label>
    <input class="v9-input" id="v9dTarget" type="number" placeholder="150">
    <div class="v9-grid2">
      <div><label style="font-size:.85rem">캐리 (m)</label><input class="v9-input" id="v9dCarry" type="number" placeholder="140"></div>
      <div><label style="font-size:.85rem">런 (m)</label><input class="v9-input" id="v9dRun" type="number" placeholder="10"></div>
    </div>
    <div class="v9-grid3">
      <div><label style="font-size:.78rem">바람</label><select class="v9-input" id="v9dWind"><option value="0">없음</option><option value="-10">맞바람(-10%)</option><option value="-15">강한 맞바람(-15%)</option><option value="10">뒷바람(+10%)</option><option value="15">강한 뒷바람(+15%)</option><option value="-5">측풍(-5%)</option></select></div>
      <div><label style="font-size:.78rem">기온</label><select class="v9-input" id="v9dTemp"><option value="0">보통(15~25&#xb0;C)</option><option value="5">한여름(+5%)</option><option value="-5">초겨울(-5%)</option><option value="-8">한겨울(-8%)</option></select></div>
      <div><label style="font-size:.78rem">고도</label><select class="v9-input" id="v9dAlt"><option value="0">평지(0~200m)</option><option value="3">구릉(200~500m)</option><option value="5">고지(500~800m)</option><option value="10">고산(800m+)</option></select></div>
    </div>
    <button class="v9-btn" id="v9dCalc" style="width:100%;margin-top:8px">계산하기</button>
    <div id="v9dResult" style="margin-top:12px"></div>
    <h3 style="font-size:.95rem;margin:16px 0 6px">내 클럽별 비거리</h3>
    <p style="font-size:.75rem;color:var(--text-muted);margin-bottom:8px">개인 비거리를 입력하면 추천 정확도가 올라갑니다.</p>
    ${clubTable}
    <button class="v9-btn v9-btn-outline" id="v9dSave" style="width:100%;margin-top:8px">내 비거리 저장</button>
  `);

  ov.querySelector('#v9dSave').onclick=()=>{
    $$('.v9-club-dist',ov).forEach(inp=>{
      const v=+inp.value;
      if(v>0)myDist[inp.dataset.club]=v;
      else delete myDist[inp.dataset.club];
    });
    ss('sg_my_club_dist',myDist);
    toast('내 클럽 비거리 저장!');
  };

  ov.querySelector('#v9dCalc').onclick=()=>{
    const target=+ov.querySelector('#v9dTarget').value||150;
    const carry=+ov.querySelector('#v9dCarry').value||0;
    const run=+ov.querySelector('#v9dRun').value||0;
    const wind=+ov.querySelector('#v9dWind').value;
    const temp=+ov.querySelector('#v9dTemp').value;
    const alt=+ov.querySelector('#v9dAlt').value;
    const total=carry+run;
    const factor=1+(wind+temp+alt)/100;
    const adjusted=+(total*factor).toFixed(1);
    const effTarget=+(target/factor).toFixed(1);
    // Use personal distances if available, else defaults
    const clubsWithDist=CLUBS_DIST.map(c=>({name:c.name,avg:myDist[c.name]||c.avg}));
    const rec=clubsWithDist.reduce((best,c)=>Math.abs(c.avg-effTarget)<Math.abs(best.avg-effTarget)?c:best,clubsWithDist[0]);
    // Also suggest backup club (next closest)
    const sorted=[...clubsWithDist].sort((a,b)=>Math.abs(a.avg-effTarget)-Math.abs(b.avg-effTarget));
    const backup=sorted[1]||sorted[0];
    const pct=clamp(adjusted/300*100,0,100);
    V9SFX.distance();
    ov.querySelector('#v9dResult').innerHTML=`
      <div class="v9-card">
        <div style="text-align:center;margin-bottom:8px"><span style="font-size:.8rem;color:var(--text-muted)">보정 비거리</span><br><span class="v9-stat-num">${adjusted}m</span></div>
        <div class="v9-gauge"><div class="v9-gauge-fill" style="width:${pct}%"></div><div class="v9-gauge-label">${adjusted}m / 300m</div></div>
        <div style="margin-top:10px;font-size:.88rem"><strong>&#x1f3af; 추천:</strong> ${rec.name} (${rec.avg}m)</div>
        <div style="font-size:.82rem;color:var(--text-muted);margin-top:4px">&#x1f500; 대안: ${backup.name} (${backup.avg}m)</div>
        <div style="font-size:.78rem;color:var(--text-muted);margin-top:8px">
          보정계수: &times;${factor.toFixed(3)}<br>
          바람 ${wind>0?'+':''}${wind}% &middot; 기온 ${temp>0?'+':''}${temp}% &middot; 고도 +${alt}%<br>
          실효 목표거리: ${effTarget}m
        </div>
      </div>`;
  };
}

/* ── 8. 일일 골프 팁 ─────────────────────────────────────── */
const DAILY_TIPS=[
  {tip:'드라이버 티 높이는 볼 반쪽이 클럽 위로 나올 정도로 세팅하세요.',cat:'스윙'},
  {tip:'퍼팅 시 왼눈 바로 아래에 볼이 오도록 어드레스하세요.',cat:'퍼팅'},
  {tip:'그린 주변 어프로치는 가능하면 굴리는 샷을 선택하세요.',cat:'어프로치'},
  {tip:'코스 공략 시 그린 중앙을 목표로 하면 실수가 줄어듭니다.',cat:'전략'},
  {tip:'나쁜 샷 후에는 심호흡 3번, 다음 샷에만 집중하세요.',cat:'멘탈'},
  {tip:'그립은 매 시즌 교체하세요. 미끄러운 그립은 스윙을 망칩니다.',cat:'장비'},
  {tip:'볼 마크는 반드시 수리하세요. 다음 골퍼를 위한 배려입니다.',cat:'에티켓'},
  {tip:'백스윙 시 왼팔을 곧게 펴면 아크가 넓어져 비거리가 늘어납니다.',cat:'스윙'},
  {tip:'긴 퍼트에서는 거리감이 핵심. 홀 1m 원 안에 넣는 연습을 하세요.',cat:'퍼팅'},
  {tip:'벙커샷에서 볼을 직접 치지 말고 볼 뒤 5cm 모래를 치세요.',cat:'어프로치'},
  {tip:'파5 세컨 샷은 무리하지 말고 100m를 남기는 전략이 효과적입니다.',cat:'전략'},
  {tip:'라운드 전날 충분한 수면은 집중력의 기본입니다.',cat:'멘탈'},
  {tip:'볼은 컴프레션 수치를 확인하세요. 스윙 속도에 맞는 볼 선택이 중요합니다.',cat:'장비'},
  {tip:'동반자가 어드레스에 들어가면 움직이거나 말하지 마세요.',cat:'에티켓'},
  {tip:'다운스윙 시작은 반드시 하체부터. 상체가 먼저 돌면 슬라이스가 납니다.',cat:'스윙'},
  {tip:'짧은 퍼트 연습이 가장 효율적인 스코어 단축 방법입니다.',cat:'퍼팅'},
  {tip:'칩샷은 7번 아이언으로 연습을 시작하세요. 일관성이 높습니다.',cat:'어프로치'},
  {tip:'티샷 OB 위험 시 3번 우드나 하이브리드가 안전한 선택입니다.',cat:'전략'},
  {tip:'라운드 중 수분 보충을 규칙적으로 하세요. 탈수는 집중력을 떨어뜨립니다.',cat:'멘탈'},
  {tip:'웨지 바운스 각도를 이해하면 다양한 라이에서 샷 선택이 쉬워집니다.',cat:'장비'},
  {tip:'느린 플레이는 모두에게 불편합니다. 준비 완료 후 바로 스윙하세요.',cat:'에티켓'},
  {tip:'피니시에서 벨트 버클이 타겟을 향하면 회전이 충분한 것입니다.',cat:'스윙'},
  {tip:'퍼팅 라인을 읽을 때 낮은 쪽에서 보면 경사가 더 잘 보입니다.',cat:'퍼팅'},
  {tip:'로브샷은 페이스를 열고 가속하며 스윙하세요. 감속하면 실패합니다.',cat:'어프로치'},
  {tip:'파4에서 보기 이하를 줄이는 것이 싱글 핸디캡의 지름길입니다.',cat:'전략'},
  {tip:'라운드 전 연습 그린에서 스피드 체크 필수. 코스마다 속도가 다릅니다.',cat:'멘탈'},
  {tip:'아이언 샤프트 강도는 스윙 속도에 맞춰야 합니다. 피팅을 받아보세요.',cat:'장비'},
  {tip:'카트 이동 시 페어웨이 진입은 볼 위치 근처에서만 하세요.',cat:'에티켓'},
  {tip:'스윙 템포는 3:1 비율(백스윙:다운스윙)이 이상적입니다.',cat:'스윙'},
  {tip:'오르막 퍼트는 강하게, 내리막은 약하게. 브레이크도 반대로 조절하세요.',cat:'퍼팅'}
];

function openDailyTip(){
  const dayOfYear=Math.floor((Date.now()-new Date(new Date().getFullYear(),0,0))/864e5);
  const tipIdx=dayOfYear%DAILY_TIPS.length;
  const tip=DAILY_TIPS[tipIdx];
  const readSet=new Set(sg('sg_daily_tips_read',[]));
  readSet.add(tipIdx);
  ss('sg_daily_tips_read',[...readSet]);
  checkAchievement('tip_read_10',readSet.size>=10);
  checkAchievement('tip_read_30',readSet.size>=30);

  showOverlay(`
    <h2>&#x1f4a1; 오늘의 골프 팁</h2>
    <div class="v9-card" style="font-size:1rem;line-height:1.6">
      <span style="background:var(--primary,#2d6a4f);color:#fff;padding:2px 10px;border-radius:10px;font-size:.75rem;margin-bottom:8px;display:inline-block">${tip.cat}</span>
      <p style="margin:8px 0 0">${tip.tip}</p>
    </div>
    <div style="font-size:.78rem;color:var(--text-muted);margin-top:6px">&#x1f4d6; 읽은 팁: ${readSet.size}/${DAILY_TIPS.length}</div>
    <button class="v9-btn" style="width:100%;margin-top:12px" onclick="if(navigator.share)navigator.share({title:'SmartGolf 팁',text:'${tip.tip.replace(/'/g,'\\&#39;')}'}).catch(()=>{});">&#x1f4e4; 공유하기</button>
  `);
}

function injectTipBanner(){
  const dayOfYear=Math.floor((Date.now()-new Date(new Date().getFullYear(),0,0))/864e5);
  const tip=DAILY_TIPS[dayOfYear%DAILY_TIPS.length];
  const banner=el('div','v9-tip-banner',`<small>&#x1f4a1; 오늘의 팁</small><br>${tip.tip}`);
  banner.onclick=openDailyTip;
  const container=$('#app')||$('.container')||document.body;
  const first=container.firstElementChild;
  if(first)container.insertBefore(banner,first.nextSibling);
  else container.appendChild(banner);
}

/* ── 9. 코스 비교 강화 ───────────────────────────────────── */
function openCourseCompare(){
  checkAchievement('compare_course',true);
  const courses=window.GOLF_COURSES||window.courses||[];
  const names=courses.map(c=>c.name||c.title||'');

  const ov=showOverlay(`
    <h2>&#x2696;&#xfe0f; 코스 비교</h2>
    <div class="v9-grid2">
      <div><label style="font-size:.82rem">코스 A</label><input class="v9-input" id="v9cmpA" list="v9cmpListA" placeholder="골프장 검색"><datalist id="v9cmpListA">${names.slice(0,100).map(n=>`<option value="${n}">`).join('')}</datalist></div>
      <div><label style="font-size:.82rem">코스 B</label><input class="v9-input" id="v9cmpB" list="v9cmpListB" placeholder="골프장 검색"><datalist id="v9cmpListB">${names.slice(0,100).map(n=>`<option value="${n}">`).join('')}</datalist></div>
    </div>
    <button class="v9-btn" id="v9cmpGo" style="width:100%">비교하기</button>
    <div id="v9cmpResult"></div>
  `);

  ov.querySelector('#v9cmpGo').onclick=()=>{
    const nameA=ov.querySelector('#v9cmpA').value.trim();
    const nameB=ov.querySelector('#v9cmpB').value.trim();
    const a=courses.find(c=>(c.name||c.title||'')===nameA);
    const b=courses.find(c=>(c.name||c.title||'')===nameB);
    if(!a||!b){toast('두 골프장을 선택하세요');return}
    const attrs=[
      {label:'홀 수',key:'holes',get:c=>c.holes||18},
      {label:'파',key:'par',get:c=>c.par||72},
      {label:'거리(m)',key:'distance',get:c=>c.distance||c.length||0},
      {label:'그린피(원)',key:'greenfee',get:c=>c.greenfee||c.price||c.green_fee||0},
      {label:'평점',key:'rating',get:c=>c.rating||c.score||0},
      {label:'난이도',key:'difficulty',get:c=>c.difficulty||3},
      {label:'시설 수준',key:'facilities',get:c=>c.facilities||3},
      {label:'접근성',key:'access',get:c=>c.access||3},
      {label:'경관',key:'scenery',get:c=>c.scenery||c.view||3},
      {label:'코스 관리',key:'maintenance',get:c=>c.maintenance||3},
      {label:'캐디 서비스',key:'caddy',get:c=>c.caddy||3},
      {label:'식당',key:'restaurant',get:c=>c.restaurant||3},
      {label:'주차',key:'parking',get:c=>c.parking||3},
      {label:'연습장',key:'practice',get:c=>c.practice||c.driving_range||3},
      {label:'예약 편의',key:'booking',get:c=>c.booking||3}
    ];
    let aWins=0,bWins=0;
    // For numeric attrs, compute relative bars
    const rows=attrs.map(at=>{
      const va=at.get(a),vb=at.get(b);
      const maxVal=Math.max(va,vb,1);
      const aw=va>vb,bw=vb>va;
      if(aw)aWins++;if(bw)bWins++;
      const pctA=clamp(va/maxVal*100,5,100),pctB=clamp(vb/maxVal*100,5,100);
      return`<div class="v9-compare-row">
        <div>
          <div class="${aw?'v9-compare-winner':''}" style="text-align:right;font-size:.82rem">${va}</div>
          <div class="v9-bar" style="height:6px;margin:2px 0"><div class="v9-bar-fill" style="width:${pctA}%;float:right;${aw?'background:#40c463':''}"></div></div>
        </div>
        <div style="text-align:center;font-size:.72rem;color:var(--text-muted);line-height:1.2">${at.label}</div>
        <div>
          <div class="${bw?'v9-compare-winner':''}" style="font-size:.82rem">${vb}</div>
          <div class="v9-bar" style="height:6px;margin:2px 0"><div class="v9-bar-fill" style="width:${pctB}%;${bw?'background:#40c463':''}"></div></div>
        </div>
      </div>`;
    }).join('');
    const winner=aWins>bWins?nameA:bWins>aWins?nameB:'무승부';
    const aScore=Math.round(aWins/attrs.length*100);
    const bScore=Math.round(bWins/attrs.length*100);

    // Radar comparison for rating-like attrs (5 key axes)
    const radarAxes=['평점','난이도','시설','경관','관리'];
    const radarKeysA=[a.rating||a.score||3,a.difficulty||3,a.facilities||3,a.scenery||a.view||3,a.maintenance||3].map(v=>v/5*100);
    const radarKeysB=[b.rating||b.score||3,b.difficulty||3,b.facilities||3,b.scenery||b.view||3,b.maintenance||3].map(v=>v/5*100);
    const radarA=drawRadarSVG(radarAxes,radarKeysA,140);

    ov.querySelector('#v9cmpResult').innerHTML=`
      <div style="display:flex;justify-content:space-between;margin:14px 0 6px;font-weight:700">
        <span style="color:${aWins>bWins?'var(--primary,#2d6a4f)':'var(--text)'}">${nameA}</span>
        <span style="font-size:.82rem;color:var(--text-muted)">VS</span>
        <span style="color:${bWins>aWins?'var(--primary,#2d6a4f)':'var(--text)'}">${nameB}</span>
      </div>
      ${rows}
      <div class="v9-grid2" style="margin-top:12px;text-align:center">
        <div class="v9-card"><div style="font-size:.72rem">${nameA}</div><div class="v9-stat-num" style="font-size:1.3rem">${aScore}<small>점</small></div></div>
        <div class="v9-card"><div style="font-size:.72rem">${nameB}</div><div class="v9-stat-num" style="font-size:1.3rem">${bScore}<small>점</small></div></div>
      </div>
      <div class="v9-card" style="text-align:center;margin-top:8px">
        <div style="font-size:.78rem;color:var(--text-muted)">종합 추천</div>
        <div class="v9-stat-num" style="font-size:1.1rem">&#x1f3c6; ${winner} (${aWins}:${bWins})</div>
      </div>`;
  };
}

/* ── Quick Action Buttons ────────────────────────────────── */
function injectV9Buttons(){
  const actions=[
    {label:'WHS핸디캡',icon:'&#x1f3cc;&#xfe0f;',fn:openWHS,key:'H'},
    {label:'샷통계',icon:'&#x1f4ca;',fn:openShotStats,key:'S'},
    {label:'프로레슨',icon:'&#x1f4d6;',fn:openLesson,key:'L'},
    {label:'골프퀴즈',icon:'&#x1f9e0;',fn:openQuiz,key:'Q'},
    {label:'캘린더',icon:'&#x1f4c5;',fn:openCalendar,key:'K'},
    {label:'업적',icon:'&#x1f3c6;',fn:openAchievements},
    {label:'비거리',icon:'&#x1f4cf;',fn:openDistCalc},
    {label:'오늘팁',icon:'&#x1f4a1;',fn:openDailyTip},
    {label:'코스비교',icon:'&#x2696;&#xfe0f;',fn:openCourseCompare}
  ];
  const wrap=el('div','',`<div style="display:flex;flex-wrap:wrap;gap:6px;padding:8px 12px;justify-content:center"></div>`);
  const inner=wrap.firstElementChild;
  actions.forEach(a=>{
    const btn=el('button','v9-btn',`${a.icon} ${a.label}`);
    btn.style.cssText='font-size:.78rem;padding:6px 10px;border-radius:20px';
    btn.onclick=a.fn;
    inner.appendChild(btn);
  });
  const container=$('#app')||$('.container')||document.body;
  container.appendChild(wrap);

  // Keyboard shortcuts
  document.addEventListener('keydown',e=>{
    if(e.target.tagName==='INPUT'||e.target.tagName==='TEXTAREA'||e.target.tagName==='SELECT')return;
    if(e.ctrlKey||e.metaKey||e.altKey)return;
    const map={H:openWHS,S:openShotStats,L:openLesson,Q:openQuiz,K:openCalendar};
    const fn=map[e.key.toUpperCase()];
    if(fn){e.preventDefault();fn()}
  });
}

/* ── Login Streak Tracking ───────────────────────────────── */
function trackStreak(){
  const today=new Date().toISOString().slice(0,10);
  const data=sg('sg_streak',{last:'',count:0});
  if(data.last===today)return;
  const yesterday=new Date(Date.now()-864e5).toISOString().slice(0,10);
  if(data.last===yesterday){data.count++;} else {data.count=1;}
  data.last=today;
  ss('sg_streak',data);
  checkAchievement('streak_5',data.count>=5);
  checkAchievement('streak_10',data.count>=10);
  checkAchievement('streak_30',data.count>=30);

  // Time-based achievements
  const hour=new Date().getHours();
  checkAchievement('night_owl',hour>=22);
  checkAchievement('early_bird',hour>=5&&hour<7);
}

/* ── Init ─────────────────────────────────────────────────── */
function v9Init(){
  trackStreak();
  setTimeout(injectTipBanner,500);
  setTimeout(injectV9Buttons,600);
  console.log('[SmartGolf v9] Loaded: WHS, ShotStats, Lessons, Quiz, Calendar, Achievements, DistCalc, DailyTips, CourseCompare, SFX6');
}

if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',v9Init)}
else{v9Init()}

})();
