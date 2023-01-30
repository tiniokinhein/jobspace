import React, { lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { SeekerPrivateRoute } from "./components/SeekerPrivateRoute";
import { EmployerPrivateRoute } from "./components/EmployerPrivateRoute";

const Layout = lazy(() => import('./components/Layout/Layout'))
const Home = lazy(() => import('./pages/Home'))
const SeekerDashboard = lazy(() =>
  import("./pages/seeker/dashboard/SeekerDashboard")
);
const Jobs = lazy(() => import("./pages/public/Jobs"));
// const OverseasJobs = lazy(() => import("./pages/public/OverseasJobs"));
const AboutUs = lazy(() => import("./pages/public/AboutUs"));
const ContactUs = lazy(() => import("./pages/public/ContactUs"));
const Testimonials = lazy(() => import("./pages/public/Testimonials"));
const NewsAndEvents = lazy(() => import("./pages/public/NewsAndEvents"));
const FAQ = lazy(() => import("./pages/public/FAQ"));
const PrivacyAndPolicy = lazy(() => import("./pages/public/PrivacyAndPolicy"));
const TermsOfService = lazy(() => import("./pages/public/TermsOfService"));
const PartnersNetwork = lazy(() => import("./pages/public/PartnersNetwork"));
const NewAndEventDetails = lazy(() =>
  import("./components/Home/NewAndEventDetails")
);
const CareerResourceCategory = lazy(() =>
  import("./pages/public/CareerResourceCategory")
);
const CareerResourceList = lazy(() =>
  import("./pages/public/CareerResourceList")
);
const AllTopIndustries = lazy(() =>
  import("./components/Home/AllTopIndustries")
);
const Companies = lazy(() => import("./components/Home/Companies"));
const CompanyView = lazy(() => import("./pages/CompanyView"));
const JobDetails = lazy(() => import("./pages/public/JobDetail"));
const NotFound = lazy(() => import("./pages/error/NotFound"));
const JobApply = lazy(() => import("./pages/seeker/JobApply"));
const AccountHome = lazy(() => import("./pages/seeker/dashboard/AccountHome"));
const SeekerProfile = lazy(() =>
  import("./pages/seeker/dashboard/SeekerProfile")
);
const SeekerLayout = lazy(() => import("./components/Layout/SeekerLayout"));
const SeekerJobPreference = lazy(() =>
  import("./pages/seeker/dashboard/SeekerJobPreference")
);
const CompanyInformation = lazy(() =>
  import("./pages/employer/Info/CompanyInformation")
);
const EmployerLayout = lazy(() => import("./components/Layout/EmployerLayout"));
const SeekerSkill = lazy(() => import("./pages/seeker/dashboard/SeekerSkill"));
const SeekerLanguage = lazy(() =>
  import("./pages/seeker/dashboard/SeekerLanguage")
);
const SeekerExperience = lazy(() =>
  import("./pages/seeker/dashboard/experience/SeekerExperience")
);
const SeekerExperienceEdit = lazy(() =>
  import("./pages/seeker/dashboard/experience/SeekerExperienceEdit")
);
const SeekerExperienceCreate = lazy(() =>
  import("./pages/seeker/dashboard/experience/SeekerExperienceCreate")
);
const SeekerEduction = lazy(() =>
  import("./pages/seeker/dashboard/education/SeekerEduction")
);
const SeekerEducationEdit = lazy(() =>
  import("./pages/seeker/dashboard/education/SeekerEducationEdit")
);
const SeekerEductionCreate = lazy(() =>
  import("./pages/seeker/dashboard/education/SeekerEductionCreate")
);
const JobAlert = lazy(() => import("./pages/seeker/dashboard/JobAlert"));
const UploadCV = lazy(() => import("./pages/seeker/dashboard/UploadCV"));
const BusinessSubscription = lazy(() =>
  import("./pages/public/BusinessSubscription")
);
const EmployerEmailToResetPassword = lazy(() =>
  import("./pages/auth/EmployerEmailToResetPassword")
);
const EmployerResetPassword = lazy(() =>
  import("./pages/auth/EmployerResetPassword")
);
const SeekerResetPassword = lazy(() =>
  import("./pages/auth/SeekerResetPassword")
);
const SeekerEmailToResetPassword = lazy(() =>
  import("./pages/auth/SeekerEmailToResetPassword")
);
const ComingSoon = lazy(() => import("./pages/public/ComingSoon"));
const AccountSetting = lazy(() =>
  import("./pages/seeker/dashboard/AccountSetting")
);
const SeekerSkillCreate = lazy(() =>
  import("./components/Seeker/Skills/SeekerSkillCreate")
);
const SeekerLanguageCreate = lazy(() =>
  import("./components/Seeker/Languages/SeekerLanguageCreate")
);
const SeekerJobPreferenceCreate = lazy(() =>
  import("./pages/seeker/dashboard/SeekerJobPreferenceCreate")
);
const SeekerProfileCreate = lazy(() =>
  import("./pages/seeker/dashboard/SeekerProfileCreate")
);
const SeekerAppliedJobsList = lazy(() =>
  import("./pages/seeker/dashboard/AppliedJobs")
);
const SeekerSignInPage = lazy(() =>
  import("./pages/auth/seeker/SeekerSignInPage")
);
const SeekerSignUpPage = lazy(() =>
  import("./pages/auth/seeker/SeekerSignUpPage")
);
const EmployerSignInPage = lazy(() =>
  import("./pages/auth/employer/EmployerSignInPage")
);
const EmployerSingUpPage = lazy(() =>
  import("./pages/auth/employer/EmployerSingUpPage")
);
const GoogleLogin = lazy(() => import("./components/Auth/GoogleLogin"));
const FacebookLogin = lazy(() => import("./components/Auth/FacebookLogin"));
const LinkedInLogin = lazy(() => import("./components/Auth/LinkedInLogin"));
const AccountInfo = lazy(() => import("./pages/employer/AccountInfo"));
const CompanyInfoForm = lazy(() =>
  import("./components/Employer/CompanyInfo/CompanyInfoForm")
);
const PostJob = lazy(() => import("./pages/employer/PostJob/PostJob"));
const PostedJobPage = lazy(() =>
  import("./pages/employer/PostedJob/PostedJobPage")
);
const PhotoPage = lazy(() => import("./pages/employer/photo/PhotoPage"));
const PhotoCreate = lazy(() => import("./pages/employer/photo/PhotoCreate"));
const VideoPage = lazy(() => import("./pages/employer/video/VideoPage"));
const VideoCreate = lazy(() => import("./pages/employer/video/VideoCreate"));
const ContactPerson = lazy(() => import("./pages/employer/ContactPerson"));
const ContactPersonEdit = lazy(() =>
  import("./pages/employer/ContactPersonEdit")
);
const PostedJobDetailPage = lazy(() =>
  import("./pages/employer/PostedJobDetail/PostedJobDetailPage")
);
const EmployerDashboard = lazy(() =>
  import("./pages/employer/EmployerDashboard")
);
const PromoteJobPost = lazy(() => import("./pages/employer/PromoteJobPost"));
const PromotionPage = lazy(() =>
  import("./pages/employer/promotion/PromotionPage")
);
const PromotionCreate = lazy(() =>
  import("./pages/employer/promotion/PromotionCreate")
);
const ProductCreate = lazy(() =>
  import("./pages/employer/promotion/ProductCreate")
);
const ApplicantProfile = lazy(() =>
  import("./pages/employer/PostedJobDetail/ApplicantProfile")
);
const ResumeView = lazy(() =>
  import("./pages/employer/PostedJobDetail/ResumeView")
);
const PostedJobEdit = lazy(() =>
  import("./pages/employer/PostedJob/JobPostEdit")
);
const JobPostDetail = lazy(() =>
  import("./pages/employer/PostedJob/JobPostDetail")
);
const EmployerAccountSetting = lazy(() =>
  import("./pages/employer/EmployerAccountSetting")
);
const Applicants = lazy(() => import("./pages/employer/applicant/Applicants"));
const ApplicantResume = lazy(() =>
  import("./pages/employer/applicant/ApplicantResume")
);
const SeekerProfileInfo = lazy(() =>
  import("./pages/employer/applicant/ApplicantProfile")
);
const GenerateCV = lazy(() => import("./pages/seeker/dashboard/GenerateCV"));
const CVDownloadFirst = lazy(() =>
  import("./pages/seeker/dashboard/CVDownloadFirst")
);
const CVDownloadSecond = lazy(() =>
  import("./pages/seeker/dashboard/CVDownloadSecond")
);
const BuyNow = lazy(() => import("./pages/employer/shopping/BuyNow"));
const Billing = lazy(() => import("./pages/employer/shopping/Billing"));
const Payment = lazy(() => import("./pages/employer/shopping/Payment"));
const ConfirmUnsubscribe = lazy(() =>
  import("./pages/public/ConfirmUnsubscribe")
);
const Whitelist = lazy(() => import("./pages/seeker/dashboard/whitelist"));

const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />

        <Route path="find-jobs" element={<Jobs />}>
          <Route path="" element={null} />
          <Route path=":jobTitle" element={null} />
          <Route path=":jobTitle/:jobCategoryId" element={null} />
          <Route
            path=":jobTitle/:jobCategoryId/:jobIndustryId"
            element={null}
          />
        </Route>

        <Route path="about-us" element={<AboutUs />} />
        <Route path="contact-us" element={<ContactUs />} />
        <Route path="testimonials" element={<Testimonials />} />
        <Route path="news-and-events" element={<NewsAndEvents />} />
        <Route path="faq" element={<FAQ />} />
        <Route path="partner-networks" element={<PartnersNetwork />} />
        <Route path="companies" element={<Companies />} />
        <Route path="company-view" element={<CompanyView />} />
        <Route path="top-industries" element={<AllTopIndustries />} />
        <Route path="/404" element={<NotFound />} />
        <Route path="career-subscription" element={<ComingSoon />} />
        <Route path="confirm-unsubscribe" element={<ConfirmUnsubscribe />} />
        <Route
          path="business-subscription"
          element={<BusinessSubscription />}
        />
        <Route path="coming-soon" element={<ComingSoon />} />
        <Route path="partner-coming-soon" element={<ComingSoon />} />
        <Route path="privacy-and-policy" element={<PrivacyAndPolicy />} />
        <Route path="terms-of-service" element={<TermsOfService />} />
        <Route path="career-resources" element={<CareerResourceCategory />} />
        <Route path="jobs/:jobId">
          <Route path="detail" element={<JobDetails />} />
          <Route
            path="apply"
            element={
              <SeekerPrivateRoute>
                <JobApply />
              </SeekerPrivateRoute>
            }
          />
        </Route>
        <Route
          path="career-resources/:catTitle/:catId/articles"
          element={<CareerResourceList />}
        />
        <Route
          path="career-resources/:articleTitle/:articleId/detail"
          element={<NewAndEventDetails />}
        />
        <Route
          path="news-and-events/:articleTitle/:articleId/detail"
          element={<NewAndEventDetails />}
        />
        <Route path="partner-networks/:articleId">
          <Route path="detail" element={<NewAndEventDetails />} />
        </Route>
        <Route path="companies/:companyId">
          <Route path="details" element={<CompanyView />} />
        </Route>

        <Route path="/seekers" element={<SeekerLayout />}>
          <Route
            path="dashboard"
            element={
              <SeekerPrivateRoute>
                <SeekerDashboard />
              </SeekerPrivateRoute>
            }
          />
          <Route
            path="account"
            element={
              <SeekerPrivateRoute>
                <AccountHome />
              </SeekerPrivateRoute>
            }
          />

          <Route
            path="profile"
            element={
              <SeekerPrivateRoute>
                <SeekerProfile />
              </SeekerPrivateRoute>
            }
          />
          <Route
            path="profile/update"
            element={
              <SeekerPrivateRoute>
                <SeekerProfileCreate />
              </SeekerPrivateRoute>
            }
          />

          <Route
            path="job-preferences"
            element={
              <SeekerPrivateRoute>
                <SeekerJobPreference />
              </SeekerPrivateRoute>
            }
          />
          <Route
            path="job-preferences/create"
            element={
              <SeekerPrivateRoute>
                <SeekerJobPreferenceCreate />
              </SeekerPrivateRoute>
            }
          />

          <Route
            path="skills"
            element={
              <SeekerPrivateRoute>
                <SeekerSkill />
              </SeekerPrivateRoute>
            }
          />
          <Route
            path="skills/create"
            element={
              <SeekerPrivateRoute>
                <SeekerSkillCreate />
              </SeekerPrivateRoute>
            }
          />

          <Route
            path="languages"
            element={
              <SeekerPrivateRoute>
                <SeekerLanguage />
              </SeekerPrivateRoute>
            }
          />
          <Route
            path="languages/create"
            element={
              <SeekerPrivateRoute>
                <SeekerLanguageCreate />
              </SeekerPrivateRoute>
            }
          />

          <Route
            path="experiences"
            element={
              <SeekerPrivateRoute>
                <SeekerExperience />
              </SeekerPrivateRoute>
            }
          />
          <Route
            path="experiences/:expId"
            element={
              <SeekerPrivateRoute>
                <SeekerExperienceEdit />
              </SeekerPrivateRoute>
            }
          />
          <Route
            path="experiences/create"
            element={
              <SeekerPrivateRoute>
                <SeekerExperienceCreate />
              </SeekerPrivateRoute>
            }
          />

          <Route
            path="educations"
            element={
              <SeekerPrivateRoute>
                <SeekerEduction />
              </SeekerPrivateRoute>
            }
          />
          <Route
            path="educations/:eduId"
            element={
              <SeekerPrivateRoute>
                <SeekerEducationEdit />
              </SeekerPrivateRoute>
            }
          />
          <Route
            path="educations/create"
            element={
              <SeekerPrivateRoute>
                <SeekerEductionCreate />
              </SeekerPrivateRoute>
            }
          />

          <Route
            path="jobs-alert"
            element={
              <SeekerPrivateRoute>
                <JobAlert />
              </SeekerPrivateRoute>
            }
          />
          <Route
            path="upload-cv"
            element={
              <SeekerPrivateRoute>
                <UploadCV />
              </SeekerPrivateRoute>
            }
          />
          <Route
            path="applied-jobs"
            element={
              <SeekerPrivateRoute>
                <SeekerAppliedJobsList />
              </SeekerPrivateRoute>
            }
          />
          <Route
            path="whitelists"
            element={
              <SeekerPrivateRoute>
                <Whitelist />
              </SeekerPrivateRoute>
            }
          />
          <Route
            path="generate-cv"
            element={
              <SeekerPrivateRoute>
                <GenerateCV />
              </SeekerPrivateRoute>
            }
          />
          <Route
            path="download-cv/first"
            element={
              <SeekerPrivateRoute>
                <CVDownloadFirst />
              </SeekerPrivateRoute>
            }
          />
          <Route
            path="download-cv/second"
            element={
              <SeekerPrivateRoute>
                <CVDownloadSecond />
              </SeekerPrivateRoute>
            }
          />
          <Route
            path="setting"
            element={
              <SeekerPrivateRoute>
                <AccountSetting />
              </SeekerPrivateRoute>
            }
          />
        </Route>

        <Route path="/employers">
          <Route path="" element={<Navigate to="/" />} />
          <Route
            path="resumes/:userId"
            element={
              <EmployerPrivateRoute>
                <ResumeView />
              </EmployerPrivateRoute>
            }
          />
          <Route
            path="posted-jobs/:postedJobId/detail"
            element={
              <EmployerPrivateRoute>
                <PostedJobDetailPage />
              </EmployerPrivateRoute>
            }
          />
          <Route
            path="posted-jobs/:jobPostId/applicants/:applicantId/profile"
            element={
              <EmployerPrivateRoute>
                <ApplicantProfile />
              </EmployerPrivateRoute>
            }
          />
          <Route
            path="posted-jobs/:jobPostId/applicants/:applicantId/resume"
            element={
              <EmployerPrivateRoute>
                <ResumeView />
              </EmployerPrivateRoute>
            }
          />
          <Route
            path="buy-now"
            element={
              <EmployerPrivateRoute>
                <BuyNow />
              </EmployerPrivateRoute>
            }
          />
          <Route
            path="billing"
            element={
              <EmployerPrivateRoute>
                <Billing />
              </EmployerPrivateRoute>
            }
          />
          <Route
            path="payment"
            element={
              <EmployerPrivateRoute>
                <Payment />
              </EmployerPrivateRoute>
            }
          />
        </Route>

        <Route path="/employers" element={<EmployerLayout />}>
          <Route
            path="company-info"
            element={
              <EmployerPrivateRoute>
                <CompanyInformation />
              </EmployerPrivateRoute>
            }
          />
          <Route
            path="company-info/update"
            element={
              <EmployerPrivateRoute>
                <CompanyInfoForm />
              </EmployerPrivateRoute>
            }
          />
          <Route
            path="account-info"
            element={
              <EmployerPrivateRoute>
                <AccountInfo />
              </EmployerPrivateRoute>
            }
          />
          <Route
            path="dashboard"
            element={
              <EmployerPrivateRoute>
                <EmployerDashboard />
              </EmployerPrivateRoute>
            }
          />
          <Route
            path="post-job"
            element={
              <EmployerPrivateRoute>
                <PostJob />
              </EmployerPrivateRoute>
            }
          />
          <Route
            path="posted-jobs/:jobPostId/promote"
            element={
              <EmployerPrivateRoute>
                <PromoteJobPost />
              </EmployerPrivateRoute>
            }
          />

          <Route
            path="posted-jobs/:jobPostId/edit"
            element={
              <EmployerPrivateRoute>
                <PostedJobEdit />
              </EmployerPrivateRoute>
            }
          />
          <Route
            path="job-posts/:jobPostId/detail"
            element={
              <EmployerPrivateRoute>
                <JobPostDetail />
              </EmployerPrivateRoute>
            }
          />

          <Route
            path="posted-jobs"
            element={
              <EmployerPrivateRoute>
                <PostedJobPage />
              </EmployerPrivateRoute>
            }
          />
          <Route
            path="photos"
            element={
              <EmployerPrivateRoute>
                <PhotoPage />
              </EmployerPrivateRoute>
            }
          />
          <Route
            path="photos/create"
            element={
              <EmployerPrivateRoute>
                <PhotoCreate />
              </EmployerPrivateRoute>
            }
          />
          <Route
            path="videos"
            element={
              <EmployerPrivateRoute>
                <VideoPage />
              </EmployerPrivateRoute>
            }
          />
          <Route
            path="videos/create"
            element={
              <EmployerPrivateRoute>
                <VideoCreate />
              </EmployerPrivateRoute>
            }
          />
          <Route
            path="promotions"
            element={
              <EmployerPrivateRoute>
                <PromotionPage />
              </EmployerPrivateRoute>
            }
          />
          <Route
            path="promotions/create"
            element={
              <EmployerPrivateRoute>
                <PromotionCreate />
              </EmployerPrivateRoute>
            }
          />
          <Route
            path="products/create"
            element={
              <EmployerPrivateRoute>
                <ProductCreate />
              </EmployerPrivateRoute>
            }
          />
          <Route
            path="contact-person"
            element={
              <EmployerPrivateRoute>
                <ContactPerson />
              </EmployerPrivateRoute>
            }
          />
          <Route
            path="contact-person/:contactPersonId"
            element={
              <EmployerPrivateRoute>
                <ContactPersonEdit />
              </EmployerPrivateRoute>
            }
          />
          <Route
            path="account-setting"
            element={
              <EmployerPrivateRoute>
                <EmployerAccountSetting />
              </EmployerPrivateRoute>
            }
          />
          <Route
            path="applicants"
            element={
              <EmployerPrivateRoute>
                <Applicants />
              </EmployerPrivateRoute>
            }
          />
          <Route
            path="applicants/:applicantId/resume"
            element={
              <EmployerPrivateRoute>
                <ApplicantResume />
              </EmployerPrivateRoute>
            }
          />
          <Route
            path="applicants/:applicantId/profile"
            element={
              <EmployerPrivateRoute>
                <SeekerProfileInfo />
              </EmployerPrivateRoute>
            }
          />
        </Route>

        <Route path="/seekers">
          <Route
            path="forgot-password"
            element={<SeekerEmailToResetPassword />}
          />
          <Route
            path="reset-password/:token"
            element={<SeekerResetPassword />}
          />
        </Route>

        <Route path="/employers">
          <Route
            path="forgot-password"
            element={<EmployerEmailToResetPassword />}
          />
          <Route
            path="reset-password/:token"
            exact
            element={<EmployerResetPassword />}
          />
        </Route>
      </Route>

      <Route path="/seekers">
        <Route path="sign-in" element={<SeekerSignInPage />} />
        <Route path="sign-up" element={<SeekerSignUpPage />} />
        <Route path="google/sign-in" element={<GoogleLogin />} />
        <Route path="facebook/sign-in" element={<FacebookLogin />} />
        <Route path="linkedin/sign-in" element={<LinkedInLogin />} />
      </Route>

      <Route path="/employers">
        <Route path="sign-in" element={<EmployerSignInPage />} />
        <Route path="sign-up" element={<EmployerSingUpPage />} />
      </Route>
      
      <Route path='*' element={<Navigate to="/404" />} />
    </Routes>
  );
};

export default Routing;
