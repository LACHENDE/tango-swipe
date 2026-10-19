(()=>{'use strict';
const $=id=>document.getElementById(id),Q=new URLSearchParams(location.search);
const WORDS=[['ねこ','猫'],['いぬ','犬'],['くま','熊'],['とり','鳥'],['うま','馬'],['しか','鹿'],['さる','猿'],['うし','牛'],['かめ','亀'],['たこ','蛸'],['いか','烏賊'],['さかな','魚'],['はな','花','鼻'],['やま','山'],['かわ','川','皮'],['うみ','海'],['そら','空'],['あめ','雨','飴'],['ゆき','雪'],['ほし','星'],['つき','月'],['みず','水'],['すし','寿司','鮨'],['たまご','卵','玉子'],['りんご','林檎'],['みかん','蜜柑'],['さくら','桜'],['あさ','朝'],['よる','夜'],['いえ','家'],['かさ','傘'],['くつ','靴'],['ふね','船','舟'],['つくえ','机'],['とけい','時計'],['くるま','車'],['こころ','心'],['おかし','お菓子'],['かがみ','鏡'],['たぬき','狸']];
const TEXT={
en:{games:'← Games',tag:'A LITTLE ADVENTURE FOR TWO',title:'Tetsu’s<br>Snack Run',intro:'Two friends. One hungry ninja dog.<br>Get him across the river. Bring back the snacks.',coop:'2-player co-op',kana:'Hiragana only',short:'3–5 minutes',create:'Start an adventure',room:'Room code',join:'Join friend',practice:'Try with a practice partner →',connection:'Connection',global:'International',china:'China route',routeHelp:'The invite and room code keep you on the same connection. If a room won’t connect, try the other route together.',how:'How do we play?',rules:'You each get a different word. Read it, remember it, then tap its kana — or say it into the mic. Both words complete one bridge. Eight bridges get Tetsu home!',rules2:'Finish early? Send your friend a hint. After four bridges, choose a safe path or a shorter timer for double snacks. You share three hearts, so help each other.',voiceInfo:'Voice is optional. Your browser may use an online speech service. Mic audio and transcripts are not sent to your friend. You can keep playing with kana tiles if voice doesn’t work.',leave:'← Leave',peek:'Peek',say:'🎤 Say it',undo:'Undo',help:'Send your friend a hint ✦',copy:'Copy friend invite ↗',nice:'Nice!',oops:'Oops!',go:'Let’s go!',you:'You',friend:'Friend',bot:'Practice bot',done:'done ✓',thinking:'reading…',readyState:'ready',waiting:'waiting',bridge:'Bridge {n} / 8',combo:'TEAM COMBO ×{n}',roleBuild:'BUILD THE BRIDGE',roleShield:'GUARD TETSU',remember:'Remember this word…',tap:'Tap the kana in order, or say the word.',speaking:'Listening… say the word',stopMic:'Mic on · stop',opening:'Opening microphone…',wrong:'Almost! Try the kana again.',sent:'Your half is ready! Help your friend.',hintSent:'Hint sent 💛',hintReceived:'Your friend sent the next kana!',peeked:'Take another look. You’ve got this.',voiceOff:'Voice is unavailable here. The kana tiles still work.',micDenied:'Mic could not start. Keep going with the kana tiles.',micMiss:'Not quite. Try again, or tap the kana.',micQuiet:'No speech heard. Try again, or use the tiles.',connected:'Connected · {route}',connecting:'Connecting…',reconnecting:'Connection interrupted. Waiting to reconnect…',offline:'Could not connect. Leave and try the other connection route.',missing:'Waiting for the host. Check the room code.',full:'This room already has two players.',left:'Your friend left. Start a fresh adventure together.',invalid:'Enter a six-character room code starting with G or C.',invited:'Your friend invited you. Tap Join friend.',copied:'Invite copied ✓',ready:'Ready to go!',next:'Next bridge →',readyWait:'Ready! Waiting for your friend…',cancelReady:'Ready · tap to cancel',waitTitle:'Bring your friend.',waitText:'Send the invite. You each have a different word, and Tetsu needs you both.',roomReady:'Your team is here!',roomText:'Remember the word, then rebuild it with kana tiles. The microphone is optional.',countdown:'Here we go!',getReady:'Different words. One team.',cross:'Bridge complete!',crossText:'+{n} snacks. Your teamwork got Tetsu across.',sync:'IN SYNC! +5 BONUS',splash:'A little splash.',splashText:'One heart lost, but your snacks are safe. Take a breath and try a new pair.',choiceTitle:'Feeling brave?',choiceText:'Choose together. If you disagree, Tetsu takes the safe path.',safe:'Safe path\n14 seconds · normal snacks',risk:'Snack shortcut\n10 seconds · double snacks',voted:'Your vote is in. Waiting for your friend.',win:'Snacks secured!',winText:'{n} snacks · best combo ×{combo}. Tetsu owes you both dinner.',lose:'The snacks got soggy.',loseText:'You saved {n} snacks. Want another go together?',again:'Another adventure →',paused:'Take a breath.',pausedText:'The run is paused. Both tap Resume when you’re back.',resume:'Resume together',ended:'Adventure interrupted',practiceNote:'Practice partner · simulated answers',hint:'HINT',riskTag:'DOUBLE SNACKS',readTag:'READ · REMEMBER · TEAM UP',copyFallback:'Room {code}. Your friend can type it on this page.',soundOff:'Sound off',noPenalty:'This pause costs no hearts.',notReady:'Waiting for a friend to join.'},
zh:{games:'← 游戏',tag:'两个人的小冒险',title:'铁丸的<br>零食大作战',intro:'两个朋友，一只贪吃的忍犬。<br>一起过河，把零食带回家。',coop:'双人合作',kana:'只用平假名',short:'约 3–5 分钟',create:'创建冒险',room:'房间码',join:'加入朋友',practice:'先和练习伙伴试试 →',connection:'连接线路',global:'国际线路',china:'中国线路',routeHelp:'邀请链接和房间码会让你们使用同一条线路。连不上时，请一起换另一条线路再试。',how:'怎么玩？',rules:'你们各自拿到不同的词。看一看、记住它，再按顺序点击假名，也可以用麦克风读出来。两个人都完成才能搭好桥。过八座桥就到家！',rules2:'先完成了？给朋友一个提示吧。过四座桥后，一起选择安全路线，或挑战更短时间拿双倍零食。你们共用三颗心，要互相帮助哦。',voiceInfo:'语音是可选的。浏览器可能使用在线语音服务。游戏不会把录音或语音文字发给朋友。语音不可用时，照样可以点击假名游玩。',leave:'← 离开',peek:'再看一眼',say:'🎤 读出来',undo:'撤回',help:'给朋友一个提示 ✦',copy:'复制邀请链接 ↗',nice:'太棒了！',oops:'哎呀！',go:'冲呀！',you:'你',friend:'朋友',bot:'练习伙伴',done:'完成 ✓',thinking:'正在拼词…',readyState:'已准备',waiting:'等待中',bridge:'第 {n} / 8 座桥',combo:'合作连击 ×{n}',roleBuild:'搭好桥梁',roleShield:'保护铁丸',remember:'记住这个词…',tap:'按顺序点假名，或用麦克风读出来。',speaking:'正在听，请读出来',stopMic:'麦克风开启 · 停止',opening:'正在打开麦克风…',wrong:'差一点！再试试假名顺序。',sent:'你这边完成啦！帮帮朋友吧。',hintSent:'提示已送出 💛',hintReceived:'朋友帮你填了一个假名！',peeked:'再看一眼。你可以的！',voiceOff:'这里无法使用语音，可以继续点击假名。',micDenied:'麦克风未能开启，请继续点击假名。',micMiss:'没听清，再读一次或点击假名。',micQuiet:'没有听到声音，再试一次或点击假名。',connected:'已连接 · {route}',connecting:'连接中…',reconnecting:'连接中断，正在尝试重连…',offline:'连接失败，请离开并换一条线路重试。',missing:'等待房主，请确认房间码。',full:'这个房间已经有两个人啦。',left:'朋友已离开，请重新创建冒险。',invalid:'请输入以 G 或 C 开头的六位房间码。',invited:'朋友邀请了你，点击“加入朋友”吧。',copied:'邀请已复制 ✓',ready:'准备出发！',next:'下一座桥 →',readyWait:'准备好了！等待朋友…',cancelReady:'已准备 · 点击取消',waitTitle:'叫上你的朋友。',waitText:'把邀请发给朋友。你们的词不同，铁丸需要两个人一起帮忙。',roomReady:'队友到齐啦！',roomText:'记住词，再用假名拼出来。麦克风不是必需的。',countdown:'出发啦！',getReady:'不同的词，一起完成。',cross:'桥搭好了！',crossText:'+{n} 份零食。默契配合让铁丸顺利过河。',sync:'默契十足！额外 +5',splash:'扑通，湿了一点。',splashText:'损失一颗心，零食都还在。歇口气，再试一组新词。',choiceTitle:'要不要冒个险？',choiceText:'一起选择。意见不同时，铁丸会走安全路线。',safe:'安全路线\n14 秒 · 普通零食',risk:'零食捷径\n10 秒 · 双倍零食',voted:'你已投票，等待朋友选择。',win:'零食到手！',winText:'{n} 份零食 · 最高连击 ×{combo}。铁丸欠你们一顿大餐！',lose:'零食泡水啦。',loseText:'你们保住了 {n} 份零食。一起再来一次？',again:'再来一次冒险 →',paused:'休息一下。',pausedText:'冒险已暂停。回来后，两个人都点继续。',resume:'一起继续',ended:'冒险中断了',practiceNote:'练习伙伴 · 模拟作答',hint:'提示',riskTag:'双倍零食',readTag:'读 · 记 · 合作',copyFallback:'房间码 {code}。朋友可以在这个页面输入加入。',soundOff:'声音关闭',noPenalty:'暂停不会损失爱心。',notReady:'等待朋友加入。'}
};
let lang=Q.get('lang')==='zh'||(!Q.has('lang')&&navigator.language.startsWith('zh'))?'zh':'en';
try{if(!Q.has('lang')&&localStorage.getItem('snack-lang'))lang=localStorage.getItem('snack-lang')==='zh'?'zh':'en';}catch(_){}
const t=(key,args={})=>(TEXT[lang][key]||key).replace(/\{(\w+)\}/g,(_,k)=>args[k]??'');
function translate(){document.documentElement.lang=lang==='zh'?'zh-CN':'en';document.querySelectorAll('[data-t]').forEach(e=>e.innerHTML=t(e.dataset.t));$('lang').textContent=lang==='en'?'中文':'EN';$('code').placeholder=lang==='zh'?'房间码':'ROOM CODE';render();}
const uid=()=>crypto.randomUUID().replace(/-/g,''),me=uid(),BROKERS={gl:'wss://broker.emqx.io:8084/mqtt',cn:'wss://broker-cn.emqx.io:8084/mqtt'};
const fields=['session','hostId','players','rev','run','phase','round','step','hearts','snacks','combo','bestCombo','path','ready','votes','words','done','times','peeked','hints','startAt','duration','deadline','outcome','resumePhase','remaining'];
const S={session:'',hostId:'',players:[],rev:0,run:1,phase:'waiting',round:0,step:0,hearts:3,snacks:0,combo:0,bestCombo:0,path:'pending',ready:[false,false],votes:[null,null],words:[0,1],done:[false,false],times:[0,0],peeked:[false,false],hints:[false,false],startAt:0,duration:14000,deadline:0,outcome:null,resumePhase:'active',remaining:14000};
let open=false,host=false,bot=false,client=null,connected=false,fatal='',route='gl',room='',topic='',peerSeen=0,lastPulse=0,joined=0,offset=0,rtt=Infinity,pings=new Map(),seen=new Set(),deck=[];
let input='',roundKey='',tileKey='',peekUntil=0,hintKey='',feedbackKey='',reactionUntil=0,reactCooldown=0,botAt=0,localBad=false,wasPhase='',lastFrame=0,visualStep=0,fx=0,netKey='connecting';
const Recognition=window.SpeechRecognition||window.webkitSpeechRecognition;
let mic=null,micEpoch=0,micTimeout=0,micOn=false;
const my=()=>host?0:1,other=()=>1-my(),now=()=>Date.now()+(host?0:offset),word=()=>WORDS[S.words[my()]][0];
const normalize=x=>String(x).normalize('NFKC').replace(/[ァ-ヶ]/g,c=>String.fromCharCode(c.charCodeAt(0)-96)).replace(/[\s。、，,.!?！？「」『』・]/g,'');
const match=(x,w)=>w.some(a=>normalize(a)===normalize(x));
function note(k){feedbackKey=k;$('feedback').textContent=t(k);}
function packet(type,data={}){return {v:1,type,from:me,session:S.session,run:S.run,mid:uid(),...data};}
function send(type,data={}){if(client?.connected)client.publish(topic,JSON.stringify(packet(type,data)),{qos:1,retain:false});}
function snapshot(){return Object.fromEntries(fields.map(k=>[k,S[k]]));}
function broadcast(){S.rev++;if(!bot)send('state',{state:snapshot()});render();}
function request(action,data={}){if(host)command(me,action,data);else send('action',{action,round:S.round,...data});}
function drawWord(){if(deck.length<2)deck=WORDS.map((_,i)=>i).sort(()=>Math.random()-.5);return deck.pop();}
function resetRun(){S.run++;Object.assign(S,{step:0,hearts:3,snacks:0,combo:0,bestCombo:0,path:'pending',votes:[null,null],round:0,outcome:null,done:[false,false],hints:[false,false],peeked:[false,false]});deck=[];}
function newRound(){
 S.round++;S.words=[drawWord(),drawWord()];if(S.words[0]===S.words[1])S.words[1]=(S.words[1]+1)%WORDS.length;
 S.done=[false,false];S.times=[0,0];S.peeked=[false,false];S.hints=[false,false];S.ready=[false,false];S.outcome=null;S.duration=S.path==='risk'?10000:14000;S.startAt=Date.now()+2600;S.deadline=S.startAt+S.duration;S.phase='countdown';botAt=S.startAt+3500+Math.random()*3200;broadcast();
}
function ready(id,value){const i=S.players.indexOf(id);if(i<0||!['waiting','result','finished','paused'].includes(S.phase))return;S.ready[i]=value;if(bot)S.ready[1]=true;
 if(S.ready.every(Boolean)&&S.players.length===2){
  if(S.phase==='finished')resetRun();
  if(S.phase==='paused'){S.ready=[false,false];if(['active','countdown'].includes(S.resumePhase)){S.startAt=Date.now()+2400;S.duration=Math.max(6000,S.remaining);S.deadline=S.startAt+S.duration;S.phase='countdown';botAt=S.startAt+2500;}else S.phase=S.resumePhase;broadcast();return;}
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
 else{S.hearts--;S.combo=0;}
 S.outcome={kind:success?'cross':'splash',gain,sync};S.phase=S.step>=8||S.hearts<=0?'finished':'result';S.ready=[false,false];broadcast();
}
function pauseRun(){if(!host||!['active','countdown','choice'].includes(S.phase))return;S.resumePhase=S.phase;S.remaining=Math.max(6000,S.deadline-Date.now());S.phase='paused';S.ready=[false,false];broadcast();}
function stopMic(){micEpoch++;clearTimeout(micTimeout);const old=mic;mic=null;micOn=false;if(old){old.onstart=old.onresult=old.onerror=old.onend=null;try{old.abort();}catch(_){}}}
function speak(){
 if(micOn){stopMic();note('tap');renderTask();return;}
 if(!Recognition){note('voiceOff');return;}if(!canInput())return;
 stopMic();const epoch=micEpoch,key=roundKey,r=new Recognition();mic=r;micOn=true;r.lang='ja-JP';r.continuous=false;r.interimResults=false;r.maxAlternatives=5;
 const current=()=>epoch===micEpoch&&mic===r&&key===roundKey&&canInput();
 r.onstart=()=>{if(current())note('speaking');};
 r.onresult=e=>{if(!current())return;const row=e.results[e.resultIndex||0];if(Array.from(row,a=>a.transcript).some(a=>match(a,WORDS[S.words[my()]]))){stopMic();input=word();submit();}else{stopMic();note('micMiss');renderTask();}};
 r.onerror=()=>{if(!current())return;stopMic();note('micDenied');renderTask();};r.onend=()=>{if(!current())return;stopMic();note('micQuiet');renderTask();};
 note('opening');renderTask();try{r.start();micTimeout=setTimeout(()=>{if(current()){stopMic();note('micQuiet');renderTask();}},8000);}catch(_){stopMic();note('micDenied');renderTask();}
}
function canInput(){return open&&!fatal&&(connected||bot)&&S.phase==='active'&&!S.done[my()]&&now()>=S.startAt&&now()<=S.deadline;}
function submit(){if(!canInput())return;if(input===word()){stopMic();request('answer',{round:S.round,answer:input});note('sent');}else{input='';note('wrong');$('task').classList.remove('shake');void $('task').offsetWidth;$('task').classList.add('shake');}renderTask();}
function tap(c){if(!canInput())return;input+=c;if(input.length>=word().length)submit();else{feedbackKey='';renderTask();}}
function makeTiles(){const needed=[...new Set(word())],extra=[...'あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわん'].filter(c=>!needed.includes(c));while(needed.length<5)needed.push(extra.splice(Math.floor(Math.random()*extra.length),1)[0]);needed.sort(()=>Math.random()-.5);$('tiles').replaceChildren(...needed.map(c=>{const b=document.createElement('button');b.type='button';b.textContent=c;b.dataset.kana=c;b.onclick=()=>tap(c);return b;}));}
function valid(d){
 const num=(v,min,max)=>Number.isFinite(v)&&v>=min&&v<=max,arr=(v,fn)=>Array.isArray(v)&&v.length===2&&v.every(fn),bool=x=>typeof x==='boolean';
 return d&&typeof d.session==='string'&&d.session.length<=40&&typeof d.hostId==='string'&&Array.isArray(d.players)&&d.players.length<=2&&d.players[0]===d.hostId&&d.players.every(p=>typeof p==='string'&&p.length<=40)&&Number.isInteger(d.rev)&&Number.isInteger(d.run)&&d.run>=1&&['waiting','countdown','active','result','choice','paused','finished'].includes(d.phase)&&Number.isInteger(d.round)&&d.round>=0&&Number.isInteger(d.step)&&num(d.step,0,8)&&Number.isInteger(d.hearts)&&num(d.hearts,0,3)&&num(d.snacks,0,10000)&&num(d.combo,0,8)&&num(d.bestCombo,0,8)&&['pending','safe','risk'].includes(d.path)&&arr(d.ready,bool)&&arr(d.done,bool)&&arr(d.peeked,bool)&&arr(d.hints,bool)&&arr(d.words,x=>Number.isInteger(x)&&x>=0&&x<WORDS.length)&&arr(d.times,x=>num(x,0,20000))&&arr(d.votes,x=>x===null||['safe','risk'].includes(x))&&num(d.startAt,0,1e14)&&num(d.deadline,0,1e14)&&num(d.duration,0,20000)&&num(d.remaining,0,20000)&&['active','countdown','choice'].includes(d.resumePhase)&&(!d.outcome||(['cross','splash'].includes(d.outcome.kind)&&num(d.outcome.gain,0,1000)&&bool(d.outcome.sync)));
}
function receive(raw){if(raw.length>6000)return;let m;try{m=JSON.parse(raw);}catch(_){return;}if(m.v!==1||m.from===me||typeof m.from!=='string'||m.from.length>40)return;
 if(m.type==='hello'&&host){if(S.players.length===1){S.players.push(m.from);peerSeen=Date.now();broadcast();}else if(S.players[1]!==m.from){send('full',{to:m.from});return;}peerSeen=Date.now();send('state',{state:snapshot()});return;}
 if(m.type==='full'&&!host&&m.to===me&&!S.hostId){fatal='full';render();return;}
 if(m.type==='state'&&!host){const d=m.state;if(!valid(d)||d.hostId!==m.from||!d.players.includes(me)||(S.hostId&&S.hostId!==m.from)||(S.session&&S.session!==d.session))return;peerSeen=Date.now();if(S.session&&d.rev<=S.rev)return;Object.assign(S,Object.fromEntries(fields.map(k=>[k,d[k]])));ping();render();return;}
 if(m.session!==S.session||m.run!==S.run||!S.players.includes(m.from))return;peerSeen=Date.now();
 if(m.type==='ping'&&host&&Number.isFinite(m.t0))send('pong',{to:m.from,t0:m.t0,t1:Date.now()});
 if(m.type==='pong'&&!host&&m.to===me&&pings.has(m.t0)&&Number.isFinite(m.t1)){pings.delete(m.t0);const rt=Date.now()-m.t0;if(rt<rtt){rtt=rt;offset=m.t1-(m.t0+rt/2);}}
 if(m.type==='leave'){fatal='left';stopMic();render();return;}
 if(m.type==='reaction'&&['nice','oops','go'].includes(m.value))showReaction(m.value);
 if(m.type==='action'&&host&&typeof m.mid==='string'&&!seen.has(m.mid)){seen.add(m.mid);if(seen.size>256)seen.delete(seen.values().next().value);command(m.from,m.action,m);}
}
function ping(){if(host||!S.hostId)return;const t0=Date.now();pings.set(t0,true);if(pings.size>10)pings.delete(pings.keys().next().value);send('ping',{t0});}
function connect(){netKey='connecting';connected=false;const c=mqtt.connect(BROKERS[route],{clientId:'sn_'+me,clean:true,keepalive:10,reconnectPeriod:2500,connectTimeout:9000});client=c;
 c.on('connect',()=>{if(client!==c)return;c.subscribe(topic,{qos:1},err=>{if(client!==c)return;if(err){netKey='offline';render();return;}connected=true;netKey='connected';if(host)broadcast();else send('hello');render();});});
 c.on('message',(_,b)=>{if(client===c&&open)receive(b.toString());});
 c.on('error',()=>{if(client===c){netKey='offline';render();}});
 c.on('close',()=>{if(client!==c||!open)return;connected=false;netKey='reconnecting';stopMic();if(host)pauseRun();render();});
}
function openRoom(code,isHost,practice=false){leave(false);open=true;host=isHost;bot=practice;room=code;route=code.startsWith('C')?'cn':'gl';topic='tangoswipe/snack-run/v1/'+code;fatal='';connected=practice;peerSeen=0;joined=Date.now();lastPulse=0;offset=0;rtt=Infinity;pings.clear();seen.clear();deck=[];roundKey='';tileKey='';hintKey='';feedbackKey='';input='';visualStep=0;wasPhase='';
 Object.assign(S,{session:host?uid():'',hostId:host?me:'',players:host?(bot?[me,'bot']:[me]):[],rev:0,run:1,phase:'waiting',round:0,step:0,hearts:3,snacks:0,combo:0,bestCombo:0,path:'pending',ready:[false,false],votes:[null,null],words:[0,1],done:[false,false],times:[0,0],peeked:[false,false],hints:[false,false],startAt:0,duration:14000,deadline:0,outcome:null,resumePhase:'active',remaining:14000});
 $('home').hidden=true;$('play').hidden=false;$('copy').textContent=t('copy');render();if(!bot)try{connect();}catch(_){netKey='offline';render();}
}
function leave(home=true){if(open&&!bot)send('leave');open=false;stopMic();const c=client;client=null;if(c)try{const deadline=setTimeout(()=>c.end(true),1800);c.end(!c.connected,{},()=>clearTimeout(deadline));}catch(_){}if(home){$('play').hidden=true;$('home').hidden=false;}}
function showReaction(value){$('reaction').textContent=({nice:'💛 ',oops:'🙈 ',go:'🔥 '})[value]+t(value);reactionUntil=performance.now()+2400;}
function renderTask(){
 const i=my(),active=S.phase==='active',hidden=now()>S.startAt+2400&&now()>peekUntil&&!S.done[i]&&!micOn;
 $('role').textContent=t((S.step+i)%2===0?'roleBuild':'roleShield');$('cue').textContent=t(S.done[i]?'sent':micOn?'speaking':hidden?'tap':'remember');
 $('word').textContent=hidden?'?'.repeat(word().length):word();$('word').classList.toggle('hidden-word',hidden);$('slots').textContent=S.done[i]?'✓':input+'＿'.repeat(Math.max(0,word().length-input.length));
 $('tiles').hidden=S.done[i];$('actions').hidden=S.done[i];$('help').hidden=!S.done[i]||S.done[other()];$('help').disabled=S.hints[other()];$('help').textContent=t(S.hints[other()]?'hintSent':'help');
 $('mic').textContent=t(micOn?'stopMic':'say');$('mic').classList.toggle('on',micOn);$('mic').disabled=!active;
 $('tiles').querySelectorAll('button').forEach(b=>b.disabled=!canInput());$('feedback').textContent=feedbackKey?t(feedbackKey):'';
 const remaining=Math.max(0,S.deadline-now());$('clock').textContent=Math.ceil(remaining/1000)+'s';$('timeFill').style.transform='scaleX('+Math.max(0,Math.min(1,remaining/S.duration))+')';
}
function render(){if(!open)return;
 const key=S.run+':'+S.round+':'+S.startAt;
 if(key!==roundKey){roundKey=key;input='';peekUntil=0;feedbackKey='';stopMic();}
 if(tileKey!==S.run+':'+S.round){tileKey=S.run+':'+S.round;makeTiles();}
 if(S.hints[my()]&&hintKey!==tileKey){hintKey=tileKey;if(!S.done[my()]){input=word().slice(0,Math.min(word().length,input.length+1));peekUntil=now()+1800;note('hintReceived');if(input===word()&&canInput())submit();}}
 if(S.phase!==wasPhase){if(!['active','countdown'].includes(S.phase))stopMic();if(['result','finished'].includes(S.phase)){fx=1;tone(S.outcome?.kind==='cross');}wasPhase=S.phase;}
 $('hearts').textContent='♥ '.repeat(S.hearts)+'♡ '.repeat(3-S.hearts);$('snacks').textContent='🍡 '+S.snacks;$('stage').textContent=t('bridge',{n:Math.min(8,S.step+1)});$('combo').textContent=S.combo>1?t('combo',{n:S.combo}):S.path==='risk'?t('riskTag'):'';
 const status=i=>S.done[i]?t('done'):['active','countdown'].includes(S.phase)?t('thinking'):S.ready[i]?t('readyState'):t('waiting');
 $('youState').textContent=t('you')+' · '+status(my());$('friendState').textContent=t(bot?'bot':'friend')+' · '+status(other());
 const playable=!fatal&&(connected||bot)&&S.phase==='active';$('task').hidden=!playable;$('panel').hidden=playable;
 $('choice').hidden=S.phase!=='choice'||!!fatal||!connected;$('ready').hidden=S.phase==='choice'||S.phase==='countdown';$('copy').hidden=bot||!['waiting','paused'].includes(S.phase)||!connected||!!fatal;
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
 else if(S.phase==='finished'){title=t(S.step>=8?'win':'lose');desc=t(S.step>=8?'winText':'loseText',{n:S.snacks,combo:S.bestCombo});tag='🍡 🍙 🍓';}
 else if(S.phase==='result'){const win=S.outcome?.kind==='cross';title=t(win?'cross':'splash');desc=t(win?'crossText':'splashText',{n:S.outcome?.gain||0});tag=S.outcome?.sync?t('sync'):t('readTag');}
 $('panelTag').textContent=tag;$('panelTitle').textContent=title;$('panelText').textContent=S.ready[my()]?t('readyWait'):desc;
 $('net').textContent=bot?t('practiceNote'):t(netKey,{route:t(route==='cn'?'china':'global')});if(playable)renderTask();
}
let soundContext;
function tone(good){if(document.hidden)return;try{if(!soundContext)return;const o=soundContext.createOscillator(),g=soundContext.createGain();o.connect(g);g.connect(soundContext.destination);o.type='sine';o.frequency.setValueAtTime(good?523:240,soundContext.currentTime);o.frequency.exponentialRampToValueAtTime(good?784:120,soundContext.currentTime+.15);g.gain.setValueAtTime(.045,soundContext.currentTime);g.gain.exponentialRampToValueAtTime(.001,soundContext.currentTime+.25);o.start();o.stop(soundContext.currentTime+.26);}catch(_){}}
function unlockSound(){try{soundContext??=new(window.AudioContext||window.webkitAudioContext)();soundContext.resume();}catch(_){}}
const canvas=$('world'),ctx=canvas.getContext('2d'),images={};
for(const name of ['tetsu','kappa']){images[name]=new Image();images[name].src='assets/characters/'+name+'.png';}
function resize(){const r=canvas.getBoundingClientRect(),d=Math.min(devicePixelRatio||1,2);if(!r.width)return;canvas.width=r.width*d;canvas.height=r.height*d;ctx.setTransform(canvas.width/360,0,0,canvas.height/210,0,0);}new ResizeObserver(resize).observe(canvas);
function sprite(name,x,y,h){const im=images[name];if(!im.naturalWidth)return;const b=name==='tetsu'?[159,21,961,1192]:[94,111,1045,1042],w=h*b[2]/b[3]*(canvas.height/210)/(canvas.width/360);ctx.drawImage(im,...b,x-w/2,y-h,w,h);}
function scene(time,dt){const w=360,h=210;ctx.clearRect(0,0,w,h);const bg=ctx.createLinearGradient(0,0,0,h);bg.addColorStop(0,'#34314c');bg.addColorStop(1,'#65526a');ctx.fillStyle=bg;ctx.fillRect(0,0,w,h);ctx.fillStyle='#efc28c';ctx.beginPath();ctx.arc(290,39,21,0,Math.PI*2);ctx.fill();
 ctx.fillStyle='#292f44';ctx.beginPath();ctx.moveTo(0,114);for(let x=0;x<=370;x+=30)ctx.lineTo(x,77+Math.sin(x*.021)*19);ctx.lineTo(360,150);ctx.lineTo(0,150);ctx.fill();
 ctx.fillStyle=S.path==='risk'?'#3a5265':'#39616c';ctx.fillRect(0,139,w,71);ctx.strokeStyle='#72b4ad44';ctx.lineWidth=2;for(let row=0;row<4;row++){ctx.beginPath();for(let x=-20;x<=380;x+=10){const y=153+row*14+Math.sin(x*.04+time*.0009+row)*3;ctx.lineTo(x,y);}ctx.stroke();}
 const current=Math.min(7,S.step),baseX=48;for(let k=-1;k<5;k++){const x=baseX+k*80;ctx.fillStyle=k<=0?'#988798':'#6e617c';ctx.beginPath();ctx.ellipse(x,165-(k%2)*6,30,12,0,0,Math.PI*2);ctx.fill();ctx.fillStyle='#cbb69d';ctx.fillRect(x-22,155-(k%2)*6,44,5);}
 for(let i=0;i<2;i++)if(S.done[i]){ctx.fillStyle=i===0?'#74e5c0':'#ff95b7';ctx.fillRect(72+i*25,153,27,6);}
 const target=S.step;visualStep+=(target-visualStep)*Math.min(1,dt*5);const jump=Math.abs(target-visualStep)>.02?Math.sin(Math.min(1,Math.abs(target-visualStep))*Math.PI)*38:0;
 let px=56+(visualStep-Math.floor(visualStep))*78,py=155-jump+Math.sin(time*.003)*2;
 if(S.outcome?.kind==='splash'&&fx>0)py+=Math.sin((1-fx)*Math.PI)*24;
 if(S.step>=8)px=174;sprite('tetsu',px,py,90);
 if(S.path==='risk'&&S.step<8){sprite('kappa',326,145+Math.sin(time*.002)*3,69);}else{ctx.font='25px system-ui';ctx.fillText(S.step>=8?'🍡 🍙 🍓':'🍡',S.step>=8?214:309,115);}
 for(let j=0;j<8;j++){ctx.fillStyle=j<S.step?'#ffc970':'#a694b766';ctx.beginPath();ctx.arc(112+j*19,22,4,0,Math.PI*2);ctx.fill();}
 if(fx>0){ctx.fillStyle=S.outcome?.kind==='cross'?'#ffc970':'#8bc8db';for(let k=0;k<9;k++){const a=k*Math.PI*2/9,r=(1-fx)*58;ctx.beginPath();ctx.arc(px+Math.cos(a)*r,py-42+Math.sin(a)*r,2.5*fx,0,Math.PI*2);ctx.fill();}fx=Math.max(0,fx-dt*1.3);}
}
function tick(ts){const dt=Math.min(.05,(ts-lastFrame)/1000||.016);lastFrame=ts;
 if(open){const time=Date.now();
  if(host&&!fatal&&(connected||bot)&&S.phase==='countdown'&&time>=S.startAt){S.phase='active';broadcast();}
  if(host&&!fatal&&S.phase==='active'&&(connected||bot)){if(bot&&!S.done[1]&&time>=botAt)command('bot','answer',{round:S.round,answer:WORDS[S.words[1]][0]});if(bot&&S.done[1]&&!S.done[0]&&!S.hints[0]&&time>=botAt+1800)command('bot','help',{round:S.round});if(S.phase==='active'&&time>S.deadline+700)finishRound(false);}
  if(!bot&&!fatal&&connected&&time-lastPulse>1000){lastPulse=time;if(host){send('state',{state:snapshot()});if(peerSeen&&time-peerSeen>5500)pauseRun();}else{send('pulse');ping();if(!S.hostId){send('hello');if(time-joined>10000)netKey='missing';}else if(peerSeen&&time-peerSeen>5500){stopMic();netKey='reconnecting';}}}
  if(!fatal&&(connected||bot)){if(S.phase==='active')renderTask();else if(S.phase==='countdown')$('panelTitle').textContent=String(Math.max(1,Math.min(3,Math.ceil((S.startAt-now())/1000))));}
  if(reactionUntil&&ts>reactionUntil){$('reaction').textContent='';reactionUntil=0;}
  scene(ts,dt);
 }requestAnimationFrame(tick);
}
$('create').onclick=()=>{const chars='ABCDEFGHJKLMNPQRSTUVWXYZ23456789',a=crypto.getRandomValues(new Uint8Array(5));openRoom(($('server').value==='cn'?'C':'G')+Array.from(a,n=>chars[n%chars.length]).join(''),true);};
$('joinForm').onsubmit=e=>{e.preventDefault();const code=$('code').value.trim().toUpperCase();if(!/^[GC][A-Z2-9]{5}$/.test(code)){$('homeNote').textContent=t('invalid');return;}openRoom(code,false);};
$('practice').onclick=()=>openRoom('',true,true);$('leave').onclick=()=>leave();$('ready').onclick=()=>{unlockSound();request('ready',{value:!S.ready[my()]});};
$('peek').onclick=()=>{if(!canInput())return;peekUntil=now()+1800;request('peek',{round:S.round});note('peeked');renderTask();};$('undo').onclick=()=>{if(!canInput())return;input=input.slice(0,-1);renderTask();};$('mic').onclick=speak;$('help').onclick=()=>{request('help',{round:S.round});note('hintSent');};
for(const v of ['safe','risk'])$(v).onclick=()=>request('vote',{value:v});
$('lang').onclick=()=>{lang=lang==='en'?'zh':'en';try{localStorage.setItem('snack-lang',lang);}catch(_){}translate();};
document.querySelectorAll('[data-react]').forEach(b=>b.onclick=()=>{if(performance.now()-reactCooldown<1400)return;reactCooldown=performance.now();showReaction(b.dataset.react);if(!bot)send('reaction',{value:b.dataset.react});});
$('copy').onclick=async()=>{const url=new URL('snack.html',location.href);url.searchParams.set('room',room);try{await navigator.clipboard.writeText('Tetsu’s Snack Run · '+room+'\n'+url.href);$('copy').textContent=t('copied');}catch(_){$('roomCode').textContent=t('copyFallback',{code:room});}};
document.addEventListener('visibilitychange',()=>{if(document.hidden&&open){stopMic();request('pause');}});window.addEventListener('pagehide',()=>leave(false));
if(Q.get('room')){$('code').value=Q.get('room').toUpperCase().slice(0,6);$('server').value=Q.get('room').startsWith('C')?'cn':'gl';$('homeNote').textContent=t('invited');}
if(Q.get('test')==='1')window.__snack={S,WORDS,me,command,receive,request,openRoom,leave,match,get:()=>({open,host,bot,connected,room,route,input,micOn,roundKey,offset}),pauseRun};
translate();requestAnimationFrame(tick);
})();
