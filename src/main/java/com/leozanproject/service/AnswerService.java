package com.leozanproject.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.leozanproject.exceptions.InvalidParameterException;
import com.leozanproject.mapper.PatientMapper;
import com.leozanproject.mapper.SurveyMapper;
import com.leozanproject.model.Answer;
import com.leozanproject.model.Patient;
import com.leozanproject.model.Project;
import com.leozanproject.model.Survey;
import com.leozanproject.model.SurveyAnswer;
import com.leozanproject.repository.AnswerRepository;
import com.leozanproject.repository.PatientRepository;
import com.leozanproject.repository.ProjectRepository;
import com.leozanproject.repository.SurveyAnswerRepository;
import com.leozanproject.repository.SurveyRepository;
import com.leozanproject.resource.domain.AnswerDTO;
import com.leozanproject.resource.domain.AnswerFilterDTO;
import com.leozanproject.resource.domain.AnswersInstanceDTO;
import com.leozanproject.resource.domain.PatientDTO;
import com.leozanproject.resource.domain.SurveyAnswersDTO;

@Component
public class AnswerService {

	@Autowired
	AnswerRepository repository;

	@Autowired
	SurveyAnswerRepository surveyAnswerRepository;
	
	@Autowired
	SurveyRepository surveyRepository;
	
	@Autowired
	PatientRepository patientRepository;
	
	@Autowired
	ProjectRepository projectRepository;
	
	@Autowired
	PatientMapper patMapper;
	
	@Autowired
	SurveyMapper survMapper;
	
	public List<AnswersInstanceDTO> list(AnswerFilterDTO filter) {
		List<SurveyAnswer> ans = surveyAnswerRepository.findAll();
		List<AnswersInstanceDTO> res = new ArrayList<>();
		for(SurveyAnswer an : ans) {
			AnswersInstanceDTO dto = new AnswersInstanceDTO();
			dto.setId(an.getId());
			dto.setUuid(an.getUuid());
			dto.setUpdateDate(an.getUpdateDate());
			int patId=an.getPatientId();
			Optional<Patient> optPat = patientRepository.findById(patId);
			if(optPat.isPresent()) {
				PatientDTO patDTO = patMapper.map(optPat.get());
				dto.setPatient(patDTO);
				dto.setPatientLabel(patDTO.getName()+" "+patDTO.getFirstName());
				dto.setMrn(patDTO.getMrn());
			}
			
			//get the survey
			Optional<Survey> opt = surveyRepository.findById(an.getSurveyId());
			if (opt.isPresent()) {
				Survey surv = opt.get();
				dto.setSurvey(survMapper.map(surv));
				dto.setSurveyLabel(surv.getName());
				Integer projectId = surv.getProject();
				Optional<Project> optP = projectRepository.findById(projectId);
				dto.setProject(optP.get().getName());
			}
			res.add(dto);
		}
		return res;
	}

	/**
	 * todo manage the update
	 * 
	 * @param answers
	 * @param userId
	 * @return surveyAnswersId
	 * @throws InvalidParameterException 
	 */
	public Integer save(SurveyAnswersDTO answers, int userId) throws InvalidParameterException {

		SurveyAnswer sa = new SurveyAnswer();
		
		Optional<Patient> optP = patientRepository.findByUuid(answers.getPatientUuid());
		if(!optP.isPresent())
			throw new InvalidParameterException("patientUuid");
		else
			sa.setPatientId(optP.get().getId());
		sa.setSurveyId(answers.getSurveyId());
		sa.setCreatedBy(userId);
		sa.setCreationDate(new Date());
		sa.setUpdateDate(new Date());
		sa.setName("");
		UUID uuid = UUID.randomUUID();
		String uuidAsString = uuid.toString();
		sa.setUuid(uuidAsString);

		surveyAnswerRepository.save(sa);
		int surveyAnswerId = sa.getId();
		// now we save the answers related to the survey
		if (answers.getAnswers() != null)
			for (AnswerDTO answer : answers.getAnswers()) {
				repository.save(new Answer(surveyAnswerId, answer.getSurveyComponentId(), answer.getValue()));
			}
		return surveyAnswerId;
	}

	public Boolean update(SurveyAnswersDTO answers, int userId) {

		int id = answers.getId();

		Optional<SurveyAnswer> opt = surveyAnswerRepository.findById(id);
		if (opt.isPresent()) {
			SurveyAnswer sa = opt.get();
			sa.setUpdatedBy(userId);
			sa.setUpdateDate(new Date());

			surveyAnswerRepository.save(sa);
		}

		// now we update the answers related to the survey
		for (AnswerDTO answer : answers.getAnswers()) {
			Optional<Answer> opt2 = repository.findBySurveyAnswerIdAndSurveyObjectId(id, answer.getSurveyComponentId());
			if (opt2.isPresent()) {
				Answer ans = opt2.get();
				ans.setValue(answer.getValue());
				repository.save(ans);
			}
		}
		return true;
	}
}
