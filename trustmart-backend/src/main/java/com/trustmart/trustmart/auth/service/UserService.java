package com.trustmart.trustmart.auth.service;

import com.trustmart.trustmart.auth.dto.request.RegistrationRequest;
import com.trustmart.trustmart.auth.dto.response.UserResponse;
import com.trustmart.trustmart.auth.mapper.EventMapper;
import com.trustmart.trustmart.auth.mapper.UserMapper;
import com.trustmart.trustmart.auth.model.Role;
import com.trustmart.trustmart.auth.model.User;
import com.trustmart.trustmart.auth.repository.UserRepository;
import com.trustmart.trustmart.common.dto.response.PagedResponse;
import com.trustmart.trustmart.common.exceptions.BusinessException;
import com.trustmart.trustmart.common.exceptions.ResourceNotFoundException;
import com.trustmart.trustmart.common.helpers.LoggedInUser;
import com.trustmart.trustmart.common.model.ImageData;
import com.trustmart.trustmart.common.repository.ImageDataRepository;
import com.trustmart.trustmart.common.service.ImageUploadService;
import com.trustmart.trustmart.common.specifications.UserSpecification;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final ApplicationEventPublisher applicationEventPublisher;
    private final ImageUploadService imageUploadService;
    private final ImageDataRepository imageDataRepository;


    @Transactional
    public UserResponse createCustomer(RegistrationRequest request) {
        checkIfUserAlreadyExists(request);
        User user = UserMapper.toEntity(request);
        user.setRole(Role.USER);

        user.setPassword(passwordEncoder.encode(request.password()));
        UserResponse response = UserMapper.toResponse(userRepository.save(user));
        applicationEventPublisher.publishEvent(EventMapper.toEvent(response));
        return response;
    }


    private void checkIfUserAlreadyExists(RegistrationRequest request) {
        if (userRepository.existsByEmail(request.email())) {
            throw new BusinessException("User with provided email already exists");
        }
    }

    @Transactional(readOnly = true)
    public PagedResponse<UserResponse> findAllUsers(String keyword, Pageable pageable) {
        Specification<User> userSpecification = UserSpecification.searchByKeyword(keyword);
        Page<User> userPage = userRepository.findAll(userSpecification, pageable);
        Page<UserResponse> userResponsePage = userPage.map(UserMapper::toResponse);
        return PagedResponse.toPagedResponse(userResponsePage);
    }

    @Transactional
    public void deleteUser(UUID id) {
        int rowsEffected = userRepository.softDeleteById(id);
        if (rowsEffected <= 0) {
            throw new BusinessException("Could not delete the user");
        }
    }

    @Transactional(readOnly = true)
    public UserResponse getUserProfile() {
        UUID loggedInUserId = LoggedInUser.getLoggedInUserId();
        User user = userRepository.findById(loggedInUserId).orElseThrow(() -> new ResourceNotFoundException("User not found"));
        return UserMapper.toResponse(user);
    }

    @Transactional
    public UserResponse addProfileImage(MultipartFile multipartFile) {
        UUID loggedInUserId = LoggedInUser.getLoggedInUserId();
        User user = userRepository.findById(loggedInUserId).orElseThrow(() -> new ResourceNotFoundException("User not found"));
        if (user.getImageData() != null) {
            user.setImageData(null);
        }
        ImageData savedImage = imageUploadService.save(multipartFile);
        user.setImageData(savedImage);
        return UserMapper.toResponse(userRepository.save(user));

    }
}
