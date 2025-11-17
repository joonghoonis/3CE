/* main-Swiper */
const mainSwiper = new Swiper("#main_view", {
    autoplay:{delay:5000},
    loop:true,
    navigation: {
        nextEl: "#main_view .swiper-button-next",
        prevEl: "#main_view .swiper-button-prev",
    },
    pagination: {
        el: "#main_view .swiper-pagination",
        clickable: true,
    }
});
/* best-Swiper */
new Swiper("#best_eyes_swiper", {
    spaceBetween:20,
    slidesPerView:3.3,
    slidesPerGroup: 1,
    navigation: {
        nextEl: "#best_eyes_swiper .swiper-button-next",
        prevEl: "#best_eyes_swiper .swiper-button-prev",
    },
})
new Swiper("#best_lips_swiper", {
    spaceBetween:20,
    slidesPerView:3.5,
    slidesPerGroup: 1,
    navigation: {
        nextEl: "#best_lips_swiper .swiper-button-next",
        prevEl: "#best_lips_swiper .swiper-button-prev",
    },
})
new Swiper("#best_face_swiper", {
    spaceBetween:20,
    slidesPerView:3.5,
    slidesPerGroup: 1,
    navigation: {
        nextEl: "#best_face_swiper .swiper-button-next",
        prevEl: "#best_face_swiper .swiper-button-prev",
    },
})
new Swiper("#best_essentials_swiper", {
    spaceBetween:20,
    slidesPerView:3.5,
    slidesPerGroup: 1,
    navigation: {
        nextEl: "#best_essentials_swiper .swiper-button-next",
        prevEl: "#best_essentials_swiper .swiper-button-prev",
    },
})
const tabButtons = document.querySelectorAll('.best_category button');
const panels = document.querySelectorAll('.best_panel');

tabButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    const target = btn.dataset.bestTab; // eyes / lips / face / essentials

    // 1) 탭 active 리셋 + 현재 탭에 active
    tabButtons.forEach((b) => b.parentElement.classList.remove('active'));
    btn.parentElement.classList.add('active');

    // 2) 패널 on/off
    panels.forEach((panel) => {
      const isTarget = panel.dataset.bestPanel === target;
      panel.classList.toggle('active', isTarget);
    });
  });
});
new Swiper("#celeb_swiper", {
    autoplay:{delay:3000},
    slidesPerView:5,
    centeredSlides: true,
    spaceBetween: 0,
    loop:true,
    initialSlide:3,
    navigation: {
        nextEl: "#celeb_swiper .swiper-button-next",
        prevEl: "#celeb_swiper .swiper-button-prev"
    }
})