<template>
    <div class="app-container">
        <!-- 数据表格 -->
        <el-table :data="blogList" style="width: 100%" border>
            <el-table-column label="序号" width="80" align="center">
                <template slot-scope="{ $index }">{{ $index + (currPage - 1) * pageSize + 1 }}</template>
            </el-table-column>
            <el-table-column label="文章名称" width="180" align="center">
                <template slot-scope="{ row, }">
                    <el-popover placement="top-start" title="博客预览图" width="230" trigger="hover">
                        <el-image style="width: 200px; height: 200px" :src="imgUrl(row)" fit="contain"></el-image>
                        <a href="#" target="_blank" @click.prevent="handleToTitle(row)" slot="reference">{{ row.title }}</a>
                    </el-popover>

                </template>
            </el-table-column>
            <el-table-column prop="description" label="文章描述" align="center">
            </el-table-column>
            <el-table-column prop="scanNumber" label="浏览数" align="center" width="150">
            </el-table-column>
            <el-table-column prop="commentNumber" label="评论量" align="center" width="150">
            </el-table-column>
            <el-table-column label="所属分类" align="center" width="150">
                <template slot-scope="{ row,  }">{{ row.category.name || "未分类" }}</template>
            </el-table-column>
            <el-table-column label="创建日期" align="center">
                <template slot-scope="{ row, }">{{ formatDate(row.createDate) }}</template>
            </el-table-column>

            <el-table-column label="操作" align="center" width="200">
                <template slot-scope="{ row,  }">
                    <el-tooltip class="item" effect="dark" content="编辑" placement="top" :hide-after="3000">
                        <el-button type="primary" icon="el-icon-edit" circle size="mini"
                            @click="handleEditBlog(row)"></el-button>
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="删除" placement="top" :hide-after="3000">
                        <el-button type="danger" icon="el-icon-delete" circle size="mini"
                            @click="deleteBlog(row)"></el-button>
                    </el-tooltip>
                </template>
            </el-table-column>
        </el-table>

        <!-- 分页 -->
        <el-pagination style="margin-top: 30px; margin-right: 20px;" background
            layout="prev, pager, next,total,->,sizes,jumper" :total="total" :page-size="pageSize" :page-sizes="[5, 10, 15]"
            @current-change="handleChangePage" @size-change="handleSizeChange" :current-page.sync="currPage">
        </el-pagination>
    </div>
</template>

<script>
import formatDate from '@/utils/formatDate';
import { Server_URL, Client_URL } from "@/serverUrl";
export default {
    data() {
        return {
            blogList: [],
            //totalPage: 0, //总页码数
            pageSize: 5, //显示多少条
            currPage: 1,  //当前页数
            total: 0//总条数
        }
    },
    computed: {
        totalPage() {
            return Math.ceil(this.total / this.pageSize);
        }
    },
    created() {
        this.fetchData();
    },
    methods: {
        formatDate,
        //获取数据
        async fetchData() {
            const resp = await this.$API.blog.getBlogList(this.currPage, this.pageSize);
            this.blogList = resp.data.rows;
            this.total = resp.data.total;

            if (this.currPage > this.totalPage) {
                this.currPage = this.totalPage
                this.fetchData();
            }

        },
        imgUrl(blogInfo) {
            return Server_URL + blogInfo.thumb;
        },
        handleToTitle(blogInfo) {
            window.open(`${Client_URL}/article/cate/${blogInfo.id}`);
        },
        //编辑博客
        handleEditBlog(blogInfo) {
            this.$router.push({ name: 'AditBlog', params: { id: blogInfo.id } });

        },
        //删除博客
        deleteBlog(blogInfo) {
            this.$confirm('删除该文章会将该文章下面的评论一并删除, 是否继续?', '是否删除此篇文章', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                const resp = await this.$API.blog.deleteBlog(blogInfo.id);
                if (resp.data) {
                    this.fetchData();
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });

                }

            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },
        handleChangePage(page) {
            this.currPage = page;
            this.fetchData();
        },
        handleSizeChange(size) {
            this.pageSize = size;
            this.currPage = 1;
            this.fetchData();

        }

    }

}
</script>

<style></style>