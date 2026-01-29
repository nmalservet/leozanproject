package com.leozanproject;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.leozanproject.exceptions.BusinessRuleValidationException;
import com.leozanproject.exceptions.MissingParameterException;
import com.leozanproject.resource.domain.SurveyObjectDTO;
import com.leozanproject.service.SurveyObjectService;

@SpringBootTest
public class SurveyObjectServiceTest {

	@Autowired
	SurveyObjectService service;
	
	@Test
	public void add() throws MissingParameterException, BusinessRuleValidationException {
		SurveyObjectDTO dto = new SurveyObjectDTO();
		dto.setName(" my question name");
		service.create(dto);
		
	}
}
