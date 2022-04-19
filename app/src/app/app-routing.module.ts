import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { EquipamentoPage } from './pages/equipamento/equipamento.page';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'lista-equipamentos',
    loadChildren: () => import('./pages/lista-equipamentos/lista-equipamentos.module').then( m => m.ListaEquipamentosPageModule)
  },
  {
    path: 'equipamento',
    resolve: {equipamento: EquipamentoPage},
    loadChildren: () => import('./pages/equipamento/equipamento.module').then( m => m.EquipamentoPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
