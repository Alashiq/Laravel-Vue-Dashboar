<template>
    <div class="w-auto md:p-8 p-4">
        <!-- Inside Page -->

        <!-- List Header -->

        <div class="flex justify-between w-full h-16 items-center">
            <div class="text-2xl font-semibold cairo text-gray-600">
                أدوار المشرفين
            </div>
            <router-link
                v-show="$parent.checkPermission('CreateRole') == true"
                to="/admin/role/new"
                class="rounded px-4 flex items-center cairo font-medium add-btn"
            >
                <span class="h-12 flex items-center">
                    <i class="fas fa-plus ml-4 text-lg"></i>
                    دور جديد
                </span>
            </router-link>
        </div>

        <div class="flex justify-between my-8"></div>
        <!-- End List Header -->

        <table class="w-full" v-if="loaded && roles.length != 0">
            <tr class="h-12 text-lg font-bold text-gray-600">
                <td class="w-12 text-center">#</td>
                <td class="sm:table-cell">اسم الدور</td>
                <td class="sm:table-cell">عدد المشرفين</td>
                <td class="sm:table-cell">الإجراءات</td>
                <!-- <td class="md:table-cell hidden">إمكانيات الصلاحية</td> -->
            </tr>

            <tr
                v-for="(item, index) in roles"
                :key="index"
                class="h-24 bg-white shadow-2 rounded-lg text-lg text-gray-600 font-medium  hover:bg-gray-50"
            >
                <td class="w-12 text-center rounded-r-lg">{{ item.id }}</td>

                <td class="rounded-l-lg">{{ item.name }}</td>
                <td class="rounded-l-lg">{{ item.admins_count }}</td>

                <td class=" rounded-l-lg h-20">
                    <router-link :to="'/admin/role/' + item.id">
                        <i
                            class="fas fa-eye px-4 py-2 see-btn rounded ml-2"
                        ></i>
                    </router-link>

                    <router-link
                        v-show="$parent.checkPermission('EditRole') == true"
                        :to="'/admin/role/' + item.id + '/edit'"
                    >
                        <i
                            class="far fa-edit px-4 py-2 cursor-pointer bg-green-400 hover:bg-green-500 shadow-one text-white rounded ml-2"
                        ></i>
                    </router-link>
                    <i
                        v-show="$parent.checkPermission('DeleteRole') == true"
                        v-if="item.admins_count == 0"
                        @click="deleteRole(item.id, index)"
                        class="far fa-trash-alt px-4 py-2 cursor-pointer bg-red-400 hover:bg-red-500 shadow-one text-white rounded ml-2"
                    ></i>
                </td>
            </tr>
        </table>

        <empty-box v-if="loaded && roles.length == 0"></empty-box>

        <!-- End Inside Page -->
    </div>
</template>

<script>
import Swal from "sweetalert2";
import { clearLogout } from "../logout.js";
export default {
    data() {
        return {
            roles: [],
            loaded: false
        };
    },
    methods: {
        deleteRole: function(id, index) {
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
                        .DeleteRole(id)
                        .then(response => {
                            this.$loading.Stop();
                            if (response.status == 200) {
                                this.roles.splice(index, 1);
                                this.$alert.Success(response.data.message);
                            } else if (response.status == 204) {
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
            .GetAllRoles()
            .then(response => {
                this.$loading.Stop();
                this.loaded = true;
                if (response.status == 200) {
                    this.roles = response.data.roleList;
                    this.$alert.Success(response.data.message);
                } else if (response.status == 204) {
                    this.$alert.Empty("تنبيه لا يوجد اي أدوار");
                }
            })
            .catch(error => {
                this.loaded = true;
                this.$loading.Stop();
                this.$alert.BadRequest(error.response);
            });
    },
    computed: {}
};
</script>

<style scoped></style>
