package dedovich.sergey.controller;

import com.warrenstrange.googleauth.GoogleAuthenticator;
import com.warrenstrange.googleauth.GoogleAuthenticatorKey;
import com.warrenstrange.googleauth.GoogleAuthenticatorQRGenerator;
import dedovich.sergey.service.SecurityService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@CrossOrigin({"http://localhost:8081"})
@RestController
@RequestMapping("/googleAuthenticator")
public class GoogleAuthenticatorController {

    private final SecurityService securityService;
    private final GoogleAuthenticator googleAuthenticator = new GoogleAuthenticator();

    @GetMapping("/getQrCodeUrl")
    public String getQrCodeUrl() {
        GoogleAuthenticatorKey credentials = googleAuthenticator.createCredentials();

        String secretKey = credentials.getKey();

        securityService.saveSecreteKey(secretKey);

        return GoogleAuthenticatorQRGenerator.getOtpAuthURL("Issuer", "Account Name", credentials);
    }

    @PostMapping("/validateCode/{code}")
    public boolean validateSecretKey(@PathVariable("code") int code) {
        return googleAuthenticator.authorize(securityService.getSecreteKey(), code);
    }
}