package com.leozanproject.repository;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.leozanproject.model.UserSession;

@Repository
public interface UserSessionRepository extends JpaRepository<UserSession, Integer> {

	UserSession findByInternalUserId(String userId);

	UserSession findByToken(String token);

	UserSession findByLogin(String login);

	/**
	 * delete all sessions by login
	 * 
	 * @param login
	 */
	@Transactional
	@Modifying
	@Query("delete from UserSession us where us.login=?1")
	void deleteByLogin(String login);
}
