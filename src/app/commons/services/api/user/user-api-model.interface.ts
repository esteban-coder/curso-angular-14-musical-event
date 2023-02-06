//#region  LOGIN
export interface IRequestLogin {
	user: string;
	password: string;
}

export interface IResponseLogin {
	token: string;
	fullName: string;
	roles: string[];
	success: boolean;
	errorMessage: string[];
}
//#endregion

//#region  REGISTER
export interface IRequestRegister {
	firstName: string;
	lastName: string;
	documentType: string;
	documentNumber: string;
	email: string;
	password: string;
	confirmPassword: string;
	age?: number;
}
//#endregion

//#region  RESET PASWWORD
export interface IRequestResetPassword {
	email: string;
	token: string;
	newPassword: string;
}
//#endregion

//#region  CHANGE PASWWORD
export interface IRequestChangePassword {
	email: string;
	oldPassword: string;
	newPassword: string;
}
//#endregion
