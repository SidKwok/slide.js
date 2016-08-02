/**
 * small, simple, jQuery-free Slides
 * @author SidKwok
 */

(function() {

    const Animation = {
        slideUp(el, page, height) {
            el.style.top = '-' + (page - 1) * height + 'px';
        }
    }

    const DEFAULT = {
        imgs: [],
        width: 600,
        height: 400,
        pagination: true,
        animation: {
            open: false,
            delay: 2000
        }
    }

    class Slide {
        constructor(el, opt) {
            this.options = DEFAULT;
            this.$el = document.querySelector(el);
            this.picsLayer = null;
            this.pics = null;

            if (opt) {
                for (let key in opt) {
                    if (key === 'animation') {
                        this.options.animation.open = opt.animation.open;
                        this.options.animation.delay = opt.animation.delay;
                    } else {
                        this.options[key] = opt[key];
                    }
                }
            }

            this.init();
        }
        init() {
            let $el = this.$el;
            let { width, height } = this.options;
            let picsLayer = document.createElement('div');
            let pics = document.createElement('div');

            this.picsLayer = picsLayer;
            this.pics = pics;

            // 设置样式
            picsLayer.style.width = width + 'px';
            picsLayer.style.height = height + 'px';
            picsLayer.setAttribute('class', 'pics-layer');
            $el.setAttribute('class', 'slide');

            picsLayer.appendChild(pics);
            $el.appendChild(picsLayer)

            this.initImgs();

            if (this.options.pagination) {
                this.initPagination();
            }
        }
        initImgs() {
            let srcs = this.options.imgs;
            let pics = this.pics;
            let { width, height } = this.options;

            // 设置样式
            pics.setAttribute('class', 'pics');

            for (let src of srcs) {
                let img = new Image();
                img.src = src;
                img.width = width;
                img.height = height;
                pics.appendChild(img);
            }
        }
        initPagination() {
            let picsLayer = this.picsLayer;
            let pics = this.pics;
            let length = this.options.imgs.length;
            let pagination = document.createElement('div');
            let { width, height } = this.options;

            pagination.setAttribute('class', 'pagination');

            // animation
            pagination.addEventListener('click', (event) => {
                Animation.slideUp(pics, event.target.innerHTML, height)
            }, false);


            picsLayer.appendChild(pagination);

            for (let i = 0; i < length; i++) {
                let a = document.createElement('a');
                a.innerHTML = i + 1;
                a.href = 'javascript: void(0);';
                pagination.appendChild(a);
            }
        }
    }

    /**
     * expose Slide
     */
    window.Slide = Slide;
})()
