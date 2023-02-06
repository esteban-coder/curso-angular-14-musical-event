import { ICardEvent } from '../../../models/components.interface';
import { IHomeConcerts, IHomeGenres, IResponseHome } from './home-api.interface';

export class ResponseHome {
	genres!: IHomeGenres[];
	events: IHomeConcerts[];

	constructor(data: IResponseHome) {
		this.genres = data.genres;
		this.events = data.concerts;
	}

	getDataCardEvent(): ICardEvent[] {
		return this.events.map((item) => {
			const event: ICardEvent = {
				idEvent: item.id,
				urlImage: item.imageUrl,
				title: item.title,
				description: item.description,
				date: item.dateEvent,
				hour: item.timeEvent,
				price: item.unitPrice,
				genre: item.genre,
				place: item.place
			};

			return event;
		});
	}
}
