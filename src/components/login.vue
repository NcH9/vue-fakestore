<template>
    <form @submit.prevent="validateForm">
        <div class="grid">

            <div class="grid2">
                <label>Email</label>
                <input type="email" v-model.lazy="form.email" @blur="validateEmail(form.email)"/>
                <span>{{ form.email }}</span>
                <span class="error">{{ error.email }}</span>
            </div>

            <div class="grid2">
                <label>Password</label>
                <input type="password" v-model.lazy="form.password" @blur="validatePassword(form.password)"/>
                <span>{{ form.password }}</span>
                <span class="error">{{ error.password }}</span>
            </div>
            <button type="submit" v-if="!isLoggedIn">Log in</button>
            <button type="submit" v-if="isLoggedIn">Log out</button>
        </div>
    </form>
</template>
  
<script>
import { auth } from '@/main'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { formValidation } from '@/mixins/formValidation';
import { useAdminStore } from '@/stores/adminStore';
export default {
    name: 'login',
    mixins: [formValidation],
    data(){
        return {
            form: {
                password: '',
                email: '',
            },
        }
    },
    methods: {
        async login(){
            const admin = useAdminStore();
            await signInWithEmailAndPassword(auth, this.form.email, this.form.password)
                .then(userCredential => {
                    const user = userCredential.user;
                    alert('login is successful');
                    this.$router.push({name: 'home'});
                })
                .catch(error => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log(errorCode, errorMessage);
                    alert('login is not successful')
                })
        },
        async submitForm(){
            await this.login();
            this.resetForm();
            window.location.href = '/';
        },
        resetForm(){
            this.form = {
                password: '',
                email: '',
            };
            this.resetError();
        },
        validateForm() {
            this.validateEmail(this.form.email);
            this.validatePassword(this.form.password);
            if (!this.error.email && !this.error.password){
                this.submitForm();
            }
        }
    },
};
</script>
<style scoped>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}
input {
    padding: 5px;
    margin: 5px;
    background-color: rgb(255, 255, 255);
    border-radius: 15px;
}
input:focus {
    background-color: white;
}
button {
    background-color: white;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    color: rgb(31, 31, 31);
    border-radius: 10px;
}
.error {
    color: rgb(255, 110, 110)
}
.grid {
    display: grid;
}
.grid2 {
    display: grid;
    grid-template-columns: 70px repeat(2, 1fr) 3fr;
    margin: 10px;
    margin-left: -10px
}
label {
    display: flex;
    place-items: center;
}
span{
    display: flex;
    place-items: center; 
}
</style>
  