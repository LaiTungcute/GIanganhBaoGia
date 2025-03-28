package com.example.demo.Controller;

import com.example.demo.Request.QuantionRequest;
import com.example.demo.Response.Pagination.QuantionPagination;
import com.example.demo.Response.QuantionResponse;
import com.example.demo.Service.QuantionService;
import com.lowagie.text.DocumentException;
import jakarta.servlet.ServletContext;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.nio.file.Files;
import java.nio.file.Paths;

@Controller
@CrossOrigin("*")
@AllArgsConstructor
@RequestMapping("/api/quantion")
public class QuantionController {
    @Autowired
    private QuantionService quantionService;

    @Autowired
    private TemplateEngine templateEngine;

    @Autowired
    private Environment environment;

    @Autowired
    private ServletContext servletContext;

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

    @GetMapping("/pdf/{id}")
    public ResponseEntity<?> generatePdf(@PathVariable("id") long id) throws DocumentException, IOException {
        QuantionResponse quantionResponse = quantionService.getQuantionById(id);

        Context context = new Context();
        context.setVariable("quantionResponse", quantionResponse);

        // Lấy biến môi trường APP_BASE_URL
        String baseUrl = environment.getProperty("APP_BASE_URL", "http://localhost:8080");

//        String initUrl = baseUrl + "/image";

//        String staticImagePath = Paths.get("src/main/resources/static/images/logo.png").toUri().toString();
//        context.setVariable("staticImagePath", staticImagePath);

        // Đưa vào Thymeleaf Context
//        context.setVariable("initUrl", initUrl);
        context.setVariable("baseUrl", baseUrl);

        byte[] pdfBytes = quantionService.generatePdfFromHtml("quantionTemplate", context);

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + quantionResponse.getQuantionName() +".pdf")
                .contentType(MediaType.APPLICATION_PDF)
                .body(pdfBytes);
    }

}
