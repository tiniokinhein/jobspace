import React from 'react';
import {Box} from '@mui/material';

const DocViewer = ({path}) => {

    return (
        <Box>
            <iframe
                width='100%'
                height='623px'
                title="document viewer"
                src={`https://docs.google.com/gview?url=${path}&embedded=true`}
            />
        </Box>
    )
}

export default DocViewer;