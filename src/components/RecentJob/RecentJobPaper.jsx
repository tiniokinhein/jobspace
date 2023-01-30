import React from "react";
import {
  styled,
  Box,
  Button,
  Card,
  Avatar,
  Link,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import Logo from "../../assets/images/logo.svg";
import UrgentIcon from "./UrgentIcon";
import PremiumIcon from "./PremiumIcon";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import BasicSalaryIcon from "../../assets/icons/BasicSalary.png";
import { helper } from "../../helpers";
import { useSelector } from "react-redux";
import LocationIcon from "../../assets/icons/Location.png";

const StyledBtn = styled(Button)(() => ({
  width: "120px",
  borderRadius: "7px",
  background: "linear-gradient(274.94deg, #FF9635 -12.35%, #FFD15C 116.67%)",
}));

const RecentJobPaper = ({ recentJob }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { isEmpLoggedIn } = useSelector((state) => state.empAuth);

  const handleClick = (uuid) => {
    navigate(`/jobs/${uuid}/detail`);
  };

  return (
    <Paper
      variant="outlined"
      sx={{
        p: { xs: 0, sm: "20px" },
        width: "100%",
        minHeight: "152px",
        maxHeight: "300px",
        borderRadius: "7px",
        border: recentJob.is_highlight
          ? "0.5px solid #8ED8F8"
          : "0.5px solid #EBEBEB",
        backgroundColor: recentJob.is_highlight ? "#8ED8F8" : "white",
        boxShadow: recentJob.is_highlight ? 5 : 0,
        '&:hover': {
            boxShadow: recentJob.is_highlight ? 9 : 5
        }
      }}
      direction="column"
      justifyContent="center"
      component={Box}
    >
      <Stack
        direction="row"
        spacing={3}
        width="100%"
        sx={{ py: { xs: "20px", sm: 0 } }}
      >
        <Box
          alignItems="flex-start"
          display={{ xs: "none", sm: "flex" }}
          width={{ md: "20%", xl: "15%" }}
          justifyContent="center"
        >
          <Card
            elevation={0}
            sx={{
              width: { xl: "100%", lg: "100%" },
              maxWidth: { xl: "100%", lg: "100%" },
              background: "transparent",
            }}
          >
            <Avatar
              sx={{
                background: "#FFFFFF",
                width: "100px",
                height: "100px",
                borderRadius: "4px",
                mt: 0.7
              }}
              variant="square"
              src={recentJob.company_logo ? recentJob.company_logo : Logo}
            />
          </Card>
        </Box>
        <Stack spacing={1.2} width={{ xs: "85%", md: "80%", xl: "85%" }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={2}
            width="100%"
          >
            <Typography
              fontWeight={500}
              noWrap
              width="60%"
              align="left"
              fontSize="18px"
            >
              <Link
                to={`/jobs/${recentJob.uuid}/detail`}
                component={RouterLink}
                underline="hover"
                color="inherit"
              >
                {recentJob.job_title}
              </Link>
            </Typography>

            <UrgentIcon isUrgent={recentJob.is_urgent ?? false} />

            <PremiumIcon isPremium={recentJob.is_premium ?? false} />
          </Stack>
          <Stack
            direction={{ xs: "column", md: "row" }}
            justifyContent="space-between"
            spacing={2}
          >
            <Stack direction="column" spacing={1}>
              {recentJob.company_name && (
                <Link
                  to={`/companies/${recentJob.company_uuid}/details`}
                  underline="hover"
                  color="secondary"
                  component={RouterLink}
                >
                  <Typography
                    fontSize={{ xs: "12px", sm: "16px" }}
                    fontWeight={400}
                  >
                    {recentJob.company_name}
                  </Typography>
                </Link>
              )}

              {recentJob.company_region && recentJob.company_township && (
                <Stack direction="row" spacing={1}>
                  <img
                    src={LocationIcon}
                    alt="industry"
                    width="20"
                    height="20"
                  />
                  <Typography fontSize="14px" color="#525252" fontWeight={300}>
                    {`${recentJob.company_region} | ${recentJob.company_township}`}
                  </Typography>
                </Stack>
              )}

              <Stack direction="row" spacing={1}>
                <img
                  src={BasicSalaryIcon}
                  alt="industry"
                  width="20"
                  height="20"
                />
                {(isLoggedIn || isEmpLoggedIn) ? (
                  recentJob.salary_type === 1 ? (
                    <Typography
                      variant="span"
                      fontSize="14px"
                      color="#525252"
                      fontWeight={300}
                    >
                      Negotiate
                    </Typography>
                  ) : recentJob.salary_type === 2 ? (
                    <Typography
                      variant="span"
                      fontSize="14px"
                      color="#525252"
                      fontWeight={300}
                    >
                      Confidential
                    </Typography>
                  ) : (
                    <Typography
                      variant="span"
                      fontSize="14px"
                      color="#525252"
                      fontWeight={300}
                      sx={{ lineBreak: "anywhere" }}
                    >
                      {helper.nFormat(recentJob.min_salary ?? "")}&nbsp;-&nbsp;
                      {helper.nFormat(recentJob.max_salary ?? "")}
                      &nbsp;{recentJob.currency}
                    </Typography>
                  )
                ) : (
                  <Typography variant="span" fontSize="14px">
                    <Link
                      underline="hover"
                      component={RouterLink}
                      to="/seekers/sign-in"
                      color="secondary"
                      fontWeight={300}
                    >
                      Login to View
                    </Link>
                  </Typography>
                )}
              </Stack>
            </Stack>
            <Stack justifyContent="center" alignItems="flex-end" spacing={2}>
              <StyledBtn
                disabled={recentJob.is_applied}
                variant="contained"
                onClick={() => handleClick(recentJob.uuid)}
              >
                {recentJob.is_applied ? t("applied") : t("apply")}
              </StyledBtn>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default RecentJobPaper;