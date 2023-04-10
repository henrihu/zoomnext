import { Avatar, List, Input, Card, Badge, Divider } from 'antd';

const data = [
  {
    avatar: '/images/service.png',
    name: 'Robert Range',
    unreadCount: 9,
    date: '12:13 PM',
  },
  {
    avatar: '/images/service.png',
    name: 'Robert Range',
    unreadCount: 9,
    date: '12:13 PM',
  },
  {
    avatar: '/images/service.png',
    name: 'Robert Range',
    unreadCount: 0,
    date: '12:13 PM',
  },
  {
    avatar: '/images/service.png',
    name: 'Robert Range',
    unreadCount: 9,
    date: '12:13 PM',
  },
];

export default () => (
  <Card size="small">
    <Input placeholder="Search" className="w-full" size="large" />
    <Divider style={{ margin: 4 }} />
    <List
      itemLayout="vertical"
      dataSource={data}
      renderItem={(item, index) => (
        <List.Item
          extra={
            <div className="flex flex-col items-end gap-1">
              <span className="text-gray">{item.date}</span>
              <Badge count={item.unreadCount} color="blue" />
            </div>
          }
          className="cursor-pointer"
        >
          <div className="flex items-center">
            <Avatar
              src={item.avatar}
              className="mr-1"
              size="large"
              style={{ minWidth: 32, minHeight: 32 }}
            />
            <div className="flex flex-col gap-1">
              <span className="font-bold">{item.name}</span>
              <span className="text-gray">
                Ant Design, a design language for background
              </span>
            </div>
          </div>
        </List.Item>
      )}
    />
  </Card>
);