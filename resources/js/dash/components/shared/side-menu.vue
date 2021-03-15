<template>
    <div
        class="md:right-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-no-wrap md:overflow-hidden shadow bg-white flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4"
    >
        <div
            class="h-24 w-full flex items-center justify-center text-2xl border-b"
        >
            لوحة التحكم
        </div>

        <router-link
            v-for="item in pageList"
            :key="item.id"
            :to="item.path"
            class="w-full border-b h-12 flex items-center justify-center"
            >{{ item.name }}</router-link
        >
    </div>
</template>

<script>
export default {
    data: function() {
        return {};
    },
    methods: {},
    computed: {
        pageList() {
            return this.$store.state.pageList;
        }
    }
};
</script>

<style></style>
