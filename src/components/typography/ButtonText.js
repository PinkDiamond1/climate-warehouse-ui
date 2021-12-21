import React from 'react';
import { useSelector } from 'react-redux';
import styled, { withTheme } from 'styled-components';

const Text = styled('h4')`
  color: ${props => props.color || '#000000'};
  font-size: 1rem;
  font-family: ${props => props.theme.typography.primary.regular};
  font-weight: 400;
  line-height: 1.375rem;
  font-style: normal;
  text-transform: capitalize;
  margin: 0;
  padding: 0;
`;

const ButtonText = withTheme(({ children, color }) => {
  const appStore = useSelector(state => state.app);
  return (
    <Text color={color} selectedTheme={appStore.theme}>
      {children}
    </Text>
  );
});

export { ButtonText };
