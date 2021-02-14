import { Input, Output, EventEmitter, OnChanges, SimpleChanges, Directive } from "@angular/core";
import {
	FormGroup,
	ValidationErrors,
	AbstractControl,
	FormGroupDirective,
	Validators,
	FormControl
} from "@angular/forms";
import {
	FormFieldEvent,
	FormFieldControlType,
	FormFieldEventType,
	KeyRestrictionsTypes,
	FormFieldStatus
} from "./form-field-enums";
import {
	MatFormFieldAppearance, FloatLabelType
} from "@angular/material/form-field";
import { ThemePalette } from "@angular/material/core";

import {
	numericKeysOnly,
	numericKeysOnlyWithDecimalPoint,
	alphaNumericKeysOnly,
	alphaKeysOnly
} from "./key-restriction-utils";

@Directive()
export abstract class FromFieldControl implements OnChanges {
	public formGroup: FormGroup;
	protected formGroupDirective: FormGroupDirective;
	public _control: AbstractControl | any;
	public _status: FormFieldStatus;

	protected keyRestrictionsFunctionMap: {
		[key: string]: (event: any) => boolean;
	} = {
			"numeric-only": numericKeysOnly,
			"numeric-with-decimal-point": numericKeysOnlyWithDecimalPoint,
			"alpha-numeric": alphaNumericKeysOnly,
			"alpha-only": alphaKeysOnly
		};

	@Input() label: string;
	@Input() placeholder: string;
	@Input() hint: string;
	@Input() controlName: string;
	@Input() required: boolean;
	@Input() validImage = "/assets/img/icons/icon-tick-green.svg";
	@Input() appearance: MatFormFieldAppearance = "fill";
	@Input() floatLabel: FloatLabelType;
	@Input() color: ThemePalette;
	@Input() invalidImage = "/assets/img/icons/exclamation-large.svg";
	@Input() parent: any;
	@Input() validationFn: (control: AbstractControl) => any;
	@Input() errorFn: (
		errors: ValidationErrors,
		label?: string,
		control?: AbstractControl
	) => string;

	@Input() set keyRestrictions(val: KeyRestrictionsTypes) {
		if (!!val) {
			this._keyRestrictionFunction = this.keyRestrictionsFunctionMap[val];
		} else {
			this._keyRestrictionFunction = this.__keyRestrictionFunction;
		}
	}

	@Input() replacementMap: [RegExp, string][];

	@Output() event = new EventEmitter<FormFieldEvent>();

	_keyRestrictionFunction = this.__keyRestrictionFunction;

	private __keyRestrictionFunction(event: any) {
		return true;
	}

	constructor(__formGroupDirective: FormGroupDirective) {
		this.formGroupDirective = __formGroupDirective;
		this.event.emit(<FormFieldEvent>{
			type: FormFieldEventType.CONTROL_CREATED
		});

		if (!__formGroupDirective) {
			console.error(
				"form field controls can be used within form group container"
			);
		}
	}

	ngOnChanges(changes: SimpleChanges) {
		if ("controlName" in changes) {
			if (this.formGroupDirective) {
				this.formGroup = this.formGroupDirective.form;
				this._control = this.formGroup.controls[
					changes.controlName.currentValue
				];
				this.__setValidators();
				this.__pendingSubscription();
			}
		}
	}

	public _runReplacement() {
		if (
			this.replacementMap &&
			this.replacementMap.length > 0 &&
			this._control
		) {
			let val = this._control.value ? this._control.value.toString() : undefined;
			if (val) {
				this.replacementMap.forEach(rm => {
					const regEx = new RegExp(rm[0].source, rm[0].flags + "g");
					val = val.replace(regEx, rm[1]);
				});
				this._control.setValue(val);
			}
		}
	}

	private __setValidators() {
		if (this.validationFn) {
			this._control.setValidators(this.validationFn);
		}
	}

	private __pendingSubscription() {
		if (this._control) {
			this._control.statusChanges.subscribe((status: FormFieldStatus) => {
				const msg = `${this.controlName} status is : ${status}`;
				console.log(msg);
				console.log(this._control.errors);
				this._status = status;
			});
		}
	}

	protected get __control() {
		return this._control;
	}

	__controlInfo(controlType: FormFieldControlType) {
		return {
			name: this.controlName,
			type: controlType,
			abstractControl: this.__control
		};
	}

	get valid(): boolean | undefined {
		// const {__control} = this;
		return this.__control
			? (
				this.__control.dirty &&
				!this.__control.errors &&
				!this.__control.pending
			)
			: undefined;
	}

	get error(): string | undefined {
		if (this.__control) {
			const ctrl = this.__control;
			if (ctrl.errors) {
				if (ctrl.hasError("required")) {
					return `${this.label} is required`;
				}

				if (ctrl.hasError("error")) {
					return `${ctrl.errors["error"]}`;
				}

				if (this.errorFn) {
					const err = this.errorFn(ctrl.errors, this.parent);
					if (err) {
						return err;
					} else {
						setTimeout(() => {
							ctrl.setErrors(null);
						});
					}
				}
			}
		}
		return undefined;
	}

	protected _cleanMaskValue(val: string): string {
		return val ? val.replace(/[^\x00-\x7F]/g, "") : val;
	}
}
