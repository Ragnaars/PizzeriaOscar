import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetallePagina2PageRoutingModule } from './detalle-pagina2-routing.module';

import { DetallePagina2Page } from './detalle-pagina2.page';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetallePagina2PageRoutingModule
  ],
  declarations: [DetallePagina2Page],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DetallePagina2PageModule { }
