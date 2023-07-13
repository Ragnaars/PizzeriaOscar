import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetallePaginaPageRoutingModule } from './detalle-pagina-routing.module';

import { DetallePaginaPage } from './detalle-pagina.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetallePaginaPageRoutingModule
  ],
  declarations: [DetallePaginaPage]
})
export class DetallePaginaPageModule {}
