 <template>
    <v-card class="adion-hold" @click="(numbers.length > 1 || (extension && numbers.length > 0)) ? expended = true : callHandler">
        <v-row class="align-center">
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
                <v-col cols="8" class="adion-user" v-if="name">
                    <h3>{{ name }} <small v-if="extension">{{ extension }} </small></h3>
                    <p v-for="number in numbers" :key="number.type">{{ number.type }}: {{ number.number }}</p>
                </v-col>
                <v-col cols="2" class="adion-btn">
                    <v-icon size="20" v-if="extension">mdi-account</v-icon>
                    <v-icon size="20" v-if="!extension">mdi-book-account</v-icon>
                    <span v-if="presence" class="presence" :class="presence"></span>
                </v-col>
        
            <v-dialog transition="dialog-top-transition" width="30vw" v-model="expended">
                <v-card color="grey-darken-4">
                    <v-toolbar color="grey-darken-4">         
                        <v-toolbar-title>
                            <v-avatar rounded class="rounded-pill" size="35px">
                                <template v-if="computedAvatar">
                                    <v-img :src="computedAvatar"></v-img>
                                </template>
                                <template v-else>
                                    <v-icon>mdi-account-circle</v-icon>
                                </template>
                            </v-avatar>
                            <span class="ml-2">{{ name }}</span>
                        </v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-btn icon @click="expended = false">
                            <v-icon>mdi-close</v-icon>
                        </v-btn>
                    </v-toolbar>
                    <h3 class="text-center">Quel numéro souhaitez-vous utiliser ?</h3>
                    <v-card-text class="pb-5">
                        <v-row no-gutters>
                            <v-col cols="6" v-if="extension" class="pa-1">
                                <v-card title="Interne" :subtitle="extension.toString()" link :color="computedPresenceColor">
                                </v-card>
                            </v-col>
                            <v-col cols="6" v-for="number in numbers" :key="number.type" class="pa-1">
                                <v-card :title="number.type" :subtitle="number.number" link varient="darken">
                                </v-card>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>
            </v-dialog>

            </v-row>
    </v-card>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
    numbers: Object,
    name: String,
    extension: Number,
    avatar: String,
    presence: String,
});

let expended = ref(false);

const computedAvatar = computed(() => {
    if (props.avatar) {
        return props.avatar;
    } else if (props.name) {
        const names = props.name.split(' ');
        if (names.length > 1) {
            return `https://ui-avatars.com/api/?color=fff&background=random&name=${names[0]}+${names[1]}`;
        } else {
            return `https://ui-avatars.com/api/color=fff&?background=random&name=${names[0]}`;
        }
    }
    return null;
});

const computedPresenceColor = computed(() => {
    if (props.presence) {
        switch (props.presence) {
            case 'online':
                return 'success';
            case 'offline':
                return 'error';
            case 'busy':
                return 'warning';
            case 'away':
                return 'grey';
            default:
                return 'grey';
        }
    }
    return 'grey';
});

const callHandler = () => {
    console.log('callHandler')
}

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
.adion-user {
    margin-bottom: 0;
    line-height: 1.1;
}
.adion-user p{
    font-size: .7rem;    
    font-weight: 300;
}

.adion-user h3 {
    font-size: 1rem;
    font-weight: 500;
    line-height: 1.5;
}
.adion-user small {
    font-size: .6rem;
}

.adion-btn {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.adion-btn button{
    color: white;
    background-color: #619D44;
}

.adion-btn-extended{
    color: white;
    background-color: #619D44;
    justify-content: space-between;
}

.adion-btn-extended p{
    font-size: 1rem;    
    text-transform: none;
    font-weight: 600;
}

.adion-btn-extended span{
    font-size: .8rem;    
    text-transform: none;
    font-weight: 400;
}

.adion-avatar .v-icon {
    font-size: 6rem;
    color: #dcdcdc;
    background: #449D78;
}

.presence {
    display: inline-block;
    width: 10px;
    height: 10px;
    border-radius: 50%;
}

.presence.online {
    background-color: #619D44;
}

.presence.offline {
    background-color: #D44A4A;
}

.presence.busy {
    background-color: #F9A825;
}

.presence.away {
    background-color: #9E9E9E;
}



</style>
