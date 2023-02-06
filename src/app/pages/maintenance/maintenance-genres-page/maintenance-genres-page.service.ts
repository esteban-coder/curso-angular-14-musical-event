import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmBoxEvokeService, ToastEvokeService } from '@costlydeveloper/ngx-awesome-popup';
import { concatMap, EMPTY, Observable, tap } from 'rxjs';
import { IRequestCreateUpdateGenre, IResponseGenre } from 'src/app/commons/services/api/genre/genre-api-model.interface';
import { IResponse } from '../../../commons/services/api/api-models-base.interface';

import { GenreApiService } from '../../../commons/services/api/genre/genre-api.service';
import { CRUD_METHOD, STATUS_CRUD } from '../../../commons/util/enums';

@Injectable()
export class MaintenanceGenresPageService {
	formGroup!: FormGroup<IGenreForm>;

	constructor(
		private _confirmBoxEvokeService: ConfirmBoxEvokeService,
		private _toastEvokeService: ToastEvokeService,
		private _genreApiService: GenreApiService,
		private _formBuilder: FormBuilder
	) {
		this._loadFormGroup();
	}

	deleteGenre(idGenre: number): Observable<boolean> {
		return this._confirmBoxEvokeService.warning('Genero', '¿Esta seguro de eliminar el Genero?', 'Si', 'Cancelar').pipe(
			concatMap((responseQuestion) =>
				responseQuestion.success ? this._genreApiService.deleteGenre(idGenre) : EMPTY
			),
			concatMap((response) => {
				if (response.success) {
					this._toastEvokeService.success('Exito', 'El genero ha sido eliminado');
					return this._succes(true);
				}
				return this._succes(false);
			})
			// catchError((error) => {
			// 	this._toastEvokeService.danger('Error', 'No pudimos encontrar lo solicitado, intenta más tarde.');
			// 	return throwError(() => error);
			// })
		);
	}

	updateForm(idGenre: number): Observable<IResponse<IResponseGenre>> {
		return this._genreApiService.getGenre(idGenre).pipe(
			tap((response) => {
				if (response.success) {
					const genreResponse = response.data;

					this.idField.setValue(genreResponse.id);
					this.descriptionField.setValue(genreResponse.name);
					this.statusField.setValue(genreResponse.status ? STATUS_CRUD.ACTIVO : STATUS_CRUD.INACTIVO);
				}
			})
		);
	}

	getDataGenres(existingData: IResponseGenre[], responseGenres: IResponseGenre[]): IResponseGenre[] {
		if (existingData && existingData.length > 0) {
			/**
			 * Buscamos si los item de la respuesta existen en la data actual de la tabla, si existieran entonces nos quedamos con esos nuevos item para tener los datos actualizados
			 */
			let newArray = responseGenres.filter((genreResponse) => {
				return existingData.some((genre) => genre.id === genreResponse.id);
			});

			/**
			 * Si no existiera alguna coincidencias entonces los items de la respuesta son nuevos asi que lo agregamos a la data existente.
			 *
			 * Si existiera coincidencias entonces solo queda filtrar los item que son distintos entre ambas listas, una vez obtenido esa diferencia la concatenamos con los datos actualizados de los registros existentes
			 */
			if (newArray.length === 0) {
				newArray = existingData.concat(responseGenres);
			} else {
				newArray = existingData
					.filter((genre) => {
						return !responseGenres.some((genreResponse) => genreResponse.id === genre.id);
					})
					.concat(newArray);
			}
			// si quisieran ordenar los generos de manera decendente por id, podemos usar la función sort
			// newArray = newArray.sort((a, b) => b.id - a.id);

			
			return newArray;
		}
		console.log(responseGenres);
		return responseGenres;
	}

	saveGenre(method: CRUD_METHOD): Observable<boolean> {
		return this._confirmBoxEvokeService
			.warning('Genero', '¿Esta seguro de guardar la información?', 'Si', 'Cancelar')
			.pipe(
				concatMap((responseQuestion) =>
					responseQuestion.success ? this._getMethod(method, this._getRequest(method)) : EMPTY
				),
				concatMap((response) => {
					if (response.success) {
						this._toastEvokeService.success('Exito', 'La información ha sido guardada.');
						return this._succes(true);
					}

					return this._succes(false);
				})
			);
	}

	/**
	 * En esta función vamos a retornar el genero que deseamos guardar o modificar.
	 * @param method
	 * @returns
	 */
	private _getRequest(method: CRUD_METHOD): IRequestCreateUpdateGenre {
		const request: IRequestCreateUpdateGenre = <IRequestCreateUpdateGenre>{
			name: this.descriptionField.value,
			status: this.statusField.value == 0 ? false: true
		};

		return request;
	}

	private _getMethod(method: CRUD_METHOD, request: IRequestCreateUpdateGenre): Observable<IResponse<number>> {
		const idGenre = this.idField.value as number;

		return method === CRUD_METHOD.SAVE
			? this._genreApiService.createGenre(request)
			: this._genreApiService.updateGenre(idGenre, request);
	}

	private _succes(isSucces: boolean): Observable<boolean> {
		return new Observable<boolean>((subscriber) => {
			subscriber.next(isSucces);
			subscriber.complete();
		});
	}

	//#region  load Form and getters y setters

	private _loadFormGroup(): void {
		this.formGroup = this._formBuilder.group<IGenreForm>({
			id: new FormControl(0, Validators.required),
			description: new FormControl('', { nonNullable: true, validators: Validators.required }),
			status: new FormControl(0, { nonNullable: true, validators: Validators.required })
		});
	}

	get idField(): FormControl<number | null> {
		return this.formGroup.controls.id;
	}

	get descriptionField(): FormControl<string> {
		return this.formGroup.controls.description;
	}

	get statusField(): FormControl<number> {
		return this.formGroup.controls.status;
	}

	//#endregion
}

export interface IGenreForm {
	id: FormControl<number | null>;
	description: FormControl<string>;
	status: FormControl<number>;
}
