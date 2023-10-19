<template>
    <v-container class="softphone">
        <v-row class="text-center mt-5">
            <v-col>
                <h2 class="white--text">{{ currentCall }}</h2>
            </v-col>
        </v-row>

        <v-row class="text-center mt-10">
            <v-col>
                <v-avatar size="100">
                    <v-icon size="100" color="grey lighten-2">mdi-account-circle</v-icon>
                </v-avatar>
            </v-col>
        </v-row>

        <v-row class="text-center mt-3">
            <v-col>
                <h3 class="white--text">1:24</h3>
            </v-col>
        </v-row>

        <v-row class="text-center mt-5">
            <v-col cols="4">
                <v-btn text icon color="white">
                    <v-icon>mdi-volume-high</v-icon>
                </v-btn>
            </v-col>
            <v-col cols="4">
                <v-btn text icon color="white">
                    <v-icon>mdi-pause</v-icon>
                </v-btn>
            </v-col>
            <v-col cols="4">
                <v-btn text icon color="white">
                        <v-icon>mdi-microphone-off</v-icon>
                </v-btn>
            </v-col>
        </v-row>

        <v-row class="text-center mt-5">
            <v-col cols="4">
                <v-btn text icon color="white">
                    <v-icon>mdi-dialpad</v-icon>
                </v-btn>
            </v-col>
            <v-col cols="4">
                <v-btn text icon color="white">
                    <v-icon>mdi-record-circle-outline</v-icon>
                </v-btn>
            </v-col>
            <v-col cols="4">
                <v-btn text icon color="white">
                    <v-icon>mdi-dots-horizontal</v-icon>
                </v-btn>
            </v-col>
        </v-row>

        <v-row class="text-center mt-10">
            <v-col>
                <v-btn x-large fab color="red">
                    <v-icon white>mdi-phone-hangup</v-icon>
                </v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    data() {
        return {
            currentCall: '(989) 772-6463'
        };
    }
}
</script>

<style scoped>
.softphone {
    background-color: #1b1b46;
    /* darkblue */
    height: 100vh;
    color: white;
}
</style>
