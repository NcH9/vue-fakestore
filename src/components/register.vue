<template>
    <form @submit.prevent="validateForm">
        <div class="grid">

            <div class="grid2">
                <label>Username</label>
                <input type="text" v-model.lazy="form.username" @blur="validateUsername(form.username)"/>
                <span>{{ form.username }}</span>
                <span class="error">{{ error.username }}</span>
            </div>

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

            <div class="grid2">
                <label>Admin</label>
                <input type="checkbox" v-model.lazy="form.worship"/>
            </div>

            <button type="submit" @click="validateForm">Register</button>
        </div>
    </form>
</template>
  
<script>
import{ auth } from '@/main'
import { formValidation } from '@/mixins/formValidation';
import { updateProfile } from 'firebase/auth';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { addDoc, collection } from "firebase/firestore";
import { db } from '@/main';
export default {
    name: 'register',
    data(){
        return {
            userUID: '',
            form: {
                username: '',
                password: '',
                email: '',
                worship: false,
            },
        }
    },
    mixins: [formValidation],
    methods: {
        async register(){
            await createUserWithEmailAndPassword(auth, this.form.email, this.form.password)
                .then(userCredential => {
                    const user = userCredential.user;
                    this.userUID = userCredential.user.uid;
                    updateProfile(user, {
                        displayName: this.form.username,
                    });
                    console.log(auth.currentUser)
                })
                .catch(error => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log(errorCode, errorMessage);
                })
        },
        async addUser(){
            try {
                const docRef = await addDoc(collection(db, 'users'), {
                    userUID: this.userUID,
                    isAdmin: this.form.worship,
                    username: this.form.username,
                })
                console.log('document is writted with id:', docRef.id)
            } catch (error){
                console.log(`error occured: ${error}`)
            }
        },
        async submitForm(){
            await this.register();
            await this.addUser();
            console.log('formsubmitted');
            this.resetForm();
        },
        resetForm(){
            this.form = {
                password: '',
                email: '',
                worship: false,
            };
            this.resetError();
        },
        async validateForm() {
            this.validateEmail(this.form.email);
            this.validatePassword(this.form.password);
            this.validateUsername(this.form.username);
            if (!this.error.email && !this.error.password && !this.username){
                await this.submitForm();
                this.$router.push({name: 'home'});
                window.location.href = '/';
            }
        }
    }
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
  