import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Listar2PageRoutingModule } from './listar2-routing.module';

import { Listar2Page } from './listar2.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Listar2PageRoutingModule
  ],
  declarations: [Listar2Page]
})
export class Listar2PageModule {}
