/* 공통!!!---------------------------------------------- */

// GNB
const $header = $("header");
const $menu = $(".gnb > li");
const $submenu = $(".submenu");
const duration = 300;

$menu.on("mouseenter", function () {
  $(this).addClass("on");
  $header.addClass("active");
  $submenu.stop().slideDown(duration);
});

$menu.on("mouseleave", function () {
  $(this).removeClass("on");
  $header.removeClass("active");
  $submenu.stop().slideUp(duration);
});

//모바일 버전의 GNB!!
// 모바일 메뉴 기능
const $btnMenu = $(".btn-menu");
const $btnClose = $(".btn-close");
const $mobileMenu = $(".mobile-menu");
const $mobileGnb = $(".mobile-gnb > li > a");

$btnMenu.on("click", function () {
  $mobileMenu.addClass("on");
  $("body").css("overflow", "hidden"); // 스크롤 방지
});

$btnClose.on("click", function () {
  $mobileMenu.removeClass("on");
  $("body").css("overflow", "auto"); // 스크롤 복구
});

// 모바일 서브메뉴 토글
$mobileGnb.on("click", function (e) {
  e.preventDefault();
  $(this).next(".mobile-submenu").slideToggle(300);
  $(this).parent().siblings().find(".mobile-submenu").slideUp(300);
});

// 모바일 메뉴 외부 영역 클릭시 닫기
$(document).on("click", function (e) {
  if (!$(e.target).closest(".mobile-menu, .btn-menu").length) {
    $mobileMenu.removeClass("on");
    $("body").css("overflow", "auto");
  }
});

// 비주얼 이미지 나타나기~
gsap.registerPlugin(ScrollTrigger);

const mainPic = $(".main-pic");
const mainTitle = $(".main-title");
const mainTl = gsap.timeline({
  defaults: { duration: 1, ease: "power4.inOut" },
});

mainTl.from(mainPic, { scale: 0.3 });
mainTl.from(mainTitle, { y: 200, autoAlpha: 0 }, "-=0.3");

// 1. visual 영역 애니메이션
const visualPic = $(".visual-pic").get(0);

const visualTl = gsap.timeline({
  defaults: { duration: 1, ease: "power4.inOut" },
});
visualTl.from(visualPic, { scale: 3, filter: "blur(30px)", duration: 2 });

visualTl.from(".bread", { y: 50, autoAlpha: 0 }, "-=0.9");
visualTl.from(".visual-title h2", { y: 100, autoAlpha: 0 }, "-=0.6");
visualTl.from(".visual-title p", { y: 100, autoAlpha: 0 }, "-=0.6");

/* MAIN!!!---------------------------------------------- */

// products swiper(MAIN)
if ($(".products-con-slider").length) {
  const $productsConSlider = new Swiper(".products-con-slider", {
    loop: true,
    slidesPerView: "auto",
    freeMode: true,
    watchSlidesProgress: true,
    autoplay: {
      delay: 5000,
    },
    pagination: {
      el: ".swiper-pagination",
      type: "progressbar",
    },
  });

  const $productsTxtSlider = new Swiper(".products-txt-slider", {
    loop: true,
    effect: "fade",
    autoplay: {
      delay: 5000,
    },
    thumbs: {
      swiper: $productsConSlider,
    },
  });
}

if ($(".preview-swiper").length) {
  const $previewSwiper = new Swiper(".preview-swiper", {
    loop: true,
    slidesPerView: "1",
    spaceBetween: 20,
    autoplay: {
      delay: 1000,
    },

    breakpoints: {
      1300: {
        slidesPerView: 5,
        spaceBetween: 20,
      },
      800: {
        slidesPerView: 4,
        spaceBetween: 20,
      },
      600: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
      375: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
    },
  });
}

if ($(".review-slider").length) {
  const reviewSwiper = new Swiper(".review-slider", {
    slidesPerView: 1,
    spaceBetween: 20,
    loop: true,
    autoplay: {
      delay: 2000,
    },
    pagination: {
      el: ".review-slider-wrap .swiper-pagination",
      type: "fraction",
    },

    breakpoints: {
      1440: {
        slidesPerView: 6,
        spaceBetween: 20,
      },
      700: {
        slidesPerView: 4,
        spaceBetween: 20,
      },
      375: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
    },
  });
}

/* products!!!---------------------------------------------- */

// products-tab(products)
const $productsTabMenu = $(".products-tab > li");
const $productsTabCon = $(".products-con");

productsTabAction(0);

$productsTabMenu.on("click", function (e) {
  e.preventDefault();

  const productsTabIdx = $(this).index();
  console.log(productsTabIdx);

  productsTabAction(productsTabIdx);
});

// 공통의 동작을 함수로 정의
function productsTabAction(index) {
  // 탭메뉴 활성화
  $productsTabMenu.removeClass("on");
  $productsTabMenu.eq(index).addClass("on");

  // 인덱스에 해당하는 $tabCon 보이기
  $productsTabCon.hide();
  $productsTabCon.eq(index).show();
}

if ($(".products-list li")) {
  const $productsList = $(".products-list");
  $productsList.on("click", function () {
    $(this).toggleClass("on", 400);
  });
}

const $productsItem = $(".products-list li");
const $productsList = $(".products-list");

$productsItem.on("click", function () {
  $(productsList).toggleClass("on");

  $(productsList).siblings().find($productsItem).stop().slideUp(duration);

  // $(this).find($answer).slideDown(duration);
  // 선택한 놈의 자손중 답변을 찾아서 슬라이드 토글
  $(productsList).find($productsItem).stop().slideToggle(duration);
});

const $faqTabMenu = $(".faq-tab > li");
const $faqTabCon = $(".info-wrap > ul");

faqTabAction(0);

$faqTabMenu.on("click", function (e) {
  e.preventDefault();

  const faqTabIdx = $(this).index();
  console.log(faqTabIdx);

  faqTabAction(faqTabIdx);
});

// 공통의 동작을 함수로 정의
function faqTabAction(index) {
  // 탭메뉴 활성화
  $faqTabMenu.removeClass("on");
  $faqTabMenu.eq(index).addClass("on");

  // 인덱스에 해당하는 $tabCon 보이기
  $faqTabCon.hide();
  $faqTabCon.eq(index).show();
}

const $question = $(".info-wrap > ul > li");
const $answer = $(".answer-wrap");

$question.on("click", function () {
  // 🚩 $(this)로 구별, siblings()

  // 선택한 놈을 기준으로, 다른 놈들은 on클래스 삭제
  $(this).siblings().removeClass("on");

  // $(this).addClass("on");
  // 선택한 놈을 기준으로 on클래스를 토글
  $(this).toggleClass("on");

  // 선택한 놈의 형제, 하위에 있는 답변은 올리고
  // stop()  <-- 여러개 예약되어 있어도 한 번만 작동
  $(this).siblings().find($answer).stop().slideUp(duration);

  // $(this).find($answer).slideDown(duration);
  // 선택한 놈의 자손중 답변을 찾아서 슬라이드 토글
  $(this).find($answer).stop().slideToggle(duration);
});

/* REWARDS!!!---------------------------------------------- */

// event swiper(MAIN)
const $eventTabMenu = $(".event-tab > li");
const $eventTabCon = $(".event-list");

$eventTabCon.hide();
$eventTabCon.eq(0).show();
$eventTabMenu.eq(0).find("a").addClass("on");

$eventTabMenu.on("click", function (e) {
  e.preventDefault();

  const eventTabIdx = $(this).index();

  $eventTabMenu.find("a").removeClass("on");
  $(this).find("a").addClass("on");

  $eventTabCon.hide();
  $eventTabCon.eq(eventTabIdx).show();

  if (eventTabIdx === 0 && window.eventSwiper) {
    window.eventSwiper.update();
  }
});

if ($(".event-swiper").length) {
  const $eventSwiper = new Swiper(".event-swiper", {
    loop: true,
    slidesPerView: "2",
    spaceBetween: 20,
    autoplay: {
      delay: 1000,
    },

    breakpoints: {
      1440: {
        slidesPerView: 7.5,
        spaceBetween: 20,
      },
      768: {
        slidesPerView: 5,
        spaceBetween: 20,
      },
      425: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
    },

    pagination: {
      el: ".event-list .swiper-pagination",
      type: "fraction",
    },
  });
}

/* MAP!!!---------------------------------------------- */

const $mapSearch = $(".map-search");
const $btnFold = $(".btn-fold");

// 페이지 로드 시 초기 상태 설정
$(document).ready(function () {
  if (window.innerWidth <= 1024) {
    $mapSearch.addClass("on");
  }
});

// 리사이즈 이벤트 처리
$(window).on("resize", function () {
  if (window.innerWidth <= 1024) {
    $mapSearch.addClass("on");
  } else {
    $mapSearch.removeClass("on");
  }
});

$btnFold.on("click", function () {
  $mapSearch.toggleClass("on");
});

// TOP 버튼
AOS.init();

const btnTop = document.querySelector(".btn-top");
const btnTalk = document.querySelector(".btn-talk");
const html = document.documentElement;
const htmlPos = html.scrollHeight / 2;

window.addEventListener("scroll", function () {
  let scrollTop = window.scrollY;

  if (scrollTop >= htmlPos) {
    btnTop.classList.add("active");
    btnTalk.classList.add("active");
  } else {
    btnTop.classList.remove("active");
    btnTalk.classList.remove("active");
  }
});
