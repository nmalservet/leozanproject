package com.leozanproject.config.security;

import java.io.IOException;
import java.util.ArrayList;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

/**
 * Authorization Filter called after the authentication filter.
 * 
 * @author nicolas malservet
 *
 */
public class AuthorizationFilter extends BasicAuthenticationFilter {

	Logger logger = LoggerFactory.getLogger(AuthorizationFilter.class);
	
	
	@Value("security.key")
	public String KEY ;

	public AuthorizationFilter(AuthenticationManager authManager) {
		super(authManager);
	}

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
			throws IOException, ServletException {
		String header = request.getHeader(SecurityConstants.HEADER_NAME);
		if (header == null) {
			chain.doFilter(request, response);
			return;
		}

		UsernamePasswordAuthenticationToken authentication = authenticate(request);
		if (authentication != null) {
			SecurityContextHolder.getContext().setAuthentication(authentication);
			chain.doFilter(request, response);
		} else {
			// we will not process the request
			response.setStatus(HttpServletResponse.SC_FORBIDDEN);
		}
	}

	/**
	 * parse the claims provided by the token
	 * 
	 * @param request
	 * @return
	 */
	@SuppressWarnings("deprecation")
	private UsernamePasswordAuthenticationToken authenticate(HttpServletRequest request) {
		String token = request.getHeader(SecurityConstants.HEADER_NAME);
		if (token != null) {
			Claims claims = null;
			try {
				claims = Jwts.parser().setSigningKey(Keys.hmacShaKeyFor(KEY.getBytes()))
						.parseClaimsJws(token).getBody();
			} catch (Exception e) {
				logger.error("issue during jwt parsing" + e.getMessage());
			}
			if (claims != null) {
				// check that the session is always active
				String username = UserSessionsSingleton.sessions.get(token);
				if (username == null) {
					// we don't have a session anymore
					logger.info("no token defined for the session, we should reauthenticate");
					return null;
				} else {
					return new UsernamePasswordAuthenticationToken(claims, null, new ArrayList<>());
				}
			} else {
				return null;
			}

		}
		return null;
	}
}
