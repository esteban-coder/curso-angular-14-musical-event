import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedFormBasicModule } from './../../commons/shared/shared-form-basic.module';
import { RestorePasswordComponent } from './restore-password-page.component';
export const routes: Routes = [{ path: '', component: RestorePasswordComponent }];

@NgModule({
	declarations: [RestorePasswordComponent],
	imports: [RouterModule.forChild(routes), SharedFormBasicModule]
})
export class RestorePasswordPageModule {}
