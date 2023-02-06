export interface IResponseHome {
	genres: IHomeGenres[];
	concerts: IHomeConcerts[];
	succes: boolean;
}

export interface IHomeConcerts {
	id: number;
	title: string;
	place: string;
	dateEvent: string;
	timeEvent: string;
	genre: string;
	imageUrl: string;

	description: string;
	ticketsQuantity: number;
	unitPrice: number;
	status: string;
}

export interface IHomeGenres {
	id: number;
	name: string;
	status: boolean;
}
