<template>
    <div class="search-container w-100">    
        <v-select 
            v-model="searchType" 
            :items="searchOptions" 
            item-title="label" 
            item-value="value"
            label="Buscar por:" 
            class="search-type" 
        />
        <v-text-field 
            v-maska="searchType === 'cpf' ? { mask: '###.###.###-##' } : ''"
            v-model="searchQuery" 
            :label="`Busque o aluno por ${searchOptions.find(option => option.value === searchType)?.label}`" 
            clearable 
            class="search-bar" 
            append-inner-icon="mdi-magnify" 
            @click:append-inner="onSearch"
            @keyup.enter="onSearch"
        />
    </div>
</template>

<style scoped>
    .search-container {
        display: flex;
        gap: 16px;
    }

    .search-type {
        min-width: 130px;
    }

    .search-bar {
        width: 100%;
    }
</style>

<script setup>
    import { ref, watch } from 'vue';

    const emit = defineEmits(['search']);

    const searchQuery = ref('');
    const searchType = ref('name');
    const searchOptions = [
        { label: 'Nome', value: 'name' },
        { label: 'RA', value: 'ra' },
        { label: 'CPF', value: 'cpf' }
    ];

    const onSearch = () => {
        if(!searchQuery.value) return;
        if(searchType.value === 'cpf') {
            searchQuery.value = searchQuery.value.replace(/\D/g, '');
        }
        emit('search', { type: searchType.value, query: searchQuery.value });
    };

    const onChange = () => {
        alert('changed');
    };


    watch(searchQuery, (newValue) => {
        if (!newValue) {
            emit('search', { type: searchType.value, query: '' });
        }
    });
</script>
