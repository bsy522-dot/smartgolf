/* ====================================================================
 * SmartGolf v26.0 patch
 * 코스공략가이드18홀Canvas + 라운드플래너종합 + 장비인벤토리관리
 * + 골프통계마스터Canvas + AI스윙진단체크리스트 + 코스버킷리스트
 * + 시즌플래너월별목표 + 18홀워크스루Canvas
 * + Golf IQ v10 15문항 + 업적+12(128→140) + SFX12종 + 키보드8종
 * ==================================================================== */
(function () {
  'use strict';

  const SGV26 = {};
  const LS = (k, v) => v === undefined ? JSON.parse(localStorage.getItem('sg26_' + k) || 'null') : localStorage.setItem('sg26_' + k, JSON.stringify(v));

  // ========== CSS ==========
  const css = `
.sg26-bottom-bar{position:fixed;bottom:0;left:0;right:0;z-index:95;background:var(--glass-bg,rgba(255,255,255,.92));backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);border-top:1px solid var(--border,#e0e0e0);padding:8px 12px;display:flex;gap:8px;overflow-x:auto;scrollbar-width:none;-ms-overflow-style:none}
.sg26-bottom-bar::-webkit-scrollbar{display:none}
.sg26-bbtn{flex-shrink:0;display:flex;flex-direction:column;align-items:center;gap:3px;padding:6px 10px;border-radius:10px;border:1px solid var(--border,#e0e0e0);background:var(--card-bg,#fff);cursor:pointer;transition:all .2s;min-width:58px}
.sg26-bbtn:hover,.sg26-bbtn:active{background:var(--primary-light,#e8f5e9);border-color:var(--primary,#1a7a3a)}
.sg26-bbtn-icon{font-size:18px;line-height:1}
.sg26-bbtn-label{font-size:9px;font-weight:700;color:var(--text-muted,#666);white-space:nowrap}
.sg26-overlay{display:none;position:fixed;top:0;left:0;right:0;bottom:0;z-index:999;background:rgba(0,0,0,.55);overflow-y:auto;padding:20px;animation:sg26FadeIn .25s}
.sg26-overlay.active{display:flex;align-items:flex-start;justify-content:center}
@keyframes sg26FadeIn{from{opacity:0}to{opacity:1}}
.sg26-panel{background:var(--card-bg,#fff);border-radius:16px;max-width:580px;width:100%;margin:30px auto;box-shadow:0 8px 40px rgba(0,0,0,.3);overflow:hidden;animation:sg26SlideUp .3s}
@keyframes sg26SlideUp{from{transform:translateY(30px);opacity:0}to{transform:translateY(0);opacity:1}}
.sg26-panel-head{padding:16px 20px;color:#fff;display:flex;align-items:center;justify-content:space-between}
.sg26-panel-head h3{font-size:16px;font-weight:700;display:flex;align-items:center;gap:8px}
.sg26-panel-close{background:rgba(255,255,255,.25);border:none;color:#fff;width:30px;height:30px;border-radius:50%;cursor:pointer;font-size:16px}
.sg26-panel-body{padding:16px 20px;max-height:70vh;overflow-y:auto}
.sg26-card{background:var(--bg,#f5f7f5);border-radius:12px;padding:14px;margin-bottom:10px;border:1px solid var(--border,#e0e0e0);cursor:pointer;transition:all .2s}
.sg26-card:hover{box-shadow:0 2px 12px rgba(0,0,0,.1);transform:translateY(-1px)}
.sg26-card-title{font-weight:700;font-size:14px;color:var(--text,#1a1a1a);margin-bottom:4px;display:flex;align-items:center;gap:6px}
.sg26-card-desc{font-size:12px;color:var(--text-muted,#666);line-height:1.5}
.sg26-badge{display:inline-block;padding:2px 8px;border-radius:10px;font-size:10px;font-weight:700}
.sg26-badge-purple{background:#ede7f6;color:#6a1b9a}
.sg26-badge-green{background:#e8f5e9;color:#2e7d32}
.sg26-badge-blue{background:#e3f2fd;color:#1565c0}
.sg26-badge-orange{background:#fff3e0;color:#e65100}
.sg26-badge-red{background:#ffebee;color:#c62828}
.sg26-badge-teal{background:#e0f2f1;color:#00695c}
.sg26-tabs{display:flex;gap:4px;margin-bottom:12px;flex-wrap:wrap}
.sg26-tab{padding:6px 14px;border-radius:20px;border:1px solid var(--border,#e0e0e0);background:var(--bg,#f5f7f5);font-size:12px;cursor:pointer;font-weight:600;color:var(--text-muted,#666);transition:all .2s}
.sg26-tab.active{background:var(--primary,#1a7a3a);color:#fff;border-color:var(--primary,#1a7a3a)}
.sg26-input{width:100%;padding:10px 14px;border:2px solid var(--border,#e0e0e0);border-radius:10px;font-size:13px;background:var(--card-bg,#fff);color:var(--text,#1a1a1a);outline:none}
.sg26-input:focus{border-color:var(--primary,#1a7a3a)}
.sg26-btn{padding:10px 20px;border:none;border-radius:10px;font-size:13px;font-weight:700;cursor:pointer;transition:all .2s;display:inline-flex;align-items:center;gap:6px}
.sg26-btn-primary{background:var(--primary,#1a7a3a);color:#fff}
.sg26-btn-primary:hover{filter:brightness(1.1)}
.sg26-btn-secondary{background:var(--bg,#f5f7f5);color:var(--text,#1a1a1a);border:1px solid var(--border,#e0e0e0)}
.sg26-progress{height:8px;background:var(--border,#e0e0e0);border-radius:4px;overflow:hidden;margin:6px 0}
.sg26-progress-fill{height:100%;border-radius:4px;transition:width .5s ease}
.sg26-grid2{display:grid;grid-template-columns:1fr 1fr;gap:8px}
.sg26-grid3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px}
.sg26-stat{text-align:center;padding:10px;background:var(--bg,#f5f7f5);border-radius:10px}
.sg26-stat .v{font-size:20px;font-weight:800;color:var(--primary,#1a7a3a)}
.sg26-stat .l{font-size:10px;color:var(--text-muted,#666);margin-top:2px}
.sg26-check{display:flex;align-items:center;gap:10px;padding:10px;border-radius:10px;background:var(--bg,#f5f7f5);margin-bottom:6px;cursor:pointer;transition:all .2s;border:1px solid transparent}
.sg26-check.done{background:var(--primary-light,#e8f5e9);border-color:var(--primary,#1a7a3a)}
.sg26-check-box{width:22px;height:22px;border:2px solid var(--border,#e0e0e0);border-radius:6px;display:flex;align-items:center;justify-content:center;font-size:14px;flex-shrink:0;transition:all .2s}
.sg26-check.done .sg26-check-box{background:var(--primary,#1a7a3a);border-color:var(--primary,#1a7a3a);color:#fff}
.sg26-check-text{font-size:13px;color:var(--text,#1a1a1a)}
canvas.sg26-canvas{width:100%;border-radius:10px;background:var(--bg,#f5f7f5)}
.sg26-quiz-q{font-size:14px;font-weight:700;margin-bottom:12px;line-height:1.5;color:var(--text,#1a1a1a)}
.sg26-quiz-opt{padding:12px 16px;border:2px solid var(--border,#e0e0e0);border-radius:10px;margin-bottom:6px;cursor:pointer;font-size:13px;transition:all .2s;color:var(--text,#1a1a1a)}
.sg26-quiz-opt:hover{border-color:var(--primary,#1a7a3a);background:var(--primary-light,#e8f5e9)}
.sg26-quiz-opt.correct{border-color:#2e7d32;background:#e8f5e9;color:#2e7d32}
.sg26-quiz-opt.wrong{border-color:#c62828;background:#ffebee;color:#c62828}
.sg26-hole-map{position:relative;border-radius:12px;overflow:hidden;margin-bottom:12px}
.sg26-equip-row{display:flex;align-items:center;gap:10px;padding:10px 12px;border-radius:10px;background:var(--bg,#f5f7f5);margin-bottom:6px;border:1px solid var(--border,#e0e0e0)}
.sg26-equip-icon{font-size:20px;flex-shrink:0}
.sg26-equip-info{flex:1;min-width:0}
.sg26-equip-name{font-weight:700;font-size:13px;color:var(--text,#1a1a1a)}
.sg26-equip-meta{font-size:11px;color:var(--text-muted,#666)}
.sg26-equip-life{width:60px;height:6px;background:var(--border,#e0e0e0);border-radius:3px;overflow:hidden;flex-shrink:0}
.sg26-equip-life-fill{height:100%;border-radius:3px}
.sg26-bucket-item{display:flex;align-items:center;gap:10px;padding:12px;border-radius:10px;background:var(--bg,#f5f7f5);margin-bottom:8px;border:1px solid var(--border,#e0e0e0);transition:all .2s}
.sg26-bucket-item.visited{background:var(--primary-light,#e8f5e9);border-color:var(--primary,#1a7a3a)}
.sg26-bucket-star{font-size:22px;cursor:pointer;flex-shrink:0}
@media(max-width:600px){.sg26-panel{margin:10px;border-radius:12px}.sg26-grid2{grid-template-columns:1fr}.sg26-bottom-bar{padding:6px 8px;gap:6px}.sg26-bbtn{min-width:52px;padding:5px 8px}.sg26-bbtn-icon{font-size:16px}.sg26-bbtn-label{font-size:8px}}
`;
  const st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);

  // ========== SFX Engine ==========
  const AC = typeof AudioContext !== 'undefined' ? new (window.AudioContext || window.webkitAudioContext)() : null;
  function sfx(type) {
    if (!AC) return;
    try { if (AC.state === 'suspended') AC.resume(); } catch(e){}
    const o = AC.createOscillator();
    const g = AC.createGain();
    o.connect(g); g.connect(AC.destination);
    const presets = {
      strategy_open: [523.25, 'triangle', .12, .3],
      strategy_hole: [659.25, 'sine', .1, .2],
      planner_open: [440, 'triangle', .12, .3],
      planner_save: [783.99, 'sine', .15, .25],
      equip_open: [392, 'triangle', .1, .25],
      equip_add: [587.33, 'sine', .12, .2],
      stats_open: [523.25, 'sine', .12, .3],
      swing_check: [659.25, 'triangle', .1, .2],
      bucket_add: [783.99, 'sine', .15, .3],
      season_open: [440, 'triangle', .12, .25],
      walkthru_open: [523.25, 'triangle', .12, .3],
      quiz_v10: [880, 'sine', .1, .2]
    };
    const p = presets[type] || [523.25, 'sine', .1, .2];
    o.frequency.value = p[0]; o.type = p[1];
    g.gain.setValueAtTime(p[2], AC.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, AC.currentTime + p[3]);
    o.start(); o.stop(AC.currentTime + p[3]);
  }

  // ========== Overlay Helper ==========
  function makeOverlay(id, title, color, bodyHTML) {
    let el = document.getElementById(id);
    if (el) { el.querySelector('.sg26-panel-body').innerHTML = bodyHTML; return el; }
    el = document.createElement('div');
    el.id = id; el.className = 'sg26-overlay';
    el.innerHTML = `<div class="sg26-panel"><div class="sg26-panel-head" style="background:linear-gradient(135deg,${color})"><h3>${title}</h3><button class="sg26-panel-close" onclick="document.getElementById('${id}').classList.remove('active')">&times;</button></div><div class="sg26-panel-body">${bodyHTML}</div></div>`;
    el.addEventListener('click', e => { if (e.target === el) el.classList.remove('active'); });
    document.body.appendChild(el);
    return el;
  }

  // ========== 1. Course Strategy Guide (코스 공략 가이드 18홀) ==========
  SGV26.courseStrategy = {
    courses: [
      { name: '남서울CC', par: [4,3,5,4,4,3,4,5,4,4,3,5,4,4,3,4,5,4], total: 72,
        tips: ['드라이버 페어웨이 좌측 공략','7번아이언 핀 좌측','3우드 레이업 후 웨지','미들아이언 그린 센터','드라이버 우측 벙커 피해','8번아이언 숏핀 공략','하이브리드 그린 앞','3우드+웨지 투온 전략','미들아이언 안전하게','드라이버 좌측 독렉','9번아이언 핀 뒤쪽','롱아이언 레이업','5번아이언 그린 센터','드라이버 페어웨이 센터','PW 핀 공략','4번아이언 좌측','3우드 레이업 필수','미들아이언 파 세이브'] },
      { name: '파인크릭CC', par: [4,4,3,5,4,3,4,5,4,4,3,5,4,4,3,5,4,4], total: 72,
        tips: ['페어웨이 우측 공략 필수','드라이버 벙커 좌측 피해','6번아이언 그린 우측','레이업 후 숏게임','미들아이언 핀 공략','PW 정확도 우선','하이브리드 안전','3우드 레이업 워터','드라이버 독렉 컷','페어웨이 센터 안전','7번아이언 숏핀','롱아이언 그린 앞','5번아이언 투온 시도','드라이버 우측 페어웨이','9번아이언 핀 좌측','3우드+웨지 전략','미들아이언 센터','드라이버 파 세이브 목표'] },
      { name: '나인브릿지', par: [5,4,3,4,4,3,4,5,4,4,3,5,4,4,3,4,5,4], total: 72,
        tips: ['드라이버 넓은 페어웨이','미들아이언 그린 센터','9번아이언 워터 우측 주의','하이브리드 독렉 공략','드라이버 벙커 피해','PW 아일랜드 그린','5번아이언 안전 공략','레이업 필수 워터홀','웨지 업앤다운','드라이버 좌측 독렉','7번아이언 핀 공략','3우드 레이업 전략','미들아이언 센터','드라이버 페어웨이 우측','8번아이언 숏핀','하이브리드 그린 앞','3우드+웨지 투온','웨지 파 세이브'] }
    ],
    render: function() {
      let h = '<div class="sg26-tabs" id="sg26StratTabs"></div><div id="sg26StratBody"></div>';
      makeOverlay('sg26Strategy', '<span>&#9971;</span> 코스 공략 가이드', '#1b5e20,#388e3c', h);
      const tabs = document.getElementById('sg26StratTabs');
      tabs.innerHTML = this.courses.map((c, i) => `<div class="sg26-tab${i===0?' active':''}" data-idx="${i}">${c.name}</div>`).join('');
      tabs.addEventListener('click', e => {
        const idx = e.target.dataset.idx;
        if (idx === undefined) return;
        tabs.querySelectorAll('.sg26-tab').forEach(t => t.classList.remove('active'));
        e.target.classList.add('active');
        this.renderCourse(+idx);
      });
      this.renderCourse(0);
      sfx('strategy_open');
    },
    renderCourse: function(idx) {
      const c = this.courses[idx];
      const body = document.getElementById('sg26StratBody');
      let html = `<div style="text-align:center;margin-bottom:12px"><span class="sg26-badge sg26-badge-green">Par ${c.total}</span> <span class="sg26-badge sg26-badge-blue">18홀</span></div>`;
      html += `<canvas id="sg26StratCanvas" class="sg26-canvas" width="560" height="300"></canvas>`;
      html += '<div style="margin-top:12px">';
      for (let i = 0; i < 18; i++) {
        const half = i < 9 ? 'OUT' : 'IN';
        const num = i + 1;
        html += `<div class="sg26-card" onclick="this.querySelector('.sg26-card-desc').style.display=this.querySelector('.sg26-card-desc').style.display==='none'?'block':'none'">
          <div class="sg26-card-title"><span class="sg26-badge sg26-badge-${c.par[i]===3?'red':c.par[i]===4?'blue':'purple'}">Par ${c.par[i]}</span> ${half} #${num}</div>
          <div class="sg26-card-desc" style="display:none">&#9989; ${c.tips[i]}</div></div>`;
      }
      html += '</div>';
      body.innerHTML = html;
      this.drawCanvas(idx);
    },
    drawCanvas: function(idx) {
      const cv = document.getElementById('sg26StratCanvas');
      if (!cv) return;
      const ctx = cv.getContext('2d');
      const c = this.courses[idx];
      const W = cv.width, H = cv.height;
      ctx.clearRect(0, 0, W, H);
      const isDark = document.documentElement.dataset.theme === 'dark';
      ctx.fillStyle = isDark ? '#1e1e1e' : '#f5f7f5';
      ctx.fillRect(0, 0, W, H);
      const barW = (W - 60) / 18;
      const maxPar = 5;
      const colors = { 3: '#ef5350', 4: '#42a5f5', 5: '#ab47bc' };
      ctx.font = 'bold 11px sans-serif';
      ctx.textAlign = 'center';
      for (let i = 0; i < 18; i++) {
        const x = 30 + i * barW;
        const barH = (c.par[i] / maxPar) * (H - 80);
        const y = H - 40 - barH;
        const grad = ctx.createLinearGradient(x, y, x, H - 40);
        grad.addColorStop(0, colors[c.par[i]] || '#42a5f5');
        grad.addColorStop(1, isDark ? '#333' : '#e0e0e0');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.roundRect(x + 2, y, barW - 4, barH, 4);
        ctx.fill();
        ctx.fillStyle = isDark ? '#aaa' : '#666';
        ctx.fillText((i + 1).toString(), x + barW / 2, H - 26);
        ctx.fillStyle = '#fff';
        ctx.fillText('P' + c.par[i], x + barW / 2, y + 16);
      }
      ctx.fillStyle = isDark ? '#ccc' : '#333';
      ctx.font = 'bold 14px sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText(c.name + ' - Par ' + c.total, 30, 24);
      const outPar = c.par.slice(0, 9).reduce((a, b) => a + b, 0);
      const inPar = c.par.slice(9).reduce((a, b) => a + b, 0);
      ctx.font = '11px sans-serif';
      ctx.fillStyle = isDark ? '#999' : '#666';
      ctx.fillText('OUT: ' + outPar + '  |  IN: ' + inPar, 30, 42);
    }
  };

  // ========== 2. Round Planner (라운드 플래너 종합) ==========
  SGV26.roundPlanner = {
    render: function() {
      const saved = LS('round_plans') || [];
      let h = `<div style="margin-bottom:12px"><div class="sg26-btn sg26-btn-primary" id="sg26PlanNew">&#10010; 새 라운드 계획</div></div>`;
      h += '<div id="sg26PlanForm" style="display:none;margin-bottom:16px">';
      h += '<input class="sg26-input" id="sg26PlanDate" type="date" style="margin-bottom:6px">';
      h += '<input class="sg26-input" id="sg26PlanCourse" placeholder="골프장 이름" style="margin-bottom:6px">';
      h += '<input class="sg26-input" id="sg26PlanTime" placeholder="티타임 (예: 07:30)" style="margin-bottom:6px">';
      h += '<input class="sg26-input" id="sg26PlanBuddy" placeholder="동반자 (쉼표 구분)" style="margin-bottom:6px">';
      h += '<textarea class="sg26-input" id="sg26PlanMemo" placeholder="메모/준비물" rows="3" style="margin-bottom:8px;resize:vertical"></textarea>';
      h += '<div class="sg26-grid2"><div class="sg26-btn sg26-btn-primary" id="sg26PlanSave">&#128190; 저장</div><div class="sg26-btn sg26-btn-secondary" id="sg26PlanCancel">취소</div></div></div>';
      h += '<div style="font-weight:700;font-size:14px;margin-bottom:8px">&#128197; 예정 라운드 (' + saved.length + ')</div>';
      h += '<div id="sg26PlanList">';
      if (saved.length === 0) h += '<div style="text-align:center;padding:20px;color:var(--text-muted,#666)">등록된 라운드 계획이 없습니다</div>';
      saved.sort((a, b) => (a.date || '').localeCompare(b.date || '')).forEach((p, i) => {
        const dday = Math.ceil((new Date(p.date) - new Date()) / 86400000);
        const ddayText = dday > 0 ? 'D-' + dday : dday === 0 ? 'D-Day!' : 'D+' + Math.abs(dday);
        h += `<div class="sg26-card"><div class="sg26-card-title"><span class="sg26-badge sg26-badge-${dday>0?'blue':dday===0?'red':'teal'}">${ddayText}</span> ${p.course || '미정'}</div>
          <div class="sg26-card-desc">&#128197; ${p.date || '-'} &#9200; ${p.time || '-'} &#128101; ${p.buddy || '-'}<br>${p.memo ? '&#128221; ' + p.memo : ''}</div>
          <div style="margin-top:6px"><span class="sg26-btn sg26-btn-secondary" style="padding:4px 10px;font-size:11px" data-del="${i}">&#128465; 삭제</span></div></div>`;
      });
      h += '</div>';
      h += `<div style="margin-top:16px"><div style="font-weight:700;font-size:14px;margin-bottom:8px">&#9989; 라운드 준비물 체크리스트</div>`;
      const items = ['골프클럽세트','골프공(12개+)','티/마커','장갑(여분포함)','골프화','썬크림/모자','우비/우산','수건/물병','거리측정기','스코어카드/연필','간식/보충제','착용복장확인'];
      const checkedItems = LS('round_checklist') || {};
      items.forEach((item, i) => {
        h += `<div class="sg26-check${checkedItems[i]?' done':''}" data-ci="${i}"><div class="sg26-check-box">${checkedItems[i]?'&#10003;':''}</div><div class="sg26-check-text">${item}</div></div>`;
      });
      h += '</div>';
      makeOverlay('sg26Planner', '<span>&#128197;</span> 라운드 플래너', '#1565c0,#42a5f5', h);
      document.getElementById('sg26PlanNew').onclick = () => { document.getElementById('sg26PlanForm').style.display = 'block'; sfx('planner_open'); };
      document.getElementById('sg26PlanCancel').onclick = () => { document.getElementById('sg26PlanForm').style.display = 'none'; };
      document.getElementById('sg26PlanSave').onclick = () => {
        const plans = LS('round_plans') || [];
        plans.push({ date: document.getElementById('sg26PlanDate').value, course: document.getElementById('sg26PlanCourse').value, time: document.getElementById('sg26PlanTime').value, buddy: document.getElementById('sg26PlanBuddy').value, memo: document.getElementById('sg26PlanMemo').value });
        LS('round_plans', plans);
        sfx('planner_save');
        this.render();
        document.getElementById('sg26Planner').classList.add('active');
        checkAchievement('plan_first');
      };
      document.getElementById('sg26PlanList').addEventListener('click', e => {
        const di = e.target.dataset.del;
        if (di !== undefined) {
          const plans = LS('round_plans') || [];
          plans.splice(+di, 1);
          LS('round_plans', plans);
          this.render();
          document.getElementById('sg26Planner').classList.add('active');
        }
      });
      document.querySelectorAll('[data-ci]').forEach(el => {
        el.onclick = () => {
          const ci = +el.dataset.ci;
          const checked = LS('round_checklist') || {};
          checked[ci] = !checked[ci];
          LS('round_checklist', checked);
          el.classList.toggle('done');
          el.querySelector('.sg26-check-box').innerHTML = checked[ci] ? '&#10003;' : '';
        };
      });
      sfx('planner_open');
    }
  };

  // ========== 3. Equipment Inventory (장비 인벤토리 관리) ==========
  SGV26.equipment = {
    defaults: [
      { name: '드라이버', icon: '&#127948;', category: 'wood', maxLife: 80 },
      { name: '3번우드', icon: '&#127948;', category: 'wood', maxLife: 100 },
      { name: '5번우드', icon: '&#127948;', category: 'wood', maxLife: 100 },
      { name: '하이브리드', icon: '&#127948;', category: 'hybrid', maxLife: 100 },
      { name: '5번아이언', icon: '&#9971;', category: 'iron', maxLife: 120 },
      { name: '6번아이언', icon: '&#9971;', category: 'iron', maxLife: 120 },
      { name: '7번아이언', icon: '&#9971;', category: 'iron', maxLife: 120 },
      { name: '8번아이언', icon: '&#9971;', category: 'iron', maxLife: 120 },
      { name: '9번아이언', icon: '&#9971;', category: 'iron', maxLife: 120 },
      { name: 'PW', icon: '&#9971;', category: 'wedge', maxLife: 80 },
      { name: 'AW', icon: '&#9971;', category: 'wedge', maxLife: 80 },
      { name: 'SW', icon: '&#9971;', category: 'wedge', maxLife: 60 },
      { name: '퍼터', icon: '&#127947;', category: 'putter', maxLife: 200 },
      { name: '골프공', icon: '&#9898;', category: 'ball', maxLife: 5 }
    ],
    render: function() {
      const inv = LS('equipment') || this.defaults.map(d => ({ ...d, rounds: 0, purchaseDate: '' }));
      let h = '<div class="sg26-tabs" id="sg26EquipTabs"><div class="sg26-tab active" data-cat="all">전체</div><div class="sg26-tab" data-cat="wood">우드</div><div class="sg26-tab" data-cat="iron">아이언</div><div class="sg26-tab" data-cat="wedge">웨지</div><div class="sg26-tab" data-cat="putter">퍼터</div></div>';
      h += '<div id="sg26EquipList"></div>';
      h += `<div style="margin-top:12px"><div class="sg26-btn sg26-btn-primary" id="sg26EquipRound">&#9971; 라운드 1회 기록 (+전체 사용횟수)</div></div>`;
      h += `<div style="margin-top:8px"><div class="sg26-btn sg26-btn-secondary" id="sg26EquipReset">&#128260; 초기화</div></div>`;
      h += `<canvas id="sg26EquipCanvas" class="sg26-canvas" width="560" height="260" style="margin-top:12px"></canvas>`;
      makeOverlay('sg26Equip', '<span>&#127890;</span> 장비 인벤토리', '#37474f,#78909c', h);
      const renderList = (cat) => {
        const list = document.getElementById('sg26EquipList');
        const filtered = cat === 'all' ? inv : inv.filter(e => e.category === cat);
        list.innerHTML = filtered.map((e, i) => {
          const lifePercent = Math.max(0, Math.min(100, ((e.maxLife - e.rounds) / e.maxLife) * 100));
          const color = lifePercent > 60 ? '#2e7d32' : lifePercent > 30 ? '#f57f17' : '#c62828';
          return `<div class="sg26-equip-row"><div class="sg26-equip-icon">${e.icon}</div><div class="sg26-equip-info"><div class="sg26-equip-name">${e.name}</div><div class="sg26-equip-meta">${e.rounds}/${e.maxLife}R 사용</div></div><div class="sg26-equip-life"><div class="sg26-equip-life-fill" style="width:${lifePercent}%;background:${color}"></div></div></div>`;
        }).join('');
      };
      renderList('all');
      this.drawCanvas(inv);
      document.getElementById('sg26EquipTabs').addEventListener('click', e => {
        const cat = e.target.dataset.cat;
        if (!cat) return;
        document.querySelectorAll('#sg26EquipTabs .sg26-tab').forEach(t => t.classList.remove('active'));
        e.target.classList.add('active');
        renderList(cat);
      });
      document.getElementById('sg26EquipRound').onclick = () => {
        inv.forEach(e => e.rounds++);
        LS('equipment', inv);
        renderList('all');
        this.drawCanvas(inv);
        sfx('equip_add');
        checkAchievement('equip_round');
      };
      document.getElementById('sg26EquipReset').onclick = () => {
        LS('equipment', null);
        this.render();
        document.getElementById('sg26Equip').classList.add('active');
      };
      sfx('equip_open');
    },
    drawCanvas: function(inv) {
      const cv = document.getElementById('sg26EquipCanvas');
      if (!cv) return;
      const ctx = cv.getContext('2d');
      const W = cv.width, H = cv.height;
      ctx.clearRect(0, 0, W, H);
      const isDark = document.documentElement.dataset.theme === 'dark';
      ctx.fillStyle = isDark ? '#1e1e1e' : '#f5f7f5';
      ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = isDark ? '#ccc' : '#333';
      ctx.font = 'bold 13px sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText('장비 수명 현황', 20, 24);
      const barW = (W - 60) / inv.length;
      for (let i = 0; i < inv.length; i++) {
        const e = inv[i];
        const lifePercent = Math.max(0, Math.min(100, ((e.maxLife - e.rounds) / e.maxLife) * 100));
        const barH = (lifePercent / 100) * (H - 70);
        const x = 30 + i * barW;
        const y = H - 30 - barH;
        const color = lifePercent > 60 ? '#2e7d32' : lifePercent > 30 ? '#f57f17' : '#c62828';
        const grad = ctx.createLinearGradient(x, y, x, H - 30);
        grad.addColorStop(0, color);
        grad.addColorStop(1, isDark ? '#333' : '#e0e0e0');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.roundRect(x + 1, y, barW - 2, barH, 3);
        ctx.fill();
        ctx.save();
        ctx.translate(x + barW / 2, H - 18);
        ctx.rotate(-Math.PI / 4);
        ctx.fillStyle = isDark ? '#aaa' : '#666';
        ctx.font = '9px sans-serif';
        ctx.textAlign = 'right';
        ctx.fillText(e.name, 0, 0);
        ctx.restore();
      }
    }
  };

  // ========== 4. Golf Statistics Master (골프 통계 마스터 Canvas) ==========
  SGV26.statsMaster = {
    render: function() {
      const rounds = LS('stat_rounds') || [];
      let h = `<div style="margin-bottom:12px"><div class="sg26-btn sg26-btn-primary" id="sg26StatsAdd">&#10010; 라운드 기록 추가</div></div>`;
      h += '<div id="sg26StatsForm" style="display:none;margin-bottom:16px">';
      h += '<div class="sg26-grid2" style="margin-bottom:6px"><input class="sg26-input" id="sg26StScore" type="number" placeholder="총 스코어"><input class="sg26-input" id="sg26StPutts" type="number" placeholder="총 퍼트수"></div>';
      h += '<div class="sg26-grid3" style="margin-bottom:6px"><input class="sg26-input" id="sg26StFIR" type="number" placeholder="FIR(14)"><input class="sg26-input" id="sg26StGIR" type="number" placeholder="GIR(18)"><input class="sg26-input" id="sg26StPenalty" type="number" placeholder="벌타수"></div>';
      h += '<div class="sg26-grid2"><div class="sg26-btn sg26-btn-primary" id="sg26StSave">&#128190; 저장</div><div class="sg26-btn sg26-btn-secondary" id="sg26StCancel">취소</div></div></div>';
      h += `<canvas id="sg26StatsCanvas" class="sg26-canvas" width="560" height="340"></canvas>`;
      h += '<div style="margin-top:12px" id="sg26StatsInfo"></div>';
      makeOverlay('sg26Stats', '<span>&#128202;</span> 골프 통계 마스터', '#0d47a1,#1976d2', h);
      document.getElementById('sg26StatsAdd').onclick = () => { document.getElementById('sg26StatsForm').style.display = 'block'; sfx('stats_open'); };
      document.getElementById('sg26StCancel').onclick = () => { document.getElementById('sg26StatsForm').style.display = 'none'; };
      document.getElementById('sg26StSave').onclick = () => {
        const r = {
          score: +document.getElementById('sg26StScore').value || 0,
          putts: +document.getElementById('sg26StPutts').value || 0,
          fir: +document.getElementById('sg26StFIR').value || 0,
          gir: +document.getElementById('sg26StGIR').value || 0,
          penalty: +document.getElementById('sg26StPenalty').value || 0,
          date: new Date().toISOString().slice(0, 10)
        };
        const rds = LS('stat_rounds') || [];
        rds.push(r);
        if (rds.length > 50) rds.shift();
        LS('stat_rounds', rds);
        sfx('stats_open');
        this.render();
        document.getElementById('sg26Stats').classList.add('active');
        checkAchievement('stats_first');
        if (rds.length >= 10) checkAchievement('stats_10');
      };
      this.drawCanvas(rounds);
      this.renderInfo(rounds);
      sfx('stats_open');
    },
    renderInfo: function(rounds) {
      const el = document.getElementById('sg26StatsInfo');
      if (!el) return;
      if (rounds.length === 0) { el.innerHTML = '<div style="text-align:center;padding:16px;color:var(--text-muted)">라운드를 기록하면 통계가 표시됩니다</div>'; return; }
      const avg = (arr) => arr.length ? (arr.reduce((a, b) => a + b, 0) / arr.length).toFixed(1) : '-';
      const best = (arr) => arr.length ? Math.min(...arr) : '-';
      el.innerHTML = `<div class="sg26-grid3"><div class="sg26-stat"><div class="v">${avg(rounds.map(r=>r.score))}</div><div class="l">평균 스코어</div></div><div class="sg26-stat"><div class="v">${best(rounds.map(r=>r.score))}</div><div class="l">베스트</div></div><div class="sg26-stat"><div class="v">${avg(rounds.map(r=>r.putts))}</div><div class="l">평균 퍼트</div></div></div>
      <div class="sg26-grid3" style="margin-top:8px"><div class="sg26-stat"><div class="v">${avg(rounds.map(r=>(r.fir/14*100)))}</div><div class="l">FIR%</div></div><div class="sg26-stat"><div class="v">${avg(rounds.map(r=>(r.gir/18*100)))}</div><div class="l">GIR%</div></div><div class="sg26-stat"><div class="v">${avg(rounds.map(r=>r.penalty))}</div><div class="l">평균 벌타</div></div></div>`;
    },
    drawCanvas: function(rounds) {
      const cv = document.getElementById('sg26StatsCanvas');
      if (!cv) return;
      const ctx = cv.getContext('2d');
      const W = cv.width, H = cv.height;
      ctx.clearRect(0, 0, W, H);
      const isDark = document.documentElement.dataset.theme === 'dark';
      ctx.fillStyle = isDark ? '#1e1e1e' : '#f5f7f5';
      ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = isDark ? '#ccc' : '#333';
      ctx.font = 'bold 13px sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText('스코어 추이 (최근 20라운드)', 20, 24);
      if (rounds.length === 0) {
        ctx.fillStyle = isDark ? '#666' : '#999';
        ctx.font = '14px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('라운드 데이터를 추가하면 그래프가 표시됩니다', W / 2, H / 2);
        return;
      }
      const data = rounds.slice(-20);
      const scores = data.map(r => r.score);
      const minS = Math.min(...scores) - 5;
      const maxS = Math.max(...scores) + 5;
      const range = maxS - minS || 1;
      const graphX = 50, graphY = 50, graphW = W - 70, graphH = H - 90;
      ctx.strokeStyle = isDark ? '#444' : '#ddd';
      ctx.lineWidth = 1;
      for (let i = 0; i <= 4; i++) {
        const y = graphY + (graphH / 4) * i;
        ctx.beginPath(); ctx.moveTo(graphX, y); ctx.lineTo(graphX + graphW, y); ctx.stroke();
        ctx.fillStyle = isDark ? '#999' : '#666';
        ctx.font = '10px sans-serif';
        ctx.textAlign = 'right';
        ctx.fillText(Math.round(maxS - (range / 4) * i).toString(), graphX - 6, y + 4);
      }
      const grad = ctx.createLinearGradient(0, graphY, 0, graphY + graphH);
      grad.addColorStop(0, 'rgba(26,122,58,0.3)');
      grad.addColorStop(1, 'rgba(26,122,58,0.02)');
      ctx.beginPath();
      ctx.moveTo(graphX, graphY + graphH);
      for (let i = 0; i < data.length; i++) {
        const x = graphX + (graphW / (data.length - 1 || 1)) * i;
        const y = graphY + graphH - ((scores[i] - minS) / range) * graphH;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(graphX + graphW, graphY + graphH);
      ctx.closePath();
      ctx.fillStyle = grad;
      ctx.fill();
      ctx.beginPath();
      ctx.strokeStyle = '#1a7a3a';
      ctx.lineWidth = 2.5;
      for (let i = 0; i < data.length; i++) {
        const x = graphX + (graphW / (data.length - 1 || 1)) * i;
        const y = graphY + graphH - ((scores[i] - minS) / range) * graphH;
        if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.stroke();
      for (let i = 0; i < data.length; i++) {
        const x = graphX + (graphW / (data.length - 1 || 1)) * i;
        const y = graphY + graphH - ((scores[i] - minS) / range) * graphH;
        ctx.fillStyle = '#fff';
        ctx.beginPath(); ctx.arc(x, y, 4, 0, Math.PI * 2); ctx.fill();
        ctx.strokeStyle = '#1a7a3a'; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.arc(x, y, 4, 0, Math.PI * 2); ctx.stroke();
        ctx.fillStyle = isDark ? '#ccc' : '#333';
        ctx.font = '9px sans-serif'; ctx.textAlign = 'center';
        ctx.fillText(scores[i].toString(), x, y - 10);
      }
      const avgScore = scores.reduce((a, b) => a + b, 0) / scores.length;
      const avgY = graphY + graphH - ((avgScore - minS) / range) * graphH;
      ctx.setLineDash([5, 4]);
      ctx.strokeStyle = '#ff6b35';
      ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.moveTo(graphX, avgY); ctx.lineTo(graphX + graphW, avgY); ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = '#ff6b35';
      ctx.font = '10px sans-serif'; ctx.textAlign = 'left';
      ctx.fillText('AVG ' + avgScore.toFixed(1), graphX + graphW + 4, avgY + 4);
    }
  };

  // ========== 5. AI Swing Diagnosis (AI 스윙 진단 체크리스트) ==========
  SGV26.swingDiag = {
    phases: [
      { name: '어드레스', items: ['발 어깨 너비로 벌림','무릎 살짝 구부림','척추각도 30도 유지','양팔 자연스럽게 내림','그립 압력 4/10','타겟 정렬 확인','볼 위치 적절','체중 양발 균등'] },
      { name: '테이크백', items: ['원피스 테이크백','왼팔 일직선 유지','오른무릎 고정','어깨 90도 회전','클럽헤드 지면과 평행','체중 오른발 이동','손목 코킹 시작','머리 고정'] },
      { name: '탑스윙', items: ['왼어깨 턱 아래','오른팔꿈치 90도','클럽 타겟 향함','하체 안정','체중 오른발 80%','왼손목 평평','충분한 어깨 회전','오버스윙 방지'] },
      { name: '다운스윙', items: ['하체 먼저 시작','체중 왼발 이동','지연 릴리즈','팔꿈치 몸 가까이','힙 회전 시작','오른어깨 내려감','타겟 응시','인투아웃 경로'] },
      { name: '임팩트', items: ['손 볼 앞에 위치','체중 왼발 70%','오른발 뒤꿈치 들림','머리 볼 뒤','압축 임팩트','스퀘어 페이스','쓸어치기 금지','풀 익스텐션'] },
      { name: '팔로스루', items: ['양팔 풀 익스텐션','벨트버클 타겟 향함','오른발 발끝','체중 왼발 90%','높은 피니시','균형 유지 3초','자연스러운 마무리','클럽 어깨 감김'] }
    ],
    render: function() {
      const saved = LS('swing_diag') || {};
      let h = `<div style="text-align:center;margin-bottom:12px"><span class="sg26-badge sg26-badge-green">6단계 48항목</span></div>`;
      h += '<div class="sg26-tabs" id="sg26SwingTabs"></div><div id="sg26SwingBody"></div>';
      h += `<canvas id="sg26SwingCanvas" class="sg26-canvas" width="560" height="300" style="margin-top:12px"></canvas>`;
      makeOverlay('sg26Swing', '<span>&#127947;</span> AI 스윙 진단', '#4a148c,#7b1fa2', h);
      const tabs = document.getElementById('sg26SwingTabs');
      tabs.innerHTML = this.phases.map((p, i) => `<div class="sg26-tab${i===0?' active':''}" data-idx="${i}">${p.name}</div>`).join('');
      tabs.addEventListener('click', e => {
        const idx = e.target.dataset.idx;
        if (idx === undefined) return;
        tabs.querySelectorAll('.sg26-tab').forEach(t => t.classList.remove('active'));
        e.target.classList.add('active');
        this.renderPhase(+idx);
      });
      this.renderPhase(0);
      this.drawRadar();
      sfx('swing_check');
    },
    renderPhase: function(idx) {
      const phase = this.phases[idx];
      const saved = LS('swing_diag') || {};
      const body = document.getElementById('sg26SwingBody');
      const total = phase.items.length;
      const done = phase.items.filter((_, i) => saved[idx + '_' + i]).length;
      let html = `<div style="margin-bottom:8px"><div class="sg26-progress"><div class="sg26-progress-fill" style="width:${(done/total*100)}%;background:#7b1fa2"></div></div><div style="font-size:11px;color:var(--text-muted);text-align:right">${done}/${total} 완료</div></div>`;
      phase.items.forEach((item, i) => {
        const key = idx + '_' + i;
        html += `<div class="sg26-check${saved[key]?' done':''}" data-sk="${key}"><div class="sg26-check-box">${saved[key]?'&#10003;':''}</div><div class="sg26-check-text">${item}</div></div>`;
      });
      body.innerHTML = html;
      body.querySelectorAll('[data-sk]').forEach(el => {
        el.onclick = () => {
          const key = el.dataset.sk;
          const s = LS('swing_diag') || {};
          s[key] = !s[key];
          LS('swing_diag', s);
          el.classList.toggle('done');
          el.querySelector('.sg26-check-box').innerHTML = s[key] ? '&#10003;' : '';
          sfx('swing_check');
          this.drawRadar();
          const allDone = this.phases.every((p, pi) => p.items.every((_, ii) => s[pi + '_' + ii]));
          if (allDone) checkAchievement('swing_master');
        };
      });
    },
    drawRadar: function() {
      const cv = document.getElementById('sg26SwingCanvas');
      if (!cv) return;
      const ctx = cv.getContext('2d');
      const W = cv.width, H = cv.height;
      ctx.clearRect(0, 0, W, H);
      const isDark = document.documentElement.dataset.theme === 'dark';
      ctx.fillStyle = isDark ? '#1e1e1e' : '#f5f7f5';
      ctx.fillRect(0, 0, W, H);
      const cx = W / 2, cy = H / 2 + 10, R = 110;
      const saved = LS('swing_diag') || {};
      const n = this.phases.length;
      const scores = this.phases.map((p, pi) => {
        const done = p.items.filter((_, ii) => saved[pi + '_' + ii]).length;
        return done / p.items.length;
      });
      for (let ring = 1; ring <= 4; ring++) {
        const r = R * ring / 4;
        ctx.beginPath();
        for (let i = 0; i <= n; i++) {
          const angle = (Math.PI * 2 / n) * i - Math.PI / 2;
          const x = cx + Math.cos(angle) * r;
          const y = cy + Math.sin(angle) * r;
          if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.strokeStyle = isDark ? '#444' : '#ddd';
        ctx.lineWidth = 1;
        ctx.stroke();
      }
      for (let i = 0; i < n; i++) {
        const angle = (Math.PI * 2 / n) * i - Math.PI / 2;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + Math.cos(angle) * R, cy + Math.sin(angle) * R);
        ctx.strokeStyle = isDark ? '#444' : '#ddd';
        ctx.stroke();
        const lx = cx + Math.cos(angle) * (R + 20);
        const ly = cy + Math.sin(angle) * (R + 20);
        ctx.fillStyle = isDark ? '#ccc' : '#333';
        ctx.font = 'bold 11px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(this.phases[i].name, lx, ly + 4);
      }
      ctx.beginPath();
      for (let i = 0; i <= n; i++) {
        const idx = i % n;
        const angle = (Math.PI * 2 / n) * idx - Math.PI / 2;
        const r = R * scores[idx];
        const x = cx + Math.cos(angle) * r;
        const y = cy + Math.sin(angle) * r;
        if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.fillStyle = 'rgba(123,31,162,0.25)';
      ctx.fill();
      ctx.strokeStyle = '#7b1fa2';
      ctx.lineWidth = 2.5;
      ctx.stroke();
      for (let i = 0; i < n; i++) {
        const angle = (Math.PI * 2 / n) * i - Math.PI / 2;
        const r = R * scores[i];
        ctx.fillStyle = '#fff';
        ctx.beginPath(); ctx.arc(cx + Math.cos(angle) * r, cy + Math.sin(angle) * r, 4, 0, Math.PI * 2); ctx.fill();
        ctx.strokeStyle = '#7b1fa2'; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.arc(cx + Math.cos(angle) * r, cy + Math.sin(angle) * r, 4, 0, Math.PI * 2); ctx.stroke();
      }
    }
  };

  // ========== 6. Course Bucket List (코스 버킷리스트) ==========
  SGV26.bucketList = {
    famous: [
      { name: '나인브릿지 (제주)', region: '제주', difficulty: 5, rating: 4.9 },
      { name: '핀크스 GC (제주)', region: '제주', difficulty: 4, rating: 4.8 },
      { name: '헤슬리나인브릿지 (여주)', region: '경기', difficulty: 5, rating: 4.7 },
      { name: '남서울CC (성남)', region: '경기', difficulty: 4, rating: 4.6 },
      { name: '안양CC (안양)', region: '경기', difficulty: 4, rating: 4.5 },
      { name: '한양CC (경기)', region: '경기', difficulty: 3, rating: 4.4 },
      { name: '레이크사이드CC (용인)', region: '경기', difficulty: 4, rating: 4.5 },
      { name: '사이프러스CC (경주)', region: '경북', difficulty: 4, rating: 4.4 },
      { name: '블랙스톤CC (가평)', region: '경기', difficulty: 5, rating: 4.6 },
      { name: '클럽나인브릿지 (여주)', region: '경기', difficulty: 5, rating: 4.7 },
      { name: '오크밸리CC (원주)', region: '강원', difficulty: 3, rating: 4.3 },
      { name: '무주덕유산CC (무주)', region: '전북', difficulty: 3, rating: 4.2 },
      { name: '라비에벨CC (태안)', region: '충남', difficulty: 4, rating: 4.3 },
      { name: '곤지암CC (광주)', region: '경기', difficulty: 3, rating: 4.1 },
      { name: '제이드팰리스CC (춘천)', region: '강원', difficulty: 4, rating: 4.4 },
      { name: '아시아나CC (화성)', region: '경기', difficulty: 4, rating: 4.3 },
      { name: '포천힐스CC (포천)', region: '경기', difficulty: 3, rating: 4.0 },
      { name: '보성CC (보성)', region: '전남', difficulty: 3, rating: 4.1 },
      { name: '캐슬파인CC (경주)', region: '경북', difficulty: 5, rating: 4.5 },
      { name: '더클래식CC (평택)', region: '경기', difficulty: 4, rating: 4.2 }
    ],
    render: function() {
      const visited = LS('bucket_visited') || {};
      const custom = LS('bucket_custom') || [];
      const allCourses = [...this.famous, ...custom.map(c => ({ name: c, region: '사용자', difficulty: 3, rating: 0 }))];
      const visitCount = Object.keys(visited).filter(k => visited[k]).length;
      let h = `<div class="sg26-grid3" style="margin-bottom:12px"><div class="sg26-stat"><div class="v">${visitCount}</div><div class="l">방문 완료</div></div><div class="sg26-stat"><div class="v">${allCourses.length - visitCount}</div><div class="l">미방문</div></div><div class="sg26-stat"><div class="v">${Math.round(visitCount/allCourses.length*100)}%</div><div class="l">달성률</div></div></div>`;
      h += '<div class="sg26-progress"><div class="sg26-progress-fill" style="width:' + (visitCount / allCourses.length * 100) + '%;background:linear-gradient(90deg,#1a7a3a,#66bb6a)"></div></div>';
      h += `<div style="margin:12px 0"><div class="sg26-grid2"><input class="sg26-input" id="sg26BucketNew" placeholder="코스 직접 추가"><div class="sg26-btn sg26-btn-primary" id="sg26BucketAdd">&#10010; 추가</div></div></div>`;
      h += '<div id="sg26BucketItems">';
      allCourses.forEach((c, i) => {
        const key = c.name;
        const v = visited[key];
        const stars = '&#11088;'.repeat(c.difficulty);
        h += `<div class="sg26-bucket-item${v?' visited':''}"><div class="sg26-bucket-star" data-bk="${key}">${v?'&#10004;':'&#9898;'}</div><div style="flex:1"><div style="font-weight:700;font-size:13px;color:var(--text,#1a1a1a)">${c.name}</div><div style="font-size:11px;color:var(--text-muted,#666)">${c.region} | 난이도: ${stars}${c.rating?' | &#11088;'+c.rating:''}</div></div></div>`;
      });
      h += '</div>';
      makeOverlay('sg26Bucket', '<span>&#127951;</span> 코스 버킷리스트', '#e65100,#ff9800', h);
      document.getElementById('sg26BucketAdd').onclick = () => {
        const val = document.getElementById('sg26BucketNew').value.trim();
        if (!val) return;
        const cst = LS('bucket_custom') || [];
        cst.push(val);
        LS('bucket_custom', cst);
        sfx('bucket_add');
        this.render();
        document.getElementById('sg26Bucket').classList.add('active');
      };
      document.querySelectorAll('[data-bk]').forEach(el => {
        el.onclick = () => {
          const key = el.dataset.bk;
          const v = LS('bucket_visited') || {};
          v[key] = !v[key];
          LS('bucket_visited', v);
          sfx('bucket_add');
          this.render();
          document.getElementById('sg26Bucket').classList.add('active');
          const vc = Object.keys(v).filter(k => v[k]).length;
          if (vc >= 1) checkAchievement('bucket_first');
          if (vc >= 10) checkAchievement('bucket_10');
          if (vc >= 20) checkAchievement('bucket_master');
        };
      });
      sfx('bucket_add');
    }
  };

  // ========== 7. Season Planner (시즌 플래너 월별 목표) ==========
  SGV26.seasonPlanner = {
    render: function() {
      const goals = LS('season_goals') || {};
      const months = ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'];
      const currentMonth = new Date().getMonth();
      let h = '<div style="margin-bottom:12px;text-align:center"><span class="sg26-badge sg26-badge-green">2026 시즌</span></div>';
      h += '<div id="sg26SeasonGrid">';
      months.forEach((m, i) => {
        const g = goals[i] || { rounds: 0, targetScore: 0, targetRounds: 0, note: '' };
        const isCurrent = i === currentMonth;
        h += `<div class="sg26-card" style="${isCurrent?'border-color:var(--primary,#1a7a3a);border-width:2px':''}">
          <div class="sg26-card-title">${isCurrent?'&#128994; ':''}${m} ${isCurrent?'(현재)':''}</div>
          <div style="font-size:12px;color:var(--text-muted);margin-bottom:6px">목표: ${g.targetRounds||'-'}R / 목표스코어: ${g.targetScore||'-'}</div>
          <div class="sg26-grid2" style="margin-bottom:4px">
            <input class="sg26-input" style="padding:6px 8px;font-size:11px" placeholder="목표 라운드수" type="number" data-mi="${i}" data-field="targetRounds" value="${g.targetRounds||''}">
            <input class="sg26-input" style="padding:6px 8px;font-size:11px" placeholder="목표 스코어" type="number" data-mi="${i}" data-field="targetScore" value="${g.targetScore||''}">
          </div>
          <input class="sg26-input" style="padding:6px 8px;font-size:11px" placeholder="메모" data-mi="${i}" data-field="note" value="${g.note||''}">
        </div>`;
      });
      h += '</div>';
      h += '<div style="margin-top:12px;text-align:center"><div class="sg26-btn sg26-btn-primary" id="sg26SeasonSave">&#128190; 목표 저장</div></div>';
      makeOverlay('sg26Season', '<span>&#127793;</span> 시즌 플래너', '#2e7d32,#66bb6a', h);
      document.getElementById('sg26SeasonSave').onclick = () => {
        const g = {};
        document.querySelectorAll('[data-mi]').forEach(el => {
          const mi = el.dataset.mi;
          const field = el.dataset.field;
          if (!g[mi]) g[mi] = {};
          g[mi][field] = field === 'note' ? el.value : (+el.value || 0);
        });
        LS('season_goals', g);
        sfx('season_open');
        checkAchievement('season_set');
      };
      sfx('season_open');
    }
  };

  // ========== 8. 18-Hole Walkthrough Canvas (18홀 워크스루) ==========
  SGV26.walkthrough = {
    holes: [
      { par: 4, yards: 385, desc: '직선 페어웨이, 좌측 벙커 주의', tip: '드라이버 센터 후 미들아이언' },
      { par: 3, yards: 165, desc: '아일랜드 그린, 바람 영향 큼', tip: '한 클럽 크게, 그린 센터 공략' },
      { par: 5, yards: 530, desc: '좌 독렉, 워터 해저드', tip: '3우드 레이업 후 웨지 투온' },
      { par: 4, yards: 410, desc: '우측 OB, 좁은 페어웨이', tip: '3우드 안전, 미들아이언 GIR' },
      { par: 4, yards: 370, desc: '내리막 티샷, 벙커 군집', tip: '드라이버 벙커 넘김, 숏아이언' },
      { par: 3, yards: 190, desc: '긴 파3, 전면 벙커', tip: '하이브리드 or 롱아이언, 높은 탄도' },
      { par: 4, yards: 395, desc: '오르막, 그린 2단', tip: '드라이버 풀파워, 핀 위치 확인' },
      { par: 5, yards: 555, desc: '서펜타인 페어웨이', tip: '레이업 안전, 3타 온그린 전략' },
      { par: 4, yards: 425, desc: '시그니처 홀, 워터 좌측', tip: '드라이버 우측 공략, 인투인' },
      { par: 4, yards: 400, desc: '평탄, 넓은 페어웨이', tip: '드라이버 센터, 공격적 플레이' },
      { par: 3, yards: 175, desc: '단타 그린, 핀 좌측 경사', tip: '7번아이언 핀 우측 세이프' },
      { par: 5, yards: 545, desc: '좌측 크릭, 우측 수림', tip: '페어웨이 센터 유지, 3온 전략' },
      { par: 4, yards: 380, desc: '독렉 좌, 벙커 우', tip: '3우드 독렉 코너, 웨지 공략' },
      { par: 4, yards: 415, desc: '오르막 긴 파4', tip: '드라이버+롱아이언, 보기 OK' },
      { par: 3, yards: 155, desc: '숏파3, 벙커 둘러싸인 그린', tip: 'PW 정확히, 핀 공략' },
      { par: 4, yards: 390, desc: '내리막 좌독렉', tip: '3우드 페이드, 숏아이언 핀' },
      { par: 5, yards: 520, desc: '이글 가능, 넓은 페어웨이', tip: '드라이버+3우드 투온 시도' },
      { par: 4, yards: 440, desc: '클로징 홀, 워터+벙커', tip: '안전하게 보기, 파 세이브' }
    ],
    render: function() {
      let h = `<canvas id="sg26WalkCanvas" class="sg26-canvas" width="560" height="320"></canvas>`;
      h += '<div style="margin-top:12px" id="sg26WalkList">';
      this.holes.forEach((hole, i) => {
        const colors = { 3: 'red', 4: 'blue', 5: 'purple' };
        h += `<div class="sg26-card"><div class="sg26-card-title"><span class="sg26-badge sg26-badge-${colors[hole.par]}">Par ${hole.par}</span> #${i+1} (${hole.yards}yd)</div><div class="sg26-card-desc">${hole.desc}<br>&#128161; <strong>${hole.tip}</strong></div></div>`;
      });
      h += '</div>';
      makeOverlay('sg26Walk', '<span>&#128694;</span> 18홀 워크스루', '#006064,#00897b', h);
      this.drawCanvas();
      sfx('walkthru_open');
    },
    drawCanvas: function() {
      const cv = document.getElementById('sg26WalkCanvas');
      if (!cv) return;
      const ctx = cv.getContext('2d');
      const W = cv.width, H = cv.height;
      ctx.clearRect(0, 0, W, H);
      const isDark = document.documentElement.dataset.theme === 'dark';
      ctx.fillStyle = isDark ? '#1e1e1e' : '#f5f7f5';
      ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = isDark ? '#ccc' : '#333';
      ctx.font = 'bold 13px sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText('18홀 코스 프로필', 20, 24);
      const barW = (W - 60) / 18;
      const maxYd = 560;
      const parColors = { 3: '#ef5350', 4: '#42a5f5', 5: '#ab47bc' };
      for (let i = 0; i < 18; i++) {
        const h = this.holes[i];
        const barH = (h.yards / maxYd) * (H - 70);
        const x = 30 + i * barW;
        const y = H - 30 - barH;
        const grad = ctx.createLinearGradient(x, y, x, H - 30);
        grad.addColorStop(0, parColors[h.par]);
        grad.addColorStop(1, isDark ? '#333' : '#eee');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.roundRect(x + 1, y, barW - 2, barH, 3);
        ctx.fill();
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 9px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(h.yards + '', x + barW / 2, y + 14);
        ctx.fillStyle = isDark ? '#aaa' : '#555';
        ctx.font = '9px sans-serif';
        ctx.fillText('#' + (i + 1), x + barW / 2, H - 18);
      }
      const totalPar = this.holes.reduce((a, h) => a + h.par, 0);
      const totalYards = this.holes.reduce((a, h) => a + h.yards, 0);
      ctx.fillStyle = isDark ? '#999' : '#666';
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText('Par ' + totalPar + ' | ' + totalYards + 'yd', W - 20, 24);
    }
  };

  // ========== 9. Golf IQ v10 Quiz (15 Questions) ==========
  SGV26.quizV10 = {
    questions: [
      { q: '코스 레이팅(Course Rating)이란?', a: ['스크래치 골퍼의 예상 평균 스코어','프로 골퍼의 최저 스코어','코스의 총 거리','그린의 경사도'], c: 0 },
      { q: '벤 호건의 &quot;5대 레슨&quot;에 포함되지 않는 것은?', a: ['그립','백스윙','다운스윙','칩샷'], c: 3 },
      { q: '스테이블포드 점수 체계에서 보기(Bogey)는 몇 점?', a: ['0점','1점','2점','3점'], c: 1 },
      { q: 'USGA 핸디캡 계산 시 최근 몇 라운드의 디퍼런셜을 사용?', a: ['10라운드','15라운드','20라운드','25라운드'], c: 2 },
      { q: '타이거 우즈가 최초로 마스터즈를 우승한 해는?', a: ['1995','1996','1997','1998'], c: 2 },
      { q: '골프에서 &quot;도그렉(Dogleg)&quot;의 의미는?', a: ['페어웨이가 꺾이는 홀','벙커가 많은 홀','워터 해저드 홀','파3 숏홀'], c: 0 },
      { q: '웨지의 &quot;바운스(Bounce)&quot; 각도가 높으면 어떤 상황에 유리한가?', a: ['하드팬','벙커/러프','그린 위','티샷'], c: 1 },
      { q: '골프 클럽의 &quot;MOI(관성모멘트)&quot;가 높으면?', a: ['미스히트에 관대','비거리 감소','스핀 증가','무게 감소'], c: 0 },
      { q: '나인브릿지 골프클럽이 위치한 곳은?', a: ['제주','경기 여주','강원 춘천','충북 청주'], c: 0 },
      { q: '&quot;Strokes Gained: Putting&quot;이 양수(+)면?', a: ['PGA 평균보다 퍼팅이 우수','퍼팅이 평균 이하','벌타가 많음','퍼트 수가 36 이상'], c: 0 },
      { q: '골프공의 딤플 수는 일반적으로 얼마인가?', a: ['200~250개','252~320개','320~500개','500~600개'], c: 2 },
      { q: '라이(Lie) 각도가 플랫(flat)하면 샷 방향은?', a: ['푸시/페이드 경향','풀/드로우 경향','높은 탄도','낮은 탄도'], c: 0 },
      { q: '그린의 스팀프미터 수치가 12이면?', a: ['매우 빠른 그린','보통 그린','느린 그린','매우 느린 그린'], c: 0 },
      { q: '라운드 중 클럽 최대 소지 개수는?', a: ['12개','14개','16개','제한 없음'], c: 1 },
      { q: '골프에서 &quot;에이지샷(Age Shot)&quot;이란?', a: ['자신의 나이보다 낮은 스코어','홀인원','이글 연속','알바트로스'], c: 0 }
    ],
    render: function() {
      let h = '<div id="sg26QuizArea"></div>';
      makeOverlay('sg26Quiz', '<span>&#129504;</span> Golf IQ v10', '#b71c1c,#e53935', h);
      this.state = { idx: 0, score: 0, answered: false };
      this.renderQ();
      sfx('quiz_v10');
    },
    renderQ: function() {
      const area = document.getElementById('sg26QuizArea');
      if (!area) return;
      const s = this.state;
      if (s.idx >= this.questions.length) {
        const pct = Math.round(s.score / this.questions.length * 100);
        const grade = pct >= 90 ? 'S' : pct >= 75 ? 'A' : pct >= 60 ? 'B' : pct >= 40 ? 'C' : 'D';
        area.innerHTML = `<div style="text-align:center;padding:30px"><div style="font-size:48px;font-weight:800;color:var(--primary)">${grade}</div><div style="font-size:20px;font-weight:700;margin:8px 0">${s.score}/${this.questions.length} (${pct}%)</div><div style="color:var(--text-muted);margin-bottom:16px">Golf IQ v10 완료!</div><div class="sg26-btn sg26-btn-primary" onclick="document.getElementById('sg26Quiz').classList.remove('active')">닫기</div></div>`;
        if (pct >= 90) checkAchievement('iq_v10_90');
        checkAchievement('iq_v10_done');
        return;
      }
      const q = this.questions[s.idx];
      area.innerHTML = `<div style="margin-bottom:8px;font-size:12px;color:var(--text-muted)">Q${s.idx+1}/${this.questions.length} | 점수: ${s.score}</div>
        <div class="sg26-quiz-q">${q.q}</div>
        ${q.a.map((a, i) => `<div class="sg26-quiz-opt" data-qi="${i}">${a}</div>`).join('')}`;
      area.querySelectorAll('.sg26-quiz-opt').forEach(el => {
        el.onclick = () => {
          if (s.answered) return;
          s.answered = true;
          const qi = +el.dataset.qi;
          const correct = qi === q.c;
          if (correct) { s.score++; sfx('quiz_v10'); }
          el.classList.add(correct ? 'correct' : 'wrong');
          if (!correct) area.querySelectorAll('.sg26-quiz-opt')[q.c].classList.add('correct');
          setTimeout(() => { s.idx++; s.answered = false; this.renderQ(); }, 1200);
        };
      });
    }
  };

  // ========== Achievement System ==========
  const ACHIEVEMENTS = [
    { id: 'plan_first', name: '첫 라운드 계획', desc: '라운드 플래너에서 첫 계획 등록' },
    { id: 'equip_round', name: '장비 관리자', desc: '장비 라운드 기록 1회' },
    { id: 'stats_first', name: '통계 분석가', desc: '첫 라운드 통계 기록' },
    { id: 'stats_10', name: '데이터 마스터', desc: '10라운드 통계 기록' },
    { id: 'swing_master', name: '스윙 마스터', desc: '6단계 48항목 전체 완료' },
    { id: 'bucket_first', name: '첫 발자국', desc: '버킷리스트 코스 1곳 방문' },
    { id: 'bucket_10', name: '코스 탐험가', desc: '버킷리스트 10곳 방문' },
    { id: 'bucket_master', name: '버킷 마스터', desc: '버킷리스트 20곳 방문' },
    { id: 'season_set', name: '시즌 계획가', desc: '시즌 플래너 목표 설정' },
    { id: 'iq_v10_done', name: 'Golf IQ v10', desc: 'Golf IQ v10 퀴즈 완료' },
    { id: 'iq_v10_90', name: 'IQ v10 수석', desc: 'Golf IQ v10에서 90% 이상' },
    { id: 'v26_explorer', name: 'v26 탐험가', desc: 'v26 기능 전체 탐험' }
  ];

  function checkAchievement(id) {
    const unlocked = LS('achievements_v26') || {};
    if (unlocked[id]) return;
    unlocked[id] = new Date().toISOString();
    LS('achievements_v26', unlocked);
    showAchievementToast(ACHIEVEMENTS.find(a => a.id === id));
  }

  function showAchievementToast(ach) {
    if (!ach) return;
    const toast = document.createElement('div');
    toast.style.cssText = 'position:fixed;top:20px;left:50%;transform:translateX(-50%);z-index:10000;background:linear-gradient(135deg,#1a7a3a,#66bb6a);color:#fff;padding:12px 24px;border-radius:12px;font-size:13px;font-weight:700;box-shadow:0 4px 20px rgba(0,0,0,.3);animation:sg26SlideUp .3s;display:flex;align-items:center;gap:8px';
    toast.innerHTML = `&#127942; ${ach.name} <span style="font-weight:400;font-size:11px">${ach.desc}</span>`;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3500);
  }

  // ========== Bottom Navigation Bar ==========
  function createBottomBar() {
    const bar = document.createElement('div');
    bar.className = 'sg26-bottom-bar';
    bar.id = 'sg26BottomBar';
    const buttons = [
      { icon: '&#9971;', label: '코스공략', fn: () => { SGV26.courseStrategy.render(); document.getElementById('sg26Strategy').classList.add('active'); } },
      { icon: '&#128197;', label: '라운드', fn: () => { SGV26.roundPlanner.render(); document.getElementById('sg26Planner').classList.add('active'); } },
      { icon: '&#127890;', label: '장비관리', fn: () => { SGV26.equipment.render(); document.getElementById('sg26Equip').classList.add('active'); } },
      { icon: '&#128202;', label: '통계', fn: () => { SGV26.statsMaster.render(); document.getElementById('sg26Stats').classList.add('active'); } },
      { icon: '&#127947;', label: '스윙진단', fn: () => { SGV26.swingDiag.render(); document.getElementById('sg26Swing').classList.add('active'); } },
      { icon: '&#127951;', label: '버킷', fn: () => { SGV26.bucketList.render(); document.getElementById('sg26Bucket').classList.add('active'); } },
      { icon: '&#127793;', label: '시즌', fn: () => { SGV26.seasonPlanner.render(); document.getElementById('sg26Season').classList.add('active'); } },
      { icon: '&#128694;', label: '워크스루', fn: () => { SGV26.walkthrough.render(); document.getElementById('sg26Walk').classList.add('active'); } }
    ];
    buttons.forEach(b => {
      const btn = document.createElement('div');
      btn.className = 'sg26-bbtn';
      btn.innerHTML = `<span class="sg26-bbtn-icon">${b.icon}</span><span class="sg26-bbtn-label">${b.label}</span>`;
      btn.onclick = b.fn;
      bar.appendChild(btn);
    });
    document.body.appendChild(bar);
    document.body.style.paddingBottom = '68px';
  }
  createBottomBar();

  // ========== Keyboard Shortcuts ==========
  document.addEventListener('keydown', e => {
    if (['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)) return;
    if (!e.shiftKey) return;
    const map = {
      'C': () => { SGV26.courseStrategy.render(); document.getElementById('sg26Strategy').classList.add('active'); },
      'R': () => { SGV26.roundPlanner.render(); document.getElementById('sg26Planner').classList.add('active'); },
      'E': () => { SGV26.equipment.render(); document.getElementById('sg26Equip').classList.add('active'); },
      'D': () => { SGV26.statsMaster.render(); document.getElementById('sg26Stats').classList.add('active'); },
      'X': () => { SGV26.swingDiag.render(); document.getElementById('sg26Swing').classList.add('active'); },
      'B': () => { SGV26.bucketList.render(); document.getElementById('sg26Bucket').classList.add('active'); },
      'N': () => { SGV26.seasonPlanner.render(); document.getElementById('sg26Season').classList.add('active'); },
      'W': () => { SGV26.walkthrough.render(); document.getElementById('sg26Walk').classList.add('active'); }
    };
    if (map[e.key]) { e.preventDefault(); map[e.key](); }
  });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') document.querySelectorAll('.sg26-overlay.active').forEach(o => o.classList.remove('active')); });

  // ========== Init ==========
  console.log('[SmartGolf v26] Loaded: Course Strategy Guide, Round Planner, Equipment Inventory, Stats Master, AI Swing Diagnosis, Course Bucket List, Season Planner, 18-Hole Walkthrough, Golf IQ v10, +12 Achievements, +12 SFX, +8 Keyboard Shortcuts');

})();
