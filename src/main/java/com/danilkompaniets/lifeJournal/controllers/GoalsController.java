package com.danilkompaniets.lifeJournal.controllers;

import com.danilkompaniets.lifeJournal.entities.GoalsEntity;
import com.danilkompaniets.lifeJournal.entities.GoalsHeader;
import com.danilkompaniets.lifeJournal.services.GoalsService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/goals")
public class GoalsController {
    private final GoalsService goalsService;

    public GoalsController(GoalsService goalsService) {
        this.goalsService = goalsService;
    }

    @PutMapping("/checkGoal/{goalId}")
    public ResponseEntity<?> checkGoal(@PathVariable Integer goalId) {
        GoalsEntity result = goalsService.markAsCompleted(goalId);
        if (result == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(result);
    }

    @PutMapping("/uncheckGoal/{goalId}")
    public ResponseEntity<?> uncheckGoal(@PathVariable Integer goalId) {
        GoalsEntity result = goalsService.markAsUncompleted(goalId);
        if (result == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(result);
    }


    @DeleteMapping("/deleteGoal/{goalHeaderId}")
    public ResponseEntity<?> deleteGoal(@PathVariable Integer goalHeaderId) {
        String result = goalsService.deleteGoal(goalHeaderId);
        if (result == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(result);
    }

    @PutMapping("/addGoal/{userId}")
    public ResponseEntity<?> addGoal(@PathVariable Long userId, @RequestBody String goalTitle) {
        List<GoalsHeader> result = goalsService.insertGoal(userId, goalTitle);

        if (result == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(result);
    }

    @GetMapping("/getAllGoalsHeaders/{userId}")
    public ResponseEntity<?> getAllGoals(@PathVariable Long userId) {
        List<GoalsHeader> result = goalsService.selectAllGoals(userId);
        if (result == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(result);
    }
}
