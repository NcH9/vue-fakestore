export const formValidation = {
    data(){
        return {
            error: {
                email: '',
                password: '',
                username: '',
            }
        }
    },
    methods: {
        validatePassword(password) {
            if (password.length < 5) {
                this.error.password = 'Password must be at least 5 characters long.';
            } else {
                this.error.password = '';
            }
        },
        validateEmail(email) {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email)) {
                this.error.email = 'Please enter a valid email address.';
            } else {
                this.error.email = '';
            }
        },
        validateUsername(username){
            console.log(username)
            if (username.length < 5) {
                this.error.username = 'Username must be at least 5 characters long.';
            } else {
                this.error.username = '';
            }
        },
        resetError(){
            this.error = {
                email: '',
                password: '',
                username: '',
            }
            console.log('errors reseted');
        }
    }
}