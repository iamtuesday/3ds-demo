import * as z from "zod";

export const CreatePaymentFormWith3dsSchema = z.object({
  amount: z
    .string({
      required_error: "Please enter your amount.",
    })
    .min(1),
  currency: z.enum(["PEN", "USD"], {
    required_error: "Please select a currency.",
  }),
  paymentForms: z.array(
    z.object({
      pan: z
        .string({
          required_error: "Please enter your card number.",
        })
        .min(16)
        .max(16),
      expiryMonth: z.string({
        required_error: "Please select a month.",
      }),
      expiryYear: z.string({
        required_error: "Please select a year.",
      }),
      securityCode: z.string({
        required_error: "Please enter your security code.",
      }),
      paymentMethodType: z.enum(["CARD", "AMEX", "MASTERCARD"], {
        required_error: "Please select a payment method type.",
      }),
    })
  ),
  customer: z.object({
    email: z
      .string({
        required_error: "Please enter your email.",
      })
      .optional(),
  }),
});
