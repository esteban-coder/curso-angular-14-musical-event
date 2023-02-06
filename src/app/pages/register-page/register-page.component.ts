import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { PATHS_AUTH_PAGES } from '../../commons/config/path-pages';
import { IRequestRegister } from '../../commons/services/api/user/user-api-model.interface';
import { UserApiService } from '../../commons/services/api/user/user-api.service';
import { customPasswordValidator } from '../../commons/validators/forms.validator';
import { crossPasswordMatchingValidatior, PasswordStateMatcher } from './register-custom-validators';

@Component({
	selector: 'app-register-page',
	templateUrl: './register-page.component.html',
	styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent {
	readonly pathLogin = PATHS_AUTH_PAGES.loginPage.withSlash;

	constructor(private _router: Router, private _userApiService: UserApiService, private _formBuilder: FormBuilder) {}

	passwordStateMatcher = new PasswordStateMatcher();
	disabledButton = false;

	formGroup = this._formBuilder.nonNullable.group(
		{
			firstName: ['', [Validators.required]],
			lastName: ['', Validators.required],
			typeDocument: new FormControl<number | null>(null, Validators.required),
			documentNumber: ['', [Validators.required]],
			email: ['', [Validators.required, Validators.email]],
			password: ['', [customPasswordValidator, Validators.required]],
			confirmPassword: ['', [Validators.required]],
			age: new FormControl<number | null>(null)
		},
		{
			validators: crossPasswordMatchingValidatior
		}
	);

	clickRegister(): void {
		if (this.formGroup.valid) {
			this._userApiService
				.register(this._getRequest())
				.pipe(finalize(() => (this.disabledButton = false)))
				.subscribe({
					next: (response) => {
						if (response.success) {
							void this._router.navigateByUrl(PATHS_AUTH_PAGES.loginPage.withSlash);
							return;
						}
					}
				});
		}
	}

	private _getRequest(): IRequestRegister {
		// return this.formGroup.getRawValue() as IRequestRegister;
		return {
			firstName: this.firtsField.value,
			lastName: this.lastNameField.value,
			documentType: this.typeDocumentField.value!.toString(),
			documentNumber: this.documentNumberField.value,
			email: this.emailField.value,
			password: this.passwordField.value,
			confirmPassword: this.confirmPasswordField.value,
			age: this.ageField.value ? this.ageField.value : undefined
		};
	}

	get firtsField(): FormControl<string> {
		return this.formGroup.controls.firstName;
	}

	get lastNameField(): FormControl<string> {
		return this.formGroup.controls.lastName;
	}

	get typeDocumentField(): FormControl<number | null> {
		return this.formGroup.controls.typeDocument;
	}

	get documentNumberField(): FormControl<string> {
		return this.formGroup.controls.documentNumber;
	}

	get emailField(): FormControl<string> {
		return this.formGroup.controls.email;
	}

	get passwordField(): FormControl<string> {
		return this.formGroup.controls.password;
	}

	get confirmPasswordField(): FormControl<string> {
		return this.formGroup.controls.confirmPassword;
	}

	get ageField(): FormControl<number | null> {
		return this.formGroup.controls.age;
	}
}
