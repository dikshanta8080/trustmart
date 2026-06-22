package com.trustmart.trustmart.common.service;

import com.trustmart.trustmart.common.events.OtpGeneratedEvent;
import com.trustmart.trustmart.common.events.UserRegisteredEvent;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

@RequiredArgsConstructor
@Service
@Slf4j
public class NotificationService {
    private final TemplateEngine templateEngine;
    private final JavaMailSender javaMailSender;

    public void sendRegisteredNotification(UserRegisteredEvent event) {
        Context context = new Context();
        context.setVariable("id", event.id());
        context.setVariable("name", event.name());
        context.setVariable("email", event.email());
        context.setVariable("address", event.address());
        String html = templateEngine.process("email/welcome", context);
        try {
            MimeMessage message = javaMailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            helper.setTo(event.email());
            helper.setSubject("User Registered Successfully");
            helper.setText(html, true);
            javaMailSender.send(message);
        } catch (MessagingException e) {
            log.error("Failed to send email notification");
        }
    }

    public void sendOtpNotification(OtpGeneratedEvent event) {
        Context context = new Context();
        context.setVariable("otp", event.otp());
        context.setVariable("expiry", event.expiry());

        String html = templateEngine.process("email/otp", context);

        try {
            MimeMessage message = javaMailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);

            helper.setTo(event.email());
            helper.setSubject("Your OTP Code");
            helper.setText(html, true);

            javaMailSender.send(message);
        } catch (MessagingException e) {
            log.error("Failed to send OTP email", e);
        }
    }
}
