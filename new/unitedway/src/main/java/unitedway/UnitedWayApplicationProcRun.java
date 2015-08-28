package unitedway;

import org.springframework.boot.ExitCodeGenerator;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;

@SpringBootApplication
public class UnitedWayApplicationProcRun {

    private static ConfigurableApplicationContext applicationContext = null;

    public static void main(String[] args) {
        String mode = args != null && args.length > 0 ? args[0] : null;
        if (applicationContext != null && args != null && "stop".equals(mode)) {
            System.exit(SpringApplication.exit(applicationContext, new ExitCodeGenerator() {
                @Override
                public int getExitCode() {
                    return 0;
                }
            }));
        }
        else
        {
            try {
                SpringApplication app = new SpringApplication(UnitedWayApplicationProcRun.class);
                applicationContext = app.run(args);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }
}
