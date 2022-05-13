import React from 'react';
import usePubnubManager from '@/hooks/use-pubnub-manager';
import { Form, Formik, FormikErrors, FormikHelpers, FormikProps, FormikValues } from 'formik';

import CoolBox from '@/components/cool-box';
import Button from '@/components/button';
import style from './index.module.scss';
import { usePubNub } from 'pubnub-react';

interface FormInputs {
  username: string;
}

const initialValues:FormInputs = { username: '' };

interface Props {
  channel: string;
}

const JoinTheChat = (props:Props) => {
  const { channel } = props;

  const [isSignedIn, setIsSignedIn] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>();
  const inputRef = React.useRef<HTMLInputElement>(null);

  const { uuid, updateUuid } = usePubnubManager();

  React.useEffect(() => { console.log(uuid)
    setIsSignedIn(uuid !== 'anonymous');
  }, [uuid]);

  const handleValidate = (values: FormikValues) => {
    const errors: FormikErrors<FormInputs> = {};

    if (!values.username) {
      errors.username = 'Required';
    }

    return errors;
  }

  const handleSubmit = async (values: FormInputs, { setSubmitting }: FormikHelpers<FormInputs>) => {
    try {
      const success = await updateUuid(values.username);

      if(!success) {
        throw new Error('Name is already in use');
      }
    }
    catch(err:any) { 
      setError(err.message);
    }
    finally {
      setSubmitting(false);
    }
  };

  if(isSignedIn) return null;

  return (
    <div className={style.container}>
      <CoolBox>
        <Formik
          initialValues={initialValues}
          validate={handleValidate}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, handleChange, handleBlur, values, errors }: FormikProps<FormInputs>) => (
            <Form>
              <h1 className={style.heading}>Join the chat</h1>
              <span className={style.error}>{error}</span>
              <div className={style.fieldContainer}>
                <div className={style.fieldLabel}>Your Name</div>
                <input
                  className={style.fieldInput}
                  type="text"
                  name="username"
                  value={values.username}
                  autoComplete="off"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <span className={style.error}>{errors.username}</span>
              </div>
              <Button type="submit" text="Join" disabled={isSubmitting} small />
            </Form>
          )}
        </Formik>
      </CoolBox>
    </div>
  );
};

export default JoinTheChat;
