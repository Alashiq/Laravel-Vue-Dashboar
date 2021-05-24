<template>
    <div class="w-auto md:p-8 p-4">
        <!-- Inside Page -->

        <div
            class="w-full md:px-4 px-0 pb-8 pt-2 bg-white shadow-2 rounded-lg text-lg text-gray-600 font-medium"
            v-if="loaded && admin.length != 0"
        >
            <!-- Table Header -->
            <div
                class="h-16 w-full border-b mb-2 px-4 flex items-center text-lg justify-between"
            >
                بيانات المشرف

                <router-link
                    to="/admin/admin/"
                    class="btn-color-one text-white w-36 h-12 rounded shadow-1 font-normal flex items-center justify-center cursor-pointer"
                >
                    قائمة المشرفين
                </router-link>
            </div>
            <!-- End Table Header -->

            <!-- Admin Photo -->
            <div class="w-full px-4 py-4">
                <img
                    :src="admin.photo"
                    class="h-48 w-48 mx-auto rounded-full"
                />
            </div>
            <!-- Admin Photo -->

            <!-- Grid -->
            <div class="bg-blue-600a grid lg:grid-cols-2 md:grid-cols-2">
                <!-- Item -->
                <div class="w-full px-4 py-4">
                    <div
                        class="h-9 flex items-center text-gray-500 mr-2 text-sm"
                    >
                        إسم المشرف
                    </div>
                    <div
                        class="h-12 rounded border border-gray-200 bg-gray-50 flex items-center px-4 text-lg"
                    >
                        {{ admin.name }}
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
                    <div
                        class="h-12 rounded border border-gray-200 bg-gray-50 flex items-center px-4 text-lg"
                    >
                        {{ admin.username }}
                    </div>
                </div>
                <!-- Item -->

                <!-- Item -->
                <div class="w-full px-4 py-4">
                    <div
                        class="h-9 flex items-center text-gray-500 mr-2 text-sm"
                    >
                        دور المشرف
                    </div>
                    <div
                        class="h-12 rounded border border-gray-200 bg-gray-50 flex items-center px-4 text-lg"
                    >
                        {{ admin.role.name }}
                    </div>
                </div>
                <!-- Item -->

                <!-- Item -->
                <div class="w-full px-4 py-4">
                    <div
                        class="h-9 flex items-center text-gray-500 mr-2 text-sm"
                    >
                        تاريخ الإنشاء
                    </div>
                    <div
                        class="h-12 rounded border border-gray-200 bg-gray-50 flex items-center px-4 text-lg"
                    >
                        {{ admin.created_at.substring(0, 10) }}
                    </div>
                </div>
                <!-- Item -->

                <!-- Item -->
                <div class="w-full px-4 py-4">
                    <div
                        class="h-9 flex items-center text-gray-500 mr-2 text-sm"
                    >
                        حالة الحساب
                    </div>
                    <div
                        class="h-12 rounded border border-gray-200 bg-gray-50 flex items-center px-4 text-lg"
                    >
                        {{
                            admin.state == 0
                                ? "غير مفعل"
                                : admin.state == 1
                                ? "حساب نشط"
                                : "محظور"
                        }}
                    </div>
                </div>
                <!-- Item -->
            </div>
            <!-- Grid -->

            <!-- Btn Action -->
            <div
                class="w-full lg:h-20 mt-12 lg:flex items-center justify-start"
            >
                <div
                    v-show="
                        $parent.checkPermission('ResetPasswordAdmin') == true
                    "
                    v-if="admin.state != 2"
                    @click="resetPassword"
                    class="h-12 px-6 mx-4 my-2 bg-blue-400 hover:bg-blue-500 flex items-center justify-center text-white shadow-lg rounded cursor-pointer"
                >
                    <i class="fas fa-fingerprint ml-2"></i>
                    تهيئة كلمة المرور
                </div>
                <div
                    v-show="$parent.checkPermission('ActiveAdmin') == true"
                    v-if="admin.state == 0"
                    @click="activeAdmin"
                    class="h-12 px-6 mx-4  md:mx-0 my-2 bg-green-400 hover:bg-green-500 flex items-center justify-center text-white shadow-lg rounded cursor-pointer"
                >
                    <i class="fas fa-lock-open ml-2"></i>
                    تفعيل الحساب
                </div>
                <div
                    v-show="$parent.checkPermission('DisActiveAdmin') == true"
                    v-else-if="admin.state == 1"
                    @click="disActiveAdmin"
                    class="h-12 px-6 mx-4 my-2 bg-yellow-400 hover:bg-yellow-500 flex items-center justify-center text-white shadow-lg rounded cursor-pointer"
                >
                    <i class="fas fa-lock ml-2"></i>
                    إلغاء تفعيل الحساب
                </div>
                <div
                    v-show="$parent.checkPermission('BannedAdmin') == true"
                    v-if="admin.state != 2"
                    @click="bannedAdmin"
                    class="h-12 px-6 mx-4 my-2 bg-red-400 hover:bg-red-500 flex items-center justify-center text-white shadow-lg rounded cursor-pointer"
                >
                    <i class="fas fa-user-slash ml-2"></i>
                    حظر الحساب
                </div>

                <router-link
                    v-show="$parent.checkPermission('EditRoleAdmin') == true"
                    :to="'/admin/admin/' + $route.params.id + '/edit'"
                    class="h-12 px-6 mx-4 bg-gray-400 hover:bg-gray-500 flex items-center justify-center text-white shadow-lg rounded cursor-pointer"
                >
                    <i class="fas fa-user-shield ml-2"></i>
                    تعديل دور المشرف
                </router-link>
            </div>
            <!-- End Btn Action -->
        </div>

        <empty-box
            v-if="loaded && admin.length == 0"
            message="لا يوجد مشرف بهذا الرقم"
        ></empty-box>

        <!-- End Inside Page -->
    </div>
</template>

<script>
import { clearLogout } from "../logout.js";
import Swal from "sweetalert2";
export default {
    data() {
        return {
            admin: [],
            loaded: false
        };
    },
    methods: {
        activeAdmin: function() {
            Swal.fire({
                title: "هل أنت متأكد",
                text: "هل أنت متأكد من أنك تريد تفعيل هذا الحساب !",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#16a085",
                cancelButtonColor: "#d33",
                confirmButtonText: "نعم تفعيل",
                cancelButtonText: "إلغاء"
            }).then(result => {
                if (result.isConfirmed) {

                this.$loading.Start(this.$store);
                this.$http.ActiveAdmin(this.$route.params.id)
                .then(response => {
                        this.$loading.Stop(this.$store);
                        if (response.status == 200) {
                            this.admin.state = 1;
                            this.$alert.Success(response.data.message);
                        } else if (response.status == 204) {
                            this.admin = [];
                            this.$alert.Empty(
                                "لم يعد هذا الحساب متوفرة, قد يكون شخص أخر قام بحذفه"
                            );
                        }
                    })
                    .catch(error => {
                        this.$loading.Stop(this.$store);
                        this.$alert.BadRequest(error.response,this.$router,this.$store);
                    });

                }
            });
        },
        disActiveAdmin: function() {
            Swal.fire({
                title: "هل أنت متأكد",
                text: "هل أنت متأكد من أنك تريد الغاء تفعيل هذا الحساب !",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#16a085",
                cancelButtonColor: "#d33",
                confirmButtonText: "نعم إلغاء التفعيل",
                cancelButtonText: "إلغاء"
            }).then(result => {
                if (result.isConfirmed) {


                this.$loading.Start(this.$store);
                this.$http.DisActiveAdmin(this.$route.params.id)
                .then(response => {
                        this.$loading.Stop(this.$store);
                        if (response.status == 200) {
                            this.admin.state = 0;
                            this.$alert.Success(response.data.message);
                        } else if (response.status == 204) {
                            this.admin = [];
                            this.$alert.Empty(
                                "لم يعد هذا الحساب متوفرة, قد يكون شخص أخر قام بحذفه"
                            );
                        }
                    })
                    .catch(error => {
                        this.$loading.Stop(this.$store);
                        this.$alert.BadRequest(error.response,this.$router,this.$store);
                    });

                }
            });
        },
        bannedAdmin: function() {
            Swal.fire({
                title: "هل أنت متأكد",
                text:
                    "هل أنت متأكد من أنك تريد حظر هذا الحساب ؟ إذا قمت بحظر الحساب فلا يمكنك استخدامه مجددا",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#16a085",
                cancelButtonColor: "#d33",
                confirmButtonText: "نعم حظر الحساب",
                cancelButtonText: "إلغاء"
            }).then(result => {
                if (result.isConfirmed) {

                this.$loading.Start(this.$store);
                this.$http.BannedAdmin(this.$route.params.id)
                .then(response => {
                        this.$loading.Stop(this.$store);
                        if (response.status == 200) {
                            this.admin.state = 2;
                            this.$alert.Success(response.data.message);
                        } else if (response.status == 204) {
                            this.admin = [];
                            this.$alert.Empty(
                                "لم يعد هذا الحساب متوفرة, قد يكون شخص أخر قام بحذفه"
                            );
                        }
                    })
                    .catch(error => {
                        this.$loading.Stop(this.$store);
                        this.$alert.BadRequest(error.response,this.$router,this.$store);
                    });
                }
            });
        },
        resetPassword: function() {
            Swal.fire({
                title: "هل أنت متأكد",
                text: "سيتم تغيير كلمة المرور لتصبح 123456",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#16a085",
                cancelButtonColor: "#d33",
                confirmButtonText: "نعم تغيير",
                cancelButtonText: "إلغاء"
            }).then(result => {
                if (result.isConfirmed) {

                this.$loading.Start(this.$store);
                this.$http.ResetAdminPassword(this.$route.params.id)
                .then(response => {
                        this.$loading.Stop(this.$store);
                        if (response.status == 200) {
                            this.$alert.Success(response.data.message);
                        } else if (response.status == 204) {
                            this.admin = [];
                            this.$alert.Empty(
                                "لم يعد هذا الحساب متوفرة, قد يكون شخص أخر قام بحذفه"
                            );
                        }
                    })
                    .catch(error => {
                        this.$loading.Stop(this.$store);
                        this.$alert.BadRequest(error.response,this.$router,this.$store);
                    });
                }
            });
        }
    },
    mounted() {
        this.$store.commit("activePage", 3);

        this.$loading.Start(this.$store);
        this.$http.GetAdminById(this.$route.params.id)
            .then(response => {
                this.$loading.Stop(this.$store);
                this.loaded = true;
                if (response.status == 200) {
                    this.admin = response.data.data;
                    this.$alert.Success(response.data.message);
                } else if (response.status == 204) {
                    this.$alert.Empty("هذه الرسالة غير متوفرة");
                }
            })
            .catch(error => {
                this.$loading.Stop(this.$store);
                this.loaded = true;
                this.$alert.BadRequest(error.response,this.$router,this.$store);
            });

    },
    computed: {},
    created() {}
};
</script>

<style scoped>
table {
    border-collapse: separate;
    border-spacing: 0 1em;
}
</style>
