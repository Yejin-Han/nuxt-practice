<template>
  <UForm :schema="schema" :state="state">
    <UFormGroup label="여행 일정" :required="true">
      <div class="flex justify-between items-center">
        <UInput type="date" v-model="state.start_date" class="flex-1" />
        <span class="mx-4">~</span>
        <UInput type="date" v-model="state.end_date" class="flex-1" />
      </div>
    </UFormGroup>
    <UFormGroup label="여행 국가" :required="true">
      <USelectMenu v-model="state.country" :options="countries" />
    </UFormGroup>
    <UFormGroup label="인원" :required="true">
      <div class="flex justify-around items-center">
        <UButton @click="decreasePeople" icon="i-heroicons-minus-circle" color="white" variant="ghost" size="lg" />
        <span class="text-center text-xl text-bold">{{ state.people }}</span>
        <UButton @click="increasePeople" icon="i-heroicons-plus-circle" color="white" variant="ghost" size="lg" />
      </div>
    </UFormGroup>
    <UFormGroup label="가계부 이름" :required="true">
      <UInput v-model="state.name" />
    </UFormGroup>
    <div>
      <UFormGroup label="개인 예산">
        <div class="flex justify-between items-center">
          <UInput type="number" v-model.number="state.personal_budget" :disabled="state.isPersonalBudgetUndefined" />
          <UCheckbox label="미정" v-model="state.isPersonalBudgetUndefined" />
        </div>
      </UFormGroup>
      <UFormGroup v-if="state.people > 1" label="공금 예산">
        <div class="flex justify-between items-center">
          <UInput type="number" v-model.number="state.group_budget" :disabled="state.isGroupBudgetUndefined" />
          <UCheckbox label="미정" v-model="state.isGroupBudgetUndefined" />
        </div>
      </UFormGroup>
    </div>
  </UForm>
</template>

<script setup>
import { z } from 'zod'

const countries = useCountries()

const schema = z.object({
  start_date: z.string().date(),
  end_date: z.string().date(),
  country: z.enum(countries),
  people: z.number().min(1),
  name: z.string(),
  group_budget: z.union([z.number().min(0), z.null()]),
  personal_budget: z.union([z.number().min(0), z.null()])
})

const state = ref({
  start_date: null,
  end_date: null,
  country: countries[0],
  people: 1,
  name: '',
  group_budget: null,
  personal_budget: null,
  isGroupBudgetUndefined: false,
  isPersonalBudgetUndefined: false,
})

const decreasePeople = () => {
  if(state.value.people <= 1) return
  else state.value.people--
}
const increasePeople = () => {
  if(state.value.people >= 10) return
  else state.value.people++
}
</script>

<style>
input[type='number']::-webkit-inner-spin-button,
input[type='number']::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input[type='number'] {
  -moz-appearance: textfield;
  appearance: none;
}
/* 너무 열받지만 overflow-x-hidden 안걸어놓으면 가로스크롤생기고, translateX도 애매하게 생겨서 너ㅓㅓㅓ무 열받아요 아직 못고침.. */
</style>

