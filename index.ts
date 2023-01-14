export default function co(gen: any) {
  const ctx = this;

  return new Promise((resolve, reject) => {
    if (typeof gen == "function") {
      gen = (gen as Function).apply(ctx);
    }
    if (!gen || typeof gen.next != "function") {
      return resolve(gen);
    }

    next(undefined);

    function next(value) {
      // if (ret.done) return resolve(ret.value);
      const ret = gen.next(value);
      if (ret.done) return resolve(ret.value);

      if (ret.value instanceof Promise) {
        ret.value.then(
          (r) => {
            next(r);
          },
          (e) => {
            return reject(e);
          }
        );
      } else {
        next(ret.value);
      }
    }
  });
}
