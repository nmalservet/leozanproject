package com.leozanproject.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.leozanproject.exceptions.InvalidParameterException;
import com.leozanproject.exceptions.MissingParameterException;
import com.leozanproject.mapper.PatientMapper;
import com.leozanproject.model.Patient;
import com.leozanproject.repository.PatientRepository;
import com.leozanproject.resource.domain.PatientDTO;
import com.leozanproject.tools.AttributesControlsTool;

/**
 * service to manage patients
 * 
 * @author nicolas malservet
 *
 */
@Component
public class PatientService {

	@Autowired
	PatientRepository repository;

	@Autowired
	PatientMapper mapper;

	public List<PatientDTO> list() {
		return mapper.map(repository.findAll());
	}

	public boolean createPatient(PatientDTO dto) throws MissingParameterException {

		AttributesControlsTool.isEmpty("name", dto.getName());
		Patient entity = new Patient();
		entity.setName(dto.getName());
		entity.setFirstName(dto.getFirstName());
		entity.setBirthdate(dto.getBirthdate());
		entity.setGender(dto.getGender());
		repository.save(entity);
		return true;
	}

	public boolean updatePatient(PatientDTO dto) throws MissingParameterException, InvalidParameterException {
		AttributesControlsTool.isSet("id", dto.getId());
		Optional<Patient> opt = repository.findById(dto.getId());
		if (opt.isPresent()) {
			Patient entity = opt.get();
			entity.setBirthdate(dto.getBirthdate());
			entity.setName(dto.getName());
			entity.setFirstName(dto.getFirstName());
			entity.setGender(dto.getGender());
			repository.save(entity);
		} else {
			throw new InvalidParameterException("id");
		}
		return true;
	}
	
	public PatientDTO getPatient(int id) throws MissingParameterException, InvalidParameterException {
		AttributesControlsTool.isSet("id", id);
		Optional<Patient> opt = repository.findById(id);
		if (opt.isPresent()) {
			return mapper.map(opt.get());
		} else {
			throw new InvalidParameterException("id");
		}
	}
	
	public boolean deletePatient(int id) throws MissingParameterException, InvalidParameterException {
		AttributesControlsTool.isSet("id", id);
		Optional<Patient> opt = repository.findById(id);
		if (opt.isPresent()) {
			repository.deleteById(id);
		} else {
			throw new InvalidParameterException("id");
		}
		return true;
	}
}
