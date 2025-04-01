package com.leozanproject.config;

import java.io.IOException;

import javax.annotation.PostConstruct;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.leozanproject.config.security.AuthenticationFilter;
import com.leozanproject.config.security.AuthorizationFilter;
import com.leozanproject.service.InternalUserDetailsService;
import com.leozanproject.service.UserService;

/**
 * 
 * @author nicolas malservet
 *
 */
@EnableWebSecurity
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {

	@Autowired
	private InternalUserDetailsService userDetailsService;

	@Autowired
	public UserService userService;

	/**
	 * this attribute must be injected via constructor
	 */
	private BCryptPasswordEncoder bCryptPasswordEncoder;

	Logger logger = LoggerFactory.getLogger(SecurityConfiguration.class);

	@Value("${authentication.local}")
	Boolean isAuthenticationLocalRequired;

	@Value("${leozan.mode.dev}")
	Boolean isDevMode;

	@Value("${leozan.url.client}")
	String urlDevClient;

	@PostConstruct
	@Bean
	public BCryptPasswordEncoder passwordEncoder() {
		bCryptPasswordEncoder = new BCryptPasswordEncoder();
		return bCryptPasswordEncoder;
	}

	/**
	 * spring-boot with spring-security we need to define a bean to manage cors
	 */
	@Override
	protected void configure(HttpSecurity http) throws Exception {
		//
		http.cors().and().csrf().disable().authorizeRequests().antMatchers("/").permitAll().antMatchers("/login")
				.permitAll().antMatchers("/version/").permitAll().antMatchers("/actuator/**").permitAll()
				.antMatchers("/js/**").permitAll().antMatchers("/css/**").permitAll().antMatchers("/img/**").permitAll()
				.antMatchers("/static/js/**").permitAll().antMatchers("/static/css/**").permitAll()
				.antMatchers("/static/media/**").permitAll().antMatchers("/static/fonts/**").permitAll()
				.antMatchers("/api/v1/export/**").permitAll().antMatchers("/fonts/**").permitAll().anyRequest()
				.authenticated().and()
				.addFilter(new AuthenticationFilter(authenticationManager(), userService, failureHandler()))
				.addFilter(new AuthorizationFilter(authenticationManager()));
	}

	/**
	 * faile handler for the bad authentication
	 * 
	 * @return
	 */
	private static AuthenticationFailureHandler failureHandler() {
		return new AuthenticationFailureHandler() {
			@Override
			public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response,
					org.springframework.security.core.AuthenticationException exception)
					throws IOException, ServletException {
				response.getWriter().append("Authentication failure");
				response.setStatus(401);

			}
		};
	}

	@Bean
	public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurer() {

			// for dev mode cors
			@Override
			public void addCorsMappings(CorsRegistry registry) {

				if (isDevMode) {
					logger.info("-- dev mode activated");
					registry.addMapping("/**")
							.allowedMethods("HEAD", "GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS")
							.allowedOrigins(urlDevClient);

				} else {
					registry.addMapping("/**")
							.allowedMethods("HEAD", "GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS")
							.allowedOrigins("*")
							.allowedHeaders("Content-Type", "X-Requested-With", "accept", "Origin",
									"Access-Control-Request-Method", "Access-Control-Request-Headers")
							.exposedHeaders("Access-Control-Allow-Origin", "Access-Control-Allow-Credentials")
							.allowCredentials(true).maxAge(3600);
				}
			}
		};
	}

	@Override
	public void configure(AuthenticationManagerBuilder auth) throws Exception {
		if (isAuthenticationLocalRequired.booleanValue() == true) {
			auth.userDetailsService(userDetailsService).passwordEncoder(bCryptPasswordEncoder);
		} else {
			logger.warn("start auth configuration with another tool: Not yet implemented");
		}
	}

}
