<template>
    <div class="w-auto md:p-8 p-4">
        <!-- Inside Page -->

        <div
            class="w-full md:px-4 px-0 pb-8 pt-2 bg-white shadow-2 rounded-lg text-lg text-gray-600 font-medium"
            v-if="loaded && message.length != 0"
        >
            <!-- Table Header -->
            <div
                class="h-16 w-full border-b mb-2 px-4 flex items-center text-lg justify-between"
            >
                الرسائل الواردة

                <router-link
                    to="/admin/message/"
                    class="bg-green-400 hover:bg-green-500 text-white w-32 h-12 rounded-lg shadow flex items-center justify-center cursor-pointer"
                >
                    كل الرسائل
                </router-link>
            </div>
            <!-- End Table Header -->

            <!-- Grid -->
            <div class="bg-blue-600a grid lg:grid-cols-3 md:grid-cols-2">
                <!-- Item -->
                <div class="w-full px-4 py-4">
                    <div
                        class="h-9 flex items-center text-gray-500 mr-2 text-sm"
                    >
                        إسم المرسل
                    </div>
                    <div
                        class="h-12 rounded border border-gray-200 bg-gray-50 flex items-center px-4 text-lg"
                    >
                        {{ message.name }}
                    </div>
                </div>
                <!-- Item -->

                <!-- Item -->
                <div class="w-full px-4 py-4">
                    <div
                        class="h-9 flex items-center text-gray-500 mr-2 text-sm"
                    >
                        رقم الهاتف
                    </div>
                    <div
                        class="h-12 rounded border border-gray-200 bg-gray-50 flex items-center px-4 text-lg"
                    >
                        {{ !message.phone ? "لم يتم الإدخال" : message.phone }}
                    </div>
                </div>
                <!-- Item -->

                <!-- Item -->
                <div class="w-full px-4 py-4">
                    <div
                        class="h-9 flex items-center text-gray-500 mr-2 text-sm"
                    >
                        البريد الإلكتروني
                    </div>
                    <div
                        class="h-12 rounded border border-gray-200 bg-gray-50 flex items-center px-4 text-lg"
                    >
                        {{ !message.email ? "لم يتم الإدخال" : message.email }}
                    </div>
                </div>
                <!-- Item -->

                <!-- Item -->
                <div class="w-full px-4 py-4">
                    <div
                        class="h-9 flex items-center text-gray-500 mr-2 text-sm"
                    >
                        موجهة إلى
                    </div>
                    <div
                        class="h-12 rounded border border-gray-200 bg-gray-50 flex items-center px-4 text-lg"
                    >
                     {{ !message.receiver ? "لم يتم الإدخال" : message.receiver.name }}
                    </div>
                </div>
                <!-- Item -->

                <!-- Item -->
                <div class="w-full px-4 py-4">
                    <div
                        class="h-9 flex items-center text-gray-500 mr-2 text-sm"
                    >
                        بتاريخ
                    </div>
                    <div
                        class="h-12 rounded border border-gray-200 bg-gray-50 flex items-center px-4 text-lg"
                    >
                        {{message.created_at? message.created_at:"لم يتم الإدخال" }}
                    </div>
                </div>
                <!-- Item -->

                <!-- Item -->
                <div class="w-full px-4 py-4">
                    <div
                        class="h-9 flex items-center text-gray-500 mr-2 text-sm"
                    >
                        حالة الرسالة
                    </div>
                    <div
                        class="h-12 rounded border border-gray-200 bg-gray-50 flex items-center px-4 text-lg"
                    >
                        {{ message.state == 1 ? "تم التعامل" : "لم يتم الحل" }}
                    </div>
                </div>
                <!-- Item -->
            </div>
            <!-- Grid -->

            <!-- Item -->
            <div class="w-full px-4 py-4">
                <div class="h-9 flex items-center text-gray-500 mr-2 text-sm">
                    محتوى الرسالة
                </div>
                <div
                    class="py-3 rounded border border-gray-200 bg-gray-50 px-4 text-lg"
                    v-html="message.content"
                ></div>
            </div>
            <!-- Item -->

            <!-- Btn Action -->
            <div class="w-full h-16 mt-12 flex items-center justify-start">
                <div
                    @click="deleteMessage"
                    class="h-12 px-6 mx-4 bg-red-400 hover:bg-red-500 flex items-center justify-center text-white shadow-lg rounded cursor-pointer"
                >
                    <i class="far fa-trash-alt ml-2"></i>
                    حذف
                </div>
                <div
                    v-if="!message.state"
                    @click="sloveMessage"
                    class="h-12 px-6 bg-green-400 hover:bg-green-500 flex items-center justify-center text-white shadow-lg rounded cursor-pointer"
                >
                    <i class="fas fa-check ml-2"></i>
                    تم الحل
                </div>
            </div>
            <!-- End Btn Action -->
        </div>

        <empty-box v-if="loaded && message.length == 0" message="لا يوجد رسالة بهذا الرقم"></empty-box>

        <!-- End Inside Page -->
    </div>
</template>

<script>
import { clearLogout } from "../logout.js";
import Swal from "sweetalert2";
export default {
    data() {
        return {
            message: [],
            loaded: false
        };
    },
    methods: {
        deleteMessage: function() {
            Swal.fire({
                title: "هل أنت متأكد",
                text: "هل أنت متأكد من أنك تريد حذف هذه الرسالة !",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#16a085",
                cancelButtonColor: "#d33",
                confirmButtonText: "نعم قم بالحذف",
                cancelButtonText: "إلغاء"
            }).then(result => {
                if (result.isConfirmed) {
                    this.$loading.Start(this.$store);
                    this.$http
                        .DeleteMessage(this.$route.params.id)
                        .then(response => {
                            this.$loading.Stop(this.$store);
                            if (response.status == 200) {
                                this.message = [];
                                this.$alert.Success(response.data.message);
                            } else if (response.status == 204) {
                                this.message = [];
                                this.$alert.Empty("لم تعد هذه الرسالة متوفرة, قد يكون شخص أخر قام بحذفها");
                            }
                        })
                        .catch(error => {
                            this.$loading.Stop(this.$store);
                            this.$alert.BadRequest(error.response,this.$router,this.$store);
                        });
                        
                }
            });
        },
        sloveMessage: function() {
            this.$loading.Start(this.$store);
            this.$http.SloveMessage(this.$route.params.id)
            .then(response => {
                    this.$loading.Stop(this.$store);
                    if (response.status == 200) {
                        this.message.state = true;
                        this.$alert.Success(response.data.message);
                    } else if (response.status == 204) {
                        this.message = [];
                        this.$alert.Empty(
                            "لم تعد هذه الرسالة متوفرة, قد يكون شخص أخر قام بحذفها"
                        );
                    }
                })
                .catch(error => {
                    this.$loading.Stop(this.$store);
                    this.$alert.BadRequest(error.response,this.$router,this.$store);
                });
        }
    },
    mounted() {
        this.$store.commit("activePage", 2);
        this.$loading.Start(this.$store);
        this.$http
            .GetMessageById(this.$route.params.id)
            .then(response => {
                this.$loading.Stop(this.$store);
                this.loaded = true;
                if (response.status == 200) {
                    this.message = response.data.data;
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
