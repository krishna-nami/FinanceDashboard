import React from 'react'
import FlexBetwen from './FlexBetween'
import { Box, Typography, useTheme } from '@mui/material'


type Props = {
    icon?: React.ReactNode;
    title: string;
    subtitle?: string;
    sideText: string
}

const BoxHeader = ({ icon, title, subtitle, sideText }: Props) => {
    const { palette } = useTheme()
    return (
        <FlexBetwen color={palette.grey[400]} margin='1.5rem 1rem 0 1 rem'>
            <FlexBetwen>
                {icon}
                <Box width='100%'>
                    <Typography variant='h4' mb='-0.1rem'>
                        {title}
                    </Typography>
                    <Typography variant='h6' mb='-0.1rem'>
                        {subtitle}
                    </Typography>
                </Box>

            </FlexBetwen>
            <Typography variant='h5' fontWeight='700' color={palette.secondary[400]}>{sideText}</Typography>

        </FlexBetwen>
    )
}

export default BoxHeader