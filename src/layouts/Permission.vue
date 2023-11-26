<template>
    <v-app>
        <v-main>
            <v-container fluid fill-height class="pa-0">
                <v-row no-gutters>
                    
                    <v-col cols="12" md="9" class="hide-on-sm-and-down">
                        <div style="height: 100vh; background: url('auth_background.png') center/cover no-repeat;"></div>
                    </v-col>

                    <v-col cols="12" md="3">
                        <v-row align="center" justify="center" style="height: 100vh;margin:0;">
                            <v-card flat style="width: 80%;">
                                <v-card-title class="headline">Autorisations requises</v-card-title>
                                <v-card-text>
                                    Cette application nécessite l'accès à certains périphériques de votre ordinateur pour fonctionner correctement. Veuillez accorder les autorisations nécessaires pour continuer.
                                </v-card-text>
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="primary" text @click="ask_permission">Demander les autorisations</v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-row>
                    </v-col>

                </v-row>
            </v-container>
        </v-main>
    </v-app>
</template>

<script setup>

import { defineEmits } from 'vue';

const emit = defineEmits([
    'reload',
]);

function ask_permission() {
    emit('reload');
}

</script>