package com.farmverse.backend.service;

import com.farmverse.backend.dto.ApplicationHistoryResponse;
import com.farmverse.backend.entity.ApplicationHistory;
import com.farmverse.backend.repository.ApplicationHistoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;


import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ApplicationHistoryService {

    private final ApplicationHistoryRepository applicationHistoryRepository;


    public void log(
            String username,
            String action,
            String entityType,
            String entityId,
            String description
    ) {
        ApplicationHistory history = new ApplicationHistory();

        history.setUsername(username);
        history.setAction(action);
        history.setEntityType(entityType);
        history.setEntityId(entityId);
        history.setDescription(description);
        history.setTimestamp(LocalDateTime.now());

        applicationHistoryRepository.save(history);
    }

    public List<ApplicationHistoryResponse> getAllHistory() {

        return applicationHistoryRepository.findAllByOrderByTimestampDesc()
                .stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    public List<ApplicationHistoryResponse> getUserHistory(String username) {

        return applicationHistoryRepository
                .findByUsernameOrderByTimestampDesc(username)
                .stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    private ApplicationHistoryResponse convertToResponse(
            ApplicationHistory history
    ) {
        return new ApplicationHistoryResponse(
                history.getUsername(),
                history.getAction(),
                history.getEntityType(),
                history.getEntityId(),
                history.getDescription(),
                history.getTimestamp()
        );
    }
}