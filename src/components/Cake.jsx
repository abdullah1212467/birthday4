import {useEffect,useRef,useState} from 'react';
import {motion,AnimatePresence} from 'framer-motion';
import {burst} from './Effects.jsx';

// viewBox window + candle geometry
const VX=-20,VY=30,VW=480,VH=350,CX=[165,185,215,235];
const TIERS=[
 {y:250,h:80,w:280,ry:22,c:'#ffb8d2'},
 {y:180,h:70,w:200,ry:17,c:'#ffa6c6'},
 {y:120,h:60,w:130,ry:12,c:'#ffd0e2'}];
const FROST='#fff7fb',SPONGE='#f6d9a6',SPR=['#ff6f9f','#ffd36b','#9be3c1','#b9a3ff','#fff'];
// y of the front edge of a tier's top ellipse at x
const edge=(t,x)=>t.y+t.ry*Math.sqrt(Math.max(0,1-((x-200)/(t.w/2))**2));

const Flower=({x,y})=><g transform={`translate(${x} ${y})`}>{[0,72,144,216,288].map(a=><circle key={a} cx={Math.cos(a/57.3)*6} cy={Math.sin(a/57.3)*6} r="5" fill="#fff" stroke="#ffb3cf" strokeWidth=".8"/>)}<circle r="3.5" fill="#ffd36b"/></g>;
const Berry=({x,y})=><g transform={`translate(${x} ${y})`}><path d="M-10 -4Q0 -8 10 -4Q7 11 0 14Q-7 11 -10 -4Z" fill="#e8344f"/><path d="M-10 -4Q0 -8 10 -4Q7 5 0 7Q-7 5 -10 -4Z" fill="#fff" opacity=".18"/>{[[-4,2],[3,4],[0,9],[5,-1]].map(([a,b],i)=><circle key={i} cx={a} cy={b} r=".9" fill="#ffe0a0"/>)}<path d="M-6 -5L0 -10L6 -5L0 -3Z" fill="#4caf6a"/></g>;
const DEC=[[0,78,'b'],[0,98,'f'],[0,118,'b'],[0,140,'f'],[0,160,'b'],[0,240,'b'],[0,260,'f'],[0,282,'b'],[0,302,'f'],[0,322,'b'],[1,116,'b'],[1,150,'f'],[1,250,'f'],[1,284,'b'],[2,150,'b'],[2,250,'b']];

function Tier({t,i}){
 const r=t.w/2,l=200-r,rr=200+r,b=t.y+t.h;
 const n=Math.floor(t.w/26),drips=Array.from({length:n},(_,k)=>[l+13+k*(t.w-26)/(n-1),8+((k*7)%4)*5]);
 const pn=Math.floor(t.w/14),pearls=Array.from({length:pn},(_,k)=>{const x=l+7+k*(t.w-14)/(pn-1);return [x,b+t.ry*Math.sqrt(Math.max(0,1-((x-200)/r)**2))-2]});
 const body=`M${l} ${t.y}V${b}A${r} ${t.ry} 0 0 0 ${rr} ${b}V${t.y}Z`;
 return <g>
  <path d={body} fill={t.c}/><path d={body} fill="url(#shade)"/>
  {Array.from({length:15},(_,k)=>{const x=l+10+(k*37)%(t.w-20),y=t.y+t.ry+12+(k*53)%(t.h-t.ry-22);return <rect key={k} x={x} y={y} width="6" height="2.2" rx="1.1" fill={SPR[k%5]} transform={`rotate(${k*40} ${x+3} ${y+1})`}/>})}
  <ellipse cx="200" cy={t.y} rx={r} ry={t.ry} fill={FROST}/><ellipse cx="200" cy={t.y} rx={r-9} ry={t.ry-3.5} fill="#ffe6ef"/>
  {drips.map(([x,len])=><rect key={x} x={x-5} y={edge(t,x)-1} width="10" height={len} rx="5" fill={FROST}/>)}
  {pearls.map(([x,y])=><circle key={x} cx={x} cy={y} r="3.4" fill="#fff" stroke="#ffc0d6" strokeWidth=".7"/>)}
  {i===1&&<text x="200" y="246" textAnchor="middle" fontSize="28" fontFamily="Playfair Display,serif" fontWeight="700" fill="url(#gold)" stroke="#fff" strokeWidth=".8">20</text>}
 </g>}

const Candle=({x,on,bend})=><g>
 <rect x={x-4.5} y="84" width="9" height="38" rx="2.5" fill="#fff" stroke="#ffb3cf" strokeWidth=".8"/>
 <path d={`M${x-4.5} 94l9-5M${x-4.5} 104l9-5M${x-4.5} 114l9-5`} stroke="#ff8fb8" strokeWidth="3"/>
 <rect x={x-.7} y="79" width="1.4" height="6" fill="#4a3a3a"/>
 {on&&<motion.g animate={{skewX:bend?-28:0,scaleY:bend?.8:1}} transition={{duration:.4}} style={{transformBox:'fill-box',transformOrigin:'50% 100%'}}>
  <ellipse cx={x} cy="66" rx="14" ry="20" fill="#ffd36b" opacity=".45" filter="url(#blur)"/>
  <g className="flame"><path d={`M${x} 52Q${x+7} 66 ${x} 79Q${x-7} 66 ${x} 52Z`} fill="#ffb02e"/><ellipse cx={x} cy="71" rx="2.6" ry="5.5" fill="#fff6c8"/></g></motion.g>}
</g>;

const Plate=()=><g>
 <ellipse cx="200" cy="346" rx="185" ry="24" fill="#000" opacity=".18"/>
 <ellipse cx="200" cy="334" rx="178" ry="28" fill="url(#plate)"/><ellipse cx="200" cy="332" rx="150" ry="21" fill="#fff" opacity=".35"/></g>;

const Body=({lit=[],bend,candles=true})=><g>
 {[...TIERS].map((t,i)=><Tier key={i} t={t} i={i}/>)}
 {DEC.map(([ti,x,k],j)=>{const y=edge(TIERS[ti],x)-3;return k==='b'?<Berry key={j} x={x} y={y}/>:<Flower key={j} x={x} y={y}/>})}
 {candles&&CX.map((x,i)=><Candle key={x} x={x} on={lit[i]} bend={bend}/>)}</g>;

// cross-section shown in the gap when the cake is cut
const Inner=({D})=><g>{TIERS.map((t,i)=><g key={i}>
 <rect x={200-D-12} y={t.y} width={2*D+24} height={t.h} fill={SPONGE}/>
 {[1/3,2/3].map(f=><rect key={f} x={200-D-12} y={t.y+t.h*f-3} width={2*D+24} height="6" fill="#fff"/>)}
 <rect x={200-D-12} y={t.y+t.h*.5-1} width={2*D+24} height="2.5" fill="#ff8fa8" opacity=".7"/>
 <rect x={200-D-12} y={t.y} width={2*D+24} height="5" fill={FROST}/></g>)}
 <rect x={200-D-12} y="120" width={2*D+24} height="210" fill="url(#depth)"/></g>;

const Slice=()=><g>
 <ellipse cx="0" cy="4" rx="52" ry="11" fill="url(#plate)"/>
 {[[-26,26,27,'#ffb8d2'],[-48,22,21,'#ffa6c6'],[-66,18,15,'#ffd0e2']].map(([y,h,w,c],i)=><g key={i}>
  <rect x={-w} y={y} width={2*w} height={h} fill={SPONGE}/><rect x={-w} y={y+h/2-2.5} width={2*w} height="5" fill="#fff"/>
  <rect x={-w} y={y} width={2*w} height="4" fill={FROST}/><rect x={-w} y={y} width="4" height={h} fill={c}/><rect x={w-4} y={y} width="4" height={h} fill={c}/></g>)}
 <Berry x="0" y="-72"/></g>;

export default function Cake(){
 const [st,setSt]=useState('idle'),[fl,setFl]=useState([1,1,1,1]),[shake,setShake]=useState(0),ref=useRef();
 const tm=useRef([]),later=(f,d)=>tm.current.push(setTimeout(f,d));
 useEffect(()=>()=>tm.current.forEach(clearTimeout),[]);
 const pos=(x,y)=>{const r=ref.current?.getBoundingClientRect();if(!r)return{x:innerWidth/2,y:innerHeight/2};const k=r.width/VW;return{x:r.left+(x-VX)*k,y:r.top+(y-VY)*k}};
 const wish=()=>{if(st!=='idle')return;setSt('wish');burst({...pos(200,100),n:30,kind:'sparkle'})};
 const blow=()=>{if(st!=='wish')return;setSt('blowing');CX.forEach((x,i)=>later(()=>{setFl(f=>f.map((v,j)=>j===i?0:v));burst({...pos(x,72),n:18,kind:'smoke'});if(i===3)later(()=>{burst({...pos(200,150),n:50,kind:'sparkle'});setSt('out')},500)},i*450))};
 const done=()=>{const o=pos(200,240);burst({...o,n:160});burst({...o,n:70,kind:'crumb'});burst({...o,n:60,kind:'sparkle'});setShake(1);setSt('cut');later(()=>burst({...pos(405,280),n:40,kind:'sparkle'}),900)};
 const cut=()=>{if(st!=='out')return;setSt('cutting');later(done,1700)};
 const reset=()=>{tm.current.forEach(clearTimeout);tm.current=[];setFl([1,1,1,1]);setShake(0);setSt('idle');burst({n:40,kind:'sparkle'})};
 const lit=st==='wish'||st==='blowing'?fl:[],glow=st==='wish'?.55:st==='blowing'?fl.filter(Boolean).length*.14:st==='cut'?.35:0;
 const msg={idle:'',wish:'Close Your Eyes. Make a Beautiful Wish.',blowing:'',out:'May all your wishes come true! 💗',cutting:'',cut:'May Every Sweet Wish Come True!'}[st];
 const half=(id,dx,rot)=><motion.g key={id} clipPath={`url(#${id})`} initial={{x:0,rotate:0}} animate={{x:dx,rotate:rot}} transition={{type:'spring',stiffness:60,damping:12,delay:.15}} style={{transformOrigin:'200px 330px'}}><Body candles={false}/></motion.g>;
 const D=24;
 return <motion.div className="cakewrap" animate={shake?{x:[0,-7,7,-4,4,0]}:{}} transition={{duration:.5}}>
  <motion.svg ref={ref} viewBox={`${VX} ${VY} ${VW} ${VH}`} className="cake" style={{animation:'none'}} animate={{y:[0,-6,0]}} transition={{repeat:Infinity,duration:4,ease:'easeInOut'}}>
   <defs>
    <linearGradient id="shade" x1="0" x2="1"><stop offset="0" stopColor="#000" stopOpacity=".14"/><stop offset=".3" stopColor="#fff" stopOpacity=".22"/><stop offset="1" stopColor="#000" stopOpacity=".22"/></linearGradient>
    <linearGradient id="depth" x1="0" x2="1"><stop offset="0" stopColor="#000" stopOpacity=".28"/><stop offset=".25" stopColor="#000" stopOpacity="0"/><stop offset=".75" stopColor="#000" stopOpacity="0"/><stop offset="1" stopColor="#000" stopOpacity=".28"/></linearGradient>
    <linearGradient id="plate" x1="0" x2="1"><stop offset="0" stopColor="#f0d6a8"/><stop offset=".5" stopColor="#fff3d8"/><stop offset="1" stopColor="#e5c48f"/></linearGradient>
    <linearGradient id="gold" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#ffe9a0"/><stop offset="1" stopColor="#d9a441"/></linearGradient>
    <linearGradient id="steel" x1="0" x2="1"><stop offset="0" stopColor="#9aa6b5"/><stop offset=".5" stopColor="#fff"/><stop offset="1" stopColor="#b7c2d0"/></linearGradient>
    <radialGradient id="halo"><stop offset="0" stopColor="#ffd9a8"/><stop offset="1" stopColor="#ffd9a8" stopOpacity="0"/></radialGradient>
    <filter id="blur" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="4"/></filter>
    <clipPath id="L"><rect x="-100" y="-100" width="300" height="600"/></clipPath><clipPath id="R"><rect x="200" y="-100" width="300" height="600"/></clipPath>
   </defs>
   <motion.circle cx="200" cy="200" r="270" fill="url(#halo)" animate={{opacity:glow}} transition={{duration:.6}}/>
   <Plate/>
   {st==='cut'?<>
     <motion.g initial={{scaleX:0}} animate={{scaleX:1}} transition={{delay:.15,duration:.5}} style={{transformOrigin:'200px 200px'}}><Inner D={D}/></motion.g>
     {half('L',-D,-3)}{half('R',D,3)}
     <g transform="translate(405 330)" style={{cursor:'pointer'}} onClick={()=>burst({...pos(405,280),n:60,kind:'sparkle'})}>
      <motion.g initial={{x:60,y:-40,opacity:0}} animate={{x:0,y:0,opacity:1}} transition={{delay:.8,type:'spring',damping:12}}><Slice/></motion.g></g></>
    :<Body lit={lit} bend={st==='blowing'}/>}
   {st==='cutting'&&<>
    <motion.rect x="199" y="108" width="2" fill="#fff" filter="url(#blur)" initial={{height:0}} animate={{height:[0,0,238]}} transition={{delay:.3,duration:1.3,times:[0,.256,1],ease:'linear'}}/>
    <motion.g initial={{y:-320}} animate={{y:0}} transition={{delay:.3,duration:1.3,ease:'linear'}}>
     <path d="M194 40H206V332L194 346Z" fill="url(#steel)" stroke="#8793a3" strokeWidth=".8"/>
     <rect x="191" y="-24" width="18" height="66" rx="8" fill="#c97a9a"/><rect x="190" y="36" width="20" height="7" rx="2" fill="#e8c27a"/></motion.g></>}
  </motion.svg>
  <div className="cakeUi">
   <div className="cakemsgbox"><AnimatePresence mode="wait"><motion.p key={st} className="script cakemsg" initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} exit={{opacity:0}} transition={{duration:.3}}>{msg}</motion.p></AnimatePresence></div>
   <div className="cakebtn">
    {st==='idle'&&<button className="btn pulse" onClick={wish}>Make a Birthday Wish ✨</button>}
    {st==='wish'&&<button className="btn pulse" onClick={blow}>Blow the Candles 🌬️</button>}
    {st==='out'&&<button className="btn pulse" onClick={cut}>Cut Your Birthday Cake 🎂</button>}
    {st==='cut'&&<button className="btn" onClick={reset}>Make Another Wish ✨</button>}
   </div>
   {st==='cut'&&<small className="hint">Tap the slice for a little sparkle ✨</small>}
  </div></motion.div>;
}
