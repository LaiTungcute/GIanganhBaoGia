package com.example.demo.Response.Pagination;

import com.example.demo.Response.CustomerResponse;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class CustomerPagination {
    private List<CustomerResponse> customerResponses;
    private int totalPage;
    private int currentPage;
    private long totalItems;
}
