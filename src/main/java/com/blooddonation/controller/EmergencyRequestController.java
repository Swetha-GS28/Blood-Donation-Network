package com.blooddonation.Blood_Donation_Network.controller;

import com.blooddonation.Blood_Donation_Network.entity.EmergencyRequest;
import com.blooddonation.Blood_Donation_Network.service.EmergencyRequestService;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/emergency-requests")
@CrossOrigin
public class EmergencyRequestController {

    private final EmergencyRequestService emergencyRequestService;

    public EmergencyRequestController(
            EmergencyRequestService emergencyRequestService
    ) {
        this.emergencyRequestService = emergencyRequestService;
    }

    @PostMapping
    public EmergencyRequest createEmergencyRequest(
            @RequestBody EmergencyRequest emergencyRequest
    ) {
        return emergencyRequestService.saveEmergencyRequest(
                emergencyRequest
        );
    }

    @GetMapping
    public List<EmergencyRequest> getAllEmergencyRequests() {
        return emergencyRequestService.getAllEmergencyRequests();
    }

    @GetMapping("/count")
    public long getEmergencyRequestCount() {
        return emergencyRequestService.getEmergencyRequestCount();
    }
}