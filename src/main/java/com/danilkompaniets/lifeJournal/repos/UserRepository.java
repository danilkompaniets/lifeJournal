package com.danilkompaniets.lifeJournal.repos;

import com.danilkompaniets.lifeJournal.entities.DayResultsEntity;
import com.danilkompaniets.lifeJournal.entities.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<UserEntity, Long> {
    UserEntity findByUsername(String username);

    UserEntity findByDayResults(DayResultsEntity dayResults);
}
