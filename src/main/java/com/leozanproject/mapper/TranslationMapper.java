package com.leozanproject.mapper;

import org.springframework.stereotype.Component;

import com.leozanproject.model.Translation;
import com.leozanproject.resource.domain.TranslationDTO;

@Component
public class TranslationMapper {

	public TranslationDTO map(Translation entity) {
		TranslationDTO dto = new TranslationDTO();
		dto.setId(entity.getId());
		dto.setFr(entity.getFr());
		dto.setEn(entity.getEn());
		dto.setPt(entity.getPt());
		dto.setLb(entity.getLb());
		dto.setDe(entity.getDe());
		return dto;
	}
}
