import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MaintenanceGuard } from 'src/app/commons/guards/maintenance.guard';
import { PATH_MAINTENANCE_PAGES } from './../../commons/config/path-pages';
import { AuthGuard } from './../../commons/guards/auth.guard';
import { MaintenanceComponent } from './maintenance.component';

export const routes: Routes = [
	{
		path: '', //maintenance
		component: MaintenanceComponent,
		canActivate: [MaintenanceGuard],
		canActivateChild: [AuthGuard],
		children: [
			{
				path: PATH_MAINTENANCE_PAGES.buy.onlyPath,
				title: 'Eventos vendidos',
				loadChildren: () =>
					import('./maintenance-buy-page/maintenance-buy-page.module').then((m) => m.MaintenanceBuyPageModule)
			},
			{
				path: PATH_MAINTENANCE_PAGES.events.onlyPath,
				title: 'Eventos',
				loadChildren: () =>
					import('./maintenance-events-page/maintenance-events-page.module').then((m) => m.MaintenanceEventsPageModule)
			},
			{
				path: PATH_MAINTENANCE_PAGES.genres.onlyPath,
				title: 'Generos',
				loadChildren: () =>
					import('./maintenance-genres-page/maintenance-genres-page.module').then((m) => m.MaintenanceGenresPageModule)
			},
			{
				path: PATH_MAINTENANCE_PAGES.reports.onlyPath,
				title: 'Reporte de ventas',
				loadChildren: () =>
					import('./maintenance-reports/maintenance-reports.module').then((m) => m.MaintenanceReportsModule)
			},
			{
				path: '', //maintenance
				pathMatch: 'full',
				redirectTo: PATH_MAINTENANCE_PAGES.buy.onlyPath //maintenance/buy
			}
		]
	}
];
@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class MaintenanceRoutingModule {}
