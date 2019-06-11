<template>
    <div :class="$style.layout">
        Page2
        <div>{{downloadConfig}}</div>
    </div>
</template>

<script>

import { mapGetters, mapActions } from 'vuex';

export default {
    name: 'page2',
    data: function () {
        return {
            timer: null
        };
    },

    computed: {
        ...mapGetters({
            downloadConfig: 'downloadConfig'
        })
    },

    mounted() {
        this.getReport();
    },

    methods: {
        ...mapActions({
            getReport: 'getReport'
        })
    },

};
</script>

<style lang="stylus" module>
    @import '../../statics/css/global.css'
    @import './page2.less'
</style>

