window.app = {

    /**
     * 如果本地使用localhost测试可以不使用，如果是ip或者域名测试，cookieDomain改为对应的ip或者域名
     * 例：
     *    ip：  192.168.1.111
     *    域名：   .itzixi.com
     */
    cookieDomain: ".itzixi.com",  

    // 判断用户是否登录
    judgeUserLoginStatus: function(pageVue) {
        var me = this;
        var utoken = me.getCookie("utoken");
        var uid = me.getCookie("uid");
        
        // console.log("utoken=" + utoken);
        // console.log("uid=" + uid);

        // utoken和uid都存在与cookie中，说明用户是登录状态
        if ( me.isNotEmpty(utoken) && me.isNotEmpty(uid)) {
            // session storage中获得用户信息，如果没有，则发起请求从后端获取
            var userInfo = me.fetchUserInfo();
            if (me.isNotEmpty(userInfo)) {
                // 用户存在，首页显示用户信息
                pageVue.userInfo = userInfo;
            } else {
                // 用户不存在，发起请求调用后端
                var userServerUrl = me.userServerUrl;
                axios.post(
                        userServerUrl + '/user/getUserInfo?userId=' + uid
                        // ,
                        // {}, 
                        // {
                        //     headers: {
                        //         'headerUserId': uid,
                        //         'headerUserToken': utoken
                        //     }
                        // }
                        )
                    .then(res => {
                        // debugger
                        if (res.data.status == 200) {
                            var userInfo = res.data.data;
                            // console.log("app:" + userInfo);
                            // 获得到用户信息后，还需要判断用户的状态，以防管理员对其封号后，状态不会检测
                            var activeStatus = userInfo.activeStatus;
                            // 如果是被冻结状态，则退出登录
                            if (activeStatus == 2) {
                                alert("您的账号因违规操作被封...");
                                // me.logout(pageVue);
                                return false;
                            }
                            // 保存到session storage
                            // me.saveUserInfo(userInfo);
                            // 首页显示用户信息
                            pageVue.userInfo = userInfo;
                            return userInfo;
                        } else {
                            console.log(res.data.msg);
                            // 发生错误，直接return null
                            // 如果utoken或uid不对，被篡改过，那么获取不了用户信息，也返回null
                            return false;
                        }
                    });
            }
        } else {
            // token和uid都没有，表示用户没有登录过
            return false;
        }
    },

    logout(pageVue) {
        var me = this;
        var uid = me.getCookie("uid");
        var userServerUrl = me.userServerUrl;
        axios.post(
                userServerUrl + '/passport/logout?userId=' + uid)
            .then(res => {
                if (res.data.status == 200) {
                    // 删除sessionStorage中用户信息
                    me.deleteUserInfo();
                    // 删除用户cookie
                    me.deleteCookie("utoken");
                    me.deleteCookie("uid");
                    // 设置用户信息为空
                    pageVue.userInfo = null;
                    console.log("用户已退出");
                } else {
                    console.log(res.data.msg);
                }
            });
    },

    // 保存用户信息在 sessionStorage (保存数据的时间有效周期: 从打开浏览器到关闭浏览器)
    // localStorage 是永久存在，对于用户信息不适合存放
    // cookie 用于存放用户信息也不太好，而且cookie的大小限制为4k
    saveUserInfo: function(userInfo) {
        var userInfoStr = JSON.stringify(userInfo);
        sessionStorage.setItem("globalUserInfo", userInfoStr);
    },
    // 从sessionStorage中读取用户信息
    fetchUserInfo: function() {
        var userInfoStr = sessionStorage.getItem("globalUserInfo");
        return JSON.parse(userInfoStr);
    },
    // 从sessionStorage中删除用户信息
    deleteUserInfo: function() {
        sessionStorage.removeItem("globalUserInfo");
    },



    isEmpty: function (str) {
        if (str == null || str =="" || str == undefined) {
            return true;
        } else {
            return false;
        }
    },

    isNotEmpty: function (str) {
        if (str != null && str !="" && str != undefined) {
            return true;
        } else {
            return false;
        }
    },

    getCookie: function (cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            // console.log(c)
            while (c.charAt(0) == ' ') c = c.substring(1);
                if (c.indexOf(name) != -1){
                    return c.substring(name.length, c.length);
                }
            }
        return "";
    },

    setCookie: function(name, value) {
        var Days = 365;
        var exp = new Date(); 
        exp.setTime(exp.getTime() + Days*24*60*60*1000);
        var cookieContent = name + "="+ encodeURIComponent (value) + ";path=/;";
        if (this.cookieDomain != null && this.cookieDomain != undefined && this.cookieDomain != '') {
            cookieContent += "domain=" + this.cookieDomain;
        }
        document.cookie = cookieContent + cookieContent;
        // document.cookie = name + "="+ encodeURIComponent (value) + ";path=/;domain=" + cookieDomain;//expires=" + exp.toGMTString();
    },

    deleteCookie: function(name) {
        var cookieContent = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        if (this.cookieDomain != null && this.cookieDomain != undefined && this.cookieDomain != '') {
            cookieContent += "domain=" + this.cookieDomain;
        }
        document.cookie = cookieContent;
    },

    getUrlParam2(paramName) {
        var reg = new RegExp("(^|&)" + paramName + "=([^&]*)(&|$)");    //构造一个含有目标参数的正则表达式对象
        var r = window.location.search.substr(1).match(reg);            //匹配目标参数
        if (r != null) return decodeURI(r[2]); return null;             //返回参数值
    },

    getUrlParam(paramName) {
        let geturl = window.location.href;
        let getInfoObj = geturl.split('?')[1];
        let paramsObj = new URLSearchParams(getInfoObj);
        var result = paramsObj.get(paramName);
        return result;
    },

    getPageName() {
        var thisPath = window.location.pathname;
        var pathArray = thisPath.split("/");
        var pageNameSuffix = pathArray[pathArray.length - 1];
        var thisPage = pageNameSuffix.split(".")[0];
        // console.log(thisPage);
        return thisPage;
    },

    // 时间格式化时间为：多少分钟前、多少天前
    // time 2020-09-10 20:20:20
    getDateBeforeNow: function(stringTime) {
        var minute = 1000 * 60;
        var hour = minute * 60;
        var day = hour * 24;
        var week = day * 7;
        var month = day * 30;

        var time1 = new Date().getTime(); //当前的时间戳
        // console.log(time1);
        var time2 = Date.parse(new Date(stringTime)); //指定时间的时间戳
        // console.log(time2);
        var time = time1 - time2;

        var result = null;
        if(time < 0) {
            // alert("设置的时间不能早于当前时间！");
            result = stringTime;
        }else if(time/month >= 1){
            result = parseInt(time/month) + "月前";
        }else if(time/week >= 1){
            result = parseInt(time/week) + "周前";
        }else if(time/day >= 1){
            result = parseInt(time/day) + "天前";
        }else if(time/hour >= 1){
            result = parseInt(time/hour) + "小时前";
        }else if(time/minute >= 1){
            result = parseInt(time/minute) + "分钟前";
        }else {
            result = "刚刚";
        }
        return result;
        console.log(result);
    }
}
