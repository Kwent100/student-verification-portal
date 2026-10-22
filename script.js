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
{
input: fullNameInput,
error: "nameError"
},
{
input: matricInput,
error: "matricError"
},
{
input: departmentInput,
error: "departmentError"
},
{
input: emailInput,
error: "emailError"
},
{
input: phoneInput,
error: "phoneError"
},
{
input: genderInput,
error: "genderError"
},
{
input: programmeInput,
error: "programmeError"
}
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
let isValid = true;

fields.forEach(function (field) {
    clearError(field.input, field.error);
});

const fullName = fullNameInput.value.trim();
const matricNumber = matricInput.value.trim();
const department = departmentInput.value;
const email = emailInput.value.trim();
const phone = phoneInput.value.trim();
const gender = genderInput.value;
const programme = programmeInput.value;

// Validate full name
const namePattern = /^[A-Za-z][A-Za-z\s'-]{1,}$/;

if (!fullName) {
    showError(
        fullNameInput,
        "nameError",
        "Please enter your full name."
    );
    isValid = false;
} else if (!namePattern.test(fullName)) {
    showError(
        fullNameInput,
        "nameError",
        "Enter a valid name using letters, spaces, hyphens or apostrophes."
    );
    isValid = false;
}

// Validate matriculation number: exactly 8 digits
const matricPattern = /^\d{8}$/;

if (!matricNumber) {
    showError(
        matricInput,
        "matricError",
        "Please enter your matriculation number."
    );
    isValid = false;
} else if (!matricPattern.test(matricNumber)) {
    showError(
        matricInput,
        "matricError",
        "Matriculation number must contain exactly 8 digits, e.g. 20241234."
    );
    isValid = false;
}

// Validate department
if (!department) {
    showError(
        departmentInput,
        "departmentError",
        "Please select your department."
    );
    isValid = false;
}

// Validate email and its domain ending
const emailPattern =
    /^[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)*\.(com|org|net|edu|gov|ng|uk|com\.ng|edu\.ng)$/i;

if (!email) {
    showError(
        emailInput,
        "emailError",
        "Please enter your email address."
    );
    isValid = false;
} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
           !emailPattern.test(email)) {
    showError(
        emailInput,
        "emailError",
        "Enter a valid email, e.g. name@gmail.com or name@yahoo.com."
    );
    isValid = false;
}

// Validate phone number: exactly 11 digits
const phonePattern = /^\d{11}$/;

if (!phone) {
    showError(
        phoneInput,
        "phoneError",
        "Please enter your phone number."
    );
    isValid = false;
} else if (!phonePattern.test(phone)) {
    showError(
        phoneInput,
        "phoneError",
        "Phone number must contain exactly 11 digits."
    );
    isValid = false;
}

// Validate gender
if (!gender) {
    showError(
        genderInput,
        "genderError",
        "Please select your gender."
    );
    isValid = false;
}

// Validate programme
if (!programme) {
    showError(
        programmeInput,
        "programmeError",
        "Please select your programme."
    );
    isValid = false;
}

return isValid;

}

// Submit the form
form.addEventListener("submit", function (event) {
event.preventDefault();

if (!validateForm()) {
    const firstInvalidField = form.querySelector(".invalid");

    if (firstInvalidField) {
        firstInvalidField.focus();
    }

    return;
}

const fullName = fullNameInput.value.trim();

// Show congratulations popup with only the full name
congratulationsName.textContent = fullName;
popup.hidden = false;

continueBtn.focus();

});

// Close popup
function closePopup() {
popup.hidden = true;
}

continueBtn.addEventListener("click", closePopup);

// Close popup when the dark background is tapped
popup.addEventListener("click", function (event) {
if (event.target === popup) {
closePopup();
}
});

// Close popup with Escape key
document.addEventListener("keydown", function (event) {
if (event.key === "Escape" && !popup.hidden) {
closePopup();
}
});

// Clear validation errors when the form is reset
form.addEventListener("reset", function () {
setTimeout(function () {
fields.forEach(function (field) {
clearError(field.input, field.error);
});
}, 0);
});

// Remove an error while the user edits the affected field
fields.forEach(function (field) {
field.input.addEventListener("input", function () {
clearError(field.input, field.error);
});

field.input.addEventListener("change", function () {
    clearError(field.input, field.error);
});

});