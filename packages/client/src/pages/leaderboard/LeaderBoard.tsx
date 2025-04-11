import { Flex, Table, TableColumnsType, TableProps, Typography } from 'antd'
const { Title, Text } = Typography
import React, { useEffect, useState } from 'react'
import { useGetLeaderBoardMutation } from '../../store/features/leaderboard/leaderBoardApiSlice'

export type leaderBoardDataTableType = {
  nickname: string
  score: number
  date: string
}

const columns: TableColumnsType<leaderBoardDataTableType> = [
  {
    key: 'nickname',
    title: 'игрок',
    dataIndex: 'nickname',
    showSorterTooltip: { title: 'Сортировать по имени игрока' },
    sorter: (a, b) => a.nickname.localeCompare(b.nickname),
    sortDirections: ['descend', 'ascend'],
    render: (nickname: string) => (
      <Text
        strong
        style={{ color: 'teal', fontSize: '16px', fontWeight: 'bold' }}>
        {nickname}
      </Text>
    ),
  },
  {
    key: 'score',
    title: 'очки',
    dataIndex: 'score',
    showSorterTooltip: { title: 'Сортировать по количеству очков' },
    sorter: (a, b) => a.score - b.score,
    sortDirections: ['descend', 'ascend'],
    align: 'right',
  },
  {
    key: 'date',
    title: 'Дата',
    dataIndex: 'date',
    showSorterTooltip: { title: 'Сортировать по дате ' },
    sorter: (a, b) => {
      const dateA = new Date(a.date)
      const dateB = new Date(b.date)
      return dateA.getTime() - dateB.getTime()
    },
    sortDirections: ['descend', 'ascend'],
    align: 'right',
  },
]

const LeaderBoard: React.FC = () => {
  const [getLeaderBoardData, { isLoading }] = useGetLeaderBoardMutation()
  const [leaderboard, setLeaderBoard] = useState<leaderBoardDataTableType[]>([])

  const onChange: TableProps<leaderBoardDataTableType>['onChange'] = (
    pagination,
    sorter,
    extra
  ) => {
    console.info('params', pagination, sorter, extra)
  }
  useEffect(() => {
    getLeaderBoardData({ cursor: 0, limit: 100 }).then(response => {
      if (response.data) {
        const mappedData: leaderBoardDataTableType[] = response.data.map(
          item => {
            return {
              nickname: item.data.nickname,
              score: item.data.rundCodeStudionGameScore,
              date: item.data.date,
            }
          }
        )
        setLeaderBoard(mappedData)
      }
    })
  }, [])
  return (
    <Flex vertical justify="center" style={{ paddingTop: '3rem' }}>
      <Title
        level={2}
        style={{ alignSelf: 'center' }}
        data-testid="leaderbord-title">
        Таблица результатов игроков
      </Title>
      <Table<leaderBoardDataTableType>
        data-testid="leaderbord-table"
        style={{ paddingInline: '2rem' }}
        loading={isLoading}
        columns={columns}
        dataSource={leaderboard}
        rowKey="nickname"
        onChange={onChange}
        showSorterTooltip={{ target: 'sorter-icon' }}
        pagination={{ pageSize: 25 }}
        locale={{ emptyText: 'Пока нет записей' }}
      />
    </Flex>
  )
}

export default LeaderBoard
