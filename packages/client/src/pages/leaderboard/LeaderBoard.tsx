import {
  Flex,
  Table,
  TableColumnsType,
  TableProps,
  theme,
  Typography,
} from 'antd'
const { Title, Text } = Typography
import React from 'react'
import { useAppSelector } from '../../store/hooks/deriveTypes'

interface DataType {
  iserId: number
  score: number
}

const columns: TableColumnsType<DataType> = [
  {
    key: 'iserId',
    title: 'Имя игрока',
    dataIndex: 'iserId',
    showSorterTooltip: { target: 'full-header' },
    sorter: (a, b) => a.iserId - b.iserId,
    sortDirections: ['descend'],
    render: (iserId: string) => (
      <Text
        strong
        color="red">{`Здесь будет имя или никнейм игрока с id ${iserId}`}</Text>
    ),
  },
  {
    key: 'score',
    title: 'Количество набранных очков',
    dataIndex: 'score',
    showSorterTooltip: { target: 'full-header' },
    sorter: (a, b) => a.score - b.score,
    sortDirections: ['descend'],
  },
]

const LeaderBoard: React.FC = () => {
  const leaderboard = useAppSelector(state => state.leaderboard)
  const {
    token: { colorPrimary },
  } = theme.useToken()
  const onChange: TableProps<DataType>['onChange'] = (
    pagination,
    sorter,
    extra
  ) => {
    console.log('params', pagination, sorter, extra)
  }
  return (
    <Flex vertical justify="center" style={{ paddingTop: '3rem' }}>
      <Title level={2} style={{ alignSelf: 'center' }}>
        Таблица результатов игроков
      </Title>
      <Table<DataType>
        style={{ paddingInline: '2rem' }}
        columns={columns}
        dataSource={leaderboard as DataType[]}
        rowKey="id"
        onChange={onChange}
        showSorterTooltip={{ target: 'sorter-icon' }}
      />
    </Flex>
  )
}

export default LeaderBoard
