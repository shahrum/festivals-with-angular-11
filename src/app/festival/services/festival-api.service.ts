import { IFestival } from '../models/festival.model';
import { Observable } from 'rxjs';
import { WebApiService } from 'src/core/services/http/webapi.service';
import { Injectable } from '@angular/core';
import { festivalMockdata } from './mock-data/festival.mock';
import { randomIntFromInterval } from 'src/utils/random-number.util';

@Injectable({
	providedIn: "root"
})
export class EnergyApiService {
    constructor(private __webApiService: WebApiService) { }

    fetchFestivals(): Observable<IFestival[]> {
        const {getMockFestival, __webApiService} = this;
        const mockData = getMockFestival();
        return __webApiService.get<IFestival[]>('festivals', mockData);
    }

    private getMockFestival(): IFestival[] | string {
        return festivalMockdata[randomIntFromInterval(1, 7)];
    }
}