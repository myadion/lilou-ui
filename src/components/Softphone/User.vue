 <template>
    <v-container>
        <v-row v-if="adion.me.firstname">
            <v-col cols="12" class="adion-avatar">
                <v-badge :color="adion.presence.state().color">
                    <v-avatar rounded class="rounded-pill" size="120px">
                        <template v-if="adion.me.avatar">
                            <v-img :src="adion.me.avatar"></v-img>
                        </template>
                        <template v-else>
                            <v-icon>mdi-account-circle</v-icon>
                        </template>
                    </v-avatar>
                </v-badge>
            </v-col>
            <v-col cols="12" class="adion-presence pa-0 ma-0">
                <v-chip class="ma-2" :color="adion.presence.state().color" label variant="text" @click="adion.presence.edit = true">
                    <v-icon start :icon="adion.presence.state().icon"></v-icon>
                    {{ adion.presence.state().text }}
                </v-chip>
            </v-col>
            <v-col cols="12" class="adion-user pa-0 ma-0">
                <h3>{{ adion.me.firstname }} {{ adion.me.lastname }}</h3>
                <span>{{ adion.me.exten }}</span>
            </v-col>
        </v-row>
        <v-row v-else>
            <v-col cols="12" class="adion-avatar">
                <v-avatar rounded class="rounded-pill" size="120px">
                    <v-skeleton-loader class="mx-auto border" type="image" theme="dark" width="150"></v-skeleton-loader>
                </v-avatar>
            </v-col>
            <v-col cols="12" class="adion-user">
                <v-skeleton-loader class="mx-auto no-bg" type="text" width="150" height="20"
                    theme="dark"></v-skeleton-loader>
                <v-skeleton-loader class="mx-auto no-bg" type="text" width="100" theme="dark"></v-skeleton-loader>
            </v-col>
        </v-row>
    </v-container>

</template>

<script setup>

import useAdion from '@/Adion'

const adion = useAdion()
</script>

<style scoped>
.adion-user {
    text-align: center;
    margin-bottom: 0;
    line-height: 1.4;
}

.adion-user h3 {
    font-size: 1.3rem;
    font-weight: 500;
}
.adion-user span {
    font-size: .8rem;
    font-weight: 300;
}
.adion-presence{
    text-align: center;
}
.adion-avatar {
    text-align: center;
}

.adion-avatar .v-avatar {
    border: 5px solid #3E4F64;
}

.adion-avatar .v-icon {
    font-size: 6rem;
    color: #dcdcdc;
    background: #449D78;
}
.no-bg {
    background: none !important;
}
</style>
