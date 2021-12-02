import React, { useEffect } from 'react';
import { Card, DataTable } from '../../../components';
import { getUnits } from '../../../store/actions/climateWarehouseActions';
import { useSelector, useDispatch } from 'react-redux';
import { unitsResponseStub } from '../../../mocks';

const Units = () => {
  const dispatch = useDispatch();
  const climateWarehouseStore = useSelector(store => store.climateWarehouse);

  useEffect(() => dispatch(getUnits({ useMockedResponse: true })), []);

  return (
    <>
      <Card>
        <div>Units</div>
        {climateWarehouseStore.units && (
          <DataTable
            headings={Object.keys(unitsResponseStub[0])}
            data={climateWarehouseStore.units}
          />
        )}
      </Card>
    </>
  );
};

export { Units };
