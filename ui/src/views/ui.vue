<script setup lang="ts">
import Button from '@/components/ui/Button.vue'
import FormInput from '@/components/ui/FormInput.vue'
import FormTextArea from '@/components/ui/FormTextArea.vue'
</script>

<template>
  <div>
    <section class="ui-elements">
      <h2 style="color: white">Form Stuff</h2>
      <FormInput label="Input" name="input" placeholder="Placeholder text..." />
      <FormTextArea label="Textarea" name="textarea" />
      <Button label="Button" />
    </section>
  </div>
</template>

<style scoped lang="scss">
.ui-elements {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
