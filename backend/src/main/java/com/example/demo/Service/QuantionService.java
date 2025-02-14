package com.example.demo.Service;

import com.example.demo.Entity.Quantion;
import com.example.demo.Repository.QuantionRepository;
import com.example.demo.Response.Pagination.QuantionPagination;
import com.example.demo.Response.QuantionResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class QuantionService {
    @Autowired
    private QuantionRepository quantionRepository;

    //Create quantion



    //Get all quantion
    public QuantionPagination getAllQuantions(int pageNum, int pageSize, String productName, String quantionName) {
        Pageable pageable = PageRequest.of(pageNum, pageSize);
        Page<Quantion> listData = quantionRepository.findQuantion(pageable, productName, quantionName);

        int totalPages = listData.getTotalPages();
        long totalItems = listData.getTotalElements();

        List<QuantionResponse> quantionResponses = new ArrayList<>();

        for (Quantion quantion: listData) {
            QuantionResponse quantionResponse = getResponse(quantion);
            quantionResponses.add(quantionResponse);
        }

        QuantionPagination quantionPagination = new QuantionPagination();
        quantionPagination.setQuantionResponses(quantionResponses);
        quantionPagination.setCurrentPage(pageNum);
        quantionPagination.setTotalPage(totalPages);
        quantionPagination.setTotalItems(totalItems);

        return quantionPagination;
    }

    private QuantionResponse getResponse(Quantion quantion) {
        QuantionResponse quantionResponse = new QuantionResponse();

        quantionResponse.setQuantionName(quantion.getQuantionName());
        quantionResponse.setProductName(quantion.getProduct().getProductName());
        quantionResponse.setQty(quantion.getProduct().getQty());
        quantionResponse.setPrice(quantion.getProduct().getPrice());
        quantionResponse.setLabol(quantion.getLabol());
        quantionResponse.setTotal(quantion.getTotal());
        quantionResponse.setImage(quantion.getProduct().getImage());
        quantionResponse.setOrigin(quantion.getProduct().getOrigin());
        quantionResponse.setUnit(quantion.getProduct().getUnit());
        return quantionResponse;
    }


}
