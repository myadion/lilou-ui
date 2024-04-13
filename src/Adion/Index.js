import useServiceProvider from '@/Adion/ServiceProvider';
import { defineStore } from 'pinia';

export const useAdion = () => {
    const { dependencies: globalDependencies, controllers } = useServiceProvider();
    const adion = {};

    controllers.forEach(({ name, controller, dependencies: controllerDependencies, shortMethods, shortData }) => {
        // Initialisation paresseuse des contrôleurs à l'aide d'un Proxy.
        const controllerProxy = new Proxy({}, {
            get: (target, prop, receiver) => {
                if (!target.instance) {
                    const mergedDependencies = { ...globalDependencies, ...controllerDependencies };
                    // Utilisez getInstance si disponible, sinon créez une nouvelle instance.
                    target.instance = controller.getInstance ? controller.getInstance(mergedDependencies) : new controller(mergedDependencies);
                    console.debug(`${name}Controller proxy instance created`);
                }
                return Reflect.get(target.instance, prop, receiver);
            },
            set: (target, prop, value) => {
                if (!target.instance) {
                    const mergedDependencies = { ...globalDependencies, ...controllerDependencies };
                    target.instance = controller.getInstance ? controller.getInstance(mergedDependencies) : new controller(mergedDependencies);
                }
                target.instance[prop] = value;
                return true;
            }
        });

        adion[name] = controllerProxy;

        // Liaison des méthodes et données abrégées directement sur l'objet adion pour un accès facile.
        if (shortMethods) {
            shortMethods.forEach(method => {
                adion[method] = (...args) => adion[name][method](...args);
            });
        }

        if (shortData) {
            shortData.forEach(data => {
                Object.defineProperty(adion, data, {
                    get: () => adion[name][data],
                    set: (val) => { adion[name][data] = val; }
                });
            });
        }
    });

    return adion;
}
export default useAdion;
