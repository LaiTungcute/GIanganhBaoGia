package com.example.demo.Service;

import com.example.demo.Config.JWT.JwtTokenProvider;
import com.example.demo.Entity.Roles;
import com.example.demo.Entity.User;
import com.example.demo.Repository.RolesRepository;
import com.example.demo.Repository.UserRepository;
import com.example.demo.Request.LoginRequest;
import com.example.demo.Response.JwtAuthResponse;
import com.example.demo.Response.UserResponse;
import com.example.demo.Service.Imp.UserDetailImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class AuthService {
    private static final Logger logger = LoggerFactory.getLogger(AuthService.class);

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserRepository userRepository;

    @Autowired
    RolesRepository roleRepository;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    JwtTokenProvider jwtUtils;

    public AuthService(
            JwtTokenProvider jwtUtils,
            UserRepository userRepository,
            PasswordEncoder encoder,
            AuthenticationManager authenticationManager) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.encoder = encoder;
        this.jwtUtils = jwtUtils;
    }

    public JwtAuthResponse login(LoginRequest loginRequest) {
        JwtAuthResponse response = new JwtAuthResponse();

        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

            SecurityContextHolder.getContext().setAuthentication(authentication);
            String jwt = jwtUtils.generateJwtToken(authentication);

            UserDetailImp userDetails = (UserDetailImp) authentication.getPrincipal();
            List<String> roles = userDetails.getAuthorities().stream()
                    .map(GrantedAuthority::getAuthority)
                    .collect(Collectors.toList());

            UserResponse userResponse = new UserResponse(userDetails.getId(), userDetails.getUsername(), userDetails.getEmail() , userDetails.getPhoneNumber(), roles);

            response.setAccessToken(jwt);
            response.setUser(userResponse);
        }catch (Exception e) {
            response = null;
        }

        return response;
    }

    public UserResponse getUserById(long id) {
        User user = userRepository.findById(id).orElseThrow(() ->new IllegalArgumentException("User not found"));

        UserResponse userResponse = new UserResponse();
        userResponse.setId(user.getId());
        userResponse.setUsername(user.getUsername());
        userResponse.setEmail(user.getEmail());
        userResponse.setPhoneNumber(user.getPhoneNumber());

        List<String> auths = user.getRoles().stream().map(Roles::getRoleName).toList();
        List<String> roles = new ArrayList<>(auths);

        userResponse.setAuth(roles);

        return userResponse;
    }
}