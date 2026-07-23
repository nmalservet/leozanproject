package com.leozanproject.resource.domain;

/**
 * result of a user deletion request: the user is archived instead of deleted
 * when it already has data attached (e.g. survey responses).
 *
 * @author nicolas malservet
 *
 */
public class UserDeletionResultDTO {

	private boolean deleted;

	private boolean archived;

	public UserDeletionResultDTO() {
	}

	public UserDeletionResultDTO(boolean deleted, boolean archived) {
		this.deleted = deleted;
		this.archived = archived;
	}

	public boolean isDeleted() {
		return deleted;
	}

	public void setDeleted(boolean deleted) {
		this.deleted = deleted;
	}

	public boolean isArchived() {
		return archived;
	}

	public void setArchived(boolean archived) {
		this.archived = archived;
	}

}
