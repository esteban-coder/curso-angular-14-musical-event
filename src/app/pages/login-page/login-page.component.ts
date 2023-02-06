import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { finalize } from 'rxjs';
import { IDataUser } from 'src/app/commons/models/data-user';
import { DemoCorsService } from 'src/app/commons/services/api/demo-cors/demo-cors.service';
import { UserApiService } from 'src/app/commons/services/api/user/user-api.service';
import { SharedFormBasicModule } from 'src/app/commons/shared/shared-form-basic.module';
import { PATHS_AUTH_PAGES, PATH_MAINTENANCE_PAGES, PATH_MY_ACCOUNT_PAGES } from './../../commons/config/path-pages';
import { IResponseLogin } from './../../commons/services/api/user/user-api-model.interface';
import { ChannelHeaderService } from './../../commons/services/local/channel-header.service';
import { SessionStorageService } from './../../commons/services/local/storage/storage.service';
import { KEYS_WEB_STORAGE } from './../../commons/util/enums';

@Component({
	standalone: true,
	selector: 'app-login-page',
	templateUrl: './login-page.component.html',
	styleUrls: ['./login-page.component.scss'],
	imports: [RouterModule, CommonModule, SharedFormBasicModule]
})
export class LoginPageComponent implements OnInit {
	readonly pathRecovery = PATHS_AUTH_PAGES.recoverPasswordPage.withSlash;
	readonly pathRegister = PATHS_AUTH_PAGES.registerPage.withSlash;

	disabledButton = false;
	// formGroup = new FormGroup({
	// 	email: new FormControl<string>('', { nonNullable: true, validators: Validators.required }),
	// 	password: new FormControl<string>('', { nonNullable: true, validators: Validators.required })
	// });

	constructor(
		private _channelHeaderService: ChannelHeaderService,
		private _formBuilder: FormBuilder,
		private _userApiService: UserApiService,
		private _sessionStorageService: SessionStorageService,
		private _router: Router,
		private _demoCorsService: DemoCorsService
	) {}

	formGroup = this._formBuilder.nonNullable.group({
		email: ['erickorlando@outlook.com', Validators.required],
		password: ['12345678', Validators.required]
	});

	ngOnInit(): void {
		console.log('Demo CORS');
		// this._demoCorsService.getGreeting().subscribe();
	}

	clickLogin(): void {
		if (this.formGroup.valid) {
			this.disabledButton = true;
			const { email, password } = this.formGroup.getRawValue();

			this._userApiService
				.login({ user: email, password })
				.pipe(finalize(() => (this.disabledButton = false)))
				.subscribe({
					next: (response) => {
						if (response.success) {
							this._saveDataUserAndRedirect(response, email);
						}
					}
				});
		}
	}

	private _saveDataUserAndRedirect(response: IResponseLogin, email: string): void {
		console.log(response);
		const dataUser: IDataUser = {
			email: email,
			token: response.token,
			fullName: response.fullName,
			isAdmin: response.roles[0] === 'Administrator'
		};
		this._sessionStorageService.setItem(KEYS_WEB_STORAGE.DATA_USER, dataUser);
		this._redirectUser(dataUser.isAdmin);
	}

	private _redirectUser(isAdmin: boolean): void {
		const url = isAdmin ? PATH_MAINTENANCE_PAGES.withSlash : PATH_MY_ACCOUNT_PAGES.withSlash;
		this._router.navigateByUrl(url);
		this._channelHeaderService.showUser(true);
	}
}
