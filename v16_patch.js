(function(){
'use strict';

var css16 = document.createElement('style');
css16.textContent = `
.v16-overlay{position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,.84);z-index:10050;display:none;align-items:center;justify-content:center;backdrop-filter:blur(16px)}
.v16-overlay.active{display:flex}
.v16-modal{background:var(--card-bg,#fff);border-radius:24px;padding:28px;width:95%;max-width:780px;max-height:92vh;overflow-y:auto;box-shadow:0 40px 120px rgba(0,0,0,.65);animation:v16Rise .4s cubic-bezier(.22,1,.36,1)}
@keyframes v16Rise{from{opacity:0;transform:translateY(44px) scale(.92)}to{opacity:1;transform:translateY(0) scale(1)}}
.v16-hdr{display:flex;justify-content:space-between;align-items:center;margin-bottom:18px}
.v16-hdr h2{font-size:21px;font-weight:800;display:flex;align-items:center;gap:10px}
.v16-hdr h2 .v16i{font-size:26px}
.v16-x{background:none;border:none;font-size:26px;cursor:pointer;color:var(--text-muted);padding:4px 10px;border-radius:10px;transition:.2s}
.v16-x:hover{background:var(--border);color:var(--text)}
.v16-tabs{display:flex;gap:6px;margin-bottom:16px;overflow-x:auto;padding-bottom:4px;scrollbar-width:none}
.v16-tabs::-webkit-scrollbar{display:none}
.v16-tab{padding:9px 18px;border-radius:24px;border:1.5px solid var(--border);background:var(--bg);font-size:12px;font-weight:700;cursor:pointer;white-space:nowrap;transition:.25s}
.v16-tab.active{background:var(--primary);color:#fff;border-color:var(--primary);box-shadow:0 3px 12px rgba(26,122,58,.35)}
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
.v16-btn-danger{background:#ff4444;color:#fff}
.v16-input{width:100%;padding:11px 16px;border:2px solid var(--border);border-radius:12px;font-size:13px;background:var(--bg);color:var(--text);transition:.2s}
.v16-input:focus{border-color:var(--primary);outline:none;box-shadow:0 0 0 3px rgba(26,122,58,.1)}
.v16-textarea{width:100%;padding:11px 16px;border:2px solid var(--border);border-radius:12px;font-size:13px;background:var(--bg);color:var(--text);min-height:70px;resize:vertical;font-family:inherit}
.v16-textarea:focus{border-color:var(--primary);outline:none}
.v16-select{padding:9px 14px;border:2px solid var(--border);border-radius:10px;font-size:13px;background:var(--bg);color:var(--text)}
.v16-grid2{display:grid;grid-template-columns:1fr 1fr;gap:12px}
.v16-grid3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px}
.v16-grid4{display:grid;grid-template-columns:repeat(4,1fr);gap:8px}
@media(max-width:500px){.v16-grid2,.v16-grid3,.v16-grid4{grid-template-columns:1fr}}
.v16-divider{height:1px;background:var(--border);margin:16px 0}
.v16-badge{display:inline-block;padding:4px 12px;border-radius:14px;font-size:11px;font-weight:700}
.v16-progress{width:100%;height:10px;background:var(--border);border-radius:5px;overflow:hidden;margin:8px 0}
.v16-progress-fill{height:100%;border-radius:5px;transition:width .6s ease}
.v16-stat-row{display:flex;justify-content:space-between;align-items:center;padding:12px 0;border-bottom:1px solid var(--border)}
.v16-stat-row:last-child{border-bottom:none}
.v16-sg-bar{display:flex;align-items:center;gap:8px;margin-bottom:10px}
.v16-sg-label{width:80px;font-size:12px;font-weight:700;text-align:right;flex-shrink:0}
.v16-sg-track{flex:1;height:24px;background:var(--border);border-radius:12px;position:relative;overflow:hidden}
.v16-sg-fill{height:100%;border-radius:12px;transition:width .8s ease}
.v16-sg-val{width:50px;font-size:13px;font-weight:800;text-align:left;flex-shrink:0}
.v16-compare-col{flex:1;min-width:0}
.v16-compare-vs{width:40px;display:flex;align-items:center;justify-content:center;font-size:20px;font-weight:900;color:var(--accent);flex-shrink:0}
.v16-condition-stars{display:flex;gap:2px}
.v16-condition-star{cursor:pointer;font-size:18px;transition:.2s}
.v16-flyover-canvas{width:100%;height:320px;border-radius:16px;margin:12px 0;cursor:crosshair}
.v16-green-canvas{width:100%;height:300px;border-radius:16px;margin:12px 0}
.v16-news-item{display:flex;gap:14px;padding:14px;background:var(--bg);border-radius:14px;margin-bottom:10px;transition:.2s;cursor:pointer;border-left:4px solid var(--primary)}
.v16-news-item:hover{transform:translateX(4px);border-left-color:var(--accent)}
.v16-news-icon{width:44px;height:44px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:22px;flex-shrink:0;background:var(--primary-light)}
.v16-news-body{flex:1;min-width:0}
.v16-news-title{font-size:14px;font-weight:700;margin-bottom:4px}
.v16-news-desc{font-size:12px;color:var(--text-muted);line-height:1.6}
.v16-news-tag{display:inline-block;padding:2px 8px;border-radius:8px;font-size:10px;font-weight:700;margin-right:4px}
.v16-equip-card{background:var(--bg);border-radius:16px;padding:16px;text-align:center;transition:.25s;border:2px solid transparent;cursor:pointer}
.v16-equip-card:hover,.v16-equip-card.selected{border-color:var(--primary);transform:translateY(-2px)}
.v16-equip-icon{font-size:32px;margin-bottom:8px}
.v16-equip-name{font-size:13px;font-weight:700;margin-bottom:4px}
.v16-equip-spec{font-size:11px;color:var(--text-muted)}
.v16-quiz-option{display:block;width:100%;padding:12px 16px;border:2px solid var(--border);border-radius:12px;background:var(--bg);color:var(--text);font-size:13px;cursor:pointer;transition:.2s;margin-bottom:8px;text-align:left}
.v16-quiz-option:hover{border-color:var(--primary);background:var(--primary-light)}
.v16-quiz-option.correct{border-color:#4caf50;background:#e8f5e9;color:#2e7d32}
.v16-quiz-option.wrong{border-color:#f44336;background:#fce4ec;color:#c62828}
.v16-toast{position:fixed;bottom:80px;left:50%;transform:translateX(-50%) translateY(100px);background:var(--toast-bg,#333);color:#fff;padding:12px 24px;border-radius:14px;font-size:13px;font-weight:600;z-index:11200;opacity:0;transition:.4s;pointer-events:none;display:flex;align-items:center;gap:8px}
.v16-toast.show{transform:translateX(-50%) translateY(0);opacity:1}
.v16-month-grid{display:grid;grid-template-columns:repeat(7,1fr);gap:4px;margin-bottom:12px}
.v16-month-hdr{text-align:center;font-size:11px;font-weight:700;color:var(--text-muted);padding:6px 0}
.v16-month-day{text-align:center;padding:8px 2px;border-radius:8px;font-size:12px;min-height:36px;display:flex;align-items:center;justify-content:center}
.v16-month-day.played{background:var(--primary);color:#fff;font-weight:700;border-radius:50%}
.v16-month-day.today{border:2px solid var(--accent)}
`;
document.head.appendChild(css16);

function v16LS(k,v){if(v!==undefined){localStorage.setItem('sg_v16_'+k,JSON.stringify(v));return v}try{return JSON.parse(localStorage.getItem('sg_v16_'+k))}catch(e){return null}}
function v16Toast(msg){var t=document.querySelector('.v16-toast');if(!t){t=document.createElement('div');t.className='v16-toast';document.body.appendChild(t)}t.innerHTML=msg;t.classList.add('show');setTimeout(function(){t.classList.remove('show')},2800)}
function v16SFX(type){try{var a=new(window.AudioContext||window.webkitAudioContext)(),o=a.createOscillator(),g=a.createGain();o.connect(g);g.connect(a.destination);var map={sg_analyze:{f:587,d:.2,w:'sine'},compare:{f:660,d:.15,w:'triangle'},condition:{f:523,d:.12,w:'sine'},flyover:{f:440,d:.18,w:'triangle'},green_read:{f:494,d:.15,w:'sine'},news:{f:554,d:.12,w:'triangle'},equip:{f:698,d:.15,w:'sine'},monthly:{f:784,d:.18,w:'sine'},quiz3:{f:880,d:.12,w:'sine'},quiz3_wrong:{f:220,d:.3,w:'sawtooth'},achieve16:{f:932,d:.25,w:'sine'},putt_sim:{f:370,d:.2,w:'triangle'}};var s=map[type]||{f:440,d:.15,w:'sine'};o.type=s.w;o.frequency.value=s.f;g.gain.value=.13;g.gain.exponentialRampToValueAtTime(.001,a.currentTime+s.d);o.start();o.stop(a.currentTime+s.d)}catch(e){}}

// ==========================================
// 1. STROKES GAINED ANALYZER v2
// ==========================================
function v16StrokesGained(){
  var rounds = v16LS('sg_rounds') || [];

  function addRound(){
    return {date:new Date().toISOString().split('T')[0],course:'',teeShots:{fairways:0,total:14},approach:{gir:0,total:18,avgMiss:15},shortGame:{upDown:0,chances:0,sandSave:0,sandChances:0},putting:{total:0,onePutt:0,threePutt:0,totalHoles:18},score:0,par:72};
  }
  var editing = null;

  function calcSG(r){
    var baseline={tee:0.4,approach:0.3,short:0.2,putt:0.1};
    var firPct=r.teeShots.total>0?r.teeShots.fairways/r.teeShots.total:0;
    var girPct=r.approach.total>0?r.approach.gir/r.approach.total:0;
    var udPct=r.shortGame.chances>0?r.shortGame.upDown/r.shortGame.chances:0;
    var puttAvg=r.putting.totalHoles>0?r.putting.total/r.putting.totalHoles:2;
    var sgTee=(firPct-0.6)*3.5;
    var sgApp=(girPct-0.5)*4.0;
    var sgShort=(udPct-0.4)*2.5;
    var sgPutt=(1.8-puttAvg)*2.0;
    return {tee:Math.round(sgTee*100)/100,approach:Math.round(sgApp*100)/100,short:Math.round(sgShort*100)/100,putt:Math.round(sgPutt*100)/100,total:Math.round((sgTee+sgApp+sgShort+sgPutt)*100)/100};
  }

  function render(){
    var html='';
    if(editing!==null){
      var r=editing===-1?addRound():rounds[editing];
      html+='<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px"><h4 style="font-size:14px;font-weight:700">'+(editing===-1?'새 라운드 입력':'라운드 수정')+'</h4><button class="v16-btn v16-btn-sm v16-btn-secondary" onclick="window._v16SGBack()">목록</button></div>';
      html+='<div class="v16-grid2" style="margin-bottom:10px"><input class="v16-input" id="v16SGCourse" placeholder="골프장 이름" value="'+(r.course||'')+'"><input class="v16-input" id="v16SGDate" type="date" value="'+r.date+'"></div>';
      html+='<div class="v16-grid2" style="margin-bottom:10px"><input class="v16-input" id="v16SGScore" type="number" placeholder="스코어" value="'+(r.score||'')+'"><input class="v16-input" id="v16SGPar" type="number" placeholder="코스 파(기본72)" value="'+(r.par||72)+'"></div>';
      html+='<div class="v16-divider"></div>';
      html+='<h4 style="font-size:13px;font-weight:700;margin-bottom:8px">&#x1F3CC;&#xFE0F; 티샷</h4>';
      html+='<div class="v16-grid2" style="margin-bottom:10px"><div><label style="font-size:11px;color:var(--text-muted)">페어웨이 안착</label><input class="v16-input" id="v16SGFairways" type="number" min="0" max="14" value="'+r.teeShots.fairways+'"></div><div><label style="font-size:11px;color:var(--text-muted)">파3제외 홀수</label><input class="v16-input" id="v16SGTeeTotal" type="number" value="'+r.teeShots.total+'"></div></div>';
      html+='<h4 style="font-size:13px;font-weight:700;margin-bottom:8px">&#x1F3AF; 어프로치</h4>';
      html+='<div class="v16-grid2" style="margin-bottom:10px"><div><label style="font-size:11px;color:var(--text-muted)">GIR (그린적중)</label><input class="v16-input" id="v16SGGIR" type="number" min="0" max="18" value="'+r.approach.gir+'"></div><div><label style="font-size:11px;color:var(--text-muted)">미스 평균거리(m)</label><input class="v16-input" id="v16SGMiss" type="number" value="'+r.approach.avgMiss+'"></div></div>';
      html+='<h4 style="font-size:13px;font-weight:700;margin-bottom:8px">&#x26F3; 숏게임</h4>';
      html+='<div class="v16-grid2" style="margin-bottom:10px"><div><label style="font-size:11px;color:var(--text-muted)">업앤다운 성공</label><input class="v16-input" id="v16SGUD" type="number" min="0" value="'+r.shortGame.upDown+'"></div><div><label style="font-size:11px;color:var(--text-muted)">업앤다운 기회</label><input class="v16-input" id="v16SGUDChances" type="number" min="0" value="'+r.shortGame.chances+'"></div></div>';
      html+='<div class="v16-grid2" style="margin-bottom:10px"><div><label style="font-size:11px;color:var(--text-muted)">샌드세이브 성공</label><input class="v16-input" id="v16SGSand" type="number" min="0" value="'+r.shortGame.sandSave+'"></div><div><label style="font-size:11px;color:var(--text-muted)">벙커 기회</label><input class="v16-input" id="v16SGSandCh" type="number" min="0" value="'+r.shortGame.sandChances+'"></div></div>';
      html+='<h4 style="font-size:13px;font-weight:700;margin-bottom:8px">&#x1F3AF; 퍼팅</h4>';
      html+='<div class="v16-grid3" style="margin-bottom:10px"><div><label style="font-size:11px;color:var(--text-muted)">총 퍼팅수</label><input class="v16-input" id="v16SGPutts" type="number" min="0" value="'+r.putting.total+'"></div><div><label style="font-size:11px;color:var(--text-muted)">원퍼팅</label><input class="v16-input" id="v16SG1Putt" type="number" min="0" value="'+r.putting.onePutt+'"></div><div><label style="font-size:11px;color:var(--text-muted)">3퍼팅+</label><input class="v16-input" id="v16SG3Putt" type="number" min="0" value="'+r.putting.threePutt+'"></div></div>';
      html+='<button class="v16-btn v16-btn-primary" onclick="window._v16SGSave()" style="margin-top:12px">저장</button>';
    } else {
      html+='<button class="v16-btn v16-btn-primary" onclick="window._v16SGNew()" style="margin-bottom:16px">+ 새 라운드 분석</button>';
      if(rounds.length>0){
        var latest=rounds[rounds.length-1];
        var sg=calcSG(latest);
        html+='<h4 style="font-size:14px;font-weight:700;margin-bottom:12px">최근 라운드 SG 분석</h4>';
        html+='<div class="v16-card" style="border-color:var(--primary)"><h4>'+latest.course+' ('+latest.date+')</h4><p>'+latest.score+'타 (파 '+latest.par+')</p></div>';
        var cats=[{label:'티샷',val:sg.tee,color:'#e53935'},{label:'어프로치',val:sg.approach,color:'#ff9800'},{label:'숏게임',val:sg.short,color:'#4caf50'},{label:'퍼팅',val:sg.putt,color:'#2196f3'}];
        cats.forEach(function(c){
          var pct=Math.min(100,Math.max(0,(c.val+3)/6*100));
          html+='<div class="v16-sg-bar"><div class="v16-sg-label">'+c.label+'</div><div class="v16-sg-track"><div class="v16-sg-fill" style="width:'+pct+'%;background:'+c.color+'"></div></div><div class="v16-sg-val" style="color:'+c.color+'">'+(c.val>=0?'+':'')+c.val+'</div></div>';
        });
        html+='<div class="v16-card" style="text-align:center;margin-top:12px"><div style="font-size:32px;font-weight:900;color:'+(sg.total>=0?'var(--primary)':'var(--accent)')+'">'+(sg.total>=0?'+':'')+sg.total+'</div><div style="font-size:12px;color:var(--text-muted)">총 Strokes Gained</div></div>';
        var weakest=cats.reduce(function(a,b){return a.val<b.val?a:b});
        var strongest=cats.reduce(function(a,b){return a.val>b.val?a:b});
        html+='<div class="v16-grid2" style="margin-top:12px"><div class="v16-card"><h4 style="color:#4caf50">&#x1F4AA; 강점</h4><p>'+strongest.label+': '+(strongest.val>=0?'+':'')+strongest.val+'</p></div><div class="v16-card"><h4 style="color:#f44336">&#x1F6A8; 약점</h4><p>'+weakest.label+': '+weakest.val+'</p></div></div>';
        var tips={'티샷':'드라이빙 레인지에서 정확도 위주 연습. 3번 우드 대안 고려.','어프로치':'거리별 클럽 선택 정밀화. 그린 센터 공략 습관화.','숟게임':'칩핑/피칭 연습 시간 2배 확대. 다양한 라이 연습.','퍼팅':'거리감 향상 드릴. 3m 이내 원퍼팅 목표 연습.'};
        html+='<div class="v16-card" style="margin-top:8px"><h4>&#x1F4A1; 개선 추천</h4><p>'+(tips[weakest.label]||'전반적으로 균형잡힌 연습을 추천합니다.')+'</p></div>';
      }
      if(rounds.length>1){
        html+='<div class="v16-divider"></div><h4 style="font-size:14px;font-weight:700;margin-bottom:10px">SG 트렌드 (최근 '+Math.min(rounds.length,10)+'라운드)</h4>';
        html+='<canvas id="v16SGChart" width="700" height="200" style="width:100%;height:200px;background:var(--bg);border-radius:12px"></canvas>';
      }
      if(rounds.length>0){
        html+='<div class="v16-divider"></div><h4 style="font-size:14px;font-weight:700;margin-bottom:10px">기록 목록 ('+rounds.length+')</h4>';
        rounds.slice().reverse().forEach(function(r,i){
          var ri=rounds.length-1-i;
          var sg=calcSG(r);
          html+='<div class="v16-card" style="cursor:pointer" onclick="window._v16SGEdit('+ri+')"><h4>'+r.course+' <span class="v16-badge" style="background:'+(sg.total>=0?'var(--primary)':'var(--accent)')+';color:#fff">'+(sg.total>=0?'+':'')+sg.total+' SG</span></h4><p>'+r.date+' | '+r.score+'타 | FIR '+(r.teeShots.total>0?Math.round(r.teeShots.fairways/r.teeShots.total*100):0)+'% | GIR '+(r.approach.total>0?Math.round(r.approach.gir/r.approach.total*100):0)+'%</p></div>';
        });
      }
    }
    return html;
  }

  window._v16SGNew=function(){editing=-1;document.querySelector('#v16SGOverlay .v16-content').innerHTML=render()};
  window._v16SGBack=function(){editing=null;document.querySelector('#v16SGOverlay .v16-content').innerHTML=render();setTimeout(v16DrawSGChart,100)};
  window._v16SGEdit=function(i){editing=i;document.querySelector('#v16SGOverlay .v16-content').innerHTML=render()};
  window._v16SGSave=function(){
    var r={date:document.getElementById('v16SGDate').value,course:document.getElementById('v16SGCourse').value.trim(),score:parseInt(document.getElementById('v16SGScore').value)||0,par:parseInt(document.getElementById('v16SGPar').value)||72,teeShots:{fairways:parseInt(document.getElementById('v16SGFairways').value)||0,total:parseInt(document.getElementById('v16SGTeeTotal').value)||14},approach:{gir:parseInt(document.getElementById('v16SGGIR').value)||0,total:18,avgMiss:parseInt(document.getElementById('v16SGMiss').value)||15},shortGame:{upDown:parseInt(document.getElementById('v16SGUD').value)||0,chances:parseInt(document.getElementById('v16SGUDChances').value)||0,sandSave:parseInt(document.getElementById('v16SGSand').value)||0,sandChances:parseInt(document.getElementById('v16SGSandCh').value)||0},putting:{total:parseInt(document.getElementById('v16SGPutts').value)||0,onePutt:parseInt(document.getElementById('v16SG1Putt').value)||0,threePutt:parseInt(document.getElementById('v16SG3Putt').value)||0,totalHoles:18}};
    if(!r.course){v16Toast('골프장 이름을 입력해주세요');return}
    if(editing===-1)rounds.push(r);else rounds[editing]=r;
    v16LS('sg_rounds',rounds);v16SFX('sg_analyze');v16Toast('SG 분석 저장 완료!');v16CheckAchieve();editing=null;
    document.querySelector('#v16SGOverlay .v16-content').innerHTML=render();setTimeout(v16DrawSGChart,100);
  };

  var ov=document.createElement('div');ov.id='v16SGOverlay';ov.className='v16-overlay';ov.setAttribute('role','dialog');
  ov.innerHTML='<div class="v16-modal"><div class="v16-hdr"><h2><span class="v16i">&#x1F4CA;</span> Strokes Gained &#xBD84;&#xC11D;&#xAE30;</h2><button class="v16-x" aria-label="닫기">&times;</button></div><div class="v16-content">'+render()+'</div></div>';
  document.body.appendChild(ov);
  ov.querySelector('.v16-x').addEventListener('click',function(){ov.classList.remove('active')});
  ov.addEventListener('click',function(e){if(e.target===ov)ov.classList.remove('active')});
}

function v16DrawSGChart(){
  var c=document.getElementById('v16SGChart');if(!c)return;
  var ctx=c.getContext('2d');var W=c.width,H=c.height;
  var rounds=v16LS('sg_rounds')||[];
  var recent=rounds.slice(-10);if(recent.length<2)return;
  ctx.clearRect(0,0,W,H);
  var isDark=document.documentElement.getAttribute('data-theme')==='dark';
  var pad={l:50,r:20,t:20,b:30};
  var colors=['#e53935','#ff9800','#4caf50','#2196f3'];
  var labels=['티샷','어프로치','숟게임','퍼팅'];
  var allSG=recent.map(function(r){
    var fir=r.teeShots.total>0?r.teeShots.fairways/r.teeShots.total:0;
    var gir=r.approach.total>0?r.approach.gir/r.approach.total:0;
    var ud=r.shortGame.chances>0?r.shortGame.upDown/r.shortGame.chances:0;
    var pa=r.putting.totalHoles>0?r.putting.total/r.putting.totalHoles:2;
    return [(fir-0.6)*3.5,(gir-0.5)*4,(ud-0.4)*2.5,(1.8-pa)*2];
  });
  var allVals=[].concat.apply([],allSG);
  var minV=Math.min.apply(null,allVals)-0.5;
  var maxV=Math.max.apply(null,allVals)+0.5;
  if(maxV-minV<1){minV-=0.5;maxV+=0.5}
  var zeroY=pad.t+(maxV/(maxV-minV))*(H-pad.t-pad.b);
  ctx.strokeStyle=isDark?'rgba(255,255,255,.15)':'rgba(0,0,0,.1)';ctx.setLineDash([4,4]);ctx.beginPath();ctx.moveTo(pad.l,zeroY);ctx.lineTo(W-pad.r,zeroY);ctx.stroke();ctx.setLineDash([]);
  ctx.fillStyle=isDark?'rgba(255,255,255,.4)':'rgba(0,0,0,.4)';ctx.font='9px sans-serif';ctx.textAlign='right';ctx.fillText('0',pad.l-6,zeroY+3);
  for(var cat=0;cat<4;cat++){
    ctx.strokeStyle=colors[cat];ctx.lineWidth=2;ctx.beginPath();
    allSG.forEach(function(sg,i){
      var x=pad.l+i*(W-pad.l-pad.r)/(recent.length-1);
      var y=pad.t+((maxV-sg[cat])/(maxV-minV))*(H-pad.t-pad.b);
      if(i===0)ctx.moveTo(x,y);else ctx.lineTo(x,y);
    });
    ctx.stroke();
  }
  ctx.font='bold 9px sans-serif';ctx.textAlign='left';
  labels.forEach(function(l,i){
    ctx.fillStyle=colors[i];ctx.fillText(l,pad.l+i*60,H-6);
  });
}

// ==========================================
// 2. ROUND COMPARISON
// ==========================================
function v16RoundCompare(){
  var scorecards=(function(){try{return JSON.parse(localStorage.getItem('sg_v15_scorecards'))||[]}catch(e){return []}})();
  var sgRounds=v16LS('sg_rounds')||[];
  var sel=[null,null];

  function getAllRounds(){
    var all=[];
    scorecards.forEach(function(sc,i){
      var total=sc.scores.reduce(function(s,v){return s+(v||0)},0);
      var par=sc.pars.reduce(function(s,v){return s+v},0);
      all.push({type:'sc',idx:i,course:sc.course,date:sc.date,score:total,par:par,data:sc});
    });
    sgRounds.forEach(function(r,i){
      all.push({type:'sg',idx:i,course:r.course,date:r.date,score:r.score,par:r.par,data:r});
    });
    all.sort(function(a,b){return b.date.localeCompare(a.date)});
    return all;
  }

  function render(){
    var all=getAllRounds();
    var html='<p style="font-size:12px;color:var(--text-muted);margin-bottom:14px">두 라운드를 선택해서 비교하세요</p>';
    if(sel[0]!==null&&sel[1]!==null){
      var a=all[sel[0]],b=all[sel[1]];
      html+='<div style="display:flex;gap:8px;align-items:stretch;margin-bottom:16px">';
      html+='<div class="v16-compare-col"><div class="v16-card" style="border-color:var(--primary);text-align:center"><h4 style="color:var(--primary)">'+a.course+'</h4><p>'+a.date+'</p><div style="font-size:28px;font-weight:900;margin:8px 0">'+a.score+'</div><div style="font-size:11px;color:var(--text-muted)">파 '+a.par+' | '+(a.score-a.par>=0?'+':'')+(a.score-a.par)+'</div></div></div>';
      html+='<div class="v16-compare-vs">VS</div>';
      html+='<div class="v16-compare-col"><div class="v16-card" style="border-color:var(--accent);text-align:center"><h4 style="color:var(--accent)">'+b.course+'</h4><p>'+b.date+'</p><div style="font-size:28px;font-weight:900;margin:8px 0">'+b.score+'</div><div style="font-size:11px;color:var(--text-muted)">파 '+b.par+' | '+(b.score-b.par>=0?'+':'')+(b.score-b.par)+'</div></div></div>';
      html+='</div>';
      if(a.type==='sc'&&b.type==='sc'){
        html+='<h4 style="font-size:13px;font-weight:700;margin-bottom:10px">홀별 비교</h4>';
        html+='<canvas id="v16CompareChart" width="700" height="180" style="width:100%;height:180px;background:var(--bg);border-radius:12px;margin-bottom:12px"></canvas>';
      }
      var metrics=[];
      if(a.type==='sc'){var fir1=a.data.fairways?a.data.fairways.filter(function(f){return f}).length:0;var gir1=a.data.greens?a.data.greens.filter(function(g){return g}).length:0;var putt1=a.data.putts?a.data.putts.reduce(function(s,v){return s+(v||0)},0):0;metrics.push({label:'FIR',v1:fir1+'/14',v2:'',better1:true},{label:'GIR',v1:gir1+'/18',v2:'',better1:true},{label:'퍼팅',v1:putt1,v2:'',better1:true})}
      if(b.type==='sc'){var fir2=b.data.fairways?b.data.fairways.filter(function(f){return f}).length:0;var gir2=b.data.greens?b.data.greens.filter(function(g){return g}).length:0;var putt2=b.data.putts?b.data.putts.reduce(function(s,v){return s+(v||0)},0):0;if(metrics.length>=3){metrics[0].v2=fir2+'/14';metrics[1].v2=gir2+'/18';metrics[2].v2=putt2}else{metrics.push({label:'FIR',v1:'',v2:fir2+'/14'},{label:'GIR',v1:'',v2:gir2+'/18'},{label:'퍼팅',v1:'',v2:putt2})}}
      if(metrics.length>0){metrics.forEach(function(m){html+='<div class="v16-stat-row"><span style="font-weight:700;color:var(--primary)">'+m.v1+'</span><span style="font-size:12px;color:var(--text-muted)">'+m.label+'</span><span style="font-weight:700;color:var(--accent)">'+m.v2+'</span></div>'})}
      html+='<button class="v16-btn v16-btn-secondary" onclick="window._v16CompReset()" style="margin-top:12px">다시 선택</button>';
    } else {
      all.forEach(function(r,i){
        var isA=sel[0]===i,isB=sel[1]===i;
        var border=isA?'var(--primary)':isB?'var(--accent)':'transparent';
        html+='<div class="v16-card" style="border-color:'+border+';cursor:pointer" onclick="window._v16CompSel('+i+')"><h4>'+r.course+' <span class="v16-badge" style="background:'+(r.score-r.par<=0?'var(--primary)':'var(--accent)')+';color:#fff">'+r.score+'&#xD0C0;</span></h4><p>'+r.date+' | 파'+r.par+' | '+(r.score-r.par>=0?'+':'')+(r.score-r.par)+'</p></div>';
      });
      if(all.length===0)html+='<div class="v16-card"><p>비교할 라운드 데이터가 없습니다. SG분석기 또는 스코어카드에서 라운드를 먼저 기록해주세요.</p></div>';
    }
    return html;
  }

  window._v16CompSel=function(i){
    if(sel[0]===null)sel[0]=i;else if(sel[1]===null&&sel[0]!==i){sel[1]=i;v16SFX('compare')}else return;
    document.querySelector('#v16CompOverlay .v16-content').innerHTML=render();
    setTimeout(v16DrawCompareChart,150);
  };
  window._v16CompReset=function(){sel=[null,null];document.querySelector('#v16CompOverlay .v16-content').innerHTML=render()};

  var ov=document.createElement('div');ov.id='v16CompOverlay';ov.className='v16-overlay';ov.setAttribute('role','dialog');
  ov.innerHTML='<div class="v16-modal"><div class="v16-hdr"><h2><span class="v16i">&#x2696;&#xFE0F;</span> &#xB77C;&#xC6B4;&#xB4DC; &#xBE44;&#xAD50;</h2><button class="v16-x" aria-label="닫기">&times;</button></div><div class="v16-content">'+render()+'</div></div>';
  document.body.appendChild(ov);
  ov.querySelector('.v16-x').addEventListener('click',function(){ov.classList.remove('active')});
  ov.addEventListener('click',function(e){if(e.target===ov)ov.classList.remove('active')});
}

function v16DrawCompareChart(){
  var c=document.getElementById('v16CompareChart');if(!c)return;
  var ctx=c.getContext('2d');var W=c.width,H=c.height;ctx.clearRect(0,0,W,H);
  var isDark=document.documentElement.getAttribute('data-theme')==='dark';
  var scorecards=(function(){try{return JSON.parse(localStorage.getItem('sg_v15_scorecards'))||[]}catch(e){return []}})();
  if(scorecards.length<2)return;
  var a=scorecards[scorecards.length-1],b=scorecards[scorecards.length-2];
  var pad={l:30,r:10,t:20,b:25};var barW=(W-pad.l-pad.r)/18/2.5;
  for(var h=0;h<18;h++){
    var x=pad.l+h*(W-pad.l-pad.r)/18;
    var sA=a.scores[h]||0,sB=b.scores[h]||0;
    var maxS=Math.max(sA,sB,6);
    var hA=(sA/maxS)*(H-pad.t-pad.b);var hB=(sB/maxS)*(H-pad.t-pad.b);
    ctx.fillStyle='rgba(26,122,58,.7)';ctx.fillRect(x,H-pad.b-hA,barW,hA);
    ctx.fillStyle='rgba(255,107,53,.7)';ctx.fillRect(x+barW+1,H-pad.b-hB,barW,hB);
    ctx.fillStyle=isDark?'#aaa':'#666';ctx.font='8px sans-serif';ctx.textAlign='center';
    ctx.fillText(''+(h+1),x+barW,H-pad.b+12);
  }
}

// ==========================================
// 3. COURSE CONDITION REPORTER
// ==========================================
function v16CourseCondition(){
  var reports=v16LS('condition_reports')||[];

  function render(){
    var html='<button class="v16-btn v16-btn-primary" onclick="window._v16CondNew()" style="margin-bottom:16px">+ &#xCF54;&#xC2A4; &#xCEE8;&#xB514;&#xC158; &#xB9AC;&#xD3EC;&#xD2B8;</button>';
    var cats=[{key:'fairway',label:'페어웨이',icon:'&#x1F33F;'},{key:'green',label:'그린',icon:'&#x26F3;'},{key:'rough',label:'러프',icon:'&#x1F33E;'},{key:'bunker',label:'벙커',icon:'&#x1F3DD;&#xFE0F;'},{key:'tee',label:'티박스',icon:'&#x1F3CC;&#xFE0F;'},{key:'facility',label:'부대시설',icon:'&#x1F3E0;'}];
    if(reports.length>0){
      html+='<h4 style="font-size:14px;font-weight:700;margin-bottom:10px">&#xCD5C;&#xADFC; &#xB9AC;&#xD3EC;&#xD2B8; ('+reports.length+')</h4>';
      reports.slice().reverse().forEach(function(r){
        var avgScore=0,cnt=0;
        cats.forEach(function(c){if(r.scores[c.key]){avgScore+=r.scores[c.key];cnt++}});
        var avg=cnt>0?Math.round(avgScore/cnt*10)/10:0;
        var stars='';for(var i=1;i<=5;i++)stars+=i<=Math.round(avg)?'&#x2B50;':'&#x2606;';
        html+='<div class="v16-card"><h4>'+r.course+' '+stars+' ('+avg+')</h4><p>'+r.date+' | ';
        cats.forEach(function(c){if(r.scores[c.key])html+=c.label+' '+r.scores[c.key]+'&#x2B50; '});
        html+='</p>';
        if(r.note)html+='<p style="margin-top:4px;font-style:italic">&quot;'+r.note+'&quot;</p>';
        html+='</div>';
      });
    }
    return html;
  }

  window._v16CondNew=function(){
    var cats=[{key:'fairway',label:'페어웨이'},{key:'green',label:'그린'},{key:'rough',label:'러프'},{key:'bunker',label:'벙커'},{key:'tee',label:'티박스'},{key:'facility',label:'부대시설'}];
    var html='<div style="display:flex;justify-content:space-between;margin-bottom:14px"><h4 style="font-size:14px;font-weight:700">&#xCF54;&#xC2A4; &#xCEE8;&#xB514;&#xC158; &#xC785;&#xB825;</h4><button class="v16-btn v16-btn-sm v16-btn-secondary" onclick="window._v16CondBack()">&#xBAA9;&#xB85D;</button></div>';
    html+='<input class="v16-input" id="v16CondCourse" placeholder="&#xACE8;&#xD504;&#xC7A5; &#xC774;&#xB984;" style="margin-bottom:10px">';
    html+='<input class="v16-input" id="v16CondDate" type="date" value="'+new Date().toISOString().split('T')[0]+'" style="margin-bottom:14px">';
    cats.forEach(function(c){
      html+='<div style="display:flex;align-items:center;gap:10px;margin-bottom:10px"><span style="width:70px;font-size:12px;font-weight:700">'+c.label+'</span><div class="v16-condition-stars" id="v16Stars_'+c.key+'">';
      for(var i=1;i<=5;i++)html+='<span class="v16-condition-star" data-key="'+c.key+'" data-val="'+i+'" onclick="window._v16CondStar(\''+c.key+'\','+i+')">&#x2606;</span>';
      html+='</div></div>';
    });
    html+='<textarea class="v16-textarea" id="v16CondNote" placeholder="&#xBA54;&#xBAA8; (&#xC120;&#xD0DD;)"></textarea>';
    html+='<button class="v16-btn v16-btn-primary" onclick="window._v16CondSave()" style="margin-top:12px">&#xB9AC;&#xD3EC;&#xD2B8; &#xC800;&#xC7A5;</button>';
    document.querySelector('#v16CondOverlay .v16-content').innerHTML=html;
  };
  window._v16CondBack=function(){document.querySelector('#v16CondOverlay .v16-content').innerHTML=render()};
  var condScores={};
  window._v16CondStar=function(key,val){
    condScores[key]=val;
    var container=document.getElementById('v16Stars_'+key);if(!container)return;
    var spans=container.querySelectorAll('.v16-condition-star');
    spans.forEach(function(s,i){s.innerHTML=i<val?'&#x2B50;':'&#x2606;'});
  };
  window._v16CondSave=function(){
    var course=document.getElementById('v16CondCourse').value.trim();
    if(!course){v16Toast('골프장 이름을 입력해주세요');return}
    reports.push({course:course,date:document.getElementById('v16CondDate').value,scores:Object.assign({},condScores),note:document.getElementById('v16CondNote').value.trim()});
    if(reports.length>50)reports=reports.slice(-50);
    v16LS('condition_reports',reports);condScores={};v16SFX('condition');v16Toast('코스 컨디션 리포트 저장!');v16CheckAchieve();
    document.querySelector('#v16CondOverlay .v16-content').innerHTML=render();
  };

  var ov=document.createElement('div');ov.id='v16CondOverlay';ov.className='v16-overlay';ov.setAttribute('role','dialog');
  ov.innerHTML='<div class="v16-modal"><div class="v16-hdr"><h2><span class="v16i">&#x1F33F;</span> &#xCF54;&#xC2A4; &#xCEE8;&#xB514;&#xC158;</h2><button class="v16-x" aria-label="닫기">&times;</button></div><div class="v16-content">'+render()+'</div></div>';
  document.body.appendChild(ov);
  ov.querySelector('.v16-x').addEventListener('click',function(){ov.classList.remove('active')});
  ov.addEventListener('click',function(e){if(e.target===ov)ov.classList.remove('active')});
}

// ==========================================
// 4. COURSE FLYOVER VIEWER (Canvas 9-Hole Map)
// ==========================================
function v16Flyover(){
  var holes=[
    {num:1,par:4,dist:380,shape:'dogleg-r',desc:'우측 도그레그. 페어웨이 좌측 공략. 베커 우측 주의.',tip:'드라이버 좌측 공략. 2번째 샷 7번 아이언.'},
    {num:2,par:3,dist:165,shape:'straight',desc:'짧은 파3. 그린 앞 베커 3개.',tip:'7번 아이언 정확히. 그린 센터 공략.'},
    {num:3,par:5,dist:520,shape:'dogleg-l',desc:'좌측 도그레그 파5. 워터해저드 좌측.',tip:'드라이버 우측. 워터 피해 레이업.'},
    {num:4,par:4,dist:410,shape:'straight',desc:'직선 파4. 긴 페어웨이. 그린 언듈레이션.',tip:'정확한 티샷 우선. 어프로치 그린 앞쪽.'},
    {num:5,par:4,dist:365,shape:'dogleg-r',desc:'우측 도그레그. 페어웨이 좁음.',tip:'3번 우드 안전. 웨지 어프로치.'},
    {num:6,par:3,dist:195,shape:'straight',desc:'파3. 바람 영향 큰 홀.',tip:'클럽 한 번호 위 선택. 바람 방향 체크.'},
    {num:7,par:5,dist:545,shape:'dogleg-l',desc:'긴 파5. 좌측 워터. 베커 연속.',tip:'2온 포기. 3회 안전 공략.'},
    {num:8,par:4,dist:395,shape:'straight',desc:'언덕 오르막. 그린 높은 위치.',tip:'한 클럽 여유. 어프로치 정확도 중요.'},
    {num:9,par:4,dist:425,shape:'dogleg-r',desc:'피니싱 홀. 우측 OB 주의.',tip:'안전한 티샷. 보기 만회 퍼팅.'}
  ];
  var selectedHole=null;

  function render(){
    var html='<canvas id="v16FlyoverCanvas" class="v16-flyover-canvas" width="700" height="320"></canvas>';
    if(selectedHole!==null){
      var h=holes[selectedHole];
      html+='<div class="v16-card" style="border-color:var(--primary)"><h4>'+h.num+'번 홀 | 파'+h.par+' | '+h.dist+'m</h4><p>'+h.desc+'</p><div class="v16-divider"></div><p><strong>&#x1F4A1; 공략 팁:</strong> '+h.tip+'</p></div>';
    } else {
      html+='<div class="v16-card"><p>&#x1F446; 홀을 클릭하면 상세 공략 정보를 볼 수 있습니다</p></div>';
    }
    return html;
  }

  function drawFlyover(){
    var c=document.getElementById('v16FlyoverCanvas');if(!c)return;
    var ctx=c.getContext('2d');var W=c.width,H=c.height;ctx.clearRect(0,0,W,H);
    var isDark=document.documentElement.getAttribute('data-theme')==='dark';
    ctx.fillStyle=isDark?'#1a3a25':'#c8e6c9';ctx.fillRect(0,0,W,H);
    var colW=W/9;
    holes.forEach(function(h,i){
      var cx=colW*i+colW/2,cy=H/2;
      ctx.fillStyle=isDark?'#2e7d32':'#66bb6a';ctx.beginPath();
      if(h.shape==='dogleg-r'){ctx.moveTo(cx-10,H-20);ctx.quadraticCurveTo(cx-10,cy,cx+15,30);ctx.lineTo(cx+25,30);ctx.quadraticCurveTo(cx+20,cy,cx+10,H-20)}
      else if(h.shape==='dogleg-l'){ctx.moveTo(cx+10,H-20);ctx.quadraticCurveTo(cx+10,cy,cx-15,30);ctx.lineTo(cx-25,30);ctx.quadraticCurveTo(cx-20,cy,cx-10,H-20)}
      else{ctx.moveTo(cx-12,H-20);ctx.lineTo(cx-12,30);ctx.lineTo(cx+12,30);ctx.lineTo(cx+12,H-20)}
      ctx.closePath();ctx.fill();
      ctx.fillStyle=isDark?'#388e3c':'#43a047';ctx.beginPath();ctx.arc(cx+(h.shape==='dogleg-r'?10:h.shape==='dogleg-l'?-10:0),40,14,0,Math.PI*2);ctx.fill();
      ctx.fillStyle='#fff';ctx.beginPath();ctx.arc(cx+(h.shape==='dogleg-r'?10:h.shape==='dogleg-l'?-10:0),40,3,0,Math.PI*2);ctx.fill();
      ctx.fillStyle='#fff3e0';ctx.beginPath();ctx.arc(cx,H-30,8,0,Math.PI*2);ctx.fill();
      if(h.shape==='dogleg-r'){ctx.fillStyle='#e0c080';ctx.beginPath();ctx.arc(cx+20,cy+20,8,0,Math.PI*2);ctx.fill()}
      else if(h.shape==='dogleg-l'){ctx.fillStyle='#e0c080';ctx.beginPath();ctx.arc(cx-20,cy+20,8,0,Math.PI*2);ctx.fill()}
      if(h.par===5&&(h.shape==='dogleg-l'||h.shape==='dogleg-r')){ctx.fillStyle='#42a5f5';ctx.beginPath();ctx.arc(cx+(h.shape==='dogleg-l'?15:-15),cy-10,6,0,Math.PI*2);ctx.fill()}
      if(selectedHole===i){ctx.strokeStyle='#ffd700';ctx.lineWidth=3;ctx.beginPath();ctx.arc(cx,cy,colW/2-5,0,Math.PI*2);ctx.stroke();ctx.lineWidth=1}
      ctx.fillStyle=isDark?'#fff':'#1a1a1a';ctx.font='bold 12px sans-serif';ctx.textAlign='center';
      ctx.fillText(h.num+'',cx,H-8);
      ctx.fillStyle=isDark?'rgba(255,255,255,.5)':'rgba(0,0,0,.4)';ctx.font='9px sans-serif';
      ctx.fillText('P'+h.par,cx,H-48);
    });
    c.onclick=function(e){
      var rect=c.getBoundingClientRect();
      var x=(e.clientX-rect.left)*(W/rect.width);
      var idx=Math.floor(x/colW);
      if(idx>=0&&idx<9){selectedHole=idx;v16SFX('flyover');v16CheckAchieve();document.querySelector('#v16FlyOverlay .v16-content').innerHTML=render();setTimeout(drawFlyover,50)}
    };
  }

  var ov=document.createElement('div');ov.id='v16FlyOverlay';ov.className='v16-overlay';ov.setAttribute('role','dialog');
  ov.innerHTML='<div class="v16-modal"><div class="v16-hdr"><h2><span class="v16i">&#x1F6E9;&#xFE0F;</span> &#xCF54;&#xC2A4; &#xD50C;&#xB77C;&#xC774;&#xC624;&#xBC84;</h2><button class="v16-x" aria-label="닫기">&times;</button></div><div class="v16-content">'+render()+'</div></div>';
  document.body.appendChild(ov);
  ov.querySelector('.v16-x').addEventListener('click',function(){ov.classList.remove('active')});
  ov.addEventListener('click',function(e){if(e.target===ov)ov.classList.remove('active')});
  var obs=new MutationObserver(function(){if(ov.classList.contains('active'))setTimeout(drawFlyover,150)});
  obs.observe(ov,{attributes:true,attributeFilter:['class']});
}

// ==========================================
// 5. GREEN READING SIMULATOR
// ==========================================
function v16GreenReader(){
  var putts=v16LS('green_putts')||{made:0,total:0};

  function render(){
    var html='<canvas id="v16GreenCanvas" class="v16-green-canvas" width="600" height="300"></canvas>';
    html+='<div class="v16-grid3" style="margin-bottom:12px">';
    html+='<div class="v16-card" style="text-align:center"><div style="font-size:20px;font-weight:900;color:var(--primary)">'+putts.made+'</div><div style="font-size:10px;color:var(--text-muted)">성공</div></div>';
    html+='<div class="v16-card" style="text-align:center"><div style="font-size:20px;font-weight:900;color:var(--accent)">'+putts.total+'</div><div style="font-size:10px;color:var(--text-muted)">시도</div></div>';
    html+='<div class="v16-card" style="text-align:center"><div style="font-size:20px;font-weight:900;color:var(--primary)">'+(putts.total>0?Math.round(putts.made/putts.total*100):0)+'%</div><div style="font-size:10px;color:var(--text-muted)">성공률</div></div>';
    html+='</div>';
    html+='<p style="font-size:12px;color:var(--text-muted);margin-bottom:8px">&#x1F3AF; 그린 위에서 클릭하면 볼이 구릅 방향으로 굴러갑니다. 경사를 읽고 컵을 노려보세요!</p>';
    html+='<button class="v16-btn v16-btn-secondary" onclick="window._v16GreenReset()">&#xD1B5;&#xACC4; &#xCD08;&#xAE30;&#xD654;</button>';
    return html;
  }

  window._v16GreenReset=function(){putts={made:0,total:0};v16LS('green_putts',putts);document.querySelector('#v16GreenOverlay .v16-content').innerHTML=render();setTimeout(drawGreen,100)};

  function drawGreen(){
    var c=document.getElementById('v16GreenCanvas');if(!c)return;
    var ctx=c.getContext('2d');var W=c.width,H=c.height;
    var isDark=document.documentElement.getAttribute('data-theme')==='dark';
    var slopeAngle=Math.random()*Math.PI*2;
    var slopeStrength=1+Math.random()*3;
    var holeX=W/2+Math.random()*100-50;var holeY=80+Math.random()*40;

    function drawScene(ballX,ballY,trail){
      ctx.clearRect(0,0,W,H);
      var grad=ctx.createRadialGradient(W/2,H/2,0,W/2,H/2,W/2);
      grad.addColorStop(0,isDark?'#2e7d32':'#66bb6a');grad.addColorStop(1,isDark?'#1b5e20':'#43a047');
      ctx.fillStyle=grad;ctx.beginPath();ctx.ellipse(W/2,H/2,W/2-10,H/2-10,0,0,Math.PI*2);ctx.fill();
      ctx.strokeStyle=isDark?'rgba(255,255,255,.1)':'rgba(0,0,0,.06)';ctx.lineWidth=1;
      for(var i=0;i<8;i++){
        var ang=slopeAngle+i*Math.PI/4;
        var len=120+slopeStrength*15;
        ctx.beginPath();ctx.moveTo(W/2,H/2);ctx.lineTo(W/2+Math.cos(ang)*len,H/2+Math.sin(ang)*len);ctx.stroke();
      }
      var arrowLen=30+slopeStrength*10;
      ctx.strokeStyle=isDark?'rgba(255,200,0,.5)':'rgba(180,120,0,.4)';ctx.lineWidth=2;
      ctx.beginPath();ctx.moveTo(W/2,H/2);ctx.lineTo(W/2+Math.cos(slopeAngle)*arrowLen,H/2+Math.sin(slopeAngle)*arrowLen);ctx.stroke();
      ctx.fillStyle=isDark?'rgba(255,200,0,.6)':'rgba(180,120,0,.5)';ctx.font='bold 10px sans-serif';ctx.textAlign='center';
      ctx.fillText('↓ 경사 '+slopeStrength.toFixed(1)+'\xB0',W/2+Math.cos(slopeAngle)*(arrowLen+15),H/2+Math.sin(slopeAngle)*(arrowLen+15));
      ctx.fillStyle='#111';ctx.beginPath();ctx.arc(holeX,holeY,6,0,Math.PI*2);ctx.fill();
      ctx.strokeStyle='#fff';ctx.lineWidth=1;ctx.beginPath();ctx.arc(holeX,holeY,8,0,Math.PI*2);ctx.stroke();
      ctx.fillStyle='#e53935';ctx.beginPath();ctx.arc(holeX,holeY-12,3,0,Math.PI*2);ctx.fill();
      ctx.strokeStyle='#e53935';ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(holeX,holeY-12);ctx.lineTo(holeX,holeY);ctx.stroke();
      if(trail&&trail.length>1){
        ctx.strokeStyle='rgba(255,255,255,.4)';ctx.lineWidth=1;ctx.setLineDash([3,3]);ctx.beginPath();
        trail.forEach(function(p,i){if(i===0)ctx.moveTo(p.x,p.y);else ctx.lineTo(p.x,p.y)});
        ctx.stroke();ctx.setLineDash([]);
      }
      if(ballX!==null){ctx.fillStyle='#fff';ctx.beginPath();ctx.arc(ballX,ballY,5,0,Math.PI*2);ctx.fill();ctx.strokeStyle='#ddd';ctx.lineWidth=1;ctx.beginPath();ctx.arc(ballX,ballY,5,0,Math.PI*2);ctx.stroke()}
    }
    drawScene(null,null,[]);

    c.onclick=function(e){
      var rect=c.getBoundingClientRect();
      var bx=(e.clientX-rect.left)*(W/rect.width);
      var by=(e.clientY-rect.top)*(H/rect.height);
      var dx=holeX-bx,dy=holeY-by;
      var dist=Math.sqrt(dx*dx+dy*dy);
      if(dist<10||dist>250)return;
      putts.total++;
      var trail=[{x:bx,y:by}];
      var vx=dx/dist*3;var vy=dy/dist*3;
      var cx=bx,cy=by;var steps=0;var made=false;
      var slopeFx=Math.cos(slopeAngle)*slopeStrength*0.02;
      var slopeFy=Math.sin(slopeAngle)*slopeStrength*0.02;
      while(steps<200){
        vx+=slopeFx;vy+=slopeFy;
        var speed=Math.sqrt(vx*vx+vy*vy);
        if(speed<0.1)break;
        vx*=0.985;vy*=0.985;
        cx+=vx;cy+=vy;
        trail.push({x:cx,y:cy});
        var dh=Math.sqrt((cx-holeX)*(cx-holeX)+(cy-holeY)*(cy-holeY));
        if(dh<8){made=true;break}
        steps++;
      }
      if(made){putts.made++;v16SFX('putt_sim');v16Toast('&#x1F3AF; 퍼팅 성공!')}
      else{v16SFX('quiz3_wrong');v16Toast('&#x274C; 미스! 경사를 더 읽어보세요')}
      v16LS('green_putts',putts);v16CheckAchieve();
      drawScene(cx,cy,trail);
      setTimeout(function(){
        slopeAngle=Math.random()*Math.PI*2;slopeStrength=1+Math.random()*3;
        holeX=W/2+Math.random()*100-50;holeY=80+Math.random()*40;
        document.querySelector('#v16GreenOverlay .v16-content').innerHTML=render();setTimeout(drawGreen,100);
      },1500);
    };
  }

  var ov=document.createElement('div');ov.id='v16GreenOverlay';ov.className='v16-overlay';ov.setAttribute('role','dialog');
  ov.innerHTML='<div class="v16-modal"><div class="v16-hdr"><h2><span class="v16i">&#x26F3;</span> &#xADF8;&#xB9B0; &#xB9AC;&#xB529; &#xC2DC;&#xBBAC;&#xB808;&#xC774;&#xD130;</h2><button class="v16-x" aria-label="닫기">&times;</button></div><div class="v16-content">'+render()+'</div></div>';
  document.body.appendChild(ov);
  ov.querySelector('.v16-x').addEventListener('click',function(){ov.classList.remove('active')});
  ov.addEventListener('click',function(e){if(e.target===ov)ov.classList.remove('active')});
  var obs=new MutationObserver(function(){if(ov.classList.contains('active'))setTimeout(drawGreen,150)});
  obs.observe(ov,{attributes:true,attributeFilter:['class']});
}

// ==========================================
// 6. EQUIPMENT COMPARISON ENGINE
// ==========================================
function v16EquipCompare(){
  var equipment={
    drivers:[
      {name:'TaylorMade Qi35',loft:'9-12\xB0',shaft:'Fujikura Ventus',speed:'빠름',forgive:5,dist:5,feel:4,price:'₩699,000',icon:'&#x1F3CC;&#xFE0F;'},
      {name:'Callaway Paradym Ai',loft:'9-12\xB0',shaft:'Project X HZRDUS',speed:'빠름',forgive:4,dist:5,feel:5,price:'₩649,000',icon:'&#x1F3CC;&#xFE0F;'},
      {name:'Titleist TSR4',loft:'8-11\xB0',shaft:'TENSEI 1K Pro',speed:'빠름',forgive:3,dist:5,feel:5,price:'₩599,000',icon:'&#x1F3CC;&#xFE0F;'},
      {name:'Ping G440',loft:'9-12\xB0',shaft:'PING Alta CB',speed:'보통',forgive:5,dist:4,feel:4,price:'₩549,000',icon:'&#x1F3CC;&#xFE0F;'},
      {name:'Cobra Darkspeed',loft:'9-12\xB0',shaft:'MCA Kai\'li',speed:'보통',forgive:4,dist:4,feel:4,price:'₩499,000',icon:'&#x1F3CC;&#xFE0F;'}
    ],
    irons:[
      {name:'Mizuno JPX925 Forged',type:'단조',loft:'28-46\xB0',shaft:'Dynamic Gold',forgive:4,feel:5,dist:4,price:'₩1,200,000',icon:'&#x1F4CD;'},
      {name:'TaylorMade P790',type:'중공',loft:'26-44\xB0',shaft:'KBS Tour Lite',forgive:5,feel:4,dist:5,price:'₩1,400,000',icon:'&#x1F4CD;'},
      {name:'Titleist T200',type:'중공',loft:'27-45\xB0',shaft:'AMT Black',forgive:4,feel:5,dist:4,price:'₩1,300,000',icon:'&#x1F4CD;'},
      {name:'Callaway Apex Pro',type:'단조',loft:'27-45\xB0',shaft:'True Temper Elevate',forgive:4,feel:5,dist:4,price:'₩1,350,000',icon:'&#x1F4CD;'},
      {name:'Cleveland Launcher XL Halo',type:'캐비티',loft:'25-43\xB0',shaft:'Action Ultralite',forgive:5,feel:3,dist:5,price:'₩900,000',icon:'&#x1F4CD;'}
    ],
    balls:[
      {name:'Titleist Pro V1',layers:'4손',spin:'높음',feel:'부드러움',level:'상급',price:'₩65,000/더즈',icon:'&#x26BE;'},
      {name:'Callaway Chrome Soft',layers:'4손',spin:'중간',feel:'부드러움',level:'상급',price:'₩55,000/더즈',icon:'&#x26BE;'},
      {name:'TaylorMade TP5x',layers:'5손',spin:'낮음',feel:'단단함',level:'상급',price:'₩60,000/더즈',icon:'&#x26BE;'},
      {name:'Bridgestone Tour B X',layers:'3손',spin:'중간',feel:'중간',level:'중급',price:'₩45,000/더즈',icon:'&#x26BE;'},
      {name:'Srixon Z-Star',layers:'3손',spin:'높음',feel:'부드러움',level:'중급',price:'₩40,000/더즈',icon:'&#x26BE;'}
    ]
  };
  var activeCategory='drivers';
  var selected=[];

  function render(){
    var html='<div class="v16-tabs">';
    [{k:'drivers',l:'드라이버'},{k:'irons',l:'아이언'},{k:'balls',l:'골프볼'}].forEach(function(t){
      html+='<div class="v16-tab'+(activeCategory===t.k?' active':'')+'" data-cat="'+t.k+'">'+t.l+'</div>';
    });
    html+='</div>';
    var items=equipment[activeCategory];
    if(selected.length===2){
      var a=items[selected[0]],b=items[selected[1]];
      html+='<div style="display:flex;gap:8px;align-items:stretch;margin-bottom:16px">';
      html+='<div class="v16-compare-col"><div class="v16-card" style="border-color:var(--primary);text-align:center"><div style="font-size:28px;margin-bottom:6px">'+a.icon+'</div><h4 style="font-size:13px">'+a.name+'</h4><p>'+a.price+'</p></div></div>';
      html+='<div class="v16-compare-vs">VS</div>';
      html+='<div class="v16-compare-col"><div class="v16-card" style="border-color:var(--accent);text-align:center"><div style="font-size:28px;margin-bottom:6px">'+b.icon+'</div><h4 style="font-size:13px">'+b.name+'</h4><p>'+b.price+'</p></div></div>';
      html+='</div>';
      var specs=[];
      if(activeCategory==='drivers'){specs=[{l:'관용성',a:a.forgive,b:b.forgive},{l:'비거리',a:a.dist,b:b.dist},{l:'타감',a:a.feel,b:b.feel}]}
      else if(activeCategory==='irons'){specs=[{l:'관용성',a:a.forgive,b:b.forgive},{l:'비거리',a:a.dist,b:b.dist},{l:'타감',a:a.feel,b:b.feel}]}
      else{specs=[{l:'스핀',a:a.spin==='높음'?5:a.spin==='중간'?3:1,b:b.spin==='높음'?5:b.spin==='중간'?3:1},{l:'내구성',a:parseInt(a.layers)||3,b:parseInt(b.layers)||3}]}
      specs.forEach(function(s){
        html+='<div class="v16-stat-row"><div style="display:flex;align-items:center;gap:6px"><span style="font-weight:700;color:var(--primary);width:20px;text-align:center">'+s.a+'</span><div style="width:60px;height:8px;background:var(--border);border-radius:4px;overflow:hidden"><div style="width:'+(s.a*20)+'%;height:100%;background:var(--primary);border-radius:4px"></div></div></div>';
        html+='<span style="font-size:12px;font-weight:600">'+s.l+'</span>';
        html+='<div style="display:flex;align-items:center;gap:6px"><div style="width:60px;height:8px;background:var(--border);border-radius:4px;overflow:hidden;direction:rtl"><div style="width:'+(s.b*20)+'%;height:100%;background:var(--accent);border-radius:4px"></div></div><span style="font-weight:700;color:var(--accent);width:20px;text-align:center">'+s.b+'</span></div></div>';
      });
      html+='<button class="v16-btn v16-btn-secondary" onclick="window._v16EqReset()" style="margin-top:12px">다시 선택</button>';
    } else {
      html+='<p style="font-size:12px;color:var(--text-muted);margin-bottom:10px">비교할 장비 2개를 선택하세요</p>';
      html+='<div class="v16-grid2">';
      items.forEach(function(item,i){
        var isSel=selected.indexOf(i)>=0;
        html+='<div class="v16-equip-card'+(isSel?' selected':'')+'" onclick="window._v16EqSel('+i+')"><div class="v16-equip-icon">'+item.icon+'</div><div class="v16-equip-name">'+item.name+'</div><div class="v16-equip-spec">'+item.price+'</div></div>';
      });
      html+='</div>';
    }
    return html;
  }

  window._v16EqSel=function(i){
    if(selected.indexOf(i)>=0)return;
    selected.push(i);
    if(selected.length===2)v16SFX('equip');
    v16CheckAchieve();
    document.querySelector('#v16EqOverlay .v16-content').innerHTML=render();
  };
  window._v16EqReset=function(){selected=[];document.querySelector('#v16EqOverlay .v16-content').innerHTML=render()};

  var ov=document.createElement('div');ov.id='v16EqOverlay';ov.className='v16-overlay';ov.setAttribute('role','dialog');
  ov.innerHTML='<div class="v16-modal"><div class="v16-hdr"><h2><span class="v16i">&#x1F3CC;&#xFE0F;</span> &#xC7A5;&#xBE44; &#xBE44;&#xAD50;</h2><button class="v16-x" aria-label="닫기">&times;</button></div><div class="v16-content">'+render()+'</div></div>';
  document.body.appendChild(ov);
  ov.querySelector('.v16-x').addEventListener('click',function(){ov.classList.remove('active')});
  ov.addEventListener('click',function(e){if(e.target===ov)ov.classList.remove('active')});
  ov.querySelector('.v16-content').addEventListener('click',function(e){
    var tab=e.target.closest('.v16-tab');if(!tab)return;
    activeCategory=tab.dataset.cat;selected=[];
    document.querySelector('#v16EqOverlay .v16-content').innerHTML=render();
  });
}

// ==========================================
// 7. MONTHLY ROUND SUMMARY
// ==========================================
function v16MonthlySummary(){
  var currentMonth=new Date().getMonth();
  var currentYear=new Date().getFullYear();

  function getAllRoundDates(){
    var dates={};
    var scs=(function(){try{return JSON.parse(localStorage.getItem('sg_v15_scorecards'))||[]}catch(e){return[]}})();
    scs.forEach(function(sc){if(sc.date)dates[sc.date]={score:sc.scores.reduce(function(s,v){return s+(v||0)},0),course:sc.course}});
    var sgr=v16LS('sg_rounds')||[];
    sgr.forEach(function(r){if(r.date)dates[r.date]={score:r.score,course:r.course}});
    return dates;
  }

  function render(){
    var allDates=getAllRoundDates();
    var months=['\x31월','\x32월','\x33월','\x34월','\x35월','\x36월','\x37월','\x38월','\x39월','\x31\x30월','\x31\x31월','\x31\x32월'];
    var html='<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px"><button class="v16-btn v16-btn-sm v16-btn-secondary" onclick="window._v16MonthPrev()">&lt;</button><h4 style="font-size:16px;font-weight:800">'+currentYear+'년 '+months[currentMonth]+'</h4><button class="v16-btn v16-btn-sm v16-btn-secondary" onclick="window._v16MonthNext()">&gt;</button></div>';
    var dayNames=['일','월','화','수','목','금','토'];
    html+='<div class="v16-month-grid">';
    dayNames.forEach(function(d){html+='<div class="v16-month-hdr">'+d+'</div>'});
    var firstDay=new Date(currentYear,currentMonth,1).getDay();
    var daysInMonth=new Date(currentYear,currentMonth+1,0).getDate();
    var today=new Date();var todayStr=today.toISOString().split('T')[0];
    for(var i=0;i<firstDay;i++)html+='<div class="v16-month-day"></div>';
    var monthRounds=0,monthScores=[];
    for(var d=1;d<=daysInMonth;d++){
      var dateStr=currentYear+'-'+String(currentMonth+1).padStart(2,'0')+'-'+String(d).padStart(2,'0');
      var hasRound=allDates[dateStr];
      var isToday=dateStr===todayStr;
      var cls='v16-month-day';
      if(hasRound){cls+=' played';monthRounds++;monthScores.push(hasRound.score)}
      if(isToday)cls+=' today';
      html+='<div class="'+cls+'" title="'+(hasRound?hasRound.course+' '+hasRound.score+'타':'')+'">'+d+(hasRound?'<div style="font-size:8px">'+(hasRound.score||'')+'</div>':'')+'</div>';
    }
    html+='</div>';
    var avgScore=monthScores.length>0?Math.round(monthScores.reduce(function(s,v){return s+v},0)/monthScores.length):0;
    var bestScore=monthScores.length>0?Math.min.apply(null,monthScores):0;
    html+='<div class="v16-grid3">';
    html+='<div class="v16-card" style="text-align:center"><div style="font-size:24px;font-weight:900;color:var(--primary)">'+monthRounds+'</div><div style="font-size:11px;color:var(--text-muted)">라운드</div></div>';
    html+='<div class="v16-card" style="text-align:center"><div style="font-size:24px;font-weight:900;color:var(--primary)">'+(avgScore||'-')+'</div><div style="font-size:11px;color:var(--text-muted)">평균</div></div>';
    html+='<div class="v16-card" style="text-align:center"><div style="font-size:24px;font-weight:900;color:var(--accent)">'+(bestScore||'-')+'</div><div style="font-size:11px;color:var(--text-muted)">베스트</div></div>';
    html+='</div>';
    var yearRounds=0,yearScores=[];
    Object.keys(allDates).forEach(function(d){if(d.startsWith(currentYear+'')){yearRounds++;yearScores.push(allDates[d].score)}});
    html+='<div class="v16-divider"></div>';
    html+='<h4 style="font-size:13px;font-weight:700;margin-bottom:10px">'+currentYear+'년 연간 요약</h4>';
    html+='<div class="v16-grid3">';
    html+='<div class="v16-card" style="text-align:center"><div style="font-size:20px;font-weight:900;color:var(--primary)">'+yearRounds+'</div><div style="font-size:10px;color:var(--text-muted)">연간 라운드</div></div>';
    var yAvg=yearScores.length>0?Math.round(yearScores.reduce(function(s,v){return s+v},0)/yearScores.length):0;
    html+='<div class="v16-card" style="text-align:center"><div style="font-size:20px;font-weight:900;color:var(--primary)">'+(yAvg||'-')+'</div><div style="font-size:10px;color:var(--text-muted)">연간 평균</div></div>';
    var yBest=yearScores.length>0?Math.min.apply(null,yearScores):0;
    html+='<div class="v16-card" style="text-align:center"><div style="font-size:20px;font-weight:900;color:var(--accent)">'+(yBest||'-')+'</div><div style="font-size:10px;color:var(--text-muted)">연간 베스트</div></div>';
    html+='</div>';
    return html;
  }

  window._v16MonthPrev=function(){currentMonth--;if(currentMonth<0){currentMonth=11;currentYear--}v16SFX('monthly');document.querySelector('#v16MonthOverlay .v16-content').innerHTML=render()};
  window._v16MonthNext=function(){currentMonth++;if(currentMonth>11){currentMonth=0;currentYear++}v16SFX('monthly');document.querySelector('#v16MonthOverlay .v16-content').innerHTML=render()};

  var ov=document.createElement('div');ov.id='v16MonthOverlay';ov.className='v16-overlay';ov.setAttribute('role','dialog');
  ov.innerHTML='<div class="v16-modal"><div class="v16-hdr"><h2><span class="v16i">&#x1F4C5;</span> &#xC6D4;&#xAC04; &#xB77C;&#xC6B4;&#xB4DC; &#xC11C;&#xBA38;&#xB9AC;</h2><button class="v16-x" aria-label="닫기">&times;</button></div><div class="v16-content">'+render()+'</div></div>';
  document.body.appendChild(ov);
  ov.querySelector('.v16-x').addEventListener('click',function(){ov.classList.remove('active')});
  ov.addEventListener('click',function(e){if(e.target===ov)ov.classList.remove('active')});
}

// ==========================================
// 8. GOLF NEWS & TIPS FEED
// ==========================================
function v16NewsFeed(){
  var articles=[
    {cat:'팁',tag:'#스윙',tagColor:'#e53935',icon:'&#x1F3CC;&#xFE0F;',title:'백스윙 vs 다운스윙: 언제 어떤 스윙을?',body:'바람이 역풍일 때 낮은 탄도의 백스윙이 유리. 순풍에는 다운스윙으로 캐리를 최대화하세요.'},
    {cat:'전략',tag:'#코스공략',tagColor:'#2196f3',icon:'&#x1F4CB;',title:'파5 홀 공략법: 2온 vs 3온',body:'나의 평균 비거리가 450m 이상이면 2온 도전. 420m 미만이면 3번에 나누어 안전하게.'},
    {cat:'피팅',tag:'#클럽피팅',tagColor:'#4caf50',icon:'&#x1F527;',title:'클럽 피팅 체크리스트 5가지',body:'1.그립 사이즈 2.샤프트 플렉스 3.라이각 4.헤드 무게 5.바운스 바란스'},
    {cat:'건강',tag:'#컨디셔닝',tagColor:'#ff9800',icon:'&#x1F4AA;',title:'라운드 전 10분 스트레칭 루틴',body:'목/어긨/허리/햇스트링 각 2분. 스윙 가동범위 확보와 부상 예방에 필수.'},
    {cat:'퍼팅',tag:'#퍼팅기술',tagColor:'#9c27b0',icon:'&#x1F3AF;',title:'퍼팅 거리감 향상 드릴 3가지',body:'1.눈을 감고 3m 퍼팅 연습 2.클럽을 다른 손으로 바꿔 퍼팅 3.경사 읽기 후 눈 감고 치기'},
    {cat:'용어',tag:'#골프용어',tagColor:'#607d8b',icon:'&#x1F4DA;',title:'GIR vs FIR: 정확한 의미와 목표치',body:'FIR(Fairway In Regulation): 파3제외 14홀 페어웨이 안착률. 프로 평균 62%. GIR: 규정타수 이내 그린 적중. 프로 65%.'},
    {cat:'시즌',tag:'#여름골프',tagColor:'#00bcd4',icon:'&#x2600;&#xFE0F;',title:'여름철 라운딩 필수 준비물',body:'선크림 SPF50+, 손바닥 그립, 손풀림 타웰, 얼음물 2L+. 기온 35도 이상이면 얼리티 고려.'},
    {cat:'장비',tag:'#신제품',tagColor:'#e91e63',icon:'&#x1F3CC;&#xFE0F;',title:'2026 신형 드라이버 트렌드',body:'AI 설계 페이스, 카본 코포지트 보디, 가변 로프트 시스템. 관용성과 비거리 동시 추구.'},
    {cat:'멘탈',tag:'#멘탈게임',tagColor:'#795548',icon:'&#x1F9E0;',title:'미스 샷 후 멘탈 리셋 방법',body:'3초 호흡법: 코로 3초 들이쉬고 3초 참고 3초 내쉬기. 다음 샷에만 집중.'},
    {cat:'연습',tag:'#드라이빙레인지',tagColor:'#3f51b5',icon:'&#x1F3AF;',title:'효과적인 드라이빙 레인지 연습법',body:'무조건 풀스윙은 금물. 타겟 방향 설정 → 하프스윙 5개 → 풀스윙 5개 → 고치고 반복.'},
    {cat:'규칙',tag:'#골프규칙',tagColor:'#f44336',icon:'&#x1F4D6;',title:'2024 규칙 변경 사항 요약',body:'볼 수색 3분 → 변경 없음. 번커 안 미고정 장애물 구제 변경. 캐디 미사용 시 패널티 조정.'},
    {cat:'역사',tag:'#골프역사',tagColor:'#ff5722',icon:'&#x1F3C6;',title:'한국 골프 역사적 순간 TOP 5',body:'1.박세리 마스터즈 2008 2.최경주 LPGA 투어 3.배상문 PGA 4.임성재 프레지던칿 5.양용은 PGA'},
    {cat:'영양',tag:'#라운드영양',tagColor:'#8bc34a',icon:'&#x1F34E;',title:'라운드 중 영양 보충 타이밍',body:'1번홀 후: 바나나 + 물. 5번홀: 에너지바 + 전해질 음료. 10번홀: 견과류 + 사탕. 14번홀: 간식.'},
    {cat:'에티켓',tag:'#매너',tagColor:'#009688',icon:'&#x1F91D;',title:'초보자가 반드시 알아야 할 에티켓 7',body:'1.디벗 수리 2.페이스 유지 3.카트 경로 준수 4.조용히 5.버발 독려 6.시간엄수 7.안전 확인'},
    {cat:'팁',tag:'#스코어',tagColor:'#673ab7',icon:'&#x1F4CA;',title:'스코어 10타 줄이는 즉시 적용 팁 3가지',body:'1.파3 홀 원퍼팅 목표 2.파4 홀 보기퍼팅 허용 3.파5 홀 3번째 샷 웨지 거리 확보.'},
    {cat:'장비',tag:'#웨지',tagColor:'#ff6b35',icon:'&#x26F3;',title:'웨지 바운스각 선택 가이드',body:'46도(PW): 풀스윙. 50도(AW): 갑피치. 54도(SW): 벙커/칩. 58도(LW): 플롭. 60도: 상급자 전용.'}
  ];
  var selectedArticle=null;
  var readArticles=v16LS('read_articles')||{};

  function render(){
    var html='';
    if(selectedArticle!==null){
      var a=articles[selectedArticle];
      readArticles[selectedArticle]=true;v16LS('read_articles',readArticles);
      html+='<button class="v16-btn v16-btn-sm v16-btn-secondary" onclick="window._v16NewsBack()" style="margin-bottom:14px">&larr; 목록</button>';
      html+='<div class="v16-card" style="border-color:var(--primary)"><span class="v16-news-tag" style="background:'+a.tagColor+';color:#fff">'+a.tag+'</span><h4 style="font-size:18px;margin-top:8px">'+a.icon+' '+a.title+'</h4><div class="v16-divider"></div><p style="font-size:14px;line-height:2">'+a.body+'</p></div>';
    } else {
      var readCount=Object.keys(readArticles).length;
      html+='<div class="v16-progress" style="margin-bottom:14px"><div class="v16-progress-fill" style="width:'+(readCount/articles.length*100)+'%;background:var(--primary)"></div></div>';
      html+='<p style="font-size:11px;color:var(--text-muted);margin-bottom:14px">'+readCount+'/'+articles.length+'개 읽음</p>';
      articles.forEach(function(a,i){
        var isRead=readArticles[i];
        html+='<div class="v16-news-item" onclick="window._v16NewsRead('+i+')" style="'+(isRead?'opacity:.6':'')+'"><div class="v16-news-icon" style="background:'+a.tagColor+'20;color:'+a.tagColor+'">'+a.icon+'</div><div class="v16-news-body"><span class="v16-news-tag" style="background:'+a.tagColor+';color:#fff">'+a.tag+'</span>'+(isRead?' <span style="font-size:9px;color:var(--text-muted)">✓</span>':'')+'<div class="v16-news-title">'+a.title+'</div><div class="v16-news-desc">'+a.body.substring(0,50)+'...</div></div></div>';
      });
    }
    return html;
  }

  window._v16NewsRead=function(i){selectedArticle=i;v16SFX('news');v16CheckAchieve();document.querySelector('#v16NewsOverlay .v16-content').innerHTML=render()};
  window._v16NewsBack=function(){selectedArticle=null;document.querySelector('#v16NewsOverlay .v16-content').innerHTML=render()};

  var ov=document.createElement('div');ov.id='v16NewsOverlay';ov.className='v16-overlay';ov.setAttribute('role','dialog');
  ov.innerHTML='<div class="v16-modal"><div class="v16-hdr"><h2><span class="v16i">&#x1F4F0;</span> &#xACE8;&#xD504; &#xB274;&#xC2A4; &amp; &#xD301;</h2><button class="v16-x" aria-label="닫기">&times;</button></div><div class="v16-content">'+render()+'</div></div>';
  document.body.appendChild(ov);
  ov.querySelector('.v16-x').addEventListener('click',function(){ov.classList.remove('active')});
  ov.addEventListener('click',function(e){if(e.target===ov)ov.classList.remove('active')});
}

// ==========================================
// 9. GOLF QUIZ v3 (Strategy & Management)
// ==========================================
function v16Quiz(){
  var questions=[
    {q:'퍼팅 시 &quot;그린 스피드&quot;를 판단하는 가장 중요한 요소는?',o:['바람 방향','그린 경사와 잔디 결','볼의 색상','홈 번호'],a:1,exp:'그린 스피드는 잔디의 결(그레인)과 경사도에 가장 크게 영향을 받습니다.'},
    {q:'Strokes Gained 분석에서 가장 개선 효과가 큰 영역은?',o:['퍼팅','티샷','어프로치','숟게임'],a:0,exp:'PGA 투어 데이터상 퍼팅이 프로와 아마추어 간 가장 큰 차이를 보입니다.'},
    {q:'코스 매니지먼트에서 &quot;레이업&quot;이란?',o:['티샷 후 공이 멈춘 위치','피니싱 홀 기록','카트 이동 경로','그린 앞 벙커 위치'],a:0,exp:'레이업은 티샷 후 공이 페어웨이/러프/벙커 어디에 멈출는지를 의미합니다.'},
    {q:'GIR이 50%인 골퍼의 예상 평균 퍼팅 수는?',o:['30개','33개','36개','40개'],a:2,exp:'GIR 50%이면 9홀 그린 적중. 나머지 9홀에서 칩+퍼팅. 평균 2퍼팅 기준 36개 예상.'},
    {q:'바람이 좌측에서 우측으로 불 때 드라이버 타겟은?',o:['더 좌측으로','더 우측으로','정확히 중앙','바람과 무관'],a:0,exp:'좌풍에서는 볼이 우측으로 밀리므로, 바람을 향해 좌측을 공략합니다.'},
    {q:'FIR(Fairway In Regulation)에서 파3 홀은?',o:['포함됨','제외됨','선택적','경기 방식에 따라 다름'],a:1,exp:'파3 홀에서는 티샷이 그린을 향하므로 FIR 통계에서 제외합니다.'},
    {q:'슬로프 레이팅(Slope Rating)이 높을수록?',o:['코스가 쉬움','고핸디캐퍼에게 더 어려움','페어웨이가 넓음','보기 골퍼에게 더 어려움'],a:3,exp:'슬로프 레이팅은 보기 골퍼에게 코스가 얼마나 어려운지를 나타냅니다. 55(쉽음)~155(어려움).'},
    {q:'벙커 샷에서 클럽페이스를 열어야 하는 이유는?',o:['볼을 높이 띄우기 위해','모래를 먼저 치기 위해','볼을 낮게 뽑기 위해','스핀을 줄이기 위해'],a:1,exp:'벙커에서는 클럽페이스를 열어 모래를 먼저 치고, 볼을 모래와 함께 탈출시킵니다.'},
    {q:'어프로치 샷에서 핀을 공략하는 것과 그린 센터를 공략하는 것 중 평균 스코어에 더 유리한 것은?',o:['핀 공략','그린 센터 공략','동일함','상황에 따라 다름'],a:1,exp:'통계적으로 그린 센터 공략이 미스 시에도 보기 추급 이내로 마무리할 확률이 높습니다.'},
    {q:'업힌다운(Up & Down) 성공률 40%의 핸디캔 수준은?',o:['5~10','\x31\x30~\x31\x35','\x31\x35~\x32\x30','\x32\x30~\x32\x35'],a:2,exp:'업힌다운 40%는 아마추어 평균 수준으로, 핸디캔 15~20 범위에 해당합니다.'},
    {q:'라운드 중 &quot;투두 리스트&quot;란?',o:['핀 위치 목록','할 일 목록','골프 식단 메뉴','클럽 선택 목록'],a:0,exp:'투두 리스트는 홈 별로 핀 위치를 미리 계획하는 코스 매니지먼트 전략입니다.'},
    {q:'스크램블 보기(연습 라운드에서 사용) 형식은?',o:['모든 홀을 순서대로 플레이','난이도별로 홀을 선택해 플레이','최악의 홀만 반복 플레이','프로와 함께 플레이'],a:2,exp:'스크램블 보기는 가장 못한 홀만 골라 반복 연습하는 방법으로, 약점 개선에 효과적입니다.'},
    {q:'핀이 좌측 앞쪽에 있을 때 어프로치 전략은?',o:['핀을 정확히 공략','핀의 반대쪽 공략','핀 너머 공략','그린 좌측 여유 공략'],a:3,exp:'핀이 좌측 앞에 있으면 좌측에 여유를 두고 공략하여 미스 시에도 안전하게 마무리합니다.'},
    {q:'라운드에서 부정적 생각이 들 때 가장 효과적인 멘탈 기법은?',o:['이전 샷 여전히 생각하기','결과물 예상하기','현재 샷에만 집중하는 프리샷 루틴','빠르게 치고 넘어가기'],a:2,exp:'프리샷 루틴(타겟 설정 → 연습 스윙 → 어드레스 → 실행)이 멘탈 리셋에 가장 효과적입니다.'},
    {q:'내리막 퍼팅에서 볼의 스피드는?',o:['오르막보다 빠름','오르막보다 느림','같음','경사에 따라 다름'],a:0,exp:'내리막 퍼팅은 중력의 영향으로 볼 스피드가 빨라지므로, 큌력을 줄여야 합니다.'}
  ];
  var currentQ=0,score=0,answered=false,answers=[];

  function render(){
    if(currentQ>=questions.length){
      var grade=score>=14?'S':score>=12?'A':score>=10?'B':score>=7?'C':'D';
      var gradeColor={S:'#ffd700',A:'#c0c0c0',B:'#cd7f32',C:'#4caf50',D:'#ff4444'}[grade];
      var html='<div style="text-align:center;padding:30px"><div style="font-size:48px;margin-bottom:10px">&#x1F3C6;</div>';
      html+='<h3 style="font-size:24px;font-weight:900;margin-bottom:10px">퀴즈 v3 완료!</h3>';
      html+='<div style="font-size:42px;font-weight:900;color:var(--primary)">'+score+'/'+questions.length+'</div>';
      html+='<div class="v16-badge" style="background:'+gradeColor+';color:#fff;font-size:16px;padding:6px 20px;margin-top:10px">'+grade+'등급</div>';
      html+='<div class="v16-divider"></div>';
      html+='<button class="v16-btn v16-btn-primary" onclick="window._v16Quiz3Reset()">다시 도전</button></div>';
      v16CheckAchieve();
      return html;
    }
    var q=questions[currentQ];
    var html='<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px"><span class="v16-badge" style="background:var(--primary-light);color:var(--primary)">'+(currentQ+1)+'/'+questions.length+'</span><span style="font-size:13px;font-weight:700;color:var(--primary)">'+score+'점</span></div>';
    html+='<div class="v16-card" style="border-color:var(--primary)"><h4>Q'+(currentQ+1)+'. '+q.q+'</h4></div>';
    q.o.forEach(function(opt,i){
      var cls='v16-quiz-option';
      if(answered){if(i===q.a)cls+=' correct';else if(answers[currentQ]===i&&i!==q.a)cls+=' wrong'}
      html+='<button class="'+cls+'" data-idx="'+i+'" '+(answered?'disabled':'')+'>'+opt+'</button>';
    });
    if(answered){
      html+='<div class="v16-card" style="margin-top:10px"><p><strong>&#x1F4A1; 해설:</strong> '+q.exp+'</p></div>';
      html+='<button class="v16-btn v16-btn-primary" onclick="window._v16Quiz3Next()" style="margin-top:10px">'+(currentQ<questions.length-1?'다음 문제':'결과 보기')+'</button>';
    }
    return html;
  }

  window._v16Quiz3Answer=function(i){if(answered)return;answered=true;answers[currentQ]=i;if(i===questions[currentQ].a){score++;v16SFX('quiz3')}else{v16SFX('quiz3_wrong')}document.querySelector('#v16Quiz3Overlay .v16-content').innerHTML=render()};
  window._v16Quiz3Next=function(){currentQ++;answered=false;document.querySelector('#v16Quiz3Overlay .v16-content').innerHTML=render()};
  window._v16Quiz3Reset=function(){currentQ=0;score=0;answered=false;answers=[];document.querySelector('#v16Quiz3Overlay .v16-content').innerHTML=render()};

  var ov=document.createElement('div');ov.id='v16Quiz3Overlay';ov.className='v16-overlay';ov.setAttribute('role','dialog');
  ov.innerHTML='<div class="v16-modal"><div class="v16-hdr"><h2><span class="v16i">&#x1F9E0;</span> &#xACE8;&#xD504; &#xC804;&#xB7B5; &#xD034;&#xC988; v3</h2><button class="v16-x" aria-label="닫기">&times;</button></div><div class="v16-content">'+render()+'</div></div>';
  document.body.appendChild(ov);
  ov.querySelector('.v16-x').addEventListener('click',function(){ov.classList.remove('active')});
  ov.addEventListener('click',function(e){if(e.target===ov)ov.classList.remove('active')});
  ov.querySelector('.v16-content').addEventListener('click',function(e){
    var opt=e.target.closest('.v16-quiz-option');if(!opt||answered)return;
    window._v16Quiz3Answer(parseInt(opt.dataset.idx));
  });
}

// ==========================================
// 10. ACHIEVEMENT SYSTEM v16
// ==========================================
var v16Achievements=[
  {id:'v16_sg_first',name:'SG 첫 분석',desc:'Strokes Gained 분석 1회 저장',check:function(){return (v16LS('sg_rounds')||[]).length>=1}},
  {id:'v16_sg_5',name:'SG 분석가',desc:'SG 분석 5회 저장',check:function(){return (v16LS('sg_rounds')||[]).length>=5}},
  {id:'v16_compare',name:'라운드 비교',desc:'라운드 비교 기능 사용',check:function(){return v16LS('compare_used')}},
  {id:'v16_condition',name:'코스 리포터',desc:'코스 컨디션 리포트 1회 작성',check:function(){return (v16LS('condition_reports')||[]).length>=1}},
  {id:'v16_condition_5',name:'컨디션 전문가',desc:'코스 컨디션 5회 리포트',check:function(){return (v16LS('condition_reports')||[]).length>=5}},
  {id:'v16_flyover',name:'플라이오버 탐험',desc:'코스 플라이오버 홀 클릭',check:function(){return v16LS('flyover_used')}},
  {id:'v16_green_5',name:'퍼팅 시뮬 5회',desc:'그린 리딩 시뮬레이터 5회 시도',check:function(){var p=v16LS('green_putts');return p&&p.total>=5}},
  {id:'v16_green_ace',name:'퍼팅 마스터',desc:'그린 리딩 70% 이상 성공률',check:function(){var p=v16LS('green_putts');return p&&p.total>=10&&(p.made/p.total)>=0.7}},
  {id:'v16_equip',name:'장비 분석가',desc:'장비 비교 기능 사용',check:function(){return v16LS('equip_used')}},
  {id:'v16_news_10',name:'골프 학습자',desc:'골프 뉴스 10개 이상 읽기',check:function(){var r=v16LS('read_articles')||{};return Object.keys(r).length>=10}},
  {id:'v16_quiz3_perfect',name:'전략가',desc:'골프 전략 퀴즈 v3 만점',check:function(){return false}},
  {id:'v16_all_features',name:'올라운더 v16',desc:'v16 모든 기능 1회 이상 사용',check:function(){return (v16LS('sg_rounds')||[]).length>0&&(v16LS('condition_reports')||[]).length>0&&v16LS('flyover_used')&&v16LS('green_putts')&&v16LS('equip_used')&&Object.keys(v16LS('read_articles')||{}).length>0}}
];

function v16CheckAchieve(){
  var achieved=v16LS('achievements')||{};
  v16Achievements.forEach(function(a){
    if(!achieved[a.id]&&a.check()){
      achieved[a.id]=new Date().toISOString();v16LS('achievements',achieved);
      v16Toast('&#x1F3C5; '+a.name+' 업적 달성!');v16SFX('achieve16');
    }
  });
}

// ==========================================
// QUICK ACTION BUTTONS
// ==========================================
function v16QuickActions(){
  var actions=[
    {id:'v16SGBtn',label:'&#x1F4CA; SG분석',overlay:'v16SGOverlay'},
    {id:'v16CompBtn',label:'&#x2696;&#xFE0F; 라운드비교',overlay:'v16CompOverlay'},
    {id:'v16CondBtn',label:'&#x1F33F; 코스컨디션',overlay:'v16CondOverlay'},
    {id:'v16FlyBtn',label:'&#x1F6E9;&#xFE0F; 플라이오버',overlay:'v16FlyOverlay'},
    {id:'v16GreenBtn',label:'&#x26F3; 그린리딩',overlay:'v16GreenOverlay'},
    {id:'v16EqBtn',label:'&#x1F3CC;&#xFE0F; 장비비교',overlay:'v16EqOverlay'},
    {id:'v16MonthBtn',label:'&#x1F4C5; 월간서머리',overlay:'v16MonthOverlay'},
    {id:'v16NewsBtn',label:'&#x1F4F0; 골프뉴스',overlay:'v16NewsOverlay'},
    {id:'v16Quiz3Btn',label:'&#x1F9E0; 전략퀴즈',overlay:'v16Quiz3Overlay'}
  ];

  function inject(){
    var container=document.querySelector('.results-section');if(!container)return;
    var existing=document.getElementById('v16QuickBar');if(existing)return;
    var bar=document.createElement('div');bar.id='v16QuickBar';
    bar.style.cssText='display:flex;flex-wrap:wrap;gap:6px;padding:0 0 10px;';
    actions.forEach(function(a){
      var btn=document.createElement('button');btn.id=a.id;btn.innerHTML=a.label;
      btn.style.cssText='padding:7px 14px;border:1.5px solid var(--border);border-radius:20px;background:var(--card-bg);font-size:11px;font-weight:600;cursor:pointer;transition:.2s;color:var(--text);white-space:nowrap';
      btn.addEventListener('mouseover',function(){this.style.borderColor='var(--primary)';this.style.color='var(--primary)'});
      btn.addEventListener('mouseout',function(){this.style.borderColor='var(--border)';this.style.color='var(--text)'});
      btn.addEventListener('click',function(){
        document.getElementById(a.overlay).classList.add('active');v16SFX('sg_analyze');
        if(a.id==='v16CompBtn')v16LS('compare_used',true);
        if(a.id==='v16EqBtn')v16LS('equip_used',true);
        if(a.id==='v16FlyBtn')v16LS('flyover_used',true);
      });
      bar.appendChild(btn);
    });
    var v15bar=document.getElementById('v15QuickBar');
    if(v15bar)v15bar.parentNode.insertBefore(bar,v15bar.nextSibling);
    else container.insertBefore(bar,container.querySelector('.results-header'));
  }
  if(document.readyState==='complete')inject();
  else window.addEventListener('load',function(){setTimeout(inject,1200)});
  setTimeout(inject,2500);
  setTimeout(inject,4500);
}

// ==========================================
// KEYBOARD SHORTCUTS
// ==========================================
document.addEventListener('keydown',function(e){
  var t=e.target.tagName;if(t==='INPUT'||t==='TEXTAREA'||t==='SELECT')return;
  if(e.shiftKey&&e.ctrlKey){
    var map={'G':'v16SGOverlay','R':'v16CompOverlay','O':'v16CondOverlay','V':'v16FlyOverlay','N':'v16GreenOverlay','E':'v16EqOverlay','M':'v16MonthOverlay','W':'v16NewsOverlay','Z':'v16Quiz3Overlay'};
    if(map[e.key]){e.preventDefault();var el=document.getElementById(map[e.key]);if(el)el.classList.add('active');v16SFX('sg_analyze')}
  }
  if(e.key==='Escape'){
    ['v16SGOverlay','v16CompOverlay','v16CondOverlay','v16FlyOverlay','v16GreenOverlay','v16EqOverlay','v16MonthOverlay','v16NewsOverlay','v16Quiz3Overlay'].forEach(function(id){
      var el=document.getElementById(id);if(el)el.classList.remove('active');
    });
  }
});

// ==========================================
// INIT
// ==========================================
function v16Init(){
  v16StrokesGained();
  v16RoundCompare();
  v16CourseCondition();
  v16Flyover();
  v16GreenReader();
  v16EquipCompare();
  v16MonthlySummary();
  v16NewsFeed();
  v16Quiz();
  v16QuickActions();
  v16CheckAchieve();
}

if(document.readyState==='complete'||document.readyState==='interactive'){setTimeout(v16Init,400)}
else{document.addEventListener('DOMContentLoaded',v16Init)}

})();
