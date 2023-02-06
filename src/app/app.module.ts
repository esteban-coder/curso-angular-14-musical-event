import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CardEventComponent } from './commons/components/card-event/card-event.component';
import { ContainerModule } from './commons/components/container/container.module';
import { ErrorInterceptor as ErrorApiInterceptor } from './commons/interceptors/error-api.interceptor';
import { SharedFormCompleteModule } from './commons/shared/shared-form-complete.module';
import { HomePageComponent } from './pages/home-page/home-page.component';

import { registerLocaleData } from '@angular/common';
import LocaleEsPe from '@angular/common/locales/es-PE';
import {
	ConfirmBoxConfigModule,
	DialogConfigModule,
	NgxAwesomePopupModule,
	ToastNotificationConfigModule
} from '@costlydeveloper/ngx-awesome-popup';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { ApiInterceptor } from './commons/interceptors/api.interceptor';

registerLocaleData(LocaleEsPe);

@NgModule({
	declarations: [AppComponent, HomePageComponent],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		HttpClientModule,
		AppRoutingModule,
		ContainerModule,
		SharedFormCompleteModule,
		CardEventComponent,
		NgxUiLoaderModule,
		NgxAwesomePopupModule.forRoot(), // Essential, mandatory main module.
		DialogConfigModule.forRoot(), // Needed for instantiating dynamic components.
		ConfirmBoxConfigModule.forRoot(), // Needed for instantiating confirm boxes.
		ToastNotificationConfigModule.forRoot() // Needed for instantiating toast notifications.
	],
	providers: [
		{ provide: LOCALE_ID, useValue: 'es-PE' },
		{
			provide: HTTP_INTERCEPTORS,
			useClass: ApiInterceptor,
			multi: true
		},
		{
			provide: HTTP_INTERCEPTORS,
			useClass: ErrorApiInterceptor,
			multi: true
		}
	],
	bootstrap: [AppComponent]
})
export class AppModule {}
