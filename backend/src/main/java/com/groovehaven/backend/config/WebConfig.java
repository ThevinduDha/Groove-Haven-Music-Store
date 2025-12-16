package com.groovehaven.backend.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // Map "http://localhost:8080/music/..." to "C:/GrooveHaven_Music/"
        registry.addResourceHandler("/music/**")
                .addResourceLocations("file:///C:/Users/DELL/Desktop/groove-haven/GrooveHaven_Music/");
    }
}