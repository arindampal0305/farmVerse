package com.farmverse.backend;

import com.farmverse.backend.repository.CropRepository;
import com.farmverse.backend.repository.FarmRepository;
import com.farmverse.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class DbTest implements CommandLineRunner {

    private final UserRepository userRepository;
    private final FarmRepository farmRepository;
    private final CropRepository cropRepository;

    @Value("${spring.datasource.url}")
    private String url;

    @Value("${spring.datasource.username}")
    private String username;

    @Override
    public void run(String... args) {
        System.out.println("Datasource URL = " + url);
        System.out.println("Datasource User = " + username);
        try {
            long userCount = userRepository.count();
            long farmCount = farmRepository.count();
            long cropCount = cropRepository.count();
            System.out.println("--- DB STATE ---");
            System.out.println("Users: " + userCount);
            System.out.println("Farms: " + farmCount);
            System.out.println("Crops: " + cropCount);
            System.out.println("----------------");
        } catch (Exception e) {
            System.err.println("Failed to query DB status: " + e.getMessage());
        }
    }
}