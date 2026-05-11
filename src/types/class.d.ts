export interface ClassList {
  id: string;
  name: string;
  level: string;
  department: string;
}
export interface ClassRequest {
  name: string;
  level: string;
  department: string;
}

export interface ClassRequestEdit extends ClassRequest {
  id: string;
}
