import { useState, useMemo, useEffect } from 'react';

// Components
import { Divider, Row, Col, Steps, Button, Space, Modal } from 'antd';
import DetailsStep from './DetailsStep';
import TermStep from './TermStep';

// Actions
import { setProfileModal, useSetting } from 'src/store/setting/actions';
import { useThemeToken } from 'src/utils/common';
import CategoryStep from './CategoryStep';
import { useDispatch } from 'react-redux';
import { getHelperCategories, useHelperJobs } from 'src/store/h_jobs/actions';
import { payNowFree, useAuth } from 'src/store/auth/actions';
import { showError } from 'src/utils/messages';

export default () => {
  const dispatch = useDispatch();
  const token = useThemeToken();
  const { profile_modal } = useSetting();
  const { pending } = useAuth();
  const { provider_categories } = useHelperJobs();

  const [step, setStep] = useState(0);
  const [backgroundCheck, setBackgroundCheck] = useState(false);
  const [conditionCheck, setConditionCheck] = useState(false);
  const [legalInformation, setLegalInformation] = useState({});

  useEffect(() => {
    if (profile_modal.open) {
      dispatch(getHelperCategories());
    }
  }, [profile_modal.open]);

  const handlePayNowFree = async () => {
    const isSuccess = await dispatch(
      payNowFree({
        legalInformation: legalInformation.imageName,
        categoryId: provider_categories.data
          .filter(({ isSelectCategory }) => isSelectCategory)
          .map(({ id }) => id),
      })
    );
    if (isSuccess) {
      dispatch(setProfileModal({ open: false }));
    }
  };

  return (
    <Modal
      open={profile_modal && profile_modal.open}
      title={null}
      footer={
        <div className="flex justify-center">
          {step === 0 && (
            <Button
              type="primary"
              shape="round"
              onClick={() => {
                if (
                  provider_categories &&
                  provider_categories.data.find(
                    ({ isSelectCategory }) => isSelectCategory
                  )
                ) {
                  setStep(1);
                } else {
                  showError('Select Categories');
                }
              }}
            >
              Continue
            </Button>
          )}
          {step === 1 && (
            <Button
              type="primary"
              shape="round"
              onClick={() => {
                if (legalInformation && legalInformation.imageName) {
                  setStep(2);
                } else {
                  showError('Select Legal Infomation');
                }
              }}
            >
              Continue
            </Button>
          )}
          {step === 2 && (
            <Button
              type="primary"
              shape="round"
              loading={pending && pending.payNow}
              onClick={() => {
                if (backgroundCheck && conditionCheck) {
                  handlePayNowFree();
                } else {
                  if (!backgroundCheck) {
                    showError('Please Accept Background Check conditions');
                  } else if (!conditionCheck) {
                    showError('Please Accept Provider conditions');
                  }
                }
              }}
            >
              Let's Make Some Money!
            </Button>
          )}
        </div>
      }
      maskStyle={{ backgroundColor: token.colorPrimary }}
      bodyStyle={{ padding: 0, minHeight: '80vh' }}
      maskClosable={false}
      width={500}
      centered={true}
      closable={false}
      destroyOnClose={true}
    >
      <Row justify="center" className="cursor-default" gutter={[16, 16]}>
        <Col
          span={24}
          className="flex justify-center text-white"
          style={{ backgroundColor: token.colorPrimary }}
        >
          <h2>Let's Get You Set Up</h2>
        </Col>
        <Col span={24}>
          <Steps
            current={step}
            size="small"
            responsive={false}
            labelPlacement="vertical"
            onChange={(value) => setStep(value)}
            items={[{ title: 'Step1' }, { title: 'Step2' }, { title: 'Step3' }]}
          />
        </Col>
        <Col span={24} className="flex justify-center">
          {step === 0 && <CategoryStep />}
          {step === 1 && (
            <DetailsStep
              legalInformation={legalInformation}
              setLegalInformation={setLegalInformation}
            />
          )}
          {step === 2 && (
            <TermStep
              backgroundCheck={backgroundCheck}
              setBackgroundCheck={setBackgroundCheck}
              conditionCheck={conditionCheck}
              setConditionCheck={setConditionCheck}
            />
          )}
        </Col>
      </Row>
    </Modal>
  );
};
