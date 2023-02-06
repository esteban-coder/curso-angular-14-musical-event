import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { CardEventComponent } from '../../commons/components/card-event/card-event.component';
import { SharedFormCompleteModule } from './../../commons/shared/shared-form-complete.module';
import { BuyPageComponent } from './buy-page.component';

export const routes: Routes = [{ path: '', component: BuyPageComponent }];

@NgModule({
	declarations: [BuyPageComponent],
	imports: [RouterModule.forChild(routes), SharedFormCompleteModule, FormsModule, CardEventComponent]
})
export class BuyPageModule {}
