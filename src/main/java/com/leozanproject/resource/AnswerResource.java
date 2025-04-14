package com.leozanproject.resource;

import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.Api;

@Api(value = "Application")
@RestController
@Validated
@RequestMapping("/api/v1/answers")
public class AnswerResource {

}
