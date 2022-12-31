// We actually have to define the fucking day because JavaScript date doesn't have such feature
const weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// Get the input elements
const startDateInput = document.querySelector(
	'input[name="start"][type="text"]'
) as HTMLInputElement;
const endDateInput = document.querySelector(
	'input[name="end"][type="text"]'
) as HTMLInputElement;
const readBox = document.getElementById("generated-text-box");

observeElement(startDateInput, "value", function () {
	onDateValueChanged();
});
observeElement(endDateInput, "value", function () {
	onDateValueChanged();
});

function onDateValueChanged(): void {
	if (startDateInput.value != "" && endDateInput.value != "") {
		let startDate = new Date(startDateInput.value);
		let endDate = new Date(endDateInput.value);
		let progressTrackingText = "";
		let tomorrow = new Date();

		iterateBetweenDates(startDate, endDate, (currentDate): void => {
			progressTrackingText += `${
				weekday[currentDate.getDay()]
			} ${currentDate.getDate().toString().padStart(2, "0")}/${currentDate
				.getMonth()
				.toString()
				.padStart(2, "0")}/${currentDate
				.getFullYear()
				.toString()
				.slice(2)} | 0hrs |\n`;

			// Get tomorrow
			tomorrow.setDate(currentDate.getDate() + 1);

			// If is end of the week
			if (currentDate.getDay() == 1) {
				progressTrackingText += "--- End of Week ---\n\n";
			} else if (tomorrow.getDate() == 1) {
				// End of the month
				progressTrackingText += "\n\n\n";
			} else if (
				currentDate.getDay() == 1 &&
				new Date(currentDate.getDate() + 1).getDate() == 1
			) {
				// End of the week and month
				progressTrackingText += "--- End of Week ---\n\n\n";
			}
		});

		if (readBox != null) {
			readBox.innerHTML = progressTrackingText;
		}
	}
}

function observeElement(
	element: HTMLElement,
	property: string,
	callback: (oldValue: any, newValue: any) => void,
	delay: number = 0
): void {
	let elementPrototype = Object.getPrototypeOf(element);
	if (elementPrototype.hasOwnProperty(property)) {
		let descriptor: any | undefined = Object.getOwnPropertyDescriptor(
			elementPrototype,
			property
		);
		Object.defineProperty(element, property, {
			get: function () {
				return descriptor.get.apply(this, arguments);
			},
			set: function () {
				let oldValue = this[property];
				descriptor.set.apply(this, arguments);
				let newValue = this[property];
				if (typeof callback == "function") {
					setTimeout(callback.bind(this, oldValue, newValue), delay);
				}
				return newValue;
			},
		});
	}
}

function iterateBetweenDates(
	startDate: Date,
	endDate: Date,
	callback: (currentDate: Date) => void
) {
	// Swap the dates around if they ain't right
	if (startDate > endDate) {
		let tempDate = startDate;
		startDate = endDate;
		endDate = tempDate;
	}
	let currentDate = new Date(startDate);
	while (currentDate <= endDate) {
		callback(currentDate);
		currentDate.setDate(currentDate.getDate() + 1);
	}
}
