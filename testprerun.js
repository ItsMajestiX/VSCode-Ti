const Promise = require('bluebird');

//https://stackoverflow.com/a/26172779/10720080
let cmd = require('node-cmd');
let fs = require('fs');

let getAsync = Promise.promisify(cmd.get, { multiArgs: true, context: cmd });

const processRef = getAsync('tsc -p ./').then((data) => {
  fs.copyFile('./src/tivars_test/tivars_test.wasm', './out/tivars_test/tivars_test.wasm', (err) => {
    if (err) throw err;
  });
});