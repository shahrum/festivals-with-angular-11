import { Injectable, Optional } from "@angular/core";
import { WebApiConfig, ApiError } from "./web-api.models";
import { Observable, of, Subject, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { HttpParams } from "@angular/common/http";
import { environment } from "../../../environments/environment";
@Injectable()
export class WebApiService {

	constructor(
		private http: HttpClient,
	) {
	}


	private errorSubject = new Subject<ApiError>();

	public get<T>(
		api: string,
		useMock: any = null,
		extraHeaders?: { [key: string]: any }
	): Observable<T> {
		let httpOptions: { headers: any } | undefined;
		if (extraHeaders) {
			const headers = new HttpHeaders(extraHeaders);
			httpOptions = {
				headers: headers
			};
		} else {
			httpOptions = undefined;
		}

		if (useMock !== null) {
			return of<T>(useMock);
		}

		return this.http
			.get<T>(this.fullUrl(api))
			.pipe(
				catchError(
					(errorResponse: ApiError, caught: Observable<any>) => {
						console.log("catch an error in get call");
						return this.errorHandler(errorResponse);
					}
				)
			);
	}

	public errorHandler(apiError: ApiError) {
		if (apiError.apiUrl) {
			this.errorSubject.next(apiError);
		}
		return throwError(apiError);
	}

	private fullUrl(api: string): string {
		return environment.apiBaseUrl + api;
	}

	private returnErrorObservable(errorResponse: any, request: any) {
		this.logError(errorResponse, request);
		return throwError(errorResponse || "server error.");
	}

	private logError(errorResponse: any, request: any): void {
		if (errorResponse && errorResponse.error && errorResponse.error.error) {
			// log the erro
		}
	}
}
