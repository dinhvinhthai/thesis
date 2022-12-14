package thesis.server.traveling;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.http.CacheControl;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;

import java.util.concurrent.TimeUnit;

@SpringBootApplication
public class TravelingApplication {

	public static void main(String[] args) {
		SpringApplication.run(TravelingApplication.class, args);
	}

}


