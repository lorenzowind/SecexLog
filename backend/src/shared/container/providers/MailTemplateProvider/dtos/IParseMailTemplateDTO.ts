interface ITemplateVariables {
  [key: string]: string | number;
}

export default interface IParseMailTemplate {
  file: string;
  variables: ITemplateVariables;
}
