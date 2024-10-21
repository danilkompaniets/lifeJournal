package com.danilkompaniets.lifeJournal.repos;

import com.danilkompaniets.lifeJournal.entities.DayResultsEntity;
import com.danilkompaniets.lifeJournal.entities.GoalsEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface GoalsRepository extends JpaRepository<GoalsEntity, Integer> {
}
