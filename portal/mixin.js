let mixin = {
    created() {

    },
    methods: {
        alert(msg, type = '', showClose = true, duration=1500) {
            this.$message({
                showClose: showClose,
                message: msg,
                type: type,
                duration: duration
            });
        }
    }
}
export default mixin