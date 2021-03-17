const tests = new Map();

module.exports = (name, fn, options) => {
    tests.set(name, { fn, ...options });
}

module.exports.tests = tests;

module.exports.runTests = async () => {
    const names = [...tests.keys()];

    let maxlength = 0;
    names.forEach(x => maxlength < x.length ? maxlength = x.length : null);
    maxlength += 5;

    for(let i = 0; i < names.length; i++){
        const { fn, check, nonull } = tests.get(names[i]);
        const startedAt = Date.now();
        var emoji = '✓';
        var res = null;

        try{
            var res = await fn();
        }catch(e){
            var emoji = 'X';
        }

        const ms = Date.now() - startedAt;

        if(check){
            let valid = await check(res);
            if(!valid) var emoji = 'X';
        }

        if(nonull && !res) var emoji = 'X';

        const spaces = Array(maxlength - names[i].length).join(' ');
        console.log(`${emoji} ${names[i]}${spaces}${ms}ms`);
    }
}