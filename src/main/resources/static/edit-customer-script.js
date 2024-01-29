// File: edit-customer-script.js

document.addEventListener("DOMContentLoaded", function () {
    const editCustomerForm = document.getElementById('editCustomerForm');
    const errorMessages = document.getElementById('errorMessages');

    const urlParams = new URLSearchParams(window.location.search);
    const customerId = urlParams.get('id');

    if (!customerId) {
        console.error('Invalid customer ID');
        // Handle error or redirect appropriately
        return;
    }

    // Fetch existing customer data and populate the form
    editCustomer(customerId);

    // Handle form submission
    editCustomerForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const updatedCustomer = {
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            street: document.getElementById('street').value,
            address: document.getElementById('address').value,
            city: document.getElementById('city').value,
            state: document.getElementById('state').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value
        };

        console.log('URL:', `http://localhost:8080/api/customers/${customerId}`);
        console.log('Request Body:', JSON.stringify(updatedCustomer));

        fetch(`http://localhost:8080/api/customers/${customerId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedCustomer)
        })
            .then(response => {
            if (!response.ok) {
                throw new Error(`Error updating customer: ${response.status}`);
            }
            return response.json();
        })
            .then(data => {
            console.log('Customer updated successfully:', data);
            window.location.href = 'customer-list.html'; // Redirect to list
        })
            .catch(error => {
            console.error('Error updating customer:', error);
            errorMessages.textContent = error.message; // Display error message
        });
    });
});

function editCustomer(customerId) {
    fetch(`http://localhost:8080/api/customers/${customerId}`)
        .then(response => {
        if (!response.ok) {
            throw new Error(`Error fetching customer: ${response.status}`);
        }
        return response.json();
    })
        .then(data => {
        const firstNameInput = document.getElementById('firstName');
        const lastNameInput = document.getElementById('lastName');
        const streetInput = document.getElementById('street');
        const addressInput = document.getElementById('address');
        const cityInput = document.getElementById('city');
        const stateInput = document.getElementById('state');
        const emailInput = document.getElementById('email');
        const phoneInput = document.getElementById('phone');
        // ... (similar lines for other form fields)

        firstNameInput.value = data.firstName;
        lastNameInput.value = data.lastName;
        streetInput.value = data.street;
        addressInput.value = data.address;
        cityInput.value = data.city;
        stateInput.value = data.state;
        emailInput.value = data.email;
        phoneInput.value = data.phone;
        // ... (similar lines for other form fields)
    })
        .catch(error => {
        console.error('Error fetching customer:', error);
        errorMessages.textContent = error.message; // Display error message
    });
}
