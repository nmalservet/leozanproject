package com.leozanproject.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.leozanproject.constants.Constraints;
import com.leozanproject.exceptions.BusinessRuleValidationException;
import com.leozanproject.exceptions.MissingParameterException;
import com.leozanproject.mapper.SurveyObjectMapper;
import com.leozanproject.model.SurveyObject;
import com.leozanproject.repository.SurveyObjectRepository;
import com.leozanproject.resource.domain.SurveyObjectDTO;
import com.leozanproject.resource.domain.TranslationDTO;
import com.leozanproject.tools.AttributesControlsTool;

@Component
public class SurveyObjectService {

	@Autowired
	SurveyObjectRepository repository;

	@Autowired
	TranslationService service;

	@Autowired
	SurveyObjectMapper mapper;

	/**
	 * create a survey object
	 * 
	 * @param dto
	 * @return
	 * @throws MissingParameterException
	 * @throws BusinessRuleValidationException
	 */
	public int create(SurveyObjectDTO dto) throws MissingParameterException, BusinessRuleValidationException {
		checkConstraints(dto);
		// create the translation bw default
		TranslationDTO translation = new TranslationDTO(dto.getName(), dto.getName(), dto.getName(), dto.getName(),
				dto.getName());
		int translationId = service.create(translation);

		SurveyObject entity = new SurveyObject();
		entity.setTranslationId(translationId);
		entity.setName(dto.getName());
		entity.setSurveyId(dto.getSurveyId());
		entity.setPosition(dto.getPosition());
		entity.setStatus(dto.getStatus());

		entity.setStyle(dto.getStyle());
		entity.setType(dto.getType() != null ? dto.getType() : 0);
		entity.setQuestionType(dto.getQuestionType());
		entity.setValues(dto.getValues());
		repository.save(entity);
		return entity.getId();
	}

	/**
	 * list survey objects for an id.
	 * 
	 * @param surveyId
	 * @return
	 */
	public List<SurveyObjectDTO> list(int surveyId) {
		List<SurveyObject> list = repository.findBySurveyIdOrderByPosition(surveyId);
		return mapper.map(list);
	}

	public int update(SurveyObjectDTO dto) throws MissingParameterException, BusinessRuleValidationException {
		checkConstraints(dto);
		Optional<SurveyObject> opt = repository.findById(dto.getId());
		if (opt.isPresent()) {
			SurveyObject entity = opt.get();
			entity.setName(dto.getName());
			entity.setType(dto.getType());
			entity.setStyle(dto.getStyle());
			entity.setStatus(dto.getStatus());
			entity.setPosition(dto.getPosition());
			entity.setQuestionType(dto.getQuestionType());
			entity.setValues(dto.getValues());
			repository.save(entity);
			return entity.getId();
		}
		return 0;
	}

	public boolean delete(int id) {
		Optional<SurveyObject> opt = repository.findById(id);
		if (opt.isPresent()) {
			repository.delete(opt.get());
			return true;
		}
		return false;
	}

	public void checkConstraints(SurveyObjectDTO dto)
			throws BusinessRuleValidationException, MissingParameterException {
		AttributesControlsTool.isEmpty("name", dto.getName());
		if (dto.getStyle().length() > Constraints.SURVEY_OBJECT_LENGTH)
			throw new BusinessRuleValidationException("Style exceed the limit of 250 characters");
	}
}
