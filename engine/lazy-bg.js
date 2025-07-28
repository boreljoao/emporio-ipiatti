document.addEventListener('DOMContentLoaded',function(){
  const lazyBgs=[...document.querySelectorAll('[data-bg]')];
  if('IntersectionObserver' in window){
    const obs=new IntersectionObserver(entries=>{
      entries.forEach(e=>{
        if(e.isIntersecting){
          const el=e.target;
          el.style.backgroundImage=`url('${el.dataset.bg}')`;
          el.removeAttribute('data-bg');
          obs.unobserve(el);
        }
      });
    });
    lazyBgs.forEach(el=>obs.observe(el));
  }else{
    lazyBgs.forEach(el=>{
      el.style.backgroundImage=`url('${el.dataset.bg}')`;
      el.removeAttribute('data-bg');
    });
  }
});
