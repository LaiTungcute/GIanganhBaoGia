package com.example.demo.Service;

import com.example.demo.Entity.*;
import com.example.demo.Repository.*;
import com.example.demo.Request.QuantionItemRequest;
import com.example.demo.Request.QuantionRequest;
import com.example.demo.Response.Pagination.QuantionPagination;
import com.example.demo.Response.QuantionItemResponse;
import com.example.demo.Response.QuantionResponse;
import com.openhtmltopdf.pdfboxout.PdfRendererBuilder;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.IContext;
import org.thymeleaf.spring6.SpringTemplateEngine;

import java.io.ByteArrayOutputStream;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class QuantionService {
    @Autowired
    private QuantionRepository quantionRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private QuantionItemRepository quantionItemRepository;

    @Autowired
    private SpringTemplateEngine templateEngine;

    // * Create quantion
    public boolean createQuation(QuantionRequest quantionRequest) {
        User user = userRepository.findByEmail(quantionRequest.getEmail())
                .orElseThrow(() -> new EntityNotFoundException("User is not found"));

        Quantion quantion = new Quantion();

        quantion.setQuantionName(quantionRequest.getQuantionName());
        quantion.setUser(user);
        quantion.setStartDate(LocalDate.now());
        quantion.setStatus(false);
        quantion.setDeleted(false);

        quantion = quantionRepository.save(quantion);

        quantion.setQuantionItems(createQuantionItems(quantionRequest.getQuantionItemRequests(), quantion));

        quantionRepository.save(quantion);

        Optional<Customer> customer = customerRepository.findByCustomerName(quantionRequest.getCustomerName());

        Customer currentCustomer = mapCustomerRequestToCustomerEntity(quantionRequest);

        if(customer.isPresent()) {
            quantion.setCustomer(customer.get());
        }
        else {
            customerRepository.save(currentCustomer);
            quantion.setCustomer(currentCustomer);
        }

        quantionRepository.save(quantion);

        return true;
    }

    // * Get all quantion
    public QuantionPagination getAllQuantions(int pageNum, int pageSize, String quantionName) {
        // Tính toán lại cho Spring Data (0-based)
        int adjustedPageNum = (pageNum > 0) ? pageNum - 1 : 0;

        Pageable pageable = PageRequest.of(adjustedPageNum, pageSize);
        Page<Quantion> listData = quantionRepository.findQuantion(pageable, quantionName);

        int totalPages = listData.getTotalPages();
        long totalItems = listData.getTotalElements();

        List<QuantionResponse> quantionResponses = new ArrayList<>();

        for (Quantion quantion : listData) {
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
        Quantion quantion = quantionRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("quantion is not exists"));
        return getResponse(quantion);
    }

    // * Get quantion by userId
    public QuantionPagination getQuantionByUserName(int pageNum, int pageSize, String username) {
        // Tính toán lại cho Spring Data (0-based)
        int adjustedPageNum = (pageNum > 0) ? pageNum - 1 : 0;

        Pageable pageable = PageRequest.of(adjustedPageNum, pageSize);
        Page<Quantion> quantions = quantionRepository.findByUsername(username, pageable);

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

    // * Edit quantion
    public boolean editQuantion(long id, QuantionRequest quantionRequest) {
        Quantion quantion = quantionRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Quantion is not found"));
        User user = userRepository.findByEmail(quantionRequest.getEmail())
                .orElseThrow(() -> new EntityNotFoundException("User is not found"));

        try {
            quantion.setQuantionName(quantionRequest.getQuantionName());
            quantion.setUser(user);

            quantion.setStartDate(LocalDate.now());

            quantion.setQuantionItems(getQuantionItems(quantionRequest.getQuantionItemRequests(), quantion));

            Optional<Customer> customer = customerRepository.findByCustomerName(quantionRequest.getCustomerName());

            Customer currentCustomer = mapCustomerRequestToCustomerEntity(quantionRequest);

            if(customer.isPresent()) {
                quantion.setCustomer(customer.get());
            }
            else {
                customerRepository.save(currentCustomer);
                quantion.setCustomer(currentCustomer);
            }

            quantionRepository.save(quantion);
            return true;
        } catch (Exception e) {
            throw new Error(e.getMessage());
        }
    }

    // * Active quantion
    public boolean changeStatus(long id) {
        Quantion quantion = quantionRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Quantion is not found"));

        try {
            quantion.setStatus(true);
            quantionRepository.save(quantion);
        } catch (Exception e) {
            return false;
        }

        return true;
    }

    // * Delete or restore quantion (but save in trash)
    public boolean deleteQuantion(long id) {
        Quantion quantion = quantionRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Quantion is not found"));

        try {
            quantion.setDeleted(!quantion.isDeleted());
            quantionRepository.save(quantion);
        } catch (Exception e) {
            return false;
        }

        return true;
    }

    // * Clear quantion (delete data in database)
    public String clearQuantion(long id) {
        quantionRepository.deleteById(id);

        return "Delete successfully";
    }

    // * Gender pdf
    public byte[] generatePdfFromHtml(String templateName, IContext context) {
        String html = templateEngine.process(templateName, context);
        try (ByteArrayOutputStream outputStream = new ByteArrayOutputStream()) {
            PdfRendererBuilder builder = new PdfRendererBuilder();
            builder.useFastMode();
            builder.withHtmlContent(html, null);
            builder.toStream(outputStream);
            builder.run();
            return outputStream.toByteArray();
        } catch (Exception e) {
            throw new RuntimeException("Lỗi khi tạo PDF", e);
        }
    }

    // Map Customer request to Customer entity
    private Customer mapCustomerRequestToCustomerEntity(QuantionRequest quantionRequest) {
        Customer customer = new Customer();
        customer.setCustomerName(quantionRequest.getCustomerName());
        customer.setCustomerEmail(quantionRequest.getCustomerEmail());
        customer.setCustomerPhoneNumber(quantionRequest.getCustomerPhoneNumber());
        customer.setCustomerAddress(quantionRequest.getCustomerAddress());
        customer.setCustomerAgency(quantionRequest.getCustomerUnit());

        return customer;
    }

    // Get quantionItem
    private Set<QuantionItem> getQuantionItems(List<QuantionItemRequest> quantionItemRequests, Quantion quantion) {
        Set<QuantionItem> quantionItems = quantion.getQuantionItems();

        List<QuantionItem> newQuantionItems = getQuantionItemsFromQuantionItemRequest(quantionItemRequests, quantion);

        Map<String, QuantionItem> newQuantionItemMap = newQuantionItems.stream().collect(Collectors.toMap(q -> q.getProduct().getProductName(), q -> q));

        Map<String, QuantionItem> quantionItemMap = quantionItems.stream().collect(Collectors.toMap(q -> q.getProduct().getProductName(), q -> q));

        for (QuantionItem quantionItem : newQuantionItemMap.values()) {
            QuantionItem existQuantionItem = quantionItemMap.get(quantionItem.getProduct().getProductName());

            if(existQuantionItem != null) {
                existQuantionItem.setProduct(quantionItem.getProduct());
                existQuantionItem.setQuantion(quantionItem.getQuantion());
                existQuantionItem.setTotalPrice(quantionItem.getTotalPrice());
                existQuantionItem.setQuantionItemQty(quantionItem.getQuantionItemQty());
                existQuantionItem.setLabol(quantionItem.getLabol());
                existQuantionItem.setNote(quantionItem.getNote());

                quantionItemRepository.save(existQuantionItem);
            }
            else {
                quantionItems.add(quantionItem);
                quantionItemRepository.save(quantionItem);
            }
        }

        List<QuantionItem> deletedQuantionItems = quantionItems.stream()
                .filter(q -> !newQuantionItemMap.containsKey(q.getProduct().getProductName()))
                .collect(Collectors.toList());

        quantionItems.removeIf(q -> !newQuantionItemMap.containsKey(q.getProduct().getProductName()));

        quantionItemRepository.deleteAll(deletedQuantionItems);

        return quantionItems;
    }

    // Get quantionItems from quantionItemRequest
    private List<QuantionItem> getQuantionItemsFromQuantionItemRequest(List<QuantionItemRequest> quantionItemRequests, Quantion quantion) {
        List<QuantionItem> quantionItems = new ArrayList<>();

        for (QuantionItemRequest quantionItemRequest : quantionItemRequests) {
            QuantionItem quantionItem = new QuantionItem();
            quantionItem.setQuantionItemQty(quantionItemRequest.getQuantionItemQty());
            quantionItem.setLabol(quantionItemRequest.getQuantionItemLabol());
            Product product = productRepository.findByProductName(quantionItemRequest.getProductName())
                    .orElseThrow(() -> new EntityNotFoundException("Product is not found"));
            quantionItem.setProduct(product);
            quantionItem.setTotalPrice(getTotalPrice(product, quantionItemRequest.getQuantionItemQty(),
                    quantionItemRequest.getQuantionItemLabol()));
            quantionItem.setQuantion(quantion);

            quantionItems.add(quantionItem);
        }

        return quantionItems;

    }

    // Get quantionItem using create
    private Set<QuantionItem> createQuantionItems(List<QuantionItemRequest> quantionItemRequests, Quantion quantion) {
        Set<QuantionItem> quantionItems = new HashSet<>();

        for (QuantionItemRequest quantionItemRequest : quantionItemRequests) {
            QuantionItem quantionItem = new QuantionItem();
            quantionItem.setQuantionItemQty(quantionItemRequest.getQuantionItemQty());
            quantionItem.setLabol(quantionItemRequest.getQuantionItemLabol());
            Product product = productRepository.findByProductName(quantionItemRequest.getProductName())
                    .orElseThrow(() -> new EntityNotFoundException("Product is not found"));
            quantionItem.setProduct(product);
            quantionItem.setTotalPrice(getTotalPrice(product, quantionItemRequest.getQuantionItemQty(),
                    quantionItemRequest.getQuantionItemLabol()));
            quantionItem.setQuantion(quantion);

            quantionItemRepository.save(quantionItem);

            quantionItems.add(quantionItem);
        }

        return quantionItems;
    }

    // get totalPrice
    private double getTotalPrice(Product product, int quantionItemQty, double quantionItemLabol) {
        return product.getPrice() * quantionItemQty + quantionItemLabol;
    }

    // Get totalPrice
    private double getTotalPrice(Set<QuantionItem> quantionItems) {
        double totalItem = 0;
        for (QuantionItem item : quantionItems) {
            totalItem += item.getTotalPrice();
        }
        return totalItem;
    }

    // Get quantionResponse
    private QuantionResponse getResponse(Quantion quantion) {
        QuantionResponse quantionResponse = new QuantionResponse();

        quantionResponse.setId(quantion.getId());
        quantionResponse.setQuantionName(quantion.getQuantionName());
        quantionResponse.setUsername(quantion.getUser().getUsername());
        quantionResponse.setEmail(quantion.getUser().getEmail());
        quantionResponse.setPhoneNumber(quantion.getUser().getPhoneNumber());
        quantionResponse.setRoles(quantion.getUser().getRoles().stream().map(Roles::getRoleName).toList().get(0));
        quantionResponse.setCustomerName(quantion.getCustomer().getCustomerName());
        quantionResponse.setCustomerEmail(quantion.getCustomer().getCustomerEmail());
        quantionResponse.setCustomerUnit(quantion.getCustomer().getCustomerAgency());
        quantionResponse.setCustomerAddress(quantion.getCustomer().getCustomerAddress());
        quantionResponse.setCustomerPhoneNumber(quantion.getCustomer().getCustomerPhoneNumber());
        quantionResponse.setStatus(quantion.isStatus());
        quantionResponse.setDeleted(quantion.isDeleted());
        quantionResponse.setStartDate(quantion.getStartDate());
        quantionResponse.setTotalPrice(new BigDecimal(getTotalPrice(quantion.getQuantionItems())));
        quantionResponse.setQuantionItemResponses(getQuantionItemResponse(quantion.getQuantionItems()));

        return quantionResponse;
    }

    // Get list quantionItemResponse
    private List<QuantionItemResponse> getQuantionItemResponse(Set<QuantionItem> quantionItems) {
        List<QuantionItemResponse> quantionItemResponses = new ArrayList<>();

        for (QuantionItem quantionItem : quantionItems) {
            QuantionItemResponse quantionItemResponse = getItemResponse(quantionItem);
            quantionItemResponses.add(quantionItemResponse);
        }

        return quantionItemResponses;
    }

    // Get quantionItemResponse
    private QuantionItemResponse getItemResponse(QuantionItem quantionItem) {
        QuantionItemResponse quantionItemResponse = new QuantionItemResponse();
        quantionItemResponse.setId(quantionItem.getId());
        quantionItemResponse.setUnit(quantionItem.getProduct().getUnit());
        quantionItemResponse.setImage(quantionItem.getProduct().getImage());
        quantionItemResponse.setProductName(quantionItem.getProduct().getProductName());
        quantionItemResponse.setQuantionItemQty(quantionItem.getQuantionItemQty());
        quantionItemResponse.setQuantionItemLabol(new BigDecimal(quantionItem.getLabol()));
        quantionItemResponse.setProductPrice(new BigDecimal(quantionItem.getProduct().getPrice()));
        quantionItemResponse.setOrigin(quantionItem.getProduct().getOrigin());
        quantionItemResponse.setNote(quantionItem.getNote());
        quantionItemResponse.setPrice(new BigDecimal(quantionItem.getTotalPrice()));

        return quantionItemResponse;
    }
}
