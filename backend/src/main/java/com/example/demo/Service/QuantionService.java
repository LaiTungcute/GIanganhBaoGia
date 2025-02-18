package com.example.demo.Service;

import com.example.demo.Entity.*;
import com.example.demo.Repository.ProductRepository;
import com.example.demo.Repository.QuantionRepository;
import com.example.demo.Repository.UserRepository;
import com.example.demo.Request.QuantionItemRequest;
import com.example.demo.Request.QuantionRequest;
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
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class QuantionService {
    @Autowired
    private QuantionRepository quantionRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProductRepository productRepository;

    // * Create quantion
    public boolean createQuation(QuantionRequest quantionRequest) {
        User user = userRepository.findByEmail(quantionRequest.getEmail()).orElseThrow(() -> new EntityNotFoundException("User is not found"));

        Quantion quantion = new Quantion();

        quantion.setQuantionName(quantionRequest.getQuantionName());
        quantion.setUser(user);
        quantion.setCustomerName(quantionRequest.getCustomerName());
        quantion.setCustomerEmail(quantionRequest.getCustomerEmail());
        quantion.setCustomerUnit(quantionRequest.getCustomerUnit());
        quantion.setCustomerAddress(quantionRequest.getCustomerAddress());
        quantion.setCustomerPhoneNumber(quantionRequest.getCustomerPhoneNumber());
        quantion.setStatus(quantionRequest.isStatus());
        quantion.setQuantionItems(getQuantionItems(quantionRequest.getQuantionItemRequests()));

        quantionRepository.save(quantion);

        return true;
    }

    //Get quantionItem
    private Set<QuantionItem> getQuantionItems(List<QuantionItemRequest> quantionItemRequests) {
        Set<QuantionItem> quantionItems = new HashSet<>();

        for (QuantionItemRequest quantionItemRequest : quantionItemRequests) {
            QuantionItem quantionItem = new QuantionItem();
            quantionItem.setQuantionItemQty(quantionItemRequest.getQuantionItemQty());
            quantionItem.setLabol(quantionItemRequest.getQuantionItemLabol());
            Product product = productRepository.findByProductName(quantionItemRequest.getProductName()).orElseThrow(() -> new EntityNotFoundException("Product is not found"));
            quantionItem.setProduct(product);
            quantionItem.setTotalPrice(getTotalPrice(product, quantionItemRequest.getQuantionItemQty(), quantionItemRequest.getQuantionItemLabol()));

            quantionItems.add(quantionItem);
        }

        return quantionItems;
    }

    //get totalPrice
    private double getTotalPrice(Product product, int quantionItemQty, double quantionItemLabol) {
        return product.getPrice() * quantionItemQty + quantionItemLabol;
    }

    // * Get all quantion
    public QuantionPagination getAllQuantions(int pageNum, int pageSize, String productName, String quantionName) {
        // Tính toán lại cho Spring Data (0-based)
        int adjustedPageNum = (pageNum > 0) ? pageNum - 1 : 0;

        Pageable pageable = PageRequest.of(adjustedPageNum, pageSize);
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

    // * Get quantion by id
    public QuantionResponse getQuantionById(long id) {
        Quantion quantion = quantionRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("quantion is not exists"));
        return getResponse(quantion);
    }

    // * Get quantion by userId
    public QuantionPagination getQuantionByUserId(int pageNum, int pageSize, long userId) {
        // Tính toán lại cho Spring Data (0-based)
        int adjustedPageNum = (pageNum > 0) ? pageNum - 1 : 0;

        Pageable pageable = PageRequest.of(adjustedPageNum, pageSize);
        Page<Quantion> quantions = quantionRepository.findByUserId(userId, pageable);

        int totalPages = quantions.getTotalPages();
        long totalItems = quantions.getTotalElements();

        List<QuantionResponse> quantionResponses = new ArrayList<>();

        for (Quantion quantion : quantions) {
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
        quantionResponse.setTotalPrice(getTotalPrice(quantion.getQuantionItems()));
        quantionResponse.setQuantionItemResponses(getQuantionItemResponse(quantion.getQuantionItems()));

        return quantionResponse;
    }

    //Get totalPrice
    private double getTotalPrice(Set<QuantionItem> quantionItems) {
        double totalItem = 0;
        for (QuantionItem item : quantionItems) {
            totalItem += item.getTotalPrice();
        }
        return totalItem;
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
            quantionItemResponse.setPrice(quantionItem.getTotalPrice());

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

    // * Edit quantion
    public boolean editQuantion(long id, QuantionRequest quantionRequest) {
        Quantion quantion = quantionRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Quantion is not found"));
        User user = userRepository.findByEmail(quantionRequest.getEmail()).orElseThrow(() -> new EntityNotFoundException("User is not found"));

        try {
            quantion.setQuantionName(quantionRequest.getQuantionName());
            quantion.setUser(user);
            quantion.setCustomerName(quantionRequest.getCustomerName());
            quantion.setCustomerAddress(quantionRequest.getCustomerAddress());
            quantion.setCustomerEmail(quantionRequest.getCustomerEmail());
            quantion.setCustomerUnit(quantionRequest.getCustomerUnit());
            quantion.setCustomerPhoneNumber(quantionRequest.getCustomerPhoneNumber());
            quantion.setQuantionItems(getQuantionItems(quantionRequest.getQuantionItemRequests()));
            quantion.setStatus(quantionRequest.isStatus());

            quantionRepository.save(quantion);
            return true;
        }catch (Exception e) {
            throw new Error(e.getMessage());
        }
    }

    // * Delete quantion
    public String deleteQuantion(long id) {
        quantionRepository.deleteById(id);

        return "Delete successfully";
    }
}
