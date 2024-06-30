# Project Lombok

在撰寫 Java 時, 常常會遇到一些看似很冗的程式碼, 但又不得不寫, 此時 Lombok 就派上用場了

- 官方網站: https://projectlombok.org

使用時只需要在 `pom.xml` 裡面簡單地引入依賴即可

```xml
<dependencies>
  <dependency>
    <groupId>org.projectlombok</groupId>
    <artifactId>lombok</artifactId>
    <version>1.18.34</version>
    <scope>provided</scope>
  </dependency>
</dependencies>
```

## 又愛又恨的 Getter & Setter

大家想必對以下的程式碼不陌生, 在撰寫類似 DTO, DAO 的類別時, 常常需要實作屬性的 Getter 與 Setter

```java
public class Person {
  private String name;
  private String job;

  public String getName() {
    return this.name;
  }

  void setName(String name) {
    this.name = name;
  }

  public String getJob() {
    return this.job;
  }

  void setJob(String job) {
    this.job = job;
  }
}
```

只要在屬性上加上 `@Getter/@Setter` 的標記以後, Lombok 就會在編譯時自動將上述的程式碼產生出來

```java
public class Person {
  @Getter @Setter private String name;
  @Getter @Setter private String job;
}
```

我們也可以在 `@Getter/@Setter` 設定存取權限, 如果我們今天想讓某個屬性只被**繼承這個父類別的子類別**存取, 可以像這樣寫

```java
public class Person {
  @Getter(AccessLevel.PROTECTED)
  @Setter(AccessLevel.PROTECTED)
  private String name;
}
```

這樣就會產生對應層級的 Getter & Setter

```java
public class Person {
  private String name;
  private String job;

  protected String getName() {
    return this.name;
  }

  protected void setName(String name) {
    this.name = name;
  }

  protected String getJob() {
    return this.job;
  }

  protected void setJob(String job) {
    this.job = job;
  }
```

能使用的 `AccessLevel` 有以下幾種

- PUBLIC
- PROTECTED
- PACKAGE
- PRIVATE
- <font color='red'>NONE</font>

:::info
我們也可以利用 `@Data` 的標記, 這樣在編譯時就會自動把每個屬性的 Getter, Setter 都產生出來

```java
@Data
public class Person {
  private String name;
  private String job;
}
```

但如果我們今天想用 `@Data` 將所有屬性的 Getter & Setter 都產生出來, 但某幾個特定的屬性不想產生時,
就可以利用上面有提到的 `AccessLevel` 來達成

```java
@Data
public class Person {
  private String name;
  private String job;

  @Setter(AccessLevel.NONE)
  @Getter(AccessLevel.NONE)
  private String phoneNumber;
}
```

:::

## Builder Pattern 好好用, 但實作起來好痛苦

有時候我們的類別內有過多的屬性, 在建構時就會降低程式碼的易讀性

```java
public class Person {
  private String firstName;
  private String secondName;
  private String phoneNumber;

  public Person(String firstName, String secondName, String phoneNumber) {
    this.firstName = firstName;
    this.secondName = secondName;
    this.phoneNumber = phoneNumber;

  }
}
```

在使用時我們就沒辦法一眼看出填入的變數是代表什麼屬性

```java
Person sean = new Person("Sean", "Chang", "0912345678")
```

如果是使用 Builder 來建構我們的實例的話, 會長得類似下面這樣

```java
PersonBuilder seanBuilder = new Person.builder();

Person sean = seanBuilder
  .firstName("Sean")
  .secondName("Chang")
  .phoneNumber("0912345678")
  .build()
```

這樣就能一目瞭然每個變數代表的值了, 不用再回去翻閱類別的程式碼是怎麼實作的
