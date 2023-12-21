// i don't care about the quality of this code, will be used client side and server side



export const stagesInCareer = ["Student", "In training", "Practicing", "Retired"];

export const specialties = ["Cardio-Thoracic Surgery", "Emergency Medicine", "Intensive Care Medicine", "Internal Medicine", "Surgeon"];

export const profActivities = ["Physician", "Nurse", "Allied Professional", "Other"];

export const roles = ["Trainee (Intern/Extern/Fellow/Student/PhD candidate or other)", "Practitioner (Specialist Physician/Resercher/Nurse/Allied Professional/Staff member or other)", "Manager (Head of department/Section/Senior Researcher/Dean/Director or other)"];



export function validateStages(stage: string) {
    console.log(stage)
    console.log(stagesInCareer.includes(stage))
    return stagesInCareer.includes(stage);
}

export function validateSpecialties(specialty: string) {
    return specialties.includes(specialty);
}

export function validateProfActivities(profActivity: string) {
    return profActivities.includes(profActivity);
}

export function validateRoles(roles: string) {
    return profActivities.includes(roles);
}

