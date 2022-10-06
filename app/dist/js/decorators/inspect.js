export function inspect(target, propertyKey, descriptor) {
    const methodOrigin = descriptor.value;
    descriptor.value = function (...args) {
        console.log(`--- Metodo ${propertyKey}`);
        console.log(`----- parameters: ${JSON.stringify(args)}`);
        const retorno = methodOrigin.apply(this, args);
        console.log(`--- retorno: ${JSON.stringify(retorno)}`);
        return retorno;
    };
    return descriptor;
}
