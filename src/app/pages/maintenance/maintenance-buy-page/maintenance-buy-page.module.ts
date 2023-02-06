import { DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { RouterModule, Routes } from '@angular/router';
import { SharedFormCompleteModule } from '../../../commons/shared/shared-form-complete.module';
import { MaintenanceBuyPageComponent } from './maintenance-buy-page.component';

export const routes: Routes = [{ path: '', component: MaintenanceBuyPageComponent }];
@NgModule({
	declarations: [MaintenanceBuyPageComponent],
	imports: [RouterModule.forChild(routes), MatTableModule, MatPaginatorModule, SharedFormCompleteModule],
	providers: [DatePipe]
})
export class MaintenanceBuyPageModule {}
