import { NgModule } from '@angular/core';
import { CardMenusComponent } from '../../commons/components/card-menus/card-menus.component';
import { MaintenanceRoutingModule } from './maintenance-routing.module';
import { MaintenanceComponent } from './maintenance.component';

@NgModule({
	declarations: [MaintenanceComponent],
	imports: [MaintenanceRoutingModule, CardMenusComponent]
})
export class MaintenanceModule {}
