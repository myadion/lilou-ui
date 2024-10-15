<template>
    <v-navigation-drawer theme="dark" expand-on-hover rail>
        <v-list>
            <v-list-item to="account" :prepend-avatar="adion.me.avatar"
                :title="adion.me.firstname + ' ' + adion.me.lastname" :subtitle="adion.me.email"></v-list-item>

            <v-list density="compact" nav>
                <v-list-item prepend-icon="mdi-magnify" @click="adion.finder = true" title="Rechercher"></v-list-item>
            </v-list>
        </v-list>

        <v-divider></v-divider>

        <v-list density="compact" nav>
            <v-list-item to="/" prepend-icon="mdi-account-multiple" value="teams" title="Équipes"></v-list-item>
            <v-list-item to="chat" prepend-icon="mdi-forum" value="chat" title="Chat"></v-list-item>
            <v-list-item to="meeting" prepend-icon="mdi-webcam" value="meeting" title="Conférence"></v-list-item>
            <v-list-item to="history" prepend-icon="mdi-phone-clock" value="history"
                title="Journal d'appel"></v-list-item>
            <v-list-item to="wallboard" prepend-icon="mdi-chart-box" value="dashboard" title="Wallboard"></v-list-item>
            <v-list-item to="contacts" prepend-icon="mdi-contacts" value="contacts" title="Contacts"></v-list-item>
            <v-list-item to="voicemail" prepend-icon="mdi-voicemail" value="voicemail" title="Messagerie vocale"></v-list-item>
            <v-list-item to="settings" prepend-icon="mdi-cog" value="settings" title="Paramètres"></v-list-item>
        </v-list>

        <template v-slot:append>
            <v-list density="compact" nav>
                <v-list-item prepend-icon="mdi-power-standby" @click="adion.logout()" value="logout"
                    title="Déconnexion"></v-list-item>
            </v-list>
        </template>
    </v-navigation-drawer>
</template>
<script setup>
import { useAdion } from '@/Adion'
const adion = useAdion()
</script>