import _ from 'lodash';
import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { Stepper, Step, StepLabel } from '@mui/material';
import { useIntl } from 'react-intl';
import { Formik, setNestedObjectValues } from 'formik';

import {
  Modal,
  TabPanel,
  modalTypeEnum,
  UnitDetailsForm,
  UnitLabelForm,
  UnitIssuanceForm,
  FormikRepeater,
} from '..';
import { unitsSchema } from '../../store/validations';
import {
  getIssuances,
  getPaginatedData,
  editStagingData,
  getMyProjects,
} from '../../store/actions/climateWarehouseActions';
import { cleanObjectFromEmptyFieldsOrArrays } from '../../utils/formatData';

const StyledFormContainer = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-top: 10px;
`;

const emptyLabel = {
  label: '',
  labelType: '',
  creditingPeriodStartDate: '',
  creditingPeriodEndDate: '',
  validityPeriodStartDate: '',
  validityPeriodEndDate: '',
  unitQuantity: 0,
  labelLink: '',
};

const UnitEditStagingModal = ({
  onClose,
  changeGroup,
  modalSizeAndPosition,
}) => {
  const { myOrgUid } = useSelector(store => store.climateWarehouse);
  const { notification, showProgressOverlay: apiResponseIsPending } =
    useSelector(state => state.app);
  const [unit] = useState(changeGroup?.diff?.change[0] ?? null);
  const [tabValue, setTabValue] = useState(0);
  const dispatch = useDispatch();
  const intl = useIntl();

  useEffect(() => {
    if (myOrgUid) {
      dispatch(getMyProjects(myOrgUid));
      dispatch(getPaginatedData({ type: 'projects', orgUid: myOrgUid }));
      dispatch(getIssuances());
      localStorage.removeItem('unitSelectedWarehouseProjectId');
    }
  }, []);

  const stepperStepsTranslationIds = ['unit', 'issuance', 'labels'];

  const onChangeStep = useCallback(async ({ formik, desiredStep = null }) => {
    const errors = await formik.validateForm();

    // manually setting touched for error fields so errors are displayed
    formik.setTouched(setNestedObjectValues(errors, true));

    const isUnitValid = _.isEmpty(errors);

    const isIssuanceSelected =
      desiredStep > 1 ? !_.isEmpty(formik.values?.issuance) : true;

    const isProjectSelected = Boolean(
      localStorage.getItem('unitSelectedWarehouseProjectId'),
    );

    if (isUnitValid && isProjectSelected && isIssuanceSelected) {
      if (
        desiredStep >= stepperStepsTranslationIds.length &&
        !apiResponseIsPending
      ) {
        formik.submitForm();
      } else {
        setTabValue(desiredStep);
      }
    }
  }, []);

  // if unit was successfully edited, close modal
  const unitWasSuccessfullyEdited = notification?.id === 'staging-group-edited';
  useEffect(() => {
    if (unitWasSuccessfullyEdited) {
      onClose();
    }
  }, [notification]);

  if (!unit) {
    return null;
  }

  return (
    <Formik
      initialValues={unit}
      validationSchema={unitsSchema}
      onSubmit={values => {
        const dataToSend = _.cloneDeep(values);
        if (dataToSend.serialNumberBlock) {
          delete dataToSend.serialNumberBlock;
        }
        cleanObjectFromEmptyFieldsOrArrays(dataToSend);
        dispatch(editStagingData(changeGroup.uuid, dataToSend));
      }}
    >
      {formik => (
        <Modal
          modalSizeAndPosition={modalSizeAndPosition}
          onOk={() => onChangeStep({ formik, desiredStep: tabValue + 1 })}
          onClose={onClose}
          modalType={modalTypeEnum.basic}
          title={intl.formatMessage({
            id: 'edit-unit',
          })}
          label={intl.formatMessage({
            id: tabValue < 2 ? 'next' : 'update-unit',
          })}
          extraButtonLabel={
            tabValue > 0
              ? intl.formatMessage({
                  id: 'back',
                })
              : undefined
          }
          extraButtonOnClick={() =>
            onChangeStep({
              formik,
              desiredStep: tabValue > 0 ? tabValue - 1 : tabValue,
            })
          }
          body={
            <StyledFormContainer>
              <Stepper activeStep={tabValue} alternativeLabel>
                {stepperStepsTranslationIds &&
                  stepperStepsTranslationIds.map((step, index) => (
                    <Step
                      key={index}
                      onClick={() =>
                        onChangeStep({ formik, desiredStep: index })
                      }
                      sx={{ cursor: 'pointer' }}
                    >
                      <StepLabel>
                        {intl.formatMessage({
                          id: step,
                        })}
                      </StepLabel>
                    </Step>
                  ))}
              </Stepper>
              <TabPanel
                style={{ paddingTop: '1.25rem' }}
                value={tabValue}
                index={0}
              >
                <UnitDetailsForm />
              </TabPanel>
              <TabPanel value={tabValue} index={1}>
                <UnitIssuanceForm />
              </TabPanel>
              <TabPanel value={tabValue} index={2}>
                <FormikRepeater
                  empty={emptyLabel}
                  name="labels"
                  tooltip={intl.formatMessage({
                    id: 'labels-units-optional',
                  })}
                  min={0}
                  Component={UnitLabelForm}
                />
              </TabPanel>
            </StyledFormContainer>
          }
        />
      )}
    </Formik>
  );
};

export { UnitEditStagingModal };
