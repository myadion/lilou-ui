<template>
    <v-container>
        <h1>Équipes</h1>
        <v-text-field v-model="search" append-icon="mdi-magnify" label="Rechercher une personne ou entrer un numéro"
            single-line hide-details></v-text-field>

        <v-row v-for="person in filteredTeam" :key="person.id" class="py-2">
            <v-col cols="3">
                <v-avatar size="50">
                    <img :src="person.image" :alt="person.name">
                </v-avatar>
            </v-col>
            <v-col cols="3">
                {{ person.name }} <br>
                <span class="caption">{{ person.status }}</span>
            </v-col>
            <v-col cols="6">
                <!-- Icons for call, video call, etc. -->
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    data() {
        return {
            search: '',
            team: [
                // Sample data structure based on the provided image
                { id: 1, name: 'Alisa Lindsey', status: 'Available @ Home', image: 'path_to_image' },
                // ... add more team members as needed
            ],
        };
    },
    computed: {
        filteredTeam() {
            return this.team.filter(member => member.name.toLowerCase().includes(this.search.toLowerCase()));
        }
    }
}
</script>
