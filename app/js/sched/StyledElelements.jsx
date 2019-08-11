
import React from 'react';
import styled from 'styled-components';

const Entry = styled.div`
  border-radius: 2px;
  font-size: 10pt;
  color: white;
  background-color: #009688;
  display: flex;
  padding: 0.2rem;
  margin: 0.2rem 0;
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
  padding: 10px;
  background: #e0e0e0;
  border-radius: 2px;
  min-width: 250px;
  min-height: 50px;
  flex-grow: 1;
  box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12), 0 1px 5px 0 rgba(0,0,0,0.2);
`;

export { Entry, Duration, Details, Time, DurTime, ColumnContainer, EntryContainer };

