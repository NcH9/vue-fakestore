<template>
    <div v-for="(user, index) in users" :key="index">
        
        <user 
            :user="user"
        />
    </div>
</template>

<script>
import { db } from '@/main';
import user from '@/components/user.vue';
import { collection, getDocs, query } from 'firebase/firestore';
export default {
    name: 'admin',
    components: {
        user,
    },

    data(){
        return {
            users: [],
        }
    },
    methods: {
        async getUsers(){
            const usersRef = collection(db, 'users');
            const q = query(usersRef);
            const querySnapshot = await getDocs(q);
            this.users = querySnapshot.docs.map((doc)=>{
                return {
                    id: doc.id,
                    ...doc.data()
                }
            })
        }
    },
    async mounted(){
        await this.getUsers();
        console.log(this.users[0])
    }
}
</script>

<style>

</style>