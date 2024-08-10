// export interface QuestionProp {
//   constarints: Constarints;
//   description: string;
//   tests: Test[];
//   title: string;
// }

// export interface Constarints {
//   input: string;
// }

// export interface Test {
//   input: string;
//   output: string;
// }


export interface QuestionProp {
    tests: Test[]
    content: string
  }
  
  export interface Test {
    input: string
    output: string
  }
  