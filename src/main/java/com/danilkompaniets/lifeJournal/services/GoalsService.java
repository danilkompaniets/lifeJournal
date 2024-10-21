package com.danilkompaniets.lifeJournal.services;

import com.danilkompaniets.lifeJournal.entities.DayResultsEntity;
import com.danilkompaniets.lifeJournal.entities.GoalsEntity;
import com.danilkompaniets.lifeJournal.entities.GoalsHeader;
import com.danilkompaniets.lifeJournal.entities.UserEntity;
import com.danilkompaniets.lifeJournal.repos.DayResultsRepository;
import com.danilkompaniets.lifeJournal.repos.GoalsHeaderRepository;
import com.danilkompaniets.lifeJournal.repos.GoalsRepository;
import com.danilkompaniets.lifeJournal.repos.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class GoalsService {
    private final GoalsRepository goalsRepository;
    private final GoalsHeaderRepository goalsHeaderRepository;
    private final DayResultsRepository dayResultsRepository;
    private final UserRepository userRepository;

    public GoalsService(GoalsRepository goalsRepository, GoalsHeaderRepository goalsHeaderRepository, DayResultsRepository dayResultsRepository, UserRepository userRepository) {
        this.goalsRepository = goalsRepository;
        this.goalsHeaderRepository = goalsHeaderRepository;
        this.dayResultsRepository = dayResultsRepository;
        this.userRepository = userRepository;
    }

    public GoalsEntity markAsCompleted(Integer goalId) {
        Optional<GoalsEntity> goal = goalsRepository.findById(goalId);
        if (goal.isPresent()) {
            GoalsEntity goalsEntity = goal.get();
            goalsEntity.setCompleted(true);

            return goalsRepository.save(goalsEntity);
        }
        return null;
    }

    public GoalsEntity markAsUncompleted(Integer goalId) {
        Optional<GoalsEntity> goal = goalsRepository.findById(goalId);
        if (goal.isPresent()) {
            GoalsEntity goalsEntity = goal.get();
            goalsEntity.setCompleted(false);

            return goalsRepository.save(goalsEntity);
        }
        return null;
    }

    public String deleteGoal(Integer goalHeaderId) {
        Optional<GoalsHeader> goalsHeaderOpt = goalsHeaderRepository.findById(goalHeaderId);

        if (goalsHeaderOpt.isPresent()) {
            GoalsHeader goalsHeader = goalsHeaderOpt.get();
            List<DayResultsEntity> allDayResultsForUser = goalsHeader.getUser().getDayResults();

            for (DayResultsEntity dayResultsEntity : allDayResultsForUser) {
                dayResultsEntity.getGoals().removeIf(goal -> goal.getGoalsHeader().getId().equals(goalHeaderId));
                dayResultsRepository.save(dayResultsEntity);
            }

            goalsHeaderRepository.delete(goalsHeader);

            return "Goal deleted";
        }

        return null;
    }

    public List<GoalsHeader> insertGoal(Long userId, String goalTitle) {
        Optional<UserEntity> user = userRepository.findById(userId);
        List<DayResultsEntity> allDayResults = dayResultsRepository.findAllByUserId(userId);

        if (user.isPresent()) {

            UserEntity userEntity = user.get();

            // Create a new GoalsHeader
            GoalsHeader goalsHeader = new GoalsHeader();
            goalsHeader.setTitle(goalTitle);
            goalsHeader.setCompleted(false);
            goalsHeader.setUser(userEntity);

            // Associate GoalsHeader with UserEntity
            userEntity.getGoalsHeaders().add(goalsHeader);

            // Save GoalsHeader before creating the GoalsEntity
            goalsHeader = goalsHeaderRepository.save(goalsHeader); // Assuming you have a repository for GoalsHeader

            for (DayResultsEntity dayResultsEntity : allDayResults) {
                // Create and associate a new GoalsEntity with DayResultsEntity
                GoalsEntity newGoal = new GoalsEntity();
                newGoal.setTitle(goalTitle);
                newGoal.setCompleted(false);
                newGoal.setGoalsHeader(goalsHeader);
                newGoal.setDayResultsEntity(dayResultsEntity);

                // Add the goal to the day results and save
                dayResultsEntity.getGoals().add(newGoal);
                goalsRepository.save(newGoal);
                dayResultsRepository.save(dayResultsEntity);
            }

            // Save the updated user entity with the new goal headers
            userRepository.save(userEntity);

            return userEntity.getGoalsHeaders();
        }

        return null;
    }

    public List<GoalsHeader> selectAllGoals(Long userId) {
        Optional<UserEntity> user = userRepository.findById(userId);
        if (user.isPresent()) {
            UserEntity userEntity = user.get();

            return userEntity.getGoalsHeaders();
        }

        return null;
    }
}
