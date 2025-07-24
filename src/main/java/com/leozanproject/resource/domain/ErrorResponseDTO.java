package com.leozanproject.resource.domain;

import org.springframework.http.HttpStatus;

/**
 * basic response DTO to provide an error code and a message.
 * 
 * @author nicolas
 *
 */
public class ErrorResponseDTO {

	/**
	 * http status code returned.
	 */
	HttpStatus status;
	/**
	 * error code
	 */
	String code;

	/**
	 * message into the target lang
	 */
	String message;

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public HttpStatus getStatus() {
		return status;
	}

	public void setStatus(HttpStatus status) {
		this.status = status;
	}

	/**
	 * error response to store the message and the code.
	 * 
	 * @param status
	 * @param code
	 * @param message
	 */
	public ErrorResponseDTO(HttpStatus status, String code, String message) {
		super();
		this.status = status;
		this.code = code;
		this.message = message;
	}

}
