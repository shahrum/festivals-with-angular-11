import { WebApiService } from 'src/core/services/http/webapi.service';
import { TryCatchMaterialFormsModule } from '../../libs/material-forms/material-forms.module';
import { MaterialModule } from '../../libs/material-module/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FestivalComponent } from './festival/festival.component';
import { Route, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EnergyApiService } from './services/festival-api.service';
import {CapitalizeEachWordPipe} from '../../utils/pipes/capitalize-each-word.pipe';

const routes: Route[] = [
	{
		path: "",
		component: FestivalComponent
	},
];

@NgModule({
  declarations: [FestivalComponent, CapitalizeEachWordPipe],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    TryCatchMaterialFormsModule
  ],
  providers: [WebApiService, EnergyApiService]
})
export class FestivalModule { }
