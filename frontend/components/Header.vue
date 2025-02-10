<template>
    <v-app-bar color="primary">
        <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <v-toolbar-title>Grupo A</v-toolbar-title>
        <v-spacer></v-spacer>
    </v-app-bar>
    <client-only>
        <v-navigation-drawer location="left" v-model="drawer" temporary>
            <v-list>
                <nuxt-link v-for="(item, i) in items" :key="i" :to="item.link">
                    <v-list-item :value="item" :active="(route.path === item.link) || (route.path === item.alias)" color="primary">
                        <template v-slot:prepend>
                            <v-icon :icon="item.icon"></v-icon>
                        </template>
                        <v-list-item-title v-text="item.text"></v-list-item-title>
                    </v-list-item>
                </nuxt-link>
            </v-list>
        </v-navigation-drawer>
    </client-only>
</template>

<style scoped>
    header{
        position: static !important;
    }
    a{
        text-decoration: none;
        color: inherit;
    }
</style>
  
<script setup>
    import { ref } from 'vue';
    import { useRoute } from 'vue-router';

    const route = useRoute();
    const drawer = ref(false);
    const items = ref([
        { text: 'Lista', icon: 'mdi-view-list', link: '/lista', alias: '/' },
        { text: 'Cadastro', icon: 'mdi-account-plus', link: '/cadastro', alias: '' },
    ]);
</script>