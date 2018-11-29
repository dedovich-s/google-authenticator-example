package dedovich.sergey.service;

public interface SecurityService {
    void saveSecreteKey(String secretKey);

    String getSecreteKey();
}
