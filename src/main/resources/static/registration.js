// registration.js

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function displayError(elementId, errorMessage) {
    const errorElement = document.getElementById(elementId);
    errorElement.innerHTML = errorMessage;
}

function clearError(elementId) {
    const errorElement = document.getElementById(elementId);
    errorElement.innerHTML = '';
}

function validateFullName(fullName) {
    if (fullName.length < 2 || fullName.length > 20) {
        displayError('fullNameError', 'Full Name must be between 2 and 20 characters');
        return false;
    } else if (fullName.trim() === "") {
        displayError('fullNameError', 'Full Name cannot be empty');
        return false;
    }
    clearError('fullNameError');
    return true;
}

function validatePasswordsMatch(password, confirmPassword) {
    if (password !== confirmPassword) {
        displayError('passwordMatchError', 'Passwords do not match');
        return false;
    }
    clearError('passwordMatchError');
    return true;
}

function handleRegistrationResponse(data) {
    if (data.error) {
        if (data.error.includes('email address is already in use')) {
            // Handle the case of duplicate email
            displayError('registerError', 'The email address is already in use.');
        } else {
            // Display the general error message on the HTML page
            displayError('registerError', data.error);
        }
    } else {
        // Registration successful, reset error message
        clearError('registerError');
        // Display success message
        const successMessage = 'Registration successful!Please redirecting to login page...';
        document.getElementById('registerResult').innerHTML = successMessage;
        // You may redirect to the login page here using window.location.href if needed
    }
}

function register() {
    const fullName = document.getElementById('registerFullName').value;
    const username = document.getElementById('registerUsername').value;
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    // Validate email before making the request
    if (!validateEmail(username)) {
        displayError('emailError', 'Invalid email address');
        return;
    }
    clearError('emailError');

    // Perform additional validations
    if (!validateFullName(fullName) || !validatePasswordsMatch(password, confirmPassword)) {
        return;
    }

//    // Perform password strength check
//    const result = zxcvbn(password);
//    const passwordStrengthElement = document.getElementById('passwordStrength').getElementsByTagName('span')[0];
//    passwordStrengthElement.textContent = result.score + '/4';
//
//    if (result.score < 3) {
//        passwordStrengthElement.style.color = 'red';
//    } else {
//        passwordStrengthElement.style.color = 'green';
//    }

    // Make the registration request
    fetch('http://localhost:8080/auth/addNewUser', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: fullName,
            email: username,
            password: password,
        }),
    })
        .then(response => response.json())
        .then(handleRegistrationResponse)
        .catch(error => {
        console.error('Error:', error);
        // Display a generic error message on the HTML page
        displayError('registerError', 'Registration failed!');
    });
}
