package gov.miamidade.content;

import gov.miamidade.JsonEntityProvider;

import javax.inject.Named;
import javax.ws.rs.ApplicationPath;

import org.glassfish.jersey.server.ResourceConfig;
import org.springframework.boot.ExitCodeGenerator;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;

@SpringBootApplication
@EnableAutoConfiguration
public class Application {
	private static ConfigurableApplicationContext applicationContext = null;

	@Named
	@ApplicationPath("/content")
	public static class JerseyConfig extends ResourceConfig {

		public JerseyConfig() {
			this.register(JsonEntityProvider.class);
			this.register(PressReleaseEndpoint.class);
			this.register(BlogEndpoint.class);
			// TODO Register more endpoints
		}
	}

	public static void main(String[] args) {
		String mode = args != null && args.length > 0 ? args[0] : null;
		if (applicationContext != null && args != null && "stop".equals(mode)) {
			System.exit(SpringApplication.exit(applicationContext,
					new ExitCodeGenerator() {
						@Override
						public int getExitCode() {
							return 0;
						}
					}));
		} else {
			try {
				SpringApplication app = new SpringApplication(Application.class);
				applicationContext = app.run(args);
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
	}
}
