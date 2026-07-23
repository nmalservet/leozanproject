package com.leozanproject.resource.domain;

/**
 * number of survey responses saved for a project, for a given month.
 *
 * @author nicolas malservet
 *
 */
public class ResponsesByProjectAndMonthDTO {

	private Integer projectId;

	private String projectName;

	/**
	 * month formatted as yyyy-MM
	 */
	private String month;

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

	public String getMonth() {
		return month;
	}

	public void setMonth(String month) {
		this.month = month;
	}

	public long getCount() {
		return count;
	}

	public void setCount(long count) {
		this.count = count;
	}

}
