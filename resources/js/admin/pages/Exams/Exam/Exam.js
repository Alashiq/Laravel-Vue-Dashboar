import Swal from "sweetalert2";
export default {
    data() {
        return {
            team: [],
            loaded: false
        };
    },
    methods: {
        deleteTeamMember: function() {
            Swal.fire({
                title: "هل أنت متأكد",
                text: "هل أنت متأكد من أنك تريد حذف هذا العضو !",
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
                        .DeleteExam(this.$route.params.id)
                        .then(response => {
                            this.$loading.Stop();
                            if (response.status == 200) {
                                this.team = [];
                                this.$alert.Success(response.data.message);
                            } else if (response.status == 204) {
                                this.team = [];
                                this.$alert.Empty(
                                    "لم يعد هذا العضو متوفرا, قد يكون شخص أخر قام بحذفه"
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
    },
    mounted() {
        this.$store.commit("activePage", 7);
        this.$loading.Start();
        this.$http
            .GetExamById(this.$route.params.id)
            .then(response => {
                this.$loading.Stop();
                this.loaded = true;
                if (response.status == 200) {
                    this.team = response.data.data;
                    this.$alert.Success(response.data.message);
                } else if (response.status == 204) {
                    this.$alert.Empty("هذا العضو غير متوفر");
                }
            })
            .catch(error => {
                this.$loading.Stop();
                this.loaded = true;
                this.$alert.BadRequest(error.response);
            });
    },
    computed: {
        qNumber() {
            var b=0; 
            if(this.team.q1_point>0)
            b=b+1;
            if(this.team.q2_point>0)
            b=b+1;
            if(this.team.q3_point>0)
            b=b+1;
            return b;
        },
        pNumber() {
            return this.team.q1_point+ this.team.q2_point+ this.team.q3_point;
        }
    },
    created() {}
};
