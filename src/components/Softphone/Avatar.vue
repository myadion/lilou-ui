 <template>
    <v-container>
        <v-row>
            <v-col cols="12" class="adion-call" v-if="name">
                <h3>{{ name }}</h3>
                <span>{{ number }}</span>
            </v-col>
            <v-col cols="12" class="adion-call" v-else>                
                <h3>{{ number }}</h3>
            </v-col>
            <v-col cols="12" class="adion-avatar">
                <v-avatar rounded class="rounded-pill" size="120px">
                    <template v-if="computedAvatar">
                        <v-img :src="computedAvatar"></v-img>
                    </template>
                    <template v-else>
                        <v-icon>mdi-account-circle</v-icon>
                    </template>
                </v-avatar>
            </v-col>
            <v-col cols="12" class="adion-duration">
                <h6>{{ computedDuration }}</h6>
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
    avatar: String,
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

const computedAvatar = computed(() => {
    if (props.avatar) {
        return props.avatar;
    } else if (props.name) {
        const names = props.name.split(' ');
        if(names.length > 1) {
            return `https://ui-avatars.com/api/?color=fff&background=random&name=${names[0]}+${names[1]}`;
        } else {
            return `https://ui-avatars.com/api/color=fff&?background=random&name=${names[0]}`;
        }
    }
    return null;
});
</script>

<style scoped>
.adion-call {
    text-align: center;
    margin-bottom: 0;
    line-height: 1.4;
}

.adion-call h3 {
    font-size: 1.3rem;
    font-weight: 500;
}
.adion-call span {
    font-size: .8rem;
    font-weight: 300;
}

.adion-avatar {
    text-align: center;
}

.adion-avatar .v-avatar {
    border: 5px solid #3E4F64;
}

.adion-avatar .v-icon {
    font-size: 6rem;
    color: #dcdcdc;
    background: #449D78;
}

.adion-duration {
    text-align: center;
}
</style>
