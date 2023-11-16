<template>
    <div class="app-container">
        <!-- 数据表格 -->
        <el-table :data="commentList" style="width: 100%" border v-loading="listLoading" element-loading-text="Loading"
            highlight-current-row>
            <el-table-column label="序号" width="80" align="center">
                <template slot-scope="{ $index }">{{ $index + (currPage - 1) * pageSize + 1 }}</template>
            </el-table-column>
            <el-table-column label="文章名称" width="180" align="center">
                <template slot-scope="{ row, }">
                    <el-avatar shape="square" size="small" :src="row.img"></el-avatar>
                </template>
            </el-table-column>
            <el-table-column prop="nickname" label="昵称" align="center">
            </el-table-column>
            <el-table-column label="评论文章" align="center">
                <template slot-scope="{row,}">{{ row.blog.title }}</template>
            </el-table-column>
            <el-table-column prop="content" label="评论内容" align="center">
            </el-table-column>
            <el-table-column label="评论日期" align="center">
                <template slot-scope="{ row, }">{{ formatDate(row.createDate) }}</template>
            </el-table-column>

            <el-table-column label="操作" align="center" width="200">
                <template slot-scope="{ row,  }">
                    <el-tooltip class="item" effect="dark" content="删除" placement="top" :hide-after="3000">
                        <el-button type="danger" icon="el-icon-delete" circle size="mini"
                            @click="deleteComment(row)"></el-button>
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
import { Server_URL } from "@/serverUrl";
import formatDate from '@/utils/formatDate';
export default {
    data() {
        return {
            commentList: [],
            pageSize: 5, //显示多少条
            currPage: 1,  //当前页数
            total: 0,//总条数
            listLoading: false,
        }
    },
    created() {
        this.fetchData();
    },
    computed: {
        totalPage() {
            return Math.ceil(this.total / this.pageSize);
        }
    },
    methods: {
        formatDate,
        async fetchData() {
            this.listLoading = true;
            const resp = await this.$API.comment.getComment(this.currPage, this.pageSize);
            console.log(resp);
            const data = resp.data.rows.map(item => {
                this.listLoading = false;
                return {
                    img: Server_URL + item.avatar,
                    ...item
                }

            });
            this.commentList = data;
            this.total = resp.data.total;

            if (this.currPage > this.totalPage) {
                this.currPage = this.totalPage
                this.fetchData();
            }
        },
        deleteComment(commentInfo) {
            this.$confirm('删除该评论, 是否继续?', '是否删除该评论', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$API.comment.deleteComment(commentInfo.id).then(resp => {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    this.fetchData();
                });

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