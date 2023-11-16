<template>
    <div class="app-container">
        <h3 class="blog-title">文章标题</h3>
        <el-input v-model="form.title" placeholder="请输入文章标题"></el-input>

        <h3 class="blog-title">文章编辑</h3>
        <editor :initialValue="form.editorText" height="600px" ref="toastuiEditor" />

        <h3 class="blog-title">文章描述</h3>

        <el-input type="textarea" :rows="5" placeholder="请输入文章描述" v-model="form.description">
        </el-input>

        <!-- 文章上传图片 -->
        <Upload :src="form.thumb" title="文章头图" @imgUrl="handleImgUrl" />

        <!-- 博客分类 -->
        <h3 class="blog-title">选择分类</h3>
        <el-select v-model="form.select" slot="prepend" placeholder="请选择分类">
            <el-option :label="item.name" :value="item.id" v-for="item in blogType" :key="item.id"></el-option>
        </el-select>

        <div style="margin: 20px 0">
            <el-button type="primary" @click="handleAddArticle">发布文章</el-button>
        </div>
    </div>
</template>

<script>
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/vue-editor";
import Upload from "@/components/Upload";
export default {
    components: {
        editor: Editor,
        Upload
    },
    data() {
        return {
            form: {
                title: "",
                editorText: "",//用户编辑的类容
                description: "",//文章描述
                thumb: "",
                select: ""
            },
            blogType: [], //博客分类
        }
    },
    created() {
        this.getBlogType()
    },
    methods: {
        async getBlogType() {
            const resp = await this.$API.blog.getBlogType();
            if (resp.data) {
                this.blogType = resp.data;
            }
        },
        handleAddArticle() {
            let html = this.$refs.toastuiEditor.invoke('getHTML');
            let markdown = this.$refs.toastuiEditor.invoke('getMarkdown');

            let obj = {
                title: this.form.title,
                description: this.form.description,
                createDate: new Date().getTime(),
                categoryId: this.form.select,
                //服务器会根据markdown的类容生成
                toc: [],
                htmlContent: html,
                thumb: this.form.thumb,
                markdownContent: markdown
            }
            if (!obj.title && !obj.description && !obj.htmlContent && !obj.categoryId) {
                this.$message({
                    showClose: true,
                    message: '请填写标题、文章内容、描述、文章分类'
                });
                return;
            }
            this.$API.blog.setBlog(obj).then(resp => {
                this.$message({
                    showClose: true,
                    message: '发布文章成功',
                    type: 'success'
                });
                this.$router.push('/blog/blogList');
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
