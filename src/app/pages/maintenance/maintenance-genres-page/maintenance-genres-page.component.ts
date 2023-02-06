import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormGroupDirective } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmBoxEvokeService } from '@costlydeveloper/ngx-awesome-popup';
import { map, Observable } from 'rxjs';
import { CanComponentDeactivate } from '../../../commons/guards/form-event.guard';
import { IResponseGenre } from '../../../commons/services/api/genre/genre-api-model.interface';
import { GenreApiService } from '../../../commons/services/api/genre/genre-api.service';
import { CRUD_METHOD } from '../../../commons/util/enums';
import { MaintenanceGenresPageService } from './maintenance-genres-page.service';

@Component({
	selector: 'app-maintenance-genres-page',
	templateUrl: './maintenance-genres-page.component.html',
	styleUrls: ['./maintenance-genres-page.component.scss'],
	providers: [MaintenanceGenresPageService]
})
export class MaintenanceGenresPageComponent implements OnInit, AfterViewInit, CanComponentDeactivate {
	@ViewChild('paginator') paginator: MatPaginator | undefined;

	@ViewChild(FormGroupDirective) formRef!: FormGroupDirective;

	//variable para el Tab
	indexTabSaveGenre = 0;

	// variables para la tabla
	displayedColumns: string[] = [
		'description',
		'status',
		'action'
	];

	dataSource = new MatTableDataSource<IResponseGenre>();
	pageSizeOptions: number[] = [2, 4, 8];
	private _rowsPageBack = 4;
	private _numberPageBack = 1;

	//#region getters Form
	idField = this._maintenanceGenresPageService.idField;
	descriptionField = this._maintenanceGenresPageService.descriptionField;
	statusField = this._maintenanceGenresPageService.statusField;
	//#region

	private _crudMethod = CRUD_METHOD.SAVE;

	constructor(
		private _genreApiService: GenreApiService,
		private _maintenanceGenresPageService: MaintenanceGenresPageService,
		private _confirmBoxEvokeService: ConfirmBoxEvokeService
	) {}

	formGroup = this._maintenanceGenresPageService.formGroup;

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
		if (this.formGroup.valid) {
			this._maintenanceGenresPageService.saveGenre(this._crudMethod).subscribe((response) => {
				if (response) {
					this.formRef.resetForm();
					this._loadGenres();
				}
			});
		}
	}

	clickClear(): void {
		this._crudMethod = CRUD_METHOD.SAVE;
		this.formRef.resetForm();
	}

	clickUpdate(idGenre: number): void {
		this._maintenanceGenresPageService.updateForm(idGenre).subscribe((response) => {
			if (response.success) {
				this.indexTabSaveGenre = 0;
				this._crudMethod = CRUD_METHOD.UPDATE;
			}
		});
	}

	clickDelete(idGenre: number): void {
		this._maintenanceGenresPageService.deleteGenre(idGenre).subscribe((response) => {
			if (response) {
				this.dataSource.data = this.dataSource.data.filter((item) => item.id !== idGenre);
			}
		});
	}

	getPaginatorData(): void {
		console.log("getPaginatorData");
		if (!this.paginator?.hasNextPage()) {
			console.log("!hasNextPage" + this._numberPageBack);
			this._numberPageBack++;
			this._loadGenres();
		}
	}

	private _loadGenres(): void {
		this._genreApiService.getListGenres(this._numberPageBack, this._rowsPageBack).subscribe((response) => {
			console.log(response);
			if (response.success) {
				if (response.data.length > 0) {
					this.dataSource.data = this._maintenanceGenresPageService.getDataGenres(
						[...this.dataSource.data],
						response.data
					);
				} else {
					this._numberPageBack--;
				}
			}
		});
	}

}
