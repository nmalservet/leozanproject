package com.leozanproject.config;

import java.io.IOException;

import jakarta.servlet.DispatcherType;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
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
@Configuration
@EnableWebSecurity
public class SecurityConfiguration {

	@Autowired
	private InternalUserDetailsService userDetailsService;

	@Autowired
	public UserService userService;

	Logger logger = LoggerFactory.getLogger(SecurityConfiguration.class);

	@Value("${authentication.local}")
	Boolean isAuthenticationLocalRequired;

	@Value("${leozan.mode.dev}")
	Boolean isDevMode;

	@Value("${leozan.url.client}")
	String urlDevClient;

	@Bean
	public BCryptPasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

	/**
	 * builds the AuthenticationManager the same way the old
	 * configure(AuthenticationManagerBuilder) override did: only wire the local
	 * userDetailsService/passwordEncoder when authentication.local is true.
	 */
	@Bean
	public AuthenticationManager authenticationManager(HttpSecurity http, BCryptPasswordEncoder passwordEncoder)
			throws Exception {
		AuthenticationManagerBuilder authBuilder = http.getSharedObject(AuthenticationManagerBuilder.class);
		if (isAuthenticationLocalRequired.booleanValue() == true) {
			authBuilder.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder);
		} else {
			logger.warn("start auth configuration with another tool: Not yet implemented");
		}
		return authBuilder.build();
	}

	/**
	 * spring-boot with spring-security we need to define a bean to manage cors
	 */
	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http, AuthenticationManager authenticationManager)
			throws Exception {
		http.cors(Customizer.withDefaults())
				.csrf(AbstractHttpConfigurer::disable)
				.authorizeHttpRequests(auth -> auth
						// authorizeHttpRequests (unlike the old authorizeRequests) re-checks internal
						// FORWARD/ERROR dispatches by default, which would otherwise 403 Boot's
						// welcome-page forward to index.html and the default error page.
						.dispatcherTypeMatchers(DispatcherType.FORWARD, DispatcherType.ERROR).permitAll()
						.requestMatchers("/", "/login", "/version/", "/actuator/**", "/js/**", "/css/**", "/img/**",
								"/static/js/**", "/static/css/**", "/static/media/**", "/static/fonts/**",
								"/api/v1/export/**", "/fonts/**")
						.permitAll()
						.anyRequest().authenticated())
				.addFilter(new AuthenticationFilter(authenticationManager, userService, failureHandler()))
				.addFilter(new AuthorizationFilter(authenticationManager));
		return http.build();
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

}
