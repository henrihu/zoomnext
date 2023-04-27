import { Row, Col, Avatar, Space, Button } from 'antd';
import { ArrowDownOutlined, CheckOutlined } from '@ant-design/icons';

import AvatarUpload from 'src/components/AvatarUpload';
import IdentificationUpload from 'src/components/IdentificationUpload';
import { uploadImage, uploadProfileImage } from 'src/store/common/actions';
import { useDispatch } from 'react-redux';
import { useAuth } from 'src/store/auth/actions';
import { MEDIA_TYPE_IMAGE } from 'src/utils/constants';
import { providerUpdateProfile } from 'src/store/auth/actions';

export default () => {
  const dispatch = useDispatch();
  const { userDetail } = useAuth();

  const handleUploadIdentification = async (file) => {
    const data = await dispatch(
      uploadImage({
        mediaType: MEDIA_TYPE_IMAGE,
        module: 'legal-information',
        media: file,
      })
    );
    dispatch(providerUpdateProfile({ legalInformation: data.imageName }));
  };
  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <Space direction="vertical" className="flex flex-col items-center">
          <span className="font-bold">
            Add a clear and professional profile photo
          </span>
          <AvatarUpload
            onUpload={(profileImage) =>
              dispatch(uploadProfileImage({ profileImage }))
            }
            url={userDetail && userDetail.avatarImage}
          />
          <Space direction="vertical" size={0} className="text-gray">
            <Space>
              <CheckOutlined />
              Photo should be above the chest
            </Space>
            <Space>
              <CheckOutlined />
              No hats and sunglasses
            </Space>
            <Space>
              <CheckOutlined />
              Smile :)
            </Space>
          </Space>
          <div className="flex flex-col items-center gap-1">
            <Avatar.Group size={60}>
              <Avatar src="/images/service.png" />
              <Avatar src="/images/service.png" />
              <Avatar src="/images/service.png" />
            </Avatar.Group>
            <span className="text-gray">Examples of acceptable photo</span>
          </div>
        </Space>
      </Col>
      <Col span={24} className="flex justify-center">
        <Button
          shape="circle"
          icon={<ArrowDownOutlined />}
          className="cursor-default"
        />
      </Col>
      <Col span={24}>
        <Space direction="vertical" className="flex flex-col items-center">
          <span className="font-bold">Legal Identification</span>
          <span className="text-gray">
            Acceptable: Driver's License, Passport or Government ID
          </span>
          <IdentificationUpload
            onUpload={handleUploadIdentification}
            url={userDetail && userDetail.legalInformation}
          />
        </Space>
      </Col>
    </Row>
  );
};
