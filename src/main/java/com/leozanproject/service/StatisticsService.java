package com.leozanproject.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.leozanproject.repository.SurveyAnswerRepository;
import com.leozanproject.resource.domain.ProjectDTO;
import com.leozanproject.resource.domain.ResponsesByProjectAndMonthDTO;
import com.leozanproject.resource.domain.ResponsesByProjectDTO;

/**
 * aggregated statistics for the analysis/statistics page.
 *
 * @author nicolas malservet
 *
 */
@Component
public class StatisticsService {

	@Autowired
	SurveyAnswerRepository surveyAnswerRepository;

	@Autowired
	ProjectService projectService;

	/**
	 * number of survey responses saved per project, per month. used for the history diagram.
	 */
	public List<ResponsesByProjectAndMonthDTO> getResponsesByProjectOverTime() {
		Map<Integer, ProjectDTO> projects = projectService.map();
		List<ResponsesByProjectAndMonthDTO> result = new ArrayList<>();
		for (Object[] row : surveyAnswerRepository.countResponsesByProjectAndMonth()) {
			Integer projectId = (Integer) row[0];
			ProjectDTO project = projects.get(projectId);
			ResponsesByProjectAndMonthDTO dto = new ResponsesByProjectAndMonthDTO();
			dto.setProjectId(projectId);
			dto.setProjectName(project != null ? project.getName() : null);
			dto.setMonth((String) row[1]);
			dto.setCount(((Number) row[2]).longValue());
			result.add(dto);
		}
		return result;
	}

	/**
	 * total number of survey responses saved per project, all time. used for the repartition diagram.
	 */
	public List<ResponsesByProjectDTO> getResponsesByProject() {
		Map<Integer, ProjectDTO> projects = projectService.map();
		List<ResponsesByProjectDTO> result = new ArrayList<>();
		for (Object[] row : surveyAnswerRepository.countResponsesByProject()) {
			Integer projectId = (Integer) row[0];
			ProjectDTO project = projects.get(projectId);
			ResponsesByProjectDTO dto = new ResponsesByProjectDTO();
			dto.setProjectId(projectId);
			dto.setProjectName(project != null ? project.getName() : null);
			dto.setCount(((Number) row[1]).longValue());
			result.add(dto);
		}
		result.sort((a, b) -> Long.compare(b.getCount(), a.getCount()));
		return result;
	}

}
