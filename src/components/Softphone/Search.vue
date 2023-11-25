 <template>
    <v-dialog transition="dialog-top-transition" width="25vw" v-model="props.show" persistent>
        <v-card color="grey-darken-4">
            <v-toolbar color="grey-darken-4">         
                <v-toolbar-title>
                    <span class="ml-2">Rechercher un contact</span>
                </v-toolbar-title>
                <v-btn icon @click="emit('close')">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-toolbar>
            <v-container class="pt-0">
                <v-text-field v-model="search" label="Extension, numéro, email, nom ou prénom..." single-line rounded class="rounded-pill" density="compact" variant="solo"  hide-details s="mdi-magnify"></v-text-field>
            </v-container>
            <v-row no-gutters class="pb-4">
                <v-col cols="12" class="pl-5 pr-5" v-for="item in items" :key="item.name">
                    <item :name="item.name" :numbers="item.numbers" :extension="item.extension" :avatar="item.avatar" :presence="item.presence"></item>
                </v-col>
            </v-row>
        </v-card>
    </v-dialog>
</template>

<script setup>
import { ref, defineEmits } from 'vue';

let search = '';

const props = defineProps({
    show: Boolean,
});

const emit = defineEmits([
    'close',
]);

const items = [
    {
        name: 'John Doe',
        numbers: [
            {
                type: 'Mobile',
                number: '+33612345678',
            },
            {
                type: 'Bureau',
                number: '+33123456789',
            }
        ],
        avatar: null
    },
    {
        name: 'Jane Doe',
        numbers: [
            {
                type: 'Mobile',
                number: '+33612345678',
            }
        ],
        extension: 101,
        presence: 'offline',
        avatar: null
    },
]

</script>
