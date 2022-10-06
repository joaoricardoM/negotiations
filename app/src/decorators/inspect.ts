export function inspect(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  const methodOrigin = descriptor.value;
  descriptor.value = function (...args: any[]) {
    console.log(`--- Metodo ${propertyKey}`);
    console.log(`----- parameters: ${JSON.stringify(args)}`);
    const retorno = methodOrigin.apply(this, args);
    console.log(`--- retorno: ${JSON.stringify(retorno)}`);
    return retorno;
  };
  return descriptor;
}
