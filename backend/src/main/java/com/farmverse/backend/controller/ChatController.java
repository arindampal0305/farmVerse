package com.farmverse.backend.controller;

import com.farmverse.backend.dto.ChatRequest;
import com.farmverse.backend.dto.ChatResponse;
import com.farmverse.backend.service.ChatbotService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/farmverse/chat")
public class ChatController {

    private final ChatbotService chatbotService;

    @PostMapping("/sendMessage")
    public ResponseEntity<ChatResponse> chat(@Valid @RequestBody ChatRequest request) {
        return ResponseEntity.ok(chatbotService.chat(request));
    }
}