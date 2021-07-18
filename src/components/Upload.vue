<template>
  <div>
    <form @submit.prevent="onSubmit">
      <label for="z_file">上传表格</label>
      <input type="file" id="z_file" ref="fileInput" />

      <input type="submit" value="提交" />
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { parseSheet } from '../core'

export default defineComponent({
  setup() {
    const fileInput = ref<HTMLInputElement | null>(null)
    function onSubmit() {
      const file = fileInput.value?.files?.[0]
      if (!file) return
      parseSheet(file)
    }
    return { fileInput, onSubmit }
  }
})
</script>
