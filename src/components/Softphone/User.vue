 <template>
    <v-container>
        <v-row v-if="me.firstname">
            <v-col cols="12" class="adion-avatar">
                <v-badge :color="computedPresenceColor">
                    <v-avatar rounded class="rounded-pill" size="120px">
                        <template v-if="computedAvatar">
                            <v-img :src="computedAvatar"></v-img>
                        </template>
                        <template v-else>
                            <v-icon>mdi-account-circle</v-icon>
                        </template>
                    </v-avatar>
                </v-badge>
            </v-col>
            <v-col cols="12" class="adion-presence pa-0 ma-0">
                <v-menu location="end">
                    <template v-slot:activator="{ props }">
                        <v-chip class="ma-2" :color="computedPresenceColor" label v-bind="props" variant="default" >
                            <v-icon start icon="mdi-account-circle-outline"></v-icon>
                            {{ computedPresenceName }}
                        </v-chip>
                    </template>

                    <v-list>
                        <v-list-item>
                            <v-list-item-title>
                                <v-radio-group v-model="me.state" row>
                                    <v-radio
                                        v-for="item in presenceList"
                                        :key="item.value"
                                        :label="item.text"
                                        :value="item.value"
                                        :color="item.value === 'dnd' ? 'error' : 'success'"
                                    ></v-radio>
                                </v-radio-group>
                            </v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>
            </v-col>
            <v-col cols="12" class="adion-user pa-0 ma-0">
                <h3>{{ me.firstname }} {{ me.lastname }}</h3>
                <span>{{ me.exten }}</span>
            </v-col>
        </v-row>
        <v-row v-else>
            <v-col cols="12" class="adion-avatar">
                <v-avatar rounded class="rounded-pill" size="120px">
                    <v-skeleton-loader
                        class="mx-auto border"
                        type="image"
                         theme="dark"
                        width="150"
                    ></v-skeleton-loader>
                </v-avatar>
            </v-col>
            <v-col cols="12" class="adion-user">
                <v-skeleton-loader
                    class="mx-auto no-bg"
                    type="text"
                    width="150"
                    height="20"
                    theme="dark"
                ></v-skeleton-loader>
                <v-skeleton-loader
                    class="mx-auto no-bg"
                    type="text"
                    width="100"
                    theme="dark"
                ></v-skeleton-loader>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
import { ref, computed } from 'vue'
import useTeamStore from '@/stores/team';
const team = useTeamStore();

const me = team.me
console.log(me)
const computedAvatar = computed(() => {
    if (me.avatar) {
        return me.avatar;
    } else if (me.firstname && me.lastname) {
        return `https://ui-avatars.com/api/?color=fff&background=random&name=${me.firstname}+${me.lastname}`;
    }
    return null;
});

const presenceList = [
    { text: 'Disponible', value: 'available' },
    { text: 'Absent', value: 'away' },
    { text: 'Ne pas déranger', value: 'dnd' },
];

const computedPresenceName = computed(() => {
    if(me.do_not_disturb){        
        return 'Ne pas déranger';
    }

    if (me.state === 'available') {
        return 'Disponible';
    } 
    
    if (me.state === 'away') {
        return 'Absent';
    } 
    
    if (me.state === 'dnd') {
        return 'Ne pas déranger';
    }
});

const computedPresenceColor = computed(() => {
    if(me.do_not_disturb){        
        return 'error';
    }

    if (me.state === 'available') {
        return 'success';
    } 
    
    if (me.state === 'away') {
        return 'warning';
    } 
    
    if (me.state === 'dnd') {
        return 'error';
    }


    return 'grey';
});
</script>

<style scoped>
.adion-user {
    text-align: center;
    margin-bottom: 0;
    line-height: 1.4;
}

.adion-user h3 {
    font-size: 1.3rem;
    font-weight: 500;
}
.adion-user span {
    font-size: .8rem;
    font-weight: 300;
}
.adion-presence{
    text-align: center;
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
.no-bg {
    background: none !important;
}
</style>
