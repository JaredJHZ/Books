import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'title'
})
export class TitlePipe implements PipeTransform {

  transform(title: string): any {
    if(title.length >= 24) {
      let newTitle = title.substring(0,23);
      return newTitle.concat('...');
    }
    return title;
  }

}
