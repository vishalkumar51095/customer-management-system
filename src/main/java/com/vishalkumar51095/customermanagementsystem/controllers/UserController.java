package com.vishalkumar51095.customermanagementsystem.controllers;


import com.vishalkumar51095.customermanagementsystem.configurations.AuthRequest;
import com.vishalkumar51095.customermanagementsystem.models.UserInfo;
import com.vishalkumar51095.customermanagementsystem.configurations.UserInfoService;
import com.vishalkumar51095.customermanagementsystem.services.JwtService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class UserController {

    @Autowired
    private UserInfoService service;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @GetMapping("/welcome")
    public String welcome() {
        return "Welcome! This page is secure.";
    }

    @PostMapping("/addNewUser")
    @CrossOrigin // Allow requests from any origin
    public ResponseEntity<?> addNewUser(@Valid@RequestBody UserInfo userInfo) {

        return service.addUser(userInfo);
    }

    @GetMapping("/user/userProfile")
    @CrossOrigin // Allow requests from any origin
    @PreAuthorize("hasAuthority('ROLE_USER')")
    public String userProfile() {
        return "Welcome to User Profile";
    }

    @GetMapping("/admin/adminProfile")
    @CrossOrigin // Allow requests from any origin
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public String adminProfile() {
        return "Welcome to Admin Profile";
    }

    @PostMapping("/generateToken")
    @CrossOrigin
    public String authenticateAndGetToken(@RequestBody AuthRequest authRequest) {
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword()));
        if (authentication.isAuthenticated()) {
            String token = jwtService.generateToken(authRequest.getUsername());
            return "{\"token\":\"" + token + "\"}";
        } else {
            throw new UsernameNotFoundException("Invalid user request!");
        }
    }
}
