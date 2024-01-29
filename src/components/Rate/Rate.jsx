import { memo } from 'react'
import { Flex, Statistic } from 'antd'

const Rate = ({ rate, prefix }) => {
  const color = rate > 0 ? 'green' : rate < 0 ? 'red' : 'black'
  return (
    <Flex justify='end' align='center' gap='5px'>
      {prefix}
      <Statistic value={rate} valueStyle={{ color }} />
    </Flex>
  )
}

export default memo(Rate)
