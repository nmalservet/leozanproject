package com.leozanproject.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;

import com.leozanproject.constants.SurveyStatus;
import com.leozanproject.exceptions.InvalidParameterException;
import com.leozanproject.exceptions.MissingParameterException;
import com.leozanproject.mapper.SurveyMapper;
import com.leozanproject.model.Project;
import com.leozanproject.model.Survey;
import com.leozanproject.repository.ProjectRepository;
import com.leozanproject.repository.SurveyRepository;
import com.leozanproject.resource.domain.SurveyDTO;
import com.leozanproject.resource.domain.SurveyFilterDTO;
import com.leozanproject.tools.AttributesControlsTool;
import com.leozanproject.tools.ParametersChecker;

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
	private ProjectRepository projectRepository;

	@Autowired
	private SurveyMapper mapper;

	public List<SurveyDTO> list() {
		return mapper.map(repository.findAll());
	}

	/**
	 * a project is mandatory for the survey
	 * 
	 * @param dto
	 * @return
	 * @throws MissingParameterException
	 * @throws InvalidParameterException
	 */
	public int createSurvey(SurveyDTO dto) throws MissingParameterException, InvalidParameterException {
		ParametersChecker.isNotEmpty("name", dto.getName());
		ParametersChecker.isNotEmpty("description", dto.getDescription());
		ParametersChecker.isValidId("project", dto.getProject());
		Survey entity = new Survey();

		entity.setName(dto.getName());
		entity.setDescription(dto.getDescription());
		UUID uuid = UUID.randomUUID();
		entity.setUuid(uuid.toString());
		if (dto.getResponsible() != 0)
			entity.setResponsible(dto.getResponsible());
		entity.setStatus(SurveyStatus.NEW.getValue());
		entity.setProject(dto.getProject());
		repository.save(entity);

		return entity.getId();
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
			if (dto.getStatus() != null)
				entity.setStatus(dto.getStatus());
			entity.setProject(dto.getProject());
			repository.save(entity);
		}

		return true;
	}

	public SurveyDTO getSurvey(int id) throws MissingParameterException {

		Optional<Survey> opt = repository.findById(id);
		if (opt.isPresent()) {
			return mapper.map(opt.get());
		}

		return null;
	}

	public boolean updateSurvey() {
		return true;
	}

	public List<SurveyDTO> filter(SurveyFilterDTO filter) {
		List<SurveyDTO> result = new ArrayList<>();
		Pageable pageable = PageRequest.of(0, 1000, Sort.by(Sort.Direction.DESC, "id"));
		List<Survey> surveys = retrieveSurveys(filter, pageable);
		List<Project> projects = projectRepository.findAll();
		HashMap<Integer, Project> map = new HashMap<>();
		projects.forEach(p -> {
			map.put(p.getId(), p);
		});
		if (surveys != null) {
			for (Survey task : surveys) {
				result.add(mapper.map(task));
			}
		}
		// add project name if necessary (not done via join to gain maintenance and
		// reusability to extend it)
		result.forEach(survey -> {
			if (survey.getProject() > 0)
				survey.setProjectName(map.get(survey.getProject()).getName());
		});
		return result;
	}

	public List<Survey> retrieveSurveys(SurveyFilterDTO filter, Pageable pageable) {
		Page<Survey> demandes = repository.findAll(new Specification<Survey>() {
			/**
			 * 
			 */
			private static final long serialVersionUID = 1L;

			@Override
			public Predicate toPredicate(Root<Survey> root, CriteriaQuery<?> query, CriteriaBuilder cb) {

				List<Predicate> predicates = new ArrayList<>();
				if (filter.getId() != null && filter.getId() > 0)
					predicates.add(cb.equal(root.get("id"), new Integer(filter.getId())));
				if (filter.getResponsibleId() != null)
					predicates.add(cb.equal(root.get("responsible"), filter.getResponsibleId()));
				if (filter.getProjectId() != null)
					predicates.add(cb.equal(root.get("project"), filter.getProjectId()));
				if (filter.getStatus() != null)
					predicates.add(cb.equal(root.get("status"), filter.getStatus()));
				if (filter.getTopic() != null)
					predicates.add(cb.like(cb.upper(root.get("name")), "%" + filter.getTopic().toUpperCase() + "%"));
				return cb.and(predicates.toArray(new Predicate[0]));
			}
		}, pageable);
		return demandes.getContent();
	}

	public Boolean deleteSurvey(int id) {
		repository.deleteById(id);
		return true;
	}
}
