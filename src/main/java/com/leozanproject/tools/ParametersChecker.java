package com.leozanproject.tools;

import java.util.Date;

import com.leozanproject.exceptions.InvalidParameterException;

/**
 * Helper class to check parameters.
 * @author nicolas malservet
 */
public class ParametersChecker {
	
	/**
	 * check if the parameter is not empty.
	 * If yes, throw an exception.
	 * @param name
	 * @param value
	 * @return
	 * @throws InvalidParameterException 
	 */
	public static boolean isNotEmpty(String name, String value) throws InvalidParameterException {
		if(value==null||value.isEmpty())
			throw new InvalidParameterException(name);
		return true;
	}

	public static boolean isValidDate(String name, Date date) throws InvalidParameterException {
		if(date==null)
			throw new InvalidParameterException(name);
		return true;
	}
	
	public static boolean isValidBoolean(String name, Boolean bool) throws InvalidParameterException {
		if(bool==null)
			throw new InvalidParameterException(name);
		return true;
	}
	
}
