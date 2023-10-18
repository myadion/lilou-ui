<template>
    <v-app>
        <!-- Sidebar à gauche -->
            <navbar />

        <v-container fluid class="fill-height pa-0">
            <v-row class="fill-height">
                <!-- Contenu principal -->
                <v-col cols="10">
                    <v-main class="mx-10 my-5">
                        <router-view></router-view>
                    </v-main>
                </v-col>

                <!-- Softphone à droite -->
                <v-col cols="2" class="bg-surface-variant">
                    <softphone />
                </v-col>
            </v-row>
        </v-container>
    </v-app>
</template>
