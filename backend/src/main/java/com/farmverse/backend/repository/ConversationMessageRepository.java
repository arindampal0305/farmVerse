package com.farmverse.backend.repository;

import com.farmverse.backend.entity.ConversationMessage;
import com.farmverse.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ConversationMessageRepository extends JpaRepository<ConversationMessage, Long> {

    List<ConversationMessage> findTop8ByUserOrderByCreatedAtDesc(User user);

}