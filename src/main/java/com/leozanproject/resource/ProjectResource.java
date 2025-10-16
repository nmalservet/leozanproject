package com.leozanproject.resource;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.leozanproject.exceptions.InvalidParameterException;
import com.leozanproject.exceptions.MissingParameterException;
import com.leozanproject.resource.domain.ProjectDTO;
import com.leozanproject.service.ProjectService;

import io.swagger.annotations.Api;

@Api(value = "Application")
@RestController
@Validated
@RequestMapping("/api/v1/projects")
public class ProjectResource {

	@Autowired
	ProjectService service;

	@GetMapping(path = "", produces = "application/json")
	public List<ProjectDTO> list() throws Exception {
		return service.list();
	}

	/**
	 * return the list of enabled projects.
	 * @return
	 * @throws Exception
	 */
	@GetMapping(path = "/enabled", produces = "application/json")
	public List<ProjectDTO> getEnabledProject() throws Exception {
		return service.getProjectsByDisabled(false);
	}
	
	/**
	 * POST to create
	 * @param project
	 * @return
	 * @throws MissingParameterException
	 * @throws InvalidParameterException 
	 */
	@PostMapping(path = "", produces = "application/json")
	@ResponseStatus(HttpStatus.CREATED)
	public int create(@RequestBody ProjectDTO project) throws MissingParameterException, InvalidParameterException {
		return service.create(project);
	}

	@GetMapping(path = "/{id}", produces = "application/json")
	public ProjectDTO get(@PathVariable int id) throws InvalidParameterException, MissingParameterException {
		return service.get(id);
	}

	/**
	 * PUT is the verb for update
	 * @param task
	 * @return
	 * @throws MissingParameterException
	 * @throws InvalidParameterException
	 */
	@PutMapping(path = "/{id}", produces = "application/json")
	public int update(@RequestBody ProjectDTO project,@PathVariable int id) throws MissingParameterException, InvalidParameterException {
		if(id!=project.getId())
			throw new InvalidParameterException("Project id uncompliant");
		return service.update(project);
	}

	@DeleteMapping(path = "/{id}", produces = "application/json")
	public boolean delete(@PathVariable int id) throws MissingParameterException, InvalidParameterException {
		return service.delete(id);
	}

}
