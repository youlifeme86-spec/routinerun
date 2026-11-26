/* 루틴런 (초등): 공통 헤더·푸터·메뉴, 앱 화면 끼워 넣기 */
(function(){
  // 루틴런 웹앱(Apps Script) 주소. 배포 주소가 바뀌면 여기 한 줄만 고치면 돼요.
  var APP = 'https://script.google.com/macros/s/AKfycbyUcRIOlfVyFQpCcLOrJPPhfI8afQmcGbUa-PBCIjZUJDHFn47W6cYGCZ_JYgW4l6oX/exec';
  window.RR_APP = APP;

  var page = document.body.getAttribute('data-page') || 'home';
  var MENU = [
    ['home','index.html','홈'],
    ['race','race.html','레이스 보드'],
    ['student','student.html','학생 존'],
    ['parent','parent.html','학부모 리포트'],
    ['guide','guide.html','이용 안내']
  ];
  var mark = '<svg class="mark" viewBox="0 0 34 22" aria-hidden="true"><rect x="2" y="2" width="30" height="18" rx="9" fill="none" stroke="#2E9E6B" stroke-width="4"/><circle cx="26" cy="5" r="3.2" fill="#FF7A2F"/></svg>';
  var burger = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M4 6h16M4 12h16M4 18h16"/></svg>';

  var head = document.createElement('header');
  head.className = 'top';
  head.innerHTML = '<div class="wrap"><a class="logo" href="index.html">'+mark+'<span>루틴런 <small>초등 학습 루틴</small></span></a>'+
    '<nav class="menu" id="menu" aria-label="주 메뉴">'+MENU.map(function(m){return '<a href="'+m[1]+'"'+(m[0]===page?' aria-current="page"':'')+'>'+m[2]+'</a>'}).join('')+'</nav>'+
    '<button class="iconbtn" id="menuBtn" aria-label="메뉴 열기" aria-expanded="false" aria-controls="menu">'+burger+'</button></div>';
  document.body.insertBefore(head, document.body.firstChild);

  var foot = document.createElement('footer');
  foot.innerHTML = '<div class="wrap"><div><b style="color:var(--ink)">루틴런</b> · 매일 한 걸음, 공부 습관을 달리다<br>기획·제작 Gold_star · 문의 Gold_star 선생님</div>'+
    '<nav aria-label="바로 가기"><a href="race.html">레이스 보드</a><a href="student.html">학생 존</a><a href="parent.html">학부모 리포트</a><a href="guide.html">이용 안내</a><a href="admin.html">선생님 전용</a></nav>'+
    '<div class="tiny" style="flex-basis:100%">아이 개인 링크와 학생 코드는 이 사이트에 없어요. 선생님께 직접 받아 주시고, 다른 사람에게 보내지 마세요.</div></div>';
  document.body.appendChild(foot);

  var btn = document.getElementById('menuBtn'), menu = document.getElementById('menu');
  btn.onclick = function(){ var o = menu.classList.toggle('open'); btn.setAttribute('aria-expanded', o); };
  menu.addEventListener('click', function(e){ if(e.target.tagName==='A'){ menu.classList.remove('open'); btn.setAttribute('aria-expanded', false); } });

  // 앱 화면 끼워 넣기: <iframe class="appframe" data-view="board|students|parent|admin">
  var bar = document.querySelector('.appbar');
  function fit(){ if(bar) document.documentElement.style.setProperty('--bar', bar.offsetHeight + 'px'); }
  fit(); window.addEventListener('resize', fit);
  Array.prototype.forEach.call(document.querySelectorAll('[data-view]'), function(el){
    var url = APP + '?page=' + el.getAttribute('data-view');
    if (el.tagName === 'IFRAME') {
      el.src = url;
      var ld = el.previousElementSibling;
      el.addEventListener('load', function(){ if (ld && ld.classList.contains('loading')) ld.remove(); });
    } else el.href = url;
  });
})();
