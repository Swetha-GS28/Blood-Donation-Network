package com.blooddonation.Blood_Donation_Network.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "matches")
public class Match {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long donorId;

    private Long emergencyRequestId;


    public Match() {

    }


    public Match(
            Long donorId,
            Long emergencyRequestId
    ) {

        this.donorId = donorId;
        this.emergencyRequestId = emergencyRequestId;

    }


    public Long getId() {

        return id;

    }


    public void setId(Long id) {

        this.id = id;

    }


    public Long getDonorId() {

        return donorId;

    }


    public void setDonorId(Long donorId) {

        this.donorId = donorId;

    }


    public Long getEmergencyRequestId() {

        return emergencyRequestId;

    }


    public void setEmergencyRequestId(
            Long emergencyRequestId
    ) {

        this.emergencyRequestId =
                emergencyRequestId;

    }

}