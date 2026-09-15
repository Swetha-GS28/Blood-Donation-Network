package com.blooddonation.Blood_Donation_Network.controller;

import com.blooddonation.Blood_Donation_Network.entity.Match;
import com.blooddonation.Blood_Donation_Network.service.MatchService;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/matches")
@CrossOrigin
public class MatchController {

    private final MatchService matchService;


    public MatchController(
            MatchService matchService
    ) {

        this.matchService = matchService;

    }


    // Create a successful match
    @PostMapping
    public ResponseEntity<?> createMatch(
            @RequestBody Match match
    ) {

        try {

            Match savedMatch =
                    matchService.createMatch(match);

            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body(savedMatch);

        } catch (RuntimeException exception) {

            return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body(
                            "This donor has already been matched with this emergency request."
                    );

        }

    }


    // Get all successful matches
    @GetMapping
    public List<Match> getAllMatches() {

        return matchService.getAllMatches();

    }


    // Get successful match count
    @GetMapping("/count")
    public long getMatchCount() {

        return matchService.getMatchCount();

    }

}