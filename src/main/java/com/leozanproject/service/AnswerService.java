package com.leozanproject.service;

import java.util.Date;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.leozanproject.exceptions.InvalidParameterException;
import com.leozanproject.model.Answer;
import com.leozanproject.model.Patient;
import com.leozanproject.model.SurveyAnswer;
import com.leozanproject.repository.AnswerRepository;
import com.leozanproject.repository.PatientRepository;
import com.leozanproject.repository.SurveyAnswerRepository;
import com.leozanproject.resource.domain.AnswerDTO;
import com.leozanproject.resource.domain.SurveyAnswersDTO;

@Component
public class AnswerService {

	@Autowired
	AnswerRepository repository;

	@Autowired
	SurveyAnswerRepository surveyAnswerRepository;
	
	@Autowired
	PatientRepository patientRepository;

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
