document.addEventListener('DOMContentLoaded', () => {
    // header scroll
    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 10) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // main swiper
    const mainSwiperEl = document.querySelector('#main_view');
    if (mainSwiperEl && typeof Swiper !== 'undefined') {
        new Swiper('#main_view', {
            autoplay: { delay: 15000 },
            loop: true,
            navigation: {
                nextEl: '#main_view .swiper-button-next',
                prevEl: '#main_view .swiper-button-prev',
            },
            pagination: {
                el: '#main_view .swiper-pagination',
                clickable: true,
            },
        });
    }

    // best swiper 공통
    function initBestSwiper(id) {
        const selector = `#${id}`;
        const el = document.querySelector(selector);
        if (!el || typeof Swiper === 'undefined') return;

        new Swiper(selector, {
            spaceBetween: 20,
            slidesPerView: 3.3,
            slidesPerGroup: 1,
            navigation: {
                nextEl: `${selector} .swiper-button-next`,
                prevEl: `${selector} .swiper-button-prev`,
            },
            breakpoints: {
                1024: { slidesPerView: 3.3 },
                768: { slidesPerView: 3 },
                650: { slidesPerView: 2.8 },
                520: { slidesPerView: 2.5 },
                440: { slidesPerView: 1.7 },
                0:   { slidesPerView: 1.3 },
            },
        });
    }

    initBestSwiper('best_eyes_swiper');
    initBestSwiper('best_lips_swiper');
    initBestSwiper('best_face_swiper');
    initBestSwiper('best_essentials_swiper');

    // best 탭
    const tabButtons = document.querySelectorAll('.best_category button');
    const panels = document.querySelectorAll('.best_panel');

    if (tabButtons.length && panels.length) {
        tabButtons.forEach((btn) => {
            btn.addEventListener('click', () => {
                const target = btn.dataset.bestTab;

                tabButtons.forEach((b) => b.parentElement.classList.remove('active'));
                btn.parentElement.classList.add('active');

                panels.forEach((panel) => {
                    const isTarget = panel.dataset.bestPanel === target;
                    panel.classList.toggle('active', isTarget);
                });
            });
        });
    }

    // new collection
    const section = document.querySelector('#new_collection');
    if (section) {
        const leftTabsWrap = section.querySelector('.nc_tabs--left');
        const rightTabsWrap = section.querySelector('.nc_tabs--right');
        const panelsNc = Array.from(section.querySelectorAll('.nc_panels .nc-panel'));
        const allTabs = Array.from(section.querySelectorAll('.nc_tabs .nc-tab'));

        const categoryOrder = ['lip-tint', 'lipstick', 'cheek', 'eyeshadow', 'powder'];

        const tabMap = {};
        const panelMap = {};

        categoryOrder.forEach((cat) => {
            const tab = allTabs.find((t) => t.dataset.cat === cat);
            const panel = panelsNc.find((p) => p.dataset.cat === cat);
            if (tab) tabMap[cat] = tab;
            if (panel) panelMap[cat] = panel;
        });

        let currentCat = 'lip-tint';

        function updateTabs(activeCat) {
            const activeIndex = categoryOrder.indexOf(activeCat);

            categoryOrder.forEach((cat, idx) => {
                const tab = tabMap[cat];
                if (!tab) return;

                tab.classList.remove('on');

                if (idx < activeIndex) {
                    leftTabsWrap && leftTabsWrap.appendChild(tab);
                } else if (idx > activeIndex) {
                    rightTabsWrap && rightTabsWrap.appendChild(tab);
                }
            });

            const activeTab = tabMap[activeCat];
            if (activeTab) {
                activeTab.classList.add('on');
            }
        }

        function updatePanels(activeCat, fromSide) {
            Object.values(panelMap).forEach((panel) => {
                panel.classList.remove('active', 'dir-left', 'dir-right');
            });

            const panel = panelMap[activeCat];
            if (!panel) return;

            if (fromSide === 'left') {
                panel.classList.add('dir-left');
            } else {
                panel.classList.add('dir-right');
            }

            void panel.offsetWidth;
            panel.classList.add('active');
        }

        function setActiveCategory(nextCat, fromSide) {
            if (!categoryOrder.includes(nextCat)) return;
            currentCat = nextCat;

            updateTabs(currentCat);
            updatePanels(currentCat, fromSide || 'right');
        }

        Object.entries(tabMap).forEach(([cat, tab]) => {
            tab.addEventListener('click', () => {
                const fromSide = tab.closest('.nc_tabs--left') ? 'left' : 'right';
                setActiveCategory(cat, fromSide);
            });
        });

        setActiveCategory('lip-tint', 'right');
    }

    // celeb swiper
    let celebSwiper = null;
    const celebSwiperRoot = document.querySelector('#celeb_swiper');

    if (celebSwiperRoot && typeof Swiper !== 'undefined') {
        celebSwiper = new Swiper('#celeb_swiper', {
            autoplay: { delay: 6000 },
            slidesPerView: 5,
            centeredSlides: true,
            spaceBetween: 0,
            loop: true,
            initialSlide: 0,
            navigation: {
                nextEl: '#celeb_swiper .swiper-button-next',
                prevEl: '#celeb_swiper .swiper-button-prev',
            },
            breakpoints: {
                1440: { slidesPerView: 5 },
                1200: { slidesPerView: 4.2 },
                768:  { slidesPerView: 3.4 },
                520:  { slidesPerView: 2.2 },
                0:    { slidesPerView: 1.5 },
            },
        });
    }

    // celeb 동영상 컨트롤
    if (celebSwiperRoot) {
        const slides = celebSwiperRoot.querySelectorAll('.swiper-slide');
        const videos = celebSwiperRoot.querySelectorAll('video');

        function pauseAllVideos() {
            videos.forEach((video) => {
                const slide = video.closest('.swiper-slide');
                if (!slide) return;

                const thumb = slide.querySelector('.celeb_thumb');
                const playBtn = slide.querySelector('.play');
                const iconPlay = playBtn && playBtn.querySelector('.icon_play_btn');
                const iconPause = playBtn && playBtn.querySelector('.icon_pause_btn');

                video.pause();

                if (thumb) thumb.style.display = '';
                if (playBtn) playBtn.style.opacity = '';
                if (iconPlay) iconPlay.style.opacity = '';
                if (iconPause) iconPause.style.opacity = '';

                slide.classList.remove('is-playing');
            });

            if (celebSwiper) {
                celebSwiper.allowTouchMove = true;
                celebSwiper.autoplay && celebSwiper.autoplay.start();
            }
        }

        slides.forEach((slide) => {
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
                }, 300);
            }

            function playVideo() {
                pauseAllVideos();

                thumb.style.display = 'none';
                slide.classList.add('is-playing');

                video.play().catch(() => {});

                playBtn.style.opacity = 0;
                if (iconPlay) iconPlay.style.opacity = 0;
                if (iconPause) iconPause.style.opacity = 1;

                if (celebSwiper) {
                    celebSwiper.autoplay && celebSwiper.autoplay.stop();
                    celebSwiper.allowTouchMove = false;
                }
            }

            function pauseVideo() {
                video.pause();
                slide.classList.remove('is-playing');

                playBtn.style.opacity = '';
                if (iconPlay) iconPlay.style.opacity = '';
                if (iconPause) iconPause.style.opacity = '';

                if (celebSwiper) {
                    celebSwiper.allowTouchMove = true;
                    celebSwiper.autoplay && celebSwiper.autoplay.start();
                }
            }

            playBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                if (video.paused) {
                    playVideo();
                } else {
                    pauseVideo();
                }
            });

            videoWrap.addEventListener('click', (e) => {
                if (e.target.closest('.sound') || e.target.closest('.play')) return;

                if (video.paused) {
                    playVideo();
                } else {
                    pauseVideo();
                }
            });

            videoWrap.addEventListener('mousemove', showPauseHint);
            videoWrap.addEventListener('touchstart', showPauseHint, { passive: true });

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

            video.addEventListener('ended', () => {
                pauseVideo();
                thumb.style.display = '';
                // video.currentTime = 0;
            });
        });

        if (celebSwiper) {
            celebSwiper.on('slideChange', () => {
                pauseAllVideos();
            });
        }
    }

    // a 태그 기본동작 막기 (.real-link만 예외)
    document.addEventListener('click', (e) => {
        const link = e.target.closest('a');
        if (!link) return;
        if (link.classList.contains('real-link')) return;

        e.preventDefault();
    });

    // 매장 지도 레이어
    const openMapBtn = document.getElementById('openMapBtn');
    const mapLayer = document.getElementById('storeMapLayer');
    const closeMapBtn = document.getElementById('closeMapBtn');

    if (openMapBtn && mapLayer && closeMapBtn) {
        const hideMap = () => {
            mapLayer.classList.remove('on');
            document.body.classList.remove('no-scroll');
        };

        openMapBtn.addEventListener('click', () => {
            mapLayer.classList.add('on');
            document.body.classList.add('no-scroll');
        });

        closeMapBtn.addEventListener('click', hideMap);

        mapLayer.addEventListener('click', (e) => {
            if (e.target === mapLayer) {
                hideMap();
            }
        });
    }
});
