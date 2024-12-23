import DashboardBox from '@/components/DashboardBox';
import FlexBetwen from '@/components/FlexBetween';
import { useGetKpisQuery } from '@/state/api';
import { Box, Button, Typography, useTheme } from '@mui/material'
import { useMemo, useState } from 'react'
import { CartesianGrid, Tooltip, Legend, Line, LineChart, ResponsiveContainer, XAxis, YAxis, Label } from 'recharts';
import regression, { DataPoint } from 'regression';


const Predictions = () => {
  const { palette } = useTheme();
  const [isPredictions, setIsPredictions] = useState(false);
  const { data: kpiData } = useGetKpisQuery();

  const formattedData = useMemo(() => {
    if (!kpiData) return [];
    const monthData = kpiData[0].monthlyData;

    const formatted: Array<DataPoint> = monthData.map(
      ({ revenue }, i: number) => {
        return [i, revenue];

      }
    );
    const regressionLine = regression.linear(formatted);

    return monthData.map(({ month, revenue }, i: number) => {
      return {
        name: month,
        "Actual Revenue": revenue,
        "Regression Line": regressionLine.points[i][1],
        "Predicted Revenue": regressionLine.predict(i + 12)[1]
      }
    })

  }, [kpiData])



  return (
    <DashboardBox width='100%' height='100%' p='1rem' overflow='hidden'>
      <FlexBetwen m='rrem 2.5rem'>
        <Box>
          <Typography variant='h3'> Revenue and Predictions</Typography>
          <Typography variant='h6'> Predction of revenue based on our current data using linear regression model</Typography>
        </Box>
        <Button onClick={() => setIsPredictions(!isPredictions)}
          sx={{
            color: palette.grey[900],
            backgroundColor: palette.grey[700],
            boxShadow: '0.1rem 0.1rem 0.1rem 0.1rem rgba(0,0,0,0.4)'
          }}
        >Show Revenue prediction for next year</Button>
      </FlexBetwen>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart

          data={formattedData}
          margin={{
            top: 20,
            right: 75,
            left: 20,
            bottom: 80,
          }}
        >


          <CartesianGrid strokeDasharray='3 3' stroke={palette.grey[800]} />
          <XAxis
            dataKey="name"
            tickLine={false}
            style={{ fontSize: '10px' }}>
            <Label value='Month' offset={-5} position='insideBottom'></Label>
          </XAxis>

          <YAxis
            domain={[12000, 26000]}
            axisLine={{ strokeWidth: '0' }}
            style={{ fontSize: '10px' }}
            tickFormatter={(v) => `$${v}`}>
            <Label
              value='Revenue in USD'
              offset={-5}
              angle={-90}
              position='insideLeft'>

            </Label>
          </YAxis>

          <Tooltip />
          <Legend verticalAlign='top' />
          <Line type="monotone" dataKey="Actual Revenue" stroke={palette.primary.main} strokeWidth={0} dot={{ strokeWidth: 5 }} />
          <Line type="monotone" dataKey="Regression Line" dot={false} stroke='#8884d8' />
          {isPredictions && (
            <Line type="monotone" dataKey="Predicted Revenue" stroke={palette.secondary[500]} />
          )}
        </LineChart>
      </ResponsiveContainer>


    </DashboardBox>
  )
}

export default Predictions