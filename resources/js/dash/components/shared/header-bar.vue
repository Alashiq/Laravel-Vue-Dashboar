<template>
    <div class="h-16 w-full bg-white shadow mb-8 flex justify-end items-center px-8">
        <div>{{user.name}}</div>
        <img :src="user.photo" class="h-10 w-10 rounded-full mx-2" />
    </div>
</template>

<script>
export default {
    data: function() {
        return {};
    },
    methods: {},
    computed: {
        user() {
            return this.$store.state.user;
        }
    }
};
</script>

<style></style>
