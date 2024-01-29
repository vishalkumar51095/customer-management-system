package com.vishalkumar51095.customermanagementsystem.repository;

import com.vishalkumar51095.customermanagementsystem.models.CustomerModel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CustomerRepository extends JpaRepository<CustomerModel, Long> {

    List<CustomerModel> findByFirstNameContainingOrLastNameContainingOrEmailContaining(String firstName, String lastName, String email);

}
