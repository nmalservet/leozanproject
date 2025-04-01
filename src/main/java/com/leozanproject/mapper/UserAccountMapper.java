package com.leozanproject.mapper;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Component;

import com.leozanproject.constants.UserRole;
import com.leozanproject.model.User;
import com.leozanproject.resource.domain.UserAccountDTO;

/**
 * Mapper between entity and DTO.
 * TODO Migrate this to Lombok later..
 * 
 * @author nicolas malservet
 *
 */
@Component
public class UserAccountMapper {

	/**
	 * 
	 * @param entity
	 * @return
	 */
	public UserAccountDTO toDTO(User entity) {
		if (entity != null) {
			UserAccountDTO dto = new UserAccountDTO();
			dto.setUsername(entity.getUsername());
			dto.setEmail(entity.getEmail());
			dto.setFirstName(entity.getFirstName());
			dto.setName(entity.getName());
			dto.setId(entity.getId());
			dto.setDisabled(entity.isDisabled());
			if (entity.getRole() != null) {
				dto.setRole(entity.getRole());
				dto.setRoleLabel(UserRole.getValue(entity.getRole()).name());
			}
			return dto;
		}
		return null;
	}

	public List<UserAccountDTO> convert(List<User> entities) {
		List<UserAccountDTO> result = new ArrayList<>();
		for (User user : entities) {
			result.add(toDTO(user));
		}
		return result;
	}

}
