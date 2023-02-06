import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

export interface CanComponentDeactivate {
	canDeactivate(): Observable<boolean> | boolean;
}

@Injectable({
	providedIn: 'root'
})
export class FormEventGuard implements CanDeactivate<unknown> {
	canDeactivate(
		component: CanComponentDeactivate,
		currentRoute: ActivatedRouteSnapshot,
		currentState: RouterStateSnapshot,
		nextState?: RouterStateSnapshot
	): boolean | Observable<boolean> {
		return component.canDeactivate ? component.canDeactivate() : true;
	}
}
