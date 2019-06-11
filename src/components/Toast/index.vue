<template>
    <div class="global-toast-mask" v-if="show" @touchmove.prevent>
        <div class="global-toast-message">
            <img v-if="isLoading" src="http://img2-cloud.itouchtv.cn/upload/20170811/KkQ6d2APKR1502442659.gif" width="60" />
            <div>{{ message }}</div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'toast',

    data() {
        return {
            show: false,
            message: '加载中',
            isMask: false,
            isLoading: false
        };
    },

    methods: {
        init({ 
            message, timeout, mask, isLoading 
        } = {}) {
            if (this.show) {
                this.destroy();
            }

            this.isMask = mask === undefined ? true : mask;
            this.message = message || '加载中';
            this.timeout = timeout || 2000;
            this.isLoading = isLoading;
            document.body.appendChild(this.$el);
            this.show = true;

            if (this.timeout !== 'wait') {
                this.destroyTimeOut = setTimeout(() => {
                    this.destroy();
                }, this.timeout);
            }
            return this;
        },

        destroy() {
            this.show = false;
            this.destroyTimeOut = clearTimeout(this.destroyTimeOut);
            return this;
        }
    }

};
</script>
<style lang="stylus" scoped>
    .global-toast-mask {
        position: fixed;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        z-index: 100;
    }

    .global-toast-message {
        position: fixed;
        top: 50%;
        display: inline-block;
        background-color: #000;
        opacity: 0.8;
        color: #fff;
        font-size: 0.28rem;
        z-index: 999;
        text-align: center;
        padding: 0.133333rem;
        left: 50%;
        transform: translate(-50%, -50%);
        border-radius: 0.1rem;
        padding: 0.3rem 0.5rem;
        min-width: 1rem;
        max-width: 5rem;
    }

    .global-toast-message>img {
        margin: 0 auto;
    }
</style>