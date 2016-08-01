/**
 * small, simple, jQuery-free Slides
 * @author SidKwok
 */

(function() {
    const DEFAULT = {
        imgs: [],
        width: 500,
        height: 300,
        animation: {
            open: false,
            delay: 2000
        }
    }

    class Slide {
        constructor(opt) {
            this.opt = opt;
            console.log(this.opt)
        }
        test() {
            console.log(';yo');
        }
    }

    /**
     * expose Slide
     */
    window.Slide = Slide;
})()
