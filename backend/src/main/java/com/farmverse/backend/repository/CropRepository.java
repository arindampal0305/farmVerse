package com.farmverse.backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.farmverse.backend.entity.Crop;

@Repository
public interface CropRepository extends JpaRepository<Crop, Long> {

    // Find a crop by crop ID and farmer ID (ownership check)
    Optional<Crop> findByIdAndFarm_Farmer_Id(Long cropId, Long farmerId);

    // Count total crops belonging to a farmer
    long countByFarm_Farmer_Id(Long farmerId);

    // Fetch all crops belonging to a farmer
    List<Crop> findByFarm_Farmer_Id(Long farmerId);

    // Fetch all crops belonging to a farmer
    List<Crop> findAllByFarm_Farmer_Id(Long farmerId);
}