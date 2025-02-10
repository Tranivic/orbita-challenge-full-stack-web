<template>
    <div>
        <div class="d-flex flex-column py-5 w-100 flex-md-row">
            <v-container class="d-flex">
                <SearchBar @search="searchEvent" />
            </v-container>
            <v-container cols="4" class="d-flex justify-center align-center">
                <v-btn to="/cadastro" color="primary"> Cadastrar Aluno </v-btn>
            </v-container>
        </div>
        <div class="w-100 px-4 d-flex">
            <v-data-table-server :search="search" v-model:items-per-page="itemsPerPage" :items-per-page-options="[10, 25, 50, 100]" :headers="mobile._value && mobile? headers.filter(h => !h.hideOnMobile) : headers" :items="students" :items-length="totalItems" :loading="loading" item-value="name" @update:options="loadItems">
                <template v-slot:item.actions="{ item }">
                    <v-icon size="small" class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
                    <v-icon size="small" @click="() => { itemToDelete = item; dialog = true; }">mdi-delete</v-icon>
                </template>
            </v-data-table-server>
            <v-dialog v-model="dialog" max-width="400">
                <v-card>
                    <v-card-title class="">Apagar Aluno</v-card-title>
                    <v-card-text>Voce esta prestes a deletar um aluno, deseja mesmo continuar?</v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn variant="text" color="primary" @click="dialog = false">Cancelar</v-btn>
                        <v-btn variant="text" color="error" @click="confirmDelete">Deletar</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </div>
    </div>
</template>

<script setup>
    import { ref } from "vue";
    import { useRouter } from "vue-router";
    import { useDisplay } from 'vuetify'
    const { formatCpf } = useUtils();
    const router = useRouter();
    const studentState = useState("selectedStudent", () => null);
    const dialog = ref(false);
    const itemToDelete = ref(null);
    const api = useRuntimeConfig().public.baseApiURL;
    const firstLoad = ref(true);
    const students = ref([]);
    const current_page = ref(1);
    const itemsPerPage = ref(10);
    const totalItems = ref(0);
    const loading = ref(true);
    const search_data = ref({ query: "", type: "" });
    const search = ref("");
    const { data } = await useAsyncData(() => $fetch(api + '/students'));
    const { mobile } = useDisplay();
    
    const fetchData = (query) => {
        return $fetch(api + '/students' + query);
    }
    
    const setStudentsValue = (data) => {
        students.value = data;
    }

    if (data.value?.status === 'success') {
        setStudentsValue(data.value.data);
        totalItems.value = data.value.total;
        loading.value = false;
    }
    
    const headers = ref([
        { title: "Registro Acadêmico", key: "ra" },
        { title: "Nome", key: "name" },
        { title: "CPF", key: "cpf", value: (item) => formatCpf(item.cpf), hideOnMobile: true },
        { title: "Email", key: "email", hideOnMobile: true },
        { title: "Ações", key: "actions"},
    ]);

    const editItem = (item) => {
        studentState.value = item;
        router.push("/editar");
    };

    const confirmDelete = async () => {
        dialog.value = false;
        loading.value = true;
        studentState.value = itemToDelete.value;
        await deleteStudent();
        loading.value = false;
    };

    const deleteStudent = async () => {
        const id = studentState.value.ra;
        await $fetch(api + `/students/${id}`, { method: "DELETE" });
        students.value = [];
        const query = `?page=${current_page.value}&limit=${itemsPerPage.value}`;
        const response = await fetchData(query);
        if (response.status === 'success') {
            setStudentsValue(response.data);
            totalItems.value = response.total;
        }
    }

    const searchEvent = async ({ query, type }) => {
        search_data.value = {
            query: query,
            type: type
        };
    }

    const loadItems = async (event) => {
        if (firstLoad.value) {
            firstLoad.value = false;
            return;
        }
        loading.value = true;
        const { page, itemsPerPage, sortBy } = event;
        let query = `?page=${page}&limit=${itemsPerPage}`;
        if(search.value) query += `&${search_data.value.type}=${search.value}`;
        if (sortBy && sortBy.length > 0) {
            const { key, order } = sortBy[0]; // Assume apenas um campo de ordenação
            const sortParam = order === 'desc' ? `-${key}` : key;
            query += `&sort=${sortParam}`;
        }
        const data = await fetchData(query);
        setStudentsValue(data.data);
        current_page.value = page;
        totalItems.value = data.total;
        loading.value = false;
    }

    watch(search_data, (newValue) => {
        search.value = newValue.query;
    });
</script>