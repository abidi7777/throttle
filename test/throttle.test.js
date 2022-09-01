import sinon from 'sinon';

import $throttle from '../src/throttle';

const delay = (wait) => new Promise((resolve) => {
  setTimeout(resolve, wait);
});

QUnit.module('$throttle');

QUnit.test('should throw error if executor is not a function', function shouldThrowError(assert) {
  assert.expect(1);
  assert.throws(() => $throttle());
});

QUnit.test('should call function with last args', async function shouldCallOnce(assert) {
  assert.expect(1);

  const done = assert.async();
  const cb = sinon.fake();
  const throttledCb = $throttle(cb, 500);

  throttledCb();
  throttledCb();
  throttledCb();

  await delay(600);

  assert.true(cb.calledTwice);
  done();
});
