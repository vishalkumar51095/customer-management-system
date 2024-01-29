package com.vishalkumar51095.customermanagementsystem.controllers;

import com.vishalkumar51095.customermanagementsystem.models.CustomerModel;
import com.vishalkumar51095.customermanagementsystem.services.CustomerService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/customers")
public class CustomerController {

    private static final Logger logger = LoggerFactory.getLogger(CustomerController.class);

    @Autowired
    private CustomerService customerService;

    @GetMapping
    @CrossOrigin
    public List<CustomerModel> getAllCustomers() {
        logger.info("Getting all customers");
        return customerService.getAllCustomers();
    }

    @GetMapping("/{id}")
    @CrossOrigin
    public CustomerModel getCustomerById(@PathVariable Long id) {
        return customerService.getCustomerById(id);
    }

    @PostMapping
    @CrossOrigin
    public CustomerModel createCustomer(@RequestBody CustomerModel customer) {
        logger.info("Creating a new customer: {}", customer);
        return customerService.createCustomer(customer);
    }

    @PostMapping("/{id}")
    @CrossOrigin
    public CustomerModel updateCustomer(@PathVariable Long id, @RequestBody CustomerModel customer) {
        return customerService.updateCustomer(id, customer);
    }

    @PostMapping("/delete/{id}")
    @CrossOrigin // Allow requests from any origin
    public void deleteCustomer(@PathVariable Long id) {
        customerService.deleteCustomer(id);
    }

    @GetMapping("/search")
    public List<CustomerModel> searchCustomers(@RequestParam String searchTerm) {
        List<CustomerModel> searchResults = customerService.searchCustomers(searchTerm);
        return searchResults;
    }
}

