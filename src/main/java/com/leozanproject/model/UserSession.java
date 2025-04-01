package com.leozanproject.model;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * User session storage to persist the session and be able to reuse them after a restart.
 * 
 * @author nicolas malservet
 *
 */
@Entity
@Table(name = "user_session")
public class UserSession implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = -1010321764542096571L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	public int id;

	@Column(name = "internal_user_id")
	public int internalUserId;

	@Column(name = "token")
	public String token;

	@Column(name = "login")
	public String login;

	@Column(name = "creation_date")
	public Date creationDate;

	@Column(name = "last_activity")
	public Date lastActivity;

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

	public Date getCreationDate() {
		return creationDate;
	}

	public void setCreationDate(Date creationDate) {
		this.creationDate = creationDate;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getInternalUserId() {
		return internalUserId;
	}

	public void setInternalUserId(int internalUserId) {
		this.internalUserId = internalUserId;
	}

	public String getLogin() {
		return login;
	}

	public void setLogin(String login) {
		this.login = login;
	}

	public Date getLastActivity() {
		return lastActivity;
	}

	public void setLastActivity(Date lastActivity) {
		this.lastActivity = lastActivity;
	}

}
