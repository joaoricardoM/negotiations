import { Negociacao } from "../models/negociacao.js";
export class negociacoesService {
    obterNegociacoesDia() {
        return fetch("http://localhost:8080/dados")
            .then((res) => res.json())
            .then((dados) => {
            return dados.map((dadoHoje) => {
                return new Negociacao(new Date(), dadoHoje.vezes, dadoHoje.montante);
            });
        });
    }
}
