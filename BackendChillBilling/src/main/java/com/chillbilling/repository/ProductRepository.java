package com.chillbilling.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.chillbilling.entity.Product;

public interface ProductRepository extends JpaRepository<Product, Integer> {
    Optional<Product> findByProductName(String productName);
}
