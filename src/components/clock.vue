<template>
    <div class="time">
        {{ time.hours }}:{{ time.minutes }}
    </div>
</template>

<script>
import { onMounted, ref } from 'vue';

export default {
    name: 'clock',
    setup(){
        const time = ref({
            hours: '',
            minutes: '',
        });
        function updateTimer(){
            const now = new Date;
            time.value.hours = now.getHours().toString().padStart(2, '0');
            time.value.minutes = now.getMinutes().toString().padStart(2, '0');
            // console.log('timer updated');
        }
        onMounted(()=>{
            updateTimer();
            setInterval(updateTimer, 5000);
        })
        return {
            time,
        }
    }
}
</script>

<style scoped>
.time{
    font-weight: 900;
    font-size: 40px;
    color: rgba(0,193,167,255);
    text-shadow: 
        -1px -1px 1px #000, /* Ліва верхня тінь */
        1px -1px 1px #000,  /* Права верхня тінь */
        -1px 1px 1px #000,  /* Ліва нижня тінь */
        1px 1px 1px #000;   /* Права нижня тінь */
}
</style>