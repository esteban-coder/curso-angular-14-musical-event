import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedFormBasicModule } from './../../commons/shared/shared-form-basic.module';
import { RecoveryPasswordPageComponent } from './recovery-password-page.component';

export const routes: Routes = [{ path: '', component: RecoveryPasswordPageComponent }];

@NgModule({
	declarations: [RecoveryPasswordPageComponent],
	imports: [RouterModule.forChild(routes), SharedFormBasicModule]
})
export class RecoveryPasswordPageModule {}
