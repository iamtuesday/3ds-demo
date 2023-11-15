// "use client";

// import { RadioGroup } from "@radix-ui/react-radio-group";
// import {
//   Button,
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormMessage,
//   Icons,
//   Input,
//   Label,
//   RadioGroupItem,
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
//   toast,
// } from "../ui";
// import { useForm } from "react-hook-form";
// import * as z from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { PaymentFormSchema } from "@/utils/validations/payment-form.schema";
// import { useEffect, useRef } from "react";
// import { apiConfig } from "@/utils/config";
// import ResponseCPISessionStore from "@/store/response-cpi-session.store";
// import { CreatePaymentFormWith3dsSchema } from "@/utils/validations/create-payment-form-with-3ds.schema";

// export function With3DSPaymentForm() {
//   const form = useForm<z.infer<typeof CreatePaymentFormWith3dsSchema>>({
//     resolver: zodResolver(CreatePaymentFormWith3dsSchema),
//     defaultValues: {
//       amount: "3456",
//       currency: "PEN",
//       paymentForms: [
//         {
//           pan: "4111111111111111",
//           expiryMonth: "12",
//           expiryYear: "25",
//           securityCode: "123",
//           paymentMethodType: "CARD",
//         },
//       ],
//       customer: {
//         email: "",
//       },
//     },
//   });

//   /**
//    * Crear Payment
//    * @param data
//    * @returns
//    */
//   async function onSubmit(
//     data: z.infer<typeof CreatePaymentFormWith3dsSchema>
//   ) {
//     try {
//       const res = await apiConfig.post(
//         "/PCI/Authentication/CreateSession",
//         data
//       );
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle>Payment Method</CardTitle>
//       </CardHeader>
//       <CardContent className="grid gap-6">
//         <RadioGroup defaultValue="card" className="grid grid-cols-3 gap-4">
//           <div>
//             <RadioGroupItem value="card" id="card" className="peer sr-only" />
//             <Label
//               htmlFor="card"
//               className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
//             >
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 className="mb-3 h-6 w-6"
//               >
//                 <rect width="20" height="14" x="2" y="5" rx="2" />
//                 <path d="M2 10h20" />
//               </svg>
//               Card
//             </Label>
//           </div>
//           <div>
//             <RadioGroupItem
//               value="paypal"
//               id="paypal"
//               className="peer sr-only"
//             />
//             <Label
//               htmlFor="paypal"
//               className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
//             >
//               <Icons.paypal className="mb-3 h-6 w-6" />
//               Paypal
//             </Label>
//           </div>
//           <div>
//             <RadioGroupItem value="apple" id="apple" className="peer sr-only" />
//             <Label
//               htmlFor="apple"
//               className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
//             >
//               <Icons.apple className="mb-3 h-6 w-6" />
//               Apple
//             </Label>
//           </div>
//         </RadioGroup>

//         <Form {...form}>
//           <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
//             <div className="grid grid-cols-2 gap-2">
//               <FormField
//                 control={form.control}
//                 name="amount"
//                 render={({ field }) => (
//                   <FormItem>
//                     <Label>Amount</Label>
//                     <Input
//                       type="text"
//                       id="amount"
//                       placeholder="345"
//                       {...field}
//                     />
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />

//               <FormField


//             </div>

//               <FormField
//                 control={form.control}
//                 name="paymentForm.expiryMonth"
//                 render={({ field }) => (
//                   <FormItem>
//                     <Label>Expires Month</Label>
//                     <Select
//                       onValueChange={field.onChange}
//                       defaultValue={field.value}
//                     >
//                       <FormControl>
//                         <SelectTrigger>
//                           <SelectValue placeholder="Month" />
//                         </SelectTrigger>
//                       </FormControl>
//                       <SelectContent>
//                         <SelectItem value="01">January</SelectItem>
//                         <SelectItem value="02">February</SelectItem>
//                         <SelectItem value="03">March</SelectItem>
//                         <SelectItem value="04">April</SelectItem>
//                         <SelectItem value="05">May</SelectItem>
//                         <SelectItem value="06">June</SelectItem>
//                         <SelectItem value="07">July</SelectItem>
//                         <SelectItem value="08">August</SelectItem>
//                         <SelectItem value="09">September</SelectItem>
//                         <SelectItem value="10">October</SelectItem>
//                         <SelectItem value="11">November</SelectItem>
//                         <SelectItem value="12">December</SelectItem>
//                       </SelectContent>
//                     </Select>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />

//               <FormField
//                 control={form.control}
//                 name="paymentForm.expiryYear"
//                 render={({ field }) => (
//                   <FormItem>
//                     <Label>Expires Year</Label>
//                     <Select
//                       onValueChange={field.onChange}
//                       defaultValue={field.value}
//                     >
//                       <FormControl>
//                         <SelectTrigger>
//                           <SelectValue placeholder="Year" />
//                         </SelectTrigger>
//                       </FormControl>
//                       <SelectContent>
//                         {Array.from({ length: 10 }, (_, i) => (
//                           <SelectItem
//                             key={i}
//                             // value={`${new Date().getFullYear() + i}`}
//                             value={`${String(
//                               new Date().getFullYear() + i
//                             ).slice(-2)}`}
//                           >
//                             {new Date().getFullYear() + i}
//                           </SelectItem>
//                         ))}
//                       </SelectContent>
//                     </Select>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />

//               <FormField
//                 control={form.control}
//                 name="paymentForm.networkPreference"
//                 render={({ field }) => (
//                   <FormItem>
//                     <Label>Network</Label>
//                     <Select
//                       onValueChange={field.onChange}
//                       defaultValue={field.value}
//                     >
//                       <FormControl>
//                         <SelectTrigger>
//                           <SelectValue placeholder="Select a network" />
//                         </SelectTrigger>
//                       </FormControl>
//                       <SelectContent>
//                         <SelectItem value="VISA">Visa</SelectItem>
//                         <SelectItem value="MASTERCARD">Mastercard</SelectItem>
//                         <SelectItem value="AMEX">Amex</SelectItem>
//                       </SelectContent>
//                     </Select>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//             </div>

//             <div className="grid grid-cols-2 gap-4">
//               <FormField
//                 control={form.control}
//                 name="protocolRequest.name"
//                 render={({ field }) => (
//                   <FormItem>
//                     <Label>Protocol Request</Label>
//                     <Select
//                       onValueChange={field.onChange}
//                       defaultValue={field.value}
//                     >
//                       <FormControl>
//                         <SelectTrigger>
//                           <SelectValue placeholder="Select a protocol request" />
//                         </SelectTrigger>
//                       </FormControl>
//                       <SelectContent>
//                         <SelectItem value="THREEDS">3DS</SelectItem>
//                       </SelectContent>
//                     </Select>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />

//               <FormField
//                 control={form.control}
//                 name="protocolRequest.version"
//                 render={({ field }) => (
//                   <FormItem>
//                     <Label>Version</Label>
//                     <Select
//                       onValueChange={field.onChange}
//                       defaultValue={field.value}
//                     >
//                       <FormControl>
//                         <SelectTrigger>
//                           <SelectValue placeholder="Select a version" />
//                         </SelectTrigger>
//                       </FormControl>
//                       <SelectContent>
//                         <SelectItem value="2">2</SelectItem>
//                       </SelectContent>
//                     </Select>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />

//               <FormField
//                 control={form.control}
//                 name="protocolRequest.challengePreference"
//                 render={({ field }) => (
//                   <FormItem>
//                     <Label>Challenge Preference</Label>
//                     <Select
//                       onValueChange={field.onChange}
//                       defaultValue={field.value}
//                     >
//                       <FormControl>
//                         <SelectTrigger>
//                           <SelectValue placeholder="Select a challenge preference" />
//                         </SelectTrigger>
//                       </FormControl>
//                       <SelectContent>
//                         <SelectItem value="NO_PREFERENCE">
//                           No Preference
//                         </SelectItem>
//                       </SelectContent>
//                     </Select>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//             </div>

//             <FormField
//               control={form.control}
//               name="ianTargetUrl"
//               render={({ field }) => (
//                 <FormItem>
//                   <Label>IAN Target Url</Label>
//                   <Input
//                     id="ianTargetUrl"
//                     placeholder="https://8757-170-82-98-224.ngrok-free.app/api/auth"
//                     {...field}
//                   />
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             {/* <FormField
//               control={form.control}
//               name="customer.email"
//               render={({ field }) => (
//                 <FormItem>
//                   <Label>Email</Label>
//                   <Input
//                     id="customer.email"
//                     placeholder="
//                     Email"
//                     {...field}
//                   />
//                   <FormMessage />
//                 </FormItem>
//               )}
//             /> */}

//             <Button type="submit" className="w-full">
//               Create Session
//             </Button>
//           </form>
//         </Form>
//       </CardContent>
//       {/* <CardFooter>
//         <Button type="submit" className="w-full">Continue</Button>
//       </CardFooter> */}
//     </Card>
//   );
// }
