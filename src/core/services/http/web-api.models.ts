import { HttpErrorResponse } from "@angular/common/http";

export interface JsonFileError {
	fileUrl: string;
	error: HttpErrorResponse;
}

export interface WebApiResponse {
	messageDetails: ResponseMessageDetails;
	result: ResponseResult;
}

export interface ResponseMessageDetails {
	api: string;
	versionApi: string;
}

export interface ResponseResult {
	error: any;
	data: any;
}

export class WebApiConfig {
	tokenKey: string;
	baseUrl: string;
	redirectUrl: string;
	timeout?: number;
	mockDataLocation?: string;
}

export interface ApiError {
	method: string;
	apiUrl: string;
	error: HttpErrorResponse;
}
