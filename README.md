# slide.js
small, simple, jQuery-free Slides

## Why I did this?
just for fun

## Features

* animation
* pagination

## Usage

This is a prototype, so I didn't consider the compatibility. What I do confirm is that it can not support IE, maybe someday will, but not now :)

Get everthing suit up:

```html
<link rel="stylesheet" href="./slide.css">
<script src="./slide.js"></script>
```

Make sure there is an id:

```html
<div id="slide"></div>
```

Init slidejs:

```js
new Slide('#slide', {
    imgs: [
        './dist/imgs/1.gif',
        './dist/imgs/2.gif',
        './dist/imgs/3.gif',
    ]
})
```

YAHA, done!

## API

### Default

```js
new Slide('#slide', {
    imgs: [],            // pictures you need to slide
    width: 600,          // the slide's width
    height: 400,         // the slide's height
    autoswitch: {
        open: false,     // switch the slide automatically
        delay: 5000      // delay time
    },
    animation: 'slideUp' // animation while you slide, we have: slideUp, slideLeft, fade
})
```
