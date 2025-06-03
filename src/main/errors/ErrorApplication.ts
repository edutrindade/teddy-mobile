export interface IErrorApplicationDetail {
  name: string;
  description: string;
}

export type ErrorApplication = {
  process: string;
  message: string;
  code: number;
  detail?: IErrorApplicationDetail;
};

export const createErrorApplication = (
  process: string,
  message: string,
  code: number,
  detail?: IErrorApplicationDetail
): ErrorApplication => {
  return {
    process,
    message,
    code,
    detail,
  };
};
