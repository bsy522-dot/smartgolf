(function(){
'use strict';

var css15 = document.createElement('style');
css15.textContent = `
.v15-overlay{position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,.82);z-index:10040;display:none;align-items:center;justify-content:center;backdrop-filter:blur(14px)}
.v15-overlay.active{display:flex}
.v15-modal{background:var(--card-bg,#fff);border-radius:24px;padding:28px;width:95%;max-width:760px;max-height:92vh;overflow-y:auto;box-shadow:0 36px 110px rgba(0,0,0,.6);animation:v15Rise .4s cubic-bezier(.22,1,.36,1)}
@keyframes v15Rise{from{opacity:0;transform:translateY(44px) scale(.93)}to{opacity:1;transform:translateY(0) scale(1)}}
.v15-hdr{display:flex;justify-content:space-between;align-items:center;margin-bottom:18px}
.v15-hdr h2{font-size:21px;font-weight:800;display:flex;align-items:center;gap:10px}
.v15-hdr h2 .v15i{font-size:26px}
.v15-x{background:none;border:none;font-size:26px;cursor:pointer;color:var(--text-muted);padding:4px 10px;border-radius:10px;transition:.2s}
.v15-x:hover{background:var(--border);color:var(--text)}
.v15-tabs{display:flex;gap:6px;margin-bottom:16px;overflow-x:auto;padding-bottom:4px;scrollbar-width:none}
.v15-tabs::-webkit-scrollbar{display:none}
.v15-tab{padding:9px 18px;border-radius:24px;border:1.5px solid var(--border);background:var(--bg);font-size:12px;font-weight:700;cursor:pointer;white-space:nowrap;transition:.25s}
.v15-tab.active{background:var(--primary);color:#fff;border-color:var(--primary);box-shadow:0 3px 12px rgba(26,122,58,.35)}
.v15-card{background:var(--bg);border-radius:16px;padding:18px;margin-bottom:12px;transition:.25s;border:1.5px solid transparent}
.v15-card:hover{border-color:var(--primary);transform:translateY(-2px);box-shadow:0 4px 16px rgba(26,122,58,.12)}
.v15-card h4{font-size:15px;font-weight:700;margin-bottom:8px;display:flex;align-items:center;gap:8px}
.v15-card p{font-size:12px;color:var(--text-muted);line-height:1.7}
.v15-btn{padding:11px 22px;border:none;border-radius:14px;font-size:13px;font-weight:700;cursor:pointer;transition:.25s;display:inline-flex;align-items:center;gap:6px}
.v15-btn-primary{background:linear-gradient(135deg,var(--primary),#34a853);color:#fff}
.v15-btn-primary:hover{transform:translateY(-2px);box-shadow:0 8px 20px rgba(26,122,58,.4)}
.v15-btn-sm{padding:7px 14px;font-size:11px;border-radius:10px}
.v15-btn-secondary{background:var(--bg);color:var(--text);border:1.5px solid var(--border)}
.v15-btn-secondary:hover{border-color:var(--primary);color:var(--primary)}
.v15-btn-danger{background:#ff4444;color:#fff}
.v15-input{width:100%;padding:11px 16px;border:2px solid var(--border);border-radius:12px;font-size:13px;background:var(--bg);color:var(--text);transition:.2s}
.v15-input:focus{border-color:var(--primary);outline:none;box-shadow:0 0 0 3px rgba(26,122,58,.1)}
.v15-textarea{width:100%;padding:11px 16px;border:2px solid var(--border);border-radius:12px;font-size:13px;background:var(--bg);color:var(--text);min-height:70px;resize:vertical;font-family:inherit}
.v15-textarea:focus{border-color:var(--primary);outline:none}
.v15-select{padding:9px 14px;border:2px solid var(--border);border-radius:10px;font-size:13px;background:var(--bg);color:var(--text)}
.v15-grid2{display:grid;grid-template-columns:1fr 1fr;gap:12px}
.v15-grid3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px}
.v15-grid4{display:grid;grid-template-columns:repeat(4,1fr);gap:8px}
@media(max-width:500px){.v15-grid2,.v15-grid3,.v15-grid4{grid-template-columns:1fr}}
.v15-divider{height:1px;background:var(--border);margin:16px 0}
.v15-badge{display:inline-block;padding:4px 12px;border-radius:14px;font-size:11px;font-weight:700}
.v15-progress{width:100%;height:10px;background:var(--border);border-radius:5px;overflow:hidden;margin:8px 0}
.v15-progress-fill{height:100%;border-radius:5px;transition:width .6s ease}
.v15-stat-row{display:flex;justify-content:space-between;align-items:center;padding:12px 0;border-bottom:1px solid var(--border)}
.v15-stat-row:last-child{border-bottom:none}
.v15-club-item{display:flex;align-items:center;gap:14px;padding:14px;background:var(--bg);border-radius:14px;margin-bottom:10px;border-left:4px solid var(--primary);transition:.2s}
.v15-club-item:hover{transform:translateX(4px)}
.v15-club-icon{width:44px;height:44px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:20px;flex-shrink:0}
.v15-club-info{flex:1}
.v15-club-name{font-size:13px;font-weight:700}
.v15-club-dist{font-size:12px;color:var(--text-muted);margin-top:2px}
.v15-scorecard-grid{display:grid;grid-template-columns:repeat(10,1fr);gap:2px;font-size:11px;text-align:center;margin:12px 0}
.v15-sc-hdr{background:var(--primary);color:#fff;padding:6px 2px;font-weight:700;border-radius:4px}
.v15-sc-par{background:var(--primary-light);padding:5px 2px;border-radius:4px;font-weight:600}
.v15-sc-cell{background:var(--bg);padding:5px 2px;border-radius:4px;position:relative;cursor:pointer;transition:.2s}
.v15-sc-cell:hover{background:var(--primary-light)}
.v15-sc-cell input{width:100%;border:none;background:transparent;text-align:center;font-size:12px;font-weight:700;color:var(--text);padding:0}
.v15-sc-cell input:focus{outline:none}
.v15-sc-eagle{background:#ffd700!important;color:#5a3e00}
.v15-sc-birdie{background:#ff6b35!important;color:#fff}
.v15-sc-par-score{background:#4caf50!important;color:#fff}
.v15-sc-bogey{background:#2196f3!important;color:#fff}
.v15-sc-double{background:#9c27b0!important;color:#fff}
.v15-sc-triple{background:#f44336!important;color:#fff}
.v15-practice-item{display:flex;align-items:center;gap:14px;padding:14px;background:var(--bg);border-radius:14px;margin-bottom:10px}
.v15-practice-icon{width:40px;height:40px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:18px;flex-shrink:0}
.v15-leader-item{display:flex;align-items:center;gap:14px;padding:14px;background:var(--bg);border-radius:14px;margin-bottom:8px}
.v15-leader-rank{width:36px;height:36px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:900;flex-shrink:0}
.v15-leader-rank.gold{background:#ffd700;color:#5a3e00}
.v15-leader-rank.silver{background:#c0c0c0;color:#333}
.v15-leader-rank.bronze{background:#cd7f32;color:#fff}
.v15-leader-rank.normal{background:var(--border);color:var(--text)}
.v15-fitness-step{display:flex;align-items:flex-start;gap:14px;padding:14px;background:var(--bg);border-radius:14px;margin-bottom:10px}
.v15-fitness-num{width:32px;height:32px;border-radius:50%;background:var(--primary);color:#fff;display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:800;flex-shrink:0}
.v15-report-canvas{width:100%;height:380px;border-radius:16px;margin:12px 0}
.v15-toast{position:fixed;bottom:80px;left:50%;transform:translateX(-50%) translateY(100px);background:var(--toast-bg,#333);color:#fff;padding:12px 24px;border-radius:14px;font-size:13px;font-weight:600;z-index:11100;opacity:0;transition:.4s;pointer-events:none;display:flex;align-items:center;gap:8px}
.v15-toast.show{transform:translateX(-50%) translateY(0);opacity:1}
.v15-quiz-option{display:block;width:100%;padding:12px 16px;border:2px solid var(--border);border-radius:12px;background:var(--bg);color:var(--text);font-size:13px;cursor:pointer;transition:.2s;margin-bottom:8px;text-align:left}
.v15-quiz-option:hover{border-color:var(--primary);background:var(--primary-light)}
.v15-quiz-option.correct{border-color:#4caf50;background:#e8f5e9;color:#2e7d32}
.v15-quiz-option.wrong{border-color:#f44336;background:#fce4ec;color:#c62828}
.v15-donut{position:relative;display:inline-block}
.v15-donut canvas{display:block}
.v15-donut-center{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);text-align:center}
.v15-donut-val{font-size:24px;font-weight:900;color:var(--primary)}
.v15-donut-lbl{font-size:10px;color:var(--text-muted)}
`;
document.head.appendChild(css15);

function v15LS(k,v){if(v!==undefined){localStorage.setItem('sg_v15_'+k,JSON.stringify(v));return v}try{return JSON.parse(localStorage.getItem('sg_v15_'+k))}catch(e){return null}}
function v15Toast(msg){var t=document.querySelector('.v15-toast');if(!t){t=document.createElement('div');t.className='v15-toast';document.body.appendChild(t)}t.innerHTML=msg;t.classList.add('show');setTimeout(function(){t.classList.remove('show')},2800)}
function v15SFX(type){try{var a=new(window.AudioContext||window.webkitAudioContext)(),o=a.createOscillator(),g=a.createGain();o.connect(g);g.connect(a.destination);var map={club:{f:523,d:.12,w:'triangle'},scorecard:{f:660,d:.15,w:'sine'},practice:{f:494,d:.12,w:'triangle'},leader:{f:784,d:.18,w:'sine'},fitness:{f:440,d:.15,w:'triangle'},report:{f:587,d:.2,w:'sine'},quiz:{f:698,d:.12,w:'sine'},quiz_wrong:{f:220,d:.3,w:'sawtooth'},achieve:{f:880,d:.25,w:'sine'},recommend:{f:554,d:.15,w:'triangle'}};var s=map[type]||{f:440,d:.15,w:'sine'};o.type=s.w;o.frequency.value=s.f;g.gain.value=.13;g.gain.exponentialRampToValueAtTime(.001,a.currentTime+s.d);o.start();o.stop(a.currentTime+s.d)}catch(e){}}

// === 1. Golf Club Manager ===
function v15ClubManager(){
  var defaultClubs = [
    {name:'드라이버',type:'wood',dist:230,icon:'&#x1F3CC;&#xFE0F;',color:'#e53935'},
    {name:'3번 우드',type:'wood',dist:210,icon:'&#x1F333;',color:'#ff6b35'},
    {name:'5번 우드',type:'wood',dist:195,icon:'&#x1F333;',color:'#ff9800'},
    {name:'4번 유틸',type:'hybrid',dist:185,icon:'&#x2B50;',color:'#ffc107'},
    {name:'5번 아이언',type:'iron',dist:175,icon:'&#x1F4CD;',color:'#8bc34a'},
    {name:'6번 아이언',type:'iron',dist:165,icon:'&#x1F4CD;',color:'#4caf50'},
    {name:'7번 아이언',type:'iron',dist:155,icon:'&#x1F4CD;',color:'#009688'},
    {name:'8번 아이언',type:'iron',dist:145,icon:'&#x1F4CD;',color:'#00bcd4'},
    {name:'9번 아이언',type:'iron',dist:135,icon:'&#x1F4CD;',color:'#03a9f4'},
    {name:'PW',type:'wedge',dist:120,icon:'&#x26F3;',color:'#2196f3'},
    {name:'AW (50도)',type:'wedge',dist:105,icon:'&#x26F3;',color:'#3f51b5'},
    {name:'SW (56도)',type:'wedge',dist:85,icon:'&#x26F3;',color:'#673ab7'},
    {name:'LW (60도)',type:'wedge',dist:65,icon:'&#x26F3;',color:'#9c27b0'},
    {name:'퍼터',type:'putter',dist:0,icon:'&#x1F3AF;',color:'#607d8b'}
  ];
  var clubs = v15LS('clubs') || defaultClubs.map(function(c){return Object.assign({},c,{shots:[]})});
  var activeTab = 'all';

  function render(){
    var html = '<div class="v15-tabs" id="v15ClubTabs">';
    ['all','wood','hybrid','iron','wedge','putter'].forEach(function(t){
      var labels = {all:'전체',wood:'우드',hybrid:'유틸',iron:'아이언',wedge:'웨지',putter:'퍼터'};
      html += '<div class="v15-tab'+(activeTab===t?' active':'')+'" data-type="'+t+'">'+labels[t]+'</div>';
    });
    html += '</div>';

    var filtered = activeTab === 'all' ? clubs : clubs.filter(function(c){return c.type===activeTab});
    filtered.forEach(function(c,i){
      var realIdx = clubs.indexOf(c);
      var avgDist = c.shots && c.shots.length > 0 ? Math.round(c.shots.reduce(function(s,d){return s+d},0)/c.shots.length) : c.dist;
      var maxDist = c.shots && c.shots.length > 0 ? Math.max.apply(null,c.shots) : c.dist;
      html += '<div class="v15-club-item" style="border-left-color:'+c.color+'"><div class="v15-club-icon" style="background:'+c.color+'20;color:'+c.color+'">'+c.icon+'</div><div class="v15-club-info"><div class="v15-club-name">'+c.name+'</div><div class="v15-club-dist">평균 '+avgDist+'m'+(c.shots&&c.shots.length>0?' | 최대 '+maxDist+'m | '+c.shots.length+'샷':'')+'</div></div>';
      if(c.type!=='putter'){
        html += '<div style="display:flex;gap:4px"><input class="v15-input" style="width:60px;padding:6px 8px;text-align:center" type="number" id="v15dist'+realIdx+'" placeholder="m" min="10" max="350"><button class="v15-btn v15-btn-sm v15-btn-primary" onclick="window._v15ClubShot('+realIdx+')">+</button></div>';
      }
      html += '</div>';
    });

    html += '<div class="v15-divider"></div>';
    html += '<h4 style="font-size:14px;font-weight:700;margin-bottom:12px">거리 차트</h4>';
    html += '<canvas id="v15ClubChart" width="700" height="200" style="width:100%;height:200px;background:var(--bg);border-radius:12px;margin-bottom:12px"></canvas>';

    html += '<div class="v15-divider"></div>';
    html += '<h4 style="font-size:14px;font-weight:700;margin-bottom:12px">클럽 추가</h4>';
    html += '<div class="v15-grid2" style="margin-bottom:10px"><input class="v15-input" id="v15NewClubName" placeholder="클럽 이름"><input class="v15-input" id="v15NewClubDist" type="number" placeholder="기본 거리(m)"></div>';
    html += '<div style="display:flex;gap:8px"><select class="v15-select" id="v15NewClubType"><option value="wood">우드</option><option value="hybrid">유틸</option><option value="iron">아이언</option><option value="wedge">웨지</option><option value="putter">퍼터</option></select><button class="v15-btn v15-btn-primary" onclick="window._v15ClubAdd()">추가</button><button class="v15-btn v15-btn-secondary" onclick="window._v15ClubReset()">초기화</button></div>';
    return html;
  }

  window._v15ClubShot = function(i){
    var el = document.getElementById('v15dist'+i);
    var dist = parseInt(el.value);
    if(!dist||dist<10||dist>400){v15Toast('거리를 입력해주세요 (10~400m)');return}
    if(!clubs[i].shots) clubs[i].shots = [];
    clubs[i].shots.push(dist);
    if(clubs[i].shots.length>50) clubs[i].shots = clubs[i].shots.slice(-50);
    v15LS('clubs',clubs);v15SFX('club');v15Toast(clubs[i].name+' '+dist+'m 기록!');v15CheckAchieve();
    el.value='';
    document.querySelector('#v15ClubOverlay .v15-content').innerHTML = render();
    setTimeout(v15DrawClubChart,100);
  };
  window._v15ClubAdd = function(){
    var n=document.getElementById('v15NewClubName').value.trim(),d=parseInt(document.getElementById('v15NewClubDist').value),t=document.getElementById('v15NewClubType').value;
    if(!n){v15Toast('클럽 이름을 입력해주세요');return}
    clubs.push({name:n,type:t,dist:d||0,icon:'&#x1F3CC;&#xFE0F;',color:'#607d8b',shots:[]});
    v15LS('clubs',clubs);v15Toast(n+' 추가 완료');
    document.querySelector('#v15ClubOverlay .v15-content').innerHTML = render();
    setTimeout(v15DrawClubChart,100);
  };
  window._v15ClubReset = function(){clubs=defaultClubs.map(function(c){return Object.assign({},c,{shots:[]})});v15LS('clubs',clubs);v15Toast('클럽이 초기화되었습니다');document.querySelector('#v15ClubOverlay .v15-content').innerHTML=render();setTimeout(v15DrawClubChart,100)};

  var ov=document.createElement('div');ov.id='v15ClubOverlay';ov.className='v15-overlay';ov.setAttribute('role','dialog');ov.setAttribute('aria-label','클럽 매니저');
  ov.innerHTML='<div class="v15-modal"><div class="v15-hdr"><h2><span class="v15i">&#x1F3CC;&#xFE0F;</span> 마이 클럽 매니저</h2><button class="v15-x" aria-label="닫기">&times;</button></div><div class="v15-content">'+render()+'</div></div>';
  document.body.appendChild(ov);
  ov.querySelector('.v15-x').addEventListener('click',function(){ov.classList.remove('active')});
  ov.addEventListener('click',function(e){if(e.target===ov)ov.classList.remove('active')});
  ov.querySelector('.v15-content').addEventListener('click',function(e){
    var tab=e.target.closest('.v15-tab');if(!tab)return;
    activeTab=tab.dataset.type;
    document.querySelector('#v15ClubOverlay .v15-content').innerHTML=render();
    setTimeout(v15DrawClubChart,100);
  });

  var obs=new MutationObserver(function(){if(ov.classList.contains('active'))setTimeout(v15DrawClubChart,150)});
  obs.observe(ov,{attributes:true,attributeFilter:['class']});
}

function v15DrawClubChart(){
  var c=document.getElementById('v15ClubChart');if(!c)return;
  var ctx=c.getContext('2d');var W=c.width,H=c.height;
  var clubs=v15LS('clubs')||[];
  var playable=clubs.filter(function(cl){return cl.type!=='putter'});
  if(!playable.length)return;
  ctx.clearRect(0,0,W,H);
  var isDark=document.documentElement.getAttribute('data-theme')==='dark';
  var pad={l:60,r:20,t:20,b:40};
  var barW=Math.min(40,(W-pad.l-pad.r)/playable.length-6);
  var maxDist=Math.max.apply(null,playable.map(function(cl){var avg=cl.shots&&cl.shots.length?cl.shots.reduce(function(s,d){return s+d},0)/cl.shots.length:cl.dist;return avg}))+20;

  playable.forEach(function(cl,i){
    var avg=cl.shots&&cl.shots.length?Math.round(cl.shots.reduce(function(s,d){return s+d},0)/cl.shots.length):cl.dist;
    var x=pad.l+i*(barW+6);
    var barH=(avg/maxDist)*(H-pad.t-pad.b);
    var y=H-pad.b-barH;
    var grad=ctx.createLinearGradient(x,y,x,H-pad.b);
    grad.addColorStop(0,cl.color);grad.addColorStop(1,cl.color+'40');
    ctx.fillStyle=grad;
    ctx.beginPath();ctx.roundRect(x,y,barW,barH,4);ctx.fill();
    ctx.fillStyle=isDark?'#ccc':'#333';ctx.font='bold 10px sans-serif';ctx.textAlign='center';
    ctx.fillText(avg+'m',x+barW/2,y-6);
    ctx.save();ctx.translate(x+barW/2,H-pad.b+8);ctx.rotate(Math.PI/4);ctx.font='9px sans-serif';ctx.textAlign='left';ctx.fillText(cl.name,0,0);ctx.restore();
  });

  ctx.strokeStyle=isDark?'rgba(255,255,255,.1)':'rgba(0,0,0,.08)';ctx.lineWidth=.5;
  for(var i=0;i<=4;i++){var y=pad.t+(H-pad.t-pad.b)*i/4;ctx.beginPath();ctx.moveTo(pad.l-5,y);ctx.lineTo(W-pad.r,y);ctx.stroke();ctx.fillStyle=isDark?'rgba(255,255,255,.4)':'rgba(0,0,0,.4)';ctx.font='9px sans-serif';ctx.textAlign='right';ctx.fillText(Math.round(maxDist*(1-i/4))+'m',pad.l-8,y+3)}
}

// === 2. Detailed Scorecard ===
function v15Scorecard(){
  var scorecards = v15LS('scorecards') || [];
  var currentCard = null;
  var defaultPars = [4,3,5,4,4,3,5,4,4, 4,3,5,4,4,3,5,4,4];

  function render(){
    var html = '';
    if(!currentCard){
      html += '<div style="margin-bottom:16px"><h4 style="font-size:14px;font-weight:700;margin-bottom:10px">새 스코어카드</h4>';
      html += '<div class="v15-grid2" style="margin-bottom:10px"><input class="v15-input" id="v15SCCourse" placeholder="골프장 이름"><input class="v15-input" id="v15SCDate" type="date" value="'+new Date().toISOString().split('T')[0]+'"></div>';
      html += '<button class="v15-btn v15-btn-primary" onclick="window._v15SCNew()">스코어카드 시작 (18홀)</button></div>';

      if(scorecards.length>0){
        html += '<div class="v15-divider"></div><h4 style="font-size:14px;font-weight:700;margin-bottom:10px">저장된 스코어카드 ('+scorecards.length+')</h4>';
        scorecards.slice().reverse().forEach(function(sc,i){
          var realIdx=scorecards.length-1-i;
          var total=sc.scores.reduce(function(s,v){return s+(v||0)},0);
          var parTotal=sc.pars.reduce(function(s,v){return s+v},0);
          var diff=total-parTotal;
          var fir=sc.fairways?sc.fairways.filter(function(f){return f}).length:0;
          var gir=sc.greens?sc.greens.filter(function(g){return g}).length:0;
          var putts=sc.putts?sc.putts.reduce(function(s,v){return s+(v||0)},0):0;
          html += '<div class="v15-card" style="cursor:pointer" onclick="window._v15SCLoad('+realIdx+')"><h4>'+sc.course+' <span class="v15-badge" style="background:'+(diff<=0?'var(--primary)':'var(--accent)')+';color:#fff">'+total+'타 ('+(diff>=0?'+':'')+diff+')</span></h4><p>'+sc.date+' | FIR '+fir+'/14 | GIR '+gir+'/18 | '+putts+'퍼팅</p><button class="v15-btn v15-btn-sm v15-btn-danger" onclick="event.stopPropagation();window._v15SCDel('+realIdx+')">삭제</button></div>';
        });
      }
    } else {
      var sc=currentCard;
      var total=sc.scores.reduce(function(s,v){return s+(v||0)},0);
      var parTotal=sc.pars.reduce(function(s,v){return s+v},0);
      var diff=total-parTotal;

      html += '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px"><h4 style="font-size:15px;font-weight:800">'+sc.course+' ('+sc.date+')</h4><button class="v15-btn v15-btn-sm v15-btn-secondary" onclick="window._v15SCBack()">목록</button></div>';

      ['전반 (1~9홀)','후반 (10~18홀)'].forEach(function(label,half){
        var start=half*9;
        html += '<h4 style="font-size:13px;font-weight:700;margin:12px 0 6px">'+label+'</h4>';
        html += '<div class="v15-scorecard-grid">';
        html += '<div class="v15-sc-hdr">홀</div>';
        for(var h=start;h<start+9;h++) html += '<div class="v15-sc-hdr">'+(h+1)+'</div>';
        html += '<div class="v15-sc-par" style="font-weight:800">파</div>';
        for(var h=start;h<start+9;h++) html += '<div class="v15-sc-par">'+sc.pars[h]+'</div>';
        html += '<div class="v15-sc-par" style="font-weight:800">타</div>';
        for(var h=start;h<start+9;h++){
          var score=sc.scores[h]||0;
          var par=sc.pars[h];
          var cls='';
          if(score>0){
            var d=score-par;
            if(d<=-2)cls='v15-sc-eagle';else if(d===-1)cls='v15-sc-birdie';else if(d===0)cls='v15-sc-par-score';else if(d===1)cls='v15-sc-bogey';else if(d===2)cls='v15-sc-double';else if(d>=3)cls='v15-sc-triple';
          }
          html += '<div class="v15-sc-cell '+cls+'"><input type="number" min="1" max="15" value="'+(score||'')+'" data-hole="'+h+'" onchange="window._v15SCUpdate('+h+',this.value)"></div>';
        }
        html += '<div class="v15-sc-par" style="font-weight:800">FIR</div>';
        for(var h=start;h<start+9;h++){
          if(!sc.fairways)sc.fairways=new Array(18).fill(false);
          var isPar3=sc.pars[h]===3;
          html += '<div class="v15-sc-cell" style="'+(isPar3?'opacity:.3;pointer-events:none':'')+'"><input type="checkbox" '+(sc.fairways[h]?'checked':'')+' onchange="window._v15SCFairway('+h+',this.checked)" style="width:16px;height:16px;cursor:pointer;accent-color:var(--primary)"></div>';
        }
        html += '<div class="v15-sc-par" style="font-weight:800">GIR</div>';
        for(var h=start;h<start+9;h++){
          if(!sc.greens)sc.greens=new Array(18).fill(false);
          html += '<div class="v15-sc-cell"><input type="checkbox" '+(sc.greens[h]?'checked':'')+' onchange="window._v15SCGreen('+h+',this.checked)" style="width:16px;height:16px;cursor:pointer;accent-color:var(--primary)"></div>';
        }
        html += '<div class="v15-sc-par" style="font-weight:800">퍼팅</div>';
        for(var h=start;h<start+9;h++){
          if(!sc.putts)sc.putts=new Array(18).fill(0);
          html += '<div class="v15-sc-cell"><input type="number" min="0" max="9" value="'+(sc.putts[h]||'')+'" onchange="window._v15SCPutt('+h+',this.value)" style="width:100%;border:none;background:transparent;text-align:center;font-size:11px;color:var(--text)"></div>';
        }
        html += '</div>';
      });

      html += '<div class="v15-divider"></div>';
      var fir=sc.fairways?sc.fairways.filter(function(f){return f}).length:0;
      var gir=sc.greens?sc.greens.filter(function(g){return g}).length:0;
      var putts=sc.putts?sc.putts.reduce(function(s,v){return s+(v||0)},0):0;
      var birdies=0,pars_cnt=0,bogeys=0,doubles=0;
      sc.scores.forEach(function(s,i){if(!s)return;var d=s-sc.pars[i];if(d<=-1)birdies++;else if(d===0)pars_cnt++;else if(d===1)bogeys++;else doubles++});
      html += '<div class="v15-grid4"><div class="v15-card" style="text-align:center"><div style="font-size:24px;font-weight:900;color:var(--primary)">'+total+'</div><div style="font-size:11px;color:var(--text-muted)">총타수</div></div>';
      html += '<div class="v15-card" style="text-align:center"><div style="font-size:24px;font-weight:900;color:'+(diff<=0?'var(--primary)':'var(--accent)')+'">'+(diff>=0?'+':'')+diff+'</div><div style="font-size:11px;color:var(--text-muted)">오버/언더</div></div>';
      html += '<div class="v15-card" style="text-align:center"><div style="font-size:24px;font-weight:900;color:var(--primary)">'+putts+'</div><div style="font-size:11px;color:var(--text-muted)">총 퍼팅</div></div>';
      html += '<div class="v15-card" style="text-align:center"><div style="font-size:24px;font-weight:900;color:var(--primary)">'+(gir?Math.round(gir/18*100):0)+'%</div><div style="font-size:11px;color:var(--text-muted)">GIR</div></div></div>';
      html += '<div class="v15-grid4"><div style="text-align:center;padding:8px"><div style="font-size:14px;font-weight:700;color:#ff6b35">'+birdies+'</div><div style="font-size:10px;color:var(--text-muted)">버디+</div></div><div style="text-align:center;padding:8px"><div style="font-size:14px;font-weight:700;color:#4caf50">'+pars_cnt+'</div><div style="font-size:10px;color:var(--text-muted)">파</div></div><div style="text-align:center;padding:8px"><div style="font-size:14px;font-weight:700;color:#2196f3">'+bogeys+'</div><div style="font-size:10px;color:var(--text-muted)">보기</div></div><div style="text-align:center;padding:8px"><div style="font-size:14px;font-weight:700;color:#9c27b0">'+doubles+'</div><div style="font-size:10px;color:var(--text-muted)">더블+</div></div></div>';
      html += '<div style="display:flex;gap:8px;margin-top:12px"><button class="v15-btn v15-btn-primary" onclick="window._v15SCSave()">저장</button><button class="v15-btn v15-btn-secondary" onclick="window._v15SCReport()">리포트 보기</button></div>';
    }
    return html;
  }

  window._v15SCNew = function(){
    var course=document.getElementById('v15SCCourse').value.trim();
    var date=document.getElementById('v15SCDate').value;
    if(!course){v15Toast('골프장 이름을 입력해주세요');return}
    currentCard={course:course,date:date,pars:defaultPars.slice(),scores:new Array(18).fill(0),fairways:new Array(18).fill(false),greens:new Array(18).fill(false),putts:new Array(18).fill(0)};
    v15SFX('scorecard');
    document.querySelector('#v15SCOverlay .v15-content').innerHTML=render();
  };
  window._v15SCUpdate = function(h,v){if(currentCard){currentCard.scores[h]=parseInt(v)||0;document.querySelector('#v15SCOverlay .v15-content').innerHTML=render()}};
  window._v15SCFairway = function(h,v){if(currentCard){if(!currentCard.fairways)currentCard.fairways=new Array(18).fill(false);currentCard.fairways[h]=v}};
  window._v15SCGreen = function(h,v){if(currentCard){if(!currentCard.greens)currentCard.greens=new Array(18).fill(false);currentCard.greens[h]=v}};
  window._v15SCPutt = function(h,v){if(currentCard){if(!currentCard.putts)currentCard.putts=new Array(18).fill(0);currentCard.putts[h]=parseInt(v)||0}};
  window._v15SCSave = function(){
    if(!currentCard)return;
    var existing=scorecards.findIndex(function(sc){return sc.course===currentCard.course&&sc.date===currentCard.date});
    if(existing>=0)scorecards[existing]=currentCard;else scorecards.push(currentCard);
    v15LS('scorecards',scorecards);v15SFX('scorecard');v15Toast('스코어카드 저장 완료!');v15CheckAchieve();
  };
  window._v15SCLoad = function(i){currentCard=JSON.parse(JSON.stringify(scorecards[i]));document.querySelector('#v15SCOverlay .v15-content').innerHTML=render()};
  window._v15SCDel = function(i){scorecards.splice(i,1);v15LS('scorecards',scorecards);v15Toast('삭제 완료');document.querySelector('#v15SCOverlay .v15-content').innerHTML=render()};
  window._v15SCBack = function(){currentCard=null;document.querySelector('#v15SCOverlay .v15-content').innerHTML=render()};
  window._v15SCReport = function(){var el=document.getElementById('v15ReportOverlay');if(el){el.classList.add('active');setTimeout(function(){v15DrawReport()},200)}};

  var ov=document.createElement('div');ov.id='v15SCOverlay';ov.className='v15-overlay';ov.setAttribute('role','dialog');
  ov.innerHTML='<div class="v15-modal"><div class="v15-hdr"><h2><span class="v15i">&#x1F4CB;</span> 상세 스코어카드</h2><button class="v15-x" aria-label="닫기">&times;</button></div><div class="v15-content">'+render()+'</div></div>';
  document.body.appendChild(ov);
  ov.querySelector('.v15-x').addEventListener('click',function(){ov.classList.remove('active')});
  ov.addEventListener('click',function(e){if(e.target===ov)ov.classList.remove('active')});
}

// === 3. Practice Log ===
function v15PracticeLog(){
  var logs = v15LS('practice_logs') || [];
  var categories = [
    {id:'range',name:'드라이빙 레인지',icon:'&#x1F3CC;&#xFE0F;',color:'#4caf50'},
    {id:'putting',name:'퍼팅 연습',icon:'&#x26F3;',color:'#2196f3'},
    {id:'chipping',name:'칩핑/피칭',icon:'&#x1F3AF;',color:'#ff9800'},
    {id:'bunker',name:'벙커 연습',icon:'&#x1F3D6;&#xFE0F;',color:'#cd7f32'},
    {id:'fitness',name:'골프 체력',icon:'&#x1F4AA;',color:'#9c27b0'},
    {id:'indoor',name:'실내 연습',icon:'&#x1F3E0;',color:'#607d8b'}
  ];

  function render(){
    var html = '<h4 style="font-size:14px;font-weight:700;margin-bottom:12px">연습 기록 추가</h4>';
    html += '<div class="v15-grid2" style="margin-bottom:10px"><input class="v15-input" id="v15PracDate" type="date" value="'+new Date().toISOString().split('T')[0]+'"><select class="v15-select" id="v15PracCat" style="width:100%">';
    categories.forEach(function(c){html+='<option value="'+c.id+'">'+c.name+'</option>'});
    html += '</select></div>';
    html += '<div class="v15-grid2" style="margin-bottom:10px"><input class="v15-input" id="v15PracDur" type="number" placeholder="연습시간 (분)" min="5" max="480"><input class="v15-input" id="v15PracBalls" type="number" placeholder="타수/볼 수" min="0"></div>';
    html += '<textarea class="v15-textarea" id="v15PracNote" placeholder="연습 내용 메모..." style="margin-bottom:10px"></textarea>';
    html += '<button class="v15-btn v15-btn-primary" onclick="window._v15PracAdd()">기록 저장</button>';

    var thisWeek = logs.filter(function(l){var d=new Date(l.date);var now=new Date();var diff=Math.floor((now-d)/(1000*60*60*24));return diff<7});
    var totalMin = thisWeek.reduce(function(s,l){return s+l.duration},0);
    html += '<div class="v15-divider"></div><div class="v15-grid3"><div class="v15-card" style="text-align:center"><div style="font-size:22px;font-weight:900;color:var(--primary)">'+logs.length+'</div><div style="font-size:10px;color:var(--text-muted)">총 연습</div></div><div class="v15-card" style="text-align:center"><div style="font-size:22px;font-weight:900;color:var(--primary)">'+totalMin+'</div><div style="font-size:10px;color:var(--text-muted)">이번주(분)</div></div><div class="v15-card" style="text-align:center"><div style="font-size:22px;font-weight:900;color:var(--primary)">'+thisWeek.length+'</div><div style="font-size:10px;color:var(--text-muted)">이번주 횟수</div></div></div>';

    if(logs.length>0){
      html += '<div class="v15-divider"></div><h4 style="font-size:14px;font-weight:700;margin-bottom:12px">최근 연습 기록</h4>';
      logs.slice().reverse().slice(0,15).forEach(function(l,i){
        var cat=categories.find(function(c){return c.id===l.category})||categories[0];
        html += '<div class="v15-practice-item"><div class="v15-practice-icon" style="background:'+cat.color+'20;color:'+cat.color+'">'+cat.icon+'</div><div style="flex:1"><div style="font-size:13px;font-weight:700">'+cat.name+'</div><div style="font-size:11px;color:var(--text-muted)">'+l.date+' | '+l.duration+'분'+(l.balls?' | '+l.balls+'볼':'')+'</div>'+(l.note?'<div style="font-size:11px;color:var(--text-muted);margin-top:3px">'+l.note+'</div>':'')+'</div><button style="background:none;border:none;color:#ff4444;cursor:pointer;font-size:14px" onclick="window._v15PracDel('+(logs.length-1-i)+')">&#x2715;</button></div>';
      });
    }
    return html;
  }

  window._v15PracAdd = function(){
    var date=document.getElementById('v15PracDate').value,cat=document.getElementById('v15PracCat').value,dur=parseInt(document.getElementById('v15PracDur').value),balls=parseInt(document.getElementById('v15PracBalls').value)||0,note=document.getElementById('v15PracNote').value.trim();
    if(!date||!dur){v15Toast('날짜와 연습시간을 입력해주세요');return}
    logs.push({date:date,category:cat,duration:dur,balls:balls,note:note});
    v15LS('practice_logs',logs);v15SFX('practice');v15Toast('연습 기록 저장!');v15CheckAchieve();
    document.querySelector('#v15PracOverlay .v15-content').innerHTML=render();
  };
  window._v15PracDel = function(i){logs.splice(i,1);v15LS('practice_logs',logs);v15Toast('삭제 완료');document.querySelector('#v15PracOverlay .v15-content').innerHTML=render()};

  var ov=document.createElement('div');ov.id='v15PracOverlay';ov.className='v15-overlay';ov.setAttribute('role','dialog');
  ov.innerHTML='<div class="v15-modal"><div class="v15-hdr"><h2><span class="v15i">&#x1F4DD;</span> 연습 일지</h2><button class="v15-x" aria-label="닫기">&times;</button></div><div class="v15-content">'+render()+'</div></div>';
  document.body.appendChild(ov);
  ov.querySelector('.v15-x').addEventListener('click',function(){ov.classList.remove('active')});
  ov.addEventListener('click',function(e){if(e.target===ov)ov.classList.remove('active')});
}

// === 4. Local Leaderboard ===
function v15Leaderboard(){
  var virtualPlayers = [
    {name:'김프로',avg:72,best:68,rounds:48,badge:'&#x1F451;'},
    {name:'박이글',avg:76,best:71,rounds:35,badge:'&#x1F31F;'},
    {name:'이버디',avg:78,best:73,rounds:42,badge:'&#x2B50;'},
    {name:'최파터',avg:80,best:74,rounds:30,badge:'&#x1F3AF;'},
    {name:'정드라',avg:82,best:76,rounds:28,badge:'&#x1F3CC;&#xFE0F;'},
    {name:'한아이언',avg:84,best:78,rounds:25,badge:'&#x1F4CD;'},
    {name:'강웨지',avg:86,best:80,rounds:22,badge:'&#x26F3;'},
    {name:'윤슬라',avg:88,best:82,rounds:20,badge:'&#x1F30D;'},
    {name:'조핸디',avg:90,best:84,rounds:18,badge:'&#x1F3C3;'},
    {name:'서루키',avg:95,best:88,rounds:12,badge:'&#x1F331;'}
  ];

  function render(){
    var rounds=JSON.parse(localStorage.getItem('sg_rounds')||'[]');
    var calRounds=JSON.parse(localStorage.getItem('sg_v14_calendar_rounds')||'[]');
    var allR=rounds.concat(calRounds);
    var myAvg=allR.length?Math.round(allR.reduce(function(s,r){return s+r.score},0)/allR.length):0;
    var myBest=allR.length?Math.min.apply(null,allR.map(function(r){return r.score})):0;

    var players=virtualPlayers.map(function(p){return Object.assign({},p)});
    if(allR.length>=1){
      players.push({name:'&#x1F464; 나',avg:myAvg,best:myBest,rounds:allR.length,badge:'&#x1F464;',isMe:true});
    }
    players.sort(function(a,b){return a.avg-b.avg});

    var html = '<div class="v15-card" style="text-align:center;border-color:var(--primary)"><h4>&#x1F3C6; 가상 리더보드</h4><p>스코어를 기록하면 순위에 반영됩니다</p></div>';

    players.forEach(function(p,i){
      var rankCls=i===0?'gold':i===1?'silver':i===2?'bronze':'normal';
      var style=p.isMe?'border:2px solid var(--primary);background:var(--primary-light)':'';
      html += '<div class="v15-leader-item" style="'+style+'"><div class="v15-leader-rank '+rankCls+'">'+(i+1)+'</div><div style="flex:1"><div style="font-size:13px;font-weight:700">'+p.badge+' '+p.name+'</div><div style="font-size:11px;color:var(--text-muted)">평균 '+p.avg+'타 | 베스트 '+p.best+'타 | '+p.rounds+'R</div></div></div>';
    });

    if(allR.length===0){
      html += '<div class="v15-divider"></div><p style="text-align:center;color:var(--text-muted);font-size:13px">라운드를 기록하면 리더보드에 참여할 수 있습니다!</p>';
    }
    return html;
  }

  var ov=document.createElement('div');ov.id='v15LeaderOverlay';ov.className='v15-overlay';ov.setAttribute('role','dialog');
  ov.innerHTML='<div class="v15-modal"><div class="v15-hdr"><h2><span class="v15i">&#x1F3C6;</span> 리더보드</h2><button class="v15-x" aria-label="닫기">&times;</button></div><div class="v15-content">'+render()+'</div></div>';
  document.body.appendChild(ov);
  ov.querySelector('.v15-x').addEventListener('click',function(){ov.classList.remove('active')});
  ov.addEventListener('click',function(e){if(e.target===ov)ov.classList.remove('active')});
}

// === 5. Club Recommendation AI ===
function v15ClubRecommend(){
  function render(){
    var html = '<h4 style="font-size:14px;font-weight:700;margin-bottom:12px">상황별 클럽 추천</h4>';
    html += '<div class="v15-grid2" style="margin-bottom:12px"><div><label style="font-size:12px;font-weight:700;display:block;margin-bottom:4px">남은 거리 (m)</label><input class="v15-input" id="v15RecDist" type="number" placeholder="150" min="10" max="350"></div>';
    html += '<div><label style="font-size:12px;font-weight:700;display:block;margin-bottom:4px">바람</label><select class="v15-select" id="v15RecWind" style="width:100%"><option value="0">무풍</option><option value="1">맞바람 약</option><option value="2">맞바람 강</option><option value="-1">뒷바람 약</option><option value="-2">뒷바람 강</option></select></div></div>';
    html += '<div class="v15-grid2" style="margin-bottom:12px"><div><label style="font-size:12px;font-weight:700;display:block;margin-bottom:4px">경사</label><select class="v15-select" id="v15RecSlope" style="width:100%"><option value="0">평지</option><option value="1">오르막</option><option value="-1">내리막</option></select></div>';
    html += '<div><label style="font-size:12px;font-weight:700;display:block;margin-bottom:4px">라이</label><select class="v15-select" id="v15RecLie" style="width:100%"><option value="fairway">페어웨이</option><option value="rough">러프</option><option value="bunker">벙커</option><option value="tee">티샷</option></select></div></div>';
    html += '<button class="v15-btn v15-btn-primary" onclick="window._v15Recommend()" style="width:100%">클럽 추천받기</button>';
    html += '<div id="v15RecResult" style="margin-top:16px"></div>';

    html += '<div class="v15-divider"></div><h4 style="font-size:14px;font-weight:700;margin-bottom:12px">거리별 기본 가이드</h4>';
    var guide = [
      {range:'200m+',club:'드라이버/3번 우드',tip:'티샷 또는 페어웨이에서 풀스윙'},
      {range:'180~200m',club:'3번 우드/유틸',tip:'로프트 충분, 무리하지 않기'},
      {range:'160~180m',club:'5번 아이언/유틸',tip:'그린을 노리되 안전하게'},
      {range:'140~160m',club:'6~7번 아이언',tip:'핀 공략 가능, 풀스윙'},
      {range:'120~140m',club:'8~9번 아이언',tip:'정확도 중심 스윙'},
      {range:'100~120m',club:'PW/AW',tip:'3/4 스윙으로 거리 조절'},
      {range:'60~100m',club:'AW/SW',tip:'피치샷, 높이 조절'},
      {range:'30~60m',club:'SW/LW',tip:'로브샷/칩앤런 선택'},
      {range:'~30m',club:'SW/퍼터',tip:'그린 주변 어프로치'}
    ];
    guide.forEach(function(g){
      html += '<div class="v15-card"><h4>'+g.range+'</h4><p><strong>'+g.club+'</strong> - '+g.tip+'</p></div>';
    });
    return html;
  }

  window._v15Recommend = function(){
    var dist=parseInt(document.getElementById('v15RecDist').value);
    var wind=parseInt(document.getElementById('v15RecWind').value);
    var slope=parseInt(document.getElementById('v15RecSlope').value);
    var lie=document.getElementById('v15RecLie').value;
    if(!dist){v15Toast('거리를 입력해주세요');return}

    var adjusted=dist;
    adjusted += wind * 8;
    adjusted += slope * 10;
    if(lie==='rough') adjusted += 5;
    if(lie==='bunker') adjusted += 10;

    var clubs=v15LS('clubs')||[];
    var playable=clubs.filter(function(c){return c.type!=='putter'&&c.dist>0});
    if(!playable.length) playable=[{name:'드라이버',dist:230},{name:'3우드',dist:210},{name:'5아이언',dist:175},{name:'7아이언',dist:155},{name:'9아이언',dist:135},{name:'PW',dist:120},{name:'SW',dist:85}];

    playable.sort(function(a,b){
      var aAvg=a.shots&&a.shots.length?a.shots.reduce(function(s,d){return s+d},0)/a.shots.length:a.dist;
      var bAvg=b.shots&&b.shots.length?b.shots.reduce(function(s,d){return s+d},0)/b.shots.length:b.dist;
      return Math.abs(aAvg-adjusted)-Math.abs(bAvg-adjusted);
    });

    var best=playable[0];
    var bestAvg=best.shots&&best.shots.length?Math.round(best.shots.reduce(function(s,d){return s+d},0)/best.shots.length):best.dist;
    var alt=playable[1];
    var altAvg=alt&&alt.shots&&alt.shots.length?Math.round(alt.shots.reduce(function(s,d){return s+d},0)/alt.shots.length):alt?alt.dist:0;

    var result='<div class="v15-card" style="border-color:var(--primary);border-width:2px">';
    result += '<h4>&#x2705; 추천: '+best.name+'</h4>';
    result += '<p>실제 거리: '+dist+'m &rarr; 보정 거리: '+adjusted+'m</p>';
    result += '<p>'+best.name+' 평균 비거리: '+bestAvg+'m (차이: '+(adjusted-bestAvg>0?'+':'')+(adjusted-bestAvg)+'m)</p>';
    if(wind!==0) result += '<p>&#x1F4A8; 바람 보정: '+(wind>0?'+':'')+wind*8+'m</p>';
    if(slope!==0) result += '<p>&#x26F0;&#xFE0F; 경사 보정: '+(slope>0?'+':'')+slope*10+'m</p>';
    if(lie!=='fairway'&&lie!=='tee') result += '<p>&#x1F333; 라이 보정: +'+(lie==='bunker'?10:5)+'m</p>';
    result += '</div>';
    if(alt){
      result += '<div class="v15-card"><h4>&#x1F504; 대안: '+alt.name+' ('+altAvg+'m)</h4><p>컨트롤 샷이 필요한 경우 선택</p></div>';
    }
    document.getElementById('v15RecResult').innerHTML=result;
    v15SFX('recommend');
  };

  var ov=document.createElement('div');ov.id='v15RecOverlay';ov.className='v15-overlay';ov.setAttribute('role','dialog');
  ov.innerHTML='<div class="v15-modal"><div class="v15-hdr"><h2><span class="v15i">&#x1F916;</span> AI 클럽 추천</h2><button class="v15-x" aria-label="닫기">&times;</button></div><div class="v15-content">'+render()+'</div></div>';
  document.body.appendChild(ov);
  ov.querySelector('.v15-x').addEventListener('click',function(){ov.classList.remove('active')});
  ov.addEventListener('click',function(e){if(e.target===ov)ov.classList.remove('active')});
}

// === 6. Round Report (Canvas) ===
function v15RoundReport(){
  var ov=document.createElement('div');ov.id='v15ReportOverlay';ov.className='v15-overlay';ov.setAttribute('role','dialog');
  ov.innerHTML='<div class="v15-modal"><div class="v15-hdr"><h2><span class="v15i">&#x1F4CA;</span> 라운드 리포트</h2><button class="v15-x" aria-label="닫기">&times;</button></div><div class="v15-content"><canvas id="v15ReportCanvas" class="v15-report-canvas" width="700" height="380"></canvas><div style="display:flex;gap:8px;margin-top:12px"><button class="v15-btn v15-btn-primary" onclick="window._v15ReportDownload()">PNG 다운로드</button><button class="v15-btn v15-btn-secondary" onclick="window._v15ReportCopy()">클립보드 복사</button></div></div></div>';
  document.body.appendChild(ov);
  ov.querySelector('.v15-x').addEventListener('click',function(){ov.classList.remove('active')});
  ov.addEventListener('click',function(e){if(e.target===ov)ov.classList.remove('active')});

  var obs=new MutationObserver(function(){if(ov.classList.contains('active'))setTimeout(v15DrawReport,200)});
  obs.observe(ov,{attributes:true,attributeFilter:['class']});
}

function v15DrawReport(){
  var c=document.getElementById('v15ReportCanvas');if(!c)return;
  var ctx=c.getContext('2d');var W=c.width,H=c.height;
  ctx.clearRect(0,0,W,H);

  var grad=ctx.createLinearGradient(0,0,W,H);
  grad.addColorStop(0,'#1a7a3a');grad.addColorStop(1,'#0f5a28');
  ctx.fillStyle=grad;ctx.beginPath();ctx.roundRect(0,0,W,H,16);ctx.fill();

  var rounds=JSON.parse(localStorage.getItem('sg_rounds')||'[]');
  var calRounds=JSON.parse(localStorage.getItem('sg_v14_calendar_rounds')||'[]');
  var allR=rounds.concat(calRounds);

  ctx.fillStyle='#fff';ctx.font='bold 22px sans-serif';ctx.textAlign='left';
  ctx.fillText('SmartGolf Round Report',30,40);
  ctx.font='12px sans-serif';ctx.fillStyle='rgba(255,255,255,.7)';
  ctx.fillText(new Date().toLocaleDateString('ko-KR')+' | v15.0',30,60);

  if(allR.length===0){
    ctx.fillStyle='rgba(255,255,255,.5)';ctx.font='16px sans-serif';ctx.textAlign='center';
    ctx.fillText('라운드 기록이 없습니다',W/2,H/2);
    return;
  }

  var scores=allR.map(function(r){return r.score});
  var avg=Math.round(scores.reduce(function(a,b){return a+b},0)/scores.length);
  var best=Math.min.apply(null,scores);
  var worst=Math.max.apply(null,scores);

  var stats=[
    {label:'총 라운드',value:allR.length+'R'},
    {label:'평균 스코어',value:avg+'타'},
    {label:'베스트',value:best+'타'},
    {label:'최근',value:scores[0]+'타'}
  ];

  ctx.fillStyle='rgba(255,255,255,.15)';
  var boxW=(W-80)/4;
  stats.forEach(function(s,i){
    var x=30+i*(boxW+8);
    ctx.beginPath();ctx.roundRect(x,80,boxW,70,10);ctx.fill();
    ctx.fillStyle='#fff';ctx.font='bold 22px sans-serif';ctx.textAlign='center';
    ctx.fillText(s.value,x+boxW/2,118);
    ctx.fillStyle='rgba(255,255,255,.6)';ctx.font='11px sans-serif';
    ctx.fillText(s.label,x+boxW/2,138);
    ctx.fillStyle='rgba(255,255,255,.15)';
  });

  var chartY=175,chartH=150,chartPadL=50,chartPadR=30;
  var chartW=W-chartPadL-chartPadR;
  var recent=scores.slice(0,15).reverse();
  var mn=Math.min.apply(null,recent)-5,mx=Math.max.apply(null,recent)+5;

  ctx.strokeStyle='rgba(255,255,255,.1)';ctx.lineWidth=.5;
  for(var i=0;i<=4;i++){
    var y=chartY+chartH*i/4;
    ctx.beginPath();ctx.moveTo(chartPadL,y);ctx.lineTo(W-chartPadR,y);ctx.stroke();
    ctx.fillStyle='rgba(255,255,255,.4)';ctx.font='9px sans-serif';ctx.textAlign='right';
    ctx.fillText(Math.round(mx-(mx-mn)*i/4),chartPadL-5,y+3);
  }

  if(mn<72&&mx>72){
    var parY=chartY+chartH*(1-(72-mn)/(mx-mn));
    ctx.strokeStyle='rgba(255,107,53,.5)';ctx.lineWidth=1;ctx.setLineDash([4,4]);
    ctx.beginPath();ctx.moveTo(chartPadL,parY);ctx.lineTo(W-chartPadR,parY);ctx.stroke();ctx.setLineDash([]);
    ctx.fillStyle='rgba(255,107,53,.8)';ctx.font='9px sans-serif';ctx.textAlign='left';ctx.fillText('PAR 72',chartPadL+4,parY-4);
  }

  ctx.beginPath();ctx.strokeStyle='#7bed9f';ctx.lineWidth=2.5;ctx.lineJoin='round';
  var pts=recent.map(function(s,i){return{x:recent.length===1?chartPadL+chartW/2:chartPadL+chartW*i/(recent.length-1),y:chartY+chartH*(1-(s-mn)/(mx-mn))}});
  pts.forEach(function(p,i){i===0?ctx.moveTo(p.x,p.y):ctx.lineTo(p.x,p.y)});ctx.stroke();

  ctx.lineTo(pts[pts.length-1].x,chartY+chartH);ctx.lineTo(pts[0].x,chartY+chartH);ctx.closePath();
  var fillGrad=ctx.createLinearGradient(0,chartY,0,chartY+chartH);
  fillGrad.addColorStop(0,'rgba(123,237,159,.25)');fillGrad.addColorStop(1,'rgba(123,237,159,.02)');
  ctx.fillStyle=fillGrad;ctx.fill();

  pts.forEach(function(p,i){
    ctx.beginPath();ctx.arc(p.x,p.y,4,0,Math.PI*2);ctx.fillStyle=recent[i]<=72?'#ff6b35':'#7bed9f';ctx.fill();
    ctx.strokeStyle='rgba(255,255,255,.8)';ctx.lineWidth=1.5;ctx.stroke();
    if(recent.length<=10){ctx.fillStyle='#fff';ctx.font='bold 10px sans-serif';ctx.textAlign='center';ctx.fillText(recent[i],p.x,p.y-10)}
  });

  ctx.fillStyle='rgba(255,255,255,.3)';ctx.font='10px sans-serif';ctx.textAlign='center';
  ctx.fillText('SmartGolf v15.0 | PRIME Holdings',W/2,H-15);
}

window._v15ReportDownload = function(){
  var c=document.getElementById('v15ReportCanvas');if(!c)return;
  var a=document.createElement('a');a.download='smartgolf_report_'+new Date().toISOString().split('T')[0]+'.png';a.href=c.toDataURL('image/png');a.click();v15Toast('리포트 다운로드 완료!');v15SFX('report');
};
window._v15ReportCopy = function(){
  var c=document.getElementById('v15ReportCanvas');if(!c)return;
  c.toBlob(function(blob){
    if(navigator.clipboard&&window.ClipboardItem){
      navigator.clipboard.write([new ClipboardItem({'image/png':blob})]).then(function(){v15Toast('클립보드에 복사됨!');v15SFX('report')});
    } else {v15Toast('이 브라우저에서는 지원되지 않습니다')}
  });
};

// === 7. Golf Fitness ===
function v15Fitness(){
  var routines = [
    {name:'라운드 전 워밍업',time:'10분',exercises:[
      {name:'목 스트레칭',desc:'좌우/전후로 천천히 10초씩 4방향',dur:'40초'},
      {name:'어깨 회전',desc:'양팔을 벌리고 큰 원을 그리며 전후 10회씩',dur:'1분'},
      {name:'몸통 회전',desc:'골프 자세에서 상체 좌우 회전 10회',dur:'1분'},
      {name:'골반 스트레칭',desc:'런지 자세로 좌우 15초씩',dur:'30초'},
      {name:'손목 스트레칭',desc:'손바닥을 위아래로 당기며 10초씩',dur:'40초'},
      {name:'하프 스윙 연습',desc:'7번 아이언으로 부드러운 하프 스윙 10회',dur:'2분'},
      {name:'풀 스윙 연습',desc:'점점 세기를 올리며 풀스윙 5회',dur:'2분'},
      {name:'퍼팅 감각',desc:'3m 퍼팅 5회로 감각 확인',dur:'2분'}
    ]},
    {name:'라운드 후 쿨다운',time:'8분',exercises:[
      {name:'심호흡',desc:'코로 4초 흡입, 입으로 6초 배출 5회',dur:'50초'},
      {name:'전신 스트레칭',desc:'팔을 위로 올려 전신 늘이기 15초',dur:'30초'},
      {name:'햄스트링 스트레칭',desc:'다리를 펴고 상체 숙이기 좌우 15초',dur:'30초'},
      {name:'어깨/가슴 스트레칭',desc:'양손을 뒤로 깍지끼고 가슴 펴기 15초',dur:'30초'},
      {name:'허리 회전',desc:'바닥에 누워 무릎을 좌우로 떨어뜨리기',dur:'1분'},
      {name:'종아리 스트레칭',desc:'벽에 손짚고 한발씩 뒤로 빼며 15초',dur:'30초'}
    ]},
    {name:'주 3회 골프 근력',time:'20분',exercises:[
      {name:'플랭크',desc:'코어 강화: 30초 x 3세트',dur:'3분'},
      {name:'러시안 트위스트',desc:'복사근 강화: 좌우 15회 x 3세트',dur:'3분'},
      {name:'스쿼트',desc:'하체 강화: 15회 x 3세트',dur:'3분'},
      {name:'밴드 회전',desc:'저항 밴드로 스윙 동작 10회 x 3세트',dur:'3분'},
      {name:'데드버그',desc:'코어 안정성: 좌우 10회 x 3세트',dur:'3분'},
      {name:'밴드 풀어파트',desc:'어깨/등 강화: 15회 x 3세트',dur:'3분'},
      {name:'싱글레그 데드리프트',desc:'밸런스: 좌우 10회 x 2세트',dur:'2분'}
    ]}
  ];
  var activeRoutine = 0;

  function render(){
    var html = '<div class="v15-tabs" id="v15FitTabs">';
    routines.forEach(function(r,i){html+='<div class="v15-tab'+(i===activeRoutine?' active':'')+'" data-idx="'+i+'">'+r.name+'</div>'});
    html += '</div>';

    var routine = routines[activeRoutine];
    html += '<div class="v15-card" style="border-color:var(--primary)"><h4>'+routine.name+' <span class="v15-badge" style="background:var(--primary-light);color:var(--primary)">'+routine.time+'</span></h4><p>'+routine.exercises.length+'개 동작으로 구성</p></div>';

    routine.exercises.forEach(function(ex,i){
      html += '<div class="v15-fitness-step"><div class="v15-fitness-num">'+(i+1)+'</div><div style="flex:1"><div style="font-size:13px;font-weight:700">'+ex.name+' <span style="font-size:11px;color:var(--text-muted);font-weight:400">'+ex.dur+'</span></div><div style="font-size:12px;color:var(--text-muted);margin-top:4px;line-height:1.5">'+ex.desc+'</div></div></div>';
    });

    html += '<div class="v15-divider"></div>';
    html += '<div class="v15-card"><h4>&#x1F4A1; 골프 체력 팁</h4><p>라운드 중 매 3홀마다 물 한 잔, 9홀 후 간식 섭취를 권장합니다. 스윙 전 2~3초 심호흡으로 집중력을 유지하세요.</p></div>';
    return html;
  }

  var ov=document.createElement('div');ov.id='v15FitOverlay';ov.className='v15-overlay';ov.setAttribute('role','dialog');
  ov.innerHTML='<div class="v15-modal"><div class="v15-hdr"><h2><span class="v15i">&#x1F4AA;</span> 골프 피트니스</h2><button class="v15-x" aria-label="닫기">&times;</button></div><div class="v15-content">'+render()+'</div></div>';
  document.body.appendChild(ov);
  ov.querySelector('.v15-x').addEventListener('click',function(){ov.classList.remove('active')});
  ov.addEventListener('click',function(e){if(e.target===ov)ov.classList.remove('active')});
  ov.querySelector('.v15-content').addEventListener('click',function(e){
    var tab=e.target.closest('.v15-tab');if(!tab)return;
    activeRoutine=parseInt(tab.dataset.idx);v15SFX('fitness');
    document.querySelector('#v15FitOverlay .v15-content').innerHTML=render();
  });
}

// === 8. Golf Quiz (15 questions) ===
function v15Quiz(){
  var questions = [
    {q:'골프에서 &quot;알바트로스&quot;는 파보다 몇 타 적은 것?',o:['1','2','3','4'],a:2,exp:'알바트로스는 파보다 3타 적은 스코어입니다'},
    {q:'18홀 파72 코스에서 이븐파(Even par)로 치면 총 몇 타?',o:['70','72','74','76'],a:1,exp:'이븐파는 파와 동일한 72타입니다'},
    {q:'OB(Out of Bounds) 시 벌타는 몇 타?',o:['없음','1타','2타','3타'],a:1,exp:'OB는 1타 벌타 후 원래 위치에서 다시 칩니다'},
    {q:'그린 위에서 다른 플레이어의 볼이 방해될 때 하는 것은?',o:['치운다','마크한다','무시한다','벌타를 준다'],a:1,exp:'볼 마커를 놓고 볼을 들어올립니다'},
    {q:'드라이버의 일반적인 로프트 각도는?',o:['3~5도','7~9도','10.5~12도','15~18도'],a:2,exp:'일반 아마추어용 드라이버는 10.5~12도가 표준입니다'},
    {q:'&quot;레이업(Lay-up)&quot;이란?',o:['장애물 앞에 안전하게 치기','그린 위에 올리기','벙커에서 탈출하기','러프에서 치기'],a:0,exp:'위험을 피해 의도적으로 짧게 치는 전략입니다'},
    {q:'PGA 투어의 &quot;컷&quot;은 보통 몇 라운드 후?',o:['1라운드','2라운드','3라운드','4라운드'],a:1,exp:'보통 2라운드(36홀) 후 상위권만 남습니다'},
    {q:'핸디캡이 0인 골퍼를 무엇이라 하는가?',o:['프로','스크래치 골퍼','보기 골퍼','싱글 골퍼'],a:1,exp:'핸디캡 0은 스크래치(scratch) 골퍼입니다'},
    {q:'벙커 내에서 어드레스 시 클럽이 모래에 닿으면?',o:['정상','1타 벌타','2타 벌타','실격'],a:2,exp:'벙커에서 클럽이 모래에 닿으면 2타 벌타입니다'},
    {q:'&quot;도그렉(Dogleg)&quot;이란?',o:['직선 홀','꺾이는 홀','파5 홀','아일랜드 그린 홀'],a:1,exp:'페어웨이가 좌 또는 우로 꺾이는 홀입니다'},
    {q:'스트로크 플레이에서 최종 스코어가 같으면?',o:['공동 우승','서든데스 플레이오프','추첨','나이순'],a:1,exp:'대부분 서든데스 플레이오프로 승부를 가립니다'},
    {q:'골프공의 딤플(Dimple) 수는 대략?',o:['100~200','250~350','300~500','500~700'],a:2,exp:'일반 골프공은 300~500개의 딤플이 있습니다'},
    {q:'&quot;스트로크 게인드(Strokes Gained)&quot;는 무엇을 측정?',o:['스윙 속도','투어 평균 대비 성적','비거리','퍼팅 정확도'],a:1,exp:'PGA 투어 평균 대비 각 샷의 기여도를 분석합니다'},
    {q:'로스트볼(Lost Ball)의 수색 시간 제한은?',o:['1분','3분','5분','무제한'],a:1,exp:'2019년 규칙 개정으로 3분으로 단축되었습니다'},
    {q:'&quot;컨시드(Concede)&quot;가 허용되는 경기 방식은?',o:['스트로크 플레이','매치 플레이','둘 다','없음'],a:1,exp:'매치 플레이에서만 상대의 퍼팅을 컨시드할 수 있습니다'}
  ];
  var currentQ=0,score=0,answered=false,answers=[];

  function render(){
    if(currentQ>=questions.length){
      var grade=score>=14?'S':score>=12?'A':score>=10?'B':score>=7?'C':'D';
      var gradeColor={S:'#ffd700',A:'#c0c0c0',B:'#cd7f32',C:'#4caf50',D:'#ff4444'}[grade];
      var html = '<div style="text-align:center;padding:30px"><div style="font-size:48px;margin-bottom:10px">&#x1F3C6;</div>';
      html += '<h3 style="font-size:24px;font-weight:900;margin-bottom:10px">퀴즈 완료!</h3>';
      html += '<div style="font-size:42px;font-weight:900;color:var(--primary)">'+score+'/'+questions.length+'</div>';
      html += '<div class="v15-badge" style="background:'+gradeColor+';color:#fff;font-size:16px;padding:6px 20px;margin-top:10px">'+grade+'등급</div>';
      html += '<div class="v15-divider"></div>';
      html += '<button class="v15-btn v15-btn-primary" onclick="window._v15QuizReset()">다시 도전</button></div>';
      return html;
    }
    var q=questions[currentQ];
    var html = '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px"><span class="v15-badge" style="background:var(--primary-light);color:var(--primary)">'+(currentQ+1)+'/'+questions.length+'</span><span style="font-size:13px;font-weight:700;color:var(--primary)">'+score+'점</span></div>';
    html += '<div class="v15-card" style="border-color:var(--primary)"><h4>Q'+(currentQ+1)+'. '+q.q+'</h4></div>';
    q.o.forEach(function(opt,i){
      var cls='v15-quiz-option';
      if(answered){
        if(i===q.a)cls+=' correct';
        else if(answers[currentQ]===i&&i!==q.a)cls+=' wrong';
      }
      html += '<button class="'+cls+'" data-idx="'+i+'" '+(answered?'disabled':'')+'>'+opt+'</button>';
    });
    if(answered){
      html += '<div class="v15-card" style="margin-top:10px"><p><strong>&#x1F4A1; 해설:</strong> '+q.exp+'</p></div>';
      html += '<button class="v15-btn v15-btn-primary" onclick="window._v15QuizNext()" style="margin-top:10px">'+(currentQ<questions.length-1?'다음 문제':'결과 보기')+'</button>';
    }
    return html;
  }

  window._v15QuizAnswer = function(i){
    if(answered)return;
    answered=true;answers[currentQ]=i;
    if(i===questions[currentQ].a){score++;v15SFX('quiz')}else{v15SFX('quiz_wrong')}
    document.querySelector('#v15QuizOverlay .v15-content').innerHTML=render();
  };
  window._v15QuizNext = function(){currentQ++;answered=false;document.querySelector('#v15QuizOverlay .v15-content').innerHTML=render()};
  window._v15QuizReset = function(){currentQ=0;score=0;answered=false;answers=[];document.querySelector('#v15QuizOverlay .v15-content').innerHTML=render()};

  var ov=document.createElement('div');ov.id='v15QuizOverlay';ov.className='v15-overlay';ov.setAttribute('role','dialog');
  ov.innerHTML='<div class="v15-modal"><div class="v15-hdr"><h2><span class="v15i">&#x1F4DA;</span> 골프 지식 퀴즈 v2</h2><button class="v15-x" aria-label="닫기">&times;</button></div><div class="v15-content">'+render()+'</div></div>';
  document.body.appendChild(ov);
  ov.querySelector('.v15-x').addEventListener('click',function(){ov.classList.remove('active')});
  ov.addEventListener('click',function(e){if(e.target===ov)ov.classList.remove('active')});
  ov.querySelector('.v15-content').addEventListener('click',function(e){
    var opt=e.target.closest('.v15-quiz-option');if(!opt||answered)return;
    window._v15QuizAnswer(parseInt(opt.dataset.idx));
  });
}

// === Achievement System ===
var v15Achievements = [
  {id:'v15_club_first',name:'첫 샷 기록',desc:'클럽 매니저에 첫 샷 거리 기록',check:function(){var clubs=v15LS('clubs')||[];return clubs.some(function(c){return c.shots&&c.shots.length>0})}},
  {id:'v15_club_50',name:'샷 수집가',desc:'총 50개 샷 거리 기록',check:function(){var clubs=v15LS('clubs')||[];return clubs.reduce(function(s,c){return s+(c.shots?c.shots.length:0)},0)>=50}},
  {id:'v15_scorecard_first',name:'첫 스코어카드',desc:'상세 스코어카드 1회 저장',check:function(){return (v15LS('scorecards')||[]).length>=1}},
  {id:'v15_scorecard_5',name:'스코어카드 마니아',desc:'스코어카드 5회 저장',check:function(){return (v15LS('scorecards')||[]).length>=5}},
  {id:'v15_practice_first',name:'연습벌레',desc:'연습 일지 첫 기록',check:function(){return (v15LS('practice_logs')||[]).length>=1}},
  {id:'v15_practice_20',name:'연습의 달인',desc:'연습 20회 기록',check:function(){return (v15LS('practice_logs')||[]).length>=20}},
  {id:'v15_practice_week',name:'주간 연습왕',desc:'이번 주 연습 5회 이상',check:function(){var logs=v15LS('practice_logs')||[];var cnt=logs.filter(function(l){return (new Date()-new Date(l.date))<7*24*60*60*1000}).length;return cnt>=5}},
  {id:'v15_quiz_perfect',name:'골프 박사',desc:'퀴즈 15문제 만점',check:function(){return false}},
  {id:'v15_report_share',name:'리포트 공유',desc:'라운드 리포트 다운로드/복사',check:function(){return v15LS('report_shared')}},
  {id:'v15_all_features',name:'올라운더 v15',desc:'v15 모든 기능 1회 이상 사용',check:function(){var clubs=v15LS('clubs')||[];var hasClub=clubs.some(function(c){return c.shots&&c.shots.length>0});return hasClub&&(v15LS('scorecards')||[]).length>0&&(v15LS('practice_logs')||[]).length>0}}
];

function v15CheckAchieve(){
  var achieved=v15LS('achievements')||{};
  v15Achievements.forEach(function(a){
    if(!achieved[a.id]&&a.check()){
      achieved[a.id]=new Date().toISOString();v15LS('achievements',achieved);
      v15Toast('&#x1F3C5; '+a.name+' 업적 달성!');v15SFX('achieve');
    }
  });
}

// === Quick Action Buttons ===
function v15QuickActions(){
  var actions = [
    {id:'v15ClubBtn',label:'&#x1F3CC;&#xFE0F; 클럽매니저',overlay:'v15ClubOverlay'},
    {id:'v15SCBtn',label:'&#x1F4CB; 스코어카드',overlay:'v15SCOverlay'},
    {id:'v15PracBtn',label:'&#x1F4DD; 연습일지',overlay:'v15PracOverlay'},
    {id:'v15LeaderBtn',label:'&#x1F3C6; 리더보드',overlay:'v15LeaderOverlay'},
    {id:'v15RecBtn',label:'&#x1F916; 클럽추천',overlay:'v15RecOverlay'},
    {id:'v15ReportBtn',label:'&#x1F4CA; 리포트',overlay:'v15ReportOverlay'},
    {id:'v15FitBtn',label:'&#x1F4AA; 피트니스',overlay:'v15FitOverlay'},
    {id:'v15QuizBtn',label:'&#x1F4DA; 퀴즈v2',overlay:'v15QuizOverlay'}
  ];

  function inject(){
    var container=document.querySelector('.results-section');
    if(!container)return;
    var existing=document.getElementById('v15QuickBar');
    if(existing)return;
    var bar=document.createElement('div');
    bar.id='v15QuickBar';
    bar.style.cssText='display:flex;flex-wrap:wrap;gap:8px;padding:0 0 14px;';
    actions.forEach(function(a){
      var btn=document.createElement('button');
      btn.id=a.id;btn.innerHTML=a.label;
      btn.style.cssText='padding:8px 16px;border:1.5px solid var(--border);border-radius:20px;background:var(--card-bg);font-size:12px;font-weight:600;cursor:pointer;transition:.2s;color:var(--text);white-space:nowrap';
      btn.addEventListener('mouseover',function(){this.style.borderColor='var(--primary)';this.style.color='var(--primary)'});
      btn.addEventListener('mouseout',function(){this.style.borderColor='var(--border)';this.style.color='var(--text)'});
      btn.addEventListener('click',function(){document.getElementById(a.overlay).classList.add('active');v15SFX('club')});
      bar.appendChild(btn);
    });
    container.insertBefore(bar,container.querySelector('.results-header'));
  }
  if(document.readyState==='complete')inject();
  else window.addEventListener('load',function(){setTimeout(inject,1000)});
  setTimeout(inject,2000);
  setTimeout(inject,4000);
}

// === Keyboard Shortcuts ===
document.addEventListener('keydown',function(e){
  var t=e.target.tagName;if(t==='INPUT'||t==='TEXTAREA'||t==='SELECT')return;
  if(e.shiftKey){
    var map={
      'C':'v15ClubOverlay','S':'v15SCOverlay','P':'v15PracOverlay',
      'L':'v15LeaderOverlay','A':'v15RecOverlay','F':'v15FitOverlay','Q':'v15QuizOverlay'
    };
    if(map[e.key]){e.preventDefault();var el=document.getElementById(map[e.key]);if(el)el.classList.add('active');v15SFX('club')}
  }
  if(e.key==='Escape'){
    ['v15ClubOverlay','v15SCOverlay','v15PracOverlay','v15LeaderOverlay','v15RecOverlay','v15ReportOverlay','v15FitOverlay','v15QuizOverlay'].forEach(function(id){
      var el=document.getElementById(id);if(el)el.classList.remove('active');
    });
  }
});

// === Init ===
function v15Init(){
  v15ClubManager();
  v15Scorecard();
  v15PracticeLog();
  v15Leaderboard();
  v15ClubRecommend();
  v15RoundReport();
  v15Fitness();
  v15Quiz();
  v15QuickActions();
  v15CheckAchieve();
}

if(document.readyState==='complete'||document.readyState==='interactive'){setTimeout(v15Init,300)}
else{document.addEventListener('DOMContentLoaded',v15Init)}

})();
