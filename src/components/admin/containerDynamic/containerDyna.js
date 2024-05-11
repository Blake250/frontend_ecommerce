import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const ContainerDyna
 = ({ children }) => {
  const [containerHeight, setContainerHeight] = useState('auto');

  useEffect(() => {
    const updateContainerHeight = () => {
      const contentHeight = document.getElementById('dynamic-height-content').offsetHeight;
      const viewportHeight = window.innerHeight;
      const minHeight = Math.max(contentHeight, viewportHeight);
      setContainerHeight(minHeight + '50px');
    };

    updateContainerHeight();
    window.addEventListener('resize', updateContainerHeight);

    return () => {
      window.removeEventListener('resize', updateContainerHeight);
    };
  }, []);

  return <Container style={{ height: containerHeight }}>{children}</Container>;
};

export default ContainerDyna
;

const Container = styled.div`
  width: 100%;
  height:50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
`;
