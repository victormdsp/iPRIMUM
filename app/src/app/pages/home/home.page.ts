import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { RequestService } from 'src/app/services/request.service';
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

  constructor(
    private privateCtrl: PopoverController,
    private route: Router,
    private requestCtrl: RequestService
  ) {}

  async ngOnInit() {
    this.token = history.state.token.token;
    this.equipamentos = await this.requestCtrl.requestEquipaments(this.token)
  }


  async createPopover(){
    const popover = this.privateCtrl.create({component: ListaEquipamentosPage, componentProps: {equipamentos: this.equipamentos}});
    (await popover).present();
    (await popover).onDidDismiss()
      .then(data => {
        if(!data.data || Object.keys(data.data).length <= 0){
          return;
        }
        if(Object.keys(data.data).length > 0){
          this.route.navigateByUrl('/equipamento', {state: {equipamento: data.data}})
          .then(() =>{
            console.log("ENtrou")
          })
        }
      })
  }
}
