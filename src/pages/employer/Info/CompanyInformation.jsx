import React, {useCallback, useEffect, useState} from 'react';
import {Grid} from '@mui/material';
import {useDispatch, useSelector} from "react-redux";
import {employerAuthActions} from "../../../store";
import CompanyInfoForm from "../../../components/Employer/CompanyInfo/CompanyInfoForm";
import CompanyInfoShow from "../../../components/Employer/CompanyInfo/CompanyInfoShow";

function CompanyInformation() {

    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const {company} = useSelector((state) => state.empAuth);

    const fetchCompany = useCallback(() => {
        dispatch(employerAuthActions.company())
    }, [dispatch]);

    useEffect(() => {
        if (Object.keys(company).length < 1) {
            fetchCompany();
        }
        setLoading(false)
        // eslint-disable-next-line
    }, [fetchCompany])

    return (
        <Grid container spacing={1}>
            <Grid item xs={12} md={12}>
                {!loading && Object.keys(company).length > 1 ?
                    <CompanyInfoShow company={company}/> :
                    <CompanyInfoForm/>
                }
            </Grid>
        </Grid>
    )
}

export default CompanyInformation