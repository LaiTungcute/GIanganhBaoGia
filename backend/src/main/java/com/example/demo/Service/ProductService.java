package com.example.demo.Service;

import com.example.demo.Entity.Category;
import com.example.demo.Entity.Product;
import com.example.demo.Repository.CategoryRepository;
import com.example.demo.Repository.ProductRepository;
import com.example.demo.Request.ProductRequest;
import com.example.demo.Response.Pagination.ProductPagination;
import com.example.demo.Response.ProductResponse;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ProductService {
    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private FileService fileService;

    // * Create product
    public boolean isInsert(ProductRequest productRequest) {
        boolean isSuccess = fileService.saveFile(productRequest.getImage());
        if(isSuccess) {
            Product product = new Product();
            product.setProductName(productRequest.getProductName());
            product.setDescription(productRequest.getDescription());
            product.setImage(productRequest.getImage().getOriginalFilename());

            Category category = categoryRepository.findCategoryByCategoryName(productRequest.getCategory())
                    .orElseThrow(
                       () -> new EntityNotFoundException("Category with "+ productRequest.getCategory() + " is not exist")
                    );

            product.setCategory(category);
            product.setPrice(productRequest.getPrice());
            product.setQty(productRequest.getQty());
            product.setProductCode(productRequest.getProductCode());
            product.setUnit(productRequest.getUnit());
            product.setOrigin(productRequest.getOrigin());
            product.setDeleted(true);

            productRepository.save(product);

            return true;
        }

        return false;
    }

    // * Get all product
    public ProductPagination getAllProduct(int pageNum, int pageSize, String categoryName, String productName) {
        // Tính toán lại cho Spring Data (0-based)
        int adjustedPageNum = (pageNum > 0) ? pageNum - 1 : 0;

        Pageable pageable = PageRequest.of(adjustedPageNum, pageSize);
        Page<Product> listData = productRepository.findProducts(pageable, categoryName, productName);

        int totalPages = listData.getTotalPages();
        long totalItems = listData.getTotalElements();

        List<ProductResponse> productResponses = new ArrayList<>();
        for (Product product : listData) {
            ProductResponse productResponse = getResponse(product);
            productResponses.add(productResponse);
        }

        ProductPagination productPageResponse = new ProductPagination();
        // Trả về số trang theo giao diện người dùng (đếm từ 1)
        productPageResponse.setCurrentPage(pageNum);
        productPageResponse.setProductResponses(productResponses);
        productPageResponse.setTotalPage(totalPages);
        productPageResponse.setTotalItems(totalItems);

        return productPageResponse;
    }

    // * Get product by id
    public ProductResponse getProductById(long id) {
        Product product = productRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("This product is not exist"));

        return getResponse(product);
    }

    // * Edit product by id
    public boolean editProductById(ProductRequest productRequest, long id) {
        Product product = productRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("This product is not exist"));

        boolean isSuccess = fileService.saveFile(productRequest.getImage());
        if(isSuccess) {
            product.setProductName(productRequest.getProductName());
            product.setDescription(productRequest.getDescription());
            product.setImage(productRequest.getImage().getOriginalFilename());

            Category category = categoryRepository.findCategoryByCategoryName(productRequest.getCategory()).orElseThrow(() -> new EntityNotFoundException("Category with "+ productRequest.getCategory() + " is not exist"));

            product.setCategory(category);
            product.setPrice(productRequest.getPrice());
            product.setQty(productRequest.getQty());
            product.setProductCode(productRequest.getProductCode());
            product.setUnit(productRequest.getUnit());
            product.setOrigin(productRequest.getOrigin());

            productRepository.save(product);

            return true;
        }

        return false;
    }

    // * Delete product
    public String deleteProductById(long id) {
        Product product = productRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("This product is not exist"));
        product.setDeleted(false);
        productRepository.save(product);
        return "Delete successful";
    }

    // Get productResponse
    private ProductResponse getResponse(Product product) {
        ProductResponse productResponse = new ProductResponse();

        productResponse.setProductId(product.getId());
        productResponse.setProductCode(product.getProductCode());
        productResponse.setProductName(product.getProductName());
        productResponse.setQty(product.getQty());
        productResponse.setPrice(product.getPrice());
        productResponse.setCategory(product.getCategory().getCategoryName());
        productResponse.setDescription(product.getDescription());

        productResponse.setImage(product.getImage());
        productResponse.setOrigin(product.getOrigin());
        productResponse.setUnit(product.getUnit());
        productResponse.setDeleted(product.isDeleted());
        return productResponse;
    }
}
