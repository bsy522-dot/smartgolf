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
.v20-btn-danger{background:#ff4757;color:#fff}
.v20-btn-danger:hover{background:#e03e4e}
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
.v20-group-table{width:100%;border-collapse:collapse;font-size:12px}
.v20-group-table th{background:var(--primary);color:#fff;padding:10px 8px;text-align:center;font-size:11px;font-weight:700}
.v20-group-table td{padding:9px 8px;text-align:center;border-bottom:1px solid var(--border)}
.v20-group-table tr:hover td{background:var(--primary-light)}
.v20-group-table .eagle{background:#ffd700;color:#000;font-weight:800;border-radius:4px}
.v20-group-table .birdie{background:#2e9e4f;color:#fff;font-weight:700;border-radius:4px}
.v20-group-table .par{background:var(--bg)}
.v20-group-table .bogey{background:#ff9f43;color:#fff;border-radius:4px}
.v20-group-table .double-plus{background:#ff4757;color:#fff;border-radius:4px}
.v20-skins-row{display:flex;justify-content:space-between;align-items:center;padding:10px 14px;background:var(--bg);border-radius:12px;margin-bottom:6px}
.v20-skins-won{color:var(--primary);font-weight:800;font-size:16px}
.v20-flyover-svg{width:100%;max-width:700px;margin:0 auto;display:block}
.v20-hole-info{display:flex;justify-content:space-between;align-items:center;padding:12px 18px;background:var(--bg);border-radius:14px;margin-bottom:12px}
.v20-hole-num{font-size:22px;font-weight:900;color:var(--primary)}
.v20-hole-par{font-size:14px;font-weight:700}
.v20-hole-yard{font-size:14px;color:var(--text-muted)}
.v20-dispersion-canvas{width:100%;max-width:500px;height:400px;margin:0 auto;display:block;border-radius:16px}
.v20-fitting-item{display:flex;gap:14px;align-items:center;padding:14px;background:var(--bg);border-radius:14px;margin-bottom:10px;transition:.25s}
.v20-fitting-item:hover{transform:translateY(-2px);box-shadow:0 3px 12px rgba(26,122,58,.1)}
.v20-fitting-icon{width:50px;height:50px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:24px;flex-shrink:0}
.v20-fitting-info{flex:1}
.v20-fitting-name{font-size:14px;font-weight:700;margin-bottom:2px}
.v20-fitting-desc{font-size:11px;color:var(--text-muted);line-height:1.6}
.v20-caddie-note{background:var(--bg);border-radius:16px;padding:16px;margin-bottom:10px;border-left:4px solid var(--primary)}
.v20-caddie-hole{font-size:13px;font-weight:800;color:var(--primary);margin-bottom:4px}
.v20-caddie-tip{font-size:12px;color:var(--text-muted);line-height:1.7}
.v20-green-meter{position:relative;height:24px;background:linear-gradient(90deg,#e8f5e9,#1a7a3a,#0f5a28);border-radius:12px;margin:10px 0}
.v20-green-marker{position:absolute;top:-4px;width:4px;height:32px;background:var(--accent);border-radius:2px;transition:left .4s}
.v20-photo-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(120px,1fr));gap:8px}
.v20-photo-card{border-radius:12px;overflow:hidden;aspect-ratio:1;background:var(--bg);position:relative;cursor:pointer;transition:.25s}
.v20-photo-card:hover{transform:scale(1.04)}
.v20-photo-card img{width:100%;height:100%;object-fit:cover}
.v20-photo-overlay{position:absolute;bottom:0;left:0;right:0;background:linear-gradient(transparent,rgba(0,0,0,.7));color:#fff;padding:8px;font-size:10px}
.v20-season-card{background:var(--bg);border-radius:18px;padding:20px;text-align:center;transition:.25s}
.v20-season-card:hover{transform:translateY(-3px);box-shadow:0 4px 18px rgba(26,122,58,.12)}
.v20-season-num{font-size:32px;font-weight:900;color:var(--primary)}
.v20-season-label{font-size:11px;color:var(--text-muted);margin-top:4px}
.v20-nassau-card{background:linear-gradient(135deg,#1a7a3a,#0f5a28);color:#fff;border-radius:18px;padding:20px;margin-bottom:12px}
.v20-nassau-title{font-size:16px;font-weight:800;margin-bottom:12px;text-align:center}
.v20-nassau-row{display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid rgba(255,255,255,.2);font-size:13px}
.v20-nassau-row:last-child{border-bottom:none}
`;
document.head.appendChild(css20);

// ===== 1. GROUP SCORECARD (4인 스코어링 + 스킨스 + 나쏘) =====
var GROUP_PARS = [4,4,3,5,4,4,3,4,5,4,3,4,5,4,4,3,4,5];

function v20OpenGroup(){
  var ov = document.getElementById('v20GroupOv');
  if(!ov){
    ov = document.createElement('div');
    ov.id='v20GroupOv';
    ov.className='v20-overlay';
    ov.innerHTML='<div class="v20-modal" id="v20GroupModal"></div>';
    ov.addEventListener('click',function(e){if(e.target===ov)ov.classList.remove('active');});
    document.body.appendChild(ov);
  }
  v20RenderGroup();
  ov.classList.add('active');
  v20PlaySFX('group');
}
window.v20OpenGroup=v20OpenGroup;

function v20GetGroupData(){
  var d = localStorage.getItem('sg_group_scores');
  if(d) return JSON.parse(d);
  return {
    players:['&#xB098;','&#xD50C;&#xB808;&#xC774;&#xC5B4;2','&#xD50C;&#xB808;&#xC774;&#xC5B4;3','&#xD50C;&#xB808;&#xC774;&#xC5B4;4'],
    scores:[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]],
    activeTab:'scorecard'
  };
}

function v20SaveGroupData(d){ localStorage.setItem('sg_group_scores',JSON.stringify(d)); }

function v20RenderGroup(){
  var m=document.getElementById('v20GroupModal');
  var d=v20GetGroupData();
  var tab=d.activeTab||'scorecard';
  var tabs=['scorecard','skins','nassau','stats'];
  var tabLabels=['&#x1F4CB; &#xC2A4;&#xCF54;&#xC5B4;&#xCE74;&#xB4DC;','&#x1F3AF; &#xC2A4;&#xD0A8;&#xC2A4;','&#x1F3CC;&#xFE0F; &#xB098;&#xC3D8;','&#x1F4CA; &#xD1B5;&#xACC4;'];
  var h='<div class="v20-hdr"><h2><span class="v20i">&#x1F465;</span> 4&#xC778; &#xADF8;&#xB8F9; &#xC2A4;&#xCF54;&#xC5B4;&#xB9C1;</h2><button class="v20-x" onclick="document.getElementById(\'v20GroupOv\').classList.remove(\'active\')">&times;</button></div>';
  h+='<div class="v20-tabs">';
  tabs.forEach(function(t,i){h+='<div class="v20-tab'+(tab===t?' active':'')+'" onclick="v20GroupTab(\''+t+'\')">'+tabLabels[i]+'</div>';});
  h+='</div>';

  if(tab==='scorecard'){
    h+='<div style="margin-bottom:14px"><b>&#xD50C;&#xB808;&#xC774;&#xC5B4; &#xC774;&#xB984; &#xC124;&#xC815;:</b><div class="v20-grid4" style="margin-top:8px">';
    for(var p=0;p<4;p++){
      h+='<input class="v20-input" style="text-align:center" value="'+d.players[p]+'" onchange="v20SetPlayer('+p+',this.value)" placeholder="P'+(p+1)+'">';
    }
    h+='</div></div>';
    h+='<div style="overflow-x:auto"><table class="v20-group-table"><thead><tr><th>&#xD640;</th>';
    for(var p=0;p<4;p++) h+='<th>'+d.players[p]+'</th>';
    h+='<th>PAR</th></tr></thead><tbody>';
    var totals=[0,0,0,0];
    for(var i=0;i<18;i++){
      h+='<tr><td style="font-weight:800">'+(i+1)+'</td>';
      for(var p=0;p<4;p++){
        var sc=d.scores[p][i];
        var cls='';
        if(sc>0){
          var diff=sc-GROUP_PARS[i];
          if(diff<=-2)cls='eagle';
          else if(diff===-1)cls='birdie';
          else if(diff===0)cls='par';
          else if(diff===1)cls='bogey';
          else cls='double-plus';
          totals[p]+=sc;
        }
        h+='<td><input type="number" min="1" max="15" style="width:48px;text-align:center;border:1.5px solid var(--border);border-radius:6px;padding:4px;font-size:12px;font-weight:700;background:var(--bg);color:var(--text)" class="'+(sc>0?cls:'')+'" value="'+(sc||'')+'" onchange="v20SetScore('+p+','+i+',this.value)"></td>';
      }
      h+='<td style="font-weight:700;color:var(--primary)">'+GROUP_PARS[i]+'</td></tr>';
      if(i===8){
        h+='<tr style="background:var(--primary-light);font-weight:800"><td>OUT</td>';
        for(var p=0;p<4;p++){
          var front=0;for(var k=0;k<9;k++)front+=d.scores[p][k]||0;
          h+='<td>'+( front||'-')+'</td>';
        }
        h+='<td>'+GROUP_PARS.slice(0,9).reduce(function(a,b){return a+b;},0)+'</td></tr>';
      }
    }
    h+='<tr style="background:var(--primary-light);font-weight:800"><td>IN</td>';
    for(var p=0;p<4;p++){
      var back=0;for(var k=9;k<18;k++)back+=d.scores[p][k]||0;
      h+='<td>'+(back||'-')+'</td>';
    }
    h+='<td>'+GROUP_PARS.slice(9).reduce(function(a,b){return a+b;},0)+'</td></tr>';
    h+='<tr style="background:var(--primary);color:#fff;font-weight:900"><td>TOTAL</td>';
    for(var p=0;p<4;p++) h+='<td>'+(totals[p]||'-')+'</td>';
    h+='<td>'+GROUP_PARS.reduce(function(a,b){return a+b;},0)+'</td></tr>';
    h+='</tbody></table></div>';
    h+='<div style="margin-top:14px;display:flex;gap:8px;flex-wrap:wrap">';
    h+='<button class="v20-btn v20-btn-primary v20-btn-sm" onclick="v20SaveGroupRound()">&#x1F4BE; &#xB77C;&#xC6B4;&#xB4DC; &#xC800;&#xC7A5;</button>';
    h+='<button class="v20-btn v20-btn-danger v20-btn-sm" onclick="v20ResetGroup()">&#x1F5D1; &#xCD08;&#xAE30;&#xD654;</button>';
    h+='</div>';
  } else if(tab==='skins'){
    h+=v20RenderSkins(d);
  } else if(tab==='nassau'){
    h+=v20RenderNassau(d);
  } else {
    h+=v20RenderGroupStats(d);
  }
  m.innerHTML=h;
}

function v20RenderSkins(d){
  var h='<h3 style="font-size:16px;font-weight:800;margin-bottom:14px">&#x1F3AF; &#xC2A4;&#xD0A8;&#xC2A4; &#xAC8C;&#xC784;</h3>';
  h+='<p style="font-size:12px;color:var(--text-muted);margin-bottom:14px">&#xAC01; &#xD640;&#xC5D0;&#xC11C; &#xC720;&#xC77C;&#xD558;&#xAC8C; &#xAC00;&#xC7A5; &#xB0AE;&#xC740; &#xC2A4;&#xCF54;&#xC5B4;&#xB97C; &#xAE30;&#xB85D;&#xD55C; &#xD50C;&#xB808;&#xC774;&#xC5B4;&#xAC00; &#xD574;&#xB2F9; &#xD640;&#xC758; &#xC2A4;&#xD0A8;&#xC744; &#xD68D;&#xB4DD;&#xD569;&#xB2C8;&#xB2E4;.</p>';
  var skins=[0,0,0,0];
  for(var i=0;i<18;i++){
    var scores=[];
    var allFilled=true;
    for(var p=0;p<4;p++){
      if(!d.scores[p][i]||d.scores[p][i]===0){allFilled=false;break;}
      scores.push(d.scores[p][i]);
    }
    var winner=-1;
    if(allFilled){
      var minS=Math.min.apply(null,scores);
      var cnt=0;var wi=-1;
      for(var p=0;p<4;p++){if(scores[p]===minS){cnt++;wi=p;}}
      if(cnt===1){winner=wi;skins[wi]++;}
    }
    h+='<div class="v20-skins-row">';
    h+='<span style="font-weight:700">&#xD640; '+(i+1)+' (Par '+GROUP_PARS[i]+')</span>';
    if(!allFilled) h+='<span style="color:var(--text-muted);font-size:12px">&#xBBF8;&#xC785;&#xB825;</span>';
    else if(winner>=0) h+='<span class="v20-skins-won">&#x1F3C6; '+d.players[winner]+'</span>';
    else h+='<span style="color:var(--text-muted);font-size:12px">&#xCE90;&#xB9AC;&#xC624;&#xBC84;</span>';
    h+='</div>';
  }
  h+='<div class="v20-divider"></div><h3 style="font-size:16px;font-weight:800;margin-bottom:12px">&#xC2A4;&#xD0A8;&#xC2A4; &#xC9D1;&#xACC4;</h3>';
  h+='<div class="v20-grid4">';
  for(var p=0;p<4;p++){
    h+='<div class="v20-season-card"><div class="v20-season-num">'+skins[p]+'</div><div class="v20-season-label">'+d.players[p]+'</div></div>';
  }
  h+='</div>';
  return h;
}

function v20RenderNassau(d){
  var h='<div class="v20-nassau-card">';
  h+='<div class="v20-nassau-title">&#x1F3CC;&#xFE0F; &#xB098;&#xC3D8; &#xBCA0;&#xD305; (3&#xD310; &#xC2B9;&#xBD80;)</div>';
  var front=[0,0,0,0],back=[0,0,0,0],total=[0,0,0,0];
  for(var p=0;p<4;p++){
    for(var i=0;i<9;i++) front[p]+=(d.scores[p][i]||0);
    for(var i=9;i<18;i++) back[p]+=(d.scores[p][i]||0);
    total[p]=front[p]+back[p];
  }
  var rounds = [{name:'&#xC804;&#xBC18; (1~9&#xD640;)',scores:front},{name:'&#xD6C4;&#xBC18; (10~18&#xD640;)',scores:back},{name:'&#xC804;&#xCCB4; (1~18&#xD640;)',scores:total}];
  rounds.forEach(function(r){
    h+='<div class="v20-nassau-row"><span>'+r.name+'</span><span>';
    var minS=Infinity;var winner='';
    for(var p=0;p<4;p++){if(r.scores[p]>0&&r.scores[p]<minS){minS=r.scores[p];winner=d.players[p];}}
    h+=winner?('&#x1F451; '+winner+' ('+minS+')'):'&#xBBF8;&#xC815;';
    h+='</span></div>';
  });
  h+='</div>';
  h+='<div class="v20-card"><h4>&#x1F4D6; &#xB098;&#xC3D8; &#xADDC;&#xCE59;</h4><p>';
  h+='&#xB098;&#xC3D8;&#xB294; &#xC804;&#xBC18;9&#xD640;, &#xD6C4;&#xBC18;9&#xD640;, &#xC804;&#xCCB4;18&#xD640; &#xB2E8;&#xC704;&#xB85C; 3&#xD310; &#xC2B9;&#xBD80;&#xB97C; &#xACB0;&#xC815;&#xD569;&#xB2C8;&#xB2E4;. ';
  h+='&#xAC01; &#xD310;&#xC5D0;&#xC11C; &#xCD5C;&#xC800; &#xC2A4;&#xCF54;&#xC5B4;&#xB97C; &#xAE30;&#xB85D;&#xD55C; &#xD50C;&#xB808;&#xC774;&#xC5B4;&#xAC00; &#xC2B9;&#xB9AC;&#xD569;&#xB2C8;&#xB2E4;. ';
  h+='&#xD504;&#xB808;&#xC2A4;&#xAC00; &#xC5C6;&#xC774; &#xCE5C;&#xBAA9;&#xD55C; &#xB77C;&#xC6B4;&#xB4DC;&#xB97C; &#xC990;&#xAE38; &#xC218; &#xC788;&#xC2B5;&#xB2C8;&#xB2E4;.</p></div>';
  return h;
}

function v20RenderGroupStats(d){
  var h='<h3 style="font-size:16px;font-weight:800;margin-bottom:14px">&#x1F4CA; &#xADF8;&#xB8F9; &#xD1B5;&#xACC4;</h3>';
  h+='<div class="v20-grid2">';
  for(var p=0;p<4;p++){
    var total=0,cnt=0,birdies=0,pars=0,bogeys=0,best=99;
    for(var i=0;i<18;i++){
      var sc=d.scores[p][i];
      if(sc>0){
        total+=sc;cnt++;
        var diff=sc-GROUP_PARS[i];
        if(diff<0)birdies++;
        else if(diff===0)pars++;
        else bogeys++;
        if(sc<best)best=sc;
      }
    }
    h+='<div class="v20-card">';
    h+='<h4>'+d.players[p]+'</h4>';
    h+='<div class="v20-stat-row"><span>&#xCD1D;&#xD0C0;&#xC218;</span><span style="font-weight:800">'+(total||'-')+'</span></div>';
    h+='<div class="v20-stat-row"><span>&#xBC84;&#xB514;/&#xD30C;/&#xBCF4;&#xAE30;</span><span style="font-weight:700">'+birdies+'/'+pars+'/'+bogeys+'</span></div>';
    h+='<div class="v20-stat-row"><span>&#xD3C9;&#xADE0; &#xD0C0;&#xC218;</span><span style="font-weight:700">'+(cnt>0?(total/cnt).toFixed(1):'-')+'</span></div>';
    h+='<div class="v20-stat-row"><span>&#xBCA0;&#xC2A4;&#xD2B8; &#xD640;</span><span style="font-weight:700;color:var(--primary)">'+(best<99?best:'-')+'</span></div>';
    h+='</div>';
  }
  h+='</div>';
  return h;
}

window.v20GroupTab=function(t){
  var d=v20GetGroupData();d.activeTab=t;v20SaveGroupData(d);v20RenderGroup();
};
window.v20SetPlayer=function(p,v){
  var d=v20GetGroupData();d.players[p]=v;v20SaveGroupData(d);
};
window.v20SetScore=function(p,hole,val){
  var d=v20GetGroupData();d.scores[p][hole]=parseInt(val)||0;v20SaveGroupData(d);v20RenderGroup();
  v20CheckAchievements();
};
window.v20ResetGroup=function(){
  if(confirm('&#xADF8;&#xB8F9; &#xC2A4;&#xCF54;&#xC5B4;&#xB97C; &#xCD08;&#xAE30;&#xD654;&#xD560;&#xAE4C;&#xC694;?')){localStorage.removeItem('sg_group_scores');v20RenderGroup();v20PlaySFX('reset');}
};
window.v20SaveGroupRound=function(){
  var rounds=JSON.parse(localStorage.getItem('sg_group_rounds')||'[]');
  var d=v20GetGroupData();
  rounds.push({date:new Date().toISOString().slice(0,10),players:d.players.slice(),scores:d.scores.map(function(s){return s.slice();})});
  if(rounds.length>50)rounds=rounds.slice(-50);
  localStorage.setItem('sg_group_rounds',JSON.stringify(rounds));
  v20PlaySFX('save');
  v20Toast('&#xADF8;&#xB8F9; &#xB77C;&#xC6B4;&#xB4DC; &#xC800;&#xC7A5; &#xC644;&#xB8CC;!');
  v20CheckAchievements();
};

// ===== 2. COURSE FLYOVER (SVG 기반 코스 비주얼) =====
var FLYOVER_HOLES = [
  {num:1,par:4,yard:380,shape:'dogleg-r',hz:['bunker-r','water-l'],green:'oval'},
  {num:2,par:4,yard:410,shape:'straight',hz:['bunker-l','bunker-r'],green:'kidney'},
  {num:3,par:3,yard:175,shape:'straight',hz:['water-front','bunker-l'],green:'round'},
  {num:4,par:5,yard:530,shape:'dogleg-l',hz:['bunker-r','water-r'],green:'oval'},
  {num:5,par:4,yard:395,shape:'straight',hz:['bunker-l','bunker-r'],green:'kidney'},
  {num:6,par:4,yard:420,shape:'dogleg-r',hz:['water-l'],green:'round'},
  {num:7,par:3,yard:190,shape:'straight',hz:['bunker-l','bunker-r','water-front'],green:'oval'},
  {num:8,par:4,yard:370,shape:'straight',hz:['bunker-r'],green:'kidney'},
  {num:9,par:5,yard:540,shape:'dogleg-l',hz:['water-l','bunker-r'],green:'round'}
];

function v20OpenFlyover(){
  var ov=document.getElementById('v20FlyoverOv');
  if(!ov){
    ov=document.createElement('div');
    ov.id='v20FlyoverOv';
    ov.className='v20-overlay';
    ov.innerHTML='<div class="v20-modal" id="v20FlyoverModal"></div>';
    ov.addEventListener('click',function(e){if(e.target===ov)ov.classList.remove('active');});
    document.body.appendChild(ov);
  }
  v20RenderFlyover(0);
  ov.classList.add('active');
  v20PlaySFX('flyover');
}
window.v20OpenFlyover=v20OpenFlyover;

function v20RenderFlyover(idx){
  var m=document.getElementById('v20FlyoverModal');
  var hole=FLYOVER_HOLES[idx];
  var h='<div class="v20-hdr"><h2><span class="v20i">&#x1F3CC;&#xFE0F;</span> &#xCF54;&#xC2A4; &#xD50C;&#xB77C;&#xC774;&#xC624;&#xBC84;</h2><button class="v20-x" onclick="document.getElementById(\'v20FlyoverOv\').classList.remove(\'active\')">&times;</button></div>';
  h+='<div class="v20-tabs">';
  FLYOVER_HOLES.forEach(function(fh,i){
    h+='<div class="v20-tab'+(i===idx?' active':'')+'" onclick="v20FlyHole('+i+')">'+fh.num+'&#xBC88;</div>';
  });
  h+='</div>';
  h+='<div class="v20-hole-info"><span class="v20-hole-num">Hole '+hole.num+'</span><span class="v20-hole-par">Par '+hole.par+'</span><span class="v20-hole-yard">'+hole.yard+' yards</span></div>';
  h+=v20DrawHoleSVG(hole);
  h+='<div class="v20-card" style="margin-top:14px"><h4>&#x26A0;&#xFE0F; &#xD574;&#xC800;&#xB4DC; &#xC815;&#xBCF4;</h4><p>';
  hole.hz.forEach(function(hz){
    var label={'bunker-l':'&#xC88C;&#xCE21; &#xBC99;&#xCEE4;','bunker-r':'&#xC6B0;&#xCE21; &#xBC99;&#xCEE4;','water-l':'&#xC88C;&#xCE21; &#xC6CC;&#xD130;','water-r':'&#xC6B0;&#xCE21; &#xC6CC;&#xD130;','water-front':'&#xADF8;&#xB9B0; &#xC804;&#xBC29; &#xC6CC;&#xD130;'}[hz]||hz;
    h+=label+' / ';
  });
  h+='</p></div>';
  h+='<div class="v20-card"><h4>&#x1F4A1; &#xC804;&#xB7B5; &#xD301;</h4><p>';
  if(hole.par===3) h+='&#xC694; &#xD30C;3 &#xD640;&#xC740; &#xADF8;&#xB9B0; &#xC815;&#xD655;&#xB3C4;&#xAC00; &#xD575;&#xC2EC;&#xC785;&#xB2C8;&#xB2E4;. &#xBCF4;&#xAE30; &#xC774;&#xC0C1;&#xC774; &#xB098;&#xC624;&#xBA74; &#xD55C; &#xD074;&#xB7FD; &#xB192;&#xC5EC; &#xADF8;&#xB9B0; &#xC911;&#xC559;&#xC744; &#xB178;&#xB824;&#xBCF4;&#xC138;&#xC694;.';
  else if(hole.par===5) h+='&#xD30C;5 &#xD640;&#xC785;&#xB2C8;&#xB2E4;. 2&#xC628; &#xACF5;&#xB7B5;&#xBCF4;&#xB2E4;&#xB294; 3&#xD0C0; &#xC548;&#xC815;&#xC801;&#xC778; &#xACF5;&#xB7B5;&#xC744; &#xCD94;&#xCC9C;&#xD569;&#xB2C8;&#xB2E4;. &#xB808;&#xC774;&#xC5C5; &#xC704;&#xCE58;&#xB97C; &#xC798; &#xC7A1;&#xC73C;&#xC138;&#xC694;.';
  else h+='&#xD30C;4 &#xD640;&#xC785;&#xB2C8;&#xB2E4;. &#xB4DC;&#xB77C;&#xC774;&#xBC84; &#xD398;&#xC5B4;&#xC6E8;&#xC774; &#xC548;&#xCC29;&#xC774; &#xC6B0;&#xC120;&#xC785;&#xB2C8;&#xB2E4;. &#xD574;&#xC800;&#xB4DC;&#xB97C; &#xD53C;&#xD574; &#xC548;&#xC804;&#xD55C; &#xBC29;&#xD5A5;&#xC73C;&#xB85C; &#xACF5;&#xB7B5;&#xD558;&#xC138;&#xC694;.';
  h+='</p></div>';
  m.innerHTML=h;
  v20CheckAchievements();
}
window.v20FlyHole=function(i){v20RenderFlyover(i);v20PlaySFX('hole_nav');};

function v20DrawHoleSVG(hole){
  var w=650,ht=380;
  var svg='<svg class="v20-flyover-svg" viewBox="0 0 '+w+' '+ht+'" xmlns="http://www.w3.org/2000/svg">';
  svg+='<defs><linearGradient id="v20fw" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#2d5a27"/><stop offset="100%" stop-color="#3a7a35"/></linearGradient>';
  svg+='<linearGradient id="v20gr" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#4CAF50"/><stop offset="100%" stop-color="#66BB6A"/></linearGradient>';
  svg+='<linearGradient id="v20sand"><stop offset="0%" stop-color="#f5deb3"/><stop offset="100%" stop-color="#daa520"/></linearGradient>';
  svg+='<linearGradient id="v20water"><stop offset="0%" stop-color="#4fc3f7"/><stop offset="100%" stop-color="#0288d1"/></linearGradient></defs>';
  svg+='<rect width="'+w+'" height="'+ht+'" fill="#2d5a27" rx="16"/>';
  var teeX=325,teeY=340;
  var greenX=325,greenY=60;
  if(hole.shape==='dogleg-r'){
    svg+='<path d="M300,'+teeY+' Q300,200 380,140 Q400,'+greenY+' '+greenX+','+greenY+'" fill="none" stroke="url(#v20fw)" stroke-width="70" stroke-linecap="round"/>';
    svg+='<path d="M300,'+teeY+' Q300,200 380,140 Q400,'+greenY+' '+greenX+','+greenY+'" fill="none" stroke="#4a8a40" stroke-width="50" stroke-linecap="round"/>';
  } else if(hole.shape==='dogleg-l'){
    svg+='<path d="M350,'+teeY+' Q350,200 270,140 Q250,'+greenY+' '+greenX+','+greenY+'" fill="none" stroke="url(#v20fw)" stroke-width="70" stroke-linecap="round"/>';
    svg+='<path d="M350,'+teeY+' Q350,200 270,140 Q250,'+greenY+' '+greenX+','+greenY+'" fill="none" stroke="#4a8a40" stroke-width="50" stroke-linecap="round"/>';
  } else {
    svg+='<rect x="290" y="'+greenY+'" width="70" height="'+(teeY-greenY)+'" fill="url(#v20fw)" rx="25"/>';
    svg+='<rect x="300" y="'+(greenY+5)+'" width="50" height="'+(teeY-greenY-10)+'" fill="#4a8a40" rx="20"/>';
  }
  hole.hz.forEach(function(hz){
    if(hz==='bunker-l') svg+='<ellipse cx="260" cy="200" rx="22" ry="15" fill="url(#v20sand)" stroke="#c8a040" stroke-width="1.5"/>';
    if(hz==='bunker-r') svg+='<ellipse cx="390" cy="180" rx="20" ry="14" fill="url(#v20sand)" stroke="#c8a040" stroke-width="1.5"/>';
    if(hz==='water-l') svg+='<path d="M200,250 Q220,220 210,180 Q190,160 200,130" fill="none" stroke="url(#v20water)" stroke-width="18" stroke-linecap="round" opacity="0.8"/>';
    if(hz==='water-r') svg+='<path d="M450,250 Q430,220 440,180 Q460,160 450,130" fill="none" stroke="url(#v20water)" stroke-width="18" stroke-linecap="round" opacity="0.8"/>';
    if(hz==='water-front') svg+='<ellipse cx="325" cy="100" rx="50" ry="15" fill="url(#v20water)" opacity="0.8"/>';
  });
  if(hole.green==='oval') svg+='<ellipse cx="'+greenX+'" cy="'+greenY+'" rx="32" ry="24" fill="url(#v20gr)" stroke="#388E3C" stroke-width="2"/>';
  else if(hole.green==='kidney') svg+='<path d="M'+(greenX-28)+','+greenY+' Q'+(greenX-20)+','+(greenY-22)+' '+greenX+','+(greenY-18)+' Q'+(greenX+20)+','+(greenY-22)+' '+(greenX+28)+','+greenY+' Q'+(greenX+20)+','+(greenY+22)+' '+greenX+','+(greenY+18)+' Q'+(greenX-20)+','+(greenY+22)+' '+(greenX-28)+','+greenY+'" fill="url(#v20gr)" stroke="#388E3C" stroke-width="2"/>';
  else svg+='<circle cx="'+greenX+'" cy="'+greenY+'" r="26" fill="url(#v20gr)" stroke="#388E3C" stroke-width="2"/>';
  svg+='<circle cx="'+greenX+'" cy="'+greenY+'" r="3" fill="#fff"/>';
  svg+='<line x1="'+greenX+'" y1="'+(greenY-10)+'" x2="'+greenX+'" y2="'+(greenY-3)+'" stroke="#fff" stroke-width="1.5"/>';
  svg+='<rect x="310" y="'+(teeY-8)+'" width="30" height="16" rx="4" fill="#8B4513"/>';
  svg+='<text x="325" y="'+(teeY+4)+'" text-anchor="middle" fill="#fff" font-size="10" font-weight="800">TEE</text>';
  svg+='<text x="30" y="30" fill="rgba(255,255,255,.7)" font-size="14" font-weight="800">HOLE '+hole.num+'</text>';
  svg+='<text x="30" y="50" fill="rgba(255,255,255,.5)" font-size="11">Par '+hole.par+' &middot; '+hole.yard+' yd</text>';
  svg+='</svg>';
  return svg;
}

// ===== 3. SHOT DISPERSION ANALYSIS (Canvas 기반) =====
function v20OpenDispersion(){
  var ov=document.getElementById('v20DispOv');
  if(!ov){
    ov=document.createElement('div');
    ov.id='v20DispOv';
    ov.className='v20-overlay';
    ov.innerHTML='<div class="v20-modal" id="v20DispModal"></div>';
    ov.addEventListener('click',function(e){if(e.target===ov)ov.classList.remove('active');});
    document.body.appendChild(ov);
  }
  v20RenderDispersion();
  ov.classList.add('active');
  v20PlaySFX('dispersion');
}
window.v20OpenDispersion=v20OpenDispersion;

function v20GetDispData(){
  var d=localStorage.getItem('sg_dispersion');
  if(d) return JSON.parse(d);
  return {shots:[],club:'Driver'};
}

function v20RenderDispersion(){
  var m=document.getElementById('v20DispModal');
  var d=v20GetDispData();
  var clubs=['Driver','3W','5W','3I','4I','5I','6I','7I','8I','9I','PW','SW'];
  var h='<div class="v20-hdr"><h2><span class="v20i">&#x1F3AF;</span> &#xC0F7; &#xB514;&#xC2A4;&#xD37C;&#xC804; &#xBD84;&#xC11D;</h2><button class="v20-x" onclick="document.getElementById(\'v20DispOv\').classList.remove(\'active\')">&times;</button></div>';
  h+='<div style="margin-bottom:14px;display:flex;gap:8px;align-items:center;flex-wrap:wrap">';
  h+='<select class="v20-select" onchange="v20DispClub(this.value)">';
  clubs.forEach(function(c){h+='<option value="'+c+'"'+(d.club===c?' selected':'')+'>'+c+'</option>';});
  h+='</select>';
  h+='<button class="v20-btn v20-btn-sm v20-btn-primary" onclick="v20AddDispShot()">&#x2795; &#xC0F7; &#xCD94;&#xAC00;</button>';
  h+='<button class="v20-btn v20-btn-sm v20-btn-secondary" onclick="v20ClearDisp()">&#x1F5D1; &#xCD08;&#xAE30;&#xD654;</button>';
  h+='</div>';
  h+='<p style="font-size:11px;color:var(--text-muted);margin-bottom:12px">&#xCE94;&#xBC84;&#xC2A4;&#xB97C; &#xD074;&#xB9AD;/&#xD130;&#xCE58;&#xD558;&#xC5EC; &#xC0F7; &#xC704;&#xCE58;&#xB97C; &#xC785;&#xB825;&#xD558;&#xC138;&#xC694; (&#xD0C0;&#xAC9F; &#xAE30;&#xC900; &#xC0C1;&#xB300;&#xC801; &#xC704;&#xCE58;)</p>';
  h+='<canvas id="v20DispCanvas" class="v20-dispersion-canvas" width="500" height="400" style="border:2px solid var(--border);cursor:crosshair"></canvas>';
  var clubShots=d.shots.filter(function(s){return s.club===d.club;});
  if(clubShots.length>0){
    var avgX=0,avgY=0;
    clubShots.forEach(function(s){avgX+=s.x;avgY+=s.y;});
    avgX/=clubShots.length;avgY/=clubShots.length;
    var variance=0;
    clubShots.forEach(function(s){variance+=Math.pow(s.x-avgX,2)+Math.pow(s.y-avgY,2);});
    variance=Math.sqrt(variance/clubShots.length);
    var consistency=Math.max(0,100-variance*2).toFixed(0);
    h+='<div class="v20-grid3" style="margin-top:14px">';
    h+='<div class="v20-season-card"><div class="v20-season-num">'+clubShots.length+'</div><div class="v20-season-label">&#xC0F7; &#xC218;</div></div>';
    h+='<div class="v20-season-card"><div class="v20-season-num">'+consistency+'%</div><div class="v20-season-label">&#xC77C;&#xAD00;&#xC131;</div></div>';
    h+='<div class="v20-season-card"><div class="v20-season-num">'+(variance<15?'&#x1F7E2;':variance<30?'&#x1F7E1;':'&#x1F534;')+'</div><div class="v20-season-label">&#xBD84;&#xC0B0;&#xB3C4;</div></div>';
    h+='</div>';
  }
  m.innerHTML=h;
  setTimeout(function(){v20DrawDispCanvas(d);},50);
}

function v20DrawDispCanvas(d){
  var c=document.getElementById('v20DispCanvas');
  if(!c)return;
  var ctx=c.getContext('2d');
  var w=c.width,ht=c.height;
  ctx.fillStyle='#2d5a27';ctx.fillRect(0,0,w,ht);
  ctx.fillStyle='#3a7a35';ctx.fillRect(w/2-30,0,60,ht);
  ctx.strokeStyle='rgba(255,255,255,.15)';ctx.lineWidth=1;
  for(var i=0;i<5;i++){
    ctx.beginPath();ctx.arc(w/2,50,40+i*40,0,Math.PI*2);ctx.stroke();
  }
  ctx.strokeStyle='rgba(255,255,255,.3)';ctx.setLineDash([5,5]);
  ctx.beginPath();ctx.moveTo(w/2,0);ctx.lineTo(w/2,ht);ctx.stroke();
  ctx.beginPath();ctx.moveTo(0,50);ctx.lineTo(w,50);ctx.stroke();
  ctx.setLineDash([]);
  ctx.fillStyle='#fff';ctx.beginPath();ctx.arc(w/2,50,8,0,Math.PI*2);ctx.fill();
  ctx.fillStyle='red';ctx.font='10px sans-serif';ctx.textAlign='center';
  ctx.fillText('TARGET',w/2,70);
  var clubShots=d.shots.filter(function(s){return s.club===d.club;});
  clubShots.forEach(function(s,i){
    ctx.fillStyle='rgba(255,107,53,.8)';
    ctx.beginPath();ctx.arc(s.x,s.y,6,0,Math.PI*2);ctx.fill();
    ctx.fillStyle='#fff';ctx.font='bold 8px sans-serif';
    ctx.fillText(''+(i+1),s.x,s.y+3);
  });
  if(clubShots.length>1){
    var avgX=0,avgY=0;
    clubShots.forEach(function(s){avgX+=s.x;avgY+=s.y;});
    avgX/=clubShots.length;avgY/=clubShots.length;
    ctx.strokeStyle='#ffd700';ctx.lineWidth=2;
    ctx.beginPath();ctx.arc(avgX,avgY,12,0,Math.PI*2);ctx.stroke();
    ctx.fillStyle='#ffd700';ctx.font='bold 10px sans-serif';
    ctx.fillText('AVG',avgX,avgY-16);
  }
  c.onclick=function(e){
    var rect=c.getBoundingClientRect();
    var scaleX=c.width/rect.width;
    var scaleY=c.height/rect.height;
    var x=(e.clientX-rect.left)*scaleX;
    var y=(e.clientY-rect.top)*scaleY;
    var dd=v20GetDispData();
    dd.shots.push({club:dd.club,x:Math.round(x),y:Math.round(y)});
    if(dd.shots.length>200)dd.shots=dd.shots.slice(-200);
    localStorage.setItem('sg_dispersion',JSON.stringify(dd));
    v20RenderDispersion();
    v20PlaySFX('shot_add');
    v20CheckAchievements();
  };
}

window.v20DispClub=function(c){var d=v20GetDispData();d.club=c;localStorage.setItem('sg_dispersion',JSON.stringify(d));v20RenderDispersion();};
window.v20AddDispShot=function(){v20Toast('&#xCE94;&#xBC84;&#xC2A4;&#xB97C; &#xD074;&#xB9AD;&#xD558;&#xC5EC; &#xC0F7; &#xC704;&#xCE58;&#xB97C; &#xC785;&#xB825;&#xD558;&#xC138;&#xC694;!');};
window.v20ClearDisp=function(){
  if(confirm('&#xB514;&#xC2A4;&#xD37C;&#xC804; &#xB370;&#xC774;&#xD130;&#xB97C; &#xCD08;&#xAE30;&#xD654;&#xD560;&#xAE4C;&#xC694;?')){
    var d=v20GetDispData();d.shots=[];localStorage.setItem('sg_dispersion',JSON.stringify(d));v20RenderDispersion();
  }
};

// ===== 4. CLUB FITTING GUIDE =====
var FITTING_ITEMS = [
  {icon:'&#x1F4CF;',name:'&#xC0E4;&#xD504;&#xD2B8; &#xD50C;&#xB809;&#xC2A4;',color:'#4CAF50',desc:'&#xC0E4;&#xD504;&#xD2B8;&#xC758; &#xD718;&#xC5B4;&#xC9C0;&#xB294; &#xC815;&#xB3C4;. &#xC2A4;&#xC704;&#xBC0D; &#xC2A4;&#xD53C;&#xB4DC;&#xC640; &#xD15C;&#xD3EC;&#xC5D0; &#xB530;&#xB77C; R/S/X &#xD50C;&#xB809;&#xC2A4;&#xB97C; &#xC120;&#xD0DD;&#xD569;&#xB2C8;&#xB2E4;. &#xC2A4;&#xC717; &#xC2A4;&#xD53C;&#xB4DC; 85mph &#xBBF8;&#xB9CC;: R, 85-100: S, 100+: X',tip:'&#xD5E4;&#xB4DC;&#xC2A4;&#xD53C;&#xB4DC; &#xCE21;&#xC815;&#xC774; &#xAC00;&#xC7A5; &#xC815;&#xD655;&#xD569;&#xB2C8;&#xB2E4;'},
  {icon:'&#x1F4D0;',name:'&#xB77C;&#xC774; &#xAC01;&#xB3C4;',color:'#2196F3',desc:'&#xD074;&#xB7FD; &#xD5E4;&#xB4DC;&#xC758; &#xAE30;&#xC6B8;&#xAE30;. &#xD0A4;&#xC640; &#xC190;&#xBAA9;&#xBD80;&#xD130; &#xBC14;&#xB2E5;&#xAE4C;&#xC9C0; &#xAC70;&#xB9AC;&#xB85C; &#xACB0;&#xC815;&#xB429;&#xB2C8;&#xB2E4;. &#xD3EC;&#xC2A4;&#xCC98;&#xC5D0; &#xB530;&#xB978; &#xD1A0;&#xAC00; &#xC704;/&#xB2E4;&#xC6B4; &#xC870;&#xC815;&#xC774; &#xD544;&#xC694;&#xD560; &#xC218; &#xC788;&#xC2B5;&#xB2C8;&#xB2E4;.',tip:'&#xD53C;&#xD305; &#xC804;&#xBB38;&#xC810;&#xC5D0;&#xC11C; &#xC815;&#xC801; &#xD53C;&#xD305; &#xBC1B;&#xC73C;&#xC138;&#xC694;'},
  {icon:'&#x270B;',name:'&#xADF8;&#xB9BD; &#xC0AC;&#xC774;&#xC988;',color:'#FF9800',desc:'&#xC190; &#xD06C;&#xAE30;&#xC5D0; &#xB9DE;&#xB294; &#xADF8;&#xB9BD;. &#xC911;&#xC9C0; &#xAE38;&#xC774;&#xB85C; &#xCE21;&#xC815;: 7&#xC778;&#xCE58; &#xBBF8;&#xB9CC; &#xC5B8;&#xB354;&#xC0AC;&#xC774;&#xC988;, 7-8.5 &#xC2A4;&#xD0E0;&#xB354;&#xB4DC;, 8.5-9.5 &#xBBF8;&#xB4DC;&#xC0AC;&#xC774;&#xC988;, 9.5+ &#xC624;&#xBC84;&#xC0AC;&#xC774;&#xC988;',tip:'&#xADF8;&#xB9BD;&#xC774; &#xB108;&#xBB34; &#xD06C;&#xBA74; &#xC2AC;&#xB77C;&#xC774;&#xC2A4;, &#xB108;&#xBB34; &#xC791;&#xC73C;&#xBA74; &#xD6C5;&#xC774; &#xB0A0; &#xC218; &#xC788;&#xC2B5;&#xB2C8;&#xB2E4;'},
  {icon:'&#x2696;&#xFE0F;',name:'&#xC2A4;&#xC719; &#xC6E8;&#xC774;&#xD2B8;',color:'#9C27B0',desc:'&#xD074;&#xB7FD; &#xC804;&#xCCB4; &#xBB34;&#xAC8C;. &#xD5E4;&#xB4DC;&#xC2A4;&#xD53C;&#xB4DC; &#xBE60;&#xB97C;&#xC218;&#xB85D; &#xAC00;&#xBCBC;&#xC6B4; &#xD074;&#xB7FD;. D0-D2&#xAC00; &#xC77C;&#xBC18;&#xC801;&#xC774;&#xBA70;, &#xD30C;&#xC6CC;&#xD615; &#xC2A4;&#xC704;&#xC5D0;&#xB294; D3+ &#xCD94;&#xCC9C;',tip:'&#xC2A4;&#xC719;&#xC6E8;&#xC774;&#xD2B8;&#xB294; &#xCEE8;&#xC2DC;&#xC2A4;&#xD134;&#xC2DC;&#xC5D0; &#xD070; &#xC601;&#xD5A5;&#xC744; &#xBBF8;&#xCE69;&#xB2C8;&#xB2E4;'},
  {icon:'&#x1F3AF;',name:'&#xB85C;&#xD504;&#xD2B8; &#xAC01;&#xB3C4;',color:'#F44336',desc:'&#xD074;&#xB7FD;&#xD398;&#xC774;&#xC2A4; &#xAC01;&#xB3C4;. &#xD0C4;&#xB3C4;&#xAC00; &#xB0AE;&#xC73C;&#xBA74; &#xAC70;&#xB9AC;&#xAC00; &#xB298;&#xC9C0;&#xB9CC; &#xCEE8;&#xD2B8;&#xB864;&#xC774; &#xC5B4;&#xB824;&#xC6CC;&#xC9D1;&#xB2C8;&#xB2E4;. &#xB4DC;&#xB77C;&#xC774;&#xBC84; 9-12&deg;&#xAC00; &#xC77C;&#xBC18;&#xC801;',tip:'&#xD0C0;&#xAD6C;&#xAC01;&#xB3C4;&#xAC00; &#xB0AE;&#xC740; &#xD50C;&#xB808;&#xC774;&#xC5B4;&#xB294; &#xB192;&#xC740; &#xB85C;&#xD504;&#xD2B8;&#xB97C; &#xC120;&#xD0DD;&#xD558;&#xC138;&#xC694;'},
  {icon:'&#x1F4E4;',name:'&#xC0E4;&#xD504;&#xD2B8; &#xAE38;&#xC774;',color:'#00BCD4',desc:'&#xD0A4;&#xC5D0; &#xB9DE;&#xB294; &#xC0E4;&#xD504;&#xD2B8; &#xAE38;&#xC774;. &#xD0A4; 165cm &#xBBF8;&#xB9CC; -1&#xC778;&#xCE58;, 165-180 &#xD45C;&#xC900;, 180-190 +0.5, 190+ +1&#xC778;&#xCE58; &#xC870;&#xC815;',tip:'&#xD314;&#xAE38;&#xC774;&#xB3C4; &#xD568;&#xAED8; &#xCE21;&#xC815;&#xD574;&#xC57C; &#xC815;&#xD655;&#xD569;&#xB2C8;&#xB2E4;'},
  {icon:'&#x2B50;',name:'&#xD5E4;&#xB4DC; &#xD0C0;&#xC785;',color:'#FF5722',desc:'&#xBE14;&#xB808;&#xC774;&#xB4DC;/&#xCE90;&#xBE44;&#xD2F0;&#xBC31;/&#xBA38;&#xC2AC;&#xBC31;. &#xCEE8;&#xD2B8;&#xB864; &#xC6D0;&#xD558;&#xBA74; &#xBE14;&#xB808;&#xC774;&#xB4DC;, &#xAD00;&#xC6A9;&#xC740; &#xCE90;&#xBE44;&#xD2F0;&#xBC31;, &#xCD5C;&#xB300; &#xBE44;&#xAC70;&#xB9AC;&#xB294; &#xBA38;&#xC2EC;&#xBC31;',tip:'&#xD578;&#xB514;&#xCEA1; 15 &#xC774;&#xC0C1;&#xC740; &#xCE90;&#xBE44;&#xD2F0;&#xBC31;&#xC744; &#xCD94;&#xCC9C;&#xD569;&#xB2C8;&#xB2E4;'},
  {icon:'&#x1F3B3;',name:'&#xBCFC; &#xC120;&#xD0DD;',color:'#607D8B',desc:'2&#xD53C;&#xC2A4;/3&#xD53C;&#xC2A4;/&#xD22C;&#xC5B4;&#xBCFC;. &#xC2A4;&#xD540;&#xB7C9;, &#xCF04;&#xD504;&#xB808;&#xC158;, &#xBCFC;&#xC2A4;&#xD53C;&#xB4DC;&#xC5D0; &#xB530;&#xB77C; &#xC120;&#xD0DD;. &#xC2A4;&#xD540; &#xC785;&#xD788;&#xB294; &#xAC83;&#xC744; &#xC88B;&#xC544;&#xD558;&#xBA74; &#xC6B0;&#xB808;&#xD0C4; &#xCEE4;&#xBC84; &#xACE0;&#xB824;',tip:'&#xD22C;&#xC5B4;&#xBCFC;&#xC740; &#xBC14;&#xB78C;&#xC5D0; &#xAC15;&#xD558;&#xACE0; &#xCEE8;&#xD2B8;&#xB864;&#xC774; &#xC88B;&#xC2B5;&#xB2C8;&#xB2E4;'}
];

function v20OpenFitting(){
  var ov=document.getElementById('v20FitOv');
  if(!ov){
    ov=document.createElement('div');
    ov.id='v20FitOv';
    ov.className='v20-overlay';
    ov.innerHTML='<div class="v20-modal" id="v20FitModal"></div>';
    ov.addEventListener('click',function(e){if(e.target===ov)ov.classList.remove('active');});
    document.body.appendChild(ov);
  }
  var m=document.getElementById('v20FitModal');
  var h='<div class="v20-hdr"><h2><span class="v20i">&#x1F3CC;&#xFE0F;</span> &#xD074;&#xB7FD; &#xD53C;&#xD305; &#xAC00;&#xC774;&#xB4DC;</h2><button class="v20-x" onclick="document.getElementById(\'v20FitOv\').classList.remove(\'active\')">&times;</button></div>';
  h+='<p style="font-size:12px;color:var(--text-muted);margin-bottom:16px">&#xCE74;&#xCE74;&#xC624;&#xACE8;&#xD504;/Arccos &#xC218;&#xC900;&#xC758; &#xD53C;&#xD305; &#xAC00;&#xC774;&#xB4DC;. &#xAC01; &#xD56D;&#xBAA9;&#xC744; &#xD0ED;&#xD558;&#xC5EC; &#xC0C1;&#xC138; &#xD301;&#xC744; &#xD655;&#xC778;&#xD558;&#xC138;&#xC694;.</p>';
  FITTING_ITEMS.forEach(function(item,idx){
    h+='<div class="v20-fitting-item" onclick="v20ToggleFitTip('+idx+')">';
    h+='<div class="v20-fitting-icon" style="background:'+item.color+'20">'+item.icon+'</div>';
    h+='<div class="v20-fitting-info"><div class="v20-fitting-name">'+item.name+'</div><div class="v20-fitting-desc">'+item.desc+'</div>';
    h+='<div id="v20FitTip'+idx+'" style="display:none;margin-top:8px;padding:10px;background:var(--primary-light);border-radius:10px;font-size:11px;color:var(--primary);font-weight:600">&#x1F4A1; TIP: '+item.tip+'</div>';
    h+='</div></div>';
  });
  h+='<div class="v20-card" style="margin-top:14px;background:linear-gradient(135deg,var(--primary-light),var(--bg))"><h4>&#x1F4DD; AI &#xD53C;&#xD305; &#xCD94;&#xCC9C;</h4>';
  h+='<div class="v20-grid2" style="margin-top:10px">';
  h+='<div><label style="font-size:11px;font-weight:700">&#xD0A4; (cm)</label><input class="v20-input" id="v20FitHeight" type="number" placeholder="175" style="margin-top:4px"></div>';
  h+='<div><label style="font-size:11px;font-weight:700">&#xD578;&#xB514;&#xCEA1;</label><input class="v20-input" id="v20FitHdcp" type="number" placeholder="18" style="margin-top:4px"></div>';
  h+='</div>';
  h+='<button class="v20-btn v20-btn-primary" style="margin-top:12px;width:100%" onclick="v20AIFitting()">&#x1F916; AI &#xD53C;&#xD305; &#xBD84;&#xC11D;</button>';
  h+='<div id="v20FitResult" style="margin-top:12px"></div>';
  h+='</div>';
  m.innerHTML=h;
  ov.classList.add('active');
  v20PlaySFX('fitting');
  v20CheckAchievements();
}
window.v20OpenFitting=v20OpenFitting;
window.v20ToggleFitTip=function(idx){
  var el=document.getElementById('v20FitTip'+idx);
  if(el)el.style.display=el.style.display==='none'?'block':'none';
};
window.v20AIFitting=function(){
  var ht=parseInt(document.getElementById('v20FitHeight').value)||175;
  var hd=parseInt(document.getElementById('v20FitHdcp').value)||18;
  var r=document.getElementById('v20FitResult');
  var flex=hd>25?'L':hd>18?'R':hd>10?'S':'X';
  var shaft=ht<165?'-1"':ht<180?'&#xD45C;&#xC900;':ht<190?'+0.5"':'+1"';
  var grip=ht<165?'&#xC5B8;&#xB354;&#xC0AC;&#xC774;&#xC988;':ht<180?'&#xC2A4;&#xD0E0;&#xB354;&#xB4DC;':'&#xBBF8;&#xB4DC;&#xC0AC;&#xC774;&#xC988;';
  var head=hd>20?'&#xCE90;&#xBE44;&#xD2F0;&#xBC31;':hd>10?'&#xCE90;&#xBE44;&#xD2F0;&#xBC31;/&#xBE14;&#xB808;&#xC774;&#xB4DC;':'&#xBE14;&#xB808;&#xC774;&#xB4DC;';
  var loft=hd>20?'12&deg;':hd>10?'10.5&deg;':'9.5&deg;';
  r.innerHTML='<div class="v20-grid2" style="margin-top:8px">'+
    '<div class="v20-card"><h4>&#xD50C;&#xB809;&#xC2A4;</h4><p style="font-size:16px;font-weight:900;color:var(--primary)">'+flex+'</p></div>'+
    '<div class="v20-card"><h4>&#xC0E4;&#xD504;&#xD2B8;</h4><p style="font-size:16px;font-weight:900;color:var(--primary)">'+shaft+'</p></div>'+
    '<div class="v20-card"><h4>&#xADF8;&#xB9BD;</h4><p style="font-size:16px;font-weight:900;color:var(--primary)">'+grip+'</p></div>'+
    '<div class="v20-card"><h4>&#xD5E4;&#xB4DC;</h4><p style="font-size:16px;font-weight:900;color:var(--primary)">'+head+'</p></div>'+
    '<div class="v20-card"><h4>DR &#xB85C;&#xD504;&#xD2B8;</h4><p style="font-size:16px;font-weight:900;color:var(--primary)">'+loft+'</p></div>'+
    '<div class="v20-card"><h4>&#xCD94;&#xCC9C;&#xBCFC;</h4><p style="font-size:16px;font-weight:900;color:var(--primary)">'+(hd>15?'2&#xD53C;&#xC2A4;':'3&#xD53C;&#xC2A4;')+'</p></div>'+
    '</div>';
  v20PlaySFX('ai_fit');
  var fc=parseInt(localStorage.getItem('sg_fitting_cnt')||'0')+1;
  localStorage.setItem('sg_fitting_cnt',''+fc);
  v20CheckAchievements();
};

// ===== 5. CADDIE AI NOTES =====
var CADDIE_TIPS = [
  {hole:1,tip:'&#xC6B0;&#xCE21; &#xB3C4;&#xADF8;&#xB809;. &#xD398;&#xC5B4;&#xC6E8;&#xC774; &#xC88C;&#xCE21;&#xC744; &#xB178;&#xB9AC;&#xC138;&#xC694;. &#xC6B0;&#xCE21; &#xBC99;&#xCEE4;&#xB97C; &#xD53C;&#xD558;&#xBA74; &#xADF8;&#xB9B0; &#xACF5;&#xB7B5;&#xC774; &#xD3B8;&#xD574;&#xC9D1;&#xB2C8;&#xB2E4;.',club:'&#xB4DC;&#xB77C;&#xC774;&#xBC84; &#xB610;&#xB294; 3&#xBC88;&#xC6B0;&#xB4DC;',green:'&#xC624;&#xBC14;&#xD615; &#xADF8;&#xB9B0;, &#xC55E;&#xC5D0;&#xC11C; &#xB4A4;&#xB85C; &#xACBD;&#xC0AC;'},
  {hole:2,tip:'&#xC9C1;&#xC120; &#xD640;. &#xC591;&#xCABD; &#xBC99;&#xCEE4; &#xC8FC;&#xC758;. &#xADF8;&#xB9B0; &#xD55C;&#xAC00;&#xC6B4;&#xB370;&#xB85C; &#xACF5;&#xB7B5;&#xD558;&#xC138;&#xC694;. &#xD47D; &#xC138;&#xCEE8;&#xB4DC; &#xC0F7;&#xC740; &#xADF8;&#xB9B0; &#xC55E;&#xCABD;&#xC744; &#xD0C0;&#xAC9F;.',club:'&#xB4DC;&#xB77C;&#xC774;&#xBC84;',green:'&#xD0A4;&#xB4DC;&#xB2C8;&#xD615;, &#xC88C;&#xCE21;&#xC73C;&#xB85C; &#xBE0C;&#xB808;&#xC774;&#xD06C;'},
  {hole:3,tip:'&#xC9E7;&#xC740; &#xD30C;3. &#xADF8;&#xB9B0; &#xC55E; &#xC6CC;&#xD130;&#xD574;&#xC800;&#xB4DC; &#xC8FC;&#xC758;. &#xC548;&#xC804;&#xD558;&#xAC8C; &#xADF8;&#xB9B0; &#xC911;&#xC559;&#xC744; &#xB178;&#xB9AC;&#xC138;&#xC694;.',club:'7&#xBC88; &#xC544;&#xC774;&#xC5B8; &#xB610;&#xB294; 8&#xBC88;',green:'&#xC6D0;&#xD615;, &#xD3C9;&#xD3C9;&#xD55C; &#xD37C;&#xD305;'},
  {hole:4,tip:'&#xAE34; &#xD30C;5. &#xC6B0;&#xCE21; &#xC6CC;&#xD130; &#xC8FC;&#xC758;. &#xB808;&#xC774;&#xC5C5; &#xC704;&#xCE58;&#xB97C; &#xC798; &#xC7A1;&#xC73C;&#xC138;&#xC694;. 3&#xD0C0;&#xC5D0; &#xC62C;&#xB9AC;&#xB294; &#xC804;&#xB7B5; &#xCD94;&#xCC9C;.',club:'&#xB4DC;&#xB77C;&#xC774;&#xBC84; + 3&#xBC88;&#xC6B0;&#xB4DC; &#xB808;&#xC774;&#xC5C5;',green:'&#xC624;&#xBC14;&#xD615;, &#xB4A4;&#xCABD;&#xC5D0;&#xC11C; &#xC55E;&#xC73C;&#xB85C; &#xACBD;&#xC0AC;'},
  {hole:5,tip:'&#xC591;&#xCABD; &#xBC99;&#xCEE4;&#xAC00; &#xC788;&#xB294; &#xC9C1;&#xC120; &#xD30C;4. &#xD398;&#xC5B4;&#xC6E8;&#xC774; &#xC815;&#xC911;&#xC559;&#xC744; &#xD0C0;&#xAC9F;&#xC73C;&#xB85C;.',club:'&#xB4DC;&#xB77C;&#xC774;&#xBC84;',green:'&#xD0A4;&#xB4DC;&#xB2C8;&#xD615;, &#xC6B0;&#xCE21;&#xC73C;&#xB85C; &#xBE0C;&#xB808;&#xC774;&#xD06C;'},
  {hole:6,tip:'&#xC6B0;&#xCE21; &#xB3C4;&#xADF8;&#xB809;. &#xC88C;&#xCE21; &#xC6CC;&#xD130;&#xAC00; &#xAE38;&#xAC8C; &#xC774;&#xC5B4;&#xC838; &#xC788;&#xC2B5;&#xB2C8;&#xB2E4;. &#xC6B0;&#xCE21; &#xD398;&#xC5B4;&#xC6E8;&#xC774;&#xB85C; &#xACF5;&#xB7B5;.',club:'3&#xBC88;&#xC6B0;&#xB4DC; &#xB610;&#xB294; &#xD558;&#xC774;&#xBE0C;&#xB9AC;&#xB4DC;',green:'&#xC6D0;&#xD615;, &#xD380;&#xCE58; &#xC704;&#xCE58;&#xC5D0; &#xB530;&#xB77C; &#xBCC0;&#xD654;'},
  {hole:7,tip:'&#xAE34; &#xD30C;3. &#xADF8;&#xB9B0; &#xC55E; &#xC6CC;&#xD130;&#xC640; &#xC591;&#xCABD; &#xBC99;&#xCEE4;. &#xBE44;&#xAC70;&#xB9AC;&#xB97C; &#xCDA9;&#xBD84;&#xD788; &#xD655;&#xBCF4;&#xD558;&#xC138;&#xC694;.',club:'5&#xBC88; &#xC544;&#xC774;&#xC5B8; &#xB610;&#xB294; &#xD558;&#xC774;&#xBE0C;&#xB9AC;&#xB4DC;',green:'&#xC624;&#xBC14;&#xD615;, &#xC55E;&#xCABD;&#xC774; &#xB0AE;&#xC74C;'},
  {hole:8,tip:'&#xBE44;&#xAD50;&#xC801; &#xC9E7;&#xC740; &#xD30C;4. &#xC6B0;&#xCE21; &#xBC99;&#xCEE4;&#xB9CC; &#xD53C;&#xD558;&#xBA74; &#xBC84;&#xB514; &#xAE30;&#xD68C;. &#xADF8;&#xB9B0; &#xC885; &#xC5C6;&#xC774; &#xACF5;&#xB7B5;&#xC801;&#xC73C;&#xB85C;!',club:'&#xB4DC;&#xB77C;&#xC774;&#xBC84;',green:'&#xD0A4;&#xB4DC;&#xB2C8;&#xD615;, &#xBE60;&#xB978; &#xADF8;&#xB9B0;'},
  {hole:9,tip:'&#xB9C8;&#xBB34;&#xB9AC; &#xD30C;5. &#xC88C;&#xCE21; &#xB3C4;&#xADF8;&#xB809;, &#xC6CC;&#xD130; &#xC88C;&#xCE21;. &#xC6B0;&#xCE21;&#xC73C;&#xB85C; &#xC548;&#xC804;&#xD558;&#xAC8C; &#xACF5;&#xB7B5;&#xD558;&#xACE0; &#xD30C;&#xC628; &#xB9C8;&#xBB34;&#xB9AC;!',club:'&#xB4DC;&#xB77C;&#xC774;&#xBC84; + &#xB808;&#xC774;&#xC5C5;',green:'&#xC6D0;&#xD615;, &#xC624;&#xB974;&#xB9C9;&#xC73C;&#xB85C; &#xACBD;&#xC0AC;'}
];

function v20OpenCaddie(){
  var ov=document.getElementById('v20CaddieOv');
  if(!ov){
    ov=document.createElement('div');
    ov.id='v20CaddieOv';
    ov.className='v20-overlay';
    ov.innerHTML='<div class="v20-modal" id="v20CaddieModal"></div>';
    ov.addEventListener('click',function(e){if(e.target===ov)ov.classList.remove('active');});
    document.body.appendChild(ov);
  }
  v20RenderCaddie();
  ov.classList.add('active');
  v20PlaySFX('caddie');
}
window.v20OpenCaddie=v20OpenCaddie;

function v20RenderCaddie(){
  var m=document.getElementById('v20CaddieModal');
  var notes=JSON.parse(localStorage.getItem('sg_caddie_notes')||'{}');
  var h='<div class="v20-hdr"><h2><span class="v20i">&#x1F9E2;</span> &#xCE90;&#xB514; AI &#xB178;&#xD2B8;</h2><button class="v20-x" onclick="document.getElementById(\'v20CaddieOv\').classList.remove(\'active\')">&times;</button></div>';
  h+='<p style="font-size:12px;color:var(--text-muted);margin-bottom:16px">&#xD640;&#xBCC4; AI &#xCE90;&#xB514; &#xD301; + &#xAC1C;&#xC778; &#xBA54;&#xBAA8;. &#xBA54;&#xBAA8;&#xB97C; &#xCD94;&#xAC00;&#xD558;&#xC5EC; &#xB098;&#xB9CC;&#xC758; &#xCF54;&#xC2A4; &#xACF5;&#xB7B5; &#xB178;&#xD2B8;&#xB97C; &#xB9CC;&#xB4DC;&#xC138;&#xC694;.</p>';
  CADDIE_TIPS.forEach(function(ct){
    h+='<div class="v20-caddie-note">';
    h+='<div class="v20-caddie-hole">&#x26F3; Hole '+ct.hole+' &middot; Par '+FLYOVER_HOLES[ct.hole-1].par+' &middot; '+FLYOVER_HOLES[ct.hole-1].yard+'yd</div>';
    h+='<div class="v20-caddie-tip">'+ct.tip+'</div>';
    h+='<div style="margin-top:8px;font-size:11px"><b>&#xCD94;&#xCC9C; &#xD074;&#xB7FD;:</b> '+ct.club+' &middot; <b>&#xADF8;&#xB9B0;:</b> '+ct.green+'</div>';
    h+='<div style="margin-top:8px"><textarea class="v20-input" rows="2" placeholder="&#xB098;&#xC758; &#xBA54;&#xBAA8;..." onchange="v20SaveCaddieNote('+ct.hole+',this.value)" style="font-size:11px">'+(notes['h'+ct.hole]||'')+'</textarea></div>';
    h+='</div>';
  });
  m.innerHTML=h;
  v20CheckAchievements();
}
window.v20SaveCaddieNote=function(hole,val){
  var notes=JSON.parse(localStorage.getItem('sg_caddie_notes')||'{}');
  notes['h'+hole]=val;
  localStorage.setItem('sg_caddie_notes',JSON.stringify(notes));
  v20PlaySFX('note_save');
};

// ===== 6. GREEN SPEED GUIDE =====
var GREEN_SPEEDS = [
  {level:1,name:'&#xC2AC;&#xB85C;&#xC6B0; (6ft &#xBBF8;&#xB9CC;)',speed:'5-6',desc:'&#xC2B5;&#xD55C; &#xB0A0;&#xC528;&#xB098; &#xC815;&#xBE44;&#xAC00; &#xB35C; &#xB41C; &#xADF8;&#xB9B0;. &#xD37C;&#xD305;&#xC744; &#xAC15;&#xD558;&#xAC8C; &#xCE58;&#xC138;&#xC694;.',color:'#4CAF50',pct:15},
  {level:2,name:'&#xC2AC;&#xB85C;&#xC6B0;~&#xBBF8;&#xB514;&#xC5C4; (7ft)',speed:'6.5-7.5',desc:'&#xC77C;&#xBC18;&#xC801;&#xC778; &#xD37C;&#xBE14;&#xB9AD; &#xCF54;&#xC2A4; &#xC18D;&#xB3C4;. &#xD3C9;&#xC18C; &#xAC10;&#xAC01;&#xC73C;&#xB85C; &#xCE58;&#xC138;&#xC694;.',color:'#8BC34A',pct:25},
  {level:3,name:'&#xBBF8;&#xB514;&#xC5C4; (8ft)',speed:'7.5-8.5',desc:'&#xC88C;&#xC6B0;&#xB85C; &#xC798; &#xAD00;&#xB9AC;&#xB41C; &#xCF54;&#xC2A4;. &#xBE0C;&#xB808;&#xC774;&#xD06C;&#xB97C; &#xC880; &#xB354; &#xC77D;&#xC73C;&#xC138;&#xC694;.',color:'#CDDC39',pct:35},
  {level:4,name:'&#xBBF8;&#xB514;&#xC5C4;~&#xD328;&#xC2A4;&#xD2B8; (9ft)',speed:'8.5-9.5',desc:'&#xBA85;&#xBB38; &#xCF54;&#xC2A4; &#xC218;&#xC900;. &#xBE0C;&#xB808;&#xC774;&#xD06C;&#xAC00; &#xCEE4;&#xC9C0;&#xAE30; &#xC2DC;&#xC791;. &#xD130;&#xCE58;&#xAC10; &#xC911;&#xC694;.',color:'#FFC107',pct:50},
  {level:5,name:'&#xD328;&#xC2A4;&#xD2B8; (10ft)',speed:'9.5-10.5',desc:'&#xD1A0;&#xB108;&#xBA3C;&#xD2B8; &#xC218;&#xC900;. &#xB0B4;&#xB9AC;&#xB9C9; &#xD37C;&#xD305;&#xC5D0; &#xC8FC;&#xC758;. &#xD130;&#xCE58;&#xB294; &#xBD80;&#xB4DC;&#xB7FD;&#xAC8C;.',color:'#FF9800',pct:65},
  {level:6,name:'&#xD328;&#xC2A4;&#xD2B8;+ (11ft)',speed:'10.5-11.5',desc:'&#xD504;&#xB85C; &#xD22C;&#xC5B4; &#xC218;&#xC900;. &#xBE0C;&#xB808;&#xC774;&#xD06C; &#xC77D;&#xAE30;&#xAC00; &#xD575;&#xC2EC;. &#xC9E7;&#xC740; &#xD37C;&#xD305;&#xB3C4; &#xC870;&#xC2EC;.',color:'#FF5722',pct:80},
  {level:7,name:'&#xD22C;&#xC5B4; &#xC2A4;&#xD53C;&#xB4DC; (12ft)',speed:'11.5-12.5',desc:'PGA &#xD22C;&#xC5B4; &#xD3C9;&#xADE0;. &#xADF8;&#xB9B0; &#xC704;&#xC758; &#xACF5;&#xC740; &#xC810;&#xCC28; &#xAD74;&#xB7EC;&#xAC08; &#xC218; &#xC788;&#xC2B5;&#xB2C8;&#xB2E4;.',color:'#E91E63',pct:90},
  {level:8,name:'&#xB9C8;&#xC2A4;&#xD130;&#xC988; (13ft+)',speed:'13+',desc:'&#xC624;&#xAC70;&#xC2A4;&#xD0C0;/&#xB9C8;&#xC2A4;&#xD130;&#xC988; &#xC218;&#xC900;. &#xBCF4;&#xD1B5; &#xD50C;&#xB808;&#xC774;&#xC5B4;&#xC5D0;&#xAC8C;&#xB294; &#xAE30;&#xC218;&#xAC04;&#xC758; &#xADF8;&#xB9B0;.',color:'#9C27B0',pct:100}
];

function v20OpenGreen(){
  var ov=document.getElementById('v20GreenOv');
  if(!ov){
    ov=document.createElement('div');
    ov.id='v20GreenOv';
    ov.className='v20-overlay';
    ov.innerHTML='<div class="v20-modal" id="v20GreenModal"></div>';
    ov.addEventListener('click',function(e){if(e.target===ov)ov.classList.remove('active');});
    document.body.appendChild(ov);
  }
  var m=document.getElementById('v20GreenModal');
  var h='<div class="v20-hdr"><h2><span class="v20i">&#x26F3;</span> &#xADF8;&#xB9B0; &#xC2A4;&#xD53C;&#xB4DC; &#xAC00;&#xC774;&#xB4DC;</h2><button class="v20-x" onclick="document.getElementById(\'v20GreenOv\').classList.remove(\'active\')">&times;</button></div>';
  h+='<p style="font-size:12px;color:var(--text-muted);margin-bottom:16px">&#xC2A4;&#xD300;&#xD504;&#xBBF8;&#xD130;(Stimpmeter) &#xAE30;&#xBC18; &#xADF8;&#xB9B0; &#xC2A4;&#xD53C;&#xB4DC; 8&#xB2E8;&#xACC4; &#xAC00;&#xC774;&#xB4DC;. &#xC624;&#xB298; &#xCF54;&#xC2A4;&#xC758; &#xADF8;&#xB9B0; &#xC18D;&#xB3C4;&#xB97C; &#xC120;&#xD0DD;&#xD558;&#xBA74; &#xD37C;&#xD305; &#xD301;&#xC744; &#xBC1B;&#xC744; &#xC218; &#xC788;&#xC2B5;&#xB2C8;&#xB2E4;.</p>';
  h+='<div class="v20-green-meter"><div class="v20-green-marker" id="v20GreenMarker" style="left:35%"></div></div>';
  h+='<div style="display:flex;justify-content:space-between;font-size:10px;color:var(--text-muted);margin-bottom:16px"><span>&#xB290;&#xB9BC;</span><span>&#xBE60;&#xB984;</span></div>';
  GREEN_SPEEDS.forEach(function(gs){
    h+='<div class="v20-card" onclick="v20SelectGreen('+gs.level+')" style="cursor:pointer">';
    h+='<h4><span style="display:inline-block;width:12px;height:12px;border-radius:50%;background:'+gs.color+';margin-right:6px"></span>'+gs.name+'</h4>';
    h+='<p><b>Stimp '+gs.speed+'ft</b> &mdash; '+gs.desc+'</p>';
    h+='</div>';
  });
  h+='<div id="v20GreenTip" style="margin-top:12px"></div>';
  m.innerHTML=h;
  ov.classList.add('active');
  v20PlaySFX('green');
  v20CheckAchievements();
}
window.v20OpenGreen=v20OpenGreen;

window.v20SelectGreen=function(level){
  var gs=GREEN_SPEEDS[level-1];
  var marker=document.getElementById('v20GreenMarker');
  if(marker)marker.style.left=gs.pct+'%';
  var tip=document.getElementById('v20GreenTip');
  if(tip){
    tip.innerHTML='<div class="v20-card" style="border-color:'+gs.color+';border-width:2px"><h4 style="color:'+gs.color+'">&#x1F4A1; '+gs.name+' &#xD37C;&#xD305; &#xD301;</h4><p>'+
      (level<=3?'&#xADF8;&#xB9B0;&#xC774; &#xB290;&#xB9AC;&#xBBC0;&#xB85C; &#xD37C;&#xD305;&#xC744; &#xD655;&#xC2E4;&#xD558;&#xAC8C; &#xCE58;&#xC138;&#xC694;. &#xD640; &#xB108;&#xBA38; &#xAE4C;&#xC9C0; &#xD37C;&#xD305; &#xC2A4;&#xD2B8;&#xB85C;&#xD06C;&#xB97C; &#xD06C;&#xAC8C; &#xAC00;&#xC838;&#xAC00;&#xC138;&#xC694;. &#xBE0C;&#xB808;&#xC774;&#xD06C;&#xBCF4;&#xB2E4; &#xAC70;&#xB9AC;&#xAC10;&#xC5D0; &#xC9D1;&#xC911;.':
      level<=5?'&#xC801;&#xC808;&#xD55C; &#xC2A4;&#xD53C;&#xB4DC;&#xC785;&#xB2C8;&#xB2E4;. &#xBE0C;&#xB808;&#xC774;&#xD06C;&#xC640; &#xAC70;&#xB9AC;&#xAC10;&#xC744; &#xADE0;&#xD615;&#xC788;&#xAC8C; &#xBCF4;&#xC138;&#xC694;. &#xB0B4;&#xB9AC;&#xB9C9; &#xD37C;&#xD305;&#xC740; &#xC9E7;&#xAC8C; &#xCE58;&#xACE0; &#xAD74;&#xB824;&#xBCF4;&#xB0B4;&#xC138;&#xC694;.':
      '&#xB9E4;&#xC6B0; &#xBE60;&#xB978; &#xADF8;&#xB9B0;! &#xC0C1;&#xD5A5;&#xACBD;&#xC0AC;&#xC5D0;&#xB9CC; &#xBCFC;&#xC744; &#xC138;&#xC6B0;&#xACE0;, &#xD558;&#xD5A5;&#xC740; &#xADF8;&#xB0E5; &#xAD74;&#xB824;&#xBCF4;&#xB0B4;&#xC138;&#xC694;. &#xD130;&#xCE58;&#xAC10;&#xC774; &#xAC00;&#xC7A5; &#xC911;&#xC694;&#xD569;&#xB2C8;&#xB2E4;. &#xBE0C;&#xB808;&#xC774;&#xD06C;&#xB97C; 2&#xBC30; &#xC774;&#xC0C1; &#xC77D;&#xC73C;&#xC138;&#xC694;.')+
    '</p></div>';
  }
  v20PlaySFX('green_select');
};

// ===== 7. ROUND PHOTO GALLERY =====
function v20OpenGallery(){
  var ov=document.getElementById('v20GalleryOv');
  if(!ov){
    ov=document.createElement('div');
    ov.id='v20GalleryOv';
    ov.className='v20-overlay';
    ov.innerHTML='<div class="v20-modal" id="v20GalleryModal"></div>';
    ov.addEventListener('click',function(e){if(e.target===ov)ov.classList.remove('active');});
    document.body.appendChild(ov);
  }
  v20RenderGallery();
  ov.classList.add('active');
  v20PlaySFX('gallery');
}
window.v20OpenGallery=v20OpenGallery;

function v20GetPhotos(){ return JSON.parse(localStorage.getItem('sg_photos')||'[]'); }

function v20RenderGallery(){
  var m=document.getElementById('v20GalleryModal');
  var photos=v20GetPhotos();
  var h='<div class="v20-hdr"><h2><span class="v20i">&#x1F4F7;</span> &#xB77C;&#xC6B4;&#xB4DC; &#xD3EC;&#xD1A0; &#xAC24;&#xB7EC;&#xB9AC;</h2><button class="v20-x" onclick="document.getElementById(\'v20GalleryOv\').classList.remove(\'active\')">&times;</button></div>';
  h+='<div style="margin-bottom:14px;display:flex;gap:8px;flex-wrap:wrap">';
  h+='<label class="v20-btn v20-btn-sm v20-btn-primary" style="cursor:pointer"><input type="file" accept="image/*" style="display:none" onchange="v20AddPhoto(this)">&#x2795; &#xC0AC;&#xC9C4; &#xCD94;&#xAC00;</label>';
  h+='<button class="v20-btn v20-btn-sm v20-btn-secondary" onclick="v20AddPhotoMemo()">&#x1F4DD; &#xBA54;&#xBAA8; &#xCD94;&#xAC00;</button>';
  h+='</div>';
  if(photos.length===0){
    h+='<div class="v20-card" style="text-align:center;padding:40px"><p style="font-size:14px">&#xC544;&#xC9C1; &#xC0AC;&#xC9C4;&#xC774; &#xC5C6;&#xC2B5;&#xB2C8;&#xB2E4;. &#xB77C;&#xC6B4;&#xB4DC; &#xC0AC;&#xC9C4;&#xC744; &#xCD94;&#xAC00;&#xD574;&#xBCF4;&#xC138;&#xC694;!</p></div>';
  } else {
    h+='<div class="v20-photo-grid">';
    photos.forEach(function(p,i){
      if(p.type==='image'){
        h+='<div class="v20-photo-card" onclick="v20ViewPhoto('+i+')">';
        h+='<img src="'+p.data+'" alt="Round photo" loading="lazy">';
        h+='<div class="v20-photo-overlay">'+p.date+(p.memo?' &middot; '+p.memo:'')+'</div>';
        h+='</div>';
      } else {
        h+='<div class="v20-photo-card" style="display:flex;align-items:center;justify-content:center;padding:10px" onclick="v20ViewPhoto('+i+')">';
        h+='<div style="text-align:center"><div style="font-size:24px">&#x1F4DD;</div><div style="font-size:10px;margin-top:4px">'+p.memo.substring(0,30)+'</div><div style="font-size:9px;color:var(--text-muted);margin-top:2px">'+p.date+'</div></div>';
        h+='</div>';
      }
    });
    h+='</div>';
    h+='<div style="margin-top:12px;font-size:12px;color:var(--text-muted)">&#xCD1D; '+photos.length+'&#xAC1C; &#xD56D;&#xBAA9;</div>';
  }
  m.innerHTML=h;
}

window.v20AddPhoto=function(input){
  if(!input.files||!input.files[0])return;
  var reader=new FileReader();
  reader.onload=function(e){
    var photos=v20GetPhotos();
    var memo=prompt('&#xC0AC;&#xC9C4; &#xBA54;&#xBAA8; (&#xC120;&#xD0DD;&#xC0AC;&#xD56D;):')||'';
    photos.push({type:'image',data:e.target.result,date:new Date().toISOString().slice(0,10),memo:memo});
    if(photos.length>30)photos=photos.slice(-30);
    localStorage.setItem('sg_photos',JSON.stringify(photos));
    v20RenderGallery();
    v20PlaySFX('photo_add');
    v20Toast('&#xC0AC;&#xC9C4; &#xCD94;&#xAC00; &#xC644;&#xB8CC;!');
    v20CheckAchievements();
  };
  reader.readAsDataURL(input.files[0]);
};

window.v20AddPhotoMemo=function(){
  var memo=prompt('&#xB77C;&#xC6B4;&#xB4DC; &#xBA54;&#xBAA8;:');
  if(!memo)return;
  var photos=v20GetPhotos();
  photos.push({type:'memo',data:'',date:new Date().toISOString().slice(0,10),memo:memo});
  localStorage.setItem('sg_photos',JSON.stringify(photos));
  v20RenderGallery();
  v20PlaySFX('note_save');
};

window.v20ViewPhoto=function(i){
  var photos=v20GetPhotos();
  var p=photos[i];
  if(confirm((p.type==='image'?'&#xC0AC;&#xC9C4;':'&#xBA54;&#xBAA8;')+': '+(p.memo||'&#xBA54;&#xBAA8; &#xC5C6;&#xC74C;')+'\n&#xB0A0;&#xC9DC;: '+p.date+'\n\n&#xC0AD;&#xC81C;&#xD558;&#xC2DC;&#xACA0;&#xC2B5;&#xB2C8;&#xAE4C;?')){
    photos.splice(i,1);
    localStorage.setItem('sg_photos',JSON.stringify(photos));
    v20RenderGallery();
  }
};

// ===== 8. SEASON REVIEW DASHBOARD =====
function v20OpenSeasonReview(){
  var ov=document.getElementById('v20SeasonOv');
  if(!ov){
    ov=document.createElement('div');
    ov.id='v20SeasonOv';
    ov.className='v20-overlay';
    ov.innerHTML='<div class="v20-modal" id="v20SeasonModal"></div>';
    ov.addEventListener('click',function(e){if(e.target===ov)ov.classList.remove('active');});
    document.body.appendChild(ov);
  }
  v20RenderSeasonReview();
  ov.classList.add('active');
  v20PlaySFX('season');
}
window.v20OpenSeasonReview=v20OpenSeasonReview;

function v20RenderSeasonReview(){
  var m=document.getElementById('v20SeasonModal');
  var rounds=JSON.parse(localStorage.getItem('sg_group_rounds')||'[]');
  var scorecards=JSON.parse(localStorage.getItem('sg_scorecards')||'[]');
  var totalRounds=rounds.length+scorecards.length;
  var totalStrokes=0;
  scorecards.forEach(function(sc){
    if(sc.holes){sc.holes.forEach(function(h){totalStrokes+=(h.score||0);});}
  });
  rounds.forEach(function(r){
    if(r.scores&&r.scores[0]){r.scores[0].forEach(function(s){totalStrokes+=s;});}
  });
  var avgScore=totalRounds>0?Math.round(totalStrokes/totalRounds):0;
  var goals=JSON.parse(localStorage.getItem('sg_season_goals_v2')||'[]');

  var h='<div class="v20-hdr"><h2><span class="v20i">&#x1F3C5;</span> &#xC2DC;&#xC98C; &#xB9AC;&#xBDF0; &#xB300;&#xC2DC;&#xBCF4;&#xB4DC;</h2><button class="v20-x" onclick="document.getElementById(\'v20SeasonOv\').classList.remove(\'active\')">&times;</button></div>';
  h+='<div class="v20-grid4">';
  h+='<div class="v20-season-card"><div class="v20-season-num">'+totalRounds+'</div><div class="v20-season-label">&#xCD1D; &#xB77C;&#xC6B4;&#xB4DC;</div></div>';
  h+='<div class="v20-season-card"><div class="v20-season-num">'+avgScore+'</div><div class="v20-season-label">&#xD3C9;&#xADE0; &#xC2A4;&#xCF54;&#xC5B4;</div></div>';
  h+='<div class="v20-season-card"><div class="v20-season-num">'+totalStrokes+'</div><div class="v20-season-label">&#xCD1D; &#xD0C0;&#xC218;</div></div>';
  var photos=v20GetPhotos();
  h+='<div class="v20-season-card"><div class="v20-season-num">'+photos.length+'</div><div class="v20-season-label">&#xC0AC;&#xC9C4;/&#xBA54;&#xBAA8;</div></div>';
  h+='</div>';

  h+='<div class="v20-divider"></div>';
  h+='<h3 style="font-size:16px;font-weight:800;margin-bottom:12px">&#x1F3AF; &#xC2DC;&#xC98C; &#xBAA9;&#xD45C; &#xC124;&#xC815;</h3>';
  if(goals.length===0){
    goals=[
      {name:'&#xC6D4; 4&#xD68C; &#xB77C;&#xC6B4;&#xB4DC;',target:4,current:totalRounds,unit:'&#xD68C;'},
      {name:'&#xD3C9;&#xADE0; 90&#xD0C0; &#xC774;&#xD558;',target:90,current:avgScore,unit:'&#xD0C0;'},
      {name:'&#xD37C;&#xD305; 36&#xD640; &#xC5F0;&#xC2B5;',target:36,current:0,unit:'&#xD640;'},
      {name:'&#xC0C8; &#xCF54;&#xC2A4; 5&#xACF3; &#xB3C4;&#xC804;',target:5,current:0,unit:'&#xACF3;'}
    ];
    localStorage.setItem('sg_season_goals_v2',JSON.stringify(goals));
  }
  goals.forEach(function(g,i){
    var pct=Math.min(100,Math.round((g.current/g.target)*100));
    h+='<div class="v20-card">';
    h+='<div style="display:flex;justify-content:space-between;align-items:center"><h4>'+g.name+'</h4><span style="font-size:12px;font-weight:700;color:var(--primary)">'+g.current+'/'+g.target+' '+g.unit+'</span></div>';
    h+='<div class="v20-progress"><div class="v20-progress-fill" style="width:'+pct+'%;background:linear-gradient(90deg,var(--primary),#2e9e4f)"></div></div>';
    h+='<div style="display:flex;gap:6px;margin-top:6px">';
    h+='<button class="v20-btn v20-btn-sm v20-btn-secondary" onclick="v20GoalUp('+i+')">+1</button>';
    h+='<button class="v20-btn v20-btn-sm v20-btn-secondary" onclick="v20GoalDown('+i+')">-1</button>';
    h+='</div></div>';
  });
  h+='<button class="v20-btn v20-btn-sm v20-btn-secondary" style="margin-top:8px" onclick="v20AddGoal()">&#x2795; &#xBAA9;&#xD45C; &#xCD94;&#xAC00;</button>';

  h+='<div class="v20-divider"></div>';
  h+='<h3 style="font-size:16px;font-weight:800;margin-bottom:12px">&#x1F4C5; &#xC6D4;&#xBCC4; &#xB77C;&#xC6B4;&#xB4DC; &#xD1B5;&#xACC4;</h3>';
  h+='<canvas id="v20SeasonCanvas" width="700" height="200" style="width:100%;border-radius:12px;background:var(--bg)"></canvas>';
  m.innerHTML=h;
  setTimeout(v20DrawSeasonChart,50);
  v20CheckAchievements();
}

function v20DrawSeasonChart(){
  var c=document.getElementById('v20SeasonCanvas');
  if(!c)return;
  var ctx=c.getContext('2d');
  var w=c.width,ht=c.height;
  ctx.clearRect(0,0,w,ht);
  var months=['1&#xC6D4;','2&#xC6D4;','3&#xC6D4;','4&#xC6D4;','5&#xC6D4;','6&#xC6D4;','7&#xC6D4;','8&#xC6D4;','9&#xC6D4;','10&#xC6D4;','11&#xC6D4;','12&#xC6D4;'];
  var data=[2,3,5,6,8,7,4,3,6,5,4,2];
  var maxVal=Math.max.apply(null,data);
  var barW=40;
  var gap=(w-months.length*barW)/(months.length+1);
  ctx.font='bold 10px sans-serif';
  ctx.textAlign='center';
  months.forEach(function(m,i){
    var x=gap+(barW+gap)*i;
    var barH=(data[i]/maxVal)*(ht-50);
    var grad=ctx.createLinearGradient(x,ht-30-barH,x,ht-30);
    grad.addColorStop(0,'#1a7a3a');grad.addColorStop(1,'#2e9e4f');
    ctx.fillStyle=grad;
    ctx.beginPath();
    ctx.roundRect(x,ht-30-barH,barW,barH,4);
    ctx.fill();
    ctx.fillStyle='var(--text-muted)';
    ctx.fillText(m,x+barW/2,ht-10);
    ctx.fillStyle='#fff';
    ctx.fillText(data[i],x+barW/2,ht-35-barH+15);
  });
}

window.v20GoalUp=function(i){
  var g=JSON.parse(localStorage.getItem('sg_season_goals_v2')||'[]');
  if(g[i])g[i].current++;
  localStorage.setItem('sg_season_goals_v2',JSON.stringify(g));
  v20RenderSeasonReview();
  v20PlaySFX('goal');
};
window.v20GoalDown=function(i){
  var g=JSON.parse(localStorage.getItem('sg_season_goals_v2')||'[]');
  if(g[i]&&g[i].current>0)g[i].current--;
  localStorage.setItem('sg_season_goals_v2',JSON.stringify(g));
  v20RenderSeasonReview();
};
window.v20AddGoal=function(){
  var name=prompt('&#xBAA9;&#xD45C; &#xC774;&#xB984;:');
  if(!name)return;
  var target=parseInt(prompt('&#xBAA9;&#xD45C; &#xC218;&#xCE58;:'))||10;
  var unit=prompt('&#xB2E8;&#xC704; (&#xD68C;/&#xD0C0;/&#xACF3; &#xB4F1;):')||'&#xD68C;';
  var g=JSON.parse(localStorage.getItem('sg_season_goals_v2')||'[]');
  g.push({name:name,target:target,current:0,unit:unit});
  localStorage.setItem('sg_season_goals_v2',JSON.stringify(g));
  v20RenderSeasonReview();
  v20PlaySFX('goal');
};

// ===== 9. GOLF IQ v5 (15 NEW QUESTIONS) =====
var QUIZ_V5 = [
  {q:'&#xD398;&#xC5B4;&#xC6E8;&#xC774; &#xBC14;&#xB85C; &#xC606;&#xC5D0; &#xBCFC;&#xC774; &#xC815;&#xC9C0;&#xD588;&#xC744; &#xB54C;, &#xBCFC;&#xC744; &#xC788;&#xB294; &#xADF8;&#xB300;&#xB85C; &#xCE60; &#xC218; &#xC788;&#xB294; &#xACBD;&#xC6B0;&#xB294;?',o:['&#xD56D;&#xC0C1; &#xAC00;&#xB2A5;','&#xB7EC;&#xD504;&#xAC00; &#xBE60;&#xC9C8;&#xB54C;&#xB9CC;','&#xCE74;&#xD2B8; &#xACBD;&#xB85C;&#xAC00; &#xC544;&#xB2CC; &#xACBD;&#xC6B0;','&#xBCFC;&#xC774; &#xD504;&#xB808;&#xC2A4;&#xC5D0;&#xB9CC;'],a:0,e:'&#xCF54;&#xC2A4; &#xADDC;&#xCE59;&#xC0C1; &#xD398;&#xC5B4;&#xC6E8;&#xC774;&#xB294; &#xC77C;&#xBC18; &#xAD6C;&#xC5ED;&#xC774;&#xBBC0;&#xB85C; &#xBCFC;&#xC744; &#xC788;&#xB294; &#xADF8;&#xB300;&#xB85C; &#xCE60; &#xC218; &#xC788;&#xC2B5;&#xB2C8;&#xB2E4;.'},
  {q:'&#xD37C;&#xD305; &#xC2DC; &#xBE0C;&#xB808;&#xC774;&#xD06C; &#xB77C;&#xC778;&#xC744; &#xC77D;&#xB294; &#xAC00;&#xC7A5; &#xC88B;&#xC740; &#xBC29;&#xBC95;&#xC740;?',o:['&#xBCFC; &#xB4A4;&#xC5D0;&#xC11C; &#xD640;&#xCF55; &#xBC29;&#xD5A5;&#xC73C;&#xB85C;','&#xBCFC; &#xC606;&#xC5D0;&#xC11C;','&#xD640;&#xCF55; &#xB4A4;&#xC5D0;&#xC11C; &#xBCFC; &#xBC29;&#xD5A5;&#xC73C;&#xB85C;','&#xC9C1;&#xAC01;&#xC73C;&#xB85C;'],a:2,e:'&#xD640;&#xCF55; &#xB4A4;&#xC5D0;&#xC11C; &#xBCFC; &#xBC29;&#xD5A5;&#xC73C;&#xB85C; &#xBCF4;&#xB294; &#xAC83;&#xC774; &#xBE0C;&#xB808;&#xC774;&#xD06C; &#xB77C;&#xC778;&#xC744; &#xC815;&#xD655;&#xD558;&#xAC8C; &#xD30C;&#xC545;&#xD560; &#xC218; &#xC788;&#xC2B5;&#xB2C8;&#xB2E4;.'},
  {q:'&#xB4DC;&#xB77C;&#xC774;&#xBC84; &#xC0F7;&#xC758; &#xC774;&#xC0C1;&#xC801;&#xC778; &#xB7F0;&#xCE58; &#xC575;&#xAE00;&#xC740;?',o:['5-8&deg;','10-14&deg;','15-20&deg;','25-30&deg;'],a:1,e:'&#xB300;&#xBD80;&#xBD84;&#xC758; &#xD22C;&#xC5B4; &#xD504;&#xB85C;&#xB294; 10-14&deg; &#xB7F0;&#xCE58; &#xC575;&#xAE00;&#xC5D0;&#xC11C; &#xCD5C;&#xC801;&#xC758; &#xBE44;&#xAC70;&#xB9AC;&#xB97C; &#xC5BB;&#xC2B5;&#xB2C8;&#xB2E4;.'},
  {q:'GIR(Green in Regulation)&#xC758; &#xC815;&#xC758;&#xB294;?',o:['&#xBC84;&#xB514; &#xD37C;&#xD305;&#xC73C;&#xB85C; &#xD50C;&#xB808;&#xC774;','Par-2&#xD0C0; &#xC774;&#xD558;&#xB85C; &#xADF8;&#xB9B0; &#xC804;&#xADFC;','&#xD398;&#xC5B4;&#xC6E8;&#xC774; &#xC548;&#xCC29;','&#xADF8;&#xB9B0; &#xC8FC;&#xBCC0; 10m &#xC774;&#xB0B4;'],a:1,e:'GIR&#xC740; &#xD30C;&#xC5D0;&#xC11C; 2&#xD0C0;&#xB97C; &#xBE7C;&#xACE0; &#xB0A8;&#xC740; &#xD0C0;&#xC218; &#xC774;&#xD558;&#xB85C; &#xADF8;&#xB9B0;&#xC5D0; &#xBCFC;&#xC744; &#xC62C;&#xB9AC;&#xB294; &#xAC83;&#xC744; &#xB9D0;&#xD569;&#xB2C8;&#xB2E4;.'},
  {q:'&#xD648;&#xB7F0; &#xBCFC;&#xC758; &#xB529;&#xD50C; &#xC218;&#xAC00; &#xC5D0;&#xC5B4;&#xB85C;&#xB2E4;&#xC774;&#xB098;&#xBBF9;&#xC2A4;&#xC5D0; &#xBBF8;&#xCE58;&#xB294; &#xC601;&#xD5A5;&#xC740;?',o:['&#xC601;&#xD5A5; &#xC5C6;&#xC74C;','&#xB529;&#xD50C;&#xC774; &#xB9CE;&#xC744;&#xC218;&#xB85D; &#xB9AC;&#xD504;&#xD2B8; &#xC99D;&#xAC00;','&#xB529;&#xD50C;&#xC774; &#xB9CE;&#xC744;&#xC218;&#xB85D; &#xBC31;&#xC2A4;&#xD540; &#xC99D;&#xAC00;','&#xB529;&#xD50C;&#xC774; &#xB9CE;&#xC73C;&#xBA74; &#xBCFC;&#xC774; &#xB5A8;&#xC5B4;&#xC9D0;'],a:1,e:'&#xB529;&#xD50C;&#xC740; &#xACF5;&#xAE30; &#xD750;&#xB984;&#xC744; &#xB9CC;&#xB4E4;&#xC5B4; &#xB9AC;&#xD504;&#xD2B8;&#xB97C; &#xC0DD;&#xC131;&#xD569;&#xB2C8;&#xB2E4;. &#xB529;&#xD50C;&#xC774; &#xB9CE;&#xC744;&#xC218;&#xB85D; &#xB354; &#xB9CE;&#xC740; &#xB9AC;&#xD504;&#xD2B8;&#xAC00; &#xBC1C;&#xC0DD;&#xD569;&#xB2C8;&#xB2E4;.'},
  {q:'&#xBC14;&#xC6B4;&#xC2A4; &#xADDC;&#xCE59;&#xC5D0;&#xC11C; &#xC784;&#xBD88;&#xD50C;&#xADA4;(Out of Bounds)&#xC758; &#xBC8C;&#xD0C0;&#xB294;?',o:['1&#xBC8C;&#xD0C0;','2&#xBC8C;&#xD0C0;','&#xBC8C;&#xD0C0; &#xC5C6;&#xC74C;','&#xC2E4;&#xACA9;'],a:0,e:'OB&#xB294; 1&#xBC8C;&#xD0C0; + &#xAC70;&#xB9AC; &#xC190;&#xC2E4;. &#xBC8C;&#xD0C0;&#xC640; &#xD568;&#xAED8; &#xC6D0;&#xB798; &#xC704;&#xCE58;&#xC5D0;&#xC11C; &#xB2E4;&#xC2DC; &#xCE69;&#xB2C8;&#xB2E4;.'},
  {q:'&#xD504;&#xB85C; &#xD22C;&#xC5B4;&#xC5D0;&#xC11C; &#xD3C9;&#xADE0; &#xD398;&#xC5B4;&#xC6E8;&#xC774; &#xC548;&#xCC29;&#xB960;(FIR)&#xC740; &#xC57D; &#xBA87; %?',o:['45-50%','55-65%','70-80%','85-90%'],a:1,e:'PGA &#xD22C;&#xC5B4; &#xD3C9;&#xADE0; FIR&#xC740; &#xC57D; 60% &#xC804;&#xD6C4;&#xC785;&#xB2C8;&#xB2E4;. &#xC544;&#xB9C8;&#xCD94;&#xC5B4; &#xACE8;&#xD37C;&#xB294; 40-50%&#xB97C; &#xBAA9;&#xD45C;&#xB85C; &#xD558;&#xC138;&#xC694;.'},
  {q:'&#xCE58;&#xD551;(Chipping)&#xACFC; &#xD53C;&#xCE6D;(Pitching)&#xC758; &#xCC28;&#xC774;&#xB294;?',o:['&#xAC19;&#xC740; &#xC0F7;','&#xCE58;&#xD551;&#xC740; &#xB0AE;&#xAC8C;, &#xD53C;&#xCE6D;&#xC740; &#xB192;&#xAC8C;','&#xCE58;&#xD551;&#xC740; &#xB9D0;&#xB808;','&#xD53C;&#xCE6D;&#xC740; &#xD37C;&#xD130; &#xC0AC;&#xC6A9;'],a:1,e:'&#xCE58;&#xD551;&#xC740; &#xB0AE;&#xAC8C; &#xAD74;&#xB824;&#xBCF4;&#xB0B4;&#xB294; &#xC0F7;, &#xD53C;&#xCE6D;&#xC740; &#xB192;&#xC774; &#xB744;&#xC6B0;&#xB294; &#xC0F7;&#xC785;&#xB2C8;&#xB2E4;. &#xAC70;&#xB9AC;&#xC640; &#xC7A5;&#xC560;&#xBB3C;&#xC5D0; &#xB530;&#xB77C; &#xC120;&#xD0DD;&#xD558;&#xC138;&#xC694;.'},
  {q:'&#xD37C;&#xD305; &#xADF8;&#xB9B0;&#xC5D0;&#xC11C; &#xACBD;&#xC0AC;&#xBA74;&#xC744; &#xC77D;&#xB294; &#xC5D0;&#xC784;&#xD3EC;&#xC778;&#xD2B8;(Aim Point)&#xB780;?',o:['&#xACF5;&#xC744; &#xB193;&#xC744; &#xC704;&#xCE58;','&#xBC1C;&#xB85C; &#xACBD;&#xC0AC;&#xB97C; &#xB290;&#xAEF4; &#xBC29;&#xD5A5; &#xACB0;&#xC815;','&#xBCFC; &#xB9C8;&#xD06C; &#xC704;&#xCE58;','&#xD37C;&#xD130; &#xBC14;&#xB2E5;&#xBA74; &#xCF54;&#xD305;'],a:1,e:'&#xC5D0;&#xC784;&#xD3EC;&#xC778;&#xD2B8;&#xB294; &#xBC1C;&#xBC14;&#xB2E5;&#xC758; &#xACBD;&#xC0AC;&#xB97C; &#xB290;&#xAEF4; &#xD37C;&#xD305; &#xBC29;&#xD5A5;&#xC744; &#xACB0;&#xC815;&#xD558;&#xB294; &#xD604;&#xB300;&#xC801; &#xD37C;&#xD305; &#xAE30;&#xBC95;&#xC785;&#xB2C8;&#xB2E4;.'},
  {q:'&#xBE44;&#xAC70;&#xB9AC; &#xCE58;&#xC5D0;&#xC11C; &#xCEE8;&#xD2B8;&#xB864; &#xC0F7;&#xC774;&#xB780;?',o:['&#xCD5C;&#xB300; &#xBE44;&#xAC70;&#xB9AC; &#xC0F7;','&#xD22C;&#xC628; &#xC0F7;','&#xBC14;&#xB78C; &#xBC29;&#xD5A5;&#xC73C;&#xB85C; &#xCE58;&#xB294; &#xC0F7;','75-80% &#xD30C;&#xC6CC;&#xB85C; &#xC815;&#xD655;&#xD558;&#xAC8C; &#xCE58;&#xB294; &#xC0F7;'],a:3,e:'&#xCEE8;&#xD2B8;&#xB864; &#xC0F7;&#xC740; &#xD480; &#xC2A4;&#xC719;&#xC758; 75-80%&#xB85C; &#xC815;&#xD655;&#xB3C4;&#xB97C; &#xC6B0;&#xC120;&#xD558;&#xB294; &#xC0F7;&#xC785;&#xB2C8;&#xB2E4;. &#xCF54;&#xC2A4; &#xB9E4;&#xB2C8;&#xC9C0;&#xBA3C;&#xD2B8;&#xC5D0; &#xD575;&#xC2EC;&#xC801;&#xC785;&#xB2C8;&#xB2E4;.'},
  {q:'&#xB77C;&#xC6B4;&#xB4DC; &#xC911; &#xBB3C;&#xC744; &#xB9C8;&#xC2DC;&#xB294; &#xCD5C;&#xC801;&#xC758; &#xD0C0;&#xC774;&#xBC0D;&#xC740;?',o:['&#xBAA9;&#xB9C8;&#xB97C; &#xB54C;&#xB9CC;','&#xB77C;&#xC6B4;&#xB4DC; &#xC804;&#xD6C4;&#xB9CC;','&#xB9E4; &#xD640; &#xC774;&#xB3D9; &#xC2DC;','&#xB808;&#xC2A4;&#xD0C0;&#xC6B0;&#xB791;&#xC5D0;&#xC11C;&#xB9CC;'],a:2,e:'&#xD0C8;&#xC218;&#xB97C; &#xB9C9;&#xC73C;&#xB824;&#xBA74; &#xBAA9;&#xB9C8;&#xB974;&#xAE30; &#xC804;&#xC5D0; &#xC218;&#xBD84;&#xC744; &#xBCF4;&#xCDA9;&#xD574;&#xC57C; &#xD569;&#xB2C8;&#xB2E4;. &#xB9E4; &#xD640; &#xC774;&#xB3D9; &#xC2DC; &#xBB3C; &#xB610;&#xB294; &#xC804;&#xD574;&#xC9C8; &#xC74C;&#xB8CC; &#xC12D;&#xCDE8;.'},
  {q:'&#xBC14;&#xC6B4;&#xC2A4; &#xBC31; &#xD38C;&#xC2A4; &#xC0F7;&#xC758; &#xD575;&#xC2EC; &#xD3EC;&#xC778;&#xD2B8;&#xB294;?',o:['&#xD480; &#xC2A4;&#xC719;','&#xBCFC;&#xC744; &#xBA3C;&#xC800; &#xCE58;&#xACE0; &#xD3C9;&#xD3C9;&#xD55C; &#xACF3;&#xC5D0; &#xBE44;&#xB9AC;&#xAE30;','&#xD480; &#xD30C;&#xC6CC;&#xB85C; &#xD0C8;&#xCD9C;','&#xAE30;&#xB3C4;&#xD558;&#xAE30;'],a:1,e:'&#xBC14;&#xC6B4;&#xC2A4; &#xBC31;&#xC5D0;&#xC11C;&#xB294; &#xD3C9;&#xD3C9;&#xD55C; &#xB77C;&#xC774;&#xB85C; &#xBCFC;&#xC744; &#xBCF4;&#xB0B4;&#xB294; &#xAC83;&#xC774; &#xC6B0;&#xC120;&#xC785;&#xB2C8;&#xB2E4;. &#xACF5;&#xACA9;&#xC801;&#xC778; &#xD0C8;&#xCD9C;&#xC740; &#xC704;&#xD5D8;&#xD569;&#xB2C8;&#xB2E4;.'},
  {q:'&#xD504;&#xB9AC;&#xC0F7; &#xB8E8;&#xD2F4;&#xC5D0;&#xC11C; &#xD638;&#xD761; &#xD328;&#xD134;&#xC758; &#xC5ED;&#xD560;&#xC740;?',o:['&#xAE34;&#xC7A5; &#xD480;&#xAE30;','&#xC2EC;&#xBC15;&#xC218; &#xB0AE;&#xCD94;&#xACE0; &#xC9D1;&#xC911;&#xB825; &#xD5A5;&#xC0C1;','&#xC5D0;&#xB108;&#xC9C0; &#xBD80;&#xC2A4;&#xD2B8;','&#xADFC;&#xC721; &#xC774;&#xC644;'],a:1,e:'&#xD504;&#xB9AC;&#xC0F7; &#xB8E8;&#xD2F4;&#xC5D0;&#xC11C; 4-7-8 &#xD638;&#xD761;&#xBC95;&#xC740; &#xBD80;&#xAD50;&#xAC10;&#xC2E0;&#xACBD;&#xC744; &#xD65C;&#xC131;&#xD654;&#xD558;&#xC5EC; &#xC2EC;&#xBC15;&#xC218;&#xB97C; &#xB0AE;&#xCD94;&#xACE0; &#xC9D1;&#xC911;&#xB825;&#xC744; &#xB192;&#xC785;&#xB2C8;&#xB2E4;.'},
  {q:'&#xD074;&#xB7FD; &#xD53C;&#xD305;&#xC5D0;&#xC11C; &#xC2A4;&#xC719; &#xC6E8;&#xC774;&#xD2B8;(Swingweight)&#xB780;?',o:['&#xD074;&#xB7FD; &#xCD1D; &#xBB34;&#xAC8C;','&#xD5E4;&#xB4DC; &#xBB34;&#xAC8C;&#xB9CC;','&#xD074;&#xB7FD;&#xC758; &#xBB34;&#xAC8C; &#xBD84;&#xD3EC; &#xBC38;&#xB7F0;&#xC2A4;','&#xADF8;&#xB9BD; &#xBB34;&#xAC8C;'],a:2,e:'&#xC2A4;&#xC719;&#xC6E8;&#xC774;&#xD2B8;&#xB294; &#xD074;&#xB7FD;&#xC758; &#xBB34;&#xAC8C;&#xAC00; &#xC5B4;&#xB5BB;&#xAC8C; &#xBD84;&#xD3EC;&#xB418;&#xC5B4; &#xC788;&#xB294;&#xC9C0;&#xB97C; &#xB098;&#xD0C0;&#xB0C5;&#xB2C8;&#xB2E4;. &#xD5E4;&#xB4DC;&#xAC00; &#xBB34;&#xAC70;&#xC6B8;&#xC218;&#xB85D; &#xC2A4;&#xC719;&#xC6E8;&#xC774;&#xD2B8;&#xAC00; &#xB192;&#xC2B5;&#xB2C8;&#xB2E4;.'},
  {q:'&#xB808;&#xC778; &#xB514;&#xB808;&#xC774;(Rain Delay) &#xC2DC; &#xD50C;&#xB808;&#xC774;&#xC5B4;&#xAC00; &#xD574;&#xC57C; &#xD560; &#xC77C;&#xC740;?',o:['&#xACC4;&#xC18D; &#xD50C;&#xB808;&#xC774;','&#xD074;&#xB7FD;&#xD558;&#xC6B0;&#xC2A4;&#xB85C; &#xB300;&#xD53C; + &#xC2A4;&#xD2B8;&#xB808;&#xCE6D;','&#xC9D1;&#xC73C;&#xB85C; &#xADC0;&#xAC00;','&#xCE74;&#xD2B8;&#xC5D0; &#xC549;&#xC544; &#xB300;&#xAE30;'],a:1,e:'&#xB808;&#xC778; &#xB514;&#xB808;&#xC774; &#xC2DC; &#xD074;&#xB7FD;&#xD558;&#xC6B0;&#xC2A4;&#xB85C; &#xB300;&#xD53C;&#xD558;&#xACE0; &#xADFC;&#xC721;&#xC774; &#xC2DD;&#xC9C0; &#xC54A;&#xB3C4;&#xB85D; &#xAC00;&#xBCBC;&#xC6B4; &#xC2A4;&#xD2B8;&#xB808;&#xCE6D;&#xC744; &#xD558;&#xC138;&#xC694;.'}
];

function v20OpenQuiz(){
  var ov=document.getElementById('v20QuizOv');
  if(!ov){
    ov=document.createElement('div');
    ov.id='v20QuizOv';
    ov.className='v20-overlay';
    ov.innerHTML='<div class="v20-modal" id="v20QuizModal"></div>';
    ov.addEventListener('click',function(e){if(e.target===ov)ov.classList.remove('active');});
    document.body.appendChild(ov);
  }
  window._v20qi=0;window._v20qScore=0;
  v20RenderQuiz();
  ov.classList.add('active');
  v20PlaySFX('quiz');
}
window.v20OpenQuiz=v20OpenQuiz;

function v20RenderQuiz(){
  var m=document.getElementById('v20QuizModal');
  var qi=window._v20qi||0;
  if(qi>=QUIZ_V5.length){
    var pct=Math.round((window._v20qScore/QUIZ_V5.length)*100);
    var grade=pct>=90?'S':pct>=80?'A':pct>=70?'B':pct>=60?'C':'D';
    var gcolor={S:'#ffd700',A:'#1a7a3a',B:'#2196F3',C:'#FF9800',D:'#FF4757'}[grade];
    var h='<div class="v20-hdr"><h2><span class="v20i">&#x1F9E0;</span> Golf IQ v5 &#xACB0;&#xACFC;</h2><button class="v20-x" onclick="document.getElementById(\'v20QuizOv\').classList.remove(\'active\')">&times;</button></div>';
    h+='<div style="text-align:center;padding:30px 0">';
    h+='<div style="font-size:64px;font-weight:900;color:'+gcolor+'">'+grade+'</div>';
    h+='<div style="font-size:20px;font-weight:700;margin-top:8px">'+window._v20qScore+' / '+QUIZ_V5.length+' ('+pct+'%)</div>';
    h+='<div style="font-size:13px;color:var(--text-muted);margin-top:8px">'+(pct>=90?'&#xACE8;&#xD504; &#xBC15;&#xC0AC;! &#xC644;&#xBCBD;&#xD55C; &#xC9C0;&#xC2DD;&#xC785;&#xB2C8;&#xB2E4;!':pct>=70?'&#xD6CC;&#xB959;&#xD569;&#xB2C8;&#xB2E4;! &#xBA87; &#xAC00;&#xC9C0;&#xB9CC; &#xB354; &#xACF5;&#xBD80;&#xD558;&#xBA74; &#xC644;&#xBCBD;!':'&#xB354; &#xB9CE;&#xC740; &#xACF5;&#xBD80;&#xAC00; &#xD544;&#xC694;&#xD569;&#xB2C8;&#xB2E4;. &#xADF8;&#xB9B0; &#xC2A4;&#xD53C;&#xB4DC;/&#xD53C;&#xD305; &#xAC00;&#xC774;&#xB4DC;&#xB97C; &#xD65C;&#xC6A9;&#xD558;&#xC138;&#xC694;!')+'</div>';
    h+='<button class="v20-btn v20-btn-primary" style="margin-top:20px" onclick="window._v20qi=0;window._v20qScore=0;v20RenderQuiz()">&#xB2E4;&#xC2DC; &#xD480;&#xAE30;</button>';
    h+='</div>';
    m.innerHTML=h;
    var qCnt=parseInt(localStorage.getItem('sg_quiz_v5_cnt')||'0')+1;
    localStorage.setItem('sg_quiz_v5_cnt',''+qCnt);
    localStorage.setItem('sg_quiz_v5_best',Math.max(parseInt(localStorage.getItem('sg_quiz_v5_best')||'0'),window._v20qScore).toString());
    v20CheckAchievements();
    return;
  }
  var q=QUIZ_V5[qi];
  var h='<div class="v20-hdr"><h2><span class="v20i">&#x1F9E0;</span> Golf IQ v5</h2><button class="v20-x" onclick="document.getElementById(\'v20QuizOv\').classList.remove(\'active\')">&times;</button></div>';
  h+='<div class="v20-progress"><div class="v20-progress-fill" style="width:'+Math.round((qi/QUIZ_V5.length)*100)+'%;background:linear-gradient(90deg,var(--primary),#2e9e4f)"></div></div>';
  h+='<div style="font-size:12px;color:var(--text-muted);margin-bottom:16px">Q'+(qi+1)+' / '+QUIZ_V5.length+'</div>';
  h+='<div class="v20-card"><h4 style="font-size:16px;line-height:1.6">'+q.q+'</h4></div>';
  q.o.forEach(function(opt,i){
    h+='<button class="v20-btn v20-btn-secondary" style="width:100%;margin-bottom:8px;text-align:left;padding:14px 20px" onclick="v20AnswerQuiz('+i+')">'+String.fromCharCode(9312+i)+' '+opt+'</button>';
  });
  m.innerHTML=h;
}

window.v20AnswerQuiz=function(ans){
  var qi=window._v20qi||0;
  var q=QUIZ_V5[qi];
  var correct=ans===q.a;
  if(correct)window._v20qScore++;
  v20PlaySFX(correct?'quiz_correct':'quiz_wrong');
  v20Toast(correct?'&#xC815;&#xB2F5;! '+q.e:'&#xC624;&#xB2F5;. '+q.e);
  window._v20qi=qi+1;
  setTimeout(v20RenderQuiz,1500);
};

// ===== 10. ACHIEVEMENTS (12 new: 68→80) =====
var V20_ACHIEVEMENTS = [
  {id:'v20_group_first',name:'&#xCCAB; &#xADF8;&#xB8F9; &#xB77C;&#xC6B4;&#xB4DC;',desc:'4&#xC778; &#xADF8;&#xB8F9; &#xC2A4;&#xCF54;&#xC5B4;&#xB9C1; &#xCCAB; &#xC800;&#xC7A5;',icon:'&#x1F465;',check:function(){return(JSON.parse(localStorage.getItem('sg_group_rounds')||'[]')).length>=1;}},
  {id:'v20_group_5',name:'&#xADF8;&#xB8F9; 5&#xD68C;',desc:'&#xADF8;&#xB8F9; &#xB77C;&#xC6B4;&#xB4DC; 5&#xD68C; &#xC800;&#xC7A5;',icon:'&#x1F91D;',check:function(){return(JSON.parse(localStorage.getItem('sg_group_rounds')||'[]')).length>=5;}},
  {id:'v20_flyover_all',name:'&#xCF54;&#xC2A4; &#xD0D0;&#xD5D8;&#xAC00;',desc:'&#xD50C;&#xB77C;&#xC774;&#xC624;&#xBC84; 9&#xD640; &#xC804;&#xBD80; &#xBCF4;&#xAE30;',icon:'&#x1F3CC;&#xFE0F;',check:function(){return parseInt(localStorage.getItem('sg_flyover_cnt')||'0')>=9;}},
  {id:'v20_disp_10',name:'&#xC0F7; &#xBD84;&#xC11D;&#xAC00;',desc:'&#xB514;&#xC2A4;&#xD37C;&#xC804; &#xC0F7; 10&#xAC1C; &#xC785;&#xB825;',icon:'&#x1F3AF;',check:function(){var d=v20GetDispData();return d.shots.length>=10;}},
  {id:'v20_disp_50',name:'&#xC0F7; &#xC804;&#xBB38;&#xAC00;',desc:'&#xB514;&#xC2A4;&#xD37C;&#xC804; &#xC0F7; 50&#xAC1C; &#xC785;&#xB825;',icon:'&#x1F4CA;',check:function(){var d=v20GetDispData();return d.shots.length>=50;}},
  {id:'v20_fitting',name:'&#xD53C;&#xD305; &#xCCB4;&#xD5D8;',desc:'AI &#xD53C;&#xD305; &#xBD84;&#xC11D; &#xC2E4;&#xD589;',icon:'&#x1F3CC;&#xFE0F;',check:function(){return parseInt(localStorage.getItem('sg_fitting_cnt')||'0')>=1;}},
  {id:'v20_caddie_3',name:'&#xCE90;&#xB514; &#xBA54;&#xBAA8;&#xAC00;',desc:'&#xCE90;&#xB514; &#xB178;&#xD2B8; 3&#xD640; &#xC774;&#xC0C1; &#xBA54;&#xBAA8;',icon:'&#x1F9E2;',check:function(){var n=JSON.parse(localStorage.getItem('sg_caddie_notes')||'{}');var cnt=0;for(var k in n){if(n[k])cnt++;}return cnt>=3;}},
  {id:'v20_green_master',name:'&#xADF8;&#xB9B0; &#xC2A4;&#xD53C;&#xB4DC; &#xB9C8;&#xC2A4;&#xD130;',desc:'&#xADF8;&#xB9B0; &#xC2A4;&#xD53C;&#xB4DC; &#xAC00;&#xC774;&#xB4DC; &#xD65C;&#xC6A9;',icon:'&#x26F3;',check:function(){return parseInt(localStorage.getItem('sg_green_view')||'0')>=1;}},
  {id:'v20_photo_first',name:'&#xCCAB; &#xC0AC;&#xC9C4;',desc:'&#xD3EC;&#xD1A0; &#xAC24;&#xB7EC;&#xB9AC;&#xC5D0; &#xCCAB; &#xC0AC;&#xC9C4; &#xCD94;&#xAC00;',icon:'&#x1F4F7;',check:function(){return v20GetPhotos().length>=1;}},
  {id:'v20_photo_10',name:'&#xC0AC;&#xC9C4; &#xCEEC;&#xB809;&#xD130;',desc:'&#xD3EC;&#xD1A0; 10&#xAC1C; &#xC774;&#xC0C1; &#xC218;&#xC9D1;',icon:'&#x1F5BC;&#xFE0F;',check:function(){return v20GetPhotos().length>=10;}},
  {id:'v20_season_goal',name:'&#xBAA9;&#xD45C; &#xC124;&#xC815;&#xAC00;',desc:'&#xC2DC;&#xC98C; &#xBAA9;&#xD45C; &#xD655;&#xC778;',icon:'&#x1F3C5;',check:function(){return(JSON.parse(localStorage.getItem('sg_season_goals_v2')||'[]')).length>=1;}},
  {id:'v20_quiz_v5',name:'Golf IQ v5 &#xD074;&#xB9AC;&#xC5B4;',desc:'Golf IQ v5 &#xD038;&#xC988; &#xC644;&#xB8CC;',icon:'&#x1F9E0;',check:function(){return parseInt(localStorage.getItem('sg_quiz_v5_cnt')||'0')>=1;}}
];

function v20CheckAchievements(){
  var unlocked=JSON.parse(localStorage.getItem('sg_v20_achievements')||'[]');
  V20_ACHIEVEMENTS.forEach(function(a){
    if(unlocked.indexOf(a.id)===-1 && a.check()){
      unlocked.push(a.id);
      localStorage.setItem('sg_v20_achievements',JSON.stringify(unlocked));
      v20Toast(a.icon+' &#xC5C5;&#xC801; &#xD68D;&#xB4DD;: '+a.name);
      v20PlaySFX('achievement');
    }
  });
  if(typeof window.v19CheckAchievements==='function'){try{window.v19CheckAchievements();}catch(e){}}
}

// ===== 11. SFX ENGINE (12 new: 68→80) =====
var v20Ctx=null;
function v20PlaySFX(type){
  try{
    if(!v20Ctx) v20Ctx=new(window.AudioContext||window.webkitAudioContext)();
    var ctx=v20Ctx;
    var o=ctx.createOscillator();
    var g=ctx.createGain();
    o.connect(g);g.connect(ctx.destination);
    g.gain.setValueAtTime(0.12,ctx.currentTime);
    var t=ctx.currentTime;
    switch(type){
      case'group':o.frequency.setValueAtTime(440,t);o.frequency.setValueAtTime(550,t+0.08);o.frequency.setValueAtTime(660,t+0.16);g.gain.exponentialValueTo&&g.gain.exponentialValueTo||g.gain.setValueAtTime(0.001,t+0.25);break;
      case'flyover':o.frequency.setValueAtTime(330,t);o.frequency.linearRampToValueAtTime(660,t+0.3);g.gain.setValueAtTime(0.001,t+0.35);break;
      case'hole_nav':o.frequency.setValueAtTime(520,t);g.gain.setValueAtTime(0.08,t);g.gain.setValueAtTime(0.001,t+0.1);break;
      case'dispersion':o.type='triangle';o.frequency.setValueAtTime(400,t);o.frequency.setValueAtTime(500,t+0.1);g.gain.setValueAtTime(0.001,t+0.2);break;
      case'shot_add':o.frequency.setValueAtTime(600,t);o.frequency.setValueAtTime(800,t+0.05);g.gain.setValueAtTime(0.001,t+0.12);break;
      case'fitting':o.type='sine';o.frequency.setValueAtTime(350,t);o.frequency.setValueAtTime(440,t+0.1);o.frequency.setValueAtTime(550,t+0.2);g.gain.setValueAtTime(0.001,t+0.3);break;
      case'ai_fit':o.type='square';o.frequency.setValueAtTime(440,t);o.frequency.setValueAtTime(660,t+0.1);o.frequency.setValueAtTime(880,t+0.2);g.gain.setValueAtTime(0.001,t+0.3);break;
      case'caddie':o.frequency.setValueAtTime(380,t);o.frequency.setValueAtTime(480,t+0.12);g.gain.setValueAtTime(0.001,t+0.2);break;
      case'note_save':o.frequency.setValueAtTime(500,t);g.gain.setValueAtTime(0.06,t);g.gain.setValueAtTime(0.001,t+0.1);break;
      case'green':o.type='sine';o.frequency.setValueAtTime(300,t);o.frequency.linearRampToValueAtTime(450,t+0.2);g.gain.setValueAtTime(0.001,t+0.25);break;
      case'green_select':o.frequency.setValueAtTime(420,t);g.gain.setValueAtTime(0.001,t+0.12);break;
      case'gallery':o.frequency.setValueAtTime(500,t);o.frequency.setValueAtTime(600,t+0.08);o.frequency.setValueAtTime(700,t+0.16);g.gain.setValueAtTime(0.001,t+0.25);break;
      case'photo_add':o.frequency.setValueAtTime(650,t);o.frequency.setValueAtTime(780,t+0.06);g.gain.setValueAtTime(0.001,t+0.15);break;
      case'season':o.type='triangle';o.frequency.setValueAtTime(350,t);o.frequency.setValueAtTime(500,t+0.15);o.frequency.setValueAtTime(700,t+0.3);g.gain.setValueAtTime(0.001,t+0.4);break;
      case'goal':o.frequency.setValueAtTime(550,t);o.frequency.setValueAtTime(660,t+0.08);g.gain.setValueAtTime(0.001,t+0.15);break;
      case'quiz':o.frequency.setValueAtTime(440,t);o.frequency.setValueAtTime(550,t+0.1);g.gain.setValueAtTime(0.001,t+0.2);break;
      case'quiz_correct':o.frequency.setValueAtTime(523,t);o.frequency.setValueAtTime(659,t+0.08);o.frequency.setValueAtTime(784,t+0.16);g.gain.setValueAtTime(0.001,t+0.25);break;
      case'quiz_wrong':o.type='sawtooth';o.frequency.setValueAtTime(200,t);o.frequency.setValueAtTime(150,t+0.1);g.gain.setValueAtTime(0.06,t);g.gain.setValueAtTime(0.001,t+0.2);break;
      case'achievement':o.frequency.setValueAtTime(523,t);o.frequency.setValueAtTime(659,t+0.1);o.frequency.setValueAtTime(784,t+0.2);o.frequency.setValueAtTime(1047,t+0.3);g.gain.setValueAtTime(0.001,t+0.45);break;
      case'save':o.frequency.setValueAtTime(440,t);o.frequency.setValueAtTime(550,t+0.08);g.gain.setValueAtTime(0.001,t+0.15);break;
      case'reset':o.type='sawtooth';o.frequency.setValueAtTime(300,t);o.frequency.setValueAtTime(200,t+0.15);g.gain.setValueAtTime(0.06,t);g.gain.setValueAtTime(0.001,t+0.2);break;
      default:o.frequency.setValueAtTime(440,t);g.gain.setValueAtTime(0.001,t+0.1);
    }
    o.start(t);o.stop(t+0.5);
  }catch(e){}
}

// ===== 12. TOAST =====
function v20Toast(msg){
  var t=document.createElement('div');
  t.style.cssText='position:fixed;bottom:90px;left:50%;transform:translateX(-50%);background:var(--toast-bg,#333);color:#fff;padding:12px 24px;border-radius:14px;font-size:13px;font-weight:600;z-index:10200;box-shadow:0 6px 24px rgba(0,0,0,.3);max-width:90vw;text-align:center;animation:v20Rise .3s ease';
  t.innerHTML=msg;
  document.body.appendChild(t);
  setTimeout(function(){t.style.opacity='0';t.style.transition='opacity .3s';setTimeout(function(){t.remove();},300);},3000);
}

// ===== 13. KEYBOARD SHORTCUTS =====
document.addEventListener('keydown',function(e){
  var t=e.target.tagName;
  if(t==='INPUT'||t==='TEXTAREA'||t==='SELECT')return;
  if(!e.shiftKey)return;
  switch(e.key){
    case'G':v20OpenGroup();e.preventDefault();break;
    case'V':v20OpenFlyover();e.preventDefault();break;
    case'D':v20OpenDispersion();e.preventDefault();break;
    case'I':v20OpenFitting();e.preventDefault();break;
    case'N':v20OpenCaddie();e.preventDefault();break;
    case'E':v20OpenGreen();e.preventDefault();break;
    case'O':v20OpenGallery();e.preventDefault();break;
    case'R':v20OpenSeasonReview();e.preventDefault();break;
    case'Z':v20OpenQuiz();e.preventDefault();break;
  }
});

// ===== 14. INJECT BUTTONS =====
function injectV20Buttons(){
  var target=document.querySelector('.search-section')||document.querySelector('.header');
  if(!target)return;
  var bar=document.createElement('div');
  bar.style.cssText='display:flex;gap:6px;flex-wrap:wrap;margin:10px 0;padding:0 0 6px';
  var buttons=[
    {label:'&#x1F465; 4&#xC778;&#xC2A4;&#xCF54;&#xC5B4;',fn:'v20OpenGroup()'},
    {label:'&#x1F3CC;&#xFE0F; &#xD50C;&#xB77C;&#xC774;&#xC624;&#xBC84;',fn:'v20OpenFlyover()'},
    {label:'&#x1F3AF; &#xB514;&#xC2A4;&#xD37C;&#xC804;',fn:'v20OpenDispersion()'},
    {label:'&#x1F3CC;&#xFE0F; &#xD53C;&#xD305;&#xAC00;&#xC774;&#xB4DC;',fn:'v20OpenFitting()'},
    {label:'&#x1F9E2; &#xCE90;&#xB514;AI',fn:'v20OpenCaddie()'},
    {label:'&#x26F3; &#xADF8;&#xB9B0;&#xC2A4;&#xD53C;&#xB4DC;',fn:'v20OpenGreen()'},
    {label:'&#x1F4F7; &#xD3EC;&#xD1A0;&#xAC24;&#xB7EC;&#xB9AC;',fn:'v20OpenGallery()'},
    {label:'&#x1F3C5; &#xC2DC;&#xC98C;&#xB9AC;&#xBDF0;',fn:'v20OpenSeasonReview()'},
    {label:'&#x1F9E0; Quiz v5',fn:'v20OpenQuiz()'}
  ];
  buttons.forEach(function(b){
    var btn=document.createElement('button');
    btn.className='v20-btn v20-btn-sm v20-btn-secondary';
    btn.innerHTML=b.label;
    btn.setAttribute('onclick',b.fn);
    bar.appendChild(btn);
  });
  target.parentNode.insertBefore(bar,target.nextSibling);
}

// Track flyover views
var _origFlyHole=window.v20FlyHole;
window.v20FlyHole=function(i){
  var cnt=parseInt(localStorage.getItem('sg_flyover_cnt')||'0');
  localStorage.setItem('sg_flyover_cnt',''+(cnt+1));
  v20RenderFlyover(i);
  v20PlaySFX('hole_nav');
};

// Track green speed views
var _origGreenOpen=window.v20OpenGreen;
window.v20OpenGreen=function(){
  localStorage.setItem('sg_green_view','1');
  _origGreenOpen();
};

// Init
setTimeout(function(){
  injectV20Buttons();
  v20CheckAchievements();
},900);

})();
