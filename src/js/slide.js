/**
 * small, simple, jQuery-free Slides
 * @author SidKwok
 */

(function() {

    const Animation = {
        slideUp(page) {
            this.pics.style.top = '-' + (page - 1) * this.options.height + 'px';
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
        pagination: true,
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
            this.picsLayer = null;
            this.pics = null;

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

            if (this.options.pagination) {
                this.initPagination();
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

            pagination.setAttribute('class', 'pagination');

            // animation
            pagination.addEventListener('click', (event) => {
                let page = Number.parseInt(event.target.innerHTML);
                if (page) {
                    this.doAnimation(page);

                    for (let a of pagination.children) {
                        a.className = '';
                    }
                    event.target.className = 'active';
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
        doAnimation() {}
    }

    /**
     * expose Slide
     */
    window.Slide = Slide;
})()
