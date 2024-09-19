package com.itzixi;

import com.github.benmanes.caffeine.cache.Cache;
import com.itzixi.pojo.Stu;
import jakarta.annotation.Resource;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.lang.reflect.Array;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;

/**
 * @ClassName SysConfig
 * @Author 公众号【风间影月】
 * @Version 1.0
 * @Description 系统配置类
 **/
@Configuration
public class SysConfig implements CommandLineRunner {

    @Resource
    private Cache<String, Object> cache;

    /**
     * @Description: 定义初始化列表
     * @Author 风间影月
     * @param
     * @return ArrayList<Stu>
     */
    public ArrayList<Stu> initList() {

        Stu s1 = new Stu("1001", "风间影月", 1, "13906189527", "fjyy@itzixi.com", LocalDate.now(), LocalDateTime.now(), LocalDateTime.now());
        Stu s2 = new Stu("1002", "郑耀先", 1, "13906189527", "zyx@itzixi.com", LocalDate.now(), LocalDateTime.now(), LocalDateTime.now());
        Stu s3 = new Stu("1003", "周志乾", 1, "13906189527", "zzq@itzixi.com", LocalDate.now(), LocalDateTime.now(), LocalDateTime.now());

        ArrayList<Stu> list = new ArrayList<>();
        list.add(s1);
        list.add(s2);
        list.add(s3);

        return list;
    }

    /**
     * @Description: 自启动运行
     * @Author 风间影月
     * @param args
     */
    @Override
    public void run(String... args) {
        ArrayList<Stu> stuList = initList();
        cache.put("stuList", stuList);
    }

}
