import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormGroupDirective } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmBoxEvokeService } from '@costlydeveloper/ngx-awesome-popup';
import { map, Observable } from 'rxjs';
import { CanComponentDeactivate } from '../../../commons/guards/form-event.guard';
import { IResponseConcert } from '../../../commons/services/api/concerts/concert-api-model.interface';
import { IResponseGenre } from '../../../commons/services/api/genre/genre-api-model.interface';
import { GenreApiService } from '../../../commons/services/api/genre/genre-api.service';
import { CRUD_METHOD } from '../../../commons/util/enums';
import { ConcertApiService } from './../../../commons/services/api/concerts/concert-api.service';
import { MaintenanceEventsPageService } from './maintenance-events-page.service';

@Component({
	selector: 'app-maintenance-events-page',
	templateUrl: './maintenance-events-page.component.html',
	styleUrls: ['./maintenance-events-page.component.scss'],
	providers: [MaintenanceEventsPageService]
})
export class MaintenanceEventsPageComponent implements OnInit, AfterViewInit, CanComponentDeactivate {
	@ViewChild('paginator') paginator: MatPaginator | undefined;

	@ViewChild(FormGroupDirective) formRef!: FormGroupDirective;

	listGenres: IResponseGenre[] = [];

	//variable para el Tab
	indexTabSaveEvent = 0;

	// variables para la tabla
	displayedColumns: string[] = [
		'imageUrl',
		'title',
		'description',
		'dateEvent',
		'ticketsQuantity',
		'price',
		'genre',
		'status',
		'action'
	];

	dataSource = new MatTableDataSource<IResponseConcert>();
	pageSizeOptions: number[] = [2, 4, 6];
	private _rowsPageBack = 4;
	private _numberPageBack = 1;

	//#region getters Form
	idField = this._maintenanceEventsPageService.idField;
	titleField = this._maintenanceEventsPageService.titleField;
	descriptionField = this._maintenanceEventsPageService.descriptionField;
	dateField = this._maintenanceEventsPageService.dateField;
	hourField = this._maintenanceEventsPageService.hourField;
	ticketsQuantityField = this._maintenanceEventsPageService.ticketsQuantityField;
	priceField = this._maintenanceEventsPageService.priceField;
	placeField = this._maintenanceEventsPageService.placeField;
	genreField = this._maintenanceEventsPageService.genreField;
	statusField = this._maintenanceEventsPageService.statusField;
	imageField = this._maintenanceEventsPageService.imageField;
	fileNameField = this._maintenanceEventsPageService.fileNameField;
	//#region

	private _crudMethod = CRUD_METHOD.SAVE;

	constructor(
		private _genreApiService: GenreApiService,
		private _maintenanceEventsPageService: MaintenanceEventsPageService,
		private _eventApiService: ConcertApiService,
		private _confirmBoxEvokeService: ConfirmBoxEvokeService
	) {}

	formGroup = this._maintenanceEventsPageService.formGroup;

	canDeactivate(): Observable<boolean> | boolean {
		const values = this.formGroup.getRawValue();

		const isThereDataEntered = Object.values(values).find((item) => item);
		if (!isThereDataEntered) {
			return true;
		}

		return this._confirmBoxEvokeService
			.warning('Advertencia', 'Los datos ingresados se perderán, ¿Esta seguro que desea salir?', 'Si', 'Cancelar')
			.pipe(map((response) => response.success));
	}

	ngOnInit(): void {
		this._loadEvents();
		this._loadGenres();
	}

	ngAfterViewInit(): void {
		this.dataSource.paginator = this.paginator!;
	}

	applyFilter(event: Event): void {
		const filterValue = (event.target as HTMLInputElement).value;
		this.dataSource.filter = filterValue.trim().toLowerCase();
	}

	clickSave(): void {
		console.log("Events.clickSave");
		console.log(this.formGroup);
		if (this.formGroup.valid) {
			console.log("Events.clickSave 01");
			this._maintenanceEventsPageService.saveEvent(this._crudMethod).subscribe((response) => {
				if (response) {
					this.formRef.resetForm();
					this._loadEvents();
				}
			});
		}
	}

	clickClear(): void {
		this._crudMethod = CRUD_METHOD.SAVE;
		this.formRef.resetForm();
	}

	clickUpdate(idEvent: number): void {
		this._maintenanceEventsPageService.updateForm(idEvent).subscribe((response) => {
			if (response.success) {
				this.indexTabSaveEvent = 0;
				this._crudMethod = CRUD_METHOD.UPDATE;
			}
		});
	}

	clickDelete(idEvent: number): void {
		this._maintenanceEventsPageService.deleteEvent(idEvent).subscribe((response) => {
			if (response) {
				this.dataSource.data = this.dataSource.data.filter((item) => item.id !== idEvent);
			}
		});
	}

	clickFinalize(idEvent: number): void {
		this._maintenanceEventsPageService.endEvent(idEvent);
	}

	onFileSelected(event: Event): void {
		const htmlInput: HTMLInputElement = event.target as HTMLInputElement;
		if (htmlInput && htmlInput.files && htmlInput.files.length > 0) {
			const reader = new FileReader();
			reader.readAsDataURL(htmlInput.files[0]);
			reader.onload = () => {
				const resultImageFile = reader.result!.toString();

				this.fileNameField.setValue(htmlInput.files![0].name);
				this.imageField.setValue(resultImageFile);
			};
		}
	}

	getPaginatorData(): void {
		if (!this.paginator?.hasNextPage()) {
			this._numberPageBack++;
			this._loadEvents();
		}
	}

	private _loadEvents(): void {
		this._eventApiService.getListConcerts(this._numberPageBack, this._rowsPageBack).subscribe((response) => {
			if (response.success) {
				if (response.data.length > 0) {
					this.dataSource.data = this._maintenanceEventsPageService.getDataEvents(
						[...this.dataSource.data],
						response.data
					);
				} else {
					this._numberPageBack--;
				}
			}
		});
	}

	private _loadGenres(): void {
		this._genreApiService.getGenres().subscribe((response) => {
			if (response && response.data) {
				this.listGenres = response.data;
			}
		});
	}
}
