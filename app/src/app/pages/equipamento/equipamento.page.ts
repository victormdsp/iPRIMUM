import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-equipamento',
  templateUrl: './equipamento.page.html',
  styleUrls: ['./equipamento.page.scss'],
})
export class EquipamentoPage implements OnInit {

  public equipamento: any;

  public pressao: string;
  public oleo: string;
  public temperatura: string;

  public pressaoObrigatorio: boolean = false;
  public oleoObrigatorio: boolean = false;
  public temperaturaObrigatorio: boolean = false;

  public pressaoObs: string;
  public oleoObs: string;
  public temperaturaObs: string;

  constructor(
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
  }

  public changeInspecao(inspecao: string, value: string) {
    if (inspecao == 'pressao') {
      this.pressao = value;
      this.pressaoObrigatorio = value == "anormal" ? true : false;
    }
    if (inspecao == 'oleo') {
      this.oleo = value;
      this.oleoObrigatorio = value == "anormal" ? true : false;
    }
    if (inspecao == 'temperatura') {
      this.temperatura = value;
      this.temperaturaObrigatorio = value == "anormal" ? true : false;
    }
  }

  public observacao(tipoInspecao: string, ev?) {

    if (ev && ev.length > 0) {
      if (tipoInspecao == 'temperatura') this.temperaturaObrigatorio = false;
      if (tipoInspecao == 'pressao') this.pressaoObrigatorio = false;
      if (tipoInspecao == 'oleo') this.oleoObrigatorio = false;
    }

    else {
      if (tipoInspecao == 'temperatura') this.temperaturaObrigatorio = true;
      if (tipoInspecao == 'pressao') this.pressaoObrigatorio = true;
      if (tipoInspecao == 'oleo') this.oleoObrigatorio = true;
    }
  }

  public finalizar(equipamento) {
    if (this.temperaturaObrigatorio || this.oleoObrigatorio || this.pressaoObrigatorio) {
      alert("É necessário preencher todos os campos obrigatórios!");
    }
    else {
      //Resposta da pressão
      equipamento['pressao'] = this.pressao ? {
        perguntaId: 1,
        respostaId: this.pressao == "normal" ? 1 : 2,
        observacao: this.pressaoObs
      }
        :
        {
          perguntaId: 1,
          respostaId: 3,
          observacao: null
        };

      //Resposta do óleo
      equipamento["oleo"] = this.oleo ? {
        perguntaId: 2,
        respostaId: this.oleo == "normal" ? 1 : 2,
        observacao: this.oleoObs
      }
        :
        {
          perguntaId: 2,
          respostaId: 3,
          observacao: null
        };

      //Resposta da temperatura
      equipamento["temperatura"] = this.temperatura ? {
        perguntaId: 3,
        respostaId: this.temperatura == "normal" ? 1 : 2,
        observacao: this.temperaturaObs
      }
        :
        {
          perguntaId: 3,
          respostaId: 3,
          observacao: null
        };
      this.modalCtrl.dismiss(equipamento);
    }
  }

}
