let searchTimeout;

function logout() {
    // Clear the token from local storage
    localStorage.removeItem('token');

    // Redirect back to the login page
    window.location.href = 'login.html';
}

function addCustomer() {
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const street = document.getElementById('street').value;
    const address = document.getElementById('address').value;
    const city = document.getElementById('city').value;
    const state = document.getElementById('state').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;

    // Add other form fields as needed
    const newCustomer = {
        firstName: firstName,
        lastName: lastName,
        street: street,
        address: address,
        city: city,
        state: state,
        email: email,
        phone: phone
    };

    fetch('http://localhost:8080/api/customers', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCustomer),
    })
        .then(response => response.json())
        .then(data => {
        // Handle the response from the server
        console.log('Customer added successfully:', data);

        window.location.href = 'customer-list.html';
    })
        .catch(error => console.error('Error adding customer:', error));
}

function searchCustomers() {
    const searchInput = document.getElementById('searchInput').value;

    // Clear existing timeout
    clearTimeout(searchTimeout);

    // Set a new timeout to avoid making requests for every keystroke
    searchTimeout = setTimeout(() => {
        fetch(`http://localhost:8080/api/customers/search?searchTerm=${searchInput}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => {
            // Handle the response from the server
            console.log('Search results:', data);
            updateCustomerTable(data);
        })
            .catch(error => console.error('Error searching customers:', error));
    }, 500); // Adjust the delay as needed
}

function updateCustomerTable(customers) {
    const customerTableBody = document.getElementById('customerTableBody');
    customerTableBody.innerHTML = ''; // Clear existing content

    if (customers.length > 0) {
        customers.forEach(customer => {
            const row = document.createElement('tr');
            row.innerHTML = `
                    <td>${customer.firstName} ${customer.lastName}</td>
                    <td>${customer.lastName}</td>
                    <td>${customer.address}</td>
                    <td>${customer.city}</td>
                    <td>${customer.state}</td>
                    <td>${customer.email}</td>
                    <td>${customer.phone}</td>
                    <td>
                        <button class="btn btn-primary" onclick="location.href = 'edit-customer.html?id=${customer.id}'">Edit</button>
                    </td>
                    <td>
                        <button class="btn btn-danger" onclick="deleteButton(${customer.id})">Delete</button>
                    </td>
                `;
            customerTableBody.appendChild(row);
        });
    } else {
        // Display a message if no results are found
        const noResultsMessage = document.createElement('tr');
        noResultsMessage.innerHTML = '<td colspan="8">No results found.</td>';
        customerTableBody.appendChild(noResultsMessage);
    }
}

document.addEventListener("DOMContentLoaded", function () {
    // Function to fetch and display customers
    fetchAndDisplayCustomers();
});

function fetchAndDisplayCustomers() {
    fetch('http://localhost:8080/api/customers')
        .then(response => response.json())
        .then(data => {
        // Update the table body with customer data
        updateCustomerTable(data);
    })
        .catch(error => console.error('Error fetching customers:', error));
}

function deleteButton(customerId) {

    // Example using fetch API
    fetch('http://localhost:8080/api/customers/delete/' + customerId, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        console.log('Customer deleted successfully');
        window.location.reload();
    })
        .catch(error => {
        // Handle error
        console.error('There was a problem with the fetch operation:', error);
    });
}