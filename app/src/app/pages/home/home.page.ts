import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { ModalController, PopoverController } from '@ionic/angular';
import { RequestService } from 'src/app/services/request.service';
import { EquipamentoPage } from '../equipamento/equipamento.page';
import { ListaEquipamentosPage } from '../lista-equipamentos/lista-equipamentos.page';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})

export class HomePage implements OnInit {

  public token: string
  public equipamentos: any;
  public equipamentoInspecao: any;
  public equipamentosRealizados: any = [];
  public totalEquipaments: number;
  public finalizarRota: boolean = false;

  constructor(
    private privateCtrl: PopoverController,
    private modalCtrl: ModalController,
    private requestCtrl: RequestService,
    private barCode: BarcodeScanner
  ) { }

  async teste(){
    const res = await this.requestCtrl.sendAnswer({}, this.token);
    console.log(res);
  }

  async ngOnInit() {
    this.token = history.state.token.token;
    this.equipamentos = await this.requestCtrl.requestEquipaments(this.token)
    this.totalEquipaments = this.equipamentos.length;
  }


  public async qrScanner() {
    const qrCode = await this.barCode.scan({
      preferFrontCamera: false,
      formats: 'QR_CODE',
      orientation: 'portrait'
    })

    this.getEquipament(qrCode.text);
  }

  async createPopover() {
    const popover = this.privateCtrl.create({ component: ListaEquipamentosPage, componentProps: { equipamentos: this.equipamentos } });
    (await popover).present();
    (await popover).onDidDismiss()
      .then(async data => {
        if (!data.data || Object.keys(data.data).length <= 0) {
          return;
        }
        if (Object.keys(data.data).length > 0) {
          this.createModal(data.data);
        }
      })
  }

  async getEquipament(tag: string) {
    for (const equipamento of this.equipamentos) {
      if (equipamento.tag == tag) {
        this.createModal(equipamento);
      }
    }
  }

  async createModal(equipament) {
    const modal = await this.modalCtrl.create({ component: EquipamentoPage, componentProps: { equipamento: equipament } })
    modal.present();
    modal.onDidDismiss()
      .then(data => {
        console.log("Data: ", data);
        if (Object.keys(data.data).length > 1) {
          this.equipamentoInspecao = data.data;
          this.finalizarEquipamento()
        }
      })
  }

  finalizarEquipamento() {
    this.equipamentos.forEach((equipamento, index) => {
      if (equipamento.tag == this.equipamentoInspecao.tag) {
        this.equipamentos.splice(index, 1);
        this.equipamentosRealizados.push(this.equipamentoInspecao) }
    });

    if(this.equipamentosRealizados.length == this.totalEquipaments){
      this.finalizarRota = true;
    }
  }

  async finalizar(){
    const respostas = []
    if(this.finalizarRota){
      for(const equipamento of this.equipamentosRealizados){
        const postEquipamento = {
          equipamentoId: equipamento.id,
        }
        for(const key in equipamento){
          if(key == "pressao" || key == "temperatura" || key == "oleo"){
            postEquipamento['perguntaId'] = equipamento[key].perguntaId;
            postEquipamento['repostaId'] = equipamento[key].respostaId;
            postEquipamento['observacao'] = equipamento[key].observacao;
          }
        }

        respostas.push(postEquipamento);
      }
      const res = await this.requestCtrl.sendAnswer(respostas, this.token);
      console.log("Res:", res);
    }

    else{
      alert("Você deve avaliar todos os equipamentos para poder finalizar")
    }
  }
}
