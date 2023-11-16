<template>
    <div class="app-container">
        <h3 class="blog-title">关于我</h3>
        <el-input v-model="about" autocomplete="off" placeholder="请输入内容" :disabled="isDisabled"></el-input>
        <el-button type="primary" style="margin-top: 15px;" @click="handleAbout">{{ btnContent }}</el-button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            about: "",
            isDisabled: true,
            btnContent: "编辑",
        };
    },
    created() {
        this.fetchData();
    },
    methods: {
        async fetchData() {
            const resp = await this.$API.about.getAbout();
            this.about = resp.data;
        },
        handleAbout() {
            if (this.btnContent === '编辑') {
                this.btnContent = '完成'
                this.isDisabled = !this.isDisabled
            } else {
                if (!this.about) {
                    this.$message({
                        showClose: true,
                        message: '请填写个人地址'
                    });
                    return;
                }
                this.btnContent = "编辑";
                this.isDisabled = !this.isDisabled
                this.$API.about.setAbout(this.about).then(resp => {
                    this.$message({
                        type: 'success',
                        message: '更改成功!'
                    });
                    this.fetchData();

                });
            }

        }
    }
}
</script>

<style scoped>
.blog-title {
    font-weight: normal;
}
</style>