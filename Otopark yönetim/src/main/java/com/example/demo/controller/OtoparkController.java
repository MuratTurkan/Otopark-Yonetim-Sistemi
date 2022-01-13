package com.example.demo.controller;

import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.model.Gorevli;
import com.example.demo.model.Otopark;
import com.example.demo.repository.OtoparkRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/otopark")
public class OtoparkController {
    @Autowired
    private OtoparkRepository OtoparkRepository;

    @GetMapping
    public List<Otopark> getAll() {
        return OtoparkRepository.findAll();
    }

    @GetMapping("getfull")
    public List<Otopark> getFull() {
        List<Otopark> otoparkList= OtoparkRepository.findAll();

        List<Otopark> sendList = new ArrayList<Otopark>();
        for (var otopark:otoparkList) {
            if(!otopark.getDolu().equals("0")) {
                sendList.add(otopark);
            }
        }
        return sendList;
    }


    @GetMapping("{id}")
    public ResponseEntity<Otopark> getById(@PathVariable long id) {
        Otopark otopark = OtoparkRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not exist with id:" + id));
        return ResponseEntity.ok(otopark);
    }

    @PutMapping("{id}/{plaka}/{saat}")
    public ResponseEntity<Otopark> update(@PathVariable String id, @PathVariable String plaka, @PathVariable String saat) {
        List <Otopark> otoparkList = OtoparkRepository.findAll();
        Otopark otopark = new Otopark();
        for (var oto:otoparkList) {
            if(oto.getBolge().equals(id)) {
                otopark = oto;
            }
        }
        otopark.setDolu(plaka);
        otopark.setSaat(saat);
        OtoparkRepository.save(otopark);
        return ResponseEntity.ok(otopark);
    }

    @PutMapping("duzenle/{plaka}")
    public ResponseEntity<Otopark> updat01e(@RequestBody Otopark newOto, @PathVariable String plaka) {
        List <Otopark> otoparkList = OtoparkRepository.findAll();
        Otopark otopark = new Otopark();
        for (var oto:otoparkList) {
            if(oto.getBolge().equals(newOto.getBolge())) {
                otopark = oto;
            }
        }
        otopark.setDolu(plaka);
        otopark.setYakit(newOto.getYakit());
        otopark.setSaat(newOto.getSaat());
        OtoparkRepository.save(otopark);
        return ResponseEntity.ok(otopark);
    }

    @PutMapping("update/{id}")
    public ResponseEntity<Otopark> updateForEmpty(@PathVariable String id) {
        List <Otopark> otoparkList = OtoparkRepository.findAll();
        Otopark otopark = new Otopark();
        for (var oto:otoparkList) {
            if(oto.getBolge().equals(id)) {
                otopark = oto;
            }
        }
        otopark.setDolu("0");
        otopark.setSaat("0");
        OtoparkRepository.save(otopark);
        return ResponseEntity.ok(otopark);
    }

}
