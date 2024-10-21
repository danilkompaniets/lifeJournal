package com.danilkompaniets.lifeJournal.services;

import com.danilkompaniets.lifeJournal.dao.AddTaskDao;
import com.danilkompaniets.lifeJournal.entities.DayResultsEntity;
import com.danilkompaniets.lifeJournal.entities.GoalsEntity;
import com.danilkompaniets.lifeJournal.entities.GoalsHeader;
import com.danilkompaniets.lifeJournal.entities.UserEntity;
import com.danilkompaniets.lifeJournal.repos.DayResultsRepository;
import com.danilkompaniets.lifeJournal.repos.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class DayResultsService {

    private final UserRepository userRepository;
    private final DayResultsRepository dayResultsRepository;

    public DayResultsService(UserRepository userRepository, DayResultsRepository dayResultsRepository) {
        this.userRepository = userRepository;
        this.dayResultsRepository = dayResultsRepository;
    }

    public List<DayResultsEntity> addDayResult(Long userId) {
        Optional<UserEntity> user = userRepository.findById(userId);

        if (user.isPresent()) {
            UserEntity userEntity = user.get();

            DayResultsEntity dayResultsEntity = new DayResultsEntity();

            dayResultsEntity.setDate(new Date());
            dayResultsEntity.setUser(userEntity);

            List<GoalsHeader> goalsHeaders = user.get().getGoalsHeaders();
            List<GoalsEntity> goals = new ArrayList<>();

            for (GoalsHeader goalHeader : goalsHeaders) {
                GoalsEntity goalsEntity = new GoalsEntity();
                goalsEntity.setTitle(goalHeader.getTitle());
                goalsEntity.setCompleted(false);
                goalsEntity.setDayResultsEntity(dayResultsEntity);
                goals.add(goalsEntity);
            }

            dayResultsEntity.setGoals(goals);
            userEntity.getDayResults().add(dayResultsEntity);
            UserEntity result = userRepository.save(userEntity);

            return result.getDayResults();
        }
        return null;
    }

    public DayResultsEntity editTask(Integer dayResultId, AddTaskDao editedTask) {
        Optional<DayResultsEntity> dayResult = dayResultsRepository.findById(dayResultId);
        if (dayResult.isPresent()) {
            DayResultsEntity dayResultEntity = dayResult.get();
            dayResultEntity.setTitle(editedTask.title());
            dayResultEntity.setDescription(editedTask.description());
            return dayResultsRepository.save(dayResultEntity);
        }
        return null;
    }

    public DayResultsEntity deleteDayResult(Integer dayResultId) {
        Optional<DayResultsEntity> dayResults = dayResultsRepository.findById(dayResultId);
        if (dayResults.isPresent()) {
            DayResultsEntity dayResultsEntity = dayResults.get();
            dayResultsRepository.delete(dayResultsEntity);
            return dayResultsEntity;
        }
        return null;
    }

    public List<DayResultsEntity> getAllDayResultsForUser(Long userId) {
        Optional<UserEntity> user = userRepository.findById(userId);
        if (user.isPresent()) {
            UserEntity userEntity = user.get();
            return userEntity.getDayResults();
        }
        return null;
    }

    public DayResultsEntity getDayResultById(Integer dayResultId) {
        Optional<DayResultsEntity> dayResults = dayResultsRepository.findById(dayResultId);
        return dayResults.orElse(null);
    }
}
