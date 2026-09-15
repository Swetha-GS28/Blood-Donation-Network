package com.blooddonation.Blood_Donation_Network.repository;

import com.blooddonation.Blood_Donation_Network.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);

}