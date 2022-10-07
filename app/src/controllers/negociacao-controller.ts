import { domInjector } from "../decorators/dom-injector.js";
import { inspect } from "../decorators/inspect.js";
import { logarTempodeExecucao } from "../decorators/logar-tempo-de-execucao.js";
import { DiasSemana } from "../enums/dias-semana.js";
import { negociacaoDia } from "../interfaces/negociacaoDia.js";
import { Negociacao } from "../models/negociacao.js";
import { Negociacoes } from "../models/negociacoes.js";
import { negociacoesService } from "../services/negociacoes-services.js";
import { MensagemView } from "../views/mensagem-view.js";
import { NegociacoesView } from "../views/negociacoes-view.js";

export class negociacaoController {
  @domInjector("#data")
  private inputData: HTMLInputElement;
  @domInjector("#quantidade")
  private inputQuantidade: HTMLInputElement;
  @domInjector("#valor")
  private inputValor: HTMLInputElement;
  private negociacoes = new Negociacoes();
  private negociacoesView = new NegociacoesView("#negociacoesView");
  private mensagemView = new MensagemView("#mensagemView");
  private negociacaoService = new negociacoesService();

  constructor() {
    this.negociacoesView.update(this.negociacoes);
  }

  @inspect
  @logarTempodeExecucao()
  public adiciona(): void {
    const negociacao = Negociacao.criaDe(
      this.inputData.value,
      this.inputQuantidade.value,
      this.inputValor.value
    );
    if (!this.ehDiaUtil(negociacao.data)) {
      this.mensagemView.update("Apenas negociações em dias úteis são aceitas!");
      return;
    }

    this.negociacoes.adiciona(negociacao);
    console.log(this.negociacoes.paraTexto());
    console.log(negociacao.paraTexto());
    this.limparFormulario();
    this.atulizaView();
  }

  public importarDados(): void {
    this.negociacaoService.obterNegociacoesDia().then((negociacoesDeHoje) => {
      for (let negociacao of negociacoesDeHoje) {
        this.negociacoes.adiciona(negociacao);
      }
      this.negociacoesView.update(this.negociacoes);
    });
  }

  private ehDiaUtil(data: Date) {
    return (
      data.getDay() > DiasSemana.DOMINGO && data.getDay() < DiasSemana.SABADO
    );
  }

  public limparFormulario(): void {
    this.inputData.value = "";
    this.inputQuantidade.value = "";
    this.inputValor.value = "";
    this.inputData.focus();
  }

  private atulizaView(): void {
    this.negociacoesView.update(this.negociacoes);
    this.mensagemView.update("Negociação adicionada com sucesso!");
  }
}
