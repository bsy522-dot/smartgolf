/* ====================================================================
 * SmartGolf v25.0 patch
 * 멘탈코칭10기법 + 연습히트맵Canvas + 코스컨디션트래커 + 핸디캡추이Canvas
 * + 토너먼트3종 + 스윙템포트레이너WebAudio + 골프체력테스트6항목Canvas
 * + 샷패턴분석Canvas + Golf IQ v9 15문항 + 업적+12(116→128) + SFX12종 + 키보드8종
 * ==================================================================== */
(function () {
  'use strict';

  const SGV25 = {};
  const LS = (k, v) => v === undefined ? JSON.parse(localStorage.getItem('sg25_' + k) || 'null') : localStorage.setItem('sg25_' + k, JSON.stringify(v));

  // ========== CSS ==========
  const css = `
.sg25-fab{position:fixed;left:12px;z-index:94;width:44px;height:44px;border-radius:50%;border:none;color:#fff;font-size:17px;box-shadow:0 3px 12px rgba(0,0,0,.25);cursor:pointer;display:flex;align-items:center;justify-content:center;transition:transform .2s}
.sg25-fab:hover{transform:scale(1.12)}
#sg25MentalFab{bottom:580px;background:linear-gradient(135deg,#6a1b9a,#ab47bc)}
#sg25HeatFab{bottom:530px;background:linear-gradient(135deg,#e65100,#ff9800)}
#sg25CondFab{bottom:480px;background:linear-gradient(135deg,#00695c,#26a69a)}
#sg25HcpFab{bottom:430px;background:linear-gradient(135deg,#1565c0,#42a5f5)}
#sg25TournFab{bottom:380px;background:linear-gradient(135deg,#c62828,#ef5350)}
#sg25TempoFab{bottom:330px;background:linear-gradient(135deg,#4527a0,#7e57c2)}
#sg25FitFab{bottom:280px;background:linear-gradient(135deg,#2e7d32,#66bb6a)}
#sg25ShotFab{bottom:230px;background:linear-gradient(135deg,#37474f,#78909c)}
.sg25-overlay{display:none;position:fixed;top:0;left:0;right:0;bottom:0;z-index:999;background:rgba(0,0,0,.55);overflow-y:auto;padding:20px;animation:sg25FadeIn .25s}
.sg25-overlay.active{display:flex;align-items:flex-start;justify-content:center}
@keyframes sg25FadeIn{from{opacity:0}to{opacity:1}}
.sg25-panel{background:var(--card-bg,#fff);border-radius:16px;max-width:560px;width:100%;margin:30px auto;box-shadow:0 8px 40px rgba(0,0,0,.3);overflow:hidden;animation:sg25SlideUp .3s}
@keyframes sg25SlideUp{from{transform:translateY(30px);opacity:0}to{transform:translateY(0);opacity:1}}
.sg25-panel-head{padding:16px 20px;color:#fff;display:flex;align-items:center;justify-content:space-between}
.sg25-panel-head h3{font-size:16px;font-weight:700;display:flex;align-items:center;gap:8px}
.sg25-panel-close{background:rgba(255,255,255,.25);border:none;color:#fff;width:30px;height:30px;border-radius:50%;cursor:pointer;font-size:16px}
.sg25-panel-body{padding:16px 20px;max-height:70vh;overflow-y:auto}
.sg25-card{background:var(--bg,#f5f7f5);border-radius:12px;padding:14px;margin-bottom:10px;border:1px solid var(--border,#e0e0e0);cursor:pointer;transition:all .2s}
.sg25-card:hover{box-shadow:0 2px 12px rgba(0,0,0,.1);transform:translateY(-1px)}
.sg25-card-title{font-weight:700;font-size:14px;color:var(--text,#1a1a1a);margin-bottom:4px;display:flex;align-items:center;gap:6px}
.sg25-card-desc{font-size:12px;color:var(--text-muted,#666);line-height:1.5}
.sg25-badge{display:inline-block;padding:2px 8px;border-radius:10px;font-size:10px;font-weight:700}
.sg25-badge-purple{background:#ede7f6;color:#6a1b9a}
.sg25-badge-green{background:#e8f5e9;color:#2e7d32}
.sg25-badge-blue{background:#e3f2fd;color:#1565c0}
.sg25-badge-orange{background:#fff3e0;color:#e65100}
.sg25-badge-red{background:#ffebee;color:#c62828}
.sg25-tabs{display:flex;gap:4px;margin-bottom:12px;flex-wrap:wrap}
.sg25-tab{padding:6px 14px;border-radius:20px;border:1px solid var(--border,#e0e0e0);background:var(--bg,#f5f7f5);font-size:12px;cursor:pointer;font-weight:600;color:var(--text-muted,#666);transition:all .2s}
.sg25-tab.active{background:var(--primary,#1a7a3a);color:#fff;border-color:var(--primary,#1a7a3a)}
.sg25-input{width:100%;padding:10px 14px;border:2px solid var(--border,#e0e0e0);border-radius:10px;font-size:13px;background:var(--card-bg,#fff);color:var(--text,#1a1a1a);outline:none}
.sg25-input:focus{border-color:var(--primary,#1a7a3a)}
.sg25-btn{padding:10px 20px;border:none;border-radius:10px;font-size:13px;font-weight:700;cursor:pointer;transition:all .2s;display:inline-flex;align-items:center;gap:6px}
.sg25-btn-primary{background:var(--primary,#1a7a3a);color:#fff}
.sg25-btn-primary:hover{filter:brightness(1.1)}
.sg25-btn-secondary{background:var(--bg,#f5f7f5);color:var(--text,#1a1a1a);border:1px solid var(--border,#e0e0e0)}
.sg25-progress{height:8px;background:var(--border,#e0e0e0);border-radius:4px;overflow:hidden;margin:6px 0}
.sg25-progress-fill{height:100%;border-radius:4px;transition:width .5s ease}
.sg25-grid2{display:grid;grid-template-columns:1fr 1fr;gap:8px}
.sg25-grid3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px}
.sg25-stat{text-align:center;padding:10px;background:var(--bg,#f5f7f5);border-radius:10px}
.sg25-stat .v{font-size:20px;font-weight:800;color:var(--primary,#1a7a3a)}
.sg25-stat .l{font-size:10px;color:var(--text-muted,#666);margin-top:2px}
.sg25-tempo-circle{width:120px;height:120px;border-radius:50%;border:6px solid var(--border,#e0e0e0);display:flex;align-items:center;justify-content:center;margin:16px auto;font-size:28px;font-weight:800;transition:border-color .2s}
.sg25-tempo-circle.beat{border-color:#2e7d32;box-shadow:0 0 20px rgba(46,125,50,.4)}
.sg25-range{width:100%;accent-color:var(--primary,#1a7a3a)}
canvas.sg25-canvas{width:100%;border-radius:10px;background:var(--bg,#f5f7f5)}
.sg25-quiz-q{font-size:14px;font-weight:700;margin-bottom:12px;line-height:1.5;color:var(--text,#1a1a1a)}
.sg25-quiz-opt{padding:12px 16px;border:2px solid var(--border,#e0e0e0);border-radius:10px;margin-bottom:6px;cursor:pointer;font-size:13px;transition:all .2s;color:var(--text,#1a1a1a)}
.sg25-quiz-opt:hover{border-color:var(--primary,#1a7a3a);background:var(--primary-light,#e8f5e9)}
.sg25-quiz-opt.correct{border-color:#2e7d32;background:#e8f5e9;color:#2e7d32}
.sg25-quiz-opt.wrong{border-color:#c62828;background:#ffebee;color:#c62828}
@media(max-width:600px){.sg25-panel{margin:10px;border-radius:12px}.sg25-grid2{grid-template-columns:1fr}.sg25-fab{width:38px;height:38px;font-size:14px}}
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
    const t = AC.currentTime;
    const presets = {
      mental_open: [523.25, 'sine', .15, .3],
      mental_complete: [659.25, 'sine', .15, .25],
      heat_record: [440, 'triangle', .12, .2],
      cond_save: [587.33, 'sine', .12, .25],
      hcp_view: [493.88, 'triangle', .1, .2],
      tourn_start: [392, 'square', .08, .3],
      tourn_win: [783.99, 'sine', .15, .4],
      tempo_tick: [880, 'sine', .2, .08],
      tempo_tock: [440, 'sine', .15, .08],
      fit_done: [698.46, 'sine', .12, .3],
      shot_record: [523.25, 'triangle', .1, .2],
      quiz_correct: [659.25, 'sine', .15, .2]
    };
    const p = presets[type] || [440, 'sine', .1, .15];
    o.frequency.setValueAtTime(p[0], t);
    o.type = p[1];
    g.gain.setValueAtTime(p[2], t);
    g.gain.exponentialRampToValueAtTime(.001, t + p[3]);
    o.start(t); o.stop(t + p[3]);
  }

  // ========== Toast ==========
  function toast(msg) {
    const d = document.createElement('div');
    d.style.cssText = 'position:fixed;bottom:80px;left:50%;transform:translateX(-50%);background:var(--toast-bg,#333);color:#fff;padding:10px 20px;border-radius:20px;font-size:13px;font-weight:600;z-index:9999;box-shadow:0 4px 12px rgba(0,0,0,.3);animation:sg25FadeIn .3s';
    d.textContent = msg;
    document.body.appendChild(d);
    setTimeout(() => { d.style.opacity = '0'; d.style.transition = 'opacity .3s'; setTimeout(() => d.remove(), 300); }, 2200);
  }

  // ========== Achievement Engine ==========
  const ACH_DATA = [
    { id: 'mental_first', name: '마인드 게임 시작', desc: '멘탈 코칭 첫 기법 읽기', icon: '\u{1F9E0}' },
    { id: 'mental_all', name: '멘탈 마스터', desc: '멘탈 코칭 10기법 전부 읽기', icon: '\u{1F3C6}' },
    { id: 'heat_first', name: '연습 기록자', desc: '연습 히트맵 첫 기록', icon: '\u{1F525}' },
    { id: 'heat_week', name: '7일 히트맵', desc: '7일 연속 연습 히트맵 기록', icon: '\u{1F4C5}' },
    { id: 'cond_first', name: '코스 리포터', desc: '코스 컨디션 첫 리포트', icon: '\u{1F4CB}' },
    { id: 'hcp_track', name: '핸디캡 추적자', desc: '핸디캡 5라운드 이상 기록', icon: '\u{1F4C8}' },
    { id: 'tourn_play', name: '토너먼트 참가', desc: '토너먼트 모드 첫 플레이', icon: '\u{1F3CC}' },
    { id: 'tempo_master', name: '템포 마스터', desc: '스윙 템포 30초 이상 유지', icon: '\u{1F3B5}' },
    { id: 'fit_complete', name: '체력 테스트 완료', desc: '골프 체력 테스트 6항목 완료', icon: '\u{1F4AA}' },
    { id: 'shot_analyzer', name: '샷 분석가', desc: '샷 패턴 분석 10회 기록', icon: '\u{1F3AF}' },
    { id: 'iq_v9_done', name: 'Golf IQ v9', desc: 'Golf IQ v9 퀴즈 완료', icon: '\u{1F9E0}' },
    { id: 'v25_explorer', name: 'v25 탐험가', desc: 'v25 기능 8종 이상 사용', icon: '\u{2B50}' }
  ];
  function checkAch(id) {
    const achs = LS('achievements') || {};
    if (achs[id]) return;
    achs[id] = Date.now();
    LS('achievements', achs);
    const a = ACH_DATA.find(x => x.id === id);
    if (a) toast(a.icon + ' ' + a.name + ' 획득!');
    trackFeature(id.split('_')[0]);
  }
  function trackFeature(f) {
    const used = LS('features_used') || {};
    used[f] = true;
    LS('features_used', used);
    if (Object.keys(used).length >= 8) checkAch('v25_explorer');
  }

  // ========== Helper: create overlay ==========
  function createOverlay(id, title, color, iconClass) {
    const ov = document.createElement('div');
    ov.className = 'sg25-overlay';
    ov.id = id;
    ov.innerHTML = '<div class="sg25-panel"><div class="sg25-panel-head" style="background:linear-gradient(135deg,' + color + ')"><h3><i class="fa-solid ' + iconClass + '"></i> ' + title + '</h3><button class="sg25-panel-close" onclick="document.getElementById(\'' + id + '\').classList.remove(\'active\')">&times;</button></div><div class="sg25-panel-body" id="' + id + 'Body"></div></div>';
    ov.addEventListener('click', e => { if (e.target === ov) ov.classList.remove('active'); });
    document.body.appendChild(ov);
    return ov;
  }

  // ========== 1. Mental Coaching ==========
  const MENTAL_TECHS = [
    { id: 'confidence', name: '자신감 키우기', icon: '\u{1F4AA}', cat: '기초', steps: ['성공한 샷 3가지 회상', '궍정 자기 암시 반복', '과거 베스트 샷 영상 재생'], desc: '프로들이 사용하는 자신감 빌딩 3단계. 니클라우스는 &quot;모든 샷은 머릿속에서 시작된다&quot;고 말했습니다.' },
    { id: 'focus', name: '집중력 훈련', icon: '\u{1F3AF}', cat: '기초', steps: ['타겟을 명확히 설정', '주변 소음 차단 훈련', '한 샷씩만 생각하기'], desc: '타이거 우즈의 &quot;한 샷 집중&quot; 방법. 과거와 미래를 잊고 현재의 샷에만 몰입합니다.' },
    { id: 'routine', name: '프리샷 멘탈 루틴', icon: '\u{1F500}', cat: '기초', steps: ['심호흡 2회', '타겟 시각화', '연습 스윙 1회', '셔틀 인 → 스윙'], desc: '일관된 프리샷 루틴은 압박감을 50% 줄여줍니다. 루틴의 시간은 15초 이내가 이상적.' },
    { id: 'mistake', name: '실수 대처법', icon: '\u{1F6E1}', cat: '실전', steps: ['심호흡으로 감정 리셋', '3초 내에 실수 버리기', '다음 샷 전략 수립'], desc: '뱅 존스의 &quot;3초 규칙&quot;: 분노를 3초 안에 해소하고 다음 샷에 집중. 실수는 게임의 일부입니다.' },
    { id: 'pressure', name: '프레셔 극복', icon: '\u{1F48E}', cat: '실전', steps: ['압박감을 &quot;흥분&quot;으로 재해석', '심박수 조절 호흡', '과거 성공 경험 회상'], desc: '메이웨더의 &quot;압박 = 에너지&quot; 마인드셋. 비그퍼트/중요한 퍼트일수록 루틴을 철저히 따릅니다.' },
    { id: 'positive', name: '궍정 사고', icon: '☀️', cat: '마인드', steps: ['부정적 생각 인지', '궍정적 문장으로 전환', '행운 노트 기록'], desc: '통계적으로 궍정적인 골퍼가 평균 3타 더 좋은 성적을 냅니다. “못칠 것 같다” → “최선을 다하자”' },
    { id: 'visualize', name: '시각화 훈련', icon: '\u{1F441}', cat: '마인드', steps: ['눈을 감고 타겟 상상', '공의 궤적을 그림', '착지점까지 상상 비행'], desc: '잭 니클라우스는 모든 샷 전에 공의 궤적을 시각화했습니다. 30초간 눈을 감고 연습하세요.' },
    { id: 'breathe', name: '호흡 콘트롤', icon: '\u{1F32C}', cat: '마인드', steps: ['4초 들이마시기', '4초 멈추기', '6초 내쉬기', '3회 반복'], desc: '4-4-6 호흡법은 심박수를 10-15% 낮추고 집중력을 높입니다. 티샷 전에 특히 효과적.' },
    { id: 'goal', name: '목표 설정', icon: '\u{1F3AF}', cat: '전략', steps: ['프로세스 목표 설정', '결과 목표는 부담 없게', '라운드 후 반성 기록'], desc: '“80타 치겠다”보다 “프리샷 루틴을 모든 샷에서 실행하겠다”가 더 효과적입니다.' },
    { id: 'selftalk', name: '자기 대화', icon: '\u{1F4AC}', cat: '전략', steps: ['부정적 자기 대화 모니터링', '친구에게 하듯 말하기', '응원 문구 3가지 준비'], desc: '연구에 따르면 골퍼는 18홀 동안 평균 600번의 자기 대화를 합니다. 궍정적으로 바꾸세요.' }
  ];

  createOverlay('sg25Mental', '멘탈 코칭 10기법', '#6a1b9a,#ab47bc', 'fa-brain');
  function renderMental() {
    sfx('mental_open');
    const body = document.getElementById('sg25MentalBody');
    const read = LS('mental_read') || {};
    const cats = [...new Set(MENTAL_TECHS.map(t => t.cat))];
    const readCount = Object.keys(read).length;
    body.innerHTML = '<div style="text-align:center;margin-bottom:12px"><div class="sg25-stat"><div class="v">' + readCount + '/10</div><div class="l">읽은 기법</div></div><div class="sg25-progress"><div class="sg25-progress-fill" style="width:' + (readCount * 10) + '%;background:linear-gradient(90deg,#6a1b9a,#ab47bc)"></div></div></div>';
    body.innerHTML += '<div class="sg25-tabs" id="sg25MentalTabs"></div><div id="sg25MentalList"></div>';
    const tabs = document.getElementById('sg25MentalTabs');
    cats.forEach((c, i) => {
      const tab = document.createElement('div');
      tab.className = 'sg25-tab' + (i === 0 ? ' active' : '');
      tab.textContent = c;
      tab.onclick = () => { tabs.querySelectorAll('.sg25-tab').forEach(t => t.classList.remove('active')); tab.classList.add('active'); showMentalCat(c); };
      tabs.appendChild(tab);
    });
    showMentalCat(cats[0]);
  }
  function showMentalCat(cat) {
    const list = document.getElementById('sg25MentalList');
    const read = LS('mental_read') || {};
    list.innerHTML = '';
    MENTAL_TECHS.filter(t => t.cat === cat).forEach(t => {
      const card = document.createElement('div');
      card.className = 'sg25-card';
      const isRead = read[t.id];
      card.innerHTML = '<div class="sg25-card-title">' + t.icon + ' ' + t.name + (isRead ? ' <span class="sg25-badge sg25-badge-green">✓ 읽음</span>' : '') + '</div><div class="sg25-card-desc">' + t.desc + '</div><div style="margin-top:8px">' + t.steps.map((s, i) => '<div style="font-size:12px;padding:4px 0;color:var(--text)"><span style="font-weight:700;color:#6a1b9a">' + (i + 1) + '.</span> ' + s + '</div>').join('') + '</div>';
      card.onclick = () => {
        if (!isRead) {
          read[t.id] = true;
          LS('mental_read', read);
          sfx('mental_complete');
          checkAch('mental_first');
          if (Object.keys(read).length >= 10) checkAch('mental_all');
          renderMental();
        }
      };
      list.appendChild(card);
    });
  }

  // ========== 2. Practice Heatmap Canvas ==========
  createOverlay('sg25Heat', '연습 히트맵', '#e65100,#ff9800', 'fa-fire');
  function renderHeat() {
    sfx('heat_record');
    trackFeature('heat');
    const body = document.getElementById('sg25HeatBody');
    const logs = LS('heat_logs') || [];
    body.innerHTML = '<p style="font-size:12px;color:var(--text-muted);margin-bottom:12px">오늘의 연습을 기록하세요. 클럽별 연습 빈도를 히트맵으로 시각화합니다.</p><div class="sg25-grid2" style="margin-bottom:12px" id="sg25HeatClubs"></div><button class="sg25-btn sg25-btn-primary" style="width:100%;margin-bottom:16px" id="sg25HeatSave">오늘 연습 저장</button><canvas id="sg25HeatCanvas" class="sg25-canvas" width="520" height="280"></canvas><div id="sg25HeatHistory" style="margin-top:12px"></div>';
    const clubs = ['드라이버', '우드', '아이언', '웨지', '퍼터', '칩'];
    const clubsDiv = document.getElementById('sg25HeatClubs');
    const today = {};
    clubs.forEach(c => {
      today[c] = 0;
      const d = document.createElement('div');
      d.className = 'sg25-stat';
      d.style.cursor = 'pointer';
      d.innerHTML = '<div class="v" id="sg25H_' + c + '">0</div><div class="l">' + c + '</div>';
      d.onclick = () => { today[c]++; document.getElementById('sg25H_' + c).textContent = today[c]; };
      clubsDiv.appendChild(d);
    });
    document.getElementById('sg25HeatSave').onclick = () => {
      const total = Object.values(today).reduce((a, b) => a + b, 0);
      if (total === 0) { toast('클럽을 클릭해 연습 횟수를 입력하세요'); return; }
      logs.unshift({ date: new Date().toISOString().slice(0, 10), clubs: { ...today } });
      if (logs.length > 30) logs.length = 30;
      LS('heat_logs', logs);
      sfx('heat_record');
      checkAch('heat_first');
      const streak = countStreak(logs);
      if (streak >= 7) checkAch('heat_week');
      toast('연습 기록 저장! (' + total + '회)');
      drawHeatmap(logs, clubs);
      renderHeatHistory(logs);
    };
    drawHeatmap(logs, clubs);
    renderHeatHistory(logs);
  }
  function countStreak(logs) {
    if (!logs.length) return 0;
    let streak = 1;
    const today = new Date().toISOString().slice(0, 10);
    if (logs[0].date !== today) return 0;
    for (let i = 1; i < logs.length; i++) {
      const d1 = new Date(logs[i - 1].date), d2 = new Date(logs[i].date);
      if ((d1 - d2) / 86400000 === 1) streak++;
      else break;
    }
    return streak;
  }
  function drawHeatmap(logs, clubs) {
    const canvas = document.getElementById('sg25HeatCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const W = canvas.width, H = canvas.height;
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--bg').trim() || '#f5f7f5';
    ctx.fillRect(0, 0, W, H);
    const last7 = logs.slice(0, 7).reverse();
    if (last7.length === 0) { ctx.fillStyle = '#999'; ctx.font = '13px sans-serif'; ctx.textAlign = 'center'; ctx.fillText('연습 기록이 없습니다', W / 2, H / 2); return; }
    const cellW = Math.floor((W - 80) / Math.max(last7.length, 1));
    const cellH = Math.floor((H - 50) / clubs.length);
    ctx.font = '11px sans-serif'; ctx.textAlign = 'right'; ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--text-muted').trim() || '#666';
    clubs.forEach((c, i) => ctx.fillText(c, 60, 40 + i * cellH + cellH / 2 + 4));
    ctx.textAlign = 'center';
    last7.forEach((l, j) => {
      ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--text-muted').trim() || '#666';
      ctx.fillText(l.date.slice(5), 70 + j * cellW + cellW / 2, H - 8);
      clubs.forEach((c, i) => {
        const val = (l.clubs && l.clubs[c]) || 0;
        const max = 30;
        const intensity = Math.min(val / max, 1);
        const r = Math.round(230 - intensity * 200);
        const g = Math.round(245 - intensity * 120);
        const b = Math.round(230 - intensity * 200);
        ctx.fillStyle = val > 0 ? 'rgb(' + r + ',' + g + ',' + b + ')' : '#eee';
        const x = 70 + j * cellW + 2;
        const y = 30 + i * cellH + 2;
        ctx.beginPath();
        ctx.roundRect(x, y, cellW - 4, cellH - 4, 4);
        ctx.fill();
        if (val > 0) { ctx.fillStyle = intensity > 0.6 ? '#fff' : '#333'; ctx.font = 'bold 12px sans-serif'; ctx.fillText(val, x + (cellW - 4) / 2, y + (cellH - 4) / 2 + 4); ctx.font = '11px sans-serif'; }
      });
    });
    ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--text').trim() || '#1a1a1a';
    ctx.font = 'bold 13px sans-serif'; ctx.textAlign = 'left';
    ctx.fillText('최근 7일 연습 히트맵', 10, 18);
  }
  function renderHeatHistory(logs) {
    const div = document.getElementById('sg25HeatHistory');
    if (!div) return;
    div.innerHTML = '<div style="font-weight:700;font-size:13px;margin-bottom:6px">최근 기록</div>' + logs.slice(0, 5).map(l => '<div style="font-size:12px;padding:4px 0;border-top:1px solid var(--border,#e0e0e0)"><span style="color:var(--text-muted)">' + l.date + '</span> ' + Object.entries(l.clubs).filter(([, v]) => v > 0).map(([k, v]) => k + ' ' + v + '회').join(', ') + '</div>').join('');
  }

  // ========== 3. Course Condition Tracker ==========
  createOverlay('sg25Cond', '코스 컨디션 트래커', '#00695c,#26a69a', 'fa-clipboard-check');
  function renderCond() {
    sfx('cond_save');
    trackFeature('cond');
    const body = document.getElementById('sg25CondBody');
    const reports = LS('cond_reports') || [];
    const aspects = [
      { id: 'fairway', name: '페어웨이', icon: '\u{1F33F}' },
      { id: 'green', name: '그린', icon: '\u{1F7E2}' },
      { id: 'bunker', name: '벙커', icon: '\u{1F3DC}' },
      { id: 'rough', name: '러프', icon: '\u{1F33E}' },
      { id: 'overall', name: '종합', icon: '⭐' }
    ];
    body.innerHTML = '<p style="font-size:12px;color:var(--text-muted);margin-bottom:12px">라운드 후 코스 상태를 기록하세요. 5점 만점으로 평가합니다.</p><input class="sg25-input" placeholder="골프장 이름" id="sg25CondCourse" style="margin-bottom:10px"><div id="sg25CondSliders"></div><textarea class="sg25-input" placeholder="메모 (선택)" id="sg25CondMemo" rows="2" style="margin:10px 0"></textarea><button class="sg25-btn sg25-btn-primary" style="width:100%;margin-bottom:16px" id="sg25CondSaveBtn">리포트 저장</button><div id="sg25CondHistory"></div>';
    const sliders = document.getElementById('sg25CondSliders');
    const vals = {};
    aspects.forEach(a => {
      vals[a.id] = 3;
      const row = document.createElement('div');
      row.style.cssText = 'display:flex;align-items:center;gap:8px;margin-bottom:8px';
      row.innerHTML = '<span style="font-size:13px;min-width:80px">' + a.icon + ' ' + a.name + '</span><input type="range" class="sg25-range" min="1" max="5" value="3" id="sg25Cond_' + a.id + '"><span id="sg25CondV_' + a.id + '" style="font-weight:700;min-width:20px">3</span>';
      sliders.appendChild(row);
      row.querySelector('input').oninput = e => { vals[a.id] = +e.target.value; document.getElementById('sg25CondV_' + a.id).textContent = e.target.value; };
    });
    document.getElementById('sg25CondSaveBtn').onclick = () => {
      const course = document.getElementById('sg25CondCourse').value.trim();
      if (!course) { toast('골프장 이름을 입력하세요'); return; }
      reports.unshift({ date: new Date().toISOString().slice(0, 10), course, scores: { ...vals }, memo: document.getElementById('sg25CondMemo').value.trim() });
      if (reports.length > 50) reports.length = 50;
      LS('cond_reports', reports);
      sfx('cond_save');
      checkAch('cond_first');
      toast('코스 컨디션 저장!');
      renderCondHistory(reports);
    };
    renderCondHistory(reports);
  }
  function renderCondHistory(reports) {
    const div = document.getElementById('sg25CondHistory');
    if (!div) return;
    div.innerHTML = '<div style="font-weight:700;font-size:13px;margin-bottom:8px">최근 리포트</div>';
    reports.slice(0, 8).forEach(r => {
      const avg = Object.values(r.scores).reduce((a, b) => a + b, 0) / Object.keys(r.scores).length;
      const grade = avg >= 4.5 ? 'S' : avg >= 3.5 ? 'A' : avg >= 2.5 ? 'B' : avg >= 1.5 ? 'C' : 'D';
      const colors = { S: '#2e7d32', A: '#1565c0', B: '#f9a825', C: '#e65100', D: '#c62828' };
      div.innerHTML += '<div class="sg25-card"><div class="sg25-card-title">' + r.course + ' <span class="sg25-badge" style="background:' + colors[grade] + '20;color:' + colors[grade] + '">' + grade + '등급 (' + avg.toFixed(1) + ')</span></div><div class="sg25-card-desc">' + r.date + (r.memo ? ' · ' + r.memo : '') + '</div></div>';
    });
  }

  // ========== 4. Handicap Trend Canvas ==========
  createOverlay('sg25Hcp', '핸디캡 추이 분석', '#1565c0,#42a5f5', 'fa-chart-line');
  function renderHcp() {
    sfx('hcp_view');
    trackFeature('hcp');
    const body = document.getElementById('sg25HcpBody');
    const records = LS('hcp_records') || [];
    body.innerHTML = '<p style="font-size:12px;color:var(--text-muted);margin-bottom:12px">라운드 스코어와 코스 레이팅/슬로프를 입력하면 WHS 핸디캡을 계산합니다.</p><div class="sg25-grid3" style="margin-bottom:10px"><div class="sg25-stat"><input class="sg25-input" type="number" placeholder="스코어" id="sg25HcpScore" style="text-align:center;font-weight:700"></div><div class="sg25-stat"><input class="sg25-input" type="number" placeholder="CR" id="sg25HcpCR" step="0.1" style="text-align:center;font-weight:700"></div><div class="sg25-stat"><input class="sg25-input" type="number" placeholder="SR" id="sg25HcpSR" style="text-align:center;font-weight:700"></div></div><button class="sg25-btn sg25-btn-primary" style="width:100%;margin-bottom:16px" id="sg25HcpAdd">라운드 추가</button><canvas id="sg25HcpCanvas" class="sg25-canvas" width="520" height="260"></canvas><div id="sg25HcpStats" style="margin-top:12px"></div>';
    document.getElementById('sg25HcpAdd').onclick = () => {
      const score = +document.getElementById('sg25HcpScore').value;
      const cr = +document.getElementById('sg25HcpCR').value || 72;
      const sr = +document.getElementById('sg25HcpSR').value || 113;
      if (!score || score < 50 || score > 150) { toast('스코어를 정확히 입력하세요 (50-150)'); return; }
      const diff = (score - cr) * 113 / sr;
      records.push({ date: new Date().toISOString().slice(0, 10), score, cr, sr, diff: Math.round(diff * 10) / 10 });
      if (records.length > 40) records.shift();
      LS('hcp_records', records);
      sfx('hcp_view');
      if (records.length >= 5) checkAch('hcp_track');
      toast('핸디캡 기록 추가!');
      drawHcpChart(records);
      renderHcpStats(records);
    };
    drawHcpChart(records);
    renderHcpStats(records);
  }
  function drawHcpChart(records) {
    const canvas = document.getElementById('sg25HcpCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const W = canvas.width, H = canvas.height;
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--bg').trim() || '#f5f7f5';
    ctx.fillRect(0, 0, W, H);
    if (records.length < 2) { ctx.fillStyle = '#999'; ctx.font = '13px sans-serif'; ctx.textAlign = 'center'; ctx.fillText('2라운드 이상 기록하면 그래프가 표시됩니다', W / 2, H / 2); return; }
    const diffs = records.map(r => r.diff);
    const maxD = Math.max(...diffs) + 3;
    const minD = Math.min(...diffs) - 3;
    const range = maxD - minD || 1;
    const padL = 50, padR = 20, padT = 30, padB = 40;
    const plotW = W - padL - padR, plotH = H - padT - padB;
    ctx.strokeStyle = '#ddd'; ctx.lineWidth = 1;
    for (let i = 0; i <= 4; i++) {
      const y = padT + plotH * i / 4;
      ctx.beginPath(); ctx.moveTo(padL, y); ctx.lineTo(W - padR, y); ctx.stroke();
      ctx.fillStyle = '#999'; ctx.font = '10px sans-serif'; ctx.textAlign = 'right';
      ctx.fillText((maxD - range * i / 4).toFixed(1), padL - 5, y + 3);
    }
    const grad = ctx.createLinearGradient(0, padT, 0, padT + plotH);
    grad.addColorStop(0, 'rgba(21,101,192,.15)'); grad.addColorStop(1, 'rgba(21,101,192,0)');
    ctx.beginPath();
    records.forEach((r, i) => {
      const x = padL + (i / (records.length - 1)) * plotW;
      const y = padT + ((maxD - r.diff) / range) * plotH;
      if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    });
    const lastX = padL + plotW;
    ctx.lineTo(lastX, padT + plotH); ctx.lineTo(padL, padT + plotH); ctx.closePath();
    ctx.fillStyle = grad; ctx.fill();
    ctx.beginPath();
    records.forEach((r, i) => {
      const x = padL + (i / (records.length - 1)) * plotW;
      const y = padT + ((maxD - r.diff) / range) * plotH;
      if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    });
    ctx.strokeStyle = '#1565c0'; ctx.lineWidth = 2.5; ctx.stroke();
    records.forEach((r, i) => {
      const x = padL + (i / (records.length - 1)) * plotW;
      const y = padT + ((maxD - r.diff) / range) * plotH;
      ctx.beginPath(); ctx.arc(x, y, 4, 0, Math.PI * 2); ctx.fillStyle = '#1565c0'; ctx.fill(); ctx.strokeStyle = '#fff'; ctx.lineWidth = 2; ctx.stroke();
    });
    ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--text').trim() || '#1a1a1a';
    ctx.font = 'bold 13px sans-serif'; ctx.textAlign = 'left';
    ctx.fillText('핸디캡 추이 (최근 ' + records.length + '라운드)', 10, 18);
  }
  function renderHcpStats(records) {
    const div = document.getElementById('sg25HcpStats');
    if (!div || records.length === 0) return;
    const diffs = records.map(r => r.diff);
    const best8 = [...diffs].sort((a, b) => a - b).slice(0, Math.max(Math.ceil(diffs.length * 0.4), 1));
    const hcp = best8.reduce((a, b) => a + b, 0) / best8.length;
    const latest = diffs[diffs.length - 1];
    const avg = diffs.reduce((a, b) => a + b, 0) / diffs.length;
    div.innerHTML = '<div class="sg25-grid3"><div class="sg25-stat"><div class="v">' + hcp.toFixed(1) + '</div><div class="l">WHS 핸디캡</div></div><div class="sg25-stat"><div class="v">' + latest.toFixed(1) + '</div><div class="l">최근 디퍼렌셜</div></div><div class="sg25-stat"><div class="v">' + avg.toFixed(1) + '</div><div class="l">평균</div></div></div>';
  }

  // ========== 5. Tournament Mode ==========
  createOverlay('sg25Tourn', '토너먼트 모드', '#c62828,#ef5350', 'fa-trophy');
  function renderTourn() {
    sfx('tourn_start');
    trackFeature('tourn');
    const body = document.getElementById('sg25TournBody');
    const modes = [
      { id: 'stroke', name: '스트로크 플레이', desc: '총 타수로 승부. 가장 적은 타수가 승리.', par: [4,3,5,4,4,3,4,5,4,4,3,5,4,4,3,4,5,4] },
      { id: 'match', name: '매치 플레이', desc: '홀별 승부. 더 적은 타수의 홀을 이기면 1Up. 최종 Up/Down.', par: [4,3,5,4,4,3,4,5,4,4,3,5,4,4,3,4,5,4] },
      { id: 'stableford', name: '스테이블포드', desc: '포인트 제: 더블보기+=0, 보기=1, 파=2, 버디=3, 이글=4, 알바=5', par: [4,3,5,4,4,3,4,5,4,4,3,5,4,4,3,4,5,4] }
    ];
    body.innerHTML = '<p style="font-size:12px;color:var(--text-muted);margin-bottom:12px">토너먼트 형식을 선택하고 스코어를 입력하세요.</p>' + modes.map(m => '<div class="sg25-card" onclick="document.getElementById(\'sg25TournGame\').dataset.mode=\'' + m.id + '\';document.getElementById(\'sg25TournGame\').style.display=\'block\';document.getElementById(\'sg25TournSelect\').style.display=\'none\';window._sg25StartTourn(\'' + m.id + '\')"><div class="sg25-card-title"><i class="fa-solid fa-trophy"></i> ' + m.name + '</div><div class="sg25-card-desc">' + m.desc + '</div></div>').join('') + '<div id="sg25TournSelect"></div><div id="sg25TournGame" style="display:none"></div>';
  }
  window._sg25StartTourn = function(modeId) {
    checkAch('tourn_play');
    const game = document.getElementById('sg25TournGame');
    const par = [4,3,5,4,4,3,4,5,4,4,3,5,4,4,3,4,5,4];
    const state = { scores: new Array(18).fill(0), current: 0 };
    function renderHole() {
      const h = state.current;
      if (h >= 18) { finishTourn(); return; }
      game.innerHTML = '<div style="text-align:center;margin-bottom:12px"><span class="sg25-badge sg25-badge-red">' + (modeId === 'stroke' ? '스트로크' : modeId === 'match' ? '매치' : '스테이블포드') + '</span><div style="font-size:20px;font-weight:800;margin:8px 0">Hole ' + (h + 1) + '</div><div style="font-size:13px;color:var(--text-muted)">Par ' + par[h] + '</div></div><div class="sg25-grid3" style="margin-bottom:12px">' + [par[h] - 2, par[h] - 1, par[h], par[h] + 1, par[h] + 2, par[h] + 3].map(s => '<button class="sg25-btn sg25-btn-secondary" style="font-size:16px;justify-content:center" onclick="window._sg25Score(' + s + ')">' + s + '</button>').join('') + '</div><div style="font-size:11px;color:var(--text-muted);text-align:center">(' + (h + 1) + '/18홀)</div>';
    }
    window._sg25Score = function(s) {
      state.scores[state.current] = s;
      state.current++;
      renderHole();
    };
    function finishTourn() {
      const totalPar = par.reduce((a, b) => a + b, 0);
      const totalScore = state.scores.reduce((a, b) => a + b, 0);
      let result = '';
      if (modeId === 'stroke') {
        const diff = totalScore - totalPar;
        result = '<div class="sg25-stat"><div class="v">' + totalScore + '</div><div class="l">총 스코어 (' + (diff >= 0 ? '+' : '') + diff + ')</div></div>';
      } else if (modeId === 'stableford') {
        let pts = 0;
        state.scores.forEach((s, i) => { const d = s - par[i]; if (d <= -3) pts += 5; else if (d === -2) pts += 4; else if (d === -1) pts += 3; else if (d === 0) pts += 2; else if (d === 1) pts += 1; });
        result = '<div class="sg25-stat"><div class="v">' + pts + '</div><div class="l">스테이블포드 포인트</div></div>';
      } else {
        result = '<div class="sg25-stat"><div class="v">' + totalScore + '</div><div class="l">총 타수</div></div>';
      }
      sfx('tourn_win');
      game.innerHTML = '<div style="text-align:center"><div style="font-size:24px;margin-bottom:8px">\u{1F3C6}</div><div style="font-size:18px;font-weight:800;margin-bottom:12px">토너먼트 완료!</div>' + result + '<button class="sg25-btn sg25-btn-primary" style="margin-top:16px" onclick="document.getElementById(\'sg25TournGame\').style.display=\'none\';document.getElementById(\'sg25TournSelect\').style.display=\'block\'">다시 하기</button></div>';
      const hist = LS('tourn_history') || [];
      hist.unshift({ date: new Date().toISOString().slice(0, 10), mode: modeId, score: totalScore });
      if (hist.length > 20) hist.length = 20;
      LS('tourn_history', hist);
    }
    renderHole();
  };

  // ========== 6. Swing Tempo Trainer ==========
  createOverlay('sg25Tempo', '스윙 템포 트레이너', '#4527a0,#7e57c2', 'fa-music');
  let tempoInterval = null;
  function renderTempo() {
    sfx('tempo_tick');
    trackFeature('tempo');
    const body = document.getElementById('sg25TempoBody');
    const best = LS('tempo_best') || 0;
    body.innerHTML = '<p style="font-size:12px;color:var(--text-muted);margin-bottom:12px">스윙 템포 3:1 비율 (백스윙:3박 / 다운스윙:1박). BPM을 조절하고 시작하세요.</p><div class="sg25-tempo-circle" id="sg25TempoCircle"><span id="sg25TempoBeat">3:1</span></div><div style="text-align:center;margin:12px 0"><div style="font-size:12px;color:var(--text-muted);margin-bottom:4px">BPM: <span id="sg25BpmVal">72</span></div><input type="range" class="sg25-range" min="40" max="120" value="72" id="sg25BpmSlider" style="max-width:300px"></div><div style="display:flex;gap:8px;justify-content:center;margin-bottom:16px"><button class="sg25-btn sg25-btn-primary" id="sg25TempoStart"><i class="fa-solid fa-play"></i> 시작</button><button class="sg25-btn sg25-btn-secondary" id="sg25TempoStop"><i class="fa-solid fa-stop"></i> 정지</button></div><div class="sg25-grid2"><div class="sg25-stat"><div class="v" id="sg25TempoTime">0s</div><div class="l">경과 시간</div></div><div class="sg25-stat"><div class="v">' + best + 's</div><div class="l">베스트</div></div></div>';
    const slider = document.getElementById('sg25BpmSlider');
    slider.oninput = () => document.getElementById('sg25BpmVal').textContent = slider.value;
    let running = false, beatCount = 0, startTime = 0;
    document.getElementById('sg25TempoStart').onclick = () => {
      if (running) return;
      running = true; beatCount = 0; startTime = Date.now();
      const bpm = +slider.value;
      const ms = 60000 / bpm;
      const circle = document.getElementById('sg25TempoCircle');
      tempoInterval = setInterval(() => {
        beatCount++;
        const phase = beatCount % 4;
        if (phase < 3) {
          sfx('tempo_tick');
          document.getElementById('sg25TempoBeat').textContent = '⬆ ' + (phase + 1);
          circle.style.borderColor = '#7e57c2';
        } else {
          sfx('tempo_tock');
          document.getElementById('sg25TempoBeat').textContent = '⬇ HIT';
          circle.style.borderColor = '#2e7d32';
        }
        circle.classList.add('beat');
        setTimeout(() => circle.classList.remove('beat'), 150);
        document.getElementById('sg25TempoTime').textContent = Math.round((Date.now() - startTime) / 1000) + 's';
      }, ms);
    };
    document.getElementById('sg25TempoStop').onclick = () => {
      if (!running) return;
      running = false;
      clearInterval(tempoInterval);
      const elapsed = Math.round((Date.now() - startTime) / 1000);
      if (elapsed > best) { LS('tempo_best', elapsed); toast('베스트 기록 갱신: ' + elapsed + '초!'); }
      if (elapsed >= 30) checkAch('tempo_master');
      document.getElementById('sg25TempoBeat').textContent = '3:1';
      document.getElementById('sg25TempoCircle').style.borderColor = '';
    };
  }

  // ========== 7. Golf Fitness Test ==========
  createOverlay('sg25Fit', '골프 체력 테스트', '#2e7d32,#66bb6a', 'fa-dumbbell');
  function renderFit() {
    sfx('fit_done');
    trackFeature('fit');
    const body = document.getElementById('sg25FitBody');
    const tests = [
      { id: 'hip', name: '골반 회전력', desc: '엉덩이 회전 범위 (1~5)', max: 5 },
      { id: 'core', name: '코어 안정성', desc: '플랭크 버티기 시간', max: 5 },
      { id: 'flex', name: '유연성', desc: '앞으로 굽히기 범위', max: 5 },
      { id: 'balance', name: '밸런스', desc: '한 발 서기 시간', max: 5 },
      { id: 'power', name: '파워', desc: '클럽헤드 스피드', max: 5 },
      { id: 'endurance', name: '지구력', desc: '18홀 후 피로도', max: 5 }
    ];
    const saved = LS('fit_scores') || {};
    body.innerHTML = '<p style="font-size:12px;color:var(--text-muted);margin-bottom:12px">6가지 골프 체력 항목을 자가 평가하세요 (1=부족 ~ 5=우수).</p><div id="sg25FitItems"></div><button class="sg25-btn sg25-btn-primary" style="width:100%;margin:12px 0" id="sg25FitSave">평가 저장 & 레이더 차트</button><canvas id="sg25FitCanvas" class="sg25-canvas" width="360" height="360"></canvas>';
    const items = document.getElementById('sg25FitItems');
    tests.forEach(t => {
      const row = document.createElement('div');
      row.style.cssText = 'display:flex;align-items:center;gap:8px;margin-bottom:8px';
      row.innerHTML = '<div style="min-width:100px"><div style="font-weight:700;font-size:13px">' + t.name + '</div><div style="font-size:10px;color:var(--text-muted)">' + t.desc + '</div></div><input type="range" class="sg25-range" min="1" max="5" value="' + (saved[t.id] || 3) + '" id="sg25Fit_' + t.id + '" style="flex:1"><span id="sg25FitV_' + t.id + '" style="font-weight:700;min-width:20px;text-align:center">' + (saved[t.id] || 3) + '</span>';
      items.appendChild(row);
      row.querySelector('input').oninput = e => document.getElementById('sg25FitV_' + t.id).textContent = e.target.value;
    });
    document.getElementById('sg25FitSave').onclick = () => {
      const scores = {};
      tests.forEach(t => scores[t.id] = +document.getElementById('sg25Fit_' + t.id).value);
      LS('fit_scores', scores);
      sfx('fit_done');
      checkAch('fit_complete');
      toast('체력 테스트 저장!');
      drawFitRadar(tests, scores);
    };
    if (Object.keys(saved).length > 0) drawFitRadar(tests, saved);
  }
  function drawFitRadar(tests, scores) {
    const canvas = document.getElementById('sg25FitCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const W = canvas.width, H = canvas.height;
    const cx = W / 2, cy = H / 2, R = Math.min(W, H) / 2 - 40;
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--bg').trim() || '#f5f7f5';
    ctx.fillRect(0, 0, W, H);
    const n = tests.length;
    for (let ring = 1; ring <= 5; ring++) {
      const r = R * ring / 5;
      ctx.beginPath();
      for (let i = 0; i <= n; i++) {
        const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
        const x = cx + r * Math.cos(angle);
        const y = cy + r * Math.sin(angle);
        if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.closePath(); ctx.strokeStyle = '#ddd'; ctx.lineWidth = 1; ctx.stroke();
    }
    for (let i = 0; i < n; i++) {
      const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
      ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + R * Math.cos(angle), cy + R * Math.sin(angle)); ctx.strokeStyle = '#ddd'; ctx.stroke();
      const lx = cx + (R + 20) * Math.cos(angle);
      const ly = cy + (R + 20) * Math.sin(angle);
      ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--text').trim() || '#1a1a1a';
      ctx.font = '11px sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText(tests[i].name, lx, ly);
    }
    ctx.beginPath();
    tests.forEach((t, i) => {
      const val = (scores[t.id] || 0) / 5;
      const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
      const x = cx + R * val * Math.cos(angle);
      const y = cy + R * val * Math.sin(angle);
      if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    });
    ctx.closePath();
    ctx.fillStyle = 'rgba(46,125,50,.2)'; ctx.fill();
    ctx.strokeStyle = '#2e7d32'; ctx.lineWidth = 2.5; ctx.stroke();
    tests.forEach((t, i) => {
      const val = (scores[t.id] || 0) / 5;
      const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
      const x = cx + R * val * Math.cos(angle);
      const y = cy + R * val * Math.sin(angle);
      ctx.beginPath(); ctx.arc(x, y, 4, 0, Math.PI * 2); ctx.fillStyle = '#2e7d32'; ctx.fill(); ctx.strokeStyle = '#fff'; ctx.lineWidth = 2; ctx.stroke();
    });
    const total = Object.values(scores).reduce((a, b) => a + b, 0);
    const avg = total / n;
    ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--text').trim() || '#1a1a1a';
    ctx.font = 'bold 13px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('골프 체력 점수: ' + avg.toFixed(1) + '/5.0', cx, H - 10);
  }

  // ========== 8. Shot Pattern Analyzer Canvas ==========
  createOverlay('sg25Shot', '샷 패턴 분석기', '#37474f,#78909c', 'fa-bullseye');
  function renderShot() {
    sfx('shot_record');
    trackFeature('shot');
    const body = document.getElementById('sg25ShotBody');
    const shots = LS('shot_patterns') || [];
    const clubList = ['드라이버', '3우드', '5우드', '7아이언', '9아이언', 'PW', 'SW'];
    body.innerHTML = '<p style="font-size:12px;color:var(--text-muted);margin-bottom:12px">캔버스를 탭하면 샷이 기록됩니다. 타겟 중심 대비 샷 분포를 분석합니다.</p><select class="sg25-input" id="sg25ShotClub" style="margin-bottom:10px">' + clubList.map(c => '<option>' + c + '</option>').join('') + '</select><canvas id="sg25ShotCanvas" class="sg25-canvas" width="400" height="400" style="cursor:crosshair;margin-bottom:12px"></canvas><div style="display:flex;gap:8px;margin-bottom:12px"><button class="sg25-btn sg25-btn-secondary" id="sg25ShotClear">초기화</button><span style="font-size:12px;color:var(--text-muted);align-self:center" id="sg25ShotCount">기록: ' + shots.length + '회</span></div><div id="sg25ShotStats"></div>';
    const canvas = document.getElementById('sg25ShotCanvas');
    const ctx = canvas.getContext('2d');
    function drawTarget() {
      ctx.clearRect(0, 0, 400, 400);
      ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--bg').trim() || '#f5f7f5';
      ctx.fillRect(0, 0, 400, 400);
      const cx = 200, cy = 200;
      [180, 140, 100, 60, 20].forEach((r, i) => {
        ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.fillStyle = ['#e8f5e9', '#c8e6c9', '#a5d6a7', '#81c784', '#66bb6a'][i];
        ctx.fill();
        ctx.strokeStyle = '#43a047'; ctx.lineWidth = 1; ctx.stroke();
      });
      ctx.beginPath(); ctx.moveTo(cx, cy - 190); ctx.lineTo(cx, cy + 190); ctx.strokeStyle = '#aaa'; ctx.lineWidth = 0.5; ctx.stroke();
      ctx.beginPath(); ctx.moveTo(cx - 190, cy); ctx.lineTo(cx + 190, cy); ctx.stroke();
      const club = document.getElementById('sg25ShotClub').value;
      const clubShots = shots.filter(s => s.club === club);
      clubShots.forEach(s => {
        ctx.beginPath(); ctx.arc(s.x, s.y, 5, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(198,40,40,.7)'; ctx.fill();
        ctx.strokeStyle = '#fff'; ctx.lineWidth = 1; ctx.stroke();
      });
      ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--text').trim() || '#1a1a1a';
      ctx.font = 'bold 12px sans-serif'; ctx.textAlign = 'center';
      ctx.fillText(club + ' 샷 분포 (' + clubShots.length + '회)', 200, 20);
      renderShotStats(clubShots);
    }
    canvas.onclick = e => {
      const rect = canvas.getBoundingClientRect();
      const scaleX = 400 / rect.width;
      const scaleY = 400 / rect.height;
      const x = (e.clientX - rect.left) * scaleX;
      const y = (e.clientY - rect.top) * scaleY;
      const club = document.getElementById('sg25ShotClub').value;
      shots.push({ club, x: Math.round(x), y: Math.round(y), date: new Date().toISOString().slice(0, 10) });
      if (shots.length > 200) shots.shift();
      LS('shot_patterns', shots);
      sfx('shot_record');
      if (shots.length >= 10) checkAch('shot_analyzer');
      document.getElementById('sg25ShotCount').textContent = '기록: ' + shots.length + '회';
      drawTarget();
    };
    document.getElementById('sg25ShotClub').onchange = drawTarget;
    document.getElementById('sg25ShotClear').onclick = () => {
      const club = document.getElementById('sg25ShotClub').value;
      const filtered = shots.filter(s => s.club !== club);
      shots.length = 0; filtered.forEach(s => shots.push(s));
      LS('shot_patterns', shots);
      drawTarget();
    };
    drawTarget();
  }
  function renderShotStats(clubShots) {
    const div = document.getElementById('sg25ShotStats');
    if (!div || clubShots.length < 2) { if (div) div.innerHTML = ''; return; }
    const avgX = clubShots.reduce((a, s) => a + s.x, 0) / clubShots.length;
    const avgY = clubShots.reduce((a, s) => a + s.y, 0) / clubShots.length;
    const dispersion = Math.sqrt(clubShots.reduce((a, s) => a + (s.x - avgX) ** 2 + (s.y - avgY) ** 2, 0) / clubShots.length);
    const biasX = avgX - 200 > 0 ? '우측' : '좌측';
    const biasY = avgY - 200 > 0 ? '짧음' : '김';
    div.innerHTML = '<div class="sg25-grid3"><div class="sg25-stat"><div class="v">' + dispersion.toFixed(0) + '</div><div class="l">분산도</div></div><div class="sg25-stat"><div class="v">' + biasX + '</div><div class="l">좌우 편향</div></div><div class="sg25-stat"><div class="v">' + biasY + '</div><div class="l">장단 편향</div></div></div>';
  }

  // ========== 9. Golf IQ v9 Quiz ==========
  const QUIZ_V9 = [
    { q: '골프에서 &quot;GUR&quot;은 무엇의 약자인가?', o: ['Ground Under Repair', 'Green Under Rules', 'Golf Unified Rating', 'General Use Region'], a: 0 },
    { q: '프로 투어에서 평균 드라이버 비거리는 약 몇 야드인가?', o: ['250', '275', '300', '325'], a: 2 },
    { q: '스윙에서 &quot;레이트 히트&quot;의 반대 개념은?', o: ['얼리 히트', '퍼 히트', '슬라이스 히트', '탑 힐'], a: 0 },
    { q: '골프공의 듬플 수는 보통 몇 개인가?', o: ['252~320', '332~392', '392~432', '432~500'], a: 1 },
    { q: '그린 리딩에서 &quot;브레이크&quot;란?', o: ['공이 굴러가는 휘어지는 방향', '그린의 경사도', '퍼팅 스피드', '홀의 위치'], a: 0 },
    { q: 'PGA 투어에서 &quot;페덕스컵&quot;은 어떤 대회인가?', o: ['미국 vs 유럽 라이더컵', '미국 vs 세계 대항전', '아시아 vs 유럽', '미국 vs 호주'], a: 1 },
    { q: '골프 클럽의 &quot;라이각&quot;은 무엇을 의미하는가?', o: ['클럽헤드와 샤프트의 각도', '샷의 발사각', '볼의 비행 각도', '그립 각도'], a: 0 },
    { q: '골프에서 &quot;프로비전널&quot;은 어떤 샷을 말하는가?', o: ['그린 주변 30야드 이내의 샷', '티샷', '퍼팅', '벙커 샷'], a: 0 },
    { q: 'WHS에서 핸디캡 계산 시 최저 필요 라운드 수는?', o: ['3라운드', '5라운드', '10라운드', '20라운드'], a: 0 },
    { q: '골프에서 &quot;레이업&quot;이란 어떤 전략인가?', o: ['그린 직공 대신 안전하게 샷하기', '풀샷으로 밀어붙이기', '벙커 넘기기', '볼을 높이 띄우기'], a: 0 },
    { q: '골프 스윙에서 &quot;테이크어웨이&quot;는 어느 구간인가?', o: ['어드레스에서 탑까지', '탑에서 다운스윙까지', '임팩트에서 팔로스루까지', '파니시까지'], a: 0 },
    { q: '골프에서 &quot;알바트로스&quot;는 파 대비 몇 타 적은 것인가?', o: ['1타', '2타', '3타', '4타'], a: 2 },
    { q: '골프 코스의 &quot;슬로프 레이팅 113&quot;의 의미는?', o: ['보기 골퍼의 기준 난이도', '코스의 총 길이', '그린의 평균 경사도', '평균 라운드 시간'], a: 0 },
    { q: '골프에서 &quot;도그레그 홈&quot;이란?', o: ['페어웨이가 꿔이는 홀', '물이 있는 홀', '벙커가 많은 홀', '내리막이 있는 홀'], a: 0 },
    { q: '골프 클럽의 &quot;바운스 각도&quot;는 어떤 클럽에 중요한가?', o: ['웨지', '드라이버', '퍼터', '아이언'], a: 0 }
  ];

  SGV25.quizState = { current: 0, score: 0, answered: false };
  createOverlay('sg25Quiz', 'Golf IQ v9 퀸즈', '#0d47a1,#1976d2', 'fa-brain');
  function renderQuiz() {
    trackFeature('quiz');
    SGV25.quizState = { current: 0, score: 0, answered: false };
    showQuizQ();
  }
  function showQuizQ() {
    const body = document.getElementById('sg25QuizBody');
    const s = SGV25.quizState;
    if (s.current >= QUIZ_V9.length) {
      const pct = Math.round(s.score / QUIZ_V9.length * 100);
      const grade = pct >= 90 ? 'S' : pct >= 70 ? 'A' : pct >= 50 ? 'B' : pct >= 30 ? 'C' : 'D';
      checkAch('iq_v9_done');
      body.innerHTML = '<div style="text-align:center"><div style="font-size:36px;margin-bottom:8px">\u{1F3C6}</div><h3 style="margin-bottom:12px">Golf IQ v9 결과</h3><div class="sg25-stat"><div class="v" style="font-size:28px">' + s.score + '/' + QUIZ_V9.length + '</div><div class="l">정답 (' + pct + '% / ' + grade + '등급)</div></div><button class="sg25-btn sg25-btn-primary" style="margin-top:16px" onclick="window._sg25ReQuiz()">다시 풀기</button></div>';
      return;
    }
    const q = QUIZ_V9[s.current];
    body.innerHTML = '<div style="display:flex;justify-content:space-between;margin-bottom:12px"><span class="sg25-badge sg25-badge-blue">Q' + (s.current + 1) + '/' + QUIZ_V9.length + '</span><span style="font-size:12px;font-weight:700;color:var(--primary)">' + s.score + '점</span></div><div class="sg25-quiz-q">' + q.q + '</div>' + q.o.map((opt, i) => '<div class="sg25-quiz-opt" data-idx="' + i + '" onclick="window._sg25Answer(' + i + ')">' + opt + '</div>').join('');
    s.answered = false;
  }
  window._sg25Answer = function(idx) {
    const s = SGV25.quizState;
    if (s.answered) return;
    s.answered = true;
    const q = QUIZ_V9[s.current];
    const opts = document.querySelectorAll('.sg25-quiz-opt');
    opts.forEach((o, i) => {
      if (i === q.a) o.classList.add('correct');
      if (i === idx && idx !== q.a) o.classList.add('wrong');
    });
    if (idx === q.a) { s.score++; sfx('quiz_correct'); }
    setTimeout(() => { s.current++; showQuizQ(); }, 1000);
  };
  window._sg25ReQuiz = function() { renderQuiz(); };

  // ========== FAB Buttons ==========
  const fabs = [
    { id: 'sg25MentalFab', icon: '\u{1F9E0}', title: '멘탈 코칭', overlay: 'sg25Mental', render: renderMental },
    { id: 'sg25HeatFab', icon: '\u{1F525}', title: '연습 히트맵', overlay: 'sg25Heat', render: renderHeat },
    { id: 'sg25CondFab', icon: '\u{1F4CB}', title: '코스 컨디션', overlay: 'sg25Cond', render: renderCond },
    { id: 'sg25HcpFab', icon: '\u{1F4C8}', title: '핸디캡 추이', overlay: 'sg25Hcp', render: renderHcp },
    { id: 'sg25TournFab', icon: '\u{1F3C6}', title: '토너먼트', overlay: 'sg25Tourn', render: renderTourn },
    { id: 'sg25TempoFab', icon: '\u{1F3B5}', title: '스윙 템포', overlay: 'sg25Tempo', render: renderTempo },
    { id: 'sg25FitFab', icon: '\u{1F4AA}', title: '체력 테스트', overlay: 'sg25Fit', render: renderFit },
    { id: 'sg25ShotFab', icon: '\u{1F3AF}', title: '샷 패턴', overlay: 'sg25Shot', render: renderShot }
  ];

  fabs.forEach(f => {
    const btn = document.createElement('button');
    btn.id = f.id;
    btn.className = 'sg25-fab';
    btn.title = f.title;
    btn.textContent = f.icon;
    btn.onclick = () => {
      f.render();
      document.getElementById(f.overlay).classList.add('active');
    };
    document.body.appendChild(btn);
  });

  // ========== Quiz FAB (integrated into main) ==========
  const quizFab = document.createElement('button');
  quizFab.className = 'sg25-fab';
  quizFab.id = 'sg25QuizFab';
  quizFab.style.cssText = 'position:fixed;left:12px;bottom:180px;z-index:94;width:44px;height:44px;border-radius:50%;border:none;color:#fff;font-size:17px;box-shadow:0 3px 12px rgba(0,0,0,.25);cursor:pointer;background:linear-gradient(135deg,#0d47a1,#1976d2)';
  quizFab.title = 'Golf IQ v9';
  quizFab.textContent = '\u{1F9E0}';
  quizFab.onclick = () => { renderQuiz(); document.getElementById('sg25Quiz').classList.add('active'); };
  document.body.appendChild(quizFab);

  // ========== Keyboard Shortcuts ==========
  document.addEventListener('keydown', e => {
    if (['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)) return;
    if (!e.shiftKey) return;
    const map = {
      'M': () => { renderMental(); document.getElementById('sg25Mental').classList.add('active'); },
      'H': () => { renderHeat(); document.getElementById('sg25Heat').classList.add('active'); },
      'J': () => { renderCond(); document.getElementById('sg25Cond').classList.add('active'); },
      'Y': () => { renderHcp(); document.getElementById('sg25Hcp').classList.add('active'); },
      'O': () => { renderTourn(); document.getElementById('sg25Tourn').classList.add('active'); },
      'U': () => { renderTempo(); document.getElementById('sg25Tempo').classList.add('active'); },
      'F': () => { renderFit(); document.getElementById('sg25Fit').classList.add('active'); },
      'Q': () => { renderQuiz(); document.getElementById('sg25Quiz').classList.add('active'); }
    };
    if (map[e.key]) { e.preventDefault(); map[e.key](); }
  });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') document.querySelectorAll('.sg25-overlay.active').forEach(o => o.classList.remove('active')); });

  // ========== Init ==========
  console.log('[SmartGolf v25] Loaded: Mental Coaching, Practice Heatmap, Course Condition, Handicap Trend, Tournament, Swing Tempo, Fitness Test, Shot Pattern, Golf IQ v9, +12 Achievements, +12 SFX, +8 Keyboard Shortcuts');

})();
