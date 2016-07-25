exports.Canvas = require('./lib/canvas').default;
exports.AnimatedCanvas = require('./lib/animated_canvas').default;
exports.scales = require('./lib/scales');
exports.default = exports.AnimatedCanvas;

// We only expose the React component if react is available, because
// if we do an unconditional require when React isn't around, we'll
// get an exception.
try {
  require('react');

  exports.CanvasComponent = require('./lib/canvas_component').default;
} catch (e) {}
