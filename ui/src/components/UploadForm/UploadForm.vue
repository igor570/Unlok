<script setup lang="ts">
import { useForm } from 'vee-validate'
import { messageFormSchema } from '@/types'
import { useCreateMessage } from '@/composables'
import { useRouter } from 'vue-router'
import { Button, FormInput, FormTextArea } from '@/components'
import { watch } from 'vue'

const router = useRouter()
const { mutateAsync, isPending } = useCreateMessage()

const form = useForm({
  validationSchema: messageFormSchema,
})

const onSubmit = form.handleSubmit(async (values) => {
  try {
    const result = await mutateAsync(values)
    router.push({ name: 'complete', query: { id: result.messageId } })
  } catch (err) {
    console.error('mutateAsync error:', err)
  }
})
</script>

<template>
  <form class="upload-form" @submit.prevent="onSubmit">
    <!-- Personal Identifier -->
    <FormInput
      label="Identifier"
      name="identifier"
      placeholder="Give it a memorable name..."
      :form="form"
    />
    <!-- Subject Field -->
    <FormInput label="Subject" name="subject" placeholder="Enter your subject..." :form="form" />

    <!-- Message Field -->
    <FormTextArea label="Message" name="message" placeholder="Enter your message..." :form="form" />
    <!-- Password Field -->
    <FormInput
      label="Password"
      name="password"
      placeholder="Enter a password in emojis 😎"
      :form="form"
    />
    <!-- Submit -->
    <Button label="Submit" type="submit" :form="form" :disabled="isPending" />
  </form>
</template>

<style lang="scss" scoped>
.upload-form {
  padding: 2rem 1.5rem;
  background: $background-color;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  height: fit-content();
}
</style>
