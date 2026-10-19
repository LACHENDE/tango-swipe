(()=>{'use strict';
const $=id=>document.getElementById(id),Q=new URLSearchParams(location.search);
const WORDS=[["ねこ", "猫"], ["いぬ", "犬"], ["そら", "空"], ["ほし", "星"], ["つき", "月"], ["うみ", "海"], ["やま", "山"], ["はな", "花", "鼻"], ["ゆき", "雪"], ["くま", "熊"], ["あめ", "雨", "飴"], ["すし", "寿司", "鮨"], ["たまご", "卵", "玉子"], ["さかな", "魚"], ["りんご", "林檎"], ["おかし", "お菓子"], ["みかん", "蜜柑"], ["さくら", "桜"], ["バス"], ["パン"], ["ペン"], ["ゴム"], ["ハム"], ["メモ"], ["カメラ"], ["テレビ"], ["トマト"], ["バナナ"], ["メロン"], ["ピアノ"], ["マスク"], ["ミルク"]];
const META=[{"kana": "ねこ", "romaji": "neko", "en": "cat", "zh": "猫", "emoji": "🐱", "script": "hira"}, {"kana": "いぬ", "romaji": "inu", "en": "dog", "zh": "狗", "emoji": "🐶", "script": "hira"}, {"kana": "そら", "romaji": "sora", "en": "sky", "zh": "天空", "emoji": "☁️", "script": "hira"}, {"kana": "ほし", "romaji": "hoshi", "en": "star", "zh": "星星", "emoji": "⭐", "script": "hira"}, {"kana": "つき", "romaji": "tsuki", "en": "moon", "zh": "月亮", "emoji": "🌙", "script": "hira"}, {"kana": "うみ", "romaji": "umi", "en": "sea", "zh": "大海", "emoji": "🌊", "script": "hira"}, {"kana": "やま", "romaji": "yama", "en": "mountain", "zh": "山", "emoji": "⛰️", "script": "hira"}, {"kana": "はな", "romaji": "hana", "en": "flower", "zh": "花", "emoji": "🌸", "script": "hira"}, {"kana": "ゆき", "romaji": "yuki", "en": "snow", "zh": "雪", "emoji": "❄️", "script": "hira"}, {"kana": "くま", "romaji": "kuma", "en": "bear", "zh": "熊", "emoji": "🐻", "script": "hira"}, {"kana": "あめ", "romaji": "ame", "en": "rain", "zh": "雨", "emoji": "🌧️", "script": "hira"}, {"kana": "すし", "romaji": "sushi", "en": "sushi", "zh": "寿司", "emoji": "🍣", "script": "hira"}, {"kana": "たまご", "romaji": "tamago", "en": "egg", "zh": "鸡蛋", "emoji": "🥚", "script": "hira"}, {"kana": "さかな", "romaji": "sakana", "en": "fish", "zh": "鱼", "emoji": "🐟", "script": "hira"}, {"kana": "りんご", "romaji": "ringo", "en": "apple", "zh": "苹果", "emoji": "🍎", "script": "hira"}, {"kana": "おかし", "romaji": "okashi", "en": "snacks", "zh": "零食", "emoji": "🍬", "script": "hira"}, {"kana": "みかん", "romaji": "mikan", "en": "mandarin", "zh": "橘子", "emoji": "🍊", "script": "hira"}, {"kana": "さくら", "romaji": "sakura", "en": "cherry blossom", "zh": "樱花", "emoji": "🌸", "script": "hira"}, {"kana": "バス", "romaji": "basu", "en": "bus", "zh": "公交车", "emoji": "🚌", "script": "kata"}, {"kana": "パン", "romaji": "pan", "en": "bread", "zh": "面包", "emoji": "🍞", "script": "kata"}, {"kana": "ペン", "romaji": "pen", "en": "pen", "zh": "笔", "emoji": "🖊️", "script": "kata"}, {"kana": "ゴム", "romaji": "gomu", "en": "rubber", "zh": "橡胶", "emoji": "🔴", "script": "kata"}, {"kana": "ハム", "romaji": "hamu", "en": "ham", "zh": "火腿", "emoji": "🍖", "script": "kata"}, {"kana": "メモ", "romaji": "memo", "en": "note", "zh": "便条", "emoji": "📝", "script": "kata"}, {"kana": "カメラ", "romaji": "kamera", "en": "camera", "zh": "相机", "emoji": "📷", "script": "kata"}, {"kana": "テレビ", "romaji": "terebi", "en": "TV", "zh": "电视", "emoji": "📺", "script": "kata"}, {"kana": "トマト", "romaji": "tomato", "en": "tomato", "zh": "番茄", "emoji": "🍅", "script": "kata"}, {"kana": "バナナ", "romaji": "banana", "en": "banana", "zh": "香蕉", "emoji": "🍌", "script": "kata"}, {"kana": "メロン", "romaji": "meron", "en": "melon", "zh": "甜瓜", "emoji": "🍈", "script": "kata"}, {"kana": "ピアノ", "romaji": "piano", "en": "piano", "zh": "钢琴", "emoji": "🎹", "script": "kata"}, {"kana": "マスク", "romaji": "masuku", "en": "mask", "zh": "口罩", "emoji": "😷", "script": "kata"}, {"kana": "ミルク", "romaji": "miruku", "en": "milk", "zh": "牛奶", "emoji": "🥛", "script": "kata"}];
const TEXT={
  "en": {
    "games": "← Games",
    "tag": "LITTLE WORDS. BIG JUMPS.",
    "title": "Tetsu’s<br>Sky Hop",
    "intro": "Read a little. Jump a little.<br>Reach the moon together, one cloud at a time.",
    "coop": "2-player co-op",
    "kana": "Hiragana + katakana",
    "short": "8 clouds to the moon",
    "create": "Climb with a friend",
    "room": "Room code",
    "join": "Join friend",
    "practice": "Take a practice hop →",
    "connection": "Connection",
    "global": "International",
    "china": "China route",
    "routeHelp": "The invite and room code keep you on the same connection. If a room won’t connect, try the other route together.",
    "how": "How does Sky Hop work?",
    "rules": "Say your word, or tap its kana in order. Both friends charge the jump. Tetsu springs to the next cloud automatically. Reach eight clouds to share a moon picnic!",
    "rules2": "Choose your own script and help level. Learning mode adds romaji, a next-kana glow, more time and soft landings. Finish first? Send a hint to your friend.",
    "voiceInfo": "Turn voice on once for the run, then keep reading. You can mute any time. Voice pauses when you leave the tab. Your browser may use an online speech service; audio and transcripts are not sent to your friend. Kana tiles always work.",
    "leave": "← Leave",
    "peek": "Romaji",
    "say": "🎤 Voice on",
    "undo": "Undo",
    "help": "Give your friend a boost ✦",
    "copy": "Copy friend invite ↗",
    "nice": "Nice!",
    "oops": "Oops!",
    "go": "Let’s go!",
    "you": "You",
    "friend": "Friend",
    "bot": "Practice bot",
    "done": "done ✓",
    "thinking": "reading…",
    "readyState": "ready",
    "waiting": "waiting",
    "bridge": "Cloud {n} / 8",
    "combo": "TEAM STREAK ×{n}",
    "roleBuild": "CHARGE THE JUMP",
    "roleShield": "CHARGE THE JUMP",
    "remember": "Read aloud, or tap the kana in order",
    "tap": "Tap the kana in order",
    "speaking": "Listening · just read the word",
    "stopMic": "● Voice on · mute",
    "opening": "Starting voice…",
    "wrong": "Almost! Try the kana again.",
    "sent": "Your star is ready! Help your friend.",
    "hintSent": "Boost sent 💛",
    "hintReceived": "Your friend gave you the next kana!",
    "peeked": "Reading help is on.",
    "voiceOff": "Voice is unavailable here. The kana tiles still work.",
    "micDenied": "Mic could not start. Keep going with the kana tiles.",
    "micMiss": "Try once more, or tap the glowing kana.",
    "micQuiet": "No speech heard. Try again, or use the tiles.",
    "connected": "Connected · {route}",
    "connecting": "Connecting…",
    "reconnecting": "Connection interrupted. Waiting to reconnect…",
    "offline": "Could not connect. Leave and try the other connection route.",
    "missing": "Waiting for the host. Check the room code.",
    "full": "This room already has two players.",
    "left": "Your friend left. Start a fresh adventure together.",
    "invalid": "Enter a six-character room code starting with G or C.",
    "invited": "Your friend invited you. Tap Join friend.",
    "copied": "Invite copied ✓",
    "ready": "Let’s hop!",
    "next": "Keep climbing →",
    "readyWait": "Ready! Waiting for your friend…",
    "cancelReady": "Ready · tap to cancel",
    "waitTitle": "Better with a buddy.",
    "waitText": "Send the invite. You can each choose a different script and help level.",
    "roomReady": "Your climbing buddy is here!",
    "roomText": "Choose voice once, then read each word. Or tap the kana. Your own help settings travel with you.",
    "countdown": "Ready to hop?",
    "getReady": "Two words. One big jump.",
    "cross": "Up we go!",
    "crossText": "+{n} stars. Next cloud coming…",
    "sync": "TOGETHER! +5 STARS",
    "splash": "The cloud caught you.",
    "splashText": "A fresh word, a fresh try. Your stars are safe.",
    "choiceTitle": "Halfway to the moon!",
    "choiceText": "Pick the next four clouds together. Different votes? We take the gentle route.",
    "safe": "Fluffy clouds\nMore time · regular stars",
    "risk": "Shooting stars\nFaster · double stars",
    "voted": "Your vote is in. Waiting for your friend.",
    "win": "Moon picnic unlocked!",
    "winText": "{n} stars · best team streak ×{combo}. You brought Tetsu all the way up!",
    "lose": "Time for a breather.",
    "loseText": "You collected {n} stars. The clouds are ready for another try.",
    "again": "One more climb →",
    "paused": "Take a breath.",
    "pausedText": "The run is paused. Both tap Resume when you’re back.",
    "resume": "Resume together",
    "ended": "Adventure interrupted",
    "practiceNote": "Practice partner · simulated answers",
    "hint": "HINT",
    "riskTag": "DOUBLE STARS",
    "readTag": "READ · JUMP · CHEER",
    "copyFallback": "Room {code}. Your friend can type it on this page.",
    "soundOff": "Sound off",
    "noPenalty": "Your stars are safe.",
    "notReady": "Waiting for a friend to join.",
    "level": "Your help",
    "guided": "Learning kana · help on",
    "independent": "I can read · help off",
    "script": "Your script",
    "hira": "あ · Hiragana",
    "kata": "ア · Katakana",
    "mixed": "あ + ア · Both",
    "profileNote": "Just for you. Your friend can choose differently.",
    "hear": "▶ Hear it",
    "pause": "Ⅱ Pause",
    "romajiHint": "Romaji + glowing kana + soft landings",
    "voiceIdle": "One tap for voice · or use the kana",
    "voiceLive": "Voice stays on · read each new word",
    "voicePaused": "Voice paused · resumes with your run",
    "voiceRetry": "Voice paused. Tap Voice on to reconnect.",
    "voiceMuted": "Voice off · kana tiles work too",
    "soft": "☁ Soft landings",
    "caught": "No heart lost. Let’s try another word.",
    "voiceUnsupported": "Voice unavailable · use kana tiles",
    "romajiOn": "Hide romaji",
    "romajiOff": "Show romaji",
    "listenUnavailable": "No Japanese voice on this device. Use the romaji.",
    "retryVoice": "Voice paused · tap to retry",
    "loading": "Getting the next cloud ready…"
  },
  "zh": {
    "games": "← 游戏",
    "tag": "小小的词，大大的跳跃",
    "title": "铁丸的<br>云朵跳跳",
    "intro": "读一点，跳高一点。<br>和朋友一起踩着云朵，去月亮上野餐。",
    "coop": "双人合作",
    "kana": "平假名 + 片假名",
    "short": "8 朵云到月亮",
    "create": "和朋友一起爬云朵",
    "room": "房间码",
    "join": "加入朋友",
    "practice": "先和练习伙伴跳一跳 →",
    "connection": "连接线路",
    "global": "国际线路",
    "china": "中国线路",
    "routeHelp": "邀请链接和房间码会让你们使用同一条线路。连不上时，请一起换另一条线路再试。",
    "how": "云朵跳跳怎么玩？",
    "rules": "读出你的词，或按顺序点击假名。两个人都完成后，铁丸会自动跳到下一朵云。跳过八朵云，就能一起在月亮上野餐！",
    "rules2": "各自选择假名和辅助等级。学习模式有罗马音、下一字提示、更多时间和安全着陆。先完成的话，可以给朋友一个提示。",
    "voiceInfo": "语音只需开启一次，就能连续读词，随时可以关闭。离开页面时会暂停。浏览器可能使用在线语音服务；录音和识别文字不会发给朋友。也可以一直点击假名游玩。",
    "leave": "← 离开",
    "peek": "罗马音",
    "say": "🎤 开启语音",
    "undo": "撤回",
    "help": "助朋友一臂之力 ✦",
    "copy": "复制邀请链接 ↗",
    "nice": "太棒了！",
    "oops": "哎呀！",
    "go": "冲呀！",
    "you": "你",
    "friend": "朋友",
    "bot": "练习伙伴",
    "done": "完成 ✓",
    "thinking": "正在拼词…",
    "readyState": "已准备",
    "waiting": "等待中",
    "bridge": "第 {n} / 8 朵云",
    "combo": "合作连击 ×{n}",
    "roleBuild": "为跳跃充能",
    "roleShield": "为跳跃充能",
    "remember": "读出来，或按顺序点击假名",
    "tap": "按顺序点击假名",
    "speaking": "正在听 · 直接读出这个词",
    "stopMic": "● 语音开启 · 关闭",
    "opening": "正在开启语音…",
    "wrong": "差一点！再试试假名顺序。",
    "sent": "你的星星准备好了！帮帮朋友吧。",
    "hintSent": "助力已送出 💛",
    "hintReceived": "朋友帮你填好了下一个假名！",
    "peeked": "读音提示已开启。",
    "voiceOff": "这里无法使用语音，可以继续点击假名。",
    "micDenied": "麦克风未能开启，请继续点击假名。",
    "micMiss": "再读一次，或点击亮起的假名。",
    "micQuiet": "没有听到声音，再试一次或点击假名。",
    "connected": "已连接 · {route}",
    "connecting": "连接中…",
    "reconnecting": "连接中断，正在尝试重连…",
    "offline": "连接失败，请离开并换一条线路重试。",
    "missing": "等待房主，请确认房间码。",
    "full": "这个房间已经有两个人啦。",
    "left": "朋友已离开，请重新创建冒险。",
    "invalid": "请输入以 G 或 C 开头的六位房间码。",
    "invited": "朋友邀请了你，点击“加入朋友”吧。",
    "copied": "邀请已复制 ✓",
    "ready": "开始跳！",
    "next": "继续向上 →",
    "readyWait": "准备好了！等待朋友…",
    "cancelReady": "已准备 · 点击取消",
    "waitTitle": "和朋友一起更好玩。",
    "waitText": "把邀请发给朋友。你们可以分别选择不同的假名和辅助等级。",
    "roomReady": "一起跳云朵的朋友到啦！",
    "roomText": "语音开启一次就能连续读词，也可以点击假名。每个人使用自己选择的辅助设置。",
    "countdown": "准备跳了吗？",
    "getReady": "两个词，一起起跳。",
    "cross": "跳上去啦！",
    "crossText": "+{n} 颗星星，下一朵云马上到！",
    "sync": "默契跳跃！额外 +5 星",
    "splash": "云朵接住你了。",
    "splashText": "星星都还在，换个词再试一次。",
    "choiceTitle": "到月亮的路走了一半啦！",
    "choiceText": "一起选接下来的四朵云。意见不同就走轻松路线。",
    "safe": "软绵绵的云\n时间更多 · 普通星星",
    "risk": "追着流星跑\n时间更短 · 双倍星星",
    "voted": "你已投票，等待朋友选择。",
    "win": "月亮野餐开始啦！",
    "winText": "{n} 颗星星 · 最高连击 ×{combo}。你们把铁丸送到月亮啦！",
    "lose": "歇一会儿吧。",
    "loseText": "你们拿到 {n} 颗星星。再一起跳一次？",
    "again": "再爬一次 →",
    "paused": "休息一下。",
    "pausedText": "冒险已暂停。回来后，两个人都点继续。",
    "resume": "一起继续",
    "ended": "冒险中断了",
    "practiceNote": "练习伙伴 · 模拟作答",
    "hint": "提示",
    "riskTag": "双倍星星",
    "readTag": "读一读 · 跳一跳 · 互相加油",
    "copyFallback": "房间码 {code}。朋友可以在这个页面输入加入。",
    "soundOff": "声音关闭",
    "noPenalty": "你的星星都还在。",
    "notReady": "等待朋友加入。",
    "level": "你的辅助",
    "guided": "正在学假名 · 开启辅助",
    "independent": "已经会读 · 关闭辅助",
    "script": "你的假名",
    "hira": "あ · 平假名",
    "kata": "ア · 片假名",
    "mixed": "あ + ア · 两种都练",
    "profileNote": "只影响你自己，朋友可以选不同的设置。",
    "hear": "▶ 听读音",
    "pause": "Ⅱ 暂停",
    "romajiHint": "罗马音 + 下一字提示 + 安全着陆",
    "voiceIdle": "开启一次语音 · 也可以点假名",
    "voiceLive": "语音已开启 · 继续读下一个词",
    "voicePaused": "语音已暂停 · 继续游戏后恢复",
    "voiceRetry": "语音暂停了，点击开启语音重试。",
    "voiceMuted": "语音已关闭 · 可以继续点假名",
    "soft": "☁ 安全着陆",
    "caught": "没有损失爱心，换个词再试试。",
    "voiceUnsupported": "这里无法使用语音 · 可以点击假名",
    "romajiOn": "隐藏罗马音",
    "romajiOff": "显示罗马音",
    "listenUnavailable": "设备没有日语语音，请参考罗马音。",
    "retryVoice": "语音暂停 · 点击重试",
    "loading": "正在准备下一朵云…"
  }
};
let lang=Q.get('lang')==='zh'||(!Q.has('lang')&&navigator.language.startsWith('zh'))?'zh':'en';
try{if(!Q.has('lang')&&localStorage.getItem('hop-lang'))lang=localStorage.getItem('hop-lang')==='zh'?'zh':'en';}catch(_){}
const t=(key,args={})=>(TEXT[lang][key]||key).replace(/\{(\w+)\}/g,(_,k)=>args[k]??'');
function translate(){document.documentElement.lang=lang==='zh'?'zh-CN':'en';document.querySelectorAll('[data-t]').forEach(e=>e.innerHTML=t(e.dataset.t));$('lang').textContent=lang==='en'?'中文':'EN';$('code').placeholder=lang==='zh'?'房间码':'ROOM CODE';render();}
const uid=()=>crypto.randomUUID().replace(/-/g,''),me=uid(),BROKERS={gl:'wss://broker.emqx.io:8084/mqtt',cn:'wss://broker-cn.emqx.io:8084/mqtt'};
const fields=['session','hostId','players','rev','run','phase','round','step','hearts','snacks','combo','bestCombo','path','ready','votes','words','done','times','peeked','hints','startAt','duration','deadline','outcome','resumePhase','remaining','profiles','advanceAt'];
const S={session:'',hostId:'',players:[],rev:0,run:1,phase:'waiting',round:0,step:0,hearts:3,snacks:0,combo:0,bestCombo:0,path:'pending',ready:[false,false],votes:[null,null],words:[0,1],done:[false,false],times:[0,0],peeked:[false,false],hints:[false,false],startAt:0,duration:14000,deadline:0,outcome:null,resumePhase:'active',remaining:45000,profiles:[{guide:true,script:'hira'},{guide:true,script:'hira'}],advanceAt:0};
let open=false,host=false,bot=false,client=null,connected=false,fatal='',route='gl',room='',topic='',peerSeen=0,lastPulse=0,joined=0,offset=0,rtt=Infinity,pings=new Map(),seen=new Set(),deck=[];
let input='',roundKey='',tileKey='',peekUntil=0,hintKey='',feedbackKey='',reactionUntil=0,reactCooldown=0,botAt=0,localBad=false,wasPhase='',lastFrame=0,visualStep=0,fx=0,netKey='connecting';
const profile=()=>({guide:$('level').value==='guided',script:$('script').value});
const validProfile=p=>p&&typeof p.guide==='boolean'&&['hira','kata','mixed'].includes(p.script);
const gentle=()=>S.profiles.some(p=>p.guide);
let showRomaji=true,submitted='',voiceWanted=false,micRestart=0,micFailures=0,voiceHold=false,utterance=null,speechStartKey='',micResultIndex=0,voiceError='';
const Recognition=window.SpeechRecognition||window.webkitSpeechRecognition;
let mic=null,micEpoch=0,micOn=false;
const my=()=>host?0:1,other=()=>1-my(),now=()=>Date.now()+(host?0:offset),word=()=>WORDS[S.words[my()]][0];
const normalize=x=>String(x).normalize('NFKC').replace(/[ァ-ヶ]/g,c=>String.fromCharCode(c.charCodeAt(0)-96)).replace(/[\s。、，,.!?！？「」『』・]/g,'');
const match=(x,w)=>w.some(a=>normalize(a)===normalize(x));
function note(k){feedbackKey=k;$('feedback').textContent=t(k);}
function packet(type,data={}){return {v:1,type,from:me,session:S.session,run:S.run,mid:uid(),...data};}
function send(type,data={}){if(client?.connected)client.publish(topic,JSON.stringify(packet(type,data)),{qos:1,retain:false});}
function snapshot(){return Object.fromEntries(fields.map(k=>[k,S[k]]));}
function broadcast(){S.rev++;if(!bot)send('state',{state:snapshot()});render();}
function request(action,data={}){if(host)command(me,action,data);else send('action',{action,round:S.round,...data});}
function drawWord(i,avoid=-1){const p=S.profiles[i];let pool=META.map((w,n)=>n).filter(n=>(p.script==='mixed'||META[n].script===p.script)&&(!p.guide||META[n].kana.length===2)&&n!==avoid&&n!==S.words[i]);return pool[Math.floor(Math.random()*pool.length)];}
function resetRun(){S.run++;Object.assign(S,{step:0,hearts:3,snacks:0,combo:0,bestCombo:0,path:'pending',votes:[null,null],round:0,outcome:null,done:[false,false],hints:[false,false],peeked:[false,false]});deck=[];}
function newRound(){
 S.round++;const first=drawWord(0);S.words=[first,drawWord(1,first)];
 S.done=[false,false];S.times=[0,0];S.peeked=[false,false];S.hints=[false,false];S.ready=[false,false];S.outcome=null;S.duration=gentle()?(S.path==='risk'?30000:45000):(S.path==='risk'?18000:25000);S.startAt=Date.now()+(S.round===1?2600:1100);S.advanceAt=0;S.deadline=S.startAt+S.duration;S.phase='countdown';botAt=S.startAt+3500+Math.random()*3200;broadcast();
}
function ready(id,value){const i=S.players.indexOf(id);if(i<0||!['waiting','result','finished','paused'].includes(S.phase))return;S.ready[i]=value;if(bot)S.ready[1]=true;
 if(S.ready.every(Boolean)&&S.players.length===2){
  if(S.phase==='finished')resetRun();
  if(S.phase==='paused'){S.ready=[false,false];if(['active','countdown'].includes(S.resumePhase)){S.startAt=Date.now()+2400;S.duration=Math.max(6000,S.remaining);S.deadline=S.startAt+S.duration;S.phase='countdown';botAt=S.startAt+2500;}else{S.phase=S.resumePhase;if(S.phase==='result')S.advanceAt=Date.now()+1800;}broadcast();return;}
  if(S.step===4&&S.path==='pending'){S.phase='choice';S.ready=[false,false];S.votes=[null,null];broadcast();return;}newRound();return;
 }broadcast();}
function command(id,action,d={}){
 if(!host||!open)return;const i=S.players.indexOf(id);if(i<0)return;
 if(action==='ready'&&typeof d.value==='boolean'){ready(id,d.value);return;}
 if(action==='pause'){pauseRun();return;}
 if(action==='vote'&&S.phase==='choice'&&['safe','risk'].includes(d.value)){S.votes[i]=d.value;if(bot)S.votes[1]=d.value;if(S.votes.every(Boolean)){S.path=S.votes.every(v=>v==='risk')?'risk':'safe';newRound();}else broadcast();return;}
 if(d.round!==S.round||S.phase!=='active'||Date.now()<S.startAt||Date.now()>S.deadline+700)return;
 if(action==='answer'&&!S.done[i]&&d.answer===WORDS[S.words[i]][0]){S.done[i]=true;S.times[i]=Date.now()-S.startAt;broadcast();if(S.done.every(Boolean))finishRound(true);}
 if(action==='peek'&&!S.done[i]){S.peeked[i]=true;broadcast();}
 if(action==='help'&&S.done[i]&&!S.done[1-i]&&!S.hints[1-i]){S.hints[1-i]=true;broadcast();}
}
function finishRound(success){if(!host||S.phase!=='active')return;let gain=0,sync=false;
 if(success){S.step++;S.combo++;S.bestCombo=Math.max(S.bestCombo,S.combo);sync=Math.abs(S.times[0]-S.times[1])<=2000;gain=(10+Math.min(S.combo,5)*2+(sync?5:0)+(S.peeked.some(Boolean)?0:3))*(S.path==='risk'?2:1);S.snacks+=gain;}
 else{if(!gentle())S.hearts--;S.combo=0;}
 S.outcome={kind:success?'cross':'splash',gain,sync};S.phase=S.step>=8||S.hearts<=0?'finished':'result';S.ready=[false,false];S.advanceAt=Date.now()+2400;broadcast();
}
function pauseRun(){if(!host||!['active','countdown','choice','result'].includes(S.phase))return;S.resumePhase=S.phase;S.remaining=Math.max(6000,S.deadline-Date.now());S.phase='paused';S.ready=[false,false];broadcast();}
// One explicit opt-in lasts for the run. Only final results from a current utterance count.
function voiceEligible(){return voiceWanted&&open&&!fatal&&(connected||bot)&&!document.hidden&&!voiceHold&&['waiting','countdown','active','result','choice'].includes(S.phase);}
function stopMic(disable=false){if(disable)voiceWanted=false;micEpoch++;clearTimeout(micRestart);micRestart=0;const old=mic;mic=null;micOn=false;speechStartKey='';if(old){old.onstart=old.onspeechstart=old.onresult=old.onerror=old.onend=null;try{old.abort();}catch(_){}}paintVoice();}
function paintVoice(){const suspended=voiceWanted&&!voiceEligible();$('mic').textContent=t(voiceWanted?(suspended?'voicePaused':'stopMic'):'say');$('mic').classList.toggle('on',voiceWanted);$('mic').setAttribute('aria-pressed',String(voiceWanted));$('voiceStatus').textContent=t(voiceWanted?(suspended?'voicePaused':'voiceLive'):voiceError||(!Recognition?'voiceUnsupported':'voiceIdle'));}
function ensureVoice(){if(!voiceEligible()||mic||micRestart)return;startMic();}
function startMic(){
 if(!Recognition||!voiceEligible()||mic)return;
 const epoch=++micEpoch,r=new Recognition();mic=r;micOn=true;micResultIndex=0;speechStartKey='';
 r.lang='ja-JP';r.continuous=true;r.interimResults=false;r.maxAlternatives=5;
 const current=()=>epoch===micEpoch&&mic===r&&voiceEligible();
 r.onstart=()=>{if(current())paintVoice();};
 r.onspeechstart=()=>{if(current())speechStartKey=canInput()?roundKey:'';};
 r.onresult=e=>{if(!current())return;micFailures=0;const key=roundKey,start=Math.max(e.resultIndex||0,micResultIndex);
  for(let n=start;n<e.results.length;n++){const row=e.results[n];if(!row.isFinal)continue;micResultIndex=n+1;
   if(!canInput()||!speechStartKey||speechStartKey!==key||roundKey!==key)continue;
   if(Array.from(row,a=>a.transcript).some(a=>match(a,WORDS[S.words[my()]]))){input=word();submit();speechStartKey='';break;}else note('micMiss');
  }
 };
 r.onerror=e=>{if(!current())return;if(['no-speech','aborted'].includes(e.error))return;micFailures++;if(['not-allowed','service-not-allowed','audio-capture','language-not-supported'].includes(e.error)||micFailures>=3){voiceError='voiceRetry';stopMic(true);note('micDenied');}};
 r.onend=()=>{if(epoch!==micEpoch||mic!==r)return;mic=null;micOn=false;speechStartKey='';if(voiceEligible()){micRestart=setTimeout(()=>{micRestart=0;ensureVoice();},500);}paintVoice();};
 try{r.start();}catch(_){voiceError='voiceRetry';stopMic(true);note('micDenied');}paintVoice();
}
function speak(){unlockSound();voiceError='';if(voiceWanted){stopMic(true);return;}if(!Recognition){note('voiceOff');$('voiceStatus').textContent=t('voiceUnsupported');return;}voiceWanted=true;micFailures=0;ensureVoice();paintVoice();}
function hear(){
 if(!canInput()||!window.speechSynthesis)return;const voices=speechSynthesis.getVoices().filter(v=>v.lang.startsWith('ja'));
 if(!voices.length){note('listenUnavailable');return;}
 voiceHold=true;stopMic();speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(word());utterance=u;u.voice=voices[0];u.lang='ja-JP';u.rate=.72;
 const end=()=>{if(utterance!==u)return;utterance=null;setTimeout(()=>{voiceHold=false;ensureVoice();paintVoice();},500);};u.onend=end;u.onerror=end;speechSynthesis.speak(u);
}
function canInput(){return open&&!fatal&&(connected||bot)&&S.phase==='active'&&!S.done[my()]&&now()>=S.startAt&&now()<=S.deadline;}
function submit(){if(!canInput())return;if(input===word()){if(submitted===roundKey)return;submitted=roundKey;request('answer',{round:S.round,answer:input});note('sent');}else{input='';note('wrong');$('task').classList.remove('shake');void $('task').offsetWidth;$('task').classList.add('shake');}renderTask();}
function tap(c){if(!canInput())return;input+=c;if(input.length>=word().length)submit();else{feedbackKey='';renderTask();}}
function makeTiles(){const needed=[...new Set(word())],alphabet=META[S.words[my()]].script==='kata'?'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワン':'あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわん',extra=[...alphabet].filter(c=>!needed.includes(c));while(needed.length<4)needed.push(extra.splice(Math.floor(Math.random()*extra.length),1)[0]);needed.sort(()=>Math.random()-.5);$('tiles').replaceChildren(...needed.map(c=>{const b=document.createElement('button');b.type='button';b.textContent=c;b.dataset.kana=c;b.onclick=()=>tap(c);return b;}));}
function valid(d){
 const num=(v,min,max)=>Number.isFinite(v)&&v>=min&&v<=max,arr=(v,fn)=>Array.isArray(v)&&v.length===2&&v.every(fn),bool=x=>typeof x==='boolean';
 return d&&typeof d.session==='string'&&d.session.length<=40&&typeof d.hostId==='string'&&Array.isArray(d.players)&&d.players.length<=2&&d.players[0]===d.hostId&&d.players.every(p=>typeof p==='string'&&p.length<=40)&&Number.isInteger(d.rev)&&Number.isInteger(d.run)&&d.run>=1&&['waiting','countdown','active','result','choice','paused','finished'].includes(d.phase)&&Number.isInteger(d.round)&&d.round>=0&&Number.isInteger(d.step)&&num(d.step,0,8)&&Number.isInteger(d.hearts)&&num(d.hearts,0,3)&&num(d.snacks,0,10000)&&num(d.combo,0,8)&&num(d.bestCombo,0,8)&&['pending','safe','risk'].includes(d.path)&&arr(d.ready,bool)&&arr(d.done,bool)&&arr(d.peeked,bool)&&arr(d.hints,bool)&&arr(d.words,x=>Number.isInteger(x)&&x>=0&&x<WORDS.length)&&arr(d.times,x=>num(x,0,65000))&&arr(d.votes,x=>x===null||['safe','risk'].includes(x))&&num(d.startAt,0,1e14)&&num(d.deadline,0,1e14)&&num(d.duration,0,65000)&&num(d.remaining,0,65000)&&['active','countdown','choice','result'].includes(d.resumePhase)&&arr(d.profiles,validProfile)&&num(d.advanceAt,0,1e14)&&(!d.outcome||(['cross','splash'].includes(d.outcome.kind)&&num(d.outcome.gain,0,1000)&&bool(d.outcome.sync)));
}
function receive(raw){if(raw.length>6000)return;let m;try{m=JSON.parse(raw);}catch(_){return;}if(m.v!==1||m.from===me||typeof m.from!=='string'||m.from.length>40)return;
 if(m.type==='hello'&&host){if(!validProfile(m.profile))return;if(S.players.length===1){S.players.push(m.from);S.profiles[1]=m.profile;peerSeen=Date.now();broadcast();}else if(S.players[1]!==m.from){send('full',{to:m.from});return;}peerSeen=Date.now();send('state',{state:snapshot()});return;}
 if(m.type==='full'&&!host&&m.to===me&&!S.hostId){fatal='full';render();return;}
 if(m.type==='state'&&!host){const d=m.state;if(!valid(d)||d.hostId!==m.from||!d.players.includes(me)||(S.hostId&&S.hostId!==m.from)||(S.session&&S.session!==d.session))return;peerSeen=Date.now();if(S.session&&d.rev<=S.rev)return;Object.assign(S,Object.fromEntries(fields.map(k=>[k,d[k]])));ping();render();return;}
 if(m.session!==S.session||m.run!==S.run||!S.players.includes(m.from))return;peerSeen=Date.now();
 if(m.type==='ping'&&host&&Number.isFinite(m.t0))send('pong',{to:m.from,t0:m.t0,t1:Date.now()});
 if(m.type==='pong'&&!host&&m.to===me&&pings.has(m.t0)&&Number.isFinite(m.t1)){pings.delete(m.t0);const rt=Date.now()-m.t0;if(rt<rtt){rtt=rt;offset=m.t1-(m.t0+rt/2);}}
 if(m.type==='leave'){fatal='left';stopMic(true);render();return;}
 if(m.type==='reaction'&&['nice','oops','go'].includes(m.value))showReaction(m.value);
 if(m.type==='action'&&host&&typeof m.mid==='string'&&!seen.has(m.mid)){seen.add(m.mid);if(seen.size>256)seen.delete(seen.values().next().value);command(m.from,m.action,m);}
}
function ping(){if(host||!S.hostId)return;const t0=Date.now();pings.set(t0,true);if(pings.size>10)pings.delete(pings.keys().next().value);send('ping',{t0});}
function connect(){netKey='connecting';connected=false;const c=mqtt.connect(BROKERS[route],{clientId:'hop_'+me,clean:true,keepalive:10,reconnectPeriod:2500,connectTimeout:9000});client=c;
 c.on('connect',()=>{if(client!==c)return;c.subscribe(topic,{qos:1},err=>{if(client!==c)return;if(err){netKey='offline';render();return;}connected=true;netKey='connected';if(host)broadcast();else send('hello',{profile:profile()});render();});});
 c.on('message',(_,b)=>{if(client===c&&open)receive(b.toString());});
 c.on('error',()=>{if(client===c){netKey='offline';render();}});
 c.on('close',()=>{if(client!==c||!open)return;connected=false;netKey='reconnecting';stopMic();if(host)pauseRun();render();});
}
function openRoom(code,isHost,practice=false){leave(false);open=true;host=isHost;bot=practice;room=code;route=code.startsWith('C')?'cn':'gl';topic='tangoswipe/sky-hop/v1/'+code;fatal='';connected=practice;peerSeen=0;joined=Date.now();lastPulse=0;offset=0;rtt=Infinity;pings.clear();seen.clear();deck=[];roundKey='';tileKey='';hintKey='';feedbackKey='';input='';visualStep=0;wasPhase='';
 showRomaji=profile().guide;submitted='';
 Object.assign(S,{session:host?uid():'',hostId:host?me:'',players:host?(bot?[me,'bot']:[me]):[],rev:0,run:1,phase:'waiting',round:0,step:0,hearts:3,snacks:0,combo:0,bestCombo:0,path:'pending',ready:[false,false],votes:[null,null],words:[0,1],done:[false,false],times:[0,0],peeked:[false,false],hints:[false,false],startAt:0,duration:14000,deadline:0,outcome:null,resumePhase:'active',remaining:45000,profiles:[{guide:true,script:'hira'},{guide:true,script:'hira'}],advanceAt:0});
 S.profiles=[profile(),bot?profile():{guide:true,script:'hira'}];voiceError='';
 $('home').hidden=true;$('play').hidden=false;$('copy').textContent=t('copy');render();if(!bot)try{connect();}catch(_){netKey='offline';render();}
}
function leave(home=true){if(open&&!bot)send('leave');open=false;stopMic(true);voiceHold=false;utterance=null;if(window.speechSynthesis)speechSynthesis.cancel();const c=client;client=null;if(c)try{const deadline=setTimeout(()=>c.end(true),1800);c.end(!c.connected,{},()=>clearTimeout(deadline));}catch(_){}if(home){$('play').hidden=true;$('home').hidden=false;}}
function showReaction(value){$('reaction').textContent=({nice:'💛 ',oops:'🙈 ',go:'🔥 '})[value]+t(value);reactionUntil=performance.now()+2400;}
function renderTask(){
 const i=my(),active=S.phase==='active',meta=META[S.words[i]];
 $('role').textContent=t('roleBuild');$('cue').textContent=t(S.done[i]?'sent':micOn?'speaking':'remember');
 $('word').textContent=word();$('wordBubble').classList.toggle('right',![1,3,5,7].includes(S.step));$('romaji').textContent=showRomaji?meta.romaji:'';$('meaning').textContent=S.done[i]?'✓ '+t('done'):meta.emoji+' '+meta[lang];
 $('slots').textContent=S.done[i]?'✦':input+'＿'.repeat(Math.max(0,word().length-input.length));
 $('tiles').hidden=S.done[i];$('actions').hidden=S.done[i];$('help').hidden=!S.done[i]||S.done[other()];$('help').disabled=S.hints[other()];$('help').textContent=t(S.hints[other()]?'hintSent':'help');
 $('peek').textContent=t(showRomaji?'romajiOn':'romajiOff');
 $('tiles').querySelectorAll('button').forEach(b=>{b.disabled=!canInput()||submitted===roundKey;b.classList.toggle('suggested',S.profiles[i].guide&&b.dataset.kana===word()[input.length]);});$('feedback').textContent=feedbackKey?t(feedbackKey):'';
 const remaining=Math.max(0,S.deadline-now());$('clock').textContent=Math.ceil(remaining/1000)+'s';$('timeFill').style.transform='scaleX('+Math.max(0,Math.min(1,remaining/S.duration))+')';
 paintVoice();
}
function render(){if(!open)return;
 const key=S.run+':'+S.round+':'+S.startAt;
 if(key!==roundKey){roundKey=key;input='';peekUntil=0;feedbackKey='';submitted='';speechStartKey='';}
 if(tileKey!==S.run+':'+S.round){tileKey=S.run+':'+S.round;makeTiles();}
 if(S.hints[my()]&&hintKey!==tileKey){hintKey=tileKey;if(!S.done[my()]){input=word().slice(0,Math.min(word().length,input.length+1));peekUntil=now()+1800;note('hintReceived');if(input===word()&&canInput())submit();}}
 if(S.phase!==wasPhase){if(['paused','finished'].includes(S.phase))stopMic(S.phase==='finished');if(['result','finished'].includes(S.phase)){fx=1;tone(S.outcome?.kind==='cross');}wasPhase=S.phase;}
 $('hearts').textContent=gentle()?t('soft'):'♥ '.repeat(S.hearts)+'♡ '.repeat(3-S.hearts);$('snacks').textContent='✦ '+S.snacks;$('stage').textContent=t('bridge',{n:Math.min(8,S.step+1)});$('combo').textContent=S.combo>1?t('combo',{n:S.combo}):S.path==='risk'?t('riskTag'):'';
 const status=i=>S.done[i]?t('done'):['active','countdown'].includes(S.phase)?t('thinking'):S.ready[i]?t('readyState'):t('waiting');
 $('youState').textContent=t('you')+' · '+status(my());$('friendState').textContent=t(bot?'bot':'friend')+' · '+status(other());
 const playable=!fatal&&(connected||bot)&&S.phase==='active';$('task').hidden=!playable;$('panel').hidden=playable;
 $('choice').hidden=S.phase!=='choice'||!!fatal||!connected;$('ready').hidden=['choice','countdown','result'].includes(S.phase);$('copy').hidden=bot||!['waiting','paused'].includes(S.phase)||!connected||!!fatal;
 $('ready').disabled=S.players.length!==2||(!connected&&!bot)||!!fatal;
 $('ready').textContent=t(S.ready[my()]?'cancelReady':S.phase==='paused'?'resume':S.phase==='finished'?'again':S.phase==='result'?'next':'ready');
 $('safe').textContent=t('safe');$('risk').textContent=t('risk');$('safe').classList.toggle('selected',S.votes[my()]==='safe');$('risk').classList.toggle('selected',S.votes[my()]==='risk');
 $('roomCode').textContent=!bot&&S.phase==='waiting'?room:'';
 let title='',desc='',tag=t('readTag');
 if(fatal){title=t('ended');desc=t(fatal);$('ready').hidden=true;$('choice').hidden=true;}
 else if(!connected&&!bot){title=t('connecting');desc=t(netKey);$('ready').hidden=true;}
 else if(S.phase==='waiting'){title=t(S.players.length===2?'roomReady':'waitTitle');desc=t(S.players.length===2?'roomText':'waitText');}
 else if(S.phase==='countdown'){title=String(Math.max(1,Math.min(3,Math.ceil((S.startAt-now())/1000))));desc=t('getReady');tag=t('countdown');}
 else if(S.phase==='choice'){title=t('choiceTitle');desc=t(S.votes[my()]?'voted':'choiceText');}
 else if(S.phase==='paused'){title=t('paused');desc=t('pausedText');tag=t('noPenalty');}
 else if(S.phase==='finished'){title=t(S.step>=8?'win':'lose');desc=t(S.step>=8?'winText':'loseText',{n:S.snacks,combo:S.bestCombo});tag='🌙 🍡 ✦';}
 else if(S.phase==='result'){const win=S.outcome?.kind==='cross';title=t(win?'cross':'splash');desc=t(win?'crossText':gentle()?'caught':'splashText',{n:S.outcome?.gain||0});tag=S.outcome?.sync?t('sync'):t('readTag');}
 $('panelTag').textContent=tag;$('panelTitle').textContent=title;$('panelText').textContent=S.ready[my()]?t('readyWait'):desc;
 $('net').textContent=bot?t('practiceNote'):t(netKey,{route:t(route==='cn'?'china':'global')});$('wordBubble').hidden=!playable;$('pause').hidden=!['active','countdown','result','choice'].includes(S.phase);if(playable)renderTask();if(voiceEligible())ensureVoice();paintVoice();
}
let soundContext;
function tone(good){if(document.hidden)return;try{if(!soundContext)return;const o=soundContext.createOscillator(),g=soundContext.createGain();o.connect(g);g.connect(soundContext.destination);o.type='sine';o.frequency.setValueAtTime(good?523:240,soundContext.currentTime);o.frequency.exponentialRampToValueAtTime(good?784:120,soundContext.currentTime+.15);g.gain.setValueAtTime(.045,soundContext.currentTime);g.gain.exponentialRampToValueAtTime(.001,soundContext.currentTime+.25);o.start();o.stop(soundContext.currentTime+.26);}catch(_){}}
function unlockSound(){try{soundContext??=new(window.AudioContext||window.webkitAudioContext)();soundContext.resume();}catch(_){}}
const canvas=$('world'),ctx=canvas.getContext('2d'),images={};
for(const name of ['tetsu','kappa']){images[name]=new Image();images[name].src='assets/characters/'+name+'.png';}
let viewH=360,animFrom=0,animTo=0,hopAt=0;
const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
function resize(){const r=canvas.getBoundingClientRect(),d=Math.min(devicePixelRatio||1,2);if(!r.width)return;canvas.width=r.width*d;canvas.height=r.height*d;viewH=360*r.height/r.width;ctx.setTransform(canvas.width/360,0,0,canvas.width/360,0,0);}new ResizeObserver(resize).observe(canvas);
function sprite(name,x,y,h){const im=images[name];if(!im.naturalWidth)return;const b=name==='tetsu'?[159,21,961,1192]:[94,111,1045,1042],w=h*b[2]/b[3];ctx.drawImage(im,...b,x-w/2,y-h,w,h);}
function cloud(x,y,w,color){ctx.fillStyle=color;ctx.beginPath();ctx.ellipse(x,y,w/2,12,0,0,Math.PI*2);ctx.ellipse(x-w*.22,y-7,w*.23,17,0,0,Math.PI*2);ctx.ellipse(x+w*.12,y-12,w*.26,20,0,0,Math.PI*2);ctx.fill();}
function scene(time,dt){
 const h=viewH,w=360;ctx.clearRect(0,0,w,h);const bg=ctx.createLinearGradient(0,0,0,h);bg.addColorStop(0,'#181d46');bg.addColorStop(1,'#786c9c');ctx.fillStyle=bg;ctx.fillRect(0,0,w,h);
 if(S.step!==animTo){animFrom=visualStep;animTo=S.step;hopAt=time;}
 const p=reduced?1:Math.min(1,(time-hopAt)/850),ease=p*p*(3-2*p);visualStep=animFrom+(animTo-animFrom)*ease;
 const base=h-43,gap=Math.max(100,Math.min(135,h*.36)),xs=[106,252,106,252,130,255,100,250,180];
 for(let j=0;j<28;j++){const x=(j*83+21)%360,y=((j*53+visualStep*gap*.17)%(h+25));ctx.fillStyle=j%4===0?'#ffe1a4':'#b8b4dc77';ctx.beginPath();ctx.arc(x,y,j%4===0?1.8:1,0,Math.PI*2);ctx.fill();}
 ctx.fillStyle='#ffdc98';ctx.beginPath();ctx.arc(297,62,25,0,Math.PI*2);ctx.fill();ctx.fillStyle='#242649';ctx.beginPath();ctx.arc(309,54,22,0,Math.PI*2);ctx.fill();
 for(let j=0;j<3;j++)cloud(j*151-20,((j*110+visualStep*gap*.3)%(h+60))-30,125,'#a4a0c414');
 for(let k=Math.max(0,Math.floor(visualStep)-2);k<=Math.min(8,Math.ceil(visualStep)+4);k++){const y=base+(visualStep-k)*gap;if(y< -60||y>h+60)continue;cloud(xs[k],y,k===8?150:100,k<=S.step?'#d4daed':'#aca9d1');ctx.fillStyle=k<=S.step?'#a2f1d6':'#eee7ff';ctx.fillRect(xs[k]-30,y-24,60,3);if(k>S.step){ctx.font='19px system-ui';ctx.textAlign='center';ctx.fillStyle='#ffda8a';ctx.fillText('✦',xs[k],y-38);}if(k===8){ctx.font='25px system-ui';ctx.fillText('🍡',xs[k]+35,y-28);}}
 const lo=Math.max(0,Math.min(8,Math.floor(visualStep))),hi=Math.min(8,lo+1),f=visualStep-lo,x=xs[lo]+(xs[hi]-xs[lo])*f,jump=animTo>animFrom?Math.sin(p*Math.PI)*48:0;
 sprite('tetsu',x,base-22-jump+(reduced?0:Math.sin(time*.003)*1.3),78);
 for(let i=0;i<2;i++){ctx.fillStyle=S.done[i]?(i===my()?'#83f0cf':'#ffb6d1'):'#ffffff33';ctx.beginPath();ctx.arc(x-17+i*34,base-112-jump,7,0,Math.PI*2);ctx.fill();}
 if(fx>0&&!reduced){ctx.fillStyle='#ffe4a2';for(let j=0;j<7;j++){const a=j*Math.PI*2/7,r=(1-fx)*46;ctx.beginPath();ctx.arc(x+Math.cos(a)*r,base-70-jump+Math.sin(a)*r,2.3*fx,0,Math.PI*2);ctx.fill();}fx=Math.max(0,fx-dt*.9);}
}
function tick(ts){const dt=Math.min(.05,(ts-lastFrame)/1000||.016);lastFrame=ts;
 if(open){const time=Date.now();
  if(host&&!fatal&&(connected||bot)&&S.phase==='result'&&time>=S.advanceAt){if(S.step===4&&S.path==='pending'){S.phase='choice';S.votes=[null,null];broadcast();}else newRound();}
  if(host&&!fatal&&(connected||bot)&&S.phase==='countdown'&&time>=S.startAt){S.phase='active';broadcast();}
  if(host&&!fatal&&S.phase==='active'&&(connected||bot)){if(bot&&!S.done[1]&&time>=botAt)command('bot','answer',{round:S.round,answer:WORDS[S.words[1]][0]});if(bot&&S.done[1]&&!S.done[0]&&!S.hints[0]&&time>=botAt+1800)command('bot','help',{round:S.round});if(S.phase==='active'&&time>S.deadline+700)finishRound(false);}
  if(!bot&&!fatal&&connected&&time-lastPulse>1000){lastPulse=time;if(host){send('state',{state:snapshot()});if(peerSeen&&time-peerSeen>5500)pauseRun();}else{send('pulse');ping();if(!S.hostId){send('hello',{profile:profile()});if(time-joined>10000)netKey='missing';}else if(peerSeen&&time-peerSeen>5500){stopMic();netKey='reconnecting';}}}
  if(!fatal&&(connected||bot)){if(S.phase==='active')renderTask();else if(S.phase==='countdown')$('panelTitle').textContent=String(Math.max(1,Math.min(3,Math.ceil((S.startAt-now())/1000))));}
  if(reactionUntil&&ts>reactionUntil){$('reaction').textContent='';reactionUntil=0;}
  scene(ts,dt);
 }requestAnimationFrame(tick);
}
$('create').onclick=()=>{const chars='ABCDEFGHJKLMNPQRSTUVWXYZ23456789',a=crypto.getRandomValues(new Uint8Array(5));openRoom(($('server').value==='cn'?'C':'G')+Array.from(a,n=>chars[n%chars.length]).join(''),true);};
$('joinForm').onsubmit=e=>{e.preventDefault();const code=$('code').value.trim().toUpperCase();if(!/^[GC][A-Z2-9]{5}$/.test(code)){$('homeNote').textContent=t('invalid');return;}openRoom(code,false);};
$('practice').onclick=()=>openRoom('',true,true);$('leave').onclick=()=>leave();$('ready').onclick=()=>{unlockSound();request('ready',{value:!S.ready[my()]});};
$('peek').onclick=()=>{showRomaji=!showRomaji;renderTask();};$('undo').onclick=()=>{if(!canInput())return;input=input.slice(0,-1);renderTask();};$('mic').onclick=speak;$('hear').onclick=hear;$('pause').onclick=()=>request('pause');$('help').onclick=()=>{request('help',{round:S.round});note('hintSent');};
for(const v of ['safe','risk'])$(v).onclick=()=>request('vote',{value:v});
$('lang').onclick=()=>{lang=lang==='en'?'zh':'en';try{localStorage.setItem('hop-lang',lang);}catch(_){}translate();};
document.querySelectorAll('[data-react]').forEach(b=>b.onclick=()=>{if(performance.now()-reactCooldown<1400)return;reactCooldown=performance.now();showReaction(b.dataset.react);if(!bot)send('reaction',{value:b.dataset.react});});
$('copy').onclick=async()=>{const url=new URL('hop.html',location.href);url.searchParams.set('room',room);try{await navigator.clipboard.writeText('Tetsu’s Sky Hop · '+room+'\n'+url.href);$('copy').textContent=t('copied');}catch(_){$('roomCode').textContent=t('copyFallback',{code:room});}};
document.addEventListener('visibilitychange',()=>{if(document.hidden&&open){stopMic();request('pause');}});window.addEventListener('pagehide',()=>leave(false));
if(Q.get('room')){$('code').value=Q.get('room').toUpperCase().slice(0,6);$('server').value=Q.get('room').startsWith('C')?'cn':'gl';$('homeNote').textContent=t('invited');}
if(Q.get('test')==='1')window.__hop={S,WORDS,me,command,receive,request,openRoom,leave,match,get:()=>({open,host,bot,connected,room,route,input,micOn,voiceWanted,roundKey,offset,submitted,visualStep}),pauseRun};
try{const p=JSON.parse(localStorage.getItem('hop-profile'));if(validProfile(p)){$('level').value=p.guide?'guided':'independent';$('script').value=p.script;}}catch(_){}
for(const id of ['level','script'])$(id).onchange=()=>{try{localStorage.setItem('hop-profile',JSON.stringify(profile()));}catch(_){}};
translate();requestAnimationFrame(tick);
})();
