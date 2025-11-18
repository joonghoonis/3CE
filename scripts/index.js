/* header scroll */
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (!header) return;
  
    if (window.scrollY > 10) {
      header.classList.add('scrolled');   // ✅ CSS랑 이름 맞추기
    } else {
      header.classList.remove('scrolled');
    }
  });
/* main-Swiper */
const mainSwiper = new Swiper("#main_view", {
    autoplay:{delay:15000},
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
/* celeb */
const celebSwiper = new Swiper("#celeb_swiper", {
    autoplay:{delay:10000},
    slidesPerView:5,
    centeredSlides: true,
    spaceBetween: 0,
    loop:true,
    initialSlide:0,
    navigation: {
        nextEl: "#celeb_swiper .swiper-button-next",
        prevEl: "#celeb_swiper .swiper-button-prev"
    }
})
document.addEventListener('DOMContentLoaded', function () {
const celebSwiperEl = document.querySelector('#celeb_swiper');
if (!celebSwiperEl) return;

const slides = celebSwiperEl.querySelectorAll('.swiper-slide');
const videos = celebSwiperEl.querySelectorAll('video');

// 모든 영상/버튼/썸네일 초기화
function pauseAllVideos() {
    videos.forEach(video => {
    const slide = video.closest('.swiper-slide');
    if (!slide) return;

    const thumb = slide.querySelector('.celeb_thumb');
    const playBtn = slide.querySelector('.play');
    const iconPlay = playBtn && playBtn.querySelector('.icon_play_btn');
    const iconPause = playBtn && playBtn.querySelector('.icon_pause_btn');

    video.pause();
    // 필요하면 처음으로 되감기
    // video.currentTime = 0;

    if (thumb) thumb.style.display = '';

    // ❗ inline 스타일을 지워서 CSS 기준으로 돌아가게
    if (playBtn) playBtn.style.opacity = '';
    if (iconPlay) iconPlay.style.opacity = '';
    if (iconPause) iconPause.style.opacity = '';

    slide.classList.remove('is-playing');
    });

    // 스와이퍼 자동재생 / 드래그 원복
    if (typeof celebSwiper !== 'undefined') {
    celebSwiper.allowTouchMove = true;
    celebSwiper.autoplay && celebSwiper.autoplay.start();
    }
}

slides.forEach(slide => {
    const videoWrap = slide.querySelector('.video_wrap');
    const video = slide.querySelector('video');
    const thumb = slide.querySelector('.celeb_thumb');
    const playBtn = slide.querySelector('.play');
    const soundBtn = slide.querySelector('.sound');
    const iconPlay = playBtn && playBtn.querySelector('.icon_play_btn');
    const iconPause = playBtn && playBtn.querySelector('.icon_pause_btn');
    const iconSoundOn = soundBtn && soundBtn.querySelector('.icon_sound_on');
    const iconSoundOff = soundBtn && soundBtn.querySelector('.icon_sound_off');

    if (!videoWrap || !video || !thumb || !playBtn) return;

    let pauseHintTimer = null;

    // 마우스/터치 시 잠깐 pause 아이콘 보여주기 (0.3초)
    function showPauseHint() {
    if (video.paused) return;

    playBtn.style.opacity = 1;
    if (iconPlay) iconPlay.style.opacity = 0;
    if (iconPause) iconPause.style.opacity = 1;

    if (pauseHintTimer) clearTimeout(pauseHintTimer);
    pauseHintTimer = setTimeout(() => {
        if (!video.paused) {
        playBtn.style.opacity = 0;
        }
    }, 300); // ★ 0.3초
    }

    function playVideo() {
    pauseAllVideos(); // 다른 슬라이드 전부 정지

    thumb.style.display = 'none';
    slide.classList.add('is-playing');

    video.play().catch(() => {});

    // 현재 슬라이드의 큰 ▶ 버튼 숨기고, pause 아이콘 상태로
    playBtn.style.opacity = 0;
    if (iconPlay) iconPlay.style.opacity = 0;
    if (iconPause) iconPause.style.opacity = 1;

    if (typeof celebSwiper !== 'undefined') {
        celebSwiper.autoplay && celebSwiper.autoplay.stop();
        celebSwiper.allowTouchMove = false;
    }
    }

    function pauseVideo() {
    video.pause();
    slide.classList.remove('is-playing');

    // ▶ 버튼 다시 CSS 기준으로
    playBtn.style.opacity = '';
    if (iconPlay) iconPlay.style.opacity = '';
    if (iconPause) iconPause.style.opacity = '';

    if (typeof celebSwiper !== 'undefined') {
        celebSwiper.allowTouchMove = true;
        celebSwiper.autoplay && celebSwiper.autoplay.start();
    }
    }

    // 중앙 재생/일시정지 버튼 클릭
    playBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (video.paused) {
        playVideo();
    } else {
        pauseVideo();
    }
    });

    // 비디오 영역 아무 데나 클릭 → 토글 (sound/play 버튼은 제외)
    videoWrap.addEventListener('click', (e) => {
    if (e.target.closest('.sound') || e.target.closest('.play')) return;

    if (video.paused) {
        playVideo();
    } else {
        pauseVideo();
    }
    });

    // 마우스/터치 → 잠깐 pause 아이콘 표시 (0.3초)
    videoWrap.addEventListener('mousemove', showPauseHint);
    videoWrap.addEventListener('touchstart', showPauseHint, { passive: true });

    // 사운드 버튼 토글
    if (soundBtn) {
    soundBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        video.muted = !video.muted;

        if (iconSoundOn && iconSoundOff) {
        if (video.muted) {
            iconSoundOn.style.opacity = 0;
            iconSoundOff.style.opacity = 1;
        } else {
            iconSoundOn.style.opacity = 1;
            iconSoundOff.style.opacity = 0;
        }
        }
    });
    }

    // 영상 끝나면 상태 초기화
    video.addEventListener('ended', () => {
    pauseVideo();
    thumb.style.display = '';
    // video.currentTime = 0; // 필요하면 주석 해제
    });
});

// 슬라이드 바뀌면 전부 정지
if (typeof celebSwiper !== 'undefined') {
    celebSwiper.on('slideChange', () => {
    pauseAllVideos();
    });
}
});
// a태그 새로고침 막기
document.addEventListener("click", (e) => {
    const link = e.target.closest("a");
    if (!link) return;

// 예외 (진짜 이동하는 링크)
if (link.classList.contains("real-link")) return;

e.preventDefault();
});
const openMapBtn  = document.getElementById('openMapBtn');
const mapLayer    = document.getElementById('storeMapLayer');
const closeMapBtn = document.getElementById('closeMapBtn');

if (openMapBtn && mapLayer && closeMapBtn) {
// 열기
openMapBtn.addEventListener('click', () => {
mapLayer.classList.add('on');
document.body.classList.add('no-scroll'); 
});

// 닫기 버튼
closeMapBtn.addEventListener('click', () => {
mapLayer.classList.remove('on');
document.body.classList.remove('no-scroll');
});

// 어두운 배경 클릭해도 닫기
mapLayer.addEventListener('click', (e) => {
if (e.target === mapLayer) {
    mapLayer.classList.remove('on');
    document.body.classList.remove('no-scroll');
}
});
}