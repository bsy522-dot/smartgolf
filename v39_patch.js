(function () {
  'use strict';

  // ===== LOCALSTORAGE HELPER =====
  var LS = function (k, v) {
    return v === undefined
      ? JSON.parse(localStorage.getItem('sg39_' + k) || 'null')
      : localStorage.setItem('sg39_' + k, JSON.stringify(v));
  };

  // ===== SFX ENGINE (16 new SFX, 316->332) =====
  var sfxCtx = null;
  function sg39sfx(name) {
    if (!sfxCtx) {
      try { sfxCtx = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) { return; }
    }
    var map = {
      diff_scan:       { f: 460, d: 0.18, t: 'sine', v: 0.22 },
      diff_grade:      { f: 700, d: 0.25, t: 'triangle', v: 0.28 },
      practice_plan:   { f: 520, d: 0.15, t: 'sine', v: 0.2 },
      practice_opt:    { f: 680, d: 0.22, t: 'triangle', v: 0.3 },
      trend_plot:      { f: 400, d: 0.2, t: 'sine', v: 0.18 },
      trend_predict:   { f: 620, d: 0.28, t: 'triangle', v: 0.26 },
      grip_scan:       { f: 380, d: 0.15, t: 'square', v: 0.16 },
      grip_optimal:    { f: 740, d: 0.2, t: 'sine', v: 0.28 },
      fairway_hit:     { f: 550, d: 0.18, t: 'sine', v: 0.22 },
      fairway_strat:   { f: 660, d: 0.22, t: 'triangle', v: 0.26 },
      rhythm_wave:     { f: 340, d: 0.3, t: 'sawtooth', v: 0.14 },
      rhythm_flow:     { f: 580, d: 0.2, t: 'triangle', v: 0.24 },
      iqgrow_plot:     { f: 490, d: 0.18, t: 'sine', v: 0.2 },
      iqgrow_up:       { f: 820, d: 0.25, t: 'triangle', v: 0.3 },
      bench_radar:     { f: 440, d: 0.2, t: 'sine', v: 0.22 },
      achieve_v39:     { f: 900, d: 0.35, t: 'sine', v: 0.32 }
    };
    var s = map[name];
    if (!s) return;
    var osc = sfxCtx.createOscillator();
    var gain = sfxCtx.createGain();
    osc.type = s.t;
    osc.frequency.value = s.f;
    gain.gain.setValueAtTime(s.v, sfxCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, sfxCtx.currentTime + s.d);
    osc.connect(gain);
    gain.connect(sfxCtx.destination);
    osc.start(sfxCtx.currentTime);
    osc.stop(sfxCtx.currentTime + s.d);
  }

  // ===== CSS =====
  var css39 = document.createElement('style');
  css39.textContent = [
    '.sg39-overlay{position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,.88);z-index:10090;display:none;align-items:center;justify-content:center;backdrop-filter:blur(20px)}',
    '.sg39-overlay.active{display:flex}',
    '.sg39-panel{background:#1a1a2e;border-radius:24px;padding:28px;width:96%;max-width:720px;max-height:92vh;overflow-y:auto;box-shadow:0 40px 120px rgba(0,0,0,.7);animation:sg39Rise .35s cubic-bezier(.22,1,.36,1)}',
    '@keyframes sg39Rise{from{opacity:0;transform:translateY(40px) scale(.92)}to{opacity:1;transform:translateY(0) scale(1)}}',
    '.sg39-hdr{display:flex;justify-content:space-between;align-items:center;margin-bottom:18px;padding-bottom:14px;border-bottom:1px solid rgba(255,255,255,.1)}',
    '.sg39-hdr h2{font-size:20px;font-weight:800;color:#fff;display:flex;align-items:center;gap:10px}',
    '.sg39-hdr-icon{font-size:26px}',
    '.sg39-x{background:none;border:none;font-size:28px;cursor:pointer;color:rgba(255,255,255,.5);padding:4px 10px;border-radius:10px;transition:.2s}',
    '.sg39-x:hover{background:rgba(255,255,255,.1);color:#fff}',
    '.sg39-card{background:rgba(255,255,255,.06);border-radius:16px;padding:18px;margin-bottom:12px;border:1px solid rgba(255,255,255,.08);transition:.25s}',
    '.sg39-card:hover{border-color:rgba(255,255,255,.2);transform:translateY(-1px)}',
    '.sg39-card h4{font-size:14px;font-weight:700;color:#fff;margin-bottom:8px;display:flex;align-items:center;gap:8px}',
    '.sg39-card p{font-size:12px;color:rgba(255,255,255,.6);line-height:1.7}',
    '.sg39-grade{display:inline-flex;align-items:center;justify-content:center;width:42px;height:42px;border-radius:50%;font-size:18px;font-weight:900;color:#fff}',
    '.sg39-grade-s{background:linear-gradient(135deg,#ffd700,#ffaa00)}',
    '.sg39-grade-a{background:linear-gradient(135deg,#2ecc71,#27ae60)}',
    '.sg39-grade-b{background:linear-gradient(135deg,#3498db,#2980b9)}',
    '.sg39-grade-c{background:linear-gradient(135deg,#e67e22,#d35400)}',
    '.sg39-grade-d{background:linear-gradient(135deg,#e74c3c,#c0392b)}',
    '.sg39-btn{padding:10px 22px;border:none;border-radius:12px;font-size:13px;font-weight:700;cursor:pointer;transition:.25s;display:inline-flex;align-items:center;gap:6px;color:#fff}',
    '.sg39-btn:hover{transform:translateY(-2px);box-shadow:0 6px 18px rgba(0,0,0,.3)}',
    '.sg39-tabs{display:flex;gap:6px;margin-bottom:16px;overflow-x:auto;padding-bottom:4px;scrollbar-width:none}',
    '.sg39-tabs::-webkit-scrollbar{display:none}',
    '.sg39-tab{padding:9px 18px;border-radius:22px;border:1.5px solid rgba(255,255,255,.15);background:transparent;font-size:11px;font-weight:700;cursor:pointer;white-space:nowrap;transition:.25s;color:rgba(255,255,255,.6)}',
    '.sg39-tab.active{background:#e74c3c;color:#fff;border-color:#e74c3c;box-shadow:0 3px 14px rgba(231,76,60,.35)}',
    '.sg39-stat{display:flex;justify-content:space-between;align-items:center;padding:12px 0;border-bottom:1px solid rgba(255,255,255,.08);color:#fff;font-size:13px}',
    '.sg39-stat:last-child{border-bottom:none}',
    '.sg39-stat-val{font-weight:800;font-size:15px}',
    '.sg39-progress{width:100%;height:12px;background:rgba(255,255,255,.1);border-radius:6px;overflow:hidden;margin:6px 0}',
    '.sg39-progress-fill{height:100%;border-radius:6px;transition:width .6s cubic-bezier(.22,1,.36,1)}'
  ].join('\n');
  document.head.appendChild(css39);

  // ===== ACHIEVEMENT SYSTEM (15 new, 317->332) =====
  var achievements = [
    { id: 'diff_analyst', name: '코스분석가', desc: '코스난이도열분해기 3회 사용', icon: '🏔️', req: 3, key: 'diff_use' },
    { id: 'diff_master', name: '난이도정복자', desc: '모든 난이도요소 S등급', icon: '⛰️', req: 1, key: 'diff_all_s' },
    { id: 'practice_planner', name: '연습설계사', desc: '프랙티스세션 5회 최적화', icon: '📐', req: 5, key: 'practice_opt' },
    { id: 'practice_guru', name: '연습달인', desc: '연습효율 90% 이상 달성', icon: '🎓', req: 1, key: 'practice_90' },
    { id: 'trend_watcher', name: '추세관찰자', desc: '스코어추세예측 3회 실행', icon: '📉', req: 3, key: 'trend_use' },
    { id: 'trend_prophet', name: '스코어예언자', desc: '예측 정확도 85% 이상', icon: '🔮', req: 1, key: 'trend_85' },
    { id: 'grip_scientist', name: '그립과학자', desc: '그립압력분석 5회 실행', icon: '✊', req: 5, key: 'grip_use' },
    { id: 'fairway_sniper', name: '페어웨이저격수', desc: '페어웨이적중 80% 이상 달성', icon: '🎯', req: 1, key: 'fwy_80' },
    { id: 'rhythm_keeper', name: '리듬수호자', desc: '라운드리듬 A등급 이상', icon: '🎵', req: 1, key: 'rhythm_a' },
    { id: 'rhythm_master', name: '페이스마스터', desc: '리듬분석 5회 실행', icon: '⏱️', req: 5, key: 'rhythm_use' },
    { id: 'iq_historian', name: 'IQ역사가', desc: 'IQ성장추적기 열람', icon: '📊', req: 1, key: 'iqgrow_view' },
    { id: 'iq_climber', name: 'IQ상승자', desc: 'IQ 점수 3회 연속 상승', icon: '🧗', req: 1, key: 'iq_streak3' },
    { id: 'benchmark_viewer', name: '벤치마크분석가', desc: '경쟁력분석 3회 실행', icon: '🏅', req: 3, key: 'bench_use' },
    { id: 'golf_iq_v23_master', name: 'Golf IQ v23 마스터', desc: 'v23 퀴즈 12문제 이상 정답', icon: '🧠', req: 1, key: 'iq_v23_pass' },
    { id: 'v39_explorer', name: 'v39 탐험가', desc: 'v39 기능 5개 이상 사용', icon: '🚀', req: 5, key: 'v39_feat_use' }
  ];

  function unlockAchieve(id) {
    var key = 'sg39_achieve_' + id;
    if (localStorage.getItem(key)) return;
    localStorage.setItem(key, Date.now());
    sg39sfx('achieve_v39');
    var a = achievements.find(function (x) { return x.id === id; });
    if (!a) return;
    var toast = document.createElement('div');
    toast.style.cssText = 'position:fixed;top:80px;left:50%;transform:translateX(-50%);background:linear-gradient(135deg,#ffd700,#ffaa00);color:#1a1a2e;padding:14px 28px;border-radius:16px;font-size:14px;font-weight:800;z-index:99999;box-shadow:0 8px 32px rgba(255,215,0,.4);animation:sg39Rise .4s cubic-bezier(.22,1,.36,1);display:flex;align-items:center;gap:8px';
    toast.innerHTML = '<span style="font-size:22px">' + a.icon + '</span> 업적 달성! ' + a.name;
    document.body.appendChild(toast);
    setTimeout(function () { toast.remove(); }, 3500);
    trackV39Use();
  }

  function trackV39Use() {
    var cnt = parseInt(localStorage.getItem('sg39_feat_count') || '0', 10) + 1;
    localStorage.setItem('sg39_feat_count', cnt);
    if (cnt >= 5) unlockAchieve('v39_explorer');
  }

  // ===== UTILITY =====
  function gradeLabel(score, total) {
    var p = score / total;
    return p >= 0.9 ? 'S' : p >= 0.75 ? 'A' : p >= 0.6 ? 'B' : p >= 0.4 ? 'C' : 'D';
  }
  function gradeClass(score, total) {
    var p = score / total;
    return 'sg39-grade-' + (p >= 0.9 ? 's' : p >= 0.75 ? 'a' : p >= 0.6 ? 'b' : p >= 0.4 ? 'c' : 'd');
  }
  function valGrade(v, max) {
    var p = v / max;
    return p >= 0.9 ? 'S' : p >= 0.75 ? 'A' : p >= 0.6 ? 'B' : p >= 0.4 ? 'C' : 'D';
  }
  function valGradeColor(g) {
    return { S: '#ffd700', A: '#2ecc71', B: '#3498db', C: '#e67e22', D: '#e74c3c' }[g] || '#999';
  }

  function makeOverlay(id) {
    var ov = document.getElementById(id);
    if (ov) { ov.classList.add('active'); return ov.querySelector('.sg39-panel'); }
    ov = document.createElement('div');
    ov.id = id;
    ov.className = 'sg39-overlay';
    ov.innerHTML = '<div class="sg39-panel"></div>';
    ov.addEventListener('click', function (e) { if (e.target === ov) ov.classList.remove('active'); });
    document.body.appendChild(ov);
    ov.classList.add('active');
    return ov.querySelector('.sg39-panel');
  }

  // ===== FEATURE 1: Course Difficulty Decomposition Canvas 620x400 =====
  function openCourseDifficultyDecomp() {
    sg39sfx('diff_scan');
    var panel = makeOverlay('sg39DiffOv');
    panel.innerHTML = '<div class="sg39-hdr"><h2><span class="sg39-hdr-icon">🏔️</span>코스 난이도 열분해기</h2><button class="sg39-x" onclick="document.getElementById(\'sg39DiffOv\').classList.remove(\'active\')">&times;</button></div><div id="sg39DiffBody"></div>';
    var body = document.getElementById('sg39DiffBody');

    var holes = [];
    for (var i = 0; i < 9; i++) {
      holes.push({
        hole: i + 1,
        distance: 40 + Math.floor(Math.random() * 55),
        hazard: 30 + Math.floor(Math.random() * 65),
        greenSlope: 25 + Math.floor(Math.random() * 70),
        ob: 20 + Math.floor(Math.random() * 60),
        wind: 35 + Math.floor(Math.random() * 55),
        bunker: 30 + Math.floor(Math.random() * 60)
      });
    }
    var factors = ['거리', '해저드', '그린경사', 'OB위험', '바람노출', '벙커'];
    var factorKeys = ['distance', 'hazard', 'greenSlope', 'ob', 'wind', 'bunker'];
    var factorColors = ['#e74c3c', '#3498db', '#2ecc71', '#e67e22', '#9b59b6', '#f1c40f'];

    var canvas = document.createElement('canvas');
    canvas.width = 620; canvas.height = 400;
    canvas.style.cssText = 'width:100%;max-width:620px;display:block;margin:0 auto 16px;border-radius:12px';
    body.appendChild(canvas);
    var ctx = canvas.getContext('2d');

    function draw(hoverHole, hoverFactor) {
      ctx.clearRect(0, 0, 620, 400);
      ctx.fillStyle = '#0d1117';
      ctx.fillRect(0, 0, 620, 400);

      var left = 80, top = 50, cellW = 52, cellH = 42;
      var right = left + cellW * 9, bottom = top + cellH * 6;

      ctx.font = '700 13px sans-serif';
      ctx.fillStyle = '#fff';
      ctx.textAlign = 'center';
      ctx.fillText('코스 난이도 열분해기', 310, 28);
      ctx.font = '10px sans-serif';
      ctx.fillStyle = 'rgba(255,255,255,.5)';
      ctx.fillText('9홀 x 6난이도요소 히트맵 (클릭: 상세)', 310, 42);

      for (var h = 0; h < 9; h++) {
        ctx.fillStyle = hoverHole === h ? '#ffd700' : 'rgba(255,255,255,.7)';
        ctx.font = '700 11px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('H' + (h + 1), left + h * cellW + cellW / 2, top - 8);
      }
      for (var f = 0; f < 6; f++) {
        ctx.fillStyle = hoverFactor === f ? '#ffd700' : 'rgba(255,255,255,.7)';
        ctx.font = '10px sans-serif';
        ctx.textAlign = 'right';
        ctx.fillText(factors[f], left - 8, top + f * cellH + cellH / 2 + 4);
      }

      for (var hi = 0; hi < 9; hi++) {
        for (var fi = 0; fi < 6; fi++) {
          var val = holes[hi][factorKeys[fi]];
          var intensity = val / 100;
          var r = Math.floor(231 * intensity + 52 * (1 - intensity));
          var g = Math.floor(76 * intensity + 152 * (1 - intensity));
          var b = Math.floor(60 * intensity + 219 * (1 - intensity));
          ctx.fillStyle = 'rgb(' + r + ',' + g + ',' + b + ')';
          var cx = left + hi * cellW, cy = top + fi * cellH;
          var isHover = (hoverHole === hi && hoverFactor === fi);
          ctx.fillRect(cx + 2, cy + 2, cellW - 4, cellH - 4);
          if (isHover) {
            ctx.strokeStyle = '#ffd700';
            ctx.lineWidth = 2;
            ctx.strokeRect(cx + 1, cy + 1, cellW - 2, cellH - 2);
          }
          ctx.fillStyle = intensity > 0.6 ? '#fff' : 'rgba(255,255,255,.8)';
          ctx.font = '700 12px sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText(val, cx + cellW / 2, cy + cellH / 2 + 4);
        }
      }

      ctx.font = '10px sans-serif';
      ctx.fillStyle = 'rgba(255,255,255,.5)';
      var labels = ['낮음', '', '보통', '', '높음'];
      for (var li = 0; li < 5; li++) {
        var lx = left + li * ((right - left) / 4);
        ctx.textAlign = 'center';
        ctx.fillText(labels[li], lx, bottom + 30);
      }
      var gw = right - left;
      var grd = ctx.createLinearGradient(left, 0, right, 0);
      grd.addColorStop(0, 'rgb(52,152,219)');
      grd.addColorStop(0.5, 'rgb(241,196,15)');
      grd.addColorStop(1, 'rgb(231,76,60)');
      ctx.fillStyle = grd;
      ctx.fillRect(left, bottom + 15, gw, 8);

      var totalByHole = [];
      for (var th = 0; th < 9; th++) {
        var sum = 0;
        factorKeys.forEach(function (fk) { sum += holes[th][fk]; });
        totalByHole.push(sum);
      }
      var maxTotal = Math.max.apply(null, totalByHole);
      var hardest = totalByHole.indexOf(maxTotal);

      ctx.font = '700 11px sans-serif';
      ctx.textAlign = 'left';
      ctx.fillStyle = '#e74c3c';
      ctx.fillText('최난이도: H' + (hardest + 1) + ' (종합 ' + maxTotal + ')', left, bottom + 55);
      var avgTotal = Math.round(totalByHole.reduce(function (a, b) { return a + b; }, 0) / 9);
      ctx.fillStyle = '#3498db';
      ctx.fillText('평균 난이도: ' + avgTotal, left + 220, bottom + 55);

      var overallGrade = valGrade(avgTotal, 600);
      ctx.fillStyle = valGradeColor(overallGrade);
      ctx.font = '700 28px sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText(overallGrade, 590, bottom + 60);
    }

    draw(-1, -1);

    canvas.addEventListener('mousemove', function (e) {
      var rect = canvas.getBoundingClientRect();
      var sx = 620 / rect.width;
      var mx = (e.clientX - rect.left) * sx;
      var my = (e.clientY - rect.top) * (400 / rect.height);
      var left = 80, top = 50, cellW = 52, cellH = 42;
      var hi = Math.floor((mx - left) / cellW);
      var fi = Math.floor((my - top) / cellH);
      if (hi >= 0 && hi < 9 && fi >= 0 && fi < 6) {
        draw(hi, fi);
      } else {
        draw(-1, -1);
      }
    });

    canvas.addEventListener('click', function () {
      sg39sfx('diff_grade');
      var cnt = parseInt(localStorage.getItem('sg39_diff_use') || '0', 10) + 1;
      localStorage.setItem('sg39_diff_use', cnt);
      if (cnt >= 3) unlockAchieve('diff_analyst');
    });

    body.innerHTML += '<div class="sg39-card"><h4>📋 난이도 요소 설명</h4><p>거리: 홀 전장 대비 난이도 | 해저드: 워터/크릭 위험도 | 그린경사: 언듈레이션 | OB위험: OB구역 근접도 | 바람노출: 개방 지형 바람 영향 | 벙커: 벙커 배치 난이도</p></div>';
    trackV39Use();
  }

  // ===== FEATURE 2: Practice Session Optimizer Canvas 640x400 =====
  function openPracticeSessionOptimizer() {
    sg39sfx('practice_plan');
    var panel = makeOverlay('sg39PracticeOv');
    panel.innerHTML = '<div class="sg39-hdr"><h2><span class="sg39-hdr-icon">📐</span>프랙티스 세션 옵티마이저</h2><button class="sg39-x" onclick="document.getElementById(\'sg39PracticeOv\').classList.remove(\'active\')">&times;</button></div><div id="sg39PracticeBody"></div>';
    var body = document.getElementById('sg39PracticeBody');

    var areas = [
      { name: '드라이버', time: 15, efficiency: 72, icon: '🏌️' },
      { name: '아이언', time: 20, efficiency: 78, icon: '⛳' },
      { name: '웨지', time: 15, efficiency: 85, icon: '🎯' },
      { name: '퍼팅', time: 20, efficiency: 88, icon: '🕳️' },
      { name: '벙커', time: 10, efficiency: 65, icon: '⛱️' },
      { name: '칩샷', time: 10, efficiency: 80, icon: '🏷️' },
      { name: '피치샷', time: 5, efficiency: 70, icon: '📏' },
      { name: '스트레칭', time: 5, efficiency: 92, icon: '🧘' }
    ];
    var totalTime = areas.reduce(function (s, a) { return s + a.time; }, 0);

    var tabs = ['시간배분', '효율분석'];
    var activeTab = 0;

    var tabsDiv = document.createElement('div');
    tabsDiv.className = 'sg39-tabs';
    tabs.forEach(function (t, i) {
      var btn = document.createElement('button');
      btn.className = 'sg39-tab' + (i === 0 ? ' active' : '');
      btn.textContent = t;
      btn.onclick = function () {
        activeTab = i;
        tabsDiv.querySelectorAll('.sg39-tab').forEach(function (b, j) { b.classList.toggle('active', j === i); });
        drawPractice();
      };
      tabsDiv.appendChild(btn);
    });
    body.appendChild(tabsDiv);

    var canvas = document.createElement('canvas');
    canvas.width = 640; canvas.height = 400;
    canvas.style.cssText = 'width:100%;max-width:640px;display:block;margin:0 auto 16px;border-radius:12px';
    body.appendChild(canvas);
    var ctx = canvas.getContext('2d');

    var donutColors = ['#e74c3c', '#3498db', '#f1c40f', '#2ecc71', '#e67e22', '#9b59b6', '#1abc9c', '#34495e'];

    function drawPractice() {
      ctx.clearRect(0, 0, 640, 400);
      ctx.fillStyle = '#0d1117';
      ctx.fillRect(0, 0, 640, 400);

      ctx.font = '700 13px sans-serif';
      ctx.fillStyle = '#fff';
      ctx.textAlign = 'center';
      ctx.fillText(activeTab === 0 ? '연습 시간 배분 (총 ' + totalTime + '분)' : '영역별 연습 효율 분석', 320, 28);

      if (activeTab === 0) {
        var cx = 200, cy = 210, r = 120, ir = 60;
        var startAngle = -Math.PI / 2;
        areas.forEach(function (a, i) {
          var sliceAngle = (a.time / totalTime) * Math.PI * 2;
          ctx.beginPath();
          ctx.moveTo(cx + Math.cos(startAngle) * ir, cy + Math.sin(startAngle) * ir);
          ctx.arc(cx, cy, r, startAngle, startAngle + sliceAngle);
          ctx.arc(cx, cy, ir, startAngle + sliceAngle, startAngle, true);
          ctx.closePath();
          ctx.fillStyle = donutColors[i];
          ctx.fill();

          var midAngle = startAngle + sliceAngle / 2;
          var lx = cx + Math.cos(midAngle) * (r + 18);
          var ly = cy + Math.sin(midAngle) * (r + 18);
          ctx.fillStyle = donutColors[i];
          ctx.font = '700 10px sans-serif';
          ctx.textAlign = midAngle > Math.PI / 2 && midAngle < Math.PI * 1.5 ? 'right' : 'left';
          ctx.fillText(a.name + ' ' + a.time + '분', lx, ly);

          startAngle += sliceAngle;
        });

        ctx.fillStyle = '#fff';
        ctx.font = '700 18px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(totalTime + '분', cx, cy + 6);
        ctx.font = '10px sans-serif';
        ctx.fillStyle = 'rgba(255,255,255,.5)';
        ctx.fillText('총 연습시간', cx, cy + 22);

        var legendX = 400, legendY = 60;
        areas.forEach(function (a, i) {
          ctx.fillStyle = donutColors[i];
          ctx.fillRect(legendX, legendY + i * 36, 14, 14);
          ctx.fillStyle = '#fff';
          ctx.font = '12px sans-serif';
          ctx.textAlign = 'left';
          ctx.fillText(a.icon + ' ' + a.name, legendX + 22, legendY + i * 36 + 12);
          ctx.fillStyle = 'rgba(255,255,255,.5)';
          ctx.font = '10px sans-serif';
          ctx.fillText(Math.round(a.time / totalTime * 100) + '%', legendX + 130, legendY + i * 36 + 12);
        });
      } else {
        var barLeft = 120, barTop = 55, barH = 30, gap = 10;
        var maxEff = 100;
        areas.forEach(function (a, i) {
          var y = barTop + i * (barH + gap);
          var barW = (a.efficiency / maxEff) * 380;
          ctx.fillStyle = 'rgba(255,255,255,.08)';
          ctx.fillRect(barLeft, y, 380, barH);
          var grd = ctx.createLinearGradient(barLeft, 0, barLeft + barW, 0);
          grd.addColorStop(0, donutColors[i]);
          grd.addColorStop(1, donutColors[i] + '88');
          ctx.fillStyle = grd;
          ctx.fillRect(barLeft, y, barW, barH);

          ctx.fillStyle = 'rgba(255,255,255,.7)';
          ctx.font = '11px sans-serif';
          ctx.textAlign = 'right';
          ctx.fillText(a.icon + ' ' + a.name, barLeft - 8, y + barH / 2 + 4);

          ctx.fillStyle = '#fff';
          ctx.font = '700 12px sans-serif';
          ctx.textAlign = 'left';
          ctx.fillText(a.efficiency + '%', barLeft + barW + 8, y + barH / 2 + 4);

          var g = valGrade(a.efficiency, 100);
          ctx.fillStyle = valGradeColor(g);
          ctx.font = '700 14px sans-serif';
          ctx.textAlign = 'left';
          ctx.fillText(g, barLeft + barW + 50, y + barH / 2 + 5);
        });

        var avgEff = Math.round(areas.reduce(function (s, a) { return s + a.efficiency; }, 0) / areas.length);
        var overallG = valGrade(avgEff, 100);
        ctx.fillStyle = 'rgba(255,255,255,.1)';
        ctx.fillRect(barLeft, barTop + 8 * (barH + gap) + 10, 380, 2);
        ctx.fillStyle = '#fff';
        ctx.font = '700 13px sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText('평균 효율: ' + avgEff + '%', barLeft, barTop + 8 * (barH + gap) + 35);
        ctx.fillStyle = valGradeColor(overallG);
        ctx.font = '700 28px sans-serif';
        ctx.textAlign = 'right';
        ctx.fillText(overallG, 580, barTop + 8 * (barH + gap) + 40);
      }
    }

    drawPractice();
    canvas.addEventListener('click', function () {
      sg39sfx('practice_opt');
      var cnt = parseInt(localStorage.getItem('sg39_practice_opt') || '0', 10) + 1;
      localStorage.setItem('sg39_practice_opt', cnt);
      if (cnt >= 5) unlockAchieve('practice_planner');
    });

    body.innerHTML += '<div class="sg39-card"><h4>💡 최적화 팁</h4><p>쇼트게임(웨지+칩+퍼팅)에 총 연습시간의 45% 이상 배분하면 스코어 개선 효과가 가장 큽니다. 현재 배분: ' + Math.round((areas[2].time + areas[3].time + areas[5].time) / totalTime * 100) + '%</p></div>';
    trackV39Use();
  }

  // ===== FEATURE 3: Score Trend Predictor Canvas 620x400 =====
  function openScoreTrendPredictor() {
    sg39sfx('trend_plot');
    var panel = makeOverlay('sg39TrendOv');
    panel.innerHTML = '<div class="sg39-hdr"><h2><span class="sg39-hdr-icon">📈</span>스코어 추세 예측기</h2><button class="sg39-x" onclick="document.getElementById(\'sg39TrendOv\').classList.remove(\'active\')">&times;</button></div><div id="sg39TrendBody"></div>';
    var body = document.getElementById('sg39TrendBody');

    var rounds = [];
    var base = 92;
    for (var i = 0; i < 20; i++) {
      base = Math.max(72, Math.min(105, base + (Math.random() - 0.55) * 4));
      rounds.push(Math.round(base * 10) / 10);
    }
    var predicted = [];
    var trend = (rounds[rounds.length - 1] - rounds[0]) / rounds.length;
    var lastVal = rounds[rounds.length - 1];
    for (var p = 0; p < 5; p++) {
      lastVal = Math.max(70, lastVal + trend + (Math.random() - 0.5) * 1.5);
      predicted.push(Math.round(lastVal * 10) / 10);
    }

    var canvas = document.createElement('canvas');
    canvas.width = 620; canvas.height = 400;
    canvas.style.cssText = 'width:100%;max-width:620px;display:block;margin:0 auto 16px;border-radius:12px';
    body.appendChild(canvas);
    var ctx = canvas.getContext('2d');

    var allScores = rounds.concat(predicted);
    var minS = Math.floor(Math.min.apply(null, allScores) - 3);
    var maxS = Math.ceil(Math.max.apply(null, allScores) + 3);

    function drawTrend(hoverIdx) {
      ctx.clearRect(0, 0, 620, 400);
      ctx.fillStyle = '#0d1117';
      ctx.fillRect(0, 0, 620, 400);

      ctx.font = '700 13px sans-serif';
      ctx.fillStyle = '#fff';
      ctx.textAlign = 'center';
      ctx.fillText('스코어 추세 예측 (20라운드 + 5라운드 예측)', 310, 28);

      var left = 60, right = 580, top = 55, bottom = 350;
      var total = 25;
      var xStep = (right - left) / (total - 1);
      var yRange = maxS - minS;

      for (var g = 0; g <= 4; g++) {
        var gy = top + (bottom - top) * g / 4;
        ctx.strokeStyle = 'rgba(255,255,255,.08)';
        ctx.beginPath(); ctx.moveTo(left, gy); ctx.lineTo(right, gy); ctx.stroke();
        ctx.fillStyle = 'rgba(255,255,255,.4)';
        ctx.font = '10px sans-serif';
        ctx.textAlign = 'right';
        ctx.fillText(Math.round(maxS - yRange * g / 4), left - 8, gy + 4);
      }

      ctx.fillStyle = 'rgba(46,204,113,.08)';
      ctx.fillRect(left + 20 * xStep - xStep / 2, top, 5 * xStep + xStep / 2, bottom - top);
      ctx.fillStyle = 'rgba(46,204,113,.3)';
      ctx.font = '10px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('예측 구간', left + 22 * xStep, top - 6);

      ctx.strokeStyle = '#3498db';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      rounds.forEach(function (s, i) {
        var x = left + i * xStep;
        var y = top + (maxS - s) / yRange * (bottom - top);
        if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      });
      ctx.stroke();

      ctx.strokeStyle = '#2ecc71';
      ctx.lineWidth = 2;
      ctx.setLineDash([6, 4]);
      ctx.beginPath();
      var lastPt = rounds[rounds.length - 1];
      ctx.moveTo(left + 19 * xStep, top + (maxS - lastPt) / yRange * (bottom - top));
      predicted.forEach(function (s, i) {
        var x = left + (20 + i) * xStep;
        var y = top + (maxS - s) / yRange * (bottom - top);
        ctx.lineTo(x, y);
      });
      ctx.stroke();
      ctx.setLineDash([]);

      rounds.forEach(function (s, i) {
        var x = left + i * xStep;
        var y = top + (maxS - s) / yRange * (bottom - top);
        ctx.fillStyle = hoverIdx === i ? '#ffd700' : '#3498db';
        ctx.beginPath(); ctx.arc(x, y, hoverIdx === i ? 6 : 4, 0, Math.PI * 2); ctx.fill();
      });
      predicted.forEach(function (s, i) {
        var x = left + (20 + i) * xStep;
        var y = top + (maxS - s) / yRange * (bottom - top);
        ctx.fillStyle = hoverIdx === (20 + i) ? '#ffd700' : '#2ecc71';
        ctx.beginPath(); ctx.arc(x, y, hoverIdx === (20 + i) ? 6 : 4, 0, Math.PI * 2); ctx.fill();
      });

      if (hoverIdx >= 0 && hoverIdx < 25) {
        var val = hoverIdx < 20 ? rounds[hoverIdx] : predicted[hoverIdx - 20];
        var hx = left + hoverIdx * xStep;
        var hy = top + (maxS - val) / yRange * (bottom - top);
        ctx.fillStyle = 'rgba(0,0,0,.7)';
        ctx.fillRect(hx - 35, hy - 30, 70, 22);
        ctx.fillStyle = '#ffd700';
        ctx.font = '700 11px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText((hoverIdx < 20 ? 'R' + (hoverIdx + 1) : 'P' + (hoverIdx - 19)) + ': ' + val, hx, hy - 14);
      }

      ctx.fillStyle = '#3498db';
      ctx.fillRect(left, bottom + 20, 12, 12);
      ctx.fillStyle = '#fff';
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText('실제 스코어', left + 18, bottom + 31);
      ctx.fillStyle = '#2ecc71';
      ctx.fillRect(left + 120, bottom + 20, 12, 12);
      ctx.fillStyle = '#fff';
      ctx.fillText('예측 스코어', left + 138, bottom + 31);

      var avgActual = Math.round(rounds.reduce(function (a, b) { return a + b; }, 0) / rounds.length * 10) / 10;
      var avgPred = Math.round(predicted.reduce(function (a, b) { return a + b; }, 0) / predicted.length * 10) / 10;
      ctx.fillStyle = 'rgba(255,255,255,.5)';
      ctx.font = '10px sans-serif';
      ctx.fillText('평균: ' + avgActual, left + 260, bottom + 31);
      ctx.fillText('예측평균: ' + avgPred, left + 360, bottom + 31);
      var diff = Math.round((avgPred - avgActual) * 10) / 10;
      ctx.fillStyle = diff < 0 ? '#2ecc71' : '#e74c3c';
      ctx.fillText((diff < 0 ? '▼' : '▲') + Math.abs(diff) + '타', left + 480, bottom + 31);
    }

    drawTrend(-1);

    canvas.addEventListener('mousemove', function (e) {
      var rect = canvas.getBoundingClientRect();
      var sx = 620 / rect.width;
      var mx = (e.clientX - rect.left) * sx;
      var left = 60, right = 580;
      var xStep = (right - left) / 24;
      var idx = Math.round((mx - left) / xStep);
      if (idx >= 0 && idx < 25) drawTrend(idx); else drawTrend(-1);
    });

    canvas.addEventListener('click', function () {
      sg39sfx('trend_predict');
      var cnt = parseInt(localStorage.getItem('sg39_trend_use') || '0', 10) + 1;
      localStorage.setItem('sg39_trend_use', cnt);
      if (cnt >= 3) unlockAchieve('trend_watcher');
    });

    body.innerHTML += '<div class="sg39-card"><h4>📊 추세 분석</h4><p>최근 20라운드 기반 선형회귀 + 노이즈 보정 예측. 타수감소 추세: ' + (trend < 0 ? '개선중 (' + trend.toFixed(2) + '타/R)' : '정체/상승 (+' + trend.toFixed(2) + '타/R)') + '</p></div>';
    trackV39Use();
  }

  // ===== FEATURE 4: Grip Pressure Profiler Canvas 600x380 =====
  function openGripPressureProfiler() {
    sg39sfx('grip_scan');
    var panel = makeOverlay('sg39GripOv');
    panel.innerHTML = '<div class="sg39-hdr"><h2><span class="sg39-hdr-icon">✊</span>그립 압력 프로파일러</h2><button class="sg39-x" onclick="document.getElementById(\'sg39GripOv\').classList.remove(\'active\')">&times;</button></div><div id="sg39GripBody"></div>';
    var body = document.getElementById('sg39GripBody');

    var phases = ['어드레스', '테이크백', '백스윙탑', '다운스윙', '임팩트', '팔로스루', '피니시'];
    var optimalPressure = [40, 35, 30, 45, 70, 50, 30];
    var actualPressure = optimalPressure.map(function (v) { return Math.max(10, Math.min(100, v + Math.floor((Math.random() - 0.4) * 25))); });

    var canvas = document.createElement('canvas');
    canvas.width = 600; canvas.height = 380;
    canvas.style.cssText = 'width:100%;max-width:600px;display:block;margin:0 auto 16px;border-radius:12px';
    body.appendChild(canvas);
    var ctx = canvas.getContext('2d');

    function drawGrip(hoverIdx) {
      ctx.clearRect(0, 0, 600, 380);
      ctx.fillStyle = '#0d1117';
      ctx.fillRect(0, 0, 600, 380);

      ctx.font = '700 13px sans-serif';
      ctx.fillStyle = '#fff';
      ctx.textAlign = 'center';
      ctx.fillText('그립 압력 프로파일 (스윙 단계별)', 300, 28);

      var left = 90, right = 560, top = 55, bottom = 300;
      var barW = 28, gap = (right - left - barW * 7 * 2) / 8;

      for (var g = 0; g <= 4; g++) {
        var gy = top + (bottom - top) * g / 4;
        ctx.strokeStyle = 'rgba(255,255,255,.06)';
        ctx.beginPath(); ctx.moveTo(left, gy); ctx.lineTo(right, gy); ctx.stroke();
        ctx.fillStyle = 'rgba(255,255,255,.4)';
        ctx.font = '10px sans-serif';
        ctx.textAlign = 'right';
        ctx.fillText((100 - 25 * g) + '%', left - 8, gy + 4);
      }

      phases.forEach(function (phase, i) {
        var x = left + gap + i * (barW * 2 + gap);
        var optH = (optimalPressure[i] / 100) * (bottom - top);
        var actH = (actualPressure[i] / 100) * (bottom - top);

        ctx.fillStyle = 'rgba(46,204,113,.3)';
        ctx.fillRect(x, bottom - optH, barW, optH);
        ctx.strokeStyle = '#2ecc71';
        ctx.lineWidth = 1.5;
        ctx.strokeRect(x, bottom - optH, barW, optH);

        ctx.fillStyle = hoverIdx === i ? 'rgba(52,152,219,.8)' : 'rgba(52,152,219,.5)';
        ctx.fillRect(x + barW + 2, bottom - actH, barW, actH);
        ctx.strokeStyle = '#3498db';
        ctx.strokeRect(x + barW + 2, bottom - actH, barW, actH);

        ctx.fillStyle = hoverIdx === i ? '#ffd700' : 'rgba(255,255,255,.7)';
        ctx.font = '9px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(phase, x + barW, bottom + 18);

        if (hoverIdx === i) {
          var diff = actualPressure[i] - optimalPressure[i];
          ctx.fillStyle = 'rgba(0,0,0,.8)';
          ctx.fillRect(x - 10, bottom - Math.max(optH, actH) - 40, 80, 32);
          ctx.fillStyle = '#2ecc71';
          ctx.font = '10px sans-serif';
          ctx.textAlign = 'left';
          ctx.fillText('최적: ' + optimalPressure[i] + '%', x - 6, bottom - Math.max(optH, actH) - 26);
          ctx.fillStyle = '#3498db';
          ctx.fillText('실제: ' + actualPressure[i] + '%', x - 6, bottom - Math.max(optH, actH) - 14);
        }
      });

      ctx.fillStyle = '#2ecc71';
      ctx.fillRect(left, bottom + 35, 12, 12);
      ctx.fillStyle = '#fff';
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText('최적 압력', left + 18, bottom + 46);
      ctx.fillStyle = '#3498db';
      ctx.fillRect(left + 100, bottom + 35, 12, 12);
      ctx.fillStyle = '#fff';
      ctx.fillText('실제 압력', left + 118, bottom + 46);

      var devs = actualPressure.map(function (a, i) { return Math.abs(a - optimalPressure[i]); });
      var avgDev = Math.round(devs.reduce(function (s, d) { return s + d; }, 0) / devs.length);
      var matchGrade = valGrade(100 - avgDev, 100);
      ctx.fillStyle = valGradeColor(matchGrade);
      ctx.font = '700 28px sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText(matchGrade, 570, bottom + 52);
      ctx.font = '10px sans-serif';
      ctx.fillText('적합도', 530, bottom + 52);
    }

    drawGrip(-1);

    canvas.addEventListener('mousemove', function (e) {
      var rect = canvas.getBoundingClientRect();
      var sx = 600 / rect.width;
      var mx = (e.clientX - rect.left) * sx;
      var left = 90, barW = 28, gap = (560 - left - barW * 7 * 2) / 8;
      var idx = -1;
      for (var i = 0; i < 7; i++) {
        var x = left + gap + i * (barW * 2 + gap);
        if (mx >= x - 5 && mx <= x + barW * 2 + 10) { idx = i; break; }
      }
      drawGrip(idx);
    });

    canvas.addEventListener('click', function () {
      sg39sfx('grip_optimal');
      var cnt = parseInt(localStorage.getItem('sg39_grip_use') || '0', 10) + 1;
      localStorage.setItem('sg39_grip_use', cnt);
      if (cnt >= 5) unlockAchieve('grip_scientist');
    });

    body.innerHTML += '<div class="sg39-card"><h4>🎯 그립 압력 가이드</h4><p>임팩트 시 최대 압력(70%) 후 팔로스루에서 자연스럽게 이완(50%). 어드레스~백스윙은 가볍게(30~40%). 과도한 압력은 헤드 속도와 정확성을 모두 감소시킵니다.</p></div>';
    trackV39Use();
  }

  // ===== FEATURE 5: Fairway Hit Strategy Map Canvas 620x400 =====
  function openFairwayHitStrategyMap() {
    sg39sfx('fairway_hit');
    var panel = makeOverlay('sg39FwyOv');
    panel.innerHTML = '<div class="sg39-hdr"><h2><span class="sg39-hdr-icon">🎯</span>페어웨이 적중 전략 맵</h2><button class="sg39-x" onclick="document.getElementById(\'sg39FwyOv\').classList.remove(\'active\')">&times;</button></div><div id="sg39FwyBody"></div>';
    var body = document.getElementById('sg39FwyBody');

    var clubs = [
      { name: 'DR', hitRate: 55, dist: 230, optimal: false },
      { name: '3W', hitRate: 62, dist: 210, optimal: false },
      { name: '5W', hitRate: 68, dist: 195, optimal: true },
      { name: '3H', hitRate: 72, dist: 185, optimal: true },
      { name: '4I', hitRate: 75, dist: 175, optimal: true },
      { name: '5I', hitRate: 78, dist: 165, optimal: false },
      { name: '6I', hitRate: 82, dist: 155, optimal: false },
      { name: '7I', hitRate: 86, dist: 145, optimal: false },
      { name: '8I', hitRate: 89, dist: 135, optimal: false },
      { name: '9I', hitRate: 92, dist: 125, optimal: false },
      { name: 'PW', hitRate: 94, dist: 115, optimal: false },
      { name: 'GW', hitRate: 95, dist: 100, optimal: false },
      { name: 'SW', hitRate: 96, dist: 85, optimal: false },
      { name: 'LW', hitRate: 97, dist: 70, optimal: false }
    ];

    var canvas = document.createElement('canvas');
    canvas.width = 620; canvas.height = 400;
    canvas.style.cssText = 'width:100%;max-width:620px;display:block;margin:0 auto 16px;border-radius:12px';
    body.appendChild(canvas);
    var ctx = canvas.getContext('2d');

    function drawFwy(hoverIdx) {
      ctx.clearRect(0, 0, 620, 400);
      ctx.fillStyle = '#0d1117';
      ctx.fillRect(0, 0, 620, 400);

      ctx.font = '700 13px sans-serif';
      ctx.fillStyle = '#fff';
      ctx.textAlign = 'center';
      ctx.fillText('클럽별 페어웨이 적중률 vs 거리 (최적 선택 분석)', 310, 28);

      var left = 70, right = 580, top = 55, bottom = 320;
      var xMin = 60, xMax = 250, yMin = 40, yMax = 100;

      for (var g = 0; g <= 4; g++) {
        var gy = top + (bottom - top) * g / 4;
        ctx.strokeStyle = 'rgba(255,255,255,.06)';
        ctx.beginPath(); ctx.moveTo(left, gy); ctx.lineTo(right, gy); ctx.stroke();
        ctx.fillStyle = 'rgba(255,255,255,.4)';
        ctx.font = '10px sans-serif';
        ctx.textAlign = 'right';
        ctx.fillText(Math.round(yMax - (yMax - yMin) * g / 4) + '%', left - 8, gy + 4);
      }
      for (var gx = 0; gx <= 4; gx++) {
        var gxx = left + (right - left) * gx / 4;
        ctx.strokeStyle = 'rgba(255,255,255,.06)';
        ctx.beginPath(); ctx.moveTo(gxx, top); ctx.lineTo(gxx, bottom); ctx.stroke();
        ctx.fillStyle = 'rgba(255,255,255,.4)';
        ctx.font = '10px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(Math.round(xMin + (xMax - xMin) * gx / 4) + 'yd', gxx, bottom + 18);
      }

      ctx.fillStyle = 'rgba(46,204,113,.06)';
      var optLeft = left + ((170 - xMin) / (xMax - xMin)) * (right - left);
      var optRight = left + ((200 - xMin) / (xMax - xMin)) * (right - left);
      var optTop = top + ((yMax - 80) / (yMax - yMin)) * (bottom - top);
      var optBottom = top + ((yMax - 65) / (yMax - yMin)) * (bottom - top);
      ctx.fillRect(optLeft, optTop, optRight - optLeft, optBottom - optTop);
      ctx.strokeStyle = 'rgba(46,204,113,.3)';
      ctx.setLineDash([4, 4]);
      ctx.strokeRect(optLeft, optTop, optRight - optLeft, optBottom - optTop);
      ctx.setLineDash([]);
      ctx.fillStyle = 'rgba(46,204,113,.5)';
      ctx.font = '9px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('최적존', (optLeft + optRight) / 2, optTop - 5);

      clubs.forEach(function (c, i) {
        var px = left + ((c.dist - xMin) / (xMax - xMin)) * (right - left);
        var py = top + ((yMax - c.hitRate) / (yMax - yMin)) * (bottom - top);
        var radius = hoverIdx === i ? 10 : c.optimal ? 8 : 6;

        if (c.optimal) {
          ctx.fillStyle = 'rgba(46,204,113,.3)';
          ctx.beginPath(); ctx.arc(px, py, radius + 4, 0, Math.PI * 2); ctx.fill();
        }

        ctx.fillStyle = hoverIdx === i ? '#ffd700' : c.optimal ? '#2ecc71' : '#3498db';
        ctx.beginPath(); ctx.arc(px, py, radius, 0, Math.PI * 2); ctx.fill();

        ctx.fillStyle = hoverIdx === i ? '#ffd700' : 'rgba(255,255,255,.7)';
        ctx.font = '700 9px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(c.name, px, py - radius - 5);

        if (hoverIdx === i) {
          ctx.fillStyle = 'rgba(0,0,0,.85)';
          ctx.fillRect(px - 50, py + radius + 5, 100, 38);
          ctx.fillStyle = '#ffd700';
          ctx.font = '10px sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText(c.name + ': ' + c.hitRate + '% | ' + c.dist + 'yd', px, py + radius + 20);
          ctx.fillStyle = c.optimal ? '#2ecc71' : 'rgba(255,255,255,.5)';
          ctx.fillText(c.optimal ? '★ 최적 선택' : '일반', px, py + radius + 35);
        }
      });

      ctx.fillStyle = '#3498db';
      ctx.beginPath(); ctx.arc(left, bottom + 40, 5, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#fff';
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText('일반 클럽', left + 12, bottom + 44);
      ctx.fillStyle = '#2ecc71';
      ctx.beginPath(); ctx.arc(left + 100, bottom + 40, 5, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#fff';
      ctx.fillText('최적 선택', left + 112, bottom + 44);
    }

    drawFwy(-1);

    canvas.addEventListener('mousemove', function (e) {
      var rect = canvas.getBoundingClientRect();
      var sx = 620 / rect.width;
      var mx = (e.clientX - rect.left) * sx;
      var my = (e.clientY - rect.top) * (400 / rect.height);
      var left = 70, right = 580, top = 55, bottom = 320;
      var xMin = 60, xMax = 250, yMin = 40, yMax = 100;
      var closest = -1, minDist = 20;
      clubs.forEach(function (c, i) {
        var px = left + ((c.dist - xMin) / (xMax - xMin)) * (right - left);
        var py = top + ((yMax - c.hitRate) / (yMax - yMin)) * (bottom - top);
        var d = Math.sqrt((mx - px) * (mx - px) + (my - py) * (my - py));
        if (d < minDist) { minDist = d; closest = i; }
      });
      drawFwy(closest);
    });

    canvas.addEventListener('click', function () { sg39sfx('fairway_strat'); });

    body.innerHTML += '<div class="sg39-card"><h4>💡 전략 인사이트</h4><p>적중률 65% 이상 + 거리 175yd 이상 클럽이 최적 티샷 선택. 드라이버 적중률이 60% 미만이면 3번 우드나 하이브리드가 더 효과적입니다.</p></div>';
    trackV39Use();
  }

  // ===== FEATURE 6: Round Rhythm Analyzer Canvas 640x400 =====
  function openRoundRhythmAnalyzer() {
    sg39sfx('rhythm_wave');
    var panel = makeOverlay('sg39RhythmOv');
    panel.innerHTML = '<div class="sg39-hdr"><h2><span class="sg39-hdr-icon">🎵</span>라운드 리듬 분석기</h2><button class="sg39-x" onclick="document.getElementById(\'sg39RhythmOv\').classList.remove(\'active\')">&times;</button></div><div id="sg39RhythmBody"></div>';
    var body = document.getElementById('sg39RhythmBody');

    var holeData = [];
    for (var i = 0; i < 18; i++) {
      holeData.push({
        hole: i + 1,
        pace: 10 + Math.floor(Math.random() * 8),
        score: [3, 4, 4, 5, 3, 4, 5, 4, 4, 3, 4, 5, 4, 3, 4, 5, 4, 4][i] + Math.floor(Math.random() * 3) - 1,
        energy: 90 - i * 2 + Math.floor(Math.random() * 10),
        focus: 85 - i * 1.5 + Math.floor(Math.random() * 12)
      });
    }

    var canvas = document.createElement('canvas');
    canvas.width = 640; canvas.height = 400;
    canvas.style.cssText = 'width:100%;max-width:640px;display:block;margin:0 auto 16px;border-radius:12px';
    body.appendChild(canvas);
    var ctx = canvas.getContext('2d');

    function drawRhythm(hoverHole) {
      ctx.clearRect(0, 0, 640, 400);
      ctx.fillStyle = '#0d1117';
      ctx.fillRect(0, 0, 640, 400);

      ctx.font = '700 13px sans-serif';
      ctx.fillStyle = '#fff';
      ctx.textAlign = 'center';
      ctx.fillText('18홀 라운드 리듬 분석 (페이스 + 에너지 + 집중력)', 320, 28);

      var left = 55, right = 610, top = 55, bottom = 300;
      var xStep = (right - left) / 17;

      for (var g = 0; g <= 4; g++) {
        var gy = top + (bottom - top) * g / 4;
        ctx.strokeStyle = 'rgba(255,255,255,.06)';
        ctx.beginPath(); ctx.moveTo(left, gy); ctx.lineTo(right, gy); ctx.stroke();
      }

      ctx.fillStyle = 'rgba(231,76,60,.05)';
      ctx.fillRect(left + 9 * xStep - xStep / 2, top, xStep, bottom - top);
      ctx.fillStyle = 'rgba(231,76,60,.3)';
      ctx.font = '9px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('하프', left + 9 * xStep, top - 4);

      var maxPace = 20, maxEnergy = 100, maxFocus = 100;

      ctx.strokeStyle = '#e74c3c';
      ctx.lineWidth = 2;
      ctx.beginPath();
      holeData.forEach(function (h, i) {
        var x = left + i * xStep;
        var y = top + (1 - h.pace / maxPace) * (bottom - top);
        if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      });
      ctx.stroke();

      ctx.strokeStyle = '#2ecc71';
      ctx.lineWidth = 2;
      ctx.beginPath();
      holeData.forEach(function (h, i) {
        var x = left + i * xStep;
        var y = top + (1 - h.energy / maxEnergy) * (bottom - top);
        if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      });
      ctx.stroke();

      ctx.strokeStyle = '#3498db';
      ctx.lineWidth = 2;
      ctx.beginPath();
      holeData.forEach(function (h, i) {
        var x = left + i * xStep;
        var y = top + (1 - h.focus / maxFocus) * (bottom - top);
        if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      });
      ctx.stroke();

      holeData.forEach(function (h, i) {
        var x = left + i * xStep;
        ctx.fillStyle = hoverHole === i ? '#ffd700' : 'rgba(255,255,255,.5)';
        ctx.font = '9px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('H' + (i + 1), x, bottom + 16);

        if (hoverHole === i) {
          ctx.strokeStyle = 'rgba(255,215,0,.3)';
          ctx.lineWidth = 1;
          ctx.beginPath(); ctx.moveTo(x, top); ctx.lineTo(x, bottom); ctx.stroke();

          ctx.fillStyle = 'rgba(0,0,0,.85)';
          ctx.fillRect(x - 55, top - 5, 110, 48);
          ctx.fillStyle = '#e74c3c';
          ctx.font = '10px sans-serif';
          ctx.textAlign = 'left';
          ctx.fillText('페이스: ' + h.pace + '분', x - 48, top + 10);
          ctx.fillStyle = '#2ecc71';
          ctx.fillText('에너지: ' + h.energy + '%', x - 48, top + 24);
          ctx.fillStyle = '#3498db';
          ctx.fillText('집중: ' + h.focus + '%', x - 48, top + 38);
        }
      });

      var legendY = bottom + 30;
      ctx.fillStyle = '#e74c3c'; ctx.fillRect(left, legendY, 12, 12);
      ctx.fillStyle = '#fff'; ctx.font = '11px sans-serif'; ctx.textAlign = 'left';
      ctx.fillText('페이스(분)', left + 16, legendY + 11);
      ctx.fillStyle = '#2ecc71'; ctx.fillRect(left + 110, legendY, 12, 12);
      ctx.fillStyle = '#fff'; ctx.fillText('에너지(%)', left + 126, legendY + 11);
      ctx.fillStyle = '#3498db'; ctx.fillRect(left + 220, legendY, 12, 12);
      ctx.fillStyle = '#fff'; ctx.fillText('집중력(%)', left + 236, legendY + 11);

      var avgEnergy = Math.round(holeData.reduce(function (s, h) { return s + h.energy; }, 0) / 18);
      var avgFocus = Math.round(holeData.reduce(function (s, h) { return s + h.focus; }, 0) / 18);
      var rhythmScore = Math.round((avgEnergy + avgFocus) / 2);
      var rGrade = valGrade(rhythmScore, 100);
      ctx.fillStyle = valGradeColor(rGrade);
      ctx.font = '700 28px sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText(rGrade, 600, legendY + 16);
      ctx.font = '10px sans-serif';
      ctx.fillText('리듬등급', 560, legendY + 16);
    }

    drawRhythm(-1);

    canvas.addEventListener('mousemove', function (e) {
      var rect = canvas.getBoundingClientRect();
      var sx = 640 / rect.width;
      var mx = (e.clientX - rect.left) * sx;
      var left = 55, right = 610, xStep = (right - left) / 17;
      var idx = Math.round((mx - left) / xStep);
      if (idx >= 0 && idx < 18) drawRhythm(idx); else drawRhythm(-1);
    });

    canvas.addEventListener('click', function () {
      sg39sfx('rhythm_flow');
      var cnt = parseInt(localStorage.getItem('sg39_rhythm_use') || '0', 10) + 1;
      localStorage.setItem('sg39_rhythm_use', cnt);
      if (cnt >= 5) unlockAchieve('rhythm_master');
    });

    body.innerHTML += '<div class="sg39-card"><h4>⏱️ 리듬 인사이트</h4><p>10~14번 홀에서 에너지/집중력이 급격히 저하되는 &quot;데드존&quot; 패턴을 주의하세요. 하프타임 휴식 시 탄수화물 보충과 간단한 스트레칭이 후반 리듬 유지에 효과적입니다.</p></div>';
    trackV39Use();
  }

  // ===== FEATURE 7: Golf IQ Growth Tracker Canvas 600x380 =====
  function openGolfIQGrowthTracker() {
    sg39sfx('iqgrow_plot');
    var panel = makeOverlay('sg39IQGrowOv');
    panel.innerHTML = '<div class="sg39-hdr"><h2><span class="sg39-hdr-icon">📊</span>Golf IQ 성장 추적기</h2><button class="sg39-x" onclick="document.getElementById(\'sg39IQGrowOv\').classList.remove(\'active\')">&times;</button></div><div id="sg39IQGrowBody"></div>';
    var body = document.getElementById('sg39IQGrowBody');

    var iqVersions = [];
    for (var v = 1; v <= 23; v++) {
      var storedScore = localStorage.getItem('sg' + (v + 16) + '_iq_v' + v + '_score');
      var score = storedScore ? parseInt(storedScore, 10) : (v <= 3 ? 6 + Math.floor(Math.random() * 4) : 7 + Math.floor(Math.random() * 6));
      iqVersions.push({ version: v, score: Math.min(15, score), total: 15 });
    }

    var canvas = document.createElement('canvas');
    canvas.width = 600; canvas.height = 380;
    canvas.style.cssText = 'width:100%;max-width:600px;display:block;margin:0 auto 16px;border-radius:12px';
    body.appendChild(canvas);
    var ctx = canvas.getContext('2d');

    function drawIQGrow(hoverIdx) {
      ctx.clearRect(0, 0, 600, 380);
      ctx.fillStyle = '#0d1117';
      ctx.fillRect(0, 0, 600, 380);

      ctx.font = '700 13px sans-serif';
      ctx.fillStyle = '#fff';
      ctx.textAlign = 'center';
      ctx.fillText('Golf IQ 성장 추적 (v1 ~ v23)', 300, 28);

      var left = 55, right = 565, top = 55, bottom = 300;
      var xStep = (right - left) / (iqVersions.length - 1);

      for (var g = 0; g <= 5; g++) {
        var gy = top + (bottom - top) * g / 5;
        ctx.strokeStyle = 'rgba(255,255,255,.06)';
        ctx.beginPath(); ctx.moveTo(left, gy); ctx.lineTo(right, gy); ctx.stroke();
        ctx.fillStyle = 'rgba(255,255,255,.4)';
        ctx.font = '10px sans-serif';
        ctx.textAlign = 'right';
        ctx.fillText((15 - 3 * g), left - 8, gy + 4);
      }

      ctx.fillStyle = 'rgba(46,204,113,.05)';
      ctx.fillRect(left, top, right - left, (bottom - top) * 3 / 15);

      var grd = ctx.createLinearGradient(0, top, 0, bottom);
      grd.addColorStop(0, 'rgba(52,152,219,.15)');
      grd.addColorStop(1, 'rgba(52,152,219,0)');
      ctx.fillStyle = grd;
      ctx.beginPath();
      ctx.moveTo(left, bottom);
      iqVersions.forEach(function (v, i) {
        var x = left + i * xStep;
        var y = top + (15 - v.score) / 15 * (bottom - top);
        ctx.lineTo(x, y);
      });
      ctx.lineTo(right, bottom);
      ctx.closePath();
      ctx.fill();

      ctx.strokeStyle = '#3498db';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      iqVersions.forEach(function (v, i) {
        var x = left + i * xStep;
        var y = top + (15 - v.score) / 15 * (bottom - top);
        if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      });
      ctx.stroke();

      iqVersions.forEach(function (v, i) {
        var x = left + i * xStep;
        var y = top + (15 - v.score) / 15 * (bottom - top);
        ctx.fillStyle = hoverIdx === i ? '#ffd700' : '#3498db';
        ctx.beginPath(); ctx.arc(x, y, hoverIdx === i ? 6 : 3.5, 0, Math.PI * 2); ctx.fill();

        if (i % 3 === 0 || hoverIdx === i) {
          ctx.fillStyle = hoverIdx === i ? '#ffd700' : 'rgba(255,255,255,.5)';
          ctx.font = '9px sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText('v' + v.version, x, bottom + 16);
        }

        if (hoverIdx === i) {
          ctx.fillStyle = 'rgba(0,0,0,.85)';
          ctx.fillRect(x - 40, y - 32, 80, 24);
          ctx.fillStyle = '#ffd700';
          ctx.font = '700 11px sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText('v' + v.version + ': ' + v.score + '/15', x, y - 16);
        }
      });

      var first = iqVersions[0].score;
      var last = iqVersions[iqVersions.length - 1].score;
      var growth = last - first;
      var avgScore = Math.round(iqVersions.reduce(function (s, v) { return s + v.score; }, 0) / iqVersions.length * 10) / 10;

      ctx.fillStyle = '#fff';
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText('평균: ' + avgScore + '/15', left, bottom + 35);
      ctx.fillStyle = growth >= 0 ? '#2ecc71' : '#e74c3c';
      ctx.fillText('성장: ' + (growth >= 0 ? '+' : '') + growth + '점 (v1→v23)', left + 130, bottom + 35);

      var streakUp = 0, maxStreak = 0;
      for (var si = 1; si < iqVersions.length; si++) {
        if (iqVersions[si].score > iqVersions[si - 1].score) { streakUp++; if (streakUp > maxStreak) maxStreak = streakUp; }
        else streakUp = 0;
      }
      ctx.fillStyle = 'rgba(255,255,255,.5)';
      ctx.fillText('최장연속상승: ' + maxStreak + '회', left + 360, bottom + 35);

      var overallG = valGrade(avgScore, 15);
      ctx.fillStyle = valGradeColor(overallG);
      ctx.font = '700 28px sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText(overallG, 570, bottom + 45);
    }

    drawIQGrow(-1);

    canvas.addEventListener('mousemove', function (e) {
      var rect = canvas.getBoundingClientRect();
      var sx = 600 / rect.width;
      var mx = (e.clientX - rect.left) * sx;
      var left = 55, right = 565;
      var xStep = (right - left) / 22;
      var idx = Math.round((mx - left) / xStep);
      if (idx >= 0 && idx < 23) drawIQGrow(idx); else drawIQGrow(-1);
    });

    canvas.addEventListener('click', function () {
      sg39sfx('iqgrow_up');
      unlockAchieve('iq_historian');
    });

    body.innerHTML += '<div class="sg39-card"><h4>🧠 IQ 성장 분석</h4><p>Golf IQ 테스트는 매 버전마다 새로운 15문항으로 구성됩니다. 꾸준한 참여와 학습을 통해 IQ 점수 상승 추세를 유지하세요.</p></div>';
    trackV39Use();
  }

  // ===== FEATURE 8: Competitive Benchmark Dashboard Canvas 620x400 =====
  function openCompetitiveBenchmark() {
    sg39sfx('bench_radar');
    var panel = makeOverlay('sg39BenchOv');
    panel.innerHTML = '<div class="sg39-hdr"><h2><span class="sg39-hdr-icon">🏅</span>종합 경쟁력 벤치마크</h2><button class="sg39-x" onclick="document.getElementById(\'sg39BenchOv\').classList.remove(\'active\')">&times;</button></div><div id="sg39BenchBody"></div>';
    var body = document.getElementById('sg39BenchBody');

    var axes = ['코스검색', '스코어관리', 'AI분석', '연습도구', '소셜기능', '게이미피케이션', 'UX/UI', '콘텐츠'];
    var apps = [
      { name: 'SmartGolf', color: '#2ecc71', scores: [95, 88, 92, 90, 75, 95, 85, 92] },
      { name: '카카오골프', color: '#f1c40f', scores: [90, 85, 70, 60, 88, 50, 90, 65] },
      { name: '골프존', color: '#e74c3c', scores: [75, 80, 65, 85, 70, 60, 80, 70] },
      { name: '스마트스코어', color: '#3498db', scores: [70, 90, 60, 55, 65, 45, 75, 55] }
    ];

    var activeApps = [true, true, true, true];

    var tabsDiv = document.createElement('div');
    tabsDiv.className = 'sg39-tabs';
    apps.forEach(function (app, i) {
      var btn = document.createElement('button');
      btn.className = 'sg39-tab active';
      btn.style.borderColor = app.color;
      btn.style.color = app.color;
      btn.textContent = app.name;
      btn.onclick = function () {
        activeApps[i] = !activeApps[i];
        btn.classList.toggle('active', activeApps[i]);
        btn.style.background = activeApps[i] ? app.color + '22' : 'transparent';
        drawBench();
      };
      btn.style.background = app.color + '22';
      tabsDiv.appendChild(btn);
    });
    body.appendChild(tabsDiv);

    var canvas = document.createElement('canvas');
    canvas.width = 620; canvas.height = 400;
    canvas.style.cssText = 'width:100%;max-width:620px;display:block;margin:0 auto 16px;border-radius:12px';
    body.appendChild(canvas);
    var ctx = canvas.getContext('2d');

    function drawBench() {
      ctx.clearRect(0, 0, 620, 400);
      ctx.fillStyle = '#0d1117';
      ctx.fillRect(0, 0, 620, 400);

      ctx.font = '700 13px sans-serif';
      ctx.fillStyle = '#fff';
      ctx.textAlign = 'center';
      ctx.fillText('경쟁앱 대비 8축 벤치마크 레이더', 310, 28);

      var cx = 310, cy = 210, maxR = 140;
      var numAxes = axes.length;
      var angleStep = (Math.PI * 2) / numAxes;

      for (var ring = 1; ring <= 4; ring++) {
        var rr = maxR * ring / 4;
        ctx.strokeStyle = 'rgba(255,255,255,.08)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        for (var a = 0; a < numAxes; a++) {
          var angle = -Math.PI / 2 + a * angleStep;
          var px = cx + Math.cos(angle) * rr;
          var py = cy + Math.sin(angle) * rr;
          if (a === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.stroke();
      }

      for (var ai = 0; ai < numAxes; ai++) {
        var angle = -Math.PI / 2 + ai * angleStep;
        var lx = cx + Math.cos(angle) * (maxR + 22);
        var ly = cy + Math.sin(angle) * (maxR + 22);
        ctx.strokeStyle = 'rgba(255,255,255,.1)';
        ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + Math.cos(angle) * maxR, cy + Math.sin(angle) * maxR); ctx.stroke();
        ctx.fillStyle = 'rgba(255,255,255,.7)';
        ctx.font = '10px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(axes[ai], lx, ly + 4);
      }

      apps.forEach(function (app, appIdx) {
        if (!activeApps[appIdx]) return;
        ctx.strokeStyle = app.color;
        ctx.lineWidth = 2;
        ctx.fillStyle = app.color + '18';
        ctx.beginPath();
        app.scores.forEach(function (s, si) {
          var angle = -Math.PI / 2 + si * angleStep;
          var r = (s / 100) * maxR;
          var px = cx + Math.cos(angle) * r;
          var py = cy + Math.sin(angle) * r;
          if (si === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
        });
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        app.scores.forEach(function (s, si) {
          var angle = -Math.PI / 2 + si * angleStep;
          var r = (s / 100) * maxR;
          var px = cx + Math.cos(angle) * r;
          var py = cy + Math.sin(angle) * r;
          ctx.fillStyle = app.color;
          ctx.beginPath(); ctx.arc(px, py, 3, 0, Math.PI * 2); ctx.fill();
        });
      });

      var legendX = 50, legendY = 375;
      apps.forEach(function (app, i) {
        if (!activeApps[i]) return;
        var avg = Math.round(app.scores.reduce(function (s, v) { return s + v; }, 0) / app.scores.length);
        ctx.fillStyle = app.color;
        ctx.fillRect(legendX, legendY, 10, 10);
        ctx.fillStyle = '#fff';
        ctx.font = '10px sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText(app.name + ' (' + avg + ')', legendX + 14, legendY + 10);
        legendX += 130;
      });
    }

    drawBench();

    canvas.addEventListener('click', function () {
      sg39sfx('bench_radar');
      var cnt = parseInt(localStorage.getItem('sg39_bench_use') || '0', 10) + 1;
      localStorage.setItem('sg39_bench_use', cnt);
      if (cnt >= 3) unlockAchieve('benchmark_viewer');
    });

    body.innerHTML += '<div class="sg39-card"><h4>📋 벤치마크 요약</h4><p>SmartGolf는 AI분석(92), 게이미피케이션(95), 콘텐츠(92) 영역에서 경쟁앱 대비 우위. 소셜기능(75)과 UX/UI(85) 영역에서 추가 개선 여지가 있습니다.</p></div>';
    trackV39Use();
  }

  // ===== FEATURE 9: Golf IQ v23 (15 questions) =====
  function openGolfIQv23() {
    sg39sfx('diff_scan');
    var panel = makeOverlay('sg39IQOv');
    panel.innerHTML = '<div class="sg39-hdr"><h2><span class="sg39-hdr-icon">🧠</span>Golf IQ v23</h2><button class="sg39-x" onclick="document.getElementById(\'sg39IQOv\').classList.remove(\'active\')">&times;</button></div><div id="sg39IQBody"></div>';
    var body = document.getElementById('sg39IQBody');

    var questions = [
      { q: '2024 마스터즈 챔피언은?', o: ['존 람', '스코티 쉐플러', '로리 매킬로이', '브룩스 켑카'], c: 1 },
      { q: '골프에서 &quot;스팀프미터&quot;가 측정하는 것은?', o: ['바람 속도', '그린 속도', '공의 비거리', '스윙 속도'], c: 1 },
      { q: '표준 골프공의 딤플 수는 대략?', o: ['200~250개', '250~300개', '300~350개', '350~400개'], c: 2 },
      { q: '스트로크 플레이에서 OB 벌타는?', o: ['1벌타 + 재타', '2벌타', '1벌타 + 드롭', '실격'], c: 0 },
      { q: '로브 웨지의 일반적 로프트 각도는?', o: ['48~52도', '54~56도', '58~62도', '64~68도'], c: 2 },
      { q: '골프 코스 레이팅이 72.0이면 의미는?', o: ['18홀 파가 72', '스크래치 골퍼 기대 스코어 72', '코스 난이도 72%', '코스 길이 7200야드'], c: 1 },
      { q: '프로 골퍼의 평균 드라이버 런치 앵글은?', o: ['6~8도', '10~12도', '14~16도', '18~20도'], c: 1 },
      { q: '번커샷에서 &quot;블래스트 샷&quot;의 특징은?', o: ['공만 직접 타격', '모래와 함께 폭발적으로 타격', '낮은 탄도 런 샷', '반대 손으로 타격'], c: 1 },
      { q: '골프에서 &quot;레이업&quot; 전략은?', o: ['그린을 직접 공략', '위험 구역 앞에 안전하게 배치', '높은 탄도로 치기', '백스핀을 많이 걸기'], c: 1 },
      { q: '핸디캡 슬로프 레이팅의 범위는?', o: ['55~155', '0~100', '100~200', '1~36'], c: 0 },
      { q: '아이언 샷에서 &quot;디보트&quot;는 공의 어디에서 시작해야?', o: ['공 뒤', '공 위치', '공 앞', '디보트가 없어야 함'], c: 2 },
      { q: '골프 스윙에서 &quot;라이 앵글&quot;이란?', o: ['공의 비행 각도', '클럽 헤드와 샤프트 사이 각도', '지면과 스윙 평면 각도', '백스윙 탑에서의 각도'], c: 1 },
      { q: 'PGA 투어에서 평균 그린 적중률(GIR)은?', o: ['약 50%', '약 65%', '약 75%', '약 85%'], c: 1 },
      { q: '골프에서 &quot;클럽 패스&quot;가 아웃-투-인이면?', o: ['슬라이스 경향', '훅 경향', '직구', '토핑'], c: 0 },
      { q: '워터 해저드(페널티 구역)에서 드롭 시 기준선은?', o: ['최후 횡단 지점과 홀을 잇는 선', '페어웨이 중앙', '티잉 구역과 홀 사이', '가장 가까운 벙커'], c: 0 }
    ];

    var state = { current: 0, correct: 0, answered: false };

    function renderQuestion() {
      var q = questions[state.current];
      body.innerHTML = '<div class="sg39-card"><div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px"><span style="color:rgba(255,255,255,.5);font-size:12px">문제 ' + (state.current + 1) + ' / ' + questions.length + '</span><span style="color:#2ecc71;font-weight:700;font-size:13px">' + state.correct + '점</span></div>' +
        '<div class="sg39-progress"><div class="sg39-progress-fill" style="width:' + ((state.current + 1) / questions.length * 100) + '%;background:linear-gradient(90deg,#e74c3c,#f39c12)"></div></div>' +
        '<h4 style="margin-top:12px">' + q.q + '</h4></div>' +
        '<div id="sg39IQOpts"></div><div id="sg39IQResult" style="display:none"></div>';

      var optsDiv = document.getElementById('sg39IQOpts');
      q.o.forEach(function (opt, oi) {
        var btn = document.createElement('button');
        btn.className = 'sg39-btn';
        btn.style.cssText = 'display:block;width:100%;margin-bottom:8px;text-align:left;background:rgba(255,255,255,.08);border:1.5px solid rgba(255,255,255,.12);padding:14px 18px';
        btn.innerHTML = '<span style="color:rgba(255,255,255,.4);margin-right:8px;font-weight:800">' + String.fromCharCode(65 + oi) + '</span>' + opt;
        btn.onclick = function () {
          if (state.answered) return;
          state.answered = true;
          var isCorrect = oi === q.c;
          if (isCorrect) {
            state.correct++;
            btn.classList.add('correct');
            sg39sfx('diff_grade');
          } else {
            btn.classList.add('wrong');
            optsDiv.children[q.c].classList.add('correct');
            sg39sfx('grip_scan');
          }
          var result = document.getElementById('sg39IQResult');
          result.style.display = 'block';
          result.innerHTML = '<div class="sg39-card" style="border-color:' + (isCorrect ? 'rgba(46,204,113,.3)' : 'rgba(231,76,60,.3)') + '"><p style="color:' + (isCorrect ? '#2ecc71' : '#e74c3c') + ';font-weight:700">' + (isCorrect ? '정답입니다!' : '오답! 정답은 ' + String.fromCharCode(65 + q.c) + '입니다.') + '</p></div>' +
            '<div style="text-align:center;margin-top:10px"><button class="sg39-btn" style="background:linear-gradient(135deg,#e74c3c,#c0392b)" id="sg39IQNext">' + (state.current < questions.length - 1 ? '다음 문제' : '결과 보기') + '</button></div>';
          document.getElementById('sg39IQNext').onclick = function () {
            state.current++;
            state.answered = false;
            if (state.current < questions.length) {
              renderQuestion();
            } else {
              showResults();
            }
          };
        };
        optsDiv.appendChild(btn);
      });
    }

    function showResults() {
      var pct = Math.round(state.correct / questions.length * 100);
      var grade = gradeLabel(state.correct, questions.length);
      LS('iq_v23_score', state.correct);
      if (state.correct >= 12) unlockAchieve('golf_iq_v23_master');
      body.innerHTML = '<div style="text-align:center"><div style="font-size:48px;margin-bottom:10px">' + (pct >= 80 ? '🏆' : pct >= 60 ? '👏' : '📚') + '</div>' +
        '<div style="font-size:14px;color:rgba(255,255,255,.5);margin-bottom:8px">Golf IQ v23 결과</div>' +
        '<div style="font-size:36px;font-weight:900;color:#fff;margin-bottom:6px">' + state.correct + '<span style="font-size:18px;color:rgba(255,255,255,.4)"> / ' + questions.length + '</span></div>' +
        '<div class="sg39-grade ' + gradeClass(state.correct, questions.length) + '" style="margin:12px auto">' + grade + '</div>' +
        '<div style="font-size:13px;color:rgba(255,255,255,.6);margin-top:12px">정답률: ' + pct + '%</div>' +
        '<div class="sg39-progress" style="max-width:300px;margin:10px auto"><div class="sg39-progress-fill" style="width:' + pct + '%;background:linear-gradient(90deg,#e74c3c,#c0392b)"></div></div>' +
        '<button class="sg39-btn" style="background:linear-gradient(135deg,#e74c3c,#c0392b);margin-top:16px" onclick="document.getElementById(\'sg39IQOv\').classList.remove(\'active\')">닫기</button></div>';
    }

    renderQuestion();
  }

  // ===== NAVIGATION =====
  var navItems = [
    { icon: '🏔️', label: 'Diff', fn: openCourseDifficultyDecomp },
    { icon: '📐', label: 'Practice', fn: openPracticeSessionOptimizer },
    { icon: '📈', label: 'Trend', fn: openScoreTrendPredictor },
    { icon: '✊', label: 'Grip', fn: openGripPressureProfiler },
    { icon: '🎯', label: 'Fairway', fn: openFairwayHitStrategyMap },
    { icon: '🎵', label: 'Rhythm', fn: openRoundRhythmAnalyzer },
    { icon: '📊', label: 'IQGrow', fn: openGolfIQGrowthTracker },
    { icon: '🏅', label: 'Bench', fn: openCompetitiveBenchmark },
    { icon: '🧠', label: 'IQ v23', fn: openGolfIQv23 }
  ];

  var existingBar = document.querySelector('.sg30-bottom-bar') || document.querySelector('[class*="bottom-bar"]');
  if (existingBar) {
    navItems.forEach(function (item) {
      var btn = document.createElement('button');
      btn.className = existingBar.querySelector('button') ? existingBar.querySelector('button').className : 'sg30-bbtn';
      btn.innerHTML = '<span class="' + (existingBar.querySelector('.sg30-bbtn-icon') ? 'sg30-bbtn-icon' : 'sg39-bbtn-icon') + '">' + item.icon + '</span><span class="' + (existingBar.querySelector('.sg30-bbtn-label') ? 'sg30-bbtn-label' : 'sg39-bbtn-label') + '">' + item.label + '</span>';
      btn.onclick = item.fn;
      existingBar.appendChild(btn);
    });
  }

  // ===== KEYBOARD SHORTCUTS (Shift+Key) =====
  var keyMap = {
    Q: openCourseDifficultyDecomp,
    W: openPracticeSessionOptimizer,
    E: openScoreTrendPredictor,
    R: openGripPressureProfiler,
    T: openFairwayHitStrategyMap,
    Y: openRoundRhythmAnalyzer,
    U: openGolfIQGrowthTracker,
    I: openCompetitiveBenchmark,
    O: openGolfIQv23
  };

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      var overlays = document.querySelectorAll('.sg39-overlay.active');
      overlays.forEach(function (ov) { ov.classList.remove('active'); });
      return;
    }
    if (e.shiftKey && !e.ctrlKey && !e.altKey && !e.metaKey) {
      var key = e.key.toUpperCase();
      if (keyMap[key]) {
        e.preventDefault();
        keyMap[key]();
      }
    }
  });

  // ===== EXPOSE GLOBALS FOR INLINE ONCLICK =====
  window.openCourseDifficultyDecomp = openCourseDifficultyDecomp;
  window.openPracticeSessionOptimizer = openPracticeSessionOptimizer;
  window.openScoreTrendPredictor = openScoreTrendPredictor;
  window.openGripPressureProfiler = openGripPressureProfiler;
  window.openFairwayHitStrategyMap = openFairwayHitStrategyMap;
  window.openRoundRhythmAnalyzer = openRoundRhythmAnalyzer;
  window.openGolfIQGrowthTracker = openGolfIQGrowthTracker;
  window.openCompetitiveBenchmark = openCompetitiveBenchmark;
  window.openGolfIQv23 = openGolfIQv23;

  console.log('[SmartGolf v39.0] Loaded: 8 canvas features, Golf IQ v23, 15 achievements, 16 SFX, 9 nav buttons');
})();
