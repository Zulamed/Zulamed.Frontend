import { match } from "ts-pattern";
import { z } from "zod";



const IndividualFirstStep = z.object({
    title: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    gender: z.string(), // probaly should be enum
    dateOfBirth: z.date()
});

export type IndividualFirstStep = z.infer<typeof IndividualFirstStep>;

const IndividualSecondStep = z.object({
    email: z.string().email(),
    password: z.string().min(8),
});


export type IndividualSecondStep = z.infer<typeof IndividualSecondStep>;

const IndividualThirdStep = z.object({
    stageInCareer: z.string(),
    profession: z.string(),
    speciality: z.string(),
    placeOfWork: z.string()
});

export type IndividualThirdStep = z.infer<typeof IndividualThirdStep>;

const IndividualFourthStep = z.object({
    country: z.string(),
    city: z.string(),
    institution: z.string(),
    department: z.string(),
});

export type IndividualFourthStep = z.infer<typeof IndividualFourthStep>;

const IndividualFifthStep = z.object({
    username: z.string(),
});

export type IndividualFifthStep = z.infer<typeof IndividualFifthStep>;

const Data = z.discriminatedUnion("step", [
    z.object({
        step: z.literal(1),
        data: IndividualFirstStep
    }),
    z.object({
        step: z.literal(2),
        data: IndividualSecondStep
    }),
    z.object({
        step: z.literal(3),
        data: IndividualThirdStep
    }),
    z.object({
        step: z.literal(4),
        data: IndividualFourthStep
    }),
    z.object({
        step: z.literal(5),
        data: IndividualFifthStep
    }),
]);

export type IndividualData = z.infer<typeof Data>;

export function validateIndividual(data: IndividualData) {
    return match(data)
        .with({ step: 1 }, (data) => IndividualFirstStep.safeParse(data))
        .with({ step: 2 }, (data) => IndividualSecondStep.safeParse(data))
        .with({ step: 3 }, (data) => IndividualThirdStep.safeParse(data))
        .with({ step: 4 }, (data) => IndividualFourthStep.safeParse(data))
        .with({ step: 5 }, (data) => IndividualFifthStep.safeParse(data))
        .exhaustive();
}


