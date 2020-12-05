import IQuiz from "./IQuiz";

export default interface IWorkSheet{
    id:number,
    name:string,
    date:string,
    quiz:IQuiz[]
}
