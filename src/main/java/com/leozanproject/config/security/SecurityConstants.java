package com.leozanproject.config.security;

/**
 * Common security constants.
 * @author nicolas malservet
 *
 */
public class SecurityConstants {

	/**
	 * FIXME : move this key before production deployment
	 */
	public static final String KEY = "q3t9w9z$C&F)J@NcQfTjWnZr4u7x!A%D*G-KaPdSgUkXp2s5v8y/A?E(H+MbQeTh";
	/**
	 * name of the header added to the JWT
	 */
	public static final String HEADER_NAME = "Authorization";
	/**
	 * validity period for the token= 12h in millis
	 */
	public static final long EXPIRATION_TIME = 1000L * 60 * 60 * 12;

}
