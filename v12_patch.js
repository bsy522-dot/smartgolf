(function(){
'use strict';

// === SmartGolf v12.0 Patch ===
// 1. 라운드 라이브 모드 (18홀 실시간 추적: FIR/GIR/퍼팅수/페널티)
// 2. 코스 리뷰 & 5항목 별점 (난이도/관리/서비스/가성비/경치)
// 3. 스윙 셀프 진단 8포인트 (SVG 시각화)
// 4. 골프 DNA 프로파일러 (레이더차트 성향 분석)
// 5. 그린피 시즌 예측기 (주중/주말/시즌별)
// 6. 투어 프로 스윙 참고 8명
// 7. 골프 여행 5개 지역 추천
// 8. 워밍업 루틴 v3 (동적 스트레칭 8종 타이머)
// 9. 업적 +10개 (라운드/리뷰/진단/여행/그린피)
// 10. SFX 6종 + 키보드 단축키 5종

// --- CSS ---
var css12 = document.createElement('style');
css12.textContent = `
.v12-overlay{position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,.78);z-index:10020;display:none;align-items:center;justify-content:center;backdrop-filter:blur(10px)}
.v12-overlay.active{display:flex}
.v12-modal{background:var(--card-bg,#fff);border-radius:24px;padding:28px;width:95%;max-width:700px;max-height:92vh;overflow-y:auto;box-shadow:0 32px 100px rgba(0,0,0,.5);animation:v12Rise .4s cubic-bezier(.22,1,.36,1)}
@keyframes v12Rise{from{opacity:0;transform:translateY(40px) scale(.94)}to{opacity:1;transform:translateY(0) scale(1)}}
.v12-hdr{display:flex;justify-content:space-between;align-items:center;margin-bottom:18px}
.v12-hdr h2{font-size:21px;font-weight:800;display:flex;align-items:center;gap:10px}
.v12-hdr h2 .v12i{font-size:26px}
.v12-x{background:none;border:none;font-size:26px;cursor:pointer;color:var(--text-muted);padding:4px 10px;border-radius:10px;transition:.2s}
.v12-x:hover{background:var(--border);color:var(--text)}
.v12-tabs{display:flex;gap:6px;margin-bottom:16px;overflow-x:auto;padding-bottom:4px;scrollbar-width:none}
.v12-tabs::-webkit-scrollbar{display:none}
.v12-tab{padding:9px 18px;border-radius:24px;border:1.5px solid var(--border);background:var(--bg);font-size:12px;font-weight:700;cursor:pointer;white-space:nowrap;transition:.25s}
.v12-tab.active{background:var(--primary);color:#fff;border-color:var(--primary);box-shadow:0 3px 12px rgba(26,122,58,.35)}
.v12-card{background:var(--bg);border-radius:16px;padding:18px;margin-bottom:12px;transition:.25s;border:1.5px solid transparent}
.v12-card:hover{border-color:var(--primary);transform:translateY(-2px);box-shadow:0 4px 16px rgba(26,122,58,.12)}
.v12-card h4{font-size:15px;font-weight:700;margin-bottom:8px;display:flex;align-items:center;gap:8px}
.v12-card p{font-size:12px;color:var(--text-muted);line-height:1.6}
.v12-btn{padding:11px 22px;border:none;border-radius:14px;font-size:13px;font-weight:700;cursor:pointer;transition:.25s;display:inline-flex;align-items:center;gap:6px}
.v12-btn-primary{background:linear-gradient(135deg,var(--primary),#34a853);color:#fff}
.v12-btn-primary:hover{transform:translateY(-2px);box-shadow:0 8px 20px rgba(26,122,58,.4)}
.v12-btn-sm{padding:7px 14px;font-size:11px;border-radius:10px}
.v12-btn-secondary{background:var(--bg);color:var(--text);border:1.5px solid var(--border)}
.v12-btn-secondary:hover{border-color:var(--primary);color:var(--primary)}
.v12-input{width:100%;padding:11px 16px;border:2px solid var(--border);border-radius:12px;font-size:13px;background:var(--bg);color:var(--text);transition:.2s}
.v12-input:focus{border-color:var(--primary);outline:none;box-shadow:0 0 0 3px rgba(26,122,58,.1)}
.v12-select{width:100%;padding:11px 16px;border:2px solid var(--border);border-radius:12px;font-size:13px;background:var(--bg);color:var(--text);cursor:pointer}
.v12-label{display:block;font-size:12px;font-weight:700;color:var(--text-muted);margin-bottom:6px;text-transform:uppercase;letter-spacing:.5px}
.v12-grid2{display:grid;grid-template-columns:1fr 1fr;gap:12px}
.v12-grid3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px}
@media(max-width:500px){.v12-grid2,.v12-grid3{grid-template-columns:1fr}}
.v12-divider{height:1px;background:var(--border);margin:16px 0}
.v12-badge{display:inline-block;padding:4px 12px;border-radius:14px;font-size:11px;font-weight:700}
.v12-badge-green{background:#e8f5e9;color:#2e7d32}
.v12-badge-blue{background:#e3f2fd;color:#1565c0}
.v12-badge-orange{background:#fff3e0;color:#e65100}
.v12-badge-red{background:#fce4ec;color:#c62828}
.v12-badge-purple{background:#f3e5f5;color:#7b1fa2}
.v12-badge-gold{background:linear-gradient(135deg,#fff8e1,#ffe082);color:#5a3e00}
[data-theme="dark"] .v12-badge-green{background:#1a3a25;color:#7bed9f}
[data-theme="dark"] .v12-badge-blue{background:#1a2a3a;color:#7ab8f5}
[data-theme="dark"] .v12-badge-orange{background:#3a2a1a;color:#f0c070}
[data-theme="dark"] .v12-badge-red{background:#3a1a1a;color:#f08080}
[data-theme="dark"] .v12-badge-purple{background:#2a1a3a;color:#c9a0dc}
[data-theme="dark"] .v12-badge-gold{background:#3a3000;color:#fdd835}
.v12-star{cursor:pointer;font-size:22px;color:var(--border);transition:.15s}
.v12-star.filled{color:#ffc107}
.v12-star:hover{transform:scale(1.2)}
.v12-progress{height:8px;background:var(--border);border-radius:4px;overflow:hidden;margin:6px 0}
.v12-progress-fill{height:100%;background:linear-gradient(90deg,var(--primary),#34a853);border-radius:4px;transition:width .6s ease}
.v12-hole-row{display:grid;grid-template-columns:50px 1fr 1fr 60px 50px 50px 50px;gap:6px;align-items:center;padding:8px 10px;font-size:12px;border-bottom:1px solid var(--border)}
.v12-hole-row.header{font-weight:800;background:var(--primary-light);border-radius:10px 10px 0 0;font-size:11px;color:var(--primary)}
.v12-hole-num{font-weight:800;text-align:center;font-size:14px}
.v12-score-input{width:44px;padding:6px;text-align:center;border:2px solid var(--border);border-radius:8px;font-size:14px;font-weight:700;background:var(--bg);color:var(--text)}
.v12-score-input:focus{border-color:var(--primary);outline:none}
.v12-chk{width:18px;height:18px;accent-color:var(--primary);cursor:pointer}
.v12-live-stat{text-align:center;padding:14px;background:var(--bg);border-radius:14px}
.v12-live-stat .val{font-size:28px;font-weight:900;color:var(--primary)}
.v12-live-stat .lbl{font-size:10px;color:var(--text-muted);margin-top:4px;text-transform:uppercase;font-weight:700}
.v12-radar-canvas{display:block;margin:0 auto}
.v12-warmup-step{display:flex;gap:14px;align-items:center;padding:14px;background:var(--bg);border-radius:14px;margin-bottom:10px;border:1.5px solid transparent;transition:.2s}
.v12-warmup-step.active{border-color:var(--primary);background:var(--primary-light)}
.v12-warmup-step.done{opacity:.5}
.v12-warmup-num{width:32px;height:32px;border-radius:50%;background:var(--primary);color:#fff;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:13px;flex-shrink:0}
.v12-warmup-step.done .v12-warmup-num{background:#999}
.v12-timer-ring{position:relative;width:120px;height:120px;margin:0 auto 16px}
.v12-timer-text{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);font-size:28px;font-weight:900;color:var(--primary)}
.v12-pro-card{display:flex;gap:14px;padding:16px;background:var(--bg);border-radius:16px;margin-bottom:12px;border:1.5px solid transparent;transition:.25s}
.v12-pro-card:hover{border-color:var(--primary);transform:translateY(-2px)}
.v12-pro-avatar{width:56px;height:56px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:24px;flex-shrink:0}
.v12-trip-card{background:var(--bg);border-radius:16px;padding:18px;margin-bottom:12px;border-left:4px solid var(--primary);transition:.25s}
.v12-trip-card:hover{transform:translateX(4px);box-shadow:0 4px 16px rgba(26,122,58,.12)}
.v12-fee-bar{height:24px;border-radius:6px;position:relative;overflow:hidden;margin:4px 0}
.v12-fee-fill{height:100%;border-radius:6px;transition:width .5s ease}
.v12-fee-label{position:absolute;right:8px;top:50%;transform:translateY(-50%);font-size:11px;font-weight:700;color:#fff}
@media(max-width:600px){.v12-hole-row{grid-template-columns:36px 1fr 1fr 50px 40px 40px 40px;gap:4px;font-size:11px}.v12-score-input{width:36px;padding:4px;font-size:12px}}
`;
document.head.appendChild(css12);

// --- SFX ---
var v12Ctx = null;
function v12sfx(type) {
  try {
    if (!v12Ctx) v12Ctx = new (window.AudioContext || window.webkitAudioContext)();
    var osc = v12Ctx.createOscillator();
    var gain = v12Ctx.createGain();
    osc.connect(gain);
    gain.connect(v12Ctx.destination);
    var t = v12Ctx.currentTime;
    switch(type) {
      case 'round_start':
        osc.type='triangle';osc.frequency.setValueAtTime(440,t);osc.frequency.linearRampToValueAtTime(880,t+.15);
        gain.gain.setValueAtTime(.25,t);gain.gain.linearRampToValueAtTime(0,t+.3);osc.start(t);osc.stop(t+.3);break;
      case 'hole_score':
        osc.type='sine';osc.frequency.setValueAtTime(523,t);osc.frequency.linearRampToValueAtTime(784,t+.1);
        gain.gain.setValueAtTime(.2,t);gain.gain.linearRampToValueAtTime(0,t+.2);osc.start(t);osc.stop(t+.2);break;
      case 'review_submit':
        osc.type='sine';osc.frequency.setValueAtTime(659,t);
        gain.gain.setValueAtTime(.2,t);gain.gain.linearRampToValueAtTime(0,t+.25);osc.start(t);osc.stop(t+.25);
        var o2=v12Ctx.createOscillator();var g2=v12Ctx.createGain();o2.connect(g2);g2.connect(v12Ctx.destination);
        o2.type='sine';o2.frequency.setValueAtTime(880,t+.12);g2.gain.setValueAtTime(.18,t+.12);g2.gain.linearRampToValueAtTime(0,t+.35);o2.start(t+.12);o2.stop(t+.35);break;
      case 'warmup_tick':
        osc.type='square';osc.frequency.setValueAtTime(880,t);
        gain.gain.setValueAtTime(.12,t);gain.gain.linearRampToValueAtTime(0,t+.05);osc.start(t);osc.stop(t+.06);break;
      case 'warmup_done':
        osc.type='triangle';osc.frequency.setValueAtTime(523,t);osc.frequency.linearRampToValueAtTime(1047,t+.2);
        gain.gain.setValueAtTime(.22,t);gain.gain.linearRampToValueAtTime(0,t+.4);osc.start(t);osc.stop(t+.4);break;
      case 'achieve':
        osc.type='sine';osc.frequency.setValueAtTime(587,t);
        gain.gain.setValueAtTime(.2,t);gain.gain.linearRampToValueAtTime(0,t+.15);osc.start(t);osc.stop(t+.15);
        var o3=v12Ctx.createOscillator();var g3=v12Ctx.createGain();o3.connect(g3);g3.connect(v12Ctx.destination);
        o3.type='sine';o3.frequency.setValueAtTime(784,t+.1);g3.gain.setValueAtTime(.18,t+.1);g3.gain.linearRampToValueAtTime(0,t+.3);o3.start(t+.1);o3.stop(t+.3);
        var o4=v12Ctx.createOscillator();var g4=v12Ctx.createGain();o4.connect(g4);g4.connect(v12Ctx.destination);
        o4.type='sine';o4.frequency.setValueAtTime(1047,t+.2);g4.gain.setValueAtTime(.15,t+.2);g4.gain.linearRampToValueAtTime(0,t+.45);o4.start(t+.2);o4.stop(t+.45);break;
    }
  } catch(e){}
}

// --- Overlay Helper ---
function v12Overlay(id) {
  var ov = document.getElementById(id);
  if (!ov) {
    ov = document.createElement('div');
    ov.id = id;
    ov.className = 'v12-overlay';
    ov.addEventListener('click', function(e) { if (e.target === ov) ov.classList.remove('active'); });
    document.body.appendChild(ov);
  }
  return ov;
}

// --- Toast ---
function v12Toast(msg) {
  var t = document.createElement('div');
  t.style.cssText = 'position:fixed;bottom:90px;left:50%;transform:translateX(-50%);background:var(--toast-bg,#333);color:#fff;padding:12px 24px;border-radius:14px;font-size:13px;font-weight:600;z-index:10025;box-shadow:0 6px 24px rgba(0,0,0,.3);animation:v12Rise .3s ease';
  t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(function(){ t.style.opacity='0';t.style.transition='opacity .3s'; }, 2200);
  setTimeout(function(){ if(t.parentNode) t.parentNode.removeChild(t); }, 2600);
}

// =====================
// 1. ROUND LIVE MODE
// =====================
var roundData = JSON.parse(localStorage.getItem('sg_v12_round') || 'null');
var HOLES_PAR = [4,3,5,4,4,3,4,5,4,4,3,5,4,4,3,4,5,4];
var HOLES_DIST = [380,165,510,420,350,185,405,530,390,410,175,520,395,360,195,430,505,370];

function initRound() {
  roundData = {
    date: new Date().toISOString().slice(0,10),
    holes: [],
    currentHole: 0,
    finished: false
  };
  for (var i=0; i<18; i++) {
    roundData.holes.push({ par: HOLES_PAR[i], dist: HOLES_DIST[i], score: 0, putts: 0, fir: false, gir: false, penalty: 0 });
  }
  saveRound();
}

function saveRound() {
  localStorage.setItem('sg_v12_round', JSON.stringify(roundData));
}

function getRoundStats() {
  if (!roundData) return null;
  var played=0, totalScore=0, totalPutts=0, firs=0, girs=0, firElig=0, girElig=0, totalPar=0;
  roundData.holes.forEach(function(h,i) {
    if (h.score > 0) {
      played++;
      totalScore += h.score;
      totalPutts += h.putts;
      totalPar += h.par;
      if (h.gir) girs++;
      girElig++;
      if (h.par >= 4) { firElig++; if (h.fir) firs++; }
    }
  });
  return {
    played: played, totalScore: totalScore, totalPar: totalPar,
    toPar: totalScore - totalPar, avgPutts: played ? (totalPutts/played).toFixed(1) : '0',
    firPct: firElig ? Math.round(firs/firElig*100) : 0,
    girPct: girElig ? Math.round(girs/girElig*100) : 0,
    totalPutts: totalPutts
  };
}

function showRoundLive() {
  v12sfx('round_start');
  var ov = v12Overlay('v12RoundOverlay');
  if (!roundData || roundData.finished) initRound();

  var stats = getRoundStats();
  var html = '<div class="v12-modal"><div class="v12-hdr"><h2><span class="v12i">&#9971;</span> &#46972;&#50868;&#46300; &#46972;&#51060;&#48652;</h2><button class="v12-x" onclick="document.getElementById(\'v12RoundOverlay\').classList.remove(\'active\')">&times;</button></div>';

  html += '<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin-bottom:16px">';
  html += '<div class="v12-live-stat"><div class="val">' + (stats.toPar > 0 ? '+' : '') + stats.toPar + '</div><div class="lbl">&#53804;&#54028;</div></div>';
  html += '<div class="v12-live-stat"><div class="val">' + stats.played + '/18</div><div class="lbl">&#54848;</div></div>';
  html += '<div class="v12-live-stat"><div class="val">' + stats.avgPutts + '</div><div class="lbl">&#54217;&#44512;&#54140;&#54021;</div></div>';
  html += '<div class="v12-live-stat"><div class="val">' + stats.girPct + '%</div><div class="lbl">GIR</div></div>';
  html += '</div>';

  html += '<div style="display:grid;grid-template-columns:repeat(2,1fr);gap:8px;margin-bottom:16px">';
  html += '<div class="v12-live-stat"><div class="val">' + stats.firPct + '%</div><div class="lbl">FIR</div></div>';
  html += '<div class="v12-live-stat"><div class="val">' + stats.totalPutts + '</div><div class="lbl">&#52509;&#54140;&#54021;</div></div>';
  html += '</div>';

  html += '<div class="v12-hole-row header"><div>&#54848;</div><div>&#54028;/&#44144;&#47532;</div><div>&#53364;&#47101;</div><div>&#49828;&#53076;&#50612;</div><div>&#54140;&#54021;</div><div>FIR</div><div>GIR</div></div>';

  for (var i=0; i<18; i++) {
    var h = roundData.holes[i];
    var clubs = ['','','','DR','7I','3W','8I','6I','PW','5I','3W','4I','DR','9I','8I','7I','3W','6I'];
    var diff = h.score > 0 ? h.score - h.par : 0;
    var diffColor = diff < 0 ? '#2e7d32' : diff === 0 ? 'var(--text)' : diff === 1 ? '#e65100' : '#c62828';
    html += '<div class="v12-hole-row">';
    html += '<div class="v12-hole-num">' + (i+1) + '</div>';
    html += '<div>P' + h.par + ' / ' + h.dist + 'm</div>';
    html += '<div style="font-size:11px;color:var(--text-muted)">' + clubs[i] + '</div>';
    html += '<div><input type="number" class="v12-score-input" min="1" max="12" value="' + (h.score||'') + '" data-hole="' + i + '" data-field="score" style="color:' + diffColor + '"></div>';
    html += '<div><input type="number" class="v12-score-input" min="0" max="6" value="' + (h.putts||'') + '" data-hole="' + i + '" data-field="putts"></div>';
    html += '<div style="text-align:center"><input type="checkbox" class="v12-chk" ' + (h.fir?'checked':'') + ' data-hole="' + i + '" data-field="fir" ' + (h.par < 4 ? 'disabled' : '') + '></div>';
    html += '<div style="text-align:center"><input type="checkbox" class="v12-chk" ' + (h.gir?'checked':'') + ' data-hole="' + i + '" data-field="gir"></div>';
    html += '</div>';
  }

  html += '<div style="display:flex;gap:10px;margin-top:16px">';
  html += '<button class="v12-btn v12-btn-primary" style="flex:1" onclick="v12FinishRound()">&#46972;&#50868;&#46300; &#50756;&#47308;</button>';
  html += '<button class="v12-btn v12-btn-secondary" style="flex:1" onclick="v12ResetRound()">&#49352; &#46972;&#50868;&#46300;</button>';
  html += '</div></div>';

  ov.innerHTML = html;
  ov.classList.add('active');

  ov.querySelectorAll('.v12-score-input').forEach(function(inp) {
    inp.addEventListener('change', function() {
      var hi = parseInt(this.dataset.hole);
      var field = this.dataset.field;
      roundData.holes[hi][field] = parseInt(this.value) || 0;
      saveRound();
      v12sfx('hole_score');
      v12CheckAchievements();
      showRoundLive();
    });
  });
  ov.querySelectorAll('.v12-chk').forEach(function(chk) {
    chk.addEventListener('change', function() {
      var hi = parseInt(this.dataset.hole);
      var field = this.dataset.field;
      roundData.holes[hi][field] = this.checked;
      saveRound();
    });
  });
}

window.v12FinishRound = function() {
  if (!roundData) return;
  roundData.finished = true;
  saveRound();
  var hist = JSON.parse(localStorage.getItem('sg_v12_round_history') || '[]');
  hist.push(JSON.parse(JSON.stringify(roundData)));
  if (hist.length > 50) hist = hist.slice(-50);
  localStorage.setItem('sg_v12_round_history', JSON.stringify(hist));
  v12sfx('review_submit');
  v12Toast('라운드 완료! 기록이 저장되었습니다.');
  v12CheckAchievements();
};

window.v12ResetRound = function() {
  initRound();
  showRoundLive();
};

// =====================
// 2. COURSE REVIEW & RATING
// =====================
var v12Reviews = JSON.parse(localStorage.getItem('sg_v12_reviews') || '{}');

function showCourseReview() {
  var ov = v12Overlay('v12ReviewOverlay');
  var courses = Object.keys(v12Reviews);
  var allRevs = [];
  courses.forEach(function(c) {
    v12Reviews[c].forEach(function(r) { allRevs.push({course:c, data:r}); });
  });
  allRevs.sort(function(a,b) { return (b.data.ts||0)-(a.data.ts||0); });

  var html = '<div class="v12-modal"><div class="v12-hdr"><h2><span class="v12i">&#11088;</span> &#53076;&#49828; &#47532;&#48624;</h2><button class="v12-x" onclick="document.getElementById(\'v12ReviewOverlay\').classList.remove(\'active\')">&times;</button></div>';

  html += '<div class="v12-card" style="border-color:var(--primary)">';
  html += '<h4>&#9998; &#49352; &#47532;&#48624; &#51089;&#49457;</h4>';
  html += '<div style="margin-bottom:10px"><label class="v12-label">&#44264;&#54532;&#51109; &#51060;&#47492;</label><input type="text" class="v12-input" id="v12RevCourse" placeholder="&#44264;&#54532;&#51109; &#51060;&#47492; &#51077;&#47141;"></div>';
  var cats = ['난이도','관리상태','서비스','가성비','경치'];
  var catIcons = ['&#9888;','&#127807;','&#128587;','&#128176;','&#127748;'];
  html += '<div class="v12-grid2" style="margin-bottom:10px">';
  for (var c=0; c<5; c++) {
    html += '<div style="display:flex;align-items:center;gap:6px"><span style="font-size:14px">' + catIcons[c] + '</span><span style="font-size:12px;font-weight:600">' + cats[c] + '</span>';
    html += '<span id="v12Stars_' + c + '" style="display:flex;gap:2px">';
    for (var s=1; s<=5; s++) {
      html += '<span class="v12-star" data-cat="' + c + '" data-val="' + s + '">&#9733;</span>';
    }
    html += '</span></div>';
  }
  html += '</div>';
  html += '<div style="margin-bottom:10px"><label class="v12-label">&#54620;&#51460; &#54980;&#44592;</label><input type="text" class="v12-input" id="v12RevComment" placeholder="&#44264;&#54532;&#51109; &#54620;&#51460;&#54217;" maxlength="100"></div>';
  html += '<button class="v12-btn v12-btn-primary" onclick="v12SubmitReview()">&#47532;&#48624; &#46321;&#47197;</button>';
  html += '</div>';

  html += '<div class="v12-divider"></div><h3 style="font-size:16px;font-weight:800;margin-bottom:12px">&#128221; &#52572;&#44540; &#47532;&#48624; (' + allRevs.length + '&#44148;)</h3>';

  allRevs.slice(0,20).forEach(function(r) {
    var avgRating = 0;
    if (r.data.ratings) {
      var sum = 0; r.data.ratings.forEach(function(v){sum+=v;}); avgRating = (sum/5).toFixed(1);
    }
    html += '<div class="v12-card"><h4>' + v12Esc(r.course) + ' <span class="v12-badge v12-badge-gold">' + avgRating + ' / 5.0</span></h4>';
    if (r.data.ratings) {
      html += '<div style="display:flex;gap:12px;margin-bottom:6px;flex-wrap:wrap">';
      for (var ci=0; ci<5; ci++) {
        html += '<span style="font-size:11px">' + cats[ci] + ' <b>' + (r.data.ratings[ci]||0) + '</b></span>';
      }
      html += '</div>';
    }
    html += '<p>' + v12Esc(r.data.comment||'') + '</p>';
    html += '<div style="font-size:10px;color:var(--text-muted);margin-top:6px">' + (r.data.date||'') + '</div>';
    html += '</div>';
  });

  html += '</div>';
  ov.innerHTML = html;
  ov.classList.add('active');

  var starRatings = [0,0,0,0,0];
  ov.querySelectorAll('.v12-star').forEach(function(star) {
    star.addEventListener('click', function() {
      var cat = parseInt(this.dataset.cat);
      var val = parseInt(this.dataset.val);
      starRatings[cat] = val;
      var container = document.getElementById('v12Stars_' + cat);
      if (container) {
        container.querySelectorAll('.v12-star').forEach(function(s) {
          s.classList.toggle('filled', parseInt(s.dataset.val) <= val);
        });
      }
    });
  });
  window._v12StarRatings = starRatings;
}

window.v12SubmitReview = function() {
  var course = document.getElementById('v12RevCourse').value.trim();
  var comment = document.getElementById('v12RevComment').value.trim();
  if (!course) { v12Toast('곤프장 이름을 입력해주세요'); return; }
  if (!v12Reviews[course]) v12Reviews[course] = [];
  v12Reviews[course].push({
    ratings: window._v12StarRatings.slice(),
    comment: comment,
    date: new Date().toISOString().slice(0,10),
    ts: Date.now()
  });
  localStorage.setItem('sg_v12_reviews', JSON.stringify(v12Reviews));
  v12sfx('review_submit');
  v12Toast('리뷰가 등록되었습니다!');
  v12CheckAchievements();
  showCourseReview();
};

// =====================
// 3. SWING SELF DIAGNOSIS
// =====================
var SWING_POINTS = [
  {name:'어드레스', icon:'&#127947;', desc:'발 너비 어깨, 무릎 살짝 굽힘, 체중 발바닥 안쪽',
   checks:['발 너비가 어깨 너비입니까?','무릎을 살짝 굽혔나요?','시선이 공을 향하고 있나요?']},
  {name:'그립', icon:'&#9995;', desc:'왼손 손가락 2-3개로 잡기, V자 턴 확인',
   checks:['그립 압력이 적당한가요?','V자가 오른쪽 어깨를 가리키나요?','손목이 자연스러운가요?']},
  {name:'테이크백', icon:'&#128260;', desc:'원피스 회전, 왼팔 신전, 클럽 헤드 일직선',
   checks:['클럽이 몸과 함께 움직이나요?','왼팔이 직선을 유지하나요?','어깨 회전이 적절한가요?']},
  {name:'탑', icon:'&#128285;', desc:'왼팔 신전 유지, 코킹 완성, 체중 오른발',
   checks:['왼팔이 완전히 펴져 있나요?','체중이 오른발에 실려 있나요?','코킹이 90도 이상인가요?']},
  {name:'다운스윗', icon:'&#128071;', desc:'하체 리드, 레이트 히트 유지, 클럽 래깅',
   checks:['하체부터 시작하나요?','클럽이 레이트로 내려오나요?','손목 각도가 유지되나요?']},
  {name:'임팩트', icon:'&#128165;', desc:'눈은 공을 보고, 손이 공보다 앞서, 체중이동',
   checks:['눈이 공을 보고 있나요?','손이 공보다 앞서 있나요?','체중이 왼발로 이동했나요?']},
  {name:'팔로스루', icon:'&#127942;', desc:'클럽 헤드 이동 확인, 양팔 신전, 밸런스',
   checks:['양팔이 완전히 펴져 있나요?','클럽 헤드가 타겟을 향하나요?','체중이 완전히 이동했나요?']},
  {name:'피니시', icon:'&#127941;', desc:'벨트 버클 향해 회전, 오른발 발끌 상태',
   checks:['벨트 버클이 타겟을 향하나요?','오른발 발끌이 들려 있나요?','밸런스가 유지되나요?']}
];

function showSwingDiagnosis() {
  var ov = v12Overlay('v12SwingOverlay');
  var saved = JSON.parse(localStorage.getItem('sg_v12_swing') || '{}');

  var html = '<div class="v12-modal"><div class="v12-hdr"><h2><span class="v12i">&#127948;</span> &#49828;&#50969; &#49472;&#54532; &#51652;&#45800;</h2><button class="v12-x" onclick="document.getElementById(\'v12SwingOverlay\').classList.remove(\'active\')">&times;</button></div>';
  html += '<p style="font-size:12px;color:var(--text-muted);margin-bottom:16px">8개 포인트별 체크리스트로 스윗 문제점을 진단해보세요.</p>';

  var totalChecked = 0, totalChecks = 0;
  SWING_POINTS.forEach(function(sp, si) {
    var ptData = saved['pt_' + si] || {};
    var checked = 0;
    sp.checks.forEach(function(ch, ci) { if (ptData['c' + ci]) checked++; });
    totalChecked += checked;
    totalChecks += sp.checks.length;
    var pct = Math.round(checked / sp.checks.length * 100);
    var color = pct >= 100 ? '#2e7d32' : pct >= 67 ? '#e65100' : '#c62828';

    html += '<div class="v12-card"><h4>' + sp.icon + ' ' + (si+1) + '. ' + sp.name + ' <span class="v12-badge" style="background:' + (pct>=100?'#e8f5e9':'#fff3e0') + ';color:' + color + '">' + pct + '%</span></h4>';
    html += '<p style="margin-bottom:10px">' + sp.desc + '</p>';
    sp.checks.forEach(function(ch, ci) {
      var isChecked = ptData['c' + ci] || false;
      html += '<label style="display:flex;align-items:center;gap:8px;padding:6px 0;font-size:13px;cursor:pointer"><input type="checkbox" class="v12-chk v12-swing-chk" data-pt="' + si + '" data-ci="' + ci + '" ' + (isChecked?'checked':'') + '> ' + ch + '</label>';
    });
    html += '<div class="v12-progress"><div class="v12-progress-fill" style="width:' + pct + '%"></div></div>';
    html += '</div>';
  });

  var overallPct = totalChecks ? Math.round(totalChecked / totalChecks * 100) : 0;
  html += '<div class="v12-card" style="border-color:var(--primary);text-align:center"><h4 style="justify-content:center">&#127942; &#51333;&#54633; &#49828;&#50969; &#51216;&#49688;</h4>';
  html += '<div style="font-size:36px;font-weight:900;color:var(--primary)">' + overallPct + '점</div>';
  html += '<div class="v12-progress" style="max-width:300px;margin:10px auto"><div class="v12-progress-fill" style="width:' + overallPct + '%"></div></div>';
  var grade = overallPct >= 90 ? 'S' : overallPct >= 75 ? 'A' : overallPct >= 60 ? 'B' : overallPct >= 40 ? 'C' : 'D';
  html += '<div style="font-size:14px;margin-top:6px"><span class="v12-badge v12-badge-' + (grade==='S'?'gold':grade==='A'?'green':grade==='B'?'blue':grade==='C'?'orange':'red') + '">등급: ' + grade + '</span></div>';
  html += '</div>';

  html += '<button class="v12-btn v12-btn-secondary" style="width:100%" onclick="localStorage.removeItem(\'sg_v12_swing\');v12Toast(\'초기화되었습니다\');showSwingDiagnosis()">&#52488;&#44592;&#54868;</button>';
  html += '</div>';

  ov.innerHTML = html;
  ov.classList.add('active');

  ov.querySelectorAll('.v12-swing-chk').forEach(function(chk) {
    chk.addEventListener('change', function() {
      var pt = this.dataset.pt;
      var ci = this.dataset.ci;
      var sd = JSON.parse(localStorage.getItem('sg_v12_swing') || '{}');
      if (!sd['pt_' + pt]) sd['pt_' + pt] = {};
      sd['pt_' + pt]['c' + ci] = this.checked;
      localStorage.setItem('sg_v12_swing', JSON.stringify(sd));
      v12CheckAchievements();
      showSwingDiagnosis();
    });
  });
}
window.showSwingDiagnosis = showSwingDiagnosis;

// =====================
// 4. GOLF DNA PROFILER
// =====================
function showGolfDNA() {
  var ov = v12Overlay('v12DNAOverlay');
  var hist = JSON.parse(localStorage.getItem('sg_v12_round_history') || '[]');

  var html = '<div class="v12-modal"><div class="v12-hdr"><h2><span class="v12i">&#129516;</span> &#44264;&#54532; DNA</h2><button class="v12-x" onclick="document.getElementById(\'v12DNAOverlay\').classList.remove(\'active\')">&times;</button></div>';

  if (hist.length < 1) {
    html += '<div style="text-align:center;padding:40px"><p style="font-size:14px;color:var(--text-muted)">라운드 기록이 필요합니다.<br>라운드 라이브에서 기록을 완성해주세요.</p></div>';
    html += '</div>';
    ov.innerHTML = html;
    ov.classList.add('active');
    return;
  }

  var avgFIR=0, avgGIR=0, avgPutts=0, avgScore=0, parSaves=0, birdies=0;
  var totalRounds = hist.length;
  hist.forEach(function(rd) {
    var rs = calcRoundStats(rd);
    avgFIR += rs.firPct;
    avgGIR += rs.girPct;
    avgPutts += parseFloat(rs.avgPutts);
    avgScore += rs.totalScore;
    rd.holes.forEach(function(h) {
      if (h.score > 0 && h.score < h.par) birdies++;
      if (h.score > 0 && h.score === h.par) parSaves++;
    });
  });

  avgFIR = Math.round(avgFIR / totalRounds);
  avgGIR = Math.round(avgGIR / totalRounds);
  avgPutts = (avgPutts / totalRounds).toFixed(1);
  avgScore = Math.round(avgScore / totalRounds);

  var axes = [
    {label:'정확성(FIR)', val: Math.min(avgFIR, 100)},
    {label:'어프로치(GIR)', val: Math.min(avgGIR, 100)},
    {label:'퍼팅', val: Math.min(100, Math.round((3 - parseFloat(avgPutts) + 1) * 50))},
    {label:'버디력', val: Math.min(100, birdies * 10)},
    {label:'파세이브', val: Math.min(100, parSaves * 5)},
    {label:'안정성', val: Math.min(100, Math.max(0, 100 - (avgScore - 72) * 3))}
  ];

  html += '<canvas id="v12DNACanvas" class="v12-radar-canvas" width="320" height="320"></canvas>';

  var dnaType = '밸런스형';
  if (avgFIR > 60 && avgGIR < 40) dnaType = '파워형 티샷';
  else if (avgGIR > 55) dnaType = '정밀 어프로치';
  else if (parseFloat(avgPutts) < 1.8) dnaType = '퍼팅 마스터';
  else if (birdies > 3) dnaType = '공격형 버디 헌터';

  html += '<div style="text-align:center;margin:16px 0"><div class="v12-badge v12-badge-gold" style="font-size:16px;padding:8px 20px">' + dnaType + '</div></div>';

  html += '<div class="v12-grid3" style="margin-top:16px">';
  html += '<div class="v12-live-stat"><div class="val">' + totalRounds + '</div><div class="lbl">총 라운드</div></div>';
  html += '<div class="v12-live-stat"><div class="val">' + avgScore + '</div><div class="lbl">평균 스코어</div></div>';
  html += '<div class="v12-live-stat"><div class="val">' + avgPutts + '</div><div class="lbl">평균 퍼팅</div></div>';
  html += '</div>';
  html += '<div class="v12-grid3" style="margin-top:8px">';
  html += '<div class="v12-live-stat"><div class="val">' + avgFIR + '%</div><div class="lbl">FIR</div></div>';
  html += '<div class="v12-live-stat"><div class="val">' + avgGIR + '%</div><div class="lbl">GIR</div></div>';
  html += '<div class="v12-live-stat"><div class="val">' + birdies + '</div><div class="lbl">버디</div></div>';
  html += '</div>';

  html += '</div>';
  ov.innerHTML = html;
  ov.classList.add('active');

  setTimeout(function() { drawRadar('v12DNACanvas', axes); }, 100);
}

function calcRoundStats(rd) {
  var played=0, totalScore=0, totalPutts=0, firs=0, girs=0, firElig=0, girElig=0, totalPar=0;
  rd.holes.forEach(function(h) {
    if (h.score > 0) {
      played++; totalScore += h.score; totalPutts += h.putts; totalPar += h.par;
      if (h.gir) girs++; girElig++;
      if (h.par >= 4) { firElig++; if (h.fir) firs++; }
    }
  });
  return {
    played: played, totalScore: totalScore, totalPar: totalPar,
    toPar: totalScore - totalPar, avgPutts: played ? (totalPutts/played).toFixed(1) : '0',
    firPct: firElig ? Math.round(firs/firElig*100) : 0,
    girPct: girElig ? Math.round(girs/girElig*100) : 0,
    totalPutts: totalPutts
  };
}

function drawRadar(canvasId, axes) {
  var canvas = document.getElementById(canvasId);
  if (!canvas) return;
  var ctx = canvas.getContext('2d');
  var w = canvas.width, h = canvas.height;
  var cx = w/2, cy = h/2, r = 110;
  var n = axes.length;
  var isDark = document.documentElement.getAttribute('data-theme') === 'dark';

  ctx.clearRect(0,0,w,h);

  for (var level=1; level<=5; level++) {
    ctx.beginPath();
    var lr = r * level / 5;
    for (var i=0; i<=n; i++) {
      var angle = (Math.PI*2/n)*i - Math.PI/2;
      var x = cx + lr * Math.cos(angle);
      var y = cy + lr * Math.sin(angle);
      if (i===0) ctx.moveTo(x,y); else ctx.lineTo(x,y);
    }
    ctx.closePath();
    ctx.strokeStyle = isDark ? 'rgba(255,255,255,.12)' : 'rgba(0,0,0,.08)';
    ctx.lineWidth = 1;
    ctx.stroke();
  }

  for (var i=0; i<n; i++) {
    var angle = (Math.PI*2/n)*i - Math.PI/2;
    ctx.beginPath();
    ctx.moveTo(cx,cy);
    ctx.lineTo(cx + r*Math.cos(angle), cy + r*Math.sin(angle));
    ctx.strokeStyle = isDark ? 'rgba(255,255,255,.1)' : 'rgba(0,0,0,.06)';
    ctx.stroke();

    var lx = cx + (r+24)*Math.cos(angle);
    var ly = cy + (r+24)*Math.sin(angle);
    ctx.font = '11px sans-serif';
    ctx.fillStyle = isDark ? '#ccc' : '#333';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(axes[i].label, lx, ly);
  }

  ctx.beginPath();
  for (var i=0; i<=n; i++) {
    var idx = i % n;
    var angle = (Math.PI*2/n)*idx - Math.PI/2;
    var val = axes[idx].val / 100;
    var x = cx + r*val*Math.cos(angle);
    var y = cy + r*val*Math.sin(angle);
    if (i===0) ctx.moveTo(x,y); else ctx.lineTo(x,y);
  }
  ctx.closePath();
  ctx.fillStyle = 'rgba(26,122,58,.25)';
  ctx.fill();
  ctx.strokeStyle = '#1a7a3a';
  ctx.lineWidth = 2.5;
  ctx.stroke();

  for (var i=0; i<n; i++) {
    var angle = (Math.PI*2/n)*i - Math.PI/2;
    var val = axes[i].val / 100;
    ctx.beginPath();
    ctx.arc(cx + r*val*Math.cos(angle), cy + r*val*Math.sin(angle), 4, 0, Math.PI*2);
    ctx.fillStyle = '#1a7a3a';
    ctx.fill();
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 2;
    ctx.stroke();
  }
}

// =====================
// 5. GREEN FEE SIMULATOR
// =====================
function showGreenFee() {
  var ov = v12Overlay('v12FeeOverlay');
  var fees = [
    {type:'주중 어리버드', weekday:55000, weekend:95000, peak:120000, offpeak:45000, color:'#2e7d32'},
    {type:'주중 일반', weekday:80000, weekend:140000, peak:170000, offpeak:65000, color:'#1565c0'},
    {type:'주말 어리버드', weekday:90000, weekend:150000, peak:180000, offpeak:75000, color:'#e65100'},
    {type:'주말 일반', weekday:120000, weekend:200000, peak:250000, offpeak:100000, color:'#c62828'},
    {type:'명문코스', weekday:180000, weekend:300000, peak:380000, offpeak:150000, color:'#7b1fa2'}
  ];

  var month = new Date().getMonth() + 1;
  var isPeak = (month >= 4 && month <= 6) || (month >= 9 && month <= 10);
  var season = isPeak ? '성수기' : (month >= 11 || month <= 2) ? '비수기' : '준성수기';

  var html = '<div class="v12-modal"><div class="v12-hdr"><h2><span class="v12i">&#128176;</span> &#44536;&#47536;&#54588; &#50696;&#52769;&#44592;</h2><button class="v12-x" onclick="document.getElementById(\'v12FeeOverlay\').classList.remove(\'active\')">&times;</button></div>';

  html += '<div class="v12-card" style="text-align:center;border-color:var(--primary)"><h4 style="justify-content:center">&#128197; ' + month + '월 현재 시즈녀</h4>';
  html += '<div class="v12-badge v12-badge-' + (isPeak?'red':'green') + '" style="font-size:14px;padding:6px 16px">' + season + '</div></div>';

  html += '<div style="margin-bottom:16px">';
  fees.forEach(function(f) {
    var current = isPeak ? f.peak : f.weekday;
    var maxFee = 400000;
    html += '<div class="v12-card"><h4>' + f.type + '</h4>';
    html += '<div class="v12-grid2" style="margin-bottom:8px">';
    html += '<div><span class="v12-label">주중</span><b style="font-size:16px">' + f.weekday.toLocaleString() + '원</b></div>';
    html += '<div><span class="v12-label">주말</span><b style="font-size:16px">' + f.weekend.toLocaleString() + '원</b></div>';
    html += '</div>';
    html += '<div class="v12-grid2">';
    html += '<div><span class="v12-label">성수기</span><b style="color:#c62828">' + f.peak.toLocaleString() + '원</b></div>';
    html += '<div><span class="v12-label">비수기</span><b style="color:#2e7d32">' + f.offpeak.toLocaleString() + '원</b></div>';
    html += '</div>';
    html += '<div class="v12-fee-bar" style="background:var(--border)"><div class="v12-fee-fill" style="width:' + Math.round(current/maxFee*100) + '%;background:' + f.color + '"><span class="v12-fee-label">' + current.toLocaleString() + '</span></div></div>';
    html += '</div>';
  });
  html += '</div>';

  html += '<div class="v12-card"><h4>&#128161; &#51208;&#50557; &#54017;</h4>';
  var tips = [
    '비수기(11월~2월) 주중 얼리버드 예약 시 최대 60% 절약',
    '오후 티오프(2시 이후) 활용 시 9홀 20~30% 할인',
    '단체 예약(16명+) 시 추가 10~15% 할인 가능',
    '골프장 멤버십 가입 시 연간 평균 25% 절약',
    '화요일/목요일이 주중 중 가장 저렴한 경우 많음'
  ];
  tips.forEach(function(tip) {
    html += '<p style="padding:4px 0;font-size:12px">&#8226; ' + tip + '</p>';
  });
  html += '</div></div>';

  ov.innerHTML = html;
  ov.classList.add('active');
}

// =====================
// 6. TOUR PRO SWING REFERENCE
// =====================
var TOUR_PROS = [
  {name:'타이거 우즈', flag:'&#127482;&#127480;', bg:'#c62828', trait:'완벽한 스윗 텔포와 멘탈 강인',
   tips:['어드레스 시 발 너비 정확히 어깨 너비','프리샷 루틴을 반드시 수행','퍼팅 시 시선을 홀에 고정']},
  {name:'로리 맥킬로이', flag:'&#127467;&#127479;', bg:'#1565c0', trait:'폭발적 파워와 유연한 회전',
   tips:['하체 회전을 최대한 활용','클럽을 자유롭게 놓아주는 릴리즈','다운스윗에서 힘을 폭발적으로 전달']},
  {name:'임성재', flag:'&#127472;&#127479;', bg:'#2e7d32', trait:'안정적인 볼 스트라이킹과 전략적 코스 공략',
   tips:['페어웨이 안착률을 최우선으로','코스 매니지먼트 중심 플레이','도그레그 피하는 안전한 플레이']},
  {name:'김주형', flag:'&#127472;&#127479;', bg:'#e65100', trait:'공격적 티샷과 대담한 퍼팅',
   tips:['드라이버 비거리를 극대화','파3 홀에서 적극적으로 버디 시도','프레셔 상황에서 담대하게 도전']},
  {name:'스카티 셰플러', flag:'&#127482;&#127480;', bg:'#7b1fa2', trait:'차분한 퍼팅과 예리한 숏 게임',
   tips:['퍼팅 라인 읽기에 시간을 투자','두 눈으로 경사를 확인하는 습관','그린 주변 숏을 연습하라']},
  {name:'븕튰르 호블란', flag:'&#127466;&#127480;', bg:'#37474f', trait:'변화무쌍한 샷 메이킹과 상상력',
   tips:['다양한 샷을 시도하는 창의적 접근','페이드/드로우 양방향 연습','바람 조건에 따른 클럽 선택']},
  {name:'존 람', flag:'&#127482;&#127480;', bg:'#1a237e', trait:'압도적 비거리와 강력한 티샷',
   tips:['백스윗 길이를 최대한 확보','하체 힘을 최대한 활용하는 회전','티 샷에서 스테이블하게 세팅']},
  {name:'박인비', flag:'&#127472;&#127479;', bg:'#006064', trait:'정확한 아이언 샷과 빠른 템포',
   tips:['빠른 스윗 템포로 일관성 유지','아이언 정확도를 위한 반복 연습','그린 주변 30야드 안쪽 집중 연습']}
];

function showTourPro() {
  var ov = v12Overlay('v12ProOverlay');
  var html = '<div class="v12-modal"><div class="v12-hdr"><h2><span class="v12i">&#127942;</span> &#53804;&#50612; &#54532;&#47196; &#49828;&#50969;</h2><button class="v12-x" onclick="document.getElementById(\'v12ProOverlay\').classList.remove(\'active\')">&times;</button></div>';
  html += '<p style="font-size:12px;color:var(--text-muted);margin-bottom:16px">세계적 투어 프로 8명의 스윗 특징과 연습 팁을 참고하세요.</p>';

  TOUR_PROS.forEach(function(pro) {
    html += '<div class="v12-pro-card">';
    html += '<div class="v12-pro-avatar" style="background:' + pro.bg + '">' + pro.flag + '</div>';
    html += '<div style="flex:1">';
    html += '<h4 style="font-size:15px;font-weight:800;margin-bottom:4px">' + pro.name + '</h4>';
    html += '<p style="font-size:12px;color:var(--text-muted);margin-bottom:8px">' + pro.trait + '</p>';
    html += '<div style="font-size:12px;font-weight:700;margin-bottom:4px">연습 팁:</div>';
    pro.tips.forEach(function(tip) {
      html += '<p style="font-size:11px;padding:2px 0">&#8226; ' + tip + '</p>';
    });
    html += '</div></div>';
  });

  html += '</div>';
  ov.innerHTML = html;
  ov.classList.add('active');
}

// =====================
// 7. GOLF TRAVEL GUIDE
// =====================
var TRAVEL_GUIDES = [
  {region:'제주도', icon:'&#127796;', color:'#e65100',
   courses:['파인비치CC','헤슬릿 나인브릿지','수안커트리클럽'],
   desc:'4계절 라운딩 가능한 한국 최고의 골프 여행지. 오션뷰와 함께 라운딩.',
   tips:['날씨: 3~5월, 10~11월 최적','바람 강한 날 많음 - 바람대비 필수','섬 특유 경사 참고']},
  {region:'강원도', icon:'&#127956;', color:'#2e7d32',
   courses:['휴등컴테리클럽','소노CC','강원공항 CC'],
   desc:'산악 지형의 아름다운 코스. 여름철 시원한 라운딩.',
   tips:['여름 고원 골프로 미세먼지 회피','경사도 높은 코스 많음 - 체력 준비','준바움 티커를 존비']},
  {region:'경상남도', icon:'&#127960;', color:'#1565c0',
   courses:['남해CC','해답곤드공원CC','통영CC'],
   desc:'해안 종주와 산악 코스가 공존. 남부 특유 따뜻한 라운딩.',
   tips:['봄가을 벼꽃 시즌에 방문 추천','해안코스는 바람이 상수','해산물 맛집과 연계']},
  {region:'전라남도', icon:'&#127806;', color:'#e65100',
   courses:['무주 CC','영암CC','여수 디오션CC'],
   desc:'넓은 평야의 편안한 코스. 미식 맛집과 함께 즐기는 곤프.',
   tips:['가을 추수철 들판 경치 감상','전남 특유 맛집 투어 결합','비수기 가곊이 합리적']},
  {region:'충청북도', icon:'&#127969;', color:'#37474f',
   courses:['테디밸리CC','한세CC','청주 CC'],
   desc:'수도권 접근성이 좋은 균형 잡힌 코스.',
   tips:['서울에서 1시간 거리 당일치기','온천과 결합 골프 여행 추천','겨울첽고 활용 비수기 할인']}
];

function showTravelGuide() {
  var ov = v12Overlay('v12TravelOverlay');
  var html = '<div class="v12-modal"><div class="v12-hdr"><h2><span class="v12i">&#9992;</span> &#44264;&#54532; &#50668;&#54665; &#44032;&#51060;&#46300;</h2><button class="v12-x" onclick="document.getElementById(\'v12TravelOverlay\').classList.remove(\'active\')">&times;</button></div>';

  TRAVEL_GUIDES.forEach(function(tg) {
    html += '<div class="v12-trip-card" style="border-left-color:' + tg.color + '">';
    html += '<h4 style="font-size:16px;font-weight:800;margin-bottom:6px">' + tg.icon + ' ' + tg.region + '</h4>';
    html += '<p style="font-size:12px;color:var(--text-muted);margin-bottom:10px">' + tg.desc + '</p>';
    html += '<div style="font-size:12px;font-weight:700;margin-bottom:6px">추천 코스:</div>';
    html += '<div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:10px">';
    tg.courses.forEach(function(c) {
      html += '<span class="v12-badge v12-badge-green">' + c + '</span>';
    });
    html += '</div>';
    html += '<div style="font-size:12px;font-weight:700;margin-bottom:4px">여행 팁:</div>';
    tg.tips.forEach(function(tip) {
      html += '<p style="font-size:11px;padding:2px 0">&#8226; ' + tip + '</p>';
    });
    html += '</div>';
  });

  html += '</div>';
  ov.innerHTML = html;
  ov.classList.add('active');
}

// =====================
// 8. WARMUP ROUTINE V3
// =====================
var WARMUP_V3 = [
  {name:'목 스트레칭', dur:30, desc:'좌우 번갈아 목을 스트레칭. 각 15초씩 유지.'},
  {name:'어깨 회전', dur:30, desc:'양팔을 큰 원을 그리며 어깨 관절 풀기. 전후 방향.'},
  {name:'허리 비틀기', dur:40, desc:'양손을 허리에 대고 좌우로 셀 버틀기. 첩추 움직임 유도.'},
  {name:'햇스트링 스트레칭', dur:35, desc:'한쪽 무릎을 굽히고 반대쪽 다리 슠기. 양쪽 번갈아.'},
  {name:'트럭크 로테이션', dur:30, desc:'양발 어깨너비. 클럽을 어깨에 대고 좌우 회전.'},
  {name:'스쿼트', dur:30, desc:'발을 어깨너비로 벌리고 앞으로 스쿼트. 10회 반복.'},
  {name:'연습 스윗 10회', dur:40, desc:'하프 스윗으로 몸을 풀기. 천천히 리듬을 잡으며.'},
  {name:'퍼팅 드릴 10회', dur:35, desc:'짧은 거리 퍼팅 10회. 거리감 파악과 터치 연습.'}
];

var warmupTimer = null;
var warmupStep = -1;
var warmupRemaining = 0;

function showWarmup() {
  var ov = v12Overlay('v12WarmupOverlay');
  renderWarmup(ov);
}

function renderWarmup(ov) {
  var html = '<div class="v12-modal"><div class="v12-hdr"><h2><span class="v12i">&#127939;</span> &#50892;&#48141;&#50629; &#47336;&#54004; v3</h2><button class="v12-x" onclick="v12StopWarmup();document.getElementById(\'v12WarmupOverlay\').classList.remove(\'active\')">&times;</button></div>';
  html += '<p style="font-size:12px;color:var(--text-muted);margin-bottom:12px">8단계 동적 스트레칭 루틴 (총 ' + WARMUP_V3.reduce(function(s,w){return s+w.dur},0) + '초)</p>';

  if (warmupStep >= 0 && warmupStep < WARMUP_V3.length) {
    var cur = WARMUP_V3[warmupStep];
    html += '<div class="v12-timer-ring">';
    html += '<svg width="120" height="120" viewBox="0 0 120 120"><circle cx="60" cy="60" r="50" fill="none" stroke="var(--border)" stroke-width="8"/>';
    var pct = warmupRemaining / cur.dur;
    var dashLen = 314;
    html += '<circle cx="60" cy="60" r="50" fill="none" stroke="var(--primary)" stroke-width="8" stroke-dasharray="' + dashLen + '" stroke-dashoffset="' + (dashLen*(1-pct)) + '" transform="rotate(-90 60 60)" stroke-linecap="round"/>';
    html += '</svg><div class="v12-timer-text">' + warmupRemaining + '</div></div>';
    html += '<div style="text-align:center;font-size:16px;font-weight:800;margin-bottom:16px">' + cur.name + '</div>';
  }

  WARMUP_V3.forEach(function(w, i) {
    var state = i < warmupStep ? 'done' : i === warmupStep ? 'active' : '';
    html += '<div class="v12-warmup-step ' + state + '">';
    html += '<div class="v12-warmup-num">' + (i < warmupStep ? '&#10003;' : (i+1)) + '</div>';
    html += '<div style="flex:1"><div style="font-size:13px;font-weight:700">' + w.name + ' <span style="font-size:11px;color:var(--text-muted)">(' + w.dur + '초)</span></div>';
    html += '<div style="font-size:11px;color:var(--text-muted)">' + w.desc + '</div></div>';
    html += '</div>';
  });

  html += '<div style="display:flex;gap:10px;margin-top:16px">';
  if (warmupStep < 0) {
    html += '<button class="v12-btn v12-btn-primary" style="flex:1" onclick="v12StartWarmup()">&#49884;&#51089;</button>';
  } else {
    html += '<button class="v12-btn v12-btn-secondary" style="flex:1" onclick="v12StopWarmup();renderWarmup(document.getElementById(\'v12WarmupOverlay\'))">&#52488;&#44592;&#54868;</button>';
  }
  html += '</div></div>';

  ov.innerHTML = html;
}

window.v12StartWarmup = function() {
  warmupStep = 0;
  warmupRemaining = WARMUP_V3[0].dur;
  v12sfx('warmup_tick');
  warmupTimer = setInterval(function() {
    warmupRemaining--;
    if (warmupRemaining <= 0) {
      warmupStep++;
      if (warmupStep >= WARMUP_V3.length) {
        clearInterval(warmupTimer);
        warmupTimer = null;
        v12sfx('warmup_done');
        v12Toast('워밍업 완료!');
        warmupStep = -1;
        v12CheckAchievements();
        renderWarmup(document.getElementById('v12WarmupOverlay'));
        return;
      }
      warmupRemaining = WARMUP_V3[warmupStep].dur;
      v12sfx('warmup_tick');
    }
    renderWarmup(document.getElementById('v12WarmupOverlay'));
  }, 1000);
  renderWarmup(document.getElementById('v12WarmupOverlay'));
};

window.v12StopWarmup = function() {
  if (warmupTimer) { clearInterval(warmupTimer); warmupTimer = null; }
  warmupStep = -1;
  warmupRemaining = 0;
};

// =====================
// 9. ACHIEVEMENTS
// =====================
var V12_ACHIEVEMENTS = [
  {id:'v12_first_round', name:'첫 라운드', desc:'라운드 라이브에서 첫 라운드 완료', icon:'&#9971;'},
  {id:'v12_5_rounds', name:'5라운드 클럽', desc:'5회 라운드 완료', icon:'&#127942;'},
  {id:'v12_first_review', name:'첫 리뷰어', desc:'코스 리뷰를 처음 작성', icon:'&#11088;'},
  {id:'v12_5_reviews', name:'리뷰 마스터', desc:'리뷰 5개 작성', icon:'&#128221;'},
  {id:'v12_swing_diag', name:'스윗 닥터', desc:'스윗 진단 전체 체크', icon:'&#127948;'},
  {id:'v12_dna_check', name:'DNA 확인', desc:'곤프 DNA 프로파일 확인', icon:'&#129516;'},
  {id:'v12_fee_check', name:'가격 분석가', desc:'그린피 예측기 사용', icon:'&#128176;'},
  {id:'v12_pro_study', name:'프로 연구가', desc:'투어 프로 스윗 참고 열람', icon:'&#127942;'},
  {id:'v12_travel_plan', name:'여행 플래너', desc:'곤프 여행 가이드 열람', icon:'&#9992;'},
  {id:'v12_warmup_done', name:'워밍업 완료', desc:'워밍업 루틴 v3 전체 완료', icon:'&#127939;'}
];

var v12Unlocked = JSON.parse(localStorage.getItem('sg_v12_achievements') || '[]');

function v12CheckAchievements() {
  var changed = false;
  var hist = JSON.parse(localStorage.getItem('sg_v12_round_history') || '[]');
  var revCount = 0;
  var revs = JSON.parse(localStorage.getItem('sg_v12_reviews') || '{}');
  Object.keys(revs).forEach(function(k) { revCount += revs[k].length; });
  var swingData = JSON.parse(localStorage.getItem('sg_v12_swing') || '{}');
  var allChecked = true;
  for (var i=0; i<8; i++) { if (!swingData['pt_'+i]) { allChecked=false; break; } else { for (var c=0;c<3;c++) { if (!swingData['pt_'+i]['c'+c]) allChecked=false; } } }

  var checks = {
    v12_first_round: hist.length >= 1,
    v12_5_rounds: hist.length >= 5,
    v12_first_review: revCount >= 1,
    v12_5_reviews: revCount >= 5,
    v12_swing_diag: allChecked,
    v12_dna_check: v12Unlocked.indexOf('v12_dna_check') >= 0,
    v12_fee_check: v12Unlocked.indexOf('v12_fee_check') >= 0,
    v12_pro_study: v12Unlocked.indexOf('v12_pro_study') >= 0,
    v12_travel_plan: v12Unlocked.indexOf('v12_travel_plan') >= 0,
    v12_warmup_done: v12Unlocked.indexOf('v12_warmup_done') >= 0
  };

  V12_ACHIEVEMENTS.forEach(function(ach) {
    if (checks[ach.id] && v12Unlocked.indexOf(ach.id) < 0) {
      v12Unlocked.push(ach.id);
      changed = true;
      v12sfx('achieve');
      v12Toast(ach.icon + ' 업적 달성: ' + ach.name);
    }
  });

  if (changed) localStorage.setItem('sg_v12_achievements', JSON.stringify(v12Unlocked));
}

function v12MarkAchievement(id) {
  if (v12Unlocked.indexOf(id) < 0) {
    v12Unlocked.push(id);
    localStorage.setItem('sg_v12_achievements', JSON.stringify(v12Unlocked));
    var ach = V12_ACHIEVEMENTS.find(function(a){return a.id===id;});
    if (ach) { v12sfx('achieve'); v12Toast(ach.icon + ' 업적 달성: ' + ach.name); }
  }
}

// =====================
// QUICK ACTION BUTTONS
// =====================
function v12AddButtons() {
  var container = document.querySelector('.search-section') || document.querySelector('.header');
  if (!container) return;

  var existing = document.getElementById('v12QuickActions');
  if (existing) return;

  var bar = document.createElement('div');
  bar.id = 'v12QuickActions';
  bar.style.cssText = 'display:flex;gap:6px;flex-wrap:wrap;padding:8px 0;max-width:1400px;margin:0 auto';

  var btns = [
    {label:'&#9971; 라운드 라이브', fn: showRoundLive},
    {label:'&#11088; 코스 리뷰', fn: showCourseReview},
    {label:'&#127948; 스윗 진단', fn: showSwingDiagnosis},
    {label:'&#129516; 골프 DNA', fn: function(){ v12MarkAchievement('v12_dna_check'); showGolfDNA(); }},
    {label:'&#128176; 그린피', fn: function(){ v12MarkAchievement('v12_fee_check'); showGreenFee(); }},
    {label:'&#127942; 프로 스윗', fn: function(){ v12MarkAchievement('v12_pro_study'); showTourPro(); }},
    {label:'&#9992; 여행', fn: function(){ v12MarkAchievement('v12_travel_plan'); showTravelGuide(); }},
    {label:'&#127939; 워밍업', fn: showWarmup}
  ];

  btns.forEach(function(b) {
    var btn = document.createElement('button');
    btn.className = 'v12-btn v12-btn-sm v12-btn-secondary';
    btn.innerHTML = b.label;
    btn.addEventListener('click', b.fn);
    bar.appendChild(btn);
  });

  container.parentNode.insertBefore(bar, container.nextSibling);
}

// =====================
// KEYBOARD SHORTCUTS
// =====================
document.addEventListener('keydown', function(e) {
  var tag = e.target.tagName;
  if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;
  switch(e.key.toLowerCase()) {
    case 'l': showRoundLive(); break;
    case 'w': showCourseReview(); break;
    case 'x': showSwingDiagnosis(); break;
    case 'z': showGolfDNA(); v12MarkAchievement('v12_dna_check'); break;
    case 'f': showGreenFee(); v12MarkAchievement('v12_fee_check'); break;
  }
});

document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    ['v12RoundOverlay','v12ReviewOverlay','v12SwingOverlay','v12DNAOverlay','v12FeeOverlay','v12ProOverlay','v12TravelOverlay','v12WarmupOverlay'].forEach(function(id) {
      var el = document.getElementById(id);
      if (el) el.classList.remove('active');
    });
    v12StopWarmup();
  }
});

// --- HTML escape ---
function v12Esc(s) {
  var d = document.createElement('div');
  d.textContent = s;
  return d.innerHTML;
}

// --- Init ---
function v12Init() {
  v12AddButtons();
  v12CheckAchievements();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', v12Init);
} else {
  v12Init();
}

})();
