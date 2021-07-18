import toast from './toast'
import XLSX from 'xlsx'
import { ref } from 'vue'

interface IStudent {
  id: number
  name: string
  school: string
  class: string

  scores: number[]
}

export const scoreMin = ref(0)
export const scoreMax = ref(150)
export const chartWidth = ref('auto')
export const chartHeight = ref('24rem')

export const header = ref<string[]>([])
export const students = ref<IStudent[]>([])

function readFile(file: File) {
  return new Promise<ArrayBuffer>((resolve, reject) => {
    const fr = new FileReader()
    fr.onload = () => {
      resolve(fr.result as ArrayBuffer)
    }
    fr.onerror = reject
    fr.readAsArrayBuffer(file)
  })
}

export async function parseSheet(file: File) {
  toast.info({ message: 'Parsing sheet...' })
  const wb = XLSX.read(new Uint8Array(await readFile(file)), { type: 'array' })
  // const ws = wb.Sheets[wb.SheetNames[0]]
  const ws = wb.Sheets['Sheet1']
  const data = XLSX.utils.sheet_to_json(ws, { header: 1 }) as any[][]

  header.value = []
  students.value = []
  let total = 0
  for (let i = 0; i < data.length; i++) {
    if (i === 0) {
      const a = data[i].length - 7
      if (a % 2 !== 0) {
        toast.error({ message: 'Invalid sheet format' })
        return
      }
      total = a / 2
      for (let j = 0; j < total; j++) {
        header.value.push(data[i][4 + j * 2])
      }
    } else {
      if (!data[i][0]) continue
      const student: IStudent = {
        id: data[i][0],
        name: data[i][1],
        school: data[i][2],
        class: data[i][3],
        scores: []
      }
      for (let j = 0; j < total; j++) {
        student.scores.push(data[i][4 + j * 2])
      }
      students.value.push(student)
    }
  }
  toast.success({ message: 'Parsing complete' })
}
