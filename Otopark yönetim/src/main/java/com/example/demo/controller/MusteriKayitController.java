package com.example.demo.controller;

import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.model.MusteriKayit;
import com.example.demo.repository.MusteriKayitRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/MusteriKayit")
public class MusteriKayitController {

    @Autowired
    private MusteriKayitRepository musteriKayitRepository;

    @GetMapping
    public List<MusteriKayit> getAll() {
        return musteriKayitRepository.findAll();
    }

    @PostMapping
    public MusteriKayit create(@RequestBody MusteriKayit musteriKayit) {
        return musteriKayitRepository.save(musteriKayit);
    }

    @PostMapping("login")
    public MusteriKayit login(@RequestBody MusteriKayit musteriKayit) {
        List<MusteriKayit> musteriList = musteriKayitRepository.findAll();

        for (var musteri : musteriList) {
            if (musteri.getMusteriMail().equals(musteriKayit.getMusteriMail()) && musteri.getPassword().equals(musteriKayit.getPassword())) {
                return musteri;
            }
        }
        return new MusteriKayit(-1, 0, "", "", "", "", "");
    }

    @GetMapping("getById/{id}")
    public ResponseEntity<MusteriKayit> getById(@PathVariable long id) {
        MusteriKayit musteriKayit = musteriKayitRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not exist with id:" + id));
        return ResponseEntity.ok(musteriKayit);
    }


    @GetMapping("{plaka}")
    public List<MusteriKayit> getById(@PathVariable String plaka) {
        List<MusteriKayit> Musteriler = musteriKayitRepository.findAll();

        List<MusteriKayit> donecekListe = new ArrayList<MusteriKayit>();
        for (var musteri : Musteriler) {
            if (musteri.getMusteriPlaka().equals(plaka)) {
                donecekListe.add(musteri);
            }
        }
        return donecekListe;
    }

    @PutMapping("{id}")
    public ResponseEntity<MusteriKayit> update(@PathVariable long id, @RequestBody MusteriKayit newMusteri) {
        MusteriKayit updateMusteri = musteriKayitRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not exist with id: " + id));

        updateMusteri.setMusteriAd(newMusteri.getMusteriAd());
        updateMusteri.setMusteriSoyad(newMusteri.getMusteriSoyad());
        updateMusteri.setMusteriTel(newMusteri.getMusteriTel());
        updateMusteri.setMusteriMail(newMusteri.getMusteriMail());
        updateMusteri.setMusteriPlaka(newMusteri.getMusteriPlaka());
        updateMusteri.setPassword(newMusteri.getPassword());
        musteriKayitRepository.save(updateMusteri);

        return ResponseEntity.ok(updateMusteri);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<HttpStatus> delete(@PathVariable long id) {

        MusteriKayit employee = musteriKayitRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not exist with id: " + id));

        musteriKayitRepository.delete(employee);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);

    }
}
