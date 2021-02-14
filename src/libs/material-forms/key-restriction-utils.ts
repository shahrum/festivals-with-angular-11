export function numericKeysOnly(event: any): boolean {
	const charCode = event.which ? event.which : event.keyCode;
	if (charCode >= 48 && charCode <= 57) {
		return true;
	}
	return false;
}

export function numericKeysOnlyWithDecimalPoint(event: any): boolean {
	const charCode = event.which ? event.which : event.keyCode;
	if ((charCode >= 48 && charCode <= 57) || charCode === 46) {
		return true;
	}
	return false;
}

export function alphaNumericKeysOnly(event: any): boolean {
	const charCode = event.which ? event.which : event.keyCode;
	if (
		charCode === 32 ||
		(charCode >= 97 && charCode <= 122) ||
		(charCode >= 65 && charCode <= 90) ||
		(charCode >= 48 && charCode <= 57) // numeric keys
	) {
		return true;
	}
	return false;
}

export function alphaKeysOnly(event: any): boolean {
	const charCode = event.which ? event.which : event.keyCode;

	if (charCode >= 48 && charCode <= 57) {
		// numeric keys
		return false;
	}

	if (charCode >= 33 && charCode <= 38) {
		// special keys
		return false;
	}

	if (charCode >= 40 && charCode <= 44) {
		// special keys
		return false;
	}

	if (charCode >= 46 && charCode <= 47) {
		// special keys
		return false;
	}

	if (charCode >= 58 && charCode <= 64) {
		// special keys
		return false;
	}

	if (charCode >= 91 && charCode <= 95) {
		// special keys
		return false;
	}

	if (charCode >= 123 && charCode <= 126) {
		// special keys
		return false;
	}

	if (charCode >= 161 && charCode <= 191) {
		// special keys
		return false;
	}

	if (charCode === 8217) {
		// special keys
		return false;
	}

	return true;
}
