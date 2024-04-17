 <template>
    <v-dialog transition="dialog-top-transition" width="25vw" v-model="adion.presence.edit">
        <v-card color="grey-darken-4">
            <v-toolbar color="grey-darken-4">
                <v-toolbar-title >
                    {{ adion.me.firstname }} {{ adion.me.lastname }} <small>({{ adion.presence.state().text }})</small>
                </v-toolbar-title>
                <v-btn icon @click="adion.presence.edit = false">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-toolbar>
            <v-card-subtitle class="mb-3">Définir un message personalisé:</v-card-subtitle>
            <v-container class="pt-0 align-center d-flex ga-5">
                <v-text-field v-model="status" single-line rounded class="rounded-pill" density="compact" variant="solo" hide-details></v-text-field>
                <v-icon v-if="adion.presence.status() !== status" @click="adion.presence.editStatus(status)">mdi-check</v-icon>
            </v-container>
            <v-divider></v-divider>
            <v-card-subtitle class="mt-5">Changement de statut:</v-card-subtitle>
            <v-container class="d-flex ga-5 flex-wrap">
                <v-chip v-for="item in adion.presence.type" :key="item" :color="item.color" @click="adion.presence.editPresence(item.value)">
                    <v-icon v-if="item.icon" start>{{ item.icon }}</v-icon>
                    {{ item.text }}
                </v-chip>
            </v-container>
        </v-card>
    </v-dialog>
</template>

<script setup>
import { ref, watchEffect } from 'vue';
import useAdion from '@/Adion'

const adion = useAdion()

const status = ref(adion.presence.status())

watchEffect(() => {
    status.value = adion.presence.status()
})
</script>
