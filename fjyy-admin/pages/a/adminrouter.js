window.myrouter = {

    routes: [

        { path: '/', component: httpVueLoader('stu/list.vue') },

        { path: '/stuMng/stuList', component: httpVueLoader('stu/list.vue') },
        { path: '/stuMng/createStu', component: httpVueLoader('stu/create.vue') },
		
	],

    menuList: [

        { title: '学生管理', path: '/stuMng', index: 'stuMng', icon: 'el-icon-s-order', children: [
                { title: '学生列表', path: '/stuMng/stuList', index: 'stuList',  children: [], role: 1, },
                { title: '创建学生', path: '/stuMng/createStu', index: 'createStu',  children: [], role: 1, },
            ], role: 1, 
        },
        
    ]
}
