package com.leozanproject.mapper;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Component;

import com.leozanproject.model.Patient;
import com.leozanproject.resource.domain.PatientDTO;

@Component
public class PatientMapper {

	
	public PatientDTO map(Patient entity) {
		if(entity==null)
			return null;
		
		PatientDTO dto = new PatientDTO();
		dto.setId(entity.getId());
		dto.setName(entity.getName());
		dto.setFirstName(entity.getFirstName());
		dto.setBirthdate(entity.getBirthdate());
		dto.setGender(entity.getGender());
		dto.setUuid(entity.getUuid());
		return dto;
	}
	
	public List<PatientDTO> map(List<Patient> entities) {
		List<PatientDTO> res = new ArrayList<>();
		entities.forEach(entity->res.add(map(entity)));
		return res;
	}
}
