<template>
  <UForm :schema="schema" :state="state" ref="form" @submit="submitAccountBookForm">
    <UFormGroup label="여행 일정" :required="true" class="mb-8">
      <div class="flex justify-between items-center">
        <UInput type="date" name="start_date" v-model="state.start_date" class="flex-1" :color="errorsMap.start_date ? 'red' : 'white'" />
        <span class="mx-4">~</span>
        <UInput type="date" name="end_date" v-model="state.end_date" class="flex-1" :color="errorsMap.end_date ? 'red' : 'white'" />
      </div>
      <p v-if="errorsMap.start_date" class="mt-2 text-red-500 dark:text-red-400 text-sm">{{ errorsMap.start_date }}</p>
      <p v-else-if="errorsMap.end_date" class="mt-2 text-red-500 dark:text-red-400 text-sm">{{ errorsMap.end_date }}</p>
    </UFormGroup>
    <UFormGroup label="여행 국가" :required="true" class="mb-8">
      <USelectMenu v-model="state.country" :options="countries" value-attribute="value" option-attribute="label" :ui="{ strategy: 'override' }" :popper="{ placement: 'bottom-start', offsetSkid: -7.5, adaptive: false }" />
    </UFormGroup> 
    <UFormGroup label="인원" :required="true" class="mb-8">
      <div class="flex justify-around items-center">
        <UButton @click="decreasePeople" icon="i-heroicons-minus-circle" color="white" variant="ghost" size="lg" />
        <span class="text-center text-xl text-bold">{{ state.people }}</span>
        <UButton @click="increasePeople" icon="i-heroicons-plus-circle" color="white" variant="ghost" size="lg" />
      </div>
    </UFormGroup>
    <UFormGroup label="가계부 이름" :required="true" class="mb-8">
      <UInput v-model="state.name" :color="errorsMap.name ? 'red' : 'white'" />
      <p v-if="errorsMap.name" class="mt-2 text-red-500 dark:text-red-400 text-sm">{{ errorsMap.name }}</p>
    </UFormGroup>
    <div>
      <UFormGroup label="개인 예산" class="mb-8">
        <div class="flex justify-between items-center">
          <UInput type="number" v-model.number="state.personal_budget" :color="errorsMap.personal_budget ? 'red' : 'white'" :disabled="state.isPersonalBudgetUndefined" />
          <UCheckbox label="미정" v-model="state.isPersonalBudgetUndefined" />
        </div>
        <p v-if="errorsMap.personal_budget" class="mt-2 text-red-500 dark:text-red-400 text-sm">{{ errorsMap.personal_budget }}</p>
      </UFormGroup>
      <UFormGroup v-if="state.people > 1" label="공금 예산" class="mb-8">
        <div class="flex justify-between items-center">
          <UInput type="number" v-model.number="state.group_budget" :color="errorsMap.group_budget ? 'red' : 'white'" :disabled="state.isGroupBudgetUndefined" />
          <UCheckbox label="미정" v-model="state.isGroupBudgetUndefined" />
        </div>
        <p v-if="errorsMap.group_budget" class="mt-2 text-red-500 dark:text-red-400 text-sm">{{ errorsMap.group_budget }}</p>
      </UFormGroup>
    </div>
    <div class="w-full text-center mt-16">
      <UButton type="submit" color="black" size="lg" class="text-md" label="가계부 생성" :loading="isLoading" />
    </div>
  </UForm>
</template>

<script setup>
import { z } from 'zod'

const countries = useCountries()

const props = defineProps(['isLoading'])
const emit = defineEmits(['submit'])

const form = ref()
const state = ref({
  start_date: undefined,
  end_date: undefined,
  country: countries[0],
  people: 1,
  name: undefined,
  group_budget: null,
  personal_budget: null,
  isGroupBudgetUndefined: false,
  isPersonalBudgetUndefined: false,
})

const schema = z.object({
  start_date: z.preprocess((val) => {
    if (val === '' || val === null || val === undefined) return null; // 빈 값 처리 (date 선택 후 삭제 시)
    return val;
  }, z.string().nullable()), // nullable로 변경하여 superRefine에서 처리 
  end_date: z.preprocess((val) => {
    if (val === '' || val === null || val === undefined) return null; 
    return val;
  }, z.string().nullable()),
  country: z.object({
    label: z.string(),
    value: z.string()
  }),
  people: z.number().min(1),
  name: z.string().optional(), // 실제로는 required true지만 기본검증이 이루어지지 않아야 date관련 검증 다 끝내고 후순위로 올 수 있어서 optional 부여
  group_budget: z.number().min(0).nullable(),
  personal_budget: z.union([z.number().min(0), z.null()]), // union을 쓰는 방법은 좀 더 다양한 type과의 결합 가능
  isGroupBudgetUndefined: z.boolean(),
  isPersonalBudgetUndefined: z.boolean()
}).superRefine((data, ctx) => { // refine: 커스텀 유효성 검사 정의 가능, superRefine: 기본검증과 refine 검증 동시에 실행

  // 1. `start_date`, `end_date`가 비어있으면 원하는 에러 메시지 표시
  if (!data.start_date) {
    ctx.addIssue({
      message: '시작일을 선택해주세요.',
      path: ['start_date']
    })
    return
  }

  if (!data.end_date) {
    ctx.addIssue({
      message: '종료일을 선택해주세요.',
      path: ['end_date']
    })
    return
  }

  // 2. 시작일, 종료일 관계 검증
  if (new Date(data.start_date) > new Date(data.end_date)) {
    ctx.addIssue({
      message: '종료일이 시작일보다 빠릅니다.',
      path: ['end_date']
    })
    return
  }

  // 3. 가계부 이름 검증
  if (!data.name) {
    ctx.addIssue({
      message: '가계부 이름을 입력해주세요.',
      path: ['name']
    })
  }

  // 4. 예산 검증
  if (data.personal_budget === null && !data.isPersonalBudgetUndefined) {
    ctx.addIssue({
      message: '개인 예산이 입력되지 않았습니다.',
      path: ['personal_budget']
    })
    return
  }

  if (data.people > 1 && data.group_budget === null && !data.isGroupBudgetUndefined) {
    ctx.addIssue({
      message: '공금 예산이 입력되지 않았습니다.',
      path: ['group_budget']
    })
    return
  }
});


const errorsMap = computed(() => {
  // UFormGroup으로 error을 나타내기 힘든 경우,
  // submit 버튼을 눌러야 error가 나타나도록 하는 경우
  // 자동 검증 기능을 덮어쓰고 수동으로 error를 표시하기 위해 사용
  if (!form.value?.errors) return {};

  // *전체 에러 표시하는 방법
  // return form.value.errors.reduce((acc, error) => {
  //   acc[error.path] = error.message
  //   return acc
  // }, {})

  // *첫 번째 에러만 표시하도록 수정
  const firstError = form.value.errors[0]
  return firstError ? { [firstError.path]: firstError.message } : {}
})

const decreasePeople = () => {
  if(state.value.people <= 1) return
  else state.value.people--
}
const increasePeople = () => {
  if(state.value.people >= 10) return
  else state.value.people++
}

const submitAccountBookForm = async () => {
  if (form.value.errors.length) return

  const sanitizedData = {
    start_date: state.value.start_date,
    end_date: state.value.end_date,
    country_label: state.value.country.label,
    country_value: state.value.country.value,
    people: state.value.people,
    name: state.value.name,
    group_budget: state.value.isGroupBudgetUndefined ? null : state.value.group_budget,
    personal_budget: state.value.isPersonalBudgetUndefined ? null : state.value.personal_budget
  }

  emit('submit', sanitizedData)
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
/* 너무 열받지만 overflow-x-hidden 안걸어놓으면 가로스크롤생기고, translateX도 애매하게 생겨서 너ㅓㅓㅓ무 열받아요 아직 못고쳐서 (input number이 아니었구나) selectMenu 열렸을 때 div 위치가 말이에요~~ 수정을 잘 해봐야겠어요 ^^

.... 0205 기준 2시간을 쏟아부어도 모르겠다. */
</style>