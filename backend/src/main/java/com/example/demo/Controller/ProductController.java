package com.example.demo.Controller;

import com.example.demo.Request.ProductRequest;
import com.example.demo.Response.Pagination.ProductPagination;
import com.example.demo.Response.ProductResponse;
import com.example.demo.Service.FileService;
import com.example.demo.Service.ProductService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Objects;

@RestController
@CrossOrigin("*")
@AllArgsConstructor
@RequestMapping("/api/product")
public class ProductController {
    @Autowired
    private ProductService productService;

    @Autowired
    private FileService fileService;

    @GetMapping("/")
    public ResponseEntity<?> getAllProduct(@RequestParam(value = "currentPage", defaultValue = "0") int pageNum,
                                           @RequestParam(value = "pageSize", defaultValue = "6") int pageSize,
                                           @RequestParam(value = "categoryName", required = false) String categoryName,
                                           @RequestParam(value = "productName", required = false) String productName) {
        ProductPagination productPageResponse = productService.getAllProduct(pageNum, pageSize, categoryName, productName);
        return ResponseEntity.ok(productPageResponse);
    }

    @PostMapping("/")
    public ResponseEntity<?> insertProduct(@ModelAttribute ProductRequest productRequest) {
        boolean isInsert = productService.isInsert(productRequest);
        if(isInsert) {
            return new ResponseEntity<>("Insert successfully", HttpStatus.ACCEPTED);
        }
        return new ResponseEntity<>("Insert fail", HttpStatus.BAD_REQUEST);
    }

    @GetMapping("/file/{filename:.*}")
    public ResponseEntity<?> getFileProduct(@PathVariable String filename) {
        Resource resource = fileService.loadFile(filename);
        return ResponseEntity.ok().header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"").body(resource);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getProductById(@PathVariable long id) {
        ProductResponse productResponse = productService.getProductById(id);
        if(productResponse != null) {
            return ResponseEntity.ok(productResponse);
        }
        return new ResponseEntity<>("Insert fail", HttpStatus.BAD_REQUEST);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> editProductById(@ModelAttribute ProductRequest productRequest, @PathVariable long id) {
        boolean isEditProductById = productService.editProductById(productRequest, id);

        if (isEditProductById) {
            return ResponseEntity.ok("Edit successful");
        }
        return ResponseEntity.badRequest().body("Edit failed");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteProductById(@PathVariable long id) {
        String deleteById = productService.deleteProductById(id);

        if (!Objects.equals(deleteById, "")) {
            return ResponseEntity.ok(deleteById);
        }
        return ResponseEntity.badRequest().body("Delete failed");
    }
}
