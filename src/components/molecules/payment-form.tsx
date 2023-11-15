"use client";

import { RadioGroup } from "@radix-ui/react-radio-group";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
  Icons,
  Input,
  Label,
  RadioGroupItem,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  toast,
} from "../ui";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { PaymentFormSchema } from "@/utils/validations/payment-form.schema";
import { useEffect, useRef } from "react";
import { apiConfig } from "@/utils/config";
import ResponseCPISessionStore from "@/store/response-cpi-session.store";

export function PaymentForm() {
  const krAuthenticateRef = useRef<any>(null);
  const {
    operationSessionId,
    setOperationSessionId,
    setOperationUrl,
    setSessionResponse,
    setResponseAutheticate,
  } = ResponseCPISessionStore();

  const form = useForm<z.infer<typeof PaymentFormSchema>>({
    resolver: zodResolver(PaymentFormSchema),
    defaultValues: {
      amount: "3456",
      currency: "PEN",
      transactionCategory: "PAYMENT",
      productType: "GOODS_OR_SERVICE_PURCHASE",
      merchant: {
        mid: "4075564",
      },
      paymentForm: {
        pan: "4111111111111111",
        expiryMonth: "05",
        expiryYear: "26",
        networkPreference: "MASTERCARD",
      },
      protocolRequest: {
        name: "THREEDS",
        version: "2",
        challengePreference: "NO_PREFERENCE",
      },
      ianTargetUrl: "https://8757-170-82-98-224.ngrok-free.app/api/auth",
    },
  });

  /**
   *  buildOverlay
   */

  const buildOverlay = () => {
    let overlay = document.createElement("div");
    overlay.setAttribute("id", "overlay");
    overlay.style.backgroundColor = "#D3D3D3";
    overlay.style.height = "100%";
    overlay.style.position = "absolute";
    overlay.style.top = "0";
    overlay.style.opacity = "0.90";
    overlay.style.width = "100%";
    overlay.classList.add(
      "d-flex",
      "justify-content-center",
      "flex-column",
      "align-items-center"
    );

    let spinner = document.createElement("div");
    spinner.classList.add("spinner-border", "text-primary");
    spinner.setAttribute("role", "status");

    let span = document.createElement("span");
    span.classList.add("sr-only");
    span.innerText = "Loading...";

    spinner.appendChild(span);
    overlay.appendChild(spinner);

    return overlay;
  };

  /**
   * Crear Session
   * @param data
   * @returns
   */
  async function onSubmit(data: z.infer<typeof PaymentFormSchema>) {
    try {
      const res = await apiConfig.post(
        "/PCI/Authentication/CreateSession",
        data
      );

      setOperationSessionId(res.data.answer.operationSessionId);
      setOperationUrl(res.data.answer.operationUrl);

      const overlay = buildOverlay();
      document.body.appendChild(overlay);

      if (krAuthenticateRef.current) {
        krAuthenticateRef.current.authenticate(
          res.data.answer.operationUrl,
          (result: any) => {
            document.getElementById("overlay")?.remove();

            /**
             * 3DS
             */

            setResponseAutheticate(result);
          }
        );
      }
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * Initialize Kr-Authenticate
   */
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://static.micuentaweb.pe/static/js/authenticate-client/V1.0/kr-authenticate.umd.js";
    script.async = true;
    script.onload = () => {
      const publicKey = `${process.env.NEXT_PUBLIC_IZIPAY_USER}:${process.env.NEXT_PUBLIC_KR_PUBLIC_KEY}`;

      const krAuthInstance = new window.KrAuthenticate(publicKey);

      krAuthenticateRef.current = krAuthInstance;
      /* krAuthInstance?.authenticate(operationUrl, () => {
        console.log("Authentication completed");
      });  */
    };
    document.head.appendChild(script);
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment Method</CardTitle>
        <CardDescription>
          Add a new payment method to your account.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <RadioGroup defaultValue="card" className="grid grid-cols-3 gap-4">
          <div>
            <RadioGroupItem value="card" id="card" className="peer sr-only" />
            <Label
              htmlFor="card"
              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="mb-3 h-6 w-6"
              >
                <rect width="20" height="14" x="2" y="5" rx="2" />
                <path d="M2 10h20" />
              </svg>
              Card
            </Label>
          </div>
          <div>
            <RadioGroupItem
              value="paypal"
              id="paypal"
              className="peer sr-only"
            />
            <Label
              htmlFor="paypal"
              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
            >
              <Icons.paypal className="mb-3 h-6 w-6" />
              Paypal
            </Label>
          </div>
          <div>
            <RadioGroupItem value="apple" id="apple" className="peer sr-only" />
            <Label
              htmlFor="apple"
              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
            >
              <Icons.apple className="mb-3 h-6 w-6" />
              Apple
            </Label>
          </div>
        </RadioGroup>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-2 gap-2">
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <Label>Amount</Label>
                    <Input
                      type="text"
                      id="amount"
                      placeholder="345"
                      {...field}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="merchant.mid"
                render={({ field }) => (
                  <FormItem>
                    <Label>Merchant</Label>
                    <Input
                      id="merchant"
                      placeholder="4075564"
                      {...field}
                      value={field.value}
                    />

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <FormField
                control={form.control}
                name="transactionCategory"
                render={({ field }) => (
                  <FormItem>
                    <Label>Transaction Category</Label>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a transaction category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="PAYMENT">Payment</SelectItem>
                        <SelectItem value="REFUND">Refund</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="productType"
                render={({ field }) => (
                  <FormItem>
                    <Label>Product Type</Label>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a product type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="GOODS_OR_SERVICE_PURCHASE">
                          Goods or Service Purchase
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="paymentForm.pan"
                render={({ field }) => (
                  <FormItem>
                    <Label>Card Number</Label>
                    <Input
                      id="paymentForm.pan"
                      placeholder="4111111111111111"
                      {...field}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="paymentForm.expiryMonth"
                render={({ field }) => (
                  <FormItem>
                    <Label>Expires Month</Label>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Month" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="01">January</SelectItem>
                        <SelectItem value="02">February</SelectItem>
                        <SelectItem value="03">March</SelectItem>
                        <SelectItem value="04">April</SelectItem>
                        <SelectItem value="05">May</SelectItem>
                        <SelectItem value="06">June</SelectItem>
                        <SelectItem value="07">July</SelectItem>
                        <SelectItem value="08">August</SelectItem>
                        <SelectItem value="09">September</SelectItem>
                        <SelectItem value="10">October</SelectItem>
                        <SelectItem value="11">November</SelectItem>
                        <SelectItem value="12">December</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="paymentForm.expiryYear"
                render={({ field }) => (
                  <FormItem>
                    <Label>Expires Year</Label>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Year" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Array.from({ length: 10 }, (_, i) => (
                          <SelectItem
                            key={i}
                            // value={`${new Date().getFullYear() + i}`}
                            value={`${String(
                              new Date().getFullYear() + i
                            ).slice(-2)}`}
                          >
                            {new Date().getFullYear() + i}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="paymentForm.networkPreference"
                render={({ field }) => (
                  <FormItem>
                    <Label>Network</Label>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a network" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="VISA">Visa</SelectItem>
                        <SelectItem value="MASTERCARD">Mastercard</SelectItem>
                        <SelectItem value="AMEX">Amex</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="protocolRequest.name"
                render={({ field }) => (
                  <FormItem>
                    <Label>Protocol Request</Label>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a protocol request" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="THREEDS">3DS</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="protocolRequest.version"
                render={({ field }) => (
                  <FormItem>
                    <Label>Version</Label>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a version" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="2">2</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="protocolRequest.challengePreference"
                render={({ field }) => (
                  <FormItem>
                    <Label>Challenge Preference</Label>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a challenge preference" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="NO_PREFERENCE">
                          No Preference
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="ianTargetUrl"
              render={({ field }) => (
                <FormItem>
                  <Label>IAN Target Url</Label>
                  <Input
                    id="ianTargetUrl"
                    placeholder="https://8757-170-82-98-224.ngrok-free.app/api/auth"
                    {...field}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* <FormField
              control={form.control}
              name="customer.email"
              render={({ field }) => (
                <FormItem>
                  <Label>Email</Label>
                  <Input
                    id="customer.email"
                    placeholder="
                    Email"
                    {...field}
                  />
                  <FormMessage />
                </FormItem>
              )}
            /> */}

            <Button type="submit" className="w-full">
              Create Session
            </Button>
          </form>
        </Form>
      </CardContent>
      {/* <CardFooter>
        <Button type="submit" className="w-full">Continue</Button>
      </CardFooter> */}
    </Card>
  );
}
