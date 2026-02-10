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

// const 
//   isAdmin = ref(false),
//   users = ref([]);
// async function getUsers(){
//   const usersRef = collection(db, 'users');
//   const q = query(usersRef);
//   const querySnapshot = await getDocs(q);
//   users.value = querySnapshot.docs.map((doc)=>{
//     return {
//       id: doc.id,
//       ...doc.data()
//     }
//   })
// };
// function getIsUserAdmin() {
//   if (auth.currentUser){
//     const user = users.value.find(user => user.userUID === auth.currentUser.uid);
//     // console.log(user.isAdmin)
//     isAdmin.value = user.isAdmin
//   }
// };