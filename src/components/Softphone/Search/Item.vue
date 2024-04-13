 <template>
    <!-- compose -->
    <v-card class="adion-hold" v-if="type === 'compose'" @click="adion.call.new(data)" link>
        <v-row class="align-center">
            <v-col cols="2" class="adion-avatar">
                <v-avatar rounded class="rounded-pill" size="35px">
                    <v-img :src="computedAvatar"></v-img>
                </v-avatar>
            </v-col>
            <v-col cols="8" class="adion-user" v-if="data">
                <h3>{{ data }}</h3>
            </v-col>
            <v-col cols="2" class="adion-btn">
                <v-icon size="20">mdi-dialpad</v-icon>
            </v-col>
        </v-row>
    </v-card>

    <!-- team -->
    <v-card class="adion-hold" v-if="type === 'team'"
        @click="(props.data.numbers.length > 0) ? expended = !expended : adion.call.new(data.extension)" link>
        <v-row class="align-center">
            <v-col cols="2" class="adion-avatar">
                <v-avatar rounded class="rounded-pill" size="35px">
                    <v-img :src="computedAvatar"></v-img>
                </v-avatar>
            </v-col>
            <v-col cols="8" class="adion-user" v-if="data.name">
                <h3>{{ data.name }} <small v-if="data.extension">{{ data.extension }} </small></h3>
                <p v-for="number in data.numbers" :key="number.type">{{ number.type }}: {{ number.number }}</p>
            </v-col>
            <v-col cols="2" class="adion-btn">
                <v-icon size="20">mdi-account-group</v-icon>
                <span v-if="data.presence" class="presence" :class="data.presence"></span>
            </v-col>
        </v-row>
    </v-card>

    <!-- directory -->
    <v-card class="adion-hold" v-if="type === 'directory'"
        @click="(data.numbers.length > 1) ? expended = !expended : adion.call.new(data.numbers[0].number)" link>
        <v-row class="align-center">
            <v-col cols="2" class="adion-avatar">
                <v-avatar rounded class="rounded-pill" size="35px">
                    <v-img :src="computedAvatar"></v-img>
                </v-avatar>
            </v-col>
            <v-col cols="8" class="adion-user" v-if="data.name">
                <h3>{{ data.name }} <small v-if="data.extension">{{ data.extension }} </small></h3>
                <p v-for="number in data.numbers" :key="number.type">{{ number.type }}: {{ number.number }}</p>
            </v-col>
            <v-col cols="2" class="adion-btn">
                <v-icon size="20">mdi-book-account</v-icon>
            </v-col>
        </v-row>
    </v-card>

    <!-- history -->
    <v-card class="adion-hold" v-if="type === 'history'"
        @click="(props.data.numbers) ? (props.data.extension ?? adion.call.new(data.extension)): adion.call.new(data.number)" link>
        <v-row class="align-center">
            <v-col cols="2" class="adion-avatar" v-if="data.name">
                <v-avatar rounded class="rounded-pill" size="35px">
                    <v-img :src="computedAvatar"></v-img>
                </v-avatar>
            </v-col>
            <v-col cols="2" v-else>
                <v-avatar rounded class="rounded-pill" size="35px">
                    <v-icon>mdi-account</v-icon>
                </v-avatar>
            </v-col>
            <v-col cols="8" class="adion-user">
                <h3 v-if="data.name !== null">{{ data.name }} <small v-if="data.extension">{{ data.extension }} </small>
                </h3>
                <h3 v-else>{{ data.number }} <small v-if="data.extension">{{ data.extension }}</small></h3>
                <p>{{ new Date(data.date).toLocaleString( 'fr-FR', { hour: 'numeric', minute: 'numeric', day: 'numeric', month: 'numeric'}) }}</p>
            </v-col>
            <v-col cols="2" class="adion-btn">
                <v-icon size="20" v-if="data.direction === 'inbound'">mdi-call-received</v-icon>
                <v-icon size="20" v-if="data.direction === 'outbound'">mdi-call-made</v-icon>
                <v-icon size="20" v-if=" data.presence">mdi-account-group</v-icon>
                <span v-if="data.presence" class="presence" :class="data.presence"></span>
            </v-col>
        </v-row>
    </v-card>

    <v-row v-if="expended">
        <v-col cols="11" class="mx-auto">
            <v-row no-gutters>
                <v-col cols="4" v-if="data.extension" class="pa-1">
                    <v-card @click="adion.call.new(data.extension.toString())" link :color="computedPresenceColor"
                        class="text-center">
                        <small>Interne</small><br>
                        <h5>{{ data.extension.toString() }}</h5>
                    </v-card>
                </v-col>
                <v-col cols="4" v-for="number in data.numbers" :key="number.type" class="pa-1">
                    <v-card @click="adion.call.new(number.number)" link class="text-center">
                        <small>{{ number.type }}</small><br>
                        <h5>{{ number.number }}</h5>
                    </v-card>
                </v-col>
            </v-row>
        </v-col>
    </v-row>
</template>

<script setup>
import { ref, computed } from 'vue';
import useAdion from '@/Adion'

const adion = useAdion()

const props = defineProps({
    type: String,
    data: Object|String
});

let expended = ref(false);

const computedHistoryNumber = computed(() => {
    if(props.data === undefined) return 

    if(props.data.call_direction === 'outbound') return props.data.destination_extension
    if(props.data.call_direction === 'inbound') return props.data.source_extension
})

const computedName = computed(() => {
    const names = props.data.name.split(' ');
    if (names.length > 1) {
        return `${names[0]} ${names[1]}`;
    } else {
        return `${names[0]}`;
    }
});

const computedAvatar = computed(() => {

    if(props.type === 'compose') return `https://ui-avatars.com/api/color=fff&?background=random&name=${props.data}`;
    if(props.type === 'directory') return `https://ui-avatars.com/api/color=fff&?background=random&name=${props.data.name}`;
    else return `https://ui-avatars.com/api/color=fff&?background=random&name=${computedName.value}`;
})

const computedPresenceColor = computed(() => {
    if (props.data.presence) {
        switch (props.data.presence) {
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

.presence.available {
    background-color: #619D44;
}

.presence.unavailable {
    background-color: #D44A4A;
}

.presence.busy {
    background-color: #F9A825;
}

.presence.away {
    background-color: #9E9E9E;
}



</style>
