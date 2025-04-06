package com.leozanproject.constants;

/**
 * survey status
 * We start with a basick skeleton of  statuses.
 * NEW = in progress , not yet used
 * VALIDATED = ready to be deployed
 * DEPLOYED = visible for others users
 * DISABLED = no more visible
 * @author nicolas malservet
 *
 */
public enum SurveyStatus {
	DISABLED(3),DEPLOYED(2), VALIDATED(1), NEW(0);

	private final int value;

	SurveyStatus(final int val) {
		value = val;
	}

	public int getValue() {
		return value;
	}

	/**
	 * get the value of the provided code
	 * 
	 * @param value
	 * @return
	 */
	public static SurveyStatus getValue(int value) {
		switch (value) {
		case 3:
			return DISABLED;
		case 2:
			return DEPLOYED;
		case 1:
			return VALIDATED;
		case 0:
			return NEW;
		}
		return NEW;
	}

}