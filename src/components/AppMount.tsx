import App from "../App";
import { CMSProvider } from "../context/CMSContext";
import type { AboutData, ExperienceItem, ProjectItem, SkillsData, FunData, ContactData } from "../context/CMSContext";

export default function AppMount({ about, experiences, projects, skills, fun, contact }: { about: AboutData; experiences: ExperienceItem[]; projects: ProjectItem[]; skills: SkillsData; fun: FunData; contact: ContactData }) {
    console.log("AppMount experiences:", experiences);
    return (
        <CMSProvider data={{ about, experiences, projects, skills, fun, contact }}>
        <App />
        </CMSProvider>
    );
}
