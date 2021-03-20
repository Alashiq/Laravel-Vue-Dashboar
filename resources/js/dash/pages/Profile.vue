<template>
    <div class="w-auto md:p-8 p-4">
        <!-- Inside Page -->

        <div class="w-full bg-white shadow-2 lg:px-8 md:px-6 px-4 py-4">
            <div
                class="text-2xl font-bold h-20 flex items-center justify-start border-b"
            >
                الملف الشخصي
            </div>

            <!-- User Photo -->
            <div class="md:flex items-center my-8">
                <img
                    class="h-52 w-52 border md:mx-px mx-auto"
                    :src="user.photo"
                />

                <!-- Input File -->
                <div
                    class="h-16 w-32 bg-blue-200 md:mr-4 md:ml-0 md:my-0 mx-auto my-4"
                >
                    <input
                        type="file"
                        v-on:change="onChange"
                        class="cursor-pointer absolute block h-16 w-32 opacity-0 pin-r pin-t"
                    />
                    <span
                        class="ml-2 bg-blue-400 h-16 w-32 text-white flex items-center justify-center rounded shadow cursor-pointer hover:bg-blue-500 text-lg"
                    >
                        <i class="fas fa-folder-plus ml-2"></i>
                        إختر الصورة</span
                    >
                </div>
                <!-- End Input File -->
            </div>
            <div class="flex items-center h-20">
                <div
                    @click="changePhoto"
                    class="btn-color-one rounded shadow px-12 h-12 w-auto flex items-center justify-center text-white text-lg cursor-pointer"
                >
                    تحديث
                </div>
            </div>
            <!-- End User Photo -->

            <!-- User Information -->
            <div class=" border-b border-t">
                <div class="text-2xl text-gray-600 font-medium mt-12">
                    البيانات الشخصية
                </div>
                <div class="mt-4 lg:h-16 lg:flex items-center">
                    <div class="md:w-48 h-8 text-lg text-gray-600">
                        إسم المستخدم
                    </div>
                    <div class="16">
                        <input
                            type="text"
                            class="border rounded h-12 lg:w-96 w-full px-4 text-lg text-gray-700"
                            v-on:change="validateName"
                            v-model="formData.name"
                        />
                        <div
                            class="h-6 text-sm text-red-400 mr-2 flex items-center"
                        >
                            {{ formValidate.name }}
                        </div>
                    </div>
                </div>

                <div class="mt-4 lg:h-16 lg:flex items-center">
                    <div class="md:w-48 h-8 text-lg text-gray-600">
                        إسم الدخول
                    </div>
                    <div
                        class="border rounded h-12 lg:w-96 w-full px-4 text-lg text-gray-700 flex items-center bg-gray-100"
                    >
                        {{ user.username }}
                    </div>
                </div>

                <div class="flex items-center h-20">
                    <div
                        @click="changeName"
                        class="btn-color-one rounded shadow px-12 h-12 w-auto flex items-center justify-center text-white text-lg cursor-pointer"
                    >
                        تحديث
                    </div>
                </div>
            </div>
            <!-- End User Information -->

            <!-- Change Password -->
            <div>
                <div class="text-2xl text-gray-600 font-medium mt-12">
                    تغيير كلمة المرور
                </div>
                <div class="mt-4 lg:h-16 lg:flex items-center">
                    <div class="md:w-48 h-8 text-lg text-gray-600">
                        كلمة المرور الحالية
                    </div>
                    <div class="16">
                        <input
                            type="password"
                            class="border rounded h-12 lg:w-96 w-full px-4 text-lg text-gray-700"
                            v-on:change="validateOldPassword"
                            v-model="formData.oldPassword"
                        />
                        <div
                            class="h-6 text-sm text-red-400 mr-2 flex items-center"
                        >
                            {{ formValidate.oldPassword }}
                        </div>
                    </div>
                </div>

                <div class="mt-4 lg:h-16 lg:flex items-center">
                    <div class="md:w-48 h-8 text-lg text-gray-600">
                        كلمة المرور الجديدة
                    </div>
                    <div class="16">
                        <input
                            type="password"
                            class="border rounded h-12 lg:w-96 w-full px-4 text-lg text-gray-700"
                            v-on:change="validateNewPassword"
                            v-model="formData.newPassword"
                        />
                        <div
                            class="h-6 text-sm text-red-400 mr-2 flex items-center"
                        >
                            {{ formValidate.newPassword }}
                        </div>
                    </div>
                </div>

                <div class="mt-4 lg:h-16 lg:flex items-center">
                    <div class="md:w-48 h-8 text-lg text-gray-600">
                        تأكيد كلمة المرور
                    </div>
                    <div class="16">
                        <input
                            type="password"
                            class="border rounded h-12 lg:w-96 w-full px-4 text-lg text-gray-700"
                            v-on:change="validateConfirmPassword"
                            v-model="formData.confirmPassword"
                        />
                        <div
                            class="h-6 text-sm text-red-400 mr-2 flex items-center"
                        >
                            {{ formValidate.confirmPassword }}
                        </div>
                    </div>
                </div>

                <div class="flex items-center h-20">
                    <div
                        @click="changePassword"
                        class="btn-color-one rounded shadow px-12 h-12 w-auto flex items-center justify-center text-white text-lg cursor-pointer"
                    >
                        تحديث
                    </div>
                </div>
            </div>
            <!-- End Change Password -->
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
                file: "",
                name: "",
                oldPassword: "",
                newPassword: "",
                confirmPassword: ""
            },
            formValidate: {
                name: "",
                oldPassword: "",
                newPassword: "",
                confirmPassword: ""
            }
        };
    },
    methods: {
        onChange(e) {
            this.formData.file = e.target.files[0];
        },
        changePhoto: function() {
            Swal.showLoading();
            const config = {
                headers: {
                    "content-type": "multipart/form-data"
                }
            };
            let data = new FormData();
            data.append("file", this.formData.file);

            axios.post("/api/admin/photo", data, config).then(
                response => {
                    this.$store.commit("updatePhoto", response.data.photo);
                    Swal.fire("نجاح", response.data.message, "success");
                },
                error => {
                    clearLogout(
                                    this.$store,
                                    this.$router,
                                    error.response.status
                                );
                }
            );
        },
        changeName: function() {
            if (this.user.name == this.formData.name.trim()) {
                this.formValidate.name = "لم تقم بإدخال اي اسم جديد";
                return 0;
            }
            this.validateName();
            if (this.formValidate.name != "") return 0;
            Swal.showLoading();
            axios
                .put("/api/admin", {
                    name: this.formData.name
                })
                .then(
                    response => {
                        Swal.fire("نجاح", response.data.message, "success");
                        this.$store.commit("updateName", this.formData.name);
                    },
                    error => {
                        clearLogout(
                                    this.$store,
                                    this.$router,
                                    error.response.status
                                );
                    }
                );
        },
        changePassword: function() {
            this.validateOldPassword();
            this.validateNewPassword();
            this.validateConfirmPassword();
            if (this.formValidate.oldPassword != "") return 0;
            if (this.formValidate.newPassword != "") return 0;
            if (this.formValidate.confirmPassword != "") return 0;
            Swal.showLoading();
            axios
                .put("/api/admin", {
                    oldPassword: this.formData.oldPassword,
                    newPassword: this.formData.newPassword
                })
                .then(
                    response => {
                        Swal.fire("نجاح", response.data.message, "success");
                        this.formData.oldPassword = "";
                        this.formData.newPassword = "";
                        this.formData.confirmPassword = "";
                    },
                    error => {
                        clearLogout(
                                    this.$store,
                                    this.$router,
                                    error.response.status
                                );
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
                this.formValidate.name =
                    "يجب ان يكون الإسم اكثر 5 أحرف أو اكثر";
                return 1;
            }
            if (this.formData.name.trim().length > 16) {
                this.formValidate.name = "يجب ان يكون الإسم أقل من 16";
                return 1;
            }
        },
        validateOldPassword: function() {
            this.formValidate.oldPassword = "";
            if (this.formData.oldPassword.trim() == "") {
                this.formValidate.oldPassword = "لا يمكن ترك هذا الحقل فارغ";
                return 1;
            }
            if (this.formData.oldPassword.trim().length < 6) {
                this.formValidate.oldPassword =
                    "يجب ان تكون كلمة المرور أكثر من 6 أرقام ورموز";
                return 1;
            }
        },
        validateNewPassword: function() {
            this.formValidate.newPassword = "";
            if (this.formData.newPassword.trim() == "") {
                this.formValidate.newPassword = "لا يمكن ترك هذا الحقل فارغ";
                return 1;
            }
            if (this.formData.newPassword.trim().length < 6) {
                this.formValidate.newPassword =
                    "يجب ان تكون كلمة المرور أكثر من 6 أرقام ورموز";
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
            if (this.formData.confirmPassword != this.formData.newPassword) {
                this.formValidate.confirmPassword =
                    "يجب ان يتطابق كلمة المرور الجديدة مع تأكيد كلمة المرور";
                return 1;
            }
        }
    },
    mounted() {
        this.$store.commit("activePage", 0);
        this.formData.name = this.user.name;
    },
    computed: {
        user() {
            return this.$store.state.user;
        }
    },
    created() {}
};
</script>
