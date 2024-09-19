package com.itzixi;

import com.github.benmanes.caffeine.cache.Cache;
import com.github.benmanes.caffeine.cache.Caffeine;
import com.itzixi.pojo.Stu;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

/**
 * @ClassName CaffeineConfig
 * @Author 公众号【风间影月】
 * @Version 1.0
 * @Description 本地缓存配置类
 **/
@Configuration
public class CaffeineConfig {

    /**
     * @Description: 声明统一缓存bean，所有数据都可以使用本cache
     * @Author 风间影月
     * @param
     * @return Cache<String, List<Stu>>
     */
    @Bean
    public Cache<String, List<Stu>> cache() {
        return Caffeine.newBuilder()
                    .initialCapacity(50)    // 初始的缓存空间大小
                    .maximumSize(1000)
                    .build();
    }

}
