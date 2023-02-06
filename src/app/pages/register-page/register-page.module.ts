import { NgModule } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule, Routes } from '@angular/router';
import { SharedFormBasicModule } from './../../commons/shared/shared-form-basic.module';
import { RegisterPageComponent } from './register-page.component';
export const routes: Routes = [{ path: '', component: RegisterPageComponent }];

@NgModule({
	declarations: [RegisterPageComponent],
	imports: [RouterModule.forChild(routes), SharedFormBasicModule, MatSelectModule]
})
export class RegisterPageModule {}
