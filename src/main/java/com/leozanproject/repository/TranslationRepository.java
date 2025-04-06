package com.leozanproject.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.leozanproject.model.Translation;

/**
 * basic JPA repository for translation management.
 * @author nicolas malservet
 *
 */
@Repository
public interface TranslationRepository extends JpaRepository<Translation, Integer> {


}
