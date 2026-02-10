<template>
    <div class="bubble" v-clickable>
        <div class="grid2" >
            <div class="margin"><img class="img" :src="product.image"/></div>
            <div class="title">{{product.title}}</div>
        </div>
        <div class="price" :id="product.id" v-addTooltipOnHover="isCheap">price $: {{product.price}}</div>
        <div v-if="isProductInBag"><v-btn @click.stop="deleteFromBag(product.id)">Delete</v-btn></div>
        <div v-if="!isProductInBag"><v-btn @click.stop="addToBag">Add To Bag</v-btn></div>
    </div>
    <slot name="additionalData"></slot>
</template>

<script type="module">
export default {
    name: 'product',
    data() {
        return {
            isProductInBag: '',
            isCheap: '',
        }
    },
    props: {
        product: {
            type: Object,
            required: true,
        },
    },
    methods: {
        toggleInBag() {
            this.$emit('delete-product', this.product.id);
        },
        getIfProductInBag(){
            const savedProducts = localStorage.getItem('bag');
            if (savedProducts) {
                const products = JSON.parse(savedProducts);
                for (let product of products ){
                    if (product.id == this.product.id){
                        return true;
                    }
                }
            }
            return false;
        },
        addToBag(){
            let bag = [];

            if (localStorage.getItem('bag')) {
                bag = JSON.parse(localStorage.getItem('bag'));
            }
            bag.push(this.product);
            localStorage.setItem('bag', JSON.stringify(bag));
            this.isProductInBag = !this.isProductInBag;
        },
        deleteFromBag(id){
            let bag = [];

            if (localStorage.getItem('bag')) {
                bag = JSON.parse(localStorage.getItem('bag'));
            }
            bag = bag.filter(product => product.id != id)

            localStorage.setItem('bag', JSON.stringify(bag));
            this.isProductInBag = !this.isProductInBag;
            this.toggleInBag()
        }
    },
    watch: {
        product: {
            immediate: true,
                handler(newVal) {
                    if (newVal) {
                        this.isProductInBag = this.getIfProductInBag();
                        if(Number(newVal.price)<100){
                            this.isCheap = 'Yeah, it`s that cheap';
                        } else {
                            this.isCheap = 'Yeah, it`s that expensive';
                        }
                    }
            }
        }
    },
    mounted(){
        this.isProductInBag = this.getIfProductInBag();
    },
}
</script>

<style scoped>
button {
    border-radius: 15px;
    background-color: rgb(7, 194, 122);
    margin-top: 10px;
    min-width: 100px;
    color: white;
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
}
.price {
    display: flex;
    justify-content: center;
    margin: 10px;
    padding: 10px;
    border-radius: 10% 30% 50% 70%;
    place-items: center;
    border: 1px solid rgb(128, 128, 128);
    color: white;
    background: linear-gradient(0.25turn, rgb(136, 57, 136), rgb(137, 0, 250)) ;
    max-width: 200px;
    font-size: 16px;
    font-family:'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
}
.bubble{
    background-color: white;
    border-radius: 15px;
    margin: 15px;
    padding: 15px;
    color: black;
    box-shadow: 5px -5px 5px rgb(163, 163, 163);
    border: solid 1px rgb(102, 102, 102);
}
.img {
    max-width: 100px;
    max-height: 100px;

}
.flex-around {
    display: flex;
    justify-content: space-around;
}
.grid2 {
    display: grid;
    grid-template-columns: 120px 2fr;
}
.margin {
    margin: 10px;
    padding: 10px;
}
.title {
    margin: 10px;
    padding: 10px;
    font-size: 20px;
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
}
</style>