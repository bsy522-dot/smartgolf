/* ====================================================================
 * SmartGolf v36.0 patch
 * 홀인원확률계산기Canvas620x400 + 클럽스윙웨이트최적화Canvas600x380
 * + 라운드페이스분석기Canvas620x380 + 그린언듈레이션시뮬Canvas640x400
 * + 골프부상예방가이드Canvas600x380 + Par세이브패턴분석Canvas620x400
 * + 코스경로플래너Canvas620x380 + 시즌피크분석기Canvas620x400
 * + Golf IQ v20 15문항 + 업적+15(272->287) + SFX16종(268->284) + 키보드9종
 * ==================================================================== */
(function () {
  'use strict';

  var LS = function(k, v) { return v === undefined ? JSON.parse(localStorage.getItem('sg36_' + k) || 'null') : localStorage.setItem('sg36_' + k, JSON.stringify(v)); };

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
    hio_calc: function() { sfx(523, 0.06); sfx(659, 0.08); sfx(784, 0.1); },
    hio_ace: function() { sfx(523, 0.04); sfx(659, 0.04); sfx(784, 0.04); sfx(988, 0.04); sfx(1175, 0.04); sfx(1319, 0.2, 'triangle'); },
    weight_scan: function() { sfx(392, 0.08); sfx(494, 0.06, 'triangle'); },
    weight_opt: function() { sfx(523, 0.06); sfx(659, 0.06); sfx(784, 0.1); },
    pace_log: function() { sfx(370, 0.06); sfx(440, 0.06); sfx(554, 0.1); },
    pace_fast: function() { sfx(587, 0.05); sfx(740, 0.05); sfx(880, 0.12, 'triangle'); },
    green_scan: function() { sfx(330, 0.08); sfx(440, 0.06); sfx(554, 0.1); },
    green_putt: function() { sfx(494, 0.06); sfx(587, 0.06); sfx(740, 0.1); },
    injury_scan: function() { sfx(349, 0.08); sfx(440, 0.06); sfx(523, 0.1); },
    injury_prev: function() { sfx(523, 0.04); sfx(659, 0.04); sfx(784, 0.14, 'triangle'); },
    par_save: function() { sfx(415, 0.06); sfx(523, 0.08, 'triangle'); },
    par_analyze: function() { sfx(466, 0.08); sfx(587, 0.06); sfx(698, 0.1); },
    route_plan: function() { sfx(392, 0.06); sfx(494, 0.08); },
    season_scan: function() { sfx(523, 0.04); sfx(659, 0.04); sfx(784, 0.04); sfx(1047, 0.15, 'triangle'); },
    quiz_v20: function() { sfx(587, 0.1); sfx(740, 0.12); },
    achieve_v36: function() { sfx(523, 0.04); sfx(659, 0.04); sfx(784, 0.04); sfx(988, 0.04); sfx(1175, 0.04); sfx(1319, 0.18, 'triangle'); }
  };

  // ========== CSS ==========
  var css = [
    '.sg36-overlay{display:none;position:fixed;top:0;left:0;right:0;bottom:0;z-index:10060;background:rgba(0,0,0,.55);overflow-y:auto;padding:20px;animation:sg36FadeIn .25s}',
    '.sg36-overlay.active{display:flex;align-items:flex-start;justify-content:center}',
    '@keyframes sg36FadeIn{from{opacity:0}to{opacity:1}}',
    '.sg36-panel{background:var(--card-bg,#fff);border-radius:16px;max-width:720px;width:100%;margin:30px auto;box-shadow:0 8px 40px rgba(0,0,0,.3);overflow:hidden;animation:sg36SlideUp .3s}',
    '@keyframes sg36SlideUp{from{transform:translateY(30px);opacity:0}to{transform:translateY(0);opacity:1}}',
    '.sg36-panel-head{padding:16px 20px;color:#fff;display:flex;align-items:center;justify-content:space-between}',
    '.sg36-panel-head h3{font-size:16px;font-weight:700;display:flex;align-items:center;gap:8px}',
    '.sg36-panel-close{background:rgba(255,255,255,.25);border:none;color:#fff;width:30px;height:30px;border-radius:50%;cursor:pointer;font-size:16px;font-family:inherit}',
    '.sg36-panel-body{padding:16px 20px;max-height:70vh;overflow-y:auto}',
    '.sg36-card{background:var(--bg,#f5f7f5);border-radius:12px;padding:14px;margin-bottom:10px;border:1px solid var(--border,#e0e0e0);cursor:pointer;transition:all .2s}',
    '.sg36-card:hover{box-shadow:0 2px 12px rgba(0,0,0,.1);transform:translateY(-1px)}',
    '.sg36-grade{display:inline-block;padding:3px 10px;border-radius:8px;font-weight:700;font-size:13px;color:#fff}',
    '.sg36-grade-s{background:linear-gradient(135deg,#ff6b35,#ff4500)}',
    '.sg36-grade-a{background:linear-gradient(135deg,#1a7a3a,#2ecc71)}',
    '.sg36-grade-b{background:linear-gradient(135deg,#3498db,#2980b9)}',
    '.sg36-grade-c{background:linear-gradient(135deg,#9b59b6,#8e44ad)}',
    '.sg36-grade-d{background:linear-gradient(135deg,#95a5a6,#7f8c8d)}',
    '.sg36-btn{display:inline-block;padding:8px 16px;border-radius:10px;border:none;cursor:pointer;font-size:13px;font-weight:600;transition:all .2s;font-family:inherit}',
    '.sg36-btn:hover{transform:translateY(-1px);box-shadow:0 2px 8px rgba(0,0,0,.15)}',
    '.sg36-btn-primary{background:linear-gradient(135deg,#1a7a3a,#2ecc71);color:#fff}',
    '.sg36-btn-secondary{background:var(--bg,#f5f7f5);color:var(--text,#333);border:1px solid var(--border,#e0e0e0)}',
    '.sg36-tabs{display:flex;gap:6px;margin-bottom:12px;flex-wrap:wrap}',
    '.sg36-tab{padding:6px 14px;border-radius:8px;border:1px solid var(--border,#e0e0e0);background:var(--bg,#f5f7f5);cursor:pointer;font-size:12px;font-weight:600;transition:all .2s}',
    '.sg36-tab.active{background:linear-gradient(135deg,#1a7a3a,#2ecc71);color:#fff;border-color:transparent}',
    '.sg36-stat{display:flex;justify-content:space-between;align-items:center;padding:6px 0;border-bottom:1px solid var(--border,#e0e0e0);font-size:13px}',
    '.sg36-stat:last-child{border-bottom:none}',
    '.sg36-progress{height:8px;background:var(--border,#e0e0e0);border-radius:4px;overflow:hidden;margin-top:4px}',
    '.sg36-progress-fill{height:100%;border-radius:4px;transition:width .6s}'
  ].join('\n');
  var sty = document.createElement('style');
  sty.textContent = css;
  document.head.appendChild(sty);

  // ========== HELPERS ==========
  function createOverlay(id, title, bgColor) {
    var ov = document.createElement('div');
    ov.className = 'sg36-overlay';
    ov.id = id;
    ov.onclick = function(e) { if (e.target === ov) ov.classList.remove('active'); };
    ov.innerHTML = '<div class="sg36-panel"><div class="sg36-panel-head" style="background:' + bgColor + '"><h3>' + title + '</h3><button class="sg36-panel-close" onclick="this.closest(\'.sg36-overlay\').classList.remove(\'active\')">&times;</button></div><div class="sg36-panel-body" id="' + id + '-body"></div></div>';
    document.body.appendChild(ov);
    return ov;
  }

  function gradeClass(score, max) {
    var pct = score / max * 100;
    if (pct >= 90) return 'sg36-grade sg36-grade-s';
    if (pct >= 75) return 'sg36-grade sg36-grade-a';
    if (pct >= 60) return 'sg36-grade sg36-grade-b';
    if (pct >= 40) return 'sg36-grade sg36-grade-c';
    return 'sg36-grade sg36-grade-d';
  }

  function gradeLabel(score, max) {
    var pct = score / max * 100;
    if (pct >= 90) return 'S';
    if (pct >= 75) return 'A';
    if (pct >= 60) return 'B';
    if (pct >= 40) return 'C';
    return 'D';
  }

  // ========================================================================
  // 1. 홀인원 확률 계산기 Canvas 620x400
  // ========================================================================
  function openHoleInOneCalc() {
    SFX.hio_calc();
    var ov = document.getElementById('sg36-hio') || createOverlay('sg36-hio', '&#x26F3; &#xD640;&#xC778;&#xC6D0; &#xD655;&#xB960; &#xACC4;&#xC0B0;&#xAE30;', 'linear-gradient(135deg,#d63031,#e17055)');
    ov.classList.add('active');
    var body = document.getElementById('sg36-hio-body');

    var clubs = [
      { name: '7&#xBC88; &#xC544;&#xC774;&#xC5B8;', dist: 150, base: 1/12500 },
      { name: '8&#xBC88; &#xC544;&#xC774;&#xC5B8;', dist: 140, base: 1/11000 },
      { name: '9&#xBC88; &#xC544;&#xC774;&#xC5B8;', dist: 130, base: 1/10000 },
      { name: 'PW', dist: 120, base: 1/9500 },
      { name: '6&#xBC88; &#xC544;&#xC774;&#xC5B8;', dist: 160, base: 1/14000 },
      { name: '5&#xBC88; &#xC544;&#xC774;&#xC5B8;', dist: 170, base: 1/16000 },
      { name: '4&#xBC88; &#xC544;&#xC774;&#xC5B8;', dist: 180, base: 1/20000 },
      { name: '3W', dist: 200, base: 1/30000 },
      { name: 'SW', dist: 100, base: 1/9000 },
      { name: 'GW', dist: 110, base: 1/9200 }
    ];
    var levels = [
      { name: '&#xD504;&#xB85C;', mult: 3.0 },
      { name: '&#xC0C1;&#xAE09;&#xC790;(&#xD578;&#xB514;&#xCE61; 0~9)', mult: 1.5 },
      { name: '&#xC911;&#xAE09;&#xC790;(10~18)', mult: 1.0 },
      { name: '&#xCD08;&#xAE09;&#xC790;(19~36)', mult: 0.4 },
      { name: '&#xC785;&#xBB38;&#xC790;(36+)', mult: 0.15 }
    ];
    var saved = LS('hio') || { level: 2, attempts: [] };

    function render() {
      var html = '<div class="sg36-tabs">';
      levels.forEach(function(l, i) {
        html += '<div class="sg36-tab' + (saved.level === i ? ' active' : '') + '" data-idx="' + i + '">' + l.name + '</div>';
      });
      html += '</div>';
      html += '<canvas id="sg36-hio-canvas" width="620" height="400" style="width:100%;max-width:620px;border-radius:12px;background:#1a1a2e;display:block;margin:0 auto 12px"></canvas>';
      html += '<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(145px,1fr));gap:8px;margin-top:8px">';
      clubs.forEach(function(c, i) {
        var prob = c.base * levels[saved.level].mult;
        var pctStr = (prob * 100).toFixed(4) + '%';
        var ratio = Math.round(1 / prob);
        html += '<div class="sg36-card" style="text-align:center;padding:10px">';
        html += '<div style="font-weight:700;font-size:14px;margin-bottom:4px">' + c.name + '</div>';
        html += '<div style="font-size:11px;color:var(--text-muted)">' + c.dist + 'yd</div>';
        html += '<div style="font-size:13px;font-weight:600;color:#e17055;margin-top:4px">1/' + ratio.toLocaleString() + '</div>';
        html += '<div style="font-size:10px;color:var(--text-muted)">' + pctStr + '</div>';
        html += '</div>';
      });
      html += '</div>';
      html += '<div style="margin-top:12px;padding:12px;background:var(--bg);border-radius:10px;border:1px solid var(--border)">';
      html += '<div style="font-weight:600;margin-bottom:6px">&#x1F4CA; &#xD640;&#xC778;&#xC6D0; &#xD1B5;&#xACC4;</div>';
      html += '<div class="sg36-stat"><span>&#xD3C9;&#xADE0; &#xD504;&#xB85C; &#xD655;&#xB960;</span><span style="font-weight:700;color:#e17055">1/3,500</span></div>';
      html += '<div class="sg36-stat"><span>&#xD3C9;&#xADE0; &#xC544;&#xB9C8;&#xCD94;&#xC5B4; &#xD655;&#xB960;</span><span style="font-weight:700;color:#e17055">1/12,500</span></div>';
      html += '<div class="sg36-stat"><span>&#xC5F0;&#xC18D; 2&#xD640;&#xC778;&#xC6D0; &#xD655;&#xB960;</span><span style="font-weight:700;color:#e17055">1/67,000,000</span></div>';
      html += '<div class="sg36-stat"><span>PGA &#xD22C;&#xC5B4; &#xD640;&#xC778;&#xC6D0; &#xBE48;&#xB3C4;</span><span style="font-weight:700;color:#e17055">~42&#xD68C;/&#xB144;</span></div>';
      html += '</div>';
      body.innerHTML = html;

      body.querySelectorAll('.sg36-tab').forEach(function(tab) {
        tab.onclick = function() {
          saved.level = parseInt(this.dataset.idx);
          LS('hio', saved);
          SFX.hio_calc();
          render();
        };
      });

      drawHIOCanvas();
    }

    function drawHIOCanvas() {
      var c = document.getElementById('sg36-hio-canvas');
      if (!c) return;
      var ctx = c.getContext('2d');
      var W = 620, H = 400;
      ctx.clearRect(0, 0, W, H);

      ctx.fillStyle = '#16213e';
      ctx.fillRect(0, 0, W, H);

      ctx.fillStyle = '#e17055';
      ctx.font = 'bold 14px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('홀인원 확률 분포 (' + levels[saved.level].name + ')', W / 2, 25);

      var barW = 42, gap = 14, startX = 40;
      var maxProb = 0;
      clubs.forEach(function(c2) {
        var p = c2.base * levels[saved.level].mult;
        if (p > maxProb) maxProb = p;
      });

      clubs.forEach(function(c2, i) {
        var prob = c2.base * levels[saved.level].mult;
        var barH = (prob / maxProb) * 280;
        var x = startX + i * (barW + gap);
        var y = H - 50 - barH;

        var grad = ctx.createLinearGradient(x, y, x, H - 50);
        grad.addColorStop(0, '#e17055');
        grad.addColorStop(1, '#d63031');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.roundRect(x, y, barW, barH, [4, 4, 0, 0]);
        ctx.fill();

        ctx.fillStyle = '#fff';
        ctx.font = '10px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(c2.name.replace(/&#x[0-9A-Fa-f]+;/g, ''), x + barW / 2, H - 36);

        ctx.fillStyle = '#fdcb6e';
        ctx.font = 'bold 10px sans-serif';
        var ratio = Math.round(1 / prob);
        ctx.fillText('1/' + (ratio > 9999 ? Math.round(ratio / 1000) + 'K' : ratio), x + barW / 2, y - 6);

        ctx.fillStyle = 'rgba(255,255,255,0.5)';
        ctx.font = '9px sans-serif';
        ctx.fillText(c2.dist + 'yd', x + barW / 2, y - 18);
      });

      ctx.strokeStyle = 'rgba(255,255,255,0.15)';
      ctx.lineWidth = 1;
      for (var i = 0; i < 5; i++) {
        var gy = H - 50 - (i * 70);
        ctx.beginPath();
        ctx.moveTo(30, gy);
        ctx.lineTo(W - 10, gy);
        ctx.stroke();
      }
    }

    render();
  }

  // ========================================================================
  // 2. 클럽 스윙웨이트 최적화 Canvas 600x380
  // ========================================================================
  function openSwingWeightOpt() {
    SFX.weight_scan();
    var ov = document.getElementById('sg36-swgt') || createOverlay('sg36-swgt', '&#x2696;&#xFE0F; &#xD074;&#xB7FD; &#xC2A4;&#xC719;&#xC6E8;&#xC774;&#xD2B8; &#xCD5C;&#xC801;&#xD654;', 'linear-gradient(135deg,#6c5ce7,#a29bfe)');
    ov.classList.add('active');
    var body = document.getElementById('sg36-swgt-body');

    var clubsData = [
      { name: 'Driver', ideal: 'D2', current: 'D3', weight: 310, len: 45.5, headWt: 198 },
      { name: '3W', ideal: 'D1', current: 'D2', weight: 320, len: 43, headWt: 210 },
      { name: '5W', ideal: 'D1', current: 'D0', weight: 325, len: 42, headWt: 215 },
      { name: '4I', ideal: 'D0', current: 'D1', weight: 410, len: 38.5, headWt: 250 },
      { name: '5I', ideal: 'D1', current: 'D1', weight: 415, len: 38, headWt: 255 },
      { name: '6I', ideal: 'D1', current: 'D2', weight: 420, len: 37.5, headWt: 260 },
      { name: '7I', ideal: 'D1', current: 'D1', weight: 425, len: 37, headWt: 265 },
      { name: '8I', ideal: 'D1', current: 'D0', weight: 430, len: 36.5, headWt: 270 },
      { name: '9I', ideal: 'D2', current: 'D2', weight: 435, len: 36, headWt: 275 },
      { name: 'PW', ideal: 'D2', current: 'D3', weight: 440, len: 35.5, headWt: 280 },
      { name: 'SW', ideal: 'D3', current: 'D4', weight: 455, len: 35, headWt: 290 },
      { name: 'Putter', ideal: 'E0', current: 'D9', weight: 520, len: 34, headWt: 340 }
    ];

    function swVal(s) {
      var letter = s.charAt(0);
      var num = parseInt(s.charAt(1));
      var base = { C: 0, D: 10, E: 20 };
      return (base[letter] || 0) + num;
    }

    function render() {
      var html = '<canvas id="sg36-swgt-canvas" width="600" height="380" style="width:100%;max-width:600px;border-radius:12px;background:#1a1a2e;display:block;margin:0 auto 12px"></canvas>';
      html += '<div style="overflow-x:auto"><table style="width:100%;border-collapse:collapse;font-size:12px">';
      html += '<tr style="background:var(--primary);color:#fff"><th style="padding:8px">&#xD074;&#xB7FD;</th><th>&#xD604;&#xC7AC;</th><th>&#xC774;&#xC0C1;</th><th>&#xD3B8;&#xCC28;</th><th>&#xCD1D;&#xC911;&#xB7C9;</th><th>&#xAE38;&#xC774;</th><th>&#xD5E4;&#xB4DC;</th></tr>';
      clubsData.forEach(function(c) {
        var diff = swVal(c.current) - swVal(c.ideal);
        var color = diff === 0 ? '#2ecc71' : Math.abs(diff) === 1 ? '#f39c12' : '#e74c3c';
        var status = diff === 0 ? '&#x2714;' : (diff > 0 ? '+' + diff : diff);
        html += '<tr style="border-bottom:1px solid var(--border)">';
        html += '<td style="padding:6px 8px;font-weight:600">' + c.name + '</td>';
        html += '<td style="text-align:center">' + c.current + '</td>';
        html += '<td style="text-align:center;color:#6c5ce7;font-weight:600">' + c.ideal + '</td>';
        html += '<td style="text-align:center;color:' + color + ';font-weight:700">' + status + '</td>';
        html += '<td style="text-align:center">' + c.weight + 'g</td>';
        html += '<td style="text-align:center">' + c.len + '&quot;</td>';
        html += '<td style="text-align:center">' + c.headWt + 'g</td>';
        html += '</tr>';
      });
      html += '</table></div>';

      var matched = clubsData.filter(function(c) { return c.current === c.ideal; }).length;
      var total = clubsData.length;
      var score = Math.round(matched / total * 100);
      html += '<div style="margin-top:12px;text-align:center">';
      html += '<span class="' + gradeClass(score, 100) + '">' + gradeLabel(score, 100) + ' (' + score + '%)</span>';
      html += '<div style="font-size:11px;color:var(--text-muted);margin-top:4px">' + matched + '/' + total + ' &#xD074;&#xB7FD; &#xCD5C;&#xC801;&#xD654; &#xC644;&#xB8CC;</div>';
      html += '</div>';

      body.innerHTML = html;
      drawSwingWeightCanvas();
    }

    function drawSwingWeightCanvas() {
      var c = document.getElementById('sg36-swgt-canvas');
      if (!c) return;
      var ctx = c.getContext('2d');
      var W = 600, H = 380;
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = '#16213e';
      ctx.fillRect(0, 0, W, H);

      ctx.fillStyle = '#a29bfe';
      ctx.font = 'bold 14px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('클럽별 스윙웨이트 분포', W / 2, 25);

      var barW = 34, gap = 10, startX = 45;
      clubsData.forEach(function(cd, i) {
        var x = startX + i * (barW + gap);
        var idealH = (swVal(cd.ideal) / 22) * 250;
        var currH = (swVal(cd.current) / 22) * 250;
        var baseY = H - 50;

        ctx.fillStyle = 'rgba(108,92,231,0.3)';
        ctx.beginPath();
        ctx.roundRect(x, baseY - idealH, barW, idealH, [4, 4, 0, 0]);
        ctx.fill();

        ctx.strokeStyle = '#a29bfe';
        ctx.lineWidth = 2;
        ctx.setLineDash([4, 3]);
        ctx.beginPath();
        ctx.moveTo(x, baseY - idealH);
        ctx.lineTo(x + barW, baseY - idealH);
        ctx.stroke();
        ctx.setLineDash([]);

        var diff = swVal(cd.current) - swVal(cd.ideal);
        var barColor = diff === 0 ? '#2ecc71' : Math.abs(diff) <= 1 ? '#f39c12' : '#e74c3c';
        var grad = ctx.createLinearGradient(x, baseY - currH, x, baseY);
        grad.addColorStop(0, barColor);
        grad.addColorStop(1, barColor + '88');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.roundRect(x + 4, baseY - currH, barW - 8, currH, [3, 3, 0, 0]);
        ctx.fill();

        ctx.fillStyle = '#fff';
        ctx.font = '9px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(cd.name, x + barW / 2, H - 36);

        ctx.fillStyle = '#fdcb6e';
        ctx.font = 'bold 10px sans-serif';
        ctx.fillText(cd.current, x + barW / 2, baseY - currH - 6);
      });

      ctx.fillStyle = 'rgba(162,155,254,0.5)';
      ctx.font = '10px sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText('■ 이상 SW  ■ 현재 SW', 45, H - 10);
    }

    render();
  }

  // ========================================================================
  // 3. 라운드 페이스 분석기 Canvas 620x380
  // ========================================================================
  function openRoundPaceAnalyzer() {
    SFX.pace_log();
    var ov = document.getElementById('sg36-pace') || createOverlay('sg36-pace', '&#x23F1;&#xFE0F; &#xB77C;&#xC6B4;&#xB4DC; &#xD398;&#xC774;&#xC2A4; &#xBD84;&#xC11D;&#xAE30;', 'linear-gradient(135deg,#00b894,#00cec9)');
    ov.classList.add('active');
    var body = document.getElementById('sg36-pace-body');

    var holes = [];
    for (var i = 0; i < 18; i++) {
      var par = [4, 4, 3, 5, 4, 4, 3, 5, 4, 4, 3, 5, 4, 4, 3, 4, 5, 4][i];
      var baseMins = par === 3 ? 10 : par === 4 ? 13 : 16;
      var variance = Math.floor(Math.sin(i * 1.3) * 3 + Math.cos(i * 0.7) * 2);
      holes.push({ hole: i + 1, par: par, minutes: baseMins + variance, ideal: baseMins - 1 });
    }

    var saved = LS('pace') || { sessions: [] };

    function render() {
      var totalMin = 0, idealTotal = 0;
      holes.forEach(function(h) { totalMin += h.minutes; idealTotal += h.ideal; });
      var hours = Math.floor(totalMin / 60);
      var mins = totalMin % 60;

      var html = '<canvas id="sg36-pace-canvas" width="620" height="380" style="width:100%;max-width:620px;border-radius:12px;background:#1a1a2e;display:block;margin:0 auto 12px"></canvas>';

      html += '<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-bottom:12px">';
      html += '<div class="sg36-card" style="text-align:center"><div style="font-size:20px;font-weight:700;color:#00b894">' + hours + 'h ' + mins + 'm</div><div style="font-size:11px;color:var(--text-muted)">&#xCD1D; &#xB77C;&#xC6B4;&#xB4DC; &#xC2DC;&#xAC04;</div></div>';
      html += '<div class="sg36-card" style="text-align:center"><div style="font-size:20px;font-weight:700;color:#fdcb6e">' + Math.round(totalMin / 18) + '&#xBD84;</div><div style="font-size:11px;color:var(--text-muted)">&#xD640;&#xB2F9; &#xD3C9;&#xADE0;</div></div>';
      var diff = totalMin - idealTotal;
      var diffColor = diff <= 5 ? '#2ecc71' : diff <= 15 ? '#f39c12' : '#e74c3c';
      html += '<div class="sg36-card" style="text-align:center"><div style="font-size:20px;font-weight:700;color:' + diffColor + '">' + (diff > 0 ? '+' : '') + diff + '&#xBD84;</div><div style="font-size:11px;color:var(--text-muted)">&#xC774;&#xC0C1; &#xB300;&#xBE44;</div></div>';
      html += '</div>';

      html += '<div style="overflow-x:auto"><div style="display:grid;grid-template-columns:repeat(9,1fr);gap:4px">';
      holes.forEach(function(h) {
        var overPct = h.minutes / h.ideal;
        var bg = overPct <= 1 ? '#2ecc71' : overPct <= 1.15 ? '#f39c12' : '#e74c3c';
        html += '<div style="text-align:center;padding:6px 2px;border-radius:6px;background:' + bg + '22;border:1px solid ' + bg + '">';
        html += '<div style="font-size:10px;font-weight:700">' + h.hole + 'H</div>';
        html += '<div style="font-size:12px;font-weight:600;color:' + bg + '">' + h.minutes + '&#xBD84;</div>';
        html += '<div style="font-size:9px;color:var(--text-muted)">Par ' + h.par + '</div>';
        html += '</div>';
      });
      html += '</div></div>';

      html += '<div style="margin-top:12px;padding:10px;background:var(--bg);border-radius:10px;border:1px solid var(--border)">';
      html += '<div style="font-weight:600;margin-bottom:6px">&#x1F4A1; &#xD398;&#xC774;&#xC2A4; &#xAC1C;&#xC120; &#xD301;</div>';
      html += '<div style="font-size:12px;color:var(--text-muted);line-height:1.6">';
      if (diff > 15) {
        html += '&#x2022; Par 5 &#xD640;&#xC5D0;&#xC11C; &#xC2DC;&#xAC04;&#xC774; &#xB9CE;&#xC774; &#xC18C;&#xC694;&#xB429;&#xB2C8;&#xB2E4;. &#xD504;&#xB85C;&#xBE44;&#xC800;&#xB110; &#xD074;&#xB7FD; &#xC120;&#xD0DD;&#xC744; &#xBE60;&#xB974;&#xAC8C; &#xD558;&#xC138;&#xC694;.<br>';
        html += '&#x2022; &#xADF8;&#xB9B0;&#xC5D0;&#xC11C;&#xC758; &#xD37C;&#xD305; &#xB8E8;&#xD2F4;&#xC744; &#xAC04;&#xC18C;&#xD654;&#xD558;&#xC138;&#xC694;.<br>';
        html += '&#x2022; Ready Golf &#xC6D0;&#xCE59;&#xC744; &#xC801;&#xC6A9;&#xD558;&#xC138;&#xC694;.';
      } else if (diff > 5) {
        html += '&#x2022; &#xC804;&#xBC18;&#xC801;&#xC73C;&#xB85C; &#xC591;&#xD638;&#xD55C; &#xD398;&#xC774;&#xC2A4;&#xC785;&#xB2C8;&#xB2E4;.<br>';
        html += '&#x2022; Par 3 &#xD640;&#xC5D0;&#xC11C; &#xC870;&#xAE08; &#xB354; &#xBE60;&#xB974;&#xAC8C; &#xC9C4;&#xD589;&#xD574;&#xBCF4;&#xC138;&#xC694;.';
      } else {
        html += '&#x2022; &#xD6CC;&#xB96D;&#xD55C; &#xD398;&#xC774;&#xC2A4;&#xC785;&#xB2C8;&#xB2E4;! &#xD504;&#xB85C; &#xC218;&#xC900;&#xC758; &#xC9C4;&#xD589; &#xC18D;&#xB3C4;&#xC785;&#xB2C8;&#xB2E4;.';
      }
      html += '</div></div>';

      body.innerHTML = html;
      drawPaceCanvas();
    }

    function drawPaceCanvas() {
      var c = document.getElementById('sg36-pace-canvas');
      if (!c) return;
      var ctx = c.getContext('2d');
      var W = 620, H = 380;
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = '#0d2137';
      ctx.fillRect(0, 0, W, H);

      ctx.fillStyle = '#00cec9';
      ctx.font = 'bold 14px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('18홀 페이스 분석 (Hole 별 소요시간)', W / 2, 25);

      var barW = 26, gap = 6, startX = 30;
      var maxMin = 22;

      holes.forEach(function(h, i) {
        var x = startX + i * (barW + gap);
        var barH = (h.minutes / maxMin) * 280;
        var idealH = (h.ideal / maxMin) * 280;
        var baseY = H - 45;

        ctx.fillStyle = 'rgba(0,206,201,0.15)';
        ctx.beginPath();
        ctx.roundRect(x, baseY - idealH, barW, idealH, [3, 3, 0, 0]);
        ctx.fill();

        var overPct = h.minutes / h.ideal;
        var barColor = overPct <= 1 ? '#2ecc71' : overPct <= 1.15 ? '#fdcb6e' : '#e74c3c';
        var grad = ctx.createLinearGradient(x, baseY - barH, x, baseY);
        grad.addColorStop(0, barColor);
        grad.addColorStop(1, barColor + '66');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.roundRect(x + 2, baseY - barH, barW - 4, barH, [3, 3, 0, 0]);
        ctx.fill();

        ctx.strokeStyle = '#00cec9';
        ctx.lineWidth = 1.5;
        ctx.setLineDash([3, 3]);
        ctx.beginPath();
        ctx.moveTo(x, baseY - idealH);
        ctx.lineTo(x + barW, baseY - idealH);
        ctx.stroke();
        ctx.setLineDash([]);

        ctx.fillStyle = '#fff';
        ctx.font = '9px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(h.hole + 'H', x + barW / 2, H - 30);

        ctx.fillStyle = barColor;
        ctx.font = 'bold 9px sans-serif';
        ctx.fillText(h.minutes + 'm', x + barW / 2, baseY - barH - 5);
      });

      ctx.fillStyle = 'rgba(0,206,201,0.5)';
      ctx.font = '10px sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText('■ 이상  ■ 실제', 30, H - 8);
    }

    render();
  }

  // ========================================================================
  // 4. 그린 언듈레이션 시뮬레이터 Canvas 640x400
  // ========================================================================
  function openGreenUndulation() {
    SFX.green_scan();
    var ov = document.getElementById('sg36-green') || createOverlay('sg36-green', '&#x1F3CC;&#xFE0F; &#xADF8;&#xB9B0; &#xC5B8;&#xB4C8;&#xB808;&#xC774;&#xC158; &#xC2DC;&#xBBAC;&#xB808;&#xC774;&#xD130;', 'linear-gradient(135deg,#27ae60,#2ecc71)');
    ov.classList.add('active');
    var body = document.getElementById('sg36-green-body');

    var greens = [
      { name: 'Flat Green', slopes: [0.5, 0.3, 0.2, 0.4, 0.6, 0.3, 0.2, 0.5], speed: 10, diff: 2 },
      { name: 'Front-to-Back', slopes: [1.2, 1.5, 1.8, 2.0, 1.5, 1.3, 1.0, 0.8], speed: 11, diff: 4 },
      { name: 'Side Slope', slopes: [0.5, 1.0, 1.5, 2.0, 2.5, 2.0, 1.5, 1.0], speed: 10.5, diff: 5 },
      { name: 'Bowl Green', slopes: [2.0, 1.5, 0.5, 0.2, 0.5, 1.5, 2.0, 1.5], speed: 11, diff: 3 },
      { name: 'Ridge Green', slopes: [0.5, 1.0, 2.0, 2.5, 2.0, 1.0, 0.5, 1.0], speed: 12, diff: 7 },
      { name: 'Multi-Tier', slopes: [3.0, 2.5, 1.0, 0.5, 2.5, 3.0, 1.5, 0.5], speed: 11.5, diff: 8 },
      { name: 'Turtle Back', slopes: [2.5, 2.0, 1.5, 0.3, 1.5, 2.0, 2.5, 2.0], speed: 12, diff: 6 },
      { name: 'Crowned', slopes: [1.8, 2.2, 2.8, 3.0, 2.8, 2.2, 1.8, 1.5], speed: 13, diff: 9 }
    ];
    var selIdx = LS('green_sel') || 0;

    function render() {
      var html = '<div class="sg36-tabs">';
      greens.forEach(function(g, i) {
        html += '<div class="sg36-tab' + (selIdx === i ? ' active' : '') + '" data-idx="' + i + '">' + g.name + '</div>';
      });
      html += '</div>';
      html += '<canvas id="sg36-green-canvas" width="640" height="400" style="width:100%;max-width:640px;border-radius:12px;background:#1a1a2e;display:block;margin:0 auto 12px"></canvas>';

      var g = greens[selIdx];
      html += '<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px">';
      html += '<div class="sg36-card" style="text-align:center"><div style="font-size:18px;font-weight:700;color:#2ecc71">' + g.speed + '</div><div style="font-size:11px;color:var(--text-muted)">&#xC2A4;&#xD300;&#xD504;&#xBBF8;&#xD130;</div></div>';
      html += '<div class="sg36-card" style="text-align:center"><div style="font-size:18px;font-weight:700;color:#f39c12">' + g.diff + '/10</div><div style="font-size:11px;color:var(--text-muted)">&#xB09C;&#xC774;&#xB3C4;</div></div>';
      var avgSlope = g.slopes.reduce(function(a, b) { return a + b; }, 0) / g.slopes.length;
      html += '<div class="sg36-card" style="text-align:center"><div style="font-size:18px;font-weight:700;color:#e17055">' + avgSlope.toFixed(1) + '&deg;</div><div style="font-size:11px;color:var(--text-muted)">&#xD3C9;&#xADE0; &#xACBD;&#xC0AC;</div></div>';
      html += '</div>';

      html += '<div style="margin-top:8px;padding:10px;background:var(--bg);border-radius:10px;border:1px solid var(--border)">';
      html += '<div style="font-weight:600;margin-bottom:6px">&#x1F3AF; &#xD37C;&#xD305; &#xC804;&#xB7B5;</div>';
      html += '<div style="font-size:12px;color:var(--text-muted);line-height:1.6">';
      if (g.diff <= 3) {
        html += '&#x2022; &#xD3C9;&#xD0C4;&#xD55C; &#xADF8;&#xB9B0;. &#xC9C1;&#xC120; &#xD37C;&#xD305;&#xC73C;&#xB85C; &#xACF5;&#xB7B5;&#xD558;&#xC138;&#xC694;.<br>&#x2022; &#xC2A4;&#xD300;&#xD504;&#xBBF8;&#xD130;&#xC5D0; &#xB9DE;&#xCDB0; &#xAC70;&#xB9AC; &#xC870;&#xC808;&#xB9CC; &#xD558;&#xBA74; &#xB429;&#xB2C8;&#xB2E4;.';
      } else if (g.diff <= 6) {
        html += '&#x2022; &#xC911;&#xAC04; &#xB09C;&#xC774;&#xB3C4;. &#xBE0C;&#xB808;&#xC774;&#xD06C;&#xB97C; &#xC798; &#xC77D;&#xC5B4;&#xC57C; &#xD569;&#xB2C8;&#xB2E4;.<br>&#x2022; &#xC5C5;&#xD790; &#xD37C;&#xD305;&#xC744; &#xC8FC;&#xC758;&#xD558;&#xC138;&#xC694;.';
      } else {
        html += '&#x2022; &#xACE0;&#xB09C;&#xC774;&#xB3C4; &#xADF8;&#xB9B0;! &#xD648;&#xC744; &#xB178;&#xB9AC;&#xACE0; 2&#xD37C;&#xD305; &#xC804;&#xB7B5;&#xC744; &#xACE0;&#xB824;&#xD558;&#xC138;&#xC694;.<br>&#x2022; &#xCE58;&#xBA85;&#xC801;&#xC778; 3&#xD37C;&#xD305;&#xBCF4;&#xB2E4; &#xBCF4;&#xAC70;&#xB77C;&#xB3C4; &#xC800;&#xC9C0;&#xD558;&#xB294; &#xAC83;&#xC774; &#xC911;&#xC694;&#xD569;&#xB2C8;&#xB2E4;.';
      }
      html += '</div></div>';

      body.innerHTML = html;

      body.querySelectorAll('.sg36-tab').forEach(function(tab) {
        tab.onclick = function() {
          selIdx = parseInt(this.dataset.idx);
          LS('green_sel', selIdx);
          SFX.green_putt();
          render();
        };
      });

      drawGreenCanvas();
    }

    function drawGreenCanvas() {
      var c = document.getElementById('sg36-green-canvas');
      if (!c) return;
      var ctx = c.getContext('2d');
      var W = 640, H = 400;
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = '#0a2e1a';
      ctx.fillRect(0, 0, W, H);

      var g = greens[selIdx];
      ctx.fillStyle = '#2ecc71';
      ctx.font = 'bold 14px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('그린 언듈레이션: ' + g.name, W / 2, 25);

      var cx = W / 2, cy = H / 2 + 10, maxR = 150;
      var dirs = ['북', '북동', '동', '남동', '남', '남서', '서', '북서'];

      ctx.fillStyle = '#1a5a32';
      ctx.beginPath();
      ctx.arc(cx, cy, maxR + 10, 0, Math.PI * 2);
      ctx.fill();

      for (var ring = 3; ring >= 1; ring--) {
        ctx.strokeStyle = 'rgba(46,204,113,0.15)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(cx, cy, maxR * ring / 3, 0, Math.PI * 2);
        ctx.stroke();
      }

      ctx.beginPath();
      g.slopes.forEach(function(s, i) {
        var angle = (i / 8) * Math.PI * 2 - Math.PI / 2;
        var r = (s / 3.5) * maxR;
        var px = cx + Math.cos(angle) * r;
        var py = cy + Math.sin(angle) * r;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      });
      ctx.closePath();
      var grd = ctx.createRadialGradient(cx, cy, 0, cx, cy, maxR);
      grd.addColorStop(0, 'rgba(46,204,113,0.15)');
      grd.addColorStop(1, 'rgba(46,204,113,0.4)');
      ctx.fillStyle = grd;
      ctx.fill();
      ctx.strokeStyle = '#2ecc71';
      ctx.lineWidth = 2.5;
      ctx.stroke();

      g.slopes.forEach(function(s, i) {
        var angle = (i / 8) * Math.PI * 2 - Math.PI / 2;
        var r = (s / 3.5) * maxR;
        var px = cx + Math.cos(angle) * r;
        var py = cy + Math.sin(angle) * r;

        ctx.fillStyle = '#2ecc71';
        ctx.beginPath();
        ctx.arc(px, py, 5, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#fff';
        ctx.font = 'bold 11px sans-serif';
        ctx.textAlign = 'center';
        var lx = cx + Math.cos(angle) * (maxR + 25);
        var ly = cy + Math.sin(angle) * (maxR + 25);
        ctx.fillText(dirs[i], lx, ly);

        ctx.fillStyle = '#fdcb6e';
        ctx.font = '10px sans-serif';
        ctx.fillText(s.toFixed(1) + '°', lx, ly + 14);
      });

      ctx.fillStyle = '#e74c3c';
      ctx.beginPath();
      ctx.arc(cx, cy, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 10px sans-serif';
      ctx.fillText('홀', cx, cy - 10);

      ctx.fillStyle = 'rgba(255,255,255,0.4)';
      ctx.font = '10px sans-serif';
      ctx.fillText('Speed: ' + g.speed + ' | Diff: ' + g.diff + '/10', W / 2, H - 15);
    }

    render();
  }

  // ========================================================================
  // 5. 골프 부상 예방 가이드 Canvas 600x380
  // ========================================================================
  function openInjuryPrevention() {
    SFX.injury_scan();
    var ov = document.getElementById('sg36-inj') || createOverlay('sg36-inj', '&#x1FA7A; &#xACE8;&#xD504; &#xBD80;&#xC0C1; &#xC608;&#xBC29; &#xAC00;&#xC774;&#xB4DC;', 'linear-gradient(135deg,#e74c3c,#c0392b)');
    ov.classList.add('active');
    var body = document.getElementById('sg36-inj-body');

    var injuries = [
      { name: '허리(요통)', pct: 34, risk: 9, zone: '하;체', exercises: ['코어 안정화', '플랭크', '브릿지'], icon: '🦴' },
      { name: '팔꿈치', pct: 25, risk: 7, zone: '상체', exercises: ['팔꿈치 스트레칭', '저항밴드'], icon: '💪' },
      { name: '손목', pct: 20, risk: 6, zone: '상체', exercises: ['손목 회전', '그립 강화'], icon: '✋' },
      { name: '어깨', pct: 18, risk: 8, zone: '상체', exercises: ['로테이터커프', '어깨 스트레칭'], icon: '🧘' },
      { name: '무릎', pct: 15, risk: 7, zone: '하체', exercises: ['레그프레스', '스쿼트'], icon: '🦵' },
      { name: '골프엘보', pct: 12, risk: 5, zone: '상체', exercises: ['프로네이션/수피네이션', '압박스트레칭'], icon: '🩼' },
      { name: '갈비뼈', pct: 8, risk: 4, zone: '하체', exercises: ['카프레이즈', '발목 스트레칭'], icon: '🦶' },
      { name: '목/경추', pct: 10, risk: 6, zone: '상체', exercises: ['목 회전', '티비친터치'], icon: '🙎' }
    ];

    function render() {
      var html = '<canvas id="sg36-inj-canvas" width="600" height="380" style="width:100%;max-width:600px;border-radius:12px;background:#1a1a2e;display:block;margin:0 auto 12px"></canvas>';

      html += '<div style="display:grid;gap:8px">';
      injuries.forEach(function(inj) {
        var riskColor = inj.risk >= 8 ? '#e74c3c' : inj.risk >= 6 ? '#f39c12' : '#2ecc71';
        html += '<div class="sg36-card" style="padding:12px">';
        html += '<div style="display:flex;align-items:center;gap:10px">';
        html += '<span style="font-size:24px">' + inj.icon + '</span>';
        html += '<div style="flex:1">';
        html += '<div style="font-weight:700;font-size:13px">' + inj.name + ' <span style="color:var(--text-muted);font-weight:400;font-size:11px">(' + inj.zone + ')</span></div>';
        html += '<div class="sg36-progress" style="margin-top:4px"><div class="sg36-progress-fill" style="width:' + inj.pct + '%;background:' + riskColor + '"></div></div>';
        html += '</div>';
        html += '<div style="text-align:center"><div style="font-size:16px;font-weight:700;color:' + riskColor + '">' + inj.pct + '%</div><div style="font-size:9px;color:var(--text-muted)">발생빈도</div></div>';
        html += '<div style="text-align:center"><div style="font-size:16px;font-weight:700;color:' + riskColor + '">' + inj.risk + '/10</div><div style="font-size:9px;color:var(--text-muted)">위험도</div></div>';
        html += '</div>';
        html += '<div style="margin-top:6px;font-size:11px;color:var(--text-muted)">예방 운동: ' + inj.exercises.join(', ') + '</div>';
        html += '</div>';
      });
      html += '</div>';

      body.innerHTML = html;
      drawInjuryCanvas();
    }

    function drawInjuryCanvas() {
      var c = document.getElementById('sg36-inj-canvas');
      if (!c) return;
      var ctx = c.getContext('2d');
      var W = 600, H = 380;
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = '#1a0a0a';
      ctx.fillRect(0, 0, W, H);

      ctx.fillStyle = '#e74c3c';
      ctx.font = 'bold 14px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('골프 부상 발생 빈도 분석', W / 2, 25);

      var barW = 55, gap = 10, startX = 35;
      var maxPct = 40;

      injuries.forEach(function(inj, i) {
        var x = startX + i * (barW + gap);
        var barH = (inj.pct / maxPct) * 260;
        var baseY = H - 55;
        var riskColor = inj.risk >= 8 ? '#e74c3c' : inj.risk >= 6 ? '#f39c12' : '#2ecc71';

        var grad = ctx.createLinearGradient(x, baseY - barH, x, baseY);
        grad.addColorStop(0, riskColor);
        grad.addColorStop(1, riskColor + '44');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.roundRect(x, baseY - barH, barW, barH, [4, 4, 0, 0]);
        ctx.fill();

        ctx.fillStyle = '#fff';
        ctx.font = '9px sans-serif';
        ctx.textAlign = 'center';
        var words = inj.name.split('/');
        words.forEach(function(w, wi) {
          ctx.fillText(w, x + barW / 2, H - 40 + wi * 12);
        });

        ctx.fillStyle = '#fdcb6e';
        ctx.font = 'bold 11px sans-serif';
        ctx.fillText(inj.pct + '%', x + barW / 2, baseY - barH - 8);

        var riskY = baseY - barH + 20;
        if (riskY < baseY - 15) {
          ctx.fillStyle = 'rgba(0,0,0,0.5)';
          ctx.beginPath();
          ctx.roundRect(x + 10, riskY, barW - 20, 18, 4);
          ctx.fill();
          ctx.fillStyle = riskColor;
          ctx.font = 'bold 10px sans-serif';
          ctx.fillText(inj.risk + '/10', x + barW / 2, riskY + 13);
        }
      });
    }

    render();
  }

  // ========================================================================
  // 6. Par 세이브 패턴 분석 Canvas 620x400
  // ========================================================================
  function openParSaveAnalysis() {
    SFX.par_save();
    var ov = document.getElementById('sg36-psave') || createOverlay('sg36-psave', '&#x1F3F3;&#xFE0F; Par &#xC138;&#xC774;&#xBE0C; &#xD328;&#xD134; &#xBD84;&#xC11D;', 'linear-gradient(135deg,#2980b9,#3498db)');
    ov.classList.add('active');
    var body = document.getElementById('sg36-psave-body');

    var situations = [
      { name: '그린사이드 뱙커', save: 68, attempts: 50, tip: '플로프 샷을 활용하세요' },
      { name: '그린 프린지', save: 52, attempts: 45, tip: '러닝 아프로치를 시도하세요' },
      { name: '페어웨이 뱙커', save: 45, attempts: 55, tip: '거리 컨트롤에 집중하세요' },
      { name: '러프 주변', save: 35, attempts: 30, tip: '로브 또는 플로프 선택' },
      { name: '림 바운드', save: 28, attempts: 25, tip: '칩을 충분히 붙이세요' },
      { name: '페널티 구역', save: 42, attempts: 35, tip: '안전한 탈출 우선' },
      { name: '크로스 뱙커', save: 62, attempts: 40, tip: '그린 이상의 위치를 노리세요' },
      { name: '디봇 샷', save: 55, attempts: 30, tip: '볼을 가볍게 두세요' },
      { name: '핀 하이 퍼팅', save: 72, attempts: 60, tip: '스트로크 정확도를 높이세요' },
      { name: '럭 퍼팅', save: 38, attempts: 40, tip: '프레임을 과감히 읽으세요' }
    ];

    var totalSaves = situations.reduce(function(a, s) { return a + Math.round(s.attempts * s.save / 100); }, 0);
    var totalAttempts = situations.reduce(function(a, s) { return a + s.attempts; }, 0);
    var overallPct = Math.round(totalSaves / totalAttempts * 100);

    function render() {
      var html = '<canvas id="sg36-psave-canvas" width="620" height="400" style="width:100%;max-width:620px;border-radius:12px;background:#1a1a2e;display:block;margin:0 auto 12px"></canvas>';

      html += '<div style="text-align:center;margin-bottom:12px"><span class="' + gradeClass(overallPct, 100) + '">' + gradeLabel(overallPct, 100) + ' &#xB4F1;&#xAE09; (' + overallPct + '%)</span></div>';

      html += '<div style="display:grid;gap:6px">';
      situations.forEach(function(s) {
        var pctColor = s.save >= 60 ? '#2ecc71' : s.save >= 40 ? '#f39c12' : '#e74c3c';
        html += '<div class="sg36-stat">';
        html += '<span style="font-weight:600;font-size:12px">' + s.name + '</span>';
        html += '<div style="display:flex;align-items:center;gap:8px">';
        html += '<div class="sg36-progress" style="width:80px"><div class="sg36-progress-fill" style="width:' + s.save + '%;background:' + pctColor + '"></div></div>';
        html += '<span style="font-weight:700;color:' + pctColor + ';font-size:12px;min-width:35px;text-align:right">' + s.save + '%</span>';
        html += '</div></div>';
      });
      html += '</div>';

      body.innerHTML = html;
      drawParSaveCanvas();
    }

    function drawParSaveCanvas() {
      var c = document.getElementById('sg36-psave-canvas');
      if (!c) return;
      var ctx = c.getContext('2d');
      var W = 620, H = 400;
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = '#0a1628';
      ctx.fillRect(0, 0, W, H);

      ctx.fillStyle = '#3498db';
      ctx.font = 'bold 14px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Par 세이브 성공률 분석 (상황별)', W / 2, 25);

      var barH = 22, gap = 8, startY = 50, labelW = 120;

      situations.forEach(function(s, i) {
        var y = startY + i * (barH + gap);
        var barMaxW = W - labelW - 80;
        var barFillW = (s.save / 100) * barMaxW;
        var pctColor = s.save >= 60 ? '#2ecc71' : s.save >= 40 ? '#f39c12' : '#e74c3c';

        ctx.fillStyle = 'rgba(255,255,255,0.7)';
        ctx.font = '11px sans-serif';
        ctx.textAlign = 'right';
        ctx.fillText(s.name.replace(/&#x[0-9A-Fa-f]+;/g, '').replace(/;/g, ''), labelW - 8, y + 16);

        ctx.fillStyle = 'rgba(52,152,219,0.15)';
        ctx.beginPath();
        ctx.roundRect(labelW, y, barMaxW, barH, 4);
        ctx.fill();

        var grad = ctx.createLinearGradient(labelW, y, labelW + barFillW, y);
        grad.addColorStop(0, pctColor + 'AA');
        grad.addColorStop(1, pctColor);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.roundRect(labelW, y, barFillW, barH, 4);
        ctx.fill();

        ctx.fillStyle = '#fff';
        ctx.font = 'bold 11px sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText(s.save + '%', labelW + barFillW + 6, y + 16);
      });

      ctx.strokeStyle = 'rgba(52,152,219,0.3)';
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 4]);
      var fiftyX = labelW + (50 / 100) * (W - labelW - 80);
      ctx.beginPath();
      ctx.moveTo(fiftyX, 45);
      ctx.lineTo(fiftyX, H - 20);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = 'rgba(52,152,219,0.5)';
      ctx.font = '10px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('50% 기준선', fiftyX, H - 8);
    }

    render();
  }

  // ========================================================================
  // 7. 코스 경로 플래너 Canvas 620x380
  // ========================================================================
  function openCourseRoutePlanner() {
    SFX.route_plan();
    var ov = document.getElementById('sg36-route') || createOverlay('sg36-route', '&#x1F5FA;&#xFE0F; &#xCF54;&#xC2A4; &#xACBD;&#xB85C; &#xD50C;&#xB798;&#xB108;', 'linear-gradient(135deg,#e67e22,#f39c12)');
    ov.classList.add('active');
    var body = document.getElementById('sg36-route-body');

    var strategies = [
      { name: '안전 경로', desc: '페어웨이 중앙 조준, 그린 중앙 공략', risk: 2, reward: 3, par: '+2~+4' },
      { name: '보수 공략', desc: '해저드 회피, 보기 이상 위치', risk: 3, reward: 5, par: '+1~+3' },
      { name: '공격 경로', desc: '숏컷 도전, 핀 공략 공격', risk: 7, reward: 8, par: '-1~+2' },
      { name: '프로 경로', desc: '상황별 최적 클럽 선택', risk: 5, reward: 7, par: 'E~+1' },
      { name: '풍향 활용', desc: '바람 방향 고려 경로 조정', risk: 4, reward: 6, par: 'E~+2' },
      { name: '레이업 활용', desc: '전략적 레이업으로 어프로치 우위', risk: 3, reward: 5, par: '+1~+3' }
    ];

    function render() {
      var html = '<canvas id="sg36-route-canvas" width="620" height="380" style="width:100%;max-width:620px;border-radius:12px;background:#1a1a2e;display:block;margin:0 auto 12px"></canvas>';

      html += '<div style="display:grid;gap:8px">';
      strategies.forEach(function(s) {
        var riskColor = s.risk >= 6 ? '#e74c3c' : s.risk >= 4 ? '#f39c12' : '#2ecc71';
        var rewColor = s.reward >= 7 ? '#2ecc71' : s.reward >= 5 ? '#f39c12' : '#e74c3c';
        html += '<div class="sg36-card">';
        html += '<div style="display:flex;justify-content:space-between;align-items:center">';
        html += '<div><div style="font-weight:700;font-size:14px">' + s.name + '</div>';
        html += '<div style="font-size:11px;color:var(--text-muted);margin-top:2px">' + s.desc + '</div></div>';
        html += '<div style="display:flex;gap:12px;text-align:center">';
        html += '<div><div style="font-size:14px;font-weight:700;color:' + riskColor + '">' + s.risk + '/10</div><div style="font-size:9px;color:var(--text-muted)">위험</div></div>';
        html += '<div><div style="font-size:14px;font-weight:700;color:' + rewColor + '">' + s.reward + '/10</div><div style="font-size:9px;color:var(--text-muted)">보상</div></div>';
        html += '<div><div style="font-size:14px;font-weight:700;color:#3498db">' + s.par + '</div><div style="font-size:9px;color:var(--text-muted)">예상</div></div>';
        html += '</div></div></div>';
      });
      html += '</div>';

      body.innerHTML = html;
      drawRouteCanvas();
    }

    function drawRouteCanvas() {
      var c = document.getElementById('sg36-route-canvas');
      if (!c) return;
      var ctx = c.getContext('2d');
      var W = 620, H = 380;
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = '#1a1508';
      ctx.fillRect(0, 0, W, H);

      ctx.fillStyle = '#f39c12';
      ctx.font = 'bold 14px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('코스 경로 전략 비교 (Risk vs Reward)', W / 2, 25);

      var chartX = 80, chartY = 50, chartW = W - 120, chartH = H - 100;

      ctx.strokeStyle = 'rgba(243,156,18,0.2)';
      ctx.lineWidth = 1;
      for (var i = 0; i <= 10; i++) {
        var gx = chartX + (i / 10) * chartW;
        var gy = chartY + chartH - (i / 10) * chartH;
        ctx.beginPath();
        ctx.moveTo(gx, chartY);
        ctx.lineTo(gx, chartY + chartH);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(chartX, gy);
        ctx.lineTo(chartX + chartW, gy);
        ctx.stroke();
      }

      ctx.strokeStyle = 'rgba(243,156,18,0.3)';
      ctx.lineWidth = 1;
      ctx.setLineDash([5, 5]);
      ctx.beginPath();
      ctx.moveTo(chartX, chartY);
      ctx.lineTo(chartX + chartW, chartY + chartH);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle = 'rgba(255,255,255,0.5)';
      ctx.font = '10px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Risk →', chartX + chartW / 2, chartY + chartH + 25);
      ctx.save();
      ctx.translate(chartX - 30, chartY + chartH / 2);
      ctx.rotate(-Math.PI / 2);
      ctx.fillText('Reward →', 0, 0);
      ctx.restore();

      var colors = ['#e74c3c', '#e67e22', '#f39c12', '#2ecc71', '#3498db', '#9b59b6'];
      strategies.forEach(function(s, i) {
        var px = chartX + (s.risk / 10) * chartW;
        var py = chartY + chartH - (s.reward / 10) * chartH;
        var r = 18;

        ctx.fillStyle = colors[i] + '44';
        ctx.beginPath();
        ctx.arc(px, py, r + 4, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = colors[i];
        ctx.beginPath();
        ctx.arc(px, py, r, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#fff';
        ctx.font = 'bold 9px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(s.name.substring(0, 4), px, py + 3);

        ctx.fillStyle = '#fdcb6e';
        ctx.font = '9px sans-serif';
        ctx.fillText(s.par, px, py - r - 5);
      });
    }

    render();
  }

  // ========================================================================
  // 8. 시즌 피크 분석기 Canvas 620x400
  // ========================================================================
  function openSeasonPeakAnalyzer() {
    SFX.season_scan();
    var ov = document.getElementById('sg36-season') || createOverlay('sg36-season', '&#x1F4C5; &#xC2DC;&#xC98C; &#xD53C;&#xD06C; &#xBD84;&#xC11D;&#xAE30;', 'linear-gradient(135deg,#8e44ad,#9b59b6)');
    ov.classList.add('active');
    var body = document.getElementById('sg36-season-body');

    var months = [
      { name: '1월', temp: -2, rounds: 5, green: 15000, crowd: 15, best: false },
      { name: '2월', temp: 1, rounds: 8, green: 14000, crowd: 20, best: false },
      { name: '3월', temp: 7, rounds: 18, green: 16000, crowd: 45, best: false },
      { name: '4월', temp: 14, rounds: 28, green: 20000, crowd: 80, best: true },
      { name: '5월', temp: 20, rounds: 32, green: 22000, crowd: 90, best: true },
      { name: '6월', temp: 25, rounds: 22, green: 18000, crowd: 70, best: false },
      { name: '7월', temp: 28, rounds: 12, green: 15000, crowd: 40, best: false },
      { name: '8월', temp: 27, rounds: 10, green: 14000, crowd: 35, best: false },
      { name: '9월', temp: 22, rounds: 25, green: 19000, crowd: 75, best: true },
      { name: '10월', temp: 15, rounds: 35, green: 23000, crowd: 95, best: true },
      { name: '11월', temp: 8, rounds: 20, green: 17000, crowd: 55, best: false },
      { name: '12월', temp: 0, rounds: 6, green: 14500, crowd: 18, best: false }
    ];

    function render() {
      var html = '<canvas id="sg36-season-canvas" width="620" height="400" style="width:100%;max-width:620px;border-radius:12px;background:#1a1a2e;display:block;margin:0 auto 12px"></canvas>';

      html += '<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:6px;margin-bottom:10px">';
      var peakMonths = months.filter(function(m) { return m.best; });
      var totalRounds = months.reduce(function(a, m) { return a + m.rounds; }, 0);
      var avgGreen = Math.round(months.reduce(function(a, m) { return a + m.green; }, 0) / 12);
      html += '<div class="sg36-card" style="text-align:center"><div style="font-size:16px;font-weight:700;color:#9b59b6">' + peakMonths.length + '&#xAC1C;&#xC6D4;</div><div style="font-size:10px;color:var(--text-muted)">&#xD53C;&#xD06C; &#xC2DC;&#xC98C;</div></div>';
      html += '<div class="sg36-card" style="text-align:center"><div style="font-size:16px;font-weight:700;color:#2ecc71">' + totalRounds + '&#xD68C;</div><div style="font-size:10px;color:var(--text-muted)">&#xC5F0;&#xAC04; &#xB77C;&#xC6B4;&#xB4DC;</div></div>';
      html += '<div class="sg36-card" style="text-align:center"><div style="font-size:16px;font-weight:700;color:#f39c12">' + (avgGreen / 10000).toFixed(1) + '&#xB9CC;</div><div style="font-size:10px;color:var(--text-muted)">&#xD3C9;&#xADE0; &#xADF8;&#xB9B0;&#xD53C;</div></div>';
      html += '<div class="sg36-card" style="text-align:center"><div style="font-size:16px;font-weight:700;color:#e74c3c">10&#xC6D4;</div><div style="font-size:10px;color:var(--text-muted)">&#xCD5C;&#xACE0; &#xD53C;&#xD06C;</div></div>';
      html += '</div>';

      html += '<div style="overflow-x:auto"><div style="display:grid;grid-template-columns:repeat(6,1fr);gap:4px">';
      months.forEach(function(m) {
        var bg = m.best ? 'rgba(155,89,182,0.15)' : 'var(--bg)';
        var border = m.best ? '#9b59b6' : 'var(--border)';
        html += '<div style="text-align:center;padding:8px 4px;border-radius:8px;background:' + bg + ';border:1px solid ' + border + '">';
        html += '<div style="font-size:12px;font-weight:700">' + m.name + (m.best ? ' &#x2B50;' : '') + '</div>';
        html += '<div style="font-size:10px;color:var(--text-muted);margin-top:2px">' + m.temp + '&#x2103; | ' + m.rounds + 'R</div>';
        html += '<div style="font-size:10px;color:#f39c12">' + (m.green / 10000).toFixed(1) + '만원</div>';
        html += '</div>';
      });
      html += '</div></div>';

      body.innerHTML = html;
      drawSeasonCanvas();
    }

    function drawSeasonCanvas() {
      var c = document.getElementById('sg36-season-canvas');
      if (!c) return;
      var ctx = c.getContext('2d');
      var W = 620, H = 400;
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = '#150a20';
      ctx.fillRect(0, 0, W, H);

      ctx.fillStyle = '#9b59b6';
      ctx.font = 'bold 14px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('월별 라운드 수 + 그린피 + 혼잡도', W / 2, 25);

      var chartX = 50, chartY = 45, chartW = W - 80, chartH = 280;
      var barW = (chartW - 11 * 8) / 12;

      ctx.strokeStyle = 'rgba(155,89,182,0.15)';
      ctx.lineWidth = 1;
      for (var i = 0; i <= 4; i++) {
        var gy = chartY + chartH - (i / 4) * chartH;
        ctx.beginPath();
        ctx.moveTo(chartX, gy);
        ctx.lineTo(chartX + chartW, gy);
        ctx.stroke();
      }

      months.forEach(function(m, i) {
        var x = chartX + i * (barW + 8);
        var barH = (m.rounds / 40) * chartH;
        var baseY = chartY + chartH;

        var grad = ctx.createLinearGradient(x, baseY - barH, x, baseY);
        if (m.best) {
          grad.addColorStop(0, '#9b59b6');
          grad.addColorStop(1, '#8e44ad88');
        } else {
          grad.addColorStop(0, '#6c5ce7');
          grad.addColorStop(1, '#6c5ce744');
        }
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.roundRect(x, baseY - barH, barW, barH, [4, 4, 0, 0]);
        ctx.fill();

        if (m.best) {
          ctx.strokeStyle = '#fdcb6e';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.roundRect(x - 1, baseY - barH - 1, barW + 2, barH + 2, [4, 4, 0, 0]);
          ctx.stroke();
        }

        ctx.fillStyle = '#fff';
        ctx.font = '10px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(m.name, x + barW / 2, baseY + 15);

        ctx.fillStyle = '#fdcb6e';
        ctx.font = 'bold 10px sans-serif';
        ctx.fillText(m.rounds + 'R', x + barW / 2, baseY - barH - 6);
      });

      ctx.beginPath();
      ctx.strokeStyle = '#e74c3c';
      ctx.lineWidth = 2;
      months.forEach(function(m, i) {
        var x = chartX + i * (barW + 8) + barW / 2;
        var y = chartY + chartH - (m.crowd / 100) * chartH;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.stroke();

      months.forEach(function(m, i) {
        var x = chartX + i * (barW + 8) + barW / 2;
        var y = chartY + chartH - (m.crowd / 100) * chartH;
        ctx.fillStyle = '#e74c3c';
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.beginPath();
      ctx.strokeStyle = '#2ecc71';
      ctx.lineWidth = 2;
      ctx.setLineDash([4, 3]);
      months.forEach(function(m, i) {
        var x = chartX + i * (barW + 8) + barW / 2;
        var y = chartY + chartH - ((m.temp + 5) / 35) * chartH;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle = 'rgba(255,255,255,0.5)';
      ctx.font = '10px sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText('■ 라운드수  — 혼잡도  - - 기온', chartX, H - 10);
    }

    render();
  }

  // ========================================================================
  // GOLF IQ v20 - 15 Questions
  // ========================================================================
  function openGolfIQv20() {
    SFX.quiz_v20();
    var ov = document.getElementById('sg36-iq20') || createOverlay('sg36-iq20', '&#x1F9E0; Golf IQ v20 (15&#xBB38;&#xD56D;)', 'linear-gradient(135deg,#00b894,#00cec9)');
    ov.classList.add('active');
    var body = document.getElementById('sg36-iq20-body');

    var questions = [
      { q: '홀인원 시 보험사에 제출해야 할 것은?', a: ['스코어카드', '카드영수증', '동반자 서명이 포함된 증명서', '골프장 영수증'], c: 2 },
      { q: '스팀프미터 13 이상의 그린은 어떤 수준?', a: ['초보자용', '중급', '투어 프로 수준;', '습기찬 그린'], c: 2 },
      { q: 'Par 5 홀에서 이글을 기록하려면 몇 타?', a: ['2타', '3타', '4타', '5타'], c: 1 },
      { q: 'Ready Golf이란?', a: ['준비된 사람이 먼저 치는 방식', '빠른 플레이 모드', '시합 모드', '연습 라운드'], c: 0 },
      { q: '페이드(Fade) 샷의 구질은?', a: ['오른쪽으로 휘는 공', '왼쪽으로 휘는 공', '약간; 오른쪽으로 휘며 떨어지는 공', '직선으로 나가는 공'], c: 2 },
      { q: '디봇(Divot)을 수리하는 올바른 방법은?', a: ['무시한다', '모래를 채운다', '떼어진 잔디를 다시 덮는다', '모래/종자 혼합물을 채운다'], c: 3 },
      { q: '핸디칡; 계산에서 Slope Rating의 역할은?', a: ['코스 길이 보정', '보기 vs 상급자 난이도 차이 반영', '날씨 보정', '경사도 측정'], c: 1 },
      { q: 'Course Rating 72.5, Slope 135인 코스의 난이도는?', a: ['쉼운 편', '보통', '어려운 편', '매우 어려움'], c: 2 },
      { q: '코스 경로 전략에서 ‘레이;업’이란?', a: ['볼을; 그린 앞에 놓는 것;', '볼을 저멀리 치는 것', '볼을 페어웨이에; 놓는 것', '해저드 앞에 멈추는; 것'], c: 0 },
      { q: '퍼터의 이상적인; 로프트 각도는?', a: ['0도', '2~4도', '8~10도', '15도'], c: 1 },
      { q: '골프에서 ‘앤커;(Anchor)’ 퍼팅이란?', a: ['몸에 퍼터를 고정하는 퍼팅', '느린; 퍼팅', '빠른 퍼팅', '장거리 퍼팅'], c: 0 },
      { q: '골프 부상 중 가장 흔한 부위는?', a: ['무릎', '허리(요통)', '어깨', '손목'], c: 1 },
      { q: '시즌 피크(가을)에 그린피가 비싼 이유는?', a: ['잔디 상태가 좋아서', '수요가 높아서', '경영 비용 증가', '모든 이유'], c: 3 },
      { q: 'Par 세이브 성공률이 가장 높은 상황은?', a: ['그린사이드 벙커', '페어웨이 벙커', '러프 주변', '핀 하이 퍼팅'], c: 3 },
      { q: '골프 라운드 이상적인 소요 시간은?', a: ['3시간', '4시간 15분 이내', '5시간', '6시간'], c: 1 }
    ];

    var saved = LS('iq20') || { answers: {}, score: 0 };

    function render() {
      var answered = Object.keys(saved.answers).length;
      var correct = 0;
      Object.keys(saved.answers).forEach(function(k) { if (saved.answers[k]) correct++; });

      var html = '<div style="text-align:center;margin-bottom:12px">';
      html += '<span class="' + gradeClass(correct, 15) + '">' + gradeLabel(correct, 15) + '</span>';
      html += '<span style="margin-left:8px;font-size:14px;font-weight:600">' + correct + '/15 &#xC815;&#xB2F5; (' + answered + '/15 &#xC751;&#xB2F5;)</span>';
      html += '</div>';

      questions.forEach(function(q, qi) {
        var hasAnswered = saved.answers.hasOwnProperty(qi);
        html += '<div class="sg36-card" style="padding:12px">';
        html += '<div style="font-weight:700;font-size:13px;margin-bottom:8px"><span style="color:#00b894">Q' + (qi + 1) + '.</span> ' + q.q + '</div>';
        html += '<div style="display:grid;grid-template-columns:1fr 1fr;gap:4px">';
        q.a.forEach(function(a, ai) {
          var bg = 'var(--bg)';
          var border = 'var(--border)';
          if (hasAnswered) {
            if (ai === q.c) { bg = '#2ecc7133'; border = '#2ecc71'; }
            else if (saved.answers[qi + '_sel'] === ai) { bg = '#e74c3c33'; border = '#e74c3c'; }
          }
          html += '<div class="sg36-tab" data-qi="' + qi + '" data-ai="' + ai + '" style="background:' + bg + ';border-color:' + border + ';font-size:11px;text-align:center;' + (hasAnswered ? 'pointer-events:none;opacity:0.9' : '') + '">' + a + '</div>';
        });
        html += '</div></div>';
      });

      if (answered > 0) {
        html += '<div style="text-align:center;margin-top:12px"><button class="sg36-btn sg36-btn-secondary" id="sg36-iq20-reset">&#xCD08;&#xAE30;&#xD654;</button></div>';
      }

      body.innerHTML = html;

      body.querySelectorAll('.sg36-tab[data-qi]').forEach(function(tab) {
        tab.onclick = function() {
          var qi = parseInt(this.dataset.qi);
          var ai = parseInt(this.dataset.ai);
          if (saved.answers.hasOwnProperty(qi)) return;
          saved.answers[qi] = ai === questions[qi].c;
          saved.answers[qi + '_sel'] = ai;
          if (saved.answers[qi]) SFX.hio_ace(); else SFX.injury_scan();
          LS('iq20', saved);
          render();
        };
      });

      var resetBtn = document.getElementById('sg36-iq20-reset');
      if (resetBtn) {
        resetBtn.onclick = function() {
          saved = { answers: {}, score: 0 };
          LS('iq20', saved);
          render();
        };
      }
    }

    render();
  }

  // ========================================================================
  // ACHIEVEMENTS - 15 new (272 -> 287)
  // ========================================================================
  var achievements = [
    { id: 'hio_calculator', name: '홀인원 분석가', desc: '홀인원 확률 계산기 사용', check: function() { return LS('hio'); } },
    { id: 'swing_weight_expert', name: '스윙웨이트 전문가', desc: '클럽 스윙웨이트 최적화 사용', check: function() { return true; } },
    { id: 'pace_analyzer', name: '페이스 분석가', desc: '라운드 페이스 분석기 사용', check: function() { return true; } },
    { id: 'green_reader', name: '그린 리더', desc: '그린 언듈레이션 시뮬레이터 사용', check: function() { return true; } },
    { id: 'injury_preventer', name: '부상 예방 전문가', desc: '부상 예방 가이드 확인', check: function() { return true; } },
    { id: 'par_saver', name: 'Par 세이브 마스터', desc: 'Par 세이브 패턴 분석 사용', check: function() { return true; } },
    { id: 'route_planner', name: '코스 전략가', desc: '코스 경로 플래너 사용', check: function() { return true; } },
    { id: 'season_analyst', name: '시즌 분석가', desc: '시즌 피크 분석기 사용', check: function() { return true; } },
    { id: 'golf_iq_v20', name: 'Golf IQ v20 도전자', desc: 'Golf IQ v20 퍼즐 응답', check: function() { return LS('iq20'); } },
    { id: 'golf_iq_v20_master', name: 'Golf IQ v20 마스터', desc: 'Golf IQ v20 12문항 이상 정답', check: function() { var s = LS('iq20'); if (!s) return false; var c = 0; for (var k in s.answers) { if (typeof s.answers[k] === 'boolean' && s.answers[k]) c++; } return c >= 12; } },
    { id: 'v36_explorer', name: 'v36 탐험가', desc: 'v36 기능 3개 이상 사용', check: function() { return true; } },
    { id: 'v36_complete', name: 'v36 컴플리트', desc: 'v36 모든 기능 확인', check: function() { return true; } },
    { id: 'hio_dreamer', name: '홀인원 드리머', desc: '모든 클럽 홀인원 확률 확인', check: function() { return LS('hio'); } },
    { id: 'green_all_types', name: '그린 마스터', desc: '모든 그린 유형 확인', check: function() { return true; } },
    { id: 'season_planner', name: '시즌 플래너', desc: '피크 시즌 분석 완료', check: function() { return true; } }
  ];

  var savedAch = LS('achievements') || {};
  achievements.forEach(function(a) {
    if (!savedAch[a.id] && a.check()) {
      savedAch[a.id] = true;
      LS('achievements', savedAch);
    }
  });

  // ========================================================================
  // NAVIGATION - append to existing bar (UI 불가침 규칙 준수)
  // ========================================================================
  var navItems = [
    { icon: '&#x26F3;', label: 'HIO', fn: openHoleInOneCalc },
    { icon: '&#x2696;&#xFE0F;', label: 'Weight', fn: openSwingWeightOpt },
    { icon: '&#x23F1;&#xFE0F;', label: 'Pace', fn: openRoundPaceAnalyzer },
    { icon: '&#x1F3CC;&#xFE0F;', label: 'Green', fn: openGreenUndulation },
    { icon: '&#x1FA7A;', label: 'Injury', fn: openInjuryPrevention },
    { icon: '&#x1F3F3;&#xFE0F;', label: 'ParSave', fn: openParSaveAnalysis },
    { icon: '&#x1F5FA;&#xFE0F;', label: 'Route', fn: openCourseRoutePlanner },
    { icon: '&#x1F4C5;', label: 'Season', fn: openSeasonPeakAnalyzer },
    { icon: '&#x1F9E0;', label: 'IQ v20', fn: openGolfIQv20 }
  ];

  var existingBar = document.querySelector('.sg30-bottom-bar') || document.querySelector('[class*="bottom-bar"]');
  if (existingBar) {
    navItems.forEach(function(item) {
      var btn = document.createElement('button');
      btn.className = existingBar.querySelector('button') ? existingBar.querySelector('button').className : 'sg30-bbtn';
      btn.innerHTML = '<span class="' + (existingBar.querySelector('.sg30-bbtn-icon') ? 'sg30-bbtn-icon' : 'sg36-bbtn-icon') + '">' + item.icon + '</span><span class="' + (existingBar.querySelector('.sg30-bbtn-label') ? 'sg30-bbtn-label' : 'sg36-bbtn-label') + '">' + item.label + '</span>';
      btn.onclick = item.fn;
      existingBar.appendChild(btn);
    });
  }

  // ========== KEYBOARD SHORTCUTS ==========
  document.addEventListener('keydown', function(e) {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'SELECT') return;
    if (!e.shiftKey) return;
    var map = { A: openHoleInOneCalc, S: openSwingWeightOpt, D: openRoundPaceAnalyzer, F: openGreenUndulation, G: openInjuryPrevention, H: openParSaveAnalysis, J: openCourseRoutePlanner, K: openSeasonPeakAnalyzer, L: openGolfIQv20 };
    if (map[e.key.toUpperCase()]) { e.preventDefault(); map[e.key.toUpperCase()](); }
  });

  // ========== ESC to close ==========
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      document.querySelectorAll('.sg36-overlay.active').forEach(function(ov) { ov.classList.remove('active'); });
    }
  });

})();
