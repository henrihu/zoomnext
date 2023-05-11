import { useEffect, useMemo, useState } from 'react';
import {
  Avatar,
  List,
  Input,
  Badge,
  Divider,
  theme,
  Spin,
  Collapse,
} from 'antd';
import { NodeExpandOutlined } from '@ant-design/icons';
import { findStrInObj, useScreen, useThemeToken } from 'src/utils/common';
import { format } from 'timeago.js';
import { MESSAGE_TYPE_MESSAGE } from 'src/utils/constants';

export default ({ data, loading, chatLoading, selected, setSelected }) => {
  const { token } = theme.useToken();
  const [search, setSearch] = useState('');
  const isXsSm = useScreen();
  const filteredData = useMemo(
    () => data && data.filter((item) => findStrInObj(item, search)),
    [data, search]
  );
  const [collpase, setCollapse] = useState(['1']);

  useEffect(() => {
    if (selected && isXsSm) {
      setCollapse([]);
    }
    if (!isXsSm) {
      setCollapse(['1']);
    }
  }, [selected, isXsSm]);

  return (
    <Collapse
      className="w-full"
      defaultActiveKey={['1']}
      activeKey={collpase}
      expandIconPosition="end"
      onChange={(v) => setCollapse(v)}
    >
      <Collapse.Panel
        header={<h3 className="text-white">Messages</h3>}
        collapsible={!isXsSm && 'disabled'}
        key="1"
        showArrow={isXsSm}
        headStyle={{
          backgroundColor: useThemeToken().colorPrimary,
          color: 'white',
          fontWeight: 'bold',
        }}
        style={{ backgroundColor: useThemeToken().colorPrimary }}
      >
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
              key={index}
              onClick={() => setSelected(item)}
              className={[
                'user-item',
                selected &&
                  selected.userId === item.userId &&
                  selected.jobId === item.jobId &&
                  'user-item-selected',
              ]}
            >
              <div className="flex items-center p-2">
                <Avatar src={item.profileImage} className="mr-2" size={45} />
                <div className="flex flex-1 flex-col justify-center overflow-hidden gap-1">
                  <div className="flex justify-between items-center">
                    <span className="font-bold">
                      {item.firstName} {item.lastName}
                    </span>
                    <span className="text-gray">{format(item.mt)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div
                      style={{
                        flex: 1,
                        whiteSpace: 'nowrap',
                        textOverflow: 'ellipsis',
                        overflow: 'hidden',
                      }}
                    >
                      {item.messageType === MESSAGE_TYPE_MESSAGE
                        ? item.message
                        : 'Photo'}
                    </div>
                    {selected && selected.id === item.id && chatLoading && (
                      <Spin spinning={true} size="small" />
                    )}
                    {((selected && selected.id !== item.id) || !chatLoading) &&
                      (item.unReadCount ? (
                        <Badge
                          count={item.unReadCount}
                          color={token.colorPrimary}
                        />
                      ) : item.isallowSendSms ? (
                        <Badge dot color="blue" />
                      ) : (
                        <></>
                      ))}
                  </div>
                </div>
              </div>
            </List.Item>
          )}
        />
      </Collapse.Panel>
    </Collapse>
  );
};
