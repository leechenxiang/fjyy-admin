package com.itzixi.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.time.LocalDate;
import java.time.LocalDateTime;

/**
 * @ClassName Stu
 * @Author 公众号【风间影月】
 * @Version 1.0
 * @Description Stu 学生对象类
 **/
@Data
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class Stu {

    private String id;
    private String name;
    private Integer sex;
    private String mobile;
    private String email;
    private LocalDate birthday;
    private LocalDateTime createTime;
    private LocalDateTime updateTime;

}
