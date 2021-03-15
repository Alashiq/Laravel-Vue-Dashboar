<template>
    <div>
        <div class="w-full text-5xl text-center my-20 text-red-500">
            welcome {{ user.name }}
        </div>

        <div
            class="w-40 h-20 flex items-center justify-center bg-red-400 text-white"
            @click="checkAuth"
        >
            check Auth
        </div>

        <router-link
            to="/admin"
            class="bg-blue-400 text-white px-2 py-2 rounded shadow"
        >
            home
        </router-link>

        <router-link
            to="/admin/login"
            class="bg-blue-400 text-white px-2 py-2 rounded shadow"
        >
            login
        </router-link>
    </div>
</template>

<script>
import Swal from "sweetalert2";
export default {
    data() {
        return {};
    },
    methods: {
        checkAuth: function() {
            Swal.showLoading();
            axios.get("/api/admin/auth").then(
                response => {
                    Swal.fire("نجاح", response.data.message, "success");
                },
                error => {
                    Swal.fire("فشل", error.response.data.message, "warning");
                }
            );
        }
    },
    mounted() {},
    computed: {
        user() {
            return this.$store.state.user;
        },
    },
    created() {
    }
};
</script>
