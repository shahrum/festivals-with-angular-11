import { AbstractControl } from "@angular/forms";

export enum FormFieldControlType {
	INPUT_TEXT = "InputText",
	INPUT_NUMBER = "InputNumber",
	AUTOCOMPLETE = "AutoComplete"
}

export enum FormFieldEventType {
	INPUT_CHANGED = "input_changed",
	OPTION_SELECTED = "option_selected",
	CONTROL_CREATED = "control_created"
}

export interface FormFieldEvent {
	type: FormFieldEventType;
	data: any;
	control?: {
		name: string;
		type: FormFieldControlType;
		typeName: string;
		abstractControl: AbstractControl;
	};
}

export type KeyRestrictionsTypes =
	| "numeric"
	| "numeric-with-decimal-point"
	| "alpha-numeric"
	| "alpha-only";

export type FormFieldStatus = "PENDING" | "VALID" | "INVALID" | "DISABLED";
