import { Flex, Table, TableColumnsType, TableProps, Typography } from 'antd'
const { Title, Text } = Typography
import React from 'react'
import { useAppSelector } from '../../store/hooks/deriveTypes'

interface DataType {
  userId: number
  score: number
}

const columns: TableColumnsType<DataType> = [
  {
    key: 'userId',
    title: 'Имя игрока',
    dataIndex: 'iserId',
    showSorterTooltip: { target: 'full-header' },
    sorter: (a, b) => a.userId - b.userId,
    sortDirections: ['descend'],
    render: (iserId: string) => (
      <Text
        strong
        color="red">{`Здесь будет имя или никнейм игрока с id ${userId}`}</Text>
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

  const onChange: TableProps<DataType>['onChange'] = (
    pagination,
    sorter,
    extra
  ) => {
    console.log('params', pagination, sorter, extra)
  }
  return (
    <Flex vertical justify="center" style={{ paddingTop: '3rem' }}>
      <Title
        level={2}
        style={{ alignSelf: 'center' }}
        data-testid="leaderbord-title">
        Таблица результатов игроков
      </Title>
      <Table<DataType>
        data-testid="leaderbord-table"
        style={{ paddingInline: '2rem' }}
        columns={columns}
        dataSource={leaderboard as DataType[]}
        rowKey="id"
        onChange={onChange}
        showSorterTooltip={{ target: 'sorter-icon' }}
        pagination={{ pageSize: 25 }}
      />
    </Flex>
  )
}

export default LeaderBoard
