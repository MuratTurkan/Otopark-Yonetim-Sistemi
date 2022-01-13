package com.example.demo.controller;


import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.model.Gorevli;
import com.example.demo.model.MusteriKayit;
import com.example.demo.repository.GorevliRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/gorevli")
public class GorevliController {
    @Autowired
    private GorevliRepository gorevliRepository;

    @GetMapping
    public List<Gorevli> getAll() {
        return gorevliRepository.findAll();
    }

    @PostMapping
    public Gorevli create(@RequestBody Gorevli gorevli) {
        return gorevliRepository.save(gorevli);
    }

    @PostMapping("login")
    public Gorevli login(@RequestBody Gorevli gorevli) {
        List<Gorevli> gorevliList = gorevliRepository.findAll();

        for (var gor:gorevliList) {
            if(gor.getEmail().equals(gorevli.getEmail()) && gor.getPassword().equals(gorevli.getPassword())) {
                return gor;
            }
        }
        return new Gorevli(-1,0,"","","");
    }

    @GetMapping("{id}")
    public ResponseEntity<Gorevli> getById(@PathVariable long id) {
        Gorevli gorevli = gorevliRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not exist with id:" + id));
        return ResponseEntity.ok(gorevli);
    }

    @PutMapping("{id}")
    public ResponseEntity<Gorevli> update(@PathVariable long id, @RequestBody Gorevli gorevli) {
        Gorevli gorevliById = gorevliRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not exist with id: " + id));

        gorevliById.setEmail(gorevli.getEmail());
        gorevliById.setAdSoyad(gorevli.getAdSoyad());
        gorevliById.setPassword(gorevli.getPassword());
        gorevliById.setTckn(gorevli.getTckn());
        gorevliRepository.save(gorevliById);

        return ResponseEntity.ok(gorevliById);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<HttpStatus> delete(@PathVariable long id) {

        Gorevli gorevli = gorevliRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not exist with id: " + id));

        gorevliRepository.delete(gorevli);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);

    }

}
