package com.leozanproject.resource.domain;

/**
 * total number of survey responses saved for a project, all time.
 *
 * @author nicolas malservet
 *
 */
public class ResponsesByProjectDTO {

	private Integer projectId;

	private String projectName;

	private long count;

	public Integer getProjectId() {
		return projectId;
	}

	public void setProjectId(Integer projectId) {
		this.projectId = projectId;
	}

	public String getProjectName() {
		return projectName;
	}

	public void setProjectName(String projectName) {
		this.projectName = projectName;
	}

	public long getCount() {
		return count;
	}

	public void setCount(long count) {
		this.count = count;
	}

}
