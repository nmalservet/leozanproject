package com.leozanproject.mapper;

import org.springframework.stereotype.Component;

import com.leozanproject.constants.ProjectStatus;
import com.leozanproject.model.Project;
import com.leozanproject.resource.domain.ProjectDTO;

@Component
public class ProjectMapper {

	public ProjectDTO map(Project entity) {
		ProjectDTO p = new ProjectDTO(entity.getId(), entity.getName(), entity.getDescription());
		p.setStatus(entity.getStatus());
		if (entity.getDisabled() != null)
			p.setDisabled(entity.getDisabled());
		p.setStatusLabel(ProjectStatus.getValue(entity.getStatus()).name());
		if (entity.getResponsible() != null)
			p.setResponsible(entity.getResponsible());
		p.setDescription(entity.getDescription());
		return p;
	}

}
