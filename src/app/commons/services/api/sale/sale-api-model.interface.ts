//#region CREATE SALE
export interface IRequestCreateSale {
	concertId: number;
	ticketsQuantity: number;
}

//#endregion

//#region ListSalesByGenre
export interface IRequestListSalesByGenre {
	startDate: string;
	endDate: string;
	page?: number;
	pageSize?: number;
}
//#endregion

export interface IRequestListSalesByUser {
	page?: number;
	pageSize?: number;
}

//#region ListSales
export interface IResponseListSales {
	saleId: number;
	customerName: string;
	concertName: string;
	ticketsQuantity: number;
	totalPrice: number;
	saleDate: string;
	concertDate: string;
}
//#endregion

//#region get sale
export interface IResponseSale {
	id: number;
	dateEvent: string;
	genre: string;
	imageUrl: string;
	title: string;
	operationNumber: string;
	fullName: string;
	quantity: number;
	saleDate: string;
	totalSale: number;
}
//#endregion
