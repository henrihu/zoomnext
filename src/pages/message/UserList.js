import { useMemo, useState } from 'react';
import { Avatar, List, Input, Card, Badge, Divider, theme } from 'antd';
import { findStrInObj } from 'src/utils/common';
import { format } from 'timeago.js';

export default ({ data, loading, selected, setSelected }) => {
  const { token } = theme.useToken();
  const [search, setSearch] = useState('');
  const filteredData = useMemo(
    () => data && data.filter((item) => findStrInObj(item, search)),
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
      <List
        itemLayout="vertical"
        className="user-list"
        dataSource={filteredData}
        style={{
          maxHeight: 'calc(100vh - 105px - 64px - 64px - 73px)',
          overflow: 'auto',
        }}
        renderItem={(item, index) => (
          <List.Item
            extra={
              <div className="flex flex-col items-end gap-1">
                <span className="text-gray">{format(item.mt)}</span>
                {item.unReadCount ? (
                  <Badge count={item.unReadCount} color={token.colorPrimary} />
                ) : item.isallowSendSms ? (
                  <Badge dot color="blue" />
                ) : (
                  <></>
                )}
              </div>
            }
            key={index}
            onClick={() => setSelected(item)}
            className={[
              'user-item',
              selected && selected.id === item.id && 'user-item-selected',
            ]}
          >
            <div className="flex items-center">
              <Avatar
                src={item.profileImage}
                className="mr-1"
                size="large"
                style={{ minWidth: 32, minHeight: 32 }}
              />
              <div className="flex flex-col gap-1 ml-1">
                <span className="font-bold">{item.firstName}</span>
                <span
                  className="text-gray overflow-hidden"
                  style={{ width: 200 }}
                >
                  {item.message}
                </span>
              </div>
            </div>
          </List.Item>
        )}
      />
    </Card>
  );
};
