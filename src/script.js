const homepage = document.getElementById("homepage");
const successPage = document.getElementById("success-message-page");
const form = document.getElementById("form");
const dismissButton = document.getElementById("dismiss-button");
const btnContainer = document.getElementById("button-container");
const emailDisplay = document.getElementById("email-address");
const errorMsg = document.getElementById("email-error");
const emailInput = form.querySelector('input[name="email"]');

const emailRegex =
	/^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4]\d)|1\d\d|[1-9]?\d))\.){3}(?:(2(5[0-5]|[0-4]\d)|1\d\d|[1-9]?\d)|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/i;
const isValidEmail = (email) => emailRegex.test(email);

if (emailInput) {
	emailInput.addEventListener("input", () => {
		if (isValidEmail(emailInput.value)) {
			errorMsg.classList.add("hidden");
			emailInput.classList.remove("border-red-500");
		}
	});
}

const updateView = (isSuccess) => {
	const desktop = window.innerWidth >= 900;
	if (desktop) {
		homepage.classList.toggle("lg:hidden", isSuccess);
		homepage.classList.toggle("lg:flex", !isSuccess);
		successPage.classList.toggle("lg:flex", isSuccess);
		successPage.classList.toggle("lg:hidden", !isSuccess);
		btnContainer.classList.toggle("lg:flex", isSuccess);
		btnContainer.classList.toggle("lg:hidden", !isSuccess);
	} else {
		homepage.classList.toggle("hidden", isSuccess);
		successPage.classList.toggle("hidden", !isSuccess);
		btnContainer.classList.toggle("hidden", !isSuccess);
		if (isSuccess) {
			successPage.classList.add("p-5", "min-h-[calc(100vh-50px)]");
			btnContainer.classList.add("block");
		}
	}
};

form.addEventListener("submit", (e) => {
	e.preventDefault();
	const email = new FormData(e.target).get("email");
	if (!isValidEmail(email)) {
		errorMsg.classList.remove("hidden");
		emailInput.classList.add("border-red-500");
		emailInput.focus();
		return;
	}
	errorMsg.classList.add("hidden");
	emailInput.classList.remove("border-red-500");
	emailDisplay.textContent = email;
	updateView(true);
});

dismissButton.addEventListener("click", () => {
	updateView(false);
});
