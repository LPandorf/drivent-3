import { ApplicationError } from '@/protocols';

export function paymentRequiredError(): ApplicationError {
  return {
    name: 'PaymentRequired',
    message: 'You dont have a hotel room booked and paid yet',
  };
}
