package com.danilkompaniets.lifeJournal.repos;

import com.danilkompaniets.lifeJournal.dao.AddTaskDao;
import com.danilkompaniets.lifeJournal.entities.DayResultsEntity;
import com.danilkompaniets.lifeJournal.entities.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface DayResultsRepository extends JpaRepository<DayResultsEntity, Integer> {

    List<DayResultsEntity> findAllByUserId(Long userId);
}
