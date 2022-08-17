import Swal from "sweetalert2";
export default {
    data() {
        return {
            teams: [],
            loaded: false,
        };
    },
    methods: {
        deleteTeam: function(id) {
            Swal.fire({
                title: "هل أنت متأكد",
                text: "هل أنت متأكد من أنك تريد حذف هذا الاختبار !",
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
                        .DeleteExam(id)
                        .then(response => {
                            this.$loading.Stop();
                            if (response.status == 200) {
                                this.teams.splice(
                                    this.teams.findIndex(m => m.id === id),
                                    1
                                );
                                this.$alert.Success(response.data.message);
                            } else if (response.status == 204) {
                                this.$alert.Empty(
                                    "لم يعد هذا الاختبار متوفرا, قد يكون شخص أخر قام بحذفه"
                                );
                                this.teams.splice(
                                    this.teams.findIndex(m => m.id === id),
                                    1
                                );
                            }
                        })
                        .catch(error => {
                            this.$loading.Stop();
                            this.$alert.BadRequest(error.response);
                        });
                }
            });
        },
        qNumber(i) {
            var b=0; 
            if(this.teams[i].q1_point>0)
            b=b+1;
            if(this.teams[i].q2_point>0)
            b=b+1;
            if(this.teams[i].q3_point>0)
            b=b+1;
            return b;
        },
        pNumber(i) {
            return this.teams[i].q1_point+ this.teams[i].q2_point+ this.teams[i].q3_point;
        }
    },
    mounted() {
        this.$store.commit("activePage", 9);
        this.$loading.Start();
        this.$http.
        GetAllAnswers().then(response => {
                this.$loading.Stop();
                this.loaded = true;
                if (response.status == 200) {
                    this.teams = response.data.data;
                    this.$alert.Success(response.data.message);
                } else if (response.status == 204) {
                    this.$alert.Empty(
                        "تنبيه لا يوجد اي عضو في فريق العمل حتى الان"
                    );
                }
            })
            .catch(error => {
                this.loaded = true;
                this.$loading.Stop();
                this.$alert.BadRequest(error.response);
            });
    },
    computed: {


    },
    created() {}
};
