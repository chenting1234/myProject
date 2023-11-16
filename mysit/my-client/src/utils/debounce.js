export default function (fn, duration = 100) {
  let timeId = null;
  return (...args) => {
    clearTimeout(timeId);
    // 将该函数的this传递到fn
    timeId = setTimeout(() => {
      fn(...args);
    }, duration);
  };
}
