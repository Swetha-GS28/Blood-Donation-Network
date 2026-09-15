package com.blooddonation.Blood_Donation_Network.repository;

import com.blooddonation.Blood_Donation_Network.entity.EmergencyRequest;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmergencyRequestRepository
        extends JpaRepository<EmergencyRequest, Long> {

}