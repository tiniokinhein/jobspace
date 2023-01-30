import React from 'react';
import {Box, Pagination, styled} from "@mui/material";

const StyledPagination = ({count, pageCnt, handlePageChange, align="right"}) => {

    const CustomPagination = styled(Pagination)(() => ({
        ul: {
            "& .MuiPaginationItem-root": {
                borderColor: "#E0E0E0", margin: "10px",
            }
        }
    }));

    return (
        <Box justifyItems={align} display="flex" justifyContent={align}>
            <CustomPagination
                count={count}
                page={pageCnt}
                variant="outlined"
                shape="rounded"
                siblingCount={1}
                boundaryCount={1}
                onChange={handlePageChange}
            />
        </Box>
    )
};

export default StyledPagination;