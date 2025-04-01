package com.leozanproject.exceptions;

/**
 * Exception thrown when a unicity constraint is broken.
 * @author nicolas malservet
 *
 */
public class UnicityConstraintParameterException extends Exception {

	private static final long serialVersionUID = 1L;
	/**
	 * 
	 */
	String parameter;


	public UnicityConstraintParameterException(String parameter) {
		this.parameter = parameter;
	}

	public String getParameter() {
		return parameter;
	}

	public void setParameter(String parameter) {
		this.parameter = parameter;
	}

}
