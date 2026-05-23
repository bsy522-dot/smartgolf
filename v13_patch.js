(function(){
'use strict';

// === SmartGolf v13.0 Patch ===
// 1. 코스 매니지먼트 전략 (상황별 의사결정 가이드)
// 2. 핸디캡 인덱스 계산기 (USGA 방식)
// 3. 골프 영양 가이드 (라운드 전/중/후 식단)
// 4. 퍼팅 분석기 (거리별 성공률 시뮬레이터)
// 5. 골프 챌린지 시스템 (일일/주간 미션+보상)
// 6. 라운드 통계 고급 차트 (월별 트렌드)
// 7. 클럽 사용 분석 (사용빈도+거리편차)
// 8. 골프 명언 & 동기부여 (50개 일별 로테이션)
// 9. 코스 난이도 분석기 (슬로프/레이팅)
// 10. 월간 골프 종합 체크업

// --- CSS ---
var css13 = document.createElement('style');
css13.textContent = `
.v13-overlay{position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,.78);z-index:10030;display:none;align-items:center;justify-content:center;backdrop-filter:blur(10px)}
.v13-overlay.active{display:flex}
.v13-modal{background:var(--card-bg,#fff);border-radius:24px;padding:28px;width:95%;max-width:720px;max-height:92vh;overflow-y:auto;box-shadow:0 32px 100px rgba(0,0,0,.5);animation:v13Rise .4s cubic-bezier(.22,1,.36,1)}
@keyframes v13Rise{from{opacity:0;transform:translateY(40px) scale(.94)}to{opacity:1;transform:translateY(0) scale(1)}}
.v13-hdr{display:flex;justify-content:space-between;align-items:center;margin-bottom:18px}
.v13-hdr h2{font-size:21px;font-weight:800;display:flex;align-items:center;gap:10px}
.v13-hdr h2 .v13i{font-size:26px}
.v13-x{background:none;border:none;font-size:26px;cursor:pointer;color:var(--text-muted);padding:4px 10px;border-radius:10px;transition:.2s}
.v13-x:hover{background:var(--border);color:var(--text)}
.v13-tabs{display:flex;gap:6px;margin-bottom:16px;overflow-x:auto;padding-bottom:4px;scrollbar-width:none}
.v13-tabs::-webkit-scrollbar{display:none}
.v13-tab{padding:9px 18px;border-radius:24px;border:1.5px solid var(--border);background:var(--bg);font-size:12px;font-weight:700;cursor:pointer;white-space:nowrap;transition:.25s}
.v13-tab.active{background:var(--primary);color:#fff;border-color:var(--primary);box-shadow:0 3px 12px rgba(26,122,58,.35)}
.v13-card{background:var(--bg);border-radius:16px;padding:18px;margin-bottom:12px;transition:.25s;border:1.5px solid transparent}
.v13-card:hover{border-color:var(--primary);transform:translateY(-2px);box-shadow:0 4px 16px rgba(26,122,58,.12)}
.v13-card h4{font-size:15px;font-weight:700;margin-bottom:8px;display:flex;align-items:center;gap:8px}
.v13-card p{font-size:12px;color:var(--text-muted);line-height:1.7}
.v13-btn{padding:11px 22px;border:none;border-radius:14px;font-size:13px;font-weight:700;cursor:pointer;transition:.25s;display:inline-flex;align-items:center;gap:6px}
.v13-btn-primary{background:linear-gradient(135deg,var(--primary),#34a853);color:#fff}
.v13-btn-primary:hover{transform:translateY(-2px);box-shadow:0 8px 20px rgba(26,122,58,.4)}
.v13-btn-sm{padding:7px 14px;font-size:11px;border-radius:10px}
.v13-btn-secondary{background:var(--bg);color:var(--text);border:1.5px solid var(--border)}
.v13-btn-secondary:hover{border-color:var(--primary);color:var(--primary)}
.v13-grid2{display:grid;grid-template-columns:1fr 1fr;gap:12px}
.v13-grid3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px}
@media(max-width:500px){.v13-grid2,.v13-grid3{grid-template-columns:1fr}}
.v13-divider{height:1px;background:var(--border);margin:16px 0}
.v13-badge{display:inline-block;padding:4px 12px;border-radius:14px;font-size:11px;font-weight:700}
.v13-progress{width:100%;height:10px;background:var(--border);border-radius:5px;overflow:hidden;margin:8px 0}
.v13-progress-fill{height:100%;border-radius:5px;transition:width .6s ease}
.v13-stat-row{display:flex;justify-content:space-between;align-items:center;padding:12px 0;border-bottom:1px solid var(--border)}
.v13-stat-row:last-child{border-bottom:none}
.v13-stat-label{font-size:13px;font-weight:600}
.v13-stat-value{font-size:16px;font-weight:800;color:var(--primary)}
.v13-quote-box{background:linear-gradient(135deg,#1a7a3a,#34a853);color:#fff;border-radius:20px;padding:24px;margin-bottom:16px;position:relative;overflow:hidden}
.v13-quote-box::before{content:'\\201C';position:absolute;top:-10px;left:10px;font-size:120px;opacity:.15;font-family:serif}
.v13-quote-text{font-size:16px;line-height:1.8;font-style:italic;position:relative;z-index:1}
.v13-quote-author{font-size:12px;opacity:.85;margin-top:12px;text-align:right;position:relative;z-index:1}
.v13-challenge-item{display:flex;align-items:center;gap:14px;padding:14px;background:var(--bg);border-radius:14px;margin-bottom:10px;border:1.5px solid transparent;transition:.2s}
.v13-challenge-item.completed{border-color:#34a853;background:rgba(52,168,83,.05)}
.v13-challenge-icon{width:44px;height:44px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:22px;flex-shrink:0}
.v13-challenge-info{flex:1}
.v13-challenge-title{font-size:13px;font-weight:700}
.v13-challenge-desc{font-size:11px;color:var(--text-muted);margin-top:3px}
.v13-challenge-reward{font-size:11px;font-weight:700;color:var(--primary);margin-top:4px}
.v13-challenge-check{width:28px;height:28px;border-radius:50%;border:2px solid var(--border);display:flex;align-items:center;justify-content:center;cursor:pointer;transition:.2s;font-size:14px;flex-shrink:0}
.v13-challenge-check.done{background:var(--primary);border-color:var(--primary);color:#fff}
.v13-putt-zone{display:flex;align-items:center;gap:12px;padding:14px;background:var(--bg);border-radius:14px;margin-bottom:10px}
.v13-putt-dist{font-size:18px;font-weight:800;color:var(--primary);min-width:60px;text-align:center}
.v13-putt-bar{flex:1;height:20px;background:var(--border);border-radius:10px;overflow:hidden;position:relative}
.v13-putt-fill{height:100%;border-radius:10px;transition:width .5s}
.v13-putt-pct{position:absolute;right:8px;top:50%;transform:translateY(-50%);font-size:11px;font-weight:700;color:#fff;text-shadow:0 1px 2px rgba(0,0,0,.3)}
.v13-club-row{display:flex;align-items:center;gap:12px;padding:12px;background:var(--bg);border-radius:12px;margin-bottom:8px}
.v13-club-name{font-size:13px;font-weight:700;min-width:70px}
.v13-club-bar-wrap{flex:1;height:14px;background:var(--border);border-radius:7px;overflow:hidden}
.v13-club-bar{height:100%;border-radius:7px;transition:width .4s}
.v13-club-count{font-size:12px;font-weight:700;color:var(--primary);min-width:35px;text-align:right}
.v13-nutrition-card{background:var(--bg);border-radius:16px;padding:16px;margin-bottom:12px;border-left:4px solid var(--primary)}
.v13-nutrition-card h5{font-size:14px;font-weight:700;margin-bottom:8px;display:flex;align-items:center;gap:8px}
.v13-nutrition-list{list-style:none;padding:0;margin:0}
.v13-nutrition-list li{font-size:12px;color:var(--text-muted);padding:5px 0;border-bottom:1px dashed var(--border);display:flex;align-items:center;gap:6px}
.v13-nutrition-list li:last-child{border-bottom:none}
.v13-difficulty-meter{display:flex;gap:4px;align-items:center}
.v13-diff-dot{width:10px;height:10px;border-radius:50%;background:var(--border)}
.v13-diff-dot.filled{background:var(--primary)}
.v13-canvas-wrap{border-radius:16px;overflow:hidden;margin:16px 0;border:1.5px solid var(--border)}
`;
document.head.appendChild(css13);

// --- SFX ---
var audioCtx13 = null;
function getAudioCtx13(){
  if(!audioCtx13) audioCtx13 = new (window.AudioContext||window.webkitAudioContext)();
  return audioCtx13;
}
function playSFX13(type){
  try{
    var ctx = getAudioCtx13();
    var osc = ctx.createOscillator();
    var gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    var t = ctx.currentTime;
    switch(type){
      case 'strategy':
        osc.type='triangle';osc.frequency.setValueAtTime(523,t);osc.frequency.linearRampToValueAtTime(659,t+.12);
        gain.gain.setValueAtTime(.12,t);gain.gain.exponentialRampToValueAtTime(.001,t+.3);osc.start(t);osc.stop(t+.3);break;
      case 'handicap':
        osc.type='sine';osc.frequency.setValueAtTime(440,t);osc.frequency.linearRampToValueAtTime(880,t+.15);
        gain.gain.setValueAtTime(.1,t);gain.gain.exponentialRampToValueAtTime(.001,t+.35);osc.start(t);osc.stop(t+.35);break;
      case 'nutrition':
        osc.type='sine';osc.frequency.setValueAtTime(392,t);osc.frequency.linearRampToValueAtTime(523,t+.1);osc.frequency.linearRampToValueAtTime(659,t+.2);
        gain.gain.setValueAtTime(.1,t);gain.gain.exponentialRampToValueAtTime(.001,t+.3);osc.start(t);osc.stop(t+.3);break;
      case 'putt':
        osc.type='sine';osc.frequency.setValueAtTime(330,t);osc.frequency.exponentialRampToValueAtTime(660,t+.08);
        gain.gain.setValueAtTime(.12,t);gain.gain.exponentialRampToValueAtTime(.001,t+.25);osc.start(t);osc.stop(t+.25);break;
      case 'challenge':
        osc.type='square';osc.frequency.setValueAtTime(523,t);osc.frequency.setValueAtTime(659,t+.1);osc.frequency.setValueAtTime(784,t+.2);
        gain.gain.setValueAtTime(.08,t);gain.gain.exponentialRampToValueAtTime(.001,t+.4);osc.start(t);osc.stop(t+.4);break;
      case 'quote':
        osc.type='sine';osc.frequency.setValueAtTime(349,t);osc.frequency.linearRampToValueAtTime(440,t+.15);
        gain.gain.setValueAtTime(.08,t);gain.gain.exponentialRampToValueAtTime(.001,t+.35);osc.start(t);osc.stop(t+.35);break;
    }
  }catch(e){}
}

// --- Data ---

// 코스 매니지먼트 전략
var STRATEGIES = [
  {cat:'벙커',icon:'⛳',items:[
    {title:'페어웨이 벙커',desc:'클럽을 1~2단계 올려 선택. 볼 위치를 우측(오른손잡이)으로 약간 이동. 스윙은 3/4로 제어하며 깨끗한 컨택에 집중.',tip:'모래를 먼저 치지 않도록 볼 앞 2cm를 응시'},
    {title:'그린사이드 벙커',desc:'페이스를 약간 오픈하고 볼 뒤 5cm 모래를 목표. 손목 코킹을 충분히 사용하고 팔로스루를 길게 가져간다.',tip:'모래의 양으로 거리 조절 - 많을수록 짧게'},
    {title:'깊은 벙커(립 높음)',desc:'가장 로프트 높은 웨지 사용. 스탠스를 넓히고 체중을 왼발에 60% 이상. 볼을 왼쪽에 놓고 가파른 각도로 스윙.',tip:'탈출이 최우선 - 그린 방향보다 높이를 먼저'}
  ]},
  {cat:'러프',icon:'🌿',items:[
    {title:'라이트 러프 (2~3cm)',desc:'평소보다 1클럽 올려 선택. 스윙은 정상대로 하되 볼이 플라이어로 날 수 있어 착지 후 굴림 계산.',tip:'플라이어 라이에서는 한 클럽 내려서 거리 보정'},
    {title:'딥 러프 (5cm+)',desc:'로프트 높은 클럽(7번 이상) 필수. 가파른 다운스윙으로 풀 저항을 줄이고, 거리 욕심을 버린다.',tip:'페어웨이 복귀가 목표 - 그린 직공은 위험'},
    {title:'젖은 러프',desc:'더 큰 저항이 걸리므로 짧은 클럽 선택. 그립을 단단히 잡아 클럽 회전 방지. 볼이 뜨지 않으면 퍼팅 웨지도 고려.',tip:'비 온 후에는 2클럽 차이까지 날 수 있음'}
  ]},
  {cat:'경사/라이',icon:'⛰️',items:[
    {title:'오르막 라이',desc:'볼이 높게 뜨므로 1~2클럽 길게 선택. 어깨를 경사와 평행하게 맞추고, 왼발 체중 유지. 풀스윙보다는 컨트롤 스윙.',tip:'왼쪽으로 가는 경향 - 목표를 약간 우측으로'},
    {title:'내리막 라이',desc:'볼이 낮게 날아가므로 로프트 높은 클럽. 경사를 따라 스윙하고 볼 위치는 오른쪽. 체중이 앞으로 쏠리지 않게 주의.',tip:'오른쪽으로 가는 경향 - 목표를 약간 좌측으로'},
    {title:'사이드힐 (발 위/아래)',desc:'발보다 볼이 높으면 짧게 잡고 페이드, 낮으면 길게 잡고 드로우 예상. 밸런스 유지가 핵심.',tip:'경사가 심할수록 3/4 스윙으로 안정성 확보'}
  ]},
  {cat:'도그렉/전략',icon:'🗺️',items:[
    {title:'도그렉 좌',desc:'페이드/슬라이스가 안전한 선택. 코너까지 거리를 확인하고 3번 우드나 유틸리티로 코너 앞 안착. 무리한 숏컷은 OB 위험.',tip:'80% 파워로 코너 앞 20m 안착이 가장 안전'},
    {title:'도그렉 우',desc:'드로우가 유리하지만 자신 없으면 직선 티샷 후 세컨드로 공략. 코너 나무 높이를 확인하여 넘길 수 있는지 판단.',tip:'나무 꼭대기가 깃대 높이 아래면 넘길 수 있음'},
    {title:'파5 투온 전략',desc:'세컨드 거리가 220y 이내이고 그린 앞 위험요소가 적을 때만 시도. 그렇지 않으면 레이업 후 정확한 어프로치가 더 높은 버디 확률.',tip:'워터 앞 레이업은 100y가 아닌 80y가 최적'}
  ]},
  {cat:'바람/날씨',icon:'🌬️',items:[
    {title:'맞바람 (10mph+)',desc:'10mph당 약 10y 감소. 1~2클럽 올리고 볼 위치를 약간 뒤로. 낮은 탄도 펀치샷이 효과적. 스핀을 줄이기 위해 3/4 스윙.',tip:'&quot;바람이 강할수록 부드럽게&quot; - 힘주면 스핀 증가'},
    {title:'뒷바람',desc:'10mph당 약 5~7y 증가. 높은 탄도로 바람을 타게 하되 그린 오버 주의. 어프로치는 1클럽 내려서.',tip:'뒷바람에서 퍼팅은 빨라지므로 터치에 주의'},
    {title:'크로스바람',desc:'좌측풍은 우측 조준, 우측풍은 좌측 조준. 바람 세기에 따라 5~15y 보정. 바람을 타는 구질보다 바람에 맞서는 구질이 안전.',tip:'크로스바람 20mph 이상이면 한 홀 전체 전략 수정'}
  ]}
];

// 핸디캡 데이터
var HDCP_TIPS = [
  '최근 20라운드 중 상위 8개의 스코어 차이 평균으로 계산됩니다',
  '코스 레이팅과 슬로프 레이팅을 반영하여 공정한 비교가 가능합니다',
  '핸디캡이 낮을수록 실력이 높다는 의미입니다',
  '월 1회 이상 라운드하면 핸디캡의 정확도가 높아집니다',
  '핸디캡 18 이하: 중급, 10 이하: 상급, 5 이하: 싱글 플레이어'
];

// 골프 영양 가이드
var NUTRITION = {
  before:[
    {icon:'🍞',name:'바나나 + 견과류',desc:'라운드 2시간 전. 탄수화물+건강한 지방으로 에너지 충전.',timing:'2시간 전'},
    {icon:'🥚',name:'삶은 계란 + 토스트',desc:'단백질과 복합 탄수화물로 지구력 있는 에너지 공급.',timing:'2시간 전'},
    {icon:'🍚',name:'오트밀/현미밥',desc:'GI지수 낮은 탄수화물로 혈당을 안정적으로 유지.',timing:'2-3시간 전'},
    {icon:'☕',name:'커피 (적당량)',desc:'카페인이 집중력을 높이지만 과다 섭취는 손떨림 유발. 1~2잔이 적정.',timing:'1시간 전'},
    {icon:'💧',name:'물 500ml',desc:'탈수 방지를 위해 라운드 시작 전 충분한 수분 섭취.',timing:'30분 전'}
  ],
  during:[
    {icon:'🍌',name:'바나나/에너지바',desc:'9홀 사이 간식으로 칼륨 보충. 근육 경련 예방에 효과적.',timing:'9홀 후'},
    {icon:'🧃',name:'스포츠 음료',desc:'땀으로 손실된 전해질 보충. 여름철 필수.',timing:'3홀마다'},
    {icon:'🍎',name:'사과/포도',desc:'천연 당분으로 빠른 에너지 보충. 비타민C도 함께.',timing:'12홀 경'},
    {icon:'🥜',name:'견과류 한줌',desc:'오메가3와 단백질로 후반 집중력 유지.',timing:'6홀, 12홀'},
    {icon:'💧',name:'물 200ml (3홀마다)',desc:'갈증을 느끼기 전에 마시는 것이 핵심. 18홀 동안 총 1.5~2L.',timing:'매 3홀'}
  ],
  after:[
    {icon:'🍗',name:'단백질 식사',desc:'닭가슴살/생선+밥. 근육 회복을 위해 30분 이내 섭취가 이상적.',timing:'30분 이내'},
    {icon:'🥬',name:'채소/샐러드',desc:'항산화 성분이 자외선 노출로 인한 세포 손상 회복을 도움.',timing:'식사 시'},
    {icon:'🍓',name:'과일 스무디',desc:'비타민+탄수화물+수분을 한번에 보충하는 최적의 회복 음료.',timing:'1시간 이내'},
    {icon:'🧊',name:'아이스팩/쿨링',desc:'관절/근육에 피로가 있다면 아이싱 15분으로 염증 예방.',timing:'2시간 이내'},
    {icon:'💧',name:'물/전해질 보충',desc:'라운드 후에도 1시간에 걸쳐 500ml 이상 수분 보충.',timing:'지속'}
  ],
  avoid:[
    {icon:'❌',name:'고지방 패스트푸드',desc:'소화에 에너지를 많이 쓰며 라운드 중 졸음과 둔함 유발.'},
    {icon:'❌',name:'탄산음료/에너지드링크',desc:'혈당 급상승 후 급락으로 집중력 저하.'},
    {icon:'❌',name:'과도한 알코올',desc:'판단력, 조정력, 수분 밸런스 모두 악화.'},
    {icon:'❌',name:'빈속 라운드',desc:'저혈당으로 후반 체력/집중력 급격히 저하.'}
  ]
};

// 퍼팅 분석 데이터 (PGA Tour 평균 기준)
var PUTT_BENCHMARKS = [
  {dist:'1m 이내',pga:99,avg:95,color:'#34a853'},
  {dist:'1.5m',pga:93,avg:82,color:'#4caf50'},
  {dist:'2m',pga:83,avg:68,color:'#66bb6a'},
  {dist:'3m',pga:61,avg:45,color:'#ffa726'},
  {dist:'4m',pga:44,avg:30,color:'#ff9800'},
  {dist:'5m',pga:33,avg:22,color:'#ff7043'},
  {dist:'6m',pga:26,avg:16,color:'#ef5350'},
  {dist:'8m',pga:18,avg:10,color:'#e53935'},
  {dist:'10m+',pga:12,avg:6,color:'#c62828'}
];

// 골프 챌린지
var CHALLENGES = [
  {id:'ch01',title:'오늘의 연습',desc:'연습 드릴 3개 완료하기',reward:'+20 XP',icon:'🏋️',color:'#4caf50'},
  {id:'ch02',title:'라운드 기록',desc:'라운드 기록 1개 추가하기',reward:'+15 XP',icon:'⛳',color:'#2196f3'},
  {id:'ch03',title:'퍼팅 연습',desc:'퍼팅 분석기에서 3m 이하 연습 기록',reward:'+15 XP',icon:'🎯',color:'#ff9800'},
  {id:'ch04',title:'규칙 학습',desc:'골프 룰 5개 이상 읽기',reward:'+10 XP',icon:'📚',color:'#9c27b0'},
  {id:'ch05',title:'코스 탐색',desc:'새로운 골프장 3곳 상세 보기',reward:'+10 XP',icon:'🔍',color:'#00bcd4'},
  {id:'ch06',title:'전략 학습',desc:'코스 매니지먼트 전략 3개 읽기',reward:'+10 XP',icon:'🗺️',color:'#795548'},
  {id:'ch07',title:'장비 점검',desc:'클럽 거리 데이터 업데이트',reward:'+15 XP',icon:'🏌️',color:'#607d8b'},
  {id:'ch08',title:'영양 관리',desc:'라운드 전 영양 가이드 확인',reward:'+10 XP',icon:'🍌',color:'#ff5722'},
  {id:'ch09',title:'스코어 분석',desc:'최근 라운드 통계 확인',reward:'+15 XP',icon:'📊',color:'#3f51b5'},
  {id:'ch10',title:'리뷰 작성',desc:'골프장 리뷰 1개 작성',reward:'+20 XP',icon:'⭐',color:'#ffc107'},
  {id:'ch11',title:'명언 읽기',desc:'오늘의 골프 명언 읽고 저장',reward:'+5 XP',icon:'💬',color:'#e91e63'},
  {id:'ch12',title:'날씨 확인',desc:'이번 주말 골프 날씨 확인',reward:'+10 XP',icon:'☀️',color:'#03a9f4'},
  {id:'ch13',title:'용어 학습',desc:'골프 용어 10개 이상 확인',reward:'+10 XP',icon:'📖',color:'#8bc34a'},
  {id:'ch14',title:'스윙 체크',desc:'스윙 진단 1회 완료',reward:'+20 XP',icon:'🔄',color:'#673ab7'}
];

// 골프 명언 50개
var GOLF_QUOTES = [
  {text:'골프는 18홀 산책에 공 하나를 망치는 게임이다.',author:'마크 트웨인'},
  {text:'연습은 완벽을 만들지 않는다. 완벽한 연습이 완벽을 만든다.',author:'빈스 롬바르디'},
  {text:'가장 좋은 라운드는 아직 치지 않은 라운드다.',author:'바비 존스'},
  {text:'골프에서 가장 중요한 샷은 다음 샷이다.',author:'벤 호건'},
  {text:'스윙의 비밀은 그립에 있다.',author:'벤 호건'},
  {text:'골프에서 자신감은 실력의 절반이다.',author:'잭 니클라우스'},
  {text:'한 번에 한 샷만 집중하라. 그것이 골프의 전부다.',author:'바비 존스'},
  {text:'좋은 플레이어는 운이 좋고, 위대한 플레이어는 운을 만든다.',author:'게리 플레이어'},
  {text:'실패를 두려워하지 말라. 실패는 성공의 선생님이다.',author:'톰 왓슨'},
  {text:'골프는 가장 가까운 거리에서 가장 어려운 게임이다.',author:'바비 존스'},
  {text:'퍼팅은 50%의 기술과 50%의 자신감이다.',author:'아놀드 파머'},
  {text:'나는 골프를 치는 것이 아니라 골프에게 배운다.',author:'벤 크렌쇼'},
  {text:'드라이버는 쇼, 퍼팅은 머니다.',author:'골프 격언'},
  {text:'천재는 노력하는 사람을 이길 수 없다.',author:'타이거 우즈'},
  {text:'좋은 샷은 잊고, 나쁜 샷에서 배워라.',author:'게리 플레이어'},
  {text:'골프는 멘탈 게임이다. 내 최대의 적은 나 자신이다.',author:'잭 니클라우스'},
  {text:'스코어에 집착하지 말고 과정을 즐겨라.',author:'필 미켈슨'},
  {text:'인내심은 골프에서 가장 위대한 무기다.',author:'게리 플레이어'},
  {text:'골프 코스는 질투와 겸손을 동시에 가르친다.',author:'찰스 맥도널드'},
  {text:'부드러운 스윙이 강한 스윙보다 멀리 간다.',author:'어니 엘스'},
  {text:'프리샷 루틴을 만들고 절대 바꾸지 말라.',author:'타이거 우즈'},
  {text:'나쁜 라운드도 좋은 하루보다 낫다.',author:'골프 격언'},
  {text:'매 샷에 목적을 가져라. 목적 없는 샷은 시간 낭비다.',author:'하비 페닉'},
  {text:'그린을 읽는 법: 발로 느끼고, 눈으로 확인하고, 마음으로 결정하라.',author:'벤 크렌쇼'},
  {text:'골프에서 분노는 다음 두 홀을 망친다.',author:'바비 존스'},
  {text:'18홀은 18개의 새로운 시작이다.',author:'골프 격언'},
  {text:'좋은 어드레스가 좋은 스윙의 80%다.',author:'데이비드 레드베터'},
  {text:'3퍼트를 줄이면 싱글이 보인다.',author:'골프 격언'},
  {text:'골프는 실수의 게임이다. 실수를 줄이는 자가 승리한다.',author:'진 사라센'},
  {text:'백스윙은 천천히, 다운스윙은 자연스럽게.',author:'샘 스니드'},
  {text:'코스를 이기려 하지 말고 코스와 함께 플레이하라.',author:'잭 니클라우스'},
  {text:'짧은 게임이 스코어의 60%를 결정한다.',author:'데이브 펠즈'},
  {text:'골프공은 거짓말을 하지 않는다.',author:'톰 왓슨'},
  {text:'10만 번 연습하면 자연스러운 스윙이 된다.',author:'벤 호건'},
  {text:'레슨받은 후 더 못 치는 건 성장통이다.',author:'골프 격언'},
  {text:'비거리보다 방향이 더 중요하다.',author:'하비 페닉'},
  {text:'최고의 웨지 플레이어는 가장 적게 스윙하는 사람이다.',author:'필 미켈슨'},
  {text:'실전에서 새로운 스윙을 시도하지 말라.',author:'골프 격언'},
  {text:'그립 압력은 계란을 깨지 않을 정도로.',author:'샘 스니드'},
  {text:'모든 위대한 골퍼에게는 위대한 쇼트게임이 있다.',author:'세브 바예스테로스'},
  {text:'바람이 불 때는 더 부드럽게 스윙하라.',author:'게리 플레이어'},
  {text:'파를 친구처럼 대하라. 버디는 보너스다.',author:'골프 격언'},
  {text:'슬로 플레이는 자신도 동반자도 망친다.',author:'골프 격언'},
  {text:'코스 매니지먼트는 재능을 이긴다.',author:'벤 호건'},
  {text:'골프는 겸손을 배우는 가장 좋은 방법이다.',author:'아놀드 파머'},
  {text:'완벽한 라운드는 없다. 하지만 완벽한 순간은 있다.',author:'톰 왓슨'},
  {text:'동반자를 배려하는 것이 진정한 골퍼의 시작이다.',author:'바비 존스'},
  {text:'매일 10개의 퍼팅 연습이 주말 3퍼트를 없앤다.',author:'골프 격언'},
  {text:'골프장에서의 4시간은 인생에서 가장 정직한 시간이다.',author:'P.G. 우드하우스'},
  {text:'끝날 때까지 끝난 게 아니다.',author:'골프 격언'}
];

// 코스 난이도 레퍼런스
var COURSE_DIFFICULTY = [
  {level:'입문',slope:'55~100',rating:'60~67',desc:'초보자 친화적. 넓은 페어웨이, 적은 해저드. 라운드 시간이 짧고 부담 없음.',suitable:'핸디캡 30+',examples:'파3 코스, 퍼블릭 9홀'},
  {level:'일반',slope:'100~120',rating:'67~70',desc:'일반적인 난이도. 적당한 벙커와 워터해저드. 대부분의 골퍼에게 적합.',suitable:'핸디캡 15~30',examples:'대부분의 퍼블릭 코스'},
  {level:'중상',slope:'120~135',rating:'70~72',desc:'도전적인 코스. 좁은 페어웨이, 전략적 벙커 배치. 코스 매니지먼트 필수.',suitable:'핸디캡 8~15',examples:'멤버십 코스, 챔피언십 티'},
  {level:'상급',slope:'135~150',rating:'72~75',desc:'프로 수준. 극도로 좁은 페어웨이, 빠른 그린, 복잡한 해저드. 높은 정확도 요구.',suitable:'핸디캡 0~8',examples:'PGA 투어 코스, 명문 코스'},
  {level:'챔피언십',slope:'150+',rating:'75+',desc:'투어 프로를 위한 셋업. 극한의 난이도, 빠른 그린스피드(12+), 강풍 노출.',suitable:'프로/싱글',examples:'US Open/The Open 세팅'}
];

// 클럽 종류
var CLUB_TYPES = [
  {name:'드라이버',avgDist:220,color:'#e53935'},
  {name:'3번 우드',avgDist:200,color:'#d81b60'},
  {name:'5번 우드',avgDist:185,color:'#8e24aa'},
  {name:'유틸리티',avgDist:175,color:'#5e35b1'},
  {name:'4번 아이언',avgDist:170,color:'#3949ab'},
  {name:'5번 아이언',avgDist:160,color:'#1e88e5'},
  {name:'6번 아이언',avgDist:150,color:'#039be5'},
  {name:'7번 아이언',avgDist:140,color:'#00acc1'},
  {name:'8번 아이언',avgDist:130,color:'#00897b'},
  {name:'9번 아이언',avgDist:120,color:'#43a047'},
  {name:'PW',avgDist:105,color:'#7cb342'},
  {name:'AW(52)',avgDist:90,color:'#c0ca33'},
  {name:'SW(56)',avgDist:75,color:'#fdd835'},
  {name:'LW(60)',avgDist:55,color:'#ffb300'}
];

// --- localStorage ---
var v13Challenges = JSON.parse(localStorage.getItem('sg_v13_challenges')||'{}');
var v13ChallengeStreak = parseInt(localStorage.getItem('sg_v13_streak')||'0');
var v13XP = parseInt(localStorage.getItem('sg_v13_xp')||'0');
var v13PuttLog = JSON.parse(localStorage.getItem('sg_v13_putts')||'[]');
var v13ClubLog = JSON.parse(localStorage.getItem('sg_v13_clubs')||'{}');
var v13SavedQuotes = JSON.parse(localStorage.getItem('sg_v13_quotes')||'[]');

function saveV13(){
  localStorage.setItem('sg_v13_challenges',JSON.stringify(v13Challenges));
  localStorage.setItem('sg_v13_streak',String(v13ChallengeStreak));
  localStorage.setItem('sg_v13_xp',String(v13XP));
  localStorage.setItem('sg_v13_putts',JSON.stringify(v13PuttLog));
  localStorage.setItem('sg_v13_clubs',JSON.stringify(v13ClubLog));
  localStorage.setItem('sg_v13_quotes',JSON.stringify(v13SavedQuotes));
}

// --- Achievements hook ---
function checkV13Achievement(id,title){
  var achKey = 'sg_achievements';
  var achs = JSON.parse(localStorage.getItem(achKey)||'[]');
  if(achs.indexOf(id)===-1){
    achs.push(id);
    localStorage.setItem(achKey,JSON.stringify(achs));
    showV13Toast('🏆 '+title+' 업적 달성!');
    playSFX13('challenge');
  }
}

function showV13Toast(msg){
  var t=document.createElement('div');
  t.style.cssText='position:fixed;bottom:100px;left:50%;transform:translateX(-50%);background:var(--toast-bg,#333);color:#fff;padding:14px 24px;border-radius:14px;font-size:13px;font-weight:600;z-index:10050;animation:v13Rise .3s ease;box-shadow:0 8px 30px rgba(0,0,0,.3);max-width:90%;text-align:center';
  t.textContent=msg;
  document.body.appendChild(t);
  setTimeout(function(){t.style.opacity='0';t.style.transition='opacity .3s';setTimeout(function(){t.remove()},300)},2800);
}

// === 1. 코스 매니지먼트 전략 ===
function showStrategyGuide(){
  playSFX13('strategy');
  var ov = document.getElementById('v13StrategyOverlay');
  if(ov){ov.classList.add('active');return;}
  ov=document.createElement('div');
  ov.id='v13StrategyOverlay';
  ov.className='v13-overlay active';
  ov.setAttribute('role','dialog');
  ov.setAttribute('aria-label','코스 매니지먼트 전략');
  var activeCat = STRATEGIES[0].cat;
  function render(){
    var s = STRATEGIES.find(function(x){return x.cat===activeCat});
    var tabs = STRATEGIES.map(function(st){
      return '<button class="v13-tab'+(st.cat===activeCat?' active':'')+'" data-scat="'+st.cat+'">'+st.icon+' '+st.cat+'</button>';
    }).join('');
    var cards = s.items.map(function(it){
      return '<div class="v13-card"><h4>'+it.title+'</h4><p>'+it.desc+'</p><div style="margin-top:10px;padding:10px;background:rgba(26,122,58,.08);border-radius:10px;font-size:11px;font-weight:600;color:var(--primary)">💡 '+it.tip+'</div></div>';
    }).join('');
    ov.innerHTML = '<div class="v13-modal"><div class="v13-hdr"><h2><span class="v13i">🗺️</span> 코스 매니지먼트 전략</h2><button class="v13-x" aria-label="닫기">&times;</button></div><div class="v13-tabs">'+tabs+'</div>'+cards+'<div class="v13-divider"></div><div class="v13-card" style="background:linear-gradient(135deg,rgba(26,122,58,.05),rgba(52,168,83,.05))"><h4>🎯 핵심 원칙</h4><p>1. 위험 부담 비율을 항상 계산하라<br>2. 80% 파워로 치면 방향성이 좋아진다<br>3. 보기 회피가 버디 시도보다 낫다<br>4. 페어웨이 복귀가 항상 최선의 선택이다</p></div></div>';
    ov.querySelector('.v13-x').addEventListener('click',function(){ov.classList.remove('active')});
    ov.querySelectorAll('[data-scat]').forEach(function(b){
      b.addEventListener('click',function(){activeCat=b.dataset.scat;render();playSFX13('strategy');});
    });
    ov.addEventListener('click',function(e){if(e.target===ov)ov.classList.remove('active')});
  }
  render();
  document.body.appendChild(ov);
  checkV13Achievement('v13_strategy','전략가');
}

// === 2. 핸디캡 인덱스 계산기 ===
function showHandicapCalc(){
  playSFX13('handicap');
  var ov=document.getElementById('v13HandicapOverlay');
  if(ov){ov.classList.add('active');return;}
  ov=document.createElement('div');
  ov.id='v13HandicapOverlay';
  ov.className='v13-overlay active';
  ov.setAttribute('role','dialog');

  var rounds = JSON.parse(localStorage.getItem('sg_rounds')||'[]');
  var hdcp = '--';
  var bestDiffs = [];
  var avgDiff = 0;

  if(rounds.length >= 5){
    var diffs = rounds.slice(0,20).map(function(r){return r.score-72;});
    diffs.sort(function(a,b){return a-b;});
    var take = Math.max(1, Math.floor(diffs.length * 0.4));
    bestDiffs = diffs.slice(0, take);
    avgDiff = bestDiffs.reduce(function(s,v){return s+v},0)/bestDiffs.length;
    hdcp = Math.max(0, (avgDiff * 0.96)).toFixed(1);
  }

  var level = '--';
  var levelColor = '#999';
  var h = parseFloat(hdcp);
  if(!isNaN(h)){
    if(h<=5){level='싱글';levelColor='#e53935';}
    else if(h<=10){level='상급';levelColor='#ff6f00';}
    else if(h<=18){level='중급';levelColor='#1e88e5';}
    else if(h<=28){level='중하급';levelColor='#43a047';}
    else{level='입문';levelColor='#9e9e9e';}
  }

  var roundRows = rounds.slice(0,10).map(function(r,i){
    var diff = r.score-72;
    var diffStr = diff>0?'+'+diff:String(diff);
    var diffColor = diff<=0?'#34a853':(diff<=5?'#ff9800':'#e53935');
    return '<div class="v13-stat-row"><span class="v13-stat-label">'+(i+1)+'. '+r.course+' ('+r.date+')</span><span style="font-size:15px;font-weight:800;color:'+diffColor+'">'+r.score+' ('+diffStr+')</span></div>';
  }).join('');

  var tipsHtml = HDCP_TIPS.map(function(t){
    return '<div style="font-size:12px;color:var(--text-muted);padding:6px 0;border-bottom:1px dashed var(--border);display:flex;align-items:flex-start;gap:6px"><span>✅</span><span>'+t+'</span></div>';
  }).join('');

  ov.innerHTML = '<div class="v13-modal"><div class="v13-hdr"><h2><span class="v13i">📋</span> 핸디캡 인덱스 계산기</h2><button class="v13-x" aria-label="닫기">&times;</button></div>'
    +'<div style="text-align:center;padding:24px;background:linear-gradient(135deg,var(--primary),#34a853);border-radius:20px;color:#fff;margin-bottom:20px">'
    +'<div style="font-size:14px;opacity:.8;margin-bottom:8px">My Handicap Index</div>'
    +'<div style="font-size:52px;font-weight:900;letter-spacing:-2px">'+hdcp+'</div>'
    +'<div style="display:inline-block;padding:6px 16px;border-radius:20px;background:rgba(255,255,255,.2);font-size:13px;font-weight:700;margin-top:8px;border:1px solid rgba(255,255,255,.3);color:'+levelColor+'">'+level+'</div>'
    +'<div style="font-size:12px;opacity:.7;margin-top:12px">최근 '+(rounds.length<20?rounds.length:20)+'라운드 기반 (USGA 방식)</div>'
    +'</div>'
    +(rounds.length<5?'<div class="v13-card" style="text-align:center"><p>📝 최소 5라운드 기록이 필요합니다.<br>현재 '+rounds.length+'라운드 기록됨.</p></div>':'')
    +'<div class="v13-card"><h4>📊 최근 라운드</h4>'+roundRows+'</div>'
    +'<div class="v13-card"><h4>💡 핸디캡 알아두기</h4>'+tipsHtml+'</div>'
    +'</div>';

  ov.querySelector('.v13-x').addEventListener('click',function(){ov.classList.remove('active')});
  ov.addEventListener('click',function(e){if(e.target===ov)ov.classList.remove('active')});
  document.body.appendChild(ov);
  checkV13Achievement('v13_handicap','핸디캡 분석가');
}

// === 3. 골프 영양 가이드 ===
function showNutritionGuide(){
  playSFX13('nutrition');
  var ov=document.getElementById('v13NutritionOverlay');
  if(ov){ov.classList.add('active');return;}
  ov=document.createElement('div');
  ov.id='v13NutritionOverlay';
  ov.className='v13-overlay active';
  ov.setAttribute('role','dialog');

  var activeTab = 'before';
  function render(){
    var data = NUTRITION[activeTab];
    var tabBtns = [
      {k:'before',label:'라운드 전',icon:'☀️'},
      {k:'during',label:'라운드 중',icon:'⛳'},
      {k:'after',label:'라운드 후',icon:'🌙'},
      {k:'avoid',label:'피해야 할 것',icon:'⚠️'}
    ].map(function(t){
      return '<button class="v13-tab'+(t.k===activeTab?' active':'')+'" data-ntab="'+t.k+'">'+t.icon+' '+t.label+'</button>';
    }).join('');

    var items = data.map(function(it){
      return '<div class="v13-nutrition-card"><h5>'+it.icon+' '+it.name+(it.timing?' <span class="v13-badge" style="background:rgba(26,122,58,.1);color:var(--primary)">'+it.timing+'</span>':'')+'</h5><p style="font-size:12px;color:var(--text-muted);line-height:1.7">'+it.desc+'</p></div>';
    }).join('');

    ov.innerHTML = '<div class="v13-modal"><div class="v13-hdr"><h2><span class="v13i">🍎</span> 골프 영양 가이드</h2><button class="v13-x" aria-label="닫기">&times;</button></div><div class="v13-tabs">'+tabBtns+'</div>'+items
      +'<div class="v13-divider"></div>'
      +'<div class="v13-card" style="background:linear-gradient(135deg,rgba(26,122,58,.05),rgba(52,168,83,.05))"><h4>💧 수분 섭취 계산기</h4>'
      +'<p>체중(kg) × 0.033 = 하루 권장 수분(L)<br>라운드 시: 추가로 1~1.5L 필요 (여름철 +0.5L)<br><br>'
      +'<strong>예시:</strong> 75kg → 하루 2.5L + 라운드 1.5L = 총 4L</p>'
      +'</div></div>';

    ov.querySelector('.v13-x').addEventListener('click',function(){ov.classList.remove('active')});
    ov.querySelectorAll('[data-ntab]').forEach(function(b){
      b.addEventListener('click',function(){activeTab=b.dataset.ntab;render();});
    });
    ov.addEventListener('click',function(e){if(e.target===ov)ov.classList.remove('active')});
  }
  render();
  document.body.appendChild(ov);
  checkV13Achievement('v13_nutrition','영양 관리사');
}

// === 4. 퍼팅 분석기 ===
function showPuttingAnalyzer(){
  playSFX13('putt');
  var ov=document.getElementById('v13PuttOverlay');
  if(ov){ov.classList.add('active');return;}
  ov=document.createElement('div');
  ov.id='v13PuttOverlay';
  ov.className='v13-overlay active';
  ov.setAttribute('role','dialog');

  function render(){
    var benchmarks = PUTT_BENCHMARKS.map(function(p){
      var myPutts = v13PuttLog.filter(function(l){return l.dist===p.dist});
      var myPct = myPutts.length>0? Math.round(myPutts.filter(function(l){return l.made}).length/myPutts.length*100):null;
      var barPct = myPct!==null?myPct:p.avg;
      var barColor = myPct!==null?(myPct>=p.pga?'#34a853':(myPct>=p.avg?'#ffa726':'#e53935')):p.color;
      return '<div class="v13-putt-zone">'
        +'<div class="v13-putt-dist">'+p.dist+'</div>'
        +'<div style="flex:1"><div style="display:flex;justify-content:space-between;font-size:10px;color:var(--text-muted);margin-bottom:4px"><span>PGA: '+p.pga+'%</span><span>아마추어: '+p.avg+'%</span>'+(myPct!==null?'<span style="font-weight:700;color:'+barColor+'">나: '+myPct+'%</span>':'')+'</div>'
        +'<div class="v13-putt-bar"><div class="v13-putt-fill" style="width:'+barPct+'%;background:'+barColor+'"><span class="v13-putt-pct">'+barPct+'%</span></div></div></div></div>';
    }).join('');

    var totalPutts = v13PuttLog.length;
    var madePutts = v13PuttLog.filter(function(l){return l.made}).length;
    var overallPct = totalPutts>0?Math.round(madePutts/totalPutts*100):0;

    ov.innerHTML = '<div class="v13-modal"><div class="v13-hdr"><h2><span class="v13i">🎯</span> 퍼팅 분석기</h2><button class="v13-x" aria-label="닫기">&times;</button></div>'
      +'<div class="v13-grid3" style="margin-bottom:16px"><div class="v13-card" style="text-align:center"><div style="font-size:11px;color:var(--text-muted)">총 퍼팅</div><div style="font-size:24px;font-weight:800;color:var(--primary)">'+totalPutts+'</div></div>'
      +'<div class="v13-card" style="text-align:center"><div style="font-size:11px;color:var(--text-muted)">성공</div><div style="font-size:24px;font-weight:800;color:#34a853">'+madePutts+'</div></div>'
      +'<div class="v13-card" style="text-align:center"><div style="font-size:11px;color:var(--text-muted)">성공률</div><div style="font-size:24px;font-weight:800;color:'+(overallPct>=50?'#34a853':'#ff9800')+'">'+overallPct+'%</div></div></div>'
      +'<h3 style="font-size:15px;font-weight:700;margin-bottom:12px">거리별 퍼팅 성공률</h3>'
      +benchmarks
      +'<div class="v13-divider"></div>'
      +'<h3 style="font-size:15px;font-weight:700;margin-bottom:12px">퍼팅 기록 추가</h3>'
      +'<div class="v13-grid2">'
      +'<div><label style="font-size:12px;font-weight:600;color:var(--text-muted)">거리</label><select id="v13PuttDist" style="width:100%;padding:10px;border:2px solid var(--border);border-radius:10px;font-size:13px;background:var(--bg);color:var(--text)">'
      +PUTT_BENCHMARKS.map(function(p){return '<option value="'+p.dist+'">'+p.dist+'</option>';}).join('')
      +'</select></div>'
      +'<div><label style="font-size:12px;font-weight:600;color:var(--text-muted)">결과</label><div style="display:flex;gap:8px;margin-top:4px"><button class="v13-btn v13-btn-primary v13-btn-sm" id="v13PuttMade" style="flex:1">✅ 성공</button><button class="v13-btn v13-btn-secondary v13-btn-sm" id="v13PuttMissed" style="flex:1">❌ 실패</button></div></div>'
      +'</div>'
      +'<div class="v13-card" style="margin-top:16px;background:linear-gradient(135deg,rgba(26,122,58,.05),rgba(52,168,83,.05))"><h4>💡 퍼팅 팁</h4><p>1. 3m 이내 퍼팅에 집중하면 평균 3타 줄일 수 있습니다<br>2. 에임보다 스피드 컨트롤이 먼저입니다<br>3. 어드레스 시 어깨 평행을 확인하세요<br>4. 백스트로크를 일정하게 유지하세요</p></div>'
      +'</div>';

    ov.querySelector('.v13-x').addEventListener('click',function(){ov.classList.remove('active')});
    ov.addEventListener('click',function(e){if(e.target===ov)ov.classList.remove('active')});

    var madeBtn = document.getElementById('v13PuttMade');
    var missBtn = document.getElementById('v13PuttMissed');
    if(madeBtn) madeBtn.addEventListener('click',function(){
      var dist = document.getElementById('v13PuttDist').value;
      v13PuttLog.push({dist:dist,made:true,date:new Date().toISOString().slice(0,10)});
      saveV13();render();playSFX13('putt');
      showV13Toast('✅ '+dist+' 퍼팅 성공 기록!');
    });
    if(missBtn) missBtn.addEventListener('click',function(){
      var dist = document.getElementById('v13PuttDist').value;
      v13PuttLog.push({dist:dist,made:false,date:new Date().toISOString().slice(0,10)});
      saveV13();render();
      showV13Toast('📝 '+dist+' 퍼팅 기록 완료');
    });
  }
  render();
  document.body.appendChild(ov);
  checkV13Achievement('v13_putting','퍼팅 분석가');
}

// === 5. 골프 챌린지 시스템 ===
function showChallenges(){
  playSFX13('challenge');
  var ov=document.getElementById('v13ChallengeOverlay');
  if(ov){ov.classList.add('active');return;}
  ov=document.createElement('div');
  ov.id='v13ChallengeOverlay';
  ov.className='v13-overlay active';
  ov.setAttribute('role','dialog');

  var today = new Date().toISOString().slice(0,10);
  var dayIndex = Math.floor(Date.now()/(86400000))%CHALLENGES.length;
  var dailyChallenges = [];
  for(var i=0;i<3;i++){
    dailyChallenges.push(CHALLENGES[(dayIndex+i)%CHALLENGES.length]);
  }

  if(!v13Challenges[today]){
    v13Challenges[today]={completed:[]};
    var yesterday = new Date(Date.now()-86400000).toISOString().slice(0,10);
    if(v13Challenges[yesterday]){v13ChallengeStreak++;}else{v13ChallengeStreak=0;}
    saveV13();
  }

  function render(){
    var completed = v13Challenges[today].completed||[];
    var allDone = dailyChallenges.every(function(c){return completed.indexOf(c.id)!==-1;});

    var items = dailyChallenges.map(function(ch){
      var done = completed.indexOf(ch.id)!==-1;
      return '<div class="v13-challenge-item'+(done?' completed':'')+'">'
        +'<div class="v13-challenge-icon" style="background:'+ch.color+'22;color:'+ch.color+'">'+ch.icon+'</div>'
        +'<div class="v13-challenge-info"><div class="v13-challenge-title">'+ch.title+'</div><div class="v13-challenge-desc">'+ch.desc+'</div><div class="v13-challenge-reward">'+ch.reward+'</div></div>'
        +'<div class="v13-challenge-check'+(done?' done':'')+'" data-cid="'+ch.id+'">'+(done?'✓':'')+'</div></div>';
    }).join('');

    var weeklyProgress = 0;
    for(var d=0;d<7;d++){
      var dd = new Date(Date.now()-d*86400000).toISOString().slice(0,10);
      if(v13Challenges[dd]&&v13Challenges[dd].completed&&v13Challenges[dd].completed.length>=3) weeklyProgress++;
    }

    ov.innerHTML = '<div class="v13-modal"><div class="v13-hdr"><h2><span class="v13i">🏆</span> 골프 챌린지</h2><button class="v13-x" aria-label="닫기">&times;</button></div>'
      +'<div class="v13-grid3" style="margin-bottom:16px"><div class="v13-card" style="text-align:center"><div style="font-size:11px;color:var(--text-muted)">총 XP</div><div style="font-size:22px;font-weight:800;color:var(--primary)">'+v13XP+'</div></div>'
      +'<div class="v13-card" style="text-align:center"><div style="font-size:11px;color:var(--text-muted)">연속 일수</div><div style="font-size:22px;font-weight:800;color:#ff9800">'+v13ChallengeStreak+'일</div></div>'
      +'<div class="v13-card" style="text-align:center"><div style="font-size:11px;color:var(--text-muted)">주간 완료</div><div style="font-size:22px;font-weight:800;color:#1e88e5">'+weeklyProgress+'/7</div></div></div>'
      +'<h3 style="font-size:15px;font-weight:700;margin-bottom:4px">오늘의 챌린지</h3>'
      +'<div style="font-size:12px;color:var(--text-muted);margin-bottom:12px">'+today+' • '+completed.length+'/3 완료'+(allDone?' ✨':'')+''+'</div>'
      +'<div class="v13-progress"><div class="v13-progress-fill" style="width:'+Math.round(completed.length/3*100)+'%;background:linear-gradient(90deg,var(--primary),#34a853)"></div></div>'
      +items
      +(allDone?'<div class="v13-card" style="text-align:center;background:linear-gradient(135deg,rgba(52,168,83,.1),rgba(26,122,58,.1))"><h4>🎉 오늘 챌린지 완료!</h4><p>모든 챌린지를 완료했습니다. 내일도 도전하세요!</p></div>':'')
      +'</div>';

    ov.querySelector('.v13-x').addEventListener('click',function(){ov.classList.remove('active')});
    ov.addEventListener('click',function(e){if(e.target===ov)ov.classList.remove('active')});

    ov.querySelectorAll('[data-cid]').forEach(function(btn){
      btn.addEventListener('click',function(){
        var cid = btn.dataset.cid;
        if(completed.indexOf(cid)===-1){
          completed.push(cid);
          v13Challenges[today].completed = completed;
          var ch = CHALLENGES.find(function(c){return c.id===cid});
          var xpMatch = ch?ch.reward.match(/\+(\d+)/):null;
          if(xpMatch) v13XP+=parseInt(xpMatch[1]);
          saveV13();
          render();
          playSFX13('challenge');
          showV13Toast('✅ '+ch.title+' 완료! '+ch.reward);
          if(completed.length>=3) checkV13Achievement('v13_daily_all','일일 챌린지 완전 클리어');
        }
      });
    });
  }
  render();
  document.body.appendChild(ov);
}

// === 6. 라운드 통계 고급 차트 ===
function showAdvancedStats(){
  playSFX13('handicap');
  var ov=document.getElementById('v13StatsOverlay');
  if(ov){ov.classList.add('active');return;}
  ov=document.createElement('div');
  ov.id='v13StatsOverlay';
  ov.className='v13-overlay active';
  ov.setAttribute('role','dialog');

  var rounds = JSON.parse(localStorage.getItem('sg_rounds')||'[]');

  var monthlyData = {};
  rounds.forEach(function(r){
    var m = r.date?r.date.slice(0,7):'unknown';
    if(!monthlyData[m]) monthlyData[m]={scores:[],count:0};
    monthlyData[m].scores.push(r.score);
    monthlyData[m].count++;
  });

  var months = Object.keys(monthlyData).sort();
  var monthlyAvgs = months.map(function(m){
    var scores = monthlyData[m].scores;
    return {month:m, avg:Math.round(scores.reduce(function(s,v){return s+v},0)/scores.length), best:Math.min.apply(null,scores), count:scores.length};
  });

  var totalRounds = rounds.length;
  var allScores = rounds.map(function(r){return r.score});
  var avgScore = totalRounds>0?Math.round(allScores.reduce(function(s,v){return s+v},0)/totalRounds):0;
  var bestScore = totalRounds>0?Math.min.apply(null,allScores):0;
  var worstScore = totalRounds>0?Math.max.apply(null,allScores):0;
  var sub80 = allScores.filter(function(s){return s<80}).length;
  var sub90 = allScores.filter(function(s){return s<90}).length;

  var chartHtml = '';
  if(monthlyAvgs.length>0){
    var maxScore = Math.max.apply(null,monthlyAvgs.map(function(m){return m.avg}));
    var minScore = Math.min.apply(null,monthlyAvgs.map(function(m){return m.avg}));
    var range = Math.max(maxScore-minScore,10);
    chartHtml = '<div style="display:flex;align-items:flex-end;gap:6px;height:160px;padding:10px 0;border-bottom:2px solid var(--border)">'
      +monthlyAvgs.slice(-12).map(function(m){
        var h = Math.max(20,((m.avg-minScore+5)/range)*130);
        var color = m.avg<=avgScore?'#34a853':'#ff9800';
        return '<div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:4px">'
          +'<div style="font-size:10px;font-weight:700;color:'+color+'">'+m.avg+'</div>'
          +'<div style="width:100%;height:'+h+'px;background:linear-gradient(180deg,'+color+','+color+'88);border-radius:6px 6px 0 0;min-width:20px"></div>'
          +'<div style="font-size:9px;color:var(--text-muted);writing-mode:vertical-lr;transform:rotate(180deg);height:40px">'+m.month.slice(2)+'</div></div>';
      }).join('')+'</div>';
  }

  ov.innerHTML = '<div class="v13-modal"><div class="v13-hdr"><h2><span class="v13i">📊</span> 라운드 통계 분석</h2><button class="v13-x" aria-label="닫기">&times;</button></div>'
    +'<div class="v13-grid2" style="margin-bottom:16px">'
    +'<div class="v13-card" style="text-align:center"><div style="font-size:11px;color:var(--text-muted)">평균 스코어</div><div style="font-size:28px;font-weight:900;color:var(--primary)">'+avgScore+'</div></div>'
    +'<div class="v13-card" style="text-align:center"><div style="font-size:11px;color:var(--text-muted)">베스트</div><div style="font-size:28px;font-weight:900;color:#34a853">'+bestScore+'</div></div>'
    +'<div class="v13-card" style="text-align:center"><div style="font-size:11px;color:var(--text-muted)">80타 미만</div><div style="font-size:28px;font-weight:900;color:#1e88e5">'+sub80+'회</div></div>'
    +'<div class="v13-card" style="text-align:center"><div style="font-size:11px;color:var(--text-muted)">90타 미만</div><div style="font-size:28px;font-weight:900;color:#ff9800">'+sub90+'회</div></div></div>'
    +(chartHtml?'<div class="v13-card"><h4>📈 월별 평균 스코어 트렌드</h4>'+chartHtml+'</div>':'')
    +'<div class="v13-card"><h4>🏌️ 스코어 분포</h4>'
    +'<div class="v13-stat-row"><span class="v13-stat-label">70타 미만 (파 이하)</span><span class="v13-stat-value">'+allScores.filter(function(s){return s<70}).length+'회</span></div>'
    +'<div class="v13-stat-row"><span class="v13-stat-label">70~79타</span><span class="v13-stat-value">'+allScores.filter(function(s){return s>=70&&s<80}).length+'회</span></div>'
    +'<div class="v13-stat-row"><span class="v13-stat-label">80~89타</span><span class="v13-stat-value">'+allScores.filter(function(s){return s>=80&&s<90}).length+'회</span></div>'
    +'<div class="v13-stat-row"><span class="v13-stat-label">90~99타</span><span class="v13-stat-value">'+allScores.filter(function(s){return s>=90&&s<100}).length+'회</span></div>'
    +'<div class="v13-stat-row"><span class="v13-stat-label">100타 이상</span><span class="v13-stat-value">'+allScores.filter(function(s){return s>=100}).length+'회</span></div></div>'
    +(totalRounds<3?'<div class="v13-card" style="text-align:center"><p>📝 트렌드 분석을 위해 3라운드 이상 기록이 필요합니다.</p></div>':'')
    +'</div>';

  ov.querySelector('.v13-x').addEventListener('click',function(){ov.classList.remove('active')});
  ov.addEventListener('click',function(e){if(e.target===ov)ov.classList.remove('active')});
  document.body.appendChild(ov);
  checkV13Achievement('v13_stats','통계 분석가');
}

// === 7. 클럽 사용 분석 ===
function showClubAnalysis(){
  playSFX13('strategy');
  var ov=document.getElementById('v13ClubOverlay');
  if(ov){ov.classList.add('active');return;}
  ov=document.createElement('div');
  ov.id='v13ClubOverlay';
  ov.className='v13-overlay active';
  ov.setAttribute('role','dialog');

  function render(){
    var maxCount = 0;
    CLUB_TYPES.forEach(function(c){
      var count = v13ClubLog[c.name]?v13ClubLog[c.name].count||0:0;
      if(count>maxCount) maxCount=count;
    });

    var clubRows = CLUB_TYPES.map(function(c){
      var data = v13ClubLog[c.name]||{count:0,totalDist:0};
      var avg = data.count>0?Math.round(data.totalDist/data.count):c.avgDist;
      var barW = maxCount>0?Math.round(data.count/maxCount*100):0;
      return '<div class="v13-club-row">'
        +'<div class="v13-club-name">'+c.name+'</div>'
        +'<div class="v13-club-bar-wrap"><div class="v13-club-bar" style="width:'+barW+'%;background:'+c.color+'"></div></div>'
        +'<div class="v13-club-count">'+data.count+'회</div>'
        +'<div style="font-size:11px;color:var(--text-muted);min-width:45px;text-align:right">'+avg+'y</div></div>';
    }).join('');

    var totalShots = 0;
    Object.keys(v13ClubLog).forEach(function(k){totalShots+=v13ClubLog[k].count||0;});

    ov.innerHTML = '<div class="v13-modal"><div class="v13-hdr"><h2><span class="v13i">🏌️</span> 클럽 사용 분석</h2><button class="v13-x" aria-label="닫기">&times;</button></div>'
      +'<div class="v13-card" style="text-align:center;margin-bottom:16px"><div style="font-size:11px;color:var(--text-muted)">총 샷 기록</div><div style="font-size:28px;font-weight:900;color:var(--primary)">'+totalShots+'회</div></div>'
      +'<h3 style="font-size:15px;font-weight:700;margin-bottom:12px">클럽별 사용 빈도 & 평균 비거리</h3>'
      +clubRows
      +'<div class="v13-divider"></div>'
      +'<h3 style="font-size:15px;font-weight:700;margin-bottom:12px">샷 기록 추가</h3>'
      +'<div class="v13-grid2">'
      +'<div><label style="font-size:12px;font-weight:600;color:var(--text-muted)">클럽</label><select id="v13ClubSelect" style="width:100%;padding:10px;border:2px solid var(--border);border-radius:10px;font-size:13px;background:var(--bg);color:var(--text)">'
      +CLUB_TYPES.map(function(c){return '<option value="'+c.name+'">'+c.name+'</option>';}).join('')
      +'</select></div>'
      +'<div><label style="font-size:12px;font-weight:600;color:var(--text-muted)">비거리(y)</label><input type="number" id="v13ClubDist" min="10" max="350" placeholder="150" style="width:100%;padding:10px;border:2px solid var(--border);border-radius:10px;font-size:13px;background:var(--bg);color:var(--text)"></div>'
      +'</div>'
      +'<button class="v13-btn v13-btn-primary" id="v13ClubAdd" style="width:100%;margin-top:12px;justify-content:center">📝 기록 추가</button>'
      +'</div>';

    ov.querySelector('.v13-x').addEventListener('click',function(){ov.classList.remove('active')});
    ov.addEventListener('click',function(e){if(e.target===ov)ov.classList.remove('active')});

    document.getElementById('v13ClubAdd').addEventListener('click',function(){
      var club = document.getElementById('v13ClubSelect').value;
      var dist = parseInt(document.getElementById('v13ClubDist').value);
      if(!dist||dist<10) return showV13Toast('⚠️ 비거리를 입력해주세요');
      if(!v13ClubLog[club]) v13ClubLog[club]={count:0,totalDist:0};
      v13ClubLog[club].count++;
      v13ClubLog[club].totalDist+=dist;
      saveV13();render();
      playSFX13('putt');
      showV13Toast('✅ '+club+' '+dist+'y 기록 완료!');
      if(totalShots+1>=50) checkV13Achievement('v13_club50','50샷 마스터');
    });
  }
  render();
  document.body.appendChild(ov);
}

// === 8. 골프 명언 & 동기부여 ===
function showGolfQuotes(){
  playSFX13('quote');
  var ov=document.getElementById('v13QuoteOverlay');
  if(ov){ov.classList.add('active');return;}
  ov=document.createElement('div');
  ov.id='v13QuoteOverlay';
  ov.className='v13-overlay active';
  ov.setAttribute('role','dialog');

  var todayIdx = Math.floor(Date.now()/86400000)%GOLF_QUOTES.length;
  var todayQuote = GOLF_QUOTES[todayIdx];

  var randomQuotes = [];
  var used = [todayIdx];
  while(randomQuotes.length<5){
    var ri = Math.floor(Math.random()*GOLF_QUOTES.length);
    if(used.indexOf(ri)===-1){randomQuotes.push(GOLF_QUOTES[ri]);used.push(ri);}
  }

  var savedHtml = v13SavedQuotes.length>0?
    '<div class="v13-card"><h4>❤️ 저장된 명언 ('+v13SavedQuotes.length+'개)</h4>'
    +v13SavedQuotes.map(function(q){
      return '<div style="padding:10px 0;border-bottom:1px dashed var(--border);font-size:12px"><em>&ldquo;'+q.text+'&rdquo;</em><br><span style="color:var(--text-muted)">- '+q.author+'</span></div>';
    }).join('')+'</div>':'';

  ov.innerHTML = '<div class="v13-modal"><div class="v13-hdr"><h2><span class="v13i">💬</span> 골프 명언</h2><button class="v13-x" aria-label="닫기">&times;</button></div>'
    +'<div class="v13-quote-box"><div class="v13-quote-text">&ldquo;'+todayQuote.text+'&rdquo;</div><div class="v13-quote-author">- '+todayQuote.author+'</div></div>'
    +'<div style="text-align:center;margin-bottom:16px"><button class="v13-btn v13-btn-primary v13-btn-sm" id="v13SaveQuote">❤️ 저장하기</button></div>'
    +'<h3 style="font-size:15px;font-weight:700;margin-bottom:12px">더 많은 명언</h3>'
    +randomQuotes.map(function(q){
      return '<div class="v13-card"><p style="font-style:italic;font-size:13px;line-height:1.7">&ldquo;'+q.text+'&rdquo;</p><p style="font-size:11px;color:var(--text-muted);text-align:right;margin-top:6px">- '+q.author+'</p></div>';
    }).join('')
    +savedHtml
    +'</div>';

  ov.querySelector('.v13-x').addEventListener('click',function(){ov.classList.remove('active')});
  ov.addEventListener('click',function(e){if(e.target===ov)ov.classList.remove('active')});

  var saveBtn = document.getElementById('v13SaveQuote');
  if(saveBtn) saveBtn.addEventListener('click',function(){
    var exists = v13SavedQuotes.some(function(q){return q.text===todayQuote.text;});
    if(!exists){
      v13SavedQuotes.push(todayQuote);
      saveV13();
      showV13Toast('❤️ 명언이 저장되었습니다!');
    }else{
      showV13Toast('이미 저장된 명언입니다');
    }
    checkV13Achievement('v13_quote','명언 수집가');
  });

  document.body.appendChild(ov);
}

// === 9. 코스 난이도 분석기 ===
function showDifficultyAnalyzer(){
  playSFX13('strategy');
  var ov=document.getElementById('v13DiffOverlay');
  if(ov){ov.classList.add('active');return;}
  ov=document.createElement('div');
  ov.id='v13DiffOverlay';
  ov.className='v13-overlay active';
  ov.setAttribute('role','dialog');

  var levels = COURSE_DIFFICULTY.map(function(d,i){
    var dots = '';
    for(var j=0;j<5;j++){
      dots+='<div class="v13-diff-dot'+(j<=i?' filled':'')+'"></div>';
    }
    return '<div class="v13-card"><h4>'+d.level+' <div class="v13-difficulty-meter">'+dots+'</div></h4>'
      +'<div class="v13-grid2" style="margin:10px 0">'
      +'<div><span style="font-size:11px;color:var(--text-muted)">Slope Rating</span><div style="font-size:15px;font-weight:800;color:var(--primary)">'+d.slope+'</div></div>'
      +'<div><span style="font-size:11px;color:var(--text-muted)">Course Rating</span><div style="font-size:15px;font-weight:800;color:var(--primary)">'+d.rating+'</div></div></div>'
      +'<p>'+d.desc+'</p>'
      +'<div style="margin-top:10px;display:flex;gap:8px;flex-wrap:wrap">'
      +'<span class="v13-badge" style="background:rgba(26,122,58,.1);color:var(--primary)">적합: '+d.suitable+'</span>'
      +'<span class="v13-badge" style="background:rgba(33,150,243,.1);color:#1e88e5">예시: '+d.examples+'</span></div></div>';
  }).join('');

  ov.innerHTML = '<div class="v13-modal"><div class="v13-hdr"><h2><span class="v13i">⛰️</span> 코스 난이도 분석기</h2><button class="v13-x" aria-label="닫기">&times;</button></div>'
    +'<div class="v13-card" style="background:linear-gradient(135deg,rgba(26,122,58,.05),rgba(52,168,83,.05));margin-bottom:16px"><h4>📋 Slope & Course Rating 이해하기</h4>'
    +'<p><strong>Slope Rating</strong>: 보기 골퍼 기준 코스 난이도 (55~155, 평균 113)<br>'
    +'<strong>Course Rating</strong>: 스크래치 골퍼가 칠 예상 스코어<br>'
    +'<strong>핸디캡 공식</strong>: (Score - Course Rating) × (113 / Slope Rating)</p></div>'
    +levels
    +'<div class="v13-divider"></div>'
    +'<div class="v13-card"><h4>🧮 나의 코스 난이도 계산</h4>'
    +'<div class="v13-grid2" style="margin:12px 0">'
    +'<div><label style="font-size:12px;font-weight:600;color:var(--text-muted)">Slope Rating</label><input type="number" id="v13SlopeIn" min="55" max="155" placeholder="113" style="width:100%;padding:10px;border:2px solid var(--border);border-radius:10px;font-size:13px;background:var(--bg);color:var(--text)"></div>'
    +'<div><label style="font-size:12px;font-weight:600;color:var(--text-muted)">Course Rating</label><input type="number" id="v13CourseRating" min="60" max="80" step="0.1" placeholder="72.0" style="width:100%;padding:10px;border:2px solid var(--border);border-radius:10px;font-size:13px;background:var(--bg);color:var(--text)"></div></div>'
    +'<div><label style="font-size:12px;font-weight:600;color:var(--text-muted)">나의 스코어</label><input type="number" id="v13MyScore" min="50" max="200" placeholder="90" style="width:100%;padding:10px;border:2px solid var(--border);border-radius:10px;font-size:13px;background:var(--bg);color:var(--text);margin-top:4px"></div>'
    +'<button class="v13-btn v13-btn-primary" id="v13CalcDiff" style="width:100%;margin-top:12px;justify-content:center">🧮 계산하기</button>'
    +'<div id="v13DiffResult" style="margin-top:12px"></div></div>'
    +'</div>';

  ov.querySelector('.v13-x').addEventListener('click',function(){ov.classList.remove('active')});
  ov.addEventListener('click',function(e){if(e.target===ov)ov.classList.remove('active')});

  document.body.appendChild(ov);

  document.getElementById('v13CalcDiff').addEventListener('click',function(){
    var slope = parseFloat(document.getElementById('v13SlopeIn').value);
    var cr = parseFloat(document.getElementById('v13CourseRating').value);
    var score = parseFloat(document.getElementById('v13MyScore').value);
    if(!slope||!cr||!score) return showV13Toast('⚠️ 모든 값을 입력해주세요');
    var diff = ((score-cr)*(113/slope)).toFixed(1);
    var result = document.getElementById('v13DiffResult');
    var level = '';
    var d = parseFloat(diff);
    if(d<=5) level='싱글 수준';
    else if(d<=10) level='상급';
    else if(d<=18) level='중급';
    else if(d<=28) level='중하급';
    else level='입문';
    result.innerHTML = '<div class="v13-card" style="text-align:center;background:linear-gradient(135deg,rgba(26,122,58,.1),rgba(52,168,83,.1))"><div style="font-size:12px;color:var(--text-muted)">차등 핸디캡</div><div style="font-size:36px;font-weight:900;color:var(--primary)">'+diff+'</div><div style="font-size:13px;font-weight:700">'+level+'</div></div>';
    playSFX13('handicap');
    checkV13Achievement('v13_difficulty','난이도 분석가');
  });
}

// === 10. 월간 골프 종합 체크업 ===
function showMonthlyCheckup(){
  playSFX13('challenge');
  var ov=document.getElementById('v13CheckupOverlay');
  if(ov){ov.classList.add('active');return;}
  ov=document.createElement('div');
  ov.id='v13CheckupOverlay';
  ov.className='v13-overlay active';
  ov.setAttribute('role','dialog');

  var now = new Date();
  var monthStr = now.getFullYear()+'-'+String(now.getMonth()+1).padStart(2,'0');
  var monthName = now.getFullYear()+'년 '+(now.getMonth()+1)+'월';

  var rounds = JSON.parse(localStorage.getItem('sg_rounds')||'[]');
  var monthRounds = rounds.filter(function(r){return r.date&&r.date.startsWith(monthStr);});
  var achs = JSON.parse(localStorage.getItem('sg_achievements')||'[]');

  var roundCount = monthRounds.length;
  var avgScore = roundCount>0?Math.round(monthRounds.reduce(function(s,r){return s+r.score},0)/roundCount):0;
  var bestScore = roundCount>0?Math.min.apply(null,monthRounds.map(function(r){return r.score})):0;

  var puttCount = v13PuttLog.filter(function(p){return p.date&&p.date.startsWith(monthStr)}).length;
  var clubCount = 0;
  Object.keys(v13ClubLog).forEach(function(k){clubCount+=v13ClubLog[k].count||0;});

  var score = 0;
  if(roundCount>=1) score+=20;
  if(roundCount>=4) score+=10;
  if(puttCount>=10) score+=15;
  if(clubCount>=20) score+=15;
  if(achs.length>=5) score+=10;
  if(v13XP>=50) score+=10;
  if(v13ChallengeStreak>=3) score+=10;
  if(v13SavedQuotes.length>=3) score+=5;
  if(avgScore>0&&avgScore<90) score+=5;

  var grade = 'D';
  var gradeColor = '#9e9e9e';
  if(score>=90){grade='S';gradeColor='#e53935';}
  else if(score>=75){grade='A';gradeColor='#ff6f00';}
  else if(score>=60){grade='B';gradeColor='#1e88e5';}
  else if(score>=40){grade='C';gradeColor='#43a047';}

  var metrics = [
    {label:'라운드 횟수',value:roundCount+'회',target:'목표: 4회/월',pct:Math.min(100,roundCount/4*100)},
    {label:'퍼팅 연습',value:puttCount+'회',target:'목표: 10회/월',pct:Math.min(100,puttCount/10*100)},
    {label:'샷 기록',value:clubCount+'회',target:'목표: 20회/월',pct:Math.min(100,clubCount/20*100)},
    {label:'챌린지 연속',value:v13ChallengeStreak+'일',target:'목표: 7일',pct:Math.min(100,v13ChallengeStreak/7*100)},
    {label:'업적 수',value:achs.length+'개',target:'목표: 10개',pct:Math.min(100,achs.length/10*100)},
    {label:'총 XP',value:v13XP,target:'목표: 100 XP',pct:Math.min(100,v13XP/100*100)}
  ];

  var metricsHtml = metrics.map(function(m){
    var barColor = m.pct>=100?'#34a853':(m.pct>=50?'#ffa726':'#e53935');
    return '<div style="margin-bottom:14px"><div style="display:flex;justify-content:space-between;margin-bottom:4px"><span style="font-size:13px;font-weight:700">'+m.label+'</span><span style="font-size:14px;font-weight:800;color:var(--primary)">'+m.value+'</span></div>'
      +'<div class="v13-progress"><div class="v13-progress-fill" style="width:'+m.pct+'%;background:'+barColor+'"></div></div>'
      +'<div style="font-size:10px;color:var(--text-muted)">'+m.target+'</div></div>';
  }).join('');

  ov.innerHTML = '<div class="v13-modal"><div class="v13-hdr"><h2><span class="v13i">📋</span> '+monthName+' 골프 체크업</h2><button class="v13-x" aria-label="닫기">&times;</button></div>'
    +'<div style="text-align:center;padding:28px;background:linear-gradient(135deg,var(--primary),#34a853);border-radius:20px;color:#fff;margin-bottom:20px">'
    +'<div style="font-size:14px;opacity:.8;margin-bottom:8px">종합 등급</div>'
    +'<div style="font-size:64px;font-weight:900;letter-spacing:-2px;color:'+gradeColor+'">'+grade+'</div>'
    +'<div style="font-size:16px;font-weight:700;margin-top:4px">'+score+' / 100점</div>'
    +'<div style="font-size:12px;opacity:.7;margin-top:8px">'
    +(roundCount>0?'평균 '+avgScore+'타 • 베스트 '+bestScore+'타':'아직 라운드 기록이 없습니다')
    +'</div></div>'
    +'<div class="v13-card"><h4>📊 월간 성과 지표</h4>'+metricsHtml+'</div>'
    +'<div class="v13-card" style="background:linear-gradient(135deg,rgba(26,122,58,.05),rgba(52,168,83,.05))"><h4>💡 이번 달 추천</h4><p>'
    +(roundCount<2?'• 라운드를 더 자주 기록하면 정확한 분석이 가능합니다<br>':'')
    +(puttCount<5?'• 퍼팅 연습을 더 기록해보세요 - 3m 이내 성공률이 핵심<br>':'')
    +(v13ChallengeStreak<3?'• 일일 챌린지를 연속으로 완료해보세요<br>':'')
    +(clubCount<10?'• 클럽별 비거리 기록을 시작해보세요<br>':'')
    +'• 꾸준한 기록이 실력 향상의 첨경입니다!</p></div>'
    +'</div>';

  ov.querySelector('.v13-x').addEventListener('click',function(){ov.classList.remove('active')});
  ov.addEventListener('click',function(e){if(e.target===ov)ov.classList.remove('active')});
  document.body.appendChild(ov);
  checkV13Achievement('v13_checkup','월간 체크업');
}

// === Quick Action Buttons ===
function addV13Buttons(){
  var container = document.querySelector('.search-section');
  if(!container) return;
  var existing = document.getElementById('v13QuickActions');
  if(existing) return;

  var wrap = document.createElement('div');
  wrap.id = 'v13QuickActions';
  wrap.style.cssText='display:flex;gap:8px;flex-wrap:wrap;margin-top:12px;padding:0 4px';

  var btns = [
    {label:'🗺️ 코스전략',fn:'showStrategyGuide'},
    {label:'📋 핸디캡',fn:'showHandicapCalc'},
    {label:'🍎 영양',fn:'showNutritionGuide'},
    {label:'🎯 퍼팅',fn:'showPuttingAnalyzer'},
    {label:'🏆 챌린지',fn:'showChallenges'},
    {label:'📊 통계',fn:'showAdvancedStats'},
    {label:'🏌️ 클럽분석',fn:'showClubAnalysis'},
    {label:'💬 명언',fn:'showGolfQuotes'},
    {label:'⛰️ 난이도',fn:'showDifficultyAnalyzer'},
    {label:'📋 체크업',fn:'showMonthlyCheckup'}
  ];

  btns.forEach(function(b){
    var btn = document.createElement('button');
    btn.className='v13-btn v13-btn-secondary v13-btn-sm';
    btn.textContent=b.label;
    btn.addEventListener('click',function(){
      switch(b.fn){
        case 'showStrategyGuide':showStrategyGuide();break;
        case 'showHandicapCalc':showHandicapCalc();break;
        case 'showNutritionGuide':showNutritionGuide();break;
        case 'showPuttingAnalyzer':showPuttingAnalyzer();break;
        case 'showChallenges':showChallenges();break;
        case 'showAdvancedStats':showAdvancedStats();break;
        case 'showClubAnalysis':showClubAnalysis();break;
        case 'showGolfQuotes':showGolfQuotes();break;
        case 'showDifficultyAnalyzer':showDifficultyAnalyzer();break;
        case 'showMonthlyCheckup':showMonthlyCheckup();break;
      }
    });
    wrap.appendChild(btn);
  });

  container.appendChild(wrap);
}

// === Keyboard Shortcuts ===
document.addEventListener('keydown',function(e){
  var t=e.target.tagName;
  if(t==='INPUT'||t==='TEXTAREA'||t==='SELECT') return;
  var k=e.key.toUpperCase();
  if(k==='1'&&e.ctrlKey){e.preventDefault();showStrategyGuide();}
  if(k==='2'&&e.ctrlKey){e.preventDefault();showHandicapCalc();}
  if(k==='N'&&!e.ctrlKey&&!e.shiftKey){showNutritionGuide();}
  if(k==='P'&&!e.ctrlKey&&!e.shiftKey){showPuttingAnalyzer();}
  if(k==='Y'&&!e.ctrlKey&&!e.shiftKey){showChallenges();}
});

// === Escape all v13 overlays ===
document.addEventListener('keydown',function(e){
  if(e.key==='Escape'){
    ['v13StrategyOverlay','v13HandicapOverlay','v13NutritionOverlay','v13PuttOverlay',
     'v13ChallengeOverlay','v13StatsOverlay','v13ClubOverlay','v13QuoteOverlay',
     'v13DiffOverlay','v13CheckupOverlay'].forEach(function(id){
      var el=document.getElementById(id);
      if(el)el.classList.remove('active');
    });
  }
});

// === Init ===
if(document.readyState==='loading'){
  document.addEventListener('DOMContentLoaded',addV13Buttons);
}else{
  addV13Buttons();
}

// Daily quote toast on load
setTimeout(function(){
  var lastQuoteDate = localStorage.getItem('sg_v13_lastQuote');
  var today = new Date().toISOString().slice(0,10);
  if(lastQuoteDate!==today){
    var q = GOLF_QUOTES[Math.floor(Date.now()/86400000)%GOLF_QUOTES.length];
    showV13Toast('💬 '+q.text+' - '+q.author);
    localStorage.setItem('sg_v13_lastQuote',today);
  }
},3000);

})();
