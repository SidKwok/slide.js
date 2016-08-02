/**
 * @author Sid Kwok <oceankwok@hotmail.com>
 * version: 1.0.0
 * https://github.com/SidKwok/slide.js
 *
 */

(function() {

    const Animation = {
        slideUp(page) {
            this.pics.style.top = '-' + (page - 1) * this.options.height + 'px';
        },
        slideLeft(page) {
            this.pics.style.left = '-' + (page - 1) * this.options.width + 'px';
        },
        fade(page) {
            let imgs = this.pics.children;

            for (let i = 0; i < imgs.length; i++) {
                imgs[i].style.opacity = ((i + 1) === page) ? '1' : '0';
            }
        }
    }

    const DEFAULT = {
        imgs: [],
        width: 600,
        height: 400,
        autoswitch: {
            open: true,
            delay: 5000
        },
        animation: 'slideUp'
    }

    class Slide {
        constructor(el, opt) {
            this.options = DEFAULT;
            this.$el = document.querySelector(el);
            this.currentPage = 1;
            this.picsLayer = null;
            this.pics = null;
            this.pagination = null;

            if (opt) {
                for (let key in opt) {
                    if (key === 'autoswitch') {
                        this.options.autoswitch.open = opt.autoswitch.open;
                        this.options.autoswitch.delay = opt.autoswitch.delay;
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
            this.initAnimation();
            this.initPagination();

            if (this.options.autoswitch.open) {
                this.initAutoSwitch();
            }
        }
        initImgs() {
            let srcs = this.options.imgs;
            let pics = this.pics;
            let { width, height, animation } = this.options;

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
            let { picsLayer, pics } = this;
            let { width, height } = this.options;
            let length = this.options.imgs.length;
            let pagination = document.createElement('div');

            this.pagination = pagination;

            pagination.setAttribute('class', 'pagination');

            // animation
            pagination.addEventListener('click', (event) => {
                let page = Number.parseInt(event.target.innerHTML);
                if (page) {
                    this.switchSlide(page);
                }
            }, false);


            picsLayer.appendChild(pagination);

            for (let i = 0; i < length; i++) {
                let a = document.createElement('a');
                a.innerHTML = i + 1;
                a.href = 'javascript: void(0);';
                if (i == 0) {
                    a.className = 'active';
                }
                pagination.appendChild(a);
            }
        }
        initAnimation() {
            let pics = this.pics;
            let { width, height, animation } = this.options;

            switch (animation) {
                case 'slideUp':
                    pics.style.position = 'absolute';
                    pics.style.top = '0px';
                    for (let img of pics.children) {
                        img.style.display = 'block';
                    }
                    this.doAnimation = Animation.slideUp;
                    break;
                case 'slideLeft':
                    pics.style.position = 'absolute';
                    pics.style.left = '0px';
                    pics.style.width = pics.children.length * width + 'px';
                    for (let img of pics.children) {
                        img.style.display = 'inline-block';
                    }
                    this.doAnimation = Animation.slideLeft;
                    break;
                case 'fade':
                    let imgs = pics.children;
                    for (let i = 0; i < imgs.length; i++) {
                        imgs[i].style.position = 'absolute';
                        imgs[i].style.opacity = (i === 0) ? '1' : '0';
                    }
                    this.doAnimation = Animation.fade;
                    break;
                default:

            }
        }
        initAutoSwitch() {
            let {delay} = this.options.autoswitch;
            setInterval(() => {
                this.switchSlide(this.currentPage + 1)
            }, delay);
        }
        doAnimation() {}
        switchSlide(page) {
            let pages = this.pagination.children;
            if (page > this.options.imgs.length) {
                page = 1
            }
            this.currentPage = page;
            this.doAnimation(page);

            for (let i = 0; i < pages.length; i++) {
                pages[i].className = (i === ( page - 1) ? 'active' : '');
            }

        }
    }

    /**
     * expose Slide
     */
    window.Slide = Slide;
})()
