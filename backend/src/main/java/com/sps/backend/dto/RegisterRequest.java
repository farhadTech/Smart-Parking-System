package com.sps.backend.dto;

import com.sps.backend.entity.Role;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RegisterRequest {

    @NotBlank(message = "Full name is required")
    private String fullName;

    @Email(message = "Email is invalid")
    @NotBlank(message = "Email is required")
    private String email;

    private String phone;

    @NotBlank(message = "Password is required")
    private String password;

    private Role role;
}