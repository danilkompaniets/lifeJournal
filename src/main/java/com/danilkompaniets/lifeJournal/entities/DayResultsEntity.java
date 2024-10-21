package com.danilkompaniets.lifeJournal.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.util.Date;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "day_results")
public class DayResultsEntity {
    @Id
    @GeneratedValue
    private Integer id;

    @CreationTimestamp
    private Date date;

    private String title;
    private String description;

    @ManyToOne
    @JsonBackReference
    @JoinColumn(name = "user_id")
    private UserEntity user;

    @OneToMany(mappedBy = "dayResultsEntity", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<GoalsEntity> goals;
}
