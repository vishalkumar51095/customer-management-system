package com.vishalkumar51095.customermanagementsystem.services;

import com.vishalkumar51095.customermanagementsystem.models.CustomerModel;
import com.vishalkumar51095.customermanagementsystem.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomerService {

    @Autowired
    private CustomerRepository customerRepository;

    public List<CustomerModel> getAllCustomers() {
        return customerRepository.findAll();
    }

    public CustomerModel getCustomerById(Long id) {
        return customerRepository.findById(id).orElse(null);
    }

    public CustomerModel createCustomer(CustomerModel customer) {
        return customerRepository.save(customer);
    }

    public CustomerModel updateCustomer(Long id, CustomerModel customer) {
        if (customerRepository.existsById(id)) {
            customer.setId(id);
            return customerRepository.save(customer);
        }
        return null;
    }

    public void deleteCustomer(Long id) {
        customerRepository.deleteById(id);
    }

    public List<CustomerModel> searchCustomers(String searchTerm) {
        // Implement your search logic here
        // In this example, we're searching by first name, last name, and email
        return customerRepository.findByFirstNameContainingOrLastNameContainingOrEmailContaining(searchTerm, searchTerm, searchTerm);
    }
}
