package unitedway;

/**
 * Created by david492000 on 8/25/15.
 */
import org.springframework.boot.loader.JarLauncher;
import org.springframework.boot.loader.jar.JarFile;

/**
 * Created by Rajiv on 3/16/2015. Bootstrap implements the start, stop and
 * launch methods and calls the main method of SelfServiceApplication. Apache
 * Procrun requires a custom class loader for Spring boot 1.2 applications.
 */
public class Bootstrap extends JarLauncher {
    private static ClassLoader classLoader = null;
    private static Bootstrap bootstrap = null;

    protected void launch(String[] args, String mainClass,
                          ClassLoader classLoader, boolean wait) throws Exception {
        Runnable runner = createMainMethodRunner(mainClass, args, classLoader);
        Thread runnerThread = new Thread(runner);
        runnerThread.setContextClassLoader(classLoader);
        runnerThread.setName(Thread.currentThread().getName());
        runnerThread.start();
        if (wait == true) {
            runnerThread.join();
        }
    }

    public static void start(String[] args) {
        bootstrap = new Bootstrap();
        try {
            JarFile.registerUrlProtocolHandler();
            classLoader = bootstrap.createClassLoader(bootstrap
                    .getClassPathArchives());
            bootstrap.launch(args, bootstrap.getMainClass(), classLoader, true);
        } catch (Exception ex) {
            ex.printStackTrace();
            System.exit(1);
        }
    }

    public static void stop(String[] args) {
        try {
            if (bootstrap != null) {
                bootstrap.launch(args, bootstrap.getMainClass(), classLoader,
                        true);
                bootstrap = null;
                classLoader = null;
            }
        } catch (Exception ex) {
            ex.printStackTrace();
            System.exit(1);
        }
    }

    public static void main(String[] args) {
        String mode = args != null && args.length > 0 ? args[0] : null;
        if ("start".equals(mode)) {
            Bootstrap.start(args);
        } else if ("stop".equals(mode)) {
            Bootstrap.stop(args);
        }
    }
}