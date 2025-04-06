package com.leozanproject.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.leozanproject.model.SelectListOption;

/**
 * repository to manage options into fixed select list ( common objects like statuses, twpes, etc.)
 * @author nicolas malservet
 *
 */
@Repository
public interface SelectListOptionRepository extends JpaRepository<SelectListOption, Integer> {

	List<SelectListOption> findAllBySelectListId(int selectListId);
	

}
