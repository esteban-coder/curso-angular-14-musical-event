//#region  GET GENRES
export interface IResponseGenre {
	id: number;
	name: string;
	status: boolean;
}
//#endregion

//#region CREATE GENRE
export interface IRequestCreateUpdateGenre {
	name: string;
	status: boolean;
}
//#endregion
