package util;

public class MissingConfigurationException extends RuntimeException {
    public MissingConfigurationException(String message) {
        super(message);
    }
}