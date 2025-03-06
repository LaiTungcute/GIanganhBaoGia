package com.example.demo.Controller;

import com.example.demo.Request.QuantionItemRequest;
import com.example.demo.Request.QuantionRequest;
import com.example.demo.Response.Pagination.QuantionPagination;
import com.example.demo.Response.QuantionResponse;
import com.example.demo.Service.QuantionService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
@CrossOrigin("*")
@AllArgsConstructor
@RequestMapping("/api/quantion")
public class QuantionController {
    @Autowired
    private QuantionService quantionService;

    @GetMapping("/")
    public ResponseEntity<?> getAllQuantion(@RequestParam(value = "currentPage", defaultValue = "0") int pageNum,
                                            @RequestParam(value = "pageSize", defaultValue = "6") int pageSize,
                                            @RequestParam(value = "quantionName", required = false) String quantionName) {
        QuantionPagination quantionPaginationRes = quantionService.getAllQuantions(pageNum, pageSize, quantionName);
        return ResponseEntity.ok(quantionPaginationRes);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getQuantionById(@PathVariable long id) {
        QuantionResponse quantionResponse = quantionService.getQuantionById(id);
        if (quantionResponse != null)
            return ResponseEntity.ok(quantionResponse);
        return ResponseEntity.badRequest().body("Báo giá này không tồn tại");
    }

    @GetMapping("/user/")
    public ResponseEntity<?> getQuantionByUserId(@RequestParam(value = "currentPage", defaultValue = "0") int pageNum,
                                                 @RequestParam(value = "pageSize", defaultValue = "6") int pageSize,
                                                 @RequestParam String username) {
        QuantionPagination quantionPagination = quantionService.getQuantionByUserName(pageNum, pageSize, username);
        if (quantionPagination != null)
            return ResponseEntity.ok(quantionPagination);
        return ResponseEntity.badRequest().body("Báo giá này không tồn tại");
    }
    
    @PostMapping("/")
    public ResponseEntity<?> createNewQuantion(@RequestBody QuantionRequest quantionRequest) {
        boolean isQuantionInsert = quantionService.createQuation(quantionRequest);
        
        if (isQuantionInsert)
            return ResponseEntity.ok("Thêm báo giá thành công");
        return ResponseEntity.badRequest().body("Thêm báo giá thất bại");
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<?> editQuantionById(@PathVariable long id, @RequestBody QuantionRequest quantionRequest) {
        boolean isQuantionEdit = quantionService.editQuantion(id, quantionRequest);
        
        if(isQuantionEdit) 
            return ResponseEntity.ok("Sửa báo giá thành công");

        return ResponseEntity.badRequest().body("Sửa báo giá thất bại");
    }

    @PutMapping("/active/{id}")
    public ResponseEntity<?> changeStatus(@PathVariable long id) {
        boolean isChangeStatus = quantionService.changeStatus(id);

        if (isChangeStatus) {
            return ResponseEntity.ok("Phê duyệt thành công");
        }
        return ResponseEntity.badRequest().body("Phê duyệt thất bại");
    }

    // Nem bao gia vao thung rac
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteQuantionById(@PathVariable long id) {
        boolean isDeleteQuantion = quantionService.deleteQuantion(id);
        if (isDeleteQuantion)
            return ResponseEntity.ok("Xóa báo giá thành công");
        return ResponseEntity.badRequest().body("Xóa báo giá thất bại");
    }

    // Xoa bao gia khoi CSDL
    @DeleteMapping("/trash/{id}")
    public ResponseEntity<?> clearQuantionById(@PathVariable long id) {
        return ResponseEntity.ok(quantionService.clearQuantion(id));
    }

    //Khoi phuc bao gia
    @PutMapping("trash/restore/{id}")
    public ResponseEntity<?> restoreQuantionById(@PathVariable long id) {
        boolean isDeleteQuantion = quantionService.deleteQuantion(id);
        if (isDeleteQuantion)
            return ResponseEntity.ok("khôi phục báo giá thành công");
        return ResponseEntity.badRequest().body("Khôi phục báo giá thất bại");
    }

    @PostMapping("/item/{id}")
    public ResponseEntity<?> createItemByQuantionId(@PathVariable long id, @RequestBody QuantionItemRequest quantionItemRequest) {
        boolean isInsertQuantionItem = quantionService.createQuantionItem(id, quantionItemRequest);

        if (isInsertQuantionItem)
            return ResponseEntity.ok("Thêm thiết bị thành công");
        return ResponseEntity.badRequest().body("Thêm thiết bị thất bại");
    }

    @PutMapping("/item/{itemId}")
    public ResponseEntity<?> editQuantionItemById(@PathVariable(value = "itemId") long id, @RequestBody QuantionItemRequest quantionItemRequest) {
        boolean isEditQuantionItem = quantionService.editQuantionItem(id, quantionItemRequest);

        if (isEditQuantionItem)
            return ResponseEntity.ok("Sửa thiết bị thành công");
        return ResponseEntity.badRequest().body("Sửa thiết bị thất bại");
    }

    @DeleteMapping("/item/{itemId}")
    public ResponseEntity<?> deleteQuantionItemById(@PathVariable(value = "itemId") long id) {
        return ResponseEntity.ok(quantionService.deleteQuantionItem(id));
    }

    @GetMapping("/pdf")
    public String index() {
        return "quantionTemplate";
    }
}
