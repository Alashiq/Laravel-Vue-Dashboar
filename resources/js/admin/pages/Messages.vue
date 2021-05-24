<template>
    <div class="w-auto md:p-8 p-4">
        <!-- Inside Page -->

        <!-- List Header -->

        <div class="flex justify-between w-full h-16 items-center">
            <div class="text-2xl font-semibold cairo text-gray-600">
                صندوق الرسائل
            </div>
        </div>

        <div class="flex justify-between my-8">
            <!-- Filter -->
            <div
                class="border rounded font-semibold cairo flex bg-center text-gray-700"
            >
                <div
                    v-for="(item, index) in filter"
                    :key="index"
                    :class="{
                        'h-12 px-4 flex cursor-pointer items-center ': 1 == 1,
                        'bg-white ': item.link == activeFilter,
                        'rounded-r ': index == 0,
                        ' rounded-l border-l-0 ': index == filter.length - 1,
                        'border-l ': index != filter.length - 1
                    }"
                    @click="changeFilter(item.link)"
                >
                    {{ item.name }}
                </div>
            </div>
            <!-- End felter -->
        </div>
        <!-- End List Header -->

        <table class="w-full" v-if="loaded && filterMessage.length != 0">
            <tr class="h-12 text-lg font-bold text-gray-600">
                <td class="w-12 text-center">#</td>
                <td class="">الإسم</td>
                <td class="xl:table-cell hidden">حالة</td>
                <td class="xl:table-cell hidden">البريد</td>
                <td class="lg:table-cell hidden">الهاتف</td>
                <td class="xl:table-cell hidden">موجه الى</td>
                <td class="xl:table-cell hidden">التاريخ</td>
                <td class="rounded-l-lg">الإجراءات</td>
            </tr>

            <tr
                v-for="(item, index) in filterMessage"
                :key="index"
                class="h-20 bg-white shadow-2 rounded-lg text-lg text-gray-600 font-medium  hover:bg-gray-50"
            >
                <td class="w-12 text-center rounded-r-lg">{{ item.id }}</td>
                <td>{{ item.name.substring(0, 10) }}</td>
                <td class="xl:table-cell hidden">
                    <div
                        v-if="item.state"
                        class="bg-green-400 flex items-center justify-center rounded shadow h-10 w-24 text-white text-base"
                    >
                        محلولة
                    </div>
                    <div
                        v-else
                        class="bg-gray-400 flex items-center justify-center rounded shadow h-10 w-24 text-white text-base"
                    >
                        غير محلولة
                    </div>
                </td>
                <td class="xl:table-cell hidden">
                    <div v-if="item.email">{{ item.email }}</div>
                    <div v-else>خالي</div>
                </td>
                <td class="lg:table-cell hidden">
                    <div v-if="item.phone">{{ item.phone }}</div>
                    <div v-else>خالي</div>
                </td>

                <td class="xl:table-cell hidden">
                    {{ !item.receiver ? "لم يتم الإدخال" : item.receiver.name }}
                </td>
                <td class="xl:table-cell hidden">
                    {{ item.created_at }}
                </td>
                <td class=" rounded-l-lg h-20">
                    <router-link :to="'/admin/message/' + item.id">
                        <i
                            class="fas fa-eye px-4 py-2 see-btn rounded ml-2"
                        ></i>
                    </router-link>

                    <i
                        v-show="
                            $parent.checkPermission('DeleteMessage') == true
                        "
                        @click="deleteMessage(item.id, index)"
                        class="far fa-trash-alt px-4 py-2 delete-btn rounded ml-2"
                    ></i>
                    <i
                        v-show="$parent.checkPermission('EditMessage') == true"
                        @click="sloveMessage(item.id, index)"
                        v-if="!item.state"
                        class="fas fa-check px-4 py-2 cursor-pointer bg-green-400 hover:bg-green-500 shadow-one text-white rounded"
                    ></i>
                </td>
            </tr>
        </table>

        <empty-box v-if="loaded && filterMessage.length == 0"></empty-box>

        <!-- End Inside Page -->
    </div>
</template>

<script>
import Swal from "sweetalert2";
import { clearLogout } from "../logout.js";
export default {
    data() {
        return {
            messages: [],
            loaded: false,
            filter: [
                {
                    link: "all",
                    name: "كل الرسائل",
                    active: true
                },
                {
                    link: "active",
                    name: "المحلولة",
                    active: false
                },
                {
                    link: "notActive",
                    name: "الغير محلولة",
                    active: true
                }
            ],
            activeFilter: "all"
        };
    },
    methods: {
        deleteMessage: function(id, index) {
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
                        .DeleteMessage(id)
                        .then(response => {
                            this.$loading.Stop(this.$store);
                            if (response.status == 200) {
                                this.messages.splice(index, 1);
                                this.$alert.Success(response.data.message);
                            } else if (response.status == 204) {
                                this.$alert.Empty(
                                    "لم تعد هذه الرسالة متوفرة, قد يكون شخص أخر قام بحذفها"
                                );
                            }
                        })
                        .catch(error => {
                            this.$loading.Stop(this.$store);
                            this.$alert.BadRequest(
                                error.response,
                                this.$router,
                                this.$store
                            );
                        });
                }
            });
        },
        sloveMessage: function(id, index) {
            this.$loading.Start(this.$store);
            this.$http
                .SloveMessage(id)
                .then(response => {
                    this.$loading.Stop(this.$store);
                    if (response.status == 200) {
                        this.messages[index].state = true;
                        this.$alert.Success(response.data.message);
                    } else if (response.status == 204) {
                        this.$alert.Empty(
                            "لم تعد هذه الرسالة متوفرة, قد يكون شخص أخر قام بحذفها"
                        );
                    }
                })
                .catch(error => {
                    this.$loading.Stop(this.$store);
                    this.$alert.BadRequest(
                        error.response,
                        this.$router,
                        this.$store
                    );
                });
        },
        changeFilter(filterName) {
            this.activeFilter = filterName;
        }
    },
    mounted() {
        this.$store.commit("activePage", 2);
        this.$loading.Start(this.$store);
        this.$http
            .GetAllMessages()
            .then(response => {
                this.$loading.Stop(this.$store);
                this.loaded = true;
                if (response.status == 200) {
                    this.messages = response.data.messages;
                    this.$alert.Success(response.data.message);
                } else if (response.status == 204) {
                    this.$alert.Empty("تنبيه لا يوجد اي رسائل");
                }
            })
            .catch(error => {
                this.$loading.Stop(this.$store);
                this.loaded = true;
                this.$alert.BadRequest(error.response,this.$router,this.$store);
            });
    },
    computed: {
        filterMessage() {
            var list = [];
            if (this.activeFilter == "all") {
                list = this.messages;
            } else if (this.activeFilter == "active") {
                for (var i = 0; i < this.messages.length; i++)
                    if (this.messages[i].state) list.push(this.messages[i]);
            } else if (this.activeFilter == "notActive") {
                for (var i = 0; i < this.messages.length; i++)
                    if (!this.messages[i].state) list.push(this.messages[i]);
            }
            return list;
        }
    },
    created() {}
};
</script>

<style scoped>
table {
    border-collapse: separate;
    border-spacing: 0 1em;
}
</style>
