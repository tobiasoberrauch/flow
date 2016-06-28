const EventManager = global.import('Flow/Mvc/Service/EventManager');

export default class {
    createService(serviceLocator) {
        let eventManager = new EventManager();
        // eventManager.setSharedManager(serviceLocator.get('SharedEventManager'));

        return eventManager;
    }
}