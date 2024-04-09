<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { ICustomer, ICustomerDto } from '../types/customer.type';
import { nameWithRequireAnd20CharactersRules } from '../utils/validate.utils';

const props = defineProps<{ title: string, customer?: ICustomer, isPending?: boolean }>();
const emit = defineEmits(['formSubmit'])
const router = useRouter();
const isFormValid = ref(false);
const model = ref<ICustomerDto>({ name: '', tags: [] });

watch(() => props.customer, () => {
    if (props.customer) {
        model.value = { name: props.customer.name, tags: props.customer.tags }
    }
})

const onFormSubmit = () => {
    if (isFormValid.value) {
        emit('formSubmit', model.value);
    }
}

const onCancelClick = () => {
    router.push('/')
}
</script>

<template>
    <div class="w-100">
        <h1 class="text-h2">{{ props.title }}</h1>
        <v-form v-model="isFormValid" class="mt-6" @submit.prevent="onFormSubmit">
            <!-- Customer name -->
            <v-text-field v-model="model.name" :rules="nameWithRequireAnd20CharactersRules"
                label="Customer name"></v-text-field>

            <!-- Customer tags -->
            <v-combobox v-model="model.tags" item-title="title" item-value="id" label="Add tags" multiple outlined
                :allow-overflow="false">
                <template v-slot:selection="{ attrs, item, selected }">
                    <v-chip v-bind="attrs" :input-value="selected" close-icon="mdi-close" label small closable>
                        <span class="pr-2">
                            {{ item.title }}
                        </span>
                    </v-chip>
                </template>
            </v-combobox>

            <v-row>
                <v-col><v-btn class="mt-2" type="submit" color="primary" block :disabled="props.isPending"
                        :loading="isPending">Submit</v-btn></v-col>
                <v-col><v-btn class="mt-2" type="button" color="" block @click="onCancelClick">Cancel</v-btn></v-col>
            </v-row>
        </v-form>
    </div>
</template>

<style scoped></style>