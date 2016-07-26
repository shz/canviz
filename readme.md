# Canviz

A souped-up, animated, dataviz oriented canvas for the browser, React,
and nodejs.

WIP.

### Features

 * Automatic and transparent DPI scaling (`devicePixelRatio` is handled for you)
 * Normalized, polyfilled cross-browser API
 * Optional handy-dandy React component

#### Coming Soon

 * A nifty animation framework

# Installation

Via NPM:

```bash
npm install canviz
```

If you use [Typescript](https://www.typescriptlang.org/), typings are
included automatically.

# Usage

```javascript
// A basic, cross-browser, polyfilled, DPI-aware canvas
import { Canvas } from 'canviz';

// Same as the above, but with animation powers
import { AnimatedCanvas } from 'canviz';
import AnimatedCanvas from 'canviz'; // It's also the default

// Want a react component?  No problem!
import { CanvasComponent } from 'canviz/react';

// There's also a nice collection of utilities, via:
import { scales } from 'canviz';
```

## `AnimatedCanvas`

This is probably the class you want to use.  It has a few API extensions
on top of the stock `Canvas` you're used to.  Details forthcoming, but for
now, take a gander:

#### Groups

```javascript
let ac = new AnimatedCanvas(renderer);

function renderer(c) {
  // By putting drawing into a group, those draw calls will only happen
  // if this canvas is render()d with that group specified.
  c.group('extra').draw(() => {
    c.fillStyle = 'red';
    c.fillRect(0, 0, c.width, c.height);
  });

  // There's a special 'default' group that's always drawn.  You can
  // group rendering under it explicitly...
  c.group('default').draw(myStuff);
  // ... or just draw like you normally would, and let it group implicitly.
  c.fillStyle = 'blue';
  c.fillRect(10, 10, c.width, c.height);
}

// Draws using the specified groups
ac.render(['extra']);
```

#### Regions

This is like a lame version of the hopefully-soon-to-be-implemented "Hit Region"
family of APIs for canvas.

```javascript
let ac = new AnimatedCanvas(renderer);

function renderer(c) {
  // You declare a named region like so
  c.region('a', 0, 0, 100, 100);

  // Regions are aware of the current transform
  c.translate(50, 50);
  c.scale(2, 2);
  c.region('b', 0, 0, 100, 100);
  // So in screen space, region 'b' is from (50, 50) to (250, 250)
}

// So once you render...
ac.render();

// You can then get back the regions you defined, in screen coordinates
ac.regions.forEach(r => {
  { name, x, y, w, h } = r;
});

// And conveniently perform hit tests (say, with a mouse cursor...)
let regions = ac.intersectingRegions(50, 50); // ['a', 'b']

// This can be used to great effect when combined with the groups
// functionality to conditionally render components.
onMouseMoveSomehow((x, y) => {
  ac.render(ac.intersectingRegions(x, y));
});
```

##### React

If you're using `<CanvasComponent>` you get a convenient event handler
that will be called any time the mouse cursor moves within the canvas.
The regions will have been calculated for you as well, and passed through
to your handler, free of charge!

```jsx
function interactHandler(c, regions) {
  // ...
}
<CanvasComponent onInteract={interactHandler} />
```

### Animation

NYI.  Soon.

### Interaction

NYI.  Soon.
