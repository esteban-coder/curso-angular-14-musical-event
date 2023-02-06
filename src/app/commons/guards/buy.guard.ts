import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { DataUserService } from '../services/local/storage/data-user.service';
import { PATH_MAINTENANCE_PAGES } from './../config/path-pages';

@Injectable({
	providedIn: 'root'
})
export class BuyGuard implements CanActivate {
	constructor(private _dataUserService: DataUserService, private _router: Router) {}

	canActivate(_route: ActivatedRouteSnapshot, _state: RouterStateSnapshot): boolean {
		if (this._dataUserService.isAdmin() === true) {
			void this._router.navigateByUrl(PATH_MAINTENANCE_PAGES.withSlash);
			return false;
		}
		return true;
	}
}
