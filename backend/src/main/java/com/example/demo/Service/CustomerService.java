package com.example.demo.Service;

import com.example.demo.Entity.Customer;
import com.example.demo.Repository.CustomerRepository;
import com.example.demo.Request.CustomerRequest;
import com.example.demo.Response.CustomerResponse;
import com.example.demo.Response.Pagination.CustomerPagination;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CustomerService {
    @Autowired
    private CustomerRepository customerRepository;

    // * create Customer
    public boolean createCustomer(CustomerRequest customerRequest) {
        try {
            Customer customer = mapRequestToEntity(customerRequest);
            customer.setDeleted(false);
            customerRepository.save(customer);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    // * Get All customer
    public CustomerPagination getAllCustomer(int pageNum, int pageSize, String customerName) {
        // Tính toán lại cho Spring Data (0-based)
        int adjustedPageNum = (pageNum > 0) ? pageNum - 1 : 0;

        Pageable pageable = PageRequest.of(adjustedPageNum, pageSize);
        Page<Customer> listData = customerRepository.findCustomer(pageable, customerName);

        int totalPages = listData.getTotalPages();
        long totalItems = listData.getTotalElements();

        List<CustomerResponse> customerResponses = new ArrayList<>();

        for (Customer customer : listData) {
            CustomerResponse customerResponse = getResponse(customer);
            customerResponses.add(customerResponse);
        }

        CustomerPagination customerPagination = new CustomerPagination();
        customerPagination.setCustomerResponses(customerResponses);
        customerPagination.setCurrentPage(pageNum);
        customerPagination.setTotalPage(totalPages);
        customerPagination.setTotalItems(totalItems);

        return customerPagination;
    }

    // * Get customer by Id
    public CustomerResponse getCustomerById(long customerId) {
        Customer customer = customerRepository.findById(customerId).orElseThrow(() -> new EntityNotFoundException("customer is not found"));

        return getResponse(customer);
    }

    // * edit customer by Id
    public boolean editCustomerById(long customerId, CustomerRequest customerRequest) {
        Customer customer = customerRepository.findById(customerId).orElseThrow(() -> new EntityNotFoundException("customer is not found"));

        try {
            customer.setCustomerName(customerRequest.getCustomerName());
            customer.setCustomerEmail(customerRequest.getCustomerEmail());
            customer.setCustomerPhoneNumber(customerRequest.getCustomerPhoneNumber());
            customer.setCustomerAddress(customerRequest.getCustomerAddress());
            customer.setCustomerAgency(customerRequest.getAgency());

            customerRepository.save(customer);
        }catch (Exception e) {
            return false;
        }
        return true;
    }

    // * Delete customer by Id
    public boolean deleteCustomerById(long customerId) {
        Customer customer = customerRepository.findById(customerId).orElseThrow(() -> new EntityNotFoundException("customer is not found"));
        try {
            customer.setDeleted(true);

            customerRepository.save(customer);

            return true;
        } catch (Exception e) {
            return false;
        }
    }

    // Map Customer entity to Customer response
    private CustomerResponse getResponse(Customer customer) {
        CustomerResponse customerResponse = new CustomerResponse();

        customerResponse.setCustomerId(customer.getId());
        customerResponse.setCustomerName(customer.getCustomerName());
        customerResponse.setCustomerEmail(customer.getCustomerEmail());
        customerResponse.setCustomerAddress(customer.getCustomerAddress());
        customerResponse.setCustomerPhoneNumber(customer.getCustomerPhoneNumber());
        customerResponse.setCustomerAgency(customer.getCustomerAgency());


        return customerResponse;
    }

    // Map customerRequest to customerEntity
    private Customer mapRequestToEntity(CustomerRequest customerRequest) {
        Customer customer = new Customer();

        customer.setCustomerName(customerRequest.getCustomerName());
        customer.setCustomerEmail(customerRequest.getCustomerEmail());
        customer.setCustomerPhoneNumber(customerRequest.getCustomerPhoneNumber());
        customer.setCustomerAddress(customerRequest.getCustomerAddress());
        customer.setCustomerAgency(customerRequest.getAgency());

        return customer;
    }
}
