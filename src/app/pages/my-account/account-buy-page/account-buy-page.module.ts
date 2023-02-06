import { NgModule } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { RouterModule, Routes } from '@angular/router';
import { SharedFormCompleteModule } from '../../../commons/shared/shared-form-complete.module';
import { AccountBuyPageComponent } from './account-buy-page.component';

export const routes: Routes = [{ path: '', component: AccountBuyPageComponent }];

@NgModule({
	declarations: [AccountBuyPageComponent],
	imports: [
		RouterModule.forChild(routes), 
		MatTableModule, 
		MatPaginatorModule,
		SharedFormCompleteModule]
})
export class AccountBuyPageModule {}