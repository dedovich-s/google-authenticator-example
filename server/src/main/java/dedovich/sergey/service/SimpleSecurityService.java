package dedovich.sergey.service;

import org.springframework.stereotype.Service;

@Service
public class SimpleSecurityService implements SecurityService {
    private String secreteKey = "";

    @Override
    public void saveSecreteKey(String secretKey) {
        this.secreteKey = secretKey;
    }

    @Override
    public String getSecreteKey() {
        return secreteKey;
    }
}
