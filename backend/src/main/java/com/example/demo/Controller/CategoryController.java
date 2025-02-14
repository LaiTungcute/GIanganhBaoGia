package com.example.demo.Controller;

import com.example.demo.Repository.CategoryRepository;
import com.example.demo.Response.CategoryResponse;
import com.example.demo.Service.CategoryService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin("*")
@AllArgsConstructor
@RequestMapping("/api/category")
public class CategoryController {
    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private CategoryService categoryService;

    @GetMapping("/")
    public ResponseEntity<?> getAllCategory() {
        List<CategoryResponse> categoryResponses = categoryService.getAllCategory();
        if (categoryResponses == null) {
            ResponseEntity.badRequest().body("Category is not found");
        }
        return ResponseEntity.ok(categoryResponses);
    }
}
