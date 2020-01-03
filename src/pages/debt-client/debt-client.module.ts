import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DebtClientPage } from './debt-client';

@NgModule({
  declarations: [
    DebtClientPage,
  ],
  imports: [
    IonicPageModule.forChild(DebtClientPage),
  ],
})
export class DebtClientPageModule {}
