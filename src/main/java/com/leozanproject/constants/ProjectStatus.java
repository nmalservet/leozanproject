package com.leozanproject.constants;

/**
 * FIXED status for the response process
 * 
 * @author nm27
 *
 */
public enum ProjectStatus {
	NEW(0), IN_PROGRESS(1), DONE(2);

	private final int value;

	ProjectStatus(final int val) {
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
	public static ProjectStatus getValue(int value) {
		switch (value) {
		case 0:
			return NEW;
		case 1:
			return IN_PROGRESS;
		case 2:
			return DONE;
		}
		return NEW;
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
