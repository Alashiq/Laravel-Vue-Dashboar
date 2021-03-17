<template>
    <div class="flex">
        <div
            class="grid md:grid-cols-2 lg:mx-auto md:my-48 my-20 bg-white shadow-lg rounded-lg lg:w-auto w-full mx-4"
        >
            <!-- Form -->
            <div class="lg:w-96">
                <div
                    class="h-48 flex items-center justify-center text-4xl font-medium"
                >
                    تسجيل الدخول
                </div>
                <div class="w-full h-24 flex items-center justify-center">
                    <div class="w-full mx-4">
                        <input
                            class="h-14 w-full border rounded px-3 text-xl"
                            v-model="formData.username"
                            v-on:change="validateUsername"
                            type="text"
                            placeholder="اسم المستخدم"
                        />
                        <div
                            class="h-6 text-sm text-red-400 mr-2 flex items-center"
                        >
                            {{ formValidate.username }}
                        </div>
                    </div>
                </div>
                <div class="w-full h-24 flex items-center justify-center">
                    <div class="w-full mx-4">
                        <input
                            class="h-14 w-full border rounded px-3 text-xl"
                            v-model="formData.password"
                            v-on:change="validatePassword"
                                            v-on:keyup.enter="login"
                            type="password"
                            placeholder="كلمة المرور"
                        />
                        <div
                            class="h-6 text-sm text-red-400 mr-2 flex items-center"
                        >
                            {{ formValidate.password }}
                        </div>
                    </div>
                </div>

                <div class="w-full h-24 flex items-center justify-center">
                    <div
                        class="w-56 h-14 bg-green-400 text-white flex items-center justify-center rounded shadow-lg text-xl font-medium cursor-pointer hover:bg-green-500"
                        @click="login"
                    >
                        تسجيل الدخول
                    </div>
                </div>

                <a
                    href="/"
                    class="text-red-400 hover:text-red-500 h-10 w-full my-6 text-lg font-medium underline flex items-center justify-center"
                >
                    الذهاب للموقع
                </a>
            </div>
            <!-- End Form  -->
            <!-- Left Side -->
            <div
                class="lg:w-96 md:h-auto h-96 bg-cover bg-center md:rounded-l-lg md:rounded-br-none rounded-b-lg flex items-center justify-center"
                style="background-image:url('https://coloredbrain.com/wp-content/uploads/2016/07/login-background.jpg');"
            >
                <div class="w-full mx-4">
                    <div class="text-2xl font-bold text-white text-center">
                        لوحة التحكم
                    </div>
                    <div class="h-6 w-full"></div>
                    <div class=" text-justify font-light text-gray-200">
                        من خلال هذه اللوحة يمكنك التحكم في الموقع بشكل كامل,
                        كذلك يمكنك اضافة مستخدمين للموقع ومتابعة رسائل العملاء
                    </div>
                    
                    <div class="w-full md:h-24"></div>
                </div>
            </div>
            <!-- End Left Side -->
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
            },
            formValidate: {
                username: "",
                password: ""
            }
        };
    },
    methods: {
        login: function() {
            this.validateUsername();
            this.validatePassword();
            if (
                this.formValidate.username != "" ||
                this.formValidate.password != ""
            )
                return 0;
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
        },
        validateUsername: function() {
            this.formValidate.username = "";
            if (this.formData.username.trim() == "") {
                this.formValidate.username = "لا يمكن ترك هذا الحقل فارغ";
                return 1;
            }
            if (this.formData.username.trim().length < 3) {
                this.formValidate.username =
                    "يجب ان يكون اسم المستخدم 3 أحرف أو اكثر";
                return 1;
            }
        },
        validatePassword: function() {
            this.formValidate.password = "";
            if (this.formData.password.trim() == "") {
                this.formValidate.password = "لا يمكن ترك هذا الحقل فارغ";
                return 1;
            }
            if (this.formData.password.trim().length < 6) {
                this.formValidate.password =
                    "يجب ان تكون كلمة المرور أكثر من 6 حرف وأرقام";
                return 1;
            }
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
