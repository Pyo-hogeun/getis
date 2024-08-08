function lnbToggle(){
  const $toggleOpen = document.querySelector('.toggle-open');
  const $toggleClose = document.querySelector('.toggle-close');
  const $toggleLnb = document.querySelector('.toggle-lnb');
  const $contentWrap = document.querySelector('.content-wrap');

  // 조절 그리드 유무
  const $gridContainers = document.querySelectorAll('.grid-container');

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
function tab(target){
  const tabs = document.querySelectorAll(`${target} .tab`);
  const tabContents = document.querySelectorAll('.tab-content');
  tabs.forEach(function(e){ 
    let targetTab = false;
    e.addEventListener('click', function(e){
      e.preventDefault();
      if(e.target.dataset.tab){
        //target이 있을때만
        tabs.forEach(e => {
          e.classList.remove('on');
        })
        this.classList.add('on');
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
}
function lnbAccordion(){
  const lnbAccordions = document.querySelectorAll('.has-depth');
  lnbAccordions.forEach(function(acc){
    acc.addEventListener('click', function(e){
      e.preventDefault();
      let trg = this.dataset.target;
      let depth = this.dataset.depth;
      if(trg){
        let targets = document.querySelectorAll('tr[data-menu="'+trg+'"]');
        let targetsChild = document.querySelectorAll('[data-menu="'+trg+'"] ~ tr[data-]')
        targets.forEach(function(e){
          console.log('targets', e.style.display);

          e.style.display !== 'none'?e.style.display='none'
            :e.style.display = '';
        })
      }
      if(!this.classList.contains('open')){
        this.classList.add('open');
      } else {
        this.classList.remove('open');
      }
    })
  })
}
function windowResizer(target, handler, direction){
  const resizeHandler = document.querySelector(handler);
  const resizeTarget = document.querySelector(target);
  let defaultPositionInfo = {
    x : 0,
    y : 0,
    aTargetHeight : 0,
    aTargetWidth : 0,
    bTargetHeight : 0,
    bTargetWidth : 0
  }
  const handlerMouseDown = (e) => {
    defaultPositionInfo.x = e.clientX;
    defaultPositionInfo.y = e.clientY;
    console.log(defaultPositionInfo.x , defaultPositionInfo.y, resizeTarget.offsetHeight);
  }

  document.querySelector(handler).addEventListener('mousedown', handlerMouseDown);
}

// 화면 가로사이즈 조절
function gridColResize(){
  const handler = document.querySelector('button.handler');
  const gridContainers = document.querySelectorAll('.grid-container');
  
  let posX = 0;
  let gridWidthFirst = 0;
  let gridWidthSecond = 0;

  handler.addEventListener('mousedown', handlerMouseDown);
  function handlerMouseDown(e){
    posX = e.clientX;
    gridWidthFirst = gridContainers[0].clientWidth;
    gridWidthSecond = gridContainers[1].clientWidth;
    document.addEventListener('mousemove', handlerMouseMove);
    document.addEventListener('mouseup', handlerMouseUp);
  }
  function handlerMouseMove(e){
    let move = e.clientX - posX;

    console.log(gridWidthFirst);
    gridContainers[0].style.flexBasis = gridWidthFirst + move + 'px';
    gridContainers[1].style.flexBasis = gridWidthSecond - move + 'px';
  }
  function handlerMouseUp(){
    document.removeEventListener('mousemove', handlerMouseMove);
  }
}

document.addEventListener('DOMContentLoaded', function(){
  lnbToggle();
  tab('.gts-lnb');
  lnbAccordion();
})