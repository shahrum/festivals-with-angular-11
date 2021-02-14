import { NgModule } from "@angular/core";

import { MatRippleModule } from "@angular/material/core";

import { MAT_DATE_LOCALE, MatNativeDateModule } from "@angular/material/core";

import { MatStepperModule } from "@angular/material/stepper";
import { MatCommonModule } from "@angular/material/core";

import { MatDialogModule } from "@angular/material/dialog";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatTabsModule } from "@angular/material/tabs";
import { MatRadioModule } from "@angular/material/radio";
import { MatSelectModule } from "@angular/material/select";
import { MatInputModule } from "@angular/material/input";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatMenuModule } from "@angular/material/menu";
import { MatButtonModule } from "@angular/material/button";
import {MatTreeModule} from '@angular/material/tree';

const materialDesignModules = [
	MatButtonModule,
	MatMenuModule,
	MatToolbarModule,
	MatIconModule,
	MatCardModule,
	MatCheckboxModule,
	MatProgressSpinnerModule,
	MatFormFieldModule,
	MatSlideToggleModule,
	MatInputModule,
	MatSelectModule,
	MatRadioModule,
	MatTabsModule,
	MatAutocompleteModule,
	MatExpansionModule,
	MatDatepickerModule,
	MatDialogModule,
	MatCommonModule,
	MatStepperModule,
	MatRippleModule,
	MatTreeModule
];

@NgModule({
	imports: [...materialDesignModules, MatNativeDateModule],
	providers: [{ provide: MAT_DATE_LOCALE, useValue: "en-AU" }],
	exports: [...materialDesignModules]
})
export class MaterialModule {}
