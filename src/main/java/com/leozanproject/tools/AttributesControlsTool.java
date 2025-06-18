package com.leozanproject.tools;

import com.leozanproject.exceptions.MissingParameterException;

/**
 * class to centralize check attributes accross services and ressources
 * FixMe : redundant with ParametersChecker?
 * @author nicolas malservet
 *
 */
public class AttributesControlsTool {
	
	public static boolean isEmpty(String name, String value) throws MissingParameterException {
		if(value==null) 
			throw new MissingParameterException(name);
		if(value.length()<1) 
			throw new MissingParameterException(name);
		return false;
	}
	
	public static boolean isSet(String name, Integer value) throws MissingParameterException {
		if(value==null) 
			throw new MissingParameterException(name);
		return false;
	}

}
