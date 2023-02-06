//#region  PATH AUTH
const loginPage = 'login';
const registerPage = 'register';
const recoverPasswordPage = 'recovery';
const restorePasswordPage = 'restore';

export const PATHS_AUTH_PAGES = {
	loginPage: {
		withSlash: `/${loginPage}`,
		onlyPath: loginPage
	},
	registerPage: {
		withSlash: `/${registerPage}`,
		onlyPath: registerPage
	},
	recoverPasswordPage: {
		withSlash: `/${recoverPasswordPage}`,
		onlyPath: recoverPasswordPage
	},
	restorePasswordPage: {
		withSlash: `/${restorePasswordPage}`,
		onlyPath: restorePasswordPage
	}
};
//#endregion

//#region  PATH BUY
const buyPage = 'buy';

export const PATH_BUY_PAGES = {
	buyPage: {
		withSlash: `/${buyPage}`,
		onlyPath: buyPage
	}
};
//#endregion

//#region  PATH MAINTENANCE
const maintenancePage = 'maintenance';
const maintenanceBuyPage = 'buy';
const maintenanceEventPage = 'event';
const maintenanceGenrePage = 'genre';
const maintenanceReportPage = 'report';

export const PATH_MAINTENANCE_PAGES = {
	withSlash: `/${maintenancePage}`,
	onlyPath: maintenancePage,

	buy: {
		withSlash: `/${maintenancePage}/${maintenanceBuyPage}`,
		onlyPath: maintenanceBuyPage
	},

	events: {
		withSlash: `/${maintenancePage}/${maintenanceEventPage}`,
		onlyPath: maintenanceEventPage
	},
	genres: {
		withSlash: `/${maintenancePage}/${maintenanceGenrePage}`,
		onlyPath: maintenanceGenrePage
	},
	reports: {
		withSlash: `/${maintenancePage}/${maintenanceReportPage}`,
		onlyPath: maintenanceReportPage
	}
};
//#endregion

//#region  PATH MY ACCOUNT
const myAccountPage = 'my-account';
const myAccountBuyPage = 'buy';
const myAccountChangePasswordPage = 'change-password';

export const PATH_MY_ACCOUNT_PAGES = {
	withSlash: `/${myAccountPage}`,
	onlyPath: myAccountPage,

	buy: {
		withSlash: `/${myAccountPage}/${myAccountBuyPage}`,
		onlyPath: myAccountBuyPage
	},
	changePassword: {
		withSlash: `/${myAccountPage}/${myAccountChangePasswordPage}`,
		onlyPath: myAccountChangePasswordPage
	}
};
//#endregion

//#region NOT FOUND
export const PATH_NOT_FOUND_PAGE = {
	'not-found': {
		withSlash: '/not-found',
		onlyPath: 'not-found'
	}
};
//#endregion
