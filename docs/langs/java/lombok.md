# Project Lombok

在撰寫 Java 時, 常常會遇到一些看似很冗的程式碼, 但又不得不寫, 此時 Lombok 就派上用場了

## 又愛又恨的 Getter & Setter

大家想必對以下的程式碼不陌生

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
