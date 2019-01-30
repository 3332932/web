<!--代码生成工具移动端代码-->
<!--template-->
<template>
    <div>

        <el-upload class="avatar-uploader image-user" 
        :action="uploadActionUrl"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload">
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <div class="footer-ls">{{$t('user.imgTips')}}</div>
    </div>
</template>
<!--script-->
<script>
import {getUploadImageUrl, getUserImageUrl} from '~/api.js'
export default{
    data(){
        let uploadActionUrl = getUploadImageUrl();
        let imageUrl = getUserImageUrl()
        return {
            uploadActionUrl: uploadActionUrl,
            imageUrl: imageUrl
        }
    },
    methods:{
        handleAvatarSuccess(res, file) {
            if(res.flag.retCode != '0'){
                this.$message.error(res.flag.retMsg)
            }else{
                this.imageUrl = getUserImageUrl()
                this.$store.commit('updateUserImage',this.imageUrl)
                this.$forceUpdate()
                this.$message.success(this.$t('user.imgMsg'))
            }
        },
        beforeAvatarUpload(file) {
            const isJPG = (file.type === 'image/jpeg' || file.type === 'image/png');
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
                this.$message.error(this.$t('user.uperror[0]'));
            }
            if (!isLt2M) {
                this.$message.error(this.$t('user.uperror[1]'));
            }
            return isJPG && isLt2M;
        },
    }
}
</script>
<!--less-->
<style lang="less" scoped>
.image-user {
    text-align: center;
    padding: 10px;
}
.footer-ls{
    text-align: center;
    margin-top: -5px;
    padding-bottom: 10px;
    font-size: 12px
}
</style>