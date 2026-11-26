import {useEffect,useRef,useState} from 'react';import {motion,useInView,AnimatePresence} from 'framer-motion';
import {X,Smile,Flower2,Heart,Sun,Sparkles,PartyPopper} from 'lucide-react';
import {burst} from './Effects.jsx';import {photos,placeholder} from '../photos.js';
const fade={initial:{opacity:0,y:40},whileInView:{opacity:1,y:0},viewport:{once:true,margin:'-80px'},transition:{duration:.8}};
export function Hero(){const [m,setM]=useState([0,0]);
 return <section onMouseMove={e=>setM([e.clientX/innerWidth-.5,e.clientY/innerHeight-.5])}>
  {['🌸','🦋','💗','⭐','🌷'].map((e,i)=><span key={i} className="par" style={{left:8+i*20+'%',top:(i%2?68:14)+'%',fontSize:30+i*6,transform:`translate(${m[0]*-(24+i*14)}px,${m[1]*-(24+i*14)}px)`}}>{e}</span>)}
  <motion.img className="heroimg" src={photos[3].src} alt="Tuba Iman" initial={{opacity:0,scale:.8,y:30}} animate={{opacity:1,scale:1,y:0}} transition={{duration:1.2}}/>
  <motion.h1 className="script big" initial={{opacity:0,scale:.7}} animate={{opacity:1,scale:1}} transition={{duration:1.4}}>Happy 20th Birthday, Tuba Iman!</motion.h1>
  <motion.p className="sub" initial={{opacity:0}} animate={{opacity:1}} transition={{delay:1.2,duration:1}}>Some people make the world more beautiful simply by being in it.</motion.p>
  <motion.span className="chev" animate={{y:[0,10,0]}} transition={{repeat:Infinity,duration:1.6}}>⌄</motion.span></section>}
export function Age(){
 const r=useRef(),v=useInView(r,{amount:.5});useEffect(()=>{if(v)burst({y:innerHeight*.4,n:90})},[v]);
 return <section ref={r}><motion.h2 {...fade}>20 Years of Beauty, Happiness &amp; Magic</motion.h2>
  <motion.div className="twenty" initial={{scale:.3,opacity:0}} whileInView={{scale:1,opacity:1}} viewport={{once:true}} transition={{type:'spring',stiffness:80,damping:10}}>20
   <i className="ring"/><i className="ring r2"/>{['⭐','✨','⭐','✨'].map((s,i)=><span key={i} className={'orb o'+i}>{s}</span>)}</motion.div>
  <motion.p className="sub" {...fade}>1 December</motion.p></section>;
}
const LETTER=`Dear Tuba Iman,

Today is your special day, and I hope it brings a smile as beautiful as yours.

May your life always be filled with happiness, your dreams reach the stars, and your heart always find reasons to smile.

Twenty is not just another number. It's the beginning of another beautiful chapter.

Never stop shining, never stop dreaming, and always remember how special you are.

Wishing you endless happiness and a magical 20th birthday.

Happy Birthday, Tuba! 💗`;
export function Letter(){
 const [open,setOpen]=useState(false),[n,setN]=useState(0);
 useEffect(()=>{if(!open)return;let i;const t=setTimeout(()=>{i=setInterval(()=>setN(c=>c>=LETTER.length?(clearInterval(i),c):c+1),22)},900);return()=>{clearTimeout(t);clearInterval(i)}},[open]);
 return <section><motion.h2 {...fade}>A Letter For You</motion.h2>
  {!open?<motion.button className="env" onClick={()=>{setOpen(true);burst({n:40,kind:'sparkle'})}} whileHover={{scale:1.06,rotate:-2}} whileTap={{scale:.95}} animate={{y:[0,-8,0]}} transition={{repeat:Infinity,duration:3}}>
    <span className="flap"/><span className="heartseal">💗</span><small>Tap to open</small></motion.button>
  :<motion.div className="letter glass" initial={{opacity:0,scale:.6,rotateX:70}} animate={{opacity:1,scale:1,rotateX:0}} transition={{duration:1}}>
    <p>{LETTER.slice(0,n)}<i className="caret"/></p>{n<LETTER.length&&<button className="skip" onClick={()=>setN(LETTER.length)}>skip</button>}</motion.div>}</section>;
}
export function Gallery(){
 const [sel,setSel]=useState(null),[t,setT]=useState({});
 useEffect(()=>{const k=e=>e.key==='Escape'&&setSel(null);addEventListener('keydown',k);return()=>removeEventListener('keydown',k)},[]);
 const mv=(i,e)=>{const r=e.currentTarget.getBoundingClientRect();setT({[i]:[((e.clientY-r.top)/r.height-.5)*-18,((e.clientX-r.left)/r.width-.5)*18]})};
 return <section><motion.h2 {...fade}>Her Beautiful World</motion.h2>
 <div className="grid">{photos.map((p,i)=>{const [rx,ry]=t[i]||[0,0];return <motion.div key={i} initial={{opacity:0,y:50,rotateY:-40}} whileInView={{opacity:1,y:0,rotateY:0}} viewport={{once:true}} transition={{delay:(i%3)*.15,duration:.8}} style={{perspective:800}}>
  <figure className="polaroid" style={{'--r':((i%3)-1)*3+'deg',transform:`rotateX(${rx}deg) rotateY(${ry}deg) rotate(var(--r))`}} onMouseMove={e=>mv(i,e)} onMouseLeave={()=>setT({})} onClick={()=>setSel(i)}>
  <div className="float" style={{animationDelay:i*.4+'s'}}><img src={p.src||placeholder()} alt={p.caption} loading="lazy"/><figcaption className="script">{p.caption}</figcaption></div></figure></motion.div>})}</div>
 <AnimatePresence>{sel!==null&&<motion.div className="lightbox" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={()=>setSel(null)}>
  <motion.figure className="polaroid big2" initial={{scale:.6,rotate:-6}} animate={{scale:1,rotate:0}} onClick={e=>e.stopPropagation()}><img src={photos[sel].src||placeholder()} alt={photos[sel].caption}/><figcaption className="script">{photos[sel].caption}</figcaption></motion.figure>
  <button className="x" aria-label="Close" onClick={()=>setSel(null)}><X/></button></motion.div>}</AnimatePresence></section>}
export const Story=()=><section className="story"><motion.h2 {...fade}>Portraits Of A Beautiful Soul</motion.h2>
 {photos.slice(1).map((p,i)=><motion.div key={i} className={'srow'+(i%2?' rev':'')} initial={{opacity:0,x:i%2?90:-90}} whileInView={{opacity:1,x:0}} viewport={{once:true,margin:'-80px'}} transition={{duration:.9}}>
  <img src={p.src} alt={p.caption} loading="lazy"/><p className="script">{p.line}</p></motion.div>)}</section>;
const R=[[Smile,'Your beautiful smile'],[Flower2,'Your lovely personality'],[Heart,'Your kindness'],[Sparkles,'Your elegance'],[Sun,'Your positive energy'],[PartyPopper,'Your uniqueness']];
export const Reasons=()=><section><motion.h2 {...fade}>Reasons You Are Special</motion.h2>
 <div className="grid r">{R.map(([I,t],i)=><motion.div key={t} className="glass card" initial={{opacity:0,y:60,scale:.9}} whileInView={{opacity:1,y:0,scale:1}} viewport={{once:true}} transition={{delay:i*.12,duration:.7}} whileHover={{y:-8}}><I size={34} color="#ffb3d9"/><p>{t}</p></motion.div>)}</div></section>;
const W=['Laughter that never runs out','Dreams that really come true','Peace in your heart','Friends who feel like family','Success in all you do','Mornings that start with a smile','Courage to chase your goals','Health and strength','Adventures worth remembering','Kindness returned to you','Days full of sunshine','Love that treats you gently','Confidence to be yourself','Moments of pure joy','Doors that open for you','Little surprises all year','Nights of calm, deep sleep','Memories you will treasure','Strength through every storm','And a whole lot of cake 🎂'];
export const Wishes=()=><section><motion.h2 {...fade}>20 Wishes For Your 20th Year</motion.h2>
 <div className="chips">{W.map((w,i)=><motion.span key={i} className="glass chip" initial={{opacity:0,scale:.7,y:30}} whileInView={{opacity:1,scale:1,y:0}} viewport={{once:true}} transition={{delay:(i%4)*.08}}><b>{i+1}</b>{w}</motion.span>)}</div></section>;
const HEART = [
  "Dear Tuba,",

  "Some people have a beautiful way of making ordinary moments feel a little more special, without even realizing it. You are one of those people.",

  "I don't know if you ever notice the little things about yourself, like your smile, your kindness, or the way your presence can make a simple day feel a little brighter. But sometimes, the smallest things about a person leave the biggest impressions.",

  "On your birthday, I just wanted to remind you that you are someone worth appreciating, not only for the beautiful moments you create, but simply for being who you are.",

  "I hope this new year of your life brings you endless reasons to smile, beautiful surprises, peaceful days, and all the happiness your heart deserves.",

  "And if you ever wonder whether the little things about you are noticed, just know that they are more than you might imagine.",

  "Happy Birthday, Tuba. 💗",

  "— Someone who truly admires you"
];
export function HeartNote(){const [o,setO]=useState(false);
 return <section><motion.h2 {...fade}>Something From My Heart</motion.h2>
  {!o?<motion.button className="btn pulse" onClick={()=>{setO(true);burst({n:80,kind:'sparkle'})}} whileHover={{scale:1.06}}>Open My Heart 💌</motion.button>
  :<div className="glass heartcard">{HEART.map((l,i)=><motion.p key={i} className={i>4?'script hl':''} initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{delay:i*1.4,duration:1.2}}>{l}</motion.p>)}</div>}</section>}
export function Gift(){
 const [o,setO]=useState(false),ref=useRef();
 const go=()=>{if(o)return;setO(true);const r=ref.current.getBoundingClientRect(),p={x:r.left+r.width/2,y:r.top+30};burst({...p,n:150});burst({...p,n:60,kind:'sparkle'})};
 return <section><motion.h2 {...fade}>One More Surprise For You 🎁</motion.h2>
  <div ref={ref} className={'gift'+(o?' open':'')} onClick={go} role="button" tabIndex={0} onKeyDown={e=>e.key==='Enter'&&go()}>
   <div className="glow"/><div className="lid"><i className="bow"/></div><div className="box"><i className="rib"/></div></div>
  {!o&&<p className="sub">Tap the gift</p>}
  <AnimatePresence>{o&&<motion.p className="glass reveal" initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{delay:.5}}>Your 20th year deserves a million beautiful moments!</motion.p>}</AnimatePresence></section>;
}
export function Finale(){
 const r=useRef(),v=useInView(r,{amount:.4});
 useEffect(()=>{if(!v)return;burst({n:200,y:innerHeight*.3});const a=setInterval(()=>burst({kind:'rain',n:6}),250);
  const b=setInterval(()=>burst({x:Math.random()*innerWidth,y:Math.random()*innerHeight*.5,n:90,kind:'sparkle'}),700);return()=>{clearInterval(a);clearInterval(b)}},[v]);
 const B=['#ff8fb8','#c9b3ff','#ffd3b0','#ffc2d9','#b9a3ff','#ffb3cf'];
 return <section ref={r} className="finale">{B.map((c,i)=><span key={i} className="balloon" style={{left:6+i*17+'%',background:c,animationDelay:i*.7+'s'}}/>)}
  <motion.h1 className="script big glowtext" {...fade}>HAPPY 20TH BIRTHDAY, TUBA IMAN!</motion.h1>
  <motion.p className="sub" {...fade}>Stay beautiful. Stay happy. Keep shining!</motion.p>
  <button className="btn" onClick={()=>{burst({n:250});burst({n:80,kind:'sparkle'})}}>Celebrate Again 🎉</button></section>;
}
