package com.leozanproject.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.leozanproject.model.SelectListOption;
import com.leozanproject.repository.SelectListOptionRepository;
import com.leozanproject.resource.domain.SelectListOptionDTO;

/**
 * expose select list services stored in db like statuses, priorities etc.
 * @author nicolas malservet
 *
 */
@Component
public class SelectListService {

	@Autowired
	SelectListOptionRepository repository;
	
	
	/**
	 * taskstatuses is a fixed list id=1.
	 * @return
	 */
	public List<SelectListOptionDTO> getSurveyStatuses(){
		return getOptions(1);
		
	}
	
	/**
	 * priorities is a fixed list. id=2
	 * @return
	 */
	public List<SelectListOptionDTO> getPriorities(){
		return getOptions(2);
	
}
	
	private List<SelectListOptionDTO> getOptions(int id){
		List<SelectListOption> entities = repository.findAllBySelectListId(id);
		List<SelectListOptionDTO> res = new ArrayList<>();
		entities.forEach(entity->res.add(map(entity)));
		return res;
	}
	
	/**
	 * TODO think to use Lombok later
	 * @param entity
	 * @return
	 */
	private SelectListOptionDTO map(SelectListOption entity) {
		if(entity==null)
			return null;
		return new SelectListOptionDTO(entity.getId(),entity.getName(),entity.getLabel(),entity.getDisplayOrder(),entity.getKey());
	}
}
