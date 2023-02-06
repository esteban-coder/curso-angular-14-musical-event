export interface IResponse<T = void> {
	data: T; // data: IResponseGenre[]
	success: boolean;
	errorMessage: string;
}
