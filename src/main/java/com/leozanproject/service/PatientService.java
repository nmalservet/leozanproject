package com.leozanproject.service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.leozanproject.exceptions.InvalidParameterException;
import com.leozanproject.exceptions.MissingParameterException;
import com.leozanproject.mapper.PatientMapper;
import com.leozanproject.model.Patient;
import com.leozanproject.repository.PatientRepository;
import com.leozanproject.resource.domain.PatientDTO;
import com.leozanproject.resource.domain.PatientFilterDTO;
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

	/**
	 * retunr the list of patients filtered.
	 * @param filter
	 * @return
	 */
	public List<PatientDTO> list(PatientFilterDTO filter) {
		String name = filter.getName();
		 if(name!=null&& !name.isEmpty()) {
				List<Patient> patients = repository.findByName(name);
				return mapper.map(patients);
				
			
		}else
		return mapper.map(repository.findAll());
	}

	public boolean createPatient(PatientDTO dto) throws MissingParameterException {

		AttributesControlsTool.isEmpty("name", dto.getName());
		Patient entity = new Patient();
		entity.setName(dto.getName());
		entity.setFirstName(dto.getFirstName());
		entity.setBirthdate(dto.getBirthdate());
		entity.setGender(dto.getGender());
		entity.setMrn(dto.getMrn());
		entity.setSsn(dto.getSsn());
        UUID uuid = UUID.randomUUID();
        String uuidAsString = uuid.toString();

		entity.setUuid(uuidAsString);
		repository.save(entity);
		return true;
	}

	public boolean updatePatient(PatientDTO dto) throws MissingParameterException, InvalidParameterException {
		AttributesControlsTool.isEmpty("id", dto.getId());
		Optional<Patient> opt = repository.findByUuid(dto.getId());
		if (opt.isPresent()) {
			Patient entity = opt.get();
			entity.setBirthdate(dto.getBirthdate());
			entity.setName(dto.getName());
			entity.setFirstName(dto.getFirstName());
			entity.setGender(dto.getGender());
			entity.setMrn(dto.getMrn());
			entity.setSsn(dto.getSsn());
			repository.save(entity);
		} else {
			throw new InvalidParameterException("id");
		}
		return true;
	}
	
	public PatientDTO getPatient(String uuid) throws MissingParameterException, InvalidParameterException {
		AttributesControlsTool.isEmpty("uuid", uuid);
		Optional<Patient> opt = repository.findByUuid(uuid);
		if (opt.isPresent()) {
			return mapper.map(opt.get());
		} else {
			throw new InvalidParameterException("uuid");
		}
	}
	
	public boolean deletePatient(String uuid) throws MissingParameterException, InvalidParameterException {
		AttributesControlsTool.isEmpty("uuid", uuid);
		Optional<Patient> opt = repository.findByUuid(uuid);
		if (opt.isPresent()) {
			repository.deleteById(opt.get().getId());
		} else {
			throw new InvalidParameterException("id");
		}
		return true;
	}
}
