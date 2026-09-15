package com.blooddonation.Blood_Donation_Network.controller;

import com.blooddonation.Blood_Donation_Network.entity.Donor;
import com.blooddonation.Blood_Donation_Network.service.DonorService;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/donors")
@CrossOrigin
public class DonorController {

    private final DonorService donorService;

    public DonorController(DonorService donorService) {
        this.donorService = donorService;
    }

    // Register a donor
    @PostMapping
    public Donor registerDonor(
            @RequestBody Donor donor
    ) {
        return donorService.registerDonor(donor);
    }

    // Get all donors
    @GetMapping
    public List<Donor> getAllDonors() {
        return donorService.getAllDonors();
    }

    // Search donors by blood group and location
    @GetMapping("/search")
    public List<Donor> searchDonors(
            @RequestParam String bloodGroup,
            @RequestParam String location
    ) {
        return donorService.searchDonors(
                bloodGroup,
                location
        );
    }

    // Get total donor count
    @GetMapping("/count")
    public long getDonorCount() {
        return donorService.getDonorCount();
    }

}
    