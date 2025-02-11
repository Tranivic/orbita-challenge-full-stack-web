<template>
    <div class="w-50">
        <v-form v-model="isFormValid" @submit.prevent="submitForm" lazy-validation  ref="form">
            <v-text-field :disabled="route.path === '/editar'" v-model="academic_register" :rules="[rules.required, rules.number]" label="Registro Acadêmico"></v-text-field>
            <v-text-field :disabled="route.path === '/editar'" v-model="cpf" :rules="[rules.required, rules.cpf]" v-maska="{ mask: '###-###-###.##' }" label="CPF"></v-text-field>
            <v-text-field v-model="name" :rules="[rules.required]" label="Nome"></v-text-field>
            <v-text-field v-model="email" :rules="[rules.required, rules.email]" label="Email"></v-text-field>
            <div class="d-flex w-100 justify-space-around mt-5">
                <v-btn :disabled="disableSaveBtn" type="submit" color="primary">Salvar</v-btn>
                <v-btn to="/lista" color="error">Cancelar</v-btn>
            </div>
        </v-form>
        <v-alert transition="slide-y-transition" v-if="alertData.enable" class="alert position-fixed mt-4 mr-4" closable icon="$vuetify" :text="alertData.text" :type="alertData.type"></v-alert>
    </div>
</template>
<style scoped>
    .alert{
        right: 0;
        top: 50px;
    }
</style>
<script setup>
    import { ref, onMounted, computed } from 'vue';
    const { cpfRule, requiredRule, emailRule, numberRule } = useValidationRules();
    const router = useRouter();
    const form = ref(null);
    const route = useRoute();
    const isFormValid = ref(false);
    const name = ref('');
    const email = ref('');
    const academic_register = ref('');
    const cpf = ref('');

    const alertData = ref({
        enable: false,
        text: '',
        type: '',
    });

    const props = defineProps({
        student: {
            type: Object,
            required: false,
            default: {},
        },
    });

    const disableSaveBtn = computed(() => {
        if(route.path === '/cadastro') return false;
        const oldEmail = props.student.value.email;
        const oldName = props.student.value.name;
        const newEmail = email.value;
        const newName = name.value;
        return oldEmail === newEmail && oldName === newName;
    })
    
    const rules = {
        required: value => requiredRule(value) || 'Campo obrigatório',
        email: value => emailRule(value) || 'E-mail inválido',
        cpf: value => cpfRule(value) || 'CPF inválido',
        number: value => numberRule(value) || 'O Registro Acadêmico deve ser um número',
    };

    const resetFiels = () => {
        name.value = '';
        email.value = '';
        academic_register.value = '';
        cpf.value = '';
    }
    
    const registerStudent = async (api) =>{
        const params = new FormData();
        params.append('name', name.value);
        params.append('email', email.value);
        params.append('ra', academic_register.value);
        params.append('cpf', cpf.value.replace(/[^0-9]/g, ''));
        try {
            const res = await $fetch(api + "/students", {
                method: 'POST',
                header: { 'Content-Type': 'multipart/form-data' },
                body: params,
            });
            if (res.status === 'error') {
                resetFiels();
                throw new Error(res.message);
            }
            alertData.value = {
                text: 'Estudante salvo com sucesso',
                type: 'success',
                enable: true,
            };
            form.value.reset();
        } catch (error) {
            console.error(error);
            alertData.value = {
                text: error.message,
                type: 'error',
                enable: true,
            };
        };
    }

    const updateStudent = async (api) =>{
        const params = new FormData();
        params.append('name', name.value);
        params.append('email', email.value);
        console.log(props.student.value.ra);
        try{
            const res = await $fetch(api + "/students/" + props.student.value.ra, {
                method: 'PUT',
                header: { 'Content-Type': 'multipart/form-data' },
                body: params,
            });
            if (res.status === 'error') {
                throw new Error(res.message);
            }
            alertData.value = {
                text: 'Estudante atualizado com sucesso',
                type: 'success',
                enable: true,
            };
        }catch(error){
            console.error(error);
            alertData.value = {
                text: error.message,
                type: 'error',
                enable: true,
            };
        }
    }

    const submitForm = async () => {
        const api = useRuntimeConfig().public.baseApiURL;
        if (!isFormValid.value) return;
        if(route.path === '/cadastro'){
            await registerStudent(api);
            return
        }
        await updateStudent(api);
    };


    watch(alertData, (newValue) => {
        if (newValue.enable) {
            setTimeout(() => {
                alertData.value = {
                    enable: false,
                    text: '',
                    type: '',
                };
            }, 3000);
        }
    });

    onMounted(() => {
        if (props.student && props.student.value) {
            name.value = props.student.value.name;
            email.value = props.student.value.email;
            academic_register.value = props.student.value.ra;
            cpf.value = props.student.value.cpf;
        }
    });

</script>