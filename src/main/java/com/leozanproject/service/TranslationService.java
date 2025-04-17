package com.leozanproject.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.leozanproject.model.Translation;
import com.leozanproject.repository.TranslationRepository;
import com.leozanproject.resource.domain.TranslationDTO;

/**
 * translations management.
 * 
 * @author nicolas malservet
 *
 */
@Component
public class TranslationService {

	@Autowired
	TranslationRepository repository;

	public int create(TranslationDTO dto) {

		Translation t = new Translation();
		t.setEn(dto.getEn());
		t.setFr(dto.getFr());
		t.setDe(dto.getDe());
		t.setPt(dto.getPt());
		t.setLb(dto.getLb());
		repository.save(t);
		return t.getId();
	}

	public boolean update(TranslationDTO dto) {
		Optional<Translation> opt = repository.findById(dto.getId());
		if (opt.isPresent()) {
			Translation t = opt.get();
			t.setEn(dto.getEn());
			t.setFr(dto.getFr());
			t.setDe(dto.getDe());
			t.setPt(dto.getPt());
			t.setLb(dto.getLb());
			repository.save(t);
			return true;
		}
		return false;
	}

	public boolean delete(int id) {
		Optional<Translation> opt = repository.findById(id);
		if (opt.isPresent()) {
			repository.deleteById(id);
		}
		return true;
	}

}
