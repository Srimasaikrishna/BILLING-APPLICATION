package com.chillbilling.controller;

import com.chillbilling.dto.InvoiceNumberRequest;
import com.chillbilling.dto.PaymentRecord;
import com.chillbilling.entity.Payment;
import com.chillbilling.entity.User;
import com.chillbilling.service.PaymentService;
import com.chillbilling.service.UserService;

import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/payments")
public class PaymentController {
	
    private final PaymentService paymentService;
    private final UserService userService;

    public PaymentController(PaymentService paymentService, UserService userService) {
        this.paymentService = paymentService;
        this.userService = userService;
    }

    // Record a payment (ADMIN or ACCOUNTANT)
    @PreAuthorize("hasAnyRole('ADMIN', 'ACCOUNTANT')")
    @PostMapping
    public Payment recordPayment(@RequestBody PaymentRecord record) {
        return paymentService.recordPayment(record);
    }

    // Get all payments (ADMIN or ACCOUNTANT)
    @PreAuthorize("hasAnyRole('ADMIN', 'ACCOUNTANT')")
    @GetMapping
    public List<Payment> getAllPayments() {
        return paymentService.getAllPayments();
    }

    // Get payments by invoice number (ADMIN or ACCOUNTANT)
    @PreAuthorize("hasAnyRole('ADMIN', 'ACCOUNTANT')")
    @PostMapping("/by-invoice")
    public List<Payment> getPaymentsByInvoiceNumber(@RequestBody InvoiceNumberRequest request) {
        return paymentService.getPaymentsByInvoiceNumber(request.getInvoiceNumber());
    }

    // Get current customer’s payment history
    @PreAuthorize("hasRole('CUSTOMER')")
    @GetMapping("/my")
    public List<Payment> getCurrentCustomerPayments(Authentication auth) {
        User loggedInUser = userService.getUserByIdentifier(auth.getName());
        String email = loggedInUser.getEmailId();
        return paymentService.getPaymentsByCustomerEmail(email);
    }
}
