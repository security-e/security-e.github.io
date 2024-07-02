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

但 Builder 實作起來是非常麻煩的

```java
public class Person {
  private String firstName;
  private String secondName;
  private String phoneNumber;

  public PersonBuilder builder() {
    return new PersonBuilder();
  }

  public static class PersonBuilder {
    private String firstName;
    private String secondName;
    private String phoneNumber;

    public PersonBuilder firstName(String firstName) {
      this.firstName = firstName;
      return this;
    }

    public PersonBuilder secondName(String secondName) {
      this.secondName = secondName;
      return this;
    }

    public PersonBuilder phoneNumber(String phoneNumber) {
      this.phoneNumber = phoneNumber;
      return this;
    }

    public PersonBuilder build() {
      return new Person(firstName, secondName, phoneNumber);
    }
  }
}
```

但只要使用 Lombok 的 `@Builder` 標註, 就能在編譯時生成同樣的程式碼

```java
@Builder
public class Person {
  private String firstName;
  private String secondName;
  private String phoneNumber;
}
```

### List 與 Map 也難不倒 `@Builder`

如果今天我們的類別裡面有 Map 或是 List 的型別, 想用 Builder Pattern 來達成疊加的效果

我們可以在屬性前面加上 `@Singular` 的標註

```java
@Builder
public class Person {
  private String firstName;
  private String secondName;
  private String phoneNumber;
  @Singular private List<String> petNames;
}
```

在使用的時候我們就能用類似蓋房子的方式把變數疊加到 List 或是 Map 裡面,
`@Builder` 會在類別內生成單數的方法,
舉例來說 `private List<String> petNames` 就會生成 `.petName(petName)` 的方法

```java
List<String> petNames = List.of("Amy", "Ben");
Person.PersonBuilder personBuilder = Person.builder();

personBuilder
  .firstName("Sean")
  .secondName("Chang")
  .phoneNumber("0912345678");

// 效果等同於 personBuilder.petNames(petNames)
for (String petName : petNames) {
  personBuilder.petName(petName);
}

Person person = personBuilder.build();
```

如果是 Map 的型別

```java
@Builder
public class Person {
  private String firstName;
  private String secondName;
  private String phoneNumber;
  @Singular private Map<String, Integer> accounts;
}
```

使用起來則會像這樣

```java
Person.PersonBuilder builder = Person.builder();

builder
  .firstName("Sean")
  .secondName("Chang")
  .phoneNumber("0912345678")
  .account("Cathay", 10000)
  .account("E-Sun", 5000);
```

使用了 Lombok 以後, 以往非常好用但實作非常麻煩的 Builder Pattern 也變得非常容易上手
