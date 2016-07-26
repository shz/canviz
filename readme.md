# Canvas

A souped-up, animated, dataviz oriented canvas for the browser, React,
and nodejs.

WIP.

### Features

 * Automatic and transparent DPI scaling (`devicePixelRatio` is handled for you)
 * Normalized, polyfilled cross-browser API
 * Optional handy-dandy React component

#### Coming Soon

 * A nifty animation framework
 * A convenient and powerful interaction system

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

### Animation

NYI.  Soon.

### Interaction

NYI.  Soon.
