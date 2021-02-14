import { AfterViewChecked, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { delay, take, takeUntil } from 'rxjs/operators';
import { IFestival } from '../models/festival.model';
import { EnergyApiService } from '../services/festival-api.service';

@Component({
  selector: 'app-festival',
  templateUrl: './festival.component.html',
  styleUrls: ['./festival.component.scss']
})
export class FestivalComponent implements OnInit, AfterViewChecked {
  _form: FormGroup;
  _replacementMap: [RegExp, string][] = [[/^\s+|\s+$/, ""]];
  _festivals: {[key: string]:  IFestival[]};
  _loading = false;
  private __unsubscribeAll: Subject<any>;

  constructor(
    private __fb: FormBuilder,
    private readonly changeDetectorRef: ChangeDetectorRef,
    private __energyApiService: EnergyApiService
  ) {
    this.__unsubscribeAll = new Subject();
  }
  ngOnInit(): void {
    this.__buildForm();
    this._fetchFestivals();
  }

  ngAfterViewChecked(): void {
    this.changeDetectorRef.detectChanges();
  }

  ngOnDestroy() {
		this.__unsubscribeAll.next();
		this.__unsubscribeAll.complete();
	}

  
  _handleNameErr(data: any) {
		return data?.nameInvalid?.message;
	}

  getItemValue(item: any): any[] {
    return item.value;
  }
  _fetchFestivals() {
    this._festivals = {};
    this._loading = true;
    this.__energyApiService.fetchFestivals().pipe(take(1), delay(1000)).subscribe(res$ => {
      if (res$?.length) {
        const mappedBands = res$.map(res => res?.bands ? res?.bands.map(response => {
          return {...response, festivalName: res?.name}
        }) : null).flat();
        let recordLabelObject: any = {};
        let alreadyMappedBands: any = [];
        for( let i = 0; i < mappedBands.length; i++) {
          const recordLabel = mappedBands[i]?.recordLabel;
          if (recordLabel) {
            const allBandsWithSameRecordLabel = mappedBands.filter(b => b?.recordLabel === mappedBands[i]?.recordLabel && !alreadyMappedBands.includes(mappedBands[i]?.recordLabel));
            if (allBandsWithSameRecordLabel?.length) recordLabelObject[recordLabel] = allBandsWithSameRecordLabel;
            alreadyMappedBands.push(recordLabel);
          }
        }
        
        this._festivals = recordLabelObject;
      }
      this._loading = false;
    }, error => console.error(error));
  }
  private __buildForm(): void {
		this._form = this.__fb.group({
			search: "",
		});
    this._form.valueChanges.pipe(takeUntil(this.__unsubscribeAll)).subscribe(search => {
      console.log("search", search)
    })
	}

}
