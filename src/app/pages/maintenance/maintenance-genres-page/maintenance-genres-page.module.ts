import { DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule, Routes } from '@angular/router';
import { SharedFormCompleteModule } from '../../../commons/shared/shared-form-complete.module';
import { MaintenanceGenresPageComponent } from './maintenance-genres-page.component';

export const routes: Routes = [{ path: '', component: MaintenanceGenresPageComponent }];
@NgModule({
	declarations: [MaintenanceGenresPageComponent],
	imports: [
		RouterModule.forChild(routes),
		MatTableModule,
		MatTabsModule,
		MatMenuModule,
		MatPaginatorModule,
		SharedFormCompleteModule
	],
	providers: [DatePipe]
})
export class MaintenanceGenresPageModule {}
