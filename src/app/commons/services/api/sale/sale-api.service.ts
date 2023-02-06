import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from './../../../../../environments/environment';
import { IResponse } from './../api-models-base.interface';
import {
	IRequestCreateSale,
	IRequestListSalesByGenre,
	IRequestListSalesByUser,
	IResponseListSales,
	IResponseSale
} from './sale-api-model.interface';

const URL_SALE = environment.host + '/Sales';
const URL_SALE_GET = URL_SALE + '/Get';
const URL_CREATE_SALE = URL_SALE + '/Create';
const URL_LIST_SALE = URL_SALE + '/ListSales';
const URL_LIST_SALE_BY_GENRE = URL_SALE + '/ListSalesByGenre';

@Injectable({
	providedIn: 'root'
})
export class SaleApiService {
	constructor(private _httpClient: HttpClient) {}

	createSale(sale: IRequestCreateSale): Observable<IResponse<number>> {
		return this._httpClient.post<IResponse<number>>(URL_CREATE_SALE, sale);
	}

	getSale(idSale: number): Observable<IResponse<IResponseSale>> {
		return this._httpClient.get<IResponse<IResponseSale>>(`${URL_SALE_GET}/${idSale}`);
	}

	getSalesUser(request: IRequestListSalesByUser): Observable<IResponse<IResponseListSales[]>> {
		let params = new HttpParams();
		if (request.page) {
			params = params.set('page', request.page);
		}
		if (request.pageSize) {
			params = params.set('pageSize', request.pageSize);
		}

		return this._httpClient.get<IResponse<IResponseListSales[]>>(URL_LIST_SALE, { params });
	}

	getListSales(request: IRequestListSalesByGenre): Observable<IResponse<IResponseListSales[]>> {
		let params = new HttpParams().set('startDate', request.startDate).set('endDate', request.endDate);
		if (request.page) {
			params = params.set('page', request.page);
		}
		if (request.pageSize) {
			params = params.set('pageSize', request.pageSize);
		}

		return this._httpClient.get<IResponse<IResponseListSales[]>>(URL_LIST_SALE_BY_GENRE, { params });
	}
}
