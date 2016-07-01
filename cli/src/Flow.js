
const Container = require('./Container');
// const MethodFactory = require('../method-factory');
const util = require('util');
const vfs = require('vinyl-fs');

function Flow() {
    Container.call(this);
}
util.inherits(Flow, Container);

Flow.prototype.add = function (name, dep, method) {
    var methodFactory = new MethodFactory(this);

    if (!method && (typeof dep === 'function' || util.isArray(dep))) {
        method = dep;
        dep = undefined;
    }

    if (util.isArray(method)) {
        var methodDependencies = method;
        method = method.pop();

        var resolvedMethodDependencies = methodDependencies
            .filter(methodFactory.create('has'))
            .map(methodFactory.create('get'));

        var fn = MethodFactory.create(method, resolvedMethodDependencies);
        console.log(fn);
    }

    // override Orchestrator.prototype.add
    this.tasks[name] = {
        fn: fn,
        dep: dep,
        name: name
    };
    return this;
};
Flow.prototype.src = vfs.src;
Flow.prototype.dest = vfs.dest;
Flow.prototype.watch = vfs.watch;


module.exports = Flow;