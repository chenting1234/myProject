<template>
    <div class="app-container">
        <!-- 上传组件标题 -->
        <h3 class="title">{{ title }}</h3>
        <!-- 上传的控件 -->
        <el-upload class="avatar-uploader  " action="/api/upload" :headers="headers" :show-file-list="false"
            :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
            <img v-if="src" :src="imgUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon el-upload "></i>
        </el-upload>
    </div>
</template>

<script>
import { getToken, setToken, removeToken } from "@/utils/auth";
import { Server_URL } from "@/serverUrl";
export default {
    props: {
        title: {
            type: String,
        },
        src: {
            type: String,
            required: true,
        }
    },
    computed: {
        headers() {
            return {
                Authorization: getToken(),
            }
        },
        imgUrl() {
            return Server_URL + this.src;
        }
    },
    methods: {
        handleAvatarSuccess(res) {
            if (!res.code && res.data) {
                this.$emit("imgUrl", res.data)
            }
        },
        beforeAvatarUpload(file) {
            const type = ['image/jpeg', 'image/webp', "image/jpg", "image/gif", "image/png"];
            const isJPG = type.includes(file.type);
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
                this.$message.error('上传头像图片只能是 JPG、WEBP、GIF、PNG 格式!');
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
        }
    }
}
</script>



<style scoped>
.title {
    font-weight: normal;
    letter-spacing: 3px;
}

.avatar-uploader .el-upload {
    cursor: pointer;
    position: relative;
    overflow: hidden;
}

.avatar-uploader .el-upload:hover {
    border-color: #409EFF;
}

.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
}

.avatar {
    width: 178px;
    height: 178px;
    display: block;
}
</style>