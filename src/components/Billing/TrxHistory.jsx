import React, { Fragment, useEffect, useState } from "react";
import {
  Box,
  Collapse,
  Grid,
  IconButton,
  Paper,
  Stack,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { helper } from "../../helpers";
import CheckIcon from "@mui/icons-material/Check";
import HistoryDataService from "../../services/history.service";
import StyledPagination from "../Common/StyledPagination";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

function Row(props: { row: ReturnType<typeof createData> }) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <Fragment>
      <TableRow
        sx={{
          "& > *": { borderBottom: "unset" },
          borderBottom: open ? "unset" : "inherit",
        }}
        hover
      >
        <TableCell component="th" scope="row">
          {row?.pkg_names}
        </TableCell>
        <TableCell>{row?.order_date}</TableCell>
        <TableCell>{row.coupon ?? "-"}</TableCell>
        <TableCell>
          {helper.nFormat(row.total)} {row.currency}
        </TableCell>
        <TableCell>Paid</TableCell>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? (
              <KeyboardArrowUpIcon color="primary" />
            ) : (
              <KeyboardArrowDownIcon color="primary" />
            )}
          </IconButton>
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box>
              <Table size="small" aria-label="features">
                <TableBody>
                  {row?.features.length > 0 &&
                    row.features.map((feature) => (
                      <TableRow key={feature.id}>
                        <TableCell sx={{ border: 0, px: 0 }}>
                          <Stack
                            direction="row"
                            spacing={1}
                            sx={{
                              minHeight: "20px",
                              justifyContent: "flex-start",
                              alignItems: "center",
                            }}
                          >
                            <CheckIcon sx={{ fontSize: "13px" }} />
                            <Typography fontSize="12px">
                              {feature.description}
                            </Typography>
                          </Stack>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  );
}

const TrxHistory = () => {
  const [count, setCount] = useState(0);
  const [total, setTotal] = useState(0);
  const [limit, setLimit] = useState(10);
  const [pageCnt, setPageCnt] = useState(1);
  const [histories, setHistories] = useState(0);

  const handlePageChange = (event, value) => {
    setPageCnt(value);
  };

  useEffect(() => {
    (async () => {
      await HistoryDataService.get({
        limit: limit,
        offset: (pageCnt - 1) * limit,
      }).then((res) => {
        const limit = res.metadata.info?.limit;
        const total = res.metadata.info?.total;

        setLimit(limit);
        setTotal(total);
        setHistories(res.data);
        setCount(Math.ceil(total / limit));
      });
    })();
    // eslint-disable-next-line
  }, [pageCnt]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Paper elevation={2} sx={{ borderRadius: "10px" }}>
          <TableContainer>
            <Table aria-label="trx history table">
              <TableHead>
                <TableRow>
                  <StyledHeaderCell>Package name</StyledHeaderCell>
                  <StyledHeaderCell>Order date</StyledHeaderCell>
                  <StyledHeaderCell>Coupon Code</StyledHeaderCell>
                  <StyledHeaderCell>Invoice Total</StyledHeaderCell>
                  <StyledHeaderCell>Status</StyledHeaderCell>
                  <StyledHeaderCell />
                </TableRow>
              </TableHead>
              <TableBody>
                {histories.length > 0 &&
                  histories.map((history) => (
                    <Row key={history.id} row={history} />
                  ))}
              </TableBody>
            </Table>

            {total > limit && (
              <Grid item xs={12}>
                <StyledPagination
                  count={count}
                  pageCnt={pageCnt}
                  handlePageChange={handlePageChange}
                />
              </Grid>
            )}
          </TableContainer>
        </Paper>
      </Grid>
    </Grid>
  );
};

const StyledHeaderCell = styled(TableCell)(() => ({
    fontSize: '1rem'
}))

export default TrxHistory;