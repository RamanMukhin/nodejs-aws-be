// import { mocked } from 'ts-jest/utils';
// import { Handler } from 'aws-lambda';

// import { middyfy } from '@libs/lambda';
// import { products } from '../../productsRange/products';
// import { getReasonPhrase, StatusCodes } from 'http-status-codes';

// jest.mock('@libs/lambda');

// describe('getProductList', () => {
//   let main;
//   let mockedMiddyfy: jest.MockedFunction<typeof middyfy>;

//   beforeEach(async () => {
//     mockedMiddyfy = mocked(middyfy);
//     mockedMiddyfy.mockImplementation((handler: Handler) => {
//       return handler as never;
//     });

//     main = (await import('./handler')).main;
//   });

//   afterEach(() => {
//     jest.resetModules();
//   });

//   it('should return product by ID', async () => {
//     const testId = "333w3ec4b-b10c-48c5-9345-fc73c48a80a2";
//     const testProduct = products.find((product) => product.id === testId);
//     const equalValue = JSON.stringify(testProduct ? testProduct : { message: getReasonPhrase(StatusCodes.NOT_FOUND) });
//     const statusCode = testProduct ? StatusCodes.OK : StatusCodes.NOT_FOUND;

//     const event = {
//       body: {},
//       pathParameters: {
//         productId: testId,
//       }
//     };

//     const actual = await main(event);

//     expect(actual.body).toEqual(equalValue);
//     expect(actual.statusCode).toEqual(statusCode);
//   });

// });
