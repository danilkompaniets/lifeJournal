package com.danilkompaniets.lifeJournal.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class GoalsEntity {
    @Id
    @GeneratedValue
    private Integer id;

    @Column(nullable = false, unique = true)
    private String title;

    private boolean isCompleted = false;

    @ManyToOne
    @JoinColumn(name = "day_results_id")
    private DayResultsEntity dayResultsEntity;

    @ManyToOne
    @JoinColumn(name = "goals_headers_id")
    private GoalsHeader goalsHeader;
}
