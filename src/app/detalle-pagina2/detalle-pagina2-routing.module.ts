import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetallePagina2Page } from './detalle-pagina2.page';

const routes: Routes = [
  {
    path: '',
    component: DetallePagina2Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetallePagina2PageRoutingModule {}
