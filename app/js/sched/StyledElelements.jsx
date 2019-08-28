
import React from 'react';
import styled from 'styled-components';

const Entry = styled.div`
  border-sizing: border-box; 
  border-top: 1px solid white;
  font-size: 10pt;
  color: white;
  background-color: #009688;
  display: flex;
  padding: 0.2rem;
  &:hover {
    background: #4db6ac;
  }
`;

const Time = styled.div`
  font-size: 8pt;
  flex: 0;
`

const DurTime = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
`

const Details = styled.div`
  cursor: pointer;
  flex-grow: 1;
  padding-left: 5px;
`;

const Duration = styled.div`
  min-width: 40px; 
  text-align: center;
  border-right: 1px solid white;
  padding-right: 5px;
  display: flex;
  flex-direction: column;
`

const ColumnContainer = styled.div`
  margin: 3px;
  grid-row: 1;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid grey;
`

const EntryContainer = styled.div`
  border-bottom: 1px solid white;
  min-height: 50px;
  margin: 0.5rem;
`;

export { Entry, Duration, Details, Time, DurTime, ColumnContainer, EntryContainer };

