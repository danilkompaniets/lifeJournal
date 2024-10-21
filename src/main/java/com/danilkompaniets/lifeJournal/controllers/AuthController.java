package com.danilkompaniets.lifeJournal.controllers;

import com.danilkompaniets.lifeJournal.dao.UserLoginDao;
import com.danilkompaniets.lifeJournal.dao.UserLoginResponse;
import com.danilkompaniets.lifeJournal.entities.UserEntity;
import com.danilkompaniets.lifeJournal.securityServices.JwtService;
import com.danilkompaniets.lifeJournal.services.AuthService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder(12);
    private final AuthService authService;
    private final JwtService jwtService;


    public AuthController(AuthService authService, JwtService jwtService) {
        this.authService = authService;
        this.jwtService = jwtService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody UserEntity user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        UserEntity newUser = authService.saveUser(user);

        if (newUser == null) {
            return ResponseEntity.status(404).body("something went wrong");
        }

        return ResponseEntity.ok(newUser);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UserLoginDao user, HttpServletResponse response, HttpServletRequest request) {
        UserLoginResponse loginResponse = authService.verifyUser(user, response);

        if (loginResponse == null) {
            return ResponseEntity.status(403).body("something went wrong");
        }

        return ResponseEntity.ok(loginResponse);
    }

    @PostMapping("/refresh-token")
    public ResponseEntity<?> refreshToken(
            @CookieValue(
                    name = "refreshToken", required = false
            ) String refreshToken,
            HttpServletResponse httpServletResponse
    ) {
        System.out.println("Generating new Refresh Token for: " + refreshToken);
        String newAuthToken = authService.generateNewAccessToken(refreshToken, httpServletResponse);
        return ResponseEntity.ok(newAuthToken);
    }

    @PostMapping("/check-cookie")
    public ResponseEntity<String> checkCookie(
            @CookieValue(name = "refreshToken", required = false) String refreshToken
    ) {
        if (refreshToken != null) {
            return ResponseEntity.ok("Refresh token cookie is set to" +
                    ": " + refreshToken);
        } else {
            return ResponseEntity.status(401).body("Refresh token cookie is not set.");
        }
    }


}
