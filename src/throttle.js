export default function throttle(executor, delay = 0) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function');
  }

  let isThrottled = false;
  let lastArgs = null;
  const timeoutFunc = () => {
    if (lastArgs === null) {
      isThrottled = false;
    } else {
      executor.apply(executor, lastArgs);
      setTimeout(timeoutFunc, delay);

      lastArgs = null;
    }
  };

  return (...args) => {
    if (isThrottled) {
      lastArgs = args;

      return;
    }

    isThrottled = true;

    executor.apply(this, args);

    setTimeout(timeoutFunc, delay);
  };
}
