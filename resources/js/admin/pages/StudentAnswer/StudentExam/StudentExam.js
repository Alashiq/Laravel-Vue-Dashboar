import Swal from "sweetalert2";
export default {
    data() {
        return {
            team: [],
            loaded: false,
            answer1:1,
            answer2:1,
            answer3:1,
            state:0,  // 0 not answer  - 1 answerd
            sum:0
        };
    },
    methods: {
        changeAnswer:function(q_number,answer_number){
            if(q_number==1)
            this.answer1=answer_number;
                if(q_number==2)
                this.answer2=answer_number;
                if(q_number==3)
                this.answer3=answer_number;
        },
        deleteTeamMember: function() {
            this.sum=0;
            Swal.fire({
                title: "هل أنت متأكد",
                text: "هل أنت متأكد من أنك اكملت الاجابة بشكل صحيح !",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#16a085",
                cancelButtonColor: "#d33",
                confirmButtonText: "نعم",
                cancelButtonText: "إلغاء"
            }).then(result => {
                if (result.isConfirmed) {
                    if(this.answer1 == this.team.q1_true)
                    this.sum=this.sum + this.team.q1_point;

                    if(this.answer2 == this.team.q2_true)
                    this.sum=this.sum + this.team.q2_point;

                    if(this.answer3 == this.team.q3_true)
                    this.sum=this.sum + this.team.q3_point;
                    this.$loading.Start();
                    this.$http
                        .PostAnswerExam({
                            "exam_id":this.$route.params.id,
                            "q1_answer":this.answer1,
                            "q2_answer":this.answer2,
                            "q3_answer":this.answer3,
                            "degree":this.sum,
                        })
                        .then(response => {
                            this.$loading.Stop();
                            if (response.status == 200) {
                                this.$alert.Success(response.data.message);
                                this.state=1;
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
        this.$store.commit("activePage", 8);
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
