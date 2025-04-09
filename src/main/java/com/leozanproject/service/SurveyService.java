package com.leozanproject.service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.leozanproject.constants.SurveyStatus;
import com.leozanproject.exceptions.MissingParameterException;
import com.leozanproject.mapper.SurveyMapper;
import com.leozanproject.model.Survey;
import com.leozanproject.repository.SurveyRepository;
import com.leozanproject.resource.domain.SurveyDTO;
import com.leozanproject.tools.AttributesControlsTool;

/**
 * survey management service.
 * 
 * @author nicolas malservet
 *
 */
@Component
public class SurveyService {

	@Autowired
	private SurveyRepository repository;

	@Autowired
	private SurveyMapper mapper;

	public List<SurveyDTO> list() {
		return mapper.map(repository.findAll());
	}

	public boolean createSurvey(SurveyDTO dto) throws MissingParameterException {

		AttributesControlsTool.isEmpty("name", dto.getName());

		Survey entity = new Survey();
		entity.setName(dto.getName());
		entity.setDescription(dto.getDescription());
		UUID uuid = UUID.randomUUID();
		entity.setUuid(uuid.toString());
		if (dto.getResponsible() != 0)
			entity.setResponsible(dto.getResponsible());
		entity.setStatus(SurveyStatus.NEW.getValue());
		repository.save(entity);

		return true;
	}

	public boolean updateSurvey(SurveyDTO dto) throws MissingParameterException {

		AttributesControlsTool.isEmpty("name", dto.getName());

		Optional<Survey> opt = repository.findById(dto.getId());
		if (opt.isPresent()) {
			Survey entity = opt.get();
			entity.setName(dto.getName());
			entity.setDescription(dto.getDescription());
			if (dto.getResponsible() != 0)
				entity.setResponsible(dto.getResponsible());
			entity.setStatus(dto.getStatus());
			repository.save(entity);
		}

		return true;
	}

	public boolean updateSurvey() {
		return true;
	}
}
