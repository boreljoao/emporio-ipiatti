function menuShow() {
  let menuMobile = document.querySelector('.mobile-menu');
  if (menuMobile.classList.contains('open')) {
      menuMobile.classList.remove('open');
      document.querySelector('.icon').src = "/menu_white_36dp.svg";
  } else {
      menuMobile.classList.add('open');
      document.querySelector('.icon').src = "/close_white_36dp.svg";
  }
}


window.sr = ScrollReveal({reset: true});

sr.reveal('.article_content', {
  rotate:{x:0, y:60, z:0},
  duration: 3000
})