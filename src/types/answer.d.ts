export interface AnswerRequest {
  answer: AnswerProps[];
}

interface AnswerProps {
  question_id: string;
  answer: string;
}
