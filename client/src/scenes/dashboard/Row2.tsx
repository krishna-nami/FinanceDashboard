import BoxHeader from '@/components/BoxHeader'
import DashboardBox from '@/components/DashboardBox'
import { useGetKpisQuery, useGetProductsQuery } from '@/state/api'
import { useTheme } from '@mui/material'
import { useMemo } from 'react'

import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'



const Row2 = () => {
    const { data: operationalData } = useGetKpisQuery();
    const { data: productData } = useGetProductsQuery();
    console.log("data", productData)
    const { palette } = useTheme();
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
            <DashboardBox gridArea="e"></DashboardBox>
            <DashboardBox gridArea="f"></DashboardBox></>
    )
}

export default Row2