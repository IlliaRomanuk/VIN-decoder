export interface Variable {
  ID: number;
  Name: string;
  Description: string;
}

export interface VariableResponse {
  Count: number;
  Message: string;
  Results: Variable[];
}
