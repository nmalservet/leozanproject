package com.leozanproject.config;

import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

/**
 * we enable the config conditionnaly
 * 
 * @author nicolas malservet
 *
 */
@Configuration
@EnableSwagger2
@ConfigurationProperties("app.api")
@ConditionalOnProperty(name = "app.api.swagger.enable", havingValue = "true", matchIfMissing = false)

public class SwaggerConfig {

	@Bean
	public Docket api() {
		return new Docket(DocumentationType.SWAGGER_2).select()
				.apis(RequestHandlerSelectors.basePackage("com.leozan.resource"))
				.paths(PathSelectors.regex("/api.*")).build().apiInfo(apiEndPointsInfo());
	}

	private static ApiInfo apiEndPointsInfo() {

		return new ApiInfoBuilder().title("LEOZAN REST API").description("LEOZAN REST API")
				.license("copyright leozan").licenseUrl("http://editionsleozan.fr").version("1.0.0").build();

	}

}
