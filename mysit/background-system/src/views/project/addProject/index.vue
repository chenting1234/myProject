<template>
    <div class="app-container">

        <h3 class="blog-title">项目名称</h3>
        <el-input v-model="form.name" autocomplete="off" placeholder="请输入项目名称"></el-input>

        <h3 class="blog-title">项目描述(每一项描述以英文逗号分隔)</h3>
        <el-input v-model="form.description" type="textarea" :rows="5" placeholder="请输入项目描述"></el-input>

        <h3 class="blog-title">项目链接地址</h3>
        <el-input v-model="form.url" autocomplete="off" placeholder="请输入项目链接"></el-input>


        <h3 class="blog-title">github地址</h3>
        <el-input v-model="form.github" autocomplete="off" placeholder="请输入项目的github地址"></el-input>

        <Upload :src="form.thumb" title="预览图" @imgUrl="handleImgUrl" />


        <h3 class="blog-title">项目等级排序</h3>
        <el-select v-model="form.order" placeholder="请填写项目等级">
            <el-option label="1" value="1"></el-option>
            <el-option label="2" value="2"></el-option>
            <el-option label="3" value="3"></el-option>
            <el-option label="4" value="4"></el-option>
            <el-option label="5" value="5"></el-option>
        </el-select>


        <div style="margin: 20px 0">
            <el-button type="primary" @click="handleAddProject">添加项目</el-button>
        </div>
    </div>
</template>

<script>
import Upload from "@/components/Upload";
export default {
    components: {
        Upload
    },
    data() {
        return {
            form: {
                name: "",
                description: "",
                url: "",
                github: "",
                thumb: "",
                order: 1
            },
        }
    },
    methods: {
        handleAddProject() {

            let obj = { ...this.form };
            obj.order = +this.form.order
            obj.description = this.form.description.replace('\n', '').split(',');
            if (!obj.name && !obj.description && !obj.url && !obj.github && !obj.thumb) {
                this.$message({
                    showClose: true,
                    message: '请填写项目名称、项目描述、项目地址、github地址、上传图片'
                });
                return;
            }
            this.$API.project.addProject(obj).then(resp => {
                this.$message({
                    type: 'success',
                    message: '添加项目成功!'
                });
                this.$router.push('/project/projectList');
            })
        },
        handleImgUrl(url) {
            this.form.thumb = url
        }

    }
}
</script>

<style scoped>
.blog-title {
    font-weight: normal;
}
</style>