
window.questionLibApi = {

    uploadInterviewVideo: function(formData) {
        return instance({
            url: '/file/uploadInterviewVideo',
            method: 'post',
            data: formData,
            headers: {'Content-Type': 'multipart/form-data'}
        })
    },

    createOrUpdate: function(bo) {
        return instance({
            url: '/questionLib/createOrUpdate',
            method: 'post',
            data: bo
        })
    },

    delete: function(params) {
        return instance({
            url: '/questionLib/delete',
            method: 'post',
            params: params
        })
    },

    list: function(bo) {
        return instance({
            url: '/questionLib/list?aiName='+ bo.aiName + '&question=' + bo.question + '&page=' + bo.page + "&pageSize=" + bo.pageSize,
            method: 'get',
        })
    },

    // 启用
    show: function(params) {
        return instance({
            url: '/questionLib/show',
            method: 'post',
            params: params
        })
    },

    // 关闭
    hide: function(params) {
        return instance({
            url: '/questionLib/hide',
            method: 'post',
            params: params
        })
    },

}

