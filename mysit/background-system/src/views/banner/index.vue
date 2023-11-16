<template>
    <div class="banner-container app-container">
        <!-- 数据表格 -->
        <el-table :data="bannerList" style="width: 100%" border>
            <el-table-column type="index" label="序号" width="80" align="center">
            </el-table-column>
            <el-table-column prop="title" label="标题" width="180" align="center">
            </el-table-column>
            <el-table-column prop="description" label="描述" align="center">
            </el-table-column>
            <el-table-column label="中图预览" width="250" align="center">
                <template slot-scope="{ row, $index }">
                    <el-image style="width: 100px; height: 100px" :src="row.midImg2" fit="cover"></el-image>
                </template>
            </el-table-column>
            <el-table-column label="大图预览" width="250" align="center">
                <template slot-scope="{ row, $index }">
                    <el-image style="width: 100px; height: 100px" :src="row.bigImg2" fit="cover"></el-image>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="110" align="center">
                <template slot-scope="{ row, $index }">
                    <el-tooltip class="item" effect="dark" content="编辑" placement="top" :hide-after="3000">
                        <el-button type="primary" icon="el-icon-edit" circle size="mini"
                            @click="handleEditBanner(row)"></el-button>
                    </el-tooltip>
                </template>
            </el-table-column>
        </el-table>

        <!-- 编辑首页标语 -->
        <el-dialog title="请编辑首页标语" :visible.sync="dialogFormVisible" width="800px">
            <el-form :model="form">
                <el-form-item label="标题">
                    <el-input v-model="form.title" autocomplete="off" placeholder="请输入标题"></el-input>
                </el-form-item>

                <el-form-item label="描述">
                    <el-input v-model="form.description" type="textarea" :rows="5" placeholder="请输入描述"></el-input>
                </el-form-item>

                <el-row>
                    <el-col :span="12">
                        <el-form-item label="首页中图">
                            <!-- 中图 -->
                            <Upload :src="form.midImg" @imgUrl="handleMidImg" />
                        </el-form-item>

                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="首页大图">
                            <!-- 大图 -->
                            <Upload :src="form.bigImg" @imgUrl="handleBigImg" />
                        </el-form-item>

                    </el-col>

                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="editBannerConfirm">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { Server_URL } from "@/serverUrl";
import Upload from "@/components/Upload";
export default {
    name: "banner",
    components: {
        Upload
    },
    data() {
        return {
            bannerList: [], //存储数据
            dialogFormVisible: false, //编辑首页是否显示
            form: {
                id: "",
                title: "",
                description: "",
                bigImg: "",
                midImg: "",
            },
        }
    },
    created() {
        this.fetchData();
    },
    methods: {
        async fetchData() {
            const resp = await this.$API.banner.getBanner();
            const data = resp.data.map(item => {
                return {
                    bigImg2: Server_URL + item.bigImg,
                    midImg2: Server_URL + item.midImg,
                    ...item

                };
            });
            this.bannerList = data;
        },
        handleEditBanner(bannerInfo) {
            //将数据给form
            this.form = { ...bannerInfo }
            this.dialogFormVisible = true;
        },
        handleBigImg(url) {
            this.form.bigImg = url;
        },
        handleMidImg(url) {
            this.form.midImg = url;
        },
        async editBannerConfirm() {
            // 从表单里面拿到用户修改的数据，发送给服务器
            // 因为 api 文档要求三个首页标语都要发送过去，哪怕只改了其中一个
            let arr = [...this.bannerList];
            for (var i = 0; i < arr.length; i++) {
                if (arr[i].id == this.form.id) {
                    arr[i] = this.form
                }
            }
            const resp = await this.$API.banner.setBanner(arr);
            if (!resp) {
                this.dialogFormVisible = false; // 关闭掉对话框
                this.$message({
                    message: '修改成功',
                    type: 'success'
                });
                this.fetchData();
            }

        }
    },
}
</script>

<style></style>