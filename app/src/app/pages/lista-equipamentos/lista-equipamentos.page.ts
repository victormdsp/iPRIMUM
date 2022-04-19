import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-lista-equipamentos',
  templateUrl: './lista-equipamentos.page.html',
  styleUrls: ['./lista-equipamentos.page.scss'],
})
export class ListaEquipamentosPage implements OnInit {

  public equipamentos: any;
  public search: string = '';
  public showEquipamento: boolean = true;

  constructor(
    private popoverCtrl: PopoverController,
  ) { 
  }

  async ngOnInit() {
  }

  public dismiss(equipamento: Object){
    console.log(equipamento)
    this.popoverCtrl.dismiss(equipamento);
  }

  public searchRout(equipamento){
    if(equipamento.nome.toLowerCase().startsWith(this.search)){
      return true;
    }
    else return false;
  }
}
