package com.leozanproject.tools;

import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

/**
 * Common tool to use encryption.
 * @author nicolas malservet
 *
 */
@Component
public class EncryptionTool {
	
	@Bean
	public PasswordEncoder encoder() {
	    return new BCryptPasswordEncoder();
	}
	
	/**
	 * crypt the text with md5
	 * @param text
	 * @return
	 */
	public String crypt(String text) {
		return encoder().encode(text);
	}
	
	/**
	 * true if the provided non encrypted pasword match with the encrypted value in db.
	 * @param rawPassword
	 * @param encodedPassword
	 * @return
	 */
	public boolean matches(String rawPassword,String encodedPassword) {
		return encoder().matches(rawPassword, encodedPassword);
	}

}
