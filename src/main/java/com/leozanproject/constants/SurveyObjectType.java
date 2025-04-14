package com.leozanproject.constants;

/**
 * FIXED status for the response process
 * 
 * @author nm27
 *
 */
public enum SurveyObjectType {
	QUESTION(0), TEXT(1);

	private final int value;

	SurveyObjectType(final int val) {
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
	public static SurveyObjectType getValue(int value) {
		switch (value) {
		case 0:
			return QUESTION;
		case 1:
			return TEXT;
		}
		return QUESTION;
	}

	/**
	 * get the value into french TODO refactor this mechanism to put it on a better
	 * dynamic way
	 * 
	 * @param value
	 * @return
	 */
	/*
	 * public static String toFr(int value) { switch (value) { case 0: return
	 * "EN ATTENTE"; case 1: return "EN COURS"; case 2: return "RÉALISÉE"; } return
	 * "EN ATTENTE"; }
	 */

}
