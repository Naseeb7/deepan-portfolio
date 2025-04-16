import React from "react";
import Header from "./ui/Header";
import TimelineComponent from "./ui/TimelineComponent";
import {
  educationTimeline,
  experienceTimeline,
  mySkills,
} from "@/constants/defaultState";

import ExperienceIcon from "@/assets/Experience.svg";
import EducationIcon from "@/assets/Education.svg";
import TextCard from "./ui/TextCard";

const ResumeComponent = () => {
  return (
    <div className="flex flex-col p-10">
      <Header text="Resume" />

      <div className="flex flex-col gap-11">
        <TimelineComponent
          heading="Experience"
          items={experienceTimeline}
          icon={ExperienceIcon}
        />
      </div>
      <div className="flex flex-col gap-11">
        <TimelineComponent
          heading="Education"
          items={educationTimeline}
          icon={EducationIcon}
        />
      </div>
      <div>
        <Header text="My Skills" />
        <div className="flex flex-wrap gap-3 w-full">
          {mySkills.map((item, i) => {
            return (
              <div
                key={i}
                className="flex-1 basis-[calc(50%-0.75rem)]" // 50% width minus the gap
              >
                <TextCard
                  title={item.title}
                  description={item.description}
                  showNumbering
                  number={i + 1}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ResumeComponent;
