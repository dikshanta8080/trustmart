package com.trustmart.trustmart.auth.controller;

import com.trustmart.trustmart.auth.dto.response.UserResponse;
import com.trustmart.trustmart.auth.service.UserService;
import com.trustmart.trustmart.common.dto.request.PaginationRequest;
import com.trustmart.trustmart.common.dto.response.ApiResponse;
import com.trustmart.trustmart.common.dto.response.PagedResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RequiredArgsConstructor
@RestController
@RequestMapping("/users")
public class UserController {
    private final UserService userService;

    @PreAuthorize("hasAuthority('ALL_USER_VIEW')")
    @GetMapping
    public ResponseEntity<ApiResponse<PagedResponse<UserResponse>>> getUsers(
            @ModelAttribute PaginationRequest request,
            @RequestParam(name = "keyword", required = false) String keyword
    ) {
        PagedResponse<UserResponse> allUsers = userService.findAllUsers(keyword, request.toPageable());
        return ResponseEntity.ok().body(ApiResponse.success(allUsers, "User Fetched Successfully"));
    }

    @PreAuthorize("hasAuthority('USER_DELETE')")
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<String>> deleteUser(@PathVariable UUID id) {
        userService.deleteUser(id);
        return ResponseEntity.ok().body(ApiResponse.success("User deleted", "Deletion Completed"));
    }
}
