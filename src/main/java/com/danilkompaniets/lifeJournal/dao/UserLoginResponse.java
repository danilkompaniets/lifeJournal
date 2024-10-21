package com.danilkompaniets.lifeJournal.dao;

import com.danilkompaniets.lifeJournal.entities.UserEntity;

public record UserLoginResponse (
        UserEntity user,
        String accessToken,
        String refreshToken
){}
