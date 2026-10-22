const form = document.getElementById("registrationForm");

const fullNameInput = document.getElementById("fullName");
const matricInput = document.getElementById("matricNumber");
const departmentInput = document.getElementById("department");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const genderInput = document.getElementById("gender");
const programmeInput = document.getElementById("programme");

const popup = document.getElementById("successPopup");
const congratulationsName = document.getElementById("congratulationsName");
const continueBtn = document.getElementById("continueBtn");

const fields = [
[fullNameInput, "nameError"],
[matricInput, "matricError"],
[departmentInput, "departmentError"],
[emailInput, "emailError"],
[phoneInput, "phoneError"],
[genderInput, "genderError"],
[programmeInput, "programmeError"]
];

function showError(input, errorId, message) {
document.getElementById(errorId).textContent = message;
input.classList.add("invalid");
input.setAttribute("aria-invalid", "true");
}

function clearError(input, errorId) {
document.getElementById(errorId).textContent = "";
input.classList.remove("invalid");
input.removeAttribute("aria-invalid");
}

function validateForm() {
let valid = true;

fields.forEach(([input, errorId]) => {
    clearError(input, errorId);
});

const fullName = fullNameInput.value.trim();
const matric = matricInput.value.trim();
const email = emailInput.value.trim();
const phone = phoneInput.value.trim();

const namePattern = /^[A-Za-z][A-Za-z\s'-]{1,}$/;
const matricPattern = /^\d{8}$/;
const phonePattern = /^\d{11}$/;
const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)*\.(com|org|net|edu|gov|ng|uk|com\.ng|edu\.ng)$/i;

if (!fullName) {
    showError(fullNameInput, "nameError", "Please enter your full name.");
    valid = false;
} else if (!namePattern.test(fullName)) {
    showError(fullNameInput, "nameError", "Enter a valid full name using letters, spaces, hyphens or apostrophes.");
    valid = false;
}

if (!matric) {
    showError(matricInput, "matricError", "Please enter your matriculation number.");
    valid = false;
} else if (!matricPattern.test(matric)) {
    showError(matricInput, "matricError", "Matriculation number must contain exactly 8 digits, e.g. 20241234.");
    valid = false;
}

if (!departmentInput.value) {
    showError(departmentInput, "departmentError", "Please select your department.");
    valid = false;
}

if (!email) {
    showError(emailInput, "emailError", "Please enter your email address.");
    valid = false;
} else if (!emailPattern.test(email) || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    showError(emailInput, "emailError", "Enter a valid email address, e.g. name@gmail.com or name@yahoo.com.");
    valid = false;
}

if (!phone) {
    showError(phoneInput, "phoneError", "Please enter your phone number.");
    valid = false;
} else if (!phonePattern.test(phone)) {
    showError(phoneInput, "phoneError", "Phone number must contain exactly 11 digits.");
    valid = false;
}

if (!genderInput.value) {
    showError(genderInput, "genderError", "Please select your gender.");
    valid = false;
}

if (!programmeInput.value) {
    showError(programmeInput, "programmeError", "Please select your programme.");
    valid = false;
}

return valid;

}

form.addEventListener("submit", function(event) {
event.preventDefault();

if (!validateForm()) {
    const firstInvalid = form.querySelector(".invalid");

    if (firstInvalid) {
        firstInvalid.focus();
    }

    return;
}

congratulationsName.textContent = fullNameInput.value.trim();
popup.hidden = false;
continueBtn.focus();

});

function closePopup() {
popup.hidden = true;
}

continueBtn.addEventListener("click", closePopup);

popup.addEventListener("click", function(event) {
if (event.target === popup) {
closePopup();
}
});

document.addEventListener("keydown", function(event) {
if (event.key === "Escape" && !popup.hidden) {
closePopup();
}
});

form.addEventListener("reset", function() {
setTimeout(function() {
fields.forEach(([input, errorId]) => {
clearError(input, errorId);
});
}, 0);
});

fields.forEach(([input, errorId]) => {
input.addEventListener("input", function() {
clearError(input, errorId);
});

input.addEventListener("change", function() {
    clearError(input, errorId);
});

});
