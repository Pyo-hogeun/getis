function lnbToggle(){
  const $toggleOpen = document.querySelector('.toggle-open');
  const $toggleClose = document.querySelector('.toggle-close');
  const $toggleLnb = document.querySelector('.toggle-lnb');
  const $contentWrap = document.querySelector('.content-wrap');
  // lnb 열기
  $toggleOpen?.addEventListener('click', function(e){
    e.preventDefault();
    console.log('$contentWrap', $contentWrap.classList);
    $contentWrap.classList.remove('fold-lnb');
  })
  // lnb 접기
  $toggleClose?.addEventListener('click', function(e){
    e.preventDefault();
    $contentWrap.classList.add('fold-lnb');
  })
  // lnb 토글
  $toggleLnb.addEventListener('click', function(e){
    e.preventDefault();
    console.log($contentWrap.classList.contains('fold-lnb'));
    if(!$contentWrap.classList.contains('fold-lnb')){
      $contentWrap.classList.add('fold-lnb');
    } else {
      $contentWrap.classList.remove('fold-lnb');
    }
  })
}
function tab(){
  const tabs = document.querySelectorAll('.tab');
  const tabContents = document.querySelectorAll('.tab-content');
  if(tabs.length > 0){
    tabs.forEach(function(e){ 
      e.addEventListener('click', function(e){
        e.preventDefault();
        let targetTab = false;
        if(!!e.target.dataset.tab){
          //target이 있을때만
          targetTab = document.querySelector(`.${e.target.dataset.tab}`);
          tabContents.forEach(e => {
            e.classList.remove('on');
          });
          if(!targetTab.classList.contains('on')){
            targetTab.classList.add('on')
          }
        }
      })
    })
  } else {
    console.log('no tab');
  }
}


document.addEventListener('DOMContentLoaded', function(){
  lnbToggle();
  tab();
})