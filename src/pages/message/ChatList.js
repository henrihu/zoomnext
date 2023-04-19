import { useMemo, useState } from 'react';
import { Input, Card, Divider, theme } from 'antd';
import { findStrInObj } from 'src/utils/common';
import { ChatList } from 'react-chat-elements';

export default ({ data, loading, selected, setSelected }) => {
  const { token } = theme.useToken();
  const [search, setSearch] = useState('');
  const filteredData = useMemo(
    () =>
      data &&
      data
        .filter((item) => findStrInObj(item, search))
        .map((item) => ({
          ...item,
          avatar: item.profileImage,
          alt: 'avatar',
          title: item.firstName,
          subtitle: item.message,
          unread: item.unReadCount,
          date: item.mt,
          statusColor: item.isallowSendSms ? '#4abdda' : undefined,
          className: 'bg-blue',
        })),
    [data, search]
  );
  return (
    <Card size="small" loading={loading}>
      <Input
        placeholder="Search"
        className="w-full"
        size="large"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <Divider style={{ margin: 4 }} />
      <div
        style={{
          maxHeight: 'calc(100vh - 105px - 64px - 64px - 73px)',
          overflow: 'auto',
        }}
      >
        <ChatList
          className="chat-list"
          dataSource={filteredData}
          onClick={(item) => setSelected(item)}
        />
      </div>
    </Card>
  );
};
