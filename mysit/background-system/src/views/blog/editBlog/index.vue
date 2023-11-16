<template>
    <div class="app-container">
        <h3 class="blog-title">文章标题</h3>
        <el-input v-model="form.title" placeholder="请输入文章标题"></el-input>

        <h3 class="blog-title">文章编辑</h3>
        <editor :initialValue="form.editorText" height="600px" ref="toastuiEditor" :options="editorOptions" />

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
            <el-button type="primary" @click="handleEditArticle">确认修改</el-button>
            <el-button @click="$router.push('/blog/blogList')">取消</el-button>
        </div>
    </div>
</template>

<script>
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/vue-editor";
import Upload from "@/components/Upload";
import "@toast-ui/editor/dist/i18n/zh-cn";
export default {
    components: {
        editor: Editor,
        Upload
    },
    data() {
        return {
            form: {
                id: "",
                title: "",
                editorText: "",//用户编辑的类容
                description: "",//文章描述
                thumb: "",
                select: ""
            },
            blogType: [], //博客分类
            editorOptions: {
                language: 'zh-CN',
            }
        }
    },
    created() {
        this.getBlogType();
        this.getBlog();
    },
    methods: {
        async getBlogType() {
            const resp = await this.$API.blog.getBlogType();
            if (resp.data) {
                this.blogType = resp.data;
            }
        },

        async getBlog() {
            const id = this.$route.params.id;
            const resp = await this.$API.blog.getByIdBlog(id);
            console.log(resp);
            this.form = {
                id: resp.data.id,
                title: resp.data.title,
                description: resp.data.description,//文章描述
                thumb: resp.data.thumb,
                select: resp.data.category.id || "",
            }
            this.$refs.toastuiEditor.invoke('setHTML', resp.data.htmlContent);
        },
        handleImgUrl(url) {
            this.form.thumb = url
        },
        handleEditArticle() {

            let html = this.$refs.toastuiEditor.invoke('getHTML');
            let markdown = this.$refs.toastuiEditor.invoke('getMarkdown');

            let obj = {
                id: this.form.id,
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
            this.$API.blog.editBlog(obj).then(resp => {
                this.$message({
                    showClose: true,
                    message: '修改文章成功',
                    type: 'success'
                });
                this.$router.push('/blog/blogList');
            })
        }
    }

}
</script>

<style></style>