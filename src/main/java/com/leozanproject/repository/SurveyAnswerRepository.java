package com.leozanproject.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.leozanproject.model.SurveyAnswer;

/**
 * basic JPA repository for survey answer management.
 * @author nicolas malservet
 *
 */
@Repository
public interface SurveyAnswerRepository extends JpaRepository<SurveyAnswer, Integer> {

	public List<SurveyAnswer> findAllByOrderByIdDesc();

	public boolean existsByCreatedBy(Integer createdBy);

	/**
	 * number of responses saved per project, per month. each row: [project id, month
	 * (yyyy-MM), count]. surveys not attached to a project are excluded.
	 */
	@Query(value = "select s.project, to_char(date_trunc('month', sa.creation_date), 'YYYY-MM'), count(*) "
			+ "from survey_answer sa join survey s on sa.survey_id = s.id "
			+ "where s.project is not null "
			+ "group by s.project, date_trunc('month', sa.creation_date) "
			+ "order by date_trunc('month', sa.creation_date)", nativeQuery = true)
	List<Object[]> countResponsesByProjectAndMonth();

	/**
	 * number of responses saved per project, all time. each row: [project id, count].
	 * surveys not attached to a project are excluded.
	 */
	@Query(value = "select s.project, count(*) "
			+ "from survey_answer sa join survey s on sa.survey_id = s.id "
			+ "where s.project is not null "
			+ "group by s.project", nativeQuery = true)
	List<Object[]> countResponsesByProject();

}
