import { Imprimivel } from "./Imprimivel.js";

export function imprimir(...objetos: Imprimivel[]){
    for (let objeto of objetos){
        console.log(objeto.paraTexto());
    }
}