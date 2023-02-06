import {
	HttpErrorResponse,
	HttpEvent,
	HttpHandler,
	HttpInterceptor,
	HttpRequest,
	HttpResponse
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastEvokeService } from '@costlydeveloper/ngx-awesome-popup';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { catchError, finalize, Observable, tap, throwError } from 'rxjs';
import { IResponse } from '../services/api/api-models-base.interface';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
	constructor(private _toastEvokeService: ToastEvokeService, private _ngxService: NgxUiLoaderService) {}

	intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
		this._ngxService.start();

		return next.handle(request).pipe(
			finalize(() => this._ngxService.stop()),
			tap((response) => {
				if (response instanceof HttpResponse && response.status === 200) {
					const responseModel = response.body as IResponse;
					this._captureResponse200(responseModel);
				}
				return response;
			}),
			catchError((error: HttpErrorResponse) => {
				this.errorsHttpClient(error);
				return throwError(() => error);
			})
		);
	}

	private errorsHttpClient(httpErrorResponse: HttpErrorResponse): void {
		switch (httpErrorResponse.status) {
			case 0:
			case 500:
			case 400:
				this._toastEvokeService.danger('Error', 'Ups,ocurrio un error inesperado, intenta nuevamente.');
				break;
			case 404:
				this._toastEvokeService.danger('Error', 'No pudimos encontrar lo solicitado, intenta más tarde.');
				break;
		}
	}

	private _captureResponse200(response: IResponse) {
		if (!response.success) {
			this._toastEvokeService.danger('Error', response.errorMessage);
		}
	}
}
