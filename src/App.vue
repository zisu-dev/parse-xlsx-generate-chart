<template>
  <div class="flex-auto flex flex-col p-4">
    <settings />
    <upload />
    <template v-for="(student, i) of students" :key="i">
      <student :student="student" />
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Settings from './components/Settings.vue'
import Student from './components/Student.vue'
import Upload from './components/Upload.vue'
import { students } from './core'

export default defineComponent({
  components: { Upload, Student, Settings },
  name: 'App',
  setup() {
    return { students }
  }
})
</script>
