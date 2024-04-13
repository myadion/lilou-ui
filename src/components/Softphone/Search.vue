 <template>
    <v-dialog transition="dialog-top-transition" width="25vw" v-model="adion.finder">
        <v-card color="grey-darken-4">

            <v-toolbar color="grey-darken-4">
                <v-toolbar-title>
                    <span class="ml-2">Rechercher un contact</span>
                </v-toolbar-title>
                <v-btn icon @click="adion.finder = false">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-toolbar>

            <v-container class="pt-0">
                <v-text-field v-model="search" label="Extension, numéro, email, nom ou prénom..." single-line rounded autofocus=""
                    class="rounded-pill" density="compact" variant="solo" hide-details s="mdi-magnify"></v-text-field>
            </v-container>

            <p class="pl-5" v-if="result.query">Composer</p>
            <v-row no-gutters class="pb-4" v-if="result.query">
                <v-col cols="12" class="pl-5 pr-5">
                    <item type="compose" :data="result.query"></item>
                </v-col>
            </v-row>

            <p class="pl-5" v-if="result.teams.length > 0">Équipes</p>
            <v-row no-gutters class="pb-4" v-if="result.teams.length > 0">
                <v-col cols="12" class="pl-5 pr-5" v-for="item in result.teams" :key="item">
                    <item type="team" :data="item"></item>
                </v-col>
            </v-row>

            <p class="pl-5" v-if="result.directory.length > 0">Répertoire</p>
            <v-row no-gutters class="pb-4" v-if="result.directory.length > 0">
                <v-col cols="12" class="pl-5 pr-5" v-for="item in result.directory" :key="item">
                    <item type="directory" :data="item"></item>
                </v-col>
            </v-row>

            <p class="pl-5" v-if="result.history.length > 0">Historique</p>
            <v-row no-gutters class="pb-4" v-if="result.history.length > 0">
                <v-col cols="12" class="pl-5 pr-5" v-for="item in result.history" :key="item">
                    <item type="history" :data="item"></item>
                </v-col>
            </v-row>

            <!-- <pre>
                {{ result }}
            </pre> -->
        </v-card>
    </v-dialog>
</template>

<script setup>
import { ref, watchEffect } from 'vue';
import useAdion from '@/Adion'

const adion = useAdion()

const search = ref('')
const result = ref({})

watchEffect(() => {
    result.value = adion.search(search.value)
})

</script>
