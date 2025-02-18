package com.example.demo.Controller;

import com.example.demo.Request.QuantionRequest;
import com.example.demo.Response.Pagination.QuantionPagination;
import com.example.demo.Response.QuantionResponse;
import com.example.demo.Service.QuantionService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("*")
@AllArgsConstructor
@RequestMapping("/api/quantion")
public class QuantionController {
    @Autowired
    private QuantionService quantionService;

    @GetMapping("/")
    public ResponseEntity<?> getAllQuantion(@RequestParam(value = "currentPage", defaultValue = "0") int pageNum,
                                            @RequestParam(value = "pageSize", defaultValue = "6") int pageSize,
                                            @RequestParam(value = "productName", required = false) String productName,
                                            @RequestParam(value = "quantionName", required = false) String quantionName) {
        QuantionPagination quantionPaginationRes = quantionService.getAllQuantions(pageNum, pageSize, productName, quantionName);
        return ResponseEntity.ok(quantionPaginationRes);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getQuantionById(@PathVariable int id) {
        QuantionResponse quantionResponse = quantionService.getQuantionById(id);
        if (quantionResponse != null)
            return ResponseEntity.ok(quantionResponse);
        return ResponseEntity.badRequest().body("Báo giá này không tồn tại");
    }

    @GetMapping("/{userId}")
    public ResponseEntity<?> getQuantionByUserId(@RequestParam(value = "currentPage", defaultValue = "0") int pageNum,
                                                 @RequestParam(value = "pageSize", defaultValue = "6") int pageSize,
                                                 @PathVariable long userId) {
        QuantionPagination quantionPagination = quantionService.getQuantionByUserId(pageNum, pageSize, userId);
        if (quantionPagination != null)
            return ResponseEntity.ok(quantionPagination);
        return ResponseEntity.badRequest().body("Báo giá này không tồn tại");
    }
    
    @PostMapping("/")
    public ResponseEntity<?> createNewQuantion(@ModelAttribute QuantionRequest quantionRequest) {
        boolean isQuantionInsert = quantionService.createQuation(quantionRequest);
        
        if (isQuantionInsert)
            return ResponseEntity.ok("Thêm báo giá thành công");
        return ResponseEntity.badRequest().body("Thêm báo giá thất bại");
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<?> editQuantionById(@PathVariable long id, @ModelAttribute QuantionRequest quantionRequest) {
        boolean isQuantionEdit = quantionService.editQuantion(id, quantionRequest);
        
        if(isQuantionEdit) 
            return ResponseEntity.ok("Sửa báo giá thành công");

        return ResponseEntity.badRequest().body("Sửa báo giá thất bại");
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteQuantionById(@PathVariable long id) {
            return ResponseEntity.ok(quantionService.deleteQuantion(id));
    }
}
