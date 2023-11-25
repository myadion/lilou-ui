<template>
    <v-container class="adion-clock">
        <v-row class="align-center">
            <v-col cols="12">
                <h2>{{ currentDate }}</h2>
                <h1>{{ currentTime }}</h1>
            </v-col>
        </v-row>
    </v-container>
</template>
<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

const currentTime = ref('');
const currentDate = ref('');

function capitalizeFirstLetter(string) {
    return string.replace(/\b(\w)/g, s => s.toUpperCase());
}

function getFormattedDate() {
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const dateString = now.toLocaleDateString('fr-FR', options);
    return capitalizeFirstLetter(dateString);
}

function updateTime() {
    const now = new Date();
    currentTime.value = now.toTimeString().slice(0, 8);
    currentDate.value = getFormattedDate();
}

let intervalId;

onMounted(() => {
    updateTime();
    intervalId = setInterval(updateTime, 1000);
});

onBeforeUnmount(() => {
    clearInterval(intervalId);
});
</script>

<style scoped>
.adion-clock {
    color: white;
    text-align: center;
    margin-top: 25px;
}

.adion-clock h1 {
    font-size: 3rem;
    margin: 0;
    line-height: 1;
}

.adion-clock h2 {
    font-size: 1rem;
    font-weight: 400;
    margin: 0;
}
</style>
