import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Listar2Page } from './listar2.page';

const routes: Routes = [
  {
    path: '',
    component: Listar2Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Listar2PageRoutingModule {}
