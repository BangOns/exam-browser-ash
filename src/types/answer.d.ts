export interface AnswerRequest {
  answers: AnswerProps[];
}

interface AnswerProps {
  question_id: string;
  answer: string;
}
