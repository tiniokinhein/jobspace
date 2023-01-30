import React, {useEffect, useState} from 'react';
import {Paper, Grid, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, styled} from "@mui/material";
import HistoryDataService from "../../services/history.service";

const PkgUsage = () => {
    const [usages, setUsages] = useState([]);

    useEffect(() => {
        (async () => {
            await HistoryDataService.getPkgUsages().then((res) => setUsages(res.data));
        })();
        // eslint-disable-next-line
    }, []);

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Paper elevation={2} sx={{ borderRadius: '10px' }}>
                    <TableContainer>
                        <Table aria-label="usage table">
                            <TableHead>
                                <TableRow>
                                    <StyledHeaderCell>Feature</StyledHeaderCell>
                                    <StyledHeaderCell>Total</StyledHeaderCell>
                                    <StyledHeaderCell>Usage</StyledHeaderCell>
                                    <StyledHeaderCell>Remain</StyledHeaderCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {usages.length > 0 && usages.map((usage) => {
                                    return (
                                        <TableRow hover key={usage?.feature}>
                                            <TableCell>{usage?.feature}</TableCell>
                                            <TableCell>{usage?.total}</TableCell>
                                            <TableCell>{usage?.usage}</TableCell>
                                            <TableCell>{usage?.remain}</TableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </Grid>
        </Grid>
    );
}

const StyledHeaderCell = styled(TableCell)(() => ({
    fontSize: '1rem'
}))

export default PkgUsage;