package com.leozanproject.mapper;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Component;

import com.leozanproject.model.Answer;
import com.leozanproject.resource.domain.AnswerDTO;

@Component
public class AnswerMapper {

	public AnswerDTO map(Answer entity) {
		AnswerDTO res = new AnswerDTO();
		if (entity != null) {
			res.setSurveyComponentId(entity.getSurveyObjectId());
			res.setValue(entity.getValue());
		}
		return res;
	}

	public List<AnswerDTO> map(List<Answer> entities) {
		List<AnswerDTO> res = new ArrayList<>();
		entities.forEach(entity -> res.add(map(entity)));
		return res;
	}
}
