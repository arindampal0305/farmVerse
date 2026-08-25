package com.farmverse.backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.Data;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "crops")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Crop {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "crop_name", nullable = false)
    private String cropName;
    @Column(name = "crop_type", nullable = false)
    private String cropType;
    @Column(nullable = false)
    private Integer quantity;
    @Column(name = "sowing_date",nullable = false)
    private LocalDate sowingDate;
    @Column(name = "harvest_date",nullable = false)
    private LocalDate harvestDate;
    
    @Column(name = "revenue")
    private Double revenue;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "farm_id", nullable = false)
    private Farm farm;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate(){
        this.createdAt = LocalDateTime.now();
    }
}

/*
LocalDate for sowingDate/harvestDate: calendar dates without a time component
Integer quantity: A whole number count/measure
@ManyToOne to Farm: the other side of the relationship set up in Farm.java's @OneToMany. This farm_id foreign key  will be stored in the Postgres to link crop to its farm
 */