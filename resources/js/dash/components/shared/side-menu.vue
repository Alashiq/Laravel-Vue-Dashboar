<template>
    <div
        class="md:right-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-no-wrap md:overflow-hidden shadow bg-white flex flex-wrap items-center justify-between relative md:w-64 z-10"
    >
        <!-- Title Side Menu -->
        <div
            class="h-20 items-center w-full flex justify-center text-xl border-b font-medium"
        >
            لوحة التحكم
        </div>
        <!-- End Title Side Menu -->

        <!-- User Info -->
        <div
            class="h-32 w-full flex items-center px-3 justify-between border-b mb-4"
        >
            <div class="h-24 w-16">
                <img :src="user.photo" class="rounded-full h-16" />
                <div
                    class="rounded-full h-5 w-5 bg-white shadow-xl animate-ping  -mt-5 mr-12 flex items-center justify-center"
                >
                    <div
                        class="bg-green-500 h-4 w-4 rounded-full animate-ping"
                    ></div>
                </div>
                <div
                    class="rounded-full h-5 w-5 bg-white shadow-xl relative z-10 -mt-5 mr-12 flex items-center justify-center"
                >
                    <div class="bg-green-500 h-4 w-4 rounded-full"></div>
                </div>
            </div>
            <div>
                <div class="text-lg w-40 font-medium">{{ user.name }}</div>
                <div
                    class="flex items-center justify-center py-3 text-gray-700"
                >
                    <div @click="logout"
                        class="bg-white h-10 w-10 rounded-full shadow-1 mx-2 flex items-center justify-center cursor-pointer hover:text-red-400"
                    >
                        <i class="fas fa-sign-out-alt"></i>
                    </div>
                    <router-link to="/admin/profile"
                        class="bg-white h-10 w-10 rounded-full shadow-1 mx-2 flex items-center justify-center cursor-pointer hover:text-red-400"
                    >
                        <i class="fas fa-user-cog"></i>
                    </router-link>
                    <div class="h-10 w-6"></div>
                </div>
            </div>
        </div>
        <!-- User Info -->

        <router-link
            v-for="item in pageList"
            :key="item.id"
            :to="item.path"
            class="w-auto px-6 flex items-center justify-start text-gray-500 cairo hover:bg-gray-100 hover:text-red-400">
            <div v-if="item.active" class="h-12 my-1 text-lg flex items-center text-red-400">
                <i :class="item.icon+' ml-5 text-lg'"></i>
            {{ item.name }}
            </div>
            <div v-else class="h-12 my-1 text-lg flex items-center">
                <i :class="item.icon+' ml-5 text-lg'"></i>
            {{ item.name }}
            </div>
            </router-link
        >
    </div>
</template>

<script>
import Swal from "sweetalert2";
export default {
    data: function() {
        return {};
    },
    methods: {
                logout: function() {
            Swal.showLoading();

            this.$store.dispatch("logout").then(
                response => {
                    this.$router.push("/admin/login");
                    Swal.fire("نجاح", response.message, "success");
                    this.$store.commit("clearUser");
                    localStorage.removeItem("token");
                    axios.defaults.headers.common["Authorization"] = null;
                },
                error => {
                    this.$router.push("/admin/login");
                    Swal.fire("فشل", error.message, "warning");
                    localStorage.removeItem("token");
                    this.$store.commit("clearUser");
                    axios.defaults.headers.common["Authorization"] = null;
                }
            );
        }
    },
    computed: {
        pageList() {
            return this.$store.state.pageList;
        },
        user() {
            return this.$store.state.user;
        }
    }
};
</script>

<style></style>
