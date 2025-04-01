package com.leozanproject.config.security;

import static java.util.Collections.emptyList;

import java.io.IOException;
import java.security.Key;
import java.util.ArrayList;
import java.util.Date;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AccountExpiredException;
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.common.net.HttpHeaders;
import com.leozanproject.service.UserService;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

/**
 * filter to authenticate the user, and generate a token. NB this filter is
 * injected via new into the SecurityConfig It's not a bean , it's instanciated
 * naturally
 * 
 * @author nicolas malservet
 *
 *
 */
public class AuthenticationFilter extends UsernamePasswordAuthenticationFilter {

	public AuthenticationManager authenticationManager;

	// service to save the session
	public UserService userService;

	@Value("${authentication.local}")
	boolean isAuthenticationLocalRequired;
	

	public AuthenticationFilter(AuthenticationManager authenticationManager, UserService userService,
			AuthenticationFailureHandler failureHandler) {
		this.authenticationManager = authenticationManager;
		this.userService = userService;
		this.setAuthenticationFailureHandler(failureHandler);
	}

	@Override
	public Authentication attemptAuthentication(HttpServletRequest req, HttpServletResponse res)
			throws AuthenticationException {
		try {
			com.leozanproject.model.User applicationUser = new ObjectMapper().readValue(req.getInputStream(),
					com.leozanproject.model.User.class);
			if (applicationUser == null)
				throw new RuntimeException("No user into the request");
			if (applicationUser.getUsername() == null)
				throw new RuntimeException("No username into the request");
			ArrayList roles = new ArrayList<>();
			roles.add("standard");
			
			if (isAuthenticationLocalRequired) {
				return authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
						applicationUser.getUsername(), applicationUser.getPassword(), roles));
			} else {
				// authentication against ad
				// NB we can't use set authenticated, the list provided+ the constructor build
				// an implicit authenticated object
				UsernamePasswordAuthenticationToken authentication = null;
				//TODO apply a more complex rule to verifiy that we have something
				if(applicationUser.getUsername().isEmpty()||applicationUser.getPassword().isEmpty()) {
					throw new RuntimeException("No username or password");
				}else
				if (userService.authenticate(applicationUser.getUsername(), applicationUser.getPassword())) {
					logger.info("user authenticated:" + applicationUser.getUsername());
					UserDetails principal = new User(applicationUser.getUsername(), "", emptyList());
					authentication = new UsernamePasswordAuthenticationToken(principal, applicationUser.getPassword(),
							new ArrayList<>());
					// we fetch the user account
					String token = req.getHeader(SecurityConstants.HEADER_NAME);
					if (token == null) {
						logger.warn("NO Header "+SecurityConstants.HEADER_NAME+",token is null for user:" + applicationUser.getUsername());
						throw new AccountExpiredException("the token is null");
					}
					if (!userService.openSession(applicationUser.getUsername(), token)) {
						logger.error(
								"the session can't be opened for:" + applicationUser.getUsername() + ",token:" + token);
						throw new AuthenticationCredentialsNotFoundException("The session can't be opened");
					}

				} else {
					logger.error("user is not authenticated!!");
					// throw new RuntimeException();
					throw new BadCredentialsException("Bad credentials");
				}
				// if we have a redirect we set it into the referer
				String currentUrl = (String) req.getSession().getAttribute("referer");
				if (currentUrl != null)
					res.setHeader(HttpHeaders.REFERER, currentUrl);
				return authentication;
			}
		} catch (IOException e) {
			throw new RuntimeException(e);
		}
	}

	@Override
	protected void successfulAuthentication(HttpServletRequest req, HttpServletResponse res, FilterChain chain,
			Authentication auth) throws IOException, ServletException {
		Date exp = new Date(System.currentTimeMillis() + SecurityConstants.EXPIRATION_TIME);
		Key key = Keys.hmacShaKeyFor(SecurityConstants.KEY.getBytes());
		Claims claims = Jwts.claims().setSubject(((User) auth.getPrincipal()).getUsername());
		String token = Jwts.builder().setClaims(claims).signWith(key, SignatureAlgorithm.HS512).setExpiration(exp)
				.compact();
		res.addHeader("token", token);
		res.addHeader("Access-Control-Expose-Headers", "token");

		UserSessionsSingleton.sessions.put(token, ((User) auth.getPrincipal()).getUsername());
		// we put the token after a succesfull authentication into the session
		userService.saveSession(((User) auth.getPrincipal()).getUsername(), token);

	}

}
