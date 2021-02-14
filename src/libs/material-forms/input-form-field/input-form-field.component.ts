import { Component, OnInit, Input, Optional, Inject, ChangeDetectionStrategy } from "@angular/core";
import { FromFieldControl } from "../form-field-control";
import { FormGroupDirective } from "@angular/forms";
import {
	FormFieldEvent,
	FormFieldEventType
} from "../form-field-enums";

@Component({
	selector: "tc-input-form-field",
	templateUrl: "./input-form-field.component.html",
	styleUrls: ["./input-form-field.component.scss"],
})
export class InputFormFieldComponent extends FromFieldControl
	implements OnInit {
	@Input() maxLength = -1;
	@Input() minLength = -1;
	@Input() inputType = "text";
	@Input() doubleField = false;
	@Input() voidValidImage = false;
	@Input() disablePasteInto = false;
	@Input() noWrap = false;

	constructor(
		@Optional()
		@Inject(FormGroupDirective)
		__formGroupDirective: FormGroupDirective
	) {
		super(__formGroupDirective);
	}

	ngOnInit() {
		this._inputChanged();
	}

	_inputChanged() {
		if (!this.required) {
			this._control.valueChanges.subscribe((val: any) => {
				console.log("val", val);
				this.event.emit(<FormFieldEvent>{
					type: FormFieldEventType.INPUT_CHANGED
				});
			});
		}
	}

	get __hasError() {
		return this.__control?.touched && !this.valid && this.__control?.invalid;
	}

	get imageUrl() {
		return this.valid && this.validImage ? (this.voidValidImage ? "" : this.validImage) : this.invalidImage;
	}

	get showImage() {
		return (this.valid && this.validImage) || this.__hasError;
	}
}
