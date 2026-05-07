(function(){
"use strict";
// Ensure icons.css is loaded (fallback if not in HTML)
if(!document.querySelector('link[href*="icons.css"]')){
var iconLink=document.createElement('link');
iconLink.rel='stylesheet';
iconLink.href='icons.css';
document.head.appendChild(iconLink);
}
// Remove any remaining Font Awesome CDN links
document.querySelectorAll('link[href*="font-awesome"],link[href*="fontawesome"]').forEach(function(l){l.remove()});

var CSS=`
.round-modal-overlay{position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,.6);z-index:10000;display:none;align-items:center;justify-content:center;backdrop-filter:blur(3px)}
.round-modal-overlay.active{display:flex}
.round-modal{background:var(--card-bg,#fff);border-radius:16px;padding:24px;width:90%;max-width:500px;max-height:85vh;overflow-y:auto;box-shadow:0 20px 60px rgba(0,0,0,.3)}
.round-modal h2{margin:0 0 16px;color:var(--primary,#2d6a4f)}
.round-tabs{display:flex;gap:8px;margin-bottom:16px}
.round-tab{padding:8px 16px;border:none;border-radius:8px;cursor:pointer;background:var(--bg,#f0f0f0);color:var(--text,#333);font-weight:600;transition:.2s}
.round-tab.active{background:var(--primary,#2d6a4f);color:#fff}
.round-stats{display:grid;grid-template-columns:repeat(2,1fr);gap:12px;margin-bottom:16px}
.round-stat{background:var(--bg,#f5f5f5);padding:12px;border-radius:10px;text-align:center}
.round-stat .val{font-size:1.4em;font-weight:700;color:var(--primary,#2d6a4f)}
.round-stat .lbl{font-size:.75em;opacity:.7;margin-top:4px}
.round-form label{display:block;margin-bottom:12px;font-size:.9em}
.round-form input,.round-form textarea,.round-form select{width:100%;padding:10px;border:1px solid var(--border,#ddd);border-radius:8px;margin-top:4px;background:var(--card-bg,#fff);color:var(--text,#333)}
.round-form button{width:100%;padding:12px;background:var(--primary,#2d6a4f);color:#fff;border:none;border-radius:8px;font-weight:600;cursor:pointer;margin-top:8px}
.round-item{display:flex;justify-content:space-between;align-items:center;padding:12px;border-radius:10px;background:var(--bg,#f5f5f5);margin-bottom:8px}
.round-item .ri-info{flex:1}
.round-item .ri-score{font-size:1.3em;font-weight:700;color:var(--primary,#2d6a4f);margin-right:12px}
.round-item .ri-del{background:none;border:none;color:#e74c3c;cursor:pointer;font-size:1.1em;padding:4px 8px}
.visited-badge{display:inline-block;background:#27ae60;color:#fff;font-size:.65em;padding:2px 6px;border-radius:4px;margin-left:6px;font-weight:600}
.note-indicator{display:inline-block;width:8px;height:8px;background:#f39c12;border-radius:50%;margin-left:6px}
.autocomplete-wrap{position:relative}
.autocomplete-list{position:absolute;top:100%;left:0;right:0;background:var(--card-bg,#fff);border:1px solid var(--border,#ddd);border-radius:0 0 10px 10px;max-height:320px;overflow-y:auto;z-index:999;display:none;box-shadow:0 8px 24px rgba(0,0,0,.15)}
.autocomplete-list.show{display:block}
.ac-item{padding:10px 14px;cursor:pointer;border-bottom:1px solid var(--border,#eee);display:flex;justify-content:space-between;align-items:center;transition:.15s}
.ac-item:hover,.ac-item.selected{background:var(--primary,#2d6a4f);color:#fff}
.ac-item .ac-name{font-weight:600;font-size:.9em}
.ac-item .ac-meta{font-size:.75em;opacity:.7}
#backToTop{position:fixed;bottom:80px;right:20px;width:44px;height:44px;border-radius:50%;background:var(--primary,#2d6a4f);color:#fff;border:none;font-size:1.2em;cursor:pointer;opacity:0;transform:translateY(20px);transition:.3s;z-index:900;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 12px rgba(0,0,0,.2)}
#backToTop.show{opacity:1;transform:translateY(0)}
.header-btn-round{background:var(--primary,#2d6a4f);color:#fff;border:none;padding:6px 12px;border-radius:8px;cursor:pointer;font-size:.85em;font-weight:600;display:inline-flex;align-items:center;gap:4px}
.header-btn-visited{background:none;border:1px solid var(--primary,#2d6a4f);color:var(--primary,#2d6a4f);padding:5px 10px;border-radius:8px;cursor:pointer;font-size:.8em;font-weight:600}
.header-btn-visited.active{background:var(--primary,#2d6a4f);color:#fff}
.detail-actions{display:flex;gap:8px;margin:12px 0;flex-wrap:wrap}
.detail-actions button{padding:8px 14px;border-radius:8px;border:none;cursor:pointer;font-size:.85em;font-weight:600;display:inline-flex;align-items:center;gap:4px;transition:.2s}
.btn-visit{background:#27ae60;color:#fff}
.btn-visit.visited{background:#95a5a6}
.btn-share{background:#3498db;color:#fff}
.btn-note{background:#f39c12;color:#fff}
.course-note{width:100%;min-height:60px;padding:10px;border:1px solid var(--border,#ddd);border-radius:8px;margin-top:8px;resize:vertical;font-family:inherit;background:var(--card-bg,#fff);color:var(--text,#333)}
.card-gradient{position:absolute;top:0;left:0;right:0;height:3px;border-radius:3px 3px 0 0}
.card-gradient-public{background:linear-gradient(90deg,#3498db,#2ecc71)}
.card-gradient-member{background:linear-gradient(90deg,#9b59b6,#e74c3c)}
.card-gradient-military{background:linear-gradient(90deg,#27ae60,#2d6a4f)}
@media print{header,.filter-section,.mobile-nav,.fab-gps,#backToTop,.modal-overlay,.compare-bar,.toast-container{display:none!important}.results-grid{display:grid!important;grid-template-columns:repeat(2,1fr)!important;gap:12px!important}.course-card{page-break-inside:avoid;box-shadow:none!important;border:1px solid #ddd!important}}
:focus-visible{outline:2px solid var(--primary,#2d6a4f);outline-offset:2px}
`;
var style=document.createElement('style');
style.textContent=CSS;
document.head.appendChild(style);

var rounds=JSON.parse(localStorage.getItem('sg_rounds')||'[]');
var notes=JSON.parse(localStorage.getItem('sg_notes')||'{}');
var visited=JSON.parse(localStorage.getItem('sg_visited')||'[]');
var showVisitedOnly=false;

function saveRounds(){localStorage.setItem('sg_rounds',JSON.stringify(rounds))}
function saveNotes(){localStorage.setItem('sg_notes',JSON.stringify(notes))}
function saveVisited(){localStorage.setItem('sg_visited',JSON.stringify(visited))}

var overlay=document.createElement('div');
overlay.className='round-modal-overlay';
overlay.setAttribute('role','dialog');
overlay.setAttribute('aria-modal','true');
overlay.setAttribute('aria-label','라운드 기록');
overlay.innerHTML=`<div class="round-modal">
<div style="display:flex;justify-content:space-between;align-items:center"><h2><i class="fas fa-trophy"></i> 내 라운드</h2><button onclick="this.closest('.round-modal-overlay').classList.remove('active')" style="background:none;border:none;font-size:1.5em;cursor:pointer;color:var(--text,#333)">&times;</button></div>
<div class="round-tabs"><button class="round-tab active" data-tab="list"><i class="fas fa-list"></i> 목록</button><button class="round-tab" data-tab="add"><i class="fas fa-plus"></i> 추가</button></div>
<div id="roundListView"><div class="round-stats"><div class="round-stat"><div class="val" id="rsTotalRounds">0</div><div class="lbl">총 라운드</div></div><div class="round-stat"><div class="val" id="rsAvgScore">-</div><div class="lbl">평균 스코어</div></div><div class="round-stat"><div class="val" id="rsBestScore">-</div><div class="lbl">베스트</div></div><div class="round-stat"><div class="val" id="rsCourses">0</div><div class="lbl">골프장 수</div></div></div><div id="rsHandicap" style="text-align:center;margin-bottom:12px"></div><div id="roundsList"></div></div>
<div id="roundAddView" style="display:none"><form class="round-form" id="roundForm"><label>날짜<input type="date" id="rfDate" required></label><label>골프장<input type="text" id="rfCourse" placeholder="골프장명 입력" required></label><label>스코어(타수)<input type="number" id="rfScore" min="50" max="200" placeholder="72" required></label><label>메모<textarea id="rfMemo" rows="2" placeholder="간단 메모"></textarea></label><button type="submit"><i class="fas fa-save"></i> 저장</button></form></div>
</div>`;
document.body.appendChild(overlay);

overlay.addEventListener('click',function(e){if(e.target===overlay)overlay.classList.remove('active')});
overlay.querySelectorAll('.round-tab').forEach(function(tab){
  tab.addEventListener('click',function(){
    overlay.querySelectorAll('.round-tab').forEach(function(t){t.classList.remove('active')});
    tab.classList.add('active');
    var v=tab.dataset.tab;
    document.getElementById('roundListView').style.display=v==='list'?'':'none';
    document.getElementById('roundAddView').style.display=v==='add'?'':'none';
  });
});
document.getElementById('roundForm').addEventListener('submit',function(e){
  e.preventDefault();
  var r={date:document.getElementById('rfDate').value,course:document.getElementById('rfCourse').value,score:parseInt(document.getElementById('rfScore').value),memo:document.getElementById('rfMemo').value,id:Date.now()};
  rounds.unshift(r);saveRounds();updateRoundUI();
  this.reset();
  overlay.querySelector('[data-tab="list"]').click();
  if(window.showToast)window.showToast('라운드 기록 저장!','success');
});

function calcHandicapLocal(rds){
  if(rds.length<3)return null;
  var diffs=rds.map(function(r){return r.score-72}).sort(function(a,b){return a-b});
  var best=diffs.slice(0,Math.max(1,Math.ceil(diffs.length*0.4)));
  return Math.round(best.reduce(function(s,d){return s+d},0)/best.length*0.96*10)/10;
}
function updateRoundUI(){
  var el=document.getElementById('rsTotalRounds');if(!el)return;
  el.textContent=rounds.length;
  if(rounds.length>0){
    var scores=rounds.map(function(r){return r.score});
    document.getElementById('rsAvgScore').textContent=Math.round(scores.reduce(function(a,b){return a+b},0)/scores.length);
    document.getElementById('rsBestScore').textContent=Math.min.apply(null,scores);
    var cs=new Set(rounds.map(function(r){return r.course}));
    document.getElementById('rsCourses').textContent=cs.size;
    var hc=calcHandicapLocal(rounds);
    var hcEl=document.getElementById('rsHandicap');
    if(hcEl&&hc!==null){
      var cls=hc<10?'hc-single':hc<20?'hc-mid':'hc-high';
      hcEl.innerHTML='<span class="handicap-badge '+cls+'">HC '+hc+'</span><div style="font-size:.7em;opacity:.6;margin-top:4px">추정 핸디캡 (상위 40% 평균)</div>';
    }else if(hcEl){
      hcEl.innerHTML=rounds.length>0?'<div style="font-size:.75em;opacity:.5">3라운드 이상 기록하면 핸디캡이 표시됩니다</div>':'';
    }
  }
  var list=document.getElementById('roundsList');
  list.innerHTML=rounds.slice(0,20).map(function(r){return '<div class="round-item"><span class="ri-score">'+r.score+'</span><div class="ri-info"><div style="font-weight:600">'+r.course+'</div><div style="font-size:.8em;opacity:.7">'+r.date+(r.memo?' - '+r.memo:'')+'</div></div><button class="ri-del" data-id="'+r.id+'">&times;</button></div>'}).join('');
  list.querySelectorAll('.ri-del').forEach(function(btn){
    btn.addEventListener('click',function(){rounds=rounds.filter(function(r){return r.id!=btn.dataset.id});saveRounds();updateRoundUI()});
  });
}
updateRoundUI();

var hdr=document.querySelector('.header-controls')||document.querySelector('header');
if(hdr){
  var rbtn=document.createElement('button');
  rbtn.className='header-btn-round';
  rbtn.innerHTML='<i class="fas fa-trophy"></i> 내 라운드';
  rbtn.addEventListener('click',function(){overlay.classList.add('active');updateRoundUI()});
  var vbtn=document.createElement('button');
  vbtn.className='header-btn-visited';
  vbtn.innerHTML='<i class="fas fa-check"></i> 방문한 곳';
  vbtn.addEventListener('click',function(){
    showVisitedOnly=!showVisitedOnly;
    vbtn.classList.toggle('active',showVisitedOnly);
    if(window.applyFilters)window.applyFilters();
  });
  var wrap=hdr.querySelector('.header-actions')||hdr;
  wrap.appendChild(rbtn);
  wrap.appendChild(vbtn);
}

var btt=document.createElement('button');
btt.id='backToTop';
btt.setAttribute('aria-label','맨 위로');
btt.innerHTML='<i class="fas fa-arrow-up"></i>';
btt.addEventListener('click',function(){window.scrollTo({top:0,behavior:'smooth'})});
document.body.appendChild(btt);
window.addEventListener('scroll',function(){btt.classList.toggle('show',window.scrollY>300)});

var searchInput=document.getElementById('nameSearch')||document.getElementById('searchInput');
if(searchInput){
  var acWrap=searchInput.parentElement;
  acWrap.classList.add('autocomplete-wrap');
  var acList=document.createElement('div');
  acList.className='autocomplete-list';
  acWrap.appendChild(acList);
  var acIdx=-1;
  searchInput.addEventListener('input',function(){
    var q=this.value.trim().toLowerCase();
    if(q.length<1){acList.classList.remove('show');return}
    var data=window.allCourses||[];
    var matches=data.filter(function(c){return(c.name||'').toLowerCase().includes(q)||(c.region||'').toLowerCase().includes(q)}).slice(0,8);
    if(matches.length===0){acList.classList.remove('show');return}
    acIdx=-1;
    acList.innerHTML=matches.map(function(c,i){return '<div class="ac-item" data-idx="'+i+'"><div><div class="ac-name">'+c.name+'</div><div class="ac-meta">'+(c.region||'')+'</div></div><div class="ac-meta">'+(c.rating?c.rating+'/10':'')+'</div></div>'}).join('');
    acList.classList.add('show');
    acList.querySelectorAll('.ac-item').forEach(function(item,i){
      item.addEventListener('click',function(){
        searchInput.value=matches[i].name;
        acList.classList.remove('show');
        if(window.showDetail)window.showDetail(matches[i]);
      });
    });
  });
  searchInput.addEventListener('keydown',function(e){
    var items=acList.querySelectorAll('.ac-item');
    if(!acList.classList.contains('show')||items.length===0)return;
    if(e.key==='ArrowDown'){e.preventDefault();acIdx=Math.min(acIdx+1,items.length-1);items.forEach(function(it,i){it.classList.toggle('selected',i===acIdx)})}
    else if(e.key==='ArrowUp'){e.preventDefault();acIdx=Math.max(acIdx-1,0);items.forEach(function(it,i){it.classList.toggle('selected',i===acIdx)})}
    else if(e.key==='Enter'&&acIdx>=0){e.preventDefault();items[acIdx].click()}
    else if(e.key==='Escape'){acList.classList.remove('show')}
  });
  document.addEventListener('click',function(e){if(!acWrap.contains(e.target))acList.classList.remove('show')});
}

var origApply=window.applyFilters;
window.applyFilters=function(){
  if(origApply)origApply();
  if(showVisitedOnly&&window.filteredCourses){
    window.filteredCourses=window.filteredCourses.filter(function(c){return visited.includes(c.name)});
    if(window.renderResults)window.renderResults();
  }
};

var origRender=window.renderResults;
window.renderResults=function(){
  if(origRender)origRender();
  document.querySelectorAll('.course-card').forEach(function(card){
    var name=card.dataset.name||card.querySelector('.course-name')&&card.querySelector('.course-name').textContent;
    if(!name)return;
    var hdr=card.querySelector('.course-name')||card.querySelector('h3');
    if(visited.includes(name)&&hdr&&!hdr.querySelector('.visited-badge')){
      var b=document.createElement('span');b.className='visited-badge';b.textContent='방문';hdr.appendChild(b);
    }
    if(notes[name]&&hdr&&!hdr.querySelector('.note-indicator')){
      var n=document.createElement('span');n.className='note-indicator';n.title='메모 있음';hdr.appendChild(n);
    }
    var type=card.dataset.type||(card.textContent.includes('회원제')?'member':card.textContent.includes('군')?'military':'public');
    if(!card.querySelector('.card-gradient')){
      var g=document.createElement('div');
      g.className='card-gradient card-gradient-'+(type==='member'?'member':type==='military'?'military':'public');
      card.style.position='relative';card.insertBefore(g,card.firstChild);
    }
  });
};

var origDetail=window.showDetail;
window.showDetail=function(course){
  if(origDetail)origDetail(course);
  setTimeout(function(){
    var modal=document.querySelector('.modal-content')||document.querySelector('.detail-modal');
    if(!modal||modal.querySelector('.detail-actions'))return;
    var name=course.name||course.이름||'';
    var actions=document.createElement('div');
    actions.className='detail-actions';
    var isV=visited.includes(name);
    actions.innerHTML='<button class="btn-visit'+(isV?' visited':'')+'"><i class="fas fa-check"></i> '+(isV?'방문완료':'방문 체크')+'</button><button class="btn-share"><i class="fas fa-share-alt"></i> 공유</button>';
    actions.querySelector('.btn-visit').addEventListener('click',function(){
      if(visited.includes(name)){visited=visited.filter(function(v){return v!==name})}
      else{visited.push(name)}
      saveVisited();
      this.classList.toggle('visited');
      this.innerHTML='<i class="fas fa-check"></i> '+(visited.includes(name)?'방문완료':'방문 체크');
      if(window.showToast)window.showToast(visited.includes(name)?'방문 체크!':'방문 해제','info');
    });
    actions.querySelector('.btn-share').addEventListener('click',function(){
      var text=name+' - '+(course.region||course.지역||'')+' | SmartGolf';
      if(navigator.share){navigator.share({title:name,text:text})}
      else{navigator.clipboard.writeText(text).then(function(){if(window.showToast)window.showToast('클립보드에 복사됨','success')})}
    });
    var noteArea=document.createElement('div');
    noteArea.innerHTML='<label style="font-weight:600;font-size:.85em;margin-top:12px;display:block"><i class="fas fa-sticky-note"></i> 코스 메모</label><textarea class="course-note" placeholder="이 골프장에 대한 메모...">'+(notes[name]||'')+'</textarea>';
    noteArea.querySelector('textarea').addEventListener('blur',function(){
      if(this.value.trim()){notes[name]=this.value.trim()}else{delete notes[name]}
      saveNotes();
    });
    modal.appendChild(actions);
    modal.appendChild(noteArea);
  },100);
};

window.addEventListener('load',function(){
  if(window.renderResults)window.renderResults();
});
})();