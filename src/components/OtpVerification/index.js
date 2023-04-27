import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';

// Components
import Meta from '@/components/Meta/index';
import { AuthLayout } from '@/layouts/index';
import { Button, Row, Col, theme, Modal } from 'antd';
import PinInput from 'react-pin-input';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';

// Constants
import {
  OTP_TYPE_PASSWORD_RESET,
  PLATFORM,
  TYPE_CUSTOMER,
  TYPE_HELPER,
} from 'src/utils/constants';
// Actions
import {
  resendOtp,
  resetVerifyOtp,
  useAuth,
  verifyOtp,
} from 'src/store/auth/actions';
import { setOtpModal, useSetting } from 'src/store/setting/actions';
import { useThemeToken } from 'src/utils/common';

export default () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { type, userDetail } = useAuth();
  const { otp_modal } = useSetting();
  const [otp, setOtp] = useState('');
  const [pending, setPending] = useState(false);

  const [timerKey, setTimerKey] = useState(0);
  const [isPlaying, setPlaying] = useState(false);

  useEffect(() => {
    if (!userDetail || !userDetail.slug) {
      router.push('/auth/login');
    }
  }, []);

  useEffect(() => {
    if (otp_modal.open) {
      setPlaying(true);
    }
  }, [otp_modal.open]);

  const handleVerifyOtp = async () => {
    setPending(true);
    console.log('handleVerifyOtp');
    let isSuccess = false;
    if (otp_modal.type && otp_modal.type === OTP_TYPE_PASSWORD_RESET) {
      isSuccess = await dispatch(
        resetVerifyOtp({ otp, email: otp_modal.data.email })
      );
    } else {
      isSuccess = await dispatch(verifyOtp({ otp }));
    }

    if (isSuccess) {
      otp_modal && otp_modal.onOk && otp_modal.onOk();
      dispatch(setOtpModal({ open: false }));
    }
    setPending(false);
  };

  const handleResendOtp = async () => {
    const isSuccess = await dispatch(
      resendOtp({ email: userDetail && userDetail.email })
    );
    if (isSuccess) {
      setTimerKey(timerKey + 1);
      setOtp('');
    }
  };

  return (
    <Modal
      open={otp_modal && otp_modal.open}
      footer={null}
      title={null}
      maskStyle={{ backgroundColor: useThemeToken().colorPrimary }}
      maskClosable={false}
      centered
      width={350}
      closable={false}
      destroyOnClose={true}
    >
      <Row align="center" justify="center" className="py-16 gap-4">
        <Col span={24} className="text-center">
          <h1 className="text-2xl font-bold">Email Verification</h1>
        </Col>
        <Col span={24} className="text-center">
          <h3 className="text-gray-600">
            Please check your email and enter 4 Digit code
          </h3>
        </Col>
        <Col span={24} className="flex justify-center">
          <PinInput
            length={4}
            onChange={(value, index) => {
              setOtp(value);
            }}
            focus={true}
            value={otp}
            type="numeric"
            inputMode="number"
            style={{ padding: '10px' }}
            inputStyle={{ borderColor: 'gray', borderRadius: 8, fontSize: 20 }}
            inputFocusStyle={{ borderColor: 'black' }}
            onComplete={(value, index) => {
              setOtp(value);
            }}
            autoSelect={true}
            regexCriteria={/^[ A-Za-z0-9_@./#&+-]*$/}
          />
        </Col>
        <Col span={24} className="flex justify-center">
          <CountdownCircleTimer
            isPlaying={isPlaying}
            key={timerKey}
            duration={120}
            colors={[useThemeToken().colorPrimary]}
            size={120}
            strokeWidth={6}
          >
            {({ remainingTime }) => {
              const minutes = Math.floor(remainingTime / 60);
              const seconds = remainingTime % 60;

              return (
                <h3 className="cursor-default">
                  {`${minutes
                    .toString()
                    .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`}
                </h3>
              );
            }}
          </CountdownCircleTimer>
        </Col>
        <Col span={24} className="flex justify-center items-center">
          <span className="text-center cursor-default">
            Didn't receive code?
          </span>
          <Button type="link" size="small" onClick={handleResendOtp}>
            Resend Now
          </Button>
        </Col>
        <Col span={24} className="flex justify-center">
          <Button
            type="primary"
            loading={pending}
            shape="round"
            size="large"
            htmlType="submit"
            onClick={handleVerifyOtp}
          >
            Verify
          </Button>
        </Col>
      </Row>
    </Modal>
  );
};
