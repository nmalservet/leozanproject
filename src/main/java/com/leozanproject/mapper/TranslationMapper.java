package com.leozanproject.mapper;

import org.springframework.stereotype.Component;

import com.leozanproject.model.Translation;
import com.leozanproject.resource.domain.TranslationDTO;

@Component
public class TranslationMapper {

	public TranslationDTO map(Translation entity) {
		TranslationDTO dto = new TranslationDTO();
		
		return dto;
	}
}
