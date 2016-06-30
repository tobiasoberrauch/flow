export default class ModuleResolverListener {
    __invoke(event) {
        let moduleName = event.getModuleName();
        let className = moduleName + '/Module';

        return new instance();
    }
}