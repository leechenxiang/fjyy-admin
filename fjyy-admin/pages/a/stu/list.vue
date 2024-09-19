<template>
    <div class="orderlist-box">

        <el-tabs v-model="activeTab" type="border-card">
            <el-tab-pane label="列表" name="allOrderList">

                <div class="table-wrapper">

                    <el-table :data="stuList" border stripe class="table-list">
                        <el-table-column type="index" header-align="center" align="center" width="50"></el-table-column>
                        <el-table-column label="姓名" header-align="center" align="center" width="200">
                            <template slot-scope="scope">
                                {{scope.row.name}}
                            </template>
                        </el-table-column>
                        <el-table-column label="性别" header-align="center" align="center" width="100">
                            <template slot-scope="scope">
                                <span>
                                    <el-tag type="success" v-if="scope.row.sex == 1">男</el-tag>
                                    <el-tag type="danger" v-if="scope.row.sex == 0">女</el-tag>
                                    <el-tag type="info" v-if="scope.row.sex == 2">保密</el-tag>
                                </span>
                            </template>
                        </el-table-column>
                        <el-table-column label="手机号" header-align="center" align="center" width="200">
                            <template slot-scope="scope">
                                {{scope.row.mobile}}
                            </template>
                        </el-table-column>
                        <el-table-column label="邮箱" header-align="center" align="center" width="240">
                            <template slot-scope="scope">
                                {{scope.row.email}}
                            </template>
                        </el-table-column>
                        <el-table-column label="出生日期" header-align="center" align="center" width="150">
                            <template slot-scope="scope">
                                {{ scope.row.birthday }}
                            </template>
                        </el-table-column>
                        <el-table-column prop="createTime" label="创建时间" min-width="180" header-align="center" align="center"></el-table-column>
                        <el-table-column prop="updateTime" label="更新时间" min-width="180" header-align="center" align="center"></el-table-column>

                        <el-table-column label="操作" width="200" header-align="center" align="center">
                            <template slot-scope="scope">
                                <el-button type="primary" size="mini" plain @click="gotoModifyCandidate(scope.row.id)">编辑</el-button>
                                <el-button type="primary" size="mini" plain @click="deleteStu(scope.row.id)">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>

                </div>

            </el-tab-pane>
        </el-tabs>

    </div>
</template>

<script>
module.exports = {
    data() {
        return {
            activeTab: "allOrderList",

            stuList:[],

            searchBO: {
                page: 0,
                pageSize: 0,
            },
        }
    },
    mounted() {
        this.initStuList();
    },
    methods: {

        initStuList() {

            stuApi.list().then(response => {
                // console.log(response);
                this.stuList = response;
            });

        },

        gotoModifyCandidate(stuId) {
            var targetPath = "/stuMng/createStu?stuId=" + stuId;
            this.$parent.$router.push({
                path: targetPath
            });
        },

        deleteStu(stuId) {

            this.$confirm('确认删除吗？', '提示', {
                confirmButtonText: '确认删除',
                cancelButtonText: '容我三思',
                type: 'warning'
            }).then(() => {

                stuApi.delete(stuId).then(response => {
                    console.log(response);

                    this.$message({
                        showClose: true,
                        message: '删除成功!',
                        type: 'success',
                        duration: 2000
                    });

                    this.initStuList();
                });

            }).catch(() => {
            });

        },

    },
}
</script>

<style>
.orderlist-box {
    /* padding: 10px; */

    display: flex;
    flex-direction: column;
    justify-content: flex-start;

    /* border: solid 10px #e3e9ef; */

    font-size: 16px;
}

.orderlist-box .table-wrapper {
    padding: 10px 10px 20px 10px;
}

.orderlist-box .table-list {
    width: 100%;
    font-size: 15px;
}

.orderlist-box .search-area {
    margin-bottom: 20px;
}

</style>