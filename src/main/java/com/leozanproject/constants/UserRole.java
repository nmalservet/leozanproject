package com.leozanproject.constants;

/**
 * Roles are not yet defined.
 * We start with a basick skeleton of roles.
 * @author nicolas malservet
 *
 */
public enum UserRole {
	ADMINISTRATOR(2), MANAGER(1), GUEST(0);

	private final int value;

	UserRole(final int val) {
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
	public static UserRole getValue(int value) {
		switch (value) {
		case 2:
			return ADMINISTRATOR;
		case 1:
			return MANAGER;
		case 0:
			return GUEST;
		}
		return GUEST;
	}

}