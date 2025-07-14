package com.leozanproject.mapper;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Component;

import com.leozanproject.model.SurveyObject;
import com.leozanproject.resource.domain.SurveyObjectDTO;

@Component
public class SurveyObjectMapper {

	public SurveyObjectDTO map(SurveyObject entity) {
		if (entity == null)
			return null;

		SurveyObjectDTO dto = new SurveyObjectDTO();
		dto.setId(entity.getId());
		dto.setName(entity.getName());
		dto.setStatus(entity.getStatus());
		dto.setType(entity.getType());
		dto.setStyle(entity.getStyle());
		dto.setPosition(entity.getPosition());
		dto.setQuestionType(entity.getQuestionType());
		dto.setValues(entity.getValues());
		return dto;
	}

	public List<SurveyObjectDTO> map(List<SurveyObject> entities) {
		List<SurveyObjectDTO> res = new ArrayList<>();
		entities.forEach(entity -> res.add(map(entity)));
		return res;
	}
}
