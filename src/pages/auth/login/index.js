import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

// Components
import Meta from '@/components/Meta/index';
import { AuthLayout } from '@/layouts/index';
import { Button, Radio, Input } from 'antd';
// API
import { signInWithEmail } from 'src/api/auth';
// Constants
import {
  COLOR_CUSTOMER,
  COLOR_PROVIDER,
  TYPE_CUSTOMER,
  TYPE_PRODIVER,
} from 'src/utils/constants';

const socialProviders = [
  { id: '1', name: 'Facebook', color: '#3B5998', icon: 'facebook' },
  { id: '2', name: 'Google', color: '#D94634', icon: 'google' },
];

const Login = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [type, setType] = useState(TYPE_CUSTOMER);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setSubmittingState] = useState(false);

  const handleSignInWithEmail = async (event) => {
    event.preventDefault();
    setSubmittingState(true);
    signInWithEmail({ email, password, type })
      .then((res) => {
        console.log('Success');
        setSubmittingState(false);
      })
      .catch(() => {
        console.error('Fail');
        setSubmittingState(false);
      });
  };

  const signInWithSocial = (socialId) => {};

  return (
    <AuthLayout
      color={type === TYPE_CUSTOMER ? COLOR_CUSTOMER : COLOR_PROVIDER}
    >
      <Meta title="Zoom Errands | Login" description="Zoom Errands Login" />
      <div className="flex flex-col items-center justify-center p-5 m-auto space-y-5 rounded shadow-lg md:p-10 md:w-1/3 bg-white">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Welcome</h1>
        </div>
        <div>
          <Link href="/" className="text-4xl font-bold">
            Zoom Errands
          </Link>
        </div>
        <div className="text-center">
          <h2 className="text-gray-600">Login and continue</h2>
        </div>
        <Radio.Group
          optionType="button"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <Radio.Button value={TYPE_CUSTOMER} key="customer">
            Customer
          </Radio.Button>
          <Radio.Button value={TYPE_PRODIVER} key="provider">
            Provider
          </Radio.Button>
        </Radio.Group>
        <form className="flex flex-col w-full">
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Username"
            type="email"
            size="large"
            className="mb-3"
          />
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter Password"
            type="password"
            size="large"
          />
          <div className="flex justify-end mb-1">
            <Button type="link" size="small">
              Forgot Password?
            </Button>
          </div>
          <Button
            type="dashed"
            loading={isSubmitting}
            onClick={handleSignInWithEmail}
            shape="round"
            size="large"
          >
            Login
          </Button>
        </form>

        {socialProviders.length > 0 && (
          <div className="flex flex-col justify-center">
            <div className="text-sm text-gray-400 mb-2 text-center">
              Or Login With
            </div>
            <div className="flex justify-center w-full space-x-2">
              {socialProviders.map((provider, index) => (
                <Button
                  key={index}
                  shape="round"
                  onClick={() => signInWithSocial(provider.id)}
                  disabled={isSubmitting}
                  style={{
                    backgroundColor: provider.color,
                    color: 'white',
                    fontWeight: 900,
                  }}
                  icon={provider.icon}
                >
                  {provider.name}
                </Button>
              ))}
            </div>
          </div>
        )}

        <Button
          type="link"
          size="small"
          className="flex flex-col justify-center"
          onClick={() => router.replace(`/auth/register/?${type}`)}
        >
          <span className="text-center w-full">Don't have an account?</span>
          <span className="text-center w-full">
            Let's sign up as {type} with Zoom Errands
          </span>
        </Button>
      </div>
    </AuthLayout>
  );
};

export default Login;
