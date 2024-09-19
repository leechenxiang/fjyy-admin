window.interviewerRecordApi = {

    list: function(bo) {
        return instance({
            url: '/interviewRecord/list?realName=' + bo.realName + '&mobile=' + bo.mobile + '&page=' + bo.page + "&pageSize=" + bo.pageSize,
            method: 'get',
        })
    },

}

