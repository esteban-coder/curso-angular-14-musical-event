import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PATH_BUY_PAGES } from '../../commons/config/path-pages';
import { ICardEvent } from '../../commons/models/components.interface';
import { IHomeGenres } from '../../commons/services/api/home/home-api.interface';
import { HomeApiService } from '../../commons/services/api/home/home-api.service';

@Component({
	selector: 'app-home-page',
	templateUrl: './home-page.component.html',
	styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
	listGenres: IHomeGenres[] = [];
	listEvents: ICardEvent[] = [];

	constructor(private _homeApiService: HomeApiService, private _router: Router) {}

	ngOnInit(): void {
		this._loadHome();
	}

	clickCard(event: ICardEvent): void {
		void this._router.navigate([PATH_BUY_PAGES.buyPage.withSlash], { state: { event } });
	}

	private _loadHome() {
		this._homeApiService.getHome().subscribe((response) => {
			this.listGenres = response.genres;
			this.listEvents = response.getDataCardEvent();
		});
	}
}
