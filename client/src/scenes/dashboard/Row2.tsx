import BoxHeader from '@/components/BoxHeader'
import DashboardBox from '@/components/DashboardBox'
import FlexBetwen from '@/components/FlexBetween'
import { useGetKpisQuery, useGetProductsQuery } from '@/state/api'
import { Box, Typography, useTheme } from '@mui/material'
import { useMemo } from 'react'

import { CartesianGrid, Cell, Line, LineChart, Pie, PieChart, ResponsiveContainer, Scatter, ScatterChart, Tooltip, XAxis, YAxis, ZAxis } from 'recharts'


const pieData = [{ name: "gropu a", value: 600 },
{ name: "group b", value: 400 }
]
const Row2 = () => {
    const { data: operationalData } = useGetKpisQuery();
    const { data: productData } = useGetProductsQuery();
    // console.log("data", productData)
    const { palette } = useTheme();
    const pieColors = [palette.primary[800], palette.primary[300]]
    const productExpenseData = useMemo(() => {
        return (
            productData && productData.map(({ _id, price, expense }) => {
                return {
                    id: _id,
                    price: price,
                    expense: expense
                };
            })
        )
    }, [productData])
    const expenses = useMemo(() => {
        return (
            operationalData && operationalData[0].monthlyData.map(({ month, operationalExpenses, nonOperationalExpenses }) => {
                return {
                    name: month.substring(0, 3),
                    operational: operationalExpenses,
                    noperational: nonOperationalExpenses,

                };
            })
        )
    }, [operationalData])
    return (
        <>
            <DashboardBox gridArea="d"> <BoxHeader title="Operational vs non operational"
                sideText='+4%'

            />
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart

                        data={expenses}
                        margin={{
                            top: 20,
                            right: 25,
                            left: -10,
                            bottom: 55,
                        }}
                    >


                        <CartesianGrid vertical={false} stroke={palette.grey[800]} />
                        <XAxis dataKey="name" tickLine={false} style={{ fontSize: '10px' }} />
                        <YAxis yAxisId="left" tickLine={false} axisLine={{ strokeWidth: '0' }} style={{ fontSize: '10px' }} />
                        <YAxis yAxisId="right" orientation='right' axisLine={{ strokeWidth: '0' }} style={{ fontSize: '10px' }} />
                        <Tooltip />

                        <Line yAxisId="right" type="monotone" dataKey="operational" dot={true} stroke={palette.tertiary[500]} />
                        <Line yAxisId="left" type="monotone" dataKey="noperational" dot={true} stroke={palette.primary.main} />
                    </LineChart>
                </ResponsiveContainer></DashboardBox>
            <DashboardBox gridArea="e">
                <BoxHeader title='Campains and Targets' sideText='4%' />
                <FlexBetwen mt="0.25rem" gap="1.5rem" pr="1rem">
                    <PieChart
                        width={110}
                        height={100}
                        margin={{
                            top: 0,
                            right: -10,
                            left: 10,
                            bottom: 0
                        }}
                    >

                        <Pie
                            stroke='none'
                            data={pieData}
                            innerRadius={18}
                            outerRadius={38}
                            paddingAngle={2}
                            dataKey="value"
                        >
                            {pieData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={pieColors[index]} />
                            ))}
                        </Pie>

                    </PieChart>
                    <Box ml="-0.7rem" flexBasis="40%" textAlign="center">
                        <Typography variant='h5'>Target Sales</Typography>
                        <Typography m="0.3rem 0" variant='h3' color={palette.primary[300]}>83</Typography>
                        <Typography variant='h6'>Finance goals are desired</Typography>

                    </Box>
                    <Box ml="-0.7rem" flexBasis="40%">
                        <Typography variant='h5'>Loses in Revenue</Typography>
                        <Typography variant='h6' >Loses are down 25%</Typography>
                        <Typography variant='h5' mt="0.4rem">Profit Margins</Typography>
                        <Typography variant='h6'>Margins are up by 30% frm last month</Typography>

                    </Box>
                </FlexBetwen>

            </DashboardBox>
            <DashboardBox gridArea="f">
                <BoxHeader title='Product Prices vs expenses' sideText='=4%' />
                <ResponsiveContainer width="100%" height='100%'>

                    <ScatterChart
                        margin={{
                            top: 20,
                            right: 25,
                            bottom: 40,
                            left: -10,
                        }}
                    >
                        <CartesianGrid stroke={palette.grey[800]} />
                        <XAxis
                            type="number"
                            dataKey="price"
                            name="price"
                            axisLine={false}
                            tickLine={false}
                            style={{ fontSize: "10px" }}
                            tickFormatter={(v) => `$${v}`}
                        />
                        <YAxis
                            type="number"
                            dataKey="expense"
                            name="expense"
                            axisLine={false}
                            tickLine={false}
                            style={{ fontSize: "10px" }}
                            tickFormatter={(v) => `$${v}`}
                        />

                        <ZAxis type='number' range={[20]} />
                        <Tooltip formatter={(v) => `$${v}`} />
                        <Scatter name="A school" data={productExpenseData} fill={palette.tertiary[500]} />
                    </ScatterChart>
                </ResponsiveContainer>
            </DashboardBox></>
    )
}

export default Row2