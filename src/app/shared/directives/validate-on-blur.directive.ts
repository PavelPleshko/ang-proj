import { Directive,Input,HostListener} from '@angular/core';

@Directive({
  selector: '[validateOnBlur]'
})
export class ValidateOnBlurDirective {
@Input() validateFormControl;
@Input() validateFunction:Function;

  constructor() { }
 @HostListener('focus', ['$event.target'])
    onFocus(target) {   
    this.validateFormControl.markAsUntouched();
    }

  @HostListener('focusout', ['$event.target'])
  onFocusout(target) {   
  
    	this.validateFormControl.markAsTouched();
    if(this.validateFunction){
    	this.validateFunction();
    }
    
    
  }
}
