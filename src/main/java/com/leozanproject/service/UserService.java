package com.leozanproject.service;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import javax.annotation.PostConstruct;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.leozanproject.exceptions.InvalidParameterException;
import com.leozanproject.exceptions.MissingParameterException;
import com.leozanproject.mapper.UserAccountMapper;
import com.leozanproject.model.User;
import com.leozanproject.model.UserSession;
import com.leozanproject.repository.UserRepository;
import com.leozanproject.repository.UserSessionRepository;
import com.leozanproject.resource.domain.UserAccountDTO;
import com.leozanproject.tools.EncryptionTool;

/**
 * User service to manage authentication and users.
 * 
 * @author nicolas
 *
 */
@Component
public class UserService {

	@Autowired
	UserSessionRepository repository;

	@Value("${authentication.local}")
	boolean isAuthenticationLocal;

	@Autowired
	UserRepository uRepository;

	@Autowired
	UserAccountMapper mapper;

	Logger logger = LoggerFactory.getLogger(UserService.class);

	@Autowired
	EncryptionTool encryptionTool;

//	@PostConstruct
//	public void init() {
//		if (isAuthenticationLocal) {
//			Optional<User> opt = uRepository.findByUsername("admin");
//			if (!opt.isPresent()) {
//				User user = new User();
//				user.setName("admin");
//				user.setFirstName("john");
//				user.setUsername("admin");
//				user.setPassword(encryptionTool.crypt("admin"));
//				uRepository.save(user);
//			}
//		}
//	}

	/**
	 * authenticate. Not yet plugged during dev mode.
	 * 
	 * @param username
	 * @param password
	 * @return
	 */
	public boolean authenticate(String username, String password) {
		if (isAuthenticationLocal)
			return true;
		return true;
	}

	public List<UserAccountDTO> list() {
		return mapper.convert(uRepository.findAll());
	}

	/**
	 * get a map for cases to fetch directly the user by id
	 * 
	 * @return
	 */
	public Map<Integer, UserAccountDTO> map() {
		Map<Integer, UserAccountDTO> res = new HashMap<Integer, UserAccountDTO>();
		List<User> users = uRepository.findAll();
		users.forEach(user -> {
			res.put(user.getId(), mapper.toDTO(user));
		});
		return res;
	}

	/**
	 * actions done when a session is opened
	 * 
	 * @return true if the session is opened and stored otheriwse false
	 * @throws InvalidParameterException
	 */
	public boolean openSession(String username, String token) {
		if (username == null) {
			logger.error("username is null");
			return false;
		}
		if (isAuthenticationLocal) {
			cleanSessions(username);
			saveSession(username, token);
			return true;
		} else {
			logger.debug("open session");

		}
		return false;
	}

	/**
	 * save a session into db
	 * 
	 * @param userId
	 * @param token
	 * @return
	 */
	public boolean saveSession(String userName, String token) {
		if (userName == null) {
			logger.error("user is null!");
			return false;
		}
		// find the user
		if (token == null || token.length() < 1)
			logger.error("bad token provided:" + token);
		UserSession session = new UserSession();
		Date now = new Date();
		session.setCreationDate(now);
		session.setLastActivity(now);

		session.setToken(token);
		if (isAuthenticationLocal) {
			Optional<User> opt = uRepository.findByUsername(userName);
			if (opt.isPresent()) {
				User user = opt.get();
				session.setInternalUserId(user.getId());
				session.setLogin(user.getUsername());
			} else {
				logger.error("no user for internal username" + userName);
				return false;
			}
		} else {
			session.setLogin(userName);
		}
		repository.save(session);
		return true;
	}

	/**
	 * update the token after session opened to keep the token provided to user
	 * 
	 * @param username
	 * @param token
	 */
	public void updateSession(String username, String token) {
		UserSession session = repository.findByLogin(username);
		if (session != null) {
			session.setToken(token);
			repository.save(session);
		}

	}

	/**
	 * delete all the previsous sessions
	 * 
	 * @param username
	 * @return
	 */
	public boolean cleanSessions(String username) {
		repository.deleteByLogin(username);
		return true;
	}

	/**
	 * return the user by the token. Null if not retrieved
	 * 
	 * @param token
	 * @return
	 */
	public UserAccountDTO getUserbyToken(String token) {
		UserSession session = repository.findByToken(token);
		if (session != null) {
			if (session.getLogin() == null) {
				logger.error("login stored for the session is null");
				return null;
			}
			return getUserAccount(session.getLogin());
		} else
			logger.info("No session retrieved");
		return null;
	}

	/**
	 * close the session by token
	 * 
	 * @param token
	 */
	public void closeSession(String token) {
		UserSession session = repository.findByToken(token);
		if (session != null) {
			repository.delete(session);
		}
	}

	/**
	 * save with not skipping the password
	 * 
	 * @param dto
	 * @return
	 * @throws InvalidParameterException
	 */
	public int save(UserAccountDTO dto) throws InvalidParameterException {
		return save(dto, false);
	}

	/**
	 * save or update the user account
	 * 
	 * @param dto
	 * @boolean skipPassord to skip the password rule, from ldap creation
	 * @throws InvalidParameterException
	 * @return the id
	 */
	public int save(UserAccountDTO dto, boolean skipPassword) throws InvalidParameterException {
		if (dto == null)
			throw new InvalidParameterException("dto empty");

		// TODO check username and more
		String username = dto.getUsername();

		// case update existing with id
		Optional<User> opt = uRepository.findById(dto.getId());
		if (opt.isPresent()) {
			User user = opt.get();
			user.setEmail(dto.getEmail());
			user.setUsername(dto.getUsername());
			user.setName(dto.getName());
			user.setFirstName(dto.getFirstName());
			user.setDisabled(dto.isDisabled());
			user.setRole(dto.getRole());
			// we update th epassword only if a new is set
			if (!skipPassword)
				if (dto.getPassword() != null && !dto.getPassword().isEmpty())
					user.setPassword(encryptionTool.crypt(dto.getPassword()));
			uRepository.save(user);
			return user.getId();
		} else {
			// TODO check the username is unique
			Optional<User> opt2 = uRepository.findByUsername(username);
			if (!opt2.isPresent()) {
				throw new InvalidParameterException("username");
			}
			if (!skipPassword)
				if (dto.getPassword() == null || dto.getPassword().isEmpty())
					throw new InvalidParameterException("password");
			User entity = new User();
			entity.setUsername(dto.getUsername());
			entity.setEmail(dto.getEmail());
			entity.setFirstName(dto.getFirstName());
			entity.setName(dto.getName());
			entity.setRole(dto.getRole());
			if (!skipPassword)
				entity.setPassword(encryptionTool.crypt(dto.getPassword()));
			// entity.setRole(dto.getRole());
			uRepository.save(entity);
			return entity.getId();
		}
	}

	/**
	 * null if not found
	 * 
	 * @param username
	 * @return
	 */
	public UserAccountDTO getUserAccount(String username) {
		Optional<User> opt = uRepository.findByUsername(username);
		if (opt.isPresent())
			return mapper.toDTO(opt.get());
		else
			logger.error("no user account retrieved for username:" + username);
		return null;
	}

	public UserAccountDTO getUser(int userId) {
		Optional<User> entity = uRepository.findById(userId);
		if (entity.isPresent())
			return mapper.toDTO(entity.get());
		else
			logger.error("no user account retrieved for userId:" + userId);
		return null;

	}

	/**
	 * disable a user.
	 * 
	 */
	public void disable(int id) {
		Optional<User> opt = uRepository.findById(id);
		if (opt.isPresent()) {
			User u = opt.get();
			u.setDisabled(true);
			uRepository.save(u);
		}
	}

	/**
	 * delete a user.
	 * 
	 * @param id
	 * @return
	 * @throws MissingParameterException
	 */
	public boolean delete(int id) throws MissingParameterException {
		if (id <= 0)
			throw new MissingParameterException("id");

		// Not yet implemented
		return false;
	}
}
