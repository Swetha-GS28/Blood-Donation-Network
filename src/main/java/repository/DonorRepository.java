package com.blooddonation.Blood_Donation_Network.repository;

import com.blooddonation.Blood_Donation_Network.entity.Donor;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface DonorRepository extends JpaRepository<Donor, Long> {

    List<Donor> findByBloodGroupAndLocation(
            String bloodGroup,
            String location
    );

}