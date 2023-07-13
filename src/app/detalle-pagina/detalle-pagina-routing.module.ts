import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetallePaginaPage } from './detalle-pagina.page';

const routes: Routes = [
  {
    path: '',
    component: DetallePaginaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetallePaginaPageRoutingModule {}
