import React from 'react';
import { usePubNub } from 'pubnub-react';
import { FormikErrors, FormikValues, useFormik } from 'formik';
import { debounce, DebouncedFunc } from 'lodash-es';

import CallToActionBanner from '@/components/call-to-action-banner';
import ModalStudio from '@/components/modal-studio';
import style from './index.module.scss';

interface FormInputs {
  url: string;
}

const initialValues: FormInputs = { url: '' };

interface Props {
  publishId: string;
  open: boolean;
  onClose: () => void;
}

const CallToActionModal = (props: Props) => {
  const { publishId, open, onClose } = props;
  
  const [error, setError] = React.useState<string>();
  const [ctaMeta, setCtaMeta] = React.useState<any>();

  const resolveCtaMetaRef = React.useRef<DebouncedFunc<(values: FormikValues) => Promise<void>>>();

  React.useEffect(() => {
    if(resolveCtaMetaRef.current) return;

    resolveCtaMetaRef.current = resolveCtaMetaDebounced;
  }, []);

  const pubnub = usePubNub();

  const resolveCtaMetaDebounced = debounce(async (values: FormikValues) => {
    try {
      const response = await fetch(`/api/get-url-meta`, { method: 'post', body: values.url });
      const result = await response.json();

      setCtaMeta(result.metadata);
    } catch(err) {
      formik.setFieldError('url', 'Needs to be a valid URL');
      setCtaMeta(null);
    }    
  }, 300);

  const handleValidate = (values: FormikValues) => {
    formik.setSubmitting(true);
    formik.setFieldError('url', undefined);

    const errors: FormikErrors<FormInputs> = {};

    if (!values.url) {
      errors.url = 'Required';

      return errors;
    }

    try {
      const url = new URL(values.url);

      if(url.protocol !== 'http:' && url.protocol !== 'https:') {
        errors.url = 'Needs to be either an http or https url';
      }

      resolveCtaMetaRef.current && resolveCtaMetaRef.current(values);
    } catch(err) {
      errors.url = 'Needs to be a valid URL';
    }

    formik.setSubmitting(false);

    return errors;
  }

  const handleSubmit = async (values: FormInputs) => {
    formik.setSubmitting(true);

    try {
      await pubnub.publish({
        channel: `${publishId}-cta`,
        message: { cta: ctaMeta }
      });

      setError(undefined);
      setCtaMeta(undefined);
      formik.resetForm();
    }
    catch(err:any) { 
      setError(err.message);
    }
    finally {
      formik.setSubmitting(false);
    }
  };

  const handleReset = async () => {
    setCtaMeta(undefined);
    onClose();
  }

  const formik = useFormik({ initialValues, validate: handleValidate, onSubmit: handleSubmit, onReset: handleReset });

  if(!open) return null;

  return (
    <form onSubmit={formik.handleSubmit}>
      <ModalStudio
        headerText="Send Call to Action"
        open={open}
        width={900}
        disableSubmit={!ctaMeta || formik.isSubmitting}
        onSubmit={() => formik.submitForm()}
        onCancel={() => formik.resetForm()}
      >
        <span className={style.error}>{error}</span>
        <div className={style.fieldContainer}>
          <div className={style.fieldLabel}>URL</div>
          <input
            className={style.fieldInput}
            type="text"
            name="url"
            value={formik.values.url}
            autoComplete="off"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <span className={style.error}>{formik.errors.url}</span>
        </div>
        {
          ctaMeta ?
          <>
            <div className={style.fieldLabel}>Preview</div>
            <CallToActionBanner metadata={ctaMeta} />
          </>:
          <div>Specify a URL to have it's meta tags extracted for the Call to Action</div>
        }
      </ModalStudio>
    </form>
  );
};

export default CallToActionModal;
