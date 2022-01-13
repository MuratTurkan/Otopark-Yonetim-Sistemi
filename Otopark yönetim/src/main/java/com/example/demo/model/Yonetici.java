package com.example.demo.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table
public class Yonetici {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long yoneticiId;

    private long tckn;

    private String email;

    private String password;

    private String adSoyad;
}
