window.stuApi = {

    createOrUpdate: function(bo) {
        return instance({
            url: '/createOrUpdate',
            method: 'post',
            data: bo
        })
    },

    delete: function(stuId) {
        return instance({
            url: '/deleteStu?stuId=' + stuId,
            method: 'delete',
        })
    },

    list: function() {
        return instance({
            url: '/getStuList',
            method: 'get',
        })
    },

    detail: function(stuId) {
        return instance({
            url: 'getStuDetail?stuId=' + stuId,
            method: 'get',
        })
    },
}

