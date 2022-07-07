export default {
    data() {
        return {
            formData: {
                file: "",
                name: "",
                job:"" ,
                facebook: "",
                twitter: "",
                linkedin: "",
                github: "",
                email: "",
                description: "",
            },
            formValidate: {
                file: "",
                name: "",
                job: "",
                facebook: "",
                twitter: "",
                linkedin: "",
                github: "",
                email: "",
                description: ""
            },
            previewImage: null
        };
    },
    methods: {
        addTeamMember: function() {
            this.validateFile();
            this.validateName();
            this.validateJob();
            this.validateFacebook();
            this.validateTwitter();
            this.validateLinkedin();
            this.validateGithub();
            this.validateEmail();
            this.validateDescription();
            if (this.formValidate.file != "") return 0;
            if (this.formValidate.name != "") return 0;
            if (this.formValidate.job != "") return 0;
            if (this.formValidate.facebook != "") return 0;
            if (this.formValidate.twitter != "") return 0;
            if (this.formValidate.linkedin != "") return 0;
            if (this.formValidate.github != "") return 0;
            if (this.formValidate.email != "") return 0;
            if (this.formValidate.description != "") return 0;

            this.$loading.Start();
            const config = {
                headers: {
                    "content-type": "multipart/form-data"
                }
            };
            let data = new FormData();
            data.append("name", this.formData.name);
            data.append("job", this.formData.job);
            data.append("facebook", this.formData.facebook);
            data.append("twitter", this.formData.twitter);
            data.append("linkedin", this.formData.linkedin);
            data.append("github", this.formData.github);
            data.append("email", this.formData.email);
            data.append("description", this.formData.description);
            data.append("file", this.formData.file);
            this.$http
                .PostNewTeam(data, config)
                .then(response => {
                    this.$loading.Stop();
                    this.$alert.Success(response.data.message);
                    this.formData.name = "";
                    this.formData.job = "";
                    this.formData.facebook = "";
                    this.formData.twitter = ""; 
                    this.formData.linkedin = "";
                    this.formData.github = "";
                    this.formData.email = "";
                    this.formData.description = "";
                    this.formData.file="";
                    this.previewImage=null;
                })
                .catch(error => {
                    this.$loading.Stop();
                    console.log(error.response);
                    this.$alert.BadRequest(error.response);
                });
        },
        onChange(e) {
            this.formData.file = e.target.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(this.formData.file);
            reader.onload = e => {
                this.previewImage = e.target.result;
            };
        },
        validateName: function() {
            this.formValidate.name = "";
            if (this.formData.name.trim() == "") {
                this.formValidate.name = "لا يمكن ترك هذا الحقل فارغ";
                return 1;
            }
            if (this.formData.name.trim().length <= 5) {
                this.formValidate.name = "يجب ان يكون الإسم 5 أحرف أو اكثر";
                return 1;
            }
            if (this.formData.name.trim().length > 24) {
                this.formValidate.name = "يجب ان يكون الإسم أقل من 24 حرف";
                return 1;
            }
        },
        validateJob: function() {
            this.formValidate.job = "";
            if (this.formData.job.trim() == "") {
                this.formValidate.job = "لا يمكن ترك هذا الحقل فارغ";
                return 1;
            }
            if (this.formData.job.trim().length <= 4) {
                this.formValidate.job = "يجب ان يكون الوصف الوظيفي 4 أحرف أو اكثر";
                return 1;
            }
            if (this.formData.job.trim().length > 24) {
                this.formValidate.job = "يجب ان يكون الوصف الوظيفي أقل من 24 حرف";
                return 1;
            }
        },
        validateFacebook: function() {
        },
        validateTwitter: function() {
        },
        validateLinkedin: function() {
        },
        validateGithub: function() {
        },
        validateEmail: function() {
            this.formValidate.email = "";
            if (this.formData.email.trim() == "") {
                this.formValidate.email = "";
                return 1;
            }
            if (
                !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/.test(
                    this.formData.email
                )
            ) {
                this.formValidate.email = "هذا البريد غير صحيح";
                return 1;
            }
        },
        validateDescription: function() {
            this.formValidate.description = "";
            if (this.formData.description.trim() == "") {
                this.formValidate.description = "لا يمكن ترك هذا الحقل فارغ";
                return 1;
            }
            if (this.formData.description.trim().length < 20) {
                this.formValidate.description = "يجب ان يكون الوصف 20 أحرف أو اكثر";
                return 1;
            }
            if (this.formData.description.trim().length > 130) {
                this.formValidate.description = "يجب ان يكون الوصف أقل من 130 حرف";
                return 1;
            }
        },
        validateFile: function() {
            this.formValidate.file = "";
            if (this.formData.file == "") {
                this.formValidate.file = "يجب اختيار صورة";
                return 1;
            }
        },
    },
    mounted() {
        this.$store.commit("activePage", 7);
    },
    computed: {},
    created() {}
};
