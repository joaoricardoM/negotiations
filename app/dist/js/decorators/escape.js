export function escape(target, propertyKey, descriptor) {
    const methodOrigin = descriptor.value;
    descriptor.value = function (...args) {
        let retorno = methodOrigin.apply(this, args);
        if (typeof retorno === "string") {
            retorno = retorno.replace(/<script>[\s\S]*?<\/script>/, "");
        }
        return retorno;
    };
    return descriptor;
}
