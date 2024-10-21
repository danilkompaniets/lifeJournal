package com.danilkompaniets.lifeJournal.dao;

public record UserLoginDao(
        String username,
        String password,
        String refreshToken) {
}
