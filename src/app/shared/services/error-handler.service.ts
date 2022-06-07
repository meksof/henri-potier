import { throwError } from "rxjs";

export class ErrorHandler
{
    public static Throw (err: any)
    {
        console.log(err);

        return throwError(() => new Error(err?.error?.message));
    }
}