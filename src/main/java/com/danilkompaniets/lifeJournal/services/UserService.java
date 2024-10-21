package com.danilkompaniets.lifeJournal.services;

import com.danilkompaniets.lifeJournal.entities.UserEntity;
import com.danilkompaniets.lifeJournal.repos.UserRepository;
import com.danilkompaniets.lifeJournal.securityServices.JwtService;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final JwtService jwtService;

    public UserService(UserRepository userRepository, JwtService jwtService) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
    }

    public UserEntity selectUserById(Long id) {
        return userRepository.findById(id).orElse(null);
    }

    public UserEntity selectMyProfile(String token) {
        if (token != null && token.startsWith("Bearer ")) {
            token = token.substring(7);

            String username = jwtService.extractUsername(token);

            System.out.println("Username for my-profile: " + username);

            return userRepository.findByUsername(username);
        }

        return null;
    }
}
