function lnbToggle() {
  const $toggleOpen = document.querySelector('.toggle-open');
  const $toggleClose = document.querySelector('.toggle-close');
  const $toggleLnb = document.querySelector('.toggle-lnb');
  const $contentWrap = document.querySelector('.content-wrap');
  const $lnbHeader = document.querySelector('.gts-lnb .tab-container .header');

  // 조절 그리드 유무
  const $gridContainers = document.querySelectorAll('.grid-container');

  // lnb 열기
  $toggleOpen?.addEventListener('click', function (e) {
    e.preventDefault();
    $contentWrap.classList.remove('fold-lnb');
  })
  // lnb 접기
  $toggleClose?.addEventListener('click', function (e) {
    e.preventDefault();
    $contentWrap.classList.add('fold-lnb');
    

  })
  // lnb 토글
  $toggleLnb?.addEventListener('click', function (e) {
    e.preventDefault();

    if (!$contentWrap.classList.contains('fold-lnb')) {
      $contentWrap.classList.add('fold-lnb');
      $lnbHeader.classList.add('ani');
    } else {
      $contentWrap.classList.remove('fold-lnb');
      $lnbHeader.classList.remove('ani');
    }
  })
}
function tab(target) {
  const tabs = document.querySelectorAll(`${target} .tab`);
  const tabContents = document.querySelectorAll('.tab-content');
  tabs.forEach(function (e) {
    let targetTab = false;
    e.addEventListener('click', function (e) {
      e.preventDefault();
      if (this.dataset.tab) {
        //target이 있을때만
        tabs.forEach(e => {
          e.classList.remove('on');
        })
        this.classList.add('on');
        targetTab = document.querySelector(`.${this.dataset.tab}`);
        tabContents.forEach(e => {
          e.classList.remove('on');
        });
        if (!targetTab.classList.contains('on')) {
          targetTab.classList.add('on')
        }
      }
    })
  })
}
function lnbAccordion() {
  const lnbAccordions = document.querySelectorAll('.has-depth');
  lnbAccordions.forEach(function (acc) {
    acc.addEventListener('click', function (e) {
      e.preventDefault();
      let trg = this.dataset.target;
      let depth = this.dataset.depth;
      if (trg) {
        let targets = document.querySelectorAll('tr[data-menu="' + trg + '"]');
        let targetsChild = document.querySelectorAll('[data-menu="' + trg + '"] ~ tr[data-]')
        targets.forEach(function (e) {

          e.style.display !== 'none' ? e.style.display = 'none'
            : e.style.display = '';
        })
      }
      if (!this.classList.contains('open')) {
        this.classList.add('open');
      } else {
        this.classList.remove('open');
      }
    })
  })
}
function windowResizer(target, handler, direction) {
  const resizeHandler = document.querySelector(handler);
  const resizeTarget = document.querySelector(target);
  let defaultPositionInfo = {
    x: 0,
    y: 0,
    aTargetHeight: 0,
    aTargetWidth: 0,
    bTargetHeight: 0,
    bTargetWidth: 0
  }
  const handlerMouseDown = (e) => {
    defaultPositionInfo.x = e.clientX;
    defaultPositionInfo.y = e.clientY;
  }

  document.querySelector(handler).addEventListener('mousedown', handlerMouseDown);
}
// 화면 가로사이즈 조절
function gridColResize() {
  const handler = document.querySelector('button.handler');
  const gridContainers = document.querySelectorAll('.grid-container');

  let posX = 0;
  let gridWidthFirst = 0;
  let gridWidthSecond = 0;

  handler.addEventListener('mousedown', handlerMouseDown);
  function handlerMouseDown(e) {
    posX = e.clientX;
    gridWidthFirst = gridContainers[0].clientWidth;
    gridWidthSecond = gridContainers[1].clientWidth;
    document.addEventListener('mousemove', handlerMouseMove);
    document.addEventListener('mouseup', handlerMouseUp);
  }
  function handlerMouseMove(e) {
    let move = e.clientX - posX;

    gridContainers[0].style.flexBasis = gridWidthFirst + move + 'px';
    gridContainers[1].style.flexBasis = gridWidthSecond - move + 'px';
  }
  function handlerMouseUp() {
    document.removeEventListener('mousemove', handlerMouseMove);
  }
}
function editFavorite(e) {
}
// 콤보박스
function combo() {
  let combos = document.querySelectorAll('.combo');
  combos?.forEach(function (combo) {
    combo.addEventListener('click', function (e) {
      if (this.classList.contains('focus')) {
        this.classList.remove('focus');
      } else {
        this.classList.add('focus');
      }
    });
    let options = document.querySelectorAll('.options > li');
    options?.forEach(function (e) {
      e.addEventListener('click', function (option) {
        let comboWrap = option.target.closest('.combo');
        let selectedValue = option.target.innerHTML;
        comboWrap.querySelector('.label').innerHTML = selectedValue;
      });
    })
  });
}
// gnb
function gnbSubmenu(){
  const gnbMenu = document.querySelectorAll('.gts-gnb .menu-list > ul > li');
  const gnbSubMenu = document.querySelectorAll('.gts-gnb .menu-list > ul > li .sub-menu');
  gnbMenu.forEach(function(e){
    e.addEventListener('mouseenter', function(menu){
      let submenu = menu.target.querySelector('.sub-menu');
      let siblings = menu.target.closest('ul').querySelectorAll('li');
      siblings.forEach(function(siblings){
        siblings.querySelector('.sub-menu')? siblings.querySelector('.sub-menu').style.display = 'none':false;
      })
      if (submenu) submenu.style.display = 'block';
    });
  });
  gnbSubMenu.forEach(function(e){
    e.addEventListener('mouseleave', function(menu){
      menu.target.style.display = 'none';
    });

  })
}

// tab navigator
function tabNav(){
  
  const tabNav = document.querySelector('#tabNav');
  const scrollWrap = document.querySelector('.editable-tab .scroll-wrap');
  const prev = tabNav?.querySelector('.prev');
  const next = tabNav?.querySelector('.next');
  const tabWrap = document.querySelector('.open-contents-status-bar .editable-tab');
  const tab = tabWrap?.querySelector('.tab');
  const setContainerWidth = 1300;
  if( scrollWrap?.scrollWidth > setContainerWidth ){
    tabNav?tabNav.style.display = 'inline-flex':false;
  } else {
    tabNav?tabNav.style.display = 'none':false;
  }
  let posX = 0;
  let scroll = scrollWrap?.scrollWidth;
  prev?.addEventListener('click', function(e){
    let step = tab.offsetWidth * 5;
    if( 0 < posX ){
      posX -= step;
      tabWrap.scrollLeft = posX;
      next.disabled = false;
      if (0 >= posX){
        this.disabled = true
      }
    }
  });
  next?.addEventListener('click', function(e){
    let step = tab.offsetWidth * 5;
    if( scroll - setContainerWidth > posX ){
      posX += step;
      tabWrap.scrollLeft = posX;
      prev.disabled = false;
      if( posX >  scroll - setContainerWidth) {
        this.disabled = true;
      }  
    }
  });


}
// 공통 색상
const colorSet = ['#34d2d8', '#9a8af8', '#92d159', '#939b9b', '#eac012'];

// 리스트 상하 높이 조절 기능
function toggleListLayout(){
  const toggleFoldList = document.querySelector('.grid-size-toggle .btn-toggle-up');
  const toggleSpreadList = document.querySelector('.grid-size-toggle .btn-toggle-down');
  const list = document.querySelector('.resizable-list');
  const infoArea = document.querySelector('.resizable-infoarea');
  let currentStep = 1;
  const gap = '200px';
  let step = {
    0:{
      list : `calc(70vh - ${gap})`,
      infoArea : `0`
    },
    1:{
      list : `calc(50vh - ${gap})`,
      infoArea : `calc(50vh - ${gap})`
    },
    2:{
      list : `35px`,
      infoArea : `calc(70vh - ${gap})`
    }
  };

  toggleFoldList?.addEventListener('click', function(e){
    e.preventDefault();
    toggleSpreadList.classList.remove('disabled');
    if(currentStep < 2){
      currentStep += 1;
      list.style.height = step[currentStep].list;
      list.style.minHeight = 0;
      infoArea.style.height = step[currentStep].infoArea;
    } 
    if(currentStep == 2){
      this.classList.add('disabled');
    }
  });
  toggleSpreadList?.addEventListener('click', function(e){
    e.preventDefault();
    toggleFoldList.classList.remove('disabled');
    if(currentStep > 0){
      currentStep -= 1;
      list.style.height = step[currentStep].list;
      infoArea.style.height = step[currentStep].infoArea;
    }
    if(currentStep == 0){
      this.classList.add('disabled');
    }
  });
}

document.addEventListener('DOMContentLoaded', function () {
  lnbToggle();
  tab('.gts-lnb');
  lnbAccordion();
  combo();
  gnbSubmenu();
  tabNav();
  toggleListLayout();
});
