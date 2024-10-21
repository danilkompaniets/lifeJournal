package com.danilkompaniets.lifeJournal.controllers;

import com.danilkompaniets.lifeJournal.dao.AddTaskDao;
import com.danilkompaniets.lifeJournal.entities.DayResultsEntity;
import com.danilkompaniets.lifeJournal.services.DayResultsService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
public class TasksController {

    private final DayResultsService dayResultsService;

    public TasksController(DayResultsService dayResultsService) {
        this.dayResultsService = dayResultsService;
    }

    @PostMapping("/addDayResult/{userId}")
    public ResponseEntity<?> addDayResult(@PathVariable Long userId) {
        List<DayResultsEntity> result = dayResultsService.addDayResult(userId);
        if (result == null) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(result);
    }

    @PutMapping("/editTask/{dayResultId}")
    public ResponseEntity<?> editTask(@PathVariable Integer dayResultId, @RequestBody AddTaskDao editedTask) {
        DayResultsEntity result = dayResultsService.editTask(dayResultId, editedTask);
        if (result == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(result);
    }

    @DeleteMapping("/deleteDayResult/{dayResultId}")
    public ResponseEntity<?> deleteDayResult(@PathVariable Integer dayResultId) {
        DayResultsEntity result = dayResultsService.deleteDayResult(dayResultId);
        if (result == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(result);
    }

    @GetMapping("/getAllDayResults/{userId}")
    public ResponseEntity<?> getAllDayResults(@PathVariable Long userId) {
        List<DayResultsEntity> result = dayResultsService.getAllDayResultsForUser(userId);
        if (result == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(result);
    }

    @GetMapping("/getDayResultsById/{dayResultId}")
    public ResponseEntity<?> getDayResultsById(@PathVariable Integer dayResultId) {
        DayResultsEntity result = dayResultsService.getDayResultById(dayResultId);
        if (result == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(result);
    }
}
