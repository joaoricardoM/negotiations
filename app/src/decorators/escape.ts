export function escape(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  const methodOrigin = descriptor.value;
  descriptor.value = function (...args: any[]) {
    let retorno = methodOrigin.apply(this, args);
    if (typeof retorno === "string") {
      console.log(
        `@escape está funcionando ${this.constructor.name} para o metodo ${propertyKey}`
      );
      retorno = retorno.replace(/<script>[\s\S]*?<\/script>/, "");
    }
    return retorno;
  };
  return descriptor;
}
