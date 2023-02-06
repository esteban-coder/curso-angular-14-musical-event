import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroupDirective, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmBoxEvokeService, ToastEvokeService } from '@costlydeveloper/ngx-awesome-popup';
import { concatMap, EMPTY, finalize, Observable } from 'rxjs';
import { IRequestChangePassword } from 'src/app/commons/services/api/user/user-api-model.interface';
import { UserApiService } from 'src/app/commons/services/api/user/user-api.service';
import { DataUserService } from 'src/app/commons/services/local/storage/data-user.service';
import { customPasswordValidator } from 'src/app/commons/validators/forms.validator';

@Component({
	selector: 'app-account-change-password-page',
	templateUrl: './account-change-password-page.component.html',
	styleUrls: ['./account-change-password-page.component.scss']
})
export class AccountChangePasswordPageComponent {

	disabledButton = false;

	formGroup = this._formBuilder.nonNullable.group(
		{
			oldPassword: ['', [Validators.required]],
			newPassword: ['', [customPasswordValidator, Validators.required]],
		}
	);

	@ViewChild(FormGroupDirective) formRef!: FormGroupDirective;

	constructor(
		private _router: Router, 
		private _userApiService: UserApiService, 
		private _formBuilder: FormBuilder,
		private _confirmBoxEvokeService: ConfirmBoxEvokeService,
		private _toastEvokeService: ToastEvokeService,
		private _dataUserService: DataUserService
	) {}

	clickSave(): void {
		if (this.formGroup.valid) {
			this._dataUserService.getEmail();

			this._confirmBoxEvokeService
			.warning('Password', '¿Esta seguro de actualizar la contraseña', 'Si', 'Cancelar')
			.pipe(
				concatMap((responseQuestion) =>
					responseQuestion.success ? this._userApiService.changePassword(this._getRequest()) : EMPTY
				),
				concatMap((response) => {
					if (response.success) {
						this._toastEvokeService.success('Exito', 'La contraseña ha sido actualizada.');

						this.formGroup.reset();

						return new Observable<boolean>((subscriber) => {
							subscriber.next(true);
							subscriber.complete();
						});
					}
					return new Observable<boolean>((subscriber) => {
						subscriber.next(false);
						subscriber.complete();
					});
				})
			)
			.subscribe((response) => {
				if (response) {
					console.log("reseteando formulario");
					this.formRef.resetForm();
				}
			});
			
		}
	}

	private _getRequest(): IRequestChangePassword {
		return {
			email: this._dataUserService.getEmail(),
			oldPassword: this.oldPasswordField.value,
			newPassword: this.newPasswordField.value
		};
	}

	get oldPasswordField(): FormControl<string> {
		return this.formGroup.controls.oldPassword;
	}

	get newPasswordField(): FormControl<string> {
		return this.formGroup.controls.newPassword;
	}
	
}
