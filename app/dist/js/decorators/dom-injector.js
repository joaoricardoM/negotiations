export function domInjector(selector) {
    return function (target, propertyKey) {
        let elemento;
        const getter = function () {
            if (!elemento) {
                elemento = document.querySelector(selector);
            }
            return elemento;
        };
        Object.defineProperty(target, propertyKey, { get: getter });
    };
}
