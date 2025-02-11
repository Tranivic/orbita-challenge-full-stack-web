<template>
    <NuxtLayout>
        <main class="page">
            <div class="d-flex py-5">
                <div class="w-100 d-flex">
                    <v-container class="d-flex justify-center align-center">
                        <StudentForm :student="student" />
                    </v-container>
                </div>
            </div>
        </main>
    </NuxtLayout>
</template>
<script setup>
import { ref, onBeforeMount } from 'vue'
const route = useRoute();
const student = ref(null);

definePageMeta({
    alias: "/editar",
    middleware: [
        (to) => {
            const student = useState("selectedStudent");
            if (to.fullPath === "/editar" && !student.value) {
                return navigateTo("/");
            }
        },
    ],
});

onBeforeMount(() => {
    if(route.path === "/editar"){
        student.value = useState("selectedStudent");
    }
});

</script>
