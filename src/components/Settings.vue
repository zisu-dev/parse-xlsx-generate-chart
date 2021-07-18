<template>
  <div>
    <label for="z_s_min">最小分</label>
    <input type="number" id="z_s_min" v-model.number="scoreMin" />
    <label for="z_s_max">最大分</label>
    <input type="number" id="z_s_max" v-model.number="scoreMax" />

    <label for="z_c_w">图表宽</label>
    <input type="text" id="z_c_w" v-model="chartWidth" />
    <label for="z_c_h">图表高</label>
    <input type="text" id="z_c_h" v-model="chartHeight" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { chartHeight, chartWidth, scoreMax, scoreMin } from '../core'

export default defineComponent({
  setup() {
    return { scoreMin, scoreMax, chartWidth, chartHeight }
  }
})
</script>
