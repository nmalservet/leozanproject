package com.leozanproject.config.security;

/**
 * Common security constants.
 * @author nicolas malservet
 *
 */
public class SecurityConstants {


	/**
	 * name of the header added to the JWT
	 */
	public static final String HEADER_NAME = "Authorization";
	/**
	 * validity period for the token= 12h in millis
	 */
	public static final long EXPIRATION_TIME = 1000L * 60 * 60 * 12;

}
