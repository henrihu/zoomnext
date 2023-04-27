import { useEffect, useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// Components
import Meta from '@/components/Meta/index';
import { Input, Space, Row, Col, Spin, Empty } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import ServiceCard from './Card';

// Actions
import { getServiceList } from 'src/store/common/actions';

// Utils
import { findStrInObj } from 'src/utils/common';
import NewJobModal from '../customer/jobs/NewJobModal';
import { createJob } from 'src/store/c_jobs/actions';
import { useAuth } from 'src/store/auth/actions';
import { TYPE_CUSTOMER } from 'src/utils/constants';

export default () => {
  const dispatch = useDispatch();
  const { type } = useAuth();
  const { data, loading } = useSelector(({ common }) => common.service_list);
  const [search, setSearch] = useState('');
  const [modal, setModal] = useState({ open: false });

  const filtered_data = useMemo(
    () => data.filter((item) => findStrInObj(item, search)),
    [data, search]
  );

  useEffect(() => {
    dispatch(getServiceList());
  }, []);

  return (
    <>
      <Meta
        title="Services | Zoom Errands"
        description="Zoom Errands"
        label="Services"
      />
      <Spin spinning={loading}>
        <Row justify="center">
          <Col xs={16} sm={16} md={8} className="mb-4">
            <Input
              placeholder="Search Services"
              prefix={<SearchOutlined />}
              size="large"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Col>
          <Col span={24}>
            {filtered_data && filtered_data.length > 0 ? (
              <Space
                wrap
                size="large"
                align="center"
                className="flex justify-center items-center"
              >
                {filtered_data.map((item, ind) => (
                  <ServiceCard
                    data={item}
                    onClick={() =>
                      type === TYPE_CUSTOMER &&
                      setModal({
                        open: true,
                        data: {
                          categorySlug: item.slug,
                          categoryType: item.type,
                        },
                      })
                    }
                    key={ind}
                  />
                ))}
              </Space>
            ) : (
              <Empty />
            )}
          </Col>
        </Row>
        {type === TYPE_CUSTOMER && modal.open && (
          <NewJobModal
            {...modal}
            onOk={(data) => dispatch(createJob(data))}
            onCancel={() => setModal({ open: false })}
          />
        )}
      </Spin>
    </>
  );
};
