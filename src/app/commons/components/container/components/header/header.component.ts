import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PATHS_AUTH_PAGES } from 'src/app/commons/config/path-pages';
import { IDataUser } from 'src/app/commons/models/data-user';
import { SessionStorageService } from 'src/app/commons/services/local/storage/storage.service';
import { KEYS_WEB_STORAGE } from 'src/app/commons/util/enums';
import { ChannelHeaderService } from './../../../../services/local/channel-header.service';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
	isLogged = false;
	usuario? : string;

	constructor(
		private _channelHeaderService: ChannelHeaderService, 
		private _sessionStorageService: SessionStorageService,
		private _router: Router)
	{
		this._channelHeaderService.channelHeader.subscribe((response) => {
			console.log('****channelHeader value:***', response);
			this.isLogged = response;
			if(response){
				const dataUser = this._sessionStorageService.getItem<IDataUser>(KEYS_WEB_STORAGE.DATA_USER);
				this.usuario = dataUser?.fullName;
			}
		});
	}

	ngOnInit(): void {
		console.log('**HeaderComponent**');
	}

	logout(): void {
		this._channelHeaderService.showUser(false);
		this._sessionStorageService.clear();
		void this._router.navigateByUrl(PATHS_AUTH_PAGES.loginPage.withSlash);
	}
}
