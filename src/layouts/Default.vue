<template>
    <v-app>
        <!-- Sidebar à gauche -->
        <navbar />

        <v-container fluid class="fill-height pa-0">
            <v-row class="fill-height">
                <!-- Contenu principal -->
                <v-col cols="10" class="scrolling-content">
                    <v-main class="mx-10 my-5 ">
                        <router-view></router-view>
                    </v-main>
                </v-col>

                <!-- Softphone à droite -->
                <v-col cols="2" class="bg-surface-variant fixed-softphone">
                    <softphone />
                </v-col>
            </v-row>
        </v-container>
    </v-app>
</template>

<style>
/* Style pour fixer le softphone à droite */
.fixed-softphone {
    position: sticky;
    top: 0;
    height: 100vh;
    /* prend la hauteur totale de la fenêtre de visualisation */
}

/* Style pour rendre le contenu principal déroulant */
.scrolling-content {
    max-height: 100vh;
    /* hauteur maximale égale à la fenêtre de visualisation */
    overflow-y: auto;
    /* permet le défilement vertical si le contenu dépasse la hauteur maximale */
}</style>
