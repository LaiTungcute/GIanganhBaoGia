package com.example.demo.Service;

import com.example.demo.Entity.Roles;
import com.example.demo.Repository.RolesRepository;
import com.example.demo.Response.RolesResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class RolesService {
    @Autowired
    private RolesRepository rolesRepository;

    public List<RolesResponse> getAllRoles() {
        List<Roles> roles = rolesRepository.findAll();
        List<RolesResponse> rolesResponses = new ArrayList<>();

        for (Roles role : roles) {
            RolesResponse response = getResponse(role);
            rolesResponses.add(response);
        }

        return rolesResponses;
    }

    private RolesResponse getResponse(Roles role) {
        RolesResponse response = new RolesResponse();

        response.setRoleName(role.getRoleName());

        return response;
    }
}
