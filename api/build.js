
const fs = require('fs');

// 1. copy core

function readPk(file) {
    let txt = fs.readFileSync(file);
    return JSON.parse(txt);
}

let mPkg = readPk('package.json');
function buildCore() {
    let cPkg = readPk('core/package.json');
    cPkg.version = mPkg.version;
    fs.writeFileSync('dist/core/package.json', JSON.stringify(cPkg, null, 4));

    console.log('build core/package.json')
}

buildCore();



function buildClient() {
    let cPkg = readPk('client/package.json');
    cPkg.version = mPkg.version;
    cPkg.dependencies["@napp/api-core"] = mPkg.version;
    fs.writeFileSync('dist/client/package.json', JSON.stringify(cPkg, null, 4));

    console.log('build client/package.json')
}

buildClient();

function buildServer() {
    let cPkg = readPk('server/package.json');
    cPkg.version = mPkg.version;
    cPkg.dependencies["@napp/api-core"] = mPkg.version;
    fs.writeFileSync('dist/server/package.json', JSON.stringify(cPkg, null, 4));

    console.log('build server/package.json')
}

buildServer();