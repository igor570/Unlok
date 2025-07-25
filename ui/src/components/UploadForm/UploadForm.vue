<script setup lang="ts">
import { useForm, Field } from 'vee-validate'
import { computed } from 'vue'
import { messageFormSchema } from '@/types'
import { useCreateMessage } from '@/composables'
import { useRouter } from 'vue-router'
import { Spinner } from '@/components'

const router = useRouter()
const form = useForm({
  validationSchema: messageFormSchema,
})

const { mutateAsync, isPending } = useCreateMessage()

const onSubmit = form.handleSubmit(async (values) => {
  const result = await mutateAsync(values)
  router.push({ name: 'complete', query: { id: result.messageId } })
})
</script>

<template>
  <form class="upload-form" @submit.prevent="onSubmit">
    <!-- Personal Identifier -->
    <div class="form-group">
      <label for="subject">Identifier</label>
      <Field
        id="identifier"
        name="identifier"
        type="text"
        placeholder="Give it a memorable name..."
        v-model="form.values.identifier"
      />
      <div class="error" v-if="form.errors.value.identifier">
        {{ form.errors.value.identifier }}
      </div>
    </div>
    <!-- Subject Field -->
    <div class="form-group">
      <label for="subject">subject</label>
      <Field
        id="subject"
        name="subject"
        type="text"
        placeholder="Enter your subject..."
        v-model="form.values.subject"
      />
      <div class="error" v-if="form.errors.value.subject">{{ form.errors.value.subject }}</div>
    </div>

    <!-- Message Field -->
    <div class="form-group">
      <label for="message">message</label>
      <Field
        class="textarea-message"
        id="message"
        name="message"
        type="text"
        placeholder="Enter your message..."
        v-model="form.values.message"
      />
      <div class="error" v-if="form.errors.value.message">{{ form.errors.value.message }}</div>
    </div>
    <!-- Password Field -->
    <div class="form-group">
      <label for="password">password</label>
      <Field
        id="password"
        name="password"
        type="text"
        placeholder="Enter a password in emojis 😎"
        v-model="form.values.password"
      />
      <div class="error" v-if="form.errors.value.password">{{ form.errors.value.password }}</div>
    </div>
    <!-- Submit -->
    <button class="submit-btn" type="submit">
      <Spinner :size="25" v-if="isPending" />
      <span>Submit</span>
    </button>
  </form>
</template>

<style lang="scss" scoped>
.upload-form {
  padding: 2rem 1.5rem;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  width: 400px;
  height: fit-content();
}
.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  height: fit-content();
}
label {
  font-weight: 500;
  margin-bottom: 0.2rem;
}
input {
  padding: 0.5rem 0.7rem;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  font-size: 1rem;
  outline: none;
  transition: border 0.2s;
}
.textarea-message {
  min-height: 300px;
  resize: none;
  -webkit-user-drag: none;
  user-select: text;
}
input:focus {
  border-color: #6366f1;
}
.description {
  font-size: 0.85rem;
  color: #6b7280;
}
.error {
  color: #dc2626;
  font-size: 0.85rem;
  margin-top: 0.1rem;
}
.button-group {
  display: flex;
  gap: 1rem;
}

.btn-common {
  flex: 1;
  margin-top: 0.5rem;
  padding: 0.6rem 1.2rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;
}

.submit-btn {
  @extend .btn-common;
  background: #6366f1;
  color: #fff;

  &:hover {
    background: #4f46e5;
  }

  &-ghost {
    @extend .btn-common;
    background-color: transparent;
    border: 1px solid #6366f1;

    &:hover {
      background: #dad8ff;
    }
  }
}
</style>
