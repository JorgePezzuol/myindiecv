import React from "react";
import PersonalDetail from "../../components/cv/PersonalDetail";
import ProfessionalSummary from "../../components/cv/ProfessionalSummary";
import EmploymentHistory from "../../components/cv/EmploymentHistory";
import EducationHistory from "../../components/cv/EducationHistory";
import SocialLinkList from "./SocialLinkList";
import LanguageList from "./LanguageList";
import SkillList from "./SkillList";

const CvDataWrapper = ({ cv }) => {
  return (
    <React.Fragment>
      <PersonalDetail initialValue={cv.personalDetails} />
      <ProfessionalSummary initialValue={cv.professionalSummary} />
      <EmploymentHistory initialValue={cv.employmentList} />
      <EducationHistory initialValue={cv.educationList} />
      <SocialLinkList initialValue={cv.socialLinksList} />
      <SkillList initialValue={cv.skillList} />
      <LanguageList initialValue={cv.languageList} />
    </React.Fragment>
  );
};

export default CvDataWrapper;
