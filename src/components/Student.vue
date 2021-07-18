<template>
  <div class="grid grid-cols-2">
    <div class="flex flex-col">
      <div>
        <pre v-text="JSON.stringify(student, null, '\t')" />
      </div>
      <div>
        <input type="button" value="下载图表" @click="download" />
      </div>
    </div>
    <div ref="chartEl" class="h-96" />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import * as echarts from 'echarts'
import { chartHeight, chartWidth, header, scoreMax, scoreMin } from '../core'

export default defineComponent({
  props: {
    student: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const chartEl = ref<HTMLDivElement>(null as any)
    onMounted(() => {
      const el = chartEl.value
      el.style.width = chartWidth.value
      el.style.height = chartHeight.value

      const chart = echarts.init(el, 'light')
      chart.setOption({
        title: {
          text: `#${props.student.id} ${props.student.school}${props.student.class}班${props.student.name}的成绩报告`,
          left: 'center'
        },
        xAxis: { type: 'category', data: [] },
        yAxis: { type: 'value', min: scoreMin.value, max: scoreMax.value },
        series: [
          {
            name: '成绩',
            data: [],
            type: 'line',
            smooth: true,
            connectNulls: true,
            markPoint: {
              data: [
                { type: 'max', name: 'max' },
                { type: 'min', name: 'min' }
              ]
            },
            markLine: {
              data: [{ type: 'average', name: 'avg' }]
            }
          }
        ],
        backgroundColor: 'white'
      })

      const xAxis = header.value
      const yAxis = props.student.scores
      chart.setOption({
        xAxis: { data: xAxis },
        series: [{ name: '成绩', data: yAxis }]
      })
    })
    function download() {
      const link = document.createElement('a')
      link.download = `${props.student.id}-${props.student.school}${props.student.class}班${props.student.name}成绩报告.png`
      link.href = chartEl.value.querySelector('canvas').toDataURL()
      link.click()
    }
    return { chartEl, download }
  }
})
</script>
