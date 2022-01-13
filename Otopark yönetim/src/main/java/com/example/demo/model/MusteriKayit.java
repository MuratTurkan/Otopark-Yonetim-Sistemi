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
public class MusteriKayit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long musteriId;

    private long musteriTel;

    private String musteriAd;

    private String musteriSoyad;

    private String musteriPlaka;

    private String musteriMail;

    private String password;
}

