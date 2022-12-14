package thesis.server.traveling.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import thesis.server.traveling.constant.SystemConst;

@Configuration
@EnableWebMvc
public class ResourceConfig implements WebMvcConfigurer {
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        String path = "file:///" + SystemConst.UPLOAD_DIRECTORY;
        registry.addResourceHandler("/content/**").addResourceLocations(path);
    }
}
