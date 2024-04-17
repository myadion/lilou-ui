<template>
    <v-row no-gutters class="fill-height">
        <v-col cols="3" class="overflow-y-auto">
            <v-list class="pa-0">
                <v-list-item v-for="chat in chats" :key="chat.id" :to="chat.id" rounded class="pa-0 mb-1">
                    <v-container class="pt-2 pb-2 ma-0 align-center d-flex ga-5">
                        <v-avatar>
                            <v-img :src="chat.avatar"></v-img>
                        </v-avatar>
                        <v-list-item-content>
                            <v-list-item-title>{{ chat.subject }}</v-list-item-title>
                            <v-list-item-subtitle v-if="chat.messages[0].seen">{{ chat.messages[0].content }}</v-list-item-subtitle>
                            <v-list-item-subtitle v-else><b>Nouveau message</b></v-list-item-subtitle>
                        </v-list-item-content>
                    </v-container>
                </v-list-item>
            </v-list>
        </v-col>
        <v-col cols="9" class="d-flex flex-column">
            <v-card class="flex-grow-1 d-flex flex-column">
                <v-card-title>
                    <v-container class="pa-0 align-center d-flex ga-5">
                        <v-avatar>
                            <v-img :src="selectedChat.avatar"></v-img>
                        </v-avatar>
                        <v-list-item-content>
                            <v-list-item-title>{{ selectedChat.subject }}</v-list-item-title>
                        </v-list-item-content>
                    </v-container>
                </v-card-title>
                <v-divider></v-divider>
                <v-card-text class="flex-grow-1 overflow-y-auto">
                    <v-list>
                        <v-list-item v-for="message in selectedChat.messages" :key="message.date">
                            <v-container class="pt-2 pb-2 ma-0 align-center d-flex ga-5">
                                <v-avatar>
                                    <v-img :src="message.avatar"></v-img>
                                </v-avatar>
                                <v-list-item-content>
                                    <v-list-item-title>
                                        <v-chip v-if="message.src === 'me'" color="primary" class="white--text pa-3">{{ message.content }}</v-chip>
                                        <v-chip v-else color="grey lighten-1" class="white--text pa-3">{{ message.content }}</v-chip>
                                    </v-list-item-title>
                                    <v-list-item-subtitle>{{ message.date }}</v-list-item-subtitle>
                                </v-list-item-content>
                            </v-container>
                        </v-list-item>
                    </v-list>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions class="pa-2">
                    <v-text-field v-model="message" single-line rounded class="flex-grow-1 rounded-pill" density="compact" variant="solo" hide-details></v-text-field>
                    <v-btn icon @click="sendMessage(message)">
                        <v-icon>mdi-send</v-icon>
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-col>
    </v-row>
</template>


<script setup>
import { ref, computed } from 'vue'
import { useAdion } from '@/Adion'
import { useRoute } from 'vue-router'

const route = useRoute()

const adion = useAdion()

const chats = ref([
    {
        id: "99f2c9f7-331c-4edb-b133-ce789d3f3dcf",
        subject: 'Antoine Lamotte',
        avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
        members: [
            {
                id: '99f2c9f7-331c-4edb-b133-ce789d3f3dcf',
                name: 'Antoine Lamotte',
                avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg'
            },
            {
                id: 'me',
            }
        ],
        messages: [
            {
                src: '99f2c9f7-331c-4edb-b133-ce789d3f3dcf',
                content: 'Are you free?',
                date: '2021-09-01T12:04:00',
                seen: false,
                avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
            },
            {
                src: 'me',
                content: 'Hello World',
                date: '2021-09-01T12:00:00',
                avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
            },
            {
                src: '99f2c9f7-331c-4edb-b133-ce789d3f3dcf',
                content: 'Hi',
                date: '2021-09-01T12:01:00',
                avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
                seen: true
            },
            {
                src: 'me',
                content: 'How are you?',
                date: '2021-09-01T12:02:00',
                avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
            },
            {
                src: '99f2c9f7-331c-4edb-b133-ce789d3f3dcf',
                content: 'I am fine',
                date: '2021-09-01T12:03:00',
                seen: true,
                avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
            },
        ]
    },
    {
        id: "22f2c9f7-331c-4edb-b133-ce789d3f3dcf",
        subject: 'John Doe',
        avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
        members: [
            {
                id: '22f2c9f7-331c-4edb-b133-ce789d3f3dcf',
                name: 'John Doe',
                avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg'
            },
            {
                id: 'me',
                avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
            }
        ],
        messages: [
            {
                src: '22f2c9f7-331c-4edb-b133-ce789d3f3dcf',
                content: 'Hi',
                date: '2021-09-01T12:01:00',
                avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
                seen: true
            },
            {
                src: 'me',
                content: 'How are you?',
                date: '2021-09-01T12:02:00',
                avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
            },
            {
                src: '22f2c9f7-331c-4edb-b133-ce789d3f3dcf',
                content: 'I am fine',
                date: '2021-09-01T12:03:00',
                seen: true,
                avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
            },
            {
                src: '22f2c9f7-331c-4edb-b133-ce789d3f3dcf',
                content: 'Are you free?',
                date: '2021-09-01T12:04:00',
                seen: true,
                avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
            },
        ]
    }

])

const selectedChat = computed(() => {
    return chats.value.find(chat => chat.id === route.params.id)
})
</script>