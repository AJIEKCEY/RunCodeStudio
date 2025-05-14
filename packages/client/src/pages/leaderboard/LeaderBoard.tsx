import { Flex, Table, TableColumnsType, Typography } from 'antd/lib'
const { Title, Text } = Typography
import React, { useEffect, useState } from 'react'
import {
  leaderBoardApiSlice,
  useGetLeaderBoardMutation,
} from '../../store/features/leaderboard/leaderBoardApiSlice'
import { PageInitArgs } from '../../store/store'
export type leaderBoardDataTableType = {
  nickname: string
  score: number
  date: string
  country?: string
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
    title: 'дата',
    dataIndex: 'date',
    showSorterTooltip: { title: 'Сортировать по дате ' },
    sorter: (a, b) => {
      const dateA = new Date(a.date)
      const dateB = new Date(b.date)
      return dateA.getTime() - dateB.getTime()
    },
    sortDirections: ['descend', 'ascend'],
    align: 'right',
    render: (date: string) => {
      const normalizedDate = date.replace(/[/.]/g, '-').split('-')
      if (Number(normalizedDate[1]) > 12) {
        const tmp = normalizedDate[0]
        normalizedDate[1] = normalizedDate[0]
        normalizedDate[0] = tmp
      }
      if (normalizedDate[0].length == 2) normalizedDate.reverse()
      return normalizedDate.join('-')
    },
  },
  {
    key: 'country',
    title: 'страна',
    dataIndex: 'country',
    align: 'right',
  },
]

const LeaderBoard: React.FC = () => {
  const [getLeaderBoardData, { isLoading }] = useGetLeaderBoardMutation()
  const [leaderboard, setLeaderBoard] = useState<leaderBoardDataTableType[]>([])

  useEffect(() => {
    getLeaderBoardData({ cursor: 0, limit: 100 }).then(response => {
      if (response.data) {
        const mappedData: leaderBoardDataTableType[] = response.data.map(
          item => {
            return {
              nickname: item.data.nickname,
              score: item.data.rundCodeStudionGameScore,
              date: item.data.date,
              country: item.data.country || 'Neverland',
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
        showSorterTooltip={{ target: 'sorter-icon' }}
        pagination={{ pageSize: 25 }}
        locale={{ emptyText: 'Пока нет записей' }}
      />
    </Flex>
  )
}
export const initLeaderBoardPage = async ({ dispatch }: PageInitArgs) => {
  return dispatch(
    leaderBoardApiSlice.endpoints.getLeaderBoard.initiate({
      cursor: 0,
      limit: 100,
    })
  )
}
export default LeaderBoard
