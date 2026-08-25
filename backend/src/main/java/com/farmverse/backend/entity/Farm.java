package com.farmverse.backend.entity;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name="farms")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Farm {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "farm_name", nullable = false)
    private String farmName;
    @Column(name = "farm_type", nullable = false)
    private String farmType;
    @Column(name = "area_sq_mt", nullable = false)
    private BigDecimal areaSqMt;
    @Column(name = "soil_type", nullable = false)
    private String soilType;
    @Column(nullable = false)
    private String location;
   

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "farmer_id", nullable = false)
    private User farmer;

    @OneToMany(mappedBy = "farm", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Crop> crops = new ArrayList<>();

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate(){
        this.createdAt = LocalDateTime.now();
    }

}

/*
BigDecimal for areaSqMt: standard practice for any numeric value that isn't purely for display/calculation-only
purposes; avoids floating-point precision issues.
@ManyToOne to User: this is the ownership link. Many farms can belong to one farmer.
@OneToMany(cascade = CascadeType.ALL, orphanRemoval = true): Deleting a farm will also delete all crops it had.
fetch = FetchType.LAZY on the farmer relationship: avoids loading the full User object every time you fetch a farm, unless needed.
 */