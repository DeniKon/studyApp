import { FormControl, ValidationErrors } from "@angular/forms";

export function negativeNumbertValidator(control: FormControl): ValidationErrors {
    return control.value < 0 ? {negativeNumber:true} : null;
}