import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedFormCompleteModule } from '../../../commons/shared/shared-form-complete.module';
import { AccountChangePasswordPageComponent } from './account-change-password-page.component';

export const routes: Routes = [{ path: '', component: AccountChangePasswordPageComponent }];

@NgModule({
	declarations: [AccountChangePasswordPageComponent],
	imports: [RouterModule.forChild(routes), SharedFormCompleteModule]
})
export class AccountChangePasswordPageModule {}
