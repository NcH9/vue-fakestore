<template>
    <div class="flex-center">
        <select id="options" v-model="selectedOption" @change="emitSelection">
            <option value="">All</option>
            <option value="/category/jewelery">Jewelery</option>
            <option value="/category/electronics">Electronics</option>
            <option value="/category/men's clothing">Men's clothing</option>
            <option value="/category/women's clothing">Women's clothing</option>
        </select>
    </div>
</template>
<script>
export default {
    name: 'filtrator',
    data() {
        return {
            selectedOption: ''
        };
    },
    methods: {
        emitSelection() {
            this.$emit('onchange', this.selectedOption);
        }
    }
}
</script>
<style scoped>
.flex-center {
    display: flex;
    justify-content: center;
}
select {
    background-color: white;
    padding: 5px;
    border-radius: 15px;
    margin: 10px;
}
</style>