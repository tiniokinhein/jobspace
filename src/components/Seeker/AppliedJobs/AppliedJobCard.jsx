import React, {Fragment, useEffect, useState} from "react";
import {Avatar, Box, Grid, Link, List, ListItem, ListItemText, Paper, Popover, Stack, Typography,} from "@mui/material";
import ApplicantPersonIcon from "../../../assets/icons/applicant-person.svg";
import {Link as RouterLink} from "react-router-dom";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PendingIcon from "@mui/icons-material/Pending";
import DonutLargeIcon from "@mui/icons-material/DonutLarge";

const AppliedJobCard = ({ data, forDashboard = false }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [expComparisons, setExpComparisons] = useState({});
  const [salaryComparisons, setSalaryComparisons] = useState({});
  const [hasComparisons, setHasComparisons] = useState(false);

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if ("experiences" in data.comparisons) {
      setHasComparisons(true);
      setExpComparisons(data.comparisons.experiences);
    }

    if ("salaries" in data.comparisons) {
      setHasComparisons(true);
      setSalaryComparisons(data.comparisons.salaries);
    }
  }, [data]);

  return (
    <Fragment>
      {data && (
        <Box
          sx={{
            minHeight: "208px",
            borderRadius: "5px",
            border: "0.5px solid #C4C4C4",
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            paddingY: "5px",
          }}
        >
          <Stack direction="column" spacing={1} width="90%">
            <Stack
              direction={{ xs: "column-reverse", sm: "row" }}
              justifyContent={{ xs: "center", sm: "space-between" }}
              width="100%"
            >
              <Stack
                direction="column"
                spacing={1.5}
                alignItems="start"
                justifyContent="center"
                pb={2}
                width="100%"
              >
                <Link
                  component={RouterLink}
                  underline="none"
                  to={`/jobs/${data.job_post_id}/detail`}
                >
                  <Typography
                    sx={{
                      fontSize: "16px",
                      fontWeight: "500",
                      color: "#195DCC",
                      maxWidth: forDashboard ? '260px' : '350px',
                    }}
                    noWrap={true}
                  >
                    {data?.job_title}
                  </Typography>
                </Link>

                <Typography sx={{ fontSize: "13px", fontWeight: "400" }}>
                  {data.company_id ? (
                    <Link
                      component={RouterLink}
                      underline="none"
                      to={`/companies/${data.company_id}/details`}
                      color="inherit"
                    >
                      {data?.company_name}
                    </Link>
                  ) : (
                    <Link underline="none" color="inherit">
                      {data?.company_name}
                    </Link>
                  )}
                </Typography>

                <Typography
                  sx={{
                    color: "#A1A1A1",
                    fontWeight: "400",
                    fontSize: "12px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {data.type === 0 && (
                    <Fragment>
                      <PendingIcon
                        color="#A1A1A1"
                        sx={{
                          fontSize: "18px",
                          marginRight: "4px",
                        }}
                      />
                      Application Submitted
                    </Fragment>
                  )}

                  {data.type !== 0 && (
                    <Fragment>
                      <CheckCircleIcon
                        color="success"
                        sx={{
                          fontSize: "18px",
                          marginRight: "4px",
                        }}
                      />
                      Profile viewed {data.view_cnt ?? 0} time(s) by employer
                    </Fragment>
                  )}
                </Typography>

                {data.apply_cnt > 0 && (
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <img
                      src={ApplicantPersonIcon}
                      alt="ApplicantList Person"
                      width="14px"
                    />

                    <Typography
                      sx={{
                        color: "#A1A1A1",
                        fontSize: "12px",
                        fontWeight: "400",
                      }}
                    >
                      {data.apply_cnt} Applicants
                    </Typography>

                    <Box>
                      {hasComparisons && (
                        <Fragment>
                          <Typography
                            sx={{
                              color: "#195DCC",
                              cursor: "pointer",
                              fontSize: "10px",
                              ml: 1,
                            }}
                            aria-describedby={id}
                            onClick={handleClick}
                          >
                            Compare
                          </Typography>
                          <Popover
                            elevation={1}
                            id={id}
                            open={open}
                            key={data.uuid}
                            anchorEl={anchorEl}
                            onClose={handleClose}
                            anchorOrigin={{
                              vertical: "bottom",
                              horizontal: "left",
                            }}
                            disableScrollLock={true}
                          >
                            <Paper sx={{ minWidth: "300px" }}>
                              <Stack
                                direction="column"
                                alignItems="start"
                                justifyContent="center"
                                p={2}
                              >
                                <Typography
                                  fontSize="12px"
                                  fontWeight="400"
                                  mb={1}
                                >
                                  Compared With Other Applicants
                                </Typography>

                                <Grid container spacing={2}>
                                  {Object.keys(expComparisons).length > 0 && (
                                    <Grid item xs={7} md={7}>
                                      <List sx={{ paddingBottom: "0px" }}>
                                        <Typography
                                          color="#195DCC"
                                          fontSize="12px"
                                          fontWeight="400"
                                          mb={1}
                                        >
                                          Total Years of Experience
                                        </Typography>

                                        <ListItem
                                          sx={{
                                            p: 0,
                                            justifyContent: "space-between",
                                          }}
                                        >
                                          <ListItemText
                                            primary={
                                              <Typography
                                                sx={{
                                                  fontWeight: "400",
                                                  fontSize: "12px",
                                                  width: "20px"
                                                }}
                                              >
                                                Lower
                                              </Typography>
                                            }
                                          />
                                          <ListItemText
                                            primary={
                                              <Typography
                                                sx={{
                                                  fontWeight: "400",
                                                  fontSize: "12px",
                                                  textAlign: "left",
                                                }}
                                              >
                                                : {expComparisons.lower}
                                              </Typography>
                                            }
                                          />
                                        </ListItem>
                                        <ListItem
                                          sx={{
                                            p: 0,
                                            justifyContent: "space-between",
                                          }}
                                        >
                                          <ListItemText
                                            primary={
                                              <Typography
                                                sx={{
                                                  fontWeight: "400",
                                                  fontSize: "12px",
                                                  width: "20px"
                                                }}
                                              >
                                                Same
                                              </Typography>
                                            }
                                          />
                                          <ListItemText
                                            primary={
                                              <Typography
                                                sx={{
                                                  fontWeight: "400",
                                                  fontSize: "12px",
                                                  textAlign: "left",
                                                }}
                                              >
                                                : {expComparisons.same}
                                              </Typography>
                                            }
                                          />
                                        </ListItem>
                                        <ListItem
                                          sx={{
                                            p: 0,
                                            justifyContent: "space-between",
                                          }}
                                        >
                                          <ListItemText
                                            primary={
                                              <Typography
                                                sx={{
                                                  fontWeight: "400",
                                                  fontSize: "12px",
                                                  width: '20px'
                                                }}
                                              >
                                                Higher
                                              </Typography>
                                            }
                                          />
                                          <ListItemText
                                            primary={
                                              <Typography
                                                sx={{
                                                  fontWeight: "400",
                                                  fontSize: "12px",
                                                  textAlign: "left",
                                                }}
                                              >
                                                : {expComparisons.higher}
                                              </Typography>
                                            }
                                          />
                                        </ListItem>
                                      </List>
                                    </Grid>
                                  )}

                                  {Object.keys(salaryComparisons).length >
                                    0 && (
                                    <Grid item xs={5} md={5}>
                                      <List sx={{ paddingBottom: "0px" }}>
                                        <Typography
                                          color="#195DCC"
                                          fontSize="12px"
                                          fontWeight="400"
                                          mb={1}
                                        >
                                          Expected Salary
                                        </Typography>

                                        <ListItem
                                          sx={{
                                            p: 0,
                                            justifyContent: "space-between",
                                          }}
                                        >
                                          <ListItemText
                                            primary={
                                              <Typography
                                                sx={{
                                                  fontWeight: "400",
                                                  fontSize: "12px",
                                                  width: '20px'
                                                }}
                                              >
                                                Lower
                                              </Typography>
                                            }
                                          />
                                          <ListItemText
                                            primary={
                                              <Typography
                                                sx={{
                                                  fontWeight: "400",
                                                  fontSize: "12px",
                                                  textAlign: "left",
                                                }}
                                              >
                                                : {data.comparisons.salary ? salaryComparisons.lower : '_' }
                                              </Typography>
                                            }
                                          />
                                        </ListItem>
                                        <ListItem
                                          sx={{
                                            p: 0,
                                            justifyContent: "space-between",
                                          }}
                                        >
                                          <ListItemText
                                            primary={
                                              <Typography
                                                sx={{
                                                  fontWeight: "400",
                                                  fontSize: "12px",
                                                  width: '20px'
                                                }}
                                              >
                                                Same
                                              </Typography>
                                            }
                                          />
                                          <ListItemText
                                            primary={
                                              <Typography
                                                sx={{
                                                  fontWeight: "400",
                                                  fontSize: "12px",
                                                  textAlign: "left",
                                                }}
                                              >
                                                : {data.comparisons.salary ? salaryComparisons.same : '_'}
                                              </Typography>
                                            }
                                          />
                                        </ListItem>
                                        <ListItem
                                          sx={{
                                            p: 0,
                                            justifyContent: "space-between",
                                          }}
                                        >
                                          <ListItemText
                                            primary={
                                              <Typography
                                                  sx={{
                                                    fontWeight: "400",
                                                    fontSize: "12px",
                                                    width: '20px'
                                                  }}
                                              >
                                                Higher
                                              </Typography>
                                            }
                                          />
                                          <ListItemText
                                            primary={
                                              <Typography
                                                sx={{
                                                  fontWeight: "400",
                                                  fontSize: "12px",
                                                  textAlign: "left",
                                                }}
                                              >
                                                : {data.comparisons.salary ? salaryComparisons.higher : '_'}
                                              </Typography>
                                            }
                                          />
                                        </ListItem>
                                      </List>
                                    </Grid>
                                  )}
                                </Grid>

                                {!data?.comparisons?.salary ?
                                  <Typography
                                      fontSize="10px"
                                      my={1}
                                      color="error"
                                      component="span"
                                  >
                                    Fill the salary at Job Preference to compare with other applicants.
                                  </Typography> : null
                                }
                              </Stack>
                            </Paper>
                          </Popover>
                        </Fragment>
                      )}
                    </Box>
                  </Stack>
                )}

                <Stack direction="row" alignItems="center" spacing={1}>
                  <DonutLargeIcon sx={{ color: "#A1A1A1", fontSize: "1rem" }} />
                  <Typography
                    sx={{
                      color: "#A1A1A1",
                      fontSize: "12px",
                      fontWeight: "400",
                    }}
                  >
                    {data?.state ?? "Applicant"}
                  </Typography>
                </Stack>
              </Stack>

              <Stack display="flex" justifyContent="center" alignItems="center">
                {data.company_logo ? (
                  <Avatar
                    alt={data.company_name}
                    src={`${data.company_logo ?? null}`}
                    sx={{
                      width: 80,
                      height: 80,
                      border: "1.5px solid #A1A1A1",
                    }}
                  />
                ) : (
                  <Avatar
                    sx={{
                      width: 80,
                      height: 80,
                      border: "1.5px solid #A1A1A1",
                    }}
                  >
                    {data.company_name}
                  </Avatar>
                )}
              </Stack>
            </Stack>
            <Stack>
              <Typography fontSize="11px" fontWeight="400" color="#A1A1A1">
                Applied on {data.applied_at}&nbsp;
                {data.expired ? <Typography fontSize="11px" fontWeight="400" color="error" variant="span">(Expired)</Typography> : null}
              </Typography>
            </Stack>
          </Stack>
        </Box>
      )}
    </Fragment>
  );
};

export default AppliedJobCard;