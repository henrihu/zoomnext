import { useEffect, useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// Components
import { CustomerLayout } from 'src/layouts';
import { Input, Space, Row, Col, Spin } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import ServiceCard from './Card';

// Actions
import { getServiceList } from 'src/store/common/actions';

export default () => {
  const dispatch = useDispatch();
  const { data, loading } = useSelector(({ common }) => common.service_list);
  const [search, setSearch] = useState('');

  const filtered_data = useMemo(() => data.filter((item) => true), [data]);

  useEffect(() => {
    dispatch(getServiceList());
  }, []);

  return (
    <CustomerLayout title="Zoom Errands | Services" description="Zoom Errands">
      <Spin spinning={loading}>
        <Row justify="center">
          <Col span={8} className="mb-4">
            <Input
              placeholder="Search"
              prefix={<SearchOutlined />}
              size="large"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Col>
          <Col span={24}>
            <Space
              wrap
              size="large"
              align="center"
              className="flex justify-center items-center"
            >
              {filtered_data &&
                filtered_data.length > 0 &&
                filtered_data.map((item, ind) => (
                  <ServiceCard data={item} key={ind} />
                ))}
            </Space>
          </Col>
        </Row>
      </Spin>
    </CustomerLayout>
  );
};
