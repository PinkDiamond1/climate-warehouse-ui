import React, { memo, useCallback } from 'react';
import { useIntl, FormattedMessage } from 'react-intl';

import {
  StandardInput,
  InputSizeEnum,
  InputStateEnum,
  InputVariantEnum,
  Divider,
  ModalFormContainerStyle,
  FormContainerStyle,
  BodyContainer,
  Body,
  DateSelect,
  DescriptionIcon,
  ToolTipContainer,
  LabelContainer,
  StyledLabelContainer,
  StyledFieldContainer,
  InputContainer,
  DateSelectVariantEnum,
  FormikError,
} from '..';

// eslint-disable-next-line react/display-name
const ProjectIssuanceForm = memo(
  ({ index, name, errors, touched, value, setFieldValue, handleBlur }) => {
    const intl = useIntl();
    const getFieldName = useCallback(
      fieldName => `${name}[${index}].${fieldName}`,
      [name, index],
    );
    const areFieldsDisabled = Boolean(value.id);

    return (
      <ModalFormContainerStyle>
        <FormContainerStyle>
          <BodyContainer>
            <StyledFieldContainer>
              <StyledLabelContainer>
                <Body>
                  <LabelContainer>
                    *<FormattedMessage id="start-date" />
                  </LabelContainer>
                  <ToolTipContainer
                    tooltip={intl.formatMessage({
                      id: 'issuances-start-date-description',
                    })}
                  >
                    <DescriptionIcon height="14" width="14" />
                  </ToolTipContainer>
                </Body>
              </StyledLabelContainer>
              <InputContainer>
                <DateSelect
                  variant={
                    errors?.startDate &&
                    touched?.startDate &&
                    DateSelectVariantEnum.error
                  }
                  size="large"
                  dateValue={value.startDate}
                  setDateValue={value =>
                    setFieldValue(getFieldName('startDate'), value)
                  }
                  name={getFieldName('startDate')}
                  onBlur={handleBlur}
                  disabled={areFieldsDisabled ? true : undefined}
                />
              </InputContainer>
              <FormikError name={getFieldName('startDate')} />
            </StyledFieldContainer>
            <StyledFieldContainer>
              <StyledLabelContainer>
                <Body>
                  <LabelContainer>
                    *<FormattedMessage id="end-date" />
                  </LabelContainer>
                  <ToolTipContainer
                    tooltip={intl.formatMessage({
                      id: 'issuances-end-date-description',
                    })}
                  >
                    <DescriptionIcon height="14" width="14" />
                  </ToolTipContainer>
                </Body>
              </StyledLabelContainer>
              <InputContainer>
                <DateSelect
                  variant={
                    errors?.endDate &&
                    touched?.endDate &&
                    DateSelectVariantEnum.error
                  }
                  size="large"
                  dateValue={value.endDate}
                  setDateValue={value =>
                    setFieldValue(getFieldName('endDate'), value)
                  }
                  name={getFieldName('endDate')}
                  onBlur={handleBlur}
                  disabled={areFieldsDisabled ? true : undefined}
                />
              </InputContainer>
              <FormikError name={getFieldName('endDate')} />
            </StyledFieldContainer>
            <StyledFieldContainer>
              <StyledLabelContainer>
                <Body>
                  <LabelContainer>
                    *<FormattedMessage id="verification-body" />
                  </LabelContainer>
                  <ToolTipContainer
                    tooltip={intl.formatMessage({
                      id: 'issuances-verification-body-description',
                    })}
                  >
                    <DescriptionIcon height="14" width="14" />
                  </ToolTipContainer>
                </Body>
              </StyledLabelContainer>
              <InputContainer>
                <StandardInput
                  variant={
                    errors?.verificationBody &&
                    touched?.verificationBody &&
                    InputVariantEnum.error
                  }
                  size={InputSizeEnum.large}
                  placeholderText={intl.formatMessage({
                    id: 'verification-body',
                  })}
                  state={
                    areFieldsDisabled
                      ? InputStateEnum.disabled
                      : InputStateEnum.default
                  }
                  value={value.verificationBody}
                  onChange={value =>
                    setFieldValue(getFieldName('verificationBody'), value)
                  }
                  onBlur={handleBlur}
                  name={getFieldName('verificationBody')}
                />
              </InputContainer>
              <FormikError name={getFieldName('verificationBody')} />
            </StyledFieldContainer>
            <StyledFieldContainer>
              <StyledLabelContainer>
                <Body>
                  <LabelContainer>
                    *<FormattedMessage id="verification-report-date" />
                  </LabelContainer>
                  <ToolTipContainer
                    tooltip={intl.formatMessage({
                      id: 'issuances-verification-report-date-description',
                    })}
                  >
                    <DescriptionIcon height="14" width="14" />
                  </ToolTipContainer>
                </Body>
              </StyledLabelContainer>
              <InputContainer>
                <DateSelect
                  variant={
                    errors?.verificationReportDate &&
                    touched?.verificationReportDate &&
                    DateSelectVariantEnum.error
                  }
                  size="large"
                  dateValue={value.verificationReportDate}
                  setDateValue={value =>
                    setFieldValue(getFieldName('verificationReportDate'), value)
                  }
                  name={getFieldName('verificationReportDate')}
                  onBlur={handleBlur}
                  disabled={areFieldsDisabled ? true : undefined}
                />
              </InputContainer>
              <FormikError name={getFieldName('verificationReportDate')} />
            </StyledFieldContainer>
            {value.id && (
              <StyledFieldContainer>
                <StyledLabelContainer>
                  <Body>
                    <LabelContainer>
                      *<FormattedMessage id="id" />
                    </LabelContainer>
                    <ToolTipContainer
                      tooltip={intl.formatMessage({
                        id: 'id',
                      })}
                    >
                      <DescriptionIcon height="14" width="14" />
                    </ToolTipContainer>
                  </Body>
                </StyledLabelContainer>
                <InputContainer>
                  <StandardInput
                    size={InputSizeEnum.large}
                    placeholderText={intl.formatMessage({
                      id: 'id',
                    })}
                    state={InputStateEnum.disabled}
                    value={value.id}
                  />
                </InputContainer>
              </StyledFieldContainer>
            )}
            <StyledFieldContainer>
              <StyledLabelContainer>
                <Body>
                  <LabelContainer>
                    *<FormattedMessage id="verification-approach" />
                  </LabelContainer>
                  <ToolTipContainer
                    tooltip={intl.formatMessage({
                      id: 'issuances-verification-approach-description',
                    })}
                  >
                    <DescriptionIcon height="14" width="14" />
                  </ToolTipContainer>
                </Body>
              </StyledLabelContainer>
              <InputContainer>
                <StandardInput
                  variant={
                    errors?.verificationApproach &&
                    touched?.verificationApproach &&
                    InputVariantEnum.error
                  }
                  size={InputSizeEnum.large}
                  placeholderText={intl.formatMessage({
                    id: 'verification-approach',
                  })}
                  state={
                    areFieldsDisabled
                      ? InputStateEnum.disabled
                      : InputStateEnum.default
                  }
                  value={value.verificationApproach}
                  onChange={value =>
                    setFieldValue(getFieldName('verificationApproach'), value)
                  }
                  onBlur={handleBlur}
                  name={getFieldName('verificationApproach')}
                />
              </InputContainer>
              <FormikError name={getFieldName('verificationApproach')} />
            </StyledFieldContainer>
          </BodyContainer>
        </FormContainerStyle>
        <Divider />
      </ModalFormContainerStyle>
    );
  },
);

export { ProjectIssuanceForm };
