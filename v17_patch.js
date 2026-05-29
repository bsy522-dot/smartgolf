(function(){
'use strict';

var css17 = document.createElement('style');
css17.textContent = `
.v17-overlay{position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,.86);z-index:10060;display:none;align-items:center;justify-content:center;backdrop-filter:blur(18px)}
.v17-overlay.active{display:flex}
.v17-modal{background:var(--card-bg,#fff);border-radius:28px;padding:32px;width:97%;max-width:840px;max-height:94vh;overflow-y:auto;box-shadow:0 44px 130px rgba(0,0,0,.7);animation:v17Rise .4s cubic-bezier(.22,1,.36,1)}
@keyframes v17Rise{from{opacity:0;transform:translateY(52px) scale(.91)}to{opacity:1;transform:translateY(0) scale(1)}}
.v17-hdr{display:flex;justify-content:space-between;align-items:center;margin-bottom:22px}
.v17-hdr h2{font-size:23px;font-weight:800;display:flex;align-items:center;gap:10px}
.v17-hdr h2 .v17i{font-size:30px}
.v17-x{background:none;border:none;font-size:30px;cursor:pointer;color:var(--text-muted);padding:4px 10px;border-radius:10px;transition:.2s}
.v17-x:hover{background:var(--border);color:var(--text)}
.v17-tabs{display:flex;gap:6px;margin-bottom:18px;overflow-x:auto;padding-bottom:4px;scrollbar-width:none}
.v17-tabs::-webkit-scrollbar{display:none}
.v17-tab{padding:10px 20px;border-radius:26px;border:1.5px solid var(--border);background:var(--bg);font-size:12px;font-weight:700;cursor:pointer;white-space:nowrap;transition:.25s}
.v17-tab.active{background:var(--primary);color:#fff;border-color:var(--primary);box-shadow:0 3px 16px rgba(26,122,58,.35)}
.v17-card{background:var(--bg);border-radius:18px;padding:20px;margin-bottom:12px;transition:.25s;border:1.5px solid transparent}
.v17-card:hover{border-color:var(--primary);transform:translateY(-2px);box-shadow:0 4px 18px rgba(26,122,58,.12)}
.v17-card h4{font-size:15px;font-weight:700;margin-bottom:8px;display:flex;align-items:center;gap:8px}
.v17-card p{font-size:12px;color:var(--text-muted);line-height:1.7}
.v17-btn{padding:11px 24px;border:none;border-radius:14px;font-size:13px;font-weight:700;cursor:pointer;transition:.25s;display:inline-flex;align-items:center;gap:6px}
.v17-btn-primary{background:linear-gradient(135deg,var(--primary),#2e9e4f);color:#fff}
.v17-btn-primary:hover{transform:translateY(-2px);box-shadow:0 8px 22px rgba(26,122,58,.4)}
.v17-btn-sm{padding:7px 14px;font-size:11px;border-radius:10px}
.v17-btn-secondary{background:var(--bg);color:var(--text);border:1.5px solid var(--border)}
.v17-btn-secondary:hover{border-color:var(--primary);color:var(--primary)}
.v17-btn-danger{background:linear-gradient(135deg,#e53935,#ff5252);color:#fff}
.v17-input{width:100%;padding:11px 16px;border:2px solid var(--border);border-radius:12px;font-size:13px;background:var(--bg);color:var(--text);transition:.2s}
.v17-input:focus{border-color:var(--primary);outline:none;box-shadow:0 0 0 3px rgba(26,122,58,.12)}
.v17-textarea{width:100%;padding:11px 16px;border:2px solid var(--border);border-radius:12px;font-size:13px;background:var(--bg);color:var(--text);min-height:80px;resize:vertical;font-family:inherit}
.v17-textarea:focus{border-color:var(--primary);outline:none}
.v17-select{padding:9px 14px;border:2px solid var(--border);border-radius:10px;font-size:13px;background:var(--bg);color:var(--text)}
.v17-grid2{display:grid;grid-template-columns:1fr 1fr;gap:12px}
.v17-grid3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px}
.v17-grid4{display:grid;grid-template-columns:repeat(4,1fr);gap:8px}
@media(max-width:520px){.v17-grid2,.v17-grid3,.v17-grid4{grid-template-columns:1fr}}
.v17-divider{height:1px;background:var(--border);margin:18px 0}
.v17-badge{display:inline-block;padding:5px 14px;border-radius:16px;font-size:11px;font-weight:700}
.v17-progress{width:100%;height:12px;background:var(--border);border-radius:6px;overflow:hidden;margin:8px 0}
.v17-progress-fill{height:100%;border-radius:6px;transition:width .6s ease}
.v17-stat-row{display:flex;justify-content:space-between;align-items:center;padding:13px 0;border-bottom:1px solid var(--border)}
.v17-stat-row:last-child{border-bottom:none}
.v17-bracket{display:flex;flex-direction:column;gap:8px}
.v17-bracket-match{display:flex;align-items:center;gap:8px;padding:10px 14px;background:var(--bg);border-radius:12px;border-left:4px solid var(--border);transition:.2s}
.v17-bracket-match.won{border-left-color:var(--primary);background:var(--primary-light)}
.v17-bracket-match.lost{border-left-color:#e53935;opacity:.6}
.v17-bracket-name{flex:1;font-size:13px;font-weight:600}
.v17-bracket-score{font-size:15px;font-weight:800;color:var(--primary)}
.v17-rule-card{background:var(--bg);border-radius:16px;padding:18px;margin-bottom:10px;border-left:4px solid var(--primary);cursor:pointer;transition:.25s}
.v17-rule-card:hover{transform:translateX(4px);box-shadow:0 3px 12px rgba(26,122,58,.1)}
.v17-rule-card.expanded .v17-rule-detail{display:block}
.v17-rule-detail{display:none;margin-top:12px;padding-top:12px;border-top:1px solid var(--border);font-size:12px;color:var(--text-muted);line-height:1.8}
.v17-rule-num{font-size:11px;font-weight:800;color:var(--primary);margin-bottom:4px}
.v17-rule-title{font-size:14px;font-weight:700}
.v17-equip-card{display:flex;gap:14px;padding:16px;background:var(--bg);border-radius:16px;margin-bottom:10px;align-items:center;border:1.5px solid transparent;transition:.25s}
.v17-equip-card:hover{border-color:var(--primary);transform:translateY(-2px)}
.v17-equip-icon{width:52px;height:52px;border-radius:14px;display:flex;align-items:center;justify-content:center;font-size:26px;flex-shrink:0}
.v17-equip-info{flex:1}
.v17-equip-name{font-size:14px;font-weight:700;margin-bottom:3px}
.v17-equip-desc{font-size:11px;color:var(--text-muted);line-height:1.6}
.v17-equip-tags{display:flex;gap:6px;flex-wrap:wrap;margin-top:6px}
.v17-equip-tag{padding:3px 8px;border-radius:8px;font-size:10px;font-weight:600;background:var(--primary-light);color:var(--primary)}
.v17-hole-svg{width:100%;max-width:400px;margin:0 auto;display:block}
.v17-hole-info{display:flex;justify-content:space-around;padding:12px 0;background:var(--bg);border-radius:12px;margin-top:10px}
.v17-hole-stat{text-align:center}
.v17-hole-stat .num{font-size:22px;font-weight:900;color:var(--primary)}
.v17-hole-stat .lbl{font-size:10px;color:var(--text-muted);font-weight:600}
.v17-coach-msg{padding:16px;background:linear-gradient(135deg,#e8f5e9,#c8e6c9);border-radius:16px;margin-bottom:12px;border-left:5px solid var(--primary)}
[data-theme="dark"] .v17-coach-msg{background:linear-gradient(135deg,#1a3a25,#0f5a28)}
.v17-coach-msg h5{font-size:13px;font-weight:700;margin-bottom:6px;display:flex;align-items:center;gap:6px}
.v17-coach-msg p{font-size:12px;line-height:1.7;color:var(--text-muted)}
.v17-season-chart{width:100%;height:200px;border-radius:14px;overflow:hidden;margin:12px 0}
.v17-challenge-item{display:flex;align-items:center;gap:12px;padding:14px;background:var(--bg);border-radius:14px;margin-bottom:8px;border-left:4px solid var(--border);transition:.25s}
.v17-challenge-item.completed{border-left-color:#4caf50;background:#e8f5e9}
[data-theme="dark"] .v17-challenge-item.completed{background:#1a3a25}
.v17-challenge-icon{font-size:24px}
.v17-challenge-info{flex:1}
.v17-challenge-info h5{font-size:13px;font-weight:700;margin-bottom:2px}
.v17-challenge-info p{font-size:11px;color:var(--text-muted)}
.v17-hcp-chart{width:100%;height:180px}
.v17-green-sim{position:relative;width:100%;max-width:400px;margin:0 auto}
.v17-green-canvas{width:100%;border-radius:50%;aspect-ratio:1.3/1;background:radial-gradient(ellipse,#4caf50,#2e7d32);box-shadow:inset 0 0 30px rgba(0,0,0,.2)}
.v17-menu-bar{position:fixed;bottom:70px;left:50%;transform:translateX(-50%);display:flex;gap:6px;background:var(--glass-bg);backdrop-filter:blur(16px);border:1.5px solid var(--glass-border);border-radius:18px;padding:8px 12px;z-index:9999;box-shadow:0 8px 30px rgba(0,0,0,.15);overflow-x:auto;max-width:95vw;scrollbar-width:none}
.v17-menu-bar::-webkit-scrollbar{display:none}
.v17-menu-btn{padding:8px 14px;border:none;border-radius:12px;font-size:11px;font-weight:700;cursor:pointer;white-space:nowrap;background:var(--bg);color:var(--text);transition:.2s;display:flex;align-items:center;gap:5px}
.v17-menu-btn:hover{background:var(--primary);color:#fff;transform:scale(1.05)}
.v17-swing-item{padding:14px;background:var(--bg);border-radius:14px;margin-bottom:10px;border-left:4px solid var(--accent)}
.v17-swing-date{font-size:10px;color:var(--text-muted);margin-bottom:4px}
.v17-swing-club{font-size:13px;font-weight:700;margin-bottom:6px}
.v17-swing-checks{display:flex;flex-wrap:wrap;gap:6px}
.v17-swing-check{padding:3px 10px;border-radius:8px;font-size:10px;font-weight:600}
.v17-swing-check.good{background:#e8f5e9;color:#2e7d32}
.v17-swing-check.bad{background:#ffebee;color:#c62828}
[data-theme="dark"] .v17-swing-check.good{background:#1a3a25;color:#66bb6a}
[data-theme="dark"] .v17-swing-check.bad{background:#3a1a1a;color:#ef5350}
`;
document.head.appendChild(css17);

// --- Web Audio SFX v17 ---
var actx17 = null;
function getAC17(){ if(!actx17) try{ actx17=new(window.AudioContext||window.webkitAudioContext)(); }catch(e){} return actx17; }
function sfx17(type){
  var ac=getAC17(); if(!ac)return;
  var o=ac.createOscillator(),g=ac.createGain(),t=ac.currentTime;
  o.connect(g); g.connect(ac.destination);
  switch(type){
    case 'tournament': o.type='triangle';o.frequency.setValueAtTime(523,t);o.frequency.exponentialRampToValueAtTime(784,t+.08);o.frequency.exponentialRampToValueAtTime(1047,t+.16);g.gain.setValueAtTime(.22,t);g.gain.exponentialRampToValueAtTime(.01,t+.4);o.start(t);o.stop(t+.4);break;
    case 'swing_note': o.type='sine';o.frequency.setValueAtTime(440,t);o.frequency.exponentialRampToValueAtTime(660,t+.12);g.gain.setValueAtTime(.18,t);g.gain.exponentialRampToValueAtTime(.01,t+.3);o.start(t);o.stop(t+.3);break;
    case 'rule_expand': o.type='sine';o.frequency.setValueAtTime(600,t);o.frequency.exponentialRampToValueAtTime(800,t+.1);g.gain.setValueAtTime(.14,t);g.gain.exponentialRampToValueAtTime(.01,t+.2);o.start(t);o.stop(t+.2);break;
    case 'equip_view': o.type='triangle';o.frequency.setValueAtTime(350,t);o.frequency.exponentialRampToValueAtTime(500,t+.15);g.gain.setValueAtTime(.16,t);g.gain.exponentialRampToValueAtTime(.01,t+.25);o.start(t);o.stop(t+.25);break;
    case 'coach_tip': o.type='sine';o.frequency.setValueAtTime(700,t);g.gain.setValueAtTime(.15,t);g.gain.exponentialRampToValueAtTime(.01,t+.15);o.start(t);o.stop(t+.15);
      var o2=ac.createOscillator(),g2=ac.createGain();o2.connect(g2);g2.connect(ac.destination);o2.type='sine';o2.frequency.setValueAtTime(880,t+.1);g2.gain.setValueAtTime(.12,t+.1);g2.gain.exponentialRampToValueAtTime(.01,t+.25);o2.start(t+.1);o2.stop(t+.25);break;
    case 'challenge_done': o.type='square';o.frequency.setValueAtTime(523,t);o.frequency.setValueAtTime(659,t+.08);o.frequency.setValueAtTime(784,t+.16);o.frequency.setValueAtTime(1047,t+.24);g.gain.setValueAtTime(.12,t);g.gain.exponentialRampToValueAtTime(.01,t+.5);o.start(t);o.stop(t+.5);break;
    case 'season_report': o.type='triangle';o.frequency.setValueAtTime(392,t);o.frequency.exponentialRampToValueAtTime(523,t+.1);o.frequency.exponentialRampToValueAtTime(659,t+.2);o.frequency.exponentialRampToValueAtTime(784,t+.3);g.gain.setValueAtTime(.18,t);g.gain.exponentialRampToValueAtTime(.01,t+.5);o.start(t);o.stop(t+.5);break;
    case 'green_putt': o.type='sine';o.frequency.setValueAtTime(880,t);g.gain.setValueAtTime(.2,t);g.gain.exponentialRampToValueAtTime(.01,t+.08);o.start(t);o.stop(t+.15);break;
    case 'hole_view': o.type='sine';o.frequency.setValueAtTime(440,t);o.frequency.exponentialRampToValueAtTime(550,t+.2);g.gain.setValueAtTime(.15,t);g.gain.exponentialRampToValueAtTime(.01,t+.3);o.start(t);o.stop(t+.3);break;
    case 'bracket_win': o.type='sawtooth';o.frequency.setValueAtTime(523,t);o.frequency.setValueAtTime(659,t+.1);o.frequency.setValueAtTime(784,t+.2);g.gain.setValueAtTime(.1,t);g.gain.exponentialRampToValueAtTime(.01,t+.4);o.start(t);o.stop(t+.4);break;
    case 'hcp_update': o.type='sine';o.frequency.setValueAtTime(600,t);o.frequency.exponentialRampToValueAtTime(750,t+.15);g.gain.setValueAtTime(.14,t);g.gain.exponentialRampToValueAtTime(.01,t+.25);o.start(t);o.stop(t+.25);break;
    case 'swing_save': o.type='triangle';o.frequency.setValueAtTime(500,t);o.frequency.exponentialRampToValueAtTime(700,t+.1);g.gain.setValueAtTime(.16,t);g.gain.exponentialRampToValueAtTime(.01,t+.2);o.start(t);o.stop(t+.2);break;
  }
}

// --- Toast v17 ---
function toast17(msg, type){
  var t = document.createElement('div');
  t.style.cssText = 'position:fixed;top:20px;left:50%;transform:translateX(-50%);padding:12px 24px;border-radius:14px;font-size:13px;font-weight:700;z-index:99999;color:#fff;box-shadow:0 6px 20px rgba(0,0,0,.3);animation:v17Rise .3s ease;max-width:90vw;text-align:center;';
  t.style.background = type==='success'?'linear-gradient(135deg,#4caf50,#2e7d32)':type==='error'?'linear-gradient(135deg,#e53935,#c62828)':'linear-gradient(135deg,#1a7a3a,#0f5a28)';
  t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(function(){ t.style.opacity='0'; t.style.transition='opacity .3s'; setTimeout(function(){ t.remove(); },300); },2500);
}

// --- Storage helpers ---
function sg17get(k,d){ try{var v=localStorage.getItem('sg17_'+k); return v?JSON.parse(v):d;}catch(e){return d;} }
function sg17set(k,v){ try{localStorage.setItem('sg17_'+k,JSON.stringify(v));}catch(e){} }

// =========================================================
// SECTION 1: TOURNAMENT MANAGER (토너먼트 매니저)
// =========================================================
var tournamentData = sg17get('tournaments', []);

function renderTournament(){
  var ov = document.getElementById('v17TournamentOverlay');
  if(!ov) return;
  var activeTourney = sg17get('active_tourney', null);
  var history = sg17get('tourney_history', []);

  var html = '<div class="v17-modal"><div class="v17-hdr"><h2><span class="v17i">&#x1F3C6;</span> Tournament Manager</h2><button class="v17-x" onclick="document.getElementById(\'v17TournamentOverlay\').classList.remove(\'active\')">&times;</button></div>';

  html += '<div class="v17-tabs" id="v17TourneyTabs">';
  var ttab = sg17get('tourney_tab','create');
  ['create','active','history'].forEach(function(t){
    var labels = {create:'&#x2795; 새 토너먼트',active:'&#x1F3AF; 진행중',history:'&#x1F4DC; 기록'};
    html += '<div class="v17-tab'+(ttab===t?' active':'')+'" data-tab="'+t+'">'+labels[t]+'</div>';
  });
  html += '</div>';

  if(ttab==='create'){
    html += '<div class="v17-card"><h4>&#x1F3CC;&#xFE0F; 토너먼트 생성</h4>';
    html += '<div style="margin-bottom:12px"><label style="font-size:11px;font-weight:600;color:var(--text-muted)">토너먼트 이름</label><input class="v17-input" id="v17TName" placeholder="예: 주말 친구 토너먼트" value=""></div>';
    html += '<div class="v17-grid2" style="margin-bottom:12px"><div><label style="font-size:11px;font-weight:600;color:var(--text-muted)">참가 인원</label><select class="v17-select" id="v17TPlayers" style="width:100%"><option value="4">4명</option><option value="8" selected>8명</option><option value="16">16명</option></select></div>';
    html += '<div><label style="font-size:11px;font-weight:600;color:var(--text-muted)">형식</label><select class="v17-select" id="v17TFormat" style="width:100%"><option value="single">싱글 엘리미네이션</option><option value="stroke">스트로크 플레이</option></select></div></div>';
    html += '<div style="margin-bottom:14px"><label style="font-size:11px;font-weight:600;color:var(--text-muted)">참가자 (쉼표로 구분)</label><textarea class="v17-textarea" id="v17TNames" placeholder="홍길동, 김철수, 이영희, 박민수..."></textarea></div>';
    html += '<button class="v17-btn v17-btn-primary" onclick="createTournament()">&#x1F3C6; 토너먼트 시작</button>';
    html += '</div>';
  } else if(ttab==='active'){
    if(activeTourney){
      html += '<div class="v17-card"><h4>'+activeTourney.name+'</h4>';
      html += '<p>'+activeTourney.format+' | '+activeTourney.players.length+'명 참가</p>';
      html += '<div class="v17-divider"></div>';
      var round = activeTourney.currentRound || 0;
      var roundNames = ['1라운드','준결승','결승','챔피언'];
      html += '<div style="margin-bottom:12px"><span class="v17-badge" style="background:var(--primary);color:#fff">'+( roundNames[round]||('라운드 '+(round+1)) )+'</span></div>';
      html += '<div class="v17-bracket">';
      var matches = activeTourney.rounds[round] || [];
      matches.forEach(function(m,i){
        html += '<div class="v17-bracket-match '+(m.winner===0?'won':m.winner===1?'lost':'')+'" onclick="scoreTourneyMatch('+round+','+i+')">';
        html += '<div class="v17-bracket-name">'+m.p1+'</div>';
        html += '<div class="v17-bracket-score">'+(m.s1!==undefined?m.s1:'-')+'</div>';
        html += '<div style="margin:0 8px;font-size:11px;color:var(--text-muted)">vs</div>';
        html += '<div class="v17-bracket-score">'+(m.s2!==undefined?m.s2:'-')+'</div>';
        html += '<div class="v17-bracket-name">'+m.p2+'</div>';
        html += '</div>';
      });
      html += '</div>';
      var allScored = matches.every(function(m){ return m.winner!==undefined; });
      if(allScored && activeTourney.rounds.length > round+1){
        html += '<div style="margin-top:14px;text-align:center"><button class="v17-btn v17-btn-primary" onclick="advanceTourneyRound()">&#x27A1;&#xFE0F; 다음 라운드</button></div>';
      } else if(allScored && matches.length===1){
        html += '<div style="margin-top:14px;text-align:center;padding:20px;background:linear-gradient(135deg,#ffd700,#ffb300);border-radius:16px"><div style="font-size:28px">&#x1F3C6;</div><div style="font-size:18px;font-weight:900;margin-top:8px">챔피언: '+(matches[0].winner===0?matches[0].p1:matches[0].p2)+'</div></div>';
      }
      html += '</div>';
    } else {
      html += '<div class="v17-card" style="text-align:center;padding:40px"><p style="font-size:14px">진행 중인 토너먼트가 없습니다</p><p style="font-size:12px;color:var(--text-muted);margin-top:6px">새 토너먼트를 생성해보세요!</p></div>';
    }
  } else {
    if(history.length===0){
      html += '<div class="v17-card" style="text-align:center;padding:40px"><p>토너먼트 기록이 없습니다</p></div>';
    }
    history.slice().reverse().forEach(function(h){
      html += '<div class="v17-card"><h4>&#x1F3C6; '+h.name+'</h4><p>'+h.date+' | '+h.players+'명 참가 | 챔피언: <strong>'+h.champion+'</strong></p></div>';
    });
  }

  html += '</div>';
  ov.innerHTML = html;
  ov.classList.add('active');

  ov.querySelectorAll('.v17-tab').forEach(function(tab){
    tab.addEventListener('click', function(){ sg17set('tourney_tab', tab.dataset.tab); sfx17('tournament'); renderTournament(); });
  });
}

window.createTournament = function(){
  var name = document.getElementById('v17TName').value.trim() || '토너먼트 '+(new Date()).toLocaleDateString('ko');
  var count = parseInt(document.getElementById('v17TPlayers').value);
  var format = document.getElementById('v17TFormat').value;
  var namesStr = document.getElementById('v17TNames').value.trim();
  var names = namesStr ? namesStr.split(',').map(function(n){return n.trim();}).filter(Boolean) : [];

  while(names.length < count) names.push('Player '+(names.length+1));
  names = names.slice(0, count);

  // Shuffle
  for(var i=names.length-1;i>0;i--){ var j=Math.floor(Math.random()*(i+1)); var tmp=names[i]; names[i]=names[j]; names[j]=tmp; }

  var tourney = { name:name, format:format==='single'?'싱글 엘리미네이션':'스트로크 플레이', players:names, currentRound:0, rounds:[] };

  // Generate bracket
  var roundCount = Math.log2(count);
  var currentPlayers = names.slice();
  for(var r=0; r<roundCount; r++){
    var matches = [];
    for(var m=0; m<currentPlayers.length; m+=2){
      matches.push({ p1:currentPlayers[m], p2:currentPlayers[m+1]||'BYE', s1:undefined, s2:undefined, winner:undefined });
    }
    tourney.rounds.push(matches);
    currentPlayers = new Array(matches.length).fill('TBD');
  }

  sg17set('active_tourney', tourney);
  sg17set('tourney_tab', 'active');
  sfx17('tournament');
  toast17('토너먼트가 생성되었습니다!', 'success');
  renderTournament();
  checkV17Achievements('tourney_created');
};

window.scoreTourneyMatch = function(round, idx){
  var tourney = sg17get('active_tourney', null);
  if(!tourney || tourney.currentRound !== round) return;
  var match = tourney.rounds[round][idx];
  if(match.winner !== undefined) return;

  var s1 = prompt(match.p1 + ' 스코어 (홀 수 또는 점수):', '');
  if(s1===null) return;
  var s2 = prompt(match.p2 + ' 스코어:', '');
  if(s2===null) return;

  match.s1 = parseInt(s1)||0;
  match.s2 = parseInt(s2)||0;
  match.winner = match.s1 >= match.s2 ? 0 : 1;

  sg17set('active_tourney', tourney);
  sfx17('bracket_win');
  renderTournament();
};

window.advanceTourneyRound = function(){
  var tourney = sg17get('active_tourney', null);
  if(!tourney) return;
  var current = tourney.rounds[tourney.currentRound];
  var winners = current.map(function(m){ return m.winner===0?m.p1:m.p2; });

  tourney.currentRound++;
  if(tourney.currentRound < tourney.rounds.length){
    var nextMatches = tourney.rounds[tourney.currentRound];
    for(var i=0;i<nextMatches.length;i++){
      nextMatches[i].p1 = winners[i*2] || 'BYE';
      nextMatches[i].p2 = winners[i*2+1] || 'BYE';
    }
  }

  if(tourney.currentRound >= tourney.rounds.length-1 && tourney.rounds[tourney.rounds.length-1][0].winner!==undefined){
    var finalMatch = tourney.rounds[tourney.rounds.length-1][0];
    var champion = finalMatch.winner===0 ? finalMatch.p1 : finalMatch.p2;
    var hist = sg17get('tourney_history', []);
    hist.push({ name:tourney.name, date:new Date().toLocaleDateString('ko'), players:tourney.players.length, champion:champion });
    sg17set('tourney_history', hist);
    sg17set('active_tourney', null);
    checkV17Achievements('tourney_champion');
  } else {
    sg17set('active_tourney', tourney);
  }
  sfx17('tournament');
  renderTournament();
};

// =========================================================
// SECTION 2: SWING ANALYSIS NOTEBOOK (스윙 분석 노트북)
// =========================================================
function renderSwingNotebook(){
  var ov = document.getElementById('v17SwingOverlay');
  if(!ov) return;
  var notes = sg17get('swing_notes', []);
  var stab = sg17get('swing_tab','add');

  var html = '<div class="v17-modal"><div class="v17-hdr"><h2><span class="v17i">&#x1F4DD;</span> Swing Analysis Notebook</h2><button class="v17-x" onclick="document.getElementById(\'v17SwingOverlay\').classList.remove(\'active\')">&times;</button></div>';

  html += '<div class="v17-tabs">';
  [{k:'add',l:'&#x2795; 새 기록'},{k:'list',l:'&#x1F4CB; 기록 목록'},{k:'stats',l:'&#x1F4CA; 분석'}].forEach(function(t){
    html += '<div class="v17-tab'+(stab===t.k?' active':'')+'" data-tab="'+t.k+'">'+t.l+'</div>';
  });
  html += '</div>';

  if(stab==='add'){
    var clubs = ['드라이버','3번우드','5번우드','유틸리티','4번아이언','5번아이언','6번아이언','7번아이언','8번아이언','9번아이언','PW','AW','SW','LW','퍼터'];
    var checks = [
      {id:'grip',l:'그립 체크',g:'올바른 그립 압력'},
      {id:'stance',l:'스탠스 폭',g:'어깨너비 스탠스'},
      {id:'align',l:'얼라인먼트',g:'타겟 정렬 확인'},
      {id:'takeaway',l:'테이크어웨이',g:'원피스 테이크어웨이'},
      {id:'top',l:'탑 포지션',g:'왼팔 직선 유지'},
      {id:'downswing',l:'다운스윙 시작',g:'하체 리드'},
      {id:'impact',l:'임팩트',g:'핸드퍼스트'},
      {id:'follow',l:'팔로스루',g:'완전한 피니시'},
      {id:'tempo',l:'템포',g:'3:1 백/다운스윙'},
      {id:'weight',l:'체중이동',g:'왼발 체중전환'}
    ];
    html += '<div class="v17-card"><h4>&#x1F3CC;&#xFE0F; 스윙 체크포인트</h4>';
    html += '<div style="margin-bottom:12px"><label style="font-size:11px;font-weight:600;color:var(--text-muted)">클럽 선택</label><select class="v17-select" id="v17SwingClub" style="width:100%">';
    clubs.forEach(function(c){ html += '<option>'+c+'</option>'; });
    html += '</select></div>';
    html += '<div style="margin-bottom:12px">';
    checks.forEach(function(c){
      html += '<label style="display:flex;align-items:center;gap:10px;padding:10px;background:var(--bg);border-radius:10px;margin-bottom:6px;cursor:pointer;font-size:12px"><input type="checkbox" id="v17sc_'+c.id+'" style="width:18px;height:18px;accent-color:var(--primary)"><div><strong>'+c.l+'</strong><div style="font-size:10px;color:var(--text-muted)">'+c.g+'</div></div></label>';
    });
    html += '</div>';
    html += '<div style="margin-bottom:12px"><label style="font-size:11px;font-weight:600;color:var(--text-muted)">메모</label><textarea class="v17-textarea" id="v17SwingMemo" placeholder="스윙 느낌, 비거리, 구질 등..."></textarea></div>';
    html += '<div class="v17-grid2"><div><label style="font-size:11px;font-weight:600;color:var(--text-muted)">비거리 (m)</label><input class="v17-input" type="number" id="v17SwingDist" placeholder="200"></div>';
    html += '<div><label style="font-size:11px;font-weight:600;color:var(--text-muted)">구질</label><select class="v17-select" id="v17SwingShape" style="width:100%"><option>스트레이트</option><option>드로우</option><option>페이드</option><option>훅</option><option>슬라이스</option><option>풀</option><option>푸시</option></select></div></div>';
    html += '<div style="margin-top:14px"><button class="v17-btn v17-btn-primary" onclick="saveSwingNote()">&#x1F4BE; 저장</button></div>';
    html += '</div>';
  } else if(stab==='list'){
    if(notes.length===0){
      html += '<div class="v17-card" style="text-align:center;padding:40px"><p>기록이 없습니다</p></div>';
    }
    notes.slice().reverse().forEach(function(n, idx){
      html += '<div class="v17-swing-item">';
      html += '<div class="v17-swing-date">'+n.date+'</div>';
      html += '<div class="v17-swing-club">'+n.club+' | '+n.distance+'m | '+n.shape+'</div>';
      html += '<div class="v17-swing-checks">';
      n.checks.forEach(function(c){ html += '<span class="v17-swing-check good">&#x2714; '+c+'</span>'; });
      n.fails.forEach(function(c){ html += '<span class="v17-swing-check bad">&#x2716; '+c+'</span>'; });
      html += '</div>';
      if(n.memo) html += '<p style="font-size:11px;color:var(--text-muted);margin-top:8px">'+n.memo+'</p>';
      html += '</div>';
    });
  } else {
    var total = notes.length;
    var checkNames = ['그립','스탠스','얼라인먼트','테이크어웨이','탑 포지션','다운스윙','임팩트','팔로스루','템포','체중이동'];
    var checkCounts = {};
    checkNames.forEach(function(c){ checkCounts[c]=0; });
    notes.forEach(function(n){ n.checks.forEach(function(c){ if(checkCounts[c]!==undefined) checkCounts[c]++; }); });

    html += '<div class="v17-card"><h4>&#x1F4CA; 스윙 체크포인트 성공률</h4>';
    if(total>0){
      checkNames.forEach(function(c){
        var pct = Math.round((checkCounts[c]/total)*100);
        var color = pct>=80?'#4caf50':pct>=50?'#ff9800':'#e53935';
        html += '<div class="v17-stat-row"><span style="font-size:13px;font-weight:600">'+c+'</span><div style="display:flex;align-items:center;gap:8px"><div class="v17-progress" style="width:120px"><div class="v17-progress-fill" style="width:'+pct+'%;background:'+color+'"></div></div><span style="font-size:12px;font-weight:700;color:'+color+'">'+pct+'%</span></div></div>';
      });
    } else {
      html += '<p style="text-align:center;padding:20px">데이터가 충분하지 않습니다</p>';
    }
    html += '</div>';

    // Shape distribution
    if(total>0){
      var shapes = {};
      notes.forEach(function(n){ shapes[n.shape]=(shapes[n.shape]||0)+1; });
      html += '<div class="v17-card"><h4>&#x1F3AF; 구질 분포</h4>';
      Object.keys(shapes).forEach(function(s){
        var pct = Math.round((shapes[s]/total)*100);
        html += '<div class="v17-stat-row"><span style="font-size:13px;font-weight:600">'+s+'</span><span style="font-size:13px;font-weight:700;color:var(--primary)">'+shapes[s]+'회 ('+pct+'%)</span></div>';
      });
      html += '</div>';
    }
  }

  html += '</div>';
  ov.innerHTML = html;
  ov.classList.add('active');

  ov.querySelectorAll('.v17-tab').forEach(function(tab){
    tab.addEventListener('click', function(){ sg17set('swing_tab', tab.dataset.tab); sfx17('swing_note'); renderSwingNotebook(); });
  });
}

window.saveSwingNote = function(){
  var club = document.getElementById('v17SwingClub').value;
  var memo = document.getElementById('v17SwingMemo').value.trim();
  var dist = document.getElementById('v17SwingDist').value || '0';
  var shape = document.getElementById('v17SwingShape').value;
  var checkIds = ['grip','stance','align','takeaway','top','downswing','impact','follow','tempo','weight'];
  var checkLabels = ['그립','스탠스','얼라인먼트','테이크어웨이','탑 포지션','다운스윙','임팩트','팔로스루','템포','체중이동'];
  var checks = [], fails = [];
  checkIds.forEach(function(id, i){
    var el = document.getElementById('v17sc_'+id);
    if(el && el.checked) checks.push(checkLabels[i]);
    else fails.push(checkLabels[i]);
  });

  var note = { date:new Date().toLocaleDateString('ko')+' '+new Date().toLocaleTimeString('ko',{hour:'2-digit',minute:'2-digit'}), club:club, checks:checks, fails:fails, memo:memo, distance:dist, shape:shape };
  var notes = sg17get('swing_notes', []);
  notes.push(note);
  sg17set('swing_notes', notes);
  sfx17('swing_save');
  toast17('스윙 기록이 저장되었습니다!', 'success');
  sg17set('swing_tab','list');
  renderSwingNotebook();
  checkV17Achievements('swing_note_saved');
};

// =========================================================
// SECTION 3: GOLF RULES ENCYCLOPEDIA (골프 규칙 백과사전)
// =========================================================
var GOLF_RULES = [
  {num:'1',title:'게임, 플레이어의 행동, 규칙',detail:'골프는 정직과 자기 심판의 정신에 기초합니다. 플레이어는 규칙을 준수하고, 다른 플레이어에 대한 예의를 지켜야 합니다.'},
  {num:'2',title:'코스',detail:'코스는 티잉 구역, 일반 구역, 벙커, 페널티 구역, 퍼팅 그린의 5가지 구역으로 구성됩니다.'},
  {num:'3',title:'경기',detail:'매치 플레이와 스트로크 플레이 두 가지 형식이 있습니다. 매치 플레이는 각 홀의 승패로, 스트로크 플레이는 총 타수로 결정됩니다.'},
  {num:'4',title:'플레이어의 장비',detail:'규칙에 적합한 클럽 최대 14개를 지참할 수 있습니다. 거리측정기는 위원회가 허용한 경우에만 사용 가능합니다.'},
  {num:'5',title:'라운드 플레이',detail:'플레이어는 18홀을 연속으로 플레이합니다. 부당한 지연 없이 적절한 속도로 플레이해야 합니다.'},
  {num:'6',title:'홀 플레이',detail:'티잉 구역에서 첫 스트로크를 하고, 볼이 퍼팅 그린의 홀에 들어가면 그 홀이 종료됩니다.'},
  {num:'7',title:'볼 플레이',detail:'볼은 있는 그대로(as it lies) 플레이하는 것이 기본 원칙입니다. 개선할 수 있는 경우와 없는 경우가 명시되어 있습니다.'},
  {num:'8',title:'어드바이스와 플레이 선',detail:'어드바이스는 같은 팀의 파트너와 캐디에게만 줄 수 있습니다. 퍼팅 그린에서는 플레이 선을 터치하여 가리킬 수 있습니다.'},
  {num:'9',title:'볼 플레이된 상태, 정지, 움직임',detail:'볼이 정지한 후 움직이면 원래 위치에 리플레이스해야 합니다. 자연의 힘에 의한 움직임은 있는 그대로 플레이합니다.'},
  {num:'10',title:'스트로크 준비와 행하기',detail:'공정하게 볼을 쳐야 하며, 밀거나 긁는 행위는 금지됩니다. 스트로크하는 동안 앵커링을 해서는 안 됩니다.'},
  {num:'11',title:'움직이는 볼이 우연히 사람이나 물체에 맞음',detail:'움직이는 볼이 우연히 사람이나 물체에 맞았을 때 대부분 페널티 없이 볼이 놓인 곳에서 플레이합니다.'},
  {num:'12',title:'벙커',detail:'벙커에서 스트로크 전에 모래를 만지면 안 됩니다. 언플레이어블 선언 시 2벌타로 벙커 밖에 드롭할 수 있습니다.'},
  {num:'13',title:'퍼팅 그린',detail:'그린 위의 볼은 마크 후 집어올려 닦을 수 있습니다. 볼 마크(피치마크), 이전 홀컵 자국은 수리할 수 있습니다.'},
  {num:'14',title:'페널티 구역에서의 절차',detail:'노란 페널티 구역: 1벌타로 마지막 스트로크한 곳 또는 후방 드롭. 빨간 페널티 구역: 추가로 측면 드롭 가능.'},
  {num:'15',title:'페널티 없는 구제',detail:'비정상 코스 상태(GUR, 카트도로, 수리지), 박힌 볼, 방해하는 움직일 수 있는 장해물에서 무벌타 구제를 받을 수 있습니다.'},
  {num:'16',title:'비정상 코스 상태에서의 구제',detail:'일시적으로 고인 물, 수리지(GUR), 동물이 만든 구멍에서 무벌타 드롭이 가능합니다. 가장 가까운 완전한 구제 지점을 결정합니다.'},
  {num:'17',title:'분실구와 아웃 오브 바운즈',detail:'3분 검색 후 분실구 처리. OB/분실구 시 1벌타로 이전 위치에서 재타. 로컬룰 적용 시 2벌타로 페어웨이 드롭 가능.'},
  {num:'18',title:'잠정구',detail:'볼이 분실되거나 OB일 수 있는 경우, 잠정구를 선언하고 칠 수 있습니다. 원구를 발견하면 잠정구는 포기합니다.'},
  {num:'19',title:'언플레이어블 볼',detail:'페널티 구역 외 어디서든 1벌타로 언플레이어블 선언 가능. 3가지 옵션: 이전 위치, 후방 연장선, 2클럽 이내 드롭.'},
  {num:'20',title:'경기 중 규칙 문제 해결',detail:'스트로크 플레이에서 규칙이 불확실한 경우, 두 개의 볼을 플레이할 수 있습니다. 위원회에 사실 관계를 보고해야 합니다.'}
];

function renderRulesEncyclopedia(){
  var ov = document.getElementById('v17RulesOverlay');
  if(!ov) return;
  var search = '';
  var readRules = sg17get('read_rules', []);

  var html = '<div class="v17-modal"><div class="v17-hdr"><h2><span class="v17i">&#x1F4D6;</span> Golf Rules Encyclopedia</h2><button class="v17-x" onclick="document.getElementById(\'v17RulesOverlay\').classList.remove(\'active\')">&times;</button></div>';

  html += '<div style="margin-bottom:16px"><input class="v17-input" id="v17RuleSearch" placeholder="&#x1F50D; 규칙 검색 (예: 벙커, OB, 드롭...)" oninput="filterRules(this.value)"></div>';
  html += '<div style="margin-bottom:12px"><span class="v17-badge" style="background:var(--primary-light);color:var(--primary)">&#x1F4D6; '+readRules.length+'/'+GOLF_RULES.length+' 읽음</span></div>';

  html += '<div id="v17RulesList">';
  GOLF_RULES.forEach(function(r, i){
    var isRead = readRules.indexOf(r.num) !== -1;
    html += '<div class="v17-rule-card" data-idx="'+i+'" onclick="toggleRule('+i+')">';
    html += '<div class="v17-rule-num">Rule '+r.num+(isRead?' &#x2705;':'')+'</div>';
    html += '<div class="v17-rule-title">'+r.title+'</div>';
    html += '<div class="v17-rule-detail">'+r.detail+'</div>';
    html += '</div>';
  });
  html += '</div>';

  html += '</div>';
  ov.innerHTML = html;
  ov.classList.add('active');
}

window.toggleRule = function(idx){
  var cards = document.querySelectorAll('.v17-rule-card');
  var card = cards[idx];
  if(!card) return;
  card.classList.toggle('expanded');
  sfx17('rule_expand');

  var rule = GOLF_RULES[idx];
  var readRules = sg17get('read_rules', []);
  if(readRules.indexOf(rule.num)===-1){
    readRules.push(rule.num);
    sg17set('read_rules', readRules);
    if(readRules.length >= 20) checkV17Achievements('rules_master');
    if(readRules.length >= 10) checkV17Achievements('rules_10');
  }
};

window.filterRules = function(q){
  var list = document.getElementById('v17RulesList');
  if(!list) return;
  var cards = list.querySelectorAll('.v17-rule-card');
  q = q.toLowerCase();
  cards.forEach(function(card, i){
    var rule = GOLF_RULES[i];
    var match = !q || rule.title.toLowerCase().includes(q) || rule.detail.toLowerCase().includes(q) || rule.num.includes(q);
    card.style.display = match ? '' : 'none';
  });
};

// =========================================================
// SECTION 4: EQUIPMENT ENCYCLOPEDIA (골프 장비 백과사전)
// =========================================================
var GOLF_EQUIPMENT = [
  {name:'드라이버',icon:'&#x1F3CC;',cat:'우드',desc:'티샷에 사용하는 가장 긴 클럽. 로프트 9-12도. 티 위에 올려 칩니다. 비거리 200-280m.',tags:['티샷','장타','카본샤프트']},
  {name:'3번 우드',icon:'&#x1F332;',cat:'우드',desc:'페어웨이에서 장거리 세컨드샷용. 로프트 15도. 지면에서 직접 치거나 티샷에도 활용.',tags:['페어웨이','장거리','다용도']},
  {name:'5번 우드',icon:'&#x1F333;',cat:'우드',desc:'3번 우드보다 쉬운 롱 아이언 대체. 로프트 18-19도. 러프에서도 탈출 가능.',tags:['러프탈출','롱샷','초보자추천']},
  {name:'유틸리티/하이브리드',icon:'&#x2699;',cat:'하이브리드',desc:'롱 아이언 대체 클럽. 우드의 관용성과 아이언의 정확성 결합. 다양한 라이에서 활용.',tags:['다용도','관용성','롱아이언대체']},
  {name:'아이언 (5-9)',icon:'&#x26F3;',cat:'아이언',desc:'가장 많이 사용하는 클럽. 번호가 클수록 로프트 증가, 비거리 감소, 정확성 증가. 5번(180m)~9번(130m).',tags:['어프로치','정확성','기본클럽']},
  {name:'피칭 웨지 (PW)',icon:'&#x1F3AF;',cat:'웨지',desc:'풀스윙 110-120m. 그린 주변 어프로치의 기본 클럽. 로프트 44-48도.',tags:['어프로치','그린공략','기본웨지']},
  {name:'갭 웨지 (AW/GW)',icon:'&#x1F4A8;',cat:'웨지',desc:'PW와 SW 사이 간격을 메우는 클럽. 로프트 50-52도. 80-100m 풀스윙.',tags:['갭채움','어프로치','컨트롤']},
  {name:'샌드 웨지 (SW)',icon:'&#x1F3D6;',cat:'웨지',desc:'벙커 탈출 전문 클럽. 바운스가 높아 모래에서 잘 빠져나옵니다. 로프트 54-56도.',tags:['벙커','그린주변','바운스']},
  {name:'로브 웨지 (LW)',icon:'&#x2B50;',cat:'웨지',desc:'높이 띄워야 할 때 사용. 로프트 58-64도. 짧은 거리의 정밀한 어프로치샷.',tags:['높은탄도','플롭샷','정밀']},
  {name:'퍼터',icon:'&#x1F3F3;',cat:'퍼터',desc:'그린 위에서 볼을 굴리는 클럽. 블레이드, 말렛 등 다양한 헤드 형태. 스트로크의 40% 이상 차지.',tags:['그린','스코어핵심','스트로크']},
  {name:'골프볼',icon:'&#x26BE;',cat:'용품',desc:'2피스(비거리)~4피스(스핀). 컴프레션 70(소프트)~100(하드). 딤플 수 300-500개가 양력을 만듭니다.',tags:['소모품','디스턴스','스핀']},
  {name:'골프장갑',icon:'&#x1F9E4;',cat:'용품',desc:'비우세손에 착용. 그립력 향상과 물집 방지. 양피(감촉)와 합성피혁(내구성) 소재.',tags:['그립','보호','필수용품']},
  {name:'거리측정기',icon:'&#x1F4CF;',cat:'전자기기',desc:'레이저 또는 GPS 방식. 핀까지 정확한 거리 측정. 슬로프 보정 기능(비공인).',tags:['거리측정','GPS','레이저']},
  {name:'골프백',icon:'&#x1F392;',cat:'가방',desc:'스탠드백(경량), 카트백(수납), 캐디백(프로용). 14클럽+우산+음료+여분볼 수납.',tags:['수납','휴대','보호']},
  {name:'골프화',icon:'&#x1F45F;',cat:'의류',desc:'스파이크(금속/소프트)와 스파이크리스. 방수 기능 중요. 발의 안정성이 스윙에 직접 영향.',tags:['안정성','방수','스파이크']}
];

function renderEquipment(){
  var ov = document.getElementById('v17EquipOverlay');
  if(!ov) return;
  var etab = sg17get('equip_tab','all');
  var cats = ['all','우드','하이브리드','아이언','웨지','퍼터','용품','전자기기','가방','의류'];

  var html = '<div class="v17-modal"><div class="v17-hdr"><h2><span class="v17i">&#x1F3CC;&#xFE0F;</span> Golf Equipment Encyclopedia</h2><button class="v17-x" onclick="document.getElementById(\'v17EquipOverlay\').classList.remove(\'active\')">&times;</button></div>';

  html += '<div class="v17-tabs">';
  cats.forEach(function(c){
    var label = c==='all'?'&#x1F4CB; 전체':c;
    html += '<div class="v17-tab'+(etab===c?' active':'')+'" data-tab="'+c+'">'+label+'</div>';
  });
  html += '</div>';

  var filtered = GOLF_EQUIPMENT.filter(function(e){ return etab==='all'||e.cat===etab; });
  html += '<div style="margin-bottom:12px"><span class="v17-badge" style="background:var(--primary-light);color:var(--primary)">'+filtered.length+'종 장비</span></div>';

  filtered.forEach(function(e){
    var bgColors = {우드:'#e8f5e9',하이브리드:'#e3f2fd',아이언:'#f3e5f5',웨지:'#fff3e0',퍼터:'#e0f7fa',용품:'#fce4ec',전자기기:'#e8eaf6',가방:'#f1f8e9',의류:'#fff8e1'};
    var darkBgColors = {우드:'#1a3a25',하이브리드:'#1a2a3a',아이언:'#2a1a3a',웨지:'#3a2a1a',퍼터:'#1a3a3a',용품:'#3a1a2a',전자기기:'#1a1a3a',가방:'#1a3a1a',의류:'#3a3a1a'};
    html += '<div class="v17-equip-card">';
    html += '<div class="v17-equip-icon" style="background:'+(document.documentElement.dataset.theme==='dark'?(darkBgColors[e.cat]||'#2a2a2a'):(bgColors[e.cat]||'#f5f5f5'))+'">'+e.icon+'</div>';
    html += '<div class="v17-equip-info"><div class="v17-equip-name">'+e.name+'</div><div class="v17-equip-desc">'+e.desc+'</div>';
    html += '<div class="v17-equip-tags">';
    e.tags.forEach(function(t){ html += '<span class="v17-equip-tag">'+t+'</span>'; });
    html += '</div></div></div>';
  });

  html += '</div>';
  ov.innerHTML = html;
  ov.classList.add('active');
  sfx17('equip_view');

  ov.querySelectorAll('.v17-tab').forEach(function(tab){
    tab.addEventListener('click', function(){ sg17set('equip_tab', tab.dataset.tab); renderEquipment(); });
  });
  checkV17Achievements('equip_viewed');
}

// =========================================================
// SECTION 5: AI ROUND COACH (AI 라운드 코치)
// =========================================================
var COACH_TIPS = {
  tee: [
    {title:'드라이버 티 높이',tip:'볼의 절반이 드라이버 크라운 위로 올라오게 티업하세요. 어퍼블로로 최대 비거리를 얻을 수 있습니다.'},
    {title:'바람 방향 확인',tip:'티잉 구역에서 풀이나 나뭇잎을 던져 바람 방향을 확인하세요. 맞바람에는 낮은 펀치샷을 고려하세요.'},
    {title:'페어웨이 넓은 곳 공략',tip:'OB나 해저드가 있는 쪽의 반대편으로 에이밍하세요. 미스샷도 안전한 곳에 떨어지도록 전략을 세우세요.'},
    {title:'긴장 해소 루틴',tip:'첫 티샷 전 심호흡 3회와 프리샷 루틴을 반드시 실행하세요. 75%의 힘으로 스윙하면 방향성이 좋아집니다.'}
  ],
  approach: [
    {title:'클럽 선택 원칙',tip:'핀까지 거리에서 +10m 클럽을 선택하세요. 대부분의 아마추어는 클럽 선택을 짧게 합니다.'},
    {title:'그린 경사 읽기',tip:'어프로치 전에 그린의 높낮이를 파악하세요. 오르막이면 한 클럽 더, 내리막이면 한 클럽 줄이세요.'},
    {title:'핀 위치 전략',tip:'핀이 그린 앞쪽이면 정확한 거리 컨트롤이 필요합니다. 뒤쪽이면 핀보다 긴 클럽으로 과감하게 공략하세요.'},
    {title:'미스 방향 관리',tip:'벙커나 워터 해저드 반대편으로 미스 방향을 설정하세요. 큰 미스도 보기 이하로 수습할 수 있습니다.'}
  ],
  green: [
    {title:'퍼팅 루틴 3단계',tip:'1) 볼 뒤에서 라인 읽기 2) 거리감 연습 스트로크 2회 3) 셋업 후 3초 이내 스트로크. 일관된 루틴이 핵심입니다.'},
    {title:'그린 스피드 확인',tip:'첫 홀의 연습 퍼팅으로 그린 스피드를 파악하세요. 빠른 그린에서는 볼 옆에 목표점을 두고 거리를 줄이세요.'},
    {title:'오르막 vs 내리막',tip:'오르막 퍼트는 과감하게 홀 30cm 뒤를 목표로 치세요. 내리막은 볼에 바로 맞춘다는 느낌으로 가볍게 터치하세요.'},
    {title:'브레이크 읽기',tip:'볼과 홀 사이의 가장 높은 지점(에이펙스)을 찾으세요. 에이펙스를 겨냥해 직선으로 퍼팅하면 라인이 맞습니다.'}
  ],
  bunker: [
    {title:'벙커샷 기본',tip:'오픈 스탠스 + 오픈 페이스로 볼 2-3cm 뒤 모래를 치세요. 볼이 아닌 모래의 폭발력으로 볼을 날립니다.'},
    {title:'깊은 벙커 탈출',tip:'페이스를 크게 열고 수직에 가깝게 스윙하세요. 풀 스윙의 80% 힘으로 충분합니다. 피니시를 높게 가져가세요.'},
    {title:'페어웨이 벙커',tip:'한 클럽 긴 것을 잡고, 볼 먼저 깨끗하게 맞추세요. 하체 움직임을 최소화하고 스탠스를 약간 넓게 잡으세요.'}
  ],
  mental: [
    {title:'더블보기 후 전략',tip:'다음 홀에서 무리하지 마세요. 보기 플레이를 목표로 안전하게 갑니다. 연속 실수를 끊는 것이 가장 중요합니다.'},
    {title:'10초 규칙',tip:'나쁜 샷 후 10초만 감정을 느끼고, 그 이후에는 다음 샷에 집중하세요. 프로들도 같은 방법을 사용합니다.'},
    {title:'현재 샷에 집중',tip:'스코어를 계산하지 마세요. 눈앞의 한 샷에만 집중하세요. "이 샷을 어떻게 칠까"만 생각하세요.'},
    {title:'루틴의 힘',tip:'매 샷 동일한 프리샷 루틴을 실행하세요. 루틴은 불안감을 줄이고 자동 실행 모드를 만들어줍니다.'}
  ]
};

function renderCoach(){
  var ov = document.getElementById('v17CoachOverlay');
  if(!ov) return;
  var ctab = sg17get('coach_tab','tee');

  var html = '<div class="v17-modal"><div class="v17-hdr"><h2><span class="v17i">&#x1F9D1;&#x200D;&#x1F3EB;</span> AI Round Coach</h2><button class="v17-x" onclick="document.getElementById(\'v17CoachOverlay\').classList.remove(\'active\')">&times;</button></div>';

  html += '<div class="v17-tabs">';
  [{k:'tee',l:'&#x26F3; 티샷'},{k:'approach',l:'&#x1F3AF; 어프로치'},{k:'green',l:'&#x1F7E2; 그린'},{k:'bunker',l:'&#x1F3D6; 벙커'},{k:'mental',l:'&#x1F9E0; 멘탈'}].forEach(function(t){
    html += '<div class="v17-tab'+(ctab===t.k?' active':'')+'" data-tab="'+t.k+'">'+t.l+'</div>';
  });
  html += '</div>';

  var tips = COACH_TIPS[ctab] || [];
  tips.forEach(function(t){
    html += '<div class="v17-coach-msg"><h5>&#x1F4A1; '+t.title+'</h5><p>'+t.tip+'</p></div>';
  });

  // AI personalized suggestion
  var swingNotes = sg17get('swing_notes', []);
  if(swingNotes.length >= 3){
    var recentFails = {};
    swingNotes.slice(-5).forEach(function(n){ n.fails.forEach(function(f){ recentFails[f]=(recentFails[f]||0)+1; }); });
    var topFail = Object.keys(recentFails).sort(function(a,b){ return recentFails[b]-recentFails[a]; })[0];
    if(topFail){
      var aiAdvice = {
        '그립':'그립 압력을 1-10 중 4정도로 유지하세요. 새가 날아가지 않을 정도로 가볍게 잡는 연습이 필요합니다.',
        '스탠스':'어깨너비로 발을 벌리고 무릎을 살짝 굽히세요. 체중은 발바닥 중앙에 균등하게 분배합니다.',
        '얼라인먼트':'발, 무릎, 엉덩이, 어깨가 모두 타겟 라인과 평행한지 확인하세요. 연습 시 스틱을 놓고 확인하세요.',
        '테이크어웨이':'클럽헤드가 손보다 먼저 움직이지 않도록 원피스 테이크어웨이를 연습하세요.',
        '탑 포지션':'왼팔(오른손잡이)을 구부리지 마세요. 어깨 회전이 90도에 도달하면 자연스럽게 멈추세요.',
        '다운스윙':'하체가 먼저 리드하세요. 왼쪽 무릎을 타겟 방향으로 밀면서 다운스윙을 시작합니다.',
        '임팩트':'핸드퍼스트를 유지하세요. 손이 클럽헤드보다 앞에 있어야 정확한 타격이 됩니다.',
        '팔로스루':'피니시에서 배꼽이 타겟을 향하고, 체중의 90%가 왼발에 있어야 합니다.',
        '템포':'백스윙 3박자, 다운스윙 1박자 리듬을 의식하세요. 메트로놈 앱을 활용해보세요.',
        '체중이동':'백스윙에서 오른발, 다운스윙에서 왼발로 자연스럽게 체중이 이동해야 합니다.'
      };
      html += '<div class="v17-divider"></div>';
      html += '<div class="v17-coach-msg" style="border-left-color:var(--accent)"><h5>&#x1F916; AI 맞춤 코칭 (최근 스윙 분석)</h5>';
      html += '<p><strong>자주 놓치는 포인트: '+topFail+'</strong><br>'+(aiAdvice[topFail]||'이 부분을 집중적으로 연습해보세요.')+'</p></div>';
    }
  }

  html += '</div>';
  ov.innerHTML = html;
  ov.classList.add('active');
  sfx17('coach_tip');

  ov.querySelectorAll('.v17-tab').forEach(function(tab){
    tab.addEventListener('click', function(){ sg17set('coach_tab', tab.dataset.tab); sfx17('coach_tip'); renderCoach(); });
  });
  checkV17Achievements('coach_viewed');
}

// =========================================================
// SECTION 6: GREEN READING SIMULATOR (그린 리딩 시뮬레이터)
// =========================================================
function renderGreenSim(){
  var ov = document.getElementById('v17GreenOverlay');
  if(!ov) return;
  var greenData = sg17get('green_sim', { correct:0, total:0, streak:0, best:0 });

  var slopes = [
    {name:'오르막 직선',arrow:'&#x2B06;',break_:'없음',speed:'느림',tip:'홀 30cm 뒤를 겨냥하세요. 과감하게 치세요.'},
    {name:'내리막 직선',arrow:'&#x2B07;',break_:'없음',speed:'빠름',tip:'가볍게 터치만 하세요. 볼의 무게로 굴러갑니다.'},
    {name:'오른쪽 슬라이스',arrow:'&#x27A1;',break_:'오른쪽',speed:'보통',tip:'홀 왼쪽으로 에이밍하세요. 브레이크만큼 왼쪽.'},
    {name:'왼쪽 훅',arrow:'&#x2B05;',break_:'왼쪽',speed:'보통',tip:'홀 오른쪽으로 에이밍하세요. 브레이크만큼 오른쪽.'},
    {name:'오르막 슬라이스',arrow:'&#x2197;',break_:'오른쪽',speed:'느림',tip:'왼쪽 높게 겨냥. 과감하게 치되 에이밍은 왼쪽.'},
    {name:'내리막 훅',arrow:'&#x2199;',break_:'왼쪽',speed:'빠름',tip:'오른쪽 가볍게. 속도가 빠르면 브레이크가 커집니다.'},
    {name:'이중 브레이크',arrow:'&#x21C4;',break_:'복합',speed:'보통',tip:'전반부와 후반부의 경사가 다릅니다. 2단계로 읽으세요.'},
    {name:'내리막 슬라이스',arrow:'&#x2198;',break_:'오른쪽',speed:'빠름',tip:'왼쪽 멀리 겨냥하고 아주 가볍게 치세요.'}
  ];

  var html = '<div class="v17-modal"><div class="v17-hdr"><h2><span class="v17i">&#x1F7E2;</span> Green Reading Simulator</h2><button class="v17-x" onclick="document.getElementById(\'v17GreenOverlay\').classList.remove(\'active\')">&times;</button></div>';

  html += '<div class="v17-grid3" style="margin-bottom:16px">';
  html += '<div class="v17-card" style="text-align:center;padding:14px"><div style="font-size:22px;font-weight:900;color:var(--primary)">'+(greenData.total>0?Math.round(greenData.correct/greenData.total*100):0)+'%</div><div style="font-size:10px;color:var(--text-muted)">정답률</div></div>';
  html += '<div class="v17-card" style="text-align:center;padding:14px"><div style="font-size:22px;font-weight:900;color:var(--accent)">'+greenData.streak+'</div><div style="font-size:10px;color:var(--text-muted)">연속 정답</div></div>';
  html += '<div class="v17-card" style="text-align:center;padding:14px"><div style="font-size:22px;font-weight:900;color:#ffd700">'+greenData.best+'</div><div style="font-size:10px;color:var(--text-muted)">최고 연속</div></div>';
  html += '</div>';

  // Quiz mode
  var qIdx = Math.floor(Math.random()*slopes.length);
  var q = slopes[qIdx];
  html += '<div class="v17-card"><h4>&#x1F3AF; 이 경사에서 어떻게 퍼팅할까요?</h4>';
  html += '<div style="text-align:center;margin:20px 0">';
  html += '<div style="position:relative;width:200px;height:200px;margin:0 auto;border-radius:50%;background:radial-gradient(ellipse,#66bb6a,#2e7d32);box-shadow:inset 0 0 30px rgba(0,0,0,.3);display:flex;align-items:center;justify-content:center">';
  html += '<div style="font-size:42px">'+q.arrow+'</div>';
  html += '<div style="position:absolute;top:10px;left:50%;transform:translateX(-50%);font-size:10px;color:#fff;font-weight:700;background:rgba(0,0,0,.4);padding:3px 10px;border-radius:8px">'+q.name+'</div>';
  html += '<div style="position:absolute;bottom:15px;width:14px;height:14px;border-radius:50%;background:#fff;border:2px solid #333"></div>';
  html += '</div></div>';

  html += '<div style="margin-bottom:8px;font-size:12px;color:var(--text-muted)">경사: <strong>'+q.name+'</strong> | 속도: <strong>'+q.speed+'</strong></div>';

  var options = ['홀 정면으로 강하게','홀 왼쪽으로 가볍게','홀 오른쪽으로 과감하게','홀 뒤쪽까지 강하게'];
  var correctOpt;
  if(q.break_==='없음' && q.speed==='느림') correctOpt = 3;
  else if(q.break_==='없음' && q.speed==='빠름') correctOpt = 1;
  else if(q.break_==='오른쪽') correctOpt = 1;
  else if(q.break_==='왼쪽') correctOpt = 2;
  else correctOpt = 0;

  html += '<div class="v17-grid2">';
  options.forEach(function(o, i){
    html += '<button class="v17-btn v17-btn-secondary" style="width:100%;justify-content:center" onclick="answerGreen('+i+','+correctOpt+',\''+q.name.replace(/'/g,'\\\'')+'\')" data-correct="'+(i===correctOpt)+'">'+o+'</button>';
  });
  html += '</div>';

  html += '<div id="v17GreenTip" style="display:none;margin-top:14px"></div>';
  html += '</div>';

  // Guide section
  html += '<div class="v17-card"><h4>&#x1F4D6; 경사별 퍼팅 가이드</h4>';
  slopes.forEach(function(s){
    html += '<div class="v17-stat-row"><span style="font-size:13px;font-weight:600">'+s.arrow+' '+s.name+'</span><span style="font-size:11px;color:var(--text-muted)">'+s.tip+'</span></div>';
  });
  html += '</div>';

  html += '</div>';
  ov.innerHTML = html;
  ov.classList.add('active');
}

window.answerGreen = function(selected, correct, qName){
  var greenData = sg17get('green_sim', { correct:0, total:0, streak:0, best:0 });
  greenData.total++;

  var tipDiv = document.getElementById('v17GreenTip');
  if(selected === correct){
    greenData.correct++;
    greenData.streak++;
    if(greenData.streak > greenData.best) greenData.best = greenData.streak;
    sfx17('green_putt');
    if(tipDiv) tipDiv.innerHTML = '<div class="v17-coach-msg" style="border-left-color:#4caf50"><h5>&#x2705; 정답!</h5><p>올바른 그린 리딩입니다. 이 느낌을 기억하세요.</p></div>';
    if(greenData.streak >= 5) checkV17Achievements('green_streak_5');
  } else {
    greenData.streak = 0;
    sfx17('rule_expand');
    if(tipDiv) tipDiv.innerHTML = '<div class="v17-coach-msg" style="border-left-color:#e53935"><h5>&#x274C; 오답</h5><p>'+qName+' 경사를 다시 분석해보세요. 경사 방향과 속도를 종합적으로 고려해야 합니다.</p></div>';
  }
  if(tipDiv) tipDiv.style.display = 'block';
  sg17set('green_sim', greenData);

  if(greenData.total >= 10) checkV17Achievements('green_10_attempts');
  if(greenData.correct >= 20) checkV17Achievements('green_20_correct');
};

// =========================================================
// SECTION 7: HANDICAP HISTORY TRACKER (핸디캡 히스토리)
// =========================================================
function renderHandicapHistory(){
  var ov = document.getElementById('v17HcpOverlay');
  if(!ov) return;
  var records = sg17get('hcp_history', []);
  var htab = sg17get('hcp_tab','record');

  var html = '<div class="v17-modal"><div class="v17-hdr"><h2><span class="v17i">&#x1F4C9;</span> Handicap History</h2><button class="v17-x" onclick="document.getElementById(\'v17HcpOverlay\').classList.remove(\'active\')">&times;</button></div>';

  html += '<div class="v17-tabs">';
  [{k:'record',l:'&#x2795; 기록'},{k:'chart',l:'&#x1F4C8; 추이'},{k:'analysis',l:'&#x1F4CA; 분석'}].forEach(function(t){
    html += '<div class="v17-tab'+(htab===t.k?' active':'')+'" data-tab="'+t.k+'">'+t.l+'</div>';
  });
  html += '</div>';

  if(htab==='record'){
    html += '<div class="v17-card"><h4>&#x1F4DD; 라운드 핸디캡 기록</h4>';
    html += '<div class="v17-grid2" style="margin-bottom:12px">';
    html += '<div><label style="font-size:11px;font-weight:600;color:var(--text-muted)">코스명</label><input class="v17-input" id="v17HcpCourse" placeholder="예: 남서울CC"></div>';
    html += '<div><label style="font-size:11px;font-weight:600;color:var(--text-muted)">스코어</label><input class="v17-input" type="number" id="v17HcpScore" placeholder="85"></div>';
    html += '</div>';
    html += '<div class="v17-grid3" style="margin-bottom:12px">';
    html += '<div><label style="font-size:11px;font-weight:600;color:var(--text-muted)">코스 레이팅</label><input class="v17-input" type="number" step="0.1" id="v17HcpCR" placeholder="72.0"></div>';
    html += '<div><label style="font-size:11px;font-weight:600;color:var(--text-muted)">슬로프 레이팅</label><input class="v17-input" type="number" id="v17HcpSR" placeholder="130"></div>';
    html += '<div><label style="font-size:11px;font-weight:600;color:var(--text-muted)">파</label><input class="v17-input" type="number" id="v17HcpPar" placeholder="72"></div>';
    html += '</div>';
    html += '<button class="v17-btn v17-btn-primary" onclick="saveHcpRecord()">&#x1F4BE; 기록 저장</button>';
    html += '</div>';

    if(records.length > 0){
      var currentHcp = calcHandicapIndex(records);
      html += '<div class="v17-card" style="text-align:center;background:linear-gradient(135deg,var(--primary),#2e9e4f);color:#fff;border-radius:20px;padding:24px">';
      html += '<div style="font-size:12px;opacity:.8">현재 핸디캡 인덱스</div>';
      html += '<div style="font-size:48px;font-weight:900;margin:8px 0">'+currentHcp.toFixed(1)+'</div>';
      html += '<div style="font-size:11px;opacity:.8">최근 '+Math.min(records.length,20)+'라운드 기준</div>';
      html += '</div>';
    }
  } else if(htab==='chart'){
    html += '<div class="v17-card"><h4>&#x1F4C8; 핸디캡 추이</h4>';
    if(records.length < 3){
      html += '<p style="text-align:center;padding:30px">최소 3라운드 이상 기록이 필요합니다</p>';
    } else {
      html += '<canvas id="v17HcpCanvas" width="700" height="220" style="width:100%;height:200px;border-radius:12px"></canvas>';
    }
    html += '</div>';

    // Record list
    html += '<div class="v17-card"><h4>&#x1F4CB; 라운드 기록</h4>';
    records.slice().reverse().forEach(function(r){
      var diff = r.score - r.par;
      var diffStr = diff > 0 ? '+'+diff : diff === 0 ? 'E' : diff.toString();
      var color = diff <= 0 ? '#4caf50' : diff <= 5 ? '#ff9800' : '#e53935';
      html += '<div class="v17-stat-row"><div><div style="font-size:13px;font-weight:600">'+r.course+'</div><div style="font-size:10px;color:var(--text-muted)">'+r.date+'</div></div><div style="text-align:right"><div style="font-size:16px;font-weight:800;color:'+color+'">'+r.score+' ('+diffStr+')</div><div style="font-size:10px;color:var(--text-muted)">Diff: '+r.differential.toFixed(1)+'</div></div></div>';
    });
    html += '</div>';
  } else {
    html += '<div class="v17-card"><h4>&#x1F4CA; 통계 분석</h4>';
    if(records.length > 0){
      var scores = records.map(function(r){return r.score;});
      var avg = scores.reduce(function(a,b){return a+b;},0)/scores.length;
      var best = Math.min.apply(null, scores);
      var worst = Math.max.apply(null, scores);
      var recent5 = records.slice(-5).map(function(r){return r.score;});
      var recent5Avg = recent5.reduce(function(a,b){return a+b;},0)/recent5.length;

      html += '<div class="v17-grid2">';
      html += '<div class="v17-card" style="text-align:center"><div style="font-size:24px;font-weight:900;color:var(--primary)">'+avg.toFixed(1)+'</div><div style="font-size:10px;color:var(--text-muted)">평균 스코어</div></div>';
      html += '<div class="v17-card" style="text-align:center"><div style="font-size:24px;font-weight:900;color:#4caf50">'+best+'</div><div style="font-size:10px;color:var(--text-muted)">베스트 스코어</div></div>';
      html += '<div class="v17-card" style="text-align:center"><div style="font-size:24px;font-weight:900;color:#e53935">'+worst+'</div><div style="font-size:10px;color:var(--text-muted)">워스트</div></div>';
      html += '<div class="v17-card" style="text-align:center"><div style="font-size:24px;font-weight:900;color:var(--accent)">'+recent5Avg.toFixed(1)+'</div><div style="font-size:10px;color:var(--text-muted)">최근 5R 평균</div></div>';
      html += '</div>';

      var improving = recent5Avg < avg;
      html += '<div class="v17-coach-msg" style="border-left-color:'+(improving?'#4caf50':'#ff9800')+'"><h5>'+(improving?'&#x1F4C8; 성장 추세!':'&#x1F4CA; 정체 구간')+'</h5>';
      html += '<p>'+(improving?'최근 5라운드 평균이 전체 평균보다 '+(avg-recent5Avg).toFixed(1)+'타 좋습니다. 좋은 흐름을 이어가세요!':'최근 성적이 평균과 비슷하거나 높습니다. 연습과 코칭에 더 집중해보세요.')+'</p></div>';
    } else {
      html += '<p style="text-align:center;padding:30px">기록이 없습니다</p>';
    }
    html += '</div>';
  }

  html += '</div>';
  ov.innerHTML = html;
  ov.classList.add('active');

  ov.querySelectorAll('.v17-tab').forEach(function(tab){
    tab.addEventListener('click', function(){ sg17set('hcp_tab', tab.dataset.tab); sfx17('hcp_update'); renderHandicapHistory(); });
  });

  // Draw chart
  if(htab==='chart' && records.length >= 3){
    setTimeout(drawHcpChart, 100);
  }
}

function calcHandicapIndex(records){
  var diffs = records.map(function(r){return r.differential;}).slice(-20);
  diffs.sort(function(a,b){return a-b;});
  var count = diffs.length;
  var use = count <= 5 ? 1 : count <= 10 ? Math.ceil(count*0.4) : count <= 20 ? Math.ceil(count*0.4) : 8;
  var best = diffs.slice(0, use);
  var avg = best.reduce(function(a,b){return a+b;},0)/best.length;
  return Math.round(avg*10)/10;
}

function drawHcpChart(){
  var canvas = document.getElementById('v17HcpCanvas');
  if(!canvas) return;
  var ctx = canvas.getContext('2d');
  canvas.width = canvas.offsetWidth * 2;
  canvas.height = 440;
  ctx.scale(2, 2);
  var w = canvas.offsetWidth, h = 220;
  var records = sg17get('hcp_history', []);
  if(records.length < 3) return;

  var diffs = records.map(function(r){return r.differential;});
  var minD = Math.min.apply(null, diffs) - 2;
  var maxD = Math.max.apply(null, diffs) + 2;
  var range = maxD - minD || 1;
  var pad = {t:30,r:20,b:30,l:45};
  var cw = w-pad.l-pad.r, ch = h-pad.t-pad.b;

  // Background
  ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--bg').trim() || '#f5f7f5';
  ctx.fillRect(0, 0, w, h);

  // Grid
  ctx.strokeStyle = '#e0e0e0'; ctx.lineWidth = 0.5;
  for(var g=0;g<=4;g++){
    var gy = pad.t + (ch/4)*g;
    ctx.beginPath(); ctx.moveTo(pad.l, gy); ctx.lineTo(w-pad.r, gy); ctx.stroke();
    var val = maxD - (range/4)*g;
    ctx.fillStyle = '#999'; ctx.font = '10px sans-serif'; ctx.textAlign = 'right';
    ctx.fillText(val.toFixed(1), pad.l-5, gy+4);
  }

  // Line
  ctx.beginPath();
  ctx.strokeStyle = '#1a7a3a'; ctx.lineWidth = 2.5;
  diffs.forEach(function(d, i){
    var x = pad.l + (i/(diffs.length-1))*cw;
    var y = pad.t + ((maxD-d)/range)*ch;
    if(i===0) ctx.moveTo(x,y); else ctx.lineTo(x,y);
  });
  ctx.stroke();

  // Dots
  diffs.forEach(function(d, i){
    var x = pad.l + (i/(diffs.length-1))*cw;
    var y = pad.t + ((maxD-d)/range)*ch;
    ctx.beginPath(); ctx.arc(x,y,4,0,Math.PI*2);
    ctx.fillStyle = '#1a7a3a'; ctx.fill();
    ctx.strokeStyle = '#fff'; ctx.lineWidth = 2; ctx.stroke();
  });

  // Labels
  ctx.fillStyle = '#666'; ctx.font = '10px sans-serif'; ctx.textAlign = 'center';
  var step = Math.max(1, Math.floor(records.length/6));
  records.forEach(function(r, i){
    if(i%step===0 || i===records.length-1){
      var x = pad.l + (i/(records.length-1))*cw;
      ctx.fillText(r.date.slice(5), x, h-8);
    }
  });
}

window.saveHcpRecord = function(){
  var course = document.getElementById('v17HcpCourse').value.trim() || '미입력';
  var score = parseInt(document.getElementById('v17HcpScore').value) || 0;
  var cr = parseFloat(document.getElementById('v17HcpCR').value) || 72.0;
  var sr = parseInt(document.getElementById('v17HcpSR').value) || 113;
  var par = parseInt(document.getElementById('v17HcpPar').value) || 72;

  if(score < 50 || score > 150){ toast17('스코어를 확인해주세요 (50-150)', 'error'); return; }

  var differential = (score - cr) * (113 / sr);
  differential = Math.round(differential * 10) / 10;

  var records = sg17get('hcp_history', []);
  records.push({ course:course, score:score, cr:cr, sr:sr, par:par, differential:differential, date:new Date().toLocaleDateString('ko') });
  sg17set('hcp_history', records);
  sfx17('hcp_update');
  toast17('핸디캡 기록이 저장되었습니다! (Diff: '+differential.toFixed(1)+')', 'success');
  renderHandicapHistory();
  checkV17Achievements('hcp_recorded');
  if(records.length >= 10) checkV17Achievements('hcp_10_rounds');
  if(records.length >= 20) checkV17Achievements('hcp_20_rounds');
};

// =========================================================
// SECTION 8: SEASON REPORT GENERATOR (시즌 리포트)
// =========================================================
function renderSeasonReport(){
  var ov = document.getElementById('v17SeasonOverlay');
  if(!ov) return;

  var hcpRecords = sg17get('hcp_history', []);
  var swingNotes = sg17get('swing_notes', []);
  var greenData = sg17get('green_sim', {correct:0,total:0,streak:0,best:0});
  var tourneyHist = sg17get('tourney_history', []);
  var readRules = sg17get('read_rules', []);
  var ach17 = sg17get('achievements_v17', {});

  var html = '<div class="v17-modal"><div class="v17-hdr"><h2><span class="v17i">&#x1F4CA;</span> Season Report</h2><button class="v17-x" onclick="document.getElementById(\'v17SeasonOverlay\').classList.remove(\'active\')">&times;</button></div>';

  // Overall grade
  var grade = 'F';
  var totalScore = 0;
  totalScore += Math.min(hcpRecords.length * 5, 25);
  totalScore += Math.min(swingNotes.length * 3, 15);
  totalScore += Math.min(greenData.correct * 2, 20);
  totalScore += Math.min(tourneyHist.length * 10, 20);
  totalScore += Math.min(readRules.length, 20);
  if(totalScore >= 90) grade = 'S';
  else if(totalScore >= 75) grade = 'A';
  else if(totalScore >= 55) grade = 'B';
  else if(totalScore >= 35) grade = 'C';
  else if(totalScore >= 15) grade = 'D';

  var gradeColors = {S:'#ffd700',A:'#4caf50',B:'#2196f3',C:'#ff9800',D:'#e53935',F:'#999'};
  html += '<div style="text-align:center;padding:24px;background:linear-gradient(135deg,var(--card-bg),var(--bg));border-radius:20px;margin-bottom:16px">';
  html += '<div style="font-size:12px;color:var(--text-muted)">시즌 종합 등급</div>';
  html += '<div style="font-size:72px;font-weight:900;color:'+(gradeColors[grade]||'#999')+';text-shadow:0 4px 12px rgba(0,0,0,.1)">'+grade+'</div>';
  html += '<div style="font-size:13px;color:var(--text-muted)">'+totalScore+'/100점</div>';
  html += '</div>';

  // Stats grid
  html += '<div class="v17-grid2">';
  html += '<div class="v17-card" style="text-align:center"><div style="font-size:28px;font-weight:900;color:var(--primary)">'+hcpRecords.length+'</div><div style="font-size:11px;color:var(--text-muted)">라운드 기록</div></div>';
  html += '<div class="v17-card" style="text-align:center"><div style="font-size:28px;font-weight:900;color:var(--accent)">'+swingNotes.length+'</div><div style="font-size:11px;color:var(--text-muted)">스윙 분석</div></div>';
  html += '<div class="v17-card" style="text-align:center"><div style="font-size:28px;font-weight:900;color:#4caf50">'+(greenData.total>0?Math.round(greenData.correct/greenData.total*100):0)+'%</div><div style="font-size:11px;color:var(--text-muted)">그린 리딩</div></div>';
  html += '<div class="v17-card" style="text-align:center"><div style="font-size:28px;font-weight:900;color:#ffd700">'+tourneyHist.length+'</div><div style="font-size:11px;color:var(--text-muted)">토너먼트</div></div>';
  html += '</div>';

  // Progress bars
  html += '<div class="v17-card"><h4>&#x1F4CA; 영역별 진행도</h4>';
  var areas = [
    {name:'라운드 경험',val:Math.min(hcpRecords.length*5,25),max:25,color:'#1a7a3a'},
    {name:'스윙 분석',val:Math.min(swingNotes.length*3,15),max:15,color:'#ff6b35'},
    {name:'그린 리딩',val:Math.min(greenData.correct*2,20),max:20,color:'#4caf50'},
    {name:'대회 참여',val:Math.min(tourneyHist.length*10,20),max:20,color:'#ffd700'},
    {name:'규칙 학습',val:Math.min(readRules.length,20),max:20,color:'#2196f3'}
  ];
  areas.forEach(function(a){
    var pct = Math.round(a.val/a.max*100);
    html += '<div class="v17-stat-row"><span style="font-size:12px;font-weight:600">'+a.name+'</span><div style="display:flex;align-items:center;gap:8px"><div class="v17-progress" style="width:120px"><div class="v17-progress-fill" style="width:'+pct+'%;background:'+a.color+'"></div></div><span style="font-size:12px;font-weight:700">'+a.val+'/'+a.max+'</span></div></div>';
  });
  html += '</div>';

  // Achievements count
  var achCount = Object.keys(ach17).length;
  html += '<div class="v17-card"><h4>&#x1F3C5; 업적 달성</h4>';
  html += '<div style="text-align:center;padding:16px"><div style="font-size:36px;font-weight:900;color:var(--primary)">'+achCount+' / 12</div>';
  html += '<div class="v17-progress"><div class="v17-progress-fill" style="width:'+Math.round(achCount/12*100)+'%;background:linear-gradient(90deg,#ffd700,#ff9800)"></div></div>';
  html += '</div></div>';

  // Share button
  html += '<div style="text-align:center;margin-top:16px"><button class="v17-btn v17-btn-primary" onclick="shareSeasonReport()">&#x1F4F1; 리포트 공유 (PNG)</button></div>';

  html += '</div>';
  ov.innerHTML = html;
  ov.classList.add('active');
  sfx17('season_report');
  checkV17Achievements('season_viewed');
}

window.shareSeasonReport = function(){
  var canvas = document.createElement('canvas');
  canvas.width = 600; canvas.height = 400;
  var ctx = canvas.getContext('2d');

  // Background
  var grd = ctx.createLinearGradient(0,0,600,400);
  grd.addColorStop(0,'#1a7a3a'); grd.addColorStop(1,'#0f5a28');
  ctx.fillStyle = grd; ctx.fillRect(0,0,600,400);

  // Header
  ctx.fillStyle = '#fff'; ctx.font = 'bold 28px sans-serif';
  ctx.fillText('SmartGolf Season Report', 30, 50);

  var hcpRecords = sg17get('hcp_history', []);
  var swingNotes = sg17get('swing_notes', []);
  var greenData = sg17get('green_sim', {correct:0,total:0});
  var tourneyHist = sg17get('tourney_history', []);

  // Stats
  ctx.font = 'bold 16px sans-serif'; ctx.fillStyle = 'rgba(255,255,255,.7)';
  var stats = [
    ['Rounds', hcpRecords.length.toString()],
    ['Swing Notes', swingNotes.length.toString()],
    ['Green Reading', (greenData.total>0?Math.round(greenData.correct/greenData.total*100):0)+'%'],
    ['Tournaments', tourneyHist.length.toString()]
  ];

  stats.forEach(function(s, i){
    var x = 30 + (i % 2) * 280;
    var y = 100 + Math.floor(i / 2) * 100;
    ctx.fillStyle = 'rgba(255,255,255,.15)';
    ctx.beginPath();
    ctx.roundRect(x, y, 250, 70, 12);
    ctx.fill();
    ctx.fillStyle = 'rgba(255,255,255,.7)'; ctx.font = '13px sans-serif';
    ctx.fillText(s[0], x+16, y+25);
    ctx.fillStyle = '#fff'; ctx.font = 'bold 32px sans-serif';
    ctx.fillText(s[1], x+16, y+58);
  });

  // Best score
  if(hcpRecords.length > 0){
    var best = Math.min.apply(null, hcpRecords.map(function(r){return r.score;}));
    ctx.fillStyle = '#ffd700'; ctx.font = 'bold 14px sans-serif';
    ctx.fillText('Best Score: '+best, 30, 340);
  }

  // Footer
  ctx.fillStyle = 'rgba(255,255,255,.5)'; ctx.font = '12px sans-serif';
  ctx.fillText('SmartGolf v17.0 | '+new Date().toLocaleDateString('ko'), 30, 380);

  canvas.toBlob(function(blob){
    if(!blob) return;
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url; a.download = 'smartgolf_season_report.png'; a.click();
    URL.revokeObjectURL(url);
    toast17('시즌 리포트가 다운로드되었습니다!', 'success');
  });
};

// =========================================================
// SECTION 9: GOLF IQ QUIZ v2 (+15 questions)
// =========================================================
var QUIZ_V17 = [
  {q:'스트로크 플레이에서 볼이 OB로 나갔을 때 페널티는?',a:['1벌타','2벌타','무벌타','실격'],c:0,ex:'OB시 1벌타를 받고 이전 위치에서 다시 플레이합니다 (스트로크와 거리의 벌).'},
  {q:'골프백에 넣을 수 있는 클럽의 최대 개수는?',a:['12개','13개','14개','15개'],c:2,ex:'규칙에 따라 최대 14개의 클럽을 지참할 수 있습니다.'},
  {q:'벙커에서 스트로크 전에 모래를 건드리면?',a:['무벌타','1벌타','2벌타','실격'],c:2,ex:'벙커에서 스트로크 전 모래를 테스트하면 일반 페널티(2벌타)를 받습니다.'},
  {q:'그린 위에서 볼 마크(피치마크)를 수리할 수 있는가?',a:['불가','가능(무벌타)','가능(1벌타)','캐디만 가능'],c:1,ex:'그린 위의 볼 마크, 이전 홀컵 자국은 무벌타로 수리할 수 있습니다.'},
  {q:'분실구 검색 허용 시간은?',a:['1분','3분','5분','제한없음'],c:1,ex:'2019년 규칙 개정으로 검색 시간이 5분에서 3분으로 줄었습니다.'},
  {q:'페어웨이에서 볼이 박혔을 때(임베디드 볼) 구제는?',a:['1벌타 드롭','무벌타 드롭','있는 그대로','선택불가'],c:1,ex:'일반 구역에서 박힌 볼은 무벌타로 가장 가까운 구제지점에서 드롭합니다.'},
  {q:'WHS에서 핸디캡 인덱스 계산 시 사용하는 최근 라운드 수는?',a:['10라운드','15라운드','20라운드','30라운드'],c:2,ex:'World Handicap System은 최근 20라운드 중 best 8의 평균으로 계산합니다.'},
  {q:'매치 플레이에서 상대가 컨시드하지 않은 짧은 퍼트를 넣지 않으면?',a:['무벌타','그 홀 패','1벌타 추가','재퍼팅'],c:1,ex:'매치 플레이에서 컨시드 없이 볼을 집어올리면 그 홀을 패합니다.'},
  {q:'워터 해저드(빨간 말뚝) 구역에서 구제 옵션이 아닌 것은?',a:['이전 위치 재타','후방 드롭','측면 2클럽 드롭','해저드 내 플레이'],c:3,ex:'해저드 내에서 있는 그대로 플레이하는 것은 구제가 아닌 선택사항입니다.'},
  {q:'타이거 우즈가 마스터스를 처음 우승한 나이는?',a:['18세','20세','21세','23세'],c:2,ex:'1997년 21세의 타이거 우즈가 18언더파로 마스터스를 12타 차로 우승했습니다.'},
  {q:'PGA 투어에서 가장 긴 파5 홀의 대략적 거리는?',a:['500m','550m','600m','650m'],c:2,ex:'PGA 투어에서 가장 긴 홀은 약 600m(660야드) 이상의 파5입니다.'},
  {q:'골프볼의 딤플 수 일반적 범위는?',a:['100-200','200-300','300-500','500-700'],c:2,ex:'대부분의 골프볼은 300-500개의 딤플을 가지고 있으며, 양력을 만들어 비거리를 늘립니다.'},
  {q:'슬로프 레이팅의 평균 기준값은?',a:['100','113','120','130'],c:1,ex:'슬로프 레이팅 113은 보기 골퍼 기준 평균 난이도입니다.'},
  {q:'프로비전얼볼(잠정구)을 칠 수 있는 상황은?',a:['항상','OB/분실 가능성','워터 해저드','매치 플레이만'],c:1,ex:'볼이 OB이거나 분실될 가능성이 있을 때만 잠정구를 선언하고 칠 수 있습니다.'},
  {q:'올림픽에서 골프가 정식 종목으로 복귀한 대회는?',a:['2008 베이징','2012 런던','2016 리우','2020 도쿄'],c:2,ex:'2016 리우 올림픽에서 112년 만에 골프가 정식 종목으로 복귀했습니다.'}
];

function renderQuizV17(){
  var ov = document.getElementById('v17QuizOverlay');
  if(!ov) return;
  var qData = sg17get('quiz_v17', {score:0,answered:[],total:0});
  var qTab = sg17get('quiz_v17_tab','play');

  var html = '<div class="v17-modal"><div class="v17-hdr"><h2><span class="v17i">&#x1F9E0;</span> Golf IQ Quiz v2</h2><button class="v17-x" onclick="document.getElementById(\'v17QuizOverlay\').classList.remove(\'active\')">&times;</button></div>';

  html += '<div class="v17-tabs">';
  [{k:'play',l:'&#x1F3AE; 퀴즈'},{k:'results',l:'&#x1F4CA; 결과'}].forEach(function(t){
    html += '<div class="v17-tab'+(qTab===t.k?' active':'')+'" data-tab="'+t.k+'">'+t.l+'</div>';
  });
  html += '</div>';

  if(qTab==='play'){
    var remaining = QUIZ_V17.filter(function(_,i){ return qData.answered.indexOf(i)===-1; });
    if(remaining.length === 0){
      html += '<div class="v17-card" style="text-align:center;padding:30px"><h4>&#x1F389; 모든 문제를 풀었습니다!</h4>';
      html += '<div style="font-size:48px;font-weight:900;color:var(--primary);margin:12px 0">'+qData.score+'/'+QUIZ_V17.length+'</div>';
      var pct = Math.round(qData.score/QUIZ_V17.length*100);
      var g = pct>=90?'S':pct>=75?'A':pct>=55?'B':pct>=35?'C':'D';
      html += '<div class="v17-badge" style="background:'+(g==='S'||g==='A'?'#4caf50':'#ff9800')+';color:#fff;font-size:16px;padding:8px 20px">'+g+' 등급 ('+pct+'%)</div>';
      html += '<div style="margin-top:16px"><button class="v17-btn v17-btn-secondary" onclick="resetQuizV17()">&#x1F504; 다시 풀기</button></div>';
      html += '</div>';
    } else {
      var qIdx = QUIZ_V17.indexOf(remaining[0]);
      var q = remaining[0];
      var num = qData.answered.length + 1;
      html += '<div style="margin-bottom:12px"><span class="v17-badge" style="background:var(--primary-light);color:var(--primary)">'+num+'/'+QUIZ_V17.length+'</span> <span style="font-size:12px;color:var(--text-muted)">정답: '+qData.score+'</span></div>';
      html += '<div class="v17-card"><h4 style="font-size:16px;line-height:1.5">'+q.q+'</h4>';
      html += '<div style="margin-top:14px">';
      q.a.forEach(function(a, i){
        html += '<button class="v17-btn v17-btn-secondary" style="width:100%;justify-content:flex-start;margin-bottom:8px" onclick="answerQuizV17('+qIdx+','+i+')">'+String.fromCharCode(9312+i)+' '+a+'</button>';
      });
      html += '</div><div id="v17QuizFeedback"></div></div>';
    }
  } else {
    html += '<div class="v17-card"><h4>&#x1F4CA; 퀴즈 결과</h4>';
    html += '<div class="v17-stat-row"><span>총 문항</span><span style="font-weight:700">'+QUIZ_V17.length+'</span></div>';
    html += '<div class="v17-stat-row"><span>정답</span><span style="font-weight:700;color:#4caf50">'+qData.score+'</span></div>';
    html += '<div class="v17-stat-row"><span>오답</span><span style="font-weight:700;color:#e53935">'+(qData.answered.length - qData.score)+'</span></div>';
    html += '<div class="v17-stat-row"><span>정답률</span><span style="font-weight:700;color:var(--primary)">'+(qData.answered.length>0?Math.round(qData.score/qData.answered.length*100):0)+'%</span></div>';
    html += '</div>';
  }

  html += '</div>';
  ov.innerHTML = html;
  ov.classList.add('active');

  ov.querySelectorAll('.v17-tab').forEach(function(tab){
    tab.addEventListener('click', function(){ sg17set('quiz_v17_tab', tab.dataset.tab); renderQuizV17(); });
  });
}

window.answerQuizV17 = function(qIdx, ans){
  var q = QUIZ_V17[qIdx];
  var qData = sg17get('quiz_v17', {score:0,answered:[],total:0});
  if(qData.answered.indexOf(qIdx)!==-1) return;

  qData.answered.push(qIdx);
  var correct = ans === q.c;
  if(correct) qData.score++;
  qData.total++;
  sg17set('quiz_v17', qData);

  var fb = document.getElementById('v17QuizFeedback');
  if(fb){
    fb.innerHTML = '<div class="v17-coach-msg" style="margin-top:12px;border-left-color:'+(correct?'#4caf50':'#e53935')+'"><h5>'+(correct?'&#x2705; 정답!':'&#x274C; 오답 (정답: '+q.a[q.c]+')')+'</h5><p>'+q.ex+'</p></div>';
  }

  if(correct) sfx17('green_putt'); else sfx17('rule_expand');

  setTimeout(function(){ renderQuizV17(); }, 1800);

  if(qData.score >= 10) checkV17Achievements('quiz_10');
  if(qData.score >= 15) checkV17Achievements('quiz_15');
};

window.resetQuizV17 = function(){
  sg17set('quiz_v17', {score:0,answered:[],total:0});
  renderQuizV17();
};

// =========================================================
// SECTION 10: ACHIEVEMENTS v17 (12 new)
// =========================================================
var V17_ACHIEVEMENTS = [
  {id:'tourney_created',name:'대회 주최자',desc:'첫 토너먼트 생성',icon:'&#x1F3C6;'},
  {id:'tourney_champion',name:'토너먼트 챔피언',desc:'토너먼트 우승 기록',icon:'&#x1F451;'},
  {id:'swing_note_saved',name:'스윙 분석가',desc:'첫 스윙 분석 기록',icon:'&#x1F4DD;'},
  {id:'rules_10',name:'규칙 학습자',desc:'골프 규칙 10개 읽기',icon:'&#x1F4D6;'},
  {id:'rules_master',name:'규칙 마스터',desc:'골프 규칙 전체(20개) 읽기',icon:'&#x1F393;'},
  {id:'equip_viewed',name:'장비 감정사',desc:'장비 백과사전 열람',icon:'&#x1F3CC;'},
  {id:'coach_viewed',name:'코칭 수강생',desc:'AI 라운드 코치 이용',icon:'&#x1F9D1;'},
  {id:'green_streak_5',name:'그린 리더',desc:'그린 리딩 5연속 정답',icon:'&#x1F7E2;'},
  {id:'green_20_correct',name:'퍼팅 마스터',desc:'그린 리딩 20문 정답',icon:'&#x26F3;'},
  {id:'hcp_10_rounds',name:'10라운드 달성',desc:'핸디캡 기록 10라운드',icon:'&#x1F4C9;'},
  {id:'quiz_15',name:'골프 박사 v2',desc:'Golf IQ v2 15문 정답',icon:'&#x1F9E0;'},
  {id:'season_viewed',name:'시즌 리뷰어',desc:'시즌 리포트 확인',icon:'&#x1F4CA;'}
];

function checkV17Achievements(id){
  var ach = sg17get('achievements_v17', {});
  if(ach[id]) return;
  var def = V17_ACHIEVEMENTS.find(function(a){ return a.id === id; });
  if(!def) return;
  ach[id] = { date: new Date().toLocaleDateString('ko') };
  sg17set('achievements_v17', ach);
  sfx17('challenge_done');
  toast17(def.icon+' 업적 달성: '+def.name, 'success');
}

function renderV17Achievements(){
  var ov = document.getElementById('v17AchOverlay');
  if(!ov) return;
  var ach = sg17get('achievements_v17', {});
  var html = '<div class="v17-modal"><div class="v17-hdr"><h2><span class="v17i">&#x1F3C5;</span> v17 Achievements</h2><button class="v17-x" onclick="document.getElementById(\'v17AchOverlay\').classList.remove(\'active\')">&times;</button></div>';

  var done = Object.keys(ach).length;
  html += '<div style="text-align:center;margin-bottom:16px"><span class="v17-badge" style="background:var(--primary);color:#fff;font-size:14px;padding:8px 20px">'+done+' / '+V17_ACHIEVEMENTS.length+'</span>';
  html += '<div class="v17-progress" style="margin-top:10px"><div class="v17-progress-fill" style="width:'+Math.round(done/V17_ACHIEVEMENTS.length*100)+'%;background:linear-gradient(90deg,#ffd700,#ff9800)"></div></div></div>';

  V17_ACHIEVEMENTS.forEach(function(a){
    var achieved = ach[a.id];
    html += '<div class="v17-challenge-item'+(achieved?' completed':'')+'">';
    html += '<div class="v17-challenge-icon">'+(achieved?a.icon:'&#x1F512;')+'</div>';
    html += '<div class="v17-challenge-info"><h5>'+a.name+'</h5><p>'+a.desc+'</p></div>';
    if(achieved) html += '<span style="font-size:10px;color:var(--text-muted)">'+achieved.date+'</span>';
    html += '</div>';
  });

  html += '</div>';
  ov.innerHTML = html;
  ov.classList.add('active');
}

// =========================================================
// SECTION 11: OVERLAYS + MENU BAR + KEYBOARD
// =========================================================
var overlayIds = ['v17TournamentOverlay','v17SwingOverlay','v17RulesOverlay','v17EquipOverlay','v17CoachOverlay','v17GreenOverlay','v17HcpOverlay','v17SeasonOverlay','v17QuizOverlay','v17AchOverlay'];
overlayIds.forEach(function(id){
  if(!document.getElementById(id)){
    var ov = document.createElement('div');
    ov.id = id;
    ov.className = 'v17-overlay';
    ov.addEventListener('click', function(e){ if(e.target===ov) ov.classList.remove('active'); });
    document.body.appendChild(ov);
  }
});

// Menu bar
var menuBar = document.createElement('div');
menuBar.className = 'v17-menu-bar';
menuBar.id = 'v17MenuBar';
var menuItems = [
  {label:'&#x1F3C6; 토너먼트',fn:'renderTournament'},
  {label:'&#x1F4DD; 스윙노트',fn:'renderSwingNotebook'},
  {label:'&#x1F4D6; 규칙',fn:'renderRulesEncyclopedia'},
  {label:'&#x1F3CC; 장비',fn:'renderEquipment'},
  {label:'&#x1F9D1; 코치',fn:'renderCoach'},
  {label:'&#x1F7E2; 그린',fn:'renderGreenSim'},
  {label:'&#x1F4C9; 핸디캡',fn:'renderHandicapHistory'},
  {label:'&#x1F4CA; 시즌',fn:'renderSeasonReport'},
  {label:'&#x1F9E0; 퀴즈v2',fn:'renderQuizV17'},
  {label:'&#x1F3C5; 업적',fn:'renderV17Achievements'}
];
menuItems.forEach(function(m){
  var btn = document.createElement('button');
  btn.className = 'v17-menu-btn';
  btn.innerHTML = m.label;
  btn.addEventListener('click', function(){ window[m.fn](); });
  menuBar.appendChild(btn);
});
document.body.appendChild(menuBar);

// Keyboard shortcuts
document.addEventListener('keydown', function(e){
  var t = e.target.tagName;
  if(t==='INPUT'||t==='TEXTAREA'||t==='SELECT') return;
  if(!e.shiftKey) return;
  switch(e.key){
    case 'T': renderTournament(); break;
    case 'W': renderSwingNotebook(); break;
    case 'R': renderRulesEncyclopedia(); break;
    case 'E': renderEquipment(); break;
    case 'O': renderCoach(); break;
    case 'G': renderGreenSim(); break;
    case 'H': renderHandicapHistory(); break;
    case 'N': renderSeasonReport(); break;
    case 'Q': renderQuizV17(); break;
    case 'A': renderV17Achievements(); break;
  }
});

// Escape closes all v17 overlays
document.addEventListener('keydown', function(e){
  if(e.key==='Escape'){
    overlayIds.forEach(function(id){
      var ov = document.getElementById(id);
      if(ov) ov.classList.remove('active');
    });
  }
});

})();
