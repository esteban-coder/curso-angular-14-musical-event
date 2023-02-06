import { Injectable } from '@angular/core';
import jwtDecode, { JwtPayload } from 'jwt-decode';
import { IDataUser } from 'src/app/commons/models/data-user';
import { KEYS_WEB_STORAGE } from 'src/app/commons/util/enums';
import { SessionStorageService } from './storage.service';

@Injectable({ providedIn: 'root' })
export class DataUserService {
	constructor(private _sessionStorageService: SessionStorageService) {}

	getToken(): string | undefined {
		const tokenUser = this._sessionStorageService.getItem<IDataUser>(KEYS_WEB_STORAGE.DATA_USER);
		return tokenUser?.token;
	}

	getEmail(): string {
		const dataUser = this._sessionStorageService.getItem<IDataUser>(KEYS_WEB_STORAGE.DATA_USER);

		if (dataUser !== null){
			return dataUser.email;
		}
		return "";
	}

	getEmail2(): string | null {
		const dataUser = this._sessionStorageService.getItem<IDataUser>(KEYS_WEB_STORAGE.DATA_USER);

		if (dataUser !== null && dataUser.token) {
			const decoded = jwtDecode<JwtPayload>(dataUser.token);
			console.log(decoded);

			var base64Url = dataUser.token.split('.')[1];
			var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
			var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
				return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
			}).join(''));

			console.log(JSON.parse(jsonPayload));

			const decoded2 = JSON.parse(jsonPayload)
			
			console.log(decoded2["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"]);

			var email = decoded2["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"]
			return email;
		}

		return null;
	}

	getFullName(): string | null {
		const dataUser = this._sessionStorageService.getItem<IDataUser>(KEYS_WEB_STORAGE.DATA_USER);

		if (dataUser !== null) {
			return dataUser.fullName;
		}

		return null;
	}

	isAdmin(): boolean | null {
		const dataUser = this._sessionStorageService.getItem<IDataUser>(KEYS_WEB_STORAGE.DATA_USER);

		if (dataUser !== null) {
			return dataUser.isAdmin;
		}

		return null;
	}

	isExpiredToken(): boolean {
		try {
			const dataUser = this._sessionStorageService.getItem<IDataUser>(KEYS_WEB_STORAGE.DATA_USER);
			if (dataUser !== null && dataUser.token) {
				const decoded = jwtDecode<JwtPayload>(dataUser.token);
				const tokenExpired = Date.now() > decoded.exp! * 1000;
				return tokenExpired;
			}
			return true;
		} catch (error) {
			console.error(error);
			return true;
		}
	}

	existsStorage(): boolean {
		return this._sessionStorageService.getItem<IDataUser>(KEYS_WEB_STORAGE.DATA_USER) !== null;
	}
}
