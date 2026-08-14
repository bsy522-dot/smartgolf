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

  var LS = function(k, v) { return v === undefined ? JSON.parse(localStorage.getItem('sg36b_' + k) || 'null') : localStorage.setItem('sg36b_' + k, JSON.stringify(v)); };

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

  // 실제 사용 기록(업적 판정의 근거). 패널을 실제로 열었을 때만 기록된다.
  var usage = LS('usage') || {};
  function markUsed(key) {
    if (!usage[key]) { usage[key] = true; LS('usage', usage); }
    evalAchievements();
  }
  function markGreenType(idx) {
    if (!usage.greenTypes) usage.greenTypes = {};
    if (!usage.greenTypes[idx]) { usage.greenTypes[idx] = true; LS('usage', usage); }
    evalAchievements();
  }
  var FEATURE_KEYS = ['hio', 'swgt', 'pace', 'green', 'inj', 'psave', 'route', 'season'];
  function usedCount() {
    return FEATURE_KEYS.filter(function(k) { return usage[k]; }).length;
  }

  // ========================================================================
  // 1. 홀인원 확률 계산기 Canvas 620x400
  // ========================================================================
  function openHoleInOneCalc() {
    SFX.hio_calc();
    var ov = document.getElementById('sg36-hio') || createOverlay('sg36-hio', '&#x26F3; &#xD640;&#xC778;&#xC6D0; &#xD655;&#xB960; &#xACC4;&#xC0B0;&#xAE30;', 'linear-gradient(135deg,#d63031,#e17055)');
    ov.classList.add('active');
    var body = document.getElementById('sg36-hio-body');

    markUsed('hio');

    // 클럽별/수준별 홀인원 확률표와 "평균 프로/아마추어 확률" 통계는 출처를 확인할 수 있는
    // 공개 자료가 없어 삭제했다. 대신 사용자가 직접 기록한 파3 시도 수와 홀인원 수만 집계한다.
    var stored = LS('hio') || {};
    var saved = {
      par3: typeof stored.par3 === 'number' ? stored.par3 : null,
      aces: typeof stored.aces === 'number' ? stored.aces : null
    };

    function render() {
      var html = '<div style="padding:10px;background:var(--bg);border-radius:10px;border:1px solid var(--border);font-size:12px;color:var(--text-muted);line-height:1.6;margin-bottom:10px">클럽별 홀인원 확률과 평균 확률 통계는 출처를 확인할 수 없어 표시하지 않습니다. 직접 입력한 파3 시도 수와 홀인원 수만 집계합니다.</div>';
      html += '<canvas id="sg36-hio-canvas" width="620" height="400" style="width:100%;max-width:620px;border-radius:12px;background:#1a1a2e;display:block;margin:0 auto 12px"></canvas>';
      html += '<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">';
      html += '<div class="sg36-card" style="text-align:center;padding:10px"><div style="font-size:11px;color:var(--text-muted);margin-bottom:4px">파3 시도(홀 수)</div><input type="number" id="sg36-hio-par3" min="0" step="1" value="' + (saved.par3 === null ? '' : saved.par3) + '" style="width:90px;text-align:center;font-size:16px;font-weight:700;border:2px solid #e17055;border-radius:8px;padding:4px;background:var(--bg);color:var(--text)"></div>';
      html += '<div class="sg36-card" style="text-align:center;padding:10px"><div style="font-size:11px;color:var(--text-muted);margin-bottom:4px">홀인원 횟수</div><input type="number" id="sg36-hio-aces" min="0" step="1" value="' + (saved.aces === null ? '' : saved.aces) + '" style="width:90px;text-align:center;font-size:16px;font-weight:700;border:2px solid #fdcb6e;border-radius:8px;padding:4px;background:var(--bg);color:var(--text)"></div>';
      html += '</div>';
      html += '<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:8px">';
      html += '<button class="sg36-btn sg36-btn-primary" id="sg36-hio-save">기록 저장</button>';
      html += '<button class="sg36-btn sg36-btn-secondary" id="sg36-hio-reset">초기화</button>';
      html += '</div>';
      body.innerHTML = html;

      document.getElementById('sg36-hio-save').onclick = function() {
        var p = readNum('sg36-hio-par3');
        var a = readNum('sg36-hio-aces');
        if (p === null) { alert('파3 시도 횟수를 입력하세요.'); return; }
        saved.par3 = Math.max(0, Math.round(p));
        saved.aces = a === null ? 0 : Math.max(0, Math.round(a));
        LS('hio', saved);
        SFX.hio_ace();
        evalAchievements();
        render();
      };
      document.getElementById('sg36-hio-reset').onclick = function() {
        saved = { par3: null, aces: null };
        LS('hio', saved);
        SFX.hio_calc();
        render();
      };

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
      ctx.fillText('내 홀인원 기록', W / 2, 25);

      if (saved.par3 === null || saved.par3 <= 0) {
        drawEmpty(ctx, W, H, '파3 시도 횟수를 입력하면 표시됩니다');
        return;
      }

      var aces = saved.aces || 0;
      var bars = [
        { label: '파3 시도', value: saved.par3, color: '#e17055' },
        { label: '홀인원', value: aces, color: '#fdcb6e' }
      ];
      var maxV = Math.max(1, saved.par3);
      var barW = 90, startX = 150, baseY = H - 90;

      bars.forEach(function(b, i) {
        var h = (b.value / maxV) * 220;
        var x = startX + i * (barW + 100);
        ctx.fillStyle = b.color;
        ctx.beginPath();
        ctx.roundRect(x, baseY - h, barW, h, [6, 6, 0, 0]);
        ctx.fill();
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 12px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(b.value + '회', x + barW / 2, baseY - h - 8);
        ctx.fillStyle = 'rgba(255,255,255,0.7)';
        ctx.font = '11px sans-serif';
        ctx.fillText(b.label, x + barW / 2, baseY + 18);
      });

      ctx.fillStyle = 'rgba(255,255,255,0.75)';
      ctx.font = '12px sans-serif';
      ctx.textAlign = 'center';
      if (aces > 0) {
        ctx.fillText('내 기록 기준: 파3 ' + Math.round(saved.par3 / aces).toLocaleString() + '홀당 1회 (표본 ' + saved.par3 + '홀)', W / 2, H - 40);
      } else {
        ctx.fillText('아직 홀인원 기록이 없습니다 (표본 파3 ' + saved.par3 + '홀)', W / 2, H - 40);
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

    markUsed('swgt');

    // 현재 스윙웨이트/총중량/길이/헤드무게는 사용자가 실제로 측정해 입력하기 전까지 비워 둔다.
    // ideal은 앱이 제시하는 기준값이며 측정치가 아니다.
    var CLUB_DEFS = [
      { name: 'Driver', ideal: 'D2' },
      { name: '3W', ideal: 'D1' },
      { name: '5W', ideal: 'D1' },
      { name: '4I', ideal: 'D0' },
      { name: '5I', ideal: 'D1' },
      { name: '6I', ideal: 'D1' },
      { name: '7I', ideal: 'D1' },
      { name: '8I', ideal: 'D1' },
      { name: '9I', ideal: 'D2' },
      { name: 'PW', ideal: 'D2' },
      { name: 'SW', ideal: 'D3' },
      { name: 'Putter', ideal: 'E0' }
    ];
    var storedSw = LS('swgt');
    var clubsData = (storedSw && storedSw.length === CLUB_DEFS.length) ? storedSw : CLUB_DEFS.map(function(c) {
      return { name: c.name, ideal: c.ideal, current: '', weight: null, len: null, headWt: null };
    });

    function swVal(s) {
      if (!s || s.length < 2) return null;
      var letter = s.charAt(0).toUpperCase();
      var num = parseInt(s.charAt(1), 10);
      var base = { C: 0, D: 10, E: 20 };
      if (base[letter] === undefined || isNaN(num)) return null;
      return base[letter] + num;
    }

    function numCell(id, val) {
      return '<td style="text-align:center"><input type="number" id="' + id + '" value="' + (val === null || val === undefined ? '' : val) + '" style="width:62px;text-align:center"></td>';
    }

    function render() {
      var html = '<canvas id="sg36-swgt-canvas" width="600" height="380" style="width:100%;max-width:600px;border-radius:12px;background:#1a1a2e;display:block;margin:0 auto 12px"></canvas>';
      html += '<div style="font-size:12px;color:var(--text-muted);margin-bottom:6px">클럽 스펙은 직접 측정해 입력하세요. "기준"은 앱이 제시하는 목표값이며 측정치가 아닙니다.</div>';
      html += '<div style="overflow-x:auto"><table style="width:100%;border-collapse:collapse;font-size:12px">';
      html += '<tr style="background:var(--primary);color:#fff"><th style="padding:8px">클럽</th><th>현재(입력)</th><th>기준</th><th>편차</th><th>총중량(g)</th><th>길이(inch)</th><th>헤드(g)</th></tr>';
      clubsData.forEach(function(c, i) {
        var cv = swVal(c.current), iv = swVal(c.ideal);
        var diff = (cv === null || iv === null) ? null : cv - iv;
        var color = diff === null ? 'var(--text-muted)' : (diff === 0 ? '#2ecc71' : Math.abs(diff) === 1 ? '#f39c12' : '#e74c3c');
        var status = diff === null ? '-' : (diff === 0 ? '0' : (diff > 0 ? '+' + diff : String(diff)));
        html += '<tr style="border-bottom:1px solid var(--border)">';
        html += '<td style="padding:6px 8px;font-weight:600">' + c.name + '</td>';
        html += '<td style="text-align:center"><input type="text" id="sg36-sw-cur-' + i + '" value="' + (c.current || '') + '" maxlength="2" placeholder="D2" style="width:48px;text-align:center"></td>';
        html += '<td style="text-align:center;color:#6c5ce7;font-weight:600">' + c.ideal + '</td>';
        html += '<td style="text-align:center;color:' + color + ';font-weight:700">' + status + '</td>';
        html += numCell('sg36-sw-wt-' + i, c.weight);
        html += numCell('sg36-sw-len-' + i, c.len);
        html += numCell('sg36-sw-hd-' + i, c.headWt);
        html += '</tr>';
      });
      html += '</table></div>';

      var entered = clubsData.filter(function(c) { return swVal(c.current) !== null; });
      var matched = entered.filter(function(c) { return swVal(c.current) === swVal(c.ideal); }).length;
      html += '<div style="margin-top:12px;text-align:center">';
      if (entered.length) {
        var score = Math.round(matched / entered.length * 100);
        html += '<span class="' + gradeClass(score, 100) + '">' + gradeLabel(score, 100) + ' (' + score + '%)</span>';
        html += '<div style="font-size:11px;color:var(--text-muted);margin-top:4px">입력 ' + entered.length + '/' + clubsData.length + '개 중 기준 일치 ' + matched + '개</div>';
      } else {
        html += '<div style="font-size:12px;color:var(--text-muted)">현재 스윙웨이트를 입력하면 기준 대비 편차를 계산합니다.</div>';
      }
      html += '</div>';

      html += '<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:10px">';
      html += '<button class="sg36-btn sg36-btn-primary" id="sg36-swgt-save">스펙 저장</button>';
      html += '<button class="sg36-btn sg36-btn-secondary" id="sg36-swgt-reset">전체 삭제</button>';
      html += '</div>';

      body.innerHTML = html;

      document.getElementById('sg36-swgt-save').onclick = function() {
        clubsData = clubsData.map(function(c, i) {
          var curEl = document.getElementById('sg36-sw-cur-' + i);
          var cur = curEl ? (curEl.value || '').trim().toUpperCase() : '';
          return {
            name: c.name,
            ideal: c.ideal,
            current: swVal(cur) === null ? '' : cur,
            weight: readNum('sg36-sw-wt-' + i),
            len: readNum('sg36-sw-len-' + i),
            headWt: readNum('sg36-sw-hd-' + i)
          };
        });
        LS('swgt', clubsData);
        SFX.weight_opt();
        render();
      };
      document.getElementById('sg36-swgt-reset').onclick = function() {
        clubsData = CLUB_DEFS.map(function(c) { return { name: c.name, ideal: c.ideal, current: '', weight: null, len: null, headWt: null }; });
        LS('swgt', clubsData);
        SFX.weight_scan();
        render();
      };

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
      ctx.fillText('클럽별 스윙웨이트 (기준 vs 입력값)', W / 2, 25);

      var anyEntered = clubsData.some(function(cd) { return swVal(cd.current) !== null; });
      if (!anyEntered) { drawEmpty(ctx, W, H, '현재 스윙웨이트를 입력하면 표시됩니다'); return; }

      var barW = 34, gap = 10, startX = 45;
      clubsData.forEach(function(cd, i) {
        var x = startX + i * (barW + gap);
        var iv = swVal(cd.ideal), cv = swVal(cd.current);
        var idealH = ((iv === null ? 0 : iv) / 22) * 250;
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

        ctx.fillStyle = '#fff';
        ctx.font = '9px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(cd.name, x + barW / 2, H - 36);

        if (cv === null) {
          ctx.fillStyle = 'rgba(255,255,255,0.35)';
          ctx.font = '9px sans-serif';
          ctx.fillText('-', x + barW / 2, baseY - 6);
          return;
        }

        var currH = (cv / 22) * 250;
        var diff = cv - iv;
        var barColor = diff === 0 ? '#2ecc71' : Math.abs(diff) <= 1 ? '#f39c12' : '#e74c3c';
        var grad = ctx.createLinearGradient(x, baseY - currH, x, baseY);
        grad.addColorStop(0, barColor);
        grad.addColorStop(1, barColor + '88');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.roundRect(x + 4, baseY - currH, barW - 8, currH, [3, 3, 0, 0]);
        ctx.fill();

        ctx.fillStyle = '#fdcb6e';
        ctx.font = 'bold 10px sans-serif';
        ctx.fillText(cd.current, x + barW / 2, baseY - currH - 6);
      });

      ctx.fillStyle = 'rgba(162,155,254,0.5)';
      ctx.font = '10px sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText('점선 = 앱 기준값 / 막대 = 입력한 현재값', 45, H - 10);
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

    markUsed('pace');

    var PARS = [4, 4, 3, 5, 4, 4, 3, 5, 4, 4, 3, 5, 4, 4, 3, 4, 5, 4];
    // 기준 시간은 앱이 정한 목표값(파3 9분 / 파4 12분 / 파5 15분)이며 실제 측정치가 아니다.
    var IDEALS = PARS.map(function(p) { return p === 3 ? 9 : (p === 4 ? 12 : 15); });

    var stored = LS('pace') || {};
    var holes = (stored.holes && stored.holes.length === 18) ? stored.holes : PARS.map(function(p, i) {
      return { hole: i + 1, par: p, minutes: null, ideal: IDEALS[i] };
    });

    function enteredHoles() { return holes.filter(function(h) { return typeof h.minutes === 'number'; }); }

    function render() {
      var ent = enteredHoles();
      var totalMin = 0, idealTotal = 0;
      ent.forEach(function(h) { totalMin += h.minutes; idealTotal += h.ideal; });
      var diff = totalMin - idealTotal;

      var html = '<canvas id="sg36-pace-canvas" width="620" height="380" style="width:100%;max-width:620px;border-radius:12px;background:#1a1a2e;display:block;margin:0 auto 12px"></canvas>';

      html += '<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-bottom:12px">';
      if (ent.length) {
        var hours = Math.floor(totalMin / 60), mins = totalMin % 60;
        var diffColor = diff <= 5 ? '#2ecc71' : diff <= 15 ? '#f39c12' : '#e74c3c';
        html += '<div class="sg36-card" style="text-align:center"><div style="font-size:20px;font-weight:700;color:#00b894">' + hours + 'h ' + mins + 'm</div><div style="font-size:11px;color:var(--text-muted)">입력 ' + ent.length + '홀 합계</div></div>';
        html += '<div class="sg36-card" style="text-align:center"><div style="font-size:20px;font-weight:700;color:#fdcb6e">' + Math.round(totalMin / ent.length) + '분</div><div style="font-size:11px;color:var(--text-muted)">홀당 평균</div></div>';
        html += '<div class="sg36-card" style="text-align:center"><div style="font-size:20px;font-weight:700;color:' + diffColor + '">' + (diff > 0 ? '+' : '') + diff + '분</div><div style="font-size:11px;color:var(--text-muted)">기준 대비</div></div>';
      } else {
        html += '<div class="sg36-card" style="text-align:center;grid-column:1/4;font-size:12px;color:var(--text-muted)">홀별 소요시간을 입력하면 합계·평균·기준 대비가 계산됩니다.</div>';
      }
      html += '</div>';

      html += '<div style="overflow-x:auto"><div style="display:grid;grid-template-columns:repeat(9,1fr);gap:4px">';
      holes.forEach(function(h, i) {
        var has = typeof h.minutes === 'number';
        var bg = !has ? '#7f8c8d' : (h.minutes / h.ideal <= 1 ? '#2ecc71' : (h.minutes / h.ideal <= 1.15 ? '#f39c12' : '#e74c3c'));
        html += '<div style="text-align:center;padding:6px 2px;border-radius:6px;background:' + bg + '22;border:1px solid ' + bg + '">';
        html += '<div style="font-size:10px;font-weight:700">' + h.hole + 'H</div>';
        html += '<input type="number" id="sg36-pace-in-' + i + '" min="0" max="90" value="' + (has ? h.minutes : '') + '" style="width:44px;text-align:center;font-size:12px">';
        html += '<div style="font-size:9px;color:var(--text-muted)">Par ' + h.par + ' / 기준 ' + h.ideal + '분</div>';
        html += '</div>';
      });
      html += '</div></div>';

      html += '<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:10px">';
      html += '<button class="sg36-btn sg36-btn-primary" id="sg36-pace-save">소요시간 저장</button>';
      html += '<button class="sg36-btn sg36-btn-secondary" id="sg36-pace-reset">전체 삭제</button>';
      html += '</div>';

      html += '<div style="margin-top:12px;padding:10px;background:var(--bg);border-radius:10px;border:1px solid var(--border)">';
      html += '<div style="font-weight:600;margin-bottom:6px">&#x1F4A1; 페이스 개선 팁</div>';
      html += '<div style="font-size:12px;color:var(--text-muted);line-height:1.6">';
      html += '&#x2022; 기준 시간은 앱이 정한 목표값(파3 9분 / 파4 12분 / 파5 15분)입니다.<br>';
      if (ent.length && diff > 15) {
        html += '&#x2022; 입력한 홀 합계가 기준보다 ' + diff + '분 깁니다. Ready Golf(준비된 사람부터 치기)를 적용해 보세요.<br>';
        html += '&#x2022; 클럽 선택과 그린에서의 루틴을 짧게 가져가세요.';
      } else if (ent.length && diff > 5) {
        html += '&#x2022; 기준보다 ' + diff + '분 깁니다. 앞 조와의 간격을 확인하세요.';
      } else if (ent.length) {
        html += '&#x2022; 입력한 홀 기준으로는 목표 시간 안에 진행했습니다.';
      } else {
        html += '&#x2022; 홀별 소요시간을 입력하면 개선 팁을 계산합니다.';
      }
      html += '</div></div>';

      body.innerHTML = html;

      document.getElementById('sg36-pace-save').onclick = function() {
        var any = false;
        var next = holes.map(function(h, i) {
          var v = readNum('sg36-pace-in-' + i);
          if (v !== null) any = true;
          return { hole: h.hole, par: h.par, minutes: v === null ? null : Math.max(0, Math.round(v)), ideal: h.ideal };
        });
        if (!any) { alert('홀별 소요시간을 하나 이상 입력하세요.'); return; }
        holes = next;
        stored.holes = holes;
        LS('pace', stored);
        SFX.pace_fast();
        render();
      };
      document.getElementById('sg36-pace-reset').onclick = function() {
        holes = PARS.map(function(p, i) { return { hole: i + 1, par: p, minutes: null, ideal: IDEALS[i] }; });
        stored.holes = holes;
        LS('pace', stored);
        SFX.pace_log();
        render();
      };

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
      ctx.fillText('18홀 페이스 (입력한 홀만 표시)', W / 2, 25);

      if (!enteredHoles().length) { drawEmpty(ctx, W, H, '홀별 소요시간을 입력하면 표시됩니다'); return; }

      var barW = 26, gap = 6, startX = 30;
      var maxMin = Math.max(22, Math.max.apply(null, enteredHoles().map(function(h) { return h.minutes; })));

      holes.forEach(function(h, i) {
        var x = startX + i * (barW + gap);
        var baseY = H - 45;
        var idealH = (h.ideal / maxMin) * 280;

        ctx.fillStyle = 'rgba(0,206,201,0.15)';
        ctx.beginPath();
        ctx.roundRect(x, baseY - idealH, barW, idealH, [3, 3, 0, 0]);
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

        if (typeof h.minutes !== 'number') {
          ctx.fillStyle = 'rgba(255,255,255,0.3)';
          ctx.font = '9px sans-serif';
          ctx.fillText('-', x + barW / 2, baseY - 6);
          return;
        }

        var barH = (h.minutes / maxMin) * 280;
        var overPct = h.minutes / h.ideal;
        var barColor = overPct <= 1 ? '#2ecc71' : (overPct <= 1.15 ? '#fdcb6e' : '#e74c3c');
        var grad = ctx.createLinearGradient(x, baseY - barH, x, baseY);
        grad.addColorStop(0, barColor);
        grad.addColorStop(1, barColor + '66');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.roundRect(x + 2, baseY - barH, barW - 4, barH, [3, 3, 0, 0]);
        ctx.fill();

        ctx.fillStyle = barColor;
        ctx.font = 'bold 9px sans-serif';
        ctx.fillText(h.minutes + 'm', x + barW / 2, baseY - barH - 5);
      });

      ctx.fillStyle = 'rgba(0,206,201,0.5)';
      ctx.font = '10px sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText('점선 = 앱 기준시간 / 막대 = 입력한 실제시간', 30, H - 8);
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
    markUsed('green');
    markGreenType(selIdx);

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
          markGreenType(selIdx);
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

    markUsed('inj');

    // 발생빈도(%)·위험도(/10) 수치는 출처를 확인할 수 있는 자료가 없어 삭제했다.
    // 깨진 zone 문자열은 바로잡고, 부위와 맞지 않게 섞여 있던 예방운동 항목은 제거했다.
    var injuries = [
      { name: '허리(요통)', zone: '몸통/하체', exercises: ['코어 안정화', '플랭크', '브릿지'], icon: '🦴' },
      { name: '팔꿈치', zone: '상체', exercises: ['팔꿈치 스트레칭', '저항밴드'], icon: '💪' },
      { name: '손목', zone: '상체', exercises: ['손목 회전', '그립 강화'], icon: '✋' },
      { name: '어깨', zone: '상체', exercises: ['로테이터커프', '어깨 스트레칭'], icon: '🧘' },
      { name: '무릎', zone: '하체', exercises: ['레그프레스', '스쿼트'], icon: '🦵' },
      { name: '골프엘보', zone: '상체', exercises: ['프로네이션/수피네이션', '압박 스트레칭'], icon: '🩼' },
      { name: '갈비뼈', zone: '몸통', exercises: [], icon: '🩹' },
      { name: '목/경추', zone: '상체', exercises: ['목 회전'], icon: '🙎' }
    ];

    function render() {
      var html = '<canvas id="sg36-inj-canvas" width="600" height="380" style="width:100%;max-width:600px;border-radius:12px;background:#1a1a2e;display:block;margin:0 auto 12px"></canvas>';

      html += '<div style="padding:10px;background:var(--bg);border-radius:10px;border:1px solid var(--border);font-size:12px;color:var(--text-muted);line-height:1.6;margin-bottom:10px">부위별 발생 빈도와 위험도 수치는 출처를 확인할 수 없어 표시하지 않습니다. 아래는 예방 운동 참고용 목록이며, 통증이 있으면 전문의 상담이 우선입니다.</div>';

      html += '<div style="display:grid;gap:8px">';
      injuries.forEach(function(inj) {
        html += '<div class="sg36-card" style="padding:12px">';
        html += '<div style="display:flex;align-items:center;gap:10px">';
        html += '<span style="font-size:24px">' + inj.icon + '</span>';
        html += '<div style="flex:1">';
        html += '<div style="font-weight:700;font-size:13px">' + inj.name + ' <span style="color:var(--text-muted);font-weight:400;font-size:11px">(' + inj.zone + ')</span></div>';
        html += '</div>';
        html += '</div>';
        html += '<div style="margin-top:6px;font-size:11px;color:var(--text-muted)">예방 운동: ' + (inj.exercises.length ? inj.exercises.join(', ') : '전문가 상담 권장') + '</div>';
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
      ctx.fillText('골프 부상 예방 체크 부위', W / 2, 26);

      ctx.fillStyle = 'rgba(255,255,255,0.45)';
      ctx.font = '11px sans-serif';
      ctx.fillText('발생 빈도·위험도 수치는 출처 확인이 어려워 표시하지 않습니다', W / 2, 48);

      var cols = 4, tileW = 128, tileH = 96, gapX = 12, gapY = 16;
      var startX = (W - (cols * tileW + (cols - 1) * gapX)) / 2;
      var startY = 76;

      injuries.forEach(function(inj, i) {
        var col = i % cols, row = Math.floor(i / cols);
        var x = startX + col * (tileW + gapX);
        var y = startY + row * (tileH + gapY);

        ctx.fillStyle = 'rgba(231,76,60,0.12)';
        ctx.beginPath();
        ctx.roundRect(x, y, tileW, tileH, 10);
        ctx.fill();
        ctx.strokeStyle = 'rgba(231,76,60,0.5)';
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.fillStyle = '#fff';
        ctx.font = 'bold 13px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(inj.name, x + tileW / 2, y + 34);

        ctx.fillStyle = 'rgba(255,255,255,0.5)';
        ctx.font = '10px sans-serif';
        ctx.fillText(inj.zone, x + tileW / 2, y + 54);

        ctx.fillStyle = '#fdcb6e';
        ctx.font = '10px sans-serif';
        ctx.fillText(inj.exercises.length ? '예방운동 ' + inj.exercises.length + '종' : '전문가 상담', x + tileW / 2, y + 76);
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

    markUsed('psave');

    // 성공률·시도 횟수는 사용자가 직접 입력하기 전까지 비워 둔다(기존 하드코딩 통계 삭제).
    var SITUATIONS = [
      { name: '그린사이드 벙커', tip: '플롭 샷을 활용하세요' },
      { name: '그린 프린지', tip: '러닝 어프로치를 시도하세요' },
      { name: '페어웨이 벙커', tip: '거리 컨트롤에 집중하세요' },
      { name: '러프 주변', tip: '로브 또는 플롭 선택' },
      { name: '림 바운드', tip: '칩을 충분히 붙이세요' },
      { name: '페널티 구역', tip: '안전한 탈출 우선' },
      { name: '크로스 벙커', tip: '그린 이상의 위치를 노리세요' },
      { name: '디봇 샷', tip: '볼을 가볍게 두세요' },
      { name: '핀 하이 퍼팅', tip: '스트로크 정확도를 높이세요' },
      { name: '럭 퍼팅', tip: '경사를 과감히 읽으세요' }
    ];

    var storedPs = LS('psave');
    var data = (storedPs && storedPs.length === SITUATIONS.length) ? storedPs : SITUATIONS.map(function(s) {
      return { name: s.name, attempts: null, saves: null };
    });

    function savePct(row) {
      if (typeof row.attempts !== 'number' || row.attempts <= 0 || typeof row.saves !== 'number') return null;
      return Math.round(row.saves / row.attempts * 100);
    }

    function render() {
      var html = '<canvas id="sg36-psave-canvas" width="620" height="400" style="width:100%;max-width:620px;border-radius:12px;background:#1a1a2e;display:block;margin:0 auto 12px"></canvas>';

      var totalAttempts = 0, totalSaves = 0;
      data.forEach(function(r) {
        if (typeof r.attempts === 'number' && typeof r.saves === 'number' && r.attempts > 0) {
          totalAttempts += r.attempts;
          totalSaves += r.saves;
        }
      });

      html += '<div style="text-align:center;margin-bottom:12px">';
      if (totalAttempts > 0) {
        var overallPct = Math.round(totalSaves / totalAttempts * 100);
        html += '<span class="' + gradeClass(overallPct, 100) + '">' + gradeLabel(overallPct, 100) + ' 등급 (' + overallPct + '%)</span>';
        html += '<div style="font-size:11px;color:var(--text-muted);margin-top:4px">입력한 ' + totalAttempts + '회 시도 중 ' + totalSaves + '회 세이브</div>';
      } else {
        html += '<div style="font-size:12px;color:var(--text-muted)">상황별 시도/성공 횟수를 입력하면 성공률을 계산합니다.</div>';
      }
      html += '</div>';

      html += '<div style="display:grid;gap:6px">';
      SITUATIONS.forEach(function(s, i) {
        var pct = savePct(data[i]);
        var pctColor = pct === null ? 'var(--text-muted)' : (pct >= 60 ? '#2ecc71' : pct >= 40 ? '#f39c12' : '#e74c3c');
        html += '<div class="sg36-stat">';
        html += '<span style="font-weight:600;font-size:12px">' + s.name + '<span style="display:block;font-weight:400;font-size:10px;color:var(--text-muted)">' + s.tip + '</span></span>';
        html += '<div style="display:flex;align-items:center;gap:6px">';
        html += '<input type="number" id="sg36-ps-att-' + i + '" min="0" placeholder="시도" value="' + (typeof data[i].attempts === 'number' ? data[i].attempts : '') + '" style="width:56px;text-align:center">';
        html += '<input type="number" id="sg36-ps-sav-' + i + '" min="0" placeholder="성공" value="' + (typeof data[i].saves === 'number' ? data[i].saves : '') + '" style="width:56px;text-align:center">';
        html += '<span style="font-weight:700;color:' + pctColor + ';font-size:12px;min-width:42px;text-align:right">' + (pct === null ? '-' : pct + '%') + '</span>';
        html += '</div></div>';
      });
      html += '</div>';

      html += '<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:10px">';
      html += '<button class="sg36-btn sg36-btn-primary" id="sg36-ps-save">기록 저장</button>';
      html += '<button class="sg36-btn sg36-btn-secondary" id="sg36-ps-reset">전체 삭제</button>';
      html += '</div>';

      body.innerHTML = html;

      document.getElementById('sg36-ps-save').onclick = function() {
        var any = false;
        var next = SITUATIONS.map(function(s, i) {
          var att = readNum('sg36-ps-att-' + i);
          var sav = readNum('sg36-ps-sav-' + i);
          if (att !== null && att > 0 && sav !== null) any = true;
          if (att !== null && sav !== null && sav > att) sav = att;
          return { name: s.name, attempts: att === null ? null : Math.max(0, Math.round(att)), saves: sav === null ? null : Math.max(0, Math.round(sav)) };
        });
        if (!any) { alert('시도와 성공 횟수를 함께 입력한 상황이 최소 1개 필요합니다.'); return; }
        data = next;
        LS('psave', data);
        SFX.par_analyze();
        render();
      };
      document.getElementById('sg36-ps-reset').onclick = function() {
        data = SITUATIONS.map(function(s) { return { name: s.name, attempts: null, saves: null }; });
        LS('psave', data);
        SFX.par_save();
        render();
      };

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
      ctx.fillText('Par 세이브 성공률 (직접 입력한 기록)', W / 2, 25);

      var hasAny = data.some(function(r) { return savePct(r) !== null; });
      if (!hasAny) { drawEmpty(ctx, W, H, '상황별 시도/성공 횟수를 입력하면 표시됩니다'); return; }

      var barH = 22, gap = 8, startY = 50, labelW = 120;

      data.forEach(function(row, i) {
        var y = startY + i * (barH + gap);
        var barMaxW = W - labelW - 80;
        var pct = savePct(row);

        ctx.fillStyle = 'rgba(255,255,255,0.7)';
        ctx.font = '11px sans-serif';
        ctx.textAlign = 'right';
        ctx.fillText(row.name, labelW - 8, y + 16);

        ctx.fillStyle = 'rgba(52,152,219,0.15)';
        ctx.beginPath();
        ctx.roundRect(labelW, y, barMaxW, barH, 4);
        ctx.fill();

        if (pct === null) {
          ctx.fillStyle = 'rgba(255,255,255,0.35)';
          ctx.font = '10px sans-serif';
          ctx.textAlign = 'left';
          ctx.fillText('미입력', labelW + 8, y + 16);
          return;
        }

        var pctColor = pct >= 60 ? '#2ecc71' : pct >= 40 ? '#f39c12' : '#e74c3c';
        var barFillW = (pct / 100) * barMaxW;
        var grad = ctx.createLinearGradient(labelW, y, labelW + Math.max(1, barFillW), y);
        grad.addColorStop(0, pctColor + 'AA');
        grad.addColorStop(1, pctColor);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.roundRect(labelW, y, barFillW, barH, 4);
        ctx.fill();

        ctx.fillStyle = '#fff';
        ctx.font = 'bold 11px sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText(pct + '% (' + row.saves + '/' + row.attempts + ')', labelW + barFillW + 6, y + 16);
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
    markUsed('route');

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

    markUsed('season');

    // 월별 라운드 수·그린피·혼잡도·기온은 모두 창작 데이터였으므로 삭제하고,
    // 사용자가 직접 입력한 월별 라운드 수와 그린피만 집계한다.
    var MONTH_NAMES = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];
    var storedSeason = LS('season') || {};
    var months = (storedSeason.months && storedSeason.months.length === 12) ? storedSeason.months : MONTH_NAMES.map(function(n) {
      return { name: n, rounds: null, green: null };
    });

    function enteredMonths() { return months.filter(function(m) { return typeof m.rounds === 'number'; }); }

    function render() {
      var html = '<canvas id="sg36-season-canvas" width="620" height="400" style="width:100%;max-width:620px;border-radius:12px;background:#1a1a2e;display:block;margin:0 auto 12px"></canvas>';

      var ent = enteredMonths();
      var totalRounds = 0;
      ent.forEach(function(m) { totalRounds += m.rounds; });
      var greenVals = months.filter(function(m) { return typeof m.green === 'number'; }).map(function(m) { return m.green; });
      var avgGreen = greenVals.length ? Math.round(greenVals.reduce(function(a, b) { return a + b; }, 0) / greenVals.length) : null;
      var peak = null;
      ent.forEach(function(m) { if (!peak || m.rounds > peak.rounds) peak = m; });

      html += '<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin-bottom:10px">';
      html += '<div class="sg36-card" style="text-align:center"><div style="font-size:16px;font-weight:700;color:#2ecc71">' + (ent.length ? totalRounds + '회' : '-') + '</div><div style="font-size:10px;color:var(--text-muted)">입력한 연간 라운드</div></div>';
      html += '<div class="sg36-card" style="text-align:center"><div style="font-size:16px;font-weight:700;color:#f39c12">' + (avgGreen === null ? '-' : avgGreen.toLocaleString() + '원') + '</div><div style="font-size:10px;color:var(--text-muted)">입력한 평균 그린피</div></div>';
      html += '<div class="sg36-card" style="text-align:center"><div style="font-size:16px;font-weight:700;color:#9b59b6">' + (peak ? peak.name : '-') + '</div><div style="font-size:10px;color:var(--text-muted)">최다 라운드 월</div></div>';
      html += '</div>';

      html += '<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px">';
      months.forEach(function(m, i) {
        html += '<div style="text-align:center;padding:8px 4px;border-radius:8px;background:var(--bg);border:1px solid var(--border)">';
        html += '<div style="font-size:12px;font-weight:700">' + m.name + '</div>';
        html += '<input type="number" id="sg36-se-r-' + i + '" min="0" placeholder="라운드" value="' + (typeof m.rounds === 'number' ? m.rounds : '') + '" style="width:64px;text-align:center;margin-top:4px">';
        html += '<input type="number" id="sg36-se-g-' + i + '" min="0" step="1000" placeholder="그린피(원)" value="' + (typeof m.green === 'number' ? m.green : '') + '" style="width:84px;text-align:center;margin-top:4px">';
        html += '</div>';
      });
      html += '</div>';

      html += '<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:10px">';
      html += '<button class="sg36-btn sg36-btn-primary" id="sg36-se-save">월별 기록 저장</button>';
      html += '<button class="sg36-btn sg36-btn-secondary" id="sg36-se-reset">전체 삭제</button>';
      html += '</div>';

      body.innerHTML = html;

      document.getElementById('sg36-se-save').onclick = function() {
        var any = false;
        var next = MONTH_NAMES.map(function(n, i) {
          var r = readNum('sg36-se-r-' + i);
          var g = readNum('sg36-se-g-' + i);
          if (r !== null || g !== null) any = true;
          return { name: n, rounds: r === null ? null : Math.max(0, Math.round(r)), green: g === null ? null : Math.max(0, Math.round(g)) };
        });
        if (!any) { alert('월별 라운드 수 또는 그린피를 하나 이상 입력하세요.'); return; }
        months = next;
        storedSeason.months = months;
        LS('season', storedSeason);
        SFX.season_scan();
        evalAchievements();
        render();
      };
      document.getElementById('sg36-se-reset').onclick = function() {
        months = MONTH_NAMES.map(function(n) { return { name: n, rounds: null, green: null }; });
        storedSeason.months = months;
        LS('season', storedSeason);
        render();
      };

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
      ctx.fillText('월별 라운드 수 (직접 입력한 기록)', W / 2, 25);

      var ent = enteredMonths();
      if (!ent.length) { drawEmpty(ctx, W, H, '월별 라운드 수를 입력하면 표시됩니다'); return; }

      var chartX = 50, chartY = 45, chartW = W - 80, chartH = 280;
      var barW = (chartW - 11 * 8) / 12;
      var maxRounds = Math.max.apply(null, ent.map(function(m) { return m.rounds; }));
      if (maxRounds <= 0) maxRounds = 1;

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
        var baseY = chartY + chartH;

        ctx.fillStyle = '#fff';
        ctx.font = '10px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(m.name, x + barW / 2, baseY + 15);

        if (typeof m.rounds !== 'number') {
          ctx.fillStyle = 'rgba(255,255,255,0.25)';
          ctx.font = '9px sans-serif';
          ctx.fillText('-', x + barW / 2, baseY - 6);
          return;
        }

        var barH = (m.rounds / maxRounds) * chartH;
        var grad = ctx.createLinearGradient(x, baseY - barH, x, baseY);
        grad.addColorStop(0, '#9b59b6');
        grad.addColorStop(1, '#6c5ce744');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.roundRect(x, baseY - barH, barW, Math.max(1, barH), [4, 4, 0, 0]);
        ctx.fill();

        ctx.fillStyle = '#fdcb6e';
        ctx.font = 'bold 10px sans-serif';
        ctx.fillText(m.rounds + 'R', x + barW / 2, baseY - barH - 6);

        if (typeof m.green === 'number') {
          ctx.fillStyle = 'rgba(255,255,255,0.5)';
          ctx.font = '8px sans-serif';
          ctx.fillText(Math.round(m.green / 1000) + 'k', x + barW / 2, baseY + 27);
        }
      });

      ctx.fillStyle = 'rgba(255,255,255,0.5)';
      ctx.font = '10px sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText('막대 = 입력한 월별 라운드 수 / k = 입력한 그린피(천원)', chartX, H - 10);
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
      { q: '스팀프미터 13 이상의 그린은 어떤 수준?', a: ['초보자용', '중급', '투어 프로 수준', '습기찬 그린'], c: 2 },
      { q: 'Par 5 홀에서 이글을 기록하려면 몇 타?', a: ['2타', '3타', '4타', '5타'], c: 1 },
      { q: 'Ready Golf이란?', a: ['준비된 사람이 먼저 치는 방식', '빠른 플레이 모드', '시합 모드', '연습 라운드'], c: 0 },
      { q: '페이드(Fade) 샷의 구질은?', a: ['오른쪽으로 휘는 공', '왼쪽으로 휘는 공', '약간 오른쪽으로 휘며 떨어지는 공', '직선으로 나가는 공'], c: 2 },
      { q: '디봇(Divot)을 수리하는 올바른 방법은?', a: ['무시한다', '모래를 채운다', '떼어진 잔디를 다시 덮는다', '모래/종자 혼합물을 채운다'], c: 3 },
      { q: '핸디캡 계산에서 Slope Rating의 역할은?', a: ['코스 길이 보정', '보기 vs 상급자 난이도 차이 반영', '날씨 보정', '경사도 측정'], c: 1 },
      { q: 'Course Rating 72.5, Slope 135인 코스의 난이도는?', a: ['쉬운 편', '보통', '어려운 편', '매우 어려움'], c: 2 },
      { q: '코스 경로 전략에서 ‘레이업’이란?', a: ['볼을 그린 앞에 놓는 것', '볼을 저멀리 치는 것', '볼을 페어웨이에 놓는 것', '해저드 앞에 멈추는 것'], c: 0 },
      { q: '퍼터의 이상적인 로프트 각도는?', a: ['0도', '2~4도', '8~10도', '15도'], c: 1 },
      { q: '골프에서 ‘앤커(Anchor)’ 퍼팅이란?', a: ['몸에 퍼터를 고정하는 퍼팅', '느린 퍼팅', '빠른 퍼팅', '장거리 퍼팅'], c: 0 },
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
          evalAchievements();
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
    { id: 'hio_calculator', name: '홀인원 기록자', desc: '홀인원 기록 패널 사용', check: function() { return !!usage.hio; } },
    { id: 'swing_weight_expert', name: '스윙웨이트 전문가', desc: '클럽 스윙웨이트 패널 사용', check: function() { return !!usage.swgt; } },
    { id: 'pace_analyzer', name: '페이스 분석가', desc: '라운드 페이스 분석기 사용', check: function() { return !!usage.pace; } },
    { id: 'green_reader', name: '그린 리더', desc: '그린 언듈레이션 시뮬레이터 사용', check: function() { return !!usage.green; } },
    { id: 'injury_preventer', name: '부상 예방 전문가', desc: '부상 예방 가이드 확인', check: function() { return !!usage.inj; } },
    { id: 'par_saver', name: 'Par 세이브 마스터', desc: 'Par 세이브 패턴 분석 사용', check: function() { return !!usage.psave; } },
    { id: 'route_planner', name: '코스 전략가', desc: '코스 경로 플래너 사용', check: function() { return !!usage.route; } },
    { id: 'season_analyst', name: '시즌 분석가', desc: '시즌 피크 분석기 사용', check: function() { return !!usage.season; } },
    { id: 'golf_iq_v20', name: 'Golf IQ v20 도전자', desc: 'Golf IQ v20 퀴즈 응답', check: function() { var s = LS('iq20'); return !!(s && s.answers && Object.keys(s.answers).length > 0); } },
    { id: 'golf_iq_v20_master', name: 'Golf IQ v20 마스터', desc: 'Golf IQ v20 12문항 이상 정답', check: function() { var s = LS('iq20'); if (!s) return false; var c = 0; for (var k in s.answers) { if (typeof s.answers[k] === 'boolean' && s.answers[k]) c++; } return c >= 12; } },
    { id: 'v36_explorer', name: 'v36 탐험가', desc: 'v36 기능 3개 이상 사용', check: function() { return usedCount() >= 3; } },
    { id: 'v36_complete', name: 'v36 컴플리트', desc: 'v36 8개 기능 모두 확인', check: function() { return usedCount() >= FEATURE_KEYS.length; } },
    { id: 'hio_dreamer', name: '홀인원 드리머', desc: '파3 시도/홀인원 기록 저장', check: function() { var s = LS('hio'); return !!(s && typeof s.par3 === 'number'); } },
    { id: 'green_all_types', name: '그린 마스터', desc: '모든 그린 유형 확인', check: function() { return usage.greenTypes && Object.keys(usage.greenTypes).length >= 8; } },
    { id: 'season_planner', name: '시즌 플래너', desc: '월별 라운드 기록 입력', check: function() { var s = LS('season'); return !!(s && s.months && s.months.some(function(m) { return typeof m.rounds === 'number'; })); } }
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
