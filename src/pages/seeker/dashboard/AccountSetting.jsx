import React from 'react';
import {Box, Divider, Paper, Typography} from "@mui/material";
import AccountSettingForm from "../../../components/Seeker/AccountSettingForm";

const AccountSetting = () => {

    return (
        <Paper sx={{
            borderRadius: '10px',
            boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.06), 0px 1px 3px rgba(0, 0, 0, 0.1)'
        }}>
            <Box sx={{display: 'flex', flexDirection: 'column'}}>
                <Typography variant="h5" py={3} px={4} color="primary">Account Setting</Typography>
                <Divider/>
                <AccountSettingForm/>
            </Box>
        </Paper>
    )
}

export default AccountSetting;