package com.vishalkumar51095.customermanagementsystem.repository;

import com.vishalkumar51095.customermanagementsystem.models.UserInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserInfoRepository extends JpaRepository<UserInfo, Integer> {
    Optional<UserInfo> findByEmail(String username);

}
