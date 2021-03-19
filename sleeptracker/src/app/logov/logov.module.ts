import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LogovPageRoutingModule } from './logov-routing.module';

import { LogovPage } from './logov.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LogovPageRoutingModule
  ],
  declarations: [LogovPage]
})
export class LogovPageModule {}
