import { Doubt } from "./doubt";
import { Feedback } from "./feedback";

export interface UserProfile {
    id: number;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    faculty: string;
    course: string;
    feedbacks: Feedback[];
    doubts: Doubt[];
}