import React, {Fragment} from 'react';
import {Link, Typography} from "@mui/material";
import BlockQuote from "../Common/BlockQuote";
import {Link as RouterLink} from "react-router-dom";

const WarnBlockQuote = ({companyWarning, abilityWarning, ability, progressWarning=false}) => {

    return (
        <Fragment>
            {companyWarning &&
                <BlockQuote>
                    <Typography>
                        Update your&nbsp;
                        <Link
                            underline="always"
                            component={RouterLink}
                            to="/employers/company-info"
                        >
                            company information
                        </Link>
                        &nbsp;to continue.
                    </Typography>
                </BlockQuote>
            }

            {abilityWarning &&
                <BlockQuote>
                    <Typography>
                        You don't have any chance to {ability}. Please&nbsp;
                        <Link
                            underline="always"
                            component={RouterLink}
                            to="/contact-us"
                        >
                            contact us
                        </Link>
                        &nbsp;to continue.
                    </Typography>
                </BlockQuote>
            }
            {progressWarning &&
                <BlockQuote>
                    <Typography>
                        Your profile progress needs to be greater than or equal 80%. Please&nbsp;
                        fill your account information to continue.
                    </Typography>
                </BlockQuote>
            }
        </Fragment>
    );
}

export default WarnBlockQuote;