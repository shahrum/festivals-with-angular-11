import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSelectModule } from "@angular/material/select";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatCommonModule } from "@angular/material/core";
import { CommonModule } from "@angular/common";
import { TextMaskModule } from "angular2-text-mask";

import { InputFormFieldComponent } from "./input-form-field/input-form-field.component";
import { MatIconModule } from "@angular/material/icon";
import { MatCheckboxModule } from "@angular/material/checkbox";

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		MatCommonModule,
		MatInputModule,
		MatDatepickerModule,
		MatFormFieldModule,
		MatProgressSpinnerModule,
		MatSelectModule,
		TextMaskModule,
		MatIconModule,
		MatCheckboxModule

	],
	declarations: [
		InputFormFieldComponent,
	],
	exports: [
		InputFormFieldComponent,
	]
})
export class TryCatchMaterialFormsModule { }
