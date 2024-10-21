package com.danilkompaniets.lifeJournal.dao;

public record RefreshTokenResponse(
        String newAccessToken,
        String newRefreshToken
) {
}
