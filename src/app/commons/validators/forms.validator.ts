import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

//Esta expresión regular validará si el texto contiene al menos una minuscula, mayuscula, número, symbolo y que la longitud sea igual a 8
const patternPassword = new RegExp('(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\\W).{8}');

export const customPasswordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
	const value = control.value as string;
	if (!patternPassword.test(value)) {
		return { customPasswordValidator: true };
	}
	return null;
};
