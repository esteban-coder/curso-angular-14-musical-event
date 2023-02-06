import { CurrencyPipe, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { SharedFormCompleteModule } from '../../../commons/shared/shared-form-complete.module';
import { MaintenanceReportsComponent } from './maintenance-reports.component';

export const routes: Routes = [{ path: '', component: MaintenanceReportsComponent }];

@NgModule({
	declarations: [MaintenanceReportsComponent],
	imports: [RouterModule.forChild(routes), SharedFormCompleteModule, NgxChartsModule],
	providers: [DatePipe, CurrencyPipe]
})
export class MaintenanceReportsModule {}
