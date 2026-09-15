package com.blooddonation.Blood_Donation_Network.repository;

import com.blooddonation.Blood_Donation_Network.entity.Match;

import org.springframework.data.jpa.repository.JpaRepository;

public interface MatchRepository extends JpaRepository<Match, Long> {

    boolean existsByDonorIdAndEmergencyRequestId(
            Long donorId,
            Long emergencyRequestId
    );

}