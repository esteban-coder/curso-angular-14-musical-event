import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { IResponse } from '../api-models-base.interface';
import { IRequestCreateUpdateConcert, IResponseConcert } from './concert-api-model.interface';

const URL_CONCERT = environment.host + '/Concerts';

@Injectable({
	providedIn: 'root'
})
export class ConcertApiService {
	constructor(private _httpClient: HttpClient) {}

	createConcert(event: IRequestCreateUpdateConcert): Observable<IResponse<number>> {
		return this._httpClient.post<IResponse<number>>(URL_CONCERT, event);
	}

	updateConcert(idEvent: number, event: IRequestCreateUpdateConcert): Observable<IResponse<number>> {
		const url = `${URL_CONCERT}/${idEvent}`;
		return this._httpClient.put<IResponse<number>>(url, event);
	}

	deleteConcert(idEvent: number): Observable<IResponse<number>> {
		const url = `${URL_CONCERT}/${idEvent}`;
		return this._httpClient.delete<IResponse<number>>(url);
	}

	getListConcerts(page?: number, rows?: number, filter?: string): Observable<IResponse<IResponseConcert[]>> {
		let params = new HttpParams();
		if (filter) {
			params = params.set('filter', filter);
		}

		if (page) {
			params = params.set('page', page);
		}

		if (rows) {
			params = params.set('pageSize', rows);
		}

		return this._httpClient.get<IResponse<IResponseConcert[]>>(URL_CONCERT, { params });
	}

	getConcert(id: number): Observable<IResponse<IResponseConcert>> {
		const url = `${URL_CONCERT}/${id}`;
		return this._httpClient.get<IResponse<IResponseConcert>>(url);
	}

	finalizeConcert(idConcert: number): Observable<IResponse> {
		const url = `${URL_CONCERT}/${idConcert}`;
		return this._httpClient.patch<IResponse>(url, {});
	}
}
