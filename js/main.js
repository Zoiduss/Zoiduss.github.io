// ── Custom cursor ────────────────────────────────────────────────────────────
(function(){
  var dot  = document.getElementById('cursor');
  var ring = document.getElementById('cursor-ring');
  if(!dot || !ring) return;
  var mx=window.innerWidth/2, my=window.innerHeight/2;
  var rx=mx, ry=my;
  var visible = false;

  document.addEventListener('mousemove', function(e){
    mx = e.clientX; my = e.clientY;
    if(!visible){ rx=mx; ry=my; visible=true; dot.style.opacity='1'; ring.style.opacity='1'; }
    // snap dot immediately
    dot.style.left = mx+'px';
    dot.style.top  = my+'px';
    // hover detection
    var t = e.target;
    var isHoverable = t && (t.closest('a,button,[data-neon],.pill-a,.mp-btn,.p-tab,.p-close,.mp-q-item') !== null);
    document.body.classList.toggle('cursor-hover', !!isHoverable);
  }, {passive:true});

  document.addEventListener('mouseleave', function(){
    dot.style.opacity='0'; ring.style.opacity='0'; visible=false;
  });
  document.addEventListener('mouseenter', function(){
    dot.style.opacity='1'; ring.style.opacity='1'; visible=true;
  });

  // ring lerps behind with RAF
  var lerp = 0.13;
  function tick(){
    rx += (mx - rx) * lerp;
    ry += (my - ry) * lerp;
    ring.style.left = rx+'px';
    ring.style.top  = ry+'px';
    requestAnimationFrame(tick);
  }
  // hide initially until first mousemove
  dot.style.opacity='0'; ring.style.opacity='0';
  requestAnimationFrame(tick);
})();
// ─────────────────────────────────────────────────────────────────────────────

let po=false;
try{(function injectContent(){
  const D = FIZZ_DATA;
  document.querySelectorAll('[data-logo]').forEach(el => {
    el.src = D.images.logo;
  });
  const esub = document.getElementById('esub');
  const etapLbl = document.querySelector('#etap .e-tap-label');
  if(esub)    esub.textContent    = D.entry.subtitle;
  if(etapLbl) etapLbl.textContent = D.entry.tapText;
  const heroSide = document.querySelector('.hero-side');
  if(heroSide) heroSide.textContent = D.hero.sideText;
  const roleMain = document.querySelector('.role-main');
  const roleSub  = document.querySelector('.role-sub');
  if(roleMain) roleMain.textContent = D.hero.roleMain;
  if(roleSub)  roleSub.textContent  = D.hero.roleSub;
  const ctaPrimary   = document.getElementById('cta-primary');
  const ctaSecondary = document.getElementById('cta-secondary');
  if(ctaPrimary){
    ctaPrimary.textContent = D.hero.ctaPrimary.label;
    ctaPrimary.href        = D.hero.ctaPrimary.href;
  }
  if(ctaSecondary){
    ctaSecondary.textContent = D.hero.ctaSecondary.label;
    ctaSecondary.href        = D.hero.ctaSecondary.href;
  }
  const woVal = document.getElementById('wo-val');
  const woSub = document.getElementById('wo-sub');
  const stVal = document.getElementById('st-val');
  const stSub = document.getElementById('st-sub');
  if(woVal) woVal.textContent = D.currently.workingOn.value;
  if(woSub) woSub.textContent = D.currently.workingOn.sub;
  if(stVal) stVal.textContent = D.currently.status.value;
  if(stSub) stSub.textContent = D.currently.status.sub;
  const grid = document.getElementById('projects-grid');
  if(grid && D.projects){
    grid.innerHTML = D.projects.map(p => {
      const thumb = p.image
        ? `<img src="${p.image}" alt="${p.imageAlt||''}" style="width:100%;height:100%;object-fit:cover;border-radius:13px">`
        : `<span>project image</span>`;
      return `
      <div class="g-card lq gs-bento" data-neon>
        <div class="g-thumb">${thumb}</div>
        <div class="g-num">${p.num}</div>
        <div class="g-title">${p.title}</div>
        <div class="g-desc">${p.desc}</div>
        <span class="g-tag">${p.tag}</span>
      </div>`;
    }).join('');
    injectGlass(grid);
  }
  const S = D.socials;
  setHref('[data-social="discord-account"]',   S.discordAccount.href);
  setHref('[data-social="discord-portfolio"]', S.discordPortfolio.href);
  setHref('[data-social="roblox"]',            S.roblox.href);
  const cDA = document.getElementById('ct-discord-account');
  const cDP = document.getElementById('ct-discord-portfolio');
  const cRB = document.getElementById('ct-roblox');
  function setText(el, text){ const s=el.querySelector('span'); (s||el).textContent=text; }
  if(cDA){ setText(cDA, S.discordAccount.label);   cDA.href = S.discordAccount.href; }
  if(cDP){ setText(cDP, S.discordPortfolio.label); cDP.href = S.discordPortfolio.href; }
  if(cRB){ setText(cRB, S.roblox.label);           cRB.href = S.roblox.href; }
  const pDA = document.getElementById('p-discord-account');
  const pDP = document.getElementById('p-discord-portfolio');
  const pRB = document.getElementById('p-roblox');
  if(pDA){ pDA.querySelector('.p-link-name').textContent = S.discordAccount.label;   pDA.querySelector('.p-link-sub').textContent = S.discordAccount.sub;   pDA.href = S.discordAccount.href; }
  if(pDP){ pDP.querySelector('.p-link-name').textContent = S.discordPortfolio.label; pDP.querySelector('.p-link-sub').textContent = S.discordPortfolio.sub; pDP.href = S.discordPortfolio.href; }
  if(pRB){ pRB.querySelector('.p-link-name').textContent = S.roblox.label;           pRB.querySelector('.p-link-sub').textContent = S.roblox.sub;           pRB.href = S.roblox.href; }
  setHref('[data-social-footer="discord-account"]',   S.discordAccount.href);
  setHref('[data-social-footer="discord-portfolio"]', S.discordPortfolio.href);
  setHref('[data-social-footer="roblox"]',            S.roblox.href);
  const yr = document.getElementById('yr');
  if(yr) yr.textContent = new Date().getFullYear();
  function setHref(sel, href){
    document.querySelectorAll(sel).forEach(el => { el.href = href; });
  }
})();}catch(e){}
function injectGlass(root){
  (root||document).querySelectorAll('.lq:not([data-gl])').forEach(el=>{
    el.setAttribute('data-gl','1');
    const s=document.createElement('div'); s.className='lq-surf'; el.appendChild(s);
    const ir=document.createElement('div'); ir.className='lq-iris'; el.appendChild(ir);
  });
}
injectGlass();
(function(){
  const NC = document.getElementById('neon-canvas');
  const NX = NC.getContext('2d');
  let W=0, H=0, mx=-9999, my=-9999;
  let activeEl=null, glowOpacity=0, glowTarget=0, looping=false;
  function resize(){ W=NC.width=window.innerWidth; H=NC.height=window.innerHeight; }
  resize();
  window.addEventListener('resize',resize,{passive:true});
  window.addEventListener('mousemove',function(e){
    mx=e.clientX; my=e.clientY;
    const ENTER=28, EXIT=62;
    const topEl=document.elementFromPoint(mx,my);
    const occluded=topEl&&topEl.closest('.pill,.panel,.trig,#enter');
    if(occluded){ activeEl=null; glowTarget=0; return; }
    function distToEl(el){
      const r=el.getBoundingClientRect();
      const nearX=Math.max(r.left,Math.min(mx,r.right));
      const nearY=Math.max(r.top,Math.min(my,r.bottom));
      return Math.hypot(mx-nearX,my-nearY);
    }
    let best=null;
    if(activeEl&&distToEl(activeEl)<EXIT){
      best=activeEl;
    } else {
      let bestDist=ENTER;
      document.querySelectorAll('[data-neon]').forEach(el=>{
        const d=distToEl(el);
        if(d<bestDist){ bestDist=d; best=el; }
      });
    }
    activeEl=best; glowTarget=best?1:0;
    if(!looping){ looping=true; requestAnimationFrame(loop); }
  },{passive:true});
  window.addEventListener('mouseleave',()=>{ activeEl=null; glowTarget=0; });
  function getBR(el,rect){
    const cs=getComputedStyle(el);
    const raw=cs.borderTopLeftRadius||cs.borderRadius||'0px';
    const v=parseFloat(raw)||0;
    return Math.min(v,rect.width/2,rect.height/2);
  }
  function rrPath(x,y,w,h,r){
    NX.beginPath();
    NX.moveTo(x+r,y);
    NX.arcTo(x+w,y,x+w,y+h,r);
    NX.arcTo(x+w,y+h,x,y+h,r);
    NX.arcTo(x,y+h,x,y,r);
    NX.arcTo(x,y,x+w,y,r);
    NX.closePath();
  }
  function conicGrad(cx,cy,mouseAngle,spreadFrac,colors){
    const g=NX.createConicGradient(mouseAngle-Math.PI,cx,cy);
    const lo=Math.max(0.001,0.5-spreadFrac);
    const hi=Math.min(0.999,0.5+spreadFrac);
    const loInner=0.5-spreadFrac*0.38;
    const hiInner=0.5+spreadFrac*0.38;
    g.addColorStop(0,'transparent');
    g.addColorStop(lo,'transparent');
    g.addColorStop(Math.max(lo,loInner),colors.edge);
    g.addColorStop(0.5,colors.peak);
    g.addColorStop(Math.min(hi,hiInner),colors.edge);
    g.addColorStop(hi,'transparent');
    g.addColorStop(1,'transparent');
    return g;
  }
  function loop(){
    NX.clearRect(0,0,W,H);
    glowOpacity+=(glowTarget-glowOpacity)*0.12;
    if(glowOpacity<0.006&&glowTarget===0){ looping=false; return; }
    if(activeEl&&glowOpacity>0.01){
      const r=activeEl.getBoundingClientRect();
      const br=getBR(activeEl,r);
      const cx=r.left+r.width/2;
      const cy=r.top+r.height/2;
      const mouseAngle=Math.atan2(my-cy,mx-cx);
      const elSize=Math.min(r.width,r.height);
      const scale=Math.max(0.3,Math.min(1.0,elSize/180));
      const op=glowOpacity;
      const sf=0.88/(Math.PI*2);
      NX.save();
      NX.lineCap='round'; NX.lineJoin='round';
      function pass(pad){
        rrPath(r.left-pad,r.top-pad,r.width+pad*2,r.height+pad*2,br+pad);
      }
      const lw1=14*scale;
      NX.strokeStyle=conicGrad(cx,cy,mouseAngle,sf,{peak:`rgba(180,210,255,${(op*0.18).toFixed(3)})`,edge:`rgba(20,55,200,${(op*0.08).toFixed(3)})`});
      NX.lineWidth=lw1; NX.filter=`blur(${7*scale}px)`; pass(lw1*0.5); NX.stroke();
      const lw2=4*scale;
      NX.strokeStyle=conicGrad(cx,cy,mouseAngle,sf,{peak:`rgba(210,230,255,${(op*0.44).toFixed(3)})`,edge:`rgba(35,80,255,${(op*0.28).toFixed(3)})`});
      NX.lineWidth=lw2; NX.filter=`blur(${1.8*scale}px)`; pass(lw2*0.5); NX.stroke();
      NX.strokeStyle=conicGrad(cx,cy,mouseAngle,sf,{peak:`rgba(255,255,255,${(op*0.85).toFixed(3)})`,edge:`rgba(60,100,255,${(op*0.62).toFixed(3)})`});
      NX.lineWidth=1.5; NX.filter='none'; pass(0.75); NX.stroke();
      NX.restore();
    }
    requestAnimationFrame(loop);
  }
})();
function go(){
  document.getElementById('enter').classList.add('out');
  document.body.classList.remove('noscroll');
  document.body.classList.add('loaded');
  initGSAP();
  initScrollSpy();
  if (typeof window.mpStartPlay === 'function') window.mpStartPlay();
}
function initScrollSpy(){
  const navLinks=document.querySelectorAll('.pill-a[data-section]');
  const sections=['currently','work','contact'].map(id=>document.getElementById(id)).filter(Boolean);
  const io=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      const link=document.querySelector(`.pill-a[data-section="${entry.target.id}"]`);
      if(!link) return;
      if(entry.isIntersecting){ navLinks.forEach(l=>l.classList.remove('active')); link.classList.add('active'); }
    });
  },{threshold:0.25});
  sections.forEach(s=>io.observe(s));
  const heroObs=new IntersectionObserver(entries=>{
    if(entries[0].isIntersecting) navLinks.forEach(l=>l.classList.remove('active'));
  },{threshold:0.4});
  const hero=document.querySelector('.hero');
  if(hero) heroObs.observe(hero);
}
function buildMQ(id){
  const t=document.getElementById(id);
  if(!t) return;
  const L=FIZZ_DATA.marquee;
  let h='';
  for(let i=0;i<10;i++) h+=`<div class="mq-item lq-lite"><span>${L[i%L.length]}</span></div>`;
  t.innerHTML=h+h;
}
try{ buildMQ('mq1'); }catch(e){}
try{ buildMQ('mq2'); }catch(e){}
function initGSAP(){
  gsap.registerPlugin(ScrollTrigger);
  gsap.utils.toArray('.gs-reveal').forEach((el,i)=>{
    gsap.fromTo(el,{y:20,opacity:0},{y:0,opacity:1,duration:.85,delay:.06+i*.10,ease:'power3.out'});
  });
  gsap.utils.toArray('.gs-fade-up').forEach(el=>{
    gsap.fromTo(el,{y:24,opacity:0},{y:0,opacity:1,duration:1,ease:'power3.out',
      scrollTrigger:{trigger:el,start:'top 88%',toggleActions:'play none none reverse'}});
  });
  gsap.utils.toArray('.gs-bento').forEach((el,i)=>{
    gsap.fromTo(el,{y:32,opacity:0},{y:0,opacity:1,duration:.78,delay:i*.055,ease:'power3.out',
      scrollTrigger:{trigger:el,start:'top 90%'}});
  });
  gsap.utils.toArray('.gs-fade').forEach(el=>{
    gsap.fromTo(el,{opacity:0},{opacity:1,duration:.85,scrollTrigger:{trigger:el,start:'top 92%'}});
  });
}
function togglePanel(){
  po=!po;
  document.getElementById('panel').classList.toggle('open',po);
  document.getElementById('trig').classList.toggle('active',po);
  if(po) injectGlass(document.getElementById('panel'));
}
function switchTab(btn,id){
  if(btn.classList.contains('on')) return;
  btn.classList.remove('flash'); void btn.offsetWidth; btn.classList.add('flash');
  document.querySelectorAll('.p-tab').forEach(t=>t.classList.remove('on'));
  document.querySelectorAll('.p-view').forEach(v=>v.classList.remove('on'));
  setTimeout(()=>{
    btn.classList.add('on'); btn.classList.remove('flash');
    const v=document.getElementById('tab-'+id); if(v) v.classList.add('on');
  },150);
}
let BORN = 0;
try{ BORN = FIZZ_DATA.stats.bornDate; }catch(e){}
function uptime(){
  const el=document.getElementById('su'); if(!el) return;
  const ms=Date.now()-BORN, d=Math.floor(ms/86400000), h=Math.floor((ms%86400000)/3600000);
  el.textContent=d>=1?d+'d '+String(h).padStart(2,'0')+'h':String(h).padStart(2,'0')+'h';
}
uptime(); setInterval(uptime,1000);
(async function(){
  const svEl = document.getElementById('sv');
  if(!svEl) return;
  const NS  = 'fizzdev';   // ← change to your username/domain
  const KEY = 'visitors';
  try{
    const res  = await fetch('https://api.counterapi.dev/v1/'+NS+'/'+KEY+'/up');
    const data = await res.json();
    if(data.count != null){
      const target = data.count;
      let cur = Math.max(0, target - 40);
      const step = () => {
        cur = Math.min(cur + Math.ceil((target - cur) / 6 + 1), target);
        svEl.textContent = cur.toLocaleString();
        if(cur < target) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }
  } catch(e) {
    const v = parseInt(localStorage.getItem('fizz_visits')||'0', 10) + 1;
    localStorage.setItem('fizz_visits', v);
    svEl.textContent = v.toLocaleString();
  }
})();
const PH=[
  (typeof FIZZ_DATA!=='undefined'&&FIZZ_DATA.meta?.name)    || 'FIZZ',
  (typeof FIZZ_DATA!=='undefined'&&FIZZ_DATA.meta?.subtitle) || 'Game Designer'
];
let pi=0,ci=0,dir=1;
function tick(){
  const p=PH[pi];
  if(dir===1){
    ci=Math.min(ci+1,p.length);
    document.title=p.slice(0,ci)+(ci<p.length?'|':'');
    if(ci>=p.length){ dir=-1; setTimeout(tick,2600); } else setTimeout(tick,90);
  } else {
    ci=Math.max(ci-1,0);
    document.title=p.slice(0,ci)+(ci>0?'|':'');
    if(ci<=0){ pi=(pi+1)%PH.length; dir=1; setTimeout(tick,360); } else setTimeout(tick,48);
  }
}
setTimeout(tick,2200);
(function () {
  var MC     = (typeof FIZZ_DATA !== 'undefined' && FIZZ_DATA.music) || {};
  var FOLDER = MC.folder    || 'music/';
  var MAX    = MC.maxTracks || 50;
  var AX     = MC.audioExts || ['mp3', 'ogg', 'wav'];
  var CX     = MC.coverExts || ['jpg', 'jpeg', 'png', 'webp'];
  var TITLES = MC.titles    || {};
  var queue     = [];
  var curIdx    = 0;
  var isPlaying = false;
  var audioCtx  = null;
  var analyser  = null;
  var srcNode   = null;
  var audioReady = false;
  var rafId      = null;
  var audio  = document.getElementById('mp-audio');
  var vis    = document.getElementById('mp-vis');
  var visCtx = vis ? vis.getContext('2d') : null;
  if (!audio) return; // nothing to attach to
  function initWebAudio() {
    if (audioReady) return;
    try {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      analyser = audioCtx.createAnalyser();
      analyser.fftSize = 256;
      analyser.smoothingTimeConstant = 0.8;
      srcNode  = audioCtx.createMediaElementSource(audio);
      srcNode.connect(analyser);
      analyser.connect(audioCtx.destination);
      audioReady = true;
    } catch (e) {
      console.warn('[player] AudioContext failed:', e);
    }
  }
  function startPlay() {
    initWebAudio();
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume().catch(function() {});
    }
    var p = audio.play();
    if (p && typeof p.then === 'function') {
      p.then(function () {
        if (audioReady && !rafId) drawVis();
      }).catch(function (e) {
        console.warn('[player] play() blocked:', e && e.name);
      });
    } else {
      if (audioReady && !rafId) drawVis();
    }
  }
  function loadTrack(idx, autoplay) {
    if (!queue.length) return;
    curIdx = ((idx % queue.length) + queue.length) % queue.length;
    var t  = queue[curIdx];
    audio.src = t.src;
    if (!audioReady) audio.load();
    var volEl = document.getElementById('mp-vol');
    audio.volume = volEl ? (volEl.value / 100) : 0.3;
    var img = document.getElementById('mp-cover-img');
    var ph  = document.getElementById('mp-cover-ph');
    var bg  = document.getElementById('mp-cover-bg');
    if (img && ph) {
      if (t.cover) {
        img.src = t.cover;
        img.style.display = 'block';
        ph.style.display  = 'none';
        if (bg) bg.style.backgroundImage = "url('" + t.cover + "')";
      } else {
        img.style.display = 'none';
        ph.style.display  = 'flex';
        if (bg) bg.style.backgroundImage = '';
      }
    }
    var miniCover = document.getElementById('np-mini-cover');
    if (miniCover) {
      miniCover.innerHTML = t.cover
        ? '<img src="' + t.cover + '" style="width:100%;height:100%;object-fit:cover;border-radius:10px">'
        : '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" opacity=".35"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/></svg>';
    }
    var n  = queue.length;
    var el = function (id) { return document.getElementById(id); };
    if (el('mp-title'))      el('mp-title').textContent      = t.title;
    if (el('mp-artist'))     el('mp-artist').textContent     = t.artist || '';
    if (el('mp-idx'))        el('mp-idx').textContent        = (curIdx + 1) + ' / ' + n;
    if (el('np-mini-title')) el('np-mini-title').textContent = t.title;
    if (el('np-mini-sub'))   el('np-mini-sub').textContent   = t.artist || ('Track ' + t.n + ' of ' + n);

    renderQueue();
    if (autoplay) startPlay();
  }
  function mpTogglePlay() {
    if (!queue.length) return;
    if (audio.paused) {
      startPlay();
    } else {
      audio.pause();
    }
  }
  function mpPrev() { loadTrack(curIdx - 1, true); }
  function mpNext() { loadTrack(curIdx + 1, true); }

  window.mpTogglePlay = mpTogglePlay;
  window.mpPrev       = mpPrev;
  window.mpNext       = mpNext;
  window.mpStartPlay  = startPlay;
  window.loadTrack    = function (idx, p) { loadTrack(idx, !!p); };
  audio.addEventListener('play',         function () { isPlaying = true;  syncUI(); });
  audio.addEventListener('pause',        function () { isPlaying = false; syncUI(); });
  audio.addEventListener('ended',        function () { mpNext(); });
  audio.addEventListener('timeupdate',   updateProgress);
  audio.addEventListener('loadedmetadata', function () {
    var durEl = document.getElementById('mp-dur');
    if (durEl) durEl.textContent = fmt(audio.duration);
  });
  function syncUI() {
    var playPath  = '<path d="M8 5v14l11-7z"/>';
    var pausePath = '<rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/>';
    var iconPath  = isPlaying ? pausePath : playPath;
    ['mp-play-icon', 'np-mini-icon'].forEach(function (id) {
      var el = document.getElementById(id);
      if (el) el.innerHTML = iconPath;
    });
    var dot = document.getElementById('np-dot');
    if (dot) dot.style.animation = isPlaying ? 'pulse 2s infinite' : 'none';
    var trig = document.getElementById('trig');
    if (trig) trig.classList.toggle('playing', isPlaying);
    renderQueue();
  }
  function updateProgress() {
    if (!audio.duration) return;
    var pct  = (audio.currentTime / audio.duration) * 100;
    var fill = document.getElementById('mp-prog-fill');
    var mini = document.getElementById('np-mini-fill');
    var seek = document.getElementById('mp-seek');
    if (fill) fill.style.width = pct + '%';
    if (mini) mini.style.width = pct + '%';
    if (seek) seek.value = pct;
    var curEl = document.getElementById('mp-cur');
    var durEl = document.getElementById('mp-dur');
    if (curEl) curEl.textContent = fmt(audio.currentTime);
    if (durEl) durEl.textContent = fmt(audio.duration);
  }
  function fmt(s) {
    if (!s || isNaN(s)) return '0:00';
    var m   = Math.floor(s / 60);
    var sec = Math.floor(s % 60);
    return m + ':' + (sec < 10 ? '0' : '') + sec;
  }
  var seekEl = document.getElementById('mp-seek');
  if (seekEl) {
    seekEl.addEventListener('input', function () {
      if (audio.duration) audio.currentTime = (this.value / 100) * audio.duration;
    });
  }
  var volEl2 = document.getElementById('mp-vol');
  if (volEl2) {
    volEl2.addEventListener('input', function () {
      audio.volume = this.value / 100;
    });
  }
  function renderQueue() {
    var el = document.getElementById('mp-queue');
    if (!el) return;
    el.innerHTML = queue.map(function (t, i) {
      var active = (i === curIdx) ? 'active' : '';
      var cover  = t.cover ? '<img src="' + t.cover + '" alt="">' : String(i + 1);
      var bars   = (active && isPlaying)
        ? ['.4s', '.6s', '.5s'].map(function (d) {
            return '<div class="mp-q-bar" style="--d:' + d + '"></div>';
          }).join('')
        : '';
      return '<div class="mp-q-item ' + active + '" onclick="loadTrack(' + i + ',true)">'
        + '<div class="mp-q-thumb">' + cover + '</div>'
        + '<div class="mp-q-info">'
        + '<div class="mp-q-name">' + t.title + '</div>'
        + '<div class="mp-q-num">'  + (t.artist || 'Track ' + t.n) + '</div>'
        + '</div>'
        + (bars ? '<div class="mp-q-bars">' + bars + '</div>' : '')
        + '</div>';
    }).join('');
  }
  function drawVis() {
    if (!analyser || !vis || !visCtx) { rafId = null; return; }
    var dpr = window.devicePixelRatio || 1;
    var W   = vis.offsetWidth  * dpr;
    var H   = vis.offsetHeight * dpr;
    if (vis.width !== W || vis.height !== H) { vis.width = W; vis.height = H; }
    var data = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteFrequencyData(data);
    visCtx.clearRect(0, 0, W, H);
    var bars = Math.min(60, data.length);
    var gap  = Math.max(1, Math.ceil(W * 0.008));
    var barW = (W - gap * (bars - 1)) / bars;
    var maxH = H * 0.88;
    for (var i = 0; i < bars; i++) {
      var val  = data[Math.floor(i * data.length / bars)] / 255;
      var h    = Math.max(2 * dpr, val * maxH);
      var x    = i * (barW + gap);
      var y    = H - h;
      var grad = visCtx.createLinearGradient(0, y, 0, H);
      grad.addColorStop(0, 'rgba(77,110,255,' + (0.55 + val * 0.45).toFixed(2) + ')');
      grad.addColorStop(1, 'rgba(42,79,255,0.18)');
      visCtx.fillStyle = grad;
      var r = Math.min(barW / 2, 3 * dpr);
      visCtx.beginPath();
      if (typeof visCtx.roundRect === 'function') {
        visCtx.roundRect(x, y, barW, h, [r, r, 0, 0]);
      } else {
        visCtx.rect(x, y, barW, h);
      }
      visCtx.fill();
    }
    rafId = requestAnimationFrame(drawVis);
  }
  var enterEl = document.getElementById('enter');
  if (enterEl) {
    enterEl.addEventListener('click', function () {
      if (!isPlaying && queue.length) startPlay();
    });
  }
  function probeFile(candidates) {
    var i = 0;
    function next() {
      if (i >= candidates.length) return Promise.resolve(null);
      var url = candidates[i++];
      return fetch(url, { method: 'HEAD' })
        .then(function (r) { return r.ok ? url : next(); })
        .catch(function ()  { return next(); });
    }
    return next();
  }
  function probeTrack(n) {
    var srcs = AX.map(function (e) { return FOLDER + 'track' + n + '.' + e; });
    var cvrs = CX.map(function (e) { return FOLDER + 'cover' + n + '.' + e; });
    return Promise.all([probeFile(srcs), probeFile(cvrs)]).then(function (res) {
      var src   = res[0];
      var cover = res[1];
      if (!src) return null;
      return { src: src, cover: cover || null, title: TITLES[String(n)] || 'Track ' + n, artist: '', n: n };
    });
  }
  function buildQueue() {
    if (Array.isArray(MC.tracks) && MC.tracks.length) {
      queue = MC.tracks.map(function (t, i) {
        return {
          src:    t.src,
          cover:  t.cover   || null,
          title:  t.title   || TITLES[String(i + 1)] || 'Track ' + (i + 1),
          artist: t.artist  || '',
          n:      i + 1,
        };
      });
      return Promise.resolve();
    }
    var result = [];
    function probe(n) {
      if (n > MAX) return Promise.resolve();
      return probeTrack(n).then(function (t) {
        if (!t) return;
        result.push(t);
        return probe(n + 1);
      });
    }
    return probe(1).then(function () { queue = result; });
  }
  buildQueue().then(function () {
    if (queue.length) {
      loadTrack(0, false);
    } else {
      ['mp-title', 'np-mini-title'].forEach(function (id) {
        var e = document.getElementById(id);
        if (e) e.textContent = 'No tracks found';
      });
      var sub = document.getElementById('np-mini-sub');
      if (sub) sub.textContent = 'Add track1.mp3 to music/ folder';
    }
  });
}());
