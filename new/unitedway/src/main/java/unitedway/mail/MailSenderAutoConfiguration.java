package unitedway.mail;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.condition.ConditionalOnClass;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.mail.MailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;

import javax.activation.MimeType;
import javax.mail.internet.MimeMessage;
import java.util.Properties;

/**
 * Created by david492000 on 10/8/15.
 */


    @Configuration
    @ConditionalOnClass({ MimeMessage.class, MimeType.class })
    @ConditionalOnProperty(prefix = "spring.mail", value = "host")
    @ConditionalOnMissingBean(MailSender.class)
    @EnableConfigurationProperties(MailProperties.class)
    public class MailSenderAutoConfiguration {

        @Autowired
        private MailProperties properties;

        @Bean
        public JavaMailSenderImpl mailSender() {
            JavaMailSenderImpl sender = new JavaMailSenderImpl();
            sender.setHost(this.properties.getHost());
            if (this.properties.getPort() != null) {
                sender.setPort(this.properties.getPort());
            }
            sender.setUsername(this.properties.getUsername());
            sender.setPassword(this.properties.getPassword());
            sender.setDefaultEncoding(this.properties.getDefaultEncoding());


            if (!this.properties.getProperties().isEmpty()) {
                Properties properties = new Properties();
                properties.putAll(this.properties.getProperties());
                sender.setJavaMailProperties(properties);

            }

            Properties props = new Properties();
            props.put("mail.smtp.auth", "false");
            props.put("mail.smtp.starttls.enable", "true");
            props.put("mail.smtp.starttls.required", "true");

            sender.setJavaMailProperties(props);
            return sender;
        }

}
