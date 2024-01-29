package com.vishalkumar51095.customermanagementsystem.configurations;

import com.vishalkumar51095.customermanagementsystem.models.UserInfo;
import com.vishalkumar51095.customermanagementsystem.repository.UserInfoRepository;
import com.vishalkumar51095.customermanagementsystem.services.UserInfoDetails;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Optional;

@Service
public class UserInfoService implements UserDetailsService {

    @Autowired
    private UserInfoRepository repository;

    @Autowired
    private PasswordEncoder encoder;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        Optional<UserInfo> userDetail = repository.findByEmail(username);


        // Converting userDetail to UserDetails
        return userDetail.map(user -> new UserInfoDetails(user))
                .orElseThrow(() -> new UsernameNotFoundException("User not found " + username));
    }

    public ResponseEntity<?> addUser(@Valid UserInfo userInfo) {
        // Check if roles field is not provided, then set the default role to ROLE_USER
        HashMap<String,Object> map=new HashMap<>();
        try {
            if (userInfo.getRoles() == null || userInfo.getRoles().isEmpty()) {
                userInfo.setRoles("ROLE_USER");
            }

            userInfo.setEmail(userInfo.getEmail());

            userInfo.setPassword(encoder.encode(userInfo.getPassword()));
            repository.save(userInfo);
            map.put("message", "User Added Successfully");
        }
        catch (DataIntegrityViolationException e) {
            // Handle unique key constraint violation
            map.put("error","The email address is already in use.");
            return ResponseEntity.badRequest().body(map);
        }
        catch (Exception e){
            e.printStackTrace();
        }
        return ResponseEntity.ok(map);
    }


}
