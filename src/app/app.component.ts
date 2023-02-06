import { Component } from '@angular/core';
import { DemoService } from './commons/services/demo.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	constructor(private _demoService: DemoService) {}
	title = 'musical-event';
}
