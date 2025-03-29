package com.example.demo.Controller;

import com.example.demo.Response.RolesResponse;
import com.example.demo.Service.RolesService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin("*")
@RestController
@AllArgsConstructor
@RequestMapping("/api/role")
public class RolesController {
    @Autowired
    private RolesService rolesService;

    @GetMapping("/")
    public ResponseEntity<?> getAllRoles() {
        List<RolesResponse> rolesResponses = rolesService.getAllRoles();

        return ResponseEntity.ok(rolesResponses);
    }
}
