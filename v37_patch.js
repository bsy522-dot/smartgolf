/* ====================================================================
 * SmartGolf v37.0 patch
 * 드라이버발사각최적화기Canvas620x400 + 코스매니지먼트시나리오Canvas640x400
 * + 퍼팅거리감트레이너Canvas600x380 + 스코어분포벨커브Canvas620x400
 * + 라운드에너지매니저Canvas600x380 + 클럽별미스샷패턴분석기Canvas620x380
 * + 골프심리프로파일러Canvas620x400 + 핸디캡시뮬레이터Canvas600x380
 * + Golf IQ v21 15문항 + 업적+15(287->302) + SFX16종(284->300) + 키보드9종
 * ==================================================================== */
(function () {
  'use strict';

  var LS = function(k, v) { return v === undefined ? JSON.parse(localStorage.getItem('sg37b_' + k) || 'null') : localStorage.setItem('sg37b_' + k, JSON.stringify(v)); };

  // ========== SFX ENGINE ==========
  var _ac;
  function getAC() { if (!_ac) _ac = new (window.AudioContext || window.webkitAudioContext)(); return _ac; }
  var sfx = function(freq, dur, type, vol) {
    try {
      var ac = getAC();
      if (ac.state === 'suspended') ac.resume();
      var o = ac.createOscillator(), g = ac.createGain();
      o.type = type || 'sine'; o.frequency.value = freq;
      g.gain.setValueAtTime(vol || 0.15, ac.currentTime);
      g.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + dur);
      o.connect(g); g.connect(ac.destination);
      o.start(); o.stop(ac.currentTime + dur);
    } catch (e) {}
  };
  var SFX = {
    launch_scan: function() { sfx(440, 0.06); sfx(554, 0.08); sfx(659, 0.1); },
    launch_opt: function() { sfx(523, 0.04); sfx(659, 0.04); sfx(784, 0.04); sfx(988, 0.04); sfx(1175, 0.04); sfx(1319, 0.18, 'triangle'); },
    course_plan: function() { sfx(392, 0.08); sfx(494, 0.06, 'triangle'); },
    course_decide: function() { sfx(523, 0.06); sfx(659, 0.06); sfx(784, 0.1); },
    putt_train: function() { sfx(370, 0.06); sfx(440, 0.06); sfx(554, 0.1); },
    putt_hit: function() { sfx(587, 0.05); sfx(740, 0.05); sfx(880, 0.12, 'triangle'); },
    bell_curve: function() { sfx(330, 0.08); sfx(440, 0.06); sfx(554, 0.1); },
    bell_mark: function() { sfx(494, 0.06); sfx(587, 0.06); sfx(740, 0.1); },
    energy_log: function() { sfx(349, 0.08); sfx(440, 0.06); sfx(523, 0.1); },
    energy_boost: function() { sfx(523, 0.04); sfx(659, 0.04); sfx(784, 0.14, 'triangle'); },
    miss_scan: function() { sfx(415, 0.06); sfx(523, 0.08, 'triangle'); },
    miss_drill: function() { sfx(466, 0.08); sfx(587, 0.06); sfx(698, 0.1); },
    psych_scan: function() { sfx(392, 0.06); sfx(494, 0.08); },
    hcap_sim: function() { sfx(523, 0.04); sfx(659, 0.04); sfx(784, 0.04); sfx(1047, 0.15, 'triangle'); },
    quiz_v21: function() { sfx(587, 0.1); sfx(740, 0.12); },
    achieve_v37: function() { sfx(523, 0.04); sfx(659, 0.04); sfx(784, 0.04); sfx(988, 0.04); sfx(1175, 0.04); sfx(1319, 0.18, 'triangle'); }
  };

  // ========== CSS ==========
  var css = [
    '.sg37-overlay{display:none;position:fixed;top:0;left:0;right:0;bottom:0;z-index:10070;background:rgba(0,0,0,.55);overflow-y:auto;padding:20px;animation:sg37FadeIn .25s}',
    '.sg37-overlay.active{display:flex;align-items:flex-start;justify-content:center}',
    '@keyframes sg37FadeIn{from{opacity:0}to{opacity:1}}',
    '.sg37-panel{background:var(--card-bg,#fff);border-radius:16px;max-width:720px;width:100%;margin:30px auto;box-shadow:0 8px 40px rgba(0,0,0,.3);overflow:hidden;animation:sg37SlideUp .3s}',
    '@keyframes sg37SlideUp{from{transform:translateY(30px);opacity:0}to{transform:translateY(0);opacity:1}}',
    '.sg37-panel-head{padding:16px 20px;color:#fff;display:flex;align-items:center;justify-content:space-between}',
    '.sg37-panel-head h3{font-size:16px;font-weight:700;display:flex;align-items:center;gap:8px}',
    '.sg37-panel-close{background:rgba(255,255,255,.25);border:none;color:#fff;width:30px;height:30px;border-radius:50%;cursor:pointer;font-size:16px;font-family:inherit}',
    '.sg37-panel-body{padding:16px 20px;max-height:70vh;overflow-y:auto}',
    '.sg37-card{background:var(--bg,#f5f7f5);border-radius:12px;padding:14px;margin-bottom:10px;border:1px solid var(--border,#e0e0e0);cursor:pointer;transition:all .2s}',
    '.sg37-card:hover{box-shadow:0 2px 12px rgba(0,0,0,.1);transform:translateY(-1px)}',
    '.sg37-grade{display:inline-block;padding:3px 10px;border-radius:8px;font-weight:700;font-size:13px;color:#fff}',
    '.sg37-grade-s{background:linear-gradient(135deg,#ff6b35,#ff4500)}',
    '.sg37-grade-a{background:linear-gradient(135deg,#1a7a3a,#2ecc71)}',
    '.sg37-grade-b{background:linear-gradient(135deg,#3498db,#2980b9)}',
    '.sg37-grade-c{background:linear-gradient(135deg,#9b59b6,#8e44ad)}',
    '.sg37-grade-d{background:linear-gradient(135deg,#95a5a6,#7f8c8d)}',
    '.sg37-btn{display:inline-block;padding:8px 16px;border-radius:10px;border:none;cursor:pointer;font-size:13px;font-weight:600;transition:all .2s;font-family:inherit}',
    '.sg37-btn:hover{transform:translateY(-1px);box-shadow:0 2px 8px rgba(0,0,0,.15)}',
    '.sg37-btn-primary{background:linear-gradient(135deg,#1a7a3a,#2ecc71);color:#fff}',
    '.sg37-btn-secondary{background:var(--bg,#f5f7f5);color:var(--text,#333);border:1px solid var(--border,#e0e0e0)}',
    '.sg37-tabs{display:flex;gap:6px;margin-bottom:12px;flex-wrap:wrap}',
    '.sg37-tab{padding:6px 14px;border-radius:8px;border:1px solid var(--border,#e0e0e0);background:var(--bg,#f5f7f5);cursor:pointer;font-size:12px;font-weight:600;transition:all .2s}',
    '.sg37-tab.active{background:linear-gradient(135deg,#1a7a3a,#2ecc71);color:#fff;border-color:transparent}',
    '.sg37-stat{display:flex;justify-content:space-between;align-items:center;padding:6px 0;border-bottom:1px solid var(--border,#e0e0e0);font-size:13px}',
    '.sg37-stat:last-child{border-bottom:none}',
    '.sg37-progress{height:8px;background:var(--border,#e0e0e0);border-radius:4px;overflow:hidden;margin-top:4px}',
    '.sg37-progress-fill{height:100%;border-radius:4px;transition:width .6s}'
  ].join('\n');
  var sty = document.createElement('style');
  sty.textContent = css;
  document.head.appendChild(sty);

  // ========== HELPERS ==========
  function createOverlay(id, title, bgColor) {
    var ov = document.createElement('div');
    ov.className = 'sg37-overlay';
    ov.id = id;
    ov.onclick = function(e) { if (e.target === ov) ov.classList.remove('active'); };
    ov.innerHTML = '<div class="sg37-panel"><div class="sg37-panel-head" style="background:' + bgColor + '"><h3>' + title + '</h3><button class="sg37-panel-close" onclick="this.closest(\'.sg37-overlay\').classList.remove(\'active\')">&times;</button></div><div class="sg37-panel-body" id="' + id + '-body"></div></div>';
    document.body.appendChild(ov);
    return ov;
  }

  function gradeClass(score, max) {
    var pct = score / max * 100;
    if (pct >= 90) return 'sg37-grade sg37-grade-s';
    if (pct >= 75) return 'sg37-grade sg37-grade-a';
    if (pct >= 60) return 'sg37-grade sg37-grade-b';
    if (pct >= 40) return 'sg37-grade sg37-grade-c';
    return 'sg37-grade sg37-grade-d';
  }

  function gradeLabel(score, max) {
    var pct = score / max * 100;
    if (pct >= 90) return 'S';
    if (pct >= 75) return 'A';
    if (pct >= 60) return 'B';
    if (pct >= 40) return 'C';
    return 'D';
  }

  // 빈 상태 안내: 사용자가 입력한 데이터가 없을 때 캔버스 가운데에 안내문만 그린다.
  function drawEmpty(ctx, W, H, msg) {
    ctx.save();
    ctx.fillStyle = 'rgba(255,255,255,0.45)';
    ctx.font = '14px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(msg || '기록을 추가하면 표시됩니다', W / 2, H / 2);
    ctx.restore();
  }

  // 입력창 값 읽기(비어 있거나 숫자가 아니면 null)
  function readNum(id) {
    var el = document.getElementById(id);
    if (!el || el.value === '') return null;
    var v = parseFloat(el.value);
    return isNaN(v) ? null : v;
  }

  // 실제 사용 기록(업적 판정 근거). 패널을 실제로 열었을 때만 기록된다.
  var usage = LS('usage') || {};
  var FEATURE_KEYS = ['launch', 'cmgmt', 'putt', 'bell', 'energy', 'miss', 'psych', 'hcap'];
  function markUsed(key) {
    if (!usage[key]) { usage[key] = true; LS('usage', usage); }
    evalAchievements();
  }
  function usedCount() {
    return FEATURE_KEYS.filter(function(k) { return usage[k]; }).length;
  }

  // ========================================================================
  // 1. 드라이버 발사각 최적화기 Canvas 620x400
  //    6개 발사각(8~18) x 5개 스핀량(2000~4000rpm) 히트맵
  // ========================================================================
  function openLaunchAngleOpt() {
    SFX.launch_scan();
    var ov = document.getElementById('sg37-launch') || createOverlay('sg37-launch', '&#x1F680; &#xB4DC;&#xB77C;&#xC774;&#xBC84; &#xBC1C;&#xC0AC;&#xAC01; &#xCD5C;&#xC801;&#xD654;&#xAE30;', 'linear-gradient(135deg,#e74c3c,#c0392b)');
    ov.classList.add('active');
    var body = document.getElementById('sg37-launch-body');
    markUsed('launch');

    var angles = [8, 10, 12, 14, 16, 18];
    var spins = [2000, 2500, 3000, 3500, 4000];
    // carry distance matrix [angle][spin] in yards
    var carryData = [
      [215, 210, 200, 188, 172],
      [228, 225, 218, 205, 190],
      [238, 236, 232, 222, 208],
      [242, 240, 235, 228, 215],
      [236, 234, 230, 224, 212],
      [225, 222, 218, 213, 202]
    ];
    var saved = LS('launch') || { selAngle: 2, selSpin: 1, speed: 100 };
    var hoverCell = { r: -1, c: -1 };

    function render() {
      var html = '<div class="sg37-tabs">';
      var speeds = [90, 95, 100, 105, 110, 115];
      speeds.forEach(function(s) {
        html += '<div class="sg37-tab' + (saved.speed === s ? ' active' : '') + '" data-spd="' + s + '">' + s + ' mph</div>';
      });
      html += '</div>';
      html += '<canvas id="sg37-launch-canvas" width="620" height="400" style="width:100%;max-width:620px;border-radius:12px;background:#1a1a2e;display:block;margin:0 auto 12px;cursor:crosshair"></canvas>';

      var speedMult = saved.speed / 100;
      var bestCarry = 0, bestA = 0, bestS = 0;
      angles.forEach(function(a, ai) {
        spins.forEach(function(sp, si) {
          var d = Math.round(carryData[ai][si] * speedMult);
          if (d > bestCarry) { bestCarry = d; bestA = a; bestS = sp; }
        });
      });

      html += '<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;margin-top:8px">';
      html += '<div class="sg37-card" style="text-align:center;padding:12px"><div style="font-size:11px;color:var(--text-muted)">&#xCD5C;&#xC801; &#xBC1C;&#xC0AC;&#xAC01;</div><div style="font-size:20px;font-weight:700;color:#e74c3c">' + bestA + '&deg;</div></div>';
      html += '<div class="sg37-card" style="text-align:center;padding:12px"><div style="font-size:11px;color:var(--text-muted)">&#xCD5C;&#xC801; &#xC2A4;&#xD540;&#xB7C9;</div><div style="font-size:20px;font-weight:700;color:#e74c3c">' + bestS + ' rpm</div></div>';
      html += '<div class="sg37-card" style="text-align:center;padding:12px"><div style="font-size:11px;color:var(--text-muted)">&#xCD5C;&#xB300; &#xCE90;&#xB9AC;</div><div style="font-size:20px;font-weight:700;color:#e74c3c">' + bestCarry + ' yd</div></div>';
      html += '</div>';

      html += '<div style="margin-top:10px;padding:12px;background:var(--bg);border-radius:10px;border:1px solid var(--border)">';
      html += '<div style="font-weight:600;margin-bottom:6px">&#x1F4A1; &#xCD5C;&#xC801;&#xD654; &#xD301;</div>';
      html += '<div class="sg37-stat"><span>&#xD5E4;&#xB4DC;&#xC2A4;&#xD53C;&#xB4DC; ' + saved.speed + 'mph &#xAE30;&#xC900;</span><span style="font-weight:700;color:#e74c3c">' + bestCarry + 'yd</span></div>';
      html += '<div class="sg37-stat"><span>&#xC2A4;&#xD540; &#xC904;&#xC774;&#xAE30;: &#xD2F0; &#xB192;&#xC774; &#xB0AE;&#xCD94;&#xAE30;</span><span style="color:var(--text-muted)">-200~500rpm</span></div>';
      html += '<div class="sg37-stat"><span>&#xBC1C;&#xC0AC;&#xAC01; &#xB192;&#xC774;&#xAE30;: &#xBCFC; &#xC704;&#xCE58; &#xC870;&#xC815;</span><span style="color:var(--text-muted)">+1~2&deg;</span></div>';
      html += '</div>';
      body.innerHTML = html;

      body.querySelectorAll('.sg37-tab[data-spd]').forEach(function(tab) {
        tab.onclick = function() {
          saved.speed = parseInt(this.dataset.spd);
          LS('launch', saved);
          SFX.launch_scan();
          render();
        };
      });

      var cvs = document.getElementById('sg37-launch-canvas');
      if (cvs) {
        cvs.addEventListener('mousemove', function(e) {
          var rect = cvs.getBoundingClientRect();
          var scaleX = 620 / rect.width;
          var mx = (e.clientX - rect.left) * scaleX;
          var my = (e.clientY - rect.top) * scaleX;
          var cellW = 88, cellH = 48, startX = 95, startY = 70;
          var nc = Math.floor((mx - startX) / cellW);
          var nr = Math.floor((my - startY) / cellH);
          if (nc >= 0 && nc < 5 && nr >= 0 && nr < 6) {
            hoverCell = { r: nr, c: nc };
          } else {
            hoverCell = { r: -1, c: -1 };
          }
          drawLaunchCanvas();
        });
        cvs.addEventListener('click', function(e) {
          if (hoverCell.r >= 0 && hoverCell.c >= 0) {
            saved.selAngle = hoverCell.r;
            saved.selSpin = hoverCell.c;
            LS('launch', saved);
            SFX.launch_opt();
            drawLaunchCanvas();
          }
        });
      }

      drawLaunchCanvas();
    }

    function drawLaunchCanvas() {
      var c = document.getElementById('sg37-launch-canvas');
      if (!c) return;
      var ctx = c.getContext('2d');
      var W = 620, H = 400;
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = '#16213e';
      ctx.fillRect(0, 0, W, H);

      ctx.fillStyle = '#e74c3c';
      ctx.font = 'bold 14px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('발사각 × 스핀량 캐리거리 히트맵 (HSP ' + saved.speed + 'mph)', W / 2, 25);

      var cellW = 88, cellH = 48, startX = 95, startY = 70;
      var speedMult = saved.speed / 100;

      // column headers (spins)
      ctx.fillStyle = '#fdcb6e';
      ctx.font = 'bold 11px sans-serif';
      spins.forEach(function(sp, si) {
        ctx.fillText(sp + 'rpm', startX + si * cellW + cellW / 2, startY - 10);
      });

      // row headers (angles)
      ctx.textAlign = 'right';
      angles.forEach(function(a, ai) {
        ctx.fillStyle = '#fdcb6e';
        ctx.font = 'bold 12px sans-serif';
        ctx.fillText(a + '°', startX - 10, startY + ai * cellH + cellH / 2 + 4);
      });

      // find min/max for color scale
      var allVals = [];
      angles.forEach(function(a, ai) {
        spins.forEach(function(sp, si) {
          allVals.push(Math.round(carryData[ai][si] * speedMult));
        });
      });
      var minV = Math.min.apply(null, allVals);
      var maxV = Math.max.apply(null, allVals);

      // draw heatmap cells
      ctx.textAlign = 'center';
      angles.forEach(function(a, ai) {
        spins.forEach(function(sp, si) {
          var val = Math.round(carryData[ai][si] * speedMult);
          var t = (val - minV) / (maxV - minV);
          var r = Math.round(255 * (1 - t) * 0.3 + 231 * t);
          var g = Math.round(255 * (1 - t) * 0.2 + 76 * t);
          var b = Math.round(180 * (1 - t) * 0.3 + 60 * t);
          if (t > 0.7) { r = Math.round(46 + (231 - 46) * (t - 0.7) / 0.3); g = Math.round(204 - 140 * (t - 0.7) / 0.3); b = Math.round(113 - 50 * (t - 0.7) / 0.3); }
          else if (t > 0.4) { r = 46; g = 204; b = 113; }
          else { r = 52; g = 152; b = 219; }

          var x = startX + si * cellW;
          var y = startY + ai * cellH;

          ctx.fillStyle = 'rgb(' + r + ',' + g + ',' + b + ')';
          if (hoverCell.r === ai && hoverCell.c === si) {
            ctx.fillStyle = '#fff';
          }
          ctx.globalAlpha = (hoverCell.r === ai && hoverCell.c === si) ? 0.3 : 0.85;
          ctx.beginPath();
          ctx.roundRect(x + 2, y + 2, cellW - 4, cellH - 4, 6);
          ctx.fill();
          ctx.globalAlpha = 1.0;

          // selected cell border
          if (saved.selAngle === ai && saved.selSpin === si) {
            ctx.strokeStyle = '#fdcb6e';
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.roundRect(x + 1, y + 1, cellW - 2, cellH - 2, 6);
            ctx.stroke();
          }

          ctx.fillStyle = '#fff';
          ctx.font = 'bold 14px sans-serif';
          ctx.fillText(val + 'yd', x + cellW / 2, y + cellH / 2 + 2);

          // percentage from max
          ctx.fillStyle = 'rgba(255,255,255,0.6)';
          ctx.font = '9px sans-serif';
          var pct = Math.round(val / maxV * 100);
          ctx.fillText(pct + '%', x + cellW / 2, y + cellH / 2 + 16);
        });
      });

      // color legend
      ctx.fillStyle = 'rgba(255,255,255,0.5)';
      ctx.font = '10px sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText('■ 높음('+maxV+'yd)', startX, H - 15);
      ctx.fillStyle = '#2ecc71';
      ctx.fillRect(startX + 90, H - 24, 12, 12);
      ctx.fillStyle = 'rgba(255,255,255,0.5)';
      ctx.fillText('■ 중간', startX + 110, H - 15);
      ctx.fillStyle = '#3498db';
      ctx.fillRect(startX + 150, H - 24, 12, 12);
      ctx.fillStyle = 'rgba(255,255,255,0.5)';
      ctx.fillText('■ 낮음('+minV+'yd)', startX + 170, H - 15);

      // Y axis label
      ctx.save();
      ctx.fillStyle = 'rgba(255,255,255,0.5)';
      ctx.font = '11px sans-serif';
      ctx.translate(15, H / 2);
      ctx.rotate(-Math.PI / 2);
      ctx.textAlign = 'center';
      ctx.fillText('발사각(°)', 0, 0);
      ctx.restore();

      // X axis label
      ctx.fillStyle = 'rgba(255,255,255,0.5)';
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('스핀량(rpm)', W / 2, startY - 28);
    }

    render();
  }

  // ========================================================================
  // 2. 코스 매니지먼트 시나리오 Canvas 640x400
  //    Par4 6상황 리스크-리워드 의사결정
  // ========================================================================
  function openCourseManagement() {
    SFX.course_plan();
    var ov = document.getElementById('sg37-cmgmt') || createOverlay('sg37-cmgmt', '&#x1F3CC;&#xFE0F; &#xCF54;&#xC2A4; &#xB9E4;&#xB2C8;&#xC9C0;&#xBA3C;&#xD2B8; &#xC2DC;&#xB098;&#xB9AC;&#xC624;', 'linear-gradient(135deg,#27ae60,#2ecc71)');
    ov.classList.add('active');
    var body = document.getElementById('sg37-cmgmt-body');
    markUsed('cmgmt');

    var scenarios = [
      { name: '페어웨이', risk: 20, reward: 85, par: 4, desc: '안전한 페어웨이 공략', color: '#2ecc71', strategy: '드라이버 페어웨이 → 아이언 그린온' },
      { name: '러프', risk: 45, reward: 60, par: 4, desc: '러프에서의 회복 샷', color: '#f39c12', strategy: '웨지 러프탈출 → 안전 그린온' },
      { name: '벙커', risk: 65, reward: 45, par: 4, desc: '벙커샷 탈출 시나리오', color: '#e67e22', strategy: '오픈 페이스로 탈출 → 업앤다운' },
      { name: '워터', risk: 80, reward: 30, par: 4, desc: '워터 해저드 앞 의사결정', color: '#e74c3c', strategy: '레이업 → 웨지 그린온' },
      { name: 'OB', risk: 95, reward: 15, par: 4, desc: 'OB 위험지역 공략', color: '#c0392b', strategy: '안전 클럽 → 페어웨이 키핑' },
      { name: '그린', risk: 30, reward: 90, par: 4, desc: '그린주변 어프로치', color: '#1abc9c', strategy: '핀 하이 공략 → 2퍼트 목표' }
    ];
    var saved = LS('cmgmt') || { selected: 0, decisions: {} };

    function render() {
      var html = '<div class="sg37-tabs">';
      scenarios.forEach(function(s, i) {
        html += '<div class="sg37-tab' + (saved.selected === i ? ' active' : '') + '" data-idx="' + i + '" style="' + (saved.selected === i ? '' : 'border-color:' + s.color) + '">' + s.name + '</div>';
      });
      html += '</div>';
      html += '<canvas id="sg37-cmgmt-canvas" width="640" height="400" style="width:100%;max-width:640px;border-radius:12px;background:#1a1a2e;display:block;margin:0 auto 12px;cursor:pointer"></canvas>';

      var sc = scenarios[saved.selected];
      html += '<div class="sg37-card" style="border-left:4px solid ' + sc.color + ';padding:14px">';
      html += '<div style="font-weight:700;font-size:15px;margin-bottom:6px">' + sc.name + ' &#xC0C1;&#xD669; (Par ' + sc.par + ')</div>';
      html += '<div style="font-size:13px;color:var(--text-muted);margin-bottom:8px">' + sc.desc + '</div>';
      html += '<div class="sg37-stat"><span>&#xB9AC;&#xC2A4;&#xD06C;</span><span style="font-weight:700;color:' + sc.color + '">' + sc.risk + '%</span></div>';
      html += '<div class="sg37-stat"><span>&#xB9AC;&#xC6CC;&#xB4DC; (Par &#xC138;&#xC774;&#xBE0C; &#xD655;&#xB960;)</span><span style="font-weight:700;color:#2ecc71">' + sc.reward + '%</span></div>';
      html += '<div class="sg37-stat"><span>&#xCD94;&#xCC9C; &#xC804;&#xB7B5;</span><span style="font-weight:600;color:#3498db">' + sc.strategy + '</span></div>';
      html += '</div>';

      // decision tree summary
      html += '<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:8px">';
      html += '<button class="sg37-btn sg37-btn-primary" id="sg37-cm-safe">&#xC548;&#xC804; &#xC804;&#xB7B5; &#xC120;&#xD0DD;</button>';
      html += '<button class="sg37-btn" style="background:linear-gradient(135deg,#e74c3c,#c0392b);color:#fff" id="sg37-cm-aggr">&#xACF5;&#xACA9; &#xC804;&#xB7B5; &#xC120;&#xD0DD;</button>';
      html += '</div>';

      body.innerHTML = html;

      body.querySelectorAll('.sg37-tab[data-idx]').forEach(function(tab) {
        tab.onclick = function() {
          saved.selected = parseInt(this.dataset.idx);
          LS('cmgmt', saved);
          SFX.course_plan();
          render();
        };
      });

      var safeBtn = document.getElementById('sg37-cm-safe');
      var aggrBtn = document.getElementById('sg37-cm-aggr');
      if (safeBtn) safeBtn.onclick = function() { saved.decisions[saved.selected] = 'safe'; LS('cmgmt', saved); SFX.course_decide(); render(); };
      if (aggrBtn) aggrBtn.onclick = function() { saved.decisions[saved.selected] = 'aggr'; LS('cmgmt', saved); SFX.course_decide(); render(); };

      drawCMCanvas();
    }

    function drawCMCanvas() {
      var c = document.getElementById('sg37-cmgmt-canvas');
      if (!c) return;
      var ctx = c.getContext('2d');
      var W = 640, H = 400;
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = '#16213e';
      ctx.fillRect(0, 0, W, H);

      ctx.fillStyle = '#2ecc71';
      ctx.font = 'bold 14px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('리스크 vs 리워드 분석 (Par 4)', W / 2, 25);

      // scatter plot area
      var plotX = 80, plotY = 50, plotW = W - 130, plotH = H - 110;

      // axes
      ctx.strokeStyle = 'rgba(255,255,255,0.2)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(plotX, plotY);
      ctx.lineTo(plotX, plotY + plotH);
      ctx.lineTo(plotX + plotW, plotY + plotH);
      ctx.stroke();

      // grid lines
      for (var i = 0; i <= 4; i++) {
        var gy = plotY + plotH - (i / 4) * plotH;
        var gx = plotX + (i / 4) * plotW;
        ctx.strokeStyle = 'rgba(255,255,255,0.06)';
        ctx.beginPath();
        ctx.moveTo(plotX, gy);
        ctx.lineTo(plotX + plotW, gy);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(gx, plotY);
        ctx.lineTo(gx, plotY + plotH);
        ctx.stroke();

        ctx.fillStyle = 'rgba(255,255,255,0.4)';
        ctx.font = '10px sans-serif';
        ctx.textAlign = 'right';
        ctx.fillText(i * 25 + '%', plotX - 6, gy + 4);
        ctx.textAlign = 'center';
        ctx.fillText(i * 25 + '%', gx, plotY + plotH + 16);
      }

      // axis labels
      ctx.fillStyle = 'rgba(255,255,255,0.5)';
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('리스크 (%)', W / 2, H - 8);
      ctx.save();
      ctx.translate(15, plotY + plotH / 2);
      ctx.rotate(-Math.PI / 2);
      ctx.fillText('리워드 (%)', 0, 0);
      ctx.restore();

      // diagonal optimal line
      ctx.strokeStyle = 'rgba(253,203,110,0.3)';
      ctx.lineWidth = 1;
      ctx.setLineDash([6, 4]);
      ctx.beginPath();
      ctx.moveTo(plotX, plotY);
      ctx.lineTo(plotX + plotW, plotY + plotH);
      ctx.stroke();
      ctx.setLineDash([]);

      // plot scenario bubbles
      scenarios.forEach(function(s, idx) {
        var x = plotX + (s.risk / 100) * plotW;
        var y = plotY + plotH - (s.reward / 100) * plotH;
        var r = 22 + (s.reward / 100) * 10;

        // glow for selected
        if (saved.selected === idx) {
          ctx.shadowColor = s.color;
          ctx.shadowBlur = 20;
        }

        ctx.globalAlpha = 0.7;
        ctx.fillStyle = s.color;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1.0;
        ctx.shadowBlur = 0;

        // border for selected
        if (saved.selected === idx) {
          ctx.strokeStyle = '#fff';
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.arc(x, y, r + 2, 0, Math.PI * 2);
          ctx.stroke();
        }

        // label
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 12px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(s.name, x, y + 4);

        // decision indicator
        if (saved.decisions[idx]) {
          ctx.fillStyle = saved.decisions[idx] === 'safe' ? '#2ecc71' : '#e74c3c';
          ctx.font = '9px sans-serif';
          ctx.fillText(saved.decisions[idx] === 'safe' ? '✔ 안전' : '✖ 공격', x, y + 16);
        }
      });

      // legend
      ctx.fillStyle = 'rgba(255,255,255,0.4)';
      ctx.font = '10px sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText('○ 버블 크기 = 리워드 비례  --- 전략 균형선', plotX, H - 30);
    }

    render();
  }

  // ========================================================================
  // 3. 퍼팅 거리감 트레이너 Canvas 600x380
  //    6거리 목표-실제 편차 바차트 + 세션 히스토리
  // ========================================================================
  function openPuttingTrainer() {
    SFX.putt_train();
    var ov = document.getElementById('sg37-putt') || createOverlay('sg37-putt', '&#x1F3AF; &#xD37C;&#xD305; &#xAC70;&#xB9AC;&#xAC10; &#xD2B8;&#xB808;&#xC774;&#xB108;', 'linear-gradient(135deg,#3498db,#2980b9)');
    ov.classList.add('active');
    var body = document.getElementById('sg37-putt-body');

    markUsed('putt');

    var targets = [5, 10, 15, 20, 25, 30]; // meters
    // 실제 거리는 난수로 만들지 않는다. 사용자가 직접 측정해 입력한 값만 사용한다.
    var storedPutt = LS('putt') || {};
    var saved = {
      sessions: storedPutt.sessions || [],
      current: (storedPutt.current && storedPutt.current.length === targets.length) ? storedPutt.current : targets.map(function(t) {
        return { target: t, actual: null, deviation: null };
      })
    };

    function enteredPutts() { return saved.current.filter(function(d) { return typeof d.actual === 'number'; }); }

    function avgDeviation() {
      var ent = enteredPutts();
      if (!ent.length) return null;
      var total = 0;
      ent.forEach(function(d) { total += Math.abs(d.deviation); });
      return Math.round(total / ent.length * 10) / 10;
    }

    function render() {
      var html = '<canvas id="sg37-putt-canvas" width="600" height="380" style="width:100%;max-width:600px;border-radius:12px;background:#1a1a2e;display:block;margin:0 auto 12px"></canvas>';
      html += '<div style="font-size:12px;color:var(--text-muted);margin-bottom:8px">목표 거리별로 실제 굴러간 거리(m)를 직접 입력하세요.</div>';
      html += '<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px">';
      saved.current.forEach(function(d, i) {
        var has = typeof d.actual === 'number';
        var devColor = !has ? 'var(--text-muted)' : (Math.abs(d.deviation) < 1 ? '#2ecc71' : Math.abs(d.deviation) < 2 ? '#f39c12' : '#e74c3c');
        html += '<div class="sg37-card" style="text-align:center;padding:10px">';
        html += '<div style="font-size:11px;color:var(--text-muted)">목표 ' + d.target + 'm</div>';
        html += '<input type="number" step="0.1" id="sg37-putt-in-' + i + '" value="' + (has ? d.actual : '') + '" style="width:78px;text-align:center;font-size:15px;font-weight:700;border:2px solid #3498db;border-radius:8px;padding:3px;background:var(--bg);color:var(--text)">';
        html += '<div style="font-size:10px;color:' + devColor + ';margin-top:2px">' + (has ? (d.deviation > 0 ? '+' : '') + d.deviation + 'm' : '미입력') + '</div>';
        html += '</div>';
      });
      html += '</div>';

      var avgDev = avgDeviation();
      html += '<div style="text-align:center;margin:12px 0">';
      if (avgDev === null) {
        html += '<span style="font-size:13px;color:var(--text-muted)">실제 거리를 입력하면 평균 편차와 점수가 계산됩니다.</span>';
      } else {
        var score = Math.max(0, Math.round(100 - avgDev * 15));
        html += '<span class="' + gradeClass(score, 100) + '">' + gradeLabel(score, 100) + '</span>';
        html += '<span style="margin-left:8px;font-size:14px;font-weight:600">평균 편차: ' + avgDev + 'm (' + score + '점, 입력 ' + enteredPutts().length + '/' + targets.length + ')</span>';
      }
      html += '</div>';

      html += '<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px">';
      html += '<button class="sg37-btn sg37-btn-primary" id="sg37-putt-apply">입력 적용</button>';
      html += '<button class="sg37-btn sg37-btn-secondary" id="sg37-putt-save">세션 저장</button>';
      html += '<button class="sg37-btn sg37-btn-secondary" id="sg37-putt-clear">입력 지우기</button>';
      html += '</div>';

      body.innerHTML = html;

      document.getElementById('sg37-putt-apply').onclick = function() {
        var any = false;
        saved.current = targets.map(function(t, i) {
          var v = readNum('sg37-putt-in-' + i);
          if (v !== null) any = true;
          return { target: t, actual: v, deviation: v === null ? null : Math.round((v - t) * 10) / 10 };
        });
        if (!any) { alert('실제 거리를 하나 이상 입력하세요.'); return; }
        LS('putt', saved);
        SFX.putt_train();
        render();
      };
      document.getElementById('sg37-putt-save').onclick = function() {
        var avg = avgDeviation();
        if (avg === null) { alert('먼저 [입력 적용]으로 실제 거리를 반영하세요.'); return; }
        var sc = Math.max(0, Math.round(100 - avg * 15));
        saved.sessions.push({ date: new Date().toISOString().slice(0, 10), avg: avg, score: sc, data: saved.current.slice() });
        if (saved.sessions.length > 10) saved.sessions.shift();
        LS('putt', saved);
        SFX.putt_hit();
        evalAchievements();
        render();
      };
      document.getElementById('sg37-putt-clear').onclick = function() {
        saved.current = targets.map(function(t) { return { target: t, actual: null, deviation: null }; });
        LS('putt', saved);
        SFX.putt_train();
        render();
      };

      drawPuttCanvas();
    }

    function drawPuttCanvas() {
      var c = document.getElementById('sg37-putt-canvas');
      if (!c) return;
      var ctx = c.getContext('2d');
      var W = 600, H = 380;
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = '#16213e';
      ctx.fillRect(0, 0, W, H);

      ctx.fillStyle = '#3498db';
      ctx.font = 'bold 14px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('퍼팅 거리감 편차 (직접 입력한 기록)', W / 2, 25);

      var barArea = { x: 50, y: 50, w: 260, h: 260 };

      if (!enteredPutts().length) {
        ctx.fillStyle = 'rgba(255,255,255,0.45)';
        ctx.font = '13px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('실제 거리를 입력하면', barArea.x + barArea.w / 2, barArea.y + barArea.h / 2);
        ctx.fillText('편차 그래프가 표시됩니다', barArea.x + barArea.w / 2, barArea.y + barArea.h / 2 + 18);
      } else {
        ctx.strokeStyle = 'rgba(255,255,255,0.15)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(barArea.x, barArea.y + barArea.h);
        ctx.lineTo(barArea.x + barArea.w, barArea.y + barArea.h);
        ctx.stroke();

        var zeroY = barArea.y + barArea.h / 2;
        ctx.strokeStyle = 'rgba(253,203,110,0.4)';
        ctx.setLineDash([4, 3]);
        ctx.beginPath();
        ctx.moveTo(barArea.x, zeroY);
        ctx.lineTo(barArea.x + barArea.w, zeroY);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.fillStyle = 'rgba(253,203,110,0.5)';
        ctx.font = '9px sans-serif';
        ctx.textAlign = 'right';
        ctx.fillText('0m', barArea.x - 4, zeroY + 3);

        var barW = 32, gap = 10;
        var maxDev = 5;
        saved.current.forEach(function(d, i) {
          var x = barArea.x + 12 + i * (barW + gap);

          ctx.fillStyle = '#fff';
          ctx.font = '10px sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText(d.target + 'm', x + barW / 2, barArea.y + barArea.h + 16);

          if (typeof d.actual !== 'number') {
            ctx.fillStyle = 'rgba(255,255,255,0.3)';
            ctx.font = '9px sans-serif';
            ctx.fillText('-', x + barW / 2, zeroY - 6);
            return;
          }

          var devNorm = Math.max(-maxDev, Math.min(maxDev, d.deviation));
          var barH = (Math.abs(devNorm) / maxDev) * (barArea.h / 2 - 10);
          var barColor = Math.abs(d.deviation) < 1 ? '#2ecc71' : Math.abs(d.deviation) < 2 ? '#f39c12' : '#e74c3c';
          var grad = ctx.createLinearGradient(x, zeroY, x, devNorm >= 0 ? zeroY - barH : zeroY + barH);
          grad.addColorStop(0, barColor);
          grad.addColorStop(1, barColor + '66');
          ctx.fillStyle = grad;

          if (devNorm >= 0) {
            ctx.beginPath();
            ctx.roundRect(x, zeroY - barH, barW, barH, [4, 4, 0, 0]);
            ctx.fill();
          } else {
            ctx.beginPath();
            ctx.roundRect(x, zeroY, barW, barH, [0, 0, 4, 4]);
            ctx.fill();
          }

          ctx.fillStyle = barColor;
          ctx.font = 'bold 10px sans-serif';
          ctx.textAlign = 'center';
          var labelY = devNorm >= 0 ? zeroY - barH - 8 : zeroY + barH + 14;
          ctx.fillText((d.deviation > 0 ? '+' : '') + d.deviation, x + barW / 2, labelY);
        });
      }

      // session history line chart - right half (사용자가 저장한 세션만 표시)
      var lineArea = { x: 370, y: 50, w: 200, h: 260 };
      ctx.fillStyle = 'rgba(255,255,255,0.5)';
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('세션 히스토리', lineArea.x + lineArea.w / 2, 44);

      if (saved.sessions.length > 1) {
        ctx.strokeStyle = 'rgba(255,255,255,0.15)';
        ctx.beginPath();
        ctx.moveTo(lineArea.x, lineArea.y + lineArea.h);
        ctx.lineTo(lineArea.x + lineArea.w, lineArea.y + lineArea.h);
        ctx.stroke();

        var maxAvg = 5;
        ctx.beginPath();
        ctx.strokeStyle = '#3498db';
        ctx.lineWidth = 2;
        saved.sessions.forEach(function(sess, i) {
          var x = lineArea.x + (i / (saved.sessions.length - 1)) * lineArea.w;
          var y = lineArea.y + lineArea.h - (Math.min(sess.avg, maxAvg) / maxAvg) * lineArea.h;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        });
        ctx.stroke();

        saved.sessions.forEach(function(sess, i) {
          var x = lineArea.x + (i / (saved.sessions.length - 1)) * lineArea.w;
          var y = lineArea.y + lineArea.h - (Math.min(sess.avg, maxAvg) / maxAvg) * lineArea.h;
          ctx.fillStyle = '#3498db';
          ctx.beginPath();
          ctx.arc(x, y, 4, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = '#fff';
          ctx.font = '8px sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText(sess.avg + 'm', x, y - 10);
        });
      } else {
        ctx.fillStyle = 'rgba(255,255,255,0.3)';
        ctx.font = '12px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('세션을 2회 이상', lineArea.x + lineArea.w / 2, lineArea.y + lineArea.h / 2);
        ctx.fillText('저장하면 그래프 표시', lineArea.x + lineArea.w / 2, lineArea.y + lineArea.h / 2 + 18);
      }

      ctx.fillStyle = 'rgba(255,255,255,0.4)';
      ctx.font = '10px sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText('■ 초록: <1m  ■ 주황: 1~2m  ■ 빨강: >2m 편차', 50, H - 10);
    }

    render();
  }

  // ========================================================================
  // 4. 스코어 분포 벨커브 Canvas 620x400
  //    정규분포 히스토그램 + 가우시안 커브
  // ========================================================================
  function openScoreBellCurve() {
    SFX.bell_curve();
    var ov = document.getElementById('sg37-bell') || createOverlay('sg37-bell', '&#x1F4CA; &#xC2A4;&#xCF54;&#xC5B4; &#xBD84;&#xD3EC; &#xBCA8;&#xCEE4;&#xBE0C;', 'linear-gradient(135deg,#9b59b6,#8e44ad)');
    ov.classList.add('active');
    var body = document.getElementById('sg37-bell-body');

    markUsed('bell');

    // 30라운드 표본 자동 생성 제거: 사용자가 직접 입력한 스코어만 사용한다.
    var saved = LS('bell') || { scores: [] };

    function calcStats(arr) {
      var n = arr.length;
      var sum = 0; arr.forEach(function(v) { sum += v; });
      var mean = sum / n;
      var sqSum = 0; arr.forEach(function(v) { sqSum += (v - mean) * (v - mean); });
      var stddev = Math.sqrt(sqSum / n);
      var sorted = arr.slice().sort(function(a, b) { return a - b; });
      var best = sorted[0];
      var worst = sorted[n - 1];
      // mode
      var freq = {};
      arr.forEach(function(v) { freq[v] = (freq[v] || 0) + 1; });
      var mode = arr[0], maxFreq = 0;
      for (var k in freq) { if (freq[k] > maxFreq) { maxFreq = freq[k]; mode = parseInt(k); } }
      return { mean: Math.round(mean * 10) / 10, stddev: Math.round(stddev * 10) / 10, best: best, worst: worst, mode: mode, median: sorted[Math.floor(n / 2)] };
    }

    function render() {
      var stats = saved.scores.length ? calcStats(saved.scores) : null;
      var html = '<canvas id="sg37-bell-canvas" width="620" height="400" style="width:100%;max-width:620px;border-radius:12px;background:#1a1a2e;display:block;margin:0 auto 12px;cursor:crosshair"></canvas>';

      html += '<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px">';
      html += '<div class="sg37-card" style="text-align:center"><div style="font-size:11px;color:var(--text-muted)">평균</div><div style="font-size:20px;font-weight:700;color:#9b59b6">' + (stats ? stats.mean : '-') + '</div></div>';
      html += '<div class="sg37-card" style="text-align:center"><div style="font-size:11px;color:var(--text-muted)">표준편차</div><div style="font-size:20px;font-weight:700;color:#e74c3c">' + (stats ? stats.stddev : '-') + '</div></div>';
      html += '<div class="sg37-card" style="text-align:center"><div style="font-size:11px;color:var(--text-muted)">베스트</div><div style="font-size:20px;font-weight:700;color:#2ecc71">' + (stats ? stats.best : '-') + '</div></div>';
      html += '<div class="sg37-card" style="text-align:center"><div style="font-size:11px;color:var(--text-muted)">모드</div><div style="font-size:20px;font-weight:700;color:#3498db">' + (stats ? stats.mode : '-') + '</div></div>';
      html += '<div class="sg37-card" style="text-align:center"><div style="font-size:11px;color:var(--text-muted)">중앙값</div><div style="font-size:20px;font-weight:700;color:#f39c12">' + (stats ? stats.median : '-') + '</div></div>';
      html += '<div class="sg37-card" style="text-align:center"><div style="font-size:11px;color:var(--text-muted)">입력한 라운드 수</div><div style="font-size:20px;font-weight:700">' + saved.scores.length + '</div></div>';
      html += '</div>';

      html += '<div style="display:flex;align-items:center;gap:8px;margin-top:10px">';
      html += '<span style="font-size:12px;color:var(--text-muted)">라운드 스코어</span>';
      html += '<input type="number" id="sg37-bell-score" min="50" max="200" style="width:90px;text-align:center;font-size:15px;font-weight:700;border:2px solid #9b59b6;border-radius:8px;padding:3px;background:var(--bg);color:var(--text)">';
      html += '</div>';

      html += '<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:8px">';
      html += '<button class="sg37-btn sg37-btn-primary" id="sg37-bell-add">라운드 추가</button>';
      html += '<button class="sg37-btn sg37-btn-secondary" id="sg37-bell-reset">초기화</button>';
      html += '</div>';

      body.innerHTML = html;

      document.getElementById('sg37-bell-add').onclick = function() {
        var s = readNum('sg37-bell-score');
        if (s === null) { alert('라운드 스코어를 입력하세요.'); return; }
        saved.scores.push(Math.round(s));
        if (saved.scores.length > 50) saved.scores.shift();
        LS('bell', saved);
        SFX.bell_mark();
        evalAchievements();
        render();
      };
      document.getElementById('sg37-bell-reset').onclick = function() {
        saved.scores = [];
        LS('bell', saved);
        SFX.bell_curve();
        render();
      };

      drawBellCanvas();
    }

    function drawBellCanvas() {
      var c = document.getElementById('sg37-bell-canvas');
      if (!c) return;
      var ctx = c.getContext('2d');
      var W = 620, H = 400;
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = '#16213e';
      ctx.fillRect(0, 0, W, H);

      if (saved.scores.length < 3) {
        ctx.fillStyle = 'rgba(255,255,255,0.3)';
        ctx.font = '14px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('데이터가 부족합니다. 라운드를 추가해주세요.', W / 2, H / 2);
        return;
      }

      var stats = calcStats(saved.scores);

      ctx.fillStyle = '#9b59b6';
      ctx.font = 'bold 14px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('스코어 분포 (직접 입력한 ' + saved.scores.length + '라운드)', W / 2, 25);

      // build histogram bins
      var minScore = stats.best - 2;
      var maxScore = stats.worst + 2;
      var binSize = 2;
      var bins = [];
      for (var b = minScore; b <= maxScore; b += binSize) {
        var count = 0;
        saved.scores.forEach(function(s) { if (s >= b && s < b + binSize) count++; });
        bins.push({ start: b, count: count });
      }
      var maxCount = Math.max.apply(null, bins.map(function(b2) { return b2.count; }));
      if (maxCount === 0) maxCount = 1;

      var chartX = 60, chartY = 50, chartW = W - 100, chartH = 280;

      // draw histogram bars
      var barW = Math.min(chartW / bins.length - 2, 30);
      bins.forEach(function(bin, i) {
        var x = chartX + (i / bins.length) * chartW + 1;
        var barH = (bin.count / maxCount) * chartH;
        var y = chartY + chartH - barH;

        var grad = ctx.createLinearGradient(x, y, x, chartY + chartH);
        grad.addColorStop(0, '#9b59b6');
        grad.addColorStop(1, '#8e44ad');
        ctx.fillStyle = grad;
        ctx.globalAlpha = 0.7;
        ctx.beginPath();
        ctx.roundRect(x, y, barW, barH, [3, 3, 0, 0]);
        ctx.fill();
        ctx.globalAlpha = 1.0;

        // bin label
        ctx.fillStyle = 'rgba(255,255,255,0.5)';
        ctx.font = '9px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(bin.start + '', x + barW / 2, chartY + chartH + 14);
      });

      // Gaussian curve overlay
      ctx.beginPath();
      ctx.strokeStyle = '#fdcb6e';
      ctx.lineWidth = 2.5;
      var mean = stats.mean, sd = stats.stddev;
      for (var px = 0; px < chartW; px++) {
        var scoreVal = minScore + (px / chartW) * (maxScore - minScore);
        var z = (scoreVal - mean) / sd;
        var gaussY = Math.exp(-0.5 * z * z) / (sd * Math.sqrt(2 * Math.PI));
        var normH = (gaussY * sd * binSize * saved.scores.length / maxCount) * chartH * 0.9;
        var cx = chartX + px;
        var cy = chartY + chartH - Math.min(normH, chartH);
        if (px === 0) ctx.moveTo(cx, cy);
        else ctx.lineTo(cx, cy);
      }
      ctx.stroke();

      // markers
      // mean marker
      var meanX = chartX + ((mean - minScore) / (maxScore - minScore)) * chartW;
      ctx.strokeStyle = '#e74c3c';
      ctx.lineWidth = 2;
      ctx.setLineDash([5, 3]);
      ctx.beginPath();
      ctx.moveTo(meanX, chartY);
      ctx.lineTo(meanX, chartY + chartH);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = '#e74c3c';
      ctx.font = 'bold 10px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('μ=' + stats.mean, meanX, chartY - 5);

      // best marker
      var bestX = chartX + ((stats.best - minScore) / (maxScore - minScore)) * chartW;
      ctx.fillStyle = '#2ecc71';
      ctx.beginPath();
      ctx.moveTo(bestX, chartY + chartH + 2);
      ctx.lineTo(bestX - 6, chartY + chartH + 12);
      ctx.lineTo(bestX + 6, chartY + chartH + 12);
      ctx.closePath();
      ctx.fill();
      ctx.font = '9px sans-serif';
      ctx.fillText('Best ' + stats.best, bestX, chartY + chartH + 24);

      // mode marker
      var modeX = chartX + ((stats.mode - minScore) / (maxScore - minScore)) * chartW;
      ctx.fillStyle = '#3498db';
      ctx.font = '9px sans-serif';
      ctx.fillText('Mode ' + stats.mode, modeX, chartY - 18);

      // std dev bands
      ctx.fillStyle = 'rgba(155,89,182,0.1)';
      var sd1Left = chartX + ((mean - sd - minScore) / (maxScore - minScore)) * chartW;
      var sd1Right = chartX + ((mean + sd - minScore) / (maxScore - minScore)) * chartW;
      ctx.fillRect(sd1Left, chartY, sd1Right - sd1Left, chartH);
      ctx.fillStyle = 'rgba(255,255,255,0.3)';
      ctx.font = '8px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('±1σ', meanX, chartY + chartH + 36);

      // axis
      ctx.strokeStyle = 'rgba(255,255,255,0.2)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(chartX, chartY + chartH);
      ctx.lineTo(chartX + chartW, chartY + chartH);
      ctx.stroke();

      // legend
      ctx.fillStyle = 'rgba(255,255,255,0.4)';
      ctx.font = '10px sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText('■ 히스토그램  — 가우시안 커브  --- 평균선', chartX, H - 8);
    }

    render();
  }

  // ========================================================================
  // 5. 라운드 에너지 매니저 Canvas 600x380
  //    18홀 체력/집중력/감정 3축 라인차트
  // ========================================================================
  function openEnergyManager() {
    SFX.energy_log();
    var ov = document.getElementById('sg37-energy') || createOverlay('sg37-energy', '&#x26A1; &#xB77C;&#xC6B4;&#xB4DC; &#xC5D0;&#xB108;&#xC9C0; &#xB9E4;&#xB2C8;&#xC800;', 'linear-gradient(135deg,#f39c12,#e67e22)');
    ov.classList.add('active');
    var body = document.getElementById('sg37-energy-body');

    markUsed('energy');

    // 18홀 체력/집중력/감정은 난수로 만들지 않고 사용자가 입력한 값만 사용한다.
    var storedEnergy = LS('energy') || {};
    var saved = { holes: (storedEnergy.holes && storedEnergy.holes.length === 18) ? storedEnergy.holes : [] };

    // 보충 포인트는 일반적인 권장 타이밍 안내이며, 수치화된 효과(+15 체력 등)는 근거가 없어 삭제했다.
    var boostPoints = [
      { hole: 5, type: '간식', icon: '🍫' },
      { hole: 9, type: '수분', icon: '💧' },
      { hole: 12, type: '스트레칭', icon: '🧘' },
      { hole: 15, type: '수분 + 간식', icon: '🍌' }
    ];

    function holeAt(i) { return saved.holes[i] || {}; }

    function avgOf(key) {
      var vals = [];
      for (var i = 0; i < 18; i++) {
        var v = holeAt(i)[key];
        if (typeof v === 'number') vals.push(v);
      }
      if (!vals.length) return null;
      return Math.round(vals.reduce(function(a, b) { return a + b; }, 0) / vals.length);
    }

    function pointsOf(key) {
      var pts = [];
      for (var i = 0; i < 18; i++) {
        var v = holeAt(i)[key];
        if (typeof v === 'number') pts.push({ i: i, v: v });
      }
      return pts;
    }

    function render() {
      var html = '<canvas id="sg37-energy-canvas" width="600" height="380" style="width:100%;max-width:600px;border-radius:12px;background:#1a1a2e;display:block;margin:0 auto 12px"></canvas>';

      var avgStam = avgOf('stamina'), avgFocus = avgOf('focus'), avgEmo = avgOf('emotion');
      html += '<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px">';
      html += '<div class="sg37-card" style="text-align:center;border-left:4px solid #e74c3c"><div style="font-size:11px;color:var(--text-muted)">체력 평균</div><div style="font-size:20px;font-weight:700;color:#e74c3c">' + (avgStam === null ? '-' : avgStam + '%') + '</div></div>';
      html += '<div class="sg37-card" style="text-align:center;border-left:4px solid #3498db"><div style="font-size:11px;color:var(--text-muted)">집중력 평균</div><div style="font-size:20px;font-weight:700;color:#3498db">' + (avgFocus === null ? '-' : avgFocus + '%') + '</div></div>';
      html += '<div class="sg37-card" style="text-align:center;border-left:4px solid #2ecc71"><div style="font-size:11px;color:var(--text-muted)">감정 평균</div><div style="font-size:20px;font-weight:700;color:#2ecc71">' + (avgEmo === null ? '-' : avgEmo + '%') + '</div></div>';
      html += '</div>';

      html += '<div style="margin-top:10px;font-size:12px;color:var(--text-muted)">홀별 체력/집중력/감정을 0~100으로 직접 입력하세요(빈칸은 미입력).</div>';
      html += '<div style="display:grid;grid-template-columns:34px 1fr 1fr 1fr;gap:4px;margin-top:6px;font-size:10px;color:var(--text-muted);text-align:center"><div></div><div>체력</div><div>집중력</div><div>감정</div></div>';
      for (var i = 0; i < 18; i++) {
        var h = holeAt(i);
        html += '<div style="display:grid;grid-template-columns:34px 1fr 1fr 1fr;gap:4px;align-items:center;margin-bottom:4px">';
        html += '<div style="font-size:11px;font-weight:700">' + (i + 1) + 'H</div>';
        html += '<input type="number" id="sg37-en-st-' + i + '" min="0" max="100" value="' + (typeof h.stamina === 'number' ? h.stamina : '') + '" style="width:100%;text-align:center">';
        html += '<input type="number" id="sg37-en-fo-' + i + '" min="0" max="100" value="' + (typeof h.focus === 'number' ? h.focus : '') + '" style="width:100%;text-align:center">';
        html += '<input type="number" id="sg37-en-em-' + i + '" min="0" max="100" value="' + (typeof h.emotion === 'number' ? h.emotion : '') + '" style="width:100%;text-align:center">';
        html += '</div>';
      }

      html += '<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:8px">';
      html += '<button class="sg37-btn sg37-btn-primary" id="sg37-energy-save">기록 저장</button>';
      html += '<button class="sg37-btn sg37-btn-secondary" id="sg37-energy-clear">전체 삭제</button>';
      html += '</div>';

      html += '<div style="margin-top:10px;padding:12px;background:var(--bg);border-radius:10px;border:1px solid var(--border)">';
      html += '<div style="font-weight:600;margin-bottom:6px">&#x1F4A1; 에너지 보충 포인트(권장 타이밍)</div>';
      boostPoints.forEach(function(bp) {
        html += '<div class="sg37-stat"><span>' + bp.icon + ' ' + bp.hole + '번 홀 후: ' + bp.type + '</span></div>';
      });
      html += '</div>';

      body.innerHTML = html;

      document.getElementById('sg37-energy-save').onclick = function() {
        var any = false;
        var next = [];
        for (var i = 0; i < 18; i++) {
          var st = readNum('sg37-en-st-' + i);
          var fo = readNum('sg37-en-fo-' + i);
          var em = readNum('sg37-en-em-' + i);
          if (st !== null || fo !== null || em !== null) any = true;
          next.push({
            hole: i + 1,
            stamina: st === null ? null : Math.max(0, Math.min(100, Math.round(st))),
            focus: fo === null ? null : Math.max(0, Math.min(100, Math.round(fo))),
            emotion: em === null ? null : Math.max(0, Math.min(100, Math.round(em)))
          });
        }
        if (!any) { alert('홀별 값을 하나 이상 입력하세요.'); return; }
        saved.holes = next;
        storedEnergy.holes = next;
        LS('energy', storedEnergy);
        SFX.energy_boost();
        evalAchievements();
        render();
      };
      document.getElementById('sg37-energy-clear').onclick = function() {
        saved.holes = [];
        storedEnergy.holes = [];
        LS('energy', storedEnergy);
        SFX.energy_log();
        render();
      };

      drawEnergyCanvas();
    }

    function drawEnergyCanvas() {
      var c = document.getElementById('sg37-energy-canvas');
      if (!c) return;
      var ctx = c.getContext('2d');
      var W = 600, H = 380;
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = '#16213e';
      ctx.fillRect(0, 0, W, H);

      ctx.fillStyle = '#f39c12';
      ctx.font = 'bold 14px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('18홀 에너지 추이 (직접 입력한 기록)', W / 2, 25);

      var lines = [
        { key: 'stamina', color: '#e74c3c', label: '체력' },
        { key: 'focus', color: '#3498db', label: '집중력' },
        { key: 'emotion', color: '#2ecc71', label: '감정' }
      ];

      var hasAny = lines.some(function(l) { return pointsOf(l.key).length > 0; });
      if (!hasAny) { drawEmpty(ctx, W, H, '홀별 체력/집중력/감정을 입력하면 표시됩니다'); return; }

      var chartX = 50, chartY = 50, chartW = W - 80, chartH = 260;

      ctx.strokeStyle = 'rgba(255,255,255,0.08)';
      ctx.lineWidth = 1;
      for (var i = 0; i <= 4; i++) {
        var gy = chartY + chartH - (i / 4) * chartH;
        ctx.beginPath();
        ctx.moveTo(chartX, gy);
        ctx.lineTo(chartX + chartW, gy);
        ctx.stroke();
        ctx.fillStyle = 'rgba(255,255,255,0.3)';
        ctx.font = '9px sans-serif';
        ctx.textAlign = 'right';
        ctx.fillText(i * 25 + '%', chartX - 5, gy + 3);
      }

      ctx.textAlign = 'center';
      for (var h = 0; h < 18; h++) {
        var hx = chartX + (h / 17) * chartW;
        ctx.fillStyle = 'rgba(255,255,255,0.3)';
        ctx.font = '8px sans-serif';
        if (h % 3 === 0 || h === 17) ctx.fillText((h + 1) + 'H', hx, chartY + chartH + 14);
      }

      lines.forEach(function(line) {
        var pts = pointsOf(line.key);
        if (!pts.length) return;

        ctx.beginPath();
        ctx.strokeStyle = line.color;
        ctx.lineWidth = 2.5;
        pts.forEach(function(p, idx) {
          var x = chartX + (p.i / 17) * chartW;
          var y = chartY + chartH - (p.v / 100) * chartH;
          if (idx === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        });
        ctx.stroke();

        pts.forEach(function(p) {
          var x = chartX + (p.i / 17) * chartW;
          var y = chartY + chartH - (p.v / 100) * chartH;
          ctx.fillStyle = line.color;
          ctx.beginPath();
          ctx.arc(x, y, 2.5, 0, Math.PI * 2);
          ctx.fill();
        });
      });

      // boost markers (권장 타이밍 표시)
      boostPoints.forEach(function(bp) {
        var x = chartX + ((bp.hole - 1) / 17) * chartW;
        ctx.strokeStyle = '#fdcb6e';
        ctx.lineWidth = 1;
        ctx.setLineDash([3, 3]);
        ctx.beginPath();
        ctx.moveTo(x, chartY);
        ctx.lineTo(x, chartY + chartH);
        ctx.stroke();
        ctx.setLineDash([]);

        ctx.fillStyle = '#fdcb6e';
        ctx.font = 'bold 10px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(bp.icon, x, chartY - 5);
      });

      // turn marker (hole 9-10)
      var turnX = chartX + (8.5 / 17) * chartW;
      ctx.strokeStyle = 'rgba(255,255,255,0.2)';
      ctx.lineWidth = 2;
      ctx.setLineDash([6, 4]);
      ctx.beginPath();
      ctx.moveTo(turnX, chartY);
      ctx.lineTo(turnX, chartY + chartH);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = 'rgba(255,255,255,0.3)';
      ctx.font = '9px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('턴', turnX, chartY + chartH + 26);

      ctx.font = '10px sans-serif';
      ctx.textAlign = 'left';
      lines.forEach(function(line, i) {
        var lx = chartX + i * 90;
        ctx.fillStyle = line.color;
        ctx.fillRect(lx, H - 16, 12, 10);
        ctx.fillStyle = 'rgba(255,255,255,0.5)';
        ctx.fillText(line.label, lx + 16, H - 7);
      });
    }

    render();
  }

  // ========================================================================
  // 6. 클럽별 미스샷 패턴 분석기 Canvas 620x380
  //    13클럽 x 6미스유형 히트맵
  // ========================================================================
  function openMissShotAnalyzer() {
    SFX.miss_scan();
    var ov = document.getElementById('sg37-miss') || createOverlay('sg37-miss', '&#x1F6D1; &#xD074;&#xB7FD;&#xBCC4; &#xBBF8;&#xC2A4;&#xC0F7; &#xD328;&#xD134; &#xBD84;&#xC11D;&#xAE30;', 'linear-gradient(135deg,#e74c3c,#c0392b)');
    ov.classList.add('active');
    var body = document.getElementById('sg37-miss-body');
    markUsed('miss');

    var clubs = ['DR', '3W', '5W', '3I', '4I', '5I', '6I', '7I', '8I', '9I', 'PW', 'AW', 'SW'];
    var missTypes = ['슬라이스', '훅', '탑', '청크', '생크', '푸시'];
    // frequency data: [club][missType] 0~10
    var freqData = [
      [7, 3, 2, 1, 0, 5],
      [6, 4, 3, 2, 0, 4],
      [5, 4, 3, 2, 1, 3],
      [4, 3, 4, 3, 2, 2],
      [4, 3, 4, 4, 2, 2],
      [3, 4, 3, 5, 2, 2],
      [3, 5, 2, 5, 3, 1],
      [2, 5, 2, 5, 3, 1],
      [2, 4, 3, 6, 3, 1],
      [1, 3, 4, 6, 4, 1],
      [1, 2, 4, 7, 4, 1],
      [1, 2, 5, 7, 5, 1],
      [1, 1, 5, 8, 5, 0]
    ];
    var drills = {
      '슬라이스': '그립 강화 + 인사이드-아웃 스윙 경로 연습',
      '훅': '클럽페이스 닫기 + 백스윙 템포 늘리기',
      '탑': '볼 위치 앞으로 + 다운블로 강화',
      '청크': '체중이동 선행 + 손목 각도 유지',
      '생크': '어드레스 간격 확인 + 힐 고정',
      '푸시': '얼라인먼트 체크 + 아웃사이드-인 경로'
    };
    var saved = LS('miss') || { selClub: 0 };
    var hoverMiss = { r: -1, c: -1 };

    function render() {
      var html = '<canvas id="sg37-miss-canvas" width="620" height="380" style="width:100%;max-width:620px;border-radius:12px;background:#1a1a2e;display:block;margin:0 auto 12px;cursor:crosshair"></canvas>';

      // worst miss for selected club
      var clubFreqs = freqData[saved.selClub];
      var maxIdx = 0;
      clubFreqs.forEach(function(f, i) { if (f > clubFreqs[maxIdx]) maxIdx = i; });

      html += '<div class="sg37-card" style="border-left:4px solid #e74c3c;padding:14px">';
      html += '<div style="font-weight:700;font-size:15px;margin-bottom:6px">' + clubs[saved.selClub] + ' &#xC8FC;&#xC694; &#xBBF8;&#xC2A4;&#xC0F7;: <span style="color:#e74c3c">' + missTypes[maxIdx] + '</span></div>';
      html += '<div style="font-size:13px;color:var(--text-muted);margin-bottom:8px">&#xAD50;&#xC815; &#xB4DC;&#xB9B4;: ' + drills[missTypes[maxIdx]] + '</div>';
      html += '<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:4px">';
      missTypes.forEach(function(mt, mi) {
        var val = clubFreqs[mi];
        var color = val >= 6 ? '#e74c3c' : val >= 4 ? '#f39c12' : val >= 2 ? '#3498db' : '#2ecc71';
        html += '<div style="font-size:11px;padding:4px;text-align:center;background:var(--bg);border-radius:6px;border:1px solid var(--border)">';
        html += '<span style="color:' + color + ';font-weight:700">' + mt + ': ' + val + '/10</span></div>';
      });
      html += '</div></div>';

      html += '<div class="sg37-tabs">';
      clubs.forEach(function(cl, ci) {
        html += '<div class="sg37-tab' + (saved.selClub === ci ? ' active' : '') + '" data-ci="' + ci + '">' + cl + '</div>';
      });
      html += '</div>';

      body.innerHTML = html;

      body.querySelectorAll('.sg37-tab[data-ci]').forEach(function(tab) {
        tab.onclick = function() {
          saved.selClub = parseInt(this.dataset.ci);
          LS('miss', saved);
          SFX.miss_drill();
          render();
        };
      });

      var cvs = document.getElementById('sg37-miss-canvas');
      if (cvs) {
        cvs.addEventListener('mousemove', function(e) {
          var rect = cvs.getBoundingClientRect();
          var scaleX = 620 / rect.width;
          var mx = (e.clientX - rect.left) * scaleX;
          var my = (e.clientY - rect.top) * scaleX;
          var cellW = 38, cellH = 40, startX = 55, startY = 55;
          var nc = Math.floor((mx - startX) / cellW);
          var nr = Math.floor((my - startY) / cellH);
          if (nc >= 0 && nc < 6 && nr >= 0 && nr < 13) {
            hoverMiss = { r: nr, c: nc };
          } else {
            hoverMiss = { r: -1, c: -1 };
          }
          drawMissCanvas();
        });
      }

      drawMissCanvas();
    }

    function drawMissCanvas() {
      var c = document.getElementById('sg37-miss-canvas');
      if (!c) return;
      var ctx = c.getContext('2d');
      var W = 620, H = 380;
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = '#16213e';
      ctx.fillRect(0, 0, W, H);

      ctx.fillStyle = '#e74c3c';
      ctx.font = 'bold 14px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('클럽별 미스샷 빈도 히트맵', W / 2, 22);

      var cellW = 38, cellH = 22, startX = 55, startY = 55;

      // column headers
      ctx.fillStyle = '#fdcb6e';
      ctx.font = 'bold 10px sans-serif';
      missTypes.forEach(function(mt, mi) {
        ctx.fillText(mt, startX + mi * cellW + cellW / 2, startY - 8);
      });

      // heatmap grid label area (right side for drill recommendation)
      var drillX = startX + 6 * cellW + 20;

      // row headers + cells
      clubs.forEach(function(cl, ci) {
        ctx.fillStyle = ci === saved.selClub ? '#fff' : '#fdcb6e';
        ctx.font = ci === saved.selClub ? 'bold 11px sans-serif' : '10px sans-serif';
        ctx.textAlign = 'right';
        ctx.fillText(cl, startX - 8, startY + ci * cellH + cellH / 2 + 3);

        // cells
        freqData[ci].forEach(function(val, mi) {
          var x = startX + mi * cellW;
          var y = startY + ci * cellH;

          // color intensity
          var t = val / 10;
          var r2 = Math.round(22 + t * 209);
          var g2 = Math.round(160 - t * 100);
          var b2 = Math.round(133 - t * 90);
          ctx.fillStyle = 'rgb(' + r2 + ',' + g2 + ',' + b2 + ')';

          if (hoverMiss.r === ci && hoverMiss.c === mi) {
            ctx.fillStyle = '#fff';
            ctx.globalAlpha = 0.4;
          } else {
            ctx.globalAlpha = 0.85;
          }

          ctx.beginPath();
          ctx.roundRect(x + 1, y + 1, cellW - 2, cellH - 2, 3);
          ctx.fill();
          ctx.globalAlpha = 1.0;

          // selected club highlight
          if (ci === saved.selClub) {
            ctx.strokeStyle = '#fdcb6e';
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.roundRect(x + 1, y + 1, cellW - 2, cellH - 2, 3);
            ctx.stroke();
          }

          // value text
          ctx.fillStyle = val >= 5 ? '#fff' : 'rgba(255,255,255,0.7)';
          ctx.font = 'bold 10px sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText(val, x + cellW / 2, y + cellH / 2 + 3);
        });

        // worst miss indicator on right
        var worstIdx = 0;
        freqData[ci].forEach(function(v, mi) { if (v > freqData[ci][worstIdx]) worstIdx = mi; });
        ctx.fillStyle = 'rgba(255,255,255,0.4)';
        ctx.font = '9px sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText('→ ' + missTypes[worstIdx], drillX, startY + ci * cellH + cellH / 2 + 3);
      });

      // color legend
      ctx.textAlign = 'center';
      ctx.font = '9px sans-serif';
      var legX = startX, legY = H - 25;
      for (var lv = 0; lv <= 10; lv += 2) {
        var lt = lv / 10;
        var lr = Math.round(22 + lt * 209);
        var lg = Math.round(160 - lt * 100);
        var lb = Math.round(133 - lt * 90);
        ctx.fillStyle = 'rgb(' + lr + ',' + lg + ',' + lb + ')';
        ctx.fillRect(legX + lv * 12, legY, 20, 10);
        ctx.fillStyle = 'rgba(255,255,255,0.4)';
        ctx.fillText(lv + '', legX + lv * 12 + 10, legY + 20);
      }
      ctx.fillStyle = 'rgba(255,255,255,0.4)';
      ctx.fillText('빈도 (0=낮음 ~ 10=높음)', legX + 80, legY - 6);
    }

    render();
  }

  // ========================================================================
  // 7. 골프 심리 프로파일러 Canvas 620x400
  //    6축 레이더차트 + 4유형 분류
  // ========================================================================
  function openPsychProfiler() {
    SFX.psych_scan();
    var ov = document.getElementById('sg37-psych') || createOverlay('sg37-psych', '&#x1F9E0; &#xACE8;&#xD504; &#xC2EC;&#xB9AC; &#xD504;&#xB85C;&#xD30C;&#xC77C;&#xB7EC;', 'linear-gradient(135deg,#1abc9c,#16a085)');
    ov.classList.add('active');
    var body = document.getElementById('sg37-psych-body');
    markUsed('psych');

    var axes = [
      { name: '자신감', key: 'confidence' },
      { name: '집중력', key: 'focus' },
      { name: '회복력', key: 'resilience' },
      { name: '루틴일관성', key: 'routine' },
      { name: '압박대처', key: 'pressure' },
      { name: '전략사고', key: 'strategy' }
    ];
    var types = [
      { name: 'Aggressive', desc: '공격적인 플레이어', color: '#e74c3c', traits: '자신감+압박대처 우세', cond: function(d) { return d.confidence >= 75 && d.pressure >= 70; } },
      { name: 'Conservative', desc: '안정적인 플레이어', color: '#3498db', traits: '루틴+전략사고 우세', cond: function(d) { return d.routine >= 75 && d.strategy >= 70; } },
      { name: 'Analytical', desc: '분석적인 플레이어', color: '#2ecc71', traits: '전략+집중력 우세', cond: function(d) { return d.strategy >= 75 && d.focus >= 70; } },
      { name: 'Instinctive', desc: '직관적인 플레이어', color: '#f39c12', traits: '회복력+자신감 우세', cond: function(d) { return d.resilience >= 70 && d.confidence >= 65; } }
    ];

    // 난수 초기화와 즉시 영구저장을 제거했다.
    // 평가 전에는 중립값(50)만 두고, 사용자가 슬라이더를 움직였을 때만 저장한다.
    var storedPsych = LS('psych');
    var hasProfile = !!storedPsych;
    var saved = storedPsych || { confidence: 50, focus: 50, resilience: 50, routine: 50, pressure: 50, strategy: 50 };

    function getType() {
      for (var i = 0; i < types.length; i++) {
        if (types[i].cond(saved)) return types[i];
      }
      // default by highest axes
      var vals = [saved.confidence + saved.pressure, saved.routine + saved.strategy, saved.strategy + saved.focus, saved.resilience + saved.confidence];
      var maxI = 0;
      vals.forEach(function(v, i) { if (v > vals[maxI]) maxI = i; });
      return types[maxI];
    }

    function render() {
      var myType = hasProfile ? getType() : null;
      var html = '<canvas id="sg37-psych-canvas" width="620" height="400" style="width:100%;max-width:620px;border-radius:12px;background:#1a1a2e;display:block;margin:0 auto 12px;cursor:pointer"></canvas>';

      // type card (평가 전에는 유형을 판정하지 않는다)
      if (myType) {
        html += '<div class="sg37-card" style="border-left:4px solid ' + myType.color + ';padding:14px">';
        html += '<div style="display:flex;align-items:center;gap:10px">';
        html += '<span class="sg37-grade" style="background:' + myType.color + '">' + myType.name + '</span>';
        html += '<div><div style="font-weight:700;font-size:14px">' + myType.desc + '</div>';
        html += '<div style="font-size:12px;color:var(--text-muted)">' + myType.traits + '</div></div>';
        html += '</div></div>';
      } else {
        html += '<div class="sg37-card" style="padding:14px;font-size:13px;color:var(--text-muted)">아직 평가 전입니다. 아래 슬라이더로 6개 축을 직접 평가하면 유형이 표시됩니다.</div>';
      }

      // axis sliders
      html += '<div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-top:8px">';
      axes.forEach(function(ax) {
        var val = saved[ax.key];
        var color = val >= 80 ? '#2ecc71' : val >= 60 ? '#3498db' : val >= 40 ? '#f39c12' : '#e74c3c';
        html += '<div class="sg37-card" style="padding:10px">';
        html += '<div style="display:flex;justify-content:space-between;font-size:12px;font-weight:600"><span>' + ax.name + '</span><span style="color:' + color + '">' + val + '</span></div>';
        html += '<div class="sg37-progress"><div class="sg37-progress-fill" style="width:' + val + '%;background:' + color + '"></div></div>';
        html += '<input type="range" min="10" max="100" value="' + val + '" data-key="' + ax.key + '" style="width:100%;margin-top:4px;accent-color:' + color + '">';
        html += '</div>';
      });
      html += '</div>';

      body.innerHTML = html;

      body.querySelectorAll('input[type=range]').forEach(function(inp) {
        inp.oninput = function() {
          saved[this.dataset.key] = parseInt(this.value);
          hasProfile = true;
          LS('psych', saved);
          drawPsychCanvas();
        };
        inp.onchange = function() {
          SFX.psych_scan();
          evalAchievements();
          render();
        };
      });

      drawPsychCanvas();
    }

    function drawPsychCanvas() {
      var c = document.getElementById('sg37-psych-canvas');
      if (!c) return;
      var ctx = c.getContext('2d');
      var W = 620, H = 400;
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = '#16213e';
      ctx.fillRect(0, 0, W, H);

      ctx.fillStyle = '#1abc9c';
      ctx.font = 'bold 14px sans-serif';
      ctx.textAlign = 'center';

      if (!hasProfile) {
        ctx.fillText('골프 심리 프로파일 (미평가)', W / 2, 25);
        drawEmpty(ctx, W, H, '슬라이더로 6개 축을 평가하면 표시됩니다');
        return;
      }

      var myType = getType();
      ctx.fillText('골프 심리 프로파일 (' + myType.name + ')', W / 2, 25);

      // radar chart
      var cx = W / 2, cy = H / 2 + 10, radius = 140;
      var n = 6;

      // draw grid rings
      for (var ring = 1; ring <= 4; ring++) {
        var r = (ring / 4) * radius;
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(255,255,255,0.1)';
        ctx.lineWidth = 1;
        for (var i = 0; i <= n; i++) {
          var angle = (i / n) * Math.PI * 2 - Math.PI / 2;
          var px = cx + r * Math.cos(angle);
          var py = cy + r * Math.sin(angle);
          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.stroke();

        // ring label
        ctx.fillStyle = 'rgba(255,255,255,0.2)';
        ctx.font = '8px sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText(ring * 25 + '', cx + 3, cy - r + 3);
      }

      // draw axis lines
      for (var i = 0; i < n; i++) {
        var angle = (i / n) * Math.PI * 2 - Math.PI / 2;
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(255,255,255,0.1)';
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + radius * Math.cos(angle), cy + radius * Math.sin(angle));
        ctx.stroke();

        // axis labels
        var labelR = radius + 22;
        var lx = cx + labelR * Math.cos(angle);
        var ly = cy + labelR * Math.sin(angle);
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 11px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(axes[i].name, lx, ly + 4);

        // value
        ctx.fillStyle = myType.color;
        ctx.font = 'bold 10px sans-serif';
        var valR = (saved[axes[i].key] / 100) * radius + 14;
        ctx.fillText(saved[axes[i].key], cx + valR * Math.cos(angle), cy + valR * Math.sin(angle) + 4);
      }

      // draw data polygon (filled)
      ctx.beginPath();
      ctx.fillStyle = myType.color + '33';
      ctx.strokeStyle = myType.color;
      ctx.lineWidth = 2.5;
      for (var i = 0; i < n; i++) {
        var angle = (i / n) * Math.PI * 2 - Math.PI / 2;
        var val = saved[axes[i].key] / 100;
        var px = cx + radius * val * Math.cos(angle);
        var py = cy + radius * val * Math.sin(angle);
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // data points
      for (var i = 0; i < n; i++) {
        var angle = (i / n) * Math.PI * 2 - Math.PI / 2;
        var val = saved[axes[i].key] / 100;
        var px = cx + radius * val * Math.cos(angle);
        var py = cy + radius * val * Math.sin(angle);
        ctx.fillStyle = '#fff';
        ctx.beginPath();
        ctx.arc(px, py, 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = myType.color;
        ctx.beginPath();
        ctx.arc(px, py, 2.5, 0, Math.PI * 2);
        ctx.fill();
      }

      // type indicators bottom
      ctx.font = '10px sans-serif';
      types.forEach(function(tp, ti) {
        var tx = 80 + ti * 130;
        ctx.fillStyle = tp.color;
        ctx.fillRect(tx, H - 22, 10, 10);
        ctx.fillStyle = tp.name === myType.name ? '#fff' : 'rgba(255,255,255,0.4)';
        ctx.textAlign = 'left';
        ctx.fillText(tp.name, tx + 14, H - 13);
      });
    }

    render();
  }

  // ========================================================================
  // 8. 핸디캡 시뮬레이터 Canvas 600x380
  //    목표 핸디캡까지 예상 라운드 수 + 반원게이지
  // ========================================================================
  function openHandicapSim() {
    SFX.hcap_sim();
    var ov = document.getElementById('sg37-hcap') || createOverlay('sg37-hcap', '&#x1F3AF; &#xD578;&#xB514;&#xCE61; &#xC2DC;&#xBBAC;&#xB808;&#xC774;&#xD130;', 'linear-gradient(135deg,#2980b9,#3498db)');
    ov.classList.add('active');
    var body = document.getElementById('sg37-hcap-body');
    markUsed('hcap');

    var saved = LS('hcap') || { current: 24, target: 15, weekly: 2 };

    function calcProjection() {
      var diff = saved.current - saved.target;
      if (diff <= 0) return { rounds: 0, weeks: 0, months: 0, milestones: [] };
      var roundsPerPoint = saved.current > 20 ? 4 : saved.current > 15 ? 6 : saved.current > 10 ? 8 : 12;
      var totalRounds = Math.round(diff * roundsPerPoint);
      var weeks = Math.ceil(totalRounds / Math.max(1, saved.weekly));
      var months = Math.round(weeks / 4.3);

      var milestones = [];
      var step = Math.max(1, Math.round(diff / 5));
      for (var h = saved.current - step; h >= saved.target; h -= step) {
        var r = Math.round((saved.current - h) * roundsPerPoint);
        milestones.push({ hcap: h, rounds: r, score: 72 + h });
      }
      if (milestones.length === 0 || milestones[milestones.length - 1].hcap !== saved.target) {
        milestones.push({ hcap: saved.target, rounds: totalRounds, score: 72 + saved.target });
      }
      return { rounds: totalRounds, weeks: weeks, months: months, milestones: milestones };
    }

    function render() {
      var proj = calcProjection();
      var html = '<canvas id="sg37-hcap-canvas" width="600" height="380" style="width:100%;max-width:600px;border-radius:12px;background:#1a1a2e;display:block;margin:0 auto 12px"></canvas>';

      html += '<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px">';
      html += '<div class="sg37-card" style="text-align:center;padding:10px">';
      html += '<div style="font-size:11px;color:var(--text-muted)">&#xD604;&#xC7AC; HC</div>';
      html += '<input type="number" id="sg37-hcap-cur" value="' + saved.current + '" min="0" max="54" style="width:60px;text-align:center;font-size:18px;font-weight:700;border:2px solid #3498db;border-radius:8px;padding:4px;background:var(--bg);color:var(--text)">';
      html += '</div>';
      html += '<div class="sg37-card" style="text-align:center;padding:10px">';
      html += '<div style="font-size:11px;color:var(--text-muted)">&#xBAA9;&#xD45C; HC</div>';
      html += '<input type="number" id="sg37-hcap-tgt" value="' + saved.target + '" min="0" max="54" style="width:60px;text-align:center;font-size:18px;font-weight:700;border:2px solid #2ecc71;border-radius:8px;padding:4px;background:var(--bg);color:var(--text)">';
      html += '</div>';
      html += '<div class="sg37-card" style="text-align:center;padding:10px">';
      html += '<div style="font-size:11px;color:var(--text-muted)">&#xC8FC;&#xAC04; &#xB77C;&#xC6B4;&#xB4DC;</div>';
      html += '<input type="number" id="sg37-hcap-wk" value="' + saved.weekly + '" min="1" max="7" style="width:60px;text-align:center;font-size:18px;font-weight:700;border:2px solid #f39c12;border-radius:8px;padding:4px;background:var(--bg);color:var(--text)">';
      html += '</div></div>';

      html += '<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;margin-top:8px">';
      html += '<div class="sg37-card" style="text-align:center"><div style="font-size:11px;color:var(--text-muted)">&#xD544;&#xC694; &#xB77C;&#xC6B4;&#xB4DC;</div><div style="font-size:18px;font-weight:700;color:#3498db">' + proj.rounds + 'R</div></div>';
      html += '<div class="sg37-card" style="text-align:center"><div style="font-size:11px;color:var(--text-muted)">&#xC608;&#xC0C1; &#xAE30;&#xAC04;</div><div style="font-size:18px;font-weight:700;color:#f39c12">' + proj.months + '&#xAC1C;&#xC6D4;</div></div>';
      html += '<div class="sg37-card" style="text-align:center"><div style="font-size:11px;color:var(--text-muted)">&#xBAA9;&#xD45C; &#xC2A4;&#xCF54;&#xC5B4;</div><div style="font-size:18px;font-weight:700;color:#2ecc71">' + (72 + saved.target) + '</div></div>';
      html += '</div>';

      if (proj.milestones.length > 0) {
        html += '<div style="margin-top:10px;padding:12px;background:var(--bg);border-radius:10px;border:1px solid var(--border)">';
        html += '<div style="font-weight:600;margin-bottom:6px">&#x1F3C1; &#xB9C8;&#xC77C;&#xC2A4;&#xD1A4;</div>';
        proj.milestones.forEach(function(ms) {
          html += '<div class="sg37-stat"><span>HC ' + ms.hcap + ' (&#xBAA9;&#xD45C;&#xC2A4;&#xCF54;&#xC5B4; ' + ms.score + ')</span><span style="font-weight:600;color:#3498db">' + ms.rounds + 'R &#xD544;&#xC694;</span></div>';
        });
        html += '</div>';
      }

      body.innerHTML = html;

      ['sg37-hcap-cur', 'sg37-hcap-tgt', 'sg37-hcap-wk'].forEach(function(id) {
        var el = document.getElementById(id);
        if (el) el.onchange = function() {
          saved.current = parseInt(document.getElementById('sg37-hcap-cur').value) || 24;
          saved.target = parseInt(document.getElementById('sg37-hcap-tgt').value) || 15;
          saved.weekly = parseInt(document.getElementById('sg37-hcap-wk').value) || 2;
          LS('hcap', saved);
          SFX.hcap_sim();
          render();
        };
      });

      drawHcapCanvas();
    }

    function drawHcapCanvas() {
      var c = document.getElementById('sg37-hcap-canvas');
      if (!c) return;
      var ctx = c.getContext('2d');
      var W = 600, H = 380;
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = '#16213e';
      ctx.fillRect(0, 0, W, H);

      ctx.fillStyle = '#3498db';
      ctx.font = 'bold 14px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('핸디캡 개선 시뮬레이션', W / 2, 25);

      var proj = calcProjection();

      // LEFT: semi-circle gauge
      var gaugeX = 140, gaugeY = 200, gaugeR = 100;
      // draw gauge background
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(255,255,255,0.1)';
      ctx.lineWidth = 20;
      ctx.arc(gaugeX, gaugeY, gaugeR, Math.PI, 0);
      ctx.stroke();

      // gauge progress
      var progress = saved.current > saved.target ? Math.min(1, (saved.current - saved.target) / saved.current) : 0;
      var targetProgress = 1 - progress;
      var grad = ctx.createLinearGradient(gaugeX - gaugeR, gaugeY, gaugeX + gaugeR, gaugeY);
      grad.addColorStop(0, '#e74c3c');
      grad.addColorStop(0.5, '#f39c12');
      grad.addColorStop(1, '#2ecc71');
      ctx.beginPath();
      ctx.strokeStyle = grad;
      ctx.lineWidth = 20;
      ctx.arc(gaugeX, gaugeY, gaugeR, Math.PI, Math.PI + Math.PI * targetProgress);
      ctx.stroke();

      // needle
      var needleAngle = Math.PI + Math.PI * targetProgress;
      var nx = gaugeX + (gaugeR - 30) * Math.cos(needleAngle);
      var ny = gaugeY + (gaugeR - 30) * Math.sin(needleAngle);
      ctx.beginPath();
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 2;
      ctx.moveTo(gaugeX, gaugeY);
      ctx.lineTo(nx, ny);
      ctx.stroke();
      ctx.fillStyle = '#fff';
      ctx.beginPath();
      ctx.arc(gaugeX, gaugeY, 5, 0, Math.PI * 2);
      ctx.fill();

      // gauge labels
      ctx.fillStyle = '#e74c3c';
      ctx.font = 'bold 12px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('HC ' + saved.current, gaugeX - gaugeR - 5, gaugeY + 30);
      ctx.fillStyle = '#2ecc71';
      ctx.fillText('HC ' + saved.target, gaugeX + gaugeR + 5, gaugeY + 30);
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 20px sans-serif';
      ctx.fillText('HC ' + saved.current, gaugeX, gaugeY - 15);
      ctx.font = '11px sans-serif';
      ctx.fillStyle = 'rgba(255,255,255,0.5)';
      ctx.fillText('→ 목표: HC ' + saved.target, gaugeX, gaugeY + 5);

      // RIGHT: milestone line chart
      if (proj.milestones.length > 0) {
        var chartX = 310, chartY = 55, chartW = 260, chartH = 240;

        ctx.strokeStyle = 'rgba(255,255,255,0.15)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(chartX, chartY + chartH);
        ctx.lineTo(chartX + chartW, chartY + chartH);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(chartX, chartY);
        ctx.lineTo(chartX, chartY + chartH);
        ctx.stroke();

        // Y axis: handicap (inverted - lower is higher on chart)
        var hMin = saved.target - 2;
        var hMax = saved.current + 2;
        for (var h = saved.target; h <= saved.current; h += Math.max(1, Math.round((saved.current - saved.target) / 4))) {
          var hy = chartY + chartH - ((h - hMin) / (hMax - hMin)) * chartH;
          ctx.strokeStyle = 'rgba(255,255,255,0.06)';
          ctx.beginPath();
          ctx.moveTo(chartX, hy);
          ctx.lineTo(chartX + chartW, hy);
          ctx.stroke();
          ctx.fillStyle = 'rgba(255,255,255,0.3)';
          ctx.font = '9px sans-serif';
          ctx.textAlign = 'right';
          ctx.fillText('HC' + h, chartX - 5, hy + 3);
        }

        // start point
        var allPoints = [{ hcap: saved.current, rounds: 0 }].concat(proj.milestones);

        // line
        ctx.beginPath();
        ctx.strokeStyle = '#3498db';
        ctx.lineWidth = 2.5;
        allPoints.forEach(function(pt, i) {
          var x = chartX + (pt.rounds / Math.max(1, proj.rounds)) * chartW;
          var y = chartY + chartH - ((pt.hcap - hMin) / (hMax - hMin)) * chartH;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        });
        ctx.stroke();

        // fill under
        ctx.beginPath();
        ctx.fillStyle = 'rgba(52,152,219,0.1)';
        allPoints.forEach(function(pt, i) {
          var x = chartX + (pt.rounds / Math.max(1, proj.rounds)) * chartW;
          var y = chartY + chartH - ((pt.hcap - hMin) / (hMax - hMin)) * chartH;
          if (i === 0) { ctx.moveTo(x, chartY + chartH); ctx.lineTo(x, y); }
          else ctx.lineTo(x, y);
        });
        ctx.lineTo(chartX + chartW, chartY + chartH);
        ctx.closePath();
        ctx.fill();

        // dots and labels
        allPoints.forEach(function(pt, i) {
          var x = chartX + (pt.rounds / Math.max(1, proj.rounds)) * chartW;
          var y = chartY + chartH - ((pt.hcap - hMin) / (hMax - hMin)) * chartH;
          ctx.fillStyle = i === allPoints.length - 1 ? '#2ecc71' : '#3498db';
          ctx.beginPath();
          ctx.arc(x, y, 5, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = '#fff';
          ctx.beginPath();
          ctx.arc(x, y, 2, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = '#fdcb6e';
          ctx.font = 'bold 9px sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText('HC' + pt.hcap, x, y - 10);
          ctx.fillStyle = 'rgba(255,255,255,0.4)';
          ctx.font = '8px sans-serif';
          ctx.fillText(pt.rounds + 'R', x, y + 16);
        });

        // target line
        var targetY = chartY + chartH - ((saved.target - hMin) / (hMax - hMin)) * chartH;
        ctx.strokeStyle = '#2ecc71';
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 3]);
        ctx.beginPath();
        ctx.moveTo(chartX, targetY);
        ctx.lineTo(chartX + chartW, targetY);
        ctx.stroke();
        ctx.setLineDash([]);

        // axis labels
        ctx.fillStyle = 'rgba(255,255,255,0.5)';
        ctx.font = '10px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('라운드 수', chartX + chartW / 2, chartY + chartH + 18);
      }

      // weekly goal gauge (bottom left)
      ctx.fillStyle = 'rgba(255,255,255,0.4)';
      ctx.font = '10px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('주간 ' + saved.weekly + 'R × ' + proj.weeks + '주 = ' + proj.rounds + '라운드 (약 ' + proj.months + '개월)', W / 2, H - 10);
    }

    render();
  }

  // ========================================================================
  // GOLF IQ v21 - 15 Questions
  // ========================================================================
  function openGolfIQv21() {
    SFX.quiz_v21();
    var ov = document.getElementById('sg37-iq21') || createOverlay('sg37-iq21', '&#x1F9E0; Golf IQ v21 (15&#xBB38;&#xD56D;)', 'linear-gradient(135deg,#00b894,#00cec9)');
    ov.classList.add('active');
    var body = document.getElementById('sg37-iq21-body');

    var questions = [
      { q: '드라이버 발사각이 캐리 거리에 미치는 영향은?', a: ['발사각이 높을수록 항상 멀리 간다', '적절한 발사각과 스핀량 조합이 최적 거리 생성', '발사각은 거리와 무관', '발사각이 낮을수록 항상 멀리 간다'], c: 1 },
      { q: '코스 매니지먼트에서 레이업의 목적은?', a: ['볼을 최대한 멀리 치기', '해저드 앞에 안전하게 멈추기', '드라이버 연습', '그린 직접 공략'], c: 1 },
      { q: '퍼팅 거리감 훈련에서 가장 중요한 요소는?', a: ['퍼터 브랜드', '백스윙 크기', '일관된 스트로크 템포', '그린 읽기'], c: 2 },
      { q: '스코어 표준편차가 작을수록 의미하는 것은?', a: ['실력이 나쁨', '일관성 있는 플레이', '운이 좋음', '변동이 큰 플레이'], c: 1 },
      { q: '라운드 중 체력 관리에서 가장 중요한 시점은?', a: ['1번 홀', '9번 홀 이후', '18번 홀', '연습 스윙'], c: 1 },
      { q: '슬라이스 미스샷의 주요 원인은?', a: ['오픈 클럽페이스', '볼 위치 문제', '그립 문제', '스윙 스피드 문제'], c: 0 },
      { q: '골프 심리에서 프리샷 루틴의 목적은?', a: ['시간 끌기', '집중력 유지와 일관성', '상대 선수 압박', '체력 절약'], c: 1 },
      { q: '핸디캡 인덱스 계산 시 Slope Rating이 높을수록?', a: ['코스가 쉬움', '보기 골퍼에게 더 어려움', '코스가 짧음', '그린이 느림'], c: 1 },
      { q: '청크 미스샷 교정을 위한 핵심 드릴은?', a: ['스윙 스피드 높이기', '체중 이동 선행 연습', '그립 강화', '백스윙 늘리기'], c: 1 },
      { q: '라운드 에너지 관리에서 간식 섭취 최적 시점은?', a: ['1번 홀 전', '5번 홀과 12번 홀 전후', '18번 홀 전', '9번 홀만'], c: 1 },
      { q: '레이더 차트에서 6축 평가 중 회복력이란?', a: ['미스샷 후 평정심을 유지하는 능력', '체력 회복', '드라이버 비거리', '퍼팅 성공률'], c: 0 },
      { q: '반원 게이지(gauge)는 어떤 데이터를 표현할 때 적합한가?', a: ['시계열 데이터', '목표 대비 진행률', '카테고리 비교', '산점도'], c: 1 },
      { q: 'Aggressive 플레이 유형의 특징은?', a: ['안전한 플레이 선호', '리스크를 감수하고 공격적으로 공략', '데이터 분석 중심', '직관에 의존'], c: 1 },
      { q: '벨커브(정규분포)에서 1표준편차 범위에 들어갈 확률은?', a: ['약 50%', '약 68%', '약 95%', '약 99%'], c: 1 },
      { q: '핸디캡 개선 속도가 가장 빠른 구간은?', a: ['0~5 구간', '5~10 구간', '20~30 구간 (초보자)', '모든 구간 동일'], c: 2 }
    ];

    var saved = LS('iq21') || { answers: {}, score: 0 };

    function render() {
      var answered = Object.keys(saved.answers).filter(function(k) { return !k.endsWith('_sel'); }).length;
      var correct = 0;
      Object.keys(saved.answers).forEach(function(k) { if (typeof saved.answers[k] === 'boolean' && saved.answers[k]) correct++; });

      var html = '<div style="text-align:center;margin-bottom:12px">';
      html += '<span class="' + gradeClass(correct, 15) + '">' + gradeLabel(correct, 15) + '</span>';
      html += '<span style="margin-left:8px;font-size:14px;font-weight:600">' + correct + '/15 &#xC815;&#xB2F5; (' + answered + '/15 &#xC751;&#xB2F5;)</span>';
      html += '</div>';

      questions.forEach(function(q, qi) {
        var hasAnswered = saved.answers.hasOwnProperty(qi);
        html += '<div class="sg37-card" style="padding:12px">';
        html += '<div style="font-weight:700;font-size:13px;margin-bottom:8px"><span style="color:#00b894">Q' + (qi + 1) + '.</span> ' + q.q + '</div>';
        html += '<div style="display:grid;grid-template-columns:1fr 1fr;gap:4px">';
        q.a.forEach(function(a, ai) {
          var bg = 'var(--bg)';
          var border = 'var(--border)';
          if (hasAnswered) {
            if (ai === q.c) { bg = '#2ecc7133'; border = '#2ecc71'; }
            else if (saved.answers[qi + '_sel'] === ai) { bg = '#e74c3c33'; border = '#e74c3c'; }
          }
          html += '<div class="sg37-tab" data-qi="' + qi + '" data-ai="' + ai + '" style="background:' + bg + ';border-color:' + border + ';font-size:11px;text-align:center;' + (hasAnswered ? 'pointer-events:none;opacity:0.9' : '') + '">' + a + '</div>';
        });
        html += '</div></div>';
      });

      if (answered > 0) {
        html += '<div style="text-align:center;margin-top:12px"><button class="sg37-btn sg37-btn-secondary" id="sg37-iq21-reset">&#xCD08;&#xAE30;&#xD654;</button></div>';
      }

      body.innerHTML = html;

      body.querySelectorAll('.sg37-tab[data-qi]').forEach(function(tab) {
        tab.onclick = function() {
          var qi = parseInt(this.dataset.qi);
          var ai = parseInt(this.dataset.ai);
          if (saved.answers.hasOwnProperty(qi)) return;
          saved.answers[qi] = ai === questions[qi].c;
          saved.answers[qi + '_sel'] = ai;
          if (saved.answers[qi]) SFX.launch_opt(); else SFX.energy_log();
          LS('iq21', saved);
          render();
        };
      });

      var resetBtn = document.getElementById('sg37-iq21-reset');
      if (resetBtn) {
        resetBtn.onclick = function() {
          saved = { answers: {}, score: 0 };
          LS('iq21', saved);
          render();
        };
      }
    }

    render();
  }

  // ========================================================================
  // ACHIEVEMENTS - 15 new (287 -> 302)
  // ========================================================================
  var achievements = [
    { id: 'launch_optimizer', name: '발사각 분석가', desc: '드라이버 발사각 최적화기 사용', check: function() { return LS('launch'); } },
    { id: 'course_strategist', name: '코스 전략가', desc: '코스 매니지먼트 시나리오 사용', check: function() { return LS('cmgmt'); } },
    { id: 'putting_trainer', name: '퍼팅 트레이너', desc: '퍼팅 거리감 트레이너 사용', check: function() { return LS('putt'); } },
    { id: 'bell_curve_analyst', name: '스코어 분석가', desc: '스코어 분포 벨커브 사용', check: function() { return LS('bell'); } },
    { id: 'energy_manager', name: '에너지 매니저', desc: '라운드 에너지 매니저 사용', check: function() { return LS('energy'); } },
    { id: 'miss_shot_analyst', name: '미스샷 분석가', desc: '클럽별 미스샷 패턴 분석 사용', check: function() { return LS('miss'); } },
    { id: 'psych_profiler', name: '심리 프로파일러', desc: '골프 심리 프로파일러 사용', check: function() { return LS('psych'); } },
    { id: 'handicap_sim', name: '핸디캡 시뮬레이터', desc: '핸디캡 시뮬레이터 사용', check: function() { return LS('hcap'); } },
    { id: 'golf_iq_v21', name: 'Golf IQ v21 도전자', desc: 'Golf IQ v21 퍼즐 응답', check: function() { return LS('iq21'); } },
    { id: 'golf_iq_v21_master', name: 'Golf IQ v21 마스터', desc: 'Golf IQ v21 12문항 이상 정답', check: function() { var s = LS('iq21'); if (!s) return false; var c = 0; for (var k in s.answers) { if (typeof s.answers[k] === 'boolean' && s.answers[k]) c++; } return c >= 12; } },
    { id: 'v37_explorer', name: 'v37 탐험가', desc: 'v37 기능 3개 이상 사용', check: function() { return usedCount() >= 3; } },
    { id: 'v37_complete', name: 'v37 컴플리트', desc: 'v37 8개 기능 모두 확인', check: function() { return usedCount() >= FEATURE_KEYS.length; } },
    { id: 'putt_pro', name: '퍼팅 프로', desc: '퍼팅 세션 3회 이상 저장', check: function() { var s = LS('putt'); return s && s.sessions && s.sessions.length >= 3; } },
    { id: 'hcap_planner', name: '핸디캡 플래너', desc: '핸디캡 목표 설정 완료', check: function() { return LS('hcap'); } },
    { id: 'psych_master', name: '심리 마스터', desc: '심리 프로파일 4축 80이상 달성', check: function() { var s = LS('psych'); if (!s) return false; var high = 0; for (var k in s) { if (s[k] >= 80) high++; } return high >= 4; } }
  ];

  var savedAch = LS('achievements') || {};
  function evalAchievements() {
    var changed = false;
    achievements.forEach(function(a) {
      if (!savedAch[a.id] && a.check()) { savedAch[a.id] = true; changed = true; }
    });
    if (changed) LS('achievements', savedAch);
  }
  evalAchievements();

  // ========================================================================
  // NAVIGATION - append to existing bar
  // ========================================================================
  var navItems = [
    { icon: '&#x1F680;', label: 'Launch', fn: openLaunchAngleOpt },
    { icon: '&#x1F3CC;&#xFE0F;', label: 'Course', fn: openCourseManagement },
    { icon: '&#x1F3AF;', label: 'Putt', fn: openPuttingTrainer },
    { icon: '&#x1F4CA;', label: 'Bell', fn: openScoreBellCurve },
    { icon: '&#x26A1;', label: 'Energy', fn: openEnergyManager },
    { icon: '&#x1F6D1;', label: 'Miss', fn: openMissShotAnalyzer },
    { icon: '&#x1F9E0;', label: 'Psych', fn: openPsychProfiler },
    { icon: '&#x1F3AF;', label: 'HCap', fn: openHandicapSim },
    { icon: '&#x1F4DD;', label: 'IQ v21', fn: openGolfIQv21 }
  ];

  var existingBar = document.querySelector('.sg30-bottom-bar') || document.querySelector('[class*="bottom-bar"]');
  if (existingBar) {
    navItems.forEach(function(item) {
      var btn = document.createElement('button');
      btn.className = existingBar.querySelector('button') ? existingBar.querySelector('button').className : 'sg30-bbtn';
      btn.innerHTML = '<span class="' + (existingBar.querySelector('.sg30-bbtn-icon') ? 'sg30-bbtn-icon' : 'sg37-bbtn-icon') + '">' + item.icon + '</span><span class="' + (existingBar.querySelector('.sg30-bbtn-label') ? 'sg30-bbtn-label' : 'sg37-bbtn-label') + '">' + item.label + '</span>';
      btn.onclick = item.fn;
      existingBar.appendChild(btn);
    });
  }

  // ========== KEYBOARD SHORTCUTS ==========
  document.addEventListener('keydown', function(e) {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'SELECT') return;
    if (!e.shiftKey) return;
    var map = { Q: openLaunchAngleOpt, W: openCourseManagement, E: openPuttingTrainer, R: openScoreBellCurve, T: openEnergyManager, Y: openMissShotAnalyzer, U: openPsychProfiler, I: openHandicapSim, O: openGolfIQv21 };
    if (map[e.key.toUpperCase()]) { e.preventDefault(); map[e.key.toUpperCase()](); }
  });

  // ========== ESC to close ==========
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      document.querySelectorAll('.sg37-overlay.active').forEach(function(ov) { ov.classList.remove('active'); });
    }
  });

})();
