import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'username'
})
export class UsernamePipe implements PipeTransform {

  transform(username: string): string {
    let lname = username.substring(1,username.length);
    let firstLetter = username.charAt(0).toUpperCase();
    return firstLetter.concat(lname);
  }

}
