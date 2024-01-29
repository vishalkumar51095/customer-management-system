package com.vishalkumar51095.customermanagementsystem.models;
import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserInfo {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private int id;

        @Size(min = 2,max = 20,message = "min 2 and max 20 characters are allowed !!")
        private String name;

        @Column(unique = true,length = 100)
        private String email;

        private String password;
        private String roles;

}
