import * as z from "zod";

export const PaymentFormSchema = z.object({
  amount: z
    .string({
      required_error: "Please enter your amount.",
    })
    .min(1),
  currency: z.enum(["PEN", "USD"], {
    required_error: "Please select a currency.",
  }),
  transactionCategory: z.enum(["PAYMENT", "REFUND"], {
    required_error: "Please select a transaction category.",
  }),
  productType: z.enum(["GOODS_OR_SERVICE_PURCHASE"], {
    required_error: "Please select a product type.",
  }),
  merchant: z.object({
    mid: z.string({
      required_error: "Please enter your MID.",
    }),
  }),
  paymentForm: z.object({
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
    networkPreference: z.enum(["VISA", "MASTERCARD", "AMEX"], {
      required_error: "Please select a network.",
    }),
  }),

  protocolRequest: z.object({
    name: z.enum(["THREEDS"], {
      required_error: "Please select a protocol request.",
    }),
    version: z.enum(["2"], {
      required_error: "Please select a version.",
    }),
    challengePreference: z.enum(["NO_PREFERENCE"], {
      required_error: "Please select a challenge preference.",
    }),
  }),
  ianTargetUrl: z.string({
    required_error: "Please enter your IAN target URL.",
  }),

  // customer: z.object({
  //   email: z.string({
  //     required_error: "Please enter your email.",
  //   }).optional(),
  // }),
});
