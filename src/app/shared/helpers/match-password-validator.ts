import {AbstractControl} from '@angular/forms';
export class PasswordValidation {

    static MatchPassword(AC: AbstractControl) {
       let password = AC.get('password').value; 
       let confirmPassword = AC.get('confirmPassword').value; 
        if(password != confirmPassword) {
            AC.get('confirmPassword').setErrors( {matchPassword: true} )
        } else {
        	if(AC.get('confirmPassword').errors && AC.get('confirmPassword').errors.matchPassword){
        		 AC.get('confirmPassword').setErrors( {...AC.get('confirmPassword').errors,matchPassword: null} )
        	}
            return null
        }
    }
}