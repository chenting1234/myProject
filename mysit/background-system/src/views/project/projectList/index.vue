<template>
    <div class="app-container">
        <el-table :data="projectList" style="width: 100%" border v-loading="listLoading" element-loading-text="加载数据中..."
            highlight-current-row>
            <el-table-column type="index" label="序号" width="80" align="center">
            </el-table-column>
            <el-table-column label="项目名称" width="180" align="center">
                <template slot-scope="{ row, $index }">
                    <a :href="row.url" target="_blank" class="proName">{{ row.name }}</a>
                </template>
            </el-table-column>
            <el-table-column prop="description" label="项目描述" align="center">
            </el-table-column>
            <el-table-column label="预览图" width="250" align="center">
                <template slot-scope="{ row, $index }">
                    <el-image style="width: 100px; height: 100px" :src="row.img" fit="cover"></el-image>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="180" align="center">
                <template slot-scope="{ row, $index }">
                    <el-tooltip class="item" effect="dark" content="github" placement="top" :hide-after="3000">
                        <el-button icon="iconfont icon-github" circle size="mini" class="gitHub"
                            @click="handleGitHub(row)"></el-button>
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="编辑" placement="top" :hide-after="3000">
                        <el-button type="primary" icon="el-icon-edit" circle size="mini"
                            @click="handleEditProject(row)"></el-button>
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="删除" placement="top" :hide-after="3000">
                        <el-button type="danger" icon="el-icon-delete" circle size="mini"
                            @click="deleteProject(row)"></el-button>
                    </el-tooltip>
                </template>
            </el-table-column>
        </el-table>

        <!--  -->
        <el-dialog title="请编辑该项目信息" :visible.sync="dialogFormVisible" width="100%" top="0">
            <el-form :model="form">
                <el-form-item label="项目名称">
                    <el-input v-model="form.name" autocomplete="off" placeholder="请输入项目名称"></el-input>
                </el-form-item>

                <el-form-item label="项目描述(每一项描述以英文逗号分隔)">
                    <el-input v-model="form.description" type="textarea" :rows="5" placeholder="请输入项目描述"></el-input>
                </el-form-item>
                <el-form-item label="项目链接地址">
                    <el-input v-model="form.url" autocomplete="off" placeholder="请输入项目链接"></el-input>
                </el-form-item>

                <el-form-item label="github地址">
                    <el-input v-model="form.github" autocomplete="off" placeholder="请输入项目github地址"></el-input>
                </el-form-item>

                <el-form-item label="预览图">
                    <Upload :src="form.thumb" @imgUrl="handleImgUrl" />
                </el-form-item>

                <el-form-item label="项目等级排序">
                    <el-select v-model="form.order" placeholder="请填写项目等级">
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
                <el-button type="primary" @click="editProjectConfirm">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { Server_URL } from "@/serverUrl";
import Upload from "@/components/Upload";
export default {
    components: {
        Upload
    },
    data() {
        return {
            projectList: [],
            listLoading: false,
            dialogFormVisible: false, //编辑首页是否显示
            form: {
                id: "",
                name: "",
                description: "",
                url: "",
                github: "",
                thumb: "",
                order: 1
            },
        }
    },
    created() {
        this.fetchData();
    },
    methods: {
        async fetchData() {
            this.listLoading = true;
            const resp = await this.$API.project.getProject();
            const data = resp.data.map(item => {
                return {
                    img: Server_URL + item.thumb,
                    ...item
                }

            });
            this.projectList = data;
            this.listLoading = false;
        },
        handleGitHub(projectInfo) {
            window.open(projectInfo.github);
        },
        handleEditProject(projectInfo) {
            this.dialogFormVisible = true;
            this.projectList.forEach(el => {
                if (el.id === projectInfo.id) {
                    this.form = { ...el, description: el.description.toString() }
                }
            });
        },
        deleteProject(projectInfo) {
            this.$confirm('确认要删除该项目, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$API.project.deleteProject(projectInfo.id).then(resp => {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    this.fetchData();
                })

            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },
        handleImgUrl(url) {
            this.form.thumb = url
        },
        editProjectConfirm() {
            let obj = { id: this.form.id, data: { ...this.form } };
            obj.data.order = +this.form.order
            obj.data.description = this.form.description.split(',');

            this.$API.project.setProject(obj).then(resp => {
                this.$message({
                    type: 'success',
                    message: '修改成功!'
                });
                this.dialogFormVisible = false;
                this.fetchData();
            });

        }
    }
}
</script>

<style scoped>
.gitHub {
    background-color: rgb(163, 163, 163);
    color: #fff;
    border: 1px solid rgb(163, 163, 163);
}


.proName:hover {
    color: #409EFF;
}
</style>