import { useEffect, useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

// Components
import Meta from '@/components/Meta/index';
import { Input, Space, Row, Col, Spin, Empty, Avatar, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import ServiceCard from './Card';
import GoogleMap from '@/components/GoogleMap';
import NewJobModal from '../customer/jobs/NewJobModal';

// Actions
import { getServiceList } from 'src/store/common/actions';
import { useAuth } from 'src/store/auth/actions';
import { createJob } from 'src/store/c_jobs/actions';
import {
  getBrowseJobList,
  getJobList,
  useHelperJobs,
} from 'src/store/h_jobs/actions';

// Utils
import { findStrInObj, formatNumber } from 'src/utils/common';
import { TYPE_CUSTOMER, TYPE_HELPER } from 'src/utils/constants';

export default () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { type, userDetail } = useAuth();
  const { data, loading } = useSelector(({ common }) => common.service_list);
  const [search, setSearch] = useState('');
  const [modal, setModal] = useState({ open: false });

  const filtered_data = useMemo(
    () => data.filter((item) => findStrInObj(item, search)),
    [data, search]
  );

  const { browse_job_list } = useHelperJobs();

  const MARKERS = useMemo(
    () =>
      browse_job_list.data &&
      browse_job_list.data.data &&
      browse_job_list.data.data.map((item, index) => ({
        lat: Number(item.latitude),
        lng: Number(item.longitude),
        text: `$ ${formatNumber(item.totalPrice)}`,
        tooltip: (
          <div className="flex flex-col justify-center">
            <div className="flex flex-col gap-1">
              <Button
                type="link"
                className="cursor-pointer font-bold"
                onClick={() =>
                  router.push(`/helper/browse_jobs/${item.jobSlug}/`)
                }
              >
                {item.title}
              </Button>
              <div className="text-black">{item.description}</div>
            </div>
            <div className="flex justify-center items-center cursor-default">
              <Avatar className="mr-2" size="small" src={item.pvavatarImage} />
              <div className="text-black">{item.pvfullName}</div>
            </div>
          </div>
        ),
      })),
    [browse_job_list.data]
  );

  useEffect(() => {
    dispatch(getServiceList());
    if (type === TYPE_HELPER) {
      dispatch(getBrowseJobList());
    }
  }, []);

  if (type === TYPE_HELPER) {
    return (
      <>
        <Meta
          title="Home | Zoom Errands"
          description="Zoom Errands"
          label="Home"
        />
        <div style={{ width: '100%', height: '100vh' }}>
          <GoogleMap
            defaultCenter={{
              lat: userDetail ? Number(userDetail.workLatitude) : 0,
              lng: userDetail ? Number(userDetail.workLongitude) : 0,
            }}
            markers={[
              ...MARKERS,
              {
                lat: userDetail ? Number(userDetail.workLatitude) : 0,
                lng: userDetail ? Number(userDetail.workLongitude) : 0,
                text: 'Home',
              },
            ]}
          />
        </div>
      </>
    );
  }

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
