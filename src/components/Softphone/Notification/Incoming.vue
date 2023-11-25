 <template>
    <v-container class="adion-incoming">
        <v-row class="align-center" >
            <v-col cols="2" class="adion-avatar" >
                <v-avatar rounded class="rounded-pill" size="35px">
                    <template v-if="computedAvatar">
                        <v-img :src="computedAvatar"></v-img>
                    </template>
                    <template v-else>
                        <v-icon>mdi-account-circle</v-icon>
                    </template>
                </v-avatar>
            </v-col>
            <v-col cols="8" class="adion-call" v-if="name">
                <h3>{{ name }}</h3>
                <span>{{ number }}</span>
            </v-col>
            <v-col cols="2">
                <h6>18:24</h6>
            </v-col>
        </v-row>
        <v-row class="mt-0 adion-btn" justify="space-around">
            <v-col cols="5" class="adion-decline pa-0 mt-2 mb-1">        
                <v-chip @click="hangup" size="small" prepend-icon="mdi-phone-hangup" class="pl-5 pr-5" variant="outlined" color="red">Refuser</v-chip>
            </v-col> 
            <v-col cols="5" class="adion-answer pa-0 mt-2 mb-1">    
                <v-chip @click="answer" size="small" prepend-icon="mdi-phone" class="pl-5 pr-5" variant="outlined" color="green">Répondre</v-chip>
            </v-col> 
        </v-row>
    </v-container>
</template>

<script setup>
import { computed, defineEmits} from 'vue';

const props = defineProps({
    call: String,
    number: String,
    name: String,
    start: Date,
    avatar: String,
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

const emit = defineEmits([
    'answer',
    'hangup',
]);

const answer = () => {
    emit('answer', props.call);
}

const hangup = () => {
    emit('hangup', props.call);
}

</script>

<style scoped>
.adion-incoming{
    background: white;
    border-radius: 10px;
    color: black;
    margin-top: 5px;
    margin-bottom: 5px;
}
.adion-call {
    margin-bottom: 0;
    line-height: 1.1;
}

.adion-call h3 {
    font-size: 1.2rem;
    font-weight: 600;
}
.adion-call span {
    font-size: .7rem;
    font-weight: 300;
}

.adion-btn span{
    border: none;
    font-weight: 800;
}

.adion-avatar {
    text-align: center;
}
.adion-avatar .v-icon {
    font-size: 6rem;
    color: #dcdcdc;
    background: #449D78;
}

</style>
