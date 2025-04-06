package com.leozanproject.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.leozanproject.model.Value;

/**
 * basic JPA repository for value management.
 * @author nicolas malservet
 *
 */
@Repository
public interface ValueRepository extends JpaRepository<Value, Integer> {


}
