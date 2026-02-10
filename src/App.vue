
<template>
  <main class="main">
    <div class="grid">
      <div>
        <div class="grid2">
          <div class="flex-center2">
            <clock v-draggable></clock>
          </div>
          <nav >
            <v-tabs fixed-tabs>
              <RouterLink :to="{name: 'home'}"><v-tab>Home</v-tab></RouterLink>
              <RouterLink :to="{name: 'search'}"><v-tab>Catalogue</v-tab></RouterLink>
              <RouterLink to="/bag"><v-tab>Bag</v-tab></RouterLink>
              <signModule class="signModule"/>
              <RouterLink v-if="isAdmin" :to="{name: 'admin-panel'}"><v-tab>Admin panel</v-tab></RouterLink>
            </v-tabs>
          </nav>
        </div>
        <RouterView />
      </div>

      <footer>
        <RouterLink to="/about">About us</RouterLink>
      </footer>
    </div>
  </main>
  
</template>



<script setup>
import '@/assets/slider.css'
import '@/components/signModule.vue'
import signModule from '@/components/signModule.vue';
import clock from './components/clock.vue';
import { auth, db } from './main';
import { onMounted, ref } from 'vue';
import { collection, getDocs, query } from 'firebase/firestore';

const 
  isAdmin = ref(false),
  users = ref([]);
async function getUsers(){
  const usersRef = collection(db, 'users');
  const q = query(usersRef);
  const querySnapshot = await getDocs(q);
  users.value = querySnapshot.docs.map((doc)=>{
    return {
      id: doc.id,
      ...doc.data()
    }
  })
};
function getIsUserAdmin() {
  if (auth.currentUser){
    const user = users.value.find(user => user.userUID === auth.currentUser.uid);
    // console.log(user.isAdmin)
    isAdmin.value = user.isAdmin
  }
};
onMounted(async()=>{
  await getUsers();
  getIsUserAdmin();
  console.log(isAdmin.value)
})
// return {
//   // data
//   isAdmin, users,

//   // methods
//   getUsers, getIsUserAdmin
// }
</script>



<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}
.linkToSearch {
  font-size: 32px;
  margin: 20px;
  display: flex;
  justify-content: center;
}
.grid {
  display: grid;
}
.signModule{
  display: flex;
  justify-content: center;
  place-items: top;
}
.main {
  display: flex;
  justify-content: center;
  width: 100%;
}
footer {
  display: flex;
  justify-content: center;
  margin: 20px;
}
.flex-center{
  display: flex;
  justify-content: center;
  margin: 15px;
}
.flex-center2{
  display: flex;
  justify-content: center;
  place-items: center;
  margin-right: 15px;
  min-width: 150px;
  z-index: 1000;
}
.grid2{
  display: grid;
  grid-template-columns: 150px auto;
}
.searchbar{
  margin-top: 15px;
  min-width: 350px;
  border-radius: 15px;
  background-color: rgb(102, 102, 102);
  padding: 5px;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  font-size: large;
}
.searchbar:focus{
  background-color: rgb(184, 184, 184);
}
.flex-between{
  display: flex;
  justify-content: space-between;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
  margin: 10px;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
