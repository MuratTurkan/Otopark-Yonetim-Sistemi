package com.example.demo.controller;

import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.model.Yonetici;
import com.example.demo.repository.YoneticiRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@CrossOrigin("*")
@RestController
@RequestMapping("/api/yonetici")
public class YoneticiController {
    @Autowired
    private YoneticiRepository yoneticiRepository;

    @GetMapping
    public List<Yonetici> getAll() {
        return yoneticiRepository.findAll();
    }

    @PostMapping
    public Yonetici create(@RequestBody Yonetici yonetici) {
        return yoneticiRepository.save(yonetici);
    }

    @PostMapping("login")
    public Yonetici login(@RequestBody Yonetici yonetici) {
        List<Yonetici> yoneticiList = yoneticiRepository.findAll();

        for (var gor:yoneticiList) {
            if(gor.getEmail().equals(yonetici.getEmail()) && gor.getPassword().equals(yonetici.getPassword())) {
                return gor;
            }
        }
        return new Yonetici(-1,0,"","","");
    }

    @GetMapping("{id}")
    public ResponseEntity<Yonetici> getById(@PathVariable long id) {
        Yonetici yonetici = yoneticiRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not exist with id:" + id));
        return ResponseEntity.ok(yonetici);
    }

    @PutMapping("{id}")
    public ResponseEntity<Yonetici> update(@PathVariable long id, @RequestBody Yonetici yonetici) {
        Yonetici yoneticiById = yoneticiRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not exist with id: " + id));

        yoneticiById.setEmail(yonetici.getEmail());
        yoneticiById.setAdSoyad(yonetici.getAdSoyad());
        yoneticiById.setPassword(yonetici.getPassword());
        yoneticiById.setTckn(yonetici.getTckn());
        yoneticiRepository.save(yoneticiById);

        return ResponseEntity.ok(yoneticiById);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<HttpStatus> delete(@PathVariable long id) {

        Yonetici yonetici = yoneticiRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not exist with id: " + id));

        yoneticiRepository.delete(yonetici);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);

    }

}

