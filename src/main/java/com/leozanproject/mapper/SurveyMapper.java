package com.leozanproject.mapper;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Component;

import com.leozanproject.constants.SurveyStatus;
import com.leozanproject.model.Survey;
import com.leozanproject.resource.domain.SurveyDTO;

@Component
public class SurveyMapper {

	public SurveyDTO map(Survey entity) {
		if (entity == null)
			return null;

		SurveyDTO dto = new SurveyDTO();
		dto.setId(entity.getId());
		dto.setName(entity.getName());
		dto.setStatus(entity.getStatus());
		if(entity.getStatus()!=null)
			dto.setStatusLabel(SurveyStatus.getValue(entity.getStatus()).name());
		dto.setTargetObject(entity.getTargetObject());
		dto.setUuid(entity.getUuid());
		if (entity.getProject() != null)
			dto.setProject(entity.getProject());
		return dto;
	}

	public List<SurveyDTO> map(List<Survey> entities) {
		List<SurveyDTO> res = new ArrayList<>();
		entities.forEach(entity -> res.add(map(entity)));
		return res;
	}
}
