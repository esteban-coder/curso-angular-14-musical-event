import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { PATHS_AUTH_PAGES } from '../config/path-pages';
import { DataUserService } from '../services/local/storage/data-user.service';

@Injectable({
	providedIn: 'root'
})
export class MaintenanceGuard implements CanActivate {
	constructor(private _dataUserService: DataUserService, private _router: Router) {}

	canActivate(_route: ActivatedRouteSnapshot, _state: RouterStateSnapshot): boolean {
		console.log('*****MaintenanceGuard***');

		if (this._dataUserService.isAdmin() === false) {
			void this._router.navigateByUrl(PATHS_AUTH_PAGES.loginPage.withSlash);
			return false;
		}
		return true;
	}
}
