window.candidateApi = {

    createOrUpdate: function(bo) {
        return instance({
            url: '/candidate/createOrUpdate',
            method: 'post',
            data: bo
        })
    },

    delete: function(candidateId) {
        return instance({
            url: '/candidate/delete?candidateId=' + candidateId,
            method: 'post',
        })
    },

    list: function(bo) {
        return instance({
            url: '/candidate/list?realName=' + bo.realName + '&mobile=' + bo.mobile + '&page=' + bo.page + "&pageSize=" + bo.pageSize,
            method: 'get',
        })
    },

    nameList: function() {
        return instance({
            url: '/candidate/nameList',
            method: 'get',
        })
    },

    detail: function(candidateId) {
        return instance({
            url: '/candidate/detail?candidateId=' + candidateId,
            method: 'get',
        })
    },
}

