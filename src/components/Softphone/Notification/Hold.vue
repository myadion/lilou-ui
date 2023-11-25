 <template>
    <v-container class="adion-hold">
        <v-row class="align-center" >
            <v-col cols="2" style="text-align:center;">
                <v-icon>mdi-pause</v-icon>
            </v-col>
            <v-col cols="5" class="adion-call" v-if="name">
                <h3>{{ name }}</h3>
                <span>{{ number }}</span>
            </v-col>
            <v-col cols="5" class="adion-btn">
                <h6>{{ computedDuration }}</h6>
                <v-btn outlined rounded width="60px" class="rounded-pill" size="small" icon="mdi-phone" @click="unhold"></v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, defineEmits } from 'vue';

const props = defineProps({
    call: String,
    number: String,
    name: String,
    start: Date,
});

let interval;
const duration = ref(0);

onMounted(() => {
    updateDuration();
    interval = setInterval(updateDuration, 500);
});

onBeforeUnmount(() => {
    clearInterval(interval);
});

const updateDuration = () => {
    duration.value = Math.floor((new Date() - props.start) / 1000);
};

const computedDuration = computed(() => {
    if (duration.value > 0) {
        const minutes = Math.floor(duration.value / 60);
        const seconds = duration.value - minutes * 60;
        return `${minutes}:` + (seconds < 10 ? `0${seconds}` : seconds);
    }
    return null;
});

const emit = defineEmits([
    'unhold',
]);

const unhold = () => {
    emit('unhold', props.call);
};
</script>


<style scoped>
.adion-hold{
    background: #3E4F64;
    border-radius: 10px;
    color: white;
    padding: 10px;
    margin-top: 5px;
    margin-bottom: 5px;
}
.adion-call {
    margin-bottom: 0;
    line-height: 1.1;
}

.adion-call h3 {
    font-size: 1rem;
    font-weight: 500;
}
.adion-call span {
    font-size: .7rem;
    font-weight: 300;
}
.adion-btn {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.adion-btn button{
    color: white;
    background-color: #2B4461;
}

</style>
