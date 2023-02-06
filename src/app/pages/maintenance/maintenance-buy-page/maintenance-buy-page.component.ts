import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { IResponseListSales } from '../../../commons/services/api/sale/sale-api-model.interface';
import { IResponseGenre } from './../../../commons/services/api/genre/genre-api-model.interface';
import { GenreApiService } from './../../../commons/services/api/genre/genre-api.service';
import { SaleApiService } from './../../../commons/services/api/sale/sale-api.service';

@Component({
	selector: 'app-maintenance-buy-page',
	templateUrl: './maintenance-buy-page.component.html',
	styleUrls: ['./maintenance-buy-page.component.scss']
})
export class MaintenanceBuyPageComponent implements OnInit, AfterViewInit {
	@ViewChild('paginator') paginator?: MatPaginator;

	displayedColumns: string[] = [
		'customer',
		'event',
		'ticketsQuantity',
		'totalSale',
		'saleDate',
		'saleDate',
		'dateEvent'
	];

	listGenres: IResponseGenre[] = [];
	dataSource = new MatTableDataSource<IResponseListSales>();

	formGroup = this._formBuilder.group({
		genre: [0, Validators.required],
		dateInit: [new Date(), Validators.required],
		dateEnd: [new Date(), Validators.required]
	});

	constructor(
		private _genreApiService: GenreApiService,
		private _saleApiService: SaleApiService,
		private _formBuilder: FormBuilder,
		private _datePipe: DatePipe
	) {}

	ngOnInit(): void {
		this._getGenders();
		this._loadBuys();
	}

	ngAfterViewInit(): void {
		this.dataSource.paginator = this.paginator!;
	}

	applyFilter(event: Event): void {
		const filterValue = (event.target as HTMLInputElement).value;
		this.dataSource.filter = filterValue.trim().toLowerCase();
	}

	clickQuery(): void {
		this._loadEvents();
	}

	clickClear(): void {
		this.formGroup.reset();
	}

	private _loadEvents(): void {
		if ((this, this.formGroup.valid)) {
			const startDate = this._datePipe.transform(this.formGroup.controls.dateInit.value, 'yyyy-MM-dd')!;
			const endDate = this._datePipe.transform(this.formGroup.controls.dateEnd.value, 'yyyy-MM-dd')!;

			this._saleApiService.getListSales({ startDate, endDate }).subscribe((response) => {
				if (response && response.success) {
					this.dataSource.data = response.data;
				}
			});
		}
	}

	private _loadBuys(): void {
		const startDate = this._datePipe.transform(new Date(), 'yyyy-MM-dd')!;
		const endDate = this._datePipe.transform(new Date(), 'yyyy-MM-dd')!;
		const genreId = this.formGroup.controls.genre.value!;

		this._saleApiService.getListSales({ startDate, endDate }).subscribe((response) => {
			if (response && response.success) {
				this.dataSource.data = response.data;
			}
		});
	}

	private _getGenders(): void {
		this._genreApiService.getGenres().subscribe((response) => {
			if (response && response.success) {
				this.listGenres = response.data;
				this.formGroup.controls.genre.setValue(this.listGenres[0].id);
			}
		});
	}
}
