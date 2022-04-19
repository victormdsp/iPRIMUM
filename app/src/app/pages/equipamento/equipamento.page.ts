import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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

  constructor(
    private route: Router
  ) { }

  ngOnInit() {
    this.equipamento = history.state.equipamento;
  }

  public changeInspecao(inspecao: string, value: string){
    if(inspecao == 'pressao') this.pressao = value;
    if(inspecao == 'oleo') this.oleo = value;
    if(inspecao == 'temperatura') this.temperatura = value;
  }

  public observacao(tipoInspecao: string, ev?){
    if(ev.length > 0){
      if(tipoInspecao == 'temperatura') this.temperaturaObrigatorio = true;
      if(tipoInspecao == 'pressao') this.pressaoObrigatorio = true;
      if(tipoInspecao == 'oleo') this.oleoObrigatorio = true;
    }

    else{
      if(tipoInspecao == 'temperatura') this.temperaturaObrigatorio = false;
      if(tipoInspecao == 'pressao') this.pressaoObrigatorio = false;
      if(tipoInspecao == 'oleo') this.oleoObrigatorio = false;
    }
  }

  public finalizar(equipamento){
     this.route.navigate(['/home'], {state: {equipamentoInspecao: equipamento}})
  }

}
