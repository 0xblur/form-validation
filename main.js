const FORM = document.querySelector("form");
const fields = [
	FORM.email,
	FORM.country,
	FORM.zip,
	FORM.pass,
	FORM["pass-confirm"],
];

setCustomValidation(fields);

FORM.addEventListener("submit", (e) => {
	e.preventDefault();
	FORM.reportValidity();
});

function setCustomValidation(fields) {
	for (const field of fields) {
		field.addEventListener("input", (e) => {
			if (field.validity.valueMissing) {
				const error = "This field can't be empty";
				renderErrors(field, error);
			} else if (field.validity.typeMismatch && field.type === "email") {
				const error = "Please enter a valid email address";
				renderErrors(field, error);
			} else if (field.validity.patternMismatch) {
				const error = `You entered an invalid ${field.name}`;
				renderErrors(field, error);
			} else if (field.validity.tooShort) {
				const error = `You need to enter at least ${
					field.minLength
				} characters. ${field.minLength - field.value.length} remaining`;
				renderErrors(field, error);
			} else if (field.validity.tooLong) {
				const error = `You exceeded the maximum number of characters by ${
					field.value.length - field.maxLength
				}`;
				renderErrors(field, error);
			}

			if (field.validity.valid) {
				removeErrors(field);
			}
		});
	}
}

/**
 * Renders error dialog or box
 * @param {Array|string} errors
 * It appears to me a great idea if It takes an array
 * because this way it can handle multiple errors and
 * display the full feedback to the user. I just need
 * to find the way to display the errors one by one i
 * instead of all on the same dialog box.
 */
function renderErrors(field, ...errors) {
	const fieldLabel = document.querySelector(`label[for="${field.id}"]`);
	let messageBox = fieldLabel.querySelector(".error");
	if (!messageBox) {
		messageBox = document.createElement("span");
	}
	messageBox.className = "error";
	messageBox.innerHTML = "";
	for (const str of errors) {
		messageBox.innerHTML += `<p>${str}</p>`;
	}
	fieldLabel.appendChild(messageBox);
}

function removeErrors(field) {
	const messageBox = document.querySelector(`#${field.id} + .error`);
	if (!messageBox) return;
	messageBox.remove();
}
