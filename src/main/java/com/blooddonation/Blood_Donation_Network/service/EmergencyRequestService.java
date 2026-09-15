package com.blooddonation.Blood_Donation_Network.service;

import com.blooddonation.Blood_Donation_Network.entity.EmergencyRequest;
import com.blooddonation.Blood_Donation_Network.repository.EmergencyRequestRepository;

import java.util.List;

import org.springframework.stereotype.Service;

@Service
public class EmergencyRequestService {

    private final EmergencyRequestRepository emergencyRequestRepository;

    public EmergencyRequestService(
            EmergencyRequestRepository emergencyRequestRepository
    ) {
        this.emergencyRequestRepository = emergencyRequestRepository;
    }

    public EmergencyRequest saveEmergencyRequest(
            EmergencyRequest emergencyRequest
    ) {
        return emergencyRequestRepository.save(emergencyRequest);
    }

    public List<EmergencyRequest> getAllEmergencyRequests() {
        return emergencyRequestRepository.findAll();
    }

    public long getEmergencyRequestCount() {
        return emergencyRequestRepository.count();
    }
}