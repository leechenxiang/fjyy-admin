window.jobApi = {

    createOrUpdate: function(bo) {
        return instance({
            url: '/job/createOrUpdate',
            method: 'post',
            data: bo
        })
    },

    delete: function(jobId) {
        return instance({
            url: '/job/delete?jobId=' + jobId,
            method: 'post',
        })
    },

    list: function(bo) {
        return instance({
            url: '/job/list?page=' + bo.page + "&pageSize=" + bo.pageSize,
            method: 'get',
        })
    },

    nameList: function() {
        return instance({
            url: '/job/nameList',
            method: 'get',
        })
    },

    detail: function(jobId) {
        return instance({
            url: '/job/detail?jobId=' + jobId,
            method: 'get',
        })
    },
}

