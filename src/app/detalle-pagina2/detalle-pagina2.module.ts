import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetallePagina2PageRoutingModule } from './detalle-pagina2-routing.module';

import { DetallePagina2Page } from './detalle-pagina2.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetallePagina2PageRoutingModule
  ],
  declarations: [DetallePagina2Page]
})
export class DetallePagina2PageModule {}
