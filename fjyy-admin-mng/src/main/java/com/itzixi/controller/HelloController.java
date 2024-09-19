package com.itzixi.controller;

import com.github.benmanes.caffeine.cache.Cache;
import com.itzixi.pojo.Stu;
import com.itzixi.pojo.StuBO;
import jakarta.annotation.Resource;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.BeanUtils;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

/**
 * @ClassName HelloController
 * @Author 公众号【风间影月】
 * @Version 1.0
 * @Description HelloController
 **/
@RestController
public class HelloController {

    @Resource
    private Cache<String, List<Stu>> cache;

    @GetMapping("hello")
    public Object hello() {
        return "Hello 风间影月~~~";
    }

    @GetMapping("getStuList")
    public Object getStuList() {
        return cache.getIfPresent("stuList");
    }

    @GetMapping("getStuDetail")
    public Object getStuDetail(String stuId) {

        List<Stu> stuList = cache.getIfPresent("stuList");

        for (int i = 0 ; i < stuList.size() ; i ++) {
            String sid = stuList.get(i).getId();
            if (sid.equalsIgnoreCase(stuId)) {
                return stuList.get(i);
            }
        }
        return null;
    }

    @PostMapping("createOrUpdate")
    public Object createOrUpdate(@RequestBody StuBO stuBO) {

        List<Stu> stuList = cache.getIfPresent("stuList");

        String stuId = stuBO.getId();
        if (StringUtils.isBlank(stuId)) {

            Stu stu = new Stu();
            BeanUtils.copyProperties(stuBO, stu);
            stu.setCreateTime(LocalDateTime.now());
            stu.setUpdateTime(LocalDateTime.now());

            stuList.add(stu);
            cache.put("stuList", stuList);
            return "创建成功";
        } else {
            LocalDateTime createTime = null;
            for (int i = 0 ; i < stuList.size() ; i ++) {
                String sid = stuList.get(i).getId();
                if (sid.equalsIgnoreCase(stuId)) {
                    createTime = stuList.get(i).getCreateTime();
                    stuList.remove(i);
                    break;
                }
            }

            Stu stu = new Stu();
            BeanUtils.copyProperties(stuBO, stu);
            stu.setCreateTime(createTime);
            stu.setUpdateTime(LocalDateTime.now());

            stuList.add(stu);
            cache.put("stuList", stuList);
            return "修改成功";
        }
    }

    @PostMapping("createStu")
    public Object createStu(Stu stu) {

        List<Stu> stuList = cache.getIfPresent("stuList");
        stuList.add(stu);

        cache.put("stuList", stuList);

        return "添加成功";
    }

    @PutMapping("modifyStu")
    public Object modifyStu(Stu stu) {

        String stuId = stu.getId();

        List<Stu> stuList = cache.getIfPresent("stuList");

        for (int i = 0 ; i < stuList.size() ; i ++) {
            String sid = stuList.get(i).getId();
            if (sid.equalsIgnoreCase(stuId)) {
                stuList.remove(i);
                break;
            }
        }
        stuList.add(stu);

        cache.put("stuList", stuList);

        return "修改成功";
    }

    @DeleteMapping("deleteStu")
    public Object deleteStu(String stuId) {

        List<Stu> stuList = cache.getIfPresent("stuList");

        for (int i = 0 ; i < stuList.size() ; i ++) {
            String sid = stuList.get(i).getId();
            if (sid.equalsIgnoreCase(stuId)) {
                stuList.remove(i);
                break;
            }
        }

        return "删除成功";
    }

}
