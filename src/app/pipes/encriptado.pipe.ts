import { Pipe, PipeTransform } from '@angular/core';

@Pipe ({
    name:'encriptado'
})
export class encriptadoPipe implements PipeTransform {
    
    transform(value:string): string{

        var arr = value.split("@");

         var letter1 = arr[0][0] + "*".repeat(arr[0].length - 2) + arr[0].slice(-1);

         var letter2 = arr[1][0] + "*".repeat(arr[1].length - 2) + arr[1].slice(-1);
        return letter1 + "@" + letter2;        

    }
}