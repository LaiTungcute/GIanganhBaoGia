package com.example.demo.Service;

import com.example.demo.Entity.Product;
import com.example.demo.Entity.Quantion;
import com.example.demo.Entity.QuantionItem;
import com.example.demo.Entity.Roles;
import com.example.demo.Repository.QuantionRepository;
import com.example.demo.Response.Pagination.ProductPagination;
import com.example.demo.Response.Pagination.QuantionPagination;
import com.example.demo.Response.ProductResponse;
import com.example.demo.Response.QuantionItemResponse;
import com.example.demo.Response.QuantionResponse;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

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

    //Get quantion by id
    public QuantionResponse getQuantionById(long id) {
        Quantion quantion = quantionRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("quantion is not exists"));
        return getResponse(quantion);
    }

    //Get quantionResponse
    private QuantionResponse getResponse(Quantion quantion) {
        QuantionResponse quantionResponse = new QuantionResponse();

        quantionResponse.setId(quantion.getId());
        quantionResponse.setQuantionName(quantion.getQuantionName());
        quantionResponse.setUsername(quantion.getUser().getUsername());
        quantionResponse.setEmail(quantion.getUser().getEmail());
        quantionResponse.setPhoneNumber(quantion.getUser().getPhoneNumber());
        quantionResponse.setRoles(quantion.getUser().getRoles().stream().map(Roles::getRoleName).toList().get(0));
        quantionResponse.setCustomerName(quantion.getCustomerName());
        quantionResponse.setCustomerEmail(quantion.getCustomerEmail());
        quantionResponse.setCustomerUnit(quantion.getCustomerUnit());
        quantionResponse.setCustomerAddress(quantion.getCustomerAddress());
        quantionResponse.setCustomerPhoneNumber(quantion.getCustomerPhoneNumber());
        quantionResponse.setStatus(quantion.isStatus());
        quantionResponse.setQuantionItemResponses(getQuantionItemResponse(quantion.getQuantionItems()));

        return quantionResponse;
    }

    //Get list quantionItemResponse
    private List<QuantionItemResponse> getQuantionItemResponse(Set<QuantionItem> quantionItems) {
        List<QuantionItemResponse> quantionItemResponses = new ArrayList<>();

        for (QuantionItem quantionItem : quantionItems) {
            QuantionItemResponse quantionItemResponse = new QuantionItemResponse();
            quantionItemResponse.setId(quantionItem.getId());
            quantionItemResponse.setProductResponses(getProductResponse(quantionItem.getProduct()));
            quantionItemResponse.setQuantionItemQty(quantionItem.getQuantionItemQty());
            quantionItemResponse.setQuantionItemLabol(quantionItem.getLabol());
            quantionItemResponse.setPrice(quantionItem.getPrice());

            quantionItemResponses.add(quantionItemResponse);
        }

        return quantionItemResponses;
    }

    //Get productResonse in quantionItemResponse
    private ProductResponse getProductResponse(Product product) {
        ProductResponse productResponse = new ProductResponse();

        productResponse.setProductCode(product.getProductCode());
        productResponse.setProductName(product.getProductName());
        productResponse.setQty(product.getQty());
        productResponse.setPrice(product.getPrice());
        productResponse.setCategory(product.getCategory().getCategoryName());
        productResponse.setDescription(product.getDescription());

        productResponse.setImage(product.getImage());
        productResponse.setOrigin(product.getOrigin());
        productResponse.setUnit(product.getUnit());
        return productResponse;
    }

}
