package com.leozanproject.resource;

import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.dao.PermissionDeniedDataAccessException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.multipart.MaxUploadSizeExceededException;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import com.leozanproject.exceptions.BusinessRuleValidationException;
import com.leozanproject.exceptions.InvalidParameterException;
import com.leozanproject.exceptions.MissingParameterException;
import com.leozanproject.exceptions.UnicityConstraintParameterException;
import com.leozanproject.resource.domain.ErrorResponseDTO;

@Order(Ordered.HIGHEST_PRECEDENCE)
@ControllerAdvice
public class RestExceptionHandler extends ResponseEntityExceptionHandler {

	@Override
	protected ResponseEntity<Object> handleHttpMessageNotReadable(HttpMessageNotReadableException ex,
			HttpHeaders headers, HttpStatus status, WebRequest request) {
		String error = "Malformed JSON request";
		return buildResponseEntity(new ErrorResponseDTO(HttpStatus.BAD_REQUEST, error, ""));
	}

	private static ResponseEntity<Object> buildResponseEntity(ErrorResponseDTO dto) {
		return new ResponseEntity<>(dto, dto.getStatus());
	}

	/**
	 * if permission denied on data
	 * 
	 * @param ex
	 * @return
	 */
	@ExceptionHandler(PermissionDeniedDataAccessException.class)
	protected ResponseEntity<Object> handlePermissionDeniedDataAccessException(PermissionDeniedDataAccessException ex) {
		ErrorResponseDTO apiError = new ErrorResponseDTO(HttpStatus.FORBIDDEN, "1", "2");
		apiError.setMessage("Permission denied");
		return buildResponseEntity(apiError);
	}

	// TODO get the value by parameter
	/**
	 * payload too large.
	 * 
	 * @param ex
	 * @return
	 */
	@ExceptionHandler(MaxUploadSizeExceededException.class)
	protected ResponseEntity<Object> handleMaximumUploadConstraint(MaxUploadSizeExceededException ex) {
		ErrorResponseDTO apiError = new ErrorResponseDTO(HttpStatus.PAYLOAD_TOO_LARGE, "1", "2");
		apiError.setMessage("File is too large, accepted < " + (int) (ex.getMaxUploadSize() / 1000) + " MB");
		return buildResponseEntity(apiError);
	}

	@ExceptionHandler(BusinessRuleValidationException.class)
	protected ResponseEntity<Object> handleBusinessConstraint(BusinessRuleValidationException ex) {
		ErrorResponseDTO apiError = new ErrorResponseDTO(HttpStatus.NOT_ACCEPTABLE, "1", "2");
		apiError.setMessage("a business rule is limiting this:" + ex.getMessage());
		return buildResponseEntity(apiError);
	}

	@ExceptionHandler(UnicityConstraintParameterException.class)
	protected ResponseEntity<Object> handleUnicityConstraint(UnicityConstraintParameterException ex) {
		ErrorResponseDTO apiError = new ErrorResponseDTO(HttpStatus.BAD_REQUEST, "1", "2");
		apiError.setMessage("Parameter value already existing for " + ex.getParameter());
		return buildResponseEntity(apiError);
	}

	@ExceptionHandler(InvalidParameterException.class)
	protected ResponseEntity<Object> handleInvalidParameter(InvalidParameterException ex) {
		ErrorResponseDTO apiError = new ErrorResponseDTO(HttpStatus.BAD_REQUEST, "1", "2");
		apiError.setMessage("Invalid parameter " + ex.getParameter());
		return buildResponseEntity(apiError);
	}

	@ExceptionHandler(MissingParameterException.class)
	protected ResponseEntity<Object> handleMissingParameter(MissingParameterException ex) {
		ErrorResponseDTO apiError = new ErrorResponseDTO(HttpStatus.BAD_REQUEST, "1", "2");
		apiError.setMessage("Missing parameter " + ex.getParameter());
		return buildResponseEntity(apiError);
	}

	@ExceptionHandler(Exception.class)
	protected ResponseEntity<Object> handleAllException(@SuppressWarnings("unused") Exception ex) {
		ErrorResponseDTO resp = new ErrorResponseDTO(HttpStatus.INTERNAL_SERVER_ERROR, "1", "2");
		resp.setMessage("Internal server error,contact the admin.");
		System.out.println(ex);
		ex.printStackTrace();
		return buildResponseEntity(resp);
	}
}
