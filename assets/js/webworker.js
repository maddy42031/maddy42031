onmessage = function (event) {
  let fromData = event.data.from;
  let toData = event.data.to;
  let prime = findPrime(fromData, toData);
  postMessage({ type: "primelist", prime });
};

function findPrime(from, to) {
  let list = [];
  for (let i = from; i <= to; i++) {
    list.push(i);
  }
  let primes = [];
  let previousProgress;
  for (let i = 0; i <= list.length; i++) {
    let flag = 0;
    for (let j = 2; j < i; j++) {
      if (i % j == 0) {
        flag = 1;
        break;
      }
    }
    if (i > 1 && flag == 0) {
      primes.push(i);
    }
    let progress = Math.round((i / list.length) * 100);
    if (previousProgress != progress) {
      postMessage({ type: "progress", progress });
      previousProgress = progress;
    }
  }
  return primes;
}
