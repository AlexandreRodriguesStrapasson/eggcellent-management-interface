import com.github.javafaker.Faker;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.edge.EdgeDriver;

import java.text.SimpleDateFormat;
import java.util.List;
import java.util.concurrent.TimeUnit;

public class AppTest {
    String url = "D:\\Faculdade\\Códigos\\Visual Studio\\Site a ser testado - TC1\\eggcellent-management-interface\\msedgedriver.exe";
    String pageIndex = "D:\\Faculdade\\Códigos\\Visual Studio\\Site a ser testado - TC1\\eggcellent-management-interface\\pages\\index.html";
    WebDriver driver = new EdgeDriver();


    @Test
    @DisplayName("should register  a new egg")
    void shouldRegisterANewEgg() {
        addNewEgg();
    }

    private void addNewEgg() {
        System.setProperty("webdriver.edge.driver", url);
        driver.get(pageIndex);

        WebElement addNewEggButton = driver.findElement(By.linkText("Add New Egg"));
        addNewEggButton.click();

        WebElement name = driver.findElement(By.id("name"));
        WebElement birthday = driver.findElement(By.id("birthday"));
        List<WebElement> languages = driver.findElements(By.className("form-check-input"));
        WebElement firstParent = driver.findElement(By.id("parentSelect"));
        WebElement secondParent = driver.findElement(By.id("secondParentSelect"));

        Faker faker = new Faker();

        name.sendKeys(faker.name().fullName());

        String pattern = "dd/MM/yyyy";
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat(pattern);
        birthday.sendKeys(simpleDateFormat.format(faker.date().past(5, TimeUnit.DAYS)));

        int alteracoes = (int) Math.floor(Math.random() * languages.size());
        for (int i = 0; i < alteracoes; i++) {
            languages.get((int) Math.floor(Math.random() * languages.size())).click();
        }

        List<String> firstParentOptions = firstParent.findElements(By.tagName("option")).stream().map(option -> option.getAttribute("value")).toList();
        firstParent.sendKeys(firstParentOptions.get((int) Math.floor(Math.random() * firstParentOptions.size())));

        List<String> secondParentOptions = secondParent.findElements(By.tagName("option")).stream().map(option -> option.getAttribute("value")).toList();
        secondParent.sendKeys(secondParentOptions.get((int) Math.floor(Math.random() * secondParentOptions.size())));

        WebElement registerButton = driver.findElement(By.xpath("//button[text()='Register']"));
        registerButton.click();

        WebElement returnIndex = driver.findElement(By.linkText("Back to Index"));
        returnIndex.click();
    }
}