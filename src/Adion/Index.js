import useServiceProvider from '@/Adion/ServiceProvider';

export const useAdion = () => {
    const { controllers } = useServiceProvider();

    // const dependencies ={
    //     logHelper: new LogHelper()
    // }

    const adion = {};
    controllers.forEach(({ name, controller, shortMethods }) => {
        adion[name] = controller;
        // controller.injecDependencies(dependencies)
        shortMethods.forEach(method => {
            adion[method] = controller[method];
        });
    });
    return adion;
};


// export const useAdion = () => {
//     const { dependencies, controllers } = useServiceProvider();

//     console.log('yo', dependencies)

//     controllers.forEach(({ name, controller, shortMethods }) => {

//         // if (dependencies) {
//             controller.injecDependencies(dependencies);
//         // } else {
//         //     controller.injectDependencies(dependencies);
//         // }
        
//         adion[name] = controller;
//         shortMethods.forEach(method => {
//             adion[method] = controller[method];
//         });
//     });

//     return adion;
// };
// export default useAdion 