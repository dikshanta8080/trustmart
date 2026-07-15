package com.trustmart.trustmart.chat.interceptors;

import com.trustmart.trustmart.auth.model.UserPrinciple;
import com.trustmart.trustmart.auth.service.CustomUserDetailService;
import com.trustmart.trustmart.auth.service.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.messaging.support.MessageHeaderAccessor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

@RequiredArgsConstructor
@Component
public class JwtChannelInterceptor implements ChannelInterceptor {

    private final JwtService jwtService;
    private final CustomUserDetailService userDetailsService;

    @Override
    public Message<?> preSend(Message<?> message, MessageChannel channel) {

        StompHeaderAccessor accessor =
                MessageHeaderAccessor.getAccessor(message, StompHeaderAccessor.class);

        if (accessor == null) return message;

        if (StompCommand.CONNECT.equals(accessor.getCommand())) {

            String authHeader = accessor.getFirstNativeHeader("Authorization");

            if (authHeader == null || !authHeader.startsWith("Bearer ")) {
                throw new IllegalArgumentException("Missing token");
            }

            String token = authHeader.substring(7);

            String username = jwtService.extractUsername(token);

            UserDetails user = userDetailsService.loadUserByUsername(username);

            if (!jwtService.verifyToken(token, (UserPrinciple) user)) {
                throw new IllegalArgumentException("Invalid token");
            }

            UsernamePasswordAuthenticationToken authentication =
                    new UsernamePasswordAuthenticationToken(
                            user.getUsername(),
                            null,
                            user.getAuthorities()
                    );

            accessor.setUser(authentication);
        }

        return message;
    }
}
