import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EquipamentoPageRoutingModule } from './equipamento-routing.module';

import { EquipamentoPage } from './equipamento.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EquipamentoPageRoutingModule
  ],
  declarations: [EquipamentoPage]
})
export class EquipamentoPageModule {}
