<template>
    <div class=" h-full w-full bg-blue-200 flex">
        <div class="h-96 w-96 mx-auto bg-white my-12 shadow-lg rounded px-4">
            <input
                class="h-10 w-full border my-12 rounded px-3 text-xl"
                v-model="formData.username"
                type="text"
                placeholder="اسم المستخدم"
            />
            <input
                class="h-10 w-full border my-12 rounded px-3 text-xl"
                v-model="formData.password"
                type="text"
                placeholder="كلمة المرور"
            />
            {{ auth }}
            <div
                class="w-40 h-12 bg-red-400 text-white rounded shadow-lg text-center"
                @click="login"
            >
                تسجيل الدخول
            </div>
        </div>
    </div>
</template>

<script>
import Swal from "sweetalert2";
export default {
    data() {
        return {
            formData: {
                username: "",
                password: ""
            }
        };
    },
    methods: {
        login: function() {
            Swal.showLoading();
            this.$store.dispatch("login", this.formData).then(
                response => {
                    Swal.fire("نجاح", response.message, "success");
                    this.$router.push("/admin");
                },
                error => {
                    if (error.status == 401) {
                        Swal.fire("فشل", error.message, "warning");
                    } else if (error.status == 400) {
                        Swal.fire("فشل", error.message, "warning");
                    } else Swal.fire("فشل", error.message, "warning");
                }
            );
        }
    },
    computed: {
        loadAuth() {
            return this.$store.state.loadAuth;
        },
        auth() {
            return this.$store.state.auth;
        }
    },
    mounted() {
        if (this.auth) {
            this.$router.push("/admin");
        } else if (localStorage.getItem("token") && !this.loadAuth) {
            Swal.showLoading();
            this.$store.dispatch("checkAuth").then(
                response => {
                    Swal.fire("نجاح", response.message, "success");
                    this.$store.commit("authLoaded");
                    this.$router.push("/admin");
                },
                error => {
                    if (error.status == 401) {
                        Swal.fire("فشل", error.message, "warning");
                        localStorage.removeItem("token");
                    } else if (error.status == 400) {
                        Swal.fire("فشل", error.message, "warning");
                    } else Swal.fire("فشل", error.message, "warning");
                    this.$store.commit("authLoaded");
                }
            );
        }
    },
    created() {}
};
</script>
