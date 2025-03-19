/* 헤더 - gnb ---------------------------------------------- */
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

/* 헤더 - gnb(mobile) ---------------------------------------------- */
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

$mobileGnb.on("click", function (e) {
  e.preventDefault();
  $(this).next(".mobile-submenu").slideToggle(300);
  $(this).parent().siblings().find(".mobile-submenu").slideUp(300);
});

$(document).on("click", function (e) {
  if (!$(e.target).closest(".mobile-menu, .btn-menu").length) {
    $mobileMenu.removeClass("on");
    $("body").css("overflow", "auto");
  }
});

/* visual ---------------------------------------------- */
gsap.registerPlugin(ScrollTrigger);

// visual 영역 이미지
const mainPic = $(".main-pic");
const mainTitle = $(".main-title");
const mainTl = gsap.timeline({
  defaults: { duration: 1, ease: "power4.inOut" },
});

mainTl.from(mainPic, { scale: 0.3 });
mainTl.from(mainTitle, { y: 200, autoAlpha: 0 }, "-=0.3");

// visual 영역 애니메이션
const visualPic = $(".visual-pic").get(0);

const visualTl = gsap.timeline({
  defaults: { duration: 1, ease: "power4.inOut" },
});
visualTl.from(visualPic, { scale: 3, filter: "blur(30px)", duration: 2 });

visualTl.from(".bread", { y: 50, autoAlpha: 0 }, "-=0.9");
visualTl.from(".visual-title h2", { y: 100, autoAlpha: 0 }, "-=0.6");
visualTl.from(".visual-title p", { y: 100, autoAlpha: 0 }, "-=0.6");

/* 슬라이드01 ---------------------------------------------- */
if ($(".products-con-slider").length) {
  const $productsConSlider = new Swiper(".products-con-slider", {
    loop: true,
    slidesPerView: "auto",
    spaceBetween: 21,
    freeMode: true,
    autoplay: {
      delay: 4000,
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
      delay: 4000,
    },
    // controller: {
    //   control: $productsConSlider,
    // },
    thumbs: {
      swiper: $productsConSlider,
    },
  });
}

/* 슬라이드02 ---------------------------------------------- */
if ($(".preview-swiper").length) {
  const $previewSwiper = new Swiper(".preview-swiper", {
    loop: true,
    slidesPerView: "1",
    spaceBetween: 20,
    autoplay: {
      delay: 1000,
    },

    breakpoints: {
      1440: {
        slidesPerView: 5,
        spaceBetween: 20,
      },
      660: {
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

/* 슬라이드03 ---------------------------------------------- */
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
    navigation: {
      prevEl: ".review-prev",
      nextEl: ".review-next",
    },

    breakpoints: {
      1440: {
        slidesPerView: 6,
        spaceBetween: 20,
      },
      1024: {
        slidesPerView: 4,
        spaceBetween: 20,
      },
      660: {
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

/* 제품 목록 -카테고리 ---------------------------------------------- */
const $productsTabMenu = $(".products-tab > li");
const $productsTabCon = $(".products-con");

productsTabAction(0);

$productsTabMenu.on("click", function (e) {
  e.preventDefault();

  const productsTabIdx = $(this).index();
  console.log(productsTabIdx);

  productsTabAction(productsTabIdx);
});

function productsTabAction(index) {
  $productsTabMenu.removeClass("on");
  $productsTabMenu.eq(index).addClass("on");

  $productsTabCon.hide();
  $productsTabCon.eq(index).show();
}

/* 질문 목록 - 카테고리 ---------------------------------------------- */
const $faqTabMenu = $(".faq-tab > li");
const $faqTabCon = $(".info-wrap > ul");

faqTabAction(0);

$faqTabMenu.on("click", function (e) {
  e.preventDefault();

  const faqTabIdx = $(this).index();
  console.log(faqTabIdx);

  faqTabAction(faqTabIdx);
});

function faqTabAction(index) {
  $faqTabMenu.removeClass("on");
  $faqTabMenu.eq(index).addClass("on");

  $faqTabCon.hide();
  $faqTabCon.eq(index).show();
}

/* 질문 목록(faq) ---------------------------------------------- */
const $question = $(".info-wrap > ul > li");
const $answer = $(".answer-wrap");

$question.on("click", function () {
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

/* 지도 ---------------------------------------------- */
const $mapSearch = $(".map-search");
const $btnFold = $(".btn-fold");

$(document).ready(function () {
  if (window.innerWidth <= 1024) {
    $mapSearch.addClass("on");
  }
});

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

AOS.init();

/* top / talk 버튼---------------------------------------------- */

const btnTop = document.querySelector(".btn-top");
const btnTalk = document.querySelector(".btn-talk");
const html = document.documentElement;
const htmlPos = html.scrollHeight / 2;

$(".btn-top").click(function () {
  $("html, body").animate({ scrollTop: 0 }, 400);
  return false;
});

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
