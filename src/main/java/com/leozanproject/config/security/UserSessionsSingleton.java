package com.leozanproject.config.security;

import java.util.HashMap;
import java.util.Map;

/**
 * class to store a static object used to map username-sessions. This will be
 * used to make a basic cahce and avoid to check every time in db the sessions
 * opened.
 * 
 * @author nicolas malservet
 *
 */
public class UserSessionsSingleton {

	/**
	 * key = token, value = username
	 */
	public static Map<String, String> sessions = new HashMap<>();

}
