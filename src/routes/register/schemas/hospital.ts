import { writable } from "svelte/store";
import { match } from "ts-pattern";
import { z } from "zod";

const HospitalFirstStep = z.object({
    hospitalName: z.string().nonempty("Hospital name cannot be empty"),
    firstName: z.string().nonempty("First name cannot be empty"),
    lastName: z.string().nonempty("Last name cannot be empty")
});


type HospitalFirstStep = z.infer<typeof HospitalFirstStep>;

const HospitalSecondStep = z.object({
    email: z.string().email("Invalid email"),
    confirmEmail: z.string().email("Invalid email"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
    confirmPassword: z.string().min(8)
}).refine(data => data.email === data.confirmEmail, {
    message: "Emails must match",
    path: ["repeatEmail"]
}).refine(data => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["repeatPassword"]
});

type HospitalSecondStep = z.infer<typeof HospitalSecondStep>;


const HospitalThirdStep = z.object({
    address: z.string().nonempty("Address cannot be empty"),
    city: z.string().nonempty("City cannot be empty"),
    country: z.string().nonempty("Country cannot be empty"),
    zipCode: z.string().nonempty("Zip code cannot be empty"),
    phoneNumber: z.string().nonempty("Phone number cannot be empty"),
});


type HospitalThirdStep = z.infer<typeof HospitalThirdStep>;


const HospitalFourthStep = z.object({
    username: z.string().nonempty("Username cannot be empty"),
});

type HospitalFourthStep = z.infer<typeof HospitalFourthStep>;




const Data = z.discriminatedUnion("step", [
    z.object({
        step: z.literal(1),
        data: HospitalFirstStep
    }),
    z.object({
        step: z.literal(2),
        data: HospitalSecondStep
    }),
    z.object({
        step: z.literal(3),
        data: HospitalThirdStep,
    }),
    z.object({
        step: z.literal(4),
        data: HospitalFourthStep
    }),
])

export type HospitalData = z.infer<typeof Data>;

export type HospitalFullData = HospitalFirstStep & HospitalSecondStep & HospitalThirdStep & HospitalFourthStep;

export const hospitalData = writable<HospitalFullData>({
    hospitalName: "",
    firstName: "",
    lastName: "",
    email: "",
    confirmEmail: "",
    password: "",
    confirmPassword: "",
    address: "",
    city: "",
    country: "",
    zipCode: "",
    phoneNumber: "+",
    username: ""
});

export function validateHospital(data: HospitalData) {
    return match(data)
        .with({ step: 1 }, (data) => HospitalFirstStep.safeParse(data))
        .with({ step: 2 }, (data) => HospitalSecondStep.safeParse(data))
        .with({ step: 3 }, (data) => HospitalThirdStep.safeParse(data))
        .with({ step: 4 }, (data) => HospitalFourthStep.safeParse(data))
        .exhaustive();
}
