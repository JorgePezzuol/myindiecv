import React from "react";
import PersonalDetail from "../../components/cv/PersonalDetail";
import ProfessionalSummary from "../../components/cv/ProfessionalSummary";
import EmploymentHistory from "../../components/cv/EmploymentHistory";
import EducationHistory from "../../components/cv/EducationHistory";

const CvDataWrapper = ({ cv }) => {
  return (
    <React.Fragment>
      <PersonalDetail initialValue={cv.personalDetails} />
      <ProfessionalSummary initialValue={cv.professionalSummary} />
      <EmploymentHistory initialValue={cv.employmentList} />
      <EducationHistory initialValue={cv.educationList} />
    </React.Fragment>
  );
};

export default CvDataWrapper;
