import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ChannelHeaderService {
	private headerSource = new Subject<boolean>();

	channelHeader = this.headerSource.asObservable();

	showUser(show: boolean): void {
		this.headerSource.next(show);
	}
}
