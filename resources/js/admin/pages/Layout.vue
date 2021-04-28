<style></style>

<template>
    <div v-if="loadAuth" class="w-full">
        <!-- Side Menu -->
        <side-menu></side-menu>
        <!-- End Side Menu -->

        <!-- Left Part -->
        <div class="relative md:mr-64">
            <!-- Header Bar -->
            <header-bar></header-bar>
            <!-- End Header Bar -->
            <router-view></router-view>
        </div>
        <!-- End Left Part -->
    </div>
    <div v-else></div>
</template>

<script>
import Swal from "sweetalert2";
import sideMenu from "../components/shared/side-menu.vue";
export default {
    components: { sideMenu },
    computed: {
        loadAuth() {
            return this.$store.state.loadAuth;
        },
        user() {
            return this.$store.state.user;
        },
        auth() {
            return this.$store.state.auth;
        }
    },
    methods: {

    },
    mounted() {
        if (this.auth) {
        } else if (localStorage.getItem("token") && !this.auth) {
            Swal.showLoading();
            this.$store.dispatch("checkAuth").then(
                response => {
                    Swal.fire("نجاح", response.message, "success");
                    this.$store.commit("authLoaded");
                },
                error => {
                    if (error.status == 401) {
                        Swal.fire("فشل", error.response.data.message, "warning");
                        localStorage.removeItem("token");
                    } else if (error.status == 400) {
                        Swal.fire("فشل", error.message, "warning");
                    } else Swal.fire("فشل", error.message, "warning");
                    this.$router.push("/admin/login");
                    this.$store.commit("authLoaded");
                }
            );
        } else {
            this.$router.push("/admin/login");
        }
    }
};
</script>
