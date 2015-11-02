package unitedway.mail;

/**
 * Created by david492000 on 10/7/15.
 */

import mjson.Json;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring4.SpringTemplateEngine;
import unitedway.models.UnitedWayDonation;
import unitedway.services.UserService;

import java.text.DecimalFormat;


@Component
public class UnitedWayMail {


    @Value("${emailEndpoint}")
    private String emailEndpoint;

    @Autowired
    SpringTemplateEngine templateEngine;

    @Autowired
    UserService userService;


    public Context prepareContext(UnitedWayDonation donation){
        Json json = userService.getEmployeeInfo(donation.getEid());

        Context context = new Context();
        context.setVariable("name", json.at("firstName").asString() + " " + json.at("lastName").asString());

        DecimalFormat df = new DecimalFormat("0.00");

        if(donation.getBiweeklyDeduction() != null && donation.getBiweeklyDeduction() > 0){

            context.setVariable("type", "bi-weekly");
            context.setVariable("donation", df.format(donation.getBiweeklyDeduction()));
            context.setVariable("percentsign", "");
            context.setVariable("dollarsign", "$");

        }
        else if(donation.getOneTimeDeduction() != null && donation.getOneTimeDeduction() > 0)
        {
            context.setVariable("type", "one-time");
            context.setVariable("donation", df.format(donation.getOneTimeDeduction()));
            context.setVariable("percentsign", "");
            context.setVariable("dollarsign", "$");
        }
        else if(donation.isExcellenceOnePctFlag() == true)
        {
            context.setVariable("type", "bi-weekly");
            context.setVariable("donation", "1");
            context.setVariable("percentsign", "%");
            context.setVariable("dollarsign", "");
        }
        else if (donation.isExcellenceTwoPctFlag() == true)
        {
            context.setVariable("type", "bi-weekly");
            context.setVariable("donation", "2");
            context.setVariable("percentsign", "%");
            context.setVariable("dollarsign", "");
        }



        return context;
    }


    public String processTemplate(Context context, String templateName){

        String content = templateEngine.process(templateName, context);

        return content;
    }

    public String buildMessage(String to, String from, String commonName, String message, String subject){
        Json json = Json.object();
        json.set("email", to);
        Json fromO = Json.object().set("email", from).set("commonname", commonName);
        json.set("from", fromO);
        json.set("message", message);
        json.set("subject", subject);


        return json.toString();
    }

    public String emailRequest(String json){
        RestTemplate httpTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity request = new HttpEntity(json, headers);
        String response = httpTemplate.postForObject(emailEndpoint, request, String.class);

        return response;
    }

}
