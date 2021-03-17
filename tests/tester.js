const tests = new Map();

function validateObject(object, struct){
    let keys = Object.keys(struct);
    let obj = Object.keys(obj);

    for(let i = 0; i < keys.length; i++){
        let val = obj[keys[i]];

        if(typeof val == 'string'){
            if(typeof keys[i] != val) return false;
        } else {
            if(!(typeof keys[i] instanceof val)) return false;
        }
    }

    return true;
}

module.exports = (name, done) => {
    tests.set(name, done);
}

module.exports.instanceof = (done, cls) => {
    return async () => {
        let res = await done();
        return res instanceof cls;
    }
}

module.exports.typeof = (done, type) => {
    return async () => {
        let res = await done();
        return typeof res == type;
    }
}

module.exports.arrayof = (done, cls) => {
    return async () => {
        let res = await done();
        if(!Array.isArray(res)) return false;
        for(let i = 0; i < res.length; i++){
            if(!(res[i] instanceof cls)) return false
        }
        return true;
    }
}

module.exports.runTests = async () => {
    const names = [...tests.keys()];
    let maxlength = 0;
    names.forEach(x => maxlength < x.length ? maxlength = x.length : null);
    maxlength += 3;

    for(let i = 0; i < names.length; i++){
        let done = tests.get(names[i]);
        let res = '';
        let ms = 0;
        let success = true;
        let startedAt = Date.now();

        try{
            success = await done();
            ms = Date.now() - startedAt;
            res = success ? '✓' : 'X';
        }catch(e){
            res = 'X'
        }

        let space = Array(maxlength - names[i].length).join(' ');
        console.log(`${res} ${names[i]}${space}${ms}ms`)
    }
}

module.exports.validateObject = validateObject;