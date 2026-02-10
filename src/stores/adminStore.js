import { defineStore } from 'pinia';
import { auth, db } from '@/main';
import { collection, getDocs, query } from 'firebase/firestore';


export const useAdminStore = defineStore('admin', {
    state: () => ({
        isAdmin: false, // Здесь хранится глобальная переменная
        users: [],
    }),
    actions: {
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
        },
        async getIsUserAdmin() {
            await this.getUsers();
            if (auth.currentUser){
                const user = this.users.find(user => user.userUID === auth.currentUser.uid);
                this.isAdmin = user.isAdmin
            }
        },
    },
});