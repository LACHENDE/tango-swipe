(()=>{
'use strict';
const $=id=>document.getElementById(id), canvas=$('arena'),ctx=canvas.getContext('2d');
const names={listen:'Listen & Dodge',runner:'Word Runner',voice:'Speak to Cast'};
const assetFiles={bg:'environment/night-shrine-background.png',you:'characters/you.png',tetsu:'characters/tetsu.png',kappa:'characters/kappa.png',orb:'effects/magenta-orb.png',star:'effects/gold-shuriken.png',floor:'environment/player-platform.png'};
const bounds={you:[132,172,995,941],tetsu:[159,21,961,1192],kappa:[94,111,1045,1042],orb:[473,472,307,308],star:[222,221,810,797],floor:[11,308,2150,289]};
const images={};Object.entries(assetFiles).forEach(([k,v])=>{const i=new Image();i.src='assets/'+v;images[k]=i;});
const starter=new Set(['電車','車','自転車','駅','学校','先生','学生','友達','家族','母','父','犬','猫','鳥','魚','水','お茶','牛乳','パン','ご飯','卵','肉','本','新聞','時計','傘','靴','鞄','机','椅子','山','川','雨','雪','花','空','海','朝','夜','今日','明日']);
let saved={};try{saved=JSON.parse(localStorage.getItem('tango-game-lab-v1')||'{}')||{};}catch(_){}
saved.best=saved.best||{};saved.favorites=Array.isArray(saved.favorites)?saved.favorites:[];
function persist(){try{localStorage.setItem('tango-game-lab-v1',JSON.stringify(saved));}catch(_){}}
if(['starter','n5','n4'].includes(saved.set))$('wordSet').value=saved.set;
if(['en','id','zh'].includes(saved.lang))$('language').value=saved.lang;
$('wordSet').onchange=()=>{saved.set=$('wordSet').value;persist();};$('language').onchange=()=>{saved.lang=$('language').value;persist();};
function menuStats(){document.querySelectorAll('[data-best]').forEach(el=>{const mode=el.dataset.best,best=saved.best[mode];el.textContent=(saved.favorites.includes(mode)?'♥ Kept · ':'')+(best?`Best: ${best} words`:(mode==='voice'?'10 spells · typing also works':'60 seconds · '+(mode==='listen'?'two choices':'two lanes')));});}
menuStats();
const G={mode:null,running:false,paused:false,elapsed:0,right:0,wrong:0,lives:3,combo:0,x:180,lane:0,move:0,keys:{},q:null,locked:false,questionId:0,token:0,hazards:[],effects:[],nextHazard:2,invUntil:0,gateTime:0,gateDuration:4.2,bossHP:100,voiceHints:0};
let W=360,H=400,lastFrame=0,joy=null,flick=null,feedbackUntil=0,lastIndex=-1;
let recognition=null,micTimeout=0,voiceSession=0,voicing=false;
const Recognition=window.SpeechRecognition||window.webkitSpeechRecognition;
let jpVoice=null;
function findVoice(){jpVoice=window.speechSynthesis?.getVoices().find(v=>/^ja(?:-|_)/i.test(v.lang))||null;}
findVoice();window.speechSynthesis?.addEventListener('voiceschanged',findVoice);
function stopAudio(){window.speechSynthesis?.cancel();}
function audioAvailable(){findVoice();return !!(window.speechSynthesis&&window.SpeechSynthesisUtterance&&jpVoice);}
function speak(text){
 if(!audioAvailable())return false;
 stopAudio();const u=new SpeechSynthesisUtterance(text);u.lang='ja-JP';u.voice=jpVoice;u.rate=.88;u.volume=.9;
 const token=G.token,q=G.questionId;
 u.onerror=e=>{if(['canceled','interrupted'].includes(e.error))return;if(G.mode==='listen'&&G.running&&!G.paused&&G.token===token&&G.questionId===q){$('showWord').checked=true;updatePrompt();feedback('Audio unavailable. Read the word instead.');}};
 speechSynthesis.speak(u);return true;
}
function abortVoice(){voiceSession++;clearTimeout(micTimeout);const old=recognition;recognition=null;voicing=false;if(old){old.onend=null;old.onerror=null;old.onresult=null;try{old.abort();}catch(_){}}$('mic').classList.remove('listening');$('mic').textContent='Tap to speak Japanese';}
function pool(){const set=$('wordSet').value;const list=LAB_WORDS.filter(w=>set==='starter'?starter.has(w.w):w.set===set);return list.length>=2?list:LAB_WORDS.filter(w=>w.set==='n5');}
function meaning(w){return w[$('language').value]||w.en;}
function nextQuestion(){
 if(!G.running)return;if(G.paused){G.pendingNext=true;return;}G.pendingNext=false;
 abortVoice();clearGesture();G.questionId++;G.locked=false;G.gateTime=0;
 const words=pool();let index=Math.floor(Math.random()*words.length);if(index===lastIndex)index=(index+1)%words.length;lastIndex=index;
 const w=words[index],others=words.filter(x=>meaning(x)!==meaning(w)&&x.k!==w.k);
 const group=others.filter(x=>x.c===w.c),choices=group.length?group:others;
 const wrong=choices[Math.floor(Math.random()*choices.length)];
 const correct=Math.random()<.5?0:1,opts=correct===0?[meaning(w),meaning(wrong)]:[meaning(wrong),meaning(w)];
 G.q={w,opts,correct};G.gateDuration=Math.max(2.6,4.2-G.right*.08);updatePrompt();
 document.querySelectorAll('[data-answer]').forEach((b,i)=>{b.textContent=(i===0?'← ':'')+opts[i]+(i===1?' →':'');b.disabled=false;});
 $('typed').value='';$('voiceHint').textContent='';$('hint').disabled=false;
 $('voiceStatus').textContent=Recognition?'Tap the mic, then say the Japanese word.':'Voice input is unavailable here. Type the Japanese word below.';
 $('mic').disabled=!Recognition;
 if(G.mode==='listen'){
  if(!speak(w.k)){$('showWord').checked=true;updatePrompt();feedback('Japanese voice unavailable here · written prompts are on.');}
 }
}
function updatePrompt(){if(!G.q)return;const w=G.q.w;
 $('promptLabel').textContent=G.mode==='listen'?($('showWord').checked?'Hear or read':'Listen to Tetsu'):G.mode==='runner'?'Find the meaning':'Say it in Japanese';
 $('promptWord').textContent=G.mode==='voice'?meaning(w):G.mode==='listen'&&!$('showWord').checked?'♪ Listen':w.w;
 $('promptWord').style.fontSize=G.mode==='voice'&&meaning(w).length>20?'21px':w.w.length>6&&G.mode!=='voice'?'24px':'';
}
function laterQuestion(ms){const token=G.token,q=G.questionId;setTimeout(()=>{if(G.running&&token===G.token&&q===G.questionId)nextQuestion();},ms);}
function feedback(msg,bad=false){$('feedback').textContent=msg;$('feedback').classList.toggle('bad',bad);feedbackUntil=performance.now()+2200;}
function hud(){
 $('hearts').textContent=G.mode==='voice'?'✦':('♥'.repeat(Math.max(0,G.lives))+'♡'.repeat(Math.max(0,3-G.lives)));
 $('hearts').setAttribute('aria-label',G.mode==='voice'?'Spell practice':G.lives+' lives');
 const seconds=Math.max(0,Math.ceil(60-G.elapsed));
 $('score').textContent=G.right+(G.right===1?' word':' words');$('timer').textContent=G.mode==='voice'?`${G.right} / 10`:`${Math.floor(seconds/60)}:${String(seconds%60).padStart(2,'0')}`;
}
function resize(){const r=canvas.getBoundingClientRect();if(!r.width||!r.height)return;H=r.height*W/r.width;const d=Math.min(2,devicePixelRatio||1);canvas.width=Math.round(r.width*d);canvas.height=Math.round(r.height*d);ctx.setTransform(canvas.width/W,0,0,canvas.height/H,0,0);}
new ResizeObserver(resize).observe($('game'));new ResizeObserver(resize).observe($('arena').parentElement);
function resetInput(){G.move=0;G.keys={};joy=null;$('joyKnob').style.transform='';clearGesture();}
function clearGesture(){flick=null;document.querySelectorAll('[data-answer]').forEach(b=>b.classList.remove('preview'));}
function start(mode){
 stopAudio();abortVoice();resetInput();G.token++;Object.assign(G,{mode,running:true,paused:false,pendingNext:false,elapsed:0,right:0,wrong:0,lives:3,combo:0,x:180,lane:0,locked:false,hazards:[],effects:[],nextHazard:2,invUntil:0,gateTime:0,bossHP:100,voiceHints:0});
 $('menu').hidden=true;$('game').hidden=false;$('game').dataset.mode=mode;$('game').classList.remove('typing');$('overlay').hidden=true;$('gameTitle').textContent=names[mode];
 ['listen','runner','voice'].forEach(k=>$(k+'Controls').hidden=k!==mode);
 $('showWord').checked=false;$('feedback').textContent='';setLane(0);nextQuestion();hud();resize();lastFrame=performance.now();
}
function leave(){G.running=false;G.token++;abortVoice();stopAudio();resetInput();$('game').hidden=true;$('menu').hidden=false;menuStats();}
function finish(){if(!G.running)return;G.running=false;abortVoice();stopAudio();resetInput();G.token++;saved.best[G.mode]=Math.max(saved.best[G.mode]||0,G.right);persist();
 $('overlay').hidden=false;$('resultEyebrow').textContent=names[G.mode];$('resultTitle').textContent=G.mode==='voice'?'Ten spells cast!':G.lives<=0?'One more run?':'Round complete';
 const attempts=G.right+G.wrong;$('resultDetail').textContent=`${G.right} correct ${G.right===1?'word':'words'}${attempts?' · '+Math.round(G.right/attempts*100)+'% answers correct':''}${G.mode==='voice'&&G.voiceHints?' · '+G.voiceHints+' hints used':''}.`;
 $('resume').hidden=true;$('again').hidden=false;$('favorite').hidden=false;$('choose').hidden=false;favoriteLabel();
}
function favoriteLabel(){$('favorite').textContent=saved.favorites.includes(G.mode)?'♥ Kept for later':'Keep this one ♥';$('favorite').setAttribute('aria-pressed',String(saved.favorites.includes(G.mode)));}
function pause(){if(!G.running||G.paused)return;G.paused=true;abortVoice();stopAudio();resetInput();$('overlay').hidden=false;$('resultEyebrow').textContent=names[G.mode];$('resultTitle').textContent='Take a breath';$('resultDetail').textContent='Your round is paused.';$('resume').hidden=false;$('again').hidden=true;$('favorite').hidden=true;$('choose').hidden=false;}
function resume(){G.paused=false;lastFrame=performance.now();$('overlay').hidden=true;if(G.pendingNext)nextQuestion();else if(G.mode==='listen'&&G.q)speak(G.q.w.k);}
document.querySelectorAll('[data-start]').forEach(b=>b.onclick=()=>start(b.dataset.start));$('back').onclick=leave;$('choose').onclick=leave;$('pause').onclick=pause;$('resume').onclick=resume;$('again').onclick=()=>start(G.mode);
$('favorite').onclick=()=>{const i=saved.favorites.indexOf(G.mode);if(i<0)saved.favorites.push(G.mode);else saved.favorites.splice(i,1);persist();favoriteLabel();};
document.addEventListener('visibilitychange',()=>{if(document.hidden)pause();});window.addEventListener('blur',resetInput);
function correct(){G.right++;G.combo++;G.bossHP=Math.max(0,100-G.right*10);G.effects.push({time:0,x:G.x,y:H-48,targetY:Math.min(150,H*.28),kind:'star'});feedback(`✓ ${G.q.w.w} · ${G.q.w.k} · ${meaning(G.q.w)}`);hud();if(G.mode==='voice'&&G.right>=10)finish();}
function hurt(){if(G.elapsed<G.invUntil)return;G.lives--;G.invUntil=G.elapsed+1.2;hud();if(G.lives<=0)finish();}
function answer(index){if(!G.running||G.paused||G.locked||G.mode!=='listen')return;G.locked=true;clearGesture();document.querySelectorAll('[data-answer]').forEach(b=>b.disabled=true);
 if(index===G.q.correct){correct();laterQuestion(350);}else{G.wrong++;G.combo=0;feedback(`${G.q.w.w} means ${meaning(G.q.w)}`,true);laterQuestion(1300);}
}
document.querySelectorAll('[data-answer]').forEach(b=>b.onclick=()=>answer(+b.dataset.answer));
$('replayAudio').onclick=()=>{if(G.q&&!speak(G.q.w.k)){$('showWord').checked=true;updatePrompt();feedback('No Japanese voice on this device. Read the word.');}};$('showWord').onchange=updatePrompt;
const stick=$('joystick');stick.onpointerdown=e=>{if(!G.running||G.paused)return;e.preventDefault();stick.setPointerCapture(e.pointerId);joy={id:e.pointerId,x:e.clientX};};stick.onpointermove=e=>{if(joy?.id!==e.pointerId)return;const dx=e.clientX-joy.x;G.move=Math.max(-1,Math.min(1,dx/30));$('joyKnob').style.transform=`translateX(${Math.max(-27,Math.min(27,dx))}px)`;};
function endJoy(e){if(joy?.id!==e.pointerId)return;joy=null;G.move=0;$('joyKnob').style.transform='';}stick.onpointerup=endJoy;stick.onpointercancel=endJoy;stick.onlostpointercapture=endJoy;
function flickDir(dx,dy){return Math.abs(dx)>=18&&Math.abs(dx)>Math.abs(dy)*1.3?(dx<0?0:1):-1;}
const pad=$('flick');pad.onpointerdown=e=>{if(G.locked||G.paused||!G.running)return;e.preventDefault();pad.setPointerCapture(e.pointerId);flick={id:e.pointerId,x:e.clientX,y:e.clientY,q:G.questionId};};pad.onpointermove=e=>{if(flick?.id!==e.pointerId)return;const i=flickDir(e.clientX-flick.x,e.clientY-flick.y);document.querySelectorAll('[data-answer]').forEach((b,n)=>b.classList.toggle('preview',i===n));};pad.onpointerup=e=>{if(flick?.id!==e.pointerId)return;const i=flickDir(e.clientX-flick.x,e.clientY-flick.y),valid=flick.q===G.questionId;clearGesture();if(valid&&i>=0)answer(i);};pad.onpointercancel=clearGesture;pad.onlostpointercapture=clearGesture;
function setLane(lane){G.lane=lane;$('laneLeft').classList.toggle('selected',lane===0);$('laneRight').classList.toggle('selected',lane===1);$('laneLeft').setAttribute('aria-pressed',String(lane===0));$('laneRight').setAttribute('aria-pressed',String(lane===1));}
$('laneLeft').onclick=()=>setLane(0);$('laneRight').onclick=()=>setLane(1);$('dash').onclick=()=>{if(G.running&&!G.paused&&!G.locked)G.gateTime=G.gateDuration;};
let swipe=null;canvas.onpointerdown=e=>{if(G.mode==='runner'){e.preventDefault();canvas.setPointerCapture(e.pointerId);swipe={id:e.pointerId,x:e.clientX};}};canvas.onpointerup=e=>{if(swipe?.id===e.pointerId){const dx=e.clientX-swipe.x;if(Math.abs(dx)>18)setLane(dx<0?0:1);else{const r=canvas.getBoundingClientRect();setLane(e.clientX<r.left+r.width/2?0:1);}swipe=null;}};canvas.onpointercancel=()=>swipe=null;
function resolveGate(){if(G.locked)return;G.locked=true;if(G.lane===G.q.correct)correct();else{G.wrong++;G.combo=0;feedback(`The right gate was “${meaning(G.q.w)}”`,true);hurt();}laterQuestion(650);}
function normalize(text){return String(text).normalize('NFKC').replace(/[ァ-ヶ]/g,c=>String.fromCharCode(c.charCodeAt(0)-0x60)).replace(/[\s。、，,.!?！？「」『』・]/g,'').toLowerCase();}
function cast(text,source='typed'){
 if(!G.running||G.paused||G.mode!=='voice'||G.locked)return false;
 const actual=normalize(text),w=G.q.w;if(!actual)return false;
 const ok=actual===normalize(w.k)||actual===normalize(w.w);
 if(ok){G.locked=true;abortVoice();correct();$('voiceStatus').textContent=`${text} · spell cast!`;laterQuestion(900);}
 else{G.wrong++;feedback(source==='mic'?`Heard “${text}”. Try again or type it.`:'Try again. You can reveal the reading.',true);$('voiceStatus').textContent=source==='mic'?`Heard: ${text}. No health lost.`:'Kana or kanji both work.';}
 return ok;
}
$('typeForm').onsubmit=e=>{e.preventDefault();cast($('typed').value);};
$('hint').onclick=()=>{if(!G.q)return;$('voiceHint').textContent=G.q.w.k;$('hint').disabled=true;G.voiceHints++;};$('hearAnswer').onclick=()=>{if(!G.q)return;G.voiceHints++;if(!speak(G.q.w.k)){$('voiceHint').textContent=G.q.w.k;$('voiceStatus').textContent='No Japanese playback voice here. The reading is shown.';}};
$('mic').onclick=()=>{
 if(!Recognition||!G.running||G.paused||G.locked)return;
 if(voicing){try{recognition.stop();$('voiceStatus').textContent='Checking what you said…';}catch(_){abortVoice();}return;}
 abortVoice();stopAudio();const session=voiceSession,question=G.questionId,token=G.token;
 const r=new Recognition();recognition=r;r.lang='ja-JP';r.interimResults=false;r.continuous=false;r.maxAlternatives=5;voicing=true;
 $('mic').classList.add('listening');$('mic').textContent='Listening… tap to finish';$('voiceStatus').textContent='Say the Japanese word. Only this attempt uses the mic.';
 const current=()=>session===voiceSession&&token===G.token&&question===G.questionId&&G.running&&!G.paused;
 r.onresult=e=>{if(!current())return;const result=e.results[e.resultIndex||0],alternatives=Array.from(result,x=>x.transcript);const expected=[normalize(G.q.w.w),normalize(G.q.w.k)];const match=alternatives.find(t=>expected.includes(normalize(t)));cast(match||alternatives[0]||'','mic');};
 r.onerror=e=>{if(!current())return;const messages={'not-allowed':'Microphone access was declined. You can type instead.','service-not-allowed':'Speech recognition is unavailable here. You can type instead.','audio-capture':'No microphone found. You can type instead.','network':'Speech service unavailable. Try again or type.','no-speech':'No speech heard. Try again or type.'};$('voiceStatus').textContent=messages[e.error]||'Could not hear that. Try again or type.';abortVoice();};
 r.onend=()=>{if(!current())return;recognition=null;voicing=false;clearTimeout(micTimeout);$('mic').classList.remove('listening');$('mic').textContent='Tap to speak Japanese';if($('voiceStatus').textContent.startsWith('Say the'))$('voiceStatus').textContent='Try again, or type the Japanese word.';};
 try{r.start();micTimeout=setTimeout(()=>{if(current()){abortVoice();$('voiceStatus').textContent='Listening ended. Tap again or type.';}},9000);}catch(_){abortVoice();$('voiceStatus').textContent='Voice could not start. Type the Japanese word below.';}
};
window.addEventListener('keydown',e=>{
 if(!G.running||G.paused||e.target.matches('input,select,textarea'))return;const key=e.key.toLowerCase();
 if(key==='escape'){pause();return;}
 if(G.mode==='listen'){
  if(key==='a'||key==='d'){G.keys[key]=true;e.preventDefault();}
  if(e.key==='ArrowLeft'||e.key==='ArrowRight'){e.preventDefault();if(!e.repeat)answer(e.key==='ArrowLeft'?0:1);}
 }else if(G.mode==='runner'){
  if(key==='a'||e.key==='ArrowLeft'){setLane(0);e.preventDefault();}else if(key==='d'||e.key==='ArrowRight'){setLane(1);e.preventDefault();}else if(key===' '&&!e.repeat){$('dash').click();e.preventDefault();}
 }
});window.addEventListener('keyup',e=>{delete G.keys[e.key.toLowerCase()];});
function sprite(key,x,y,h,flip=false){const i=images[key];if(!i?.naturalWidth)return;const b=bounds[key]||[0,0,i.naturalWidth,i.naturalHeight],w=h*b[2]/b[3];ctx.save();ctx.translate(x,y);if(flip)ctx.scale(-1,1);ctx.drawImage(i,b[0],b[1],b[2],b[3],-w/2,-h,w,h);ctx.restore();}
function background(){ctx.fillStyle='#17102d';ctx.fillRect(0,0,W,H);const i=images.bg;if(i.naturalWidth){const scale=Math.max(W/i.width,H/i.height);ctx.drawImage(i,(W-i.width*scale)/2,(H-i.height*scale)/2,i.width*scale,i.height*scale);ctx.fillStyle='rgba(18,10,35,.25)';ctx.fillRect(0,0,W,H);}}
function drawFloor(y){const i=images.floor,b=bounds.floor;if(i.naturalWidth)ctx.drawImage(i,...b,-10,y,W+20,50);else{ctx.fillStyle='#53406e';ctx.fillRect(0,y,W,22);}}
function roundRect(x,y,w,h,r){ctx.beginPath();ctx.roundRect(x,y,w,h,r);}
function wrapText(text,x,y,maxWidth,lineHeight,maxLines=3){const words=String(text).split(/\s+/);let lines=[],line='';for(const word of words){const test=line?line+' '+word:word;if(ctx.measureText(test).width>maxWidth&&line){lines.push(line);line=word;}else line=test;}if(line)lines.push(line);if(lines.length===1&&ctx.measureText(lines[0]).width>maxWidth){lines=[];line='';for(const ch of String(text)){if(ctx.measureText(line+ch).width>maxWidth){lines.push(line);line='';}line+=ch;}if(line)lines.push(line);}lines.slice(0,maxLines).forEach((s,i)=>ctx.fillText(s,x,y+(i-(Math.min(lines.length,maxLines)-1)/2)*lineHeight));}
function drawListen(){background();const floor=H-22;drawFloor(floor);sprite('kappa',180,Math.min(H*.45,175),Math.min(118,H*.34));
 ctx.fillStyle='#2d2144';roundRect(85,13,190,7,4);ctx.fill();ctx.fillStyle='#ff4fa3';roundRect(85,13,190*Math.max(.1,G.bossHP/100),7,4);ctx.fill();
 for(const a of G.hazards){const age=G.elapsed-a.start;
  if(age<a.warning){ctx.strokeStyle='#ff4fa3';ctx.lineWidth=2;ctx.setLineDash([5,5]);ctx.beginPath();ctx.ellipse(a.x,floor,26,7,0,0,Math.PI*2);ctx.stroke();ctx.setLineDash([]);}
  else{const t=Math.min(1,(age-a.warning)/a.fall);sprite('orb',a.x,45+(floor-45)*t,25);}
 }
 ctx.save();if(G.elapsed<G.invUntil&&Math.floor(G.elapsed*12)%2===0)ctx.globalAlpha=.35;sprite('you',G.x,floor+1,58);sprite('tetsu',Math.max(18,G.x-40),floor-25+Math.sin(G.elapsed*4)*2,29);ctx.restore();
}
function drawRunner(){background();const floor=H-25;
 ctx.fillStyle='#1c1835d9';ctx.beginPath();ctx.moveTo(125,80);ctx.lineTo(235,80);ctx.lineTo(350,H);ctx.lineTo(10,H);ctx.closePath();ctx.fill();
 ctx.strokeStyle='#74628e';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(180,90);ctx.lineTo(180,H);ctx.stroke();
 const offset=(G.elapsed*65)%65;ctx.strokeStyle='#554467';ctx.lineWidth=1;for(let y=80+offset;y<H;y+=65){const t=(y-80)/(H-80);ctx.beginPath();ctx.moveTo(125-115*t,y);ctx.lineTo(235+115*t,y);ctx.stroke();}
 if(G.q){const progress=Math.min(1,G.gateTime/G.gateDuration),y=95+(floor-123)*progress;
  G.q.opts.forEach((txt,i)=>{const x=i?265:95;ctx.fillStyle=G.locked?(i===G.q.correct?'#165750':'#59223f'):'#34244d';ctx.strokeStyle=G.locked?(i===G.q.correct?'#2ee6d6':'#ff4fa3'):'#d5b46c';ctx.lineWidth=2;roundRect(x-72,y-28,144,56,9);ctx.fill();ctx.stroke();ctx.fillStyle='#f6f1e7';ctx.font='650 14px system-ui';ctx.textAlign='center';wrapText(txt,x,y+4,130,15,3);});
 }
 sprite('you',G.x,floor,61);sprite('tetsu',G.x-38,floor-19,28);
}
function drawVoice(){background();const floor=H-18;drawFloor(floor);sprite('kappa',260,floor,Math.min(130,H*.48),true);sprite('you',96,floor,Math.min(69,H*.28));sprite('tetsu',52,floor-25,31);
 const barY=Math.max(110,H*.48);ctx.fillStyle='#3d294e';roundRect(200,barY,118,6,3);ctx.fill();ctx.fillStyle='#ff4fa3';roundRect(200,barY,118*G.bossHP/100,6,3);ctx.fill();
}
function frame(ts){const dt=Math.min(.05,(ts-lastFrame)/1000||0);lastFrame=ts;
 if(G.mode&&!$('game').hidden){
  if(G.running&&!G.paused){G.elapsed+=dt;
   if(G.mode==='listen'){
    const move=G.keys.a?-1:G.keys.d?1:G.move;G.x=Math.max(22,Math.min(338,G.x+move*225*dt));
    if(G.elapsed>=G.nextHazard){const lanes=[60,140,220,300];G.hazards.push({x:lanes[Math.floor(Math.random()*lanes.length)],start:G.elapsed,warning:1,fall:.65,hit:false});G.nextHazard=G.elapsed+2.3;}
    G.hazards.forEach(a=>{if(!a.hit&&G.elapsed>=a.start+a.warning+a.fall){a.hit=true;if(Math.abs(G.x-a.x)<23)hurt();}});G.hazards=G.hazards.filter(a=>G.elapsed<a.start+a.warning+a.fall+.2);
   }else if(G.mode==='runner'){G.x+=(G.lane?265:95)-G.x>0?Math.min(((G.lane?265:95)-G.x),dt*550):Math.max(((G.lane?265:95)-G.x),-dt*550);if(!G.locked){G.gateTime+=dt;if(G.gateTime>=G.gateDuration)resolveGate();}}
   G.effects.forEach(e=>e.time+=dt);G.effects=G.effects.filter(e=>e.time<.65);if(G.mode!=='voice'&&G.elapsed>=60)finish();hud();
  }
  ctx.setTransform(canvas.width/W,0,0,canvas.height/H,0,0);ctx.clearRect(0,0,W,H);if(G.mode==='listen')drawListen();else if(G.mode==='runner')drawRunner();else drawVoice();
  G.effects.forEach(e=>{const t=e.time/.65;const tx=G.mode==='voice'?260:180;const ty=G.mode==='voice'?H-85:e.targetY;sprite('star',e.x+(tx-e.x)*t,e.y+(ty-e.y)*t-Math.sin(t*Math.PI)*40,18);});
  if(ts>feedbackUntil&&!G.paused)$('feedback').textContent='';
 }
 requestAnimationFrame(frame);
}requestAnimationFrame(frame);
if(new URLSearchParams(location.search).get('test')==='1')window.__lab={G,start,answer,setLane,resolveGate,cast,normalize,pause,resume,finish,images,pool,next:nextQuestion,getVoice:()=>({voicing,session:voiceSession}),layout:()=>({W,H})};
})();
