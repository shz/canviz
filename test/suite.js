let assert = require('chai').assert,
    AnimatedCanvas = require('../lib/animated_canvas').default;

// No arrow functions for `describe()` and `it()`!  The preservation of
// `this` breaks Mocha's niceties, which is a real bummer, man.

describe('AnimatedCanvas', function() {
  it('supports groups', function() {
    let aCalled = false;
    let bCalled = false;
    let defaultCalled = false;

    new AnimatedCanvas((c) => {
      c.group('a').draw(c => {
        aCalled = true;
      });
      c.group('b').draw(c => {
        bCalled = true;
      });
      c.group('default').draw(c => {
        defaultCalled = true;
      });
    }).render(['a']);

    assert.isTrue(aCalled, 'a was drawn');
    assert.isFalse(bCalled, 'b was not drawn');
    assert.isTrue(defaultCalled, 'default was drawn');
  });

  it('supports regions', function() {
    let c = new AnimatedCanvas((c) => {
      c.region('a', 0, 0, 100, 100);

      c.translate(50, 50);
      c.region('b', 0, 0, 100, 100);

      c.scale(2);
      c.region('c', 0, 0, 100, 100);
    })
    c.render();

    assert.deepEqual(c.intersectingRegions(0, 0), ['a'], '(0, 0)');
    assert.deepEqual(c.intersectingRegions(100, 100), ['a', 'b', 'c'], '(100, 100)');
    assert.deepEqual(c.intersectingRegions(101, 101), ['b', 'c'], '(101, 101)');
    assert.deepEqual(c.intersectingRegions(150, 150), ['b', 'c'], '(150, 150)');
    assert.deepEqual(c.intersectingRegions(151, 151), ['c'], '(151, 151)');
    assert.deepEqual(c.intersectingRegions(250, 250), ['c'], '(250, 250)');
    assert.deepEqual(c.intersectingRegions(251, 251), [], '(251, 251)');

    // Make sure it's DPI independent
    global.window = { devicePixelRatio: 2 };
    c = new AnimatedCanvas((c) => {
      c.scale(2);
      c.region('a', 10, 10, 10, 10);
    });
    c.render();

    assert.deepEqual(c.intersectingRegions(0, 0), [], '(0, 0)');
    assert.deepEqual(c.intersectingRegions(10, 10), [], '(10, 10)');
    assert.deepEqual(c.intersectingRegions(20, 20), ['a'], '(20, 20)');
    assert.deepEqual(c.intersectingRegions(40, 40), ['a'], '(40, 40)');
    assert.deepEqual(c.intersectingRegions(41, 41), [], '(41, 41)');
  });
});