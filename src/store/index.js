import {configureStore} from "@reduxjs/toolkit";
import {authReducer} from "./slices/auth.slice";
import {languageReducer} from "./slices/language.slice";
import {employerTypReducer} from "./slices/employer.type.slice";
import {employerAuthReducer} from "./slices/employer.auth.slice";
import {slideShowAdReducer} from "./slices/slide.show.ad.slice";
import {socialUrlReducer} from "./slices/social.urls.slice";
import {companyReducer} from "./slices/companies.slice";
import {testimonialReducer} from "./slices/testimonial.slice";
import {jobsReducer} from "./slices/job.slice";
import {whitelistReducer} from "./slices/whitelist.slice";
import {personalInfoReducer} from "./slices/personal.info.slice";
import messageReducer from "./slices/message.slice";
import {jobPreferenceReducer} from "./slices/job.preference.slice";
import {seekerSkillReducer} from "./slices/seeker.skill.slice";
import {seekerLanguageReducer} from "./slices/seeker.language.slice";
import {seekerExperienceReducer} from "./slices/seeker.experience.slice";
import {seekerEducationReducer} from "./slices/seeker.education.slice";
import {jobAlertReducer} from "./slices/job.alert.slice";
import {resumeReducer} from "./slices/resume.slice";
import {applyJobReducer} from "./slices/apply.job.slice";
import {userReducer} from "./slices/me.silce";
import {contactReducer} from "./slices/contact.slice";
import {seekerProfileReducer} from "./slices/seeker.profile.slice";
import {latestExperienceReducer} from "./slices/latest.exp.slice";
import {appReducer} from "./slices/app.slice";
import progressReducer from "./slices/progress";
import {seekerResetPwdReducer} from "./slices/seeker.reset.pwd.slice";
import {abilitiesReducer} from "./slices/ability.slice";
import {companyPhotoReducer} from "./slices/company.photo.slice";
import {notifyEmailReducer} from "./slices/notify.email.slice";
import { employerResetPwdReducer } from "./slices/employer.reset.pwd.slice";
import {companyVideoReducer} from "./slices/company.video.slice";
import {employerContactPersonReducer} from "./slices/employer.contact.person.slice";
import {employerPositionReducer} from "./slices/employer.position.slice";
import {companyPromotionReducer} from "./slices/company.promotion.slice";
import {recruitmentReducer} from "./slices/recruitment.slide";
import {seekerNotificationReducer} from "./slices/seeker.notification.slice";
import {employerNotificationReducer} from "./slices/employer.notification.slice";
import {applicantReducer} from "./slices/applicant.slice";
import {overseasJobsReducer} from "./slices/overseas.job.slice";

export * from "./slices/auth.slice";
export * from "./slices/language.slice";
export * from "./slices/employer.auth.slice";
export * from "./slices/employer.type.slice";
export * from "./slices/slide.show.ad.slice";
export * from "./slices/social.urls.slice";
export * from "./slices/companies.slice";
export * from "./slices/testimonial.slice";
export * from "./slices/overseas.job.slice";
export * from "./slices/job.slice";
export * from "./slices/whitelist.slice";
export * from "./slices/personal.info.slice";
export * from "./slices/job.preference.slice";
export * from "./slices/seeker.skill.slice";
export * from "./slices/seeker.language.slice";
export * from "./slices/seeker.experience.slice";
export * from "./slices/seeker.education.slice";
export * from "./slices/job.alert.slice";
export * from "./slices/resume.slice";
export * from "./slices/apply.job.slice";
export * from "./slices/me.silce";
export * from "./slices/contact.slice";
export * from "./slices/seeker.profile.slice";
export * from "./slices/latest.exp.slice";
export * from "./slices/app.slice";
export * from "./slices/seeker.reset.pwd.slice";
export * from "./slices/ability.slice";
export * from "./slices/company.photo.slice";
export * from "./slices/company.video.slice";
export * from "./slices/company.promotion.slice"
export * from "./slices/notify.email.slice";
export * from "./slices/employer.reset.pwd.slice";
export * from './slices/employer.contact.person.slice';
export * from './slices/employer.position.slice';
export * from "./slices/recruitment.slide";
export * from "./slices/seeker.notification.slice";
export * from "./slices/employer.notification.slice";
export * from "./slices/applicant.slice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        app: appReducer,
        languages: languageReducer,
        empAuth: employerAuthReducer,
        employer_types: employerTypReducer,
        employer_contact_persons: employerContactPersonReducer,
        employer_positions: employerPositionReducer,
        slide_show_ads: slideShowAdReducer,
        social_urls: socialUrlReducer,
        companies: companyReducer,
        testimonials: testimonialReducer,
        jobs: jobsReducer,
        overseasJobs: overseasJobsReducer,
        whitelists: whitelistReducer,
        message: messageReducer,
        personal_info: personalInfoReducer,
        job_preference: jobPreferenceReducer,
        seeker_skills: seekerSkillReducer,
        seeker_languages: seekerLanguageReducer,
        seeker_experiences: seekerExperienceReducer,
        seeker_educations: seekerEducationReducer,
        job_alert: jobAlertReducer,
        resume: resumeReducer,
        apply_job: applyJobReducer,
        me: userReducer,
        contact: contactReducer,
        notifyEmail: notifyEmailReducer,
        seeker_profile: seekerProfileReducer,
        latest_experience: latestExperienceReducer,
        progress: progressReducer,
        seeker_rest_pwd: seekerResetPwdReducer,
        abilities: abilitiesReducer,
        companyPhotos: companyPhotoReducer,
        companyVideos: companyVideoReducer,
        companyPromotions: companyPromotionReducer,
        employer_rest_pwd: employerResetPwdReducer,
        recruitment: recruitmentReducer,
        seeker_notifications: seekerNotificationReducer,
        employer_notifications: employerNotificationReducer,
        applicants: applicantReducer
    },
    devTools: process.env.NODE_ENV !== "production"
});
