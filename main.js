// ===== Navegación por secciones =====
(function(){
  function showSectionFromHash(){
    var id = (location.hash||'').replace('#','');
    var secs = Array.from(document.querySelectorAll('section'));
    secs.forEach(s => s.style.display = 'none');
    var t = id && document.getElementById(id) ? document.getElementById(id) : document.getElementById('inicio') || secs[0];
    if(t){ t.style.display = 'block'; }
    // estado activo del nav
    try{
      document.querySelectorAll('nav .nav-btn').forEach(n=>n.classList.remove('active'));
      var link = document.querySelector('nav .nav-btn[href="#'+(t&&t.id||'')+'"]');
      if(link) link.classList.add('active');
    }catch(e){}
  }

  document.addEventListener('DOMContentLoaded', function(){
    // Clicks del nav
    document.querySelectorAll('nav a[href^="#"]').forEach(a=>{
      a.addEventListener('click', function(e){
        e.preventDefault();
        var id = this.getAttribute('href');
        history.replaceState(null,'',id);
        showSectionFromHash();
        window.scrollTo(0,0);
      });
    });
    showSectionFromHash();
  });
  window.addEventListener('hashchange', showSectionFromHash);
})();

// ===== Slider auto (si existe) =====
(function(){
  document.addEventListener('DOMContentLoaded', function(){
    var slides = Array.from(document.querySelectorAll('.hero-slider .slide'));
    if(!slides.length) return;
    let i = slides.findIndex(s=>s.classList.contains('active'));
    if(i<0){ i=0; slides[0].classList.add('active'); }
    setInterval(function(){
      slides[i].classList.remove('active');
      i = (i+1)%slides.length;
      slides[i].classList.add('active');
    }, 4500);
  });
})();

// ===== Cookies =====
function aceptarCookies(){
  try{
    localStorage.setItem('cookiesAceptadas','true');
    var b=document.getElementById('cookie-banner'); if(b) b.style.display='none';
  }catch(e){}
}
document.addEventListener('DOMContentLoaded', function(){
  try{
    if(localStorage.getItem('cookiesAceptadas')==='true'){
      var b=document.getElementById('cookie-banner'); if(b) b.style.display='none';
    }
  }catch(e){}
});

// ===== Idioma (respetar setLang existente y traducir footer si hay data-i18n) =====
(function(){
  var footerDict = {
    es: {"footer.contact":"Contacto","footer.quick":"Enlaces rápidos","footer.follow":"Síguenos","footer.link.home":"Inicio","footer.link.about":"¿Quiénes somos?","footer.link.services":"Servicios","footer.link.contact":"Contacto"},
    en: {"footer.contact":"Contact","footer.quick":"Quick Links","footer.follow":"Follow us","footer.link.home":"Home","footer.link.about":"About Us","footer.link.services":"Services","footer.link.contact":"Contact"}
  };
  function applyFooterLang(lang){
    document.querySelectorAll('[data-i18n^="footer"]').forEach(function(el){
      var key = el.getAttribute('data-i18n'); var val=(footerDict[lang]||{})[key];
      if(val!=null) el.textContent = val;
    });
  }
  var prev = window.setLang;
  window.setLang = function(lang){
    try{ if(prev) prev(lang); }catch(e){}
    try{ document.documentElement.setAttribute('lang', lang); localStorage.setItem('lang',lang); }catch(e){}
    applyFooterLang(lang);
  };
  document.addEventListener('DOMContentLoaded', function(){
    var lang = localStorage.getItem('lang') || document.documentElement.getAttribute('lang') || 'es';
    applyFooterLang(lang);
    var es=document.getElementById('btn-es'), en=document.getElementById('btn-en');
    if(es) es.addEventListener('click', function(){ setLang('es'); });
    if(en) en.addEventListener('click', function(){ setLang('en'); });
  });
})();