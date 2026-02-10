
<template>
    
        <main>
            <RouterLink v-if="isLoggedIn" :to="{name: 'profile'}"><v-tab>Profile</v-tab></RouterLink>
            <div v-if="!isLoggedIn">
                <v-tabs fixed-tabs>
                    <RouterLink :to="{name: 'register'}"><v-tab>Register</v-tab></RouterLink>
                    <RouterLink :to="{name: 'login'}"><v-tab>Login</v-tab></RouterLink>
                </v-tabs>
            </div>
        </main>
    
    
</template>

<script type="module">
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/main'
import { onMounted, ref } from 'vue';

export default {
    name: 'signModule',
    setup(){
        const isLoggedIn = ref(false);
        function checkAuthState() {
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    isLoggedIn.value = true;
                } else {
                    isLoggedIn.value = false;
                }
            })
        };
        onMounted(()=>{
            checkAuthState();
        })
        return {
            isLoggedIn, checkAuthState
        }
    }
}
// export default {
//     name: 'signModule',
//     data(){
//         return {
//             isLoggedIn: false,
//         }
//     },
//     methods: {
//         checkAuthState() {
//             onAuthStateChanged(auth, (user) => {
//                 if (user) {
//                     this.isLoggedIn = true;
//                 } else {
//                     this.isLoggedIn = false;
//                 }
//             })
//         },
//     },
//     mounted(){
//         this.checkAuthState()
//     },
// }

</script>


