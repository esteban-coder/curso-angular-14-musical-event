import { NgModule } from '@angular/core';
import { CardMenusComponent } from '../../commons/components/card-menus/card-menus.component';
import { MyAccountRoutingModule } from './my-account-routing.module';
import { MyAccountComponent } from './my-account.component';

@NgModule({
	declarations: [MyAccountComponent],
	imports: [MyAccountRoutingModule, CardMenusComponent]
})
export class MyAccountModule {}
