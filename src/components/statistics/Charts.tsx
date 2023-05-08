import { computed, defineComponent, onMounted, PropType, ref } from 'vue';
import { FormItem } from '../../shared/Form';
import s from './Charts.module.scss';
import { LineChart } from './LineChart';
import { PieChart } from './PieChart';
import { Bars } from './Bars';
import { http} from '../../shared/Http';
import { Time } from '../../shared/time';
import { time } from 'echarts';

type Data1Item = {happen_at:string,amount:number}
type Data1 = Data1Item[]
const DAY = 24 * 3600 * 1000
export const Charts = defineComponent({
  props: {
    startDate: {
      type: String as PropType<string>,
      required: false
    },
    endDate: {
      type: String as PropType<string>,
      required: false
    }
  },
  setup: (props, context) => {
    const category = ref('expenses')
    //方便知道类型，并且赋值为空数
    const data1 = ref<Data1>([])
    //转换成需要的数据格式
    const betterData1 = computed<[string,number][]>(()=>{
      if(!props.startDate || !props.endDate){ return []}
      const diff = new Date(props.endDate).getTime() - new Date(props.startDate).getTime()
      const n = diff / DAY + 1
      return Array.from({length:n}).map((_,i)=>{
        const time = new Time(props.startDate+'T00:00:00.000+0800').add(i,'day').getTimestamp()
        const item = data1.value[0]
        const amount =(item && new Date(item.happen_at).getTime() === time) ? data1.value.shift()!.amount : 0
        return [new Date(time).toISOString(),amount]
      })
    })

    onMounted(async()=>{
      const response = await http.get<{groups:Data1,summary:number}>('/items/summary',{
        _mock:'itemSummary'
      })
      console.log('response.data')
      console.log(response.data)
      data1.value = response.data.groups
    })
    return () => (
      <div class={s.wrapper}>
        <FormItem label='类型' type='select' options={[
          {value:'expenses',text:'支出'},
          {value:'income',text:'收入'}
        ]} v-model={category.value}/>
        <LineChart data={betterData1.value}/>
        <PieChart/>
        <Bars/>
      </div>
    )
  }
})