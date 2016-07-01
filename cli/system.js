'use strict';

debugger;
System.config({
    babelOptions: {
        stage: 3
    },
    bundles: {
        Mvc: ['EventManager', 'ModuleManager', 'ServiceManager']
    },
    depCache: {
        Mvc: ['EventManager', 'ModuleManager', 'ServiceManager']
    },
    map: {
        flow: '/src'
    }
});


import systemjs from 'systemjs';

console.log(systemjs);
console.log(System);