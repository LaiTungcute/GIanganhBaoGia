package com.example.demo.Controller;

import com.example.demo.Request.CustomerRequest;
import com.example.demo.Response.CustomerResponse;
import com.example.demo.Response.Pagination.CustomerPagination;
import com.example.demo.Service.CustomerService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@CrossOrigin("*")
@AllArgsConstructor
@RequestMapping("/api/customer")
public class CustomerController {
    @Autowired
    private CustomerService customerService;

    @GetMapping("/")
    public ResponseEntity<?> getPaginationCustomer(@RequestParam(value = "currentPage", defaultValue = "0") int pageNum,
                                                   @RequestParam(value = "pageSize", defaultValue = "6") int pageSize,
                                                   @RequestParam(value = "customerName", required = false) String customerName) {
        CustomerPagination customerPagination = customerService.getAllCustomer(pageNum, pageSize, customerName);

        return ResponseEntity.ok(customerPagination);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getCustomerById(@PathVariable long id) {
        CustomerResponse customerResponse = customerService.getCustomerById(id);

        return ResponseEntity.ok(customerResponse);
    }

    @PostMapping("/")
    public ResponseEntity<?> createCustomer(@RequestBody CustomerRequest customerRequest) {
        boolean isCreate = customerService.createCustomer(customerRequest);

        if (isCreate)
            return ResponseEntity.ok("Thêm khách hàng thành công");
        return ResponseEntity.badRequest().body("Thêm khách hàng thất bại");
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> editCustomer(@RequestBody CustomerRequest customerRequest, @PathVariable long id) {
        boolean isEdit = customerService.editCustomerById(id, customerRequest);

        if (isEdit)
            return ResponseEntity.ok("Sửa thông tin khách hàng thành công");
        return ResponseEntity.badRequest().body("Sửa thông tin khách hàng thất bại");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCustomer(@PathVariable long id) {
        boolean isDelete = customerService.deleteCustomerById(id);

        if(isDelete)
            return ResponseEntity.ok("Xóa khách hàng thành công");
        return ResponseEntity.badRequest().body("Xóa khách hàng thất bại");
    }
}
