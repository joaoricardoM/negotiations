import { negociacaoDia } from "../interfaces/negociacaoDia.js";
import { Negociacao } from "../models/negociacao.js";

export class negociacoesService {
  public obterNegociacoesDia(): Promise<Negociacao[]> {
    return fetch("http://localhost:8080/dados")
      .then((res) => res.json())
      .then((dados: negociacaoDia[]) => {
        return dados.map((dadoHoje) => {
          return new Negociacao(new Date(), dadoHoje.vezes, dadoHoje.montante);
        });
      })
  }
}
