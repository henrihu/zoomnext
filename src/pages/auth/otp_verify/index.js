import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';

// Components
import Meta from '@/components/Meta/index';
import { AuthLayout } from '@/layouts/index';
import { Button, Row, Col, theme } from 'antd';
import PinInput from 'react-pin-input';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';

// Constants
import { PLATFORM, TYPE_CUSTOMER, TYPE_HELPER } from 'src/utils/constants';
// Actions
import { resendOtp, useAuth, verifyOtp } from 'src/store/auth/actions';

export default () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { token } = theme.useToken();
  const { type, userDetail } = useAuth();
  const [otp, setOtp] = useState('');
  const [pending, setPending] = useState(false);

  const [timerKey, setTimerKey] = useState(0);
  const [isPlaying, setPlaying] = useState(true);

  useEffect(() => {
    if (!userDetail || !userDetail.slug) {
      router.push('/auth/login');
    }
  }, []);

  const handleVerifyOtp = async () => {
    setPending(true);
    const isSuccess = await dispatch(
      verifyOtp(
        {
          otp,
          type,
          email: userDetail && userDetail.email,
          platform: PLATFORM,
          fcmToken: userDetail && userDetail.fcmToken,
          deviceToken: userDetail && userDetail.deviceToken,
        },
        router
      )
    );
    if (isSuccess) {
      router.push('/services');
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
    <AuthLayout>
      <Meta title="Login | Zoom Errands" description="Zoom Errands Login" />
      <Row
        align="center"
        justify="center"
        className="p-5 m-auto space-y-5 rounded shadow-lg md:p-10 md:w-1/3 bg-white"
      >
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
            colors={[token.colorPrimary]}
            size={120}
            strokeWidth={6}
            onComplete={() => {
              setPlaying(false);
              setTimerKey(timerKey + 1);
            }}
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
        <Col span={24}>
          <Button
            type="primary"
            loading={pending}
            shape="round"
            size="large"
            className="w-full"
            htmlType="submit"
            onClick={handleVerifyOtp}
          >
            Verify
          </Button>
        </Col>
      </Row>
    </AuthLayout>
  );
};
