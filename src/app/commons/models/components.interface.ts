//#endregion CARD-EVENT
export interface ICardEvent {
	idEvent: number;
	urlImage: string;
	title: string;
	description: string;
	date: string;
	hour: string;
	price: number;
	genre: string;
	place: string;
}
//#endregion

//#endregion CARD MENU
export interface ICardMenu {
	title: string;
	nameImage: string;
	active: boolean;
	path: string;
}
//#endregion
