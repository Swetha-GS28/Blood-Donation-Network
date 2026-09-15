package com.blooddonation.Blood_Donation_Network.service;

import com.blooddonation.Blood_Donation_Network.entity.Match;

import com.blooddonation.Blood_Donation_Network.repository.MatchRepository;

import java.util.List;

import org.springframework.stereotype.Service;

@Service
public class MatchService {

    private final MatchRepository matchRepository;


    public MatchService(
            MatchRepository matchRepository
    ) {

        this.matchRepository = matchRepository;

    }


    // Create a successful match
    public Match createMatch(
            Match match
    ) {

        boolean matchExists =
                matchRepository
                        .existsByDonorIdAndEmergencyRequestId(
                                match.getDonorId(),
                                match.getEmergencyRequestId()
                        );


        if (matchExists) {

            throw new RuntimeException(
                    "This donor is already matched with this emergency request."
            );

        }


        return matchRepository.save(
                match
        );

    }


    // Get all successful matches
    public List<Match> getAllMatches() {

        return matchRepository.findAll();

    }


    // Get successful match count
    public long getMatchCount() {

        return matchRepository.count();

    }

}