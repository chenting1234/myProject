<template>
    <div class="blog-type container">
        <!-- 添加分类 -->
        <div style="margin-top: 15px; margin-left: 20px;">
            <el-input placeholder="请填入要加入的分类，左边选择该分类的等级" v-model="input" class="input-with-select blogAddInput">
                <el-select v-model="select" slot="prepend" placeholder="请选择分类等级">
                    <el-option label="1" value="1"></el-option>
                    <el-option label="2" value="2"></el-option>
                    <el-option label="3" value="3"></el-option>
                    <el-option label="4" value="4"></el-option>
                    <el-option label="5" value="5"></el-option>
                </el-select>

            </el-input>
            <el-button type="primary" class="addBtn" @click="handleBlogType">添加</el-button>
        </div>
        <!-- 表格 -->
        <el-table :data="blogType" style="width: 100%;margin-left: 20px; width: 1000px;" border>
            <el-table-column type="index" label="序号" width="80" align="center">
            </el-table-column>
            <el-table-column prop="name" label="博客类别" width="180" align="center">
            </el-table-column>
            <el-table-column prop="articleCount" label="文章数量" align="center">
            </el-table-column>
            <el-table-column label="操作" width="110" align="center">
                <template slot-scope="{ row, $index }">
                    <el-tooltip class="item" effect="dark" content="编辑" placement="top" :hide-after="3000">
                        <el-button type="primary" icon="el-icon-edit" circle size="mini"
                            @click="handleEditBlogType(row)"></el-button>
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="删除" placement="top" :hide-after="3000">
                        <el-button type="danger" icon="el-icon-delete" circle size="mini"
                            @click="deleteBlogType(row)"></el-button>
                    </el-tooltip>
                </template>
            </el-table-column>
        </el-table>

        <!-- 编辑 -->
        <el-dialog title="编辑文章分类" :visible.sync="dialogFormVisible" width="400px">
            <el-form :model="form">
                <el-form-item label="分类名称" :label-width="formLabelWidth">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="排序等级" :label-width="formLabelWidth">
                    <el-select v-model="form.order" placeholder="请填写分类">
                        <el-option label="1" value="1"></el-option>
                        <el-option label="2" value="2"></el-option>
                        <el-option label="3" value="3"></el-option>
                        <el-option label="4" value="4"></el-option>
                        <el-option label="5" value="5"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="handleEdit">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    data() {
        return {
            blogType: [],
            input: '',
            select: '1',
            loading: false,
            form: {
                id: "",
                name: "",
                order: ""
            },
            dialogFormVisible: false,
            formLabelWidth: '120px'
        }
    },
    created() {
        this.fetchData();
    },
    methods: {
        async fetchData() {
            this.loading = true;
            const resp = await this.$API.blog.getBlogType();
            if (resp.data) {
                this.loading = false;
                this.blogType = resp.data;
            }
        },
        handleEditBlogType(blogTypeInfo) {
            this.dialogFormVisible = true;
            this.form = { ...blogTypeInfo };

        },
        deleteBlogType(blogTypeInfo) {
            this.$API.blog.deleteBlogType(blogTypeInfo.id).then(resp => {
                this.$message({
                    showClose: true,
                    message: '删除博客分类成功',
                    type: 'success'
                });
                this.fetchData();
            });

        },
        //添加博客类型
        handleBlogType() {
            if (!this.input) {
                this.$message({
                    showClose: true,
                    message: '请填写博客分类'
                });
                return;
            }
            this.$API.blog.addBlogType({ name: this.input, order: this.select }).then(resp => {
                this.$message({
                    showClose: true,
                    message: '博客分类添加成功',
                    type: 'success'
                });
                this.fetchData();
            });

        },
        handleEdit() {
            this.$API.blog.editeBlogType({ id: this.form.id, data: { name: this.form.name, order: this.form.order } }).then(resp => {
                this.$message({
                    showClose: true,
                    message: '修改博客分类成功',
                    type: 'success'
                });
                this.fetchData();
                this.dialogFormVisible = false
            });
        }
    }
}
</script>

<style scoped>
.blogAddInput {
    width: 400px;
    margin-bottom: 20px;
}

.addBtn {
    margin-left: 15px;
}
</style>