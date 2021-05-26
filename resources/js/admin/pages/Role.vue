<template>
    <div class="w-auto md:p-8 p-4">
        <!-- Inside Page -->

        <div
            class="w-full md:px-4 px-0 pb-8 pt-2 bg-white shadow-2 rounded-lg text-lg text-gray-600 font-medium"
            v-if="loaded && role.length != 0"
        >
            <!-- Table Header -->
            <div
                class="h-16 w-full border-b mb-2 px-4 flex items-center text-lg justify-between"
            >
                بيانات الدور

                <router-link
                    to="/admin/role/"
                    class="btn-color-one text-white w-36 h-12 rounded shadow-1 font-normal flex items-center justify-center cursor-pointer"
                >
                    أدوار المشرفين
                </router-link>
            </div>
            <!-- End Table Header -->

            <!-- Item -->
            <div class="w-full px-4 py-4">
                <div class="h-9 flex items-center text-gray-500 mr-2 text-sm">
                    إسم الدور
                </div>
                <div
                    class="h-12 rounded border border-gray-200 bg-gray-50 flex items-center px-4 text-lg"
                >
                    {{ role.name }}
                </div>
            </div>
            <!-- Item -->

            <div class=" border-b mx-4 px-2 py-2 mt-6 text-gray-500 text-sm">
                الصلاحيات
            </div>

            <!-- Grid -->
            <div class="bg-blue-600a grid lg:grid-cols-2">
                <!-- Item -->
                <div
                    class="w-full mx-2 my-2 flex items-center"
                    v-for="(item, index) in role.permissions"
                    :key="index"
                >
                    <div class="py-2 px-2 flex items-center">
                        <div
                            class="border rounded-xl h-9 w-9 flex items-center justify-center "
                        >
                            <div
                                v-if="item.state == true"
                                class="h-7 w-7 rounded-xl bg-green-500 text-white  flex items-center justify-center text-center"
                            >
                                <i class="fas fa-check"></i>
                            </div>
                            <div
                                v-else
                                class="h-7 w-7 rounded-xl bg-red-400 text-white  flex items-center justify-center text-center"
                            >
                                <i class="fas fa-times"></i>
                            </div>
                        </div>
                        <div class="mr-2">{{ item.description }}</div>
                    </div>
                </div>
                <!-- End Item -->
            </div>
            <!-- Grid -->

            <!-- Btn Action -->
            <div class="w-full h-16 mt-12 flex items-center justify-start">
                <div
                    v-show="$parent.checkPermission('DeleteRole') == true"
                    @click="deleteRole"
                    v-if="role.admins_count == 0"
                    class="h-12 px-6 mx-4 bg-red-400 hover:bg-red-500 flex items-center justify-center text-white shadow-lg rounded cursor-pointer"
                >
                    <i class="far fa-trash-alt ml-2"></i>
                    حذف
                </div>
                <router-link
                    v-show="$parent.checkPermission('EditRole') == true"
                    :to="'/admin/role/' + this.$route.params.id + '/edit'"
                    class="h-12 px-6 bg-green-400 hover:bg-green-500 flex items-center justify-center text-white shadow-lg rounded cursor-pointer"
                >
                    <i class="far fa-edit ml-2"></i>
                    تعديل
                </router-link>
            </div>
            <!-- End Btn Action -->
        </div>

        <empty-box
            v-if="loaded && role.length == 0"
            message="لا يوجد دور بهذا الرقم"
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
            role: [],
            loaded: false
        };
    },
    methods: {
        deleteRole: function() {
            Swal.fire({
                title: "هل أنت متأكد",
                text: "هل أنت متأكد من أنك تريد حذف هذا الدور !",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#16a085",
                cancelButtonColor: "#d33",
                confirmButtonText: "نعم قم بالحذف",
                cancelButtonText: "إلغاء"
            }).then(result => {
                if (result.isConfirmed) {
                    this.$loading.Start();
                    this.$http
                        .DeleteRole(this.$route.params.id)
                        .then(response => {
                            this.$loading.Stop();
                            if (response.status == 200) {
                                this.role = [];
                                this.$alert.Success(response.data.message);
                            } else if (response.status == 204) {
                                this.role = [];
                                this.$alert.Empty(
                                        "لم يعد هذا الدور متوفر, قد يكون شخص أخر قام بحذفه",
                                );
                            }
                        })
                        .catch(error => {
                            this.$loading.Stop();
                            this.$alert.BadRequest(error.response);
                        });
                }
            });
        }
    },
    mounted() {
        this.$store.commit("activePage", 4);

        this.$loading.Start();
        this.$http
            .GetRoleById(this.$route.params.id)
            .then(response => {
                this.$loading.Stop();
                this.loaded = true;
                if (response.status == 200) {
                    this.role = response.data.role;
                    this.$alert.Success(response.data.message);
                } else if (response.status == 204) {
                    this.$alert.Empty("هذا الدور غير موجود");
                }
            })
            .catch(error => {
                this.$loading.Stop();
                this.loaded = true;
                this.$alert.BadRequest(error.response);
            });
    },
    computed: {},
    created() {}
};
</script>
