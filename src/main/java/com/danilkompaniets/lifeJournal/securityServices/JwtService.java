package com.danilkompaniets.lifeJournal.securityServices;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service
public class JwtService {
    // Secret key should be at least 256 bits (32 bytes) for HMAC-SHA-256
    private final String secretKey = "laksjdlkasjdlkasdlkj;jqweo;iqwreoiu;welfjhd,ncvmnz xcvkjwelhro23u8r32oqhwe";

    // Method to generate a JWT token
    public String generateToken(String username, Integer expireTimeMinutes) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("username", username);

        return Jwts
                .builder()
                .setClaims(claims)
                .setSubject(username) // Set the subject for later retrieval
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 1000L * 60 * expireTimeMinutes))
                .signWith(getKey())
                .compact();
    }

    // Method to extract specific claims from the token
    private <T> T extractClaims(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    // Extract all claims from the token
    private Claims extractAllClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    // Method to get the signing key from the secret
    private Key getKey() {
        byte[] keyBytes = secretKey.getBytes();
        return Keys.hmacShaKeyFor(keyBytes);
    }

    // Extract the username (subject) from the token
    public String extractUsername(String token) {
        return extractClaims(token, Claims::getSubject);
    }

    // Check if the token has expired
    private boolean isTokenExpired(String token) {
        Date expirationDate = extractClaims(token, Claims::getExpiration);
        return expirationDate.before(new Date());
    }

    // Validate the token against the user details
    public boolean validateToken(String token, UserDetails userDetails) {
        String username = extractUsername(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }
}