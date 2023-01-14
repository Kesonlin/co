import co from "../index";

// 写一个请求简版请求
function request(ms = 1000) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ name: "若川" });
    }, ms);
  });
}

export interface ResponseGenerator {
  config?: any;
  data?: any;
  headers?: any;
  request?: any;
  status?: number;
  statusText?: string;
}

function* generatorFn() {
  const res: ResponseGenerator = yield request();
  console.log("res1", res);

  const res1: ResponseGenerator = yield request(500);
  console.log("res1", res1);

  return 8;
}

function* gen() {
  yield 1;
  console.log(1);

  // return 1;
}

const next = gen();
const next1 = next.next();

co(generatorFn);
