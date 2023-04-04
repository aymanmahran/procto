import Student from "./Student";
import Professor from "./Professor";
import User from "./User";
import { Assessment, AnswerableAssessment, MarkableAssessment, ImmutableAssessment } from "./Assessment";
import { userType } from './types';
import { AWS } from './AWS';

export { Student, User, Assessment, AnswerableAssessment, MarkableAssessment, ImmutableAssessment, Professor, userType, AWS as ProctoAPI };