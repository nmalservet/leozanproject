package com.leozanproject.resource;

import java.util.List;
import java.util.Map;

import javax.annotation.PostConstruct;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.leozanproject.config.security.UserSessionsSingleton;
import com.leozanproject.exceptions.InvalidParameterException;
import com.leozanproject.exceptions.MissingParameterException;
import com.leozanproject.model.User;
import com.leozanproject.repository.UserRepository;
import com.leozanproject.resource.domain.UserAccountDTO;
import com.leozanproject.service.UserService;

import io.swagger.annotations.ApiOperation;

/**
 * Rest controller to expose API to manage internal users<br>
 * TODO We will deal later with an OAUTH2 authentication.
 * @author nicolas malservet
 *
 */
@RestController
@Validated
@RequestMapping("/api/v1/users")
public class UserResource {

	@Autowired
	public UserService service;

	@Value("${authentication.local}")
	Boolean isAuthenticationLocalRequired;

	private UserRepository userRepository;
	private BCryptPasswordEncoder bCryptPasswordEncoder;

	Logger logger = LoggerFactory.getLogger(UserResource.class);

	public UserResource(UserRepository userRepository, BCryptPasswordEncoder bCryptPasswordEncoder) {
		this.userRepository = userRepository;
		this.bCryptPasswordEncoder = bCryptPasswordEncoder;
	}

	/**
	 * TEMP post construct to add a user during dev if not exists the admin by
	 * default is ad00
	 * 
	 */

	@PostConstruct
	public void initAdminUser() {
		if (isAuthenticationLocalRequired == Boolean.TRUE && !userRepository.findById(1).isPresent()) {
			User user = new User();
			user.setUsername("ad00");
			user.setPassword("administrator");
			user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
			userRepository.save(user);
		}
	}

	@GetMapping(path = "", produces = "application/json")
	public List<UserAccountDTO> list() throws Exception {
		return service.list();
	}

	@PostMapping(path = "", produces = "application/json")
	public int create(@RequestBody UserAccountDTO user) throws MissingParameterException, InvalidParameterException {
		return service.save(user);
	}

	@GetMapping(path = "/{id}", produces = "application/json")
	public UserAccountDTO get(@PathVariable int id) {
		return service.getUser(id);
	}

	@DeleteMapping(path = "/{id}", produces = "application/json")
	public boolean delete(@PathVariable int id) throws MissingParameterException, InvalidParameterException {
		return service.delete(id);
	}

	/**
	 * PUT verb to modifiy an object.
	 * 
	 * @param id
	 * @param user
	 * @return
	 * @throws MissingParameterException
	 * @throws InvalidParameterException
	 */
	@PutMapping(path = "/{id}", produces = "application/json")
	public int update(@PathVariable int id, @RequestBody UserAccountDTO user)
			throws MissingParameterException, InvalidParameterException {
		if (id != user.getId())
			throw new InvalidParameterException(" User id is not compliant");
		return service.save(user);
	}

	/**
	 * get the user account info according to the user token
	 * 
	 * @return
	 */
	@ApiOperation(value = "get the user account info", response = UserAccountDTO.class)
	@GetMapping(path = "/getAccount", produces = "application/json")
	public UserAccountDTO getAccount(@RequestHeader Map<String, String> headers) {
		UserAccountDTO result = null;
		String token = headers.get("authorization");
		// get the current token used and find the user associated
		if (token != null) {
			String username = UserSessionsSingleton.sessions.get(token);
			if (username == null) {
				logger.error("No active session for the token:" + token);
			} else {
				result = service.getUserbyToken(token);
			}
		} else {
			logger.error("token is empty");
		}
		return result;
	}

	/**
	 * get the user id from the headers. Throw exception if not possible
	 * 
	 * @param headers
	 * @return
	 * @throws InvalidParameterException
	 */
	private int getUserId(@RequestHeader Map<String, String> headers) throws InvalidParameterException {
		String token = headers.get("authorization");
		// get the current token used and find the user associated
		if (token != null) {
			String username = UserSessionsSingleton.sessions.get(token);
			if (username == null) {
				throw new InvalidParameterException("No active session");
			} else {
				UserAccountDTO user = service.getUserbyToken(token);
				return user.getId();
			}
		} else {
			throw new InvalidParameterException("No token");
		}
	}

	/**
	 * apply logout and remove the token and close the session
	 * 
	 * @return
	 */
	@ApiOperation(value = "logout the user", response = Boolean.class)
	@GetMapping(path = "/logout", produces = "application/json")
	public Boolean logout(@RequestHeader Map<String, String> headers) {
		String token = headers.get("authorization");
		UserSessionsSingleton.sessions.remove(token);
		service.closeSession(token);
		Boolean result = true;
		return result;
	}

}
