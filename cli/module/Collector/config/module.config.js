export default {
    router: {
        routes: {}
    },
    console: {
        router: {
            routes: {}
        },
    },
    controllers: {
        factories: {
            'Checkout/Controller/Checkout': 'Checkout/Controller/CheckoutControllerFactory'
        }
    },
    service_manager: {
        factories: {
            'Checkout/Service/Cart': 'Checkout/Service/CartServiceFactory'
        }
    },
    view_manager: {
        template_path_stack: [__dirname + '/../view']
    }
};