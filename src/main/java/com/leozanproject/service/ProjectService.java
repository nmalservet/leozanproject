package com.leozanproject.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Component;

import com.leozanproject.exceptions.InvalidParameterException;
import com.leozanproject.exceptions.MissingParameterException;
import com.leozanproject.mapper.ProjectMapper;
import com.leozanproject.model.Project;
import com.leozanproject.model.Survey;
import com.leozanproject.repository.ProjectRepository;
import com.leozanproject.repository.SurveyRepository;
import com.leozanproject.resource.domain.ProjectDTO;
import com.leozanproject.resource.domain.UserAccountDTO;
import com.leozanproject.tools.ParametersChecker;

@Component
public class ProjectService {

	@Autowired
	ProjectRepository repository;

	@Autowired
	SurveyRepository surveyRepository;

	@Autowired
	ProjectMapper mapper;

	@Autowired
	UserService userService;

	/**
	 * create a project
	 * 
	 * @return
	 * @throws MissingParameterException
	 * @throws InvalidParameterException 
	 */
	public int create(ProjectDTO dto) throws MissingParameterException, InvalidParameterException {

		ParametersChecker.isNotEmpty("name",dto.getName());
		ParametersChecker.isNotEmpty("description",dto.getDescription());

		Project entity = new Project();
		entity.setName(dto.getName());
		entity.setDescription(dto.getDescription());
		entity.setDisabled(false);
		if (dto.getResponsible() > 0)
			entity.setResponsible(dto.getResponsible());
		repository.save(entity);
		return entity.getId();
	}

	public ProjectDTO get(int id) throws MissingParameterException, InvalidParameterException {
		if (id <= 0)
			throw new MissingParameterException("id");
		Optional<Project> opt = repository.findById(id);
		if (opt.isPresent()) {
			return mapper.map(opt.get());
		}
		throw new InvalidParameterException("id");
	}

	public int update(ProjectDTO dto) throws MissingParameterException {
		if (dto.getId() <= 0)
			throw new MissingParameterException("id");
		if (dto.getName() == null) {
			throw new MissingParameterException("name");
		}
		Optional<Project> opt = repository.findById(dto.getId());
		if (opt.isPresent()) {
			Project entity = opt.get();
			entity.setName(dto.getName());
			entity.setDescription(dto.getDescription());
			if (dto.getResponsible() > 0)
				entity.setResponsible(dto.getResponsible());
			entity.setStatus(dto.getStatus());
			entity.setDisabled(dto.isDisabled());
			repository.save(entity);
			return entity.getId();
		}
		return dto.getId();
	}

	public List<ProjectDTO> list() {
		List<Project> projects = repository.findAll(Sort.by(Sort.Direction.ASC, "name"));
		List<ProjectDTO> result = new ArrayList<>();
		projects.forEach(project -> result.add(mapper.map(project)));
		Map<Integer, UserAccountDTO> users = userService.map();
		result.forEach(project -> {
			if (project.getResponsible() > 0)
				project.setResponsibleUsername(users.get(project.getResponsible()).toLiteral());
		});
		return result;
	}

	public List<ProjectDTO> getProjectsByDisabled(boolean disabled) {
		List<Project> projects = repository.findByDisabled(disabled,Sort.by(Sort.Direction.ASC, "name"));
		List<ProjectDTO> result = new ArrayList<>();
		projects.forEach(project -> result.add(mapper.map(project)));
		Map<Integer, UserAccountDTO> users = userService.map();
		result.forEach(project -> {
			if (project.getResponsible() > 0)
				project.setResponsibleUsername(users.get(project.getResponsible()).toLiteral());
		});
		return result;
	}
	/**
	 * get a map for cases to fetch directly the user by id
	 * 
	 * @return
	 */
	public Map<Integer, ProjectDTO> map() {
		Map<Integer, ProjectDTO> res = new HashMap<Integer, ProjectDTO>();
		List<Project> projs = repository.findAll();
		projs.forEach(proj -> {
			res.put(proj.getId(), mapper.map(proj));
		});
		return res;
	}

	/**
	 * delete a project.
	 * 
	 * @param id
	 * @return
	 * @throws MissingParameterException
	 */
	public boolean delete(int id) throws MissingParameterException {
		if (id <= 0)
			throw new MissingParameterException("id");

		Optional<Project> opt = repository.findById(id);
		if (opt.isPresent()) {
			// if there is tasks we thrown an exception else
			List<Survey> tasks = surveyRepository.findByProject(id);
			if (tasks.size() > 0) {
				// set the project as disabled
				Project proj = opt.get();
				proj.setDisabled(true);
			} else {
				// delete the project
				repository.deleteById(id);
			}
			return true;
		}
		return false;
	}
}
