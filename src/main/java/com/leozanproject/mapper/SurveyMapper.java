package com.leozanproject.mapper;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Component;

import com.leozanproject.model.Survey;
import com.leozanproject.resource.domain.SurveyDTO;

@Component
public class SurveyMapper {

	
	public SurveyDTO map(Survey entity) {
		if(entity==null)
			return null;
		
		SurveyDTO dto = new SurveyDTO();
		dto.setName(entity.getName());
		dto.setStatus(entity.getStatus());
		dto.setTargetObject(entity.getTargetObject());
		dto.setUuid(entity.getUuid());
		return dto;
	}
	
	public List<SurveyDTO> map(List<Survey> entities) {
		List<SurveyDTO> res = new ArrayList<>();
		entities.forEach(entity->res.add(map(entity)));
		return res;
	}
}
