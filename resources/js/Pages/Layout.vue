<style></style>

<template>
    <div v-if="loadAuth" class="w-full">
        <!-- Side Menu -->
        <div
            class="md:right-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-no-wrap md:overflow-hidden shadow bg-white flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 px-6"
        >
            s
        </div>
        <!-- End Side Menu -->

        <!-- Left Part -->
        <div class="relative md:mr-64">
            <div class="h-16 w-full bg-white shadow mb-8 flex justify-end px-8">
                <img
                    :src="user.photo"
                    class="h-12 w-12 rounded-full my-2 mx-2"
                />
            </div>
            <router-view></router-view>
        </div>
        <!-- End Left Part -->
    </div>
    <div v-else></div>
</template>

<script>
import Swal from "sweetalert2";
export default {
    computed: {
        loadAuth() {
            return this.$store.state.loadAuth;
        },
        user() {
            return this.$store.state.user;
        }
    },
    beforeMount() {
        if (localStorage.getItem("token")) {
            Swal.showLoading();
            this.$store.dispatch("checkAuth").then(
                response => {
                    Swal.fire("نجاح", response.message, "success");
                    this.$store.commit("authLoaded");
                },
                error => {
                    if (error.status == 401) {
                        Swal.fire("فشل", error.message, "warning");
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
