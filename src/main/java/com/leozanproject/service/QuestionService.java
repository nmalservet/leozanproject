package com.leozanproject.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.leozanproject.exceptions.MissingParameterException;
import com.leozanproject.model.Question;
import com.leozanproject.repository.QuestionRepository;
import com.leozanproject.resource.domain.QuestionDTO;
import com.leozanproject.tools.AttributesControlsTool;

/**
 * question management
 * @author nicolas malservet
 *
 */
@Component
public class QuestionService {

	@Autowired
	QuestionRepository repository;
	
	public boolean createQuestion(QuestionDTO dto) throws MissingParameterException {
		
		AttributesControlsTool.isEmpty("name", dto.getName());
		
		Question entity = new Question();
		entity.setName(dto.getName());
		entity.setType(dto.getType());
		entity.setTranslationId(dto.getTranslationId());
		repository.save(entity);
		return true;
		
	}
}
