package com.leozanproject.constants;

/**
 * question type define the input type
 * 
 * @author nm27
 *
 */
public enum QuestionType {
	INPUT(0), TEXT_AREA(1), SELECT_LIST(2), CHECKBOX(3), DATE(4),RADIO(5),FILE(6);

	private final int value;

	QuestionType(final int val) {
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
	public static QuestionType getValue(int value) {
		switch (value) {
		case 0:
			return INPUT;
		case 1:
			return TEXT_AREA;
		case 2:
			return SELECT_LIST;
		case 3:
			return CHECKBOX;
		case 4:
			return DATE;
		case 5:
			return RADIO;
		case 6:
			return FILE;
		}
		return INPUT;
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
