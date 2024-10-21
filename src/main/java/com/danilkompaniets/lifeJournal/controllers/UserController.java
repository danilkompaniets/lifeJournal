package com.danilkompaniets.lifeJournal.controllers;

import com.danilkompaniets.lifeJournal.entities.UserEntity;
import com.danilkompaniets.lifeJournal.services.UserService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/{id}")
    public UserEntity getUserById(@PathVariable Long id) {
        return userService.selectUserById(id);
    }

    @GetMapping("/my-profile")
    public UserEntity getMyProfile(@RequestHeader("Authorization") String token) {
        return userService.selectMyProfile(token);
    }
}
