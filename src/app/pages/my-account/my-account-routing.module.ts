import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PATH_MY_ACCOUNT_PAGES } from './../../commons/config/path-pages';
import { MyAccountComponent } from './my-account.component';

export const routes: Routes = [
	{
		path: '',
		component: MyAccountComponent,
		children: [
			{
				path: PATH_MY_ACCOUNT_PAGES.buy.onlyPath,
				title: 'Mis compras',
				loadChildren: () =>
					import('./account-buy-page/account-buy-page.module').then(
						(m) => m.AccountBuyPageModule
					)
			},
			{
				path: PATH_MY_ACCOUNT_PAGES.changePassword.onlyPath,
				title: 'Cambio de Contraseña',
				loadChildren: () =>
					import('./account-change-password-page/account-change-password-page.module').then(
						(m) => m.AccountChangePasswordPageModule
					)
			},
			{
				path: '', //my-account
				pathMatch: 'full',
				redirectTo: PATH_MY_ACCOUNT_PAGES.buy.onlyPath //my-account/buy
			}
		]
	}
];
@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class MyAccountRoutingModule {}
