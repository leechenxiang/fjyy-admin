<template>
    <div class="orderCreate-box">

        <el-tabs v-model="activeTab" type="border-card">
            <el-tab-pane :label="activeTitle" name="createOrUpdateStu">

                <div class="table-wrapper">

                    <el-form ref="stuForm" :model="stuForm" :rules="rules" label-width="140px">

                        <el-form-item label="姓名" prop="name">
                            <el-input v-model="stuForm.name" style="width: 360px;" maxlength="12"></el-input>
                        </el-form-item>
                        
                        <el-form-item label="性别" prop="sex">
                            <el-select v-model="stuForm.sex" placeholder="请选择性别" style="width: 360px;">
                                <el-option label="保密" value="2"></el-option>
                                <el-option label="女" value="0"></el-option>
                                <el-option label="男" value="1"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="手机号" prop="mobile">
                            <el-input v-model="stuForm.mobile" style="width: 360px;" maxlength="11"></el-input>
                        </el-form-item>
                        <el-form-item label="邮箱" prop="email">
                            <el-input v-model="stuForm.email" style="width: 360px;"></el-input>
                        </el-form-item>

                        <el-form-item label="出生日期" prop="birthday">
                            <el-date-picker value-format="yyyy-MM-dd" type="datetime" placeholder="请选择出生日期" v-model="stuForm.birthday" style="width: 360px;"></el-date-picker>
                        </el-form-item>
                        

                        <el-form-item>
                            <el-button type="primary" @click="createOrUpdateStu">立即提交</el-button>
                            <el-button>取消</el-button>
                        </el-form-item>
                    </el-form>

                </div>

            </el-tab-pane>
        </el-tabs>

    </div>
</template>

<script>

module.exports = {
    data() {
        return {
            activeTab: "createOrUpdateStu",
            activeTitle: "",

            stuForm: {
                id: "",
                name: "",
                sex: "",
                mobile: "",
                email: "",
                birthday: "",
            },

            rules: {
                name: [
                    { required: true, message: '姓名不能为空', trigger: 'blur' },
                ],
                sex: [
                    { required: true, message: '性别不能为空', trigger: 'blur' },
                ],
                mobile: [
                    { required: true, message: '手机号不能为空', trigger: 'blur' },
                ],
                email: [
                    { required: true, message: '邮箱不能为空', trigger: 'blur' },
                ],
                birthday: [
                    { required: true, message: '生日不能为空', trigger: 'blur' },
                ],
            },
        }
    },
    mounted() {
        var me = this;

        var stuId = this.$route.query.stuId;
        console.log("stuId = " + stuId);

        if (app.isNotEmpty(stuId)) {
            var params = {
                id: stuId
            }

            me.activeTitle = "编辑"

            this.getStu(stuId);
        } else {
            me.activeTitle = "创建"
        }

    },
    methods: {
        getStu(stuId) {
            stuApi.detail(stuId).then(response => {
                console.log(response);
                
                var stu = response;
                stu.sex = String(stu.sex);

                console.log(stu);

                this.stuForm = stu;
            });
        },

        createOrUpdateStu() {
            console.log(this.stuForm);

            var stuForm = this.stuForm;

            var formName = "stuForm";
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$confirm('确认提交内容吗?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.submitContent();
                    }).catch(() => {
                    });;
                } else {
                    console.log('提交错误!!!');
                    return false;
                }
            });
            
        },

        submitContent() {
            var bo = this.stuForm;
            console.log(bo);

            stuApi.createOrUpdate(bo).then(response => {
                console.log(response);

                this.$message({
                    showClose: true,
                    message: '信息保存成功!',
                    type: 'success',
                    duration: 2000
                });

                this.clearForm();
            });

        },

        clearForm() {
            this.stuForm = {
                id: "",
                name: "",
                sex: "",
                mobile: "",
                email: "",
                birthday: "",
            }
        },

    },
}
</script>

<style>
.orderCreate-box {
    /* padding: 10px; */

    display: flex;
    flex-direction: column;
    justify-content: flex-start;

    /* border: solid 10px #e3e9ef; */

    font-size: 16px;
}

.orderCreate-box .table-wrapper {
    padding: 10px 10px 20px 10px;
}

.orderCreate-box .table-list {
    width: 100%;
    font-size: 15px;
}

.orderCreate-box .search-area {
    margin-bottom: 20px;
}

</style>