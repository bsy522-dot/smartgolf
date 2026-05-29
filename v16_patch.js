(function(){
'use strict';

var css16 = document.createElement('style');
css16.textContent = `
.v16-overlay{position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,.84);z-index:10050;display:none;align-items:center;justify-content:center;backdrop-filter:blur(16px)}
.v16-overlay.active{display:flex}
.v16-modal{background:var(--card-bg,#fff);border-radius:26px;padding:30px;width:96%;max-width:800px;max-height:93vh;overflow-y:auto;box-shadow:0 40px 120px rgba(0,0,0,.65);animation:v16Rise .4s cubic-bezier(.22,1,.36,1)}
@keyframes v16Rise{from{opacity:0;transform:translateY(48px) scale(.92)}to{opacity:1;transform:translateY(0) scale(1)}}
.v16-hdr{display:flex;justify-content:space-between;align-items:center;margin-bottom:20px}
.v16-hdr h2{font-size:22px;font-weight:800;display:flex;align-items:center;gap:10px}
.v16-hdr h2 .v16i{font-size:28px}
.v16-x{background:none;border:none;font-size:28px;cursor:pointer;color:var(--text-muted);padding:4px 10px;border-radius:10px;transition:.2s}
.v16-x:hover{background:var(--border);color:var(--text)}
.v16-tabs{display:flex;gap:6px;margin-bottom:16px;overflow-x:auto;padding-bottom:4px;scrollbar-width:none}
.v16-tabs::-webkit-scrollbar{display:none}
.v16-tab{padding:9px 18px;border-radius:24px;border:1.5px solid var(--border);background:var(--bg);font-size:12px;font-weight:700;cursor:pointer;white-space:nowrap;transition:.25s}
.v16-tab.active{background:var(--primary);color:#fff;border-color:var(--primary);box-shadow:0 3px 14px rgba(26,122,58,.35)}
.v16-card{background:var(--bg);border-radius:16px;padding:18px;margin-bottom:12px;transition:.25s;border:1.5px solid transparent}
.v16-card:hover{border-color:var(--primary);transform:translateY(-2px);box-shadow:0 4px 16px rgba(26,122,58,.12)}
.v16-card h4{font-size:15px;font-weight:700;margin-bottom:8px;display:flex;align-items:center;gap:8px}
.v16-card p{font-size:12px;color:var(--text-muted);line-height:1.7}
.v16-btn{padding:11px 22px;border:none;border-radius:14px;font-size:13px;font-weight:700;cursor:pointer;transition:.25s;display:inline-flex;align-items:center;gap:6px}
.v16-btn-primary{background:linear-gradient(135deg,var(--primary),#34a853);color:#fff}
.v16-btn-primary:hover{transform:translateY(-2px);box-shadow:0 8px 20px rgba(26,122,58,.4)}
.v16-btn-sm{padding:7px 14px;font-size:11px;border-radius:10px}
.v16-btn-secondary{background:var(--bg);color:var(--text);border:1.5px solid var(--border)}
.v16-btn-secondary:hover{border-color:var(--primary);color:var(--primary)}
.v16-input{width:100%;padding:11px 16px;border:2px solid var(--border);border-radius:12px;font-size:13px;background:var(--bg);color:var(--text);transition:.2s}
.v16-input:focus{border-color:var(--primary);outline:none;box-shadow:0 0 0 3px rgba(26,122,58,.1)}
.v16-textarea{width:100%;padding:11px 16px;border:2px solid var(--border);border-radius:12px;font-size:13px;background:var(--bg);color:var(--text);min-height:70px;resize:vertical;font-family:inherit}
.v16-textarea:focus{border-color:var(--primary);outline:none}
.v16-select{padding:9px 14px;border:2px solid var(--border);border-radius:10px;font-size:13px;background:var(--bg);color:var(--text)}
.v16-grid2{display:grid;grid-template-columns:1fr 1fr;gap:12px}
.v16-grid3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px}
@media(max-width:500px){.v16-grid2,.v16-grid3{grid-template-columns:1fr}}
.v16-divider{height:1px;background:var(--border);margin:16px 0}
.v16-badge{display:inline-block;padding:4px 12px;border-radius:14px;font-size:11px;font-weight:700}
.v16-progress{width:100%;height:10px;background:var(--border);border-radius:5px;overflow:hidden;margin:8px 0}
.v16-progress-fill{height:100%;border-radius:5px;transition:width .6s ease}
.v16-stat-row{display:flex;justify-content:space-between;align-items:center;padding:12px 0;border-bottom:1px solid var(--border)}
.v16-stat-row:last-child{border-bottom:none}
.v16-radar-wrap{display:flex;justify-content:center;padding:16px 0}
.v16-match-vs{display:flex;align-items:center;justify-content:center;gap:24px;padding:20px 0}
.v16-match-player{text-align:center;flex:1}
.v16-match-player h3{font-size:18px;font-weight:800;margin-bottom:6px}
.v16-match-score{font-size:42px;font-weight:900;color:var(--primary)}
.v16-match-status{font-size:14px;font-weight:700;margin-top:4px}
.v16-vs{font-size:28px;font-weight:900;color:var(--accent);opacity:.8}
.v16-hole-grid{display:grid;grid-template-columns:repeat(9,1fr);gap:3px;font-size:11px;text-align:center}
.v16-hole-hdr{background:var(--primary);color:#fff;padding:7px 2px;font-weight:700;border-radius:5px}
.v16-hole-cell{background:var(--bg);padding:6px 2px;border-radius:5px;font-weight:600;position:relative}
.v16-hole-win{background:#4caf50!important;color:#fff}
.v16-hole-lose{background:#ff4444!important;color:#fff}
.v16-hole-draw{background:#ffc107!important;color:#333}
.v16-checklist-item{display:flex;align-items:center;gap:12px;padding:14px;background:var(--bg);border-radius:14px;margin-bottom:8px;cursor:pointer;transition:.2s;border-left:4px solid var(--border)}
.v16-checklist-item.checked{border-left-color:var(--primary);opacity:.7}
.v16-checklist-item.checked .v16-check-icon{color:var(--primary)}
.v16-check-icon{font-size:20px;color:var(--text-muted)}
.v16-checklist-text{flex:1}
.v16-checklist-text h5{font-size:13px;font-weight:700;margin-bottom:2px}
.v16-checklist-text p{font-size:11px;color:var(--text-muted)}
.v16-weather-card{background:linear-gradient(135deg,#e3f2fd,#bbdefb);border-radius:16px;padding:20px;margin-bottom:14px}
[data-theme="dark"] .v16-weather-card{background:linear-gradient(135deg,#1a2a3a,#1a3a4a)}
.v16-weather-icon{font-size:36px;margin-bottom:8px}
.v16-weather-tip{font-size:12px;line-height:1.8;color:var(--text-muted)}
.v16-trip-card{background:var(--bg);border-radius:16px;padding:18px;margin-bottom:12px;border:1.5px solid transparent;cursor:pointer;transition:.25s}
.v16-trip-card:hover{border-color:var(--primary);transform:translateY(-2px)}
.v16-trip-card h4{font-size:15px;font-weight:700;margin-bottom:6px;display:flex;align-items:center;gap:8px}
.v16-trip-meta{display:flex;gap:12px;flex-wrap:wrap;margin-top:8px}
.v16-trip-tag{padding:4px 10px;border-radius:10px;font-size:10px;font-weight:600;background:var(--primary-light);color:var(--primary)}
.v16-compare-row{display:grid;grid-template-columns:1fr auto 1fr;gap:10px;align-items:center;padding:12px 0;border-bottom:1px solid var(--border)}
.v16-compare-row:last-child{border-bottom:none}
.v16-compare-label{text-align:center;font-size:11px;font-weight:600;color:var(--text-muted)}
.v16-compare-val{font-size:15px;font-weight:700;text-align:center}
.v16-compare-better{color:var(--primary)}
.v16-compare-worse{color:#999}
`;
document.head.appendChild(css16);

// === SFX Engine ===
var v16Ctx;
function v16SFX(type){
  try{
    if(!v16Ctx)v16Ctx=new(window.AudioContext||window.webkitAudioContext)();
    var o=v16Ctx.createOscillator(),g=v16Ctx.createGain();
    o.connect(g);g.connect(v16Ctx.destination);
    var t=v16Ctx.currentTime;
    var cfgs={
      match_win:{f:880,w:'triangle',a:.2,d:.4},
      match_lose:{f:220,w:'sawtooth',a:.15,d:.5},
      radar:{f:660,w:'sine',a:.12,d:.3},
      checklist:{f:1047,w:'triangle',a:.18,d:.2},
      weather:{f:440,w:'sine',a:.1,d:.35},
      trip:{f:587,w:'triangle',a:.15,d:.3},
      compare:{f:784,w:'sine',a:.12,d:.25},
      iq_correct:{f:988,w:'triangle',a:.2,d:.25},
      iq_wrong:{f:196,w:'sawtooth',a:.12,d:.4},
      hole_win:{f:1175,w:'triangle',a:.18,d:.2},
      navigate:{f:523,w:'sine',a:.1,d:.15},
      achieve:{f:1320,w:'triangle',a:.22,d:.5}
    };
    var c=cfgs[type]||cfgs.navigate;
    o.type=c.w;o.frequency.setValueAtTime(c.f,t);
    g.gain.setValueAtTime(c.a,t);g.gain.exponentialRampToValueAtTime(.001,t+c.d);
    o.start(t);o.stop(t+c.d);
  }catch(e){}
}

// === Storage Helpers ===
function v16Get(k,d){try{var v=localStorage.getItem('sg_v16_'+k);return v?JSON.parse(v):d}catch(e){return d}}
function v16Set(k,v){try{localStorage.setItem('sg_v16_'+k,JSON.stringify(v))}catch(e){}}

// === 1. Match Play Scoring ===
function v16MatchPlay(){
  var ov=document.createElement('div');ov.id='v16MatchOverlay';ov.className='v16-overlay';
  var data=v16Get('matchplay',{matches:[],current:null});

  function render(){
    var cur=data.current;
    var html='<div class="v16-modal"><div class="v16-hdr"><h2><span class="v16i">&#9813;</span> Match Play</h2><button class="v16-x" onclick="document.getElementById(\'v16MatchOverlay\').classList.remove(\'active\')">&times;</button></div>';

    if(!cur){
      html+='<div class="v16-card"><h4>&#127942; New Match Play</h4><p>18홀 매치플레이 스코어링. 홀별 승/패/무를 기록하고 최종 결과를 확인합니다.</p></div>';
      html+='<div class="v16-grid2" style="margin-bottom:16px"><div><label style="font-size:12px;font-weight:600">Player 1</label><input class="v16-input" id="v16MP1" placeholder="내 이름" value="나" style="margin-top:6px"></div>';
      html+='<div><label style="font-size:12px;font-weight:600">Player 2</label><input class="v16-input" id="v16MP2" placeholder="상대 이름" style="margin-top:6px"></div></div>';
      html+='<button class="v16-btn v16-btn-primary" onclick="window._v16StartMatch()">&#9971; 매치 시작</button>';

      if(data.matches.length>0){
        html+='<div class="v16-divider"></div><h4 style="font-size:14px;font-weight:700;margin-bottom:12px">&#128203; 매치 기록 ('+data.matches.length+'건)</h4>';
        data.matches.slice(-5).reverse().forEach(function(m,i){
          var p1w=m.holes.filter(function(h){return h==='p1'}).length;
          var p2w=m.holes.filter(function(h){return h==='p2'}).length;
          var winner=p1w>p2w?m.p1:(p2w>p1w?m.p2:'무승부');
          html+='<div class="v16-card"><h4>'+m.p1+' vs '+m.p2+'</h4><p>'+m.date+' | 결과: <strong>'+winner+'</strong> 승 ('+p1w+':'+p2w+')</p></div>';
        });
      }
    }else{
      var p1w=0,p2w=0;
      cur.holes.forEach(function(h){if(h==='p1')p1w++;else if(h==='p2')p2w++});
      var diff=p1w-p2w;
      var remain=18-cur.holes.length;
      var statusText='';
      if(diff>0)statusText=cur.p1+' '+diff+'UP';
      else if(diff<0)statusText=cur.p2+' '+Math.abs(diff)+'UP';
      else statusText='All Square';

      html+='<div class="v16-match-vs"><div class="v16-match-player"><h3>'+cur.p1+'</h3><div class="v16-match-score">'+p1w+'</div></div>';
      html+='<div class="v16-vs">VS</div>';
      html+='<div class="v16-match-player"><h3>'+cur.p2+'</h3><div class="v16-match-score" style="color:var(--accent)">'+p2w+'</div></div></div>';
      html+='<div style="text-align:center;margin-bottom:16px"><span class="v16-badge" style="background:var(--primary);color:#fff;font-size:14px;padding:8px 20px">'+statusText+'</span>';
      html+='<p style="font-size:12px;color:var(--text-muted);margin-top:8px">'+cur.holes.length+'/18 홀 완료 | 남은 '+remain+' 홀</p></div>';

      html+='<div class="v16-divider"></div>';

      // Front 9
      html+='<h4 style="font-size:13px;font-weight:700;margin-bottom:8px">Front 9</h4>';
      html+='<div class="v16-hole-grid">';
      for(var i=1;i<=9;i++)html+='<div class="v16-hole-hdr">'+i+'</div>';
      for(var i=0;i<9;i++){
        var r=cur.holes[i];
        var cls=r==='p1'?'v16-hole-win':r==='p2'?'v16-hole-lose':r==='draw'?'v16-hole-draw':'';
        var txt=r==='p1'?'W':r==='p2'?'L':r==='draw'?'D':'-';
        html+='<div class="v16-hole-cell '+cls+'">'+txt+'</div>';
      }
      html+='</div>';

      // Back 9
      html+='<h4 style="font-size:13px;font-weight:700;margin:12px 0 8px">Back 9</h4>';
      html+='<div class="v16-hole-grid">';
      for(var i=10;i<=18;i++)html+='<div class="v16-hole-hdr">'+i+'</div>';
      for(var i=9;i<18;i++){
        var r=cur.holes[i];
        var cls=r==='p1'?'v16-hole-win':r==='p2'?'v16-hole-lose':r==='draw'?'v16-hole-draw':'';
        var txt=r==='p1'?'W':r==='p2'?'L':r==='draw'?'D':'-';
        html+='<div class="v16-hole-cell '+cls+'">'+txt+'</div>';
      }
      html+='</div>';

      if(cur.holes.length<18){
        var holeNum=cur.holes.length+1;
        html+='<div class="v16-divider"></div><h4 style="font-size:14px;font-weight:700;margin-bottom:12px">&#9971; Hole '+holeNum+' 결과</h4>';
        html+='<div class="v16-grid3">';
        html+='<button class="v16-btn v16-btn-primary" onclick="window._v16HoleResult(\'p1\')">'+cur.p1+' WIN</button>';
        html+='<button class="v16-btn v16-btn-secondary" onclick="window._v16HoleResult(\'draw\')">Halved</button>';
        html+='<button class="v16-btn" style="background:#ff6b35;color:#fff" onclick="window._v16HoleResult(\'p2\')">'+cur.p2+' WIN</button>';
        html+='</div>';

        if(Math.abs(diff)>remain && remain>0){
          html+='<div style="text-align:center;margin-top:16px"><span class="v16-badge" style="background:#ffc107;color:#333;font-size:13px;padding:8px 20px">&#127942; Match Closed! '+statusText+' ('+Math.abs(diff)+'&amp;'+remain+')</span></div>';
        }
      }else{
        html+='<div class="v16-divider"></div>';
        var winner=diff>0?cur.p1:(diff<0?cur.p2:'');
        if(winner){
          html+='<div style="text-align:center;padding:20px"><div style="font-size:48px;margin-bottom:12px">&#127942;</div><h3 style="font-size:22px;font-weight:800">'+winner+' Wins!</h3><p style="font-size:14px;color:var(--text-muted);margin-top:6px">'+p1w+' : '+p2w+' ('+Math.abs(diff)+'UP)</p></div>';
        }else{
          html+='<div style="text-align:center;padding:20px"><div style="font-size:48px;margin-bottom:12px">&#129309;</div><h3 style="font-size:22px;font-weight:800">All Square - Draw!</h3></div>';
        }
        html+='<button class="v16-btn v16-btn-primary" onclick="window._v16EndMatch()">매치 종료 &amp; 저장</button>';
      }

      html+='<div style="margin-top:12px"><button class="v16-btn v16-btn-secondary v16-btn-sm" onclick="window._v16UndoHole()">&#8617; 마지막 홀 취소</button> ';
      html+='<button class="v16-btn v16-btn-sm" style="background:#ff4444;color:#fff" onclick="window._v16CancelMatch()">매치 포기</button></div>';
    }

    html+='</div>';
    ov.innerHTML=html;
  }

  window._v16StartMatch=function(){
    var p1=document.getElementById('v16MP1').value.trim()||'Player 1';
    var p2=document.getElementById('v16MP2').value.trim()||'Player 2';
    data.current={p1:p1,p2:p2,holes:[],date:new Date().toISOString().slice(0,10)};
    v16Set('matchplay',data);render();v16SFX('navigate');
  };
  window._v16HoleResult=function(r){
    if(!data.current||data.current.holes.length>=18)return;
    data.current.holes.push(r);
    v16Set('matchplay',data);render();
    v16SFX(r==='p1'?'hole_win':r==='p2'?'match_lose':'checklist');
  };
  window._v16UndoHole=function(){
    if(!data.current||data.current.holes.length===0)return;
    data.current.holes.pop();v16Set('matchplay',data);render();
  };
  window._v16EndMatch=function(){
    if(!data.current)return;
    data.matches.push(JSON.parse(JSON.stringify(data.current)));
    data.current=null;v16Set('matchplay',data);render();v16SFX('match_win');
    v16CheckAchieve();
  };
  window._v16CancelMatch=function(){
    data.current=null;v16Set('matchplay',data);render();
  };

  render();
  document.body.appendChild(ov);
}

// === 2. Performance Radar Chart ===
function v16PerformanceRadar(){
  var ov=document.createElement('div');ov.id='v16RadarOverlay';ov.className='v16-overlay';

  var skills=v16Get('radar_skills',{
    driving:50,iron:50,shortgame:50,putting:50,course_mgmt:50,mental:50
  });

  var labels=['&#128165; Driver','&#9971; Iron','&#127945; Short','&#9898; Putting','&#128203; Course','&#129504; Mental'];
  var keys=['driving','iron','shortgame','putting','course_mgmt','mental'];

  function renderRadar(){
    var html='<div class="v16-modal"><div class="v16-hdr"><h2><span class="v16i">&#128200;</span> Performance Radar</h2><button class="v16-x" onclick="document.getElementById(\'v16RadarOverlay\').classList.remove(\'active\')">&times;</button></div>';

    html+='<div class="v16-card"><h4>&#127919; 6축 골프 역량 분석</h4><p>각 영역의 실력을 자가 평가하세요. 슬라이더를 조절하여 현재 레벨을 입력합니다.</p></div>';

    html+='<div class="v16-radar-wrap"><canvas id="v16RadarCanvas" width="360" height="360"></canvas></div>';

    keys.forEach(function(k,i){
      html+='<div class="v16-stat-row"><span style="font-size:13px;font-weight:600">'+labels[i]+'</span>';
      html+='<div style="display:flex;align-items:center;gap:10px"><input type="range" min="0" max="100" value="'+skills[k]+'" style="width:120px" oninput="window._v16UpdateSkill(\''+k+'\',this.value)"><span id="v16Skill_'+k+'" style="font-size:14px;font-weight:700;width:36px;text-align:right">'+skills[k]+'</span></div></div>';
    });

    var avg=Math.round(keys.reduce(function(s,k){return s+skills[k]},0)/6);
    var grade=avg>=90?'S':avg>=80?'A':avg>=70?'B':avg>=60?'C':avg>=50?'D':'F';
    html+='<div class="v16-divider"></div>';
    html+='<div style="text-align:center"><span class="v16-badge" style="background:var(--primary);color:#fff;font-size:16px;padding:10px 24px">Overall: '+avg+' ('+grade+')</span></div>';

    var history=v16Get('radar_history',[]);
    if(history.length>0){
      html+='<div class="v16-divider"></div><h4 style="font-size:14px;font-weight:700;margin-bottom:10px">&#128202; 성장 기록 ('+history.length+'건)</h4>';
      history.slice(-5).reverse().forEach(function(h){
        html+='<div class="v16-card"><p>'+h.date+' | Avg: '+h.avg+' ('+h.grade+')</p></div>';
      });
    }

    html+='<div style="margin-top:16px;display:flex;gap:10px"><button class="v16-btn v16-btn-primary" onclick="window._v16SaveRadar()">&#128190; 기록 저장</button>';
    html+='<button class="v16-btn v16-btn-secondary" onclick="window._v16ResetRadar()">&#128260; 초기화</button></div>';

    html+='</div>';
    ov.innerHTML=html;

    setTimeout(drawRadarChart,100);
  }

  function drawRadarChart(){
    var canvas=document.getElementById('v16RadarCanvas');
    if(!canvas)return;
    var ctx=canvas.getContext('2d');
    var cx=180,cy=180,r=140;
    var n=6;

    ctx.clearRect(0,0,360,360);

    // Grid
    for(var lv=1;lv<=5;lv++){
      ctx.beginPath();
      var gr=r*lv/5;
      for(var i=0;i<=n;i++){
        var angle=Math.PI*2*i/n-Math.PI/2;
        var x=cx+gr*Math.cos(angle);
        var y=cy+gr*Math.sin(angle);
        if(i===0)ctx.moveTo(x,y);else ctx.lineTo(x,y);
      }
      ctx.closePath();
      ctx.strokeStyle='rgba(26,122,58,0.15)';ctx.lineWidth=1;ctx.stroke();
    }

    // Axes
    for(var i=0;i<n;i++){
      var angle=Math.PI*2*i/n-Math.PI/2;
      ctx.beginPath();ctx.moveTo(cx,cy);
      ctx.lineTo(cx+r*Math.cos(angle),cy+r*Math.sin(angle));
      ctx.strokeStyle='rgba(26,122,58,0.25)';ctx.stroke();
    }

    // Data fill
    ctx.beginPath();
    var labelsClean=['Driver','Iron','Short','Putting','Course','Mental'];
    keys.forEach(function(k,i){
      var val=skills[k]/100;
      var angle=Math.PI*2*i/n-Math.PI/2;
      var x=cx+r*val*Math.cos(angle);
      var y=cy+r*val*Math.sin(angle);
      if(i===0)ctx.moveTo(x,y);else ctx.lineTo(x,y);
    });
    ctx.closePath();
    ctx.fillStyle='rgba(26,122,58,0.25)';ctx.fill();
    ctx.strokeStyle='#1a7a3a';ctx.lineWidth=2.5;ctx.stroke();

    // Data points
    keys.forEach(function(k,i){
      var val=skills[k]/100;
      var angle=Math.PI*2*i/n-Math.PI/2;
      var x=cx+r*val*Math.cos(angle);
      var y=cy+r*val*Math.sin(angle);
      ctx.beginPath();ctx.arc(x,y,5,0,Math.PI*2);
      ctx.fillStyle='#1a7a3a';ctx.fill();
      ctx.strokeStyle='#fff';ctx.lineWidth=2;ctx.stroke();
    });

    // Labels
    ctx.font='bold 12px sans-serif';ctx.fillStyle=getComputedStyle(document.body).getPropertyValue('color')||'#1a1a1a';
    ctx.textAlign='center';
    labelsClean.forEach(function(lb,i){
      var angle=Math.PI*2*i/n-Math.PI/2;
      var x=cx+(r+22)*Math.cos(angle);
      var y=cy+(r+22)*Math.sin(angle);
      ctx.fillText(lb+' '+skills[keys[i]],x,y+4);
    });
  }

  window._v16UpdateSkill=function(k,v){
    skills[k]=parseInt(v);
    v16Set('radar_skills',skills);
    var el=document.getElementById('v16Skill_'+k);if(el)el.textContent=v;
    drawRadarChart();
  };

  window._v16SaveRadar=function(){
    var avg=Math.round(keys.reduce(function(s,k){return s+skills[k]},0)/6);
    var grade=avg>=90?'S':avg>=80?'A':avg>=70?'B':avg>=60?'C':avg>=50?'D':'F';
    var history=v16Get('radar_history',[]);
    history.push({date:new Date().toISOString().slice(0,10),skills:JSON.parse(JSON.stringify(skills)),avg:avg,grade:grade});
    v16Set('radar_history',history);
    renderRadar();v16SFX('radar');v16CheckAchieve();
  };

  window._v16ResetRadar=function(){
    keys.forEach(function(k){skills[k]=50});
    v16Set('radar_skills',skills);renderRadar();
  };

  renderRadar();
  document.body.appendChild(ov);
}

// === 3. Pre-Shot Routine Checklist ===
function v16ShotChecklist(){
  var ov=document.createElement('div');ov.id='v16CheckOverlay';ov.className='v16-overlay';

  var defaultItems=[
    {id:'c1',title:'&#127919; 목표 설정',desc:'목표 지점과 낙하 지점을 명확히 선정',cat:'aim'},
    {id:'c2',title:'&#127788; 바람 확인',desc:'깃발, 나뭇잎으로 풍향/풍속 파악',cat:'env'},
    {id:'c3',title:'&#128270; 라이 확인',desc:'볼 위치의 잔디 상태와 경사 확인',cat:'env'},
    {id:'c4',title:'&#127992; 클럽 선택',desc:'거리, 바람, 라이를 고려한 최적 클럽',cat:'club'},
    {id:'c5',title:'&#129504; 샷 시각화',desc:'이상적인 탄도와 착지 지점을 그려봄',cat:'mental'},
    {id:'c6',title:'&#128170; 연습 스윙',desc:'의도한 스윙을 1-2회 예행연습',cat:'swing'},
    {id:'c7',title:'&#9981; 얼라인먼트',desc:'클럽페이스 → 발 → 어깨 순서로 정렬',cat:'setup'},
    {id:'c8',title:'&#128002; 그립 체크',desc:'그립 압력 5/10 유지, 중립 그립',cat:'setup'},
    {id:'c9',title:'&#129406; 스탠스 확인',desc:'볼 포지션, 체중 배분, 무릎 플렉스',cat:'setup'},
    {id:'c10',title:'&#128168; 호흡',desc:'깊게 숨쉬고 긴장 풀기',cat:'mental'},
    {id:'c11',title:'&#9201; 리듬 카운트',desc:'백스윙 &quot;하나&quot;, 다운스윙 &quot;둘&quot;',cat:'swing'},
    {id:'c12',title:'&#128640; 커밋 &amp; 스윙',desc:'결정했으면 의심 없이 실행',cat:'swing'}
  ];

  var checked=v16Get('checklist_done',{});
  var usageCount=v16Get('checklist_usage',0);

  function render(){
    var cats=[
      {key:'all',label:'&#128203; All'},
      {key:'aim',label:'&#127919; Aim'},
      {key:'env',label:'&#127788; Env'},
      {key:'club',label:'&#127992; Club'},
      {key:'mental',label:'&#129504; Mental'},
      {key:'setup',label:'&#9981; Setup'},
      {key:'swing',label:'&#128170; Swing'}
    ];
    var activeTab=v16Get('checklist_tab','all');

    var html='<div class="v16-modal"><div class="v16-hdr"><h2><span class="v16i">&#128203;</span> Pre-Shot Routine</h2><button class="v16-x" onclick="document.getElementById(\'v16CheckOverlay\').classList.remove(\'active\')">&times;</button></div>';

    html+='<div class="v16-card"><h4>&#127942; 프리샷 루틴 체크리스트</h4><p>매 샷 전 12단계 루틴을 수행하세요. 일관된 루틴이 안정적인 스코어의 핵심입니다.</p>';
    html+='<p style="margin-top:6px">총 사용: <strong>'+usageCount+'회</strong></p></div>';

    html+='<div class="v16-tabs">';
    cats.forEach(function(c){
      html+='<button class="v16-tab'+(activeTab===c.key?' active':'')+'" onclick="window._v16CheckTab(\''+c.key+'\')">'+c.label+'</button>';
    });
    html+='</div>';

    var checkedCount=Object.keys(checked).length;
    html+='<div class="v16-progress"><div class="v16-progress-fill" style="width:'+Math.round(checkedCount/12*100)+'%;background:linear-gradient(90deg,var(--primary),#34a853)"></div></div>';
    html+='<p style="font-size:11px;color:var(--text-muted);margin-bottom:14px;text-align:center">'+checkedCount+'/12 완료 ('+Math.round(checkedCount/12*100)+'%)</p>';

    var filtered=activeTab==='all'?defaultItems:defaultItems.filter(function(it){return it.cat===activeTab});
    filtered.forEach(function(it){
      var isDone=checked[it.id];
      html+='<div class="v16-checklist-item'+(isDone?' checked':'')+'" onclick="window._v16ToggleCheck(\''+it.id+'\')">';
      html+='<span class="v16-check-icon">'+(isDone?'&#9745;':'&#9744;')+'</span>';
      html+='<div class="v16-checklist-text"><h5>'+it.title+'</h5><p>'+it.desc+'</p></div></div>';
    });

    if(checkedCount===12){
      html+='<div style="text-align:center;padding:16px"><span class="v16-badge" style="background:#4caf50;color:#fff;font-size:14px;padding:8px 20px">&#10004; 루틴 완료! 자신감 있게 스윙하세요</span></div>';
    }

    html+='<div style="margin-top:14px;display:flex;gap:10px"><button class="v16-btn v16-btn-primary" onclick="window._v16ResetChecklist()">&#128260; 초기화 (다음 샷)</button></div>';

    html+='</div>';
    ov.innerHTML=html;
  }

  window._v16ToggleCheck=function(id){
    if(checked[id])delete checked[id];else checked[id]=true;
    v16Set('checklist_done',checked);render();v16SFX('checklist');
    if(Object.keys(checked).length===12){
      usageCount++;v16Set('checklist_usage',usageCount);v16CheckAchieve();
    }
  };
  window._v16CheckTab=function(tab){v16Set('checklist_tab',tab);render()};
  window._v16ResetChecklist=function(){checked={};v16Set('checklist_done',checked);render()};

  render();
  document.body.appendChild(ov);
}

// === 4. Weather Strategy Advisor ===
function v16WeatherStrategy(){
  var ov=document.createElement('div');ov.id='v16WeatherOverlay';ov.className='v16-overlay';

  var strategies=[
    {condition:'&#9728;&#65039; 맑은 날 (무풍)',icon:'&#9728;&#65039;',tips:['정상 클럽 선택으로 플레이','그린이 빠를 수 있으니 어프로치 주의','자외선 차단 필수','수분 섭취 30분마다 권장','그림자 방향 참고하여 그린 리딩'],bg:'linear-gradient(135deg,#fff3e0,#ffe0b2)'},
    {condition:'&#127744; 바람 부는 날',icon:'&#127744;',tips:['맞바람: 1-2클럽 더 잡기','뒷바람: 1클럽 줄이기, 높이 주의','옆바람: 바람 방향 반대로 에이밍','펀치샷으로 탄도 낮추기','3/4 스윙으로 스핀 줄이기','티 높이를 낮추어 드라이버 탄도 조절'],bg:'linear-gradient(135deg,#e3f2fd,#bbdefb)'},
    {condition:'&#127782;&#65039; 비 오는 날',icon:'&#127782;&#65039;',tips:['그립 타올로 자주 닦기','웨지 그루브 청소 필수','클럽 1-2개 더 잡기 (비거리 감소)','퍼팅 강하게 - 그린 느려짐','방수 장갑 교체용 준비','우산 뒤집히지 않게 주의','볼 마크 자주 사용 (진흙)'],bg:'linear-gradient(135deg,#eceff1,#cfd8dc)'},
    {condition:'&#10052;&#65039; 추운 날 (10도 이하)',icon:'&#10052;&#65039;',tips:['볼이 안 날아감 - 1-2클럽 더','핸드워머 준비 필수','충분한 스트레칭 (근육 경직)','레이어드 복장 (움직임 확보)','그린 딱딱함 - 런 고려','배터리 보온 (카트/거리측정기)'],bg:'linear-gradient(135deg,#e8eaf6,#c5cae9)'},
    {condition:'&#127787;&#65039; 더운 날 (30도 이상)',icon:'&#127787;&#65039;',tips:['물 2L 이상 준비','15분마다 수분 섭취','모자 + 선크림 필수','시원한 타올 목에 착용','집중력 저하 주의 - 루틴 엄수','볼이 멀리 날아감 - 클럽 조절','열사병 증상 시 즉시 중단'],bg:'linear-gradient(135deg,#fce4ec,#f8bbd0)'},
    {condition:'&#127787;&#65039; 안개 낀 날',icon:'&#127787;&#65039;',tips:['거리감 떨어짐 - GPS 거리측정기 필수','밝은 색 볼 사용','전방 캐디/동반자 확인 후 샷','클럽 길이별 비거리 숙지','아이언 위주 안전한 플레이','안개 걷힐 때까지 티오프 대기 고려'],bg:'linear-gradient(135deg,#f3e5f5,#e1bee7)'}
  ];

  function render(){
    var html='<div class="v16-modal"><div class="v16-hdr"><h2><span class="v16i">&#127780;</span> Weather Strategy</h2><button class="v16-x" onclick="document.getElementById(\'v16WeatherOverlay\').classList.remove(\'active\')">&times;</button></div>';

    html+='<div class="v16-card"><h4>&#127780; 날씨별 라운드 전략</h4><p>날씨 조건에 따른 최적의 플레이 전략을 확인하세요. 프로 골퍼들의 날씨 대응법을 참고합니다.</p></div>';

    strategies.forEach(function(s){
      html+='<div class="v16-weather-card" style="background:'+s.bg+'">';
      html+='<div class="v16-weather-icon">'+s.icon+'</div>';
      html+='<h4 style="font-size:15px;font-weight:700;margin-bottom:10px">'+s.condition+'</h4>';
      html+='<div class="v16-weather-tip">';
      s.tips.forEach(function(tip){
        html+='&#8226; '+tip+'<br>';
      });
      html+='</div></div>';
    });

    html+='</div>';
    ov.innerHTML=html;
  }

  render();
  document.body.appendChild(ov);
}

// === 5. Golf Trip Planner ===
function v16TripPlanner(){
  var ov=document.createElement('div');ov.id='v16TripOverlay';ov.className='v16-overlay';

  var destinations=[
    {name:'&#127468;&#127468; 제주도 골프 여행',region:'제주',courses:['핀크스GC','나인브릿지','해비치CC','제주CC','클럽나인브릿지'],days:'2박3일',budget:'80~150만원',season:'봄/가을 추천',highlights:['바다뷰 코스','현무암 지형','흑돼지 맛집','한라산 트레킹'],rating:5},
    {name:'&#127468;&#127468; 강원도 골프 여행',region:'강원',courses:['파인밸리CC','베어즈베스트','알펜시아CC','프라자CC','레이크힐스CC'],days:'1박2일',budget:'50~90만원',season:'여름 추천',highlights:['산악 코스','시원한 기후','강원도 먹거리','스키장 인근'],rating:4},
    {name:'&#127468;&#127468; 경주 골프 여행',region:'경주',courses:['골드CC','보문CC','현대경주CC','블루원CC','코오롱CC'],days:'1박2일',budget:'40~70만원',season:'봄/가을 추천',highlights:['유적지 관광','한우 맛집','불국사','보문단지'],rating:4},
    {name:'&#127471;&#127477; 일본 골프 여행',region:'일본',courses:['카와나호텔GC','가루이자와72','오사카GC','규슈GC','오키나와CC'],days:'3박4일',budget:'150~250만원',season:'봄(벚꽃)/가을 추천',highlights:['온천 료칸','일식 코스','쇼핑','벚꽃 코스'],rating:5},
    {name:'&#127481;&#127469; 태국 골프 여행',region:'태국',courses:['알파인GC','싸이암CC','방콕GC','파타야CC','치앙마이하이랜즈'],days:'4박5일',budget:'100~180만원',season:'11~2월 건기 추천',highlights:['저렴한 그린피','캐디 서비스','태국 요리','마사지'],rating:5},
    {name:'&#127468;&#127468; 충청도 골프 여행',region:'충청',courses:['세종밸리CC','천안상록CC','공주CC','아산스파비스CC','대전CC'],days:'당일~1박',budget:'30~50만원',season:'연중',highlights:['수도권 접근성','온천 스파','한정식','유적지'],rating:3}
  ];

  var trips=v16Get('trips',[]);

  function render(){
    var html='<div class="v16-modal"><div class="v16-hdr"><h2><span class="v16i">&#9992;&#65039;</span> Golf Trip Planner</h2><button class="v16-x" onclick="document.getElementById(\'v16TripOverlay\').classList.remove(\'active\')">&times;</button></div>';

    html+='<div class="v16-card"><h4>&#127758; 골프 여행 플래너</h4><p>추천 골프 여행지를 확인하고 나만의 여행 계획을 세워보세요.</p></div>';

    // tabs
    var tabs=['&#127758; 추천지','&#128203; 내 여행'];
    var activeTab=v16Get('trip_tab',0);
    html+='<div class="v16-tabs">';
    tabs.forEach(function(t,i){
      html+='<button class="v16-tab'+(activeTab===i?' active':'')+'" onclick="window._v16TripTab('+i+')">'+t+'</button>';
    });
    html+='</div>';

    if(activeTab===0){
      destinations.forEach(function(d,i){
        html+='<div class="v16-trip-card" onclick="window._v16TripDetail('+i+')">';
        html+='<h4>'+d.name+' <span style="font-size:12px;color:var(--accent)">'+('&#11088;').repeat(d.rating)+'</span></h4>';
        html+='<p style="font-size:12px;color:var(--text-muted);margin-bottom:8px">'+d.days+' | '+d.budget+' | '+d.season+'</p>';
        html+='<div class="v16-trip-meta">';
        d.highlights.forEach(function(h){html+='<span class="v16-trip-tag">'+h+'</span>'});
        html+='</div>';
        html+='<p style="font-size:11px;color:var(--text-muted);margin-top:8px">&#9971; '+d.courses.join(', ')+'</p>';
        html+='</div>';
      });
    }else{
      html+='<div style="margin-bottom:14px"><button class="v16-btn v16-btn-primary" onclick="window._v16AddTrip()">&#10133; 새 여행 계획</button></div>';
      if(trips.length===0){
        html+='<div class="v16-card" style="text-align:center;padding:32px"><p>&#9992; 아직 계획된 여행이 없습니다</p></div>';
      }else{
        trips.forEach(function(trip,i){
          html+='<div class="v16-trip-card">';
          html+='<h4>'+trip.name+'</h4>';
          html+='<p style="font-size:12px;color:var(--text-muted)">'+trip.date+' | '+trip.people+'명 | '+trip.budget+'</p>';
          if(trip.memo)html+='<p style="font-size:12px;margin-top:6px">'+trip.memo+'</p>';
          html+='<button class="v16-btn v16-btn-sm v16-btn-secondary" style="margin-top:8px" onclick="window._v16DeleteTrip('+i+')">&#128465; 삭제</button>';
          html+='</div>';
        });
      }
    }

    html+='</div>';
    ov.innerHTML=html;
  }

  window._v16TripTab=function(i){v16Set('trip_tab',i);render()};

  window._v16TripDetail=function(i){
    var d=destinations[i];
    v16SFX('trip');
    var detail='<div class="v16-modal"><div class="v16-hdr"><h2>'+d.name+'</h2><button class="v16-x" onclick="window._v16TripBack()">&times;</button></div>';
    detail+='<div class="v16-card"><h4>&#128197; '+d.days+' | &#128176; '+d.budget+'</h4><p>&#127780; '+d.season+'</p></div>';
    detail+='<h4 style="font-size:14px;font-weight:700;margin:14px 0 10px">&#9971; 추천 코스</h4>';
    d.courses.forEach(function(c,j){
      detail+='<div class="v16-card"><h4>'+(j+1)+'. '+c+'</h4></div>';
    });
    detail+='<h4 style="font-size:14px;font-weight:700;margin:14px 0 10px">&#127775; 하이라이트</h4>';
    d.highlights.forEach(function(h){
      detail+='<div class="v16-card"><p>&#8226; '+h+'</p></div>';
    });
    detail+='<button class="v16-btn v16-btn-primary" style="margin-top:14px" onclick="window._v16TripBack()">&#8592; 목록으로</button></div>';
    ov.innerHTML=detail;
  };

  window._v16TripBack=function(){render()};

  window._v16AddTrip=function(){
    var name=prompt('여행 이름:');if(!name)return;
    var date=prompt('일정 (예: 2026-07-01~03):','');
    var people=prompt('인원:','4');
    var budget=prompt('예산:','100만원');
    var memo=prompt('메모:','');
    trips.push({name:name,date:date||'미정',people:people||'4',budget:budget||'미정',memo:memo});
    v16Set('trips',trips);render();v16SFX('trip');v16CheckAchieve();
  };

  window._v16DeleteTrip=function(i){trips.splice(i,1);v16Set('trips',trips);render()};

  render();
  document.body.appendChild(ov);
}

// === 6. Round Comparison ===
function v16RoundCompare(){
  var ov=document.createElement('div');ov.id='v16CompareOverlay';ov.className='v16-overlay';

  function getScoreData(){
    var cards=v16Get('compare_rounds',[]);
    if(cards.length<2){
      try{
        var sc=JSON.parse(localStorage.getItem('sg_v15_scorecards')||'[]');
        if(sc.length>=2)cards=sc.slice(-2);
      }catch(e){}
    }
    return cards;
  }

  function render(){
    var html='<div class="v16-modal"><div class="v16-hdr"><h2><span class="v16i">&#128203;</span> Round Compare</h2><button class="v16-x" onclick="document.getElementById(\'v16CompareOverlay\').classList.remove(\'active\')">&times;</button></div>';

    html+='<div class="v16-card"><h4>&#128200; 라운드 비교 분석</h4><p>두 라운드의 스코어를 입력하여 홀별 비교 분석을 수행합니다.</p></div>';

    html+='<div class="v16-grid2" style="margin-bottom:16px">';
    html+='<div><label style="font-size:12px;font-weight:700;color:var(--primary)">&#128994; Round A</label>';
    html+='<input class="v16-input" id="v16RA_name" placeholder="날짜/코스명" style="margin:6px 0"><input class="v16-input" id="v16RA_score" placeholder="총 스코어 (예: 92)"></div>';
    html+='<div><label style="font-size:12px;font-weight:700;color:var(--accent)">&#128308; Round B</label>';
    html+='<input class="v16-input" id="v16RB_name" placeholder="날짜/코스명" style="margin:6px 0"><input class="v16-input" id="v16RB_score" placeholder="총 스코어 (예: 88)"></div>';
    html+='</div>';

    html+='<div class="v16-grid2" style="margin-bottom:14px">';
    ['퍼트수','페어웨이안착','GIR','파 세이브'].forEach(function(label,i){
      var ids=['putts','fir','gir','parsave'];
      html+='<div style="margin-bottom:8px"><label style="font-size:11px;font-weight:600">'+label+'</label>';
      html+='<div style="display:flex;gap:6px;margin-top:4px"><input class="v16-input" id="v16RA_'+ids[i]+'" placeholder="A" style="flex:1"><input class="v16-input" id="v16RB_'+ids[i]+'" placeholder="B" style="flex:1"></div></div>';
    });
    html+='</div>';

    html+='<button class="v16-btn v16-btn-primary" onclick="window._v16DoCompare()">&#128200; 비교 분석</button>';

    html+='<div id="v16CompareResult"></div>';

    html+='</div>';
    ov.innerHTML=html;
  }

  window._v16DoCompare=function(){
    var aName=document.getElementById('v16RA_name').value||'Round A';
    var bName=document.getElementById('v16RB_name').value||'Round B';
    var aScore=parseInt(document.getElementById('v16RA_score').value)||0;
    var bScore=parseInt(document.getElementById('v16RB_score').value)||0;

    var metrics=[
      {label:'&#9971; Total Score',a:aScore,b:bScore,lower:true},
      {label:'&#128063; Putts',a:parseInt(document.getElementById('v16RA_putts').value)||0,b:parseInt(document.getElementById('v16RB_putts').value)||0,lower:true},
      {label:'&#127939; FIR %',a:parseInt(document.getElementById('v16RA_fir').value)||0,b:parseInt(document.getElementById('v16RB_fir').value)||0,lower:false},
      {label:'&#127919; GIR %',a:parseInt(document.getElementById('v16RA_gir').value)||0,b:parseInt(document.getElementById('v16RB_gir').value)||0,lower:false},
      {label:'&#128170; Par Save %',a:parseInt(document.getElementById('v16RA_parsave').value)||0,b:parseInt(document.getElementById('v16RB_parsave').value)||0,lower:false}
    ];

    var html='<div class="v16-divider"></div>';
    html+='<div class="v16-grid2" style="margin-bottom:12px"><div style="text-align:center"><span class="v16-badge" style="background:var(--primary);color:#fff">'+aName+'</span></div>';
    html+='<div style="text-align:center"><span class="v16-badge" style="background:var(--accent);color:#fff">'+bName+'</span></div></div>';

    var aWins=0,bWins=0;
    metrics.forEach(function(m){
      if(m.a===0&&m.b===0)return;
      var aBetter=m.lower?(m.a<m.b):(m.a>m.b);
      var bBetter=m.lower?(m.b<m.a):(m.b>m.a);
      if(aBetter)aWins++;if(bBetter)bWins++;

      html+='<div class="v16-compare-row">';
      html+='<div class="v16-compare-val '+(aBetter?'v16-compare-better':'v16-compare-worse')+'">'+(m.a||'-')+'</div>';
      html+='<div class="v16-compare-label">'+m.label+'</div>';
      html+='<div class="v16-compare-val '+(bBetter?'v16-compare-better':'v16-compare-worse')+'">'+(m.b||'-')+'</div>';
      html+='</div>';
    });

    var winner=aWins>bWins?aName:(bWins>aWins?bName:'Draw');
    html+='<div style="text-align:center;margin-top:16px"><span class="v16-badge" style="background:'+(winner==='Draw'?'#ffc107':'var(--primary)')+';color:'+(winner==='Draw'?'#333':'#fff')+';font-size:14px;padding:10px 24px">&#127942; '+winner+(winner==='Draw'?'':' WIN!')+' ('+aWins+':'+bWins+')</span></div>';

    document.getElementById('v16CompareResult').innerHTML=html;
    v16SFX('compare');v16CheckAchieve();
  };

  render();
  document.body.appendChild(ov);
}

// === 7. Golf IQ Test ===
function v16GolfIQ(){
  var ov=document.createElement('div');ov.id='v16IQOverlay';ov.className='v16-overlay';

  var questions=[
    {q:'스트로크 플레이에서 볼이 OB로 나갔을 때 올바른 처리는?',o:['이전 위치에서 1벌타로 재타','떨어진 곳에서 2벌타로 플레이','OB 지점에서 무벌타로 드롭','경기 위원에게 보고 후 대기'],a:0},
    {q:'퍼팅 그린에서 볼 마크를 고치지 않으면 어떤 페널티?',o:['1벌타','2벌타','실격','벌타 없음 (에티켓 사항)'],a:3},
    {q:'Slope Rating 155의 코스는 어떤 난이도?',o:['매우 쉬움','보통','어려움','매우 어려움 (최고 난이도)'],a:3},
    {q:'GIR(Green In Regulation)의 정의로 올바른 것은?',o:['파 -2타 이내에 그린 온','파 타수에서 퍼트 수를 뺀 타수 이내에 그린 온','모든 홀에서 그린에 올린 비율','보기 이내에 그린 온'],a:1},
    {q:'페어웨이 벙커에서 가장 중요한 기술적 포인트는?',o:['강하게 히팅','볼 먼저 클린 컨택','모래를 먼저 때리기','풀스윙으로 탈출'],a:1},
    {q:'드로우 구질을 만들기 위한 클럽페이스-스윙패스 관계는?',o:['페이스 열림, 인투아웃','페이스 닫힘, 아웃투인','페이스 타겟, 인투아웃','페이스 닫힘, 인투아웃'],a:2},
    {q:'Stimpmeter 12의 그린은 어떤 상태?',o:['매우 느린 그린','보통 속도 그린','빠른 투어 수준 그린','극도로 빠른 마스터즈 수준'],a:2},
    {q:'핸디캡 인덱스 계산에 사용되는 최근 스코어 수는?',o:['최근 10라운드 전체','최근 20라운드 중 상위 8개','최근 20라운드 중 하위 8개','최근 30라운드 중 상위 10개'],a:1},
    {q:'리버스 피봇(Reverse Pivot)이란?',o:['백스윙에서 왼발에 체중이 실리는 것','다운스윙에서 오른발에 체중이 남는 것','임팩트에서 머리가 들리는 것','팔로스루에서 팔이 접히는 것'],a:0},
    {q:'코스 매니지먼트에서 &quot;Lag Putt&quot;의 목적은?',o:['홀인 시키기','3퍼트 방지를 위해 홀 근처에 붙이기','그린 경사 파악','스피드 체크'],a:1},
    {q:'웨지의 바운스 각도가 높으면(14도+) 적합한 조건은?',o:['딱딱한 지면','부드러운 모래/두꺼운 러프','하드팬','단단한 페어웨이'],a:1},
    {q:'PGA 투어 평균 드라이빙 디스턴스(2024)는 약?',o:['260야드','280야드','300야드','320야드'],a:2},
    {q:'골프에서 &quot;Dormie&quot;란?',o:['2홀 차이로 리딩','남은 홀 수만큼 리딩 (질 수 없는 상태)','마지막 홀에서 동점','올 스퀘어 상태'],a:1},
    {q:'볼이 캐주얼 워터에 빠졌을 때 처리 방법은?',o:['있는 그대로 치기','무벌타 구제 (1클럽 이내)','1벌타로 드롭','플레이 불가, 다음 홀로'],a:1},
    {q:'엘보(골프 엘보)를 예방하는 가장 효과적인 방법은?',o:['더 세게 스윙하기','올바른 그립 압력과 스트레칭','무거운 클럽 사용','매일 500개 이상 연습'],a:1},
    {q:'코스 레이팅 72.5, 슬로프 135인 코스에서 핸디캡 15 골퍼의 코스 핸디캡은?',o:['15','17','18','20'],a:2},
    {q:'숏게임에서 플롭샷을 칠 때 필요한 클럽 세팅은?',o:['클럽페이스 닫고 강하게','클럽페이스 열고 풀스윙','클럽페이스 스퀘어로 칩','퍼터로 굴리기'],a:1},
    {q:'타이거 우즈가 가장 많이 우승한 메이저 대회는?',o:['마스터즈 (5회)','US오픈 (3회)','디오픈 (3회)','PGA챔피언십 (4회)'],a:0},
    {q:'골프 클럽의 MOI(관성 모멘트)가 높을수록?',o:['비거리 증가','미스히트 관용성 증가','스핀량 증가','론치앵글 감소'],a:1},
    {q:'Strokes Gained: Putting에서 +1.0은 어떤 의미?',o:['평균보다 퍼팅 1타 나쁨','투어 평균 대비 퍼팅으로 1타 이득','퍼트수가 1개','그린 적중 1회'],a:1}
  ];

  var state=v16Get('iq_state',{current:0,answers:[],done:false,bestScore:0});

  function render(){
    var html='<div class="v16-modal"><div class="v16-hdr"><h2><span class="v16i">&#129504;</span> Golf IQ Test</h2><button class="v16-x" onclick="document.getElementById(\'v16IQOverlay\').classList.remove(\'active\')">&times;</button></div>';

    if(state.done){
      var correct=state.answers.filter(function(a,i){return a===questions[i].a}).length;
      var pct=Math.round(correct/questions.length*100);
      var grade=pct>=95?'S':pct>=85?'A':pct>=75?'B':pct>=60?'C':pct>=45?'D':'F';
      if(correct>state.bestScore){state.bestScore=correct;v16Set('iq_state',state)}

      html+='<div style="text-align:center;padding:24px">';
      html+='<div style="font-size:54px;margin-bottom:12px">'+(pct>=80?'&#129351;':pct>=60?'&#129352;':'&#129353;')+'</div>';
      html+='<h3 style="font-size:24px;font-weight:800;margin-bottom:8px">Golf IQ: '+pct+'점 ('+grade+')</h3>';
      html+='<p style="font-size:14px;color:var(--text-muted)">'+correct+'/'+questions.length+' 정답 | 최고: '+state.bestScore+'/'+questions.length+'</p></div>';

      html+='<div class="v16-divider"></div>';
      questions.forEach(function(q,i){
        var isCorrect=state.answers[i]===q.a;
        html+='<div class="v16-card" style="border-left:4px solid '+(isCorrect?'#4caf50':'#ff4444')+'">';
        html+='<h4 style="font-size:13px">'+(isCorrect?'&#10004;':'&#10006;')+' Q'+(i+1)+'. '+q.q+'</h4>';
        if(!isCorrect){
          html+='<p style="color:#ff4444;font-size:12px">내 답: '+q.o[state.answers[i]]+'</p>';
        }
        html+='<p style="color:#4caf50;font-size:12px;font-weight:600">&#10004; '+q.o[q.a]+'</p></div>';
      });

      html+='<button class="v16-btn v16-btn-primary" style="margin-top:14px" onclick="window._v16RestartIQ()">&#128260; 다시 도전</button>';
    }else{
      var idx=state.current;
      var q=questions[idx];

      html+='<div class="v16-progress"><div class="v16-progress-fill" style="width:'+(idx/questions.length*100)+'%;background:linear-gradient(90deg,var(--primary),#34a853)"></div></div>';
      html+='<p style="font-size:12px;color:var(--text-muted);margin-bottom:16px;text-align:center">Q'+(idx+1)+'/'+questions.length+'</p>';

      html+='<div class="v16-card"><h4 style="font-size:15px;line-height:1.6">Q'+(idx+1)+'. '+q.q+'</h4></div>';

      q.o.forEach(function(opt,oi){
        html+='<div class="v16-checklist-item" onclick="window._v16AnswerIQ('+oi+')" style="cursor:pointer">';
        html+='<span class="v16-check-icon" style="font-size:16px;font-weight:700;color:var(--primary);width:24px;text-align:center">'+(oi+1)+'</span>';
        html+='<div class="v16-checklist-text"><h5 style="font-size:13px">'+opt+'</h5></div></div>';
      });
    }

    html+='</div>';
    ov.innerHTML=html;
  }

  window._v16AnswerIQ=function(ans){
    state.answers.push(ans);
    var isCorrect=ans===questions[state.current].a;
    v16SFX(isCorrect?'iq_correct':'iq_wrong');
    state.current++;
    if(state.current>=questions.length)state.done=true;
    v16Set('iq_state',state);render();
    if(state.done)v16CheckAchieve();
  };

  window._v16RestartIQ=function(){
    state={current:0,answers:[],done:false,bestScore:state.bestScore||0};
    v16Set('iq_state',state);render();
  };

  render();
  document.body.appendChild(ov);
}

// === 8. Course Wiki ===
function v16CourseWiki(){
  var ov=document.createElement('div');ov.id='v16WikiOverlay';ov.className='v16-overlay';

  var courses=[
    {name:'&#127468;&#127468; South Cape Owners Club',region:'경남 남해',designer:'Kyle Phillips',year:2013,par:72,yards:7180,holes:18,rating:'&#11088;&#11088;&#11088;&#11088;&#11088;',desc:'남해 해안 절벽 위에 위치한 세계적 명문 코스. 2024 한국 1위 코스로 선정. 바다와 산의 조화가 돋보이는 링크스 스타일.',signature:'13번 홀 (Par 3, 192yd) - 해안 절벽 위 아일랜드 그린',tips:['바람이 강해 클럽 선택 신중히','해안 코스라 아침 안개 주의','카트 필수, 고저차 큼']},
    {name:'&#127468;&#127468; 나인브릿지 GC',region:'제주 서귀포',designer:'Robert Trent Jones Jr.',year:2001,par:72,yards:7196,holes:18,rating:'&#11088;&#11088;&#11088;&#11088;&#11088;',desc:'제주 화산지형을 활용한 대한민국 대표 코스. THE CJ CUP 개최지. 9개의 다리(나인브릿지)가 특징.',signature:'7번 홀 (Par 4, 435yd) - 화산 분화구를 가로지르는 홀',tips:['제주 바람 매우 강함','화산석 OB 주의','시즌 예약 최소 3개월 전']},
    {name:'&#127468;&#127468; 핀크스 GC',region:'제주 서귀포',designer:'Ted Robinson Sr.',year:2000,par:72,yards:6849,holes:18,rating:'&#11088;&#11088;&#11088;&#11088;&#11088;',desc:'한라산과 바다를 동시에 조망하는 제주 명문. 연중 푸른 잔디와 뛰어난 코스 컨디션.',signature:'8번 홀 (Par 3, 180yd) - 한라산 배경의 아름다운 파3',tips:['벤트/버뮤다 혼합 그린','고저차 활용 전략 필요','캐디 추천 청취 필수']},
    {name:'&#127468;&#127468; 해슬리 나인브릿지',region:'경기 여주',designer:'Tom Fazio',year:2009,par:72,yards:7158,holes:18,rating:'&#11088;&#11088;&#11088;&#11088;&#11088;',desc:'THE PRESIDENTS CUP 2015 개최. Tom Fazio 설계의 걸작. 자연 지형을 최대한 보존한 코스.',signature:'18번 홀 (Par 4, 450yd) - 클럽하우스를 향한 드라마틱한 피니시',tips:['전략적 코스 매니지먼트 필수','벙커 깊이 주의','그린 언듈레이션 복잡']},
    {name:'&#127468;&#127468; 베어즈베스트 청라',region:'인천 서구',designer:'Jack Nicklaus',year:2007,par:72,yards:7117,holes:18,rating:'&#11088;&#11088;&#11088;&#11088;',desc:'골프 황제 잭 니클라우스가 직접 설계. 세계 베스트 홀들을 모아 재현한 드림 코스.',signature:'12번 홀 - 오거스타 12번 홀 오마주 (Amen Corner)',tips:['워터해저드 많음','링크스 스타일 바람 대비','수도권 접근성 좋음']},
    {name:'&#127468;&#127468; 클럽나인 용인',region:'경기 용인',designer:'Rees Jones',year:2008,par:72,yards:7200,holes:18,rating:'&#11088;&#11088;&#11088;&#11088;',desc:'KPGA 대회 개최 코스. 전략성과 난이도의 균형이 뛰어난 챔피언십 코스.',signature:'15번 홀 (Par 5, 560yd) - S자 독레그 워터홀',tips:['언듈레이션 심한 그린','정확한 아이언 샷 중요','페어웨이 폭 좁은 홀 주의']},
    {name:'&#127468;&#127468; 안양CC',region:'경기 안양',designer:'Takao Suzuki',year:1968,par:72,yards:6820,holes:27,rating:'&#11088;&#11088;&#11088;&#11088;',desc:'한국 골프 역사의 산증인. 60년 전통의 명문 코스. 자연과 조화를 이루는 전통적 설계.',signature:'동코스 5번 홀 - 관악산 조망의 클래식 파3',tips:['전통적 코스 매너 중시','캐디 경험치 높음','오래된 나무들로 전략 복잡']},
    {name:'&#127468;&#127468; 라비에벨 GC',region:'강원 횡성',designer:'Robert Trent Jones Jr.',year:2011,par:72,yards:7239,holes:18,rating:'&#11088;&#11088;&#11088;&#11088;&#11088;',desc:'해발 500m 고지대에 위치한 아름다운 산악 코스. 사계절 뚜렷한 경관 변화.',signature:'16번 홀 (Par 4, 410yd) - 계곡을 가로지르는 드라마틱 홀',tips:['고도 차이로 비거리 5-10% 증가','여름에도 서늘한 기후','가을 단풍 시즌 최고']}
  ];

  function render(){
    var html='<div class="v16-modal"><div class="v16-hdr"><h2><span class="v16i">&#128214;</span> Course Wiki</h2><button class="v16-x" onclick="document.getElementById(\'v16WikiOverlay\').classList.remove(\'active\')">&times;</button></div>';

    html+='<div class="v16-card"><h4>&#127758; 한국 명문 골프 코스 백과</h4><p>한국 최고의 골프 코스 8곳의 상세 정보를 확인하세요.</p></div>';

    courses.forEach(function(c,i){
      html+='<div class="v16-card" style="cursor:pointer" onclick="window._v16WikiDetail('+i+')">';
      html+='<h4>'+c.name+' '+c.rating+'</h4>';
      html+='<p>'+c.region+' | '+c.designer+' ('+c.year+') | Par '+c.par+' / '+c.yards+'yd</p>';
      html+='</div>';
    });

    html+='</div>';
    ov.innerHTML=html;
  }

  window._v16WikiDetail=function(i){
    var c=courses[i];v16SFX('navigate');
    var html='<div class="v16-modal"><div class="v16-hdr"><h2>'+c.name+'</h2><button class="v16-x" onclick="window._v16WikiBack()">&times;</button></div>';
    html+='<div class="v16-card"><p style="font-size:13px;line-height:1.8">'+c.desc+'</p></div>';

    html+='<div class="v16-grid2">';
    [['&#127758; 위치',c.region],['&#128736; 설계',c.designer],['&#128197; 개장',c.year+'년'],['Par',c.par],['&#128207; 거리',c.yards+'yd'],['&#9971; 홀수',c.holes+'홀']].forEach(function(m){
      html+='<div class="v16-stat-row"><span style="font-size:12px;color:var(--text-muted)">'+m[0]+'</span><span style="font-size:14px;font-weight:700">'+m[1]+'</span></div>';
    });
    html+='</div>';

    html+='<div class="v16-divider"></div><h4 style="font-size:14px;font-weight:700;margin-bottom:10px">&#127775; Signature Hole</h4>';
    html+='<div class="v16-card"><p>'+c.signature+'</p></div>';

    html+='<h4 style="font-size:14px;font-weight:700;margin:14px 0 10px">&#128161; 플레이 팁</h4>';
    c.tips.forEach(function(t){
      html+='<div class="v16-card"><p>&#8226; '+t+'</p></div>';
    });

    html+='<button class="v16-btn v16-btn-primary" style="margin-top:14px" onclick="window._v16WikiBack()">&#8592; 목록</button></div>';
    ov.innerHTML=html;
  };

  window._v16WikiBack=function(){render()};

  render();
  document.body.appendChild(ov);
}

// === Achievement System ===
function v16CheckAchieve(){
  var achieved=v16Get('achievements',{});
  var defs=[
    {id:'v16_first_match',title:'&#9813; First Match',desc:'첫 매치플레이 완료',check:function(){var d=v16Get('matchplay',{matches:[]});return d.matches.length>=1}},
    {id:'v16_match_5',title:'&#9813; Match Veteran',desc:'매치플레이 5경기',check:function(){var d=v16Get('matchplay',{matches:[]});return d.matches.length>=5}},
    {id:'v16_radar_save',title:'&#128200; Self Analyst',desc:'퍼포먼스 레이더 저장',check:function(){return v16Get('radar_history',[]).length>=1}},
    {id:'v16_radar_5',title:'&#128200; Growth Tracker',desc:'레이더 5회 기록',check:function(){return v16Get('radar_history',[]).length>=5}},
    {id:'v16_routine_master',title:'&#128203; Routine Master',desc:'프리샷 루틴 10회 완료',check:function(){return v16Get('checklist_usage',0)>=10}},
    {id:'v16_iq_test',title:'&#129504; Golf Scholar',desc:'골프 IQ 테스트 완료',check:function(){return v16Get('iq_state',{done:false}).done}},
    {id:'v16_iq_90',title:'&#129504; Golf Genius',desc:'골프 IQ 90점 이상',check:function(){var s=v16Get('iq_state',{});return s.bestScore>=18}},
    {id:'v16_trip_plan',title:'&#9992; Trip Planner',desc:'여행 계획 1개 등록',check:function(){return v16Get('trips',[]).length>=1}},
    {id:'v16_compare_once',title:'&#128203; Round Analyst',desc:'라운드 비교 1회 수행',check:function(){return v16Get('compare_done',false)}},
    {id:'v16_wiki_reader',title:'&#128214; Course Expert',desc:'코스 위키 탐독',check:function(){return v16Get('wiki_read',false)}},
    {id:'v16_all_features',title:'&#127942; V16 Explorer',desc:'v16 기능 8개 모두 사용',check:function(){return v16Get('features_used',0)>=8}},
    {id:'v16_daily_player',title:'&#128293; Daily Golfer',desc:'3일 연속 앱 사용',check:function(){var h=v16Get('daily_streak',{dates:[],streak:0});return h.streak>=3}}
  ];

  var newCount=0;
  defs.forEach(function(d){
    if(!achieved[d.id]&&d.check()){
      achieved[d.id]={date:new Date().toISOString().slice(0,10)};
      newCount++;
      v16SFX('achieve');
      showV16Toast('&#127942; '+d.title+' 달성!');
    }
  });

  if(newCount>0)v16Set('achievements',achieved);
  return{total:defs.length,done:Object.keys(achieved).length};
}

function showV16Toast(msg){
  var t=document.createElement('div');
  t.style.cssText='position:fixed;bottom:100px;left:50%;transform:translateX(-50%);background:var(--toast-bg);color:#fff;padding:14px 28px;border-radius:16px;font-size:13px;font-weight:600;z-index:99999;animation:v16Rise .4s ease;box-shadow:0 8px 30px rgba(0,0,0,.3)';
  t.innerHTML=msg;
  document.body.appendChild(t);
  setTimeout(function(){t.remove()},3000);
}

// === Daily Streak Tracking ===
function v16TrackDaily(){
  var today=new Date().toISOString().slice(0,10);
  var data=v16Get('daily_streak',{dates:[],streak:0,lastDate:''});
  if(data.lastDate===today)return;

  var yesterday=new Date(Date.now()-86400000).toISOString().slice(0,10);
  if(data.lastDate===yesterday){
    data.streak++;
  }else{
    data.streak=1;
  }
  data.lastDate=today;
  if(data.dates.indexOf(today)===-1)data.dates.push(today);
  v16Set('daily_streak',data);
}

// === Feature Usage Tracking ===
function v16TrackFeature(name){
  var used=v16Get('features_list',{});
  used[name]=true;
  v16Set('features_list',used);
  v16Set('features_used',Object.keys(used).length);
}

// Patch overlay opens to track feature usage
function v16PatchTracking(){
  var overlays={
    'v16MatchOverlay':'match','v16RadarOverlay':'radar','v16CheckOverlay':'checklist',
    'v16WeatherOverlay':'weather','v16TripOverlay':'trip','v16CompareOverlay':'compare',
    'v16IQOverlay':'iq','v16WikiOverlay':'wiki'
  };
  var origAdd=Element.prototype.classList.add;
  var obs=new MutationObserver(function(mutations){
    mutations.forEach(function(m){
      if(m.target.classList&&m.target.classList.contains('active')){
        var id=m.target.id;
        if(overlays[id]){
          v16TrackFeature(overlays[id]);
          if(id==='v16CompareOverlay')v16Set('compare_done',true);
          if(id==='v16WikiOverlay')v16Set('wiki_read',true);
        }
      }
    });
  });
  Object.keys(overlays).forEach(function(id){
    var el=document.getElementById(id);
    if(el)obs.observe(el,{attributes:true,attributeFilter:['class']});
  });
}

// === Quick Action Buttons ===
function v16QuickActions(){
  var actions=[
    {id:'v16MatchBtn',label:'&#9813; Match Play',overlay:'v16MatchOverlay'},
    {id:'v16RadarBtn',label:'&#128200; Radar',overlay:'v16RadarOverlay'},
    {id:'v16CheckBtn',label:'&#128203; Routine',overlay:'v16CheckOverlay'},
    {id:'v16WeatherBtn',label:'&#127780; Weather',overlay:'v16WeatherOverlay'},
    {id:'v16TripBtn',label:'&#9992; Trip',overlay:'v16TripOverlay'},
    {id:'v16CompareBtn',label:'&#128202; Compare',overlay:'v16CompareOverlay'},
    {id:'v16IQBtn',label:'&#129504; IQ Test',overlay:'v16IQOverlay'},
    {id:'v16WikiBtn',label:'&#128214; Wiki',overlay:'v16WikiOverlay'}
  ];

  function inject(){
    var container=document.querySelector('.search-section')||document.querySelector('.container');
    if(!container||document.getElementById('v16ActionBar'))return;

    var bar=document.createElement('div');bar.id='v16ActionBar';
    bar.style.cssText='display:flex;gap:8px;overflow-x:auto;padding:10px 0;scrollbar-width:none;margin-bottom:8px';

    actions.forEach(function(a){
      var btn=document.createElement('button');
      btn.id=a.id;btn.innerHTML=a.label;
      btn.style.cssText='padding:8px 16px;border:1.5px solid var(--border);border-radius:20px;background:var(--card-bg);font-size:12px;font-weight:600;cursor:pointer;transition:.2s;color:var(--text);white-space:nowrap';
      btn.addEventListener('mouseover',function(){this.style.borderColor='var(--primary)';this.style.color='var(--primary)'});
      btn.addEventListener('mouseout',function(){this.style.borderColor='var(--border)';this.style.color='var(--text)'});
      btn.addEventListener('click',function(){document.getElementById(a.overlay).classList.add('active');v16SFX('navigate')});
      bar.appendChild(btn);
    });
    container.insertBefore(bar,container.querySelector('.results-header')||container.children[1]);
  }
  if(document.readyState==='complete')inject();
  else window.addEventListener('load',function(){setTimeout(inject,1200)});
  setTimeout(inject,2500);
  setTimeout(inject,4500);
}

// === Keyboard Shortcuts ===
document.addEventListener('keydown',function(e){
  var t=e.target.tagName;if(t==='INPUT'||t==='TEXTAREA'||t==='SELECT')return;
  if(e.shiftKey){
    var map={
      'M':'v16MatchOverlay','R':'v16RadarOverlay','X':'v16CheckOverlay',
      'W':'v16WeatherOverlay','T':'v16TripOverlay','O':'v16CompareOverlay',
      'I':'v16IQOverlay','K':'v16WikiOverlay'
    };
    if(map[e.key]){e.preventDefault();var el=document.getElementById(map[e.key]);if(el)el.classList.add('active');v16SFX('navigate')}
  }
  if(e.key==='Escape'){
    ['v16MatchOverlay','v16RadarOverlay','v16CheckOverlay','v16WeatherOverlay','v16TripOverlay','v16CompareOverlay','v16IQOverlay','v16WikiOverlay'].forEach(function(id){
      var el=document.getElementById(id);if(el)el.classList.remove('active');
    });
  }
});

// === Init ===
function v16Init(){
  v16TrackDaily();
  v16MatchPlay();
  v16PerformanceRadar();
  v16ShotChecklist();
  v16WeatherStrategy();
  v16TripPlanner();
  v16RoundCompare();
  v16GolfIQ();
  v16CourseWiki();
  v16QuickActions();
  setTimeout(v16PatchTracking,2000);
  setTimeout(v16CheckAchieve,3000);
}

if(document.readyState==='complete'||document.readyState==='interactive'){setTimeout(v16Init,400)}
else{document.addEventListener('DOMContentLoaded',v16Init)}

})();
