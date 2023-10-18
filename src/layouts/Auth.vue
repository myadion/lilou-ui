<template>
    <v-app>
        <v-main>
            <v-container fluid fill-height class="pa-0">
                <v-row no-gutters>
                    <!-- Image à gauche -->
                    <v-col cols="12" md="9" class="hide-on-sm-and-down">
                        <div style="height: 100vh; background: url('auth_background.png') center/cover no-repeat;"></div>
                    </v-col>

                    <!-- Formulaire à droite -->
                    <v-col cols="12" md="3">
                        <v-row align="center" justify="center" style="height: 100vh; width: 100%;">
                            <v-card :loading="loading" flat style="width: 80%;">
                                <v-form ref="form">
                                    
                                    <div class="text-subtitle-1 text-medium-emphasis">Compte</div>

                                    <v-text-field
                                        autocomplete="email"
                                        :rules="[rules.required, rules.email]"
                                        density="compact"
                                        placeholder="Entrez votre adresse mail"
                                        prepend-inner-icon="mdi-email-outline"
                                        variant="outlined"
                                        v-model="email"
                                        required
                                    ></v-text-field>

                                    <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
                                        Mot de passe
                                    </div>

                                     <v-text-field
                                        autocomplete="password"
                                        :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
                                        :type="visible ? 'text' : 'password'"
                                        :rules="[rules.required]"
                                        density="compact"
                                        placeholder="Entrez votre mot de passe"
                                        prepend-inner-icon="mdi-lock-outline"
                                        variant="outlined"
                                        @click:append-inner="visible = !visible"
                                        v-model="password"
                                        required
                                    >
                                    </v-text-field>

                                    <v-btn block class="mb-8" color="blue" size="large" variant="tonal" @click="login"> Connexion </v-btn>
                                </v-form>
                                <v-alert v-if="error"
                                icon="mdi-alert-circle"
                                :title="error"
                                type="error"
                                ></v-alert>
                            </v-card>
                        </v-row>
                    </v-col>
                </v-row>
            </v-container>
        </v-main>
    </v-app>
</template>
<script setup>
import { ref } from 'vue'
import useWazoService from '@/stores/wazo'

const wazo = useWazoService()
// wazo.reset()

let visible = false

const loading = ref(false)
const error = ref(false)
const email = ref('')
const password = ref('')
const form = ref(null)

const rules = {
    required: v => !!v || 'Champ requis',
    email: v => /.+@.+/.test(v) || 'Adresse email non valide'
}

function login() {
    loading.value = true
    if (form.value.validate()) {
        const auth = wazo.login(email.value, password.value)
        .catch(err => {
            loading.value = false
            error.value = err.message
        })
    }
}

</script>