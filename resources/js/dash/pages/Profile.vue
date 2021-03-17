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

                <div
                    class="btn-color-one cursor-pointer h-12 w-40 rounded  text-lg shadow-1 md:mr-12 md:ml-0 md:mt-0 mt-4 mx-auto text-white flex items-center justify-center"
                >
                    <i class="fas fa-upload ml-4"></i>
                    إختر صورة
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
                    <input
                        type="text"
                        class="border rounded h-12 lg:w-96 w-full px-4 text-lg text-gray-700"
                        v-model="formData.name"
                    />
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
                    <input
                        type="text"
                        class="border rounded h-12 lg:w-96 w-full px-4 text-lg text-gray-700"
                        v-model="formData.oldPassword"
                    />
                </div>

                <div class="mt-4 lg:h-16 lg:flex items-center">
                    <div class="md:w-48 h-8 text-lg text-gray-600">
                        كلمة المرور الجديدة
                    </div>
                    <input
                        type="text"
                        class="border rounded h-12 lg:w-96 w-full px-4 text-lg text-gray-700"
                        v-model="formData.newPassword"
                    />
                </div>

                <div class="mt-4 lg:h-16 lg:flex items-center">
                    <div class="md:w-48 h-8 text-lg text-gray-600">
                        تأكيد كلمة المرور
                    </div>
                    <input
                        type="text"
                        class="border rounded h-12 lg:w-96 w-full px-4 text-lg text-gray-700"
                        v-model="formData.confirmPassword"
                    />
                </div>

                <div class="flex items-center h-20">
                    <div
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
import Swal from "sweetalert2";
export default {
    data() {
        return {
            formData: {
                name: "",
                oldPassword: "",
                newPassword: "",
                confirmPassword: ""
            }
        };
    },
    methods: {
        changeName: function() {
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
                        if (error.response.status == 401) {
                            Swal.fire(
                                "فشل",
                                "انتهت الجلسة الخاصة بك قم بعمل تسجيل دخول مجددا",
                                "warning"
                            );
                            this.$router.push("/admin/login");
                            localStorage.removeItem("token");
                        } else Swal.fire("فشل", "حدث خطأ ما", "warning");
                    }
                );
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
