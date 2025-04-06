package com.leozanproject.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.leozanproject.exceptions.MissingParameterException;
import com.leozanproject.model.SurveyObject;
import com.leozanproject.repository.SurveyObjectRepository;
import com.leozanproject.resource.domain.SurveyObjectDTO;
import com.leozanproject.tools.AttributesControlsTool;

@Component
public class SurveyObjectService {

	@Autowired
	SurveyObjectRepository repository;
	
	public boolean createSurveyObject(SurveyObjectDTO dto) throws MissingParameterException {
	
		AttributesControlsTool.isEmpty("name", dto.getName());
		SurveyObject entity = new SurveyObject();
		entity.setName(dto.getName());
		repository.save(entity);
		return true;
	}
}
