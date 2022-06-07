import { TruncatePipe } from './truncate.pipe';

describe('TruncatePipe', () =>
{
    let expectedResult;
    let returnedResult;
    let pipe: TruncatePipe;
    beforeEach(function ()
    {
        expectedResult = undefined;
        returnedResult = undefined;
        pipe = new TruncatePipe();
    });

    it('create an instance', () =>
    {
        expect(pipe).toBeTruthy();
    });

    it('should return nothing when empty string', () =>
    {
        const str = '';
        expectedResult = 0;
        returnedResult = pipe.transform(str, ['20']);
        expect(returnedResult.length).toBe(expectedResult);
    });

    it('should truncate by 20 characters', () =>
    {
        const str = 'A travers mes 3 expériences, en tant que freelance';
        expectedResult = 20;
        returnedResult = pipe.transform(str, ['20', '']);
        expect(returnedResult.length).toBe(expectedResult);
    });

    it('should truncate by 20 characters and add "..."', () =>
    {
        const str = 'A travers mes 3 expériences, en tant que freelance';
        expectedResult = 20;
        returnedResult = pipe.transform(str, ['20']);
        expect(returnedResult.length).toBe(expectedResult + 3);
    });

});
