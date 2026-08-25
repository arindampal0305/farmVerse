package com.farmverse.backend.security;

import org.springframework.security.oauth2.client.web.AuthorizationRequestRepository;
import org.springframework.security.oauth2.core.endpoint.OAuth2AuthorizationRequest;
import org.springframework.stereotype.Component;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

@Component
public class CustomAuthorizationRequestRepository
        implements AuthorizationRequestRepository<OAuth2AuthorizationRequest> {

    private static final String AUTH_REQUEST = "oauth2_auth_request";
    private static final String SELECTED_ROLE = "selected_role";

    @Override
    public OAuth2AuthorizationRequest loadAuthorizationRequest(HttpServletRequest request) {

        HttpSession session = request.getSession(false);

        if (session == null) {
            return null;
        }

        return (OAuth2AuthorizationRequest) session.getAttribute(AUTH_REQUEST);
    }

    @Override
    public void saveAuthorizationRequest(
            OAuth2AuthorizationRequest authorizationRequest,
            HttpServletRequest request,
            HttpServletResponse response) {

        HttpSession session = request.getSession();

        if (authorizationRequest == null) {
            session.removeAttribute(AUTH_REQUEST);
            return;
        }

        session.setAttribute(AUTH_REQUEST, authorizationRequest);

        String role = request.getParameter("role");

        if (role != null) {
            session.setAttribute(SELECTED_ROLE, role);
        }
    }

    @Override
    public OAuth2AuthorizationRequest removeAuthorizationRequest(
            HttpServletRequest request,
            HttpServletResponse response) {

        HttpSession session = request.getSession(false);

        if (session == null) {
            return null;
        }

        OAuth2AuthorizationRequest authRequest =
                (OAuth2AuthorizationRequest) session.getAttribute(AUTH_REQUEST);

        session.removeAttribute(AUTH_REQUEST);

        return authRequest;
    }

    public static String getSelectedRole(HttpServletRequest request) {

        HttpSession session = request.getSession(false);

        if (session == null) {
            return null;
        }

        return (String) session.getAttribute(SELECTED_ROLE);
    }

    public static void clearRole(HttpServletRequest request) {

        HttpSession session = request.getSession(false);

        if (session != null) {
            session.removeAttribute(SELECTED_ROLE);
        }
    }
}