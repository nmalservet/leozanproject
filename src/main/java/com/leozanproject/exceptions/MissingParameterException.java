package com.leozanproject.exceptions;

/**
 * Exception thrown when we have a missing parameterinto a request.
 * @author nicolas malservet
 *
 */
public class MissingParameterException extends Exception {

	private static final long serialVersionUID = 1L;
	String parameter;

	public MissingParameterException(String parameter) {
		this.parameter = parameter;
	}

	public String getParameter() {
		return parameter;
	}

	public void setParameter(String parameter) {
		this.parameter = parameter;
	}

}
