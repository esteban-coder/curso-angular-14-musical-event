import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { IRequestListSalesByUser, IResponseListSales } from 'src/app/commons/services/api/sale/sale-api-model.interface';
import { SaleApiService } from 'src/app/commons/services/api/sale/sale-api.service';

@Component({
	selector: 'app-account-buy-page',
	templateUrl: './account-buy-page.component.html',
	styleUrls: ['./account-buy-page.component.scss']
})
export class AccountBuyPageComponent implements OnInit, AfterViewInit {

	@ViewChild('paginator') paginator: MatPaginator | undefined;

	displayedColumns: string[] = [
		'operationNumber',
		'title',
		'quantity',
		'total',
		'saleDate',
		'dateEvent'
	];

	dataSource = new MatTableDataSource<IResponseListSales>();

	pageSizeOptions: number[] = [2, 4, 6];
	private pageSize = 4;
	private page = 1;

	constructor(
		private _saleApiService: SaleApiService
	) {}

	ngOnInit(): void {
		this._loadBuys();
	}

	ngAfterViewInit(): void {
		this.dataSource.paginator = this.paginator!;
	}

	applyFilter(event: Event): void {
		const filterValue = (event.target as HTMLInputElement).value;
		this.dataSource.filter = filterValue.trim().toLowerCase();
	}

	getPaginatorData(): void {
		if (!this.paginator?.hasNextPage()) {
			this.page++;
			this._loadBuys();
		}
	}

	private _loadBuys(): void {
		var request : IRequestListSalesByUser = <IRequestListSalesByUser>{
			page: this.page,
			pageSize: this.pageSize
		};
		this._saleApiService.getSalesUser(request).subscribe((response) => {
			if (response && response.success) {
				if (response.data.length > 0) {
					this.dataSource.data = this.getDataGenres(
						[...this.dataSource.data],
						response.data
					);
				} else {
					this.page--;
				}
			}
		});
	}

	private getDataGenres(existingData: IResponseListSales[], responseSales: IResponseListSales[]): IResponseListSales[] {
		if (existingData && existingData.length > 0) {
			/**
			 * Buscamos si los item de la respuesta existen en la data actual de la tabla, si existieran entonces nos quedamos con esos nuevos item para tener los datos actualizados
			 */
			let newArray = responseSales.filter((saleResponse) => {
				return existingData.some((sale) => sale.saleId === saleResponse.saleId);
			});

			/**
			 * Si no existiera alguna coincidencias entonces los items de la respuesta son nuevos asi que lo agregamos a la data existente.
			 *
			 * Si existiera coincidencias entonces solo queda filtrar los item que son distintos entre ambas listas, una vez obtenido esa diferencia la concatenamos con los datos actualizados de los registros existentes
			 */
			if (newArray.length === 0) {
				newArray = existingData.concat(responseSales);
			} else {
				newArray = existingData
					.filter((sale) => {
						return !responseSales.some((saleResponse) => saleResponse.saleId === sale.saleId);
					})
					.concat(newArray);
			}
			// si quisieran ordenar los generos de manera decendente por id, podemos usar la función sort
			// newArray = newArray.sort((a, b) => b.id - a.id);

			
			return newArray;
		}
		console.log(responseSales);
		return responseSales;
	}
}
