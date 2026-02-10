<template>
    <div class="bubble">
        <div class="bubble2">user UID: {{ user.userUID }}</div>
        <div class="bubble2" v-if="user.username">username: {{ user.username }}</div>
        <div class="bubble2">is admin: {{ user.isAdmin }}</div>
    </div>
</template>

<script type="module">
export default {
    name: 'product',
    props: {
        user: {
            type: Object,
            required: true,
        },
    },
    watch: {
        product: {
            immediate: true,
                handler(newVal) {
                    if (newVal) {
                        this.isProductInBag = this.getIfProductInBag();
                    }
            }
        }
    },
}
</script>

<style scoped>
.bubble{
    background-color: white;
    border-radius: 15px;
    margin: 15px;
    padding: 15px;
    color: black;
    box-shadow: 5px -5px 5px rgb(163, 163, 163);
    border: solid 1px rgb(102, 102, 102);
}
.bubble2{
    background-color: rgb(98, 255, 158);
    border-radius: 15px;
    margin: 15px;
    padding: 15px;
    color: black;
    box-shadow: 5px -5px 5px rgb(163, 163, 163);
    border: solid 1px rgb(102, 102, 102);
}
</style>