<template>
    <v-app>
        <navbar />

        <v-container fluid class="fill-height pa-0 ma-0">
            <div class="adion-container">
                <v-main class="mx-10 my-5 ">
                    <router-view></router-view>
                </v-main>
            </div>
            <div class="adion-softphone bg-surface-variant pa-0">
                <softphone />
            </div>
        </v-container>
    </v-app>
</template>

<style>

.adion-container {
    width: 80%;
    overflow-y: auto;
    height: 100dvh;
    max-height: 100vh;
}

.adion-softphone {
    width: 20%;
    height: 100dvh;
}
</style>
