package com.example.demo.Response.Pagination;

import com.example.demo.Response.ProductResponse;
import com.example.demo.Response.QuantionResponse;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class QuantionPagination {
    private List<QuantionResponse> quantionResponses;
    private int totalPage;
    private int currentPage;
    private long totalItems;
}
