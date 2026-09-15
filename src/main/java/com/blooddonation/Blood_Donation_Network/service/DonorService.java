package com.blooddonation.Blood_Donation_Network.service;

import com.blooddonation.Blood_Donation_Network.entity.Donor;
import com.blooddonation.Blood_Donation_Network.repository.DonorRepository;

import java.util.List;

import org.springframework.stereotype.Service;

@Service
public class DonorService {

    private final DonorRepository donorRepository;

    public DonorService(DonorRepository donorRepository) {
        this.donorRepository = donorRepository;
    }


    // Register a new donor
    public Donor registerDonor(Donor donor) {

        return donorRepository.save(donor);

    }


    // Get all donors
    public List<Donor> getAllDonors() {

        return donorRepository.findAll();

    }


    // Search donors by blood group and location
    public List<Donor> searchDonors(
            String bloodGroup,
            String location
    ) {

        return donorRepository
                .findByBloodGroupAndLocation(
                        bloodGroup,
                        location
                );

    }


    // Get total donor count
    public long getDonorCount() {

        return donorRepository.count();

    }

}