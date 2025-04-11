package com.leozanproject.service;

import static java.util.Collections.emptyList;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.leozanproject.repository.UserRepository;

/**
 * class to override methods of UserDetailsService and expose load user buy
 * username. It will compare the credentials to authenticate the user and
 * generate a user session.
 * 
 * @author malservet
 *
 */
@Service
public class InternalUserDetailsService implements UserDetailsService {

	@Autowired
	private UserRepository userRepository;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		Optional<com.leozanproject.model.User> opt = userRepository.findByUsername(username);
		if (!opt.isPresent()) {
			throw new UsernameNotFoundException(username);
		}
		return new User(opt.get().getUsername(), opt.get().getPassword(), emptyList());
	}

}
