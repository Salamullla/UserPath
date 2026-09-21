(() => {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const fine = matchMedia('(hover: hover) and (pointer: fine)');
  const ease = 'cubic-bezier(.22,1,.36,1)';
  const running = new Set();
  function animate(node, frames, options = {}) {
    if (!node || reduced.matches || !node.animate) return null;
    const a = node.animate(frames, {duration:700,easing:ease,...options});
    running.add(a);
    a.finished.catch(()=>{}).finally(()=>running.delete(a));
    return a;
  }
  const scene = document.createElement('div');
  scene.className='path-scene';
  scene.setAttribute('aria-hidden','true');
  scene.innerHTML='<svg viewBox="0 0 400 260" preserveAspectRatio="none"><path class="path-base" d="M16 220 V30 H360 V226 H90 V100 H290"/><path class="path-active" pathLength="1" d="M16 220 V30 H360 V226 H90 V100 H290"/><circle class="scene-dot" cx="290" cy="100" r="6"/></svg><div class="scene-ui"><i></i><i></i><i></i><i></i><i></i></div>';
  document.querySelector('.orange').prepend(scene);
  animate(scene.querySelector('.path-active'),[{strokeDashoffset:1},{strokeDashoffset:0}],{duration:1600});
  if(!reduced.matches){
    const path=scene.querySelector('.path-active'),dot=scene.querySelector('.scene-dot');
    const length=path.getTotalLength(),start=performance.now();
    function trace(now){
      const t=reduced.matches?1:Math.min(1,(now-start)/1600);
      const p=path.getPointAtLength(length*(1-Math.pow(1-t,3)));
      dot.setAttribute('cx',p.x);dot.setAttribute('cy',p.y);
      if(t<1)requestAnimationFrame(trace);
    }
    requestAnimationFrame(trace);
  }
  scene.querySelectorAll('.scene-ui i').forEach((el,i)=>animate(el,[{opacity:0,transform:'translate('+(i%2?-40:40)+'px,'+(i*12)+'px) rotate('+(i%2?-10:10)+'deg)'},{opacity:1,transform:'none'}],{delay:200+i*100,duration:1100,fill:'backwards'}));
  document.querySelectorAll('.hero h1>span,.hero .lead,.hero .actions').forEach((el,i)=>animate(el,[{opacity:0,transform:'translateY(28px)',clipPath:'inset(0 0 100% 0)'},{opacity:1,transform:'translateY(0)',clipPath:'inset(0 0 0% 0)'}],{delay:i*110,fill:'backwards',duration:900}));
  const visual=document.querySelector('.visual');
  visual.addEventListener('pointermove',e=>{
    if(reduced.matches || !fine.matches)return;
    const r=visual.getBoundingClientRect();
    scene.style.setProperty('--pointer-x',((e.clientX-r.left)/r.width-.5)*16+'px');
    scene.style.setProperty('--pointer-y',((e.clientY-r.top)/r.height-.5)*12+'px');
  });
  visual.addEventListener('pointerleave',()=>{scene.style.setProperty('--pointer-x','0px');scene.style.setProperty('--pointer-y','0px')});

  const tablist=document.querySelector('.offering-tabs');
  const indicator=document.createElement('span');
  indicator.className='tab-indicator';indicator.setAttribute('aria-hidden','true');tablist.prepend(indicator);
  function positionIndicator(motion=true){
    const tab=tablist.querySelector('[aria-selected="true"]');
    const a=tab.getBoundingClientRect(),b=tablist.getBoundingClientRect();
    const old=indicator.style.transform || 'translateX(0px)';
    const next='translateX('+(a.left-b.left)+'px)';
    indicator.style.cssText='left:0;top:'+(a.top-b.top)+'px;width:'+a.width+'px;height:'+a.height+'px;transform:'+next;
    if(motion)animate(indicator,[{transform:old},{transform:next}],{duration:450});
  }
  const seen=new WeakSet();
  const observer='IntersectionObserver' in window ? new IntersectionObserver(entries=>{
    entries.forEach(({target,isIntersecting})=>{
      if(!isIntersecting)return;
      observer.unobserve(target);
      animate(target,[{opacity:0,transform:'translateY(24px)'},{opacity:1,transform:'translateY(0)'}],{duration:750});
      if(target.classList.contains('card'))target.classList.add('demo-active');
    });
  },{threshold:.15}):null;
  function prepare(){
    document.querySelectorAll('.card').forEach((card,index)=>{
      if(card.querySelector('.service-demo'))return;
      card.tabIndex=0;
      const demo=document.createElement('div');demo.className='service-demo '+['ui','writing','system','dga'][index];demo.setAttribute('aria-hidden','true');
      if(index===1)demo.innerHTML='<div class="demo-writing"><i></i><i></i><i></i></div>';
      else if(index===2)demo.innerHTML='<div class="demo-system">'+Array.from({length:8},(_,i)=>'<i style="--dx:'+((i%3-1)*18)+'px;--dy:'+((i%2?1:-1)*10)+'px;--dr:'+((i%2?1:-1)*12)+'deg"></i>').join('')+'</div>';
      else demo.innerHTML='<div class="demo-ui"><i></i><i></i><i></i><i></i></div>';
      card.append(demo);
      card.addEventListener('pointerleave',()=>card.classList.remove('demo-active'));
      card.addEventListener('blur',()=>card.classList.remove('demo-active'));
      card.addEventListener('pointerdown',()=>card.classList.toggle('demo-active'));
    });
    document.querySelectorAll('.head,.academy-intro>*,.programme,.card,.value,.contact-grid>div,.form').forEach(node=>{
      if(node.closest('[hidden]')||seen.has(node))return;
      seen.add(node);observer?.observe(node);
    });
  }
  let heightAnimation=null;
  document.addEventListener('offerings-before',()=>{heightAnimation?.cancel()});
  document.addEventListener('offerings-change',e=>{
    positionIndicator();
    const d=e.detail;
    if(d?.changed){
      const panel=d.nextPanel;
      const end=panel.offsetHeight;
      heightAnimation=animate(panel,[{height:d.previousHeight+'px',overflow:'clip'},{height:end+'px',overflow:'clip'}],{duration:500});
      animate(panel.firstElementChild,[{opacity:0,transform:'translateY(16px)'},{opacity:1,transform:'translateY(0)'}],{duration:550});
    }
    prepare();updateJourney();
  });
  let scheduled=false;
  function updateJourney(){
    scheduled=false;
    const training=document.getElementById('training');
    if(training.hidden)return;
    const programmes=document.getElementById('programmes').getBoundingClientRect();
    const progress=reduced.matches?1:Math.max(0,Math.min(1,(innerHeight*.75-programmes.top)/Math.max(1,programmes.height*.75)));
    const journey=document.getElementById('journeyList');
    journey.style.setProperty('--journey-progress',progress);
    journey.querySelectorAll('.journey-step').forEach((el,i,all)=>el.classList.toggle('is-reached',progress>=i/(all.length-1)));
  }
  window.addEventListener('scroll',()=>{if(!scheduled){scheduled=true;requestAnimationFrame(updateJourney)}},{passive:true});
  window.addEventListener('resize',()=>{positionIndicator(false);updateJourney()});
  document.getElementById('lang').addEventListener('click',()=>{
    heightAnimation?.cancel();prepare();positionIndicator(false);updateJourney();
  });
  reduced.addEventListener('change',()=>{
    if(reduced.matches){running.forEach(a=>a.cancel());scene.style.setProperty('--pointer-x','0px');scene.style.setProperty('--pointer-y','0px')}
    updateJourney();
  });
  prepare();positionIndicator(false);updateJourney();
})();
