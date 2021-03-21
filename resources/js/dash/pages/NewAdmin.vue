<template>
    <div class="w-auto md:p-8 p-4">
        <!-- Inside Page -->

        <div
            class="w-full md:px-4 px-0 pb-8 pt-2 bg-white shadow-2 rounded-lg text-lg text-gray-600 font-medium"
        >
            <!-- Table Header -->
            <div
                class="h-16 w-full border-b mb-2 px-4 flex items-center text-lg justify-between"
            >
                إضافة مشرف

                <router-link
                    to="/admin/admin/"
                    class="btn-color-one text-white w-36 h-12 rounded shadow-1 font-normal flex items-center justify-center cursor-pointer"
                >
                    قائمة المشرفين
                </router-link>
            </div>
            <!-- End Table Header -->

            <!-- Grid -->
            <div class="bg-blue-600a grid lg:grid-cols-2">
                <!-- Item -->
                <div class="w-full px-4 py-4">
                    <div
                        class="h-9 flex items-center text-gray-500 mr-2 text-sm"
                    >
                        إسم المشرف
                    </div>
                    <input
                        v-model="formData.name"
                        v-on:change="validateName"
                        class="h-12 w-full rounded border border-gray-200 bg-gray-50 flex items-center px-4 text-lg"
                    />
                    <div
                        class="h-8 text-sm text-red-400 mr-2 flex items-center"
                    >
                        {{ formValidate.name }}
                    </div>
                </div>
                <!-- Item -->

                <!-- Item -->
                <div class="w-full px-4 py-4">
                    <div
                        class="h-9 flex items-center text-gray-500 mr-2 text-sm"
                    >
                        إسم الدخول
                    </div>
                    <input
                        v-model="formData.username"
                        v-on:change="validateUsername"
                        class="h-12 w-full rounded border border-gray-200 bg-gray-50 flex items-center px-4 text-lg"
                    />
                    <div
                        class="h-8 text-sm text-red-400 mr-2 flex items-center"
                    >
                        {{ formValidate.username }}
                    </div>
                </div>
                <!-- Item -->

                <!-- Item -->
                <div class="w-full px-4 py-4">
                    <div
                        class="h-9 flex items-center text-gray-500 mr-2 text-sm"
                    >
                        كلمة المرور
                    </div>
                    <input
                        v-model="formData.password"
                        v-on:change="validatePassword"
                        class="h-12 w-full rounded border border-gray-200 bg-gray-50 flex items-center px-4 text-lg"
                    />
                    <div
                        class="h-8 text-sm text-red-400 mr-2 flex items-center"
                    >
                        {{ formValidate.password }}
                    </div>
                </div>
                <!-- Item -->

                <!-- Item -->
                <div class="w-full px-4 py-4">
                    <div
                        class="h-9 flex items-center text-gray-500 mr-2 text-sm"
                    >
                        تأكيد كلمة المرور
                    </div>
                    <input
                        v-model="formData.confirmPassword"
                        v-on:change="validateConfirmPassword"
                        class="h-12 w-full rounded border border-gray-200 bg-gray-50 flex items-center px-4 text-lg"
                    />
                    <div
                        class="h-8 text-sm text-red-400 mr-2 flex items-center"
                    >
                        {{ formValidate.confirmPassword }}
                    </div>
                </div>
                <!-- Item -->
            </div>
            <!-- Grid -->

            <!-- Action Part -->
            <div class="flex items-center h-20 mx-4">
                <div
                    @click="addAdmin"
                    class="btn-color-one rounded shadow px-12 h-12 w-auto flex items-center justify-center text-white text-lg cursor-pointer"
                >
                    إضافة
                </div>
            </div>
            <!-- End Action Part -->
        </div>

        <!-- End Inside Page -->
    </div>
</template>

<script>
import { clearLogout } from "../logout.js";
import Swal from "sweetalert2";
export default {
    data() {
        return {
            formData: {
                name: "",
                username: "",
                password: "",
                confirmPassword: ""
            },
            formValidate: {
                name: "",
                username: "",
                password: "",
                confirmPassword: ""
            }
        };
    },
    methods: {
        addAdmin: function() {
            this.validateName();
            this.validateUsername();
            this.validatePassword();
            this.validateConfirmPassword();
            if (this.formValidate.name != "") return 0;
            if (this.formValidate.username != "") return 0;
            if (this.formValidate.password != "") return 0;
            if (this.formValidate.confirmPassword != "") return 0;
            Swal.showLoading();
            axios
                .post("/api/admin/admin",this.formData)
                .then(
                    response => {
                        Swal.fire("نجاح", response.data.message, "success");
                        this.formData.name = "";
                        this.formData.username = "";
                        this.formData.password = "";
                        this.formData.confirmPassword = "";
                    },
                    error => {
                        clearLogout(this.$store, this.$router, error.response);
                    }
                );
        },
        validateName: function() {
            this.formValidate.name = "";
            if (this.formData.name.trim() == "") {
                this.formValidate.name = "لا يمكن ترك هذا الحقل فارغ";
                return 1;
            }
            if (this.formData.name.trim().length < 5) {
                this.formValidate.name = "يجب ان يكون الإسم 5 أحرف أو اكثر";
                return 1;
            }
            if (this.formData.name.trim().length > 16) {
                this.formValidate.name = "يجب ان يكون الإسم أقل من 16 حرف";
                return 1;
            }
        },
        validateUsername: function() {
            this.formValidate.username = "";
            if (this.formData.username.trim() == "") {
                this.formValidate.username = "لا يمكن ترك هذا الحقل فارغ";
                return 1;
            }
            if (this.formData.username.trim().length < 5) {
                this.formValidate.username =
                    "يجب ان يكون إسم الدخول 5 أحرف أو اكثر";
                return 1;
            }
            if (this.formData.username.trim().length > 16) {
                this.formValidate.username =
                    "يجب ان يكون إسم الدخول أقل من 16 حرف";
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
                    "يجب ان تكون كلمة المرور أكثر من 6 أرقام ورموز";
                return 1;
            }
            if (this.formData.password.trim() != this.formData.password) {
                this.formValidate.password =
                    "يجب أن لا تحتوي كلمة المرور على اي فراغات";
                return 1;
            }
        },
        validateConfirmPassword: function() {
            this.formValidate.confirmPassword = "";
            if (this.formData.confirmPassword.trim() == "") {
                this.formValidate.confirmPassword =
                    "لا يمكن ترك هذا الحقل فارغ";
                return 1;
            }
            if (this.formData.confirmPassword != this.formData.password) {
                this.formValidate.confirmPassword =
                    "يجب ان يتطابق كلمة المرور الجديدة مع تأكيد كلمة المرور";
                return 1;
            }
        }
    },
    mounted() {
        this.$store.commit("activePage", 3);
    },
    computed: {},
    created() {}
};
</script>

<style scoped></style>
