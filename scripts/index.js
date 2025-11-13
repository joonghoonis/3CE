const mainSwiper = new Swiper("#main_view", {
    autoplay:{delay:2500},
    loop:true,
    navigation: {
        nextEl: "#main_view .swiper-button-next",
        prevEl: "#main_view .swiper-button-prev",
    },
    pagination: {
        el: "#main_view .swiper-pagination",
        clickable: true,
    }
}
);