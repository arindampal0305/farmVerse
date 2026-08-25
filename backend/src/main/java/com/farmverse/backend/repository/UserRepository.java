package com.farmverse.backend.repository;

import java.util.List;
import com.farmverse.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.farmverse.backend.enums.Role;
import java.util.Optional; //to avoid exception blowup

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
        Optional<User> findByUsername(String username);
        Optional<User> findByEmail(String email);
        boolean existsByUsername(String Username);
        boolean existsByEmail(String email);
        long countByRole(Role role);
        List<User> findByRole(Role role);
}
    //findByUsername / findByEmail : It will be used during login to fetch users.
    //existsByUsername / existsByEmail : Used during registration to check duplicates before saving
