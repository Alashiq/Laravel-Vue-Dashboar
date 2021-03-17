<template>
    <div class="bg-blue-100 w-auto md:p-8 p-4">
        <div class="bg-red-400 h-96 w-32"></div>
        <div class="bg-green-400 h-96 w-32"></div>
        <div class="bg-blue-400 h-96 w-32"></div>
        <div class="bg-red-400 h-96 w-32"></div>
    </div>
</template>

<script>
import Swal from "sweetalert2";
export default {
    data() {
        return {};
    },
    methods: {},
    mounted() {
        this.$store.commit("activePage", 1);
    },
    computed: {},
    created() {}
};
</script>
