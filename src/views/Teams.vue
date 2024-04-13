<template>
    <h1 class="mb-5">Équipes</h1>

    <v-text-field v-model="search" append-icon="mdi-magnify"
        label="Rechercher une personne ou entrer un numéro" single-line rounded class="rounded-pill" density="compact"
        variant="outlined"></v-text-field>

    <v-row class="py-2 mt-2">
        <template v-if="adion.team.members.length > 0">
            <p v-if="adion.team.search(search).length <= 0">Aucun résultat trouvé</p>
            <v-col cols="4" v-for="person in adion.team.search(search)" :key="person.id">

                <v-card :class="person.do_not_disturb ? 'dnd' : person.line_state">
                    <v-card-actions>
                        <v-list-item class="w-100 pa-0">
                            <template v-slot:prepend>
                                <v-avatar :image="person.avatar"></v-avatar>
                            </template>

                            <v-list-item-title> {{ person.firstname }} {{ person.lastname }} </v-list-item-title>
                            <v-list-item-subtitle><b>{{ person.exten }}</b></v-list-item-subtitle>
                            <v-list-item-subtitle>{{ person.status }}&nbsp;</v-list-item-subtitle>

                            <template v-slot:append>
                                <div class="justify-self-end mr-1">
                                    <!-- <v-btn density="compact" icon="mdi-phone"></v-btn>
                                    <v-btn density="compact" icon="mdi-video"></v-btn>
                                    <v-btn density="compact" icon="mdi-chat"></v-btn> -->
                                    <v-menu transition="slide-y-transition">
                                        <template v-slot:activator="{ props }">
                                            <v-btn v-bind="props" density="compact" icon="mdi-dots-horizontal"></v-btn>
                                        </template>
                                        <v-card class="mx-auto" max-width="300">
                                            <v-list density="compact">
                                                <v-list-item :to="'mailto:' + person.email" value="1" color="primary">
                                                    <template v-slot:prepend>
                                                        <v-icon icon="mdi-email-arrow-right"></v-icon>
                                                    </template>
                                                    <v-list-item-title>Envoyer un email</v-list-item-title>
                                                </v-list-item>
                                                <!-- <v-list-item  value="2" color="primary">
                                                    <template v-slot:prepend>
                                                        <v-icon icon="mdi-bullhorn"></v-icon>
                                                    </template>
                                                    <v-list-item-title>Interphone</v-list-item-title>
                                                </v-list-item>
                                                <v-list-item  value="2" color="primary">
                                                    <template v-slot:prepend>
                                                        <v-icon icon="mdi-sign-real-estate"></v-icon>
                                                    </template>
                                                    <v-list-item-title>Définir le statut</v-list-item-title>
                                                </v-list-item>
                                                <v-list-item  value="2" color="primary">
                                                    <template v-slot:prepend>
                                                        <v-icon icon="mdi-voicemail"></v-icon>
                                                    </template>
                                                    <v-list-item-title>Laisser un message vocal</v-list-item-title>
                                                </v-list-item>
                                                <v-list-item  value="2" color="primary">
                                                    <template v-slot:prepend>
                                                        <v-icon icon="mdi-star-outline"></v-icon>
                                                    </template>
                                                    <v-list-item-title>Ajouter au favoris</v-list-item-title>
                                                </v-list-item> -->
                                            </v-list>
                                        </v-card>
                                    </v-menu>
                                </div>
                            </template>
                        </v-list-item>
                    </v-card-actions>
                </v-card>
            </v-col>
        </template>
        <template v-else>
            <v-col cols="4" v-for="n in 4" :key="n">
                <v-card class="unavailable">
                    <v-card-actions>
                        <v-list-item class="w-100 pa-0">
                            <template v-slot:prepend>
                                <v-avatar>
                                    <v-skeleton-loader class="mx-auto border" type="image"
                                        width="100"></v-skeleton-loader>
                                </v-avatar>
                            </template>

                            <v-list-item-title>
                                <v-skeleton-loader type="list-item-two-line"></v-skeleton-loader>
                            </v-list-item-title>

                            <template v-slot:append>
                                <v-skeleton-loader type="button" width="40"></v-skeleton-loader>
                                <v-skeleton-loader type="button" width="40"></v-skeleton-loader>
                                <v-skeleton-loader type="button" width="40"></v-skeleton-loader>
                                <v-skeleton-loader type="button" width="40"></v-skeleton-loader>
                            </template>
                        </v-list-item>
                    </v-card-actions>
                </v-card>
            </v-col>
        </template>
    </v-row>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useAdion } from '@/Adion'
const adion = useAdion()
    const search = ref('')

</script>
<style scoped>
.available {
    border-right:8px solid #32c35b;
}
.away {
    border-right:8px solid #f7b924;
}
.dnd {
    border-right:8px solid #f05050;
}
.unavailable {
    border-right:8px solid #6c757d;
}

.talking {
    border-right:8px solid #32c35b;
    animation: blink-talking 1s infinite;
}

@keyframes blink-talking {
  0%   { border-right:8px solid #f05050; }
  50%  { border-right:8px solid transparent; }
  100% { border-right:8px solid #f05050; }
}

@keyframes blink-ringing {
  0%   { border-right:8px solid #f7b924; }
  50%  { border-right:8px solid transparent; }
  100% { border-right:8px solid #f7b924; }
}

.progressing, .ringing {
  animation: blink-ringing 1s infinite;
}

</style>