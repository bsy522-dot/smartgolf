/* ====================================================================
 * SmartGolf v24.0 patch — 실시간 날씨·구름 고도화 + 골프 적합도 + 날씨기반 추천 + 공식예약 직접연결
 * - fetchWeather/renderWeather 오버라이드: 구름량·시간별(12h)·7일·풍속·습도·적합도 점수
 * - "오늘 라운드 좋은 골프장" 날씨기반 추천
 * - 모달 예약버튼: 온라인 예약(book) + 공식 홈페이지(site), 김캐디 제거
 * 데이터(courses_enriched.json)에 site/book/closed 필드가 추가됨(v24 데이터검증)
 * ==================================================================== */
(function () {
  'use strict';

  // ---------- CSS ----------
  const css = `
/* v7_patch 중복 날씨위젯(현재 코스 날씨) 숨김 — v24 종합 날씨로 대체 */
#modalBody div[style*="#e3f2fd"][style*="#bbdefb"]{display:none !important}
.wx-section{margin-top:14px;border:1px solid var(--border);border-radius:12px;overflow:hidden}
.wx-head{display:flex;align-items:center;justify-content:space-between;gap:8px;padding:10px 14px;background:linear-gradient(135deg,#1565c0,#42a5f5);color:#fff}
.wx-head .wx-title{font-weight:700;font-size:13px;display:flex;align-items:center;gap:6px}
.wx-now{display:flex;align-items:center;gap:12px;padding:14px;flex-wrap:wrap}
.wx-now .wx-temp{font-size:30px;font-weight:800;color:var(--text)}
.wx-now .wx-ico{font-size:30px}.wx-now .wx-desc{font-size:13px;color:var(--text-muted,var(--text-light))}
.wx-metrics{display:grid;grid-template-columns:repeat(4,1fr);gap:6px;padding:0 14px 12px}
.wx-metric{text-align:center;background:var(--bg);border-radius:8px;padding:8px 4px}
.wx-metric .v{font-weight:700;font-size:15px;color:var(--text)}.wx-metric .l{font-size:10px;color:var(--text-muted,var(--text-light));margin-top:2px}
.wx-score{display:flex;align-items:center;gap:10px;margin:0 14px 12px;padding:10px 14px;border-radius:10px;color:#fff;font-weight:700}
.wx-score .num{font-size:24px;font-weight:800}.wx-score .sub{font-size:11px;opacity:.92;font-weight:600}
.wx-score.good{background:linear-gradient(135deg,#2e7d32,#66bb6a)}.wx-score.ok{background:linear-gradient(135deg,#f9a825,#fdd835);color:#3e2723}.wx-score.bad{background:linear-gradient(135deg,#c62828,#ef5350)}
.wx-hourly{display:flex;gap:6px;overflow-x:auto;padding:0 14px 12px;-webkit-overflow-scrolling:touch}
.wx-hr{flex:0 0 auto;width:54px;text-align:center;background:var(--bg);border-radius:8px;padding:8px 2px}
.wx-hr .h{font-size:10px;color:var(--text-muted,var(--text-light))}.wx-hr .i{font-size:16px;margin:3px 0}.wx-hr .t{font-size:12px;font-weight:700;color:var(--text)}
.wx-hr .pop{font-size:9px;color:#1565c0;font-weight:600}.wx-hr .cc{font-size:9px;color:var(--text-muted,var(--text-light))}
.wx-daily{padding:4px 14px 14px}
.wx-day{display:grid;grid-template-columns:46px 28px 1fr auto;align-items:center;gap:8px;padding:5px 0;border-top:1px solid var(--border);font-size:12px}
.wx-day .dn{color:var(--text-muted,var(--text-light))}.wx-day .di{text-align:center}.wx-day .dp{color:#1565c0;font-size:11px}
.wx-day .dt{font-weight:700;color:var(--text);text-align:right}.wx-day .dt .lo{color:var(--text-muted,var(--text-light));font-weight:400}
.wx-src{font-size:10px;color:var(--text-muted,var(--text-light));text-align:right;padding:0 14px 10px}
.modal-btn-official{background:#ede7f6;color:#5e35b1}
.wx-rec-row{display:flex;align-items:center;gap:10px;padding:9px 6px;border-top:1px solid var(--border);cursor:pointer}
.card-wx{display:inline-flex;align-items:center;gap:3px;font-size:11px;font-weight:700;padding:2px 7px;border-radius:10px;margin-left:4px}
.card-wx.good{background:#e8f5e9;color:#2e7d32}.card-wx.ok{background:#fff8e1;color:#f57f17}.card-wx.bad{background:#ffebee;color:#c62828}
#wxRecFab{position:fixed;right:16px;bottom:150px;z-index:95;width:50px;height:50px;border-radius:50%;border:none;background:linear-gradient(135deg,#1565c0,#42a5f5);color:#fff;font-size:20px;box-shadow:0 4px 14px rgba(21,101,192,.4);cursor:pointer}
`;
  const st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);

  // ---------- 날씨 코어 ----------
  const WX_MEM = {}; const WX_TTL = 60 * 60 * 1000;
  function wxKey(lat, lng) { return 'wx_' + lat.toFixed(2) + '_' + lng.toFixed(2); }
  function wxCodeInfo(code) {
    const m = {0:['fa-sun','맑음','#f9a825'],1:['fa-cloud-sun','대체로 맑음','#f9a825'],2:['fa-cloud-sun','부분 흐림','#90a4ae'],3:['fa-cloud','흐림','#78909c'],45:['fa-smog','안개','#90a4ae'],48:['fa-smog','짙은 안개','#90a4ae'],51:['fa-cloud-rain','약한 이슬비','#4fc3f7'],53:['fa-cloud-rain','이슬비','#4fc3f7'],55:['fa-cloud-rain','짙은 이슬비','#29b6f6'],56:['fa-cloud-rain','어는 이슬비','#4fc3f7'],57:['fa-cloud-rain','어는 이슬비','#29b6f6'],61:['fa-cloud-showers-heavy','약한 비','#42a5f5'],63:['fa-cloud-showers-heavy','비','#2196f3'],65:['fa-cloud-showers-heavy','강한 비','#1565c0'],66:['fa-cloud-rain','어는 비','#42a5f5'],67:['fa-cloud-rain','어는 비','#1565c0'],71:['fa-snowflake','약한 눈','#90caf9'],73:['fa-snowflake','눈','#64b5f6'],75:['fa-snowflake','강한 눈','#42a5f5'],77:['fa-snowflake','싸락눈','#90caf9'],80:['fa-cloud-showers-heavy','소나기','#42a5f5'],81:['fa-cloud-showers-heavy','소나기','#2196f3'],82:['fa-cloud-showers-heavy','강한 소나기','#1565c0'],85:['fa-snowflake','소낙눈','#64b5f6'],86:['fa-snowflake','강한 소낙눈','#42a5f5'],95:['fa-cloud-bolt','뇌우','#7e57c2'],96:['fa-cloud-bolt','뇌우·우박','#7e57c2'],99:['fa-cloud-bolt','강한 뇌우','#5e35b1']};
    return m[code] || ['fa-cloud','-','#90a4ae'];
  }
  function golfScore(rain, wind, tmax, tmin, code) {
    let s = 100; s -= (rain || 0) * 0.7;
    if (wind > 6) s -= (wind - 6) * 4;
    if (tmax > 30) s -= (tmax - 30) * 2.5;
    if (tmax < 8) s -= (8 - tmax) * 2.2;
    if (tmin < 3) s -= (3 - tmin) * 2;
    if ([95,96,99].includes(code)) s -= 50;
    else if ([71,73,75,77,85,86].includes(code)) s -= 38;
    else if ([65,67,82].includes(code)) s -= 32;
    else if ([61,63,80,81].includes(code)) s -= 18;
    else if ([45,48].includes(code)) s -= 10;
    s = Math.max(0, Math.min(100, Math.round(s)));
    let cls, label;
    if (s >= 75) { cls = 'good'; label = '라운드 최적'; }
    else if (s >= 50) { cls = 'ok'; label = '무난'; }
    else { cls = 'bad'; label = '비추천'; }
    return { score: s, cls, label };
  }
  function scoreToday(w) {
    if (!w || !w.daily || !w.daily.precipitation_probability_max) return null;
    const d = w.daily;
    return golfScore(d.precipitation_probability_max[0], d.wind_speed_10m_max ? d.wind_speed_10m_max[0] : 0, d.temperature_2m_max[0], d.temperature_2m_min[0], d.weather_code[0]);
  }
  async function getGolfWeather(lat, lng) {
    const k = wxKey(lat, lng);
    if (WX_MEM[k] && Date.now() - WX_MEM[k]._t < WX_TTL) return WX_MEM[k];
    try { const c = JSON.parse(localStorage.getItem(k) || 'null'); if (c && Date.now() - c._t < WX_TTL) { WX_MEM[k] = c; return c; } } catch (e) {}
    const url = 'https://api.open-meteo.com/v1/forecast?latitude=' + lat + '&longitude=' + lng +
      '&current=temperature_2m,relative_humidity_2m,precipitation,weather_code,cloud_cover,wind_speed_10m' +
      '&hourly=temperature_2m,precipitation_probability,weather_code,cloud_cover,wind_speed_10m' +
      '&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,wind_speed_10m_max' +
      '&timezone=Asia%2FSeoul&wind_speed_unit=ms&forecast_days=7';
    const r = await fetch(url); if (!r.ok) throw new Error('wx');
    const data = await r.json(); data._t = Date.now();
    WX_MEM[k] = data; try { localStorage.setItem(k, JSON.stringify(data)); } catch (e) {}
    return data;
  }

  const DOW = ['일','월','화','수','목','금','토'];
  function renderWeatherHTML(w) {
    if (!w || !w.current) return '<div class="weather-loading">날씨 정보를 불러올 수 없습니다</div>';
    const cur = w.current, d = w.daily, h = w.hourly;
    const ci = wxCodeInfo(cur.weather_code); const sc = scoreToday(w);
    let si = 0; for (let i = 0; i < h.time.length; i++) { if (h.time[i] >= cur.time) { si = i; break; } }
    let hourly = '';
    for (let i = si; i < Math.min(si + 12, h.time.length); i++) {
      const hi = wxCodeInfo(h.weather_code[i]);
      hourly += '<div class="wx-hr"><div class="h">' + h.time[i].slice(11, 13) + '시</div><div class="i"><i class="fas ' + hi[0] + '" style="color:' + hi[2] + '"></i></div><div class="t">' + Math.round(h.temperature_2m[i]) + '°</div><div class="pop"><i class="fas fa-umbrella" style="font-size:8px"></i> ' + (h.precipitation_probability[i] ?? 0) + '%</div><div class="cc"><i class="fas fa-cloud" style="font-size:8px"></i> ' + (h.cloud_cover[i] ?? 0) + '%</div></div>';
    }
    let daily = '';
    for (let i = 0; i < d.time.length; i++) {
      const di = wxCodeInfo(d.weather_code[i]); const dt = new Date(d.time[i] + 'T00:00:00');
      const dn = i === 0 ? '오늘' : i === 1 ? '내일' : DOW[dt.getDay()] + '요일';
      daily += '<div class="wx-day"><span class="dn">' + dn + '</span><span class="di"><i class="fas ' + di[0] + '" style="color:' + di[2] + '"></i></span><span class="dp"><i class="fas fa-umbrella" style="font-size:9px"></i> ' + (d.precipitation_probability_max[i] ?? 0) + '%</span><span class="dt">' + Math.round(d.temperature_2m_max[i]) + '° <span class="lo">/ ' + Math.round(d.temperature_2m_min[i]) + '°</span></span></div>';
    }
    return '<div class="wx-section"><div class="wx-head"><span class="wx-title"><i class="fas fa-cloud-sun"></i> 실시간 날씨 · 7일 예보</span><span style="font-size:11px;opacity:.9">구름·강수·바람</span></div>' +
      '<div class="wx-now"><span class="wx-ico"><i class="fas ' + ci[0] + '" style="color:' + ci[2] + '"></i></span><span class="wx-temp">' + Math.round(cur.temperature_2m) + '°</span><span class="wx-desc">' + ci[1] + '</span></div>' +
      '<div class="wx-metrics"><div class="wx-metric"><div class="v">' + cur.cloud_cover + '%</div><div class="l"><i class="fas fa-cloud"></i> 구름</div></div><div class="wx-metric"><div class="v">' + (cur.precipitation ?? 0) + 'mm</div><div class="l"><i class="fas fa-droplet"></i> 강수</div></div><div class="wx-metric"><div class="v">' + (cur.wind_speed_10m ?? 0).toFixed(1) + '</div><div class="l"><i class="fas fa-wind"></i> 바람m/s</div></div><div class="wx-metric"><div class="v">' + cur.relative_humidity_2m + '%</div><div class="l"><i class="fas fa-water"></i> 습도</div></div></div>' +
      (sc ? '<div class="wx-score ' + sc.cls + '"><span class="num">' + sc.score + '</span><span><div>오늘 골프 적합도 — ' + sc.label + '</div><div class="sub">강수확률·바람·기온·날씨 종합 (100점 만점)</div></span></div>' : '') +
      '<div class="wx-hourly">' + hourly + '</div><div class="wx-daily">' + daily + '</div><div class="wx-src">출처: Open-Meteo 기상예보</div></div>';
  }

  // v23의 fetchWeather/renderWeather 오버라이드 (detailWeather 컨테이너 그대로 사용)
  window.fetchWeather = function (lat, lng) { return getGolfWeather(lat, lng).catch(() => null); };
  window.renderWeather = function (containerId, data) {
    const el = document.getElementById(containerId); if (!el) return;
    el.innerHTML = renderWeatherHTML(data);
  };

  // ---------- 모달 예약버튼(온라인예약·공식홈) + 김캐디 제거 ----------
  const _prevShowDetail = window.showDetail;
  window.showDetail = function (c) {
    if (typeof _prevShowDetail === 'function') _prevShowDetail(c);
    const ma = document.getElementById('modalActions'); if (!ma) return;
    // 김캐디(스크린골프용·이름 딥링크 불가) 제거
    ma.querySelectorAll('a[href*="kimcaddie"]').forEach(a => a.remove());
    // 온라인예약(book) + 공식홈(site) prepend
    let add = '';
    if (c && c.site) add += '<a class="modal-btn modal-btn-official" href="' + c.site + '" target="_blank"><i class="fas fa-globe"></i> 공식 홈페이지</a>';
    if (c && c.book) add = '<a class="modal-btn modal-btn-primary" href="' + c.book + '" target="_blank"><i class="fas fa-calendar-check"></i> 온라인 예약</a>' + add;
    if (add) ma.insertAdjacentHTML('afterbegin', add);
  };

  // ---------- 날씨기반 추천 ----------
  async function mapLimit(arr, limit, fn) {
    const ret = []; let i = 0;
    const run = async () => { while (i < arr.length) { const idx = i++; try { ret[idx] = await fn(arr[idx], idx); } catch (e) { ret[idx] = null; } } };
    await Promise.all(Array(Math.min(limit, arr.length)).fill(0).map(run));
    return ret;
  }
  let recBusy = false;
  async function showWeatherRec() {
    if (recBusy) return; recBusy = true;
    const all = (typeof allCourses !== 'undefined' && allCourses.length) ? allCourses : [];
    const base = (typeof filtered !== 'undefined' && filtered && filtered.length) ? filtered : all;
    const seen = new Set();
    const cand = base.filter(c => c.lat && c.lng && !c.closed).slice().sort((a, b) => (b.rt || 0) - (a.rt || 0)).filter(c => !seen.has(c.n) && seen.add(c.n)).slice(0, 30);
    let ov = document.getElementById('wxRecOverlay');
    if (!ov) {
      ov = document.createElement('div'); ov.id = 'wxRecOverlay'; ov.className = 'modal-overlay';
      ov.innerHTML = '<div class="modal" style="max-width:560px"><div class="modal-header"><h2><i class="fas fa-cloud-sun"></i> 오늘 라운드 좋은 골프장</h2><button class="modal-close" id="wxRecClose">&times;</button></div><div class="modal-body" id="wxRecBody"></div></div>';
      document.body.appendChild(ov);
      ov.addEventListener('click', e => { if (e.target === ov) ov.classList.remove('active'); });
      document.getElementById('wxRecClose').addEventListener('click', () => ov.classList.remove('active'));
    }
    const body = document.getElementById('wxRecBody');
    const scope = (base === all) ? '전국 평점 상위' : '검색결과';
    body.innerHTML = '<div class="weather-loading"><i class="fas fa-spinner fa-spin"></i> ' + scope + ' ' + cand.length + '개 골프장 날씨 분석 중...</div>';
    ov.classList.add('active');
    const res = await mapLimit(cand, 8, async c => { const w = await getGolfWeather(c.lat, c.lng); return { c, w, sc: scoreToday(w) }; });
    const ranked = res.filter(x => x && x.w && x.sc).sort((a, b) => b.sc.score - a.sc.score);
    if (!ranked.length) { body.innerHTML = '<div class="weather-loading">날씨 정보를 불러올 수 없습니다</div>'; recBusy = false; return; }
    body.innerHTML = '<div style="font-size:12px;color:var(--text-muted,var(--text-light));margin-bottom:10px">' + scope + ' 골프장의 <b>오늘</b> 날씨를 분석해 라운드 적합도 순으로 정렬했습니다.</div>' +
      ranked.slice(0, 12).map((x, i) => {
        const ci = wxCodeInfo(x.w.current.weather_code); const safe = x.c.n.replace(/'/g, "\\'");
        return '<div class="wx-rec-row" data-name="' + x.c.n.replace(/"/g, '&quot;') + '"><span style="width:22px;text-align:center;font-weight:800;color:var(--text-muted,var(--text-light))">' + (i + 1) + '</span><span class="card-wx ' + x.sc.cls + '" style="min-width:42px;justify-content:center">' + x.sc.score + '</span><span style="flex:1;min-width:0"><div style="font-weight:700;font-size:14px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">' + x.c.n + '</div><div style="font-size:11px;color:var(--text-muted,var(--text-light))">' + x.c.r + ' ' + (x.c.c || '') + (x.c.rt ? ' · 평점 ' + x.c.rt.toFixed(1) : '') + '</div></span><span style="text-align:right;font-size:12px"><div><i class="fas ' + ci[0] + '" style="color:' + ci[2] + '"></i> ' + Math.round(x.w.current.temperature_2m) + '°</div><div style="font-size:10px;color:var(--text-muted,var(--text-light))"><i class="fas fa-cloud"></i> ' + x.w.current.cloud_cover + '% · <i class="fas fa-umbrella"></i> ' + (x.w.daily.precipitation_probability_max[0] ?? 0) + '%</div></span></div>';
      }).join('');
    body.querySelectorAll('.wx-rec-row').forEach(row => row.addEventListener('click', () => {
      ov.classList.remove('active');
      const c = (typeof allCourses !== 'undefined' ? allCourses : []).find(z => z.n === row.dataset.name);
      if (c && typeof showDetail === 'function') showDetail(c);
    }));
    recBusy = false;
  }
  window.showWeatherRec = showWeatherRec;

  // 플로팅 버튼
  function addFab() {
    if (document.getElementById('wxRecFab')) return;
    const b = document.createElement('button');
    b.id = 'wxRecFab'; b.title = '오늘 라운드 좋은 골프장 (날씨)';
    b.innerHTML = '<i class="fas fa-cloud-sun-rain"></i>';
    b.addEventListener('click', showWeatherRec);
    document.body.appendChild(b);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', addFab);
  else addFab();
})();
