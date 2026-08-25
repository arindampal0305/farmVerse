# FarmVerse: Precision Agriculture Management Platform
## Milestone 4 Progress Report
**Duration:** 2 weeks | **Status:** Completed
| Version 2.0.0
---

## Executive Summary

Milestone 4 focuses on AI feature delivery, frontend completion, and platform polish. The team shipped the full Krishi AI chatbot (backend and frontend), integrated weather data into the farmer experience, and built an analytics page for collective farm insights. Additionally, we successfully implemented a keyless, client-side Mandi Price Tracker and fully delivered the frontend integration for the Application Audit History logs.

**Team Velocity:** 7 objectives |

---

## Objectives & Deliverables

### 1. Krishi AI -- Backend Implementation
**Owner:** Arindam Pal
**Status:** Completed

**Details:**

Implemented the complete backend for Krishi AI, FarmVerse's AI-powered farming assistant, using the Google Gemini API. The implementation follows best practices for LLM integration including careful prompt engineering, hyperparameter configuration, and context management.

**Key Implementation Details:**
- Integrated Google Gemini model via REST API calls from the Spring Boot service layer
- Designed a dedicated system prompt that scopes Krishi AI strictly to agriculture-related queries, preventing off-topic responses
- Applied context injection to enrich each request with relevant session context before forwarding to the model
- Configured model hyperparameters (temperature, top-p, max output tokens) tuned for factual, concise agricultural responses
- Structured the prompt pipeline: system prompt + context injection + user message + assistant prompt pattern

**Deliverables:**
- `ChatbotController.java` : exposes `POST /farmverse/chat/sendMessage`
- `ChatbotService.java` : Gemini API integration, prompt construction, response parsing
- `ChatRequest.java` / `ChatResponse.java` : DTOs for the chat endpoint
- Environment variable integration for `GEMINI_API_KEY` (never hardcoded)
- Postman-tested success and failure cases

**Impact:** Farmers can now ask agriculture-related questions and receive accurate, AI-generated guidance directly within the platform.

---

### 2. Krishi AI -- Frontend UI Implementation
**Owner:** Arindam Pal
**Status:** Completed

**Details:**

Built and wired the complete frontend chat interface for Krishi AI. The UI is designed to feel responsive and polished, giving farmers a smooth conversational experience.

**Key Features Implemented:**
- Chat message box with send functionality wired to `POST /farmverse/chat/sendMessage`
- Auto-scroll : the chat window automatically scrolls to the latest message as the conversation grows
- Smooth rendering of new messages with transition effects for a native-feeling experience
- Clear visual distinction between user messages and Krishi AI responses
- Loading/pending state while awaiting the AI response
- Error handling displayed inline if the API call fails

**Deliverables:**
- Krishi AI chat component integrated into the farmer dashboard
- API wiring with JWT-authenticated requests
- Responsive layout compatible with the existing FarmVerse UI

**Impact:** Farmers have a fully functional, smooth chat interface to interact with Krishi AI without leaving the platform.

---

### 3. Weather Tab Integration
**Owner:** Ananya C.Y
**Status:** Completed

**Details:**

Integrated a dedicated weather tab into the FarmVerse frontend, giving farmers access to real-time weather data relevant to their farming decisions.

**Deliverables:**
- Weather tab component integrated into the farmer dashboard
- Real-time weather data fetched and displayed
- Weather information presented in a farmer-friendly format

**Impact:** Farmers can monitor weather conditions directly within FarmVerse, supporting better crop and irrigation decisions without switching platforms.

---

### 4. Analytics Page
**Owner:** Ananya C.Y
**Status:** Completed

**Details:**

Built a dedicated analytics page that aggregates and visualizes collective farm data for the logged-in farmer, providing a high-level view of their agricultural activity.

**Key Features:**
- Collective data visualization across farms and crops
- Summary statistics for farm area, crop counts, and activity
- Clean, readable layout consistent with the FarmVerse design system

**Deliverables:**
- Analytics page component
- Data aggregation logic wired to existing Farm and Crop APIs
- Integrated into farmer navigation

**Impact:** Farmers gain a centralized view of their data, enabling better planning and performance tracking over time.

---

### 5. Application Logging and History Integration
**Owners:** Bhagyesh Patil, Arfa Banu
**Status:** Completed

**Details:**

Implemented a full audit log system to track and query requests made to the server, maintaining a clear ledger of administrative and agricultural activity. 

**Backend Deliverables:**
- `ApplicationHistory.java` (JPA Entity): stores fields such as action, username, entity type, entity ID, description, and timestamp
- `ApplicationHistoryRepository.java`: supports queries sorted by timestamp descending
- `ApplicationHistoryController.java`: exposes `GET /farmverse/admin/history` (Admin view of all logs) and `GET /farmverse/farmer/history` (Farmer view of own logs)
- Request-level logging integrated across `FarmService`, `CropService`, and `AdminService`

**Frontend Deliverables:**
- `history.js` (Service): calls JWT-authenticated backend history endpoints
- `History.jsx` (Page): displays audit logs in a clean card-styled layout, featuring dynamic role-based columns, outline status badges, and search/category filters
- `Sidebar.jsx` & `AppRoutes.jsx` integration

---

### 6. Presentation Update
**Owner:** Arfa Banu
**Status:** Completed

**Details:**

Updating the project presentation to reflect Milestone 4 deliverables, including the Krishi AI integration, weather tab, analytics page, and overall platform progress.

**Planned Updates:**
- Add Krishi AI slide covering architecture, prompt design, and demo
- Update tech stack slide to include Google Gemini API
- Refresh team contributions slide
- Update feature list and architecture diagram

---

### 7. Mandi Price Tracker
**Owner:** Ananya C.Y
**Status:** Completed

**Details:**

Designed and implemented a keyless, client-side Mandi Price Tracker to give farmers live wholesale market rates.

**Key Features Implemented:**
- `mandiService.js` (Service): resolves local market rates dynamically based on farm location and crop commodity type (supporting tons or quintals), including 5-day historical sparkline trends
- `MandiPriceWidget.jsx` (UI Component): displays live modal pricing, price ranges (Min/Max), and a fully animated 5-day CSS-rendered sparkline chart
- Multi-page integration across the Farm Details page, Crop Details page, and the main Crop List view
- Landing page mock preview highlighting generalized market categories

---

## Testing & Validation (Milestone 4)

### AI & History Endpoint Testing
- `POST /farmverse/chat/sendMessage` - success response with agriculture queries
- Off-topic query handling - Krishi AI correctly declines non-agriculture questions
- `GET /farmverse/admin/history` - yields all system audit logs when called by ADMIN
- `GET /farmverse/farmer/history` - yields only personal logs when called by FARMER

### Frontend Testing
- Krishi AI chat - message send, response render, auto-scroll verified
- Weather tab - data loads correctly on tab open
- Analytics page - all data aggregation displays correctly
- Mandi Price Tracker - location matching, price scaling, and sparklines verified
- History - role-based columns, search filters, and action badge colors verified
- Cross-component navigation - no regressions observed

---

## Team Contributions (Milestone 4)

| Member | Role | Milestone 4 Contributions                                                                                           |
|--------|------|---------------------------------------------------------------------------------------------------------------------|
| **Arindam Pal** | Backend \| UI/UX Design | Krishi AI backend (Gemini API, prompt engineering), chat UI, registration role constraints, and page layout updates |
| **Ananya C.Y** | Frontend | Weather tab integration, Analytics page, Admin Dashboard, Mandi Price integration                                   |
| **Bhagyesh Patil** | Backend | Chat logging/history backend feature                                                                                |
| **Arfa Banu** | Database + Presentation | Chat logging/history backend feature, Presentation update                                             |
| **Shaik Kousar Bee** | AI/ML | AI implementation support                                                                                           |

---

## Next Steps (Post Milestone 4)

### Immediate
1. Complete the Admin Dashboard UI (Ananya)
2. Finalize and review the updated presentation (Arfa)
3. End-to-end testing of full Krishi AI flow including chat history retrieval
4. Final integration testing across all Milestone 4 features

---

Last Updated: 11-08-2026
Maintained By: Team A: Infosys Springboard