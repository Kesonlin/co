function co(gen) {
    var ctx = this;
    return new Promise(function (resolve, reject) {
        if (typeof gen == "function") {
            gen = gen.apply(ctx);
        }
        if (!gen || typeof gen.next != "function") {
            return resolve(gen);
        }
        next(undefined);
        function next(value) {
            // if (ret.done) return resolve(ret.value);
            var ret = gen.next(value);
            if (ret.done)
                return resolve(ret.value);
            if (ret.value instanceof Promise) {
                ret.value.then(function (r) {
                    next(r);
                }, function (e) {
                    return reject(e);
                });
            }
            else {
                next(ret.value);
            }
        }
    });
}

export { co as default };
