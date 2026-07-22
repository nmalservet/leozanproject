package com.leozanproject.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;

import com.leozanproject.exceptions.InvalidParameterException;
import com.leozanproject.exceptions.MissingParameterException;
import com.leozanproject.mapper.PatientMapper;
import com.leozanproject.model.Patient;
import com.leozanproject.repository.PatientRepository;
import com.leozanproject.resource.domain.PatientDTO;
import com.leozanproject.resource.domain.PatientFilterDTO;
import com.leozanproject.tools.AttributesControlsTool;

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;

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
		List<Patient> patients = repository.findAll(new Specification<Patient>() {
			/**
			 *
			 */
			private static final long serialVersionUID = 1L;

			@Override
			public Predicate toPredicate(Root<Patient> root, CriteriaQuery<?> query, CriteriaBuilder cb) {
				List<Predicate> predicates = new ArrayList<>();
				if (filter.getName() != null && !filter.getName().isEmpty())
					predicates.add(cb.like(cb.upper(root.get("name")), "%" + filter.getName().toUpperCase() + "%"));
				if (filter.getFirstName() != null && !filter.getFirstName().isEmpty())
					predicates.add(
							cb.like(cb.upper(root.get("firstName")), "%" + filter.getFirstName().toUpperCase() + "%"));
				if (filter.getSsn() != null && !filter.getSsn().isEmpty())
					predicates.add(cb.equal(root.get("ssn"), filter.getSsn()));
				if (filter.getMrn() != null && !filter.getMrn().isEmpty())
					predicates.add(cb.equal(root.get("mrn"), filter.getMrn()));
				if (filter.getBirthdateFrom() != null)
					predicates.add(cb.greaterThanOrEqualTo(root.get("birthdate"), filter.getBirthdateFrom()));
				if (filter.getBirthdateTo() != null)
					predicates.add(cb.lessThanOrEqualTo(root.get("birthdate"), filter.getBirthdateTo()));
				return cb.and(predicates.toArray(new Predicate[0]));
			}
		});
		return mapper.map(patients);
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
