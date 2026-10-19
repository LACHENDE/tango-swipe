(()=>{
'use strict';
const $=id=>document.getElementById(id), qs=new URLSearchParams(location.search);
const Recognition=window.SpeechRecognition||window.webkitSpeechRecognition;
const WORDS=[
 ['ねこ','cat','猫'],['いぬ','dog','犬'],['くま','bear','熊'],['とり','bird','鳥'],['うま','horse','馬'],['しか','deer','鹿'],['さる','monkey','猿'],['うし','cow','牛'],['かめ','turtle','亀'],['たこ','octopus','蛸','タコ'],['いか','squid','烏賊'],['さかな','fish','魚'],
 ['はな','flower','花','鼻'],['やま','mountain','山'],['かわ','river','川','皮'],['うみ','sea','海'],['そら','sky','空'],['あめ','rain','雨','飴'],['ゆき','snow','雪'],['ほし','star','星'],['つき','moon','月'],['みず','water','水'],
 ['すし','sushi','寿司','鮨'],['たまご','egg','卵','玉子'],['りんご','apple','林檎'],['みかん','mandarin','蜜柑'],['さくら','cherry blossom','桜'],['あさ','morning','朝'],['よる','night','夜'],['いえ','house','家'],['かさ','umbrella','傘'],['くつ','shoes','靴'],['ふね','boat','船','舟'],['つくえ','desk','机'],['とけい','clock','時計'],['くるま','car','車'],['こころ','heart','心'],['おかし','sweets','お菓子'],['かがみ','mirror','鏡'],['たぬき','raccoon dog','狸']
];
const normalize=t=>String(t).normalize('NFKC').replace(/[ァ-ヶ]/g,c=>String.fromCharCode(c.charCodeAt(0)-96)).replace(/[\s。、，,.!?！？「」『』・]/g,'');
const matches=(t,i)=>Number.isInteger(i)&&WORDS[i]&&[WORDS[i][0],...WORDS[i].slice(2)].some(x=>normalize(x)===normalize(t));
const uid=()=>crypto.randomUUID().replace(/-/g,'');
const me=uid(), LIMIT=8500,TIE=300,TARGET=5;
const S={open:false,host:false,bot:false,code:'',session:'',match:1,hostId:'',players:[],ready:[false,false],scores:[0,0],phase:'waiting',round:0,word:-1,startAt:0,claims:[null,null],outcome:null,rev:0};
let client=null,topic='',connected=false,peerSeen=0,joinAt=0,lastHello=0,lastPulse=0,offset=0,bestRTT=Infinity,pings=new Map(),history=[];
let recognition=null,micEpoch=0,micOpen=false,micStarting=false,micTimer=0,micRestart=0,wantsMic=false,restarts=0;
let revealKey='',revealPerf=0,submitted=false,lastOutcome='',firstClaimAt=0,botTime=0,localNote='',liveKey='',visible=false;
const side=()=>S.host?0:1, rival=()=>1-side();
const hostNow=()=>Date.now()+(S.host?0:offset);
const canReady=()=>S.open&&['waiting','result','finished'].includes(S.phase)&&S.players.length===2&&(S.bot||connected)&&!document.hidden;
function msg(text){$('micStatus').textContent=text;}
function net(text){$('network').textContent=text;}
function send(type,data={}){if(!client?.connected)return;client.publish(topic,JSON.stringify({v:1,type,from:me,session:S.session,match:S.match,...data}),{qos:1,retain:false});}
function stateData(){return {session:S.session,match:S.match,hostId:me,players:S.players,ready:S.ready,scores:S.scores,phase:S.phase,round:S.round,word:S.word,startAt:S.startAt,claims:S.claims,outcome:S.outcome,rev:S.rev};}
function publishState(){S.rev++;if(!S.bot)send('state',{state:stateData()});render();}
function chooseWord(){let choices=WORDS.map((_,i)=>i).filter(i=>!history.includes(i));if(!choices.length){history=[];choices=WORDS.map((_,i)=>i);}const w=choices[Math.floor(Math.random()*choices.length)];history.push(w);return w;}
function beginRound(){
 if(!S.host||!S.ready.every(Boolean)||S.players.length!==2||!['waiting','result','finished'].includes(S.phase))return;
 if(S.phase==='finished'){S.match++;S.scores=[0,0];S.round=0;history=[];}
 S.round++;S.word=chooseWord();S.startAt=Date.now()+3200;S.phase='countdown';S.claims=[null,null];S.outcome=null;firstClaimAt=0;botTime=2900+Math.random()*1600+WORDS[S.word][0].length*120;
 localNote='Wait for the word, then read it aloud.';publishState();
}
function readyChange(id,value){
 if(!S.host)return;const i=S.players.indexOf(id);if(i<0)return;
 if(['countdown','active'].includes(S.phase)){if(!value&&!S.claims[i])voidRound('mic');return;}
 if(!['waiting','result','finished'].includes(S.phase))return;
 S.ready[i]=!!value;publishState();if(S.ready.every(Boolean))beginRound();
}
function commandReady(value){if(S.host)readyChange(me,value);else send('ready',{round:S.round,value});}
function voidRound(reason){if(!S.host||!['active','countdown'].includes(S.phase))return;S.phase='result';S.ready=[false,false];S.outcome={kind:reason,winner:-1};publishState();}
function acceptClaim(id,round,elapsed){
 if(!S.host||!['active','countdown'].includes(S.phase)||round!==S.round||Date.now()<S.startAt||Date.now()>S.startAt+LIMIT+1600)return;
 const i=S.players.indexOf(id);if(i<0||S.claims[i]!==null||!Number.isFinite(elapsed)||elapsed<120||elapsed>LIMIT)return;
 // Client elapsed time avoids awarding a point just because the host's packet arrived first.
 // This friendly prototype does not authenticate or rank client-reported timings.
 if(elapsed>Date.now()-S.startAt+600)return;
 S.claims[i]=Math.round(elapsed);if(!firstClaimAt)firstClaimAt=Date.now();publishState();if(S.claims.every(x=>x!==null))settleRound();
}
function settleRound(){
 if(!S.host||!['active','countdown'].includes(S.phase))return;
 const [a,b]=S.claims;let winner=-1,kind='timeout';
 if(a!==null&&b!==null){if(Math.abs(a-b)<=TIE)kind='tie';else{winner=a<b?0:1;kind='point';}}
 else if(a!==null||b!==null){winner=a!==null?0:1;kind='point';}
 if(winner>=0)S.scores[winner]++;
 S.ready=[false,false];S.outcome={kind,winner};S.phase=Math.max(...S.scores)>=TARGET?'finished':'result';publishState();
}
function stopMic(){wantsMic=false;micEpoch++;clearTimeout(micTimer);clearTimeout(micRestart);const r=recognition;recognition=null;micOpen=false;micStarting=false;if(r){r.onstart=r.onresult=r.onerror=r.onend=null;try{r.abort();}catch(_){}}$('ready').classList.remove('listening');}
function micFailed(message){const wasArmed=wantsMic;stopMic();localNote=message;if(wasArmed)commandReady(false);render();msg(message);}
function startMic(retry=false){
 if(!Recognition){msg('Speech input is unavailable here. Open this game in a browser with speech recognition.');return;}
 if(!retry&&!canReady())return;
 if(retry&&!wantsMic)return;
 window.speechSynthesis?.cancel();if(!retry){stopMic();wantsMic=true;restarts=0;submitted=false;}
 const epoch=++micEpoch,r=new Recognition();recognition=r;micStarting=true;
 r.lang='ja-JP';r.continuous=true;r.interimResults=false;r.maxAlternatives=5;
 const current=()=>S.open&&epoch===micEpoch&&recognition===r&&wantsMic;
 r.onstart=()=>{if(!current())return;clearTimeout(micTimer);micOpen=true;micStarting=false;localNote='Mic is on. Stay quiet until the word appears.';if(!retry)commandReady(true);render();};
 r.onresult=e=>{
  if(!current())return;
  for(let i=e.resultIndex||0;i<e.results.length;i++){
   if(e.results[i].isFinal===false)continue;
   const alternatives=Array.from(e.results[i],x=>x.transcript);
   if(!visible||!['countdown','active'].includes(S.phase)||submitted)continue;
   const elapsed=performance.now()-revealPerf;if(elapsed<120||elapsed>LIMIT)continue;
   if(alternatives.some(t=>matches(t,S.word))){submitReading(elapsed);return;}
   localNote='Not quite — read the hiragana again. No point lost.';msg(localNote);
  }
 };
 r.onerror=e=>{if(!current())return;if(e.error==='no-speech')return;const errors={'not-allowed':'Mic access was declined. Allow it in your browser, then tap Ready.','service-not-allowed':'Speech recognition is unavailable in this browser.','audio-capture':'No microphone found. Connect one and try again.','network':'The speech service lost connection. This round will not count.','aborted':'Mic stopped. Tap Ready when you want to try again.'};micFailed(errors[e.error]||'Speech input stopped. Tap Ready to retry.');};
 r.onend=()=>{if(!current())return;micOpen=false;micStarting=false;recognition=null;if(wantsMic&&restarts++<3){micRestart=setTimeout(()=>startMic(true),150);}else micFailed('Mic went quiet. Tap Ready to try again.');};
 localNote='Opening your microphone…';render();
 try{r.start();micTimer=setTimeout(()=>{if(current()&&!micOpen)micFailed('The mic did not start. Check permission, then try again.');},12000);}catch(_){micFailed('Could not open the mic. Tap Ready to retry.');}
}
function submitReading(elapsed){
 if(submitted||!visible||!S.open||!['countdown','active'].includes(S.phase))return;
 submitted=true;stopMic();localNote='Correct reading! Checking both times…';
 if(S.host)acceptClaim(me,S.round,elapsed);else send('claim',{round:S.round,elapsed});render();
}
function decodeState(d){
 const phases=['waiting','countdown','active','result','finished','disconnected'];
 return d&&typeof d.session==='string'&&d.session.length<=40&&Number.isInteger(d.match)&&d.match>0&&typeof d.hostId==='string'&&Array.isArray(d.players)&&d.players.length<=2&&d.players[0]===d.hostId&&d.players.every(x=>typeof x==='string'&&x.length<=40)&&Array.isArray(d.ready)&&d.ready.length===2&&d.ready.every(x=>typeof x==='boolean')&&Array.isArray(d.scores)&&d.scores.length===2&&d.scores.every(x=>Number.isInteger(x)&&x>=0&&x<=5)&&phases.includes(d.phase)&&Number.isInteger(d.round)&&d.round>=0&&Number.isInteger(d.word)&&d.word>=-1&&d.word<WORDS.length&&Number.isFinite(d.startAt)&&Array.isArray(d.claims)&&d.claims.length===2&&d.claims.every(x=>x===null||(Number.isFinite(x)&&x>=120&&x<=LIMIT))&&Number.isInteger(d.rev)&&(!d.outcome||(['point','tie','timeout','mic'].includes(d.outcome.kind)&&[-1,0,1].includes(d.outcome.winner)));
}
function receive(raw){
 if(raw.length>4096)return;let m;try{m=JSON.parse(raw);}catch(_){return;}
 if(m.v!==1||m.from===me||typeof m.from!=='string'||m.from.length>40)return;
 if(m.type==='hello'&&S.host){
  if(S.players.length===1){S.players.push(m.from);peerSeen=Date.now();publishState();}
  else if(S.players[1]!==m.from){send('full',{to:m.from});return;}
  peerSeen=Date.now();send('state',{state:stateData()});return;
 }
 if(m.type==='full'&&!S.host&&m.to===me&&!S.hostId){disconnect('This room already has two players. Leave and try another code.');return;}
 if(m.type==='state'&&!S.host){
  const d=m.state;if(!decodeState(d)||d.hostId!==m.from||!d.players.includes(me)||(S.hostId&&S.hostId!==m.from)||(S.session&&d.session!==S.session))return;
  peerSeen=Date.now();if(S.session&&d.rev<=S.rev)return;
  const initial=!S.hostId;Object.assign(S,d);if(initial){ping();net('Friend connected · voice duel');}render();return;
 }
 if(m.session!==S.session||m.match!==S.match||!S.players.includes(m.from))return;
 peerSeen=Date.now();
 if(m.type==='ping'&&S.host&&Number.isFinite(m.t0))send('pong',{to:m.from,t0:m.t0,t1:Date.now()});
 else if(m.type==='pong'&&!S.host&&m.to===me&&pings.has(m.t0)&&Number.isFinite(m.t1)){const rtt=Date.now()-m.t0;pings.delete(m.t0);if(rtt<bestRTT){bestRTT=rtt;offset=m.t1-(m.t0+rtt/2);}}
 else if(m.type==='ready'&&S.host&&typeof m.value==='boolean'&&(m.round===S.round||(!m.value&&S.phase==='countdown'&&m.round===S.round-1)))readyChange(m.from,m.value);
 else if(m.type==='claim'&&S.host)acceptClaim(m.from,m.round,m.elapsed);
 else if(m.type==='leave')disconnect('Your friend left. Create or join a new duel.');
 else if(m.type==='cancel'&&S.host&&m.round===S.round){if(['active','countdown'].includes(S.phase))voidRound('mic');else readyChange(m.from,false);}
}
function ping(){if(S.host||!S.hostId)return;const t0=Date.now();pings.set(t0,true);if(pings.size>12)pings.delete(pings.keys().next().value);send('ping',{t0});}
function openRoom(code,host,bot=false){
 leave(false);Object.assign(S,{open:true,host,bot,code,session:host?uid():'',match:1,hostId:host?me:'',players:host?[me]:[],ready:[false,false],scores:[0,0],phase:'waiting',round:0,word:-1,startAt:0,claims:[null,null],outcome:null,rev:0});
 history=[];offset=0;bestRTT=Infinity;pings.clear();revealKey='';lastOutcome='';liveKey='';submitted=false;visible=false;localNote='Mic opens only when you tap Ready.';joinAt=Date.now();peerSeen=0;lastPulse=0;lastHello=0;
 $('home').hidden=true;$('duel').hidden=false;$('roomCode').textContent=code;$('roomBadge').textContent=bot?'PRACTICE BOT':code;$('rivalName').textContent=bot?'Tetsu · bot':'Rival';$('rivalSprite').src='assets/characters/'+(bot?'tetsu':'aya')+'.png';$('invite').hidden=bot;
 if(bot){S.players=[me,'bot'];S.ready[1]=true;connected=true;net('Practice bot · Tetsu uses simulated reading times');render();return;}
 net('Connecting to your duel…');render();topic='tangoswipe/kana-duel/v1/'+code;
 const room=code;
 try{
  const c=mqtt.connect('wss://broker.emqx.io:8084/mqtt',{clientId:'kd_'+me,clean:true,keepalive:10,reconnectPeriod:0,connectTimeout:10000});client=c;
  c.on('connect',()=>{if(client!==c)return;c.subscribe(topic,{qos:1},err=>{if(client!==c)return;if(err){disconnect('Could not open the room. Please try again.');return;}connected=true;net('Connected · waiting for both players');if(S.host)publishState();else send('hello');render();});});
  c.on('message',(_,payload)=>{if(client===c&&S.open&&S.code===room)receive(payload.toString());});
  c.on('error',()=>{if(client===c)disconnect('Connection failed. Leave and try again.');});
  c.on('close',()=>{if(client===c&&S.open)disconnect('Connection lost. No point awarded. Leave and rejoin.');});
 }catch(_){disconnect('Could not connect. Please try again.');}
}
function disconnect(message){stopMic();connected=false;S.phase='disconnected';S.ready=[false,false];localNote=message;net('Duel disconnected');render();}
function leave(showHome=true){if(S.open&&!S.bot)send('leave');stopMic();window.speechSynthesis?.cancel();S.open=false;const c=client;client=null;if(c)try{c.end(true);}catch(_){}connected=false;visible=false;if(showHome){$('duel').hidden=true;$('home').hidden=false;}}
function render(){
 if(!S.open)return;
 const i=side(),j=rival();$('myScore').textContent=S.scores[i];$('rivalScore').textContent=S.scores[j];
 $('myState').textContent=S.claims[i]!==null?(S.claims[i]/1000).toFixed(2)+'s':S.ready[i]?'Mic ready':'Not ready';
 $('rivalState').textContent=S.players.length<2?'Not here yet':S.claims[j]!==null?(S.claims[j]/1000).toFixed(2)+'s':S.ready[j]?'Ready':'Not ready';
 const result=['result','finished'].includes(S.phase), phase=S.phase;
 $('hear').hidden=!result||S.word<0||wantsMic;
 $('roundLabel').textContent=S.round?'WORD '+S.round+' · HIRAGANA ONLY':'HIRAGANA READING RACE';
 $('ready').disabled=(!canReady()&&!wantsMic)||(!Recognition)||micStarting;
 $('ready').classList.toggle('listening',wantsMic);
 $('ready').textContent=micStarting?'Opening mic…':wantsMic?'Mic on · tap to cancel':phase==='finished'?'Rematch · open mic':result?'Next word · open mic':S.players.length<2?'Waiting for your friend…':'Ready · open mic';
 if(wantsMic)$('ready').disabled=micStarting;
 if(result){
  const key=S.session+':'+S.match+':'+S.round+':'+S.phase+':'+S.outcome?.kind;
  const out=S.outcome||{kind:'timeout',winner:-1},winner=out.winner;
  $('word').textContent=WORDS[S.word]?.[0]||'···';$('meaning').textContent=WORDS[S.word]?.[1]||'';
  $('cue').textContent=phase==='finished'?(S.scores[i]>=5?'You won the duel!':'Rematch?'):'Keep that reading.';
  let verdict=out.kind==='tie'?'So close — a tie! No point this word.':out.kind==='mic'?'Mic interrupted. No point awarded.':out.kind==='timeout'?'Time’s up. Let’s try another word.':winner===i?'Your spell lands! +1 point':(S.bot?'Tetsu':'Your rival')+' was quicker. Next word!';
  if(out.kind==='point'&&S.claims[i]!==null&&S.claims[j]!==null)verdict+=' '+(S.claims[i]/1000).toFixed(2)+'s / '+(S.claims[j]/1000).toFixed(2)+'s';
  $('verdict').textContent=verdict;$('scene').className='scene result';
  if(key!==lastOutcome){lastOutcome=key;stopMic();if(out.kind==='point'){$('scene').classList.add(winner===i?'won':'lost');}localNote='Mic off. Tap when you’re ready for the next word.';}
  if(!wantsMic){$('ready').disabled=!Recognition||S.players.length!==2||(!connected&&!S.bot);$('ready').classList.remove('listening');$('ready').textContent=phase==='finished'?'Rematch · open mic':'Next word · open mic';}
  $('hear').hidden=wantsMic||S.word<0;
 }else if(phase==='waiting'||phase==='disconnected'){
  $('scene').className='scene';$('word').textContent='···';$('meaning').textContent='';$('cue').textContent=phase==='disconnected'?'Take a moment.':S.players.length<2?'A friend makes it a duel.':'Same word. First correct reading.';
  $('verdict').textContent=phase==='disconnected'?'The duel has stopped.':S.players.length<2?'Share the room code with your friend.':S.ready[i]?'Your mic is ready. Waiting for your rival…':'Both tap Ready. The word stays hidden until 3, 2, 1.';
 }
 msg(localNote);if(!Recognition)msg('Speech input is unavailable in this browser. Use a browser with speech recognition to play.');
}
function tick(){
 if(S.open){
  const now=Date.now();
  if(S.host&&S.phase==='countdown'&&now>=S.startAt){S.phase='active';publishState();}
  if(S.host&&S.phase==='active'){
   if(S.bot&&S.claims[1]===null&&now>=S.startAt+botTime)acceptClaim('bot',S.round,botTime);
   if((firstClaimAt&&now-firstClaimAt>=1600)||now>S.startAt+LIMIT+1000)settleRound();
  }
  if(!S.bot&&connected){
   if(now-lastPulse>1000){lastPulse=now;if(S.host)send('state',{state:stateData()});else{send('pulse');ping();}}
   if(!S.host&&!S.hostId&&now-lastHello>1500){lastHello=now;send('hello');if(now-joinAt>8000)net('Room not found yet. Check the code with your friend.');}
   if(peerSeen&&now-peerSeen>9000&&S.phase!=='disconnected')disconnect('Your friend disconnected. No point awarded.');
  }
  if(['countdown','active'].includes(S.phase)){
   const key=S.session+':'+S.match+':'+S.round,remaining=S.startAt-hostNow();
   if(key!==liveKey){liveKey=key;visible=false;submitted=false;revealKey='';localNote='Wait for the word, then read it aloud.';msg(localNote);}
   if(remaining>0){$('word').textContent=String(Math.min(3,Math.ceil(remaining/1000)));$('cue').textContent='Get ready…';$('meaning').textContent='';$('verdict').textContent='Both microphones are ready.';$('scene').className='scene';}
   else{
    if(revealKey!==key){revealKey=key;revealPerf=performance.now();visible=true;localNote='Read it aloud!';msg(localNote);}
    $('word').textContent=WORDS[S.word]?.[0]||'···';$('cue').textContent='Read this aloud';$('meaning').textContent='';$('scene').className='scene active';
    $('verdict').textContent=submitted?'Correct! Comparing readings…':hostNow()>S.startAt+LIMIT?'Checking the final readings…':'First correct reading wins this point.';
   }
   $('timeBar').style.transform='scaleX('+Math.max(0,Math.min(1,(LIMIT+remaining)/LIMIT))+')';
  }else{$('timeBar').style.transform='scaleX(0)';visible=false;}
 }
 requestAnimationFrame(tick);
}
$('create').onclick=()=>{if(!Recognition){$('homeStatus').textContent='Speech input is unavailable in this browser. Open this page in a browser with speech recognition.';return;}const alphabet='ABCDEFGHJKLMNPQRSTUVWXYZ23456789',a=crypto.getRandomValues(new Uint8Array(6));openRoom(Array.from(a,n=>alphabet[n%alphabet.length]).join(''),true);};
$('joinForm').onsubmit=e=>{e.preventDefault();const code=$('code').value.trim().toUpperCase();if(!/^[A-Z2-9]{6}$/.test(code)){$('homeStatus').textContent='Enter the six-character room code.';return;}openRoom(code,false);};
$('practice').onclick=()=>openRoom('',true,true);$('leave').onclick=()=>leave();
$('ready').onclick=()=>{if(wantsMic||micStarting){stopMic();localNote='Mic off. Tap Ready when you want to play.';commandReady(false);render();}else{if(S.bot)S.ready[1]=true;startMic();}};
$('copy').onclick=async()=>{const u=new URL('duel.html',location.href);u.searchParams.set('room',S.code);try{await navigator.clipboard.writeText('Kana Duel · '+S.code+'\n'+u.href);$('copy').textContent='Invite copied ✓';}catch(_){msg('Room code: '+S.code+'. Your friend can type it on the duel page.');}};
$('hear').onclick=()=>{if(!['result','finished'].includes(S.phase)||wantsMic||S.word<0)return;const voice=window.speechSynthesis?.getVoices().find(v=>/^ja[-_]/i.test(v.lang));if(!voice||!window.SpeechSynthesisUtterance){msg('No Japanese playback voice on this device.');return;}speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(WORDS[S.word][0]);u.lang='ja-JP';u.voice=voice;u.rate=.8;speechSynthesis.speak(u);};
document.addEventListener('visibilitychange',()=>{if(document.hidden&&S.open){stopMic();window.speechSynthesis?.cancel();localNote='Mic off while this page is hidden. Tap Ready when you return.';if(S.host){if(['active','countdown'].includes(S.phase))voidRound('mic');else readyChange(me,false);}else send('cancel',{round:S.round});render();}});
window.addEventListener('pagehide',()=>leave(false));
if(qs.get('room')){$('code').value=qs.get('room').toUpperCase().slice(0,6);$('homeStatus').textContent='Your friend invited you. Tap Join friend.';}
if(!Recognition)$('homeStatus').textContent='This browser has no speech input. Use a browser with speech recognition to play.';
if(qs.get('test')==='1')window.__duel={S,WORDS,matches,normalize,me,receive,acceptClaim,settleRound,voidRound,openRoom,leave,getMic:()=>({micOpen,wantsMic,micStarting,submitted,visible,offset}),getReveal:()=>revealPerf};
requestAnimationFrame(tick);
})();
