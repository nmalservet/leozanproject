package com.leozanproject.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.leozanproject.exceptions.MissingParameterException;
import com.leozanproject.model.Value;
import com.leozanproject.repository.ValueRepository;
import com.leozanproject.resource.domain.ValueDTO;
import com.leozanproject.tools.AttributesControlsTool;

/**
 * service to manage values linked to questions.
 * @author nicolas malservet
 *
 */
@Component
public class ValueService {

	@Autowired
	ValueRepository repository;
	
	public boolean createValue(ValueDTO dto) throws MissingParameterException {
		
		AttributesControlsTool.isEmpty("name", dto.getName());
		AttributesControlsTool.isSet("questionId", dto.getQuestionId());
		Value entity = new Value();
		entity.setName(dto.getName());
		entity.setQuestionId(dto.getQuestionId());
		repository.save(entity);
		return true;
		
	}
}
