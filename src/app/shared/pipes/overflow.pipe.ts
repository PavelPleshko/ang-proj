import {Pipe,PipeTransform} from "@angular/core";

@Pipe({name: 'overflow'})
export class OverflowPipe implements PipeTransform {

    transform(value:any,amount:number, show:boolean) {
        if (!amount) {
            return value;
        }else{
        	let lastIndex = /[\.\,\s\!\?]/i.exec(value.slice(amount));
        	return (value.length > amount && !show) ? value.slice(0,amount+Number(lastIndex.index)) + '...' : value;
        }
        
    }

}