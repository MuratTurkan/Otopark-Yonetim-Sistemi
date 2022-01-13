package com.example.demo.repository;

import com.example.demo.model.Yonetici;
import org.springframework.data.jpa.repository.JpaRepository;

public interface YoneticiRepository extends JpaRepository<Yonetici,Long> {
}
