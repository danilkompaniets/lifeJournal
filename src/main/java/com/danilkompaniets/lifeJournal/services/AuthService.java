package com.danilkompaniets.lifeJournal.services;

import com.danilkompaniets.lifeJournal.dao.UserLoginDao;
import com.danilkompaniets.lifeJournal.dao.UserLoginResponse;
import com.danilkompaniets.lifeJournal.entities.UserEntity;
import com.danilkompaniets.lifeJournal.repos.UserRepository;
import com.danilkompaniets.lifeJournal.securityServices.JwtService;
import com.danilkompaniets.lifeJournal.securityServices.MyUserDetailsService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.time.ZonedDateTime;

@Service
public class AuthService {
    private final UserRepository userRepository;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final MyUserDetailsService myUserDetailsService;

    private void generateCookieForToken(HttpServletResponse response, String token, int maxAgeSeconds, String cookieName) {
        Cookie cookie = new Cookie(cookieName, token);
        cookie.setHttpOnly(true);  // Prevent JavaScript access
        cookie.setSecure(false);    // Set to true for production (HTTPS)
        cookie.setPath("/");        // Set path where the cookie is available
        cookie.setMaxAge(maxAgeSeconds); // Set expiration to 30 days (in seconds)

        response.addCookie(cookie);
    }

    public AuthService(UserRepository userRepository, AuthenticationManager authenticationManager, JwtService jwtService, MyUserDetailsService myUserDetailsService) {
        this.userRepository = userRepository;
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
        this.myUserDetailsService = myUserDetailsService;
    }

    public UserEntity saveUser(UserEntity user) {
        return userRepository.save(user);
    }

    public UserLoginResponse verifyUser(UserLoginDao user, HttpServletResponse response) {
        // Create an authentication token
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(user.username(), user.password());
        Authentication authentication = authenticationManager.authenticate(authenticationToken);

        if (authentication.isAuthenticated()) {
            // Log to ensure proper token generation
            ZonedDateTime now = ZonedDateTime.now();
            System.out.println("Current time: " + now);

            // Generate refresh and access tokens with proper expiration times
            String refreshToken = jwtService.generateToken(user.username(), 60 * 24 * 30); // 30 days in minutes
            String accessToken = jwtService.generateToken(user.username(), 10); // 10 minutes

            System.out.println("Generated refreshToken: " + refreshToken);
            System.out.println("Generated accessToken: " + accessToken);

            generateCookieForToken(response, refreshToken, 30 * 24 * 60 * 60, "refreshToken");

            UserEntity userResponse = userRepository.findByUsername(user.username());
            return new UserLoginResponse(userResponse, accessToken, refreshToken);
        }
        return null;
    }

    public String generateNewAccessToken(String refreshToken, HttpServletResponse response) {
        String username = jwtService.extractUsername(refreshToken);

        UserDetails userDetails = myUserDetailsService.loadUserByUsername(username);

        // Log to verify token format
        System.out.println("Bearer refreshToken: " + refreshToken);

        boolean isTokenValid = jwtService.validateToken(refreshToken, userDetails);

        if (!isTokenValid) {
            return "Refresh token expired";
        }

        // Generate a new refresh token and replace the old one
        String newRefreshToken = jwtService.generateToken(username, 60 * 24 * 30); // 30 days in minutes

        Cookie newRefreshTokenCookie = new Cookie("refreshToken", newRefreshToken);
        newRefreshTokenCookie.setHttpOnly(true);
        newRefreshTokenCookie.setSecure(false); // Set to true for production
        newRefreshTokenCookie.setPath("/");
        newRefreshTokenCookie.setMaxAge(60 * 60 * 24 * 30); // 30 days in seconds

        // Expire the old refresh token cookie
        Cookie oldRefreshTokenCookie = new Cookie("refreshToken", null);
        oldRefreshTokenCookie.setHttpOnly(true);
        oldRefreshTokenCookie.setSecure(false); // Set to true for production
        oldRefreshTokenCookie.setPath("/");
        oldRefreshTokenCookie.setMaxAge(0);

        response.addCookie(oldRefreshTokenCookie);
        response.addCookie(newRefreshTokenCookie);

        // Generate a new access token
        String newAccessToken = jwtService.generateToken(username, 10); // 10 minutes

        return newAccessToken;
    }
}